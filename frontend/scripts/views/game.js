import { h, render, setClass, setText } from '../dom.js';
import { icon } from '../icons.js';
import { fixed } from '../format.js';
import { startEmulation } from './dashboard.js';
import { fillRange } from './mapping.js';

// Modo jogo: the VR Box touches the screen of the game that is open.

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
          h('p', { class: 'page-sub' }, 'Jogos de celular não entendem controles do Quest, mas todo jogo entende toque. No Modo jogo, cada botão do VR Box toca num ponto da tela do jogo — por exemplo o botão do Cardboard no centro, ou os botões e o joystick desenhados pelo jogo.'),
        ),
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, '1. Permitir no Android')), serviceBody),
      h(
        'section',
        { class: 'card' },
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
        enableRow,
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
          h('div', { class: 'notice notice--warn' }, icon('info'), h('div', {}, h('b', {}, 'Só no app Android. '), 'Uma página da web não pode tocar na tela de outros apps — isso precisa do serviço de acessibilidade do app.')),
          h('p', { class: 'text-2' }, 'Aqui no navegador você pode detectar os botões, montar o mapeamento, testar e exportar o perfil. Depois é só importar o perfil no app.'),
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
          ? 'Pronto. O app só lê o VR Box que você escolheu e só toca na tela enquanto a emulação estiver ligada.'
          : 'O Android só deixa um app tocar na tela de outro app pelo Serviço de acessibilidade. Abra Acessibilidade, entre em "VR Box → Quest: Modo jogo" e ative.'),
        on ? null : h('p', { class: 'muted small' }, 'Se a opção estiver cinza (Android 13 ou mais novo): abra Informações do app, toque nos três pontinhos ⋮ e em "Permitir configurações restritas". Depois volte e ative.'),
        h(
          'div',
          { class: 'row' },
          h('button', { class: `btn btn--sm ${on ? '' : 'btn--primary'}`, type: 'button', onClick: () => ctx.run('game.openAccessibility') }, icon('external'), 'Abrir Acessibilidade'),
          on ? null : h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('app.openAppSettings') }, 'Informações do app'),
        ),
      );
    };

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
      render(
        playBody,
        h('ol', { class: 'steps' }, h('li', {}, 'Toque em Iniciar emulação.'), h('li', {}, 'Abra o jogo e coloque o celular no VR Box.'), h('li', {}, 'Os botões do controle tocam na tela onde você marcou.')),
        h(
          'div',
          { class: 'row' },
          running
            ? h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('emulation.stop') }, icon('stop'), 'Parar emulação')
            : h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => startEmulation(ctx) }, icon('play'), 'Iniciar emulação'),
        ),
        h('p', { class: 'muted small' }, 'Deixe o VR Box no modo gamepad ou teclado. No modo mouse o próprio Android já transforma o clique em toque, e o app não consegue trocar isso fora da tela dele.'),
        joystick === false ? h('p', { class: 'muted small' }, 'Neste Android, o joystick analógico do VR Box só é lido com o app aberto. Para mexer o joystick dentro do jogo, ligue as setas (D-pad) às direções do joystick na tela Botões.') : null,
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
      renderEnable();
      renderScreen();
      renderControls();
    };

    renderService(ctx.store.state.status);
    renderAll();
    renderPlay(ctx.store.state.status);

    let lastStatus = '';
    return {
      onStatus: (s) => {
        const key = JSON.stringify([s?.game, s?.emulation?.running]);
        if (key === lastStatus) return;
        lastStatus = key;
        renderService(s);
        renderPlay(s);
      },
      onSettings: () => {
        if (!dragging) renderAll();
      },
      onFrame: renderFrame,
    };
  },
};
