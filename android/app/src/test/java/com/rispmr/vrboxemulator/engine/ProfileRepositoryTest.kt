package com.rispmr.vrboxemulator.engine

import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Assert.fail
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.io.File

class ProfileRepositoryTest {
    @get:Rule
    val tmp = TemporaryFolder()

    private fun repo(storage: TextStorage = MemoryStorage()) =
        ProfileRepository(storage, TestConfig.defaults(), TestConfig.sequentialIds(), now = { 42L }).also { it.load() }

    @Test
    fun firstLaunchSeedsTheFourInitialProfiles() {
        val storage = MemoryStorage()
        val r = repo(storage)
        assertEquals(listOf("VR Box padrão", "Joy-Con esquerdo", "Joy-Con direito", "Perfil personalizado"), r.all.map { it.name })
        assertEquals("default-vr-box", r.active().id)
        assertTrue("seed is persisted", storage.writes > 0)
        assertTrue(r.all.all { it.builtin })
    }

    @Test
    fun profilesSurviveRestartThroughStorage() {
        val storage = FileTextStorage(File(tmp.root, "profiles.json"))
        val r1 = repo(storage)
        val created = r1.create("My Layout", baseId = "joycon-left")
        r1.setActive(created.id)
        val r2 = repo(storage)
        assertEquals(created.id, r2.active().id)
        assertEquals("My Layout", r2.active().name)
        assertEquals(r1.get("joycon-left")!!.mappings, r2.active().mappings)
        assertFalse(File(tmp.root, "profiles.json.tmp").exists())
    }

    @Test
    fun createRenameDuplicateDelete() {
        val r = repo()
        val p = r.create("Racing")
        assertTrue(p.mappings.isEmpty())
        assertEquals(TestConfig.defaults().template.left, p.left)
        val renamed = r.rename(p.id, "Racing V2")
        assertEquals("Racing V2", renamed.name)
        val copy = r.duplicate(p.id)
        assertEquals("Racing V2 (cópia)", copy.name)
        assertNotEquals(p.id, copy.id)
        assertEquals("unique names keep the typed casing", "racing v2 (2)", r.create("racing v2").name)
        r.delete(copy.id)
        assertEquals(null, r.get(copy.id))
    }

    @Test
    fun cannotDeleteTheLastProfile() {
        val r = repo()
        r.all.drop(1).forEach { r.delete(it.id) }
        try {
            r.delete(r.all.single().id)
            fail("expected ProfileException")
        } catch (e: ProfileException) {
            assertEquals("Precisa existir pelo menos um perfil", e.message)
        }
    }

    @Test
    fun deletingTheActiveProfileActivatesAnother() {
        val r = repo()
        r.delete("default-vr-box")
        assertEquals("joycon-left", r.active().id)
    }

    @Test
    fun exportImportRoundTrip() {
        val r = repo()
        val text = r.exportJson("joycon-right")
        val json = JSONObject(text)
        assertEquals("vrbq-profile", json.getString("type"))
        val imported = r.importJson(text)
        assertTrue(imported.warnings.isEmpty())
        val original = r.get("joycon-right")!!
        assertEquals(original.mappings, imported.profile.mappings)
        assertEquals(original.right, imported.profile.right)
        assertEquals("Joy-Con direito (2)", imported.profile.name)
        assertFalse(imported.profile.builtin)
    }

    @Test
    fun importRejectsGarbageAndDropsInvalidRules() {
        val r = repo()
        for (bad in listOf("not json", "{}", "{\"type\":\"vrbq-profile\",\"schema\":99,\"profile\":{\"id\":\"x\",\"name\":\"n\"}}")) {
            try {
                r.importJson(bad)
                fail("expected failure for $bad")
            } catch (e: ProfileException) {
                assertNotNull(e.message)
            }
        }
        val partial = """{"name":"Partial","mappings":[{"source":"key:BUTTON_A","target":"right.a"},{"source":"mouse:x","target":"right.a"},{"source":"<script>","target":"left.up"}]}"""
        val result = r.importJson(partial)
        assertEquals(1, result.profile.mappings.size)
        assertEquals(2, result.warnings.size)
    }

    @Test
    fun corruptFileIsResetWithBackup() {
        val file = File(tmp.root, "profiles.json")
        file.writeText("{ broken")
        val r = repo(FileTextStorage(file))
        assertEquals(4, r.all.size)
        assertTrue(File(tmp.root, "profiles.json.corrupt").exists())
        assertTrue(r.loadWarnings.isNotEmpty())
    }

    @Test
    fun restoreProfileAndDefaults() {
        val r = repo()
        val edited = r.get("default-vr-box")!!.copy(mappings = emptyList(), left = StickConfig(smoothing = 0.9f))
        r.update(edited)
        assertTrue(r.get("default-vr-box")!!.mappings.isEmpty())
        val restored = r.restoreProfile("default-vr-box")
        assertEquals(TestConfig.defaults().initialById("default-vr-box")!!.mappings, restored.mappings)

        val custom = r.create("Mine")
        r.update(r.get("joycon-left")!!.copy(name = "Changed"))
        r.restoreDefaults()
        assertEquals("Joy-Con esquerdo", r.get("joycon-left")!!.name)
        assertNotNull("custom profiles are kept", r.get(custom.id))
    }

    @Test
    fun codecClampsValues() {
        val json = JSONObject(
            """{"id":"p","name":"  Clamp  ","sticks":{"left":{"mode":"virtual_stick","smoothing":5,"returnSpeed":-3,
               "x":{"sensitivity":100,"deadzone":2,"curve":0,"max":0,"invert":true}}},"buttons":{"analogThreshold":0}}""",
        )
        val p = ProfileCodec.decode(json).profile
        assertEquals("Clamp", p.name)
        assertEquals(0.95f, p.left.smoothing, 0f)
        assertEquals(0f, p.left.returnSpeed, 0f)
        assertEquals(10f, p.left.x.sensitivity, 0f)
        assertEquals(0.9f, p.left.x.deadzone, 0f)
        assertEquals(0.2f, p.left.x.curve, 0f)
        assertEquals(0.05f, p.left.x.max, 0f)
        assertTrue(p.left.x.invert)
        assertEquals(0.05f, p.buttons.analogThreshold, 0f)
    }

    @Test
    fun encodeDecodeIsLossless() {
        val p = TestConfig.defaults().initialById("default-vr-box")!!.copy(
            mappings = listOf(MappingRule("m1", "axis:X", "left.up", invert = true, threshold = 0.3f, scale = 2f)),
        )
        val back = ProfileCodec.decode(ProfileCodec.encode(p)).profile
        assertEquals(p, back)
    }
}
