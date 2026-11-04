// End-to-end test of dist/vr-box-to-joycon.html opened as a local file in Chromium:
// a fake VR Box gamepad and the keyboard drive auto-detection, the guided setup,
// the virtual controllers and persistence.
//   node web/web-smoke.mjs [screenshotDir]
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(path.resolve(here, '../dist/vr-box-to-joycon.html')).href;
const shots = process.argv[2];
if (shots) fs.mkdirSync(shots, { recursive: true });
const errors = [];

const browser = await chromium.launch();

async function newPage() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  // Fake "VR BOX" gamepad (standard mapping), controlled from the test.
  await page.addInitScript(() => {
    const pad = { id: 'VR BOX (STANDARD GAMEPAD Vendor: 05ac Product: 022c)', index: 0, mapping: 'standard', connected: true, timestamp: 0, axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) };
    window.__pad = pad;
    window.__padOn = true;
    navigator.getGamepads = () => (window.__padOn ? [pad] : []);
    window.__set = (buttons, axes) => {
      pad.buttons = pad.buttons.map((_, i) => ({ pressed: buttons.includes(i), value: buttons.includes(i) ? 1 : 0 }));
      pad.axes = axes || [0, 0, 0, 0];
      pad.timestamp = performance.now();
    };
  });
  return page;
}

const shot = async (page, name) => shots && page.screenshot({ path: path.join(shots, `${name}.png`), fullPage: true });
const go = async (page, route) => {
  await page.evaluate((r) => (location.hash = `#/${r}`), route);
  await page.waitForTimeout(250);
};
const tap = async (page, buttons, axes) => {
  await page.evaluate(([b, a]) => window.__set(b, a), [buttons, axes]);
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__set([], null));
};

// ---------------------------------------------------------------- gamepad mode
const page = await newPage();
await page.goto(`${url}#/dashboard`);
await page.waitForSelector('.status-row');
await shot(page, 'web-dashboard');

// No "Conectar" needed: the first button press selects the controller.
await tap(page, [0]);
await page.waitForTimeout(200);
const ctrl = await page.locator('.status-row', { hasText: 'Controle' }).first().innerText();
if (!ctrl.includes('Detectado')) errors.push(`controller not auto-detected: ${ctrl}`);
if (!(await page.getByRole('button', { name: 'Configurar meu VR Box' }).count())) errors.push('dashboard does not offer the guided setup');

// Guided setup.
await page.getByRole('button', { name: 'Configurar meu VR Box' }).click();
await page.waitForTimeout(300);
await shot(page, 'web-setup');
// Every joystick direction is asked (the joystick is listened to a little longer).
for (const axes of [[1, 0, 0, 0], [-1, 0, 0, 0], [0, -1, 0, 0], [0, 1, 0, 0]]) {
  await tap(page, [], axes);
  await page.waitForTimeout(1400);
}
for (const b of [7, 6, 0, 1, 2, 3]) {
  // gatilho de cima = R2, gatilho de baixo = L2, then A, B, C (X), D (Y)
  await tap(page, [b]);
  await page.waitForTimeout(800);
}
// The VR Box's BACK (Android goes back in history) must not leave the setup: it is an input.
const before = page.url();
await page.evaluate(() => history.back());
await page.waitForTimeout(400);
if (page.url() !== before) errors.push(`BACK left the setup screen: ${page.url()}`);
const backStatus = await page.locator('.setup__status').innerText();
if (!backStatus.includes('Tecla voltar')) errors.push(`BACK was not recognized: ${backStatus}`);
if (!(await page.locator('.setup__signal .badge').innerText()).includes('Gamepad')) errors.push('mode chip does not show the gamepad mode');
await page.waitForTimeout(800);
await page.waitForTimeout(200);
await shot(page, 'web-setup-summary');
const summary = await page.locator('.game-row').allInnerTexts();
if (summary.length !== 8) errors.push(`summary has ${summary.length} rows`);
if (!summary[7].includes('Tecla voltar')) errors.push(`@ step learned: ${summary[7]}`);
if (!summary[0].includes('Direita ✓ · Esquerda ✓ · Cima ✓ · Baixo ✓')) errors.push(`joystick learned as: ${summary[0]}`);
await page.getByRole('button', { name: 'Salvar e usar' }).click();
await page.waitForTimeout(400);
await page.getByRole('button', { name: 'Testar agora' }).click();
await page.waitForTimeout(300);

