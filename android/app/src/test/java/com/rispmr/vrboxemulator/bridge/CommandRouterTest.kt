package com.rispmr.vrboxemulator.bridge

import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** Kotlin side of the Kotlin <-> JavaScript contract (the JS side is tests/frontend/bridge.test.mjs). */
class CommandRouterTest {
    private val router = CommandRouter()
    private val out = ArrayList<JSONObject>()
    private fun send(text: String) = router.handle(text) { out += JSONObject(it) }

    @Test
    fun syncCommandReplies() {
        router.on("math.add") { args -> args.getInt("a") + args.getInt("b") }
        send("""{"id":1,"cmd":"math.add","args":{"a":2,"b":3}}""")
        val r = out.single()
        assertEquals("reply", r.getString("type"))
        assertEquals(1, r.getInt("id"))
        assertTrue(r.getBoolean("ok"))
        assertEquals(5, r.getInt("result"))
    }

    @Test
    fun errorsAreReturnedWithCode() {
        router.on("fail") { throw CommandException("Nope", "custom") }
        router.on("crash") { throw IllegalStateException("boom") }
        send("""{"id":"a","cmd":"fail"}""")
        send("""{"id":"b","cmd":"crash"}""")
        send("""{"id":"c","cmd":"missing"}""")
        assertEquals(listOf("custom", "internal", "unknown_command"), out.map { it.getString("code") })
        assertTrue(out.none { it.getBoolean("ok") })
        assertEquals("Nope", out[0].getString("error"))
    }

    @Test
    fun asyncCommandRepliesOnlyOnce() {
        var pending: Reply? = null
        router.onAsync("dialog") { _, reply -> pending = reply }
        send("""{"id":9,"cmd":"dialog","args":{}}""")
        assertTrue(out.isEmpty())
        pending!!.ok(mapOf("granted" to true, "list" to listOf(1, 2)))
        pending!!.fail(CommandException("late"))
        val r = out.single()
        assertTrue(r.getJSONObject("result").getBoolean("granted"))
        assertEquals(2, r.getJSONObject("result").getJSONArray("list").length())
    }

    @Test
    fun nullAndUnitResultsBecomeJsonNull() {
        router.on("nothing") { null }
        router.on("unit") { }
        send("""{"id":1,"cmd":"nothing"}""")
        send("""{"id":2,"cmd":"unit"}""")
        assertTrue(out.all { it.isNull("result") && it.getBoolean("ok") })
    }

    @Test
    fun malformedMessagesAreIgnored() {
        router.on("x") { 1 }
        send("not json")
        send("""{"cmd":"x"}""") // no id: nobody waits for an answer
        send("[1,2]")
        assertTrue(out.isEmpty())
        assertFalse(router.commands().isEmpty())
    }
}
