package com.rispmr.vrboxemulator.engine

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import kotlin.math.hypot

class VirtualStickTest {

    @Test
    fun shapeAppliesDeadzoneCurveMaxAndInvert() {
        val linear = AxisConfig(deadzone = 0.1f, curve = 1f, max = 1f)
        assertEquals(0f, VirtualStickProcessor.shape(0.05f, linear), 1e-6f)
        assertEquals(0f, VirtualStickProcessor.shape(0.1f, linear), 1e-6f)
        assertEquals(0.5f, VirtualStickProcessor.shape(0.55f, linear), 1e-5f) // (0.55-0.1)/0.9
        assertEquals(1f, VirtualStickProcessor.shape(1f, linear), 1e-6f)
        assertEquals(-1f, VirtualStickProcessor.shape(-1f, linear), 1e-6f)

        val curved = AxisConfig(deadzone = 0f, curve = 2f)
        assertEquals(0.25f, VirtualStickProcessor.shape(0.5f, curved), 1e-6f)
        assertEquals(-0.25f, VirtualStickProcessor.shape(-0.5f, curved), 1e-6f)

        val limited = AxisConfig(deadzone = 0f, max = 0.6f)
        assertEquals(0.6f, VirtualStickProcessor.shape(1f, limited), 1e-6f)

        val inverted = AxisConfig(deadzone = 0f, invert = true)
        assertEquals(-0.3f, VirtualStickProcessor.shape(0.3f, inverted), 1e-6f)
    }

    @Test
    fun virtualStickIntegratesAndReturnsToCenter() {
        val s = VirtualStickProcessor(StickConfig(mode = StickMode.VIRTUAL_STICK, smoothing = 0f, returnSpeed = 5f, x = AxisConfig(deadzone = 0f), y = AxisConfig(deadzone = 0f)))
        var t = 1000L
        s.update(t)
        s.addMotion(0, 40f, t) // half of COUNTS_FOR_FULL_DEFLECTION
        s.update(t)
        assertEquals(0.5f, s.x, 1e-5f)
        // Still moving within HOLD_MS: holds.
        t += 20
        s.update(t)
        assertEquals(0.5f, s.x, 1e-5f)
        // Saturates at 1.
        s.addMotion(0, 400f, t)
        s.update(t)
        assertEquals(1f, s.x, 1e-5f)
        // After the hold time, returns at 5 units/s: 100 ms -> -0.5.
        t += VirtualStickProcessor.HOLD_MS + 1
        s.update(t)
        t += 100
        s.update(t)
        assertTrue("returning", s.x < 1f)
        repeat(50) {
            t += 20
            s.update(t)
        }
        assertEquals(0f, s.x, 1e-6f)
        assertFalse(s.isActive)
    }

    @Test
    fun virtualStickHoldsPositionWhenReturnSpeedIsZero() {
        val s = VirtualStickProcessor(StickConfig(mode = StickMode.VIRTUAL_STICK, smoothing = 0f, returnSpeed = 0f, x = AxisConfig(deadzone = 0f)))
        var t = 0L
        s.update(t)
        s.addMotion(0, 20f, t)
        repeat(20) {
            t += 50
            s.update(t)
        }
        assertEquals(0.25f, s.x, 1e-5f)
    }

    @Test
    fun relativeMouseDecaysAndIsProportionalToSpeed() {
        val cfg = StickConfig(mode = StickMode.RELATIVE_MOUSE, smoothing = 0f, returnSpeed = 10f, x = AxisConfig(deadzone = 0f))
        fun steady(countsPerTick: Float): Float {
            val s = VirtualStickProcessor(cfg)
            var t = 0L
            s.update(t)
            repeat(200) {
                t += 10
                s.addMotion(0, countsPerTick, t)
                s.update(t)
            }
            return s.x
        }
        val slow = steady(0.5f)
        val fast = steady(1f)
        assertTrue(slow > 0f)
        assertEquals("deflection proportional to speed", 2f, fast / slow, 0.05f)

        val s = VirtualStickProcessor(cfg)
        var t = 0L
        s.update(t)
        s.addMotion(0, 40f, t)
        s.update(t)
        val start = s.x
        repeat(100) {
            t += 10
            s.update(t)
        }
        assertTrue(start > 0.4f)
        assertEquals("decays to zero when the mouse stops", 0f, s.x, 1e-3f)
    }

    @Test
    fun smoothingDelaysOutput() {
        val s = VirtualStickProcessor(StickConfig(smoothing = 0.8f, returnSpeed = 0f, x = AxisConfig(deadzone = 0f)))
        var t = 0L
        s.update(t)
        s.setAbsolute(1f, 0f, t)
        s.update(t)
        assertEquals("no time elapsed yet", 0f, s.x, 1e-6f)
        t += 16
        s.update(t)
        assertTrue(s.x > 0f && s.x < 0.5f)
        repeat(200) {
            t += 16
            s.update(t)
        }
        assertEquals(1f, s.x, 1e-3f)
    }

    @Test
    fun outputIsClampedToUnitCircle() {
        val s = VirtualStickProcessor(StickConfig(smoothing = 0f, x = AxisConfig(deadzone = 0f), y = AxisConfig(deadzone = 0f)))
        s.update(0)
        s.setAbsolute(1f, 1f, 0)
        s.update(0)
        assertEquals(1f, hypot(s.x, s.y), 1e-5f)
        assertEquals(s.x, s.y, 1e-6f)
    }

    @Test
    fun sensitivityScalesAbsoluteAndMouseInput() {
        val s = VirtualStickProcessor(StickConfig(smoothing = 0f, returnSpeed = 0f, x = AxisConfig(deadzone = 0f, sensitivity = 2f), y = AxisConfig(deadzone = 0f, sensitivity = 0.5f)))
        s.update(0)
        s.setAbsolute(0.25f, 0.5f, 0)
        s.update(0)
        assertEquals(0.5f, s.x, 1e-5f)
        assertEquals(0.25f, s.y, 1e-5f)
    }
}
