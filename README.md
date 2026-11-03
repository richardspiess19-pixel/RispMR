# VR BOX TO META QUEST EMULATOR

Aplicativo **Android** que lê um controle Bluetooth **VR Box** e converte seus comandos em dois
controles virtuais no estilo **Meta Quest Touch** (esquerdo e direito), com mapeamento
personalizável, joysticks virtuais, gatilhos/grip analógicos, testador em tempo real, perfis e um
protocolo de integração documentado para aplicações VR compatíveis.

Interface em HTML5/CSS3/JavaScript/SVG dentro de uma WebView; lógica nativa em Kotlin.

> **Importante — leia [`docs/LIMITATIONS.md`](docs/LIMITATIONS.md).** Um app Android comum
> **não consegue** registrar controles Quest Touch virtuais para todos os jogos: no OpenXR só o
> runtime cria controles. O app entrega os controles virtuais por meio do protocolo **VRBQ**
> (UDP) para apps que o implementem, e nunca afirma ter emulado um dispositivo no sistema.

## O que está implementado

| Recurso | Status |
| --- | --- |
| Detecção do VR Box (como o Android o apresenta: mouse / teclado / gamepad), VID/PID, eixos, desconexão e reconexão | Implementado |
| Bluetooth: estado do adaptador, permissões por versão, dispositivos pareados, classe Bluetooth, link ACL | Implementado |
| Leitura de teclas, botões de gamepad, D-pad, volume/mídia, botões e movimento do mouse (pointer capture), roda, eixos de joystick | Implementado |
| Automatic Input Detection (evento, código, PRESSED/RELEASED, atribuição) | Implementado |
| Controller Mapping (criar/alterar/remover, LEARN, testar ao vivo, salvar, restaurar padrão) | Implementado |
| Dois controles virtuais independentes (joystick, click, X/Y/A/B, Menu/System, trigger e grip 0–1) | Implementado |
| Joystick virtual: modos Relative Mouse e Virtual Stick, sensibilidade, deadzone, curva, suavização, retorno, inversão, limite por eixo | Implementado |
| Virtual Controllers (SVG ao vivo) e Controller Tester (eventos, eixos, Hz, latência) | Implementado |
| Perfis: criar, renomear, duplicar, excluir, exportar, importar, restaurar; 4 perfis iniciais | Implementado |
| Saída VRBQ por UDP (JSON ou binário) + decodificadores de referência C e Python | Implementado |
| DEMO MODE (entrada simulada, claramente identificada) | Implementado |
| Camada OpenXR / telefone como gamepad Bluetooth | Não disponível ainda (projetos em `integration/`) |
| Registrar controles Touch no runtime de outros apps, injeção global de entrada | Impossível sem privilégios (ver LIMITATIONS) |

## Estrutura

```
frontend/      Interface (index.html, styles/, scripts/, assets/, icons/)
android/       Projeto Gradle (Kotlin): app/src/main/java/com/rispmr/vrboxemulator/
config/        default-profile.json, controller-profiles.json
integration/   OpenXRResearch/, RuntimeIntegration/, InputProtocol/ (spec, C, Python, fixtures)
docs/          INSTALLATION, ARCHITECTURE, COMPATIBILITY, LIMITATIONS, TESTING
tests/         Testes da interface (node:test, Playwright)
```

## Começo rápido

```bash
cd android && ./gradlew assembleDebug     # APK: android/app/build/outputs/apk/debug/app-debug.apk
./gradlew testDebugUnitTest               # testes Kotlin
cd .. && npm test                         # testes JS
```

Detalhes: [INSTALLATION](docs/INSTALLATION.md) · [ARCHITECTURE](docs/ARCHITECTURE.md) ·
[COMPATIBILITY](docs/COMPATIBILITY.md) · [TESTING](docs/TESTING.md) ·
[Protocolo VRBQ](integration/InputProtocol/PROTOCOL.md)

## Etapas

| Etapa | Situação |
| --- | --- |
| 1 Interface | Concluída |
| 2 App Android (WebView + ponte JS) | Concluída |
| 3 Bluetooth / leitura de comandos | Concluída (validar com hardware real: roteiro em TESTING) |
| 4 Mapeamento | Concluída |
| 5 Joystick | Concluída |
| 6 Controles virtuais | Concluída |
| 7 Integração VR | Protocolo VRBQ concluído; OpenXR documentado como não disponível |
| 8 Testes | Automatizados concluídos; testes com VR Box real pendentes |
| 9 APK | Debug e release (assinatura via `keystore.properties`) |

## Identidade visual

O logo (`frontend/assets/logo.svg`, ícone Android em `res/drawable/ic_launcher_foreground.xml`)
foi criado para o projeto. Para usar outro logo, substitua esses arquivos mantendo os nomes.
Fonte Chakra Petch (SIL OFL 1.1, `frontend/assets/fonts/OFL.txt`).
