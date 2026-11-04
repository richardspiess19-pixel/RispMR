import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMappings, keyDirections, pickStick, stickFrom, directionsText } from '../../frontend/scripts/views/setup.js';

const fns = { joystick: 'left', trigTop: 'right.trigger', trigBottom: 'right.grip', A: 'right.a', B: 'right.b', C: 'right.x', D: 'right.y', at: 'right.plus' };

/** Joystick rules as { direction-or-axis target: [sources] }. */
const stickRules = (rules, hand = 'left') => {
  const out = {};
  for (const r of rules) if (r.target.startsWith(`${hand}.stick.`)) (out[r.target.slice(hand.length + 7)] ||= []).push(r.source);
  return out;
};

test('gamepad mode: both axes (every direction), analog triggers preferred', () => {
  const rules = buildMappings(
    {
      joystick: { kind: 'axis', axis: 'X', source: 'axis:X:+' },
      trigTop: { source: 'key:BUTTON_R2', analog: 'axis:RTRIGGER' },
      A: { source: 'key:BUTTON_A', analog: null },
      at: null,
    },
    fns,
  );
  const stick = stickRules(rules);
  assert.deepEqual(stick.x, ['axis:X', 'axis:HAT_X']);
  assert.deepEqual(stick.y, ['axis:Y', 'axis:HAT_Y']);
  // Arrows too, for the modes where the same joystick sends keys.
  assert.deepEqual([stick.up, stick.down, stick.left, stick.right], [['key:DPAD_UP'], ['key:DPAD_DOWN'], ['key:DPAD_LEFT'], ['key:DPAD_RIGHT']]);
  assert.ok(rules.some((r) => r.source === 'axis:RTRIGGER' && r.target === 'right.trigger'));
  assert.ok(rules.some((r) => r.source === 'key:BUTTON_A' && r.target === 'right.a'));
});

test('mouse mode and D-pad mode move to every side', () => {
  const mouse = stickRules(buildMappings({ joystick: { kind: 'mouse', source: 'mouse:x' } }, { ...fns, joystick: 'right' }), 'right');
  assert.equal(mouse.x[0], 'mouse:x');
  assert.equal(mouse.y[0], 'mouse:y');
  const dpad = stickRules(buildMappings({ joystick: { kind: 'dpad', source: 'key:DPAD_RIGHT' } }, fns));
  for (const d of ['up', 'down', 'left', 'right']) assert.deepEqual(dpad[d], [`key:DPAD_${d.toUpperCase()}`]);
  assert.deepEqual(dpad.x, ['axis:HAT_X']);
});

test('"Nada" and skipped buttons produce no rule', () => {
  const rules = buildMappings({ B: { source: 'key:BUTTON_B' }, C: null }, { ...fns, B: '' });
  assert.ok(!rules.some((r) => r.source === 'key:BUTTON_B'));
  assert.equal(buildMappings({}, { ...fns, joystick: '' }).length, 0);
});

test('a button that sends an arrow is not taken by the joystick', () => {
  const rules = buildMappings({ joystick: { kind: 'axis', axis: 'X', source: 'axis:X:+' }, A: { source: 'key:DPAD_UP' } }, fns);
  assert.deepEqual(rules.filter((r) => r.source === 'key:DPAD_UP'), [{ source: 'key:DPAD_UP', target: 'right.a' }]);
});

test('keyboard/music mode: every direction, skipped ones filled in', () => {
  const learned = { joystick: { kind: 'key', source: 'key:MEDIA_NEXT' }, joyLeft: { source: 'key:MEDIA_PREVIOUS' }, joyUp: null, joyDown: null };
  assert.deepEqual(keyDirections(learned), { right: 'key:MEDIA_NEXT', left: 'key:MEDIA_PREVIOUS', up: 'key:VOLUME_UP', down: 'key:VOLUME_DOWN' });
  const stick = stickRules(buildMappings(learned, { joystick: 'left' }));
  assert.deepEqual(stick.right, ['key:MEDIA_NEXT', 'key:DPAD_RIGHT']);
  assert.deepEqual(stick.up, ['key:VOLUME_UP', 'key:DPAD_UP']);
  assert.deepEqual(stick.down, ['key:VOLUME_DOWN', 'key:DPAD_DOWN']);
  // Learned directions win over the guess; unknown keys are not guessed.
  assert.equal(keyDirections({ ...learned, joyUp: { source: 'key:Q' } }).up, 'key:Q');
  assert.deepEqual(keyDirections({ joystick: { kind: 'key', source: 'key:Z' } }), { right: 'key:Z', left: null, up: null, down: null });
});

