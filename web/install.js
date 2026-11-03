import { installWebBackend } from './backend.js';

// The build injects the default profiles (config/*.json) as window.__VRBQ_DEFAULTS__.
if (!window.VRBQNative && !window.VRBQAndroid && window.__VRBQ_DEFAULTS__) {
  installWebBackend(window, window.__VRBQ_DEFAULTS__);
}
