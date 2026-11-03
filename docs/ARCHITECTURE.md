# Arquitetura

```
 VR Box (Bluetooth HID)
        │  pareamento e conexão HID feitos pelo Android
        ▼
 Android InputReader ──► KeyEvent / MotionEvent ──► MainActivity.dispatch*()
                                                        │
                                   ┌────────────────────┘
                                   ▼
                       AndroidInputTranslator  (Android → RawEvent)
                                   │
   ┌───────────────────────────────┼──────────────────── engine (Kotlin puro) ─┐
   │                               ▼                                           │
   │   InputProcessor  — estado físico, direções derivadas de eixos,           │
   │                     detecção automática, log, estatísticas                │
   │                               │                                           │
   │                               ▼                                           │
   │   ControllerMapper — regras "entrada física → entrada virtual"            │
   │                               │                                           │
   │                               ▼                                           │
   │   VirtualControllerManager — 2 × VirtualController + 2 × VirtualStick     │
   └───────────────────────────────┼───────────────────────────────────────────┘
                                   │ snapshot imutável
              ┌────────────────────┴───────────────────┐
              ▼                                        ▼
     WebBridge (JSON, ≤ 60 Hz)                 UdpStreamer (thread própria)
              │                                        │ VRBQ JSON / binário
              ▼                                        ▼
     Interface HTML/CSS/JS                     apps VR compatíveis
```

## Módulos

| Caminho | Responsabilidade |
| --- | --- |
| `frontend/` | Interface (HTML5, CSS3, JS em módulos ES, SVG). Sem build step, sem dependências. |
| `frontend/scripts/bridge.js` | Lado JS da ponte: promessas por `id`, timeouts, pushes. |
| `frontend/scripts/views/*` | Telas: Dashboard, Bluetooth Device Manager, Automatic Input Detection, Controller Mapping, Virtual Controllers, Controller Tester, Profiles, Settings, VR Integration. |
| `android/.../MainActivity.kt` | WebView + intercepção de entrada + captura de ponteiro + resultados de Activity. |
| `android/.../AppController.kt` | Orquestra motor, dispositivos, perfis, configurações, emulação e todos os comandos JS. |
| `android/.../engine/` | Motor puro (sem classes Android): modelos, mapeamento, joystick virtual, perfis, configurações, registro de dispositivos. Testado na JVM. |
| `android/.../input/` | `HidInputManager` (enumeração `InputManager`) e `AndroidInputTranslator`. |
| `android/.../bluetooth/` | Adaptador, pareados, classe Bluetooth, broadcasts ACL. |
| `android/.../bridge/` | `CommandRouter` (puro, testado) e `WebBridge` (transporte WebView). |
| `android/.../integration/` | `VrbqProtocol` (codificador puro, testado) e `UdpStreamer`. |
| `android/.../demo/` | `DemoScript`: entradas **simuladas** do DEMO MODE. |
| `android/.../PermissionManager.kt` | Permissões por versão do Android. |
| `config/` | Perfis iniciais e modelo de configurações (copiados para o APK). |
| `integration/` | Pesquisa OpenXR, projetos de integração, protocolo VRBQ + decodificadores de referência. |

> A estrutura sugerida no pedido foi adaptada: a interface é uma SPA (`index.html` + telas em
> `scripts/views/`) em vez de vários arquivos HTML, para não recarregar a página nem perder o
> fluxo de eventos ao navegar. Os nomes `BluetoothManager.kt`/`ControllerMapper.kt`/... foram
> mantidos quando não colidem com classes do Android (`BluetoothDeviceManager` evita conflito
> com `android.bluetooth.BluetoothManager`).

## Modelo de threads

- **Thread principal**: o Android entrega `KeyEvent`/`MotionEvent` nela. O processamento por
  evento (mapeamento + joystick) custa microssegundos e acontece no mesmo instante — sem salto de
  thread, menor latência.
- **Tick** (8 ms) só enquanto necessário: suavização, retorno ao centro, pulsos da roda do
  mouse. Parado quando tudo está neutro (economia de bateria).
- **UI**: no máximo um `frame` a cada 16 ms, apenas se algo mudou; o JS desenha em
  `requestAnimationFrame` e altera somente nós do DOM cujo valor mudou.
- **IO**: gravações de perfis/configurações em um executor de thread única, com escrita atômica
  (arquivo temporário + rename).
- **UDP**: `HandlerThread` próprio; envio imediato a cada mudança (limite ~500 pacotes/s) e
  repetição na taxa configurada.

## Ponte Kotlin ↔ JavaScript

Transporte preferido: `WebViewCompat.addWebMessageListener` (objeto `window.VRBQNative`, aceita
mensagens apenas da origem `https://appassets.androidplatform.net`). Fallback para WebViews muito
antigos: `addJavascriptInterface` + `evaluateJavascript`.

```jsonc
// JS → Kotlin
{"id": 7, "cmd": "mapping.add", "args": {"source": "key:BUTTON_A", "target": "right.a"}}
// Kotlin → JS (resposta)
{"type": "reply", "id": 7, "ok": true, "result": { /* perfil */ }}
{"type": "reply", "id": 8, "ok": false, "error": "Mapping not found", "code": "not_found"}
// Kotlin → JS (push)
{"type": "frame", "v": {"left": {...}, "right": {...}}, "p": {"pressed": [...], "axes": {...}}, "events": [...]}
{"type": "status" | "devices" | "identified" | "detected", ...}
```

Comandos: `app.*`, `bt.*`, `input.*`, `detect.*`, `identified.*`, `mapping.*`, `profile.*`,
`profiles.*`, `emulation.*`, `integration.configure`, `settings.*`, `demo.*`, `log.clear`,
`stats.reset` (lista completa em `AppController.registerCommands`).

Segurança da WebView: conteúdo apenas de `assets/` via `WebViewAssetLoader`; acesso a arquivos e
content providers desligado; navegação externa bloqueada (links `https` abrem no navegador);
CSP restritiva (`script-src 'self'`, `connect-src 'none'`); textos vindos de dispositivos
externos são inseridos sempre via `textContent`.

## Identificadores

- Físicos: `key:BUTTON_A`, `mouse:btn:primary`, `mouse:x`, `mouse:wheel:up`, `axis:X`,
  `axis:HAT_X:+` — nomes do SDK Android, não números, para perfis legíveis e portáveis.
- Virtuais: `left.x`, `left.y`, `left.menu`, `left.trigger`, `left.grip`, `left.stickClick`,
  `left.stick.x|y|up|down|left|right` e o equivalente `right.a|b|system...`.
- Convenção de eixos: X positivo = direita; **Y positivo = para cima** (OpenXR). Eixos Y do
  Android (positivos para baixo) são convertidos automaticamente.

## Joystick virtual

Pipeline por eixo: `bruto = clamp(componente_mouse + absoluto × sensibilidade)` → inversão →
deadzone (reescalada) → curva (`|v|^curva`) → limite máximo → suavização exponencial →
limitação ao círculo unitário.

- **Modo 1 — RELATIVE MOUSE**: integrador com vazamento; a deflexão é proporcional à velocidade
  do mouse e decai com a "velocidade de retorno".
- **Modo 2 — VIRTUAL STICK**: integrador de posição; após 40 ms sem movimento volta ao centro em
  velocidade linear configurável (0 = mantém a posição).
