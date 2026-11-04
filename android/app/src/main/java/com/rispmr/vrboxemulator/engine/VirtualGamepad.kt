package com.rispmr.vrboxemulator.engine

import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.roundToInt

/**
 * The virtual gamepad that other apps see: the two virtual Joy-Cons held together, like a
 * standard controller.
 *
 * A standard HID game pad (15 buttons, a hat for the D-pad, two sticks, two analog triggers).
 * The Linux `hid-generic` driver turns it into an input device and Android maps it with
 * `Generic.kl`, so games read it exactly like a Bluetooth controller:
 *
 * | Joy-Con | HID usage | Android |
 * | --- | --- | --- |
 * | A, B, X, Y | Button 1, 2, 4, 5 | BUTTON_A, BUTTON_B, BUTTON_X, BUTTON_Y |
 * | Captura | Button 3 | BUTTON_C |
 * | L, R | Button 7, 8 | BUTTON_L1, BUTTON_R1 |
 * | ZL, ZR | Button 9, 10 + Brake, Accelerator | BUTTON_L2, BUTTON_R2 + AXIS_BRAKE, AXIS_GAS |
 * | −, + | Button 11, 12 | BUTTON_SELECT, BUTTON_START |
 * | Home | Button 13 | BUTTON_MODE |
 * | Stick clicks | Button 14, 15 | BUTTON_THUMBL, BUTTON_THUMBR |
 * | ↑ ↓ ← → | Hat switch | AXIS_HAT_X, AXIS_HAT_Y (D-pad) |
 * | Sticks | X, Y / Z, Rz | AXIS_X, AXIS_Y / AXIS_Z, AXIS_RZ |
 *
 * It uses a neutral test id (not Nintendo's), so no Joy-Con specific driver claims it.
 */
object VirtualGamepad {
    const val NAME = "VR Box -> Joy-Con (controle virtual)"

    /** pid.codes test VID/PID: free for non-commercial use, never a real product. */
    const val VENDOR_ID = 0x1209
    const val PRODUCT_ID = 0x0001
    const val REPORT_SIZE = 9

    /** HID button number (1-based) for each output, as listed in the table above. */
    const val BTN_A = 1
    const val BTN_B = 2
    const val BTN_C = 3
    const val BTN_X = 4
    const val BTN_Y = 5
    const val BTN_L1 = 7
    const val BTN_R1 = 8
    const val BTN_L2 = 9
    const val BTN_R2 = 10
    const val BTN_SELECT = 11
    const val BTN_START = 12
    const val BTN_MODE = 13
    const val BTN_THUMBL = 14
    const val BTN_THUMBR = 15

    /** Hat value with nothing pressed (outside 0..7: the "null state"). */
    const val HAT_CENTER = 8

    val DESCRIPTOR: ByteArray = bytes(
        0x05, 0x01, // Usage Page (Generic Desktop)
        0x09, 0x05, // Usage (Game Pad)
        0xA1, 0x01, // Collection (Application)
        0x05, 0x09, //   Usage Page (Button)
        0x19, 0x01, //   Usage Minimum (1)
        0x29, 0x0F, //   Usage Maximum (15)
        0x15, 0x00, //   Logical Minimum (0)
        0x25, 0x01, //   Logical Maximum (1)
        0x75, 0x01, //   Report Size (1)
        0x95, 0x0F, //   Report Count (15)
        0x81, 0x02, //   Input (Data, Var, Abs)
        0x75, 0x01, //   Report Size (1)
        0x95, 0x01, //   Report Count (1)
        0x81, 0x03, //   Input (Const) - padding
        0x05, 0x01, //   Usage Page (Generic Desktop)
        0x09, 0x39, //   Usage (Hat switch)
        0x15, 0x00, //   Logical Minimum (0)
        0x25, 0x07, //   Logical Maximum (7)
        0x35, 0x00, //   Physical Minimum (0)
        0x46, 0x3B, 0x01, // Physical Maximum (315)
        0x65, 0x14, //   Unit (degrees)
        0x75, 0x04, //   Report Size (4)
        0x95, 0x01, //   Report Count (1)
        0x81, 0x42, //   Input (Data, Var, Abs, Null State)
        0x65, 0x00, //   Unit (none)
        0x45, 0x00, //   Physical Maximum (0)
        0x75, 0x04, //   Report Size (4)
        0x95, 0x01, //   Report Count (1)
        0x81, 0x03, //   Input (Const) - padding
        0x09, 0x30, //   Usage (X)
        0x09, 0x31, //   Usage (Y)
        0x09, 0x32, //   Usage (Z)
        0x09, 0x35, //   Usage (Rz)
        0x15, 0x81, //   Logical Minimum (-127)
        0x25, 0x7F, //   Logical Maximum (127)
        0x75, 0x08, //   Report Size (8)
        0x95, 0x04, //   Report Count (4)
        0x81, 0x02, //   Input (Data, Var, Abs)
        0x05, 0x02, //   Usage Page (Simulation Controls)
        0x09, 0xC5, //   Usage (Brake)
        0x09, 0xC4, //   Usage (Accelerator)
        0x15, 0x00, //   Logical Minimum (0)
        0x26, 0xFF, 0x00, // Logical Maximum (255)
        0x75, 0x08, //   Report Size (8)
        0x95, 0x02, //   Report Count (2)
        0x81, 0x02, //   Input (Data, Var, Abs)
        0xC0, // End Collection
    )

