package com.rispmr.vrboxemulator

import android.app.Activity
import android.bluetooth.BluetoothAdapter
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.provider.Settings
import android.util.Log
import android.view.InputDevice
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.WindowManager
import android.webkit.WebView
import com.rispmr.vrboxemulator.bluetooth.BluetoothDeviceManager
import com.rispmr.vrboxemulator.bridge.CommandException
import com.rispmr.vrboxemulator.bridge.CommandRouter
import com.rispmr.vrboxemulator.bridge.WebBridge
import com.rispmr.vrboxemulator.demo.DemoScript
import com.rispmr.vrboxemulator.gamepad.VirtualGamepadManager
import com.rispmr.vrboxemulator.game.GameModeBus
import com.rispmr.vrboxemulator.game.GameModeService
import android.content.ComponentName
import com.rispmr.vrboxemulator.engine.AppSettings
import com.rispmr.vrboxemulator.engine.AppSettingsCodec
import com.rispmr.vrboxemulator.engine.BackgroundConfig
import com.rispmr.vrboxemulator.engine.BackgroundConfigCodec
import com.rispmr.vrboxemulator.engine.ButtonConfig
import com.rispmr.vrboxemulator.engine.Clock
import com.rispmr.vrboxemulator.engine.DefaultProfiles
import com.rispmr.vrboxemulator.engine.DeviceClassifier
import com.rispmr.vrboxemulator.engine.DeviceGroup
import com.rispmr.vrboxemulator.engine.DeviceIdentity
import com.rispmr.vrboxemulator.engine.DeviceRegistry
import com.rispmr.vrboxemulator.engine.Detection
import com.rispmr.vrboxemulator.engine.EventLog
import com.rispmr.vrboxemulator.engine.FileTextStorage
import com.rispmr.vrboxemulator.engine.GameModeCodec
import com.rispmr.vrboxemulator.engine.Hand
import com.rispmr.vrboxemulator.engine.HandSnapshot
import com.rispmr.vrboxemulator.engine.IdGenerator
import com.rispmr.vrboxemulator.engine.IdentifiedInputsStore
import com.rispmr.vrboxemulator.engine.InputCatalog
import com.rispmr.vrboxemulator.engine.InputProcessor
import com.rispmr.vrboxemulator.engine.Profile
import com.rispmr.vrboxemulator.engine.ProfileCodec
import com.rispmr.vrboxemulator.engine.ProfileException
import com.rispmr.vrboxemulator.engine.ProfileRepository
import com.rispmr.vrboxemulator.engine.RawEvent
import com.rispmr.vrboxemulator.engine.RegistryEvent
import com.rispmr.vrboxemulator.engine.SettingsException
import com.rispmr.vrboxemulator.engine.Sources
import com.rispmr.vrboxemulator.engine.VirtualControllerManager
import com.rispmr.vrboxemulator.engine.VirtualGamepad
import com.rispmr.vrboxemulator.engine.VirtualTargets
import com.rispmr.vrboxemulator.input.AndroidInputTranslator
import com.rispmr.vrboxemulator.input.HidInputManager
import com.rispmr.vrboxemulator.integration.UdpStreamer
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.math.roundToInt

/**
 * Wires the engine to Android and to the web UI.
 *
 * Threading model: everything here runs on the main thread (input events are delivered there
 * by Android anyway and the engine work per event is a few microseconds). File writes run on
 * [io]; UDP output runs on the [UdpStreamer] thread. Nothing blocks the main thread.
 */
class AppController(private val activity: Activity, private val webView: WebView) {
    private val main = Handler(Looper.getMainLooper())
    private val io: ExecutorService = Executors.newSingleThreadExecutor()
    private val clock = object : Clock {
        override fun uptimeMs() = SystemClock.uptimeMillis()
        override fun wallMs() = System.currentTimeMillis()
    }

    // Engine
    private val log = EventLog()
    private val controllers = VirtualControllerManager()
    private val processor = InputProcessor(controllers, log, clock)
    private val registry = DeviceRegistry()
    private val translator = AndroidInputTranslator()
    private val rawBuffer = ArrayList<RawEvent>(16)

    // Platform
    val permissions = PermissionManager(activity)
    private val hid = HidInputManager(activity)
    private val bluetooth = BluetoothDeviceManager(activity) { permissions.hasBluetooth() }
    private val streamer = UdpStreamer()
    private val router = CommandRouter()
    private val bridge = WebBridge(webView, router)

    // Storage
    private val settingsStorage = FileTextStorage(File(activity.filesDir, "settings.json"))
    private val profileStorage = FileTextStorage(File(activity.filesDir, "profiles.json"))
    private val identifiedStorage = FileTextStorage(File(activity.filesDir, "identified-inputs.json"))
    private var settings: AppSettings = AppSettingsCodec.decode(runCatching { settingsStorage.read() }.getOrNull())
    private val profiles = ProfileRepository(
        storage = profileStorage,
        defaults = loadDefaults(),
        persist = { text -> writeAsync(profileStorage, text) },
    )
    private val identified = IdentifiedInputsStore(identifiedStorage) { text -> writeAsync(identifiedStorage, text) }

    // Session state
    private lateinit var working: Profile
    private var dirty = false
    private var selectedKey: String? = null
    private var emulationRunning = false
    private var emulationStartedAt = 0L
    private var demoRunning = false
    private var demoStartedAt = 0L
    private var demoScript = DemoScript()
    private var detecting = false
    private var pointerCaptured = false
    private var windowFocused = false
    private var resumed = false
    private var pageReady = false
    private var eventDeviceKey = ""
    private var lastMotionDx = 0f
    private var lastMotionDy = 0f

    // UI push coalescing
    private var frameScheduled = false
    private var lastFrameAt = 0L
    private var lastSentVersion = -1L
    private var lastSentLogSeq = 0L
    private var statusDirty = true
    private var devicesDirty = true
    private var physicalDirty = true
    private var statsDirty = true
    private var identifiedDirty = false
    private var identifiedSaveScheduled = false
    private val pendingDetections = ArrayList<JSONObject>()
    private var tickScheduled = false
    private val pendingResults = HashMap<Int, (Int, Intent?) -> Unit>()
    private var nextRequestCode = 5000
    private val ids = IdGenerator.RANDOM

    private val busListener: () -> Unit = {
        main.post {
            statusDirty = true
            scheduleFrame()
        }
    }

    init {
        VirtualGamepadManager.init(activity)
        VirtualGamepadManager.addListener(busListener)
        log.capacity = settings.logSize
        profiles.load()
        profiles.loadWarnings.forEach { log.add(EventLog.SYSTEM, it, clock.wallMs()) }
        identified.load()
        working = profiles.active()
        applyWorking()

        controllers.listener = com.rispmr.vrboxemulator.engine.VirtualEventListener { ev ->
            log.add(EventLog.VIRTUAL, ev.describe(), clock.wallMs())
        }
        processor.detectionListener = { onDetection(it) }
        processor.identifiedListener = { id, kind ->
            val key = eventDeviceKey
            if (key.isNotEmpty() && identified.record(key, id, kind, clock.wallMs())) {
                statusDirty = true
                identifiedDirty = true
            }
            scheduleIdentifiedSave()
        }
        bluetooth.onChanged = {
            statusDirty = true
            scheduleFrame()
        }
        bluetooth.onAclEvent = { name, connected ->
            log.add(EventLog.SYSTEM, "Bluetooth ${if (connected) "conectado" else "desconectado"}: $name", clock.wallMs())
        }
        router.onInternalError = { cmd, e -> Log.e(TAG, "Command $cmd failed", e) }
        VirtualGamepadManager.onFoundRunning = {
            // The app was closed during a game while the virtual gamepad kept running.
            if (!emulationRunning) {
                emulationRunning = true
                emulationStartedAt = clock.wallMs()
                if (settings.udp.enabled) streamer.start(settings.udp)
                log.add(EventLog.SYSTEM, "O controle virtual continuava ligado", clock.wallMs())
            }
            GameModeBus.setEmulationActive(true)
            pushBackgroundConfig()
            VirtualGamepadManager.setReading(!resumed && !gameServiceEnabled())
            statusDirty = true
            scheduleFrame()
        }
        GameModeBus.onState(busListener)
        publishToGameMode()
        registerCommands()
        log.add(EventLog.SYSTEM, "App aberto", clock.wallMs())
    }

