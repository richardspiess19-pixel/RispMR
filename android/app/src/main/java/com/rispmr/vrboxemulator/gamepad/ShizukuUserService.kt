package com.rispmr.vrboxemulator.gamepad

import android.os.Handler
import android.os.HandlerThread
import android.os.Process
import android.os.SystemClock
import android.system.Os
import android.system.OsConstants
import android.system.StructPollfd
import android.util.Log
import com.rispmr.vrboxemulator.engine.BackgroundConfig
import com.rispmr.vrboxemulator.engine.BackgroundConfigCodec
import com.rispmr.vrboxemulator.engine.BackgroundEngine
import com.rispmr.vrboxemulator.engine.Clock
import com.rispmr.vrboxemulator.engine.DeviceGroup
import com.rispmr.vrboxemulator.engine.Evdev
import com.rispmr.vrboxemulator.engine.EvdevTranslator
import com.rispmr.vrboxemulator.engine.RawEvent
import com.rispmr.vrboxemulator.engine.Uhid
import com.rispmr.vrboxemulator.engine.VirtualGamepad
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.io.FileDescriptor
import java.util.concurrent.FutureTask
import java.util.concurrent.TimeUnit
import kotlin.system.exitProcess

/**
 * Shizuku "user service": loaded from the app's APK by the Shizuku process and run with ADB shell
 * rights (uid 2000), or root when Shizuku was started with root. It keeps running when the app
 * closes (daemon), so the game keeps its controller.
 *
 * - Output: `/dev/uhid` (what Android's own `hid` test command uses) creates a real HID gamepad
 *   that every app sees.
 * - Input: the shell user may read `/dev/input/event*` (like `getevent`). The VR Box is read from
 *   there, taken with EVIOCGRAB so games do not also get the original controller, and run through
 *   [BackgroundEngine] - the same mapping as in the app.
 *
 * Must keep a public no-argument constructor (Shizuku instantiates it by name).
 */
class ShizukuUserService : IVirtualGamepad.Stub() {

    private val clock = object : Clock {
        override fun uptimeMs() = SystemClock.uptimeMillis()
        override fun wallMs() = System.currentTimeMillis()
    }
    private val thread = HandlerThread("vrbq-engine").apply { start() }
    private val engineHandler = Handler(thread.looper)

    // Everything below is used on the engine thread only.
    private val engine = BackgroundEngine(clock)
    private var config: BackgroundConfig? = null
    private var uhid: FileDescriptor? = null
    private var reading = false
    private val nodes = HashMap<String, NodeReader>()
    private var lastReport: ByteArray? = null
    private var error = ""
    private var events = 0L
    private var tickScheduled = false
    private val buffer = ArrayList<RawEvent>(16)

    @Volatile private var statusText = status(false)

    // ---------------------------------------------------------------- binder (any thread)

    override fun start(config: String): String = onEngine {
        val c = BackgroundConfigCodec.decode(config) ?: return@onEngine "Configuração inválida."
        this.config = c
        engine.configure(c.profile)
        val message = if (uhid == null) createGamepad() else ""
        error = message
        if (message.isEmpty()) {
            sendReport(force = true)
            scheduleScan(0)
        }
        publish()
        message
    }

    override fun configure(config: String) {
        engineHandler.post {
            val c = BackgroundConfigCodec.decode(config) ?: return@post
            val deviceChanged = c.device != this.config?.device || c.scanCodes != this.config?.scanCodes
            this.config = c
            engine.configure(c.profile)
            if (deviceChanged) closeNodes()
            scheduleScan(0)
            publish()
        }
    }

    override fun setReading(reading: Boolean) {
        engineHandler.post {
            this.reading = reading
            if (!reading) {
                closeNodes()
                engine.releaseAll()
                sendReport()
            }
            scheduleScan(0)
            publish()
        }
    }

    override fun stop() {
        onEngine {
            stopLocked()
            true
        }
    }

    override fun status(): String = statusText

    override fun uid(): Int = Os.getuid()

    override fun destroy() {
        stop()
        exitProcess(0)
    }

    private fun <T> onEngine(block: () -> T): T {
        val task = FutureTask(block)
        engineHandler.post(task)
        return task.get(10, TimeUnit.SECONDS)
    }

    // ---------------------------------------------------------------- engine thread

    private fun stopLocked() {
        closeNodes()
        engineHandler.removeCallbacksAndMessages(null)
        tickScheduled = false
        reading = false
        config = null
        engine.releaseAll()
        destroyGamepad()
        error = ""
        publish()
    }

