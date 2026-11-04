package com.rispmr.vrboxemulator.engine

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ControllerMapperTest {
    private val mapper = ControllerMapper()
    private val state = PhysicalState()
    private val frame = MappedFrame()

    private fun configure(vararg rules: MappingRule, buttons: ButtonConfig = ButtonConfig()) = mapper.configure(rules.toList(), buttons)

    @Test
    fun digitalSourceDrivesButton() {
        configure(rule("mouse:btn:primary", "right.a"))
        mapper.evaluate(state, frame)
        assertFalse(frame.buttons["right.a"] == true)
        state.digital["mouse:btn:primary"] = true
        mapper.evaluate(state, frame)
        assertTrue(frame.buttons["right.a"] == true)
    }

    @Test
    fun multipleSourcesAreOredForButtonsAndMaxForAnalog() {
        configure(rule("key:BUTTON_A", "right.a"), rule("key:VOLUME_UP", "right.a"), rule("key:BUTTON_A", "right.trigger"), rule("axis:RTRIGGER", "right.trigger"))
        state.digital["key:VOLUME_UP"] = true
        state.analog["axis:RTRIGGER"] = 0.4f
        mapper.evaluate(state, frame)
        assertTrue(frame.buttons["right.a"] == true)
        assertEquals(0.4f, frame.analog["right.trigger"]!!, 1e-6f)
        state.digital["key:BUTTON_A"] = true
        mapper.evaluate(state, frame)
        assertEquals(1f, frame.analog["right.trigger"]!!, 1e-6f)
    }

    @Test
    fun digitalToTriggerUsesConfiguredValue() {
        configure(rule("key:BUTTON_4", "left.trigger"), buttons = ButtonConfig(digitalAnalogValue = 0.75f))
        state.digital["key:BUTTON_4"] = true
        mapper.evaluate(state, frame)
        assertEquals(0.75f, frame.analog["left.trigger"]!!, 1e-6f)
    }

    @Test
    fun analogToButtonUsesThresholdAndInvert() {
        configure(rule("axis:X", "left.up"), rule("axis:X", "left.down", invert = true, threshold = 0.3f))
        state.analog["axis:X"] = 0.49f
        mapper.evaluate(state, frame)
        assertFalse(frame.buttons["left.up"] == true)
        state.analog["axis:X"] = 0.5f
        mapper.evaluate(state, frame)
        assertTrue(frame.buttons["left.up"] == true)
        assertFalse(frame.buttons["left.down"] == true)
        state.analog["axis:X"] = -0.31f
        mapper.evaluate(state, frame)
        assertTrue("inverted rule reacts to the negative side", frame.buttons["left.down"] == true)
    }

    @Test
    fun analogAxisToStickFlipsAndroidY() {
        configure(rule("axis:X", "left.stick.x"), rule("axis:Y", "left.stick.y"))
        state.analog["axis:X"] = 0.6f
        state.analog["axis:Y"] = -0.8f // Android: negative = up
        mapper.evaluate(state, frame)
        assertEquals(0.6f, frame.stick[0], 1e-6f)
        assertEquals(0.8f, frame.stick[1], 1e-6f) // virtual: positive = up
    }

    @Test
    fun digitalDirectionsSumOnStick() {
        configure(rule("key:DPAD_UP", "right.stick.up"), rule("key:DPAD_LEFT", "right.stick.left"))
        state.digital["key:DPAD_UP"] = true
        state.digital["key:DPAD_LEFT"] = true
        mapper.evaluate(state, frame)
        assertEquals(-1f, frame.stick[2], 1e-6f)
        assertEquals(1f, frame.stick[3], 1e-6f)
    }

    @Test
    fun relativeMotionIsRoutedWithYFlip() {
        configure(rule("mouse:x", "left.stick.x"), rule("mouse:y", "left.stick.y"), rule("mouse:x", "right.stick.x", invert = true, scale = 2f))
        val got = ArrayList<Triple<Hand, Int, Float>>()
        mapper.routeMotion(5f, 3f) { hand, axis, d -> got += Triple(hand, axis, d) }
        assertEquals(listOf(Triple(Hand.LEFT, 0, 5f), Triple(Hand.LEFT, 1, -3f), Triple(Hand.RIGHT, 0, -10f)), got)
    }

    @Test
    fun incompatibleAndUnknownRulesAreRejected() {
        configure(
            rule("mouse:x", "right.a"), // relative -> button not allowed
            rule("key:BUTTON_A", "nowhere.x"),
            rule("bogus", "right.a"),
            rule("key:BUTTON_A", "right.a"),
        )
        assertEquals(3, mapper.rejected.size)
        state.digital["key:BUTTON_A"] = true
        mapper.evaluate(state, frame)
        assertTrue(frame.buttons["right.a"] == true)
    }
}
