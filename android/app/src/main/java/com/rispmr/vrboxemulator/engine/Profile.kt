package com.rispmr.vrboxemulator.engine

import org.json.JSONArray
import org.json.JSONObject

/** A complete configuration: mappings + joystick + button settings. */
data class Profile(
    val id: String,
    val name: String,
    val description: String = "",
    /** Initial profile this one was created from; used by "restore default configuration". */
    val baseId: String? = null,
    val builtin: Boolean = false,
    val mappings: List<MappingRule> = emptyList(),
    val left: StickConfig = StickConfig(),
    val right: StickConfig = StickConfig(mode = StickMode.RELATIVE_MOUSE),
    val buttons: ButtonConfig = ButtonConfig(),
    val updatedAt: Long = 0L,
) {
    fun isConfigured(hand: Hand): Boolean = mappings.any { VirtualTargets.get(it.target)?.hand == hand }
    fun mappingCount(hand: Hand): Int = mappings.count { VirtualTargets.get(it.target)?.hand == hand }
    fun stick(hand: Hand): StickConfig = if (hand == Hand.LEFT) left else right
}

class ProfileFormatException(message: String) : Exception(message)

/**
 * JSON (de)serialization of profiles. Invalid values are clamped, invalid rules are dropped
 * and reported through [DecodeResult.warnings] so a damaged file never crashes the app.
 */
object ProfileCodec {
    const val SCHEMA = 1
    const val MAX_NAME = 48
    const val MAX_MAPPINGS = 256

    data class DecodeResult(val profile: Profile, val warnings: List<String>)

    fun encode(p: Profile): JSONObject = JSONObject().apply {
        put("id", p.id)
        put("name", p.name)
        put("description", p.description)
        put("baseId", p.baseId ?: JSONObject.NULL)
        put("builtin", p.builtin)
        put("updatedAt", p.updatedAt)
        put("mappings", JSONArray().apply { p.mappings.forEach { put(encodeRule(it)) } })
        put("sticks", JSONObject().put("left", encodeStick(p.left)).put("right", encodeStick(p.right)))
        put(
            "buttons",
            JSONObject()
                .put("analogThreshold", p.buttons.analogThreshold.toDouble())
                .put("digitalAnalogValue", p.buttons.digitalAnalogValue.toDouble()),
        )
    }

    fun encodeRule(r: MappingRule): JSONObject = JSONObject().apply {
        put("id", r.id)
        put("source", r.source)
        put("target", r.target)
        if (r.invert) put("invert", true)
        r.threshold?.let { put("threshold", it.toDouble()) }
        if (r.scale != 1f) put("scale", r.scale.toDouble())
    }

    fun encodeStick(s: StickConfig): JSONObject = JSONObject().apply {
        put("mode", s.mode.key)
        put("smoothing", s.smoothing.toDouble())
        put("returnSpeed", s.returnSpeed.toDouble())
        put("x", encodeAxis(s.x))
        put("y", encodeAxis(s.y))
    }

    private fun encodeAxis(a: AxisConfig): JSONObject = JSONObject().apply {
        put("sensitivity", a.sensitivity.toDouble())
        put("deadzone", a.deadzone.toDouble())
        put("curve", a.curve.toDouble())
        put("max", a.max.toDouble())
        put("invert", a.invert)
    }

    /**
     * Decodes a profile. Missing stick/button sections fall back to [template].
     * @throws ProfileFormatException when the object is not a usable profile.
     */
    fun decode(json: JSONObject, template: Profile? = null): DecodeResult {
        val warnings = ArrayList<String>()
        val id = json.optString("id").trim()
        if (id.isEmpty() || id.length > 64) throw ProfileFormatException("Profile id is missing or invalid")
        val name = cleanName(json.optString("name"))
            ?: throw ProfileFormatException("Profile name is missing")

        val mappings = ArrayList<MappingRule>()
        val arr = json.optJSONArray("mappings") ?: JSONArray()
        val seenIds = HashSet<String>()
        for (i in 0 until arr.length()) {
            if (mappings.size >= MAX_MAPPINGS) {
                warnings += "Too many mappings, extra rules ignored"
                break
            }
            val o = arr.optJSONObject(i) ?: continue
            val rule = decodeRule(o, i)
            if (rule == null) {
                warnings += "Mapping #${i + 1} ignored (invalid source or target)"
                continue
            }
            val unique = if (seenIds.add(rule.id)) rule else rule.copy(id = "${rule.id}-$i").also { seenIds.add(it.id) }
            mappings += unique
        }

        val sticks = json.optJSONObject("sticks")
        val left = sticks?.optJSONObject("left")?.let { decodeStick(it, template?.left ?: StickConfig()) }
            ?: template?.left ?: StickConfig()
        val right = sticks?.optJSONObject("right")?.let { decodeStick(it, template?.right ?: StickConfig(mode = StickMode.RELATIVE_MOUSE)) }
            ?: template?.right ?: StickConfig(mode = StickMode.RELATIVE_MOUSE)
        val b = json.optJSONObject("buttons")
        val tb = template?.buttons ?: ButtonConfig()
        val buttons = if (b == null) tb else ButtonConfig(
            analogThreshold = b.optDouble("analogThreshold", tb.analogThreshold.toDouble()).toFloat().safe(tb.analogThreshold).coerceIn(0.05f, 0.95f),
            digitalAnalogValue = b.optDouble("digitalAnalogValue", tb.digitalAnalogValue.toDouble()).toFloat().safe(tb.digitalAnalogValue).coerceIn(0f, 1f),
        )
        val baseId = if (json.isNull("baseId")) null else json.optString("baseId").takeIf { it.isNotBlank() }
        val profile = Profile(
            id = id,
            name = name,
            description = json.optString("description").take(240),
            baseId = baseId,
            builtin = json.optBoolean("builtin", false),
            mappings = mappings,
            left = left,
            right = right,
            buttons = buttons,
            updatedAt = json.optLong("updatedAt", 0L),
        )
        return DecodeResult(profile, warnings)
    }

