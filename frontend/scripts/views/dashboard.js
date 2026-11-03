import { h, render, setText, setClass } from '../dom.js';
import { icon } from '../icons.js';
import {
  bluetoothIndicator,
  controllerIndicator,
  inputIndicator,
  emulationIndicator,
  handIndicator,
  gameIndicator,
  integrationIndicator,
  identifiedIndicator,
  fixed,
} from '../format.js';
import { createStickView } from '../components/stick-view.js';
import { modal } from '../ui.js';
import { showOtherAppsHelp } from '../components/other-apps.js';

const ROWS = [
  ['bluetooth', 'Bluetooth', bluetoothIndicator],
  ['controller', 'Controle', controllerIndicator],
  ['input', 'Leitura dos botões', inputIndicator],
  ['emulation', 'Emulação', emulationIndicator],
  ['game', 'Modo jogo', gameIndicator],
  ['left', 'Controle esquerdo', (s) => handIndicator(s, 'left')],
  ['right', 'Controle direito', (s) => handIndicator(s, 'right')],
  ['integration', 'Integração VR (rede)', integrationIndicator],
  ['identified', 'Botões identificados', identifiedIndicator],
];

export default {
  id: 'dashboard',
  title: 'Início',

  mount(root, ctx) {
    const heroIcon = h('div', { class: 'hero__icon' }, icon('gamepad'));
    const heroTitle = h('div', { class: 'hero__title' }, '');
    const heroSub = h('div', { class: 'hero__sub' }, '');
    const heroActions = h('div', { class: 'hero__actions' });
    const hero = h('section', { class: 'hero' }, h('div', { class: 'hero__top' }, heroIcon, h('div', {}, heroTitle, heroSub)), heroActions);

    const rows = {};
    const statusList = h(
      'ul',
      { class: 'status-list' },
      ROWS.map(([key, label]) => {
        const value = h('span', { class: 'status-row__value' }, '—');
        const hint = h('span', { class: 'status-row__hint' }, '');
        const li = h('li', { class: 'status-row' }, h('span', { class: 'dot' }), h('span', { class: 'status-row__label' }, label), value, hint);
        rows[key] = { li, value, hint };
        return li;
      }),
    );

    const btn = (label, iconName, onClick, kind = '') =>
      h('button', { class: `btn ${kind ? `btn--${kind}` : ''}`, type: 'button', onClick }, icon(iconName), label);

    const sticks = { left: createStickView({ label: 'Joystick esquerdo', size: 112 }), right: createStickView({ label: 'Joystick direito', size: 112 }) };
    const bars = {};
    const handPreview = (hand) => {
      const mk = (name, label) => {
        const fill = h('div', { class: 'bar__fill' });
        const val = h('span', { class: 'meter__value' }, '0,00');
        bars[`${hand}.${name}`] = { fill, val };
        return h('div', { class: 'meter' }, h('span', { class: 'meter__label' }, label), h('div', { class: 'bar' }, fill), val);
      };
      return h(
        'div',
        { class: 'mini-hand' },
        h('div', { class: 'section-title' }, hand === 'left' ? 'Esquerdo' : 'Direito'),
        sticks[hand].el,
        h('div', { class: 'stack stack--sm mini-hand__bars' }, mk('trigger', 'Gatilho'), mk('grip', 'Grip')),
      );
    };

    const steps = [
      ['paired', 'Parear o VR Box no Bluetooth do celular'],
      ['selected', 'Conectar o controle aqui no app'],
      ['identified', 'Configurar o VR Box no passo a passo'],
      ['mapped', 'Conferir o que cada botão faz'],
      ['game', 'Ativar o Modo jogo'],
      ['saved', 'Salvar o perfil'],
      ['emulating', 'Iniciar a emulação e abrir o jogo'],
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
      hero,
      h(
        'div',
        { class: 'btn-grid' },
        btn('Desconectar', 'unplug', () => disconnect(ctx)),
        btn('Mapear botões', 'sliders', () => ctx.nav('mapping')),
        btn('Testar controle', 'activity', () => ctx.nav('tester')),
        btn('Modo jogo', 'target', () => ctx.nav('game')),
        btn('Perfis', 'layers', () => ctx.nav('profiles')),
        btn('Configurações', 'settings', () => ctx.nav('settings')),
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Situação')), statusList),
        h(
          'div',
          { class: 'stack' },
          h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Agora')), h('div', { class: 'mini-hands' }, handPreview('left'), handPreview('right'))),
          h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Primeiros passos')), guide),
        ),
      ),
    );

    const renderHero = (status) => {
      const c = status?.controller;
      const running = Boolean(status?.emulation?.running);
      setClass(hero, 'is-live', running);
      setClass(hero, 'is-demo', Boolean(c?.demo));
      let title;
      let sub;
      let actions;
      if (!ctx.store.state.native) {
        title = 'Prévia no navegador';
        sub = 'Instale o app no celular para usar o VR Box.';
        actions = [];
      } else if (running && ctx.store.state.info?.platform === 'web') {
        title = 'Ligada só dentro deste app';
        sub = 'Os controles virtuais funcionam aqui dentro. Outros jogos não recebem nada desta versão: para eles, use o app Android.';
        actions = [
          h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => showOtherAppsHelp() }, icon('info'), 'Usar em outros jogos'),
          h('button', { class: 'btn btn--big', type: 'button', onClick: () => ctx.run('emulation.stop') }, icon('stop'), 'Parar emulação'),
        ];
      } else if (running) {
        title = 'Emulação ligada';
        const g = gameIndicator(status);
        const pad = status?.game?.output === 'gamepad';
        sub =
          g.tone !== 'ok'
            ? 'O Modo jogo ainda não está pronto, então os jogos não vão reagir.'
            : pad
              ? 'Pode abrir o jogo. Ele vê um controle virtual com os seus botões.'
              : 'Pode abrir o jogo. Os botões do VR Box viram toques na tela.';
        actions = [h('button', { class: 'btn btn--big', type: 'button', onClick: () => ctx.run('emulation.stop') }, icon('stop'), 'Parar emulação')];
        if (g.tone !== 'ok') actions.unshift(h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => ctx.nav('game') }, icon('target'), 'Configurar Modo jogo'));
      } else if (c?.demo) {
        title = 'Modo demonstração';
        sub = 'Os comandos estão sendo simulados pelo app.';
        actions = [h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => startEmulation(ctx) }, icon('play'), 'Iniciar emulação')];
      } else if (c?.selected && c.connected && !ctx.store.state.profiles.some((p) => p.name === 'Meu VR Box')) {
        title = `${c.selected.name} conectado`;
        sub = 'Agora ensine os botões ao app: leva 1 minuto.';
        actions = [
          h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => ctx.nav('setup') }, icon('wand'), 'Configurar meu VR Box'),
          h('button', { class: 'btn btn--big', type: 'button', onClick: () => startEmulation(ctx) }, icon('play'), 'Iniciar emulação'),
        ];
      } else if (c?.selected && c.connected) {
        title = `${c.selected.name} conectado`;
        sub = 'Tudo certo. Inicie a emulação e depois abra o jogo.';
        actions = [h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => startEmulation(ctx) }, icon('play'), 'Iniciar emulação')];
      } else if (c?.selected) {
        title = `Esperando ${c.selected.name}`;
        sub = 'Ligue o controle. Ele reconecta sozinho.';
        actions = [h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => connect(ctx) }, icon('plug'), 'Conectar controle')];
      } else if (ctx.store.state.info?.platform === 'web') {
        title = 'Nenhum controle conectado';
        sub = 'Com o VR Box pareado no Bluetooth do celular, é só apertar qualquer botão dele.';
        actions = [h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => connect(ctx) }, icon('plug'), 'Conectar controle')];
      } else {
        title = 'Nenhum controle conectado';
        sub = 'Com o VR Box pareado no Bluetooth do celular, é só apertar qualquer botão dele.';
        actions = [h('button', { class: 'btn btn--big btn--primary', type: 'button', onClick: () => connect(ctx) }, icon('plug'), 'Conectar controle')];
      }
      setText(heroTitle, title);
      setText(heroSub, sub);
      const key = `${title}|${actions.length}|${running}`;
      if (heroActions.dataset.key !== key) {
        heroActions.dataset.key = key;
        render(heroActions, actions);
      }
    };

    const renderStatus = (status) => {
      renderHero(status);
      for (const [key, , fn] of ROWS) {
        const ind = fn(status);
        const r = rows[key];
        setText(r.value, ind.value);
        setText(r.hint, ind.hint);
        r.hint.classList.toggle('hidden', !ind.hint);
        for (const tone of ['ok', 'warn', 'err']) setClass(r.li, `is-${tone}`, ind.tone === tone);
      }
      const c = status?.controller;
      const done = {
        paired: ['connected', 'unverified'].includes(status?.bluetooth?.link) || Boolean(c?.selected),
        selected: Boolean(c?.selected) || Boolean(c?.demo),
        identified: (status?.identifiedCount || 0) > 0,
        mapped: Boolean(status?.left?.configured || status?.right?.configured),
        game: gameIndicator(status).tone === 'ok',
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

/**
 * Connect: the app picks up the controller on its first button press, so this just waits
 * for one (and closes by itself when it arrives).
 */
export async function connect(ctx) {
  const r = await ctx.run('input.connect');
  if (!r) return;
  if (r.selected) {
    ctx.toast(`${r.selected.name} conectado`);
    return;
  }
  ctx.run('detect.start');
  let off = null;
  const found = await modal({
    title: 'Aperte qualquer botão do VR Box',
    body: h(
      'div',
      { class: 'stack learn' },
      h('div', { class: 'learn__radar', 'aria-hidden': 'true' }, h('span'), h('span'), h('i')),
      h('p', { class: 'learn__text' }, 'Procurando o controle…'),
      h('p', { class: 'muted small' }, 'Ligue o VR Box (segure @ uns 3 segundos) e confira se ele está pareado no Bluetooth do celular. Qualquer botão serve, inclusive mexer o joystick.'),
    ),
    actions: [
      ...(ctx.store.state.info?.platform === 'web' ? [] : [{ label: 'Abrir Bluetooth', value: 'bt', kind: 'ghost' }]),
      { label: 'Cancelar', value: null, kind: 'ghost' },
    ],
    onOpen: ({ close }) => {
      off = ctx.store.on('status', (s) => {
        if (s?.controller?.selected && s.controller.connected) close('found');
      });
    },
  });
  off?.();
  if (!ctx.keepDetection) ctx.run('detect.stop');
  if (found === 'found') {
    const st = ctx.store.state.status;
    ctx.toast(`${st.controller.selected.name} conectado`);
    if (!ctx.store.state.profiles.some((p) => p.name === 'Meu VR Box')) ctx.nav('setup');
    return;
  }
  if (found === 'bt') ctx.run('bt.openSettings');
}

/** Old "not found" dialog, kept for the explicit Bluetooth help. */
export async function connectHelp(ctx, r = {}) {
  const choice = await modal({
    title: 'Não achei o controle',
    body: h(
      'div',
      { class: 'stack' },
      ctx.store.state.info?.platform === 'web'
        ? h('p', {}, 'No navegador, o controle só aparece depois que você aperta um botão dele com esta página aberta. No modo mouse, escolha "Teclado e mouse" na tela Controle.')
        : h('p', {}, r.bluetoothEnabled === false ? 'O Bluetooth do celular está desligado.' : 'O celular não está mostrando nenhum VR Box agora.'),
      h(
        'ol',
        { class: 'steps' },
        h('li', {}, 'Ligue o VR Box (normalmente segurando o botão @ por 3 segundos).'),
        h('li', {}, 'Abra o Bluetooth do celular e pareie (o nome costuma ser "VR BOX" ou "VR-PARK").'),
        h('li', {}, 'Volte aqui: o app encontra o controle sozinho.'),
      ),
      r.candidates > 1 ? h('p', { class: 'muted' }, `Achei ${r.candidates} dispositivos. Escolha o certo na tela Controle.`) : null,
    ),
    actions: [
      { label: 'Ver dispositivos', value: 'devices', kind: 'ghost' },
      { label: 'Abrir Bluetooth', value: 'bt', kind: 'primary' },
    ],
  });
  if (choice === 'bt') ctx.run('bt.openSettings');
  if (choice === 'devices') ctx.nav('devices');
}

export async function disconnect(ctx) {
  const st = ctx.store.state.status;
  if (!st?.controller?.selected && !st?.controller?.demo) {
    ctx.toast('Nenhum controle conectado.');
    return;
  }
  const r = await ctx.run('input.release');
  if (r) ctx.toast('Controle desconectado do app. O Bluetooth continua pareado.', 'info', 3600);
}

export async function startEmulation(ctx) {
  const r = await ctx.run('emulation.start');
  if (!r) return;
  const g = gameIndicator(r);
  if (r.game?.web) ctx.toast('Ligada só dentro deste app. Outros jogos precisam do app Android.', 'info', 4200);
  else if (g.tone === 'ok') ctx.toast(r.game?.output === 'gamepad' ? 'Emulação ligada. O controle virtual aparece para os jogos.' : 'Emulação ligada. Pode abrir o jogo.');
  else ctx.toast('Emulação ligada, mas falta configurar o Modo jogo para os jogos reagirem.', 'info', 4200);
}
