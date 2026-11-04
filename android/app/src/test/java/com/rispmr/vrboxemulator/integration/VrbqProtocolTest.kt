package com.rispmr.vrboxemulator.integration

import com.rispmr.vrboxemulator.engine.ControllerSnapshot
import com.rispmr.vrboxemulator.engine.Hand
import com.rispmr.vrboxemulator.engine.HandSnapshot
import org.json.JSONObject
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File
import java.util.Locale

class VrbqProtocolTest {

    /** Reference frame shared with the C and Python tests (integration/InputProtocol/fixtures). */
    private val sample = ProtocolFrame(
        seq = 42,
        timestampUs = 123_456_789L,
        demo = false,
        controllerConnected = true,
        // left: arrow up (bit 1) + minus (bit 5); right: stick click (bit 0) + B (bit 2)
        left = ProtocolHand(stickX = 0.5f, stickY = -0.25f, trigger = 0f, grip = 1f, buttons = (1 shl 1) or (1 shl 5)),
        right = ProtocolHand(stickX = -1f, stickY = 0.75f, trigger = 0.5f, grip = 0f, buttons = 1 or (1 shl 2)),
    )

    private val fixtures = File(System.getProperty("vrbq.fixturesDir") ?: "../../integration/InputProtocol/fixtures")

    @Test
    fun jsonEncodingIsStableAndLocaleIndependent() {
        val previous = Locale.getDefault()
        try {
            Locale.setDefault(Locale.forLanguageTag("pt-BR")) // decimal comma locale
            val json = VrbqProtocol.encodeJson(sample)
            assertEquals(File(fixtures, "sample-v2.json").readText().trim(), json)
            val o = JSONObject(json)
            assertEquals("vrbq", o.getString("proto"))
            assertEquals(0.5, o.getJSONObject("left").getJSONArray("stick").getDouble(0), 1e-9)
            assertTrue(o.getJSONObject("left").getBoolean("up"))
            assertTrue(o.getJSONObject("left").getBoolean("minus"))
            assertTrue(o.getJSONObject("right").getBoolean("b"))
            assertTrue(o.getJSONObject("right").getBoolean("click"))
        } finally {
            Locale.setDefault(previous)
        }
    }

    @Test
    fun binaryEncodingMatchesTheFixtureAndRoundTrips() {
        val bytes = VrbqProtocol.encodeBinary(sample)
        assertEquals(VrbqProtocol.BINARY_SIZE, bytes.size)
        assertArrayEquals(File(fixtures, "sample-v2.bin").readBytes(), bytes)
        assertEquals(sample, VrbqProtocol.decodeBinary(bytes))
    }

    @Test
    fun numberFormatting() {
        assertEquals("0", VrbqProtocol.num(0f))
        assertEquals("0", VrbqProtocol.num(-0.00001f))
        assertEquals("1", VrbqProtocol.num(1f))
        assertEquals("-0.25", VrbqProtocol.num(-0.25f))
        assertEquals("0.1235", VrbqProtocol.num(0.12345f))
        assertEquals("0", VrbqProtocol.num(Float.NaN))
    }

    @Test
    fun snapshotConversionUsesHandButtonOrder() {
        val left = HandSnapshot(Hand.LEFT, 0f, 0f, 0f, 0f, 0f, 0f, mapOf("stickClick" to false, "up" to false, "down" to true, "capture" to true))
        val right = HandSnapshot(Hand.RIGHT, 0f, 0f, 0f, 0f, 0f, 0f, mapOf("stickClick" to false, "a" to true, "b" to false, "home" to true))
        val f = ProtocolFrame.from(ControllerSnapshot(left, right, 1), 1, 2, demo = true, connected = true)
        assertTrue(f.left.pressed(2) && f.left.pressed(6) && !f.left.pressed(1)) // ↓ and Captura
        assertTrue(f.right.pressed(1) && f.right.pressed(6)) // A and Home
        assertEquals(1 or 2, VrbqProtocol.decodeBinary(VrbqProtocol.encodeBinary(f)).let { (if (it.demo) 1 else 0) or (if (it.controllerConnected) 2 else 0) })
    }
}
