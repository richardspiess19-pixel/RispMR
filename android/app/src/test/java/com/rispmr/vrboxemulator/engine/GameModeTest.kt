package com.rispmr.vrboxemulator.engine

import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class GameModeTest {
    private fun snapshot(
        a: Boolean = false,
        trigger: Float = 0f,
        leftX: Float = 0f,
        leftY: Float = 0f,
    ): ControllerSnapshot {
        val left = HandSnapshot(Hand.LEFT, leftX, leftY, leftX, leftY, 0f, 0f, mapOf("stickClick" to false, "x" to false, "y" to false, "menu" to false))
        val right = HandSnapshot(Hand.RIGHT, 0f, 0f, 0f, 0f, trigger, 0f, mapOf("stickClick" to false, "a" to a, "b" to false, "system" to false))
        return ControllerSnapshot(left, right, 0)
    }

    @Test
    fun cardboardPresetHoldsTheCenterWhileTheButtonIsPressed() {
        val planner = TouchPlanner()
        val cfg = GameModeConfig.cardboard()
        assertTrue(planner.plan(snapshot(), cfg, 0.5f, 16f / 9f).touches.isEmpty())
        val pressed = planner.plan(snapshot(a = true), cfg, 0.5f, 16f / 9f)
        assertEquals(1, pressed.touches.size)
        assertEquals(0.5f, pressed.touches[0].x, 0f)
        assertEquals(0.5f, pressed.touches[0].y, 0f)
        // Trigger and A share the center: still one finger.
        assertEquals(1, planner.plan(snapshot(a = true, trigger = 1f), cfg, 0.5f, 16f / 9f).touches.size)
        assertTrue(planner.plan(snapshot(), cfg, 0.5f, 16f / 9f).touches.isEmpty())
    }

    @Test
    fun tapFiresOncePerPress() {
        val planner = TouchPlanner()
        val cfg = GameModeConfig(buttons = mapOf("right.a" to TouchPoint(TouchAction.TAP, 0.9f, 0.8f)))
        assertEquals(1, planner.plan(snapshot(a = true), cfg, 0.5f, 2f).taps.size)
        assertEquals("held: no new tap", 0, planner.plan(snapshot(a = true), cfg, 0.5f, 2f).taps.size)
        planner.plan(snapshot(a = false), cfg, 0.5f, 2f)
        val again = planner.plan(snapshot(a = true), cfg, 0.5f, 2f)
        assertEquals(PlannedTap("right.a", 0.9f, 0.8f), again.taps.single())
        assertTrue(again.touches.isEmpty())
    }

    @Test
    fun triggerUsesTheAnalogThreshold() {
        val planner = TouchPlanner()
        val cfg = GameModeConfig(buttons = mapOf("right.trigger" to TouchPoint(TouchAction.HOLD, 0.5f, 0.5f)))
        assertTrue(planner.plan(snapshot(trigger = 0.4f), cfg, 0.5f, 1f).touches.isEmpty())
        assertEquals(1, planner.plan(snapshot(trigger = 0.6f), cfg, 0.5f, 1f).touches.size)
    }

    @Test
    fun joystickDragsAroundItsCenterAndStaysRound() {
        val planner = TouchPlanner()
        val cfg = GameModeConfig(buttons = emptyMap(), leftStick = StickTouch(enabled = true, x = 0.2f, y = 0.7f, radius = 0.1f))
        assertTrue("centered stick: finger up", planner.plan(snapshot(), cfg, 0.5f, 2f).touches.isEmpty())
        val right = planner.plan(snapshot(leftX = 1f), cfg, 0.5f, 2f).touches.single()
        assertEquals("left.stick", right.id)
        assertEquals(0.2f, right.startX, 0f) // drag starts at the joystick center
        assertEquals(0.25f, right.x, 1e-6f) // 0.1 of the height = 0.05 of the width on a 2:1 screen
        val up = planner.plan(snapshot(leftY = 1f), cfg, 0.5f, 2f).touches.single()
        assertEquals(0.6f, up.y, 1e-6f) // up on the stick = up on the screen
    }

    @Test
    fun codecRoundTripAndValidation() {
        val cfg = GameModeConfig(
            enabled = false,
            buttons = mapOf("left.x" to TouchPoint(TouchAction.TAP, 0.1f, 0.2f), "right.trigger" to TouchPoint(TouchAction.HOLD, 0.5f, 0.5f)),
            leftStick = StickTouch(true, 0.3f, 0.6f, 0.2f),
        )
        assertEquals(cfg, GameModeCodec.decode(GameModeCodec.encode(cfg)))
        val messy = JSONObject("""{"buttons":{"left.stick.x":{"action":"hold"},"right.a":{"action":"boom"},"right.b":{"action":"hold","x":7,"y":-1}},"leftStick":{"radius":9}}""")
        val d = GameModeCodec.decode(messy)
        assertEquals(setOf("right.b"), d.buttons.keys)
        assertEquals(1f, d.buttons.getValue("right.b").x, 0f)
        assertEquals(0f, d.buttons.getValue("right.b").y, 0f)
        assertEquals(0.4f, d.leftStick.radius, 0f)
    }

    @Test
    fun settingsKeepGameModeAcrossRestart() {
        val s = AppSettings(game = GameModeConfig.cardboard().copy(enabled = false))
        val back = AppSettingsCodec.decode(AppSettingsCodec.encode(s).toString())
        assertFalse(back.game.enabled)
        assertEquals(GameModeConfig.cardboard().buttons, back.game.buttons)
        val patched = AppSettingsCodec.merge(back, JSONObject("""{"game":{"enabled":true}}"""))
        assertTrue(patched.game.enabled)
        assertEquals("partial patch keeps bindings", back.game.buttons, patched.game.buttons)
    }
}
