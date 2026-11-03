# Pesquisa: OpenXR e entrada no Android

## Como a entrada funciona no OpenXR

- A aplicação cria **ações** (`xrCreateAction`) e sugere **bindings** para perfis de interação,
  p.ex. `/interaction_profiles/oculus/touch_controller`
  (Quest Touch), `/interaction_profiles/meta/touch_controller_plus` (`XR_META_touch_controller_plus`)
  ou `/interaction_profiles/facebook/touch_controller_pro` (`XR_FB_touch_controller_pro`).
- O **runtime** decide qual dispositivo físico alimenta cada ação e produz os estados
  (`xrGetActionStateBoolean/Float/Vector2f`) e as poses.
- Portanto **somente o runtime** cria "controles". Não há API para um processo externo registrar
  controles em outro runtime.

## Runtime no Android

- O loader OpenXR para Android localiza o runtime ativo por um *runtime broker*
  (pacotes `org.khronos.openxr.runtime_broker` / `org.khronos.openxr.system_runtime_broker`) ou por
  configuração do sistema. No Quest o runtime é parte do Meta Horizon OS; em dispositivos Android
  XR é parte do sistema.
- Telefones comuns não têm runtime OpenXR que aceite controles externos. O app apenas **detecta**
  (informativo) se um broker está instalado.
- **Monado** (código aberto) pode rodar no Android como runtime instalável, mas ser o runtime
  implica fornecer headset, rastreamento e compositor — fora do escopo deste projeto (sem headset,
  sem rastreamento).

## Camadas de API (API layers)

- Uma camada intercepta chamadas OpenXR dentro do processo da aplicação e pode, por exemplo,
  substituir `xrGetActionState*` para ações ligadas ao perfil Touch por valores do VRBQ.
- No Android, camadas normalmente precisam estar **empacotadas com a aplicação** (ou com o
  runtime). Isso exige um jogo que você possa reempacotar/modificar; não funciona para jogos
  instalados de terceiros sem modificação. Carregamento de camadas externas depende da versão do
  loader/runtime e não é garantido.
- Mesmo com a camada, jogos que exigem **pose** dos controles não terão rastreamento.

## Outras APIs avaliadas

| API | Conclusão |
| --- | --- |
| `InputManager.injectInputEvent` | `@hide` + `INJECT_EVENTS` (assinatura). Impossível para apps comuns. |
| `uinput` | Root. Impossível. |
| `AccessibilityService` | Só gestos de toque / ações globais. Não serve. |
| `BluetoothHidDevice` (API 28) | Telefone como periférico HID para outro host. Viável como **gamepad genérico**; não Touch. |
| `UsbManager` (USB host) | Lê HID bruto de dispositivos **USB**; o VR Box é Bluetooth. |
| Shizuku (privilégio de shell) | Injeção de eventos Android no app em primeiro plano; exige configuração do usuário; não OpenXR. |
| WebXR | Gamepads vêm do runtime XR do navegador; sem injeção. |

## Decisão

Implementar o **protocolo VRBQ** (real, testado, documentado) como ponto de integração e
documentar os caminhos que exigem cooperação do jogo ou do runtime
(`../RuntimeIntegration/README.md`). Nenhuma interface do app se apresenta como driver OpenXR.
