import { h, render, setClass, setText } from '../dom.js';
import { icon } from '../icons.js';
import { fixed } from '../format.js';
import { startEmulation } from './dashboard.js';
import { fillRange } from './mapping.js';
import { otherAppsInfo } from '../components/other-apps.js';

// Modo jogo: the game that is open receives the VR Box, as a virtual gamepad (Shizuku) or as
// touches on its screen (accessibility gestures).

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

const SHIZUKU_STEPS = [
  'Instale o Shizuku (grátis, na Play Store).',
  'Em Configurações → Sobre o telefone, toque 7 vezes em "Número da versão" para liberar as Opções do desenvolvedor.',
  'Em Opções do desenvolvedor, ative "Depuração por Wi-Fi" (depuração sem fio).',
  'No Shizuku, toque em "Parear" e digite o código que aparece na Depuração por Wi-Fi. Depois toque em "Iniciar".',
  'Volte aqui e toque em Permitir.',
];

const ACTIONS = [
  ['off', 'Não usar'],
  ['hold', 'Segurar'],
  ['tap', 'Tocar uma vez'],
];

const SHORT = { a: 'A', b: 'B', x: 'X', y: 'Y', menu: 'Menu', system: 'Sistema' };
const BY_HAND = { stickClick: 'Clique', trigger: 'Gatilho', grip: 'Grip' };

/** "A", "X", "Gatilho D" — X/Y/A/B already say which controller they belong to. */
function shortLabel(id) {
  const [hand, control] = id.split('.');
  if (SHORT[control]) return SHORT[control];
  return `${BY_HAND[control] || control} ${hand === 'left' ? 'E' : 'D'}`;
}

