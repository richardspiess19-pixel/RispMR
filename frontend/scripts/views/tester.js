import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { fixed, signed } from '../format.js';
import { createEventLog } from '../components/event-log.js';

// Testar controle

const BUTTON_NAMES = { stickClick: 'clique do joystick', x: 'X', y: 'Y', a: 'A', b: 'B', menu: 'Menu', system: 'Sistema' };

export default {
  id: 'tester',
  title: 'Testar',

  mount(root, ctx) {
    const device = h('div', { class: 'stack stack--sm' });
    const metric = (label) => {
      const value = h('div', { class: 'metric__value' }, '—');
      const hint = h('div', { class: 'metric__hint' }, '');
      return { el: h('div', { class: 'metric' }, h('div', { class: 'metric__label' }, label), value, hint), value, hint };
    };
    const m = {
      events: metric('Eventos por segundo'),
      motion: metric('Taxa do mouse'),
      latency: metric('Atraso (médio / máx.)'),
      total: metric('Total de eventos'),
    };
    const pressed = h('div', { class: 'row pressed-list' });
    const axes = h('div', { class: 'stack stack--sm' });
    const mouse = h('span', { class: 'mono' }, 'x 0 · y 0');
    const virtual = h('div', { class: 'stack stack--sm' });
    const log = createEventLog({ max: 200, emptyText: 'Esperando eventos…' });
    let filter = null;
    let paused = false;

    const filterSeg = h('div', { class: 'seg' });
    const renderFilter = () =>
      render(
        filterSeg,
        [
          [null, 'Todos'],
          [['physical'], 'Controle'],
          [['virtual'], 'Virtuais'],
          [['system'], 'App'],
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

    const pauseBtn = h('button', { class: 'btn btn--sm', type: 'button', onClick: () => togglePause() }, icon('pause'), 'Pausar');

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('h1', { class: 'page-title' }, 'Testar controle'),
          h('p', { class: 'page-sub' }, 'Veja o que o VR Box manda e como isso vira comandos virtuais. O atraso mostrado é do Android até o app (o atraso do Bluetooth em si não dá para medir).'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('stats.reset') }, icon('refresh'), 'Zerar números'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('input.recapture') }, icon('mouse'), 'Capturar mouse'),
        ),
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Controle')), device),
      h('div', { class: 'metrics' }, m.events.el, m.motion.el, m.latency.el, m.total.el),
      h(
        'div',
        { class: 'grid-2' },
        h(
          'section',
          { class: 'card' },
          h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'VR Box')),
          h('div', { class: 'section-title' }, 'Apertado agora'),
          pressed,
          h('div', { class: 'section-title' }, 'Eixos'),
          axes,
          h('div', { class: 'row' }, h('span', { class: 'section-title' }, 'Último movimento do mouse'), mouse),
        ),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Controles virtuais')), virtual),
      ),
      h(
        'section',
        { class: 'card' },
        h(
          'div',
          { class: 'card__head card__head--wrap' },
          h('h2', { class: 'card__title' }, 'Eventos recentes'),
          h('div', { class: 'row' }, filterSeg, pauseBtn, h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => clearLog() }, icon('trash'), 'Limpar')),
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
          h('div', { class: 'section-title' }, hand === 'left' ? 'Esquerdo' : 'Direito'),
          vrow(`${hand}.stick`, 'Joystick'),
          vrow(`${hand}.trigger`, 'Gatilho'),
          vrow(`${hand}.grip`, 'Grip'),
          vrow(`${hand}.buttons`, 'Botões apertados'),
        ),
      ),
    );

    const renderDevice = (status) => {
      const c = status?.controller;
      if (!ctx.store.state.native) {
        render(device, h('div', { class: 'empty' }, 'Os dados aparecem no app Android.'));
        return;
      }
      if (c?.demo) {
        render(device, h('div', { class: 'list__title' }, 'VR Box de demonstração', h('span', { class: 'badge badge--purple' }, 'Simulado')));
        return;
      }
      if (!c?.selected) {
        render(
          device,
          h('div', { class: 'empty' }, 'Nenhum controle conectado.'),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => ctx.nav('devices') }, 'Abrir tela Controle')),
        );
        return;
      }
      render(
        device,
        h('div', { class: 'list__title' }, c.selected.name, h('span', { class: `badge ${c.connected ? 'badge--blue' : 'badge--purple'}` }, c.connected ? 'Conectado' : 'Desconectado')),
        h('div', { class: 'list__meta' }, `${c.selected.roles.join(' + ')} · ${c.selected.vidPid}${status.input.pointerCapture ? ' · mouse capturado' : ''}`),
      );
    };

    const renderStats = (st) => {
      if (!st) return;
      setText(m.events.value, String(st.eventsPerSec));
      setText(m.events.hint, '');
      setText(m.motion.value, st.motionHz ? `${st.motionHz} Hz` : '—');
      setText(m.motion.hint, st.motionHz ? '' : 'mexa o joystick (modo mouse)');
      if (st.simulated) {
        setText(m.latency.value, '—');
        setText(m.latency.hint, 'simulado');
      } else if (st.latencyAvgMs === null || st.latencyAvgMs === undefined) {
        setText(m.latency.value, '—');
        setText(m.latency.hint, 'aperte um botão');
      } else {
        setText(m.latency.value, `${fixed(st.latencyAvgMs, 1)} / ${st.latencyMaxMs} ms`);
        setText(m.latency.hint, '');
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
        render(pressed, pressedIds.length ? pressedIds.map((id) => h('span', { class: 'pill no-x is-live', title: id }, h('span', {}, labels[id] || id))) : h('span', { class: 'muted small' }, 'Nada apertado'));
      }
      const axisIds = Object.keys(p.axes || {}).sort();
      const ak = axisIds.join('|');
      if (ak !== axesKey) {
        axesKey = ak;
        render(
          axes,
          axisIds.length
            ? axisIds.map((id) =>
                h('div', { class: 'meter', dataset: { axis: id } }, h('span', { class: 'meter__label', title: labels[id] || id }, id.replace('axis:', '')), h('div', { class: 'bar bar--center' }, h('div', { class: 'bar__fill' })), h('span', { class: 'meter__value' }, '0.00')),
              )
            : h('span', { class: 'muted small' }, 'Nenhum eixo mexendo'),
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
      setText(mouse, `x ${fixed(p.mouse?.dx ?? 0, 0)} · y ${fixed(p.mouse?.dy ?? 0, 0)}`);
      for (const hand of ['left', 'right']) {
        const v = frame.v?.[hand];
        if (!v) continue;
        setText(vrefs[`${hand}.stick`], `X ${signed(v.x)}  Y ${signed(v.y)}`);
        setText(vrefs[`${hand}.trigger`], fixed(v.trigger));
        setText(vrefs[`${hand}.grip`], fixed(v.grip));
        const on = Object.entries(v.buttons || {}).filter(([, b]) => b).map(([k]) => k);
        setText(vrefs[`${hand}.buttons`], on.length ? on.map((k) => BUTTON_NAMES[k] || k).join(', ') : 'nenhum');
      }
    };

    function togglePause() {
      paused = !paused;
      log.setPaused(paused);
      render(pauseBtn, icon(paused ? 'play' : 'pause'), paused ? 'Continuar' : 'Pausar');
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
