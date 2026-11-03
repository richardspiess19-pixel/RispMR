package com.rispmr.vrboxemulator

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.Settings

/**
 * Runtime permissions.
 *
 * The app only needs ONE dangerous permission: `BLUETOOTH_CONNECT` (Android 12+), used to list
 * paired Bluetooth devices and observe their connection state. Reading controller input does
 * not need any permission, so the app keeps working (with less information) when it is denied.
 *
 * Not requested on purpose: BLUETOOTH_SCAN / location (pairing is done in system settings),
 * notifications / foreground service (input only reaches the focused app anyway).
 */
class PermissionManager(private val activity: Activity) {

    enum class State(val key: String) {
        GRANTED("granted"),
        NOT_REQUIRED("not_required"),
        DENIED("denied"),
        PERMANENTLY_DENIED("permanently_denied"),
    }

    private val prefs = activity.getSharedPreferences("vrbq_permissions", Context.MODE_PRIVATE)
    private var pending: ((State) -> Unit)? = null

    val bluetoothPermissions: Array<String>
        get() = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) arrayOf(Manifest.permission.BLUETOOTH_CONNECT) else emptyArray()

    fun bluetoothState(): State {
        val perms = bluetoothPermissions
        if (perms.isEmpty()) return State.NOT_REQUIRED
        if (perms.all { activity.checkSelfPermission(it) == PackageManager.PERMISSION_GRANTED }) return State.GRANTED
        val askedBefore = prefs.getBoolean(KEY_ASKED, false)
        val rationale = perms.any { activity.shouldShowRequestPermissionRationale(it) }
        return if (askedBefore && !rationale) State.PERMANENTLY_DENIED else State.DENIED
    }

    fun hasBluetooth(): Boolean = bluetoothState().let { it == State.GRANTED || it == State.NOT_REQUIRED }

    fun requestBluetooth(callback: (State) -> Unit) {
        val state = bluetoothState()
        if (state == State.GRANTED || state == State.NOT_REQUIRED || state == State.PERMANENTLY_DENIED) {
            callback(state)
            return
        }
        pending?.invoke(State.DENIED)
        pending = callback
        prefs.edit().putBoolean(KEY_ASKED, true).apply()
        activity.requestPermissions(bluetoothPermissions, REQUEST_CODE)
    }

    fun onRequestPermissionsResult(requestCode: Int) {
        if (requestCode != REQUEST_CODE) return
        val cb = pending
        pending = null
        cb?.invoke(bluetoothState())
    }

    fun openAppSettings() {
        activity.startActivity(
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", activity.packageName, null))
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK),
        )
    }

    companion object {
        const val REQUEST_CODE = 4101
        private const val KEY_ASKED = "bt_asked"
    }
}
