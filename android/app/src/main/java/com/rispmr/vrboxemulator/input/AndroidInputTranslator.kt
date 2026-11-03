package com.rispmr.vrboxemulator.input

import android.util.SparseArray
import android.util.SparseIntArray
import android.view.InputDevice
import android.view.KeyEvent
import android.view.MotionEvent
import com.rispmr.vrboxemulator.engine.RawEvent
import com.rispmr.vrboxemulator.engine.SourceIds

/**
 * Converts Android [KeyEvent] / [MotionEvent] objects into engine [RawEvent]s.
 *
 * It does not assume how a VR Box presents itself: keys, gamepad buttons, mouse buttons,
 * relative/absolute mouse movement, wheel and joystick axes are all handled generically.
 */
class AndroidInputTranslator {
    private val mouseButtons = SparseIntArray()
    private val lastPointer = SparseArray<FloatArray>()

    fun translateKey(event: KeyEvent, deviceKey: String, out: MutableList<RawEvent>) {
        val down = when (event.action) {
            KeyEvent.ACTION_DOWN -> true
            KeyEvent.ACTION_UP -> false
            else -> return
        }
        if (down && event.repeatCount > 0) return // auto-repeat: already pressed
        if (event.keyCode == KeyEvent.KEYCODE_UNKNOWN) return
        out += RawEvent.Button(deviceKey, SourceIds.key(keyName(event.keyCode)), down, event.eventTime)
    }

    /**
     * @param captured true when the event comes from Android pointer capture (relative deltas).
     */
    fun translateMotion(event: MotionEvent, deviceKey: String, captured: Boolean, out: MutableList<RawEvent>) {
        when {
            event.isFromSource(InputDevice.SOURCE_JOYSTICK) || event.isFromSource(InputDevice.SOURCE_GAMEPAD) -> {
                if (event.actionMasked == MotionEvent.ACTION_MOVE) translateAxes(event, deviceKey, out)
            }
            captured || event.isFromSource(InputDevice.SOURCE_MOUSE) || event.isFromSource(InputDevice.SOURCE_MOUSE_RELATIVE) -> {
                translateMouse(event, deviceKey, captured, out)
            }
        }
    }

    private fun translateAxes(event: MotionEvent, deviceKey: String, out: MutableList<RawEvent>) {
        val device = event.device ?: return
        val seen = HashSet<Int>()
        for (range in device.motionRanges) {
            if (!range.isFromSource(InputDevice.SOURCE_JOYSTICK) && !range.isFromSource(InputDevice.SOURCE_GAMEPAD)) continue
            if (!seen.add(range.axis)) continue
            val value = event.getAxisValue(range.axis)
            out += RawEvent.Axis(deviceKey, SourceIds.axis(axisName(range.axis)), value, event.eventTime)
        }
    }

