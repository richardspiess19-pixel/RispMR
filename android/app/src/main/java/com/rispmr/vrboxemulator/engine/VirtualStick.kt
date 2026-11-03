package com.rispmr.vrboxemulator.engine

import kotlin.math.abs
import kotlin.math.exp
import kotlin.math.hypot
import kotlin.math.pow
import kotlin.math.sign

enum class StickMode(val key: String) {
    /**
     * MODE 1 — RELATIVE MOUSE.
     * Every mouse delta pushes the stick progressively (leaky integrator): the deflection is
     * proportional to the mouse speed and decays back to zero at [StickConfig.returnSpeed]
     * when the movement stops. Good for turning / camera.
     */
    RELATIVE_MOUSE("relative_mouse"),

    /**
     * MODE 2 — VIRTUAL STICK.
     * Mouse deltas move a virtual stick position (integrator clamped to the unit range).
     * When the movement stops the position returns to the center linearly at
     * [StickConfig.returnSpeed] units/second (0 = hold the position). Good for locomotion.
     */
    VIRTUAL_STICK("virtual_stick");

    companion object {
        fun fromKey(key: String?): StickMode? = entries.firstOrNull { it.key == key }
    }
}

/** Independent settings for one stick axis. */
data class AxisConfig(
    val sensitivity: Float = 1f,
    val deadzone: Float = 0.08f,
    /** Response curve exponent: 1 = linear, >1 = more precision near the center, <1 = more aggressive. */
    val curve: Float = 1f,
    /** Maximum output (0..1). The full input range is scaled down to this limit. */
    val max: Float = 1f,
    val invert: Boolean = false,
)

data class StickConfig(
    val mode: StickMode = StickMode.VIRTUAL_STICK,
    /** 0 = no smoothing, 0.95 = heavy smoothing (time constant up to ~240 ms). */
    val smoothing: Float = 0.1f,
    /** Units per second (VIRTUAL_STICK) or decay rate per second (RELATIVE_MOUSE). */
    val returnSpeed: Float = 6f,
    val x: AxisConfig = AxisConfig(),
    val y: AxisConfig = AxisConfig(),
)

/**
 * Converts mouse deltas and absolute contributions into one virtual analog stick.
 *
 * Pipeline per axis:
 * `raw = clamp(mouseComponent + absolute * sensitivity)` -> invert -> deadzone (rescaled)
 * -> response curve -> max limit -> smoothing -> radial clamp to the unit circle.
 */
class VirtualStickProcessor(config: StickConfig = StickConfig()) {

    var config: StickConfig = config
        set(value) {
            field = value
            dirty = true
        }

    private val mouse = FloatArray(2)
    private val absolute = FloatArray(2)
    private val target = FloatArray(2)
    private val out = FloatArray(2)
    private val raw = FloatArray(2)
    private var lastMotionMs = Long.MIN_VALUE
    private var lastUpdateMs = Long.MIN_VALUE
    private var dirty = true

    val x: Float get() = out[0]
    val y: Float get() = out[1]
    val rawX: Float get() = raw[0]
    val rawY: Float get() = raw[1]

    /** True while the output still changes over time (needs periodic [update] calls). */
    val isActive: Boolean
        get() = mouse[0] != 0f || mouse[1] != 0f || abs(target[0] - out[0]) > EPS || abs(target[1] - out[1]) > EPS || dirty

    /** Adds a relative delta (device counts, already in +y = up convention) to one axis. */
    fun addMotion(axis: Int, delta: Float, nowMs: Long) {
        advance(nowMs)
        val cfg = if (axis == 0) config.x else config.y
        mouse[axis] = (mouse[axis] + delta * cfg.sensitivity / COUNTS_FOR_FULL_DEFLECTION).coerceIn(-1f, 1f)
        lastMotionMs = nowMs
        dirty = true
    }

    /** Sets the absolute contribution (joystick axes, D-pad directions), already in +y = up convention. */
    fun setAbsolute(x: Float, y: Float, nowMs: Long) {
        if (absolute[0] != x || absolute[1] != y) {
            advance(nowMs)
            absolute[0] = x
            absolute[1] = y
            dirty = true
        }
    }

