// Teste da pinça com landmarks reais do MediaPipe (fixtures/landmarks.json, tirados das fotos de teste
// do MediaPipe) passados direto para o rastreador do app, sem câmera nem modelo.
//
//   npm run build && node tools/test/pinch.mjs
//
// Confere: punho fechado, joinha, mão relaxada e mão apontando NÃO viram pinça;
// uma pinça (polegar encostado no indicador) vira pinça e solta quando os dedos se afastam.
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../..");
const fx = JSON.parse(readFileSync(join(here, "fixtures/landmarks.json"), "utf8"));

const server = createServer((req, res) => {
  try {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(readFileSync(join(root, "RISP_MR_X.html")));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
await page.addInitScript(() => (window.__noTrack = true));
await page.goto(`http://127.0.0.1:${server.address().port}/RISP_MR_X.html`);

const res = await page.evaluate((fx) => {
  const K = __risp.tracker, slot = K.slots[0];
  let t = 1000;
  const frame = (h) => {
    const data = new Float32Array(126);
    for (let i = 0; i < 21; i++) data.set([...h.lm[i], ...h.wl[i]], i * 6);
    return { n: 1, data, sides: [h.side], scores: [1] };
  };
  // alimenta N quadros (33 ms) e devolve o estado da pinça no fim e se houve "clique"
  const feed = (h, n = 8) => {
    let down = 0;
    for (let i = 0; i < n; i++) {
      K.ingest(frame(h), (t += 33));
      slot.pinchDown && (down++, (slot.pinchDown = !1));
    }
    return { pinch: slot.pinch, down, r: +slot.pinchR.toFixed(2) };
  };
  const fresh = () => ((slot.live = !1), (K.slots[1].live = !1));
  // pinça sintética: a mão apontando com a ponta do polegar a ~1 cm da ponta do indicador
  const p = JSON.parse(JSON.stringify(fx.apontando));
  p.wl[4] = [p.wl[8][0] + 0.007, p.wl[8][1] + 0.005, p.wl[8][2] + 0.003];
  p.lm[4] = [p.lm[8][0] + 0.012, p.lm[8][1] + 0.008, p.lm[8][2]];
  const out = {};
  for (const k of ["apontando", "punho", "joinha", "relaxada"]) (fresh(), (out[k] = feed(fx[k], 12)));
  fresh();
  feed(fx.apontando);
  out.pinca = feed(p);
  out.solta = feed(fx.apontando);
  return out;
}, fx);

await browser.close();
server.close();
console.log(JSON.stringify(res));
const fail = [];
for (const k of ["apontando", "punho", "joinha", "relaxada"]) if (res[k].pinch || res[k].down) fail.push(`${k} virou pinça (r=${res[k].r})`);
if (!res.pinca.pinch || res.pinca.down !== 1) fail.push(`pinça não detectada (r=${res.pinca.r}, cliques=${res.pinca.down})`);
if (res.solta.pinch) fail.push("pinça não soltou");
if (fail.length) {
  console.error("FALHOU:\n- " + fail.join("\n- "));
  process.exit(1);
}
console.log("OK");
