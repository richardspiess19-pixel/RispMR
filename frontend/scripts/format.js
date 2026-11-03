// Pure formatting helpers (no DOM). Covered by tests/frontend/format.test.mjs.

export function pad2(n) {
  return String(n).padStart(2, '0');
}

/** "21:30:01" from wall-clock milliseconds. */
export function clockTime(ms) {
  if (!Number.isFinite(ms)) return '--:--:--';
  const d = new Date(ms);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

export function fixed(v, digits = 2) {
  if (v === null || v === undefined || !Number.isFinite(v)) return '—';
  const s = v.toFixed(digits);
  return s === `-${(0).toFixed(digits)}` ? (0).toFixed(digits) : s;
}

export function signed(v, digits = 2) {
  if (!Number.isFinite(v)) return '—';
  const s = fixed(v, digits);
  return v > 0 && s !== (0).toFixed(digits) ? `+${s}` : s;
}

/**
 * Indicator model used by the dashboard tiles: { value, hint, tone } where tone is
 * 'ok' (blue), 'warn' (purple), 'err' or 'off'.
 */
export function bluetoothIndicator(status) {
  if (!status) return { value: '—', hint: 'Android app required', tone: 'off' };
  const bt = status.bluetooth || {};
  switch (bt.link) {
    case 'connected':
      return { value: 'Connected', hint: 'Controller link active', tone: 'ok' };
    case 'disconnected':
      return { value: 'Disconnected', hint: 'No controller link', tone: 'off' };
    case 'off':
      return { value: 'Disconnected', hint: 'Bluetooth is turned off', tone: 'err' };
    case 'unverified':
      return { value: 'Connected', hint: 'Input device present · grant permission to verify', tone: 'warn' };
    case 'not_bluetooth':
      return { value: 'Not via Bluetooth', hint: 'Selected device is not a paired BT device', tone: 'warn' };
    case 'unsupported':
      return { value: 'Unavailable', hint: 'This phone has no Bluetooth', tone: 'err' };
    default:
      return { value: 'Unknown', hint: 'Bluetooth permission not granted', tone: 'warn' };
  }
}

export function controllerIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const c = status.controller || {};
  if (c.demo) return { value: 'DEMO', hint: 'Simulated input — no real device', tone: 'warn' };
  if (c.selected && c.connected) return { value: 'Detected', hint: c.selected.name, tone: 'ok' };
  if (c.selected) return { value: 'Not detected', hint: `Waiting for ${c.selected.name}`, tone: 'warn' };
  return { value: 'Not detected', hint: 'No controller selected', tone: 'off' };
}

export function inputIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const i = status.input || {};
  if (!i.active) return { value: 'Inactive', hint: 'Not reading any device', tone: 'off' };
  if (!i.focused) return { value: 'Active', hint: 'Paused: app not in focus', tone: 'warn' };
  const hint = i.detecting ? 'Detection running' : i.pointerCapture ? 'Mouse captured' : 'Reading events';
  return { value: 'Active', hint, tone: 'ok' };
}

export function emulationIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const e = status.emulation || {};
  if (!e.running) return { value: 'Stopped', hint: 'Not emulating', tone: 'off' };
  if (e.output === 'udp') return { value: 'Running', hint: `VRBQ UDP → ${status.integration?.target || ''}`, tone: 'ok' };
  return { value: 'Running', hint: 'Local only — no output enabled', tone: 'warn' };
}

export function handIndicator(status, hand) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const h = status[hand] || {};
  if (h.configured) return { value: 'Configured', hint: `${h.mappings} mapping${h.mappings === 1 ? '' : 's'}`, tone: 'ok' };
  return { value: 'Not configured', hint: 'No mappings', tone: 'off' };
}

export function integrationIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const i = status.integration || {};
  if (i.streaming) return { value: 'Available', hint: `Streaming · ${i.packets} packets`, tone: 'ok' };
  if (i.udpEnabled) return { value: 'Available', hint: `VRBQ UDP ready · ${i.target}`, tone: 'ok' };
  return { value: 'Unavailable', hint: 'No output enabled (OpenXR: not on Android phones)', tone: 'off' };
}

export function identifiedIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const n = status.identifiedCount || 0;
  return { value: String(n), hint: n ? 'inputs identified on this controller' : 'Use Automatic Input Detection', tone: n ? 'ok' : 'off' };
}

/** Human label for a virtual target id ("right.a" -> "RIGHT · A"). */
export function targetLabel(catalog, id) {
  const t = catalog?.targets?.find((x) => x.id === id);
  if (!t) return id;
  return `${t.hand === 'left' ? 'LEFT' : 'RIGHT'} · ${t.label}`;
}

/** Compatibility of a source kind with a target type (mirrors VirtualTargets.isCompatible). */
export function isCompatible(sourceKind, targetType) {
  if (sourceKind === 'relative') return targetType === 'stick_axis';
  return true;
}

export function kindLabel(kind) {
  return { digital: 'Digital', analog: 'Analog', relative: 'Relative' }[kind] || kind;
}

/** Same shape as the native VRBQ JSON encoder; used for the protocol preview. */
export function protocolPreview(frame, seq = 0) {
  const v = frame?.v;
  const hand = (h, names) => {
    const b = h?.buttons || {};
    return {
      stick: [round4(h?.x), round4(h?.y)],
      click: Boolean(b.stickClick),
      [names[0]]: Boolean(b[names[0]]),
      [names[1]]: Boolean(b[names[1]]),
      [names[2]]: Boolean(b[names[2]]),
      trigger: round4(h?.trigger),
      grip: round4(h?.grip),
    };
  };
  return {
    proto: 'vrbq',
    v: 1,
    seq,
    t: 0,
    demo: false,
    connected: true,
    left: hand(v?.left, ['x', 'y', 'menu']),
    right: hand(v?.right, ['a', 'b', 'system']),
  };
}

function round4(n) {
  return Number.isFinite(n) ? Math.round(n * 10000) / 10000 : 0;
}
