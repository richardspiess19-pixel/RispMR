package com.rispmr.vrboxemulator.engine

import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.io.File
import java.security.SecureRandom

/** Minimal persistence abstraction so the repository can be tested without Android. */
interface TextStorage {
    fun read(): String?
    fun write(text: String)
}

/**
 * File storage with atomic replace: data is written to a temporary file and renamed, so a
 * crash or power loss while saving never leaves a half-written profile file.
 */
class FileTextStorage(private val file: File) : TextStorage {
    override fun read(): String? = if (file.exists()) file.readText(Charsets.UTF_8) else null

    override fun write(text: String) {
        file.parentFile?.mkdirs()
        val tmp = File(file.parentFile, file.name + ".tmp")
        tmp.writeText(text, Charsets.UTF_8)
        if (!tmp.renameTo(file)) {
            // Some file systems refuse rename-over; fall back to delete + rename.
            file.delete()
            if (!tmp.renameTo(file)) throw java.io.IOException("Cannot replace ${file.name}")
        }
    }

    /** Keeps a copy of an unreadable file for diagnosis before it is replaced. */
    fun backupCorrupt() {
        if (file.exists()) file.copyTo(File(file.parentFile, file.name + ".corrupt"), overwrite = true)
    }
}

fun interface IdGenerator {
    fun next(prefix: String): String

    companion object {
        val RANDOM = IdGenerator { prefix ->
            val bytes = ByteArray(5).also { SecureRandom().nextBytes(it) }
            prefix + bytes.joinToString("") { "%02x".format(it) }
        }
    }
}

class ProfileException(message: String) : Exception(message)

/**
 * Stores all profiles of the user on the phone.
 *
 * Mutations are applied in memory and immediately serialized through [persist]; the caller
 * decides on which thread the actual write happens (the Android layer uses an IO executor).
 */
