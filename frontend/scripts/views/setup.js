import { h, render, setText } from '../dom.js';
import { icon } from '../icons.js';
import { createVrBoxDrawing } from '../components/vrbox-drawing.js';

// "Configurar meu VR Box": one button at a time, then a ready-made Quest layout.
// Works in every mode of the VR Box 2.0 (@+A, @+B, @+C, @+D): each mode sends other signals,
// and running the setup again in another mode adds them to the same profile.

const BASE_STEPS = [
  { id: 'joystick', part: 'joystick', name: 'Joystick', title: 'Empurre o joystick para a direita', hint: 'Pode segurar um pouquinho.' },
  { id: 'trigTop', part: 'trigTop', name: 'Gatilho de cima', title: 'Aperte o gatilho de cima', hint: 'Fica atrás do controle, onde vai o dedo indicador.' },
  { id: 'trigBottom', part: 'trigBottom', name: 'Gatilho de baixo', title: 'Aperte o gatilho de baixo', hint: 'O outro gatilho, logo abaixo.' },
  { id: 'A', part: 'A', name: 'Botão A', title: 'Aperte o botão A' },
  { id: 'B', part: 'B', name: 'Botão B', title: 'Aperte o botão B' },
  { id: 'C', part: 'C', name: 'Botão C', title: 'Aperte o botão C' },
  { id: 'D', part: 'D', name: 'Botão D', title: 'Aperte o botão D' },
  { id: 'at', part: 'at', name: 'Botão @', title: 'Aperte o botão @', hint: 'Se ele só troca o modo do controle e nada aparece, toque em Pular.' },
];

