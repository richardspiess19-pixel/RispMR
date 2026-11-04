// Web version of the input engine: a faithful JavaScript port of the Kotlin `engine`
// package (same ids, labels, mapping rules and joystick math), so profiles are shared
// between the Android app and the HTML version. No DOM here; covered by web/engine.test.mjs.

// ------------------------------------------------------------------ physical inputs

const SOURCE_RE = /^(key:[A-Z0-9_]{1,48}|mouse:[xy]|mouse:btn:(primary|secondary|tertiary|back|forward)|mouse:wheel:(up|down|left|right)|axis:[A-Z0-9_]{1,32}(:[+-])?)$/;

export function kindOf(id) {
  if (typeof id !== 'string' || !SOURCE_RE.test(id)) return null;
  if (id === 'mouse:x' || id === 'mouse:y') return 'relative';
  if (id.startsWith('axis:') && (id.endsWith(':+') || id.endsWith(':-'))) return 'digital';
  if (id.startsWith('axis:')) return 'analog';
  return 'digital';
}

const GAMEPAD_BUTTONS = { THUMBL: 'Clique do analógico esquerdo', THUMBR: 'Clique do analógico direito', START: 'Botão Start', SELECT: 'Botão Select', MODE: 'Botão Mode' };
const KEYS = {
  DPAD_UP: 'D-pad cima', DPAD_DOWN: 'D-pad baixo', DPAD_LEFT: 'D-pad esquerda', DPAD_RIGHT: 'D-pad direita', DPAD_CENTER: 'D-pad centro',
  VOLUME_UP: 'Volume +', VOLUME_DOWN: 'Volume −', VOLUME_MUTE: 'Mudo',
  MEDIA_PLAY_PAUSE: 'Play/pause', MEDIA_PLAY: 'Play', MEDIA_PAUSE: 'Pause', MEDIA_STOP: 'Parar mídia', MEDIA_NEXT: 'Próxima faixa', MEDIA_PREVIOUS: 'Faixa anterior',
  BACK: 'Tecla voltar', ENTER: 'Tecla Enter', SPACE: 'Tecla espaço', ESCAPE: 'Tecla Esc', MENU: 'Tecla menu', PAGE_UP: 'Page Up', PAGE_DOWN: 'Page Down',
};

function pretty(raw) {
  return raw
    .split('_')
    .filter(Boolean)
    .map((w) => (w.length === 1 || /\d/.test(w) ? w : w[0] + w.slice(1).toLowerCase()))
    .join(' ');
}

function keyLabel(name) {
  if (/^\d+$/.test(name)) return `Tecla código ${name}`;
  if (KEYS[name]) return KEYS[name];
  if (name.startsWith('BUTTON_')) {
    const b = name.slice(7);
    if (/^\d+$/.test(b)) return `Botão ${b}`;
    return GAMEPAD_BUTTONS[b] || `Botão ${b} (gamepad)`;
  }
  if (name.startsWith('MEDIA_')) return `Mídia ${pretty(name.slice(6))}`;
  return `Tecla ${pretty(name)}`;
}

function axisLabel(name, dir) {
  const base =
    { X: 'Eixo X do joystick', Y: 'Eixo Y do joystick', Z: 'Eixo Z do joystick', RX: 'Eixo RX do joystick', RY: 'Eixo RY do joystick', RZ: 'Eixo RZ do joystick', HAT_X: 'D-pad horizontal', HAT_Y: 'D-pad vertical', LTRIGGER: 'Gatilho analógico L', RTRIGGER: 'Gatilho analógico R', GAS: 'Acelerador analógico', BRAKE: 'Freio analógico' }[name] ||
    `Eixo ${name}`;
  if (!dir) return base;
  const horizontal = ['X', 'Z', 'RX', 'HAT_X'].includes(name);
  const vertical = ['Y', 'RZ', 'RY', 'HAT_Y'].includes(name);
  const hint = horizontal ? (dir === '+' ? 'direita' : 'esquerda') : vertical ? (dir === '+' ? 'baixo' : 'cima') : dir === '+' ? 'positivo' : 'negativo';
  return `${base} → ${hint}`;
}

export function labelOf(id) {
  const p = id.split(':');
  if (p[0] === 'key') return keyLabel(p[1] || '?');
  if (p[0] === 'mouse') {
    if (p[1] === 'x') return 'Movimento do mouse (X)';
    if (p[1] === 'y') return 'Movimento do mouse (Y)';
    if (p[1] === 'btn') return { primary: 'Botão esquerdo do mouse', secondary: 'Botão direito do mouse', tertiary: 'Botão do meio do mouse', back: 'Botão voltar do mouse', forward: 'Botão avançar do mouse' }[p[2]] || 'Botão do mouse';
    if (p[1] === 'wheel') return `Roda do mouse ${{ up: 'para cima', down: 'para baixo', left: 'para a esquerda', right: 'para a direita' }[p[2]] || '?'}`;
  }
  if (p[0] === 'axis') return axisLabel(p[1] || '?', p[2]);
  return id;
}

