# Análise técnica de viabilidade e limitações

> **Desde a versão 1.0 o app se chama "VR Box → Joy-Con"** e monta dois Joy-Cons virtuais
> (esquerdo: analógico, setas, −, Captura, L, ZL; direito: analógico, A/B/X/Y, +, Home, R, ZR).
> Os jogos do celular recebem esses dois Joy-Cons juntos como um controle de jogo comum (seção
> "Controle virtual com Shizuku"). O app não usa ids da Nintendo, então nenhum driver de Joy-Con
> assume o controle virtual. A análise abaixo foi escrita para o objetivo original (controles Meta
> Quest Touch) e continua valendo para o que é possível ou não no Android.

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
| **Modo jogo — controle virtual (Shizuku + `/dev/uhid`)** | Com o Shizuku ligado, um serviço do app no processo do Shizuku cria um gamepad HID padrão que todos os apps veem. Com o jogo aberto, o VR Box é lido pelo serviço de acessibilidade (teclas e, no Android 14+, mouse), passa pelo mesmo mapeamento e vira relatórios desse gamepad. Sem acessibilidade, o serviço do Shizuku lê o VR Box em `/dev/input` (experimental). | **Implementado** (não testado em aparelho real) |
| **Protocolo de rede próprio (VRBQ via UDP)** | Qualquer app que implemente o protocolo recebe os dois controles virtuais (no mesmo telefone via `127.0.0.1` ou em outro dispositivo da rede local). | **Implementado** |
| `BluetoothHidDevice` (API 28+) | O telefone se apresenta a **outro** host (PC, headset) como um periférico HID — p.ex. um gamepad genérico. Seria um **gamepad**, não controles Touch. Alguns fabricantes desativam o perfil HID Device. | **Não disponível ainda** |
| Camada de API OpenXR (API layer) | Substitui/injeta estados de ação do perfil `/interaction_profiles/oculus/touch_controller` dentro do processo do jogo, lendo VRBQ. Precisa ser carregada **no processo do jogo**. | **Não disponível ainda** (projeto em `integration/RuntimeIntegration`) |
| Driver em um runtime OpenXR aberto (ex.: Monado) | O runtime passaria a expor controles virtuais a partir do VRBQ. Exige que o runtime seja o runtime ativo — o que inclui headset/compositor, fora do escopo. | **Não disponível** (fora do escopo) |
| `InputManager.injectInputEvent` | Injeção global de eventos | **Impossível** para apps comuns (`INJECT_EVENTS` é permissão de assinatura) |
| `/dev/uinput` | Criar um dispositivo de entrada virtual no kernel | **Impossível** sem root |
| `AccessibilityService` | Ler teclas com outro app na frente | **Usado** para ler o VR Box no jogo (filtro de teclas; mouse via `setMotionEventSources` no Android 14+). Não toca na tela e não lê o conteúdo da tela |

## 3. Permissões necessárias

| Permissão | Quando | Motivo |
| --- | --- | --- |
| `BLUETOOTH_CONNECT` (runtime, Android 12+) | Opcional | Listar dispositivos pareados e observar o link. **Sem ela o app continua lendo o controle**; apenas os detalhes Bluetooth ficam ocultos. |
| `BLUETOOTH` (`maxSdkVersion=30`) | Android 8–11 | Mesma finalidade (permissão de instalação, sem diálogo). |
| `INTERNET` (normal) | Sempre concedida | Envio UDP do protocolo VRBQ. |
| Shizuku | O usuário instala o Shizuku, inicia pela depuração sem fio e permite o app (o app fica bloqueado até isso) | Modo jogo. O serviço no Shizuku cria o controle virtual em `/dev/uhid` e, sem acessibilidade, abre só o VR Box escolhido (pelo nome e pelos ids); não lê outros dispositivos nem a tela. |
| Serviço de acessibilidade | O usuário ativa em Configurações → Acessibilidade | Ler o VR Box com o jogo aberto. Só o controle escolhido; `canRetrieveWindowContent=false`; só com a emulação ligada. |

**Não solicitadas de propósito:** `BLUETOOTH_SCAN`, localização (o pareamento é feito nas
configurações do Android), notificações, serviço em primeiro plano, sobreposição de tela,
visibilidade de outros pacotes (só o Shizuku, para abrir o app dele).

**Instalação no Brasil:** desde 30/09/2026 o Android exige desenvolvedor verificado (ver
`INSTALLATION.md`). Por causa do serviço de acessibilidade, o Play Protect pode barrar a instalação
pelo navegador ou gerenciador de arquivos; por ADB não.

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

