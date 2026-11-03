// Boot, navigation and native push dispatch.

import { createBridge } from './bridge.js';
import { createStore } from './store.js';
import { h, render, setClass, setText } from './dom.js';
import { icon } from './icons.js';
import { toast, modal } from './ui.js';
import { bluetoothIndicator, controllerIndicator, emulationIndicator } from './format.js';
import dashboard from './views/dashboard.js';
import devices from './views/devices.js';
import detect from './views/detect.js';
import mapping from './views/mapping.js';
import controllers from './views/controllers.js';
import tester from './views/tester.js';
import profiles from './views/profiles.js';
import settings from './views/settings.js';
import integration from './views/integration.js';
import game from './views/game.js';
import setup from './views/setup.js';

const VIEWS = { dashboard, devices, detect, mapping, controllers, tester, profiles, settings, integration, game, setup };

const NAV_MAIN = [
  ['dashboard', 'Início', 'home'],
  ['setup', 'Configurar', 'wand'],
  ['tester', 'Testar', 'activity'],
  ['game', 'Jogo', 'target'],
];
const NAV_MORE = [
  ['devices', 'Controle', 'bluetooth'],
  ['mapping', 'Botões (manual)', 'sliders'],
  ['detect', 'Detectar botões', 'radar'],
  ['controllers', 'Controles virtuais', 'gamepad'],
  ['profiles', 'Perfis', 'layers'],
  ['settings', 'Configurações', 'settings'],
  ['integration', 'Integração', 'link'],
];

const bridge = createBridge();
const store = createStore();
const viewEl = document.getElementById('view');
const navEl = document.getElementById('nav');
const bannerEl = document.getElementById('banner');
const chipsEl = document.getElementById('topChips');

const ctx = {
  bridge,
  store,
  toast,
  nav,
  keepDetection: false,
  /** Calls a native command; shows errors as toasts and resolves null on failure. */
  async run(cmd, args = {}, opts) {
    try {
      return await bridge.call(cmd, args, opts);
    } catch (e) {
      if (e.code === 'cancelled') return null;
      if (e.code === 'no_native') toast('Isso funciona só no app Android.');
      else toast(e.message, 'error', 4200);
      return null;
    }
  },
};

// ------------------------------------------------------------------ navigation

let current = null;

function buildNav() {
  const item = ([id, label, ic]) =>
    h(
      'a',
      {
        class: 'nav__item',
        href: `#/${id}`,
        dataset: { nav: id },
        onClick: (e) => {
          e.preventDefault();
          nav(id);
        },
      },
      icon(ic),
      h('span', {}, label),
    );
  render(
    navEl,
    NAV_MAIN.map(item),
    h('div', { class: 'nav__more-list' }, NAV_MORE.map(item)),
    h(
      'button',
      { class: 'nav__item nav__item--more', type: 'button', dataset: { nav: 'more' }, onClick: openMore },
      icon('more'),
      h('span', {}, 'Mais'),
    ),
  );
}

function openMore() {
  modal({
    title: 'Mais',
    body: h(
      'div',
      { class: 'more-grid' },
      NAV_MORE.map(([id, label, ic]) =>
        h(
          'a',
          {
            class: 'more-grid__item',
            href: `#/${id}`,
            onClick: (e) => {
              e.preventDefault();
              document.querySelector('.modal-backdrop')?.click();
              nav(id);
            },
          },
          icon(ic),
          h('span', {}, label),
        ),
      ),
    ),
    actions: [],
  });
}

/**
 * Screens replace the history entry instead of adding one: Android's BACK (which the VR Box
 * sends in several modes) must not walk back through screens or close the app.
 */
function nav(id) {
  const hash = `#/${id}`;
  if (location.hash !== hash) history.replaceState(history.state, '', hash);
  route();
}

/** Back gesture / BACK: close a dialog, else go to Início. Returns false on Início. */
window.__vrbqBack = () => {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.click();
    return true;
  }
  if (current && current.id !== 'dashboard') {
    nav('dashboard');
    return true;
  }
  return false;
};