// ------------------------------------------------------------------ virtual targets

export const HANDS = ['left', 'right'];
/** Two Joy-Con style controllers (same order as VirtualTargets.buttonControls in the app). */
export const BUTTONS = {
  left: ['stickClick', 'up', 'down', 'left', 'right', 'minus', 'capture'],
  right: ['stickClick', 'a', 'b', 'x', 'y', 'plus', 'home'],
};

/** Targets of the earlier Quest layout -> Joy-Con layout (saved profiles keep working). */
export const LEGACY_TARGETS = { 'left.x': 'right.x', 'left.y': 'right.y', 'left.menu': 'right.plus', 'right.system': 'right.home' };

export const TARGETS = HANDS.flatMap((hand) => [
  { id: `${hand}.stick.x`, hand, control: 'stick', label: 'Joystick X', type: 'stick_axis', axis: 0 },
  { id: `${hand}.stick.y`, hand, control: 'stick', label: 'Joystick Y', type: 'stick_axis', axis: 1 },
  { id: `${hand}.stick.up`, hand, control: 'stick', label: 'Joystick para cima', type: 'stick_direction', axis: 1, direction: 1 },
  { id: `${hand}.stick.down`, hand, control: 'stick', label: 'Joystick para baixo', type: 'stick_direction', axis: 1, direction: -1 },
  { id: `${hand}.stick.left`, hand, control: 'stick', label: 'Joystick para a esquerda', type: 'stick_direction', axis: 0, direction: -1 },
  { id: `${hand}.stick.right`, hand, control: 'stick', label: 'Joystick para a direita', type: 'stick_direction', axis: 0, direction: 1 },
  { id: `${hand}.stickClick`, hand, control: 'stickClick', label: 'Clique do joystick', type: 'button' },
  ...(hand === 'left'
    ? [
        { id: 'left.up', hand, control: 'up', label: 'Seta ↑', type: 'button' },
        { id: 'left.down', hand, control: 'down', label: 'Seta ↓', type: 'button' },
        { id: 'left.left', hand, control: 'left', label: 'Seta ←', type: 'button' },
        { id: 'left.right', hand, control: 'right', label: 'Seta →', type: 'button' },
        { id: 'left.minus', hand, control: 'minus', label: '−', type: 'button' },
        { id: 'left.capture', hand, control: 'capture', label: 'Captura', type: 'button' },
      ]
    : [
        { id: 'right.a', hand, control: 'a', label: 'A', type: 'button' },
        { id: 'right.b', hand, control: 'b', label: 'B', type: 'button' },
        { id: 'right.x', hand, control: 'x', label: 'X', type: 'button' },
        { id: 'right.y', hand, control: 'y', label: 'Y', type: 'button' },
        { id: 'right.plus', hand, control: 'plus', label: '+', type: 'button' },
        { id: 'right.home', hand, control: 'home', label: 'Home', type: 'button' },
      ]),
  { id: `${hand}.trigger`, hand, control: 'trigger', label: hand === 'left' ? 'ZL' : 'ZR', type: 'analog' },
  { id: `${hand}.grip`, hand, control: 'grip', label: hand === 'left' ? 'L' : 'R', type: 'analog' },
]);

const TARGET_BY_ID = new Map(TARGETS.map((t) => [t.id, t]));
export const target = (id) => TARGET_BY_ID.get(id) || null;
export const isCompatible = (kind, type) => (kind === 'relative' ? type === 'stick_axis' : true);

function logLabel(control, hand) {
  if (control === 'stickClick') return 'clique do joystick';
  if (['x', 'y', 'a', 'b'].includes(control)) return `botão ${control.toUpperCase()}`;
  if (control === 'trigger') return hand === 'left' ? 'ZL' : 'ZR';
  if (control === 'grip') return hand === 'left' ? 'L' : 'R';
  return { up: 'seta ↑', down: 'seta ↓', left: 'seta ←', right: 'seta →', minus: 'botão −', plus: 'botão +', capture: 'Captura', home: 'Home' }[control] || control;
}

const comma = (v) => v.toFixed(2).replace('.', ',');

export function describeVirtual(e) {
  const base = `Joy-Con ${e.hand === 'left' ? 'esquerdo' : 'direito'} · ${logLabel(e.control, e.hand)} ${e.pressed ? 'pressionado' : 'solto'}`;
  return e.value != null && e.pressed ? `${base} (${comma(e.value)})` : base;
}

