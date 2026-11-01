  var U = {
    run: !1,
    now: 0,
    time: 0,
    dt: 0.016,
    frame: 0,
    fps: 60,
    view: { w: 1, h: 1, aspect: 1, tv: 0.55, mono: !1 },
    toolLen: 2.5,
  };
  var cs = {
      cardboard: [60, 1, 0.2, "Google Cardboard"],
      vrbox: [63, 1, 0.18, "VR Box 2.0"],
      shinecon: [62, 1.05, 0.16, "Shinecon G04"],
      g05: [64, 1.05, 0.15, "Shinecon G05"],
      bobo: [63, 1.08, 0.14, "BoboVR Z4"],
      homido: [62, 1, 0.17, "Homido V2"],
      destek: [64, 1, 0.16, "Destek V5"],
      zeiss: [63, 1.1, 0.12, "Zeiss VR One Plus"],
      merge: [62, 1, 0.18, "Merge VR"],
      freefly: [64, 1.05, 0.13, "Freefly VR Beyond"],
      vrpark: [62, 1, 0.17, "VR Park V3"],
      generic: [62, 1, 0.16, "Genérico"],
    },
    jd = {
      vol: 0.85,
      reverb: 0.22,
      view: "vr",
      prof: "vrbox",
      ipd: 63,
      zoom: 1,
      dist: 0.18,
      ca: 0.01,
      depth: 9,
      inch: 6.1,
      fov: 58,
      cam: "environment",
      scene: "cam",
      hit: 0.62,
      dw: 0.9,
      dwell: !0,
      predict: 1,
      trackW: 512,
      handStyle: "skel",
      trackDev: "auto",
      quality: "auto",
      headTrack: !0,
      bloom: 1,
      hover: !0,
      scaleLock: !1,
      key: 0,
      learned: !1,
      cb: 102,
      cr: 153,
      tol: 22,
      v: 2,
    },
    q = { ...jd };
  try {
    Object.assign(q, JSON.parse(localStorage.getItem("rispx") || "{}"));
  } catch {}
  // v2: mão em esqueleto vira o padrão (quem tinha a "mão real" padrão salva passa a ver o esqueleto).
  (q.v || 1) < 2 && (q.handStyle === "real" && (q.handStyle = "skel"), (q.v = 2));
  var Ze = () => {
      try {
        localStorage.setItem("rispx", JSON.stringify(q));
      } catch {}
    },
    Kd = () => {
      (Object.assign(q, jd), Ze());
    };
