# Compatibilidade

## Android

| Versão | Situação |
| --- | --- |
| < 8.0 (API < 26) | Não suportado (sem pointer capture). |
| 8.0 – 9 (API 26–28) | Suportado. `InputDevice.isExternal` não existe: dispositivos internos podem aparecer na lista (o usuário escolhe). |
| 10 – 11 (API 29–30) | Suportado. Bluetooth sem diálogo de permissão (`BLUETOOTH` de instalação). |
| 12+ (API 31+) | Suportado. `BLUETOOTH_CONNECT` opcional para detalhes Bluetooth. |
| 15 (API 35, alvo) | Suportado; layout edge-to-edge tratado com insets. |

WebView: `WebMessageListener` (WebView ≥ 83) é usado quando disponível; caso contrário a ponte
cai para `addJavascriptInterface` automaticamente.

## Modo jogo

| Recurso | Android |
| --- | --- |
| Botões do VR Box (teclas/gamepad) virando toques | 8.0+ |
| Joystick analógico do VR Box dentro do jogo | 14+ (antes disso: use o D-pad ligado às direções) |
| VR Box em modo mouse | Não é interceptado fora do app; o clique já vira toque pelo próprio Android |
| Opção de acessibilidade cinza | Android 13+: Informações do app → ⋮ → Permitir configurações restritas |

## Modos típicos do VR Box

Os modos variam por fabricante; o app **não** presume nenhum deles. O que costuma acontecer:

| Modo no controle | Como o Android costuma apresentar | Entradas típicas |
| --- | --- | --- |
| Mouse (ex.: `@`+`B`) | Mouse + teclado/consumer control | `mouse:x/y`, `mouse:btn:primary`, às vezes `key:VOLUME_*`, `key:ENTER`, `key:BACK` |
| Game / gamepad (ex.: `@`+`A`/`C`) | Gamepad + joystick | `key:BUTTON_*`, `axis:X/Y`, `axis:HAT_X/Y` |
| Música / mídia (ex.: `@`+`D`) | Teclado (consumer control) | `key:VOLUME_*`, `key:MEDIA_*` |
| Alguns clones | Teclado | `key:DPAD_*`, letras, `key:ENTER` |

Use **Bluetooth Device Manager** para ver como *o seu* telefone apresenta o *seu* controle e
**Automatic Input Detection** para listar o que ele realmente envia.

## Particularidades

- Teclas `HOME`/`POWER`/recentes nunca chegam a apps.
- `KEYCODE_BACK` vindo do controle é consumido enquanto o app lê o controle (a navegação por toque
  continua funcionando). Desative "Block controller input from the UI" se preferir o contrário.
- Modo mouse sem pointer capture (permissão negada pelo sistema ou app sem foco): o app usa
  `AXIS_RELATIVE_X/Y` ou a diferença de posição do cursor, que para na borda da tela.
- Eixos que repousam em −1 (alguns gatilhos analógicos) produzem a direção `:-` pressionada;
  mapeie o eixo analógico em vez da direção nesses casos.
- Android 16+: a proteção de rede local pode passar a exigir permissão para UDP na LAN em
  versões futuras; `127.0.0.1` não é afetado.

## Receptores do protocolo VRBQ

Qualquer linguagem com UDP: referência em Python (`integration/InputProtocol/receiver`) e C
(`integration/InputProtocol/c/vrbq_protocol.h`).
