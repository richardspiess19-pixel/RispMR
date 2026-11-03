import { h, render, setText, setClass } from '../dom.js';
import { icon } from '../icons.js';
import { fixed, signed } from '../format.js';
import { createQuestController } from '../components/quest-controller.js';
import { createStickView } from '../components/stick-view.js';
import { createEventLog } from '../components/event-log.js';

// VIRTUAL CONTROLLERS

const ROWS = {
  left: [
    ['stickClick', 'Joystick Click'],
    ['x', 'X'],
    ['y', 'Y'],
    ['menu', 'Menu'],
  ],
  right: [
    ['stickClick', 'Joystick Click'],
    ['a', 'A'],
    ['b', 'B'],
    ['system', 'System'],
  ],
};

export default {
  id: 'controllers',
  title: 'Controllers',

  mount(root, ctx) {
    const notice = h('div', { class: 'notice' });
    const parts = {};
    const log = createEventLog({ max: 60, categories: ['virtual'], emptyText: 'Press a mapped physical button to see virtual events.' });

    const handCard = (hand) => {
      const qc = createQuestController(hand);
      const stick = createStickView({ label: `${hand} joystick`, size: 120 });
      const stickText = h('span', { class: 'mono' }, 'X 0.00 · Y 0.00');
      const buttonStates = {};
      const buttonRows = ROWS[hand].map(([control, label]) => {
        const st = h('span', { class: 'state' }, 'RELEASED');
        buttonStates[control] = st;
        return h('div', { class: 'qc-row' }, h('span', { class: 'qc-row__label' }, label), st);
      });
      const analog = {};
      const analogRows = ['trigger', 'grip'].map((name) => {
        const fill = h('div', { class: 'bar__fill' });
        const val = h('span', { class: 'meter__value' }, '0.00');
        const st = h('span', { class: 'state' }, 'RELEASED');
        analog[name] = { fill, val, st };
        return h(
          'div',
          { class: 'qc-row qc-row--analog' },
          h('span', { class: 'qc-row__label' }, name === 'trigger' ? 'Trigger' : 'Grip'),
          h('div', { class: 'bar' }, fill),
          val,
          st,
        );
      });
      parts[hand] = { qc, stick, stickText, buttonStates, analog };
      return h(
        'section',
        { class: `card card--glow vc vc--${hand}` },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, hand === 'left' ? 'Left Quest Controller' : 'Right Quest Controller')),
        h('div', { class: 'vc__visual' }, qc.el, h('div', { class: 'vc__stick' }, stick.el, stickText)),
        h('div', { class: 'vc__rows' }, buttonRows, analogRows),
      );
    };

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'Virtual controllers'),
          h('h1', { class: 'page-title' }, 'Quest Touch state'),
          h('p', { class: 'page-sub' }, 'Real-time state of the two virtual controllers produced by the mapping. Each control has its own independent state.'),
        ),
      ),
      notice,
      h('div', { class: 'grid-2' }, handCard('left'), handCard('right')),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Virtual events'), h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => ctx.nav('tester') }, icon('activity'), 'Tester')),
        log.el,
      ),
    );

    log.reset(ctx.store.state.log);

    const renderNotice = (status) => {
      const e = status?.emulation;
      let text;
      if (!ctx.store.state.native) text = 'Browser preview: no native data.';
      else if (e?.running && e.output === 'udp') text = `Emulation running: this state is being sent with the VRBQ protocol to ${status.integration.target} (${status.integration.format}).`;
      else if (e?.running) text = 'Emulation running locally: no output is enabled, so no other app receives this state. Configure one in VR Integration.';
      else text = 'Preview: this drawing is the app\'s internal state. It is not a device registered in Android, and nothing is sent to other apps until emulation is started with an output enabled.';
      render(notice, icon('info'), h('div', {}, text));
      notice.className = `notice ${e?.running && e.output === 'udp' ? '' : 'notice--warn'}`;
    };

    const renderFrame = (frame) => {
      if (!frame?.v) return;
      const threshold = ctx.store.state.profile?.buttons?.analogThreshold ?? 0.5;
      for (const hand of ['left', 'right']) {
        const v = frame.v[hand];
        const p = parts[hand];
        p.qc.update(v, threshold);
        p.stick.update(v.x, v.y, v.rx, v.ry);
        setText(p.stickText, `X ${signed(v.x)} · Y ${signed(v.y)}`);
        for (const [control, st] of Object.entries(p.buttonStates)) {
          const on = Boolean(v.buttons?.[control]);
          setText(st, on ? 'PRESSED' : 'RELEASED');
          setClass(st, 'is-on', on);
        }
        for (const name of ['trigger', 'grip']) {
          const a = p.analog[name];
          const value = v[name] || 0;
          a.fill.style.transform = `scaleX(${value})`;
          setText(a.val, fixed(value));
          const on = value >= threshold;
          setText(a.st, on ? 'PRESSED' : 'RELEASED');
          setClass(a.st, 'is-on', on);
        }
      }
    };

    const applyProfile = (p) => {
      if (!p) return;
      parts.left.stick.setConfig(p.sticks.left);
      parts.right.stick.setConfig(p.sticks.right);
    };

    renderNotice(ctx.store.state.status);
    renderFrame(ctx.store.state.frame);
    applyProfile(ctx.store.state.profile);

    return {
      onStatus: renderNotice,
      onFrame: renderFrame,
      onLog: (entries) => log.append(entries),
      onProfile: applyProfile,
    };
  },
};
