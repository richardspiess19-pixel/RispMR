# Methods called from JavaScript (fallback bridge) must keep their names.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# The virtual gamepad service is started by name inside the Shizuku process.
-keep class com.rispmr.vrboxemulator.gamepad.UhidUserService { *; }
