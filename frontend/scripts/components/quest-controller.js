// Stylized top view of a Quest Touch controller (original drawing, no brand artwork).
// Every control is an addressable SVG part that lights up with the virtual state.

import { s, setAttr, setClass } from '../dom.js';

const W = 200;

// Left-hand geometry; the right controller is a mirror image.
const BODY =
  'M100 30 C148 30 180 58 180 98 C180 132 158 156 128 164 C120 190 118 230 126 262 ' +
  'C128 272 120 278 110 276 L92 272 C82 270 78 262 78 252 C76 214 72 186 62 162 ' +
  'C36 150 20 126 20 98 C20 58 52 30 100 30 Z';
const TRIGGER = 'M58 41 Q100 13 142 41 L136 51 Q100 29 64 51 Z';

const LAYOUT = {
  left: { stick: [74, 92], primary: [128, 116, 'X'], secondary: [146, 82, 'Y'], menu: [104, 140, '≡'] },
  right: { stick: [126, 92], primary: [72, 116, 'A'], secondary: [54, 82, 'B'], menu: [96, 140, '◦'] },
};

export function createQuestController(hand) {
  const L = LAYOUT[hand];
  const mirror = hand === 'right' ? `translate(${W},0) scale(-1,1)` : null;
  const names = hand === 'left' ? ['x', 'y', 'menu'] : ['a', 'b', 'system'];

  const trigger = s('path', { class: 'qc__trigger qc-part', d: TRIGGER });
  const grip = s('rect', { class: 'qc__grip qc-part', x: 86, y: 178, width: 34, height: 76, rx: 15 });
  const stickBase = s('circle', { class: 'qc__stick-base', cx: L.stick[0], cy: L.stick[1], r: 25 });
  const knob = s('circle', { class: 'qc__knob qc-part', cx: L.stick[0], cy: L.stick[1], r: 14 });

  const button = (pos, cls, r) => {
    const g = s(
      'g',
      { class: `qc-part ${cls}` },
      s('circle', { cx: pos[0], cy: pos[1], r }),
      s('text', { x: pos[0], y: pos[1] + (r > 8 ? 4.5 : 3), 'text-anchor': 'middle' }, pos[2]),
    );
    return g;
  };
  const primary = button(L.primary, 'qc__btn', 12.5);
  const secondary = button(L.secondary, 'qc__btn', 12.5);
  const menu = button(L.menu, 'qc__btn qc__btn--small', 7.5);

  const svg = s(
    'svg',
    { class: `qc qc--${hand}`, viewBox: `0 0 ${W} 290`, role: 'img', 'aria-label': `${hand} virtual Quest controller` },
    s(
      'g',
      mirror ? { transform: mirror } : {},
      s('path', { class: 'qc__body', d: BODY }),
      s('ellipse', { class: 'qc__face', cx: 100, cy: 100, rx: 66, ry: 50 }),
      trigger,
      grip,
    ),
    stickBase,
    knob,
    primary,
    secondary,
    menu,
    s('text', { class: 'qc__label', x: W / 2, y: 22, 'text-anchor': 'middle' }, 'TRIGGER'),
    s('text', { class: 'qc__label', x: hand === 'left' ? 103 : 97, y: 286, 'text-anchor': 'middle' }, 'GRIP'),
  );

  let last = '';

  function update(state, threshold = 0.5) {
    if (!state) return;
    const b = state.buttons || {};
    const key = `${state.x}|${state.y}|${state.trigger}|${state.grip}|${b.stickClick}|${b[names[0]]}|${b[names[1]]}|${b[names[2]]}`;
    if (key === last) return;
    last = key;
    setAttr(knob, 'cx', (L.stick[0] + (state.x || 0) * 11).toFixed(1));
    setAttr(knob, 'cy', (L.stick[1] - (state.y || 0) * 11).toFixed(1));
    setClass(knob, 'is-on', Boolean(b.stickClick));
    setClass(knob, 'is-moved', Math.abs(state.x || 0) > 0.02 || Math.abs(state.y || 0) > 0.02);
    setClass(primary, 'is-on', Boolean(b[names[0]]));
    setClass(secondary, 'is-on', Boolean(b[names[1]]));
    setClass(menu, 'is-on', Boolean(b[names[2]]));
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
