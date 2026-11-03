// JS side of the Kotlin <-> JavaScript contract (Kotlin side: CommandRouterTest).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBridge, NativeUnavailableError } from '../../frontend/scripts/bridge.js';

function fakeNative() {
  const sent = [];
  let listener = null;
  return {
    sent,
    native: {
      postMessage: (s) => sent.push(JSON.parse(s)),
      addEventListener: (type, fn) => {
        if (type === 'message') listener = fn;
      },
    },
    reply: (obj) => listener({ data: JSON.stringify(obj) }),
  };
}

test('call sends {id, cmd, args} and resolves with the reply result', async () => {
  const f = fakeNative();
  const bridge = createBridge({ VRBQNative: f.native });
  assert.equal(bridge.available, true);
  assert.equal(bridge.transport, 'WebMessageListener');
  const p = bridge.call('profiles.list', { a: 1 });
  assert.deepEqual(f.sent[0], { id: 1, cmd: 'profiles.list', args: { a: 1 } });
  f.reply({ type: 'reply', id: 1, ok: true, result: [1, 2] });
  assert.deepEqual(await p, [1, 2]);
  assert.equal(bridge.pendingCount(), 0);
});

test('error replies reject with message and code', async () => {
  const f = fakeNative();
  const bridge = createBridge({ VRBQNative: f.native });
  const p = bridge.call('mapping.add');
  f.reply({ type: 'reply', id: 1, ok: false, error: 'Incompatible', code: 'incompatible' });
  await assert.rejects(p, (e) => e.message === 'Incompatible' && e.code === 'incompatible');
});

test('replies are matched by id even out of order', async () => {
  const f = fakeNative();
  const bridge = createBridge({ VRBQNative: f.native });
  const a = bridge.call('a');
  const b = bridge.call('b');
  f.reply({ type: 'reply', id: 2, ok: true, result: 'B' });
  f.reply({ type: 'reply', id: 1, ok: true, result: 'A' });
  assert.deepEqual(await Promise.all([a, b]), ['A', 'B']);
});

test('pushes reach listeners; malformed data is ignored', () => {
  const f = fakeNative();
  const bridge = createBridge({ VRBQNative: f.native });
  const got = [];
  const off = bridge.onPush((m) => got.push(m.type));
  f.reply({ type: 'frame', v: {} });
  bridge._receive('not json');
  bridge._receive('null');
  f.reply({ type: 'status', status: {} });
  off();
  f.reply({ type: 'frame' });
  assert.deepEqual(got, ['frame', 'status']);
});

test('timeouts reject and clean up', async () => {
  const f = fakeNative();
  const bridge = createBridge({ VRBQNative: f.native });
  await assert.rejects(bridge.call('slow', {}, { timeout: 20 }), (e) => e.code === 'timeout');
  assert.equal(bridge.pendingCount(), 0);
});

test('fallback JavascriptInterface transport uses window.__vrbqReceive', async () => {
  const sent = [];
  const env = { VRBQAndroid: { postMessage: (s) => sent.push(JSON.parse(s)) } };
  const bridge = createBridge(env);
  assert.equal(bridge.transport, 'JavascriptInterface');
  const p = bridge.call('app.status');
  env.__vrbqReceive(JSON.stringify({ type: 'reply', id: sent[0].id, ok: true, result: { ok: 1 } }));
  assert.deepEqual(await p, { ok: 1 });
});

test('without native bridge calls reject with NativeUnavailableError', async () => {
  const bridge = createBridge({});
  assert.equal(bridge.available, false);
  await assert.rejects(bridge.call('app.hello'), (e) => e instanceof NativeUnavailableError && e.code === 'no_native');
});
