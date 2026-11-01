// Teste de fumaça de ponta a ponta: abre o app num Chromium sem tela com uma câmera falsa
// (fotos de mãos de verdade em vídeo), entra no modo escolhido e mede o rastreio de mãos.
//
//   tools/test/fetch-assets.sh && python3 tools/test/make_video.py   (uma vez)
//   npm run build && node tools/test/smoke.mjs [--vr] [--secs=16] [--file=RISP_MR_X.html]
//   --video=hands_hard   vídeo difícil (make_video.py --hard)
//   --set=quality:baixo,mpDet:0.4   ajustes salvos antes de abrir o app
//
// Saída: tools/test/out/*.png e um resumo JSON no terminal. Sai com código 1 se algo crítico falhar.
import { createServer } from "node:http";
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../..");
const cache = join(here, ".cache");
const outDir = join(here, "out");
mkdirSync(outDir, { recursive: true });

const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || "").split("=")[1] || d;
const VR = process.argv.includes("--vr");
const SECS = +arg("secs", 16);
const FILE = arg("file", "RISP_MR_X.html");
const PREF = arg("pref", ""); // auto | cpu | gpu: força o processador do rastreio
const VID = arg("video", "hands");
const video = join(cache, VID + ".mjpeg");
if (!existsSync(video)) throw new Error("rode antes: tools/test/fetch-assets.sh && python3 tools/test/make_video.py [--hard]");
const meta = JSON.parse(readFileSync(join(cache, VID + ".json"), "utf8"));
const SET = Object.fromEntries(
  arg("set", "")
    .split(",")
    .filter(Boolean)
    .map((kv) => kv.split(":"))
    .map(([k, v]) => [k, isNaN(v) ? v : +v]),
);

