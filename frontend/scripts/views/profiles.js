import { h, render } from '../dom.js';
import { icon } from '../icons.js';
import { confirmDialog, modal, promptDialog } from '../ui.js';

// PROFILES

export default {
  id: 'profiles',
  title: 'Perfis',

  mount(root, ctx) {
    const list = h('div');

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('h1', { class: 'page-title' }, 'Perfis'),
          h('p', { class: 'page-sub' }, 'Cada perfil guarda os botões e os ajustes do joystick. Dá para ter um perfil para cada jogo. Tudo fica salvo neste celular.'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => create() }, icon('plus'), 'Novo perfil'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => importProfile() }, icon('upload'), 'Importar'),
          h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => restoreDefaults() }, icon('refresh'), 'Restaurar iniciais'),
        ),
      ),
      h('section', { class: 'card' }, list),
    );

    const renderList = () => {
      const profiles = ctx.store.state.profiles || [];
      if (!ctx.store.state.native) {
        render(list, h('div', { class: 'empty' }, 'Os perfis ficam no app Android.'));
        return;
      }
      render(
        list,
        h(
          'ul',
          { class: 'list' },
          profiles.map((p) =>
            h(
              'li',
              { class: `list__item profile-item ${p.active ? 'is-selected' : ''}` },
              h(
                'div',
                { class: 'list__main' },
                h(
                  'div',
                  { class: 'list__title' },
                  p.name,
                  p.active ? h('span', { class: 'badge badge--blue' }, 'Em uso') : null,
                  p.dirty ? h('span', { class: 'badge badge--purple' }, 'Não salvo') : null,
                ),
                h('div', { class: 'list__meta' }, p.description || '—'),
                h('div', { class: 'list__meta' }, `${p.mappings} ${p.mappings === 1 ? 'ligação' : 'ligações'}`),
                h(
                  'div',
                  { class: 'row profile-item__actions' },
                  p.active ? null : h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => activate(p) }, icon('check'), 'Usar'),
                  h('button', { class: 'btn btn--sm', type: 'button', onClick: () => rename(p) }, icon('edit'), 'Renomear'),
                  h('button', { class: 'btn btn--sm', type: 'button', onClick: () => duplicate(p) }, icon('copy'), 'Duplicar'),
                  h('button', { class: 'btn btn--sm', type: 'button', onClick: () => exportProfile(p) }, icon('download'), 'Exportar'),
                  h('button', { class: 'btn btn--sm btn--danger', type: 'button', onClick: () => remove(p) }, icon('trash'), 'Excluir'),
                ),
              ),
            ),
          ),
        ),
      );
    };

    const applyResult = (r) => {
      if (!r) return;
      if (r.profiles) ctx.store.set('profiles', r.profiles);
      if (r.profile) ctx.store.set('profile', r.profile);
    };

    async function create() {
      const profiles = ctx.store.state.profiles;
      const nameInput = h('input', { class: 'input', type: 'text', maxlength: '48', placeholder: 'Ex.: Jogo de corrida' });
      const base = h('select', { class: 'select' }, h('option', { value: '' }, 'Vazio'), profiles.map((p) => h('option', { value: p.id }, `Cópia de ${p.name}`)));
      const activateBox = h('input', { type: 'checkbox', checked: true });
      const ok = await modal({
        title: 'Novo perfil',
        body: h(
          'div',
          { class: 'stack' },
          h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Nome'), nameInput),
          h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Começar de'), base),
          h('label', { class: 'switch' }, h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Usar logo depois de criar')), activateBox),
        ),
        actions: [
          { label: 'Cancelar', value: false, kind: 'ghost' },
          { label: 'Criar', value: true, kind: 'primary' },
        ],
        onOpen: () => setTimeout(() => nameInput.focus(), 30),
      });
      if (!ok) return;
      const name = nameInput.value.trim() || 'Novo perfil';
      const r = await ctx.run('profiles.create', { name, baseId: base.value });
      if (!r) return;
      applyResult(r);
      if (activateBox.checked) await activate({ id: r.created, name });
      else ctx.toast(`Perfil "${name}" criado`);
    }

    async function activate(p) {
      const current = ctx.store.state.profile;
      let discard = false;
      if (current?.dirty) {
        discard = await confirmDialog('Mudanças não salvas', `Descartar o que não foi salvo em "${current.name}"?`, 'Descartar e trocar', true);
        if (!discard) return;
      }
      const r = await ctx.run('profiles.activate', { id: p.id, discard });
      applyResult(r);
      if (r) ctx.toast(`Usando: ${r.profile.name}`);
    }

    async function rename(p) {
      const name = await promptDialog('Renomear perfil', 'Nome', p.name, 'Renomear');
      if (!name || name === p.name) return;
      applyResult(await ctx.run('profiles.rename', { id: p.id, name }));
    }

    async function duplicate(p) {
      const r = await ctx.run('profiles.duplicate', { id: p.id });
      applyResult(r);
      if (r) ctx.toast('Perfil duplicado');
    }

    async function remove(p) {
      if (!(await confirmDialog('Excluir perfil', `Apagar "${p.name}" deste celular? Não dá para desfazer.`, 'Excluir', true))) return;
      const r = await ctx.run('profiles.delete', { id: p.id });
      applyResult(r);
      if (r) ctx.toast('Perfil excluído');
    }

    async function exportProfile(p) {
      const r = await ctx.run('profiles.export', { id: p.id }, { timeout: 0 });
      if (r) ctx.toast('Perfil exportado');
    }

    async function importProfile() {
      const r = await ctx.run('profiles.import', {}, { timeout: 0 });
      if (!r) return;
      applyResult(r);
      ctx.toast(r.warnings?.length ? `Importado, mas: ${r.warnings[0]}` : 'Perfil importado', 'info', 4200);
    }

    async function restoreDefaults() {
      if (!(await confirmDialog('Restaurar perfis iniciais', 'Voltar os quatro perfis que vêm com o app para o original? Os perfis que você criou continuam.', 'Restaurar'))) return;
      const r = await ctx.run('profiles.restoreDefaults');
      applyResult(r);
      if (r) ctx.toast('Perfis iniciais restaurados');
    }

    renderList();
    return { onProfiles: renderList, onProfile: renderList };
  },
};