    private fun translateMouse(event: MotionEvent, deviceKey: String, captured: Boolean, out: MutableList<RawEvent>) {
        val id = event.deviceId
        // Buttons: compare the button state bitmask with the previous one. This works for
        // hover, "touch-like" mouse streams and captured pointer events alike.
        val newButtons = if (event.actionMasked == MotionEvent.ACTION_CANCEL) 0 else event.buttonState
        val oldButtons = mouseButtons.get(id, 0)
        if (newButtons != oldButtons) {
            for ((bit, name) in BUTTONS) {
                val was = oldButtons and bit != 0
                val now = newButtons and bit != 0
                if (was != now) out += RawEvent.Button(deviceKey, SourceIds.mouseButton(name), now, event.eventTime)
            }
            mouseButtons.put(id, newButtons)
        }

        if (event.actionMasked == MotionEvent.ACTION_SCROLL) {
            val v = event.getAxisValue(MotionEvent.AXIS_VSCROLL)
            val h = event.getAxisValue(MotionEvent.AXIS_HSCROLL)
            if (v > 0f) out += RawEvent.Pulse(deviceKey, SourceIds.wheel("up"), event.eventTime)
            if (v < 0f) out += RawEvent.Pulse(deviceKey, SourceIds.wheel("down"), event.eventTime)
            if (h > 0f) out += RawEvent.Pulse(deviceKey, SourceIds.wheel("right"), event.eventTime)
            if (h < 0f) out += RawEvent.Pulse(deviceKey, SourceIds.wheel("left"), event.eventTime)
            return
        }

        val samples = event.historySize + 1
        var dx = 0f
        var dy = 0f
        if (captured) {
            // Pointer capture: X/Y already contain relative movement.
            for (h in 0 until event.historySize) {
                dx += event.getHistoricalX(h)
                dy += event.getHistoricalY(h)
            }
            dx += event.x
            dy += event.y
        } else {
            var rx = 0f
            var ry = 0f
            for (h in 0 until event.historySize) {
                rx += event.getHistoricalAxisValue(MotionEvent.AXIS_RELATIVE_X, h)
                ry += event.getHistoricalAxisValue(MotionEvent.AXIS_RELATIVE_Y, h)
            }
            rx += event.getAxisValue(MotionEvent.AXIS_RELATIVE_X)
            ry += event.getAxisValue(MotionEvent.AXIS_RELATIVE_Y)
            val last = lastPointer.get(id)
            if (rx != 0f || ry != 0f) {
                dx = rx
                dy = ry
            } else if (last != null && event.actionMasked != MotionEvent.ACTION_HOVER_ENTER) {
                // Fallback: absolute cursor position difference (stops at screen edges).
                dx = event.x - last[0]
                dy = event.y - last[1]
            }
            lastPointer.put(id, floatArrayOf(event.x, event.y))
        }
        if (dx != 0f || dy != 0f) out += RawEvent.Motion(deviceKey, dx, dy, event.eventTime, samples)
    }

    /** Forgets per-device state (device removed / released). */
    fun reset(deviceId: Int? = null) {
        if (deviceId == null) {
            mouseButtons.clear()
            lastPointer.clear()
        } else {
            mouseButtons.delete(deviceId)
            lastPointer.remove(deviceId)
        }
    }

