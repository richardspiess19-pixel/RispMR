package com.rispmr.vrboxemulator.gamepad

import android.annotation.SuppressLint
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import com.rispmr.vrboxemulator.engine.ControllerSnapshot
import com.rispmr.vrboxemulator.engine.VirtualGamepad
import rikka.shizuku.Shizuku

/**
 * Owns the virtual gamepad: talks to Shizuku, starts [UhidUserService] in the Shizuku process
 * and forwards input reports to it.
 *
 * Main thread only. The accessibility service and the activity share this object (same process).
 */
object VirtualGamepadManager {

    enum class State(val key: String) {
        /** The Shizuku app is not installed. */
        NOT_INSTALLED("not_installed"),

        /** Shizuku is installed but not started (it must be started again after each reboot). */
        NOT_RUNNING("not_running"),

        /** Shizuku older than version 11. */
        OLD_SHIZUKU("old_shizuku"),

        /** Shizuku runs, but this app was not allowed yet. */
        NO_PERMISSION("no_permission"),

        /** Everything allowed; no virtual controller right now. */
        READY("ready"),

        /** Starting the service / creating the controller. */
        CONNECTING("connecting"),

        /** The virtual controller exists: games see it. */
        ACTIVE("active"),

        /** Creating the controller failed (see [Status.message]). */
        ERROR("error"),
    }

    data class Status(val state: State, val message: String = "", val uid: Int? = null)

    const val SHIZUKU_PACKAGE = "moe.shizuku.privileged.api"
    private const val TAG = "VRBQ-gamepad"
    private const val PERMISSION_REQUEST = 7317

    private val main = Handler(Looper.getMainLooper())
    // Application context only: lives as long as the process, so it cannot leak an activity.
    @SuppressLint("StaticFieldLeak")
    private lateinit var app: Context
    private val listeners = LinkedHashSet<() -> Unit>()

    /** True while emulation wants the controller to exist. */
    private var wanted = false
    private var service: IVirtualGamepad? = null
    private var binding = false
    private var created = false
    private var error: String? = null
    private var serviceUid: Int? = null
    private var lastReport: ByteArray? = null

    private val args by lazy {
        val info = app.applicationInfo
        val version = runCatching {
            @Suppress("DEPRECATION")
            app.packageManager.getPackageInfo(app.packageName, 0).versionCode
        }.getOrDefault(1)
        Shizuku.UserServiceArgs(ComponentName(app.packageName, UhidUserService::class.java.name))
            .daemon(false)
            .processNameSuffix("gamepad")
            .debuggable(info.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0)
            .version(version)
    }

