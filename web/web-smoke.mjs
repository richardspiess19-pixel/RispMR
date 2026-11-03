// End-to-end test of dist/vr-box-to-quest.html opened as a local file in Chromium:
// a fake gamepad and the keyboard drive detection, mapping and the virtual controllers.
//   node web/web-smoke.mjs [screenshotDir]
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(here, '../dist/vr-box-to-quest.html');
const shots = process.argv[2];
if (shots) fs.mkdirSync(shots, { recursive: true });
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));

// Fake "VR BOX" gamepad (standard mapping), controlled from the test.
await page.addInitScript(() => {
  const pad = { id: 'VR BOX (STANDARD GAMEPAD Vendor: 05ac Product: 022c)', index: 0, mapping: 'standard', connected: true, timestamp: 0, axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) };
  window.__pad = pad;
  navigator.getGamepads = () => [pad];
  window.__press = (i, on) => {
    pad.buttons[i] = { pressed: on, value: on ? 1 : 0 };
    pad.timestamp = performance.now();
  };
});

const go = async (route) => {
  await page.evaluate((r) => (location.hash = `#/${r}`), route);
  await page.waitForTimeout(250);
};

await page.goto(pathToFileURL(file).href + '#/dashboard');
await page.waitForSelector('.status-row');
if (shots) await page.screenshot({ path: path.join(shots, 'web-dashboard.png'), fullPage: true });

// Connect picks the gamepad.
await page.locator('.hero__actions .btn').first().click();
await page.waitForTimeout(250);
const ctrl = await page.locator('.status-row', { hasText: 'Controle' }).first().innerText();
if (!ctrl.includes('Detectado')) errors.push(`controller not detected: ${ctrl}`);

// Detection: press A on the fake gamepad.
await go('detect');
await page.evaluate(() => window.__press(0, true));
await page.waitForTimeout(150);
const detected = await page.locator('.detected__event').innerText().catch(() => '');
if (detected !== 'Botão A (gamepad)') errors.push(`detection shows "${detected}"`);
if (shots) await page.screenshot({ path: path.join(shots, 'web-detect.png'), fullPage: true });

// Default profile maps BUTTON_A -> Direito · A: the virtual controller must light up.
await go('controllers');
await page.waitForTimeout(100);
const aState = await page.locator('.vc--right .qc-row', { hasText: /^A/ }).locator('.state').innerText();
if (aState !== 'Pressionado') errors.push(`virtual A shows "${aState}"`);
await page.evaluate(() => window.__press(0, false));
await page.waitForTimeout(150);
if ((await page.locator('.vc--right .qc-row', { hasText: /^A/ }).locator('.state').innerText()) !== 'Solto') errors.push('virtual A did not release');

// Profiles persist in localStorage: save after a change and reload.
await go('mapping');
await page.locator('.map-row', { hasText: 'Menu' }).locator('.pill button').first().click().catch(() => {});
await page.getByRole('button', { name: 'Salvar' }).first().click();
await page.waitForTimeout(150);
await page.reload();
await page.waitForSelector('#view > *');
const savedOk = await page.evaluate(() => JSON.parse(localStorage.getItem('vrbq.profiles') || 'null')?.profiles?.length === 4);
if (!savedOk) errors.push('profiles were not saved in localStorage');

// Keyboard / mouse device and the game screen notice.
await go('devices');
await page.locator('.list__item', { hasText: 'Teclado e mouse' }).getByRole('button', { name: 'Usar' }).click();
await go('detect');
await page.keyboard.down('ArrowUp');
await page.waitForTimeout(100);
const key = await page.locator('.detected__event').innerText().catch(() => '');
if (key !== 'D-pad cima') errors.push(`keyboard detection shows "${key}"`);
await page.keyboard.up('ArrowUp');
await go('game');
if (!(await page.getByText('Só no app Android.').count())) errors.push('game screen does not explain the web limit');
if (shots) await page.screenshot({ path: path.join(shots, 'web-game.png'), fullPage: true });

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Web version OK — gamepad + keyboard detection, mapping, virtual controllers, persistence');
