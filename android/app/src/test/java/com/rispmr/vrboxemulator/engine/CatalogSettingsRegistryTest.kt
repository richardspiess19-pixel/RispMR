package com.rispmr.vrboxemulator.engine

import android.view.InputDevice
import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Assert.fail
import org.junit.Test

class InputCatalogTest {
    @Test
    fun labelsMatchTheSpecification() {
        assertEquals("Botão esquerdo do mouse", InputCatalog.labelOf("mouse:btn:primary"))
        assertEquals("Botão direito do mouse", InputCatalog.labelOf("mouse:btn:secondary"))
        assertEquals("Movimento do mouse (X)", InputCatalog.labelOf("mouse:x"))
        assertEquals("Movimento do mouse (Y)", InputCatalog.labelOf("mouse:y"))
        assertEquals("Botão A (gamepad)", InputCatalog.labelOf("key:BUTTON_A"))
        assertEquals("Botão L1 (gamepad)", InputCatalog.labelOf("key:BUTTON_L1"))
        assertEquals("Clique do analógico esquerdo", InputCatalog.labelOf("key:BUTTON_THUMBL"))
        assertEquals("Botão 1", InputCatalog.labelOf("key:BUTTON_1"))
        assertEquals("D-pad cima", InputCatalog.labelOf("key:DPAD_UP"))
        assertEquals("Volume +", InputCatalog.labelOf("key:VOLUME_UP"))
        assertEquals("Play/pause", InputCatalog.labelOf("key:MEDIA_PLAY_PAUSE"))
        assertEquals("Tecla Enter", InputCatalog.labelOf("key:ENTER"))
        assertEquals("Tecla código 289", InputCatalog.labelOf("key:289"))
        assertEquals("Tecla A", InputCatalog.labelOf("key:A"))
        assertEquals("Eixo X do joystick", InputCatalog.labelOf("axis:X"))
        assertEquals("Eixo Y do joystick → cima", InputCatalog.labelOf("axis:Y:-"))
        assertEquals("D-pad horizontal → direita", InputCatalog.labelOf("axis:HAT_X:+"))
        assertEquals("Roda do mouse para cima", InputCatalog.labelOf("mouse:wheel:up"))
    }

    @Test
    fun kindsAndValidation() {
        assertEquals(SourceKind.RELATIVE, InputCatalog.kindOf("mouse:x"))
        assertEquals(SourceKind.ANALOG, InputCatalog.kindOf("axis:RZ"))
        assertEquals(SourceKind.DIGITAL, InputCatalog.kindOf("axis:RZ:-"))
        assertEquals(SourceKind.DIGITAL, InputCatalog.kindOf("key:BUTTON_A"))
        for (bad in listOf("", "key:", "key:button_a", "mouse:z", "axis:X:*", "<img>", "key:A B")) assertNull(bad, InputCatalog.kindOf(bad))
    }

    @Test
    fun targetCatalogCoversBothQuestControllers() {
        val ids = VirtualTargets.all.map { it.id }.toSet()
        for (id in listOf("left.stick.x", "left.stickClick", "left.x", "left.y", "left.grip", "left.trigger", "left.menu", "right.stick.y", "right.stickClick", "right.a", "right.b", "right.grip", "right.trigger", "right.system")) {
            assertTrue(id, id in ids)
        }
        assertFalse(VirtualTargets.isCompatible(SourceKind.RELATIVE, TargetType.BUTTON))
        assertTrue(VirtualTargets.isCompatible(SourceKind.RELATIVE, TargetType.STICK_AXIS))
        assertTrue(VirtualTargets.isCompatible(SourceKind.DIGITAL, TargetType.ANALOG))
    }
}

class AppSettingsTest {
    @Test
    fun mergeValidatesUserInput() {
        val s = AppSettingsCodec.merge(AppSettings(), JSONObject("""{"logSize":500,"udp":{"enabled":true,"host":"192.168.0.20","port":5000,"rateHz":120,"format":"binary"}}"""))
        assertEquals(500, s.logSize)
        assertEquals(UdpSettings(true, "192.168.0.20", 5000, 120, "binary"), s.udp)
        for (bad in listOf("""{"udp":{"port":70000}}""", """{"udp":{"host":"bad host!"}}""", """{"udp":{"format":"xml"}}""", """{"logSize":3}""", """{"udp":{"rateHz":1000}}""")) {
            try {
                AppSettingsCodec.merge(AppSettings(), JSONObject(bad))
                fail("expected SettingsException for $bad")
            } catch (e: SettingsException) {
                // expected
            }
        }
    }

    @Test
    fun decodeIsTolerant() {
        assertEquals(AppSettings(), AppSettingsCodec.decode(null))
        assertEquals(AppSettings(), AppSettingsCodec.decode("garbage"))
        val s = AppSettings(reduceMotion = true, lastDeviceKey = "VR BOX#05ac:022c", udp = UdpSettings(enabled = true))
        assertEquals(s, AppSettingsCodec.decode(AppSettingsCodec.encode(s).toString()))
    }

