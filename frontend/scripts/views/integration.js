import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { protocolPreview } from '../format.js';

// Integração (avançado): saída de rede VRBQ e o que é ou não possível.

const OPTIONS = [
  ['Modo jogo (toques na tela)', 'Funciona', 'badge--blue', 'Para jogos no próprio celular. Veja a tela Modo jogo.'],
  ['Saída de rede VRBQ (UDP)', 'Funciona', 'badge--blue', 'Manda o estado dos dois controles pela rede, para apps ou programas que leiam esse formato (há exemplos em Python e C no projeto).'],
  ['Controles Quest em jogos OpenXR', 'Não dá', 'badge--danger', 'Só o sistema do headset (ou um runtime OpenXR) cria controles. Um app comum de celular não consegue registrar controles Touch para outros jogos.'],
  ['Virar gamepad Bluetooth para PC/headset', 'Ainda não', 'badge--purple', 'O Android 9+ permite o celular se passar por gamepad, mas isso ainda não está no app.'],
];

const PATHS = [
  ['Joystick X/Y', '/input/thumbstick/x , /y'],
  ['Clique do joystick', '/input/thumbstick/click'],
  ['X / A', '/input/x/click , /input/a/click'],
  ['Y / B', '/input/y/click , /input/b/click'],
  ['Gatilho', '/input/trigger/value'],
  ['Grip', '/input/squeeze/value'],
  ['Menu (esquerdo)', '/input/menu/click'],
  ['Sistema (direito)', '/input/system/click'],
];

export default {
  id: 'integration',
  title: 'Integração',

  mount(root, ctx) {
    const form = h('div', { class: 'stack' });
    const live = h('dl', { class: 'kv' });
    const preview = h('pre', { class: 'code' });

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h('div', {}, h('h1', { class: 'page-title' }, 'Integração'), h('p', { class: 'page-sub' }, 'Opções avançadas para mandar os controles virtuais para fora do app.')),
      ),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'O que dá para fazer')),
        h(
          'ul',
          { class: 'list' },
          OPTIONS.map(([name, badge, cls, text]) =>
            h('li', { class: 'list__item list__item--top' }, h('div', { class: 'list__main' }, h('div', { class: 'list__title' }, name, h('span', { class: `badge ${cls}` }, badge)), h('div', { class: 'list__meta' }, text))),
          ),
        ),
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Saída de rede')), form),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Enviando')), live, h('div', { class: 'section-title' }, 'Exemplo do pacote'), preview),
      ),
      h(
        'details',
        { class: 'card' },
        h('summary', { class: 'card__title' }, 'Para quem programa: nomes no OpenXR'),
        h(
          'table',
          { class: 'table' },
          h('thead', {}, h('tr', {}, h('th', {}, 'Comando'), h('th', {}, 'Caminho (/user/hand/left ou /right)'))),
          h('tbody', {}, PATHS.map(([a, b]) => h('tr', {}, h('td', {}, a), h('td', { class: 'mono' }, b)))),
        ),
      ),
    );

    const renderForm = () => {
      const s = ctx.store.state.settings;
      if (!s) {
        render(form, h('div', { class: 'empty' }, 'Disponível no app Android.'));
        return;
      }
      const u = s.udp;
      const enabled = h('input', { type: 'checkbox', checked: u.enabled });
      const host = h('input', { class: 'input', type: 'text', value: u.host, inputmode: 'url', autocomplete: 'off', spellcheck: 'false' });
      const port = h('input', { class: 'input', type: 'number', min: '1', max: '65535', value: u.port });
      const rate = h('input', { class: 'input', type: 'number', min: '10', max: '250', value: u.rateHz });
      const format = h('select', { class: 'select' }, h('option', { value: 'json', selected: u.format === 'json' }, 'JSON'), h('option', { value: 'binary', selected: u.format === 'binary' }, 'Binário'));
      render(
        form,
        h('label', { class: 'switch' }, h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Enviar pela rede'), h('span', { class: 'switch__desc' }, 'Só enquanto a emulação estiver ligada')), enabled),
        h('div', { class: 'grid-2' }, h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Endereço'), host), h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Porta'), port)),
        h('div', { class: 'grid-2' }, h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Vezes por segundo'), rate), h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Formato'), format)),
        h('p', { class: 'muted small' }, '127.0.0.1 é o próprio celular. Para um PC na mesma Wi-Fi, use o IP dele.'),
        h(
          'div',
          { class: 'row' },
          h(
            'button',
            {
              class: 'btn btn--primary btn--sm',
              type: 'button',
              onClick: async () => {
                const r = await ctx.run('integration.configure', { enabled: enabled.checked, host: host.value.trim(), port: Number(port.value), rateHz: Number(rate.value), format: format.value });
                if (r) {
                  ctx.store.set('settings', r.settings);
                  ctx.store.set('status', r.status);
                  ctx.toast('Salvo');
                }
              },
            },
            icon('save'),
            'Salvar',
          ),
        ),
      );
    };

    const kv = {};
    render(
      live,
      ['Situação', 'Destino', 'Pacotes', 'Último erro'].map((k) => {
        kv[k] = h('dd', {}, '—');
        return [h('dt', {}, k), kv[k]];
      }),
    );

    const renderLive = (status) => {
      const i = status?.integration;
      if (!i) return;
      setText(kv['Situação'], i.streaming ? 'Enviando' : i.udpEnabled ? 'Pronto (inicie a emulação)' : 'Desligado');
      setText(kv.Destino, `${i.target} · ${i.format === 'binary' ? 'binário' : 'JSON'}`);
      setText(kv.Pacotes, String(i.packets));
      setText(kv['Último erro'], i.lastError || 'nenhum');
    };

    let last = 0;
    const renderPreview = (frame) => {
      const now = performance.now();
      if (now - last < 250) return;
      last = now;
      setText(preview, JSON.stringify(protocolPreview(frame), null, 1));
    };

    renderForm();
    renderLive(ctx.store.state.status);
    renderPreview(ctx.store.state.frame);

    return { onSettings: renderForm, onStatus: renderLive, onFrame: renderPreview };
  },
};
