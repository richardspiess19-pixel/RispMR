// Toasts, modal dialogs and pickers.

import { h } from './dom.js';
import { icon } from './icons.js';
import { isCompatible } from './format.js';

export function toast(message, kind = 'info', ms = 2800) {
  const root = document.getElementById('toasts');
  if (!root) return;
  const el = h('div', { class: `toast toast--${kind}`, role: kind === 'error' ? 'alert' : 'status' }, message);
  root.append(el);
  while (root.children.length > 3) root.firstElementChild.remove();
  setTimeout(() => el.remove(), ms);
}

/**
 * Opens a modal. `actions`: [{ label, value, kind: 'primary'|'danger'|'ghost' }].
 * Resolves with the chosen action value, or null when dismissed.
 */
export function modal({ title, body, actions = [{ label: 'Fechar', value: null, kind: 'ghost' }], onOpen } = {}) {
  return new Promise((resolve) => {
    const root = document.getElementById('modal-root') || document.body;
    let done = false;
    const close = (value) => {
      if (done) return;
      done = true;
      backdrop.remove();
      document.removeEventListener('keydown', onKey);
      resolve(value);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close(null);
    };
    const foot = h(
      'div',
      { class: 'modal__foot' },
      actions.map((a) =>
        h('button', { class: `btn btn--sm ${a.kind ? `btn--${a.kind}` : ''}`, type: 'button', onClick: () => close(a.value) }, a.label),
      ),
    );
    const dialog = h(
      'div',
      { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
      h(
        'div',
        { class: 'modal__head' },
        h('div', { class: 'modal__title' }, title),
        h('button', { class: 'btn btn--ghost btn--icon', type: 'button', 'aria-label': 'Fechar', onClick: () => close(null) }, icon('x')),
      ),
      h('div', { class: 'modal__body' }, body),
      actions.length ? foot : null,
    );
    const backdrop = h('div', { class: 'modal-backdrop', onClick: (e) => e.target === backdrop && close(null) }, dialog);
    root.append(backdrop);
    document.addEventListener('keydown', onKey);
    onOpen?.({ close, dialog });
  });
}

export async function confirmDialog(title, text, okLabel = 'Confirmar', danger = false) {
  const r = await modal({
    title,
    body: h('p', {}, text),
    actions: [
      { label: 'Cancelar', value: false, kind: 'ghost' },
      { label: okLabel, value: true, kind: danger ? 'danger' : 'primary' },
    ],
  });
  return r === true;
}

export async function promptDialog(title, label, initial = '', okLabel = 'OK') {
  const input = h('input', { class: 'input', type: 'text', maxlength: '48', value: initial, 'aria-label': label });
  const r = await modal({
    title,
    body: h('label', { class: 'field' }, h('span', { class: 'field__label' }, label), input),
    actions: [
      { label: 'Cancelar', value: null, kind: 'ghost' },
      { label: okLabel, value: 'ok', kind: 'primary' },
    ],
    onOpen: ({ close }) => {
      setTimeout(() => input.focus(), 30);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') close('ok');
      });
    },
  });
  if (r !== 'ok') return null;
  const v = input.value.trim();
  return v || null;
}

const GROUPS = [
  { title: 'Botões', types: ['button'] },
  { title: 'Gatilho e grip', types: ['analog'] },
  { title: 'Joystick', types: ['stick_axis'] },
  { title: 'Direções do joystick', types: ['stick_direction'] },
];

/** Lets the user choose a virtual Quest input. Resolves with a target id or null. */
export function pickTarget(catalog, { sourceKind = 'digital', title = 'O que esse botão faz?', sourceLabel } = {}) {
  return new Promise((resolve) => {
    let closeFn = null;
    const column = (hand) =>
      h(
        'div',
        { class: 'stack stack--sm' },
        h('div', { class: 'section-title' }, hand === 'left' ? 'Controle esquerdo' : 'Controle direito'),
        GROUPS.map((g) => {
          const items = catalog.targets.filter((t) => t.hand === hand && g.types.includes(t.type));
          if (!items.length) return null;
          return h(
            'div',
            { class: 'picker-group' },
            h('h4', {}, g.title),
            items.map((t) => {
              const ok = isCompatible(sourceKind, t.type);
              return h(
                'button',
                {
                  class: 'picker-option',
                  type: 'button',
                  disabled: !ok,
                  title: ok ? '' : 'Movimento do mouse só pode mover o joystick',
                  onClick: () => {
                    resolve(t.id);
                    closeFn?.(t.id);
                  },
                },
                t.label,
                t.control === 'system' ? h('small', {}, 'Nem todo jogo aceita') : null,
              );
            }),
          );
        }),
      );
    modal({
      title,
      body: h(
        'div',
        { class: 'stack' },
        sourceLabel ? h('p', {}, 'No VR Box: ', h('b', {}, sourceLabel)) : null,
        h('div', { class: 'picker-hands' }, column('left'), column('right')),
      ),
      actions: [{ label: 'Cancelar', value: null, kind: 'ghost' }],
      onOpen: ({ close }) => {
        closeFn = close;
      },
    }).then((v) => {
      if (v === null || v === undefined) resolve(null);
    });
  });
}