**Controle virtual com Shizuku (implementado, não testado em aparelho real).** O Shizuku roda
código com os privilégios do *shell* do ADB depois que o usuário o inicia pela depuração sem fio.
O app sobe nele um serviço (`ShizukuUserService`) que abre `/dev/uhid`, a mesma interface do kernel
que o comando `hid` do Android usa nos testes de compatibilidade, e cria um **gamepad HID
padrão** (15 botões, dois analógicos, gatilhos L2/R2 analógicos). O kernel e o Android tratam esse
dispositivo como um controle de verdade, então **todos os apps** o veem. Os dois Joy-Cons
virtuais viram esse gamepad (A/B/X/Y, setas = D-pad, L/R = L1/R1, ZL/ZR = L2/R2, −/+ = Select/Start,
Home = Mode, Captura = C, L3/R3 = cliques). Riscos:

O mesmo serviço lê o VR Box em `/dev/input/eventN` (o *shell* tem acesso, como o `getevent`),
encontrado pelo nome e pelos ids em `/sys/class/input`. Os códigos do kernel viram os nomes do
Android pela tabela do `Generic.kl` e pelos *scan codes* que o app viu (`KeyEvent.getScanCode`);
os eixos são escalados com os limites do `getevent -p`, como o Android faz. Com o jogo na frente,
o serviço segura o VR Box (EVIOCGRAB) para o jogo ver só o controle virtual; com a tela do app
aberta, solta, e o app lê o controle normalmente. Riscos:

- Não é API pública do Android: depende do *shell* ter acesso a `/dev/uhid` e `/dev/input`
  (padrão no AOSP por causa dos testes CTS e do `getevent`). Um fabricante pode bloquear; o app
  mostra o erro.
- EVIOCGRAB usa o `Os.ioctlInt` oculto por reflexão (processos `app_process`, como o do Shizuku,
  não têm a checagem de API oculta). Se falhar, o jogo vê o VR Box e o controle virtual, e o app
  avisa.
- É um gamepad Android comum: nem controles Touch para OpenXR, nem um Joy-Con da Nintendo.

## 5. O que é impossível em um Android convencional

- **Registrar dois controles Meta Quest Touch virtuais visíveis para todos os jogos.** No OpenXR,
  a entrada de controles é produzida exclusivamente pelo **runtime** ativo (no Quest, o runtime
  da Meta). Um app comum não consegue adicionar dispositivos a ele.
- **Fazer um jogo do Quest aceitar o VR Box como Touch** apenas instalando um app no telefone.
- **Ler o controle em segundo plano sem um privilégio extra** (Shizuku/ADB ou acessibilidade).
- **Capturar mouse/teclado globalmente** para outros apps.
- Fornecer **pose 6DoF** (posição/rotação da mão): o VR Box não tem rastreamento, e rastreamento
  está fora do escopo deste projeto. Muitos jogos exigem pose dos controles; mesmo com um runtime
  cooperativo, eles teriam controles "parados" no espaço.
- Expor o botão **System**: em OpenXR ele normalmente é reservado pelo runtime. O app mantém o
  estado virtual, mas um receptor pode não conseguir usá-lo.

## 6. Alternativas reais

1. **Modo jogo (implementado)** — para jogos no próprio celular: os controles virtuais viram um
   controle de jogo virtual (Shizuku).
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
4. **Shizuku (implementado)** — controle virtual HID visto por todos os apps; exige iniciar o
   Shizuku pela depuração sem fio a cada reinício.

## Versão HTML dentro de um app conversor (WebView)

Quando o `vr-box-to-joycon.html` é transformado em APK por um conversor de sites, a página roda
numa WebView e só enxerga o que a WebView repassa para o JavaScript:

| Situação | Por quê | Saída |
| --- | --- | --- |
| Não funciona em outros apps/jogos | Uma página só recebe entrada enquanto está na tela e não pode criar controles | App Android + Shizuku |
| Botões de volume (C/D em vários modos do VR Box 2.0) não chegam | O Android trata volume e algumas teclas de sistema antes da página | App Android (`Activity.dispatchKeyEvent` recebe todas) |
| Joystick no modo mouse para de responder | O cursor para na borda da tela e a WebView no Android não tem *pointer lock* | Modo Gamepad, ou app Android (`requestPointerCapture`) |
| Botões de gamepad fora do layout padrão | A API Gamepad do Chromium só expõe o layout padrão | App Android |

O app Android não usa acessibilidade; a instalação está em [INSTALLATION.md](INSTALLATION.md).

## Conclusão

Não é possível disponibilizar controles Quest Touch virtuais para outros jogos **sem** um
runtime, driver ou integração privilegiada. O app entrega: leitura real do VR Box, identificação
automática de comandos, mapeamento completo, dois controles virtuais com joysticks, gatilhos e grip
analógicos, testador em tempo real, perfis, o Modo jogo (um controle de jogo virtual que os jogos
do celular enxergam) e uma integração de rede documentada (VRBQ). Nenhuma tela afirma que um controle Quest foi
registrado no sistema.
