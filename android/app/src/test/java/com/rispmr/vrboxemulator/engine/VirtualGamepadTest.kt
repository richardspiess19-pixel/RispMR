package com.rispmr.vrboxemulator.engine

import org.json.JSONObject
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.nio.ByteBuffer
import java.nio.ByteOrder

class VirtualGamepadTest {
    private fun snapshot(
        left: Map<String, Boolean> = emptyMap(),
        right: Map<String, Boolean> = emptyMap(),
        leftStick: Pair<Float, Float> = 0f to 0f,
        rightStick: Pair<Float, Float> = 0f to 0f,
        leftTrigger: Float = 0f,
        rightTrigger: Float = 0f,
        leftGrip: Float = 0f,
        rightGrip: Float = 0f,
    ): ControllerSnapshot {
        val l = HandSnapshot(Hand.LEFT, leftStick.first, leftStick.second, 0f, 0f, leftTrigger, leftGrip, mapOf("stickClick" to false, "x" to false, "y" to false, "menu" to false) + left)
        val r = HandSnapshot(Hand.RIGHT, rightStick.first, rightStick.second, 0f, 0f, rightTrigger, rightGrip, mapOf("stickClick" to false, "a" to false, "b" to false, "system" to false) + right)
        return ControllerSnapshot(l, r, 0)
    }

    private fun buttons(report: ByteArray) = (report[0].toInt() and 0xFF) or ((report[1].toInt() and 0xFF) shl 8)

    private fun bit(n: Int) = 1 shl (n - 1)

    /** Minimal HID parser: total bits of the Input items (report without report id). */
    private fun inputBits(d: ByteArray): Int {
        var i = 0
        var size = 0
        var count = 0
        var bits = 0
        var depth = 0
        while (i < d.size) {
            val prefix = d[i].toInt() and 0xFF
            val len = when (prefix and 0x03) { 3 -> 4; else -> prefix and 0x03 }
            var value = 0
            for (k in 0 until len) value = value or ((d[i + 1 + k].toInt() and 0xFF) shl (8 * k))
            when (prefix and 0xFC) {
                0x74 -> size = value
                0x94 -> count = value
                0x80 -> bits += size * count
                0xA0 -> depth++
                0xC0 -> depth--
            }
            i += 1 + len
        }
        assertEquals("collections closed", 0, depth)
        return bits
    }

    @Test
    fun descriptorDescribesTheEightByteReport() {
        assertEquals(VirtualGamepad.REPORT_SIZE * 8, inputBits(VirtualGamepad.DESCRIPTOR))
        assertEquals(VirtualGamepad.REPORT_SIZE, VirtualGamepad.idleReport().size)
    }

    @Test
    fun questButtonsBecomeGamepadButtons() {
        val r = VirtualGamepad.report(
            snapshot(left = mapOf("x" to true, "menu" to true, "stickClick" to true), right = mapOf("a" to true, "system" to true)),
            0.5f,
        )
        val b = buttons(r)
        assertEquals(bit(VirtualGamepad.BTN_A) or bit(VirtualGamepad.BTN_X) or bit(VirtualGamepad.BTN_START) or bit(VirtualGamepad.BTN_SELECT) or bit(VirtualGamepad.BTN_THUMBL), b)
        assertEquals(0, buttons(VirtualGamepad.report(snapshot(), 0.5f)))
    }

    @Test
    fun gripsAndTriggersUseTheThreshold() {
        val r = VirtualGamepad.report(snapshot(leftGrip = 0.6f, rightGrip = 0.4f, rightTrigger = 1f, leftTrigger = 0.2f), 0.5f)
        val b = buttons(r)
        assertTrue(b and bit(VirtualGamepad.BTN_L1) != 0)
        assertEquals(0, b and bit(VirtualGamepad.BTN_R1))
        assertTrue(b and bit(VirtualGamepad.BTN_R2) != 0)
        assertEquals(0, b and bit(VirtualGamepad.BTN_L2))
        assertEquals(51, r[6].toInt() and 0xFF) // 0.2 * 255
        assertEquals(255, r[7].toInt() and 0xFF)
    }