/** Common Android inputs offered before they are identified on the device. */
export const COMMON_SOURCES = [
  ['mouse:btn:primary', 'Botão esquerdo do mouse', 'digital'],
  ['mouse:btn:secondary', 'Botão direito do mouse', 'digital'],
  ['mouse:x', 'Movimento do mouse (X)', 'relative'],
  ['mouse:y', 'Movimento do mouse (Y)', 'relative'],
  ['key:BUTTON_A', 'Botão A (gamepad)', 'digital'],
  ['key:BUTTON_B', 'Botão B (gamepad)', 'digital'],
  ['key:BUTTON_X', 'Botão X (gamepad)', 'digital'],
  ['key:BUTTON_Y', 'Botão Y (gamepad)', 'digital'],
  ['key:BUTTON_1', 'Botão 1', 'digital'],
  ['key:BUTTON_2', 'Botão 2', 'digital'],
  ['key:BUTTON_3', 'Botão 3', 'digital'],
  ['key:BUTTON_4', 'Botão 4', 'digital'],
  ['key:VOLUME_UP', 'Volume +', 'digital'],
  ['key:VOLUME_DOWN', 'Volume −', 'digital'],
  ['axis:X', 'Eixo X do joystick', 'analog'],
  ['axis:Y', 'Eixo Y do joystick', 'analog'],
  ['key:DPAD_UP', 'D-pad cima', 'digital'],
  ['key:DPAD_DOWN', 'D-pad baixo', 'digital'],
];

/** Picks a physical source among identified and common inputs. */
export function pickSource(identified, { targetType = 'button', title = 'Escolha o botão do VR Box' } = {}) {
  return new Promise((resolve) => {
    let closeFn = null;
    const known = new Set(identified.map((i) => i.id));
    const option = (id, label, kind, meta) => {
      const ok = isCompatible(kind, targetType);
      return h(
        'button',
        {
          class: 'picker-option',
          type: 'button',
          disabled: !ok,
          onClick: () => {
            resolve({ id, kind, label });
            closeFn?.('x');
          },
        },
        label,
        meta ? h('small', {}, meta) : null,
      );
    };
    modal({
      title,
      body: h(
        'div',
        { class: 'stack' },
        h('div', { class: 'section-title' }, 'Já vistos neste controle'),
        identified.length
          ? h('div', { class: 'picker-group' }, identified.map((i) => option(i.id, i.label, i.kind, `apertado ${i.count}×`)))
          : h('div', { class: 'empty' }, 'Nenhum ainda. Use "Aprender" ou a tela Detectar botões.'),
        h('div', { class: 'section-title' }, 'Outros botões comuns'),
        h(
          'div',
          { class: 'picker-group' },
          COMMON_SOURCES.filter(([id]) => !known.has(id)).map(([id, label, kind]) => option(id, label, kind, '')),
        ),
      ),
      actions: [{ label: 'Cancelar', value: null, kind: 'ghost' }],
      onOpen: ({ close }) => {
        closeFn = close;
      },
    }).then((v) => {
      if (v === null || v === undefined) resolve(null);
    });
  });
}

/**
 * LEARN: waits for the next physical input from the controller.
 * Resolves with { id, kind, label } or null when cancelled.
 */
export function learnInput(ctx, { targetType = 'button', title = 'Aprender botão' } = {}) {
  return new Promise((resolve) => {
    let finished = false;
    let unsub = null;
    let closeFn = null;
    const status = h('p', { class: 'muted small' }, 'Esperando…');
    const finish = (value) => {
      if (finished) return;
      finished = true;
      unsub?.();
      if (!ctx.keepDetection) ctx.bridge.call('detect.stop').catch(() => {});
      closeFn?.('x');
      resolve(value);
    };
    ctx.bridge.call('detect.start').catch((e) => {
      status.textContent = e.message;
    });
    unsub = ctx.store.on('detected', (d) => {
      if (d.state === 'RELEASED') return;
      let choice = { id: d.sourceId, kind: d.kind, label: d.label };
      // An analog axis crossing its threshold is reported as a direction; prefer the
      // analog axis when the target is analog/stick axis.
      const analogAlt = (d.alternatives || []).find((a) => a.kind === 'analog');
      if (analogAlt && (targetType === 'stick_axis' || targetType === 'analog')) {
        choice = { id: analogAlt.id, kind: 'analog', label: analogAlt.label };
      }
      if (!isCompatible(choice.kind, targetType)) {
        status.textContent = `${choice.label} não serve para isso. Tente outro botão.`;
        return;
      }
      finish(choice);
    });
    modal({
      title,
      body: h(
        'div',
        { class: 'stack learn' },
        h('div', { class: 'learn__radar', 'aria-hidden': 'true' }, h('span'), h('span'), h('i')),
        h('p', { class: 'learn__text' }, targetType === 'stick_axis' ? 'Mexa o joystick do VR Box' : 'Aperte o botão no VR Box'),
        status,
      ),
      actions: [{ label: 'Cancelar', value: null, kind: 'ghost' }],
      onOpen: ({ close }) => {
        closeFn = close;
      },
    }).then(() => finish(null));
  });
}
