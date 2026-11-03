// Recent events panel ("21:30:01 - BUTTON A PRESSED"). Newest first, bounded DOM size.

import { h, clear } from '../dom.js';
import { clockTime } from '../format.js';

const CAT = { physical: 'Controle', virtual: 'Virtual', system: 'App' };

export function createEventLog({ max = 150, categories = null, emptyText = 'Nada ainda.' } = {}) {
  const el = h('ol', { class: 'log', 'aria-live': 'off' });
  const empty = h('li', { class: 'log__empty' }, emptyText);
  let paused = false;
  let filter = categories ? new Set(categories) : null;
  el.append(empty);

  function row(e) {
    return h(
      'li',
      { class: `log__row log__row--${e.c}` },
      h('span', { class: 'log__time' }, clockTime(e.t)),
      h('span', { class: 'log__cat', title: CAT[e.c] || e.c }),
      h('span', { class: 'log__msg' }, e.m),
    );
  }

  /** Adds entries (oldest first). */
  function append(entries) {
    if (paused || !entries?.length) return;
    const list = filter ? entries.filter((e) => filter.has(e.c)) : entries;
    if (!list.length) return;
    if (empty.isConnected) empty.remove();
    const frag = document.createDocumentFragment();
    for (let i = list.length - 1; i >= 0; i--) frag.append(row(list[i]));
    el.prepend(frag);
    while (el.children.length > max) el.lastElementChild.remove();
  }

  function reset(entries = []) {
    clear(el);
    el.append(empty);
    const wasPaused = paused;
    paused = false;
    append(entries.slice(-max));
    paused = wasPaused;
  }

  return {
    el,
    append,
    reset,
    setPaused(v) {
      paused = v;
    },
    setFilter(cats, entries) {
      filter = cats ? new Set(cats) : null;
      reset(entries);
    },
  };
}
