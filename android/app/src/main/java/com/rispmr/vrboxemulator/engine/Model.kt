package com.rispmr.vrboxemulator.engine

/**
 * Core data model of the input engine.
 *
 * Everything in the `engine` package is plain Kotlin (only `org.json` is used for
 * serialization) so it can be unit tested on the JVM without an Android device.
 */

/** Which virtual Quest Touch controller a virtual target belongs to. */
enum class Hand(val key: String, val label: String) {
    LEFT("left", "Esquerdo"),
    RIGHT("right", "Direito");

    companion object {
        fun fromKey(key: String?): Hand? = entries.firstOrNull { it.key == key }
    }
}

/** How a physical source behaves. */
enum class SourceKind(val key: String) {
    /** On/off input: keys, gamepad buttons, mouse buttons, wheel pulses, axis directions. */
    DIGITAL("digital"),

    /** Absolute analog value (-1..1 or 0..1): joystick axes, analog triggers, hats. */
    ANALOG("analog"),

    /** Relative movement (mouse deltas). Only meaningful for joystick axes. */
    RELATIVE("relative"),
}

/** Kind of virtual control that a mapping can drive. */
enum class TargetType(val key: String) {
    BUTTON("button"),
    ANALOG("analog"),
    STICK_AXIS("stick_axis"),
    STICK_DIRECTION("stick_direction"),
}

/**
 * Raw physical event, already detached from Android classes.
 *
 * [eventTimeMs] uses the same time base as [Clock.uptimeMs] (Android `SystemClock.uptimeMillis`),
 * which lets the engine estimate input latency.
 */
sealed interface RawEvent {
    val deviceKey: String
    val eventTimeMs: Long

    data class Button(
        override val deviceKey: String,
        val sourceId: String,
        val pressed: Boolean,
        override val eventTimeMs: Long,
    ) : RawEvent

    data class Axis(
        override val deviceKey: String,
        val sourceId: String,
        val value: Float,
        override val eventTimeMs: Long,
    ) : RawEvent

    /** Relative mouse movement in device counts. [samples] counts batched historical samples. */
    data class Motion(
        override val deviceKey: String,
        val dx: Float,
        val dy: Float,
        override val eventTimeMs: Long,
        val samples: Int = 1,
    ) : RawEvent

    /** Momentary digital input without a release event (mouse wheel notches). */
    data class Pulse(
        override val deviceKey: String,
        val sourceId: String,
        override val eventTimeMs: Long,
    ) : RawEvent
}

/** Time source. Injected so tests are deterministic. */
interface Clock {
    /** Monotonic milliseconds, same base as Android input event timestamps. */
    fun uptimeMs(): Long

    /** Wall clock milliseconds, used only for displaying log timestamps. */
    fun wallMs(): Long
}

/** A physical input that has been observed from a device at least once. */
data class IdentifiedInput(
    val id: String,
    val label: String,
    val kind: SourceKind,
    val count: Int,
    val lastSeenWallMs: Long,
)

/** Result of the Automatic Input Detection feature. */
data class Detection(
    val sourceId: String,
    val label: String,
    val kind: SourceKind,
    /** PRESSED, RELEASED or MOVED. */
    val state: String,
    val value: Float,
    /** Other source ids produced by the same physical control (e.g. analog axis vs. axis direction). */
    val alternatives: List<String>,
    val deviceKey: String,
)