// ------------------------------------------------------------------ mapping

export class ControllerMapper {
  constructor() {
    this.rules = [];
    this.buttons = { analogThreshold: 0.5, digitalAnalogValue: 1 };
    this.state = [];
    this.motion = [];
    this.rejected = [];
  }

  configure(rules, buttons) {
    this.rules = rules;
    this.buttons = buttons;
    this.state = [];
    this.motion = [];
    this.rejected = [];
    for (const rule of rules) {
      const t = target(rule.target);
      const kind = kindOf(rule.source);
      if (!t || !kind || !isCompatible(kind, t.type)) {
        this.rejected.push(rule);
        continue;
      }
      (kind === 'relative' ? this.motion : this.state).push({ rule, t, kind });
    }
  }

  digital(c, st) {
    if (c.kind === 'digital') return st.digital.has(c.rule.source);
    const v = (st.analog.get(c.rule.source) || 0) * (c.rule.invert ? -1 : 1);
    return v >= (c.rule.threshold ?? this.buttons.analogThreshold);
  }

  analog01(c, st) {
    if (c.kind === 'digital') return st.digital.has(c.rule.source) ? this.buttons.digitalAnalogValue : 0;
    const v = (st.analog.get(c.rule.source) || 0) * (c.rule.scale ?? 1) * (c.rule.invert ? -1 : 1);
    return Math.min(1, Math.max(0, v));
  }

  signed(c, st) {
    const sign = c.rule.invert ? -1 : 1;
    if (c.kind === 'digital') return st.digital.has(c.rule.source) ? sign * (c.rule.scale ?? 1) : 0;
    return (st.analog.get(c.rule.source) || 0) * (c.rule.scale ?? 1) * sign;
  }

  /** @returns {{buttons:Set<string>, analog:Map<string,number>, stick:number[]}} */
  evaluate(st) {
    const out = { buttons: new Set(), analog: new Map(), stick: [0, 0, 0, 0] };
    for (const c of this.state) {
      const t = c.t;
      const hi = t.hand === 'left' ? 0 : 1;
      if (t.type === 'button') {
        if (this.digital(c, st)) out.buttons.add(t.id);
      } else if (t.type === 'analog') {
        const v = this.analog01(c, st);
        if (v > (out.analog.get(t.id) || 0)) out.analog.set(t.id, v);
      } else if (t.type === 'stick_axis') {
        let v = this.signed(c, st);
        if (t.axis === 1 && c.kind === 'analog') v = -v; // Android/Web Y axes are positive downwards
        out.stick[hi * 2 + t.axis] += v;
      } else if (t.type === 'stick_direction' && this.digital(c, st)) {
        out.stick[hi * 2 + t.axis] += t.direction;
      }
    }
    return out;
  }

  routeMotion(dx, dy, sink) {
    for (const c of this.motion) {
      const raw = c.rule.source === 'mouse:x' ? dx : dy;
      if (!raw) continue;
      let v = raw * (c.rule.scale ?? 1);
      if (c.rule.invert) v = -v;
      if (c.t.axis === 1) v = -v;
      sink(c.t.hand, c.t.axis, v);
    }
  }
}

// ------------------------------------------------------------------ joystick

export const COUNTS_FOR_FULL = 80;
const HOLD_MS = 40;
const EPS = 1e-4;

export function shape(value, a) {
  let v = a.invert ? -value : value;
  const dz = Math.min(0.95, Math.max(0, a.deadzone));
  const m = Math.abs(v);
  if (m <= dz) return 0;
  v = Math.sign(v) * ((m - dz) / (1 - dz));
  const curve = Math.min(5, Math.max(0.2, a.curve));
  if (curve !== 1) v = Math.sign(v) * Math.abs(v) ** curve;
  return Math.min(1, Math.max(-1, v * Math.min(1, Math.max(0, a.max))));
}

export class VirtualStick {
  constructor(config) {
    this.config = config;
    this.mouse = [0, 0];
    this.abs = [0, 0];
    this.target = [0, 0];
    this.out = [0, 0];
    this.raw = [0, 0];
    this.lastMotion = null;
    this.lastUpdate = null;
  }

  get active() {
    return this.mouse[0] !== 0 || this.mouse[1] !== 0 || Math.abs(this.target[0] - this.out[0]) > EPS || Math.abs(this.target[1] - this.out[1]) > EPS;
  }

