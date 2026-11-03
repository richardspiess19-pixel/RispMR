import { h, render } from '../dom.js';
import { icon } from '../icons.js';
import { createEventLog } from '../components/event-log.js';
import { connect, disconnect } from './dashboard.js';

// Controle Bluetooth: how this phone sees the VR Box.

export default {
  id: 'devices',
  title: 'Controle',

  mount(root, ctx) {
    const adapterBody = h('div', { class: 'stack stack--sm' });
    const inputList = h('div');
    const selectedBody = h('div', { class: 'stack stack--sm' });
    const bondedBody = h('div');
    const received = createEventLog({ max: 14, categories: ['physical'], emptyText: 'Aperte um botão no controle.' });
    const connLog = createEventLog({ max: 30, categories: ['system'], emptyText: 'Nada ainda.' });
    const demoBody = h('div', { class: 'stack stack--sm' });

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('h1', { class: 'page-title' }, 'Controle Bluetooth'),
          h('p', { class: 'page-sub' }, 'Cada VR Box aparece de um jeito no Android: às vezes como mouse, às vezes como teclado ou gamepad. Aqui você vê como o seu celular enxerga o seu.'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--primary btn--sm', type: 'button', onClick: () => connect(ctx) }, icon('plug'), 'Conectar'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => refresh() }, icon('refresh'), 'Atualizar'),
        ),
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card card--accent' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Controle em uso')), selectedBody),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Bluetooth')), adapterBody),
      ),
      h(
        'section',
        { class: 'card' },
        h('div', { class: 'card__head' }, h('div', {}, h('h2', { class: 'card__title' }, 'Dispositivos encontrados'), h('div', { class: 'card__sub' }, 'Do jeito que o Android mostra'))),
        inputList,
      ),
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Comandos recebidos')), received.el),
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Conexões')), connLog.el),
      ),
      h(
        'section',
        { class: 'card' },
        h(
          'div',
          { class: 'card__head' },
          h('h2', { class: 'card__title' }, 'Pareados no Bluetooth'),
          h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => loadBonded() }, icon('refresh'), 'Recarregar'),
        ),
        bondedBody,
      ),
      h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Modo demonstração')), demoBody),
    );

    received.reset(ctx.store.state.log);
    connLog.reset(ctx.store.state.log);

    const renderAdapter = (status) => {
      const bt = status?.bluetooth;
      if (!bt) {
        render(adapterBody, h('div', { class: 'empty' }, 'Disponível no app Android.'));
        return;
      }
      const perm = {
        granted: 'Permitido',
        not_required: 'Não precisa (Android 11 ou anterior)',
        denied: 'Ainda não permitido',
        permanently_denied: 'Negado — libere nas configurações do app',
      }[bt.permission];
      const buttons = [];
      if (bt.permission === 'denied') buttons.push(h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => requestPermission() }, 'Permitir'));
      if (bt.permission === 'permanently_denied') buttons.push(h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('app.openAppSettings') }, icon('external'), 'Configurações do app'));
      if (bt.enabled === false) buttons.push(h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => ctx.run('bt.requestEnable', {}, { timeout: 0 }) }, 'Ligar Bluetooth'));
      buttons.push(h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('bt.openSettings') }, icon('bluetooth'), 'Parear no Android'));
      render(
        adapterBody,
        h(
          'dl',
          { class: 'kv' },
          h('dt', {}, 'Bluetooth'),
          h('dd', {}, !bt.supported ? 'Este celular não tem' : bt.enabled === null ? 'Sem permissão para ver' : bt.enabled ? 'Ligado' : 'Desligado'),
          h('dt', {}, 'Permissão'),
          h('dd', {}, perm || bt.permission),
        ),
        h('p', { class: 'muted small' }, 'O pareamento é feito no Bluetooth do próprio Android. Depois disso o controle aparece aqui sozinho. A permissão serve só para mostrar os detalhes; os botões funcionam sem ela.'),
        h('div', { class: 'row' }, buttons),
      );
    };

    const renderSelected = (status) => {
      const c = status?.controller;
      if (c?.demo) {
        render(
          selectedBody,
          h('div', { class: 'list__title' }, 'VR Box de demonstração', h('span', { class: 'badge badge--purple' }, 'Simulado')),
          h('p', { class: 'muted' }, 'Nenhum controle de verdade está sendo lido.'),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm', type: 'button', onClick: () => ctx.run('demo.stop') }, icon('stop'), 'Parar demonstração')),
        );
        return;
      }
      if (!c?.selected) {
        render(selectedBody, h('div', { class: 'empty' }, 'Nenhum controle escolhido. Toque em "Usar" num dispositivo abaixo ou em Conectar.'));
        return;
      }
      const g = c.selected;
      const mouse = g.roles.some((r) => r.startsWith('Mouse'));
      render(
        selectedBody,
        h('div', { class: 'list__title' }, g.name, c.connected ? h('span', { class: 'badge badge--blue' }, 'Conectado') : h('span', { class: 'badge badge--purple' }, 'Desconectado')),
        h(
          'dl',
          { class: 'kv' },
          h('dt', {}, 'Situação'),
          h('dd', {}, c.connected ? (status.input.focused ? 'Lendo os botões' : 'Pausado (app em segundo plano)') : 'Esperando reconectar'),
          h('dt', {}, 'O Android vê como'),
          h('dd', {}, g.roles.join(' + ') || g.primaryType),
          h('dt', {}, 'Fabricante'),
          h('dd', {}, `${g.vendor || 'Desconhecido'} (${g.vidPid})`),
          mouse ? h('dt', {}, 'Mouse') : null,
          mouse ? h('dd', {}, status.input.pointerCapture ? 'Capturado pelo app' : 'Toque na tela uma vez para o app capturar o mouse') : null,
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => ctx.nav('detect') }, icon('radar'), 'Detectar botões'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => disconnect(ctx) }, icon('unplug'), 'Desconectar'),
        ),
      );
    };

    const renderDevices = (devices) => {
      const groups = devices?.groups || [];
      const selectedKey = ctx.store.state.status?.controller?.selected?.key;
      const toggle = h(
        'label',
        { class: 'switch' },
        h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Mostrar dispositivos internos'), h('span', { class: 'switch__desc' }, 'Botões do próprio celular, teclados internos…')),
        h('input', { type: 'checkbox', checked: Boolean(devices?.showInternal), onChange: (e) => ctx.run('settings.update', { showInternalDevices: e.target.checked }) }),
      );
      if (!groups.length) {
        render(inputList, h('div', { class: 'empty' }, ctx.store.state.native ? 'Nenhum controle externo. Pareie e ligue o VR Box.' : 'A lista aparece no app Android.'), toggle);
        return;
      }
      render(
        inputList,
        h(
          'ul',
          { class: 'list' },
          groups.map((g) => {
            const selected = g.key === selectedKey;
            return h(
              'li',
              { class: `list__item ${selected ? 'is-selected' : ''}` },
              h(
                'div',
                { class: 'list__main' },
                h('div', { class: 'list__title' }, g.name, g.likelyVrBox ? h('span', { class: 'badge badge--purple' }, 'Parece um VR Box') : null, g.external === false ? h('span', { class: 'badge' }, 'Interno') : null),
                h('div', { class: 'list__meta' }, `${g.roles.join(' + ') || g.primaryType} · ${g.vidPid}${g.vendor ? ` · ${g.vendor}` : ''}`),
                h(
                  'details',
                  { class: 'device-details' },
                  h('summary', {}, 'Detalhes técnicos'),
                  h(
                    'dl',
                    { class: 'kv small' },
                    h('dt', {}, 'Partes'),
                    h('dd', { class: 'mono' }, g.nodes.map((n) => `#${n.id} ${n.sources} ${n.roles.join('+')}`).join('\n')),
                    h('dt', {}, 'Eixos'),
                    h('dd', { class: 'mono' }, g.axes.length ? g.axes.join(', ') : 'nenhum'),
                    h('dt', {}, 'Teclas'),
                    h('dd', { class: 'mono' }, g.declaredKeys.length ? g.declaredKeys.join(', ') : 'nenhuma'),
                  ),
                  h('p', { class: 'muted small' }, 'A lista de teclas vem do Android e pode ter teclas que o controle nunca manda. Para saber o que ele manda de verdade, use Detectar botões.'),
                ),
              ),
              h(
                'div',
                { class: 'list__side' },
                selected ? h('span', { class: 'badge badge--blue' }, icon('check'), 'Em uso') : h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => select(g.key) }, 'Usar'),
              ),
            );
          }),
        ),
        toggle,
      );
    };

    const renderBonded = (bt) => {
      if (!bt) {
        render(bondedBody, h('div', { class: 'empty' }, 'Disponível no app Android.'));
        return;
      }
      if (bt.bonded === null) {
        render(
          bondedBody,
          h('p', { class: 'muted' }, 'Para mostrar os pareados, o Android pede a permissão "Dispositivos próximos". O controle funciona mesmo sem ela.'),
          h('div', { class: 'row' }, h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => requestPermission() }, 'Permitir')),
        );
        return;
      }
      if (!bt.bonded.length) {
        render(bondedBody, h('div', { class: 'empty' }, 'Nenhum dispositivo pareado.'));
        return;
      }
      render(
        bondedBody,
        h(
          'ul',
          { class: 'list' },
          bt.bonded.map((d) =>
            h(
              'li',
              { class: 'list__item' },
              h('div', { class: 'list__main' }, h('div', { class: 'list__title' }, d.name), h('div', { class: 'list__meta' }, `${d.classLabel} · ${d.type} · `, h('span', { class: 'mono' }, d.address))),
              h('div', { class: 'list__side' }, d.aclConnected ? h('span', { class: 'badge badge--blue' }, 'Conectado') : d.aclConnected === false ? h('span', { class: 'badge' }, 'Desconectado') : null),
            ),
          ),
        ),
      );
    };

    const renderDemo = (status) => {
      const on = Boolean(status?.demo);
      render(
        demoBody,
        h('p', { class: 'text-2' }, 'Sem o controle por perto? O modo demonstração simula alguns botões e movimentos para você ver como tudo funciona.'),
        h(
          'div',
          { class: 'row' },
          on
            ? h('button', { class: 'btn btn--sm btn--purple', type: 'button', onClick: () => ctx.run('demo.stop') }, icon('stop'), 'Parar demonstração')
            : h('button', { class: 'btn btn--sm btn--purple', type: 'button', onClick: () => ctx.run('demo.start') }, icon('play'), 'Iniciar demonstração'),
        ),
      );
    };

    async function select(key) {
      const r = await ctx.run('input.select', { key });
      if (r) ctx.toast('Controle escolhido');
    }

    async function requestPermission() {
      const r = await ctx.run('bt.requestPermission', {}, { timeout: 0 });
      if (!r) return;
      if (r.permission !== 'granted') ctx.toast('Sem a permissão, só os detalhes do Bluetooth ficam escondidos.', 'info', 4000);
      renderBonded(r.bluetooth);
    }

    async function loadBonded() {
      if (!ctx.store.state.native) return renderBonded(null);
      const bt = await ctx.run('bt.devices');
      if (bt) renderBonded(bt);
    }

    async function refresh() {
      const d = await ctx.run('input.devices');
      if (d) ctx.store.set('devices', d);
      loadBonded();
    }

    renderAdapter(ctx.store.state.status);
    renderSelected(ctx.store.state.status);
    renderDevices(ctx.store.state.devices);
    renderDemo(ctx.store.state.status);
    loadBonded();

    let lastKey = '';
    return {
      onStatus: (status) => {
        const key = JSON.stringify([status?.bluetooth, status?.controller, status?.input, status?.demo]);
        if (key === lastKey) return;
        lastKey = key;
        renderAdapter(status);
        renderSelected(status);
        renderDemo(status);
        renderDevices(ctx.store.state.devices);
      },
      onDevices: renderDevices,
      onLog: (entries) => {
        received.append(entries);
        connLog.append(entries);
      },
    };
  },
};
