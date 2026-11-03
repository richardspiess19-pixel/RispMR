import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { clockTime, kindLabel, stateLabel, targetLabel } from '../format.js';
import { confirmDialog, pickTarget } from '../ui.js';

// Detecção automática dos botões.

export default {
  id: 'detect',
  title: 'Detectar botões',

  mount(root, ctx) {
    ctx.keepDetection = true;
    const prompt = h('p', { class: 'detect-hero__text' }, 'Aperte um botão do VR Box');
    const hint = h('p', { class: 'muted small' }, '');
    const card = h('div', { class: 'card card--accent detected' });
    const history = h('ul', { class: 'list' });
    const identifiedList = h('div');
    const saveBar = h('div', { class: 'save-bar hidden' });

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h('div', {}, h('h1', { class: 'page-title' }, 'Detectar botões'), h('p', { class: 'page-sub' }, 'Aperte cada botão do controle. O app mostra o que recebeu e você escolhe o que ele vai fazer.')),
      ),
      h('section', { class: 'detect-hero' }, h('div', { class: 'learn__radar learn__radar--big', 'aria-hidden': 'true' }, h('span'), h('span'), h('i')), prompt, hint),
      card,
      saveBar,
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Agora há pouco')), history),
        h(
          'section',
          { class: 'card' },
          h(
            'div',
            { class: 'card__head' },
            h('div', {}, h('h2', { class: 'card__title' }, 'Botões deste controle'), h('div', { class: 'card__sub' }, 'Ficam guardados no celular')),
            h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => clearIdentified() }, icon('trash'), 'Limpar'),
          ),
          identifiedList,
        ),
      ),
    );

    const renderCard = (d) => {
      if (!d) {
        render(card, h('div', { class: 'section-title' }, 'Botão detectado'), h('p', { class: 'muted' }, 'Nada ainda.'));
        return;
      }
      const alternatives = (d.alternatives || []).map((a) =>
        h('button', { class: 'btn btn--sm', type: 'button', onClick: () => assign(a.id, a.kind, a.label) }, `Usar como ${a.label}`),
      );
      render(
        card,
        h('div', { class: 'section-title' }, 'Botão detectado'),
        h(
          'dl',
          { class: 'kv detected__kv' },
          h('dt', {}, 'Dispositivo'),
          h('dd', {}, d.device, d.demo ? h('span', { class: 'badge badge--purple' }, 'Simulado') : null),
          h('dt', {}, 'Evento'),
          h('dd', { class: 'detected__event' }, d.label),
          h('dt', {}, 'Estado'),
          h('dd', {}, h('span', { class: `state ${d.state !== 'RELEASED' ? 'is-on' : ''}` }, stateLabel(d.state))),
          h('dt', { class: 'raw' }, 'Código'),
          h('dd', { class: 'mono raw' }, d.sourceId),
        ),
        h('p', { class: 'detected__ok' }, icon('check'), 'Detectado com sucesso.'),
        h('div', { class: 'row' }, h('button', { class: 'btn btn--primary btn--sm', type: 'button', onClick: () => assign(d.sourceId, d.kind, d.label) }, icon('wand'), 'Escolher o que ele faz'), alternatives),
      );
    };

    const renderHistory = () => {
      const list = ctx.store.state.detections;
      if (!list.length) {
        render(history, h('li', { class: 'empty' }, 'Os botões apertados aparecem aqui.'));
        return;
      }
      render(
        history,
        list.slice(0, 16).map((d) =>
          h(
            'li',
            { class: 'list__item' },
            h('div', { class: 'list__main' }, h('div', { class: 'list__title' }, d.label), h('div', { class: 'list__meta' }, `${clockTime(d.t)} · ${stateLabel(d.state)}`, h('span', { class: 'mono raw' }, ` · ${d.sourceId}`))),
            h('div', { class: 'list__side' }, h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => assign(d.sourceId, d.kind, d.label) }, 'Usar')),
          ),
        ),
      );
    };

    const renderIdentified = (identified) => {
      const inputs = identified?.inputs || [];
      if (!inputs.length) {
        render(identifiedList, h('div', { class: 'empty' }, 'Nenhum botão identificado ainda.'));
        return;
      }
      const mappings = ctx.store.state.profile?.mappings || [];
      render(
        identifiedList,
        h(
          'ul',
          { class: 'list' },
          inputs.map((i) => {
            const mapped = mappings.filter((m) => m.source === i.id).map((m) => targetLabel(ctx.store.state.catalog, m.target));
            return h(
              'li',
              { class: 'list__item' },
              h('div', { class: 'list__main' }, h('div', { class: 'list__title' }, i.label, h('span', { class: 'badge' }, kindLabel(i.kind))), h('div', { class: 'list__meta' }, mapped.length ? `Faz: ${mapped.join(', ')}` : 'Ainda não faz nada')),
              h('div', { class: 'list__side' }, h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => assign(i.id, i.kind, i.label) }, 'Usar')),
            );
          }),
        ),
      );
    };

    const renderSave = (status) => {
      const dirty = Boolean(status?.profile?.dirty);
      saveBar.classList.toggle('hidden', !dirty);
      if (dirty) render(saveBar, h('span', {}, 'Tem mudanças não salvas'), h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => save() }, icon('save'), 'Salvar'));
    };

    const renderPrompt = (status) => {
      const c = status?.controller;
      if (!ctx.store.state.native) {
        setText(prompt, 'A detecção funciona no app Android');
        setText(hint, '');
      } else if (c?.demo) {
        setText(prompt, 'Detectando os botões simulados');
        setText(hint, 'Pare a demonstração na tela Controle para usar o VR Box de verdade.');
      } else if (c?.selected) {
        setText(prompt, 'Aperte um botão do VR Box');
        setText(hint, c.connected ? `Ouvindo ${c.selected.name}` : `Esperando ${c.selected.name} reconectar`);
      } else {
        setText(prompt, 'Aperte qualquer botão do VR Box');
        setText(hint, 'O primeiro controle que mandar um botão é escolhido automaticamente.');
      }
    };

    async function assign(sourceId, kind, label) {
      const target = await pickTarget(ctx.store.state.catalog, { sourceKind: kind, sourceLabel: label });
      if (!target) return;
      const p = await ctx.run('mapping.add', { source: sourceId, target });
      if (p) {
        ctx.store.set('profile', p);
        ctx.toast(`${label} → ${targetLabel(ctx.store.state.catalog, target)}`);
      }
    }

    async function save() {
      const r = await ctx.run('profile.save');
      if (r) {
        ctx.store.set('profile', r.profile);
        ctx.store.set('profiles', r.profiles);
        ctx.toast('Perfil salvo');
      }
    }

    async function clearIdentified() {
      if (!(await confirmDialog('Limpar lista', 'Esquecer os botões identificados deste controle? O mapeamento não muda.', 'Limpar', true))) return;
      const r = await ctx.run('identified.clear');
      if (r) ctx.store.set('identified', r);
    }

    ctx.run('detect.start');
    renderCard(ctx.store.state.detections[0]);
    renderHistory();
    renderIdentified(ctx.store.state.identified);
    renderPrompt(ctx.store.state.status);
    renderSave(ctx.store.state.status);

    return {
      onDetected: (d) => {
        renderCard(d);
        renderHistory();
      },
      onIdentified: renderIdentified,
      onProfile: () => renderIdentified(ctx.store.state.identified),
      onStatus: (s) => {
        renderPrompt(s);
        renderSave(s);
      },
      unmount: () => {
        ctx.keepDetection = false;
        ctx.bridge.call('detect.stop').catch(() => {});
      },
    };
  },
};
