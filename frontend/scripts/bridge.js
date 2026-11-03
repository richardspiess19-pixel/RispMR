// JavaScript side of the Kotlin <-> JS bridge.
//
// Transport (provided by the Android app):
//   - window.VRBQNative  (WebViewCompat.addWebMessageListener, preferred)
//   - window.VRBQAndroid (addJavascriptInterface fallback; native answers via window.__vrbqReceive)
//
// Request : {"id": 1, "cmd": "profiles.list", "args": {}}
// Reply   : {"type": "reply", "id": 1, "ok": true, "result": ...}
// Push    : {"type": "frame" | "status" | "devices" | "identified" | "detected", ...}

export class NativeUnavailableError extends Error {
  constructor() {
    super('Android native bridge not available (browser preview).');
    this.code = 'no_native';
  }
}

export function createBridge(env = globalThis) {
  const native = env.VRBQNative || null;
  const fallback = !native && env.VRBQAndroid ? env.VRBQAndroid : null;
  const transport = native || fallback;
  const pending = new Map();
  const listeners = new Set();
  let nextId = 1;

  function receive(raw) {
    let msg;
    try {
      msg = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      return;
    }
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'reply') {
      const entry = pending.get(msg.id);
      if (!entry) return;
      pending.delete(msg.id);
      if (entry.timer) clearTimeout(entry.timer);
      if (msg.ok) {
        entry.resolve(msg.result);
      } else {
        const err = new Error(msg.error || 'Error');
        err.code = msg.code || 'error';
        entry.reject(err);
      }
      return;
    }
    for (const fn of listeners) {
      try {
        fn(msg);
      } catch (e) {
        console.error('bridge listener failed', e);
      }
    }
  }

  if (native) {
    if (typeof native.addEventListener === 'function') {
      native.addEventListener('message', (event) => receive(event.data));
    } else {
      native.onmessage = (event) => receive(event.data);
    }
  }
  if (fallback) env.__vrbqReceive = receive;

  return {
    available: Boolean(transport),
    transport: native ? 'WebMessageListener' : fallback ? 'JavascriptInterface' : 'none',

    /**
     * Calls a native command. `timeout: 0` disables the timeout (dialogs, file pickers).
     */
    call(cmd, args = {}, { timeout = 15000 } = {}) {
      if (!transport) return Promise.reject(new NativeUnavailableError());
      const id = nextId++;
      return new Promise((resolve, reject) => {
        const timer =
          timeout > 0
            ? setTimeout(() => {
                pending.delete(id);
                const err = new Error(`Native call timed out: ${cmd}`);
                err.code = 'timeout';
                reject(err);
              }, timeout)
            : null;
        pending.set(id, { resolve, reject, timer });
        try {
          transport.postMessage(JSON.stringify({ id, cmd, args }));
        } catch (e) {
          pending.delete(id);
          if (timer) clearTimeout(timer);
          reject(e);
        }
      });
    },

    onPush(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    pendingCount() {
      return pending.size;
    },

    /** Exposed for tests. */
    _receive: receive,
  };
}
