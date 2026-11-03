package com.rispmr.vrboxemulator.bluetooth

import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import org.json.JSONObject

/** Paired Bluetooth device as reported by public Android APIs. */
data class BondedDeviceInfo(
    val name: String,
    val address: String,
    val type: String,
    val deviceClass: Int,
    val classLabel: String,
    val isHidPeripheral: Boolean,
    /** ACL link state observed through broadcasts since the app started; null = not observed yet. */
    val aclConnected: Boolean?,
) {
    fun toJson(): JSONObject = JSONObject()
        .put("name", name)
        .put("address", address)
        .put("type", type)
        .put("deviceClass", "0x%04X".format(deviceClass))
        .put("classLabel", classLabel)
        .put("hidPeripheral", isHidPeripheral)
        .put("aclConnected", aclConnected ?: JSONObject.NULL)
}

/** Decodes the Bluetooth Class of Device (public assigned numbers). Pure, unit tested. */
object BluetoothClassDecoder {
    private const val MAJOR_MASK = 0x1F00
    const val MAJOR_PERIPHERAL = 0x0500

    fun isPeripheral(deviceClass: Int): Boolean = deviceClass and MAJOR_MASK == MAJOR_PERIPHERAL

    fun label(deviceClass: Int): String {
        val major = deviceClass and MAJOR_MASK
        if (major != MAJOR_PERIPHERAL) {
            return when (major) {
                0x0100 -> "Computer"
                0x0200 -> "Phone"
                0x0400 -> "Audio / Video"
                0x0600 -> "Imaging"
                0x0700 -> "Wearable"
                0x0800 -> "Toy"
                0x0900 -> "Health"
                0x1F00 -> "Uncategorized"
                else -> "Other"
            }
        }
        val pointing = deviceClass and 0x80 != 0
        val keyboard = deviceClass and 0x40 != 0
        val base = when {
            keyboard && pointing -> "Keyboard + Pointing (HID combo)"
            keyboard -> "Keyboard (HID)"
            pointing -> "Pointing device / Mouse (HID)"
            else -> "HID peripheral"
        }
        val sub = when (deviceClass and 0x3C) {
            0x04 -> " · Joystick"
            0x08 -> " · Gamepad"
            0x0C -> " · Remote control"
            0x10 -> " · Sensing device"
            else -> ""
        }
        return base + sub
    }
}

/**
 * Bluetooth adapter state and paired devices.
 *
 * Pairing and HID connection are done by Android itself (system Bluetooth settings): the
 * public SDK has no API for a regular app to open an HID Host connection, so the app never
 * fakes that step. Once Android connects the controller, it shows up as an input device.
 */
class BluetoothDeviceManager(private val context: Context, private val hasPermission: () -> Boolean) {
    private val adapter: BluetoothAdapter? =
        (context.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager)?.adapter
    private val aclState = HashMap<String, Boolean>()
    private var receiver: BroadcastReceiver? = null
    var onChanged: (() -> Unit)? = null
    var onAclEvent: ((name: String, connected: Boolean) -> Unit)? = null

    val isSupported: Boolean get() = adapter != null

    val isEnabled: Boolean
        get() = try {
            adapter?.isEnabled == true
        } catch (e: SecurityException) {
            false
        }

    fun start() {
        if (receiver != null || adapter == null) return
        val r = object : BroadcastReceiver() {
            override fun onReceive(ctx: Context, intent: Intent) {
                when (intent.action) {
                    BluetoothDevice.ACTION_ACL_CONNECTED, BluetoothDevice.ACTION_ACL_DISCONNECTED -> {
                        val device = deviceExtra(intent) ?: return
                        val connected = intent.action == BluetoothDevice.ACTION_ACL_CONNECTED
                        val address = safe { device.address } ?: return
                        aclState[address] = connected
                        val name = if (hasPermission()) {
                            try {
                                device.name
                            } catch (e: SecurityException) {
                                null
                            }
                        } else {
                            null
                        }
                        onAclEvent?.invoke(name ?: address, connected)
                    }
                }
                onChanged?.invoke()
            }
        }
        val filter = IntentFilter().apply {
            addAction(BluetoothAdapter.ACTION_STATE_CHANGED)
            addAction(BluetoothDevice.ACTION_ACL_CONNECTED)
            addAction(BluetoothDevice.ACTION_ACL_DISCONNECTED)
            addAction(BluetoothDevice.ACTION_BOND_STATE_CHANGED)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            context.registerReceiver(r, filter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            context.registerReceiver(r, filter)
        }
        receiver = r
    }

    fun stop() {
        receiver?.let { runCatching { context.unregisterReceiver(it) } }
        receiver = null
    }

    /** Paired devices, or null when the permission is missing. */
    @SuppressLint("MissingPermission")
    fun bondedDevices(): List<BondedDeviceInfo>? {
        val a = adapter ?: return emptyList()
        if (!hasPermission()) return null
        val devices = try {
            a.bondedDevices ?: emptySet()
        } catch (e: SecurityException) {
            return null
        }
        return devices.map { d ->
            val cls = safe { d.bluetoothClass?.deviceClass } ?: 0
            BondedDeviceInfo(
                name = safe { d.name } ?: "(no name)",
                address = d.address,
                type = when (safe { d.type }) {
                    BluetoothDevice.DEVICE_TYPE_CLASSIC -> "Classic"
                    BluetoothDevice.DEVICE_TYPE_LE -> "Low Energy"
                    BluetoothDevice.DEVICE_TYPE_DUAL -> "Dual mode"
                    else -> "Unknown"
                },
                deviceClass = cls,
                classLabel = BluetoothClassDecoder.label(cls),
                isHidPeripheral = BluetoothClassDecoder.isPeripheral(cls),
                aclConnected = aclState[d.address],
            )
        }.sortedWith(compareByDescending<BondedDeviceInfo> { it.isHidPeripheral }.thenBy { it.name })
    }

    /** Names of paired devices with an observed ACL connection. */
    fun connectedNames(): List<String> = bondedDevices()?.filter { it.aclConnected == true }?.map { it.name } ?: emptyList()

    /** Whether an input device name matches a paired Bluetooth device (null = unknown). */
    fun isBondedName(name: String): Boolean? = bondedDevices()?.any { it.name == name }

    private fun deviceExtra(intent: Intent): BluetoothDevice? =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE, BluetoothDevice::class.java)
        } else {
            @Suppress("DEPRECATION")
            intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)
        }

    private inline fun <T> safe(block: () -> T): T? = try {
        block()
    } catch (e: SecurityException) {
        null
    }
}
