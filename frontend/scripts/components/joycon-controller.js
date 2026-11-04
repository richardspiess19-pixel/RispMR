// Stylized front view of a Joy-Con style controller (original drawing, no brand artwork).
// Every control is an addressable SVG part that lights up with the virtual state.

import { s, setAttr, setClass } from '../dom.js';

const W = 120;
const H = 300;

// Left controller: rounded outer side on the left, straight rail on the right. The right one is a
// mirror image of the body; its buttons have their own positions.
const BODY = 'M104 14 L104 286 L62 286 C30 286 14 266 14 236 L14 64 C14 34 30 14 62 14 Z';
// L / R: the shoulder band along the top outer corner. ZL / ZR: the trigger above it.
const GRIP = 'M30 22 C40 12 52 9 66 9 L100 9 L100 18 L66 18 C55 18 45 21 37 28 Z';
const TRIGGER = 'M24 12 C36 2 50 -2 66 -2 L100 -2 L100 5 L66 5 C52 5 41 8 31 16 Z';

const LAYOUT = {
  left: {
    stick: [58, 84],
    buttons: [
      ['up', 58, 150, '▲', 11],
      ['down', 58, 194, '▼', 11],
      ['left', 36, 172, '◀', 11],
      ['right', 80, 172, '▶', 11],
      ['minus', 88, 36, '−', 7.5],
      ['capture', 74, 236, '■', 7.5],
    ],
    labels: [['ZL', 30, -6], ['L', 18, 30]],
  },
  right: {
    stick: [62, 176],
    buttons: [
      ['x', 62, 62, 'X', 11],
      ['b', 62, 106, 'B', 11],
      ['y', 40, 84, 'Y', 11],
      ['a', 84, 84, 'A', 11],
      ['plus', 32, 36, '+', 7.5],
      ['home', 46, 236, '⌂', 7.5],
    ],
    labels: [['ZR', 90, -6], ['R', 102, 30]],
  },
};

export function createJoyCon(hand) {
  const L = LAYOUT[hand];
  const mirror = hand === 'right' ? `translate(${W},0) scale(-1,1)` : null;

  const trigger = s('path', { class: 'qc__trigger qc-part', d: TRIGGER });
  const grip = s('path', { class: 'qc__grip qc-part', d: GRIP });
  const stickBase = s('circle', { class: 'qc__stick-base', cx: L.stick[0], cy: L.stick[1], r: 24 });
  const knob = s('circle', { class: 'qc__knob qc-part', cx: L.stick[0], cy: L.stick[1], r: 14 });

  const buttons = {};
  const buttonEls = L.buttons.map(([name, x, y, text, r]) => {
    const g = s(
      'g',
      { class: `qc-part qc__btn ${r < 9 ? 'qc__btn--small' : ''}` },
      s('circle', { cx: x, cy: y, r }),
      s('text', { x, y: y + (r > 8 ? 4.5 : 3.2), 'text-anchor': 'middle' }, text),
    );
    buttons[name] = g;
    return g;
  });

  const svg = s(
    'svg',
    {
      class: `qc qc--joycon qc--${hand}`,
      viewBox: `0 -14 ${W} ${H + 14}`,
      role: 'img',
      'aria-label': hand === 'left' ? 'Joy-Con virtual esquerdo' : 'Joy-Con virtual direito',
    },
    s('g', mirror ? { transform: mirror } : {}, s('path', { class: 'qc__body', d: BODY }), trigger, grip),
    stickBase,
    knob,
    buttonEls,
    L.labels.map(([t, x, y]) => s('text', { class: 'qc__label', x, y, 'text-anchor': 'middle' }, t)),
  );

  let last = '';

  function update(state, threshold = 0.5) {
    if (!state) return;
    const b = state.buttons || {};
    const key = `${state.x}|${state.y}|${state.trigger}|${state.grip}|${JSON.stringify(b)}`;
    if (key === last) return;
    last = key;
    setAttr(knob, 'cx', (L.stick[0] + (state.x || 0) * 11).toFixed(1));
    setAttr(knob, 'cy', (L.stick[1] - (state.y || 0) * 11).toFixed(1));
    setClass(knob, 'is-on', Boolean(b.stickClick));
    setClass(knob, 'is-moved', Math.abs(state.x || 0) > 0.02 || Math.abs(state.y || 0) > 0.02);
    for (const [name, el] of Object.entries(buttons)) setClass(el, 'is-on', Boolean(b[name]));
    setAnalog(trigger, state.trigger || 0, threshold);
    setAnalog(grip, state.grip || 0, threshold);
  }

  return { el: svg, update };
}

function setAnalog(el, value, threshold) {
  el.style.setProperty('--level', String(Math.max(0, Math.min(1, value))));
  setClass(el, 'is-on', value >= threshold);
  setClass(el, 'is-partial', value > 0.01 && value < threshold);
}
