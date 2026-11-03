package com.rispmr.vrboxemulator.game

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.graphics.Path
import android.os.Handler
import com.rispmr.vrboxemulator.engine.TouchPlan

/**
 * Keeps "virtual fingers" on the game screen with accessibility gestures.
 *
 * A new gesture cancels the one in progress, so every update is sent as ONE gesture that
 * contains all fingers: held fingers continue their previous stroke (`continueStroke`,
 * pointer stays down), new fingers start, released fingers end, taps are quick strokes.
 * Updates wait for the previous gesture to finish, so nothing is cancelled by accident.
 */
class GestureComposer(
    private val handler: Handler,
    /** Usually `AccessibilityService::dispatchGesture`; injectable for tests. */
    private val dispatch: (GestureDescription, AccessibilityService.GestureResultCallback, Handler) -> Boolean,
) {

    private class Finger(val id: String, val x: Float, val y: Float, val stroke: GestureDescription.StrokeDescription)

    private data class Target(val id: String, val x: Float, val y: Float, val startX: Float, val startY: Float)

    private val fingers = LinkedHashMap<String, Finger>()
    private var desired: List<Target> = emptyList()
    private val pendingTaps = ArrayList<Pair<Float, Float>>()
    private var inFlight = false
    private var dirty = false

    var onGesture: (() -> Unit)? = null

    private val callback = object : AccessibilityService.GestureResultCallback() {
        override fun onCompleted(gestureDescription: GestureDescription) {
            inFlight = false
            pump()
        }

        override fun onCancelled(gestureDescription: GestureDescription) {
            // The system lifted our pointers (e.g. the user touched the screen).
            inFlight = false
            fingers.clear()
            if (desired.isNotEmpty()) dirty = true
            pump()
        }
    }

    /** Applies a plan in normalized coordinates on a [width] x [height] screen. */
    fun update(plan: TouchPlan, width: Int, height: Int) {
        val maxX = (width - 1).coerceAtLeast(1).toFloat()
        val maxY = (height - 1).coerceAtLeast(1).toFloat()
        val next = plan.touches.map { Target(it.id, it.x * maxX, it.y * maxY, it.startX * maxX, it.startY * maxY) }
        val changed = next.size != desired.size || next.zip(desired).any { (a, b) -> a.id != b.id || a.x != b.x || a.y != b.y }
        desired = next
        plan.taps.forEach { pendingTaps += (it.x * maxX) to (it.y * maxY) }
        if (changed || plan.taps.isNotEmpty()) {
            dirty = true
            pump()
        }
    }

    /** Lifts every finger (emulation stopped, service disconnected). */
    fun releaseAll() {
        desired = emptyList()
        pendingTaps.clear()
        if (fingers.isNotEmpty()) {
            dirty = true
            pump()
        }
    }

    val activeFingers: Int get() = fingers.size

    private fun pump() {
        if (inFlight || !dirty) return
        dirty = false
        val max = GestureDescription.getMaxStrokeCount()
        val builder = GestureDescription.Builder()
        val next = LinkedHashMap<String, Finger>()
        val byId = desired.associateBy { it.id }
        var count = 0

        for (f in fingers.values) {
            if (count >= max) break
            val d = byId[f.id]
            if (d != null) {
                val s = f.stroke.continueStroke(line(f.x, f.y, d.x, d.y), 0, SEGMENT_MS, true)
                builder.addStroke(s)
                next[f.id] = Finger(f.id, d.x, d.y, s)
            } else {
                builder.addStroke(f.stroke.continueStroke(point(f.x, f.y), 0, END_MS, false))
            }
            count++
        }
        for (d in desired) {
            if (count >= max) break
            if (fingers.containsKey(d.id)) continue
            val s = GestureDescription.StrokeDescription(line(d.startX, d.startY, d.x, d.y), 0, SEGMENT_MS, true)
            builder.addStroke(s)
            next[d.id] = Finger(d.id, d.x, d.y, s)
            count++
        }
        for ((x, y) in pendingTaps) {
            if (count >= max) break
            builder.addStroke(GestureDescription.StrokeDescription(point(x, y), 0, TAP_MS, false))
            count++
        }
        pendingTaps.clear()
        if (count == 0) return

        fingers.clear()
        fingers.putAll(next)
        inFlight = dispatch(builder.build(), callback, handler)
        if (!inFlight) {
            // Rejected (service not ready): start from scratch next time.
            fingers.clear()
        } else {
            onGesture?.invoke()
        }
    }

    private fun point(x: Float, y: Float) = Path().apply { moveTo(x, y) }

    private fun line(x0: Float, y0: Float, x1: Float, y1: Float) = Path().apply {
        moveTo(x0, y0)
        if (x0 != x1 || y0 != y1) lineTo(x1, y1)
    }

    companion object {
        const val SEGMENT_MS = 16L
        const val END_MS = 8L
        const val TAP_MS = 40L
    }
}