    fun decodeRule(o: JSONObject, index: Int = 0): MappingRule? {
        val source = o.optString("source")
        val target = o.optString("target")
        val kind = InputCatalog.kindOf(source) ?: return null
        val t = VirtualTargets.get(target) ?: return null
        if (!VirtualTargets.isCompatible(kind, t.type)) return null
        val id = o.optString("id").trim().take(64).ifEmpty { "m$index" }
        val threshold = if (o.has("threshold") && !o.isNull("threshold")) {
            o.optDouble("threshold", 0.5).toFloat().safe(0.5f).coerceIn(0.05f, 0.95f)
        } else null
        return MappingRule(
            id = id,
            source = source,
            target = target,
            invert = o.optBoolean("invert", false),
            threshold = threshold,
            scale = o.optDouble("scale", 1.0).toFloat().safe(1f).coerceIn(0.05f, 10f),
        )
    }

    fun decodeStick(o: JSONObject, fallback: StickConfig): StickConfig = StickConfig(
        mode = StickMode.fromKey(o.optString("mode")) ?: fallback.mode,
        smoothing = o.optDouble("smoothing", fallback.smoothing.toDouble()).toFloat().safe(fallback.smoothing).coerceIn(0f, 0.95f),
        returnSpeed = o.optDouble("returnSpeed", fallback.returnSpeed.toDouble()).toFloat().safe(fallback.returnSpeed).coerceIn(0f, 50f),
        x = o.optJSONObject("x")?.let { decodeAxis(it, fallback.x) } ?: fallback.x,
        y = o.optJSONObject("y")?.let { decodeAxis(it, fallback.y) } ?: fallback.y,
    )

    private fun decodeAxis(o: JSONObject, f: AxisConfig) = AxisConfig(
        sensitivity = o.optDouble("sensitivity", f.sensitivity.toDouble()).toFloat().safe(f.sensitivity).coerceIn(0.05f, 10f),
        deadzone = o.optDouble("deadzone", f.deadzone.toDouble()).toFloat().safe(f.deadzone).coerceIn(0f, 0.9f),
        curve = o.optDouble("curve", f.curve.toDouble()).toFloat().safe(f.curve).coerceIn(0.2f, 5f),
        max = o.optDouble("max", f.max.toDouble()).toFloat().safe(f.max).coerceIn(0.05f, 1f),
        invert = o.optBoolean("invert", f.invert),
    )

    fun cleanName(raw: String?): String? {
        val n = raw?.replace(Regex("[\\p{Cntrl}]"), "")?.trim()?.take(MAX_NAME) ?: return null
        return n.ifEmpty { null }
    }

    private fun Float.safe(fallback: Float): Float = if (isNaN() || isInfinite()) fallback else this
}

/** Initial profiles and the settings template, loaded from the JSON files in `config/`. */
class DefaultProfiles(val template: Profile, val initial: List<Profile>, val initialActiveId: String) {

    fun initialById(id: String?): Profile? = initial.firstOrNull { it.id == id }

    companion object {
        fun parse(templateJson: String, initialJson: String): DefaultProfiles {
            val t = JSONObject(templateJson)
            val template = ProfileCodec.decode(t.getJSONObject("profile")).profile
            val list = JSONObject(initialJson)
            val arr = list.getJSONArray("profiles")
            val profiles = (0 until arr.length()).map { i ->
                val p = ProfileCodec.decode(arr.getJSONObject(i), template).profile
                p.copy(builtin = true, baseId = p.id)
            }
            require(profiles.isNotEmpty()) { "controller-profiles.json has no profiles" }
            val active = list.optString("activeProfileId").takeIf { id -> profiles.any { it.id == id } } ?: profiles.first().id
            return DefaultProfiles(template, profiles, active)
        }
    }
}
