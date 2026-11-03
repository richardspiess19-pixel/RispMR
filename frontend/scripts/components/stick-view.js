// Circular joystick indicator. Shows processed output (solid dot), raw input (ghost dot),
// the deadzone and the max-output rings.

import { s, setAttr } from '../dom.js';

const R = 60;

export function createStickView({ label = '', size = 150 } = {}) {
  const dz = s('circle', { class: 'stick__dz', cx: 0, cy: 0, r: 0 });
  const max = s('circle', { class: 'stick__max', cx: 0, cy: 0, r: R });
  const vec = s('line', { class: 'stick__vec', x1: 0, y1: 0, x2: 0, y2: 0 });
  const raw = s('circle', { class: 'stick__raw', cx: 0, cy: 0, r: 5 });
  const dot = s('circle', { class: 'stick__dot', cx: 0, cy: 0, r: 9 });
  const svg = s(
    'svg',
    { class: 'stick', viewBox: '-70 -70 140 140', width: size, height: size, role: 'img', 'aria-label': label || 'Joystick' },
    s('circle', { class: 'stick__ring', cx: 0, cy: 0, r: R }),
    s('line', { class: 'stick__axis', x1: -R, y1: 0, x2: R, y2: 0 }),
    s('line', { class: 'stick__axis', x1: 0, y1: -R, x2: 0, y2: R }),
    max,
    dz,
    vec,
    raw,
    dot,
  );

  let last = '';

  /** x/y in -1..1 with +y = up. */
  function update(x = 0, y = 0, rx = x, ry = y) {
    const key = `${x}|${y}|${rx}|${ry}`;
    if (key === last) return;
    last = key;
    const px = (x * R).toFixed(1);
    const py = (-y * R).toFixed(1);
    setAttr(dot, 'cx', px);
    setAttr(dot, 'cy', py);
    setAttr(vec, 'x2', px);
    setAttr(vec, 'y2', py);
    setAttr(raw, 'cx', (rx * R).toFixed(1));
    setAttr(raw, 'cy', (-ry * R).toFixed(1));
    svg.classList.toggle('is-active', Math.abs(x) > 0.01 || Math.abs(y) > 0.01);
  }

  /** Draws deadzone/max rings from a stick config ({ x: {deadzone, max}, y: {...} }). */
  function setConfig(cfg) {
    if (!cfg) return;
    const d = ((cfg.x?.deadzone ?? 0) + (cfg.y?.deadzone ?? 0)) / 2;
    const m = ((cfg.x?.max ?? 1) + (cfg.y?.max ?? 1)) / 2;
    setAttr(dz, 'r', (d * R).toFixed(1));
    setAttr(max, 'r', (m * R).toFixed(1));
  }

  return { el: svg, update, setConfig };
}
