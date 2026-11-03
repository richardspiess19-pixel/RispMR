package com.rispmr.vrboxemulator.engine

/** One association "physical source -> virtual target". */
data class MappingRule(
    val id: String,
    val source: String,
    val target: String,
    /** Flips the sign of analog/relative values (or the side used by an analog->button rule). */
    val invert: Boolean = false,
    /** Analog -> digital threshold. `null` uses [ButtonConfig.analogThreshold]. */
    val threshold: Float? = null,
    /** Gain applied to analog / relative values. */
    val scale: Float = 1f,
)

/** Profile-wide options for button-like conversions. */
data class ButtonConfig(
    /** Analog value at which an analog source counts as "pressed". */
    val analogThreshold: Float = 0.5f,
    /** Value produced on trigger/grip when a digital source drives them. */
    val digitalAnalogValue: Float = 1f,
)

/** Current state of every physical input seen by the engine. */
class PhysicalState {
    val digital = HashMap<String, Boolean>()
    val analog = HashMap<String, Float>()

    fun isPressed(id: String): Boolean = digital[id] == true
    fun value(id: String): Float = analog[id] ?: 0f

    fun pressedIds(): List<String> = digital.filterValues { it }.keys.sorted()

    fun clear() {
        digital.clear()
        analog.clear()
    }
}

/** Output of [ControllerMapper.evaluate]: what each virtual target should be, before stick processing. */
class MappedFrame {
    /** Pressed buttons, keyed by target id ("left.x"). */
    val buttons = HashMap<String, Boolean>()

    /** Trigger / grip values (0..1), keyed by target id ("right.trigger"). */
    val analog = HashMap<String, Float>()

    /** Absolute stick contributions [lx, ly, rx, ry] in OpenXR convention (+y = up). */
    val stick = FloatArray(4)

    fun clear() {
        buttons.clear()
        analog.clear()
        stick.fill(0f)
    }
}

fun interface MotionSink {
    fun onMotion(hand: Hand, axis: Int, delta: Float)
}

/**
 * Converts physical state into virtual controller state according to the active rules.
 *
 * Several sources may drive the same target: buttons are OR-ed, trigger/grip take the
 * maximum, stick contributions are summed (and clamped later by the stick processor).
 */
class ControllerMapper {
    private class Compiled(val rule: MappingRule, val target: VirtualTarget, val kind: SourceKind)

    private var stateRules: List<Compiled> = emptyList()
    private var motionRules: List<Compiled> = emptyList()

    var rules: List<MappingRule> = emptyList()
        private set
    var buttonConfig = ButtonConfig()
        private set

    /** Rules that were rejected (unknown source/target or incompatible types). */
    var rejected: List<MappingRule> = emptyList()
        private set

    fun configure(rules: List<MappingRule>, buttons: ButtonConfig) {
        val compiled = ArrayList<Compiled>()
        val bad = ArrayList<MappingRule>()
        for (rule in rules) {
            val target = VirtualTargets.get(rule.target)
            val kind = InputCatalog.kindOf(rule.source)
            if (target == null || kind == null || !VirtualTargets.isCompatible(kind, target.type)) {
                bad += rule
            } else {
                compiled += Compiled(rule, target, kind)
            }
        }
        this.rules = rules
        this.buttonConfig = buttons
        this.rejected = bad
        stateRules = compiled.filter { it.kind != SourceKind.RELATIVE }
        motionRules = compiled.filter { it.kind == SourceKind.RELATIVE }
    }

    fun evaluate(state: PhysicalState, out: MappedFrame) {
        out.clear()
        for (c in stateRules) {
            val t = c.target
            when (t.type) {
                TargetType.BUTTON -> if (digital(c, state)) out.buttons[t.id] = true
                TargetType.ANALOG -> {
                    val v = analog01(c, state)
                    if (v > (out.analog[t.id] ?: 0f)) out.analog[t.id] = v
                }
                TargetType.STICK_AXIS -> {
                    var v = signed(c, state)
                    // Android analog Y axes are positive downwards; virtual sticks are positive upwards.
                    if (t.axis == 1 && c.kind == SourceKind.ANALOG) v = -v
                    out.stick[t.hand.ordinal * 2 + t.axis] += v
                }
                TargetType.STICK_DIRECTION -> if (digital(c, state)) {
                    out.stick[t.hand.ordinal * 2 + t.axis] += t.direction.toFloat()
                }
            }
        }
    }

    /** Routes relative mouse deltas (device counts) to stick axes. */
    fun routeMotion(dx: Float, dy: Float, sink: MotionSink) {
        for (c in motionRules) {
            val raw = if (c.rule.source == SourceIds.MOUSE_X) dx else dy
            if (raw == 0f) continue
            var v = raw * c.rule.scale
            if (c.rule.invert) v = -v
            // Mouse Y is positive downwards; virtual sticks are positive upwards.
            if (c.target.axis == 1) v = -v
            sink.onMotion(c.target.hand, c.target.axis, v)
        }
    }

    fun hasMotionRules(): Boolean = motionRules.isNotEmpty()

    private fun digital(c: Compiled, state: PhysicalState): Boolean = when (c.kind) {
        SourceKind.DIGITAL -> state.isPressed(c.rule.source)
        SourceKind.ANALOG -> {
            val v = state.value(c.rule.source) * if (c.rule.invert) -1f else 1f
            v >= (c.rule.threshold ?: buttonConfig.analogThreshold)
        }
        SourceKind.RELATIVE -> false
    }

    private fun analog01(c: Compiled, state: PhysicalState): Float = when (c.kind) {
        SourceKind.DIGITAL -> if (state.isPressed(c.rule.source)) buttonConfig.digitalAnalogValue else 0f
        SourceKind.ANALOG -> {
            val v = state.value(c.rule.source) * c.rule.scale * if (c.rule.invert) -1f else 1f
            v.coerceIn(0f, 1f)
        }
        SourceKind.RELATIVE -> 0f
    }

    private fun signed(c: Compiled, state: PhysicalState): Float {
        val sign = if (c.rule.invert) -1f else 1f
        return when (c.kind) {
            SourceKind.DIGITAL -> if (state.isPressed(c.rule.source)) sign * c.rule.scale else 0f
            SourceKind.ANALOG -> state.value(c.rule.source) * c.rule.scale * sign
            SourceKind.RELATIVE -> 0f
        }
    }
}
