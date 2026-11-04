package com.rispmr.vrboxemulator.integration

import com.rispmr.vrboxemulator.engine.ControllerSnapshot
import com.rispmr.vrboxemulator.engine.Hand
import com.rispmr.vrboxemulator.engine.HandSnapshot
import com.rispmr.vrboxemulator.engine.VirtualTargets
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.roundToLong

/**
 * State of one virtual Joy-Con in protocol form. [buttons]: bit i = control i of
 * [VirtualTargets.buttonControls] (left: stick click, ↑, ↓, ←, →, −, Captura;
 * right: stick click, A, B, X, Y, +, Home).
 */
data class ProtocolHand(
    val stickX: Float,
    val stickY: Float,
    /** ZL / ZR, 0..1. */
    val trigger: Float,
    /** L / R, 0..1. */
    val grip: Float,
    val buttons: Int,
) {
    fun pressed(bit: Int): Boolean = buttons and (1 shl bit) != 0

    companion object {
        val NEUTRAL = ProtocolHand(0f, 0f, 0f, 0f, 0)

        fun from(s: HandSnapshot): ProtocolHand {
            var bits = 0
            VirtualTargets.buttonControls(s.hand).forEachIndexed { i, name -> if (s.pressed(name)) bits = bits or (1 shl i) }
            return ProtocolHand(s.stickX, s.stickY, s.trigger, s.grip, bits)
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
 * VRBQ input protocol, version 2 (see integration/InputProtocol/PROTOCOL.md): two Joy-Con style controllers.
 *
 * Two encodings carry exactly the same information:
 * - JSON text (easy to consume from any language)
 * - 60-byte little-endian binary packet (fast to parse in native code)
 */
object VrbqProtocol {
    const val VERSION = 2
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
        hand(this, f.left, Hand.LEFT)
        append(",\"right\":")
        hand(this, f.right, Hand.RIGHT)
        append('}')
    }

    /** JSON name of each button bit ("click" for the stick click). */
    fun buttonNames(hand: Hand): List<String> =
        VirtualTargets.buttonControls(hand).map { if (it == VirtualTargets.STICK_CLICK) "click" else it }

    private fun hand(sb: StringBuilder, h: ProtocolHand, hand: Hand) {
        sb.append("{\"stick\":[").append(num(h.stickX)).append(',').append(num(h.stickY)).append(']')
        buttonNames(hand).forEachIndexed { i, name -> sb.append(",\"").append(name).append("\":").append(h.pressed(i)) }
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
        b.putShort(h.buttons.toShort())
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
        val bits = b.short.toInt() and 0xFFFF
        b.short
        return ProtocolHand(stickX = b.float, stickY = b.float, trigger = b.float, grip = b.float, buttons = bits)
    }
}
