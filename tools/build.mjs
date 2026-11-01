// Monta o app em um único arquivo HTML (RISP_MR_X.html), pronto para abrir no celular.
//
//   npm run build            -> minifica (arquivo final)
//   npm run build -- --dev   -> sem minificar (mais fácil de depurar)
//
// Fontes:
//   src/index.html     CSS + HTML (marcadores __MENU_BG__ e __APP_JS__)
//   src/js/*.js        código do app em ordem alfabética, tudo dentro de um único IIFE
//                      (00-runtime.js abre o IIFE e 90-boot.js fecha)
//   src/assets/*.jpg   imagens embutidas como data URL
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dev = process.argv.includes("--dev");
const out = resolve(root, process.argv.find((a) => a.endsWith(".html")) || "RISP_MR_X.html");

const jsDir = join(root, "src/js");
const files = readdirSync(jsDir).filter((f) => f.endsWith(".js")).sort();
let js = files.map((f) => readFileSync(join(jsDir, f), "utf8")).join("\n");

if (!dev) {
  const r = await transform(js, { minify: true, charset: "utf8", legalComments: "none" });
  for (const w of r.warnings) console.warn("aviso:", w.text);
  js = r.code.trim();
}
// Um "</script" literal dentro do JS fecharia a tag antes da hora.
js = js.replace(/<\/script/gi, "<\\/script");

const bg = readFileSync(join(root, "src/assets/menu-bg.jpg")).toString("base64");
let html = readFileSync(join(root, "src/index.html"), "utf8");
html = html.replace("__MENU_BG__", () => "data:image/jpeg;base64," + bg).replace("__APP_JS__", () => js);
writeFileSync(out, html);
console.log(`ok: ${out} (${(html.length / 1024 / 1024).toFixed(2)} MB, ${files.length} módulos${dev ? ", dev" : ""})`);
