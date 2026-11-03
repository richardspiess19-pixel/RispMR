package com.rispmr.vrboxemulator.engine

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.nio.ByteBuffer
import java.nio.ByteOrder

class EvdevTest {
    private val key = "VR BOX#05ac:022c"

    private fun translate(t: EvdevTranslator, vararg ev: Int): List<RawEvent> {
        val out = ArrayList<RawEvent>()
        for (i in ev.indices step 3) t.translate(ev[i], ev[i + 1], ev[i + 2], 100L, out)
        return out
    }

    @Test
    fun keysUseTheNamesAndroidGivesThem() {
        val t = EvdevTranslator(key)
        val out = translate(t, Evdev.EV_KEY, 0x130, 1, Evdev.EV_KEY, 103, 1, Evdev.EV_KEY, 115, 0, Evdev.EV_KEY, 28, 1)
        assertEquals(listOf("key:BUTTON_A", "key:DPAD_UP", "key:VOLUME_UP", "key:ENTER"), out.map { (it as RawEvent.Button).sourceId })
        assertEquals(listOf(true, true, false, true), out.map { (it as RawEvent.Button).pressed })
        // Auto-repeat is not a new press.
        assertTrue(translate(t, Evdev.EV_KEY, 0x130, 2).isEmpty())
    }

    @Test
    fun scanCodesSeenByTheAppWin() {
        val t = EvdevTranslator(key, scanCodes = mapOf(0x130 to "BUTTON_X", 0x110 to "ENTER"))
        val out = translate(t, Evdev.EV_KEY, 0x130, 1, Evdev.EV_KEY, 0x110, 1)
        assertEquals(listOf("key:BUTTON_X", "key:ENTER"), out.map { (it as RawEvent.Button).sourceId })
    }

    @Test
    fun axesAreScaledLikeAndroid() {
        val ranges = mapOf(0 to Evdev.AbsRange(0, 255), 1 to Evdev.AbsRange(0, 255), 9 to Evdev.AbsRange(0, 1023), 0x10 to Evdev.AbsRange(-1, 1))
        val t = EvdevTranslator(key, ranges)
        val out = translate(t, Evdev.EV_ABS, 0, 255, Evdev.EV_ABS, 1, 0, Evdev.EV_ABS, 9, 1023, Evdev.EV_ABS, 0x10, -1)
        val axes = out.map { it as RawEvent.Axis }
        assertEquals(listOf("axis:X", "axis:Y", "axis:GAS", "axis:HAT_X"), axes.map { it.sourceId })
        assertEquals(1f, axes[0].value, 0.01f) // right
        assertEquals(-1f, axes[1].value, 0.01f) // up (Android: -1 = up)
        assertEquals(1f, axes[2].value, 0.001f) // trigger 0..1
        assertEquals(-1f, axes[3].value, 0.001f)
        // Center of 0..255 is ~0 and an unchanged value is not sent again.
        assertEquals(0.0039f, (translate(t, Evdev.EV_ABS, 0, 128)[0] as RawEvent.Axis).value, 0.01f)
        assertTrue(translate(t, Evdev.EV_ABS, 0, 128).isEmpty())
    }

    @Test
    fun everyJoystickDirectionArrives() {
        val t = EvdevTranslator(key, mapOf(0 to Evdev.AbsRange(-127, 127), 1 to Evdev.AbsRange(-127, 127)))
        val values = listOf(127 to 0, -127 to 0, 0 to -127, 0 to 127).map { (x, y) ->
            translate(t, Evdev.EV_ABS, 0, x, Evdev.EV_ABS, 1, y, Evdev.EV_SYN, 0, 0).filterIsInstance<RawEvent.Axis>().associate { it.sourceId to it.value }
        }
        assertEquals(1f, values[0]["axis:X"]!!, 0.01f)
        assertEquals(-1f, values[1]["axis:X"]!!, 0.01f)
        assertEquals(-1f, values[2]["axis:Y"]!!, 0.01f)
        assertEquals(1f, values[3]["axis:Y"]!!, 0.01f)
    }

    @Test
    fun mouseMotionIsBatchedUntilSynReport() {
        val t = EvdevTranslator(key)
        assertTrue(translate(t, Evdev.EV_REL, Evdev.REL_X, 5, Evdev.EV_REL, Evdev.REL_Y, -3, Evdev.EV_REL, Evdev.REL_X, 2).isEmpty())
        val out = translate(t, Evdev.EV_SYN, Evdev.SYN_REPORT, 0)
        val m = out.single() as RawEvent.Motion
        assertEquals(7f, m.dx, 0f)
        assertEquals(-3f, m.dy, 0f)
        val clicks = translate(t, Evdev.EV_KEY, 0x110, 1, Evdev.EV_REL, Evdev.REL_WHEEL, -1)
        assertEquals("mouse:btn:primary", (clicks[0] as RawEvent.Button).sourceId)
        assertEquals("mouse:wheel:down", (clicks[1] as RawEvent.Pulse).sourceId)
    }

