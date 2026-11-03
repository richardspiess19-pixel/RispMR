# Análise técnica de viabilidade e limitações

Este documento responde, antes de qualquer promessa, ao que é **possível**, **possível com
restrições** e **impossível** em um Android convencional para o objetivo "transformar um
controle VR Box em dois controles Meta Quest Touch".

Legenda usada no app e nesta documentação:

| Status | Significado |
| --- | --- |
| **Implementado** | Funciona nesta versão. |
| **Não disponível ainda** | Tecnicamente viável, mas não implementado nesta versão. |
| **Indisponível** | Depende de algo que o Android/telefone não oferece a apps comuns. |
| **Impossível** | Bloqueado pelo modelo de segurança do Android sem root/privilégio de sistema. |

---

## 1. Quais APIs permitem acessar os comandos do VR Box

O VR Box é um dispositivo **Bluetooth HID** (normalmente Bluetooth clássico). O Android faz o
pareamento, abre a conexão HID e converte os relatórios HID em eventos de entrada no próprio
sistema (kernel + `InputReader`). Um app comum **não recebe os relatórios HID brutos**: recebe
eventos já interpretados, e somente enquanto a sua janela tem foco.

| API pública | O que fornece | Uso no app |
| --- | --- | --- |
| `Activity.dispatchKeyEvent` / `KeyEvent` | Teclas, botões de gamepad (`KEYCODE_BUTTON_*`), D-pad, volume, mídia, teclado | **Implementado** |
| `dispatchGenericMotionEvent` / `MotionEvent` (`SOURCE_JOYSTICK`) | Eixos analógicos (`AXIS_X`, `AXIS_Y`, `AXIS_Z`, `AXIS_RZ`, `AXIS_HAT_X/Y`, gatilhos) | **Implementado** |
| `MotionEvent` (`SOURCE_MOUSE`) + `getButtonState()` | Botões do mouse (modo mouse do VR Box), cursor, roda | **Implementado** |
| `View.requestPointerCapture()` (API 26+) | Movimento **relativo** do mouse, sem cursor e sem parar na borda da tela | **Implementado** |
| `InputManager` + `InputDeviceListener` | Lista de dispositivos, como o Android os apresenta (mouse/teclado/gamepad), VID/PID, eixos, conexão/desconexão | **Implementado** (não precisa de permissão) |
| `InputDevice.hasKeys()` | Teclas declaradas pelo key layout do dispositivo | **Implementado** (informativo) |
| `BluetoothAdapter.getBondedDevices()` + broadcasts `ACTION_ACL_*` | Dispositivos pareados, classe Bluetooth, estado do link | **Implementado** (requer `BLUETOOTH_CONNECT` no Android 12+) |

Consequências importantes:

- **Não existe um "modo VR Box" universal.** Dependendo do modelo e do modo selecionado no
  controle (geralmente `@`+`A`/`B`/`C`/`D`), o Android o apresenta como **mouse**, **teclado**,
  **gamepad** ou uma combinação. O app nunca presume: ele lista como o sistema apresenta o
  dispositivo e identifica qualquer evento genericamente (tecla, botão de mouse, eixo, movimento).
- Um VR Box costuma aparecer como **vários `InputDevice`** (ex.: nó de mouse + nó de
  teclado/consumer control) com o mesmo nome/VID/PID. O app os agrupa como um único controle.
- **Leitura só em primeiro plano.** O Android entrega eventos apenas à janela com foco. Por isso o
  app não usa serviço em segundo plano e oferece "manter a tela ligada" durante a emulação.
- **Teclas reservadas** (`HOME`, `POWER`, alternância de apps) nunca chegam a apps.
- **Latência mensurável**: o app mede `agora − KeyEvent/MotionEvent.getEventTime()` (pipeline de
  entrada do Android até o app). O atraso do rádio Bluetooth não é visível para apps.

## 2. Quais APIs permitem disponibilizar entradas para outros aplicativos

