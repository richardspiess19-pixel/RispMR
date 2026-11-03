package com.rispmr.vrboxemulator.engine

import java.util.Locale

/**
 * Stable identifiers for physical inputs.
 *
 * Identifiers are built from Android *names* (`KeyEvent.keyCodeToString`, `MotionEvent.axisToString`
 * without their prefixes), not numeric codes, so saved profiles stay readable and portable.
 *
 * - `key:BUTTON_A`           key / gamepad button / D-pad key / volume key
 * - `mouse:btn:primary`      mouse button (primary = left, secondary = right, tertiary = middle)
 * - `mouse:x`, `mouse:y`     relative mouse movement
 * - `mouse:wheel:up`         mouse wheel notch (momentary)
 * - `axis:X`                 absolute joystick / gamepad axis
 * - `axis:X:+`, `axis:X:-`   digital direction derived from an absolute axis
 */
object SourceIds {
    const val MOUSE_X = "mouse:x"
    const val MOUSE_Y = "mouse:y"

    val MOUSE_BUTTONS = listOf("primary", "secondary", "tertiary", "back", "forward")
    val WHEEL_DIRECTIONS = listOf("up", "down", "left", "right")

    fun key(name: String) = "key:$name"
    fun mouseButton(name: String) = "mouse:btn:$name"
    fun wheel(direction: String) = "mouse:wheel:$direction"
    fun axis(name: String) = "axis:$name"
    fun axisDirection(name: String, positive: Boolean) = "axis:$name:" + if (positive) "+" else "-"

    private val PATTERN = Regex(
        "^(key:[A-Z0-9_]{1,48}" +
            "|mouse:[xy]" +
            "|mouse:btn:(primary|secondary|tertiary|back|forward)" +
            "|mouse:wheel:(up|down|left|right)" +
            "|axis:[A-Z0-9_]{1,32}(:[+-])?)$",
    )

    fun isValid(id: String): Boolean = PATTERN.matches(id)
}

/** Labels and kinds for physical sources. */
object InputCatalog {

    fun kindOf(sourceId: String): SourceKind? {
        if (!SourceIds.isValid(sourceId)) return null
        return when {
            sourceId == SourceIds.MOUSE_X || sourceId == SourceIds.MOUSE_Y -> SourceKind.RELATIVE
            sourceId.startsWith("axis:") && (sourceId.endsWith(":+") || sourceId.endsWith(":-")) -> SourceKind.DIGITAL
            sourceId.startsWith("axis:") -> SourceKind.ANALOG
            else -> SourceKind.DIGITAL
        }
    }

    fun labelOf(sourceId: String): String {
        val parts = sourceId.split(':')
        return when (parts.firstOrNull()) {
            "key" -> keyLabel(parts.getOrElse(1) { "?" })
            "mouse" -> when (parts.getOrNull(1)) {
                "x" -> "Mouse Movement X"
                "y" -> "Mouse Movement Y"
                "btn" -> "Mouse Button " + when (parts.getOrNull(2)) {
                    "primary" -> "Left"
                    "secondary" -> "Right"
                    "tertiary" -> "Middle"
                    "back" -> "Back"
                    "forward" -> "Forward"
                    else -> "?"
                }
                "wheel" -> "Mouse Wheel " + pretty(parts.getOrElse(2) { "?" })
                else -> sourceId
            }
            "axis" -> axisLabel(parts.getOrElse(1) { "?" }, parts.getOrNull(2))
            else -> sourceId
        }
    }

    private val SPECIAL_KEYS = mapOf(
        "THUMBL" to "Left Thumb",
        "THUMBR" to "Right Thumb",
        "PLAY_PAUSE" to "Play/Pause",
    )

    private fun keyLabel(name: String): String {
        if (name.all { it.isDigit() }) return "Key Code $name"
        return when {
            name.startsWith("BUTTON_") -> {
                val b = name.removePrefix("BUTTON_")
                if (b.all { it.isDigit() }) "Button $b" else "Gamepad Button ${pretty(b)}"
            }
            name.startsWith("DPAD_") -> "D-pad ${pretty(name.removePrefix("DPAD_"))}"
            name.startsWith("VOLUME_") -> "Volume ${pretty(name.removePrefix("VOLUME_"))}"
            name.startsWith("MEDIA_") -> "Media ${pretty(name.removePrefix("MEDIA_"))}"
            name == "BACK" -> "Back Key"
            else -> "Keyboard ${pretty(name)}"
        }
    }

