import { h, render } from '../dom.js';
import { icon } from '../icons.js';
import { startEmulation } from './dashboard.js';
import { otherAppsInfo } from '../components/other-apps.js';
import { createStickView } from '../components/stick-view.js';

// Modo jogo: the game that is open receives a virtual gamepad driven by the VR Box. The Shizuku
// service reads the VR Box while the game is in front and feeds the gamepad.

/** What each virtual Quest control becomes on the virtual gamepad (VirtualGamepad.kt). */
const GAMEPAD_LAYOUT = [
  ['A, B, X, Y', 'A, B, X, Y'],
  ['Joystick esquerdo / direito', 'Analógico esquerdo / direito'],
  ['Clique dos joysticks', 'L3 / R3'],
  ['Grip esquerdo / direito', 'L1 / R1'],
  ['Gatilho esquerdo / direito', 'L2 / R2'],
  ['Menu', 'Start'],
  ['Sistema', 'Select'],
];

export default {
  id: 'game',
  title: 'Modo jogo',

  mount(root, ctx) {
    if (ctx.store.state.info?.platform === 'web') {
      root.replaceChildren(
        h('header', { class: 'page-head' }, h('div', {}, h('h1', { class: 'page-title' }, 'Modo jogo'), h('p', { class: 'page-sub' }, 'Faz os jogos do celular receberem o VR Box como um controle de jogo.'))),
        h(
          'section',
          { class: 'card' },
          otherAppsInfo(),
          h('p', { class: 'text-2' }, 'Aqui você pode configurar e testar o VR Box e exportar o perfil. Depois é só importar o perfil no app Android.'),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.nav('profiles') }, icon('download'), 'Exportar perfil')),
        ),
      );
      return {};
    }

    const statusBody = h('div', { class: 'stack stack--sm' });
    const enableRow = h('div');
    const playBody = h('div', { class: 'stack stack--sm' });
    const testBody = h('div', { class: 'stack stack--sm' });
    const testLeft = createStickView({ label: 'Analógico esquerdo', size: 130 });
    const testRight = createStickView({ label: 'Analógico direito', size: 130 });
    const testInfo = h('p', { class: 'mono small' }, '');
    const testView = h(
      'div',
      { class: 'stack stack--sm hidden' },
      h('div', { class: 'mini-hands' }, h('div', { class: 'mini-hand' }, testLeft.el, h('span', { class: 'muted small' }, 'Analógico esquerdo')), h('div', { class: 'mini-hand' }, testRight.el, h('span', { class: 'muted small' }, 'Analógico direito'))),
      testInfo,
    );

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h('div', {}, h('h1', { class: 'page-title' }, 'Modo jogo'), h('p', { class: 'page-sub' }, 'Os jogos do celular recebem um controle de jogo de verdade, com os botões do jeito que você configurou.')),
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Controle virtual')), statusBody, enableRow),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Testar o que o jogo recebe')), testBody, testView),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Como os botões chegam no jogo')),
        h('dl', { class: 'gp-map' }, GAMEPAD_LAYOUT.flatMap(([a, b]) => [h('dt', {}, a), h('dd', {}, b)])),
        h('p', { class: 'muted small' }, 'Os botões do VR Box viram os controles virtuais pelo seu mapeamento (tela Configurar ou Botões), e deles vão para o controle virtual.'),
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Jogar')), playBody),
    );

    const cfg = () => ctx.store.state.settings?.game;

    async function save(next) {
      const r = await ctx.run('game.update', next);
      if (r) {
        ctx.store.set('settings', r.settings, { fromGame: true });
        ctx.store.set('status', r.status);
      }
    }

    async function runGamepad(cmd) {
      const r = await ctx.run(cmd);
      if (r && cmd !== 'gamepad.openShizuku') ctx.store.set('status', r);
    }

    const renderEnable = () => {
      const c = cfg();
      if (!c) {
        render(enableRow);
        return;
      }
      render(
        enableRow,
        h(
          'label',
          { class: 'switch' },
          h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Usar o Modo jogo'), h('span', { class: 'switch__desc' }, 'O controle virtual liga junto com a emulação')),
          h('input', { type: 'checkbox', checked: c.enabled, onChange: (e) => save({ ...c, enabled: e.target.checked }) }),
        ),
      );
    };

    const renderStatus = (status) => {
      const g = status?.game || {};
      const gp = g.gamepad || {};
      const reader = g.reader;
      const st = gp.state || 'not_running';
      const running = Boolean(status?.emulation?.running);
      const badge =
        st === 'active'
          ? h('span', { class: 'badge badge--blue' }, icon('check'), 'Ligado')
          : st === 'ready' || st === 'connecting'
            ? h('span', { class: 'badge badge--blue' }, 'Pronto')
            : h('span', { class: 'badge badge--purple' }, st === 'error' ? 'Erro' : 'Falta o Shizuku');
      let text;
      let extra = null;
      if (st === 'active') {
        text = 'Os jogos estão vendo um controle chamado "VR Box -> Quest (controle virtual)".';
        if (reader?.error) extra = h('div', { class: 'notice notice--warn' }, icon('info'), h('div', {}, reader.error));
        else if (reader?.reading && !reader.nodes) extra = h('div', { class: 'notice notice--warn' }, icon('info'), h('div', {}, 'O VR Box não foi encontrado. Ligue o controle: ele é procurado de novo a cada 2 segundos.'));
        else if (reader?.found && !reader.foundGrabbed) extra = h('p', { class: 'muted small' }, 'Este celular não deixou separar o VR Box, então o jogo também vê o controle original.');
        else if (reader?.found) extra = h('p', { class: 'muted small' }, `No jogo: VR Box encontrado e separado · ${reader.events} sinais lidos.`);
        else if (reader && !reader.reading && reader.events === 0) extra = h('p', { class: 'muted small' }, 'Quando você abrir o jogo, o app passa a ler o VR Box por lá.');
      } else if (st === 'ready' || st === 'connecting') {
        text = running ? 'Criando o controle virtual…' : 'Tudo certo. O controle virtual aparece para os jogos quando você iniciar a emulação.';
      } else if (st === 'error') {
        text = gp.message || 'Não consegui criar o controle virtual.';
        extra = h('div', { class: 'row' }, h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => runGamepad('gamepad.retry') }, 'Tentar de novo'));
      } else {
        text = 'O Shizuku parou. Abra o Shizuku e toque em Iniciar.';
        extra = h('div', { class: 'row' }, h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => runGamepad('gamepad.openShizuku') }, icon('external'), 'Abrir o Shizuku'));
      }
      render(statusBody, h('div', { class: 'list__title' }, 'Situação', badge), h('p', { class: 'text-2' }, text), extra);
    };

    let testOn = false;
    const renderTest = (status) => {
      const g = status?.game || {};
      const t = g.selfTest;
      const active = g.gamepad?.state === 'active' && Boolean(status?.emulation?.running);
      const on = Boolean(t);
      if (on !== testOn || !testBody.childElementCount) {
        testOn = on;
        render(
          testBody,
          h('p', { class: 'text-2' }, on ? 'Mexa o joystick para todos os lados e aperte os botões. Aqui aparece exatamente o que os jogos recebem.' : 'Veja aqui, antes de abrir o jogo, se o controle virtual recebe o joystick em todas as direções e os botões.'),
          h(
            'div',
            { class: 'row' },
            on
              ? h('button', { class: 'btn btn--sm', type: 'button', onClick: () => runTest(false) }, icon('stop'), 'Parar teste')
              : h('button', { class: 'btn btn--sm btn--primary', type: 'button', disabled: !active, onClick: () => runTest(true) }, icon('activity'), 'Testar agora'),
          ),
          !on && !active ? h('p', { class: 'muted small' }, 'Inicie a emulação para testar.') : null,
        );
        testView.classList.toggle('hidden', !on);
      }
      if (!t) return;
      testLeft.update(t.left.x, t.left.y);
      testRight.update(t.right.x, t.right.y);
      const n = (v) => (v >= 0 ? '+' : '') + v.toFixed(2).replace('.', ',');
      testInfo.textContent = `Esquerdo X ${n(t.left.x)} Y ${n(t.left.y)} · Direito X ${n(t.right.x)} Y ${n(t.right.y)} · L2 ${n(t.l2)} R2 ${n(t.r2)} · Botões: ${t.buttons.length ? t.buttons.join(', ') : 'nenhum'} · ${t.events} sinais`;
    };

    async function runTest(on) {
      const r = await ctx.run('gamepad.test', { on });
      if (r) ctx.store.set('status', r);
    }

    const renderPlay = (status) => {
      const running = Boolean(status?.emulation?.running);
      render(
        playBody,
        h(
          'ol',
          { class: 'steps' },
          h('li', {}, 'Toque em Iniciar emulação.'),
          h('li', {}, 'Abra o jogo e coloque o celular no VR Box.'),
          h('li', {}, 'O jogo recebe o controle virtual. Se ele pedir, escolha o controle "VR Box -> Quest".'),
        ),
        h(
          'div',
          { class: 'row' },
          running
            ? h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('emulation.stop') }, icon('stop'), 'Parar emulação')
            : h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => startEmulation(ctx) }, icon('play'), 'Iniciar emulação'),
        ),
        h('p', { class: 'muted small' }, 'Qualquer modo do VR Box funciona (gamepad, teclado, música ou mouse). Com o jogo na frente, o app lê o controle direto e o jogo só vê o controle virtual.'),
      );
    };

    renderEnable();
    renderStatus(ctx.store.state.status);
    renderTest(ctx.store.state.status);
    renderPlay(ctx.store.state.status);

    let lastStatus = '';
    return {
      onStatus: (s) => {
        renderTest(s);
        const key = JSON.stringify([{ ...s?.game, selfTest: Boolean(s?.game?.selfTest) }, s?.emulation?.running]);
        if (key === lastStatus) return;
        lastStatus = key;
        renderStatus(s);
        renderPlay(s);
      },
      onSettings: renderEnable,
      unmount: () => {
        if (testOn) ctx.bridge.call('gamepad.test', { on: false }).catch(() => {});
      },
    };
  },
};
