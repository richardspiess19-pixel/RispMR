// Application state mirrored from the native side, plus a tiny pub/sub.

export const LOG_DEFAULT = 200;

export function createStore() {
  const state = {
    native: false,
    info: null,
    status: null,
    catalog: { targets: [], buttons: { left: [], right: [] } },
    settings: null,
    profile: null,
    profiles: [],
    devices: { groups: [], selectedKey: null },
    identified: { deviceKey: null, inputs: [] },
    log: [],
    frame: null,
    stats: null,
    detections: [],
  };

  const subs = new Map();

  function on(topic, fn) {
    if (!subs.has(topic)) subs.set(topic, new Set());
    subs.get(topic).add(fn);
    return () => subs.get(topic)?.delete(fn);
  }

  function emit(topic, payload, meta) {
    const set = subs.get(topic);
    if (!set) return;
    for (const fn of [...set]) {
      try {
        fn(payload, meta);
      } catch (e) {
        console.error(`store listener "${topic}" failed`, e);
      }
    }
  }

  function set(key, value, meta) {
    state[key] = value;
    emit(key, value, meta);
  }

  function logLimit() {
    return state.settings?.logSize || LOG_DEFAULT;
  }

  /** Appends log entries (oldest first) and keeps the configured size. */
  function appendLog(entries) {
    if (!entries || entries.length === 0) return [];
    state.log.push(...entries);
    const max = logLimit();
    if (state.log.length > max) state.log.splice(0, state.log.length - max);
    emit('log', entries);
    return entries;
  }

  /** Applies a "frame" push: virtual + physical state, new events, optional stats. */
  function applyFrame(msg) {
    state.frame = { v: msg.v, p: msg.p };
    if (msg.stats) {
      state.stats = msg.stats;
      emit('stats', msg.stats);
    }
    const events = msg.events ? appendLog(msg.events) : [];
    emit('frame', state.frame);
    return events;
  }

  function addDetection(d) {
    state.detections.unshift(d);
    if (state.detections.length > 30) state.detections.length = 30;
    emit('detected', d);
  }

  /** Initial state from `app.hello`. */
  function init(hello) {
    state.native = true;
    state.info = hello.info;
    state.status = hello.status;
    state.catalog = hello.catalog;
    state.settings = hello.settings;
    state.profile = hello.profile;
    state.profiles = hello.profiles;
    state.devices = hello.devices;
    state.identified = hello.identified;
    state.log = hello.log || [];
    if (hello.frame) {
      state.frame = { v: hello.frame.v, p: hello.frame.p };
      state.stats = hello.frame.stats || null;
    }
    emit('init', state);
  }

  return { state, on, emit, set, appendLog, applyFrame, addDetection, init };
}