/** Extra steps when the joystick sends one key per direction (keyboard / music modes). */
const DIRECTION_STEPS = [
  { id: 'joyLeft', part: 'joystick', name: 'Joystick para a esquerda', title: 'Agora empurre o joystick para a esquerda', direction: 'left' },
  { id: 'joyUp', part: 'joystick', name: 'Joystick para cima', title: 'Agora para cima', direction: 'up' },
  { id: 'joyDown', part: 'joystick', name: 'Joystick para baixo', title: 'Agora para baixo', direction: 'down' },
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

export const MODE_NAMES = { gamepad: 'Gamepad (jogo)', mouse: 'Mouse', keyboard: 'Teclado', music: 'Música / mídia' };

/** Which kind of mode a signal comes from. */
export function modeOf(sourceId, previous = null) {
  if (sourceId.startsWith('mouse:')) return 'mouse';
  if (/^key:(VOLUME_|MEDIA_|CAMERA|HEADSETHOOK)/.test(sourceId)) return 'music';
  if (/^key:BUTTON_|^axis:/.test(sourceId)) return 'gamepad';
  // Keys that every mode may send: they do not change what was already seen.
  if (/^key:(DPAD_|BACK$|ENTER$|ESCAPE$)/.test(sourceId)) return previous || 'keyboard';
  if (sourceId.startsWith('key:')) return 'keyboard';
  return previous;
}

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
      for (const s of DIRECTION_STEPS) if (learned[s.id]) rules.push({ source: learned[s.id].source, target: `${hand}.stick.${s.direction}` });
    }
  }
  for (const step of BASE_STEPS) {
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

function isStickSignal(d, learned) {
  const stick = learned.joystick;
  if (!stick) return false;
  if (d.sourceId.startsWith('mouse:')) return true;
  if (stick.kind === 'axis') {
    const base = d.sourceId.replace(/^axis:/, '').replace(/:[+-]$/, '');
    return (PAIRS[stick.axis] || [stick.axis]).includes(base);
  }
  if (stick.kind === 'dpad') return d.sourceId.startsWith('key:DPAD_');
  if (stick.kind === 'key') return [stick.source, ...DIRECTION_STEPS.map((s) => learned[s.id]?.source)].includes(d.sourceId);
  return false;
}

const MODE_TEXT = {
  mouse: 'O controle está no modo mouse. Funciona; para o Modo jogo do app, o modo gamepad costuma ser melhor.',
  gamepad: 'O controle está no modo gamepad. É o modo mais completo.',
  keyboard: 'O controle está mandando teclas. Funciona; o joystick anda nas direções que você ensinar.',
  music: 'O controle está no modo música. Funciona; alguns botões podem não mandar nada nesse modo.',
};

export default {
  id: 'setup',
  title: 'Configurar controle',

  mount(root, ctx) {
    ctx.keepDetection = true;
    const drawing = createVrBoxDrawing();
    const signalDot = h('span', { class: 'dot' });
    const signalText = h('span', {}, 'Nenhum sinal ainda');
    const modeChip = h('span', { class: 'badge hidden' }, '');
    const stepTitle = h('div', { class: 'setup__title' }, '');
    const stepHint = h('p', { class: 'muted' }, '');
    const stepStatus = h('p', { class: 'setup__status' }, '');
    const progress = h('div', { class: 'setup__progress' });
    const actions = h('div', { class: 'row' });
    const note = h('div', { class: 'notice hidden' });
    const stepCard = h('section', { class: 'card card--accent setup__card' }, progress, stepTitle, stepHint, stepStatus, note, actions);
    const summary = h('section', { class: 'card hidden' });
    const done = h('section', { class: 'card hidden' });

    let steps = [...BASE_STEPS];
    let index = 0;
    let finished = false;
    let learned = {};
    let functions = { ...DEFAULTS };
    let advanceTimer = null;
    let idleTimer = null;
    let mode = null;
    let signalTimer = null;
    let round = 0; // how many modes were configured in this visit
    const hasProfile = () => ctx.store.state.profiles.some((p) => p.name === 'Meu VR Box');
    let keepOthers = hasProfile();

    root.append(
      h('header', { class: 'page-head' }, h('div', {}, h('h1', { class: 'page-title' }, 'Configurar meu VR Box'), h('p', { class: 'page-sub' }, 'Um botão de cada vez. No fim o app monta tudo no jeito do Quest.'))),
      h('div', { class: 'setup__signal' }, signalDot, signalText, modeChip),
      h('div', { class: 'setup' }, h('div', { class: 'setup__drawing' }, drawing.el), h('div', { class: 'stack' }, stepCard, summary, done)),
      h(
        'details',
        { class: 'card setup__modes' },
        h('summary', { class: 'card__title' }, 'Modos do controle'),
        h('p', { class: 'text-2' }, 'O VR Box 2.0 tem 4 modos. Para trocar, segure o @ e aperte A, B, C ou D. O app reconhece todos e mostra acima qual modo está chegando.'),
        h(
          'ul',
          { class: 'steps' },
          h('li', {}, 'Cada modo manda sinais diferentes (gamepad, mouse, teclado ou mídia).'),
          h('li', {}, 'Configure no modo que você vai usar. Quer usar mais de um? Depois de salvar, toque em "Configurar outro modo": o app junta tudo no mesmo perfil.'),
          h('li', {}, 'Se um botão não mostrar nada, ele não manda sinal nesse modo: pule ou troque o modo.'),
        ),
      ),
    );

    const drawState = () => {
      const st = {};
      for (const step of BASE_STEPS) {
        if (learned[step.id]) st[step.part] = 'done';
        else if (learned[step.id] === null) st[step.part] = 'skipped';
      }
      if (!finished && steps[index]) st[steps[index].part] = 'target';
      drawing.update(st);
    };

    const startIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (finished || stepStatus.classList.contains('is-ok')) return;
        setText(stepStatus, 'Nada chegou ainda. Esse botão pode não mandar sinal neste modo: toque em Pular ou troque o modo (segure @ e aperte outra letra).');
        stepStatus.className = 'setup__status is-warn';
      }, 7000);
    };

    const renderStep = () => {
      drawState();
      if (finished) {
        stepCard.classList.add('hidden');
        clearTimeout(idleTimer);
        renderSummary();
        return;
      }
      stepCard.classList.remove('hidden');
      summary.classList.add('hidden');
      done.classList.add('hidden');
      const step = steps[index];
      render(progress, `Passo ${index + 1} de ${steps.length}${round ? ` · modo ${round + 1}` : ''}`);
      setText(stepTitle, step.title);
      setText(stepHint, step.hint || '');
      setText(stepStatus, 'Esperando…');
      stepStatus.className = 'setup__status';
      render(
        actions,
        index > 0 ? h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => go(index - 1) }, 'Voltar') : null,
        h('button', { class: 'btn btn--sm', type: 'button', onClick: () => skip() }, 'Pular'),
      );
      startIdleTimer();
    };

    const go = (i) => {
      clearTimeout(advanceTimer);
      advanceTimer = null;
      index = Math.max(0, Math.min(steps.length - 1, i));
      finished = false;
      renderStep();
    };

    const next = () => {
      advanceTimer = null;
      if (index >= steps.length - 1) {
        finished = true;
        renderStep();
      } else go(index + 1);
    };

    const skip = () => {
      learned[steps[index].id] = null;
      next();
    };

    const accept = (stepId, value, text) => {
      learned[stepId] = value;
      clearTimeout(idleTimer);
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

    const showMode = (m) => {
      if (!m || m === mode) return;
      mode = m;
      modeChip.classList.remove('hidden');
      setText(modeChip, `Modo: ${MODE_NAMES[m]}`);
    };

    const pulseSignal = (text) => {
      setText(signalText, `Sinal do controle: ${text}`);
      signalDot.classList.add('is-ok');
      clearTimeout(signalTimer);
      signalTimer = setTimeout(() => signalDot.classList.remove('is-ok'), 900);
    };

    const onDetected = (d) => {
      showMode(modeOf(d.sourceId, mode));
      if (d.state === 'MOVED') pulseSignal(d.label);
      if (finished || advanceTimer) return;
      const step = steps[index];
      if (step.id === 'joystick') {
        if (d.state === 'RELEASED') return;
        const stick = stickFrom(d);
        accept('joystick', stick, stick.label);
        // One key per direction: learn the other three directions too.
        steps = stick.kind === 'key' ? [BASE_STEPS[0], ...DIRECTION_STEPS, ...BASE_STEPS.slice(1)] : [...BASE_STEPS];
        note.classList.remove('hidden');
        render(note, icon('info'), h('div', {}, MODE_TEXT[modeOf(d.sourceId, mode)] || ''));
        return;
      }
      if (d.state !== 'PRESSED' && !(step.direction && d.state === 'MOVED')) return;
      if (step.direction) {
        const used = [learned.joystick?.source, ...DIRECTION_STEPS.filter((s) => s.id !== step.id).map((s) => learned[s.id]?.source)];
        if (used.includes(d.sourceId)) {
          warn('Essa direção já foi. Agora empurre para o lado pedido.');
          return;
        }
        accept(step.id, { source: d.sourceId, label: d.label }, d.label);
        return;
      }
      if (isStickSignal(d, learned)) {
        warn('Isso foi o joystick. Agora aperte o botão.');
        return;
      }
      const dup = steps.find((s) => s.id !== step.id && learned[s.id]?.source === d.sourceId);
      if (dup) {
        warn(`Esse botão manda o mesmo sinal que o ${dup.name} neste modo. Toque em Pular ou troque o modo do controle (segure @ e aperte outra letra).`);
        return;
      }
      const analog = (d.alternatives || []).find((a) => a.kind === 'analog')?.id || null;
      accept(step.id, { source: d.sourceId, analog, label: d.label }, d.label);
    };

    const renderSummary = () => {
      summary.classList.remove('hidden');
      const rows = BASE_STEPS.map((step) => {
        const l = learned[step.id];
        const options = step.id === 'joystick' ? STICK_FUNCTIONS : FUNCTIONS;
        const select = h(
          'select',
          { class: 'select select--sm', 'aria-label': `Função de ${step.name}`, onChange: (e) => (functions[step.id] = e.target.value) },
          options.map(([v, label]) => h('option', { value: v, selected: functions[step.id] === v }, label)),
        );
        return h(
          'div',
          { class: 'game-row' },
          h('div', { class: 'game-row__label' }, step.name, h('small', {}, l ? l.label : 'Pulado')),
          l ? select : h('button', { class: 'btn btn--sm btn--ghost', type: 'button', onClick: () => go(steps.indexOf(step)) }, 'Refazer'),
        );
      });
      const count = BASE_STEPS.filter((s) => learned[s.id]).length;
      render(
        summary,
        h('div', { class: 'card__head' }, h('div', {}, h('h2', { class: 'card__title' }, 'Confira'), h('div', { class: 'card__sub' }, `${count} de ${BASE_STEPS.length} identificados. Dá para trocar o que cada um faz.`))),
        rows,
        hasProfile()
          ? h(
              'label',
              { class: 'switch' },
              h('span', { class: 'switch__text' }, h('span', { class: 'switch__title' }, 'Manter os outros modos'), h('span', { class: 'switch__desc' }, 'Guarda o que já foi configurado em outros modos do controle')),
              h('input', { type: 'checkbox', checked: keepOthers, onChange: (e) => (keepOthers = e.target.checked) }),
            )
          : null,
        h(
          'div',
          { class: 'row setup__save' },
          h('button', { class: 'btn btn--primary', type: 'button', disabled: !count, onClick: () => save() }, icon('save'), 'Salvar e usar'),
          h('button', { class: 'btn btn--ghost', type: 'button', onClick: () => restart() }, 'Recomeçar'),
        ),
      );
    };

    const restart = () => {
      steps = [...BASE_STEPS];
      learned = {};
      functions = { ...DEFAULTS };
      mode = null;
      modeChip.classList.add('hidden');
      note.classList.add('hidden');
      go(0);
    };

    async function save() {
      const mappings = buildMappings(learned, functions);
      const r = await ctx.run('profile.fromSetup', { name: 'Meu VR Box', mappings, merge: keepOthers });
      if (!r) return;
      ctx.store.set('profiles', r.profiles);
      ctx.store.set('profile', r.profile);
      round++;
      keepOthers = true;
      summary.classList.add('hidden');
      done.classList.remove('hidden');
      render(
        done,
        h('div', { class: 'card__head' }, h('h2', { class: 'card__title' }, 'Pronto! Seu VR Box está configurado')),
        h('p', { class: 'text-2' }, `O perfil "Meu VR Box" já está em uso${mode ? ` (modo ${MODE_NAMES[mode].toLowerCase()})` : ''}.`),
        h(
          'div',
          { class: 'row setup__save' },
          h('button', { class: 'btn btn--primary', type: 'button', onClick: () => ctx.nav('controllers') }, icon('activity'), 'Testar agora'),
          h('button', { class: 'btn', type: 'button', onClick: () => restart() }, icon('wand'), 'Configurar outro modo'),
        ),
        h('p', { class: 'muted small' }, 'Para outro modo: segure @ e aperte outra letra no controle, depois toque em "Configurar outro modo".'),
      );
      ctx.toast('Salvo');
    }

    ctx.run('detect.start');
    renderStep();

    return {
      onDetected,
      onLog: (entries) => {
        const last = [...entries].reverse().find((e) => e.c === 'physical');
        if (last) pulseSignal(last.m);
      },
      unmount: () => {
        clearTimeout(advanceTimer);
        clearTimeout(idleTimer);
        clearTimeout(signalTimer);
        ctx.keepDetection = false;
        ctx.bridge.call('detect.stop').catch(() => {});
      },
    };
  },
};
