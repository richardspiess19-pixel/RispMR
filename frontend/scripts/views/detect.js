import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { clockTime, kindLabel, targetLabel } from '../format.js';
import { confirmDialog, pickTarget } from '../ui.js';

// AUTOMATIC INPUT DETECTION

export default {
  id: 'detect',
  title: 'Detect',

  mount(root, ctx) {
    ctx.keepDetection = true;
    const prompt = h('p', { class: 'detect-hero__text' }, 'Press a button on your VR Box controller');
    const hint = h('p', { class: 'muted small' }, '');
    const card = h('div', { class: 'card card--glow detected' });
    const history = h('ul', { class: 'list' });
    const identifiedList = h('div');
    const saveBar = h('div', { class: 'save-bar hidden' });

    root.append(
      h(
        'header',
        { class: 'page-head' },
        h(
          'div',
          {},
          h('div', { class: 'page-kicker' }, 'Automatic input detection'),
          h('h1', { class: 'page-title' }, 'Identify buttons'),
          h('p', { class: 'page-sub' }, 'Every event received from the controller is identified with its Android name and state, and can be assigned to a virtual Quest input.'),
        ),
      ),
      h(
        'section',
        { class: 'detect-hero' },
        h('div', { class: 'learn__radar learn__radar--big', 'aria-hidden': 'true' }, h('span'), h('span'), h('i')),
        prompt,
        hint,
      ),
      card,
      saveBar,
      h(
        'div',
        { class: 'grid-2' },
        h('section', { class: 'card' }, h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'This session')), history),
        h(
          'section',
          { class: 'card' },
          h(
            'div',
            { class: 'card__head' },
            h('div', {}, h('h2', { class: 'card__title' }, 'Identified inputs'), h('div', { class: 'card__sub' }, 'Saved per controller on this phone')),
            h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => clearIdentified() }, icon('trash'), 'Clear'),
          ),
          identifiedList,
        ),
      ),
    );

    const renderCard = (d) => {
      if (!d) {
        render(card, h('div', { class: 'detected__empty' }, h('div', { class: 'section-title' }, 'Physical input detected'), h('p', { class: 'muted' }, 'Nothing yet.')));
        return;
      }
      const alternatives = (d.alternatives || []).map((a) =>
        h('button', { class: 'btn btn--sm', type: 'button', onClick: () => assign(a.id, a.kind, a.label) }, `Use as ${a.label} (${kindLabel(a.kind)})`),
      );
      render(
        card,
        h('div', { class: 'section-title' }, 'Physical input detected'),
        h(
          'dl',
          { class: 'kv detected__kv' },
          h('dt', {}, 'Device'),
          h('dd', {}, d.device, d.demo ? h('span', { class: 'badge badge--purple' }, 'Simulated') : null),
          h('dt', {}, 'Event'),
          h('dd', { class: 'detected__event' }, d.label),
          h('dt', {}, 'State'),
          h('dd', {}, h('span', { class: `state ${d.state !== 'RELEASED' ? 'is-on' : ''}` }, d.state)),
          h('dt', { class: 'raw' }, 'Code'),
          h('dd', { class: 'mono raw' }, d.sourceId),
          h('dt', {}, 'Type'),
          h('dd', {}, kindLabel(d.kind)),
        ),
        h('p', { class: 'detected__ok' }, icon('check'), 'Detected successfully.'),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn btn--primary btn--sm', type: 'button', onClick: () => assign(d.sourceId, d.kind, d.label) }, icon('wand'), 'Assign to virtual input'),
          alternatives,
        ),
      );
    };

    const renderHistory = () => {
      const list = ctx.store.state.detections;
      if (!list.length) {
        render(history, h('li', { class: 'empty' }, 'Detected events appear here.'));
        return;
      }
      render(
        history,
        list.slice(0, 16).map((d) =>
          h(
            'li',
            { class: 'list__item' },
            h(
              'div',
              { class: 'list__main' },
              h('div', { class: 'list__title' }, d.label),
              h('div', { class: 'list__meta' }, `${clockTime(d.t)} · ${d.state}`, h('span', { class: 'mono raw' }, ` · ${d.sourceId}`)),
            ),
            h('div', { class: 'list__side' }, h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => assign(d.sourceId, d.kind, d.label) }, 'Assign')),
          ),
        ),
      );
    };

    const renderIdentified = (identified) => {
      const inputs = identified?.inputs || [];
      if (!inputs.length) {
        render(identifiedList, h('div', { class: 'empty' }, 'No inputs identified yet for this controller.'));
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
              h(
                'div',
                { class: 'list__main' },
                h('div', { class: 'list__title' }, i.label, h('span', { class: 'badge' }, kindLabel(i.kind))),
                h('div', { class: 'list__meta' }, mapped.length ? `→ ${mapped.join(', ')}` : 'Not mapped', ` · seen ${i.count}×`),
              ),
              h('div', { class: 'list__side' }, h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => assign(i.id, i.kind, i.label) }, 'Assign')),
            );
          }),
        ),
      );
    };

    const renderSave = (status) => {
      const dirty = Boolean(status?.profile?.dirty);
      saveBar.classList.toggle('hidden', !dirty);
      if (dirty) {
        render(
          saveBar,
          h('span', {}, `Unsaved changes in "${status.profile.name}"`),
          h('button', { class: 'btn btn--sm btn--primary', type: 'button', onClick: () => save() }, icon('save'), 'Save profile'),
        );
      }
    };

    const renderPrompt = (status) => {
      const c = status?.controller;
      if (!ctx.store.state.native) {
        setText(prompt, 'Detection runs inside the Android app');
        setText(hint, '');
      } else if (c?.demo) {
        setText(prompt, 'DEMO MODE: simulated presses are being detected');
        setText(hint, 'Stop demo mode in the Device Manager to detect a real controller.');
      } else if (c?.selected) {
        setText(prompt, 'Press a button on your VR Box controller');
        setText(hint, `Listening to ${c.selected.name}${c.connected ? '' : ' (disconnected — waiting)'}`);
      } else {
        setText(prompt, 'Press any button on the VR Box');
        setText(hint, 'No controller selected: the first external device that sends input is selected automatically.');
      }
    };

    async function assign(sourceId, kind, label) {
      const target = await pickTarget(ctx.store.state.catalog, { sourceKind: kind, sourceLabel: label });
      if (!target) return;
      const p = await ctx.run('mapping.add', { source: sourceId, target });
      if (p) {
        ctx.store.set('profile', p);
        ctx.toast(`${label} → ${targetLabel(ctx.store.state.catalog, target)} (unsaved)`, 'ok');
      }
    }

    async function save() {
      const r = await ctx.run('profile.save');
      if (r) {
        ctx.store.set('profile', r.profile);
        ctx.store.set('profiles', r.profiles);
        ctx.toast('Profile saved', 'ok');
      }
    }

    async function clearIdentified() {
      if (!(await confirmDialog('Clear identified inputs', 'Forget the inputs identified for this controller? Mappings are not changed.', 'Clear', true))) return;
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