  advance(now) {
    if (this.lastUpdate === null) {
      this.lastUpdate = now;
      return 0;
    }
    const dt = Math.min(0.1, Math.max(0, now - this.lastUpdate) / 1000);
    this.lastUpdate = now;
    if (dt <= 0) return 0;
    const c = this.config;
    if (c.mode === 'virtual_stick') {
      const idle = this.lastMotion === null || now - this.lastMotion > HOLD_MS;
      if (idle && c.returnSpeed > 0) {
        const step = c.returnSpeed * dt;
        for (let i = 0; i < 2; i++) this.mouse[i] = Math.abs(this.mouse[i]) <= step ? 0 : this.mouse[i] - step * Math.sign(this.mouse[i]);
      }
    } else {
      const decay = Math.exp(-Math.max(0.5, c.returnSpeed) * dt);
      for (let i = 0; i < 2; i++) {
        this.mouse[i] *= decay;
        if (Math.abs(this.mouse[i]) < EPS) this.mouse[i] = 0;
      }
    }
    return dt;
  }

  addMotion(axis, delta, now) {
    this.advance(now);
    const a = axis === 0 ? this.config.x : this.config.y;
    this.mouse[axis] = Math.min(1, Math.max(-1, this.mouse[axis] + (delta * a.sensitivity) / COUNTS_FOR_FULL));
    this.lastMotion = now;
  }

  setAbsolute(x, y, now) {
    if (this.abs[0] !== x || this.abs[1] !== y) {
      this.advance(now);
      this.abs = [x, y];
    }
  }

  update(now) {
    const dt = this.advance(now);
    const prev = [...this.out];
    for (let i = 0; i < 2; i++) {
      const a = i === 0 ? this.config.x : this.config.y;
      this.raw[i] = Math.min(1, Math.max(-1, this.mouse[i] + this.abs[i] * a.sensitivity));
      this.target[i] = shape(this.raw[i], a);
    }
    const tau = Math.min(0.95, Math.max(0, this.config.smoothing)) * 0.25;
    for (let i = 0; i < 2; i++) {
      if (tau < 1e-4) this.out[i] = this.target[i];
      else if (dt > 0) {
        this.out[i] += (this.target[i] - this.out[i]) * (1 - Math.exp(-dt / tau));
        if (Math.abs(this.target[i] - this.out[i]) <= EPS) this.out[i] = this.target[i];
      }
    }
    const mag = Math.hypot(this.out[0], this.out[1]);
    if (mag > 1) {
      this.out[0] /= mag;
      this.out[1] /= mag;
    }
    return Math.abs(this.out[0] - prev[0]) > EPS || Math.abs(this.out[1] - prev[1]) > EPS || (this.out[0] === 0 && prev[0] !== 0) || (this.out[1] === 0 && prev[1] !== 0);
  }

  reset() {
    this.mouse = [0, 0];
    this.abs = [0, 0];
    this.target = [0, 0];
    this.out = [0, 0];
    this.raw = [0, 0];
  }
}

// ------------------------------------------------------------------ virtual controllers

export class VirtualControllers {
  constructor() {
    this.mapper = new ControllerMapper();
    this.c = {};
    for (const hand of HANDS) this.c[hand] = { buttons: Object.fromEntries(BUTTONS[hand].map((b) => [b, false])), trigger: 0, grip: 0, triggerPressed: false, gripPressed: false };
    this.sticks = { left: new VirtualStick(defaultStick('virtual_stick')), right: new VirtualStick(defaultStick('relative_mouse')) };
    this.version = 0;
    this.listener = null;
  }

  configure(p) {
    this.mapper.configure(p.mappings, p.buttons);
    this.sticks.left.config = p.sticks.left;
    this.sticks.right.config = p.sticks.right;
  }

  emit(e) {
    this.listener?.(e);
  }

  setAnalog(hand, name, value, threshold) {
    const c = this.c[hand];
    const v = Math.min(1, Math.max(0, value));
    if (c[name] === v) return false;
    const key = `${name}Pressed`;
    const was = c[key];
    const now = was ? v > threshold * 0.7 : v >= threshold;
    c[name] = v;
    c[key] = now;
    if (now !== was) this.emit({ hand, control: name, pressed: now, value: v });
    return true;
  }

  onPhysical(st, now) {
    const f = this.mapper.evaluate(st);
    let changed = false;
    const th = this.mapper.buttons.analogThreshold;
    for (const hand of HANDS) {
      const c = this.c[hand];
      for (const b of BUTTONS[hand]) {
        const pressed = f.buttons.has(`${hand}.${b}`);
        if (c.buttons[b] !== pressed) {
          c.buttons[b] = pressed;
          changed = true;
          this.emit({ hand, control: b, pressed, value: null });
        }
      }
      changed = this.setAnalog(hand, 'trigger', f.analog.get(`${hand}.trigger`) || 0, th) || changed;
      changed = this.setAnalog(hand, 'grip', f.analog.get(`${hand}.grip`) || 0, th) || changed;
      const i = hand === 'left' ? 0 : 2;
      this.sticks[hand].setAbsolute(f.stick[i], f.stick[i + 1], now);
    }
    changed = this.updateSticks(now) || changed;
    if (changed) this.version++;
    return changed;
  }

