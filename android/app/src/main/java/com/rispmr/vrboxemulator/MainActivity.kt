package com.rispmr.vrboxemulator

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.graphics.Bitmap
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.View
import android.view.WindowInsets
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.webkit.WebViewAssetLoader
import com.rispmr.vrboxemulator.bridge.WebBridge

/**
 * Hosts the HTML/CSS/JS interface in a WebView and routes every input event to [AppController].
 *
 * Input interception happens at Activity level (before the view hierarchy), so controller
 * events can be read and optionally consumed while touch input keeps driving the UI.
 */
class MainActivity : Activity() {
    private lateinit var webView: WebView
    private lateinit var app: AppController

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val debuggable = applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0
        WebView.setWebContentsDebuggingEnabled(debuggable)

        val root = FrameLayout(this).apply { setBackgroundColor(Color.BLACK) }
        webView = WebView(this).apply {
            setBackgroundColor(Color.BLACK)
            isFocusable = true
            isFocusableInTouchMode = true
            overScrollMode = View.OVER_SCROLL_NEVER
        }
        root.addView(webView, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))
        setContentView(root)
        applyInsets(root)

        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            setSupportZoom(false)
            builtInZoomControls = false
            mediaPlaybackRequiresUserGesture = true
            setGeolocationEnabled(false)
        }

        val assetLoader = WebViewAssetLoader.Builder()
            .setDomain(WebBridge.HOST)
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        app = AppController(this, webView)

        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                assetLoader.shouldInterceptRequest(request.url)

            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val url = request.url
                if (url.host == WebBridge.HOST) return false
                // External links open in the browser; nothing remote is loaded inside the app.
                if (url.scheme == "https") runCatching { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url.toString()))) }
                return true
            }

            override fun onPageStarted(view: WebView, url: String?, favicon: Bitmap?) {
                app.onPageStarted()
            }
        }
        webView.setOnCapturedPointerListener { _, event -> app.onCapturedPointer(event) }
        webView.loadUrl(WebBridge.START_URL)
        webView.requestFocus()
    }

    private fun applyInsets(root: View) {
        root.setOnApplyWindowInsetsListener { v, insets ->
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                val bars = insets.getInsets(WindowInsets.Type.systemBars() or WindowInsets.Type.displayCutout())
                v.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            } else {
                @Suppress("DEPRECATION")
                v.setPadding(insets.systemWindowInsetLeft, insets.systemWindowInsetTop, insets.systemWindowInsetRight, insets.systemWindowInsetBottom)
            }
            insets
        }
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean = app.onKeyEvent(event) || super.dispatchKeyEvent(event)

    override fun dispatchGenericMotionEvent(ev: MotionEvent): Boolean = app.onMotionEvent(ev) || super.dispatchGenericMotionEvent(ev)

    override fun dispatchTouchEvent(ev: MotionEvent): Boolean = app.onMotionEvent(ev) || super.dispatchTouchEvent(ev)

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        app.onWindowFocusChanged(hasFocus)
    }

    override fun onPointerCaptureChanged(hasCapture: Boolean) {
        super.onPointerCaptureChanged(hasCapture)
        app.onPointerCaptureChanged(hasCapture)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        app.onResume()
    }

    override fun onPause() {
        app.onPause()
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        app.onDestroy()
        webView.destroy()
        super.onDestroy()
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        app.permissions.onRequestPermissionsResult(requestCode)
    }

    @Deprecated("Activity result API of the platform Activity")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        @Suppress("DEPRECATION")
        super.onActivityResult(requestCode, resultCode, data)
        app.onActivityResult(requestCode, resultCode, data)
    }

    @Deprecated("Platform back handling; the web UI keeps its own history")
    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack() else {
            @Suppress("DEPRECATION")
            super.onBackPressed()
        }
    }
}
