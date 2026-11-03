package com.rispmr.vrboxemulator.integration

import com.rispmr.vrboxemulator.engine.ControllerSnapshot
import com.rispmr.vrboxemulator.engine.HandSnapshot
import com.rispmr.vrboxemulator.engine.VirtualTargets
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.roundToLong

/** State of one virtual controller in protocol form. */
data class ProtocolHand(
    val stickX: Float,
    val stickY: Float,
    val trigger: Float,
    val grip: Float,
    val stickClick: Boolean,
    /** X (left) / A (right). */
    val primary: Boolean,
    /** Y (left) / B (right). */
    val secondary: Boolean,
    /** Menu (left) / System (right). */
    val menu: Boolean,
) {
    val buttonBits: Int
        get() = (if (stickClick) 1 else 0) or (if (primary) 2 else 0) or (if (secondary) 4 else 0) or (if (menu) 8 else 0)

    companion object {
        val NEUTRAL = ProtocolHand(0f, 0f, 0f, 0f, false, false, false, false)

        fun from(s: HandSnapshot): ProtocolHand {
            val names = VirtualTargets.buttonControls(s.hand) // [stickClick, primary, secondary, menu]
            return ProtocolHand(
                stickX = s.stickX,
                stickY = s.stickY,
                trigger = s.trigger,
                grip = s.grip,
                stickClick = s.pressed(names[0]),
                primary = s.pressed(names[1]),
                secondary = s.pressed(names[2]),
                menu = s.pressed(names[3]),
            )
        }
    }
}

data class ProtocolFrame(
    val seq: Long,
    val timestampUs: Long,
    val demo: Boolean,
    val controllerConnected: Boolean,
    val left: ProtocolHand,
    val right: ProtocolHand,
) {
    companion object {
        fun from(snapshot: ControllerSnapshot, seq: Long, timestampUs: Long, demo: Boolean, connected: Boolean) =
            ProtocolFrame(seq, timestampUs, demo, connected, ProtocolHand.from(snapshot.left), ProtocolHand.from(snapshot.right))
    }
}

/**
 * VRBQ input protocol, version 1 (see integration/InputProtocol/PROTOCOL.md).
 *
 * Two encodings carry exactly the same information:
 * - JSON text (easy to consume from any language)
 * - 60-byte little-endian binary packet (fast to parse in native code / OpenXR layers)
 */
object VrbqProtocol {
    const val VERSION = 1
    const val DEFAULT_PORT = 47900
    const val BINARY_SIZE = 60
    val MAGIC = byteArrayOf('V'.code.toByte(), 'R'.code.toByte(), 'B'.code.toByte(), 'Q'.code.toByte())

    const val FLAG_DEMO = 1
    const val FLAG_CONNECTED = 2

    fun encodeJson(f: ProtocolFrame): String = buildString(320) {
        append("{\"proto\":\"vrbq\",\"v\":").append(VERSION)
        append(",\"seq\":").append(f.seq)
        append(",\"t\":").append(f.timestampUs)
        append(",\"demo\":").append(f.demo)
        append(",\"connected\":").append(f.controllerConnected)
        append(",\"left\":")
        hand(this, f.left, "x", "y", "menu")
        append(",\"right\":")
        hand(this, f.right, "a", "b", "system")
        append('}')
    }

    private fun hand(sb: StringBuilder, h: ProtocolHand, primary: String, secondary: String, menu: String) {
        sb.append("{\"stick\":[").append(num(h.stickX)).append(',').append(num(h.stickY)).append(']')
        sb.append(",\"click\":").append(h.stickClick)
        sb.append(",\"").append(primary).append("\":").append(h.primary)
        sb.append(",\"").append(secondary).append("\":").append(h.secondary)
        sb.append(",\"").append(menu).append("\":").append(h.menu)
        sb.append(",\"trigger\":").append(num(h.trigger))
        sb.append(",\"grip\":").append(num(h.grip))
        sb.append('}')
    }

    /** Locale independent, 4 decimals ("0.1235"), never "-0" and never exponent notation. */
    fun num(v: Float): String {
        if (v.isNaN() || v.isInfinite()) return "0"
        val scaled = (v.toDouble() * 10000.0).roundToLong()
        if (scaled == 0L) return "0"
        val neg = scaled < 0
        val a = kotlin.math.abs(scaled)
        val intPart = a / 10000
        val frac = (a % 10000).toString().padStart(4, '0').trimEnd('0')
        val s = if (frac.isEmpty()) intPart.toString() else "$intPart.$frac"
        return if (neg) "-$s" else s
    }

    fun encodeBinary(f: ProtocolFrame, out: ByteArray = ByteArray(BINARY_SIZE)): ByteArray {
        require(out.size >= BINARY_SIZE)
        val b = ByteBuffer.wrap(out).order(ByteOrder.LITTLE_ENDIAN)
        b.put(MAGIC)
        b.put(VERSION.toByte())
        b.put(((if (f.demo) FLAG_DEMO else 0) or (if (f.controllerConnected) FLAG_CONNECTED else 0)).toByte())
        b.putShort(0)
        b.putInt((f.seq and 0xFFFFFFFFL).toInt())
        b.putLong(f.timestampUs)
        putHand(b, f.left)
        putHand(b, f.right)
        return out
    }

    private fun putHand(b: ByteBuffer, h: ProtocolHand) {
        b.putShort(h.buttonBits.toShort())
        b.putShort(0)
        b.putFloat(h.stickX)
        b.putFloat(h.stickY)
        b.putFloat(h.trigger)
        b.putFloat(h.grip)
    }

    /** Reference decoder (used by tests and documentation). */
    fun decodeBinary(bytes: ByteArray): ProtocolFrame {
        require(bytes.size >= BINARY_SIZE) { "Packet too short" }
        val b = ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN)
        val magic = ByteArray(4).also { b.get(it) }
        require(magic.contentEquals(MAGIC)) { "Bad magic" }
        val version = b.get().toInt()
        require(version == VERSION) { "Unsupported version $version" }
        val flags = b.get().toInt()
        b.short
        val seq = b.int.toLong() and 0xFFFFFFFFL
        val t = b.long
        return ProtocolFrame(seq, t, flags and FLAG_DEMO != 0, flags and FLAG_CONNECTED != 0, getHand(b), getHand(b))
    }

    private fun getHand(b: ByteBuffer): ProtocolHand {
        val bits = b.short.toInt()
        b.short
        return ProtocolHand(
            stickX = b.float,
            stickY = b.float,
            trigger = b.float,
            grip = b.float,
            stickClick = bits and 1 != 0,
            primary = bits and 2 != 0,
            secondary = bits and 4 != 0,
            menu = bits and 8 != 0,
        )
    }
}
