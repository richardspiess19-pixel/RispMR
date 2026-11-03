package com.rispmr.vrboxemulator.engine

import org.json.JSONObject

/** Network output of the VRBQ input protocol. */
data class UdpSettings(
    val enabled: Boolean = false,
    val host: String = "127.0.0.1",
    val port: Int = 47900,
    val rateHz: Int = 90,
    /** "json" or "binary". */
    val format: String = "json",
)

/** App-wide settings (profile-independent). */
data class AppSettings(
    /** Re-select the last used controller automatically when it appears. */
    val autoSelectLastDevice: Boolean = true,
    /** Only read events from the selected controller (otherwise any external input device). */
    val selectedDeviceOnly: Boolean = true,
    /** Stop controller events from reaching the app UI while they are being read. */
    val consumeControllerInput: Boolean = true,
    /** Request Android pointer capture so mouse-mode controllers deliver relative movement. */
    val autoPointerCapture: Boolean = true,
    val showInternalDevices: Boolean = false,
    val reduceMotion: Boolean = false,
    val showRawCodes: Boolean = true,
    val logSize: Int = 200,
    val keepScreenOn: Boolean = true,
    val udp: UdpSettings = UdpSettings(),
    val lastDeviceKey: String? = null,
    /** Modo jogo: touches performed in the game by the accessibility service. */
    val game: GameModeConfig = GameModeConfig.cardboard(),
)

class SettingsException(message: String) : Exception(message)

object AppSettingsCodec {
    private val HOST = Regex("^[A-Za-z0-9.:\\-\\[\\]]{1,253}$")

    fun encode(s: AppSettings): JSONObject = JSONObject().apply {
        put("autoSelectLastDevice", s.autoSelectLastDevice)
        put("selectedDeviceOnly", s.selectedDeviceOnly)
        put("consumeControllerInput", s.consumeControllerInput)
        put("autoPointerCapture", s.autoPointerCapture)
        put("showInternalDevices", s.showInternalDevices)
        put("reduceMotion", s.reduceMotion)
        put("showRawCodes", s.showRawCodes)
        put("logSize", s.logSize)
        put("keepScreenOn", s.keepScreenOn)
        put("lastDeviceKey", s.lastDeviceKey ?: JSONObject.NULL)
        put("game", GameModeCodec.encode(s.game))
        put(
            "udp",
            JSONObject()
                .put("enabled", s.udp.enabled)
                .put("host", s.udp.host)
                .put("port", s.udp.port)
                .put("rateHz", s.udp.rateHz)
                .put("format", s.udp.format),
        )
    }

    fun decode(text: String?): AppSettings {
        if (text.isNullOrBlank()) return AppSettings()
        return try {
            merge(AppSettings(), JSONObject(text), strict = false)
        } catch (e: Exception) {
            AppSettings()
        }
    }

