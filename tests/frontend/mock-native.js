// TEST-ONLY fake of the Android bridge (window.VRBQNative) for browser UI tests.
// It is injected by the Playwright tests; it is NOT part of the app and never shipped
// (the APK only contains ../../frontend). Values are canned to exercise every screen.
(() => {
  const targets = [];
  for (const hand of ['left', 'right']) {
    const p = hand;
    targets.push(
      { id: `${p}.stick.x`, hand, control: 'stick', label: 'Joystick X', type: 'stick_axis' },
      { id: `${p}.stick.y`, hand, control: 'stick', label: 'Joystick Y', type: 'stick_axis' },
      { id: `${p}.stick.up`, hand, control: 'stick', label: 'Joystick Up', type: 'stick_direction' },
      { id: `${p}.stick.down`, hand, control: 'stick', label: 'Joystick Down', type: 'stick_direction' },
      { id: `${p}.stick.left`, hand, control: 'stick', label: 'Joystick Left', type: 'stick_direction' },
      { id: `${p}.stick.right`, hand, control: 'stick', label: 'Joystick Right', type: 'stick_direction' },
      { id: `${p}.stickClick`, hand, control: 'stickClick', label: 'Joystick Click', type: 'button' },
    );
    if (hand === 'left') {
      targets.push(
        { id: 'left.x', hand, control: 'x', label: 'X', type: 'button' },
        { id: 'left.y', hand, control: 'y', label: 'Y', type: 'button' },
        { id: 'left.menu', hand, control: 'menu', label: 'Menu', type: 'button' },
      );
    } else {
      targets.push(
        { id: 'right.a', hand, control: 'a', label: 'A', type: 'button' },
        { id: 'right.b', hand, control: 'b', label: 'B', type: 'button' },
        { id: 'right.system', hand, control: 'system', label: 'System', type: 'button' },
      );
    }
    targets.push(
      { id: `${p}.trigger`, hand, control: 'trigger', label: 'Trigger', type: 'analog' },
      { id: `${p}.grip`, hand, control: 'grip', label: 'Grip', type: 'analog' },
    );
  }
  const stick = (mode) => ({
    mode,
    smoothing: 0.1,
    returnSpeed: 6,
    x: { sensitivity: 1, deadzone: 0.08, curve: 1, max: 1, invert: false },
    y: { sensitivity: 1, deadzone: 0.08, curve: 1, max: 1, invert: false },
  });
  const group = {
    key: 'VR BOX#05ac:022c',
    name: 'VR BOX',
    vendorId: 0x05ac,
    productId: 0x022c,
    vendor: 'Apple',
    vidPid: '05AC:022C',
    primaryType: 'Mouse',
    roles: ['Mouse', 'Keys / Buttons'],
    external: true,
    likelyVrBox: true,
    candidate: true,
    axes: ['X', 'Y', 'RELATIVE_X', 'RELATIVE_Y', 'VSCROLL'],
    declaredKeys: ['VOLUME_UP', 'VOLUME_DOWN', 'MEDIA_PLAY_PAUSE', 'ENTER'],
    nodes: [
      { id: 7, sources: '0x00002002', roles: ['Mouse'], keyboardType: 0, controllerNumber: 0, descriptor: 'a1b2c3' },
      { id: 8, sources: '0x00000101', roles: ['Keys / Buttons'], keyboardType: 1, controllerNumber: 0, descriptor: 'a1b2c4' },
    ],
    connected: true,
  };
  const state = {
    emulation: false,
    udp: { enabled: true, host: '127.0.0.1', port: 47900, rateHz: 90, format: 'json' },
    dirty: false,
    mappings: [
      { id: 'd01', source: 'mouse:btn:primary', target: 'right.a', sourceLabel: 'Mouse Button Left', sourceKind: 'digital', targetLabel: 'A' },
      { id: 'd02', source: 'mouse:btn:secondary', target: 'right.b', sourceLabel: 'Mouse Button Right', sourceKind: 'digital', targetLabel: 'B' },
      { id: 'd07', source: 'mouse:x', target: 'left.stick.x', sourceLabel: 'Mouse Movement X', sourceKind: 'relative', targetLabel: 'Joystick X' },
      { id: 'd08', source: 'mouse:y', target: 'left.stick.y', sourceLabel: 'Mouse Movement Y', sourceKind: 'relative', targetLabel: 'Joystick Y' },
      { id: 'd28', source: 'key:VOLUME_UP', target: 'right.trigger', sourceLabel: 'Volume Up', sourceKind: 'digital', targetLabel: 'Trigger' },
    ],
    log: [],
    seq: 0,
  };
  const now = () => Date.now();
  const addLog = (c, m) => state.log.push({ seq: ++state.seq, t: now(), c, m });
  addLog('system', 'App started');
  addLog('system', 'Input device detected: VR BOX (Mouse + Keys / Buttons)');
  addLog('physical', 'MOUSE BUTTON LEFT PRESSED');
  addLog('virtual', 'RIGHT BUTTON A PRESSED');

  const profile = () => ({
    id: 'default-vr-box',
    name: 'Default VR Box',
    description: 'Spreads the VR Box inputs over both virtual controllers.',
    baseId: 'default-vr-box',
    builtin: true,
    updatedAt: 1,
    mappings: state.mappings,
    sticks: { left: stick('virtual_stick'), right: stick('relative_mouse') },
    buttons: { analogThreshold: 0.5, digitalAnalogValue: 1 },
    dirty: state.dirty,
    baseName: 'Default VR Box',
  });
  const profiles = () => [
    { id: 'default-vr-box', name: 'Default VR Box', description: 'Spreads the VR Box inputs over both virtual controllers.', builtin: true, mappings: state.mappings.length, left: true, right: true, active: true, dirty: state.dirty },
    { id: 'quest-touch-left', name: 'Quest Touch Left', description: 'The whole VR Box drives the LEFT virtual controller.', builtin: true, mappings: 27, left: true, right: false, active: false, dirty: false },
    { id: 'quest-touch-right', name: 'Quest Touch Right', description: 'The whole VR Box drives the RIGHT virtual controller.', builtin: true, mappings: 26, left: false, right: true, active: false, dirty: false },
    { id: 'custom-profile', name: 'Custom Profile', description: 'Empty profile.', builtin: true, mappings: 0, left: false, right: false, active: false, dirty: false },
  ];
  const status = () => ({
    bluetooth: { supported: true, enabled: true, permission: 'granted', link: 'connected' },
    controller: { selected: group, connected: true, demo: false },
    input: { active: true, focused: true, pointerCapture: true, detecting: false },
    emulation: { running: state.emulation, startedAt: state.emulation ? now() : null, output: state.emulation ? 'udp' : 'none' },
    left: { configured: true, mappings: 2 },
    right: { configured: true, mappings: 3 },
    integration: { udpEnabled: state.udp.enabled, streaming: state.emulation, packets: state.emulation ? 1234 : 0, lastError: null, target: `${state.udp.host}:${state.udp.port}`, format: state.udp.format },
    profile: { id: 'default-vr-box', name: 'Default VR Box', dirty: state.dirty },
    identifiedCount: 3,
    demo: false,
  });
  const settings = () => ({
    autoSelectLastDevice: true,
    selectedDeviceOnly: true,
    consumeControllerInput: true,
    autoPointerCapture: true,
    showInternalDevices: false,
    reduceMotion: false,
    showRawCodes: true,
    logSize: 200,
    keepScreenOn: true,
    lastDeviceKey: group.key,
    udp: state.udp,
  });
  const identified = () => ({
    deviceKey: group.key,
    inputs: [
      { id: 'mouse:btn:primary', label: 'Mouse Button Left', kind: 'digital', count: 12, lastSeen: now() },
      { id: 'mouse:x', label: 'Mouse Movement X', kind: 'relative', count: 40, lastSeen: now() },
      { id: 'key:VOLUME_UP', label: 'Volume Up', kind: 'digital', count: 3, lastSeen: now() },
    ],
  });
  let t = 0;
  const frame = () => {
    t += 0.05;
    const a = Math.sin(t) * 0.8;
    const b = Math.cos(t) * 0.8;
    const pressed = Math.sin(t * 2) > 0.3;
    return {
      v: {
        left: { x: a, y: b, rx: a, ry: b, trigger: 0, grip: Math.max(0, Math.sin(t)), buttons: { stickClick: false, x: false, y: pressed, menu: false } },
        right: { x: 0, y: 0, rx: 0, ry: 0, trigger: pressed ? 1 : 0, grip: 0, buttons: { stickClick: false, a: pressed, b: false, system: false } },
      },
      p: {
        pressed: pressed ? ['mouse:btn:primary'] : [],
        axes: { 'axis:X': a },
        labels: { 'mouse:btn:primary': 'Mouse Button Left', 'axis:X': 'Joystick Axis X' },
        mouse: { dx: Math.round(a * 8), dy: Math.round(b * 8) },
      },
    };
  };

  const handlers = {
    'app.hello': () => ({
      info: { app: 'VR BOX TO META QUEST EMULATOR', version: '0.1.0', android: '14', sdk: 34, device: 'Mock Phone', transport: 'WebMessageListener', pointerCaptureSupported: true, openxrBroker: null, native: true },
      status: status(),
      catalog: { targets, buttons: { left: ['stickClick', 'x', 'y', 'menu'], right: ['stickClick', 'a', 'b', 'system'] } },
      settings: settings(),
      profile: profile(),
      profiles: profiles(),
      devices: { groups: [group], selectedKey: group.key, showInternal: false },
      identified: identified(),
      log: state.log,
      frame: { ...frame(), stats: { eventsPerSec: 120, motionHz: 90, latencyAvgMs: 6.4, latencyMaxMs: 14, totalEvents: 5210, simulated: false } },
    }),
    'emulation.start': () => {
      state.emulation = true;
      return status();
    },
    'emulation.stop': () => {
      state.emulation = false;
      return status();
    },
    'bt.devices': () => ({ supported: true, enabled: true, permission: 'granted', bonded: [{ name: 'VR BOX', address: 'AA:BB:CC:DD:EE:FF', type: 'Classic', deviceClass: '0x05C0', classLabel: 'Keyboard + Pointing (HID combo)', hidPeripheral: true, aclConnected: true }] }),
    'input.devices': () => ({ groups: [group], selectedKey: group.key, showInternal: false }),
    'detect.start': () => ({ selected: true }),
    'detect.stop': () => null,
    'mapping.add': (args) => {
      state.mappings.push({ id: `m${state.mappings.length}`, source: args.source, target: args.target, sourceLabel: args.source, sourceKind: 'digital', targetLabel: args.target });
      state.dirty = true;
      return profile();
    },
    'mapping.remove': (args) => {
      state.mappings = state.mappings.filter((m) => m.id !== args.id);
      state.dirty = true;
      return profile();
    },
    'profile.save': () => {
      state.dirty = false;
      return { profile: profile(), profiles: profiles() };
    },
    'profile.updateSticks': () => {
      state.dirty = true;
      return profile();
    },
    'settings.update': () => settings(),
    'integration.configure': (args) => {
      Object.assign(state.udp, args);
      return { settings: settings(), status: status() };
    },
  };

  let onmessage = null;
  const listeners = [];
  const deliver = (obj) => {
    const data = JSON.stringify(obj);
    for (const l of listeners) l({ data });
    if (onmessage) onmessage({ data });
  };
  window.__mockCalls = [];
  window.VRBQNative = {
    postMessage(text) {
      const req = JSON.parse(text);
      window.__mockCalls.push(req.cmd);
      const fn = handlers[req.cmd];
      setTimeout(() => {
        if (fn) deliver({ type: 'reply', id: req.id, ok: true, result: fn(req.args || {}) });
        else deliver({ type: 'reply', id: req.id, ok: true, result: null });
      }, 5);
    },
    addEventListener(type, fn) {
      if (type === 'message') listeners.push(fn);
    },
    set onmessage(fn) {
      onmessage = fn;
    },
  };
  setInterval(() => deliver({ type: 'frame', ...frame(), events: [] }), 50);
})();