    fun isOwn(vendorId: Int, productId: Int, name: String?): Boolean =
        (vendorId == VENDOR_ID && productId == PRODUCT_ID) || name == NAME || name == OLD_NAME

    private const val OLD_NAME = "VR Box -> Quest (controle virtual)"

    /** Report for a centered pad with nothing pressed. */
    fun idleReport(): ByteArray = ByteArray(REPORT_SIZE).also { it[2] = HAT_CENTER.toByte() }

    /** Hat direction 0..7 (0 = up, clockwise) for the left Joy-Con arrows, or [HAT_CENTER]. */
    fun hat(up: Boolean, down: Boolean, left: Boolean, right: Boolean): Int {
        val y = (if (up) 1 else 0) - (if (down) 1 else 0)
        val x = (if (right) 1 else 0) - (if (left) 1 else 0)
        return when {
            y > 0 && x == 0 -> 0
            y > 0 && x > 0 -> 1
            y == 0 && x > 0 -> 2
            y < 0 && x > 0 -> 3
            y < 0 && x == 0 -> 4
            y < 0 && x < 0 -> 5
            y == 0 && x < 0 -> 6
            y > 0 && x < 0 -> 7
            else -> HAT_CENTER
        }
    }

    /**
     * Builds the 9-byte input report: buttons (2 bytes, bit n-1 = button n), hat (low 4 bits),
     * X, Y, Z, Rz (int8), brake, accelerator (uint8). Stick values use +y = up; HID and Android
     * use +y = down.
     */
    fun report(s: ControllerSnapshot, analogThreshold: Float): ByteArray {
        var bits = 0
        fun set(button: Int, on: Boolean) {
            if (on) bits = bits or (1 shl (button - 1))
        }
        val l = s.left
        val r = s.right
        set(BTN_A, r.pressed("a"))
        set(BTN_B, r.pressed("b"))
        set(BTN_X, r.pressed("x"))
        set(BTN_Y, r.pressed("y"))
        set(BTN_C, l.pressed("capture"))
        set(BTN_L1, l.grip >= analogThreshold)
        set(BTN_R1, r.grip >= analogThreshold)
        set(BTN_L2, l.trigger >= analogThreshold)
        set(BTN_R2, r.trigger >= analogThreshold)
        set(BTN_SELECT, l.pressed("minus"))
        set(BTN_START, r.pressed("plus"))
        set(BTN_MODE, r.pressed("home"))
        set(BTN_THUMBL, l.pressed(VirtualTargets.STICK_CLICK))
        set(BTN_THUMBR, r.pressed(VirtualTargets.STICK_CLICK))
        return byteArrayOf(
            (bits and 0xFF).toByte(),
            ((bits shr 8) and 0xFF).toByte(),
            hat(l.pressed("up"), l.pressed("down"), l.pressed("left"), l.pressed("right")).toByte(),
            axis(l.stickX),
            axis(-l.stickY),
            axis(r.stickX),
            axis(-r.stickY),
            unsigned(l.trigger),
            unsigned(r.trigger),
        )
    }