| Mecanismo | Resultado | Status |
| --- | --- | --- |
| **Modo jogo — `AccessibilityService` (gestos + filtro de teclas)** | Com um jogo aberto, o serviço lê os botões do VR Box (`flagRequestFilterKeyEvents`; eixos do joystick via `setMotionEventSources` no Android 14+), passa pelo mesmo mapeamento e toca na tela do jogo com `dispatchGesture` (toques segurados, toques rápidos e arrasto em joysticks desenhados na tela). Funciona em qualquer jogo que use toque, inclusive o botão do Cardboard. | **Implementado** |
| **Protocolo de rede próprio (VRBQ via UDP)** | Qualquer app que implemente o protocolo recebe os dois controles virtuais (no mesmo telefone via `127.0.0.1` ou em outro dispositivo da rede local). | **Implementado** |
| `BluetoothHidDevice` (API 28+) | O telefone se apresenta a **outro** host (PC, headset) como um periférico HID — p.ex. um gamepad genérico. Seria um **gamepad**, não controles Touch. Alguns fabricantes desativam o perfil HID Device. | **Não disponível ainda** |
| Camada de API OpenXR (API layer) | Substitui/injeta estados de ação do perfil `/interaction_profiles/oculus/touch_controller` dentro do processo do jogo, lendo VRBQ. Precisa ser carregada **no processo do jogo**. | **Não disponível ainda** (projeto em `integration/RuntimeIntegration`) |
| Driver em um runtime OpenXR aberto (ex.: Monado) | O runtime passaria a expor controles virtuais a partir do VRBQ. Exige que o runtime seja o runtime ativo — o que inclui headset/compositor, fora do escopo. | **Não disponível** (fora do escopo) |
| `InputManager.injectInputEvent` | Injeção global de eventos | **Impossível** para apps comuns (`INJECT_EVENTS` é permissão de assinatura) |
| `/dev/uinput` | Criar um dispositivo de entrada virtual no kernel | **Impossível** sem root |
| `AccessibilityService.dispatchGesture` | Gestos de toque na tela | Usado pelo Modo jogo (não cria controles, só toca na tela) |

## 3. Permissões necessárias

| Permissão | Quando | Motivo |
| --- | --- | --- |
| `BLUETOOTH_CONNECT` (runtime, Android 12+) | Opcional | Listar dispositivos pareados e observar o link. **Sem ela o app continua lendo o controle**; apenas os detalhes Bluetooth ficam ocultos. |
| `BLUETOOTH` (`maxSdkVersion=30`) | Android 8–11 | Mesma finalidade (permissão de instalação, sem diálogo). |
| `INTERNET` (normal) | Sempre concedida | Envio UDP do protocolo VRBQ. |
| Serviço de acessibilidade | O usuário ativa em Configurações → Acessibilidade | Modo jogo. Só lê o controle escolhido, não lê o conteúdo da tela (`canRetrieveWindowContent=false`) e só age com a emulação ligada. |

**Não solicitadas de propósito:** `BLUETOOTH_SCAN`, localização (o pareamento é feito nas
configurações do Android), notificações, serviço em primeiro plano, sobreposição de tela,
visibilidade de outros pacotes.

**Instalação no Brasil:** desde 30/09/2026 o Android exige desenvolvedor verificado, e o Play
Protect barra APKs com acessibilidade vindos do navegador/mensageiros/gerenciadores de arquivos.
Instalar por ADB evita os dois bloqueios (ver `INSTALLATION.md`).

Tratamento implementado: permissão negada, negada permanentemente (botão para abrir as
configurações do app), Bluetooth desligado (pedido `ACTION_REQUEST_ENABLE`), telefone sem
Bluetooth, dispositivo desconectado/reconectado, dispositivo incompatível (não listado como
candidato).

## 4. Recursos que exigem acesso privilegiado

- Injetar eventos de entrada em outros apps (`INJECT_EVENTS`, uid de sistema/shell).
- Criar dispositivos de entrada virtuais (`uinput`, root).
- Abrir/fechar a conexão **HID Host** de um dispositivo pareado (`BluetoothHidHost` é API de
  sistema). Por isso CONNECT/DISCONNECT do app operam sobre a *seleção* do controle; o link
  Bluetooth em si é controlado pelas configurações do Android.
- Ler relatórios HID brutos de dispositivos Bluetooth (`/dev/hidraw*`, root). O serviço HID
  sobre GATT (BLE) também é reservado ao sistema.
- Registrar dispositivos no runtime OpenXR de outro fabricante (Meta Horizon OS, Android XR).

Alternativa conhecida, **não implementada**: o Shizuku permite que um app use APIs com
privilégios de *shell* (após o usuário ativá-lo por depuração sem fio). Com isso seria possível
injetar `KeyEvent`/`MotionEvent` de gamepad no app em primeiro plano. Ainda assim seriam eventos
de gamepad Android, **não** controles Touch para OpenXR.