  onMotion(dx, dy, now) {
    this.mapper.routeMotion(dx, dy, (hand, axis, d) => this.sticks[hand].addMotion(axis, d, now));
    const changed = this.updateSticks(now);
    if (changed) this.version++;
    return changed;
  }

  tick(now) {
    const changed = this.updateSticks(now);
    if (changed) this.version++;
    return changed;
  }

  needsTick() {
    return this.sticks.left.active || this.sticks.right.active;
  }

  updateSticks(now) {
    let changed = false;
    for (const hand of HANDS) if (this.sticks[hand].update(now)) changed = true;
    return changed;
  }

  reset(now) {
    for (const hand of HANDS) {
      const c = this.c[hand];
      for (const b of BUTTONS[hand]) {
        if (c.buttons[b]) {
          c.buttons[b] = false;
          this.emit({ hand, control: b, pressed: false, value: null });
        }
      }
      this.setAnalog(hand, 'trigger', 0, this.mapper.buttons.analogThreshold);
      this.setAnalog(hand, 'grip', 0, this.mapper.buttons.analogThreshold);
      this.sticks[hand].reset();
    }
    this.updateSticks(now);
    this.version++;
  }

  snapshot() {
    const hand = (h) => {
      const c = this.c[h];
      const s = this.sticks[h];
      const r = (v) => Math.round(v * 10000) / 10000;
      return { x: r(s.out[0]), y: r(s.out[1]), rx: r(s.raw[0]), ry: r(s.raw[1]), trigger: r(c.trigger), grip: r(c.grip), buttons: { ...c.buttons } };
    };
    return { left: hand('left'), right: hand('right') };
  }
}

// ------------------------------------------------------------------ input processor

export class InputProcessor {
  constructor(controllers, log, clock) {
    this.controllers = controllers;
    this.log = log;
    this.clock = clock;
    this.digital = new Set();
    this.analog = new Map();
    this.pulses = new Map();
    this.rest = new Map();
    this.reported = new Set();
    this.motionAcc = [0, 0];
    this.motionIdentified = [false, false];
    this.lastMotionDetect = [null, null];
    this.detecting = false;
    this.onDetect = null;
    this.onIdentified = null;
    this.stats = new Stats();
    this.device = '';
  }

  get state() {
    return { digital: this.digital, analog: this.analog };
  }

  /** ev: {type:'button'|'axis'|'motion'|'pulse', id?, pressed?, value?, dx?, dy?, t, device} */
  process(ev) {
    const now = this.clock();
    this.device = ev.device;
    this.stats.record(ev.t, now, ev.type === 'motion' ? ev.samples || 1 : 0);
    if (ev.type === 'button') {
      const changed = this.setDigital(ev.id, ev.pressed, []);
      if (changed) this.controllers.onPhysical(this.state, now);
      return changed;
    }
    if (ev.type === 'axis') return this.onAxis(ev.id, ev.value, now);
    if (ev.type === 'motion') return this.onMotion(ev.dx, ev.dy, now);
    if (ev.type === 'pulse') return this.onPulse(ev.id, now);
    return false;
  }

  setDigital(id, pressed, alternatives) {
    if (this.digital.has(id) === pressed) return false;
    if (pressed) this.digital.add(id);
    else this.digital.delete(id);
    const label = labelOf(id);
    this.log.add('physical', `${label} ${pressed ? 'pressionado' : 'solto'}`);
    if (pressed) this.onIdentified?.(id, 'digital');
    if (this.detecting) this.onDetect?.({ sourceId: id, label, kind: 'digital', state: pressed ? 'PRESSED' : 'RELEASED', value: pressed ? 1 : 0, alternatives, device: this.device });
    return true;
  }

  onAxis(id, value, now) {
    const prev = this.analog.get(id);
    if (prev !== undefined && Math.abs(prev - value) < 0.004) return false;
    if (prev === undefined && Math.abs(value) < 0.004 && !this.rest.has(id)) {
      this.rest.set(id, value);
      return false;
    }
    if (!this.rest.has(id)) this.rest.set(id, value);
    if (Math.abs(value) < 0.004) this.analog.delete(id);
    else this.analog.set(id, value);
    const name = id.slice(5);
    const hyst = (was, v) => (was ? v > 0.35 : v >= 0.5);
    this.setDigital(`axis:${name}:+`, hyst(this.digital.has(`axis:${name}:+`), value), [id]);
    this.setDigital(`axis:${name}:-`, hyst(this.digital.has(`axis:${name}:-`), -value), [id]);
    if (Math.abs(value - (this.rest.get(id) || 0)) >= 0.25 && !this.reported.has(id)) {
      this.reported.add(id);
      this.onIdentified?.(id, 'analog');
    }
    this.controllers.onPhysical(this.state, now);
    return true;
  }

