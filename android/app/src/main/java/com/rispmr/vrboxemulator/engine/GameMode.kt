package com.rispmr.vrboxemulator.engine

import org.json.JSONObject

/**
 * Modo jogo: while emulation runs, the game that is open on the phone receives a virtual gamepad
 * driven by the VR Box (see [VirtualGamepad]). The Shizuku service does the work; this is only
 * the user's on/off choice.
 */
data class GameModeConfig(val enabled: Boolean = true)

object GameModeCodec {
    fun encode(c: GameModeConfig): JSONObject = JSONObject().put("enabled", c.enabled)

    /** Lenient: settings saved by older versions (touch layouts) keep only "enabled". */
    fun decode(o: JSONObject?, fallback: GameModeConfig = GameModeConfig()): GameModeConfig {
        if (o == null) return fallback
        return GameModeConfig(enabled = o.optBoolean("enabled", fallback.enabled))
    }
}