function route() {
  const id = location.hash.replace(/^#\/?/, '') || 'dashboard';
  const view = VIEWS[id] || VIEWS.dashboard;
  if (current?.id === view.id) return;
  try {
    current?.handle?.unmount?.();
  } catch (e) {
    console.error(e);
  }
  document.querySelector('.modal-backdrop')?.remove();
  viewEl.replaceChildren();
  viewEl.classList.remove('view-enter');
  void viewEl.offsetWidth;
  viewEl.classList.add('view-enter');
  let handle = {};
  try {
    handle = view.mount(viewEl, ctx) || {};
  } catch (e) {
    console.error(e);
    viewEl.append(h('div', { class: 'notice notice--err' }, icon('alert'), h('div', {}, `Esta tela deu erro: ${e.message}`)));
  }
  current = { id: view.id, handle };
  for (const a of navEl.querySelectorAll('[data-nav]')) {
    const on = a.dataset.nav === view.id || (a.dataset.nav === 'more' && NAV_MORE.some(([x]) => x === view.id));
    setClass(a, 'is-active', on);
    if (a.tagName === 'A') a.setAttribute('aria-current', a.dataset.nav === view.id ? 'page' : 'false');
  }
  window.scrollTo(0, 0);
  document.title = `${view.title} · VR Box → Quest`;
}

const call = (name, ...args) => {
  const fn = current?.handle?.[name];
  if (!fn) return;
  try {
    fn(...args);
  } catch (e) {
    console.error(`${name} failed`, e);
  }
};

// ------------------------------------------------------------------ chrome

const chips = {};
function buildChips() {
  for (const [key, ic] of [
    ['bt', 'bluetooth'],
    ['ctrl', 'gamepad'],
    ['emu', 'target'],
  ]) {
    const text = h('span', {}, '—');
    const el = h('span', { class: 'chip', title: key }, h('span', { class: 'dot' }), icon(ic), text);
    chips[key] = { el, text };
    chipsEl.append(el);
  }
}

function renderChrome(status) {
  const set = (key, ind, label) => {
    const c = chips[key];
    setText(c.text, label ?? ind.value);
    c.el.title = `${ind.value}${ind.hint ? ` — ${ind.hint}` : ''}`;
    for (const t of ['ok', 'warn', 'err']) setClass(c.el, `is-${t}`, ind.tone === t);
  };
  const bt = bluetoothIndicator(status);
  const ctrl = controllerIndicator(status);
  const emu = emulationIndicator(status);
  set('bt', bt, bt.tone === 'ok' ? 'OK' : bt.tone === 'err' ? 'Desl.' : bt.tone === 'warn' ? '?' : '—');
  set('ctrl', ctrl, ctrl.tone === 'ok' ? 'OK' : ctrl.value === 'Demonstração' ? 'Demo' : '—');
  set('emu', emu, emu.tone === 'ok' ? 'Ligada' : 'Parada');

  if (!store.state.native) {
    showBanner('preview', 'Prévia no navegador — instale o app no celular para usar o controle.');
  } else if (status?.demo) {
    showBanner('demo', 'Modo demonstração — os comandos são simulados');
  } else if (store.state.info?.platform === 'web') {
    showBanner('preview', 'Versão web — para os jogos reagirem (Modo jogo) use o app Android');
  } else {
    showBanner(null);
  }
}

function showBanner(kind, text) {
  if (!kind) {
    bannerEl.hidden = true;
    return;
  }
  bannerEl.hidden = false;
  bannerEl.className = `mode-banner mode-banner--${kind}`;
  setText(bannerEl, text);
}

function applySettings(s) {
  document.documentElement.classList.toggle('reduce-motion', Boolean(s?.reduceMotion) || matchMedia('(prefers-reduced-motion: reduce)').matches);
  document.documentElement.classList.toggle('hide-raw', s ? !s.showRawCodes : false);
}

// ------------------------------------------------------------------ native pushes

let rafPending = false;
let pendingLog = [];

function scheduleRender() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    call('onFrame', store.state.frame);
    if (pendingLog.length) {
      const entries = pendingLog;
      pendingLog = [];
      call('onLog', entries);
    }
  });
}

bridge.onPush((msg) => {
  switch (msg.type) {
    case 'frame': {
      const events = store.applyFrame(msg);
      if (events.length) pendingLog.push(...events);
      scheduleRender();
      break;
    }
    case 'status':
      store.set('status', msg.status);
      break;
    case 'devices':
      store.set('devices', msg.devices);
      break;
    case 'identified':
      store.set('identified', msg.identified);
      break;
    case 'detected':
      store.addDetection(msg.detection);
      break;
    default:
      break;
  }
});

store.on('status', (s) => {
  renderChrome(s);
  call('onStatus', s);
});
store.on('devices', (d) => call('onDevices', d));
store.on('profile', (p, meta) => call('onProfile', p, meta));
store.on('profiles', (p) => call('onProfiles', p));
store.on('settings', (s) => {
  applySettings(s);
  call('onSettings', s);
});
store.on('identified', (i) => call('onIdentified', i));
store.on('detected', (d) => call('onDetected', d));
store.on('stats', (s) => call('onStats', s));

// ------------------------------------------------------------------ boot

async function boot() {
  buildNav();
  buildChips();
  window.addEventListener('hashchange', route);
  if (bridge.available) {
    try {
      const hello = await bridge.call('app.hello', {}, { timeout: 8000 });
      store.init(hello);
      applySettings(hello.settings);
    } catch (e) {
      toast(`Não consegui falar com o app: ${e.message}`, 'error', 6000);
    }
  } else {
    applySettings(null);
  }
  renderChrome(store.state.status);
  route();
}

boot();
