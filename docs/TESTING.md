# Testes

## Automatizados

| Comando | Cobre |
| --- | --- |
| `cd android && ./gradlew testDebugUnitTest` | 75 testes JVM/Robolectric: mapeamento, conversão de eixos, joystick virtual (2 modos, deadzone, curva, suavização, retorno, inversão, limite), estados dos botões e gatilhos, processador de entrada (detecção, hysteresis, pulsos, soltura geral), perfis (CRUD, importação/exportação, arquivo corrompido, restauração), configuração padrão (`config/*.json`), registro de dispositivos (agrupamento, desconexão/reconexão), leitura HID (`KeyEvent`/`MotionEvent` → eventos), ponte Kotlin (`CommandRouter`), protocolo VRBQ (fixtures) e `UdpStreamer` com socket UDP real. |
| `node --test tests/frontend/*.test.mjs` | Lado JS da ponte (ids, erros, timeout, pushes, fallback), formatação/indicadores, store. |
| `node tests/frontend/ui-smoke.mjs` | Playwright: todas as telas em celular, tablet e modo preview; falha em erro de console ou rolagem horizontal; testa START EMULATION, detecção e seletor de alvo. |
| `python3 -m unittest discover -s integration/InputProtocol/receiver` | Receptor Python lendo as fixtures binária e JSON. |
| `cc -std=c99 -Wall -Wextra -Werror integration/InputProtocol/c/test_vrbq.c -o /tmp/t && /tmp/t integration/InputProtocol/fixtures/sample-v1.bin` | Decodificador C. |
| `cd android && ./gradlew lintDebug` | Android Lint (sem erros). |

O CI (`.github/workflows/android.yml`) executa tudo isso e publica o APK de debug.

## DEMO MODE

Device Manager → **Start demo mode**. Gera entradas **simuladas** (círculo do mouse e
sequência de botões) pelo mesmo pipeline. Faixa roxa "DEMO MODE" em todas as telas; pacotes VRBQ
levam a flag `demo`. Nunca é apresentado como dispositivo Bluetooth.

## Roteiro com VR Box real

Não executado neste ambiente (sem hardware). Registre os resultados por modelo/modo:

1. **Detecção** — parear; o Device Manager mostra o nome, papéis (Mouse/Keys/Gamepad), VID:PID.
2. **Desconexão** — desligar o VR Box: log "Input device disconnected", Controller "Not
   detected", botões virtuais soltos. **Reconexão** — ligar: "reconnected" e seleção automática.
3. **Identificação** — Detect: cada botão gera PRESSED e RELEASED com o código correto; joystick
   em modo mouse gera "Mouse Movement X/Y"; em modo gamepad gera direções de eixo.
4. **Mapeamento** — LEARN em `RIGHT · A`, pressionar botão; Virtual Controllers acende A.
5. **Joystick** — modo mouse: Virtual Stick volta ao centro ao soltar; Relative Mouse
   proporcional à velocidade; deadzone/curva/inversão visíveis no preview.
6. **Gatilhos** — botão digital → trigger 1.00; eixo analógico → valor intermediário.
7. **Tester** — Events/s, taxa do mouse (Hz) e latência média/máxima exibidas.
8. **Perfis** — criar, renomear, duplicar, exportar, importar, excluir; reiniciar o app e
   verificar persistência.
9. **Saída** — `python3 integration/InputProtocol/receiver/vrbq_receiver.py` no PC, host = IP do
   PC, START EMULATION: estados aparecem no terminal.
10. **Foco** — trocar de app com botão pressionado: estados voltam a RELEASED.
