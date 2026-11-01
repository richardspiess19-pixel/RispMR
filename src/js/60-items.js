  function Ym(n, t = !1) {
    let e = n[0].index !== null,
      i = new Set(Object.keys(n[0].attributes)),
      r = new Set(Object.keys(n[0].morphAttributes)),
      s = {},
      o = {},
      a = n[0].morphTargetsRelative,
      c = new Ae();
    c.morphTargetsRelative = a;
    let l = 0;
    for (let h = 0; h < n.length; ++h) {
      let u = n[h],
        d = 0,
        f = 0;
      if (e !== (u.index !== null))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
          ),
          null
        );
      for (let p in u.attributes) {
        if (!i.has(p))
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                h +
                '. All geometries must have compatible attributes; make sure "' +
                p +
                '" attribute exists among all geometries, or in none of them.',
            ),
            null
          );
        (s[p] === void 0 && (s[p] = []), s[p].push(u.attributes[p]), d++);
      }
      if (d !== i.size)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". Make sure all geometries have the same number of attributes.",
          ),
          null
        );
      if (a !== u.morphTargetsRelative)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". .morphTargetsRelative must be consistent throughout all geometries.",
          ),
          null
        );
      for (let p in u.morphAttributes) {
        if (!r.has(p))
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                h +
                ".  .morphAttributes must be consistent throughout all geometries.",
            ),
            null
          );
        if (u.morphAttributes[p].length !== n[0].morphAttributes[p].length)
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                h +
                '. All geometries must have the same number of morph targets for the "' +
                p +
                '" morph attribute.',
            ),
            null
          );
        (o[p] === void 0 && (o[p] = []), o[p].push(u.morphAttributes[p]), f++);
      }
      if (f !== r.size)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". Make sure all geometries have the same number of morph attributes.",
          ),
          null
        );
      if (t) {
        let p;
        if (e) p = u.index.count;
        else if (u.attributes.position !== void 0) p = u.attributes.position.count;
        else
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                h +
                ". The geometry must have either an index or a position attribute",
            ),
            null
          );
        (c.addGroup(l, p, h), (l += p));
      }
    }
    if (e) {
      let h = 0,
        u = [];
      for (let d = 0; d < n.length; ++d) {
        let f = n[d].index;
        for (let p = 0; p < f.count; ++p) u.push(f.getX(p) + h);
        h += n[d].attributes.position.count;
      }
      c.setIndex(u);
    }
    for (let h in s) {
      let u = $m(s[h]);
      if (!u)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " attribute.",
          ),
          null
        );
      c.setAttribute(h, u);
    }
    for (let h in o) {
      let u = o[h][0].length;
      if (u !== 0) {
        ((c.morphAttributes = c.morphAttributes || {}), (c.morphAttributes[h] = []));
        for (let d = 0; d < u; ++d) {
          let f = [];
          for (let x = 0; x < o[h].length; ++x) f.push(o[h][x][d]);
          let p = $m(f);
          if (!p)
            return (
              console.error(
                "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
                  h +
                  " morphAttribute.",
              ),
              null
            );
          c.morphAttributes[h].push(p);
        }
      }
    }
    return c;
  }
  function $m(n) {
    let t,
      e,
      i,
      r = -1,
      s = 0;
    for (let l = 0; l < n.length; ++l) {
      let h = n[l];
      if ((t === void 0 && (t = h.array.constructor), t !== h.array.constructor))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
          ),
          null
        );
      if ((e === void 0 && (e = h.itemSize), e !== h.itemSize))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
          ),
          null
        );
      if ((i === void 0 && (i = h.normalized), i !== h.normalized))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
          ),
          null
        );
      if ((r === -1 && (r = h.gpuType), r !== h.gpuType))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
          ),
          null
        );
      s += h.count * e;
    }
    let o = new t(s),
      a = new Le(o, e, i),
      c = 0;
    for (let l = 0; l < n.length; ++l) {
      let h = n[l];
      if (h.isInterleavedBufferAttribute) {
        let u = c / e;
        for (let d = 0, f = h.count; d < f; d++)
          for (let p = 0; p < e; p++) {
            let x = h.getComponent(d, p);
            a.setComponent(d + u, p, x);
          }
      } else o.set(h.array, c);
      c += h.count * e;
    }
    return (r !== void 0 && (a.gpuType = r), a);
  }
  var w_ = 0,
    En = (n) => ye({ cat: "inst", c: Ge.inst[w_++ % 4], ...n }),
    jm = new qe(),
    ah = new R();
  function bi(n, t, e) {
    let i = n.g.scale.x;
    (n.g.scale.setScalar(n.scale), n.g.updateWorldMatrix(!0, !0));
    let r = e.getWorldScale(new R()).x;
    for (let s of t) ((s.w = (s.obj || e).localToWorld(s.p.clone())), (s.wr = s.r * r), (s.a = s.a || 0));
    (n.g.scale.setScalar(i), n.g.updateWorldMatrix(!0, !0));
  }
  function Mi(n, t, e = 1) {
    let i = null,
      r = 1e9;
    for (let s of n) {
      let o = s.w.dot(t);
      if (o <= 0) continue;
      let a = s.w.lengthSq() - o * o,
        c = s.wr * e,
        l = a / (c * c);
      l < 1 && l < r && ((r = l), (i = s));
    }
    return i;
  }
  var Qs = new le(),
    to = new R(),
    Rr = new R();
  function Aa(n, t, e, i) {
    if (
      (Qs.copy(n.matrixWorld).invert(),
      to.set(0, 0, 0).applyMatrix4(Qs),
      Rr.copy(t).transformDirection(Qs),
      Math.abs(Rr.y) < 1e-4)
    )
      return null;
    let r = (e - to.y) / Rr.y;
    return r <= 0 ? null : i.copy(to).addScaledVector(Rr, r);
  }
  function Km(n, t, e, i) {
    if (
      (Qs.copy(n.matrixWorld).invert(),
      to.set(0, 0, 0).applyMatrix4(Qs),
      Rr.copy(t).transformDirection(Qs),
      Math.abs(Rr.z) < 1e-4)
    )
      return null;
    let r = (e - to.z) / Rr.z;
    return r <= 0 ? null : i.copy(to).addScaledVector(Rr, r);
  }
  function eo(n, t) {
    (jm.copy(ke.q).invert(), ah.copy(n).applyQuaternion(jm));
    let e = 1 / (Math.max(0.01, -ah.z) * 2 * U.view.tv);
    return ((t.x = ah.x * e), (t.y = -ah.y * e), t);
  }
  var Si = (n, t, e = 8) => ((n.a -= n.a * Fe(t, e)), n.a),
    ni = (n, t = 1) => {
      n.a = Math.max(n.a, t);
    },
    Ta = class {
      constructor(t) {
        ((this.n = t),
          (this.A = Array.from({ length: t }, () => ({ x: 0, y: 0 }))),
          (this.B = Array.from({ length: t }, () => ({ x: 0, y: 0 }))),
          (this.side = new Int8Array(10 * t)));
      }
      project(t) {
        t.forEach((e, i) => {
          (eo(e.a, this.A[i]), eo(e.b, this.B[i]));
        });
      }
      test(t, e, i = 0.0035) {
        for (let r = 0; r < this.n; r++) {
          let s = this.A[r],
            o = this.B[r],
            a = o.x - s.x,
            c = o.y - s.y,
            l = Math.hypot(a, c) || 1,
            h = ((t.x - s.x) * c - (t.y - s.y) * a) / l,
            u = ((t.x - s.x) * a + (t.y - s.y) * c) / (l * l),
            d = t.key * this.n + r,
            f = this.side[d];
          if (u < -0.02 || u > 1.02) {
            this.side[d] = 0;
            continue;
          }
          let p = h > i ? 1 : h < -i ? -1 : f;
          (f && p && p !== f && e(r, Math.hypot(t.vx, t.vy), u), (this.side[d] = p));
        }
      }
    };
  var Yt = (n, t = 0.5, e = 0, i = {}) => new yr({ color: n, roughness: t, metalness: e, ...i }),
    Qe = (n, t = 3) => new $e({ color: new Tt(n).multiplyScalar(t) }),
    ii = () => Yt(15265532, 0.16, 1),
    no = () => Yt(14856778, 0.24, 1),
    Jm = () => Yt(10135226, 0.3, 1),
    ch = () => Yt(395020, 0.12, 0.2),
    pd = {};
  function T_(n, t, e = n + t) {
    if (pd[e]) return pd[e];
    let i = document.createElement("canvas");
    ((i.width = 512), (i.height = 256));
    let r = i.getContext("2d");
    ((r.fillStyle = n), r.fillRect(0, 0, 512, 256), (r.strokeStyle = t));
    for (let o = 0; o < 130; o++) {
      ((r.globalAlpha = Zt(0.05, 0.3)), (r.lineWidth = Zt(0.5, 2.4)), r.beginPath());
      let a = Zt(256);
      r.moveTo(0, a);
      for (let c = 1; c <= 6; c++) r.lineTo(c * 86, a + Math.sin(c + a) * Zt(2, 9));
      r.stroke();
    }
    let s = new ln(i);
    return ((s.colorSpace = Pe), (s.wrapS = s.wrapT = gr), (pd[e] = s), s);
  }
  var Nn = (n = "#7a4524", t = "#2c150a", e = 0.42) => Yt(16777215, e, 0, { map: T_(n, t) });
  function Fn(n, t = 0.1, e = "#fff", i = "#2f8cff") {
    let r = document.createElement("canvas"),
      s = r.getContext("2d");
    ((s.font = "700 64px system-ui,sans-serif"),
      (r.width = Math.ceil(s.measureText(n).width + 48)),
      (r.height = 100),
      (s.font = "700 64px system-ui,sans-serif"),
      (s.textAlign = "center"),
      (s.textBaseline = "middle"),
      (s.shadowColor = i),
      (s.shadowBlur = 16),
      (s.fillStyle = e),
      s.fillText(n, r.width / 2, 52));
    let o = new ln(r);
    o.colorSpace = Pe;
    let a = new Jn(new Vn({ map: o, transparent: !0, depthWrite: !1 }));
    return (a.scale.set((t * r.width) / 100, t, 1), (a.renderOrder = 12), a);
  }
  function lh() {
    let n = document.createElement("canvas");
    n.width = n.height = 512;
    let t = n.getContext("2d");
    ((t.fillStyle = "#f4f8ff"),
      t.fillRect(0, 0, 512, 512),
      (t.textAlign = "center"),
      (t.font = "italic 900 148px system-ui,sans-serif"),
      (t.fillStyle = "#123fd0"),
      t.fillText("RISP", 256, 262),
      (t.fillStyle = "#18a8ff"),
      (t.font = "italic 900 112px system-ui,sans-serif"),
      t.fillText("MR X", 256, 378));
    let e = new ln(n);
    return ((e.colorSpace = Pe), e);
  }
  function ri(n) {
    let t = new Wt(),
      e = new tt(
        new Re(n, n * 1.04, 0.03, 64),
        Yt(399423, 0.35, 0.3, { emissive: 666234, emissiveIntensity: 0.5, transparent: !0, opacity: 0.62 }),
      ),
      i = new tt(new hn(n, 0.01, 8, 96), Qe(5227519, 2.4));
    return ((i.rotation.x = Math.PI / 2), t.add(e, i), t);
  }
  var A_ = {
    kick: 3116287,
    snare: 16777215,
    hat: 16766042,
    tom1: 5943551,
    tom2: 5943551,
    floor: 5012991,
    crash: 16763210,
    crash2: 16763210,
    ride: 16758858,
    cowbell: 16769162,
  };
  En({
    id: "drums",
    name: "Bateria",
    emoji: "🥁",
    tool: "stick",
    toolLen: 2.5,
    dist: 2.45,
    y: -0.2,
    fit: 3.3,
    desc: "Baquetas nas mãos e força real em cada batida",
    enter(n) {
      W.prepareDrums(["kick", "snare", "hat", "ohat", "tom1", "tom2", "floor", "crash", "crash2", "ride", "cowbell"]);
      let t = new Wt(),
        e = (n.st.T = []);
      ((t.rotation.x = 0.3), t.scale.setScalar(0.95), n.g.add(t));
      let i = ri(2);
      ((i.position.y = -0.84), n.g.add(i));
      let r = ii(),
        s = no(),
        o = Yt(1788120, 0.28, 0.55);
      function a(p, x, g, m, y, E) {
        let _ = new Wt();
        (_.position.set(x, g, m), t.add(_));
        let T = new re(0.026, E * 0.78, 0.03),
          w = [];
        for (let F = 0; F < 8; F++) {
          let I = (F / 8) * ve;
          w.push(T.clone().translate(Math.cos(I) * y, 0, Math.sin(I) * y));
        }
        (_.add(new tt(Ym(w), r)),
          _.add(new tt(new Re(y, y, E, 40, 1, !0), o)),
          [1, -1].forEach((F) => {
            let I = new tt(new hn(y, 0.015, 8, 44), r);
            ((I.rotation.x = Math.PI / 2), (I.position.y = (F * E) / 2), _.add(I));
          }));
        let v = Yt(15922943, 0.55, 0, { emissive: 4175103, emissiveIntensity: 0 }),
          S = new tt(new Re(y * 1.02, y * 1.02, 0.018, 40), v);
        ((S.position.y = E / 2), _.add(S), e.push({ id: p, obj: S, p: new R(), r: y * 1.35, m: v, d: _, y: g }));
      }
      function c(p, x, g, m, y, E, _) {
        let T = new Wt();
        (T.position.set(x, g, m), t.add(T));
        let w = [
            [0, 0.06],
            [0.05, 0.052],
            [0.09, 0.018],
            [0.13, 0],
            [y, -0.012],
            [y, -0.02],
          ].map((N) => new st(N[0], N[1])),
          v = s.clone();
        ((v.side = He), (v.emissive = new Tt(16760896)), (v.emissiveIntensity = 0));
        let S = new tt(new Ji(w, 48), v);
        if (((S.rotation.x = E), T.add(S), _)) {
          let N = new tt(S.geometry, v);
          ((N.rotation.x = E), (N.position.y = -0.05), T.add(N));
        }
        let F = g + 0.82,
          I = new tt(new Re(0.012, 0.012, F, 8), r);
        ((I.position.y = -F / 2),
          T.add(I),
          e.push({ id: p, obj: S, p: new R(), r: y * 1.25, cym: S, tilt: E, mt: v, w: 0 }));
      }
      let l = new Wt();
      (l.position.set(0, -0.26, -0.25), t.add(l));
      let h = new tt(new Re(0.52, 0.52, 0.5, 48, 1, !0), o);
      ((h.rotation.x = Math.PI / 2),
        l.add(h),
        [0.25, -0.25].forEach((p) => {
          let x = new tt(new hn(0.525, 0.022, 10, 56), r);
          ((x.position.z = p), l.add(x));
        }));
      let u = Yt(16777215, 0.5, 0, { map: lh(), emissive: 3116287, emissiveIntensity: 0 }),
        d = new tt(new Zn(0.51, 48), u);
      ((d.position.z = 0.256),
        l.add(d),
        e.push({ id: "kick", obj: d, p: new R(), r: 0.46, m: u, d: l, y: -0.26 }),
        a("snare", -0.82, -0.12, 0.2, 0.3, 0.16),
        a("tom1", -0.3, 0.44, -0.15, 0.25, 0.2),
        a("tom2", 0.3, 0.44, -0.15, 0.25, 0.2),
        a("floor", 0.98, -0.1, 0.05, 0.34, 0.3),
        c("crash", -1, 0.98, -0.3, 0.4, 0.15),
        c("crash2", 0.5, 1.14, -0.42, 0.34, 0.12),
        c("ride", 1.2, 0.78, -0.3, 0.44, -0.1),
        c("hat", -1.55, 0.28, 0.05, 0.27, 0, !0));
      let f = new tt(new Re(0.07, 0.12, 0.2, 6), Yt(2764086, 0.4, 0.9, { emissive: 16756800, emissiveIntensity: 0 }));
      (f.position.set(0, 0.86, -0.22),
        (f.rotation.x = 1.2),
        t.add(f),
        e.push({ id: "cowbell", obj: f, p: new R(), r: 0.13, m: f.material }),
        (n.st.hud = Fn("Bata de cima para baixo", 0.08)),
        n.st.hud.position.set(0, 1.42, -0.2),
        n.g.add(n.st.hud),
        (n.scale = 1),
        bi(n, e, t),
        (n.st.k = t),
        (n.st.hi = [null, null]),
        (n.st.hat = 0));
    },
    update(n, t) {
      let { T: e } = t.st;
      Xt.tools.forEach((i) => {
        let r = Mi(e, i.dir, 1.2);
        if (i.strike && r) {
          let s = i.strike,
            o = r.id === "hat" && U.tracker.slots[i.hand].open ? "ohat" : r.id;
          (W.drum(o, s, { pan: Math.max(-0.6, Math.min(0.6, r.p.x * 0.3)) }),
            ni(r, Math.min(1, s + 0.2)),
            ee.hit(r.w, A_[r.id], s),
            navigator.vibrate && navigator.vibrate(5),
            (t.st.hud.visible = !1));
        }
      });
      for (let i of e) {
        let r = Si(i, n, i.cym ? 3.2 : 12);
        (i.m && ((i.m.emissiveIntensity = r * 2.2), i.d && i.y !== void 0 && (i.d.position.y = i.y - r * 0.022)),
          i.cym &&
            ((i.cym.rotation.x = i.tilt + Math.sin(t.t * 34) * r * 0.1),
            (i.cym.rotation.z = Math.cos(t.t * 27) * r * 0.06),
            (i.mt.emissiveIntensity = r * 1.6)));
      }
    },
  });
  var we = {
      bpm: 110,
      on: !1,
      step: 0,
      next: 0,
      subs: new Set(),
      swing: 0,
      timer: 0,
      get sd() {
        return 60 / this.bpm / 4;
      },
      start() {
        this.on ||
          !W.ctx ||
          ((this.on = !0),
          (this.step = 0),
          (this.next = W.ctx.currentTime + 0.08),
          (this.timer = setInterval(() => this.pump(), 25)));
      },
      stop() {
        ((this.on = !1), clearInterval(this.timer));
      },
      pump() {
        let n = W.ctx;
        if (n)
          for (; this.next < n.currentTime + 0.14; ) {
            let t = this.step % 2 ? this.swing * this.sd : 0;
            for (let e of this.subs) e(this.step, this.next + t, this.sd);
            ((this.next += this.sd), this.step++);
          }
      },
      sub(n) {
        return (this.subs.add(n), () => this.subs.delete(n));
      },
      need() {
        this.on || this.start();
      },
      release() {
        this.subs.size || this.stop();
      },
    },
    hh = (n) => [...n].map((t) => (t === "." ? 0 : t === "x" ? 1 : t === "o" ? 0.6 : 0.35)),
    Zm = {
      pop: [
        [0, "M"],
        [7, "M"],
        [9, "m"],
        [5, "M"],
      ],
      rock: [
        [0, "M"],
        [5, "M"],
        [7, "M"],
        [5, "M"],
      ],
      sad: [
        [9, "m"],
        [5, "M"],
        [0, "M"],
        [7, "M"],
      ],
      jazz: [
        [2, "m7"],
        [7, "7"],
        [0, "M7"],
        [9, "m7"],
      ],
      bossa: [
        [0, "M7"],
        [2, "m7"],
        [4, "m7"],
        [7, "7"],
      ],
      funk: [
        [9, "m7"],
        [9, "m7"],
        [2, "7"],
        [2, "7"],
      ],
      lofi: [
        [5, "M7"],
        [4, "m7"],
        [2, "m7"],
        [0, "M7"],
      ],
    },
    R_ = { M: [0, 4, 7], m: [0, 3, 7], M7: [0, 4, 7, 11], m7: [0, 3, 7, 10], 7: [0, 4, 7, 10] },
    Bi = {
      rock: {
        n: "Rock",
        bpm: 118,
        k: "x.....x.x.......",
        s: "....x.......x...",
        h: "x.o.x.o.x.o.x.o.",
        b: [0, 0, null, 0, 0, null, 0, 0, 0, 0, null, 0, 0, null, 7, 5],
        ch: "rock",
        c: "x...............",
        pad: "eguitar",
      },
      pop: {
        n: "Pop",
        bpm: 104,
        k: "x...x...x...x.x.",
        s: "....x.......x...",
        h: "x.x.x.x.x.x.x.x.",
        b: [0, null, null, 0, null, null, 0, null, 0, null, null, 0, null, null, 7, null],
        ch: "pop",
        c: "x.....x.....x...",
        pad: "epiano",
      },
      funk: {
        n: "Funk",
        bpm: 112,
        sw: 0.1,
        k: "x..x..x...x.....",
        s: "....x..o.o..x..o",
        h: "xoxoxoxoxoxoxoxo",
        b: [0, null, 12, 0, null, 10, 0, null, 3, null, 5, null, 7, 10, 12, null],
        ch: "funk",
        c: "..x...x...x..x..",
        pad: "epiano",
      },
      bossa: {
        n: "Bossa",
        bpm: 128,
        sw: 0.05,
        k: "x..x....x..x....",
        s: "o..o..o...o..o..",
        h: "x.x.x.x.x.x.x.x.",
        b: [0, null, null, 7, null, null, 0, null, 7, null, null, 0, null, null, 7, null],
        ch: "bossa",
        c: "x..x..x...x..x..",
        pad: "acoustic",
        rim: !0,
      },
      lofi: {
        n: "Lo-fi",
        bpm: 78,
        sw: 0.16,
        k: "x.....x...x.....",
        s: "....x.......x...",
        h: "x.o.x.o.x.o.x.o.",
        b: [0, null, null, null, null, null, 7, null, 5, null, null, null, 3, null, null, null],
        ch: "lofi",
        c: "x.......x.......",
        pad: "epiano",
      },
      trap: {
        n: "Trap",
        bpm: 140,
        k: "x......x..x.....",
        s: "........x.......",
        h: "xoxoxoxoxxxoxoxx",
        b: [0, null, null, null, null, null, null, 0, null, null, 3, null, null, null, null, null],
        ch: "sad",
        c: "x...............",
        pad: "bell",
        sub: !0,
        kick: "kick808",
      },
      house: {
        n: "House",
        bpm: 124,
        k: "x...x...x...x...",
        s: "....x.......x...",
        h: "..x...x...x...x.",
        b: [0, null, null, 0, null, null, 0, null, 0, null, null, 0, null, 3, null, null],
        ch: "sad",
        c: "..x..x....x..x..",
        pad: "stab",
        clap: !0,
      },
      reggae: {
        n: "Reggae",
        bpm: 84,
        sw: 0.08,
        k: "........x.......",
        s: "........x.......",
        h: "x.x.x.x.x.x.x.x.",
        b: [0, null, null, null, 7, null, 7, null, null, null, 5, null, 3, null, null, null],
        ch: "pop",
        c: "..x...x...x...x.",
        pad: "eguitar",
      },
    };
  for (let n in Bi) {
    let t = Bi[n];
    ((t.K = hh(t.k)), (t.S = hh(t.s)), (t.H = hh(t.h)), (t.C = hh(t.c)));
  }
  var md = (n, t, e = 60) => R_[t].map((i) => e + n + i),
    cr = [0, 2, 4, 7, 9],
    uh = [0, 2, 4, 5, 7, 9, 11],
    Ra = (n, t = uh) => {
      let e = q.key || 0,
        i = (((n - e) % 12) + 12) % 12,
        r = t[0],
        s = 99;
      for (let o of t) {
        let a = Math.abs(o - i);
        a < s && ((s = a), (r = o));
      }
      return n + r - i;
    },
    _e = {
      style: null,
      off: null,
      bar: 0,
      chord: null,
      drums: !0,
      bassOn: !0,
      chordsOn: !0,
      gain: 0.8,
      melody: !1,
      async play(n) {
        (this.stop(), W.init());
        let t = (this.style = Bi[n]);
        ((we.bpm = t.bpm),
          (we.swing = t.sw || 0),
          await W.prepareDrums(["kick", "kick808", "snare", "hat", "clap", "rim", "shaker"]),
          this.style === t && ((this.off = we.sub((e, i, r) => this.step(e, i, r))), we.need()));
      },
      stop() {
        (this.off && (this.off(), (this.off = null)), (this.style = null), we.release());
      },
      step(n, t, e) {
        let i = this.style,
          r = n % 16,
          s = ((n / 16) | 0) % 4,
          o = Zm[i.ch],
          a = o[s],
          c = q.key || 0,
          l = this.gain;
        this.chord = a;
        let h = { when: t, silent: !0 };
        this.drums &&
          (i.K[r] && W.drum(i.kick || "kick", 0.85 * i.K[r], { ...h, gain: l }),
          i.S[r] && W.drum(i.rim ? "rim" : "snare", 0.8 * i.S[r], { ...h, gain: l }),
          i.clap && i.S[r] && W.drum("clap", 0.6, { ...h, gain: l }),
          i.H[r] && W.drum(i.rim ? "shaker" : "hat", 0.55 * i.H[r], { ...h, gain: l * 0.6, pan: 0.2 }));
        let u = i.b[r];
        if (
          (this.bassOn &&
            u !== null &&
            W.note(i.sub ? "sub" : "bass", 36 + c + a[0] + u - (a[0] > 6 ? 12 : 0), 0.8, {
              ...h,
              gain: l,
              group: "bb",
            }),
          this.chordsOn && i.C[r])
        )
          for (let [d, f] of md(a[0] + c, a[1], 60).entries())
            W.note(i.pad, f - (i.pad === "eguitar" ? 12 : 0), 0.5 * i.C[r], {
              ...h,
              gain: l * 0.6,
              pan: (d - 1) * 0.15,
            });
        (this.melody &&
          r % 2 === 0 &&
          Math.random() < 0.45 &&
          W.note("epiano", 72 + c + yi(cr) + yi([0, 0, 12]), 0.5, { ...h, gain: l * 0.6, pan: 0.15 }),
          this.onStep && this.onStep(n, t));
      },
    },
    Un = {
      tracks: [0, 1, 2, 3].map(() => ({ ev: [], mute: !1 })),
      rec: -1,
      bars: 2,
      off: null,
      pos: 0,
      count: 0,
      get len() {
        return this.bars * 16;
      },
      ensure() {
        (this.off || ((this.off = we.sub((n, t, e) => this.step(n, t, e))), we.need()),
          (!W.onNote || W.onNote === this.hook) && (W.onNote = this.hook));
      },
      hook: (n) => {
        let t = Un;
        if (t.rec < 0 || !we.on) return;
        let e = W.ctx.currentTime,
          i = we.step - (we.next - e) / we.sd;
        t.tracks[t.rec].ev.push({ ...n, at: ((Math.round(i) % t.len) + t.len) % t.len });
      },
      toggleRec(n) {
        if ((this.ensure(), this.rec === n)) {
          this.rec = -1;
          return;
        }
        ((this.rec = n), (this.tracks[n].ev = []), (this.recSteps = 0));
      },
      clear(n) {
        ((this.tracks[n].ev = []), this.rec === n && (this.rec = -1));
      },
      step(n, t, e) {
        let i = n % this.len;
        ((this.pos = i / this.len),
          this.rec >= 0 && ++this.recSteps >= this.len && (this.rec = -1),
          i % 4 === 0 && this.metro && W.oneshot(W.tickB, i % 16 === 0 ? 0.5 : 0.25, i % 16 === 0 ? 1.5 : 1),
          this.tracks.forEach((r, s) => {
            if (!(r.mute || s === this.rec)) {
              for (let o of r.ev)
                if (o.at === i) {
                  let a = { when: t, silent: !0 };
                  o.d ? W.drum(o.d, o.v, a) : W.note(o.b, o.m, o.v, a);
                }
            }
          }),
          U.shell.dirtyAll());
      },
      stopAll() {
        (this.off && (this.off(), (this.off = null)), (this.rec = -1), we.release());
      },
    },
    si = {
      mr: null,
      chunks: [],
      kind: "",
      t0: 0,
      start(n) {
        if (this.mr) return !1;
        let t = [...W.rec.stream.getAudioTracks()];
        n === "video" && t.unshift(...U.pipe.r.domElement.captureStream(30).getVideoTracks());
        let e = (r) => r.find((s) => MediaRecorder.isTypeSupported(s)) || "",
          i = e(
            n === "video"
              ? ["video/mp4", "video/webm;codecs=vp9,opus", "video/webm"]
              : ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"],
          );
        return (
          (this.mr = new MediaRecorder(new MediaStream(t), i ? { mimeType: i } : {})),
          (this.chunks = []),
          (this.kind = n),
          (this.t0 = U.now),
          (this.mr.ondataavailable = (r) => r.data.size && this.chunks.push(r.data)),
          (this.mr.onstop = () => {
            let r = new Blob(this.chunks, { type: this.mr.mimeType });
            (pn.addMedia({ id: Date.now(), kind: n, blob: r, t: Date.now() }),
              (this.mr = null),
              U.shell.toast(n === "video" ? "Vídeo salvo na Galeria" : "Áudio salvo na Galeria"));
          }),
          this.mr.start(500),
          !0
        );
      },
      stop() {
        this.mr && this.mr.stop();
      },
    };
  U.band = _e;
  var li = 0.098,
    ki = 0.64,
    io = 0.39,
    C_ = [1, 3, 6, 8, 10],
    oi = new le(),
    Cr = new qe(),
    ai = new R(),
    ro = new R(),
    ci = new Tt(),
    I_ = new R(1, 0, 0),
    i0 = new R(),
    xd = [
      ["Piano", "piano"],
      ["Elétrico", "epiano"],
      ["Cravo", "harpsi"],
      ["Órgão", "organ"],
      ["Cordas", "strings"],
    ];
  function r0(n, t) {
    let e = [],
      i = [],
      r = {};
    for (let s = 0, o = 0; s <= t * 12; s++) {
      let a = n + s,
        c = a % 12,
        l = C_.includes(c),
        h = {
          m: a,
          b: l,
          x: l ? (o - 0.5) * li : o * li + li / 2,
          i: l ? i.length : e.length,
          d: 0,
          t: 0,
          hue: c / 12,
          held: null,
          on: !1,
        };
      ((l ? i : e).push(h), (r[a] = h), l || o++);
    }
    return { whites: e, blacks: i, keys: r, width: e.length * li };
  }
  En({
    id: "piano",
    name: "Piano",
    emoji: "🎹",
    dist: 2.1,
    y: -0.48,
    fit: 2.5,
    tips: !0,
    desc: "Toque com os 10 dedos: piano, elétrico, cravo, órgão e cordas",
    enter(n) {
      let t = n.st,
        e = (t.L = r0(48, 3)),
        i = e.width,
        r = (t.kb = new Wt());
      (r.position.set(0, 0, -0.26),
        (r.rotation.x = 0.52),
        n.g.add(r),
        (t.tim = 0),
        (t.off = 0),
        vd(t),
        (t.fing = new Map()));
      let s = ri(1.9);
      ((s.position.y = -0.5), n.g.add(s));
      let o = Yt(16185339, 0.32),
        a = Yt(658192, 0.25, 0.1),
        c = new re(li - 0.006, 0.05, ki);
      c.translate(0, -0.025, ki / 2);
      let l = new re(li * 0.58, 0.06, io);
      (l.translate(0, 0.03, io / 2),
        (t.wm = new Pn(c, o, e.whites.length)),
        (t.bm = new Pn(l, a, e.blacks.length)),
        (t.wm.frustumCulled = t.bm.frustumCulled = !1));
      for (let m of [...e.whites, ...e.blacks]) (Qm(t, m, 0), (m.b ? t.bm : t.wm).setColorAt(m.i, ci.set(16777215)));
      (r.add(t.wm, t.bm), (r.position.x = 0));
      let h = (t.ox = -i / 2);
      t.wm.position.x = t.bm.position.x = h;
      let u = new tt(new re(i + 0.2, 0.1, ki + 0.24), ch());
      (u.position.set(0, -0.11, ki / 2 - 0.1), r.add(u));
      let d = new tt(new re(i + 0.2, 0.36, 0.13), ch());
      (d.position.set(0, 0.13, -0.07), r.add(d));
      let f = new tt(new sn(0.24, 0.24), new $e({ map: lh(), transparent: !1 }));
      (f.position.set(0, 0.16, -0.002), f.scale.setScalar(0.9), (f.visible = !1), r.add(f));
      let p = Fn("RISP MR X", 0.075, "#e8c878", "#a06a10");
      (p.position.set(0, 0.2, 0.01),
        r.add(p),
        [-1, 1].forEach((m) => {
          let y = new tt(new re(0.1, 0.14, ki + 0.26), ch());
          (y.position.set(m * (i / 2 + 0.05), 0.01, ki / 2 - 0.1), r.add(y));
        }));
      let x = new sn(li * 0.7, 1);
      (x.translate(0, 0.5, 0),
        (t.beam = new Pn(
          x,
          new Me({
            transparent: !0,
            depthWrite: !1,
            side: He,
            blending: un,
            vertexShader:
              "varying vec2 u;varying vec3 c;void main(){u=uv;c=instanceColor;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}",
            fragmentShader:
              "varying vec2 u;varying vec3 c;void main(){float a=(1.-u.y)*(1.-u.y)*(1.-abs(u.x-.5)*2.);gl_FragColor=vec4(c*a*2.,1.);}",
          }),
          e.whites.length + e.blacks.length,
        )),
        t.beam.setColorAt(0, ci.set(16777215)),
        (t.beam.frustumCulled = !1),
        (t.beam.position.x = h),
        (t.beam.count = 0),
        r.add(t.beam),
        (t.nm = Fn("", 0.1)),
        (t.note = null),
        n.g.updateWorldMatrix(!0, !0));
      let g = U.pendingLesson;
      ((U.pendingLesson = null), g && N_(n, g));
    },
    bar(n, t, e, i, r) {
      (n.chips(
        "tm",
        i,
        16,
        xd.map((s) => s[0]),
        t.st.tim,
        (s) => {
          ((t.st.tim = s), vd(t.st), e0(t.st));
        },
        { size: 16, h: 52 },
      ),
        n.btn("o-", r - 208, 16, 52, 52, "−", () => n0(t, -1), { r: 18 }),
        n.t((t.st.off >= 0 ? "+" : "") + t.st.off, r - 132, 42, 20, "#fff"),
        n.btn("o+", r - 108, 16, 52, 52, "+", () => n0(t, 1), { r: 18 }));
    },
    update(n, t) {
      let e = t.st,
        i = e.kb,
        r = e.L;
      i.updateWorldMatrix(!0, !1);
      for (let o of Xt.fingers) {
        let a = o.drag;
        if (!(o.strike || a)) continue;
        let l = Aa(i, o.dir, 0, i0);
        if (!l) continue;
        let h = P_(e, l.x - e.ox, l.z);
        h &&
          (o.strike ? t0(t, h, o.strike, o) : a && e.fing.get(o.key) !== h && t0(t, h, 0.7, o), e.fing.set(o.key, h));
      }
      for (let o of Xt.fingers)
        !o.drag && e.fing.has(o.key) && o.vy < -q.hit * 0.35 && (Ca(e, e.fing.get(o.key)), e.fing.delete(o.key));
      for (let [o, a] of e.fing) {
        let c = Xt.fingers.find((l) => l.key === o);
        (!c || (c.virt && !c.drag)) && (Ca(e, a), e.fing.delete(o));
      }
      let s = 0;
      for (let o of [...r.whites, ...r.blacks]) {
        let a = o.on ? 1 : 0;
        ((o.d += (a - o.d) * Fe(n, o.on ? 40 : 16)),
          o.on && U.now - o.t > 2600 && Ca(e, o),
          (Math.abs(o.d - o.ld || 0) > 0.002 || o.d > 0.002) &&
            (Qm(e, o, o.d),
            (o.ld = o.d),
            ci.setHSL(o.hue, 1, o.b ? 0.04 + o.d * 0.5 : 1 - o.d * 0.45),
            (o.b ? e.bm : e.wm).setColorAt(o.i, ci),
            ((o.b ? e.bm : e.wm).instanceColor.needsUpdate = !0)),
          o.d > 0.03 &&
            (oi.compose(
              ai.set(o.x, o.b ? 0.06 : 0, o.b ? io * 0.9 : ki * 0.86),
              Cr.identity(),
              ro.set(1, 0.95 * o.d, 1),
            ),
            e.beam.setMatrixAt(s, oi),
            e.beam.setColorAt(s, ci.setHSL(o.hue, 1, 0.6)),
            s++));
      }
      ((e.beam.count = s),
        (e.beam.instanceMatrix.needsUpdate = !0),
        e.beam.instanceColor && (e.beam.instanceColor.needsUpdate = !0),
        e.les && F_(n, t));
    },
    exit(n) {
      e0(n.st);
    },
  });
  function vd(n) {
    let t = xd[n.tim][1];
    t === "organ" || t === "strings" || W.prepare(t, 60 + n.off * 12);
  }
  function Qm(n, t, e) {
    (Cr.setFromAxisAngle(I_, e * 0.075),
      oi.compose(ai.set(t.x, 0, 0), Cr, ro.set(1, 1, 1)),
      (t.b ? n.bm : n.wm).setMatrixAt(t.i, oi),
      ((t.b ? n.bm : n.wm).instanceMatrix.needsUpdate = !0),
      Cr.identity());
  }
  function P_(n, t, e) {
    let i = n.L;
    if (e < -0.03 || e > ki + 0.06 || t < -0.02 || t > i.width + 0.02) return null;
    if (e < io + 0.03) {
      let r = null,
        s = li * 0.42;
      for (let o of i.blacks) {
        let a = Math.abs(o.x - t);
        a < s && ((s = a), (r = o));
      }
      if (r) return r;
    }
    return i.whites[$t(Math.floor(t / li), 0, i.whites.length - 1)];
  }
  function t0(n, t, e, i) {
    let r = n.st,
      s = t.m + r.off * 12,
      o = xd[r.tim][1];
    if ((q.scaleLock && (s = Ra(s)), t.held && Ca(r, t), o === "organ" || o === "strings")) {
      let a = new ar(o, 0.13);
      (a.freq(Ni(s), 0.001), a.amp(0.5 + e * 0.4), (t.held = a));
    } else t.held = W.note(o, s, e, { pan: (t.x / r.L.width - 0.5) * 0.7 });
    ((t.on = !0),
      (t.t = U.now),
      L_(r, t),
      ee.burst(ai, ci.setHSL(t.hue, 1, 0.6).getHex(), 8, 0.5),
      r.les && U_(n, t.m));
  }
  function L_(n, t) {
    (ai.set(t.x + n.ox, 0.05, t.b ? io * 0.8 : ki * 0.8), n.kb.localToWorld(ai));
  }
  function Ca(n, t) {
    if (!t || !t.on) return;
    t.on = !1;
    let e = t.held;
    ((t.held = null),
      e && (e.kill ? (e.off(), setTimeout(() => e.kill(), 900)) : n.sus !== !0 && ((e.rel = 0.5), e.stop())));
  }
  function e0(n) {
    for (let t of [...n.L.whites, ...n.L.blacks]) Ca(n, t);
  }
  function n0(n, t) {
    ((n.st.off = $t(n.st.off + t, -2, 2)), vd(n.st), (n.bar.dirty = !0));
  }
  var D_ = 1.05;
  function N_(n, t) {
    let e = n.st,
      i = t.n.length;
    e.les = { song: t, i: 0, t: 0, ok: 0, miss: 0, cur: 0, wait: !0, marks: [] };
    let r = new re(li * 0.7, 0.05, 0.012),
      s = new $e({ color: new Tt(2.2, 2.2, 2.2) });
    ((e.fall = new Pn(r, s, Math.max(1, i))),
      (e.fall.frustumCulled = !1),
      (e.fall.position.x = e.ox),
      (e.fall.position.y = 0),
      e.kb.add(e.fall),
      (e.lesHud = Fn(t.name, 0.085)),
      e.lesHud.position.set(0, 1.3, -0.2),
      n.g.add(e.lesHud),
      U.shell.toast("Aula: toque a nota iluminada"));
  }
  function F_(n, t) {
    let e = t.st,
      i = e.les,
      r = i.song;
    if (i.i < r.n.length) {
      let s = 60 / (r.bpm || 90),
        o = i.t / s;
      if (i.wait) {
        let a = r.a[i.i];
        i.t += Math.min(n, Math.max(0, a * s - i.t));
      } else i.t += n;
      for (let a = 0; a < r.n.length; a++) {
        let c = e.L.keys[r.n[a]],
          l = (r.a[a] - o) * 0.22,
          h = a >= i.i && l < D_ && !!c;
        (oi.compose(
          ai.set(c ? c.x : 0, c && c.b ? 0.08 + l : 0.03 + l, c && c.b ? io * 0.92 : ki * 0.9),
          Cr.identity(),
          ro.set(h ? 1 : 1e-4, h ? Math.max(0.5, (r.d[a] || 1) * 3) : 1e-4, 1),
        ),
          e.fall.setMatrixAt(a, oi),
          c && e.fall.setColorAt(a, ci.setHSL(c.hue, 1, a === i.i ? 0.65 : 0.5).multiplyScalar(2.2)));
      }
      ((e.fall.instanceMatrix.needsUpdate = !0), e.fall.instanceColor && (e.fall.instanceColor.needsUpdate = !0));
    }
  }
  function U_(n, t) {
    let e = n.st.les,
      i = e.song;
    e.i >= i.n.length ||
      (t === i.n[e.i]
        ? (e.ok++,
          e.i++,
          U.shell.toast(Gl(t) + " ✓"),
          e.i >= i.n.length &&
            (U.shell.toast("Música completa! " + Math.round((100 * e.ok) / (e.ok + e.miss)) + "% de acerto"),
            W.note("bell", 84, 0.7)))
        : e.miss++);
  }
  var gd = [
    ["Marimba", "marimba"],
    ["Xilofone", "xylo"],
    ["Vibrafone", "vibes"],
    ["Glockenspiel", "glock"],
  ];
  En({
    id: "marimba",
    name: "Marimba",
    emoji: "🎼",
    tool: "mallet",
    toolLen: 2.4,
    dist: 2.2,
    y: -0.4,
    fit: 2.5,
    desc: "Barras de madeira e metal tocadas com baquetas macias",
    enter(n) {
      let t = n.st,
        e = (t.L = r0(48, 3)),
        i = (t.W = e.width * 1.04),
        r = (t.kb = new Wt());
      ((r.rotation.x = 0.62), n.g.add(r), (t.tim = 0), W.prepare("marimba"));
      let s = ri(1.9);
      ((s.position.y = -0.5), n.g.add(s));
      let o = new re(1, 0.03, 1),
        a = Nn("#8a4a24", "#40200e");
      ((t.w = new Pn(o, a, e.whites.length)),
        (t.b = new Pn(o, a, e.blacks.length)),
        (t.w.frustumCulled = t.b.frustumCulled = !1));
      let c = new Re(0.03, 0.03, 1, 10),
        l = new Pn(c, no(), e.whites.length);
      l.frustumCulled = !1;
      let h = (f) => 0.66 - (f / e.whites.length) * 0.3;
      (e.whites.forEach((f, p) => {
        ((f.len = h(p)),
          (f.xx = (f.x - e.width / 2) * 1.04),
          (f.z = 0.24),
          oi.compose(ai.set(f.xx, 0, f.z), Cr.identity(), ro.set(li * 0.9, 1, f.len)),
          t.w.setMatrixAt(p, oi),
          t.w.setColorAt(p, ci.set(16777215)),
          oi.compose(ai.set(f.xx, -0.05 - f.len * 0.3, f.z), Cr.identity(), ro.set(1, f.len * 0.6, 1)),
          l.setMatrixAt(p, oi));
      }),
        e.blacks.forEach((f, p) => {
          ((f.len = 0.42 - (f.x / e.width) * 0.18),
            (f.xx = (f.x - e.width / 2) * 1.04),
            (f.z = -0.34),
            oi.compose(ai.set(f.xx, 0.03, f.z), Cr.identity(), ro.set(li * 0.84, 1, f.len)),
            t.b.setMatrixAt(p, oi),
            t.b.setColorAt(p, ci.set(14540253)));
        }),
        r.add(t.w, t.b, l));
      let u = new re(i + 0.1, 0.03, 0.025),
        d = Yt(3355708, 0.4, 0.8);
      [[0.04], [0.44], [-0.2], [-0.46]].forEach(([f]) => {
        let p = new tt(u, d);
        (p.position.set(0, -0.03, f), r.add(p));
      });
    },
    bar(n, t, e, i) {
      n.chips(
        "tm",
        i,
        16,
        gd.map((r) => r[0]),
        t.st.tim,
        (r) => {
          ((t.st.tim = r), W.prepare(gd[r][1]));
        },
        { size: 16, h: 52 },
      );
    },
    update(n, t) {
      let e = t.st,
        i = e.kb,
        r = e.L;
      i.updateWorldMatrix(!0, !1);
      for (let s of Xt.tools) {
        if (!s.strike) continue;
        let o = Aa(i, s.dir, 0, i0);
        if (!o) continue;
        let a = null,
          c = 0.1;
        for (let l of [...r.whites, ...r.blacks]) {
          if (Math.abs(o.z - l.z) > l.len / 2 + 0.05) continue;
          let h = Math.abs(l.xx - o.x);
          h < c && ((c = h), (a = l));
        }
        a &&
          (W.note(gd[e.tim][1], a.m + (e.tim === 1 ? 12 : e.tim === 3 ? 24 : 0), s.strike, { pan: o.x * 0.3 }),
          (a.d = 1),
          ai.set(a.xx, 0.03, a.z),
          i.localToWorld(ai),
          ee.hit(ai, ci.setHSL(a.hue, 1, 0.6).getHex(), s.strike));
      }
      for (let s of [...r.whites, ...r.blacks])
        if (s.d > 0.005) {
          ((s.d -= s.d * Fe(n, 9)), ci.setHSL(0.09, 0.8, 0.5 + s.d * 0.5));
          let o = 1 + s.d * 2.4;
          ((s.b ? e.b : e.w).setColorAt(s.i, ci.setRGB(o, o * 0.9, o * 0.7)),
            ((s.b ? e.b : e.w).instanceColor.needsUpdate = !0));
        }
    },
  });
  var O_ = [40, 45, 50, 55, 59, 64],
    o0 = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"],
    s0 = [
      [0, "M"],
      [7, "M"],
      [9, "m"],
      [5, "M"],
      [2, "m"],
      [4, "m"],
      [2, "M"],
      [10, "M"],
    ],
    B_ = { M: "", m: "m" },
    k_ = (n, t) => {
      let e = md(n, t, 0).map((r) => ((r % 12) + 12) % 12),
        i = ((n % 12) + 12) % 12;
      return O_.map((r, s) => {
        for (let o = 0; o < 5; o++) {
          let a = (r + o) % 12;
          if (s < 2 ? a === i || a === e[2] : e.includes(a)) return r + o;
        }
        return -1;
      });
    },
    z_ = new Tt(),
    Ia = new R();
  function H_(n) {
    let t = new xr();
    return (
      t.moveTo(-0.34 * n, 0),
      t.bezierCurveTo(-0.34 * n, 0.3 * n, -0.16 * n, 0.28 * n, -0.12 * n, 0.17 * n),
      t.bezierCurveTo(-0.07 * n, 0.12 * n, 0.05 * n, 0.13 * n, 0.1 * n, 0.22 * n),
      t.bezierCurveTo(0.2 * n, 0.4 * n, 0.46 * n, 0.34 * n, 0.46 * n, 0),
      t.bezierCurveTo(0.46 * n, -0.34 * n, 0.2 * n, -0.4 * n, 0.1 * n, -0.22 * n),
      t.bezierCurveTo(0.05 * n, -0.13 * n, -0.07 * n, -0.12 * n, -0.12 * n, -0.17 * n),
      t.bezierCurveTo(-0.16 * n, -0.28 * n, -0.34 * n, -0.3 * n, -0.34 * n, 0),
      t
    );
  }
  function a0(n, t) {
    let e = n.st,
      i = (e.gt = new Wt());
    (i.rotation.set(0.18, 0, 0.09), (i.position.x = 0.26), n.g.add(i));
    let r = ri(1.9);
    ((r.position.y = -0.82), n.g.add(r));
    let s = new Wr(H_(1.25), {
        depth: 0.1,
        bevelEnabled: !0,
        bevelSize: 0.016,
        bevelThickness: 0.016,
        bevelSegments: 3,
        curveSegments: 22,
      }),
      o = new tt(s, t.body);
    (o.position.set(0.42, 0, -0.13), i.add(o));
    let a = new tt(new re(1.34, 0.105, 0.035), Nn("#2c1a10", "#0a0503", 0.5));
    (a.position.set(-0.66, 0, -0.015), i.add(a));
    let c = new tt(new re(0.25, 0.15, 0.03), t.body);
    (c.position.set(-1.45, 0, -0.015), i.add(c));
    for (let m = 1; m < 14; m++) {
      let y = new tt(new re(0.006, 0.1, 0.006), ii());
      (y.position.set(0.02 - 1.3 * (1 - 2 ** (-m / 12)) * 1.45, 0, 0.005), i.add(y));
    }
    if (t.hole) {
      let m = new tt(new Zn(0.13, 32), Yt(328450, 0.9));
      (m.position.set(0.28, 0, 0.002), i.add(m));
      let y = new tt(new Zi(0.132, 0.155, 40), Yt(14200944, 0.5));
      (y.position.copy(m.position), i.add(y));
    } else
      [0.2, 0.4].forEach((m) => {
        let y = new tt(new re(0.05, 0.24, 0.012), ii());
        (y.position.set(m, 0, 0.006), i.add(y));
      });
    let l = new tt(new re(0.05, 0.17, 0.018), t.hole ? Yt(1707269, 0.5) : ii());
    (l.position.set(0.66, 0, 0.008), i.add(l));
    let h = t.n,
      u = (e.S = []),
      d = 0.12 / (h - 1),
      f = [];
    for (let m = 0; m < h; m++) {
      let y = (m - (h - 1) / 2) * d,
        E = new R(-1.34, y * 0.72, 0.013),
        _ = new R(0.66, y * 1.05, 0.02),
        T = Yt(m < h / 2 ? 14200944 : 14542064, 0.25, 1, { emissive: 5227519, emissiveIntensity: 0 }),
        w = new tt(new Re(0.0024 + (h - m) * 5e-4, 0.0024 + (h - m) * 5e-4, E.distanceTo(_), 6), T);
      (w.position.addVectors(E, _).multiplyScalar(0.5),
        w.quaternion.setFromUnitVectors(new R(0, 1, 0), Ia.subVectors(_, E).normalize()),
        i.add(w),
        u.push({
          al: new R(0.02, y * 0.98, 0.02),
          bl: _.clone(),
          a: new R(),
          b: new R(),
          m: T,
          e: 0,
          mesh: w,
          m0: w.position.clone(),
        }),
        f.push(T));
    }
    let p = (e.T = []),
      x = new Zn(0.1, 28);
    (s0.forEach(([m, y], E) => {
      let _ = Yt(1188430, 0.4, 0.2, { emissive: 3116287, emissiveIntensity: 0.12, transparent: !0, opacity: 0.92 }),
        T = new tt(x, _),
        w = E >> 1,
        v = E & 1,
        S = new R(-1.32 + w * 0.25, v ? -0.34 : 0.34, 0.05);
      (T.position.copy(S), i.add(T));
      let F = Fn(t.chordLabel ? t.chordLabel(m, y) : o0[(m + (q.key || 0)) % 12] + B_[y], 0.06);
      (F.position.copy(S).setZ(0.06), i.add(F), p.push({ p: S, r: 0.13, m: _, i: E, obj: i, pad: [m, y] }));
    }),
      (n.scale = 1),
      bi(n, p, i));
    let g = n.g.scale.x;
    (n.g.scale.setScalar(1), n.g.updateWorldMatrix(!0, !0));
    for (let m of u) (m.a.copy(m.al).applyMatrix4(i.matrixWorld), m.b.copy(m.bl).applyMatrix4(i.matrixWorld));
    (n.g.scale.setScalar(g),
      n.g.updateWorldMatrix(!0, !0),
      (e.tc = new Ta(h)),
      e.tc.project(u),
      (e.chord = 0),
      (e.notes = t.notes(s0[0])),
      (e.hint = Fn("Mão esquerda escolhe o acorde · mão direita cruza as cordas", 0.06)),
      e.hint.position.set(0, 0.62, 0),
      n.g.add(e.hint));
  }
  function c0(n, t, e) {
    let i = n.st;
    for (let r of Xt.fingers) {
      if (t.hover && (r.f === 1 || r.virt)) {
        let s = Mi(i.T, r.dir, 1.1);
        s && s.i !== i.chord && ((i.chord = s.i), (i.notes = t.notes(s.pad)), ni(s, 1), W.tick());
      }
      (r.virt ? r.drag : r.f === 1 || r.f === 2) &&
        i.tc.test(r, (s, o) => {
          let a = $t(0.32 + o * 0.28, 0.3, 1.15),
            c = i.notes[s],
            l = i.S[s];
          c < 0 ||
            U.now - (l.t || 0) < 60 ||
            ((l.t = U.now),
            W.note(i.bank, c + (q.key || 0) * 0, a, { group: s, pan: (s / (t.n - 1) - 0.5) * 0.4 }),
            (l.e = 1),
            Ia.copy(l.a).lerp(l.b, 0.75),
            ee.burst(Ia, 9430015, 3, 0.3, 0.6),
            (i.hint.visible = !1));
        });
    }
    (i.S.forEach((r, s) => {
      ((r.e -= r.e * Fe(e, 5)),
        (r.m.emissiveIntensity = r.e * 3),
        (r.mesh.position.y = r.m0.y + Math.sin(U.time * 70 + s) * r.e * 0.0045));
    }),
      i.T.forEach((r, s) => {
        (Si(r, e, 5), (r.m.emissiveIntensity = (i.chord === s ? 0.85 : 0.1) + r.a));
      }));
  }
  var yd = [
      ["Violão", "acoustic"],
      ["Elétrica", "eguitar"],
      ["Distorção", "dist"],
    ],
    _d = { n: 6, hole: !0, body: Nn("#c98a46", "#6d3a14"), hover: !0, notes: ([n, t]) => k_(n + (q.key || 0), t) };
  En({
    id: "guitar",
    name: "Guitarra",
    emoji: "🎸",
    dist: 1.75,
    y: -0.04,
    fit: 2.75,
    desc: "Violão, elétrica e distorção com corda física simulada",
    enter(n) {
      ((_d.body = Nn("#c98a46", "#6d3a14")),
        a0(n, _d),
        (n.st.bank = "acoustic"),
        (n.st.tim = 0),
        W.prepare("acoustic", 55));
    },
    bar(n, t, e, i) {
      n.chips(
        "t",
        i,
        16,
        yd.map((r) => r[0]),
        t.st.tim,
        (r) => {
          ((t.st.tim = r), (t.st.bank = yd[r][1]), W.prepare(yd[r][1], 55));
        },
        { size: 16, h: 52 },
      );
    },
    update(n, t) {
      (t.st.tc.project(t.st.S), c0(t, _d, n));
    },
  });
  var bd = {
    n: 4,
    hole: !1,
    body: Yt(9179688, 0.22, 0.3),
    hover: !0,
    chordLabel: (n) => o0[(n + (q.key || 0)) % 12],
    notes: ([n]) => {
      let t = 28 + ((((n + (q.key || 0)) % 12) + 12) % 12);
      return [t, t + 7, t + 12, t + 19];
    },
  };
  En({
    id: "bass",
    name: "Baixo",
    emoji: "🎶",
    dist: 1.75,
    y: -0.04,
    fit: 2.75,
    desc: "Grave encorpado: escolha a nota e puxe a corda",
    enter(n) {
      ((bd.body = Yt(9179688, 0.22, 0.3)), a0(n, bd), (n.st.bank = "bass"), W.prepare("bass", 40));
    },
    update(n, t) {
      (t.st.tc.project(t.st.S), c0(t, bd, n));
    },
  });
  var G_ = [0, 2, 4, 5, 7, 9, 11];
  En({
    id: "harp",
    name: "Harpa",
    emoji: "🎻",
    dist: 2.2,
    y: -0.02,
    fit: 2.4,
    desc: "Passe todos os dedos pelas cordas",
    enter(n) {
      let t = n.st,
        e = new Wt();
      (n.g.add(e), W.prepare("harp", 72));
      let i = 26,
        r = 2,
        s = (d) => 0.78 - d * 1.05 + Math.sin(d * Math.PI) * 0.22,
        o = (t.S = []),
        a = no(),
        c = [];
      for (let d = 0; d <= 28; d++) {
        let f = d / 28;
        c.push(new R(-r / 2 - 0.1 + f * (r + 0.2), s(f) + 0.06, 0));
      }
      e.add(new tt(new jo(new Bs(c), 60, 0.035, 10), a));
      let l = new tt(new Re(0.045, 0.06, 1.72, 16), a);
      (l.position.set(-r / 2 - 0.1, -0.08, 0), e.add(l));
      let h = new tt(new re(r + 0.3, 0.12, 0.16), Nn("#6a3a1c", "#2c150a"));
      (h.position.set(0, -0.96, 0), e.add(h));
      for (let d = 0; d < i; d++) {
        let f = d / (i - 1),
          p = -r / 2 + f * r,
          x = s(f),
          g = (d / 7) | 0,
          m = 36 + 12 * g + G_[d % 7],
          y = new R(p, -0.9, 0),
          E = new R(p, x, 0),
          _ = Yt(d % 7 === 0 ? 16732224 : d % 7 === 3 ? 4223231 : 15722196, 0.3, 0.7, {
            emissive: 16760944,
            emissiveIntensity: 0,
          }),
          T = new tt(new Re(0.0035, 0.0035, x + 0.9, 6), _);
        (T.position.set(p, (x - 0.9) / 2, 0),
          e.add(T),
          o.push({ al: y, bl: E, a: new R(), b: new R(), m: _, e: 0, c: T, x0: p, note: m }));
      }
      let u = n.g.scale.x;
      (n.g.scale.setScalar(1), n.g.updateWorldMatrix(!0, !0));
      for (let d of o) (d.a.copy(d.al).applyMatrix4(e.matrixWorld), d.b.copy(d.bl).applyMatrix4(e.matrixWorld));
      (n.g.scale.setScalar(u), n.g.updateWorldMatrix(!0, !0), (t.tc = new Ta(i)), t.tc.project(o));
    },
    update(n, t) {
      let e = t.st;
      e.tc.project(e.S);
      for (let i of Xt.fingers)
        (!i.virt || i.drag) &&
          e.tc.test(
            i,
            (r, s) => {
              let o = e.S[r];
              (W.note("harp", o.note + (q.key || 0) + 12, $t(0.3 + s * 0.3, 0.3, 1.1), {
                group: r,
                pan: (r / 25 - 0.5) * 0.7,
              }),
                (o.e = 1),
                Ia.copy(o.a).lerp(o.b, 0.5),
                ee.burst(Ia, z_.setHSL(r / 26, 1, 0.6).getHex(), 4, 0.3, 0.5));
            },
            0.002,
          );
      e.S.forEach((i, r) => {
        i.e > 0.01 &&
          ((i.e -= i.e * Fe(n, 3.2)),
          (i.m.emissiveIntensity = i.e * 3),
          (i.c.position.x = i.x0 + Math.sin(U.time * 80 + r) * i.e * 0.006));
      });
    },
  });
  var Pa = new Tt(),
    V_ = new R(),
    l0 = new le(),
    Md = new R(),
    yw = new qe(),
    _w = new R();
  function p0(n, t, e = 1.15) {
    for (let i of Xt.fingers)
      if (i.strike) {
        let r = Mi(n, i.dir, e);
        r && t(r, i.strike);
      }
    for (let i of Xt.pointers)
      if (i.src === "hand" && i.down) {
        let r = Mi(n, i.dir, e);
        r && t(r, 0.75);
      }
  }
  var h0 = [86, 83, 79, 76, 72, 69, 65, 62, 60, 64, 67, 71, 74, 77, 81, 84, 88];
  En({
    id: "kalimba",
    name: "Kalimba",
    emoji: "🎐",
    dist: 2.15,
    y: -0.14,
    fit: 2.1,
    tips: !0,
    desc: "Lâminas de metal com som de caixinha de música",
    enter(n) {
      let t = n.st,
        e = new Wt();
      ((e.rotation.x = -0.05), n.g.add(e), W.prepare("kalimba", 72));
      let i = new tt(new re(1.95, 1.24, 0.14), Nn("#b26a34", "#5a2c10", 0.38));
      ((i.position.y = -0.05), e.add(i));
      let r = new tt(new Zn(0.14, 36), Yt(919043, 0.95));
      (r.position.set(0, -0.34, 0.072), e.add(r));
      let s = new tt(new re(1.82, 0.05, 0.05), Yt(9212056, 0.3, 1));
      (s.position.set(0, 0.32, 0.09), e.add(s));
      let o = (t.T = []),
        a = h0.length;
      (h0.forEach((c, l) => {
        let h = l - (a - 1) / 2,
          u = 0.34 + Math.abs(h) * 0.036 * 0 + (8 - Math.abs(h)) * 0.034,
          d = 0.094,
          f = Yt(14542062, 0.22, 1, { emissive: 9430015, emissiveIntensity: 0 }),
          p = new tt(new re(d * 0.8, u, 0.014), f),
          x = h * 0.105,
          g = 0.32 - u / 2;
        (p.position.set(x, g, 0.1),
          e.add(p),
          o.push({ p: new R(x, g - u * 0.28, 0.11), r: 0.075, tn: p, mt: f, m: c, obj: e, i: l, pz: p.position.z }));
      }),
        (n.scale = 1),
        bi(n, o, e));
    },
    update(n, t) {
      p0(
        t.st.T,
        (e, i) => {
          (W.note("kalimba", e.m + (q.key || 0), i, { group: e.i, pan: (e.i / 16 - 0.5) * 0.7 }),
            ni(e),
            ee.hit(e.w, 9430015, i * 0.6));
        },
        1,
      );
      for (let e of t.st.T) {
        let i = Si(e, n, 4);
        ((e.mt.emissiveIntensity = i * 2.4), (e.tn.position.z = e.pz + Math.sin(t.t * 90) * i * 0.006));
      }
    },
  });
  var m0 = {
      "D Kurd": [50, 57, 58, 60, 62, 64, 65, 67, 69],
      Hijaz: [50, 57, 58, 61, 62, 64, 65, 67, 70],
      Celta: [50, 57, 60, 62, 64, 65, 67, 69, 72],
    },
    u0 = Object.keys(m0),
    Sd = [
      ["Handpan", "handpan"],
      ["Steel drum", "steel"],
      ["Sinos", "bell"],
    ];
  En({
    id: "handpan",
    name: "Handpan",
    emoji: "🛸",
    dist: 2.2,
    y: -0.3,
    fit: 2.1,
    tips: !0,
    desc: "Som meditativo de aço com escalas prontas",
    enter(n) {
      let t = n.st,
        e = new Wt();
      ((e.rotation.x = 0.86), n.g.add(e), W.prepare("handpan", 62), (t.sc = 0), (t.b = 0));
      let i = [];
      for (let l = 0; l <= 24; l++) {
        let h = l / 24,
          u = 0.92 * Math.sin((h * Math.PI) / 2);
        i.push(new st(Math.max(u, 0.001), 0.26 * Math.cos((h * Math.PI) / 2)));
      }
      let r = Jm();
      (r.color.set(9075300), (r.roughness = 0.34), (r.side = He), e.add(new tt(new Ji(i, 64), r)));
      let s = new tt(
        new Ji(
          i.map((l) => new st(l.x, -l.y * 0.8)),
          64,
        ),
        r,
      );
      e.add(s);
      let o = (t.T = []),
        a = new hn(0.13, 0.012, 8, 32),
        c = (l, h, u, d) => {
          let f = Math.sqrt(Math.max(0, 1 - (h * h + u * u) / 0.846)) * 0.26,
            p = Yt(11575432, 0.3, 1, { emissive: 16752704, emissiveIntensity: 0 }),
            x = new tt(a, p),
            g = new tt(new Zn(0.125, 28), p),
            m = new Wt();
          ((x.rotation.x = g.rotation.x = -Math.PI / 2),
            (x.position.y = 0.014),
            (g.position.y = 0.012),
            m.add(x, g),
            m.scale.setScalar(d),
            m.position.set(h, f, u),
            m.quaternion.setFromUnitVectors(new R(0, 1, 0), new R(h / 0.846, f / 0.0676, u / 0.846).normalize()),
            e.add(m),
            o.push({ p: new R(h, f, u), r: 0.15 * d, mt: p, i: l, obj: e }));
        };
      c(0, 0, 0, 1.3);
      for (let l = 1; l < 9; l++) {
        let h = ((l - 1) / 8) * ve + 0.39;
        c(l, Math.cos(h) * 0.62, Math.sin(h) * 0.62, 0.95 - l * 0.02);
      }
      ((n.scale = 1), bi(n, o, e));
    },
    bar(n, t, e, i) {
      let r = n.chips(
        "s",
        i,
        16,
        u0,
        t.st.sc,
        (s) => {
          t.st.sc = s;
        },
        { size: 16, h: 52 },
      );
      n.chips(
        "b",
        r + 14,
        16,
        Sd.map((s) => s[0]),
        t.st.b,
        (s) => {
          ((t.st.b = s), W.prepare(Sd[s][1], 62));
        },
        { size: 16, h: 52 },
      );
    },
    update(n, t) {
      let e = t.st,
        i = m0[u0[e.sc]],
        r = Sd[e.b][1];
      p0(e.T, (s, o) => {
        (W.note(r, i[s.i] + (q.key || 0) + (e.b === 2 ? 12 : 0), o, { pan: s.p.x * 0.4 }),
          ni(s),
          ee.hit(s.w, 16756832, o * 0.7));
      });
      for (let s of e.T) s.mt.emissiveIntensity = Si(s, n, 3) * 2;
    },
  });
  var W_ = [
    ["tumba", -0.86, 0.02, 0.38, "Tumba"],
    ["conga", -0.1, -0.06, 0.34, "Conga"],
    ["conga2", 0.62, 0.02, 0.3, "Quinto"],
    ["bongo", 1.18, 0.32, 0.17, "Bongô"],
    ["bongo2", 1.54, 0.32, 0.14, "Bongô"],
  ];
  En({
    id: "congas",
    name: "Congas",
    emoji: "🤲",
    tool: null,
    dist: 2.5,
    y: -0.3,
    fit: 3.1,
    desc: "Bata com a mão inteira; a borda dá o tapa seco",
    enter(n) {
      let t = n.st,
        e = new Wt();
      ((e.rotation.x = 0.42),
        (e.position.x = -0.25),
        n.g.add(e),
        W.prepareDrums(["tumba", "conga", "conga2", "bongo", "bongo2", "slap", "shaker"]));
      let i = ri(2);
      ((i.position.y = -0.82), n.g.add(i));
      let r = (t.T = []),
        s = Nn("#8c4a22", "#3c1a0a", 0.32),
        o = ii();
      for (let [a, c, l, h] of W_) {
        let u = new Wt(),
          d = a[0] === "b" ? 0.24 : 1,
          f = a[0] === "b" ? 0.22 : -0.1;
        (u.position.set(c, f, l), e.add(u));
        let p = [
          [h * 0.72, -d],
          [h * 0.8, -d * 0.85],
          [h * 1.05, -d * 0.35],
          [h * 1.02, -d * 0.1],
          [h, 0],
        ].map((y) => new st(y[0], y[1]));
        u.add(new tt(new Ji(p, 32), s));
        let x = new tt(new hn(h, 0.014, 8, 40), o);
        ((x.rotation.x = Math.PI / 2), u.add(x));
        let g = Yt(15127732, 0.62, 0, { emissive: 16752736, emissiveIntensity: 0 }),
          m = new tt(new Zn(h, 32), g);
        ((m.rotation.x = -Math.PI / 2),
          (m.position.y = 0.002),
          u.add(m),
          r.push({ id: a, p: new R(), r: h * 1.25, base: h, m: g, obj: m }));
      }
      ((n.scale = 1), bi(n, r, e));
    },
    update(n, t) {
      let e = t.st.T;
      for (let i of Xt.palms)
        if (i.strike) {
          let r = Mi(e, i.dir, 1.25);
          if (!r) continue;
          let s = r.w.dot(i.dir),
            o = Math.sqrt(Math.max(0, r.w.lengthSq() - s * s)) / r.wr,
            a = o > 0.62;
          (W.drum(a && r.id[0] === "c" ? "slap" : r.id, i.strike, {
            pan: $t(r.p.x * 0.2, -0.6, 0.6),
            rate: a && r.id[0] !== "c" ? 1.2 : 1,
          }),
            ni(r),
            ee.hit(r.w, 16756832, i.strike));
        }
      for (let i of e) i.m.emissiveIntensity = Si(i, n, 9) * 1.5;
    },
  });
  var fh = {
      Trap: {
        d: ["kick808", "snare", "hat", "ohat", "clap", "rim", "shaker", "cowbell"],
        bank: "bell",
        bass: "sub",
        k: "x..x..x...x.....",
      },
      House: {
        d: ["kick", "clap", "hat", "ohat", "snare", "rim", "shaker", "crash"],
        bank: "stab",
        bass: "sub",
        k: "x...x...x...x...",
      },
      Funk: {
        d: ["kick", "snare", "hat", "ohat", "cowbell", "conga", "bongo", "clap"],
        bank: "plk",
        bass: "bass",
        k: "x..x..x.x..x..x.",
      },
      "Lo-fi": {
        d: ["kick", "rim", "shaker", "ohat", "snare", "conga", "bongo", "tumba"],
        bank: "epiano",
        bass: "bass",
        k: "x.....x...x.....",
      },
    },
    dh = Object.keys(fh),
    d0 = [0, 3, 5, 7, 10, 12, 15, 17],
    Ed = (n) => [0.58, 0.92, 0.46, 0.12][n];
  En({
    id: "launchpad",
    name: "Launchpad",
    emoji: "🎛️",
    dist: 2.35,
    y: -0.34,
    fit: 2.6,
    tips: !0,
    desc: "32 pads de produção musical e sequenciador",
    enter(n) {
      let t = n.st,
        e = (t.g = new Wt());
      ((e.rotation.x = 0.78),
        n.g.add(e),
        (t.kit = 0),
        (t.mode = 0),
        (t.seq = Array.from({ length: 4 }, () => new Array(8).fill(!1))),
        (t.a = new Float32Array(32)),
        (t.pos = -1),
        (t.bpm = 118),
        f0(t));
      let i = new tt(new re(2.42, 0.1, 1.3), Yt(724246, 0.4, 0.3));
      ((i.position.y = -0.06), e.add(i));
      let r = new tt(new re(2.44, 0.012, 1.32), Qe(3116287, 1.8));
      ((r.position.y = -0.112), e.add(r));
      let s = new re(0.255, 0.05, 0.255);
      ((t.im = new Pn(s, Yt(16777215, 0.34, 0, {}), 32)), (t.im.frustumCulled = !1));
      for (let o = 0; o < 32; o++) {
        let a = o % 8,
          c = o >> 3;
        (l0.makeTranslation(-1.015 + a * 0.29, 0.01, -0.435 + c * 0.29),
          t.im.setMatrixAt(o, l0),
          t.im.setColorAt(o, Pa.setHSL(Ed(c), 0.9, 0.2)));
      }
      (e.add(t.im),
        (t.off = we.sub((o, a) => {
          let c = o % 8;
          if ((o % 2 === 0 && (t.posNext = c), t.mode !== 1 || o % 2)) return;
          let l = (o / 2) % 8,
            h = fh[dh[t.kit]];
          t.seq.forEach((u, d) => {
            u[l] && W.drum(h.d[d], 0.85, { when: a, silent: !0 });
          });
        })),
        (we.bpm = 118),
        we.need());
    },
    bar(n, t, e, i) {
      let r = t.st,
        s = n.chips(
          "k",
          i,
          16,
          dh,
          r.kit,
          (o) => {
            ((r.kit = o), f0(r));
          },
          { size: 16, h: 52 },
        );
      n.chips(
        "m",
        s + 12,
        16,
        ["Tocar", "Sequenciar"],
        r.mode,
        (o) => {
          r.mode = o;
        },
        { size: 16, h: 52 },
      );
    },
    update(n, t) {
      let e = t.st,
        i = fh[dh[e.kit]],
        r = e.g;
      r.updateWorldMatrix(!0, !1);
      let s = (c, l) => {
        let h = Aa(r, c, 0, V_);
        if (!h) return;
        let u = Math.round((h.x + 1.015) / 0.29),
          d = Math.round((h.z + 0.435) / 0.29);
        if (u < 0 || u > 7 || d < 0 || d > 3) return;
        let f = d * 8 + u;
        if (
          ((e.a[f] = 1),
          Md.set(-1.015 + u * 0.29, 0.05, -0.435 + d * 0.29),
          r.localToWorld(Md),
          ee.hit(Md, Pa.setHSL(Ed(d), 1, 0.6).getHex(), l * 0.6),
          e.mode === 1)
        ) {
          ((e.seq[d][u] = !e.seq[d][u]), W.drum(i.d[d], 0.7, { silent: !0 }));
          return;
        }
        let p = q.key || 0;
        d === 0
          ? W.drum(i.d[u], l)
          : d === 1
            ? W.drum(i.d[u % 8], l * 0.8, { rate: 1.5 })
            : d === 2
              ? W.note(i.bank, 60 + p + d0[u], l)
              : W.note(i.bass, 28 + p + d0[u], l, { group: "b" });
      };
      for (let c of Xt.fingers) c.strike && s(c.dir, c.strike);
      for (let c of Xt.pointers) c.src === "hand" && c.down && s(c.dir, 0.75);
      let o = e.mode === 1 ? e.posNext : -1,
        a = !1;
      for (let c = 0; c < 32; c++) {
        e.a[c] > 0.01 && (e.a[c] -= e.a[c] * Fe(n, 8));
        let l = c >> 3,
          h = c % 8,
          u = e.mode === 1 && e.seq[l][h],
          d = o === h && e.mode === 1,
          f = 0.13 + e.a[c] * 0.5 + (u ? 0.36 : 0) + (d ? 0.12 : 0);
        (e.ll && Math.abs(e.ll[c] - f) < 0.004) ||
          (((e.ll || (e.ll = new Float32Array(32)))[c] = f),
          Pa.setHSL(Ed(l), 0.95, Math.min(0.72, f)),
          (e.a[c] > 0.1 || u) && Pa.multiplyScalar(2.2),
          e.im.setColorAt(c, Pa),
          (a = !0));
      }
      a && (e.im.instanceColor.needsUpdate = !0);
    },
    exit(n) {
      (n.st.off && n.st.off(), we.release());
    },
  });
  function f0(n) {
    let t = fh[dh[n.kit]];
    (W.prepareDrums(t.d), W.prepare(t.bank, 66), W.prepare(t.bass, 34));
  }
  var g0 = new R();
  En({
    id: "theremin",
    name: "Teremim",
    emoji: "📡",
    dist: 2.2,
    y: -0.08,
    fit: 1.9,
    tips: !0,
    desc: "Sem tocar em nada: uma mão faz a nota, a outra o volume",
    enter(n) {
      let t = n.st,
        e = new Wt();
      (n.g.add(e), (t.lock = 0), (t.m = 60), (t.vol = 0));
      let i = new tt(new re(1.1, 0.3, 0.5), Nn("#5a2d14", "#1c0c04", 0.3));
      ((i.position.y = -0.4),
        e.add(i),
        [
          [-0.55, -0.8],
          [0.55, -0.8],
        ].forEach(([c]) => {
          let l = new tt(new Re(0.03, 0.022, 0.55, 10), Nn("#5a2d14", "#1c0c04"));
          (l.position.set(c * 0.8, -0.82, 0), e.add(l));
        }));
      let r = new tt(new Re(0.008, 0.014, 1.2, 10), ii());
      (r.position.set(0.55, 0.2, 0), e.add(r));
      let s = new tt(new hn(0.2, 0.01, 10, 44), ii());
      ((s.rotation.y = Math.PI / 2),
        s.position.set(-0.72, -0.25, 0),
        e.add(s),
        (t.lines = new Wt()),
        e.add(t.lines),
        (t.ind = new tt(new hn(0.08, 0.007, 8, 32), Qe(9430015, 3))),
        e.add(t.ind));
      let o = Qe(3116287, 0.7),
        a = new re(0.002, 0.004, 0.004);
      for (let c = 0; c <= 24; c++) {
        let l = c % 12 === 0,
          h = new tt(a, l ? Qe(9430015, 2) : o);
        (h.scale.set(1, l ? 18 : uh.includes(c % 12) ? 10 : 4, 1),
          h.position.set(-0.55 + c * 0.058, 0.62, 0),
          t.lines.add(h));
      }
      ((t.nm = Fn("", 0.1)),
        t.nm.position.set(0, 0.86, 0),
        (t.nmT = ""),
        e.add(t.nm),
        (t.pv = new ar("theremin", 0.55)),
        (t.g = e));
    },
    bar(n, t, e, i) {
      n.chips(
        "l",
        i,
        16,
        ["Livre", "Escala"],
        t.st.lock,
        (r) => {
          t.st.lock = r;
        },
        { size: 16, h: 52 },
      );
    },
    update(n, t) {
      let e = t.st,
        i = Xt.tools,
        r = Xt.palms,
        s = null,
        o = null;
      r.length >= 2 ? ([o, s] = r[0].x < r[1].x ? [r[0], r[1]] : [r[1], r[0]]) : r.length === 1 && (s = r[0]);
      let a = 0;
      if (s) {
        let c = U.tracker.slots[s.hand],
          l = s.hand !== void 0 && c.live ? c.x(8) : s.x,
          h = 48 + $t((l + 0.5) / 1) * 36;
        (e.lock && (h = Ra(Math.round(h))),
          (e.m += (h - e.m) * Fe(n, e.lock ? 34 : 22)),
          e.pv.freq(Ni(e.m), 0.012),
          (a = o ? $t(1 - (o.y + 0.4) / 0.8) : $t(0.75 - s.y * 1.1)),
          e.ind.position.set(-0.55 + (e.m - 48) * 0.058 * 0.666, 0.62, 0),
          e.ind.scale.setScalar(0.6 + a * 1.5));
        let u = Gl(Math.round(e.m));
        u !== e.nmT &&
          U.now - (e.lt || 0) > 160 &&
          ((e.nmT = u),
          (e.lt = U.now),
          e.g.remove(e.nm),
          e.nm.material.map.dispose(),
          e.nm.material.dispose(),
          (e.nm = Fn(u, 0.11)),
          e.nm.position.set(0, 0.88, 0),
          e.g.add(e.nm));
      }
      ((e.vol += (a - e.vol) * Fe(n, 18)), e.pv.amp(e.vol));
    },
    exit(n) {
      n.st.pv.kill();
    },
  });
  var v0 = [
      ["Serra", "saw"],
      ["Pad", "pad"],
      ["Wobble", "square"],
      ["Cordas", "strings"],
    ],
    X_ = [
      ["Pentatônica", cr],
      ["Maior", uh],
    ],
    q_ = "varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    $_ = `varying vec2 u;uniform float t;uniform vec4 a;uniform vec4 b;uniform float n;
