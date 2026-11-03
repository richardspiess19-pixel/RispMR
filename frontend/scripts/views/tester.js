import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { fixed, signed } from '../format.js';
import { createEventLog } from '../components/event-log.js';

// CONTROLLER TESTER

export default {
  id: 'tester',
  title: 'Tester',

  mount(root, ctx) {
    const device = h('div', { class: 'stack stack--sm' });
    const metric = (label) => {
      const value = h('div', { class: 'tile__value' }, '—');
      const hint = h('div', { class: 'tile__hint' }, '');
      return { el: h('div', { class: 'tile' }, h('div', { class: 'tile__label' }, label), value, hint), value, hint };
    };
    const m = {
      events: metric('Events / s'),
      motion: metric('Mouse report rate'),
      latency: metric('Latency (avg / max)'),
      total: metric('Total events'),
    };
    const pressed = h('div', { class: 'row pressed-list' });
    const axes = h('div', { class: 'stack stack--sm' });
    const mouse = h('span', { class: 'mono' }, 'dx 0 · dy 0');
    const virtual = h('div', { class: 'stack stack--sm' });
    const log = createEventLog({ max: 200, emptyText: 'Waiting for events…' });
    let filter = null;
    let paused = false;

    const filterSeg = h('div', { class: 'seg' });
    const renderFilter = () =>
      render(
        filterSeg,
        [
          [null, 'All'],
          [['physical'], 'Physical'],
          [['virtual'], 'Virtual'],
          [['system'], 'System'],
        ].map(([cats, label]) =>
          h(
            'button',
            {
              type: 'button',
              class: JSON.stringify(cats) === JSON.stringify(filter) ? 'is-active' : '',
              onClick: () => {
                filter = cats;
                log.setFilter(cats, ctx.store.state.log);
                renderFilter();
              },
            },
            label,
          ),
        ),
      );

    const pauseBtn = h('button', { class: 'btn btn--sm', type: 'button', onClick: () => togglePause() }, icon('pause'), 'Pause');

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'Controller tester'),
          h('h1', { class: 'page-title' }, 'Real-time test'),
          h('p', { class: 'page-sub' }, 'Raw physical events, the converted virtual state and measured rates. Latency is measured from the Android input timestamp to the app (the Bluetooth radio delay is not visible to apps).'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('stats.reset') }, icon('refresh'), 'Reset stats'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('input.recapture') }, icon('mouse'), 'Capture mouse'),
        ),
      ),
      h('section', { class: 'card card--glow' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Connected device')), device),
      h('div', { class: 'tiles' }, m.events.el, m.motion.el, m.latency.el, m.total.el),
      h(
        'div',
        { class: 'grid-2' },
        h(
          'section',
          { class: 'card' },
          h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Physical inputs')),
          h('div', { class: 'section-title' }, 'Pressed now'),
          pressed,
          h('div', { class: 'section-title' }, 'Axes'),
          axes,
          h('div', { class: 'row' }, h('span', { class: 'section-title' }, 'Last mouse delta'), mouse),
        ),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Virtual state')), virtual),
      ),
      h(
        'section',
        { class: 'card' },
        h(
          'div',
          { class: 'card__head card__head--wrap' },
          h('h2', { class: 'card__title' }, 'Recent events'),
          h('div', { class: 'row' }, filterSeg, pauseBtn, h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => clearLog() }, icon('trash'), 'Clear')),
        ),
        log.el,
      ),
    );

    renderFilter();
    log.reset(ctx.store.state.log);

    // Virtual state rows (static structure, live values)
    const vrefs = {};
    const vrow = (key, label) => {
      const val = h('span', { class: 'mono' }, '—');
      vrefs[key] = val;
      return h('div', { class: 'kv-row' }, h('span', { class: 'kv-row__label' }, label), val);
    };
    render(
      virtual,
      ['left', 'right'].map((hand) =>
        h(
          'div',
          { class: 'stack stack--sm' },
          h('div', { class: 'section-title' }, hand === 'left' ? 'Left controller' : 'Right controller'),
          vrow(`${hand}.stick`, 'Joystick'),
          vrow(`${hand}.trigger`, 'Trigger'),
          vrow(`${hand}.grip`, 'Grip'),
          vrow(`${hand}.buttons`, 'Buttons pressed'),
        ),
      ),
    );

    const renderDevice = (status) => {
      const c = status?.controller;
      if (!ctx.store.state.native) {
        render(device, h('div', { class: 'empty' }, 'Tester data is available in the Android app.'));
        return;
      }
      if (c?.demo) {
        render(device, h('div', { class: 'list__title' }, 'DEMO VR Box', h('span', { class: 'badge badge--purple' }, 'Simulated input')));
        return;
      }
      if (!c?.selected) {
        render(
          device,
          h('div', { class: 'empty' }, 'No controller selected.'),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => ctx.nav('devices') }, 'Open device manager')),
        );
        return;
      }
      render(
        device,
        h('div', { class: 'list__title' }, c.selected.name, h('span', { class: `badge ${c.connected ? 'badge--blue' : 'badge--purple'}` }, c.connected ? 'Connected' : 'Disconnected')),
        h('div', { class: 'list__meta' }, `${c.selected.roles.join(' + ')} · ${c.selected.vidPid} · mouse capture: ${status.input.pointerCapture ? 'on' : 'off'} · focus: ${status.input.focused ? 'yes' : 'no'}`),
      );
    };

    const renderStats = (st) => {
      if (!st) return;
      setText(m.events.value, String(st.eventsPerSec));
      setText(m.events.hint, 'all event types');
      setText(m.motion.value, st.motionHz ? `${st.motionHz} Hz` : '—');
      setText(m.motion.hint, st.motionHz ? 'mouse samples per second' : 'move the joystick (mouse mode)');
      if (st.simulated) {
        setText(m.latency.value, 'n/a');
        setText(m.latency.hint, 'simulated input');
      } else if (st.latencyAvgMs === null || st.latencyAvgMs === undefined) {
        setText(m.latency.value, '—');
        setText(m.latency.hint, 'not measurable yet');
      } else {
        setText(m.latency.value, `${fixed(st.latencyAvgMs, 1)} / ${st.latencyMaxMs} ms`);
        setText(m.latency.hint, 'input timestamp → app');
      }
      setText(m.total.value, String(st.totalEvents));
    };

    let axesKey = '';
    const renderFrame = (frame) => {
      if (!frame) return;
      const p = frame.p || {};
      const labels = p.labels || {};
      const pressedIds = p.pressed || [];
      const pk = pressedIds.join('|');
      if (pressed.dataset.key !== pk) {
        pressed.dataset.key = pk;
        render(pressed, pressedIds.length ? pressedIds.map((id) => h('span', { class: 'pill no-x is-live', title: id }, h('span', {}, labels[id] || id))) : h('span', { class: 'muted small' }, 'Nothing pressed'));
      }
      const axisIds = Object.keys(p.axes || {}).sort();
      const ak = axisIds.join('|');
      if (ak !== axesKey) {
        axesKey = ak;
        render(
          axes,
          axisIds.length
            ? axisIds.map((id) =>
                h('div', { class: 'meter', dataset: { axis: id } }, h('span', { class: 'meter__label', title: id }, id.replace('axis:', '')), h('div', { class: 'bar bar--center' }, h('div', { class: 'bar__fill' })), h('span', { class: 'meter__value' }, '0.00')),
              )
            : h('span', { class: 'muted small' }, 'No analog axis active'),
        );
      }
      for (const id of axisIds) {
        const row = axes.querySelector(`[data-axis="${CSS.escape(id)}"]`);
        if (!row) continue;
        const v = p.axes[id];
        const fill = row.querySelector('.bar__fill');
        fill.style.transform = v >= 0 ? `scaleX(${v})` : `translateX(${v * 100}%) scaleX(${-v})`;
        setText(row.querySelector('.meter__value'), signed(v));
      }
      setText(mouse, `dx ${fixed(p.mouse?.dx ?? 0, 0)} · dy ${fixed(p.mouse?.dy ?? 0, 0)}`);
      for (const hand of ['left', 'right']) {
        const v = frame.v?.[hand];
        if (!v) continue;
        setText(vrefs[`${hand}.stick`], `X ${signed(v.x)}  Y ${signed(v.y)}`);
        setText(vrefs[`${hand}.trigger`], fixed(v.trigger));
        setText(vrefs[`${hand}.grip`], fixed(v.grip));
        const on = Object.entries(v.buttons || {}).filter(([, b]) => b).map(([k]) => k);
        setText(vrefs[`${hand}.buttons`], on.length ? on.join(', ') : 'none');
      }
    };

    function togglePause() {
      paused = !paused;
      log.setPaused(paused);
      render(pauseBtn, icon(paused ? 'play' : 'pause'), paused ? 'Resume' : 'Pause');
    }

    async function clearLog() {
      await ctx.run('log.clear');
      ctx.store.state.log.length = 0;
      log.reset([]);
    }

    renderDevice(ctx.store.state.status);
    renderStats(ctx.store.state.stats);
    renderFrame(ctx.store.state.frame);

    return {
      onStatus: renderDevice,
      onStats: renderStats,
      onFrame: renderFrame,
      onLog: (entries) => log.append(entries),
    };
  },
};
