package com.rispmr.vrboxemulator.engine

/** State change of a virtual control, used for the event log and the UI. */
data class VirtualEvent(
    val hand: Hand,
    val control: String,
    val pressed: Boolean,
    /** Analog value for trigger/grip, `null` for digital buttons. */
    val value: Float?,
) {
    /** e.g. "Direito · botão A pressionado", "Esquerdo · gatilho pressionado (0,82)". */
    fun describe(): String {
        val base = "${hand.label} · ${VirtualTargets.logLabel(control)} ${if (pressed) "pressionado" else "solto"}"
        return if (value != null && pressed) "$base (${"%.2f".format(PT_BR, value)})" else base
    }

    companion object {
        val PT_BR: java.util.Locale = java.util.Locale.forLanguageTag("pt-BR")
    }
}

fun interface VirtualEventListener {
    fun onVirtualEvent(event: VirtualEvent)
}

/** Immutable copy of one virtual controller, safe to hand to other threads. */
data class HandSnapshot(
    val hand: Hand,
    val stickX: Float,
    val stickY: Float,
    val rawX: Float,
    val rawY: Float,
    val trigger: Float,
    val grip: Float,
    /** Button control name -> pressed, in [VirtualTargets.buttonControls] order. */
    val buttons: Map<String, Boolean>,
) {
    fun pressed(control: String): Boolean = buttons[control] == true

    companion object {
        fun neutral(hand: Hand) = HandSnapshot(
            hand, 0f, 0f, 0f, 0f, 0f, 0f,
            VirtualTargets.buttonControls(hand).associateWith { false },
        )
    }
}

data class ControllerSnapshot(val left: HandSnapshot, val right: HandSnapshot, val version: Long)

/** Live state of one virtual Quest Touch controller. Each control has an independent state. */
class VirtualController(val hand: Hand) {
    val buttonNames: List<String> = VirtualTargets.buttonControls(hand)
    private val buttons = LinkedHashMap<String, Boolean>().apply { buttonNames.forEach { put(it, false) } }
    var trigger = 0f
        private set
    var grip = 0f
        private set
    var stickX = 0f
    var stickY = 0f
    var rawX = 0f
    var rawY = 0f
    private var triggerPressed = false
    private var gripPressed = false

    fun button(name: String): Boolean = buttons[name] == true

    /** @return the event to emit, or null if nothing changed. */
    fun setButton(name: String, pressed: Boolean): VirtualEvent? {
        if (buttons[name] == pressed) return null
        buttons[name] = pressed
        return VirtualEvent(hand, name, pressed, null)
    }

    /**
     * Updates trigger/grip. Returns the analog change flag and, through [emit], a PRESSED/RELEASED
     * event when the value crosses the threshold (with hysteresis).
     */
    fun setAnalog(name: String, value: Float, threshold: Float, emit: (VirtualEvent) -> Unit): Boolean {
        val v = value.coerceIn(0f, 1f)
        val previous = if (name == VirtualTargets.TRIGGER) trigger else grip
        if (previous == v) return false
        val wasPressed = if (name == VirtualTargets.TRIGGER) triggerPressed else gripPressed
        val nowPressed = if (wasPressed) v > threshold * RELEASE_RATIO else v >= threshold
        if (name == VirtualTargets.TRIGGER) {
            trigger = v
            triggerPressed = nowPressed
        } else {
            grip = v
            gripPressed = nowPressed
        }
        if (nowPressed != wasPressed) emit(VirtualEvent(hand, name, nowPressed, v))
        return true
    }

    fun snapshot() = HandSnapshot(hand, stickX, stickY, rawX, rawY, trigger, grip, LinkedHashMap(buttons))

    companion object {
        const val RELEASE_RATIO = 0.7f
    }
}

/**
 * Owns the two virtual controllers and runs the mapping + joystick pipeline.
 *
 * Not thread safe: the Android layer confines it to the main thread.
 */