    /**
     * Applies a partial update. With [strict] = true invalid values raise [SettingsException]
     * (used for user input); otherwise they are ignored (used when loading from disk).
     */
    fun merge(current: AppSettings, patch: JSONObject, strict: Boolean = true): AppSettings {
        fun bool(key: String, value: Boolean) = if (patch.has(key)) patch.optBoolean(key, value) else value
        var s = current.copy(
            autoSelectLastDevice = bool("autoSelectLastDevice", current.autoSelectLastDevice),
            selectedDeviceOnly = bool("selectedDeviceOnly", current.selectedDeviceOnly),
            consumeControllerInput = bool("consumeControllerInput", current.consumeControllerInput),
            autoPointerCapture = bool("autoPointerCapture", current.autoPointerCapture),
            showInternalDevices = bool("showInternalDevices", current.showInternalDevices),
            reduceMotion = bool("reduceMotion", current.reduceMotion),
            showRawCodes = bool("showRawCodes", current.showRawCodes),
            keepScreenOn = bool("keepScreenOn", current.keepScreenOn),
        )
        if (patch.has("logSize")) {
            val v = patch.optInt("logSize", -1)
            if (v in 50..1000) s = s.copy(logSize = v) else if (strict) throw SettingsException("O histórico deve ter entre 50 e 1000 eventos")
        }
        if (patch.has("lastDeviceKey")) {
            s = s.copy(lastDeviceKey = if (patch.isNull("lastDeviceKey")) null else patch.optString("lastDeviceKey").take(300))
        }
        patch.optJSONObject("game")?.let { g ->
            s = s.copy(game = GameModeCodec.decode(g, s.game))
        }
        patch.optJSONObject("udp")?.let { u ->
            var udp = s.udp
            if (u.has("enabled")) udp = udp.copy(enabled = u.optBoolean("enabled", udp.enabled))
            if (u.has("host")) {
                val h = u.optString("host").trim()
                if (HOST.matches(h)) udp = udp.copy(host = h) else if (strict) throw SettingsException("Endereço inválido")
            }
            if (u.has("port")) {
                val p = u.optInt("port", -1)
                if (p in 1..65535) udp = udp.copy(port = p) else if (strict) throw SettingsException("A porta deve estar entre 1 e 65535")
            }
            if (u.has("rateHz")) {
                val r = u.optInt("rateHz", -1)
                if (r in 10..250) udp = udp.copy(rateHz = r) else if (strict) throw SettingsException("A taxa deve estar entre 10 e 250 Hz")
            }
            if (u.has("format")) {
                val f = u.optString("format")
                if (f == "json" || f == "binary") udp = udp.copy(format = f) else if (strict) throw SettingsException("O formato deve ser json ou binary")
            }
            s = s.copy(udp = udp)
        }
        return s
    }
}

/**
 * Remembers which physical inputs were identified on each controller, so the mapping screen
 * can offer them as sources in later sessions.
 */
class IdentifiedInputsStore(private val storage: TextStorage, private val persist: (String) -> Unit = { storage.write(it) }) {
    private val byDevice = LinkedHashMap<String, LinkedHashMap<String, IdentifiedInput>>()

    fun load() {
        byDevice.clear()
        val text = try { storage.read() } catch (e: Exception) { null } ?: return
        try {
            val root = JSONObject(text)
            for (deviceKey in root.keys()) {
                val arr = root.optJSONArray(deviceKey) ?: continue
                val map = LinkedHashMap<String, IdentifiedInput>()
                for (i in 0 until arr.length()) {
                    val o = arr.optJSONObject(i) ?: continue
                    val id = o.optString("id")
                    val kind = InputCatalog.kindOf(id) ?: continue
                    map[id] = IdentifiedInput(id, InputCatalog.labelOf(id), kind, o.optInt("count", 1), o.optLong("lastSeen", 0))
                }
                if (map.isNotEmpty()) byDevice[deviceKey] = map
            }
        } catch (e: Exception) {
            byDevice.clear()
        }
    }

    /** @return true if the input was not known before for this device. */
    fun record(deviceKey: String, sourceId: String, kind: SourceKind, wallMs: Long): Boolean {
        val map = byDevice.getOrPut(deviceKey) { LinkedHashMap() }
        val existing = map[sourceId]
        map[sourceId] = IdentifiedInput(sourceId, InputCatalog.labelOf(sourceId), kind, (existing?.count ?: 0) + 1, wallMs)
        return existing == null
    }

    fun list(deviceKey: String?): List<IdentifiedInput> = deviceKey?.let { byDevice[it]?.values?.toList() } ?: emptyList()

    fun count(deviceKey: String?): Int = deviceKey?.let { byDevice[it]?.size } ?: 0

    fun clear(deviceKey: String) {
        byDevice.remove(deviceKey)
        save()
    }

    fun save() = persist(serialize())

    fun serialize(): String {
        val root = JSONObject()
        for ((device, map) in byDevice) {
            root.put(
                device,
                org.json.JSONArray().apply {
                    map.values.forEach { put(JSONObject().put("id", it.id).put("count", it.count).put("lastSeen", it.lastSeenWallMs)) }
                },
            )
        }
        return root.toString()
    }
}