    @Test
    fun identifiedInputsAreStoredPerDevice() {
        val storage = MemoryStorage()
        val store = IdentifiedInputsStore(storage)
        assertTrue(store.record("dev1", "key:BUTTON_A", SourceKind.DIGITAL, 1))
        assertFalse(store.record("dev1", "key:BUTTON_A", SourceKind.DIGITAL, 2))
        store.record("dev2", "mouse:x", SourceKind.RELATIVE, 3)
        store.save()
        val reloaded = IdentifiedInputsStore(storage).apply { load() }
        assertEquals(2, reloaded.list("dev1").single().count)
        assertEquals("Movimento do mouse (X)", reloaded.list("dev2").single().label)
        assertEquals(0, reloaded.count(null))
    }
}

class DeviceRegistryTest {
    private fun info(id: Int, name: String, sources: Int, external: Boolean? = true, keyboardType: Int = 0) =
        InputDeviceInfo(id, name, "desc$id", 0x05ac, 0x022c, sources, keyboardType, external, false, 0, emptyList(), emptyList())

    @Test
    fun sourceConstantsMatchTheAndroidSdk() {
        assertEquals(InputDevice.SOURCE_KEYBOARD, Sources.KEYBOARD)
        assertEquals(InputDevice.SOURCE_DPAD, Sources.DPAD)
        assertEquals(InputDevice.SOURCE_GAMEPAD, Sources.GAMEPAD)
        assertEquals(InputDevice.SOURCE_TOUCHSCREEN, Sources.TOUCHSCREEN)
        assertEquals(InputDevice.SOURCE_MOUSE, Sources.MOUSE)
        assertEquals(InputDevice.SOURCE_STYLUS, Sources.STYLUS)
        assertEquals(InputDevice.SOURCE_TRACKBALL, Sources.TRACKBALL)
        assertEquals(InputDevice.SOURCE_MOUSE_RELATIVE, Sources.MOUSE_RELATIVE)
        assertEquals(InputDevice.SOURCE_TOUCHPAD, Sources.TOUCHPAD)
        assertEquals(InputDevice.SOURCE_JOYSTICK, Sources.JOYSTICK)
    }

    @Test
    fun vrBoxMouseAndKeyboardNodesAreOneController() {
        val r = DeviceRegistry()
        val events = r.replaceAll(listOf(info(7, "VR BOX", Sources.MOUSE), info(8, "VR BOX", Sources.KEYBOARD), info(2, "gpio-keys", Sources.KEYBOARD, external = false)))
        val g = r.groups().single()
        assertEquals("VR BOX", g.name)
        assertEquals(listOf("Mouse", "Teclas/botões"), g.roles)
        assertEquals("Mouse", g.primaryType)
        assertTrue(g.likelyVrBox)
        assertEquals(1, events.count { it is RegistryEvent.Connected && it.group.name == "VR BOX" })
        assertEquals("internal device listed on request", 2, r.groups(includeInternal = true).size)
        assertEquals(g.key, r.groupKeyFor(8))
        assertEquals(g.key, r.bestCandidate(null)!!.key)
    }

    @Test
    fun disconnectionAndReconnectionAreDetected() {
        val r = DeviceRegistry()
        r.put(info(7, "VR BOX", Sources.MOUSE))
        r.put(info(8, "VR BOX", Sources.KEYBOARD))
        assertTrue("one node left: still connected", r.remove(7).isEmpty())
        val gone = r.remove(8).single()
        assertTrue(gone is RegistryEvent.Disconnected)
        assertFalse(r.isConnected(DeviceGroup.keyOf(info(7, "VR BOX", 0))))
        assertEquals("VR BOX", r.lastKnown(DeviceGroup.keyOf(info(7, "VR BOX", 0)))!!.name)
        val back = r.put(info(12, "VR BOX", Sources.MOUSE)).single() as RegistryEvent.Connected
        assertTrue(back.reconnected)
    }

    @Test
    fun gamepadModeIsClassified() {
        val g = DeviceGroup("k", "Gamepad", 1, 2, listOf(info(3, "Gamepad", Sources.GAMEPAD or Sources.JOYSTICK or Sources.DPAD)))
        assertEquals("Gamepad/joystick", g.primaryType)
        assertTrue(g.roles.containsAll(listOf("Gamepad", "Joystick", "D-pad")))
        assertFalse(g.likelyVrBox)
    }

    @Test
    fun ambiguousCandidatesAreNotAutoSelected() {
        val r = DeviceRegistry()
        r.replaceAll(listOf(info(3, "Mouse A", Sources.MOUSE), info(4, "Keyboard B", Sources.KEYBOARD, keyboardType = 2)))
        assertNull(r.bestCandidate(null))
        val remembered = r.groups().first().key
        assertEquals(remembered, r.bestCandidate(remembered)!!.key)
    }
}
