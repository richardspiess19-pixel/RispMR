# Rastreio de mãos, esqueleto, dock e menu — design

Data: 2026-11-01 · Pedido: "deixe o hand tracking e este jogo decente; dock um pouco mais elevado; dock e
menu principal bonitos; o que mais importa é o hand tracking, que nem reconhece direito; quero o hand
tracking de esqueleto na mão".

## Diagnóstico (o que estava errado)

1. **Pinça em 2D**: distância polegar–indicador na imagem dividida pelo tamanho da palma na imagem. Com
   pontos reais do MediaPipe, um punho fechado dá 0,20 (limiar de pinça 0,30): fechar a mão clicava.
2. **GPU sempre primeiro**: o worker usava o delegado GPU sempre que ele inicializava. A GPU já está
   ocupada desenhando o VR em estéreo com bloom, e em várias GPUs de celular o MediaPipe roda mas erra.
   No Chromium de teste (GPU emulada) isso dava 1 leitura/s e mão em 48% das amostras.
3. **Dock baixo demais**: a ~88% da altura da tela. Para apontar para ele, a palma sai do quadro da câmera
   e o detector de palma perde a mão.
4. **Sem retorno visual**: o estilo padrão "mão real" redesenha o vídeo da câmera em cima da mão — no modo
   câmera a mão fica igual, então não dá para saber se ela está sendo rastreada.
5. Câmera pedida a 60 qps: menos luz por quadro e, em muitos celulares, formato 16:9 cortado nas laterais
   do VR; o rastreio roda a ~20–30 leituras/s, então os 60 qps não ajudavam a detectar.
6. Modelo (~22 MB) só começava a baixar ao entrar no VR.

## Objetivos / não-objetivos

- Objetivo: reconhecer as mãos de forma confiável no celular, sem cliques falsos, com retorno visual claro;
  dock alcançável com a mão inteira no quadro; dock e menu bonitos.
- Não-objetivo: trocar o modelo (continua MediaPipe Hand Landmarker 1.2.0) nem reescrever o app.
- Anti-objetivo: piorar a fluidez do VR ou quebrar instrumentos/jogos que dependem de `Ke.slots`
  (interface preservada: `pinch`, `ext`, `strike`, `x(i)`, `y(i)`…).

## Abordagens consideradas

| Tema | Opções | Escolha |
|---|---|---|
| Processador | GPU primeiro (antes) · só CPU · **auto: CPU primeiro, GPU só se for mais rápida e concordar** | auto, com opção manual CPU/GPU |
| Pinça | 2D com perspectiva (antes) · **3D com pontos de mundo + trava do indicador fora da palma** | 3D |
| Visual da mão | manter "mão real" · **esqueleto de luz (padrão)** | esqueleto; os outros estilos continuam |
| Dock | só subir · **subir + inclinar + vidro em shader + foco sem deslocar vizinhos** | completo |
| Código | editar o HTML minificado · **dividir o bundle em módulos legíveis + build com esbuild** | módulos |

## Decisões

- Pinça: `r = |polegar−indicador|₃D / |pulso−base do médio|₃D`, média móvel 0,6; entra < 0,28 com a ponta
  do indicador a > 0,5 palma da base do médio e mão não muito rápida; sai > 0,42. Medidos: apontando 0,86,
  joinha 0,77, relaxada 0,38, punho 0,37, pinça 0,09.
- Auto-processador: CPU; após 40 quadros, se a média ≤ 40 ms fica na CPU. Senão cria a GPU e roda as duas
  nos mesmos quadros; troca só com ≥ 6 quadros com mão, ≥ 80% de concordância (mesmo nº de mãos, erro
  médio < 3,5% da imagem) e GPU < 70% do tempo da CPU. Desiste cedo se a GPU for mais lenta; limite de 6 s.
- Perda de mão: espera `max(250 ms, 2,5 × intervalo entre leituras)` (até 700 ms).
- Dock: altura `min(−2·tv·0,48, −0,53)` (~74% da tela no VR); faixa de clique justa (−0,14…+0,15) para não
  roubar cliques da última fileira das janelas.
- Ajustes salvos ganham `v: 2`; quem tinha o antigo padrão "mão real" passa para "esqueleto".

## Verificação

`tools/test/`: vídeo falso com fotos de mãos de teste do MediaPipe. Resultado no Chromium sem tela
(CPU de servidor, GPU emulada): original 1 leitura/s e mão em 36–83% das cenas; novo 5–6 leituras/s e mão
em 100% das cenas depois de a câmera ligar; nenhuma pinça falsa; os 41 itens abrem sem erro.
O teste de pinça com pontos reais reprova o original (punho clica) e aprova o novo.

## Fica para depois

- Calibrar os limiares de pinça com gravações reais de usuários no óculos.
- Medir no aparelho do usuário qual processador o modo automático escolhe (Ajustes → Mãos mostra).
