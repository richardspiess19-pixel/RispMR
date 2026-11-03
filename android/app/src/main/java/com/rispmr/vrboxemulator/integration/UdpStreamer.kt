package com.rispmr.vrboxemulator.integration

import android.os.Handler
import android.os.HandlerThread
import android.os.SystemClock
import com.rispmr.vrboxemulator.engine.ControllerSnapshot
import com.rispmr.vrboxemulator.engine.UdpSettings
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress
import java.util.concurrent.atomic.AtomicLong

/**
 * Sends the virtual controller state with the VRBQ protocol over UDP.
 *
 * Runs on its own thread: the main thread only hands over immutable snapshots. A packet is sent
 * immediately on every state change (low latency) and repeated at the configured rate so
 * receivers always have fresh state even when nothing moves.
 */
class UdpStreamer {
    private val thread = HandlerThread("vrbq-udp").also { it.start() }
    private val handler = Handler(thread.looper)

    @Volatile private var latest: ControllerSnapshot? = null
    @Volatile private var demo = false
    @Volatile private var connected = false
    @Volatile var running = false
        private set
    @Volatile var lastError: String? = null
        private set
    val packetsSent = AtomicLong()

    // Owned by the sender thread.
    private var socket: DatagramSocket? = null
    private var address: InetAddress? = null
    private var config = UdpSettings()
    private var seq = 0L
    private var lastSendUptime = 0L
    private val binary = ByteArray(VrbqProtocol.BINARY_SIZE)

    private val periodic = object : Runnable {
        override fun run() {
            if (!running) return
            sendNow()
            handler.postDelayed(this, (1000L / config.rateHz.coerceIn(10, 250)).coerceAtLeast(4L))
        }
    }

    private val immediate = Runnable { if (running) sendNow() }

    fun start(settings: UdpSettings) {
        handler.post {
            closeSocket()
            config = settings
            lastError = null
            try {
                address = InetAddress.getByName(settings.host)
                socket = DatagramSocket()
                running = true
                handler.removeCallbacks(periodic)
                handler.post(periodic)
            } catch (e: Exception) {
                running = false
                lastError = "${e.javaClass.simpleName}: ${e.message ?: "cannot open UDP socket"}"
            }
        }
    }

    fun stop() {
        running = false
        handler.post {
            handler.removeCallbacks(periodic)
            // Send one neutral packet so receivers release everything.
            if (latest != null) publishNeutral()
            closeSocket()
        }
    }

    /** Hands a new state to the sender thread. Called on the main thread. */
    fun publish(snapshot: ControllerSnapshot, isDemo: Boolean, isConnected: Boolean) {
        latest = snapshot
        demo = isDemo
        connected = isConnected
        if (running) {
            handler.removeCallbacks(immediate)
            handler.post(immediate)
        }
    }

    fun shutdown() {
        stop()
        thread.quitSafely()
    }

    private fun publishNeutral() {
        val sock = socket ?: return
        val addr = address ?: return
        val frame = ProtocolFrame(++seq, SystemClock.elapsedRealtimeNanos() / 1000, demo, false, ProtocolHand.NEUTRAL, ProtocolHand.NEUTRAL)
        send(sock, addr, frame)
    }

    private fun sendNow() {
        val sock = socket ?: return
        val addr = address ?: return
        val snapshot = latest ?: return
        val now = SystemClock.uptimeMillis()
        if (now - lastSendUptime < MIN_INTERVAL_MS) return
        lastSendUptime = now
        val frame = ProtocolFrame.from(snapshot, ++seq, SystemClock.elapsedRealtimeNanos() / 1000, demo, connected)
        send(sock, addr, frame)
    }

    private fun send(sock: DatagramSocket, addr: InetAddress, frame: ProtocolFrame) {
        try {
            val packet = if (config.format == "binary") {
                VrbqProtocol.encodeBinary(frame, binary)
                DatagramPacket(binary, VrbqProtocol.BINARY_SIZE, addr, config.port)
            } else {
                val bytes = VrbqProtocol.encodeJson(frame).toByteArray(Charsets.UTF_8)
                DatagramPacket(bytes, bytes.size, addr, config.port)
            }
            sock.send(packet)
            packetsSent.incrementAndGet()
            lastError = null
        } catch (e: Exception) {
            lastError = "${e.javaClass.simpleName}: ${e.message ?: "send failed"}"
        }
    }

    private fun closeSocket() {
        socket?.close()
        socket = null
    }

    companion object {
        /** Caps event-driven sending at ~500 packets/s. */
        const val MIN_INTERVAL_MS = 2L
    }
}
