package com.rispmr.vrboxemulator.engine

import java.util.Locale

/**
 * Linux input events (`/dev/input/event*`) -> the same [RawEvent]s the app gets from Android.
 *
 * The background reader runs in the Shizuku process, which reads the VR Box directly from the
 * kernel. Android itself turns those events into KeyEvent/MotionEvent with its key layout files
 * (`Generic.kl`); the tables here follow `Generic.kl`, so a mapping learned in the app ("key:BUTTON_A",
 * "axis:X") means the same thing in the background. Scan codes seen by the app
 * (`KeyEvent.getScanCode()`) override the table, which covers devices with their own layout.
 */
object Evdev {
    const val EV_SYN = 0
    const val EV_KEY = 1
    const val EV_REL = 2
    const val EV_ABS = 3
    const val SYN_REPORT = 0
    const val SYN_DROPPED = 3

    const val REL_X = 0
    const val REL_Y = 1
    const val REL_HWHEEL = 6
    const val REL_WHEEL = 8

    /** _IOW('E', 0x90, int): exclusive access, the device stops reaching Android while held. */
    const val EVIOCGRAB = 0x40044590

    /** Mouse buttons (BTN_LEFT...) -> [SourceIds.mouseButton] names. */
    val MOUSE_BUTTONS: Map<Int, String> = mapOf(0x110 to "primary", 0x111 to "secondary", 0x112 to "tertiary", 0x113 to "back", 0x114 to "forward")

    /** Linux key code -> Android key name, as in Generic.kl (the codes a controller can send). */
    val KEYS: Map<Int, String> = buildMap {
        put(1, "ESCAPE")
        "1234567890".forEachIndexed { i, c -> put(2 + i, c.toString()) }
        put(12, "MINUS"); put(13, "EQUALS"); put(14, "DEL"); put(15, "TAB")
        "QWERTYUIOP".forEachIndexed { i, c -> put(16 + i, c.toString()) }
        put(26, "LEFT_BRACKET"); put(27, "RIGHT_BRACKET"); put(28, "ENTER"); put(29, "CTRL_LEFT")
        "ASDFGHJKL".forEachIndexed { i, c -> put(30 + i, c.toString()) }
        put(39, "SEMICOLON"); put(40, "APOSTROPHE"); put(41, "GRAVE"); put(42, "SHIFT_LEFT"); put(43, "BACKSLASH")
        "ZXCVBNM".forEachIndexed { i, c -> put(44 + i, c.toString()) }
        put(51, "COMMA"); put(52, "PERIOD"); put(53, "SLASH"); put(54, "SHIFT_RIGHT"); put(56, "ALT_LEFT")
        put(57, "SPACE"); put(58, "CAPS_LOCK")
        for (i in 0 until 10) put(59 + i, "F${i + 1}")
        put(87, "F11"); put(88, "F12"); put(96, "NUMPAD_ENTER"); put(97, "CTRL_RIGHT"); put(100, "ALT_RIGHT")
        put(102, "MOVE_HOME"); put(103, "DPAD_UP"); put(104, "PAGE_UP"); put(105, "DPAD_LEFT"); put(106, "DPAD_RIGHT")
        put(107, "MOVE_END"); put(108, "DPAD_DOWN"); put(109, "PAGE_DOWN"); put(110, "INSERT"); put(111, "FORWARD_DEL")
        put(113, "VOLUME_MUTE"); put(114, "VOLUME_DOWN"); put(115, "VOLUME_UP"); put(116, "POWER")
        put(128, "MEDIA_STOP"); put(139, "MENU"); put(158, "BACK"); put(159, "FORWARD")
        put(163, "MEDIA_NEXT"); put(164, "MEDIA_PLAY_PAUSE"); put(165, "MEDIA_PREVIOUS"); put(166, "MEDIA_STOP")
        put(167, "MEDIA_RECORD"); put(168, "MEDIA_REWIND"); put(172, "HOME"); put(200, "MEDIA_PLAY"); put(201, "MEDIA_PAUSE")
        put(207, "MEDIA_PLAY"); put(208, "MEDIA_FAST_FORWARD"); put(212, "CAMERA"); put(217, "SEARCH"); put(226, "HEADSETHOOK")
        // Joystick buttons BTN_TRIGGER..BTN_DEAD -> BUTTON_1..16.
        for (i in 0 until 16) put(0x120 + i, "BUTTON_${i + 1}")
        // Gamepad buttons.
        val pad = listOf("BUTTON_A", "BUTTON_B", "BUTTON_C", "BUTTON_X", "BUTTON_Y", "BUTTON_Z", "BUTTON_L1", "BUTTON_R1", "BUTTON_L2", "BUTTON_R2", "BUTTON_SELECT", "BUTTON_START", "BUTTON_MODE", "BUTTON_THUMBL", "BUTTON_THUMBR")
        pad.forEachIndexed { i, n -> put(0x130 + i, n) }
        put(0x160, "DPAD_CENTER"); put(0x161, "DPAD_CENTER")
        put(0x220, "DPAD_UP"); put(0x221, "DPAD_DOWN"); put(0x222, "DPAD_LEFT"); put(0x223, "DPAD_RIGHT")
    }