    private fun createGamepad(): String {
        val f = try {
            Os.open("/dev/uhid", OsConstants.O_RDWR, 0)
        } catch (e: Exception) {
            return "Não consegui abrir /dev/uhid (${e.message}). Este celular não deixa o ADB criar controles."
        }
        try {
            val msg = Uhid.create2(VirtualGamepad.NAME, VirtualGamepad.VENDOR_ID, VirtualGamepad.PRODUCT_ID, VirtualGamepad.DESCRIPTOR)
            Os.write(f, msg, 0, msg.size)
        } catch (e: Exception) {
            runCatching { Os.close(f) }
            return "O Android recusou o controle virtual (${e.message})."
        }
        uhid = f
        lastReport = null
        Thread({ drainUhid(f) }, "uhid-reader").apply {
            isDaemon = true
            start()
        }
        return ""
    }

    private fun destroyGamepad() {
        val f = uhid ?: return
        uhid = null
        runCatching {
            val msg = Uhid.destroy()
            Os.write(f, msg, 0, msg.size)
        }
        runCatching { Os.close(f) }
    }

    /** The kernel's messages must be read, and report requests answered, or it waits for them. */
    private fun drainUhid(f: FileDescriptor) {
        val buf = ByteArray(Uhid.EVENT_SIZE)
        while (true) {
            val n = try {
                Os.read(f, buf, 0, buf.size)
            } catch (e: Exception) {
                return
            }
            if (n <= 0) return
            val reply = when (Uhid.typeOf(buf, n)) {
                Uhid.GET_REPORT -> Uhid.getReportReply(Uhid.requestId(buf, n))
                Uhid.SET_REPORT -> Uhid.setReportReply(Uhid.requestId(buf, n))
                else -> null
            } ?: continue
            engineHandler.post { if (uhid === f) runCatching { Os.write(f, reply, 0, reply.size) } }
        }
    }

    private fun sendReport(force: Boolean = false) {
        val f = uhid ?: return
        val r = engine.report()
        if (!force && lastReport?.contentEquals(r) == true) return
        lastReport = r
        try {
            val msg = Uhid.input2(r)
            Os.write(f, msg, 0, msg.size)
        } catch (e: Exception) {
            Log.w(TAG, "input report failed", e)
        }
    }

    private val tick = Runnable {
        tickScheduled = false
        if (engine.tick(clock.uptimeMs())) sendReport()
        scheduleTick()
    }

    private fun scheduleTick() {
        if (tickScheduled || !engine.needsTick()) return
        tickScheduled = true
        engineHandler.postDelayed(tick, TICK_MS)
    }

    private fun onNodeEvents(node: NodeReader, packed: IntArray, count: Int) {
        if (nodes[node.path] !== node) return
        val now = clock.uptimeMs()
        buffer.clear()
        for (i in 0 until count) node.translator.translate(packed[i * 3], packed[i * 3 + 1], packed[i * 3 + 2], now, buffer)
        events += count
        if (engine.process(buffer)) sendReport()
        scheduleTick()
    }

    private fun onNodeGone(node: NodeReader) {
        if (nodes[node.path] !== node) return
        nodes.remove(node.path)
        engine.releaseAll()
        sendReport()
        publish()
        scheduleScan(RESCAN_MS)
    }

    // ---------------------------------------------------------------- finding the VR Box

    private val scan = Runnable { scanNow() }

    private fun scheduleScan(delay: Long) {
        engineHandler.removeCallbacks(scan)
        engineHandler.postDelayed(scan, delay)
    }

    private fun scanNow() {
        val c = config
        if (c == null || uhid == null || !reading) return
        val found = findNodes(c)
        for (path in found) {
            if (path in nodes) continue
            openNode(path, c)
        }
        publish()
        // The VR Box may connect later or reconnect with another node: keep looking.
        scheduleScan(RESCAN_MS)
    }

    private fun findNodes(c: BackgroundConfig): List<String> {
        val files = File("/dev/input").listFiles { f -> f.name.startsWith("event") } ?: return emptyList()
        return files.map { it.path }.filter { path ->
            val sys = "/sys/class/input/${File(path).name}/device"
            val name = read("$sys/name") ?: return@filter false
            if (name == VirtualGamepad.NAME) return@filter false
            val vendor = Evdev.hex(read("$sys/id/vendor"))
            val product = Evdev.hex(read("$sys/id/product"))
            name == c.device.name && (c.device.vendorId == 0 || vendor == c.device.vendorId) && (c.device.productId == 0 || product == c.device.productId)
        }.sorted()
    }

