package com.rispmr.vrboxemulator.engine

import kotlin.math.abs

/**
 * First stage of the pipeline: keeps the physical input state, derives digital directions
 * from analog axes, feeds Automatic Input Detection, logs physical events and forwards
 * everything to the [VirtualControllerManager].
 *
 * Not thread safe: the Android layer confines it to the main thread.
 */
class InputProcessor(
    private val controllers: VirtualControllerManager,
    private val log: EventLog,
    private val clock: Clock,
) {
    val state = PhysicalState()
    val stats = InputStats()

    /** When true, every new physical event is reported through [detectionListener]. */
    var detecting = false
        set(value) {
            field = value
            motionAccum.fill(0f)
        }

    var detectionListener: ((Detection) -> Unit)? = null

    /** Called when an input is observed (used to build the "identified inputs" list). */
    var identifiedListener: ((sourceId: String, kind: SourceKind) -> Unit)? = null

    private val pulses = HashMap<String, Long>()
    private val axisRest = HashMap<String, Float>()
    private val analogReported = HashSet<String>()
    private val motionAccum = FloatArray(2)
    private val motionIdentified = BooleanArray(2)
    private val lastMotionDetection = longArrayOf(Long.MIN_VALUE, Long.MIN_VALUE)
    private var lastDeviceKey = ""

    /** @return true if the physical or virtual state changed. */
    fun process(event: RawEvent): Boolean {
        val now = clock.uptimeMs()
        lastDeviceKey = event.deviceKey
        stats.record(event.eventTimeMs, now, if (event is RawEvent.Motion) event.samples else 0)
        return when (event) {
            is RawEvent.Button -> {
                val changed = setDigital(event.sourceId, event.pressed, emptyList())
                if (changed) controllers.onPhysicalState(state, now)
                changed
            }
            is RawEvent.Axis -> onAxis(event.sourceId, event.value, now)
            is RawEvent.Motion -> onMotion(event.dx, event.dy, now)
            is RawEvent.Pulse -> onPulse(event.sourceId, now)
        }
    }

    /** Releases expired momentary inputs. @return true if state changed. */
    fun tick(nowMs: Long): Boolean {
        if (pulses.isEmpty()) return false
        var changed = false
        val it = pulses.entries.iterator()
        while (it.hasNext()) {
            val (id, releaseAt) = it.next()
            if (nowMs >= releaseAt) {
                it.remove()
                changed = setDigital(id, false, emptyList()) || changed
            }
        }
        if (changed) controllers.onPhysicalState(state, nowMs)
        return changed
    }

    fun needsTick(): Boolean = pulses.isNotEmpty()

    /** Releases every physical input. Used on disconnection, focus loss and device release. */
    fun releaseAll(reason: String?) {
        val now = clock.uptimeMs()
        val hadInput = state.digital.values.any { it } || state.analog.isNotEmpty()
        state.clear()
        pulses.clear()
        axisRest.clear()
        motionAccum.fill(0f)
        controllers.onPhysicalState(state, now)
        controllers.reset(now)
        if (hadInput && reason != null) log.add(EventLog.SYSTEM, "Todos os botões foram soltos ($reason)", clock.wallMs())
    }

    private fun onAxis(id: String, value: Float, now: Long): Boolean {
        val previous = state.analog[id]
        if (previous != null && abs(previous - value) < AXIS_EPSILON) return false
        if (previous == null && abs(value) < AXIS_EPSILON && !axisRest.containsKey(id)) {
            axisRest[id] = value
            return false
        }
        if (!axisRest.containsKey(id)) axisRest[id] = value
        if (abs(value) < AXIS_EPSILON) state.analog.remove(id) else state.analog[id] = value

        val name = id.removePrefix("axis:")
        val plus = SourceIds.axisDirection(name, true)
        val minus = SourceIds.axisDirection(name, false)
        setDigital(plus, hysteresis(state.isPressed(plus), value), listOf(id))
        setDigital(minus, hysteresis(state.isPressed(minus), -value), listOf(id))

        val rest = axisRest[id] ?: 0f
        if (abs(value - rest) >= ANALOG_IDENTIFY_DELTA && analogReported.add(id)) {
            identifiedListener?.invoke(id, SourceKind.ANALOG)
        }
        controllers.onPhysicalState(state, now)
        return true
    }

    private fun onMotion(dx: Float, dy: Float, now: Long): Boolean {
        if (dx == 0f && dy == 0f) return false
        motionAccum[0] += dx
        motionAccum[1] += dy
        for (axis in 0..1) {
            val id = if (axis == 0) SourceIds.MOUSE_X else SourceIds.MOUSE_Y
            val accumulated = motionAccum[axis]
            if (abs(accumulated) >= MOTION_DETECT_COUNTS) {
                if (!motionIdentified[axis]) {
                    motionIdentified[axis] = true
                    identifiedListener?.invoke(id, SourceKind.RELATIVE)
                }
                val last = lastMotionDetection[axis]
                if (detecting && (last == Long.MIN_VALUE || now - last >= MOTION_DETECT_COOLDOWN_MS)) {
                    lastMotionDetection[axis] = now
                    detectionListener?.invoke(
                        Detection(id, InputCatalog.labelOf(id), SourceKind.RELATIVE, "MOVED", accumulated, emptyList(), lastDeviceKey),
                    )
                }
                motionAccum[axis] = 0f
            }
        }
        return controllers.onMotion(dx, dy, now)
    }

    private fun onPulse(id: String, now: Long): Boolean {
        val already = state.isPressed(id)
        pulses[id] = now + PULSE_MS
        if (already) return false
        setDigital(id, true, emptyList())
        controllers.onPhysicalState(state, now)
        return true
    }

    /** Updates one digital input; logs and reports it. Does not touch the virtual controllers. */
    private fun setDigital(id: String, pressed: Boolean, alternatives: List<String>): Boolean {
        if (state.isPressed(id) == pressed) return false
        if (pressed) state.digital[id] = true else state.digital.remove(id)
        val label = InputCatalog.labelOf(id)
        val stateName = if (pressed) "PRESSED" else "RELEASED"
        log.add(EventLog.PHYSICAL, "$label ${if (pressed) "pressionado" else "solto"}", clock.wallMs())
        if (pressed) identifiedListener?.invoke(id, SourceKind.DIGITAL)
        if (detecting) {
            detectionListener?.invoke(
                Detection(id, label, SourceKind.DIGITAL, stateName, if (pressed) 1f else 0f, alternatives, lastDeviceKey),
            )
        }
        return true
    }

    private fun hysteresis(wasPressed: Boolean, value: Float): Boolean =
        if (wasPressed) value > DIRECTION_RELEASE else value >= DIRECTION_PRESS

    companion object {
        const val AXIS_EPSILON = 0.004f
        const val DIRECTION_PRESS = 0.5f
        const val DIRECTION_RELEASE = 0.35f
        const val ANALOG_IDENTIFY_DELTA = 0.25f
        const val MOTION_DETECT_COUNTS = 40f
        const val MOTION_DETECT_COOLDOWN_MS = 800L
        const val PULSE_MS = 60L
    }
}
