import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as f from '../../frontend/scripts/format.js';
import { createStore } from '../../frontend/scripts/store.js';

test('number helpers', () => {
  assert.equal(f.fixed(0.123), '0.12');
  assert.equal(f.fixed(-0.001), '0.00');
  assert.equal(f.fixed(null), '—');
  assert.equal(f.signed(0.5), '+0.50');
  assert.equal(f.signed(-0.5), '-0.50');
  assert.equal(f.signed(0), '0.00');
  assert.match(f.clockTime(Date.UTC(2026, 0, 1, 21, 30, 1)), /^\d\d:\d\d:\d\d$/);
});

test('indicators never claim features that are not active', () => {
  assert.equal(f.bluetoothIndicator(null).value, '—');
  assert.equal(f.bluetoothIndicator({ bluetooth: { link: 'connected' } }).value, 'Connected');
  assert.equal(f.bluetoothIndicator({ bluetooth: { link: 'off' } }).value, 'Disconnected');
  assert.equal(f.controllerIndicator({ controller: { demo: true } }).value, 'DEMO');
  assert.equal(f.controllerIndicator({ controller: { selected: { name: 'VR BOX' }, connected: false } }).value, 'Not detected');
  assert.equal(f.inputIndicator({ input: { active: false } }).value, 'Inactive');
  assert.equal(f.emulationIndicator({ emulation: { running: true, output: 'none' } }).tone, 'warn');
  assert.equal(f.integrationIndicator({ integration: { udpEnabled: false, streaming: false } }).value, 'Unavailable');
  assert.equal(f.integrationIndicator({ integration: { udpEnabled: true, streaming: false, target: '127.0.0.1:47900' } }).value, 'Available');
  assert.equal(f.handIndicator({ left: { configured: false, mappings: 0 } }, 'left').value, 'Not configured');
  assert.equal(f.handIndicator({ right: { configured: true, mappings: 1 } }, 'right').hint, '1 mapping');
});

test('compatibility mirrors the native rule', () => {
  assert.equal(f.isCompatible('relative', 'button'), false);
  assert.equal(f.isCompatible('relative', 'stick_axis'), true);
  assert.equal(f.isCompatible('analog', 'button'), true);
  assert.equal(f.isCompatible('digital', 'stick_direction'), true);
});

test('protocol preview has the VRBQ shape', () => {
  const p = f.protocolPreview({ v: { left: { x: 0.12345, y: 0, trigger: 1, grip: 0, buttons: { x: true } }, right: { x: 0, y: 0, buttons: { a: true } } } });
  assert.deepEqual(Object.keys(p.left), ['stick', 'click', 'x', 'y', 'menu', 'trigger', 'grip']);
  assert.deepEqual(Object.keys(p.right), ['stick', 'click', 'a', 'b', 'system', 'trigger', 'grip']);
  assert.equal(p.left.stick[0], 0.1235);
  assert.equal(p.left.x, true);
  assert.equal(p.right.a, true);
});

test('store keeps the log bounded and emits frames', () => {
  const s = createStore();
  s.state.settings = { logSize: 3 };
  const seen = [];
  s.on('frame', (fr) => seen.push(fr));
  s.applyFrame({ v: { left: {} }, p: {}, events: [1, 2, 3, 4, 5].map((n) => ({ seq: n, t: 0, c: 'system', m: `e${n}` })), stats: { eventsPerSec: 1 } });
  assert.deepEqual(s.state.log.map((e) => e.m), ['e3', 'e4', 'e5']);
  assert.equal(seen.length, 1);
  assert.equal(s.state.stats.eventsPerSec, 1);
  let meta = null;
  s.on('profile', (_p, m) => (meta = m));
  s.set('profile', { id: 'x' }, { silentSettings: true });
  assert.deepEqual(meta, { silentSettings: true });
});
