package com.rispmr.vrboxemulator.engine

import org.json.JSONObject

/** Which physical controller the background reader opens (name + USB/Bluetooth ids). */
data class DeviceIdentity(val name: String, val vendorId: Int, val productId: Int) {
    companion object {
        /** Parses a [DeviceGroup.keyOf] key: "VR BOX#05ac:022c". */
        fun fromKey(key: String?): DeviceIdentity? {
            if (key == null) return null
            val i = key.lastIndexOf('#')
            if (i <= 0) return null
            val ids = key.substring(i + 1).split(':')
            if (ids.size != 2) return null
            val v = ids[0].toIntOrNull(16) ?: return null
            val p = ids[1].toIntOrNull(16) ?: return null
            return DeviceIdentity(key.substring(0, i), v, p)
        }
    }
}

/** What the app hands to the Shizuku service when emulation starts or the profile changes. */
data class BackgroundConfig(
    val device: DeviceIdentity,
    val profile: Profile,
    /** Linux scan code -> Android key name, as seen by the app for this controller. */
    val scanCodes: Map<Int, String> = emptyMap(),
)

object BackgroundConfigCodec {
    fun encode(c: BackgroundConfig): String = JSONObject()
        .put("device", JSONObject().put("name", c.device.name).put("vendor", c.device.vendorId).put("product", c.device.productId))
        .put("profile", ProfileCodec.encode(c.profile))
        .put("scanCodes", JSONObject().apply { c.scanCodes.forEach { (code, name) -> put(code.toString(), name) } })
        .toString()

    fun decode(text: String?): BackgroundConfig? = runCatching {
        val o = JSONObject(text ?: return null)
        val d = o.getJSONObject("device")
        val device = DeviceIdentity(d.getString("name"), d.getInt("vendor"), d.getInt("product"))
        val profile = ProfileCodec.decode(o.getJSONObject("profile")).profile
        val codes = HashMap<Int, String>()
        o.optJSONObject("scanCodes")?.let { s -> for (k in s.keys()) k.toIntOrNull()?.let { codes[it] = s.getString(k) } }
        BackgroundConfig(device, profile, codes)
    }.getOrNull()
}

/**
 * The mapping pipeline used while a game is open: physical events -> two virtual Quest
 * controllers -> virtual gamepad report. Same classes as the app, so it behaves the same.
 * Not thread safe: the caller confines it to one thread.
 */
class BackgroundEngine(clock: Clock) {
    private val controllers = VirtualControllerManager()
    private val processor = InputProcessor(controllers, EventLog(EventLog.MIN_CAPACITY), clock)
    private var threshold = ButtonConfig().analogThreshold

    fun configure(profile: Profile) {
        controllers.configure(profile.mappings, profile.buttons, profile.left, profile.right)
        threshold = profile.buttons.analogThreshold
    }

    /** @return true when the virtual controllers changed. */
    fun process(events: List<RawEvent>): Boolean {
        var changed = false
        for (e in events) if (processor.process(e)) changed = true
        return changed
    }

    fun tick(nowMs: Long): Boolean {
        var changed = processor.tick(nowMs)
        if (controllers.tick(nowMs)) changed = true
        return changed
    }

    fun needsTick(): Boolean = processor.needsTick() || controllers.needsTick()

    fun releaseAll() {
        processor.releaseAll(null)
    }

    fun report(): ByteArray = VirtualGamepad.report(controllers.snapshot(), threshold)
}
