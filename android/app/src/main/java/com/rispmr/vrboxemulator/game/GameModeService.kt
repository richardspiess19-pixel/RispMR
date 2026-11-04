package com.rispmr.vrboxemulator.game

import android.accessibilityservice.AccessibilityService
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.view.InputDevice
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.accessibility.AccessibilityEvent
import com.rispmr.vrboxemulator.engine.AppSettings
import com.rispmr.vrboxemulator.engine.AppSettingsCodec
import com.rispmr.vrboxemulator.engine.BackgroundEngine
import com.rispmr.vrboxemulator.engine.Clock
import com.rispmr.vrboxemulator.engine.DefaultProfiles
import com.rispmr.vrboxemulator.engine.DeviceClassifier
import com.rispmr.vrboxemulator.engine.DeviceGroup
import com.rispmr.vrboxemulator.engine.DeviceIdentity
import com.rispmr.vrboxemulator.engine.FileTextStorage
import com.rispmr.vrboxemulator.engine.Profile
import com.rispmr.vrboxemulator.engine.ProfileRepository
import com.rispmr.vrboxemulator.engine.RawEvent
import com.rispmr.vrboxemulator.engine.SourceIds
import com.rispmr.vrboxemulator.gamepad.VirtualGamepadManager
import com.rispmr.vrboxemulator.input.AndroidInputTranslator
import com.rispmr.vrboxemulator.input.HidInputManager
import java.io.File

/**
 * Modo jogo reader. While a game is open, Android only hands the VR Box keys to another app
 * through an Accessibility Service the user turns on. This service takes the keys of the chosen
 * VR Box (every interface of it), runs them through the same mapping as the app and sends the
 * result to the virtual gamepad (Shizuku). The game never gets the original keys.
 *
 * Mouse motion (VR Box in mouse mode) is read too on Android 14+. Joystick motion is not
 * intercepted: Android would also swallow the sticks of the virtual gamepad.
 *
 * It ignores every other input device, never reads screen content and stores nothing.
 */
class GameModeService : AccessibilityService() {
    private val main = Handler(Looper.getMainLooper())
    private val clock = object : Clock {
        override fun uptimeMs() = SystemClock.uptimeMillis()
        override fun wallMs() = System.currentTimeMillis()
    }
    private val engine = BackgroundEngine(clock)
    private val translator = AndroidInputTranslator()
    private val buffer = ArrayList<RawEvent>(8)

    private var settings = AppSettings()
    private var profile: Profile? = null
    private var usedKeys: Set<String> = emptySet()
    private var usesMouse = false
    private var motionSourcesOn = false
    private var tickScheduled = false
    private var wasActive = false

    private val onConfig: () -> Unit = { main.post { reload() } }
    private val onState: () -> Unit = { main.post { applyState() } }

    override fun onServiceConnected() {
        VirtualGamepadManager.init(this)
        GameModeBus.onConfig(onConfig)
        GameModeBus.onState(onState)
        VirtualGamepadManager.addListener(onState)
        reload()
        GameModeBus.setServiceConnected(true)
    }

    override fun onDestroy() {
        GameModeBus.offConfig(onConfig)
        GameModeBus.offState(onState)
        VirtualGamepadManager.removeListener(onState)
        GameModeBus.setServiceConnected(false)
        super.onDestroy()
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) = Unit

    override fun onInterrupt() {
        engine.releaseAll()
        send()
    }

    private val active: Boolean
        get() = GameModeBus.emulationActive && (!GameModeBus.uiResumed || GameModeBus.selfTest) &&
            settings.game.enabled && profile != null && VirtualGamepadManager.isActive

    override fun onKeyEvent(event: KeyEvent): Boolean {
        if (!active) return false
        val deviceKey = acceptDevice(event.deviceId) ?: return false
        val id = SourceIds.key(AndroidInputTranslator.keyName(event.keyCode))
        if (id !in usedKeys) return false // not mapped: the game receives the key normally
        buffer.clear()
        translator.translateKey(event, deviceKey, buffer)
        if (buffer.isNotEmpty()) GameModeBus.keysRead++
        process()
        return true
    }

    override fun onMotionEvent(event: MotionEvent) {
        if (!active) return
        val deviceKey = acceptDevice(event.deviceId) ?: return
        buffer.clear()
        translator.translateMotion(event, deviceKey, captured = false, out = buffer)
        process()
    }

    private fun process() {
        if (engine.process(buffer)) send()
        scheduleTick()
    }

    private fun send() = VirtualGamepadManager.sendReport(engine.report())

    private val tick = Runnable {
        tickScheduled = false
        if (engine.tick(clock.uptimeMs())) send()
        scheduleTick()
    }

    private fun scheduleTick() {
        if (tickScheduled || !engine.needsTick()) return
        tickScheduled = true
        main.postDelayed(tick, 8)
    }

    /** Reads settings and profile pushed by the app, or from disk when the app is closed. */
    private fun reload() {
        settings = GameModeBus.settings ?: AppSettingsCodec.decode(runCatching { File(filesDir, "settings.json").readText() }.getOrNull())
        profile = GameModeBus.profile ?: loadSavedProfile()
        val p = profile
        if (p != null) {
            engine.configure(p)
            usedKeys = p.mappings.map { it.source }.filter { it.startsWith("key:") }.toSet()
            usesMouse = p.mappings.any { it.source.startsWith("mouse:") }
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

    /** Mouse motion is only intercepted while Modo jogo is active (Android 14+). */
    private fun applyState() {
        val on = active
        val wantMotion = on && usesMouse
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE && wantMotion != motionSourcesOn) {
            val info = serviceInfo
            if (info != null) {
                info.motionEventSources = if (wantMotion) InputDevice.SOURCE_MOUSE else 0
                serviceInfo = info
                motionSourcesOn = wantMotion
            }
        }
        if (wasActive && !on) {
            engine.releaseAll()
            send()
        }
        wasActive = on
    }

    /** deviceId -> controller key (or "" for devices that are never read). Ids change on reconnection. */
    private val deviceCache = HashMap<Int, String>()

    private fun acceptDevice(deviceId: Int): String? {
        val key = deviceCache.getOrPut(deviceId) {
            val device = InputDevice.getDevice(deviceId) ?: return null
            val info = HidInputManager.describe(device)
            if (info.isVirtual || info.isExternal == false || !DeviceClassifier.isInputCandidate(info.sources)) "" else DeviceGroup.keyOf(info)
        }
        if (key.isEmpty()) return null
        val selected = DeviceIdentity.fromKey(settings.lastDeviceKey)?.let { DeviceGroup.keyOf(DeviceGroup.baseName(it.name), it.vendorId, it.productId) }
        return if (selected == null || selected == key || !settings.selectedDeviceOnly) key else null
    }
}
