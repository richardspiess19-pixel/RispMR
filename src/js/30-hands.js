  var Js = [4, 8, 12, 16, 20],
    kn = 21,
    sr = 22,
    es = 23,
    Qu = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [5, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [9, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [13, 17],
      [17, 18],
      [18, 19],
      [19, 20],
      [0, 17],
      [1, 5],
      [2, 5],
    ],
    h_ = 250,
    u_ = 240,
    fm = (n, t) => 1 / (1 + 1 / (ve * n * t)),
    ne = new Float32Array(es * 3),
    Ks = new Float32Array(63),
    Jl = class {
      constructor(t) {
        ((this.i = t),
          (this.live = !1),
          (this.vis = 0),
          (this.t = 0),
          (this.seen = -1e9),
          (this.lite = !1),
          (this.p = new Float32Array(es * 3)),
          (this.v = new Float32Array(es * 3)),
          (this.d = new Float32Array(es * 3)),
          (this.w = new Float32Array(63)),
          (this.vote = 0),
          (this.side = "Right"),
          (this.palm = 0.15),
          (this.pinchR = 1),
          (this.pinchS = 0),
          (this.pinch = !1),
          (this.pinchDown = !1),
          (this.pinchUp = !1),
          (this.ext = new Float32Array(5)),
          (this.curl = 0),
          (this.facing = !1),
          (this.open = !1),
          (this.gun = !1),
          (this.fist = !1),
          (this.dist = 0.4),
          (this.reach = 0.5),
          (this.strike = new Float32Array(5)),
          (this.arm = [1, 1, 1, 1, 1]),
          (this.st = new Float32Array(5)),
          (this.toolStrike = 0),
          (this.toolArm = 1),
          (this.toolT = 0),
          (this.palmStrike = 0),
          (this.palmArm = 1),
          (this.palmT = 0),
          (this.swing = Array.from({ length: 7 }, () => ({ pk: 0, t0: 0 }))),
          (this.cx = 0),
          (this.cy = 0),
          (this.hist = []),
          (this.ax = 0),
          (this.ay = 0),
          (this.mx0 = 0),
          (this.my0 = 0),
          (this.hold = !1));
      }
      reset(t) {
        (this.p.set(ne),
          this.d.set(ne),
          this.v.fill(0),
          this.w.set(Ks),
          (this.t = t),
          (this.live = !0),
          (this.hist.length = 0),
          (this.pinch = !1),
          (this.pinchR = 1),
          (this.pinchS = 0),
          (this.hold = !1),
          this.arm.fill(1),
          (this.toolArm = 1),
          (this.palmArm = 1),
          (this.vote = 0));
        for (let e of this.swing) e.pk = 0;
      }
      feed(t) {
        let e = $t((t - this.t) / 1e3, 0.004, 0.12),
          { p: i, v: r, w: s } = this,
          o = fm(7, e);
        this.t = t;
        for (let a = 0; a < es; a++) {
          let c = a * 3,
            l = (r[c] += ((ne[c] - i[c]) / e - r[c]) * o),
            h = (r[c + 1] += ((ne[c + 1] - i[c + 1]) / e - r[c + 1]) * o);
          r[c + 2] += ((ne[c + 2] - i[c + 2]) / e - r[c + 2]) * o;
          let u = fm(1.1 + 16 * Math.max(0, Math.hypot(l, h) - 0.16), e);
          ((i[c] += (ne[c] - i[c]) * u),
            (i[c + 1] += (ne[c + 1] - i[c + 1]) * u),
            (i[c + 2] += (ne[c + 2] - i[c + 2]) * u * 0.6));
        }
        for (let a = 0; a < 63; a++) s[a] += (Ks[a] - s[a]) * 0.55;
      }
      features(t) {
        let { p: e, w: i } = this,
          r = (w, v) =>
            Math.hypot(e[w * 3] - e[v * 3], e[w * 3 + 1] - e[v * 3 + 1], (e[w * 3 + 2] - e[v * 3 + 2]) * 0.6),
          s = (w, v) => Math.hypot(i[w * 3] - i[v * 3], i[w * 3 + 1] - i[v * 3 + 1], i[w * 3 + 2] - i[v * 3 + 2]);
        this.palm = Math.max(0.01, (r(0, 9) + r(5, 17) * 1.15) / 2);
        // Pinça medida em 3D (landmarks de mundo, em metros), relativa ao tamanho da palma.
        // Não depende do ângulo da mão para a câmera. A medida antiga em 2D via punho fechado
        // como pinça (0,20 < 0,30); em 3D o punho fica em ~0,40 e a mão relaxada em ~0,38.
        let pw = Math.max(0.03, s(0, 9)),
          tip = s(8, 9) / pw,
          fast = Math.hypot(this.v[27], this.v[28]) > 2.4,
          o = this.pinch;
        ((this.pinchR += (s(4, 8) / pw - this.pinchR) * 0.6),
          (this.pinchS = $t((0.44 - this.pinchR) / 0.2)),
          o
            ? this.pinchR > 0.42 && (this.pinch = !1)
            : this.pinchR < 0.28 && tip > 0.5 && !fast && (this.pinch = !0),
          this.pinch && !o && ((this.pinchDown = !0), this.startHold()),
          !this.pinch && o && ((this.pinchUp = !0), (this.hold = !1)));
        let a = [
            [2, 3, 4],
            [5, 6, 8],
            [9, 10, 12],
            [13, 14, 16],
            [17, 18, 20],
          ],
          c = 0;
        for (let w = 0; w < 5; w++) {
          let [v, S, F] = a[w];
          ((this.ext[w] = $t((s(0, F) / Math.max(0.001, s(0, S)) - 1.02) / 0.42)),
            w && (c += 1 - this.ext[w]),
            w === 0 && (this.ext[0] = $t((s(F, 17) / Math.max(0.001, s(v, 17)) - 0.95) / 0.4)));
        }
        this.curl = c / 4;
        let l = this.ext;
        ((this.open = l[1] > 0.6 && l[2] > 0.6 && l[3] > 0.55 && l[4] > 0.5),
          (this.fist = l[1] < 0.3 && l[2] < 0.3 && l[3] < 0.3 && l[4] < 0.3),
          (this.gun = l[1] > 0.55 && l[2] < 0.4 && l[3] < 0.4 && l[4] < 0.45));
        let h = i[15] - i[0],
          u = i[16] - i[1],
          d = i[17] - i[2],
          f = i[51] - i[0],
          p = i[52] - i[1],
          x = i[53] - i[2],
          g = u * x - d * p,
          m = d * f - h * x,
          y = h * p - u * f,
          E = Math.hypot(g, m, y) || 1;
        this.facing = (this.side === "Right" ? -y : y) / E > 0.5;
        let T = Math.max(0.05, s(0, 9)) / (2 * U.view.tv * Math.max(0.02, r(0, 9)));
        ((this.dist += ($t(T, 0.12, 1.4) - this.dist) * 0.25),
          (this.reach = $t((this.dist - 0.22) / 0.42)),
          this.strikes(t));
      }
      strikes(t) {
        let e = this.v,
          i = q.hit,
          r = 0;
        for (let l = 0; l < 5; l++) r = Math.max(r, e[Js[l] * 3 + 1]);
        for (let l = 0; l < 5; l++) {
          let h = e[Js[l] * 3 + 1],
            u = this.swing[l];
          u.pk > 0
            ? ((u.pk = Math.max(u.pk, h)),
              (h < u.pk * 0.72 || t - u.t0 > 320) &&
                (t - this.st[l] > 75 &&
                  ((this.st[l] = t), (this.strike[l] = $t(0.32 + (u.pk - i) / (i * 2.6), 0.25, 1.25))),
                (u.pk = 0),
                (this.arm[l] = 0)))
            : this.arm[l]
              ? h > i && h >= r * 0.62 && (l === 0 || this.ext[l] > 0.25) && ((u.pk = h), (u.t0 = t))
              : h < i * 0.25 && (this.arm[l] = 1);
        }
        let s = e[kn * 3 + 1],
          o = this.swing[5];
        o.pk > 0
          ? ((o.pk = Math.max(o.pk, s)),
            (s < o.pk * 0.72 || t - o.t0 > 320) &&
              (t - this.toolT > 90 &&
                ((this.toolT = t), (this.toolStrike = $t(0.32 + (o.pk - i * 1.5) / (i * 4), 0.25, 1.25))),
              (o.pk = 0),
              (this.toolArm = 0)))
          : this.toolArm
            ? s > i * 1.5 && ((o.pk = s), (o.t0 = t))
            : s < i * 0.4 && (this.toolArm = 1);
        let a = e[28],
          c = this.swing[6];
        c.pk > 0
          ? ((c.pk = Math.max(c.pk, a)),
            (a < c.pk * 0.72 || t - c.t0 > 320) &&
              (t - this.palmT > 90 &&
                ((this.palmT = t), (this.palmStrike = $t(0.32 + (c.pk - i * 0.8) / (i * 2.2), 0.25, 1.25))),
              (c.pk = 0),
              (this.palmArm = 0)))
          : this.palmArm
            ? a > i * 0.8 && ((c.pk = a), (c.t0 = t))
            : a < i * 0.2 && (this.palmArm = 1);
      }
      startHold() {
        let t = this.hist,
          e = U.now - 140,
          i = t[0];
        for (let r of t) r.t <= e && (i = r);
        ((this.ax = i ? i.x : this.cx),
          (this.ay = i ? i.y : this.cy),
          (this.mx0 = this.p[sr * 3]),
          (this.my0 = this.p[sr * 3 + 1]),
          (this.hold = !0));
      }
      render(t, e) {
        let { p: i, v: r, d: s } = this,
          o = $t((t - this.t) / 1e3, 0, 0.11) * q.predict,
          a = 1 - Math.exp(-e * 90),
          c = t - this.seen;
        if (this.live && c > 40) {
          let l = Math.exp(-e * 9);
          for (let h = 0; h < es * 3; h++) r[h] *= l;
        }
        for (let l = 0; l < es; l++) {
          let h = l * 3,
            u = $t((Math.hypot(r[h], r[h + 1]) - 0.16) / 0.4);
          ((s[h] += (i[h] + r[h] * o * u - s[h]) * a),
            (s[h + 1] += (i[h + 1] + r[h + 1] * o * u - s[h + 1]) * a),
            (s[h + 2] += (i[h + 2] + r[h + 2] * o * u * 0.5 - s[h + 2]) * a));
        }
        // celular lento (poucas leituras/s): espera ~2,5 leituras antes de dar a mão como perdida
        (this.live && c > Math.min(700, Math.max(h_, Ke.gap * 2.5)) && ((this.live = !1), (this.pinch = !1), (this.hold = !1)),
          (this.vis += ((this.live ? 1 : 0) - this.vis) * (1 - Math.exp(-e * (this.live ? 16 : (1e3 / u_) * 2)))),
          this.hold
            ? ((this.cx = this.ax + s[sr * 3] - this.mx0), (this.cy = this.ay + s[sr * 3 + 1] - this.my0))
            : ((this.cx = s[24]), (this.cy = s[25])),
          this.hist.push({ t, x: this.cx, y: this.cy }),
          this.hist.length > 24 && this.hist.shift());
      }
      x(t) {
        return this.d[t * 3];
      }
      y(t) {
        return this.d[t * 3 + 1];
      }
      z(t) {
        return this.d[t * 3 + 2];
      }
      vy(t) {
        return this.v[t * 3 + 1];
      }
      vx(t) {
        return this.v[t * 3];
      }
    },
    Ke = {
      slots: [new Jl(0), new Jl(1)],
      hz: 0,
      gap: 50,
      lastIn: 0,
      _n: 0,
      _t: 0,
      ingest(n, t) {
        let g = performance.now();
        (this.lastIn && (this.gap += (Math.min(1e3, g - this.lastIn) - this.gap) * 0.2), (this.lastIn = g));
        let e = U.video,
          i = U.view.aspect,
          r = e && e.videoWidth ? e.videoWidth / e.videoHeight : i,
          s = q.cam === "user",
          o = r > i ? i / r : 1,
          a = r > i ? 1 : r / i,
          c = [];
        for (let f = 0; f < n.n; f++) {
          let p = f * 126,
            x = n.data[p] - 0.5,
            g = n.data[p + 1] - 0.5;
          c.push({
            h: f,
            wx: ((s ? -x : x) / o) * i,
            wy: g / a,
            side: n.sides[f] === "Left" ? "Right" : "Left",
            score: n.scores[f],
          });
        }
        let [l, h] = this.slots,
          u = (f, p) => (f.live ? Math.hypot(f.p[0] - p.wx, f.p[1] - p.wy) + (f.side === p.side ? 0 : 0.12) : 0.8),
          d;
        (c.length === 2
          ? (d = u(l, c[0]) + u(h, c[1]) <= u(l, c[1]) + u(h, c[0]) ? [c[0], c[1]] : [c[1], c[0]])
          : c.length === 1
            ? (d = u(l, c[0]) <= u(h, c[0]) ? [c[0], null] : [null, c[0]])
            : (d = [null, null]),
          this.slots.forEach((f, p) => {
            let x = d[p];
            if (!x) return;
            let g = x.h * 126;
            for (let w = 0; w < 21; w++) {
              let v = g + w * 6,
                S = n.data[v] - 0.5;
              ((ne[w * 3] = ((s ? -S : S) / o) * i),
                (ne[w * 3 + 1] = (n.data[v + 1] - 0.5) / a),
                (ne[w * 3 + 2] = (n.data[v + 2] / o) * i),
                (Ks[w * 3] = n.data[v + 3]),
                (Ks[w * 3 + 1] = n.data[v + 4]),
                (Ks[w * 3 + 2] = n.data[v + 5]));
            }
            let m = ne[27] - ne[0],
              y = ne[28] - ne[1],
              E = Math.hypot(m, y) || 1,
              _ = E * U.toolLen;
            ((ne[kn * 3] = ne[27] + (m / E) * _),
              (ne[kn * 3 + 1] = ne[28] + (y / E) * _),
              (ne[kn * 3 + 2] = ne[29]),
              (ne[sr * 3] = (ne[12] + ne[24]) / 2),
              (ne[sr * 3 + 1] = (ne[13] + ne[25]) / 2),
              (ne[sr * 3 + 2] = (ne[14] + ne[26]) / 2),
              (f.vote = $t(f.vote + (x.side === "Right" ? 1 : -1) * x.score, -6, 6)),
              (f.side = f.vote >= 0 ? "Right" : "Left"),
              (f.lite = !1),
              !f.live || Math.hypot(f.p[0] - ne[0], f.p[1] - ne[1]) > 0.6 ? f.reset(t) : f.feed(t),
              (f.seen = performance.now()),
              f.features(t));
          }),
          this._n++,
          t - this._t > 1e3 && ((this.hz = (this._n * 1e3) / (t - this._t)), (this._n = 0), (this._t = t)));
      },
      lite(n, t, e, i) {
        let r = this.slots[n];
        for (let s = 0; s < 21; s++) ((ne[s * 3] = t), (ne[s * 3 + 1] = e + 0.1), (ne[s * 3 + 2] = 0));
        ((ne[24] = t),
          (ne[25] = e),
          (ne[kn * 3] = t),
          (ne[kn * 3 + 1] = e),
          (ne[sr * 3] = t),
          (ne[sr * 3 + 1] = e),
          Ks.fill(0),
          r.live ? r.feed(i) : r.reset(i),
          (r.lite = !0),
          (r.seen = performance.now()),
          r.ext.fill(1),
          r.strikes(i));
      },
      render(n, t) {
        for (let e of this.slots) e.render(n, t);
      },
      get any() {
        return this.slots.some((n) => n.live);
      },
    };
  U.tracker = Ke;
  var ns = 1,
    pm = 21,
    mm = Qu.length,
    Zl = new le(),
    va = new qe(),
    gm = new R(0, 1, 0),
    zn = new R(),
    is = new R(),
    vm = new R(),
    td = new R(),
    d_ = `uniform float tv;uniform float ar;uniform vec4 xf;varying vec3 vN;varying vec3 vP;varying vec2 vUv2;
void main(){vec4 hp=instanceMatrix*vec4(position,1.);vec2 n=vec2(hp.x/(-hp.z)/(tv*ar),hp.y/(-hp.z)/tv);vUv2=xf.xy+(n*.5+.5)*xf.zw;vec4 mv=modelViewMatrix*hp;vN=normalize(normalMatrix*mat3(instanceMatrix)*normal);vP=mv.xyz;gl_Position=projectionMatrix*mv;}`,
    f_ = `uniform sampler2D vid;uniform float mode;uniform float op;uniform vec3 tint;varying vec3 vN;varying vec3 vP;varying vec2 vUv2;
vec3 lin(vec3 c){return pow(c,vec3(2.2));}
void main(){vec3 n=normalize(vN),v=normalize(-vP);float f=clamp(dot(n,v),0.,1.);float rim=pow(1.-f,2.2);vec3 c;float al;
if(mode<.5){c=lin(texture2D(vid,vUv2).rgb)+tint*rim*.55;al=smoothstep(.0,.42,f)*op;}else{c=tint*(.1+.3*f+rim*2.2);al=(.35+rim*.65)*op;}
gl_FragColor=vec4(c,al);}`,
    // Esqueleto: tubos e juntas de luz, desenhados por cima de tudo para mostrar o que o rastreio vê.
    sk_v = `varying vec3 vN;varying vec3 vP;
void main(){vec4 mv=modelViewMatrix*instanceMatrix*vec4(position,1.);vN=normalize(normalMatrix*mat3(instanceMatrix)*normal);vP=mv.xyz;gl_Position=projectionMatrix*mv;}`,
    sk_b = `uniform vec3 col;uniform float op;varying vec3 vN;varying vec3 vP;
void main(){float f=abs(dot(normalize(vN),normalize(-vP)));float k=smoothstep(.1,.8,f);vec3 c=mix(col*.1,col,k)+vec3(pow(f,8.)*.6);gl_FragColor=vec4(c,mix(.45,.95,k)*op);}`,
    sk_j = `uniform vec3 col;uniform float op;varying vec3 vN;varying vec3 vP;
void main(){float f=abs(dot(normalize(vN),normalize(-vP)));float k=smoothstep(.0,.85,f);vec3 c=mix(col*.2,mix(col,vec3(1.5),.55),k);gl_FragColor=vec4(c,(.75+.25*k)*op);}`,
    SKC = [new Tt(0.3, 0.95, 1.5), new Tt(0.42, 0.88, 1.5)],
    SKG = new Tt(1.9, 1.35, 0.3),
    SKW = new Tt(1.6, 1.7, 1.8),
    SKB = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20],
      [0, 17],
    ],
    Ql = {
      tool: null,
      init() {
        let n = (this.g = new Wt());
        U.headG.add(n);
        let t = (this.uni = {
            vid: { value: null },
            tv: { value: 0.55 },
            ar: { value: 1 },
            xf: { value: new Ee(0, 0, 1, 1) },
            mode: { value: 0 },
            op: { value: 1 },
            tint: { value: new Tt(0.25, 0.75, 1.3) },
          }),
          e = new Me({ vertexShader: d_, fragmentShader: f_, uniforms: t, transparent: !0, depthWrite: !0, side: Ii });
        ((this.joints = new Pn(new tn(1, 10, 8), e, pm * 2)),
          (this.bones = new Pn(new Re(1, 1, 1, 10, 1, !0), e, mm * 2)),
          (this.joints.frustumCulled = this.bones.frustumCulled = !1),
          (this.joints.renderOrder = this.bones.renderOrder = 30),
          n.add(this.joints, this.bones));
        let bg = new Re(1, 1, 1, 8, 1, !0),
          jg = new tn(1, 14, 10),
          sg = (this.skg = new Wt());
        (n.add(sg),
          (this.sk = [0, 1].map(() => {
            let col = { value: new Tt() },
              tc = { value: new Tt() },
              op = { value: 1 },
              m = (f, u) =>
                new Me({ vertexShader: sk_v, fragmentShader: f, uniforms: { op, ...u }, transparent: !0, depthTest: !1, depthWrite: !1 }),
              bones = new Pn(bg, m(sk_b, { col }), SKB.length),
              joints = new Pn(jg, m(sk_j, { col }), pm),
              tips = new Pn(jg, m(sk_j, { col: tc }), 2);
            return (
              (bones.frustumCulled = joints.frustumCulled = tips.frustumCulled = !1),
              (bones.renderOrder = 33),
              (joints.renderOrder = 34),
              (tips.renderOrder = 35),
              (bones.visible = joints.visible = tips.visible = !1),
              sg.add(bones, joints, tips),
              { col, tc, op, bones, joints, tips, was: !1, flash: 0 }
            );
          })));
        let i = new Vn({ map: U.fx.dot(), color: new Tt(0.4, 1.1, 1.8), blending: un, depthTest: !1, transparent: !0 });
        this.tips = [];
        for (let r = 0; r < 10; r++) {
          let s = new Jn(i);
          (s.scale.setScalar(0.035), (s.renderOrder = 31), (s.visible = !1), n.add(s), this.tips.push(s));
        }
        this.tools = [0, 1].map((r) => {
          let s = new Wt(),
            o = new tt(new Re(0.0065, 0.012, 1, 10), new yr({ color: 15120252, roughness: 0.45 }));
          o.geometry.translate(0, 0.5, 0);
          let a = new tt(new tn(0.02, 12, 10), new yr({ color: 16049872, roughness: 0.4 }));
          a.position.y = 1;
          let c = new tt(
            new Re(0.012, 0.016, 1, 10),
            new $e({ color: new Tt(r ? 16722538 : 2788607).multiplyScalar(3.4) }),
          );
          return (
            c.geometry.translate(0, 0.5, 0),
            (c.visible = !1),
            s.add(o, a, c),
            (s.visible = !1),
            n.add(s),
            { g: s, stick: o, head: a, blade: c }
          );
        });
      },
      update() {
        let n = U.view,
          t = this.uni,
          e = n.tv * 2,
          i = U.video,
          r = i && i.videoWidth > 0;
        if (((t.tv.value = n.tv), (t.ar.value = n.aspect), r)) {
          let u = U.world.vt;
          t.vid.value = u;
          let d = i.videoWidth / i.videoHeight,
            f = n.aspect,
            p = d > f ? f / d : 1,
            x = d > f ? 1 : d / f,
            g = q.cam === "user";
          t.xf.value.set(g ? 1 - (1 - p) / 2 : (1 - p) / 2, (1 - x) / 2, g ? -p : p, x);
        }
        let sk = q.handStyle === "skel" || (q.handStyle !== "off" && q.handStyle !== "real" && q.handStyle !== "holo"),
          s = sk || q.handStyle === "off" ? -1 : q.handStyle === "real" && r ? 0 : 1;
        t.mode.value = s < 0 ? 1 : s;
        let o = 0,
          a = 0,
          c = !1,
          l = (u, d, f) => {
            let p = 1 + u.z(d) * e * 0.5;
            return f.set(u.x(d) * e * ns * p, -u.y(d) * e * ns * p, -ns * p);
          };
        for (let u of Ke.slots) {
          if (!(u.vis > 0.02 && !u.lite && s >= 0)) continue;
          ((c = !0), (t.op.value = 1));
          let f = u.palm * e * ns;
          for (let p = 0; p < pm; p++) {
            l(u, p, zn);
            let x = f * (p === 0 ? 0.25 : p < 5 ? 0.13 : p % 4 === 0 ? 0.1 : 0.125) * (s === 0 ? 1.28 : 0.8);
            (Zl.compose(zn, va.identity(), td.setScalar(x)), this.joints.setMatrixAt(o++, Zl));
          }
          for (let p = 0; p < mm; p++) {
            let [x, g] = Qu[p];
            (l(u, x, zn), l(u, g, is), vm.addVectors(zn, is).multiplyScalar(0.5));
            let m = zn.distanceTo(is),
              y = x === 0 || p >= 18,
              E = f * (y ? 0.2 : 0.118) * (s === 0 ? 1.3 : 0.75);
            (va.setFromUnitVectors(gm, is.sub(zn).normalize()),
              Zl.compose(vm, va, td.set(E, m, E)),
              this.bones.setMatrixAt(a++, Zl));
          }
        }
        ((this.joints.count = o),
          (this.bones.count = a),
          (this.joints.visible = this.bones.visible = c),
          (this.joints.instanceMatrix.needsUpdate = this.bones.instanceMatrix.needsUpdate = !0),
          this.skel(sk, l, e));
        let h = 0;
        for (let u of Ke.slots)
          for (let d = 0; d < 5; d++) {
            let f = this.tips[h++];
            ((f.visible = u.vis > 0.3 && !u.lite && this.glowTips),
              f.visible && (l(u, Js[d], zn), f.position.copy(zn)));
          }
        (this.tools.forEach((u, d) => {
          let f = Ke.slots[d],
            p = this.tool && f.vis > 0.2 && !f.lite;
          if (((u.g.visible = !!p), !p)) return;
          l(f, 9, zn);
          let x = -ns * 0.92,
            g = x / zn.z;
          (zn.multiplyScalar(g), is.set(f.x(kn) * e * ns * 0.92, -f.y(kn) * e * ns * 0.92, x));
          let m = zn.distanceTo(is);
          (u.g.position.copy(zn),
            va.setFromUnitVectors(gm, td.subVectors(is, zn).normalize()),
            u.g.quaternion.copy(va));
          let y = this.tool === "saber";
          ((u.stick.visible = !y),
            (u.blade.visible = y),
            (u.head.visible = this.tool === "mallet"),
            u.stick.scale.set(1, m, 1),
            u.blade.scale.set(1, m, 1),
            (u.head.position.y = m),
            y && u.blade.material.color.copy(new Tt(f.side === "Right" ? 16722538 : 2788607)).multiplyScalar(3.4));
        }),
          (this.glowTips = this.wantTips));
      },
      // Desenha só o esqueleto de cada mão rastreada: 21 juntas e 21 ossos.
      // A pinça acende as pontas do polegar e do indicador; com a palma virada (gesto Início) fica dourado.
      skel(n, t, e) {
        // VR com a câmera: o vídeo é igual nos dois olhos (fica a 60 m). Desenhado a 1 m, o esqueleto
        // ficava ~26 px para cada lado da mão real em cada olho (aparecia duplo/flutuando).
        // Afastado 40x (mesmo tamanho aparente) ele cai em cima da mão nos dois olhos.
        this.skg.scale.setScalar(!U.view.mono && U.world.cur === "cam" && U.world.bg.visible ? 40 : 1);
        Ke.slots.forEach((i, r) => {
          let s = this.sk[r],
            o = n && i.vis > 0.02;
          if (((s.bones.visible = s.joints.visible = o), (s.tips.visible = !1), !o)) {
            s.was = !1;
            return;
          }
          let a = U.shell && U.shell.palmT > 0.3 && U.shell.palmHand === r ? SKG : SKC[i.side === "Right" ? 0 : 1],
            c = $t(i.vis * 1.2),
            l = Math.max(0.05, i.palm) * e * ns;
          if ((s.col.value.copy(a), (s.op.value = c), (s.bones.visible = !i.lite), i.lite)) {
            // rastreio simples por cor da pele: só um ponto onde a mão está
            (t(i, 8, zn), Zl.compose(zn, va.identity(), td.setScalar(0.03)), s.joints.setMatrixAt(0, Zl), (s.joints.count = 1), (s.joints.instanceMatrix.needsUpdate = !0));
            return;
          }
          s.joints.count = pm;
          for (let h = 0; h < pm; h++) {
            t(i, h, zn);
            let u = l * (h === 8 ? 0.06 : h === 0 ? 0.055 : h % 4 === 0 ? 0.048 : 0.04);
            (Zl.compose(zn, va.identity(), td.setScalar(u)), s.joints.setMatrixAt(h, Zl));
          }
          for (let h = 0; h < SKB.length; h++) {
            let [u, d] = SKB[h];
            (t(i, u, zn), t(i, d, is), vm.addVectors(zn, is).multiplyScalar(0.5));
            let f = zn.distanceTo(is),
              p = l * (h === 20 || u === 0 ? 0.026 : 0.022);
            (va.setFromUnitVectors(gm, is.sub(zn).normalize()), Zl.compose(vm, va, td.set(p, f, p)), s.bones.setMatrixAt(h, Zl));
          }
          ((s.joints.instanceMatrix.needsUpdate = s.bones.instanceMatrix.needsUpdate = !0),
            i.pinch && !s.was && (s.flash = 1),
            (s.was = i.pinch),
            (s.flash = Math.max(0, s.flash - U.dt * 4)));
          let h = Math.max(i.pinchS || 0, i.pinch ? 1 : 0);
          if (h > 0.05) {
            [4, 8].forEach((u, d) => {
              (t(i, u, zn), Zl.compose(zn, va.identity(), td.setScalar(l * (0.06 + 0.035 * h + 0.04 * s.flash))), s.tips.setMatrixAt(d, Zl));
            });
            ((s.tips.visible = !0),
              (s.tips.instanceMatrix.needsUpdate = !0),
              s.tc.value.copy(a).lerp(SKW, i.pinch ? 1 : h * 0.6));
          }
        });
      },
    };
  U.handview = Ql;
  var Tr = (n, t, e) => {
      let i = U.view.tv * 2;
      return e
        .set(n * i, -t * i, -1)
        .normalize()
        .applyQuaternion(ke.q);
    },
    eh = (n, t, e) => ({
      id: n,
      src: t,
      slot: e,
      x: 0,
      y: 0,
      dir: new R(),
      pinch: !1,
      down: !1,
      up: !1,
      vis: !1,
      overUI: !1,
      grab: !1,
    }),
    xm = [eh("h0", "hand", 0), eh("h1", "hand", 1)],
    ed = [],
    ym = [0, 1].map((n) => ({
      hand: n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      bx: 0,
      by: 0,
      dir: new R(),
      baseDir: new R(),
      strike: 0,
    })),
    _m = [0, 1].map((n) => ({ hand: n, x: 0, y: 0, vx: 0, vy: 0, dir: new R(), strike: 0 }));
  for (let n = 0; n < 2; n++)
    for (let t = 0; t < 5; t++)
      ed.push({
        hand: n,
        f: t,
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        vx: 0,
        vy: 0,
        dir: new R(),
        ext: 1,
        strike: 0,
        key: n * 5 + t,
      });
  var rs = new Map(),
    on = { ...eh("m", "mouse", -1), on: !1, btn: !1, press: !1, rel: !1, lx: 0, ly: 0 };
  function th(n, t) {
    let e = U.view,
      i = innerWidth,
      r = innerHeight;
    if (e.mono) return { x: (n / i - 0.5) * e.aspect, y: t / r - 0.5 };
    let s = n >= i / 2 ? 1 : 0,
      o = i / 2 + (s ? e.sep / 2 : -e.sep / 2),
      a = n - o,
      c = t - r / 2,
      l = 1 + (q.dist * (a * a + c * c)) / ((r * r) / 4);
    return ((a *= l), (c *= l), { x: a / r, y: c / r });
  }
  var Xt = {
    pointers: [],
    fingers: [],
    tools: [],
    palms: [],
    mouse: on,
    bind(n) {
      (n.addEventListener("contextmenu", (e) => e.preventDefault()),
        n.addEventListener("pointerdown", (e) => {
          if ((n.setPointerCapture && n.setPointerCapture(e.pointerId), e.pointerType === "mouse")) {
            if (e.button === 2) {
              on.look = { x: e.clientX, y: e.clientY };
              return;
            }
            (Object.assign(on, th(e.clientX, e.clientY)), (on.on = !0), (on.btn = !0), (on.press = !0));
          } else {
            let i = th(e.clientX, e.clientY),
              r = eh("t" + e.pointerId, "touch", -1);
            (Object.assign(r, i), (r.press = !0), (r.btn = !0), (r.ly = i.y), rs.set(e.pointerId, r));
          }
        }),
        n.addEventListener("pointermove", (e) => {
          if (e.pointerType === "mouse") {
            if (on.look) {
              ((ke.look.yaw -= (e.clientX - on.look.x) * 0.004),
                (ke.look.pitch = Math.max(-1.2, Math.min(1.2, ke.look.pitch - (e.clientY - on.look.y) * 0.004))),
                (on.look = { x: e.clientX, y: e.clientY }));
              return;
            }
            (Object.assign(on, th(e.clientX, e.clientY)), (on.on = !0));
          } else rs.has(e.pointerId) && Object.assign(rs.get(e.pointerId), th(e.clientX, e.clientY));
        }));
      let t = (e) => {
        e.pointerType === "mouse"
          ? ((on.look = null), on.btn && ((on.btn = !1), (on.rel = !0)))
          : rs.has(e.pointerId) && (rs.get(e.pointerId).rel = !0);
      };
      (n.addEventListener("pointerup", t),
        n.addEventListener("pointercancel", t),
        n.addEventListener("pointerleave", (e) => {
          e.pointerType === "mouse" && !on.btn && (on.on = !1);
        }));
    },
    update(n) {
      Ke.render(U.now, n);
      let t = this.pointers,
        e = this.fingers,
        i = this.tools,
        r = this.palms;
      ((t.length = e.length = i.length = r.length = 0),
        Ke.slots.forEach((a, c) => {
          if (!a.live) {
            xm[c].vis = !1;
            return;
          }
          let l = xm[c];
          ((l.vis = !0),
            (l.x = a.cx),
            (l.y = a.cy),
            (l.pinch = a.pinch),
            (l.down = a.pinchDown),
            (l.up = a.pinchUp),
            (l.grab = a.fist),
            (a.pinchDown = a.pinchUp = !1),
            Tr(l.x, l.y, l.dir),
            t.push(l));
          for (let d = 0; d < 5; d++) {
            let f = ed[c * 5 + d],
              p = Js[d];
            ((f.px = f.x),
              (f.py = f.y),
              (f.x = a.x(p)),
              (f.y = a.y(p)),
              (f.vx = a.vx(p)),
              (f.vy = a.vy(p)),
              (f.ext = a.ext[d]),
              (f.strike = a.strike[d]),
              (a.strike[d] = 0),
              (f.virt = !1),
              (f.drag = !1),
              Tr(f.x, f.y, f.dir),
              e.push(f));
          }
          let h = ym[c];
          ((h.x = a.x(kn)),
            (h.y = a.y(kn)),
            (h.vx = a.vx(kn)),
            (h.vy = a.vy(kn)),
            (h.bx = a.x(9)),
            (h.by = a.y(9)),
            (h.strike = a.toolStrike),
            (a.toolStrike = 0),
            Tr(h.x, h.y, h.dir),
            Tr(h.bx, h.by, h.baseDir),
            i.push(h));
          let u = _m[c];
          ((u.x = a.x(9)),
            (u.y = a.y(9)),
            (u.vx = a.vx(9)),
            (u.vy = a.vy(9)),
            (u.strike = a.palmStrike),
            (a.palmStrike = 0),
            Tr(u.x, u.y, u.dir),
            r.push(u));
        }));
      let s = (a, c) => {
        ((a.vis = !0), (a.pinch = !!a.btn), (a.down = !!a.press), (a.up = !!a.rel), Tr(a.x, a.y, a.dir), t.push(a));
        let l = (a.x - (a.lx ?? a.x)) / Math.max(n, 0.001),
          h = (a.y - (a.ly ?? a.y)) / Math.max(n, 0.001),
          u = ed[c];
        ((u.px = a.lx ?? a.x),
          (u.py = a.ly ?? a.y),
          (u.x = a.x),
          (u.y = a.y),
          (u.vx = l),
          (u.vy = h),
          (u.ext = 1),
          (u.strike = a.press ? 0.85 : 0),
          (u.drag = !!a.btn),
          (u.virt = !0),
          u.dir.copy(a.dir),
          e.push(u));
        let d = ym[c % 2];
        ((d.x = a.x),
          (d.y = a.y),
          (d.vx = l),
          (d.vy = h),
          (d.bx = a.x),
          (d.by = a.y + 0.18),
          (d.strike = a.press ? 0.85 : 0),
          d.dir.copy(a.dir),
          Tr(d.bx, d.by, d.baseDir),
          i.includes(d) || i.push(d));
        let f = _m[c % 2];
        ((f.x = a.x),
          (f.y = a.y),
          (f.vx = l),
          (f.vy = h),
          (f.strike = a.press ? 0.85 : 0),
          f.dir.copy(a.dir),
          r.includes(f) || r.push(f),
          (a.press = !1),
          (a.rel = !1),
          (a.lx = a.x),
          (a.ly = a.y));
      };
      on.on && s(on, 9);
      let o = 0;
      for (let [a, c] of rs) (s(c, 8 - o++), c.up && rs.delete(a));
    },
    dirOf: Tr,
  };
  U.input = Xt;
  var id = $0(bm(), 1);
  var Mm = `// Roda dentro de um Web Worker: o MediaPipe nunca segura o desenho da tela.
// O texto do vision_bundle é colado antes deste código, definindo "exports".
//
// Processador "auto": começa na CPU (estável e não disputa a GPU com o desenho do VR).
// Se a CPU for lenta, liga a GPU em paralelo nos MESMOS quadros e só troca se ela for
// bem mais rápida E achar as mesmas mãos nos mesmos lugares: em várias GPUs de celular
// o MediaPipe roda, mas erra ou perde as mãos.
// Tudo dentro de uma função: o vision_bundle (colado antes) já usa vários nomes globais curtos.
(() => {
let lm = null, alt = null, last = 0, mod = null, M = null, cal = null, busy = false;
const OPT = { runningMode: 'VIDEO', numHands: 2, minHandDetectionConfidence: .5, minHandPresenceConfidence: .5, minTrackingConfidence: .5 };
async function create(delegate) {
  (0, eval)(M.loader);
  mod = mod || await WebAssembly.compile(M.wasm);
  self.Module = { instantiateWasm: (imports, ok) => { WebAssembly.instantiate(mod, imports).then(i => ok(i, mod)); return {}; } };
  return exports.HandLandmarker.createFromOptions({ wasmLoaderPath: '', wasmBinaryPath: '' },
    { ...OPT, baseOptions: { modelAssetBuffer: new Uint8Array(M.model.slice(0)), delegate } });
}
const say = (delegate, why) => self.postMessage({ type: 'delegate', delegate, why });
const close = (x) => { try { x && x.close(); } catch (e) {} };
function pack(r) {
  const hs = r.handedness || r.handednesses || [], n = Math.min(2, r.landmarks.length);
  const data = new Float32Array(n * 126), sides = [], scores = [];
  for (let h = 0; h < n; h++) {
    for (let i = 0; i < 21; i++) {
      const q = r.landmarks[h][i], w = (r.worldLandmarks[h] || [])[i] || q, o = h * 126 + i * 6;
      data[o] = q.x; data[o + 1] = q.y; data[o + 2] = q.z; data[o + 3] = w.x; data[o + 4] = w.y; data[o + 5] = w.z;
    }
    sides.push((hs[h] && hs[h][0] && hs[h][0].categoryName) || 'Right'); scores.push((hs[h] && hs[h][0] && hs[h][0].score) || 1);
  }
  return { n, data, sides, scores };
}
// Mesmo número de mãos e cada mão da CPU tem uma da GPU a menos de 3,5% da imagem (média dos 21 pontos).
function same(a, b) {
  if (a.landmarks.length !== b.landmarks.length) return false;
  for (const A of a.landmarks) {
    let best = 9;
    for (const B of b.landmarks) {
      let e = 0;
      for (let i = 0; i < 21; i++) e += Math.hypot(A[i].x - B[i].x, A[i].y - B[i].y);
      best = Math.min(best, e / 21);
    }
    if (best > .035) return false;
  }
  return true;
}
function startCal() { cal = { f: 0, cpu: 0, nc: 0, gpu: 0, ng: 0, hands: 0, ok: 0, phase: 0 }; }
async function useOnly(d, why) {
  cal = null; close(alt); alt = null;
  try { const x = await create(d); close(lm); lm = x; say(d, why); }
  catch (e) { say(d === 'GPU' ? 'CPU' : d, 'GPU indisponível'); }
}
function calib(b, ts, r, ms) {
  const c = cal;
  c.f++;
  if (c.phase === 0) {
    if (c.f > 5) { c.cpu += ms; c.nc++; }
    if (c.nc >= 40) {
      const avg = c.cpu / c.nc;
      if (avg <= 40) { cal = null; say('CPU', 'CPU rápida (' + Math.round(avg) + ' ms)'); return; }
      c.phase = 1; c.cpu0 = avg; c.cpu = 0; c.nc = 0;
      create('GPU').then(x => {
        if (cal !== c) return close(x);
        alt = x; c.phase = 2;
        // compila os shaders da GPU já, num quadro vazio, e não quando a mão aparecer
        try { alt.detectForVideo(new ImageData(64, 64), ++last); } catch (e) {}
      }).catch(() => { if (cal === c) { cal = null; say('CPU', 'GPU indisponível'); } });
    }
    return;
  }
  if (c.phase !== 2) return;
  // A GPU só roda em rajadas de 14 quadros que começam quando a CPU vê uma mão:
  // sem mão na frente da câmera, o teste não custa nada.
  if (!c.left) {
    if (!r.landmarks.length) return;
    c.left = 14; c.bursts = (c.bursts || 0) + 1; c.first = true;
  }
  c.left--;
  let g, gm;
  try { const t = performance.now(); g = alt.detectForVideo(b, ts); gm = performance.now() - t; }
  catch (e) { cal = null; close(alt); alt = null; say('CPU', 'GPU falhou'); return; }
  if (!c.first) {
    if (gm > Math.max(2 * c.cpu0, 80)) { cal = null; close(alt); alt = null; say('CPU', 'CPU mais rápida'); return; }
    c.gpu += gm; c.cpu += ms; c.nc++;
  }
  c.first = false;
  if (r.landmarks.length) { c.hands++; same(r, g) && c.ok++; }
  if (c.nc >= 3 && c.gpu > c.cpu * .9) { cal = null; close(alt); alt = null; say('CPU', 'CPU mais rápida'); return; }
  if (c.left > 0) return;
  if (c.hands >= 6) {
    const cpu = c.cpu / c.nc, gpu = c.gpu / c.nc, agree = c.ok / c.hands;
    cal = null;
    if (agree >= .8 && gpu < cpu * .7) { close(lm); lm = alt; alt = null; say('GPU', 'GPU ' + Math.round(gpu) + ' ms x CPU ' + Math.round(cpu) + ' ms'); }
    else { close(alt); alt = null; say('CPU', agree < .8 ? 'GPU imprecisa (' + Math.round(agree * 100) + '%)' : 'CPU mais rápida'); }
  } else if (c.bursts >= 3) { cal = null; close(alt); alt = null; say('CPU', 'GPU não verificada'); }
}
self.onmessage = async e => {
  const m = e.data;
  if (m.type === 'init') {
    M = m; let err = '';
    for (const d of m.pref === 'gpu' ? ['GPU', 'CPU'] : ['CPU', 'GPU']) {
      try {
        lm = await create(d);
        self.postMessage({ type: 'ready', delegate: d });
        if (d === 'CPU' && (m.pref || 'auto') === 'auto') startCal(); // só no automático
        return;
      } catch (x) { err = String(x); }
    }
    self.postMessage({ type: 'fail', err });
  } else if (m.type === 'pref') {
    if (busy) return;
    busy = true;
    if (m.pref === 'auto') { await useOnly('CPU', 'automático'); startCal(); } else await useOnly(m.pref === 'gpu' ? 'GPU' : 'CPU', 'escolhido nos ajustes');
    busy = false;
  } else if (m.type === 'frame') {
    const t = performance.now(), b = m.bitmap;
    try {
      const ts = Math.max(last + 1, Math.round(t)); last = ts;
      const r = lm.detectForVideo(b, ts), ms = performance.now() - t, p = pack(r);
      self.postMessage({ type: 'result', id: m.id, n: p.n, data: p.data, sides: p.sides, scores: p.scores, ms }, [p.data.buffer]);
      if (cal) calib(b, ts, r, ms);
    } catch (x) {
      self.postMessage({ type: 'result', id: m.id, n: 0, data: new Float32Array(0), sides: [], scores: [], ms: 0, err: String(x) });
    } finally { b.close(); }
  }
};
})();
`;
  var nh = "1.2.0",
    Sm = [
      `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${nh}/wasm/`,
      `https://unpkg.com/@mediapipe/tasks-vision@${nh}/wasm/`,
    ],
    g_ =
      "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
    v_ = new Uint8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11,
    ]);
  async function x_(n, t) {
    let e = await fetch(n, { mode: "cors" });
    if (!e.ok) throw new Error("HTTP " + e.status);
    let i = +e.headers.get("content-length") || 0;
    if (!e.body || !i) return new Uint8Array(await e.arrayBuffer());
    let r = new Uint8Array(i),
      s = e.body.getReader(),
      o = 0;
    for (;;) {
      let { done: a, value: c } = await s.read();
      if (a) break;
      (r.set(c, o), (o += c.length), t && t(o / i));
    }
    return r;
  }
  async function nd(n, t, e) {
    let i = await pn.get(n);
    if (i) return (e && e(1), i);
    let r;
    for (let s of t)
      try {
        let o = (await x_(s, e)).buffer;
        return (pn.put(n, o), o);
      } catch (o) {
        r = o;
      }
    throw r;
  }
  var ei = {
    state: "off",
    delegate: "",
    why: "",
    worker: null,
    lm: null,
    busy: !1,
    sentAt: 0,
    lastVT: -1,
    id: 0,
    ms: 0,
    onFrame: null,
    last: 0,
    // Pode ser chamado no menu (pré-carga) e de novo ao entrar: a segunda chamada reaproveita a primeira.
    // Se a 1ª tentativa falhou (ex.: sem internet no menu), tenta mais uma vez ao entrar.
    init(n) {
      return (
        n && (this.onProg = n),
        (!this._p || (this.state === "fail" && !this.again)) && (this._p && (this.again = !0), (this._p = this.load())),
        this._p
      );
    },
    async load() {
      this.state = "loading";
      try {
        let t = WebAssembly.validate(v_) ? "vision_wasm_internal" : "vision_wasm_nosimd_internal",
          e = [0, 0, 0],
          i = (c) => (l) => {
            ((e[c] = l), this.onProg && this.onProg(e[0] * 0.05 + e[1] * 0.65 + e[2] * 0.3));
          },
          [r, s, o] = await Promise.all([
            nd(
              `mp-${nh}-${t}.js`,
              Sm.map((c) => c + t + ".js"),
              i(0),
            ),
            nd(
              `mp-${nh}-${t}.wasm`,
              Sm.map((c) => c + t + ".wasm"),
              i(1),
            ),
            nd("hand_landmarker.task", [g_], i(2)),
          ]),
          a = new TextDecoder().decode(r);
        return ((await this.startWorker(a, s, o)) || (await this.startMain(a, s, o)), (this.state = "on"), !0);
      } catch (t) {
        return (console.warn("rastreio completo indisponível", t), (this.state = "fail"), !1);
      }
    },
    startWorker(n, t, e) {
      return new Promise((i) => {
        let r,
          s,
          o = (a) => {
            (console.warn("worker de mãos:", a), clearTimeout(s));
            try {
              r && r.terminate();
            } catch {}
            ((this.worker = null), i(!1));
          };
        try {
          let a =
            `var exports={};
` +
            id.default.replace(/\/\/# sourceMappingURL.*/g, "") +
            `
;` +
            Mm;
          r = new Worker(URL.createObjectURL(new Blob([a], { type: "text/javascript" })));
        } catch (a) {
          return o(a);
        }
        ((s = setTimeout(() => o("tempo esgotado"), 45e3)),
          (r.onerror = (a) => o(a.message || "erro")),
          (r.onmessage = (a) => {
            let c = a.data;
            c.type === "ready"
              ? (clearTimeout(s),
                (this.worker = r),
                (this.delegate = "Worker " + c.delegate),
                (this.why = q.trackDev === "auto" ? "testando…" : "escolhido nos ajustes"),
                (r.onerror = null),
                i(!0))
              : c.type === "fail"
                ? o(c.err)
                : c.type === "result"
                  ? this.done(c)
                  : c.type === "delegate" &&
                    ((this.delegate = "Worker " + c.delegate),
                    (this.why = c.why),
                    U.shell && U.shell.dirtyAll && U.shell.dirtyAll());
          }),
          r.postMessage({ type: "init", loader: n, wasm: t, model: e, pref: q.trackDev }));
      });
    },
    // Troca o processador do rastreio na hora ("auto", "cpu" ou "gpu").
    setPref(n) {
      ((q.trackDev = n), Ze(), this.worker && (this.worker.postMessage({ type: "pref", pref: n }), (this.why = "trocando…")));
    },
    async startMain(n, t, e) {
      let i = {};
      new Function("exports", id.default.replace(/\/\/# sourceMappingURL.*/g, ""))(i);
      let r,
        s = await WebAssembly.compile(t);
      for (let o of ["GPU", "CPU"])
        try {
          ((0, eval)(n),
            (self.Module = { instantiateWasm: (a, c) => (WebAssembly.instantiate(s, a).then((l) => c(l, s)), {}) }),
            (this.lm = await i.HandLandmarker.createFromOptions(
              { wasmLoaderPath: "", wasmBinaryPath: "" },
              {
                runningMode: "VIDEO",
                numHands: 2,
                minHandDetectionConfidence: 0.5,
                minHandPresenceConfidence: 0.5,
                minTrackingConfidence: 0.5,
                baseOptions: { modelAssetBuffer: new Uint8Array(e.slice(0)), delegate: o },
              },
            )),
            (this.delegate = "Principal " + o));
          return;
        } catch (a) {
          r = a;
        }
      throw r;
    },
    done(n) {
      ((this.busy = !1),
        !n.err &&
          ((this.ms = n.ms),
          (this.last = performance.now()),
          n.n !== void 0 && this.onFrame && this.onFrame(n, this.sentAt)));
    },
    pump(n) {
      if (this.state !== "on") return;
      let t = performance.now();
      if (this.busy) {
        t - this.sentAt > 1200 && (this.busy = !1);
        return;
      }
      if (!n || n.readyState < 2 || !n.videoWidth || n.currentTime === this.lastVT) return;
      if (this.lm) {
        if (t - this.sentAt < 45) return;
        ((this.lastVT = n.currentTime), (this.sentAt = t), this.detectMain(n, t));
        return;
      }
      ((this.lastVT = n.currentTime), (this.busy = !0), (this.sentAt = t));
      let e = q.trackW,
        i = Math.round((e * n.videoHeight) / n.videoWidth),
        r = ++this.id;
      createImageBitmap(n, { resizeWidth: e, resizeHeight: i, resizeQuality: "medium" })
        .then((s) => this.worker.postMessage({ type: "frame", bitmap: s, id: r }, [s]))
        .catch(() => {
          this.busy = !1;
        });
    },
    detectMain(n, t) {
      try {
        let e = performance.now(),
          i = this.lm.detectForVideo(n, Math.round(e)),
          r = i.handedness || i.handednesses || [],
          s = Math.min(2, i.landmarks.length),
          o = new Float32Array(s * 126),
          a = [],
          c = [];
        for (let l = 0; l < s; l++) {
          for (let h = 0; h < 21; h++) {
            let u = i.landmarks[l][h],
              d = (i.worldLandmarks[l] || [])[h] || u,
              f = l * 126 + h * 6;
            ((o[f] = u.x), (o[f + 1] = u.y), (o[f + 2] = u.z), (o[f + 3] = d.x), (o[f + 4] = d.y), (o[f + 5] = d.z));
          }
          (a.push((r[l] && r[l][0] && r[l][0].categoryName) || "Right"),
            c.push((r[l] && r[l][0] && r[l][0].score) || 1));
        }
        ((this.ms = performance.now() - e),
          (this.last = performance.now()),
          this.onFrame && this.onFrame({ n: s, data: o, sides: a, scores: c }, t));
      } catch {}
    },
    dispose() {},
  };
  U.engine = ei;
  var Ui = 96,
    xa = document.createElement("canvas"),
    Em = xa.getContext("2d", { willReadFrequently: !0 }),
    wm = -1;
  function Tm(n) {
    if (!n || n.readyState < 2 || !n.videoWidth || n.currentTime === wm) return;
    wm = n.currentTime;
    let t = U.view.aspect,
      e = n.videoWidth / n.videoHeight,
      i = n.videoWidth,
      r = n.videoHeight,
      s = e > t ? r * t : i,
      o = e > t ? r : i / t,
      a = Math.round(Ui / t);
    ((xa.width !== Ui || xa.height !== a) && ((xa.width = Ui), (xa.height = a)),
      Em.drawImage(n, (i - s) / 2, (r - o) / 2, s, o, 0, 0, Ui, a));
    let c = Em.getImageData(0, 0, Ui, a).data,
      l = [],
      h = [];
    for (let m = 0, y = Ui * a; m < y; m++) {
      let E = c[m * 4],
        _ = c[m * 4 + 1],
        T = c[m * 4 + 2];
      0.299 * E + 0.587 * _ + 0.114 * T > 40 &&
        Math.abs(128 - 0.1687 * E - 0.3313 * _ + 0.5 * T - q.cb) < q.tol &&
        Math.abs(128 + 0.5 * E - 0.4187 * _ - 0.0813 * T - q.cr) < q.tol &&
        (l.push(m % Ui), h.push((m / Ui) | 0));
    }
    if (l.length < 40) return;
    let u = Math.min(...l),
      d = Math.max(...l);
    for (let m = 0; m < 4; m++) {
      let y = 0,
        E = 0,
        _ = 0,
        T = 0;
      for (let w of l) Math.abs(w - u) <= Math.abs(w - d) ? ((y += w), E++) : ((_ += w), T++);
      (E && (u = y / E), T && (d = _ / T));
    }
    let f = d - u > Ui * 0.3,
      p = [[], []];
    l.forEach((m, y) => p[f && Math.abs(m - u) > Math.abs(m - d) ? 1 : 0].push(y));
    let x = q.cam === "user",
      g = performance.now();
    p.forEach((m, y) => {
      if (m.length < 70) return;
      let E = m.sort((S, F) => h[S] - h[F]).slice(0, 5),
        _ = 0,
        T = 0;
      for (let S of E) ((_ += l[S]), (T += h[S]));
      let w = _ / E.length / Ui - 0.5,
        v = T / E.length / a - 0.5;
      Ke.lite(y, (x ? -w : w) * t, v, g);
    });
  }
