package com.rispmr.vrboxemulator.engine

import java.io.File

class FakeClock(var now: Long = 10_000L, var wall: Long = 1_700_000_000_000L) : Clock {
    override fun uptimeMs() = now
    override fun wallMs() = wall
    fun advance(ms: Long) {
        now += ms
        wall += ms
    }
}

class MemoryStorage(var text: String? = null) : TextStorage {
    var writes = 0
    override fun read(): String? = text
    override fun write(text: String) {
        this.text = text
        writes++
    }
}

object TestConfig {
    val configDir: File
        get() = File(System.getProperty("vrbq.configDir") ?: "../../config")

    fun defaults(): DefaultProfiles = DefaultProfiles.parse(
        File(configDir, "default-profile.json").readText(),
        File(configDir, "controller-profiles.json").readText(),
    )

    fun sequentialIds(): IdGenerator {
        var n = 0
        return IdGenerator { prefix -> "$prefix${++n}" }
    }
}

fun rule(source: String, target: String, invert: Boolean = false, threshold: Float? = null, scale: Float = 1f) =
    MappingRule("r-$source-$target", source, target, invert, threshold, scale)