    private fun axis(v: Float): Byte = (v.coerceIn(-1f, 1f) * 127f).roundToInt().toByte()

    private fun unsigned(v: Float): Byte = (v.coerceIn(0f, 1f) * 255f).roundToInt().toByte()

    private fun bytes(vararg v: Int) = ByteArray(v.size) { v[it].toByte() }
}

/**
 * Messages of the Linux `/dev/uhid` interface (`include/uapi/linux/uhid.h`).
 *
 * `struct uhid_event` is packed, little-endian: `u32 type` followed by the request. The kernel
 * zero-fills whatever is not written, so each message only carries the bytes it needs.
 */
object Uhid {
    const val DESTROY = 1
    const val START = 2
    const val STOP = 3
    const val OPEN = 4
    const val CLOSE = 5
    const val OUTPUT = 6
    const val GET_REPORT = 9
    const val GET_REPORT_REPLY = 10
    const val CREATE2 = 11
    const val INPUT2 = 12
    const val SET_REPORT = 13
    const val SET_REPORT_REPLY = 14

    const val BUS_USB = 0x03

    /** sizeof(struct uhid_event): type + the largest request (uhid_create2_req). */
    const val EVENT_SIZE = 4 + 128 + 64 + 64 + 2 + 2 + 4 + 4 + 4 + 4 + 4096

    // Offsets inside struct uhid_event for UHID_CREATE2.
    const val NAME_OFFSET = 4
    const val RD_SIZE_OFFSET = 4 + 128 + 64 + 64
    const val RD_DATA_OFFSET = RD_SIZE_OFFSET + 2 + 2 + 4 + 4 + 4 + 4

    fun create2(name: String, vendor: Int, product: Int, descriptor: ByteArray, bus: Int = BUS_USB): ByteArray {
        require(descriptor.size <= 4096) { "descriptor too large" }
        val b = buffer(RD_DATA_OFFSET + descriptor.size)
        b.putInt(CREATE2)
        val n = name.toByteArray(Charsets.UTF_8).copyOf(127) // NUL-terminated
        b.position(NAME_OFFSET)
        b.put(n)
        b.position(RD_SIZE_OFFSET)
        b.putShort(descriptor.size.toShort())
        b.putShort(bus.toShort())
        b.putInt(vendor)
        b.putInt(product)
        b.putInt(0) // version
        b.putInt(0) // country
        b.put(descriptor)
        return b.array()
    }

    fun input2(report: ByteArray): ByteArray {
        require(report.size <= 4096) { "report too large" }
        val b = buffer(4 + 2 + report.size)
        b.putInt(INPUT2)
        b.putShort(report.size.toShort())
        b.put(report)
        return b.array()
    }

    fun destroy(): ByteArray = buffer(4).putInt(DESTROY).array()

    /** Answer to UHID_GET_REPORT (`u32 id; u16 err; u16 size; data`): "not supported". */
    fun getReportReply(id: Int): ByteArray = buffer(4 + 4 + 2 + 2).putInt(GET_REPORT_REPLY).putInt(id).putShort(EIO).putShort(0).array()

    /** Answer to UHID_SET_REPORT (`u32 id; u16 err`). */
    fun setReportReply(id: Int): ByteArray = buffer(4 + 4 + 2).putInt(SET_REPORT_REPLY).putInt(id).putShort(EIO).array()

    /** Type of a message read from the device, or -1. */
    fun typeOf(event: ByteArray, length: Int): Int = if (length < 4) -1 else ByteBuffer.wrap(event, 0, 4).order(ByteOrder.LITTLE_ENDIAN).int

    /** Request id of UHID_GET_REPORT / UHID_SET_REPORT (first field after the type). */
    fun requestId(event: ByteArray, length: Int): Int = if (length < 8) 0 else ByteBuffer.wrap(event, 4, 4).order(ByteOrder.LITTLE_ENDIAN).int

    private const val EIO: Short = 5

    private fun buffer(size: Int) = ByteBuffer.allocate(size).order(ByteOrder.LITTLE_ENDIAN)
}