// The new profile is active: A on the VR Box lights A on the right controller,
// gatilho de cima (R2, analog) drives the right trigger.
if (!page.url().includes('#/controllers')) errors.push(`after saving went to ${page.url()}`);
await page.evaluate(() => window.__set([0], null));
await page.waitForTimeout(150);
const aState = await page.locator('.vc--right .qc-row', { hasText: /^A/ }).locator('.state').innerText();
if (aState !== 'Pressionado') errors.push(`virtual A shows "${aState}"`);
await page.evaluate(() => window.__set([7], null));
await page.waitForTimeout(150);
const trig = await page.locator('.vc--right .qc-row--analog', { hasText: 'ZR' }).locator('.meter__value').innerText();
if (trig !== '1,00') errors.push(`right trigger shows ${trig}`);
await page.evaluate(() => window.__set([], null));
// The joystick reaches the virtual left stick in every direction.
for (const [axes, want] of [[[0, -1, 0, 0], /Y \+0,9|Y \+1,0/], [[0, 1, 0, 0], /Y -0,9|Y -1,0|Y −0,9|Y −1,0/], [[-1, 0, 0, 0], /X -0,9|X -1,0|X −0,9|X −1,0/], [[1, 0, 0, 0], /X \+0,9|X \+1,0/]]) {
  await page.evaluate((a) => window.__set([], a), axes);
  await page.waitForTimeout(400);
  const t = await page.locator('.vc--left .vc__stick .mono').innerText();
  if (!want.test(t)) errors.push(`left stick for ${axes} shows "${t}"`);
}
await page.evaluate(() => window.__set([], null));
await shot(page, 'web-controllers');

// Saved in the browser.
await page.reload();
await page.waitForSelector('#view > *');
const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('vrbq.profiles') || 'null'));
const mine = saved?.profiles?.find((p) => p.name === 'Meu VR Box');
if (!mine || saved.activeProfileId !== mine.id) errors.push('"Meu VR Box" was not saved as the active profile');
if (mine && mine.mappings.length < 9) errors.push(`"Meu VR Box" has ${mine?.mappings.length} mappings`);
// The joystick must move to every side: both axes are mapped.
for (const t of ['left.stick.x', 'left.stick.y']) if (mine && !mine.mappings.some((m) => m.target === t)) errors.push(`joystick has no ${t}`);
await page.close();

// ---------------------------------------------------------------- mouse/keyboard mode
const km = await newPage();
await km.addInitScript(() => (window.__padOn = false));
await km.goto(`${url}#/dashboard`);
await km.waitForSelector('.status-row');
await km.getByRole('button', { name: 'Conectar controle' }).first().tap();
await km.waitForSelector('.modal');
if (!(await km.getByText('Aperte qualquer botão do VR Box').count())) errors.push('connect does not wait for a button');
await km.keyboard.down('ArrowUp'); // the VR Box in keyboard mode
await km.keyboard.up('ArrowUp');
await km.waitForTimeout(300);
if (await km.locator('.modal').count()) errors.push('connect dialog did not close after a key press');
await go(km, 'detect');
await km.keyboard.down('Enter');
await km.waitForTimeout(100);
const key = await km.locator('.detected__event').innerText().catch(() => '');
if (key !== 'Tecla Enter') errors.push(`keyboard detection shows "${key}"`);
await km.keyboard.up('Enter');
// A WebView key without a name: still recognized by its code.
await km.evaluate(() => {
  const ev = new KeyboardEvent('keydown', { key: 'Unidentified', bubbles: true });
  Object.defineProperty(ev, 'keyCode', { get: () => 96 });
  window.dispatchEvent(ev);
});
await km.waitForTimeout(150);
const unnamed = await km.locator('.detected__event').innerText().catch(() => '');
if (unnamed !== 'Tecla código 96') errors.push(`unnamed key shows "${unnamed}"`);
await go(km, 'game');
if (!(await km.getByText('Só no app Android.').count())) errors.push('game screen does not explain the web limit');
// Starting here must say plainly that other games are not reached.
await go(km, 'dashboard');
await km.getByRole('button', { name: 'Iniciar emulação' }).first().tap();
await km.waitForTimeout(300);
if (!(await km.getByText('Ligada só dentro deste app').count())) errors.push('web emulation does not say it only works inside the app');
await km.getByRole('button', { name: 'Usar em outros jogos' }).tap();
await km.waitForSelector('.modal');
if (!(await km.locator('.modal').getByText('Instale o app Android', { exact: false }).count())) errors.push('other-games help is missing');
await shot(km, 'web-other-apps');

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Web version OK — auto-detection, guided setup, virtual controllers, keyboard mode, persistence');
