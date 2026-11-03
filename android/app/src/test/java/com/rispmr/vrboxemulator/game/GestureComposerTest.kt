package com.rispmr.vrboxemulator.game

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.graphics.PathMeasure
import android.graphics.RectF
import android.os.Handler
import android.os.Looper
import com.rispmr.vrboxemulator.engine.PlannedTap
import com.rispmr.vrboxemulator.engine.PlannedTouch
import com.rispmr.vrboxemulator.engine.TouchPlan
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class GestureComposerTest {

    /** Records gestures instead of performing them. */
    private class FakeDispatcher {
        val sent = ArrayList<GestureDescription>()
        var callback: AccessibilityService.GestureResultCallback? = null
        fun dispatch(g: GestureDescription, cb: AccessibilityService.GestureResultCallback, @Suppress("UNUSED_PARAMETER") h: Handler): Boolean {
            sent += g
            callback = cb
            return true
        }
        fun complete() = callback!!.onCompleted(sent.last())
    }

    private val service = FakeDispatcher()
    private val composer = GestureComposer(Handler(Looper.getMainLooper()), service::dispatch)

    private fun touch(id: String, x: Float, y: Float) = PlannedTouch(id, x, y, x, y)

    private fun strokes(g: GestureDescription) = (0 until g.strokeCount).map { g.getStroke(it) }

    private fun bounds(s: GestureDescription.StrokeDescription) = RectF().also { s.path.computeBounds(it, true) }

    @Test
    fun heldButtonKeepsTheFingerDownUntilReleased() {
        composer.update(TouchPlan(listOf(touch("right.a", 0.5f, 0.5f)), emptyList()), 1001, 501)
        val down = strokes(service.sent.single()).single()
        assertTrue("finger stays down", down.willContinue())
        assertEquals(500f, bounds(down).centerX(), 0.5f)
        assertEquals(1, composer.activeFingers)

        // Nothing changes: no extra gesture (the pointer simply stays down).
        composer.update(TouchPlan(listOf(touch("right.a", 0.5f, 0.5f)), emptyList()), 1001, 501)
        assertEquals(1, service.sent.size)

        service.complete()
        composer.update(TouchPlan(emptyList(), emptyList()), 1001, 501)
        val up = strokes(service.sent.last()).single()
        assertFalse("released: finger goes up", up.willContinue())
        assertEquals(0, composer.activeFingers)
    }

    @Test
    fun updatesWaitForThePreviousGesture() {
        composer.update(TouchPlan(listOf(touch("left.stick", 0.2f, 0.7f)), emptyList()), 1001, 501)
        composer.update(TouchPlan(listOf(touch("left.stick", 0.25f, 0.7f)), emptyList()), 1001, 501)
        assertEquals("second update queued while the first is running", 1, service.sent.size)
        service.complete()
        assertEquals(2, service.sent.size)
        val move = strokes(service.sent.last()).single()
        assertTrue(move.willContinue())
        val r = bounds(move)
        assertEquals("continues from where the finger was", 200f, r.left, 0.5f)
        assertEquals(250f, r.right, 0.5f)
    }

    @Test
    fun tapsAndHeldFingersTravelTogether() {
        composer.update(TouchPlan(listOf(touch("left.stick", 0.2f, 0.7f)), listOf(PlannedTap("right.b", 0.9f, 0.1f))), 1001, 501)
        val all = strokes(service.sent.single())
        assertEquals(2, all.size)
        val tap = all.first { !it.willContinue() }
        assertEquals(GestureComposer.TAP_MS, tap.duration)
        assertEquals(0f, PathMeasure(tap.path, false).length, 0f)
    }
}
