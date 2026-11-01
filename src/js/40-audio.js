  var $n = Math.PI * 2,
    ss = () => Math.random() * 2 - 1,
    Yn = (n, t) => new Float32Array(Math.ceil(n * t));
  function os(n, t, e, i = 0.0015, r = Yn(n, t)) {
    let s = r.length;
    for (let [a, c, l] of e) {
      if (a >= n * 0.46) continue;
      let h = ($n * a) / n,
        u = Math.exp(-1 / (l * n)),
        d = 2 * u * Math.cos(h),
        f = u * u,
        p = 0,
        x = (-c * Math.sin(h)) / u,
        g;
      for (let m = 0; m < s; m++) ((g = d * p - f * x), (r[m] += g), (x = p), (p = g));
    }
    let o = Math.max(1, Math.floor(i * n));
    for (let a = 0; a < o && a < s; a++) r[a] *= a / o;
    return r;
  }
  function as(n, t = 30, e = 32e3) {
    let i = Math.floor((t / 1e3) * e),
      r = n.length;
    for (let s = 0; s < i && s < r; s++) n[r - 1 - s] *= s / i;
    return n;
  }
  function Ve(n, t = 0.9) {
    let e = 0;
    for (let i = 0; i < n.length; i++) {
      let r = Math.abs(n[i]);
      r > e && (e = r);
    }
    if (e > 0) {
      let i = t / e;
      for (let r = 0; r < n.length; r++) n[r] *= i;
    }
    return n;
  }
  var y_ = (n, t, e) => {
    let i = 1 - Math.exp((-$n * t) / e),
      r = 0;
    for (let s = 0; s < n.length; s++) ((r += (n[s] - r) * i), (n[s] = r));
    return n;
  };
  function rh(n, t, e, i) {
    let r = ($n * t) / i,
      s = Math.sin(r) / (2 * e),
      o = Math.cos(r),
      a = 1 + s,
      c = s / a,
      l = (-2 * o) / a,
      h = (1 - s) / a,
      u = 0,
      d = 0,
      f = 0,
      p = 0;
    for (let x = 0; x < n.length; x++) {
      let g = n[x],
        m = c * g - c * d - l * f - h * p;
      ((d = u), (u = g), (p = f), (f = m), (n[x] = m));
    }
    return n;
  }
  function Oi(n, t, e) {
    let i = Math.exp((-$n * t) / e),
      r = 0;
    for (let s = 0; s < n.length; s++) ((r = r * i + n[s] * (1 - i)), (n[s] -= r));
    return n;
  }
  function Am(n, t) {
    let e = Math.min(6.5, Math.max(0.9, 5.5 * (261 / n) ** 0.5)),
      i = Math.min(3.6, e * 1.1),
      r = 7e-5 + 1e-7 * n,
      s = Math.min(16, Math.floor((t * 0.45) / n)),
      o = [];
    for (let h = 1; h <= s; h++) {
      let u = h * n * Math.sqrt(1 + r * h * h),
        d = (Math.abs(Math.sin(Math.PI * h * 0.13)) + 0.04) / h ** 0.85,
        f = e / (1 + 0.16 * h);
      o.push([u * 0.99981, d * 0.5, f], [u * 1.00022, d * 0.5, f * 0.86]);
    }
    let a = os(t, i, o, 0.001),
      c = Math.floor(t * 0.03),
      l = 0;
    for (let h = 0; h < c; h++) ((l += (ss() - l) * 0.22), (a[h] += l * 0.05 * (1 - h / c) ** 2));
    return as(Ve(a, 0.85));
  }
  function Rm(n, t) {
    let i = Yn(t, 2.6),
      r = ($n * n) / t,
      s = r * 14;
    for (let o = 0, a = i.length; o < a; o++) {
      let c = o / t,
        l = 1.5 * Math.exp(-c * 4.5) + 0.12;
      i[o] = Math.sin(r * o + l * Math.sin(r * o)) * Math.exp(-c * 1.25) + Math.sin(s * o) * 0.11 * Math.exp(-c * 26);
    }
    for (let o = 0; o < 40; o++) i[o] *= o / 40;
    return as(Ve(i, 0.8));
  }
  function Cm(n, t) {
    return _a(n, t, 1.6, { bright: 0.95, keep: 0.9935, pick: 0.08 });
  }
  function _a(n, t, e, i = {}) {
    let { bright: r = 0.6, keep: s = 0.9965, pick: o = 0.18, mix: a = 0.5 } = i,
      c = Yn(t, e),
      l = t / n + a,
      h = Math.floor(l),
      u = l - h,
      d = (1 - u) / (1 + u),
      f = new Float32Array(h + 2),
      p = 0,
      x = 0.05 + r * 0.95;
    for (let _ = 0; _ < h; _++) ((p += (ss() - p) * x), (f[_] = p));
    let g = Math.max(1, Math.floor(h * o));
    for (let _ = h - 1; _ >= g; _--) f[_] -= f[_ - g];
    let m = 0,
      y = 0,
      E = 0;
    for (let _ = 0; _ < c.length; _++) {
      let T = (m + 1) % h,
        w = f[m],
        v = (w * (1 - a) + f[T] * a) * s,
        S = d * v + E - d * y;
      ((E = v), (y = S), (f[m] = S), (c[_] = w), (m = T));
    }
    return as(c);
  }
  function Im(n, t) {
    let e = _a(n, t, 2.6, { bright: 0.62, keep: 0.9968, pick: 0.16 }),
      i = Float32Array.from(e);
    rh(i, 180, 1.4, t);
    for (let r = 0; r < e.length; r++) e[r] = e[r] * 0.8 + i[r] * 0.5;
    return Ve(e, 0.85);
  }
  function sd(n, t) {
    return Ve(_a(n, t, 2.8, { bright: 0.5, keep: 0.9978, pick: 0.12 }), 0.8);
  }
  function Pm(n, t) {
    let e = _a(n, t, 2.4, { bright: 0.22, keep: 0.9985, pick: 0.22 });
    return Ve(y_(e, 1500, t), 0.9);
  }
  function Lm(n, t) {
    return Ve(_a(n, t, 3.4, { bright: 0.32, keep: 0.9985, pick: 0.5 }), 0.85);
  }
  var Ar = (n, t, e) => (i, r) =>
      as(
        Ve(
          os(
            r,
            t,
            n.map(([s, o, a]) => [i * s, o, a * Math.min(1.5, (440 / i) ** 0.3)]),
            e,
          ),
          0.85,
        ),
      ),
    Dm = Ar(
      [
        [1, 1, 0.42],
        [4, 0.36, 0.1],
        [10, 0.1, 0.03],
      ],
      1.2,
    ),
    Nm = Ar(
      [
        [1, 1, 0.17],
        [3, 0.46, 0.06],
        [6.1, 0.24, 0.025],
        [10.2, 0.1, 0.012],
      ],
      0.7,
    ),
    Fm = Ar(
      [
        [1, 1, 1.7],
        [4, 0.22, 0.35],
        [10, 0.06, 0.08],
      ],
      3.4,
      0.002,
    ),
    Um = Ar(
      [
        [1, 1, 1.1],
        [2.76, 0.34, 0.4],
        [5.4, 0.18, 0.16],
        [8.9, 0.08, 0.06],
      ],
      2.2,
    ),
    Om = Ar(
      [
        [1, 1, 0.85],
        [2, 0.08, 0.3],
        [5.43, 0.34, 0.05],
        [11, 0.14, 0.012],
      ],
      1.8,
    ),
    Bm = Ar(
      [
        [1, 1, 1.5],
        [2, 0.5, 0.95],
        [3, 0.28, 0.5],
        [2.01, 0.22, 0.7],
        [4.03, 0.05, 0.2],
      ],
      3.2,
      0.004,
    ),
    km = Ar(
      [
        [1, 1, 0.8],
        [2, 0.62, 0.55],
        [3, 0.3, 0.3],
        [4, 0.24, 0.15],
      ],
      2,
      0.002,
    ),
    zm = Ar(
      [
        [0.5, 0.6, 2],
        [1, 1, 1.6],
        [1.19, 0.5, 1.1],
        [2, 0.4, 0.8],
        [3, 0.2, 0.4],
        [4.2, 0.1, 0.2],
      ],
      3.4,
      0.001,
    ),
    ih = [2, 3, 4.16, 5.43, 6.79, 8.21].map((n) => n * 40),
    Zs = (n, t, e, i, r) => {
      let s = n.length,
        o = e.map(() => Math.random()),
        a = e.map((c) => c / t);
      for (let c = 0; c < s; c++) {
        let l = 0;
        for (let h = 0; h < e.length; h++) ((o[h] += a[h]), (l += o[h] % 1 < 0.5 ? 1 : -1));
        n[c] += (l / e.length) * i * Math.exp((-c / t) * r);
      }
      return n;
    },
    or = (n, t, e) => {
      let i = Yn(n, t);
      for (let r = 0; r < i.length; r++) i[r] = ss() * Math.exp((-r / n) * e);
      return i;
    };
  var od = {
    kick(n) {
      let t = Yn(n, 0.5),
        e = 0;
      for (let i = 0; i < t.length; i++) {
        let r = i / n,
          s = 47 + 118 * Math.exp(-r * 36);
        ((e += ($n * s) / n),
          (t[i] = Math.tanh(Math.sin(e) * Math.exp(-r * 7) * 1.8) + ss() * 0.35 * Math.exp(-r * 500)));
      }
      return Ve(t, 0.95);
    },
    kick808(n) {
      let t = Yn(n, 1.1),
        e = 0;
      for (let i = 0; i < t.length; i++) {
        let r = i / n,
          s = 44 + 80 * Math.exp(-r * 30);
        ((e += ($n * s) / n), (t[i] = Math.tanh(Math.sin(e) * 1.6) * Math.exp(-r * 3.2)));
      }
      return Ve(t, 0.95);
    },
    snare(n) {
      let t = Oi(or(n, 0.36, 15), 1400, n);
      for (let e = 0; e < t.length; e++) {
        let i = e / n;
        t[e] = t[e] * 0.7 + (Math.sin($n * 188 * i) + 0.6 * Math.sin($n * 332 * i)) * 0.55 * Math.exp(-i * 26);
      }
      return Ve(t, 0.92);
    },
    rim(n) {
      let t = rh(or(n, 0.07, 90), 1800, 3, n);
      for (let e = 0; e < t.length; e++) t[e] += Math.sin(($n * 1700 * e) / n) * 0.3 * Math.exp((-e / n) * 110);
      return Ve(t, 0.8);
    },
    clap(n) {
      let t = Yn(n, 0.42);
      for (let e of [0, 0.012, 0.024, 0.036]) {
        let i = Math.floor(e * n),
          r = e === 0.036 ? t.length - i : Math.floor(0.02 * n);
        for (let s = 0; s < r; s++) t[i + s] += ss() * Math.exp((-s / n) * (e === 0.036 ? 16 : 200));
      }
      return Ve(rh(t, 1500, 0.9, n), 0.85);
    },
    hat(n) {
      return Ve(Oi(Zs(Oi(or(n, 0.09, 75), 8e3, n), n, ih, 0.5, 70), 7e3, n), 0.6);
    },
    ohat(n) {
      return Ve(Oi(Zs(Oi(or(n, 0.55, 9), 7500, n), n, ih, 0.5, 8), 6500, n), 0.6);
    },
    tom1(n) {
      return rd(n, 262);
    },
    tom2(n) {
      return rd(n, 198);
    },
    floor(n) {
      return rd(n, 128);
    },
    crash(n) {
      return Ve(
        Oi(
          Zs(
            or(n, 2.2, 2.6),
            n,
            ih.map((t) => t * 1.37),
            0.4,
            2.6,
          ),
          3e3,
          n,
        ),
        0.7,
      );
    },
    crash2(n) {
      return Ve(
        Oi(
          Zs(
            or(n, 1.8, 3.2),
            n,
            ih.map((t) => t * 1.62),
            0.45,
            3,
          ),
          3600,
          n,
        ),
        0.7,
      );
    },
    ride(n) {
      let t = Oi(or(n, 1.4, 3.6), 5200, n);
      for (let e = 0; e < t.length; e++) t[e] *= 0.32;
      return (Zs(t, n, [520, 1230, 1870, 2650, 3490], 0.3, 3.2), Ve(t, 0.6));
    },
    bellr(n) {
      return Ve(
        os(n, 1.3, [
          [1120, 1, 0.5],
          [2480, 0.7, 0.4],
          [3610, 0.5, 0.3],
          [5100, 0.3, 0.2],
        ]),
        0.6,
      );
    },
    cowbell(n) {
      let t = Yn(n, 0.4);
      return (Zs(t, n, [540, 800], 1, 9), Ve(rh(t, 900, 1.2, n), 0.7));
    },
    conga(n) {
      return ya(n, 196);
    },
    conga2(n) {
      return ya(n, 262);
    },
    tumba(n) {
      return ya(n, 146);
    },
    bongo(n) {
      return ya(n, 392);
    },
    bongo2(n) {
      return ya(n, 520);
    },
    slap(n) {
      let t = Oi(or(n, 0.2, 28), 900, n);
      return (
        os(
          n,
          0.2,
          [
            [320, 0.9, 0.05],
            [510, 0.6, 0.04],
          ],
          5e-4,
          t,
        ),
        Ve(t, 0.9)
      );
    },
    shaker(n) {
      let t = Oi(or(n, 0.12, 30), 5e3, n);
      for (let e = 0; e < 400; e++) t[e] *= e / 400;
      return Ve(t, 0.5);
    },
  };
  function rd(n, t) {
    let e = Yn(n, 0.75),
      i = 0,
      r = 6 + t / 80;
    for (let s = 0; s < e.length; s++) {
      let o = s / n,
        a = t * (1 + 0.55 * Math.exp(-o * 24));
      ((i += ($n * a) / n),
        (e[s] =
          Math.sin(i) * Math.exp(-o * r) +
          0.5 * Math.sin(i * 1.6) * Math.exp(-o * r * 2.3) +
          ss() * 0.22 * Math.exp(-o * 200)));
    }
    return Ve(e, 0.92);
  }
  function ya(n, t) {
    let e = Yn(n, 0.6),
      i = 0;
    for (let r = 0; r < e.length; r++) {
      let s = r / n,
        o = t * (1 + 0.12 * Math.exp(-s * 40));
      ((i += ($n * o) / n),
        (e[r] =
          Math.sin(i) * Math.exp(-s * 11) +
          0.4 * Math.sin(i * 1.59) * Math.exp(-s * 28) +
          0.22 * Math.sin(i * 2.14) * Math.exp(-s * 40) +
          ss() * 0.18 * Math.exp(-s * 300)));
    }
    return Ve(e, 0.9);
  }
  function Hm(n, t) {
    let e = Yn(t, 0.9);
    for (let r of [1, 1.003, 0.997, 2]) {
      let s = Math.random(),
        o = (n * r) / t;
      for (let a = 0; a < e.length; a++)
        ((s += o), (e[a] += ((s % 1) * 2 - 1) * (r === 2 ? 0.3 : 0.5) * Math.exp((-a / t) * 5)));
    }
    let i = 0;
    for (let r = 0; r < e.length; r++) {
      let s = 0.05 + 0.4 * Math.exp((-r / t) * 9);
      ((i += (e[r] - i) * s), (e[r] = i));
    }
    return as(Ve(e, 0.75));
  }
  function Gm(n, t) {
    let e = Yn(t, 1),
      i = 0;
    for (let r = 0; r < e.length; r++)
      ((i += ($n * n) / t), (e[r] = Math.tanh(1.4 * Math.sin(i) + 0.5 * Math.sin(i * 2)) * Math.exp((-r / t) * 2.4)));
    for (let r = 0; r < 40; r++) e[r] *= r / 40;
    return as(Ve(e, 0.9));
  }
  function Vm(n, t) {
    let e = Yn(t, 1.2),
      i = 0,
      r = 0;
    for (let s = 0; s < e.length; s++) {
      let o = s / t;
      i += n / t;
      let a = i % 1 < 0.5 ? 1 : -1;
      ((r += (a - r) * (0.04 + 0.5 * Math.exp(-o * 14))), (e[s] = r * Math.exp(-o * 3.4)));
    }
    return as(Ve(e, 0.75));
  }
  var ba = 32e3,
    ad = [36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96],
    Wm = {
      piano: { fn: Am, roots: ad, rel: 0.28, gain: 0.8, rev: 0.7 },
      epiano: { fn: Rm, roots: ad.filter((n, t) => t % 2 === 0), rel: 0.2, gain: 0.62, rev: 0.6 },
      harpsi: { fn: Cm, roots: ad.filter((n, t) => t % 2 === 0), rel: 0.12, gain: 0.6, rev: 0.5 },
      acoustic: { fn: Im, roots: [40, 45, 50, 55, 60, 65, 70, 76, 82], rel: 0.1, gain: 0.75, rev: 0.6 },
      eguitar: { fn: sd, roots: [40, 45, 50, 55, 60, 65, 70, 76, 82], rel: 0.1, gain: 0.7, rev: 0.55, drive: "clean" },
      dist: { fn: sd, roots: [40, 45, 50, 55, 60, 65, 70, 76, 82], rel: 0.1, gain: 0.5, rev: 0.4, drive: "hard" },
      bass: { fn: Pm, roots: [28, 33, 38, 43, 48, 53, 58], rel: 0.1, gain: 0.95, rev: 0.1 },
      harp: { fn: Lm, roots: [36, 43, 50, 57, 64, 71, 78, 85, 92], rel: 0.3, gain: 0.7, rev: 1 },
      marimba: { fn: Dm, roots: [48, 55, 62, 69, 76, 83, 90], rel: 0.1, gain: 0.85, rev: 0.6 },
      xylo: { fn: Nm, roots: [55, 62, 69, 76, 83, 90, 97], rel: 0.05, gain: 0.75, rev: 0.55 },
      vibes: { fn: Fm, roots: [48, 55, 62, 69, 76, 83, 90], rel: 0.4, gain: 0.7, rev: 0.8 },
      glock: { fn: Um, roots: [62, 69, 76, 83, 90, 97], rel: 0.3, gain: 0.55, rev: 0.8 },
      kalimba: { fn: Om, roots: [52, 60, 67, 74, 81, 88], rel: 0.2, gain: 0.8, rev: 0.7 },
      handpan: { fn: Bm, roots: [50, 57, 64, 71, 78, 85], rel: 0.4, gain: 0.8, rev: 1 },
      steel: { fn: km, roots: [55, 62, 69, 76, 83, 90], rel: 0.3, gain: 0.65, rev: 0.7 },
      bell: { fn: zm, roots: [60, 67, 74, 81, 88], rel: 0.4, gain: 0.6, rev: 1 },
      stab: { fn: Hm, roots: [48, 55, 62, 69, 76], rel: 0.15, gain: 0.55, rev: 0.7 },
      sub: { fn: Gm, roots: [24, 31, 38, 45, 52], rel: 0.1, gain: 0.9, rev: 0 },
      plk: { fn: Vm, roots: [48, 55, 62, 69, 76, 83, 90], rel: 0.12, gain: 0.55, rev: 0.8 },
    },
    Ma = [],
    cd = null,
    ld = {},
    W = {
      ctx: null,
      buf: {},
      drums: {},
      user: {},
      onNote: null,
      busy: !1,
      init() {
        if (this.ctx) {
          this.ctx.resume();
          return;
        }
        let n = (this.ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" })),
          t = (this.master = n.createGain());
        t.gain.value = q.vol;
        let e = (this.dry = n.createGain()),
          i = n.createDynamicsCompressor();
        ((i.threshold.value = -12), (i.ratio.value = 6), (i.attack.value = 0.003), (i.release.value = 0.16));
        let r = (this.rv = n.createConvolver());
        r.buffer = this.ir(2.4, 2.8);
        let s = (this.rs = n.createGain()),
          o = (this.rr = n.createGain());
        ((s.gain.value = 1), (o.gain.value = q.reverb));
        let a = n.createDelay(1.2);
        a.delayTime.value = 0.34;
        let c = n.createGain();
        c.gain.value = 0.32;
        let l = (this.ds = n.createGain());
        l.gain.value = 0.5;
        let h = n.createBiquadFilter();
        ((h.frequency.value = 2600),
          e.connect(i),
          s.connect(r),
          r.connect(o),
          o.connect(i),
          l.connect(a),
          a.connect(h),
          h.connect(c),
          c.connect(a),
          h.connect(i),
          i.connect(t),
          t.connect(n.destination));
        let u = (this.an = n.createAnalyser());
        ((u.fftSize = 1024),
          (u.smoothingTimeConstant = 0.72),
          t.connect(u),
          (this.fft = new Uint8Array(u.frequencyBinCount)),
          (this.wave = new Uint8Array(u.fftSize)),
          (this.rec = n.createMediaStreamDestination()),
          t.connect(this.rec));
        let d = (f) => {
          let x = new Float32Array(2048);
          for (let g = 0; g < 2048; g++) {
            let m = (g / 2048) * 2 - 1;
            x[g] = Math.tanh(m * f) / Math.tanh(f);
          }
          return x;
        };
        this.ws = {};
        for (let [f, p] of [
          ["clean", 2.2],
          ["hard", 16],
        ]) {
          let x = n.createWaveShaper();
          ((x.curve = d(p)), (x.oversample = "2x"));
          let g = n.createBiquadFilter();
          ((g.type = "lowpass"), (g.frequency.value = f === "hard" ? 3600 : 5200));
          let m = n.createGain();
          ((m.gain.value = f === "hard" ? 0.36 : 0.7),
            x.connect(g),
            g.connect(m),
            m.connect(e),
            m.connect(s),
            (this.ws[f] = x));
        }
        ((this.tickB = this.mk(os(ba, 0.04, [[1900, 1, 0.008]]))),
          (this.clickB = this.mk(
            os(ba, 0.08, [
              [1100, 1, 0.02],
              [1650, 0.6, 0.014],
            ]),
          )),
          this.loadUserKit(),
          n.resume());
      },
      ir(n, t) {
        let e = this.ctx,
          i = Math.floor(e.sampleRate * n),
          r = e.createBuffer(2, i, e.sampleRate);
        for (let s = 0; s < 2; s++) {
          let o = r.getChannelData(s),
            a = 0;
          for (let c = 0; c < i; c++) {
            let l = c / i,
              h = 0.1 + 0.55 * Math.exp(-l * 5);
            ((a += (Math.random() * 2 - 1 - a) * h), (o[c] = a * (1 - l) ** t * (c < 200 ? c / 200 : 1)));
          }
        }
        return r;
      },
      mk(n, t = ba) {
        let e = this.ctx.createBuffer(1, n.length, t);
        return (e.copyToChannel(n, 0), e);
      },
      resume() {
        this.ctx && this.ctx.resume();
      },
      setVol(n) {
        ((q.vol = n), this.master && (this.master.gain.value = n));
      },
      setRev(n) {
        ((q.reverb = n), this.rr && (this.rr.gain.value = n));
      },
      tick() {
        this.ctx && this.oneshot(this.tickB, 0.1);
      },
      click() {
        this.ctx && this.oneshot(this.clickB, 0.22);
      },
      oneshot(n, t, e = 1) {
        let i = this.ctx,
          r = i.createBufferSource(),
          s = i.createGain();
        ((r.buffer = n), (r.playbackRate.value = e), (s.gain.value = t), r.connect(s), s.connect(this.dry), r.start());
      },
      async prepare(n, t = 60) {
        let e = Wm[n];
        if (!e || !this.ctx) return;
        let i = [...e.roots].sort((r, s) => Math.abs(r - t) - Math.abs(s - t));
        for (let r of i) this.buf[n + r] || ((this.buf[n + r] = this.mk(e.fn(Ni(r), ba))), await Yu());
      },
      root(n, t, e) {
        let i = n.roots[0],
          r = 1e9;
        for (let s of n.roots) {
          let o = Math.abs(s - e);
          o < r && ((r = o), (i = s));
        }
        return (this.buf[t + i] || (this.buf[t + i] = this.mk(n.fn(Ni(i), ba))), i);
      },
      note(n, t, e = 0.8, i = {}) {
        if (!this.ctx) return null;
        let r = Wm[n];
        if (!r) return null;
        let s = this.ctx,
          o = this.root(r, n, t),
          a = s.createBufferSource(),
          c = s.createGain(),
          l = i.when || 0;
        ((a.buffer = this.buf[n + o]), (a.playbackRate.value = 2 ** ((t - o) / 12)));
        let h = s.createBiquadFilter();
        ((h.type = "lowpass"),
          (h.frequency.value = 900 + 9e3 * Math.min(1, e) ** 1.6),
          (h.Q.value = 0.3),
          (c.gain.value = r.gain * Math.min(1.25, 0.22 + e * 0.85) * (i.gain ?? 1)),
          a.connect(h),
          h.connect(c));
        let u = s.createStereoPanner ? s.createStereoPanner() : null,
          d = c;
        if ((u && ((u.pan.value = i.pan || 0), c.connect(u), (d = u)), r.drive)) d.connect(this.ws[r.drive]);
        else if ((d.connect(this.dry), r.rev)) {
          let p = s.createGain();
          ((p.gain.value = r.rev * 0.5), d.connect(p), p.connect(this.rs));
        }
        a.start(l);
        let f = {
          s: a,
          g: c,
          rel: r.rel,
          stop: (p = 0) => {
            let x = p || s.currentTime;
            try {
              (c.gain.cancelScheduledValues(x), c.gain.setTargetAtTime(0, x, f.rel / 3), a.stop(x + f.rel * 1.6));
            } catch {}
          },
        };
        if (
          (Ma.push(f),
          (a.onended = () => {
            let p = Ma.indexOf(f);
            p >= 0 && Ma.splice(p, 1);
          }),
          Ma.length > 56 && Ma[0].stop(),
          i.group !== void 0)
        ) {
          let p = n + i.group;
          (ld[p] && ld[p].stop(l), (ld[p] = f));
        }
        return (!i.silent && this.onNote && this.onNote({ b: n, m: t, v: e }), f);
      },
      async prepareDrums(n) {
        for (let t of n) this.drums[t] || ((this.drums[t] = this.mk(od[t](44100), 44100)), await Yu());
      },
      drum(n, t = 0.85, e = {}) {
        if (!this.ctx) return;
        let i = this.ctx,
          r = this.user[n] || this.drums[n] || (this.drums[n] = this.mk(od[n](44100), 44100)),
          s = i.createBufferSource(),
          o = i.createGain(),
          a = e.when || 0;
        ((s.buffer = r),
          (s.playbackRate.value = (e.rate || 1) * (0.985 + Math.random() * 0.03)),
          (o.gain.value = Math.min(1.3, 0.2 + t * 0.95) * (e.gain ?? 1)),
          s.connect(o));
        let c = i.createStereoPanner ? i.createStereoPanner() : null,
          l = o;
        (c && ((c.pan.value = e.pan || 0), o.connect(c), (l = c)), l.connect(this.dry));
        let h = i.createGain();
        if (((h.gain.value = 0.28), l.connect(h), h.connect(this.rs), n === "hat" || n === "ohat")) {
          if (cd)
            try {
              cd.gain.setTargetAtTime(0, a || i.currentTime, 0.012);
            } catch {}
          cd = o;
        }
        (s.start(a), !e.silent && this.onNote && this.onNote({ d: n, v: t }));
      },
      level() {
        if (!this.an) return 0;
        this.an.getByteFrequencyData(this.fft);
        let n = 0;
        for (let t = 2; t < 40; t++) n += this.fft[t];
        return n / 9690;
      },
      async loadUserKit() {
        let n = await pn.get("kit");
        if (n)
          for (let t in n)
            try {
              this.user[t] = await this.ctx.decodeAudioData(n[t].slice(0));
            } catch {}
      },
    },
    b_ = {
      theremin: {
        w: [
          ["sine", 1, 1],
          ["triangle", 2, 0.1],
          ["sine", 3, 0.05],
        ],
        cut: 5e3,
        atk: 0.03,
        rel: 0.1,
      },
      saw: {
        w: [
          ["sawtooth", 1, 0.5],
          ["sawtooth", 1.006, 0.5],
        ],
        cut: 1800,
        atk: 0.01,
        rel: 0.16,
        Q: 7,
      },
      pad: {
        w: [
          ["sawtooth", 1, 0.34],
          ["sawtooth", 1.004, 0.34],
          ["sawtooth", 0.996, 0.34],
          ["sine", 0.5, 0.4],
        ],
        cut: 900,
        atk: 0.28,
        rel: 0.6,
        Q: 1,
      },
      square: {
        w: [
          ["square", 1, 0.5],
          ["square", 0.5, 0.4],
        ],
        cut: 1200,
        atk: 0.008,
        rel: 0.1,
        Q: 9,
        lfo: 7,
      },
      organ: {
        w: [
          ["sine", 1, 0.6],
          ["sine", 2, 0.36],
          ["sine", 3, 0.24],
          ["sine", 4, 0.14],
          ["sine", 6, 0.09],
          ["sine", 8, 0.06],
        ],
        cut: 7e3,
        atk: 0.012,
        rel: 0.07,
      },
      strings: {
        w: [
          ["sawtooth", 1, 0.3],
          ["sawtooth", 1.003, 0.3],
          ["sawtooth", 0.9975, 0.3],
          ["sawtooth", 2.002, 0.12],
        ],
        cut: 2600,
        atk: 0.16,
        rel: 0.4,
        Q: 0.7,
      },
    },
    ar = class {
      constructor(t, e = 0.3) {
        let i = W.ctx,
          r = (this.P = b_[t]);
        ((this.base = 220),
          (this.g = i.createGain()),
          (this.g.gain.value = 0),
          (this.f = i.createBiquadFilter()),
          (this.f.type = "lowpass"),
          (this.f.frequency.value = r.cut),
          (this.f.Q.value = r.Q || 0.7),
          (this.out = e),
          (this.os = r.w.map(([o, a, c]) => {
            let l = i.createOscillator(),
              h = i.createGain();
            return (
              (l.type = o),
              (l.frequency.value = 220 * a),
              (h.gain.value = c),
              l.connect(h),
              h.connect(this.f),
              l.start(),
              { o: l, m: a }
            );
          })),
          this.f.connect(this.g),
          this.g.connect(W.dry));
        let s = i.createGain();
        if (((s.gain.value = 0.5), this.g.connect(s), s.connect(W.rs), s.connect(W.ds), r.lfo)) {
          let o = (this.lfo = i.createOscillator()),
            a = i.createGain();
          ((o.frequency.value = r.lfo), (a.gain.value = 700), o.connect(a), a.connect(this.f.frequency), o.start());
        }
      }
      freq(t, e = 0.02) {
        let i = W.ctx.currentTime;
        for (let r of this.os) r.o.frequency.setTargetAtTime(t * r.m, i, e);
      }
      cut(t) {
        this.f.frequency.setTargetAtTime(t, W.ctx.currentTime, 0.02);
      }
      amp(t) {
        this.g.gain.setTargetAtTime(t * this.out, W.ctx.currentTime, Math.max(0.008, this.P.atk * 0.5));
      }
      off() {
        this.g.gain.setTargetAtTime(0, W.ctx.currentTime, this.P.rel * 0.4);
      }
      kill() {
        let t = W.ctx.currentTime;
        this.g.gain.setTargetAtTime(0, t, 0.03);
        for (let e of this.os) e.o.stop(t + 0.3);
        this.lfo && this.lfo.stop(t + 0.3);
      }
    },
    Xm = [
      [/kick|bumbo|bass.?drum/, "kick"],
      [/snare|caixa/, "snare"],
      [/tom.?1|hi.?tom|rack/, "tom1"],
      [/tom.?2|mid.?tom/, "tom2"],
      [/floor|surdo|tom.?3|tom.?4|low.?tom/, "floor"],
      [/hi.?hat|hat|chimbal|hh/, "hat"],
      [/crash|ataque/, "crash"],
      [/ride|conduc/, "ride"],
    ];
  U.audio = W;
