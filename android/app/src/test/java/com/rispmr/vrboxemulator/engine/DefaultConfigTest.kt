package com.rispmr.vrboxemulator.engine

import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File

/** Validates the shipped JSON files in config/ against the engine. */
class DefaultConfigTest {

    @Test
    fun everyInitialRuleIsValidAndAccepted() {
        val raw = JSONObject(File(TestConfig.configDir, "controller-profiles.json").readText()).getJSONArray("profiles")
        val defaults = TestConfig.defaults()
        for (i in 0 until raw.length()) {
            val declared = raw.getJSONObject(i).getJSONArray("mappings").length()
            val p = defaults.initial[i]
            assertEquals("no rule dropped in ${p.name}", declared, p.mappings.size)
            val mapper = ControllerMapper().apply { configure(p.mappings, p.buttons) }
            assertTrue("rejected rules in ${p.name}: ${mapper.rejected}", mapper.rejected.isEmpty())
            assertEquals("unique ids in ${p.name}", p.mappings.size, p.mappings.map { it.id }.toSet().size)
        }
    }

    @Test
    fun initialProfilesMatchTheSpecification() {
        val d = TestConfig.defaults()
        assertEquals(listOf("Default VR Box", "Quest Touch Left", "Quest Touch Right", "Custom Profile"), d.initial.map { it.name })
        val left = d.initialById("quest-touch-left")!!
        assertTrue(left.isConfigured(Hand.LEFT))
        assertTrue("left profile only drives the left controller", !left.isConfigured(Hand.RIGHT))
        val right = d.initialById("quest-touch-right")!!
        assertTrue(right.isConfigured(Hand.RIGHT) && !right.isConfigured(Hand.LEFT))
        assertTrue(d.initialById("custom-profile")!!.mappings.isEmpty())
        val def = d.initialById("default-vr-box")!!
        // Examples from the specification.
        for ((s, t) in listOf("mouse:btn:primary" to "right.a", "mouse:btn:secondary" to "right.b", "key:BUTTON_1" to "left.x", "key:BUTTON_2" to "left.y", "mouse:x" to "left.stick.x")) {
            assertTrue("$s -> $t", def.mappings.any { it.source == s && it.target == t })
        }
    }

    @Test
    fun templateHasNoMappingsAndSaneSticks() {
        val t = TestConfig.defaults().template
        assertTrue(t.mappings.isEmpty())
        assertEquals(StickMode.VIRTUAL_STICK, t.left.mode)
        assertEquals(StickMode.RELATIVE_MOUSE, t.right.mode)
    }
}