const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".wasm": "application/wasm" };
const server = createServer((req, res) => {
  try {
    const p = join(root, decodeURIComponent(req.url.split("?")[0]));
    const body = readFileSync(p);
    res.writeHead(200, { "content-type": types[extname(p)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/${FILE}`;

const browser = await chromium.launch({
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    `--use-file-for-fake-video-capture=${video}`,
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
    "--autoplay-policy=no-user-gesture-required",
  ],
});
const ctx = await browser.newContext({ viewport: { width: 960, height: 432 }, deviceScaleFactor: 1 });
// A CDN do MediaPipe é servida do cache local: o teste não depende da internet.
await ctx.route(/tasks-vision@[^/]+\/wasm\/(vision_wasm_\w+\.(js|wasm))$/, (route, req) => {
  const f = join(cache, "wasm", req.url().split("/").pop());
  route.fulfill({ status: 200, body: readFileSync(f), headers: { "content-type": types[extname(f)], "access-control-allow-origin": "*" } });
});
await ctx.route(/hand_landmarker\.task$/, (route) =>
  route.fulfill({ status: 200, body: readFileSync(join(cache, "hand_landmarker.task")), headers: { "access-control-allow-origin": "*" } }),
);

if (PREF) SET.trackDev = PREF;
if (Object.keys(SET).length) await ctx.addInitScript((s) => localStorage.setItem("rispx", JSON.stringify({ v: 2, ...s })), SET);
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
const fail = [];

await page.goto(url);
await page.waitForTimeout(800);
await page.screenshot({ path: join(outDir, "menu.png") });

await page.click(VR ? "#goVR" : "#goFlat");
const t0 = Date.now();
// o modelo já vem pré-carregado do menu: espera também a cena do VR/tela montar
await page.waitForFunction(() => window.__risp && __risp.R.run && __risp.shell.orb && ["on", "fail"].includes(__risp.engine.state), null, { timeout: 180000 });
const engine = await page.evaluate(() => ({ state: __risp.engine.state, delegate: __risp.engine.delegate }));
engine.loadSec = (Date.now() - t0) / 1000;
if (engine.state !== "on") fail.push("motor de mãos não carregou");

// Amostra o estado das mãos 10x por segundo.
const samples = [];
const tEnd = Date.now() + SECS * 1000;
let shot = 0;
while (Date.now() < tEnd) {
  samples.push(
    await page.evaluate(() => {
      const R = __risp, v = R.R.video;
      return {
        vt: v.currentTime,
        hz: R.tracker.hz,
        ms: R.engine.ms,
        fps: R.R.fps,
        // estilo esqueleto: nada além de ossos/juntas/pontas presos à mão (sem 🏠, palma ou anel)
        extra: R.S.handStyle === "skel" ? (R.shell.orb.visible ? 1 : 0) + R.R.handview.skg.children.filter((o) => o.visible && !o.isInstancedMesh).length : 0,
        hands: R.tracker.slots.map((s) => ({
          live: s.live, lite: s.lite, side: s.side, pinch: s.pinch, open: s.open, fist: s.fist,
          tip: [s.x(8), s.y(8)], palm: s.palm, pr: s.pinchR,
        })),
      };
    }),
  );
  if (samples.length % 30 === 15 && shot < 5) await page.screenshot({ path: join(outDir, `${VR ? "vr" : "flat"}-${shot++}.png`) });
  await page.waitForTimeout(100);
}

// Cena do vídeo em cada amostra (o vídeo roda em loop; veja make_video.py).
const loop = meta.scenes.reduce((a, c) => a + c.frames, 0) / meta.fps;
const sceneAt = (vt) => {
  let t = (vt % loop) * meta.fps;
  for (const c of meta.scenes) if ((t -= c.frames) < 0) return c.name;
  return meta.scenes.at(-1).name;
};
const per = {};
for (const s of samples.filter((s) => s.vt > 2.5)) { // ignora a câmera ligando
  const k = sceneAt(s.vt);
  const p = (per[k] ||= { n: 0, any: 0, two: 0, pinch: 0 });
  const live = s.hands.filter((h) => h.live && !h.lite);
  p.n++;
  p.any += live.length > 0;
  p.two += live.length > 1;
  p.pinch += live.some((h) => h.pinch);
}
for (const k in per) {
  const p = per[k];
  per[k] = { amostras: p.n, comMao: +(p.any / p.n).toFixed(2), duasMaos: +(p.two / p.n).toFixed(2), pinca: +(p.pinch / p.n).toFixed(2) };
}
const last = samples.at(-1) || {};
engine.final = await page.evaluate(() => __risp.engine.delegate + " · " + __risp.engine.why);

// --items: abre cada instrumento/app/jogo por um instante e confere que nada quebra.
let items = null;
if (process.argv.includes("--items")) {
  const ids = await page.evaluate(() => __items());
  items = { total: ids.length, erros: [] };
  for (const id of ids) {
    const before = logs.length;
    await page.evaluate((id) => __risp.shell.launch(id), id);
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      const S = __risp.shell;
      S.closeXp();
      S.panels.filter((p) => p.it && !p.closing).forEach((p) => S.closePanel(p));
    });
    await page.waitForTimeout(250);
    const bad = logs.slice(before).filter((l) => l.startsWith("[pageerror]"));
    if (bad.length) items.erros.push(`${id}: ${bad[0]}`);
  }
  if (items.erros.length) fail.push("itens com erro: " + items.erros.join(" | "));
}
// VR: o esqueleto tem que cair em cima da mão do vídeo nos DOIS olhos. O vídeo da câmera é o mesmo
// nos dois olhos (fica a 60 m), então a diferença de posição do esqueleto entre os olhos tem que ser ~0.
let disparidade = null;
if (VR) {
  await page.waitForFunction(() => __risp.tracker.slots.some((s) => s.live && !s.lite), null, { timeout: 20000 }).catch(() => {});
  disparidade = await page.evaluate(() => {
    const R = __risp.R, H = R.handview, cam = R.cam, k = R.tracker.slots.findIndex((s) => s.live && !s.lite);
    if (k < 0 || !H.sk) return null;
    const J = H.sk[k].joints, M = J.matrixWorld.clone(), I = M.clone(), p = cam.position.clone(), q = cam.quaternion.clone();
    J.updateMatrixWorld(true);
    J.getMatrixAt(8, I);
    const P = p.clone().setFromMatrixPosition(M.copy(J.matrixWorld).multiply(I));
    const c = R.S ? __risp.S.depth * 0.003 : 0.027, eyeW = R.view.eyeW, x = [];
    for (const l of [0, 1]) {
      cam.position.set(l ? c : -c, 0, 0).applyQuaternion(__risp.head.q);
      cam.quaternion.copy(__risp.head.q);
      cam.updateMatrixWorld(true);
      x.push((P.clone().project(cam).x * eyeW) / 2);
    }
    cam.position.copy(p), cam.quaternion.copy(q), cam.updateMatrixWorld(true);
    return +(x[0] - x[1]).toFixed(1);
  });
  if (disparidade === null) fail.push("VR: nenhuma mão para medir o esqueleto");
  else if (Math.abs(disparidade) > 3) fail.push(`VR: esqueleto fora da mão (${disparidade} px de diferença entre os olhos)`);
}
const tier = await page.evaluate(() => ({ nivel: __risp.pipe.tier, trackW: __risp.S.trackW, trackRes: __risp.S.trackRes }));
const summary = { modo: VR ? "vr" : "flat", video: VID, ...tier, disparidade, engine, items, leiturasPorSeg: Math.round(last.hz || 0), msModelo: Math.round(last.ms || 0), fps: Math.round(last.fps || 0), cenas: per };
const withHand = samples.filter((s) => s.vt > 2.5 && sceneAt(s.vt) !== "sem mão");
const anyRate = withHand.filter((s) => s.hands.some((h) => h.live && !h.lite)).length / Math.max(1, withHand.length);
summary.comMaoGeral = +anyRate.toFixed(2);
if (anyRate < (VID === "hands" ? 0.5 : 0.3)) fail.push(`mão detectada em só ${(anyRate * 100).toFixed(0)}% das amostras`);
// Nenhuma das fotos é uma pinça: qualquer pinça aqui é falso positivo.
const pinchRate = samples.filter((s) => s.hands.some((h) => h.live && h.pinch)).length / Math.max(1, samples.length);
if (pinchRate > 0.05) fail.push(`pinça falsa em ${(pinchRate * 100).toFixed(0)}% das amostras`);
const extras = samples.filter((s) => s.extra).length;
if (extras) fail.push(`estilo esqueleto mostrou enfeites na mão em ${extras} amostras`);
// O MediaPipe escreve avisos informativos ("INFO: ...") como console.error: não contam como erro.
const errs = logs.filter((l) => l.startsWith("[pageerror]") || (l.startsWith("[error]") && !/^\[error\] (INFO|I\d{4}|W\d{4})/.test(l)));
if (errs.length) fail.push("erros no console: " + errs.slice(0, 5).join(" | "));

console.log(JSON.stringify(summary, null, 2));
if (arg("dump", "")) (await import("node:fs")).writeFileSync(arg("dump", ""), JSON.stringify(samples));
if (process.argv.includes("--logs")) console.log(logs.join("\n"));
await browser.close();
server.close();
if (fail.length) {
  console.error("FALHOU:\n- " + fail.join("\n- "));
  process.exit(1);
}
console.log("OK");
