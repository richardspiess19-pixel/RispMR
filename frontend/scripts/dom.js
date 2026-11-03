// Tiny DOM helpers. Dynamic text always goes through textContent (device names come from
// external hardware and must never be interpreted as HTML).

const SVG_NS = 'http://www.w3.org/2000/svg';

function applyProps(el, props, isSvg) {
  if (!props) return;
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') {
      if (isSvg) el.setAttribute('class', value);
      else el.className = value;
    } else if (key === 'text') {
      el.textContent = String(value);
    } else if (key === 'html') {
      // Only used with trusted, static markup (icons).
      el.innerHTML = value;
    } else if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  }
}

function appendChildren(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child instanceof Node ? child : String(child));
  }
}

/** Creates an HTML element: h('div', { class: 'x', onClick }, 'text', child). */
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  applyProps(el, props, false);
  appendChildren(el, children);
  return el;
}

/** Creates an SVG element. */
export function s(tag, props, ...children) {
  const el = document.createElementNS(SVG_NS, tag);
  applyProps(el, props, true);
  appendChildren(el, children);
  return el;
}

/** Updates text only when it changed (avoids layout work at 60 Hz). */
export function setText(el, text) {
  const t = String(text);
  if (el.textContent !== t) el.textContent = t;
}

export function setClass(el, cls, on) {
  if (el.classList.contains(cls) !== Boolean(on)) el.classList.toggle(cls, Boolean(on));
}

export function setAttr(el, name, value) {
  const v = String(value);
  if (el.getAttribute(name) !== v) el.setAttribute(name, v);
}

export function setStyle(el, prop, value) {
  if (el.style.getPropertyValue(prop) !== value) el.style.setProperty(prop, value);
}

export function clear(el) {
  el.replaceChildren();
}

/** Replaces the content of el with the given children. */
export function render(el, ...children) {
  el.replaceChildren();
  appendChildren(el, children);
}
