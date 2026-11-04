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

    /** Human label in Portuguese (pt-BR), e.g. "Botão A (gamepad)", "Botão esquerdo do mouse". */
    fun labelOf(sourceId: String): String {
        val parts = sourceId.split(':')
        return when (parts.firstOrNull()) {
            "key" -> keyLabel(parts.getOrElse(1) { "?" })
            "mouse" -> when (parts.getOrNull(1)) {
                "x" -> "Movimento do mouse (X)"
                "y" -> "Movimento do mouse (Y)"
                "btn" -> when (parts.getOrNull(2)) {
                    "primary" -> "Botão esquerdo do mouse"
                    "secondary" -> "Botão direito do mouse"
                    "tertiary" -> "Botão do meio do mouse"
                    "back" -> "Botão voltar do mouse"
                    "forward" -> "Botão avançar do mouse"
                    else -> "Botão do mouse"
                }
                "wheel" -> "Roda do mouse " + when (parts.getOrNull(2)) {
                    "up" -> "para cima"
                    "down" -> "para baixo"
                    "left" -> "para a esquerda"
                    "right" -> "para a direita"
                    else -> "?"
                }
                else -> sourceId
            }
            "axis" -> axisLabel(parts.getOrElse(1) { "?" }, parts.getOrNull(2))
            else -> sourceId
        }
    }

    private val GAMEPAD_BUTTONS = mapOf(
        "THUMBL" to "Clique do analógico esquerdo",
        "THUMBR" to "Clique do analógico direito",
        "START" to "Botão Start",
        "SELECT" to "Botão Select",
        "MODE" to "Botão Mode",
    )

    private val KEYS = mapOf(
        "DPAD_UP" to "D-pad cima",
        "DPAD_DOWN" to "D-pad baixo",
        "DPAD_LEFT" to "D-pad esquerda",
        "DPAD_RIGHT" to "D-pad direita",
        "DPAD_CENTER" to "D-pad centro",
        "VOLUME_UP" to "Volume +",
        "VOLUME_DOWN" to "Volume −",
        "VOLUME_MUTE" to "Mudo",
        "MEDIA_PLAY_PAUSE" to "Play/pause",
        "MEDIA_PLAY" to "Play",
        "MEDIA_PAUSE" to "Pause",
        "MEDIA_STOP" to "Parar mídia",
        "MEDIA_NEXT" to "Próxima faixa",
        "MEDIA_PREVIOUS" to "Faixa anterior",
        "BACK" to "Tecla voltar",
        "ENTER" to "Tecla Enter",
        "SPACE" to "Tecla espaço",
        "ESCAPE" to "Tecla Esc",
        "MENU" to "Tecla menu",
        "PAGE_UP" to "Page Up",
        "PAGE_DOWN" to "Page Down",
    )

    private fun keyLabel(name: String): String {
        if (name.all { it.isDigit() }) return "Tecla código $name"
        KEYS[name]?.let { return it }
        return when {
            name.startsWith("BUTTON_") -> {
                val b = name.removePrefix("BUTTON_")
                when {
                    b.all { it.isDigit() } -> "Botão $b"
                    GAMEPAD_BUTTONS.containsKey(b) -> GAMEPAD_BUTTONS.getValue(b)
                    else -> "Botão $b (gamepad)"
                }
            }
            name.startsWith("MEDIA_") -> "Mídia ${pretty(name.removePrefix("MEDIA_"))}"
            else -> "Tecla ${pretty(name)}"
        }
    }

    private fun axisLabel(name: String, direction: String?): String {
        val base = when (name) {
            "X", "Y", "Z", "RX", "RY", "RZ" -> "Eixo $name do joystick"
            "HAT_X" -> "D-pad horizontal"
            "HAT_Y" -> "D-pad vertical"
            "LTRIGGER" -> "Gatilho analógico L"
            "RTRIGGER" -> "Gatilho analógico R"
            "GAS" -> "Acelerador analógico"
            "BRAKE" -> "Freio analógico"
            else -> "Eixo $name"
        }
        if (direction == null) return base
        val horizontal = name == "X" || name == "Z" || name == "RX" || name == "HAT_X"
        val vertical = name == "Y" || name == "RZ" || name == "RY" || name == "HAT_Y"
        val hint = when {
            horizontal -> if (direction == "+") "direita" else "esquerda"
            // Android vertical axes are positive downwards.
            vertical -> if (direction == "+") "baixo" else "cima"
            else -> if (direction == "+") "positivo" else "negativo"
        }
        return "$base → $hint"
    }

    private fun pretty(raw: String): String =
        raw.split('_').filter { it.isNotEmpty() }.joinToString(" ") { word ->
            // Keep short codes such as "L1", "R2" or single letters; title-case real words.
            if (word.length == 1 || word.any { it.isDigit() }) word else word.lowercase(Locale.ROOT).replaceFirstChar { it.titlecase(Locale.ROOT) }
        }
}

/** A control on a virtual Joy-Con. */
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
 * Catalog of the two virtual Joy-Con style controllers (left and right).
 *
 * Left: stick, stick click, ↑ ↓ ← → buttons, −, Captura, L (grip) and ZL (trigger).
 * Right: stick, stick click, A B X Y, +, Home, R (grip) and ZR (trigger).
 * Stick values: X positive = right, Y positive = up.
 */