  onMotion(dx, dy, now) {
    if (!dx && !dy) return false;
    this.motionAcc[0] += dx;
    this.motionAcc[1] += dy;
    for (let axis = 0; axis < 2; axis++) {
      const id = axis === 0 ? 'mouse:x' : 'mouse:y';
      const acc = this.motionAcc[axis];
      if (Math.abs(acc) >= 40) {
        if (!this.motionIdentified[axis]) {
          this.motionIdentified[axis] = true;
          this.onIdentified?.(id, 'relative');
        }
        const last = this.lastMotionDetect[axis];
        if (this.detecting && (last === null || now - last >= 800)) {
          this.lastMotionDetect[axis] = now;
          this.onDetect?.({ sourceId: id, label: labelOf(id), kind: 'relative', state: 'MOVED', value: acc, alternatives: [], device: this.device });
        }
        this.motionAcc[axis] = 0;
      }
    }
    return this.controllers.onMotion(dx, dy, now);
  }

  onPulse(id, now) {
    const already = this.digital.has(id);
    this.pulses.set(id, now + 60);
    if (already) return false;
    this.setDigital(id, true, []);
    this.controllers.onPhysical(this.state, now);
    return true;
  }

  tick(now) {
    let changed = false;
    for (const [id, at] of [...this.pulses]) {
      if (now >= at) {
        this.pulses.delete(id);
        changed = this.setDigital(id, false, []) || changed;
      }
    }
    if (changed) this.controllers.onPhysical(this.state, now);
    return changed;
  }

  needsTick() {
    return this.pulses.size > 0;
  }

  releaseAll(reason) {
    const now = this.clock();
    const had = this.digital.size > 0 || this.analog.size > 0;
    this.digital.clear();
    this.analog.clear();
    this.pulses.clear();
    this.rest.clear();
    this.motionAcc = [0, 0];
    this.controllers.onPhysical(this.state, now);
    this.controllers.reset(now);
    if (had && reason) this.log.add('system', `Todos os botões foram soltos (${reason})`);
  }
}

export class Stats {
  constructor() {
    this.reset();
  }

  reset() {
    this.start = null;
    this.events = 0;
    this.motion = 0;
    this.latSum = 0;
    this.latN = 0;
    this.latMax = 0;
    this.total = 0;
    this.last = { eventsPerSec: 0, motionHz: 0, latencyAvgMs: null, latencyMaxMs: null, totalEvents: 0 };
  }

  record(t, now, samples) {
    this.roll(now);
    this.events++;
    this.total++;
    this.motion += samples;
    if (t > 0 && t <= now && now - t < 5000) {
      const l = now - t;
      this.latSum += l;
      this.latN++;
      this.latMax = Math.max(this.latMax, l);
    }
  }

  roll(now) {
    if (this.start === null) {
      this.start = now;
      return false;
    }
    const el = now - this.start;
    if (el < 1000) return false;
    const k = 1000 / el;
    this.last = {
      eventsPerSec: Math.round(this.events * k),
      motionHz: Math.round(this.motion * k),
      latencyAvgMs: this.latN ? Math.round((this.latSum / this.latN) * 10) / 10 : null,
      latencyMaxMs: this.latN ? Math.round(this.latMax) : null,
      totalEvents: this.total,
    };
    this.start = now;
    this.events = 0;
    this.motion = 0;
    this.latSum = 0;
    this.latN = 0;
    this.latMax = 0;
    return true;
  }
}

export class EventLog {
  constructor(capacity = 200, wall = () => Date.now()) {
    this.capacity = capacity;
    this.entries = [];
    this.seq = 0;
    this.wall = wall;
  }

  add(c, m) {
    const e = { seq: ++this.seq, t: this.wall(), c, m };
    this.entries.push(e);
    if (this.entries.length > this.capacity) this.entries.splice(0, this.entries.length - this.capacity);
    return e;
  }

  since(seq) {
    return this.entries.filter((e) => e.seq > seq);
  }

  recent(n) {
    return this.entries.slice(-n);
  }

  clear() {
    this.entries = [];
  }
}

// ------------------------------------------------------------------ profiles

export function defaultStick(mode) {
  return { mode, smoothing: 0.1, returnSpeed: 6, x: { sensitivity: 1, deadzone: 0.08, curve: 1, max: 1, invert: false }, y: { sensitivity: 1, deadzone: 0.08, curve: 1, max: 1, invert: false } };
}

const num = (v, fallback, min, max) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