    /**
     * Advances time and recomputes the output.
     * @return true if the output changed.
     */
    fun update(nowMs: Long): Boolean {
        val dt = advance(nowMs)
        val prevX = out[0]
        val prevY = out[1]
        for (i in 0..1) {
            val cfg = if (i == 0) config.x else config.y
            raw[i] = (mouse[i] + absolute[i] * cfg.sensitivity).coerceIn(-1f, 1f)
            target[i] = shape(raw[i], cfg)
        }
        val tau = config.smoothing.coerceIn(0f, 0.95f) * SMOOTHING_MAX_TAU_S
        for (i in 0..1) {
            if (tau < 1e-4f) {
                out[i] = target[i]
            } else if (dt > 0f) {
                val alpha = 1f - exp(-dt / tau)
                out[i] += (target[i] - out[i]) * alpha
                if (abs(target[i] - out[i]) <= EPS) out[i] = target[i]
            }
        }
        val mag = hypot(out[0], out[1])
        if (mag > 1f) {
            out[0] /= mag
            out[1] /= mag
        }
        dirty = false
        return abs(out[0] - prevX) > EPS || abs(out[1] - prevY) > EPS ||
            (out[0] == 0f && prevX != 0f) || (out[1] == 0f && prevY != 0f)
    }

    fun reset() {
        mouse.fill(0f)
        absolute.fill(0f)
        target.fill(0f)
        out.fill(0f)
        raw.fill(0f)
        dirty = true
    }

    /** Applies the time-based part of the mouse modes. Returns elapsed seconds. */
    private fun advance(nowMs: Long): Float {
        if (lastUpdateMs == Long.MIN_VALUE) {
            lastUpdateMs = nowMs
            return 0f
        }
        val dt = ((nowMs - lastUpdateMs).coerceAtLeast(0L) / 1000f).coerceAtMost(MAX_DT_S)
        lastUpdateMs = nowMs
        if (dt <= 0f) return 0f
        when (config.mode) {
            StickMode.VIRTUAL_STICK -> {
                val idle = lastMotionMs == Long.MIN_VALUE || nowMs - lastMotionMs > HOLD_MS
                val speed = config.returnSpeed
                if (idle && speed > 0f) {
                    val step = speed * dt
                    for (i in 0..1) {
                        val m = mouse[i]
                        mouse[i] = if (abs(m) <= step) 0f else m - step * sign(m)
                    }
                }
            }
            StickMode.RELATIVE_MOUSE -> {
                val decay = exp(-config.returnSpeed.coerceAtLeast(MIN_RELATIVE_DECAY) * dt)
                for (i in 0..1) {
                    mouse[i] *= decay
                    if (abs(mouse[i]) < EPS) mouse[i] = 0f
                }
            }
        }
        return dt
    }

    companion object {
        /** Mouse counts that produce full deflection at sensitivity 1.0. */
        const val COUNTS_FOR_FULL_DEFLECTION = 80f

        /** Movement pause after which VIRTUAL_STICK starts returning to the center. */
        const val HOLD_MS = 40L
        const val SMOOTHING_MAX_TAU_S = 0.25f
        const val MIN_RELATIVE_DECAY = 0.5f
        const val MAX_DT_S = 0.1f
        const val EPS = 1e-4f

        /** Invert -> deadzone (rescaled) -> curve -> max. */
        fun shape(value: Float, cfg: AxisConfig): Float {
            var v = if (cfg.invert) -value else value
            val dz = cfg.deadzone.coerceIn(0f, 0.95f)
            val a = abs(v)
            if (a <= dz) return 0f
            v = sign(v) * ((a - dz) / (1f - dz))
            val curve = cfg.curve.coerceIn(0.2f, 5f)
            if (curve != 1f) v = sign(v) * abs(v).pow(curve)
            return (v * cfg.max.coerceIn(0f, 1f)).coerceIn(-1f, 1f)
        }
    }
}
