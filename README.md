# RISP MR X

Realidade mista no celular, controlada pelas mãos: o celular vai num óculos VR (tipo VR Box / Cardboard),
a câmera traseira mostra o ambiente e o rastreio de mãos (MediaPipe) vira o seu controle.
12 instrumentos, 18 apps e 10 jogos.

## Como usar

Abra **`RISP_MR_X.html`** no navegador do celular (Chrome no Android funciona melhor).

- A câmera só funciona em página segura: abra por `https://` (por exemplo, publicando o repositório no
  GitHub Pages) ou por `localhost`.
- Na primeira vez o app baixa o rastreio de mãos (~22 MB). Depois fica guardado e funciona sem internet.
  O download começa já no menu; o selo no canto mostra quando está **pronto**.
- **Entrar no VR**: coloque o celular no óculos. Levante a mão na frente da câmera: o **esqueleto azul**
  aparece em cima dela quando ela é reconhecida. Aponte com o indicador e **pince** (polegar no indicador)
  para clicar. Palma aberta virada para você + pinça = Início.

## O que mudou nesta versão

**Rastreio de mãos**
- Punho fechado não clica mais sozinho: a pinça agora é medida em 3D (pontos de mundo do MediaPipe, em
  metros) e exige o indicador fora da palma. A medida antiga, em 2D, confundia punho com pinça.
- Processador automático: o rastreio começa na CPU (não disputa a GPU com o desenho do VR). Se a CPU for
  lenta, testa a GPU nos mesmos quadros e só troca se ela for mais rápida **e** achar as mesmas mãos
  (em várias GPUs de celular o MediaPipe roda mas erra). Dá para forçar CPU ou GPU em Ajustes → Mãos.
- Câmera a 30 qps no formato 4:3 (mais luz por quadro, menos ruído) e foco/exposição contínuos.
- Imagem enviada ao modelo com redimensionamento de melhor qualidade; confiança mínima 0,5.
- Mão não some por uma leitura perdida (espera ~2,5 leituras; mais em celular lento).
- O modelo é preparado já no menu: ao entrar, as mãos estão prontas.
- Dicas automáticas: "pouca luz" e "levante as mãos na frente da câmera".

**Visual**
- Mãos em **esqueleto** (novo padrão): 21 juntas e ossos de luz, palma translúcida e um anel entre polegar e
  indicador que fecha conforme você pinça e pisca quando o clique vale. "Mão real", "Holograma" e
  "Invisível" continuam em Ajustes.
- **Dock** mais alto (antes ficava a ~88% da altura da tela; ao apontar para ele a palma saía do quadro da
  câmera e o rastreio perdia a mão), inclinado para o rosto, barra de vidro, grupos separados, ícone em
  foco cresce sem empurrar os vizinhos, pontinho nos apps abertos.
- **Menu principal** novo: arte em destaque, cartões de vidro, selo do rastreio, passo a passo no modo
  retrato.
- **Início** com hora, bateria e quantas mãos estão sendo vistas.

## Desenvolvimento

O app é um único HTML gerado a partir de `src/`:

```
src/index.html        CSS + HTML do menu e dos ajustes
src/assets/           arte do menu
src/js/00-runtime.js  abre o IIFE + vision_bundle do MediaPipe (texto)
src/js/01-settings.js ajustes padrão (q) e migração
src/js/10-three.js    Three.js (minificado na origem)
src/js/20-core.js     utilidades, cabeça, renderização, cenários, efeitos
src/js/30-hands.js    rastreio: modelo da mão, pinça, esqueleto, entrada, motor MediaPipe (worker)
src/js/40-audio.js    síntese de som
src/js/50-ui-shell.js janelas, dock, cursor
src/js/60-items.js    instrumentos, apps e jogos
src/js/90-boot.js     câmera, laço principal, menu e ajustes
```

Os nomes curtos (`U`, `q`, `Ke`, `_i`…) vêm do bundle original; os comentários explicam as partes novas.

```bash
npm install
npm run build                 # gera RISP_MR_X.html
node tools/build.mjs --dev x.html   # sem minificar, para depurar
```

### Testes

Rodam num Chromium sem tela (Playwright) com uma câmera falsa feita de fotos de mãos de teste do MediaPipe:

```bash
tools/test/fetch-assets.sh          # uma vez: fotos, modelo e wasm em tools/test/.cache
python3 tools/test/make_video.py    # uma vez: vídeo MJPEG da câmera falsa
node tools/test/pinch.mjs           # pinça com pontos reais do MediaPipe (punho/joinha/relaxada não clicam)
node tools/test/smoke.mjs --items   # abre o app, mede o rastreio por cena e abre os 41 itens
node tools/test/smoke.mjs --vr      # mesmo teste no modo VR
```
