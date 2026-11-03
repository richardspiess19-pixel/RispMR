import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { protocolPreview } from '../format.js';

// VR INTEGRATION — honest status of every mechanism that was evaluated.

const MECHANISMS = [
  {
    name: 'VRBQ network protocol (UDP)',
    status: 'available',
    text: 'Implemented. Streams both virtual controllers (sticks, trigger, grip, buttons) to any app that reads the documented VRBQ protocol — on this phone (127.0.0.1) or on another device in the local network.',
  },
  {
    name: 'OpenXR runtime on this phone',
    status: 'unavailable',
    text: 'Regular Android phones have no OpenXR runtime that accepts external controllers. Only the runtime (Meta Horizon OS, Android XR, Monado…) produces controller input for OpenXR apps; an app cannot register virtual Touch controllers into it.',
  },
  {
    name: 'OpenXR API layer for VR games',
    status: 'planned',
    text: 'Not yet available. A layer that replaces /interaction_profiles/oculus/touch_controller input with VRBQ data must be loaded inside the game process (packaged with the game or the runtime). Design documented in integration/RuntimeIntegration.',
  },
  {
    name: 'Android system input injection',
    status: 'impossible',
    text: 'Not possible for regular apps: InputManager.injectInputEvent needs the INJECT_EVENTS signature permission, /dev/uinput needs root. Accessibility services can only perform touch gestures.',
  },
  {
    name: 'Phone as Bluetooth HID gamepad',
    status: 'planned',
    text: 'Not yet available. Android 9+ BluetoothHidDevice could present the phone to a PC/headset as a generic gamepad — but it would be a gamepad, never Quest Touch controllers.',
  },
];

const BADGE = {
  available: ['badge--blue', 'Available'],
  unavailable: ['badge--danger', 'Unavailable'],
  planned: ['badge--purple', 'Not yet available'],
  impossible: ['badge--danger', 'Not possible'],
};

const PATHS = [
  ['Joystick X/Y', '/input/thumbstick/x , /y', 'left.stick / right.stick'],
  ['Joystick Click', '/input/thumbstick/click', 'click'],
  ['X / A', '/input/x/click , /input/a/click', 'x / a'],
  ['Y / B', '/input/y/click , /input/b/click', 'y / b'],
  ['Trigger', '/input/trigger/value', 'trigger'],
  ['Grip', '/input/squeeze/value', 'grip'],
  ['Menu (left)', '/input/menu/click', 'menu'],
  ['System (right)', '/input/system/click (runtime reserved)', 'system'],
];

