import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { createVrBoxDrawing } from '../components/vrbox-drawing.js';

// "Configurar meu VR Box": one button at a time, then a ready-made Quest layout.

const STEPS = [
  { id: 'joystick', name: 'Joystick', title: 'Empurre o joystick para a direita', hint: 'Pode segurar um pouquinho.' },
  { id: 'trigTop', name: 'Gatilho de cima', title: 'Aperte o gatilho de cima', hint: 'Fica atrás do controle, onde vai o dedo indicador.' },
  { id: 'trigBottom', name: 'Gatilho de baixo', title: 'Aperte o gatilho de baixo', hint: 'O outro gatilho, logo abaixo.' },
  { id: 'A', name: 'Botão A', title: 'Aperte o botão A' },
  { id: 'B', name: 'Botão B', title: 'Aperte o botão B' },
  { id: 'C', name: 'Botão C', title: 'Aperte o botão C' },
  { id: 'D', name: 'Botão D', title: 'Aperte o botão D' },
  { id: 'at', name: 'Botão @', title: 'Aperte o botão @', hint: 'Se ele só troca o modo do controle e nada aparece, toque em Pular.' },
];

/** What each VR Box button does on the Quest controllers by default. */
const DEFAULTS = { joystick: 'left', trigTop: 'right.trigger', trigBottom: 'right.grip', A: 'right.a', B: 'right.b', C: 'left.x', D: 'left.y', at: 'left.menu' };

const FUNCTIONS = [
  ['right.trigger', 'Gatilho direito'],
  ['right.grip', 'Grip direito'],
  ['right.a', 'A'],
  ['right.b', 'B'],
  ['left.x', 'X'],
  ['left.y', 'Y'],
  ['left.menu', 'Menu'],
  ['left.trigger', 'Gatilho esquerdo'],
  ['left.grip', 'Grip esquerdo'],
  ['left.stickClick', 'Clique do joystick esquerdo'],
  ['right.stickClick', 'Clique do joystick direito'],
  ['', 'Nada'],
];

const STICK_FUNCTIONS = [
  ['left', 'Joystick esquerdo (andar)'],
  ['right', 'Joystick direito (virar)'],
  ['', 'Nada'],
];

const PAIRS = { X: ['X', 'Y'], Y: ['X', 'Y'], Z: ['Z', 'RZ'], RZ: ['Z', 'RZ'], RX: ['RX', 'RY'], RY: ['RX', 'RY'], HAT_X: ['HAT_X', 'HAT_Y'], HAT_Y: ['HAT_X', 'HAT_Y'] };

/** Turns what was learned into mapping rules (exported for tests). */
export function buildMappings(learned, functions) {
  const rules = [];
  const stick = learned.joystick;
  const hand = functions.joystick;
  if (stick && hand) {
    if (stick.kind === 'mouse') {
      rules.push({ source: 'mouse:x', target: `${hand}.stick.x` }, { source: 'mouse:y', target: `${hand}.stick.y` });
    } else if (stick.kind === 'axis') {
      const [x, y] = PAIRS[stick.axis] || [stick.axis];
      rules.push({ source: `axis:${x}`, target: `${hand}.stick.x` });
      if (y) rules.push({ source: `axis:${y}`, target: `${hand}.stick.y` });
    } else if (stick.kind === 'dpad') {
      for (const d of ['UP', 'DOWN', 'LEFT', 'RIGHT']) rules.push({ source: `key:DPAD_${d}`, target: `${hand}.stick.${d.toLowerCase()}` });
    } else {
      rules.push({ source: stick.source, target: `${hand}.stick.right` });
    }
  }
  for (const step of STEPS) {
    if (step.id === 'joystick') continue;
    const l = learned[step.id];
    const fn = functions[step.id];
    if (!l || !fn) continue;
    const analogTarget = fn.endsWith('.trigger') || fn.endsWith('.grip');
    rules.push({ source: analogTarget && l.analog ? l.analog : l.source, target: fn });
  }
  return rules;
}

