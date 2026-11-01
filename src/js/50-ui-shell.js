  var an = 2,
    sh = 0.00165,
    Sa = 'system-ui,"Segoe UI",Roboto,sans-serif',
    It = {
      glass: "rgba(9,15,34,.95)",
      glass2: "rgba(255,255,255,.055)",
      line: "rgba(143,227,255,.2)",
      ac: "#2f8cff",
      cy: "#8fe3ff",
      tx: "#eaf4ff",
      mut: "#9fc0e6",
      red: "#ff5f6e",
      gold: "#ffd24c",
      green: "#5dff9a",
    },
    ud = class {
      constructor(t) {
        ((this.p = t), (this.g = t.g));
      }
      rr(t, e, i, r, s) {
        let o = this.g;
        return (o.beginPath(), o.roundRect(t, e, i, r, s), this);
      }
      fill(t) {
        return ((this.g.fillStyle = t), this.g.fill(), this);
      }
      stroke(t, e = 1.5) {
        return ((this.g.strokeStyle = t), (this.g.lineWidth = e), this.g.stroke(), this);
      }
      t(t, e, i, r = 20, s = It.tx, o = "center", a = 600) {
        let c = this.g;
        return (
          (c.font = `${a} ${r}px ${Sa}`),
          (c.fillStyle = s),
          (c.textAlign = o),
          (c.textBaseline = "middle"),
          c.fillText(t, e, i),
          this
        );
      }
      lg(t, e, i, r, s) {
        let o = this.g.createLinearGradient(t, e, i, r);
        return (s.forEach((a, c) => o.addColorStop(c / (s.length - 1), a)), o);
      }
      z(t, e, i, r, s, o = {}) {
        return (this.p.zones.push({ id: t, x: e, y: i, w: r, h: s, ...o }), this.p.hover.has(t));
      }
      card(t, e, i, r, s = 16, o) {
        return (
          this.rr(t, e, i, r, s)
            .fill(o ? "rgba(47,140,255,.24)" : It.glass2)
            .stroke(o ? It.cy : "rgba(255,255,255,.1)", o ? 2 : 1.2),
          this
        );
      }
      btn(t, e, i, r, s, o, a, c = {}) {
        let l = this.z(t, e, i, r, s, { click: a }),
          h = this.p.press.has(t),
          u = c.kind,
          d = c.r ?? Math.min(16, s / 2),
          f =
            u === "p"
              ? this.lg(e, i, e + r, i, ["#2f8cff", "#59c6ff"])
              : u === "d"
                ? l
                  ? "#ff5f6e"
                  : "rgba(255,95,110,.34)"
                : c.on
                  ? "rgba(47,140,255,.5)"
                  : l
                    ? "rgba(90,160,255,.3)"
                    : "rgba(255,255,255,.08)";
        return (
          this.rr(e, i, r, s, d).fill(f),
          (l || c.on) && this.stroke(c.on ? It.cy : "rgba(255,255,255,.6)", 2),
          h && this.rr(e, i, r, s, d).fill("rgba(255,255,255,.25)"),
          this.t(
            o,
            e + r / 2,
            i + s / 2 + 1,
            c.size || Math.min(22, s * 0.44),
            u === "p" ? "#02102e" : "#fff",
            "center",
            650,
          ),
          l
        );
      }
      chips(t, e, i, r, s, o, a = {}) {
        let c = a.h || 44,
          l = 8,
          h = a.size || 18,
          u = e,
          d = this.g;
        return (
          (d.font = `650 ${h}px ${Sa}`),
          r.forEach((f, p) => {
            let x = a.w || Math.max(58, d.measureText(f).width + 30);
            (this.btn(t + p, u, i, x, c, f, () => o(p), { on: p === s, size: h, r: c / 2 }), (u += x + l));
          }),
          u
        );
      }
      slider(t, e, i, r, s, o, a, c, l, h = (u) => u.toFixed(2)) {
        let u = $t((o - a) / (c - a)),
          d = 58,
          f = this.z(t, e, i, r, d, { drag: (x, g, m) => l(a + $t((m - e - 14) / (r - 28)) * (c - a)), click: null });
        (this.t(s, e, i + 12, 17, It.mut, "left", 550),
          this.t(h(o), e + r, i + 12, 17, It.tx, "right", 650),
          this.rr(e + 14, i + 36, r - 28, 8, 4).fill("rgba(255,255,255,.14)"),
          this.rr(e + 14, i + 36, (r - 28) * u, 8, 4).fill(this.lg(e, 0, e + r, 0, ["#2f8cff", "#8fe3ff"])));
        let p = this.g;
        (p.beginPath(), p.arc(e + 14 + (r - 28) * u, i + 40, f ? 15 : 12, 0, ve), (p.fillStyle = "#fff"), p.fill());
      }
      sw(t, e, i, r, s, o, a) {
        (this.z(t, e, i, r, 44, { click: a }),
          this.t(s, e, i + 22, 18, It.tx, "left", 550),
          this.rr(e + r - 66, i + 7, 66, 32, 16).fill(o ? "#2f8cff" : "rgba(255,255,255,.16)"));
        let c = this.g;
        (c.beginPath(), c.arc(e + r - (o ? 19 : 47), i + 23, 13, 0, ve), (c.fillStyle = "#fff"), c.fill());
      }
      icon(t, e, i, r) {
        this.g.drawImage(dd(t), e, i, r, r);
      }
    },
    hd = {};
  function dd(n) {
    if (hd[n.id]) return hd[n.id];
    let t = document.createElement("canvas");
    t.width = t.height = 160;
    let e = t.getContext("2d"),
      [i, r] = n.c || ["#2f6dff", "#0b2a8a"],
      s = e.createLinearGradient(0, 0, 0, 160);
    (s.addColorStop(0, i),
      s.addColorStop(1, r),
      e.beginPath(),
      e.roundRect(6, 6, 148, 148, 38),
      (e.fillStyle = s),
      e.fill());
    let o = e.createLinearGradient(0, 6, 0, 86);
    return (
      o.addColorStop(0, "rgba(255,255,255,.34)"),
      o.addColorStop(1, "rgba(255,255,255,0)"),
      e.beginPath(),
      e.roundRect(10, 10, 140, 76, 34),
      (e.fillStyle = o),
      e.fill(),
      (e.font = '86px "Segoe UI Emoji","Noto Color Emoji","Apple Color Emoji",sans-serif'),
      (e.textAlign = "center"),
      (e.textBaseline = "middle"),
      (e.fillStyle = "#fff"),
      e.fillText(n.emoji, 80, 86),
      (hd[n.id] = t)
    );
  }
  var Ea = class {
    constructor(t) {
      (Object.assign(
        this,
        {
          w: 640,
          h: 420,
          yaw: 0,
          y: 0.12,
          q: 1.5,
          live: 0,
          title: "",
          emoji: "",
          closable: !0,
          chrome: !0,
          movable: !0,
          draw: () => {},
          st: {},
          sc: 0.92,
          tsc: 1,
          dirty: !0,
          closing: !1,
          last: -1e9,
        },
        t,
      ),
        (this.zones = []),
        (this.hover = new Set()),
        (this._h = this.hover),
        (this.press = new Set()));
      let e = (this.cv = document.createElement("canvas"));
      ((e.width = Math.round(this.w * this.q)),
        (e.height = Math.round(this.h * this.q)),
        (this.g = e.getContext("2d")),
        (this.kit = new ud(this)));
      let i = (this.tex = new ln(e));
      ((i.colorSpace = Pe), (i.generateMipmaps = !1), (i.minFilter = Ne), (i.anisotropy = 4));
      let r = this.w * sh,
        s = this.h * sh,
        o = Math.max(4, Math.round(r / 0.08)),
        a = new sn(r, s, o, 1),
        c = a.attributes.position;
      for (let l = 0; l < c.count; l++) {
        let h = c.getX(l) / an;
        (c.setX(l, Math.sin(h) * an), c.setZ(l, -Math.cos(h) * an));
      }
      (a.computeBoundingSphere(),
        (this.mesh = new tt(a, new $e({ map: i, transparent: !0, depthWrite: !1, opacity: 0 }))),
        (this.mesh.frustumCulled = !1),
        U.sc.add(this.mesh),
        this.place());
    }
    place() {
      ((this.mesh.rotation.y = -this.yaw), (this.mesh.position.y = this.y), this.mesh.scale.setScalar(this.sc));
    }
    redraw() {
      let { g: t, kit: e } = this;
      (t.setTransform(this.q, 0, 0, this.q, 0, 0),
        t.clearRect(0, 0, this.w, this.h),
        (this.zones.length = 0),
        this.chrome && this.frame(),
        this.draw(e, this.st, this),
        (this.tex.needsUpdate = !0),
        (this.dirty = !1),
        (this.last = U.now));
    }
    frame() {
      let t = this.kit,
        { w: e, h: i } = this;
      (t.rr(0, 0, e, i, 26).fill(It.glass),
        t
          .rr(0, 0, e, i, 26)
          .fill(t.lg(0, 0, 0, i * 0.6, ["rgba(120,180,255,.13)", "rgba(255,255,255,0)"]))
          .stroke("rgba(160,210,255,.26)", 1.6),
        this.movable && this.kit.z("$move", 0, 0, e, 58, { move: !0 }),
        t.t(this.emoji, 24, 31, 24, "#fff", "left"),
        t.t(this.title, this.emoji ? 62 : 24, 31, 21, "#dcecff", "left", 650),
        this.closable &&
          t.btn("$close", e - 56, 9, 42, 42, "✕", () => this.onClose && this.onClose(), {
            kind: "d",
            r: 21,
            size: 19,
          }));
    }
    hit(t) {
      let e = an / Math.max(1e-4, Math.hypot(t.x, t.z)),
        i = t.y * e,
        r = Di(Math.atan2(t.x, -t.z) - this.yaw),
        s = this.sc;
      if (t.x * t.x + t.z * t.z < 1e-4) return null;
      let o = (r * an) / sh / s + this.w / 2,
        a = this.h / 2 - (i - this.y) / sh / s;
      return { x: o, y: a, in: o >= 0 && a >= 0 && o <= this.w && a <= this.h };
    }
    pick(t, e) {
      for (let i = this.zones.length; i--; ) {
        let r = this.zones[i];
        if (t >= r.x && e >= r.y && t <= r.x + r.w && e <= r.y + r.h) return r;
      }
      return null;
    }
    dispose() {
      (U.sc.remove(this.mesh), this.mesh.geometry.dispose(), this.mesh.material.dispose(), this.tex.dispose());
    }
  };
  var M_ = [
      "library",
      "drums",
      "piano",
      "guitar",
      "launchpad",
      "scenes",
      "studio",
      "paint3d",
      "saber",
      "settings",
      "exit",
    ],
    wa = 0.17,
    fd = 0.035,
    qm = 6,
    oh = () => -an * U.view.tv * 0.76,
    S_ =
      "varying vec2 u;uniform float p;uniform vec3 c;void main(){vec2 q=u*2.-1.;float r=length(q);float a=atan(q.x,q.y)/6.28318+.5;if(a>p)discard;gl_FragColor=vec4(c,smoothstep(.72,.78,r)*smoothstep(1.,.94,r));}";
  function E_() {
    let n = new Wt(),
      t = new Jn(
        new Vn({ map: U.fx.dot(), color: new Tt(0.55, 1.2, 2), blending: un, depthTest: !1, transparent: !0 }),
      );
    (t.scale.setScalar(0.075), (t.renderOrder = 40));
    let e = new tt(
      new sn(0.17, 0.17),
      new Me({
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        uniforms: { p: { value: 0 }, c: { value: new Tt(1.4, 2, 2.4) } },
        vertexShader:
          "varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader: S_,
      }),
    );
    return (
      (e.renderOrder = 41),
      (e.visible = !1),
      n.add(t, e),
      (n.visible = !1),
      U.sc.add(n),
      { g: n, dot: t, ring: e, zone: null, panel: null, t: 0, fired: !1, cap: null, u: 0, lx: 0, ly: 0 }
    );
  }
  var _i = {
    panels: [],
    cur: new Map(),
    xp: null,
    homeYaw: 0,
    dockOn: 1,
    __v3: new R(),
    init() {
      let n = (this.toastC = document.createElement("canvas"));
      ((n.width = 1200), (n.height = 120), (this.toastX = n.getContext("2d")));
      let t = (this.toastT = new ln(n));
      t.colorSpace = Pe;
      let e = (this.toastS = new Jn(new Vn({ map: t, transparent: !0, depthTest: !1, opacity: 0 })));
      (e.scale.set(1.5, 0.15, 1),
        e.position.set(0, 0.56, -1.9),
        (e.renderOrder = 45),
        U.headG.add(e),
        (this.toastAt = -1e9),
        this.buildDock());
      let i = (this.orb = new Jn(new Vn({ map: new ln(this.orbTex()), transparent: !0, depthTest: !1 })));
      ((i.material.map.colorSpace = Pe),
        i.scale.setScalar(0.13),
        (i.renderOrder = 42),
        (i.visible = !1),
        U.headG.add(i),
        (this.palmT = 0),
        (this.palmHand = -1));
    },
    orbTex() {
      let n = document.createElement("canvas");
      n.width = n.height = 128;
      let t = n.getContext("2d");
      return (
        t.beginPath(),
        t.arc(64, 64, 58, 0, ve),
        (t.fillStyle = "rgba(8,20,60,.85)"),
        t.fill(),
        (t.lineWidth = 6),
        (t.strokeStyle = "#8fe3ff"),
        t.stroke(),
        (t.font = '60px "Segoe UI Emoji",sans-serif'),
        (t.textAlign = "center"),
        (t.textBaseline = "middle"),
        t.fillText("🏠", 64, 68),
        n
      );
    },
    toast(n) {
      let t = this.toastX;
      (t.clearRect(0, 0, 1200, 120), (t.font = `650 44px ${Sa}`));
      let e = Math.min(1160, t.measureText(n).width + 70);
      (t.beginPath(),
        t.roundRect(600 - e / 2, 16, e, 88, 44),
        (t.fillStyle = "rgba(6,14,36,.86)"),
        t.fill(),
        (t.lineWidth = 2),
        (t.strokeStyle = "rgba(143,227,255,.5)"),
        t.stroke(),
        (t.fillStyle = "#fff"),
        (t.textAlign = "center"),
        (t.textBaseline = "middle"),
        t.fillText(n, 600, 62, 1120),
        (this.toastT.needsUpdate = !0),
        (this.toastAt = U.now));
    },
    buildDock() {
      let n = (this.dock = new Wt());
      (U.sc.add(n), (this.dockIcons = []));
      let t = document.createElement("canvas");
      ((t.width = 512), (t.height = 96));
      let e = t.getContext("2d");
      (e.beginPath(),
        e.roundRect(3, 3, 506, 90, 34),
        (e.fillStyle = "rgba(14,20,40,.76)"),
        e.fill(),
        (e.lineWidth = 2.5),
        (e.strokeStyle = "rgba(255,255,255,.25)"),
        e.stroke());
      let i = new ln(t);
      ((i.colorSpace = Pe),
        (this.dockBar = new tt(new sn(1, 1), new $e({ map: i, transparent: !0, depthWrite: !1 }))),
        (this.dockBar.renderOrder = 18),
        n.add(this.dockBar));
      let r = (this.dockLC = document.createElement("canvas"));
      ((r.width = 512),
        (r.height = 80),
        (this.dockLT = new ln(r)),
        (this.dockLT.colorSpace = Pe),
        (this.dockLabel = new Jn(new Vn({ map: this.dockLT, transparent: !0, depthTest: !1 }))),
        this.dockLabel.scale.set(0.56, 0.088, 1),
        (this.dockLabel.renderOrder = 21),
        (this.dockLabel.visible = !1),
        n.add(this.dockLabel),
        (this.dockReady = !1));
    },
    dockFill() {
      this.dockReady = !0;
      let n = new sn(1, 1);
      for (let t of M_) {
        let e = Jr[t];
        if (!e) continue;
        let i = new ln(dd(e));
        i.colorSpace = Pe;
        let r = new tt(n, new $e({ map: i, transparent: !0, depthWrite: !1 }));
        ((r.renderOrder = 20), this.dock.add(r), this.dockIcons.push({ it: e, m: r, s: wa, ts: wa, hover: 0, a: 0 }));
      }
    },
    dockHit(n) {
      if (this.dockOn < 0.5 || !this.dock.visible) return null;
      let t = an / Math.max(1e-4, Math.hypot(n.x, n.z)),
        e = n.y * t,
        i = Di(Math.atan2(n.x, -n.z) - this.homeYaw),
        r = oh();
      if (e < r - 0.26 || e > r + 0.3) return null;
      let s = null,
        o = 0.13;
      for (let a of this.dockIcons) {
        let c = Math.abs(i - a.a);
        c < o && ((o = c), (s = a));
      }
      return s;
    },
    dockUpdate(n) {
      this.dockReady || this.dockFill();
      let t = this.xp ? 0 : 1;
      if (
        ((this.dockOn += (t - this.dockOn) * Fe(n, 10)), (this.dock.visible = this.dockOn > 0.02), !this.dock.visible)
      )
        return;
      let e = Di(ke.yaw - this.homeYaw);
      if ((Math.abs(e) > 0.95 && (this.homeYawT = ke.yaw), this.homeYawT !== void 0)) {
        let u = Di(this.homeYawT - this.homeYaw);
        ((this.homeYaw += u * Fe(n, 4)), Math.abs(u) < 0.01 && (this.homeYawT = void 0));
      }
      let i = -fd,
        r = null,
        s = [];
      for (let u of Xt.pointers) {
        let d = Di(Math.atan2(u.dir.x, -u.dir.z) - this.homeYaw),
          f = an / Math.max(1e-4, Math.hypot(u.dir.x, u.dir.z)),
          p = u.dir.y * f;
        p > oh() - 0.3 && p < oh() + 0.4 && s.push(d);
      }
      for (let u of this.dockIcons) {
        let d = 0;
        for (let f of s) d = Math.max(d, 1 - Math.min(1, Math.abs(f - u.a) / 0.26));
        ((u.ts = wa * (1 + 0.75 * d * d)), (u.s += (u.ts - u.s) * Fe(n, 20)), (i += u.s + fd), u.hover && (r = u));
      }
      let o = -i / 2,
        a = this.dockOn,
        c = Math.cos(this.homeYaw),
        l = Math.sin(this.homeYaw),
        h = oh();
      for (let u of this.dockIcons) {
        ((o += u.s / 2), (u.a = Math.atan2(o, an)));
        let d = o,
          f = -(an - 0.03),
          p = h + (u.s - wa) * 0.5 + (1 - a) * -0.2;
        (u.m.position.set(d * c - f * l, p, d * l + f * c),
          (u.m.rotation.y = -this.homeYaw),
          u.m.scale.setScalar(u.s * a),
          (o += u.s / 2 + fd));
      }
      if (
        (this.dockBar.position.set(l * an, h - 0.002, -c * an),
        (this.dockBar.rotation.y = -this.homeYaw),
        this.dockBar.scale.set((i + 0.12) * a, (wa + 0.08) * a, 1),
        r !== this._dl && ((this._dl = r), (this.dockLabel.visible = !!r), r))
      ) {
        let u = this.dockLC,
          d = u.getContext("2d");
        (d.clearRect(0, 0, 512, 80), (d.font = `650 40px ${Sa}`));
        let f = d.measureText(r.it.name).width + 44;
        (d.beginPath(),
          d.roundRect(256 - f / 2, 8, f, 64, 20),
          (d.fillStyle = "rgba(14,20,36,.94)"),
          d.fill(),
          (d.fillStyle = "#fff"),
          (d.textAlign = "center"),
          (d.textBaseline = "middle"),
          d.fillText(r.it.name, 256, 42),
          (this.dockLT.needsUpdate = !0));
      }
      if (r) {
        let u = r.a + this.homeYaw;
        this.dockLabel.position.set(Math.sin(u) * (an - 0.05), h + r.s + 0.03, -Math.cos(u) * (an - 0.05));
      }
    },
    openPanel(n) {
      let t = this.panels.find((a) => a.it === n && !a.closing);
      if (t) return (this.raise(t), t);
      let e = this.panels.filter((a) => a.it && !a.closing);
      if (e.length >= qm) return (this.toast("Máximo de " + qm + " janelas abertas"), null);
      let i = e.length,
        r = [0, -1, 1, -2, 2, 0][i % 6],
        s = ke.yaw + r * Math.min(0.72, ((n.w || 640) * 0.00165) / an + 0.05),
        o = new Ea({
          it: n,
          w: n.w,
          h: n.h,
          yaw: s,
          y: 0.14 - (i === 5 ? 0.1 : 0),
          q: n.q || 1.5,
          live: n.live || 0,
          title: n.name,
          emoji: n.emoji,
          draw: n.draw,
          st: {},
        });
      return ((o.onClose = () => this.closePanel(o)), this.panels.push(o), this.raise(o), n.init && n.init(o.st, o), o);
    },
    closePanel(n) {
      ((n.closing = !0), (n.tsc = 0.9), n.it && n.it.close && n.it.close(n.st, n));
    },
    raise(n) {
      let t = this.panels.indexOf(n);
      (this.panels.splice(t, 1),
        this.panels.push(n),
        this.panels.forEach((e, i) => {
          e.mesh.renderOrder = 6 + i * 0.1;
        }));
    },
    dirtyAll() {
      this.panels.forEach((n) => {
        n.dirty = !0;
      });
    },
    barPanel(n) {
      let t = new Ea({
        ...n,
        closable: !1,
        movable: !1,
        y: an * U.view.tv * 0.8,
        yaw: n.yaw,
        h: n.h || 84,
        w: n.w || 1120,
        q: 1.3,
      });
      return ((t.fixed = !0), this.panels.push(t), this.raise(t), t);
    },
    launch(n) {
      let t = Jr[n];
      if (t) return (U.audio && U.audio.click(), t.action ? t.action() : t.enter ? this.openXp(t) : this.openPanel(t));
    },
    home() {
      let n = this.panels.find((t) => t.it === Jr.library && !t.closing);
      n ? this.closePanel(n) : this.launch("library");
    },
    openXp(n) {
      if (this.xp && this.xp.it === n) {
        this.closeXp();
        return;
      }
      this.closeXp();
      let t = this.panels.find((c) => c.it === Jr.library && !c.closing);
      t && this.closePanel(t);
      let e = new Wt();
      (e.scale.setScalar(1e-4), U.sc.add(e));
      let i = U.view,
        r = n.fit ? n.fit / (2 * i.tv * i.aspect * 0.96) : 0,
        s = n.dist ?? 2.1,
        o = (this.xp = {
          it: n,
          g: e,
          yaw: ke.yaw,
          t: 0,
          s: 0,
          st: {},
          dist: Math.max(s, r),
          y: (n.y ?? -0.3) * Math.max(1, r / (s || 1)),
          scale: 1,
        });
      (this.placeXp(o),
        (U.toolLen = n.toolLen || 2.4),
        (U.handview.tool = n.tool || null),
        (U.handview.wantTips = !!n.tips),
        n.enter(o));
      let a = (o.bar = this.barPanel({
        yaw: o.yaw,
        st: o,
        title: n.name,
        emoji: n.emoji,
        chrome: !1,
        draw: (c, l, h) => this.drawBar(c, o, h),
        live: n.barLive || 0,
      }));
      ((a.st = o), this.toast(n.name));
    },
    placeXp(n) {
      (n.g.position.set(Math.sin(n.yaw) * n.dist, n.y, -Math.cos(n.yaw) * n.dist), (n.g.rotation.y = -n.yaw));
    },
    closeXp() {
      let n = this.xp;
      n &&
        (n.it.exit && n.it.exit(n),
        U.sc.remove(n.g),
        this.disposeG(n.g),
        n.bar && this.closePanel(n.bar),
        (this.xp = null),
        (U.handview.tool = null),
        (U.handview.wantTips = !1),
        (U.toolLen = 2.4),
        U.world.setOverride && U.world.setOverride(null));
    },
    disposeG(n) {
      n.traverse((t) => {
        if ((t.geometry && t.geometry.dispose(), t.material && !t.material.shared)) {
          let e = t.material;
          (Array.isArray(e) ? e : [e]).forEach((i) => i.dispose());
        }
      });
    },
    drawBar(n, t, e) {
      let { w: i, h: r } = e;
      (n.rr(0, 0, i, r, 26).fill("rgba(9,15,34,.82)").stroke("rgba(160,210,255,.26)", 1.6),
        n.t(t.it.emoji, 26, r / 2, 28, "#fff", "left"),
        n.t(t.it.name, 68, r / 2, 21, "#fff", "left", 700),
        n.btn("$h", i - 164, (r - 52) / 2, 70, 52, "🏠", () => this.home(), { r: 22 }),
        n.btn("$x", i - 86, (r - 52) / 2, 70, 52, "✕", () => this.closeXp(), { kind: "d", r: 22 }),
        t.it.bar && t.it.bar(n, t, e, 218, i - 176));
    },
    update(n) {
      this.dockUpdate(n);
      let t = Xt.pointers,
        e = new Set();
      for (let s of this.dockIcons) s.hover = 0;
      for (let s of this.panels) ((s._h = s.hover), (s.hover = new Set()));
      for (let s of t) {
        e.add(s.id);
        let o = this.cur.get(s.id);
        (o || ((o = E_()), this.cur.set(s.id, o)), this.route(s, o, n));
      }
      for (let [s, o] of this.cur)
        e.has(s) ||
          (o.cap && (o.cap = null),
          (o.g.visible = !1),
          (o.panel = null),
          (o.zone = null),
          (o.ring.visible = !1),
          s[0] === "t" && (U.sc.remove(o.g), this.cur.delete(s)));
      this.palm(n);
      let i = 2;
      for (let s = this.panels.length; s--; ) {
        let o = this.panels[s],
          a = o._h.size !== o.hover.size;
        if (!a) {
          for (let l of o._h)
            if (!o.hover.has(l)) {
              a = !0;
              break;
            }
        }
        (a && (o.dirty = !0), (o.sc += (o.tsc - o.sc) * Fe(n, 16)));
        let c = o.mesh.material;
        if (((c.opacity += ((o.closing ? 0 : 1) - c.opacity) * Fe(n, 16)), o.place(), o.closing && c.opacity < 0.03)) {
          (o.dispose(), this.panels.splice(s, 1));
          continue;
        }
        (o.it && o.it.tick && o.it.tick(n, o.st, o),
          o.live && U.now - o.last > 1e3 / o.live && (o.dirty = !0),
          o.dirty && i > 0 && !o.closing && (o.redraw(), i--));
      }
      let r = (U.now - this.toastAt) / 1e3;
      ((this.toastS.material.opacity = $t(Math.min(r * 6, (3 - r) * 2))), this.xp && this.xpUpdate(n));
    },
    route(n, t, e) {
      let i = null,
        r = null,
        s = null;
      if (t.cap && t.cap.panel) {
        let u = t.cap.panel,
          d = u.hit(n.dir);
        if (t.cap.move) {
          let f = Math.atan2(n.dir.x, -n.dir.z),
            p = an / Math.max(1e-4, Math.hypot(n.dir.x, n.dir.z)),
            x = n.dir.y * p;
          ((u.yaw = f - t.cap.oa), (u.y = $t(x - t.cap.oy, -0.8, 1.3)));
        } else
          d &&
            t.cap.z.drag &&
            (t.cap.z.drag(d.x - t.lx, d.y - t.ly, d.x, d.y), (u.dirty = !0), (t.lx = d.x), (t.ly = d.y));
        ((n.up || !n.pinch) && ((t.cap = null), u.press.clear(), (u.dirty = !0)), (i = u), (r = d), (n.overUI = !0));
      } else {
        if (((s = this.dockHit(n.dir)), !s))
          for (let u = this.panels.length; u--; ) {
            let d = this.panels[u];
            if (d.closing) continue;
            let f = d.hit(n.dir);
            if (f && f.in) {
              ((i = d), (r = f));
              break;
            }
          }
        n.overUI = !!(i || s);
      }
      let o = i && r ? i.pick(r.x, r.y) : null;
      (s && (s.hover = 1), i && o && i.hover.add(o.id));
      let a = s ? "dock:" + s.it.id : o ? o.id + "@" + (i.uid || (i.uid = Math.random())) : null;
      (a !== t.zone &&
        ((t.zone = a),
        (t.t = 0),
        (t.fired = !1),
        o && o.touch && (o.touch(), (i.dirty = !0)),
        a && q.hover && (s || (o && o.click)) && U.audio && U.audio.tick()),
        (t.panel = i));
      let c = s ? () => this.launch(s.it.id) : o && o.click ? o.click : null;
      if (n.down && !t.cap) {
        if (s) (c(), (t.fired = !0));
        else if (o)
          if ((i.fixed || this.raise(i), i.press.add(o.id), (i.dirty = !0), o.move)) {
            let u = Math.atan2(n.dir.x, -n.dir.z),
              d = an / Math.max(1e-4, Math.hypot(n.dir.x, n.dir.z));
            t.cap = { panel: i, move: !0, oa: u - i.yaw, oy: n.dir.y * d - i.y };
          } else
            o.drag
              ? ((t.cap = { panel: i, z: o }), (t.lx = r.x), (t.ly = r.y), o.drag(0, 0, r.x, r.y))
              : c &&
                (c(),
                (t.fired = !0),
                (i.dirty = !0),
                setTimeout(() => {
                  (i.press.clear(), (i.dirty = !0));
                }, 110));
      }
      let l = 0;
      q.dwell &&
        c &&
        n.src === "hand" &&
        !n.pinch &&
        !t.fired &&
        !o?.drag &&
        ((t.t += e), (l = t.t / q.dw), l >= 1 && (c(), (t.fired = !0), (l = 0), i && (i.dirty = !0)));
      let h = i || s;
      if (((t.g.visible = !!h || n.src !== "hand"), t.g.visible)) {
        let u = (an - 0.05) / Math.max(1e-4, Math.hypot(n.dir.x, n.dir.z)),
          d = Math.min(u, h ? u : 1.8);
        (t.g.position.copy(n.dir).multiplyScalar(d),
          t.g.quaternion.copy(U.cam.quaternion),
          t.dot.scale.setScalar(n.pinch ? 0.05 : 0.085),
          (t.ring.visible = l > 0.03),
          t.ring.visible && (t.ring.material.uniforms.p.value = l));
      }
    },
    palm(n) {
      let t = !1,
        e = null;
      for (let s of Ke.slots) s.live && !s.lite && s.facing && s.open && ((t = !0), (e = s));
      ((this.palmT = t ? Math.min(0.8, this.palmT + n) : Math.max(0, this.palmT - n * 1.4)),
        t && (this.palmHand = e.i));
      let i = this.palmT > 0.3 && this.palmHand >= 0,
        r = this.orb;
      if (((r.visible = i), i)) {
        let s = Ke.slots[this.palmHand],
          o = U.view.tv * 2,
          a = 1;
        (r.position.set(s.x(9) * o * a, -s.y(9) * o * a + 0.05, -a),
          r.scale.setScalar(0.12 * $t((this.palmT - 0.3) * 5)));
        let c = Xt.pointers.find((l) => l.slot === this.palmHand);
        c && c.down && ((this.palmT = 0), this.home());
      }
    },
    xpUpdate(n) {
      let t = this.xp;
      ((t.t += n),
        (t.s += (t.scale - t.s) * Fe(n, 8)),
        t.g.scale.setScalar(Math.max(1e-4, t.s)),
        t.it.update && t.it.update(n, t));
    },
    recenter() {
      let n = Di(ke.yaw);
      (ke.recenter(), (this.homeYaw = 0), (this.homeYawT = void 0));
      for (let t of this.panels) t.yaw = Di(t.yaw - n);
      (this.xp && ((this.xp.yaw = Di(this.xp.yaw - n)), this.placeXp(this.xp)), this.toast("Visão recentrada"));
    },
  };
  U.shell = _i;
