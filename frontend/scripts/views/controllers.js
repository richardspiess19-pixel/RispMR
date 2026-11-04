import { h, render, setText, setClass } from '../dom.js';
import { icon } from '../icons.js';
import { fixed, signed } from '../format.js';
import { createJoyCon } from '../components/joycon-controller.js';
import { createStickView } from '../components/stick-view.js';
import { createEventLog } from '../components/event-log.js';

// VIRTUAL CONTROLLERS

const ROWS = {
  left: [
    ['stickClick', 'Clique do analógico'],
    ['up', 'Seta ↑'],
    ['down', 'Seta ↓'],
    ['left', 'Seta ←'],
    ['right', 'Seta →'],
    ['minus', '−'],
    ['capture', 'Captura'],
  ],
  right: [
    ['stickClick', 'Clique do analógico'],
    ['a', 'A'],
    ['b', 'B'],
    ['x', 'X'],
    ['y', 'Y'],
    ['plus', '+'],
    ['home', 'Home'],
  ],
};

export default {
  id: 'controllers',
  title: 'Controles virtuais',

  mount(root, ctx) {
    const notice = h('div', { class: 'notice' });
    const parts = {};
    const log = createEventLog({ max: 60, categories: ['virtual'], emptyText: 'Aperte um botão mapeado no VR Box.' });

    const handCard = (hand) => {
      const qc = createJoyCon(hand);
      const stick = createStickView({ label: `${hand} joystick`, size: 120 });
      const stickText = h('span', { class: 'mono' }, 'X 0,00 · Y 0,00');
      const buttonStates = {};
      const buttonRows = ROWS[hand].map(([control, label]) => {
        const st = h('span', { class: 'state' }, 'Solto');
        buttonStates[control] = st;
        return h('div', { class: 'qc-row' }, h('span', { class: 'qc-row__label' }, label), st);
      });
      const analog = {};
      const analogRows = ['trigger', 'grip'].map((name) => {
        const fill = h('div', { class: 'bar__fill' });
        const val = h('span', { class: 'meter__value' }, '0,00');
        const st = h('span', { class: 'state' }, 'Solto');
        analog[name] = { fill, val, st };
        return h(
          'div',
          { class: 'qc-row qc-row--analog' },
          h('span', { class: 'qc-row__label' }, name === 'trigger' ? (hand === 'left' ? 'ZL' : 'ZR') : hand === 'left' ? 'L' : 'R'),
          h('div', { class: 'bar' }, fill),
          val,
          st,
        );
      });
      parts[hand] = { qc, stick, stickText, buttonStates, analog };
      return h(
        'section',
        { class: `card vc vc--${hand}` },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, hand === 'left' ? 'Joy-Con esquerdo' : 'Joy-Con direito')),
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
          h('h1', { class: 'page-title' }, 'Controles virtuais'),
          h('p', { class: 'page-sub' }, 'Os dois Joy-Cons que o app monta a partir do VR Box, em tempo real.'),
        ),
      ),
      notice,
      h('div', { class: 'grid-2' }, handCard('left'), handCard('right')),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Últimos eventos'), h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => ctx.nav('tester') }, icon('activity'), 'Testar')),
        log.el,
      ),
    );

    log.reset(ctx.store.state.log);

    const renderNotice = (status) => {
      const e = status?.emulation;
      let text;
      const game = status?.game;
      const pad = game?.enabled && game?.gamepad?.state === 'active';
      if (!ctx.store.state.native) text = 'Prévia no navegador.';
      else if (game?.web) text = e?.running ? 'Ligada só dentro deste app. Outros jogos precisam do app Android.' : 'Prévia dentro desta página.';
      else if (e?.running && pad) text = 'Emulação ligada: com o jogo aberto, estes controles chegam nele como um controle virtual.';
      else if (e?.running) text = 'Emulação ligada, mas o controle virtual não está pronto — os jogos ainda não recebem nada.';
      else text = 'Isto é uma prévia dentro do app. Para os jogos receberem, inicie a emulação.';
      render(notice, icon('info'), h('div', {}, text));
      notice.className = `notice ${e?.running && pad ? '' : 'notice--warn'}`;
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
          setText(st, on ? 'Pressionado' : 'Solto');
          setClass(st, 'is-on', on);
        }
        for (const name of ['trigger', 'grip']) {
          const a = p.analog[name];
          const value = v[name] || 0;
          a.fill.style.transform = `scaleX(${value})`;
          setText(a.val, fixed(value));
          const on = value >= threshold;
          setText(a.st, on ? 'Pressionado' : 'Solto');
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
