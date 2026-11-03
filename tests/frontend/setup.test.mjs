import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMappings, keyDirections, pickStick } from '../../frontend/scripts/views/setup.js';

const fns = { joystick: 'left', trigTop: 'right.trigger', trigBottom: 'right.grip', A: 'right.a', B: 'right.b', C: 'left.x', D: 'left.y', at: 'left.menu' };

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
  assert.deepEqual([mouse.x, mouse.y], [['mouse:x'], ['mouse:y']]);
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
