// UI smoke test: loads every screen in Chromium (phone viewport) with the TEST-ONLY mock
// bridge, fails on any console/page error and saves screenshots.
//
//   node tests/frontend/ui-smoke.mjs [screenshotDir]
//
// Requires Playwright (preinstalled in CI images or `npm i -D playwright`).

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../frontend');
const outDir = process.argv[2] || path.join(here, 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = path.join(root, decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const ROUTES = ['dashboard', 'devices', 'setup', 'detect', 'mapping', 'game', 'controllers', 'tester', 'profiles', 'settings', 'integration'];
const errors = [];
const browser = await chromium.launch();

async function run(label, { mock, width, height }) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${label}] console: ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e.message}`));
  if (mock) await page.addInitScript({ path: path.join(here, 'mock-native.js') });
  await page.goto(`${base}/index.html#/dashboard`);
  await page.waitForSelector('.status-row');
  if (mock) {
    // The Android app opens locked: it needs Shizuku's permission first.
    await page.waitForTimeout(200);
    if (!(await page.locator('.gate').isVisible())) errors.push(`[${label}] app is not locked without Shizuku`);
    await page.screenshot({ path: path.join(outDir, `${label}-shizuku.png`) });
    await page.locator('.gate').getByRole('button', { name: 'Permitir' }).click();
    await page.waitForTimeout(200);
    if (!(await page.evaluate(() => window.__mockCalls)).includes('gamepad.permission')) errors.push(`[${label}] Permitir did not ask Shizuku`);
    if (await page.locator('.gate').isVisible()) errors.push(`[${label}] app still locked after the permission`);
  } else if (await page.locator('.gate').isVisible()) {
    errors.push(`[${label}] browser preview must not be locked`);
  }
  for (const r of ROUTES) {
    await page.evaluate((id) => {
      location.hash = `#/${id}`;
    }, r);
    await page.waitForTimeout(350);
    const hasContent = await page.$eval('#view', (v) => v.children.length > 0);
    if (!hasContent) errors.push(`[${label}] ${r}: empty view`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) errors.push(`[${label}] ${r}: horizontal overflow ${overflow}px`);
    await page.screenshot({ path: path.join(outDir, `${label}-${r}.png`), fullPage: true });
  }
  if (mock) {
    // Interactions: start emulation from the dashboard and open the target picker.
    await page.evaluate(() => (location.hash = '#/dashboard'));
    await page.waitForTimeout(200);
    await page.locator('.hero__actions').getByRole('button', { name: 'Iniciar emulação' }).click();
    await page.waitForTimeout(200);
    const calls = await page.evaluate(() => window.__mockCalls);
    if (!calls.includes('emulation.start')) errors.push(`[${label}] Iniciar emulação did not call the bridge`);
    // Modo jogo: with emulation on, the virtual gamepad is connected.
    await page.evaluate(() => (location.hash = '#/game'));
    await page.waitForTimeout(300);
    if (!(await page.getByText('Os jogos estão vendo um controle').count())) errors.push(`[${label}] virtual gamepad not shown as connected`);
    // Self-test: what the game receives, live.
    await page.getByRole('button', { name: 'Testar agora' }).click();
    await page.waitForTimeout(250);
    if (!(await page.getByText('Botões: A').count())) errors.push(`[${label}] virtual gamepad test does not show the buttons`);
    await page.screenshot({ path: path.join(outDir, `${label}-game-test.png`), fullPage: true });
    await page.getByRole('button', { name: 'Parar teste' }).click();
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(outDir, `${label}-game-gamepad.png`), fullPage: true });
    await page.evaluate(() => (location.hash = '#/detect'));
    await page.waitForTimeout(200);
    const calls2 = await page.evaluate(() => window.__mockCalls);
    if (!calls2.includes('detect.start')) errors.push(`[${label}] detection did not start`);
    await page.evaluate(() => (location.hash = '#/mapping'));
    await page.waitForTimeout(200);
    await page.locator('.map-row__actions .btn--icon').first().click();
    await page.waitForSelector('.modal');
    await page.screenshot({ path: path.join(outDir, `${label}-picker.png`) });
  }
  await context.close();
}

try {
  await run('phone', { mock: true, width: 390, height: 844 });
  await run('tablet', { mock: true, width: 1280, height: 800 });
  await run('preview', { mock: false, width: 390, height: 844 });
} finally {
  await browser.close();
  server.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`UI smoke OK — ${ROUTES.length} screens x 3 configurations. Screenshots in ${outDir}`);
