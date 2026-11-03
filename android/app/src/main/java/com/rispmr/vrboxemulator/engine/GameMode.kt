package com.rispmr.vrboxemulator.engine

import org.json.JSONObject
import kotlin.math.abs
import kotlin.math.hypot

/**
 * Modo jogo: turns the virtual Quest controls into screen touches inside the game that is
 * open on the phone (Cardboard trigger, on-screen buttons and joysticks).
 *
 * Phone VR games do not understand Quest controllers, but every game understands touches.
 * The Android side performs the touches with an Accessibility Service; this file only holds
 * the configuration and the pure planning logic, so it is unit tested on the JVM.
 *
 * Coordinates are fractions of the screen (0..1), so a layout works in any resolution.
 */
enum class TouchAction(val key: String) {
    /** Not used. */
    OFF("off"),

    /** Finger goes down when the control is pressed and up when it is released. */
    HOLD("hold"),

    /** A quick tap every time the control is pressed, however long it is held. */
    TAP("tap");

    companion object {
        fun fromKey(key: String?): TouchAction? = entries.firstOrNull { it.key == key }
    }
}

/** How the games receive the VR Box. */
enum class GameOutput(val key: String) {
    /** A virtual gamepad that every app sees (needs Shizuku). */
    GAMEPAD("gamepad"),

    /** Touches on the screen of the open game (accessibility gestures). */
    TOUCH("touch");

    companion object {
        fun fromKey(key: String?): GameOutput? = entries.firstOrNull { it.key == key }
    }
}

data class TouchPoint(val action: TouchAction = TouchAction.OFF, val x: Float = 0.5f, val y: Float = 0.5f)

/** A joystick drawn on the game screen: the finger is dragged around [x],[y] inside [radius]. */
data class StickTouch(
    val enabled: Boolean = false,
    val x: Float = 0.18f,
    val y: Float = 0.72f,
    /** Fraction of the shorter screen side. */
    val radius: Float = 0.12f,
)

data class GameModeConfig(
    val enabled: Boolean = true,
    val output: GameOutput = GameOutput.GAMEPAD,
    /** Keyed by virtual target id of buttons, trigger and grip ("right.a", "left.trigger"...). */
    val buttons: Map<String, TouchPoint> = emptyMap(),
    val leftStick: StickTouch = StickTouch(),
    val rightStick: StickTouch = StickTouch(x = 0.82f),
) {
    fun stick(hand: Hand) = if (hand == Hand.LEFT) leftStick else rightStick

    companion object {
        /** Ids that can be bound to a touch point (digital buttons + trigger + grip). */
        val BINDABLE: List<String> = VirtualTargets.all
            .filter { it.type == TargetType.BUTTON || it.type == TargetType.ANALOG }
            .map { it.id }

        /**
         * Default: the Cardboard button. The main buttons touch the center of the screen,
         * exactly like pressing the button on a Cardboard viewer.
         */
        fun cardboard() = GameModeConfig(
            buttons = mapOf(
                "right.trigger" to TouchPoint(TouchAction.HOLD, 0.5f, 0.5f),
                "right.a" to TouchPoint(TouchAction.HOLD, 0.5f, 0.5f),
            ),
        )
    }
}

object GameModeCodec {
    fun encode(c: GameModeConfig): JSONObject = JSONObject().apply {
        put("enabled", c.enabled)
        put("output", c.output.key)
        put(
            "buttons",
            JSONObject().apply {
                c.buttons.forEach { (id, p) -> put(id, JSONObject().put("action", p.action.key).put("x", p.x.toDouble()).put("y", p.y.toDouble())) }
            },
        )
        put("leftStick", encodeStick(c.leftStick))
        put("rightStick", encodeStick(c.rightStick))
    }

    private fun encodeStick(s: StickTouch) = JSONObject()
        .put("enabled", s.enabled)
        .put("x", s.x.toDouble())
        .put("y", s.y.toDouble())
        .put("radius", s.radius.toDouble())

    /** Lenient decode: invalid entries are dropped, numbers clamped. */
    fun decode(o: JSONObject?, fallback: GameModeConfig = GameModeConfig.cardboard()): GameModeConfig {
        if (o == null) return fallback
        val buttons = LinkedHashMap<String, TouchPoint>()
        val b = o.optJSONObject("buttons")
        if (b != null) {
            for (id in b.keys()) {
                if (id !in GameModeConfig.BINDABLE) continue
                val p = b.optJSONObject(id) ?: continue
                val action = TouchAction.fromKey(p.optString("action")) ?: continue
                buttons[id] = TouchPoint(action, frac(p.optDouble("x", 0.5)), frac(p.optDouble("y", 0.5)))
            }
        }
        return GameModeConfig(
            enabled = o.optBoolean("enabled", fallback.enabled),
            output = GameOutput.fromKey(o.optString("output")) ?: fallback.output,
            buttons = if (b == null) fallback.buttons else buttons,
            leftStick = decodeStick(o.optJSONObject("leftStick"), fallback.leftStick),
            rightStick = decodeStick(o.optJSONObject("rightStick"), fallback.rightStick),
        )
    }

