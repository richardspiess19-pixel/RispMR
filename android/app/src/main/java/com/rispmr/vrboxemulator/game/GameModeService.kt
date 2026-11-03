package com.rispmr.vrboxemulator.game

import android.accessibilityservice.AccessibilityService
import android.content.Context
import android.graphics.Point
import android.hardware.display.DisplayManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.view.Display
import android.view.InputDevice
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.accessibility.AccessibilityEvent
import com.rispmr.vrboxemulator.engine.AppSettings
import com.rispmr.vrboxemulator.engine.AppSettingsCodec
import com.rispmr.vrboxemulator.engine.Clock
import com.rispmr.vrboxemulator.engine.DefaultProfiles
import com.rispmr.vrboxemulator.engine.DeviceClassifier
import com.rispmr.vrboxemulator.engine.DeviceGroup
import com.rispmr.vrboxemulator.engine.EventLog
import com.rispmr.vrboxemulator.engine.FileTextStorage
import com.rispmr.vrboxemulator.engine.InputProcessor
import com.rispmr.vrboxemulator.engine.Profile
import com.rispmr.vrboxemulator.engine.ProfileRepository
import com.rispmr.vrboxemulator.engine.RawEvent
import com.rispmr.vrboxemulator.engine.SourceIds
import com.rispmr.vrboxemulator.engine.TouchPlanner
import com.rispmr.vrboxemulator.engine.VirtualControllerManager
import com.rispmr.vrboxemulator.input.AndroidInputTranslator
import com.rispmr.vrboxemulator.input.HidInputManager
import java.io.File

/**
 * Modo jogo. While a game is open, reads the VR Box buttons (and, on Android 14+, its
 * joystick axes), runs them through the same mapping as the app and touches the game screen.
 *
 * Android only lets a regular app do this through an Accessibility Service the user turns on.
 * The service ignores every other input device, never reads screen content and stores nothing.
 */
class GameModeService : AccessibilityService() {
    private val main = Handler(Looper.getMainLooper())
    private val clock = object : Clock {
        override fun uptimeMs() = SystemClock.uptimeMillis()
        override fun wallMs() = System.currentTimeMillis()
    }
    private val controllers = VirtualControllerManager()
    private val processor = InputProcessor(controllers, EventLog(EventLog.MIN_CAPACITY), clock)
    private val translator = AndroidInputTranslator()
    private val planner = TouchPlanner()
    private val buffer = ArrayList<RawEvent>(8)
    private lateinit var composer: GestureComposer

    private var settings = AppSettings()
    private var profile: Profile? = null
    private var usedKeys: Set<String> = emptySet()
    private var usesAxes = false
    private var motionSourcesOn = false
    private var tickScheduled = false

    private val onConfig: () -> Unit = { main.post { reload() } }
    private val onState: () -> Unit = { main.post { applyState() } }

    override fun onServiceConnected() {
        composer = GestureComposer(main) { gesture, callback, handler -> dispatchGesture(gesture, callback, handler) }
        composer.onGesture = { GameModeBus.touchesPerformed++ }
        GameModeBus.onConfig(onConfig)
        GameModeBus.onState(onState)
        reload()
        GameModeBus.setServiceConnected(true)
    }

    override fun onDestroy() {
        GameModeBus.offConfig(onConfig)
        GameModeBus.offState(onState)
        GameModeBus.setServiceConnected(false)
        if (::composer.isInitialized) composer.releaseAll()
        super.onDestroy()
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) = Unit

    override fun onInterrupt() {
        processor.releaseAll(null)
        if (::composer.isInitialized) composer.releaseAll()
    }

    private val active: Boolean
        get() = GameModeBus.emulationActive && !GameModeBus.uiResumed && settings.game.enabled && profile != null

    override fun onKeyEvent(event: KeyEvent): Boolean {
        if (!active) return false
        val deviceKey = acceptDevice(event.deviceId) ?: return false
        val id = SourceIds.key(AndroidInputTranslator.keyName(event.keyCode))
        if (id !in usedKeys) return false // not mapped: the game receives the key normally
        buffer.clear()
        translator.translateKey(event, deviceKey, buffer)
        dispatch()
        return true
    }

