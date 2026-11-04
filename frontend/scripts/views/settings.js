import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { fixed } from '../format.js';
import { confirmDialog } from '../ui.js';
import { createStickView } from '../components/stick-view.js';
import { fillRange } from './mapping.js';

// SETTINGS

const AXIS_FIELDS = [
  ['sensitivity', 'Sensibilidade', 0.1, 5, 0.05],
  ['deadzone', 'Zona morta', 0, 0.6, 0.01],
  ['curve', 'Curva de resposta', 0.3, 3, 0.05],
  ['max', 'Limite máximo', 0.1, 1, 0.01],
];

const MODES = [
  ['relative_mouse', 'Mouse relativo', 'Quanto mais rápido o movimento, mais o joystick vai. Parou de mexer, ele volta. Bom para girar a câmera.'],
  ['virtual_stick', 'Joystick virtual', 'O movimento empurra o joystick e ele fica lá; quando você solta, volta ao centro na velocidade de retorno (0 = não volta). Bom para andar.'],
];

export default {
  id: 'settings',
  title: 'Configurações',

  mount(root, ctx) {
    const profileHead = h('div', { class: 'row row--between' });
    const sticksWrap = h('div', { class: 'grid-2' });
    const buttonsBody = h('div', { class: 'stack' });
    const connBody = h('div');
    const uiBody = h('div');
    const aboutBody = h('dl', { class: 'kv' });
    const previews = {};
    const timers = {};

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('h1', { class: 'page-title' }, 'Configurações'),
          h('p', { class: 'page-sub' }, 'Os ajustes do joystick e dos botões ficam no perfil em uso (lembre de salvar). O resto vale para o app todo.'),
        ),
      ),
      h('section', { class: 'card card--plain' }, profileHead),
      sticksWrap,
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Botões e gatilhos')), buttonsBody),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Conexão')), connBody),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Aparência')), uiBody),
      ),
      h(
        'div',
        { class: 'grid-2' },
        h(
          'section',
          { class: 'card' },
          h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Restaurar')),
          h(
            'div',
            { class: 'stack stack--sm' },
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => resetProfileSettings() }, icon('refresh'), 'Joystick e botões deste perfil'),
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => resetAppSettings() }, icon('refresh'), 'Configurações do app'),
            h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => ctx.nav('profiles') }, icon('layers'), 'Perfis iniciais…'),
          ),
        ),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Sobre')), aboutBody),
      ),
    );

    const range = ({ label, value, min, max, step, digits = 2, onValue }) => {
      const out = h('span', { class: 'range__value' }, fixed(value, digits));
      const input = h('input', {
        type: 'range',
        min,
        max,
        step,
        value,
        'aria-label': label,
        onInput: (e) => {
          const v = Number(e.target.value);
          setText(out, fixed(v, digits));
          fillRange(e.target);
          onValue(v);
        },
      });
      fillRange(input);
      return h('label', { class: 'range' }, h('span', { class: 'range__head' }, label, out), input);
    };

    // Accumulates partial edits per hand and sends them debounced.
    const pending = { left: {}, right: {} };
    const renderedModes = { left: null, right: null };
    const edit = (hand, path, value) => {
      const p = pending[hand];
      if (path.length === 1) p[path[0]] = value;
      else p[path[0]] = { ...(p[path[0]] || {}), [path[1]]: value };
      clearTimeout(timers[hand]);
      timers[hand] = setTimeout(async () => {
        const patch = pending[hand];
        pending[hand] = {};
        const r = await ctx.run('profile.updateSticks', { [hand]: patch });
        if (r) ctx.store.set('profile', r, { silentSettings: true });
      }, 120);
    };

    const renderSticks = () => {
      const p = ctx.store.state.profile;
      if (!p) {
        render(sticksWrap, h('div', { class: 'empty' }, 'Os ajustes do joystick aparecem no app Android.'));
        return;
      }
      render(
        sticksWrap,
        ['left', 'right'].map((hand) => {
          const cfg = p.sticks[hand];
          renderedModes[hand] = cfg.mode;
          const preview = createStickView({ label: 'Prévia do joystick', size: 130 });
          preview.setConfig(cfg);
          previews[hand] = preview;
          const modeSeg = h(
            'div',
            { class: 'seg' },
            MODES.map(([id, label]) =>
              h(
                'button',
                {
                  type: 'button',
                  class: cfg.mode === id ? 'is-active' : '',
                  onClick: () => edit(hand, ['mode'], id),
                },
                label,
              ),
            ),
          );
          const modeDesc = MODES.find(([id]) => id === cfg.mode)?.[2] || '';
          const axisBlock = (axis) =>
            h(
              'div',
              { class: 'stack stack--sm axis-block' },
              h(
                'div',
                { class: 'row row--between' },
                h('div', { class: 'section-title' }, `Eixo ${axis.toUpperCase()}`),
                h(
                  'label',
                  { class: 'inline-check' },
                  h('input', { type: 'checkbox', checked: cfg[axis].invert, onChange: (e) => edit(hand, [axis, 'invert'], e.target.checked) }),
                  'Inverter',
                ),
              ),
              AXIS_FIELDS.map(([key, label, min, max, step]) =>
                range({ label, value: cfg[axis][key], min, max, step, onValue: (v) => edit(hand, [axis, key], v) }),
              ),
            );
          return h(
            'section',
            { class: 'card stick-card' },
            h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, hand === 'left' ? 'Joystick esquerdo' : 'Joystick direito')),
            h(
              'div',
              { class: 'stick-card__top' },
              preview.el,
              h('div', { class: 'stack stack--sm' }, h('div', { class: 'field__label' }, 'Como o mouse vira joystick'), modeSeg, h('p', { class: 'muted small' }, modeDesc)),
            ),
            range({ label: 'Suavização', value: cfg.smoothing, min: 0, max: 0.95, step: 0.01, onValue: (v) => edit(hand, ['smoothing'], v) }),
            range({ label: 'Velocidade de retorno', value: cfg.returnSpeed, min: 0, max: 30, step: 0.5, digits: 1, onValue: (v) => edit(hand, ['returnSpeed'], v) }),
            h('div', { class: 'grid-2 axis-grid' }, axisBlock('x'), axisBlock('y')),
          );
        }),
      );
      renderLive(ctx.store.state.frame);
    };

    const renderProfileHead = () => {
      const p = ctx.store.state.profile;
      if (!p) {
        render(profileHead, h('span', { class: 'muted' }, 'Sem perfil (prévia no navegador).'));
        return;
      }
      render(
        profileHead,
        h('div', {}, h('div', { class: 'section-title' }, 'Perfil em uso'), h('div', { class: 'list__title' }, p.name, p.dirty ? h('span', { class: 'badge badge--purple' }, 'Não salvo') : h('span', { class: 'badge badge--blue' }, 'Salvo'))),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm btn--primary', type: 'button', disabled: !p.dirty, onClick: () => save() }, icon('save'), 'Salvar'),
          h('button', { class: 'btn btn--sm', type: 'button', disabled: !p.dirty, onClick: () => revert() }, icon('undo'), 'Desfazer'),
        ),
      );
    };

    const renderButtons = () => {
      const p = ctx.store.state.profile;
      if (!p) {
        render(buttonsBody);
        return;
      }
      let t1;
      const send = (patch) => {
        clearTimeout(t1);
        t1 = setTimeout(async () => {
          const r = await ctx.run('profile.updateButtons', patch);
          if (r) ctx.store.set('profile', r, { silentSettings: true });
        }, 150);
      };
      render(
        buttonsBody,
        range({ label: 'Eixo conta como apertado a partir de', value: p.buttons.analogThreshold, min: 0.05, max: 0.95, step: 0.05, onValue: (v) => send({ analogThreshold: v }) }),
        h('p', { class: 'muted small' }, 'Vale também para o gatilho e o grip contarem como apertados.'),
        range({ label: 'Força do gatilho quando vem de um botão', value: p.buttons.digitalAnalogValue, min: 0, max: 1, step: 0.05, onValue: (v) => send({ digitalAnalogValue: v }) }),
        h('p', { class: 'muted small' }, 'Botões comuns só têm apertado/solto. Gatilhos analógicos do controle mantêm a força real.'),
      );
    };

    const toggle = (key, title, desc) =>
      h(
        'label',
        { class: 'switch' },
        h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, title), desc ? h('span', { class: 'switch__desc' }, desc) : null),
        h('input', {
          type: 'checkbox',
          checked: Boolean(ctx.store.state.settings?.[key]),
          disabled: !ctx.store.state.settings,
          onChange: (e) => updateSetting({ [key]: e.target.checked }),
        }),
      );

    const renderApp = () => {
      render(
        connBody,
        toggle('autoSelectLastDevice', 'Reconectar sozinho', 'Volta a usar o último controle quando ele liga de novo'),
        toggle('selectedDeviceOnly', 'Ler só o controle escolhido', 'Desligado: lê qualquer controle externo'),
        toggle('consumeControllerInput', 'Controle não mexe no app', 'Os botões do VR Box não clicam nas telas do app enquanto são lidos'),
        toggle('autoPointerCapture', 'Capturar o mouse', 'No modo mouse, o app esconde o cursor e lê o movimento do joystick'),
        toggle('showInternalDevices', 'Mostrar dispositivos internos', 'Mostra os botões do próprio celular na tela Controle'),
      );
      const logSize = h(
        'select',
        { class: 'select', disabled: !ctx.store.state.settings, onChange: (e) => updateSetting({ logSize: Number(e.target.value) }) },
        [100, 200, 500, 1000].map((n) => h('option', { value: n, selected: ctx.store.state.settings?.logSize === n }, `${n} eventos`)),
      );
      render(
        uiBody,
        toggle('reduceMotion', 'Menos animação', ''),
        toggle('showRawCodes', 'Mostrar códigos técnicos', 'Ex.: key:BUTTON_A ao lado do nome'),
        toggle('keepScreenOn', 'Tela sempre ligada na emulação', 'Evita a tela apagar no meio do jogo'),
        h('label', { class: 'field field--row' }, h('span', { class: 'field__label' }, 'Histórico de eventos'), logSize),
      );
    };

    const renderAbout = () => {
      const i = ctx.store.state.info;
      render(
        aboutBody,
        h('dt', {}, 'App'),
        h('dd', {}, `VR Box → Joy-Con ${i?.version || ''}`),
        h('dt', {}, 'Android'),
        h('dd', {}, i ? `${i.android} (API ${i.sdk})` : 'Navegador'),
        h('dt', {}, 'Celular'),
        h('dd', {}, i?.device || '—'),
      );
    };

    const renderLive = (frame) => {
      if (!frame?.v) return;
      for (const hand of ['left', 'right']) {
        const v = frame.v[hand];
        previews[hand]?.update(v.x, v.y, v.rx, v.ry);
      }
    };

    async function updateSetting(patch) {
      const s = await ctx.run('settings.update', patch);
      if (s) ctx.store.set('settings', s);
    }

    async function save() {
      const r = await ctx.run('profile.save');
      if (r) {
        ctx.store.set('profiles', r.profiles);
        ctx.store.set('profile', r.profile);
        ctx.toast('Perfil salvo');
      }
    }

    async function revert() {
      const p = await ctx.run('profile.revert');
      if (p) ctx.store.set('profile', p);
    }

    async function resetProfileSettings() {
      if (!(await confirmDialog('Restaurar ajustes', 'Voltar o joystick e os botões deste perfil para o padrão? Os botões mapeados não mudam.', 'Restaurar'))) return;
      const p = await ctx.run('profile.resetSettings');
      if (p) {
        ctx.store.set('profile', p);
        ctx.toast('Ajustes restaurados (lembre de salvar)');
      }
    }

    async function resetAppSettings() {
      if (!(await confirmDialog('Configurações do app', 'Voltar conexão, aparência e saída de rede para o padrão?', 'Restaurar', true))) return;
      const s = await ctx.run('settings.reset');
      if (s) {
        ctx.store.set('settings', s);
        ctx.toast('Configurações restauradas');
      }
    }

    renderProfileHead();
    renderSticks();
    renderButtons();
    renderApp();
    renderAbout();

    let lastProfileKey = profileKey(ctx.store.state.profile);
    return {
      onProfile: (p, meta) => {
        renderProfileHead();
        // Re-render the sliders only when the change did not come from the sliders themselves.
        const key = profileKey(p);
        if (!meta?.silentSettings && key !== lastProfileKey) {
          renderSticks();
          renderButtons();
        } else {
          for (const hand of ['left', 'right']) previews[hand]?.setConfig(p.sticks[hand]);
          if (meta?.silentSettings && ['left', 'right'].some((hand) => p.sticks[hand].mode !== renderedModes[hand])) renderSticks();
        }
        lastProfileKey = key;
      },
      onSettings: renderApp,
      onFrame: renderLive,
    };
  },
};

function profileKey(p) {
  return p ? `${p.id}|${p.updatedAt}|${p.dirty}` : '';
}
