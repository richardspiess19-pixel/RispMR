// Drawing of the common white VR Box remote: joystick on top, @ and power, C, B/A, D on the
// front, two triggers on the back. Parts can be highlighted (current step) or marked done.

import { s, setClass } from '../dom.js';

export const PARTS = ['joystick', 'at', 'power', 'C', 'B', 'A', 'D', 'trigTop', 'trigBottom'];

export function createVrBoxDrawing() {
  const parts = {};
  const button = (id, cx, cy, label, r = 14) => {
    const g = s('g', { class: 'vb__part vb__btn' }, s('circle', { cx, cy, r }), s('text', { x: cx, y: cy + 4.5, 'text-anchor': 'middle' }, label));
    parts[id] = g;
    return g;
  };

  parts.joystick = s('g', { class: 'vb__part vb__stick' }, s('circle', { class: 'vb__stick-base', cx: 80, cy: 72, r: 34 }), s('circle', { class: 'vb__stick-cap', cx: 80, cy: 72, r: 23 }));
  parts.trigTop = s('rect', { class: 'vb__part vb__trigger', x: 189, y: 62, width: 36, height: 34, rx: 8 });
  parts.trigBottom = s('rect', { class: 'vb__part vb__trigger', x: 189, y: 106, width: 36, height: 42, rx: 8 });

  const svg = s(
    'svg',
    { class: 'vb', viewBox: '0 0 250 300', role: 'img', 'aria-label': 'Controle VR Box' },
    // front
    s('rect', { class: 'vb__body', x: 22, y: 8, width: 116, height: 284, rx: 58 }),
    parts.joystick,
    button('at', 55, 142, '@', 13),
    button('power', 105, 142, '⏻', 13),
    button('C', 80, 184, 'C'),
    button('B', 55, 226, 'B'),
    button('A', 105, 226, 'A'),
    button('D', 80, 266, 'D'),
    // back
    s('rect', { class: 'vb__body', x: 177, y: 40, width: 60, height: 170, rx: 30 }),
    parts.trigTop,
    parts.trigBottom,
    s('text', { class: 'vb__caption', x: 207, y: 230, 'text-anchor': 'middle' }, 'atrás'),
    s('text', { class: 'vb__caption', x: 80, y: 300, 'text-anchor': 'middle' }, ''),
  );

  /** state: { [partId]: 'target' | 'done' | 'skipped' | undefined } */
  function update(state) {
    for (const id of PARTS) {
      const el = parts[id];
      if (!el) continue;
      setClass(el, 'is-target', state[id] === 'target');
      setClass(el, 'is-done', state[id] === 'done');
      setClass(el, 'is-skipped', state[id] === 'skipped');
    }
  }

  return { el: svg, update };
}
