package com.rispmr.vrboxemulator.bridge

import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

/** Error returned to JavaScript as `{ ok: false, error, code }`. */
class CommandException(message: String, val code: String = "error") : Exception(message)

/** Completion callback for asynchronous commands (permission dialogs, file pickers...). */
interface Reply {
    fun ok(result: Any? = null)
    fun fail(error: CommandException)
}

/**
 * JavaScript -> Kotlin command dispatcher.
 *
 * Request:  `{"id": 7, "cmd": "profiles.list", "args": {...}}`
 * Response: `{"type": "reply", "id": 7, "ok": true, "result": ...}`
 *       or  `{"type": "reply", "id": 7, "ok": false, "error": "...", "code": "..."}`
 *
 * Pure Kotlin + org.json so it is covered by JVM unit tests.
 */
class CommandRouter {
    private val sync = HashMap<String, (JSONObject) -> Any?>()
    private val async = HashMap<String, (JSONObject, Reply) -> Unit>()

    /** Optional hook for unexpected exceptions (logging). */
    var onInternalError: ((String, Throwable) -> Unit)? = null

    fun on(name: String, handler: (JSONObject) -> Any?) {
        sync[name] = handler
    }

    fun onAsync(name: String, handler: (JSONObject, Reply) -> Unit) {
        async[name] = handler
    }

    fun commands(): Set<String> = sync.keys + async.keys

    fun handle(message: String, respond: (String) -> Unit) {
        if (message.length > MAX_MESSAGE_CHARS) return
        val request = try {
            JSONObject(message)
        } catch (e: JSONException) {
            return
        }
        val id = request.opt("id")
        if (id == null || id == JSONObject.NULL) return
        val cmd = request.optString("cmd")
        val args = request.optJSONObject("args") ?: JSONObject()
        val reply = OnceReply(id, respond)

        val syncHandler = sync[cmd]
        val asyncHandler = async[cmd]
        try {
            when {
                syncHandler != null -> reply.ok(syncHandler(args))
                asyncHandler != null -> asyncHandler(args, reply)
                else -> reply.fail(CommandException("Unknown command: $cmd", "unknown_command"))
            }
        } catch (e: CommandException) {
            reply.fail(e)
        } catch (e: Exception) {
            onInternalError?.invoke(cmd, e)
            reply.fail(CommandException(e.message ?: e.javaClass.simpleName, "internal"))
        }
    }

    private class OnceReply(private val id: Any, private val respond: (String) -> Unit) : Reply {
        private var done = false

        override fun ok(result: Any?) {
            if (done) return
            done = true
            respond(
                JSONObject()
                    .put("type", "reply")
                    .put("id", id)
                    .put("ok", true)
                    .put("result", toJsonValue(result))
                    .toString(),
            )
        }

        override fun fail(error: CommandException) {
            if (done) return
            done = true
            respond(
                JSONObject()
                    .put("type", "reply")
                    .put("id", id)
                    .put("ok", false)
                    .put("error", error.message ?: "Error")
                    .put("code", error.code)
                    .toString(),
            )
        }
    }

    companion object {
        const val MAX_MESSAGE_CHARS = 1_000_000

        fun toJsonValue(value: Any?): Any = when (value) {
            null, Unit -> JSONObject.NULL
            is JSONObject, is JSONArray, is String, is Boolean, is Int, is Long, is Double -> value
            is Float -> value.toDouble()
            is Collection<*> -> JSONArray().apply { value.forEach { put(toJsonValue(it)) } }
            is Map<*, *> -> JSONObject().apply { value.forEach { (k, v) -> put(k.toString(), toJsonValue(v)) } }
            else -> value.toString()
        }
    }
}
