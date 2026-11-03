package com.rispmr.vrboxemulator.engine

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class VirtualControllerManagerTest {

    @Test
    fun eachControllerHasIndependentButtons() {
        val m = VirtualControllerManager()
        assertEquals(listOf("stickClick", "x", "y", "menu"), m.left.buttonNames)
        assertEquals(listOf("stickClick", "a", "b", "system"), m.right.buttonNames)
        m.configure(listOf(rule("key:BUTTON_A", "left.x"), rule("key:BUTTON_B", "right.b")), ButtonConfig(), StickConfig(), StickConfig())
        val state = PhysicalState().apply { digital["key:BUTTON_A"] = true }
        m.onPhysicalState(state, 0)
        assertTrue(m.left.button("x"))
        assertFalse(m.right.button("b"))
    }

    @Test
    fun analogTriggerKeepsIntensityAndUsesHysteresis() {
        val events = ArrayList<VirtualEvent>()
        val m = VirtualControllerManager()
        m.listener = VirtualEventListener { events += it }
        m.configure(listOf(rule("axis:LTRIGGER", "left.trigger")), ButtonConfig(analogThreshold = 0.5f), StickConfig(), StickConfig())
        val state = PhysicalState()
        state.analog["axis:LTRIGGER"] = 0.3f
        m.onPhysicalState(state, 0)
        assertEquals(0.3f, m.left.trigger, 1e-6f)
        assertTrue(events.isEmpty())
        state.analog["axis:LTRIGGER"] = 0.6f
        m.onPhysicalState(state, 0)
        assertEquals("Esquerdo · gatilho pressionado (0,60)", events.single().describe())
        state.analog["axis:LTRIGGER"] = 0.4f // above 0.5 * 0.7: still pressed
        m.onPhysicalState(state, 0)
        assertEquals(1, events.size)
        state.analog["axis:LTRIGGER"] = 0.2f
        m.onPhysicalState(state, 0)
        assertEquals("Esquerdo · gatilho solto", events.last().describe())
    }

    @Test
    fun versionChangesOnlyWhenStateChanges() {
        val m = VirtualControllerManager()
        m.configure(listOf(rule("key:BUTTON_A", "right.a")), ButtonConfig(), StickConfig(), StickConfig())
        val state = PhysicalState()
        m.onPhysicalState(state, 0)
        val v0 = m.version
        m.onPhysicalState(state, 0)
        assertEquals(v0, m.version)
        state.digital["key:BUTTON_A"] = true
        m.onPhysicalState(state, 0)
        assertTrue(m.version > v0)
    }

    @Test
    fun resetReleasesEverything() {
        val events = ArrayList<VirtualEvent>()
        val m = VirtualControllerManager()
        m.listener = VirtualEventListener { events += it }
        m.configure(listOf(rule("key:BUTTON_A", "right.a"), rule("key:BUTTON_A", "right.grip")), ButtonConfig(), StickConfig(), StickConfig())
        m.onPhysicalState(PhysicalState().apply { digital["key:BUTTON_A"] = true }, 0)
        m.reset(0)
        val snap = m.snapshot()
        assertFalse(snap.right.pressed("a"))
        assertEquals(0f, snap.right.grip, 0f)
        assertTrue(events.any { it.describe() == "Direito · botão A solto" })
        assertTrue(events.any { it.describe() == "Direito · grip solto" })
    }

    @Test
    fun snapshotIsAnIndependentCopy() {
        val m = VirtualControllerManager()
        m.configure(listOf(rule("key:BUTTON_A", "right.a")), ButtonConfig(), StickConfig(), StickConfig())
        val before = m.snapshot()
        m.onPhysicalState(PhysicalState().apply { digital["key:BUTTON_A"] = true }, 0)
        assertFalse(before.right.pressed("a"))
        assertTrue(m.snapshot().right.pressed("a"))
    }
}