    @Test
    fun geteventRangesAreParsed() {
        val text = """
            add device 1: /dev/input/event7
              name:     "VR BOX"
              events:
                KEY (0001): 0130  0131  0133  0134
                ABS (0003): 0000  : value 128, min 0, max 255, fuzz 0, flat 15, resolution 0
                            0001  : value 128, min 0, max 255, fuzz 0, flat 15, resolution 0
                            0010  : value 0, min -1, max 1, fuzz 0, flat 0, resolution 0
              input props:
                <none>
            add device 2: /dev/input/event8
              name:     "VR BOX Mouse"
        """.trimIndent()
        val r = Evdev.parseAbsRanges(text)
        assertEquals(Evdev.AbsRange(0, 255), r["/dev/input/event7"]!![0])
        assertEquals(Evdev.AbsRange(-1, 1), r["/dev/input/event7"]!![0x10])
        assertNull(r["/dev/input/event8"])
    }

    @Test
    fun inputEventRecordsAreRead() {
        fun record(is64: Boolean, type: Int, code: Int, value: Int): ByteArray {
            val b = ByteBuffer.allocate(if (is64) 24 else 16).order(ByteOrder.LITTLE_ENDIAN)
            b.position(if (is64) 16 else 8)
            b.putShort(type.toShort()).putShort(code.toShort()).putInt(value)
            return b.array()
        }
        for (is64 in listOf(true, false)) {
            val buf = record(is64, Evdev.EV_ABS, 1, -127) + record(is64, Evdev.EV_KEY, 0x130, 1)
            val seen = ArrayList<Triple<Int, Int, Int>>()
            Evdev.forEachEvent(buf, buf.size, is64) { t, c, v -> seen += Triple(t, c, v) }
            assertEquals(listOf(Triple(Evdev.EV_ABS, 1, -127), Triple(Evdev.EV_KEY, 0x130, 1)), seen)
        }
    }

    @Test
    fun backgroundEngineTurnsTheVrBoxIntoTheVirtualGamepad() {
        val clock = object : Clock {
            var now = 1000L
            override fun uptimeMs() = now
            override fun wallMs() = now
        }
        val profile = Profile(
            id = "p",
            name = "Meu VR Box",
            mappings = listOf(
                MappingRule(id = "1", source = "axis:X", target = "left.stick.x"),
                MappingRule(id = "2", source = "axis:Y", target = "left.stick.y"),
                MappingRule(id = "3", source = "key:BUTTON_A", target = "right.a"),
            ),
            left = StickConfig(smoothing = 0f),
        )
        val config = BackgroundConfig(DeviceIdentity("VR BOX", 0x05ac, 0x022c), profile, mapOf(0x131 to "BUTTON_A"))
        val decoded = BackgroundConfigCodec.decode(BackgroundConfigCodec.encode(config))
        assertNotNull(decoded)
        assertEquals(config.device, decoded!!.device)
        assertEquals(config.scanCodes, decoded.scanCodes)

        val engine = BackgroundEngine(clock)
        engine.configure(decoded.profile)
        val t = EvdevTranslator(key, mapOf(0 to Evdev.AbsRange(-127, 127), 1 to Evdev.AbsRange(-127, 127)), decoded.scanCodes)
        val out = ArrayList<RawEvent>()
        // Joystick up and the VR Box button whose scan code the app learned as BUTTON_A.
        t.translate(Evdev.EV_ABS, 1, -127, clock.now, out)
        t.translate(Evdev.EV_KEY, 0x131, 1, clock.now, out)
        assertTrue(engine.process(out))
        clock.now += 50
        engine.tick(clock.now)
        val r = engine.report()
        assertEquals(1 shl (VirtualGamepad.BTN_A - 1), r[0].toInt() and 0xFF)
        assertTrue("left stick up", r[3] < -100)
    }

    @Test
    fun deviceKeysAreParsed() {
        assertEquals(DeviceIdentity("VR BOX", 0x05ac, 0x022c), DeviceIdentity.fromKey("VR BOX#05ac:022c"))
        assertEquals(DeviceIdentity("A#B", 1, 2), DeviceIdentity.fromKey("A#B#0001:0002"))
        assertNull(DeviceIdentity.fromKey("nope"))
        assertNull(DeviceIdentity.fromKey(null))
        assertEquals("VR BOX#05ac:022c", DeviceGroup.keyOf("VR BOX", 0x05ac, 0x022c))
    }
}
