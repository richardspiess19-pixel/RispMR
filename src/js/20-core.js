  var ve = Math.PI * 2,
    $t = (n, t = 0, e = 1) => (n < t ? t : n > e ? e : n);
  var Fe = (n, t) => 1 - Math.exp(-n * t),
    Zt = (n = 1, t) => (t === void 0 ? Math.random() * n : n + Math.random() * (t - n)),
    nr = (n, t) => Math.floor(Zt(n, t + 1)),
    yi = (n) => n[(Math.random() * n.length) | 0];
  var am = (n) => new Promise((t) => setTimeout(t, n)),
    Yu = () => new Promise((n) => setTimeout(n, 0)),
    Di = (n) => {
      for (; n > Math.PI; ) n -= ve;
      for (; n < -Math.PI; ) n += ve;
      return n;
    },
    Ni = (n) => 440 * 2 ** ((n - 69) / 12),
    qy = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"],
    Gl = (n) => qy[((n % 12) + 12) % 12],
    ma = (n) => String((n / 60) | 0).padStart(2, "0") + ":" + String((n % 60) | 0).padStart(2, "0"),
    om,
    $y = () =>
      om ||
      (om = new Promise((n, t) => {
        try {
          let e = indexedDB.open("rispx", 1);
          ((e.onupgradeneeded = () => {
            (e.result.createObjectStore("kv"), e.result.createObjectStore("media", { keyPath: "id" }));
          }),
            (e.onsuccess = () => n(e.result)),
            (e.onerror = () => t(e.error)));
        } catch (e) {
          t(e);
        }
      })),
    pa = async (n, t, e) => {
      let i = await $y();
      return new Promise((r, s) => {
        let o = i.transaction(n, t),
          a = e(o.objectStore(n));
        ((o.oncomplete = () => r(a && a.result)), (o.onerror = () => s(o.error)), (o.onabort = () => s(o.error)));
      });
    },
    pn = {
      get: (n, t = "kv") => pa(t, "readonly", (e) => e.get(n)).catch(() => {}),
      put: (n, t) => pa("kv", "readwrite", (e) => e.put(t, n)).catch(() => {}),
      del: (n, t = "kv") => pa(t, "readwrite", (e) => e.delete(n)).catch(() => {}),
      has: (n) =>
        pa("kv", "readonly", (t) => t.count(n))
          .then((t) => t > 0)
          .catch(() => !1),
      addMedia: (n) => pa("media", "readwrite", (t) => t.put(n)).catch(() => {}),
      allMedia: () => pa("media", "readonly", (n) => n.getAll()).catch(() => []),
    };
  var Vl = new gi(),
    Wl = new qe(),
    Yy = new qe(-Math.SQRT1_2, 0, 0, Math.SQRT1_2),
    jy = new qe(),
    Ky = new R(0, 0, 1),
    Xl = new R(),
    ir = { a: 0, b: 0, g: 0, ok: !1 };
  addEventListener("deviceorientation", (n) => {
    n.alpha != null && ((ir.a = n.alpha), (ir.b = n.beta), (ir.g = n.gamma), (ir.ok = !0));
  });
  var ke = {
    q: new qe(),
    yaw: 0,
    pitch: 0,
    ref: 0,
    look: { yaw: 0, pitch: 0 },
    forced: null,
    get sensor() {
      return ir.ok && q.headTrack && !U.view.mono;
    },
    update(n) {
      if (this.forced) Wl.setFromEuler(Vl.set(this.forced.pitch, -this.forced.yaw, 0, "YXZ"));
      else if (this.sensor) {
        let t = Math.PI / 180,
          e = ((screen.orientation && screen.orientation.angle) || window.orientation || 0) * t;
        (Vl.set(ir.b * t, (ir.a - this.ref) * t, -ir.g * t, "YXZ"),
          Wl.setFromEuler(Vl).multiply(Yy).multiply(jy.setFromAxisAngle(Ky, -e)));
      } else Wl.setFromEuler(Vl.set(this.look.pitch, -this.look.yaw, 0, "YXZ"));
      (this.q.slerp(Wl, Fe(n, 42)),
        Xl.set(0, 0, -1).applyQuaternion(this.q),
        (this.yaw = Math.atan2(Xl.x, -Xl.z)),
        (this.pitch = Math.asin($t(Xl.y, -1, 1))));
    },
    recenter() {
      ((this.ref = ir.a), (this.look.yaw = 0), (this.look.pitch = 0));
    },
  };
  U.head = ke;
  var ga = [],
    Jr = {},
    ye = (...n) => {
      for (let t of n) (ga.push(t), (Jr[t.id] = t));
    },
    Ge = {
      inst: [
        ["#ffb347", "#d9481c"],
        ["#6f7cff", "#2a1a8c"],
        ["#ff6fa8", "#9c1458"],
        ["#33d6c0", "#0b6a78"],
      ],
      app: [
        ["#5aa9ff", "#2157d6"],
        ["#7ddc7f", "#177a4a"],
        ["#c78bff", "#5a22b8"],
        ["#ffd76a", "#c96f12"],
      ],
      game: [
        ["#ff7a7a", "#b3162e"],
        ["#59e0ff", "#0f6fbd"],
        ["#ffa24d", "#b5430b"],
        ["#a4ff7a", "#2d8a1e"],
      ],
    };
  var ql = {
      alto: { dpr: 2, msaa: 4, bloom: 4, sky: 3072, track: 640, video: 1280 },
      medio: { dpr: 1.6, msaa: 2, bloom: 3, sky: 2048, track: 512, video: 1280 },
      baixo: { dpr: 1.1, msaa: 0, bloom: 0, sky: 1536, track: 384, video: 960 },
    },
    cm = ["alto", "medio", "baixo"],
    Jy = "varying vec2 u;void main(){u=uv;gl_Position=vec4(position.xy,0.,1.);}",
    Zy = `varying vec2 u;uniform sampler2D t;uniform vec2 px;uniform float th;
void main(){vec3 c=texture2D(t,u).rgb*4.;c+=texture2D(t,u+px*vec2(-1.,-1.)).rgb+texture2D(t,u+px*vec2(1.,-1.)).rgb+texture2D(t,u+px*vec2(-1.,1.)).rgb+texture2D(t,u+px*vec2(1.,1.)).rgb;c/=8.;
if(th>0.)c=min(max(c-th,0.),vec3(6.));gl_FragColor=vec4(c,1.);}`,
    Qy = `varying vec2 u;uniform sampler2D t;uniform vec2 px;
void main(){vec3 c=texture2D(t,u+vec2(-2.,0.)*px).rgb+texture2D(t,u+vec2(2.,0.)*px).rgb+texture2D(t,u+vec2(0.,-2.)*px).rgb+texture2D(t,u+vec2(0.,2.)*px).rgb;
c+=(texture2D(t,u+vec2(-1.,1.)*px).rgb+texture2D(t,u+vec2(1.,1.)*px).rgb+texture2D(t,u+vec2(-1.,-1.)*px).rgb+texture2D(t,u+vec2(1.,-1.)*px).rgb)*2.;gl_FragColor=vec4(c/12.,1.);}`,
    t_ = `varying vec2 u;uniform sampler2D t;uniform sampler2D b;uniform vec2 r;uniform vec4 k;uniform float bl;uniform float mono;uniform float fade;
vec3 tone(vec3 c){float p=max(c.r,max(c.g,c.b));if(p<.82)return c;float d=.18;float n=1.-d*d/(p+d-.82);c*=n/p;float g=1.-1./(.15*(p-n)+1.);return mix(c,vec3(n),g);}
vec3 srgb(vec3 c){c=clamp(c,0.,1.);return mix(c*12.92,1.055*pow(c,vec3(.41667))-.055,step(.0031308,c));}
void main(){vec3 c;vec2 s=u;float vig=1.;
if(mono>.5){c=texture2D(t,u).rgb;if(bl>0.)c+=texture2D(b,u).rgb*bl;}
else{float e=step(.5,u.x);vec2 cn=vec2(e<.5?k.y:k.z,.5);vec2 q=(u-cn)*r/(r.y*.5);float d2=dot(q,q);float f=1.+k.x*d2;vec2 sc=(r.y*.5)/r;s=cn+q*f*sc;
if(s.x<e*.5||s.x>.5+e*.5||s.y<0.||s.y>1.){gl_FragColor=vec4(0.,0.,0.,1.);return;}
c.g=texture2D(t,s).g;c.r=texture2D(t,cn+q*f*(1.-k.w)*sc).r;c.b=texture2D(t,cn+q*f*(1.+k.w)*sc).b;if(bl>0.)c+=texture2D(b,s).rgb*bl;vig=1.-smoothstep(.9,1.65,d2)*.75;}
gl_FragColor=vec4(srgb(tone(c*vig)*fade),1.);}`,
    ju = new Ae();
  ju.setAttribute("position", new Le(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  ju.setAttribute("uv", new Le(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
  var De = {
    tier: "medio",
    hdrOK: !0,
    fade: 1,
    fadeTo: 1,
    slow: 0,
    fast: 0,
    init(n) {
      let t = (this.r = new kl({
        canvas: n,
        antialias: !1,
        alpha: !1,
        stencil: !1,
        powerPreference: "high-performance",
      }));
      ((t.autoClear = !1),
        t.setClearColor(131852),
        (t.toneMapping = Qn),
        (t.outputColorSpace = zr),
        (t.info.autoReset = !0),
        (this.hdrOK = t.extensions.has("EXT_color_buffer_float") || t.extensions.has("EXT_color_buffer_half_float")),
        (this.tier =
          q.quality === "auto" ? (/Android|iPhone|iPad/.test(navigator.userAgent) ? "medio" : "alto") : q.quality),
        (this.fsS = new Ds()),
        (this.fsC = new Xr(-1, 1, 1, -1, 0, 1)),
        (this.fs = new tt(ju)),
        (this.fs.frustumCulled = !1),
        this.fsS.add(this.fs));
      let e = (o, a, c = {}) =>
        new Me({ vertexShader: Jy, fragmentShader: o, uniforms: a, depthTest: !1, depthWrite: !1, ...c });
      ((this.mDown = e(Zy, { t: { value: null }, px: { value: new st() }, th: { value: 0 } })),
        (this.mUp = e(Qy, { t: { value: null }, px: { value: new st() } }, { transparent: !0, blending: un })),
        (this.mComp = e(t_, {
          t: { value: null },
          b: { value: null },
          r: { value: new st(1, 1) },
          k: { value: new Ee() },
          bl: { value: 0 },
          mono: { value: 0 },
          fade: { value: 1 },
        })));
      let i = (U.sc = new Ds()),
        r = (U.cam = new Cn(q.fov, 1, 0.05, 90));
      i.add(r);
      let s = (U.headG = new Wt());
      return (i.add(s), (this.rts = []), this.build(), this);
    },
    build() {
      this.dispose();
      let n = ql[this.tier],
        t = this.hdrOK ? qn : Ln;
      if (
        ((this.hdr = new cn(2, 2, {
          type: t,
          samples: n.msaa,
          depthBuffer: !0,
          minFilter: Ne,
          magFilter: Ne,
          generateMipmaps: !1,
        })),
        (this.rts = []),
        this.hdrOK)
      )
        for (let e = 0; e < n.bloom; e++)
          this.rts.push(new cn(2, 2, { type: t, depthBuffer: !1, minFilter: Ne, magFilter: Ne, generateMipmaps: !1 }));
      q.trackW = n.track;
    },
    dispose() {
      (this.hdr && this.hdr.dispose(), this.rts.forEach((n) => n.dispose()));
    },
    layout() {
      let n = U.view,
        t = innerWidth,
        e = innerHeight,
        i = ql[this.tier],
        r = U.cam,
        s = (this.dpr = Math.min(devicePixelRatio || 1, i.dpr)),
        o = (this.rw = Math.round(t * s)),
        a = (this.rh = Math.round(e * s));
      if (
        (this.r.setPixelRatio(1),
        this.r.setSize(o, a, !1),
        this.hdr.setSize(o, a),
        this.rts.forEach((h, u) => h.setSize(Math.max(2, o >> (u + 1)), Math.max(2, a >> (u + 1)))),
        (n.mono = q.view !== "vr"),
        n.mono)
      )
        ((n.aspect = t / e), (n.sep = 0), (n.eyeW = t));
      else {
        let h = (q.inch * 25.4 * t) / Math.hypot(t, e);
        ((n.sep = t > 1200 ? t / 2 : Math.min((q.ipd * t) / h, t / 2)),
          (n.eyeW = (t / 2) * q.zoom),
          (n.aspect = n.eyeW / e));
      }
      let c = n.mono ? Math.min(q.fov, 50) : q.fov;
      ((r.fov = c), (r.aspect = n.aspect), r.updateProjectionMatrix(), (n.tv = Math.tan((c * Math.PI) / 360)));
      let l = this.mComp.uniforms;
      (l.r.value.set(o, a),
        l.k.value.set(q.dist, (t / 2 - n.sep / 2) / t, (t / 2 + n.sep / 2) / t, q.ca),
        (l.mono.value = n.mono ? 1 : 0),
        U.world && U.world.layout());
    },
    pass(n, t) {
      ((this.fs.material = n), this.r.setRenderTarget(t), this.r.render(this.fsS, this.fsC));
    },
    renderScene() {
      let { r: n, hdr: t, rw: e, rh: i } = this,
        r = U.view,
        s = U.cam,
        o = ke.q;
      if (
        (s.quaternion.copy(o),
        U.headG.quaternion.copy(o),
        (t.scissorTest = !1),
        t.viewport.set(0, 0, e, i),
        n.setRenderTarget(t),
        n.clear(),
        r.mono)
      ) {
        (s.position.set(0, 0, 0), s.updateMatrixWorld(), n.render(U.sc, s));
        return;
      }
      let a = r.eyeW * this.dpr,
        c = q.depth * 0.003;
      for (let l = 0; l < 2; l++) {
        let h = (innerWidth / 2 + (l ? r.sep / 2 : -r.sep / 2)) * this.dpr;
        (t.viewport.set(h - a / 2, 0, a, i),
          t.scissor.set((l * e) / 2, 0, e / 2, i),
          (t.scissorTest = !0),
          n.setRenderTarget(t),
          s.position.set(l ? c : -c, 0, 0).applyQuaternion(o),
          s.updateMatrixWorld(),
          n.render(U.sc, s));
      }
    },
    composite(n) {
      let t = this.rts,
        e = t.length,
        i = e > 0 && q.bloom > 0,
        r = this.mComp.uniforms;
      if (i) {
        this.hdrTex = this.hdr.texture;
        let o = this.mDown.uniforms;
        for (let c = 0; c < e; c++) {
          let l = c ? t[c - 1] : this.hdr;
          ((o.t.value = l.texture),
            o.px.value.set(0.5 / l.width, 0.5 / l.height),
            (o.th.value = c ? 0 : 1),
            this.pass(this.mDown, t[c]));
        }
        let a = this.mUp.uniforms;
        for (let c = e - 1; c > 0; c--)
          ((a.t.value = t[c].texture),
            a.px.value.set(0.5 / t[c].width, 0.5 / t[c].height),
            this.pass(this.mUp, t[c - 1]));
      }
      ((r.t.value = this.hdr.texture),
        (r.b.value = i ? t[0].texture : null),
        (r.bl.value = i ? 0.62 * q.bloom : 0),
        (r.fade.value = this.fade));
      let s = r.mono.value;
      (n && (r.mono.value = 1), this.pass(this.mComp, null), (r.mono.value = s));
    },
    render(n) {
      if (
        ((this.fade += (this.fadeTo - this.fade) * Math.min(1, n * 7)),
        this.renderScene(),
        this.composite(),
        this._shot)
      ) {
        let t = this._shot;
        ((this._shot = null), t());
      }
      this.govern(n);
    },
    photo() {
      return new Promise((n) => {
        this._shot = () => {
          let t = U.view,
            e = innerWidth,
            i = innerHeight,
            r = document.createElement("canvas");
          this.composite(!0);
          let s = t.mono ? e : Math.min(t.eyeW, e / 2),
            o = t.mono ? 0 : Math.max(0, e / 2 - t.sep / 2 - s / 2);
          ((r.width = Math.round(s * this.dpr)),
            (r.height = this.rh),
            r
              .getContext("2d")
              .drawImage(this.r.domElement, o * this.dpr, 0, r.width, r.height, 0, 0, r.width, r.height),
            this.composite(),
            n(r));
        };
      });
    },
    govern(n) {
      if (
        !(q.quality !== "auto" || document.hidden) &&
        (n > 0.027 ? (this.slow += n) : (this.slow = Math.max(0, this.slow - n * 0.5)), this.slow > 2.2)
      ) {
        this.slow = 0;
        let t = cm.indexOf(this.tier);
        t < 2 &&
          ((this.tier = cm[t + 1]),
          this.build(),
          this.layout(),
          U.shell && U.shell.toast("Qualidade ajustada para manter a fluidez"));
      }
    },
    setQuality(n) {
      ((q.quality = n), n !== "auto" && ((this.tier = n), this.build(), this.layout()));
    },
    get skySize() {
      return ql[this.tier].sky;
    },
    get videoW() {
      return ql[this.tier].video;
    },
    get calls() {
      return this.r.info.render.calls;
    },
  };
  U.pipe = De;
  var e_ = `precision highp float;varying vec2 vU;
#define PI 3.14159265
float h1(float n){return fract(sin(n)*43758.5453);}
float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float h3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h2(i),h2(i+vec2(1,0)),f.x),mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x),f.y);}
float n3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<6;i++){s+=a*n3(p);p=p*2.03+1.7;a*=.5;}return s;}
float rdg(vec3 p){float a=.5,s=0.;for(int i=0;i<6;i++){s+=a*(1.-abs(2.*n3(p)-1.));p=p*2.1+3.1;a*=.5;}return s;}
float stars(vec3 d,float sc,float th){vec3 p=d*sc,i=floor(p),f=fract(p)-.5;float h=h3(i);if(h<th)return 0.;vec3 o=vec3(h3(i+1.),h3(i+2.),h3(i+3.))-.5;float r=length(f-o*.6);return smoothstep(.1*(h-th)/(1.-th)+.035,0.,r)*(.4+.6*h3(i+4.));}
float mnt(vec3 d,float s,float f,float a,float b){vec2 c=normalize(d.xz);return b+a*rdg(vec3(c*f,s));}
float pin(vec3 d,float f,float s,float b,float a){float l=atan(d.x,-d.z)*f,i=floor(l),x=fract(l)-.5;float h=h1(i+s);return b+a*(.35+.65*h)*(1.-abs(x)*2.);}
float cld(vec3 d,vec3 o,float sc,float cv){vec3 p=vec3(d.xz/(max(d.y,.02)+.2),1.)*sc+o;float n=fbm(p);return smoothstep(cv,cv+.26,n)*smoothstep(.0,.14,d.y);}
vec3 glow(vec3 d,vec3 s,vec3 c,float k){float a=max(dot(d,s),0.);return c*(pow(a,k*60.)*.45+pow(a,k*1400.)*1.4+pow(a,6.)*.1);}
`,
    Ku = `vec4 scene(vec3 d){if(d.y>0.)return vec4(land(d),1.);
vec3 r=vec3(d.x,-d.y,d.z);vec2 q=d.xz/(-d.y+.05);r.x+=(n2(q*vec2(1.2,3.5))-.5)*.05;r.y+=(n2(q*vec2(2.,5.))-.5)*.02;
return vec4(land(normalize(r))*WTINT,.5);}`,
    Fi = "vec4 scene(vec3 d){return vec4(land(d),1.);}",
    Ju = {
      lake: `vec3 sky(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(.05,.18,.6),vec3(.008,.03,.17),pow(y,.5));vec3 m=normalize(vec3(0.,.2,-1.));float a=dot(d,m);
c+=vec3(.16,.42,1.)*(pow(max(a,0.),18.)*.6+pow(max(a,0.),160.)*.8);c+=vec3(.9,.95,1.)*stars(d,90.,.92)*smoothstep(.03,.25,y);
float cl=cld(d,vec3(3.),1.,.5);c=mix(c,vec3(.3,.55,1.)*(.3+1.1*pow(max(a,0.),5.)),cl*.85);
float mr=acos(clamp(a,-1.,1.)),ds=smoothstep(.15,.143,mr);if(ds>0.){float cr=fbm(d*13.)*.6+.5;c=mix(c,vec3(.88,.94,1.)*cr*1.3,ds);}return c;}
vec3 land(vec3 d){vec3 c=sky(d);float h=mnt(d,1.,3.,.5,-.1);
if(d.y<h){float s=smoothstep(h-.13,h-.015,d.y)*smoothstep(.1,.24,d.y);float sh=rdg(d*10.);c=mix(vec3(.02,.07,.28),vec3(.14,.28,.8),sh*.75)+vec3(.65,.8,1.)*s*.65;}
h=mnt(d,5.,5.,.3,-.08);if(d.y<h)c=mix(vec3(.01,.04,.17),vec3(.03,.11,.38),smoothstep(-.02,.2,d.y))*(.6+.7*rdg(d*15.));
h=pin(d,75.,2.,.012,.095);if(d.y<h)c=vec3(.004,.014,.06);return c;}
#define WTINT (vec3(.62,.72,.95))
${Ku}`,
      space: `vec3 land(vec3 d){vec3 c=vec3(.004,.006,.02);float n=fbm(d*2.2+3.);float m=fbm(d*3.+n*2.);c+=vec3(.25,.06,.5)*pow(m,3.)*2.2;c+=vec3(.03,.28,.62)*pow(fbm(d*2.6-5.+m),3.)*2.6;c+=vec3(.7,.14,.32)*pow(fbm(d*4.+9.),5.)*4.;
c+=stars(d,160.,.9)*.9+stars(d,70.,.97)*vec3(.7,.85,1.)*1.2;
vec3 p=normalize(vec3(.55,.18,-1.));float a=acos(clamp(dot(d,p),-1.,1.));
if(a<.25){vec3 n2v=normalize(d-p*dot(d,p));float t=sqrt(max(1.-a*a/.0625,0.));vec3 nr=normalize(p*t+n2v*a/.25);float lt=clamp(dot(nr,normalize(vec3(-.8,.4,.5))),0.,1.);float b=fbm(vec3(nr.y*9.,nr.x,nr.z)*2.);c=mix(vec3(.75,.48,.3),vec3(.95,.8,.6),b)*(lt*1.2+.02);}
float r2=abs(dot(d-p,normalize(vec3(.2,1.,.25))));float rr=length(d-p);if(rr>.3&&rr<.46&&r2<.012)c=mix(c,vec3(.95,.85,.7),.7*smoothstep(.012,.0,r2));
c+=glow(d,normalize(vec3(-.9,.25,.3)),vec3(.9,.95,1.),1.);return c;}${Fi}`,
      beach: `vec3 sky(vec3 d){float y=max(d.y,0.);vec3 s=normalize(vec3(.1,.07,-1.));float a=max(dot(d,s),0.);vec3 c=mix(vec3(1.,.62,.32),vec3(.5,.25,.55),smoothstep(0.,.3,y));c=mix(c,vec3(.1,.13,.42),smoothstep(.2,.8,y));c+=vec3(1.,.55,.25)*pow(a,5.)*.5;
float cl=cld(d,vec3(1.),1.3,.52);c=mix(c,mix(vec3(1.,.55,.4),vec3(.45,.25,.45),smoothstep(.05,.5,y)),cl*.9);c+=glow(d,s,vec3(1.,.8,.5),1.);return c;}
vec3 land(vec3 d){vec3 c=sky(d);float h=mnt(d,9.,3.,.05,-.03);if(d.y<h)c=vec3(.22,.12,.22);return c;}
vec4 scene(vec3 d){if(d.y>0.)return vec4(land(d),1.);vec2 q=d.xz/(-d.y+.03);float sand=smoothstep(-.28,-.42,d.y+sin(q.x*.08)*.03);
vec3 r=vec3(d.x,-d.y,d.z);r.x+=(n2(q*vec2(1.,4.))-.5)*.06;vec3 sea=land(normalize(r))*vec3(.72,.75,.85);sea+=vec3(.9,.95,1.)*smoothstep(.48,.53,sin(q.y*.4+n2(q*.3)*6.))*smoothstep(-.34,-.26,d.y)*.35;
vec3 sd=mix(vec3(.85,.62,.42),vec3(.5,.32,.26),n2(q*2.)*.6+smoothstep(-.4,-.9,d.y)*.4);return vec4(mix(sea,sd,sand),sand>.5?1.:.5);}`,
      neon: `vec3 land(vec3 d){vec3 c=mix(vec3(.95,.15,.55),vec3(.16,.03,.42),smoothstep(0.,.28,d.y));c=mix(c,vec3(.02,.01,.09),smoothstep(.2,.7,d.y));c+=stars(d,120.,.95)*.8;
if(d.y>0.){vec3 s=normalize(vec3(0.,.16,-1.));float r=acos(clamp(dot(d,s),-1.,1.));if(r<.3){float t=(d.y-(s.y-.28))/.56;vec3 sc=mix(vec3(1.,.15,.55),vec3(1.,.9,.3),clamp(t,0.,1.));float bars=step(.0,sin(d.y*110.))+step(.17,d.y);if(bars>.5)c=sc*1.2;}c+=vec3(1.,.2,.6)*pow(max(dot(d,s),0.),40.)*.5;
float h=mnt(d,3.,4.,.2,-.06);if(d.y<h){c=vec3(.05,.01,.14);float e=smoothstep(h-.006,h,d.y);c+=vec3(.1,.8,1.)*e*1.2;}}
else{vec2 q=d.xz/(-d.y+.02);vec2 g=abs(fract(q*.5)-.5);float l=smoothstep(.06+(-d.y)*.04,.0,min(g.x,g.y));c=mix(vec3(.03,.0,.1),vec3(1.,.15,.8)*1.6,l*smoothstep(.0,-.25,d.y)*.9+l*.1);c+=vec3(.9,.1,.5)*pow(1.+d.y,14.)*.6;}return c;}${Fi}`,
      aurora: `vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(.02,.1,.2),vec3(.004,.02,.08),pow(y,.45));c+=stars(d,110.,.92)*smoothstep(.02,.25,y);
for(int i=0;i<3;i++){float fi=float(i);vec2 ad=d.xz/(max(d.y,.03)+.3);float w=fbm(vec3(ad*.8+fi*3.,fi));float band=smoothstep(.13,0.,abs(ad.y*.35+w-.1-fi*.14));float ray=fbm(vec3(ad.x*7.,fi,w*2.));c+=mix(vec3(.1,1.,.5),vec3(.5,.25,1.),fi*.5)*band*(.2+ray*1.1)*smoothstep(.02,.35,d.y)*.75;}
float h=mnt(d,4.,3.5,.2,-.04);if(d.y<h)c=mix(vec3(.1,.18,.3),vec3(.5,.62,.75),smoothstep(h-.08,h,d.y)*.8);h=pin(d,60.,7.,.01,.07);if(d.y<h)c=vec3(.004,.012,.024);return c;}
#define WTINT (vec3(.7,.82,.9))
${Ku}`,
      forest: `vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(.93,.9,.74),vec3(.5,.68,.74),smoothstep(0.,.55,y));vec3 s=normalize(vec3(.5,.42,-.8));c+=glow(d,s,vec3(1.,.92,.7),.5);
float cl=cld(d,vec3(5.),1.,.55);c=mix(c,vec3(1.,.98,.92),cl*.7);
for(int i=0;i<4;i++){float fi=float(i);float l=atan(d.x,-d.z)*(30.-fi*7.);float id=floor(l),xx=abs(fract(l)-.5)*2.;float tall=(.05+.06*h1(id+fi*9.))*(1.+fi*.75);float tier=fract(d.y/tall*5.);float wd=1.-(d.y+.02)/tall;wd*=.75+.25*(1.-tier);float h=.0;float tree=step(xx,clamp(wd,0.,1.))*step(-.03,d.y);float grnd=step(d.y,mnt(d,fi+2.,6.,.035,-.012));if(tree>.5||grnd>.5){vec3 t=mix(vec3(.6,.72,.66),vec3(.05,.17,.1),fi/3.);t*=.82+.36*n3(d*vec3(46.,20.,46.));c=mix(t,vec3(.86,.88,.76),.6-.19*fi);}}
if(d.y<0.){vec2 q=d.xz/(-d.y+.03);c=mix(vec3(.16,.26,.1),vec3(.06,.13,.05),n2(q*3.)*.8+.2*n2(q*11.));}
float rays=pow(max(dot(d,s),0.),3.)*fbm(vec3(atan(d.x,-d.z)*7.,1.,2.));c+=vec3(1.,.9,.6)*rays*.5;return c;}${Fi}`,
      desert: `vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(1.,.72,.42),vec3(.72,.34,.42),smoothstep(0.,.3,y));c=mix(c,vec3(.17,.17,.45),smoothstep(.22,.85,y));vec3 s=normalize(vec3(-.6,.09,-.8));c+=glow(d,s,vec3(1.,.75,.4),.8);c+=stars(d,100.,.96)*smoothstep(.45,.9,y)*.7;
float h=mnt(d,6.,2.8,.3,-.14);if(d.y<h){c=mix(vec3(.45,.2,.14),vec3(.86,.45,.26),clamp(dot(normalize(vec3(d.x,0.,d.z)),s)*.5+.5,0.,1.)*rdg(d*vec3(12.,30.,12.)));}
if(d.y<0.04){float w=d.y+sin(atan(d.x,-d.z)*5.+1.)*.02+sin(atan(d.x,-d.z)*13.)*.008;if(w<0.){vec2 q=d.xz/(-d.y+.09);float r=sin(q.x*3.+n2(q)*4.)*.5+.5;c=mix(vec3(.95,.58,.28),vec3(.56,.26,.14),smoothstep(-.02,-.6,d.y)*.5+r*.3);}}return c;}${Fi}`,
      city: `float bld(vec3 d,float f,float s,float a,out float idx,out vec2 uv){float l=atan(d.x,-d.z)*f;float i=floor(l);idx=i;float h=a*(.25+.75*pow(h1(i+s),2.));uv=vec2(fract(l),d.y/max(h,.001));return h;}
vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(.8,.32,.28),vec3(.3,.13,.4),smoothstep(0.,.14,y));c=mix(c,vec3(.015,.02,.09),smoothstep(.1,.5,y));c+=stars(d,120.,.97)*smoothstep(.2,.5,y)*.6;
c=mix(c,vec3(.16,.08,.26),cld(d,vec3(8.),1.2,.56)*.7);vec3 m=normalize(vec3(.6,.42,-.7));float ma=acos(clamp(dot(d,m),-1.,1.));if(ma<.05)c=vec3(1.,.95,.8);c+=vec3(.5,.45,.5)*pow(max(dot(d,m),0.),60.)*.4;
for(int i=0;i<3;i++){float fi=float(i),id;vec2 uv;float a=.5-.12*fi;float h=bld(d,16.+fi*13.,fi*7.,a,id,uv);if(d.y<h&&d.y>-.02){vec3 b=mix(vec3(.11,.09,.22),vec3(.015,.016,.05),fi/2.);vec2 g=vec2(uv.x*(6.+h1(id)*5.),d.y*(70.+fi*24.));vec2 ci=floor(g),cf=fract(g);float w=step(.26,cf.x)*step(cf.x,.76)*step(.3,cf.y)*step(cf.y,.74);float lit=step(.52+fi*.04,h2(ci+id));vec3 wc=mix(vec3(1.,.8,.45),vec3(.45,.8,1.),step(.82,h2(ci+id+3.)));c=b+wc*w*lit*(1.-fi*.1)*1.1;}}
if(d.y<0.){vec2 q=d.xz/(-d.y+.02);c=vec3(.02,.02,.05)+vec3(.9,.5,.2)*step(.95,fract(q.x*.25))*.5*n2(q*vec2(1.,.1))+vec3(1.,.2,.2)*step(.95,fract(q.x*.25+.5))*.3*n2(q*vec2(1.,.12)+5.);}return c;}${Fi}`,
      ocean: `vec3 land(vec3 d){float y=d.y;vec3 c=mix(vec3(.0,.08,.2),vec3(.02,.5,.72),smoothstep(-.5,.75,y));float a=atan(d.x,-d.z);float ry=fbm(vec3(a*9.,y*.6,1.));c+=vec3(.25,.75,.9)*pow(ry,3.)*smoothstep(.1,.95,y)*2.4;
vec2 q=d.xz/(abs(y)+.15);float ca=pow(1.-abs(sin(n2(q*2.)*7.+n2(q*6.)*3.)),6.);if(y>.25)c+=vec3(.6,.95,1.)*ca*.5*smoothstep(.25,.95,y);
if(y<-.03){float h=fbm(vec3(q*1.1,2.));c=mix(vec3(.42,.5,.42),vec3(.05,.2,.26),smoothstep(-.1,-.75,y)*.4+h*.7);c*=.5+.8*(.5+.5*sin(q.x*3.+n2(q*2.)*6.)*sin(q.y*3.));}
float h=mnt(d,3.,4.,.26,-.1);if(y<h)c=mix(c,mix(vec3(.02,.15,.22),vec3(.42,.2,.36),rdg(d*14.)*.5),.8);
for(int i=0;i<3;i++){float fi=float(i);float k=-.1+fi*.025+.2*pow(n3(vec3(a*(9.+fi*6.),fi,1.)),2.);if(y<k){float sp=n3(vec3(a*(26.+fi*9.),y*22.,fi));c=mix(c,mix(vec3(.06,.42,.34),vec3(.8,.3,.46),smoothstep(.35,.65,n3(vec3(a*4.,fi,5.))))*(.55+.7*sp),.85);}}
return c;}${Fi}`,
      stage: `vec3 land(vec3 d){float y=d.y;vec3 c=vec3(.006,.006,.018);float a=atan(d.x,-d.z);float tr=step(.5,d.y)*smoothstep(.02,.0,abs(fract(a*5.)-.5)-.0);
for(int i=-3;i<=3;i++){float fi=float(i);vec3 p=normalize(vec3(fi*.32,1.1,-1.));float b=pow(max(dot(d,normalize(p-vec3(fi*.2+sin(fi)*.3,1.6,-.6))),0.),60.);vec3 l=normalize(vec3(.5+.5*sin(fi*1.7),.3+.3*cos(fi*2.1),.8+.2*sin(fi)));c+=l*b*.8;c+=l*pow(max(dot(d,p),0.),700.)*3.;}
float scr=step(abs(a),.7)*step(abs(y-.3),.2);if(scr>.5){float pl=fbm(vec3(a*3.,y*6.,1.));c=mix(vec3(.01,.03,.12),vec3(.08,.36,.95),smoothstep(.42,.72,pl));c*=.75+.25*step(.3,fract(a*70.))*step(.3,fract(y*160.));}
if(y<0.){vec2 q=d.xz/(-y+.04);float cr=n3(vec3(q*vec2(9.,5.),2.));float ar=smoothstep(-.1,-.0,y);c=mix(vec3(.04,.04,.06),vec3(.24,.14,.09),n2(q*vec2(.5,6.))*.5)*.5;c+=vec3(.5,.45,.8)*pow(1.+y,10.)*.3*ar;}
float ccd=step(y,.09)*step(-.34,y)*step(abs(a),2.8)*step(1.5,abs(a));if(ccd>.5){float ph=step(.45,fract(a*22.))*step(.4,fract(y*40.));c=mix(c,vec3(.03),ph);}
return c;}${Fi}`,
      studio: `vec3 land(vec3 d){float y=d.y;vec3 c=mix(vec3(.05,.07,.11),vec3(.014,.018,.03),smoothstep(-.2,.9,abs(y)));float a=atan(d.x,-d.z);float pn=smoothstep(.02,.0,abs(fract(a*6./PI)-.5)-.47);c*=.8+.2*pn;
for(int i=0;i<6;i++){float t=float(i)*PI/3.;float dd=abs(mod(a-t+PI,2.*PI)-PI);c+=vec3(.1,.34,.7)*smoothstep(.015,.0,dd)*smoothstep(.75,-.1,y)*.8;}
if(y>.5){vec2 q=d.xz/y;float r=length(q);c+=vec3(.25,.45,.8)*smoothstep(.03,.0,abs(r-.65))*1.;}
if(y<0.){vec2 q=d.xz/(-y+.03);c=mix(vec3(.08,.09,.12),vec3(.03,.035,.05),n2(q*.8)*.8);c+=vec3(.1,.3,.6)*smoothstep(.04,.0,abs(length(q)-2.2))*.8;}return c;}${Fi}`,
      clouds: `vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(.85,.72,.62),vec3(.2,.42,.8),smoothstep(0.,.5,y));c=mix(c,vec3(.04,.12,.36),smoothstep(.4,1.,y));vec3 s=normalize(vec3(-.3,.12,-1.));c+=glow(d,s,vec3(1.,.85,.6),.9);
if(d.y<.04){vec2 q=d.xz/(-d.y+.09);float n=fbm(vec3(q*.42,1.));float h=fbm(vec3(q*.42+s.xz*.08,1.));float l=clamp((n-h)*7.+.55,0.,1.);vec3 k=mix(vec3(.62,.5,.62),vec3(1.,.9,.78),l);c=mix(c,k,smoothstep(.34,.58,n)*smoothstep(.04,-.01,d.y));c=mix(c,vec3(.32,.42,.66),smoothstep(.0,-.8,d.y)*.2);}return c;}${Fi}`,
      sakura: `vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(1.,.82,.8),vec3(.52,.68,.9),smoothstep(0.,.6,y));vec3 s=normalize(vec3(.4,.26,-1.));c+=glow(d,s,vec3(1.,.5,.42),1.);float ds=step(acos(clamp(dot(d,s),-1.,1.)),.09);c=mix(c,vec3(1.,.42,.34),ds);
float h=mnt(d,2.,1.7,.42,-.17);if(d.y<h){c=mix(vec3(.46,.5,.68),vec3(1.,1.,1.),smoothstep(h-.13,h-.03,d.y)*smoothstep(.1,.2,d.y));c=mix(c,vec3(.85,.8,.86),.35);}
h=mnt(d,7.,5.,.1,-.03);if(d.y<h)c=vec3(.42,.5,.42);float a=atan(d.x,-d.z);float t=fbm(vec3(normalize(d.xz)*5.,3.));h=.02+.34*smoothstep(.46,.7,t);float blob=fbm(vec3(d*11.));if(d.y<h+blob*.08-.02&&t>.46){c=mix(vec3(1.,.72,.84),vec3(.92,.4,.62),blob);}return c;}
#define WTINT (vec3(.78,.85,.92))
${Ku}`,
      mars: `vec3 land(vec3 d){float y=max(d.y,0.);vec3 c=mix(vec3(.82,.5,.3),vec3(.3,.18,.2),smoothstep(0.,.5,y));c=mix(c,vec3(.04,.04,.1),smoothstep(.35,.9,y));vec3 s=normalize(vec3(.7,.2,-.7));c+=glow(d,s,vec3(.75,.85,1.),.9);c+=stars(d,100.,.96)*smoothstep(.45,.85,y);
vec3 ph=normalize(vec3(-.5,.38,-.8));float a=acos(clamp(dot(d,ph),-1.,1.));if(a<.05)c=vec3(.75,.68,.6)*(.6+.5*n3(d*60.));
float h=mnt(d,3.,2.6,.2,-.08);if(d.y<h)c=mix(vec3(.3,.13,.08),vec3(.68,.33,.17),rdg(d*vec3(9.,26.,9.)));h=mnt(d,8.,6.,.06,-.015);if(d.y<h)c=vec3(.4,.18,.1)*(.6+.8*rdg(d*14.));
if(d.y<0.){vec2 q=d.xz/(-d.y+.03);float n=fbm(vec3(q*.7,1.));c=mix(vec3(.72,.36,.2),vec3(.3,.14,.08),n);float cr=smoothstep(.38,.36,length(fract(q*.12)-.5));c*=1.-cr*.18;}return c;}${Fi}`,
    },
    lm = e_,
    hm = "varying vec2 vU;void main(){vU=uv;gl_Position=vec4(position.xy,0.,1.);}",
    um =
      "void main(){float lon=(vU.x-.5)*2.*PI,lat=(vU.y-.5)*PI;vec3 d=vec3(sin(lon)*cos(lat),sin(lat),-cos(lon)*cos(lat));vec4 c=scene(d);gl_FragColor=vec4(pow(clamp(c.rgb,0.,1.),vec3(.4545)),c.a);}";
  var $l = [
      ["cam", "Câmera real", "Realidade mista"],
      ["lake", "Lago da Lua", "Noite azul nas montanhas"],
      ["space", "Espaço", "Nebulosa e planeta anelado"],
      ["beach", "Praia", "Pôr do sol"],
      ["neon", "Neon", "Grade synthwave"],
      ["aurora", "Aurora", "Luzes do norte"],
      ["forest", "Floresta", "Névoa da manhã"],
      ["desert", "Deserto", "Dunas douradas"],
      ["city", "Cidade", "Noite urbana"],
      ["ocean", "Fundo do mar", "Recifes e raios de sol"],
      ["stage", "Palco", "Show ao vivo"],
      ["studio", "Estúdio", "Sala escura"],
      ["clouds", "Nuvens", "Acima de tudo"],
      ["sakura", "Sakura", "Jardim japonês"],
      ["mars", "Marte", "Vale vermelho"],
    ],
    n_ = {
      lake: [12572927, 220, 1.6, [0, 0.05, 0]],
      space: [10470655, 160, 1.6, [0.02, 0, 0.02]],
      beach: [16767144, 120, 1.5, [0.12, 0.02, 0]],
      neon: [16736208, 200, 2, [0, 0.1, 0.25]],
      aurora: [16777215, 340, 1.4, [0.04, -0.12, 0]],
      forest: [16773296, 170, 1.8, [0.03, 0.03, 0]],
      desert: [16763274, 220, 1.2, [0.32, 0.03, 0]],
      city: [16760944, 100, 1.5, [0, 0.05, 0]],
      ocean: [12579071, 280, 2.2, [0.03, 0.16, 0]],
      stage: [16777215, 150, 1.5, [0, 0.06, 0]],
      studio: [9417983, 70, 1.2, [0, 0.02, 0]],
      clouds: [16777215, 80, 2, [0.2, 0, 0]],
      sakura: [16756944, 260, 2.4, [0.12, -0.14, 0.04]],
      mars: [14718300, 200, 1.4, [0.3, 0.02, 0]],
      cam: [16777215, 0, 1, [0, 0, 0]],
    },
    i_ = {
      cam: [16777215, 1, 16777215, 1.5],
      lake: [8368383, 0.9, 12441343, 1.7],
      space: [9414911, 0.7, 16777215, 1.8],
      beach: [16756864, 0.9, 16765088, 1.8],
      neon: [12607743, 0.9, 16744656, 1.7],
      aurora: [6356928, 0.7, 12640511, 1.5],
      forest: [13691072, 1, 16773328, 1.8],
      desert: [16760976, 1, 16767136, 1.9],
      city: [8425727, 0.8, 16760976, 1.5],
      ocean: [6344959, 1, 10547455, 1.5],
      stage: [10529023, 0.7, 16777215, 2],
      studio: [9480400, 0.8, 16777215, 1.7],
      clouds: [16769216, 1.1, 16777215, 1.9],
      sakura: [16765152, 1, 16769232, 1.8],
      mars: [16752752, 0.9, 16765104, 1.7],
    },
    r_ = ["lake", "space", "neon", "city", "aurora", "stage"],
    s_ = "varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    o_ = `varying vec3 vD;uniform sampler2D a;uniform sampler2D b;uniform float m;uniform float t;uniform float bo;
vec3 smp(sampler2D s,vec2 uv){vec4 c=texture2D(s,uv);if(c.a<.8){float w=sin(uv.y*1100.+t*1.7+sin(uv.x*420.+t*.5)*2.)+sin(uv.y*700.-t*1.2);c=texture2D(s,uv+vec2(w*.0007,w*.0009));}vec3 l=pow(c.rgb,vec3(2.2));float e=max(l.r,max(l.g,l.b));return l*(1.+bo*smoothstep(.8,1.,e));}
void main(){vec3 d=normalize(vD);vec2 uv=vec2(atan(d.x,-d.z)/6.28318+.5,asin(clamp(d.y,-1.,1.))/3.14159+.5);vec3 c=smp(a,uv);if(m>0.)c=mix(c,smp(b,uv),m);gl_FragColor=vec4(c,1.);}`,
    a_ = `attribute vec3 seed;uniform float t;uniform vec3 vel;uniform float px;uniform float box;varying float a;
void main(){vec3 p=position+vel*t+vec3(sin(t*.4+seed.x*6.),cos(t*.3+seed.y*6.),sin(t*.35+seed.z*6.))*.3;p=mod(p+box*.5,box)-box*.5;vec4 mv=modelViewMatrix*vec4(p,1.);a=(.45+.55*sin(t*(.5+seed.x)+seed.y*6.))*smoothstep(.4,1.5,-mv.z);gl_PointSize=(1.2+seed.z*2.)*px/-mv.z;gl_Position=projectionMatrix*mv;}`,
    c_ =
      "uniform vec3 c;varying float a;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(c*a*smoothstep(.5,.05,d),1.);}",
    rr = {
      rts: {},
      cur: null,
      baking: null,
      thumbs: {},
      tq: [],
      init() {
        let { sc: n } = U,
          t = U.cam,
          e = (this.dome = new tt(
            new tn(45, 36, 24),
            new Me({
              vertexShader: s_,
              fragmentShader: o_,
              side: Sn,
              depthWrite: !1,
              depthTest: !1,
              uniforms: { a: { value: null }, b: { value: null }, m: { value: 0 }, t: { value: 0 }, bo: { value: 0 } },
            }),
          ));
        ((e.renderOrder = -9), (e.frustumCulled = !1), (e.visible = !1), n.add(e));
        let i = (this.vt = new Uo(U.video));
        ((i.colorSpace = Pe), (i.minFilter = i.magFilter = Ne), (i.generateMipmaps = !1));
        let r = (this.bg = new tt(new sn(1, 1), new $e({ map: i, depthWrite: !1, depthTest: !1, fog: !1 })));
        ((r.position.z = -60),
          (r.renderOrder = -10),
          (r.frustumCulled = !1),
          t.add(r),
          (this.hemi = new Jo(16777215, 2241365, 1)),
          (this.sun = new ea(16777215, 1.6)),
          this.sun.position.set(-1.2, 3, 2),
          n.add(this.hemi, this.sun));
        let s = 340,
          o = new Float32Array(s * 3),
          a = new Float32Array(s * 3),
          c = 16;
        for (let d = 0; d < s * 3; d++) ((o[d] = Zt(-c / 2, c / 2)), (a[d] = Math.random()));
        let l = new Ae();
        (l.setAttribute("position", new Le(o, 3)),
          l.setAttribute("seed", new Le(a, 3)),
          (this.amb = new Hr(
            l,
            new Me({
              vertexShader: a_,
              fragmentShader: c_,
              transparent: !0,
              blending: un,
              depthWrite: !1,
              uniforms: {
                t: { value: 0 },
                vel: { value: new R() },
                c: { value: new Tt() },
                px: { value: 20 },
                box: { value: c },
              },
            }),
          )),
          (this.amb.frustumCulled = !1),
          (this.amb.visible = !1),
          n.add(this.amb));
        let h = new Ae();
        (h.setAttribute(
          "position",
          new Le(new Float32Array([-30, -1.7, -30, 30, -1.7, -30, 30, -1.7, 30, -30, -1.7, 30]), 3),
        ),
          h.setIndex([0, 2, 1, 0, 3, 2]),
          (this.grid = new tt(
            h,
            new Me({
              transparent: !0,
              depthWrite: !1,
              blending: un,
              uniforms: { t: { value: 0 } },
              vertexShader:
                "varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
              fragmentShader:
                "varying vec3 p;uniform float t;void main(){vec2 q=vec2(p.x,p.z+t*.9);vec2 g=abs(fract(q)-.5)/fwidth(q);float l=1.-min(min(g.x,g.y),1.);float f=smoothstep(26.,1.,length(p.xz));gl_FragColor=vec4(vec3(.15,.75,1.)*l*f*1.6,1.);}",
            }),
          )),
          (this.grid.visible = !1),
          (this.grid.frustumCulled = !1),
          n.add(this.grid),
          (this.beams = new Wt()),
          (this.beams.visible = !1),
          n.add(this.beams));
        let u = new Gr(0.9, 9, 20, 1, !0);
        (u.translate(0, -4.5, 0),
          [16726668, 3837183, 3211200, 16760896, 10510591, 16732208].forEach((d, f) => {
            let p = new tt(
              u,
              new Me({
                transparent: !0,
                depthWrite: !1,
                side: He,
                blending: un,
                uniforms: { c: { value: new Tt(d) } },
                vertexShader:
                  "varying float y;void main(){y=-position.y/9.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
                fragmentShader:
                  "uniform vec3 c;varying float y;void main(){gl_FragColor=vec4(c*(1.-y)*(1.-y)*.28,1.);}",
              }),
            );
            (p.position.set(-3.5 + f * 1.4, 4.2, -6), (p.userData.ph = f * 1.1), this.beams.add(p));
          }),
          (this.pmrem = new $s(De.r)),
          (this.envSet = {}),
          this.select(q.scene, !0));
      },
      layout() {
        if (!this.bg) return;
        let n = U.view,
          t = 60,
          e = 2 * t * n.tv;
        (this.bg.scale.set(e * n.aspect, e, 1), (this.amb.material.uniforms.px.value = De.rh * 0.03));
      },
      mat(n) {
        return new Me({ vertexShader: hm, fragmentShader: lm + Ju[n] + um, depthTest: !1, depthWrite: !1 });
      },
      bake(n, t) {
        let e = new cn(t, t / 2, { minFilter: Ne, magFilter: Ne, wrapS: gr, depthBuffer: !1, generateMipmaps: !1 });
        return { id: n, rt: e, mat: this.mat(n), row: 0, strips: 48, size: t };
      },
      step() {
        let n = this.baking;
        if (!n) {
          if (U.frame % 12 === 0) {
            let s = this.tq.shift();
            s && this.makeThumb(s);
          }
          return;
        }
        let t = n.size / 2,
          e = Math.ceil(t / n.strips),
          { r: i } = De,
          r = De.tier === "alto" ? 6 : 3;
        for (let s = 0; s < r && n.row < n.strips; s++, n.row++)
          ((n.rt.scissorTest = !0),
            n.rt.scissor.set(0, n.row * e, n.size, e),
            n.rt.viewport.set(0, 0, n.size, t),
            De.pass(n.mat, n.rt));
        n.row >= n.strips &&
          ((n.rt.scissorTest = !1),
          n.mat.dispose(),
          (this.rts[n.id] = n.rt),
          (this.baking = null),
          n.id === this.cur ? this.show(n.id) : this.applyEnv(n.id));
      },
      show(n) {
        let t = this.dome.material.uniforms,
          e = this.rts[n];
        ((t.bo.value = r_.includes(n) ? 2.6 : 0),
          this.dome.visible && t.a.value && t.a.value !== e.texture
            ? ((t.b.value = e.texture), (t.m.value = 0.001))
            : ((t.a.value = e.texture), (t.m.value = 0)),
          (this.dome.visible = !0),
          this.applyEnv(n));
      },
      applyEnv(n) {
        if (!this.envSet[n]) {
          let t = this.pmrem.fromEquirectangular(this.rts[n].texture);
          this.envSet[n] = t.texture;
        }
        ((U.sc.environment = this.envSet[n]), (U.sc.environmentIntensity = n === "studio" ? 1.3 : 0.9));
      },
      select(n, t) {
        (!Ju[n] && n !== "cam" && (n = "cam"), (q.scene = n), Ze(), (this.cur = n));
        let e = i_[n];
        (this.hemi.color.set(e[0]),
          this.hemi.groundColor.set(1581114),
          (this.hemi.intensity = e[1]),
          this.sun.color.set(e[2]),
          (this.sun.intensity = e[3]));
        let i = n_[n],
          r = this.amb.material.uniforms;
        if (
          ((this.amb.visible = i[1] > 0),
          r.c.value.set(i[0]).multiplyScalar(0.9),
          r.vel.value.set(...i[3]),
          this.amb.geometry.setDrawRange(0, i[1]),
          (this.grid.visible = n === "neon"),
          (this.beams.visible = n === "stage"),
          this.baking && (this.baking.rt.dispose(), this.baking.mat.dispose(), (this.baking = null)),
          n === "cam")
        ) {
          ((this.dome.visible = !1),
            this.rts.studio ? this.applyEnv("studio") : (this.baking = this.bake("studio", 1024)));
          return;
        }
        (this.rts[n] ? this.show(n) : (this.baking = this.bake(n, De.skySize)), ke.ref);
      },
      makeThumb(n) {
        let i = new cn(256, 128, { depthBuffer: !1 }),
          r = this.mat(n),
          s = new Uint8Array(256 * 128 * 4);
        (De.pass(r, i), De.r.readRenderTargetPixels(i, 0, 0, 256, 128, s), i.dispose(), r.dispose());
        let o = document.createElement("canvas");
        ((o.width = 256), (o.height = 128));
        let a = o.getContext("2d"),
          c = a.createImageData(256, 128);
        for (let l = 0; l < 128; l++) {
          let h = l * 256 * 4,
            u = (127 - l) * 256 * 4;
          for (let d = 0; d < 256 * 4; d += 4)
            ((c.data[u + d] = s[h + d]),
              (c.data[u + d + 1] = s[h + d + 1]),
              (c.data[u + d + 2] = s[h + d + 2]),
              (c.data[u + d + 3] = 255));
        }
        (a.putImageData(c, 0, 0), (this.thumbs[n] = o), U.shell && U.shell.dirtyAll());
      },
      thumb(n) {
        return this.thumbs[n] ? this.thumbs[n] : (n !== "cam" && !this.tq.includes(n) && this.tq.push(n), null);
      },
      update(n) {
        this.step();
        let t = U.time,
          e = this.dome.material.uniforms;
        if (
          ((e.t.value = t),
          e.m.value > 0 &&
            ((e.m.value += Math.max(n * 2.2, 0.06)), e.m.value >= 1 && ((e.a.value = e.b.value), (e.m.value = 0))),
          (this.amb.material.uniforms.t.value = t),
          this.grid.visible && (this.grid.material.uniforms.t.value = t),
          this.beams.visible)
        ) {
          let s = U.audio ? U.audio.level() : 0;
          this.beams.children.forEach((o) => {
            ((o.rotation.z = Math.sin(t * 0.8 + o.userData.ph) * 0.5),
              (o.rotation.x = Math.sin(t * 0.6 + o.userData.ph * 2) * 0.3 + 0.25),
              o.scale.setScalar(1 + s * 0.4));
          });
        }
        let i = U.video,
          r = this.cur === "cam" && i && i.readyState > 1 && i.videoWidth;
        if (((this.bg.visible = !!r), i && i.videoWidth)) {
          let s = i.videoWidth / i.videoHeight,
            o = U.view.aspect,
            a = s > o ? o / s : 1,
            c = s > o ? 1 : s / o,
            l = q.cam === "user",
            h = this.vt;
          (h.repeat.set(l ? -a : a, c), h.offset.set(l ? (1 + a) / 2 : (1 - a) / 2, (1 - c) / 2));
        }
      },
    };
  U.world = rr;
  var wr = 700,
    Zr = new Float32Array(wr * 3),
    Qr = new Float32Array(wr * 3),
    ts = new Float32Array(wr * 3),
    js = new Float32Array(wr * 3),
    Yl = new Float32Array(wr),
    dm = new Float32Array(wr),
    l_ = 0,
    Zu = 0,
    jl = new Tt(),
    Kl = [],
    ee = {
      init() {
        let n = (this.g = new Ae());
        (n.setAttribute("position", new Le(Zr, 3)),
          n.setAttribute("color", new Le(ts, 3)),
          (this.pts = new Hr(
            n,
            new Us({ size: 0.05, vertexColors: !0, transparent: !0, blending: un, depthWrite: !1, map: this.dot() }),
          )),
          (this.pts.frustumCulled = !1),
          U.sc.add(this.pts));
        let t = new Zi(0.88, 1, 48);
        for (let e = 0; e < 14; e++) {
          let i = new tt(t, new $e({ transparent: !0, blending: un, side: He, depthWrite: !1 }));
          ((i.visible = !1), (i.userData.t = 1), U.sc.add(i), Kl.push(i));
        }
      },
      dot() {
        let n = document.createElement("canvas");
        n.width = n.height = 32;
        let t = n.getContext("2d"),
          e = t.createRadialGradient(16, 16, 0, 16, 16, 16);
        return (
          e.addColorStop(0, "#fff"),
          e.addColorStop(0.35, "rgba(255,255,255,.7)"),
          e.addColorStop(1, "rgba(255,255,255,0)"),
          (t.fillStyle = e),
          t.fillRect(0, 0, 32, 32),
          new ln(n)
        );
      },
      burst(n, t, e = 22, i = 1, r = 2.2) {
        jl.set(t).multiplyScalar(2.6);
        for (let s = 0; s < e; s++) {
          let o = l_++ % wr,
            a = Zt(ve),
            c = Zt(0.2, 1.4) * i;
          ((Zr[o * 3] = n.x),
            (Zr[o * 3 + 1] = n.y),
            (Zr[o * 3 + 2] = n.z),
            (Qr[o * 3] = Math.cos(a) * c),
            (Qr[o * 3 + 1] = Zt(0.3, 1.8) * i),
            (Qr[o * 3 + 2] = Math.sin(a) * c * 0.6 + 0.3),
            (js[o * 3] = jl.r),
            (js[o * 3 + 1] = jl.g),
            (js[o * 3 + 2] = jl.b),
            (Yl[o] = 1),
            (dm[o] = r));
        }
        Zu = 1.5;
      },
      ring(n, t, e = 0.6) {
        let i = Kl.find((r) => !r.visible) || Kl[0];
        (i.position.copy(n),
          i.quaternion.copy(U.cam.quaternion),
          i.material.color.set(t).multiplyScalar(2.4),
          (i.material.opacity = 1),
          (i.visible = !0),
          (i.userData.t = 0),
          (i.userData.s = e));
      },
      hit(n, t, e = 1) {
        (this.burst(n, t, Math.round(10 + 16 * e), 0.6 + e * 0.6), this.ring(n, t, 0.25 + e * 0.35));
      },
      update(n) {
        if (Zu > 0) {
          Zu -= n;
          let t = n * 1.5;
          for (let e = 0; e < wr; e++) {
            let i = e * 3;
            if (Yl[e] > 0) {
              ((Yl[e] -= t),
                (Qr[i + 1] -= dm[e] * n),
                (Zr[i] += Qr[i] * n),
                (Zr[i + 1] += Qr[i + 1] * n),
                (Zr[i + 2] += Qr[i + 2] * n));
              let r = Math.max(0, Yl[e]);
              ((ts[i] = js[i] * r), (ts[i + 1] = js[i + 1] * r), (ts[i + 2] = js[i + 2] * r));
            } else ts[i] = ts[i + 1] = ts[i + 2] = 0;
          }
          this.g.attributes.position.needsUpdate = this.g.attributes.color.needsUpdate = !0;
        }
        for (let t of Kl) {
          if (!t.visible) continue;
          t.userData.t += n * 2.2;
          let e = t.userData.t;
          if (e >= 1) {
            t.visible = !1;
            continue;
          }
          (t.scale.setScalar(0.05 + (1 - (1 - e) ** 2) * t.userData.s), (t.material.opacity = 1 - e));
        }
      },
      trail(n, t = 14) {
        let e = new Float32Array(t * 6),
          i = new Ae(),
          r = [];
        for (let c = 0; c < t - 1; c++) {
          let l = c * 2;
          r.push(l, l + 1, l + 2, l + 1, l + 3, l + 2);
        }
        (i.setAttribute("position", new Le(e, 3)), i.setIndex(r));
        let s = new Float32Array(t * 2);
        for (let c = 0; c < t; c++) s[c * 2] = s[c * 2 + 1] = c / (t - 1);
        i.setAttribute("al", new Le(s, 1));
        let o = new tt(
          i,
          new Me({
            transparent: !0,
            depthWrite: !1,
            side: He,
            blending: un,
            uniforms: { c: { value: new Tt(n).multiplyScalar(2.4) } },
            vertexShader:
              "attribute float al;varying float a;void main(){a=al;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
            fragmentShader: "uniform vec3 c;varying float a;void main(){gl_FragColor=vec4(c*a*a,1.);}",
          }),
        );
        return (
          (o.frustumCulled = !1),
          {
            mesh: o,
            pts: e,
            len: t,
            push(c, l) {
              e.copyWithin(0, 6);
              let h = (t - 1) * 6;
              ((e[h] = c.x),
                (e[h + 1] = c.y),
                (e[h + 2] = c.z),
                (e[h + 3] = l.x),
                (e[h + 4] = l.y),
                (e[h + 5] = l.z),
                (i.attributes.position.needsUpdate = !0));
            },
          }
        );
      },
    };
  U.fx = ee;
