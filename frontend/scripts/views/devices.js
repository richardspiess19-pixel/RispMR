import { h, render } from '../dom.js';
import { icon } from '../icons.js';
import { createEventLog } from '../components/event-log.js';
import { connect, disconnect } from './dashboard.js';

// BLUETOOTH DEVICE MANAGER

export default {
  id: 'devices',
  title: 'Devices',

  mount(root, ctx) {
    const adapterBody = h('div', { class: 'stack stack--sm' });
    const inputList = h('div');
    const selectedBody = h('div', { class: 'stack stack--sm' });
    const bondedBody = h('div');
    const received = createEventLog({ max: 14, categories: ['physical'], emptyText: 'Press a button on the selected controller.' });
    const connLog = createEventLog({ max: 30, categories: ['system'], emptyText: 'No connection events yet.' });
    const demoBody = h('div', { class: 'stack stack--sm' });

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'Bluetooth device manager'),
          h('h1', { class: 'page-title' }, 'Controllers & devices'),
          h('p', { class: 'page-sub' }, 'Some VR Box controllers are presented by Android as a mouse or a keyboard instead of a gamepad. This screen shows exactly how this phone sees yours.'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--primary btn--sm', type: 'button', onClick: () => connect(ctx) }, icon('plug'), 'Connect'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => refresh() }, icon('refresh'), 'Refresh'),
        ),
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Bluetooth')), adapterBody),
        h('section', { class: 'card card--glow' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Selected device')), selectedBody),
      ),
      h(
        'section',
        { class: 'card' },
        h(
          'div',
          { class: 'card__head' },
          h('div', {}, h('h2', { class: 'card__title' }, 'Input devices'), h('div', { class: 'card__sub' }, 'As presented by Android (no permission needed)')),
        ),
        inputList,
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Commands received')), received.el),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Connection log')), connLog.el),
      ),
      h(
        'section',
        { class: 'card' },
        h(
          'div',
          { class: 'card__head' },
          h('div', {}, h('h2', { class: 'card__title' }, 'Paired Bluetooth devices'), h('div', { class: 'card__sub' }, 'Requires the "Nearby devices" permission on Android 12+')),
          h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => loadBonded() }, icon('refresh'), 'Reload'),
        ),
        bondedBody,
      ),
      h('section', { class: 'card card--plain demo-card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Demo mode')), demoBody),
    );

    received.reset(ctx.store.state.log);
    connLog.reset(ctx.store.state.log);

    const renderAdapter = (status) => {
      const bt = status?.bluetooth;
      if (!bt) {
        render(adapterBody, h('div', { class: 'empty' }, 'Bluetooth information is available in the Android app.'));
        return;
      }
      const permText = { granted: 'Granted', not_required: 'Not required (Android 11 or older)', denied: 'Not granted', permanently_denied: 'Denied — enable it in app settings' }[bt.permission];
      const enabledText = bt.enabled === null ? 'Unknown (permission needed)' : bt.enabled ? 'On' : 'Off';
      const buttons = [];
      if (bt.permission === 'denied') {
        buttons.push(h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => requestPermission() }, 'Grant permission'));
      }
      if (bt.permission === 'permanently_denied') {
        buttons.push(h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('app.openAppSettings') }, icon('external'), 'App settings'));
      }
      if (bt.enabled === false) {
        buttons.push(h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => ctx.run('bt.requestEnable', {}, { timeout: 0 }) }, 'Turn on Bluetooth'));
      }
      buttons.push(h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('bt.openSettings') }, icon('bluetooth'), 'Pair in Android settings'));
      render(
        adapterBody,
        h(
          'dl',
          { class: 'kv' },
          h('dt', {}, 'Adapter'),
          h('dd', {}, bt.supported ? enabledText : 'Not available on this phone'),
          h('dt', {}, 'Permission'),
          h('dd', {}, permText || bt.permission),
          h('dt', {}, 'Link'),
          h('dd', {}, linkText(bt.link)),
        ),
        h(
          'p',
          { class: 'muted small' },
          'Pairing and the HID connection are handled by Android. Regular apps cannot open an HID connection themselves, so pair the VR Box in system settings; it then appears below automatically.',
        ),
        h('div', { class: 'row' }, buttons),
      );
    };

    const renderSelected = (status) => {
      const c = status?.controller;
      if (c?.demo) {
        render(
          selectedBody,
          h('div', { class: 'list__title' }, 'DEMO VR Box', h('span', { class: 'badge badge--purple' }, 'Simulated')),
          h('p', { class: 'muted' }, 'DEMO MODE is generating input. No real device is being read.'),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('demo.stop') }, icon('stop'), 'Stop demo')),
        );
        return;
      }
      if (!c?.selected) {
        render(
          selectedBody,
          h('div', { class: 'empty' }, 'No controller selected. Press SELECT on a device below, or CONNECT to pick the best match automatically.'),
        );
        return;
      }
      const g = c.selected;
      render(
        selectedBody,
        h(
          'div',
          { class: 'list__title' },
          g.name,
          c.connected ? h('span', { class: 'badge badge--blue' }, 'Connected') : h('span', { class: 'badge badge--purple' }, 'Disconnected'),
        ),
        h(
          'dl',
          { class: 'kv' },
          h('dt', {}, 'State'),
          h('dd', {}, c.connected ? (status.input.focused ? 'Reading input' : 'Paused (app not focused)') : 'Waiting for reconnection'),
          h('dt', {}, 'Input type'),
          h('dd', {}, `${g.primaryType} — ${g.roles.join(' + ') || 'unknown'}`),
          h('dt', {}, 'Vendor'),
          h('dd', {}, `${g.vendor || 'Unknown vendor'} (${g.vidPid})`),
          h('dt', {}, 'Mouse'),
          h('dd', {}, g.roles.some((r) => r.startsWith('Mouse')) ? (status.input.pointerCapture ? 'Captured (relative movement)' : 'Not captured — tap the screen once to give the app focus') : 'Not a mouse device'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => ctx.nav('detect') }, icon('radar'), 'Detect inputs'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => disconnect(ctx) }, icon('unplug'), 'Disconnect'),
        ),
      );
    };

    const renderDevices = (devices) => {
      const groups = devices?.groups || [];
      const selectedKey = ctx.store.state.status?.controller?.selected?.key;
      const showInternal = Boolean(devices?.showInternal);
      const toggle = h(
        'label',
        { class: 'switch' },
        h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Show built-in devices'), h('span', { class: 'switch__desc' }, 'Phone keys, internal keyboards…')),
        h('input', {
          type: 'checkbox',
          checked: showInternal,
          onChange: (e) => ctx.run('settings.update', { showInternalDevices: e.target.checked }),
        }),
      );
      if (!groups.length) {
        render(
          inputList,
          h('div', { class: 'empty' }, ctx.store.state.native ? 'No external input device found. Pair and turn on the VR Box.' : 'Device list is available in the Android app.'),
          toggle,
        );
        return;
      }
      render(
        inputList,
        h(
          'ul',
          { class: 'list' },
          groups.map((g) => {
            const selected = g.key === selectedKey;
            const details = h(
              'details',
              { class: 'device-details' },
              h('summary', {}, 'Technical details'),
              h(
                'dl',
                { class: 'kv small' },
                h('dt', {}, 'Nodes'),
                h('dd', { class: 'mono' }, g.nodes.map((n) => `#${n.id} ${n.sources} ${n.roles.join('+')}`).join('\n')),
                h('dt', {}, 'Axes'),
                h('dd', { class: 'mono' }, g.axes.length ? g.axes.join(', ') : 'none'),
                h('dt', {}, 'Declared keys'),
                h('dd', { class: 'mono' }, g.declaredKeys.length ? g.declaredKeys.join(', ') : 'none'),
              ),
              h('p', { class: 'muted small' }, 'Declared keys come from the Android key layout and may include keys the controller never sends. Use Automatic Input Detection to see what it really sends.'),
            );
            return h(
              'li',
              { class: `list__item list__item--device ${selected ? 'is-selected' : ''}` },
              h(
                'div',
                { class: 'list__main' },
                h(
                  'div',
                  { class: 'list__title' },
                  g.name,
                  g.likelyVrBox ? h('span', { class: 'badge badge--purple' }, 'Likely VR Box') : null,
                  g.external === false ? h('span', { class: 'badge' }, 'Built-in') : null,
                ),
                h('div', { class: 'list__meta' }, `Android sees: ${g.roles.join(' + ') || g.primaryType} · ${g.vidPid}${g.vendor ? ` · ${g.vendor}` : ''}`),
                details,
              ),
              h(
                'div',
                { class: 'list__side' },
                selected
                  ? h('span', { class: 'badge badge--blue' }, icon('check'), 'Selected')
                  : h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => select(g.key) }, 'Select'),
              ),
            );
          }),
        ),
        toggle,
      );
    };

    const renderBonded = (bt) => {
      if (!bt) {
        render(bondedBody, h('div', { class: 'empty' }, 'Available in the Android app.'));
        return;
      }
      if (bt.bonded === null) {
        render(
          bondedBody,
          h('div', { class: 'notice notice--warn' }, icon('info'), h('div', {}, 'Paired devices are hidden because the Bluetooth permission was not granted. Controller input still works without it.')),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => requestPermission() }, 'Grant permission')),
        );
        return;
      }
      if (!bt.bonded.length) {
        render(bondedBody, h('div', { class: 'empty' }, 'No paired devices.'));
        return;
      }
      render(
        bondedBody,
        h(
          'ul',
          { class: 'list' },
          bt.bonded.map((d) =>
            h(
              'li',
              { class: 'list__item' },
              h(
                'div',
                { class: 'list__main' },
                h('div', { class: 'list__title' }, d.name, d.hidPeripheral ? h('span', { class: 'badge badge--blue' }, 'HID') : null),
                h('div', { class: 'list__meta' }, `${d.classLabel} · ${d.type} · `, h('span', { class: 'mono' }, d.address)),
              ),
              h('div', { class: 'list__side' }, h('span', { class: `badge ${d.aclConnected ? 'badge--blue' : ''}` }, d.aclConnected === null ? 'Link not observed' : d.aclConnected ? 'Link up' : 'Link down')),
            ),
          ),
        ),
        h('p', { class: 'muted small' }, 'Link state is reported by Android broadcasts while the app is open; for devices connected before the app started it shows "not observed" until they reconnect.'),
      );
    };

    const renderDemo = (status) => {
      const on = Boolean(status?.demo);
      render(
        demoBody,
        h('p', { class: 'text-2' }, 'DEMO MODE generates SIMULATED input (mouse circle, button presses) to explore mapping and the virtual controllers without hardware. It is labelled everywhere and never reported as a Bluetooth device.'),
        h(
          'div',
          { class: 'row' },
          on
            ? h('button', { class: 'btn btn--sm btn--purple', type: 'button', onClick: () => ctx.run('demo.stop') }, icon('stop'), 'Stop demo mode')
            : h('button', { class: 'btn btn--sm btn--purple', type: 'button', onClick: () => ctx.run('demo.start') }, icon('play'), 'Start demo mode'),
        ),
      );
    };

    async function select(key) {
      const r = await ctx.run('input.select', { key });
      if (r) ctx.toast('Controller selected', 'ok');
    }

    async function requestPermission() {
      const r = await ctx.run('bt.requestPermission', {}, { timeout: 0 });
      if (!r) return;
      if (r.permission === 'granted') ctx.toast('Bluetooth permission granted', 'ok');
      else ctx.toast('Permission not granted. Input reading still works; Bluetooth details stay hidden.', 'warn', 4200);
      renderBonded(r.bluetooth);
    }

    async function loadBonded() {
      if (!ctx.store.state.native) return renderBonded(null);
      const bt = await ctx.run('bt.devices');
      if (bt) renderBonded(bt);
    }

    async function refresh() {
      const d = await ctx.run('input.devices');
      if (d) ctx.store.set('devices', d);
      loadBonded();
    }

    renderAdapter(ctx.store.state.status);
    renderSelected(ctx.store.state.status);
    renderDevices(ctx.store.state.devices);
    renderDemo(ctx.store.state.status);
    loadBonded();

    let lastStatusKey = '';
    return {
      onStatus: (status) => {
        // Re-render only when something relevant changed (status pushes are frequent while emulating).
        const key = JSON.stringify([status?.bluetooth, status?.controller, status?.input, status?.demo]);
        if (key === lastStatusKey) return;
        lastStatusKey = key;
        renderAdapter(status);
        renderSelected(status);
        renderDemo(status);
        renderDevices(ctx.store.state.devices);
      },
      onDevices: renderDevices,
      onLog: (entries) => {
        received.append(entries);
        connLog.append(entries);
      },
    };
  },
};

function linkText(link) {
  return (
    {
      connected: 'Controller connected',
      disconnected: 'No controller link',
      off: 'Bluetooth off',
      unverified: 'Input device present (grant permission to confirm Bluetooth)',
      not_bluetooth: 'Selected device is not a paired Bluetooth device',
      unsupported: 'No Bluetooth adapter',
      unknown: 'Unknown (permission needed)',
    }[link] || link
  );
}