test('the joystick prefers its analog axis over keys sent at the same time', () => {
  const key = { sourceId: 'key:DPAD_RIGHT', state: 'PRESSED', alternatives: [] };
  const axis = { sourceId: 'axis:X:+', state: 'PRESSED', alternatives: [{ id: 'axis:X', kind: 'analog' }] };
  const other = { sourceId: 'key:MEDIA_NEXT', state: 'PRESSED', alternatives: [] };
  assert.equal(pickStick([key, axis]), axis);
  assert.equal(pickStick([other, key]), key);
  assert.equal(pickStick([]), null);
});

test('mode of each signal', async () => {
  const { modeOf } = await import('../../frontend/scripts/views/setup.js');
  assert.equal(modeOf('mouse:x'), 'mouse');
  assert.equal(modeOf('key:BUTTON_A'), 'gamepad');
  assert.equal(modeOf('axis:X:+'), 'gamepad');
  assert.equal(modeOf('key:VOLUME_UP'), 'music');
  assert.equal(modeOf('key:ENTER'), 'keyboard');
  assert.equal(modeOf('key:DPAD_UP'), 'keyboard');
  assert.equal(modeOf('key:DPAD_UP', 'gamepad'), 'gamepad');
  assert.equal(modeOf('key:BACK', 'gamepad'), 'gamepad');
});

/** What the setup stores for one push, from a detection like the app sends. */
const push = (sourceId, value = 1) => stickFrom({ sourceId, value, state: sourceId.startsWith('mouse:') ? 'MOVED' : 'PRESSED', alternatives: sourceId.startsWith('axis:') ? [{ id: sourceId.replace(/:[+-]$/, ''), kind: 'analog' }] : [] });
const rulesFor = (dirs) =>
  buildMappings({ joystick: push(...dirs.right), joyLeft: dirs.left && push(...dirs.left), joyUp: dirs.up && push(...dirs.up), joyDown: dirs.down && push(...dirs.down) }, { joystick: 'left' }).filter((r) =>
    r.target.startsWith('left.stick.'),
  );
const has = (rules, rule) => assert.ok(rules.some((r) => r.source === rule.source && r.target === rule.target && Boolean(r.invert) === Boolean(rule.invert)), `${JSON.stringify(rule)} in ${JSON.stringify(rules)}`);

test('four directions on X/Y: two analog axes, nothing inverted', () => {
  const rules = rulesFor({ right: ['axis:X:+'], left: ['axis:X:-'], up: ['axis:Y:-'], down: ['axis:Y:+'] });
  has(rules, { source: 'axis:X', target: 'left.stick.x' });
  has(rules, { source: 'axis:Y', target: 'left.stick.y' });
});

test('up/down on another axis, upside down: that axis, inverted', () => {
  const rules = rulesFor({ right: ['axis:X:+'], left: ['axis:X:-'], up: ['axis:RZ:+'], down: ['axis:RZ:-'] });
  has(rules, { source: 'axis:X', target: 'left.stick.x' });
  has(rules, { source: 'axis:RZ', target: 'left.stick.y', invert: true });
  assert.ok(!rules.some((r) => r.source === 'axis:Y'), 'Y is not guessed when up/down were learned');
});

test('left/right reversed on the device', () => {
  has(rulesFor({ right: ['axis:X:-'], left: ['axis:X:+'], up: ['axis:Y:-'], down: ['axis:Y:+'] }), { source: 'axis:X', target: 'left.stick.x', invert: true });
});

test('keys and axes mixed: each direction keeps its own signal', () => {
  const rules = rulesFor({ right: ['key:MEDIA_NEXT'], left: ['key:MEDIA_PREVIOUS'], up: ['axis:Y:-'], down: ['axis:Y:+'] });
  has(rules, { source: 'key:MEDIA_NEXT', target: 'left.stick.right' });
  has(rules, { source: 'key:MEDIA_PREVIOUS', target: 'left.stick.left' });
  has(rules, { source: 'axis:Y', target: 'left.stick.y' });
});

test('mouse mode: the sign of each push sets the direction', () => {
  const rules = rulesFor({ right: ['mouse:x', 12], left: ['mouse:x', -12], up: ['mouse:y', 9], down: ['mouse:y', -9] });
  has(rules, { source: 'mouse:x', target: 'left.stick.x' });
  has(rules, { source: 'mouse:y', target: 'left.stick.y', invert: true });
});

test('one key per direction (keyboard mode)', () => {
  const rules = rulesFor({ right: ['key:D'], left: ['key:A'], up: ['key:W'], down: ['key:S'] });
  for (const [k, d] of [['D', 'right'], ['A', 'left'], ['W', 'up'], ['S', 'down']]) has(rules, { source: `key:${k}`, target: `left.stick.${d}` });
});

test('summary lists every direction', () => {
  assert.equal(directionsText({ joystick: push('axis:X:+'), joyLeft: push('axis:X:-'), joyUp: null, joyDown: push('axis:Y:+') }), 'Direita ✓ · Esquerda ✓ · Cima — · Baixo ✓');
});