## 5. O que é impossível em um Android convencional

- **Registrar dois controles Meta Quest Touch virtuais visíveis para todos os jogos.** No OpenXR,
  a entrada de controles é produzida exclusivamente pelo **runtime** ativo (no Quest, o runtime
  da Meta). Um app comum não consegue adicionar dispositivos a ele.
- **Fazer um jogo do Quest aceitar o VR Box como Touch** apenas instalando um app no telefone.
- **Ler o controle em segundo plano sem o serviço de acessibilidade**, ou com a tela desligada.
- **Interceptar o VR Box em modo mouse** dentro de outros apps: cliques e movimento de mouse não
  passam pelo filtro de acessibilidade sem ligar a exploração por toque (o modo do TalkBack). Use o
  controle em modo gamepad/teclado no Modo jogo.
- **Joystick analógico no Modo jogo antes do Android 14**: só as teclas são filtráveis; use as
  setas (D-pad) ligadas às direções do joystick.
- **Capturar mouse/teclado globalmente** para outros apps.
- Fornecer **pose 6DoF** (posição/rotação da mão): o VR Box não tem rastreamento, e rastreamento
  está fora do escopo deste projeto. Muitos jogos exigem pose dos controles; mesmo com um runtime
  cooperativo, eles teriam controles "parados" no espaço.
- Expor o botão **System**: em OpenXR ele normalmente é reservado pelo runtime. O app mantém o
  estado virtual, mas um receptor pode não conseguir usá-lo.

## 6. Alternativas reais

1. **Modo jogo (implementado)** — para jogos no próprio celular: os controles virtuais viram
   toques na tela do jogo.
2. **Protocolo VRBQ (implementado)** — streaming UDP dos dois controles virtuais com
   especificação aberta, decodificadores de referência em C e Python e fixtures compartilhadas.
   Permite integração com:
   - jogos/apps próprios (Unity, Godot, nativos) que leiam o pacote e o tratem como entrada;
   - uma **camada OpenXR** que traduza VRBQ para ações do perfil Touch, empacotada com um jogo
     que você controle (projeto em `integration/RuntimeIntegration`);
   - um driver para runtime aberto (Monado) ou para SteamVR (OpenVR driver) em um PC — receptores
     separados, fora deste app Android.
3. **Telefone como gamepad Bluetooth (`BluetoothHidDevice`)** — viável em Android 9+ quando o
   fabricante mantém o perfil; resultado é um gamepad genérico, não Touch.
4. **Shizuku** — injeção de eventos de gamepad Android no app em primeiro plano; exige
   configuração técnica do usuário.

## Versão HTML dentro de um app conversor (WebView)

Quando o `vr-box-to-quest.html` é transformado em APK por um conversor de sites, a página roda
numa WebView e só enxerga o que a WebView repassa para o JavaScript:

| Situação | Por quê | Saída |
| --- | --- | --- |
| Não funciona em outros apps/jogos | Uma página só recebe entrada enquanto está na tela e não pode tocar em outros apps | App Android + Modo jogo (acessibilidade) |
| Botões de volume (C/D em vários modos do VR Box 2.0) não chegam | O Android trata volume e algumas teclas de sistema antes da página | App Android (`Activity.dispatchKeyEvent` recebe todas) |
| Joystick no modo mouse para de responder | O cursor para na borda da tela e a WebView no Android não tem *pointer lock* | Modo Gamepad, ou app Android (`requestPointerCapture`) |
| Botões de gamepad fora do layout padrão | A API Gamepad do Chromium só expõe o layout padrão | App Android |

O app Android com acessibilidade é bloqueado pela proteção contra fraudes do Play Protect quando
é instalado por navegador ou gerenciador de arquivos. A instalação por ADB não passa por esse
bloqueio (veja [INSTALLATION.md](INSTALLATION.md)).

## Conclusão

Não é possível disponibilizar controles Quest Touch virtuais para outros jogos **sem** um
runtime, driver ou integração privilegiada. O app entrega: leitura real do VR Box, identificação
automática de comandos, mapeamento completo, dois controles virtuais com joysticks, gatilhos e grip
analógicos, testador em tempo real, perfis, o Modo jogo (toques reais na tela dos jogos do
celular) e uma integração de rede documentada (VRBQ). Nenhuma tela afirma que um controle Quest foi
registrado no sistema.