    companion object {
        private val BUTTONS = listOf(
            MotionEvent.BUTTON_PRIMARY to "primary",
            MotionEvent.BUTTON_SECONDARY to "secondary",
            MotionEvent.BUTTON_TERTIARY to "tertiary",
            MotionEvent.BUTTON_BACK to "back",
            MotionEvent.BUTTON_FORWARD to "forward",
        )

        /**
         * Android name of a key code ("BUTTON_A"). Some environments (old ROMs, Robolectric)
         * return only the number from `keyCodeToString`; a table of the codes relevant for
         * controllers keeps the identifiers stable in that case.
         */
        fun keyName(keyCode: Int): String {
            val name = KeyEvent.keyCodeToString(keyCode).removePrefix("KEYCODE_")
            return if (name.all { it.isDigit() }) KEY_FALLBACK[keyCode] ?: name else name
        }

        fun axisName(axis: Int): String {
            val name = MotionEvent.axisToString(axis).removePrefix("AXIS_")
            return if (name.all { it.isDigit() }) AXIS_FALLBACK[axis] ?: name else name
        }

        private val KEY_FALLBACK: Map<Int, String> = buildMap {
            put(KeyEvent.KEYCODE_BUTTON_A, "BUTTON_A"); put(KeyEvent.KEYCODE_BUTTON_B, "BUTTON_B"); put(KeyEvent.KEYCODE_BUTTON_C, "BUTTON_C")
            put(KeyEvent.KEYCODE_BUTTON_X, "BUTTON_X"); put(KeyEvent.KEYCODE_BUTTON_Y, "BUTTON_Y"); put(KeyEvent.KEYCODE_BUTTON_Z, "BUTTON_Z")
            put(KeyEvent.KEYCODE_BUTTON_L1, "BUTTON_L1"); put(KeyEvent.KEYCODE_BUTTON_R1, "BUTTON_R1")
            put(KeyEvent.KEYCODE_BUTTON_L2, "BUTTON_L2"); put(KeyEvent.KEYCODE_BUTTON_R2, "BUTTON_R2")
            put(KeyEvent.KEYCODE_BUTTON_THUMBL, "BUTTON_THUMBL"); put(KeyEvent.KEYCODE_BUTTON_THUMBR, "BUTTON_THUMBR")
            put(KeyEvent.KEYCODE_BUTTON_START, "BUTTON_START"); put(KeyEvent.KEYCODE_BUTTON_SELECT, "BUTTON_SELECT"); put(KeyEvent.KEYCODE_BUTTON_MODE, "BUTTON_MODE")
            for (i in 1..16) put(KeyEvent.KEYCODE_BUTTON_1 + i - 1, "BUTTON_$i")
            put(KeyEvent.KEYCODE_DPAD_UP, "DPAD_UP"); put(KeyEvent.KEYCODE_DPAD_DOWN, "DPAD_DOWN"); put(KeyEvent.KEYCODE_DPAD_LEFT, "DPAD_LEFT")
            put(KeyEvent.KEYCODE_DPAD_RIGHT, "DPAD_RIGHT"); put(KeyEvent.KEYCODE_DPAD_CENTER, "DPAD_CENTER")
            put(KeyEvent.KEYCODE_VOLUME_UP, "VOLUME_UP"); put(KeyEvent.KEYCODE_VOLUME_DOWN, "VOLUME_DOWN"); put(KeyEvent.KEYCODE_VOLUME_MUTE, "VOLUME_MUTE")
            put(KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE, "MEDIA_PLAY_PAUSE"); put(KeyEvent.KEYCODE_MEDIA_NEXT, "MEDIA_NEXT"); put(KeyEvent.KEYCODE_MEDIA_PREVIOUS, "MEDIA_PREVIOUS")
            put(KeyEvent.KEYCODE_MEDIA_PLAY, "MEDIA_PLAY"); put(KeyEvent.KEYCODE_MEDIA_PAUSE, "MEDIA_PAUSE"); put(KeyEvent.KEYCODE_MEDIA_STOP, "MEDIA_STOP")
            put(KeyEvent.KEYCODE_ENTER, "ENTER"); put(KeyEvent.KEYCODE_BACK, "BACK"); put(KeyEvent.KEYCODE_ESCAPE, "ESCAPE"); put(KeyEvent.KEYCODE_SPACE, "SPACE")
            put(KeyEvent.KEYCODE_PAGE_UP, "PAGE_UP"); put(KeyEvent.KEYCODE_PAGE_DOWN, "PAGE_DOWN"); put(KeyEvent.KEYCODE_MENU, "MENU")
        }

        private val AXIS_FALLBACK: Map<Int, String> = mapOf(
            MotionEvent.AXIS_X to "X", MotionEvent.AXIS_Y to "Y", MotionEvent.AXIS_Z to "Z",
            MotionEvent.AXIS_RX to "RX", MotionEvent.AXIS_RY to "RY", MotionEvent.AXIS_RZ to "RZ",
            MotionEvent.AXIS_HAT_X to "HAT_X", MotionEvent.AXIS_HAT_Y to "HAT_Y",
            MotionEvent.AXIS_LTRIGGER to "LTRIGGER", MotionEvent.AXIS_RTRIGGER to "RTRIGGER",
            MotionEvent.AXIS_GAS to "GAS", MotionEvent.AXIS_BRAKE to "BRAKE",
            MotionEvent.AXIS_THROTTLE to "THROTTLE", MotionEvent.AXIS_RUDDER to "RUDDER", MotionEvent.AXIS_WHEEL to "WHEEL",
            MotionEvent.AXIS_VSCROLL to "VSCROLL", MotionEvent.AXIS_HSCROLL to "HSCROLL",
            MotionEvent.AXIS_RELATIVE_X to "RELATIVE_X", MotionEvent.AXIS_RELATIVE_Y to "RELATIVE_Y",
        )
    }
}