    override fun onMotionEvent(event: MotionEvent) {
        if (!active) return
        val deviceKey = acceptDevice(event.deviceId) ?: return
        buffer.clear()
        translator.translateMotion(event, deviceKey, captured = false, out = buffer)
        dispatch()
    }

    private fun dispatch() {
        var changed = false
        for (e in buffer) if (processor.process(e)) changed = true
        if (changed) plan()
        scheduleTick()
    }

    private fun plan() {
        val p = profile ?: return
        val size = screenSize()
        val aspect = if (size.y > 0) size.x.toFloat() / size.y else 1f
        composer.update(planner.plan(controllers.snapshot(), settings.game, p.buttons.analogThreshold, aspect), size.x, size.y)
    }

    private val tick = Runnable {
        tickScheduled = false
        val now = clock.uptimeMs()
        var changed = processor.tick(now)
        if (controllers.tick(now)) changed = true
        if (changed) plan()
        scheduleTick()
    }

    private fun scheduleTick() {
        if (tickScheduled) return
        if (controllers.needsTick() || processor.needsTick()) {
            tickScheduled = true
            main.postDelayed(tick, 16)
        }
    }

    /** Reads settings and profile pushed by the app, or from disk when the app is closed. */
    private fun reload() {
        settings = GameModeBus.settings ?: AppSettingsCodec.decode(runCatching { File(filesDir, "settings.json").readText() }.getOrNull())
        profile = GameModeBus.profile ?: loadSavedProfile()
        val p = profile
        if (p != null) {
            controllers.configure(p.mappings, p.buttons, p.left, p.right)
            usedKeys = p.mappings.map { it.source }.filter { it.startsWith("key:") }.toSet()
            usesAxes = p.mappings.any { it.source.startsWith("axis:") }
        }
        applyState()
    }

    private fun loadSavedProfile(): Profile? = runCatching {
        val defaults = DefaultProfiles.parse(
            assets.open("config/default-profile.json").bufferedReader().use { it.readText() },
            assets.open("config/controller-profiles.json").bufferedReader().use { it.readText() },
        )
        // Read-only: the service never writes the profile file.
        ProfileRepository(FileTextStorage(File(filesDir, "profiles.json")), defaults, persist = {}).apply { load() }.active()
    }.getOrNull()

    /** Joystick motion is only intercepted while Modo jogo is active (Android 14+). */
    private fun applyState() {
        val wantMotion = active && usesAxes
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE && wantMotion != motionSourcesOn) {
            val info = serviceInfo
            if (info != null) {
                info.motionEventSources = if (wantMotion) InputDevice.SOURCE_JOYSTICK else 0
                serviceInfo = info
                motionSourcesOn = wantMotion
            }
        }
        if (!active) {
            processor.releaseAll(null)
            planner.reset()
            if (::composer.isInitialized) composer.releaseAll()
        }
    }

    /** deviceId -> group key (or "" for devices that are never read). Ids change on reconnection. */
    private val deviceCache = HashMap<Int, String>()

    private fun acceptDevice(deviceId: Int): String? {
        val key = deviceCache.getOrPut(deviceId) {
            val device = InputDevice.getDevice(deviceId) ?: return null
            val info = HidInputManager.describe(device)
            if (info.isVirtual || info.isExternal == false || !DeviceClassifier.isInputCandidate(info.sources)) "" else DeviceGroup.keyOf(info)
        }
        if (key.isEmpty()) return null
        val selected = settings.lastDeviceKey
        return if (selected == null || selected == key || !settings.selectedDeviceOnly) key else null
    }

    @Suppress("DEPRECATION")
    private fun screenSize(): Point {
        val display = (getSystemService(Context.DISPLAY_SERVICE) as DisplayManager).getDisplay(Display.DEFAULT_DISPLAY)
        return Point().also { display.getRealSize(it) }
    }
}