/** Classifies a joystick detection. */
function stickFrom(d) {
  if (d.sourceId.startsWith('mouse:')) return { kind: 'mouse', source: d.sourceId, label: 'Movimento do mouse' };
  const analog = (d.alternatives || []).find((a) => a.kind === 'analog');
  if (analog || d.sourceId.startsWith('axis:')) {
    const axis = (analog?.id || d.sourceId).replace(/^axis:/, '').replace(/:[+-]$/, '');
    return { kind: 'axis', axis, source: d.sourceId, label: `Eixo ${axis}` };
  }
  if (d.sourceId.startsWith('key:DPAD_')) return { kind: 'dpad', source: d.sourceId, label: 'Setas (D-pad)' };
  return { kind: 'key', source: d.sourceId, label: d.label };
}

function isStickSignal(d, stick) {
  if (!stick) return false;
  if (d.sourceId.startsWith('mouse:')) return true;
  if (stick.kind === 'axis') {
    const base = d.sourceId.replace(/^axis:/, '').replace(/:[+-]$/, '');
    return (PAIRS[stick.axis] || [stick.axis]).includes(base);
  }
  if (stick.kind === 'dpad') return d.sourceId.startsWith('key:DPAD_');
  return false;
}

const MODE_TEXT = {
  mouse: 'Seu VR Box está no modo mouse. Funciona aqui; no Modo jogo do app é melhor usar o modo gamepad (segure @ e aperte outra letra para trocar o modo).',
  axis: 'Seu VR Box está no modo gamepad. Ótimo, é o melhor modo.',
  dpad: 'Seu VR Box está mandando setas (modo teclado). Funciona; o joystick vai andar só nas 4 direções.',
  key: 'Seu VR Box está mandando teclas pelo joystick. Funciona, mas só para um lado. Se puder, troque o modo (segure @ e aperte outra letra).',
};

