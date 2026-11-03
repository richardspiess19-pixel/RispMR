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

    @Volatile var serviceConnected = false
        private set

    /** Latest settings and profile (the edited copy) pushed by the app screen. */
    @Volatile var settings: AppSettings? = null
        private set
    @Volatile var profile: Profile? = null
        private set

    @Volatile var touchesPerformed = 0L

    private val configListeners = CopyOnWriteArraySet<() -> Unit>()
    private val stateListeners = CopyOnWriteArraySet<() -> Unit>()

    fun publish(settings: AppSettings, profile: Profile) {
        this.settings = settings
        this.profile = profile
        configListeners.forEach { it() }
    }

    fun setUiResumed(value: Boolean) {
        if (uiResumed == value) return
        uiResumed = value
        stateListeners.forEach { it() }
    }

    fun setEmulationActive(value: Boolean) {
        if (emulationActive == value) return
        emulationActive = value
        stateListeners.forEach { it() }
    }

    fun setServiceConnected(value: Boolean) {
        if (serviceConnected == value) return
        serviceConnected = value
        stateListeners.forEach { it() }
    }

    fun onConfig(listener: () -> Unit) = configListeners.add(listener)
    fun offConfig(listener: () -> Unit) = configListeners.remove(listener)
    fun onState(listener: () -> Unit) = stateListeners.add(listener)
    fun offState(listener: () -> Unit) = stateListeners.remove(listener)
}