    private val connection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, binder: IBinder?) {
            binding = false
            if (binder == null || !binder.pingBinder()) {
                error = "O Shizuku não iniciou o serviço do controle."
                changed()
                return
            }
            service = IVirtualGamepad.Stub.asInterface(binder)
            serviceUid = runCatching { service?.uid() }.getOrNull()
            if (wanted) createDevice()
            changed()
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            service = null
            binding = false
            created = false
            changed()
        }
    }

    private val binderReceived = Shizuku.OnBinderReceivedListener {
        if (wanted) connect()
        changed()
    }

    private val binderDead = Shizuku.OnBinderDeadListener {
        service = null
        binding = false
        created = false
        changed()
    }

    private val permissionResult = Shizuku.OnRequestPermissionResultListener { code, _ ->
        if (code == PERMISSION_REQUEST) {
            if (wanted) connect()
            changed()
        }
    }

    fun init(context: Context) {
        if (::app.isInitialized) return
        app = context.applicationContext
        Shizuku.addBinderReceivedListenerSticky(binderReceived, main)
        Shizuku.addBinderDeadListener(binderDead, main)
        Shizuku.addRequestPermissionResultListener(permissionResult, main)
    }

    fun addListener(l: () -> Unit) {
        listeners += l
    }

    fun removeListener(l: () -> Unit) {
        listeners -= l
    }

    fun status(): Status {
        if (!::app.isInitialized) return Status(State.NOT_RUNNING)
        val running = runCatching { Shizuku.pingBinder() }.getOrDefault(false)
        if (!running) return Status(if (shizukuInstalled()) State.NOT_RUNNING else State.NOT_INSTALLED)
        if (runCatching { Shizuku.isPreV11() }.getOrDefault(true)) return Status(State.OLD_SHIZUKU)
        if (!hasPermission()) {
            // "Negar e não perguntar de novo": Shizuku no longer shows its dialog.
            val denied = runCatching { Shizuku.shouldShowRequestPermissionRationale() }.getOrDefault(false)
            return Status(State.NO_PERMISSION, if (denied) "Você recusou antes, então o Shizuku não pergunta de novo. Abra o Shizuku, entre em \"Apps autorizados\" e ative o VR Box → Quest." else "")
        }
        error?.let { return Status(State.ERROR, it, serviceUid) }
        return when {
            created -> Status(State.ACTIVE, uid = serviceUid)
            wanted -> Status(State.CONNECTING, uid = serviceUid)
            else -> Status(State.READY, uid = serviceUid)
        }
    }

    /** Asks Shizuku for permission (shows Shizuku's dialog). Returns false when Shizuku is not running. */
    fun requestPermission(): Boolean {
        if (!runCatching { Shizuku.pingBinder() }.getOrDefault(false)) return false
        if (hasPermission()) return true
        return runCatching { Shizuku.requestPermission(PERMISSION_REQUEST) }.isSuccess
    }

    /** Opens the Shizuku app, or its store page when it is not installed. */
    fun openShizuku(context: Context) {
        val launch = context.packageManager.getLaunchIntentForPackage(SHIZUKU_PACKAGE)
        val intent = launch ?: Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$SHIZUKU_PACKAGE"))
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        try {
            context.startActivity(intent)
        } catch (e: Exception) {
            context.startActivity(
                Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=$SHIZUKU_PACKAGE"))
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK),
            )
        }
    }

    /** Emulation started: create the virtual controller as soon as Shizuku allows it. */
    fun start() {
        wanted = true
        error = null
        connect()
        changed()
    }

    /** Emulation stopped: remove the virtual controller (games see it disconnect). */
    fun stop() {
        wanted = false
        error = null
        lastReport = null
        if (created) runCatching { service?.close() }
        created = false
        if (service != null || binding) {
            runCatching { Shizuku.unbindUserService(args, connection, true) }
            service = null
            binding = false
        }
        changed()
    }

    val isActive: Boolean get() = created

    /** Sends the state of the two virtual Quest controllers as a gamepad report (only when it changed). */
    fun send(snapshot: ControllerSnapshot, analogThreshold: Float) = sendReport(VirtualGamepad.report(snapshot, analogThreshold))

    /** Releases everything on the virtual controller. */
    fun sendIdle() = sendReport(VirtualGamepad.idleReport())

    private fun sendReport(report: ByteArray) {
        val s = service ?: return
        if (!created) return
        if (lastReport?.contentEquals(report) == true) return
        lastReport = report
        try {
            s.send(report)
        } catch (e: Exception) {
            Log.w(TAG, "send failed", e)
        }
    }

    private fun connect() {
        if (service != null) {
            if (!created) createDevice()
            return
        }
        if (binding) return
        if (!runCatching { Shizuku.pingBinder() }.getOrDefault(false) || !hasPermission()) return
        if (runCatching { Shizuku.isPreV11() }.getOrDefault(true)) return
        binding = true
        try {
            Shizuku.bindUserService(args, connection)
        } catch (e: Exception) {
            binding = false
            error = "O Shizuku não aceitou iniciar o serviço: ${e.message}"
        }
    }

    private fun createDevice() {
        val s = service ?: return
        val message = try {
            s.create(VirtualGamepad.NAME, VirtualGamepad.VENDOR_ID, VirtualGamepad.PRODUCT_ID, VirtualGamepad.DESCRIPTOR)
        } catch (e: Exception) {
            "O serviço do controle parou: ${e.message}"
        }
        if (message.isNullOrEmpty()) {
            created = true
            error = null
            lastReport = null
            sendIdle()
        } else {
            created = false
            error = message
        }
    }

    private fun hasPermission(): Boolean =
        runCatching { Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED }.getOrDefault(false)

    private fun shizukuInstalled(): Boolean = try {
        if (Build.VERSION.SDK_INT >= 33) {
            app.packageManager.getPackageInfo(SHIZUKU_PACKAGE, PackageManager.PackageInfoFlags.of(0))
        } else {
            @Suppress("DEPRECATION")
            app.packageManager.getPackageInfo(SHIZUKU_PACKAGE, 0)
        }
        true
    } catch (e: PackageManager.NameNotFoundException) {
        false
    }

    private fun changed() {
        for (l in listeners.toList()) runCatching { l() }
    }
}