    // ---------------------------------------------------------------- lifecycle

    /**
     * "Testar o controle virtual": with the app on screen, the Shizuku service reads the VR Box
     * anyway and drives the virtual gamepad; the gamepad's own events reach this activity and are
     * shown, so the user sees exactly what a game receives.
     */
    private var selfTest = false
    private val selfTestAxes = FloatArray(6) // X, Y, Z, RZ, BRAKE(L2), GAS(R2)
    private val selfTestButtons = LinkedHashSet<String>()
    private var selfTestEvents = 0
    private val ownPadIds = HashMap<Int, Boolean>()

    private fun isOwnPad(deviceId: Int): Boolean = ownPadIds.getOrPut(deviceId) {
        InputDevice.getDevice(deviceId)?.let { VirtualGamepad.isOwn(it.vendorId, it.productId, it.name) } == true
    }

    private fun setSelfTest(on: Boolean) {
        if (selfTest == on) return
        selfTest = on
        selfTestAxes.fill(0f)
        selfTestButtons.clear()
        selfTestEvents = 0
        GameModeBus.setSelfTest(on)
        // With the accessibility reader on, it does the reading; Shizuku only drives the gamepad.
        VirtualGamepadManager.setReading((on || (!resumed && emulationRunning)) && !gameServiceEnabled())
        statusDirty = true
        scheduleFrame()
    }

    private fun onOwnPadKey(event: KeyEvent) {
        if (!selfTest || event.repeatCount > 0) return
        val name = AndroidInputTranslator.keyName(event.keyCode).removePrefix("BUTTON_")
        if (event.action == KeyEvent.ACTION_DOWN) selfTestButtons += name else if (event.action == KeyEvent.ACTION_UP) selfTestButtons -= name
        selfTestEvents++
        statusDirty = true
        scheduleFrame()
    }

    private fun onOwnPadMotion(event: MotionEvent) {
        if (!selfTest) return
        val axes = intArrayOf(MotionEvent.AXIS_X, MotionEvent.AXIS_Y, MotionEvent.AXIS_Z, MotionEvent.AXIS_RZ, MotionEvent.AXIS_BRAKE, MotionEvent.AXIS_GAS)
        for (i in axes.indices) selfTestAxes[i] = event.getAxisValue(axes[i])
        selfTestEvents++
        statusDirty = true
        scheduleFrame()
    }

    private fun selfTestJson(): Any {
        if (!selfTest) return JSONObject.NULL
        val r = { v: Float -> round(v) }
        return JSONObject()
            // Android sticks: +y = down. The page draws +y = up.
            .put("left", JSONObject().put("x", r(selfTestAxes[0])).put("y", r(-selfTestAxes[1])))
            .put("right", JSONObject().put("x", r(selfTestAxes[2])).put("y", r(-selfTestAxes[3])))
            .put("l2", r(selfTestAxes[4]))
            .put("r2", r(selfTestAxes[5]))
            .put("buttons", JSONArray(selfTestButtons.toList()))
            .put("events", selfTestEvents)
    }

    /** Linux scan code -> Android key name of the selected controller (from KeyEvent.getScanCode). */
    private val scanCodes = HashMap<Int, String>()
    private var scanCodesKey: String? = null

    /** What the Shizuku service needs to read the VR Box like the app does. */
    private fun backgroundConfig(): String? {
        // Base name: every interface of the VR Box ("VR BOX Mouse", "VR BOX Keyboard"...) is read.
        val device = DeviceIdentity.fromKey(settings.lastDeviceKey)?.let { it.copy(name = DeviceGroup.baseName(it.name)) } ?: return null
        return BackgroundConfigCodec.encode(BackgroundConfig(device, working, if (scanCodesKey == settings.lastDeviceKey) HashMap(scanCodes) else emptyMap()))
    }

    private fun publishToGameMode() = GameModeBus.publish(settings, working)

    /** The "acessibilidade" APK declares the accessibility reader; the default APK does not. */
    private val accessibilityAvailable: Boolean by lazy {
        runCatching { activity.packageManager.getServiceInfo(ComponentName(activity, GameModeService::class.java), 0) }.isSuccess
    }

    /** Whether the user turned on our accessibility service in Android settings. */
    private fun gameServiceEnabled(): Boolean {
        if (!accessibilityAvailable) return false
        val enabled = Settings.Secure.getString(activity.contentResolver, Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES) ?: return false
        val component = ComponentName(activity, GameModeService::class.java)
        return enabled.split(':').any {
            it.equals(component.flattenToString(), ignoreCase = true) || it.equals(component.flattenToShortString(), ignoreCase = true)
        }
    }

    private fun pushBackgroundConfig() {
        if (!emulationRunning || !VirtualGamepadManager.isActive) return
        backgroundConfig()?.let { VirtualGamepadManager.configure(it) }
    }

    fun onPageStarted() {
        pageReady = false
        bridge.onPageStarted()
    }

    fun onResume() {
        resumed = true
        // On screen: the app reads the VR Box itself and the virtual gamepad rests.
        selfTest = false
        GameModeBus.setSelfTest(false)
        GameModeBus.setUiResumed(true)
        VirtualGamepadManager.setReading(false)
        hid.start(
            onAdded = { id -> hid.describe(id)?.let { handleRegistry(registry.put(it)) } },
            onRemoved = { id ->
                ownPadIds.remove(id)
                translator.reset(id)
                handleRegistry(registry.remove(id))
            },
            onChanged = { id -> hid.describe(id)?.let { handleRegistry(registry.put(it)) } },
        )
        handleRegistry(registry.replaceAll(hid.listDevices()))
        bluetooth.start()
        statusDirty = true
        devicesDirty = true
        main.removeCallbacks(statsRunnable)
        main.postDelayed(statsRunnable, 1000)
        scheduleFrame()
    }

    fun onPause() {
        resumed = false
        selfTest = false
        GameModeBus.setSelfTest(false)
        GameModeBus.setUiResumed(false)
        // A game is (probably) opening: the accessibility reader takes over, or, without it,
        // the Shizuku service reads the VR Box itself.
        if (emulationRunning) VirtualGamepadManager.setReading(!gameServiceEnabled())
        hid.stop()
        bluetooth.stop()
        main.removeCallbacks(statsRunnable)
        processor.releaseAll("app em segundo plano")
        afterStateChange()
        identified.save()
    }

    fun onDestroy() {
        VirtualGamepadManager.removeListener(busListener)
        VirtualGamepadManager.onFoundRunning = null
        GameModeBus.offState(busListener)
        GameModeBus.setUiResumed(false)
        stopDemo()
        streamer.shutdown()
        io.shutdown()
    }

    fun onWindowFocusChanged(hasFocus: Boolean) {
        windowFocused = hasFocus
        if (!hasFocus) {
            // Android stops delivering events without focus: release everything so no
            // virtual button stays stuck in the PRESSED state.
            processor.releaseAll("app perdeu o foco")
            afterStateChange()
        }
        updatePointerCapture()
        statusDirty = true
        scheduleFrame()
    }

    fun onPointerCaptureChanged(hasCapture: Boolean) {
        pointerCaptured = hasCapture
        statusDirty = true
        scheduleFrame()
    }

    fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        pendingResults.remove(requestCode)?.invoke(resultCode, data)
    }

    // ---------------------------------------------------------------- input entry points

    /** @return true when the event was consumed (it then does not reach the UI). */
    fun onKeyEvent(event: KeyEvent): Boolean = safeInput(false) {
        if (isOwnPad(event.deviceId)) {
            onOwnPadKey(event)
            return@safeInput true
        }
        val key = acceptDevice(event.deviceId) ?: return@safeInput false
        learnScanCode(key, event)
        rawBuffer.clear()
        translator.translateKey(event, key, rawBuffer)
        dispatchRaw(rawBuffer)
        // The controller's BACK must never close the app or leave the current screen.
        settings.consumeControllerInput || event.keyCode == KeyEvent.KEYCODE_BACK
    }

    fun onMotionEvent(event: MotionEvent): Boolean = safeInput(false) {
        if (event.isFromSource(InputDevice.SOURCE_TOUCHSCREEN)) return@safeInput false
        if (isOwnPad(event.deviceId)) {
            onOwnPadMotion(event)
            return@safeInput true
        }
        val key = acceptDevice(event.deviceId) ?: return@safeInput false
        rawBuffer.clear()
        translator.translateMotion(event, key, captured = false, out = rawBuffer)
        dispatchRaw(rawBuffer)
        settings.consumeControllerInput
    }

    fun onCapturedPointer(event: MotionEvent): Boolean = safeInput(true) {
        val key = acceptDevice(event.deviceId) ?: return@safeInput true
        rawBuffer.clear()
        translator.translateMotion(event, key, captured = true, out = rawBuffer)
        dispatchRaw(rawBuffer)
        true
    }

    /**
     * Odd controllers send odd events. A problem with one event is logged and ignored: reading
     * input must never close the app.
     */
    /** The background reader sees Linux codes; remember how Android named them for this controller. */
    private fun learnScanCode(deviceKey: String, event: KeyEvent) {
        if (event.scanCode <= 0 || event.keyCode == KeyEvent.KEYCODE_UNKNOWN) return
        if (scanCodesKey != deviceKey) {
            scanCodes.clear()
            scanCodesKey = deviceKey
        }
        val name = AndroidInputTranslator.keyName(event.keyCode)
        if (scanCodes.put(event.scanCode, name) != name) pushBackgroundConfig()
    }

    private inline fun safeInput(fallback: Boolean, block: () -> Boolean): Boolean = try {
        block()
    } catch (e: Exception) {
        Log.e(TAG, "Input event failed", e)
        fallback
    }

    /** Decides whether events of this Android input device are read. Returns its group key. */
    private fun acceptDevice(deviceId: Int): String? {
        if (demoRunning) return null
        var info = registry.device(deviceId)
        if (info == null) {
            val described = hid.describe(deviceId) ?: return null
            handleRegistry(registry.put(described))
            info = described
        }
        if (info.isVirtual) return null
        val key = DeviceGroup.keyOf(info)
        val selected = selectedKey
        // Built-in keys (phone volume buttons...) never count. Android < 10 does not report
        // isExternal, so there the name tells internal devices apart.
        val external = info.isExternal == true || (info.isExternal == null && !looksInternal(info.name))
        val candidate = external && DeviceClassifier.isInputCandidate(info.sources)
        return when {
            selected != null && key == selected -> key
            selected != null && !settings.selectedDeviceOnly && candidate -> key
            // Nothing chosen yet, or the chosen controller is off (e.g. the VR Box changed mode
            // and now shows up as another device): the first controller that sends input wins.
            candidate && (selected == null || !registry.isConnected(selected)) -> {
                select(key, auto = true)
                key
            }
            else -> null
        }
    }

    private fun dispatchRaw(events: List<RawEvent>) {
        if (events.isEmpty()) return
        var changed = false
        for (ev in events) {
            eventDeviceKey = ev.deviceKey
            if (ev is RawEvent.Motion) {
                lastMotionDx = ev.dx
                lastMotionDy = ev.dy
            }
            if (processor.process(ev)) changed = true
            physicalDirty = true
        }
        if (changed) afterStateChange()
        scheduleFrame()
        scheduleTick()
    }

    private fun afterStateChange() {
        if (emulationRunning) streamer.publish(controllers.snapshot(), demoRunning, controllerConnected())
        scheduleFrame()
        scheduleTick()
    }

    private val tickRunnable = Runnable {
        tickScheduled = false
        val now = clock.uptimeMs()
        var changed = processor.tick(now)
        if (controllers.tick(now)) changed = true
        if (changed) {
            physicalDirty = true
            afterStateChange()
        }
        scheduleTick()
    }

    private fun scheduleTick() {
        if (tickScheduled) return
        if (controllers.needsTick() || processor.needsTick()) {
            tickScheduled = true
            main.postDelayed(tickRunnable, TICK_MS)
        }
    }

    private val statsRunnable = object : Runnable {
        override fun run() {
            if (!resumed) return
            if (processor.stats.roll(clock.uptimeMs())) statsDirty = true
            if (emulationRunning) statusDirty = true // packet counter
            scheduleFrame()
            main.postDelayed(this, 1000)
        }
    }

    // ---------------------------------------------------------------- devices

    private fun handleRegistry(events: List<RegistryEvent>) {
        if (events.isEmpty()) return
        devicesDirty = true
        statusDirty = true
        for (e in events) {
            when (e) {
                is RegistryEvent.Connected -> {
                    val g = e.group
                    if (!g.isCandidate) continue
                    val verb = if (e.reconnected) "reconectado" else "encontrado"
                    log.add(EventLog.SYSTEM, "Dispositivo $verb: ${g.name} (${g.roles.joinToString(" + ")})", clock.wallMs())
                    if (g.key == selectedKey) {
                        log.add(EventLog.SYSTEM, "O controle voltou: ${g.name}", clock.wallMs())
                        updatePointerCapture()
                    } else if (selectedKey == null && !demoRunning && settings.autoSelectLastDevice && g.key == settings.lastDeviceKey) {
                        select(g.key, auto = true)
                    }
                }
                is RegistryEvent.Disconnected -> {
                    val g = e.group
                    if (!g.isCandidate) continue
                    log.add(EventLog.SYSTEM, "Dispositivo desconectado: ${g.name}", clock.wallMs())
                    if (g.key == selectedKey) {
                        processor.releaseAll("controle desconectado")
                        afterStateChange()
                    }
                }
            }
        }
        scheduleFrame()
    }

    private fun select(key: String, auto: Boolean) {
        val group = registry.group(key) ?: throw CommandException("Esse dispositivo não está conectado", "not_connected")
        if (selectedKey != key) {
            processor.releaseAll(null)
            translator.reset()
        }
        selectedKey = key
        settings = settings.copy(lastDeviceKey = key)
        saveSettings()
        log.add(EventLog.SYSTEM, "Controle selecionado${if (auto) " automaticamente" else ""}: ${group.name}", clock.wallMs())
        statusDirty = true
        devicesDirty = true
        identifiedDirty = true
        updatePointerCapture()
        afterStateChange()
    }

    private fun looksInternal(name: String): Boolean {
        val n = name.lowercase()
        return INTERNAL_HINTS.any { n.contains(it) }
    }

    private fun releaseController() {
        val name = registry.lastKnown(selectedKey)?.name
        if (emulationRunning) stopEmulation()
        selectedKey = null
        detecting = false
        processor.detecting = false
        processor.releaseAll(null)
        translator.reset()
        if (name != null) log.add(EventLog.SYSTEM, "Controle liberado: $name (leitura parada)", clock.wallMs())
        statusDirty = true
        devicesDirty = true
        updatePointerCapture()
        afterStateChange()
    }

    private fun controllerConnected(): Boolean = demoRunning || registry.isConnected(selectedKey)

    private fun readingActive(): Boolean = demoRunning || (selectedKey != null && registry.isConnected(selectedKey))

    private fun updatePointerCapture() {
        val group = registry.group(selectedKey)
        val wanted = settings.autoPointerCapture && !demoRunning && group != null && Sources.has(group.sources, Sources.MOUSE)
        if (wanted && windowFocused && !webView.hasPointerCapture()) {
            webView.requestFocus()
            webView.requestPointerCapture()
        } else if (!wanted && webView.hasPointerCapture()) {
            webView.releasePointerCapture()
        }
    }

    // ---------------------------------------------------------------- detection

    private fun onDetection(d: Detection) {
        val deviceName = if (d.deviceKey == DemoScript.DEVICE_KEY) DemoScript.DEVICE_NAME else registry.lastKnown(d.deviceKey)?.name ?: d.deviceKey
        pendingDetections += JSONObject()
            .put("sourceId", d.sourceId)
            .put("label", d.label)
            .put("kind", d.kind.key)
            .put("state", d.state)
            .put("value", round(d.value))
            .put("device", deviceName)
            .put("demo", d.deviceKey == DemoScript.DEVICE_KEY)
            .put("t", clock.wallMs())
            .put(
                "alternatives",
                JSONArray().apply {
                    d.alternatives.forEach { id ->
                        put(JSONObject().put("id", id).put("label", InputCatalog.labelOf(id)).put("kind", InputCatalog.kindOf(id)?.key))
                    }
                },
            )
        if (pendingDetections.size > 20) pendingDetections.removeAt(0)
        scheduleFrame()
    }

    private fun identifiedKey(): String? = if (demoRunning) DemoScript.DEVICE_KEY else selectedKey

    private fun scheduleIdentifiedSave() {
        if (identifiedSaveScheduled) return
        identifiedSaveScheduled = true
        main.postDelayed({
            identifiedSaveScheduled = false
            identified.save()
        }, 2000)
    }

    // ---------------------------------------------------------------- emulation

    private fun startEmulation() {
        if (!readingActive()) {
            throw CommandException("Conecte e selecione um controle primeiro (ou ligue o modo demonstração).", "no_controller")
        }
        emulationRunning = true
        emulationStartedAt = clock.wallMs()
        GameModeBus.setEmulationActive(true)
        if (settings.udp.enabled) streamer.start(settings.udp)
        applyVirtualGamepad()
        applyKeepScreenOn()
        val output = if (settings.udp.enabled) "rede UDP ${settings.udp.host}:${settings.udp.port} (${settings.udp.format})" else "nenhuma saída de rede"
        val game = if (gamepadOutput()) "controle virtual: ${gamepadLabel(VirtualGamepadManager.status())}" else "Modo jogo desligado"
        log.add(EventLog.SYSTEM, "Emulação iniciada — $game; $output", clock.wallMs())
        statusDirty = true
        afterStateChange()
    }

    private fun stopEmulation() {
        if (!emulationRunning) return
        emulationRunning = false
        streamer.stop()
        selfTest = false
        GameModeBus.setSelfTest(false)
        GameModeBus.setEmulationActive(false)
        VirtualGamepadManager.stop()
        applyKeepScreenOn()
        log.add(EventLog.SYSTEM, "Emulação parada", clock.wallMs())
        statusDirty = true
        scheduleFrame()
    }

    private fun gamepadOutput() = settings.game.enabled

    /** The virtual gamepad exists while emulation runs with Modo jogo set to "Controle virtual". */
    private fun applyVirtualGamepad() {
        val config = backgroundConfig()
        if (emulationRunning && gamepadOutput() && config != null) {
            if (VirtualGamepadManager.isActive) VirtualGamepadManager.configure(config) else VirtualGamepadManager.start(config, reading = !resumed && !gameServiceEnabled())
        } else {
            VirtualGamepadManager.stop()
        }
    }

    private fun gamepadLabel(s: VirtualGamepadManager.Status): String = when (s.state) {
        VirtualGamepadManager.State.NOT_INSTALLED -> "instale o Shizuku"
        VirtualGamepadManager.State.NOT_RUNNING -> "inicie o Shizuku"
        VirtualGamepadManager.State.OLD_SHIZUKU -> "atualize o Shizuku"
        VirtualGamepadManager.State.NO_PERMISSION -> "permita o app no Shizuku"
        VirtualGamepadManager.State.READY, VirtualGamepadManager.State.CONNECTING -> "criando"
        VirtualGamepadManager.State.ACTIVE -> "conectado"
        VirtualGamepadManager.State.ERROR -> s.message
    }

    private fun applyKeepScreenOn() {
        if (emulationRunning && settings.keepScreenOn) {
            activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        } else {
            activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
    }

    // ---------------------------------------------------------------- demo

    private val demoRunnable = object : Runnable {
        override fun run() {
            if (!demoRunning) return
            val now = clock.uptimeMs()
            dispatchRaw(demoScript.step(now - demoStartedAt, now))
            main.postDelayed(this, DemoScript.STEP_MS)
        }
    }

    private fun startDemo() {
        if (demoRunning) return
        processor.releaseAll(null)
        demoScript = DemoScript()
        demoRunning = true
        demoStartedAt = clock.uptimeMs()
        updatePointerCapture()
        log.add(EventLog.SYSTEM, "Modo demonstração ligado — os comandos são simulados", clock.wallMs())
        statusDirty = true
        identifiedDirty = true
        main.post(demoRunnable)
    }

    private fun stopDemo() {
        if (!demoRunning) return
        dispatchRaw(demoScript.releaseAll(clock.uptimeMs()))
        demoRunning = false
        main.removeCallbacks(demoRunnable)
        processor.releaseAll(null)
        if (emulationRunning && !readingActive()) stopEmulation()
        log.add(EventLog.SYSTEM, "Modo demonstração desligado", clock.wallMs())
        statusDirty = true
        identifiedDirty = true
        updatePointerCapture()
        afterStateChange()
    }

    // ---------------------------------------------------------------- profiles

    private fun applyWorking() {
        controllers.configure(working.mappings, working.buttons, working.left, working.right)
        controllers.onPhysicalState(processor.state, clock.uptimeMs())
        statusDirty = true
        publishToGameMode()
        pushBackgroundConfig()
    }

    private fun editWorking(updated: Profile): JSONObject {
        working = updated
        dirty = true
        applyWorking()
        afterStateChange()
        return profileUiJson(working)
    }

    private fun loadDefaults(): DefaultProfiles {
        val am = activity.assets
        val template = am.open("config/default-profile.json").bufferedReader().use { it.readText() }
        val initial = am.open("config/controller-profiles.json").bufferedReader().use { it.readText() }
        return DefaultProfiles.parse(template, initial)
    }

    private fun writeAsync(storage: FileTextStorage, text: String) {
        io.execute {
            try {
                storage.write(text)
            } catch (e: Exception) {
                Log.e(TAG, "Save failed", e)
                main.post {
                    log.add(EventLog.SYSTEM, "Não foi possível salvar: ${e.message}", clock.wallMs())
                    scheduleFrame()
                }
            }
        }
    }

    private fun saveSettings() {
        writeAsync(settingsStorage, AppSettingsCodec.encode(settings).toString())
        publishToGameMode()
    }

    // ---------------------------------------------------------------- commands

    private fun registerCommands() = with(router) {
        on("app.hello") {
            pageReady = true
            lastSentLogSeq = log.lastSeq
            lastSentVersion = -1
            statusDirty = false
            devicesDirty = false
            JSONObject()
                .put("info", infoJson())
                .put("status", statusJson())
                .put("catalog", catalogJson())
                .put("settings", AppSettingsCodec.encode(settings))
                .put("profile", profileUiJson(working))
                .put("profiles", profilesJson())
                .put("devices", devicesJson())
                .put("identified", identifiedJson())
                .put("log", logJson(log.recent(120)))
                .put("frame", frameJson(includeEvents = false))
        }
        on("app.status") { statusJson() }
        on("app.openAppSettings") { permissions.openAppSettings(); null }

        // Bluetooth
        on("bt.devices") { bluetoothJson() }
        onAsync("bt.requestPermission") { _, reply ->
            permissions.requestBluetooth { state ->
                statusDirty = true
                if (state.key == "granted") log.add(EventLog.SYSTEM, "Permissão de Bluetooth concedida", clock.wallMs())
                scheduleFrame()
                reply.ok(JSONObject().put("permission", state.key).put("bluetooth", bluetoothJson()))
            }
        }
        on("bt.openSettings") {
            startSafely(Intent(Settings.ACTION_BLUETOOTH_SETTINGS))
            null
        }
        onAsync("bt.requestEnable") { _, reply ->
            if (!bluetooth.isSupported) throw CommandException("Este celular não tem Bluetooth", "unsupported")
            if (!permissions.hasBluetooth()) throw CommandException("Precisa da permissão de Bluetooth", "permission_required")
            startForResult(Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)) { _, _ ->
                statusDirty = true
                scheduleFrame()
                reply.ok(JSONObject().put("enabled", bluetooth.isEnabled))
            }
        }

        // Input devices
        on("input.devices") { devicesJson() }
        on("input.connect") {
            handleRegistry(registry.replaceAll(hid.listDevices()))
            if (demoRunning) stopDemo()
            val best = registry.bestCandidate(settings.lastDeviceKey)
            if (best != null) select(best.key, auto = false)
            JSONObject()
                .put("selected", best?.toJson() ?: JSONObject.NULL)
                .put("candidates", registry.groups().size)
                .put("bluetoothEnabled", bluetooth.isEnabled)
        }
        on("input.select") { args ->
            if (demoRunning) stopDemo()
            select(args.optString("key"), auto = false)
            statusJson()
        }
        on("input.release") {
            if (demoRunning) stopDemo()
            releaseController()
            statusJson()
        }
        on("input.recapture") {
            updatePointerCapture()
            null
        }

        // Automatic input detection
        on("detect.start") {
            detecting = true
            processor.detecting = true
            statusDirty = true
            log.add(EventLog.SYSTEM, "Detecção de botões ligada", clock.wallMs())
            JSONObject().put("selected", selectedKey != null || demoRunning)
        }
        on("detect.stop") {
            detecting = false
            processor.detecting = false
            statusDirty = true
            null
        }
        on("identified.list") { identifiedJson() }
        on("identified.clear") {
            identifiedKey()?.let { identified.clear(it) }
            statusDirty = true
            identifiedJson()
        }

        // Mapping (edits the working copy; "profile.save" persists it)
        on("mapping.add") { args ->
            val rule = ProfileCodec.decodeRule(args.put("id", ids.next("m-")))
                ?: throw CommandException("Essa entrada não pode controlar esse comando", "incompatible")
            if (working.mappings.any { it.source == rule.source && it.target == rule.target }) {
                throw CommandException("Esse mapeamento já existe", "duplicate")
            }
            editWorking(working.copy(mappings = working.mappings + rule))
        }
        on("mapping.update") { args ->
            val id = args.optString("id")
            val current = working.mappings.firstOrNull { it.id == id } ?: throw CommandException("Mapeamento não encontrado", "not_found")
            val merged = ProfileCodec.encodeRule(current)
            for (k in listOf("source", "target", "invert", "threshold", "scale")) if (args.has(k)) merged.put(k, args.get(k))
            val rule = ProfileCodec.decodeRule(merged) ?: throw CommandException("Essa entrada não pode controlar esse comando", "incompatible")
            editWorking(working.copy(mappings = working.mappings.map { if (it.id == id) rule else it }))
        }
        on("mapping.remove") { args ->
            val id = args.optString("id")
            if (working.mappings.none { it.id == id }) throw CommandException("Mapeamento não encontrado", "not_found")
            editWorking(working.copy(mappings = working.mappings.filterNot { it.id == id }))
        }
        on("mapping.resetDefault") {
            editWorking(working.copy(mappings = profiles.baseOf(working).mappings))
        }
        on("profile.updateSticks") { args ->
            var p = working
            args.optJSONObject("left")?.let { p = p.copy(left = ProfileCodec.decodeStick(merge(ProfileCodec.encodeStick(p.left), it), p.left)) }
            args.optJSONObject("right")?.let { p = p.copy(right = ProfileCodec.decodeStick(merge(ProfileCodec.encodeStick(p.right), it), p.right)) }
            editWorking(p)
        }
        on("profile.updateButtons") { args ->
            val b = working.buttons
            editWorking(
                working.copy(
                    buttons = ButtonConfig(
                        analogThreshold = args.optDouble("analogThreshold", b.analogThreshold.toDouble()).toFloat().coerceIn(0.05f, 0.95f),
                        digitalAnalogValue = args.optDouble("digitalAnalogValue", b.digitalAnalogValue.toDouble()).toFloat().coerceIn(0f, 1f),
                    ),
                ),
            )
        }
        on("profile.resetSettings") {
            val base = profiles.baseOf(working)
            editWorking(working.copy(left = base.left, right = base.right, buttons = base.buttons))
        }
        // Guided setup ("Configurar meu VR Box"): saves the result as a profile and uses it.
        on("profile.fromSetup") { args ->
            val arr = args.optJSONArray("mappings") ?: JSONArray()
            val rules = (0 until arr.length()).mapNotNull { i ->
                arr.optJSONObject(i)?.let { o -> ProfileCodec.decodeRule(JSONObject(o.toString()).put("id", "s${i + 1}"), i) }
            }
            if (rules.isEmpty()) throw CommandException("Nenhum botão foi configurado", "empty")
            val name = ProfileCodec.cleanName(args.optString("name")) ?: "Meu VR Box"
            val existing = profiles.all.firstOrNull { it.name == name }
            val base = existing ?: catching { profiles.create(name, null) }
            // merge: keep what other modes of the controller learned (they send other signals).
            val fresh = rules.map { it.source }.toSet()
            val kept = if (args.optBoolean("merge", false)) base.mappings.filterNot { it.source in fresh } else emptyList()
            val saved = catching { profiles.update(base.copy(mappings = kept + rules, description = "Criado no passo a passo")) }
            working = catching { profiles.setActive(saved.id) }
            dirty = false
            applyWorking()
            afterStateChange()
            log.add(EventLog.SYSTEM, "Controle configurado: ${working.name}", clock.wallMs())
            JSONObject().put("profile", profileUiJson(working)).put("profiles", profilesJson())
        }
        on("profile.save") {
            working = profiles.update(working)
            dirty = false
            statusDirty = true
            log.add(EventLog.SYSTEM, "Perfil salvo: ${working.name}", clock.wallMs())
            JSONObject().put("profile", profileUiJson(working)).put("profiles", profilesJson())
        }
        on("profile.revert") {
            working = profiles.get(working.id) ?: profiles.active()
            dirty = false
            applyWorking()
            afterStateChange()
            profileUiJson(working)
        }

        // Profiles manager
        on("profiles.list") { profilesJson() }
        on("profiles.activate") { args ->
            val id = args.optString("id")
            if (dirty && !args.optBoolean("discard", false) && id != working.id) {
                throw CommandException("O perfil atual tem alterações não salvas", "unsaved")
            }
            working = catching { profiles.setActive(id) }
            dirty = false
            applyWorking()
            afterStateChange()
            log.add(EventLog.SYSTEM, "Perfil em uso: ${working.name}", clock.wallMs())
            JSONObject().put("profile", profileUiJson(working)).put("profiles", profilesJson())
        }
        on("profiles.create") { args ->
            val baseId = args.optString("baseId").takeIf { it.isNotBlank() }
            val p = catching { profiles.create(args.optString("name"), baseId) }
            JSONObject().put("created", p.id).put("profiles", profilesJson())
        }
        on("profiles.rename") { args ->
            val p = catching { profiles.rename(args.optString("id"), args.optString("name")) }
            if (p.id == working.id) working = working.copy(name = p.name)
            statusDirty = true
            JSONObject().put("profile", profileUiJson(working)).put("profiles", profilesJson())
        }
        on("profiles.duplicate") { args ->
            val source = args.optString("id")
            val p = catching {
                if (source == working.id && dirty) profiles.create("${working.name} Copy", null).let { created ->
                    profiles.update(working.copy(id = created.id, name = created.name, builtin = false))
                } else profiles.duplicate(source)
            }
            JSONObject().put("created", p.id).put("profiles", profilesJson())
        }
        on("profiles.delete") { args ->
            val id = args.optString("id")
            catching { profiles.delete(id) }
            if (id == working.id) {
                working = profiles.active()
                dirty = false
                applyWorking()
                afterStateChange()
            }
            JSONObject().put("profile", profileUiJson(working)).put("profiles", profilesJson())
        }
        on("profiles.restoreDefaults") {
            profiles.restoreDefaults()
            if (working.builtin || profiles.get(working.id) == null) {
                working = profiles.get(working.id) ?: profiles.active()
                dirty = false
                applyWorking()
                afterStateChange()
            }
            log.add(EventLog.SYSTEM, "Perfis iniciais restaurados", clock.wallMs())
            JSONObject().put("profile", profileUiJson(working)).put("profiles", profilesJson())
        }
        onAsync("profiles.export") { args, reply ->
            val id = args.optString("id").ifBlank { working.id }
            val text = catching { if (id == working.id) profiles.exportJson(working) else profiles.exportJson(id) }
            val name = (profiles.get(id)?.name ?: working.name).replace(Regex("[^A-Za-z0-9 _-]"), "").trim().ifEmpty { "profile" }
            val intent = Intent(Intent.ACTION_CREATE_DOCUMENT)
                .addCategory(Intent.CATEGORY_OPENABLE)
                .setType("application/json")
                .putExtra(Intent.EXTRA_TITLE, "$name.vrbq.json")
            startForResult(intent) { code, data ->
                val uri = data?.data
                if (code != Activity.RESULT_OK || uri == null) {
                    reply.fail(CommandException("Exportação cancelada", "cancelled"))
                    return@startForResult
                }
                io.execute {
                    val error = runCatching {
                        activity.contentResolver.openOutputStream(uri, "wt")?.use { it.write(text.toByteArray(Charsets.UTF_8)) }
                            ?: throw IllegalStateException("Não foi possível abrir o arquivo escolhido")
                    }.exceptionOrNull()
                    main.post {
                        if (error == null) reply.ok(JSONObject().put("file", uri.lastPathSegment ?: "file"))
                        else reply.fail(CommandException("Falha ao exportar: ${error.message}", "io"))
                    }
                }
            }
        }
        onAsync("profiles.import") { _, reply ->
            val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
                .addCategory(Intent.CATEGORY_OPENABLE)
                .setType("*/*")
                .putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("application/json", "text/plain", "application/octet-stream"))
            startForResult(intent) { code, data ->
                val uri = data?.data
                if (code != Activity.RESULT_OK || uri == null) {
                    reply.fail(CommandException("Importação cancelada", "cancelled"))
                    return@startForResult
                }
                io.execute {
                    val result = runCatching { readLimited(uri) }
                    main.post {
                        result.fold(
                            onSuccess = { text ->
                                try {
                                    val r = profiles.importJson(text)
                                    log.add(EventLog.SYSTEM, "Perfil importado: ${r.profile.name}", clock.wallMs())
                                    reply.ok(
                                        JSONObject().put("created", r.profile.id).put("warnings", JSONArray(r.warnings)).put("profiles", profilesJson()),
                                    )
                                } catch (e: ProfileException) {
                                    reply.fail(CommandException(e.message ?: "Perfil inválido", "invalid"))
                                }
                            },
                            onFailure = { reply.fail(CommandException("Não foi possível ler o arquivo: ${it.message}", "io")) },
                        )
                    }
                }
            }
        }

        // Emulation
        on("emulation.start") {
            startEmulation()
            statusJson()
        }
        on("emulation.stop") {
            stopEmulation()
            statusJson()
        }

        // Integration + settings
        on("integration.configure") { args ->
            settings = try {
                AppSettingsCodec.merge(settings, JSONObject().put("udp", args))
            } catch (e: SettingsException) {
                throw CommandException(e.message ?: "Configuração inválida", "invalid")
            }
            saveSettings()
            if (emulationRunning) {
                if (settings.udp.enabled) streamer.start(settings.udp) else streamer.stop()
                log.add(EventLog.SYSTEM, "Saída de rede: ${if (settings.udp.enabled) "${settings.udp.host}:${settings.udp.port}" else "desligada"}", clock.wallMs())
            }
            statusDirty = true
            JSONObject().put("settings", AppSettingsCodec.encode(settings)).put("status", statusJson())
        }
        on("settings.update") { args ->
            settings = try {
                AppSettingsCodec.merge(settings, args)
            } catch (e: SettingsException) {
                throw CommandException(e.message ?: "Configuração inválida", "invalid")
            }
            onSettingsChanged()
            AppSettingsCodec.encode(settings)
        }
        on("settings.reset") {
            settings = AppSettings(lastDeviceKey = settings.lastDeviceKey)
            onSettingsChanged()
            AppSettingsCodec.encode(settings)
        }

        // Modo jogo
        on("game.openAccessibility") {
            startSafely(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
            null
        }
        on("gamepad.permission") {
            if (!VirtualGamepadManager.requestPermission()) {
                throw CommandException("O Shizuku não está ligado. Abra o Shizuku e toque em Iniciar.", "shizuku_off")
            }
            if (emulationRunning) applyVirtualGamepad()
            statusJson()
        }
        on("app.diagnostics") {
            val text = diagnosticsText()
            runCatching {
                val cm = activity.getSystemService(android.content.ClipboardManager::class.java)
                cm?.setPrimaryClip(android.content.ClipData.newPlainText("Diagnóstico VR Box → Joy-Con", text))
            }
            JSONObject().put("text", text)
        }
        on("gamepad.test") { args ->
            val on = args.optBoolean("on", true)
            if (on && (!emulationRunning || !VirtualGamepadManager.isActive)) {
                throw CommandException("Inicie a emulação primeiro.", "not_running")
            }
            setSelfTest(on)
            statusJson()
        }
        on("gamepad.retry") {
            VirtualGamepadManager.stop()
            applyVirtualGamepad()
            statusJson()
        }
        on("gamepad.openShizuku") {
            VirtualGamepadManager.openShizuku(activity)
            null
        }
        on("game.update") { args ->
            settings = settings.copy(game = GameModeCodec.decode(args, settings.game))
            onSettingsChanged()
            JSONObject().put("settings", AppSettingsCodec.encode(settings)).put("status", statusJson())
        }

        // Demo, log, stats
        on("demo.start") {
            startDemo()
            statusJson()
        }
        on("demo.stop") {
            stopDemo()
            statusJson()
        }
        on("log.clear") {
            log.clear()
            lastSentLogSeq = log.lastSeq
            null
        }
        on("stats.reset") {
            processor.stats.reset()
            statsDirty = true
            null
        }
    }

    private fun onSettingsChanged() {
        saveSettings()
        log.capacity = settings.logSize
        applyKeepScreenOn()
        updatePointerCapture()
        if (emulationRunning) applyVirtualGamepad()
        statusDirty = true
        devicesDirty = true
        scheduleFrame()
    }

    private inline fun <T> catching(block: () -> T): T = try {
        block()
    } catch (e: ProfileException) {
        throw CommandException(e.message ?: "Erro no perfil", "profile")
    }

    private fun merge(base: JSONObject, patch: JSONObject): JSONObject {
        for (k in patch.keys()) {
            val v = patch.get(k)
            if (v is JSONObject && base.optJSONObject(k) != null) merge(base.getJSONObject(k), v) else base.put(k, v)
        }
        return base
    }

    private fun readLimited(uri: Uri): String {
        val stream = activity.contentResolver.openInputStream(uri) ?: throw IllegalStateException("Não foi possível abrir o arquivo")
        stream.use {
            val bytes = it.readBytes()
            if (bytes.size > ProfileRepository.MAX_IMPORT_CHARS) throw IllegalStateException("Arquivo grande demais")
            return String(bytes, Charsets.UTF_8)
        }
    }

    private fun startSafely(intent: Intent) {
        try {
            activity.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            throw CommandException("Essa tela não existe neste celular", "unavailable")
        } catch (e: SecurityException) {
            throw CommandException("O Android não deixou abrir essa tela", "denied")
        }
    }

    @Suppress("DEPRECATION")
    private fun startForResult(intent: Intent, handler: (Int, Intent?) -> Unit) {
        val code = nextRequestCode++
        pendingResults[code] = handler
        try {
            activity.startActivityForResult(intent, code)
        } catch (e: Exception) {
            pendingResults.remove(code)
            throw CommandException("Essa ação não está disponível neste celular (${e.javaClass.simpleName})", "unavailable")
        }
    }

    // ---------------------------------------------------------------- UI push

    private fun scheduleFrame() {
        if (frameScheduled || !pageReady) return
        frameScheduled = true
        val wait = (FRAME_MS - (SystemClock.uptimeMillis() - lastFrameAt)).coerceIn(0L, FRAME_MS)
        main.postDelayed(frameRunnable, wait)
    }

    private val frameRunnable = Runnable {
        frameScheduled = false
        lastFrameAt = SystemClock.uptimeMillis()
        flush()
    }

    private fun flush() {
        if (!pageReady) return
        if (statusDirty) {
            statusDirty = false
            bridge.push("status", JSONObject().put("status", statusJson()))
        }
        if (devicesDirty) {
            devicesDirty = false
            bridge.push("devices", JSONObject().put("devices", devicesJson()))
        }
        if (identifiedDirty) {
            identifiedDirty = false
            bridge.push("identified", JSONObject().put("identified", identifiedJson()))
        }
        if (pendingDetections.isNotEmpty()) {
            for (d in pendingDetections) bridge.push("detected", JSONObject().put("detection", d))
            pendingDetections.clear()
        }
        val version = controllers.version
        val hasLogs = log.lastSeq > lastSentLogSeq
        if (version != lastSentVersion || hasLogs || physicalDirty || statsDirty) {
            bridge.push("frame", frameJson(includeEvents = true))
        }
    }

    private fun frameJson(includeEvents: Boolean): JSONObject {
        val snapshot = controllers.snapshot()
        lastSentVersion = snapshot.version
        physicalDirty = false
        val o = JSONObject()
            .put("v", JSONObject().put("left", handJson(snapshot.left)).put("right", handJson(snapshot.right)))
            .put("p", physicalJson())
        if (includeEvents) {
            o.put("events", logJson(log.since(lastSentLogSeq)))
        }
        lastSentLogSeq = log.lastSeq
        if (statsDirty || !includeEvents) {
            statsDirty = false
            o.put("stats", statsJson())
        }
        return o
    }

    private fun handJson(h: HandSnapshot): JSONObject = JSONObject()
        .put("x", round(h.stickX))
        .put("y", round(h.stickY))
        .put("rx", round(h.rawX))
        .put("ry", round(h.rawY))
        .put("trigger", round(h.trigger))
        .put("grip", round(h.grip))
        .put("buttons", JSONObject().apply { h.buttons.forEach { (k, v) -> put(k, v) } })

    private fun physicalJson(): JSONObject {
        val pressed = processor.state.pressedIds()
        val axes = JSONObject()
        val labels = JSONObject()
        pressed.forEach { labels.put(it, InputCatalog.labelOf(it)) }
        processor.state.analog.forEach { (id, v) ->
            axes.put(id, round(v))
            labels.put(id, InputCatalog.labelOf(id))
        }
        return JSONObject()
            .put("pressed", JSONArray(pressed))
            .put("axes", axes)
            .put("labels", labels)
            .put("mouse", JSONObject().put("dx", round(lastMotionDx)).put("dy", round(lastMotionDy)))
    }

    private fun statsJson(): JSONObject {
        val s = processor.stats.last
        return JSONObject()
            .put("eventsPerSec", s.eventsPerSec)
            .put("motionHz", s.motionHz)
            .put("latencyAvgMs", s.latencyAvgMs?.let { round(it) } ?: JSONObject.NULL)
            .put("latencyMaxMs", s.latencyMaxMs ?: JSONObject.NULL)
            .put("totalEvents", s.totalEvents)
            .put("simulated", demoRunning)
    }

    private fun logJson(entries: List<EventLog.Entry>): JSONArray = JSONArray().apply {
        entries.forEach { put(JSONObject().put("seq", it.seq).put("t", it.wallMs).put("c", it.category).put("m", it.text)) }
    }

    private fun infoJson(): JSONObject {
        val pm = activity.packageManager
        val pkg = runCatching {
            if (Build.VERSION.SDK_INT >= 33) pm.getPackageInfo(activity.packageName, PackageManager.PackageInfoFlags.of(0))
            else @Suppress("DEPRECATION") pm.getPackageInfo(activity.packageName, 0)
        }.getOrNull()
        return JSONObject()
            .put("app", "VR Box → Joy-Con")
            .put("version", pkg?.versionName ?: "?")
            .put("android", Build.VERSION.RELEASE)
            .put("sdk", Build.VERSION.SDK_INT)
            .put("device", "${Build.MANUFACTURER} ${Build.MODEL}")
            .put("transport", bridge.transport)
            .put("pointerCaptureSupported", true)
            .put("native", true)
    }

    private fun catalogJson(): JSONObject = JSONObject()
        .put(
            "targets",
            JSONArray().apply {
                VirtualTargets.all.forEach { t ->
                    put(
                        JSONObject()
                            .put("id", t.id)
                            .put("hand", t.hand.key)
                            .put("control", t.control)
                            .put("label", t.label)
                            .put("type", t.type.key),
                    )
                }
            },
        )
        .put(
            "buttons",
            JSONObject().put("left", JSONArray(VirtualTargets.buttonControls(Hand.LEFT))).put("right", JSONArray(VirtualTargets.buttonControls(Hand.RIGHT))),
        )

    private fun bluetoothLink(): String {
        if (!bluetooth.isSupported) return "unsupported"
        val group = registry.group(selectedKey)
        val selectedPresent = group != null
        val permitted = permissions.hasBluetooth()
        if (permitted && !bluetooth.isEnabled) return "off"
        if (selectedPresent) {
            return when (bluetooth.isBondedName(group!!.name)) {
                true -> "connected"
                false -> if (bluetooth.connectedNames().isNotEmpty()) "connected" else "not_bluetooth"
                null -> "unverified"
            }
        }
        if (!permitted) return "unknown"
        return if (bluetooth.connectedNames().isNotEmpty()) "connected" else "disconnected"
    }

    private fun statusJson(): JSONObject {
        val group = registry.lastKnown(selectedKey)
        val connected = registry.isConnected(selectedKey)
        return JSONObject()
            .put(
                "bluetooth",
                JSONObject()
                    .put("supported", bluetooth.isSupported)
                    .put("enabled", if (permissions.hasBluetooth()) bluetooth.isEnabled else JSONObject.NULL)
                    .put("permission", permissions.bluetoothState().key)
                    .put("link", bluetoothLink()),
            )
            .put(
                "controller",
                JSONObject()
                    .put("selected", group?.toJson() ?: JSONObject.NULL)
                    .put("connected", connected)
                    .put("demo", demoRunning),
            )
            .put(
                "input",
                JSONObject()
                    .put("active", readingActive())
                    .put("focused", windowFocused)
                    .put("pointerCapture", pointerCaptured)
                    .put("detecting", detecting),
            )
            .put(
                "emulation",
                JSONObject()
                    .put("running", emulationRunning)
                    .put("startedAt", if (emulationRunning) emulationStartedAt else JSONObject.NULL)
                    .put("output", if (emulationRunning && settings.udp.enabled) "udp" else "none"),
            )
            .put("left", JSONObject().put("configured", working.isConfigured(Hand.LEFT)).put("mappings", working.mappingCount(Hand.LEFT)))
            .put("right", JSONObject().put("configured", working.isConfigured(Hand.RIGHT)).put("mappings", working.mappingCount(Hand.RIGHT)))
            .put(
                "integration",
                JSONObject()
                    .put("udpEnabled", settings.udp.enabled)
                    .put("streaming", streamer.running)
                    .put("packets", streamer.packetsSent.get())
                    .put("lastError", streamer.lastError ?: JSONObject.NULL)
                    .put("target", "${settings.udp.host}:${settings.udp.port}")
                    .put("format", settings.udp.format),
            )
            .put("profile", JSONObject().put("id", working.id).put("name", working.name).put("dirty", dirty))
            .put(
                "game",
                JSONObject()
                    .put("enabled", settings.game.enabled)
                    .put("output", "gamepad")
                    .put("accessibilityAvailable", accessibilityAvailable)
                    .put("serviceEnabled", gameServiceEnabled())
                    .put("serviceConnected", GameModeBus.serviceConnected)
                    .put("readerKind", if (gameServiceEnabled()) "accessibility" else "shizuku")
                    .put("keysRead", GameModeBus.keysRead)
                    // The accessibility reader gets keys, not joystick axes: say so when the stick uses axes.
                    .put("stickUsesAxes", working.mappings.any { it.source.startsWith("axis:") && it.target.contains(".stick.") })
                    .put("selfTest", selfTestJson())
                    .put("gamepad", VirtualGamepadManager.status().let { g -> JSONObject().put("state", g.state.key).put("message", g.message).put("uid", g.uid ?: JSONObject.NULL) })
                    .put(
                        "reader",
                        VirtualGamepadManager.remote()?.let { r ->
                            JSONObject().put("reading", r.reading).put("grabbed", r.grabbed).put("nodes", r.nodes).put("events", r.events).put("error", r.error)
                                .put("found", r.found).put("foundGrabbed", r.foundGrabbed)
                        } ?: JSONObject.NULL,
                    ),
            )
            .put("identifiedCount", identified.count(identifiedKey()))
            .put("demo", demoRunning)
    }

    private fun bluetoothJson(): JSONObject {
        val bonded = bluetooth.bondedDevices()
        return JSONObject()
            .put("supported", bluetooth.isSupported)
            .put("enabled", if (permissions.hasBluetooth()) bluetooth.isEnabled else JSONObject.NULL)
            .put("permission", permissions.bluetoothState().key)
            .put("bonded", if (bonded == null) JSONObject.NULL else JSONArray().apply { bonded.forEach { put(it.toJson()) } })
    }

    private fun devicesJson(): JSONObject {
        val groups = registry.groups(includeNonCandidates = false, includeInternal = settings.showInternalDevices)
        return JSONObject()
            .put("groups", JSONArray().apply { groups.forEach { put(it.toJson().put("connected", true)) } })
            .put("selectedKey", selectedKey ?: JSONObject.NULL)
            .put("showInternal", settings.showInternalDevices)
    }

    private fun identifiedJson(): JSONObject = JSONObject()
        .put("deviceKey", identifiedKey() ?: JSONObject.NULL)
        .put(
            "inputs",
            JSONArray().apply {
                identified.list(identifiedKey()).forEach {
                    put(JSONObject().put("id", it.id).put("label", it.label).put("kind", it.kind.key).put("count", it.count).put("lastSeen", it.lastSeenWallMs))
                }
            },
        )

    private fun profilesJson(): JSONArray = JSONArray().apply {
        profiles.all.forEach { stored ->
            val p = if (stored.id == working.id) working else stored
            put(
                JSONObject()
                    .put("id", p.id)
                    .put("name", p.name)
                    .put("description", p.description)
                    .put("builtin", p.builtin)
                    .put("mappings", p.mappings.size)
                    .put("left", p.isConfigured(Hand.LEFT))
                    .put("right", p.isConfigured(Hand.RIGHT))
                    .put("active", p.id == working.id)
                    .put("dirty", p.id == working.id && dirty)
                    .put("updatedAt", p.updatedAt),
            )
        }
    }

    private fun profileUiJson(p: Profile): JSONObject {
        val o = ProfileCodec.encode(p)
        val arr = o.getJSONArray("mappings")
        for (i in 0 until arr.length()) {
            val m = arr.getJSONObject(i)
            val source = m.getString("source")
            m.put("sourceLabel", InputCatalog.labelOf(source))
            m.put("sourceKind", InputCatalog.kindOf(source)?.key)
            m.put("targetLabel", VirtualTargets.get(m.getString("target"))?.label)
        }
        o.put("dirty", dirty && p.id == working.id)
        o.put("baseName", profiles.baseOf(p).name)
        return o
    }

    /** Plain text the user pastes in a conversation: everything needed to see where it breaks. */
    private fun diagnosticsText(): String {
        val pkg = runCatching { activity.packageManager.getPackageInfo(activity.packageName, 0) }.getOrNull()
        val g = VirtualGamepadManager.status()
        val sb = StringBuilder()
        sb.appendLine("VR Box → Joy-Con ${pkg?.versionName ?: "?"} — diagnóstico")
        sb.appendLine("Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT}), ${Build.MANUFACTURER} ${Build.MODEL}")
        sb.appendLine("Shizuku: ${VirtualGamepadManager.shizukuInfo()}")
        sb.appendLine("Controle virtual: ${g.state.key}${if (g.message.isNotEmpty()) " — ${g.message}" else ""}")
        sb.appendLine("Emulação: ${if (emulationRunning) "ligada" else "parada"}, Modo jogo: ${if (settings.game.enabled) "ligado" else "desligado"}, teste: $selfTest (${selfTestEvents} sinais)")
        sb.appendLine("APK: ${if (accessibilityAvailable) "com acessibilidade" else "só Shizuku"}")
        sb.appendLine("Acessibilidade: ${if (gameServiceEnabled()) "ativada" else "desativada"}, conectada: ${GameModeBus.serviceConnected}, teclas lidas no jogo: ${GameModeBus.keysRead}")
        sb.appendLine("Controle escolhido: ${settings.lastDeviceKey ?: "nenhum"}")
        for (grp in registry.groups(includeNonCandidates = true, includeInternal = false)) {
            sb.appendLine("  • ${grp.name} %04x:%04x — ${grp.devices.joinToString { "${it.name} (0x%x)".format(it.sources) }}".format(grp.vendorId, grp.productId))
        }
        val stick = working.mappings.filter { it.target.contains(".stick") }.joinToString { "${it.source}→${it.target.substringAfter('.')}${if (it.invert) "(inv)" else ""}" }
        sb.appendLine("Perfil: ${working.name}, ${working.mappings.size} regras; joystick: ${stick.ifEmpty { "nenhuma" }}")
        sb.appendLine("Scan codes: ${scanCodes.entries.take(20).joinToString { "${it.key}=${it.value}" }.ifEmpty { "nenhum" }}")
        sb.appendLine("Serviço: ${VirtualGamepadManager.diagnose()}")
        sb.appendLine("Últimos eventos:")
        for (e in log.recent(15)) sb.appendLine("  ${e.category}: ${e.text}")
        return sb.toString()
    }

    private fun round(v: Float): Double = (v * 10000f).roundToInt() / 10000.0

    companion object {
        private const val TAG = "VRBQ"
        const val TICK_MS = 8L
        private val INTERNAL_HINTS = listOf("gpio", "pon", "keypad", "touch", "power", "volume", "hall", "sensor", "fingerprint", "qwerty", "virtual", "headset", "hdmi")
        const val FRAME_MS = 16L
    }
}