float blob(vec2 p,vec4 h){if(h.z<.01)return 0.;float d=length(p-h.xy);return h.z*(.012/(d*d+.002)*.1+.5*exp(-abs(sin(d*44.-t*7.))*7.)*exp(-d*7.));}
void main(){vec2 p=u;vec2 g=abs(fract(vec2(p.x*n,p.y*8.))-.5);float l=smoothstep(.47,.5,max(g.x,g.y));vec3 c=vec3(.02,.04,.13)+vec3(.1,.3,.8)*l*.5;float f=blob(p,a)+blob(p,b);c+=mix(vec3(.2,.5,1.),vec3(1.,.3,.8),p.y)*f*1.2;float e=smoothstep(0.,.02,min(min(p.x,1.-p.x),min(p.y,1.-p.y)));gl_FragColor=vec4(c*e+vec3(.3,.7,1.2)*(1.-e),1.);}`;
  En({
    id: "synth",
    name: "Sintetizador",
    emoji: "🌌",
    dist: 2,
    y: -0.06,
    fit: 2.3,
    tips: !0,
    desc: "Pinça em uma superfície de luz: X faz a nota, Y abre o filtro",
    enter(n) {
      let t = n.st;
      ((t.pre = 0), (t.sc = 0), (t.v = [null, null]), (t.arp = 0), (t.hold = [0, 0]));
      let e = (t.u = { t: { value: 0 }, a: { value: new Ee() }, b: { value: new Ee() }, n: { value: 15 } }),
        i = (t.pad = new tt(
          new sn(2.1, 1.25, 1, 1),
          new Me({ vertexShader: q_, fragmentShader: $_, uniforms: e, side: He }),
        ));
      (i.position.set(0, 0, 0),
        n.g.add(i),
        (t.off = we.sub((r, s) => {
          if (!(!t.arp || r % 2)) {
            for (let o of t.v)
              if (o && o.on) {
                let a = [0, 7, 12, 19][(r / 2) % 4];
                o.l.freq(Ni(o.m + a), 0.005);
              }
          }
        })),
        (we.bpm = 120));
    },
    bar(n, t, e, i) {
      let r = t.st,
        s = n.chips(
          "p",
          i,
          16,
          v0.map((o) => o[0]),
          r.pre,
          (o) => {
            ((r.pre = o), x0(r));
          },
          { size: 15, h: 52 },
        );
      ((s = n.chips(
        "s",
        s + 10,
        16,
        ["Pent", "Maior"],
        r.sc,
        (o) => {
          r.sc = o;
        },
        { size: 15, h: 52 },
      )),
        n.btn(
          "a",
          s + 10,
          16,
          74,
          52,
          "Arpejo",
          () => {
            ((r.arp = r.arp ? 0 : 1), r.arp ? we.need() : we.release());
          },
          { on: !!r.arp, size: 15 },
        ));
    },
    update(n, t) {
      let e = t.st,
        i = e.u;
      ((i.t.value = t.t), t.g.updateWorldMatrix(!0, !0));
      let r = X_[e.sc][1],
        s = [i.a.value, i.b.value],
        o = [!1, !1];
      for (let a = 0; a < Xt.pointers.length && a < 2; a++) {
        let c = Xt.pointers[a],
          l = Km(e.pad, c.dir, 0, g0),
          h = e.v[a];
        if (!l) continue;
        let u = l.x / 2.1 + 0.5,
          d = l.y / 1.25 + 0.5,
          f = u > -0.02 && u < 1.02 && d > -0.02 && d < 1.02;
        if (((f && c.src !== "hand") || f) && c.pinch) {
          o[a] = !0;
          let p = 48 + ((Math.floor($t(u) * 15) * 12) / r.length) * 1;
          if (((p = Ra(Math.round(p), r) + (q.key || 0) * 0), h))
            (p !== h.m && ((h.m = p), e.arp || h.l.freq(Ni(p), 0.03)), h.l.cut(200 * 2 ** ($t(d) * 6.2)));
          else {
            let x = new ar(v0[e.pre][1], 0.3);
            ((e.v[a] = { l: x, m: p, on: !0 }),
              x.freq(Ni(p), 0.001),
              x.amp(1),
              ee.ring(g0.clone().applyMatrix4(e.pad.matrixWorld), 9430015, 0.24));
          }
          s[a].set($t(u), $t(d), s[a].z + (1 - s[a].z) * Fe(n, 18), 0);
        }
      }
      e.v.forEach((a, c) => {
        if (!o[c] && ((s[c].z -= s[c].z * Fe(n, 7)), a)) {
          let l = a.l;
          (l.off(), setTimeout(() => l.kill(), 1400), (e.v[c] = null));
        }
      });
    },
    exit(n) {
      (x0(n.st), n.st.off && n.st.off(), n.st.arp && we.release());
    },
  });
  function x0(n) {
    n.v.forEach((t, e) => {
      t && (t.l.kill(), (n.v[e] = null));
    });
  }
  var y0 = [
    ["inst", "🎵 Instrumentos"],
    ["app", "🧩 Apps"],
    ["game", "🎮 Jogos"],
  ];
  ye({
    id: "library",
    cat: "sys",
    name: "Início",
    emoji: "🏠",
    c: ["#2f8cff", "#123a9c"],
    w: 1e3,
    h: 640,
    q: 1.45,
    live: 1,
    init(n) {
      ((n.tab = 0), (n.page = 0), !U.bat && navigator.getBattery && navigator.getBattery().then((t) => (U.bat = t)).catch(() => {}));
    },
    draw(n, t, e) {
      // cabeçalho: hora, mãos vistas agora e bateria
      let i = new Date(),
        r = Ke.slots.filter((h) => h.live && !h.lite).length,
        s = String(i.getHours()).padStart(2, "0") + ":" + String(i.getMinutes()).padStart(2, "0");
      (n.t(s, e.w - 72, 31, 22, "#fff", "right", 700),
        n.t(
          (r ? "🖐️ " + r + (r > 1 ? " mãos" : " mão") : "🖐️ mostre as mãos") + (U.bat ? "  ·  🔋 " + Math.round(U.bat.level * 100) + "%" : ""),
          e.w - 148,
          31,
          16,
          r ? It.cy : It.mut,
          "right",
          550,
        ),
        n.chips(
          "tab",
          24,
          72,
          y0.map((h) => h[1]),
          t.tab,
          (h) => {
            ((t.tab = h), (t.page = 0));
          },
          { size: 18, h: 48, w: 180 },
        ));
      let o = ga.filter((h) => h.cat === y0[t.tab][0]),
        a = 6,
        c = 18,
        l = Math.ceil(o.length / c);
      (o.slice(t.page * c, (t.page + 1) * c).forEach((h, u) => {
        let d = 24 + (u % a) * 159,
          f = 134 + ((u / a) | 0) * 166,
          p = n.z("i" + h.id, d, f, 156, 162, { click: () => U.shell.launch(h.id) });
        (p ? n.card(d + 3, f + 2, 150, 158, 20, !0) : n.rr(d + 3, f + 2, 150, 158, 20).fill("rgba(255,255,255,.035)"),
          n.icon(h, d + 33, f + 10, 90),
          n.t(h.name, d + 156 / 2, f + 122, h.name.length > 13 ? 15 : 17, "#fff", "center", 600),
          p && n.t(h.desc ? h.desc.slice(0, 22) : "", d + 156 / 2, f + 145, 12, It.mut, "center", 500));
      }),
        l > 1
          ? (n.btn("pv", e.w - 150, 74, 56, 44, "‹", () => {
              t.page = Math.max(0, t.page - 1);
            }),
            n.btn("nx", e.w - 86, 74, 56, 44, "›", () => {
              t.page = Math.min(l - 1, t.page + 1);
            }))
          : n.t("Pince para abrir  ·  palma aberta + pinça = Início", e.w - 26, 96, 14, It.mut, "right", 500));
    },
  });
  ye({
    id: "scenes",
    cat: "app",
    name: "Cenários",
    emoji: "🌄",
    c: Ge.app[1],
    w: 1e3,
    h: 590,
    live: 2,
    desc: "15 mundos 360 para estar em qualquer lugar",
    draw(n, t, e) {
      $l.forEach(([i, r, s], o) => {
        let a = 22 + (o % 5) * 193,
          c = 68 + ((o / 5) | 0) * 148,
          l = 184,
          h = 138,
          u = q.scene === i,
          d = n.z("s" + i, a, c, l, h, {
            click: () => {
              (rr.select(i), U.shell.toast("Cenário: " + r));
            },
          }),
          f = n.g;
        (f.save(), n.rr(a, c, l, h, 14), f.clip());
        let p = rr.thumb(i);
        (p
          ? f.drawImage(p, 64, 20, 128, 88, a, c, l, h)
          : i === "cam" && U.video.videoWidth
            ? f.drawImage(U.video, a, c, l, h)
            : ((f.fillStyle = "#0b1a3a"), f.fillRect(a, c, l, h)),
          (f.fillStyle = "rgba(2,8,26,.66)"),
          f.fillRect(a, c + 94, l, 44),
          n.t(r, a + 10, c + 108, 17, "#fff", "left", 650),
          n.t(s, a + 10, c + 126, 12, It.mut, "left", 500),
          f.restore(),
          n.rr(a, c, l, h, 14).stroke(u ? It.cy : d ? "#fff" : "rgba(143,227,255,.22)", u ? 4 : 2));
      });
    },
  });
  ye({
    id: "settings",
    cat: "app",
    name: "Ajustes",
    emoji: "⚙️",
    c: ["#8a97ad", "#3a465c"],
    w: 900,
    h: 630,
    desc: "Som, mãos, óculos e qualidade",
    init(n) {
      n.tab = 0;
    },
    draw(n, t, e) {
      n.chips(
        "t",
        24,
        66,
        ["Geral", "Mãos", "Óculos"],
        t.tab,
        (a) => {
          t.tab = a;
        },
        { size: 18, h: 46, w: 130 },
      );
      let i = 30,
        r = 470,
        s = 400,
        o = (a, c) => {
          ((q[a] = c), Ze(), De.layout());
        };
      t.tab === 0
        ? (n.slider(
            "vol",
            i,
            130,
            s,
            "Volume",
            q.vol,
            0,
            1,
            (a) => W.setVol(a),
            (a) => Math.round(a * 100) + "%",
          ),
          n.slider(
            "rv",
            r,
            130,
            s,
            "Reverberação",
            q.reverb,
            0,
            0.8,
            (a) => W.setRev(a),
            (a) => Math.round(a * 100) + "%",
          ),
          n.slider(
            "bl",
            i,
            206,
            s,
            "Brilho neon",
            q.bloom,
            0,
            1.6,
            (a) => {
              ((q.bloom = a), Ze());
            },
            (a) => Math.round(a * 100) + "%",
          ),
          n.t("Qualidade", r, 218, 17, It.mut, "left", 550),
          n.chips(
            "q",
            r,
            238,
            ["auto", "alto", "medio", "baixo"],
            ["auto", "alto", "medio", "baixo"].indexOf(q.quality),
            (a) => De.setQuality(["auto", "alto", "medio", "baixo"][a]),
            { size: 15, h: 40 },
          ),
          n.sw("hv", i, 300, s, "Som ao passar sobre botões", q.hover, () => {
            ((q.hover = !q.hover), Ze());
          }),
          n.sw("sl", r, 300, s, "Piano sempre na escala", q.scaleLock, () => {
            ((q.scaleLock = !q.scaleLock), Ze());
          }),
          n.btn("rc", i, 372, 196, 54, "Recentrar visão", () => U.shell.recenter()),
          n.btn("fl", i + 208, 372, 196, 54, "Trocar câmera", () => U.flipCam()),
          n.btn("ge", r, 372, 196, 54, "Ver os gestos", () => U.shell.launch("gestures")),
          n.btn("mn", r + 208, 372, 196, 54, "Monitor", () => U.shell.launch("monitor")),
          n.t("O app ajusta a qualidade sozinho para manter a fluidez.", e.w / 2, 480, 16, It.mut, "center", 500))
        : t.tab === 1
          ? (n.slider("h", i, 130, s, "Força da batida (menor = mais sensível)", q.hit, 0.3, 1.4, (a) => {
              ((q.hit = a), Ze());
            }),
            n.slider(
              "p",
              r,
              130,
              s,
              "Previsão de movimento",
              q.predict,
              0,
              1,
              (a) => {
                ((q.predict = a), Ze());
              },
              (a) => Math.round(a * 100) + "%",
            ),
            n.slider(
              "d",
              i,
              206,
              s,
              "Tempo de permanência",
              q.dw,
              0.3,
              1.5,
              (a) => {
                ((q.dw = a), Ze());
              },
              (a) => a.toFixed(2) + " s",
            ),
            n.sw("dw", r, 214, s, "Clicar segurando o dedo parado", q.dwell, () => {
              ((q.dwell = !q.dwell), Ze());
            }),
            n.t("Aparência das mãos", i, 290, 17, It.mut, "left", 550),
            n.chips(
              "hs",
              i,
              312,
              ["🦴 Esqueleto", "Mão real", "Holograma", "Invisível"],
              ["skel", "real", "holo", "off"].indexOf(q.handStyle),
              (a) => {
                ((q.handStyle = ["skel", "real", "holo", "off"][a]), Ze());
              },
              { size: 16, h: 44 },
            ),
            n.t("Processador do rastreio", i, 392, 17, It.mut, "left", 550),
            n.chips(
              "td",
              i,
              414,
              ["Automático", "CPU", "GPU"],
              ["auto", "cpu", "gpu"].indexOf(q.trackDev),
              (a) => ei.setPref(["auto", "cpu", "gpu"][a]),
              { size: 16, h: 44 },
            ),
            n.t(
              "Agora: " + (ei.delegate || (ei.state === "fail" ? "cor da pele" : "carregando…")) + (ei.why ? " · " + ei.why : ""),
              i + 400,
              436,
              15,
              It.mut,
              "left",
              500,
            ),
            n.t("O esqueleto mostra o que a câmera vê. O anel entre polegar e indicador fecha conforme você pinça.", i, 500, 15, It.mut, "left", 500))
          : (n.t("Perfil do VR", i, 136, 17, It.mut, "left", 550),
            Object.entries(cs).forEach(([a, c], l) =>
              n.btn(
                "pf" + a,
                i + (l % 4) * 208,
                158 + ((l / 4) | 0) * 56,
                200,
                48,
                c[3],
                () => {
                  ((q.prof = a), ([q.ipd, q.zoom, q.dist] = c), Ze(), De.layout());
                },
                { on: q.prof === a, size: 15 },
              ),
            ),
            n.slider(
              "ip",
              i,
              340,
              s,
              "Distância das lentes",
              q.ipd,
              54,
              74,
              (a) => o("ipd", Math.round(a)),
              (a) => a + " mm",
            ),
            n.slider("zm", r, 340, s, "Zoom das lentes", q.zoom, 0.7, 1.3, (a) => o("zoom", a)),
            n.slider("di", i, 416, s, "Distorção das lentes", q.dist, 0, 0.5, (a) => o("dist", a)),
            n.slider(
              "dp",
              r,
              416,
              s,
              "Profundidade 3D",
              q.depth,
              0,
              20,
              (a) => o("depth", Math.round(a)),
              (a) => String(a),
            ),
            n.slider(
              "fv",
              i,
              492,
              s,
              "Campo de visão",
              q.fov,
              42,
              78,
              (a) => o("fov", Math.round(a)),
              (a) => a + "°",
            ));
    },
  });
  var so = [
    [
      "👆",
      "Aponte",
      "Levante a mão na frente da câmera. Quando o esqueleto azul aparecer sobre ela, aponte para o botão: a ponta do indicador é o cursor.",
      (n) => n.hov,
      "Coloque o dedo aqui",
    ],
    [
      "🤏",
      "Pince para clicar",
      "Encoste o polegar no indicador sobre o botão. O anel entre os dedos fecha e pisca quando o clique vale.",
      (n) => n.clicked,
      "Pince aqui",
    ],
    ["✋", "Mova as janelas", "Pince na barra de título e arraste a janela para onde quiser.", (n) => n.moved, ""],
    [
      "🖐️",
      "Botão Início",
      "Abra a mão com a palma virada para você e pince: o Início aparece em qualquer lugar.",
      (n) => n.palm,
      "",
    ],
    ["🥁", "Tudo pronto", "Nos instrumentos, bata de cima para baixo. Quanto mais forte, mais alto.", () => !1, ""],
  ];
  ye({
    id: "gestures",
    cat: "app",
    name: "Gestos",
    emoji: "🖐️",
    c: Ge.app[3],
    w: 760,
    h: 480,
    live: 8,
    desc: "Aprenda a usar em 1 minuto",
    init(n) {
      n.i = 0;
    },
    tick(n, t, e) {
      (e.hover.has("tgt") && (t.hov = !0),
        Math.abs(e.yaw - (t.y0 ?? e.yaw)) > 0.08 && (t.moved = !0),
        (t.y0 = t.y0 ?? e.yaw),
        U.shell.palmT > 0.25 && (t.palm = !0),
        so[t.i][3](t) &&
          t.i < so.length - 1 &&
          !t.wait &&
          ((t.wait = !0),
          W.note("bell", 76 + t.i * 2, 0.5),
          setTimeout(() => {
            (t.i++, (t.wait = !1), (e.dirty = !0));
          }, 650)));
    },
    draw(n, t, e) {
      let i = so[t.i],
        { w: r } = e;
      ((n.g.font = '64px "Segoe UI Emoji",sans-serif'),
        (n.g.textAlign = "center"),
        n.g.fillText(i[0], r / 2, 118),
        n.t(i[1], r / 2, 186, 32, "#fff", "center", 700));
      let s = (o, a) => {
        let c = o.split(" "),
          l = "";
        for (let h of c)
          (n.g.measureText(l + h).width > 620 && (n.t(l, r / 2, a, 21, It.mut, "center", 500), (a += 30), (l = "")),
            (n.g.font = "500 21px system-ui"),
            (l += h + " "));
        n.t(l, r / 2, a, 21, It.mut, "center", 500);
      };
      ((n.g.font = "500 21px system-ui"),
        s(i[2], 234),
        i[4] &&
          n.btn(
            "tgt",
            r / 2 - 150,
            310,
            300,
            72,
            i[4],
            () => {
              t.clicked = !0;
            },
            { kind: "p", size: 22 },
          ),
        t.i === so.length - 1
          ? n.btn(
              "end",
              r / 2 - 150,
              310,
              300,
              72,
              "Começar",
              () => {
                ((q.learned = !0), Ze(), e.onClose(), U.shell.launch("library"));
              },
              { kind: "p", size: 22 },
            )
          : n.btn(
              "sk",
              r - 150,
              e.h - 60,
              126,
              44,
              "Pular",
              () => {
                t.i = Math.min(so.length - 1, t.i + 1);
              },
              { size: 16 },
            ),
        so.forEach((o, a) => {
          (n.g.beginPath(),
            n.g.arc(r / 2 + (a - 2) * 24, e.h - 38, 6, 0, ve),
            (n.g.fillStyle = a === t.i ? It.cy : "rgba(255,255,255,.2)"),
            n.g.fill());
        }));
    },
  });
  ye({
    id: "monitor",
    cat: "app",
    name: "Monitor",
    emoji: "📈",
    c: Ge.app[0],
    w: 620,
    h: 430,
    live: 6,
    desc: "Fluidez, rastreio e bateria em tempo real",
    init(n) {
      ((n.h = []),
        navigator.getBattery &&
          navigator.getBattery().then((t) => {
            n.bat = t;
          }));
    },
    draw(n, t, e) {
      (t.h.push(U.fps),
        t.h.length > 110 && t.h.shift(),
        [
          ["Quadros por segundo", Math.round(U.fps)],
          ["Leituras de mão por segundo", Math.round(Ke.hz)],
          ["Tempo do modelo", Math.round(ei.ms) + " ms"],
          ["Motor de mãos", (ei.delegate || (ei.state === "fail" ? "Cor da pele" : "—")) + (ei.why ? " · " + ei.why : "")],
          ["Qualidade", De.tier],
          ["Chamadas de desenho", De.calls],
          ["Bateria", t.bat ? Math.round(t.bat.level * 100) + "%" : "—"],
        ].forEach(([a, c], l) => {
          (n.t(a, 28, 82 + l * 32, 18, It.mut, "left", 500),
            n.t(String(c), e.w - 28, 82 + l * 32, 19, "#fff", "right", 650));
        }));
      let r = n.g,
        s = 410,
        o = 76;
      (r.beginPath(),
        t.h.forEach((a, c) => {
          let l = 28 + c * 5.1,
            h = s - Math.min(1, a / 120) * o;
          c ? r.lineTo(l, h) : r.moveTo(l, h);
        }),
        (r.strokeStyle = It.cy),
        (r.lineWidth = 2.5),
        r.stroke());
    },
  });
  ye({ id: "exit", cat: "sys", name: "Sair", emoji: "🚪", c: ["#ff7a7a", "#a81c2e"], action: () => U.exitApp() });
  var Y_ = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"],
    wd = Object.keys(Bi);
  ye({
    id: "studio",
    cat: "app",
    name: "Estúdio",
    emoji: "🎚️",
    c: Ge.app[2],
    w: 980,
    h: 600,
    live: 10,
    desc: "Banda de apoio, looper e gravação",
    draw(n, t, e) {
      n.t("Banda de apoio", 28, 80, 19, It.cy, "left", 650);
      let i = _e.style ? wd.findIndex((o) => Bi[o] === _e.style) : -1;
      (n.chips(
        "st",
        28,
        100,
        wd.map((o) => Bi[o].n),
        i,
        (o) => {
          i === o ? _e.stop() : _e.play(wd[o]);
        },
        { size: 16, h: 48 },
      ),
        n.sw("d", 28, 164, 200, "Bateria", _e.drums, () => {
          _e.drums = !_e.drums;
        }),
        n.sw("b", 260, 164, 190, "Baixo", _e.bassOn, () => {
          _e.bassOn = !_e.bassOn;
        }),
        n.sw("c", 480, 164, 210, "Acordes", _e.chordsOn, () => {
          _e.chordsOn = !_e.chordsOn;
        }),
        n.btn("s-", 720, 164, 46, 44, "−", () => {
          we.bpm = Math.max(50, we.bpm - 4);
        }),
        n.t(Math.round(we.bpm) + " BPM", 830, 186, 20, "#fff"),
        n.btn("s+", 896, 164, 46, 44, "+", () => {
          we.bpm = Math.min(200, we.bpm + 4);
        }),
        n.t("Tom", 28, 236, 17, It.mut, "left", 550),
        n.chips(
          "key",
          76,
          216,
          Y_,
          q.key || 0,
          (o) => {
            ((q.key = o), Ze());
          },
          { size: 15, h: 40, w: 66 },
        ),
        n.t("Looper: grave o que você toca em qualquer instrumento", 28, 288, 19, It.cy, "left", 650),
        Un.tracks.forEach((o, a) => {
          let c = 308 + a * 56,
            l = Un.rec === a;
          (n.card(28, c, 924, 50, 12),
            n.t("Faixa " + (a + 1), 46, c + 25, 17, "#fff", "left", 600),
            n.btn("r" + a, 150, c + 5, 120, 40, l ? "● Gravando" : "● Gravar", () => Un.toggleRec(a), {
              on: l,
              size: 15,
            }),
            n.btn(
              "m" + a,
              280,
              c + 5,
              90,
              40,
              o.mute ? "Mudo" : "Som",
              () => {
                o.mute = !o.mute;
              },
              { on: !o.mute && o.ev.length > 0, size: 15 },
            ),
            n.btn("x" + a, 380, c + 5, 90, 40, "Limpar", () => Un.clear(a), { size: 15 }));
          let h = 490,
            u = 450;
          n.rr(h, c + 22, u, 6, 3).fill("rgba(255,255,255,.1)");
          for (let d of o.ev) n.rr(h + (d.at / Un.len) * u - 2, c + 15, 4, 20, 2).fill(l ? It.red : It.cy);
          we.on && Un.off && n.rr(h + Un.pos * u - 1, c + 10, 2, 30, 1).fill("#fff");
        }));
      let r = 540;
      (n.btn(
        "mt",
        28,
        r,
        150,
        46,
        Un.metro ? "Metrônomo ✓" : "Metrônomo",
        () => {
          ((Un.metro = !Un.metro), Un.ensure());
        },
        { on: !!Un.metro, size: 15 },
      ),
        n.chips(
          "br",
          190,
          r,
          ["2 compassos", "4 compassos"],
          Un.bars === 2 ? 0 : 1,
          (o) => {
            Un.bars = o ? 4 : 2;
          },
          { size: 15, h: 46 },
        ));
      let s = si.mr && si.kind === "audio";
      n.btn(
        "rm",
        720,
        r,
        232,
        46,
        s ? "■ Parar  " + ma((U.now - si.t0) / 1e3) : "● Gravar áudio",
        () => {
          s ? si.stop() : si.start("audio");
        },
        { on: s, kind: s ? "d" : void 0, size: 16 },
      );
    },
    close() {},
  });
  var j_ = (n) =>
      n
        .trim()
        .split(/\s+/)
        .map((t) => {
          let [e, i] = t.split(":"),
            r = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 },
            s = +e.slice(-1),
            o = e.length === 3 ? 1 : 0;
          return [12 * (s + 1) + r[e[0]] + o, +(i || 1)];
        }),
    Ir = (n, t, e) => {
      let i = j_(e),
        r = 0,
        s = i.map(([, o]) => {
          let a = r;
          return ((r += o), a);
        });
      return { name: n, bpm: t, n: i.map((o) => o[0]), d: i.map((o) => o[1]), a: s };
    },
    K_ = [
      Ir(
        "Brilha, Brilha Estrelinha",
        92,
        "C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2 G4 G4 F4 F4 E4 E4 D4:2 G4 G4 F4 F4 E4 E4 D4:2 C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2",
      ),
      Ir(
        "Ode à Alegria",
        100,
        "E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:1.5 D4:.5 D4:2 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:1.5 C4:.5 C4:2",
      ),
      Ir(
        "Parabéns pra Você",
        96,
        "C4:.75 C4:.25 D4 C4 F4 E4:2 C4:.75 C4:.25 D4 C4 G4 F4:2 C4:.75 C4:.25 C5 A4 F4 E4 D4:2 A#4:.75 A#4:.25 A4 F4 G4 F4:2",
      ),
      Ir(
        "Asa de Marcha: Ciranda Cirandinha",
        104,
        "G4 G4 E4 G4 C5:2 G4 E4 G4 G4 F4 D4:2 F4 F4 D4 F4 B4:2 F4 D4 F4 F4 E4 C4:2",
      ),
      Ir(
        "Jingle Bells",
        120,
        "E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4:1.5 D4:.5 E4:4 F4 F4 F4:1.5 F4:.5 F4 E4 E4 E4:.5 E4:.5 E4 D4 D4 E4 D4:2 G4:2",
      ),
      Ir(
        "Für Elise",
        90,
        "E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4 C4:.5 E4:.5 A4:.5 B4 E4:.5 G#4:.5 B4:.5 C5 E4:.5 E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4",
      ),
      Ir("Canon", 76, "F#5:2 E5:2 D5:2 C#5:2 B4:2 A4:2 B4:2 C#5:2"),
      Ir(
        "Greensleeves",
        110,
        "A4 C5:2 D5 E5:1.5 F5:.5 E5 D5:2 B4 G4:1.5 A4:.5 B4 C5:2 A4 A4:1.5 G#4:.5 A4 B4:2 G#4 E4:2",
      ),
    ];
  ye({
    id: "lessons",
    cat: "app",
    name: "Aulas",
    emoji: "🎓",
    c: Ge.app[3],
    w: 700,
    h: 520,
    desc: "Aprenda músicas com notas caindo no piano",
    draw(n, t, e) {
      (n.t("Escolha uma música. A nota iluminada espera por você.", e.w / 2, 82, 19, It.mut, "center", 500),
        K_.forEach((i, r) =>
          n.btn(
            "s" + r,
            40 + (r % 2) * 316,
            112 + ((r / 2) | 0) * 92,
            304,
            80,
            i.name,
            () => {
              ((U.pendingLesson = i), e.onClose(), U.shell.launch("piano"));
            },
            { size: 17 },
          ),
        ));
    },
  });
  ye({
    id: "music",
    cat: "app",
    name: "Música",
    emoji: "🎵",
    c: Ge.app[0],
    w: 760,
    h: 500,
    live: 24,
    desc: "Rádio gerada ao vivo e suas próprias músicas",
    async init(n) {
      ((n.list = (await pn.allMedia()).filter((t) => t.kind === "music")), (n.el = null), U.shell.dirtyAll());
    },
    close(n) {
      (n.el && (n.el.pause(), URL.revokeObjectURL(n.el.src)), n.radio && (_e.stop(), (_e.melody = !1)));
    },
    draw(n, t, e) {
      let { g: i } = n,
        r = e.w,
        s = W.an;
      if (s) {
        s.getByteFrequencyData(W.fft);
        let a = 48,
          c = (r - 60) / a,
          l = 186;
        for (let h = 0; h < a; h++) {
          let u = W.fft[2 + h * 3] / 255,
            d = u * u * 110 + 3;
          ((i.fillStyle = `hsl(${205 + h * 2.6},100%,${50 + u * 22}%)`),
            n.rr(30 + h * c, l - d / 2, c - 3, d, 3).fill(i.fillStyle));
        }
      }
      (n.t(t.now || "Escolha o que ouvir", r / 2, 74, 20, "#fff", "center", 650),
        n.t("Rádio RISP", 30, 268, 18, It.cy, "left", 650),
        ["lofi", "bossa", "pop", "house", "funk", "reggae"].forEach((a, c) =>
          n.btn(
            "r" + a,
            30 + c * 116,
            288,
            108,
            50,
            Bi[a].n,
            () => {
              if ((t.el && (t.el.pause(), (t.el = null)), t.radio === a)) {
                (_e.stop(), (_e.melody = !1), (t.radio = null), (t.now = ""));
                return;
              }
              ((t.radio = a), (_e.melody = !0), _e.play(a), (t.now = "Rádio RISP · " + Bi[a].n));
            },
            { on: t.radio === a, size: 16 },
          ),
        ),
        n.t("Suas músicas", 30, 366, 18, It.cy, "left", 650),
        !t.list || !t.list.length
          ? n.t("Adicione arquivos em Ajustes, na tela inicial do app.", 30, 402, 16, It.mut, "left", 500)
          : t.list.slice(0, 4).forEach((a, c) =>
              n.btn(
                "m" + c,
                30 + (c % 2) * 354,
                386 + (c >> 1) * 52,
                346,
                46,
                (t.cur === c && t.el ? "■ " : "▶ ") + a.name.slice(0, 32),
                () => {
                  if (
                    (t.radio && (_e.stop(), (_e.melody = !1), (t.radio = null)), t.el && (t.el.pause(), t.cur === c))
                  ) {
                    ((t.el = null), (t.now = ""));
                    return;
                  }
                  let l = (t.el = new Audio(URL.createObjectURL(a.blob)));
                  ((t.cur = c), (t.now = a.name), (l.volume = q.vol));
                  try {
                    W.ctx.createMediaElementSource(l).connect(W.master);
                  } catch {}
                  l.play();
                },
                { size: 15, on: t.cur === c && !!t.el },
              ),
            ));
    },
  });
  var _0 = (n) => ma(n / 1e3) + "." + String(((n / 10) % 100) | 0).padStart(2, "0"),
    J_ = [
      ["Brasília", "America/Sao_Paulo"],
      ["Lisboa", "Europe/Lisbon"],
      ["Nova York", "America/New_York"],
      ["Londres", "Europe/London"],
      ["Tóquio", "Asia/Tokyo"],
      ["Sydney", "Australia/Sydney"],
    ];
  ye({
    id: "clock",
    cat: "app",
    name: "Relógio",
    emoji: "🕐",
    c: Ge.app[1],
    w: 640,
    h: 450,
    live: 20,
    desc: "Horas, cronômetro, timer e fusos",
    init(n) {
      ((n.tab = 0), (n.acc = 0), (n.run = !1), (n.laps = []), (n.tm = 300), (n.left = 0), (n.tr = !1));
    },
    tick(n, t) {
      t.tr &&
        ((t.left -= n),
        t.left <= 0 &&
          ((t.tr = !1),
          (t.left = 0),
          W.note("bell", 84, 0.8),
          W.note("bell", 88, 0.7),
          U.shell.toast("Tempo esgotado")));
    },
    draw(n, t, e) {
      let i = e.w,
        r = new Date(),
        s = t.acc + (t.run ? U.now - t.t0 : 0);
      if (
        (n.chips(
          "t",
          24,
          66,
          ["Relógio", "Cronômetro", "Timer", "Mundo"],
          t.tab,
          (o) => {
            t.tab = o;
          },
          { size: 16, h: 44, w: 142 },
        ),
        t.tab === 0)
      ) {
        let o = n.g,
          a = 150,
          c = 280,
          l = 106;
        (o.beginPath(),
          o.arc(a, c, l, 0, ve),
          (o.fillStyle = "rgba(255,255,255,.05)"),
          o.fill(),
          (o.strokeStyle = It.line),
          (o.lineWidth = 2),
          o.stroke());
        for (let f = 0; f < 12; f++) {
          let p = (f / 12) * ve;
          (o.beginPath(),
            o.moveTo(a + Math.sin(p) * l * 0.86, c - Math.cos(p) * l * 0.86),
            o.lineTo(a + Math.sin(p) * l * 0.96, c - Math.cos(p) * l * 0.96),
            (o.strokeStyle = "rgba(255,255,255,.5)"),
            o.stroke());
        }
        let h = r.getSeconds() + r.getMilliseconds() / 1e3,
          u = r.getMinutes() + h / 60;
        ([
          [((r.getHours() % 12) + u / 60) / 12, 0.55, 6, "#fff"],
          [u / 60, 0.8, 4, "#fff"],
          [h / 60, 0.9, 2, It.cy],
        ].forEach(([f, p, x, g]) => {
          let m = f * ve;
          (o.beginPath(),
            o.moveTo(a, c),
            o.lineTo(a + Math.sin(m) * l * p, c - Math.cos(m) * l * p),
            (o.lineWidth = x),
            (o.lineCap = "round"),
            (o.strokeStyle = g),
            o.stroke());
        }),
          n.t(
            r.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            430,
            250,
            76,
            "#fff",
            "center",
            700,
          ),
          n.t(
            r.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }),
            430,
            316,
            19,
            It.cy,
            "center",
            500,
          ));
      } else if (t.tab === 1)
        (n.t(_0(s), i / 2, 190, 68, It.gold, "center", 700),
          n.btn(
            "a",
            i / 2 - 210,
            250,
            130,
            56,
            t.run ? "Parar" : "Iniciar",
            () => {
              t.run ? ((t.acc += U.now - t.t0), (t.run = !1)) : ((t.t0 = U.now), (t.run = !0));
            },
            { kind: "p" },
          ),
          n.btn("l", i / 2 - 65, 250, 130, 56, "Volta", () => {
            t.run && t.laps.unshift(s);
          }),
          n.btn("z", i / 2 + 80, 250, 130, 56, "Zerar", () => {
            ((t.run = !1), (t.acc = 0), (t.laps = []));
          }),
          t.laps
            .slice(0, 3)
            .forEach((o, a) =>
              n.t(`Volta ${t.laps.length - a}   ${_0(o)}`, i / 2, 340 + a * 28, 18, It.mut, "center", 500),
            ));
      else if (t.tab === 2) {
        let o = t.tr || t.left > 0 ? t.left : t.tm;
        (n.t(ma(o), i / 2, 190, 76, "#fff", "center", 700),
          [
            ["-1m", -60],
            ["-10s", -10],
            ["+10s", 10],
            ["+1m", 60],
          ].forEach(([a, c], l) =>
            n.btn("b" + l, 90 + l * 118, 254, 106, 50, a, () => {
              ((t.tm = Math.max(5, t.tm + c)), (t.left = 0), (t.tr = !1));
            }),
          ),
          n.btn(
            "go",
            i / 2 - 110,
            324,
            220,
            56,
            t.tr ? "Pausar" : "Iniciar",
            () => {
              t.tr ? (t.tr = !1) : (t.left <= 0 && (t.left = t.tm), (t.tr = !0));
            },
            { kind: "p" },
          ));
      } else
        J_.forEach(([o, a], c) => {
          let l = 144 + c * 46;
          (n.t(o, 60, l, 20, It.tx, "left", 550),
            n.t(
              r.toLocaleTimeString("pt-BR", { timeZone: a, hour: "2-digit", minute: "2-digit" }),
              i - 60,
              l,
              24,
              "#fff",
              "right",
              700,
            ));
        });
    },
  });
  var b0 = {
      sin: (n) => Math.sin((n * Math.PI) / 180),
      cos: (n) => Math.cos((n * Math.PI) / 180),
      tan: (n) => Math.tan((n * Math.PI) / 180),
      "√": Math.sqrt,
      ln: Math.log,
      log: Math.log10,
      "x²": (n) => n * n,
      "1/x": (n) => 1 / n,
      "±": (n) => -n,
      "%": (n) => n / 100,
      "x³": (n) => n * n * n,
      rand: (n) => Math.random() * (n || 1),
    },
    Td = {
      "+": (n, t) => n + t,
      "−": (n, t) => n - t,
      "×": (n, t) => n * t,
      "÷": (n, t) => (t ? n / t : NaN),
      "^": (n, t) => n ** t,
    },
    Ad = (n) => (Number.isFinite(n) ? String(+n.toPrecision(11)) : "Erro");
  function Z_(n, t) {
    let e = n.s;
    if (t === "C") {
      Object.assign(n, { s: "0", a: null, op: null, n: !0, h: "" });
      return;
    }
    if (t === "⌫") {
      n.s = e.length > 1 ? e.slice(0, -1) : "0";
      return;
    }
    if (b0[t]) {
      ((n.s = Ad(b0[t](+e))), (n.n = !0));
      return;
    }
    if (t === "π" || t === "e") {
      ((n.s = t === "e" ? "2.71828182846" : "3.14159265359"), (n.n = !0));
      return;
    }
    if (Td[t]) {
      (n.op && !n.n ? (n.a = Td[n.op](n.a, +e)) : (n.a = +e),
        (n.op = t),
        (n.n = !0),
        (n.s = Ad(n.a)),
        (n.h = n.s + " " + t));
      return;
    }
    if (t === "=") {
      n.op && ((n.h = `${n.a} ${n.op} ${e} =`), (n.s = Ad(Td[n.op](n.a, +e))), (n.op = null), (n.n = !0));
      return;
    }
    (n.n
      ? ((e = t === "." ? "0." : t), (n.n = !1))
      : t === "."
        ? e.includes(".") || (e += ".")
        : (e = e === "0" ? t : e + t),
      (n.s = e.slice(0, 14)));
  }
  var Q_ = [
    ["sin", "cos", "tan", "π", "C", "⌫"],
    ["ln", "log", "√", "^", "%", "÷"],
    ["x²", "1/x", "7", "8", "9", "×"],
    ["e", "x³", "4", "5", "6", "−"],
    ["±", ".", "1", "2", "3", "+"],
    ["rand", "00", "0", "", "=", "="],
  ];
  ye({
    id: "calc",
    cat: "app",
    name: "Calculadora",
    emoji: "🧮",
    c: ["#ffb066", "#c9561c"],
    w: 620,
    h: 560,
    desc: "Científica, com funções e potências",
    init(n) {
      ((n.s = "0"), (n.n = !0), (n.a = null), (n.op = null), (n.h = ""));
    },
    draw(n, t, e) {
      (n.rr(22, 66, e.w - 44, 96, 14).fill("rgba(3,8,24,.85)"),
        n.t(t.h || "", e.w - 40, 88, 17, It.mut, "right", 500),
        n.t(t.s, e.w - 40, 128, 42, "#fff", "right", 600));
      let i = 91,
        r = 60;
      Q_.forEach((s, o) =>
        s.forEach((a, c) => {
          if (!a || (o === 5 && c === 5)) return;
          let l = "÷×−+=^".includes(a),
            h = o === 5 && a === "=" ? i * 2 + 4 : i;
          n.btn("k" + o + c, 24 + c * 96, 174 + o * 62, h - 5, r - 4, a, () => Z_(t, a), {
            kind: a === "=" ? "p" : void 0,
            on: l && t.op === a,
            size: 21,
          });
        }),
      );
    },
  });
  var t3 = ["1234567890", "qwertyuiop", "asdfghjklç", "zxcvbnm,.?"];
  ye({
    id: "notes",
    cat: "app",
    name: "Notas",
    emoji: "📝",
    c: Ge.app[3],
    w: 900,
    h: 590,
    desc: "Escreva no ar e guarde suas ideias",
    init(n) {
      try {
        n.t = localStorage.getItem("rispx.notes") || "";
      } catch {
        n.t = "";
      }
      n.up = !1;
    },
    draw(n, t, e) {
      n.rr(22, 66, e.w - 44, 196, 14).fill("rgba(3,8,24,.85)");
      let i = [],
        r = "";
      n.g.font = "500 22px system-ui";
      for (let a of t.t + "▏")
        a ===
          `