function decodeAxis(o, f) {
  if (!o || typeof o !== 'object') return f;
  return {
    sensitivity: num(o.sensitivity, f.sensitivity, 0.05, 10),
    deadzone: num(o.deadzone, f.deadzone, 0, 0.9),
    curve: num(o.curve, f.curve, 0.2, 5),
    max: num(o.max, f.max, 0.05, 1),
    invert: typeof o.invert === 'boolean' ? o.invert : f.invert,
  };
}

export function decodeStick(o, f) {
  if (!o || typeof o !== 'object') return f;
  return {
    mode: o.mode === 'virtual_stick' || o.mode === 'relative_mouse' ? o.mode : f.mode,
    smoothing: num(o.smoothing, f.smoothing, 0, 0.95),
    returnSpeed: num(o.returnSpeed, f.returnSpeed, 0, 50),
    x: decodeAxis(o.x, f.x),
    y: decodeAxis(o.y, f.y),
  };
}

export function decodeRule(o, index = 0) {
  if (!o || typeof o !== 'object') return null;
  const kind = kindOf(o.source);
  const targetId = LEGACY_TARGETS[o.target] || o.target;
  const t = target(targetId);
  if (!kind || !t || !isCompatible(kind, t.type)) return null;
  const rule = { id: String(o.id || `m${index}`).slice(0, 64), source: o.source, target: targetId };
  if (o.invert === true) rule.invert = true;
  if (o.threshold != null) rule.threshold = num(o.threshold, 0.5, 0.05, 0.95);
  if (o.scale != null && Number(o.scale) !== 1) rule.scale = num(o.scale, 1, 0.05, 10);
  return rule;
}

