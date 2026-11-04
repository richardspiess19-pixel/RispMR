package com.rispmr.vrboxemulator.game

import com.rispmr.vrboxemulator.engine.AppSettings
import com.rispmr.vrboxemulator.engine.Profile
import java.util.concurrent.CopyOnWriteArraySet

/**
 * Shared state between the app screen (AppController) and the accessibility service, which
 * run in the same process. Everything is touched on the main thread.
 */
object GameModeBus {
    /** The app screen is in the foreground: it reads the controller itself. */
    @Volatile var uiResumed = false
        private set

    /** The user pressed "Iniciar emulação". */
    @Volatile var emulationActive = false
        private set

    /** "Testar o que o jogo recebe": the service reads the VR Box even with the app on screen. */
    @Volatile var selfTest = false
        private set

    @Volatile var serviceConnected = false
        private set

    /** Latest settings and profile (the edited copy) pushed by the app screen. */
    @Volatile var settings: AppSettings? = null
        private set
    @Volatile var profile: Profile? = null
        private set

    /** VR Box keys the service turned into the virtual gamepad (diagnostics). */
    @Volatile var keysRead = 0L

    private val configListeners = CopyOnWriteArraySet<() -> Unit>()
    private val stateListeners = CopyOnWriteArraySet<() -> Unit>()

    fun publish(settings: AppSettings, profile: Profile) {
        this.settings = settings
        this.profile = profile
        configListeners.forEach { it() }
    }

    fun setUiResumed(value: Boolean) = set(uiResumed != value) { uiResumed = value }

    fun setEmulationActive(value: Boolean) = set(emulationActive != value) { emulationActive = value }

    fun setSelfTest(value: Boolean) = set(selfTest != value) { selfTest = value }

    fun setServiceConnected(value: Boolean) = set(serviceConnected != value) { serviceConnected = value }

    /** Something else changed that the service must look at again (e.g. the virtual gamepad). */
    fun stateChanged() = stateListeners.forEach { it() }

    private inline fun set(changed: Boolean, block: () -> Unit) {
        if (!changed) return
        block()
        stateListeners.forEach { it() }
    }

    fun onConfig(listener: () -> Unit) = configListeners.add(listener)
    fun offConfig(listener: () -> Unit) = configListeners.remove(listener)
    fun onState(listener: () -> Unit) = stateListeners.add(listener)
    fun offState(listener: () -> Unit) = stateListeners.remove(listener)
}
