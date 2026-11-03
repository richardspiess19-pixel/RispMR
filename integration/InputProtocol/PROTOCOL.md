# VRBQ — protocolo de entrada v1

Estado dos dois controles virtuais Quest Touch enviado pelo app durante a emulação.

- Transporte: **UDP**, um datagrama por estado. Porta padrão **47900**.
- Envio: imediatamente a cada mudança (máx. ~500/s) e repetido na taxa configurada
  (10–250 Hz, padrão 90) para que receptores tenham sempre estado recente.
- Ao parar a emulação é enviado um pacote neutro com `connected = false`.
- Dois formatos com o mesmo conteúdo: **JSON** (texto UTF-8) ou **binário** (60 bytes).
- Convenção: stick X positivo = direita, **Y positivo = cima**; gatilho/grip 0..1.

## JSON

```json
{"proto":"vrbq","v":1,"seq":42,"t":123456789,"demo":false,"connected":true,
 "left":{"stick":[0.5,-0.25],"click":false,"x":true,"y":false,"menu":true,"trigger":0,"grip":1},
 "right":{"stick":[-1,0.75],"click":true,"a":false,"b":true,"system":false,"trigger":0.5,"grip":0}}
```

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `proto`, `v` | string, int | `"vrbq"`, `1` |
| `seq` | int | Sequência crescente (descarte pacotes antigos) |
| `t` | int | Microssegundos, relógio monotônico do telefone |
| `demo` | bool | Entrada **simulada** (DEMO MODE) |
| `connected` | bool | Controle físico conectado |
| `left` / `right` | objeto | `stick` [x,y], `click`, botões (`x`,`y`,`menu` / `a`,`b`,`system`), `trigger`, `grip` |

Números com até 4 casas decimais, sempre com ponto (independente de idioma).

## Binário (little endian, 60 bytes)

| Offset | Tipo | Campo |
| --- | --- | --- |
| 0 | char[4] | `"VRBQ"` |
| 4 | u8 | versão = 1 |
| 5 | u8 | flags: bit0 demo, bit1 connected |
| 6 | u16 | reservado |
| 8 | u32 | seq |
| 12 | i64 | timestamp µs |
| 20 | hand | esquerda |
| 40 | hand | direita |

`hand` (20 bytes): `u16 botões` (bit0 stick click, bit1 X/A, bit2 Y/B, bit3 Menu/System),
`u16 reservado`, `f32 stick_x`, `f32 stick_y`, `f32 trigger`, `f32 grip`.

## Correspondência com OpenXR (`/interaction_profiles/oculus/touch_controller`)

| VRBQ | Caminho OpenXR (`/user/hand/left` ou `/right`) |
| --- | --- |
| `stick` | `/input/thumbstick/x`, `/input/thumbstick/y` |
| `click` | `/input/thumbstick/click` |
| `x`, `y` / `a`, `b` | `/input/x/click`, `/input/y/click` / `/input/a/click`, `/input/b/click` |
| `menu` (esq.) | `/input/menu/click` |
| `system` (dir.) | `/input/system/click` (normalmente reservado ao runtime) |
| `trigger` | `/input/trigger/value` |
| `grip` | `/input/squeeze/value` |

Sem pose (`grip/pose`, `aim/pose`): o VR Box não tem rastreamento.

## Referências

- `c/vrbq_protocol.h` — decodificador C99 header-only (`test_vrbq.c`).
- `receiver/vrbq_receiver.py` — receptor de linha de comando (JSON e binário).
- `fixtures/` — pacotes de referência gerados por `make_fixtures.py`; o teste Kotlin
  `VrbqProtocolTest` garante que o app produz exatamente esses bytes.