export default {
  id: 'integration',
  title: 'Integration',

  mount(root, ctx) {
    const form = h('div', { class: 'stack' });
    const live = h('dl', { class: 'kv' });
    const preview = h('pre', { class: 'code' });
    const broker = h('p', { class: 'muted small' });

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'VR integration'),
          h('h1', { class: 'page-title' }, 'Output to VR apps'),
          h(
            'p',
            { class: 'page-sub' },
            'An ordinary Android app cannot register two Meta Quest Touch controllers for every other app. This screen lists what is technically possible and what this app really does.',
          ),
        ),
      ),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Mechanisms')),
        h(
          'ul',
          { class: 'list' },
          MECHANISMS.map((m) =>
            h(
              'li',
              { class: 'list__item list__item--top' },
              h('div', { class: 'list__main' }, h('div', { class: 'list__title' }, m.name, h('span', { class: `badge ${BADGE[m.status][0]}` }, BADGE[m.status][1])), h('div', { class: 'list__meta' }, m.text)),
            ),
          ),
        ),
        broker,
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card card--glow' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'VRBQ UDP output')), form),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Live output')), live, h('div', { class: 'section-title' }, 'JSON packet preview'), preview),
      ),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Virtual input → OpenXR path')),
        h('p', { class: 'muted small' }, 'Reference for receivers that feed an OpenXR action system (interaction profile /interaction_profiles/oculus/touch_controller, paths under /user/hand/left|right).'),
        h(
          'table',
          { class: 'table' },
          h('thead', {}, h('tr', {}, h('th', {}, 'Virtual input'), h('th', {}, 'OpenXR path'), h('th', {}, 'VRBQ field'))),
          h(
            'tbody',
            {},
            PATHS.map(([a, b, c]) => h('tr', {}, h('td', {}, a), h('td', { class: 'mono' }, b), h('td', { class: 'mono' }, c))),
          ),
        ),
      ),
    );

    const renderForm = () => {
      const s = ctx.store.state.settings;
      if (!s) {
        render(form, h('div', { class: 'empty' }, 'Output settings are available in the Android app.'));
        return;
      }
      const u = s.udp;
      const enabled = h('input', { type: 'checkbox', checked: u.enabled });
      const host = h('input', { class: 'input', type: 'text', value: u.host, inputmode: 'url', autocomplete: 'off', spellcheck: 'false' });
      const port = h('input', { class: 'input', type: 'number', min: '1', max: '65535', value: u.port });
      const rate = h('input', { class: 'input', type: 'number', min: '10', max: '250', value: u.rateHz });
      const format = h('select', { class: 'select' }, h('option', { value: 'json', selected: u.format === 'json' }, 'JSON (text)'), h('option', { value: 'binary', selected: u.format === 'binary' }, 'Binary (60 bytes)'));
      render(
        form,
        h(
          'label',
          { class: 'switch' },
          h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Enable UDP output'), h('span', { class: 'switch__desc' }, 'Packets are sent only while emulation is running')),
          enabled,
        ),
        h('div', { class: 'grid-2' }, h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Host'), host), h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Port'), port)),
        h('div', { class: 'grid-2' }, h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Rate (Hz)'), rate), h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Format'), format)),
        h('p', { class: 'muted small' }, '127.0.0.1 = an app on this phone. Use the IP of a PC or headset on the same Wi-Fi to send it there. A packet is also sent immediately on every change.'),
        h(
          'div',
          { class: 'row' },
          h(
            'button',
            {
              class: 'btn btn--primary btn--sm',
              type: 'button',
              onClick: async () => {
                const r = await ctx.run('integration.configure', {
                  enabled: enabled.checked,
                  host: host.value.trim(),
                  port: Number(port.value),
                  rateHz: Number(rate.value),
                  format: format.value,
                });
                if (r) {
                  ctx.store.set('settings', r.settings);
                  ctx.store.set('status', r.status);
                  ctx.toast('Output settings saved', 'ok');
                }
              },
            },
            icon('save'),
            'Apply',
          ),
        ),
      );
    };

    const kv = {};
    render(
      live,
      ['State', 'Target', 'Format', 'Packets sent', 'Last error'].map((k) => {
        kv[k] = h('dd', {}, '—');
        return [h('dt', {}, k), kv[k]];
      }),
    );

    const renderLive = (status) => {
      const i = status?.integration;
      if (!i) return;
      setText(kv.State, i.streaming ? 'Streaming' : i.udpEnabled ? (status.emulation?.running ? 'Starting…' : 'Ready — start emulation to send') : 'Disabled');
      setText(kv.Target, i.target);
      setText(kv.Format, i.format);
      setText(kv['Packets sent'], String(i.packets));
      setText(kv['Last error'], i.lastError || 'none');
      setText(broker, ctx.store.state.info?.openxrBroker ? `OpenXR runtime broker detected on this phone: ${ctx.store.state.info.openxrBroker} (informational — external input still cannot be injected into it).` : 'No Khronos OpenXR runtime broker detected on this phone.');
    };

    let last = 0;
    const renderPreview = (frame) => {
      const now = performance.now();
      if (now - last < 250) return;
      last = now;
      setText(preview, JSON.stringify(protocolPreview(frame), null, 1));
    };

    renderForm();
    renderLive(ctx.store.state.status);
    renderPreview(ctx.store.state.frame);

    return { onSettings: renderForm, onStatus: renderLive, onFrame: renderPreview };
  },
};
