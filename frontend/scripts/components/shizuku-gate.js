// Android app only: the app stays locked until Shizuku lets it create the virtual gamepad.
import { h, render } from '../dom.js';
import { icon } from '../icons.js';

/** Shizuku states that keep the app locked (VirtualGamepadManager.State). */
const LOCKED = { not_installed: 0, not_running: 1, old_shizuku: 1, no_permission: 2 };

const NOW = {
  not_installed: 'O Shizuku não está instalado.',
  not_running: 'O Shizuku está instalado, mas parado.',
  old_shizuku: 'Este Shizuku é antigo: atualize pela Play Store.',
  no_permission: 'O Shizuku está ligado. Falta permitir este app.',
};

/** True when this status must lock the app. Only the Android app reports a Shizuku state. */
export function needsShizuku(status, state) {
  if (!state?.native || state.info?.platform === 'web') return false;
  return Object.hasOwn(LOCKED, status?.game?.gamepad?.state ?? '');
}

export function createShizukuGate(ctx) {
  const body = h('div', { class: 'gate__inner' });
  const el = h('div', { class: 'gate hidden', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Precisa do Shizuku' }, body);
  let locked = false;

  async function run(cmd) {
    const r = await ctx.run(cmd);
    if (r && cmd !== 'gamepad.openShizuku') ctx.store.set('status', r);
  }

  function draw(status) {
    const st = status.game.gamepad.state;
    const at = LOCKED[st];
    const step = (i, title, text, action) =>
      h(
        'li',
        { class: `gate-step ${i < at ? 'is-done' : i === at ? 'is-current' : ''}` },
        h('span', { class: 'gate-step__num' }, i < at ? icon('check') : String(i + 1)),
        h('div', { class: 'gate-step__body' }, h('div', { class: 'gate-step__title' }, title), h('p', {}, text), i === at ? action : null),
      );
    const button = (label, cmd, ic) => h('button', { class: 'btn btn--primary', type: 'button', onClick: () => run(cmd) }, ic ? icon(ic) : null, label);
    render(
      body,
      h('img', { class: 'gate__logo', src: 'assets/logo.svg', alt: '' }),
      h('h1', { class: 'gate__title' }, 'Precisa do Shizuku'),
      h(
        'p',
        { class: 'gate__lead' },
        'Este app cria um controle de jogo que todos os jogos do celular enxergam. O Android só deixa fazer isso com a permissão do Shizuku, um app grátis.',
      ),
      h(
        'ol',
        { class: 'gate-steps' },
        step(0, 'Instalar o Shizuku', 'Ele está na Play Store.', button('Baixar o Shizuku', 'gamepad.openShizuku', 'external')),
        step(
          1,
          st === 'old_shizuku' ? 'Atualizar o Shizuku' : 'Ligar o Shizuku',
          'Em Configurações → Sobre o telefone, toque 7 vezes em "Número da versão". Em Opções do desenvolvedor, ative "Depuração por Wi-Fi". No Shizuku, toque em "Parear", digite o código e depois em "Iniciar".',
          button('Abrir o Shizuku', 'gamepad.openShizuku', 'external'),
        ),
        step(2, 'Permitir este app', 'O Shizuku pergunta se este app pode usar a permissão. Toque em Permitir.', button('Permitir', 'gamepad.permission', 'check')),
      ),
      h('p', { class: 'gate__now' }, h('span', { class: 'dot' }), NOW[st]),
      status.game.gamepad.message ? h('div', { class: 'notice notice--warn' }, icon('info'), h('div', {}, status.game.gamepad.message)) : null,
      h('button', { class: 'btn btn--ghost btn--sm', type: 'button', onClick: () => run('app.status') }, 'Verificar de novo'),
      h('p', { class: 'muted small' }, 'O Shizuku desliga quando o celular reinicia. Aí é só abrir o Shizuku e tocar em "Iniciar" de novo.'),
    );
  }

  return {
    el,
    get locked() {
      return locked;
    },
    update(status) {
      const lock = needsShizuku(status, ctx.store.state);
      if (lock) draw(status);
      if (lock !== locked) {
        el.classList.toggle('hidden', !lock);
        document.documentElement.classList.toggle('is-locked', lock);
        if (locked && !lock) ctx.toast('Shizuku liberado. Pode usar o app.');
        locked = lock;
      }
    },
  };
}
