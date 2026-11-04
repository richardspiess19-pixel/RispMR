// Web backend: implements the same message protocol as the Android bridge
// (window.VRBQNative) using browser APIs, so the very same interface runs in Chrome.
//
// Reads the VR Box through the Gamepad API (gamepad mode) and keyboard / mouse events
// (keyboard and mouse modes). Profiles live in localStorage. Things a web page cannot do
// (touching other apps, Bluetooth details, UDP) answer with a clear error.

import * as E from './engine.js';

const VERSION = '0.6.2';
const KM_KEY = 'web:km';
const STORE = { profiles: 'vrbq.profiles', settings: 'vrbq.settings', identified: 'vrbq.identified' };

const DEFAULT_SETTINGS = {
  autoSelectLastDevice: true,
  selectedDeviceOnly: true,
  consumeControllerInput: true,
  autoPointerCapture: false,
  showInternalDevices: false,
  reduceMotion: false,
  showRawCodes: false,
  logSize: 200,
  keepScreenOn: true,
  lastDeviceKey: null,
  udp: { enabled: false, host: '127.0.0.1', port: 47900, rateHz: 90, format: 'json' },
  game: { enabled: false, buttons: {}, leftStick: { enabled: false, x: 0.18, y: 0.72, radius: 0.12 }, rightStick: { enabled: false, x: 0.82, y: 0.72, radius: 0.12 } },
};

class WebError extends Error {
  constructor(message, code = 'error') {
    super(message);
    this.code = code;
  }
}

const APP_ONLY = () => {
  throw new WebError('Isso só funciona no app Android.', 'web_unsupported');
};

function storage(win) {
  return {
    get(key) {
      try {
        const v = win.localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        win.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* private mode / blocked storage: keep working in memory */
      }
    },
  };
}

const randomId = (prefix) => prefix + Math.random().toString(16).slice(2, 12);

function parseVidPid(id) {
  const m = /Vendor:\s*([0-9a-f]{4})\s*Product:\s*([0-9a-f]{4})/i.exec(id) || /^([0-9a-f]{4})-([0-9a-f]{4})-/i.exec(id);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16)] : [0, 0];
}

const VR_HINTS = ['vr box', 'vrbox', 'vr-box', 'vr park', 'vr-park', 'vrpark', 'bluetooth remote', 'vr remote', 'magicsee', 'shinecon'];

