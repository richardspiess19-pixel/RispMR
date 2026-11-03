package com.rispmr.vrboxemulator.demo

import com.rispmr.vrboxemulator.engine.RawEvent
import com.rispmr.vrboxemulator.engine.SourceIds
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

/**
 * DEMO MODE input generator.
 *
 * Produces SIMULATED physical events (clearly flagged as demo everywhere in the app) so the
 * whole pipeline can be explored without a controller. It never pretends to be a Bluetooth
 * device: events carry the device key [DEVICE_KEY].
 *
 * Pure Kotlin: given the elapsed time it returns the events for that step.
 */
class DemoScript {
    private val pressed = HashSet<String>()

    private data class Press(val source: String, val startMs: Long, val endMs: Long)

    private val presses = listOf(
        Press(SourceIds.mouseButton("primary"), 2200, 2600),
        Press(SourceIds.key("BUTTON_A"), 3000, 3400),
        Press(SourceIds.key("BUTTON_B"), 3700, 4100),
        Press(SourceIds.key("BUTTON_1"), 4400, 4800),
        Press(SourceIds.key("BUTTON_2"), 5000, 5400),
        Press(SourceIds.key("BUTTON_3"), 5600, 6200),
        Press(SourceIds.key("BUTTON_4"), 6400, 7000),
        Press(SourceIds.key("VOLUME_UP"), 7300, 7600),
    )

    /** Events between the previous call and [elapsedMs] (time since demo start). */
    fun step(elapsedMs: Long, uptimeMs: Long): List<RawEvent> {
        val t = elapsedMs % LOOP_MS
        val events = ArrayList<RawEvent>()
        // Mouse moves in a circle during the first 2 seconds of each loop.
        if (t < 2000) {
            val a = 2 * PI * t / 2000.0
            val dx = (cos(a) * 7).toFloat()
            val dy = (sin(a) * 7).toFloat()
            events += RawEvent.Motion(DEVICE_KEY, dx, dy, uptimeMs)
        }
        for (p in presses) {
            val shouldBePressed = t in p.startMs until p.endMs
            if (shouldBePressed && pressed.add(p.source)) {
                events += RawEvent.Button(DEVICE_KEY, p.source, true, uptimeMs)
            } else if (!shouldBePressed && pressed.remove(p.source)) {
                events += RawEvent.Button(DEVICE_KEY, p.source, false, uptimeMs)
            }
        }
        return events
    }

    /** Release events for everything still pressed (used when the demo stops). */
    fun releaseAll(uptimeMs: Long): List<RawEvent> =
        pressed.map { RawEvent.Button(DEVICE_KEY, it, false, uptimeMs) }.also { pressed.clear() }

    companion object {
        const val DEVICE_KEY = "demo"
        const val DEVICE_NAME = "DEMO VR Box (simulated input)"
        const val LOOP_MS = 8000L
        const val STEP_MS = 16L
    }
}