` || n.g.measureText(r + a).width > e.w - 90
          ? (i.push(r),
            (r =
              a ===
              `
`
                ? ""
                : a))
          : (r += a);
      (i.push(r), i.slice(-6).forEach((a, c) => n.t(a, 40, 94 + c * 30, 22, "#fff", "left", 500)));
      let s = (a) => {
        t.t += a;
        try {
          localStorage.setItem("rispx.notes", t.t);
        } catch {}
        W.tick();
      };
      t3.forEach((a, c) =>
        [...a].forEach((l, h) => {
          let u = t.up ? l.toUpperCase() : l;
          n.btn(
            "k" + c + h,
            26 + c * 20 + h * 82,
            274 + c * 60,
            76,
            54,
            u,
            () => {
              (s(u), t.up && (t.up = !1));
            },
            { size: 22, r: 12 },
          );
        }),
      );
      let o = 516;
      (n.btn(
        "sf",
        26,
        o,
        110,
        54,
        "⇧",
        () => {
          t.up = !t.up;
        },
        { on: t.up, size: 22, r: 12 },
      ),
        n.btn("sp", 146, o, 420, 54, "espaço", () => s(" "), { size: 18, r: 12 }),
        n.btn(
          "nl",
          576,
          o,
          110,
          54,
          "⏎",
          () =>
            s(`