object VirtualTargets {
    const val STICK_CLICK = "stickClick"
    const val TRIGGER = "trigger"
    const val GRIP = "grip"

    fun buttonControls(hand: Hand): List<String> = when (hand) {
        Hand.LEFT -> listOf(STICK_CLICK, "up", "down", "left", "right", "minus", "capture")
        Hand.RIGHT -> listOf(STICK_CLICK, "a", "b", "x", "y", "plus", "home")
    }

    val analogControls = listOf(TRIGGER, GRIP)

    val all: List<VirtualTarget> = buildList {
        for (hand in Hand.entries) {
            val p = hand.key
            add(VirtualTarget("$p.stick.x", hand, "stick", "Joystick X", TargetType.STICK_AXIS, axis = 0))
            add(VirtualTarget("$p.stick.y", hand, "stick", "Joystick Y", TargetType.STICK_AXIS, axis = 1))
            add(VirtualTarget("$p.stick.up", hand, "stick", "Joystick para cima", TargetType.STICK_DIRECTION, axis = 1, direction = 1))
            add(VirtualTarget("$p.stick.down", hand, "stick", "Joystick para baixo", TargetType.STICK_DIRECTION, axis = 1, direction = -1))
            add(VirtualTarget("$p.stick.left", hand, "stick", "Joystick para a esquerda", TargetType.STICK_DIRECTION, axis = 0, direction = -1))
            add(VirtualTarget("$p.stick.right", hand, "stick", "Joystick para a direita", TargetType.STICK_DIRECTION, axis = 0, direction = 1))
            add(VirtualTarget("$p.$STICK_CLICK", hand, STICK_CLICK, "Clique do joystick", TargetType.BUTTON))
            when (hand) {
                Hand.LEFT -> {
                    add(VirtualTarget("left.up", hand, "up", "Seta ↑", TargetType.BUTTON))
                    add(VirtualTarget("left.down", hand, "down", "Seta ↓", TargetType.BUTTON))
                    add(VirtualTarget("left.left", hand, "left", "Seta ←", TargetType.BUTTON))
                    add(VirtualTarget("left.right", hand, "right", "Seta →", TargetType.BUTTON))
                    add(VirtualTarget("left.minus", hand, "minus", "−", TargetType.BUTTON))
                    add(VirtualTarget("left.capture", hand, "capture", "Captura", TargetType.BUTTON))
                }
                Hand.RIGHT -> {
                    add(VirtualTarget("right.a", hand, "a", "A", TargetType.BUTTON))
                    add(VirtualTarget("right.b", hand, "b", "B", TargetType.BUTTON))
                    add(VirtualTarget("right.x", hand, "x", "X", TargetType.BUTTON))
                    add(VirtualTarget("right.y", hand, "y", "Y", TargetType.BUTTON))
                    add(VirtualTarget("right.plus", hand, "plus", "+", TargetType.BUTTON))
                    add(VirtualTarget("right.home", hand, "home", "Home", TargetType.BUTTON))
                }
            }
            add(VirtualTarget("$p.$TRIGGER", hand, TRIGGER, if (hand == Hand.LEFT) "ZL" else "ZR", TargetType.ANALOG))
            add(VirtualTarget("$p.$GRIP", hand, GRIP, if (hand == Hand.LEFT) "L" else "R", TargetType.ANALOG))
        }
    }

    private val byId = all.associateBy { it.id }

    fun get(id: String): VirtualTarget? = byId[id]

    /**
     * Targets of the earlier Quest Touch layout -> Joy-Con layout, so saved profiles keep working:
     * X and Y move to the right Joy-Con (like on the Switch), Menu becomes +, System becomes Home.
     */
    val LEGACY: Map<String, String> = mapOf(
        "left.x" to "right.x",
        "left.y" to "right.y",
        "left.menu" to "right.plus",
        "right.system" to "right.home",
    )

    /** Current id of a target (old Quest ids are renamed). */
    fun canonical(id: String): String = LEGACY[id] ?: id

    /** Relative mouse movement can only drive joystick axes; everything else is accepted. */
    fun isCompatible(kind: SourceKind, type: TargetType): Boolean = when (kind) {
        SourceKind.RELATIVE -> type == TargetType.STICK_AXIS
        SourceKind.DIGITAL, SourceKind.ANALOG -> true
    }

    /** Label used in event logs, e.g. "botão A", "clique do joystick". */
    fun logLabel(control: String, hand: Hand? = null): String = when (control) {
        TRIGGER -> if (hand == Hand.RIGHT) "ZR" else if (hand == Hand.LEFT) "ZL" else "ZL/ZR"
        GRIP -> if (hand == Hand.RIGHT) "R" else if (hand == Hand.LEFT) "L" else "L/R"
        STICK_CLICK -> "clique do joystick"
        "x", "y", "a", "b" -> "botão ${control.uppercase(Locale.ROOT)}"
        "up" -> "seta ↑"
        "down" -> "seta ↓"
        "left" -> "seta ←"
        "right" -> "seta →"
        "minus" -> "botão −"
        "plus" -> "botão +"
        "capture" -> "Captura"
        "home" -> "Home"
        else -> control
    }
}