export default {
  id: 'game',
  title: 'Modo jogo',

  mount(root, ctx) {
    const serviceBody = h('div', { class: 'stack stack--sm' });
    const outputBody = h('div', { class: 'stack stack--sm' });
    const gamepadBody = h('div', { class: 'stack stack--sm' });
    const enableRow = h('div');
    const screen = h('div', { class: 'game-screen', role: 'application', 'aria-label': 'Tela do jogo' });
    const controlsList = h('div');
    const sticksList = h('div');
    const playBody = h('div', { class: 'stack stack--sm' });
    let selected = null;
    let dragging = false;
    const markers = new Map();

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('h1', { class: 'page-title' }, 'Modo jogo'),
          h('p', { class: 'page-sub' }, 'Faz o jogo aberto no celular receber o VR Box: como um controle de jogo de verdade, ou como toques na tela.'),
        ),
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Como o jogo recebe')), outputBody, enableRow),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, '1. Ler o VR Box com o jogo aberto')), serviceBody),
      h('section', { class: 'card', dataset: { output: 'gamepad' } }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, '2. Controle virtual (Shizuku)')), gamepadBody),
      h(
        'section',
        { class: 'card', dataset: { output: 'touch' } },
        h(
          'div',
          { class: 'card__head card__head--wrap' },
          h('h2', { class: 'card__title' }, '2. Onde tocar'),
          h(
            'div',
            { class: 'row' },
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => preset('cardboard') }, 'Cardboard'),
            h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => preset('clear') }, 'Limpar'),
          ),
        ),
        screen,
        h('p', { class: 'muted small' }, 'Arraste os pontos para onde ficam os botões no seu jogo. A tela aqui é o celular deitado.'),
        h('div', { class: 'section-title' }, 'Botões'),
        controlsList,
        h('div', { class: 'section-title' }, 'Joysticks'),
        sticksList,
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, '3. Jogar')), playBody),
    );

    const cfg = () => ctx.store.state.settings?.game;

    async function save(next) {
      const r = await ctx.run('game.update', next);
      if (r) {
        ctx.store.set('settings', r.settings, { fromGame: true });
        ctx.store.set('status', r.status);
      }
    }

    async function preset(name) {
      const r = await ctx.run('game.preset', { name });
      if (r) {
        ctx.store.set('settings', r.settings);
        ctx.store.set('status', r.status);
        ctx.toast(name === 'cardboard' ? 'Gatilho e A tocam no centro da tela' : 'Todos os toques removidos');
      }
    }

    if (ctx.store.state.info?.platform === 'web') {
      root.replaceChildren(
        h('header', { class: 'page-head' }, h('div', {}, h('h1', { class: 'page-title' }, 'Modo jogo'), h('p', { class: 'page-sub' }, 'Faz os botões do VR Box tocarem na tela do jogo aberto no celular.'))),
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

    const renderService = (status) => {
      const g = status?.game;
      if (!ctx.store.state.native) {
        render(serviceBody, h('div', { class: 'empty' }, 'Funciona no app Android.'));
        return;
      }
      const on = Boolean(g?.serviceEnabled);
      render(
        serviceBody,
        h('div', { class: 'list__title' }, 'Serviço de acessibilidade', on ? h('span', { class: 'badge badge--blue' }, icon('check'), 'Ativado') : h('span', { class: 'badge badge--purple' }, 'Desativado')),
        h('p', { class: 'text-2' }, on
          ? 'Pronto. O app só lê o VR Box que você escolheu, e só enquanto a emulação estiver ligada.'
          : 'Com o jogo na frente, o Android só entrega os botões do VR Box para outro app pelo Serviço de acessibilidade. Abra Acessibilidade, entre em "VR Box → Quest: Modo jogo" e ative.'),
        on ? null : h('p', { class: 'muted small' }, 'Se a opção estiver cinza (Android 13 ou mais novo): abra Informações do app, toque nos três pontinhos ⋮ e em "Permitir configurações restritas". Depois volte e ative.'),
        h(
          'div',
          { class: 'row' },
          h('button', { class: `btn btn--sm ${on ? '' : 'btn--primary'}`, type: 'button', onClick: () => ctx.run('game.openAccessibility') }, icon('external'), 'Abrir Acessibilidade'),
          on ? null : h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('app.openAppSettings') }, 'Informações do app'),
        ),
      );
    };

    const output = () => cfg()?.output || 'gamepad';

    const renderOutput = () => {
      const c = cfg();
      if (!c) {
        render(outputBody);
        return;
      }
      const choice = (value, ic, title, desc) =>
        h(
          'button',
          {
            class: `choice ${output() === value ? 'is-on' : ''}`,
            type: 'button',
            role: 'radio',
            'aria-checked': String(output() === value),
            onClick: () => output() !== value && save({ ...c, output: value }),
          },
          h('span', { class: 'choice__title' }, icon(ic), title),
          h('small', {}, desc),
        );
      render(
        outputBody,
        h(
          'div',
          { class: 'choice-grid', role: 'radiogroup', 'aria-label': 'Como o jogo recebe' },
          choice('gamepad', 'gamepad', 'Controle virtual', 'O jogo vê um controle de jogo com os seus botões. Para jogos que aceitam controle. Precisa do Shizuku.'),
          choice('touch', 'target', 'Toques na tela', 'Cada botão toca num ponto da tela. Para jogos sem suporte a controle, como os de Cardboard.'),
        ),
      );
      for (const el of root.querySelectorAll('[data-output]')) el.classList.toggle('hidden', el.dataset.output !== output());
    };

    const renderGamepad = (status) => {
      const gp = status?.game?.gamepad || {};
      const st = gp.state || 'not_running';
      const btn = (label, cmd, primary = true, ic = null) =>
        h('button', { class: `btn btn--sm ${primary ? 'btn--primary' : ''}`, type: 'button', onClick: () => runGamepad(cmd) }, ic ? icon(ic) : null, label);
      const badge = st === 'active' ? h('span', { class: 'badge badge--blue' }, icon('check'), 'Conectado') : st === 'ready' || st === 'connecting' ? h('span', { class: 'badge badge--blue' }, 'Pronto') : h('span', { class: 'badge badge--purple' }, 'Falta configurar');
      const TEXT = {
        not_installed: ['O Shizuku é um app grátis que dá a este app a permissão do ADB. É só com ela que o Android deixa criar um controle que os outros jogos enxergam.', [btn('Baixar o Shizuku', 'gamepad.openShizuku', true, 'external')]],
        not_running: ['O Shizuku está instalado, mas parado. Ele precisa ser iniciado de novo toda vez que o celular reinicia.', [btn('Abrir o Shizuku', 'gamepad.openShizuku', true, 'external')]],
        old_shizuku: ['Este Shizuku é antigo. Atualize pela Play Store.', [btn('Abrir o Shizuku', 'gamepad.openShizuku', true, 'external')]],
        no_permission: ['O Shizuku está ligado. Falta permitir este app nele.', [btn('Permitir', 'gamepad.permission', true, 'check')]],
        ready: ['Tudo certo. O controle virtual aparece para os jogos quando você iniciar a emulação.', []],
        connecting: ['Criando o controle virtual…', []],
        active: ['Os jogos estão vendo um controle chamado "VR Box -> Quest (controle virtual)".', []],
        error: [gp.message || 'Não consegui criar o controle virtual.', [btn('Tentar de novo', 'gamepad.retry', true)]],
      };
      const [text, actions] = TEXT[st] || TEXT.not_running;
      render(
        gamepadBody,
        h('div', { class: 'list__title' }, 'Controle virtual', badge),
        h('p', { class: 'text-2' }, text),
        actions.length ? h('div', { class: 'row' }, actions) : null,
        ['not_installed', 'not_running', 'old_shizuku'].includes(st)
          ? h('details', { class: 'map-section', open: true }, h('summary', { class: 'section-title' }, 'Como ligar o Shizuku'), h('ol', { class: 'steps' }, SHIZUKU_STEPS.map((t) => h('li', {}, t))))
          : null,
        st === 'error' ? h('p', { class: 'muted small' }, 'Alguns celulares bloqueiam controles criados pelo ADB. Nesse caso, use "Toques na tela".') : null,
        h(
          'details',
          { class: 'map-section' },
          h('summary', { class: 'section-title' }, 'Como os botões chegam no jogo'),
          h('dl', { class: 'gp-map' }, GAMEPAD_LAYOUT.flatMap(([a, b]) => [h('dt', {}, a), h('dd', {}, b)])),
          h('p', { class: 'muted small' }, 'Os botões do VR Box seguem o seu mapeamento (tela Botões) até os controles virtuais, e deles vão para o controle virtual.'),
        ),
      );
    };

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
          h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Usar o Modo jogo'), h('span', { class: 'switch__desc' }, 'Liga junto com a emulação')),
          h('input', { type: 'checkbox', checked: c.enabled, onChange: (e) => save({ ...c, enabled: e.target.checked }) }),
        ),
      );
    };

    const placeMarker = (el, x, y) => {
      el.style.left = `${x * 100}%`;
      el.style.top = `${y * 100}%`;
    };

    const startDrag = (el, onDrop) => (ev) => {
      ev.preventDefault();
      dragging = true;
      el.setPointerCapture(ev.pointerId);
      const rect = screen.getBoundingClientRect();
      let x = 0;
      let y = 0;
      const move = (e) => {
        x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
        placeMarker(el, x, y);
      };
      const up = () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        dragging = false;
        if (x || y) onDrop(Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000);
      };
      move(ev);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    };

    const renderScreen = () => {
      const c = cfg();
      markers.clear();
      if (!c) {
        render(screen);
        return;
      }
      const items = [];
      for (const hand of ['left', 'right']) {
        const st = hand === 'left' ? c.leftStick : c.rightStick;
        if (!st.enabled) continue;
        const knob = h('span');
        const el = h('div', { class: `game-stick ${selected === `${hand}.stick` ? 'is-selected' : ''}`, title: `Joystick ${hand === 'left' ? 'esquerdo' : 'direito'}` }, knob, h('em', {}, hand === 'left' ? 'Joystick E' : 'Joystick D'));
        // Radius is a fraction of the screen height; the preview is 16:9.
        el.style.width = `${st.radius * 2 * (9 / 16) * 100}%`;
        el.style.height = `${st.radius * 2 * 100}%`;
        placeMarker(el, st.x, st.y);
        el.addEventListener(
          'pointerdown',
          startDrag(el, (x, y) => {
            selected = `${hand}.stick`;
            save({ ...c, [hand === 'left' ? 'leftStick' : 'rightStick']: { ...st, x, y } });
          }),
        );
        markers.set(`${hand}.stick`, { el, knob });
        items.push(el);
      }
      // Buttons that touch the same spot are shown (and dragged) as one point.
      const groups = [];
      for (const [id, p] of Object.entries(c.buttons)) {
        if (p.action === 'off') continue;
        const g = groups.find((x) => Math.abs(x.x - p.x) < 0.02 && Math.abs(x.y - p.y) < 0.02);
        if (g) g.ids.push(id);
        else groups.push({ x: p.x, y: p.y, ids: [id], tap: p.action === 'tap' });
      }
      for (const g of groups) {
        const isSel = g.ids.includes(selected);
        const el = h('div', { class: `game-marker ${g.tap ? 'game-marker--tap' : ''} ${isSel ? 'is-selected' : ''}`, title: g.ids.join(', ') }, g.ids.map(shortLabel).join(' + '));
        placeMarker(el, g.x, g.y);
        el.addEventListener(
          'pointerdown',
          startDrag(el, (x, y) => {
            selected = g.ids[0];
            const buttons = { ...c.buttons };
            for (const id of g.ids) buttons[id] = { ...buttons[id], x, y };
            save({ ...c, buttons });
          }),
        );
        for (const id of g.ids) markers.set(id, { el, group: g.ids });
        items.push(el);
      }
      render(screen, items.length ? items : h('span', { class: 'game-screen__hint' }, 'Nenhum toque. Escolha "Segurar" num botão abaixo ou toque em Cardboard.'));
    };

    const renderControls = () => {
      const c = cfg();
      if (!c) {
        render(controlsList, h('div', { class: 'empty' }, 'Disponível no app Android.'));
        render(sticksList);
        return;
      }
      const targets = (ctx.store.state.catalog?.targets || []).filter((t) => t.type === 'button' || t.type === 'analog');
      const row = (t) => {
        const p = c.buttons[t.id] || { action: 'off', x: 0.5, y: 0.5 };
        const select = h(
          'select',
          {
            class: 'select select--sm',
            'aria-label': `Toque para ${t.label}`,
            onChange: (e) => {
              selected = t.id;
              save({ ...c, buttons: { ...c.buttons, [t.id]: { ...p, action: e.target.value } } });
            },
          },
          ACTIONS.map(([v, label]) => h('option', { value: v, selected: p.action === v }, label)),
        );
        return h(
          'div',
          { class: `game-row ${selected === t.id ? 'is-selected' : ''}` },
          h('div', { class: 'game-row__label' }, `${t.hand === 'left' ? 'Esquerdo' : 'Direito'} · ${t.label}`),
          select,
        );
      };
      const used = targets.filter((t) => (c.buttons[t.id]?.action || 'off') !== 'off');
      const rest = targets.filter((t) => (c.buttons[t.id]?.action || 'off') === 'off');
      render(
        controlsList,
        used.length ? used.map(row) : h('p', { class: 'muted small' }, 'Nenhum botão tocando na tela ainda.'),
        rest.length ? h('details', { class: 'map-section', open: used.length === 0 }, h('summary', { class: 'section-title' }, `Mais botões (${rest.length})`), rest.map(row)) : null,
      );
      render(
        sticksList,
        ['left', 'right'].map((hand) => {
          const key = hand === 'left' ? 'leftStick' : 'rightStick';
          const st = c[key];
          const out = h('span', { class: 'range__value' }, fixed(st.radius));
          const radius = h('input', {
            type: 'range',
            min: 0.05,
            max: 0.3,
            step: 0.01,
            value: st.radius,
            'aria-label': 'Tamanho',
            onInput: (e) => {
              setText(out, fixed(Number(e.target.value)));
              fillRange(e.target);
            },
            onChange: (e) => save({ ...c, [key]: { ...st, radius: Number(e.target.value) } }),
          });
          fillRange(radius);
          return h(
            'div',
            { class: 'stack stack--sm' },
            h(
              'label',
              { class: 'switch' },
              h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, `Joystick ${hand === 'left' ? 'esquerdo' : 'direito'} na tela`), h('span', { class: 'switch__desc' }, 'O dedo virtual arrasta dentro do círculo')),
              h('input', { type: 'checkbox', checked: st.enabled, onChange: (e) => save({ ...c, [key]: { ...st, enabled: e.target.checked } }) }),
            ),
            st.enabled ? h('label', { class: 'range' }, h('span', { class: 'range__head' }, 'Tamanho do círculo', out), radius) : null,
          );
        }),
      );
    };

    const renderPlay = (status) => {
      const running = Boolean(status?.emulation?.running);
      const joystick = status?.game?.joystickSupported;
      const gamepad = output() === 'gamepad';
      render(
        playBody,
        h(
          'ol',
          { class: 'steps' },
          h('li', {}, 'Toque em Iniciar emulação.'),
          h('li', {}, 'Abra o jogo e coloque o celular no VR Box.'),
          h('li', {}, gamepad ? 'O jogo recebe o controle virtual. Se ele pedir, escolha o controle "VR Box -> Quest".' : 'Os botões do controle tocam na tela onde você marcou.'),
        ),
        h(
          'div',
          { class: 'row' },
          running
            ? h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('emulation.stop') }, icon('stop'), 'Parar emulação')
            : h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => startEmulation(ctx) }, icon('play'), 'Iniciar emulação'),
        ),
        gamepad
          ? h('p', { class: 'muted small' }, 'Melhor modo do VR Box: um em que o joystick manda setas (teclado). Assim o jogo só vê o controle virtual. No modo Gamepad, o joystick do próprio VR Box também chega direto no jogo.')
          : h('p', { class: 'muted small' }, 'Deixe o VR Box no modo gamepad ou teclado. No modo mouse o próprio Android já transforma o clique em toque, e o app não consegue trocar isso fora da tela dele.'),
        !gamepad && joystick === false ? h('p', { class: 'muted small' }, 'Neste Android, o joystick analógico do VR Box só é lido com o app aberto. Para mexer o joystick dentro do jogo, ligue as setas (D-pad) às direções do joystick na tela Botões.') : null,
        status?.game?.touches ? h('p', { class: 'muted small' }, `${status.game.touches} toques feitos nesta sessão.`) : null,
      );
    };

    const renderFrame = (frame) => {
      const c = cfg();
      if (!frame?.v || !c) return;
      const threshold = ctx.store.state.profile?.buttons?.analogThreshold ?? 0.5;
      for (const [id, m] of markers) {
        const [hand, control] = id.split('.');
        const v = frame.v[hand];
        if (!v) continue;
        if (control === 'stick') {
          m.knob.style.transform = `translate(${-50 + (v.x || 0) * 120}%, ${-50 - (v.y || 0) * 120}%)`;
          continue;
        }
        const pressed = (bid) => {
          const [hh, cc] = bid.split('.');
          const vv = frame.v[hh];
          return cc === 'trigger' || cc === 'grip' ? (vv?.[cc] || 0) >= threshold : Boolean(vv?.buttons?.[cc]);
        };
        setClass(m.el, 'is-pressed', (m.group || [id]).some(pressed));
      }
    };

    const renderAll = () => {
      renderOutput();
      renderEnable();
      renderScreen();
      renderControls();
    };

    renderService(ctx.store.state.status);
    renderAll();
    renderGamepad(ctx.store.state.status);
    renderPlay(ctx.store.state.status);

    let lastStatus = '';
    return {
      onStatus: (s) => {
        const key = JSON.stringify([s?.game, s?.emulation?.running]);
        if (key === lastStatus) return;
        lastStatus = key;
        renderService(s);
        renderGamepad(s);
        renderPlay(s);
      },
      onSettings: () => {
        if (dragging) return;
        renderAll();
        renderPlay(ctx.store.state.status);
      },
      onFrame: renderFrame,
    };
  },
};