    @Test
    fun sticksUseHidDirections() {
        // Engine: +y = up. HID / Android: +y = down.
        val r = VirtualGamepad.report(snapshot(leftStick = 0f to 1f, rightStick = 0.5f to -1f), 0.5f)
        assertEquals(0, r[2].toInt())
        assertEquals(-127, r[3].toInt())
        assertEquals(64, r[4].toInt())
        assertEquals(127, r[5].toInt())
        val clamped = VirtualGamepad.report(snapshot(leftStick = 3f to 0f), 0.5f)
        assertEquals(127, clamped[2].toInt())
    }

    @Test
    fun create2MatchesTheKernelLayout() {
        assertEquals(4376, Uhid.EVENT_SIZE)
        val d = VirtualGamepad.DESCRIPTOR
        val msg = Uhid.create2("Pad", 0x1209, 0x0001, d)
        val b = ByteBuffer.wrap(msg).order(ByteOrder.LITTLE_ENDIAN)
        assertEquals(Uhid.CREATE2, b.getInt(0))
        assertEquals('P'.code.toByte(), msg[4])
        assertEquals(0.toByte(), msg[7]) // NUL after the name
        assertEquals(d.size, b.getShort(260).toInt())
        assertEquals(Uhid.BUS_USB, b.getShort(262).toInt())
        assertEquals(0x1209, b.getInt(264))
        assertEquals(0x0001, b.getInt(268))
        assertArrayEquals(d, msg.copyOfRange(280, 280 + d.size))
        assertEquals(280 + d.size, msg.size)
    }

    @Test
    fun longNamesStayNulTerminated() {
        val msg = Uhid.create2("x".repeat(300), 1, 2, byteArrayOf(0x05))
        assertEquals(0.toByte(), msg[4 + 127])
    }

    @Test
    fun input2AndRepliesMatchTheKernelLayout() {
        val report = byteArrayOf(1, 2, 3)
        val msg = Uhid.input2(report)
        val b = ByteBuffer.wrap(msg).order(ByteOrder.LITTLE_ENDIAN)
        assertEquals(Uhid.INPUT2, b.getInt(0))
        assertEquals(3, b.getShort(4).toInt())
        assertArrayEquals(report, msg.copyOfRange(6, 9))

        val ev = ByteBuffer.allocate(Uhid.EVENT_SIZE).order(ByteOrder.LITTLE_ENDIAN).putInt(Uhid.GET_REPORT).putInt(42).array()
        assertEquals(Uhid.GET_REPORT, Uhid.typeOf(ev, ev.size))
        assertEquals(42, Uhid.requestId(ev, ev.size))
        val reply = ByteBuffer.wrap(Uhid.getReportReply(42)).order(ByteOrder.LITTLE_ENDIAN)
        assertEquals(Uhid.GET_REPORT_REPLY, reply.getInt(0))
        assertEquals(42, reply.getInt(4))
        assertTrue(reply.getShort(8).toInt() != 0)
        assertEquals(-1, Uhid.typeOf(ByteArray(2), 2))
    }

    @Test
    fun ownDeviceIsRecognized() {
        assertTrue(VirtualGamepad.isOwn(VirtualGamepad.VENDOR_ID, VirtualGamepad.PRODUCT_ID, "x"))
        assertTrue(VirtualGamepad.isOwn(0, 0, VirtualGamepad.NAME))
        assertEquals(false, VirtualGamepad.isOwn(0x05ac, 0x022c, "VR BOX"))
    }

    @Test
    fun outputIsSavedAndDefaultsToTheVirtualGamepad() {
        assertEquals(GameOutput.GAMEPAD, GameModeConfig.cardboard().output)
        // Settings saved before this option existed.
        assertEquals(GameOutput.GAMEPAD, GameModeCodec.decode(JSONObject().put("enabled", true)).output)
        val touch = GameModeConfig.cardboard().copy(output = GameOutput.TOUCH)
        assertEquals(touch, GameModeCodec.decode(GameModeCodec.encode(touch)))
        // A patch with only the output keeps the touch layout.
        val patched = GameModeCodec.decode(JSONObject().put("output", "touch"), GameModeConfig.cardboard())
        assertEquals(GameOutput.TOUCH, patched.output)
        assertEquals(GameModeConfig.cardboard().buttons, patched.buttons)
        assertEquals(GameOutput.GAMEPAD, GameModeCodec.decode(JSONObject().put("output", "nope")).output)
    }
}
