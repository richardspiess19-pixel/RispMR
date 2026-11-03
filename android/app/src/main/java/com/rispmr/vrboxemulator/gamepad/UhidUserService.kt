package com.rispmr.vrboxemulator.gamepad

import android.system.ErrnoException
import android.system.Os
import android.system.OsConstants
import android.util.Log
import com.rispmr.vrboxemulator.engine.Uhid
import java.io.FileDescriptor
import kotlin.system.exitProcess

/**
 * Shizuku "user service": this class is loaded from the app's APK by the Shizuku process and runs
 * with ADB shell rights (uid 2000), or root when Shizuku was started with root.
 *
 * The shell user may open `/dev/uhid` (it is how Android's own `hid` test command creates input
 * devices). Writing a UHID_CREATE2 message there creates a real HID device that the kernel hands
 * to Android, so every app sees a new game controller. Closing the file removes it.
 *
 * This class must keep a public no-argument constructor (Shizuku instantiates it by name).
 */
class UhidUserService : IVirtualGamepad.Stub() {

    private val lock = Any()
    private var fd: FileDescriptor? = null
    private var reader: Thread? = null

    override fun create(name: String, vendor: Int, product: Int, descriptor: ByteArray): String = synchronized(lock) {
        closeLocked()
        val f = try {
            Os.open("/dev/uhid", OsConstants.O_RDWR, 0)
        } catch (e: ErrnoException) {
            return "Não consegui abrir /dev/uhid (${e.message}). Este celular não deixa o ADB criar controles."
        }
        try {
            val msg = Uhid.create2(name, vendor, product, descriptor)
            Os.write(f, msg, 0, msg.size)
        } catch (e: Exception) {
            runCatching { Os.close(f) }
            return "O Android recusou o controle virtual (${e.message})."
        }
        fd = f
        reader = Thread({ drain(f) }, "uhid-reader").apply {
            isDaemon = true
            start()
        }
        ""
    }

    override fun send(report: ByteArray) {
        synchronized(lock) {
            val f = fd ?: return
            try {
                val msg = Uhid.input2(report)
                Os.write(f, msg, 0, msg.size)
            } catch (e: Exception) {
                Log.w(TAG, "input report failed", e)
            }
        }
    }

    override fun close() = synchronized(lock) { closeLocked() }

    override fun uid(): Int = Os.getuid()

    override fun destroy() {
        close()
        exitProcess(0)
    }

    private fun closeLocked() {
        val f = fd ?: return
        fd = null
        runCatching {
            val msg = Uhid.destroy()
            Os.write(f, msg, 0, msg.size)
        }
        runCatching { Os.close(f) }
        reader = null
    }

    /**
     * Reads what the kernel sends back (start/open/close and report requests). The queue must be
     * read, and report requests must be answered, or the kernel waits for them.
     */
    private fun drain(f: FileDescriptor) {
        val buf = ByteArray(Uhid.EVENT_SIZE)
        while (true) {
            val n = try {
                Os.read(f, buf, 0, buf.size)
            } catch (e: Exception) {
                return // closed
            }
            if (n <= 0) return
            val reply = when (Uhid.typeOf(buf, n)) {
                Uhid.GET_REPORT -> Uhid.getReportReply(Uhid.requestId(buf, n))
                Uhid.SET_REPORT -> Uhid.setReportReply(Uhid.requestId(buf, n))
                else -> null
            } ?: continue
            synchronized(lock) {
                if (fd === f) runCatching { Os.write(f, reply, 0, reply.size) }
            }
        }
    }

    private companion object {
        const val TAG = "VRBQ-uhid"
    }
}
