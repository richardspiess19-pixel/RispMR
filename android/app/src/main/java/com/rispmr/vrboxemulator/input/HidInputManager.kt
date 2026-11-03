package com.rispmr.vrboxemulator.input

import android.content.Context
import android.hardware.input.InputManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.view.InputDevice
import android.view.KeyEvent
import com.rispmr.vrboxemulator.engine.InputDeviceInfo
import com.rispmr.vrboxemulator.engine.VirtualGamepad

/**
 * Enumerates input devices through the public [InputManager] API.
 *
 * Android does not give regular apps raw HID reports of Bluetooth devices; it parses them in
 * the system and delivers KeyEvent/MotionEvent objects to the focused window. This class
 * reports how each device is presented (mouse, keyboard, gamepad...) and notifies device
 * additions / removals, which is how disconnections and reconnections are detected.
 * No permission is needed for any of this.
 */
class HidInputManager(context: Context) {
    private val inputManager = context.getSystemService(Context.INPUT_SERVICE) as InputManager
    private var listener: InputManager.InputDeviceListener? = null

    fun listDevices(): List<InputDeviceInfo> = InputDevice.getDeviceIds().toList().mapNotNull { id -> InputDevice.getDevice(id)?.let { describe(it) } }

    fun describe(id: Int): InputDeviceInfo? = InputDevice.getDevice(id)?.let { describe(it) }

    fun start(onAdded: (Int) -> Unit, onRemoved: (Int) -> Unit, onChanged: (Int) -> Unit) {
        stop()
        val l = object : InputManager.InputDeviceListener {
            override fun onInputDeviceAdded(deviceId: Int) = onAdded(deviceId)
            override fun onInputDeviceRemoved(deviceId: Int) = onRemoved(deviceId)
            override fun onInputDeviceChanged(deviceId: Int) = onChanged(deviceId)
        }
        inputManager.registerInputDeviceListener(l, Handler(Looper.getMainLooper()))
        listener = l
    }

    fun stop() {
        listener?.let { inputManager.unregisterInputDeviceListener(it) }
        listener = null
    }

    companion object {
        /** Keys whose presence is queried with `InputDevice.hasKeys` (declared by the key layout). */
        private val CANDIDATE_KEYS = intArrayOf(
            KeyEvent.KEYCODE_BUTTON_A, KeyEvent.KEYCODE_BUTTON_B, KeyEvent.KEYCODE_BUTTON_C,
            KeyEvent.KEYCODE_BUTTON_X, KeyEvent.KEYCODE_BUTTON_Y, KeyEvent.KEYCODE_BUTTON_Z,
            KeyEvent.KEYCODE_BUTTON_L1, KeyEvent.KEYCODE_BUTTON_R1, KeyEvent.KEYCODE_BUTTON_L2, KeyEvent.KEYCODE_BUTTON_R2,
            KeyEvent.KEYCODE_BUTTON_THUMBL, KeyEvent.KEYCODE_BUTTON_THUMBR,
            KeyEvent.KEYCODE_BUTTON_START, KeyEvent.KEYCODE_BUTTON_SELECT, KeyEvent.KEYCODE_BUTTON_MODE,
            KeyEvent.KEYCODE_BUTTON_1, KeyEvent.KEYCODE_BUTTON_2, KeyEvent.KEYCODE_BUTTON_3, KeyEvent.KEYCODE_BUTTON_4,
            KeyEvent.KEYCODE_BUTTON_5, KeyEvent.KEYCODE_BUTTON_6, KeyEvent.KEYCODE_BUTTON_7, KeyEvent.KEYCODE_BUTTON_8,
            KeyEvent.KEYCODE_DPAD_UP, KeyEvent.KEYCODE_DPAD_DOWN, KeyEvent.KEYCODE_DPAD_LEFT, KeyEvent.KEYCODE_DPAD_RIGHT,
            KeyEvent.KEYCODE_DPAD_CENTER,
            KeyEvent.KEYCODE_VOLUME_UP, KeyEvent.KEYCODE_VOLUME_DOWN,
            KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE, KeyEvent.KEYCODE_MEDIA_NEXT, KeyEvent.KEYCODE_MEDIA_PREVIOUS,
            KeyEvent.KEYCODE_ENTER, KeyEvent.KEYCODE_BACK, KeyEvent.KEYCODE_ESCAPE, KeyEvent.KEYCODE_SPACE,
        )

        fun describe(d: InputDevice): InputDeviceInfo {
            val axes = d.motionRanges.map { AndroidInputTranslator.axisName(it.axis) }.distinct()
            val has = try {
                d.hasKeys(*CANDIDATE_KEYS)
            } catch (e: Exception) {
                BooleanArray(CANDIDATE_KEYS.size)
            }
            val keys = CANDIDATE_KEYS.filterIndexed { i, _ -> has.getOrElse(i) { false } }.map { AndroidInputTranslator.keyName(it) }
            return InputDeviceInfo(
                id = d.id,
                name = d.name ?: "Unknown device",
                descriptor = d.descriptor ?: "",
                vendorId = d.vendorId,
                productId = d.productId,
                sources = d.sources,
                keyboardType = d.keyboardType,
                isExternal = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) d.isExternal else null,
                // Our own virtual gamepad is never read back as a controller.
                isVirtual = d.isVirtual || VirtualGamepad.isOwn(d.vendorId, d.productId, d.name),
                controllerNumber = d.controllerNumber,
                axes = axes,
                declaredKeys = keys,
            )
        }
    }
}