    /** Linux absolute axis -> Android axis name (Generic.kl). */
    val AXES: Map<Int, String> = mapOf(
        0x00 to "X", 0x01 to "Y", 0x02 to "Z", 0x03 to "RX", 0x04 to "RY", 0x05 to "RZ",
        0x06 to "THROTTLE", 0x07 to "RUDDER", 0x08 to "WHEEL", 0x09 to "GAS", 0x0a to "BRAKE",
        0x10 to "HAT_X", 0x11 to "HAT_Y",
    )

    /** Axes Android reports as -1..1 around the center (the others are 0..1). */
    private val CENTERED = setOf("X", "Y", "Z", "RX", "RY", "RZ", "HAT_X", "HAT_Y", "RUDDER", "WHEEL")

    data class AbsRange(val min: Int, val max: Int)

    /** Android's joystick normalization: centered axes to -1..1, the others to 0..1. */
    fun normalize(axis: String, raw: Int, range: AbsRange?): Float {
        val r = range ?: return raw.toFloat().coerceIn(-1f, 1f)
        if (r.max <= r.min) return 0f
        return if (axis in CENTERED || r.min < 0) {
            val center = (r.min + r.max) / 2f
            ((raw - center) * 2f / (r.max - r.min)).coerceIn(-1f, 1f)
        } else {
            ((raw - r.min).toFloat() / (r.max - r.min)).coerceIn(0f, 1f)
        }
    }

    /**
     * Parses `getevent -p` (absolute axis ranges per device node).
     * Lines look like `ABS (0003): 0000  : value 128, min 0, max 255, fuzz 0, flat 15, resolution 0`.
     */
    fun parseAbsRanges(text: String): Map<String, Map<Int, AbsRange>> {
        val out = LinkedHashMap<String, MutableMap<Int, AbsRange>>()
        var node: String? = null
        val deviceRe = Regex("""^add device \d+:\s*(\S+)""")
        val absRe = Regex("""(?:^|\s)([0-9a-fA-F]{4})\s*:\s*value\s+-?\d+,\s*min\s+(-?\d+),\s*max\s+(-?\d+)""")
        for (line in text.lineSequence()) {
            deviceRe.find(line.trim())?.let {
                node = it.groupValues[1]
                return@let
            }
            val n = node ?: continue
            val m = absRe.find(line) ?: continue
            out.getOrPut(n) { LinkedHashMap() }[m.groupValues[1].toInt(16)] = AbsRange(m.groupValues[2].toInt(), m.groupValues[3].toInt())
        }
        return out
    }