    private fun axisLabel(name: String, direction: String?): String {
        val base = when (name) {
            "X", "Y", "Z", "RX", "RY", "RZ" -> "Joystick Axis $name"
            "HAT_X" -> "D-pad Hat X"
            "HAT_Y" -> "D-pad Hat Y"
            "LTRIGGER" -> "Analog Trigger L"
            "RTRIGGER" -> "Analog Trigger R"
            "GAS" -> "Analog Gas"
            "BRAKE" -> "Analog Brake"
            else -> if (name.all { it.isDigit() }) "Axis $name" else "Axis ${pretty(name)}"
        }
        if (direction == null) return base
        val horizontal = name == "X" || name == "Z" || name == "RX" || name == "HAT_X"
        val vertical = name == "Y" || name == "RZ" || name == "RY" || name == "HAT_Y"
        val hint = when {
            horizontal -> if (direction == "+") " (right)" else " (left)"
            // Android vertical axes are positive downwards.
            vertical -> if (direction == "+") " (down)" else " (up)"
            else -> ""
        }
        return "$base$direction$hint"
    }

    private fun pretty(raw: String): String {
        SPECIAL_KEYS[raw]?.let { return it }
        return raw.split('_').filter { it.isNotEmpty() }.joinToString(" ") { word ->
            // Keep short codes such as "L1", "R2" or single letters; title-case real words.
            if (word.length == 1 || word.any { it.isDigit() }) word else word.lowercase(Locale.ROOT).replaceFirstChar { it.titlecase(Locale.ROOT) }
        }
    }
}

/** A control on a virtual Quest Touch controller. */
data class VirtualTarget(
    val id: String,
    val hand: Hand,
    val control: String,
    val label: String,
    val type: TargetType,
    /** 0 = X, 1 = Y for stick targets, -1 otherwise. */
    val axis: Int = -1,
    /** +1 / -1 for stick directions, 0 otherwise. */
    val direction: Int = 0,
)

/**
 * Catalog of virtual Quest Touch inputs.
 *
 * Stick values use the OpenXR convention: X positive = right, Y positive = up.
 */
object VirtualTargets {
    const val STICK_CLICK = "stickClick"
    const val TRIGGER = "trigger"
    const val GRIP = "grip"

    fun buttonControls(hand: Hand): List<String> = when (hand) {
        Hand.LEFT -> listOf(STICK_CLICK, "x", "y", "menu")
        Hand.RIGHT -> listOf(STICK_CLICK, "a", "b", "system")
    }

    val analogControls = listOf(TRIGGER, GRIP)

    val all: List<VirtualTarget> = buildList {
        for (hand in Hand.entries) {
            val p = hand.key
            add(VirtualTarget("$p.stick.x", hand, "stick", "Joystick X", TargetType.STICK_AXIS, axis = 0))
            add(VirtualTarget("$p.stick.y", hand, "stick", "Joystick Y", TargetType.STICK_AXIS, axis = 1))
            add(VirtualTarget("$p.stick.up", hand, "stick", "Joystick Up", TargetType.STICK_DIRECTION, axis = 1, direction = 1))
            add(VirtualTarget("$p.stick.down", hand, "stick", "Joystick Down", TargetType.STICK_DIRECTION, axis = 1, direction = -1))
            add(VirtualTarget("$p.stick.left", hand, "stick", "Joystick Left", TargetType.STICK_DIRECTION, axis = 0, direction = -1))
            add(VirtualTarget("$p.stick.right", hand, "stick", "Joystick Right", TargetType.STICK_DIRECTION, axis = 0, direction = 1))
            add(VirtualTarget("$p.$STICK_CLICK", hand, STICK_CLICK, "Joystick Click", TargetType.BUTTON))
            when (hand) {
                Hand.LEFT -> {
                    add(VirtualTarget("left.x", hand, "x", "X", TargetType.BUTTON))
                    add(VirtualTarget("left.y", hand, "y", "Y", TargetType.BUTTON))
                    add(VirtualTarget("left.menu", hand, "menu", "Menu", TargetType.BUTTON))
                }
                Hand.RIGHT -> {
                    add(VirtualTarget("right.a", hand, "a", "A", TargetType.BUTTON))
                    add(VirtualTarget("right.b", hand, "b", "B", TargetType.BUTTON))
                    add(VirtualTarget("right.system", hand, "system", "System", TargetType.BUTTON))
                }
            }
            add(VirtualTarget("$p.$TRIGGER", hand, TRIGGER, "Trigger", TargetType.ANALOG))
            add(VirtualTarget("$p.$GRIP", hand, GRIP, "Grip", TargetType.ANALOG))
        }
    }

    private val byId = all.associateBy { it.id }

    fun get(id: String): VirtualTarget? = byId[id]

    /** Relative mouse movement can only drive joystick axes; everything else is accepted. */
    fun isCompatible(kind: SourceKind, type: TargetType): Boolean = when (kind) {
        SourceKind.RELATIVE -> type == TargetType.STICK_AXIS
        SourceKind.DIGITAL, SourceKind.ANALOG -> true
    }

    /** Upper-case label used in event logs, e.g. "BUTTON A", "JOYSTICK CLICK". */
    fun logLabel(control: String): String = when (control) {
        STICK_CLICK -> "JOYSTICK CLICK"
        "x", "y", "a", "b" -> "BUTTON ${control.uppercase(Locale.ROOT)}"
        else -> control.uppercase(Locale.ROOT)
    }
}