    private fun openNode(path: String, c: BackgroundConfig) {
        val fd = try {
            Os.open(path, OsConstants.O_RDONLY or OsConstants.O_NONBLOCK, 0)
        } catch (e: Exception) {
            error = "Não consegui ler o controle ($path: ${e.message})."
            return
        }
        val ranges = absRanges(path)
        val key = DeviceGroup.keyOf(c.device.name, c.device.vendorId, c.device.productId)
        val node = NodeReader(path, fd, EvdevTranslator(key, ranges, c.scanCodes), grab(fd))
        nodes[path] = node
        error = ""
        node.start()
    }

    private fun closeNodes() {
        for (n in nodes.values) n.close()
        nodes.clear()
    }

    /** Axis ranges from `getevent -p` (the shell's own tool), so axes are scaled like Android does. */
    private fun absRanges(path: String): Map<Int, Evdev.AbsRange> = try {
        val p = ProcessBuilder("getevent", "-p", path).redirectErrorStream(true).start()
        val text = p.inputStream.bufferedReader().use { r -> r.readText() }
        p.waitFor(2, TimeUnit.SECONDS)
        Evdev.parseAbsRanges(text)[path] ?: Evdev.parseAbsRanges(text).values.firstOrNull() ?: emptyMap()
    } catch (e: Exception) {
        emptyMap()
    }

    /**
     * EVIOCGRAB: while held, the VR Box no longer reaches Android, so the game only sees the
     * virtual gamepad. android.system.Os has no public ioctl; its hidden `ioctlInt` passes a
     * pointer (non-zero), which is what EVIOCGRAB needs. Hidden API checks do not apply to
     * app_process (Shizuku) processes. Closing the file releases the grab.
     */
    private fun grab(fd: FileDescriptor): Boolean {
        for (m in Os::class.java.declaredMethods) {
            if (m.name != "ioctlInt") continue
            val params = m.parameterTypes
            try {
                m.isAccessible = true
                when {
                    params.size == 2 -> m.invoke(null, fd, Evdev.EVIOCGRAB)
                    params.size == 3 -> {
                        val arg = params[2].getConstructor(Int::class.javaPrimitiveType).newInstance(1)
                        m.invoke(null, fd, Evdev.EVIOCGRAB, arg)
                    }
                    else -> continue
                }
                return true
            } catch (e: Exception) {
                Log.w(TAG, "EVIOCGRAB via ${m.toGenericString()} failed", e)
            }
        }
        return false
    }

    private fun read(path: String): String? = runCatching { File(path).readText().trim() }.getOrNull()

    private fun publish() {
        statusText = status(true)
    }

    private fun status(live: Boolean): String {
        if (!live) return JSONObject().put("active", false).toString()
        return JSONObject()
            .put("active", uhid != null)
            .put("reading", reading)
            .put("grabbed", nodes.isNotEmpty() && nodes.values.all { it.grabbed })
            .put("nodes", JSONArray(nodes.keys.sorted()))
            .put("events", events)
            .put("error", error)
            .toString()
    }

    /** One `/dev/input/eventN` of the VR Box, read on its own thread with poll() (so it can stop). */
    private inner class NodeReader(val path: String, private val fd: FileDescriptor, val translator: EvdevTranslator, val grabbed: Boolean) {
        @Volatile private var closing = false

        fun start() {
            Thread({ loop() }, "evdev-${File(path).name}").apply {
                isDaemon = true
                start()
            }
        }

        fun close() {
            closing = true
        }

        private fun loop() {
            val is64 = Process.is64Bit()
            val buf = ByteArray(64 * 24)
            val poll = arrayOf(StructPollfd().apply {
                this.fd = this@NodeReader.fd
                events = OsConstants.POLLIN.toShort()
            })
            try {
                while (!closing) {
                    poll[0].revents = 0
                    if (Os.poll(poll, POLL_MS) <= 0) continue
                    val n = try {
                        Os.read(fd, buf, 0, buf.size)
                    } catch (e: android.system.ErrnoException) {
                        if (e.errno == OsConstants.EAGAIN) continue else throw e
                    }
                    if (n <= 0) break
                    val packed = IntArray(n / 16 * 3)
                    var count = 0
                    Evdev.forEachEvent(buf, n, is64) { type, code, value ->
                        packed[count * 3] = type
                        packed[count * 3 + 1] = code
                        packed[count * 3 + 2] = value
                        count++
                    }
                    if (count > 0) engineHandler.post { onNodeEvents(this, packed, count) }
                }
            } catch (e: Exception) {
                Log.i(TAG, "$path closed: ${e.message}")
            } finally {
                runCatching { Os.close(fd) } // releases EVIOCGRAB
                if (!closing) engineHandler.post { onNodeGone(this) }
            }
        }
    }

    private companion object {
        const val TAG = "VRBQ-shizuku"
        const val TICK_MS = 8L
        const val RESCAN_MS = 2000L
        const val POLL_MS = 250
    }
}