    private fun decodeStick(o: JSONObject?, f: StickTouch): StickTouch {
        if (o == null) return f
        return StickTouch(
            enabled = o.optBoolean("enabled", f.enabled),
            x = frac(o.optDouble("x", f.x.toDouble())),
            y = frac(o.optDouble("y", f.y.toDouble())),
            radius = o.optDouble("radius", f.radius.toDouble()).toFloat().let { if (it.isNaN()) f.radius else it.coerceIn(0.03f, 0.4f) },
        )
    }

    private fun frac(v: Double): Float = if (v.isNaN()) 0.5f else v.toFloat().coerceIn(0f, 1f)
}

/** A finger that should be on the screen now (normalized coordinates). */
data class PlannedTouch(val id: String, val x: Float, val y: Float, val startX: Float, val startY: Float)

data class PlannedTap(val id: String, val x: Float, val y: Float)

data class TouchPlan(val touches: List<PlannedTouch>, val taps: List<PlannedTap>)

/**
 * Converts the virtual controller state into the touches that must be on the screen.
 * Keeps the previous state to detect TAP presses.
 */
class TouchPlanner {
    private val wasPressed = HashMap<String, Boolean>()

    /**
     * @param aspect screen width / height, used to keep on-screen joysticks round.
     */
    fun plan(snapshot: ControllerSnapshot, config: GameModeConfig, analogThreshold: Float, aspect: Float): TouchPlan {
        val touches = ArrayList<PlannedTouch>()
        val taps = ArrayList<PlannedTap>()
        for ((id, point) in config.buttons) {
            if (point.action == TouchAction.OFF) continue
            val pressed = isPressed(snapshot, id, analogThreshold)
            val before = wasPressed[id] == true
            wasPressed[id] = pressed
            when (point.action) {
                TouchAction.HOLD -> if (pressed) addMerged(touches, PlannedTouch(id, point.x, point.y, point.x, point.y))
                TouchAction.TAP -> if (pressed && !before) taps += PlannedTap(id, point.x, point.y)
                TouchAction.OFF -> Unit
            }
        }
        for (hand in Hand.entries) {
            val stick = config.stick(hand)
            if (!stick.enabled) continue
            val s = if (hand == Hand.LEFT) snapshot.left else snapshot.right
            if (hypot(s.stickX, s.stickY) < STICK_ACTIVE) continue
            // Radius is a fraction of the shorter side; convert it to each normalized axis.
            val rx = stick.radius * (if (aspect >= 1f) 1f / aspect else 1f)
            val ry = stick.radius * (if (aspect >= 1f) 1f else aspect)
            val x = (stick.x + s.stickX * rx).coerceIn(0f, 1f)
            val y = (stick.y - s.stickY * ry).coerceIn(0f, 1f) // screen y grows downwards
            touches += PlannedTouch("${hand.key}.stick", x, y, stick.x, stick.y)
        }
        return TouchPlan(touches.take(MAX_TOUCHES), taps)
    }

    fun reset() = wasPressed.clear()

    private fun isPressed(s: ControllerSnapshot, id: String, threshold: Float): Boolean {
        val dot = id.indexOf('.')
        if (dot < 0) return false
        val hand = if (id.startsWith("left")) s.left else s.right
        return when (val control = id.substring(dot + 1)) {
            VirtualTargets.TRIGGER -> hand.trigger >= threshold
            VirtualTargets.GRIP -> hand.grip >= threshold
            else -> hand.pressed(control)
        }
    }

    /** Two buttons bound to the same spot become one finger (a real finger cannot be doubled). */
    private fun addMerged(list: MutableList<PlannedTouch>, t: PlannedTouch) {
        if (list.none { abs(it.x - t.x) < MERGE_DISTANCE && abs(it.y - t.y) < MERGE_DISTANCE }) list += t
    }

    companion object {
        const val STICK_ACTIVE = 0.05f
        const val MERGE_DISTANCE = 0.01f

        /** Android accessibility gestures support up to 10 simultaneous strokes. */
        const val MAX_TOUCHES = 10
    }
}
