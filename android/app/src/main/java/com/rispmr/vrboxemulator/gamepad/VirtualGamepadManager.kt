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
import org.json.JSONObject
import rikka.shizuku.Shizuku

/**
 * App side of the virtual gamepad: talks to Shizuku and to [ShizukuUserService], which runs in
 * the Shizuku process, reads the VR Box while a game is open and drives the virtual gamepad.
 *
 * Main thread only.
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

    /** What the service reports about the VR Box (see IVirtualGamepad.status). */
    data class Remote(
        val reading: Boolean,
        val grabbed: Boolean,
        val nodes: Int,
        val events: Long,
        val error: String,
        /** Device nodes of the VR Box opened since the service started (stays after the game). */
        val found: Int,
        val foundGrabbed: Boolean,
    )

    const val SHIZUKU_PACKAGE = "moe.shizuku.privileged.api"
    private const val TAG = "VRBQ-gamepad"
    private const val PERMISSION_REQUEST = 7317

    private val main = Handler(Looper.getMainLooper())

    // Application context only: lives as long as the process, so it cannot leak an activity.
    @SuppressLint("StaticFieldLeak")
    private lateinit var app: Context
    private val listeners = LinkedHashSet<() -> Unit>()

    /** Called when the service was already running from an earlier session (the app was closed). */
    var onFoundRunning: (() -> Unit)? = null

    private var wanted = false
    private var config: String? = null
    private var reading = false
    private var service: IVirtualGamepad? = null
    private var binding = false
    private var created = false
    private var error: String? = null
    private var serviceUid: Int? = null
    private var peeked = false

    private val args: Shizuku.UserServiceArgs by lazy {
        val info = app.applicationInfo
        val version = runCatching {
            @Suppress("DEPRECATION")
            app.packageManager.getPackageInfo(app.packageName, 0).versionCode
        }.getOrDefault(1)
        Shizuku.UserServiceArgs(ComponentName(app.packageName, ShizukuUserService::class.java.name))
            .daemon(true) // keeps the game's controller when Android closes this app
            .tag("vrbq-gamepad")
            .processNameSuffix("gamepad")
            .debuggable(info.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0)
            .version(version)
    }

    private val connection: ServiceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, binder: IBinder?) {
            binding = false
            if (binder == null || !binder.pingBinder()) {
                error = "O Shizuku não iniciou o serviço do controle."
                changed()
                return
            }
            val s = IVirtualGamepad.Stub.asInterface(binder)
            service = s
            serviceUid = runCatching { s.uid() }.getOrNull()
            if (wanted) {
                startRemote()
            } else if (runCatching { JSONObject(s.status()).optBoolean("active") }.getOrDefault(false)) {
                // Still running from before (the app was closed during a game): adopt it.
                wanted = true
                created = true
                onFoundRunning?.invoke()
            } else {
                // An idle service left behind: end it.
                runCatching { Shizuku.unbindUserService(args, connection, true) }
                service = null
            }
            changed()
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            service = null
            binding = false
            created = false
            changed()
        }
    }

    private val binderReceived: Shizuku.OnBinderReceivedListener = Shizuku.OnBinderReceivedListener {
        if (wanted) connect() else peek()
        changed()
    }

    private val binderDead: Shizuku.OnBinderDeadListener = Shizuku.OnBinderDeadListener {
        service = null
        binding = false
        created = false
        peeked = false
        changed()
    }

    private val permissionResult: Shizuku.OnRequestPermissionResultListener = Shizuku.OnRequestPermissionResultListener { code, _ ->
        if (code == PERMISSION_REQUEST) {
            if (wanted) connect() else peek()
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

    /** What the service sees of the VR Box right now, or null when it is not running. */
    fun remote(): Remote? {
        val s = service ?: return null
        return runCatching {
            val o = JSONObject(s.status())
            Remote(
                o.optBoolean("reading"),
                o.optBoolean("grabbed"),
                o.optJSONArray("nodes")?.length() ?: 0,
                o.optLong("events"),
                o.optString("error"),
                o.optInt("found"),
                o.optBoolean("foundGrabbed"),
            )
        }.getOrNull()
    }

    /** The service's own view (for "Copiar diagnóstico"), or a short reason when it is not running. */
    fun diagnose(): String {
        val s = service ?: return "{\"service\":\"not connected\",\"binding\":$binding,\"wanted\":$wanted,\"created\":$created}"
        return runCatching { s.diagnose() }.getOrElse { "{\"service\":\"error ${it.javaClass.simpleName}: ${it.message}\"}" }
    }

    /** Shizuku itself: version and uid it runs with, for the diagnostics. */
    fun shizukuInfo(): String = runCatching {
        if (!Shizuku.pingBinder()) "não está rodando" else "versão ${Shizuku.getVersion()}, uid ${Shizuku.getUid()}, permissão ${if (hasPermission()) "sim" else "não"}"
    }.getOrDefault("indisponível")

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

    /** Emulation started: create the virtual controller with this configuration (BackgroundConfigCodec). */
    fun start(config: String, reading: Boolean) {
        wanted = true
        error = null
        this.config = config
        this.reading = reading
        if (service != null) startRemote() else connect()
        changed()
    }

    /** New profile or controller while running. */
    fun configure(config: String) {
        this.config = config
        if (created) runCatching { service?.configure(config) }
    }

    /** true while the app is in the background (the service reads the VR Box for the game). */
    fun setReading(on: Boolean) {
        reading = on
        if (created) runCatching { service?.setReading(on) }
    }

    /** Emulation stopped: remove the virtual controller and end the service. */
    fun stop() {
        wanted = false
        error = null
        config = null
        if (created) runCatching { service?.stop() }
        created = false
        if (service != null || binding) {
            runCatching { Shizuku.unbindUserService(args, connection, true) }
            service = null
            binding = false
        }
        changed()
    }

    val isActive: Boolean get() = created

    /** Sends a report computed in this process (the accessibility reader). */
    fun sendReport(report: ByteArray) {
        if (!created) return
        try {
            service?.send(report)
        } catch (e: Exception) {
            Log.w(TAG, "send failed", e)
        }
    }

    private fun startRemote() {
        val s = service ?: return
        val c = config ?: return
        val message = try {
            s.start(c)
        } catch (e: Exception) {
            "O serviço do controle parou: ${e.message}"
        }
        if (message.isNullOrEmpty()) {
            created = true
            error = null
            runCatching { s.setReading(reading) }
        } else {
            created = false
            error = message
        }
    }

    private fun connect() {
        if (service != null) {
            if (!created) startRemote()
            return
        }
        if (binding || !ready()) return
        binding = true
        try {
            Shizuku.bindUserService(args, connection)
        } catch (e: Exception) {
            binding = false
            error = "O Shizuku não aceitou iniciar o serviço: ${e.message}"
        }
    }

    /** Connects to a service left running by an earlier session, without starting a new one. */
    private fun peek() {
        if (peeked || service != null || binding || !ready()) return
        peeked = true
        runCatching { Shizuku.peekUserService(args, connection) }.onFailure { Log.i(TAG, "peek failed", it) }
    }

    private fun ready(): Boolean =
        runCatching { Shizuku.pingBinder() }.getOrDefault(false) && hasPermission() && !runCatching { Shizuku.isPreV11() }.getOrDefault(true)

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
