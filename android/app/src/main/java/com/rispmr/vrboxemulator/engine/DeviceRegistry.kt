package com.rispmr.vrboxemulator.engine

import org.json.JSONArray
import org.json.JSONObject
import java.util.Locale

/**
 * Android `InputDevice.SOURCE_*` values (public, stable API constants). They are mirrored here
 * so the classifier stays testable on the JVM; a unit test checks them against the SDK.
 */
object Sources {
    const val CLASS_BUTTON = 0x00000001
    const val CLASS_POINTER = 0x00000002
    const val KEYBOARD = 0x00000101
    const val DPAD = 0x00000201
    const val GAMEPAD = 0x00000401
    const val TOUCHSCREEN = 0x00001002
    const val MOUSE = 0x00002002
    const val STYLUS = 0x00004002
    const val TRACKBALL = 0x00010004
    const val MOUSE_RELATIVE = 0x00020004
    const val TOUCHPAD = 0x00100008
    const val JOYSTICK = 0x01000010

    fun has(sources: Int, source: Int) = (sources and source) == source
}

/** Snapshot of an Android `InputDevice` (no Android types, so it is serializable and testable). */
data class InputDeviceInfo(
    val id: Int,
    val name: String,
    val descriptor: String,
    val vendorId: Int,
    val productId: Int,
    val sources: Int,
    /** 0 = none, 1 = non alphabetic, 2 = alphabetic (Android KEYBOARD_TYPE_*). */
    val keyboardType: Int,
    /** `InputDevice.isExternal` (API 29+); null when the OS does not report it. */
    val isExternal: Boolean?,
    val isVirtual: Boolean,
    val controllerNumber: Int,
    val axes: List<String>,
    val declaredKeys: List<String>,
)

/** How Android presents a device, e.g. a VR Box in mouse mode is "Mouse" + "Keyboard". */
object DeviceClassifier {
    fun roles(sources: Int, keyboardType: Int): List<String> = buildList {
        if (Sources.has(sources, Sources.MOUSE)) add("Mouse")
        if (Sources.has(sources, Sources.MOUSE_RELATIVE)) add("Mouse (relativo)")
        if (Sources.has(sources, Sources.GAMEPAD)) add("Gamepad")
        if (Sources.has(sources, Sources.JOYSTICK)) add("Joystick")
        if (Sources.has(sources, Sources.DPAD)) add("D-pad")
        if (Sources.has(sources, Sources.KEYBOARD)) add(if (keyboardType == 2) "Teclado" else "Teclas/botões")
        if (Sources.has(sources, Sources.TOUCHSCREEN)) add("Tela de toque")
        if (Sources.has(sources, Sources.TOUCHPAD)) add("Touchpad")
        if (Sources.has(sources, Sources.STYLUS)) add("Caneta")
        if (Sources.has(sources, Sources.TRACKBALL)) add("Trackball")
    }

    /** Short main type used in the UI. */
    fun primaryType(sources: Int, keyboardType: Int): String = when {
        Sources.has(sources, Sources.GAMEPAD) || Sources.has(sources, Sources.JOYSTICK) -> "Gamepad/joystick"
        Sources.has(sources, Sources.MOUSE) -> "Mouse"
        Sources.has(sources, Sources.KEYBOARD) && keyboardType == 2 -> "Teclado"
        Sources.has(sources, Sources.KEYBOARD) -> "Teclas/botões"
        Sources.has(sources, Sources.TOUCHSCREEN) -> "Tela de toque"
        else -> "Outro"
    }

    private val VR_BOX_HINTS = listOf("vr box", "vrbox", "vr-box", "vr park", "vr-park", "vrpark", "bluetooth remote", "ble remote", "bt remote", "vr remote", "magicsee", "shinecon")

    /** Name heuristic only; it never decides anything on its own (the user always chooses). */
    fun looksLikeVrBox(name: String): Boolean {
        val n = name.lowercase(Locale.ROOT)
        return VR_BOX_HINTS.any { n.contains(it) }
    }