    /**
     * Reads `struct input_event` records: timeval (16 bytes on 64-bit processes, 8 on 32-bit),
     * u16 type, u16 code, s32 value, little-endian.
     */
    fun forEachEvent(buf: ByteArray, length: Int, is64Bit: Boolean, block: (type: Int, code: Int, value: Int) -> Unit) {
        val timeSize = if (is64Bit) 16 else 8
        val size = timeSize + 8
        var off = 0
        while (off + size <= length) {
            val p = off + timeSize
            val type = (buf[p].toInt() and 0xFF) or ((buf[p + 1].toInt() and 0xFF) shl 8)
            val code = (buf[p + 2].toInt() and 0xFF) or ((buf[p + 3].toInt() and 0xFF) shl 8)
            val value = (buf[p + 4].toInt() and 0xFF) or ((buf[p + 5].toInt() and 0xFF) shl 8) or
                ((buf[p + 6].toInt() and 0xFF) shl 16) or (buf[p + 7].toInt() shl 24)
            block(type, code, value)
            off += size
        }
    }

    /** "0130" (sysfs id files) -> 0x130. */
    fun hex(s: String?): Int = s?.trim()?.toIntOrNull(16) ?: -1

    fun formatHex(v: Int): String = "%04x".format(Locale.ROOT, v)
}

/**
 * Turns the event stream of one device node into [RawEvent]s.
 * Relative motion is gathered until SYN_REPORT, like Android batches it into one MotionEvent.
 */
class EvdevTranslator(
    private val deviceKey: String,
    private val ranges: Map<Int, Evdev.AbsRange> = emptyMap(),
    /** Scan code -> Android key name, learned from KeyEvent.getScanCode() in the app. */
    private val scanCodes: Map<Int, String> = emptyMap(),
) {
    private var dx = 0f
    private var dy = 0f
    private val lastAxis = HashMap<Int, Float>()

    fun translate(type: Int, code: Int, value: Int, timeMs: Long, out: MutableList<RawEvent>) {
        when (type) {
            Evdev.EV_KEY -> {
                if (value == 2) return // auto-repeat
                val pressed = value != 0
                val mouse = Evdev.MOUSE_BUTTONS[code]
                if (mouse != null && code !in scanCodes) {
                    out += RawEvent.Button(deviceKey, SourceIds.mouseButton(mouse), pressed, timeMs)
                    return
                }
                val name = scanCodes[code] ?: Evdev.KEYS[code] ?: return
                out += RawEvent.Button(deviceKey, SourceIds.key(name), pressed, timeMs)
            }
            Evdev.EV_REL -> when (code) {
                Evdev.REL_X -> dx += value
                Evdev.REL_Y -> dy += value
                Evdev.REL_WHEEL -> if (value != 0) out += RawEvent.Pulse(deviceKey, SourceIds.wheel(if (value > 0) "up" else "down"), timeMs)
                Evdev.REL_HWHEEL -> if (value != 0) out += RawEvent.Pulse(deviceKey, SourceIds.wheel(if (value > 0) "right" else "left"), timeMs)
            }
            Evdev.EV_ABS -> {
                val axis = Evdev.AXES[code] ?: return
                val v = Evdev.normalize(axis, value, ranges[code])
                if (lastAxis[code] == v) return
                lastAxis[code] = v
                out += RawEvent.Axis(deviceKey, SourceIds.axis(axis), v, timeMs)
            }
            Evdev.EV_SYN -> when (code) {
                Evdev.SYN_REPORT -> flushMotion(timeMs, out)
                Evdev.SYN_DROPPED -> {
                    dx = 0f
                    dy = 0f
                }
            }
        }
    }

    private fun flushMotion(timeMs: Long, out: MutableList<RawEvent>) {
        if (dx == 0f && dy == 0f) return
        out += RawEvent.Motion(deviceKey, dx, dy, timeMs)
        dx = 0f
        dy = 0f
    }
}
