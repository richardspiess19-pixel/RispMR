import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { fixed } from '../format.js';
import { confirmDialog } from '../ui.js';
import { createStickView } from '../components/stick-view.js';
import { fillRange } from './mapping.js';

// SETTINGS

const AXIS_FIELDS = [
  ['sensitivity', 'Sensitivity', 0.1, 5, 0.05],
  ['deadzone', 'Deadzone', 0, 0.6, 0.01],
  ['curve', 'Response curve', 0.3, 3, 0.05],
  ['max', 'Max output', 0.1, 1, 0.01],
];

const MODES = [
  ['relative_mouse', 'Relative mouse', 'Mode 1 — the stick follows mouse movement progressively and returns when the movement stops (speed based).'],
  ['virtual_stick', 'Virtual stick', 'Mode 2 — movement sets a virtual stick position that returns to the center at the return speed (0 = hold).'],
];

export default {
  id: 'settings',
  title: 'Settings',

  mount(root, ctx) {
    const profileHead = h('div', { class: 'row row--between' });
    const sticksWrap = h('div', { class: 'grid-2' });
    const buttonsBody = h('div', { class: 'stack' });
    const connBody = h('div');
    const uiBody = h('div');
    const aboutBody = h('dl', { class: 'kv' });
    const previews = {};
    const timers = {};

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'Settings'),
          h('h1', { class: 'page-title' }, 'Configuration'),
          h('p', { class: 'page-sub' }, 'Joystick and button settings belong to the active profile (press SAVE to keep them). Connection and interface options apply to the whole app.'),
        ),
      ),
      h('section', { class: 'card card--plain' }, profileHead),
      sticksWrap,
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Buttons & analog conversion')), buttonsBody),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Connection')), connBody),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Interface')), uiBody),
      ),
      h(
        'div',
        { class: 'grid-2' },
        h(
          'section',
          { class: 'card' },
          h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Restore defaults')),
          h(
            'div',
            { class: 'stack stack--sm' },
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => resetProfileSettings() }, icon('refresh'), 'Restore joystick & button settings of this profile'),
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => resetAppSettings() }, icon('refresh'), 'Reset app settings'),
            h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => ctx.nav('profiles') }, icon('layers'), 'Restore default profiles…'),
          ),
        ),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'About')), aboutBody),
      ),
    );

    const range = ({ label, value, min, max, step, digits = 2, onValue }) => {
      const out = h('span', { class: 'range__value' }, fixed(value, digits));
      const input = h('input', {
        type: 'range',
        min,
        max,
        step,
        value,
        'aria-label': label,
        onInput: (e) => {
          const v = Number(e.target.value);
          setText(out, fixed(v, digits));
          fillRange(e.target);
          onValue(v);
        },
      });
      fillRange(input);
      return h('label', { class: 'range' }, h('span', { class: 'range__head' }, label, out), input);
    };

    // Accumulates partial edits per hand and sends them debounced.
    const pending = { left: {}, right: {} };
    const renderedModes = { left: null, right: null };
    const edit = (hand, path, value) => {
      const p = pending[hand];
      if (path.length === 1) p[path[0]] = value;
      else p[path[0]] = { ...(p[path[0]] || {}), [path[1]]: value };
      clearTimeout(timers[hand]);
      timers[hand] = setTimeout(async () => {
        const patch = pending[hand];
        pending[hand] = {};
        const r = await ctx.run('profile.updateSticks', { [hand]: patch });
        if (r) ctx.store.set('profile', r, { silentSettings: true });
      }, 120);
    };

    const renderSticks = () => {
      const p = ctx.store.state.profile;
      if (!p) {
        render(sticksWrap, h('div', { class: 'empty' }, 'Joystick settings are available in the Android app.'));
        return;
      }
      render(
        sticksWrap,
        ['left', 'right'].map((hand) => {
          const cfg = p.sticks[hand];
          renderedModes[hand] = cfg.mode;
          const preview = createStickView({ label: `${hand} preview`, size: 130 });
          preview.setConfig(cfg);
          previews[hand] = preview;
          const modeSeg = h(
            'div',
            { class: 'seg' },
            MODES.map(([id, label]) =>
              h(
                'button',
                {
                  type: 'button',
                  class: cfg.mode === id ? 'is-active' : '',
                  onClick: () => edit(hand, ['mode'], id),
                },
                label,
              ),
            ),
          );
          const modeDesc = MODES.find(([id]) => id === cfg.mode)?.[2] || '';
          const axisBlock = (axis) =>
            h(
              'div',
              { class: 'stack stack--sm axis-block' },
              h(
                'div',
                { class: 'row row--between' },
                h('div', { class: 'section-title' }, `Axis ${axis.toUpperCase()}`),
                h(
                  'label',
                  { class: 'inline-check' },
                  h('input', { type: 'checkbox', checked: cfg[axis].invert, onChange: (e) => edit(hand, [axis, 'invert'], e.target.checked) }),
                  'Invert',
                ),
              ),
              AXIS_FIELDS.map(([key, label, min, max, step]) =>
                range({ label, value: cfg[axis][key], min, max, step, onValue: (v) => edit(hand, [axis, key], v) }),
              ),
            );
          return h(
            'section',
            { class: 'card stick-card' },
            h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, hand === 'left' ? 'Left joystick' : 'Right joystick')),
            h(
              'div',
              { class: 'stick-card__top' },
              preview.el,
              h('div', { class: 'stack stack--sm' }, h('div', { class: 'field__label' }, 'Mouse → joystick mode'), modeSeg, h('p', { class: 'muted small' }, modeDesc)),
            ),
            range({ label: 'Smoothing', value: cfg.smoothing, min: 0, max: 0.95, step: 0.01, onValue: (v) => edit(hand, ['smoothing'], v) }),
            range({ label: 'Return speed (per second)', value: cfg.returnSpeed, min: 0, max: 30, step: 0.5, digits: 1, onValue: (v) => edit(hand, ['returnSpeed'], v) }),
            h('div', { class: 'grid-2 axis-grid' }, axisBlock('x'), axisBlock('y')),
          );
        }),
      );
      renderLive(ctx.store.state.frame);
    };

    const renderProfileHead = () => {
      const p = ctx.store.state.profile;
      if (!p) {
        render(profileHead, h('span', { class: 'muted' }, 'No profile (browser preview).'));
        return;
      }
      render(
        profileHead,
        h('div', {}, h('div', { class: 'section-title' }, 'Active profile'), h('div', { class: 'list__title' }, p.name, p.dirty ? h('span', { class: 'badge badge--purple' }, 'Unsaved') : h('span', { class: 'badge badge--blue' }, 'Saved'))),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm btn--primary', type: 'button', disabled: !p.dirty, onClick: () => save() }, icon('save'), 'Save'),
          h('button', { class: 'btn btn--sm', type: 'button', disabled: !p.dirty, onClick: () => revert() }, icon('undo'), 'Discard'),
        ),
      );
    };

    const renderButtons = () => {
      const p = ctx.store.state.profile;
      if (!p) {
        render(buttonsBody);
        return;
      }
      let t1;
      const send = (patch) => {
        clearTimeout(t1);
        t1 = setTimeout(async () => {
          const r = await ctx.run('profile.updateButtons', patch);
          if (r) ctx.store.set('profile', r, { silentSettings: true });
        }, 150);
      };
      render(
        buttonsBody,
        range({ label: 'Analog → button threshold', value: p.buttons.analogThreshold, min: 0.05, max: 0.95, step: 0.05, onValue: (v) => send({ analogThreshold: v }) }),
        h('p', { class: 'muted small' }, 'An analog axis counts as PRESSED from this value. Trigger and grip also report PRESSED from this value.'),
        range({ label: 'Digital button → trigger/grip value', value: p.buttons.digitalAnalogValue, min: 0, max: 1, step: 0.05, onValue: (v) => send({ digitalAnalogValue: v }) }),
        h('p', { class: 'muted small' }, 'Analog intensity produced when a digital button drives a trigger or grip. Analog sources keep their real 0–1 intensity.'),
      );
    };

    const toggle = (key, title, desc) =>
      h(
        'label',
        { class: 'switch' },
        h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, title), desc ? h('span', { class: 'switch__desc' }, desc) : null),
        h('input', {
          type: 'checkbox',
          checked: Boolean(ctx.store.state.settings?.[key]),
          disabled: !ctx.store.state.settings,
          onChange: (e) => updateSetting({ [key]: e.target.checked }),
        }),
      );

    const renderApp = () => {
      render(
        connBody,
        toggle('autoSelectLastDevice', 'Reconnect automatically', 'Select the last controller again when Android reconnects it'),
        toggle('selectedDeviceOnly', 'Read only the selected controller', 'Off: read every external input device'),
        toggle('consumeControllerInput', 'Block controller input from the UI', 'Keeps VR Box clicks/keys from navigating the app while reading'),
        toggle('autoPointerCapture', 'Capture mouse movement', 'Uses Android pointer capture for mouse-mode controllers (relative movement, no cursor)'),
        toggle('showInternalDevices', 'Show built-in devices', 'List phone keys and internal input devices in the Device Manager'),
      );
      const logSize = h(
        'select',
        { class: 'select', disabled: !ctx.store.state.settings, onChange: (e) => updateSetting({ logSize: Number(e.target.value) }) },
        [100, 200, 500, 1000].map((n) => h('option', { value: n, selected: ctx.store.state.settings?.logSize === n }, `${n} events`)),
      );
      render(
        uiBody,
        toggle('reduceMotion', 'Reduce motion', 'Disable interface animations'),
        toggle('showRawCodes', 'Show raw event codes', 'Display Android identifiers (e.g. key:BUTTON_A) next to labels'),
        toggle('keepScreenOn', 'Keep screen on while emulating', 'Android only delivers input to the app while it is in the foreground'),
        h('label', { class: 'field field--row' }, h('span', { class: 'field__label' }, 'Event log size'), logSize),
      );
    };

    const renderAbout = () => {
      const i = ctx.store.state.info;
      render(
        aboutBody,
        h('dt', {}, 'App'),
        h('dd', {}, `VR BOX TO META QUEST EMULATOR ${i?.version || ''}`),
        h('dt', {}, 'Android'),
        h('dd', {}, i ? `${i.android} (API ${i.sdk})` : 'Browser preview'),
        h('dt', {}, 'Device'),
        h('dd', {}, i?.device || '—'),
        h('dt', {}, 'JS bridge'),
        h('dd', {}, i?.transport || ctx.bridge.transport),
      );
    };

    const renderLive = (frame) => {
      if (!frame?.v) return;
      for (const hand of ['left', 'right']) {
        const v = frame.v[hand];
        previews[hand]?.update(v.x, v.y, v.rx, v.ry);
      }
    };

    async function updateSetting(patch) {
      const s = await ctx.run('settings.update', patch);
      if (s) ctx.store.set('settings', s);
    }

    async function save() {
      const r = await ctx.run('profile.save');
      if (r) {
        ctx.store.set('profiles', r.profiles);
        ctx.store.set('profile', r.profile);
        ctx.toast('Profile saved', 'ok');
      }
    }

    async function revert() {
      const p = await ctx.run('profile.revert');
      if (p) ctx.store.set('profile', p);
    }

    async function resetProfileSettings() {
      if (!(await confirmDialog('Restore settings', 'Restore joystick and button settings of the active profile to their defaults? Mappings are not changed.', 'Restore'))) return;
      const p = await ctx.run('profile.resetSettings');
      if (p) {
        ctx.store.set('profile', p);
        ctx.toast('Defaults restored (unsaved)', 'ok');
      }
    }

    async function resetAppSettings() {
      if (!(await confirmDialog('Reset app settings', 'Reset connection, interface and output settings to their defaults?', 'Reset', true))) return;
      const s = await ctx.run('settings.reset');
      if (s) {
        ctx.store.set('settings', s);
        ctx.toast('App settings reset', 'ok');
      }
    }

    renderProfileHead();
    renderSticks();
    renderButtons();
    renderApp();
    renderAbout();

    let lastProfileKey = profileKey(ctx.store.state.profile);
    return {
      onProfile: (p, meta) => {
        renderProfileHead();
        // Re-render the sliders only when the change did not come from the sliders themselves.
        const key = profileKey(p);
        if (!meta?.silentSettings && key !== lastProfileKey) {
          renderSticks();
          renderButtons();
        } else {
          for (const hand of ['left', 'right']) previews[hand]?.setConfig(p.sticks[hand]);
          if (meta?.silentSettings && ['left', 'right'].some((hand) => p.sticks[hand].mode !== renderedModes[hand])) renderSticks();
        }
        lastProfileKey = key;
      },
      onSettings: renderApp,
      onFrame: renderLive,
    };
  },
};

function profileKey(p) {
  return p ? `${p.id}|${p.updatedAt}|${p.dirty}` : '';
}