    /** Devices the user could plausibly want to read: controllers, mice, keyboards, remotes. */
    fun isInputCandidate(sources: Int): Boolean =
        Sources.has(sources, Sources.MOUSE) || Sources.has(sources, Sources.GAMEPAD) ||
            Sources.has(sources, Sources.JOYSTICK) || Sources.has(sources, Sources.KEYBOARD) ||
            Sources.has(sources, Sources.DPAD) || Sources.has(sources, Sources.MOUSE_RELATIVE)
}

/**
 * One physical controller as seen by Android. A single Bluetooth VR Box is often exposed as
 * several `InputDevice`s (for example a mouse node and a keyboard / consumer-control node) that
 * share name, vendor and product id; they are grouped under one key.
 */
data class DeviceGroup(val key: String, val name: String, val vendorId: Int, val productId: Int, val devices: List<InputDeviceInfo>) {
    val sources: Int = devices.fold(0) { acc, d -> acc or d.sources }
    val keyboardType: Int = devices.maxOfOrNull { it.keyboardType } ?: 0
    val roles: List<String> = devices.flatMap { DeviceClassifier.roles(it.sources, it.keyboardType) }.distinct()
    val primaryType: String = DeviceClassifier.primaryType(sources, keyboardType)

    /** true / false when Android reports it (API 29+), null when unknown. */
    val external: Boolean? = devices.mapNotNull { it.isExternal }.let { if (it.isEmpty()) null else it.any { e -> e } }
    val likelyVrBox: Boolean = DeviceClassifier.looksLikeVrBox(name)
    val isCandidate: Boolean = devices.any { !it.isVirtual } && DeviceClassifier.isInputCandidate(sources)

    fun toJson(): JSONObject = JSONObject().apply {
        put("key", key)
        put("name", name)
        put("vendorId", vendorId)
        put("productId", productId)
        put("vendor", VendorNames.lookup(vendorId) ?: JSONObject.NULL)
        put("vidPid", "%04X:%04X".format(Locale.ROOT, vendorId, productId))
        put("primaryType", primaryType)
        put("roles", JSONArray(roles))
        put("external", external ?: JSONObject.NULL)
        put("likelyVrBox", likelyVrBox)
        put("candidate", isCandidate)
        put("axes", JSONArray(devices.flatMap { it.axes }.distinct()))
        put("declaredKeys", JSONArray(devices.flatMap { it.declaredKeys }.distinct()))
        put(
            "nodes",
            JSONArray().apply {
                devices.forEach { d ->
                    put(
                        JSONObject()
                            .put("id", d.id)
                            .put("sources", "0x%08X".format(Locale.ROOT, d.sources))
                            .put("roles", JSONArray(DeviceClassifier.roles(d.sources, d.keyboardType)))
                            .put("keyboardType", d.keyboardType)
                            .put("controllerNumber", d.controllerNumber)
                            .put("descriptor", d.descriptor.take(12)),
                    )
                }
            },
        )
    }

    companion object {
        /** All interfaces of one controller ("VR BOX", "VR BOX Mouse"...) share one key. */
        fun keyOf(d: InputDeviceInfo) = keyOf(baseName(d.name), d.vendorId, d.productId)

        /**
         * Linux splits a Bluetooth controller into one input device per HID application and adds
         * the application to the name (`hid-input.c`): "VR BOX Keyboard", "VR BOX Mouse",
         * "VR BOX Consumer Control"... Android shows each as its own device. The base name joins
         * them back into one controller.
         */
        fun baseName(name: String): String {
            for (suffix in HID_SUFFIXES) {
                if (name.length > suffix.length + 1 && name.endsWith(" $suffix")) return name.dropLast(suffix.length + 1)
            }
            return name
        }

        private val HID_SUFFIXES = listOf(
            "System Multi Axis Controller", "Wireless Radio Control", "Consumer Control", "System Control",
            "Touchscreen", "Touchpad", "Keyboard", "Keypad", "Mouse", "Pen",
        )

        fun keyOf(name: String, vendorId: Int, productId: Int) = "$name#%04x:%04x".format(Locale.ROOT, vendorId, productId)
    }
}

