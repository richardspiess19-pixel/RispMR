// Static, trusted SVG icons (24x24, stroke based).

const P = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  bluetooth: '<path d="m7 7 10 10-5 4V3l5 4L7 17"/>',
  radar: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12 18 6"/>',
  sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  gamepad: '<path d="M7.5 7h9a4.5 4.5 0 0 1 4.4 5.4l-.9 4.4a2.6 2.6 0 0 1-4.6 1L14 16h-4l-1.4 1.8a2.6 2.6 0 0 1-4.6-1l-.9-4.4A4.5 4.5 0 0 1 7.5 7Z"/><path d="M8 10v3M6.5 11.5h3"/><circle cx="15.5" cy="10.5" r=".6"/><circle cx="17" cy="12.5" r=".6"/>',
  activity: '<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  play: '<path d="M7 4.5v15l12-7.5-12-7.5Z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
  plug: '<path d="M9 3v5M15 3v5"/><path d="M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8Z"/><path d="M12 16.5V21"/>',
  unplug: '<path d="M9 3v5M15 3v5"/><path d="M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8Z"/><path d="M12 16.5V21"/><path d="M3 3l18 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4.5 7h15M10 11v6M14 11v6"/><path d="M6.5 7 7.5 20h9l1-13M9.5 7V4h5v3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V4H4v12h4"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5"/><path d="M4.5 19.5h15"/>',
  upload: '<path d="M12 15.5V4M7 9l5-5 5 5"/><path d="M4.5 19.5h15"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>',
  alert: '<path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path d="M12 10v4.5M12 17.2v.1"/>',
  save: '<path d="M5 4h11l3 3v13H5V4Z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
  undo: '<path d="M9 7 4.5 11.5 9 16"/><path d="M4.5 11.5H15a4.5 4.5 0 0 1 0 9h-3"/>',
  wand: '<path d="m4 20 11-11M14 4v2.5M18.5 5.5l-1.8 1.8M20 10h-2.5"/><path d="m13 7 4 4"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M19 14v5.5H4.5V5H10"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  mouse: '<rect x="6.5" y="3" width="11" height="18" rx="5.5"/><path d="M12 7v3"/>',
};

export function iconSvg(name) {
  const body = P[name] || P.info;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

/** Returns a <span> containing the icon. */
export function icon(name, cls = 'icon') {
  const span = document.createElement('span');
  span.className = cls;
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = iconSvg(name);
  return span.firstElementChild;
}
