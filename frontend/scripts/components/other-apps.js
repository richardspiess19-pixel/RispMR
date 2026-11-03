// Why the HTML version only works inside itself, and what makes other games react.
import { h } from '../dom.js';
import { icon } from '../icons.js';
import { modal } from '../ui.js';

export function otherAppsInfo() {
  return h(
    'div',
    { class: 'stack' },
    h(
      'div',
      { class: 'notice notice--warn' },
      icon('info'),
      h(
        'div',
        {},
        h('b', {}, 'Só no app Android. '),
        'Um app feito de HTML só recebe o controle enquanto está aberto na tela, e o Android não deixa ele tocar em outros apps. É uma regra de segurança do Android: não tem como contornar pelo HTML.',
      ),
    ),
    h('p', { class: 'text-2' }, 'Para os outros jogos reagirem:'),
    h(
      'ol',
      { class: 'steps' },
      h('li', {}, 'Instale o app Android "VR Box → Quest" (o APK). Instale pelo computador com ADB: o Play Protect não bloqueia instalação por ADB.'),
      h('li', {}, 'No app, abra Jogo e ative o Modo jogo (acessibilidade).'),
      h('li', {}, 'Marque onde cada botão do VR Box toca na tela do jogo.'),
      h('li', {}, 'Toque em Iniciar emulação e abra o jogo.'),
    ),
    h('p', { class: 'text-2' }, 'O app Android também lê os botões que não chegam aqui (volume, música) e o joystick no modo mouse sem parar na borda da tela.'),
    h('p', { class: 'text-2' }, 'Jogo que já aceita controle Bluetooth não precisa de app nenhum: coloque o VR Box no modo Gamepad e abra o jogo.'),
  );
}

export function showOtherAppsHelp() {
  return modal({ title: 'Usar em outros jogos', body: otherAppsInfo() });
}