class ProfileRepository(
    private val storage: TextStorage,
    val defaults: DefaultProfiles,
    private val ids: IdGenerator = IdGenerator.RANDOM,
    private val now: () -> Long = System::currentTimeMillis,
    private val persist: (String) -> Unit = { storage.write(it) },
) {
    private val profiles = ArrayList<Profile>()

    var activeId: String = defaults.initialActiveId
        private set

    /** Warnings produced while loading (corrupt file, dropped rules...). */
    val loadWarnings = ArrayList<String>()

    val all: List<Profile> get() = profiles.toList()

    fun load() {
        profiles.clear()
        loadWarnings.clear()
        val text = try {
            storage.read()
        } catch (e: Exception) {
            loadWarnings += "Cannot read profiles: ${e.message}"
            null
        }
        if (text == null) {
            seed()
            return
        }
        try {
            val root = JSONObject(text)
            val arr = root.optJSONArray("profiles") ?: JSONArray()
            for (i in 0 until arr.length()) {
                val obj = arr.optJSONObject(i) ?: continue
                try {
                    val r = ProfileCodec.decode(obj, defaults.template)
                    if (profiles.none { it.id == r.profile.id }) profiles += r.profile
                    loadWarnings += r.warnings.map { "${r.profile.name}: $it" }
                } catch (e: ProfileFormatException) {
                    loadWarnings += "Profile #${i + 1} ignored: ${e.message}"
                }
            }
            if (profiles.isEmpty()) {
                loadWarnings += "No valid profile found, defaults restored"
                seed()
                return
            }
            activeId = root.optString("activeProfileId").takeIf { id -> profiles.any { it.id == id } } ?: profiles.first().id
        } catch (e: JSONException) {
            (storage as? FileTextStorage)?.backupCorrupt()
            loadWarnings += "Profile file was corrupt and has been reset (backup kept)"
            seed()
        }
    }

    private fun seed() {
        profiles.clear()
        profiles += defaults.initial
        activeId = defaults.initialActiveId
        save()
    }

    fun get(id: String): Profile? = profiles.firstOrNull { it.id == id }

    fun active(): Profile = get(activeId) ?: profiles.first()

    fun setActive(id: String): Profile {
        val p = require(id)
        activeId = p.id
        save()
        return p
    }

    fun create(name: String, baseId: String? = null): Profile {
        val clean = uniqueName(ProfileCodec.cleanName(name) ?: throw ProfileException("Profile name is required"))
        val base = baseId?.let { get(it) }
        val p = if (base != null) {
            base.copy(id = ids.next("p-"), name = clean, builtin = false, updatedAt = now())
        } else {
            defaults.template.copy(id = ids.next("p-"), name = clean, description = "", baseId = null, builtin = false, mappings = emptyList(), updatedAt = now())
        }
        profiles += p
        save()
        return p
    }

    fun rename(id: String, name: String): Profile {
        val p = require(id)
        val clean = ProfileCodec.cleanName(name) ?: throw ProfileException("Profile name is required")
        val renamed = p.copy(name = if (clean == p.name) clean else uniqueName(clean), updatedAt = now())
        replace(renamed)
        return renamed
    }

    fun duplicate(id: String): Profile {
        val p = require(id)
        val copy = p.copy(id = ids.next("p-"), name = uniqueName("${p.name} Copy"), builtin = false, updatedAt = now())
        profiles.add(profiles.indexOf(p) + 1, copy)
        save()
        return copy
    }

    fun delete(id: String) {
        val p = require(id)
        if (profiles.size <= 1) throw ProfileException("At least one profile must exist")
        profiles.remove(p)
        if (activeId == id) activeId = profiles.first().id
        save()
    }

    /** Replaces a stored profile (used by "Save" with the edited working copy). */
    fun update(profile: Profile): Profile {
        require(profile.id)
        val stored = profile.copy(updatedAt = now())
        replace(stored)
        return stored
    }

    /** Configuration this profile can be restored to. */
    fun baseOf(profile: Profile): Profile = defaults.initialById(profile.baseId) ?: defaults.template

    /** Restores mappings and settings of a profile to its original values. */
    fun restoreProfile(id: String): Profile {
        val p = require(id)
        val base = baseOf(p)
        val restored = p.copy(mappings = base.mappings, left = base.left, right = base.right, buttons = base.buttons, updatedAt = now())
        replace(restored)
        return restored
    }

    /** Re-creates the initial profiles with factory values. Custom profiles are kept. */
    fun restoreDefaults() {
        for (initial in defaults.initial) {
            val idx = profiles.indexOfFirst { it.id == initial.id }
            if (idx >= 0) profiles[idx] = initial else profiles += initial
        }
        save()
    }

    fun exportJson(id: String): String = exportJson(require(id))

    /** Exports any profile object (e.g. the edited working copy shown in the UI). */
    fun exportJson(p: Profile): String {
        return JSONObject()
            .put("type", EXPORT_TYPE)
            .put("schema", ProfileCodec.SCHEMA)
            .put("app", "VR BOX TO META QUEST EMULATOR")
            .put("exportedAt", now())
            .put("profile", ProfileCodec.encode(p.copy(builtin = false)))
            .toString(2)
    }

    data class ImportResult(val profile: Profile, val warnings: List<String>)

    fun importJson(text: String): ImportResult {
        if (text.length > MAX_IMPORT_CHARS) throw ProfileException("File is too large for a profile")
        val root = try {
            JSONObject(text)
        } catch (e: JSONException) {
            throw ProfileException("File is not valid JSON")
        }
        val obj = when {
            root.optString("type") == EXPORT_TYPE -> root.optJSONObject("profile")
            root.has("mappings") -> root
            else -> null
        } ?: throw ProfileException("File does not contain a VR BOX TO META QUEST profile")
        val schema = root.optInt("schema", ProfileCodec.SCHEMA)
        if (schema > ProfileCodec.SCHEMA) throw ProfileException("Profile was created by a newer version (schema $schema)")
        if (!obj.has("id")) obj.put("id", "import")
        val decoded = try {
            ProfileCodec.decode(obj, defaults.template)
        } catch (e: ProfileFormatException) {
            throw ProfileException(e.message ?: "Invalid profile")
        }
        val p = decoded.profile.copy(id = ids.next("p-"), name = uniqueName(decoded.profile.name), builtin = false, updatedAt = now())
        profiles += p
        save()
        return ImportResult(p, decoded.warnings)
    }

    fun serialize(): String = JSONObject()
        .put("schema", ProfileCodec.SCHEMA)
        .put("activeProfileId", activeId)
        .put("profiles", JSONArray().apply { profiles.forEach { put(ProfileCodec.encode(it)) } })
        .toString()

    private fun save() = persist(serialize())

    private fun replace(p: Profile) {
        val idx = profiles.indexOfFirst { it.id == p.id }
        if (idx < 0) throw ProfileException("Profile not found")
        profiles[idx] = p
        save()
    }

    private fun require(id: String): Profile = get(id) ?: throw ProfileException("Profile not found")

    private fun uniqueName(name: String): String {
        if (profiles.none { it.name.equals(name, ignoreCase = true) }) return name
        var n = 2
        while (true) {
            val candidate = "${name.take(ProfileCodec.MAX_NAME - 4)} ($n)"
            if (profiles.none { it.name.equals(candidate, ignoreCase = true) }) return candidate
            n++
        }
    }

    companion object {
        const val EXPORT_TYPE = "vrbq-profile"
        const val MAX_IMPORT_CHARS = 512 * 1024
    }
}
