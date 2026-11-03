import { h, setText, setClass } from '../dom.js';
import { icon } from '../icons.js';
import {
  bluetoothIndicator,
  controllerIndicator,
  inputIndicator,
  emulationIndicator,
  handIndicator,
  integrationIndicator,
  identifiedIndicator,
  fixed,
} from '../format.js';
import { createStickView } from '../components/stick-view.js';
import { modal } from '../ui.js';

const TILES = [
  ['bluetooth', 'Bluetooth', bluetoothIndicator],
  ['controller', 'Controller', controllerIndicator],
  ['input', 'Input', inputIndicator],
  ['emulation', 'Emulation', emulationIndicator],
  ['left', 'Left Controller', (s) => handIndicator(s, 'left')],
  ['right', 'Right Controller', (s) => handIndicator(s, 'right')],
  ['integration', 'VR Integration', integrationIndicator],
  ['identified', 'Buttons identified', identifiedIndicator],
];

export default {
  id: 'dashboard',
  title: 'Dashboard',

  mount(root, ctx) {
    const tiles = {};
    const tileEls = TILES.map(([key, label]) => {
      const value = h('div', { class: 'tile__value' }, '—');
      const hint = h('div', { class: 'tile__hint' }, '');
      const el = h('div', { class: 'tile', dataset: { tile: key } }, h('div', { class: 'tile__label' }, label), value, hint);
      tiles[key] = { el, value, hint };
      return el;
    });

    const deviceName = h('div', { class: 'device-line__name' }, 'No controller selected');
    const deviceMeta = h('div', { class: 'device-line__meta' }, 'Pair the VR Box in Android Bluetooth settings, then press CONNECT CONTROLLER.');

    const btn = (label, iconName, kind, onClick, extra = '') =>
      h('button', { class: `btn ${kind ? `btn--${kind}` : ''} ${extra}`, type: 'button', onClick }, icon(iconName), label);

    const actions = h(
      'div',
      { class: 'btn-grid' },
      btn('Connect controller', 'plug', 'primary', () => connect(ctx)),
      btn('Disconnect', 'unplug', '', () => disconnect(ctx)),
      btn('Start emulation', 'play', 'blue', () => startEmulation(ctx)),
      btn('Stop emulation', 'stop', '', () => ctx.run('emulation.stop')),
      btn('Controller mapping', 'sliders', '', () => ctx.nav('mapping')),
      btn('Test controller', 'activity', '', () => ctx.nav('tester')),
      btn('Settings', 'settings', '', () => ctx.nav('settings')),
      btn('Virtual controllers', 'gamepad', '', () => ctx.nav('controllers')),
    );

    // Live preview
    const sticks = { left: createStickView({ label: 'Left joystick', size: 112 }), right: createStickView({ label: 'Right joystick', size: 112 }) };
    const bars = {};
    const handPreview = (hand) => {
      const mk = (name) => {
        const fill = h('div', { class: 'bar__fill' });
        const val = h('span', { class: 'meter__value' }, '0.00');
        bars[`${hand}.${name}`] = { fill, val };
        return h('div', { class: 'meter' }, h('span', { class: 'meter__label' }, name), h('div', { class: 'bar' }, fill), val);
      };
      return h(
        'div',
        { class: 'mini-hand' },
        h('div', { class: 'section-title' }, hand === 'left' ? 'Left' : 'Right'),
        sticks[hand].el,
        h('div', { class: 'stack stack--sm mini-hand__bars' }, mk('trigger'), mk('grip')),
      );
    };

    const steps = [
      ['paired', 'Pair the VR Box in Android Bluetooth settings'],
      ['selected', 'Select the controller in this app'],
      ['identified', 'Identify its buttons (Automatic Input Detection)'],
      ['mapped', 'Map buttons to the virtual Quest inputs'],
      ['tested', 'Test the commands'],
      ['saved', 'Save the profile'],
      ['emulating', 'Start emulation'],
    ];
    const stepEls = {};
    const guide = h(
      'ol',
      { class: 'guide' },
      steps.map(([key, text], i) => {
        const li = h('li', { class: 'guide__step' }, h('span', { class: 'guide__num' }, String(i + 1)), h('span', {}, text));
        stepEls[key] = li;
        return li;
      }),
    );

    root.append(
      h(
        'section',
        { class: 'hero' },
        h('img', { class: 'hero__logo', src: 'assets/logo.svg', alt: '' }),
        h(
          'div',
          { class: 'hero__text' },
          h('div', { class: 'page-kicker' }, 'Input emulator'),
          h('h1', { class: 'hero__title' }, h('span', {}, 'VR BOX'), ' TO META QUEST ', h('em', {}, 'EMULATOR')),
          h('p', { class: 'page-sub' }, 'Reads a Bluetooth VR Box controller and converts its commands into two virtual Quest Touch-style controllers.'),
        ),
      ),
      h('div', { class: 'tiles' }, tileEls),
      h(
        'div',
        { class: 'card card--glow device-line' },
        h('div', { class: 'device-line__icon' }, icon('gamepad')),
        h('div', { class: 'device-line__text' }, deviceName, deviceMeta),
      ),
      actions,
      h(
        'div',
        { class: 'grid-2' },
        h(
          'div',
          { class: 'card' },
          h('div', { class: 'card__head' }, h('div', { class: 'card__title' }, 'Live virtual state'), h('span', { class: 'badge badge--outline', dataset: { live: '' } }, 'Preview')),
          h('div', { class: 'mini-hands' }, handPreview('left'), handPreview('right')),
        ),
        h('div', { class: 'card' }, h('div', { class: 'card__head' }, h('div', { class: 'card__title' }, 'Quick start')), guide),
      ),
    );

    const liveBadge = root.querySelector('[data-live]');

    const renderStatus = (status) => {
      for (const [key, , fn] of TILES) {
        const ind = fn(status);
        const t = tiles[key];
        setText(t.value, ind.value);
        setText(t.hint, ind.hint);
        for (const tone of ['ok', 'warn', 'err']) setClass(t.el, `is-${tone}`, ind.tone === tone);
      }
      const c = status?.controller;
      if (c?.demo) {
        setText(deviceName, 'DEMO VR Box (simulated input)');
        setText(deviceMeta, 'DEMO MODE: no real device is connected. Every event is generated by the app.');
      } else if (c?.selected) {
        setText(deviceName, c.selected.name);
        const vendor = c.selected.vendor ? ` · ${c.selected.vendor}` : '';
        setText(deviceMeta, `${c.connected ? 'Connected' : 'Disconnected — waiting for reconnection'} · Android presents it as: ${c.selected.roles.join(' + ') || c.selected.primaryType} · ${c.selected.vidPid}${vendor}`);
      } else {
        setText(deviceName, 'No controller selected');
        setText(deviceMeta, 'Pair the VR Box in Android Bluetooth settings, then press CONNECT CONTROLLER.');
      }
      if (liveBadge) setText(liveBadge, status?.emulation?.running ? (status.emulation.output === 'udp' ? 'Emulating · UDP' : 'Emulating · local') : 'Preview');
      const done = {
        paired: ['connected', 'unverified'].includes(status?.bluetooth?.link) || Boolean(c?.selected),
        selected: Boolean(c?.selected) || Boolean(c?.demo),
        identified: (status?.identifiedCount || 0) > 0,
        mapped: Boolean(status?.left?.configured || status?.right?.configured),
        tested: (ctx.store.state.stats?.totalEvents || 0) > 0,
        saved: status ? !status.profile?.dirty : false,
        emulating: Boolean(status?.emulation?.running),
      };
      for (const [key] of steps) setClass(stepEls[key], 'is-done', done[key]);
    };

    const renderFrame = (frame) => {
      if (!frame?.v) return;
      for (const hand of ['left', 'right']) {
        const v = frame.v[hand];
        sticks[hand].update(v.x, v.y, v.rx, v.ry);
        for (const name of ['trigger', 'grip']) {
          const b = bars[`${hand}.${name}`];
          b.fill.style.transform = `scaleX(${v[name]})`;
          setText(b.val, fixed(v[name]));
        }
      }
    };

    renderStatus(ctx.store.state.status);
    renderFrame(ctx.store.state.frame);
    const profile = ctx.store.state.profile;
    if (profile) {
      sticks.left.setConfig(profile.sticks.left);
      sticks.right.setConfig(profile.sticks.right);
    }

    return {
      onStatus: renderStatus,
      onFrame: renderFrame,
      onProfile: (p) => {
        sticks.left.setConfig(p.sticks.left);
        sticks.right.setConfig(p.sticks.right);
      },
    };
  },
};