/** Small table of well-known USB/Bluetooth vendor ids. Unknown ids are shown as numbers only. */
object VendorNames {
    private val names = mapOf(
        0x045E to "Microsoft",
        0x046D to "Logitech",
        0x054C to "Sony",
        0x057E to "Nintendo",
        0x05AC to "Apple",
        0x0A5C to "Broadcom",
        0x0BDA to "Realtek",
        0x18D1 to "Google",
        0x2717 to "Xiaomi",
        0x2833 to "Oculus / Meta",
        0x0E8D to "MediaTek",
        0x04E8 to "Samsung",
    )

    fun lookup(id: Int): String? = names[id]
}

/** Registry event produced when the set of input devices changes. */
sealed interface RegistryEvent {
    data class Connected(val group: DeviceGroup, val reconnected: Boolean) : RegistryEvent
    data class Disconnected(val group: DeviceGroup) : RegistryEvent
}

/** Tracks Android input devices, groups them and detects disconnections / reconnections. */
class DeviceRegistry {
    private val devices = LinkedHashMap<Int, InputDeviceInfo>()
    private val everSeen = HashSet<String>()
    private val lastGroups = HashMap<String, DeviceGroup>()

    fun groupKeyFor(deviceId: Int): String? = devices[deviceId]?.let { DeviceGroup.keyOf(it) }

    fun device(deviceId: Int): InputDeviceInfo? = devices[deviceId]

    fun isConnected(groupKey: String?): Boolean = groupKey != null && devices.values.any { DeviceGroup.keyOf(it) == groupKey }

    /** Replaces the whole list (initial enumeration / resume). */
    fun replaceAll(list: List<InputDeviceInfo>): List<RegistryEvent> {
        val before = groupKeys()
        devices.clear()
        list.forEach { devices[it.id] = it }
        return diff(before)
    }

    fun put(info: InputDeviceInfo): List<RegistryEvent> {
        val before = groupKeys()
        devices[info.id] = info
        return diff(before)
    }

    fun remove(deviceId: Int): List<RegistryEvent> {
        val before = groupKeys()
        devices.remove(deviceId)
        return diff(before)
    }

    fun groups(includeNonCandidates: Boolean = false, includeInternal: Boolean = false): List<DeviceGroup> =
        devices.values.groupBy { DeviceGroup.keyOf(it) }
            .map { (key, list) -> DeviceGroup(key, DeviceGroup.baseName(list.first().name), list.first().vendorId, list.first().productId, list) }
            .filter { includeNonCandidates || it.isCandidate }
            .filter { includeInternal || it.external != false }
            .sortedWith(compareByDescending<DeviceGroup> { it.likelyVrBox }.thenBy { it.name.lowercase(Locale.ROOT) })

    fun group(key: String?): DeviceGroup? = key?.let { k -> groups(includeNonCandidates = true, includeInternal = true).firstOrNull { it.key == k } }

    /** Last known information of a group, also after it disconnected. */
    fun lastKnown(key: String?): DeviceGroup? = key?.let { group(it) ?: lastGroups[it] }

    /**
     * Best automatic choice: remembered device first, then a device whose name looks like a
     * VR Box, then the only external controller-like device. Returns null when ambiguous.
     */
    fun bestCandidate(rememberedKey: String?): DeviceGroup? {
        val all = groups()
        rememberedKey?.let { k -> all.firstOrNull { it.key == k }?.let { return it } }
        all.firstOrNull { it.likelyVrBox }?.let { return it }
        val external = all.filter { it.external == true }
        return if (external.size == 1) external.first() else null
    }

    private fun groupKeys(): Set<String> = devices.values.map { DeviceGroup.keyOf(it) }.toSet()

    private fun diff(before: Set<String>): List<RegistryEvent> {
        val now = groupKeys()
        val events = ArrayList<RegistryEvent>()
        for (key in now - before) {
            val g = group(key) ?: continue
            events += RegistryEvent.Connected(g, reconnected = key in everSeen)
            everSeen += key
        }
        for (key in before - now) {
            lastGroups[key]?.let { events += RegistryEvent.Disconnected(it) }
        }
        for (key in now) group(key)?.let { lastGroups[key] = it }
        return events
    }
}
