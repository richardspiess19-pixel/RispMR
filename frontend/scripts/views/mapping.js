import { h, render, setText, setClass } from '../dom.js';
import { icon } from '../icons.js';
import { fixed, kindLabel, targetLabel } from '../format.js';
import { confirmDialog, learnInput, pickSource, pickTarget } from '../ui.js';

// CONTROLLER MAPPING

const SECTIONS = [
  { title: 'Botões', match: (t) => t.type === 'button' },
  { title: 'Gatilho e grip', match: (t) => t.type === 'analog' },
  { title: 'Joystick', match: (t) => t.type === 'stick_axis' },
  { title: 'Direções do joystick (por botão)', match: (t) => t.type === 'stick_direction', collapsed: true },
];

export default {
  id: 'mapping',
  title: 'Botões',

  mount(root, ctx) {
    let tab = 'controls';
    const head = h('div', { class: 'map-head card' });
    const tabs = h('div', { class: 'seg', role: 'tablist' });
    const body = h('div', { class: 'stack' });
    let live = { targets: new Map(), pills: [] };

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('h1', { class: 'page-title' }, 'Botões do controle'),
          h('p', { class: 'page-sub' }, 'Escolha o que cada botão do VR Box faz nos controles virtuais do Quest. Dá para testar na hora; depois é só salvar.'),
        ),
      ),
      h(
        'section',
        { class: 'card card--accent setup-cta' },
        h('div', { class: 'setup-cta__icon' }, icon('wand')),
        h('div', { class: 'setup-cta__text' }, h('div', { class: 'card__title' }, 'Jeito fácil'), h('div', { class: 'card__sub' }, 'Aperte os botões do VR Box um de cada vez e o app monta tudo sozinho.')),
        h('button', { class: 'btn btn--primary btn--sm', type: 'button', onClick: () => ctx.nav('setup') }, 'Começar'),
      ),
      h('div', { class: 'section-title' }, 'Ajuste manual'),
      head,
      tabs,
      body,
    );

    const renderHead = () => {
      const p = ctx.store.state.profile;
      const profiles = ctx.store.state.profiles;
      if (!p) {
        render(head, h('div', { class: 'empty' }, 'O mapeamento funciona no app Android.'));
        return;
      }
      const select = h(
        'select',
        { class: 'select', 'aria-label': 'Perfil', onChange: (e) => activate(e.target.value) },
        profiles.map((x) => h('option', { value: x.id, selected: x.id === p.id }, x.name)),
      );
      render(
        head,
        h(
          'div',
          { class: 'map-head__row' },
          h('label', { class: 'field map-head__profile' }, h('span', { class: 'field__label' }, 'Perfil'), select),
          h(
            'div',
            { class: 'row map-head__actions' },
            p.dirty ? h('span', { class: 'badge badge--purple' }, 'Não salvo') : h('span', { class: 'badge badge--blue' }, icon('check'), 'Salvo'),
            h('button', { class: 'btn btn--sm btn--primary', type: 'button', disabled: !p.dirty, onClick: save }, icon('save'), 'Salvar'),
            h('button', { class: 'btn btn--sm', type: 'button', disabled: !p.dirty, onClick: revert }, icon('undo'), 'Desfazer'),
            h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: restore }, icon('refresh'), 'Restaurar padrão'),
          ),
        ),
        h('p', { class: 'muted small' }, `${p.mappings.length} ${p.mappings.length === 1 ? 'ligação' : 'ligações'} · padrão: ${p.baseName}`),
      );
    };

    const renderTabs = () => {
      render(
        tabs,
        [
          ['controls', 'Por controle'],
          ['rules', 'Lista completa'],
        ].map(([id, label]) =>
          h(
            'button',
            {
              type: 'button',
              role: 'tab',
              class: tab === id ? 'is-active' : '',
              'aria-selected': String(tab === id),
              onClick: () => {
                tab = id;
                renderTabs();
                renderBody();
              },
            },
            label,
          ),
        ),
      );
    };

    const pill = (m) => {
      const el = h(
        'span',
        { class: 'pill', title: m.source },
        h('span', {}, m.sourceLabel),
        m.invert ? h('span', { class: 'badge badge--outline' }, 'invertido') : null,
        h('button', { type: 'button', 'aria-label': `Remover ${m.sourceLabel}`, onClick: () => remove(m) }, icon('x')),
      );
      live.pills.push({ el, source: m.source });
      return el;
    };

    const renderControls = () => {
      const p = ctx.store.state.profile;
      const targets = ctx.store.state.catalog.targets;
      const column = (hand) =>
        h(
          'section',
          { class: `card map-hand map-hand--${hand}` },
          h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, hand === 'left' ? 'Controle esquerdo' : 'Controle direito')),
          SECTIONS.map((sec) => {
            const items = targets.filter((t) => t.hand === hand && sec.match(t));
            const rows = items.map((t) => {
              const mapped = p.mappings.filter((m) => m.target === t.id);
              const stateEl = h('span', { class: 'state' }, '—');
              live.targets.set(t.id, { stateEl, type: t.type, hand, control: t.control, id: t.id });
              return h(
                'div',
                { class: 'map-row' },
                h('div', { class: 'map-row__target' }, h('span', { class: 'map-row__label' }, t.label), stateEl),
                h('div', { class: 'map-row__sources' }, mapped.length ? mapped.map(pill) : h('span', { class: 'muted small' }, 'Nenhum botão')),
                h(
                  'div',
                  { class: 'map-row__actions' },
                  h('button', { class: 'btn btn--sm btn--blue', type: 'button', title: 'Aperte o botão do VR Box para ligar aqui', onClick: () => learn(t) }, icon('wand'), 'Aprender'),
                  h('button', { class: 'btn btn--icon', type: 'button', 'aria-label': `Escolher botão para ${t.label}`, onClick: () => addFromList(t) }, icon('plus')),
                ),
              );
            });
            if (!rows.length) return null;
            return sec.collapsed
              ? h('details', { class: 'map-section' }, h('summary', { class: 'section-title' }, sec.title), rows)
              : h('div', { class: 'map-section' }, h('div', { class: 'section-title' }, sec.title), rows);
          }),
        );
      render(body, h('div', { class: 'grid-2' }, column('left'), column('right')));
    };

    const renderRules = () => {
      const p = ctx.store.state.profile;
      const catalog = ctx.store.state.catalog;
      if (!p.mappings.length) {
        render(body, h('div', { class: 'empty' }, 'Este perfil ainda não tem botões. Use "Aprender" ou a tela Detectar botões.'));
        return;
      }
      const rows = p.mappings.map((m) => {
        const target = catalog.targets.find((t) => t.id === m.target);
        const options = [];
        if (m.sourceKind !== 'digital') {
          options.push(
            h(
              'label',
              { class: 'inline-check' },
              h('input', { type: 'checkbox', checked: m.invert, onChange: (e) => update(m, { invert: e.target.checked }) }),
              'Inverter',
            ),
          );
        }
        if (m.sourceKind === 'analog' && target && (target.type === 'button' || target.type === 'stick_direction')) {
          options.push(numberOption('Aperta a partir de', m.threshold ?? p.buttons.analogThreshold, 0.05, 0.95, 0.05, (v) => update(m, { threshold: v })));
        }
        if (m.sourceKind !== 'digital' && target && (target.type === 'analog' || target.type === 'stick_axis')) {
          options.push(numberOption('Intensidade', m.scale ?? 1, 0.1, 5, 0.1, (v) => update(m, { scale: v })));
        }
        const srcPill = h('span', { class: 'pill no-x', title: m.source }, h('span', {}, m.sourceLabel));
        live.pills.push({ el: srcPill, source: m.source });
        const stateEl = h('span', { class: 'state' }, '—');
        if (target) live.targets.set(`${m.id}`, { stateEl, type: target.type, hand: target.hand, control: target.control, id: target.id });
        return h(
          'li',
          { class: 'rule' },
          h(
            'div',
            { class: 'rule__main' },
            srcPill,
            h('span', { class: 'rule__arrow' }, '→'),
            h('span', { class: 'rule__target' }, targetLabel(catalog, m.target)),
            stateEl,
          ),
          h('div', { class: 'rule__meta muted small raw' }, h('span', { class: 'mono' }, m.source)),
          options.length ? h('div', { class: 'row rule__options' }, options) : null,
          h(
            'div',
            { class: 'row rule__actions' },
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => changeTarget(m) }, icon('edit'), 'Trocar função'),
            h('button', { class: 'btn btn--sm', type: 'button', onClick: () => changeSource(m, target) }, icon('wand'), 'Trocar botão'),
            h('button', { class: 'btn btn--sm btn--danger', type: 'button', onClick: () => remove(m) }, icon('trash'), 'Remover'),
          ),
        );
      });
      render(body, h('ul', { class: 'rules' }, rows));
    };

    const renderBody = () => {
      live = { targets: new Map(), pills: [] };
      if (!ctx.store.state.profile) {
        render(body);
        return;
      }
      if (tab === 'controls') renderControls();
      else renderRules();
      renderLive(ctx.store.state.frame);
    };

    const renderLive = (frame) => {
      if (!frame) return;
      const pressed = new Set(frame.p?.pressed || []);
      const axes = frame.p?.axes || {};
      const mouse = frame.p?.mouse || {};
      for (const { el, source } of live.pills) {
        let on = pressed.has(source) || Math.abs(axes[source] || 0) > 0.1;
        if (source === 'mouse:x') on = Math.abs(mouse.dx || 0) > 0;
        if (source === 'mouse:y') on = Math.abs(mouse.dy || 0) > 0;
        setClass(el, 'is-live', on);
      }
      for (const t of live.targets.values()) {
        const v = frame.v?.[t.hand];
        if (!v) continue;
        let text = 'solto';
        let on = false;
        if (t.type === 'button') {
          on = Boolean(v.buttons?.[t.control]);
          text = on ? 'apertado' : 'solto';
        } else if (t.type === 'analog') {
          const value = v[t.control] || 0;
          on = value >= (ctx.store.state.profile?.buttons?.analogThreshold ?? 0.5);
          text = fixed(value);
        } else {
          const axis = t.id.endsWith('.x') || t.id.endsWith('.left') || t.id.endsWith('.right') ? 'x' : 'y';
          const value = v[axis] || 0;
          on = Math.abs(value) > 0.05;
          text = fixed(value);
        }
        setText(t.stateEl, text);
        setClass(t.stateEl, 'is-on', on);
      }
    };

    function numberOption(label, value, min, max, step, onChange) {
      const out = h('span', { class: 'range__value' }, fixed(value));
      const input = h('input', {
        type: 'range',
        min,
        max,
        step,
        value,
        'aria-label': label,
        onInput: (e) => {
          setText(out, fixed(Number(e.target.value)));
          fillRange(e.target);
        },
        onChange: (e) => onChange(Number(e.target.value)),
      });
      fillRange(input);
      return h('label', { class: 'range range--inline' }, h('span', { class: 'range__head' }, label, out), input);
    }

    async function apply(promise, message) {
      const p = await promise;
      if (p) {
        ctx.store.set('profile', p);
        if (message) ctx.toast(message, 'ok');
      }
      return p;
    }

    async function learn(t) {
      const choice = await learnInput(ctx, { targetType: t.type, title: targetLabel(ctx.store.state.catalog, t.id) });
      if (!choice) return;
      await apply(ctx.run('mapping.add', { source: choice.id, target: t.id }), `${choice.label} → ${targetLabel(ctx.store.state.catalog, t.id)}`);
    }

    async function addFromList(t) {
      const choice = await pickSource(ctx.store.state.identified?.inputs || [], { targetType: t.type, title: targetLabel(ctx.store.state.catalog, t.id) });
      if (!choice) return;
      await apply(ctx.run('mapping.add', { source: choice.id, target: t.id }), `${choice.label} → ${targetLabel(ctx.store.state.catalog, t.id)}`);
    }

    async function remove(m) {
      await apply(ctx.run('mapping.remove', { id: m.id }), 'Removido (lembre de salvar)');
    }

    async function update(m, patch) {
      await apply(ctx.run('mapping.update', { id: m.id, ...patch }));
    }

    async function changeTarget(m) {
      const target = await pickTarget(ctx.store.state.catalog, { sourceKind: m.sourceKind, sourceLabel: m.sourceLabel, title: 'Trocar função' });
      if (target) await update(m, { target });
    }

    async function changeSource(m, target) {
      const choice = await learnInput(ctx, { targetType: target?.type || 'button', title: `Novo botão para ${targetLabel(ctx.store.state.catalog, m.target)}` });
      if (choice) await update(m, { source: choice.id });
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
      await apply(ctx.run('profile.revert'), 'Mudanças desfeitas');
    }

    async function restore() {
      const p = ctx.store.state.profile;
      if (!(await confirmDialog('Restaurar padrão', `Voltar os botões de "${p.name}" para o padrão "${p.baseName}"? Dá para desfazer antes de salvar.`, 'Restaurar'))) return;
      await apply(ctx.run('mapping.resetDefault'), 'Padrão restaurado (lembre de salvar)');
    }

    async function activate(id) {
      const p = ctx.store.state.profile;
      let discard = false;
      if (p?.dirty) {
        discard = await confirmDialog('Mudanças não salvas', `Descartar o que não foi salvo em "${p.name}"?`, 'Descartar e trocar', true);
        if (!discard) {
          renderHead();
          return;
        }
      }
      const r = await ctx.run('profiles.activate', { id, discard });
      if (r) {
        ctx.store.set('profiles', r.profiles);
        ctx.store.set('profile', r.profile);
      } else renderHead();
    }

    renderHead();
    renderTabs();
    renderBody();

    return {
      onProfile: () => {
        renderHead();
        renderBody();
      },
      onProfiles: renderHead,
      onFrame: renderLive,
    };
  },
};

export function fillRange(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 1);
  const pct = ((Number(input.value) - min) / (max - min)) * 100;
  input.style.setProperty('--fill', `${Math.max(0, Math.min(100, pct))}%`);
}