export async function connect(ctx) {
  const r = await ctx.run('input.connect');
  if (!r) return;
  if (r.selected) {
    ctx.toast(`Controller selected: ${r.selected.name}`, 'ok');
    return;
  }
  const choice = await modal({
    title: 'No controller detected',
    body: h(
      'div',
      { class: 'stack' },
      h('p', {}, r.bluetoothEnabled === false ? 'Bluetooth is off.' : 'Android does not report a VR Box (or another external controller) right now.'),
      h(
        'ol',
        { class: 'steps' },
        h('li', {}, 'Turn on the VR Box (usually hold @ / power for 3 s).'),
        h('li', {}, 'Open Android Bluetooth settings and pair it (name is often "VR BOX" or "VR-PARK").'),
        h('li', {}, 'Come back to the app: it is detected automatically.'),
      ),
      r.candidates > 1 ? h('p', { class: 'muted' }, `${r.candidates} input devices found — choose one in the Device Manager.`) : null,
    ),
    actions: [
      { label: 'Device manager', value: 'devices', kind: 'ghost' },
      { label: 'Bluetooth settings', value: 'bt', kind: 'primary' },
    ],
  });
  if (choice === 'bt') ctx.run('bt.openSettings');
  if (choice === 'devices') ctx.nav('devices');
}

export async function disconnect(ctx) {
  const st = ctx.store.state.status;
  if (!st?.controller?.selected && !st?.controller?.demo) {
    ctx.toast('No controller is selected.', 'warn');
    return;
  }
  const r = await ctx.run('input.release');
  if (r) ctx.toast('Controller released. Android keeps the Bluetooth link; disconnect it in Bluetooth settings if needed.', 'ok', 4200);
}

export async function startEmulation(ctx) {
  const r = await ctx.run('emulation.start');
  if (!r) return;
  if (r.emulation?.output === 'udp') ctx.toast(`Emulation running · VRBQ UDP → ${r.integration.target}`, 'ok');
  else ctx.toast('Emulation running locally. Enable an output in VR Integration to send it to other apps.', 'warn', 4200);
}
