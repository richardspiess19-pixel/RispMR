  var Ce = (n) => document.querySelector(n),
    lo = Ce("#vid"),
    ao = Ce("#pv"),
    mh = Ce("#gl"),
    Ld = Ce("#rot");
  U.video = lo;
  var hi = null,
    Dd = 0,
    Ua = !1,
    co = null;
  async function Nd() {
    if (hi) return hi;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return null;
    let n = De.videoW || 1280,
      t = q.view === "vr";
    for (let e of [
      {
        facingMode: q.cam,
        width: { ideal: n },
        height: { ideal: t ? n * 0.75 : n * 0.5625 },
        frameRate: { ideal: 60 },
      },
      { facingMode: q.cam },
      !0,
    ])
      try {
        return (
          (hi = await navigator.mediaDevices.getUserMedia({ audio: !1, video: e })),
          (lo.srcObject = hi),
          await lo.play(),
          hi
        );
      } catch (i) {
        (console.warn("câmera", i), (hi = null));
      }
    return null;
  }
  function gh() {
    (hi && hi.getTracks().forEach((n) => n.stop()), (hi = null), (lo.srcObject = null));
  }
  U.flipCam = async () => {
    ((q.cam = q.cam === "user" ? "environment" : "user"), Ze(), gh(), await Nd());
  };
  function L0() {
    Ua ||
      ((Ua = !0),
      De.init(mh),
      De.layout(),
      ee.init(),
      rr.init(),
      Ql.init(),
      _i.init(),
      Xt.bind(mh),
      (ei.onFrame = (n, t) => Ke.ingest(n, t)),
      rr.layout(),
      requestAnimationFrame(D0));
  }
  async function Fd(n) {
    if (((q.view = n), Ze(), W.init(), window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission))
      try {
        await DeviceOrientationEvent.requestPermission();
      } catch {}
    let t = (i) => {
      try {
        return Promise.race([Promise.resolve(i()).catch(() => {}), am(700)]);
      } catch {
        return null;
      }
    };
    (await t(() => document.documentElement.requestFullscreen()),
      n === "vr" && (await t(() => screen.orientation.lock("landscape"))),
      t(async () => {
        co = await navigator.wakeLock.request("screen");
      }),
      (Ce("#set").hidden = !0),
      (Ce("#menu").hidden = !0),
      (mh.hidden = !1),
      L0(),
      De.layout(),
      (De.fadeTo = 1),
      (U.run = !0),
      (Dd = 0),
      q.learned ? _i.launch("library") : _i.launch("gestures"));
    let e = await Nd();
    if ((_i.toast(e ? "Carregando rastreio de mãos…" : "Sem câmera: use toque ou mouse"), e && !window.__noTrack)) {
      let i = await ei.init((r) => {
        r > 0 && r < 1 && _i.toast("Baixando rastreio de mãos " + Math.round(r * 100) + "%");
      });
      _i.toast(i ? "Mãos prontas: pince para clicar" : "Sem internet: rastreio simples por cor da pele");
    }
  }
  function d3() {
    ((U.run = !1), _i.closeXp(), gh());
    try {
      co && co.release();
    } catch {}
    ((co = null), (mh.hidden = !0), (Ld.hidden = !0), (Ce("#menu").hidden = !1));
    try {
      document.exitFullscreen();
    } catch {}
  }
  U.exitApp = d3;
  function D0(n) {
    if ((requestAnimationFrame(D0), !U.run)) return;
    let t = Math.min(0.05, (n - (Dd || n - 16)) / 1e3);
    if (
      ((Dd = n),
      (U.now = n),
      (U.time = n / 1e3),
      (U.dt = t),
      U.frame++,
      (U.fps += (1 / Math.max(0.001, t) - U.fps) * 0.05),
      q.view === "vr" && innerHeight > innerWidth)
    ) {
      Ld.hidden = !1;
      return;
    }
    ((Ld.hidden = !0),
      hi && (ei.state === "on" ? ei.pump(lo) : ei.state === "fail" && Tm(lo)),
      ke.update(t),
      Xt.update(t),
      rr.update(t),
      _i.update(t),
      ee.update(t),
      Ql.update(),
      De.render(t));
  }
  addEventListener("resize", () => {
    Ua && U.run && De.layout();
  });
  document.addEventListener("visibilitychange", async () => {
    if (document.hidden) {
      W.ctx && W.ctx.suspend();
      return;
    }
    if ((W.resume(), U.run && !co))
      try {
        co = await navigator.wakeLock.request("screen");
      } catch {}
  });
  addEventListener("error", (n) => {
    if (location.hash === "#debug") {
      let t = Ce("#err");
      ((t.hidden = !1),
        (t.textContent +=
          n.message +
          `
`));
    }
  });
  var f3 = [
      ["Som"],
      ["Volume", "vol", 0, 1, 0.05],
      ["Reverberação", "reverb", 0, 0.8, 0.02],
      ["Mãos"],
      ["Força da batida (menor = mais sensível)", "hit", 0.3, 1.4, 0.02],
      ["Previsão de movimento", "predict", 0, 1, 0.05],
      ["Tempo para selecionar (s)", "dw", 0.3, 1.5, 0.05],
      ["Óculos"],
      ["Distância das lentes (mm)", "ipd", 54, 74, 1],
      ["Zoom das lentes", "zoom", 0.7, 1.3, 0.05],
      ["Distorção das lentes", "dist", 0, 0.5, 0.02],
      ["Profundidade 3D", "depth", 0, 20, 1],
      ["Campo de visão", "fov", 42, 78, 1],
      ["Tela do celular (pol.)", "inch", 4, 8, 0.1],
    ],
    p3 = [
      ["Perfil do VR", "prof", Object.entries(cs).map(([n, t]) => [n, t[3]])],
      [
        "Câmera",
        "cam",
        [
          ["environment", "Traseira"],
          ["user", "Frontal"],
        ],
      ],
      [
        "Aparência das mãos",
        "handStyle",
        [
          ["real", "Mão real recortada"],
          ["holo", "Holograma"],
          ["off", "Invisível"],
        ],
      ],
      [
        "Qualidade",
        "quality",
        [
          ["auto", "Automática"],
          ["alto", "Alta"],
          ["medio", "Média"],
          ["baixo", "Leve"],
        ],
      ],
    ];
  Ce("#fl").innerHTML =
    f3
      .map((n) =>
        n.length === 1
          ? `<h3>${n[0]}</h3>`
          : `<label><span>${n[0]}<em data-v="${n[1]}"></em></span><input type=range data-k=${n[1]} min=${n[2]} max=${n[3]} step=${n[4]}></label>`,
      )
      .join("") +
    "<h3>Preferências</h3>" +
    p3
      .map(
        ([n, t, e]) =>
          `<label>${n}<select data-k=${t}>${e.map(([i, r]) => `<option value=${i}>${r}</option>`).join("")}</select></label>`,
      )
      .join("");
  var Ud = () =>
    document.querySelectorAll("[data-k]").forEach((n) => {
      n.value = q[n.dataset.k];
      let t = document.querySelector(`[data-v="${n.dataset.k}"]`);
      t && (t.textContent = q[n.dataset.k]);
    });
  document.querySelectorAll("[data-k]").forEach((n) => {
    n.oninput = () => {
      let t = n.dataset.k;
      ((q[t] = isNaN(n.value) ? n.value : +n.value),
        t === "prof" && cs[q.prof] && ([q.ipd, q.zoom, q.dist] = cs[q.prof]),
        t === "vol" && W.setVol(q.vol),
        t === "reverb" && W.setRev(q.reverb),
        t === "cam" && hi && (gh(), N0()),
        t === "quality" && Ua && De.setQuality(q.quality),
        Ud(),
        Ze(),
        Ua && U.run && De.layout());
    };
  });
  Ud();
  var N0 = () =>
    Nd().then((n) => {
      n
        ? ((ao.srcObject = n), ao.play())
        : (Ce("#cm").textContent = "Câmera indisponível. Permita o acesso e tente de novo.");
    });
  Ce("#goVR").onclick = () => Fd("vr");
  Ce("#goFlat").onclick = () => Fd("flat");
  Ce("#cfg").onclick = () => {
    ((Ce("#set").hidden = !1), N0());
  };
  Ce("#back").onclick = () => {
    ((Ce("#set").hidden = !0), U.run || gh());
  };
  Ce("#rst").onclick = () => {
    (Kd(), Ud());
  };
  Ce("#cal").onclick = () => {
    if (!hi || !ao.videoWidth) {
      Ce("#cm").textContent = "Ative a câmera primeiro.";
      return;
    }
    let n = document.createElement("canvas");
    n.width = n.height = 16;
    let t = n.getContext("2d", { willReadFrequently: !0 }),
      e = ao.videoWidth,
      i = ao.videoHeight,
      r = Math.min(i, e * 0.12);
    t.drawImage(ao, e / 2 - r / 2, i / 2 - r / 2, r, r, 0, 0, 16, 16);
    let s = t.getImageData(0, 0, 16, 16).data,
      o = 0,
      a = 0;
    for (let c = 0; c < 1024; c += 4)
      ((o += 128 - 0.1687 * s[c] - 0.3313 * s[c + 1] + 0.5 * s[c + 2]),
        (a += 128 + 0.5 * s[c] - 0.4187 * s[c + 1] - 0.0813 * s[c + 2]));
    ((q.cb = o / 256), (q.cr = a / 256), Ze(), (Ce("#cm").textContent = "Mão calibrada."));
  };
  Ce("#kb").onclick = () => Ce("#kf").click();
  Ce("#kf").onchange = async (n) => {
    W.init();
    let t = (await pn.get("kit")) || {},
      e = 0;
    for (let i of n.target.files) {
      let r = Xm.find(([o]) => o.test(i.name.toLowerCase()));
      if (!r) continue;
      let s = await i.arrayBuffer();
      try {
        ((W.user[r[1]] = await W.ctx.decodeAudioData(s.slice(0))), (t[r[1]] = s), e++);
      } catch {}
    }
    (await pn.put("kit", t),
      (Ce("#cm2").textContent = e
        ? e + " sons reais carregados e salvos."
        : "Nenhum arquivo reconhecido. Use nomes como kick, snare, hihat, tom1, tom2, floor, crash, ride."));
  };
  Ce("#kx").onclick = async () => {
    ((W.user = {}), await pn.del("kit"), (Ce("#cm2").textContent = "Voltou ao som padrão."));
  };
  Ce("#mb").onclick = () => Ce("#mf").click();
  Ce("#mf").onchange = async (n) => {
    let t = 0;
    for (let e of n.target.files)
      (await pn.addMedia({ id: Date.now() + t, kind: "music", blob: e, name: e.name, t: Date.now() }), t++);
    Ce("#cm3").textContent = t + " música(s) adicionadas ao Player.";
  };
  window.__risp = {
    R: U,
    S: q,
    tracker: Ke,
    shell: _i,
    input: Xt,
    head: ke,
    boot: L0,
    enter: Fd,
    audio: W,
    engine: ei,
    world: rr,
    pipe: De,
  };
  window.__items = () => ga.filter((n) => n.enter || n.draw).map((n) => n.id);
  window.__scenes = $l.map((n) => n[0]);
})();
