package com.rispmr.vrboxemulator.input

import android.os.SystemClock
import android.view.InputDevice
import android.view.KeyEvent
import android.view.MotionEvent
import com.rispmr.vrboxemulator.bluetooth.BluetoothClassDecoder
import com.rispmr.vrboxemulator.demo.DemoScript
import com.rispmr.vrboxemulator.engine.RawEvent
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/** HID reading: Android KeyEvent / MotionEvent -> engine RawEvent (runs on Robolectric). */
@RunWith(RobolectricTestRunner::class)
class AndroidInputTranslatorTest {
    private val t = AndroidInputTranslator()
    private val out = ArrayList<RawEvent>()

    private fun key(action: Int, code: Int, repeat: Int = 0) =
        KeyEvent(100L, 120L, action, code, repeat, 0, 5, 0, 0, InputDevice.SOURCE_GAMEPAD)

    @Test
    fun keyEventsBecomeButtons() {
        t.translateKey(key(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_BUTTON_A), "vr", out)
        t.translateKey(key(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_BUTTON_A, repeat = 1), "vr", out)
        t.translateKey(key(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_BUTTON_A), "vr", out)
        t.translateKey(key(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_VOLUME_UP), "vr", out)
        assertEquals(
            listOf(
                RawEvent.Button("vr", "key:BUTTON_A", true, 120L),
                RawEvent.Button("vr", "key:BUTTON_A", false, 120L),
                RawEvent.Button("vr", "key:VOLUME_UP", true, 120L),
            ),
            out,
        )
    }

    private fun mouse(action: Int, x: Float, y: Float, buttons: Int, source: Int = InputDevice.SOURCE_MOUSE): MotionEvent {
        val props = MotionEvent.PointerProperties().apply {
            id = 0
            toolType = MotionEvent.TOOL_TYPE_MOUSE
        }
        val coords = MotionEvent.PointerCoords().apply {
            this.x = x
            this.y = y
        }
        val now = SystemClock.uptimeMillis()
        return MotionEvent.obtain(now, now, action, 1, arrayOf(props), arrayOf(coords), 0, buttons, 1f, 1f, 3, 0, source, 0)
    }

    @Test
    fun mouseButtonsAreDetectedFromButtonState() {
        t.translateMotion(mouse(MotionEvent.ACTION_DOWN, 10f, 10f, MotionEvent.BUTTON_PRIMARY), "vr", false, out)
        t.translateMotion(mouse(MotionEvent.ACTION_BUTTON_PRESS, 10f, 10f, MotionEvent.BUTTON_PRIMARY or MotionEvent.BUTTON_SECONDARY), "vr", false, out)
        t.translateMotion(mouse(MotionEvent.ACTION_UP, 10f, 10f, 0), "vr", false, out)
        val buttons = out.filterIsInstance<RawEvent.Button>().map { it.sourceId to it.pressed }
        assertEquals(
            listOf("mouse:btn:primary" to true, "mouse:btn:secondary" to true, "mouse:btn:primary" to false, "mouse:btn:secondary" to false),
            buttons,
        )
    }

    @Test
    fun capturedPointerEventsAreRelative() {
        t.translateMotion(mouse(MotionEvent.ACTION_MOVE, 4f, -3f, 0, InputDevice.SOURCE_MOUSE_RELATIVE), "vr", true, out)
        val m = out.single() as RawEvent.Motion
        assertEquals(4f, m.dx, 1e-6f)
        assertEquals(-3f, m.dy, 1e-6f)
    }

    @Test
    fun uncapturedHoverFallsBackToPositionDelta() {
        t.translateMotion(mouse(MotionEvent.ACTION_HOVER_MOVE, 100f, 100f, 0), "vr", false, out)
        t.translateMotion(mouse(MotionEvent.ACTION_HOVER_MOVE, 112f, 95f, 0), "vr", false, out)
        val m = out.filterIsInstance<RawEvent.Motion>().single()
        assertEquals(12f, m.dx, 1e-4f)
        assertEquals(-5f, m.dy, 1e-4f)
    }

    @Test
    fun cancelReleasesHeldButtons() {
        t.translateMotion(mouse(MotionEvent.ACTION_DOWN, 0f, 0f, MotionEvent.BUTTON_PRIMARY), "vr", false, out)
        t.translateMotion(mouse(MotionEvent.ACTION_CANCEL, 0f, 0f, MotionEvent.BUTTON_PRIMARY), "vr", false, out)
        assertFalse((out.last() as RawEvent.Button).pressed)
    }

    @Test
    fun namesComeFromTheAndroidSdk() {
        assertEquals("BUTTON_A", AndroidInputTranslator.keyName(KeyEvent.KEYCODE_BUTTON_A))
        assertEquals("DPAD_UP", AndroidInputTranslator.keyName(KeyEvent.KEYCODE_DPAD_UP))
        assertEquals("HAT_X", AndroidInputTranslator.axisName(MotionEvent.AXIS_HAT_X))
        assertEquals("RELATIVE_X", AndroidInputTranslator.axisName(MotionEvent.AXIS_RELATIVE_X))
    }
}

class BluetoothAndDemoTest {
    @Test
    fun classOfDeviceIsDecoded() {
        assertTrue(BluetoothClassDecoder.isPeripheral(0x05C0))
        assertEquals("Teclado + mouse (HID)", BluetoothClassDecoder.label(0x05C0))
        assertEquals("Mouse (HID)", BluetoothClassDecoder.label(0x0580))
        assertEquals("Periférico HID · Gamepad", BluetoothClassDecoder.label(0x0508))
        assertEquals("Celular", BluetoothClassDecoder.label(0x020C))
        assertFalse(BluetoothClassDecoder.isPeripheral(0x0404))
    }

    @Test
    fun demoScriptGeneratesSimulatedPressAndRelease() {
        val demo = DemoScript()
        val events = ArrayList<RawEvent>()
        var t = 0L
        while (t < DemoScript.LOOP_MS) {
            events += demo.step(t, 1000 + t)
            t += DemoScript.STEP_MS
        }
        assertTrue(events.all { it.deviceKey == DemoScript.DEVICE_KEY })
        val presses = events.filterIsInstance<RawEvent.Button>()
        assertEquals(presses.count { it.pressed }, presses.count { !it.pressed })
        assertTrue(events.any { it is RawEvent.Motion })
        events.clear()
        events += demo.step(2300, 5000) // inside the mouse-button press window
        assertTrue(demo.releaseAll(6000).isNotEmpty())
    }
}
