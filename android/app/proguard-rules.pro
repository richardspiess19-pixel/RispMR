# Methods called from JavaScript (fallback bridge) must keep their names.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
