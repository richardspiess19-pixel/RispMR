package com.rispmr.vrboxemulator.integration

import com.rispmr.vrboxemulator.engine.ButtonConfig
import com.rispmr.vrboxemulator.engine.PhysicalState
import com.rispmr.vrboxemulator.engine.StickConfig
import com.rispmr.vrboxemulator.engine.UdpSettings
import com.rispmr.vrboxemulator.engine.VirtualControllerManager
import com.rispmr.vrboxemulator.engine.rule
import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress

/** End to end: virtual controller state -> UdpStreamer -> real UDP socket on loopback. */
@RunWith(RobolectricTestRunner::class)
class UdpStreamerTest {

    private fun receiveOne(socket: DatagramSocket): ByteArray {
        val buf = ByteArray(2048)
        val packet = DatagramPacket(buf, buf.size)
        socket.receive(packet)
        return packet.data.copyOf(packet.length)
    }

    private fun pressedSnapshot() = VirtualControllerManager().apply {
        configure(listOf(rule("key:BUTTON_A", "right.a"), rule("key:BUTTON_4", "left.trigger")), ButtonConfig(), StickConfig(), StickConfig())
        onPhysicalState(PhysicalState().apply { digital["key:BUTTON_A"] = true; digital["key:BUTTON_4"] = true }, 0)
    }.snapshot()

    @Test
    fun jsonPacketsReachALocalReceiver() {
        DatagramSocket(0, InetAddress.getLoopbackAddress()).use { rx ->
            rx.soTimeout = 5000
            val streamer = UdpStreamer()
            streamer.publish(pressedSnapshot(), isDemo = false, isConnected = true)
            streamer.start(UdpSettings(enabled = true, host = "127.0.0.1", port = rx.localPort, rateHz = 50, format = "json"))
            val msg = JSONObject(String(receiveOne(rx), Charsets.UTF_8))
            streamer.shutdown()
            assertEquals("vrbq", msg.getString("proto"))
            assertTrue(msg.getJSONObject("right").getBoolean("a"))
            assertEquals(1.0, msg.getJSONObject("left").getDouble("trigger"), 1e-6)
            assertTrue(msg.getBoolean("connected"))
            assertTrue(streamer.packetsSent.get() >= 1)
        }
    }

    @Test
    fun binaryPacketsDecode() {
        DatagramSocket(0, InetAddress.getLoopbackAddress()).use { rx ->
            rx.soTimeout = 5000
            val streamer = UdpStreamer()
            streamer.publish(pressedSnapshot(), isDemo = true, isConnected = true)
            streamer.start(UdpSettings(enabled = true, host = "127.0.0.1", port = rx.localPort, rateHz = 50, format = "binary"))
            val bytes = receiveOne(rx)
            streamer.shutdown()
            assertEquals(VrbqProtocol.BINARY_SIZE, bytes.size)
            val f = VrbqProtocol.decodeBinary(bytes)
            assertTrue(f.demo)
            assertTrue(f.right.pressed(1)) // A
            assertEquals(1f, f.left.trigger, 1e-6f)
        }
    }
}