`),
          { size: 22, r: 12 },
        ),
        n.btn(
          "bk",
          696,
          o,
          86,
          54,
          "⌫",
          () => {
            t.t = t.t.slice(0, -1);
            try {
              localStorage.setItem("rispx.notes", t.t);
            } catch {}
          },
          { size: 22, r: 12 },
        ),
        n.btn(
          "cl",
          792,
          o,
          84,
          54,
          "Limpar",
          () => {
            t.t = "";
            try {
              localStorage.setItem("rispx.notes", "");
            } catch {}
          },
          { size: 15, r: 12 },
        ));
    },
  });
  var M0 = ["#8fe3ff", "#ff5f8a", "#ffd24c", "#5dff9a", "#c86bff", "#ffffff", "#ff8a3c", "#000000"];
  ye({
    id: "draw",
    cat: "app",
    name: "Desenho",
    emoji: "🖌️",
    c: ["#ff7ab8", "#b5197a"],
    w: 860,
    h: 600,
    desc: "Pinte numa tela no ar",
    init(n) {
      let t = (n.cv = document.createElement("canvas"));
      ((t.width = 800), (t.height = 440));
      let e = (n.x = t.getContext("2d"));
      ((e.fillStyle = "#071027"),
        e.fillRect(0, 0, 800, 440),
        (e.lineCap = e.lineJoin = "round"),
        (n.col = M0[0]),
        (n.sz = 10),
        (n.last = null),
        (n.mir = !1));
    },
    draw(n, t, e) {
      let s = (o, a, c, l) => {
        let h = c - 30,
          u = l - 66,
          d = t.x;
        ((d.strokeStyle = t.col), (d.lineWidth = t.sz));
        let f = (p, x, g, m) => {
          (d.beginPath(), d.moveTo(p, x), d.lineTo(g + 0.1, m), d.stroke());
        };
        (o === 0 && a === 0 && (t.last = [h, u]),
          t.last && (f(t.last[0], t.last[1], h, u), t.mir && f(800 - t.last[0], t.last[1], 800 - h, u)),
          (t.last = [h, u]));
      };
      (n.z("art", 30, 66, 800, 440, { drag: s }),
        n.g.save(),
        n.rr(30, 66, 800, 440, 14),
        n.g.clip(),
        n.g.drawImage(t.cv, 30, 66),
        n.g.restore(),
        n.rr(30, 66, 800, 440, 14).stroke(It.line, 1.5),
        M0.forEach((o, a) => {
          let c = 30 + a * 56,
            l = n.z("c" + a, c, 520, 50, 50, {
              click: () => {
                t.col = o;
              },
            }),
            h = n.g;
          (h.beginPath(),
            h.arc(c + 25, 545, l ? 24 : 20, 0, ve),
            (h.fillStyle = o),
            h.fill(),
            t.col === o && ((h.lineWidth = 3), (h.strokeStyle = "#fff"), h.stroke()));
        }),
        n.chips(
          "sz",
          486,
          520,
          ["P", "M", "G"],
          [5, 10, 22].indexOf(t.sz),
          (o) => {
            t.sz = [5, 10, 22][o];
          },
          { size: 16, h: 50, w: 50 },
        ),
        n.btn(
          "mi",
          660,
          520,
          62,
          50,
          "⇋",
          () => {
            t.mir = !t.mir;
          },
          { on: t.mir, size: 22 },
        ),
        n.btn(
          "sv",
          730,
          520,
          56,
          50,
          "💾",
          () =>
            t.cv.toBlob((o) => {
              (pn.addMedia({ id: Date.now(), kind: "photo", blob: o, t: Date.now() }),
                U.shell.toast("Desenho salvo na Galeria"));
            }),
          { size: 22 },
        ),
        n.btn(
          "cl",
          794,
          520,
          44,
          50,
          "✕",
          () => {
            ((t.x.fillStyle = "#071027"), t.x.fillRect(0, 0, 800, 440));
          },
          { size: 16 },
        ));
    },
  });
  ye({
    id: "camera",
    cat: "app",
    name: "Câmera",
    emoji: "📷",
    c: ["#6b7a90", "#26324a"],
    w: 520,
    h: 340,
    live: 8,
    desc: "Fotos e vídeos do seu mundo misto",
    init(n) {
      n.t = 0;
    },
    tick(n, t) {
      t.cd > 0 && ((t.cd -= n), t.cd <= 0 && e3());
    },
    draw(n, t, e) {
      let i = U.video,
        r = n.g;
      (r.save(),
        n.rr(24, 66, 280, 210, 14),
        r.clip(),
        i.videoWidth ? r.drawImage(i, 24, 66, 280, 210) : ((r.fillStyle = "#0a1020"), r.fillRect(24, 66, 280, 210)),
        r.restore());
      let s = si.mr && si.kind === "video";
      (n.btn(
        "ph",
        320,
        66,
        176,
        60,
        t.cd > 0 ? Math.ceil(t.cd) + "…" : "📸 Foto",
        () => {
          t.cd = 0.01;
        },
        { kind: "p", size: 19 },
      ),
        n.btn(
          "t3",
          320,
          134,
          176,
          52,
          "Foto em 3 s",
          () => {
            t.cd = 3;
          },
          { size: 16 },
        ),
        n.btn(
          "vd",
          320,
          194,
          176,
          52,
          s ? "■ " + Math.round((U.now - si.t0) / 1e3) + " s" : "🎥 Vídeo",
          () => {
            s ? si.stop() : si.start("video");
          },
          { kind: s ? "d" : void 0, size: 17 },
        ),
        n.btn("fl", 24, 286, 136, 42, "Trocar câmera", () => U.flipCam(), { size: 14 }),
        n.btn("gl", 170, 286, 134, 42, "Abrir galeria", () => U.shell.launch("gallery"), { size: 14 }));
    },
  });
  async function e3() {
    (await De.photo()).toBlob(
      (t) => {
        (pn.addMedia({ id: Date.now(), kind: "photo", blob: t, t: Date.now() }),
          U.shell.toast("Foto salva na Galeria"),
          W.note("xylo", 84, 0.5));
      },
      "image/jpeg",
      0.9,
    );
  }
  ye({
    id: "gallery",
    cat: "app",
    name: "Galeria",
    emoji: "🖼️",
    c: ["#ff9f6b", "#c84a1e"],
    w: 860,
    h: 560,
    desc: "Fotos, vídeos e gravações",
    async init(n, t) {
      ((n.page = 0), (n.th = {}), await S0(n), (t.dirty = !0));
    },
    draw(n, t, e) {
      let i = t.list || [],
        r = 8,
        s = i.slice(t.page * r, (t.page + 1) * r);
      if (t.view) {
        let o = t.view,
          a = n.g;
        if ((a.save(), n.rr(26, 66, e.w - 52, 400, 14).fill("#000"), a.clip(), t.th[o.id])) {
          let c = t.th[o.id],
            l = Math.min((e.w - 52) / c.width, 400 / c.height),
            h = c.width * l,
            u = c.height * l;
          a.drawImage(c, (e.w - h) / 2, 66 + (400 - u) / 2, h, u);
        } else n.t(o.kind === "video" ? "🎥 Vídeo" : "🎙️ Áudio", e.w / 2, 260, 28, "#fff");
        (a.restore(),
          n.btn("b", 26, 482, 150, 56, "Voltar", () => {
            t.view = null;
          }),
          n.btn("sv", 186, 482, 190, 56, "Baixar arquivo", () => n3(o)),
          n.btn(
            "dl",
            e.w - 176,
            482,
            150,
            56,
            "Apagar",
            async () => {
              (await pn.del(o.id, "media"), (t.view = null), await S0(t), (e.dirty = !0));
            },
            { kind: "d" },
          ));
        return;
      }
      if (!i.length) {
        n.t("Nada aqui ainda. Tire fotos no app Câmera.", e.w / 2, 280, 20, It.mut, "center", 500);
        return;
      }
      (s.forEach((o, a) => {
        let c = 26 + (a % 4) * 204,
          l = 66 + (a >> 2) * 208,
          h = n.z("m" + o.id, c, l, 196, 196, {
            click: () => {
              t.view = o;
            },
          }),
          u = n.g;
        (u.save(), n.rr(c, l, 196, 196, 14).fill("#0a1428"), u.clip());
        let d = t.th[o.id];
        if (d) {
          let f = Math.max(196 / d.width, 196 / d.height);
          u.drawImage(d, c + (196 - d.width * f) / 2, l + (196 - d.height * f) / 2, d.width * f, d.height * f);
        } else n.t(o.kind === "video" ? "🎥" : "🎙️", c + 98, l + 98, 48, "#fff");
        (u.restore(), n.rr(c, l, 196, 196, 14).stroke(h ? It.cy : It.line, h ? 3 : 1.5));
      }),
        i.length > r &&
          (n.btn("pv", e.w - 150, 8, 42, 42, "‹", () => {
            t.page = Math.max(0, t.page - 1);
          }),
          n.btn("nx", e.w - 102, 8, 42, 42, "›", () => {
            t.page = Math.min(((i.length - 1) / r) | 0, t.page + 1);
          })));
    },
  });
  async function S0(n) {
    n.list = (await pn.allMedia()).filter((t) => t.kind !== "music").sort((t, e) => e.t - t.t);
    for (let t of n.list)
      if (t.kind === "photo" && !n.th[t.id])
        try {
          n.th[t.id] = await createImageBitmap(t.blob);
        } catch {}
    U.shell.dirtyAll();
  }
  function n3(n) {
    let t = document.createElement("a");
    ((t.href = URL.createObjectURL(n.blob)),
      (t.download = `RISP-${n.id}.${n.kind === "photo" ? "jpg" : n.blob.type.includes("mp4") ? "mp4" : "webm"}`),
      t.click(),
      U.shell.toast("Arquivo baixado"));
  }
  var bn = new R(),
    E0 = new R(),
    w0 = [9430015, 16736138, 16765516, 6160282, 13134847, 16777215, 16747068],
    ph = 2400;
  function i3(n, t, e) {
    let i = new Float32Array(ph * 3),
      r = new Ae(),
      s = new Uint16Array((ph / 2 - 1) * 6);
    for (let a = 0; a < ph / 2 - 1; a++) {
      let c = a * 2;
      s.set([c, c + 1, c + 2, c + 1, c + 3, c + 2], a * 6);
    }
    (r.setAttribute("position", new Le(i, 3)), r.setIndex(new Le(s, 1)), r.setDrawRange(0, 0));
    let o = new tt(r, new $e({ color: new Tt(n).multiplyScalar(e ? 2.6 : 1), side: He }));
    return ((o.frustumCulled = !1), t.add(o), { m: o, pos: i, n: 0, last: null });
  }
  ye({
    id: "paint3d",
    cat: "app",
    name: "Pintura 3D",
    emoji: "✨",
    c: Ge.app[2],
    dist: 0,
    y: 0,
    tips: !0,
    desc: "Pince e desenhe no ar em volta de você",
    enter(n) {
      (Object.assign(n.st, { col: 0, sz: 0.012, neon: !0, strokes: [], cur: [null, null] }),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = 0));
    },
    bar(n, t, e, i) {
      let r = t.st;
      w0.forEach((o, a) => {
        let c = i + a * 50,
          l = n.z("c" + a, c, 16, 46, 52, {
            click: () => {
              r.col = a;
            },
          }),
          h = n.g;
        (h.beginPath(),
          h.arc(c + 23, 42, l ? 22 : 18, 0, ve),
          (h.fillStyle = "#" + o.toString(16).padStart(6, "0")),
          h.fill(),
          r.col === a && ((h.lineWidth = 3), (h.strokeStyle = "#fff"), h.stroke()));
      });
      let s = n.chips(
        "s",
        i + 360,
        16,
        ["P", "M", "G"],
        [0.006, 0.012, 0.026].indexOf(r.sz),
        (o) => {
          r.sz = [0.006, 0.012, 0.026][o];
        },
        { size: 15, h: 52, w: 42 },
      );
      (n.btn(
        "n",
        s + 4,
        16,
        62,
        52,
        r.neon ? "Neon" : "Tinta",
        () => {
          r.neon = !r.neon;
        },
        { on: r.neon, size: 14 },
      ),
        n.btn(
          "u",
          s + 72,
          16,
          40,
          52,
          "↶",
          () => {
            let o = r.strokes.pop();
            o && (t.g.remove(o.m), o.m.geometry.dispose());
          },
          { size: 19 },
        ));
    },
    update(n, t) {
      let e = t.st,
        i = Xt.pointers;
      for (let r = 0; r < 2; r++) {
        let s = i[r],
          o = e.cur[r];
        if (!s || !s.pinch || s.overUI) {
          e.cur[r] = null;
          continue;
        }
        let a = s.slot >= 0 ? Ke.slots[s.slot] : null,
          c = 1 + (a ? a.reach : 0.4) * 1.5;
        bn.copy(s.dir).multiplyScalar(c);
        let l = o;
        if (
          (l || ((l = e.cur[r] = i3(w0[e.col], t.g, e.neon)), e.strokes.push(l)),
          l.last && l.last.distanceTo(bn) < 0.012)
        )
          continue;
        if (l.n >= ph - 2) {
          e.cur[r] = null;
          continue;
        }
        let h = l.last ? E0.subVectors(bn, l.last).normalize() : E0.set(1, 0, 0),
          u = h
            .clone()
            .cross(s.dir)
            .normalize()
            .multiplyScalar(e.sz * (1 + c * 0.2)),
          d = l.n * 3;
        ((l.pos[d] = bn.x + u.x),
          (l.pos[d + 1] = bn.y + u.y),
          (l.pos[d + 2] = bn.z + u.z),
          (l.pos[d + 3] = bn.x - u.x),
          (l.pos[d + 4] = bn.y - u.y),
          (l.pos[d + 5] = bn.z - u.z),
          (l.n += 2),
          (l.m.geometry.attributes.position.needsUpdate = !0),
          l.m.geometry.setDrawRange(0, Math.max(0, l.n - 2) * 3),
          (l.last = (l.last || new R()).copy(bn)));
      }
    },
  });
  var r3 = [
    ["Mercúrio", 0.05, 0.8, 4.1, 10260354, "O menor planeta"],
    ["Vênus", 0.085, 1.05, 1.6, 14727288, "O mais quente"],
    ["Terra", 0.09, 1.34, 1, 4162264, "Nosso lar"],
    ["Marte", 0.065, 1.62, 0.53, 12866860, "O planeta vermelho"],
    ["Júpiter", 0.22, 2.1, 0.084, 13214580, "O gigante gasoso"],
    ["Saturno", 0.18, 2.62, 0.034, 14732694, "Anéis de gelo e rocha"],
    ["Urano", 0.13, 3.06, 0.012, 8969188, "Gira deitado"],
    ["Netuno", 0.125, 3.44, 0.006, 3825880, "Ventos de 2000 km/h"],
  ];
  ye({
    id: "solar",
    cat: "app",
    name: "Sistema Solar",
    emoji: "🌍",
    c: Ge.app[3],
    dist: 3.6,
    y: -0.5,
    desc: "Pince e gire o sistema; aproxime-se dos planetas",
    barLive: 5,
    enter(n) {
      let t = n.st,
        e = (t.g = new Wt());
      (n.g.add(e), (e.rotation.x = 0.28), (t.spd = 1), (t.P = []), (t.info = ""));
      let i = new tt(new tn(0.34, 40, 28), Qe(16756800, 3.4));
      e.add(i);
      let r = new ta(16773336, 22, 12, 1.2);
      e.add(r);
      for (let [s, o, a, c, l, h] of r3) {
        let u = new Wt(),
          d = new tt(new tn(o, 26, 18), Yt(l, 0.75, 0, { emissive: l, emissiveIntensity: 0.07 }));
        ((d.position.x = a), u.add(d), (u.rotation.y = Zt(ve)), e.add(u));
        let f = new tt(new hn(a, 0.0035, 6, 96), Qe(5218559, 0.6));
        if (((f.rotation.x = Math.PI / 2), e.add(f), s === "Saturno")) {
          let x = new tt(
            new Zi(o * 1.3, o * 2.1, 48),
            Yt(14206096, 0.6, 0, { side: He, transparent: !0, opacity: 0.8 }),
          );
          ((x.rotation.x = 1.25), d.add(x));
        }
        let p = Fn(s, 0.1);
        (p.position.set(0, o + 0.09, 0), d.add(p), t.P.push({ n: s, piv: u, m: d, s: c, info: h, r: o }));
      }
    },
    bar(n, t, e, i) {
      (n.chips(
        "v",
        i,
        16,
        ["Lento", "Normal", "Rápido"],
        [0.25, 1, 5].indexOf(t.st.spd),
        (r) => {
          t.st.spd = [0.25, 1, 5][r];
        },
        { size: 15, h: 52 },
      ),
        n.t(t.st.info, i + 300, 42, 17, It.cy, "left", 550));
    },
    update(n, t) {
      let e = t.st,
        i = Xt.pointers.find((a) => a.pinch && !a.overUI);
      i
        ? (e.ldy !== void 0 &&
            ((e.g.rotation.y += (i.dir.x - e.ldx) * 4),
            (e.g.rotation.x = $t(e.g.rotation.x - (i.dir.y - e.ldy) * 3, -0.5, 1.3))),
          (e.ldy = i.dir.y),
          (e.ldx = i.dir.x))
        : (e.ldy = void 0);
      let r = null,
        s = 0.992;
      for (let a of e.P) {
        ((a.piv.rotation.y += n * a.s * 0.5 * e.spd), (a.m.rotation.y += n));
        let c = Xt.pointers[0];
        if (c) {
          a.m.getWorldPosition(bn).normalize();
          let l = bn.dot(c.dir);
          l > s && ((s = l), (r = a));
        }
      }
      let o = r ? r.n + ": " + r.info : "";
      o !== e.info && ((e.info = o), (t.bar.dirty = !0));
    },
  });
  var T0 = [
    ["Inspire", 4],
    ["Segure", 4],
    ["Expire", 6],
    ["Pausa", 2],
  ];
  ye({
    id: "breathe",
    cat: "app",
    name: "Respirar",
    emoji: "🧘",
    c: Ge.app[1],
    dist: 2.2,
    y: 0.05,
    desc: "Meditação guiada em qualquer cenário",
    barLive: 4,
    enter(n) {
      let t = n.st;
      ((t.i = 0), (t.t = 0), (t.c = 0));
      let e = (t.m = new tt(
        new tn(0.42, 48, 32),
        new Me({
          transparent: !0,
          depthWrite: !1,
          uniforms: { k: { value: 0 } },
          vertexShader:
            "varying vec3 n;varying vec3 p;void main(){n=normalize(normalMatrix*normal);vec4 q=modelViewMatrix*vec4(position,1.);p=q.xyz;gl_Position=projectionMatrix*q;}",
          fragmentShader:
            "varying vec3 n;varying vec3 p;uniform float k;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(-p))),2.2);vec3 c=mix(vec3(.2,.6,1.),vec3(.6,1.,.9),k);gl_FragColor=vec4(c*(f*2.6+.12),.3+f*.7);}",
        }),
      ));
      (n.g.add(e), (t.pad = new ar("pad", 0.12)), t.pad.freq(110, 0.01), t.pad.amp(1), t.pad.cut(420));
    },
    bar(n, t, e, i) {
      let r = t.st,
        s = T0[r.i];
      (n.t(s[0], i + 80, 42, 30, "#fff", "center", 700),
        n.t(Math.ceil(s[1] - r.t) + " s", i + 210, 42, 22, It.cy, "center", 600),
        n.t(r.c + " ciclos", i + 320, 42, 18, It.mut, "center", 500));
    },
    update(n, t) {
      let e = t.st;
      e.t += n;
      let i = T0[e.i];
      e.t >= i[1] &&
        ((e.t = 0),
        (e.i = (e.i + 1) % 4),
        e.i || e.c++,
        W.note("bell", [72, 79, 76, 72][e.i], 0.28),
        (t.bar.dirty = !0));
      let r = e.t / i[1],
        s = e.i === 0 ? r : e.i === 1 ? 1 : e.i === 2 ? 1 - r : 0,
        o = s * s * (3 - 2 * s),
        a = 1 + o * 1.3;
      (e.m.scale.setScalar(a), (e.m.material.uniforms.k.value = o), e.pad.cut(320 + o * 900));
    },
    exit(n) {
      n.st.pad.kill();
    },
  });
  ye({
    id: "magic",
    cat: "app",
    name: "Magia",
    emoji: "🌟",
    c: Ge.app[2],
    dist: 0,
    y: 0,
    tips: !0,
    desc: "Solte faíscas dos dedos e estale para explodir",
    enter(n) {
      ((n.st.h = 0), (n.scale = 1), n.g.position.set(0, 0, 0), W.prepare("glock", 84));
    },
    update(n, t) {
      let e = t.st;
      e.h = (e.h + n * 0.08) % 1;
      for (let i of Xt.fingers)
        Math.hypot(i.vx, i.vy) < 0.3 ||
          (i.f !== 1 && !i.virt && Math.random() > 0.4) ||
          ee.burst(
            bn.copy(i.dir).multiplyScalar(1.5),
            new Tt().setHSL((e.h + i.f * 0.08) % 1, 1, 0.62).getHex(),
            2,
            0.25,
            0.35,
          );
      for (let i of Xt.pointers)
        if (i.down && !i.overUI) {
          let r = new Tt().setHSL(e.h, 1, 0.6).getHex();
          (bn.copy(i.dir).multiplyScalar(1.5),
            ee.burst(bn, r, 46, 1.2, 0.3),
            ee.ring(bn, r, 0.8),
            W.note("glock", 84 + cr[Zt(5) | 0], 0.6, { silent: !0 }));
        }
    },
  });
  var Rd = [16732010, 16760906, 6160282, 5220607, 13134847, 16777215];
  ye({
    id: "fireworks",
    cat: "app",
    name: "Fogos",
    emoji: "🎆",
    c: Ge.app[0],
    dist: 0,
    y: 0,
    desc: "Pince no céu e lance fogos de artifício",
    enter(n) {
      ((n.st.r = []),
        (n.st.auto = 0),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = 0),
        W.prepareDrums(["kick808", "crash2"]),
        (n.st.geo = new tn(0.03, 8, 6)));
    },
    bar(n, t, e, i) {
      n.btn(
        "a",
        i,
        16,
        170,
        52,
        t.st.auto ? "Show automático ✓" : "Show automático",
        () => {
          t.st.auto = t.st.auto ? 0 : 1;
        },
        { on: !!t.st.auto, size: 15 },
      );
    },
    update(n, t) {
      let e = t.st,
        i = (r) => {
          let s = new tt(e.geo, Qe(yi(Rd), 3)),
            o = new R(r.x * 3, -2, r.z * 3),
            a = r.clone().multiplyScalar(Zt(6, 9));
          ((a.y = Math.max(a.y, 2)),
            s.position.copy(o),
            t.g.add(s),
            e.r.push({ m: s, o, to: a, t: 0, d: Zt(0.7, 1) }),
            W.drum("shaker", 0.4, { rate: 0.5 }));
        };
      for (let r of Xt.pointers) r.down && !r.overUI && i(r.dir);
      e.auto &&
        (e.tm = (e.tm || 0) - n) < 0 &&
        ((e.tm = Zt(0.5, 1.3)),
        bn.set(Zt(-0.7, 0.7), Zt(0.4, 0.9), -1).normalize().applyQuaternion(ke.q),
        i(bn.clone()));
      for (let r = e.r.length; r--; ) {
        let s = e.r[r];
        s.t += n / s.d;
        let o = Math.min(1, s.t);
        if ((s.m.position.lerpVectors(s.o, s.to, 1 - (1 - o) ** 2), o >= 1)) {
          let a = yi(Rd),
            c = yi(Rd);
          (ee.burst(s.to, a, 80, 3.2, 0.8),
            ee.burst(s.to, c, 40, 1.8, 0.6),
            ee.ring(s.to, a, 3),
            t.g.remove(s.m),
            s.m.material.dispose(),
            e.r.splice(r, 1));
          let l = s.to.length();
          setTimeout(() => {
            (W.drum("kick808", 0.7, { rate: 1.4, silent: !0 }), W.drum("crash2", 0.4, { rate: 0.7, silent: !0 }));
          }, l * 30);
        }
      }
    },
  });
  var Ue = new R(),
    oo = new R(),
    s3 = new qe(),
    o3 = 0,
    La = (n) => ye({ cat: "game", c: Ge.game[o3++ % 4], barLive: 8, ...n }),
    Da = (n, t, e) => {
      let i = t.st;
      (n.t(i.sc + " pts", e + 60, 42, 28, "#fff", "center", 700),
        i.combo > 1 && n.t("x" + i.combo, e + 160, 42, 24, It.gold, "center", 700),
        i.best && n.t("Recorde " + i.best, e + 290, 42, 17, It.mut, "center", 500));
    },
    Ei = (n, t) => {
      try {
        let e = +(localStorage.getItem("rispx.best." + n) || 0);
        return (t > e && localStorage.setItem("rispx.best." + n, t), Math.max(e, t));
      } catch {
        return t;
      }
    },
    Na = (n) => {
      try {
        return +(localStorage.getItem("rispx.best." + n) || 0);
      } catch {
        return 0;
      }
    },
    Id = (n, t, e, i, r, s) => {
      let o = r - e,
        a = s - i,
        c = o * o + a * a || 1e-6,
        l = $t(((n - e) * o + (t - i) * a) / c);
      return Math.hypot(n - e - o * l, t - i - a * l);
    },
    a3 = [-0.5, -0.17, 0.17, 0.5],
    c3 = [-0.2, 0.22];
  var A0 = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ],
    Pr = { a: { x: 0, y: 0 }, b: { x: 0, y: 0 }, c: { x: 0, y: 0 } };
  La({
    id: "saber",
    name: "Sabre Rítmico",
    emoji: "⚔️",
    tool: "saber",
    toolLen: 3.3,
    dist: 0,
    y: 0,
    desc: "Corte os blocos no ritmo com sabres de luz",
    enter(n) {
      let t = n.st;
      (Object.assign(t, {
        sc: 0,
        combo: 0,
        miss: 0,
        best: Na("saber"),
        B: [],
        style: "house",
        beat: -1,
        tip: [
          { x: 0, y: 0, ok: !1 },
          { x: 0, y: 0, ok: !1 },
        ],
        life: 1,
        over: !1,
        note: 0,
      }),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = -n.yaw),
        (t.bg = new re(0.3, 0.3, 0.3)),
        (t.ar = new Gr(0.09, 0.14, 3)),
        (t.mt = [
          Yt(1065152, 0.3, 0.2, { emissive: 2788607, emissiveIntensity: 1.3 }),
          Yt(10488892, 0.3, 0.2, { emissive: 16722538, emissiveIntensity: 1.3 }),
        ]),
        t.mt.forEach((i) => {
          i.shared = !0;
        }),
        (t.wh = Qe(16777215, 1.6)));
      let e = new re(0.02, 0.02, 26);
      ([[-0.75], [0.75]].forEach(([i]) => {
        let r = new tt(e, Qe(5227519, 2));
        (r.position.set(i, -0.72, -13), n.g.add(r));
      }),
        W.prepare("bell", 74),
        (_e.gain = 0.7),
        _e.play(t.style),
        (_e.onStep = (i, r) => {
          i % 4 === 0 && this.spawn(n, i, r);
        }),
        (this.spd = 7.5),
        (t.lead = 18 / this.spd));
    },
    spawn(n, t) {
      let e = n.st;
      if (e.over) return;
      if (((t / 4) | 0) % 2 === 0 || Math.random() < 0.35) {
        let r = Math.random() < 0.5 ? 0 : 1,
          s = Math.random() < 0.2 ? 2 : 1;
        for (let o = 0; o < s; o++) {
          let a = s === 2 ? o : r,
            c = a === 0 ? nr(0, 1) : nr(2, 3),
            l = nr(0, 1),
            h = nr(0, 3),
            u = new Wt();
          u.add(new tt(e.bg, e.mt[a]));
          let d = new tt(e.ar, e.wh);
          ((d.position.z = 0.16),
            (d.rotation.z = Math.atan2(-A0[h][0], A0[h][1]) * 1),
            u.add(d),
            u.position.set(a3[c], c3[l], -18),
            n.g.add(u),
            e.B.push({ o: u, sd: a, t: 0, alive: !0 }));
        }
      }
    },
    bar(n, t, e, i) {
      let r = t.st;
      (Da(n, t, i),
        n.rr(i + 360, 34, 150, 16, 8).fill("rgba(255,255,255,.14)"),
        n.rr(i + 360, 34, 150 * r.life, 16, 8).fill(r.life < 0.3 ? It.red : It.green),
        r.over &&
          n.btn(
            "r",
            i + 524,
            16,
            96,
            52,
            "Jogar de novo",
            () => {
              Object.assign(r, { sc: 0, combo: 0, life: 1, over: !1 });
              for (let s of r.B) t.g.remove(s.o);
              ((r.B = []), _e.play(r.style));
            },
            { kind: "p", size: 12 },
          ));
    },
    update(n, t) {
      let e = t.st,
        i = this.spd,
        r = Xt.tools.map((s) => {
          let o = e.tip[s.hand % 2],
            a = {
              ax: o.ok ? o.x : s.x,
              ay: o.ok ? o.y : s.y,
              bx: s.x,
              by: s.y,
              sp: Math.hypot(s.vx, s.vy),
              hand: s.hand,
              base: s,
            };
          return ((o.x = s.x), (o.y = s.y), (o.ok = !0), a);
        });
      e.tip.forEach((s, o) => {
        Xt.tools.some((a) => a.hand % 2 === o) || (s.ok = !1);
      });
      for (let s = e.B.length; s--; ) {
        let o = e.B[s];
        ((o.o.position.z += i * n), (o.o.rotation.z += n * 0.4));
        let a = o.o.position.z;
        if (a > -3.2 && a < -0.6) {
          (o.o.getWorldPosition(Ue), eo(Ue, Pr.c));
          let c = (0.3 / (-a * 2 * U.view.tv)) * 0.75;
          for (let l of r) {
            let h = Id(Pr.c.x, Pr.c.y, l.ax, l.ay, l.bx, l.by),
              u = Id(Pr.c.x, Pr.c.y, l.base.bx, l.base.by, l.bx, l.by);
            if ((h < c || u < c * 0.9) && l.sp > 0.25) {
              let d = Ke.slots[l.hand];
              if ((d && d.side === "Right" ? 1 : 0) === o.sd || l.hand > 1) {
                (e.combo++,
                  (e.sc += 10 * Math.min(8, e.combo)),
                  ee.hit(Ue, o.sd ? 16722538 : 2788607, 1.1),
                  W.note("bell", 62 + (q.key || 0) + cr[e.combo % 5] + 12 * (e.combo % 3), 0.5, {
                    silent: !0,
                    gain: 0.5,
                  }),
                  navigator.vibrate && navigator.vibrate(8),
                  t.g.remove(o.o),
                  e.B.splice(s, 1),
                  (t.bar.dirty = !0),
                  (o.gone = !0));
                break;
              }
            }
          }
          if (o.gone) continue;
        }
        a > 0.6 &&
          (t.g.remove(o.o),
          e.B.splice(s, 1),
          (e.combo = 0),
          (e.life = Math.max(0, e.life - 0.08)),
          (t.bar.dirty = !0),
          e.life <= 0 &&
            !e.over &&
            ((e.over = !0),
            (e.best = Ei("saber", e.sc)),
            _e.stop(),
            U.shell.toast("Fim de jogo: " + e.sc + " pontos")));
      }
    },
    exit(n) {
      (_e.stop(), (_e.onStep = null), (_e.gain = 0.8), Ei("saber", n.st.sc), n.st.mt.forEach((t) => t.dispose()));
    },
  });
  var Cd = [
    [16727100, 0.17, 7999252],
    [16752672, 0.16, 12601856],
    [8048688, 0.19, 2783760],
    [16769088, 0.15, 11571200],
    [12607743, 0.14, 5905052],
  ];
  La({
    id: "fruit",
    name: "Corte de Frutas",
    emoji: "🍉",
    tips: !0,
    dist: 0,
    y: 0,
    desc: "Rasgue as frutas no ar e fuja das bombas",
    enter(n) {
      let t = n.st;
      (Object.assign(t, { sc: 0, combo: 0, best: Na("fruit"), L: 3, F: [], tm: 1, tr: [], last: [{}, {}] }),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = -n.yaw),
        (t.geo = new tn(1, 22, 16)),
        W.prepareDrums(["slap", "kick808"]),
        W.prepare("marimba", 72),
        (t.mt = Cd.map((e) => Yt(e[0], 0.4, 0, { emissive: e[2], emissiveIntensity: 0.4 }))),
        (t.bomb = Yt(1052692, 0.35, 0.3, { emissive: 16719904, emissiveIntensity: 0.6 })),
        (t.tr = [0, 1].map((e) => {
          let i = ee.trail(e ? 16738976 : 7000319, 12);
          return (n.g.add(i.mesh), i);
        })));
    },
    bar(n, t, e, i) {
      let r = t.st;
      (Da(n, t, i),
        n.t("❤".repeat(r.L), i + 420, 42, 26, It.red, "center"),
        r.L <= 0 &&
          n.btn(
            "r",
            i + 480,
            16,
            110,
            52,
            "De novo",
            () => {
              Object.assign(r, { sc: 0, L: 3, combo: 0 });
            },
            { kind: "p", size: 16 },
          ));
    },
    update(n, t) {
      let e = t.st;
      if (e.L > 0 && (e.tm -= n) < 0) {
        e.tm = Zt(0.5, 1.25);
        let r = Math.random() < 0.2 ? 3 : 1;
        for (let s = 0; s < r; s++) {
          let o = Math.random() < 0.13,
            a = yi(Cd),
            c = o ? 0.17 : a[1],
            l = new tt(e.geo, o ? e.bomb : e.mt[Cd.indexOf(a)]);
          ((l.material.shared = !0), l.scale.setScalar(c));
          let h = Zt(-1.1, 1.1);
          (l.position.set(h, -1.9, -2.4),
            t.g.add(l),
            e.F.push({ m: l, vx: -h * Zt(0.1, 0.4), vy: Zt(3.5, 4.5), r: c, bomb: o, c: a[0] }));
        }
      }
      let i = Xt.fingers.filter((r) => r.f === 1);
      i.forEach((r, s) => {
        let o = s % 2;
        (Ue.copy(r.dir).multiplyScalar(2),
          Math.hypot(r.vx, r.vy) > 0.45 &&
            (oo
              .copy(r.dir)
              .multiplyScalar(2)
              .add(Ue.set(0, 0.03, 0)),
            e.tr[o].push(r.dir.clone().multiplyScalar(2), oo.clone())));
      });
      for (let r = e.F.length; r--; ) {
        let s = e.F[r];
        ((s.vy -= 3.2 * n),
          (s.m.position.x += s.vx * n),
          (s.m.position.y += s.vy * n),
          (s.m.rotation.x += n * 2),
          (s.m.rotation.y += n * 1.4),
          s.m.getWorldPosition(Ue),
          eo(Ue, Pr.c));
        let o = (s.r / (2.4 * 2 * U.view.tv)) * 1.1,
          a = !1;
        for (let c of i)
          if (Math.hypot(c.vx, c.vy) > 0.5 && Id(Pr.c.x, Pr.c.y, c.px, c.py, c.x, c.y) < o) {
            a = !0;
            break;
          }
        if (a) {
          (s.bomb
            ? ((e.L = Math.max(0, e.L - 1)),
              (e.combo = 0),
              W.drum("kick808", 1, { rate: 0.7 }),
              ee.burst(Ue, 16728096, 60, 2.4),
              U.shell.toast("Bomba!"),
              e.L || (e.best = Ei("fruit", e.sc)))
            : (e.combo++,
              (e.sc += 5 * Math.min(6, e.combo)),
              W.drum("slap", 0.5, { silent: !0 }),
              W.note("marimba", 72 + cr[e.combo % 5], 0.7, { silent: !0 }),
              ee.burst(Ue, s.c, 34, 1.4),
              ee.ring(Ue, s.c, 0.5)),
            t.g.remove(s.m),
            e.F.splice(r, 1),
            (t.bar.dirty = !0));
          continue;
        }
        s.m.position.y < -2.2 &&
          s.vy < 0 &&
          (t.g.remove(s.m),
          e.F.splice(r, 1),
          s.bomb ||
            ((e.combo = 0),
            (e.L = Math.max(0, e.L - 0.34)),
            (e.L = Math.round(e.L * 100) / 100),
            e.L < 1 && (e.L = 0),
            e.L || ((e.best = Ei("fruit", e.sc)), U.shell.toast("Fim de jogo: " + e.sc)),
            (t.bar.dirty = !0)));
      }
    },
    exit(n) {
      Ei("fruit", n.st.sc);
    },
  });
  La({
    id: "bubbles",
    name: "Bolhas 360",
    emoji: "🔮",
    tips: !0,
    dist: 0,
    y: 0,
    desc: "Estoure bolhas ao seu redor com os dedos",
    enter(n) {
      let t = n.st;
      (Object.assign(t, { sc: 0, combo: 0, best: Na("bubbles"), B: [], tm: 0, t: 60 }),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = 0),
        W.prepare("glock", 80),
        (t.geo = new tn(1, 24, 16)));
    },
    bar(n, t, e, i) {
      let r = t.st;
      (Da(n, t, i),
        n.t(Math.ceil(r.t) + " s", i + 440, 42, 26, r.t < 10 ? It.red : "#fff"),
        r.t <= 0 &&
          n.btn(
            "r",
            i + 510,
            16,
            100,
            52,
            "De novo",
            () => {
              Object.assign(r, { sc: 0, t: 60, combo: 0 });
            },
            { kind: "p", size: 16 },
          ));
    },
    update(n, t) {
      let e = t.st;
      if (
        (e.t > 0 &&
          ((e.t -= n), e.t <= 0 && ((e.best = Ei("bubbles", e.sc)), U.shell.toast("Tempo! " + e.sc + " pontos"))),
        e.t > 0 && (e.tm -= n) < 0 && e.B.length < 14)
      ) {
        e.tm = Zt(0.25, 0.6);
        let i = ke.yaw + Zt(-1.5, 1.5),
          r = Zt(1.5, 2.4),
          s = Zt(0, 1),
          o = Math.random() < 0.08,
          a = o ? 0.1 : Zt(0.11, 0.2),
          c = new tt(
            e.geo,
            new Me({
              transparent: !0,
              depthWrite: !1,
              uniforms: { c: { value: new Tt().setHSL(o ? 0.13 : Zt(1), 0.9, 0.6) } },
              vertexShader:
                "varying vec3 n;varying vec3 p;void main(){n=normalize(normalMatrix*normal);vec4 q=modelViewMatrix*vec4(position,1.);p=q.xyz;gl_Position=projectionMatrix*q;}",
              fragmentShader:
                "varying vec3 n;varying vec3 p;uniform vec3 c;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(-p))),2.);vec3 l=normalize(vec3(-.5,.7,.5));float s=pow(max(dot(reflect(-l,normalize(n)),normalize(-p)),0.),40.);gl_FragColor=vec4(c*(.2+f*1.8)+vec3(3.)*s,.18+f*.7);}",
            }),
          );
        (c.position.set(Math.sin(i) * r, -1.6, -Math.cos(i) * r),
          c.scale.setScalar(a),
          t.g.add(c),
          e.B.push({ m: c, r: a, v: Zt(0.28, 0.55), ph: Zt(ve), gold: o, top: s }));
      }
      for (let i = e.B.length; i--; ) {
        let r = e.B[i];
        ((r.m.position.y += r.v * n), (r.m.position.x += Math.sin(t.t * 1.4 + r.ph) * n * 0.08), Ue.copy(r.m.position));
        let s = Ue.length();
        Ue.divideScalar(s);
        let o = !1;
        for (let a of Xt.fingers)
          if (a.dir.dot(Ue) > Math.cos(Math.atan((r.r + 0.05) / s))) {
            o = !0;
            break;
          }
        if (o) {
          ((e.combo = U.now - (e.lt || 0) < 900 ? e.combo + 1 : 1),
            (e.lt = U.now),
            (e.sc += (r.gold ? 50 : 10) * Math.min(5, e.combo)),
            W.note("glock", 76 + cr[e.combo % 5] + (r.gold ? 12 : 0), 0.7, { silent: !0 }),
            ee.burst(r.m.position, r.m.material.uniforms.c.value.getHex(), 18, 0.9, 1),
            ee.ring(r.m.position, 16777215, r.r * 2),
            t.g.remove(r.m),
            r.m.material.dispose(),
            e.B.splice(i, 1),
            (t.bar.dirty = !0));
          continue;
        }
        r.m.position.y > 2 && (t.g.remove(r.m), r.m.material.dispose(), e.B.splice(i, 1));
      }
    },
    exit(n) {
      Ei("bubbles", n.st.sc);
    },
  });
  La({
    id: "hoops",
    name: "Arremesso",
    emoji: "🏀",
    dist: 0,
    y: 0,
    desc: "Pince a bola, mire e solte com força",
    enter(n) {
      let t = n.st;
      (Object.assign(t, { sc: 0, combo: 0, best: Na("hoops"), state: 0, vx: 0, vy: 0, t: 45, hx: 0, hd: 1 }),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = -n.yaw));
      let e = document.createElement("canvas");
      e.width = e.height = 256;
      let i = e.getContext("2d");
      ((i.fillStyle = "#e8701c"),
        i.fillRect(0, 0, 256, 256),
        (i.strokeStyle = "#2a1206"),
        (i.lineWidth = 7),
        i.beginPath(),
        i.moveTo(128, 0),
        i.lineTo(128, 256),
        i.moveTo(0, 128),
        i.lineTo(256, 128),
        i.arc(128, 128, 88, 0, ve),
        i.stroke());
      let r = new ln(e);
      ((r.colorSpace = Pe),
        (t.ball = new tt(new tn(0.13, 24, 18), Yt(16777215, 0.62, 0, { map: r }))),
        n.g.add(t.ball));
      let s = (t.hoop = new Wt());
      (s.position.set(0, 0.5, -4.2), n.g.add(s));
      let o = new tt(new re(1.5, 0.95, 0.05), Yt(15922683, 0.3));
      (o.position.set(0, 0.3, -0.34), s.add(o));
      let a = new tt(new sn(0.5, 0.4), Qe(16728128, 1.2));
      (a.position.set(0, 0.22, -0.31), s.add(a));
      let c = new tt(new hn(0.26, 0.016, 10, 40), Qe(16740384, 2.2));
      ((c.rotation.x = Math.PI / 2), s.add(c));
      let l = new tt(
        new Re(0.26, 0.17, 0.28, 14, 2, !0),
        new $e({ color: 16777215, wireframe: !0, transparent: !0, opacity: 0.55 }),
      );
      ((l.position.y = -0.14), s.add(l), W.prepareDrums(["tumba", "crash2"]), W.prepare("bell", 80), this.reset(t));
    },
    reset(n) {
      ((n.state = 0), n.ball.position.set(0, -0.75, -1.3), (n.v = new R()));
    },
    bar(n, t, e, i) {
      let r = t.st;
      (Da(n, t, i),
        n.t(Math.ceil(r.t) + " s", i + 440, 42, 26),
        r.t <= 0 &&
          n.btn(
            "r",
            i + 500,
            16,
            100,
            52,
            "De novo",
            () => {
              Object.assign(r, { sc: 0, t: 45 });
            },
            { kind: "p", size: 16 },
          ));
    },
    update(n, t) {
      let e = t.st,
        i = e.ball,
        r = s3.setFromAxisAngle(oo.set(0, 1, 0), t.yaw);
      (e.t > 0 && ((e.t -= n), e.t <= 0 && ((e.best = Ei("hoops", e.sc)), U.shell.toast("Tempo! " + e.sc + " pontos"))),
        (e.hoop.position.x = Math.sin(t.t * 0.8) * Math.min(1.3, e.sc / 160)));
      let s = Xt.pointers.find((o) => o.pinch && !o.overUI);
      if (
        (e.state === 0 &&
          s &&
          (Ue.copy(s.dir).applyQuaternion(r).multiplyScalar(1.35), Ue.distanceTo(i.position) < 0.7 && (e.state = 1)),
        e.state === 1)
      )
        if (s)
          (Ue.copy(s.dir).applyQuaternion(r).multiplyScalar(1.35),
            (e.pv = e.pv || Ue.clone()),
            oo.subVectors(Ue, e.pv).divideScalar(Math.max(n, 0.004)),
            e.v.lerp(oo, 0.3),
            e.pv.copy(Ue),
            i.position.lerp(Ue, Fe(n, 30)));
        else {
          ((e.state = 2), (e.pv = null));
          let o = Math.hypot(e.v.x, e.v.y);
          (e.v.set(e.v.x * 1.3, Math.max(2.4, e.v.y * 1.9), -$t(2.4 + o * 1.6, 3, 7.5)),
            W.drum("tumba", 0.4),
            (e.scored = !1));
        }
      if (e.state === 2) {
        ((e.v.y -= 6.4 * n), i.position.addScaledVector(e.v, n), (i.rotation.x -= n * 6));
        let o = e.hoop.position;
        (!e.scored &&
          e.v.y < 0 &&
          Math.abs(i.position.y - o.y) < 0.14 &&
          Math.hypot(i.position.x - o.x, i.position.z - o.z) < 0.3 &&
          ((e.scored = !0),
          e.combo++,
          (e.sc += 10 * e.combo),
          i.getWorldPosition(Ue),
          ee.burst(Ue, 16752704, 50, 2),
          ee.ring(Ue, 16777215, 0.9),
          W.drum("crash2", 0.5, { silent: !0 }),
          W.note("bell", 79 + 2 * (e.combo % 5), 0.7, { silent: !0 }),
          (t.bar.dirty = !0),
          U.shell.toast("Cesta!" + (e.combo > 1 ? " x" + e.combo : ""))),
          i.position.z < o.z - 0.32 &&
            e.v.z < 0 &&
            ((i.position.z = o.z - 0.32), (e.v.z *= -0.42), W.drum("tumba", 0.25, { rate: 1.6 })),
          i.position.y < -1.7 && (e.scored || (e.combo = 0), this.reset(e), (t.bar.dirty = !0)));
      }
    },
    exit(n) {
      Ei("hoops", n.st.sc);
    },
  });
  La({
    id: "blaster",
    name: "Alvos",
    emoji: "🎯",
    tips: !0,
    dist: 0,
    y: 0,
    desc: "Faça uma arminha com a mão e dobre o polegar para atirar",
    enter(n) {
      let t = n.st;
      (Object.assign(t, { sc: 0, combo: 0, best: Na("blaster"), D: [], tm: 0, t: 60, ok: [!1, !1] }),
        (n.scale = 1),
        n.g.position.set(0, 0, 0),
        (n.g.rotation.y = 0),
        (t.geo = new hn(0.17, 0.045, 10, 26)),
        (t.core = new tn(0.08, 14, 10)),
        W.prepare("plk", 72),
        W.prepareDrums(["clap"]),
        (t.beam = [0, 1].map(() => {
          let e = new tt(new Re(0.007, 0.007, 1, 6), Qe(5234943, 3.2));
          return ((e.visible = !1), n.g.add(e), { m: e, t: 0 });
        })));
    },
    bar(n, t, e, i) {
      let r = t.st;
      (Da(n, t, i),
        n.t(Math.ceil(r.t) + " s", i + 440, 42, 26),
        r.t <= 0 &&
          n.btn(
            "r",
            i + 500,
            16,
            100,
            52,
            "De novo",
            () => {
              Object.assign(r, { sc: 0, t: 60 });
            },
            { kind: "p", size: 16 },
          ));
    },
    update(n, t) {
      let e = t.st;
      if (
        (e.t > 0 &&
          ((e.t -= n), e.t <= 0 && ((e.best = Ei("blaster", e.sc)), U.shell.toast("Tempo! " + e.sc + " pontos"))),
        e.t > 0 && (e.tm -= n) < 0 && e.D.length < 7)
      ) {
        e.tm = Zt(0.6, 1.2);
        let r = ke.yaw + Zt(-1.2, 1.2),
          s = Zt(3, 5),
          o = new Wt(),
          a = new tt(e.geo, Qe(16728160, 2.2)),
          c = new tt(e.core, Qe(16769120, 2.6));
        (o.add(a, c),
          o.position.set(Math.sin(r) * s, Zt(-0.3, 1.5), -Math.cos(r) * s),
          t.g.add(o),
          o.lookAt(0, 0, 0),
          e.D.push({
            o,
            a: r,
            d: s,
            h: o.position.y,
            sp: Zt(0.25, 0.5) * (Math.random() < 0.5 ? 1 : -1),
            life: Zt(4, 7),
          }));
      }
      for (let r = e.D.length; r--; ) {
        let s = e.D[r];
        ((s.a += s.sp * n),
          (s.life -= n),
          s.o.position.set(Math.sin(s.a) * s.d, s.h + Math.sin(t.t * 2 + s.a) * 0.2, -Math.cos(s.a) * s.d),
          s.o.lookAt(0, 0, 0),
          s.life < 0 && (t.g.remove(s.o), e.D.splice(r, 1), (e.combo = 0)));
      }
      let i = (r, s, o) => {
        let a = null,
          c = 1.06;
        W.note("plk", 84, 0.5, { silent: !0, gain: 0.6 });
        for (let d of e.D) {
          Ue.copy(d.o.position).normalize();
          let f = Math.acos($t(Ue.dot(r))) * d.o.position.length();
          f < 0.3 && f < c && ((c = f), (a = d));
        }
        let l = e.beam[o];
        l.t = 0.08;
        let h = a ? a.o.position.clone() : r.clone().multiplyScalar(8),
          u = s.distanceTo(h);
        ((l.m.visible = !0),
          l.m.position.addVectors(s, h).multiplyScalar(0.5),
          (l.m.scale.y = u),
          l.m.quaternion.setFromUnitVectors(oo.set(0, 1, 0), Ue.subVectors(h, s).normalize()),
          a &&
            (e.combo++,
            (e.sc += 10 * Math.min(6, e.combo)),
            ee.burst(a.o.position, 16752704, 44, 2.4),
            ee.ring(a.o.position, 16760928, 1),
            W.drum("clap", 0.7, { rate: 1.5, silent: !0 }),
            t.g.remove(a.o),
            e.D.splice(e.D.indexOf(a), 1),
            (t.bar.dirty = !0)));
      };
      Ke.slots.forEach((r, s) => {
        if (!r.live) {
          e.ok[s] = !1;
          return;
        }
        let o = r.ext[0] > 0.52,
          a = r.gun;
        if ((a && o && (e.ok[s] = !0), a && !o && e.ok[s] && e.t > 0)) {
          e.ok[s] = !1;
          let c = Xt.fingers.find((l) => l.hand === s && l.f === 1);
          c && i(c.dir, Ue.copy(c.dir).multiplyScalar(0.9).clone(), s);
        }
      });
      for (let r of Xt.pointers) r.src !== "hand" && r.down && !r.overUI && i(r.dir, new R(0, -0.3, 0), 0);
      for (let r of e.beam) r.m.visible && (r.t -= n) < 0 && (r.m.visible = !1);
    },
    exit(n) {
      Ei("blaster", n.st.sc);
    },
  });
  var l3 = 2,
    C0 = (n) => ye({ cat: "game", c: Ge.game[l3++ % 4], barLive: 8, ...n }),
    Fa = (n, t) => {
      try {
        let e = +(localStorage.getItem("rispx.best." + n) || 0);
        return t > e ? (localStorage.setItem("rispx.best." + n, t), t) : e;
      } catch {
        return t || 0;
      }
    },
    I0 = (n, t, e = 1.1) => {
      for (let i of Xt.fingers)
        if (i.strike) {
          let r = Mi(n, i.dir, e);
          r && t(r, i.strike);
        }
      for (let i of Xt.pointers)
        if (i.src === "hand" && i.down && !i.overUI) {
          let r = Mi(n, i.dir, e);
          r && t(r, 0.8);
        }
    };
  C0({
    id: "mole",
    name: "Toupeira",
    emoji: "🐹",
    dist: 2.4,
    y: -0.34,
    fit: 2.5,
    tips: !0,
    desc: "Bata nas toupeiras antes que elas se escondam",
    enter(n) {
      let t = n.st;
      (Object.assign(t, { sc: 0, t: 45, best: Fa("mole"), tm: 0.6 }),
        W.prepareDrums(["slap", "tumba"]),
        W.prepare("xylo", 76));
      let e = new Wt();
      ((e.rotation.x = 0.62), n.g.add(e));
      let i = new tt(new re(2.3, 0.2, 1.7), Nn("#5a7d2c", "#2c4a12", 0.7));
      ((i.position.y = -0.12), e.add(i));
      let r = (t.T = []),
        s = new tn(0.2, 18, 14),
        o = new Re(0.26, 0.26, 0.03, 24);
      for (let a = 0; a < 3; a++)
        for (let c = 0; c < 3; c++) {
          let l = (c - 1) * 0.72,
            h = (a - 1) * 0.55,
            u = new tt(o, Yt(1313798, 0.9));
          (u.position.set(l, 0, h), e.add(u));
          let d = new tt(s, Yt(9067056, 0.6, 0, { emissive: 16719888, emissiveIntensity: 0 }));
          (d.position.set(l, -0.26, h),
            (d.scale.y = 1.2),
            e.add(d),
            [-0.07, 0.07].forEach((f) => {
              let p = new tt(new tn(0.03, 8, 6), Yt(0, 0.2));
              (p.position.set(f, 0.08, 0.17), d.add(p));
            }),
            r.push({ p: new R(l, 0.1, h), r: 0.3, m: d, up: 0, act: 0, obj: e }));
        }
      ((n.scale = 1), bi(n, r, e));
    },
    bar(n, t, e, i) {
      let r = t.st;
      (n.t(r.sc + " pts", i + 60, 42, 28, "#fff", "center", 700),
        n.t(Math.ceil(r.t) + " s", i + 200, 42, 26),
        r.best && n.t("Recorde " + r.best, i + 320, 42, 17, It.mut),
        r.t <= 0 &&
          n.btn(
            "r",
            i + 430,
            16,
            100,
            52,
            "De novo",
            () => {
              Object.assign(r, { sc: 0, t: 45 });
            },
            { kind: "p", size: 16 },
          ));
    },
    update(n, t) {
      let e = t.st,
        i = e.T;
      if (
        (e.t > 0 &&
          ((e.t -= n), e.t <= 0 && ((e.best = Fa("mole", e.sc)), U.shell.toast("Tempo! " + e.sc + " pontos"))),
        e.t > 0 && (e.tm -= n) < 0)
      ) {
        e.tm = Zt(0.35, 0.85) * $t(e.t / 45, 0.55, 1);
        let r = i.filter((s) => !s.act);
        if (r.length) {
          let s = yi(r);
          s.act = Zt(0.8, 1.4);
        }
      }
      I0(
        i,
        (r, s) => {
          r.act > 0 &&
            r.up > 0.4 &&
            ((r.act = 0),
            (e.sc += 10),
            ee.hit(r.w, 16760896, 1),
            W.drum("slap", s, { silent: !0 }),
            W.note("xylo", 76 + nr(0, 7), 0.7, { silent: !0 }),
            (t.bar.dirty = !0),
            ni(r));
        },
        1,
      );
      for (let r of i) {
        r.act > 0 && (r.act -= n);
        let s = r.act > 0 ? 1 : 0;
        ((r.up += (s - r.up) * Math.min(1, n * 14)),
          (r.m.position.y = -0.26 + r.up * 0.34),
          (r.m.material.emissiveIntensity = Si(r, n, 6) * 2));
      }
    },
    exit(n) {
      Fa("mole", n.st.sc);
    },
  });
  var h3 = [
    [16724040, 64],
    [3211136, 69],
    [3182847, 72],
    [16764976, 76],
  ];
  C0({
    id: "simon",
    name: "Genius",
    emoji: "🔴",
    dist: 2.2,
    y: -0.06,
    fit: 1.9,
    tips: !0,
    desc: "Repita a sequência de luzes e sons",
    enter(n) {
      let t = n.st;
      (Object.assign(t, { seq: [], i: 0, state: "wait", t: 1, best: Fa("simon"), sc: 0 }), W.prepare("vibes", 70));
      let e = (t.T = []);
      (n.g.add(ri(0.95)),
        (n.g.children[0].rotation.x = Math.PI / 2),
        (n.g.children[0].position.z = -0.05),
        h3.forEach(([i, r], s) => {
          let o = (s / 4) * ve + ve / 8,
            a = new xr();
          (a.absarc(0, 0, 0.84, o - 0.72, o + 0.72, !1), a.absarc(0, 0, 0.3, o + 0.72, o - 0.72, !0));
          let c = Yt(i, 0.3, 0, { emissive: i, emissiveIntensity: 0.12 }),
            l = new tt(new Wr(a, { depth: 0.06, bevelEnabled: !1, curveSegments: 18 }), c);
          (n.g.add(l),
            e.push({
              p: new R(Math.cos(o) * 0.56, Math.sin(o) * 0.56, 0.06),
              r: 0.38,
              m: c,
              i: s,
              n: r,
              obj: n.g,
              c: i,
            }));
        }),
        (n.scale = 1),
        bi(n, e, n.g));
    },
    bar(n, t, e, i) {
      let r = t.st;
      (n.t("Rodada " + r.seq.length, i + 90, 42, 26, "#fff", "center", 700),
        n.t(r.state === "you" ? "Sua vez" : r.state === "lost" ? "Errou!" : "Observe", i + 260, 42, 22, It.cy),
        r.best && n.t("Recorde " + r.best, i + 400, 42, 17, It.mut),
        r.state === "lost" &&
          n.btn(
            "r",
            i + 490,
            16,
            100,
            52,
            "De novo",
            () => {
              Object.assign(r, { seq: [], state: "wait", t: 0.6 });
            },
            { kind: "p", size: 16 },
          ));
    },
    update(n, t) {
      let e = t.st,
        i = e.T,
        r = (s) => {
          (ni(s), W.note("vibes", s.n, 0.8, { silent: !0, group: "g" }), ee.ring(s.w, s.c, 0.4));
        };
      e.state === "wait"
        ? ((e.t -= n),
          e.t < 0 && (e.seq.push(nr(0, 3)), (e.i = 0), (e.state = "show"), (e.t = 0.3), (t.bar.dirty = !0)))
        : e.state === "show"
          ? ((e.t -= n),
            e.t < 0 &&
              (e.i < e.seq.length
                ? (r(i[e.seq[e.i++]]), (e.t = Math.max(0.28, 0.56 - e.seq.length * 0.02)))
                : ((e.state = "you"), (e.i = 0), (t.bar.dirty = !0))))
          : e.state === "you" &&
            I0(
              i,
              (s) => {
                s.i === e.seq[e.i]
                  ? (r(s),
                    e.i++,
                    e.i >= e.seq.length && ((e.best = Fa("simon", e.seq.length)), (e.state = "wait"), (e.t = 0.9)))
                  : ((e.state = "lost"), ni(s), W.note("sub", 34, 0.9, { silent: !0 }), (t.bar.dirty = !0));
              },
              1.05,
            );
      for (let s of i) s.m.emissiveIntensity = 0.1 + Si(s, n, 7) * 3;
    },
  });
  ye({
    id: "pong",
    cat: "game",
    c: Ge.game[1],
    name: "Pong",
    emoji: "🏓",
    w: 900,
    h: 560,
    live: 30,
    q: 1.1,
    desc: "A sua mão é a raquete contra o computador",
    init(n) {
      (Object.assign(n, { bx: 450, by: 280, vx: 330, vy: 150, p: 280, a: 280, sp: 0, sa: 0 }),
        W.prepare("marimba", 72));
    },
    tick(n, t, e) {
      let i = Xt.pointers.find((s) => {
        let o = e.hit(s.dir);
        return o && Math.abs(o.x - e.w / 2) < e.w;
      });
      if (i) {
        let s = e.hit(i.dir);
        t.p += ($t(s.y, 100, 500) - t.p) * Math.min(1, n * 22);
      }
      ((t.a += $t(t.by - t.a, -300 * n, 300 * n)),
        (t.bx += t.vx * n),
        (t.by += t.vy * n),
        (t.by < 72 || t.by > 540) &&
          ((t.vy *= -1), (t.by = $t(t.by, 72, 540)), W.note("marimba", 67, 0.4, { silent: !0 })));
      let r = (s, o, a) => {
        t.vx > 0 == a > 0 &&
          Math.abs(t.bx - s) < 14 &&
          Math.abs(t.by - o) < 70 &&
          ((t.vx = -t.vx * 1.05),
          (t.vy += (t.by - o) * 4),
          W.note("marimba", 72 + (a > 0 ? 0 : 7), 0.7, { silent: !0 }));
      };
      (r(52, t.p, -1),
        r(848, t.a, 1),
        (t.bx < 0 || t.bx > 900) &&
          (t.bx < 0 ? t.sa++ : t.sp++,
          W.note("bell", t.bx < 0 ? 60 : 84, 0.6, { silent: !0 }),
          Object.assign(t, { bx: 450, by: 280, vx: t.bx < 0 ? 330 : -330, vy: Zt(-180, 180) })));
    },
    draw(n, t, e) {
      let i = n.g;
      (i.setLineDash([12, 14]),
        i.beginPath(),
        i.moveTo(450, 66),
        i.lineTo(450, 548),
        (i.strokeStyle = "rgba(143,227,255,.3)"),
        (i.lineWidth = 3),
        i.stroke(),
        i.setLineDash([]),
        n.t(t.sp, 370, 112, 56, "#fff", "center", 700),
        n.t(t.sa, 530, 112, 56, "rgba(255,255,255,.5)", "center", 700),
        n.rr(36, t.p - 62, 16, 124, 8).fill(It.cy),
        n.rr(848, t.a - 62, 16, 124, 8).fill(It.red),
        i.beginPath(),
        i.arc(t.bx, t.by, 12, 0, ve),
        (i.fillStyle = "#fff"),
        i.fill());
    },
  });
  var R0 = ["🥁", "🎹", "🎸", "🌙", "🪐", "🌊", "🔥", "🌵"];
  ye({
    id: "memory",
    cat: "game",
    c: Ge.game[3],
    name: "Memória",
    emoji: "🃏",
    w: 740,
    h: 620,
    live: 12,
    desc: "Encontre todos os pares",
    init(n) {
      this.reset(n);
    },
    reset(n) {
      let t = [...R0, ...R0];
      for (let e = t.length; e--; ) {
        let i = nr(0, e);
        [t[e], t[i]] = [t[i], t[e]];
      }
      Object.assign(n, { c: t, up: [], done: new Set(), n: 0, lock: 0 });
    },
    tick(n, t) {
      if (t.lock > 0 && ((t.lock -= n), t.lock <= 0)) {
        let [e, i] = t.up;
        (t.c[e] === t.c[i] && (t.done.add(e), t.done.add(i), W.note("vibes", 72 + t.done.size, 0.7, { silent: !0 })),
          (t.up = []));
      }
    },
    draw(n, t, e) {
      (n.t(t.n + " jogadas", 30, 80, 20, It.cy, "left", 600),
        t.done.size === 16 &&
          n.btn("r", e.w - 200, 60, 170, 44, "Jogar de novo", () => this.reset(t), { kind: "p", size: 16 }),
        t.c.forEach((i, r) => {
          let s = 30 + (r % 4) * 172,
            o = 112 + (r >> 2) * 122,
            a = t.up.includes(r) || t.done.has(r),
            c = n.z("c" + r, s, o, 162, 112, {
              click: () => {
                a ||
                  t.lock > 0 ||
                  (t.up.push(r), W.note("xylo", 79, 0.4, { silent: !0 }), t.up.length === 2 && (t.n++, (t.lock = 0.7)));
              },
            });
          (n
            .rr(s, o, 162, 112, 14)
            .fill(a ? "rgba(47,140,255,.3)" : c ? "rgba(90,160,255,.3)" : "rgba(255,255,255,.08)")
            .stroke(t.done.has(r) ? It.green : It.line, 2),
            a &&
              ((n.g.font = '56px "Segoe UI Emoji",sans-serif'),
              (n.g.textAlign = "center"),
              (n.g.textBaseline = "middle"),
              (n.g.fillStyle = "#fff"),
              n.g.fillText(i, s + 81, o + 60)));
        }));
    },
  });
  var u3 = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    Pd = (n) => {
      for (let [t, e, i] of u3) if (n[t] && n[t] === n[e] && n[t] === n[i]) return n[t];
      return n.every(Boolean) ? "E" : null;
    };
  function P0(n, t, e) {
    let i = Pd(n);
    if (i) return i === "O" ? 10 - e : i === "X" ? e - 10 : 0;
    let r = t === "O" ? -99 : 99;
    return (
      n.forEach((s, o) => {
        if (s) return;
        n[o] = t;
        let a = P0(n, t === "O" ? "X" : "O", e + 1);
        ((n[o] = ""), (r = t === "O" ? Math.max(r, a) : Math.min(r, a)));
      }),
      r
    );
  }
  ye({
    id: "tictac",
    cat: "game",
    c: Ge.game[0],
    name: "Jogo da Velha",
    emoji: "⭕",
    w: 560,
    h: 620,
    desc: "Vença o computador, se conseguir",
    init(n) {
      ((n.b = Array(9).fill("")), (n.w = 0), (n.l = 0), (n.e = 0), (n.done = !1));
    },
    draw(n, t, e) {
      let i = (r) => {
        if (t.b[r] || t.done) return;
        if (((t.b[r] = "X"), W.note("marimba", 72, 0.6, { silent: !0 }), !Pd(t.b))) {
          let o = -1,
            a = -99;
          (t.b.forEach((c, l) => {
            if (c) return;
            t.b[l] = "O";
            let h = P0(t.b, "X", 0) + (Math.random() < 0.12 ? 3 : 0);
            ((t.b[l] = ""), h > a && ((a = h), (o = l)));
          }),
            (t.b[o] = "O"));
        }
        let s = Pd(t.b);
        s &&
          ((t.done = !0),
          s === "X" ? t.w++ : s === "O" ? t.l++ : t.e++,
          W.note("bell", s === "X" ? 84 : 67, 0.7, { silent: !0 }));
      };
      n.t(`Você ${t.w}  ·  Empates ${t.e}  ·  Computador ${t.l}`, e.w / 2, 84, 19, It.cy, "center", 600);
      for (let r = 0; r < 9; r++) {
        let s = 60 + (r % 3) * 150,
          o = 116 + ((r / 3) | 0) * 142;
        n.btn("b" + r, s, o, 140, 132, t.b[r], () => i(r), { size: 72, r: 16 });
      }
      t.done &&
        n.btn(
          "r",
          e.w / 2 - 110,
          546,
          220,
          50,
          "Nova partida",
          () => {
            ((t.b = Array(9).fill("")), (t.done = !1));
          },
          { kind: "p", size: 17 },
        );
    },
  });