class VirtualControllerManager(val mapper: ControllerMapper = ControllerMapper()) {
    val left = VirtualController(Hand.LEFT)
    val right = VirtualController(Hand.RIGHT)
    private val controllers = arrayOf(left, right)
    private val sticks = arrayOf(VirtualStickProcessor(), VirtualStickProcessor())
    private val frame = MappedFrame()
    private val emitter: (VirtualEvent) -> Unit = { listener?.onVirtualEvent(it) }

    var listener: VirtualEventListener? = null

    /** Incremented on every visible change; cheap change detection for UI and network output. */
    var version = 0L
        private set

    fun controller(hand: Hand) = controllers[hand.ordinal]
    fun stick(hand: Hand) = sticks[hand.ordinal]

    fun configure(mappings: List<MappingRule>, buttons: ButtonConfig, left: StickConfig, right: StickConfig) {
        mapper.configure(mappings, buttons)
        sticks[0].config = left
        sticks[1].config = right
    }

    /** Re-evaluates buttons, trigger, grip and absolute stick contributions. */
    fun onPhysicalState(state: PhysicalState, nowMs: Long): Boolean {
        mapper.evaluate(state, frame)
        var changed = false
        val threshold = mapper.buttonConfig.analogThreshold
        for (c in controllers) {
            val prefix = c.hand.key
            for (name in c.buttonNames) {
                c.setButton(name, frame.buttons["$prefix.$name"] == true)?.let {
                    changed = true
                    emitter(it)
                }
            }
            changed = c.setAnalog(VirtualTargets.TRIGGER, frame.analog["$prefix.trigger"] ?: 0f, threshold, emitter) || changed
            changed = c.setAnalog(VirtualTargets.GRIP, frame.analog["$prefix.grip"] ?: 0f, threshold, emitter) || changed
            val i = c.hand.ordinal
            sticks[i].setAbsolute(frame.stick[i * 2], frame.stick[i * 2 + 1], nowMs)
        }
        changed = updateSticks(nowMs) || changed
        if (changed) version++
        return changed
    }

    fun onMotion(dx: Float, dy: Float, nowMs: Long): Boolean {
        mapper.routeMotion(dx, dy) { hand, axis, delta -> sticks[hand.ordinal].addMotion(axis, delta, nowMs) }
        val changed = updateSticks(nowMs)
        if (changed) version++
        return changed
    }

    fun tick(nowMs: Long): Boolean {
        val changed = updateSticks(nowMs)
        if (changed) version++
        return changed
    }

    fun needsTick(): Boolean = sticks[0].isActive || sticks[1].isActive

    /** Releases everything (disconnection, emulation stop, focus loss). */
    fun reset(nowMs: Long) {
        var changed = false
        for (c in controllers) {
            for (name in c.buttonNames) c.setButton(name, false)?.let { changed = true; emitter(it) }
            changed = c.setAnalog(VirtualTargets.TRIGGER, 0f, mapper.buttonConfig.analogThreshold, emitter) || changed
            changed = c.setAnalog(VirtualTargets.GRIP, 0f, mapper.buttonConfig.analogThreshold, emitter) || changed
        }
        for (s in sticks) s.reset()
        changed = updateSticks(nowMs) || changed
        for (c in controllers) {
            c.stickX = 0f; c.stickY = 0f; c.rawX = 0f; c.rawY = 0f
        }
        if (changed) version++
    }

    fun snapshot() = ControllerSnapshot(left.snapshot(), right.snapshot(), version)

    private fun updateSticks(nowMs: Long): Boolean {
        var changed = false
        for (i in 0..1) {
            val s = sticks[i]
            if (s.update(nowMs)) changed = true
            val c = controllers[i]
            c.stickX = s.x
            c.stickY = s.y
            c.rawX = s.rawX
            c.rawY = s.rawY
        }
        return changed
    }
}
