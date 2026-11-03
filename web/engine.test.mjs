// Parity tests: the web engine must behave like the Kotlin engine (same labels, ids, math).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as E from './engine.js';

const cfg = (f) => JSON.parse(fs.readFileSync(new URL(`../config/${f}`, import.meta.url)));

test('labels match the Android app', () => {
  assert.equal(E.labelOf('mouse:btn:primary'), 'Botão esquerdo do mouse');
  assert.equal(E.labelOf('mouse:x'), 'Movimento do mouse (X)');
  assert.equal(E.labelOf('key:BUTTON_A'), 'Botão A (gamepad)');
  assert.equal(E.labelOf('key:BUTTON_1'), 'Botão 1');
  assert.equal(E.labelOf('key:BUTTON_THUMBL'), 'Clique do analógico esquerdo');
  assert.equal(E.labelOf('key:DPAD_UP'), 'D-pad cima');
  assert.equal(E.labelOf('key:VOLUME_UP'), 'Volume +');
  assert.equal(E.labelOf('key:ENTER'), 'Tecla Enter');
  assert.equal(E.labelOf('key:A'), 'Tecla A');
  assert.equal(E.labelOf('axis:Y:-'), 'Eixo Y do joystick → cima');
  assert.equal(E.labelOf('axis:HAT_X:+'), 'D-pad horizontal → direita');
  assert.equal(E.kindOf('mouse:x'), 'relative');
  assert.equal(E.kindOf('axis:RZ'), 'analog');
  assert.equal(E.kindOf('axis:RZ:-'), 'digital');
  assert.equal(E.kindOf('<img>'), null);
});

test('virtual events read like the app log', () => {
  assert.equal(E.describeVirtual({ hand: 'right', control: 'a', pressed: true, value: null }), 'Direito · botão A pressionado');
  assert.equal(E.describeVirtual({ hand: 'left', control: 'trigger', pressed: true, value: 0.6 }), 'Esquerdo · gatilho pressionado (0,60)');
});

test('mapper: buttons, analog, Y flip, directions, motion routing', () => {
  const m = new E.ControllerMapper();
  m.configure(
    [
      { id: '1', source: 'key:BUTTON_A', target: 'right.a' },
      { id: '2', source: 'key:BUTTON_4', target: 'left.trigger' },
      { id: '3', source: 'axis:Y', target: 'left.stick.y' },
      { id: '4', source: 'key:DPAD_LEFT', target: 'right.stick.left' },
      { id: '5', source: 'mouse:y', target: 'left.stick.y' },
      { id: '6', source: 'mouse:x', target: 'right.a' },
    ],
    { analogThreshold: 0.5, digitalAnalogValue: 0.75 },
  );
  assert.equal(m.rejected.length, 1);
  const st = { digital: new Set(['key:BUTTON_A', 'key:BUTTON_4', 'key:DPAD_LEFT']), analog: new Map([['axis:Y', -0.8]]) };
  const f = m.evaluate(st);
  assert.ok(f.buttons.has('right.a'));
  assert.equal(f.analog.get('left.trigger'), 0.75);
  assert.ok(Math.abs(f.stick[1] - 0.8) < 1e-9);
  assert.equal(f.stick[2], -1);
  const got = [];
  m.routeMotion(0, 3, (h, a, d) => got.push([h, a, d]));
  assert.deepEqual(got, [['left', 1, -3]]);
});

test('joystick math matches the Kotlin implementation', () => {
  assert.ok(Math.abs(E.shape(0.55, { deadzone: 0.1, curve: 1, max: 1, invert: false }) - 0.5) < 1e-6);
  assert.equal(E.shape(0.5, { deadzone: 0, curve: 2, max: 1, invert: false }), 0.25);
  const s = new E.VirtualStick({ mode: 'virtual_stick', smoothing: 0, returnSpeed: 5, x: { sensitivity: 1, deadzone: 0, curve: 1, max: 1, invert: false }, y: { sensitivity: 1, deadzone: 0, curve: 1, max: 1, invert: false } });
  let t = 1000;
  s.update(t);
  s.addMotion(0, 40, t);
  s.update(t);
  assert.ok(Math.abs(s.out[0] - 0.5) < 1e-6);
  for (let i = 0; i < 60; i++) s.update((t += 20));
  assert.equal(s.out[0], 0);
});

test('processor: detection, hysteresis and release', () => {
  const log = new E.EventLog(100);
  const vc = new E.VirtualControllers();
  const defaults = E.parseDefaults(cfg('default-profile.json'), cfg('controller-profiles.json'));
  vc.configure(defaults.initial[0]);
  let now = 0;
  const p = new E.InputProcessor(vc, log, () => now);
  const det = [];
  p.detecting = true;
  p.onDetect = (d) => det.push(d);
  p.process({ type: 'button', id: 'key:BUTTON_A', pressed: true, t: 0, device: 'gp' });
  assert.equal(vc.c.right.buttons.a, true);
  assert.equal(det[0].label, 'Botão A (gamepad)');
  assert.equal(det[0].state, 'PRESSED');
  p.process({ type: 'axis', id: 'axis:HAT_X', value: 1, t: 0, device: 'gp' });
  assert.ok(p.digital.has('axis:HAT_X:+'));
  p.releaseAll('teste');
  assert.equal(vc.c.right.buttons.a, false);
  assert.equal(log.recent(1)[0].m, 'Todos os botões foram soltos (teste)');
});

test('shipped profiles load with every rule accepted', () => {
  const d = E.parseDefaults(cfg('default-profile.json'), cfg('controller-profiles.json'));
  assert.deepEqual(d.initial.map((p) => p.name), ['VR Box padrão', 'Quest Touch esquerdo', 'Quest Touch direito', 'Perfil personalizado']);
  const raw = cfg('controller-profiles.json').profiles;
  d.initial.forEach((p, i) => assert.equal(p.mappings.length, raw[i].mappings.length));
});

test('browser keys and gamepad buttons map to the app ids', () => {
  assert.equal(E.keyNameFromEvent('ArrowUp', 'ArrowUp'), 'DPAD_UP');
  assert.equal(E.keyNameFromEvent('Enter', 'Enter'), 'ENTER');
  assert.equal(E.keyNameFromEvent('KeyB', 'b'), 'B');
  assert.equal(E.keyNameFromEvent('', 'AudioVolumeUp'), 'VOLUME_UP');
  // Android WebView: buttons without a name keep a distinct id from their key code.
  assert.equal(E.keyNameFromEvent('', 'Unidentified', 96), '96');
  assert.equal(E.labelOf('key:96'), 'Tecla código 96');
  assert.equal(E.keyNameFromEvent('', 'Unidentified', 0), null);
  assert.equal(E.keyNameFromEvent('', 'GoBack', 4), 'BACK');
  assert.equal(E.gamepadButtonName(0, true), 'BUTTON_A');
  assert.equal(E.gamepadButtonName(12, true), 'DPAD_UP');
  assert.equal(E.gamepadButtonName(0, false), 'BUTTON_1');
  assert.equal(E.gamepadAxisName(3, true), 'RZ');
});