export function cleanName(raw) {
  const n = String(raw ?? '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 48);
  return n || null;
}

/** Decodes a profile; throws Error for unusable input. Returns {profile, warnings}. */
export function decodeProfile(o, template) {
  if (!o || typeof o !== 'object') throw new Error('Perfil inválido');
  const id = String(o.id || '').trim();
  if (!id || id.length > 64) throw new Error('Perfil sem identificador válido');
  const name = cleanName(o.name);
  if (!name) throw new Error('Perfil sem nome');
  const warnings = [];
  const mappings = [];
  const seen = new Set();
  (Array.isArray(o.mappings) ? o.mappings : []).forEach((m, i) => {
    if (mappings.length >= 256) return;
    const r = decodeRule(m, i);
    if (!r) {
      warnings.push(`Mapeamento nº ${i + 1} ignorado (entrada ou destino inválido)`);
      return;
    }
    if (seen.has(r.id)) r.id = `${r.id}-${i}`;
    seen.add(r.id);
    mappings.push(r);
  });
  const tl = template?.sticks?.left || defaultStick('virtual_stick');
  const tr = template?.sticks?.right || defaultStick('relative_mouse');
  const tb = template?.buttons || { analogThreshold: 0.5, digitalAnalogValue: 1 };
  const b = o.buttons;
  return {
    profile: {
      id,
      name,
      description: String(o.description || '').slice(0, 240),
      baseId: o.baseId || null,
      builtin: Boolean(o.builtin),
      updatedAt: Number(o.updatedAt) || 0,
      mappings,
      sticks: { left: decodeStick(o.sticks?.left, tl), right: decodeStick(o.sticks?.right, tr) },
      buttons: b ? { analogThreshold: num(b.analogThreshold, tb.analogThreshold, 0.05, 0.95), digitalAnalogValue: num(b.digitalAnalogValue, tb.digitalAnalogValue, 0, 1) } : { ...tb },
    },
    warnings,
  };
}

export function parseDefaults(templateJson, initialJson) {
  const template = decodeProfile(templateJson.profile).profile;
  const initial = initialJson.profiles.map((p) => {
    const d = decodeProfile(p, template).profile;
    return { ...d, builtin: true, baseId: d.id };
  });
  const active = initial.some((p) => p.id === initialJson.activeProfileId) ? initialJson.activeProfileId : initial[0].id;
  return { template, initial, active };
}

// ------------------------------------------------------------------ demo

const DEMO_PRESSES = [
  ['mouse:btn:primary', 2200, 2600],
  ['key:BUTTON_A', 3000, 3400],
  ['key:BUTTON_B', 3700, 4100],
  ['key:BUTTON_1', 4400, 4800],
  ['key:BUTTON_2', 5000, 5400],
  ['key:BUTTON_3', 5600, 6200],
  ['key:BUTTON_4', 6400, 7000],
  ['key:VOLUME_UP', 7300, 7600],
];

export class DemoScript {
  constructor() {
    this.pressed = new Set();
  }

  step(elapsed, now) {
    const t = elapsed % 8000;
    const out = [];
    if (t < 2000) {
      const a = (2 * Math.PI * t) / 2000;
      out.push({ type: 'motion', dx: Math.cos(a) * 7, dy: Math.sin(a) * 7, t: now, device: 'demo' });
    }
    for (const [id, s, e] of DEMO_PRESSES) {
      const should = t >= s && t < e;
      if (should && !this.pressed.has(id)) {
        this.pressed.add(id);
        out.push({ type: 'button', id, pressed: true, t: now, device: 'demo' });
      } else if (!should && this.pressed.has(id)) {
        this.pressed.delete(id);
        out.push({ type: 'button', id, pressed: false, t: now, device: 'demo' });
      }
    }
    return out;
  }

  releaseAll(now) {
    const out = [...this.pressed].map((id) => ({ type: 'button', id, pressed: false, t: now, device: 'demo' }));
    this.pressed.clear();
    return out;
  }
}

// ------------------------------------------------------------------ browser input -> ids

const CODE_TO_KEY = {
  ArrowUp: 'DPAD_UP', ArrowDown: 'DPAD_DOWN', ArrowLeft: 'DPAD_LEFT', ArrowRight: 'DPAD_RIGHT',
  Enter: 'ENTER', NumpadEnter: 'ENTER', Space: 'SPACE', Escape: 'ESCAPE', Backspace: 'DEL', Tab: 'TAB',
  MediaPlayPause: 'MEDIA_PLAY_PAUSE', MediaTrackNext: 'MEDIA_NEXT', MediaTrackPrevious: 'MEDIA_PREVIOUS', MediaStop: 'MEDIA_STOP',
  AudioVolumeUp: 'VOLUME_UP', AudioVolumeDown: 'VOLUME_DOWN', AudioVolumeMute: 'VOLUME_MUTE',
  BrowserBack: 'BACK', GoBack: 'BACK', PageUp: 'PAGE_UP', PageDown: 'PAGE_DOWN', ContextMenu: 'MENU',
  MediaFastForward: 'MEDIA_FAST_FORWARD', MediaRewind: 'MEDIA_REWIND', MediaPlay: 'MEDIA_PLAY', MediaPause: 'MEDIA_PAUSE',
  Select: 'DPAD_CENTER', Camera: 'CAMERA', Home: 'MOVE_HOME', End: 'MOVE_END',
};

const NO_NAME = new Set(['', 'Unidentified', 'Dead', 'Process']);

/**
 * Browser KeyboardEvent -> Android-style key name (same ids as the app).
 * Inside an Android WebView many VR Box buttons arrive without a name ("Unidentified");
 * then the numeric key code keeps each button distinct ("Tecla código 96").
 */
export function keyNameFromEvent(code, key, keyCode = 0) {
  if (CODE_TO_KEY[code]) return CODE_TO_KEY[code];
  if (CODE_TO_KEY[key]) return CODE_TO_KEY[key];
  let m = /^Key([A-Z])$/.exec(code || '');
  if (m) return m[1];
  m = /^(?:Digit|Numpad)(\d)$/.exec(code || '');
  if (m) return m[1];
  const clean = (v) => String(v).toUpperCase().replace(/[^A-Z0-9_]/g, '_').replace(/^_+|_+$/g, '').slice(0, 48);
  if (code && !NO_NAME.has(code)) {
    const c = clean(code);
    if (/[A-Z0-9]/.test(c)) return c;
  }
  if (key && !NO_NAME.has(key)) {
    const k = clean(key);
    if (/[A-Z0-9]/.test(k)) return k;
  }
  return keyCode > 0 ? String(keyCode) : null;
}

const STANDARD_BUTTONS = ['BUTTON_A', 'BUTTON_B', 'BUTTON_X', 'BUTTON_Y', 'BUTTON_L1', 'BUTTON_R1', 'BUTTON_L2', 'BUTTON_R2', 'BUTTON_SELECT', 'BUTTON_START', 'BUTTON_THUMBL', 'BUTTON_THUMBR', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'BUTTON_MODE'];
const STANDARD_AXES = ['X', 'Y', 'Z', 'RZ'];
const GENERIC_AXES = ['X', 'Y', 'Z', 'RZ', 'RX', 'RY', 'HAT_X', 'HAT_Y'];

/** Gamepad API button index -> key name (standard mapping uses Android names). */
export function gamepadButtonName(index, standard) {
  if (standard && STANDARD_BUTTONS[index]) return STANDARD_BUTTONS[index];
  return `BUTTON_${index + 1}`;
}

export function gamepadAxisName(index, standard) {
  if (standard) return STANDARD_AXES[index] || `AXIS${index}`;
  return GENERIC_AXES[index] || `AXIS${index}`;
}