export function installWebBackend(win, rawDefaults) {
  const doc = win.document;
  const store = storage(win);
  const defaults = E.parseDefaults(rawDefaults.template, rawDefaults.initial);
  const clock = () => win.performance.now();

  // ---------------------------------------------------------------- state
  let settings = { ...DEFAULT_SETTINGS, ...(store.get(STORE.settings) || {}) };
  settings.udp = { ...DEFAULT_SETTINGS.udp, ...(settings.udp || {}) };
  const log = new E.EventLog(settings.logSize);
  const controllers = new E.VirtualControllers();
  const processor = new E.InputProcessor(controllers, log, clock);
  const identified = store.get(STORE.identified) || {};

  let profiles = [];
  let activeId = defaults.active;
  const saved = store.get(STORE.profiles);
  if (saved && Array.isArray(saved.profiles)) {
    for (const p of saved.profiles) {
      try {
        const d = E.decodeProfile(p, defaults.template).profile;
        if (!profiles.some((x) => x.id === d.id)) profiles.push(d);
      } catch {
        /* skip broken entry */
      }
    }
    if (profiles.some((p) => p.id === saved.activeProfileId)) activeId = saved.activeProfileId;
  }
  if (!profiles.length) {
    profiles = defaults.initial.map((p) => structuredClone(p));
    activeId = defaults.active;
  }
  let working = structuredClone(profiles.find((p) => p.id === activeId) || profiles[0]);
  let dirty = false;

  let selectedKey = settings.lastDeviceKey;
  let emulation = false;
  let detecting = false;
  let demo = null;
  let lastMouse = { dx: 0, dy: 0 };
  let mouseButtons = 0;
  const gamepadState = new Map(); // key -> { buttons: [], axes: [] }
  const knownGamepads = new Map(); // key -> group json
  let wakeLock = null;

  const listeners = new Set();
  const dirtyFlags = { frame: true, status: true, devices: false, identified: false, stats: true };
  let lastSentSeq = log.seq;
  let pageReady = false;
  let demoStart = 0;

  const send = (obj) => {
    const data = JSON.stringify(obj);
    for (const fn of listeners) fn({ data });
  };
  const pushNow = (type, payload) => pageReady && send({ type, ...payload });

  controllers.listener = (e) => log.add('virtual', E.describeVirtual(e));
  processor.onDetect = (d) => {
    pushNow('detected', { detection: { ...d, value: Math.round(d.value * 1000) / 1000, device: deviceName(d.device), demo: d.device === 'demo', t: Date.now(), alternatives: d.alternatives.map((id) => ({ id, label: E.labelOf(id), kind: E.kindOf(id) })) } });
  };
  processor.onIdentified = (id, kind) => {
    const key = demo ? 'demo' : processor.device;
    if (!key) return;
    const list = (identified[key] = identified[key] || {});
    const isNew = !list[id];
    list[id] = { id, kind, count: (list[id]?.count || 0) + 1, lastSeen: Date.now() };
    if (isNew) {
      dirtyFlags.status = true;
      dirtyFlags.identified = true;
    }
    saveIdentifiedSoon();
  };

  const saveProfiles = () => store.set(STORE.profiles, { schema: 1, activeProfileId: activeId, profiles });
  const saveSettings = () => store.set(STORE.settings, settings);
  let identifiedTimer = null;
  const saveIdentifiedSoon = () => {
    clearTimeout(identifiedTimer);
    identifiedTimer = setTimeout(() => store.set(STORE.identified, identified), 1500);
  };

  const applyWorking = () => {
    controllers.configure(working);
    controllers.onPhysical(processor.state, clock());
    dirtyFlags.status = true;
  };
  applyWorking();
  log.add('system', 'Versão web aberta');

  // ---------------------------------------------------------------- devices

  const kmGroup = () => ({
    key: KM_KEY,
    name: 'Teclado e mouse',
    vendorId: 0,
    productId: 0,
    vendor: null,
    vidPid: '—',
    primaryType: 'Mouse',
    roles: ['Mouse', 'Teclado'],
    external: true,
    likelyVrBox: false,
    candidate: true,
    axes: [],
    declaredKeys: [],
    nodes: [],
    connected: true,
  });

  function gamepadGroup(gp) {
    const name = gp.id.replace(/\s*\((STANDARD GAMEPAD\s*)?Vendor:.*$/i, '').trim() || `Gamepad ${gp.index + 1}`;
    const [vid, pid] = parseVidPid(gp.id);
    return {
      key: `gp:${gp.id}`,
      name,
      vendorId: vid,
      productId: pid,
      vendor: null,
      vidPid: vid || pid ? `${vid.toString(16).padStart(4, '0').toUpperCase()}:${pid.toString(16).padStart(4, '0').toUpperCase()}` : '—',
      primaryType: 'Gamepad/joystick',
      roles: ['Gamepad'],
      external: true,
      likelyVrBox: VR_HINTS.some((h) => gp.id.toLowerCase().includes(h)),
      candidate: true,
      axes: gp.axes.map((_, i) => E.gamepadAxisName(i, gp.mapping === 'standard')),
      declaredKeys: [],
      nodes: [{ id: gp.index, sources: gp.mapping === 'standard' ? 'standard' : 'gamepad', roles: ['Gamepad'], keyboardType: 0, controllerNumber: gp.index + 1, descriptor: '' }],
      connected: true,
    };
  }

  const gamepads = () => [...(win.navigator.getGamepads?.() || [])].filter(Boolean);

  const groups = () => [...gamepads().map(gamepadGroup), kmGroup()].sort((a, b) => Number(b.likelyVrBox) - Number(a.likelyVrBox));

  const groupByKey = (key) => groups().find((g) => g.key === key) || knownGamepads.get(key) || null;

  const isConnected = (key) => key === KM_KEY || gamepads().some((gp) => `gp:${gp.id}` === key);

  function deviceName(key) {
    if (key === 'demo') return 'VR Box de demonstração (simulado)';
    return groupByKey(key)?.name || key;
  }

  function select(key, auto) {
    const g = groupByKey(key);
    if (!g) throw new WebError('Esse dispositivo não está conectado', 'not_connected');
    if (selectedKey !== key) processor.releaseAll(null);
    selectedKey = key;
    settings.lastDeviceKey = key;
    saveSettings();
    log.add('system', `Controle selecionado${auto ? ' automaticamente' : ''}: ${g.name}`);
    dirtyFlags.status = dirtyFlags.devices = dirtyFlags.identified = true;
  }

  /**
   * Whether input of this device is read. Nothing chosen yet, or the chosen controller is off
   * (the VR Box changed mode and became another device): the first device that sends input wins.
   */
  function accept(key) {
    if (demo) return false;
    if (selectedKey === key) return true;
    if (selectedKey && !settings.selectedDeviceOnly) return true;
    if (!selectedKey || !isConnected(selectedKey)) {
      select(key, true);
      return true;
    }
    return false;
  }

  const readingActive = () => Boolean(demo) || (selectedKey != null && isConnected(selectedKey));

  win.addEventListener('gamepadconnected', (e) => {
    const g = gamepadGroup(e.gamepad);
    knownGamepads.set(g.key, g);
    log.add('system', `Dispositivo encontrado: ${g.name} (Gamepad)`);
    if (!selectedKey && settings.autoSelectLastDevice && settings.lastDeviceKey === g.key) select(g.key, true);
    if (selectedKey === g.key) log.add('system', `O controle voltou: ${g.name}`);
    dirtyFlags.devices = dirtyFlags.status = true;
  });

  win.addEventListener('gamepaddisconnected', (e) => {
    const key = `gp:${e.gamepad.id}`;
    log.add('system', `Dispositivo desconectado: ${knownGamepads.get(key)?.name || e.gamepad.id}`);
    gamepadState.delete(key);
    if (key === selectedKey) processor.releaseAll('controle desconectado');
    dirtyFlags.devices = dirtyFlags.status = true;
  });

  // ---------------------------------------------------------------- input

  // On a phone the only mouse is the VR Box in mouse mode; on a computer it is the user's.
  const touchDevice = () => (win.navigator.maxTouchPoints || 0) > 0;

  const typing = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

  function dispatch(events) {
    let changed = false;
    for (const ev of events) if (processor.process(ev)) changed = true;
    dirtyFlags.frame = true;
    return changed;
  }

  const onKey = (down) => (e) => {
    if (typing(e.target) || e.repeat) return;
    const name = E.keyNameFromEvent(e.code, e.key, e.keyCode || e.which || 0);
    if (!name || !accept(KM_KEY)) return;
    dispatch([{ type: 'button', id: `key:${name}`, pressed: down, t: e.timeStamp, device: KM_KEY }]);
    if (settings.consumeControllerInput) e.preventDefault();
  };
  win.addEventListener('keydown', onKey(true), true);
  win.addEventListener('keyup', onKey(false), true);

  const MOUSE_BITS = [
    [1, 'primary'],
    [2, 'secondary'],
    [4, 'tertiary'],
    [8, 'back'],
    [16, 'forward'],
  ];

  function onPointer(e) {
    if (e.pointerType !== 'mouse') return;
    const events = [];
    const buttons = e.type === 'pointercancel' ? 0 : e.buttons;
    if (buttons !== mouseButtons) {
      for (const [bit, name] of MOUSE_BITS) {
        if ((buttons & bit) !== (mouseButtons & bit)) events.push({ type: 'button', id: `mouse:btn:${name}`, pressed: Boolean(buttons & bit), t: e.timeStamp, device: KM_KEY });
      }
      mouseButtons = buttons;
    }
    if (e.type === 'pointermove' && (e.movementX || e.movementY)) {
      events.push({ type: 'motion', dx: e.movementX, dy: e.movementY, t: e.timeStamp, samples: 1, device: KM_KEY });
    }
    // Chromium also sends synthetic pointer moves (no movement, no buttons) after layout
    // changes: those must never select "Teclado e mouse".
    if (!events.length) return;
    if (selectedKey !== KM_KEY && !touchDevice()) return; // desktop: pick it in the Controle screen
    if (!accept(KM_KEY)) return;
    if (e.movementX || e.movementY) lastMouse = { dx: e.movementX, dy: e.movementY };
    dispatch(events);
    if (settings.consumeControllerInput && touchDevice() && e.type !== 'pointermove') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  for (const type of ['pointerdown', 'pointerup', 'pointermove', 'pointercancel']) win.addEventListener(type, onPointer, true);

  // Mouse clicks of a controller being read must not press the page buttons.
  win.addEventListener(
    'click',
    (e) => {
      if (e.pointerType === 'mouse' && settings.consumeControllerInput && touchDevice() && selectedKey === KM_KEY && !demo) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );

  win.addEventListener(
    'wheel',
    (e) => {
      if (!accept(KM_KEY)) return;
      const id = e.deltaY < 0 ? 'mouse:wheel:up' : e.deltaY > 0 ? 'mouse:wheel:down' : e.deltaX > 0 ? 'mouse:wheel:right' : 'mouse:wheel:left';
      dispatch([{ type: 'pulse', id, t: e.timeStamp, device: KM_KEY }]);
    },
    { capture: true, passive: true },
  );

  win.addEventListener('blur', () => {
    processor.releaseAll('página perdeu o foco');
    mouseButtons = 0;
    dirtyFlags.frame = dirtyFlags.status = true;
  });

  // The VR Box sends the Android BACK key in several modes. In an app made from this page,
  // BACK makes the WebView go back in history (or close the app when there is none). Keep one
  // history entry above the page so BACK never closes it, and turn it into a controller input
  // on the screens where buttons are being read.
  const READING_VIEWS = new Set(['setup', 'detect', 'tester', 'controllers', 'mapping']);
  // Screens change with replaceState (see main.js); remember the current address so a BACK
  // can put it right back before the hashchange reaches the router.
  let lastHref = win.location.href;
  const replaceState = win.history.replaceState.bind(win.history);
  win.history.replaceState = (state, title, url) => {
    replaceState(state, title, url);
    lastHref = win.location.href;
  };
  win.addEventListener('hashchange', () => (lastHref = win.location.href));
  const armBackGuard = (href) => {
    try {
      win.history.pushState({ vrbqGuard: true }, '', href);
    } catch {
      /* no history API (some file:// contexts): nothing to guard */
    }
  };
  // History: [base (marked)] [guard]. BACK lands on the base entry; plain "#" changes also
  // fire popstate in Chrome, but never with the base marker.
  try {
    replaceState({ vrbqBase: true }, '', lastHref);
  } catch {
    /* ignore */
  }
  armBackGuard(lastHref);
  win.addEventListener('popstate', (e) => {
    if (!e.state?.vrbqBase) return;
    const href = lastHref;
    armBackGuard(href); // back on the same screen, before the router sees the hashchange
    const view = new URL(href).hash.replace(/^#\/?/, '') || 'dashboard';
    if (READING_VIEWS.has(view) && !demo) {
      if (!selectedKey) select(KM_KEY, true);
      dispatch([{ type: 'pulse', id: 'key:BACK', t: win.performance.now(), device: selectedKey }]);
    } else {
      win.__vrbqBack?.();
    }
  });

  function pollGamepads() {
    for (const gp of gamepads()) {
      const key = `gp:${gp.id}`;
      if (!knownGamepads.has(key)) {
        knownGamepads.set(key, gamepadGroup(gp));
        dirtyFlags.devices = true;
      }
      const standard = gp.mapping === 'standard';
      const prev = gamepadState.get(key) || { buttons: [], axes: [] };
      const events = [];
      gp.buttons.forEach((b, i) => {
        const pressed = b.pressed || b.value > 0.5;
        if (prev.buttons[i] !== pressed) events.push({ type: 'button', id: `key:${E.gamepadButtonName(i, standard)}`, pressed, t: gp.timestamp, device: key });
        // L2/R2 on standard gamepads are analog triggers too.
        if (standard && (i === 6 || i === 7)) {
          const id = i === 6 ? 'axis:LTRIGGER' : 'axis:RTRIGGER';
          if (Math.abs((prev[id] ?? 0) - b.value) >= 0.004) events.push({ type: 'axis', id, value: b.value, t: gp.timestamp, device: key });
          prev[id] = b.value;
        }
        prev.buttons[i] = pressed;
      });
      gp.axes.forEach((v, i) => {
        if (prev.axes[i] === undefined || Math.abs(prev.axes[i] - v) >= 0.004) events.push({ type: 'axis', id: `axis:${E.gamepadAxisName(i, standard)}`, value: v, t: gp.timestamp, device: key });
        prev.axes[i] = v;
      });
      gamepadState.set(key, prev);
      if (!events.length) continue;
      if (selectedKey !== key) {
        // Only a real press (or a pushed stick) picks a controller.
        const real = events.some((e) => (e.type === 'button' && e.pressed) || (e.type === 'axis' && Math.abs(e.value) > 0.5));
        if (!real) continue;
        // A gamepad is a better match than "Teclado e mouse": switch to it.
        if (selectedKey === KM_KEY && !demo) select(key, true);
        else if (!accept(key)) continue;
      }
      dispatch(events);
    }
  }

  // ---------------------------------------------------------------- loop & pushes

  function frame() {
    const now = clock();
    pollGamepads();
    if (demo) dispatch(demo.step(now - demoStart, now));
    if (processor.tick(now)) dirtyFlags.frame = true;
    if (controllers.tick(now)) dirtyFlags.frame = true;
    if (processor.stats.roll(now)) dirtyFlags.stats = true;
    if (pageReady) {
      if (dirtyFlags.status) {
        dirtyFlags.status = false;
        send({ type: 'status', status: statusJson() });
      }
      if (dirtyFlags.devices) {
        dirtyFlags.devices = false;
        send({ type: 'devices', devices: devicesJson() });
      }
      if (dirtyFlags.identified) {
        dirtyFlags.identified = false;
        send({ type: 'identified', identified: identifiedJson() });
      }
      if (dirtyFlags.frame || dirtyFlags.stats || log.seq > lastSentSeq || controllers.needsTick()) {
        send({ type: 'frame', ...frameJson(true) });
      }
    }
    win.requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- JSON views

  function frameJson(includeEvents) {
    dirtyFlags.frame = false;
    const labels = {};
    const pressed = [...processor.digital].sort();
    pressed.forEach((id) => (labels[id] = E.labelOf(id)));
    const axes = {};
    for (const [id, v] of processor.analog) {
      axes[id] = Math.round(v * 10000) / 10000;
      labels[id] = E.labelOf(id);
    }
    const out = { v: controllers.snapshot(), p: { pressed, axes, labels, mouse: lastMouse } };
    if (includeEvents) out.events = log.since(lastSentSeq);
    lastSentSeq = log.seq;
    if (dirtyFlags.stats || !includeEvents) {
      dirtyFlags.stats = false;
      out.stats = { ...processor.stats.last, simulated: Boolean(demo) };
    }
    return out;
  }

  const handInfo = (hand) => {
    const n = working.mappings.filter((m) => E.target(m.target)?.hand === hand).length;
    return { configured: n > 0, mappings: n };
  };

  function statusJson() {
    const g = selectedKey ? groupByKey(selectedKey) : null;
    return {
      bluetooth: { supported: false, enabled: null, permission: 'not_required', link: 'web' },
      controller: { selected: g, connected: isConnected(selectedKey), demo: Boolean(demo) },
      input: { active: readingActive(), focused: doc.hasFocus(), pointerCapture: Boolean(doc.pointerLockElement), detecting },
      emulation: { running: emulation, startedAt: null, output: 'none' },
      left: handInfo('left'),
      right: handInfo('right'),
      integration: { udpEnabled: false, streaming: false, packets: 0, lastError: null, target: '—', format: 'json' },
      profile: { id: working.id, name: working.name, dirty },
      game: { enabled: false, output: 'gamepad', gamepad: null, reader: null, web: true },
      identifiedCount: Object.keys(identified[demo ? 'demo' : selectedKey] || {}).length,
      demo: Boolean(demo),
    };
  }

  const devicesJson = () => ({ groups: groups(), selectedKey, showInternal: false });

  function identifiedJson() {
    const key = demo ? 'demo' : selectedKey;
    return { deviceKey: key, inputs: Object.values(identified[key] || {}).map((i) => ({ ...i, label: E.labelOf(i.id) })) };
  }

  function profileUi(p) {
    const base = baseOf(p);
    return {
      ...structuredClone(p),
      mappings: p.mappings.map((m) => ({ ...m, invert: Boolean(m.invert), sourceLabel: E.labelOf(m.source), sourceKind: E.kindOf(m.source), targetLabel: E.target(m.target)?.label })),
      dirty: dirty && p.id === working.id,
      baseName: base.name,
    };
  }

  const profilesJson = () =>
    profiles.map((s) => {
      const p = s.id === working.id ? working : s;
      return { id: p.id, name: p.name, description: p.description, builtin: p.builtin, mappings: p.mappings.length, left: handInfoOf(p, 'left'), right: handInfoOf(p, 'right'), active: p.id === working.id, dirty: p.id === working.id && dirty, updatedAt: p.updatedAt };
    });

  const handInfoOf = (p, hand) => p.mappings.some((m) => E.target(m.target)?.hand === hand);

  const baseOf = (p) => defaults.initial.find((x) => x.id === p.baseId) || defaults.template;

  const uniqueName = (name) => {
    if (!profiles.some((p) => p.name.toLowerCase() === name.toLowerCase())) return name;
    for (let n = 2; ; n++) {
      const c = `${name.slice(0, 44)} (${n})`;
      if (!profiles.some((p) => p.name.toLowerCase() === c.toLowerCase())) return c;
    }
  };

  const requireProfile = (id) => {
    const p = profiles.find((x) => x.id === id);
    if (!p) throw new WebError('Perfil não encontrado');
    return p;
  };

  const editWorking = (next) => {
    working = next;
    dirty = true;
    applyWorking();
    return profileUi(working);
  };

  const replaceStored = (p) => {
    const i = profiles.findIndex((x) => x.id === p.id);
    if (i < 0) throw new WebError('Perfil não encontrado');
    profiles[i] = p;
    saveProfiles();
  };

  // ---------------------------------------------------------------- commands

  const commands = {
    'app.hello': () => {
      pageReady = true;
      lastSentSeq = log.seq;
      dirtyFlags.status = dirtyFlags.devices = false;
      return {
        info: { app: 'VR Box → Quest', version: `${VERSION} (web)`, android: '—', sdk: 0, device: 'Navegador', transport: 'Web', platform: 'web', native: true },
        status: statusJson(),
        catalog: { targets: E.TARGETS.map(({ id, hand, control, label, type }) => ({ id, hand, control, label, type })), buttons: E.BUTTONS },
        settings: structuredClone(settings),
        profile: profileUi(working),
        profiles: profilesJson(),
        devices: devicesJson(),
        identified: identifiedJson(),
        log: log.recent(120),
        frame: frameJson(false),
      };
    },
    'app.status': () => statusJson(),
    'app.openAppSettings': APP_ONLY,
    'bt.devices': () => ({ supported: false, enabled: null, permission: 'not_required', bonded: null, web: true }),
    'bt.requestPermission': APP_ONLY,
    'bt.openSettings': () => {
      throw new WebError('Abra o Bluetooth nas configurações do celular e pareie o VR Box por lá.', 'web_unsupported');
    },
    'bt.requestEnable': APP_ONLY,

    'input.devices': () => devicesJson(),
    'input.connect': () => {
      if (demo) stopDemo();
      // A gamepad that already pressed a button is visible; anything else is picked up by
      // accept() on its first button press (the UI waits for it).
      const gp = groups().find((g) => g.key !== KM_KEY);
      const current = selectedKey && isConnected(selectedKey) && selectedKey !== KM_KEY ? groupByKey(selectedKey) : null;
      const best = current || gp || null;
      if (best && best.key !== selectedKey) select(best.key, false);
      return { selected: best, candidates: groups().length, bluetoothEnabled: null, listening: !best };
    },
    'input.select': ({ key }) => {
      if (demo) stopDemo();
      select(key, false);
      return statusJson();
    },
    'input.release': () => {
      if (demo) stopDemo();
      const name = selectedKey ? groupByKey(selectedKey)?.name : null;
      emulation = false;
      selectedKey = null;
      detecting = processor.detecting = false;
      processor.releaseAll(null);
      if (name) log.add('system', `Controle liberado: ${name} (leitura parada)`);
      dirtyFlags.status = dirtyFlags.devices = true;
      return statusJson();
    },
    'input.recapture': () => {
      doc.body.requestPointerLock?.();
      return null;
    },

    'detect.start': () => {
      detecting = processor.detecting = true;
      dirtyFlags.status = true;
      log.add('system', 'Detecção de botões ligada');
      return { selected: Boolean(selectedKey || demo) };
    },
    'detect.stop': () => {
      detecting = processor.detecting = false;
      dirtyFlags.status = true;
      return null;
    },
    'identified.list': () => identifiedJson(),
    'identified.clear': () => {
      delete identified[demo ? 'demo' : selectedKey];
      store.set(STORE.identified, identified);
      dirtyFlags.status = true;
      return identifiedJson();
    },

    'mapping.add': (args) => {
      const rule = E.decodeRule({ ...args, id: randomId('m-') });
      if (!rule) throw new WebError('Essa entrada não pode controlar esse comando', 'incompatible');
      if (working.mappings.some((m) => m.source === rule.source && m.target === rule.target)) throw new WebError('Esse mapeamento já existe', 'duplicate');
      return editWorking({ ...working, mappings: [...working.mappings, rule] });
    },
    'mapping.update': (args) => {
      const current = working.mappings.find((m) => m.id === args.id);
      if (!current) throw new WebError('Mapeamento não encontrado', 'not_found');
      const rule = E.decodeRule({ ...current, ...args });
      if (!rule) throw new WebError('Essa entrada não pode controlar esse comando', 'incompatible');
      return editWorking({ ...working, mappings: working.mappings.map((m) => (m.id === args.id ? rule : m)) });
    },
    'mapping.remove': ({ id }) => {
      if (!working.mappings.some((m) => m.id === id)) throw new WebError('Mapeamento não encontrado', 'not_found');
      return editWorking({ ...working, mappings: working.mappings.filter((m) => m.id !== id) });
    },
    'mapping.resetDefault': () => editWorking({ ...working, mappings: structuredClone(baseOf(working).mappings) }),
    'profile.updateSticks': (args) => {
      const sticks = { ...working.sticks };
      for (const hand of ['left', 'right']) {
        if (!args[hand]) continue;
        const cur = sticks[hand];
        const patch = args[hand];
        sticks[hand] = E.decodeStick({ ...cur, ...patch, x: { ...cur.x, ...(patch.x || {}) }, y: { ...cur.y, ...(patch.y || {}) } }, cur);
      }
      return editWorking({ ...working, sticks });
    },
    'profile.updateButtons': (args) => {
      const b = working.buttons;
      return editWorking({
        ...working,
        buttons: {
          analogThreshold: Math.min(0.95, Math.max(0.05, Number(args.analogThreshold ?? b.analogThreshold))),
          digitalAnalogValue: Math.min(1, Math.max(0, Number(args.digitalAnalogValue ?? b.digitalAnalogValue))),
        },
      });
    },
    'profile.resetSettings': () => {
      const base = baseOf(working);
      return editWorking({ ...working, sticks: structuredClone(base.sticks), buttons: { ...base.buttons } });
    },
    'profile.fromSetup': ({ mappings, name, merge }) => {
      const rules = (Array.isArray(mappings) ? mappings : []).map((m, i) => E.decodeRule({ ...m, id: `s${i + 1}` }, i)).filter(Boolean);
      if (!rules.length) throw new WebError('Nenhum botão foi configurado', 'empty');
      const clean = E.cleanName(name) || 'Meu VR Box';
      let p = profiles.find((x) => x.name === clean);
      if (!p) {
        p = { ...structuredClone(defaults.template), id: randomId('p-'), name: clean, baseId: null, builtin: false };
        profiles.push(p);
      }
      // merge: keep what other modes of the controller already learned (different signals).
      const fresh = new Set(rules.map((r) => r.source));
      const kept = merge ? p.mappings.filter((m) => !fresh.has(m.source)) : [];
      const saved = { ...p, mappings: [...kept, ...rules], description: 'Criado no passo a passo', updatedAt: Date.now() };
      replaceStored(saved);
      activeId = saved.id;
      working = structuredClone(saved);
      dirty = false;
      saveProfiles();
      applyWorking();
      log.add('system', `Controle configurado: ${saved.name}`);
      return { profile: profileUi(working), profiles: profilesJson() };
    },
    'profile.save': () => {
      working = { ...working, updatedAt: Date.now() };
      replaceStored(structuredClone(working));
      dirty = false;
      dirtyFlags.status = true;
      log.add('system', `Perfil salvo: ${working.name}`);
      return { profile: profileUi(working), profiles: profilesJson() };
    },
    'profile.revert': () => {
      working = structuredClone(profiles.find((p) => p.id === working.id) || profiles[0]);
      dirty = false;
      applyWorking();
      return profileUi(working);
    },

    'profiles.list': () => profilesJson(),
    'profiles.activate': ({ id, discard }) => {
      if (dirty && !discard && id !== working.id) throw new WebError('O perfil atual tem alterações não salvas', 'unsaved');
      working = structuredClone(requireProfile(id));
      activeId = id;
      dirty = false;
      saveProfiles();
      applyWorking();
      log.add('system', `Perfil em uso: ${working.name}`);
      return { profile: profileUi(working), profiles: profilesJson() };
    },
    'profiles.create': ({ name, baseId }) => {
      const clean = E.cleanName(name);
      if (!clean) throw new WebError('Dê um nome ao perfil');
      const base = baseId ? profiles.find((p) => p.id === baseId) : null;
      const p = base
        ? { ...structuredClone(base), id: randomId('p-'), name: uniqueName(clean), builtin: false, updatedAt: Date.now() }
        : { ...structuredClone(defaults.template), id: randomId('p-'), name: uniqueName(clean), description: '', baseId: null, builtin: false, mappings: [], updatedAt: Date.now() };
      profiles.push(p);
      saveProfiles();
      return { created: p.id, profiles: profilesJson() };
    },
    'profiles.rename': ({ id, name }) => {
      const p = requireProfile(id);
      const clean = E.cleanName(name);
      if (!clean) throw new WebError('Dê um nome ao perfil');
      const renamed = { ...p, name: clean === p.name ? clean : uniqueName(clean), updatedAt: Date.now() };
      replaceStored(renamed);
      if (id === working.id) working = { ...working, name: renamed.name };
      dirtyFlags.status = true;
      return { profile: profileUi(working), profiles: profilesJson() };
    },
    'profiles.duplicate': ({ id }) => {
      const source = id === working.id ? working : requireProfile(id);
      const copy = { ...structuredClone(source), id: randomId('p-'), name: uniqueName(`${source.name} (cópia)`), builtin: false, updatedAt: Date.now() };
      profiles.splice(profiles.findIndex((p) => p.id === id) + 1, 0, copy);
      saveProfiles();
      return { created: copy.id, profiles: profilesJson() };
    },
    'profiles.delete': ({ id }) => {
      requireProfile(id);
      if (profiles.length <= 1) throw new WebError('Precisa existir pelo menos um perfil');
      profiles = profiles.filter((p) => p.id !== id);
      if (id === working.id) {
        activeId = profiles[0].id;
        working = structuredClone(profiles[0]);
        dirty = false;
        applyWorking();
      }
      saveProfiles();
      return { profile: profileUi(working), profiles: profilesJson() };
    },
    'profiles.restoreDefaults': () => {
      for (const initial of defaults.initial) {
        const i = profiles.findIndex((p) => p.id === initial.id);
        if (i >= 0) profiles[i] = structuredClone(initial);
        else profiles.push(structuredClone(initial));
      }
      saveProfiles();
      if (working.builtin) {
        working = structuredClone(profiles.find((p) => p.id === working.id));
        dirty = false;
        applyWorking();
      }
      log.add('system', 'Perfis iniciais restaurados');
      return { profile: profileUi(working), profiles: profilesJson() };
    },
    'profiles.export': ({ id }) => {
      const p = !id || id === working.id ? working : requireProfile(id);
      const text = JSON.stringify({ type: 'vrbq-profile', schema: 1, app: 'VR Box → Quest', exportedAt: Date.now(), profile: { ...p, builtin: false } }, null, 2);
      const name = `${p.name.replace(/[^A-Za-z0-9 _-]/g, '').trim() || 'perfil'}.vrbq.json`;
      const a = doc.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      a.download = name;
      doc.body.append(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1000);
      return { file: name };
    },
    'profiles.import': () =>
      new Promise((resolve, reject) => {
        const input = doc.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json,text/plain';
        input.addEventListener('cancel', () => reject(new WebError('Importação cancelada', 'cancelled')));
        input.addEventListener('change', async () => {
          try {
            const file = input.files?.[0];
            if (!file) throw new WebError('Importação cancelada', 'cancelled');
            if (file.size > 512 * 1024) throw new WebError('O arquivo é grande demais para ser um perfil');
            let root;
            try {
              root = JSON.parse(await file.text());
            } catch {
              throw new WebError('O arquivo não é um JSON válido');
            }
            const obj = root?.type === 'vrbq-profile' ? root.profile : root?.mappings ? root : null;
            if (!obj) throw new WebError('Esse arquivo não tem um perfil do VR Box → Quest');
            const { profile, warnings } = E.decodeProfile({ id: 'import', ...obj }, defaults.template);
            const p = { ...profile, id: randomId('p-'), name: uniqueName(profile.name), builtin: false, updatedAt: Date.now() };
            profiles.push(p);
            saveProfiles();
            log.add('system', `Perfil importado: ${p.name}`);
            resolve({ created: p.id, warnings, profiles: profilesJson() });
          } catch (e) {
            reject(e instanceof WebError ? e : new WebError(e.message || 'Perfil inválido', 'invalid'));
          }
        });
        input.click();
      }),

    'emulation.start': () => {
      if (!readingActive()) throw new WebError('Conecte e selecione um controle primeiro (ou ligue o modo demonstração).', 'no_controller');
      emulation = true;
      if (settings.keepScreenOn) win.navigator.wakeLock?.request('screen').then((l) => (wakeLock = l)).catch(() => {});
      log.add('system', 'Emulação iniciada — versão web: só dentro desta página');
      dirtyFlags.status = true;
      return statusJson();
    },
    'emulation.stop': () => {
      if (emulation) log.add('system', 'Emulação parada');
      emulation = false;
      wakeLock?.release?.();
      wakeLock = null;
      dirtyFlags.status = true;
      return statusJson();
    },

    'integration.configure': APP_ONLY,
    'game.update': APP_ONLY,
    'gamepad.permission': APP_ONLY,
    'gamepad.retry': APP_ONLY,
    'gamepad.test': APP_ONLY,
    'gamepad.openShizuku': APP_ONLY,

    'settings.update': (patch) => {
      for (const k of ['autoSelectLastDevice', 'selectedDeviceOnly', 'consumeControllerInput', 'autoPointerCapture', 'showInternalDevices', 'reduceMotion', 'showRawCodes', 'keepScreenOn']) {
        if (typeof patch[k] === 'boolean') settings[k] = patch[k];
      }
      if (patch.logSize !== undefined) {
        const n = Number(patch.logSize);
        if (!(n >= 50 && n <= 1000)) throw new WebError('O histórico deve ter entre 50 e 1000 eventos', 'invalid');
        settings.logSize = n;
        log.capacity = n;
      }
      saveSettings();
      dirtyFlags.status = dirtyFlags.devices = true;
      return structuredClone(settings);
    },
    'settings.reset': () => {
      settings = { ...structuredClone(DEFAULT_SETTINGS), lastDeviceKey: settings.lastDeviceKey };
      saveSettings();
      return structuredClone(settings);
    },

    'demo.start': () => {
      if (!demo) {
        processor.releaseAll(null);
        demo = new E.DemoScript();
        demoStart = clock();
        log.add('system', 'Modo demonstração ligado — os comandos são simulados');
        dirtyFlags.status = dirtyFlags.identified = true;
      }
      return statusJson();
    },
    'demo.stop': () => {
      stopDemo();
      return statusJson();
    },
    'log.clear': () => {
      log.clear();
      lastSentSeq = log.seq;
      return null;
    },
    'stats.reset': () => {
      processor.stats.reset();
      dirtyFlags.stats = true;
      return null;
    },
  };

  function stopDemo() {
    if (!demo) return;
    dispatch(demo.releaseAll(clock()));
    demo = null;
    processor.releaseAll(null);
    if (emulation && !readingActive()) emulation = false;
    log.add('system', 'Modo demonstração desligado');
    dirtyFlags.status = dirtyFlags.identified = true;
  }

  // ---------------------------------------------------------------- transport

  async function handle(text) {
    let req;
    try {
      req = JSON.parse(text);
    } catch {
      return;
    }
    if (req?.id === undefined) return;
    const fn = commands[req.cmd];
    try {
      if (!fn) throw new WebError(`Comando desconhecido: ${req.cmd}`, 'unknown_command');
      const result = await fn(req.args || {});
      send({ type: 'reply', id: req.id, ok: true, result: result ?? null });
    } catch (e) {
      send({ type: 'reply', id: req.id, ok: false, error: e.message || 'Erro', code: e.code || 'internal' });
    }
  }

  win.VRBQNative = {
    postMessage(text) {
      Promise.resolve().then(() => handle(text));
    },
    addEventListener(type, fn) {
      if (type === 'message') listeners.add(fn);
    },
  };

  win.requestAnimationFrame(frame);
}
