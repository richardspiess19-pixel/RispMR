import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMappings } from '../../frontend/scripts/views/setup.js';

const fns = { joystick: 'left', trigTop: 'right.trigger', trigBottom: 'right.grip', A: 'right.a', B: 'right.b', C: 'left.x', D: 'left.y', at: 'left.menu' };

test('gamepad mode: axis pair, analog triggers preferred', () => {
  const rules = buildMappings(
    {
      joystick: { kind: 'axis', axis: 'X', source: 'axis:X:+' },
      trigTop: { source: 'key:BUTTON_R2', analog: 'axis:RTRIGGER' },
      A: { source: 'key:BUTTON_A', analog: null },
      at: null,
    },
    fns,
  );
  assert.deepEqual(rules, [
    { source: 'axis:X', target: 'left.stick.x' },
    { source: 'axis:Y', target: 'left.stick.y' },
    { source: 'axis:RTRIGGER', target: 'right.trigger' },
    { source: 'key:BUTTON_A', target: 'right.a' },
  ]);
});

test('mouse mode and D-pad mode', () => {
  assert.deepEqual(buildMappings({ joystick: { kind: 'mouse', source: 'mouse:x' } }, { ...fns, joystick: 'right' }), [
    { source: 'mouse:x', target: 'right.stick.x' },
    { source: 'mouse:y', target: 'right.stick.y' },
  ]);
  assert.equal(buildMappings({ joystick: { kind: 'dpad', source: 'key:DPAD_RIGHT' } }, fns).length, 4);
});

test('"Nada" and skipped buttons produce no rule', () => {
  assert.deepEqual(buildMappings({ B: { source: 'key:BUTTON_B' }, C: null }, { ...fns, B: '' }), []);
});
