// Formatting helpers (no DOM). Covered by tests/frontend/format-store.test.mjs.

export function pad2(n) {
  return String(n).padStart(2, '0');
}

/** "21:30:01" from wall-clock milliseconds. */
export function clockTime(ms) {
  if (!Number.isFinite(ms)) return '--:--:--';
  const d = new Date(ms);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

/** Number with a decimal comma (pt-BR): 0.5 -> "0,50". */
export function fixed(v, digits = 2) {
  if (v === null || v === undefined || !Number.isFinite(v)) return '—';
  let s = v.toFixed(digits);
  if (s === `-${(0).toFixed(digits)}`) s = (0).toFixed(digits);
  return s.replace('.', ',');
}

export function signed(v, digits = 2) {
  if (!Number.isFinite(v)) return '—';
  const s = fixed(v, digits);
  return v > 0 && s !== fixed(0, digits) ? `+${s}` : s;
}

const STATES = { PRESSED: 'Pressionado', RELEASED: 'Solto', MOVED: 'Movimento' };
export function stateLabel(state) {
  return STATES[state] || state;
}

/**
 * Indicator model: { value, hint, tone } with tone 'ok' (blue), 'warn' (purple), 'err' or 'off'.
 */
export function bluetoothIndicator(status) {
  if (!status) return { value: '—', hint: 'Abra no app Android', tone: 'off' };
  switch (status.bluetooth?.link) {
    case 'web':
      return { value: 'Pelo celular', hint: 'Pareie no Bluetooth do Android', tone: 'off' };
    case 'connected':
      return { value: 'Conectado', hint: '', tone: 'ok' };
    case 'disconnected':
      return { value: 'Desconectado', hint: '', tone: 'off' };
    case 'off':
      return { value: 'Desligado', hint: 'Ligue o Bluetooth do celular', tone: 'err' };
    case 'unverified':
      return { value: 'Conectado', hint: 'Dê a permissão de Bluetooth para confirmar', tone: 'warn' };
    case 'not_bluetooth':
      return { value: 'Não é Bluetooth', hint: 'O controle escolhido não está pareado', tone: 'warn' };
    case 'unsupported':
      return { value: 'Sem Bluetooth', hint: 'Este celular não tem Bluetooth', tone: 'err' };
    default:
      return { value: 'Sem permissão', hint: 'Toque em Controle para permitir', tone: 'warn' };
  }
}

export function controllerIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const c = status.controller || {};
  if (c.demo) return { value: 'Demonstração', hint: 'Comandos simulados', tone: 'warn' };
  if (c.selected && c.connected) return { value: 'Detectado', hint: c.selected.name, tone: 'ok' };
  if (c.selected) return { value: 'Não detectado', hint: `Esperando ${c.selected.name}`, tone: 'warn' };
  return { value: 'Não detectado', hint: '', tone: 'off' };
}

export function inputIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const i = status.input || {};
  if (!i.active) return { value: 'Inativa', hint: '', tone: 'off' };
  if (!i.focused) return { value: 'Pausada', hint: 'O app não está na frente', tone: 'warn' };
  return { value: 'Ativa', hint: i.detecting ? 'Detectando botões' : '', tone: 'ok' };
}

export function emulationIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  if (!status.emulation?.running) return { value: 'Parada', hint: '', tone: 'off' };
  return { value: 'Ligada', hint: '', tone: 'ok' };
}

export function handIndicator(status, hand) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const h = status[hand] || {};
  if (h.configured) return { value: 'Configurado', hint: `${h.mappings} ${h.mappings === 1 ? 'botão' : 'botões'}`, tone: 'ok' };
  return { value: 'Não configurado', hint: '', tone: 'off' };
}

/** Modo jogo readiness: the thing that makes phone games react. */
export function gameIndicator(status) {
  const g = status?.game;
  if (!g) return { value: '—', hint: '', tone: 'off' };
  if (g.web) return { value: 'Só no app', hint: 'Precisa do app Android', tone: 'off' };
  if (!g.enabled) return { value: 'Desligado', hint: '', tone: 'off' };
  if (!g.serviceEnabled) return { value: 'Falta ativar', hint: 'Ative a acessibilidade', tone: 'warn' };
  if (g.output === 'gamepad') {
    const st = g.gamepad?.state;
    if (st === 'active') return { value: 'Controle virtual', hint: 'Os jogos veem o controle', tone: 'ok' };
    if (st === 'ready' || st === 'connecting') return { value: 'Pronto', hint: status.emulation?.running ? 'Criando o controle' : 'Inicie a emulação', tone: 'ok' };
    const NEED = {
      not_installed: ['Falta o Shizuku', 'Instale o Shizuku'],
      not_running: ['Shizuku parado', 'Abra o Shizuku e inicie'],
      old_shizuku: ['Atualize o Shizuku', ''],
      no_permission: ['Falta permitir', 'Permita o app no Shizuku'],
      error: ['Erro no controle', g.gamepad?.message || ''],
    };
    const [value, hint] = NEED[st] || NEED.not_running;
    return { value, hint, tone: st === 'error' ? 'err' : 'warn' };
  }
  if (!g.bindings) return { value: 'Sem toques', hint: 'Escolha onde tocar', tone: 'warn' };
  return { value: 'Pronto', hint: status.emulation?.running ? 'Abra o jogo' : 'Inicie a emulação', tone: 'ok' };
}

export function integrationIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const i = status.integration || {};
  if (i.streaming) return { value: 'Disponível', hint: `Enviando · ${i.packets} pacotes`, tone: 'ok' };
  if (i.udpEnabled) return { value: 'Disponível', hint: `Rede: ${i.target}`, tone: 'ok' };
  return { value: 'Indisponível', hint: 'Saída de rede desligada', tone: 'off' };
}

export function identifiedIndicator(status) {
  if (!status) return { value: '—', hint: '', tone: 'off' };
  const n = status.identifiedCount || 0;
  return { value: String(n), hint: '', tone: n ? 'ok' : 'off' };
}

/** "Direito · A" for "right.a". */
export function targetLabel(catalog, id) {
  const t = catalog?.targets?.find((x) => x.id === id);
  if (!t) return id;
  return `${t.hand === 'left' ? 'Esquerdo' : 'Direito'} · ${t.label}`;
}

/** Mirrors VirtualTargets.isCompatible on the native side. */
export function isCompatible(sourceKind, targetType) {
  if (sourceKind === 'relative') return targetType === 'stick_axis';
  return true;
}

export function kindLabel(kind) {
  return { digital: 'Botão', analog: 'Analógico', relative: 'Movimento' }[kind] || kind;
}

/** Same shape as the native VRBQ JSON encoder; used for the protocol preview. */
export function protocolPreview(frame, seq = 0) {
  const v = frame?.v;
  const hand = (h, names) => {
    const b = h?.buttons || {};
    return {
      stick: [round4(h?.x), round4(h?.y)],
      click: Boolean(b.stickClick),
      [names[0]]: Boolean(b[names[0]]),
      [names[1]]: Boolean(b[names[1]]),
      [names[2]]: Boolean(b[names[2]]),
      trigger: round4(h?.trigger),
      grip: round4(h?.grip),
    };
  };
  return {
    proto: 'vrbq',
    v: 1,
    seq,
    t: 0,
    demo: false,
    connected: true,
    left: hand(v?.left, ['x', 'y', 'menu']),
    right: hand(v?.right, ['a', 'b', 'system']),
  };
}

function round4(n) {
  return Number.isFinite(n) ? Math.round(n * 10000) / 10000 : 0;
}
