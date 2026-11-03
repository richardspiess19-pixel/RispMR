package com.rispmr.vrboxemulator.bridge

import android.os.Handler
import android.os.Looper
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.webkit.JavaScriptReplyProxy
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import org.json.JSONObject

/**
 * Kotlin <-> JavaScript transport.
 *
 * Preferred: `WebViewCompat.addWebMessageListener` — injects `window.VRBQNative`, accepts messages
 * only from the app's own asset origin and gives a reply proxy for native -> JS pushes.
 * Fallback (very old WebView): `addJavascriptInterface` (`window.VRBQAndroid`) + `evaluateJavascript`.
 *
 * All callbacks run on the main thread.
 */
class WebBridge(private val webView: WebView, private val router: CommandRouter) {
    private val main = Handler(Looper.getMainLooper())
    private var replyProxy: JavaScriptReplyProxy? = null

    val transport: String

    init {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) {
            WebViewCompat.addWebMessageListener(webView, JS_OBJECT, setOf(ORIGIN)) { _, message, _, isMainFrame, proxy ->
                if (!isMainFrame) return@addWebMessageListener
                replyProxy = proxy
                val data = message.data ?: return@addWebMessageListener
                router.handle(data) { send(it) }
            }
            transport = "WebMessageListener"
        } else {
            webView.addJavascriptInterface(FallbackInterface(), JS_FALLBACK_OBJECT)
            transport = "JavascriptInterface"
        }
    }

    /** Sends a message to JavaScript. Must be called on the main thread. */
    fun send(json: String) {
        val proxy = replyProxy
        if (proxy != null) {
            proxy.postMessage(json)
        } else if (transport == "JavascriptInterface") {
            webView.evaluateJavascript("window.__vrbqReceive&&window.__vrbqReceive(${JSONObject.quote(json)})", null)
        }
        // With WebMessageListener nothing can be pushed before the page said hello; the page
        // requests a full state with `app.hello` as its first message, so nothing is lost.
    }

    fun push(type: String, payload: JSONObject) {
        payload.put("type", type)
        send(payload.toString())
    }

    /** A new page is loading: the previous reply proxy belongs to the old page. */
    fun onPageStarted() {
        replyProxy = null
    }

    private inner class FallbackInterface {
        @JavascriptInterface
        fun postMessage(message: String) {
            // Called on a WebView binder thread: hop to main.
            main.post { router.handle(message) { send(it) } }
        }
    }

    companion object {
        const val HOST = "appassets.androidplatform.net"
        const val ORIGIN = "https://$HOST"
        const val START_URL = "$ORIGIN/assets/www/index.html"
        const val JS_OBJECT = "VRBQNative"
        const val JS_FALLBACK_OBJECT = "VRBQAndroid"
    }
}
