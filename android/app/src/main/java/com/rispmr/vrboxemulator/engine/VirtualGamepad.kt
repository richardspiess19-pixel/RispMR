package com.rispmr.vrboxemulator.engine

import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.roundToInt

/**
 * The virtual gamepad that other apps see.
 *
 * A standard HID game pad (15 buttons, two sticks, two analog triggers). The Linux `hid-generic`
 * driver turns it into an input device and Android maps it with `Generic.kl`, so games read it
 * exactly like a Bluetooth controller:
 *
 * | HID usage | Linux | Android |
 * | --- | --- | --- |
 * | Button 1, 2, 4, 5 | BTN_A, BTN_B, BTN_X, BTN_Y | BUTTON_A, BUTTON_B, BUTTON_X, BUTTON_Y |
 * | Button 7, 8 | BTN_TL, BTN_TR | BUTTON_L1, BUTTON_R1 |
 * | Button 9, 10 | BTN_TL2, BTN_TR2 | BUTTON_L2, BUTTON_R2 |
 * | Button 11, 12 | BTN_SELECT, BTN_START | BUTTON_SELECT, BUTTON_START |
 * | Button 14, 15 | BTN_THUMBL, BTN_THUMBR | BUTTON_THUMBL, BUTTON_THUMBR |
 * | X, Y / Z, Rz | ABS_X, ABS_Y / ABS_Z, ABS_RZ | AXIS_X, AXIS_Y / AXIS_Z, AXIS_RZ |
 * | Brake, Accelerator | ABS_BRAKE, ABS_GAS | AXIS_BRAKE, AXIS_GAS (L2/R2 analog) |
 *
 * Quest Touch -> gamepad: left stick -> left stick, right stick -> right stick, A/B/X/Y -> A/B/X/Y,
 * grips -> L1/R1, triggers -> L2/R2 (analog + button), Menu -> Start, System -> Select,
 * stick clicks -> L3/R3.
 */
object VirtualGamepad {
    const val NAME = "VR Box -> Quest (controle virtual)"

    /** pid.codes test VID/PID: free for non-commercial use, never a real product. */
    const val VENDOR_ID = 0x1209
    const val PRODUCT_ID = 0x0001
    const val REPORT_SIZE = 8

    /** HID button number (1-based) for each output, as listed in the table above. */
    const val BTN_A = 1
    const val BTN_B = 2
    const val BTN_X = 4
    const val BTN_Y = 5
    const val BTN_L1 = 7
    const val BTN_R1 = 8
    const val BTN_L2 = 9
    const val BTN_R2 = 10
    const val BTN_SELECT = 11
    const val BTN_START = 12
    const val BTN_THUMBL = 14
    const val BTN_THUMBR = 15

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
        (vendorId == VENDOR_ID && productId == PRODUCT_ID) || name == NAME

    /** Report for a centered pad with nothing pressed. */
    fun idleReport(): ByteArray = ByteArray(REPORT_SIZE)

    /**
     * Builds the 8-byte input report: buttons (2 bytes, bit n-1 = button n), X, Y, Z, Rz (int8),
     * brake, accelerator (uint8). Stick values use +y = up; HID and Android use +y = down.
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
        set(BTN_X, l.pressed("x"))
        set(BTN_Y, l.pressed("y"))
        set(BTN_L1, l.grip >= analogThreshold)
        set(BTN_R1, r.grip >= analogThreshold)
        set(BTN_L2, l.trigger >= analogThreshold)
        set(BTN_R2, r.trigger >= analogThreshold)
        set(BTN_SELECT, r.pressed("system"))
        set(BTN_START, l.pressed("menu"))
        set(BTN_THUMBL, l.pressed(VirtualTargets.STICK_CLICK))
        set(BTN_THUMBR, r.pressed(VirtualTargets.STICK_CLICK))
        return byteArrayOf(
            (bits and 0xFF).toByte(),
            ((bits shr 8) and 0xFF).toByte(),
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
