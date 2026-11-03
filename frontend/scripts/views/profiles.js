import { h, render } from '../dom.js';
import { icon } from '../icons.js';
import { confirmDialog, modal, promptDialog } from '../ui.js';

// PROFILES

export default {
  id: 'profiles',
  title: 'Profiles',

  mount(root, ctx) {
    const list = h('div');

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'Profile manager'),
          h('h1', { class: 'page-title' }, 'Profiles'),
          h('p', { class: 'page-sub' }, 'A profile stores the mappings, joystick and button settings. The same physical controller can have several profiles. Profiles are saved in the app\'s private storage on this phone.'),
        ),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => create() }, icon('plus'), 'Create'),
          h('button', { class: 'btn btn--sm', type: 'button', onClick: () => importProfile() }, icon('upload'), 'Import'),
          h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => restoreDefaults() }, icon('refresh'), 'Restore defaults'),
        ),
      ),
      h('section', { class: 'card' }, list),
    );

    const renderList = () => {
      const profiles = ctx.store.state.profiles || [];
      if (!ctx.store.state.native) {
        render(list, h('div', { class: 'empty' }, 'Profiles are stored by the Android app.'));
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
                  p.active ? h('span', { class: 'badge badge--blue' }, 'Active') : null,
                  p.builtin ? h('span', { class: 'badge' }, 'Initial') : null,
                  p.dirty ? h('span', { class: 'badge badge--purple' }, 'Unsaved') : null,
                ),
                h('div', { class: 'list__meta' }, p.description || '—'),
                h('div', { class: 'list__meta' }, `${p.mappings} mappings · Left ${p.left ? 'configured' : 'not configured'} · Right ${p.right ? 'configured' : 'not configured'}`),
                h(
                  'div',
                  { class: 'row profile-item__actions' },
                  p.active ? null : h('button', { class: 'btn btn--sm btn--blue', type: 'button', onClick: () => activate(p) }, icon('check'), 'Activate'),
                  h('button', { class: 'btn btn--sm', type: 'button', onClick: () => rename(p) }, icon('edit'), 'Rename'),
                  h('button', { class: 'btn btn--sm', type: 'button', onClick: () => duplicate(p) }, icon('copy'), 'Duplicate'),
                  h('button', { class: 'btn btn--sm', type: 'button', onClick: () => exportProfile(p) }, icon('download'), 'Export'),
                  h('button', { class: 'btn btn--sm btn--danger', type: 'button', onClick: () => remove(p) }, icon('trash'), 'Delete'),
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
      const nameInput = h('input', { class: 'input', type: 'text', maxlength: '48', placeholder: 'My VR Box layout' });
      const base = h('select', { class: 'select' }, h('option', { value: '' }, 'Empty profile (default settings)'), profiles.map((p) => h('option', { value: p.id }, `Copy of ${p.name}`)));
      const activateBox = h('input', { type: 'checkbox', checked: true });
      const ok = await modal({
        title: 'Create profile',
        body: h(
          'div',
          { class: 'stack' },
          h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Name'), nameInput),
          h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'Start from'), base),
          h('label', { class: 'switch' }, h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Activate after creating')), activateBox),
        ),
        actions: [
          { label: 'Cancel', value: false, kind: 'ghost' },
          { label: 'Create', value: true, kind: 'primary' },
        ],
        onOpen: () => setTimeout(() => nameInput.focus(), 30),
      });
      if (!ok) return;
      const name = nameInput.value.trim() || 'New Profile';
      const r = await ctx.run('profiles.create', { name, baseId: base.value });
      if (!r) return;
      applyResult(r);
      if (activateBox.checked) await activate({ id: r.created, name });
      else ctx.toast(`Profile "${name}" created`, 'ok');
    }

    async function activate(p) {
      const current = ctx.store.state.profile;
      let discard = false;
      if (current?.dirty) {
        discard = await confirmDialog('Unsaved changes', `Discard the unsaved changes of "${current.name}"?`, 'Discard & switch', true);
        if (!discard) return;
      }
      const r = await ctx.run('profiles.activate', { id: p.id, discard });
      applyResult(r);
      if (r) ctx.toast(`Active profile: ${r.profile.name}`, 'ok');
    }

    async function rename(p) {
      const name = await promptDialog('Rename profile', 'Name', p.name, 'Rename');
      if (!name || name === p.name) return;
      applyResult(await ctx.run('profiles.rename', { id: p.id, name }));
    }

    async function duplicate(p) {
      const r = await ctx.run('profiles.duplicate', { id: p.id });
      applyResult(r);
      if (r) ctx.toast('Profile duplicated', 'ok');
    }

    async function remove(p) {
      if (!(await confirmDialog('Delete profile', `Delete "${p.name}" permanently from this phone?`, 'Delete', true))) return;
      const r = await ctx.run('profiles.delete', { id: p.id });
      applyResult(r);
      if (r) ctx.toast('Profile deleted', 'ok');
    }

    async function exportProfile(p) {
      const r = await ctx.run('profiles.export', { id: p.id }, { timeout: 0 });
      if (r) ctx.toast(`Exported to ${r.file}`, 'ok');
    }

    async function importProfile() {
      const r = await ctx.run('profiles.import', {}, { timeout: 0 });
      if (!r) return;
      applyResult(r);
      ctx.toast(r.warnings?.length ? `Imported with ${r.warnings.length} warning(s): ${r.warnings[0]}` : 'Profile imported', r.warnings?.length ? 'warn' : 'ok', 4200);
    }

    async function restoreDefaults() {
      if (!(await confirmDialog('Restore default profiles', 'Reset the four initial profiles (Default VR Box, Quest Touch Left, Quest Touch Right, Custom Profile) to their original configuration? Your own profiles are kept.', 'Restore'))) return;
      const r = await ctx.run('profiles.restoreDefaults');
      applyResult(r);
      if (r) ctx.toast('Initial profiles restored', 'ok');
    }

    renderList();
    return { onProfiles: renderList, onProfile: renderList };
  },
};