export default {
  id: 'setup',
  title: 'Configurar controle',

  mount(root, ctx) {
    ctx.keepDetection = true;
    const drawing = createVrBoxDrawing();
    const stepTitle = h('div', { class: 'setup__title' }, '');
    const stepHint = h('p', { class: 'muted' }, '');
    const stepStatus = h('p', { class: 'setup__status' }, '');
    const progress = h('div', { class: 'setup__progress' });
    const actions = h('div', { class: 'row' });
    const modeNote = h('div', { class: 'notice hidden' });
    const stepCard = h('section', { class: 'card card--accent setup__card' }, progress, stepTitle, stepHint, stepStatus, modeNote, actions);
    const summary = h('section', { class: 'card hidden' });

    let index = 0;
    let finished = false;
    const learned = {};
    const functions = { ...DEFAULTS };
    let advanceTimer = null;

    root.append(
      h('header', { class: 'page-head' }, h('div', {}, h('h1', { class: 'page-title' }, 'Configurar meu VR Box'), h('p', { class: 'page-sub' }, 'Um botão de cada vez. No fim o app monta tudo no jeito do Quest.'))),
      h('div', { class: 'setup' }, h('div', { class: 'setup__drawing' }, drawing.el), stepCard),
      summary,
    );

    const drawState = () => {
      const st = {};
      STEPS.forEach((step, i) => {
        if (learned[step.id]) st[step.id] = 'done';
        else if (learned[step.id] === null) st[step.id] = 'skipped';
        if (!finished && i === index) st[step.id] = 'target';
      });
      drawing.update(st);
    };

    const renderStep = () => {
      drawState();
      if (finished) {
        stepCard.classList.add('hidden');
        renderSummary();
        return;
      }
      stepCard.classList.remove('hidden');
      summary.classList.add('hidden');
      const step = STEPS[index];
      render(progress, `Passo ${index + 1} de ${STEPS.length}`);
      setText(stepTitle, step.title);
      setText(stepHint, step.hint || '');
      setText(stepStatus, 'Esperando…');
      stepStatus.className = 'setup__status';
      render(
        actions,
        index > 0 ? h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => go(index - 1) }, 'Voltar') : null,
        h('button', { class: 'btn btn--sm', type: 'button', onClick: () => skip() }, 'Pular'),
      );
    };

    const go = (i) => {
      clearTimeout(advanceTimer);
      index = Math.max(0, Math.min(STEPS.length - 1, i));
      finished = false;
      renderStep();
    };

    const next = () => {
      if (index >= STEPS.length - 1) {
        finished = true;
        renderStep();
      } else go(index + 1);
    };

    const skip = () => {
      learned[STEPS[index].id] = null;
      next();
    };

    const accept = (stepId, value, text) => {
      learned[stepId] = value;
      setText(stepStatus, `Pronto: ${text}`);
      stepStatus.className = 'setup__status is-ok';
      drawState();
      clearTimeout(advanceTimer);
      advanceTimer = setTimeout(next, 700);
    };

    const warn = (text) => {
      setText(stepStatus, text);
      stepStatus.className = 'setup__status is-warn';
    };

    const onDetected = (d) => {
      if (finished || advanceTimer && stepStatus.classList.contains('is-ok')) return;
      const step = STEPS[index];
      if (step.id === 'joystick') {
        if (d.state === 'RELEASED') return;
        const stick = stickFrom(d);
        accept('joystick', stick, stick.label);
        modeNote.classList.remove('hidden');
        render(modeNote, icon('info'), h('div', {}, MODE_TEXT[stick.kind]));
        return;
      }
      if (d.state !== 'PRESSED') return;
      if (isStickSignal(d, learned.joystick)) {
        warn('Isso foi o joystick. Agora aperte o botão.');
        return;
      }
      const dup = STEPS.find((s) => s.id !== step.id && s.id !== 'joystick' && learned[s.id]?.source === d.sourceId);
      if (dup) {
        warn(`Esse botão manda o mesmo sinal que o ${dup.name}. Nesse modo do controle eles são iguais. Toque em Pular ou troque o modo (segure @ e aperte outra letra).`);
        return;
      }
      const analog = (d.alternatives || []).find((a) => a.kind === 'analog')?.id || null;
      accept(step.id, { source: d.sourceId, analog, label: d.label }, d.label);
    };

    const renderSummary = () => {
      summary.classList.remove('hidden');
      const rows = STEPS.map((step) => {
        const l = learned[step.id];
        const options = step.id === 'joystick' ? STICK_FUNCTIONS : FUNCTIONS;
        const select = h(
          'select',
          { class: 'select select--sm', disabled: !l, 'aria-label': `Função de ${step.name}`, onChange: (e) => (functions[step.id] = e.target.value) },
          options.map(([v, label]) => h('option', { value: v, selected: functions[step.id] === v }, label)),
        );
        return h(
          'div',
          { class: 'game-row' },
          h('div', { class: 'game-row__label' }, step.name, h('small', {}, l ? l.label : 'Pulado')),
          l ? select : h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => go(STEPS.indexOf(step)) }, 'Refazer'),
        );
      });
      const count = STEPS.filter((s) => learned[s.id]).length;
      render(
        summary,
        h('div', { class: 'card__head' }, h('div', {}, h('h2', { class: 'card__title' }, 'Pronto! Confira'), h('div', { class: 'card__sub' }, `${count} de ${STEPS.length} identificados. Dá para trocar o que cada um faz.`))),
        rows,
        h(
          'div',
          { class: 'row setup__save' },
          h('button', { class: 'btn btn--primary', type: 'button', disabled: !count, onClick: () => save() }, icon('save'), 'Salvar e usar'),
          h('button', { class: 'btn btn--ghost', type: 'button', onClick: () => go(0) }, 'Recomeçar'),
        ),
      );
    };

    async function save() {
      const mappings = buildMappings(learned, functions);
      const r = await ctx.run('profile.fromSetup', { name: 'Meu VR Box', mappings });
      if (!r) return;
      ctx.store.set('profiles', r.profiles);
      ctx.store.set('profile', r.profile);
      ctx.toast('Pronto! Seu VR Box está configurado.');
      ctx.nav('controllers');
    }

    ctx.run('detect.start');
    renderStep();

    return {
      onDetected,
      unmount: () => {
        clearTimeout(advanceTimer);
        ctx.keepDetection = false;
        ctx.bridge.call('detect.stop').catch(() => {});
      },
    };
  },
};
