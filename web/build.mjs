// Builds dist/vr-box-to-quest.html: the whole interface + the browser backend in ONE file
// (scripts, styles, fonts, logo and default profiles inlined). Open it in Chrome.
//
//   npm run build:web

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const fe = path.join(root, 'frontend');
const out = path.join(root, 'dist', 'vr-box-to-quest.html');

const read = (p) => fs.readFileSync(p, 'utf8');
const b64 = (p) => fs.readFileSync(p).toString('base64');

const js = await build({
  entryPoints: [path.join(here, 'entry.js')],
  bundle: true,
  format: 'iife',
  target: 'chrome90',
  minify: true,
  write: false,
  legalComments: 'none',
});
const script = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

let css = ['tokens.css', 'base.css', 'components.css', 'views.css'].map((f) => read(path.join(fe, 'styles', f))).join('\n');
css = css.replace(/url\("\.\.\/assets\/fonts\/([^"]+\.woff2)"\)/g, (_, f) => `url("data:font/woff2;base64,${b64(path.join(fe, 'assets', 'fonts', f))}")`);

const logo = `data:image/svg+xml;base64,${b64(path.join(fe, 'assets', 'logo.svg'))}`;
const defaults = {
  template: JSON.parse(read(path.join(root, 'config', 'default-profile.json'))),
  initial: JSON.parse(read(path.join(root, 'config', 'controller-profiles.json'))),
};

let html = read(path.join(fe, 'index.html'));
html = html.replace(
  /<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>/,
  () => `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'" />`,
);
html = html.replace(/\s*<link rel="icon"[^>]*>/, () => `\n    <link rel="icon" href="${logo}" type="image/svg+xml" />`);
html = html.replace(/\s*<link rel="stylesheet"[^>]*>/g, '');
html = html.replace('</head>', () => `    <style>\n${css}\n    </style>\n  </head>`);
html = html.replace('src="assets/logo.svg"', () => `src="${logo}"`);
html = html.replace(
  /<script type="module" src="scripts\/main.js"><\/script>/,
  // Replacer functions: the minified code contains `$&`-like sequences that replace() would expand.
  () => `<script>window.__VRBQ_DEFAULTS__=${JSON.stringify(defaults).replace(/</g, '\\u003c')};</script>\n    <script>${script}</script>`,
);

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`${path.relative(root, out)} — ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
