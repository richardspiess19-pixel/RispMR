import test from 'node:test';
import assert from 'node:assert/strict';
import { needsShizuku } from '../../frontend/scripts/components/shizuku-gate.js';

const app = { native: true, info: { platform: 'android' } };
const status = (state) => ({ game: { gamepad: { state } } });

test('the Android app stays locked until Shizuku allows it', () => {
  for (const s of ['not_installed', 'not_running', 'old_shizuku', 'no_permission']) assert.equal(needsShizuku(status(s), app), true, s);
  for (const s of ['ready', 'connecting', 'active', 'error']) assert.equal(needsShizuku(status(s), app), false, s);
});

test('the web version and the browser preview are never locked', () => {
  assert.equal(needsShizuku(status('not_installed'), { native: true, info: { platform: 'web' } }), false);
  assert.equal(needsShizuku(status('not_installed'), { native: false }), false);
  // Older app without the Shizuku state, or no status yet.
  assert.equal(needsShizuku({ game: {} }, app), false);
  assert.equal(needsShizuku(null, app), false);
  assert.equal(needsShizuku(status('toString'), app), false);
});
