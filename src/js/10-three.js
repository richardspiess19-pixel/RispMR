  var Nf = 0,
    iu = 1,
    Ff = 2;
  var na = 1,
    Uf = 2,
    Gs = 3,
    Ii = 0,
    Sn = 1,
    He = 2,
    qr = 0,
    Vs = 1,
    un = 2,
    ru = 3,
    su = 4,
    Of = 5;
  var $r = 100,
    Bf = 101,
    kf = 102,
    zf = 103,
    Hf = 104,
    Gf = 200,
    Vf = 201,
    Wf = 202,
    Xf = 203,
    ou = 204,
    au = 205,
    qf = 206,
    $f = 207,
    Yf = 208,
    jf = 209,
    Kf = 210,
    Jf = 211,
    Zf = 212,
    Qf = 213,
    tp = 214,
    mc = 0,
    gc = 1,
    vc = 2,
    Rs = 3,
    xc = 4,
    yc = 5,
    _c = 6,
    bc = 7,
    cu = 0,
    ep = 1,
    np = 2,
    Qn = 0,
    lu = 1,
    hu = 2,
    uu = 3,
    du = 4,
    fu = 5,
    pu = 6,
    mu = 7;
  var gu = 300,
    Yr = 301,
    Ws = 302,
    jc = 303,
    Kc = 304,
    gr = 1e3,
    Ti = 1001,
    Mc = 1002,
    xn = 1003,
    ip = 1004;
  var ia = 1005;
  var Ne = 1006,
    Jc = 1007;
  var Qi = 1008;
  var Ln = 1009,
    vu = 1010,
    xu = 1011,
    Xs = 1012,
    Zc = 1013,
    vi = 1014,
    ti = 1015,
    qn = 1016,
    Qc = 1017,
    tl = 1018,
    jr = 1020,
    yu = 35902,
    _u = 35899,
    bu = 1021,
    Mu = 1022,
    xi = 1023,
    Yi = 1026,
    tr = 1027,
    el = 1028,
    nl = 1029,
    Sr = 1030,
    il = 1031;
  var rl = 1033,
    ra = 33776,
    sa = 33777,
    oa = 33778,
    aa = 33779,
    sl = 35840,
    ol = 35841,
    al = 35842,
    cl = 35843,
    ll = 36196,
    hl = 37492,
    ul = 37496,
    dl = 37488,
    fl = 37489,
    ca = 37490,
    pl = 37491,
    ml = 37808,
    gl = 37809,
    vl = 37810,
    xl = 37811,
    yl = 37812,
    _l = 37813,
    bl = 37814,
    Ml = 37815,
    Sl = 37816,
    El = 37817,
    wl = 37818,
    Tl = 37819,
    Al = 37820,
    Rl = 37821,
    Cl = 36492,
    Il = 36494,
    Pl = 36495,
    Ll = 36283,
    Dl = 36284,
    la = 36285,
    Nl = 36286;
  var wo = 2300,
    Sc = 2301,
    fc = 2302,
    Xh = 2303,
    qh = 2400,
    $h = 2401,
    Yh = 2402;
  var rp = 3200;
  var Fl = 0,
    sp = 1,
    er = "",
    Pe = "srgb",
    zr = "srgb-linear",
    To = "linear",
    Te = "srgb";
  var pc = 7680;
  var op = 519,
    ap = 512,
    cp = 513,
    lp = 514,
    Su = 515,
    hp = 516,
    up = 517,
    Eu = 518,
    wu = 519,
    Tu = 35044;
  var Au = "300 es",
    Kn = 2e3,
    Cs = 2001;
  function Y0(n) {
    for (let t = n.length - 1; t >= 0; --t) if (n[t] >= 65535) return !0;
    return !1;
  }
  function j0(n) {
    return ArrayBuffer.isView(n) && !(n instanceof DataView);
  }
  function Ao(n) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", n);
  }
  function dp() {
    let n = Ao("canvas");
    return ((n.style.display = "block"), n);
  }
  var Jd = {},
    Is = null;
  function Ro(...n) {
    let t = "THREE." + n.shift();
    Is ? Is("log", t, ...n) : console.log(t, ...n);
  }
  function fp(n) {
    let t = n[0];
    if (typeof t == "string" && t.startsWith("TSL:")) {
      let e = n[1];
      e && e.isStackTrace
        ? (n[0] += " " + e.getLocation())
        : (n[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.');
    }
    return n;
  }
  function Vt(...n) {
    n = fp(n);
    let t = "THREE." + n.shift();
    if (Is) Is("warn", t, ...n);
    else {
      let e = n[0];
      e && e.isStackTrace ? console.warn(e.getError(t)) : console.warn(t, ...n);
    }
  }
  function qt(...n) {
    n = fp(n);
    let t = "THREE." + n.shift();
    if (Is) Is("error", t, ...n);
    else {
      let e = n[0];
      e && e.isStackTrace ? console.error(e.getError(t)) : console.error(t, ...n);
    }
  }
  function Mo(...n) {
    let t = n.join(" ");
    t in Jd || ((Jd[t] = !0), Vt(...n));
  }
  function pp(n, t, e) {
    return new Promise(function (i, r) {
      function s() {
        switch (n.clientWaitSync(t, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
          case n.WAIT_FAILED:
            r();
            break;
          case n.TIMEOUT_EXPIRED:
            setTimeout(s, e);
            break;
          default:
            i();
        }
      }
      setTimeout(s, e);
    });
  }
  var mp = { [mc]: mc, [vc]: _c, [xc]: xc, [Rs]: yc, [gc]: gc, [_c]: vc, [bc]: bc, [yc]: Rs },
    Ai = class {
      addEventListener(t, e) {
        this._listeners === void 0 && (this._listeners = {});
        let i = this._listeners;
        (i[t] === void 0 && (i[t] = []), i[t].indexOf(e) === -1 && i[t].push(e));
      }
      hasEventListener(t, e) {
        let i = this._listeners;
        return i === void 0 ? !1 : i[t] !== void 0 && i[t].indexOf(e) !== -1;
      }
      removeEventListener(t, e) {
        let i = this._listeners;
        if (i === void 0) return;
        let r = i[t];
        if (r !== void 0) {
          let s = r.indexOf(e);
          s !== -1 && r.splice(s, 1);
        }
      }
      dispatchEvent(t) {
        let e = this._listeners;
        if (e === void 0) return;
        let i = e[t.type];
        if (i !== void 0) {
          t.target = this;
          let r = i.slice(0);
          for (let s = 0, o = r.length; s < o; s++) r[s].call(this, t);
          t.target = null;
        }
      }
    },
    An = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "0a",
      "0b",
      "0c",
      "0d",
      "0e",
      "0f",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "1a",
      "1b",
      "1c",
      "1d",
      "1e",
      "1f",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "2a",
      "2b",
      "2c",
      "2d",
      "2e",
      "2f",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "3a",
      "3b",
      "3c",
      "3d",
      "3e",
      "3f",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "4a",
      "4b",
      "4c",
      "4d",
      "4e",
      "4f",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "5a",
      "5b",
      "5c",
      "5d",
      "5e",
      "5f",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "6a",
      "6b",
      "6c",
      "6d",
      "6e",
      "6f",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "78",
      "79",
      "7a",
      "7b",
      "7c",
      "7d",
      "7e",
      "7f",
      "80",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "87",
      "88",
      "89",
      "8a",
      "8b",
      "8c",
      "8d",
      "8e",
      "8f",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
      "9a",
      "9b",
      "9c",
      "9d",
      "9e",
      "9f",
      "a0",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "aa",
      "ab",
      "ac",
      "ad",
      "ae",
      "af",
      "b0",
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
      "b6",
      "b7",
      "b8",
      "b9",
      "ba",
      "bb",
      "bc",
      "bd",
      "be",
      "bf",
      "c0",
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7",
      "c8",
      "c9",
      "ca",
      "cb",
      "cc",
      "cd",
      "ce",
      "cf",
      "d0",
      "d1",
      "d2",
      "d3",
      "d4",
      "d5",
      "d6",
      "d7",
      "d8",
      "d9",
      "da",
      "db",
      "dc",
      "dd",
      "de",
      "df",
      "e0",
      "e1",
      "e2",
      "e3",
      "e4",
      "e5",
      "e6",
      "e7",
      "e8",
      "e9",
      "ea",
      "eb",
      "ec",
      "ed",
      "ee",
      "ef",
      "f0",
      "f1",
      "f2",
      "f3",
      "f4",
      "f5",
      "f6",
      "f7",
      "f8",
      "f9",
      "fa",
      "fb",
      "fc",
      "fd",
      "fe",
      "ff",
    ];
  var yh = Math.PI / 180,
    Ec = 180 / Math.PI;
  function Er() {
    let n = (Math.random() * 4294967295) | 0,
      t = (Math.random() * 4294967295) | 0,
      e = (Math.random() * 4294967295) | 0,
      i = (Math.random() * 4294967295) | 0;
    return (
      An[n & 255] +
      An[(n >> 8) & 255] +
      An[(n >> 16) & 255] +
      An[(n >> 24) & 255] +
      "-" +
      An[t & 255] +
      An[(t >> 8) & 255] +
      "-" +
      An[((t >> 16) & 15) | 64] +
      An[(t >> 24) & 255] +
      "-" +
      An[(e & 63) | 128] +
      An[(e >> 8) & 255] +
      "-" +
      An[(e >> 16) & 255] +
      An[(e >> 24) & 255] +
      An[i & 255] +
      An[(i >> 8) & 255] +
      An[(i >> 16) & 255] +
      An[(i >> 24) & 255]
    ).toLowerCase();
  }
  function ce(n, t, e) {
    return Math.max(t, Math.min(e, n));
  }
  function K0(n, t) {
    return ((n % t) + t) % t;
  }
  function _h(n, t, e) {
    return (1 - e) * n + e * t;
  }
  function gp(n) {
    return Math.pow(2, Math.floor(Math.log(n) / Math.LN2));
  }
  function Ul(n) {
    switch (n.constructor) {
      case Uint32Array:
        return 4294967295;
      case Uint16Array:
        return 65535;
      case Uint8Array:
      case Uint8ClampedArray:
        return 255;
      case Int32Array:
        return 2147483647;
      case Int16Array:
        return 32767;
      case Int8Array:
        return 127;
      default:
        return;
    }
  }
  function vp(n, t) {
    if (t.constructor === Float32Array) return n;
    let e = Ul(t);
    if (e === void 0) throw new Error("THREE.MathUtils: Invalid component type.");
    return Math.max(n / e, -1);
  }
  function xp(n, t) {
    if (t.constructor === Float32Array) return n;
    let e = Ul(t);
    if (e === void 0) throw new Error("THREE.MathUtils: Invalid component type.");
    return Math.round(n * e);
  }
  var Du = class Du {
    constructor(t = 0, e = 0) {
      ((this.x = t), (this.y = e));
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return ((this.x = t), (this.y = e), this);
    }
    setScalar(t) {
      return ((this.x = t), (this.y = t), this);
    }
    setX(t) {
      return ((this.x = t), this);
    }
    setY(t) {
      return ((this.y = t), this);
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("THREE.Vector2: index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("THREE.Vector2: index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return ((this.x = t.x), (this.y = t.y), this);
    }
    add(t) {
      return ((this.x += t.x), (this.y += t.y), this);
    }
    addScalar(t) {
      return ((this.x += t), (this.y += t), this);
    }
    addVectors(t, e) {
      return ((this.x = t.x + e.x), (this.y = t.y + e.y), this);
    }
    addScaledVector(t, e) {
      return ((this.x += t.x * e), (this.y += t.y * e), this);
    }
    sub(t) {
      return ((this.x -= t.x), (this.y -= t.y), this);
    }
    subScalar(t) {
      return ((this.x -= t), (this.y -= t), this);
    }
    subVectors(t, e) {
      return ((this.x = t.x - e.x), (this.y = t.y - e.y), this);
    }
    multiply(t) {
      return ((this.x *= t.x), (this.y *= t.y), this);
    }
    multiplyScalar(t) {
      return ((this.x *= t), (this.y *= t), this);
    }
    divide(t) {
      return ((this.x /= t.x), (this.y /= t.y), this);
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      let e = this.x,
        i = this.y,
        r = t.elements;
      return ((this.x = r[0] * e + r[3] * i + r[6]), (this.y = r[1] * e + r[4] * i + r[7]), this);
    }
    min(t) {
      return ((this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this);
    }
    max(t) {
      return ((this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this);
    }
    clamp(t, e) {
      return ((this.x = ce(this.x, t.x, e.x)), (this.y = ce(this.y, t.y, e.y)), this);
    }
    clampScalar(t, e) {
      return ((this.x = ce(this.x, t, e)), (this.y = ce(this.y, t, e)), this);
    }
    clampLength(t, e) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(ce(i, t, e));
    }
    floor() {
      return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
    }
    ceil() {
      return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
    }
    round() {
      return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
    }
    roundToZero() {
      return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), this);
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(t) {
      let e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      let i = this.dot(t) / e;
      return Math.acos(ce(i, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      let e = this.x - t.x,
        i = this.y - t.y;
      return e * e + i * i;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return ((this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this);
    }
    lerpVectors(t, e, i) {
      return ((this.x = t.x + (e.x - t.x) * i), (this.y = t.y + (e.y - t.y) * i), this);
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return ((this.x = t[e]), (this.y = t[e + 1]), this);
    }
    toArray(t = [], e = 0) {
      return ((t[e] = this.x), (t[e + 1] = this.y), t);
    }
    fromBufferAttribute(t, e) {
      return ((this.x = t.getX(e)), (this.y = t.getY(e)), this);
    }
    rotateAround(t, e) {
      let i = Math.cos(e),
        r = Math.sin(e),
        s = this.x - t.x,
        o = this.y - t.y;
      return ((this.x = s * i - o * r + t.x), (this.y = s * r + o * i + t.y), this);
    }
    random() {
      return ((this.x = Math.random()), (this.y = Math.random()), this);
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y);
    }
  };
  Du.prototype.isVector2 = !0;
  var st = Du,
    qe = class {
      constructor(t = 0, e = 0, i = 0, r = 1) {
        ((this.isQuaternion = !0), (this._x = t), (this._y = e), (this._z = i), (this._w = r));
      }
      static slerpFlat(t, e, i, r, s, o, a) {
        let c = i[r + 0],
          l = i[r + 1],
          h = i[r + 2],
          u = i[r + 3],
          d = s[o + 0],
          f = s[o + 1],
          p = s[o + 2],
          x = s[o + 3];
        if (u !== x || c !== d || l !== f || h !== p) {
          let g = c * d + l * f + h * p + u * x;
          g < 0 && ((d = -d), (f = -f), (p = -p), (x = -x), (g = -g));
          let m = 1 - a;
          if (g < 0.9995) {
            let y = Math.acos(g),
              E = Math.sin(y);
            ((m = Math.sin(m * y) / E),
              (a = Math.sin(a * y) / E),
              (c = c * m + d * a),
              (l = l * m + f * a),
              (h = h * m + p * a),
              (u = u * m + x * a));
          } else {
            ((c = c * m + d * a), (l = l * m + f * a), (h = h * m + p * a), (u = u * m + x * a));
            let y = 1 / Math.sqrt(c * c + l * l + h * h + u * u);
            ((c *= y), (l *= y), (h *= y), (u *= y));
          }
        }
        ((t[e] = c), (t[e + 1] = l), (t[e + 2] = h), (t[e + 3] = u));
      }
      static multiplyQuaternionsFlat(t, e, i, r, s, o) {
        let a = i[r],
          c = i[r + 1],
          l = i[r + 2],
          h = i[r + 3],
          u = s[o],
          d = s[o + 1],
          f = s[o + 2],
          p = s[o + 3];
        return (
          (t[e] = a * p + h * u + c * f - l * d),
          (t[e + 1] = c * p + h * d + l * u - a * f),
          (t[e + 2] = l * p + h * f + a * d - c * u),
          (t[e + 3] = h * p - a * u - c * d - l * f),
          t
        );
      }
      get x() {
        return this._x;
      }
      set x(t) {
        ((this._x = t), this._onChangeCallback());
      }
      get y() {
        return this._y;
      }
      set y(t) {
        ((this._y = t), this._onChangeCallback());
      }
      get z() {
        return this._z;
      }
      set z(t) {
        ((this._z = t), this._onChangeCallback());
      }
      get w() {
        return this._w;
      }
      set w(t) {
        ((this._w = t), this._onChangeCallback());
      }
      set(t, e, i, r) {
        return ((this._x = t), (this._y = e), (this._z = i), (this._w = r), this._onChangeCallback(), this);
      }
      clone() {
        return new this.constructor(this._x, this._y, this._z, this._w);
      }
      copy(t) {
        return ((this._x = t.x), (this._y = t.y), (this._z = t.z), (this._w = t.w), this._onChangeCallback(), this);
      }
      setFromEuler(t, e = !0) {
        let i = t._x,
          r = t._y,
          s = t._z,
          o = t._order,
          a = Math.cos,
          c = Math.sin,
          l = a(i / 2),
          h = a(r / 2),
          u = a(s / 2),
          d = c(i / 2),
          f = c(r / 2),
          p = c(s / 2);
        switch (o) {
          case "XYZ":
            ((this._x = d * h * u + l * f * p),
              (this._y = l * f * u - d * h * p),
              (this._z = l * h * p + d * f * u),
              (this._w = l * h * u - d * f * p));
            break;
          case "YXZ":
            ((this._x = d * h * u + l * f * p),
              (this._y = l * f * u - d * h * p),
              (this._z = l * h * p - d * f * u),
              (this._w = l * h * u + d * f * p));
            break;
          case "ZXY":
            ((this._x = d * h * u - l * f * p),
              (this._y = l * f * u + d * h * p),
              (this._z = l * h * p + d * f * u),
              (this._w = l * h * u - d * f * p));
            break;
          case "ZYX":
            ((this._x = d * h * u - l * f * p),
              (this._y = l * f * u + d * h * p),
              (this._z = l * h * p - d * f * u),
              (this._w = l * h * u + d * f * p));
            break;
          case "YZX":
            ((this._x = d * h * u + l * f * p),
              (this._y = l * f * u + d * h * p),
              (this._z = l * h * p - d * f * u),
              (this._w = l * h * u - d * f * p));
            break;
          case "XZY":
            ((this._x = d * h * u - l * f * p),
              (this._y = l * f * u - d * h * p),
              (this._z = l * h * p + d * f * u),
              (this._w = l * h * u + d * f * p));
            break;
          default:
            Vt("Quaternion: .setFromEuler() encountered an unknown order: " + o);
        }
        return (e === !0 && this._onChangeCallback(), this);
      }
      setFromAxisAngle(t, e) {
        let i = e / 2,
          r = Math.sin(i);
        return (
          (this._x = t.x * r),
          (this._y = t.y * r),
          (this._z = t.z * r),
          (this._w = Math.cos(i)),
          this._onChangeCallback(),
          this
        );
      }
      setFromRotationMatrix(t) {
        let e = t.elements,
          i = e[0],
          r = e[4],
          s = e[8],
          o = e[1],
          a = e[5],
          c = e[9],
          l = e[2],
          h = e[6],
          u = e[10],
          d = i + a + u;
        if (d > 0) {
          let f = 0.5 / Math.sqrt(d + 1);
          ((this._w = 0.25 / f), (this._x = (h - c) * f), (this._y = (s - l) * f), (this._z = (o - r) * f));
        } else if (i > a && i > u) {
          let f = 2 * Math.sqrt(1 + i - a - u);
          ((this._w = (h - c) / f), (this._x = 0.25 * f), (this._y = (r + o) / f), (this._z = (s + l) / f));
        } else if (a > u) {
          let f = 2 * Math.sqrt(1 + a - i - u);
          ((this._w = (s - l) / f), (this._x = (r + o) / f), (this._y = 0.25 * f), (this._z = (c + h) / f));
        } else {
          let f = 2 * Math.sqrt(1 + u - i - a);
          ((this._w = (o - r) / f), (this._x = (s + l) / f), (this._y = (c + h) / f), (this._z = 0.25 * f));
        }
        return (this._onChangeCallback(), this);
      }
      setFromUnitVectors(t, e) {
        let i = t.dot(e) + 1;
        return (
          i < 1e-8
            ? ((i = 0),
              Math.abs(t.x) > Math.abs(t.z)
                ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = i))
                : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = i)))
            : ((this._x = t.y * e.z - t.z * e.y),
              (this._y = t.z * e.x - t.x * e.z),
              (this._z = t.x * e.y - t.y * e.x),
              (this._w = i)),
          this.normalize()
        );
      }
      angleTo(t) {
        return 2 * Math.acos(Math.abs(ce(this.dot(t), -1, 1)));
      }
      rotateTowards(t, e) {
        let i = this.angleTo(t);
        if (i === 0) return this;
        let r = Math.min(1, e / i);
        return (this.slerp(t, r), this);
      }
      identity() {
        return this.set(0, 0, 0, 1);
      }
      invert() {
        return this.conjugate();
      }
      conjugate() {
        return ((this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this);
      }
      dot(t) {
        return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
      }
      lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
      }
      length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
      }
      normalize() {
        let t = this.length();
        return (
          t === 0
            ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
            : ((t = 1 / t),
              (this._x = this._x * t),
              (this._y = this._y * t),
              (this._z = this._z * t),
              (this._w = this._w * t)),
          this._onChangeCallback(),
          this
        );
      }
      multiply(t) {
        return this.multiplyQuaternions(this, t);
      }
      premultiply(t) {
        return this.multiplyQuaternions(t, this);
      }
      multiplyQuaternions(t, e) {
        let i = t._x,
          r = t._y,
          s = t._z,
          o = t._w,
          a = e._x,
          c = e._y,
          l = e._z,
          h = e._w;
        return (
          (this._x = i * h + o * a + r * l - s * c),
          (this._y = r * h + o * c + s * a - i * l),
          (this._z = s * h + o * l + i * c - r * a),
          (this._w = o * h - i * a - r * c - s * l),
          this._onChangeCallback(),
          this
        );
      }
      slerp(t, e) {
        let i = t._x,
          r = t._y,
          s = t._z,
          o = t._w,
          a = this.dot(t);
        a < 0 && ((i = -i), (r = -r), (s = -s), (o = -o), (a = -a));
        let c = 1 - e;
        if (a < 0.9995) {
          let l = Math.acos(a),
            h = Math.sin(l);
          ((c = Math.sin(c * l) / h),
            (e = Math.sin(e * l) / h),
            (this._x = this._x * c + i * e),
            (this._y = this._y * c + r * e),
            (this._z = this._z * c + s * e),
            (this._w = this._w * c + o * e),
            this._onChangeCallback());
        } else
          ((this._x = this._x * c + i * e),
            (this._y = this._y * c + r * e),
            (this._z = this._z * c + s * e),
            (this._w = this._w * c + o * e),
            this.normalize());
        return this;
      }
      slerpQuaternions(t, e, i) {
        return this.copy(t).slerp(e, i);
      }
      random() {
        let t = 2 * Math.PI * Math.random(),
          e = 2 * Math.PI * Math.random(),
          i = Math.random(),
          r = Math.sqrt(1 - i),
          s = Math.sqrt(i);
        return this.set(r * Math.sin(t), r * Math.cos(t), s * Math.sin(e), s * Math.cos(e));
      }
      equals(t) {
        return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
      }
      fromArray(t, e = 0) {
        return (
          (this._x = t[e]),
          (this._y = t[e + 1]),
          (this._z = t[e + 2]),
          (this._w = t[e + 3]),
          this._onChangeCallback(),
          this
        );
      }
      toArray(t = [], e = 0) {
        return ((t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._w), t);
      }
      fromBufferAttribute(t, e) {
        return (
          (this._x = t.getX(e)),
          (this._y = t.getY(e)),
          (this._z = t.getZ(e)),
          (this._w = t.getW(e)),
          this._onChangeCallback(),
          this
        );
      }
      toJSON() {
        return this.toArray();
      }
      _onChange(t) {
        return ((this._onChangeCallback = t), this);
      }
      _onChangeCallback() {}
      *[Symbol.iterator]() {
        (yield this._x, yield this._y, yield this._z, yield this._w);
      }
    },
    Nu = class Nu {
      constructor(t = 0, e = 0, i = 0) {
        ((this.x = t), (this.y = e), (this.z = i));
      }
      set(t, e, i) {
        return (i === void 0 && (i = this.z), (this.x = t), (this.y = e), (this.z = i), this);
      }
      setScalar(t) {
        return ((this.x = t), (this.y = t), (this.z = t), this);
      }
      setX(t) {
        return ((this.x = t), this);
      }
      setY(t) {
        return ((this.y = t), this);
      }
      setZ(t) {
        return ((this.z = t), this);
      }
      setComponent(t, e) {
        switch (t) {
          case 0:
            this.x = e;
            break;
          case 1:
            this.y = e;
            break;
          case 2:
            this.z = e;
            break;
          default:
            throw new Error("THREE.Vector3: index is out of range: " + t);
        }
        return this;
      }
      getComponent(t) {
        switch (t) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          default:
            throw new Error("THREE.Vector3: index is out of range: " + t);
        }
      }
      clone() {
        return new this.constructor(this.x, this.y, this.z);
      }
      copy(t) {
        return ((this.x = t.x), (this.y = t.y), (this.z = t.z), this);
      }
      add(t) {
        return ((this.x += t.x), (this.y += t.y), (this.z += t.z), this);
      }
      addScalar(t) {
        return ((this.x += t), (this.y += t), (this.z += t), this);
      }
      addVectors(t, e) {
        return ((this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this);
      }
      addScaledVector(t, e) {
        return ((this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this);
      }
      sub(t) {
        return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this);
      }
      subScalar(t) {
        return ((this.x -= t), (this.y -= t), (this.z -= t), this);
      }
      subVectors(t, e) {
        return ((this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this);
      }
      multiply(t) {
        return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this);
      }
      multiplyScalar(t) {
        return ((this.x *= t), (this.y *= t), (this.z *= t), this);
      }
      multiplyVectors(t, e) {
        return ((this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this);
      }
      applyEuler(t) {
        return this.applyQuaternion(Zd.setFromEuler(t));
      }
      applyAxisAngle(t, e) {
        return this.applyQuaternion(Zd.setFromAxisAngle(t, e));
      }
      applyMatrix3(t) {
        let e = this.x,
          i = this.y,
          r = this.z,
          s = t.elements;
        return (
          (this.x = s[0] * e + s[3] * i + s[6] * r),
          (this.y = s[1] * e + s[4] * i + s[7] * r),
          (this.z = s[2] * e + s[5] * i + s[8] * r),
          this
        );
      }
      applyNormalMatrix(t) {
        return this.applyMatrix3(t).normalize();
      }
      applyMatrix4(t) {
        let e = this.x,
          i = this.y,
          r = this.z,
          s = t.elements,
          o = 1 / (s[3] * e + s[7] * i + s[11] * r + s[15]);
        return (
          (this.x = (s[0] * e + s[4] * i + s[8] * r + s[12]) * o),
          (this.y = (s[1] * e + s[5] * i + s[9] * r + s[13]) * o),
          (this.z = (s[2] * e + s[6] * i + s[10] * r + s[14]) * o),
          this
        );
      }
      applyQuaternion(t) {
        let e = this.x,
          i = this.y,
          r = this.z,
          s = t.x,
          o = t.y,
          a = t.z,
          c = t.w,
          l = 2 * (o * r - a * i),
          h = 2 * (a * e - s * r),
          u = 2 * (s * i - o * e);
        return (
          (this.x = e + c * l + o * u - a * h),
          (this.y = i + c * h + a * l - s * u),
          (this.z = r + c * u + s * h - o * l),
          this
        );
      }
      project(t) {
        return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
      }
      unproject(t) {
        return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
      }
      transformDirection(t) {
        let e = this.x,
          i = this.y,
          r = this.z,
          s = t.elements;
        return (
          (this.x = s[0] * e + s[4] * i + s[8] * r),
          (this.y = s[1] * e + s[5] * i + s[9] * r),
          (this.z = s[2] * e + s[6] * i + s[10] * r),
          this.normalize()
        );
      }
      divide(t) {
        return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this);
      }
      divideScalar(t) {
        return this.multiplyScalar(1 / t);
      }
      min(t) {
        return (
          (this.x = Math.min(this.x, t.x)),
          (this.y = Math.min(this.y, t.y)),
          (this.z = Math.min(this.z, t.z)),
          this
        );
      }
      max(t) {
        return (
          (this.x = Math.max(this.x, t.x)),
          (this.y = Math.max(this.y, t.y)),
          (this.z = Math.max(this.z, t.z)),
          this
        );
      }
      clamp(t, e) {
        return (
          (this.x = ce(this.x, t.x, e.x)),
          (this.y = ce(this.y, t.y, e.y)),
          (this.z = ce(this.z, t.z, e.z)),
          this
        );
      }
      clampScalar(t, e) {
        return ((this.x = ce(this.x, t, e)), (this.y = ce(this.y, t, e)), (this.z = ce(this.z, t, e)), this);
      }
      clampLength(t, e) {
        let i = this.length();
        return this.divideScalar(i || 1).multiplyScalar(ce(i, t, e));
      }
      floor() {
        return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), this);
      }
      ceil() {
        return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this);
      }
      round() {
        return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), this);
      }
      roundToZero() {
        return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), (this.z = Math.trunc(this.z)), this);
      }
      negate() {
        return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
      }
      dot(t) {
        return this.x * t.x + this.y * t.y + this.z * t.z;
      }
      lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      }
      length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
      manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
      }
      normalize() {
        return this.divideScalar(this.length() || 1);
      }
      setLength(t) {
        return this.normalize().multiplyScalar(t);
      }
      lerp(t, e) {
        return ((this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), (this.z += (t.z - this.z) * e), this);
      }
      lerpVectors(t, e, i) {
        return (
          (this.x = t.x + (e.x - t.x) * i),
          (this.y = t.y + (e.y - t.y) * i),
          (this.z = t.z + (e.z - t.z) * i),
          this
        );
      }
      cross(t) {
        return this.crossVectors(this, t);
      }
      crossVectors(t, e) {
        let i = t.x,
          r = t.y,
          s = t.z,
          o = e.x,
          a = e.y,
          c = e.z;
        return ((this.x = r * c - s * a), (this.y = s * o - i * c), (this.z = i * a - r * o), this);
      }
      projectOnVector(t) {
        let e = t.lengthSq();
        if (e === 0) return this.set(0, 0, 0);
        let i = t.dot(this) / e;
        return this.copy(t).multiplyScalar(i);
      }
      projectOnPlane(t) {
        return (bh.copy(this).projectOnVector(t), this.sub(bh));
      }
      reflect(t) {
        return this.sub(bh.copy(t).multiplyScalar(2 * this.dot(t)));
      }
      angleTo(t) {
        let e = Math.sqrt(this.lengthSq() * t.lengthSq());
        if (e === 0) return Math.PI / 2;
        let i = this.dot(t) / e;
        return Math.acos(ce(i, -1, 1));
      }
      distanceTo(t) {
        return Math.sqrt(this.distanceToSquared(t));
      }
      distanceToSquared(t) {
        let e = this.x - t.x,
          i = this.y - t.y,
          r = this.z - t.z;
        return e * e + i * i + r * r;
      }
      manhattanDistanceTo(t) {
        return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
      }
      setFromSpherical(t) {
        return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
      }
      setFromSphericalCoords(t, e, i) {
        let r = Math.sin(e) * t;
        return ((this.x = r * Math.sin(i)), (this.y = Math.cos(e) * t), (this.z = r * Math.cos(i)), this);
      }
      setFromCylindrical(t) {
        return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
      }
      setFromCylindricalCoords(t, e, i) {
        return ((this.x = t * Math.sin(e)), (this.y = i), (this.z = t * Math.cos(e)), this);
      }
      setFromMatrixPosition(t) {
        let e = t.elements;
        return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this);
      }
      setFromMatrixScale(t) {
        let e = this.setFromMatrixColumn(t, 0).length(),
          i = this.setFromMatrixColumn(t, 1).length(),
          r = this.setFromMatrixColumn(t, 2).length();
        return ((this.x = e), (this.y = i), (this.z = r), this);
      }
      setFromMatrixColumn(t, e) {
        return this.fromArray(t.elements, e * 4);
      }
      setFromMatrix3Column(t, e) {
        return this.fromArray(t.elements, e * 3);
      }
      setFromEuler(t) {
        return ((this.x = t._x), (this.y = t._y), (this.z = t._z), this);
      }
      setFromColor(t) {
        return ((this.x = t.r), (this.y = t.g), (this.z = t.b), this);
      }
      equals(t) {
        return t.x === this.x && t.y === this.y && t.z === this.z;
      }
      fromArray(t, e = 0) {
        return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this);
      }
      toArray(t = [], e = 0) {
        return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t);
      }
      fromBufferAttribute(t, e) {
        return ((this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), this);
      }
      random() {
        return ((this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this);
      }
      randomDirection() {
        let t = Math.random() * Math.PI * 2,
          e = Math.random() * 2 - 1,
          i = Math.sqrt(1 - e * e);
        return ((this.x = i * Math.cos(t)), (this.y = e), (this.z = i * Math.sin(t)), this);
      }
      *[Symbol.iterator]() {
        (yield this.x, yield this.y, yield this.z);
      }
    };
  Nu.prototype.isVector3 = !0;
  var R = Nu,
    bh = new R(),
    Zd = new qe(),
    Fu = class Fu {
      constructor(t, e, i, r, s, o, a, c, l) {
        ((this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]), t !== void 0 && this.set(t, e, i, r, s, o, a, c, l));
      }
      set(t, e, i, r, s, o, a, c, l) {
        let h = this.elements;
        return (
          (h[0] = t),
          (h[1] = r),
          (h[2] = a),
          (h[3] = e),
          (h[4] = s),
          (h[5] = c),
          (h[6] = i),
          (h[7] = o),
          (h[8] = l),
          this
        );
      }
      identity() {
        return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
      }
      copy(t) {
        let e = this.elements,
          i = t.elements;
        return (
          (e[0] = i[0]),
          (e[1] = i[1]),
          (e[2] = i[2]),
          (e[3] = i[3]),
          (e[4] = i[4]),
          (e[5] = i[5]),
          (e[6] = i[6]),
          (e[7] = i[7]),
          (e[8] = i[8]),
          this
        );
      }
      extractBasis(t, e, i) {
        return (
          t.setFromMatrix3Column(this, 0),
          e.setFromMatrix3Column(this, 1),
          i.setFromMatrix3Column(this, 2),
          this
        );
      }
      setFromMatrix4(t) {
        let e = t.elements;
        return (this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this);
      }
      multiply(t) {
        return this.multiplyMatrices(this, t);
      }
      premultiply(t) {
        return this.multiplyMatrices(t, this);
      }
      multiplyMatrices(t, e) {
        let i = t.elements,
          r = e.elements,
          s = this.elements,
          o = i[0],
          a = i[3],
          c = i[6],
          l = i[1],
          h = i[4],
          u = i[7],
          d = i[2],
          f = i[5],
          p = i[8],
          x = r[0],
          g = r[3],
          m = r[6],
          y = r[1],
          E = r[4],
          _ = r[7],
          T = r[2],
          w = r[5],
          v = r[8];
        return (
          (s[0] = o * x + a * y + c * T),
          (s[3] = o * g + a * E + c * w),
          (s[6] = o * m + a * _ + c * v),
          (s[1] = l * x + h * y + u * T),
          (s[4] = l * g + h * E + u * w),
          (s[7] = l * m + h * _ + u * v),
          (s[2] = d * x + f * y + p * T),
          (s[5] = d * g + f * E + p * w),
          (s[8] = d * m + f * _ + p * v),
          this
        );
      }
      multiplyScalar(t) {
        let e = this.elements;
        return (
          (e[0] *= t),
          (e[3] *= t),
          (e[6] *= t),
          (e[1] *= t),
          (e[4] *= t),
          (e[7] *= t),
          (e[2] *= t),
          (e[5] *= t),
          (e[8] *= t),
          this
        );
      }
      determinant() {
        let t = this.elements,
          e = t[0],
          i = t[1],
          r = t[2],
          s = t[3],
          o = t[4],
          a = t[5],
          c = t[6],
          l = t[7],
          h = t[8];
        return e * o * h - e * a * l - i * s * h + i * a * c + r * s * l - r * o * c;
      }
      invert() {
        let t = this.elements,
          e = t[0],
          i = t[1],
          r = t[2],
          s = t[3],
          o = t[4],
          a = t[5],
          c = t[6],
          l = t[7],
          h = t[8],
          u = h * o - a * l,
          d = a * c - h * s,
          f = l * s - o * c,
          p = e * u + i * d + r * f;
        if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        let x = 1 / p;
        return (
          (t[0] = u * x),
          (t[1] = (r * l - h * i) * x),
          (t[2] = (a * i - r * o) * x),
          (t[3] = d * x),
          (t[4] = (h * e - r * c) * x),
          (t[5] = (r * s - a * e) * x),
          (t[6] = f * x),
          (t[7] = (i * c - l * e) * x),
          (t[8] = (o * e - i * s) * x),
          this
        );
      }
      transpose() {
        let t,
          e = this.elements;
        return (
          (t = e[1]),
          (e[1] = e[3]),
          (e[3] = t),
          (t = e[2]),
          (e[2] = e[6]),
          (e[6] = t),
          (t = e[5]),
          (e[5] = e[7]),
          (e[7] = t),
          this
        );
      }
      getNormalMatrix(t) {
        return this.setFromMatrix4(t).invert().transpose();
      }
      transposeIntoArray(t) {
        let e = this.elements;
        return (
          (t[0] = e[0]),
          (t[1] = e[3]),
          (t[2] = e[6]),
          (t[3] = e[1]),
          (t[4] = e[4]),
          (t[5] = e[7]),
          (t[6] = e[2]),
          (t[7] = e[5]),
          (t[8] = e[8]),
          this
        );
      }
      setUvTransform(t, e, i, r, s, o, a) {
        let c = Math.cos(s),
          l = Math.sin(s);
        return (
          this.set(i * c, i * l, -i * (c * o + l * a) + o + t, -r * l, r * c, -r * (-l * o + c * a) + a + e, 0, 0, 1),
          this
        );
      }
      scale(t, e) {
        return (
          Mo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),
          this.premultiply(Mh.makeScale(t, e)),
          this
        );
      }
      rotate(t) {
        return (
          Mo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),
          this.premultiply(Mh.makeRotation(-t)),
          this
        );
      }
      translate(t, e) {
        return (
          Mo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),
          this.premultiply(Mh.makeTranslation(t, e)),
          this
        );
      }
      makeTranslation(t, e) {
        return (t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this);
      }
      makeRotation(t) {
        let e = Math.cos(t),
          i = Math.sin(t);
        return (this.set(e, -i, 0, i, e, 0, 0, 0, 1), this);
      }
      makeScale(t, e) {
        return (this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this);
      }
      equals(t) {
        let e = this.elements,
          i = t.elements;
        for (let r = 0; r < 9; r++) if (e[r] !== i[r]) return !1;
        return !0;
      }
      fromArray(t, e = 0) {
        for (let i = 0; i < 9; i++) this.elements[i] = t[i + e];
        return this;
      }
      toArray(t = [], e = 0) {
        let i = this.elements;
        return (
          (t[e] = i[0]),
          (t[e + 1] = i[1]),
          (t[e + 2] = i[2]),
          (t[e + 3] = i[3]),
          (t[e + 4] = i[4]),
          (t[e + 5] = i[5]),
          (t[e + 6] = i[6]),
          (t[e + 7] = i[7]),
          (t[e + 8] = i[8]),
          t
        );
      }
      clone() {
        return new this.constructor().fromArray(this.elements);
      }
    };
  Fu.prototype.isMatrix3 = !0;
  var Kt = Fu,
    Mh = new Kt(),
    Qd = new Kt().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322),
    tf = new Kt().set(
      3.2409699,
      -1.5373832,
      -0.4986108,
      -0.9692436,
      1.8759675,
      0.0415551,
      0.0556301,
      -0.203977,
      1.0569715,
    );
  function J0() {
    let n = {
        enabled: !0,
        workingColorSpace: zr,
        spaces: {},
        convert: function (r, s, o) {
          return (
            this.enabled === !1 ||
              s === o ||
              !s ||
              !o ||
              (this.spaces[s].transfer === Te && ((r.r = $i(r.r)), (r.g = $i(r.g)), (r.b = $i(r.b))),
              this.spaces[s].primaries !== this.spaces[o].primaries &&
                (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[o].fromXYZ)),
              this.spaces[o].transfer === Te && ((r.r = As(r.r)), (r.g = As(r.g)), (r.b = As(r.b)))),
            r
          );
        },
        workingToColorSpace: function (r, s) {
          return this.convert(r, this.workingColorSpace, s);
        },
        colorSpaceToWorking: function (r, s) {
          return this.convert(r, s, this.workingColorSpace);
        },
        getPrimaries: function (r) {
          return this.spaces[r].primaries;
        },
        getTransfer: function (r) {
          return r === er ? To : this.spaces[r].transfer;
        },
        getToneMappingMode: function (r) {
          return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
        },
        getLuminanceCoefficients: function (r, s = this.workingColorSpace) {
          return r.fromArray(this.spaces[s].luminanceCoefficients);
        },
        define: function (r) {
          Object.assign(this.spaces, r);
        },
        _getMatrix: function (r, s, o) {
          return r.copy(this.spaces[o].fromXYZ).multiply(this.spaces[s].toXYZ);
        },
        _getDrawingBufferColorSpace: function (r) {
          return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
        },
        _getUnpackColorSpace: function (r = this.workingColorSpace) {
          return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
        },
      },
      t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
      e = [0.2126, 0.7152, 0.0722],
      i = [0.3127, 0.329];
    return (
      n.define({
        [zr]: {
          primaries: t,
          whitePoint: i,
          transfer: To,
          toXYZ: Qd,
          fromXYZ: tf,
          luminanceCoefficients: e,
          workingColorSpaceConfig: { unpackColorSpace: Pe },
          outputColorSpaceConfig: { drawingBufferColorSpace: Pe },
        },
        [Pe]: {
          primaries: t,
          whitePoint: i,
          transfer: Te,
          toXYZ: Qd,
          fromXYZ: tf,
          luminanceCoefficients: e,
          outputColorSpaceConfig: { drawingBufferColorSpace: Pe },
        },
      }),
      n
    );
  }
  var me = J0();
  function $i(n) {
    return n < 0.04045 ? n * 0.0773993808 : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4);
  }
  function As(n) {
    return n < 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055;
  }
  var ls,
    wc = class {
      static getDataURL(t, e = "image/png") {
        if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
        let i;
        if (t instanceof HTMLCanvasElement) i = t;
        else {
          (ls === void 0 && (ls = Ao("canvas")), (ls.width = t.width), (ls.height = t.height));
          let r = ls.getContext("2d");
          (t instanceof ImageData ? r.putImageData(t, 0, 0) : r.drawImage(t, 0, 0, t.width, t.height), (i = ls));
        }
        return i.toDataURL(e);
      }
      static sRGBToLinear(t) {
        if (
          (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement) ||
          (typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement) ||
          (typeof ImageBitmap < "u" && t instanceof ImageBitmap)
        ) {
          let e = Ao("canvas");
          ((e.width = t.width), (e.height = t.height));
          let i = e.getContext("2d");
          i.drawImage(t, 0, 0, t.width, t.height);
          let r = i.getImageData(0, 0, t.width, t.height),
            s = r.data;
          for (let o = 0; o < s.length; o++) s[o] = $i(s[o] / 255) * 255;
          return (i.putImageData(r, 0, 0), e);
        } else if (t.data) {
          let e = t.data.slice(0);
          for (let i = 0; i < e.length; i++)
            e instanceof Uint8Array || e instanceof Uint8ClampedArray
              ? (e[i] = Math.floor($i(e[i] / 255) * 255))
              : (e[i] = $i(e[i]));
          return { data: e, width: t.width, height: t.height };
        } else return (Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t);
      }
    },
    Z0 = 0,
    Ps = class {
      constructor(t = null) {
        ((this.isTextureSource = !0),
          Object.defineProperty(this, "id", { value: Z0++ }),
          (this.uuid = Er()),
          (this.data = t),
          (this.dataReady = !0),
          (this.version = 0));
      }
      getSize(t) {
        let e = this.data;
        return (
          typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement
            ? t.set(e.videoWidth, e.videoHeight, 0)
            : typeof VideoFrame < "u" && e instanceof VideoFrame
              ? t.set(e.displayWidth, e.displayHeight, 0)
              : e !== null
                ? t.set(e.width || 0, e.height || 0, e.depth || 0)
                : t.set(0, 0, 0),
          t
        );
      }
      set needsUpdate(t) {
        t === !0 && this.version++;
      }
      toJSON(t) {
        let e = t === void 0 || typeof t == "string";
        if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
        let i = { uuid: this.uuid, url: "" },
          r = this.data;
        if (r !== null) {
          let s;
          if (Array.isArray(r)) {
            s = [];
            for (let o = 0, a = r.length; o < a; o++) r[o].isDataTexture ? s.push(Sh(r[o].image)) : s.push(Sh(r[o]));
          } else s = Sh(r);
          i.url = s;
        }
        return (e || (t.images[this.uuid] = i), i);
      }
    };
  function Sh(n) {
    return (typeof HTMLImageElement < "u" && n instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && n instanceof ImageBitmap)
      ? wc.getDataURL(n)
      : n.data
        ? { data: Array.from(n.data), width: n.width, height: n.height, type: n.data.constructor.name }
        : (Vt("Texture: Unable to serialize Texture."), {});
  }
  var Q0 = 0,
    Eh = new R(),
    In = class n extends Ai {
      constructor(
        t = n.DEFAULT_IMAGE,
        e = n.DEFAULT_MAPPING,
        i = Ti,
        r = Ti,
        s = Ne,
        o = Qi,
        a = xi,
        c = Ln,
        l = n.DEFAULT_ANISOTROPY,
        h = er,
      ) {
        (super(),
          (this.isTexture = !0),
          Object.defineProperty(this, "id", { value: Q0++ }),
          (this.uuid = Er()),
          (this.name = ""),
          (this.source = new Ps(t)),
          (this.mipmaps = []),
          (this.mapping = e),
          (this.channel = 0),
          (this.wrapS = i),
          (this.wrapT = r),
          (this.magFilter = s),
          (this.minFilter = o),
          (this.anisotropy = l),
          (this.format = a),
          (this.internalFormat = null),
          (this.type = c),
          (this.offset = new st(0, 0)),
          (this.repeat = new st(1, 1)),
          (this.center = new st(0, 0)),
          (this.rotation = 0),
          (this.matrixAutoUpdate = !0),
          (this.matrix = new Kt()),
          (this.generateMipmaps = !0),
          (this.mipmapsAutoUpdate = !0),
          (this.premultiplyAlpha = !1),
          (this.flipY = !0),
          (this.unpackAlignment = 4),
          (this.colorSpace = h),
          (this.userData = {}),
          (this.updateRanges = []),
          (this.version = 0),
          (this.onUpdate = null),
          (this.renderTarget = null),
          (this.isRenderTargetTexture = !1),
          (this.isArrayTexture = !!(t && t.depth && t.depth > 1)),
          (this.pmremVersion = 0),
          (this.isPMREMTexture = !1),
          (this.normalized = !1));
      }
      get width() {
        return this.source.getSize(Eh).x;
      }
      get height() {
        return this.source.getSize(Eh).y;
      }
      get depth() {
        return this.source.getSize(Eh).z;
      }
      get image() {
        return this.source.data;
      }
      set image(t) {
        this.source.data = t;
      }
      updateMatrix() {
        this.matrix.setUvTransform(
          this.offset.x,
          this.offset.y,
          this.repeat.x,
          this.repeat.y,
          this.rotation,
          this.center.x,
          this.center.y,
        );
      }
      addUpdateRange(t, e) {
        this.updateRanges.push({ start: t, count: e });
      }
      clearUpdateRanges() {
        this.updateRanges.length = 0;
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        return (
          (this.name = t.name),
          (this.source = t.source),
          (this.mipmaps = t.mipmaps.slice(0)),
          (this.mapping = t.mapping),
          (this.channel = t.channel),
          (this.wrapS = t.wrapS),
          (this.wrapT = t.wrapT),
          (this.magFilter = t.magFilter),
          (this.minFilter = t.minFilter),
          (this.anisotropy = t.anisotropy),
          (this.format = t.format),
          (this.internalFormat = t.internalFormat),
          (this.type = t.type),
          (this.normalized = t.normalized),
          this.offset.copy(t.offset),
          this.repeat.copy(t.repeat),
          this.center.copy(t.center),
          (this.rotation = t.rotation),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          this.matrix.copy(t.matrix),
          (this.generateMipmaps = t.generateMipmaps),
          (this.mipmapsAutoUpdate = t.mipmapsAutoUpdate),
          (this.premultiplyAlpha = t.premultiplyAlpha),
          (this.flipY = t.flipY),
          (this.unpackAlignment = t.unpackAlignment),
          (this.colorSpace = t.colorSpace),
          (this.renderTarget = t.renderTarget),
          (this.isRenderTargetTexture = t.isRenderTargetTexture),
          (this.isPMREMTexture = t.isPMREMTexture),
          (this.isArrayTexture = t.isArrayTexture),
          (this.userData = JSON.parse(JSON.stringify(t.userData))),
          (this.needsUpdate = !0),
          this
        );
      }
      setValues(t) {
        for (let e in t) {
          let i = t[e];
          if (i === void 0) {
            Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);
            continue;
          }
          let r = this[e];
          if (r === void 0) {
            Vt(`Texture.setValues(): property '${e}' does not exist.`);
            continue;
          }
          (r && i && r.isVector2 && i.isVector2) ||
          (r && i && r.isVector3 && i.isVector3) ||
          (r && i && r.isMatrix3 && i.isMatrix3)
            ? r.copy(i)
            : (this[e] = i);
        }
      }
      toJSON(t) {
        let e = t === void 0 || typeof t == "string";
        if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
        let i = {
          metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" },
          uuid: this.uuid,
          name: this.name,
          image: this.source.toJSON(t).uuid,
          mapping: this.mapping,
          channel: this.channel,
          repeat: [this.repeat.x, this.repeat.y],
          offset: [this.offset.x, this.offset.y],
          center: [this.center.x, this.center.y],
          rotation: this.rotation,
          wrap: [this.wrapS, this.wrapT],
          format: this.format,
          internalFormat: this.internalFormat,
          type: this.type,
          normalized: this.normalized,
          colorSpace: this.colorSpace,
          minFilter: this.minFilter,
          magFilter: this.magFilter,
          anisotropy: this.anisotropy,
          flipY: this.flipY,
          generateMipmaps: this.generateMipmaps,
          mipmapsAutoUpdate: this.mipmapsAutoUpdate,
          premultiplyAlpha: this.premultiplyAlpha,
          unpackAlignment: this.unpackAlignment,
        };
        return (
          Object.keys(this.userData).length > 0 && (i.userData = this.userData),
          e || (t.textures[this.uuid] = i),
          i
        );
      }
      dispose() {
        this.dispatchEvent({ type: "dispose" });
      }
      transformUv(t) {
        if (this.mapping !== gu) return t;
        if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
          switch (this.wrapS) {
            case gr:
              t.x = t.x - Math.floor(t.x);
              break;
            case Ti:
              t.x = t.x < 0 ? 0 : 1;
              break;
            case Mc:
              Math.abs(Math.floor(t.x) % 2) === 1 ? (t.x = Math.ceil(t.x) - t.x) : (t.x = t.x - Math.floor(t.x));
              break;
          }
        if (t.y < 0 || t.y > 1)
          switch (this.wrapT) {
            case gr:
              t.y = t.y - Math.floor(t.y);
              break;
            case Ti:
              t.y = t.y < 0 ? 0 : 1;
              break;
            case Mc:
              Math.abs(Math.floor(t.y) % 2) === 1 ? (t.y = Math.ceil(t.y) - t.y) : (t.y = t.y - Math.floor(t.y));
              break;
          }
        return (this.flipY && (t.y = 1 - t.y), t);
      }
      set needsUpdate(t) {
        t === !0 && (this.version++, (this.source.needsUpdate = !0));
      }
      set needsPMREMUpdate(t) {
        t === !0 && this.pmremVersion++;
      }
    };
  In.DEFAULT_IMAGE = null;
  In.DEFAULT_MAPPING = gu;
  In.DEFAULT_ANISOTROPY = 1;
  var Uu = class Uu {
    constructor(t = 0, e = 0, i = 0, r = 1) {
      ((this.x = t), (this.y = e), (this.z = i), (this.w = r));
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, i, r) {
      return ((this.x = t), (this.y = e), (this.z = i), (this.w = r), this);
    }
    setScalar(t) {
      return ((this.x = t), (this.y = t), (this.z = t), (this.w = t), this);
    }
    setX(t) {
      return ((this.x = t), this);
    }
    setY(t) {
      return ((this.y = t), this);
    }
    setZ(t) {
      return ((this.z = t), this);
    }
    setW(t) {
      return ((this.w = t), this);
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("THREE.Vector4: index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("THREE.Vector4: index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return ((this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = t.w !== void 0 ? t.w : 1), this);
    }
    add(t) {
      return ((this.x += t.x), (this.y += t.y), (this.z += t.z), (this.w += t.w), this);
    }
    addScalar(t) {
      return ((this.x += t), (this.y += t), (this.z += t), (this.w += t), this);
    }
    addVectors(t, e) {
      return ((this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), (this.w = t.w + e.w), this);
    }
    addScaledVector(t, e) {
      return ((this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), (this.w += t.w * e), this);
    }
    sub(t) {
      return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), (this.w -= t.w), this);
    }
    subScalar(t) {
      return ((this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this);
    }
    subVectors(t, e) {
      return ((this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), (this.w = t.w - e.w), this);
    }
    multiply(t) {
      return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), (this.w *= t.w), this);
    }
    multiplyScalar(t) {
      return ((this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this);
    }
    applyMatrix4(t) {
      let e = this.x,
        i = this.y,
        r = this.z,
        s = this.w,
        o = t.elements;
      return (
        (this.x = o[0] * e + o[4] * i + o[8] * r + o[12] * s),
        (this.y = o[1] * e + o[5] * i + o[9] * r + o[13] * s),
        (this.z = o[2] * e + o[6] * i + o[10] * r + o[14] * s),
        (this.w = o[3] * e + o[7] * i + o[11] * r + o[15] * s),
        this
      );
    }
    divide(t) {
      return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), (this.w /= t.w), this);
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      let e = Math.sqrt(1 - t.w * t.w);
      return (
        e < 1e-4
          ? ((this.x = 1), (this.y = 0), (this.z = 0))
          : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
        this
      );
    }
    setAxisAngleFromRotationMatrix(t) {
      let e,
        i,
        r,
        s,
        c = t.elements,
        l = c[0],
        h = c[4],
        u = c[8],
        d = c[1],
        f = c[5],
        p = c[9],
        x = c[2],
        g = c[6],
        m = c[10];
      if (Math.abs(h - d) < 0.01 && Math.abs(u - x) < 0.01 && Math.abs(p - g) < 0.01) {
        if (Math.abs(h + d) < 0.1 && Math.abs(u + x) < 0.1 && Math.abs(p + g) < 0.1 && Math.abs(l + f + m - 3) < 0.1)
          return (this.set(1, 0, 0, 0), this);
        e = Math.PI;
        let E = (l + 1) / 2,
          _ = (f + 1) / 2,
          T = (m + 1) / 2,
          w = (h + d) / 4,
          v = (u + x) / 4,
          S = (p + g) / 4;
        return (
          E > _ && E > T
            ? E < 0.01
              ? ((i = 0), (r = 0.707106781), (s = 0.707106781))
              : ((i = Math.sqrt(E)), (r = w / i), (s = v / i))
            : _ > T
              ? _ < 0.01
                ? ((i = 0.707106781), (r = 0), (s = 0.707106781))
                : ((r = Math.sqrt(_)), (i = w / r), (s = S / r))
              : T < 0.01
                ? ((i = 0.707106781), (r = 0.707106781), (s = 0))
                : ((s = Math.sqrt(T)), (i = v / s), (r = S / s)),
          this.set(i, r, s, e),
          this
        );
      }
      let y = Math.sqrt((g - p) * (g - p) + (u - x) * (u - x) + (d - h) * (d - h));
      return (
        Math.abs(y) < 0.001 && (y = 1),
        (this.x = (g - p) / y),
        (this.y = (u - x) / y),
        (this.z = (d - h) / y),
        (this.w = Math.acos((l + f + m - 1) / 2)),
        this
      );
    }
    setFromMatrixPosition(t) {
      let e = t.elements;
      return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), (this.w = e[15]), this);
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        (this.w = Math.min(this.w, t.w)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        (this.w = Math.max(this.w, t.w)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = ce(this.x, t.x, e.x)),
        (this.y = ce(this.y, t.y, e.y)),
        (this.z = ce(this.z, t.z, e.z)),
        (this.w = ce(this.w, t.w, e.w)),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = ce(this.x, t, e)),
        (this.y = ce(this.y, t, e)),
        (this.z = ce(this.z, t, e)),
        (this.w = ce(this.w, t, e)),
        this
      );
    }
    clampLength(t, e) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(ce(i, t, e));
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        (this.w = Math.floor(this.w)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        (this.w = Math.ceil(this.w)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        (this.w = Math.round(this.w)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        (this.z = Math.trunc(this.z)),
        (this.w = Math.trunc(this.w)),
        this
      );
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this);
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        (this.w += (t.w - this.w) * e),
        this
      );
    }
    lerpVectors(t, e, i) {
      return (
        (this.x = t.x + (e.x - t.x) * i),
        (this.y = t.y + (e.y - t.y) * i),
        (this.z = t.z + (e.z - t.z) * i),
        (this.w = t.w + (e.w - t.w) * i),
        this
      );
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
    }
    fromArray(t, e = 0) {
      return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), (this.w = t[e + 3]), this);
    }
    toArray(t = [], e = 0) {
      return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), (t[e + 3] = this.w), t);
    }
    fromBufferAttribute(t, e) {
      return ((this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), (this.w = t.getW(e)), this);
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        (this.w = Math.random()),
        this
      );
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y, yield this.z, yield this.w);
    }
  };
  Uu.prototype.isVector4 = !0;
  var Ee = Uu,
    Tc = class extends Ai {
      constructor(t = 1, e = 1, i = {}) {
        (super(),
          (i = Object.assign(
            {
              generateMipmaps: !1,
              internalFormat: null,
              minFilter: Ne,
              depthBuffer: !0,
              stencilBuffer: !1,
              resolveColorBuffer: !0,
              resolveDepthBuffer: !0,
              resolveStencilBuffer: !0,
              storeMultisampledColorBuffer: !0,
              storeMultisampledDepthBuffer: !0,
              storeMultisampledStencilBuffer: !0,
              depthTexture: null,
              samples: 0,
              count: 1,
              depth: 1,
              multiview: !1,
              useArrayDepthTexture: !1,
            },
            i,
          )),
          (this.isRenderTarget = !0),
          (this.width = t),
          (this.height = e),
          (this.depth = i.depth),
          (this.scissor = new Ee(0, 0, t, e)),
          (this.scissorTest = !1),
          (this.viewport = new Ee(0, 0, t, e)),
          (this.textures = []));
        let r = i.count;
        for (let s = 0; s < r; s++)
          ((this.textures[s] = new In({ width: t, height: e, depth: i.depth })),
            (this.textures[s].isRenderTargetTexture = !0),
            (this.textures[s].renderTarget = this));
        (this._setTextureOptions(i),
          (this.depthBuffer = i.depthBuffer),
          (this.stencilBuffer = i.stencilBuffer),
          (this.resolveColorBuffer = i.resolveColorBuffer),
          (this.resolveDepthBuffer = i.resolveDepthBuffer),
          (this.resolveStencilBuffer = i.resolveStencilBuffer),
          (this.storeMultisampledColorBuffer = i.storeMultisampledColorBuffer),
          (this.storeMultisampledDepthBuffer = i.storeMultisampledDepthBuffer),
          (this.storeMultisampledStencilBuffer = i.storeMultisampledStencilBuffer),
          (this._depthTexture = null),
          (this.depthTexture = i.depthTexture),
          (this.samples = i.samples),
          (this.multiview = i.multiview),
          (this.useArrayDepthTexture = i.useArrayDepthTexture));
      }
      _setTextureOptions(t = {}) {
        let e = { minFilter: Ne, generateMipmaps: !1, flipY: !1, internalFormat: null };
        (t.mapping !== void 0 && (e.mapping = t.mapping),
          t.wrapS !== void 0 && (e.wrapS = t.wrapS),
          t.wrapT !== void 0 && (e.wrapT = t.wrapT),
          t.wrapR !== void 0 && (e.wrapR = t.wrapR),
          t.magFilter !== void 0 && (e.magFilter = t.magFilter),
          t.minFilter !== void 0 && (e.minFilter = t.minFilter),
          t.format !== void 0 && (e.format = t.format),
          t.type !== void 0 && (e.type = t.type),
          t.anisotropy !== void 0 && (e.anisotropy = t.anisotropy),
          t.colorSpace !== void 0 && (e.colorSpace = t.colorSpace),
          t.flipY !== void 0 && (e.flipY = t.flipY),
          t.generateMipmaps !== void 0 && (e.generateMipmaps = t.generateMipmaps),
          t.mipmapsAutoUpdate !== void 0 && (e.mipmapsAutoUpdate = t.mipmapsAutoUpdate),
          t.internalFormat !== void 0 && (e.internalFormat = t.internalFormat));
        for (let i = 0; i < this.textures.length; i++) this.textures[i].setValues(e);
      }
      get texture() {
        return this.textures[0];
      }
      set texture(t) {
        this.textures[0] = t;
      }
      set depthTexture(t) {
        (this._depthTexture !== null &&
          this._depthTexture.renderTarget === this &&
          (this._depthTexture.renderTarget = null),
          t !== null && t.renderTarget === null && (t.renderTarget = this),
          (this._depthTexture = t));
      }
      get depthTexture() {
        return this._depthTexture;
      }
      setSize(t, e, i = 1) {
        if (this.width !== t || this.height !== e || this.depth !== i) {
          ((this.width = t), (this.height = e), (this.depth = i));
          for (let r = 0, s = this.textures.length; r < s; r++)
            ((this.textures[r].image.width = t),
              (this.textures[r].image.height = e),
              (this.textures[r].image.depth = i),
              this.textures[r].isData3DTexture !== !0 &&
                (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1));
          this.dispose();
        }
        (this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e));
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        ((this.width = t.width),
          (this.height = t.height),
          (this.depth = t.depth),
          this.scissor.copy(t.scissor),
          (this.scissorTest = t.scissorTest),
          this.viewport.copy(t.viewport),
          (this.textures.length = 0));
        for (let e = 0, i = t.textures.length; e < i; e++) {
          ((this.textures[e] = t.textures[e].clone()),
            (this.textures[e].isRenderTargetTexture = !0),
            (this.textures[e].renderTarget = this));
          let r = Object.assign({}, t.textures[e].image);
          this.textures[e].source = new Ps(r);
        }
        if (
          ((this.depthBuffer = t.depthBuffer),
          (this.stencilBuffer = t.stencilBuffer),
          (this.resolveColorBuffer = t.resolveColorBuffer),
          (this.resolveDepthBuffer = t.resolveDepthBuffer),
          (this.resolveStencilBuffer = t.resolveStencilBuffer),
          (this.storeMultisampledColorBuffer = t.storeMultisampledColorBuffer),
          (this.storeMultisampledDepthBuffer = t.storeMultisampledDepthBuffer),
          (this.storeMultisampledStencilBuffer = t.storeMultisampledStencilBuffer),
          t.depthTexture !== null)
        )
          if (t.depthTexture.renderTarget === t) {
            let e = t.depthTexture.clone();
            ((e.renderTarget = null), (this.depthTexture = e));
          } else this.depthTexture = t.depthTexture;
        else this.depthTexture = null;
        return (
          (this.samples = t.samples),
          (this.multiview = t.multiview),
          (this.useArrayDepthTexture = t.useArrayDepthTexture),
          this
        );
      }
      dispose() {
        this.dispatchEvent({ type: "dispose" });
      }
    },
    cn = class extends Tc {
      constructor(t = 1, e = 1, i = {}) {
        (super(t, e, i), (this.isWebGLRenderTarget = !0));
      }
    },
    Co = class extends In {
      constructor(t = null, e = 1, i = 1, r = 1) {
        (super(null),
          (this.isDataArrayTexture = !0),
          (this.image = { data: t, width: e, height: i, depth: r }),
          (this.magFilter = xn),
          (this.minFilter = xn),
          (this.wrapR = Ti),
          (this.generateMipmaps = !1),
          (this.flipY = !1),
          (this.unpackAlignment = 1),
          (this.layerUpdates = new Set()));
      }
      copy(t) {
        return (super.copy(t), (this.wrapR = t.wrapR), this);
      }
      addLayerUpdate(t) {
        this.layerUpdates.add(t);
      }
      clearLayerUpdates() {
        this.layerUpdates.clear();
      }
    };
  var Ac = class extends In {
    constructor(t = null, e = 1, i = 1, r = 1) {
      (super(null),
        (this.isData3DTexture = !0),
        (this.image = { data: t, width: e, height: i, depth: r }),
        (this.magFilter = xn),
        (this.minFilter = xn),
        (this.wrapR = Ti),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1));
    }
    copy(t) {
      return (super.copy(t), (this.wrapR = t.wrapR), this);
    }
  };
  var Yc = class Yc {
    constructor(t, e, i, r, s, o, a, c, l, h, u, d, f, p, x, g) {
      ((this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        t !== void 0 && this.set(t, e, i, r, s, o, a, c, l, h, u, d, f, p, x, g));
    }
    set(t, e, i, r, s, o, a, c, l, h, u, d, f, p, x, g) {
      let m = this.elements;
      return (
        (m[0] = t),
        (m[4] = e),
        (m[8] = i),
        (m[12] = r),
        (m[1] = s),
        (m[5] = o),
        (m[9] = a),
        (m[13] = c),
        (m[2] = l),
        (m[6] = h),
        (m[10] = u),
        (m[14] = d),
        (m[3] = f),
        (m[7] = p),
        (m[11] = x),
        (m[15] = g),
        this
      );
    }
    identity() {
      return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
    }
    clone() {
      return new Yc().fromArray(this.elements);
    }
    copy(t) {
      let e = this.elements,
        i = t.elements;
      return (
        (e[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        (e[4] = i[4]),
        (e[5] = i[5]),
        (e[6] = i[6]),
        (e[7] = i[7]),
        (e[8] = i[8]),
        (e[9] = i[9]),
        (e[10] = i[10]),
        (e[11] = i[11]),
        (e[12] = i[12]),
        (e[13] = i[13]),
        (e[14] = i[14]),
        (e[15] = i[15]),
        this
      );
    }
    copyPosition(t) {
      let e = this.elements,
        i = t.elements;
      return ((e[12] = i[12]), (e[13] = i[13]), (e[14] = i[14]), this);
    }
    setFromMatrix3(t) {
      let e = t.elements;
      return (this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this);
    }
    extractBasis(t, e, i) {
      return this.determinantAffine() === 0
        ? (t.set(1, 0, 0), e.set(0, 1, 0), i.set(0, 0, 1), this)
        : (t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this);
    }
    makeBasis(t, e, i) {
      return (this.set(t.x, e.x, i.x, 0, t.y, e.y, i.y, 0, t.z, e.z, i.z, 0, 0, 0, 0, 1), this);
    }
    extractRotation(t) {
      if (t.determinantAffine() === 0) return this.identity();
      let e = this.elements,
        i = t.elements,
        r = 1 / hs.setFromMatrixColumn(t, 0).length(),
        s = 1 / hs.setFromMatrixColumn(t, 1).length(),
        o = 1 / hs.setFromMatrixColumn(t, 2).length();
      return (
        (e[0] = i[0] * r),
        (e[1] = i[1] * r),
        (e[2] = i[2] * r),
        (e[3] = 0),
        (e[4] = i[4] * s),
        (e[5] = i[5] * s),
        (e[6] = i[6] * s),
        (e[7] = 0),
        (e[8] = i[8] * o),
        (e[9] = i[9] * o),
        (e[10] = i[10] * o),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromEuler(t) {
      let e = this.elements,
        i = t.x,
        r = t.y,
        s = t.z,
        o = Math.cos(i),
        a = Math.sin(i),
        c = Math.cos(r),
        l = Math.sin(r),
        h = Math.cos(s),
        u = Math.sin(s);
      if (t.order === "XYZ") {
        let d = o * h,
          f = o * u,
          p = a * h,
          x = a * u;
        ((e[0] = c * h),
          (e[4] = -c * u),
          (e[8] = l),
          (e[1] = f + p * l),
          (e[5] = d - x * l),
          (e[9] = -a * c),
          (e[2] = x - d * l),
          (e[6] = p + f * l),
          (e[10] = o * c));
      } else if (t.order === "YXZ") {
        let d = c * h,
          f = c * u,
          p = l * h,
          x = l * u;
        ((e[0] = d + x * a),
          (e[4] = p * a - f),
          (e[8] = o * l),
          (e[1] = o * u),
          (e[5] = o * h),
          (e[9] = -a),
          (e[2] = f * a - p),
          (e[6] = x + d * a),
          (e[10] = o * c));
      } else if (t.order === "ZXY") {
        let d = c * h,
          f = c * u,
          p = l * h,
          x = l * u;
        ((e[0] = d - x * a),
          (e[4] = -o * u),
          (e[8] = p + f * a),
          (e[1] = f + p * a),
          (e[5] = o * h),
          (e[9] = x - d * a),
          (e[2] = -o * l),
          (e[6] = a),
          (e[10] = o * c));
      } else if (t.order === "ZYX") {
        let d = o * h,
          f = o * u,
          p = a * h,
          x = a * u;
        ((e[0] = c * h),
          (e[4] = p * l - f),
          (e[8] = d * l + x),
          (e[1] = c * u),
          (e[5] = x * l + d),
          (e[9] = f * l - p),
          (e[2] = -l),
          (e[6] = a * c),
          (e[10] = o * c));
      } else if (t.order === "YZX") {
        let d = o * c,
          f = o * l,
          p = a * c,
          x = a * l;
        ((e[0] = c * h),
          (e[4] = x - d * u),
          (e[8] = p * u + f),
          (e[1] = u),
          (e[5] = o * h),
          (e[9] = -a * h),
          (e[2] = -l * h),
          (e[6] = f * u + p),
          (e[10] = d - x * u));
      } else if (t.order === "XZY") {
        let d = o * c,
          f = o * l,
          p = a * c,
          x = a * l;
        ((e[0] = c * h),
          (e[4] = -u),
          (e[8] = l * h),
          (e[1] = d * u + x),
          (e[5] = o * h),
          (e[9] = f * u - p),
          (e[2] = p * u - f),
          (e[6] = a * h),
          (e[10] = x * u + d));
      }
      return ((e[3] = 0), (e[7] = 0), (e[11] = 0), (e[12] = 0), (e[13] = 0), (e[14] = 0), (e[15] = 1), this);
    }
    makeRotationFromQuaternion(t) {
      return this.compose(tg, t, eg);
    }
    lookAt(t, e, i) {
      let r = this.elements;
      return (
        Hn.subVectors(t, e),
        Hn.lengthSq() === 0 && (Hn.z = 1),
        Hn.normalize(),
        ur.crossVectors(i, Hn),
        ur.lengthSq() === 0 &&
          (Math.abs(i.z) === 1 ? (Hn.x += 1e-4) : (Hn.z += 1e-4), Hn.normalize(), ur.crossVectors(i, Hn)),
        ur.normalize(),
        ka.crossVectors(Hn, ur),
        (r[0] = ur.x),
        (r[4] = ka.x),
        (r[8] = Hn.x),
        (r[1] = ur.y),
        (r[5] = ka.y),
        (r[9] = Hn.y),
        (r[2] = ur.z),
        (r[6] = ka.z),
        (r[10] = Hn.z),
        this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      let i = t.elements,
        r = e.elements,
        s = this.elements,
        o = i[0],
        a = i[4],
        c = i[8],
        l = i[12],
        h = i[1],
        u = i[5],
        d = i[9],
        f = i[13],
        p = i[2],
        x = i[6],
        g = i[10],
        m = i[14],
        y = i[3],
        E = i[7],
        _ = i[11],
        T = i[15],
        w = r[0],
        v = r[4],
        S = r[8],
        F = r[12],
        I = r[1],
        N = r[5],
        B = r[9],
        X = r[13],
        P = r[2],
        H = r[6],
        Y = r[10],
        G = r[14],
        ot = r[3],
        $ = r[7],
        nt = r[11],
        rt = r[15];
      return (
        (s[0] = o * w + a * I + c * P + l * ot),
        (s[4] = o * v + a * N + c * H + l * $),
        (s[8] = o * S + a * B + c * Y + l * nt),
        (s[12] = o * F + a * X + c * G + l * rt),
        (s[1] = h * w + u * I + d * P + f * ot),
        (s[5] = h * v + u * N + d * H + f * $),
        (s[9] = h * S + u * B + d * Y + f * nt),
        (s[13] = h * F + u * X + d * G + f * rt),
        (s[2] = p * w + x * I + g * P + m * ot),
        (s[6] = p * v + x * N + g * H + m * $),
        (s[10] = p * S + x * B + g * Y + m * nt),
        (s[14] = p * F + x * X + g * G + m * rt),
        (s[3] = y * w + E * I + _ * P + T * ot),
        (s[7] = y * v + E * N + _ * H + T * $),
        (s[11] = y * S + E * B + _ * Y + T * nt),
        (s[15] = y * F + E * X + _ * G + T * rt),
        this
      );
    }
    multiplyScalar(t) {
      let e = this.elements;
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      );
    }
    determinant() {
      let t = this.elements,
        e = t[0],
        i = t[4],
        r = t[8],
        s = t[12],
        o = t[1],
        a = t[5],
        c = t[9],
        l = t[13],
        h = t[2],
        u = t[6],
        d = t[10],
        f = t[14],
        p = t[3],
        x = t[7],
        g = t[11],
        m = t[15],
        y = c * f - l * d,
        E = a * f - l * u,
        _ = a * d - c * u,
        T = o * f - l * h,
        w = o * d - c * h,
        v = o * u - a * h;
      return (
        e * (x * y - g * E + m * _) -
        i * (p * y - g * T + m * w) +
        r * (p * E - x * T + m * v) -
        s * (p * _ - x * w + g * v)
      );
    }
    determinantAffine() {
      let t = this.elements,
        e = t[0],
        i = t[4],
        r = t[8],
        s = t[1],
        o = t[5],
        a = t[9],
        c = t[2],
        l = t[6],
        h = t[10];
      return e * (o * h - a * l) - i * (s * h - a * c) + r * (s * l - o * c);
    }
    transpose() {
      let t = this.elements,
        e;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    }
    setPosition(t, e, i) {
      let r = this.elements;
      return (
        t.isVector3 ? ((r[12] = t.x), (r[13] = t.y), (r[14] = t.z)) : ((r[12] = t), (r[13] = e), (r[14] = i)),
        this
      );
    }
    invert() {
      let t = this.elements,
        e = t[0],
        i = t[1],
        r = t[2],
        s = t[3],
        o = t[4],
        a = t[5],
        c = t[6],
        l = t[7],
        h = t[8],
        u = t[9],
        d = t[10],
        f = t[11],
        p = t[12],
        x = t[13],
        g = t[14],
        m = t[15],
        y = e * a - i * o,
        E = e * c - r * o,
        _ = e * l - s * o,
        T = i * c - r * a,
        w = i * l - s * a,
        v = r * l - s * c,
        S = h * x - u * p,
        F = h * g - d * p,
        I = h * m - f * p,
        N = u * g - d * x,
        B = u * m - f * x,
        X = d * m - f * g,
        P = y * X - E * B + _ * N + T * I - w * F + v * S;
      if (P === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let H = 1 / P;
      return (
        (t[0] = (a * X - c * B + l * N) * H),
        (t[1] = (r * B - i * X - s * N) * H),
        (t[2] = (x * v - g * w + m * T) * H),
        (t[3] = (d * w - u * v - f * T) * H),
        (t[4] = (c * I - o * X - l * F) * H),
        (t[5] = (e * X - r * I + s * F) * H),
        (t[6] = (g * _ - p * v - m * E) * H),
        (t[7] = (h * v - d * _ + f * E) * H),
        (t[8] = (o * B - a * I + l * S) * H),
        (t[9] = (i * I - e * B - s * S) * H),
        (t[10] = (p * w - x * _ + m * y) * H),
        (t[11] = (u * _ - h * w - f * y) * H),
        (t[12] = (a * F - o * N - c * S) * H),
        (t[13] = (e * N - i * F + r * S) * H),
        (t[14] = (x * E - p * T - g * y) * H),
        (t[15] = (h * T - u * E + d * y) * H),
        this
      );
    }
    scale(t) {
      let e = this.elements,
        i = t.x,
        r = t.y,
        s = t.z;
      return (
        (e[0] *= i),
        (e[4] *= r),
        (e[8] *= s),
        (e[1] *= i),
        (e[5] *= r),
        (e[9] *= s),
        (e[2] *= i),
        (e[6] *= r),
        (e[10] *= s),
        (e[3] *= i),
        (e[7] *= r),
        (e[11] *= s),
        this
      );
    }
    getMaxScaleOnAxis() {
      let t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, i, r));
    }
    makeTranslation(t, e, i) {
      return (
        t.isVector3
          ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
          : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1),
        this
      );
    }
    makeRotationX(t) {
      let e = Math.cos(t),
        i = Math.sin(t);
      return (this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this);
    }
    makeRotationY(t) {
      let e = Math.cos(t),
        i = Math.sin(t);
      return (this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this);
    }
    makeRotationZ(t) {
      let e = Math.cos(t),
        i = Math.sin(t);
      return (this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
    }
    makeRotationAxis(t, e) {
      let i = Math.cos(e),
        r = Math.sin(e),
        s = 1 - i,
        o = t.x,
        a = t.y,
        c = t.z,
        l = s * o,
        h = s * a;
      return (
        this.set(
          l * o + i,
          l * a - r * c,
          l * c + r * a,
          0,
          l * a + r * c,
          h * a + i,
          h * c - r * o,
          0,
          l * c - r * a,
          h * c + r * o,
          s * c * c + i,
          0,
          0,
          0,
          0,
          1,
        ),
        this
      );
    }
    makeScale(t, e, i) {
      return (this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this);
    }
    makeShear(t, e, i, r, s, o) {
      return (this.set(1, i, s, 0, t, 1, o, 0, e, r, 1, 0, 0, 0, 0, 1), this);
    }
    compose(t, e, i) {
      let r = this.elements,
        s = e._x,
        o = e._y,
        a = e._z,
        c = e._w,
        l = s + s,
        h = o + o,
        u = a + a,
        d = s * l,
        f = s * h,
        p = s * u,
        x = o * h,
        g = o * u,
        m = a * u,
        y = c * l,
        E = c * h,
        _ = c * u,
        T = i.x,
        w = i.y,
        v = i.z;
      return (
        (r[0] = (1 - (x + m)) * T),
        (r[1] = (f + _) * T),
        (r[2] = (p - E) * T),
        (r[3] = 0),
        (r[4] = (f - _) * w),
        (r[5] = (1 - (d + m)) * w),
        (r[6] = (g + y) * w),
        (r[7] = 0),
        (r[8] = (p + E) * v),
        (r[9] = (g - y) * v),
        (r[10] = (1 - (d + x)) * v),
        (r[11] = 0),
        (r[12] = t.x),
        (r[13] = t.y),
        (r[14] = t.z),
        (r[15] = 1),
        this
      );
    }
    decompose(t, e, i) {
      let r = this.elements;
      ((t.x = r[12]), (t.y = r[13]), (t.z = r[14]));
      let s = this.determinantAffine();
      if (s === 0) return (i.set(1, 1, 1), e.identity(), this);
      let o = hs.set(r[0], r[1], r[2]).length(),
        a = hs.set(r[4], r[5], r[6]).length(),
        c = hs.set(r[8], r[9], r[10]).length();
      (s < 0 && (o = -o), di.copy(this));
      let l = 1 / o,
        h = 1 / a,
        u = 1 / c;
      return (
        (di.elements[0] *= l),
        (di.elements[1] *= l),
        (di.elements[2] *= l),
        (di.elements[4] *= h),
        (di.elements[5] *= h),
        (di.elements[6] *= h),
        (di.elements[8] *= u),
        (di.elements[9] *= u),
        (di.elements[10] *= u),
        e.setFromRotationMatrix(di),
        (i.x = o),
        (i.y = a),
        (i.z = c),
        this
      );
    }
    makePerspective(t, e, i, r, s, o, a = Kn, c = !1) {
      let l = this.elements,
        h = (2 * s) / (e - t),
        u = (2 * s) / (i - r),
        d = (e + t) / (e - t),
        f = (i + r) / (i - r),
        p,
        x;
      if (c) ((p = s / (o - s)), (x = (o * s) / (o - s)));
      else if (a === Kn) ((p = -(o + s) / (o - s)), (x = (-2 * o * s) / (o - s)));
      else if (a === Cs) ((p = -o / (o - s)), (x = (-o * s) / (o - s)));
      else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
      return (
        (l[0] = h),
        (l[4] = 0),
        (l[8] = d),
        (l[12] = 0),
        (l[1] = 0),
        (l[5] = u),
        (l[9] = f),
        (l[13] = 0),
        (l[2] = 0),
        (l[6] = 0),
        (l[10] = p),
        (l[14] = x),
        (l[3] = 0),
        (l[7] = 0),
        (l[11] = -1),
        (l[15] = 0),
        this
      );
    }
    makeOrthographic(t, e, i, r, s, o, a = Kn, c = !1) {
      let l = this.elements,
        h = 2 / (e - t),
        u = 2 / (i - r),
        d = -(e + t) / (e - t),
        f = -(i + r) / (i - r),
        p,
        x;
      if (c) ((p = 1 / (o - s)), (x = o / (o - s)));
      else if (a === Kn) ((p = -2 / (o - s)), (x = -(o + s) / (o - s)));
      else if (a === Cs) ((p = -1 / (o - s)), (x = -s / (o - s)));
      else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
      return (
        (l[0] = h),
        (l[4] = 0),
        (l[8] = 0),
        (l[12] = d),
        (l[1] = 0),
        (l[5] = u),
        (l[9] = 0),
        (l[13] = f),
        (l[2] = 0),
        (l[6] = 0),
        (l[10] = p),
        (l[14] = x),
        (l[3] = 0),
        (l[7] = 0),
        (l[11] = 0),
        (l[15] = 1),
        this
      );
    }
    equals(t) {
      let e = this.elements,
        i = t.elements;
      for (let r = 0; r < 16; r++) if (e[r] !== i[r]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 16; i++) this.elements[i] = t[i + e];
      return this;
    }
    toArray(t = [], e = 0) {
      let i = this.elements;
      return (
        (t[e] = i[0]),
        (t[e + 1] = i[1]),
        (t[e + 2] = i[2]),
        (t[e + 3] = i[3]),
        (t[e + 4] = i[4]),
        (t[e + 5] = i[5]),
        (t[e + 6] = i[6]),
        (t[e + 7] = i[7]),
        (t[e + 8] = i[8]),
        (t[e + 9] = i[9]),
        (t[e + 10] = i[10]),
        (t[e + 11] = i[11]),
        (t[e + 12] = i[12]),
        (t[e + 13] = i[13]),
        (t[e + 14] = i[14]),
        (t[e + 15] = i[15]),
        t
      );
    }
  };
  Yc.prototype.isMatrix4 = !0;
  var le = Yc,
    hs = new R(),
    di = new le(),
    tg = new R(0, 0, 0),
    eg = new R(1, 1, 1),
    ur = new R(),
    ka = new R(),
    Hn = new R(),
    ef = new le(),
    nf = new qe(),
    gi = class n {
      constructor(t = 0, e = 0, i = 0, r = n.DEFAULT_ORDER) {
        ((this.isEuler = !0), (this._x = t), (this._y = e), (this._z = i), (this._order = r));
      }
      get x() {
        return this._x;
      }
      set x(t) {
        ((this._x = t), this._onChangeCallback());
      }
      get y() {
        return this._y;
      }
      set y(t) {
        ((this._y = t), this._onChangeCallback());
      }
      get z() {
        return this._z;
      }
      set z(t) {
        ((this._z = t), this._onChangeCallback());
      }
      get order() {
        return this._order;
      }
      set order(t) {
        ((this._order = t), this._onChangeCallback());
      }
      set(t, e, i, r = this._order) {
        return ((this._x = t), (this._y = e), (this._z = i), (this._order = r), this._onChangeCallback(), this);
      }
      clone() {
        return new this.constructor(this._x, this._y, this._z, this._order);
      }
      copy(t) {
        return (
          (this._x = t._x),
          (this._y = t._y),
          (this._z = t._z),
          (this._order = t._order),
          this._onChangeCallback(),
          this
        );
      }
      setFromRotationMatrix(t, e = this._order, i = !0) {
        let r = t.elements,
          s = r[0],
          o = r[4],
          a = r[8],
          c = r[1],
          l = r[5],
          h = r[9],
          u = r[2],
          d = r[6],
          f = r[10];
        switch (e) {
          case "XYZ":
            ((this._y = Math.asin(ce(a, -1, 1))),
              Math.abs(a) < 0.9999999
                ? ((this._x = Math.atan2(-h, f)), (this._z = Math.atan2(-o, s)))
                : ((this._x = Math.atan2(d, l)), (this._z = 0)));
            break;
          case "YXZ":
            ((this._x = Math.asin(-ce(h, -1, 1))),
              Math.abs(h) < 0.9999999
                ? ((this._y = Math.atan2(a, f)), (this._z = Math.atan2(c, l)))
                : ((this._y = Math.atan2(-u, s)), (this._z = 0)));
            break;
          case "ZXY":
            ((this._x = Math.asin(ce(d, -1, 1))),
              Math.abs(d) < 0.9999999
                ? ((this._y = Math.atan2(-u, f)), (this._z = Math.atan2(-o, l)))
                : ((this._y = 0), (this._z = Math.atan2(c, s))));
            break;
          case "ZYX":
            ((this._y = Math.asin(-ce(u, -1, 1))),
              Math.abs(u) < 0.9999999
                ? ((this._x = Math.atan2(d, f)), (this._z = Math.atan2(c, s)))
                : ((this._x = 0), (this._z = Math.atan2(-o, l))));
            break;
          case "YZX":
            ((this._z = Math.asin(ce(c, -1, 1))),
              Math.abs(c) < 0.9999999
                ? ((this._x = Math.atan2(-h, l)), (this._y = Math.atan2(-u, s)))
                : ((this._x = 0), (this._y = Math.atan2(a, f))));
            break;
          case "XZY":
            ((this._z = Math.asin(-ce(o, -1, 1))),
              Math.abs(o) < 0.9999999
                ? ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(a, s)))
                : ((this._x = Math.atan2(-h, f)), (this._y = 0)));
            break;
          default:
            Vt("Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
        }
        return ((this._order = e), i === !0 && this._onChangeCallback(), this);
      }
      setFromQuaternion(t, e, i) {
        return (ef.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ef, e, i));
      }
      setFromVector3(t, e = this._order) {
        return this.set(t.x, t.y, t.z, e);
      }
      reorder(t) {
        return (nf.setFromEuler(this), this.setFromQuaternion(nf, t));
      }
      equals(t) {
        return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
      }
      fromArray(t) {
        return (
          (this._x = t[0]),
          (this._y = t[1]),
          (this._z = t[2]),
          t[3] !== void 0 && (this._order = t[3]),
          this._onChangeCallback(),
          this
        );
      }
      toArray(t = [], e = 0) {
        return ((t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._order), t);
      }
      _onChange(t) {
        return ((this._onChangeCallback = t), this);
      }
      _onChangeCallback() {}
      *[Symbol.iterator]() {
        (yield this._x, yield this._y, yield this._z, yield this._order);
      }
    };
  gi.DEFAULT_ORDER = "XYZ";
  var Io = class {
      constructor() {
        this.mask = 1;
      }
      set(t) {
        this.mask = ((1 << t) | 0) >>> 0;
      }
      enable(t) {
        this.mask |= (1 << t) | 0;
      }
      enableAll() {
        this.mask = -1;
      }
      toggle(t) {
        this.mask ^= (1 << t) | 0;
      }
      disable(t) {
        this.mask &= ~((1 << t) | 0);
      }
      disableAll() {
        this.mask = 0;
      }
      test(t) {
        return (this.mask & t.mask) !== 0;
      }
      isEnabled(t) {
        return (this.mask & ((1 << t) | 0)) !== 0;
      }
    },
    ng = 0,
    rf = new R(),
    us = new qe(),
    Hi = new le(),
    za = new R(),
    uo = new R(),
    ig = new R(),
    rg = new qe(),
    sf = new R(1, 0, 0),
    of = new R(0, 1, 0),
    af = new R(0, 0, 1),
    cf = { type: "added" },
    sg = { type: "removed" },
    ds = { type: "childadded", child: null },
    wh = { type: "childremoved", child: null },
    yn = class n extends Ai {
      constructor() {
        (super(),
          (this.isObject3D = !0),
          Object.defineProperty(this, "id", { value: ng++ }),
          (this.uuid = Er()),
          (this.name = ""),
          (this.type = "Object3D"),
          (this.parent = null),
          (this.children = []),
          (this.up = n.DEFAULT_UP.clone()));
        let t = new R(),
          e = new gi(),
          i = new qe(),
          r = new R(1, 1, 1);
        function s() {
          i.setFromEuler(e, !1);
        }
        function o() {
          e.setFromQuaternion(i, void 0, !1);
        }
        (e._onChange(s),
          i._onChange(o),
          Object.defineProperties(this, {
            position: { configurable: !0, enumerable: !0, value: t },
            rotation: { configurable: !0, enumerable: !0, value: e },
            quaternion: { configurable: !0, enumerable: !0, value: i },
            scale: { configurable: !0, enumerable: !0, value: r },
            modelViewMatrix: { value: new le() },
            normalMatrix: { value: new Kt() },
          }),
          (this.matrix = new le()),
          (this.matrixWorld = new le()),
          (this.matrixAutoUpdate = n.DEFAULT_MATRIX_AUTO_UPDATE),
          (this.matrixWorldAutoUpdate = n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
          (this.matrixWorldNeedsUpdate = !1),
          (this.layers = new Io()),
          (this.visible = !0),
          (this.castShadow = !1),
          (this.receiveShadow = !1),
          (this.frustumCulled = !0),
          (this.renderOrder = 0),
          (this.animations = []),
          (this.customDepthMaterial = void 0),
          (this.customDistanceMaterial = void 0),
          (this.static = !1),
          (this.userData = {}),
          (this.pivot = null));
      }
      onBeforeShadow() {}
      onAfterShadow() {}
      onBeforeRender() {}
      onAfterRender() {}
      applyMatrix4(t) {
        (this.matrixAutoUpdate && this.updateMatrix(),
          this.matrix.premultiply(t),
          this.matrix.decompose(this.position, this.quaternion, this.scale),
          this.pivot !== null && this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot));
      }
      applyQuaternion(t) {
        return (this.quaternion.premultiply(t), this);
      }
      setRotationFromAxisAngle(t, e) {
        this.quaternion.setFromAxisAngle(t, e);
      }
      setRotationFromEuler(t) {
        this.quaternion.setFromEuler(t, !0);
      }
      setRotationFromMatrix(t) {
        this.quaternion.setFromRotationMatrix(t);
      }
      setRotationFromQuaternion(t) {
        this.quaternion.copy(t);
      }
      rotateOnAxis(t, e) {
        return (us.setFromAxisAngle(t, e), this.quaternion.multiply(us), this);
      }
      rotateOnWorldAxis(t, e) {
        return (us.setFromAxisAngle(t, e), this.quaternion.premultiply(us), this);
      }
      rotateX(t) {
        return this.rotateOnAxis(sf, t);
      }
      rotateY(t) {
        return this.rotateOnAxis(of, t);
      }
      rotateZ(t) {
        return this.rotateOnAxis(af, t);
      }
      translateOnAxis(t, e) {
        return (rf.copy(t).applyQuaternion(this.quaternion), this.position.add(rf.multiplyScalar(e)), this);
      }
      translateX(t) {
        return this.translateOnAxis(sf, t);
      }
      translateY(t) {
        return this.translateOnAxis(of, t);
      }
      translateZ(t) {
        return this.translateOnAxis(af, t);
      }
      localToWorld(t) {
        return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld));
      }
      worldToLocal(t) {
        return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(Hi.copy(this.matrixWorld).invert()));
      }
      lookAt(t, e, i) {
        t.isVector3 ? za.copy(t) : za.set(t, e, i);
        let r = this.parent;
        (this.updateWorldMatrix(!0, !1),
          uo.setFromMatrixPosition(this.matrixWorld),
          this.isCamera || this.isLight ? Hi.lookAt(uo, za, this.up) : Hi.lookAt(za, uo, this.up),
          this.quaternion.setFromRotationMatrix(Hi),
          r &&
            (Hi.extractRotation(r.matrixWorld),
            us.setFromRotationMatrix(Hi),
            this.quaternion.premultiply(us.invert())));
      }
      add(t) {
        if (arguments.length > 1) {
          for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
          return this;
        }
        return t === this
          ? (qt("Object3D.add: object can't be added as a child of itself.", t), this)
          : (t && t.isObject3D
              ? (t.removeFromParent(),
                (t.parent = this),
                this.children.push(t),
                t.dispatchEvent(cf),
                (ds.child = t),
                this.dispatchEvent(ds),
                (ds.child = null))
              : qt("Object3D.add: object not an instance of THREE.Object3D.", t),
            this);
      }
      remove(t) {
        if (arguments.length > 1) {
          for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
          return this;
        }
        let e = this.children.indexOf(t);
        return (
          e !== -1 &&
            ((t.parent = null),
            this.children.splice(e, 1),
            t.dispatchEvent(sg),
            (wh.child = t),
            this.dispatchEvent(wh),
            (wh.child = null)),
          this
        );
      }
      removeFromParent() {
        let t = this.parent;
        return (t !== null && t.remove(this), this);
      }
      clear() {
        return this.remove(...this.children);
      }
      attach(t) {
        return (
          this.updateWorldMatrix(!0, !1),
          Hi.copy(this.matrixWorld).invert(),
          t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Hi.multiply(t.parent.matrixWorld)),
          t.applyMatrix4(Hi),
          t.removeFromParent(),
          (t.parent = this),
          this.children.push(t),
          t.updateWorldMatrix(!1, !0),
          t.dispatchEvent(cf),
          (ds.child = t),
          this.dispatchEvent(ds),
          (ds.child = null),
          this
        );
      }
      getObjectById(t) {
        return this.getObjectByProperty("id", t);
      }
      getObjectByName(t) {
        return this.getObjectByProperty("name", t);
      }
      getObjectByProperty(t, e) {
        if (this[t] === e) return this;
        for (let i = 0, r = this.children.length; i < r; i++) {
          let o = this.children[i].getObjectByProperty(t, e);
          if (o !== void 0) return o;
        }
      }
      getObjectsByProperty(t, e, i = []) {
        this[t] === e && i.push(this);
        let r = this.children;
        for (let s = 0, o = r.length; s < o; s++) r[s].getObjectsByProperty(t, e, i);
        return i;
      }
      getWorldPosition(t) {
        return (this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld));
      }
      getWorldQuaternion(t) {
        return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(uo, t, ig), t);
      }
      getWorldScale(t) {
        return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(uo, rg, t), t);
      }
      getWorldDirection(t) {
        this.updateWorldMatrix(!0, !1);
        let e = this.matrixWorld.elements;
        return t.set(e[8], e[9], e[10]).normalize();
      }
      raycast() {}
      intersectsFrustum() {
        return !0;
      }
      traverse(t) {
        t(this);
        let e = this.children;
        for (let i = 0, r = e.length; i < r; i++) e[i].traverse(t);
      }
      traverseVisible(t) {
        if (this.visible === !1) return;
        t(this);
        let e = this.children;
        for (let i = 0, r = e.length; i < r; i++) e[i].traverseVisible(t);
      }
      traverseAncestors(t) {
        let e = this.parent;
        e !== null && (t(e), e.traverseAncestors(t));
      }
      updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        let t = this.pivot;
        if (t !== null) {
          let e = t.x,
            i = t.y,
            r = t.z,
            s = this.matrix.elements;
          ((s[12] += e - s[0] * e - s[4] * i - s[8] * r),
            (s[13] += i - s[1] * e - s[5] * i - s[9] * r),
            (s[14] += r - s[2] * e - s[6] * i - s[10] * r));
        }
        this.matrixWorldNeedsUpdate = !0;
      }
      updateMatrixWorld(t) {
        (this.matrixAutoUpdate && this.updateMatrix(),
          (this.matrixWorldNeedsUpdate || t) &&
            (this.matrixWorldAutoUpdate === !0 &&
              (this.parent === null
                ? this.matrixWorld.copy(this.matrix)
                : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
            (this.matrixWorldNeedsUpdate = !1),
            (t = !0)));
        let e = this.children;
        for (let i = 0, r = e.length; i < r; i++) e[i].updateMatrixWorld(t);
      }
      updateWorldMatrix(t, e, i = !1) {
        let r = this.parent;
        if (
          (t === !0 && r !== null && r.updateWorldMatrix(!0, !1),
          this.matrixAutoUpdate && this.updateMatrix(),
          (this.matrixWorldNeedsUpdate || i) &&
            (this.matrixWorldAutoUpdate === !0 &&
              (this.parent === null
                ? this.matrixWorld.copy(this.matrix)
                : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
            (this.matrixWorldNeedsUpdate = !1),
            (i = !0)),
          e === !0)
        ) {
          let s = this.children;
          for (let o = 0, a = s.length; o < a; o++) s[o].updateWorldMatrix(!1, !0, i);
        }
      }
      toJSON(t) {
        let e = t === void 0 || typeof t == "string",
          i = {};
        e &&
          ((t = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
            nodes: {},
          }),
          (i.metadata = { version: 4.7, type: "Object", generator: "Object3D.toJSON" }));
        let r = {};
        ((r.uuid = this.uuid),
          (r.type = this.type),
          (r.name = this.name),
          (r.castShadow = this.castShadow),
          (r.receiveShadow = this.receiveShadow),
          (r.visible = this.visible),
          (r.frustumCulled = this.frustumCulled),
          (r.renderOrder = this.renderOrder),
          (r.static = this.static),
          (r.matrixAutoUpdate = this.matrixAutoUpdate),
          Object.keys(this.userData).length > 0 && (r.userData = this.userData),
          (r.layers = this.layers.mask),
          (r.matrix = this.matrix.toArray()),
          (r.up = this.up.toArray()),
          this.pivot !== null && (r.pivot = this.pivot.toArray()),
          this.morphTargetDictionary !== void 0 &&
            (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)),
          this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()),
          this.isInstancedMesh &&
            ((r.type = "InstancedMesh"),
            (r.count = this.count),
            (r.instanceMatrix = this.instanceMatrix.toJSON()),
            this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())),
          this.isBatchedMesh &&
            ((r.type = "BatchedMesh"),
            (r.perObjectFrustumCulled = this.perObjectFrustumCulled),
            (r.sortObjects = this.sortObjects),
            (r.drawRanges = this._drawRanges),
            (r.reservedRanges = this._reservedRanges),
            (r.geometryInfo = this._geometryInfo.map((a) => ({
              ...a,
              boundingBox: a.boundingBox ? a.boundingBox.toJSON() : void 0,
              boundingSphere: a.boundingSphere ? a.boundingSphere.toJSON() : void 0,
            }))),
            (r.instanceInfo = this._instanceInfo.map((a) => ({ ...a }))),
            (r.availableInstanceIds = this._availableInstanceIds.slice()),
            (r.availableGeometryIds = this._availableGeometryIds.slice()),
            (r.nextIndexStart = this._nextIndexStart),
            (r.nextVertexStart = this._nextVertexStart),
            (r.geometryCount = this._geometryCount),
            (r.maxInstanceCount = this._maxInstanceCount),
            (r.maxVertexCount = this._maxVertexCount),
            (r.maxIndexCount = this._maxIndexCount),
            (r.geometryInitialized = this._geometryInitialized),
            (r.matricesTexture = this._matricesTexture.toJSON(t)),
            (r.indirectTexture = this._indirectTexture.toJSON(t)),
            this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)),
            this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()),
            this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON())));
        function s(a, c) {
          return (a[c.uuid] === void 0 && (a[c.uuid] = c.toJSON(t)), c.uuid);
        }
        if (this.isScene)
          (this.background &&
            (this.background.isColor
              ? (r.background = this.background.toJSON())
              : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)),
            this.environment &&
              this.environment.isTexture &&
              this.environment.isRenderTargetTexture !== !0 &&
              (r.environment = this.environment.toJSON(t).uuid));
        else if (this.isMesh || this.isLine || this.isPoints) {
          r.geometry = s(t.geometries, this.geometry);
          let a = this.geometry.parameters;
          if (a !== void 0 && a.shapes !== void 0) {
            let c = a.shapes;
            if (Array.isArray(c))
              for (let l = 0, h = c.length; l < h; l++) {
                let u = c[l];
                s(t.shapes, u);
              }
            else s(t.shapes, c);
          }
        }
        if (
          (this.isSkinnedMesh &&
            ((r.bindMode = this.bindMode),
            (r.bindMatrix = this.bindMatrix.toArray()),
            this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), (r.skeleton = this.skeleton.uuid))),
          this.material !== void 0)
        )
          if (Array.isArray(this.material)) {
            let a = [];
            for (let c = 0, l = this.material.length; c < l; c++) a.push(s(t.materials, this.material[c]));
            r.material = a;
          } else r.material = s(t.materials, this.material);
        if (this.children.length > 0) {
          r.children = [];
          for (let a = 0; a < this.children.length; a++) r.children.push(this.children[a].toJSON(t).object);
        }
        if (this.animations.length > 0) {
          r.animations = [];
          for (let a = 0; a < this.animations.length; a++) {
            let c = this.animations[a];
            r.animations.push(s(t.animations, c));
          }
        }
        if (e) {
          let a = o(t.geometries),
            c = o(t.materials),
            l = o(t.textures),
            h = o(t.images),
            u = o(t.shapes),
            d = o(t.skeletons),
            f = o(t.animations),
            p = o(t.nodes);
          (a.length > 0 && (i.geometries = a),
            c.length > 0 && (i.materials = c),
            l.length > 0 && (i.textures = l),
            h.length > 0 && (i.images = h),
            u.length > 0 && (i.shapes = u),
            d.length > 0 && (i.skeletons = d),
            f.length > 0 && (i.animations = f),
            p.length > 0 && (i.nodes = p));
        }
        return ((i.object = r), i);
        function o(a) {
          let c = [];
          for (let l in a) {
            let h = a[l];
            (delete h.metadata, c.push(h));
          }
          return c;
        }
      }
      clone(t) {
        return new this.constructor().copy(this, t);
      }
      copy(t, e = !0) {
        if (
          ((this.name = t.name),
          this.up.copy(t.up),
          this.position.copy(t.position),
          (this.rotation.order = t.rotation.order),
          this.quaternion.copy(t.quaternion),
          this.scale.copy(t.scale),
          (this.pivot = t.pivot !== null ? t.pivot.clone() : null),
          this.matrix.copy(t.matrix),
          this.matrixWorld.copy(t.matrixWorld),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
          (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
          (this.layers.mask = t.layers.mask),
          (this.visible = t.visible),
          (this.castShadow = t.castShadow),
          (this.receiveShadow = t.receiveShadow),
          (this.frustumCulled = t.frustumCulled),
          (this.renderOrder = t.renderOrder),
          (this.static = t.static),
          (this.animations = t.animations.slice()),
          (this.userData = JSON.parse(JSON.stringify(t.userData))),
          e === !0)
        )
          for (let i = 0; i < t.children.length; i++) {
            let r = t.children[i];
            this.add(r.clone());
          }
        return this;
      }
      dispose() {
        this.dispatchEvent({ type: "dispose" });
      }
    };
  yn.DEFAULT_UP = new R(0, 1, 0);
  yn.DEFAULT_MATRIX_AUTO_UPDATE = !0;
  yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
  var Wt = class extends yn {
      constructor() {
        (super(), (this.isGroup = !0), (this.type = "Group"));
      }
    },
    og = { type: "move" },
    Ls = class {
      constructor() {
        ((this._targetRay = null), (this._grip = null), (this._hand = null));
      }
      getHandSpace() {
        return (
          this._hand === null &&
            ((this._hand = new Wt()),
            (this._hand.matrixAutoUpdate = !1),
            (this._hand.visible = !1),
            (this._hand.joints = {}),
            (this._hand.inputState = { pinching: !1 })),
          this._hand
        );
      }
      getTargetRaySpace() {
        return (
          this._targetRay === null &&
            ((this._targetRay = new Wt()),
            (this._targetRay.matrixAutoUpdate = !1),
            (this._targetRay.visible = !1),
            (this._targetRay.hasLinearVelocity = !1),
            (this._targetRay.linearVelocity = new R()),
            (this._targetRay.hasAngularVelocity = !1),
            (this._targetRay.angularVelocity = new R())),
          this._targetRay
        );
      }
      getGripSpace() {
        return (
          this._grip === null &&
            ((this._grip = new Wt()),
            (this._grip.matrixAutoUpdate = !1),
            (this._grip.visible = !1),
            (this._grip.hasLinearVelocity = !1),
            (this._grip.linearVelocity = new R()),
            (this._grip.hasAngularVelocity = !1),
            (this._grip.angularVelocity = new R()),
            (this._grip.eventsEnabled = !1)),
          this._grip
        );
      }
      dispatchEvent(t) {
        return (
          this._targetRay !== null && this._targetRay.dispatchEvent(t),
          this._grip !== null && this._grip.dispatchEvent(t),
          this._hand !== null && this._hand.dispatchEvent(t),
          this
        );
      }
      connect(t) {
        if (t && t.hand) {
          let e = this._hand;
          if (e) for (let i of t.hand.values()) this._getHandJoint(e, i);
        }
        return (this.dispatchEvent({ type: "connected", data: t }), this);
      }
      disconnect(t) {
        return (
          this.dispatchEvent({ type: "disconnected", data: t }),
          this._targetRay !== null && (this._targetRay.visible = !1),
          this._grip !== null && (this._grip.visible = !1),
          this._hand !== null && (this._hand.visible = !1),
          this
        );
      }
      update(t, e, i) {
        let r = null,
          s = null,
          o = null,
          a = this._targetRay,
          c = this._grip,
          l = this._hand;
        if (t && e.session.visibilityState !== "visible-blurred") {
          if (l && t.hand) {
            o = !0;
            for (let x of t.hand.values()) {
              let g = e.getJointPose(x, i),
                m = this._getHandJoint(l, x);
              (g !== null &&
                (m.matrix.fromArray(g.transform.matrix),
                m.matrix.decompose(m.position, m.quaternion, m.scale),
                (m.matrixWorldNeedsUpdate = !0),
                (m.jointRadius = g.radius)),
                (m.visible = g !== null));
            }
            let h = l.joints["index-finger-tip"],
              u = l.joints["thumb-tip"],
              d = h.position.distanceTo(u.position),
              f = 0.02,
              p = 0.005;
            l.inputState.pinching && d > f + p
              ? ((l.inputState.pinching = !1),
                this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this }))
              : !l.inputState.pinching &&
                d <= f - p &&
                ((l.inputState.pinching = !0),
                this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
          } else
            c !== null &&
              t.gripSpace &&
              ((s = e.getPose(t.gripSpace, i)),
              s !== null &&
                (c.matrix.fromArray(s.transform.matrix),
                c.matrix.decompose(c.position, c.quaternion, c.scale),
                (c.matrixWorldNeedsUpdate = !0),
                s.linearVelocity
                  ? ((c.hasLinearVelocity = !0), c.linearVelocity.copy(s.linearVelocity))
                  : (c.hasLinearVelocity = !1),
                s.angularVelocity
                  ? ((c.hasAngularVelocity = !0), c.angularVelocity.copy(s.angularVelocity))
                  : (c.hasAngularVelocity = !1),
                c.eventsEnabled && c.dispatchEvent({ type: "gripUpdated", data: t, target: this })));
          a !== null &&
            ((r = e.getPose(t.targetRaySpace, i)),
            r === null && s !== null && (r = s),
            r !== null &&
              (a.matrix.fromArray(r.transform.matrix),
              a.matrix.decompose(a.position, a.quaternion, a.scale),
              (a.matrixWorldNeedsUpdate = !0),
              r.linearVelocity
                ? ((a.hasLinearVelocity = !0), a.linearVelocity.copy(r.linearVelocity))
                : (a.hasLinearVelocity = !1),
              r.angularVelocity
                ? ((a.hasAngularVelocity = !0), a.angularVelocity.copy(r.angularVelocity))
                : (a.hasAngularVelocity = !1),
              this.dispatchEvent(og)));
        }
        return (
          a !== null && (a.visible = r !== null),
          c !== null && (c.visible = s !== null),
          l !== null && (l.visible = o !== null),
          this
        );
      }
      _getHandJoint(t, e) {
        if (t.joints[e.jointName] === void 0) {
          let i = new Wt();
          ((i.matrixAutoUpdate = !1), (i.visible = !1), (t.joints[e.jointName] = i), t.add(i));
        }
        return t.joints[e.jointName];
      }
    },
    yp = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    dr = { h: 0, s: 0, l: 0 },
    Ha = { h: 0, s: 0, l: 0 };
  function Th(n, t, e) {
    return (
      e < 0 && (e += 1),
      e > 1 && (e -= 1),
      e < 1 / 6 ? n + (t - n) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? n + (t - n) * 6 * (2 / 3 - e) : n
    );
  }
  var Tt = class {
      constructor(t, e, i) {
        return ((this.isColor = !0), (this.r = 1), (this.g = 1), (this.b = 1), this.set(t, e, i));
      }
      set(t, e, i) {
        if (e === void 0 && i === void 0) {
          let r = t;
          r && r.isColor
            ? this.copy(r)
            : typeof r == "number"
              ? this.setHex(r)
              : typeof r == "string" && this.setStyle(r);
        } else this.setRGB(t, e, i);
        return this;
      }
      setScalar(t) {
        return ((this.r = t), (this.g = t), (this.b = t), this);
      }
      setHex(t, e = Pe) {
        return (
          (t = Math.floor(t)),
          (this.r = ((t >> 16) & 255) / 255),
          (this.g = ((t >> 8) & 255) / 255),
          (this.b = (t & 255) / 255),
          me.colorSpaceToWorking(this, e),
          this
        );
      }
      setRGB(t, e, i, r = me.workingColorSpace) {
        return ((this.r = t), (this.g = e), (this.b = i), me.colorSpaceToWorking(this, r), this);
      }
      setHSL(t, e, i, r = me.workingColorSpace) {
        if (((t = K0(t, 1)), (e = ce(e, 0, 1)), (i = ce(i, 0, 1)), e === 0)) this.r = this.g = this.b = i;
        else {
          let s = i <= 0.5 ? i * (1 + e) : i + e - i * e,
            o = 2 * i - s;
          ((this.r = Th(o, s, t + 1 / 3)), (this.g = Th(o, s, t)), (this.b = Th(o, s, t - 1 / 3)));
        }
        return (me.colorSpaceToWorking(this, r), this);
      }
      setStyle(t, e = Pe) {
        function i(s) {
          s !== void 0 && parseFloat(s) < 1 && Vt("Color: Alpha component of " + t + " will be ignored.");
        }
        let r;
        if ((r = /^(\w+)\(([^\)]*)\)/.exec(t))) {
          let s,
            o = r[1],
            a = r[2];
          switch (o) {
            case "rgb":
            case "rgba":
              if ((s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a)))
                return (
                  i(s[4]),
                  this.setRGB(
                    Math.min(255, parseInt(s[1], 10)) / 255,
                    Math.min(255, parseInt(s[2], 10)) / 255,
                    Math.min(255, parseInt(s[3], 10)) / 255,
                    e,
                  )
                );
              if (
                (s =
                  /^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(
                    a,
                  ))
              )
                return (
                  i(s[4]),
                  this.setRGB(
                    Math.min(100, parseFloat(s[1])) / 100,
                    Math.min(100, parseFloat(s[2])) / 100,
                    Math.min(100, parseFloat(s[3])) / 100,
                    e,
                  )
                );
              break;
            case "hsl":
            case "hsla":
              if (
                (s =
                  /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(
                    a,
                  ))
              )
                return (
                  i(s[4]),
                  this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, e)
                );
              break;
            default:
              Vt("Color: Unknown color model " + t);
          }
        } else if ((r = /^\#([A-Fa-f\d]+)$/.exec(t))) {
          let s = r[1],
            o = s.length;
          if (o === 3)
            return this.setRGB(
              parseInt(s.charAt(0), 16) / 15,
              parseInt(s.charAt(1), 16) / 15,
              parseInt(s.charAt(2), 16) / 15,
              e,
            );
          if (o === 6) return this.setHex(parseInt(s, 16), e);
          Vt("Color: Invalid hex color " + t);
        } else if (t && t.length > 0) return this.setColorName(t, e);
        return this;
      }
      setColorName(t, e = Pe) {
        let i = yp[t.toLowerCase()];
        return (i !== void 0 ? this.setHex(i, e) : Vt("Color: Unknown color " + t), this);
      }
      clone() {
        return new this.constructor(this.r, this.g, this.b);
      }
      copy(t) {
        return ((this.r = t.r), (this.g = t.g), (this.b = t.b), this);
      }
      copySRGBToLinear(t) {
        return ((this.r = $i(t.r)), (this.g = $i(t.g)), (this.b = $i(t.b)), this);
      }
      copyLinearToSRGB(t) {
        return ((this.r = As(t.r)), (this.g = As(t.g)), (this.b = As(t.b)), this);
      }
      convertSRGBToLinear() {
        return (this.copySRGBToLinear(this), this);
      }
      convertLinearToSRGB() {
        return (this.copyLinearToSRGB(this), this);
      }
      getHex(t = Pe) {
        return (
          me.workingToColorSpace(Rn.copy(this), t),
          Math.round(ce(Rn.r * 255, 0, 255)) * 65536 +
            Math.round(ce(Rn.g * 255, 0, 255)) * 256 +
            Math.round(ce(Rn.b * 255, 0, 255))
        );
      }
      getHexString(t = Pe) {
        return ("000000" + this.getHex(t).toString(16)).slice(-6);
      }
      getHSL(t, e = me.workingColorSpace) {
        me.workingToColorSpace(Rn.copy(this), e);
        let i = Rn.r,
          r = Rn.g,
          s = Rn.b,
          o = Math.max(i, r, s),
          a = Math.min(i, r, s),
          c,
          l,
          h = (a + o) / 2;
        if (a === o) ((c = 0), (l = 0));
        else {
          let u = o - a;
          switch (((l = h <= 0.5 ? u / (o + a) : u / (2 - o - a)), o)) {
            case i:
              c = (r - s) / u + (r < s ? 6 : 0);
              break;
            case r:
              c = (s - i) / u + 2;
              break;
            case s:
              c = (i - r) / u + 4;
              break;
          }
          c /= 6;
        }
        return ((t.h = c), (t.s = l), (t.l = h), t);
      }
      getRGB(t, e = me.workingColorSpace) {
        return (me.workingToColorSpace(Rn.copy(this), e), (t.r = Rn.r), (t.g = Rn.g), (t.b = Rn.b), t);
      }
      getStyle(t = Pe) {
        me.workingToColorSpace(Rn.copy(this), t);
        let e = Rn.r,
          i = Rn.g,
          r = Rn.b;
        return t !== Pe
          ? `color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`
          : `rgb(${Math.round(e * 255)},${Math.round(i * 255)},${Math.round(r * 255)})`;
      }
      offsetHSL(t, e, i) {
        return (this.getHSL(dr), this.setHSL(dr.h + t, dr.s + e, dr.l + i));
      }
      add(t) {
        return ((this.r += t.r), (this.g += t.g), (this.b += t.b), this);
      }
      addColors(t, e) {
        return ((this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this);
      }
      addScalar(t) {
        return ((this.r += t), (this.g += t), (this.b += t), this);
      }
      sub(t) {
        return (
          (this.r = Math.max(0, this.r - t.r)),
          (this.g = Math.max(0, this.g - t.g)),
          (this.b = Math.max(0, this.b - t.b)),
          this
        );
      }
      multiply(t) {
        return ((this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this);
      }
      multiplyScalar(t) {
        return ((this.r *= t), (this.g *= t), (this.b *= t), this);
      }
      lerp(t, e) {
        return ((this.r += (t.r - this.r) * e), (this.g += (t.g - this.g) * e), (this.b += (t.b - this.b) * e), this);
      }
      lerpColors(t, e, i) {
        return (
          (this.r = t.r + (e.r - t.r) * i),
          (this.g = t.g + (e.g - t.g) * i),
          (this.b = t.b + (e.b - t.b) * i),
          this
        );
      }
      lerpHSL(t, e) {
        (this.getHSL(dr), t.getHSL(Ha));
        let i = _h(dr.h, Ha.h, e),
          r = _h(dr.s, Ha.s, e),
          s = _h(dr.l, Ha.l, e);
        return (this.setHSL(i, r, s), this);
      }
      setFromVector3(t) {
        return ((this.r = t.x), (this.g = t.y), (this.b = t.z), this);
      }
      applyMatrix3(t) {
        let e = this.r,
          i = this.g,
          r = this.b,
          s = t.elements;
        return (
          (this.r = s[0] * e + s[3] * i + s[6] * r),
          (this.g = s[1] * e + s[4] * i + s[7] * r),
          (this.b = s[2] * e + s[5] * i + s[8] * r),
          this
        );
      }
      equals(t) {
        return t.r === this.r && t.g === this.g && t.b === this.b;
      }
      fromArray(t, e = 0) {
        return ((this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this);
      }
      toArray(t = [], e = 0) {
        return ((t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t);
      }
      fromBufferAttribute(t, e) {
        return ((this.r = t.getX(e)), (this.g = t.getY(e)), (this.b = t.getZ(e)), this);
      }
      toJSON() {
        return this.getHex();
      }
      *[Symbol.iterator]() {
        (yield this.r, yield this.g, yield this.b);
      }
    },
    Rn = new Tt();
  Tt.NAMES = yp;
  var Ds = class extends yn {
      constructor() {
        (super(),
          (this.isScene = !0),
          (this.type = "Scene"),
          (this.background = null),
          (this.environment = null),
          (this.fog = null),
          (this.backgroundBlurriness = 0),
          (this.backgroundIntensity = 1),
          (this.backgroundRotation = new gi()),
          (this.environmentIntensity = 1),
          (this.environmentRotation = new gi()),
          (this.overrideMaterial = null),
          typeof __THREE_DEVTOOLS__ < "u" &&
            __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          (this.background = t.background !== null ? t.background.clone() : null),
          (this.environment = t.environment !== null ? t.environment.clone() : null),
          (this.fog = t.fog !== null ? t.fog.clone() : null),
          (this.backgroundBlurriness = t.backgroundBlurriness),
          (this.backgroundIntensity = t.backgroundIntensity),
          this.backgroundRotation.copy(t.backgroundRotation),
          (this.environmentIntensity = t.environmentIntensity),
          this.environmentRotation.copy(t.environmentRotation),
          (this.overrideMaterial = t.overrideMaterial !== null ? t.overrideMaterial.clone() : null),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          this
        );
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return (
          this.fog !== null && (e.object.fog = this.fog.toJSON()),
          (e.object.backgroundBlurriness = this.backgroundBlurriness),
          (e.object.backgroundIntensity = this.backgroundIntensity),
          (e.object.backgroundRotation = this.backgroundRotation.toArray()),
          (e.object.environmentIntensity = this.environmentIntensity),
          (e.object.environmentRotation = this.environmentRotation.toArray()),
          e
        );
      }
    },
    fi = new R(),
    Gi = new R(),
    Ah = new R(),
    Vi = new R(),
    fs = new R(),
    ps = new R(),
    lf = new R(),
    Rh = new R(),
    Ch = new R(),
    Ih = new R(),
    Ph = new Ee(),
    Lh = new Ee(),
    Dh = new Ee(),
    qi = class n {
      constructor(t = new R(), e = new R(), i = new R()) {
        ((this.a = t), (this.b = e), (this.c = i));
      }
      static getNormal(t, e, i, r) {
        (r.subVectors(i, e), fi.subVectors(t, e), r.cross(fi));
        let s = r.lengthSq();
        return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
      }
      static getBarycoord(t, e, i, r, s) {
        (fi.subVectors(r, e), Gi.subVectors(i, e), Ah.subVectors(t, e));
        let o = fi.dot(fi),
          a = fi.dot(Gi),
          c = fi.dot(Ah),
          l = Gi.dot(Gi),
          h = Gi.dot(Ah),
          u = o * l - a * a;
        if (u === 0) return (s.set(0, 0, 0), null);
        let d = 1 / u,
          f = (l * c - a * h) * d,
          p = (o * h - a * c) * d;
        return s.set(1 - f - p, p, f);
      }
      static containsPoint(t, e, i, r) {
        return this.getBarycoord(t, e, i, r, Vi) === null ? !1 : Vi.x >= 0 && Vi.y >= 0 && Vi.x + Vi.y <= 1;
      }
      static getInterpolation(t, e, i, r, s, o, a, c) {
        return this.getBarycoord(t, e, i, r, Vi) === null
          ? ((c.x = 0), (c.y = 0), "z" in c && (c.z = 0), "w" in c && (c.w = 0), null)
          : (c.setScalar(0), c.addScaledVector(s, Vi.x), c.addScaledVector(o, Vi.y), c.addScaledVector(a, Vi.z), c);
      }
      static getInterpolatedAttribute(t, e, i, r, s, o) {
        return (
          Ph.setScalar(0),
          Lh.setScalar(0),
          Dh.setScalar(0),
          Ph.fromBufferAttribute(t, e),
          Lh.fromBufferAttribute(t, i),
          Dh.fromBufferAttribute(t, r),
          o.setScalar(0),
          o.addScaledVector(Ph, s.x),
          o.addScaledVector(Lh, s.y),
          o.addScaledVector(Dh, s.z),
          o
        );
      }
      static isFrontFacing(t, e, i, r) {
        return (fi.subVectors(i, e), Gi.subVectors(t, e), fi.cross(Gi).dot(r) < 0);
      }
      set(t, e, i) {
        return (this.a.copy(t), this.b.copy(e), this.c.copy(i), this);
      }
      setFromPointsAndIndices(t, e, i, r) {
        return (this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[r]), this);
      }
      setFromAttributeAndIndices(t, e, i, r) {
        return (
          this.a.fromBufferAttribute(t, e),
          this.b.fromBufferAttribute(t, i),
          this.c.fromBufferAttribute(t, r),
          this
        );
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        return (this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this);
      }
      getArea() {
        return (fi.subVectors(this.c, this.b), Gi.subVectors(this.a, this.b), fi.cross(Gi).length() * 0.5);
      }
      getMidpoint(t) {
        return t
          .addVectors(this.a, this.b)
          .add(this.c)
          .multiplyScalar(1 / 3);
      }
      getNormal(t) {
        return n.getNormal(this.a, this.b, this.c, t);
      }
      getPlane(t) {
        return t.setFromCoplanarPoints(this.a, this.b, this.c);
      }
      getBarycoord(t, e) {
        return n.getBarycoord(t, this.a, this.b, this.c, e);
      }
      getInterpolation(t, e, i, r, s) {
        return n.getInterpolation(t, this.a, this.b, this.c, e, i, r, s);
      }
      containsPoint(t) {
        return n.containsPoint(t, this.a, this.b, this.c);
      }
      isFrontFacing(t) {
        return n.isFrontFacing(this.a, this.b, this.c, t);
      }
      intersectsBox(t) {
        return t.intersectsTriangle(this);
      }
      closestPointToPoint(t, e) {
        let i = this.a,
          r = this.b,
          s = this.c,
          o,
          a;
        (fs.subVectors(r, i), ps.subVectors(s, i), Rh.subVectors(t, i));
        let c = fs.dot(Rh),
          l = ps.dot(Rh);
        if (c <= 0 && l <= 0) return e.copy(i);
        Ch.subVectors(t, r);
        let h = fs.dot(Ch),
          u = ps.dot(Ch);
        if (h >= 0 && u <= h) return e.copy(r);
        let d = c * u - h * l;
        if (d <= 0 && c >= 0 && h <= 0 && c - h > 0) return ((o = c / (c - h)), e.copy(i).addScaledVector(fs, o));
        Ih.subVectors(t, s);
        let f = fs.dot(Ih),
          p = ps.dot(Ih);
        if (p >= 0 && f <= p) return e.copy(s);
        let x = f * l - c * p;
        if (x <= 0 && l >= 0 && p <= 0) return ((a = l / (l - p)), e.copy(i).addScaledVector(ps, a));
        let g = h * p - f * u;
        if (g <= 0 && u - h >= 0 && f - p >= 0)
          return (lf.subVectors(s, r), (a = (u - h) / (u - h + (f - p))), e.copy(r).addScaledVector(lf, a));
        let m = 1 / (g + x + d);
        return ((o = x * m), (a = d * m), e.copy(i).addScaledVector(fs, o).addScaledVector(ps, a));
      }
      equals(t) {
        return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
      }
    },
    Ri = class {
      constructor(t = new R(1 / 0, 1 / 0, 1 / 0), e = new R(-1 / 0, -1 / 0, -1 / 0)) {
        ((this.isBox3 = !0), (this.min = t), (this.max = e));
      }
      set(t, e) {
        return (this.min.copy(t), this.max.copy(e), this);
      }
      setFromArray(t) {
        this.makeEmpty();
        for (let e = 0, i = t.length; e < i; e += 3) this.expandByPoint(pi.fromArray(t, e));
        return this;
      }
      setFromBufferAttribute(t) {
        this.makeEmpty();
        for (let e = 0, i = t.count; e < i; e++) this.expandByPoint(pi.fromBufferAttribute(t, e));
        return this;
      }
      setFromPoints(t) {
        this.makeEmpty();
        for (let e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
        return this;
      }
      setFromCenterAndSize(t, e) {
        let i = pi.copy(e).multiplyScalar(0.5);
        return (this.min.copy(t).sub(i), this.max.copy(t).add(i), this);
      }
      setFromObject(t, e = !1) {
        return (this.makeEmpty(), this.expandByObject(t, e));
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        return (this.min.copy(t.min), this.max.copy(t.max), this);
      }
      makeEmpty() {
        return ((this.min.x = this.min.y = this.min.z = 1 / 0), (this.max.x = this.max.y = this.max.z = -1 / 0), this);
      }
      isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
      }
      getCenter(t) {
        return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
      }
      getSize(t) {
        return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
      }
      expandByPoint(t) {
        return (this.min.min(t), this.max.max(t), this);
      }
      expandByVector(t) {
        return (this.min.sub(t), this.max.add(t), this);
      }
      expandByScalar(t) {
        return (this.min.addScalar(-t), this.max.addScalar(t), this);
      }
      expandByObject(t, e = !1) {
        t.updateWorldMatrix(!1, !1);
        let i = t.geometry;
        if (i !== void 0) {
          let s = i.getAttribute("position");
          if (e === !0 && s !== void 0 && t.isInstancedMesh !== !0 && t.isBatchedMesh !== !0)
            for (let o = 0, a = s.count; o < a; o++)
              (t.isMesh === !0 ? t.getVertexPosition(o, pi) : pi.fromBufferAttribute(s, o),
                pi.applyMatrix4(t.matrixWorld),
                this.expandByPoint(pi));
          else
            (t.boundingBox !== void 0
              ? (t.boundingBox === null && t.computeBoundingBox(), Ga.copy(t.boundingBox))
              : (i.boundingBox === null && i.computeBoundingBox(), Ga.copy(i.boundingBox)),
              Ga.applyMatrix4(t.matrixWorld),
              this.union(Ga));
        }
        let r = t.children;
        for (let s = 0, o = r.length; s < o; s++) this.expandByObject(r[s], e);
        return this;
      }
      containsPoint(t) {
        return (
          t.x >= this.min.x &&
          t.x <= this.max.x &&
          t.y >= this.min.y &&
          t.y <= this.max.y &&
          t.z >= this.min.z &&
          t.z <= this.max.z
        );
      }
      containsBox(t) {
        return (
          this.min.x <= t.min.x &&
          t.max.x <= this.max.x &&
          this.min.y <= t.min.y &&
          t.max.y <= this.max.y &&
          this.min.z <= t.min.z &&
          t.max.z <= this.max.z
        );
      }
      getParameter(t, e) {
        return e.set(
          (t.x - this.min.x) / (this.max.x - this.min.x),
          (t.y - this.min.y) / (this.max.y - this.min.y),
          (t.z - this.min.z) / (this.max.z - this.min.z),
        );
      }
      intersectsBox(t) {
        return (
          t.max.x >= this.min.x &&
          t.min.x <= this.max.x &&
          t.max.y >= this.min.y &&
          t.min.y <= this.max.y &&
          t.max.z >= this.min.z &&
          t.min.z <= this.max.z
        );
      }
      intersectsSphere(t) {
        return (this.clampPoint(t.center, pi), pi.distanceToSquared(t.center) <= t.radius * t.radius);
      }
      intersectsPlane(t) {
        let e, i;
        return (
          t.normal.x > 0
            ? ((e = t.normal.x * this.min.x), (i = t.normal.x * this.max.x))
            : ((e = t.normal.x * this.max.x), (i = t.normal.x * this.min.x)),
          t.normal.y > 0
            ? ((e += t.normal.y * this.min.y), (i += t.normal.y * this.max.y))
            : ((e += t.normal.y * this.max.y), (i += t.normal.y * this.min.y)),
          t.normal.z > 0
            ? ((e += t.normal.z * this.min.z), (i += t.normal.z * this.max.z))
            : ((e += t.normal.z * this.max.z), (i += t.normal.z * this.min.z)),
          e <= -t.constant && i >= -t.constant
        );
      }
      intersectsTriangle(t) {
        if (this.isEmpty()) return !1;
        (this.getCenter(fo),
          Va.subVectors(this.max, fo),
          ms.subVectors(t.a, fo),
          gs.subVectors(t.b, fo),
          vs.subVectors(t.c, fo),
          fr.subVectors(gs, ms),
          pr.subVectors(vs, gs),
          Fr.subVectors(ms, vs));
        let e = [
          0,
          -fr.z,
          fr.y,
          0,
          -pr.z,
          pr.y,
          0,
          -Fr.z,
          Fr.y,
          fr.z,
          0,
          -fr.x,
          pr.z,
          0,
          -pr.x,
          Fr.z,
          0,
          -Fr.x,
          -fr.y,
          fr.x,
          0,
          -pr.y,
          pr.x,
          0,
          -Fr.y,
          Fr.x,
          0,
        ];
        return !Nh(e, ms, gs, vs, Va) || ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !Nh(e, ms, gs, vs, Va))
          ? !1
          : (Wa.crossVectors(fr, pr), (e = [Wa.x, Wa.y, Wa.z]), Nh(e, ms, gs, vs, Va));
      }
      clampPoint(t, e) {
        return e.copy(t).clamp(this.min, this.max);
      }
      distanceToPoint(t) {
        return this.clampPoint(t, pi).distanceTo(t);
      }
      getBoundingSphere(t) {
        return (
          this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), (t.radius = this.getSize(pi).length() * 0.5)),
          t
        );
      }
      intersect(t) {
        return (this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this);
      }
      union(t) {
        return (this.min.min(t.min), this.max.max(t.max), this);
      }
      applyMatrix4(t) {
        return this.isEmpty()
          ? this
          : (Wi[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
            Wi[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
            Wi[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
            Wi[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
            Wi[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
            Wi[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
            Wi[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
            Wi[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
            this.setFromPoints(Wi),
            this);
      }
      translate(t) {
        return (this.min.add(t), this.max.add(t), this);
      }
      equals(t) {
        return t.min.equals(this.min) && t.max.equals(this.max);
      }
      toJSON() {
        return { min: this.min.toArray(), max: this.max.toArray() };
      }
      fromJSON(t) {
        return (this.min.fromArray(t.min), this.max.fromArray(t.max), this);
      }
    },
    Wi = [new R(), new R(), new R(), new R(), new R(), new R(), new R(), new R()],
    pi = new R(),
    Ga = new Ri(),
    ms = new R(),
    gs = new R(),
    vs = new R(),
    fr = new R(),
    pr = new R(),
    Fr = new R(),
    fo = new R(),
    Va = new R(),
    Wa = new R(),
    Ur = new R();
  function Nh(n, t, e, i, r) {
    for (let s = 0, o = n.length - 3; s <= o; s += 3) {
      Ur.fromArray(n, s);
      let a = r.x * Math.abs(Ur.x) + r.y * Math.abs(Ur.y) + r.z * Math.abs(Ur.z),
        c = t.dot(Ur),
        l = e.dot(Ur),
        h = i.dot(Ur);
      if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > a) return !1;
    }
    return !0;
  }
  var rn = new R(),
    Xa = new st(),
    ag = 0,
    Le = class extends Ai {
      constructor(t, e, i = !1) {
        if ((super(), Array.isArray(t))) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        ((this.isBufferAttribute = !0),
          Object.defineProperty(this, "id", { value: ag++ }),
          (this.name = ""),
          (this.array = t),
          (this.itemSize = e),
          (this.count = t !== void 0 ? t.length / e : 0),
          (this.normalized = i),
          (this.usage = Tu),
          (this.updateRanges = []),
          (this.gpuType = ti),
          (this.version = 0),
          (this._normalizationScale = t !== void 0 ? Ul(t) : void 0));
      }
      onUploadCallback() {}
      set needsUpdate(t) {
        t === !0 && this.version++;
      }
      setUsage(t) {
        return ((this.usage = t), this);
      }
      addUpdateRange(t, e) {
        this.updateRanges.push({ start: t, count: e });
      }
      clearUpdateRanges() {
        this.updateRanges.length = 0;
      }
      copy(t) {
        return (
          (this.name = t.name),
          (this.array = new t.array.constructor(t.array)),
          (this.itemSize = t.itemSize),
          (this.count = t.count),
          (this.normalized = t.normalized),
          (this.usage = t.usage),
          (this.gpuType = t.gpuType),
          (this._normalizationScale = t._normalizationScale),
          this
        );
      }
      copyAt(t, e, i) {
        ((t *= this.itemSize), (i *= e.itemSize));
        for (let r = 0, s = this.itemSize; r < s; r++) this.array[t + r] = e.array[i + r];
        return this;
      }
      copyArray(t) {
        return (this.array.set(t), this);
      }
      applyMatrix3(t) {
        if (this.itemSize === 2)
          for (let e = 0, i = this.count; e < i; e++)
            (Xa.fromBufferAttribute(this, e), Xa.applyMatrix3(t), this.setXY(e, Xa.x, Xa.y));
        else if (this.itemSize === 3)
          for (let e = 0, i = this.count; e < i; e++)
            (rn.fromBufferAttribute(this, e), rn.applyMatrix3(t), this.setXYZ(e, rn.x, rn.y, rn.z));
        return this;
      }
      applyMatrix4(t) {
        for (let e = 0, i = this.count; e < i; e++)
          (rn.fromBufferAttribute(this, e), rn.applyMatrix4(t), this.setXYZ(e, rn.x, rn.y, rn.z));
        return this;
      }
      applyNormalMatrix(t) {
        for (let e = 0, i = this.count; e < i; e++)
          (rn.fromBufferAttribute(this, e), rn.applyNormalMatrix(t), this.setXYZ(e, rn.x, rn.y, rn.z));
        return this;
      }
      transformDirection(t) {
        for (let e = 0, i = this.count; e < i; e++)
          (rn.fromBufferAttribute(this, e), rn.transformDirection(t), this.setXYZ(e, rn.x, rn.y, rn.z));
        return this;
      }
      set(t, e = 0) {
        return (this.array.set(t, e), this);
      }
      getComponent(t, e) {
        let i = this.array[t * this.itemSize + e];
        return (this.normalized && (i = this._denormalize(i)), i);
      }
      setComponent(t, e, i) {
        return (this.normalized && (i = this._normalize(i)), (this.array[t * this.itemSize + e] = i), this);
      }
      getX(t) {
        let e = this.array[t * this.itemSize];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      setX(t, e) {
        return (this.normalized && (e = this._normalize(e)), (this.array[t * this.itemSize] = e), this);
      }
      getY(t) {
        let e = this.array[t * this.itemSize + 1];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      setY(t, e) {
        return (this.normalized && (e = this._normalize(e)), (this.array[t * this.itemSize + 1] = e), this);
      }
      getZ(t) {
        let e = this.array[t * this.itemSize + 2];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      setZ(t, e) {
        return (this.normalized && (e = this._normalize(e)), (this.array[t * this.itemSize + 2] = e), this);
      }
      getW(t) {
        let e = this.array[t * this.itemSize + 3];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      setW(t, e) {
        return (this.normalized && (e = this._normalize(e)), (this.array[t * this.itemSize + 3] = e), this);
      }
      setXY(t, e, i) {
        return (
          (t *= this.itemSize),
          this.normalized && ((e = this._normalize(e)), (i = this._normalize(i))),
          (this.array[t + 0] = e),
          (this.array[t + 1] = i),
          this
        );
      }
      setXYZ(t, e, i, r) {
        return (
          (t *= this.itemSize),
          this.normalized && ((e = this._normalize(e)), (i = this._normalize(i)), (r = this._normalize(r))),
          (this.array[t + 0] = e),
          (this.array[t + 1] = i),
          (this.array[t + 2] = r),
          this
        );
      }
      setXYZW(t, e, i, r, s) {
        return (
          (t *= this.itemSize),
          this.normalized &&
            ((e = this._normalize(e)), (i = this._normalize(i)), (r = this._normalize(r)), (s = this._normalize(s))),
          (this.array[t + 0] = e),
          (this.array[t + 1] = i),
          (this.array[t + 2] = r),
          (this.array[t + 3] = s),
          this
        );
      }
      onUpload(t) {
        return ((this.onUploadCallback = t), this);
      }
      clone() {
        return new this.constructor(this.array, this.itemSize).copy(this);
      }
      toJSON() {
        let t = {
          itemSize: this.itemSize,
          type: this.array.constructor.name,
          array: Array.from(this.array),
          normalized: this.normalized,
        };
        return ((t.name = this.name), (t.usage = this.usage), (t.gpuType = this.gpuType), t);
      }
      dispose() {
        this.dispatchEvent({ type: "dispose" });
      }
      _denormalize(t) {
        let e = this._normalizationScale;
        return e !== void 0 ? Math.max(t / e, -1) : vp(t, this.array);
      }
      _normalize(t) {
        let e = this._normalizationScale;
        return e !== void 0 ? Math.round(t * e) : xp(t, this.array);
      }
    };
  var Po = class extends Le {
    constructor(t, e, i) {
      super(new Uint16Array(t), e, i);
    }
  };
  var Lo = class extends Le {
    constructor(t, e, i) {
      super(new Uint32Array(t), e, i);
    }
  };
  var ge = class extends Le {
      constructor(t, e, i) {
        super(new Float32Array(t), e, i);
      }
    },
    cg = new Ri(),
    po = new R(),
    Fh = new R(),
    ji = class {
      constructor(t = new R(), e = -1) {
        ((this.isSphere = !0), (this.center = t), (this.radius = e));
      }
      set(t, e) {
        return (this.center.copy(t), (this.radius = e), this);
      }
      setFromPoints(t, e) {
        let i = this.center;
        e !== void 0 ? i.copy(e) : cg.setFromPoints(t).getCenter(i);
        let r = 0;
        for (let s = 0, o = t.length; s < o; s++) r = Math.max(r, i.distanceToSquared(t[s]));
        return ((this.radius = Math.sqrt(r)), this);
      }
      copy(t) {
        return (this.center.copy(t.center), (this.radius = t.radius), this);
      }
      isEmpty() {
        return this.radius < 0;
      }
      makeEmpty() {
        return (this.center.set(0, 0, 0), (this.radius = -1), this);
      }
      containsPoint(t) {
        return t.distanceToSquared(this.center) <= this.radius * this.radius;
      }
      distanceToPoint(t) {
        return t.distanceTo(this.center) - this.radius;
      }
      intersectsSphere(t) {
        let e = this.radius + t.radius;
        return t.center.distanceToSquared(this.center) <= e * e;
      }
      intersectsBox(t) {
        return t.intersectsSphere(this);
      }
      intersectsPlane(t) {
        return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
      }
      clampPoint(t, e) {
        let i = this.center.distanceToSquared(t);
        return (
          e.copy(t),
          i > this.radius * this.radius &&
            (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)),
          e
        );
      }
      getBoundingBox(t) {
        return this.isEmpty()
          ? (t.makeEmpty(), t)
          : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
      }
      applyMatrix4(t) {
        return (this.center.applyMatrix4(t), (this.radius = this.radius * t.getMaxScaleOnAxis()), this);
      }
      translate(t) {
        return (this.center.add(t), this);
      }
      expandByPoint(t) {
        if (this.isEmpty()) return (this.center.copy(t), (this.radius = 0), this);
        po.subVectors(t, this.center);
        let e = po.lengthSq();
        if (e > this.radius * this.radius) {
          let i = Math.sqrt(e),
            r = (i - this.radius) * 0.5;
          (this.center.addScaledVector(po, r / i), (this.radius += r));
        }
        return this;
      }
      union(t) {
        return t.isEmpty()
          ? this
          : this.isEmpty()
            ? (this.copy(t), this)
            : (this.center.equals(t.center) === !0
                ? (this.radius = Math.max(this.radius, t.radius))
                : (Fh.subVectors(t.center, this.center).setLength(t.radius),
                  this.expandByPoint(po.copy(t.center).add(Fh)),
                  this.expandByPoint(po.copy(t.center).sub(Fh))),
              this);
      }
      equals(t) {
        return t.center.equals(this.center) && t.radius === this.radius;
      }
      clone() {
        return new this.constructor().copy(this);
      }
      toJSON() {
        return { radius: this.radius, center: this.center.toArray() };
      }
      fromJSON(t) {
        return ((this.radius = t.radius), this.center.fromArray(t.center), this);
      }
    },
    lg = 0,
    jn = new le(),
    Uh = new yn(),
    xs = new R(),
    Gn = new Ri(),
    mo = new Ri(),
    vn = new R(),
    Ae = class n extends Ai {
      constructor() {
        (super(),
          (this.isBufferGeometry = !0),
          Object.defineProperty(this, "id", { value: lg++ }),
          (this.uuid = Er()),
          (this.name = ""),
          (this.type = "BufferGeometry"),
          (this.index = null),
          (this.indirect = null),
          (this.indirectOffset = 0),
          (this.attributes = {}),
          (this.morphAttributes = {}),
          (this.morphTargetsRelative = !1),
          (this.groups = []),
          (this.boundingBox = null),
          (this.boundingSphere = null),
          (this.drawRange = { start: 0, count: 1 / 0 }),
          (this.userData = {}),
          (this._transformed = !1));
      }
      getIndex() {
        return this.index;
      }
      setIndex(t) {
        return (Array.isArray(t) ? (this.index = new (Y0(t) ? Lo : Po)(t, 1)) : (this.index = t), this);
      }
      setIndirect(t, e = 0) {
        return ((this.indirect = t), (this.indirectOffset = e), this);
      }
      getIndirect() {
        return this.indirect;
      }
      getAttribute(t) {
        return this.attributes[t];
      }
      setAttribute(t, e) {
        return ((this.attributes[t] = e), this);
      }
      deleteAttribute(t) {
        return (delete this.attributes[t], this);
      }
      hasAttribute(t) {
        return this.attributes[t] !== void 0;
      }
      addGroup(t, e, i = 0) {
        this.groups.push({ start: t, count: e, materialIndex: i });
      }
      clearGroups() {
        this.groups = [];
      }
      setDrawRange(t, e) {
        ((this.drawRange.start = t), (this.drawRange.count = e));
      }
      applyMatrix4(t) {
        let e = this.attributes.position;
        e !== void 0 && (e.applyMatrix4(t), (e.needsUpdate = !0));
        let i = this.attributes.normal;
        if (i !== void 0) {
          let s = new Kt().getNormalMatrix(t);
          (i.applyNormalMatrix(s), (i.needsUpdate = !0));
        }
        let r = this.attributes.tangent;
        return (
          r !== void 0 && (r.transformDirection(t), (r.needsUpdate = !0)),
          this.boundingBox !== null && this.computeBoundingBox(),
          this.boundingSphere !== null && this.computeBoundingSphere(),
          (this._transformed = !0),
          this
        );
      }
      applyQuaternion(t) {
        return (jn.makeRotationFromQuaternion(t), this.applyMatrix4(jn), this);
      }
      rotateX(t) {
        return (jn.makeRotationX(t), this.applyMatrix4(jn), this);
      }
      rotateY(t) {
        return (jn.makeRotationY(t), this.applyMatrix4(jn), this);
      }
      rotateZ(t) {
        return (jn.makeRotationZ(t), this.applyMatrix4(jn), this);
      }
      translate(t, e, i) {
        return (jn.makeTranslation(t, e, i), this.applyMatrix4(jn), this);
      }
      scale(t, e, i) {
        return (jn.makeScale(t, e, i), this.applyMatrix4(jn), this);
      }
      lookAt(t) {
        return (Uh.lookAt(t), Uh.updateMatrix(), this.applyMatrix4(Uh.matrix), this);
      }
      center() {
        return (
          this.computeBoundingBox(),
          this.boundingBox.getCenter(xs).negate(),
          this.translate(xs.x, xs.y, xs.z),
          this
        );
      }
      setFromPoints(t) {
        let e = this.getAttribute("position");
        if (e === void 0) {
          let i = [];
          for (let r = 0, s = t.length; r < s; r++) {
            let o = t[r];
            i.push(o.x, o.y, o.z || 0);
          }
          this.setAttribute("position", new ge(i, 3));
        } else {
          let i = Math.min(t.length, e.count);
          for (let r = 0; r < i; r++) {
            let s = t[r];
            e.setXYZ(r, s.x, s.y, s.z || 0);
          }
          (t.length > e.count &&
            Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),
            (e.needsUpdate = !0));
        }
        return this;
      }
      computeBoundingBox() {
        this.boundingBox === null && (this.boundingBox = new Ri());
        let t = this.attributes.position,
          e = this.morphAttributes.position;
        if (t && t.isGLBufferAttribute) {
          (qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this),
            this.boundingBox.set(new R(-1 / 0, -1 / 0, -1 / 0), new R(1 / 0, 1 / 0, 1 / 0)));
          return;
        }
        if (t !== void 0) {
          if ((this.boundingBox.setFromBufferAttribute(t), e))
            for (let i = 0, r = e.length; i < r; i++) {
              let s = e[i];
              (Gn.setFromBufferAttribute(s),
                this.morphTargetsRelative
                  ? (vn.addVectors(this.boundingBox.min, Gn.min),
                    this.boundingBox.expandByPoint(vn),
                    vn.addVectors(this.boundingBox.max, Gn.max),
                    this.boundingBox.expandByPoint(vn))
                  : (this.boundingBox.expandByPoint(Gn.min), this.boundingBox.expandByPoint(Gn.max)));
            }
        } else this.boundingBox.makeEmpty();
        (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) &&
          qt(
            'BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
            this,
          );
      }
      computeBoundingSphere() {
        this.boundingSphere === null && (this.boundingSphere = new ji());
        let t = this.attributes.position,
          e = this.morphAttributes.position;
        if (t && t.isGLBufferAttribute) {
          (qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this),
            this.boundingSphere.set(new R(), 1 / 0));
          return;
        }
        if (t) {
          let i = this.boundingSphere.center;
          if ((Gn.setFromBufferAttribute(t), e))
            for (let s = 0, o = e.length; s < o; s++) {
              let a = e[s];
              (mo.setFromBufferAttribute(a),
                this.morphTargetsRelative
                  ? (vn.addVectors(Gn.min, mo.min),
                    Gn.expandByPoint(vn),
                    vn.addVectors(Gn.max, mo.max),
                    Gn.expandByPoint(vn))
                  : (Gn.expandByPoint(mo.min), Gn.expandByPoint(mo.max)));
            }
          Gn.getCenter(i);
          let r = 0;
          for (let s = 0, o = t.count; s < o; s++)
            (vn.fromBufferAttribute(t, s), (r = Math.max(r, i.distanceToSquared(vn))));
          if (e)
            for (let s = 0, o = e.length; s < o; s++) {
              let a = e[s],
                c = this.morphTargetsRelative;
              for (let l = 0, h = a.count; l < h; l++)
                (vn.fromBufferAttribute(a, l),
                  c && (xs.fromBufferAttribute(t, l), vn.add(xs)),
                  (r = Math.max(r, i.distanceToSquared(vn))));
            }
          ((this.boundingSphere.radius = Math.sqrt(r)),
            isNaN(this.boundingSphere.radius) &&
              qt(
                'BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
                this,
              ));
        }
      }
      computeTangents() {
        let t = this.index,
          e = this.attributes;
        if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
          qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
          return;
        }
        let i = e.position,
          r = e.normal,
          s = e.uv,
          o = this.getAttribute("tangent");
        (o === void 0 || o.count !== i.count) &&
          ((o = new Le(new Float32Array(4 * i.count), 4)), this.setAttribute("tangent", o));
        let a = [],
          c = [],
          l = new Uint8Array(i.count);
        for (let F = 0; F < i.count; F++) ((a[F] = new R()), (c[F] = new R()));
        let h = new R(),
          u = new R(),
          d = new R(),
          f = new st(),
          p = new st(),
          x = new st(),
          g = new R(),
          m = new R();
        function y(F, I, N) {
          ((l[F] = l[I] = l[N] = 1),
            h.fromBufferAttribute(i, F),
            u.fromBufferAttribute(i, I),
            d.fromBufferAttribute(i, N),
            f.fromBufferAttribute(s, F),
            p.fromBufferAttribute(s, I),
            x.fromBufferAttribute(s, N),
            u.sub(h),
            d.sub(h),
            p.sub(f),
            x.sub(f));
          let B = 1 / (p.x * x.y - x.x * p.y);
          isFinite(B) &&
            (g.copy(u).multiplyScalar(x.y).addScaledVector(d, -p.y).multiplyScalar(B),
            m.copy(d).multiplyScalar(p.x).addScaledVector(u, -x.x).multiplyScalar(B),
            a[F].add(g),
            a[I].add(g),
            a[N].add(g),
            c[F].add(m),
            c[I].add(m),
            c[N].add(m));
        }
        let E = this.groups;
        E.length === 0 && (E = [{ start: 0, count: t.count }]);
        for (let F = 0, I = E.length; F < I; ++F) {
          let N = E[F],
            B = N.start,
            X = N.count;
          for (let P = B, H = B + X; P < H; P += 3) y(t.getX(P + 0), t.getX(P + 1), t.getX(P + 2));
        }
        let _ = new R(),
          T = new R(),
          w = new R(),
          v = new R();
        function S(F) {
          (w.fromBufferAttribute(r, F), v.copy(w));
          let I = a[F];
          (_.copy(I), _.sub(w.multiplyScalar(w.dot(I))).normalize(), T.crossVectors(v, I));
          let B = T.dot(c[F]) < 0 ? -1 : 1;
          o.setXYZW(F, _.x, _.y, _.z, B);
        }
        for (let F = 0, I = i.count; F < I; ++F) l[F] && S(F);
        this._transformed = !0;
      }
      computeVertexNormals() {
        let t = this.index,
          e = this.getAttribute("position");
        if (e !== void 0) {
          let i = this.getAttribute("normal");
          if (i === void 0 || i.count !== e.count)
            ((i = new Le(new Float32Array(e.count * 3), 3)), this.setAttribute("normal", i));
          else for (let d = 0, f = i.count; d < f; d++) i.setXYZ(d, 0, 0, 0);
          let r = new R(),
            s = new R(),
            o = new R(),
            a = new R(),
            c = new R(),
            l = new R(),
            h = new R(),
            u = new R();
          if (t)
            for (let d = 0, f = t.count; d < f; d += 3) {
              let p = t.getX(d + 0),
                x = t.getX(d + 1),
                g = t.getX(d + 2);
              (r.fromBufferAttribute(e, p),
                s.fromBufferAttribute(e, x),
                o.fromBufferAttribute(e, g),
                h.subVectors(o, s),
                u.subVectors(r, s),
                h.cross(u),
                a.fromBufferAttribute(i, p),
                c.fromBufferAttribute(i, x),
                l.fromBufferAttribute(i, g),
                a.add(h),
                c.add(h),
                l.add(h),
                i.setXYZ(p, a.x, a.y, a.z),
                i.setXYZ(x, c.x, c.y, c.z),
                i.setXYZ(g, l.x, l.y, l.z));
            }
          else
            for (let d = 0, f = e.count; d < f; d += 3)
              (r.fromBufferAttribute(e, d + 0),
                s.fromBufferAttribute(e, d + 1),
                o.fromBufferAttribute(e, d + 2),
                h.subVectors(o, s),
                u.subVectors(r, s),
                h.cross(u),
                i.setXYZ(d + 0, h.x, h.y, h.z),
                i.setXYZ(d + 1, h.x, h.y, h.z),
                i.setXYZ(d + 2, h.x, h.y, h.z));
          (this.normalizeNormals(), (i.needsUpdate = !0));
        }
      }
      normalizeNormals() {
        let t = this.attributes.normal;
        for (let e = 0, i = t.count; e < i; e++)
          (vn.fromBufferAttribute(t, e), vn.normalize(), t.setXYZ(e, vn.x, vn.y, vn.z));
      }
      toNonIndexed() {
        function t(a, c) {
          let l = a.array,
            h = a.itemSize,
            u = a.normalized,
            d = new l.constructor(c.length * h),
            f = 0,
            p = 0;
          for (let x = 0, g = c.length; x < g; x++) {
            a.isInterleavedBufferAttribute ? (f = c[x] * a.data.stride + a.offset) : (f = c[x] * h);
            for (let m = 0; m < h; m++) d[p++] = l[f++];
          }
          return new Le(d, h, u);
        }
        if (this.index === null)
          return (Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this);
        let e = new n(),
          i = this.index.array,
          r = this.attributes;
        for (let a in r) {
          let c = r[a],
            l = t(c, i);
          e.setAttribute(a, l);
        }
        let s = this.morphAttributes;
        for (let a in s) {
          let c = [],
            l = s[a];
          for (let h = 0, u = l.length; h < u; h++) {
            let d = l[h],
              f = t(d, i);
            c.push(f);
          }
          e.morphAttributes[a] = c;
        }
        e.morphTargetsRelative = this.morphTargetsRelative;
        let o = this.groups;
        for (let a = 0, c = o.length; a < c; a++) {
          let l = o[a];
          e.addGroup(l.start, l.count, l.materialIndex);
        }
        return e;
      }
      toJSON() {
        let t = { metadata: { version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
        if (
          ((t.uuid = this.uuid),
          (t.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type),
          (t.name = this.name),
          Object.keys(this.userData).length > 0 && (t.userData = this.userData),
          this.parameters !== void 0 && this._transformed !== !0)
        ) {
          let c = this.parameters;
          for (let l in c) c[l] !== void 0 && (t[l] = c[l]);
          return t;
        }
        t.data = { attributes: {} };
        let e = this.index;
        e !== null && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
        let i = this.attributes;
        for (let c in i) {
          let l = i[c];
          t.data.attributes[c] = l.toJSON(t.data);
        }
        let r = {},
          s = !1;
        for (let c in this.morphAttributes) {
          let l = this.morphAttributes[c],
            h = [];
          for (let u = 0, d = l.length; u < d; u++) {
            let f = l[u];
            h.push(f.toJSON(t.data));
          }
          h.length > 0 && ((r[c] = h), (s = !0));
        }
        s && ((t.data.morphAttributes = r), (t.data.morphTargetsRelative = this.morphTargetsRelative));
        let o = this.groups;
        o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
        let a = this.boundingSphere;
        return (a !== null && (t.data.boundingSphere = a.toJSON()), t);
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        ((this.index = null),
          (this.attributes = {}),
          (this.morphAttributes = {}),
          (this.groups = []),
          (this.boundingBox = null),
          (this.boundingSphere = null));
        let e = {};
        this.name = t.name;
        let i = t.index;
        i !== null && this.setIndex(i.clone());
        let r = t.attributes;
        for (let l in r) {
          let h = r[l];
          this.setAttribute(l, h.clone(e));
        }
        let s = t.morphAttributes;
        for (let l in s) {
          let h = [],
            u = s[l];
          for (let d = 0, f = u.length; d < f; d++) h.push(u[d].clone(e));
          this.morphAttributes[l] = h;
        }
        this.morphTargetsRelative = t.morphTargetsRelative;
        let o = t.groups;
        for (let l = 0, h = o.length; l < h; l++) {
          let u = o[l];
          this.addGroup(u.start, u.count, u.materialIndex);
        }
        let a = t.boundingBox;
        a !== null && (this.boundingBox = a.clone());
        let c = t.boundingSphere;
        return (
          c !== null && (this.boundingSphere = c.clone()),
          (this.drawRange.start = t.drawRange.start),
          (this.drawRange.count = t.drawRange.count),
          (this.userData = t.userData),
          (this._transformed = t._transformed),
          this
        );
      }
      dispose() {
        this.dispatchEvent({ type: "dispose" });
      }
    },
    Do = class {
      constructor(t, e) {
        ((this.isInterleavedBuffer = !0),
          (this.array = t),
          (this.stride = e),
          (this.count = t !== void 0 ? t.length / e : 0),
          (this.usage = Tu),
          (this.updateRanges = []),
          (this.version = 0),
          (this.uuid = Er()));
      }
      onUploadCallback() {}
      set needsUpdate(t) {
        t === !0 && this.version++;
      }
      setUsage(t) {
        return ((this.usage = t), this);
      }
      addUpdateRange(t, e) {
        this.updateRanges.push({ start: t, count: e });
      }
      clearUpdateRanges() {
        this.updateRanges.length = 0;
      }
      copy(t) {
        return (
          (this.array = new t.array.constructor(t.array)),
          (this.count = t.count),
          (this.stride = t.stride),
          (this.usage = t.usage),
          this
        );
      }
      copyAt(t, e, i) {
        ((t *= this.stride), (i *= e.stride));
        for (let r = 0, s = this.stride; r < s; r++) this.array[t + r] = e.array[i + r];
        return this;
      }
      set(t, e = 0) {
        return (this.array.set(t, e), this);
      }
      clone(t) {
        t.arrayBuffers === void 0 && (t.arrayBuffers = {});
        let e = hf(this.array);
        t.arrayBuffers[e] === void 0 && (t.arrayBuffers[e] = this.array.slice(0).buffer);
        let i = new this.array.constructor(t.arrayBuffers[e]),
          r = new this.constructor(i, this.stride);
        return (r.setUsage(this.usage), r);
      }
      onUpload(t) {
        return ((this.onUploadCallback = t), this);
      }
      toJSON(t) {
        t.arrayBuffers === void 0 && (t.arrayBuffers = {});
        let e = hf(this.array);
        t.arrayBuffers[e] === void 0 && (t.arrayBuffers[e] = Array.from(new Uint32Array(this.array.slice(0).buffer)));
        let i = { uuid: this.uuid, buffer: e, type: this.array.constructor.name, stride: this.stride };
        return ((i.usage = this.usage), i);
      }
    };
  function hf(n) {
    return (
      n.buffer._uuid === void 0 && (n.buffer._uuid = Er()),
      n.byteOffset === 0 && n.byteLength === n.buffer.byteLength
        ? n.buffer._uuid
        : n.buffer._uuid + ":" + n.byteOffset + ":" + n.byteLength
    );
  }
  var Bn = new R(),
    Ns = class n {
      constructor(t, e, i, r = !1) {
        ((this.isInterleavedBufferAttribute = !0),
          (this.name = ""),
          (this.data = t),
          (this.itemSize = e),
          (this.offset = i),
          (this.normalized = r),
          (this._normalizationScale = t !== void 0 ? Ul(t.array) : void 0));
      }
      get count() {
        return this.data.count;
      }
      get array() {
        return this.data.array;
      }
      set needsUpdate(t) {
        this.data.needsUpdate = t;
      }
      applyMatrix4(t) {
        for (let e = 0, i = this.data.count; e < i; e++)
          (Bn.fromBufferAttribute(this, e), Bn.applyMatrix4(t), this.setXYZ(e, Bn.x, Bn.y, Bn.z));
        return this;
      }
      applyNormalMatrix(t) {
        for (let e = 0, i = this.count; e < i; e++)
          (Bn.fromBufferAttribute(this, e), Bn.applyNormalMatrix(t), this.setXYZ(e, Bn.x, Bn.y, Bn.z));
        return this;
      }
      transformDirection(t) {
        for (let e = 0, i = this.count; e < i; e++)
          (Bn.fromBufferAttribute(this, e), Bn.transformDirection(t), this.setXYZ(e, Bn.x, Bn.y, Bn.z));
        return this;
      }
      getComponent(t, e) {
        let i = this.array[t * this.data.stride + this.offset + e];
        return (this.normalized && (i = this._denormalize(i)), i);
      }
      setComponent(t, e, i) {
        return (
          this.normalized && (i = this._normalize(i)),
          (this.data.array[t * this.data.stride + this.offset + e] = i),
          this
        );
      }
      setX(t, e) {
        return (
          this.normalized && (e = this._normalize(e)),
          (this.data.array[t * this.data.stride + this.offset] = e),
          this
        );
      }
      setY(t, e) {
        return (
          this.normalized && (e = this._normalize(e)),
          (this.data.array[t * this.data.stride + this.offset + 1] = e),
          this
        );
      }
      setZ(t, e) {
        return (
          this.normalized && (e = this._normalize(e)),
          (this.data.array[t * this.data.stride + this.offset + 2] = e),
          this
        );
      }
      setW(t, e) {
        return (
          this.normalized && (e = this._normalize(e)),
          (this.data.array[t * this.data.stride + this.offset + 3] = e),
          this
        );
      }
      getX(t) {
        let e = this.data.array[t * this.data.stride + this.offset];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      getY(t) {
        let e = this.data.array[t * this.data.stride + this.offset + 1];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      getZ(t) {
        let e = this.data.array[t * this.data.stride + this.offset + 2];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      getW(t) {
        let e = this.data.array[t * this.data.stride + this.offset + 3];
        return (this.normalized && (e = this._denormalize(e)), e);
      }
      setXY(t, e, i) {
        return (
          (t = t * this.data.stride + this.offset),
          this.normalized && ((e = this._normalize(e)), (i = this._normalize(i))),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = i),
          this
        );
      }
      setXYZ(t, e, i, r) {
        return (
          (t = t * this.data.stride + this.offset),
          this.normalized && ((e = this._normalize(e)), (i = this._normalize(i)), (r = this._normalize(r))),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = i),
          (this.data.array[t + 2] = r),
          this
        );
      }
      setXYZW(t, e, i, r, s) {
        return (
          (t = t * this.data.stride + this.offset),
          this.normalized &&
            ((e = this._normalize(e)), (i = this._normalize(i)), (r = this._normalize(r)), (s = this._normalize(s))),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = i),
          (this.data.array[t + 2] = r),
          (this.data.array[t + 3] = s),
          this
        );
      }
      clone(t) {
        if (t === void 0) {
          Ro(
            "InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.",
          );
          let e = [];
          for (let i = 0; i < this.count; i++) {
            let r = i * this.data.stride + this.offset;
            for (let s = 0; s < this.itemSize; s++) e.push(this.data.array[r + s]);
          }
          return new Le(new this.array.constructor(e), this.itemSize, this.normalized);
        } else
          return (
            t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}),
            t.interleavedBuffers[this.data.uuid] === void 0 &&
              (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)),
            new n(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized)
          );
      }
      toJSON(t) {
        if (t === void 0) {
          Ro(
            "InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.",
          );
          let e = [];
          for (let i = 0; i < this.count; i++) {
            let r = i * this.data.stride + this.offset;
            for (let s = 0; s < this.itemSize; s++) e.push(this.data.array[r + s]);
          }
          return { itemSize: this.itemSize, type: this.array.constructor.name, array: e, normalized: this.normalized };
        } else
          return (
            t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}),
            t.interleavedBuffers[this.data.uuid] === void 0 &&
              (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)),
            {
              isInterleavedBufferAttribute: !0,
              itemSize: this.itemSize,
              data: this.data.uuid,
              offset: this.offset,
              normalized: this.normalized,
            }
          );
      }
      _denormalize(t) {
        let e = this._normalizationScale;
        return e !== void 0 ? Math.max(t / e, -1) : vp(t, this.data.array);
      }
      _normalize(t) {
        let e = this._normalizationScale;
        return e !== void 0 ? Math.round(t * e) : xp(t, this.data.array);
      }
    },
    Oh = new R(),
    hg = new R(),
    ug = new Kt(),
    mi = class {
      constructor(t = new R(1, 0, 0), e = 0) {
        ((this.isPlane = !0), (this.normal = t), (this.constant = e));
      }
      set(t, e) {
        return (this.normal.copy(t), (this.constant = e), this);
      }
      setComponents(t, e, i, r) {
        return (this.normal.set(t, e, i), (this.constant = r), this);
      }
      setFromNormalAndCoplanarPoint(t, e) {
        return (this.normal.copy(t), (this.constant = -e.dot(this.normal)), this);
      }
      setFromCoplanarPoints(t, e, i) {
        let r = Oh.subVectors(i, e).cross(hg.subVectors(t, e)).normalize();
        return (this.setFromNormalAndCoplanarPoint(r, t), this);
      }
      copy(t) {
        return (this.normal.copy(t.normal), (this.constant = t.constant), this);
      }
      normalize() {
        let t = 1 / this.normal.length();
        return (this.normal.multiplyScalar(t), (this.constant *= t), this);
      }
      negate() {
        return ((this.constant *= -1), this.normal.negate(), this);
      }
      distanceToPoint(t) {
        return this.normal.dot(t) + this.constant;
      }
      distanceToSphere(t) {
        return this.distanceToPoint(t.center) - t.radius;
      }
      projectPoint(t, e) {
        return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
      }
      intersectLine(t, e, i = !0) {
        let r = t.delta(Oh),
          s = this.normal.dot(r);
        if (s === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
        let o = -(t.start.dot(this.normal) + this.constant) / s;
        return i === !0 && (o < 0 || o > 1) ? null : e.copy(t.start).addScaledVector(r, o);
      }
      intersectsLine(t) {
        let e = this.distanceToPoint(t.start),
          i = this.distanceToPoint(t.end);
        return (e < 0 && i > 0) || (i < 0 && e > 0);
      }
      intersectsBox(t) {
        return t.intersectsPlane(this);
      }
      intersectsSphere(t) {
        return t.intersectsPlane(this);
      }
      coplanarPoint(t) {
        return t.copy(this.normal).multiplyScalar(-this.constant);
      }
      applyMatrix4(t, e) {
        let i = e || ug.getNormalMatrix(t),
          r = this.coplanarPoint(Oh).applyMatrix4(t),
          s = this.normal.applyMatrix3(i).normalize();
        return ((this.constant = -r.dot(s)), this);
      }
      translate(t) {
        return ((this.constant -= t.dot(this.normal)), this);
      }
      equals(t) {
        return t.normal.equals(this.normal) && t.constant === this.constant;
      }
      clone() {
        return new this.constructor().copy(this);
      }
      toJSON() {
        return { normal: this.normal.toArray(), constant: this.constant };
      }
      fromJSON(t) {
        return (this.normal.fromArray(t.normal), (this.constant = t.constant), this);
      }
    },
    dg = 0,
    Ci = class extends Ai {
      constructor() {
        (super(),
          (this.isMaterial = !0),
          Object.defineProperty(this, "id", { value: dg++ }),
          (this.uuid = Er()),
          (this.name = ""),
          (this.type = "Material"),
          (this.blending = Vs),
          (this.side = Ii),
          (this.vertexColors = !1),
          (this.opacity = 1),
          (this.transparent = !1),
          (this.alphaHash = !1),
          (this.blendSrc = ou),
          (this.blendDst = au),
          (this.blendEquation = $r),
          (this.blendSrcAlpha = null),
          (this.blendDstAlpha = null),
          (this.blendEquationAlpha = null),
          (this.blendColor = new Tt(0, 0, 0)),
          (this.blendAlpha = 0),
          (this.depthFunc = Rs),
          (this.depthTest = !0),
          (this.depthWrite = !0),
          (this.stencilWriteMask = 255),
          (this.stencilFunc = op),
          (this.stencilRef = 0),
          (this.stencilFuncMask = 255),
          (this.stencilFail = pc),
          (this.stencilZFail = pc),
          (this.stencilZPass = pc),
          (this.stencilWrite = !1),
          (this.clippingPlanes = null),
          (this.clipIntersection = !1),
          (this.clipShadows = !1),
          (this.shadowSide = null),
          (this.colorWrite = !0),
          (this.precision = null),
          (this.polygonOffset = !1),
          (this.polygonOffsetFactor = 0),
          (this.polygonOffsetUnits = 0),
          (this.dithering = !1),
          (this.alphaToCoverage = !1),
          (this.premultipliedAlpha = !1),
          (this.forceSinglePass = !1),
          (this.allowOverride = !0),
          (this.visible = !0),
          (this.toneMapped = !0),
          (this.userData = {}),
          (this.version = 0),
          (this._alphaTest = 0));
      }
      get alphaTest() {
        return this._alphaTest;
      }
      set alphaTest(t) {
        (this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t));
      }
      onBeforeRender() {}
      onBeforeCompile() {}
      customProgramCacheKey() {
        return this.onBeforeCompile.toString();
      }
      setValues(t) {
        if (t !== void 0)
          for (let e in t) {
            let i = t[e];
            if (i === void 0) {
              Vt(`Material: parameter '${e}' has value of undefined.`);
              continue;
            }
            let r = this[e];
            if (r === void 0) {
              Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);
              continue;
            }
            r && r.isColor
              ? r.set(i)
              : (r && r.isVector2 && i && i.isVector2) ||
                  (r && r.isEuler && i && i.isEuler) ||
                  (r && r.isVector3 && i && i.isVector3)
                ? r.copy(i)
                : (this[e] = i);
          }
      }
      toJSON(t) {
        let e = t === void 0 || typeof t == "string";
        e && (t = { textures: {}, images: {} });
        let i = { metadata: { version: 4.7, type: "Material", generator: "Material.toJSON" } };
        ((i.uuid = this.uuid),
          (i.type = this.type),
          (i.blending = this.blending),
          (i.side = this.side),
          (i.shadowSide = this.shadowSide),
          (i.vertexColors = this.vertexColors),
          (i.opacity = this.opacity),
          (i.transparent = this.transparent),
          (i.blendSrc = this.blendSrc),
          (i.blendDst = this.blendDst),
          (i.blendEquation = this.blendEquation),
          (i.blendSrcAlpha = this.blendSrcAlpha),
          (i.blendDstAlpha = this.blendDstAlpha),
          (i.blendEquationAlpha = this.blendEquationAlpha),
          (i.blendColor = this.blendColor.getHex()),
          (i.blendAlpha = this.blendAlpha),
          (i.depthFunc = this.depthFunc),
          (i.depthTest = this.depthTest),
          (i.depthWrite = this.depthWrite),
          (i.colorWrite = this.colorWrite),
          (i.clipIntersection = this.clipIntersection),
          (i.clipShadows = this.clipShadows),
          (i.stencilWriteMask = this.stencilWriteMask),
          (i.stencilFunc = this.stencilFunc),
          (i.stencilRef = this.stencilRef),
          (i.stencilFuncMask = this.stencilFuncMask),
          (i.stencilFail = this.stencilFail),
          (i.stencilZFail = this.stencilZFail),
          (i.stencilZPass = this.stencilZPass),
          (i.stencilWrite = this.stencilWrite),
          (i.polygonOffset = this.polygonOffset),
          (i.polygonOffsetFactor = this.polygonOffsetFactor),
          (i.polygonOffsetUnits = this.polygonOffsetUnits),
          (i.dithering = this.dithering),
          (i.alphaTest = this.alphaTest),
          (i.alphaHash = this.alphaHash),
          (i.alphaToCoverage = this.alphaToCoverage),
          (i.premultipliedAlpha = this.premultipliedAlpha),
          (i.forceSinglePass = this.forceSinglePass),
          (i.allowOverride = this.allowOverride),
          (i.visible = this.visible),
          (i.toneMapped = this.toneMapped),
          (i.name = this.name),
          this.color && this.color.isColor && (i.color = this.color.getHex()),
          this.roughness !== void 0 && (i.roughness = this.roughness),
          this.metalness !== void 0 && (i.metalness = this.metalness),
          this.sheen !== void 0 && (i.sheen = this.sheen),
          this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()),
          this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness),
          this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()),
          this.emissiveIntensity !== void 0 && (i.emissiveIntensity = this.emissiveIntensity),
          this.specular && this.specular.isColor && (i.specular = this.specular.getHex()),
          this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity),
          this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()),
          this.shininess !== void 0 && (i.shininess = this.shininess),
          this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat),
          this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness),
          this.diffuseRoughness !== void 0 && (i.diffuseRoughness = this.diffuseRoughness),
          this.diffuseRoughnessMap &&
            this.diffuseRoughnessMap.isTexture &&
            (i.diffuseRoughnessMap = this.diffuseRoughnessMap.toJSON(t).uuid),
          this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
          this.clearcoatRoughnessMap &&
            this.clearcoatRoughnessMap.isTexture &&
            (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
          this.clearcoatNormalMap &&
            this.clearcoatNormalMap.isTexture &&
            ((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
            (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
          this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(t).uuid),
          this.sheenRoughnessMap &&
            this.sheenRoughnessMap.isTexture &&
            (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid),
          this.dispersion !== void 0 && (i.dispersion = this.dispersion),
          this.retroreflectivity !== void 0 && (i.retroreflectivity = this.retroreflectivity),
          this.iridescence !== void 0 && (i.iridescence = this.iridescence),
          this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR),
          this.iridescenceThicknessMinimum !== void 0 &&
            (i.iridescenceThicknessMinimum = this.iridescenceThicknessMinimum),
          this.iridescenceThicknessMaximum !== void 0 &&
            (i.iridescenceThicknessMaximum = this.iridescenceThicknessMaximum),
          this.iridescenceMap &&
            this.iridescenceMap.isTexture &&
            (i.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
          this.iridescenceThicknessMap &&
            this.iridescenceThicknessMap.isTexture &&
            (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid),
          this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy),
          this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation),
          this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
          this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid),
          this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(t).uuid),
          this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(t).uuid),
          this.lightMap &&
            this.lightMap.isTexture &&
            ((i.lightMap = this.lightMap.toJSON(t).uuid), (i.lightMapIntensity = this.lightMapIntensity)),
          this.aoMap &&
            this.aoMap.isTexture &&
            ((i.aoMap = this.aoMap.toJSON(t).uuid), (i.aoMapIntensity = this.aoMapIntensity)),
          this.bumpMap &&
            this.bumpMap.isTexture &&
            ((i.bumpMap = this.bumpMap.toJSON(t).uuid), (i.bumpScale = this.bumpScale)),
          this.normalMap &&
            this.normalMap.isTexture &&
            ((i.normalMap = this.normalMap.toJSON(t).uuid),
            (i.normalMapType = this.normalMapType),
            (i.normalScale = this.normalScale.toArray())),
          this.displacementMap &&
            this.displacementMap.isTexture &&
            ((i.displacementMap = this.displacementMap.toJSON(t).uuid),
            (i.displacementScale = this.displacementScale),
            (i.displacementBias = this.displacementBias)),
          this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(t).uuid),
          this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(t).uuid),
          this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(t).uuid),
          this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(t).uuid),
          this.specularIntensityMap &&
            this.specularIntensityMap.isTexture &&
            (i.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid),
          this.specularColorMap &&
            this.specularColorMap.isTexture &&
            (i.specularColorMap = this.specularColorMap.toJSON(t).uuid),
          this.envMap &&
            this.envMap.isTexture &&
            ((i.envMap = this.envMap.toJSON(t).uuid), this.combine !== void 0 && (i.combine = this.combine)),
          this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()),
          this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity),
          this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity),
          this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio),
          this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(t).uuid),
          this.transmission !== void 0 && (i.transmission = this.transmission),
          this.transmissionMap &&
            this.transmissionMap.isTexture &&
            (i.transmissionMap = this.transmissionMap.toJSON(t).uuid),
          this.thickness !== void 0 && (i.thickness = this.thickness),
          this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(t).uuid),
          this.attenuationDistance !== void 0 && (i.attenuationDistance = this.attenuationDistance),
          this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()),
          this.size !== void 0 && (i.size = this.size),
          this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation),
          Array.isArray(this.clippingPlanes) &&
            this.clippingPlanes.length > 0 &&
            (i.clippingPlanes = this.clippingPlanes.map((s) => s.toJSON())),
          this.rotation !== void 0 && (i.rotation = this.rotation),
          this.depthPacking !== void 0 && (i.depthPacking = this.depthPacking),
          this.linewidth !== void 0 && (i.linewidth = this.linewidth),
          this.linecap !== void 0 && (i.linecap = this.linecap),
          this.linejoin !== void 0 && (i.linejoin = this.linejoin),
          this.dashSize !== void 0 && (i.dashSize = this.dashSize),
          this.gapSize !== void 0 && (i.gapSize = this.gapSize),
          this.scale !== void 0 && (i.scale = this.scale),
          this.wireframe !== void 0 && (i.wireframe = this.wireframe),
          this.wireframeLinewidth !== void 0 && (i.wireframeLinewidth = this.wireframeLinewidth),
          this.wireframeLinecap !== void 0 && (i.wireframeLinecap = this.wireframeLinecap),
          this.wireframeLinejoin !== void 0 && (i.wireframeLinejoin = this.wireframeLinejoin),
          this.flatShading !== void 0 && (i.flatShading = this.flatShading),
          this.fog !== void 0 && (i.fog = this.fog),
          Object.keys(this.userData).length > 0 && (i.userData = this.userData));
        function r(s) {
          let o = [];
          for (let a in s) {
            let c = s[a];
            (delete c.metadata, o.push(c));
          }
          return o;
        }
        if (e) {
          let s = r(t.textures),
            o = r(t.images);
          (s.length > 0 && (i.textures = s), o.length > 0 && (i.images = o));
        }
        return i;
      }
      fromJSON(t, e) {
        if (
          (t.uuid !== void 0 && (this.uuid = t.uuid),
          t.name !== void 0 && (this.name = t.name),
          t.color !== void 0 && this.color !== void 0 && this.color.setHex(t.color),
          t.roughness !== void 0 && (this.roughness = t.roughness),
          t.metalness !== void 0 && (this.metalness = t.metalness),
          t.sheen !== void 0 && (this.sheen = t.sheen),
          t.sheenColor !== void 0 && (this.sheenColor = new Tt().setHex(t.sheenColor)),
          t.sheenRoughness !== void 0 && (this.sheenRoughness = t.sheenRoughness),
          t.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(t.emissive),
          t.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(t.specular),
          t.specularIntensity !== void 0 && (this.specularIntensity = t.specularIntensity),
          t.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(t.specularColor),
          t.shininess !== void 0 && (this.shininess = t.shininess),
          t.clearcoat !== void 0 && (this.clearcoat = t.clearcoat),
          t.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = t.clearcoatRoughness),
          t.diffuseRoughness !== void 0 && (this.diffuseRoughness = t.diffuseRoughness),
          t.dispersion !== void 0 && (this.dispersion = t.dispersion),
          t.retroreflectivity !== void 0 && (this.retroreflectivity = t.retroreflectivity),
          t.iridescence !== void 0 && (this.iridescence = t.iridescence),
          t.iridescenceIOR !== void 0 && (this.iridescenceIOR = t.iridescenceIOR),
          t.iridescenceThicknessMinimum !== void 0 &&
            (this.iridescenceThicknessMinimum = t.iridescenceThicknessMinimum),
          t.iridescenceThicknessMaximum !== void 0 &&
            (this.iridescenceThicknessMaximum = t.iridescenceThicknessMaximum),
          t.iridescenceThicknessRange !== void 0 &&
            ((this.iridescenceThicknessMinimum = t.iridescenceThicknessRange[0]),
            (this.iridescenceThicknessMaximum = t.iridescenceThicknessRange[1])),
          t.transmission !== void 0 && (this.transmission = t.transmission),
          t.thickness !== void 0 && (this.thickness = t.thickness),
          t.attenuationDistance !== void 0 && (this.attenuationDistance = t.attenuationDistance),
          t.attenuationColor !== void 0 &&
            this.attenuationColor !== void 0 &&
            this.attenuationColor.setHex(t.attenuationColor),
          t.anisotropy !== void 0 && (this.anisotropy = t.anisotropy),
          t.anisotropyRotation !== void 0 && (this.anisotropyRotation = t.anisotropyRotation),
          t.fog !== void 0 && (this.fog = t.fog),
          t.flatShading !== void 0 && (this.flatShading = t.flatShading),
          t.blending !== void 0 && (this.blending = t.blending),
          t.combine !== void 0 && (this.combine = t.combine),
          t.side !== void 0 && (this.side = t.side),
          t.shadowSide !== void 0 && (this.shadowSide = t.shadowSide),
          t.opacity !== void 0 && (this.opacity = t.opacity),
          t.transparent !== void 0 && (this.transparent = t.transparent),
          t.alphaTest !== void 0 && (this.alphaTest = t.alphaTest),
          t.alphaHash !== void 0 && (this.alphaHash = t.alphaHash),
          t.depthFunc !== void 0 && (this.depthFunc = t.depthFunc),
          t.depthTest !== void 0 && (this.depthTest = t.depthTest),
          t.depthWrite !== void 0 && (this.depthWrite = t.depthWrite),
          t.colorWrite !== void 0 && (this.colorWrite = t.colorWrite),
          t.clippingPlanes !== void 0 && (this.clippingPlanes = t.clippingPlanes.map((i) => new mi().fromJSON(i))),
          t.clipIntersection !== void 0 && (this.clipIntersection = t.clipIntersection),
          t.clipShadows !== void 0 && (this.clipShadows = t.clipShadows),
          t.depthPacking !== void 0 && (this.depthPacking = t.depthPacking),
          t.blendSrc !== void 0 && (this.blendSrc = t.blendSrc),
          t.blendDst !== void 0 && (this.blendDst = t.blendDst),
          t.blendEquation !== void 0 && (this.blendEquation = t.blendEquation),
          t.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = t.blendSrcAlpha),
          t.blendDstAlpha !== void 0 && (this.blendDstAlpha = t.blendDstAlpha),
          t.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = t.blendEquationAlpha),
          t.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(t.blendColor),
          t.blendAlpha !== void 0 && (this.blendAlpha = t.blendAlpha),
          t.stencilWriteMask !== void 0 && (this.stencilWriteMask = t.stencilWriteMask),
          t.stencilFunc !== void 0 && (this.stencilFunc = t.stencilFunc),
          t.stencilRef !== void 0 && (this.stencilRef = t.stencilRef),
          t.stencilFuncMask !== void 0 && (this.stencilFuncMask = t.stencilFuncMask),
          t.stencilFail !== void 0 && (this.stencilFail = t.stencilFail),
          t.stencilZFail !== void 0 && (this.stencilZFail = t.stencilZFail),
          t.stencilZPass !== void 0 && (this.stencilZPass = t.stencilZPass),
          t.stencilWrite !== void 0 && (this.stencilWrite = t.stencilWrite),
          t.wireframe !== void 0 && (this.wireframe = t.wireframe),
          t.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = t.wireframeLinewidth),
          t.wireframeLinecap !== void 0 && (this.wireframeLinecap = t.wireframeLinecap),
          t.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = t.wireframeLinejoin),
          t.rotation !== void 0 && (this.rotation = t.rotation),
          t.linewidth !== void 0 && (this.linewidth = t.linewidth),
          t.linecap !== void 0 && (this.linecap = t.linecap),
          t.linejoin !== void 0 && (this.linejoin = t.linejoin),
          t.dashSize !== void 0 && (this.dashSize = t.dashSize),
          t.gapSize !== void 0 && (this.gapSize = t.gapSize),
          t.scale !== void 0 && (this.scale = t.scale),
          t.polygonOffset !== void 0 && (this.polygonOffset = t.polygonOffset),
          t.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = t.polygonOffsetFactor),
          t.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = t.polygonOffsetUnits),
          t.dithering !== void 0 && (this.dithering = t.dithering),
          t.alphaToCoverage !== void 0 && (this.alphaToCoverage = t.alphaToCoverage),
          t.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = t.premultipliedAlpha),
          t.forceSinglePass !== void 0 && (this.forceSinglePass = t.forceSinglePass),
          t.allowOverride !== void 0 && (this.allowOverride = t.allowOverride),
          t.visible !== void 0 && (this.visible = t.visible),
          t.toneMapped !== void 0 && (this.toneMapped = t.toneMapped),
          t.userData !== void 0 && (this.userData = t.userData),
          t.vertexColors !== void 0 &&
            (typeof t.vertexColors == "number"
              ? (this.vertexColors = t.vertexColors > 0)
              : (this.vertexColors = t.vertexColors)),
          t.size !== void 0 && (this.size = t.size),
          t.sizeAttenuation !== void 0 && (this.sizeAttenuation = t.sizeAttenuation),
          t.map !== void 0 && (this.map = e[t.map] || null),
          t.matcap !== void 0 && (this.matcap = e[t.matcap] || null),
          t.alphaMap !== void 0 && (this.alphaMap = e[t.alphaMap] || null),
          t.bumpMap !== void 0 && (this.bumpMap = e[t.bumpMap] || null),
          t.bumpScale !== void 0 && (this.bumpScale = t.bumpScale),
          t.normalMap !== void 0 && (this.normalMap = e[t.normalMap] || null),
          t.normalMapType !== void 0 && (this.normalMapType = t.normalMapType),
          t.normalScale !== void 0)
        ) {
          let i = t.normalScale;
          (Array.isArray(i) === !1 && (i = [i, i]), (this.normalScale = new st().fromArray(i)));
        }
        return (
          t.displacementMap !== void 0 && (this.displacementMap = e[t.displacementMap] || null),
          t.displacementScale !== void 0 && (this.displacementScale = t.displacementScale),
          t.displacementBias !== void 0 && (this.displacementBias = t.displacementBias),
          t.roughnessMap !== void 0 && (this.roughnessMap = e[t.roughnessMap] || null),
          t.metalnessMap !== void 0 && (this.metalnessMap = e[t.metalnessMap] || null),
          t.emissiveMap !== void 0 && (this.emissiveMap = e[t.emissiveMap] || null),
          t.emissiveIntensity !== void 0 && (this.emissiveIntensity = t.emissiveIntensity),
          t.specularMap !== void 0 && (this.specularMap = e[t.specularMap] || null),
          t.specularIntensityMap !== void 0 && (this.specularIntensityMap = e[t.specularIntensityMap] || null),
          t.specularColorMap !== void 0 && (this.specularColorMap = e[t.specularColorMap] || null),
          t.envMap !== void 0 && (this.envMap = e[t.envMap] || null),
          t.envMapRotation !== void 0 && this.envMapRotation.fromArray(t.envMapRotation),
          t.envMapIntensity !== void 0 && (this.envMapIntensity = t.envMapIntensity),
          t.reflectivity !== void 0 && (this.reflectivity = t.reflectivity),
          t.refractionRatio !== void 0 && (this.refractionRatio = t.refractionRatio),
          t.lightMap !== void 0 && (this.lightMap = e[t.lightMap] || null),
          t.lightMapIntensity !== void 0 && (this.lightMapIntensity = t.lightMapIntensity),
          t.aoMap !== void 0 && (this.aoMap = e[t.aoMap] || null),
          t.aoMapIntensity !== void 0 && (this.aoMapIntensity = t.aoMapIntensity),
          t.gradientMap !== void 0 && (this.gradientMap = e[t.gradientMap] || null),
          t.clearcoatMap !== void 0 && (this.clearcoatMap = e[t.clearcoatMap] || null),
          t.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = e[t.clearcoatRoughnessMap] || null),
          t.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = e[t.clearcoatNormalMap] || null),
          t.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new st().fromArray(t.clearcoatNormalScale)),
          t.diffuseRoughnessMap !== void 0 && (this.diffuseRoughnessMap = e[t.diffuseRoughnessMap] || null),
          t.iridescenceMap !== void 0 && (this.iridescenceMap = e[t.iridescenceMap] || null),
          t.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = e[t.iridescenceThicknessMap] || null),
          t.transmissionMap !== void 0 && (this.transmissionMap = e[t.transmissionMap] || null),
          t.thicknessMap !== void 0 && (this.thicknessMap = e[t.thicknessMap] || null),
          t.anisotropyMap !== void 0 && (this.anisotropyMap = e[t.anisotropyMap] || null),
          t.sheenColorMap !== void 0 && (this.sheenColorMap = e[t.sheenColorMap] || null),
          t.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = e[t.sheenRoughnessMap] || null),
          this
        );
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        ((this.name = t.name),
          (this.blending = t.blending),
          (this.side = t.side),
          (this.vertexColors = t.vertexColors),
          (this.opacity = t.opacity),
          (this.transparent = t.transparent),
          (this.blendSrc = t.blendSrc),
          (this.blendDst = t.blendDst),
          (this.blendEquation = t.blendEquation),
          (this.blendSrcAlpha = t.blendSrcAlpha),
          (this.blendDstAlpha = t.blendDstAlpha),
          (this.blendEquationAlpha = t.blendEquationAlpha),
          this.blendColor.copy(t.blendColor),
          (this.blendAlpha = t.blendAlpha),
          (this.depthFunc = t.depthFunc),
          (this.depthTest = t.depthTest),
          (this.depthWrite = t.depthWrite),
          (this.stencilWriteMask = t.stencilWriteMask),
          (this.stencilFunc = t.stencilFunc),
          (this.stencilRef = t.stencilRef),
          (this.stencilFuncMask = t.stencilFuncMask),
          (this.stencilFail = t.stencilFail),
          (this.stencilZFail = t.stencilZFail),
          (this.stencilZPass = t.stencilZPass),
          (this.stencilWrite = t.stencilWrite));
        let e = t.clippingPlanes,
          i = null;
        if (e !== null) {
          let r = e.length;
          i = new Array(r);
          for (let s = 0; s !== r; ++s) i[s] = e[s].clone();
        }
        return (
          (this.clippingPlanes = i),
          (this.clipIntersection = t.clipIntersection),
          (this.clipShadows = t.clipShadows),
          (this.shadowSide = t.shadowSide),
          (this.colorWrite = t.colorWrite),
          (this.precision = t.precision),
          (this.polygonOffset = t.polygonOffset),
          (this.polygonOffsetFactor = t.polygonOffsetFactor),
          (this.polygonOffsetUnits = t.polygonOffsetUnits),
          (this.dithering = t.dithering),
          (this.alphaTest = t.alphaTest),
          (this.alphaHash = t.alphaHash),
          (this.alphaToCoverage = t.alphaToCoverage),
          (this.premultipliedAlpha = t.premultipliedAlpha),
          (this.forceSinglePass = t.forceSinglePass),
          (this.allowOverride = t.allowOverride),
          (this.visible = t.visible),
          (this.toneMapped = t.toneMapped),
          (this.userData = JSON.parse(JSON.stringify(t.userData))),
          this
        );
      }
      dispose() {
        this.dispatchEvent({ type: "dispose" });
      }
      set needsUpdate(t) {
        t === !0 && this.version++;
      }
    },
    Vn = class extends Ci {
      constructor(t) {
        (super(),
          (this.isSpriteMaterial = !0),
          (this.type = "SpriteMaterial"),
          (this.color = new Tt(16777215)),
          (this.map = null),
          (this.alphaMap = null),
          (this.rotation = 0),
          (this.sizeAttenuation = !0),
          (this.transparent = !0),
          (this.fog = !0),
          this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          this.color.copy(t.color),
          (this.map = t.map),
          (this.alphaMap = t.alphaMap),
          (this.rotation = t.rotation),
          (this.sizeAttenuation = t.sizeAttenuation),
          (this.fog = t.fog),
          this
        );
      }
    },
    ys,
    go = new R(),
    _s = new R(),
    bs = new R(),
    Ms = new st(),
    vo = new st(),
    _p = new le(),
    qa = new R(),
    xo = new R(),
    $a = new R(),
    uf = new st(),
    Bh = new st(),
    df = new st(),
    Jn = class extends yn {
      constructor(t = new Vn()) {
        if ((super(), (this.isSprite = !0), (this.type = "Sprite"), ys === void 0)) {
          ys = new Ae();
          let e = new Float32Array([-0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1]),
            i = new Do(e, 5);
          (ys.setIndex([0, 1, 2, 0, 2, 3]),
            ys.setAttribute("position", new Ns(i, 3, 0, !1)),
            ys.setAttribute("uv", new Ns(i, 2, 3, !1)));
        }
        ((this.geometry = ys), (this.material = t), (this.center = new st(0.5, 0.5)), (this.count = 1));
      }
      intersectsFrustum(t) {
        return t.intersectsSprite(this);
      }
      raycast(t, e) {
        (t.camera === null && qt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),
          _s.setFromMatrixScale(this.matrixWorld),
          _p.copy(t.camera.matrixWorld),
          this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld),
          bs.setFromMatrixPosition(this.modelViewMatrix),
          t.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && _s.multiplyScalar(-bs.z));
        let i = this.material.rotation,
          r,
          s;
        i !== 0 && ((s = Math.cos(i)), (r = Math.sin(i)));
        let o = this.center;
        (Ya(qa.set(-0.5, -0.5, 0), bs, o, _s, r, s),
          Ya(xo.set(0.5, -0.5, 0), bs, o, _s, r, s),
          Ya($a.set(0.5, 0.5, 0), bs, o, _s, r, s),
          uf.set(0, 0),
          Bh.set(1, 0),
          df.set(1, 1));
        let a = t.ray.intersectTriangle(qa, xo, $a, !1, go);
        if (
          a === null &&
          (Ya(xo.set(-0.5, 0.5, 0), bs, o, _s, r, s),
          Bh.set(0, 1),
          (a = t.ray.intersectTriangle(qa, $a, xo, !1, go)),
          a === null)
        )
          return;
        let c = t.ray.origin.distanceTo(go);
        c < t.near ||
          c > t.far ||
          e.push({
            distance: c,
            point: go.clone(),
            uv: qi.getInterpolation(go, qa, xo, $a, uf, Bh, df, new st()),
            face: null,
            object: this,
          });
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          t.center !== void 0 && this.center.copy(t.center),
          (this.material = t.material),
          this
        );
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return ((e.object.center = this.center.toArray()), e);
      }
    };
  function Ya(n, t, e, i, r, s) {
    (Ms.subVectors(n, e).addScalar(0.5).multiply(i),
      r !== void 0 ? ((vo.x = s * Ms.x - r * Ms.y), (vo.y = r * Ms.x + s * Ms.y)) : vo.copy(Ms),
      n.copy(t),
      (n.x += vo.x),
      (n.y += vo.y),
      n.applyMatrix4(_p));
  }
  var Xi = new R(),
    kh = new R(),
    ja = new R(),
    Ka = new R(),
    No = class {
      constructor(t = new R(), e = new R(0, 0, -1)) {
        ((this.origin = t), (this.direction = e));
      }
      set(t, e) {
        return (this.origin.copy(t), this.direction.copy(e), this);
      }
      copy(t) {
        return (this.origin.copy(t.origin), this.direction.copy(t.direction), this);
      }
      at(t, e) {
        return e.copy(this.origin).addScaledVector(this.direction, t);
      }
      lookAt(t) {
        return (this.direction.copy(t).sub(this.origin).normalize(), this);
      }
      recast(t) {
        return (this.origin.copy(this.at(t, Xi)), this);
      }
      closestPointToPoint(t, e) {
        e.subVectors(t, this.origin);
        let i = e.dot(this.direction);
        return i < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, i);
      }
      distanceToPoint(t) {
        return Math.sqrt(this.distanceSqToPoint(t));
      }
      distanceSqToPoint(t) {
        let e = Xi.subVectors(t, this.origin).dot(this.direction);
        return e < 0
          ? this.origin.distanceToSquared(t)
          : (Xi.copy(this.origin).addScaledVector(this.direction, e), Xi.distanceToSquared(t));
      }
      distanceSqToSegment(t, e, i, r) {
        (kh.copy(t).add(e).multiplyScalar(0.5), ja.copy(e).sub(t).normalize(), Ka.copy(this.origin).sub(kh));
        let s = t.distanceTo(e) * 0.5,
          o = -this.direction.dot(ja),
          a = Ka.dot(this.direction),
          c = -Ka.dot(ja),
          l = Ka.lengthSq(),
          h = Math.abs(1 - o * o),
          u,
          d,
          f,
          p;
        if (h > 0)
          if (((u = o * c - a), (d = o * a - c), (p = s * h), u >= 0))
            if (d >= -p)
              if (d <= p) {
                let x = 1 / h;
                ((u *= x), (d *= x), (f = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * c) + l));
              } else ((d = s), (u = Math.max(0, -(o * d + a))), (f = -u * u + d * (d + 2 * c) + l));
            else ((d = -s), (u = Math.max(0, -(o * d + a))), (f = -u * u + d * (d + 2 * c) + l));
          else
            d <= -p
              ? ((u = Math.max(0, -(-o * s + a))),
                (d = u > 0 ? -s : Math.min(Math.max(-s, -c), s)),
                (f = -u * u + d * (d + 2 * c) + l))
              : d <= p
                ? ((u = 0), (d = Math.min(Math.max(-s, -c), s)), (f = d * (d + 2 * c) + l))
                : ((u = Math.max(0, -(o * s + a))),
                  (d = u > 0 ? s : Math.min(Math.max(-s, -c), s)),
                  (f = -u * u + d * (d + 2 * c) + l));
        else ((d = o > 0 ? -s : s), (u = Math.max(0, -(o * d + a))), (f = -u * u + d * (d + 2 * c) + l));
        return (i && i.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(kh).addScaledVector(ja, d), f);
      }
      intersectSphere(t, e) {
        if (t.radius < 0) return null;
        Xi.subVectors(t.center, this.origin);
        let i = Xi.dot(this.direction),
          r = Xi.dot(Xi) - i * i,
          s = t.radius * t.radius;
        if (r > s) return null;
        let o = Math.sqrt(s - r),
          a = i - o,
          c = i + o;
        return c < 0 ? null : a < 0 ? this.at(c, e) : this.at(a, e);
      }
      intersectsSphere(t) {
        return t.radius < 0 ? !1 : this.distanceSqToPoint(t.center) <= t.radius * t.radius;
      }
      distanceToPlane(t) {
        let e = t.normal.dot(this.direction);
        if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
        let i = -(this.origin.dot(t.normal) + t.constant) / e;
        return i >= 0 ? i : null;
      }
      intersectPlane(t, e) {
        let i = this.distanceToPlane(t);
        return i === null ? null : this.at(i, e);
      }
      intersectsPlane(t) {
        let e = t.distanceToPoint(this.origin);
        return e === 0 || t.normal.dot(this.direction) * e < 0;
      }
      intersectBox(t, e) {
        let i,
          r,
          s,
          o,
          a,
          c,
          l = 1 / this.direction.x,
          h = 1 / this.direction.y,
          u = 1 / this.direction.z,
          d = this.origin;
        return (
          l >= 0
            ? ((i = (t.min.x - d.x) * l), (r = (t.max.x - d.x) * l))
            : ((i = (t.max.x - d.x) * l), (r = (t.min.x - d.x) * l)),
          h >= 0
            ? ((s = (t.min.y - d.y) * h), (o = (t.max.y - d.y) * h))
            : ((s = (t.max.y - d.y) * h), (o = (t.min.y - d.y) * h)),
          i > o ||
          s > r ||
          ((s > i || isNaN(i)) && (i = s),
          (o < r || isNaN(r)) && (r = o),
          u >= 0
            ? ((a = (t.min.z - d.z) * u), (c = (t.max.z - d.z) * u))
            : ((a = (t.max.z - d.z) * u), (c = (t.min.z - d.z) * u)),
          i > c || a > r) ||
          ((a > i || i !== i) && (i = a), (c < r || r !== r) && (r = c), r < 0)
            ? null
            : this.at(i >= 0 ? i : r, e)
        );
      }
      intersectsBox(t) {
        return this.intersectBox(t, Xi) !== null;
      }
      intersectTriangle(t, e, i, r, s) {
        let o = this.origin,
          a = this.direction,
          c = a.x,
          l = a.y,
          h = a.z,
          u = t.x - o.x,
          d = t.y - o.y,
          f = t.z - o.z,
          p = e.x - o.x,
          x = e.y - o.y,
          g = e.z - o.z,
          m = i.x - o.x,
          y = i.y - o.y,
          E = i.z - o.z,
          _ = Math.abs(c),
          T = Math.abs(l),
          w = Math.abs(h),
          v,
          S,
          F,
          I,
          N,
          B,
          X,
          P,
          H,
          Y,
          G,
          ot;
        if (
          (_ >= T && _ >= w
            ? ((F = c),
              (B = u),
              (H = p),
              (ot = m),
              c >= 0
                ? ((v = l), (S = h), (I = d), (N = f), (X = x), (P = g), (Y = y), (G = E))
                : ((v = h), (S = l), (I = f), (N = d), (X = g), (P = x), (Y = E), (G = y)))
            : T >= w
              ? ((F = l),
                (B = d),
                (H = x),
                (ot = y),
                l >= 0
                  ? ((v = h), (S = c), (I = f), (N = u), (X = g), (P = p), (Y = E), (G = m))
                  : ((v = c), (S = h), (I = u), (N = f), (X = p), (P = g), (Y = m), (G = E)))
              : ((F = h),
                (B = f),
                (H = g),
                (ot = E),
                h >= 0
                  ? ((v = c), (S = l), (I = u), (N = d), (X = p), (P = x), (Y = m), (G = y))
                  : ((v = l), (S = c), (I = d), (N = u), (X = x), (P = p), (Y = y), (G = m))),
          F === 0)
        )
          return null;
        let $ = v / F,
          nt = S / F,
          rt = 1 / F,
          Rt = I - $ * B,
          Ht = N - nt * B,
          K = X - $ * H,
          bt = P - nt * H,
          Ct = Y - $ * ot,
          Bt = G - nt * ot,
          Mt = Ct * bt - Bt * K,
          kt = Rt * Bt - Ht * Ct,
          We = K * Ht - bt * Rt;
        if (r) {
          if (Mt < 0 || kt < 0 || We < 0) return null;
        } else if ((Mt < 0 || kt < 0 || We < 0) && (Mt > 0 || kt > 0 || We > 0)) return null;
        let Gt = Mt + kt + We;
        if (Gt === 0) return null;
        let oe = rt * (Mt * B + kt * H + We * ot);
        return (Gt > 0 ? oe < 0 : oe > 0) ? null : this.at(oe / Gt, s);
      }
      applyMatrix4(t) {
        return (this.origin.applyMatrix4(t), this.direction.transformDirection(t), this);
      }
      equals(t) {
        return t.origin.equals(this.origin) && t.direction.equals(this.direction);
      }
      clone() {
        return new this.constructor().copy(this);
      }
    },
    $e = class extends Ci {
      constructor(t) {
        (super(),
          (this.isMeshBasicMaterial = !0),
          (this.type = "MeshBasicMaterial"),
          (this.color = new Tt(16777215)),
          (this.map = null),
          (this.lightMap = null),
          (this.lightMapIntensity = 1),
          (this.aoMap = null),
          (this.aoMapIntensity = 1),
          (this.specularMap = null),
          (this.alphaMap = null),
          (this.envMap = null),
          (this.envMapRotation = new gi()),
          (this.combine = cu),
          (this.reflectivity = 1),
          (this.refractionRatio = 0.98),
          (this.wireframe = !1),
          (this.wireframeLinewidth = 1),
          (this.wireframeLinecap = "round"),
          (this.wireframeLinejoin = "round"),
          (this.fog = !0),
          this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          this.color.copy(t.color),
          (this.map = t.map),
          (this.lightMap = t.lightMap),
          (this.lightMapIntensity = t.lightMapIntensity),
          (this.aoMap = t.aoMap),
          (this.aoMapIntensity = t.aoMapIntensity),
          (this.specularMap = t.specularMap),
          (this.alphaMap = t.alphaMap),
          (this.envMap = t.envMap),
          this.envMapRotation.copy(t.envMapRotation),
          (this.combine = t.combine),
          (this.reflectivity = t.reflectivity),
          (this.refractionRatio = t.refractionRatio),
          (this.wireframe = t.wireframe),
          (this.wireframeLinewidth = t.wireframeLinewidth),
          (this.wireframeLinecap = t.wireframeLinecap),
          (this.wireframeLinejoin = t.wireframeLinejoin),
          (this.fog = t.fog),
          this
        );
      }
    },
    ff = new le(),
    Or = new No(),
    Ja = new ji(),
    pf = new R(),
    Za = new R(),
    Qa = new R(),
    tc = new R(),
    zh = new R(),
    ec = new R(),
    mf = new R(),
    nc = new R(),
    tt = class extends yn {
      constructor(t = new Ae(), e = new $e()) {
        (super(),
          (this.isMesh = !0),
          (this.type = "Mesh"),
          (this.geometry = t),
          (this.material = e),
          (this.morphTargetDictionary = void 0),
          (this.morphTargetInfluences = void 0),
          (this.count = 1),
          this.updateMorphTargets());
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          t.morphTargetInfluences !== void 0
            ? (this.morphTargetInfluences = t.morphTargetInfluences.slice())
            : (this.morphTargetInfluences = void 0),
          t.morphTargetDictionary !== void 0
            ? (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary))
            : (this.morphTargetDictionary = void 0),
          (this.material = Array.isArray(t.material) ? t.material.slice() : t.material),
          (this.geometry = t.geometry),
          this
        );
      }
      updateMorphTargets() {
        let e = this.geometry.morphAttributes,
          i = Object.keys(e);
        if (i.length > 0) {
          let r = e[i[0]];
          if (r !== void 0) {
            ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
            for (let s = 0, o = r.length; s < o; s++) {
              let a = r[s].name || String(s);
              (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = s));
            }
          }
        }
      }
      getVertexPosition(t, e) {
        let i = this.geometry,
          r = i.attributes.position,
          s = i.morphAttributes.position,
          o = i.morphTargetsRelative;
        e.fromBufferAttribute(r, t);
        let a = this.morphTargetInfluences;
        if (s && a) {
          ec.set(0, 0, 0);
          for (let c = 0, l = s.length; c < l; c++) {
            let h = a[c],
              u = s[c];
            h !== 0 && (zh.fromBufferAttribute(u, t), o ? ec.addScaledVector(zh, h) : ec.addScaledVector(zh.sub(e), h));
          }
          e.add(ec);
        }
        return e;
      }
      intersectsFrustum(t) {
        return t.intersectsObject(this);
      }
      raycast(t, e) {
        let i = this.geometry,
          r = this.material,
          s = this.matrixWorld;
        r !== void 0 &&
          (i.boundingSphere === null && i.computeBoundingSphere(),
          Ja.copy(i.boundingSphere),
          Ja.applyMatrix4(s),
          Or.copy(t.ray).recast(t.near),
          !(
            Ja.containsPoint(Or.origin) === !1 &&
            (Or.intersectSphere(Ja, pf) === null || Or.origin.distanceToSquared(pf) > (t.far - t.near) ** 2)
          ) &&
            (ff.copy(s).invert(),
            Or.copy(t.ray).applyMatrix4(ff),
            !(i.boundingBox !== null && Or.intersectsBox(i.boundingBox) === !1) &&
              this._computeIntersections(t, e, Or)));
      }
      _computeIntersections(t, e, i) {
        let r,
          s = this.geometry,
          o = this.material,
          a = s.index,
          c = s.attributes.position,
          l = s.attributes.uv,
          h = s.attributes.uv1,
          u = s.attributes.normal,
          d = s.groups,
          f = s.drawRange;
        if (a !== null)
          if (Array.isArray(o))
            for (let p = 0, x = d.length; p < x; p++) {
              let g = d[p],
                m = o[g.materialIndex],
                y = Math.max(g.start, f.start),
                E = Math.min(a.count, Math.min(g.start + g.count, f.start + f.count));
              for (let _ = y, T = E; _ < T; _ += 3) {
                let w = a.getX(_),
                  v = a.getX(_ + 1),
                  S = a.getX(_ + 2);
                ((r = ic(this, m, t, i, l, h, u, w, v, S)),
                  r && ((r.faceIndex = Math.floor(_ / 3)), (r.face.materialIndex = g.materialIndex), e.push(r)));
              }
            }
          else {
            let p = Math.max(0, f.start),
              x = Math.min(a.count, f.start + f.count);
            for (let g = p, m = x; g < m; g += 3) {
              let y = a.getX(g),
                E = a.getX(g + 1),
                _ = a.getX(g + 2);
              ((r = ic(this, o, t, i, l, h, u, y, E, _)), r && ((r.faceIndex = Math.floor(g / 3)), e.push(r)));
            }
          }
        else if (c !== void 0)
          if (Array.isArray(o))
            for (let p = 0, x = d.length; p < x; p++) {
              let g = d[p],
                m = o[g.materialIndex],
                y = Math.max(g.start, f.start),
                E = Math.min(c.count, Math.min(g.start + g.count, f.start + f.count));
              for (let _ = y, T = E; _ < T; _ += 3) {
                let w = _,
                  v = _ + 1,
                  S = _ + 2;
                ((r = ic(this, m, t, i, l, h, u, w, v, S)),
                  r && ((r.faceIndex = Math.floor(_ / 3)), (r.face.materialIndex = g.materialIndex), e.push(r)));
              }
            }
          else {
            let p = Math.max(0, f.start),
              x = Math.min(c.count, f.start + f.count);
            for (let g = p, m = x; g < m; g += 3) {
              let y = g,
                E = g + 1,
                _ = g + 2;
              ((r = ic(this, o, t, i, l, h, u, y, E, _)), r && ((r.faceIndex = Math.floor(g / 3)), e.push(r)));
            }
          }
      }
    };
  function fg(n, t, e, i, r, s, o, a) {
    let c;
    if (
      (t.side === Sn ? (c = i.intersectTriangle(o, s, r, !0, a)) : (c = i.intersectTriangle(r, s, o, t.side === Ii, a)),
      c === null)
    )
      return null;
    (nc.copy(a), nc.applyMatrix4(n.matrixWorld));
    let l = e.ray.origin.distanceTo(nc);
    return l < e.near || l > e.far ? null : { distance: l, point: nc.clone(), object: n };
  }
  function ic(n, t, e, i, r, s, o, a, c, l) {
    (n.getVertexPosition(a, Za), n.getVertexPosition(c, Qa), n.getVertexPosition(l, tc));
    let h = fg(n, t, e, i, Za, Qa, tc, mf);
    if (h) {
      let u = new R();
      (qi.getBarycoord(mf, Za, Qa, tc, u),
        r && (h.uv = qi.getInterpolatedAttribute(r, a, c, l, u, new st())),
        s && (h.uv1 = qi.getInterpolatedAttribute(s, a, c, l, u, new st())),
        o &&
          ((h.normal = qi.getInterpolatedAttribute(o, a, c, l, u, new R())),
          h.normal.dot(i.direction) > 0 && h.normal.multiplyScalar(-1)));
      let d = { a, b: c, c: l, normal: new R(), materialIndex: 0 };
      (qi.getNormal(Za, Qa, tc, d.normal), (h.face = d), (h.barycoord = u));
    }
    return h;
  }
  var Fo = class extends In {
    constructor(t = null, e = 1, i = 1, r, s, o, a, c, l = xn, h = xn, u, d) {
      (super(null, o, a, c, l, h, r, s, u, d),
        (this.isDataTexture = !0),
        (this.image = { data: t, width: e, height: i }),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1));
    }
  };
  var Fs = class extends Le {
      constructor(t, e, i, r = 1) {
        (super(t, e, i), (this.isInstancedBufferAttribute = !0), (this.meshPerAttribute = r));
      }
      copy(t) {
        return (super.copy(t), (this.meshPerAttribute = t.meshPerAttribute), this);
      }
      toJSON() {
        let t = super.toJSON();
        return ((t.meshPerAttribute = this.meshPerAttribute), (t.isInstancedBufferAttribute = !0), t);
      }
    },
    Ss = new le(),
    gf = new le(),
    rc = [],
    vf = new Ri(),
    pg = new le(),
    yo = new tt(),
    _o = new ji(),
    Pn = class extends tt {
      constructor(t, e, i) {
        (super(t, e),
          (this.isInstancedMesh = !0),
          (this.instanceMatrix = new Fs(new Float32Array(i * 16), 16)),
          (this.instanceColor = null),
          (this.morphTexture = null),
          (this.count = i),
          (this.boundingBox = null),
          (this.boundingSphere = null));
        for (let r = 0; r < i; r++) this.setMatrixAt(r, pg);
      }
      computeBoundingBox() {
        let t = this.geometry,
          e = this.count;
        (this.boundingBox === null && (this.boundingBox = new Ri()),
          t.boundingBox === null && t.computeBoundingBox(),
          this.boundingBox.makeEmpty());
        for (let i = 0; i < e; i++)
          (this.getMatrixAt(i, Ss), vf.copy(t.boundingBox).applyMatrix4(Ss), this.boundingBox.union(vf));
      }
      computeBoundingSphere() {
        let t = this.geometry,
          e = this.count;
        (this.boundingSphere === null && (this.boundingSphere = new ji()),
          t.boundingSphere === null && t.computeBoundingSphere(),
          this.boundingSphere.makeEmpty());
        for (let i = 0; i < e; i++)
          (this.getMatrixAt(i, Ss), _o.copy(t.boundingSphere).applyMatrix4(Ss), this.boundingSphere.union(_o));
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          this.instanceMatrix.copy(t.instanceMatrix),
          (this.morphTexture = t.morphTexture !== null ? t.morphTexture.clone() : null),
          (this.instanceColor = t.instanceColor !== null ? t.instanceColor.clone() : null),
          (this.count = t.count),
          (this.boundingBox = t.boundingBox !== null ? t.boundingBox.clone() : null),
          (this.boundingSphere = t.boundingSphere !== null ? t.boundingSphere.clone() : null),
          this
        );
      }
      getColorAt(t, e) {
        return this.instanceColor === null ? e.setRGB(1, 1, 1) : e.fromArray(this.instanceColor.array, t * 3);
      }
      getMatrixAt(t, e) {
        return e.fromArray(this.instanceMatrix.array, t * 16);
      }
      getMorphAt(t, e) {
        let i = e.morphTargetInfluences,
          r = this.morphTexture.source.data.data,
          s = i.length + 1,
          o = t * s + 1;
        for (let a = 0; a < i.length; a++) i[a] = r[o + a];
      }
      raycast(t, e) {
        let i = this.matrixWorld,
          r = this.count;
        if (
          ((yo.geometry = this.geometry),
          (yo.material = this.material),
          yo.material !== void 0 &&
            (this.boundingSphere === null && this.computeBoundingSphere(),
            _o.copy(this.boundingSphere),
            _o.applyMatrix4(i),
            t.ray.intersectsSphere(_o) !== !1))
        )
          for (let s = 0; s < r; s++) {
            (this.getMatrixAt(s, Ss), gf.multiplyMatrices(i, Ss), (yo.matrixWorld = gf), yo.raycast(t, rc));
            for (let o = 0, a = rc.length; o < a; o++) {
              let c = rc[o];
              ((c.instanceId = s), (c.object = this), e.push(c));
            }
            rc.length = 0;
          }
      }
      setColorAt(t, e) {
        return (
          this.instanceColor === null &&
            (this.instanceColor = new Fs(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)),
          e.toArray(this.instanceColor.array, t * 3),
          this
        );
      }
      setMatrixAt(t, e) {
        return (e.toArray(this.instanceMatrix.array, t * 16), this);
      }
      setMorphAt(t, e) {
        let i = e.morphTargetInfluences,
          r = i.length + 1;
        this.morphTexture === null &&
          (this.morphTexture = new Fo(new Float32Array(r * this.count), r, this.count, el, ti));
        let s = this.morphTexture.source.data.data,
          o = 0;
        for (let l = 0; l < i.length; l++) o += i[l];
        let a = this.geometry.morphTargetsRelative ? 1 : 1 - o,
          c = r * t;
        return ((s[c] = a), s.set(i, c + 1), this);
      }
      updateMorphTargets() {}
      dispose() {
        (super.dispose(),
          this.instanceMatrix.dispose(),
          this.instanceColor !== null && this.instanceColor.dispose(),
          this.morphTexture !== null && (this.morphTexture.dispose(), (this.morphTexture = null)));
      }
    },
    Br = new ji(),
    mg = new st(0.5, 0.5),
    sc = new R(),
    vr = class {
      constructor(t = new mi(), e = new mi(), i = new mi(), r = new mi(), s = new mi(), o = new mi()) {
        this.planes = [t, e, i, r, s, o];
      }
      set(t, e, i, r, s, o) {
        let a = this.planes;
        return (a[0].copy(t), a[1].copy(e), a[2].copy(i), a[3].copy(r), a[4].copy(s), a[5].copy(o), this);
      }
      copy(t) {
        let e = this.planes;
        for (let i = 0; i < 6; i++) e[i].copy(t.planes[i]);
        return this;
      }
      setFromProjectionMatrix(t, e = Kn, i = !1) {
        let r = this.planes,
          s = t.elements,
          o = s[0],
          a = s[1],
          c = s[2],
          l = s[3],
          h = s[4],
          u = s[5],
          d = s[6],
          f = s[7],
          p = s[8],
          x = s[9],
          g = s[10],
          m = s[11],
          y = s[12],
          E = s[13],
          _ = s[14],
          T = s[15];
        if (
          (r[0].setComponents(l - o, f - h, m - p, T - y).normalize(),
          r[1].setComponents(l + o, f + h, m + p, T + y).normalize(),
          r[2].setComponents(l + a, f + u, m + x, T + E).normalize(),
          r[3].setComponents(l - a, f - u, m - x, T - E).normalize(),
          i)
        )
          (r[4].setComponents(c, d, g, _).normalize(), r[5].setComponents(l - c, f - d, m - g, T - _).normalize());
        else if ((r[4].setComponents(l - c, f - d, m - g, T - _).normalize(), e === Kn))
          r[5].setComponents(l + c, f + d, m + g, T + _).normalize();
        else if (e === Cs) r[5].setComponents(c, d, g, _).normalize();
        else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
        return this;
      }
      intersectsObject(t) {
        if (t.boundingSphere !== void 0)
          (t.boundingSphere === null && t.computeBoundingSphere(),
            Br.copy(t.boundingSphere).applyMatrix4(t.matrixWorld));
        else {
          let e = t.geometry;
          (e.boundingSphere === null && e.computeBoundingSphere(),
            Br.copy(e.boundingSphere).applyMatrix4(t.matrixWorld));
        }
        return this.intersectsSphere(Br);
      }
      intersectsSprite(t) {
        Br.center.set(0, 0, 0);
        let e = mg.distanceTo(t.center);
        return ((Br.radius = 0.7071067811865476 + e), Br.applyMatrix4(t.matrixWorld), this.intersectsSphere(Br));
      }
      intersectsSphere(t) {
        let e = this.planes,
          i = t.center,
          r = -t.radius;
        for (let s = 0; s < 6; s++) if (e[s].distanceToPoint(i) < r) return !1;
        return !0;
      }
      intersectsBox(t) {
        let e = this.planes;
        for (let i = 0; i < 6; i++) {
          let r = e[i];
          if (
            ((sc.x = r.normal.x > 0 ? t.max.x : t.min.x),
            (sc.y = r.normal.y > 0 ? t.max.y : t.min.y),
            (sc.z = r.normal.z > 0 ? t.max.z : t.min.z),
            r.distanceToPoint(sc) < 0)
          )
            return !1;
        }
        return !0;
      }
      containsPoint(t) {
        let e = this.planes;
        for (let i = 0; i < 6; i++) if (e[i].distanceToPoint(t) < 0) return !1;
        return !0;
      }
      clone() {
        return new this.constructor().copy(this);
      }
    },
    xf = new le(),
    Rc = class n {
      constructor() {
        ((this.coordinateSystem = Kn), (this._frustums = []), (this._count = 0));
      }
      setFromArrayCamera(t) {
        let e = t.cameras,
          i = this._frustums;
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          (xf.multiplyMatrices(s.projectionMatrix, s.matrixWorldInverse),
            i[r] === void 0 && (i[r] = new vr()),
            i[r].setFromProjectionMatrix(xf, s.coordinateSystem, s.reversedDepth));
        }
        return ((this._count = e.length), this);
      }
      getFrustum(t) {
        return this._frustums[t];
      }
      intersectsObject(t) {
        let e = this._frustums;
        for (let i = 0; i < this._count; i++) if (e[i].intersectsObject(t)) return !0;
        return !1;
      }
      intersectsSprite(t) {
        let e = this._frustums;
        for (let i = 0; i < this._count; i++) if (e[i].intersectsSprite(t)) return !0;
        return !1;
      }
      intersectsSphere(t) {
        let e = this._frustums;
        for (let i = 0; i < this._count; i++) if (e[i].intersectsSphere(t)) return !0;
        return !1;
      }
      intersectsBox(t) {
        let e = this._frustums;
        for (let i = 0; i < this._count; i++) if (e[i].intersectsBox(t)) return !0;
        return !1;
      }
      containsPoint(t) {
        let e = this._frustums;
        for (let i = 0; i < this._count; i++) if (e[i].containsPoint(t)) return !0;
        return !1;
      }
      copy(t) {
        this.coordinateSystem = t.coordinateSystem;
        let e = this._frustums,
          i = t._frustums;
        for (let r = 0; r < t._count; r++) (e[r] === void 0 && (e[r] = new vr()), e[r].copy(i[r]));
        return ((this._count = t._count), this);
      }
      clone() {
        return new n().copy(this);
      }
    };
  var Us = class extends Ci {
      constructor(t) {
        (super(),
          (this.isPointsMaterial = !0),
          (this.type = "PointsMaterial"),
          (this.color = new Tt(16777215)),
          (this.map = null),
          (this.alphaMap = null),
          (this.size = 1),
          (this.sizeAttenuation = !0),
          (this.fog = !0),
          this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          this.color.copy(t.color),
          (this.map = t.map),
          (this.alphaMap = t.alphaMap),
          (this.size = t.size),
          (this.sizeAttenuation = t.sizeAttenuation),
          (this.fog = t.fog),
          this
        );
      }
    },
    yf = new le(),
    jh = new No(),
    oc = new ji(),
    ac = new R(),
    Hr = class extends yn {
      constructor(t = new Ae(), e = new Us()) {
        (super(),
          (this.isPoints = !0),
          (this.type = "Points"),
          (this.geometry = t),
          (this.material = e),
          (this.morphTargetDictionary = void 0),
          (this.morphTargetInfluences = void 0),
          this.updateMorphTargets());
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          t.morphTargetInfluences !== void 0
            ? (this.morphTargetInfluences = t.morphTargetInfluences.slice())
            : (this.morphTargetInfluences = void 0),
          t.morphTargetDictionary !== void 0
            ? (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary))
            : (this.morphTargetDictionary = void 0),
          (this.material = Array.isArray(t.material) ? t.material.slice() : t.material),
          (this.geometry = t.geometry),
          this
        );
      }
      intersectsFrustum(t) {
        return t.intersectsObject(this);
      }
      raycast(t, e) {
        let i = this.geometry,
          r = this.matrixWorld,
          s = t.params.Points.threshold,
          o = i.drawRange;
        if (
          (i.boundingSphere === null && i.computeBoundingSphere(),
          oc.copy(i.boundingSphere),
          oc.applyMatrix4(r),
          (oc.radius += s),
          t.ray.intersectsSphere(oc) === !1)
        )
          return;
        (yf.copy(r).invert(), jh.copy(t.ray).applyMatrix4(yf));
        let a = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
          c = a * a,
          l = i.index,
          u = i.attributes.position;
        if (l !== null) {
          let d = Math.max(0, o.start),
            f = Math.min(l.count, o.start + o.count);
          for (let p = d, x = f; p < x; p++) {
            let g = l.getX(p);
            (ac.fromBufferAttribute(u, g), _f(ac, g, c, r, t, e, this));
          }
        } else {
          let d = Math.max(0, o.start),
            f = Math.min(u.count, o.start + o.count);
          for (let p = d, x = f; p < x; p++) (ac.fromBufferAttribute(u, p), _f(ac, p, c, r, t, e, this));
        }
      }
      updateMorphTargets() {
        let e = this.geometry.morphAttributes,
          i = Object.keys(e);
        if (i.length > 0) {
          let r = e[i[0]];
          if (r !== void 0) {
            ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
            for (let s = 0, o = r.length; s < o; s++) {
              let a = r[s].name || String(s);
              (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = s));
            }
          }
        }
      }
    };
  function _f(n, t, e, i, r, s, o) {
    let a = jh.distanceSqToPoint(n);
    if (a < e) {
      let c = new R();
      (jh.closestPointToPoint(n, c), c.applyMatrix4(i));
      let l = r.ray.origin.distanceTo(c);
      if (l < r.near || l > r.far) return;
      s.push({
        distance: l,
        distanceToRay: Math.sqrt(a),
        point: c,
        index: t,
        face: null,
        faceIndex: null,
        barycoord: null,
        object: o,
      });
    }
  }
  var Uo = class extends In {
    constructor(t, e, i, r, s = Ne, o = Ne, a, c, l) {
      (super(t, e, i, r, s, o, a, c, l),
        (this.isVideoTexture = !0),
        (this.generateMipmaps = !1),
        (this._requestVideoFrameCallbackId = 0));
      let h = this;
      function u() {
        ((h.needsUpdate = !0), (h._requestVideoFrameCallbackId = t.requestVideoFrameCallback(u)));
      }
      "requestVideoFrameCallback" in t && (this._requestVideoFrameCallbackId = t.requestVideoFrameCallback(u));
    }
    clone() {
      return new this.constructor(this.image).copy(this);
    }
    update() {
      let t = this.image;
      "requestVideoFrameCallback" in t === !1 && t.readyState >= t.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
    }
    dispose() {
      (this._requestVideoFrameCallbackId !== 0 &&
        (this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),
        (this._requestVideoFrameCallbackId = 0)),
        super.dispose());
    }
  };
  var Oo = class extends In {
      constructor(t = [], e = Yr, i, r, s, o, a, c, l, h) {
        (super(t, e, i, r, s, o, a, c, l, h), (this.isCubeTexture = !0), (this.flipY = !1));
      }
      get images() {
        return this.image;
      }
      set images(t) {
        this.image = t;
      }
    },
    ln = class extends In {
      constructor(t, e, i, r, s, o, a, c, l) {
        (super(t, e, i, r, s, o, a, c, l), (this.isCanvasTexture = !0), (this.needsUpdate = !0));
      }
    };
  var Ki = class extends In {
      constructor(t, e, i = vi, r, s, o, a = xn, c = xn, l, h = Yi, u = 1) {
        if (h !== Yi && h !== tr)
          throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        let d = { width: t, height: e, depth: u };
        (super(d, r, s, o, a, c, h, i, l),
          (this.isDepthTexture = !0),
          (this.flipY = !1),
          (this.generateMipmaps = !1),
          (this.compareFunction = null));
      }
      copy(t) {
        return (
          super.copy(t),
          (this.source = new Ps(Object.assign({}, t.image))),
          (this.compareFunction = t.compareFunction),
          this
        );
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return ((e.compareFunction = this.compareFunction), e);
      }
    },
    Bo = class extends Ki {
      constructor(t, e = vi, i = Yr, r, s, o = xn, a = xn, c, l = Yi) {
        let h = { width: t, height: t, depth: 1 },
          u = [h, h, h, h, h, h];
        (super(t, t, e, i, r, s, o, a, c, l),
          (this.image = u),
          (this.isCubeDepthTexture = !0),
          (this.isCubeTexture = !0));
      }
      get images() {
        return this.image;
      }
      set images(t) {
        this.image = t;
      }
    },
    ko = class extends In {
      constructor(t = null) {
        (super(), (this.sourceTexture = t), (this.isExternalTexture = !0));
      }
      copy(t) {
        return (super.copy(t), (this.sourceTexture = t.sourceTexture), this);
      }
    },
    re = class n extends Ae {
      constructor(t = 1, e = 1, i = 1, r = 1, s = 1, o = 1) {
        (super(),
          (this.type = "BoxGeometry"),
          (this.parameters = { width: t, height: e, depth: i, widthSegments: r, heightSegments: s, depthSegments: o }));
        let a = this;
        ((r = Math.floor(r)), (s = Math.floor(s)), (o = Math.floor(o)));
        let c = [],
          l = [],
          h = [],
          u = [],
          d = 0,
          f = 0;
        (p("z", "y", "x", -1, -1, i, e, t, o, s, 0),
          p("z", "y", "x", 1, -1, i, e, -t, o, s, 1),
          p("x", "z", "y", 1, 1, t, i, e, r, o, 2),
          p("x", "z", "y", 1, -1, t, i, -e, r, o, 3),
          p("x", "y", "z", 1, -1, t, e, i, r, s, 4),
          p("x", "y", "z", -1, -1, t, e, -i, r, s, 5),
          this.setIndex(c),
          this.setAttribute("position", new ge(l, 3)),
          this.setAttribute("normal", new ge(h, 3)),
          this.setAttribute("uv", new ge(u, 2)));
        function p(x, g, m, y, E, _, T, w, v, S, F) {
          let I = _ / v,
            N = T / S,
            B = _ / 2,
            X = T / 2,
            P = w / 2,
            H = v + 1,
            Y = S + 1,
            G = 0,
            ot = 0,
            $ = new R();
          for (let nt = 0; nt < Y; nt++) {
            let rt = nt * N - X;
            for (let Rt = 0; Rt < H; Rt++) {
              let Ht = Rt * I - B;
              (($[x] = Ht * y),
                ($[g] = rt * E),
                ($[m] = P),
                l.push($.x, $.y, $.z),
                ($[x] = 0),
                ($[g] = 0),
                ($[m] = w > 0 ? 1 : -1),
                h.push($.x, $.y, $.z),
                u.push(Rt / v),
                u.push(1 - nt / S),
                (G += 1));
            }
          }
          for (let nt = 0; nt < S; nt++)
            for (let rt = 0; rt < v; rt++) {
              let Rt = d + rt + H * nt,
                Ht = d + rt + H * (nt + 1),
                K = d + (rt + 1) + H * (nt + 1),
                bt = d + (rt + 1) + H * nt;
              (c.push(Rt, Ht, bt), c.push(Ht, K, bt), (ot += 6));
            }
          (a.addGroup(f, ot, F), (f += ot), (d += G));
        }
      }
      copy(t) {
        return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
      }
      static fromJSON(t) {
        return new n(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
      }
    };
  var Zn = class n extends Ae {
      constructor(t = 1, e = 32, i = 0, r = Math.PI * 2) {
        (super(),
          (this.type = "CircleGeometry"),
          (this.parameters = { radius: t, segments: e, thetaStart: i, thetaLength: r }),
          (e = Math.max(3, e)));
        let s = [],
          o = [],
          a = [],
          c = [],
          l = new R(),
          h = new st();
        (o.push(0, 0, 0), a.push(0, 0, 1), c.push(0.5, 0.5));
        for (let u = 0, d = 3; u <= e; u++, d += 3) {
          let f = i + (u / e) * r;
          ((l.x = t * Math.cos(f)),
            (l.y = t * Math.sin(f)),
            o.push(l.x, l.y, l.z),
            a.push(0, 0, 1),
            (h.x = (o[d] / t + 1) / 2),
            (h.y = (o[d + 1] / t + 1) / 2),
            c.push(h.x, h.y));
        }
        for (let u = 1; u <= e; u++) s.push(u, u + 1, 0);
        (this.setIndex(s),
          this.setAttribute("position", new ge(o, 3)),
          this.setAttribute("normal", new ge(a, 3)),
          this.setAttribute("uv", new ge(c, 2)));
      }
      copy(t) {
        return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
      }
      static fromJSON(t) {
        return new n(t.radius, t.segments, t.thetaStart, t.thetaLength);
      }
    },
    Re = class n extends Ae {
      constructor(t = 1, e = 1, i = 1, r = 32, s = 1, o = !1, a = 0, c = Math.PI * 2) {
        (super(),
          (this.type = "CylinderGeometry"),
          (this.parameters = {
            radiusTop: t,
            radiusBottom: e,
            height: i,
            radialSegments: r,
            heightSegments: s,
            openEnded: o,
            thetaStart: a,
            thetaLength: c,
          }));
        let l = this;
        ((r = Math.floor(r)), (s = Math.floor(s)));
        let h = [],
          u = [],
          d = [],
          f = [],
          p = 0,
          x = [],
          g = i / 2,
          m = 0;
        (y(),
          o === !1 && (t > 0 && E(!0), e > 0 && E(!1)),
          this.setIndex(h),
          this.setAttribute("position", new ge(u, 3)),
          this.setAttribute("normal", new ge(d, 3)),
          this.setAttribute("uv", new ge(f, 2)));
        function y() {
          let _ = new R(),
            T = new R(),
            w = 0,
            v = (e - t) / i;
          for (let S = 0; S <= s; S++) {
            let F = [],
              I = S / s,
              N = I * (e - t) + t;
            for (let B = 0; B <= r; B++) {
              let X = B / r,
                P = X * c + a,
                H = Math.sin(P),
                Y = Math.cos(P);
              ((T.x = N * H),
                (T.y = -I * i + g),
                (T.z = N * Y),
                u.push(T.x, T.y, T.z),
                _.set(H, v, Y).normalize(),
                d.push(_.x, _.y, _.z),
                f.push(X, 1 - I),
                F.push(p++));
            }
            x.push(F);
          }
          for (let S = 0; S < r; S++)
            for (let F = 0; F < s; F++) {
              let I = x[F][S],
                N = x[F + 1][S],
                B = x[F + 1][S + 1],
                X = x[F][S + 1];
              ((t > 0 || F !== 0) && (h.push(I, N, X), (w += 3)),
                (e > 0 || F !== s - 1) && (h.push(N, B, X), (w += 3)));
            }
          (l.addGroup(m, w, 0), (m += w));
        }
        function E(_) {
          let T = p,
            w = new st(),
            v = new R(),
            S = 0,
            F = _ === !0 ? t : e,
            I = _ === !0 ? 1 : -1;
          for (let B = 1; B <= r; B++) (u.push(0, g * I, 0), d.push(0, I, 0), f.push(0.5, 0.5), p++);
          let N = p;
          for (let B = 0; B <= r; B++) {
            let P = (B / r) * c + a,
              H = Math.cos(P),
              Y = Math.sin(P);
            ((v.x = F * Y),
              (v.y = g * I),
              (v.z = F * H),
              u.push(v.x, v.y, v.z),
              d.push(0, I, 0),
              (w.x = H * 0.5 + 0.5),
              (w.y = Y * 0.5 * I + 0.5),
              f.push(w.x, w.y),
              p++);
          }
          for (let B = 0; B < r; B++) {
            let X = T + B,
              P = N + B;
            (_ === !0 ? h.push(P, P + 1, X) : h.push(P + 1, P, X), (S += 3));
          }
          (l.addGroup(m, S, _ === !0 ? 1 : 2), (m += S));
        }
      }
      copy(t) {
        return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
      }
      static fromJSON(t) {
        return new n(
          t.radiusTop,
          t.radiusBottom,
          t.height,
          t.radialSegments,
          t.heightSegments,
          t.openEnded,
          t.thetaStart,
          t.thetaLength,
        );
      }
    },
    Gr = class n extends Re {
      constructor(t = 1, e = 1, i = 32, r = 1, s = !1, o = 0, a = Math.PI * 2) {
        (super(0, t, e, i, r, s, o, a),
          (this.type = "ConeGeometry"),
          (this.parameters = {
            radius: t,
            height: e,
            radialSegments: i,
            heightSegments: r,
            openEnded: s,
            thetaStart: o,
            thetaLength: a,
          }));
      }
      static fromJSON(t) {
        return new n(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
      }
    };
  var Wn = class {
      constructor() {
        ((this.type = "Curve"),
          (this.arcLengthDivisions = 200),
          (this.needsUpdate = !1),
          (this.cacheArcLengths = null));
      }
      getPoint() {
        Vt("Curve: .getPoint() not implemented.");
      }
      getPointAt(t, e) {
        let i = this.getUtoTmapping(t);
        return this.getPoint(i, e);
      }
      getPoints(t = 5) {
        let e = [];
        for (let i = 0; i <= t; i++) e.push(this.getPoint(i / t));
        return e;
      }
      getSpacedPoints(t = 5) {
        let e = [];
        for (let i = 0; i <= t; i++) e.push(this.getPointAt(i / t));
        return e;
      }
      getLength() {
        let t = this.getLengths();
        return t[t.length - 1];
      }
      getLengths(t = this.arcLengthDivisions) {
        if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
          return this.cacheArcLengths;
        this.needsUpdate = !1;
        let e = [],
          i,
          r = this.getPoint(0),
          s = 0;
        e.push(0);
        for (let o = 1; o <= t; o++) ((i = this.getPoint(o / t)), (s += i.distanceTo(r)), e.push(s), (r = i));
        return ((this.cacheArcLengths = e), e);
      }
      updateArcLengths() {
        ((this.needsUpdate = !0), this.getLengths());
      }
      getUtoTmapping(t, e = null) {
        let i = this.getLengths(),
          r = 0,
          s = i.length,
          o;
        e ? (o = e) : (o = t * i[s - 1]);
        let a = 0,
          c = s - 1,
          l;
        for (; a <= c; )
          if (((r = Math.floor(a + (c - a) / 2)), (l = i[r] - o), l < 0)) a = r + 1;
          else if (l > 0) c = r - 1;
          else {
            c = r;
            break;
          }
        if (((r = c), i[r] === o)) return r / (s - 1);
        let h = i[r],
          d = i[r + 1] - h,
          f = (o - h) / d;
        return (r + f) / (s - 1);
      }
      getTangent(t, e) {
        let r = t - 1e-4,
          s = t + 1e-4;
        (r < 0 && (r = 0), s > 1 && (s = 1));
        let o = this.getPoint(r),
          a = this.getPoint(s),
          c = e || (o.isVector2 ? new st() : new R());
        return (c.copy(a).sub(o).normalize(), c);
      }
      getTangentAt(t, e) {
        let i = this.getUtoTmapping(t);
        return this.getTangent(i, e);
      }
      computeFrenetFrames(t, e = !1) {
        let i = new R(),
          r = [],
          s = [],
          o = [],
          a = new R(),
          c = new le();
        for (let f = 0; f <= t; f++) {
          let p = f / t;
          r[f] = this.getTangentAt(p, new R());
        }
        ((s[0] = new R()), (o[0] = new R()));
        let l = Number.MAX_VALUE,
          h = Math.abs(r[0].x),
          u = Math.abs(r[0].y),
          d = Math.abs(r[0].z);
        (h <= l && ((l = h), i.set(1, 0, 0)),
          u <= l && ((l = u), i.set(0, 1, 0)),
          d <= l && i.set(0, 0, 1),
          a.crossVectors(r[0], i).normalize(),
          s[0].crossVectors(r[0], a),
          o[0].crossVectors(r[0], s[0]));
        for (let f = 1; f <= t; f++) {
          if (
            ((s[f] = s[f - 1].clone()),
            (o[f] = o[f - 1].clone()),
            a.crossVectors(r[f - 1], r[f]),
            a.length() > Number.EPSILON)
          ) {
            a.normalize();
            let p = Math.acos(ce(r[f - 1].dot(r[f]), -1, 1));
            s[f].applyMatrix4(c.makeRotationAxis(a, p));
          }
          o[f].crossVectors(r[f], s[f]);
        }
        if (e === !0) {
          let f = Math.acos(ce(s[0].dot(s[t]), -1, 1));
          ((f /= t), r[0].dot(a.crossVectors(s[0], s[t])) > 0 && (f = -f));
          for (let p = 1; p <= t; p++)
            (s[p].applyMatrix4(c.makeRotationAxis(r[p], f * p)), o[p].crossVectors(r[p], s[p]));
        }
        return { tangents: r, normals: s, binormals: o };
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        return ((this.arcLengthDivisions = t.arcLengthDivisions), (this.cacheArcLengths = null), this);
      }
      toJSON() {
        let t = { metadata: { version: 4.7, type: "Curve", generator: "Curve.toJSON" } };
        return ((t.arcLengthDivisions = this.arcLengthDivisions), (t.type = this.type), t);
      }
      fromJSON(t) {
        return ((this.arcLengthDivisions = t.arcLengthDivisions), (this.cacheArcLengths = null), this);
      }
    },
    Os = class extends Wn {
      constructor(t = 0, e = 0, i = 1, r = 1, s = 0, o = Math.PI * 2, a = !1, c = 0) {
        (super(),
          (this.isEllipseCurve = !0),
          (this.type = "EllipseCurve"),
          (this.aX = t),
          (this.aY = e),
          (this.xRadius = i),
          (this.yRadius = r),
          (this.aStartAngle = s),
          (this.aEndAngle = o),
          (this.aClockwise = a),
          (this.aRotation = c));
      }
      getPoint(t, e = new st()) {
        let i = e,
          r = Math.PI * 2,
          s = this.aEndAngle - this.aStartAngle,
          o = Math.abs(s) < Number.EPSILON;
        for (; s < 0; ) s += r;
        for (; s > r; ) s -= r;
        (s < Number.EPSILON && (o ? (s = 0) : (s = r)),
          this.aClockwise === !0 && !o && (s === r ? (s = -r) : (s = s - r)));
        let a = this.aStartAngle + t * s,
          c = this.aX + this.xRadius * Math.cos(a),
          l = this.aY + this.yRadius * Math.sin(a);
        if (this.aRotation !== 0) {
          let h = Math.cos(this.aRotation),
            u = Math.sin(this.aRotation),
            d = c - this.aX,
            f = l - this.aY;
          ((c = d * h - f * u + this.aX), (l = d * u + f * h + this.aY));
        }
        return i.set(c, l);
      }
      copy(t) {
        return (
          super.copy(t),
          (this.aX = t.aX),
          (this.aY = t.aY),
          (this.xRadius = t.xRadius),
          (this.yRadius = t.yRadius),
          (this.aStartAngle = t.aStartAngle),
          (this.aEndAngle = t.aEndAngle),
          (this.aClockwise = t.aClockwise),
          (this.aRotation = t.aRotation),
          this
        );
      }
      toJSON() {
        let t = super.toJSON();
        return (
          (t.aX = this.aX),
          (t.aY = this.aY),
          (t.xRadius = this.xRadius),
          (t.yRadius = this.yRadius),
          (t.aStartAngle = this.aStartAngle),
          (t.aEndAngle = this.aEndAngle),
          (t.aClockwise = this.aClockwise),
          (t.aRotation = this.aRotation),
          t
        );
      }
      fromJSON(t) {
        return (
          super.fromJSON(t),
          (this.aX = t.aX),
          (this.aY = t.aY),
          (this.xRadius = t.xRadius),
          (this.yRadius = t.yRadius),
          (this.aStartAngle = t.aStartAngle),
          (this.aEndAngle = t.aEndAngle),
          (this.aClockwise = t.aClockwise),
          (this.aRotation = t.aRotation),
          this
        );
      }
    },
    Cc = class extends Os {
      constructor(t, e, i, r, s, o) {
        (super(t, e, i, i, r, s, o), (this.isArcCurve = !0), (this.type = "ArcCurve"));
      }
    };
  function Ru() {
    let n = 0,
      t = 0,
      e = 0,
      i = 0;
    function r(s, o, a, c) {
      ((n = s), (t = a), (e = -3 * s + 3 * o - 2 * a - c), (i = 2 * s - 2 * o + a + c));
    }
    return {
      initCatmullRom: function (s, o, a, c, l) {
        r(o, a, l * (a - s), l * (c - o));
      },
      initNonuniformCatmullRom: function (s, o, a, c, l, h, u) {
        let d = (o - s) / l - (a - s) / (l + h) + (a - o) / h,
          f = (a - o) / h - (c - o) / (h + u) + (c - a) / u;
        ((d *= h), (f *= h), r(o, a, d, f));
      },
      calc: function (s) {
        let o = s * s,
          a = o * s;
        return n + t * s + e * o + i * a;
      },
    };
  }
  var bf = new R(),
    Mf = new R(),
    Hh = new Ru(),
    Gh = new Ru(),
    Vh = new Ru(),
    Bs = class extends Wn {
      constructor(t = [], e = !1, i = "centripetal", r = 0.5) {
        (super(),
          (this.isCatmullRomCurve3 = !0),
          (this.type = "CatmullRomCurve3"),
          (this.points = t),
          (this.closed = e),
          (this.curveType = i),
          (this.tension = r));
      }
      getPoint(t, e = new R()) {
        let i = e,
          r = this.points,
          s = r.length,
          o = (s - (this.closed ? 0 : 1)) * t,
          a = Math.floor(o),
          c = o - a;
        this.closed
          ? (a += a > 0 ? 0 : (Math.floor(Math.abs(a) / s) + 1) * s)
          : c === 0 && a === s - 1 && ((a = s - 2), (c = 1));
        let l, h;
        this.closed || a > 0 ? (l = r[(a - 1) % s]) : (Mf.subVectors(r[0], r[1]).add(r[0]), (l = Mf));
        let u = r[a % s],
          d = r[(a + 1) % s];
        if (
          (this.closed || a + 2 < s
            ? (h = r[(a + 2) % s])
            : (bf.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), (h = bf)),
          this.curveType === "centripetal" || this.curveType === "chordal")
        ) {
          let f = this.curveType === "chordal" ? 0.5 : 0.25,
            p = Math.pow(l.distanceToSquared(u), f),
            x = Math.pow(u.distanceToSquared(d), f),
            g = Math.pow(d.distanceToSquared(h), f);
          (x < 1e-4 && (x = 1),
            p < 1e-4 && (p = x),
            g < 1e-4 && (g = x),
            Hh.initNonuniformCatmullRom(l.x, u.x, d.x, h.x, p, x, g),
            Gh.initNonuniformCatmullRom(l.y, u.y, d.y, h.y, p, x, g),
            Vh.initNonuniformCatmullRom(l.z, u.z, d.z, h.z, p, x, g));
        } else
          this.curveType === "catmullrom" &&
            (Hh.initCatmullRom(l.x, u.x, d.x, h.x, this.tension),
            Gh.initCatmullRom(l.y, u.y, d.y, h.y, this.tension),
            Vh.initCatmullRom(l.z, u.z, d.z, h.z, this.tension));
        return (i.set(Hh.calc(c), Gh.calc(c), Vh.calc(c)), i);
      }
      copy(t) {
        (super.copy(t), (this.points = []));
        for (let e = 0, i = t.points.length; e < i; e++) {
          let r = t.points[e];
          this.points.push(r.clone());
        }
        return ((this.closed = t.closed), (this.curveType = t.curveType), (this.tension = t.tension), this);
      }
      toJSON() {
        let t = super.toJSON();
        t.points = [];
        for (let e = 0, i = this.points.length; e < i; e++) {
          let r = this.points[e];
          t.points.push(r.toArray());
        }
        return ((t.closed = this.closed), (t.curveType = this.curveType), (t.tension = this.tension), t);
      }
      fromJSON(t) {
        (super.fromJSON(t), (this.points = []));
        for (let e = 0, i = t.points.length; e < i; e++) {
          let r = t.points[e];
          this.points.push(new R().fromArray(r));
        }
        return ((this.closed = t.closed), (this.curveType = t.curveType), (this.tension = t.tension), this);
      }
    };
  function Sf(n, t, e, i, r) {
    let s = (i - t) * 0.5,
      o = (r - e) * 0.5,
      a = n * n,
      c = n * a;
    return (2 * e - 2 * i + s + o) * c + (-3 * e + 3 * i - 2 * s - o) * a + s * n + e;
  }
  function gg(n, t) {
    let e = 1 - n;
    return e * e * t;
  }
  function vg(n, t) {
    return 2 * (1 - n) * n * t;
  }
  function xg(n, t) {
    return n * n * t;
  }
  function So(n, t, e, i) {
    return gg(n, t) + vg(n, e) + xg(n, i);
  }
  function yg(n, t) {
    let e = 1 - n;
    return e * e * e * t;
  }
  function _g(n, t) {
    let e = 1 - n;
    return 3 * e * e * n * t;
  }
  function bg(n, t) {
    return 3 * (1 - n) * n * n * t;
  }
  function Mg(n, t) {
    return n * n * n * t;
  }
  function Eo(n, t, e, i, r) {
    return yg(n, t) + _g(n, e) + bg(n, i) + Mg(n, r);
  }
  var zo = class extends Wn {
      constructor(t = new st(), e = new st(), i = new st(), r = new st()) {
        (super(),
          (this.isCubicBezierCurve = !0),
          (this.type = "CubicBezierCurve"),
          (this.v0 = t),
          (this.v1 = e),
          (this.v2 = i),
          (this.v3 = r));
      }
      getPoint(t, e = new st()) {
        let i = e,
          r = this.v0,
          s = this.v1,
          o = this.v2,
          a = this.v3;
        return (i.set(Eo(t, r.x, s.x, o.x, a.x), Eo(t, r.y, s.y, o.y, a.y)), i);
      }
      copy(t) {
        return (super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this);
      }
      toJSON() {
        let t = super.toJSON();
        return (
          (t.v0 = this.v0.toArray()),
          (t.v1 = this.v1.toArray()),
          (t.v2 = this.v2.toArray()),
          (t.v3 = this.v3.toArray()),
          t
        );
      }
      fromJSON(t) {
        return (
          super.fromJSON(t),
          this.v0.fromArray(t.v0),
          this.v1.fromArray(t.v1),
          this.v2.fromArray(t.v2),
          this.v3.fromArray(t.v3),
          this
        );
      }
    },
    Ic = class extends Wn {
      constructor(t = new R(), e = new R(), i = new R(), r = new R()) {
        (super(),
          (this.isCubicBezierCurve3 = !0),
          (this.type = "CubicBezierCurve3"),
          (this.v0 = t),
          (this.v1 = e),
          (this.v2 = i),
          (this.v3 = r));
      }
      getPoint(t, e = new R()) {
        let i = e,
          r = this.v0,
          s = this.v1,
          o = this.v2,
          a = this.v3;
        return (i.set(Eo(t, r.x, s.x, o.x, a.x), Eo(t, r.y, s.y, o.y, a.y), Eo(t, r.z, s.z, o.z, a.z)), i);
      }
      copy(t) {
        return (super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this);
      }
      toJSON() {
        let t = super.toJSON();
        return (
          (t.v0 = this.v0.toArray()),
          (t.v1 = this.v1.toArray()),
          (t.v2 = this.v2.toArray()),
          (t.v3 = this.v3.toArray()),
          t
        );
      }
      fromJSON(t) {
        return (
          super.fromJSON(t),
          this.v0.fromArray(t.v0),
          this.v1.fromArray(t.v1),
          this.v2.fromArray(t.v2),
          this.v3.fromArray(t.v3),
          this
        );
      }
    },
    Ho = class extends Wn {
      constructor(t = new st(), e = new st()) {
        (super(), (this.isLineCurve = !0), (this.type = "LineCurve"), (this.v1 = t), (this.v2 = e));
      }
      getPoint(t, e = new st()) {
        let i = e;
        return (t === 1 ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(t).add(this.v1)), i);
      }
      getPointAt(t, e) {
        return this.getPoint(t, e);
      }
      getTangent(t, e = new st()) {
        return e.subVectors(this.v2, this.v1).normalize();
      }
      getTangentAt(t, e) {
        return this.getTangent(t, e);
      }
      copy(t) {
        return (super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
      }
      toJSON() {
        let t = super.toJSON();
        return ((t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
      }
      fromJSON(t) {
        return (super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this);
      }
    },
    Pc = class extends Wn {
      constructor(t = new R(), e = new R()) {
        (super(), (this.isLineCurve3 = !0), (this.type = "LineCurve3"), (this.v1 = t), (this.v2 = e));
      }
      getPoint(t, e = new R()) {
        let i = e;
        return (t === 1 ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(t).add(this.v1)), i);
      }
      getPointAt(t, e) {
        return this.getPoint(t, e);
      }
      getTangent(t, e = new R()) {
        return e.subVectors(this.v2, this.v1).normalize();
      }
      getTangentAt(t, e) {
        return this.getTangent(t, e);
      }
      copy(t) {
        return (super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
      }
      toJSON() {
        let t = super.toJSON();
        return ((t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
      }
      fromJSON(t) {
        return (super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this);
      }
    },
    Go = class extends Wn {
      constructor(t = new st(), e = new st(), i = new st()) {
        (super(),
          (this.isQuadraticBezierCurve = !0),
          (this.type = "QuadraticBezierCurve"),
          (this.v0 = t),
          (this.v1 = e),
          (this.v2 = i));
      }
      getPoint(t, e = new st()) {
        let i = e,
          r = this.v0,
          s = this.v1,
          o = this.v2;
        return (i.set(So(t, r.x, s.x, o.x), So(t, r.y, s.y, o.y)), i);
      }
      copy(t) {
        return (super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
      }
      toJSON() {
        let t = super.toJSON();
        return ((t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
      }
      fromJSON(t) {
        return (super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this);
      }
    },
    Vo = class extends Wn {
      constructor(t = new R(), e = new R(), i = new R()) {
        (super(),
          (this.isQuadraticBezierCurve3 = !0),
          (this.type = "QuadraticBezierCurve3"),
          (this.v0 = t),
          (this.v1 = e),
          (this.v2 = i));
      }
      getPoint(t, e = new R()) {
        let i = e,
          r = this.v0,
          s = this.v1,
          o = this.v2;
        return (i.set(So(t, r.x, s.x, o.x), So(t, r.y, s.y, o.y), So(t, r.z, s.z, o.z)), i);
      }
      copy(t) {
        return (super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
      }
      toJSON() {
        let t = super.toJSON();
        return ((t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
      }
      fromJSON(t) {
        return (super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this);
      }
    },
    Wo = class extends Wn {
      constructor(t = []) {
        (super(), (this.isSplineCurve = !0), (this.type = "SplineCurve"), (this.points = t));
      }
      getPoint(t, e = new st()) {
        let i = e,
          r = this.points,
          s = (r.length - 1) * t,
          o = Math.floor(s),
          a = s - o,
          c = r[o === 0 ? o : o - 1],
          l = r[o],
          h = r[o > r.length - 2 ? r.length - 1 : o + 1],
          u = r[o > r.length - 3 ? r.length - 1 : o + 2];
        return (i.set(Sf(a, c.x, l.x, h.x, u.x), Sf(a, c.y, l.y, h.y, u.y)), i);
      }
      copy(t) {
        (super.copy(t), (this.points = []));
        for (let e = 0, i = t.points.length; e < i; e++) {
          let r = t.points[e];
          this.points.push(r.clone());
        }
        return this;
      }
      toJSON() {
        let t = super.toJSON();
        t.points = [];
        for (let e = 0, i = this.points.length; e < i; e++) {
          let r = this.points[e];
          t.points.push(r.toArray());
        }
        return t;
      }
      fromJSON(t) {
        (super.fromJSON(t), (this.points = []));
        for (let e = 0, i = t.points.length; e < i; e++) {
          let r = t.points[e];
          this.points.push(new st().fromArray(r));
        }
        return this;
      }
    },
    Lc = Object.freeze({
      __proto__: null,
      ArcCurve: Cc,
      CatmullRomCurve3: Bs,
      CubicBezierCurve: zo,
      CubicBezierCurve3: Ic,
      EllipseCurve: Os,
      LineCurve: Ho,
      LineCurve3: Pc,
      QuadraticBezierCurve: Go,
      QuadraticBezierCurve3: Vo,
      SplineCurve: Wo,
    }),
    Dc = class extends Wn {
      constructor() {
        (super(), (this.type = "CurvePath"), (this.curves = []), (this.autoClose = !1), (this.cacheLengths = null));
      }
      add(t) {
        this.curves.push(t);
      }
      closePath() {
        let t = this.curves[0].getPoint(0),
          e = this.curves[this.curves.length - 1].getPoint(1);
        if (!t.equals(e)) {
          let i = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
          this.curves.push(new Lc[i](e, t));
        }
        return this;
      }
      getPoint(t, e) {
        let i = t * this.getLength(),
          r = this.getCurveLengths(),
          s = 0;
        for (; s < r.length; ) {
          if (r[s] >= i) {
            let o = r[s] - i,
              a = this.curves[s],
              c = a.getLength(),
              l = c === 0 ? 0 : 1 - o / c;
            return a.getPointAt(l, e);
          }
          s++;
        }
        return null;
      }
      getLength() {
        let t = this.getCurveLengths();
        return t[t.length - 1];
      }
      updateArcLengths() {
        ((this.needsUpdate = !0), (this.cacheLengths = null), this.getCurveLengths());
      }
      getCurveLengths() {
        if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
        let t = [],
          e = 0;
        for (let i = 0, r = this.curves.length; i < r; i++) ((e += this.curves[i].getLength()), t.push(e));
        return ((this.cacheLengths = t), t);
      }
      getSpacedPoints(t = 40) {
        let e = [];
        for (let i = 0; i <= t; i++) e.push(this.getPoint(i / t));
        return (this.autoClose && e.push(e[0]), e);
      }
      getPoints(t = 12) {
        let e = [],
          i;
        for (let r = 0, s = this.curves; r < s.length; r++) {
          let o = s[r],
            a = o.isEllipseCurve
              ? t * 2
              : o.isLineCurve || o.isLineCurve3
                ? 1
                : o.isSplineCurve
                  ? t * o.points.length
                  : t,
            c = o.getPoints(a);
          for (let l = 0; l < c.length; l++) {
            let h = c[l];
            (i && i.equals(h)) || (e.push(h), (i = h));
          }
        }
        return (this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e);
      }
      copy(t) {
        (super.copy(t), (this.curves = []));
        for (let e = 0, i = t.curves.length; e < i; e++) {
          let r = t.curves[e];
          this.curves.push(r.clone());
        }
        return ((this.autoClose = t.autoClose), (this.cacheLengths = null), this);
      }
      toJSON() {
        let t = super.toJSON();
        ((t.autoClose = this.autoClose), (t.curves = []));
        for (let e = 0, i = this.curves.length; e < i; e++) {
          let r = this.curves[e];
          t.curves.push(r.toJSON());
        }
        return t;
      }
      fromJSON(t) {
        (super.fromJSON(t), (this.autoClose = t.autoClose), (this.curves = []));
        for (let e = 0, i = t.curves.length; e < i; e++) {
          let r = t.curves[e];
          this.curves.push(new Lc[r.type]().fromJSON(r));
        }
        return ((this.cacheLengths = null), this);
      }
    },
    Xo = class extends Dc {
      constructor(t) {
        (super(), (this.type = "Path"), (this.currentPoint = new st()), t && this.setFromPoints(t));
      }
      setFromPoints(t) {
        this.moveTo(t[0].x, t[0].y);
        for (let e = 1, i = t.length; e < i; e++) this.lineTo(t[e].x, t[e].y);
        return this;
      }
      moveTo(t, e) {
        return (this.currentPoint.set(t, e), this);
      }
      lineTo(t, e) {
        let i = new Ho(this.currentPoint.clone(), new st(t, e));
        return (this.curves.push(i), this.currentPoint.set(t, e), this);
      }
      quadraticCurveTo(t, e, i, r) {
        let s = new Go(this.currentPoint.clone(), new st(t, e), new st(i, r));
        return (this.curves.push(s), this.currentPoint.set(i, r), this);
      }
      bezierCurveTo(t, e, i, r, s, o) {
        let a = new zo(this.currentPoint.clone(), new st(t, e), new st(i, r), new st(s, o));
        return (this.curves.push(a), this.currentPoint.set(s, o), this);
      }
      splineThru(t) {
        let e = [this.currentPoint.clone()].concat(t),
          i = new Wo(e);
        return (this.curves.push(i), this.currentPoint.copy(t[t.length - 1]), this);
      }
      arc(t, e, i, r, s, o) {
        let a = this.currentPoint.x,
          c = this.currentPoint.y;
        return (this.absarc(t + a, e + c, i, r, s, o), this);
      }
      absarc(t, e, i, r, s, o) {
        return (this.absellipse(t, e, i, i, r, s, o), this);
      }
      ellipse(t, e, i, r, s, o, a, c) {
        let l = this.currentPoint.x,
          h = this.currentPoint.y;
        return (this.absellipse(t + l, e + h, i, r, s, o, a, c), this);
      }
      absellipse(t, e, i, r, s, o, a, c) {
        let l = new Os(t, e, i, r, s, o, a, c);
        if (this.curves.length > 0) {
          let u = l.getPoint(0);
          u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
        }
        this.curves.push(l);
        let h = l.getPoint(1);
        return (this.currentPoint.copy(h), this);
      }
      copy(t) {
        return (super.copy(t), this.currentPoint.copy(t.currentPoint), this);
      }
      toJSON() {
        let t = super.toJSON();
        return ((t.currentPoint = this.currentPoint.toArray()), t);
      }
      fromJSON(t) {
        return (super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this);
      }
    },
    xr = class extends Xo {
      constructor(t) {
        (super(t), (this.uuid = Er()), (this.type = "Shape"), (this.holes = []));
      }
      getPointsHoles(t) {
        let e = [];
        for (let i = 0, r = this.holes.length; i < r; i++) e[i] = this.holes[i].getPoints(t);
        return e;
      }
      extractPoints(t) {
        return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
      }
      copy(t) {
        (super.copy(t), (this.holes = []));
        for (let e = 0, i = t.holes.length; e < i; e++) {
          let r = t.holes[e];
          this.holes.push(r.clone());
        }
        return this;
      }
      toJSON() {
        let t = super.toJSON();
        ((t.uuid = this.uuid), (t.holes = []));
        for (let e = 0, i = this.holes.length; e < i; e++) {
          let r = this.holes[e];
          t.holes.push(r.toJSON());
        }
        return t;
      }
      fromJSON(t) {
        (super.fromJSON(t), (this.uuid = t.uuid), (this.holes = []));
        for (let e = 0, i = t.holes.length; e < i; e++) {
          let r = t.holes[e];
          this.holes.push(new Xo().fromJSON(r));
        }
        return this;
      }
    };
  function Sg(n, t, e = 2) {
    let i = t && t.length,
      r = i ? t[0] * e : n.length,
      s = bp(n, 0, r, e, !0),
      o = [];
    if (!s || s.next === s.prev) return o;
    let a, c, l;
    if ((i && (s = Rg(n, t, s, e)), n.length > 80 * e)) {
      ((a = n[0]), (c = n[1]));
      let h = a,
        u = c;
      for (let d = e; d < r; d += e) {
        let f = n[d],
          p = n[d + 1];
        (f < a && (a = f), p < c && (c = p), f > h && (h = f), p > u && (u = p));
      }
      ((l = Math.max(h - a, u - c)), (l = l !== 0 ? 32767 / l : 0));
    }
    return (qo(s, o, e, a, c, l, 0), o);
  }
  function bp(n, t, e, i, r) {
    let s;
    if (r === kg(n, t, e, i) > 0) for (let o = t; o < e; o += i) s = Ef((o / i) | 0, n[o], n[o + 1], s);
    else for (let o = e - i; o >= t; o -= i) s = Ef((o / i) | 0, n[o], n[o + 1], s);
    return (s && ks(s, s.next) && (Yo(s), (s = s.next)), s);
  }
  function Vr(n, t) {
    if (!n) return n;
    t || (t = n);
    let e = n,
      i;
    do
      if (((i = !1), !e.steiner && (ks(e, e.next) || je(e.prev, e, e.next) === 0))) {
        if ((Yo(e), (e = t = e.prev), e === e.next)) break;
        i = !0;
      } else e = e.next;
    while (i || e !== t);
    return t;
  }
  function qo(n, t, e, i, r, s, o) {
    if (!n) return;
    !o && s && Dg(n, i, r, s);
    let a = n;
    for (; n.prev !== n.next; ) {
      let c = n.prev,
        l = n.next;
      if (s ? wg(n, i, r, s) : Eg(n)) {
        (t.push(c.i, n.i, l.i), Yo(n), (n = l.next), (a = l.next));
        continue;
      }
      if (((n = l), n === a)) {
        o
          ? o === 1
            ? ((n = Tg(Vr(n), t)), qo(n, t, e, i, r, s, 2))
            : o === 2 && Ag(n, t, e, i, r, s)
          : qo(Vr(n), t, e, i, r, s, 1);
        break;
      }
    }
  }
  function Eg(n) {
    let t = n.prev,
      e = n,
      i = n.next;
    if (je(t, e, i) >= 0) return !1;
    let r = t.x,
      s = e.x,
      o = i.x,
      a = t.y,
      c = e.y,
      l = i.y,
      h = Math.min(r, s, o),
      u = Math.min(a, c, l),
      d = Math.max(r, s, o),
      f = Math.max(a, c, l),
      p = i.next;
    for (; p !== t; ) {
      if (p.x >= h && p.x <= d && p.y >= u && p.y <= f && bo(r, a, s, c, o, l, p.x, p.y) && je(p.prev, p, p.next) >= 0)
        return !1;
      p = p.next;
    }
    return !0;
  }
  function wg(n, t, e, i) {
    let r = n.prev,
      s = n,
      o = n.next;
    if (je(r, s, o) >= 0) return !1;
    let a = r.x,
      c = s.x,
      l = o.x,
      h = r.y,
      u = s.y,
      d = o.y,
      f = Math.min(a, c, l),
      p = Math.min(h, u, d),
      x = Math.max(a, c, l),
      g = Math.max(h, u, d),
      m = Kh(f, p, t, e, i),
      y = Kh(x, g, t, e, i),
      E = n.prevZ,
      _ = n.nextZ;
    for (; E && E.z >= m && _ && _.z <= y; ) {
      if (
        (E.x >= f &&
          E.x <= x &&
          E.y >= p &&
          E.y <= g &&
          E !== r &&
          E !== o &&
          bo(a, h, c, u, l, d, E.x, E.y) &&
          je(E.prev, E, E.next) >= 0) ||
        ((E = E.prevZ),
        _.x >= f &&
          _.x <= x &&
          _.y >= p &&
          _.y <= g &&
          _ !== r &&
          _ !== o &&
          bo(a, h, c, u, l, d, _.x, _.y) &&
          je(_.prev, _, _.next) >= 0)
      )
        return !1;
      _ = _.nextZ;
    }
    for (; E && E.z >= m; ) {
      if (
        E.x >= f &&
        E.x <= x &&
        E.y >= p &&
        E.y <= g &&
        E !== r &&
        E !== o &&
        bo(a, h, c, u, l, d, E.x, E.y) &&
        je(E.prev, E, E.next) >= 0
      )
        return !1;
      E = E.prevZ;
    }
    for (; _ && _.z <= y; ) {
      if (
        _.x >= f &&
        _.x <= x &&
        _.y >= p &&
        _.y <= g &&
        _ !== r &&
        _ !== o &&
        bo(a, h, c, u, l, d, _.x, _.y) &&
        je(_.prev, _, _.next) >= 0
      )
        return !1;
      _ = _.nextZ;
    }
    return !0;
  }
  function Tg(n, t) {
    let e = n;
    do {
      let i = e.prev,
        r = e.next.next;
      (!ks(i, r) &&
        Sp(i, e, e.next, r) &&
        $o(i, r) &&
        $o(r, i) &&
        (t.push(i.i, e.i, r.i), Yo(e), Yo(e.next), (e = n = r)),
        (e = e.next));
    } while (e !== n);
    return Vr(e);
  }
  function Ag(n, t, e, i, r, s) {
    let o = n;
    do {
      let a = o.next.next;
      for (; a !== o.prev; ) {
        if (o.i !== a.i && Ug(o, a)) {
          let c = Ep(o, a);
          ((o = Vr(o, o.next)), (c = Vr(c, c.next)), qo(o, t, e, i, r, s, 0), qo(c, t, e, i, r, s, 0));
          return;
        }
        a = a.next;
      }
      o = o.next;
    } while (o !== n);
  }
  function Rg(n, t, e, i) {
    let r = [];
    for (let s = 0, o = t.length; s < o; s++) {
      let a = t[s] * i,
        c = s < o - 1 ? t[s + 1] * i : n.length,
        l = bp(n, a, c, i, !1);
      (l === l.next && (l.steiner = !0), r.push(Fg(l)));
    }
    r.sort(Cg);
    for (let s = 0; s < r.length; s++) e = Ig(r[s], e);
    return e;
  }
  function Cg(n, t) {
    let e = n.x - t.x;
    if (e === 0 && ((e = n.y - t.y), e === 0)) {
      let i = (n.next.y - n.y) / (n.next.x - n.x),
        r = (t.next.y - t.y) / (t.next.x - t.x);
      e = i - r;
    }
    return e;
  }
  function Ig(n, t) {
    let e = Pg(n, t);
    if (!e) return t;
    let i = Ep(e, n);
    return (Vr(i, i.next), Vr(e, e.next));
  }
  function Pg(n, t) {
    let e = t,
      i = n.x,
      r = n.y,
      s = -1 / 0,
      o;
    if (ks(n, e)) return e;
    do {
      if (ks(n, e.next)) return e.next;
      if (r <= e.y && r >= e.next.y && e.next.y !== e.y) {
        let u = e.x + ((r - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
        if (u <= i && u > s && ((s = u), (o = e.x < e.next.x ? e : e.next), u === i)) return o;
      }
      e = e.next;
    } while (e !== t);
    if (!o) return null;
    let a = o,
      c = o.x,
      l = o.y,
      h = 1 / 0;
    e = o;
    do {
      if (i >= e.x && e.x >= c && i !== e.x && Mp(r < l ? i : s, r, c, l, r < l ? s : i, r, e.x, e.y)) {
        let u = Math.abs(r - e.y) / (i - e.x);
        $o(e, n) && (u < h || (u === h && (e.x > o.x || (e.x === o.x && Lg(o, e))))) && ((o = e), (h = u));
      }
      e = e.next;
    } while (e !== a);
    return o;
  }
  function Lg(n, t) {
    return je(n.prev, n, t.prev) < 0 && je(t.next, n, n.next) < 0;
  }
  function Dg(n, t, e, i) {
    let r = n;
    do (r.z === 0 && (r.z = Kh(r.x, r.y, t, e, i)), (r.prevZ = r.prev), (r.nextZ = r.next), (r = r.next));
    while (r !== n);
    ((r.prevZ.nextZ = null), (r.prevZ = null), Ng(r));
  }
  function Ng(n) {
    let t,
      e = 1;
    do {
      let i = n,
        r;
      n = null;
      let s = null;
      for (t = 0; i; ) {
        t++;
        let o = i,
          a = 0;
        for (let l = 0; l < e && (a++, (o = o.nextZ), !!o); l++);
        let c = e;
        for (; a > 0 || (c > 0 && o); )
          (a !== 0 && (c === 0 || !o || i.z <= o.z) ? ((r = i), (i = i.nextZ), a--) : ((r = o), (o = o.nextZ), c--),
            s ? (s.nextZ = r) : (n = r),
            (r.prevZ = s),
            (s = r));
        i = o;
      }
      ((s.nextZ = null), (e *= 2));
    } while (t > 1);
    return n;
  }
  function Kh(n, t, e, i, r) {
    return (
      (n = ((n - e) * r) | 0),
      (t = ((t - i) * r) | 0),
      (n = (n | (n << 8)) & 16711935),
      (n = (n | (n << 4)) & 252645135),
      (n = (n | (n << 2)) & 858993459),
      (n = (n | (n << 1)) & 1431655765),
      (t = (t | (t << 8)) & 16711935),
      (t = (t | (t << 4)) & 252645135),
      (t = (t | (t << 2)) & 858993459),
      (t = (t | (t << 1)) & 1431655765),
      n | (t << 1)
    );
  }
  function Fg(n) {
    let t = n,
      e = n;
    do ((t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next));
    while (t !== n);
    return e;
  }
  function Mp(n, t, e, i, r, s, o, a) {
    return (
      (r - o) * (t - a) >= (n - o) * (s - a) &&
      (n - o) * (i - a) >= (e - o) * (t - a) &&
      (e - o) * (s - a) >= (r - o) * (i - a)
    );
  }
  function bo(n, t, e, i, r, s, o, a) {
    return !(n === o && t === a) && Mp(n, t, e, i, r, s, o, a);
  }
  function Ug(n, t) {
    return (
      n.next.i !== t.i &&
      n.prev.i !== t.i &&
      !Og(n, t) &&
      (($o(n, t) && $o(t, n) && Bg(n, t) && (je(n.prev, n, t.prev) || je(n, t.prev, t))) ||
        (ks(n, t) && je(n.prev, n, n.next) > 0 && je(t.prev, t, t.next) > 0))
    );
  }
  function je(n, t, e) {
    return (t.y - n.y) * (e.x - t.x) - (t.x - n.x) * (e.y - t.y);
  }
  function ks(n, t) {
    return n.x === t.x && n.y === t.y;
  }
  function Sp(n, t, e, i) {
    let r = lc(je(n, t, e)),
      s = lc(je(n, t, i)),
      o = lc(je(e, i, n)),
      a = lc(je(e, i, t));
    return !!(
      (r !== s && o !== a) ||
      (r === 0 && cc(n, e, t)) ||
      (s === 0 && cc(n, i, t)) ||
      (o === 0 && cc(e, n, i)) ||
      (a === 0 && cc(e, t, i))
    );
  }
  function cc(n, t, e) {
    return (
      t.x <= Math.max(n.x, e.x) && t.x >= Math.min(n.x, e.x) && t.y <= Math.max(n.y, e.y) && t.y >= Math.min(n.y, e.y)
    );
  }
  function lc(n) {
    return n > 0 ? 1 : n < 0 ? -1 : 0;
  }
  function Og(n, t) {
    let e = n;
    do {
      if (e.i !== n.i && e.next.i !== n.i && e.i !== t.i && e.next.i !== t.i && Sp(e, e.next, n, t)) return !0;
      e = e.next;
    } while (e !== n);
    return !1;
  }
  function $o(n, t) {
    return je(n.prev, n, n.next) < 0
      ? je(n, t, n.next) >= 0 && je(n, n.prev, t) >= 0
      : je(n, t, n.prev) < 0 || je(n, n.next, t) < 0;
  }
  function Bg(n, t) {
    let e = n,
      i = !1,
      r = (n.x + t.x) / 2,
      s = (n.y + t.y) / 2;
    do
      (e.y > s != e.next.y > s &&
        e.next.y !== e.y &&
        r < ((e.next.x - e.x) * (s - e.y)) / (e.next.y - e.y) + e.x &&
        (i = !i),
        (e = e.next));
    while (e !== n);
    return i;
  }
  function Ep(n, t) {
    let e = Jh(n.i, n.x, n.y),
      i = Jh(t.i, t.x, t.y),
      r = n.next,
      s = t.prev;
    return (
      (n.next = t),
      (t.prev = n),
      (e.next = r),
      (r.prev = e),
      (i.next = e),
      (e.prev = i),
      (s.next = i),
      (i.prev = s),
      i
    );
  }
  function Ef(n, t, e, i) {
    let r = Jh(n, t, e);
    return (i ? ((r.next = i.next), (r.prev = i), (i.next.prev = r), (i.next = r)) : ((r.prev = r), (r.next = r)), r);
  }
  function Yo(n) {
    ((n.next.prev = n.prev),
      (n.prev.next = n.next),
      n.prevZ && (n.prevZ.nextZ = n.nextZ),
      n.nextZ && (n.nextZ.prevZ = n.prevZ));
  }
  function Jh(n, t, e) {
    return { i: n, x: t, y: e, prev: null, next: null, z: 0, prevZ: null, nextZ: null, steiner: !1 };
  }
  function kg(n, t, e, i) {
    let r = 0;
    for (let s = t, o = e - i; s < e; s += i) ((r += (n[o] - n[s]) * (n[s + 1] + n[o + 1])), (o = s));
    return r;
  }
  var Zh = class {
      static triangulate(t, e, i = 2) {
        return Sg(t, e, i);
      }
    },
    kr = class n {
      static area(t) {
        let e = t.length,
          i = 0;
        for (let r = e - 1, s = 0; s < e; r = s++) i += t[r].x * t[s].y - t[s].x * t[r].y;
        return i * 0.5;
      }
      static isClockWise(t) {
        return n.area(t) < 0;
      }
      static triangulateShape(t, e) {
        let i = [],
          r = [],
          s = [];
        (wf(t), Tf(i, t));
        let o = t.length;
        e.forEach(wf);
        for (let c = 0; c < e.length; c++) (r.push(o), (o += e[c].length), Tf(i, e[c]));
        let a = Zh.triangulate(i, r);
        for (let c = 0; c < a.length; c += 3) s.push(a.slice(c, c + 3));
        return s;
      }
    };
  function wf(n) {
    let t = n.length;
    t > 2 && n[t - 1].equals(n[0]) && n.pop();
  }
  function Tf(n, t) {
    for (let e = 0; e < t.length; e++) (n.push(t[e].x), n.push(t[e].y));
  }
  var Wr = class n extends Ae {
      constructor(t = new xr([new st(0.5, 0.5), new st(-0.5, 0.5), new st(-0.5, -0.5), new st(0.5, -0.5)]), e = {}) {
        (super(),
          (this.type = "ExtrudeGeometry"),
          (this.parameters = { shapes: t, options: e }),
          (t = Array.isArray(t) ? t : [t]));
        let i = this,
          r = [],
          s = [];
        for (let a = 0, c = t.length; a < c; a++) {
          let l = t[a];
          o(l);
        }
        (this.setAttribute("position", new ge(r, 3)),
          this.setAttribute("uv", new ge(s, 2)),
          this.computeVertexNormals());
        function o(a) {
          let c = [],
            l = e.curveSegments !== void 0 ? e.curveSegments : 12,
            h = e.steps !== void 0 ? e.steps : 1,
            u = e.depth !== void 0 ? e.depth : 1,
            d = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0,
            f = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2,
            p = e.bevelSize !== void 0 ? e.bevelSize : f - 0.1,
            x = e.bevelOffset !== void 0 ? e.bevelOffset : 0,
            g = e.bevelSegments !== void 0 ? e.bevelSegments : 3,
            m = e.extrudePath,
            y = e.UVGenerator !== void 0 ? e.UVGenerator : zg,
            E,
            _ = !1,
            T,
            w,
            v,
            S;
          if (m) {
            ((E = m.getSpacedPoints(h)), (_ = !0), (d = !1));
            let it = m.isCatmullRomCurve3 ? m.closed : !1;
            ((T = m.computeFrenetFrames(h, it)), (w = new R()), (v = new R()), (S = new R()));
          }
          d || ((g = 0), (f = 0), (p = 0), (x = 0));
          let F = a.extractPoints(l),
            I = F.shape,
            N = F.holes;
          if (!kr.isClockWise(I)) {
            I = I.reverse();
            for (let it = 0, ft = N.length; it < ft; it++) {
              let ht = N[it];
              kr.isClockWise(ht) && (N[it] = ht.reverse());
            }
          }
          function X(it) {
            let ht = 10000000000000001e-36,
              At = it[0];
            for (let _t = 1; _t <= it.length; _t++) {
              let Qt = _t % it.length,
                Ft = it[Qt],
                ue = Ft.x - At.x,
                de = Ft.y - At.y,
                be = ue * ue + de * de,
                D = Math.max(Math.abs(Ft.x), Math.abs(Ft.y), Math.abs(At.x), Math.abs(At.y)),
                en = ht * D * D;
              if (be <= en) {
                (it.splice(Qt, 1), _t--);
                continue;
              }
              At = Ft;
            }
          }
          (X(I), N.forEach(X));
          let P = N.length,
            H = I;
          for (let it = 0; it < P; it++) {
            let ft = N[it];
            I = I.concat(ft);
          }
          function Y(it, ft, ht) {
            return (ft || qt("ExtrudeGeometry: vec does not exist"), it.clone().addScaledVector(ft, ht));
          }
          let G = I.length;
          function ot(it, ft, ht) {
            let At,
              _t,
              Qt,
              Ft = it.x - ft.x,
              ue = it.y - ft.y,
              de = ht.x - it.x,
              be = ht.y - it.y,
              D = Ft * Ft + ue * ue,
              en = Ft * be - ue * de;
            if (Math.abs(en) > Number.EPSILON) {
              let ae = Math.sqrt(D),
                Oe = Math.sqrt(de * de + be * be),
                vt = ft.x - ue / ae,
                Je = ft.y + Ft / ae,
                zt = ht.x - be / Oe,
                jt = ht.y + de / Oe,
                A = ((zt - vt) * be - (jt - Je) * de) / (Ft * be - ue * de);
              ((At = vt + Ft * A - it.x), (_t = Je + ue * A - it.y));
              let b = At * At + _t * _t;
              if (b <= 2) return new st(At, _t);
              Qt = Math.sqrt(b / 2);
            } else {
              let ae = !1;
              (Ft > Number.EPSILON
                ? de > Number.EPSILON && (ae = !0)
                : Ft < -Number.EPSILON
                  ? de < -Number.EPSILON && (ae = !0)
                  : Math.sign(ue) === Math.sign(be) && (ae = !0),
                ae ? ((At = -ue), (_t = Ft), (Qt = Math.sqrt(D))) : ((At = Ft), (_t = ue), (Qt = Math.sqrt(D / 2))));
            }
            return new st(At / Qt, _t / Qt);
          }
          let $ = [];
          for (let it = 0, ft = H.length, ht = ft - 1, At = it + 1; it < ft; it++, ht++, At++)
            (ht === ft && (ht = 0), At === ft && (At = 0), ($[it] = ot(H[it], H[ht], H[At])));
          let nt = [],
            rt,
            Rt = $.concat();
          for (let it = 0, ft = P; it < ft; it++) {
            let ht = N[it];
            rt = [];
            for (let At = 0, _t = ht.length, Qt = _t - 1, Ft = At + 1; At < _t; At++, Qt++, Ft++)
              (Qt === _t && (Qt = 0), Ft === _t && (Ft = 0), (rt[At] = ot(ht[At], ht[Qt], ht[Ft])));
            (nt.push(rt), (Rt = Rt.concat(rt)));
          }
          let Ht;
          if (g === 0) Ht = kr.triangulateShape(H, N);
          else {
            let it = [],
              ft = [];
            for (let ht = 0; ht < g; ht++) {
              let At = ht / g,
                _t = f * Math.cos((At * Math.PI) / 2),
                Qt = p * Math.sin((At * Math.PI) / 2) + x;
              for (let Ft = 0, ue = H.length; Ft < ue; Ft++) {
                let de = Y(H[Ft], $[Ft], Qt);
                (kt(de.x, de.y, -_t), At === 0 && it.push(de));
              }
              for (let Ft = 0, ue = P; Ft < ue; Ft++) {
                let de = N[Ft];
                rt = nt[Ft];
                let be = [];
                for (let D = 0, en = de.length; D < en; D++) {
                  let ae = Y(de[D], rt[D], Qt);
                  (kt(ae.x, ae.y, -_t), At === 0 && be.push(ae));
                }
                At === 0 && ft.push(be);
              }
            }
            Ht = kr.triangulateShape(it, ft);
          }
          let K = Ht.length,
            bt = p + x;
          for (let it = 0; it < G; it++) {
            let ft = d ? Y(I[it], Rt[it], bt) : I[it];
            _
              ? (v.copy(T.normals[0]).multiplyScalar(ft.x),
                w.copy(T.binormals[0]).multiplyScalar(ft.y),
                S.copy(E[0]).add(v).add(w),
                kt(S.x, S.y, S.z))
              : kt(ft.x, ft.y, 0);
          }
          for (let it = 1; it <= h; it++)
            for (let ft = 0; ft < G; ft++) {
              let ht = d ? Y(I[ft], Rt[ft], bt) : I[ft];
              _
                ? (v.copy(T.normals[it]).multiplyScalar(ht.x),
                  w.copy(T.binormals[it]).multiplyScalar(ht.y),
                  S.copy(E[it]).add(v).add(w),
                  kt(S.x, S.y, S.z))
                : kt(ht.x, ht.y, (u / h) * it);
            }
          for (let it = g - 1; it >= 0; it--) {
            let ft = it / g,
              ht = f * Math.cos((ft * Math.PI) / 2),
              At = p * Math.sin((ft * Math.PI) / 2) + x;
            for (let _t = 0, Qt = H.length; _t < Qt; _t++) {
              let Ft = Y(H[_t], $[_t], At);
              kt(Ft.x, Ft.y, u + ht);
            }
            for (let _t = 0, Qt = N.length; _t < Qt; _t++) {
              let Ft = N[_t];
              rt = nt[_t];
              for (let ue = 0, de = Ft.length; ue < de; ue++) {
                let be = Y(Ft[ue], rt[ue], At);
                _ ? kt(be.x, be.y + E[h - 1].y, E[h - 1].x + ht) : kt(be.x, be.y, u + ht);
              }
            }
          }
          (Ct(), Bt());
          function Ct() {
            let it = r.length / 3;
            if (d) {
              let ft = 0,
                ht = G * ft;
              for (let At = 0; At < K; At++) {
                let _t = Ht[At];
                We(_t[2] + ht, _t[1] + ht, _t[0] + ht);
              }
              ((ft = h + g * 2), (ht = G * ft));
              for (let At = 0; At < K; At++) {
                let _t = Ht[At];
                We(_t[0] + ht, _t[1] + ht, _t[2] + ht);
              }
            } else {
              for (let ft = 0; ft < K; ft++) {
                let ht = Ht[ft];
                We(ht[2], ht[1], ht[0]);
              }
              for (let ft = 0; ft < K; ft++) {
                let ht = Ht[ft];
                We(ht[0] + G * h, ht[1] + G * h, ht[2] + G * h);
              }
            }
            i.addGroup(it, r.length / 3 - it, 0);
          }
          function Bt() {
            let it = r.length / 3,
              ft = 0;
            (Mt(H, ft), (ft += H.length));
            for (let ht = 0, At = N.length; ht < At; ht++) {
              let _t = N[ht];
              (Mt(_t, ft), (ft += _t.length));
            }
            i.addGroup(it, r.length / 3 - it, 1);
          }
          function Mt(it, ft) {
            let ht = it.length;
            for (; --ht >= 0; ) {
              let At = ht,
                _t = ht - 1;
              _t < 0 && (_t = it.length - 1);
              for (let Qt = 0, Ft = h + g * 2; Qt < Ft; Qt++) {
                let ue = G * Qt,
                  de = G * (Qt + 1),
                  be = ft + At + ue,
                  D = ft + _t + ue,
                  en = ft + _t + de,
                  ae = ft + At + de;
                Gt(be, D, en, ae);
              }
            }
          }
          function kt(it, ft, ht) {
            (c.push(it), c.push(ft), c.push(ht));
          }
          function We(it, ft, ht) {
            (oe(it), oe(ft), oe(ht));
            let At = r.length / 3,
              _t = y.generateTopUV(i, r, At - 3, At - 2, At - 1);
            (he(_t[0]), he(_t[1]), he(_t[2]));
          }
          function Gt(it, ft, ht, At) {
            (oe(it), oe(ft), oe(At), oe(ft), oe(ht), oe(At));
            let _t = r.length / 3,
              Qt = y.generateSideWallUV(i, r, _t - 6, _t - 3, _t - 2, _t - 1);
            (he(Qt[0]), he(Qt[1]), he(Qt[3]), he(Qt[1]), he(Qt[2]), he(Qt[3]));
          }
          function oe(it) {
            (r.push(c[it * 3 + 0]), r.push(c[it * 3 + 1]), r.push(c[it * 3 + 2]));
          }
          function he(it) {
            (s.push(it.x), s.push(it.y));
          }
        }
      }
      copy(t) {
        return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
      }
      toJSON() {
        let t = super.toJSON(),
          e = this.parameters.shapes,
          i = this.parameters.options;
        return Hg(e, i, t);
      }
      static fromJSON(t, e) {
        let i = [];
        for (let s = 0, o = t.shapes.length; s < o; s++) {
          let a = e[t.shapes[s]];
          i.push(a);
        }
        let r = t.options.extrudePath;
        return (r !== void 0 && (t.options.extrudePath = new Lc[r.type]().fromJSON(r)), new n(i, t.options));
      }
    },
    zg = {
      generateTopUV: function (n, t, e, i, r) {
        let s = t[e * 3],
          o = t[e * 3 + 1],
          a = t[i * 3],
          c = t[i * 3 + 1],
          l = t[r * 3],
          h = t[r * 3 + 1];
        return [new st(s, o), new st(a, c), new st(l, h)];
      },
      generateSideWallUV: function (n, t, e, i, r, s) {
        let o = t[e * 3],
          a = t[e * 3 + 1],
          c = t[e * 3 + 2],
          l = t[i * 3],
          h = t[i * 3 + 1],
          u = t[i * 3 + 2],
          d = t[r * 3],
          f = t[r * 3 + 1],
          p = t[r * 3 + 2],
          x = t[s * 3],
          g = t[s * 3 + 1],
          m = t[s * 3 + 2];
        return Math.abs(a - h) < Math.abs(o - l)
          ? [new st(o, 1 - c), new st(l, 1 - u), new st(d, 1 - p), new st(x, 1 - m)]
          : [new st(a, 1 - c), new st(h, 1 - u), new st(f, 1 - p), new st(g, 1 - m)];
      },
    };
  function Hg(n, t, e) {
    if (((e.shapes = []), Array.isArray(n)))
      for (let i = 0, r = n.length; i < r; i++) {
        let s = n[i];
        e.shapes.push(s.uuid);
      }
    else e.shapes.push(n.uuid);
    return (
      (e.options = Object.assign({}, t)),
      t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()),
      e
    );
  }
  var Ji = class n extends Ae {
    constructor(t = [new st(0, -0.5), new st(0.5, 0), new st(0, 0.5)], e = 12, i = 0, r = Math.PI * 2) {
      (super(),
        (this.type = "LatheGeometry"),
        (this.parameters = { points: t, segments: e, phiStart: i, phiLength: r }),
        (e = Math.floor(e)),
        (r = ce(r, 0, Math.PI * 2)));
      let s = [],
        o = [],
        a = [],
        c = [],
        l = [],
        h = 1 / e,
        u = new R(),
        d = new st(),
        f = new R(),
        p = new R(),
        x = new R(),
        g = 0,
        m = 0;
      for (let y = 0; y <= t.length - 1; y++)
        switch (y) {
          case 0:
            ((g = t[y + 1].x - t[y].x),
              (m = t[y + 1].y - t[y].y),
              (f.x = m * 1),
              (f.y = -g),
              (f.z = m * 0),
              x.copy(f),
              f.normalize(),
              c.push(f.x, f.y, f.z));
            break;
          case t.length - 1:
            (x.normalize(), c.push(x.x, x.y, x.z));
            break;
          default:
            ((g = t[y + 1].x - t[y].x),
              (m = t[y + 1].y - t[y].y),
              (f.x = m * 1),
              (f.y = -g),
              (f.z = m * 0),
              p.copy(f),
              (f.x += x.x),
              (f.y += x.y),
              (f.z += x.z),
              f.normalize(),
              c.push(f.x, f.y, f.z),
              x.copy(p));
        }
      for (let y = 0; y <= e; y++) {
        let E = i + y * h * r,
          _ = Math.sin(E),
          T = Math.cos(E);
        for (let w = 0; w <= t.length - 1; w++) {
          ((u.x = t[w].x * _),
            (u.y = t[w].y),
            (u.z = t[w].x * T),
            o.push(u.x, u.y, u.z),
            (d.x = y / e),
            (d.y = w / (t.length - 1)),
            a.push(d.x, d.y));
          let v = c[3 * w + 0] * _,
            S = c[3 * w + 1],
            F = c[3 * w + 0] * T;
          l.push(v, S, F);
        }
      }
      for (let y = 0; y < e; y++)
        for (let E = 0; E < t.length - 1; E++) {
          let _ = E + y * t.length,
            T = _,
            w = _ + t.length,
            v = _ + t.length + 1,
            S = _ + 1;
          (s.push(T, w, S), s.push(v, S, w));
        }
      (this.setIndex(s),
        this.setAttribute("position", new ge(o, 3)),
        this.setAttribute("uv", new ge(a, 2)),
        this.setAttribute("normal", new ge(l, 3)));
    }
    copy(t) {
      return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
    }
    static fromJSON(t) {
      return new n(t.points, t.segments, t.phiStart, t.phiLength);
    }
  };
  var sn = class n extends Ae {
      constructor(t = 1, e = 1, i = 1, r = 1) {
        (super(),
          (this.type = "PlaneGeometry"),
          (this.parameters = { width: t, height: e, widthSegments: i, heightSegments: r }));
        let s = t / 2,
          o = e / 2,
          a = Math.floor(i),
          c = Math.floor(r),
          l = a + 1,
          h = c + 1,
          u = t / a,
          d = e / c,
          f = [],
          p = [],
          x = [],
          g = [];
        for (let m = 0; m < h; m++) {
          let y = m * d - o;
          for (let E = 0; E < l; E++) {
            let _ = E * u - s;
            (p.push(_, -y, 0), x.push(0, 0, 1), g.push(E / a), g.push(1 - m / c));
          }
        }
        for (let m = 0; m < c; m++)
          for (let y = 0; y < a; y++) {
            let E = y + l * m,
              _ = y + l * (m + 1),
              T = y + 1 + l * (m + 1),
              w = y + 1 + l * m;
            (f.push(E, _, w), f.push(_, T, w));
          }
        (this.setIndex(f),
          this.setAttribute("position", new ge(p, 3)),
          this.setAttribute("normal", new ge(x, 3)),
          this.setAttribute("uv", new ge(g, 2)));
      }
      copy(t) {
        return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
      }
      static fromJSON(t) {
        return new n(t.width, t.height, t.widthSegments, t.heightSegments);
      }
    },
    Zi = class n extends Ae {
      constructor(t = 0.5, e = 1, i = 32, r = 1, s = 0, o = Math.PI * 2) {
        (super(),
          (this.type = "RingGeometry"),
          (this.parameters = {
            innerRadius: t,
            outerRadius: e,
            thetaSegments: i,
            phiSegments: r,
            thetaStart: s,
            thetaLength: o,
          }),
          (i = Math.max(3, i)),
          (r = Math.max(1, r)));
        let a = [],
          c = [],
          l = [],
          h = [],
          u = t,
          d = (e - t) / r,
          f = new R(),
          p = new st();
        for (let x = 0; x <= r; x++) {
          for (let g = 0; g <= i; g++) {
            let m = s + (g / i) * o;
            ((f.x = u * Math.cos(m)),
              (f.y = u * Math.sin(m)),
              c.push(f.x, f.y, f.z),
              l.push(0, 0, 1),
              (p.x = (f.x / e + 1) / 2),
              (p.y = (f.y / e + 1) / 2),
              h.push(p.x, p.y));
          }
          u += d;
        }
        for (let x = 0; x < r; x++) {
          let g = x * (i + 1);
          for (let m = 0; m < i; m++) {
            let y = m + g,
              E = y,
              _ = y + i + 1,
              T = y + i + 2,
              w = y + 1;
            (a.push(E, _, w), a.push(_, T, w));
          }
        }
        (this.setIndex(a),
          this.setAttribute("position", new ge(c, 3)),
          this.setAttribute("normal", new ge(l, 3)),
          this.setAttribute("uv", new ge(h, 2)));
      }
      copy(t) {
        return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
      }
      static fromJSON(t) {
        return new n(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
      }
    };
  var tn = class n extends Ae {
    constructor(t = 1, e = 32, i = 16, r = 0, s = Math.PI * 2, o = 0, a = Math.PI) {
      (super(),
        (this.type = "SphereGeometry"),
        (this.parameters = {
          radius: t,
          widthSegments: e,
          heightSegments: i,
          phiStart: r,
          phiLength: s,
          thetaStart: o,
          thetaLength: a,
        }),
        (e = Math.max(3, Math.floor(e))),
        (i = Math.max(2, Math.floor(i))));
      let c = Math.min(o + a, Math.PI),
        l = 0,
        h = [],
        u = new R(),
        d = new R(),
        f = [],
        p = [],
        x = [],
        g = [];
      for (let m = 0; m <= i; m++) {
        let y = [],
          E = m / i,
          _ = o + E * a,
          T = t * Math.cos(_),
          w = Math.sqrt(t * t - T * T),
          v = 0;
        m === 0 && o === 0 ? (v = 0.5 / e) : m === i && c === Math.PI && (v = -0.5 / e);
        for (let S = 0; S <= e; S++) {
          let F = S / e,
            I = r + F * s;
          ((u.x = -w * Math.cos(I)),
            (u.y = T),
            (u.z = w * Math.sin(I)),
            p.push(u.x, u.y, u.z),
            d.copy(u).normalize(),
            x.push(d.x, d.y, d.z),
            g.push(F + v, 1 - E),
            y.push(l++));
        }
        h.push(y);
      }
      for (let m = 0; m < i; m++)
        for (let y = 0; y < e; y++) {
          let E = h[m][y + 1],
            _ = h[m][y],
            T = h[m + 1][y],
            w = h[m + 1][y + 1];
          ((m !== 0 || o > 0) && f.push(E, _, w), (m !== i - 1 || c < Math.PI) && f.push(_, T, w));
        }
      (this.setIndex(f),
        this.setAttribute("position", new ge(p, 3)),
        this.setAttribute("normal", new ge(x, 3)),
        this.setAttribute("uv", new ge(g, 2)));
    }
    copy(t) {
      return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
    }
    static fromJSON(t) {
      return new n(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
    }
  };
  var hn = class n extends Ae {
    constructor(t = 1, e = 0.4, i = 12, r = 48, s = Math.PI * 2, o = 0, a = Math.PI * 2) {
      (super(),
        (this.type = "TorusGeometry"),
        (this.parameters = {
          radius: t,
          tube: e,
          radialSegments: i,
          tubularSegments: r,
          arc: s,
          thetaStart: o,
          thetaLength: a,
        }),
        (i = Math.floor(i)),
        (r = Math.floor(r)));
      let c = [],
        l = [],
        h = [],
        u = [],
        d = new R(),
        f = new R(),
        p = new R();
      for (let x = 0; x <= i; x++) {
        let g = o + (x / i) * a;
        for (let m = 0; m <= r; m++) {
          let y = (m / r) * s;
          ((f.x = (t + e * Math.cos(g)) * Math.cos(y)),
            (f.y = (t + e * Math.cos(g)) * Math.sin(y)),
            (f.z = e * Math.sin(g)),
            l.push(f.x, f.y, f.z),
            (d.x = t * Math.cos(y)),
            (d.y = t * Math.sin(y)),
            p.subVectors(f, d).normalize(),
            h.push(p.x, p.y, p.z),
            u.push(m / r),
            u.push(x / i));
        }
      }
      for (let x = 1; x <= i; x++)
        for (let g = 1; g <= r; g++) {
          let m = (r + 1) * x + g - 1,
            y = (r + 1) * (x - 1) + g - 1,
            E = (r + 1) * (x - 1) + g,
            _ = (r + 1) * x + g;
          (c.push(m, y, _), c.push(y, E, _));
        }
      (this.setIndex(c),
        this.setAttribute("position", new ge(l, 3)),
        this.setAttribute("normal", new ge(h, 3)),
        this.setAttribute("uv", new ge(u, 2)));
    }
    copy(t) {
      return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
    }
    static fromJSON(t) {
      return new n(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
    }
  };
  var jo = class n extends Ae {
    constructor(t = new Vo(new R(-1, -1, 0), new R(-1, 1, 0), new R(1, 1, 0)), e = 64, i = 1, r = 8, s = !1) {
      (super(),
        (this.type = "TubeGeometry"),
        (this.parameters = { path: t, tubularSegments: e, radius: i, radialSegments: r, closed: s }));
      let o = t.computeFrenetFrames(e, s);
      ((this.tangents = o.tangents), (this.normals = o.normals), (this.binormals = o.binormals));
      let a = new R(),
        c = new R(),
        l = new st(),
        h = new R(),
        u = [],
        d = [],
        f = [],
        p = [];
      (x(),
        this.setIndex(p),
        this.setAttribute("position", new ge(u, 3)),
        this.setAttribute("normal", new ge(d, 3)),
        this.setAttribute("uv", new ge(f, 2)));
      function x() {
        for (let E = 0; E < e; E++) g(E);
        (g(s === !1 ? e : 0), y(), m());
      }
      function g(E) {
        h = t.getPointAt(E / e, h);
        let _ = o.normals[E],
          T = o.binormals[E];
        for (let w = 0; w <= r; w++) {
          let v = (w / r) * Math.PI * 2,
            S = Math.sin(v),
            F = -Math.cos(v);
          ((c.x = F * _.x + S * T.x),
            (c.y = F * _.y + S * T.y),
            (c.z = F * _.z + S * T.z),
            c.normalize(),
            d.push(c.x, c.y, c.z),
            (a.x = h.x + i * c.x),
            (a.y = h.y + i * c.y),
            (a.z = h.z + i * c.z),
            u.push(a.x, a.y, a.z));
        }
      }
      function m() {
        for (let E = 1; E <= e; E++)
          for (let _ = 1; _ <= r; _++) {
            let T = (r + 1) * (E - 1) + (_ - 1),
              w = (r + 1) * E + (_ - 1),
              v = (r + 1) * E + _,
              S = (r + 1) * (E - 1) + _;
            (p.push(T, w, S), p.push(w, v, S));
          }
      }
      function y() {
        for (let E = 0; E <= e; E++) for (let _ = 0; _ <= r; _++) ((l.x = E / e), (l.y = _ / r), f.push(l.x, l.y));
      }
    }
    copy(t) {
      return (super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this);
    }
    toJSON() {
      let t = super.toJSON();
      return ((t.path = this.parameters.path.toJSON()), t);
    }
    static fromJSON(t) {
      return new n(new Lc[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
    }
  };
  function Kr(n) {
    let t = {};
    for (let e in n) {
      t[e] = {};
      for (let i in n[e]) {
        let r = n[e][i];
        if (Af(r))
          r.isRenderTargetTexture
            ? (Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),
              (t[e][i] = null))
            : (t[e][i] = r.clone());
        else if (Array.isArray(r))
          if (Af(r[0])) {
            let s = [];
            for (let o = 0, a = r.length; o < a; o++) s[o] = r[o].clone();
            t[e][i] = s;
          } else t[e][i] = r.slice();
        else t[e][i] = r;
      }
    }
    return t;
  }
  function Dn(n) {
    let t = {};
    for (let e = 0; e < n.length; e++) {
      let i = Kr(n[e]);
      for (let r in i) t[r] = i[r];
    }
    return t;
  }
  function Af(n) {
    return (
      n &&
      (n.isColor ||
        n.isMatrix3 ||
        n.isMatrix4 ||
        n.isVector2 ||
        n.isVector3 ||
        n.isVector4 ||
        n.isTexture ||
        n.isQuaternion)
    );
  }
  function Gg(n) {
    let t = [];
    for (let e = 0; e < n.length; e++) t.push(n[e].clone());
    return t;
  }
  function Cu(n) {
    let t = n.getRenderTarget();
    return t === null ? n.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : me.workingColorSpace;
  }
  var wp = { clone: Kr, merge: Dn },
    Vg = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
    Wg = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,
    Me = class extends Ci {
      constructor(t) {
        (super(),
          (this.isShaderMaterial = !0),
          (this.type = "ShaderMaterial"),
          (this.defines = {}),
          (this.uniforms = {}),
          (this.uniformsGroups = []),
          (this.vertexShader = Vg),
          (this.fragmentShader = Wg),
          (this.linewidth = 1),
          (this.wireframe = !1),
          (this.wireframeLinewidth = 1),
          (this.fog = !1),
          (this.lights = !1),
          (this.clipping = !1),
          (this.forceSinglePass = !0),
          (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
          (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }),
          (this.index0AttributeName = void 0),
          (this.uniformsNeedUpdate = !1),
          (this.glslVersion = null),
          t !== void 0 && this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          (this.fragmentShader = t.fragmentShader),
          (this.vertexShader = t.vertexShader),
          (this.uniforms = Kr(t.uniforms)),
          (this.uniformsGroups = Gg(t.uniformsGroups)),
          (this.defines = Object.assign({}, t.defines)),
          (this.wireframe = t.wireframe),
          (this.wireframeLinewidth = t.wireframeLinewidth),
          (this.fog = t.fog),
          (this.lights = t.lights),
          (this.clipping = t.clipping),
          (this.extensions = Object.assign({}, t.extensions)),
          (this.glslVersion = t.glslVersion),
          (this.defaultAttributeValues = Object.assign({}, t.defaultAttributeValues)),
          (this.index0AttributeName = t.index0AttributeName),
          (this.uniformsNeedUpdate = t.uniformsNeedUpdate),
          this
        );
      }
      toJSON(t) {
        let e = super.toJSON(t);
        ((e.glslVersion = this.glslVersion), (e.uniforms = {}));
        for (let r in this.uniforms) {
          let o = this.uniforms[r].value;
          o && o.isTexture
            ? (e.uniforms[r] = { type: "t", value: o.toJSON(t).uuid })
            : o && o.isColor
              ? (e.uniforms[r] = { type: "c", value: o.getHex() })
              : o && o.isVector2
                ? (e.uniforms[r] = { type: "v2", value: o.toArray() })
                : o && o.isVector3
                  ? (e.uniforms[r] = { type: "v3", value: o.toArray() })
                  : o && o.isVector4
                    ? (e.uniforms[r] = { type: "v4", value: o.toArray() })
                    : o && o.isMatrix3
                      ? (e.uniforms[r] = { type: "m3", value: o.toArray() })
                      : o && o.isMatrix4
                        ? (e.uniforms[r] = { type: "m4", value: o.toArray() })
                        : (e.uniforms[r] = { value: o });
        }
        (Object.keys(this.defines).length > 0 && (e.defines = this.defines),
          (e.vertexShader = this.vertexShader),
          (e.fragmentShader = this.fragmentShader),
          (e.lights = this.lights),
          (e.clipping = this.clipping));
        let i = {};
        for (let r in this.extensions) this.extensions[r] === !0 && (i[r] = !0);
        return (Object.keys(i).length > 0 && (e.extensions = i), e);
      }
      fromJSON(t, e) {
        if ((super.fromJSON(t, e), t.uniforms !== void 0))
          for (let i in t.uniforms) {
            let r = t.uniforms[i];
            switch (((this.uniforms[i] = {}), r.type)) {
              case "t":
                this.uniforms[i].value = e[r.value] || null;
                break;
              case "c":
                this.uniforms[i].value = new Tt().setHex(r.value);
                break;
              case "v2":
                this.uniforms[i].value = new st().fromArray(r.value);
                break;
              case "v3":
                this.uniforms[i].value = new R().fromArray(r.value);
                break;
              case "v4":
                this.uniforms[i].value = new Ee().fromArray(r.value);
                break;
              case "m3":
                this.uniforms[i].value = new Kt().fromArray(r.value);
                break;
              case "m4":
                this.uniforms[i].value = new le().fromArray(r.value);
                break;
              default:
                this.uniforms[i].value = r.value;
            }
          }
        if (
          (t.defines !== void 0 && (this.defines = t.defines),
          t.vertexShader !== void 0 && (this.vertexShader = t.vertexShader),
          t.fragmentShader !== void 0 && (this.fragmentShader = t.fragmentShader),
          t.glslVersion !== void 0 && (this.glslVersion = t.glslVersion),
          t.extensions !== void 0)
        )
          for (let i in t.extensions) this.extensions[i] = t.extensions[i];
        return (
          t.lights !== void 0 && (this.lights = t.lights),
          t.clipping !== void 0 && (this.clipping = t.clipping),
          this
        );
      }
    },
    Nc = class extends Me {
      constructor(t) {
        (super(t), (this.isRawShaderMaterial = !0), (this.type = "RawShaderMaterial"));
      }
    },
    yr = class extends Ci {
      constructor(t) {
        (super(),
          (this.isMeshStandardMaterial = !0),
          (this.type = "MeshStandardMaterial"),
          (this.defines = { STANDARD: "" }),
          (this.color = new Tt(16777215)),
          (this.roughness = 1),
          (this.metalness = 0),
          (this.map = null),
          (this.lightMap = null),
          (this.lightMapIntensity = 1),
          (this.aoMap = null),
          (this.aoMapIntensity = 1),
          (this.emissive = new Tt(0)),
          (this.emissiveIntensity = 1),
          (this.emissiveMap = null),
          (this.bumpMap = null),
          (this.bumpScale = 1),
          (this.normalMap = null),
          (this.normalMapType = Fl),
          (this.normalScale = new st(1, 1)),
          (this.displacementMap = null),
          (this.displacementScale = 1),
          (this.displacementBias = 0),
          (this.roughnessMap = null),
          (this.metalnessMap = null),
          (this.alphaMap = null),
          (this.envMap = null),
          (this.envMapRotation = new gi()),
          (this.envMapIntensity = 1),
          (this.wireframe = !1),
          (this.wireframeLinewidth = 1),
          (this.wireframeLinecap = "round"),
          (this.wireframeLinejoin = "round"),
          (this.flatShading = !1),
          (this.fog = !0),
          this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          (this.defines = { STANDARD: "" }),
          this.color.copy(t.color),
          (this.roughness = t.roughness),
          (this.metalness = t.metalness),
          (this.map = t.map),
          (this.lightMap = t.lightMap),
          (this.lightMapIntensity = t.lightMapIntensity),
          (this.aoMap = t.aoMap),
          (this.aoMapIntensity = t.aoMapIntensity),
          this.emissive.copy(t.emissive),
          (this.emissiveMap = t.emissiveMap),
          (this.emissiveIntensity = t.emissiveIntensity),
          (this.bumpMap = t.bumpMap),
          (this.bumpScale = t.bumpScale),
          (this.normalMap = t.normalMap),
          (this.normalMapType = t.normalMapType),
          this.normalScale.copy(t.normalScale),
          (this.displacementMap = t.displacementMap),
          (this.displacementScale = t.displacementScale),
          (this.displacementBias = t.displacementBias),
          (this.roughnessMap = t.roughnessMap),
          (this.metalnessMap = t.metalnessMap),
          (this.alphaMap = t.alphaMap),
          (this.envMap = t.envMap),
          this.envMapRotation.copy(t.envMapRotation),
          (this.envMapIntensity = t.envMapIntensity),
          (this.wireframe = t.wireframe),
          (this.wireframeLinewidth = t.wireframeLinewidth),
          (this.wireframeLinecap = t.wireframeLinecap),
          (this.wireframeLinejoin = t.wireframeLinejoin),
          (this.flatShading = t.flatShading),
          (this.fog = t.fog),
          this
        );
      }
    };
  var Fc = class extends Ci {
      constructor(t) {
        (super(),
          (this.isMeshDepthMaterial = !0),
          (this.type = "MeshDepthMaterial"),
          (this.depthPacking = rp),
          (this.map = null),
          (this.alphaMap = null),
          (this.displacementMap = null),
          (this.displacementScale = 1),
          (this.displacementBias = 0),
          (this.wireframe = !1),
          (this.wireframeLinewidth = 1),
          this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          (this.depthPacking = t.depthPacking),
          (this.map = t.map),
          (this.alphaMap = t.alphaMap),
          (this.displacementMap = t.displacementMap),
          (this.displacementScale = t.displacementScale),
          (this.displacementBias = t.displacementBias),
          (this.wireframe = t.wireframe),
          (this.wireframeLinewidth = t.wireframeLinewidth),
          this
        );
      }
    },
    Uc = class extends Ci {
      constructor(t) {
        (super(),
          (this.isMeshDistanceMaterial = !0),
          (this.type = "MeshDistanceMaterial"),
          (this.map = null),
          (this.alphaMap = null),
          (this.displacementMap = null),
          (this.displacementScale = 1),
          (this.displacementBias = 0),
          this.setValues(t));
      }
      copy(t) {
        return (
          super.copy(t),
          (this.map = t.map),
          (this.alphaMap = t.alphaMap),
          (this.displacementMap = t.displacementMap),
          (this.displacementScale = t.displacementScale),
          (this.displacementBias = t.displacementBias),
          this
        );
      }
    };
  function Es(n, t) {
    return !n || n.constructor === t
      ? n
      : typeof t.BYTES_PER_ELEMENT == "number"
        ? new t(n)
        : Array.prototype.slice.call(n);
  }
  function hc(n) {
    return n !== void 0 && n.inTangents !== void 0 && n.outTangents !== void 0;
  }
  var _r = class {
      constructor(t, e, i, r) {
        ((this.parameterPositions = t),
          (this._cachedIndex = 0),
          (this.resultBuffer = r !== void 0 ? r : new e.constructor(i)),
          (this.sampleValues = e),
          (this.valueSize = i),
          (this.settings = null),
          (this.DefaultSettings_ = {}));
      }
      evaluate(t) {
        let e = this.parameterPositions,
          i = this._cachedIndex,
          r = e[i],
          s = e[i - 1];
        n: {
          t: {
            let o;
            e: {
              i: if (!(t < r)) {
                for (let a = i + 2; ; ) {
                  if (r === void 0) {
                    if (t < s) break i;
                    return ((i = e.length), (this._cachedIndex = i), this.copySampleValue_(i - 1));
                  }
                  if (i === a) break;
                  if (((s = r), (r = e[++i]), t < r)) break t;
                }
                o = e.length;
                break e;
              }
              if (!(t >= s)) {
                let a = e[1];
                t < a && ((i = 2), (s = a));
                for (let c = i - 2; ; ) {
                  if (s === void 0) return ((this._cachedIndex = 0), this.copySampleValue_(0));
                  if (i === c) break;
                  if (((r = s), (s = e[--i - 1]), t >= s)) break t;
                }
                ((o = i), (i = 0));
                break e;
              }
              break n;
            }
            for (; i < o; ) {
              let a = (i + o) >>> 1;
              t < e[a] ? (o = a) : (i = a + 1);
            }
            if (((r = e[i]), (s = e[i - 1]), s === void 0)) return ((this._cachedIndex = 0), this.copySampleValue_(0));
            if (r === void 0) return ((i = e.length), (this._cachedIndex = i), this.copySampleValue_(i - 1));
          }
          ((this._cachedIndex = i), this.intervalChanged_(i, s, r));
        }
        return this.interpolate_(i, s, t, r);
      }
      getSettings_() {
        return this.settings || this.DefaultSettings_;
      }
      copySampleValue_(t) {
        let e = this.resultBuffer,
          i = this.sampleValues,
          r = this.valueSize,
          s = t * r;
        for (let o = 0; o !== r; ++o) e[o] = i[s + o];
        return e;
      }
      interpolate_() {
        throw new Error("THREE.Interpolant: Call to abstract method.");
      }
      intervalChanged_() {}
    },
    Oc = class extends _r {
      constructor(t, e, i, r) {
        (super(t, e, i, r),
          (this._weightPrev = -0),
          (this._offsetPrev = -0),
          (this._weightNext = -0),
          (this._offsetNext = -0),
          (this.DefaultSettings_ = { endingStart: qh, endingEnd: qh }));
      }
      intervalChanged_(t, e, i) {
        let r = this.parameterPositions,
          s = t - 2,
          o = t + 1,
          a = r[s],
          c = r[o];
        if (a === void 0)
          switch (this.getSettings_().endingStart) {
            case $h:
              ((s = t), (a = 2 * e - i));
              break;
            case Yh:
              ((s = r.length - 2), (a = e + r[s] - r[s + 1]));
              break;
            default:
              ((s = t), (a = i));
          }
        if (c === void 0)
          switch (this.getSettings_().endingEnd) {
            case $h:
              ((o = t), (c = 2 * i - e));
              break;
            case Yh:
              ((o = 1), (c = i + r[1] - r[0]));
              break;
            default:
              ((o = t - 1), (c = e));
          }
        let l = (i - e) * 0.5,
          h = this.valueSize;
        ((this._weightPrev = l / (e - a)),
          (this._weightNext = l / (c - i)),
          (this._offsetPrev = s * h),
          (this._offsetNext = o * h));
      }
      interpolate_(t, e, i, r) {
        let s = this.resultBuffer,
          o = this.sampleValues,
          a = this.valueSize,
          c = t * a,
          l = c - a,
          h = this._offsetPrev,
          u = this._offsetNext,
          d = this._weightPrev,
          f = this._weightNext,
          p = (i - e) / (r - e),
          x = p * p,
          g = x * p,
          m = -d * g + 2 * d * x - d * p,
          y = (1 + d) * g + (-1.5 - 2 * d) * x + (-0.5 + d) * p + 1,
          E = (-1 - f) * g + (1.5 + f) * x + 0.5 * p,
          _ = f * g - f * x;
        for (let T = 0; T !== a; ++T) s[T] = m * o[h + T] + y * o[l + T] + E * o[c + T] + _ * o[u + T];
        return s;
      }
    },
    Bc = class extends _r {
      constructor(t, e, i, r) {
        super(t, e, i, r);
      }
      interpolate_(t, e, i, r) {
        let s = this.resultBuffer,
          o = this.sampleValues,
          a = this.valueSize,
          c = t * a,
          l = c - a,
          h = (i - e) / (r - e),
          u = 1 - h;
        for (let d = 0; d !== a; ++d) s[d] = o[l + d] * u + o[c + d] * h;
        return s;
      }
    },
    kc = class extends _r {
      constructor(t, e, i, r) {
        super(t, e, i, r);
      }
      interpolate_(t) {
        return this.copySampleValue_(t - 1);
      }
    },
    zc = class extends _r {
      interpolate_(t, e, i, r) {
        let s = this.resultBuffer,
          o = this.sampleValues,
          a = this.valueSize,
          c = t * a,
          l = c - a,
          h = this.inTangents,
          u = this.outTangents;
        if (!h || !u) {
          let p = (i - e) / (r - e),
            x = 1 - p;
          for (let g = 0; g !== a; ++g) s[g] = o[l + g] * x + o[c + g] * p;
          return s;
        }
        let d = a * 2,
          f = t - 1;
        for (let p = 0; p !== a; ++p) {
          let x = o[l + p],
            g = o[c + p],
            m = f * d + p * 2,
            y = u[m],
            E = u[m + 1],
            _ = t * d + p * 2,
            T = h[_],
            w = h[_ + 1],
            v = qg(i, e, y, T, r);
          s[p] = Tp(v, x, E, w, g);
        }
        return s;
      }
    };
  function Tp(n, t, e, i, r) {
    let s = 1 - n;
    return s * s * s * t + 3 * s * s * n * e + 3 * s * n * n * i + n * n * n * r;
  }
  function Xg(n, t, e, i, r) {
    let s = 1 - n;
    return 3 * s * s * (e - t) + 6 * s * n * (i - e) + 3 * n * n * (r - i);
  }
  function qg(n, t, e, i, r) {
    let s = (n - t) / (r - t);
    for (let o = 0; o < 8; o++) {
      let a = Tp(s, t, e, i, r) - n;
      if (Math.abs(a) < 1e-10) break;
      let c = Xg(s, t, e, i, r);
      if (Math.abs(c) < 1e-10) break;
      s = Math.max(0, Math.min(1, s - a / c));
    }
    return s;
  }
  var Xn = class {
    constructor(t, e, i, r) {
      if (t === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (e === void 0 || e.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
      ((this.name = t),
        (this.times = Es(e, this.TimeBufferType)),
        (this.values = Es(i, this.ValueBufferType)),
        this.setInterpolation(r || this.DefaultInterpolation));
    }
    static toJSON(t) {
      let e = t.constructor,
        i;
      if (e.toJSON !== this.toJSON) i = e.toJSON(t);
      else {
        i = { name: t.name, times: Es(t.times, Array), values: Es(t.values, Array) };
        let r = t.getInterpolation();
        (r !== t.DefaultInterpolation && (i.interpolation = r),
          hc(t.settings) &&
            (i.settings = {
              inTangents: Es(t.settings.inTangents, Array),
              outTangents: Es(t.settings.outTangents, Array),
            }));
      }
      return ((i.type = t.ValueTypeName), i);
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new kc(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodLinear(t) {
      return new Bc(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodSmooth(t) {
      return new Oc(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodBezier(t) {
      let e = new zc(this.times, this.values, this.getValueSize(), t);
      return (
        this.settings && ((e.inTangents = this.settings.inTangents), (e.outTangents = this.settings.outTangents)),
        e
      );
    }
    setInterpolation(t) {
      let e;
      switch (t) {
        case wo:
          e = this.InterpolantFactoryMethodDiscrete;
          break;
        case Sc:
          e = this.InterpolantFactoryMethodLinear;
          break;
        case fc:
          e = this.InterpolantFactoryMethodSmooth;
          break;
        case Xh:
          e = this.InterpolantFactoryMethodBezier;
          break;
      }
      if (e === void 0) {
        let i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (this.createInterpolant === void 0)
          if (t !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
          else throw new Error(i);
        return (Vt("KeyframeTrack:", i), this);
      }
      return ((this.createInterpolant = e), this);
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return wo;
        case this.InterpolantFactoryMethodLinear:
          return Sc;
        case this.InterpolantFactoryMethodSmooth:
          return fc;
        case this.InterpolantFactoryMethodBezier:
          return Xh;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(t) {
      if (t !== 0) {
        let e = this.times;
        for (let i = 0, r = e.length; i !== r; ++i) e[i] += t;
        hc(this.settings) && (Rf(this.settings.inTangents, t), Rf(this.settings.outTangents, t));
      }
      return this;
    }
    scale(t) {
      if (t !== 1) {
        let e = this.times;
        for (let i = 0, r = e.length; i !== r; ++i) e[i] *= t;
        hc(this.settings) && (Cf(this.settings.inTangents, t), Cf(this.settings.outTangents, t));
      }
      return this;
    }
    trim(t, e) {
      let i = this.times,
        r = i.length,
        s = 0,
        o = r - 1;
      for (; s !== r && i[s] < t; ) ++s;
      for (; o !== -1 && i[o] > e; ) --o;
      if ((++o, s !== 0 || o !== r)) {
        s >= o && ((o = Math.max(o, 1)), (s = o - 1));
        let a = this.getValueSize();
        ((this.times = i.slice(s, o)), (this.values = this.values.slice(s * a, o * a)));
      }
      return this;
    }
    validate() {
      let t = !0,
        e = this.getValueSize();
      e - Math.floor(e) !== 0 && (qt("KeyframeTrack: Invalid value size in track.", this), (t = !1));
      let i = this.times,
        r = this.values,
        s = i.length;
      s === 0 && (qt("KeyframeTrack: Track is empty.", this), (t = !1));
      let o = null;
      for (let a = 0; a !== s; a++) {
        let c = i[a];
        if (typeof c == "number" && isNaN(c)) {
          (qt("KeyframeTrack: Time is not a valid number.", this, a, c), (t = !1));
          break;
        }
        if (o !== null && o > c) {
          (qt("KeyframeTrack: Out of order keys.", this, a, c, o), (t = !1));
          break;
        }
        o = c;
      }
      if (r !== void 0 && j0(r))
        for (let a = 0, c = r.length; a !== c; ++a) {
          let l = r[a];
          if (isNaN(l)) {
            (qt("KeyframeTrack: Value is not a valid number.", this, a, l), (t = !1));
            break;
          }
        }
      return t;
    }
    optimize() {
      let t = this.times.slice(),
        e = this.values.slice(),
        i = this.getValueSize(),
        r = this.getInterpolation() === fc,
        s = t.length - 1,
        o = 1;
      for (let a = 1; a < s; ++a) {
        let c = !1,
          l = t[a],
          h = t[a + 1];
        if (l !== h && (a !== 1 || l !== t[0]))
          if (r) c = !0;
          else {
            let u = a * i,
              d = u - i,
              f = u + i;
            for (let p = 0; p !== i; ++p) {
              let x = e[u + p];
              if (x !== e[d + p] || x !== e[f + p]) {
                c = !0;
                break;
              }
            }
          }
        if (c) {
          if (a !== o) {
            t[o] = t[a];
            let u = a * i,
              d = o * i;
            for (let f = 0; f !== i; ++f) e[d + f] = e[u + f];
          }
          ++o;
        }
      }
      if (s > 0) {
        t[o] = t[s];
        for (let a = s * i, c = o * i, l = 0; l !== i; ++l) e[c + l] = e[a + l];
        ++o;
      }
      return (
        o !== t.length
          ? ((this.times = t.slice(0, o)), (this.values = e.slice(0, o * i)))
          : ((this.times = t), (this.values = e)),
        this
      );
    }
    clone() {
      let t = this.times.slice(),
        e = this.values.slice(),
        i = this.constructor,
        r = new i(this.name, t, e);
      return (
        (r.createInterpolant = this.createInterpolant),
        hc(this.settings) &&
          (r.settings = {
            inTangents: this.settings.inTangents.slice(),
            outTangents: this.settings.outTangents.slice(),
          }),
        r
      );
    }
  };
  function Rf(n, t) {
    for (let e = 0, i = n.length; e !== i; e += 2) n[e] += t;
  }
  function Cf(n, t) {
    for (let e = 0, i = n.length; e !== i; e += 2) n[e] *= t;
  }
  Xn.prototype.ValueTypeName = "";
  Xn.prototype.TimeBufferType = Float32Array;
  Xn.prototype.ValueBufferType = Float32Array;
  Xn.prototype.DefaultInterpolation = Sc;
  var br = class extends Xn {
    constructor(t, e, i) {
      super(t, e, i);
    }
  };
  br.prototype.ValueTypeName = "bool";
  br.prototype.ValueBufferType = Array;
  br.prototype.DefaultInterpolation = wo;
  br.prototype.InterpolantFactoryMethodLinear = void 0;
  br.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Hc = class extends Xn {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
  };
  Hc.prototype.ValueTypeName = "color";
  var Gc = class extends Xn {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
  };
  Gc.prototype.ValueTypeName = "number";
  var Vc = class extends _r {
      constructor(t, e, i, r) {
        super(t, e, i, r);
      }
      interpolate_(t, e, i, r) {
        let s = this.resultBuffer,
          o = this.sampleValues,
          a = this.valueSize,
          c = (i - e) / (r - e),
          l = t * a;
        for (let h = l + a; l !== h; l += 4) qe.slerpFlat(s, 0, o, l - a, o, l, c);
        return s;
      }
    },
    Ko = class extends Xn {
      constructor(t, e, i, r) {
        super(t, e, i, r);
      }
      InterpolantFactoryMethodLinear(t) {
        return new Vc(this.times, this.values, this.getValueSize(), t);
      }
    };
  Ko.prototype.ValueTypeName = "quaternion";
  Ko.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Mr = class extends Xn {
    constructor(t, e, i) {
      super(t, e, i);
    }
  };
  Mr.prototype.ValueTypeName = "string";
  Mr.prototype.ValueBufferType = Array;
  Mr.prototype.DefaultInterpolation = wo;
  Mr.prototype.InterpolantFactoryMethodLinear = void 0;
  Mr.prototype.InterpolantFactoryMethodSmooth = void 0;
  var Wc = class extends Xn {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
  };
  Wc.prototype.ValueTypeName = "vector";
  var Xc = class {
      constructor(t, e, i) {
        let r = this,
          s = !1,
          o = 0,
          a = 0,
          c,
          l = [];
        ((this.onStart = void 0),
          (this.onLoad = t),
          (this.onProgress = e),
          (this.onError = i),
          (this._abortController = null),
          (this.itemStart = function (h) {
            (a++, s === !1 && r.onStart !== void 0 && r.onStart(h, o, a), (s = !0));
          }),
          (this.itemEnd = function (h) {
            (o++,
              r.onProgress !== void 0 && r.onProgress(h, o, a),
              o === a && ((s = !1), r.onLoad !== void 0 && r.onLoad()));
          }),
          (this.itemError = function (h) {
            r.onError !== void 0 && r.onError(h);
          }),
          (this.resolveURL = function (h) {
            return ((h = h.normalize("NFC")), c ? c(h) : h);
          }),
          (this.setURLModifier = function (h) {
            return ((c = h), this);
          }),
          (this.addHandler = function (h, u) {
            return (l.push(h, u), this);
          }),
          (this.removeHandler = function (h) {
            let u = l.indexOf(h);
            return (u !== -1 && l.splice(u, 2), this);
          }),
          (this.getHandler = function (h) {
            for (let u = 0, d = l.length; u < d; u += 2) {
              let f = l[u],
                p = l[u + 1];
              if ((f.global && (f.lastIndex = 0), f.test(h))) return p;
            }
            return null;
          }),
          (this.abort = function () {
            return (this.abortController.abort(), (this._abortController = null), this);
          }));
      }
      get abortController() {
        return (this._abortController || (this._abortController = new AbortController()), this._abortController);
      }
    },
    Ap = new Xc(),
    qc = class {
      constructor(t) {
        ((this.manager = t !== void 0 ? t : Ap),
          (this.crossOrigin = "anonymous"),
          (this.withCredentials = !1),
          (this.path = ""),
          (this.resourcePath = ""),
          (this.requestHeader = {}),
          (this.priority = "auto"),
          (this.cache = "default"),
          typeof __THREE_DEVTOOLS__ < "u" &&
            __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
      }
      load() {}
      loadAsync(t, e) {
        let i = this;
        return new Promise(function (r, s) {
          i.load(t, r, e, s);
        });
      }
      parse() {}
      setCrossOrigin(t) {
        return ((this.crossOrigin = t), this);
      }
      setWithCredentials(t) {
        return ((this.withCredentials = t), this);
      }
      setPath(t) {
        return ((this.path = t), this);
      }
      setResourcePath(t) {
        return ((this.resourcePath = t), this);
      }
      setRequestHeader(t) {
        return ((this.requestHeader = t), this);
      }
      setPriority(t) {
        return ((this.priority = t), this);
      }
      setCache(t) {
        return ((this.cache = t), this);
      }
      abort() {
        return this;
      }
    };
  qc.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  var zs = class extends yn {
      static registerNode(t) {
        this.prototype._lightNode = t;
      }
      constructor(t, e = 1) {
        (super(), (this.isLight = !0), (this.type = "Light"), (this.color = new Tt(t)), (this.intensity = e));
      }
      copy(t, e) {
        return (super.copy(t, e), this.color.copy(t.color), (this.intensity = t.intensity), this);
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return ((e.object.color = this.color.getHex()), (e.object.intensity = this.intensity), e);
      }
    },
    Jo = class extends zs {
      constructor(t, e, i) {
        (super(t, i),
          (this.isHemisphereLight = !0),
          (this.type = "HemisphereLight"),
          this.position.copy(yn.DEFAULT_UP),
          this.updateMatrix(),
          (this.groundColor = new Tt(e)));
      }
      copy(t, e) {
        return (super.copy(t, e), this.groundColor.copy(t.groundColor), this);
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return ((e.object.groundColor = this.groundColor.getHex()), e);
      }
    },
    Wh = new le(),
    If = new R(),
    Pf = new R(),
    Zo = class {
      constructor(t) {
        ((this.camera = t),
          (this.intensity = 1),
          (this.bias = 0),
          (this.biasNode = null),
          (this.normalBias = 0),
          (this.radius = 1),
          (this.blurSamples = 8),
          (this.mapSize = new st(512, 512)),
          (this.mapType = Ln),
          (this.map = null),
          (this.mapPass = null),
          (this.matrix = new le()),
          (this.autoUpdate = !0),
          (this.needsUpdate = !1),
          (this._frustum = new vr()),
          (this._frameExtents = new st(1, 1)),
          (this._viewportCount = 1),
          (this._viewports = [new Ee(0, 0, 1, 1)]));
      }
      getViewportCount() {
        return this._viewportCount;
      }
      getCamera() {
        return this.camera;
      }
      getFrustum() {
        return this._frustum;
      }
      updateMatrices(t) {
        let e = this.camera;
        (If.setFromMatrixPosition(t.matrixWorld),
          e.position.copy(If),
          Pf.setFromMatrixPosition(t.target.matrixWorld),
          e.lookAt(Pf),
          e.updateMatrixWorld(),
          this._updateMatrix(e, this.matrix, this._frustum));
      }
      _updateMatrix(t, e, i, r) {
        (Wh.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
          i.setFromProjectionMatrix(Wh, t.coordinateSystem, t.reversedDepth));
        let s = this._frameExtents,
          o = r ? r.z / s.x : 1,
          a = r ? r.w / s.y : 1,
          c = r ? r.x / s.x : 0,
          l = r ? r.y / s.y : 0;
        (t.coordinateSystem === Cs || t.reversedDepth
          ? e.set(0.5 * o, 0, 0, 0.5 * o + c, 0, 0.5 * a, 0, 0.5 * a + l, 0, 0, 1, 0, 0, 0, 0, 1)
          : e.set(0.5 * o, 0, 0, 0.5 * o + c, 0, 0.5 * a, 0, 0.5 * a + l, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
          e.multiply(Wh));
      }
      getViewport(t) {
        return this._viewports[t];
      }
      getFrameExtents() {
        return this._frameExtents;
      }
      dispose() {
        (this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose());
      }
      copy(t) {
        return (
          (this.camera = t.camera.clone()),
          (this.intensity = t.intensity),
          (this.bias = t.bias),
          (this.radius = t.radius),
          (this.autoUpdate = t.autoUpdate),
          (this.needsUpdate = t.needsUpdate),
          (this.normalBias = t.normalBias),
          (this.blurSamples = t.blurSamples),
          this.mapSize.copy(t.mapSize),
          (this.mapType = t.mapType),
          (this.biasNode = t.biasNode),
          this
        );
      }
      clone() {
        return new this.constructor().copy(this);
      }
      toJSON() {
        let t = {};
        return (
          (t.intensity = this.intensity),
          (t.bias = this.bias),
          (t.normalBias = this.normalBias),
          (t.radius = this.radius),
          (t.blurSamples = this.blurSamples),
          (t.mapSize = this.mapSize.toArray()),
          (t.mapType = this.mapType),
          (t.camera = this.camera.toJSON(!1).object),
          delete t.camera.matrix,
          t
        );
      }
    },
    uc = new R(),
    dc = new qe(),
    wi = new R(),
    Qo = class extends yn {
      constructor() {
        (super(),
          (this.isCamera = !0),
          (this.type = "Camera"),
          (this.matrixWorldInverse = new le()),
          (this.projectionMatrix = new le()),
          (this.projectionMatrixInverse = new le()),
          (this.coordinateSystem = Kn),
          (this._reversedDepth = !1));
      }
      get reversedDepth() {
        return this._reversedDepth;
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          this.matrixWorldInverse.copy(t.matrixWorldInverse),
          this.projectionMatrix.copy(t.projectionMatrix),
          this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
          (this.coordinateSystem = t.coordinateSystem),
          this
        );
      }
      getWorldDirection(t) {
        return super.getWorldDirection(t).negate();
      }
      updateMatrixWorld(t) {
        (super.updateMatrixWorld(t),
          this.matrixWorld.decompose(uc, dc, wi),
          wi.x === 1 && wi.y === 1 && wi.z === 1
            ? this.matrixWorldInverse.copy(this.matrixWorld).invert()
            : this.matrixWorldInverse.compose(uc, dc, wi.set(1, 1, 1)).invert());
      }
      updateWorldMatrix(t, e, i = !1) {
        (super.updateWorldMatrix(t, e, i),
          this.matrixWorld.decompose(uc, dc, wi),
          wi.x === 1 && wi.y === 1 && wi.z === 1
            ? this.matrixWorldInverse.copy(this.matrixWorld).invert()
            : this.matrixWorldInverse.compose(uc, dc, wi.set(1, 1, 1)).invert());
      }
      clone() {
        return new this.constructor().copy(this);
      }
    },
    mr = new R(),
    Lf = new st(),
    Df = new st(),
    Cn = class extends Qo {
      constructor(t = 50, e = 1, i = 0.1, r = 2e3) {
        (super(),
          (this.isPerspectiveCamera = !0),
          (this.type = "PerspectiveCamera"),
          (this.fov = t),
          (this.zoom = 1),
          (this.near = i),
          (this.far = r),
          (this.focus = 10),
          (this.aspect = e),
          (this.view = null),
          (this.filmGauge = 35),
          (this.filmOffset = 0),
          this.updateProjectionMatrix());
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          (this.fov = t.fov),
          (this.zoom = t.zoom),
          (this.near = t.near),
          (this.far = t.far),
          (this.focus = t.focus),
          (this.aspect = t.aspect),
          (this.view = t.view === null ? null : Object.assign({}, t.view)),
          (this.filmGauge = t.filmGauge),
          (this.filmOffset = t.filmOffset),
          this
        );
      }
      setFocalLength(t) {
        let e = (0.5 * this.getFilmHeight()) / t;
        ((this.fov = Ec * 2 * Math.atan(e)), this.updateProjectionMatrix());
      }
      getFocalLength() {
        let t = Math.tan(yh * 0.5 * this.fov);
        return (0.5 * this.getFilmHeight()) / t;
      }
      getEffectiveFOV() {
        return Ec * 2 * Math.atan(Math.tan(yh * 0.5 * this.fov) / this.zoom);
      }
      getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1);
      }
      getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1);
      }
      getViewBounds(t, e, i) {
        (mr.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
          e.set(mr.x, mr.y).multiplyScalar(-t / mr.z),
          mr.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
          i.set(mr.x, mr.y).multiplyScalar(-t / mr.z));
      }
      getViewSize(t, e) {
        return (this.getViewBounds(t, Lf, Df), e.subVectors(Df, Lf));
      }
      setViewOffset(t, e, i, r, s, o) {
        ((this.aspect = t / e),
          this.view === null &&
            (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
          (this.view.enabled = !0),
          (this.view.fullWidth = t),
          (this.view.fullHeight = e),
          (this.view.offsetX = i),
          (this.view.offsetY = r),
          (this.view.width = s),
          (this.view.height = o),
          this.updateProjectionMatrix());
      }
      clearViewOffset() {
        (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
      }
      updateProjectionMatrix() {
        let t = this.near,
          e = (t * Math.tan(yh * 0.5 * this.fov)) / this.zoom,
          i = 2 * e,
          r = this.aspect * i,
          s = -0.5 * r,
          o = this.view;
        if (this.view !== null && this.view.enabled) {
          let c = o.fullWidth,
            l = o.fullHeight;
          ((s += (o.offsetX * r) / c), (e -= (o.offsetY * i) / l), (r *= o.width / c), (i *= o.height / l));
        }
        let a = this.filmOffset;
        (a !== 0 && (s += (t * a) / this.getFilmWidth()),
          this.projectionMatrix.makePerspective(
            s,
            s + r,
            e,
            e - i,
            t,
            this.far,
            this.coordinateSystem,
            this.reversedDepth,
          ),
          this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return (
          (e.object.fov = this.fov),
          (e.object.zoom = this.zoom),
          (e.object.near = this.near),
          (e.object.far = this.far),
          (e.object.focus = this.focus),
          (e.object.aspect = this.aspect),
          this.view !== null && (e.object.view = Object.assign({}, this.view)),
          (e.object.filmGauge = this.filmGauge),
          (e.object.filmOffset = this.filmOffset),
          e
        );
      }
    };
  var Qh = class extends Zo {
      constructor() {
        (super(new Cn(90, 1, 0.5, 500)), (this.isPointLightShadow = !0));
      }
    },
    ta = class extends zs {
      constructor(t, e, i = 0, r = 2) {
        (super(t, e),
          (this.isPointLight = !0),
          (this.type = "PointLight"),
          (this.distance = i),
          (this.decay = r),
          (this.shadow = new Qh()));
      }
      get power() {
        return this.intensity * 4 * Math.PI;
      }
      set power(t) {
        this.intensity = t / (4 * Math.PI);
      }
      dispose() {
        (super.dispose(), this.shadow.dispose());
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          (this.distance = t.distance),
          (this.decay = t.decay),
          (this.shadow = t.shadow.clone()),
          this
        );
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return (
          (e.object.distance = this.distance),
          (e.object.decay = this.decay),
          (e.object.shadow = this.shadow.toJSON()),
          e
        );
      }
    },
    Xr = class extends Qo {
      constructor(t = -1, e = 1, i = 1, r = -1, s = 0.1, o = 2e3) {
        (super(),
          (this.isOrthographicCamera = !0),
          (this.type = "OrthographicCamera"),
          (this.zoom = 1),
          (this.view = null),
          (this.left = t),
          (this.right = e),
          (this.top = i),
          (this.bottom = r),
          (this.near = s),
          (this.far = o),
          this.updateProjectionMatrix());
      }
      copy(t, e) {
        return (
          super.copy(t, e),
          (this.left = t.left),
          (this.right = t.right),
          (this.top = t.top),
          (this.bottom = t.bottom),
          (this.near = t.near),
          (this.far = t.far),
          (this.zoom = t.zoom),
          (this.view = t.view === null ? null : Object.assign({}, t.view)),
          this
        );
      }
      setViewOffset(t, e, i, r, s, o) {
        (this.view === null &&
          (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
          (this.view.enabled = !0),
          (this.view.fullWidth = t),
          (this.view.fullHeight = e),
          (this.view.offsetX = i),
          (this.view.offsetY = r),
          (this.view.width = s),
          (this.view.height = o),
          this.updateProjectionMatrix());
      }
      clearViewOffset() {
        (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
      }
      updateProjectionMatrix() {
        let t = (this.right - this.left) / (2 * this.zoom),
          e = (this.top - this.bottom) / (2 * this.zoom),
          i = (this.right + this.left) / 2,
          r = (this.top + this.bottom) / 2,
          s = i - t,
          o = i + t,
          a = r + e,
          c = r - e;
        if (this.view !== null && this.view.enabled) {
          let l = (this.right - this.left) / this.view.fullWidth / this.zoom,
            h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
          ((s += l * this.view.offsetX),
            (o = s + l * this.view.width),
            (a -= h * this.view.offsetY),
            (c = a - h * this.view.height));
        }
        (this.projectionMatrix.makeOrthographic(
          s,
          o,
          a,
          c,
          this.near,
          this.far,
          this.coordinateSystem,
          this.reversedDepth,
        ),
          this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return (
          (e.object.zoom = this.zoom),
          (e.object.left = this.left),
          (e.object.right = this.right),
          (e.object.top = this.top),
          (e.object.bottom = this.bottom),
          (e.object.near = this.near),
          (e.object.far = this.far),
          this.view !== null && (e.object.view = Object.assign({}, this.view)),
          e
        );
      }
    },
    tu = class extends Zo {
      constructor() {
        (super(new Xr(-5, 5, 5, -5, 0.5, 500)), (this.isDirectionalLightShadow = !0));
      }
    },
    ea = class extends zs {
      constructor(t, e) {
        (super(t, e),
          (this.isDirectionalLight = !0),
          (this.type = "DirectionalLight"),
          this.position.copy(yn.DEFAULT_UP),
          this.updateMatrix(),
          (this.target = new yn()),
          (this.shadow = new tu()));
      }
      dispose() {
        (super.dispose(), this.shadow.dispose());
      }
      copy(t) {
        return (super.copy(t), (this.target = t.target.clone()), (this.shadow = t.shadow.clone()), this);
      }
      toJSON(t) {
        let e = super.toJSON(t);
        return ((e.object.shadow = this.shadow.toJSON()), (e.object.target = this.target.uuid), e);
      }
    };
  var ws = -90,
    Ts = 1,
    Hs = class extends yn {
      constructor(t, e, i) {
        (super(),
          (this.type = "CubeCamera"),
          (this.renderTarget = i),
          (this.coordinateSystem = null),
          (this.activeMipmapLevel = 0));
        let r = new Cn(ws, Ts, t, e);
        ((r.layers = this.layers), this.add(r));
        let s = new Cn(ws, Ts, t, e);
        ((s.layers = this.layers), this.add(s));
        let o = new Cn(ws, Ts, t, e);
        ((o.layers = this.layers), this.add(o));
        let a = new Cn(ws, Ts, t, e);
        ((a.layers = this.layers), this.add(a));
        let c = new Cn(ws, Ts, t, e);
        ((c.layers = this.layers), this.add(c));
        let l = new Cn(ws, Ts, t, e);
        ((l.layers = this.layers), this.add(l));
      }
      updateCoordinateSystem() {
        let t = this.coordinateSystem,
          e = this.children.concat(),
          [i, r, s, o, a, c] = e;
        for (let l of e) this.remove(l);
        if (t === Kn)
          (i.up.set(0, 1, 0),
            i.lookAt(1, 0, 0),
            r.up.set(0, 1, 0),
            r.lookAt(-1, 0, 0),
            s.up.set(0, 0, -1),
            s.lookAt(0, 1, 0),
            o.up.set(0, 0, 1),
            o.lookAt(0, -1, 0),
            a.up.set(0, 1, 0),
            a.lookAt(0, 0, 1),
            c.up.set(0, 1, 0),
            c.lookAt(0, 0, -1));
        else if (t === Cs)
          (i.up.set(0, -1, 0),
            i.lookAt(-1, 0, 0),
            r.up.set(0, -1, 0),
            r.lookAt(1, 0, 0),
            s.up.set(0, 0, 1),
            s.lookAt(0, 1, 0),
            o.up.set(0, 0, -1),
            o.lookAt(0, -1, 0),
            a.up.set(0, -1, 0),
            a.lookAt(0, 0, 1),
            c.up.set(0, -1, 0),
            c.lookAt(0, 0, -1));
        else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
        for (let l of e) (this.add(l), l.updateMatrixWorld());
      }
      update(t, e) {
        this.parent === null && this.updateMatrixWorld();
        let { renderTarget: i, activeMipmapLevel: r } = this;
        this.coordinateSystem !== t.coordinateSystem &&
          ((this.coordinateSystem = t.coordinateSystem), this.updateCoordinateSystem());
        let [s, o, a, c, l, h] = this.children,
          u = t.getRenderTarget(),
          d = t.getActiveCubeFace(),
          f = t.getActiveMipmapLevel(),
          p = t.xr.enabled;
        t.xr.enabled = !1;
        let x = i.texture.mipmapsAutoUpdate;
        i.texture.mipmapsAutoUpdate = !1;
        let g = !1;
        (t.isWebGLRenderer === !0 ? (g = t.state.buffers.depth.getReversed()) : (g = t.reversedDepthBuffer),
          t.setRenderTarget(i, 0, r),
          g && t.autoClear === !1 && t.clearDepth(),
          t.render(e, s),
          t.setRenderTarget(i, 1, r),
          g && t.autoClear === !1 && t.clearDepth(),
          t.render(e, o),
          t.setRenderTarget(i, 2, r),
          g && t.autoClear === !1 && t.clearDepth(),
          t.render(e, a),
          t.setRenderTarget(i, 3, r),
          g && t.autoClear === !1 && t.clearDepth(),
          t.render(e, c),
          t.setRenderTarget(i, 4, r),
          g && t.autoClear === !1 && t.clearDepth(),
          t.render(e, l),
          (i.texture.mipmapsAutoUpdate = x),
          t.setRenderTarget(i, 5, r),
          g && t.autoClear === !1 && t.clearDepth(),
          t.render(e, h),
          t.setRenderTarget(u, d, f),
          (t.xr.enabled = p),
          (i.texture.needsPMREMUpdate = !0));
      }
    },
    $c = class extends Cn {
      constructor(t = []) {
        (super(),
          (this.isArrayCamera = !0),
          (this.isMultiViewCamera = !1),
          (this.cameras = t),
          (this.perCameraFrustumCulled = !1));
      }
    };
  var Iu = "\\[\\]\\.:\\/",
    $g = new RegExp("[" + Iu + "]", "g"),
    Pu = "[^" + Iu + "]",
    Yg = "[^" + Iu.replace("\\.", "") + "]",
    jg = /((?:WC+[\/:])*)/.source.replace("WC", Pu),
    Kg = /(WCOD+)?/.source.replace("WCOD", Yg),
    Jg = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Pu),
    Zg = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Pu),
    Qg = new RegExp("^" + jg + Kg + Jg + Zg + "$"),
    t1 = ["material", "materials", "bones", "map"],
    eu = class {
      constructor(t, e, i) {
        let r = i || Xe.parseTrackName(e);
        ((this._targetGroup = t), (this._bindings = t.subscribe_(e, r)));
      }
      getValue(t, e) {
        this.bind();
        let i = this._targetGroup.nCachedObjects_,
          r = this._bindings[i];
        r !== void 0 && r.getValue(t, e);
      }
      setValue(t, e) {
        let i = this._bindings;
        for (let r = this._targetGroup.nCachedObjects_, s = i.length; r !== s; ++r) i[r].setValue(t, e);
      }
      bind() {
        let t = this._bindings;
        for (let e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].bind();
      }
      unbind() {
        let t = this._bindings;
        for (let e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].unbind();
      }
    },
    Xe = class n {
      constructor(t, e, i) {
        ((this.path = e),
          (this.parsedPath = i || n.parseTrackName(e)),
          (this.node = n.findNode(t, this.parsedPath.nodeName)),
          (this.rootNode = t),
          (this.getValue = this._getValue_unbound),
          (this.setValue = this._setValue_unbound));
      }
      static create(t, e, i) {
        return t && t.isAnimationObjectGroup ? new n.Composite(t, e, i) : new n(t, e, i);
      }
      static sanitizeNodeName(t) {
        return t.replace(/\s/g, "_").replace($g, "");
      }
      static parseTrackName(t) {
        let e = Qg.exec(t);
        if (e === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + t);
        let i = { nodeName: e[2], objectName: e[3], objectIndex: e[4], propertyName: e[5], propertyIndex: e[6] },
          r = i.nodeName && i.nodeName.lastIndexOf(".");
        if (r !== void 0 && r !== -1) {
          let s = i.nodeName.substring(r + 1);
          t1.indexOf(s) !== -1 && ((i.nodeName = i.nodeName.substring(0, r)), (i.objectName = s));
        }
        if (i.propertyName === null || i.propertyName.length === 0)
          throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + t);
        return i;
      }
      static findNode(t, e) {
        if (e === void 0 || e === "" || e === "." || e === -1 || e === t.name || e === t.uuid) return t;
        if (t.skeleton) {
          let i = t.skeleton.getBoneByName(e);
          if (i !== void 0) return i;
        }
        if (t.children) {
          let i = function (s) {
              for (let o = 0; o < s.length; o++) {
                let a = s[o];
                if (a.name === e || a.uuid === e) return a;
                let c = i(a.children);
                if (c) return c;
              }
              return null;
            },
            r = i(t.children);
          if (r) return r;
        }
        return null;
      }
      _getValue_unavailable() {}
      _setValue_unavailable() {}
      _getValue_direct(t, e) {
        t[e] = this.targetObject[this.propertyName];
      }
      _getValue_array(t, e) {
        let i = this.resolvedProperty;
        for (let r = 0, s = i.length; r !== s; ++r) t[e++] = i[r];
      }
      _getValue_arrayElement(t, e) {
        t[e] = this.resolvedProperty[this.propertyIndex];
      }
      _getValue_toArray(t, e) {
        this.resolvedProperty.toArray(t, e);
      }
      _setValue_direct(t, e) {
        this.targetObject[this.propertyName] = t[e];
      }
      _setValue_direct_setNeedsUpdate(t, e) {
        ((this.targetObject[this.propertyName] = t[e]), (this.targetObject.needsUpdate = !0));
      }
      _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
        ((this.targetObject[this.propertyName] = t[e]), (this.targetObject.matrixWorldNeedsUpdate = !0));
      }
      _setValue_array(t, e) {
        let i = this.resolvedProperty;
        for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[e++];
      }
      _setValue_array_setNeedsUpdate(t, e) {
        let i = this.resolvedProperty;
        for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[e++];
        this.targetObject.needsUpdate = !0;
      }
      _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
        let i = this.resolvedProperty;
        for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[e++];
        this.targetObject.matrixWorldNeedsUpdate = !0;
      }
      _setValue_arrayElement(t, e) {
        this.resolvedProperty[this.propertyIndex] = t[e];
      }
      _setValue_arrayElement_setNeedsUpdate(t, e) {
        ((this.resolvedProperty[this.propertyIndex] = t[e]), (this.targetObject.needsUpdate = !0));
      }
      _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
        ((this.resolvedProperty[this.propertyIndex] = t[e]), (this.targetObject.matrixWorldNeedsUpdate = !0));
      }
      _setValue_fromArray(t, e) {
        this.resolvedProperty.fromArray(t, e);
      }
      _setValue_fromArray_setNeedsUpdate(t, e) {
        (this.resolvedProperty.fromArray(t, e), (this.targetObject.needsUpdate = !0));
      }
      _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
        (this.resolvedProperty.fromArray(t, e), (this.targetObject.matrixWorldNeedsUpdate = !0));
      }
      _getValue_unbound(t, e) {
        (this.bind(), this.getValue(t, e));
      }
      _setValue_unbound(t, e) {
        (this.bind(), this.setValue(t, e));
      }
      bind() {
        let t = this.node,
          e = this.parsedPath,
          i = e.objectName,
          r = e.propertyName,
          s = e.propertyIndex;
        if (
          (t || ((t = n.findNode(this.rootNode, e.nodeName)), (this.node = t)),
          (this.getValue = this._getValue_unavailable),
          (this.setValue = this._setValue_unavailable),
          !t)
        ) {
          Vt("PropertyBinding: No target node found for track: " + this.path + ".");
          return;
        }
        if (i) {
          let l = e.objectIndex;
          switch (i) {
            case "materials":
              if (!t.material) {
                qt("PropertyBinding: Can not bind to material as node does not have a material.", this);
                return;
              }
              if (!t.material.materials) {
                qt(
                  "PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
                  this,
                );
                return;
              }
              t = t.material.materials;
              break;
            case "bones":
              if (!t.skeleton) {
                qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                return;
              }
              t = t.skeleton.bones;
              for (let h = 0; h < t.length; h++)
                if (t[h].name === l) {
                  l = h;
                  break;
                }
              break;
            case "map":
              if ("map" in t) {
                t = t.map;
                break;
              }
              if (!t.material) {
                qt("PropertyBinding: Can not bind to material as node does not have a material.", this);
                return;
              }
              if (!t.material.map) {
                qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
                return;
              }
              t = t.material.map;
              break;
            default:
              if (t[i] === void 0) {
                qt("PropertyBinding: Can not bind to objectName of node undefined.", this);
                return;
              }
              t = t[i];
          }
          if (l !== void 0) {
            if (t[l] === void 0) {
              qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
              return;
            }
            t = t[l];
          }
        }
        let o = t[r];
        if (o === void 0) {
          let l = e.nodeName;
          qt("PropertyBinding: Trying to update property for track: " + l + "." + r + " but it wasn't found.", t);
          return;
        }
        let a = this.Versioning.None;
        ((this.targetObject = t),
          t.isMaterial === !0
            ? (a = this.Versioning.NeedsUpdate)
            : t.isObject3D === !0 && (a = this.Versioning.MatrixWorldNeedsUpdate));
        let c = this.BindingType.Direct;
        if (s !== void 0) {
          if (r === "morphTargetInfluences") {
            if (!t.geometry) {
              qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
              return;
            }
            if (!t.geometry.morphAttributes) {
              qt(
                "PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
                this,
              );
              return;
            }
            t.morphTargetDictionary[s] !== void 0 && (s = t.morphTargetDictionary[s]);
          }
          ((c = this.BindingType.ArrayElement), (this.resolvedProperty = o), (this.propertyIndex = s));
        } else
          o.fromArray !== void 0 && o.toArray !== void 0
            ? ((c = this.BindingType.HasFromToArray), (this.resolvedProperty = o))
            : Array.isArray(o)
              ? ((c = this.BindingType.EntireArray), (this.resolvedProperty = o))
              : (this.propertyName = r);
        ((this.getValue = this.GetterByBindingType[c]), (this.setValue = this.SetterByBindingTypeAndVersioning[c][a]));
      }
      unbind() {
        ((this.node = null), (this.getValue = this._getValue_unbound), (this.setValue = this._setValue_unbound));
      }
    };
  Xe.Composite = eu;
  Xe.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 };
  Xe.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 };
  Xe.prototype.GetterByBindingType = [
    Xe.prototype._getValue_direct,
    Xe.prototype._getValue_array,
    Xe.prototype._getValue_arrayElement,
    Xe.prototype._getValue_toArray,
  ];
  Xe.prototype.SetterByBindingTypeAndVersioning = [
    [
      Xe.prototype._setValue_direct,
      Xe.prototype._setValue_direct_setNeedsUpdate,
      Xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate,
    ],
    [
      Xe.prototype._setValue_array,
      Xe.prototype._setValue_array_setNeedsUpdate,
      Xe.prototype._setValue_array_setMatrixWorldNeedsUpdate,
    ],
    [
      Xe.prototype._setValue_arrayElement,
      Xe.prototype._setValue_arrayElement_setNeedsUpdate,
      Xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate,
    ],
    [
      Xe.prototype._setValue_fromArray,
      Xe.prototype._setValue_fromArray_setNeedsUpdate,
      Xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate,
    ],
  ];
  var x3 = new Float32Array(1);
  var Ou = class Ou {
    constructor(t, e, i, r) {
      ((this.elements = [1, 0, 0, 1]), t !== void 0 && this.set(t, e, i, r));
    }
    identity() {
      return (this.set(1, 0, 0, 1), this);
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 4; i++) this.elements[i] = t[i + e];
      return this;
    }
    set(t, e, i, r) {
      let s = this.elements;
      return ((s[0] = t), (s[2] = e), (s[1] = i), (s[3] = r), this);
    }
  };
  Ou.prototype.isMatrix2 = !0;
  var nu = Ou;
  function Lu(n, t, e, i) {
    let r = e1(i);
    switch (e) {
      case bu:
        return n * t;
      case el:
        return ((n * t) / r.components) * r.byteLength;
      case nl:
        return ((n * t) / r.components) * r.byteLength;
      case Sr:
        return ((n * t * 2) / r.components) * r.byteLength;
      case il:
        return ((n * t * 2) / r.components) * r.byteLength;
      case Mu:
        return ((n * t * 3) / r.components) * r.byteLength;
      case xi:
        return ((n * t * 4) / r.components) * r.byteLength;
      case rl:
        return ((n * t * 4) / r.components) * r.byteLength;
      case ra:
      case sa:
        return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 8;
      case oa:
      case aa:
        return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16;
      case ol:
      case cl:
        return (Math.max(n, 16) * Math.max(t, 8)) / 4;
      case sl:
      case al:
        return (Math.max(n, 8) * Math.max(t, 8)) / 2;
      case ll:
      case hl:
      case dl:
      case fl:
        return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 8;
      case ul:
      case ca:
      case pl:
        return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16;
      case ml:
        return Math.floor((n + 3) / 4) * Math.floor((t + 3) / 4) * 16;
      case gl:
        return Math.floor((n + 4) / 5) * Math.floor((t + 3) / 4) * 16;
      case vl:
        return Math.floor((n + 4) / 5) * Math.floor((t + 4) / 5) * 16;
      case xl:
        return Math.floor((n + 5) / 6) * Math.floor((t + 4) / 5) * 16;
      case yl:
        return Math.floor((n + 5) / 6) * Math.floor((t + 5) / 6) * 16;
      case _l:
        return Math.floor((n + 7) / 8) * Math.floor((t + 4) / 5) * 16;
      case bl:
        return Math.floor((n + 7) / 8) * Math.floor((t + 5) / 6) * 16;
      case Ml:
        return Math.floor((n + 7) / 8) * Math.floor((t + 7) / 8) * 16;
      case Sl:
        return Math.floor((n + 9) / 10) * Math.floor((t + 4) / 5) * 16;
      case El:
        return Math.floor((n + 9) / 10) * Math.floor((t + 5) / 6) * 16;
      case wl:
        return Math.floor((n + 9) / 10) * Math.floor((t + 7) / 8) * 16;
      case Tl:
        return Math.floor((n + 9) / 10) * Math.floor((t + 9) / 10) * 16;
      case Al:
        return Math.floor((n + 11) / 12) * Math.floor((t + 9) / 10) * 16;
      case Rl:
        return Math.floor((n + 11) / 12) * Math.floor((t + 11) / 12) * 16;
      case Cl:
      case Il:
      case Pl:
        return Math.ceil(n / 4) * Math.ceil(t / 4) * 16;
      case Ll:
      case Dl:
        return Math.ceil(n / 4) * Math.ceil(t / 4) * 8;
      case la:
      case Nl:
        return Math.ceil(n / 4) * Math.ceil(t / 4) * 16;
    }
    throw new Error(`Unable to determine texture byte length for ${e} format.`);
  }
  function e1(n) {
    switch (n) {
      case Ln:
      case vu:
        return { byteLength: 1, components: 1 };
      case Xs:
      case xu:
      case qn:
        return { byteLength: 2, components: 1 };
      case Qc:
      case tl:
        return { byteLength: 2, components: 4 };
      case vi:
      case Zc:
      case ti:
        return { byteLength: 4, components: 1 };
      case yu:
      case _u:
        return { byteLength: 4, components: 3 };
    }
    throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`);
  }
  typeof __THREE_DEVTOOLS__ < "u" &&
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "187" } }));
  typeof window < "u" &&
    (window.__THREE__ ? Vt("WARNING: Multiple instances of Three.js being imported.") : (window.__THREE__ = "187"));
  function jp() {
    let n = null,
      t = !1,
      e = null,
      i = null;
    function r(s, o) {
      ((i = n.requestAnimationFrame(r)), e(s, o));
    }
    return {
      start: function () {
        t !== !0 && e !== null && n !== null && ((i = n.requestAnimationFrame(r)), (t = !0));
      },
      stop: function () {
        (n !== null && n.cancelAnimationFrame(i), (t = !1));
      },
      setAnimationLoop: function (s) {
        e = s;
      },
      setContext: function (s) {
        n = s;
      },
    };
  }
  function a1(n) {
    let t = new WeakMap();
    function e(a, c) {
      let l = a.array,
        h = a.usage,
        u = l.byteLength,
        d = n.createBuffer();
      (n.bindBuffer(c, d), n.bufferData(c, l, h), a.onUploadCallback());
      let f;
      if (l instanceof Float32Array) f = n.FLOAT;
      else if (typeof Float16Array < "u" && l instanceof Float16Array) f = n.HALF_FLOAT;
      else if (l instanceof Uint16Array) a.isFloat16BufferAttribute ? (f = n.HALF_FLOAT) : (f = n.UNSIGNED_SHORT);
      else if (l instanceof Int16Array) f = n.SHORT;
      else if (l instanceof Uint32Array) f = n.UNSIGNED_INT;
      else if (l instanceof Int32Array) f = n.INT;
      else if (l instanceof Int8Array) f = n.BYTE;
      else if (l instanceof Uint8Array) f = n.UNSIGNED_BYTE;
      else if (l instanceof Uint8ClampedArray) f = n.UNSIGNED_BYTE;
      else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
      return { buffer: d, type: f, bytesPerElement: l.BYTES_PER_ELEMENT, version: a.version, size: u };
    }
    function i(a, c, l) {
      let h = c.array,
        u = c.updateRanges;
      if ((n.bindBuffer(l, a), u.length === 0)) n.bufferSubData(l, 0, h);
      else {
        u.sort((f, p) => f.start - p.start);
        let d = 0;
        for (let f = 1; f < u.length; f++) {
          let p = u[d],
            x = u[f];
          x.start <= p.start + p.count + 1
            ? (p.count = Math.max(p.count, x.start + x.count - p.start))
            : (++d, (u[d] = x));
        }
        u.length = d + 1;
        for (let f = 0, p = u.length; f < p; f++) {
          let x = u[f];
          n.bufferSubData(l, x.start * h.BYTES_PER_ELEMENT, h, x.start, x.count);
        }
        c.clearUpdateRanges();
      }
      c.onUploadCallback();
    }
    function r(a) {
      return (a.isInterleavedBufferAttribute && (a = a.data), t.get(a));
    }
    function s(a) {
      a.isInterleavedBufferAttribute && (a = a.data);
      let c = t.get(a);
      c && (n.deleteBuffer(c.buffer), t.delete(a));
    }
    function o(a, c) {
      if ((a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute)) {
        let h = t.get(a);
        (!h || h.version < a.version) &&
          t.set(a, { buffer: a.buffer, type: a.type, bytesPerElement: a.elementSize, version: a.version });
        return;
      }
      let l = t.get(a);
      if (l === void 0) t.set(a, e(a, c));
      else if (l.version < a.version) {
        if (l.size !== a.array.byteLength)
          throw new Error(
            "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.",
          );
        (i(l.buffer, a, c), (l.version = a.version));
      }
    }
    return { get: r, remove: s, update: o };
  }
  var c1 = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
    l1 = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
    h1 = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
    u1 = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
    d1 = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
    f1 = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
    p1 = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
    m1 = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
    g1 = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
    v1 = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
    x1 = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
    y1 = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
    _1 = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
    b1 = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
    M1 = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
    S1 = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
    E1 = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
    w1 = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
    T1 = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
    A1 = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
    R1 = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
    C1 = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
    I1 = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
    P1 = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
    L1 = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,
    D1 = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
    N1 = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
    F1 = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
    U1 = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
    O1 = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
    B1 = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
    k1 = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
    z1 = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,
    H1 = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
    G1 = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
    V1 = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
    W1 = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
    X1 = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
    q1 = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
    $1 = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
    Y1 = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
    j1 = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
    K1 = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
    J1 = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
    Z1 = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,
    Q1 = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,
    tv = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
    ev = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
    nv = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
    iv = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
    rv = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
    sv = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
    ov = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
    av = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
    cv = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
    lv = `#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,
    hv = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
    uv = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
    dv = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
    fv = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
    pv = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
    mv = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
    gv = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
    vv = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
    xv = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
    yv = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
    _v = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
    bv = `#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
    Mv = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
    Sv = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
    Ev = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
    wv = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
    Tv = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
    Av = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
    Rv = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
    Cv = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,
    Iv = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
    Pv = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
    Lv = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
    Dv = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
    Nv = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
    Fv = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
    Uv = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
    Ov = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
    Bv = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
    kv = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
    zv = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
    Hv = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
    Gv = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
    Vv = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
    Wv = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
    Xv = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
    qv = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
    $v = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
    Yv = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
    jv = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
    Kv = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
    Jv = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
    Zv = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
    Qv = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
    tx = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
    ex = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
    nx = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
    ix = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
    rx = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
    sx = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
    ox = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
    ax = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
    cx = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    lx = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
    hx = `uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    ux = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
    dx = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    fx = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
    px = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
    mx = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
    gx = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
    vx = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
    xx = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    yx = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
    _x = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    bx = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
    Mx = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    Sx = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    Ex = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    wx = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
    Tx = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    Ax = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
    Rx = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
    Cx = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    Ix = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    Px = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
    Lx = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    Dx = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    Nx = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    Fx = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
    Ux = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    Ox = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    Bx = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    kx = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
    zx = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
    se = {
      alphahash_fragment: c1,
      alphahash_pars_fragment: l1,
      alphamap_fragment: h1,
      alphamap_pars_fragment: u1,
      alphatest_fragment: d1,
      alphatest_pars_fragment: f1,
      aomap_fragment: p1,
      aomap_pars_fragment: m1,
      batching_pars_vertex: g1,
      batching_vertex: v1,
      begin_vertex: x1,
      beginnormal_vertex: y1,
      bsdfs: _1,
      iridescence_fragment: b1,
      bumpmap_pars_fragment: M1,
      clipping_planes_fragment: S1,
      clipping_planes_pars_fragment: E1,
      clipping_planes_pars_vertex: w1,
      clipping_planes_vertex: T1,
      color_fragment: A1,
      color_pars_fragment: R1,
      color_pars_vertex: C1,
      color_vertex: I1,
      common: P1,
      defaultnormal_vertex: L1,
      displacementmap_pars_vertex: D1,
      displacementmap_vertex: N1,
      emissivemap_fragment: F1,
      emissivemap_pars_fragment: U1,
      colorspace_fragment: O1,
      colorspace_pars_fragment: B1,
      envmap_fragment: k1,
      envmap_common_pars_fragment: z1,
      envmap_pars_fragment: H1,
      envmap_pars_vertex: G1,
      envmap_physical_pars_fragment: Q1,
      envmap_vertex: V1,
      fog_vertex: W1,
      fog_pars_vertex: X1,
      fog_fragment: q1,
      fog_pars_fragment: $1,
      gradientmap_pars_fragment: Y1,
      lightmap_pars_fragment: j1,
      lights_lambert_fragment: K1,
      lights_lambert_pars_fragment: J1,
      lights_pars_begin: Z1,
      lights_toon_fragment: tv,
      lights_toon_pars_fragment: ev,
      lights_phong_fragment: nv,
      lights_phong_pars_fragment: iv,
      lights_physical_fragment: rv,
      lights_physical_pars_fragment: sv,
      lights_fragment_begin: ov,
      lights_fragment_maps: av,
      lights_fragment_end: cv,
      lightprobes_pars_fragment: lv,
      logdepthbuf_fragment: hv,
      logdepthbuf_pars_fragment: uv,
      logdepthbuf_pars_vertex: dv,
      logdepthbuf_vertex: fv,
      map_fragment: pv,
      map_pars_fragment: mv,
      map_particle_fragment: gv,
      map_particle_pars_fragment: vv,
      metalnessmap_fragment: xv,
      metalnessmap_pars_fragment: yv,
      morphinstance_vertex: _v,
      morphcolor_vertex: bv,
      morphnormal_vertex: Mv,
      morphtarget_pars_vertex: Sv,
      morphtarget_vertex: Ev,
      normal_fragment_begin: wv,
      normal_fragment_maps: Tv,
      normal_pars_fragment: Av,
      normal_pars_vertex: Rv,
      normal_vertex: Cv,
      normalmap_pars_fragment: Iv,
      clearcoat_normal_fragment_begin: Pv,
      clearcoat_normal_fragment_maps: Lv,
      clearcoat_pars_fragment: Dv,
      iridescence_pars_fragment: Nv,
      opaque_fragment: Fv,
      packing: Uv,
      premultiplied_alpha_fragment: Ov,
      project_vertex: Bv,
      dithering_fragment: kv,
      dithering_pars_fragment: zv,
      roughnessmap_fragment: Hv,
      roughnessmap_pars_fragment: Gv,
      shadowmap_pars_fragment: Vv,
      shadowmap_pars_vertex: Wv,
      shadowmap_vertex: Xv,
      shadowmask_pars_fragment: qv,
      skinbase_vertex: $v,
      skinning_pars_vertex: Yv,
      skinning_vertex: jv,
      skinnormal_vertex: Kv,
      specularmap_fragment: Jv,
      specularmap_pars_fragment: Zv,
      tonemapping_fragment: Qv,
      tonemapping_pars_fragment: tx,
      transmission_fragment: ex,
      transmission_pars_fragment: nx,
      uv_pars_fragment: ix,
      uv_pars_vertex: rx,
      uv_vertex: sx,
      worldpos_vertex: ox,
      background_vert: ax,
      background_frag: cx,
      backgroundCube_vert: lx,
      backgroundCube_frag: hx,
      cube_vert: ux,
      cube_frag: dx,
      depth_vert: fx,
      depth_frag: px,
      distance_vert: mx,
      distance_frag: gx,
      equirect_vert: vx,
      equirect_frag: xx,
      linedashed_vert: yx,
      linedashed_frag: _x,
      meshbasic_vert: bx,
      meshbasic_frag: Mx,
      meshlambert_vert: Sx,
      meshlambert_frag: Ex,
      meshmatcap_vert: wx,
      meshmatcap_frag: Tx,
      meshnormal_vert: Ax,
      meshnormal_frag: Rx,
      meshphong_vert: Cx,
      meshphong_frag: Ix,
      meshphysical_vert: Px,
      meshphysical_frag: Lx,
      meshtoon_vert: Dx,
      meshtoon_frag: Nx,
      points_vert: Fx,
      points_frag: Ux,
      shadow_vert: Ox,
      shadow_frag: Bx,
      sprite_vert: kx,
      sprite_frag: zx,
    },
    Et = {
      common: {
        diffuse: { value: new Tt(16777215) },
        opacity: { value: 1 },
        map: { value: null },
        mapTransform: { value: new Kt() },
        alphaMap: { value: null },
        alphaMapTransform: { value: new Kt() },
        alphaTest: { value: 0 },
      },
      specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Kt() } },
      envmap: {
        envMap: { value: null },
        envMapRotation: { value: new Kt() },
        reflectivity: { value: 1 },
        ior: { value: 1.5 },
        refractionRatio: { value: 0.98 },
        dfgLUT: { value: null },
      },
      aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Kt() } },
      lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Kt() } },
      bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Kt() }, bumpScale: { value: 1 } },
      normalmap: {
        normalMap: { value: null },
        normalMapTransform: { value: new Kt() },
        normalScale: { value: new st(1, 1) },
      },
      displacementmap: {
        displacementMap: { value: null },
        displacementMapTransform: { value: new Kt() },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
      },
      emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Kt() } },
      metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Kt() } },
      roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Kt() } },
      gradientmap: { gradientMap: { value: null } },
      fog: {
        fogDensity: { value: 25e-5 },
        fogNear: { value: 1 },
        fogFar: { value: 2e3 },
        fogColor: { value: new Tt(16777215) },
      },
      lights: {
        ambientLightColor: { value: [] },
        lightProbe: { value: [] },
        sunLights: { value: [], properties: { direction: {}, color: {} } },
        sunLightShadows: {
          value: [],
          properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
        },
        sunShadowMatrix: { value: [] },
        sunShadowCascade: { value: [] },
        directionalLights: { value: [], properties: { direction: {}, color: {} } },
        directionalLightShadows: {
          value: [],
          properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
        },
        directionalShadowMatrix: { value: [] },
        spotLights: {
          value: [],
          properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} },
        },
        spotLightShadows: {
          value: [],
          properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
        },
        spotLightMap: { value: [] },
        spotLightMatrix: { value: [] },
        pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
        pointLightShadows: {
          value: [],
          properties: {
            shadowIntensity: 1,
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
            shadowCameraNear: {},
            shadowCameraFar: {},
          },
        },
        pointShadowMatrix: { value: [] },
        hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
        rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
        ltc_1: { value: null },
        ltc_2: { value: null },
        probesSH: { value: [] },
        probesMin: { value: [] },
        probesMax: { value: [] },
        probesResolution: { value: [] },
      },
      points: {
        diffuse: { value: new Tt(16777215) },
        opacity: { value: 1 },
        size: { value: 1 },
        scale: { value: 1 },
        map: { value: null },
        alphaMap: { value: null },
        alphaMapTransform: { value: new Kt() },
        alphaTest: { value: 0 },
        uvTransform: { value: new Kt() },
      },
      sprite: {
        diffuse: { value: new Tt(16777215) },
        opacity: { value: 1 },
        center: { value: new st(0.5, 0.5) },
        rotation: { value: 0 },
        map: { value: null },
        mapTransform: { value: new Kt() },
        alphaMap: { value: null },
        alphaMapTransform: { value: new Kt() },
        alphaTest: { value: 0 },
      },
    },
    Li = {
      basic: {
        uniforms: Dn([Et.common, Et.specularmap, Et.envmap, Et.aomap, Et.lightmap, Et.fog]),
        vertexShader: se.meshbasic_vert,
        fragmentShader: se.meshbasic_frag,
      },
      lambert: {
        uniforms: Dn([
          Et.common,
          Et.specularmap,
          Et.envmap,
          Et.aomap,
          Et.lightmap,
          Et.emissivemap,
          Et.bumpmap,
          Et.normalmap,
          Et.displacementmap,
          Et.fog,
          Et.lights,
          { emissive: { value: new Tt(0) }, envMapIntensity: { value: 1 } },
        ]),
        vertexShader: se.meshlambert_vert,
        fragmentShader: se.meshlambert_frag,
      },
      phong: {
        uniforms: Dn([
          Et.common,
          Et.specularmap,
          Et.envmap,
          Et.aomap,
          Et.lightmap,
          Et.emissivemap,
          Et.bumpmap,
          Et.normalmap,
          Et.displacementmap,
          Et.fog,
          Et.lights,
          {
            emissive: { value: new Tt(0) },
            specular: { value: new Tt(1118481) },
            shininess: { value: 30 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: se.meshphong_vert,
        fragmentShader: se.meshphong_frag,
      },
      standard: {
        uniforms: Dn([
          Et.common,
          Et.envmap,
          Et.aomap,
          Et.lightmap,
          Et.emissivemap,
          Et.bumpmap,
          Et.normalmap,
          Et.displacementmap,
          Et.roughnessmap,
          Et.metalnessmap,
          Et.fog,
          Et.lights,
          {
            emissive: { value: new Tt(0) },
            roughness: { value: 1 },
            metalness: { value: 0 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: se.meshphysical_vert,
        fragmentShader: se.meshphysical_frag,
      },
      toon: {
        uniforms: Dn([
          Et.common,
          Et.aomap,
          Et.lightmap,
          Et.emissivemap,
          Et.bumpmap,
          Et.normalmap,
          Et.displacementmap,
          Et.gradientmap,
          Et.fog,
          Et.lights,
          { emissive: { value: new Tt(0) } },
        ]),
        vertexShader: se.meshtoon_vert,
        fragmentShader: se.meshtoon_frag,
      },
      matcap: {
        uniforms: Dn([Et.common, Et.bumpmap, Et.normalmap, Et.displacementmap, Et.fog, { matcap: { value: null } }]),
        vertexShader: se.meshmatcap_vert,
        fragmentShader: se.meshmatcap_frag,
      },
      points: { uniforms: Dn([Et.points, Et.fog]), vertexShader: se.points_vert, fragmentShader: se.points_frag },
      dashed: {
        uniforms: Dn([Et.common, Et.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]),
        vertexShader: se.linedashed_vert,
        fragmentShader: se.linedashed_frag,
      },
      depth: {
        uniforms: Dn([Et.common, Et.displacementmap]),
        vertexShader: se.depth_vert,
        fragmentShader: se.depth_frag,
      },
      normal: {
        uniforms: Dn([Et.common, Et.bumpmap, Et.normalmap, Et.displacementmap, { opacity: { value: 1 } }]),
        vertexShader: se.meshnormal_vert,
        fragmentShader: se.meshnormal_frag,
      },
      sprite: { uniforms: Dn([Et.sprite, Et.fog]), vertexShader: se.sprite_vert, fragmentShader: se.sprite_frag },
      background: {
        uniforms: { uvTransform: { value: new Kt() }, t2D: { value: null }, backgroundIntensity: { value: 1 } },
        vertexShader: se.background_vert,
        fragmentShader: se.background_frag,
      },
      backgroundCube: {
        uniforms: {
          envMap: { value: null },
          backgroundBlurriness: { value: 0 },
          backgroundIntensity: { value: 1 },
          backgroundRotation: { value: new Kt() },
        },
        vertexShader: se.backgroundCube_vert,
        fragmentShader: se.backgroundCube_frag,
      },
      cube: {
        uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } },
        vertexShader: se.cube_vert,
        fragmentShader: se.cube_frag,
      },
      equirect: {
        uniforms: { tEquirect: { value: null } },
        vertexShader: se.equirect_vert,
        fragmentShader: se.equirect_frag,
      },
      distance: {
        uniforms: Dn([
          Et.common,
          Et.displacementmap,
          { referencePosition: { value: new R() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } },
        ]),
        vertexShader: se.distance_vert,
        fragmentShader: se.distance_frag,
      },
      shadow: {
        uniforms: Dn([Et.lights, Et.fog, { color: { value: new Tt(0) }, opacity: { value: 1 } }]),
        vertexShader: se.shadow_vert,
        fragmentShader: se.shadow_frag,
      },
    };
  Li.physical = {
    uniforms: Dn([
      Li.standard.uniforms,
      {
        clearcoat: { value: 0 },
        clearcoatMap: { value: null },
        clearcoatMapTransform: { value: new Kt() },
        clearcoatNormalMap: { value: null },
        clearcoatNormalMapTransform: { value: new Kt() },
        clearcoatNormalScale: { value: new st(1, 1) },
        clearcoatRoughness: { value: 0 },
        clearcoatRoughnessMap: { value: null },
        clearcoatRoughnessMapTransform: { value: new Kt() },
        diffuseRoughness: { value: 0 },
        diffuseRoughnessMap: { value: null },
        diffuseRoughnessMapTransform: { value: new Kt() },
        dispersion: { value: 0 },
        retroreflectivity: { value: 0 },
        iridescence: { value: 0 },
        iridescenceMap: { value: null },
        iridescenceMapTransform: { value: new Kt() },
        iridescenceIOR: { value: 1.3 },
        iridescenceThicknessMinimum: { value: 100 },
        iridescenceThicknessMaximum: { value: 400 },
        iridescenceThicknessMap: { value: null },
        iridescenceThicknessMapTransform: { value: new Kt() },
        sheen: { value: 0 },
        sheenColor: { value: new Tt(0) },
        sheenColorMap: { value: null },
        sheenColorMapTransform: { value: new Kt() },
        sheenRoughness: { value: 1 },
        sheenRoughnessMap: { value: null },
        sheenRoughnessMapTransform: { value: new Kt() },
        transmission: { value: 0 },
        transmissionMap: { value: null },
        transmissionMapTransform: { value: new Kt() },
        transmissionSamplerSize: { value: new st() },
        transmissionSamplerMap: { value: null },
        thickness: { value: 0 },
        thicknessMap: { value: null },
        thicknessMapTransform: { value: new Kt() },
        attenuationDistance: { value: 0 },
        attenuationColor: { value: new Tt(0) },
        specularColor: { value: new Tt(1, 1, 1) },
        specularColorMap: { value: null },
        specularColorMapTransform: { value: new Kt() },
        specularIntensity: { value: 1 },
        specularIntensityMap: { value: null },
        specularIntensityMapTransform: { value: new Kt() },
        anisotropyVector: { value: new st() },
        anisotropyMap: { value: null },
        anisotropyMapTransform: { value: new Kt() },
      },
    ]),
    vertexShader: se.meshphysical_vert,
    fragmentShader: se.meshphysical_frag,
  };
  var Ol = { r: 0, b: 0, g: 0 },
    Hx = new le(),
    Kp = new Kt();
  Kp.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
  function Gx(n, t, e, i, r, s) {
    let o = new Tt(0),
      a = r === !0 ? 0 : 1,
      c,
      l,
      h = null,
      u = 0,
      d = null;
    function f(y) {
      let E = y.isScene === !0 ? y.background : null;
      if (E && E.isTexture) {
        let _ = y.backgroundBlurriness > 0;
        E = t.get(E, _);
      }
      return E;
    }
    function p(y) {
      let E = !1,
        _ = f(y);
      _ === null ? g(o, a) : _ && _.isColor && (g(_, 1), (E = !0));
      let T = n.xr.getEnvironmentBlendMode();
      (T === "additive"
        ? e.buffers.color.setClear(0, 0, 0, 1, s)
        : T === "alpha-blend" && e.buffers.color.setClear(0, 0, 0, 0, s),
        (n.autoClear || E) &&
          (e.buffers.depth.setTest(!0),
          e.buffers.depth.setMask(!0),
          e.buffers.color.setMask(!0),
          n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil)));
    }
    function x(y, E) {
      let _ = f(E);
      _ && _.isCubeTexture
        ? (l === void 0 &&
            ((l = new tt(
              new re(1, 1, 1),
              new Me({
                name: "BackgroundCubeMaterial",
                uniforms: Kr(Li.backgroundCube.uniforms),
                vertexShader: Li.backgroundCube.vertexShader,
                fragmentShader: Li.backgroundCube.fragmentShader,
                side: Sn,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
                allowOverride: !1,
              }),
            )),
            l.geometry.deleteAttribute("normal"),
            l.geometry.deleteAttribute("uv"),
            (l.onBeforeRender = function (T, w, v) {
              this.matrixWorld.copyPosition(v.matrixWorld);
            }),
            Object.defineProperty(l.material, "envMap", {
              get: function () {
                return this.uniforms.envMap.value;
              },
            }),
            i.update(l)),
          (l.material.uniforms.envMap.value = _),
          (l.material.uniforms.backgroundBlurriness.value = E.backgroundBlurriness),
          (l.material.uniforms.backgroundIntensity.value = E.backgroundIntensity),
          l.material.uniforms.backgroundRotation.value
            .setFromMatrix4(Hx.makeRotationFromEuler(E.backgroundRotation))
            .transpose(),
          _.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(Kp),
          (l.material.toneMapped = me.getTransfer(_.colorSpace) !== Te),
          (h !== _ || u !== _.version || d !== n.toneMapping) &&
            ((l.material.needsUpdate = !0), (h = _), (u = _.version), (d = n.toneMapping)),
          l.layers.enableAll(),
          y.unshift(l, l.geometry, l.material, 0, 0, null))
        : _ &&
          _.isTexture &&
          (c === void 0 &&
            ((c = new tt(
              new sn(2, 2),
              new Me({
                name: "BackgroundMaterial",
                uniforms: Kr(Li.background.uniforms),
                vertexShader: Li.background.vertexShader,
                fragmentShader: Li.background.fragmentShader,
                side: Ii,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
                allowOverride: !1,
              }),
            )),
            c.geometry.deleteAttribute("normal"),
            Object.defineProperty(c.material, "map", {
              get: function () {
                return this.uniforms.t2D.value;
              },
            }),
            i.update(c)),
          (c.material.uniforms.t2D.value = _),
          (c.material.uniforms.backgroundIntensity.value = E.backgroundIntensity),
          (c.material.toneMapped = me.getTransfer(_.colorSpace) !== Te),
          _.matrixAutoUpdate === !0 && _.updateMatrix(),
          c.material.uniforms.uvTransform.value.copy(_.matrix),
          (h !== _ || u !== _.version || d !== n.toneMapping) &&
            ((c.material.needsUpdate = !0), (h = _), (u = _.version), (d = n.toneMapping)),
          c.layers.enableAll(),
          y.unshift(c, c.geometry, c.material, 0, 0, null));
    }
    function g(y, E) {
      (y.getRGB(Ol, Cu(n)), e.buffers.color.setClear(Ol.r, Ol.g, Ol.b, E, s));
    }
    function m() {
      (l !== void 0 && (l.geometry.dispose(), l.material.dispose(), (l = void 0)),
        c !== void 0 && (c.geometry.dispose(), c.material.dispose(), (c = void 0)));
    }
    return {
      getClearColor: function () {
        return o;
      },
      setClearColor: function (y, E = 1) {
        (o.set(y), (a = E), g(o, a));
      },
      getClearAlpha: function () {
        return a;
      },
      setClearAlpha: function (y) {
        ((a = y), g(o, a));
      },
      render: p,
      addToRenderList: x,
      dispose: m,
    };
  }
  function Vx(n, t) {
    let e = n.getParameter(n.MAX_VERTEX_ATTRIBS),
      i = {},
      r = d(null),
      s = r,
      o = !1;
    function a(N, B, X, P, H) {
      let Y = !1,
        G = u(N, P, X, B);
      (s !== G && ((s = G), l(s.object)),
        (Y = f(N, P, X, H)),
        Y && p(N, P, X, H),
        H !== null && t.update(H, n.ELEMENT_ARRAY_BUFFER),
        (Y || o) && ((o = !1), _(N, B, X, P), H !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, t.get(H).buffer)));
    }
    function c() {
      return n.createVertexArray();
    }
    function l(N) {
      return n.bindVertexArray(N);
    }
    function h(N) {
      return n.deleteVertexArray(N);
    }
    function u(N, B, X, P) {
      let H = P.wireframe === !0,
        Y = i[B.id];
      Y === void 0 && ((Y = {}), (i[B.id] = Y));
      let G = N.isInstancedMesh === !0 ? N.id : 0,
        ot = Y[G];
      ot === void 0 && ((ot = {}), (Y[G] = ot));
      let $ = ot[X.id];
      $ === void 0 && (($ = {}), (ot[X.id] = $));
      let nt = $[H];
      return (nt === void 0 && ((nt = d(c())), ($[H] = nt)), nt);
    }
    function d(N) {
      let B = [],
        X = [],
        P = [];
      for (let H = 0; H < e; H++) ((B[H] = 0), (X[H] = 0), (P[H] = 0));
      return {
        geometry: null,
        program: null,
        wireframe: !1,
        newAttributes: B,
        enabledAttributes: X,
        attributeDivisors: P,
        object: N,
        attributes: {},
        index: null,
      };
    }
    function f(N, B, X, P) {
      let H = s.attributes,
        Y = B.attributes,
        G = 0,
        ot = X.getAttributes();
      for (let $ in ot)
        if (ot[$].location >= 0) {
          let rt = H[$],
            Rt = Y[$];
          if (
            (Rt === void 0 &&
              ($ === "instanceMatrix" && N.instanceMatrix && (Rt = N.instanceMatrix),
              $ === "instanceColor" && N.instanceColor && (Rt = N.instanceColor)),
            rt === void 0 || rt.attribute !== Rt || (Rt && rt.data !== Rt.data))
          )
            return !0;
          G++;
        }
      return s.attributesNum !== G || s.index !== P;
    }
    function p(N, B, X, P) {
      let H = {},
        Y = B.attributes,
        G = 0,
        ot = X.getAttributes();
      for (let $ in ot)
        if (ot[$].location >= 0) {
          let rt = Y[$];
          rt === void 0 &&
            ($ === "instanceMatrix" && N.instanceMatrix && (rt = N.instanceMatrix),
            $ === "instanceColor" && N.instanceColor && (rt = N.instanceColor));
          let Rt = {};
          ((Rt.attribute = rt), rt && rt.data && (Rt.data = rt.data), (H[$] = Rt), G++);
        }
      ((s.attributes = H), (s.attributesNum = G), (s.index = P));
    }
    function x() {
      let N = s.newAttributes;
      for (let B = 0, X = N.length; B < X; B++) N[B] = 0;
    }
    function g(N) {
      m(N, 0);
    }
    function m(N, B) {
      let X = s.newAttributes,
        P = s.enabledAttributes,
        H = s.attributeDivisors;
      ((X[N] = 1),
        P[N] === 0 && (n.enableVertexAttribArray(N), (P[N] = 1)),
        H[N] !== B && (n.vertexAttribDivisor(N, B), (H[N] = B)));
    }
    function y() {
      let N = s.newAttributes,
        B = s.enabledAttributes;
      for (let X = 0, P = B.length; X < P; X++) B[X] !== N[X] && (n.disableVertexAttribArray(X), (B[X] = 0));
    }
    function E(N, B, X, P, H, Y, G) {
      G === !0 ? n.vertexAttribIPointer(N, B, X, H, Y) : n.vertexAttribPointer(N, B, X, P, H, Y);
    }
    function _(N, B, X, P) {
      x();
      let H = P.attributes,
        Y = X.getAttributes(),
        G = B.defaultAttributeValues;
      for (let ot in Y) {
        let $ = Y[ot];
        if ($.location >= 0) {
          let nt = H[ot];
          if (
            (nt === void 0 &&
              (ot === "instanceMatrix" && N.instanceMatrix && (nt = N.instanceMatrix),
              ot === "instanceColor" && N.instanceColor && (nt = N.instanceColor)),
            nt !== void 0)
          ) {
            let rt = nt.normalized,
              Rt = nt.itemSize,
              Ht = t.get(nt);
            if (Ht === void 0) continue;
            let K = Ht.buffer,
              bt = Ht.type,
              Ct = Ht.bytesPerElement,
              Bt = bt === n.INT || bt === n.UNSIGNED_INT || nt.gpuType === Zc;
            if (nt.isInterleavedBufferAttribute) {
              let Mt = nt.data,
                kt = Mt.isInterleavedBuffer === !0 ? Mt.stride : Mt.itemSize,
                We = nt.offset;
              if (Mt.isInstancedInterleavedBuffer || Mt.isInstancedBufferAttribute) {
                for (let Gt = 0; Gt < $.locationSize; Gt++) m($.location + Gt, Mt.meshPerAttribute);
                N.isInstancedMesh !== !0 &&
                  P._maxInstanceCount === void 0 &&
                  (P._maxInstanceCount = Mt.meshPerAttribute * Mt.count);
              } else for (let Gt = 0; Gt < $.locationSize; Gt++) g($.location + Gt);
              n.bindBuffer(n.ARRAY_BUFFER, K);
              for (let Gt = 0; Gt < $.locationSize; Gt++)
                E($.location + Gt, Rt / $.locationSize, bt, rt, kt * Ct, (We + (Rt / $.locationSize) * Gt) * Ct, Bt);
            } else {
              if (nt.isInstancedBufferAttribute) {
                for (let Mt = 0; Mt < $.locationSize; Mt++) m($.location + Mt, nt.meshPerAttribute);
                N.isInstancedMesh !== !0 &&
                  P._maxInstanceCount === void 0 &&
                  (P._maxInstanceCount = nt.meshPerAttribute * nt.count);
              } else for (let Mt = 0; Mt < $.locationSize; Mt++) g($.location + Mt);
              n.bindBuffer(n.ARRAY_BUFFER, K);
              for (let Mt = 0; Mt < $.locationSize; Mt++)
                E($.location + Mt, Rt / $.locationSize, bt, rt, Rt * Ct, (Rt / $.locationSize) * Mt * Ct, Bt);
            }
          } else if (G !== void 0) {
            let rt = G[ot];
            if (rt !== void 0)
              switch (rt.length) {
                case 2:
                  n.vertexAttrib2fv($.location, rt);
                  break;
                case 3:
                  n.vertexAttrib3fv($.location, rt);
                  break;
                case 4:
                  n.vertexAttrib4fv($.location, rt);
                  break;
                default:
                  n.vertexAttrib1fv($.location, rt);
              }
          }
        }
      }
      y();
    }
    function T() {
      F();
      for (let N in i) {
        let B = i[N];
        for (let X in B) {
          let P = B[X];
          for (let H in P) {
            let Y = P[H];
            for (let G in Y) (h(Y[G].object), delete Y[G]);
            delete P[H];
          }
        }
        delete i[N];
      }
    }
    function w(N) {
      if (i[N.id] === void 0) return;
      let B = i[N.id];
      for (let X in B) {
        let P = B[X];
        for (let H in P) {
          let Y = P[H];
          for (let G in Y) (h(Y[G].object), delete Y[G]);
          delete P[H];
        }
      }
      delete i[N.id];
    }
    function v(N) {
      for (let B in i) {
        let X = i[B];
        for (let P in X) {
          let H = X[P];
          if (H[N.id] === void 0) continue;
          let Y = H[N.id];
          for (let G in Y) (h(Y[G].object), delete Y[G]);
          delete H[N.id];
        }
      }
    }
    function S(N) {
      for (let B in i) {
        let X = i[B],
          P = N.isInstancedMesh === !0 ? N.id : 0,
          H = X[P];
        if (H !== void 0) {
          for (let Y in H) {
            let G = H[Y];
            for (let ot in G) (h(G[ot].object), delete G[ot]);
            delete H[Y];
          }
          (delete X[P], Object.keys(X).length === 0 && delete i[B]);
        }
      }
    }
    function F() {
      (I(), (o = !0), s !== r && ((s = r), l(s.object)));
    }
    function I() {
      ((r.geometry = null), (r.program = null), (r.wireframe = !1));
    }
    return {
      setup: a,
      reset: F,
      resetDefaultState: I,
      dispose: T,
      releaseStatesOfGeometry: w,
      releaseStatesOfObject: S,
      releaseStatesOfProgram: v,
      initAttributes: x,
      enableAttribute: g,
      disableUnusedAttributes: y,
    };
  }
  function Wx(n, t, e) {
    let i;
    function r(c) {
      i = c;
    }
    function s(c, l) {
      (n.drawArrays(i, c, l), e.update(l, i, 1));
    }
    function o(c, l, h) {
      h !== 0 && (n.drawArraysInstanced(i, c, l, h), e.update(l, i, h));
    }
    function a(c, l, h) {
      if (h === 0) return;
      t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, c, 0, l, 0, h);
      let d = 0;
      for (let f = 0; f < h; f++) d += l[f];
      e.update(d, i, 1);
    }
    ((this.setMode = r), (this.render = s), (this.renderInstances = o), (this.renderMultiDraw = a));
  }
  function Xx(n, t, e, i) {
    let r;
    function s() {
      if (r !== void 0) return r;
      if (t.has("EXT_texture_filter_anisotropic") === !0) {
        let v = t.get("EXT_texture_filter_anisotropic");
        r = n.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else r = 0;
      return r;
    }
    function o(v) {
      return !(v !== xi && i.convert(v) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT));
    }
    function a(v) {
      let S = v === qn && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
      return !(v !== Ln && v !== ti && !S && i.convert(v) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE));
    }
    function c(v) {
      if (v === "highp") {
        if (
          n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 &&
          n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0
        )
          return "highp";
        v = "mediump";
      }
      return v === "mediump" &&
        n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 &&
        n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0
        ? "mediump"
        : "lowp";
    }
    let l = e.precision !== void 0 ? e.precision : "highp",
      h = c(l);
    h !== l && (Vt("WebGLRenderer:", l, "not supported, using", h, "instead."), (l = h));
    let u = e.reversedDepthBuffer === !0 && t.has("EXT_clip_control"),
      d = e.logarithmicDepthBuffer === !0 && u === !1;
    (e.reversedDepthBuffer === !0 &&
      u === !1 &&
      Vt(
        "WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.",
      ),
      e.logarithmicDepthBuffer === !0 &&
        u === !0 &&
        Vt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled."));
    let f = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),
      p = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      x = n.getParameter(n.MAX_TEXTURE_SIZE),
      g = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),
      m = n.getParameter(n.MAX_VERTEX_ATTRIBS),
      y = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),
      E = n.getParameter(n.MAX_VARYING_VECTORS),
      _ = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),
      T = n.getParameter(n.MAX_SAMPLES),
      w = n.getParameter(n.SAMPLES);
    return {
      isWebGL2: !0,
      getMaxAnisotropy: s,
      getMaxPrecision: c,
      textureFormatReadable: o,
      textureTypeReadable: a,
      precision: l,
      logarithmicDepthBuffer: d,
      reversedDepthBuffer: u,
      maxTextures: f,
      maxVertexTextures: p,
      maxTextureSize: x,
      maxCubemapSize: g,
      maxAttributes: m,
      maxVertexUniforms: y,
      maxVaryings: E,
      maxFragmentUniforms: _,
      maxSamples: T,
      samples: w,
    };
  }
  function qx(n) {
    let t = this,
      e = null,
      i = 0,
      r = !1,
      s = !1,
      o = new mi(),
      a = new Kt(),
      c = { value: null, needsUpdate: !1 };
    ((this.uniform = c),
      (this.numPlanes = 0),
      (this.numIntersection = 0),
      (this.init = function (u, d) {
        let f = u.length !== 0 || d || i !== 0 || r;
        return ((r = d), (i = u.length), f);
      }),
      (this.beginShadows = function () {
        ((s = !0), h(null));
      }),
      (this.endShadows = function () {
        s = !1;
      }),
      (this.setGlobalState = function (u, d) {
        e = h(u, d, 0);
      }),
      (this.setState = function (u, d, f) {
        let p = u.clippingPlanes,
          x = u.clipIntersection,
          g = u.clipShadows,
          m = n.get(u);
        if (!r || p === null || p.length === 0 || (s && !g)) s ? h(null) : l();
        else {
          let y = s ? 0 : i,
            E = y * 4,
            _ = m.clippingState || null;
          ((c.value = _), (_ = h(p, d, E, f)));
          for (let T = 0; T !== E; ++T) _[T] = e[T];
          ((m.clippingState = _), (this.numIntersection = x ? this.numPlanes : 0), (this.numPlanes += y));
        }
      }));
    function l() {
      (c.value !== e && ((c.value = e), (c.needsUpdate = i > 0)), (t.numPlanes = i), (t.numIntersection = 0));
    }
    function h(u, d, f, p) {
      let x = u !== null ? u.length : 0,
        g = null;
      if (x !== 0) {
        if (((g = c.value), p !== !0 || g === null)) {
          let m = f + x * 4,
            y = d.matrixWorldInverse;
          (a.getNormalMatrix(y), (g === null || g.length < m) && (g = new Float32Array(m)));
          for (let E = 0, _ = f; E !== x; ++E, _ += 4)
            (o.copy(u[E]).applyMatrix4(y, a), o.normal.toArray(g, _), (g[_ + 3] = o.constant));
        }
        ((c.value = g), (c.needsUpdate = !0));
      }
      return ((t.numPlanes = x), (t.numIntersection = 0), g);
    }
  }
  var da = class extends cn {
      constructor(t = 1, e = {}) {
        (super(t, t, e), (this.isWebGLCubeRenderTarget = !0));
        let i = { width: t, height: t, depth: 1 },
          r = [i, i, i, i, i, i];
        ((this.texture = new Oo(r)), this._setTextureOptions(e), (this.texture.isRenderTargetTexture = !0));
      }
      fromEquirectangularTexture(t, e) {
        ((this.texture.type = e.type),
          (this.texture.colorSpace = e.colorSpace),
          (this.texture.generateMipmaps = e.generateMipmaps),
          (this.texture.minFilter = e.minFilter),
          (this.texture.magFilter = e.magFilter));
        let i = {
            uniforms: { tEquirect: { value: null } },
            vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
            fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
          },
          r = new re(5, 5, 5),
          s = new Me({
            name: "CubemapFromEquirect",
            uniforms: Kr(i.uniforms),
            vertexShader: i.vertexShader,
            fragmentShader: i.fragmentShader,
            side: Sn,
            blending: qr,
          });
        s.uniforms.tEquirect.value = e;
        let o = new tt(r, s),
          a = e.minFilter;
        return (
          e.minFilter === Qi && (e.minFilter = Ne),
          new Hs(1, 10, this).update(t, o),
          (e.minFilter = a),
          o.geometry.dispose(),
          o.material.dispose(),
          this
        );
      }
      clear(t, e = !0, i = !0, r = !0) {
        let s = t.getRenderTarget();
        for (let o = 0; o < 6; o++) (t.setRenderTarget(this, o), t.clear(e, i, r));
        t.setRenderTarget(s);
      }
    },
    Rp = 256,
    $x = 3,
    Yx = 20,
    Jp = 256,
    Zp = 16,
    jx = 3,
    Kx = new R(),
    Jx = new Tt(),
    $s = class n {
      constructor(t) {
        ((this._renderer = t),
          (this._cubeSize = 0),
          (this._sourceTarget = null),
          (this._cubeCamera = new Hs(1, 10, null)),
          (this._boxMesh = new tt(new re(5, 5, 5), null)),
          (this._cubemapMaterial = null),
          (this._equirectMaterial = null),
          (this._blurMaterial = null),
          (this._ggxMaterial = null),
          (this._integrationMaterial = null));
      }
      fromScene(t, e = 0, i = 0.1, r = 100, s = {}) {
        let { size: o = 256, position: a = Kx } = s,
          c = this._renderer;
        this._setSize(o);
        let l = this._allocateTarget(),
          h = this._getSourceTarget(!0);
        e > 0 && (h.texture.mipmapsAutoUpdate = !1);
        let u = c.autoClear,
          d = c.autoClearColor,
          f = c.autoClearDepth,
          p = c.autoClearStencil,
          x = t.background;
        ((c.autoClear = !0),
          (c.autoClearColor = !0),
          (c.autoClearDepth = !0),
          (c.autoClearStencil = !0),
          x === null && (t.background = c.getClearColor(Jx)));
        let g = new Hs(i, r, h);
        return (
          g.position.copy(a),
          g.update(c, t),
          (c.autoClear = u),
          (c.autoClearColor = d),
          (c.autoClearDepth = f),
          (c.autoClearStencil = p),
          (t.background = x),
          e > 0 && ((h.texture.mipmapsAutoUpdate = !0), this._blur(l, e)),
          this._applyPMREM(l),
          l
        );
      }
      fromEquirectangular(t, e = null) {
        return this._fromTexture(t, e);
      }
      fromCubemap(t, e = null) {
        return this._fromTexture(t, e);
      }
      compileCubemapShader() {
        this._cubemapMaterial === null &&
          ((this._cubemapMaterial = Pp()), this._compileMaterial(this._cubemapMaterial));
      }
      compileEquirectangularShader() {
        this._equirectMaterial === null &&
          ((this._equirectMaterial = Ip()), this._compileMaterial(this._equirectMaterial));
      }
      dispose() {
        (this._sourceTarget !== null && this._sourceTarget.dispose(),
          this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
          this._equirectMaterial !== null && this._equirectMaterial.dispose(),
          this._blurMaterial !== null && this._blurMaterial.dispose(),
          this._ggxMaterial !== null && this._ggxMaterial.dispose(),
          this._integrationMaterial !== null && this._integrationMaterial.dispose(),
          this._boxMesh.geometry.dispose());
      }
      static lodToRoughness(t, e) {
        return e > 0 ? 1 - Math.sqrt(1 - t / e) : 0;
      }
      _setSize(t) {
        this._cubeSize = Math.max(Rp, gp(t));
      }
      _fromTexture(t, e) {
        t.mapping === Yr || t.mapping === Ws
          ? this._setSize(t.image.length === 0 ? Rp : t.image[0].width || t.image[0].image.width)
          : this._setSize(t.image.width / 4);
        let i = e || this._allocateTarget();
        return (this._textureToCubemap(t), this._applyPMREM(i), i);
      }
      _allocateTarget() {
        let t = this._cubeSize,
          e = Cp(t, !1, !1),
          i = Math.log2(t) - $x;
        for (let r = 0; r <= i; r++) e.texture.mipmaps.push({ width: t >> r, height: t >> r });
        return ((e.texture.name = "PMREM"), (e.texture.isPMREMTexture = !0), e);
      }
      _getSourceTarget(t = !1) {
        let e = this._cubeSize,
          i = this._sourceTarget;
        return (
          (i === null || i.width !== e || (t && i.depthBuffer === !1)) &&
            (i !== null && i.dispose(), (this._sourceTarget = Cp(e, !0, t))),
          this._sourceTarget
        );
      }
      _compileMaterial(t) {
        ((this._boxMesh.material = t), this._renderer.compile(this._boxMesh, this._cubeCamera.children[0]));
      }
      _renderCube(t, e, i) {
        let r = this._boxMesh,
          s = this._cubeCamera;
        ((r.material = i), (s.renderTarget = t), (s.activeMipmapLevel = e));
        let o = t.width >> e;
        (t.viewport.set(0, 0, o, o), s.update(this._renderer, r), t.viewport.set(0, 0, t.width, t.height));
      }
      _textureToCubemap(t) {
        let e;
        (t.mapping === Yr || t.mapping === Ws
          ? (this._cubemapMaterial === null && (this._cubemapMaterial = Pp()),
            (e = this._cubemapMaterial),
            (e.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1))
          : (this._equirectMaterial === null && (this._equirectMaterial = Ip()), (e = this._equirectMaterial)),
          (e.uniforms.envMap.value = t),
          this._renderCube(this._getSourceTarget(), 0, e));
      }
      _applyPMREM(t) {
        this._ggxMaterial === null && ((this._ggxMaterial = Zx()), (this._integrationMaterial = Qx()));
        let e = this._cubeSize,
          i = t.texture.mipmaps.length - 1,
          r = this._ggxMaterial.uniforms;
        r.envMap.value = this._sourceTarget.texture;
        let s = this._integrationMaterial.uniforms;
        ((s.envMap.value = this._sourceTarget.texture), (s.sourceLod.value = Math.log2(e / Zp)));
        for (let o = 0; o <= i; o++) {
          let a = n.lodToRoughness(o, i);
          if (o > i - jx) ((s.roughness.value = a), this._renderCube(t, o, this._integrationMaterial));
          else {
            let c = a > 0 ? Math.log2(e) + 0.5 * Math.log2(6 / (Jp * Math.pow(a, 4))) + 0.5 : 0;
            ((r.roughness.value = a), (r.lodBias.value = c), this._renderCube(t, o, this._ggxMaterial));
          }
        }
      }
      _blur(t, e) {
        this._blurMaterial === null && (this._blurMaterial = t2());
        let i = this._blurMaterial,
          r = i.uniforms,
          s = this._sourceTarget;
        ((r.sigma.value = Math.min(e, Math.PI) / Math.SQRT2),
          (r.envMap.value = s.texture),
          this._renderCube(t, 0, i),
          (r.envMap.value = t.texture),
          this._renderCube(s, 0, i));
      }
    };
  function Cp(n, t, e) {
    return new da(n, { minFilter: Qi, generateMipmaps: t, type: qn, colorSpace: zr, depthBuffer: e });
  }
  function fa(n, t, e) {
    return new Me({
      name: n,
      uniforms: t,
      vertexShader: se.cube_vert,
      fragmentShader: e,
      side: Sn,
      blending: qr,
      depthTest: !1,
      depthWrite: !1,
    });
  }
  function Zx() {
    return fa(
      "PMREMGGXConvolution",
      { envMap: { value: null }, roughness: { value: 0 }, lodBias: { value: 0 } },
      `

		#define GGX_SAMPLES ${Jp}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`,
    );
  }
  function Qx() {
    return fa(
      "PMREMGGXIntegration",
      { envMap: { value: null }, roughness: { value: 0 }, sourceLod: { value: 0 }, sourceSize: { value: Zp } },
      `

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`,
    );
  }
  function t2() {
    return fa(
      "PMREMSphericalGaussianBlur",
      { envMap: { value: null }, sigma: { value: 0 } },
      `

		#define SAMPLES ${Yx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`,
    );
  }
  function Ip() {
    return fa(
      "PMREMEquirectangularToCubemap",
      { envMap: { value: null } },
      `

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`,
    );
  }
  function Pp() {
    return fa(
      "PMREMCubemapToCubemap",
      { envMap: { value: null }, flipEnvMap: { value: -1 } },
      `

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`,
    );
  }
  function e2(n) {
    let t = new WeakMap(),
      e = new WeakMap(),
      i = null;
    function r(d, f = !1) {
      return d == null ? null : f ? o(d) : s(d);
    }
    function s(d) {
      if (d && d.isTexture) {
        let f = d.mapping;
        if (f === jc || f === Kc)
          if (t.has(d)) {
            let p = t.get(d).texture;
            return a(p, d.mapping);
          } else {
            let p = d.image;
            if (p && p.height > 0) {
              let x = new da(p.height);
              return (
                x.fromEquirectangularTexture(n, d),
                t.set(d, x),
                d.addEventListener("dispose", l),
                a(x.texture, d.mapping)
              );
            } else return null;
          }
      }
      return d;
    }
    function o(d) {
      if (d && d.isTexture && d.isPMREMTexture !== !0) {
        let f = d.mapping,
          p = f === jc || f === Kc,
          x = f === Yr || f === Ws;
        if (p || x) {
          let g = e.get(d),
            m = g !== void 0 ? g.texture.pmremVersion : 0;
          if (d.isRenderTargetTexture && d.pmremVersion !== m)
            return (
              i === null && (i = new $s(n)),
              (g = p ? i.fromEquirectangular(d, g) : i.fromCubemap(d, g)),
              (g.texture.pmremVersion = d.pmremVersion),
              e.set(d, g),
              g.texture
            );
          if (g !== void 0) return g.texture;
          {
            let y = d.image;
            return (p && y && y.height > 0) || (x && y && c(y))
              ? (i === null && (i = new $s(n)),
                (g = p ? i.fromEquirectangular(d) : i.fromCubemap(d)),
                (g.texture.pmremVersion = d.pmremVersion),
                e.set(d, g),
                d.addEventListener("dispose", h),
                g.texture)
              : null;
          }
        }
      }
      return d;
    }
    function a(d, f) {
      return (f === jc ? (d.mapping = Yr) : f === Kc && (d.mapping = Ws), d);
    }
    function c(d) {
      let f = 0,
        p = 6;
      for (let x = 0; x < p; x++) d[x] !== void 0 && f++;
      return f === p;
    }
    function l(d) {
      let f = d.target;
      f.removeEventListener("dispose", l);
      let p = t.get(f);
      p !== void 0 && (t.delete(f), p.dispose());
    }
    function h(d) {
      let f = d.target;
      f.removeEventListener("dispose", h);
      let p = e.get(f);
      p !== void 0 && (e.delete(f), p.dispose());
    }
    function u() {
      ((t = new WeakMap()), (e = new WeakMap()), i !== null && (i.dispose(), (i = null)));
    }
    return { get: r, dispose: u };
  }
  function n2(n) {
    let t = {};
    function e(i) {
      if (t[i] !== void 0) return t[i];
      let r = n.getExtension(i);
      return ((t[i] = r), r);
    }
    return {
      has: function (i) {
        return e(i) !== null;
      },
      init: function () {
        (e("EXT_color_buffer_float"),
          e("WEBGL_clip_cull_distance"),
          e("OES_texture_float_linear"),
          e("EXT_color_buffer_half_float"),
          e("WEBGL_multisampled_render_to_texture"),
          e("WEBGL_render_shared_exponent"));
      },
      get: function (i) {
        let r = e(i);
        return (r === null && Mo("WebGLRenderer: " + i + " extension not supported."), r);
      },
    };
  }
  function i2(n, t, e, i) {
    let r = {},
      s = new WeakMap(),
      o = new FinalizationRegistry((p) => delete r[p]);
    function a(p) {
      c(p.target);
    }
    function c(p) {
      p.index !== null && t.remove(p.index);
      for (let g in p.attributes) t.remove(p.attributes[g]);
      (p.removeEventListener("dispose", a), delete r[p.id], o.unregister(p));
      let x = s.get(p);
      (x && (t.remove(x), s.delete(p)),
        i.releaseStatesOfGeometry(p),
        p.isInstancedBufferGeometry === !0 && delete p._maxInstanceCount,
        e.memory.geometries--);
    }
    function l(p, x) {
      return (
        r[x.id] !== void 0 ||
          (x.addEventListener("dispose", a), (r[x.id] = new WeakRef(x)), o.register(x, x.id, x), e.memory.geometries++),
        x
      );
    }
    function h(p) {
      let x = p.attributes;
      for (let g in x) t.update(x[g], n.ARRAY_BUFFER);
    }
    function u(p) {
      let x = p.index,
        g = p.attributes.position,
        m = 0;
      if (g === void 0) return;
      let y = x !== null ? x.array.length : g.array.length / 3 - 1,
        E = g.count >= 65535 ? Lo : Po,
        _ = new E(Math.ceil(y / 3) * 6, 1),
        T = _.array;
      if (x !== null) {
        let v = x.array;
        m = x.version;
        for (let S = 0, F = 0; S < y; S += 3) {
          let I = v[S + 0],
            N = v[S + 1],
            B = v[S + 2];
          ((T[F++] = I), (T[F++] = N), (T[F++] = N), (T[F++] = B), (T[F++] = B), (T[F++] = I));
        }
      } else {
        m = g.version;
        for (let v = 0, S = 0; v < y; v += 3) {
          let F = v + 0,
            I = v + 1,
            N = v + 2;
          ((T[S++] = F), (T[S++] = I), (T[S++] = I), (T[S++] = N), (T[S++] = N), (T[S++] = F));
        }
      }
      _.version = m;
      let w = s.get(p);
      (w && t.remove(w), s.set(p, _));
    }
    function d(p) {
      let x = s.get(p);
      if (x) {
        let g = p.index;
        g !== null && x.version < g.version && u(p);
      } else u(p);
      return s.get(p);
    }
    function f() {
      for (let p in r) {
        let x = r[p].deref();
        x !== void 0 && c(x);
      }
    }
    return { get: l, update: h, getWireframeAttribute: d, dispose: f };
  }
  function r2(n, t, e) {
    let i;
    function r(u) {
      i = u;
    }
    let s, o;
    function a(u) {
      ((s = u.type), (o = u.bytesPerElement));
    }
    function c(u, d) {
      (n.drawElements(i, d, s, u * o), e.update(d, i, 1));
    }
    function l(u, d, f) {
      f !== 0 && (n.drawElementsInstanced(i, d, s, u * o, f), e.update(d, i, f));
    }
    function h(u, d, f) {
      if (f === 0) return;
      t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, d, 0, s, u, 0, f);
      let x = 0;
      for (let g = 0; g < f; g++) x += d[g];
      e.update(x, i, 1);
    }
    ((this.setMode = r),
      (this.setIndex = a),
      (this.render = c),
      (this.renderInstances = l),
      (this.renderMultiDraw = h));
  }
  function s2(n) {
    let t = { geometries: 0, textures: 0 },
      e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    function i(s, o, a) {
      switch ((e.calls++, o)) {
        case n.TRIANGLES:
          e.triangles += a * (s / 3);
          break;
        case n.LINES:
          e.lines += a * (s / 2);
          break;
        case n.LINE_STRIP:
          e.lines += a * (s - 1);
          break;
        case n.LINE_LOOP:
          e.lines += a * s;
          break;
        case n.POINTS:
          e.points += a * s;
          break;
        default:
          qt("WebGLInfo: Unknown draw mode:", o);
          break;
      }
    }
    function r() {
      ((e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0));
    }
    return { memory: t, render: e, programs: null, autoReset: !0, reset: r, update: i };
  }
  function o2(n, t, e) {
    let i = new WeakMap(),
      r = new Ee();
    function s(o, a, c) {
      let l = o.morphTargetInfluences,
        h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color,
        u = h !== void 0 ? h.length : 0,
        d = i.get(a);
      if (d === void 0 || d.count !== u) {
        let F = function () {
          (v.dispose(), i.delete(a), a.removeEventListener("dispose", F));
        };
        d !== void 0 && d.texture.dispose();
        let f = a.morphAttributes.position !== void 0,
          p = a.morphAttributes.normal !== void 0,
          x = a.morphAttributes.color !== void 0,
          g = a.morphAttributes.position || [],
          m = a.morphAttributes.normal || [],
          y = a.morphAttributes.color || [],
          E = 0;
        (f === !0 && (E = 1), p === !0 && (E = 2), x === !0 && (E = 3));
        let _ = a.attributes.position.count * E,
          T = 1;
        _ > t.maxTextureSize && ((T = Math.ceil(_ / t.maxTextureSize)), (_ = t.maxTextureSize));
        let w = new Float32Array(_ * T * 4 * u),
          v = new Co(w, _, T, u);
        ((v.type = ti), (v.needsUpdate = !0));
        let S = E * 4;
        for (let I = 0; I < u; I++) {
          let N = g[I],
            B = m[I],
            X = y[I],
            P = _ * T * 4 * I;
          for (let H = 0; H < N.count; H++) {
            let Y = H * S;
            (f === !0 &&
              (r.fromBufferAttribute(N, H),
              (w[P + Y + 0] = r.x),
              (w[P + Y + 1] = r.y),
              (w[P + Y + 2] = r.z),
              (w[P + Y + 3] = 0)),
              p === !0 &&
                (r.fromBufferAttribute(B, H),
                (w[P + Y + 4] = r.x),
                (w[P + Y + 5] = r.y),
                (w[P + Y + 6] = r.z),
                (w[P + Y + 7] = 0)),
              x === !0 &&
                (r.fromBufferAttribute(X, H),
                (w[P + Y + 8] = r.x),
                (w[P + Y + 9] = r.y),
                (w[P + Y + 10] = r.z),
                (w[P + Y + 11] = X.itemSize === 4 ? r.w : 1)));
          }
        }
        ((d = { count: u, texture: v, size: new st(_, T) }), i.set(a, d), a.addEventListener("dispose", F));
      }
      if (o.isInstancedMesh === !0 && o.morphTexture !== null)
        c.getUniforms().setValue(n, "morphTexture", o.morphTexture, e);
      else {
        let f = 0;
        for (let x = 0; x < l.length; x++) f += l[x];
        let p = a.morphTargetsRelative ? 1 : 1 - f;
        (c.getUniforms().setValue(n, "morphTargetBaseInfluence", p),
          c.getUniforms().setValue(n, "morphTargetInfluences", l));
      }
      (c.getUniforms().setValue(n, "morphTargetsTexture", d.texture, e),
        c.getUniforms().setValue(n, "morphTargetsTextureSize", d.size));
    }
    return { update: s };
  }
  function a2(n, t, e, i, r) {
    let s = new WeakMap();
    function o(l) {
      let h = r.render.frame,
        u = l.geometry,
        d = t.get(l, u);
      if (
        (s.get(d) !== h && (t.update(d), s.set(d, h)),
        l.isInstancedMesh &&
          (l.hasEventListener("dispose", c) === !1 && l.addEventListener("dispose", c),
          s.get(l) !== h &&
            (e.update(l.instanceMatrix, n.ARRAY_BUFFER),
            l.instanceColor !== null && e.update(l.instanceColor, n.ARRAY_BUFFER),
            s.set(l, h))),
        l.isSkinnedMesh)
      ) {
        let f = l.skeleton;
        s.get(f) !== h && (f.update(), s.set(f, h));
      }
      return d;
    }
    function a() {
      s = new WeakMap();
    }
    function c(l) {
      let h = l.target;
      (h.removeEventListener("dispose", c),
        i.releaseStatesOfObject(h),
        e.remove(h.instanceMatrix),
        h.instanceColor !== null && e.remove(h.instanceColor));
    }
    return { update: o, dispose: a };
  }
  var c2 = {
    [lu]: "LINEAR_TONE_MAPPING",
    [hu]: "REINHARD_TONE_MAPPING",
    [uu]: "CINEON_TONE_MAPPING",
    [du]: "ACES_FILMIC_TONE_MAPPING",
    [pu]: "AGX_TONE_MAPPING",
    [mu]: "NEUTRAL_TONE_MAPPING",
    [fu]: "CUSTOM_TONE_MAPPING",
  };
  function l2(n, t, e, i, r, s) {
    let o = new cn(t, e, {
        type: n,
        depthBuffer: r,
        stencilBuffer: s,
        samples: i ? 4 : 0,
        storeMultisampledDepthBuffer: !1,
        storeMultisampledStencilBuffer: !1,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
      }),
      a = null,
      c = null,
      l = null,
      h = new Ae();
    (h.setAttribute("position", new ge([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
      h.setAttribute("uv", new ge([0, 2, 0, 0, 2, 0], 2)));
    let u = new Nc({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
        fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
        depthTest: !1,
        depthWrite: !1,
      }),
      d = new tt(h, u),
      f = new Xr(-1, 1, 1, -1, 0, 1),
      p = null,
      x = null,
      g = !1,
      m,
      y = null,
      E = [],
      _ = !1;
    ((this.setSize = function (T, w) {
      (o.setSize(T, w), a !== null && a.setSize(T, w), c !== null && c.setSize(T, w));
      for (let v = 0; v < E.length; v++) {
        let S = E[v];
        S.setSize && S.setSize(T, w);
      }
    }),
      (this.setEffects = function (T) {
        ((E = T), (_ = E.length > 0 && E[0].isRenderPass === !0));
        let w = o.width,
          v = o.height;
        E.length > 0 &&
          a === null &&
          ((a = new cn(w, v, { type: qn, depthBuffer: !1, stencilBuffer: !1 })),
          (c = new cn(w, v, { type: qn, depthBuffer: !1, stencilBuffer: !1 })));
        let S = r === !0 && E.some((F) => F.needsDepthTexture === !0);
        S !== (o.depthTexture !== null) &&
          (S === !0 && l === null && ((l = new Ki(w, v)), s === !0 && ((l.format = tr), (l.type = jr))),
          o.dispose(),
          (o.depthTexture = S ? l : null),
          (o.resolveDepthBuffer = S),
          (o.storeMultisampledDepthBuffer = S));
        for (let F = 0; F < E.length; F++) {
          let I = E[F];
          (I.setSize && I.setSize(w, v), S && I.needsDepthTexture === !0 && I.setDepthTexture && I.setDepthTexture(l));
        }
      }),
      (this.begin = function (T, w) {
        if (g || (T.toneMapping === Qn && E.length === 0)) return !1;
        if (((y = w), w !== null)) {
          let v = w.width,
            S = w.height;
          (o.width !== v || o.height !== S) && this.setSize(v, S);
        }
        return (_ === !1 && T.setRenderTarget(o), (m = T.toneMapping), (T.toneMapping = Qn), !0);
      }),
      (this.hasRenderPass = function () {
        return _;
      }),
      (this.end = function (T, w) {
        ((T.toneMapping = m), (g = !0));
        let v = o,
          S = a;
        for (let F = 0; F < E.length; F++) {
          let I = E[F];
          I.enabled !== !1 && (I.render(T, S, v, w), I.needsSwap !== !1 && ((v = S), (S = S === a ? c : a)));
        }
        if (p !== T.outputColorSpace || x !== T.toneMapping) {
          ((p = T.outputColorSpace),
            (x = T.toneMapping),
            (u.defines = {}),
            me.getTransfer(p) === Te && (u.defines.SRGB_TRANSFER = ""));
          let F = c2[x];
          (F && (u.defines[F] = ""), (u.needsUpdate = !0));
        }
        ((u.uniforms.tDiffuse.value = v.texture), T.setRenderTarget(y), T.render(d, f), (y = null), (g = !1));
      }),
      (this.isCompositing = function () {
        return g;
      }),
      (this.dispose = function () {
        (o.dispose(), a !== null && a.dispose(), c !== null && c.dispose(), h.dispose(), u.dispose());
      }));
  }
  var Qp = new In(),
    tm = new Ki(1, 1),
    em = new Bo(1),
    nm = new Co(),
    im = new Ac(),
    rm = new Oo(),
    Lp = [],
    Dp = [],
    Np = new Float32Array(16),
    Fp = new Float32Array(9),
    Up = new Float32Array(4);
  function Ys(n, t, e) {
    let i = n[0];
    if (i <= 0 || i > 0) return n;
    let r = t * e,
      s = Lp[r];
    if ((s === void 0 && ((s = new Float32Array(r)), (Lp[r] = s)), t !== 0)) {
      i.toArray(s, 0);
      for (let o = 1, a = 0; o !== t; ++o) ((a += e), n[o].toArray(s, a));
    }
    return s;
  }
  function dn(n, t) {
    if (n.length !== t.length) return !1;
    for (let e = 0, i = n.length; e < i; e++) if (n[e] !== t[e]) return !1;
    return !0;
  }
  function fn(n, t) {
    for (let e = 0, i = t.length; e < i; e++) n[e] = t[e];
  }
  function zl(n, t) {
    let e = Dp[t];
    e === void 0 && ((e = new Int32Array(t)), (Dp[t] = e));
    for (let i = 0; i !== t; ++i) e[i] = n.allocateTextureUnit();
    return e;
  }
  function h2(n, t) {
    let e = this.cache;
    e[0] !== t && (n.uniform1f(this.addr, t), (e[0] = t));
  }
  function u2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y) && (n.uniform2f(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
    else {
      if (dn(e, t)) return;
      (n.uniform2fv(this.addr, t), fn(e, t));
    }
  }
  function d2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
        (n.uniform3f(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
    else if (t.r !== void 0)
      (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) &&
        (n.uniform3f(this.addr, t.r, t.g, t.b), (e[0] = t.r), (e[1] = t.g), (e[2] = t.b));
    else {
      if (dn(e, t)) return;
      (n.uniform3fv(this.addr, t), fn(e, t));
    }
  }
  function f2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
        (n.uniform4f(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
    else {
      if (dn(e, t)) return;
      (n.uniform4fv(this.addr, t), fn(e, t));
    }
  }
  function p2(n, t) {
    let e = this.cache,
      i = t.elements;
    if (i === void 0) {
      if (dn(e, t)) return;
      (n.uniformMatrix2fv(this.addr, !1, t), fn(e, t));
    } else {
      if (dn(e, i)) return;
      (Up.set(i), n.uniformMatrix2fv(this.addr, !1, Up), fn(e, i));
    }
  }
  function m2(n, t) {
    let e = this.cache,
      i = t.elements;
    if (i === void 0) {
      if (dn(e, t)) return;
      (n.uniformMatrix3fv(this.addr, !1, t), fn(e, t));
    } else {
      if (dn(e, i)) return;
      (Fp.set(i), n.uniformMatrix3fv(this.addr, !1, Fp), fn(e, i));
    }
  }
  function g2(n, t) {
    let e = this.cache,
      i = t.elements;
    if (i === void 0) {
      if (dn(e, t)) return;
      (n.uniformMatrix4fv(this.addr, !1, t), fn(e, t));
    } else {
      if (dn(e, i)) return;
      (Np.set(i), n.uniformMatrix4fv(this.addr, !1, Np), fn(e, i));
    }
  }
  function v2(n, t) {
    let e = this.cache;
    e[0] !== t && (n.uniform1i(this.addr, t), (e[0] = t));
  }
  function x2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y) && (n.uniform2i(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
    else {
      if (dn(e, t)) return;
      (n.uniform2iv(this.addr, t), fn(e, t));
    }
  }
  function y2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
        (n.uniform3i(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
    else {
      if (dn(e, t)) return;
      (n.uniform3iv(this.addr, t), fn(e, t));
    }
  }
  function _2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
        (n.uniform4i(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
    else {
      if (dn(e, t)) return;
      (n.uniform4iv(this.addr, t), fn(e, t));
    }
  }
  function b2(n, t) {
    let e = this.cache;
    e[0] !== t && (n.uniform1ui(this.addr, t), (e[0] = t));
  }
  function M2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y) && (n.uniform2ui(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
    else {
      if (dn(e, t)) return;
      (n.uniform2uiv(this.addr, t), fn(e, t));
    }
  }
  function S2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) &&
        (n.uniform3ui(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
    else {
      if (dn(e, t)) return;
      (n.uniform3uiv(this.addr, t), fn(e, t));
    }
  }
  function E2(n, t) {
    let e = this.cache;
    if (t.x !== void 0)
      (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
        (n.uniform4ui(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
    else {
      if (dn(e, t)) return;
      (n.uniform4uiv(this.addr, t), fn(e, t));
    }
  }
  function Hl(n) {
    return (n.version === 0 && ((n.compareFunction = wu), (n.needsUpdate = !0)), n);
  }
  function w2(n, t, e) {
    let i = this.cache,
      r = e.allocateTextureUnit();
    i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r));
    let s;
    (this.type === n.SAMPLER_2D_SHADOW ? (s = Hl(tm)) : (s = Qp), e.setTexture2D(t || s, r));
  }
  function T2(n, t, e) {
    let i = this.cache,
      r = e.allocateTextureUnit();
    (i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r)), e.setTexture3D(t || im, r));
  }
  function A2(n, t, e) {
    let i = this.cache,
      r = e.allocateTextureUnit();
    i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r));
    let s;
    (this.type === n.SAMPLER_CUBE_SHADOW ? (s = Hl(em)) : (s = rm), e.setTextureCube(t || s, r));
  }
  function R2(n, t, e) {
    let i = this.cache,
      r = e.allocateTextureUnit();
    (i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r)), e.setTexture2DArray(t || nm, r));
  }
  function C2(n) {
    switch (n) {
      case 5126:
        return h2;
      case 35664:
        return u2;
      case 35665:
        return d2;
      case 35666:
        return f2;
      case 35674:
        return p2;
      case 35675:
        return m2;
      case 35676:
        return g2;
      case 5124:
      case 35670:
        return v2;
      case 35667:
      case 35671:
        return x2;
      case 35668:
      case 35672:
        return y2;
      case 35669:
      case 35673:
        return _2;
      case 5125:
        return b2;
      case 36294:
        return M2;
      case 36295:
        return S2;
      case 36296:
        return E2;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return w2;
      case 35679:
      case 36299:
      case 36307:
        return T2;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return A2;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return R2;
    }
  }
  function I2(n, t) {
    n.uniform1fv(this.addr, t);
  }
  function P2(n, t) {
    let e = Ys(t, this.size, 2);
    n.uniform2fv(this.addr, e);
  }
  function L2(n, t) {
    let e = Ys(t, this.size, 3);
    n.uniform3fv(this.addr, e);
  }
  function D2(n, t) {
    let e = Ys(t, this.size, 4);
    n.uniform4fv(this.addr, e);
  }
  function N2(n, t) {
    let e = Ys(t, this.size, 4);
    n.uniformMatrix2fv(this.addr, !1, e);
  }
  function F2(n, t) {
    let e = Ys(t, this.size, 9);
    n.uniformMatrix3fv(this.addr, !1, e);
  }
  function U2(n, t) {
    let e = Ys(t, this.size, 16);
    n.uniformMatrix4fv(this.addr, !1, e);
  }
  function O2(n, t) {
    n.uniform1iv(this.addr, t);
  }
  function B2(n, t) {
    n.uniform2iv(this.addr, t);
  }
  function k2(n, t) {
    n.uniform3iv(this.addr, t);
  }
  function z2(n, t) {
    n.uniform4iv(this.addr, t);
  }
  function H2(n, t) {
    n.uniform1uiv(this.addr, t);
  }
  function G2(n, t) {
    n.uniform2uiv(this.addr, t);
  }
  function V2(n, t) {
    n.uniform3uiv(this.addr, t);
  }
  function W2(n, t) {
    n.uniform4uiv(this.addr, t);
  }
  function X2(n, t, e) {
    let i = this.cache,
      r = t.length,
      s = zl(e, r);
    dn(i, s) || (n.uniform1iv(this.addr, s), fn(i, s));
    let o;
    this.type === n.SAMPLER_2D_SHADOW ? (o = Hl(tm)) : (o = Qp);
    for (let a = 0; a !== r; ++a) e.setTexture2D(t[a] || o, s[a]);
  }
  function q2(n, t, e) {
    let i = this.cache,
      r = t.length,
      s = zl(e, r);
    dn(i, s) || (n.uniform1iv(this.addr, s), fn(i, s));
    for (let o = 0; o !== r; ++o) e.setTexture3D(t[o] || im, s[o]);
  }
  function $2(n, t, e) {
    let i = this.cache,
      r = t.length,
      s = zl(e, r);
    dn(i, s) || (n.uniform1iv(this.addr, s), fn(i, s));
    let o;
    this.type === n.SAMPLER_CUBE_SHADOW ? (o = Hl(em)) : (o = rm);
    for (let a = 0; a !== r; ++a) e.setTextureCube(t[a] || o, s[a]);
  }
  function Y2(n, t, e) {
    let i = this.cache,
      r = t.length,
      s = zl(e, r);
    dn(i, s) || (n.uniform1iv(this.addr, s), fn(i, s));
    for (let o = 0; o !== r; ++o) e.setTexture2DArray(t[o] || nm, s[o]);
  }
  function j2(n) {
    switch (n) {
      case 5126:
        return I2;
      case 35664:
        return P2;
      case 35665:
        return L2;
      case 35666:
        return D2;
      case 35674:
        return N2;
      case 35675:
        return F2;
      case 35676:
        return U2;
      case 5124:
      case 35670:
        return O2;
      case 35667:
      case 35671:
        return B2;
      case 35668:
      case 35672:
        return k2;
      case 35669:
      case 35673:
        return z2;
      case 5125:
        return H2;
      case 36294:
        return G2;
      case 36295:
        return V2;
      case 36296:
        return W2;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return X2;
      case 35679:
      case 36299:
      case 36307:
        return q2;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return $2;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return Y2;
    }
  }
  var zu = class {
      constructor(t, e, i) {
        ((this.id = t), (this.addr = i), (this.cache = []), (this.type = e.type), (this.setValue = C2(e.type)));
      }
    },
    Hu = class {
      constructor(t, e, i) {
        ((this.id = t),
          (this.addr = i),
          (this.cache = []),
          (this.type = e.type),
          (this.size = e.size),
          (this.setValue = j2(e.type)));
      }
    },
    Gu = class {
      constructor(t) {
        ((this.id = t), (this.seq = []), (this.map = {}));
      }
      setValue(t, e, i) {
        let r = this.seq;
        for (let s = 0, o = r.length; s !== o; ++s) {
          let a = r[s];
          a.setValue(t, e[a.id], i);
        }
      }
    },
    Bu = /(\w+)(\])?(\[|\.)?/g;
  function Op(n, t) {
    (n.seq.push(t), (n.map[t.id] = t));
  }
  function K2(n, t, e) {
    let i = n.name,
      r = i.length;
    for (Bu.lastIndex = 0; ; ) {
      let s = Bu.exec(i),
        o = Bu.lastIndex,
        a = s[1],
        c = s[2] === "]",
        l = s[3];
      if ((c && (a = a | 0), l === void 0 || (l === "[" && o + 2 === r))) {
        Op(e, l === void 0 ? new zu(a, n, t) : new Hu(a, n, t));
        break;
      } else {
        let u = e.map[a];
        (u === void 0 && ((u = new Gu(a)), Op(e, u)), (e = u));
      }
    }
  }
  var qs = class {
    constructor(t, e) {
      ((this.seq = []), (this.map = {}));
      let i = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
      for (let o = 0; o < i; ++o) {
        let a = t.getActiveUniform(e, o),
          c = t.getUniformLocation(e, a.name);
        K2(a, c, this);
      }
      let r = [],
        s = [];
      for (let o of this.seq)
        o.type === t.SAMPLER_2D_SHADOW || o.type === t.SAMPLER_CUBE_SHADOW || o.type === t.SAMPLER_2D_ARRAY_SHADOW
          ? r.push(o)
          : s.push(o);
      r.length > 0 && (this.seq = r.concat(s));
    }
    setValue(t, e, i, r) {
      let s = this.map[e];
      s !== void 0 && s.setValue(t, i, r);
    }
    setOptional(t, e, i) {
      let r = e[i];
      r !== void 0 && this.setValue(t, i, r);
    }
    static upload(t, e, i, r) {
      for (let s = 0, o = e.length; s !== o; ++s) {
        let a = e[s],
          c = i[a.id];
        c.needsUpdate !== !1 && a.setValue(t, c.value, r);
      }
    }
    static seqWithValue(t, e) {
      let i = [];
      for (let r = 0, s = t.length; r !== s; ++r) {
        let o = t[r];
        o.id in e && i.push(o);
      }
      return i;
    }
  };
  function Bp(n, t, e) {
    let i = n.createShader(t);
    return (n.shaderSource(i, e), n.compileShader(i), i);
  }
  var J2 = 37297,
    Z2 = 0;
  function Q2(n, t) {
    let e = n.split(`
`),
      i = [],
      r = Math.max(t - 6, 0),
      s = Math.min(t + 6, e.length);
    for (let o = r; o < s; o++) {
      let a = o + 1;
      i.push(`${a === t ? ">" : " "} ${a}: ${e[o]}`);
    }
    return i.join(`
`);
  }
  var kp = new Kt();
  function ty(n) {
    me._getMatrix(kp, me.workingColorSpace, n);
    let t = `mat3( ${kp.elements.map((e) => e.toFixed(4))} )`;
    switch (me.getTransfer(n)) {
      case To:
        return [t, "LinearTransferOETF"];
      case Te:
        return [t, "sRGBTransferOETF"];
      default:
        return (Vt("WebGLProgram: Unsupported color space: ", n), [t, "LinearTransferOETF"]);
    }
  }
  function zp(n, t, e) {
    let i = n.getShaderParameter(t, n.COMPILE_STATUS),
      s = (n.getShaderInfoLog(t) || "").trim();
    if (i && s === "") return "";
    let o = /ERROR: 0:(\d+)/.exec(s);
    if (o) {
      let a = parseInt(o[1]);
      return (
        e.toUpperCase() +
        `

` +
        s +
        `

` +
        Q2(n.getShaderSource(t), a)
      );
    } else return s;
  }
  function ey(n, t) {
    let e = ty(t);
    return [`vec4 ${n}( vec4 value ) {`, `	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`, "}"].join(`
`);
  }
  var ny = {
    [lu]: "Linear",
    [hu]: "Reinhard",
    [uu]: "Cineon",
    [du]: "ACESFilmic",
    [pu]: "AgX",
    [mu]: "Neutral",
    [fu]: "Custom",
  };
  function iy(n, t) {
    let e = ny[t];
    return e === void 0
      ? (Vt("WebGLProgram: Unsupported toneMapping:", t),
        "vec3 " + n + "( vec3 color ) { return LinearToneMapping( color ); }")
      : "vec3 " + n + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
  }
  var Bl = new R();
  function ry() {
    me.getLuminanceCoefficients(Bl);
    let n = Bl.x.toFixed(4),
      t = Bl.y.toFixed(4),
      e = Bl.z.toFixed(4);
    return [
      "float luminance( const in vec3 rgb ) {",
      `	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,
      "	return dot( weights, rgb );",
      "}",
    ].join(`
`);
  }
  function sy(n) {
    return [
      n.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
      n.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : "",
    ].filter(ua).join(`
`);
  }
  function oy(n) {
    let t = [];
    for (let e in n) {
      let i = n[e];
      i !== !1 && t.push("#define " + e + " " + i);
    }
    return t.join(`
`);
  }
  function ay(n, t) {
    let e = {},
      i = n.getProgramParameter(t, n.ACTIVE_ATTRIBUTES);
    for (let r = 0; r < i; r++) {
      let s = n.getActiveAttrib(t, r),
        o = s.name,
        a = 1;
      (s.type === n.FLOAT_MAT2 && (a = 2),
        s.type === n.FLOAT_MAT3 && (a = 3),
        s.type === n.FLOAT_MAT4 && (a = 4),
        (e[o] = { type: s.type, location: n.getAttribLocation(t, o), locationSize: a }));
    }
    return e;
  }
  function ua(n) {
    return n !== "";
  }
  function Hp(n, t) {
    let e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
    return n
      .replace(/NUM_SUN_LIGHTS/g, t.numSunLights)
      .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
      .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
      .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
      .replace(/NUM_SPOT_LIGHT_COORDS/g, e)
      .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
      .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
      .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
      .replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows)
      .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
      .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
      .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
      .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
      .replace(/NUM_LIGHT_PROBE_GRIDS/g, t.numLightProbeGrids);
  }
  function Gp(n, t) {
    return n
      .replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes)
      .replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
  }
  var cy = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function Vu(n) {
    return n.replace(cy, ly);
  }
  function ly(n, t) {
    let e = se[t];
    if (e === void 0) throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
    return Vu(e);
  }
  var hy =
    /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function Vp(n) {
    return n.replace(hy, uy);
  }
  function uy(n, t, e, i) {
    let r = "";
    for (let s = parseInt(t); s < parseInt(e); s++)
      r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
    return r;
  }
  function Wp(n) {
    let t = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
    return (
      n.precision === "highp"
        ? (t += `
#define HIGH_PRECISION`)
        : n.precision === "mediump"
          ? (t += `
#define MEDIUM_PRECISION`)
          : n.precision === "lowp" &&
            (t += `
#define LOW_PRECISION`),
      t
    );
  }
  var dy = { [na]: "SHADOWMAP_TYPE_PCF", [Gs]: "SHADOWMAP_TYPE_VSM" };
  function fy(n) {
    return dy[n.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
  }
  var py = { [Ws]: "ENVMAP_MODE_REFRACTION" };
  function my(n) {
    return n.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : py[n.envMapMode] || "ENVMAP_MODE_REFLECTION";
  }
  var gy = { [cu]: "ENVMAP_BLENDING_MULTIPLY", [ep]: "ENVMAP_BLENDING_MIX", [np]: "ENVMAP_BLENDING_ADD" };
  function vy(n) {
    return n.envMap === !1 ? "ENVMAP_BLENDING_NONE" : gy[n.combine] || "ENVMAP_BLENDING_NONE";
  }
  function xy(n, t, e, i) {
    let r = n.getContext(),
      s = e.defines,
      o = e.vertexShader,
      a = e.fragmentShader,
      c = fy(e),
      l = e.envMapPMREM === !0 ? "ENVMAP_TYPE_PMREM" : "ENVMAP_TYPE_CUBE",
      h = my(e),
      u = vy(e),
      d = sy(e),
      f = oy(s),
      p = r.createProgram(),
      x,
      g,
      m = e.glslVersion
        ? "#version " +
          e.glslVersion +
          `
`
        : "";
    (e.isRawShaderMaterial
      ? ((x = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, f].filter(ua).join(`
`)),
        x.length > 0 &&
          (x += `
`),
        (g = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, f].filter(ua).join(`
`)),
        g.length > 0 &&
          (g += `
`))
      : ((x = [
          Wp(e),
          "#define SHADER_TYPE " + e.shaderType,
          "#define SHADER_NAME " + e.shaderName,
          f,
          e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
          e.batching ? "#define USE_BATCHING" : "",
          e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
          e.instancing ? "#define USE_INSTANCING" : "",
          e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
          e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
          e.useFog && e.fog ? "#define USE_FOG" : "",
          e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
          e.map ? "#define USE_MAP" : "",
          e.envMap ? "#define USE_ENVMAP" : "",
          e.envMap ? "#define " + h : "",
          e.lightMap ? "#define USE_LIGHTMAP" : "",
          e.aoMap ? "#define USE_AOMAP" : "",
          e.bumpMap ? "#define USE_BUMPMAP" : "",
          e.normalMap ? "#define USE_NORMALMAP" : "",
          e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
          e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
          e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
          e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          e.anisotropy ? "#define USE_ANISOTROPY" : "",
          e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
          e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          e.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
          e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
          e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
          e.specularMap ? "#define USE_SPECULARMAP" : "",
          e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
          e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
          e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          e.metalnessMap ? "#define USE_METALNESSMAP" : "",
          e.alphaMap ? "#define USE_ALPHAMAP" : "",
          e.alphaHash ? "#define USE_ALPHAHASH" : "",
          e.transmission ? "#define USE_TRANSMISSION" : "",
          e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
          e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
          e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
          e.mapUv ? "#define MAP_UV " + e.mapUv : "",
          e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
          e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
          e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
          e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
          e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
          e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
          e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
          e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
          e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
          e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
          e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
          e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
          e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
          e.diffuseRoughnessMapUv ? "#define DIFFUSE_ROUGHNESSMAP_UV " + e.diffuseRoughnessMapUv : "",
          e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
          e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
          e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
          e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
          e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
          e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
          e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
          e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
          e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
          e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
          e.vertexNormals ? "#define HAS_NORMAL" : "",
          e.vertexColors ? "#define USE_COLOR" : "",
          e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
          e.vertexUv1s ? "#define USE_UV1" : "",
          e.vertexUv2s ? "#define USE_UV2" : "",
          e.vertexUv3s ? "#define USE_UV3" : "",
          e.pointsUvs ? "#define USE_POINTS_UV" : "",
          e.flatShading ? "#define FLAT_SHADED" : "",
          e.skinning ? "#define USE_SKINNING" : "",
          e.morphTargets ? "#define USE_MORPHTARGETS" : "",
          e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
          e.morphColors ? "#define USE_MORPHCOLORS" : "",
          e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
          e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
          e.doubleSided ? "#define DOUBLE_SIDED" : "",
          e.flipSided ? "#define FLIP_SIDED" : "",
          e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          e.shadowMapEnabled ? "#define " + c : "",
          e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
          e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
          e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
          e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
          "uniform mat4 modelMatrix;",
          "uniform mat4 modelViewMatrix;",
          "uniform mat4 projectionMatrix;",
          "uniform mat4 viewMatrix;",
          "uniform mat3 normalMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          "#ifdef USE_INSTANCING",
          "	attribute mat4 instanceMatrix;",
          "#endif",
          "#ifdef USE_INSTANCING_COLOR",
          "	attribute vec3 instanceColor;",
          "#endif",
          "#ifdef USE_INSTANCING_MORPH",
          "	uniform sampler2D morphTexture;",
          "#endif",
          "attribute vec3 position;",
          "attribute vec3 normal;",
          "attribute vec2 uv;",
          "#ifdef USE_UV1",
          "	attribute vec2 uv1;",
          "#endif",
          "#ifdef USE_UV2",
          "	attribute vec2 uv2;",
          "#endif",
          "#ifdef USE_UV3",
          "	attribute vec2 uv3;",
          "#endif",
          "#ifdef USE_TANGENT",
          "	attribute vec4 tangent;",
          "#endif",
          "#if defined( USE_COLOR_ALPHA )",
          "	attribute vec4 color;",
          "#elif defined( USE_COLOR )",
          "	attribute vec3 color;",
          "#endif",
          "#ifdef USE_SKINNING",
          "	attribute vec4 skinIndex;",
          "	attribute vec4 skinWeight;",
          "#endif",
          `
`,
        ].filter(ua).join(`
`)),
        (g = [
          Wp(e),
          "#define SHADER_TYPE " + e.shaderType,
          "#define SHADER_NAME " + e.shaderName,
          f,
          e.useFog && e.fog ? "#define USE_FOG" : "",
          e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
          e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
          e.map ? "#define USE_MAP" : "",
          e.matcap ? "#define USE_MATCAP" : "",
          e.envMap ? "#define USE_ENVMAP" : "",
          e.envMap ? "#define " + l : "",
          e.envMap ? "#define " + h : "",
          e.envMap ? "#define " + u : "",
          e.envMapPMREM ? "#define ENVMAP_MAX_LOD " + e.envMapMaxLod + ".0" : "",
          e.envMapPMREM ? "#define ENVMAP_SIZE " + e.envMapSize + ".0" : "",
          e.lightMap ? "#define USE_LIGHTMAP" : "",
          e.aoMap ? "#define USE_AOMAP" : "",
          e.bumpMap ? "#define USE_BUMPMAP" : "",
          e.normalMap ? "#define USE_NORMALMAP" : "",
          e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
          e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
          e.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
          e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          e.anisotropy ? "#define USE_ANISOTROPY" : "",
          e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
          e.clearcoat ? "#define USE_CLEARCOAT" : "",
          e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          e.diffuseRoughness ? "#define USE_DIFFUSE_ROUGHNESS" : "",
          e.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
          e.dispersion ? "#define USE_DISPERSION" : "",
          e.retroreflection ? "#define USE_RETROREFLECTION" : "",
          e.iridescence ? "#define USE_IRIDESCENCE" : "",
          e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
          e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
          e.specularMap ? "#define USE_SPECULARMAP" : "",
          e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
          e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
          e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          e.metalnessMap ? "#define USE_METALNESSMAP" : "",
          e.alphaMap ? "#define USE_ALPHAMAP" : "",
          e.alphaTest ? "#define USE_ALPHATEST" : "",
          e.alphaHash ? "#define USE_ALPHAHASH" : "",
          e.sheen ? "#define USE_SHEEN" : "",
          e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
          e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
          e.transmission ? "#define USE_TRANSMISSION" : "",
          e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
          e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
          e.vertexColors || e.instancingColor ? "#define USE_COLOR" : "",
          e.vertexAlphas || e.batchingColor ? "#define USE_COLOR_ALPHA" : "",
          e.vertexUv1s ? "#define USE_UV1" : "",
          e.vertexUv2s ? "#define USE_UV2" : "",
          e.vertexUv3s ? "#define USE_UV3" : "",
          e.pointsUvs ? "#define USE_POINTS_UV" : "",
          e.gradientMap ? "#define USE_GRADIENTMAP" : "",
          e.flatShading ? "#define FLAT_SHADED" : "",
          e.doubleSided ? "#define DOUBLE_SIDED" : "",
          e.flipSided ? "#define FLIP_SIDED" : "",
          e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          e.shadowMapEnabled ? "#define " + c : "",
          e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
          e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
          e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
          e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
          e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
          e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
          "uniform mat4 viewMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          e.toneMapping !== Qn ? "#define TONE_MAPPING" : "",
          e.toneMapping !== Qn ? se.tonemapping_pars_fragment : "",
          e.toneMapping !== Qn ? iy("toneMapping", e.toneMapping) : "",
          e.dithering ? "#define DITHERING" : "",
          e.opaque ? "#define OPAQUE" : "",
          se.colorspace_pars_fragment,
          ey("linearToOutputTexel", e.outputColorSpace),
          ry(),
          e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
          `
`,
        ].filter(ua).join(`
`))),
      (o = Vu(o)),
      (o = Hp(o, e)),
      (o = Gp(o, e)),
      (a = Vu(a)),
      (a = Hp(a, e)),
      (a = Gp(a, e)),
      (o = Vp(o)),
      (a = Vp(a)),
      e.isRawShaderMaterial !== !0 &&
        ((m = `#version 300 es
`),
        (x =
          [d, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) +
          `
` +
          x),
        (g =
          [
            "#define varying in",
            e.glslVersion === Au ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
            e.glslVersion === Au ? "" : "#define gl_FragColor pc_fragColor",
            "#define gl_FragDepthEXT gl_FragDepth",
            "#define texture2D texture",
            "#define textureCube texture",
            "#define texture2DProj textureProj",
            "#define texture2DLodEXT textureLod",
            "#define texture2DProjLodEXT textureProjLod",
            "#define textureCubeLodEXT textureLod",
            "#define texture2DGradEXT textureGrad",
            "#define texture2DProjGradEXT textureProjGrad",
            "#define textureCubeGradEXT textureGrad",
          ].join(`
`) +
          `
` +
          g)));
    let y = m + x + o,
      E = m + g + a,
      _ = Bp(r, r.VERTEX_SHADER, y),
      T = Bp(r, r.FRAGMENT_SHADER, E);
    (r.attachShader(p, _),
      r.attachShader(p, T),
      e.index0AttributeName !== void 0
        ? r.bindAttribLocation(p, 0, e.index0AttributeName)
        : e.hasPositionAttribute === !0 && r.bindAttribLocation(p, 0, "position"),
      r.linkProgram(p));
    function w(I) {
      if (n.debug.checkShaderErrors) {
        let N = r.getProgramInfoLog(p) || "",
          B = r.getShaderInfoLog(_) || "",
          X = r.getShaderInfoLog(T) || "",
          P = N.trim(),
          H = B.trim(),
          Y = X.trim(),
          G = !0,
          ot = !0;
        if (r.getProgramParameter(p, r.LINK_STATUS) === !1)
          if (((G = !1), typeof n.debug.onShaderError == "function")) n.debug.onShaderError(r, p, _, T);
          else {
            let $ = zp(r, _, "vertex"),
              nt = zp(r, T, "fragment");
            qt(
              "WebGLProgram: Shader Error " +
                r.getError() +
                " - VALIDATE_STATUS " +
                r.getProgramParameter(p, r.VALIDATE_STATUS) +
                `

Material Name: ` +
                I.name +
                `
Material Type: ` +
                I.type +
                `

Program Info Log: ` +
                P +
                `
` +
                $ +
                `
` +
                nt,
            );
          }
        else P !== "" ? Vt("WebGLProgram: Program Info Log:", P) : (H === "" || Y === "") && (ot = !1);
        ot &&
          (I.diagnostics = {
            runnable: G,
            programLog: P,
            vertexShader: { log: H, prefix: x },
            fragmentShader: { log: Y, prefix: g },
          });
      }
      (r.deleteShader(_), r.deleteShader(T), (v = new qs(r, p)), (S = ay(r, p)));
    }
    let v;
    this.getUniforms = function () {
      return (v === void 0 && w(this), v);
    };
    let S;
    this.getAttributes = function () {
      return (S === void 0 && w(this), S);
    };
    let F = e.rendererExtensionParallelShaderCompile === !1;
    return (
      (this.isReady = function () {
        return (F === !1 && (F = r.getProgramParameter(p, J2)), F);
      }),
      (this.destroy = function () {
        (i.releaseStatesOfProgram(this), r.deleteProgram(p), (this.program = void 0));
      }),
      (this.type = e.shaderType),
      (this.name = e.shaderName),
      (this.id = Z2++),
      (this.cacheKey = t),
      (this.usedTimes = 1),
      (this.program = p),
      (this.vertexShader = _),
      (this.fragmentShader = T),
      this
    );
  }
  var yy = 0,
    Wu = class {
      constructor() {
        ((this.shaderCache = new Map()), (this.materialCache = new Map()));
      }
      update(t, e, i) {
        let r = this._getShaderCacheForMaterial(t);
        return (r.has(e) === !1 && (r.add(e), e.usedTimes++), r.has(i) === !1 && (r.add(i), i.usedTimes++), this);
      }
      remove(t) {
        let e = this.materialCache.get(t);
        for (let i of e) (i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code));
        return (this.materialCache.delete(t), this);
      }
      getVertexShaderStage(t) {
        return this._getShaderStage(t.vertexShader);
      }
      getFragmentShaderStage(t) {
        return this._getShaderStage(t.fragmentShader);
      }
      dispose() {
        (this.shaderCache.clear(), this.materialCache.clear());
      }
      _getShaderCacheForMaterial(t) {
        let e = this.materialCache,
          i = e.get(t);
        return (i === void 0 && ((i = new Set()), e.set(t, i)), i);
      }
      _getShaderStage(t) {
        let e = this.shaderCache,
          i = e.get(t);
        return (i === void 0 && ((i = new Xu(t)), e.set(t, i)), i);
      }
    },
    Xu = class {
      constructor(t) {
        ((this.id = yy++), (this.code = t), (this.usedTimes = 0));
      }
    };
  function _y(n) {
    return n === Sr || n === ca || n === la;
  }
  function by(n, t, e, i, r, s) {
    let o = new Io(),
      a = new Wu(),
      c = new Set(),
      l = [],
      h = new Map(),
      u = i.logarithmicDepthBuffer,
      d = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distance",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "toon",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        MeshMatcapMaterial: "matcap",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
        SpriteMaterial: "sprite",
      };
    function f(v) {
      return (c.add(v), v === 0 ? "uv" : `uv${v}`);
    }
    function p(v, S, F, I, N, B) {
      let X = I.fog,
        P = N.geometry,
        H = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? I.environment : null,
        Y = v.isMeshStandardMaterial || (v.isMeshLambertMaterial && !v.envMap) || (v.isMeshPhongMaterial && !v.envMap),
        G = t.get(v.envMap || H, Y),
        ot = d[v.type],
        $ = i.precision;
      v.precision !== null &&
        (($ = i.getMaxPrecision(v.precision)),
        $ !== v.precision && Vt("WebGLProgram.getParameters:", v.precision, "not supported, using", $, "instead."));
      let nt = P.morphAttributes.position || P.morphAttributes.normal || P.morphAttributes.color,
        rt = nt !== void 0 ? nt.length : 0,
        Rt = 0;
      (P.morphAttributes.position !== void 0 && (Rt = 1),
        P.morphAttributes.normal !== void 0 && (Rt = 2),
        P.morphAttributes.color !== void 0 && (Rt = 3));
      let Ht, K, bt, Ct;
      if (ot) {
        let St = Li[ot];
        ((Ht = St.vertexShader), (K = St.fragmentShader));
      } else {
        ((Ht = v.vertexShader), (K = v.fragmentShader));
        let St = a.getVertexShaderStage(v),
          Ie = a.getFragmentShaderStage(v);
        (a.update(v, St, Ie), (bt = St.id), (Ct = Ie.id));
      }
      let Bt = n.getRenderTarget(),
        Mt = n.state.buffers.depth.getReversed(),
        kt = N.isInstancedMesh === !0,
        We = N.isBatchedMesh === !0,
        Gt = !!v.map,
        oe = !!v.matcap,
        he = !!G,
        it = he && G.isPMREMTexture === !0,
        ft = !!v.aoMap,
        ht = !!v.lightMap,
        At = !!v.bumpMap && v.wireframe === !1,
        _t = !!v.normalMap,
        Qt = !!v.displacementMap,
        Ft = !!v.emissiveMap,
        ue = !!v.metalnessMap,
        de = !!v.roughnessMap,
        be = v.anisotropy > 0,
        D = v.clearcoat > 0,
        en = v.diffuseRoughness > 0,
        ae = v.dispersion > 0,
        Oe = v.retroreflectivity > 0,
        vt = v.iridescence > 0,
        Je = v.sheen > 0,
        zt = v.transmission > 0,
        jt = be && !!v.anisotropyMap,
        A = D && !!v.clearcoatMap,
        b = D && !!v.clearcoatNormalMap,
        k = D && !!v.clearcoatRoughnessMap,
        at = en && !!v.diffuseRoughnessMap,
        et = vt && !!v.iridescenceMap,
        ut = vt && !!v.iridescenceThicknessMap,
        xt = Je && !!v.sheenColorMap,
        J = Je && !!v.sheenRoughnessMap,
        Z = !!v.specularMap,
        pt = !!v.specularColorMap,
        C = !!v.specularIntensityMap,
        Q = zt && !!v.transmissionMap,
        j = zt && !!v.thicknessMap,
        mt = !!v.gradientMap,
        lt = !!v.alphaMap,
        dt = v.alphaTest > 0,
        Ut = !!v.alphaHash,
        ie = !!v.extensions,
        ct = Qn;
      v.toneMapped && (Bt === null || Bt.isXRRenderTarget === !0) && (ct = n.toneMapping);
      let Ot = it ? (G.isCompressedCubeTexture ? G.image[0].mipmaps : G.mipmaps) : null,
        te = {
          shaderID: ot,
          shaderType: v.type,
          shaderName: v.name,
          vertexShader: Ht,
          fragmentShader: K,
          defines: v.defines,
          customVertexShaderID: bt,
          customFragmentShaderID: Ct,
          isRawShaderMaterial: v.isRawShaderMaterial === !0,
          glslVersion: v.glslVersion,
          precision: $,
          batching: We,
          batchingColor: We && N._colorsTexture !== null,
          instancing: kt,
          instancingColor: kt && N.instanceColor !== null,
          instancingMorph: kt && N.morphTexture !== null,
          outputColorSpace:
            Bt === null
              ? n.outputColorSpace
              : Bt.isXRRenderTarget === !0
                ? Bt.texture.colorSpace
                : me.workingColorSpace,
          alphaToCoverage: !!v.alphaToCoverage,
          map: Gt,
          matcap: oe,
          envMap: he,
          envMapMode: he && G.mapping,
          envMapPMREM: it,
          envMapMaxLod: it ? Ot.length - 1 : null,
          envMapSize: it ? Ot[0].width : null,
          aoMap: ft,
          lightMap: ht,
          bumpMap: At,
          normalMap: _t,
          displacementMap: Qt,
          emissiveMap: Ft,
          normalMapObjectSpace: _t && v.normalMapType === sp,
          normalMapTangentSpace: _t && v.normalMapType === Fl,
          packedNormalMap: _t && v.normalMapType === Fl && _y(v.normalMap.format),
          metalnessMap: ue,
          roughnessMap: de,
          anisotropy: be,
          anisotropyMap: jt,
          clearcoat: D,
          clearcoatMap: A,
          clearcoatNormalMap: b,
          clearcoatRoughnessMap: k,
          diffuseRoughness: en,
          diffuseRoughnessMap: at,
          dispersion: ae,
          retroreflection: Oe,
          iridescence: vt,
          iridescenceMap: et,
          iridescenceThicknessMap: ut,
          sheen: Je,
          sheenColorMap: xt,
          sheenRoughnessMap: J,
          specularMap: Z,
          specularColorMap: pt,
          specularIntensityMap: C,
          transmission: zt,
          transmissionMap: Q,
          thicknessMap: j,
          gradientMap: mt,
          opaque: v.transparent === !1 && v.blending === Vs && v.alphaToCoverage === !1,
          alphaMap: lt,
          alphaTest: dt,
          alphaHash: Ut,
          combine: v.combine,
          mapUv: Gt && f(v.map.channel),
          aoMapUv: ft && f(v.aoMap.channel),
          lightMapUv: ht && f(v.lightMap.channel),
          bumpMapUv: At && f(v.bumpMap.channel),
          normalMapUv: _t && f(v.normalMap.channel),
          displacementMapUv: Qt && f(v.displacementMap.channel),
          emissiveMapUv: Ft && f(v.emissiveMap.channel),
          metalnessMapUv: ue && f(v.metalnessMap.channel),
          roughnessMapUv: de && f(v.roughnessMap.channel),
          anisotropyMapUv: jt && f(v.anisotropyMap.channel),
          clearcoatMapUv: A && f(v.clearcoatMap.channel),
          clearcoatNormalMapUv: b && f(v.clearcoatNormalMap.channel),
          clearcoatRoughnessMapUv: k && f(v.clearcoatRoughnessMap.channel),
          diffuseRoughnessMapUv: at && f(v.diffuseRoughnessMap.channel),
          iridescenceMapUv: et && f(v.iridescenceMap.channel),
          iridescenceThicknessMapUv: ut && f(v.iridescenceThicknessMap.channel),
          sheenColorMapUv: xt && f(v.sheenColorMap.channel),
          sheenRoughnessMapUv: J && f(v.sheenRoughnessMap.channel),
          specularMapUv: Z && f(v.specularMap.channel),
          specularColorMapUv: pt && f(v.specularColorMap.channel),
          specularIntensityMapUv: C && f(v.specularIntensityMap.channel),
          transmissionMapUv: Q && f(v.transmissionMap.channel),
          thicknessMapUv: j && f(v.thicknessMap.channel),
          alphaMapUv: lt && f(v.alphaMap.channel),
          vertexTangents: !!P.attributes.tangent && (_t || be),
          vertexNormals: !!P.attributes.normal,
          vertexColors: v.vertexColors,
          vertexAlphas: v.vertexColors === !0 && !!P.attributes.color && P.attributes.color.itemSize === 4,
          pointsUvs: N.isPoints === !0 && !!P.attributes.uv && (Gt || lt),
          fog: !!X,
          useFog: v.fog === !0,
          fogExp2: !!X && X.isFogExp2,
          flatShading:
            v.wireframe === !1 &&
            (v.flatShading === !0 ||
              (P.attributes.normal === void 0 &&
                _t === !1 &&
                (v.isMeshLambertMaterial ||
                  v.isMeshPhongMaterial ||
                  v.isMeshStandardMaterial ||
                  v.isMeshPhysicalMaterial))),
          sizeAttenuation: v.sizeAttenuation === !0,
          logarithmicDepthBuffer: u,
          reversedDepthBuffer: Mt,
          skinning: N.isSkinnedMesh === !0,
          hasPositionAttribute: P.attributes.position !== void 0,
          morphTargets: P.morphAttributes.position !== void 0,
          morphNormals: P.morphAttributes.normal !== void 0,
          morphColors: P.morphAttributes.color !== void 0,
          morphTargetsCount: rt,
          morphTextureStride: Rt,
          numSunLights: S.sun.length,
          numDirLights: S.directional.length,
          numPointLights: S.point.length,
          numSpotLights: S.spot.length,
          numSpotLightMaps: S.spotLightMap.length,
          numRectAreaLights: S.rectArea.length,
          numHemiLights: S.hemi.length,
          numSunLightShadows: S.sunShadowMap.length,
          numDirLightShadows: S.directionalShadowMap.length,
          numPointLightShadows: S.pointShadowMap.length,
          numSpotLightShadows: S.spotShadowMap.length,
          numSpotLightShadowsWithMaps: S.numSpotLightShadowsWithMaps,
          numLightProbes: S.numLightProbes,
          numLightProbeGrids: B.filter((St) => St.texture !== null).length,
          numClippingPlanes: s.numPlanes,
          numClipIntersection: s.numIntersection,
          dithering: v.dithering,
          shadowMapEnabled: n.shadowMap.enabled && F.length > 0,
          shadowMapType: n.shadowMap.type,
          toneMapping: ct,
          decodeVideoTexture: Gt && v.map.isVideoTexture === !0 && me.getTransfer(v.map.colorSpace) === Te,
          decodeVideoTextureEmissive:
            Ft && v.emissiveMap.isVideoTexture === !0 && me.getTransfer(v.emissiveMap.colorSpace) === Te,
          premultipliedAlpha: v.premultipliedAlpha,
          doubleSided: v.side === He,
          flipSided: v.side === Sn,
          useDepthPacking: v.depthPacking >= 0,
          depthPacking: v.depthPacking || 0,
          index0AttributeName: v.index0AttributeName,
          extensionClipCullDistance: ie && v.extensions.clipCullDistance === !0 && e.has("WEBGL_clip_cull_distance"),
          extensionMultiDraw: ((ie && v.extensions.multiDraw === !0) || We) && e.has("WEBGL_multi_draw"),
          rendererExtensionParallelShaderCompile: e.has("KHR_parallel_shader_compile"),
          customProgramCacheKey: v.customProgramCacheKey(),
        };
      return ((te.vertexUv1s = c.has(1)), (te.vertexUv2s = c.has(2)), (te.vertexUv3s = c.has(3)), c.clear(), te);
    }
    function x(v) {
      let S = [];
      if (
        (v.shaderID ? S.push(v.shaderID) : (S.push(v.customVertexShaderID), S.push(v.customFragmentShaderID)),
        v.defines !== void 0)
      )
        for (let F in v.defines) (S.push(F), S.push(v.defines[F]));
      return (
        v.isRawShaderMaterial === !1 && (g(S, v), m(S, v), S.push(n.outputColorSpace)),
        S.push(v.customProgramCacheKey),
        S.join()
      );
    }
    function g(v, S) {
      (v.push(S.precision),
        v.push(S.outputColorSpace),
        v.push(S.envMapMode),
        v.push(S.envMapPMREM),
        v.push(S.envMapMaxLod),
        v.push(S.envMapSize),
        v.push(S.mapUv),
        v.push(S.alphaMapUv),
        v.push(S.lightMapUv),
        v.push(S.aoMapUv),
        v.push(S.bumpMapUv),
        v.push(S.normalMapUv),
        v.push(S.displacementMapUv),
        v.push(S.emissiveMapUv),
        v.push(S.metalnessMapUv),
        v.push(S.roughnessMapUv),
        v.push(S.anisotropyMapUv),
        v.push(S.clearcoatMapUv),
        v.push(S.clearcoatNormalMapUv),
        v.push(S.clearcoatRoughnessMapUv),
        v.push(S.diffuseRoughnessMapUv),
        v.push(S.iridescenceMapUv),
        v.push(S.iridescenceThicknessMapUv),
        v.push(S.sheenColorMapUv),
        v.push(S.sheenRoughnessMapUv),
        v.push(S.specularMapUv),
        v.push(S.specularColorMapUv),
        v.push(S.specularIntensityMapUv),
        v.push(S.transmissionMapUv),
        v.push(S.thicknessMapUv),
        v.push(S.combine),
        v.push(S.fogExp2),
        v.push(S.sizeAttenuation),
        v.push(S.morphTargetsCount),
        v.push(S.numSunLights),
        v.push(S.numDirLights),
        v.push(S.numPointLights),
        v.push(S.numSpotLights),
        v.push(S.numSpotLightMaps),
        v.push(S.numHemiLights),
        v.push(S.numRectAreaLights),
        v.push(S.numSunLightShadows),
        v.push(S.numDirLightShadows),
        v.push(S.numPointLightShadows),
        v.push(S.numSpotLightShadows),
        v.push(S.numSpotLightShadowsWithMaps),
        v.push(S.numLightProbes),
        v.push(S.numLightProbeGrids),
        v.push(S.shadowMapType),
        v.push(S.toneMapping),
        v.push(S.numClippingPlanes),
        v.push(S.numClipIntersection),
        v.push(S.depthPacking));
    }
    function m(v, S) {
      (o.disableAll(),
        S.instancing && o.enable(0),
        S.instancingColor && o.enable(1),
        S.instancingMorph && o.enable(2),
        S.matcap && o.enable(3),
        S.envMap && o.enable(4),
        S.normalMapObjectSpace && o.enable(5),
        S.normalMapTangentSpace && o.enable(6),
        S.clearcoat && o.enable(7),
        S.iridescence && o.enable(8),
        S.alphaTest && o.enable(9),
        S.vertexColors && o.enable(10),
        S.vertexAlphas && o.enable(11),
        S.vertexUv1s && o.enable(12),
        S.vertexUv2s && o.enable(13),
        S.vertexUv3s && o.enable(14),
        S.vertexTangents && o.enable(15),
        S.anisotropy && o.enable(16),
        S.alphaHash && o.enable(17),
        S.batching && o.enable(18),
        S.dispersion && o.enable(19),
        S.retroreflection && o.enable(24),
        S.diffuseRoughness && o.enable(25),
        S.batchingColor && o.enable(20),
        S.gradientMap && o.enable(21),
        S.packedNormalMap && o.enable(22),
        S.vertexNormals && o.enable(23),
        v.push(o.mask),
        o.disableAll(),
        S.fog && o.enable(0),
        S.useFog && o.enable(1),
        S.flatShading && o.enable(2),
        S.logarithmicDepthBuffer && o.enable(3),
        S.reversedDepthBuffer && o.enable(4),
        S.skinning && o.enable(5),
        S.morphTargets && o.enable(6),
        S.morphNormals && o.enable(7),
        S.morphColors && o.enable(8),
        S.premultipliedAlpha && o.enable(9),
        S.shadowMapEnabled && o.enable(10),
        S.doubleSided && o.enable(11),
        S.flipSided && o.enable(12),
        S.useDepthPacking && o.enable(13),
        S.dithering && o.enable(14),
        S.transmission && o.enable(15),
        S.sheen && o.enable(16),
        S.opaque && o.enable(17),
        S.pointsUvs && o.enable(18),
        S.decodeVideoTexture && o.enable(19),
        S.decodeVideoTextureEmissive && o.enable(20),
        S.alphaToCoverage && o.enable(21),
        S.numLightProbeGrids > 0 && o.enable(22),
        S.hasPositionAttribute && o.enable(23),
        v.push(o.mask));
    }
    function y(v) {
      let S = d[v.type],
        F;
      if (S) {
        let I = Li[S];
        F = wp.clone(I.uniforms);
      } else F = v.uniforms;
      return F;
    }
    function E(v, S) {
      let F = h.get(S);
      return (F !== void 0 ? ++F.usedTimes : ((F = new xy(n, S, v, r)), l.push(F), h.set(S, F)), F);
    }
    function _(v) {
      if (--v.usedTimes === 0) {
        let S = l.indexOf(v);
        ((l[S] = l[l.length - 1]), l.pop(), h.delete(v.cacheKey), v.destroy());
      }
    }
    function T(v) {
      a.remove(v);
    }
    function w() {
      a.dispose();
    }
    return {
      getParameters: p,
      getProgramCacheKey: x,
      getUniforms: y,
      acquireProgram: E,
      releaseProgram: _,
      releaseShaderCache: T,
      programs: l,
      dispose: w,
    };
  }
  function My() {
    let n = new WeakMap();
    function t(o) {
      return n.has(o);
    }
    function e(o) {
      let a = n.get(o);
      return (a === void 0 && ((a = {}), n.set(o, a)), a);
    }
    function i(o) {
      n.delete(o);
    }
    function r(o, a, c) {
      n.get(o)[a] = c;
    }
    function s() {
      n = new WeakMap();
    }
    return { has: t, get: e, remove: i, update: r, dispose: s };
  }
  function Sy(n, t) {
    return n.groupOrder !== t.groupOrder
      ? n.groupOrder - t.groupOrder
      : n.renderOrder !== t.renderOrder
        ? n.renderOrder - t.renderOrder
        : n.material.id !== t.material.id
          ? n.material.id - t.material.id
          : n.materialVariant !== t.materialVariant
            ? n.materialVariant - t.materialVariant
            : n.z !== t.z
              ? n.z - t.z
              : n.id - t.id;
  }
  function Xp(n, t) {
    return n.groupOrder !== t.groupOrder
      ? n.groupOrder - t.groupOrder
      : n.renderOrder !== t.renderOrder
        ? n.renderOrder - t.renderOrder
        : n.z !== t.z
          ? t.z - n.z
          : n.id - t.id;
  }
  function qp() {
    let n = [],
      t = 0,
      e = [],
      i = [],
      r = [];
    function s() {
      ((t = 0), (e.length = 0), (i.length = 0), (r.length = 0));
    }
    function o(d) {
      let f = 0;
      return (d.isInstancedMesh && (f += 2), d.isSkinnedMesh && (f += 1), f);
    }
    function a(d, f, p, x, g, m) {
      let y = n[t];
      return (
        y === void 0
          ? ((y = {
              id: d.id,
              object: d,
              geometry: f,
              material: p,
              materialVariant: o(d),
              groupOrder: x,
              renderOrder: d.renderOrder,
              z: g,
              group: m,
            }),
            (n[t] = y))
          : ((y.id = d.id),
            (y.object = d),
            (y.geometry = f),
            (y.material = p),
            (y.materialVariant = o(d)),
            (y.groupOrder = x),
            (y.renderOrder = d.renderOrder),
            (y.z = g),
            (y.group = m)),
        t++,
        y
      );
    }
    function c(d, f, p, x, g, m, y) {
      y.reversedDepth === !0 && (g = -g);
      let E = a(d, f, p, x, g, m);
      p.transmission > 0 ? i.push(E) : p.transparent === !0 ? r.push(E) : e.push(E);
    }
    function l(d, f, p, x, g, m) {
      let y = a(d, f, p, x, g, m);
      p.transmission > 0 ? i.unshift(y) : p.transparent === !0 ? r.unshift(y) : e.unshift(y);
    }
    function h(d, f) {
      (e.length > 1 && e.sort(d || Sy), i.length > 1 && i.sort(f || Xp), r.length > 1 && r.sort(f || Xp));
    }
    function u() {
      for (let d = t, f = n.length; d < f; d++) {
        let p = n[d];
        if (p.id === null) break;
        ((p.id = null), (p.object = null), (p.geometry = null), (p.material = null), (p.group = null));
      }
    }
    return { opaque: e, transmissive: i, transparent: r, init: s, push: c, unshift: l, finish: u, sort: h };
  }
  function Ey() {
    let n = new WeakMap();
    function t(i, r) {
      let s = n.get(i),
        o;
      return (
        s === void 0 ? ((o = new qp()), n.set(i, [o])) : r >= s.length ? ((o = new qp()), s.push(o)) : (o = s[r]),
        o
      );
    }
    function e() {
      n = new WeakMap();
    }
    return { get: t, dispose: e };
  }
  function wy() {
    let n = {};
    return {
      get: function (t) {
        if (n[t.id] !== void 0) return n[t.id];
        let e;
        switch (t.type) {
          case "SunLight":
          case "DirectionalLight":
            e = { direction: new R(), color: new Tt() };
            break;
          case "SpotLight":
            e = {
              position: new R(),
              direction: new R(),
              color: new Tt(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
            };
            break;
          case "PointLight":
            e = { position: new R(), color: new Tt(), distance: 0, decay: 0 };
            break;
          case "HemisphereLight":
            e = { direction: new R(), skyColor: new Tt(), groundColor: new Tt() };
            break;
          case "RectAreaLight":
            e = { color: new Tt(), position: new R(), halfWidth: new R(), halfHeight: new R() };
            break;
        }
        return ((n[t.id] = e), e);
      },
    };
  }
  function Ty() {
    let n = {};
    return {
      get: function (t) {
        if (n[t.id] !== void 0) return n[t.id];
        let e;
        switch (t.type) {
          case "SunLight":
          case "DirectionalLight":
            e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new st() };
            break;
          case "SpotLight":
            e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new st() };
            break;
          case "PointLight":
            e = {
              shadowIntensity: 1,
              shadowBias: 0,
              shadowNormalBias: 0,
              shadowRadius: 1,
              shadowMapSize: new st(),
              shadowCameraNear: 1,
              shadowCameraFar: 1e3,
            };
            break;
        }
        return ((n[t.id] = e), e);
      },
    };
  }
  var Ay = 0;
  function Ry(n, t) {
    return (t.castShadow ? 2 : 0) - (n.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (n.map ? 1 : 0);
  }
  function Cy(n) {
    let t = new wy(),
      e = Ty(),
      i = {
        version: 0,
        hash: {
          sunLength: -1,
          directionalLength: -1,
          pointLength: -1,
          spotLength: -1,
          rectAreaLength: -1,
          hemiLength: -1,
          numSunShadows: -1,
          numDirectionalShadows: -1,
          numPointShadows: -1,
          numSpotShadows: -1,
          numSpotMaps: -1,
          numLightProbes: -1,
        },
        ambient: [0, 0, 0],
        probe: [],
        sun: [],
        sunShadow: [],
        sunShadowMap: [],
        sunShadowMatrix: [],
        sunShadowCascade: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotLightMap: [],
        spotShadow: [],
        spotShadowMap: [],
        spotLightMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
        numSpotLightShadowsWithMaps: 0,
        numLightProbes: 0,
      };
    for (let l = 0; l < 9; l++) i.probe.push(new R());
    let r = new R(),
      s = new le(),
      o = new le();
    function a(l) {
      let h = 0,
        u = 0,
        d = 0;
      for (let B = 0; B < 9; B++) i.probe[B].set(0, 0, 0);
      let f = 0,
        p = 0,
        x = 0,
        g = 0,
        m = 0,
        y = 0,
        E = 0,
        _ = 0,
        T = 0,
        w = 0,
        v = 0,
        S = 0,
        F = 0,
        I = 0;
      l.sort(Ry);
      for (let B = 0, X = l.length; B < X; B++) {
        let P = l[B],
          H = P.color,
          Y = P.intensity,
          G = P.distance,
          ot = null;
        if (
          (P.shadow &&
            P.shadow.map &&
            (P.shadow.map.texture.format === Sr
              ? (ot = P.shadow.map.texture)
              : (ot = P.shadow.map.depthTexture || P.shadow.map.texture)),
          P.isAmbientLight)
        )
          ((h += H.r * Y), (u += H.g * Y), (d += H.b * Y));
        else if (P.isLightProbe) {
          for (let $ = 0; $ < 9; $++) i.probe[$].addScaledVector(P.sh.coefficients[$], Y);
          I++;
        } else if (P.isSunLight) {
          let $ = t.get(P);
          if (($.color.copy(P.color).multiplyScalar(P.intensity), P.castShadow)) {
            let nt = P.shadow,
              rt = e.get(P);
            ((rt.shadowIntensity = nt.intensity),
              (rt.shadowBias = nt.bias),
              (rt.shadowNormalBias = nt.normalBias),
              (rt.shadowRadius = nt.radius),
              rt.shadowMapSize.copy(nt.mapSize).multiply(nt.getFrameExtents()),
              (i.sunShadow[p] = rt),
              (i.sunShadowMap[p] = ot));
            let Rt = nt.getViewportCount();
            for (let Ht = 0; Ht < Rt; Ht++)
              ((i.sunShadowMatrix[x + Ht] = nt.getMatrix(Ht)), (i.sunShadowCascade[x + Ht] = nt._cascadeData[Ht]));
            ((x += Rt), p++);
          }
          ((i.sun[f] = $), f++);
        } else if (P.isDirectionalLight) {
          let $ = t.get(P);
          if (($.color.copy(P.color).multiplyScalar(P.intensity), P.castShadow)) {
            let nt = P.shadow,
              rt = e.get(P);
            ((rt.shadowIntensity = nt.intensity),
              (rt.shadowBias = nt.bias),
              (rt.shadowNormalBias = nt.normalBias),
              (rt.shadowRadius = nt.radius),
              (rt.shadowMapSize = nt.mapSize),
              (i.directionalShadow[g] = rt),
              (i.directionalShadowMap[g] = ot),
              (i.directionalShadowMatrix[g] = P.shadow.matrix),
              T++);
          }
          ((i.directional[g] = $), g++);
        } else if (P.isSpotLight) {
          let $ = t.get(P);
          ($.position.setFromMatrixPosition(P.matrixWorld),
            $.color.copy(H).multiplyScalar(Y),
            ($.distance = G),
            ($.coneCos = Math.cos(P.angle)),
            ($.penumbraCos = Math.cos(P.angle * (1 - P.penumbra))),
            ($.decay = P.decay),
            (i.spot[y] = $));
          let nt = P.shadow;
          if (
            (P.map && ((i.spotLightMap[S] = P.map), S++, nt.updateMatrices(P), P.castShadow && F++),
            (i.spotLightMatrix[y] = nt.matrix),
            P.castShadow)
          ) {
            let rt = e.get(P);
            ((rt.shadowIntensity = nt.intensity),
              (rt.shadowBias = nt.bias),
              (rt.shadowNormalBias = nt.normalBias),
              (rt.shadowRadius = nt.radius),
              (rt.shadowMapSize = nt.mapSize),
              (i.spotShadow[y] = rt),
              (i.spotShadowMap[y] = ot),
              v++);
          }
          y++;
        } else if (P.isRectAreaLight) {
          let $ = t.get(P);
          ($.color.copy(H).multiplyScalar(Y),
            $.halfWidth.set(P.width * 0.5, 0, 0),
            $.halfHeight.set(0, P.height * 0.5, 0),
            (i.rectArea[E] = $),
            E++);
        } else if (P.isPointLight) {
          let $ = t.get(P);
          if (
            ($.color.copy(P.color).multiplyScalar(P.intensity),
            ($.distance = P.distance),
            ($.decay = P.decay),
            P.castShadow)
          ) {
            let nt = P.shadow,
              rt = e.get(P);
            ((rt.shadowIntensity = nt.intensity),
              (rt.shadowBias = nt.bias),
              (rt.shadowNormalBias = nt.normalBias),
              (rt.shadowRadius = nt.radius),
              (rt.shadowMapSize = nt.mapSize),
              (rt.shadowCameraNear = nt.camera.near),
              (rt.shadowCameraFar = nt.camera.far),
              (i.pointShadow[m] = rt),
              (i.pointShadowMap[m] = ot),
              (i.pointShadowMatrix[m] = P.shadow.matrix),
              w++);
          }
          ((i.point[m] = $), m++);
        } else if (P.isHemisphereLight) {
          let $ = t.get(P);
          ($.skyColor.copy(P.color).multiplyScalar(Y),
            $.groundColor.copy(P.groundColor).multiplyScalar(Y),
            (i.hemi[_] = $),
            _++);
        }
      }
      (E > 0 &&
        (n.has("OES_texture_float_linear") === !0
          ? ((i.rectAreaLTC1 = Et.LTC_FLOAT_1), (i.rectAreaLTC2 = Et.LTC_FLOAT_2))
          : ((i.rectAreaLTC1 = Et.LTC_HALF_1), (i.rectAreaLTC2 = Et.LTC_HALF_2))),
        (i.ambient[0] = h),
        (i.ambient[1] = u),
        (i.ambient[2] = d));
      let N = i.hash;
      (N.sunLength !== f ||
        N.directionalLength !== g ||
        N.pointLength !== m ||
        N.spotLength !== y ||
        N.rectAreaLength !== E ||
        N.hemiLength !== _ ||
        N.numSunShadows !== p ||
        N.numDirectionalShadows !== T ||
        N.numPointShadows !== w ||
        N.numSpotShadows !== v ||
        N.numSpotMaps !== S ||
        N.numLightProbes !== I) &&
        ((i.sun.length = f),
        (i.directional.length = g),
        (i.spot.length = y),
        (i.rectArea.length = E),
        (i.point.length = m),
        (i.hemi.length = _),
        (i.sunShadow.length = p),
        (i.sunShadowMap.length = p),
        (i.sunShadowMatrix.length = x),
        (i.sunShadowCascade.length = x),
        (i.directionalShadow.length = T),
        (i.directionalShadowMap.length = T),
        (i.directionalShadowMatrix.length = T),
        (i.pointShadow.length = w),
        (i.pointShadowMap.length = w),
        (i.pointShadowMatrix.length = w),
        (i.spotShadow.length = v),
        (i.spotShadowMap.length = v),
        (i.spotLightMatrix.length = v + S - F),
        (i.spotLightMap.length = S),
        (i.numSpotLightShadowsWithMaps = F),
        (i.numLightProbes = I),
        (N.sunLength = f),
        (N.directionalLength = g),
        (N.pointLength = m),
        (N.spotLength = y),
        (N.rectAreaLength = E),
        (N.hemiLength = _),
        (N.numSunShadows = p),
        (N.numDirectionalShadows = T),
        (N.numPointShadows = w),
        (N.numSpotShadows = v),
        (N.numSpotMaps = S),
        (N.numLightProbes = I),
        (i.version = Ay++));
    }
    function c(l, h) {
      let u = 0,
        d = 0,
        f = 0,
        p = 0,
        x = 0,
        g = 0,
        m = h.matrixWorldInverse;
      for (let y = 0, E = l.length; y < E; y++) {
        let _ = l[y];
        if (_.isSunLight) {
          let T = i.sun[u];
          (T.direction.setFromMatrixPosition(_.matrixWorld), T.direction.transformDirection(m), u++);
        } else if (_.isDirectionalLight) {
          let T = i.directional[d];
          (T.direction.setFromMatrixPosition(_.matrixWorld),
            r.setFromMatrixPosition(_.target.matrixWorld),
            T.direction.sub(r),
            T.direction.transformDirection(m),
            d++);
        } else if (_.isSpotLight) {
          let T = i.spot[p];
          (T.position.setFromMatrixPosition(_.matrixWorld),
            T.position.applyMatrix4(m),
            T.direction.setFromMatrixPosition(_.matrixWorld),
            r.setFromMatrixPosition(_.target.matrixWorld),
            T.direction.sub(r),
            T.direction.transformDirection(m),
            p++);
        } else if (_.isRectAreaLight) {
          let T = i.rectArea[x];
          (T.position.setFromMatrixPosition(_.matrixWorld),
            T.position.applyMatrix4(m),
            o.identity(),
            s.copy(_.matrixWorld),
            s.premultiply(m),
            o.extractRotation(s),
            T.halfWidth.set(_.width * 0.5, 0, 0),
            T.halfHeight.set(0, _.height * 0.5, 0),
            T.halfWidth.applyMatrix4(o),
            T.halfHeight.applyMatrix4(o),
            x++);
        } else if (_.isPointLight) {
          let T = i.point[f];
          (T.position.setFromMatrixPosition(_.matrixWorld), T.position.applyMatrix4(m), f++);
        } else if (_.isHemisphereLight) {
          let T = i.hemi[g];
          (T.direction.setFromMatrixPosition(_.matrixWorld), T.direction.transformDirection(m), g++);
        }
      }
    }
    return { setup: a, setupView: c, state: i };
  }
  function $p(n) {
    let t = new Cy(n),
      e = [],
      i = [],
      r = [];
    function s(u) {
      ((h.camera = u), (e.length = 0), (i.length = 0), (r.length = 0));
    }
    function o(u) {
      u.isLightProbeGrid ? r.push(u) : e.push(u);
    }
    function a(u) {
      i.push(u);
    }
    function c() {
      (t.setup(e), r.sort((u, d) => u.priority - d.priority || u.id - d.id));
    }
    function l(u) {
      t.setupView(e, u);
    }
    let h = {
      lightsArray: e,
      shadowsArray: i,
      lightProbeGridArray: r,
      camera: null,
      lights: t,
      transmissionRenderTarget: {},
      textureUnits: 0,
    };
    return { init: s, state: h, setupLights: c, setupLightsView: l, pushLight: o, pushShadow: a };
  }
  function Iy(n) {
    let t = new WeakMap();
    function e(r, s = 0) {
      let o = t.get(r),
        a;
      return (
        o === void 0 ? ((a = new $p(n)), t.set(r, [a])) : s >= o.length ? ((a = new $p(n)), o.push(a)) : (a = o[s]),
        a
      );
    }
    function i() {
      t = new WeakMap();
    }
    return { get: e, dispose: i };
  }
  var Py = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
    Ly = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,
    Dy = [new R(1, 0, 0), new R(-1, 0, 0), new R(0, 1, 0), new R(0, -1, 0), new R(0, 0, 1), new R(0, 0, -1)],
    Ny = [new R(0, -1, 0), new R(0, -1, 0), new R(0, 0, 1), new R(0, 0, -1), new R(0, -1, 0), new R(0, -1, 0)],
    Yp = new le(),
    ha = new R(),
    ku = new R();
  function Fy(n, t, e) {
    let i = new vr(),
      r = new st(),
      s = new st(),
      o = new Ee(),
      a = new Fc(),
      c = new Uc(),
      l = {},
      h = e.maxTextureSize,
      u = { [Ii]: Sn, [Sn]: Ii, [He]: He },
      d = new Me({
        defines: { VSM_SAMPLES: 8 },
        uniforms: { shadow_pass: { value: null }, resolution: { value: new st() }, radius: { value: 4 } },
        vertexShader: Py,
        fragmentShader: Ly,
      }),
      f = d.clone();
    f.defines.HORIZONTAL_PASS = 1;
    let p = new Ae();
    p.setAttribute("position", new Le(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
    let x = new tt(p, d),
      g = this;
    ((this.enabled = !1), (this.autoUpdate = !0), (this.needsUpdate = !1), (this.type = na));
    let m = this.type;
    this.render = function (w, v, S) {
      if (g.enabled === !1 || (g.autoUpdate === !1 && g.needsUpdate === !1) || w.length === 0) return;
      this.type === Uf &&
        (Vt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), (this.type = na));
      let F = n.getRenderTarget(),
        I = n.getActiveCubeFace(),
        N = n.getActiveMipmapLevel(),
        B = n.state;
      (B.setBlending(qr),
        B.buffers.depth.getReversed() === !0
          ? B.buffers.color.setClear(0, 0, 0, 0)
          : B.buffers.color.setClear(1, 1, 1, 1),
        B.buffers.depth.setTest(!0),
        B.setScissorTest(!1));
      let X = m !== this.type;
      X &&
        v.traverse(function (P) {
          P.material &&
            (Array.isArray(P.material)
              ? P.material.forEach((H) => (H.needsUpdate = !0))
              : (P.material.needsUpdate = !0));
        });
      for (let P = 0, H = w.length; P < H; P++) {
        let Y = w[P],
          G = Y.shadow;
        if (G === void 0) {
          Vt("WebGLShadowMap:", Y, "has no shadow.");
          continue;
        }
        if (G.autoUpdate === !1 && G.needsUpdate === !1) continue;
        r.copy(G.mapSize);
        let ot = G.getFrameExtents();
        (r.multiply(ot),
          s.copy(G.mapSize),
          (r.x > h || r.y > h) &&
            (r.x > h && ((s.x = Math.floor(h / ot.x)), (r.x = s.x * ot.x), (G.mapSize.x = s.x)),
            r.y > h && ((s.y = Math.floor(h / ot.y)), (r.y = s.y * ot.y), (G.mapSize.y = s.y))));
        let $ = n.state.buffers.depth.getReversed();
        if (((G.camera._reversedDepth = $), G.map === null || X === !0)) {
          if (
            (G.map !== null &&
              (G.map.depthTexture !== null && (G.map.depthTexture.dispose(), (G.map.depthTexture = null)),
              G.map.dispose()),
            this.type === Gs)
          ) {
            if (Y.isPointLight) {
              Vt(
                "WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.",
              );
              continue;
            }
            ((G.map = new cn(r.x, r.y, { format: Sr, type: qn, minFilter: Ne, magFilter: Ne, generateMipmaps: !1 })),
              (G.map.texture.name = Y.name + ".shadowMap"),
              (G.map.depthTexture = new Ki(r.x, r.y, ti)),
              (G.map.depthTexture.name = Y.name + ".shadowMapDepth"),
              (G.map.depthTexture.format = Yi),
              (G.map.depthTexture.compareFunction = null),
              (G.map.depthTexture.minFilter = xn),
              (G.map.depthTexture.magFilter = xn));
          } else
            (Y.isPointLight
              ? ((G.map = new da(r.x)), (G.map.depthTexture = new Bo(r.x, vi)))
              : ((G.map = new cn(r.x, r.y)), (G.map.depthTexture = new Ki(r.x, r.y, vi))),
              (G.map.depthTexture.name = Y.name + ".shadowMap"),
              (G.map.depthTexture.format = Yi),
              this.type === na
                ? ((G.map.depthTexture.compareFunction = $ ? Eu : Su),
                  (G.map.depthTexture.minFilter = Ne),
                  (G.map.depthTexture.magFilter = Ne))
                : ((G.map.depthTexture.compareFunction = null),
                  (G.map.depthTexture.minFilter = xn),
                  (G.map.depthTexture.magFilter = xn)));
          G.camera.updateProjectionMatrix();
        }
        G.map.isWebGLCubeRenderTarget !== !0 &&
          (G.map.width !== r.x || G.map.height !== r.y) &&
          G.map.setSize(r.x, r.y);
        let nt = G.map.isWebGLCubeRenderTarget ? 6 : G.getViewportCount();
        Y.isPointLight !== !0 && G.updateMatrices(Y, S);
        let rt = (G.camera.layers.mask & 4294967294) !== 0 ? G.camera.layers : S.layers;
        for (let Rt = 0; Rt < nt; Rt++) {
          let Ht = G.getCamera(Rt);
          if (Y.isPointLight) {
            let K = G.camera,
              bt = G.matrix,
              Ct = Y.distance || K.far;
            (Ct !== K.far && ((K.far = Ct), K.updateProjectionMatrix()),
              ha.setFromMatrixPosition(Y.matrixWorld),
              K.position.copy(ha),
              ku.copy(K.position),
              ku.add(Dy[Rt]),
              K.up.copy(Ny[Rt]),
              K.lookAt(ku),
              K.updateMatrixWorld(),
              bt.makeTranslation(-ha.x, -ha.y, -ha.z),
              Yp.multiplyMatrices(K.projectionMatrix, K.matrixWorldInverse),
              G._frustum.setFromProjectionMatrix(Yp, K.coordinateSystem, K.reversedDepth));
          }
          if (G.map.isWebGLCubeRenderTarget) (n.setRenderTarget(G.map, Rt), n.clear());
          else {
            Rt === 0 && (n.setRenderTarget(G.map), n.clear());
            let K = G.getViewport(Rt);
            (o.set(s.x * K.x, s.y * K.y, s.x * K.z, s.y * K.w), B.viewport(o));
          }
          ((i = G.getFrustum(Rt)), _(v, S, Ht, Y, rt, this.type));
        }
        (G.isPointLightShadow !== !0 && this.type === Gs && y(G, S), (G.needsUpdate = !1));
      }
      ((m = this.type), (g.needsUpdate = !1), n.setRenderTarget(F, I, N));
    };
    function y(w, v) {
      let S = t.update(x);
      (d.defines.VSM_SAMPLES !== w.blurSamples &&
        ((d.defines.VSM_SAMPLES = w.blurSamples),
        (f.defines.VSM_SAMPLES = w.blurSamples),
        (d.needsUpdate = !0),
        (f.needsUpdate = !0)),
        w.mapPass === null
          ? (w.mapPass = new cn(r.x, r.y, { format: Sr, type: qn }))
          : (w.mapPass.width !== w.map.width || w.mapPass.height !== w.map.height) &&
            w.mapPass.setSize(w.map.width, w.map.height),
        (d.uniforms.shadow_pass.value = w.map.depthTexture),
        d.uniforms.resolution.value.set(w.map.width, w.map.height),
        (d.uniforms.radius.value = w.radius),
        n.setRenderTarget(w.mapPass),
        n.clear(),
        n.renderBufferDirect(v, null, S, d, x, null),
        (f.uniforms.shadow_pass.value = w.mapPass.texture),
        f.uniforms.resolution.value.set(w.map.width, w.map.height),
        (f.uniforms.radius.value = w.radius),
        n.setRenderTarget(w.map),
        n.clear(),
        n.renderBufferDirect(v, null, S, f, x, null));
    }
    function E(w, v, S, F) {
      let I = null,
        N = S.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
      if (N !== void 0) I = N;
      else if (
        ((I = S.isPointLight === !0 ? c : a),
        (n.localClippingEnabled &&
          v.clipShadows === !0 &&
          Array.isArray(v.clippingPlanes) &&
          v.clippingPlanes.length !== 0) ||
          (v.displacementMap && v.displacementScale !== 0) ||
          (v.alphaMap && v.alphaTest > 0) ||
          (v.map && v.alphaTest > 0) ||
          v.alphaToCoverage === !0)
      ) {
        let B = I.uuid,
          X = v.uuid,
          P = l[B];
        P === void 0 && ((P = {}), (l[B] = P));
        let H = P[X];
        (H === void 0 && ((H = I.clone()), (P[X] = H), v.addEventListener("dispose", T)), (I = H));
      }
      if (
        ((I.visible = v.visible),
        (I.wireframe = v.wireframe),
        F === Gs
          ? (I.side = v.shadowSide !== null ? v.shadowSide : v.side)
          : (I.side = v.shadowSide !== null ? v.shadowSide : u[v.side]),
        (I.alphaMap = v.alphaMap),
        (I.alphaTest = v.alphaToCoverage === !0 ? 0.5 : v.alphaTest),
        (I.map = v.map),
        (I.clipShadows = v.clipShadows),
        (I.clippingPlanes = v.clippingPlanes),
        (I.clipIntersection = v.clipIntersection),
        (I.displacementMap = v.displacementMap),
        (I.displacementScale = v.displacementScale),
        (I.displacementBias = v.displacementBias),
        (I.wireframeLinewidth = v.wireframeLinewidth),
        (I.linewidth = v.linewidth),
        S.isPointLight === !0 && I.isMeshDistanceMaterial === !0)
      ) {
        let B = n.properties.get(I);
        B.light = S;
      }
      return I;
    }
    function _(w, v, S, F, I, N) {
      if (w.visible === !1) return;
      if (
        w.layers.test(I) &&
        (w.isMesh || w.isLine || w.isPoints) &&
        (w.castShadow || (w.receiveShadow && N === Gs)) &&
        (!w.frustumCulled || w.intersectsFrustum(i))
      ) {
        w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse, w.matrixWorld);
        let P = t.update(w),
          H = w.material;
        if (Array.isArray(H)) {
          let Y = P.groups;
          for (let G = 0, ot = Y.length; G < ot; G++) {
            let $ = Y[G],
              nt = H[$.materialIndex];
            if (nt && nt.visible) {
              let rt = E(w, nt, F, N);
              (w.onBeforeShadow(n, w, v, S, P, rt, $),
                n.renderBufferDirect(S, null, P, rt, w, $),
                w.onAfterShadow(n, w, v, S, P, rt, $));
            }
          }
        } else if (H.visible) {
          let Y = E(w, H, F, N);
          (w.onBeforeShadow(n, w, v, S, P, Y, null),
            n.renderBufferDirect(S, null, P, Y, w, null),
            w.onAfterShadow(n, w, v, S, P, Y, null));
        }
      }
      let X = w.children;
      for (let P = 0, H = X.length; P < H; P++) _(X[P], v, S, F, I, N);
    }
    function T(w) {
      w.target.removeEventListener("dispose", T);
      for (let S in l) {
        let F = l[S],
          I = w.target.uuid;
        I in F && (F[I].dispose(), delete F[I]);
      }
    }
  }
  function Uy(n, t) {
    function e() {
      let C = !1,
        Q = new Ee(),
        j = null,
        mt = new Ee(0, 0, 0, 0);
      return {
        setMask: function (lt) {
          j !== lt && !C && (n.colorMask(lt, lt, lt, lt), (j = lt));
        },
        setLocked: function (lt) {
          C = lt;
        },
        setClear: function (lt, dt, Ut, ie, ct) {
          (ct === !0 && ((lt *= ie), (dt *= ie), (Ut *= ie)),
            Q.set(lt, dt, Ut, ie),
            mt.equals(Q) === !1 && (n.clearColor(lt, dt, Ut, ie), mt.copy(Q)));
        },
        reset: function () {
          ((C = !1), (j = null), mt.set(-1, 0, 0, 0));
        },
      };
    }
    function i() {
      let C = !1,
        Q = !1,
        j = null,
        mt = null,
        lt = null;
      return {
        setReversed: function (dt) {
          if (Q !== dt) {
            let Ut = t.get("EXT_clip_control");
            (dt
              ? Ut.clipControlEXT(Ut.LOWER_LEFT_EXT, Ut.ZERO_TO_ONE_EXT)
              : Ut.clipControlEXT(Ut.LOWER_LEFT_EXT, Ut.NEGATIVE_ONE_TO_ONE_EXT),
              (Q = dt));
            let ie = lt;
            ((lt = null), this.setClear(ie));
          }
        },
        getReversed: function () {
          return Q;
        },
        setTest: function (dt) {
          dt ? Mt(n.DEPTH_TEST) : kt(n.DEPTH_TEST);
        },
        setMask: function (dt) {
          j !== dt && !C && (n.depthMask(dt), (j = dt));
        },
        setFunc: function (dt) {
          if ((Q && (dt = mp[dt]), mt !== dt)) {
            switch (dt) {
              case mc:
                n.depthFunc(n.NEVER);
                break;
              case gc:
                n.depthFunc(n.ALWAYS);
                break;
              case vc:
                n.depthFunc(n.LESS);
                break;
              case Rs:
                n.depthFunc(n.LEQUAL);
                break;
              case xc:
                n.depthFunc(n.EQUAL);
                break;
              case yc:
                n.depthFunc(n.GEQUAL);
                break;
              case _c:
                n.depthFunc(n.GREATER);
                break;
              case bc:
                n.depthFunc(n.NOTEQUAL);
                break;
              default:
                n.depthFunc(n.LEQUAL);
            }
            mt = dt;
          }
        },
        setLocked: function (dt) {
          C = dt;
        },
        setClear: function (dt) {
          lt !== dt && ((lt = dt), Q && (dt = 1 - dt), n.clearDepth(dt));
        },
        reset: function () {
          ((C = !1), (j = null), (mt = null), (lt = null), (Q = !1));
        },
      };
    }
    function r() {
      let C = !1,
        Q = null,
        j = null,
        mt = null,
        lt = null,
        dt = null,
        Ut = null,
        ie = null,
        ct = null;
      return {
        setTest: function (Ot) {
          C || (Ot ? Mt(n.STENCIL_TEST) : kt(n.STENCIL_TEST));
        },
        setMask: function (Ot) {
          Q !== Ot && !C && (n.stencilMask(Ot), (Q = Ot));
        },
        setFunc: function (Ot, te, St) {
          (j !== Ot || mt !== te || lt !== St) && (n.stencilFunc(Ot, te, St), (j = Ot), (mt = te), (lt = St));
        },
        setOp: function (Ot, te, St) {
          (dt !== Ot || Ut !== te || ie !== St) && (n.stencilOp(Ot, te, St), (dt = Ot), (Ut = te), (ie = St));
        },
        setLocked: function (Ot) {
          C = Ot;
        },
        setClear: function (Ot) {
          ct !== Ot && (n.clearStencil(Ot), (ct = Ot));
        },
        reset: function () {
          ((C = !1),
            (Q = null),
            (j = null),
            (mt = null),
            (lt = null),
            (dt = null),
            (Ut = null),
            (ie = null),
            (ct = null));
        },
      };
    }
    let s = new e(),
      o = new i(),
      a = new r(),
      c = {},
      l = new WeakMap(),
      h = {},
      u = {},
      d = {},
      f = new WeakMap(),
      p = [],
      x = null,
      g = !1,
      m = null,
      y = null,
      E = null,
      _ = null,
      T = null,
      w = null,
      v = null,
      S = new Tt(0, 0, 0),
      F = 0,
      I = !1,
      N = null,
      B = null,
      X = null,
      P = null,
      H = null,
      Y = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      G = !1,
      ot = 0,
      $ = n.getParameter(n.VERSION);
    $.indexOf("WebGL") !== -1
      ? ((ot = parseFloat(/^WebGL (\d)/.exec($)[1])), (G = ot >= 1))
      : $.indexOf("OpenGL ES") !== -1 && ((ot = parseFloat(/^OpenGL ES (\d)/.exec($)[1])), (G = ot >= 2));
    let nt = null,
      rt = {},
      Rt = n.getParameter(n.SCISSOR_BOX),
      Ht = n.getParameter(n.VIEWPORT),
      K = new Ee().fromArray(Rt),
      bt = new Ee().fromArray(Ht);
    function Ct(C, Q, j, mt) {
      let lt = new Uint8Array(4),
        dt = n.createTexture();
      (n.bindTexture(C, dt),
        n.texParameteri(C, n.TEXTURE_MIN_FILTER, n.NEAREST),
        n.texParameteri(C, n.TEXTURE_MAG_FILTER, n.NEAREST));
      for (let Ut = 0; Ut < j; Ut++)
        C === n.TEXTURE_3D || C === n.TEXTURE_2D_ARRAY
          ? n.texImage3D(Q, 0, n.RGBA, 1, 1, mt, 0, n.RGBA, n.UNSIGNED_BYTE, lt)
          : n.texImage2D(Q + Ut, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, lt);
      return dt;
    }
    let Bt = {};
    ((Bt[n.TEXTURE_2D] = Ct(n.TEXTURE_2D, n.TEXTURE_2D, 1)),
      (Bt[n.TEXTURE_CUBE_MAP] = Ct(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6)),
      (Bt[n.TEXTURE_2D_ARRAY] = Ct(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1)),
      (Bt[n.TEXTURE_3D] = Ct(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1)),
      s.setClear(0, 0, 0, 1),
      o.setClear(1),
      a.setClear(0),
      Mt(n.DEPTH_TEST),
      o.setFunc(Rs),
      At(!1),
      _t(iu),
      Mt(n.CULL_FACE),
      ft(qr));
    function Mt(C) {
      h[C] !== !0 && (n.enable(C), (h[C] = !0));
    }
    function kt(C) {
      h[C] !== !1 && (n.disable(C), (h[C] = !1));
    }
    function We(C, Q) {
      return d[C] !== Q
        ? (n.bindFramebuffer(C, Q),
          (d[C] = Q),
          C === n.DRAW_FRAMEBUFFER && (d[n.FRAMEBUFFER] = Q),
          C === n.FRAMEBUFFER && (d[n.DRAW_FRAMEBUFFER] = Q),
          !0)
        : !1;
    }
    function Gt(C, Q) {
      let j = p,
        mt = !1;
      if (C) {
        ((j = f.get(Q)), j === void 0 && ((j = []), f.set(Q, j)));
        let lt = C.textures;
        if (j.length !== lt.length || j[0] !== n.COLOR_ATTACHMENT0) {
          for (let dt = 0, Ut = lt.length; dt < Ut; dt++) j[dt] = n.COLOR_ATTACHMENT0 + dt;
          ((j.length = lt.length), (mt = !0));
        }
      } else j[0] !== n.BACK && ((j[0] = n.BACK), (mt = !0));
      mt && n.drawBuffers(j);
    }
    function oe(C) {
      return x !== C ? (n.useProgram(C), (x = C), !0) : !1;
    }
    let he = { [$r]: n.FUNC_ADD, [Bf]: n.FUNC_SUBTRACT, [kf]: n.FUNC_REVERSE_SUBTRACT };
    ((he[zf] = n.MIN), (he[Hf] = n.MAX));
    let it = {
      [Gf]: n.ZERO,
      [Vf]: n.ONE,
      [Wf]: n.SRC_COLOR,
      [ou]: n.SRC_ALPHA,
      [Kf]: n.SRC_ALPHA_SATURATE,
      [Yf]: n.DST_COLOR,
      [qf]: n.DST_ALPHA,
      [Xf]: n.ONE_MINUS_SRC_COLOR,
      [au]: n.ONE_MINUS_SRC_ALPHA,
      [jf]: n.ONE_MINUS_DST_COLOR,
      [$f]: n.ONE_MINUS_DST_ALPHA,
      [Jf]: n.CONSTANT_COLOR,
      [Zf]: n.ONE_MINUS_CONSTANT_COLOR,
      [Qf]: n.CONSTANT_ALPHA,
      [tp]: n.ONE_MINUS_CONSTANT_ALPHA,
    };
    function ft(C, Q, j, mt, lt, dt, Ut, ie, ct, Ot) {
      if (C === qr) {
        g === !0 && (kt(n.BLEND), (g = !1));
        return;
      }
      if ((g === !1 && (Mt(n.BLEND), (g = !0)), C !== Of)) {
        if (C !== m || Ot !== I) {
          if (((y !== $r || T !== $r) && (n.blendEquation(n.FUNC_ADD), (y = $r), (T = $r)), Ot))
            switch (C) {
              case Vs:
                n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
                break;
              case un:
                n.blendFunc(n.ONE, n.ONE);
                break;
              case ru:
                n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
                break;
              case su:
                n.blendFuncSeparate(n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ZERO, n.ONE);
                break;
              default:
                qt("WebGLState: Invalid blending: ", C);
                break;
            }
          else
            switch (C) {
              case Vs:
                n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
                break;
              case un:
                n.blendFuncSeparate(n.SRC_ALPHA, n.ONE, n.ONE, n.ONE);
                break;
              case ru:
                qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
                break;
              case su:
                qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
                break;
              default:
                qt("WebGLState: Invalid blending: ", C);
                break;
            }
          ((E = null), (_ = null), (w = null), (v = null), S.set(0, 0, 0), (F = 0), (m = C), (I = Ot));
        }
        return;
      }
      ((lt = lt || Q),
        (dt = dt || j),
        (Ut = Ut || mt),
        (Q !== y || lt !== T) && (n.blendEquationSeparate(he[Q], he[lt]), (y = Q), (T = lt)),
        (j !== E || mt !== _ || dt !== w || Ut !== v) &&
          (n.blendFuncSeparate(it[j], it[mt], it[dt], it[Ut]), (E = j), (_ = mt), (w = dt), (v = Ut)),
        (ie.equals(S) === !1 || ct !== F) && (n.blendColor(ie.r, ie.g, ie.b, ct), S.copy(ie), (F = ct)),
        (m = C),
        (I = !1));
    }
    function ht(C, Q) {
      C.side === He ? kt(n.CULL_FACE) : Mt(n.CULL_FACE);
      let j = C.side === Sn;
      (Q && (j = !j),
        At(j),
        C.blending === Vs && C.transparent === !1
          ? ft(qr)
          : ft(
              C.blending,
              C.blendEquation,
              C.blendSrc,
              C.blendDst,
              C.blendEquationAlpha,
              C.blendSrcAlpha,
              C.blendDstAlpha,
              C.blendColor,
              C.blendAlpha,
              C.premultipliedAlpha,
            ),
        o.setFunc(C.depthFunc),
        o.setTest(C.depthTest),
        o.setMask(C.depthWrite),
        s.setMask(C.colorWrite));
      let mt = C.stencilWrite;
      (a.setTest(mt),
        mt &&
          (a.setMask(C.stencilWriteMask),
          a.setFunc(C.stencilFunc, C.stencilRef, C.stencilFuncMask),
          a.setOp(C.stencilFail, C.stencilZFail, C.stencilZPass)),
        Ft(C.polygonOffset, C.polygonOffsetFactor, C.polygonOffsetUnits),
        C.alphaToCoverage === !0 ? Mt(n.SAMPLE_ALPHA_TO_COVERAGE) : kt(n.SAMPLE_ALPHA_TO_COVERAGE));
    }
    function At(C) {
      N !== C && (C ? n.frontFace(n.CW) : n.frontFace(n.CCW), (N = C));
    }
    function _t(C) {
      (C !== Nf
        ? (Mt(n.CULL_FACE),
          C !== B && (C === iu ? n.cullFace(n.BACK) : C === Ff ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK)))
        : kt(n.CULL_FACE),
        (B = C));
    }
    function Qt(C) {
      C !== X && (G && n.lineWidth(C), (X = C));
    }
    function Ft(C, Q, j) {
      C
        ? (Mt(n.POLYGON_OFFSET_FILL),
          (P !== Q || H !== j) && ((P = Q), (H = j), o.getReversed() && ((Q = -Q), (j = -j)), n.polygonOffset(Q, j)))
        : kt(n.POLYGON_OFFSET_FILL);
    }
    function ue(C) {
      C ? Mt(n.SCISSOR_TEST) : kt(n.SCISSOR_TEST);
    }
    function de(C) {
      (C === void 0 && (C = n.TEXTURE0 + Y - 1), nt !== C && (n.activeTexture(C), (nt = C)));
    }
    function be(C, Q, j) {
      j === void 0 && (nt === null ? (j = n.TEXTURE0 + Y - 1) : (j = nt));
      let mt = rt[j];
      (mt === void 0 && ((mt = { type: void 0, texture: void 0 }), (rt[j] = mt)),
        (mt.type !== C || mt.texture !== Q) &&
          (nt !== j && (n.activeTexture(j), (nt = j)), n.bindTexture(C, Q || Bt[C]), (mt.type = C), (mt.texture = Q)));
    }
    function D() {
      let C = rt[nt];
      C !== void 0 && C.type !== void 0 && (n.bindTexture(C.type, null), (C.type = void 0), (C.texture = void 0));
    }
    function en() {
      try {
        n.compressedTexImage2D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function ae() {
      try {
        n.compressedTexImage3D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function Oe() {
      try {
        n.texSubImage2D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function vt() {
      try {
        n.texSubImage3D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function Je() {
      try {
        n.compressedTexSubImage2D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function zt() {
      try {
        n.compressedTexSubImage3D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function jt() {
      try {
        n.texStorage2D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function A() {
      try {
        n.texStorage3D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function b() {
      try {
        n.texImage2D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function k() {
      try {
        n.texImage3D(...arguments);
      } catch (C) {
        qt("WebGLState:", C);
      }
    }
    function at(C) {
      return u[C] !== void 0 ? u[C] : n.getParameter(C);
    }
    function et(C, Q) {
      u[C] !== Q && (n.pixelStorei(C, Q), (u[C] = Q));
    }
    function ut(C) {
      K.equals(C) === !1 && (n.scissor(C.x, C.y, C.z, C.w), K.copy(C));
    }
    function xt(C) {
      bt.equals(C) === !1 && (n.viewport(C.x, C.y, C.z, C.w), bt.copy(C));
    }
    function J(C, Q) {
      let j = l.get(Q);
      j === void 0 && ((j = new WeakMap()), l.set(Q, j));
      let mt = j.get(C);
      mt === void 0 && ((mt = n.getUniformBlockIndex(Q, C.name)), n.uniformBlockBinding(Q, mt, mt), j.set(C, mt));
    }
    function Z(C, Q, j) {
      let lt = l.get(Q).get(C);
      c[lt] !== j && (n.bindBufferBase(n.UNIFORM_BUFFER, lt, j), (c[lt] = j));
    }
    function pt() {
      (n.disable(n.BLEND),
        n.disable(n.CULL_FACE),
        n.disable(n.DEPTH_TEST),
        n.disable(n.POLYGON_OFFSET_FILL),
        n.disable(n.SCISSOR_TEST),
        n.disable(n.STENCIL_TEST),
        n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),
        n.blendEquation(n.FUNC_ADD),
        n.blendFunc(n.ONE, n.ZERO),
        n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO),
        n.blendColor(0, 0, 0, 0),
        n.colorMask(!0, !0, !0, !0),
        n.clearColor(0, 0, 0, 0),
        n.depthMask(!0),
        n.depthFunc(n.LESS),
        o.setReversed(!1),
        n.clearDepth(1),
        n.stencilMask(4294967295),
        n.stencilFunc(n.ALWAYS, 0, 4294967295),
        n.stencilOp(n.KEEP, n.KEEP, n.KEEP),
        n.clearStencil(0),
        n.cullFace(n.BACK),
        n.frontFace(n.CCW),
        n.polygonOffset(0, 0),
        n.activeTexture(n.TEXTURE0),
        n.bindFramebuffer(n.FRAMEBUFFER, null),
        n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null),
        n.bindFramebuffer(n.READ_FRAMEBUFFER, null),
        n.useProgram(null),
        n.lineWidth(1),
        n.scissor(0, 0, n.canvas.width, n.canvas.height),
        n.viewport(0, 0, n.canvas.width, n.canvas.height),
        n.pixelStorei(n.PACK_ALIGNMENT, 4),
        n.pixelStorei(n.UNPACK_ALIGNMENT, 4),
        n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1),
        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
        n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, n.BROWSER_DEFAULT_WEBGL),
        n.pixelStorei(n.PACK_ROW_LENGTH, 0),
        n.pixelStorei(n.PACK_SKIP_PIXELS, 0),
        n.pixelStorei(n.PACK_SKIP_ROWS, 0),
        n.pixelStorei(n.UNPACK_ROW_LENGTH, 0),
        n.pixelStorei(n.UNPACK_IMAGE_HEIGHT, 0),
        n.pixelStorei(n.UNPACK_SKIP_PIXELS, 0),
        n.pixelStorei(n.UNPACK_SKIP_ROWS, 0),
        n.pixelStorei(n.UNPACK_SKIP_IMAGES, 0),
        (h = {}),
        (u = {}),
        (nt = null),
        (rt = {}),
        (d = {}),
        (c = {}),
        (f = new WeakMap()),
        (p = []),
        (x = null),
        (g = !1),
        (m = null),
        (y = null),
        (E = null),
        (_ = null),
        (T = null),
        (w = null),
        (v = null),
        (S = new Tt(0, 0, 0)),
        (F = 0),
        (I = !1),
        (N = null),
        (B = null),
        (X = null),
        (P = null),
        (H = null),
        K.set(0, 0, n.canvas.width, n.canvas.height),
        bt.set(0, 0, n.canvas.width, n.canvas.height),
        s.reset(),
        o.reset(),
        a.reset());
    }
    return {
      buffers: { color: s, depth: o, stencil: a },
      enable: Mt,
      disable: kt,
      bindFramebuffer: We,
      drawBuffers: Gt,
      useProgram: oe,
      setBlending: ft,
      setMaterial: ht,
      setFlipSided: At,
      setCullFace: _t,
      setLineWidth: Qt,
      setPolygonOffset: Ft,
      setScissorTest: ue,
      activeTexture: de,
      bindTexture: be,
      unbindTexture: D,
      compressedTexImage2D: en,
      compressedTexImage3D: ae,
      texImage2D: b,
      texImage3D: k,
      pixelStorei: et,
      getParameter: at,
      updateUBOMapping: J,
      uniformBlockBinding: Z,
      texStorage2D: jt,
      texStorage3D: A,
      texSubImage2D: Oe,
      texSubImage3D: vt,
      compressedTexSubImage2D: Je,
      compressedTexSubImage3D: zt,
      scissor: ut,
      viewport: xt,
      reset: pt,
    };
  }
  function Oy(n, t, e, i, r, s, o) {
    let a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null,
      c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
      l = new st(),
      h = new WeakMap(),
      u = new Set(),
      d,
      f = new WeakMap(),
      p = new Set(),
      x = new FinalizationRegistry((A) => p.delete(A)),
      g = !1;
    try {
      g = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
    } catch {}
    function m(A, b) {
      return g ? new OffscreenCanvas(A, b) : Ao("canvas");
    }
    function y(A, b, k) {
      let at = 1,
        et = jt(A);
      if (((et.width > k || et.height > k) && (at = k / Math.max(et.width, et.height)), at < 1))
        if (
          (typeof HTMLImageElement < "u" && A instanceof HTMLImageElement) ||
          (typeof HTMLCanvasElement < "u" && A instanceof HTMLCanvasElement) ||
          (typeof ImageBitmap < "u" && A instanceof ImageBitmap) ||
          (typeof VideoFrame < "u" && A instanceof VideoFrame)
        ) {
          let ut = Math.floor(at * et.width),
            xt = Math.floor(at * et.height);
          d === void 0 && (d = m(ut, xt));
          let J = b ? m(ut, xt) : d;
          return (
            (J.width = ut),
            (J.height = xt),
            J.getContext("2d").drawImage(A, 0, 0, ut, xt),
            Vt(
              "WebGLRenderer: Texture has been resized from (" +
                et.width +
                "x" +
                et.height +
                ") to (" +
                ut +
                "x" +
                xt +
                ").",
            ),
            J
          );
        } else
          return (
            "data" in A && Vt("WebGLRenderer: Image in DataTexture is too big (" + et.width + "x" + et.height + ")."),
            A
          );
      return A;
    }
    function E(A) {
      return A.generateMipmaps;
    }
    function _(A) {
      n.generateMipmap(A);
    }
    function T(A) {
      return A.isWebGLCubeRenderTarget
        ? n.TEXTURE_CUBE_MAP
        : A.isWebGL3DRenderTarget
          ? n.TEXTURE_3D
          : A.isWebGLArrayRenderTarget || A.isCompressedArrayTexture
            ? n.TEXTURE_2D_ARRAY
            : n.TEXTURE_2D;
    }
    function w(A, b, k, at, et, ut = !1) {
      if (A !== null) {
        if (n[A] !== void 0) return n[A];
        Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + A + "'");
      }
      let xt;
      at &&
        ((xt = t.get("EXT_texture_norm16")),
        xt || Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
      let J = b;
      if (
        (b === n.RED &&
          (k === n.FLOAT && (J = n.R32F),
          k === n.HALF_FLOAT && (J = n.R16F),
          k === n.UNSIGNED_BYTE && (J = n.R8),
          k === n.UNSIGNED_SHORT && xt && (J = xt.R16_EXT),
          k === n.SHORT && xt && (J = xt.R16_SNORM_EXT)),
        b === n.RED_INTEGER &&
          (k === n.UNSIGNED_BYTE && (J = n.R8UI),
          k === n.UNSIGNED_SHORT && (J = n.R16UI),
          k === n.UNSIGNED_INT && (J = n.R32UI),
          k === n.BYTE && (J = n.R8I),
          k === n.SHORT && (J = n.R16I),
          k === n.INT && (J = n.R32I)),
        b === n.RG &&
          (k === n.FLOAT && (J = n.RG32F),
          k === n.HALF_FLOAT && (J = n.RG16F),
          k === n.UNSIGNED_BYTE && (J = n.RG8),
          k === n.UNSIGNED_SHORT && xt && (J = xt.RG16_EXT),
          k === n.SHORT && xt && (J = xt.RG16_SNORM_EXT)),
        b === n.RG_INTEGER &&
          (k === n.UNSIGNED_BYTE && (J = n.RG8UI),
          k === n.UNSIGNED_SHORT && (J = n.RG16UI),
          k === n.UNSIGNED_INT && (J = n.RG32UI),
          k === n.BYTE && (J = n.RG8I),
          k === n.SHORT && (J = n.RG16I),
          k === n.INT && (J = n.RG32I)),
        b === n.RGB_INTEGER &&
          (k === n.UNSIGNED_BYTE && (J = n.RGB8UI),
          k === n.UNSIGNED_SHORT && (J = n.RGB16UI),
          k === n.UNSIGNED_INT && (J = n.RGB32UI),
          k === n.BYTE && (J = n.RGB8I),
          k === n.SHORT && (J = n.RGB16I),
          k === n.INT && (J = n.RGB32I)),
        b === n.RGBA_INTEGER &&
          (k === n.UNSIGNED_BYTE && (J = n.RGBA8UI),
          k === n.UNSIGNED_SHORT && (J = n.RGBA16UI),
          k === n.UNSIGNED_INT && (J = n.RGBA32UI),
          k === n.BYTE && (J = n.RGBA8I),
          k === n.SHORT && (J = n.RGBA16I),
          k === n.INT && (J = n.RGBA32I)),
        b === n.RGB &&
          (k === n.UNSIGNED_SHORT && xt && (J = xt.RGB16_EXT),
          k === n.SHORT && xt && (J = xt.RGB16_SNORM_EXT),
          k === n.UNSIGNED_INT_5_9_9_9_REV && (J = n.RGB9_E5),
          k === n.UNSIGNED_INT_10F_11F_11F_REV && (J = n.R11F_G11F_B10F)),
        b === n.RGBA)
      ) {
        let Z = ut ? To : me.getTransfer(et);
        (k === n.FLOAT && (J = n.RGBA32F),
          k === n.HALF_FLOAT && (J = n.RGBA16F),
          k === n.UNSIGNED_BYTE && (J = Z === Te ? n.SRGB8_ALPHA8 : n.RGBA8),
          k === n.UNSIGNED_SHORT && xt && (J = xt.RGBA16_EXT),
          k === n.SHORT && xt && (J = xt.RGBA16_SNORM_EXT),
          k === n.UNSIGNED_SHORT_4_4_4_4 && (J = n.RGBA4),
          k === n.UNSIGNED_SHORT_5_5_5_1 && (J = n.RGB5_A1));
      }
      return (
        (J === n.R16F || J === n.R32F || J === n.RG16F || J === n.RG32F || J === n.RGBA16F || J === n.RGBA32F) &&
          t.get("EXT_color_buffer_float"),
        J
      );
    }
    function v(A, b) {
      let k;
      return (
        A
          ? b === null || b === vi || b === jr
            ? (k = n.DEPTH24_STENCIL8)
            : b === ti
              ? (k = n.DEPTH32F_STENCIL8)
              : b === Xs &&
                ((k = n.DEPTH24_STENCIL8),
                Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment."))
          : b === null || b === vi || b === jr
            ? (k = n.DEPTH_COMPONENT24)
            : b === ti
              ? (k = n.DEPTH_COMPONENT32F)
              : b === Xs && (k = n.DEPTH_COMPONENT16),
        k
      );
    }
    function S(A, b) {
      return E(A) === !0 || (A.isFramebufferTexture && A.minFilter !== xn && A.minFilter !== Ne)
        ? Math.log2(Math.max(b.width, b.height)) + 1
        : A.mipmaps.length > 0
          ? A.mipmaps.length
          : A.isCompressedTexture && Array.isArray(A.image)
            ? b.mipmaps.length
            : 1;
    }
    function F(A) {
      let b = new WeakRef(A);
      ((i.get(A).__ref = b), p.add(b), x.register(A, b, b));
    }
    function I(A) {
      let b = i.get(A).__ref;
      b !== void 0 && (p.delete(b), x.unregister(b));
    }
    function N(A) {
      X(A.target);
    }
    function B(A) {
      P(A.target);
    }
    function X(A) {
      (A.removeEventListener("dispose", N),
        I(A),
        Y(A),
        A.isVideoTexture && h.delete(A),
        A.isHTMLTexture && u.delete(A));
    }
    function P(A) {
      (A.removeEventListener("dispose", B), I(A), ot(A));
    }
    function H() {
      for (let A of p) {
        let b = A.deref();
        b !== void 0 && (b.isRenderTarget === !0 ? P(b) : X(b));
      }
      (p.clear(), u.clear());
    }
    function Y(A) {
      let b = i.get(A);
      if (b.__webglInit === void 0) return;
      let k = A.source,
        at = f.get(k);
      if (at) {
        let et = at[b.__cacheKey];
        (et.usedTimes--, et.usedTimes === 0 && G(A), Object.keys(at).length === 0 && f.delete(k));
      }
      i.remove(A);
    }
    function G(A) {
      let b = i.get(A);
      n.deleteTexture(b.__webglTexture);
      let k = A.source,
        at = f.get(k);
      (delete at[b.__cacheKey], o.memory.textures--);
    }
    function ot(A) {
      let b = i.get(A);
      b.__depthDisposeCallback && b.__depthDisposeCallback();
      let k = A.depthTexture;
      if ((k && k.renderTarget === A && X(k), A.isWebGLCubeRenderTarget))
        for (let et = 0; et < 6; et++) {
          if (Array.isArray(b.__webglFramebuffer[et]))
            for (let ut = 0; ut < b.__webglFramebuffer[et].length; ut++)
              n.deleteFramebuffer(b.__webglFramebuffer[et][ut]);
          else n.deleteFramebuffer(b.__webglFramebuffer[et]);
          b.__webglDepthbuffer && n.deleteRenderbuffer(b.__webglDepthbuffer[et]);
        }
      else {
        if (Array.isArray(b.__webglFramebuffer))
          for (let et = 0; et < b.__webglFramebuffer.length; et++) n.deleteFramebuffer(b.__webglFramebuffer[et]);
        else n.deleteFramebuffer(b.__webglFramebuffer);
        if (
          (b.__webglDepthbuffer && n.deleteRenderbuffer(b.__webglDepthbuffer),
          b.__webglMultisampledFramebuffer && n.deleteFramebuffer(b.__webglMultisampledFramebuffer),
          b.__webglColorRenderbuffer)
        )
          for (let et = 0; et < b.__webglColorRenderbuffer.length; et++)
            b.__webglColorRenderbuffer[et] && n.deleteRenderbuffer(b.__webglColorRenderbuffer[et]);
        b.__webglDepthRenderbuffer && n.deleteRenderbuffer(b.__webglDepthRenderbuffer);
      }
      let at = A.textures;
      for (let et = 0, ut = at.length; et < ut; et++) {
        let xt = i.get(at[et]);
        (xt.__webglTexture && (n.deleteTexture(xt.__webglTexture), o.memory.textures--), i.remove(at[et]));
      }
      i.remove(A);
    }
    let $ = 0;
    function nt() {
      $ = 0;
    }
    function rt() {
      return $;
    }
    function Rt(A) {
      $ = A;
    }
    function Ht() {
      let A = $;
      return (
        A >= r.maxTextures &&
          Vt(
            "WebGLTextures: Trying to use " + (A + 1) + " texture units while this GPU supports only " + r.maxTextures,
          ),
        ($ += 1),
        A
      );
    }
    function K(A) {
      let b = [];
      return (
        b.push(A.wrapS),
        b.push(A.wrapT),
        b.push(A.wrapR || 0),
        b.push(A.magFilter),
        b.push(A.minFilter),
        b.push(A.anisotropy),
        b.push(A.internalFormat),
        b.push(A.format),
        b.push(A.type),
        b.push(A.generateMipmaps),
        b.push(A.mipmapsAutoUpdate),
        b.push(A.premultiplyAlpha),
        b.push(A.flipY),
        b.push(A.unpackAlignment),
        b.push(A.colorSpace),
        b.join()
      );
    }
    function bt(A, b) {
      let k = i.get(A);
      if (
        (A.isVideoTexture && Je(A),
        A.isRenderTargetTexture === !1 && A.isExternalTexture !== !0 && A.version > 0 && k.__version !== A.version)
      ) {
        let at = A.image;
        if (at === null) Vt("WebGLRenderer: Texture marked for update but no image data found.");
        else if (at.complete === !1) Vt("WebGLRenderer: Texture marked for update but image is incomplete");
        else {
          ht(k, A, b);
          return;
        }
      } else A.isExternalTexture && (k.__webglTexture = A.sourceTexture ? A.sourceTexture : null);
      e.bindTexture(n.TEXTURE_2D, k.__webglTexture, n.TEXTURE0 + b);
    }
    function Ct(A, b) {
      let k = i.get(A);
      if (A.isRenderTargetTexture === !1 && A.version > 0 && k.__version !== A.version) {
        ht(k, A, b);
        return;
      } else A.isExternalTexture && (k.__webglTexture = A.sourceTexture ? A.sourceTexture : null);
      e.bindTexture(n.TEXTURE_2D_ARRAY, k.__webglTexture, n.TEXTURE0 + b);
    }
    function Bt(A, b) {
      let k = i.get(A);
      if (A.isRenderTargetTexture === !1 && A.version > 0 && k.__version !== A.version) {
        ht(k, A, b);
        return;
      }
      e.bindTexture(n.TEXTURE_3D, k.__webglTexture, n.TEXTURE0 + b);
    }
    function Mt(A, b) {
      let k = i.get(A);
      if (A.version > 0 && k.__version !== A.version) {
        At(k, A, b);
        return;
      }
      e.bindTexture(n.TEXTURE_CUBE_MAP, k.__webglTexture, n.TEXTURE0 + b);
    }
    let kt = { [gr]: n.REPEAT, [Ti]: n.CLAMP_TO_EDGE, [Mc]: n.MIRRORED_REPEAT },
      We = {
        [xn]: n.NEAREST,
        [ip]: n.NEAREST_MIPMAP_NEAREST,
        [ia]: n.NEAREST_MIPMAP_LINEAR,
        [Ne]: n.LINEAR,
        [Jc]: n.LINEAR_MIPMAP_NEAREST,
        [Qi]: n.LINEAR_MIPMAP_LINEAR,
      },
      Gt = {
        [ap]: n.NEVER,
        [wu]: n.ALWAYS,
        [cp]: n.LESS,
        [Su]: n.LEQUAL,
        [lp]: n.EQUAL,
        [Eu]: n.GEQUAL,
        [hp]: n.GREATER,
        [up]: n.NOTEQUAL,
      };
    function oe(A, b) {
      if (
        (b.type === ti &&
          t.has("OES_texture_float_linear") === !1 &&
          (b.magFilter === Ne ||
            b.magFilter === Jc ||
            b.magFilter === ia ||
            b.magFilter === Qi ||
            b.minFilter === Ne ||
            b.minFilter === Jc ||
            b.minFilter === ia ||
            b.minFilter === Qi) &&
          Vt(
            "WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.",
          ),
        n.texParameteri(A, n.TEXTURE_WRAP_S, kt[b.wrapS]),
        n.texParameteri(A, n.TEXTURE_WRAP_T, kt[b.wrapT]),
        (A === n.TEXTURE_3D || A === n.TEXTURE_2D_ARRAY) && n.texParameteri(A, n.TEXTURE_WRAP_R, kt[b.wrapR]),
        n.texParameteri(A, n.TEXTURE_MAG_FILTER, We[b.magFilter]),
        n.texParameteri(A, n.TEXTURE_MIN_FILTER, We[b.minFilter]),
        b.compareFunction &&
          (n.texParameteri(A, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE),
          n.texParameteri(A, n.TEXTURE_COMPARE_FUNC, Gt[b.compareFunction])),
        t.has("EXT_texture_filter_anisotropic") === !0)
      ) {
        if (
          b.magFilter === xn ||
          (b.minFilter !== ia && b.minFilter !== Qi) ||
          (b.type === ti && t.has("OES_texture_float_linear") === !1)
        )
          return;
        if (b.anisotropy > 1 || i.get(b).__currentAnisotropy) {
          let k = t.get("EXT_texture_filter_anisotropic");
          (n.texParameterf(A, k.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, r.getMaxAnisotropy())),
            (i.get(b).__currentAnisotropy = b.anisotropy));
        }
      }
    }
    function he(A, b) {
      let k = !1;
      A.__webglInit === void 0 && ((A.__webglInit = !0), b.addEventListener("dispose", N), F(b));
      let at = b.source,
        et = f.get(at);
      et === void 0 && ((et = {}), f.set(at, et));
      let ut = K(b);
      if (ut !== A.__cacheKey) {
        (et[ut] === void 0 && ((et[ut] = { texture: n.createTexture(), usedTimes: 0 }), o.memory.textures++, (k = !0)),
          et[ut].usedTimes++);
        let xt = et[A.__cacheKey];
        (xt !== void 0 && (et[A.__cacheKey].usedTimes--, xt.usedTimes === 0 && G(b)),
          (A.__cacheKey = ut),
          (A.__webglTexture = et[ut].texture));
      }
      return k;
    }
    function it(A, b, k) {
      return Math.floor(Math.floor(A / k) / b);
    }
    function ft(A, b, k, at) {
      let ut = A.updateRanges;
      if (ut.length === 0) e.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, b.width, b.height, k, at, b.data);
      else {
        ut.sort((C, Q) => C.start - Q.start);
        let xt = 0;
        for (let C = 1; C < ut.length; C++) {
          let Q = ut[xt],
            j = ut[C],
            mt = Q.start + Q.count,
            lt = it(j.start, b.width, 4),
            dt = it(Q.start, b.width, 4);
          j.start <= mt + 1 && lt === dt && it(j.start + j.count - 1, b.width, 4) === lt
            ? (Q.count = Math.max(Q.count, j.start + j.count - Q.start))
            : (++xt, (ut[xt] = j));
        }
        ut.length = xt + 1;
        let J = e.getParameter(n.UNPACK_ROW_LENGTH),
          Z = e.getParameter(n.UNPACK_SKIP_PIXELS),
          pt = e.getParameter(n.UNPACK_SKIP_ROWS);
        e.pixelStorei(n.UNPACK_ROW_LENGTH, b.width);
        for (let C = 0, Q = ut.length; C < Q; C++) {
          let j = ut[C],
            mt = Math.floor(j.start / 4),
            lt = Math.ceil(j.count / 4),
            dt = mt % b.width,
            Ut = Math.floor(mt / b.width),
            ie = lt,
            ct = 1;
          (e.pixelStorei(n.UNPACK_SKIP_PIXELS, dt),
            e.pixelStorei(n.UNPACK_SKIP_ROWS, Ut),
            e.texSubImage2D(n.TEXTURE_2D, 0, dt, Ut, ie, ct, k, at, b.data));
        }
        (A.clearUpdateRanges(),
          e.pixelStorei(n.UNPACK_ROW_LENGTH, J),
          e.pixelStorei(n.UNPACK_SKIP_PIXELS, Z),
          e.pixelStorei(n.UNPACK_SKIP_ROWS, pt));
      }
    }
    function ht(A, b, k) {
      let at = n.TEXTURE_2D;
      ((b.isDataArrayTexture || b.isCompressedArrayTexture) && (at = n.TEXTURE_2D_ARRAY),
        b.isData3DTexture && (at = n.TEXTURE_3D));
      let et = he(A, b),
        ut = b.source;
      e.bindTexture(at, A.__webglTexture, n.TEXTURE0 + k);
      let xt = i.get(ut);
      if (ut.version !== xt.__version || et === !0) {
        if ((e.activeTexture(n.TEXTURE0 + k), (typeof ImageBitmap < "u" && b.image instanceof ImageBitmap) === !1)) {
          let ct = me.getPrimaries(me.workingColorSpace),
            Ot = b.colorSpace === er ? null : me.getPrimaries(b.colorSpace),
            te = b.colorSpace === er || ct === Ot ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
          (e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, b.flipY),
            e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha),
            e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, te));
        }
        e.pixelStorei(n.UNPACK_ALIGNMENT, b.unpackAlignment);
        let Z = y(b.image, !1, r.maxTextureSize);
        Z = zt(b, Z);
        let pt = s.convert(b.format, b.colorSpace),
          C = s.convert(b.type),
          Q = w(b.internalFormat, pt, C, b.normalized, b.colorSpace, b.isVideoTexture);
        oe(at, b);
        let j,
          mt = b.mipmaps,
          lt = b.isVideoTexture !== !0,
          dt = xt.__version === void 0 || et === !0,
          Ut = ut.dataReady,
          ie = S(b, Z);
        if (b.isDepthTexture)
          ((Q = v(b.format === tr, b.type)),
            dt &&
              (lt
                ? e.texStorage2D(n.TEXTURE_2D, 1, Q, Z.width, Z.height)
                : e.texImage2D(n.TEXTURE_2D, 0, Q, Z.width, Z.height, 0, pt, C, null)));
        else if (b.isDataTexture)
          if (mt.length > 0) {
            lt && dt && e.texStorage2D(n.TEXTURE_2D, ie, Q, mt[0].width, mt[0].height);
            for (let ct = 0, Ot = mt.length; ct < Ot; ct++)
              ((j = mt[ct]),
                lt
                  ? Ut && e.texSubImage2D(n.TEXTURE_2D, ct, 0, 0, j.width, j.height, pt, C, j.data)
                  : e.texImage2D(n.TEXTURE_2D, ct, Q, j.width, j.height, 0, pt, C, j.data));
            b.generateMipmaps = !1;
          } else
            lt
              ? (dt && e.texStorage2D(n.TEXTURE_2D, ie, Q, Z.width, Z.height), Ut && ft(b, Z, pt, C))
              : e.texImage2D(n.TEXTURE_2D, 0, Q, Z.width, Z.height, 0, pt, C, Z.data);
        else if (b.isCompressedTexture)
          if (b.isCompressedArrayTexture) {
            lt && dt && e.texStorage3D(n.TEXTURE_2D_ARRAY, ie, Q, mt[0].width, mt[0].height, Z.depth);
            for (let ct = 0, Ot = mt.length; ct < Ot; ct++)
              if (((j = mt[ct]), b.format !== xi))
                if (pt !== null)
                  if (lt) {
                    if (Ut)
                      if (b.layerUpdates.size > 0) {
                        let te = Lu(j.width, j.height, b.format, b.type);
                        for (let St of b.layerUpdates) {
                          let Ie = j.data.subarray(
                            (St * te) / j.data.BYTES_PER_ELEMENT,
                            ((St + 1) * te) / j.data.BYTES_PER_ELEMENT,
                          );
                          e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, ct, 0, 0, St, j.width, j.height, 1, pt, Ie);
                        }
                      } else
                        e.compressedTexSubImage3D(
                          n.TEXTURE_2D_ARRAY,
                          ct,
                          0,
                          0,
                          0,
                          j.width,
                          j.height,
                          Z.depth,
                          pt,
                          j.data,
                        );
                  } else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY, ct, Q, j.width, j.height, Z.depth, 0, j.data, 0, 0);
                else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
              else
                lt
                  ? Ut && e.texSubImage3D(n.TEXTURE_2D_ARRAY, ct, 0, 0, 0, j.width, j.height, Z.depth, pt, C, j.data)
                  : e.texImage3D(n.TEXTURE_2D_ARRAY, ct, Q, j.width, j.height, Z.depth, 0, pt, C, j.data);
            b.layerUpdates.size > 0 && b.clearLayerUpdates();
          } else {
            lt && dt && e.texStorage2D(n.TEXTURE_2D, ie, Q, mt[0].width, mt[0].height);
            for (let ct = 0, Ot = mt.length; ct < Ot; ct++)
              ((j = mt[ct]),
                b.format !== xi
                  ? pt !== null
                    ? lt
                      ? Ut && e.compressedTexSubImage2D(n.TEXTURE_2D, ct, 0, 0, j.width, j.height, pt, j.data)
                      : e.compressedTexImage2D(n.TEXTURE_2D, ct, Q, j.width, j.height, 0, j.data)
                    : Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()")
                  : lt
                    ? Ut && e.texSubImage2D(n.TEXTURE_2D, ct, 0, 0, j.width, j.height, pt, C, j.data)
                    : e.texImage2D(n.TEXTURE_2D, ct, Q, j.width, j.height, 0, pt, C, j.data));
          }
        else if (b.isDataArrayTexture)
          if (lt) {
            if ((dt && e.texStorage3D(n.TEXTURE_2D_ARRAY, ie, Q, Z.width, Z.height, Z.depth), Ut))
              if (b.layerUpdates.size > 0) {
                let ct = Lu(Z.width, Z.height, b.format, b.type);
                for (let Ot of b.layerUpdates) {
                  let te = Z.data.subarray(
                    (Ot * ct) / Z.data.BYTES_PER_ELEMENT,
                    ((Ot + 1) * ct) / Z.data.BYTES_PER_ELEMENT,
                  );
                  e.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, Ot, Z.width, Z.height, 1, pt, C, te);
                }
                b.clearLayerUpdates();
              } else e.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Z.width, Z.height, Z.depth, pt, C, Z.data);
          } else e.texImage3D(n.TEXTURE_2D_ARRAY, 0, Q, Z.width, Z.height, Z.depth, 0, pt, C, Z.data);
        else if (b.isData3DTexture)
          lt
            ? (dt && e.texStorage3D(n.TEXTURE_3D, ie, Q, Z.width, Z.height, Z.depth),
              Ut && e.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, Z.width, Z.height, Z.depth, pt, C, Z.data))
            : e.texImage3D(n.TEXTURE_3D, 0, Q, Z.width, Z.height, Z.depth, 0, pt, C, Z.data);
        else if (b.isFramebufferTexture) {
          if (dt)
            if (lt) e.texStorage2D(n.TEXTURE_2D, ie, Q, Z.width, Z.height);
            else {
              let ct = Z.width,
                Ot = Z.height;
              for (let te = 0; te < ie; te++)
                (e.texImage2D(n.TEXTURE_2D, te, Q, ct, Ot, 0, pt, C, null), (ct >>= 1), (Ot >>= 1));
            }
        } else if (b.isHTMLTexture) {
          if ("texElementImage2D" in n) {
            let ct = n.canvas;
            if ((ct.hasAttribute("layoutsubtree") || ct.setAttribute("layoutsubtree", "true"), Z.parentNode !== ct)) {
              (ct.appendChild(Z),
                u.add(b),
                (ct.onpaint = (Ot) => {
                  let te = Ot.changedElements;
                  for (let St of u) te.includes(St.image) && (St.needsUpdate = !0);
                }),
                ct.requestPaint());
              return;
            }
            if (n.texElementImage2D.length === 3) n.texElementImage2D(n.TEXTURE_2D, n.RGBA8, Z);
            else {
              let te = n.RGBA,
                St = n.RGBA,
                Ie = n.UNSIGNED_BYTE;
              n.texElementImage2D(n.TEXTURE_2D, 0, te, St, Ie, Z);
            }
            (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE));
          }
        } else if (mt.length > 0) {
          if (lt && dt) {
            let ct = jt(mt[0]);
            e.texStorage2D(n.TEXTURE_2D, ie, Q, ct.width, ct.height);
          }
          for (let ct = 0, Ot = mt.length; ct < Ot; ct++)
            ((j = mt[ct]),
              lt
                ? Ut && e.texSubImage2D(n.TEXTURE_2D, ct, 0, 0, pt, C, j)
                : e.texImage2D(n.TEXTURE_2D, ct, Q, pt, C, j));
          b.generateMipmaps = !1;
        } else if (lt) {
          if (dt) {
            let ct = jt(Z);
            e.texStorage2D(n.TEXTURE_2D, ie, Q, ct.width, ct.height);
          }
          Ut && e.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, pt, C, Z);
        } else e.texImage2D(n.TEXTURE_2D, 0, Q, pt, C, Z);
        (E(b) && b.mipmapsAutoUpdate === !0 && _(at), (xt.__version = ut.version), b.onUpdate && b.onUpdate(b));
      }
      A.__version = b.version;
    }
    function At(A, b, k) {
      if (b.image.length !== 6) return;
      let at = he(A, b),
        et = b.source;
      e.bindTexture(n.TEXTURE_CUBE_MAP, A.__webglTexture, n.TEXTURE0 + k);
      let ut = i.get(et);
      if (et.version !== ut.__version || at === !0) {
        e.activeTexture(n.TEXTURE0 + k);
        let xt = me.getPrimaries(me.workingColorSpace),
          J = b.colorSpace === er ? null : me.getPrimaries(b.colorSpace),
          Z = b.colorSpace === er || xt === J ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
        (e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, b.flipY),
          e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha),
          e.pixelStorei(n.UNPACK_ALIGNMENT, b.unpackAlignment),
          e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Z));
        let pt = b.isCompressedTexture || b.image[0].isCompressedTexture,
          C = b.image[0] && b.image[0].isDataTexture,
          Q = [];
        for (let St = 0; St < 6; St++)
          (!pt && !C ? (Q[St] = y(b.image[St], !0, r.maxCubemapSize)) : (Q[St] = C ? b.image[St].image : b.image[St]),
            (Q[St] = zt(b, Q[St])));
        let j = Q[0],
          mt = s.convert(b.format, b.colorSpace),
          lt = s.convert(b.type),
          dt = w(b.internalFormat, mt, lt, b.normalized, b.colorSpace),
          Ut = b.isVideoTexture !== !0,
          ie = ut.__version === void 0 || at === !0,
          ct = et.dataReady,
          Ot = S(b, j);
        oe(n.TEXTURE_CUBE_MAP, b);
        let te;
        if (b.isDepthTexture) {
          if (((dt = v(b.format === tr, b.type)), ie))
            if (Ut) e.texStorage2D(n.TEXTURE_CUBE_MAP, 1, dt, j.width, j.height);
            else
              for (let St = 0; St < 6; St++)
                e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, 0, dt, j.width, j.height, 0, mt, lt, null);
        } else if (pt) {
          Ut && ie && e.texStorage2D(n.TEXTURE_CUBE_MAP, Ot, dt, j.width, j.height);
          for (let St = 0; St < 6; St++) {
            te = Q[St].mipmaps;
            for (let Ie = 0; Ie < te.length; Ie++) {
              let mn = te[Ie];
              b.format !== xi
                ? mt !== null
                  ? Ut
                    ? ct &&
                      e.compressedTexSubImage2D(
                        n.TEXTURE_CUBE_MAP_POSITIVE_X + St,
                        Ie,
                        0,
                        0,
                        mn.width,
                        mn.height,
                        mt,
                        mn.data,
                      )
                    : e.compressedTexImage2D(
                        n.TEXTURE_CUBE_MAP_POSITIVE_X + St,
                        Ie,
                        dt,
                        mn.width,
                        mn.height,
                        0,
                        mn.data,
                      )
                  : Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()")
                : Ut
                  ? ct &&
                    e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, Ie, 0, 0, mn.width, mn.height, mt, lt, mn.data)
                  : e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, Ie, dt, mn.width, mn.height, 0, mt, lt, mn.data);
            }
          }
        } else {
          if (((te = b.mipmaps), Ut && ie)) {
            te.length > 0 && Ot++;
            let St = jt(Q[0]);
            e.texStorage2D(n.TEXTURE_CUBE_MAP, Ot, dt, St.width, St.height);
          }
          for (let St = 0; St < 6; St++)
            if (C) {
              Ut
                ? ct &&
                  e.texSubImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + St,
                    0,
                    0,
                    0,
                    Q[St].width,
                    Q[St].height,
                    mt,
                    lt,
                    Q[St].data,
                  )
                : e.texImage2D(
                    n.TEXTURE_CUBE_MAP_POSITIVE_X + St,
                    0,
                    dt,
                    Q[St].width,
                    Q[St].height,
                    0,
                    mt,
                    lt,
                    Q[St].data,
                  );
              for (let Ie = 0; Ie < te.length; Ie++) {
                let lr = te[Ie].image[St].image;
                Ut
                  ? ct &&
                    e.texSubImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + St,
                      Ie + 1,
                      0,
                      0,
                      lr.width,
                      lr.height,
                      mt,
                      lt,
                      lr.data,
                    )
                  : e.texImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + St,
                      Ie + 1,
                      dt,
                      lr.width,
                      lr.height,
                      0,
                      mt,
                      lt,
                      lr.data,
                    );
              }
            } else {
              Ut
                ? ct && e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, 0, 0, 0, mt, lt, Q[St])
                : e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, 0, dt, mt, lt, Q[St]);
              for (let Ie = 0; Ie < te.length; Ie++) {
                let mn = te[Ie];
                Ut
                  ? ct && e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, Ie + 1, 0, 0, mt, lt, mn.image[St])
                  : e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + St, Ie + 1, dt, mt, lt, mn.image[St]);
              }
            }
        }
        (E(b) && b.mipmapsAutoUpdate === !0 && _(n.TEXTURE_CUBE_MAP),
          (ut.__version = et.version),
          b.onUpdate && b.onUpdate(b));
      }
      A.__version = b.version;
    }
    function _t(A, b, k, at, et, ut) {
      let xt = s.convert(k.format, k.colorSpace),
        J = s.convert(k.type),
        Z = w(k.internalFormat, xt, J, k.normalized, k.colorSpace),
        pt = i.get(b),
        C = i.get(k);
      if (((C.__renderTarget = b), !pt.__hasExternalTextures)) {
        let Q = Math.max(1, b.width >> ut),
          j = Math.max(1, b.height >> ut);
        et === n.TEXTURE_3D || et === n.TEXTURE_2D_ARRAY
          ? e.texImage3D(et, ut, Z, Q, j, b.depth, 0, xt, J, null)
          : e.texImage2D(et, ut, Z, Q, j, 0, xt, J, null);
      }
      (e.bindFramebuffer(n.FRAMEBUFFER, A),
        vt(b)
          ? a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, at, et, C.__webglTexture, 0, Oe(b))
          : (et === n.TEXTURE_2D || (et >= n.TEXTURE_CUBE_MAP_POSITIVE_X && et <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
            n.framebufferTexture2D(n.FRAMEBUFFER, at, et, C.__webglTexture, ut),
        e.bindFramebuffer(n.FRAMEBUFFER, null));
    }
    function Qt(A, b, k) {
      if ((n.bindRenderbuffer(n.RENDERBUFFER, A), b.depthBuffer)) {
        let at = b.depthTexture,
          et = at && at.isDepthTexture ? at.type : null,
          ut = v(b.stencilBuffer, et),
          xt = b.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
        (vt(b)
          ? a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, Oe(b), ut, b.width, b.height)
          : k
            ? n.renderbufferStorageMultisample(n.RENDERBUFFER, Oe(b), ut, b.width, b.height)
            : n.renderbufferStorage(n.RENDERBUFFER, ut, b.width, b.height),
          n.framebufferRenderbuffer(n.FRAMEBUFFER, xt, n.RENDERBUFFER, A));
      } else {
        let at = b.textures;
        for (let et = 0; et < at.length; et++) {
          let ut = at[et],
            xt = s.convert(ut.format, ut.colorSpace),
            J = s.convert(ut.type),
            Z = w(ut.internalFormat, xt, J, ut.normalized, ut.colorSpace);
          vt(b)
            ? a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, Oe(b), Z, b.width, b.height)
            : k
              ? n.renderbufferStorageMultisample(n.RENDERBUFFER, Oe(b), Z, b.width, b.height)
              : n.renderbufferStorage(n.RENDERBUFFER, Z, b.width, b.height);
        }
      }
      n.bindRenderbuffer(n.RENDERBUFFER, null);
    }
    function Ft(A, b, k) {
      let at = b.isWebGLCubeRenderTarget === !0;
      if ((e.bindFramebuffer(n.FRAMEBUFFER, A), !(b.depthTexture && b.depthTexture.isDepthTexture)))
        throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
      let et = i.get(b.depthTexture);
      et.__renderTarget = b;
      let ut = at ? b.depthTexture.image[0] : b.depthTexture.image;
      ((!et.__webglTexture || ut.width !== b.width || ut.height !== b.height) &&
        ((ut.width = b.width), (ut.height = b.height), (b.depthTexture.needsUpdate = !0)),
        at ? Mt(b.depthTexture, 0) : bt(b.depthTexture, 0));
      let xt = et.__webglTexture,
        J = Oe(b),
        Z = at ? n.TEXTURE_CUBE_MAP_POSITIVE_X + k : n.TEXTURE_2D,
        pt = b.depthTexture.format === tr ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
      if (b.depthTexture.format === Yi)
        vt(b)
          ? a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, pt, Z, xt, 0, J)
          : n.framebufferTexture2D(n.FRAMEBUFFER, pt, Z, xt, 0);
      else if (b.depthTexture.format === tr)
        vt(b)
          ? a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, pt, Z, xt, 0, J)
          : n.framebufferTexture2D(n.FRAMEBUFFER, pt, Z, xt, 0);
      else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
    }
    function ue(A) {
      let b = i.get(A),
        k = A.isWebGLCubeRenderTarget === !0;
      if (b.__boundDepthTexture !== A.depthTexture) {
        let at = A.depthTexture;
        if ((b.__depthDisposeCallback && b.__depthDisposeCallback(), at)) {
          let et = () => {
            (delete b.__boundDepthTexture, delete b.__depthDisposeCallback, at.removeEventListener("dispose", et));
          };
          (at.addEventListener("dispose", et), (b.__depthDisposeCallback = et));
        }
        b.__boundDepthTexture = at;
      }
      if (A.depthTexture && !b.__autoAllocateDepthBuffer)
        if (k) for (let at = 0; at < 6; at++) Ft(b.__webglFramebuffer[at], A, at);
        else A.texture.mipmaps.length > 0 ? Ft(b.__webglFramebuffer[0], A, 0) : Ft(b.__webglFramebuffer, A, 0);
      else if (k) {
        b.__webglDepthbuffer = [];
        for (let at = 0; at < 6; at++)
          if ((e.bindFramebuffer(n.FRAMEBUFFER, b.__webglFramebuffer[at]), b.__webglDepthbuffer[at] === void 0))
            ((b.__webglDepthbuffer[at] = n.createRenderbuffer()), Qt(b.__webglDepthbuffer[at], A, !1));
          else {
            let et = A.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
              ut = b.__webglDepthbuffer[at];
            (n.bindRenderbuffer(n.RENDERBUFFER, ut), n.framebufferRenderbuffer(n.FRAMEBUFFER, et, n.RENDERBUFFER, ut));
          }
      } else if (
        (A.texture.mipmaps.length > 0
          ? e.bindFramebuffer(n.FRAMEBUFFER, b.__webglFramebuffer[0])
          : e.bindFramebuffer(n.FRAMEBUFFER, b.__webglFramebuffer),
        b.__webglDepthbuffer === void 0)
      )
        ((b.__webglDepthbuffer = n.createRenderbuffer()), Qt(b.__webglDepthbuffer, A, !1));
      else {
        let et = A.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
          ut = b.__webglDepthbuffer;
        (n.bindRenderbuffer(n.RENDERBUFFER, ut), n.framebufferRenderbuffer(n.FRAMEBUFFER, et, n.RENDERBUFFER, ut));
      }
      e.bindFramebuffer(n.FRAMEBUFFER, null);
    }
    function de(A, b, k) {
      let at = i.get(A);
      (b !== void 0 && _t(at.__webglFramebuffer, A, A.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0),
        k !== void 0 && ue(A));
    }
    function be(A) {
      let b = A.texture,
        k = i.get(A),
        at = i.get(b);
      (A.addEventListener("dispose", B), F(A));
      let et = A.textures,
        ut = A.isWebGLCubeRenderTarget === !0,
        xt = et.length > 1;
      if (
        (xt ||
          (at.__webglTexture === void 0 && (at.__webglTexture = n.createTexture()),
          (at.__version = b.version),
          o.memory.textures++),
        ut)
      ) {
        k.__webglFramebuffer = [];
        for (let J = 0; J < 6; J++)
          if (b.mipmaps.length > 0) {
            k.__webglFramebuffer[J] = [];
            for (let Z = 0; Z < b.mipmaps.length; Z++) k.__webglFramebuffer[J][Z] = n.createFramebuffer();
          } else k.__webglFramebuffer[J] = n.createFramebuffer();
      } else {
        if (b.mipmaps.length > 0) {
          k.__webglFramebuffer = [];
          for (let J = 0; J < b.mipmaps.length; J++) k.__webglFramebuffer[J] = n.createFramebuffer();
        } else k.__webglFramebuffer = n.createFramebuffer();
        if (xt)
          for (let J = 0, Z = et.length; J < Z; J++) {
            let pt = i.get(et[J]);
            pt.__webglTexture === void 0 && ((pt.__webglTexture = n.createTexture()), o.memory.textures++);
          }
        if (A.samples > 0 && vt(A) === !1) {
          ((k.__webglMultisampledFramebuffer = n.createFramebuffer()),
            (k.__webglColorRenderbuffer = []),
            e.bindFramebuffer(n.FRAMEBUFFER, k.__webglMultisampledFramebuffer));
          for (let J = 0; J < et.length; J++) {
            let Z = et[J];
            ((k.__webglColorRenderbuffer[J] = n.createRenderbuffer()),
              n.bindRenderbuffer(n.RENDERBUFFER, k.__webglColorRenderbuffer[J]));
            let pt = s.convert(Z.format, Z.colorSpace),
              C = s.convert(Z.type),
              Q = w(Z.internalFormat, pt, C, Z.normalized, Z.colorSpace, A.isXRRenderTarget === !0),
              j = Oe(A);
            (n.renderbufferStorageMultisample(n.RENDERBUFFER, j, Q, A.width, A.height),
              n.framebufferRenderbuffer(
                n.FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + J,
                n.RENDERBUFFER,
                k.__webglColorRenderbuffer[J],
              ));
          }
          (n.bindRenderbuffer(n.RENDERBUFFER, null),
            A.depthBuffer &&
              ((k.__webglDepthRenderbuffer = n.createRenderbuffer()), Qt(k.__webglDepthRenderbuffer, A, !0)),
            e.bindFramebuffer(n.FRAMEBUFFER, null));
        }
      }
      if (ut) {
        (e.bindTexture(n.TEXTURE_CUBE_MAP, at.__webglTexture), oe(n.TEXTURE_CUBE_MAP, b));
        for (let J = 0; J < 6; J++)
          if (b.mipmaps.length > 0)
            for (let Z = 0; Z < b.mipmaps.length; Z++)
              _t(k.__webglFramebuffer[J][Z], A, b, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + J, Z);
          else _t(k.__webglFramebuffer[J], A, b, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0);
        (E(b)
          ? _(n.TEXTURE_CUBE_MAP)
          : b.mipmaps.length > 0 && n.texParameteri(n.TEXTURE_CUBE_MAP, n.TEXTURE_MAX_LEVEL, b.mipmaps.length - 1),
          e.unbindTexture());
      } else if (xt) {
        for (let J = 0, Z = et.length; J < Z; J++) {
          let pt = et[J],
            C = i.get(pt),
            Q = n.TEXTURE_2D;
          ((A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) &&
            (Q = A.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
            e.bindTexture(Q, C.__webglTexture),
            oe(Q, pt),
            _t(k.__webglFramebuffer, A, pt, n.COLOR_ATTACHMENT0 + J, Q, 0),
            E(pt) && _(Q));
        }
        e.unbindTexture();
      } else {
        let J = n.TEXTURE_2D;
        if (
          ((A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) &&
            (J = A.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
          e.bindTexture(J, at.__webglTexture),
          oe(J, b),
          b.mipmaps.length > 0)
        )
          for (let Z = 0; Z < b.mipmaps.length; Z++) _t(k.__webglFramebuffer[Z], A, b, n.COLOR_ATTACHMENT0, J, Z);
        else _t(k.__webglFramebuffer, A, b, n.COLOR_ATTACHMENT0, J, 0);
        (E(b) ? _(J) : b.mipmaps.length > 0 && n.texParameteri(J, n.TEXTURE_MAX_LEVEL, b.mipmaps.length - 1),
          e.unbindTexture());
      }
      A.depthBuffer && ue(A);
    }
    function D(A) {
      let b = A.textures;
      for (let k = 0, at = b.length; k < at; k++) {
        let et = b[k];
        if (E(et) && et.mipmapsAutoUpdate === !0) {
          let ut = T(A),
            xt = i.get(et).__webglTexture;
          (e.bindTexture(ut, xt), _(ut), e.unbindTexture());
        }
      }
    }
    let en = [];
    function ae(A) {
      if (A.samples > 0) {
        if (vt(A) === !1) {
          let b = A.textures,
            k = A.width,
            at = A.height,
            et = n.COLOR_BUFFER_BIT,
            ut = A.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
            xt = i.get(A),
            J = b.length > 1;
          if (J)
            for (let pt = 0; pt < b.length; pt++)
              (e.bindFramebuffer(n.FRAMEBUFFER, xt.__webglMultisampledFramebuffer),
                n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pt, n.RENDERBUFFER, null),
                e.bindFramebuffer(n.FRAMEBUFFER, xt.__webglFramebuffer),
                n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pt, n.TEXTURE_2D, null, 0));
          (e.bindFramebuffer(n.READ_FRAMEBUFFER, xt.__webglMultisampledFramebuffer),
            A.texture.mipmaps.length > 0
              ? e.bindFramebuffer(n.DRAW_FRAMEBUFFER, xt.__webglFramebuffer[0])
              : e.bindFramebuffer(n.DRAW_FRAMEBUFFER, xt.__webglFramebuffer));
          for (let pt = 0; pt < b.length; pt++) {
            if (
              (A.resolveDepthBuffer &&
                (A.depthBuffer && (et |= n.DEPTH_BUFFER_BIT),
                A.stencilBuffer && A.resolveStencilBuffer && (et |= n.STENCIL_BUFFER_BIT)),
              J)
            ) {
              n.framebufferRenderbuffer(
                n.READ_FRAMEBUFFER,
                n.COLOR_ATTACHMENT0,
                n.RENDERBUFFER,
                xt.__webglColorRenderbuffer[pt],
              );
              let C = i.get(b[pt]).__webglTexture;
              n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, C, 0);
            }
            (n.blitFramebuffer(0, 0, k, at, 0, 0, k, at, et, n.NEAREST),
              c === !0 &&
                ((en.length = 0),
                en.push(n.COLOR_ATTACHMENT0 + pt),
                A.depthBuffer && A.storeMultisampledDepthBuffer === !1 && en.push(ut),
                n.invalidateFramebuffer(n.READ_FRAMEBUFFER, en)));
          }
          if ((e.bindFramebuffer(n.READ_FRAMEBUFFER, null), e.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), J))
            for (let pt = 0; pt < b.length; pt++) {
              (e.bindFramebuffer(n.FRAMEBUFFER, xt.__webglMultisampledFramebuffer),
                n.framebufferRenderbuffer(
                  n.FRAMEBUFFER,
                  n.COLOR_ATTACHMENT0 + pt,
                  n.RENDERBUFFER,
                  xt.__webglColorRenderbuffer[pt],
                ));
              let C = i.get(b[pt]).__webglTexture;
              (e.bindFramebuffer(n.FRAMEBUFFER, xt.__webglFramebuffer),
                n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + pt, n.TEXTURE_2D, C, 0));
            }
          e.bindFramebuffer(n.DRAW_FRAMEBUFFER, xt.__webglMultisampledFramebuffer);
        } else if (A.depthBuffer && A.storeMultisampledDepthBuffer === !1 && c) {
          let b = A.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
          n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [b]);
        }
      }
    }
    function Oe(A) {
      return Math.min(r.maxSamples, A.samples);
    }
    function vt(A) {
      let b = i.get(A);
      return A.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && b.__useRenderToTexture !== !1;
    }
    function Je(A) {
      let b = o.render.frame;
      h.get(A) !== b && (h.set(A, b), A.update());
    }
    function zt(A, b) {
      let k = A.colorSpace,
        at = A.format,
        et = A.type;
      return (
        A.isCompressedTexture === !0 ||
          A.isVideoTexture === !0 ||
          (k !== zr &&
            k !== er &&
            (me.getTransfer(k) === Te
              ? (at !== xi || et !== Ln) &&
                Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")
              : qt("WebGLTextures: Unsupported texture color space:", k))),
        b
      );
    }
    function jt(A) {
      return (
        typeof HTMLImageElement < "u" && A instanceof HTMLImageElement
          ? ((l.width = A.naturalWidth || A.width), (l.height = A.naturalHeight || A.height))
          : typeof VideoFrame < "u" && A instanceof VideoFrame
            ? ((l.width = A.displayWidth), (l.height = A.displayHeight))
            : ((l.width = A.width), (l.height = A.height)),
        l
      );
    }
    ((this.allocateTextureUnit = Ht),
      (this.resetTextureUnits = nt),
      (this.getTextureUnits = rt),
      (this.setTextureUnits = Rt),
      (this.setTexture2D = bt),
      (this.setTexture2DArray = Ct),
      (this.setTexture3D = Bt),
      (this.setTextureCube = Mt),
      (this.rebindTextures = de),
      (this.setupRenderTarget = be),
      (this.updateRenderTargetMipmap = D),
      (this.updateMultisampleRenderTarget = ae),
      (this.setupDepthRenderbuffer = ue),
      (this.setupFrameBufferTexture = _t),
      (this.useMultisampledRTT = vt),
      (this.dispose = H));
  }
  function By(n, t) {
    function e(i, r = er) {
      let s,
        o = me.getTransfer(r);
      if (i === Ln) return n.UNSIGNED_BYTE;
      if (i === Qc) return n.UNSIGNED_SHORT_4_4_4_4;
      if (i === tl) return n.UNSIGNED_SHORT_5_5_5_1;
      if (i === yu) return n.UNSIGNED_INT_5_9_9_9_REV;
      if (i === _u) return n.UNSIGNED_INT_10F_11F_11F_REV;
      if (i === vu) return n.BYTE;
      if (i === xu) return n.SHORT;
      if (i === Xs) return n.UNSIGNED_SHORT;
      if (i === Zc) return n.INT;
      if (i === vi) return n.UNSIGNED_INT;
      if (i === ti) return n.FLOAT;
      if (i === qn) return n.HALF_FLOAT;
      if (i === bu) return n.ALPHA;
      if (i === Mu) return n.RGB;
      if (i === xi) return n.RGBA;
      if (i === Yi) return n.DEPTH_COMPONENT;
      if (i === tr) return n.DEPTH_STENCIL;
      if (i === el) return n.RED;
      if (i === nl) return n.RED_INTEGER;
      if (i === Sr) return n.RG;
      if (i === il) return n.RG_INTEGER;
      if (i === rl) return n.RGBA_INTEGER;
      if (i === ra || i === sa || i === oa || i === aa)
        if (o === Te)
          if (((s = t.get("WEBGL_compressed_texture_s3tc_srgb")), s !== null)) {
            if (i === ra) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
            if (i === sa) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
            if (i === oa) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
            if (i === aa) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
          } else return null;
        else if (((s = t.get("WEBGL_compressed_texture_s3tc")), s !== null)) {
          if (i === ra) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (i === sa) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (i === oa) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (i === aa) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        } else return null;
      if (i === sl || i === ol || i === al || i === cl)
        if (((s = t.get("WEBGL_compressed_texture_pvrtc")), s !== null)) {
          if (i === sl) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (i === ol) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (i === al) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (i === cl) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        } else return null;
      if (i === ll || i === hl || i === ul || i === dl || i === fl || i === ca || i === pl)
        if (((s = t.get("WEBGL_compressed_texture_etc")), s !== null)) {
          if (i === ll || i === hl) return o === Te ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
          if (i === ul) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
          if (i === dl) return s.COMPRESSED_R11_EAC;
          if (i === fl) return s.COMPRESSED_SIGNED_R11_EAC;
          if (i === ca) return s.COMPRESSED_RG11_EAC;
          if (i === pl) return s.COMPRESSED_SIGNED_RG11_EAC;
        } else return null;
      if (
        i === ml ||
        i === gl ||
        i === vl ||
        i === xl ||
        i === yl ||
        i === _l ||
        i === bl ||
        i === Ml ||
        i === Sl ||
        i === El ||
        i === wl ||
        i === Tl ||
        i === Al ||
        i === Rl
      )
        if (((s = t.get("WEBGL_compressed_texture_astc")), s !== null)) {
          if (i === ml) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
          if (i === gl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
          if (i === vl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
          if (i === xl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
          if (i === yl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
          if (i === _l) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
          if (i === bl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
          if (i === Ml) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
          if (i === Sl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
          if (i === El) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
          if (i === wl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
          if (i === Tl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
          if (i === Al) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
          if (i === Rl) return o === Te ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
        } else return null;
      if (i === Cl || i === Il || i === Pl)
        if (((s = t.get("EXT_texture_compression_bptc")), s !== null)) {
          if (i === Cl) return o === Te ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
          if (i === Il) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
          if (i === Pl) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
        } else return null;
      if (i === Ll || i === Dl || i === la || i === Nl)
        if (((s = t.get("EXT_texture_compression_rgtc")), s !== null)) {
          if (i === Ll) return s.COMPRESSED_RED_RGTC1_EXT;
          if (i === Dl) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
          if (i === la) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
          if (i === Nl) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
        } else return null;
      return i === jr ? n.UNSIGNED_INT_24_8 : n[i] !== void 0 ? n[i] : null;
    }
    return { convert: e };
  }
  var ky = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
    zy = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,
    qu = class {
      constructor() {
        ((this.texture = null), (this.mesh = null), (this.depthNear = 0), (this.depthFar = 0));
      }
      init(t, e) {
        if (this.texture === null) {
          let i = new ko(t.texture);
          ((t.depthNear !== e.depthNear || t.depthFar !== e.depthFar) &&
            ((this.depthNear = t.depthNear), (this.depthFar = t.depthFar)),
            (this.texture = i));
        }
      }
      getMesh(t) {
        if (this.texture !== null && this.mesh === null) {
          let e = t.cameras[0].viewport,
            i = new Me({
              vertexShader: ky,
              fragmentShader: zy,
              uniforms: {
                depthColor: { value: this.texture },
                depthWidth: { value: e.z },
                depthHeight: { value: e.w },
              },
            });
          this.mesh = new tt(new sn(20, 20), i);
        }
        return this.mesh;
      }
      reset() {
        ((this.texture = null), (this.mesh = null));
      }
      getDepthTexture() {
        return this.texture;
      }
    },
    $u = class extends Ai {
      constructor(t, e) {
        super();
        let i = this,
          r = null,
          s = 1,
          o = null,
          a = "local-floor",
          c = 1,
          l = null,
          h = null,
          u = null,
          d = null,
          f = null,
          p = null,
          x = typeof XRWebGLBinding < "u",
          g = new qu(),
          m = {},
          y = e.getContextAttributes(),
          E = null,
          _ = null,
          T = [],
          w = [],
          v = new st(),
          S = null,
          F = null,
          I = new Cn();
        I.viewport = new Ee();
        let N = new Cn();
        N.viewport = new Ee();
        let B = [I, N],
          X = new $c(),
          P = null,
          H = null;
        ((this.cameraAutoUpdate = !0),
          (this.enabled = !1),
          (this.isPresenting = !1),
          (this.getController = function (K) {
            let bt = T[K];
            return (bt === void 0 && ((bt = new Ls()), (T[K] = bt)), bt.getTargetRaySpace());
          }),
          (this.getControllerGrip = function (K) {
            let bt = T[K];
            return (bt === void 0 && ((bt = new Ls()), (T[K] = bt)), bt.getGripSpace());
          }),
          (this.getHand = function (K) {
            let bt = T[K];
            return (bt === void 0 && ((bt = new Ls()), (T[K] = bt)), bt.getHandSpace());
          }));
        function Y(K) {
          let bt = w.indexOf(K.inputSource);
          if (bt === -1) return;
          let Ct = T[bt];
          Ct !== void 0 &&
            (Ct.update(K.inputSource, K.frame, l || o), Ct.dispatchEvent({ type: K.type, data: K.inputSource }));
        }
        function G() {
          (r.removeEventListener("select", Y),
            r.removeEventListener("selectstart", Y),
            r.removeEventListener("selectend", Y),
            r.removeEventListener("squeeze", Y),
            r.removeEventListener("squeezestart", Y),
            r.removeEventListener("squeezeend", Y),
            r.removeEventListener("end", G),
            r.removeEventListener("inputsourceschange", ot));
          for (let K = 0; K < T.length; K++) {
            let bt = w[K];
            bt !== null && ((w[K] = null), T[K].disconnect(bt));
          }
          ((P = null), (H = null), g.reset());
          for (let K in m) delete m[K];
          if (
            (t.setRenderTarget(E),
            (f = null),
            (d = null),
            (u = null),
            (r = null),
            (_ = null),
            Ht.stop(),
            (i.isPresenting = !1),
            t.setPixelRatio(S),
            t.setSize(v.width, v.height, !1),
            F !== null)
          ) {
            let K = F.camera;
            ((K.fov = F.fov), (K.zoom = F.zoom), K.updateProjectionMatrix(), (F = null));
          }
          i.dispatchEvent({ type: "sessionend" });
        }
        ((this.setFramebufferScaleFactor = function (K) {
          ((s = K), i.isPresenting === !0 && Vt("WebXRManager: Cannot change framebuffer scale while presenting."));
        }),
          (this.setReferenceSpaceType = function (K) {
            ((a = K),
              i.isPresenting === !0 && Vt("WebXRManager: Cannot change reference space type while presenting."));
          }),
          (this.getReferenceSpace = function () {
            return l || o;
          }),
          (this.setReferenceSpace = function (K) {
            l = K;
          }),
          (this.getBaseLayer = function () {
            return d !== null ? d : f;
          }),
          (this.getBinding = function () {
            return (u === null && x && (u = new XRWebGLBinding(r, e)), u);
          }),
          (this.getFrame = function () {
            return p;
          }),
          (this.getSession = function () {
            return r;
          }),
          (this.setSession = async function (K) {
            if (((r = K), r !== null)) {
              if (
                ((E = t.getRenderTarget()),
                r.addEventListener("select", Y),
                r.addEventListener("selectstart", Y),
                r.addEventListener("selectend", Y),
                r.addEventListener("squeeze", Y),
                r.addEventListener("squeezestart", Y),
                r.addEventListener("squeezeend", Y),
                r.addEventListener("end", G),
                r.addEventListener("inputsourceschange", ot),
                y.xrCompatible !== !0 && (await e.makeXRCompatible()),
                (S = t.getPixelRatio()),
                t.getSize(v),
                x && "createProjectionLayer" in XRWebGLBinding.prototype)
              ) {
                let Ct = null,
                  Bt = null,
                  Mt = null;
                y.depth &&
                  ((Mt = y.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24),
                  (Ct = y.stencil ? tr : Yi),
                  (Bt = y.stencil ? jr : vi));
                let kt = { colorFormat: e.RGBA8, depthFormat: Mt, scaleFactor: s };
                ((u = this.getBinding()),
                  (d = u.createProjectionLayer(kt)),
                  r.updateRenderState({ layers: [d] }),
                  t.setPixelRatio(1),
                  t.setSize(d.textureWidth, d.textureHeight, !1),
                  (_ = new cn(d.textureWidth, d.textureHeight, {
                    format: xi,
                    type: Ln,
                    depthTexture: new Ki(
                      d.textureWidth,
                      d.textureHeight,
                      Bt,
                      void 0,
                      void 0,
                      void 0,
                      void 0,
                      void 0,
                      void 0,
                      Ct,
                    ),
                    stencilBuffer: y.stencil,
                    colorSpace: t.outputColorSpace,
                    samples: y.antialias ? 4 : 0,
                    resolveDepthBuffer: d.ignoreDepthValues === !1,
                    resolveStencilBuffer: d.ignoreDepthValues === !1,
                    storeMultisampledDepthBuffer: d.ignoreDepthValues === !1,
                    storeMultisampledStencilBuffer: d.ignoreDepthValues === !1,
                  })));
              } else {
                let Ct = {
                  antialias: y.antialias,
                  alpha: !0,
                  depth: y.depth,
                  stencil: y.stencil,
                  framebufferScaleFactor: s,
                };
                ((f = new XRWebGLLayer(r, e, Ct)),
                  r.updateRenderState({ baseLayer: f }),
                  t.setPixelRatio(1),
                  t.setSize(f.framebufferWidth, f.framebufferHeight, !1),
                  (_ = new cn(f.framebufferWidth, f.framebufferHeight, {
                    format: xi,
                    type: Ln,
                    colorSpace: t.outputColorSpace,
                    stencilBuffer: y.stencil,
                    resolveDepthBuffer: f.ignoreDepthValues === !1,
                    resolveStencilBuffer: f.ignoreDepthValues === !1,
                    storeMultisampledDepthBuffer: f.ignoreDepthValues === !1,
                    storeMultisampledStencilBuffer: f.ignoreDepthValues === !1,
                  })));
              }
              ((_.isXRRenderTarget = !0),
                this.setFoveation(c),
                (l = null),
                (o = await r.requestReferenceSpace(a)),
                Ht.setContext(r),
                Ht.start(),
                (i.isPresenting = !0),
                i.dispatchEvent({ type: "sessionstart" }));
            }
          }),
          (this.getEnvironmentBlendMode = function () {
            if (r !== null) return r.environmentBlendMode;
          }),
          (this.getDepthTexture = function () {
            return g.getDepthTexture();
          }));
        function ot(K) {
          for (let bt = 0; bt < K.removed.length; bt++) {
            let Ct = K.removed[bt],
              Bt = w.indexOf(Ct);
            Bt >= 0 && ((w[Bt] = null), T[Bt].disconnect(Ct));
          }
          for (let bt = 0; bt < K.added.length; bt++) {
            let Ct = K.added[bt],
              Bt = w.indexOf(Ct);
            if (Bt === -1) {
              for (let kt = 0; kt < T.length; kt++)
                if (kt >= w.length) {
                  (w.push(Ct), (Bt = kt));
                  break;
                } else if (w[kt] === null) {
                  ((w[kt] = Ct), (Bt = kt));
                  break;
                }
              if (Bt === -1) break;
            }
            let Mt = T[Bt];
            Mt && Mt.connect(Ct);
          }
        }
        function $(K, bt) {
          (bt === null ? K.matrixWorld.copy(K.matrix) : K.matrixWorld.multiplyMatrices(bt.matrixWorld, K.matrix),
            K.matrixWorldInverse.copy(K.matrixWorld).invert());
        }
        this.updateCamera = function (K) {
          if (r === null) return;
          let bt = K.near,
            Ct = K.far;
          (g.texture !== null && (g.depthNear > 0 && (bt = g.depthNear), g.depthFar > 0 && (Ct = g.depthFar)),
            (X.near = N.near = I.near = bt),
            (X.far = N.far = I.far = Ct),
            (P !== X.near || H !== X.far) &&
              (r.updateRenderState({ depthNear: X.near, depthFar: X.far }), (P = X.near), (H = X.far)),
            (X.layers.mask = K.layers.mask | 6),
            (I.layers.mask = X.layers.mask & -5),
            (N.layers.mask = X.layers.mask & -3));
          let Bt = K.parent,
            Mt = X.cameras;
          $(X, Bt);
          for (let kt = 0; kt < Mt.length; kt++) $(Mt[kt], Bt);
          (X.projectionMatrix.copy(I.projectionMatrix),
            X.projectionMatrixInverse.copy(I.projectionMatrixInverse),
            F === null && K.isPerspectiveCamera && (F = { camera: K, fov: K.fov, zoom: K.zoom }),
            nt(K, X, Bt));
        };
        function nt(K, bt, Ct) {
          (Ct === null
            ? K.matrix.copy(bt.matrixWorld)
            : (K.matrix.copy(Ct.matrixWorld), K.matrix.invert(), K.matrix.multiply(bt.matrixWorld)),
            K.matrix.decompose(K.position, K.quaternion, K.scale),
            K.updateMatrixWorld(!0),
            K.projectionMatrix.copy(bt.projectionMatrix),
            K.projectionMatrixInverse.copy(bt.projectionMatrixInverse),
            K.isPerspectiveCamera && ((K.fov = Ec * 2 * Math.atan(1 / K.projectionMatrix.elements[5])), (K.zoom = 1)));
        }
        ((this.getCamera = function () {
          return X;
        }),
          (this.getFoveation = function () {
            if (!(d === null && f === null)) return c;
          }),
          (this.setFoveation = function (K) {
            ((c = K),
              d !== null && (d.fixedFoveation = K),
              f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = K));
          }),
          (this.hasDepthSensing = function () {
            return g.texture !== null;
          }),
          (this.getDepthSensingMesh = function () {
            return g.getMesh(X);
          }),
          (this.getCameraTexture = function (K) {
            return m[K];
          }));
        let rt = null;
        function Rt(K, bt) {
          if (((h = bt.getViewerPose(l || o)), (p = bt), h !== null)) {
            let Ct = h.views;
            f !== null && (t.setRenderTargetFramebuffer(_, f.framebuffer), t.setRenderTarget(_));
            let Bt = !1;
            Ct.length !== X.cameras.length && ((X.cameras.length = 0), (Bt = !0));
            for (let Gt = 0; Gt < Ct.length; Gt++) {
              let oe = Ct[Gt],
                he = null;
              if (f !== null) he = f.getViewport(oe);
              else {
                let ft = u.getViewSubImage(d, oe);
                ((he = ft.viewport),
                  Gt === 0 &&
                    (t.setRenderTargetTextures(_, ft.colorTexture, ft.depthStencilTexture), t.setRenderTarget(_)));
              }
              let it = B[Gt];
              (it === void 0 && ((it = new Cn()), it.layers.enable(Gt), (it.viewport = new Ee()), (B[Gt] = it)),
                it.matrix.fromArray(oe.transform.matrix),
                it.matrix.decompose(it.position, it.quaternion, it.scale),
                it.projectionMatrix.fromArray(oe.projectionMatrix),
                it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),
                it.viewport.set(he.x, he.y, he.width, he.height),
                Gt === 0 && (X.matrix.copy(it.matrix), X.matrix.decompose(X.position, X.quaternion, X.scale)),
                Bt === !0 && X.cameras.push(it));
            }
            let Mt = r.enabledFeatures;
            if (Mt && Mt.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && x) {
              u = i.getBinding();
              let Gt = u.getDepthInformation(Ct[0]);
              Gt && Gt.isValid && Gt.texture && g.init(Gt, r.renderState);
            }
            if (Mt && Mt.includes("camera-access") && x) {
              (t.state.unbindTexture(), (u = i.getBinding()));
              for (let Gt = 0; Gt < Ct.length; Gt++) {
                let oe = Ct[Gt].camera;
                if (oe) {
                  let he = m[oe];
                  he || ((he = new ko()), (m[oe] = he));
                  let it = u.getCameraImage(oe);
                  he.sourceTexture = it;
                }
              }
            }
          }
          for (let Ct = 0; Ct < T.length; Ct++) {
            let Bt = w[Ct],
              Mt = T[Ct];
            Bt !== null && Mt !== void 0 && Mt.update(Bt, bt, l || o);
          }
          (rt && rt(K, bt), bt.detectedPlanes && i.dispatchEvent({ type: "planesdetected", data: bt }), (p = null));
        }
        let Ht = new jp();
        (Ht.setAnimationLoop(Rt),
          (this.setAnimationLoop = function (K) {
            rt = K;
          }),
          (this.dispose = function () {}));
      }
    },
    Hy = new le(),
    sm = new Kt();
  sm.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
  function Gy(n, t) {
    function e(g, m) {
      (g.matrixAutoUpdate === !0 && g.updateMatrix(), m.value.copy(g.matrix));
    }
    function i(g, m) {
      (m.color.getRGB(g.fogColor.value, Cu(n)),
        m.isFog
          ? ((g.fogNear.value = m.near), (g.fogFar.value = m.far))
          : m.isFogExp2 && (g.fogDensity.value = m.density));
    }
    function r(g, m, y, E, _) {
      m.isNodeMaterial
        ? (m.uniformsNeedUpdate = !1)
        : m.isMeshBasicMaterial
          ? s(g, m)
          : m.isMeshLambertMaterial
            ? (s(g, m), m.envMap && (g.envMapIntensity.value = m.envMapIntensity))
            : m.isMeshToonMaterial
              ? (s(g, m), u(g, m))
              : m.isMeshPhongMaterial
                ? (s(g, m), h(g, m), m.envMap && (g.envMapIntensity.value = m.envMapIntensity))
                : m.isMeshStandardMaterial
                  ? (s(g, m), d(g, m), m.isMeshPhysicalMaterial && f(g, m, _))
                  : m.isMeshMatcapMaterial
                    ? (s(g, m), p(g, m))
                    : m.isMeshDepthMaterial
                      ? s(g, m)
                      : m.isMeshDistanceMaterial
                        ? (s(g, m), x(g, m))
                        : m.isMeshNormalMaterial
                          ? s(g, m)
                          : m.isLineBasicMaterial
                            ? (o(g, m), m.isLineDashedMaterial && a(g, m))
                            : m.isPointsMaterial
                              ? c(g, m, y, E)
                              : m.isSpriteMaterial
                                ? l(g, m)
                                : m.isShadowMaterial
                                  ? (g.color.value.copy(m.color), (g.opacity.value = m.opacity))
                                  : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
    }
    function s(g, m) {
      ((g.opacity.value = m.opacity),
        m.color && g.diffuse.value.copy(m.color),
        m.emissive && g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),
        m.map && ((g.map.value = m.map), e(m.map, g.mapTransform)),
        m.alphaMap && ((g.alphaMap.value = m.alphaMap), e(m.alphaMap, g.alphaMapTransform)),
        m.bumpMap &&
          ((g.bumpMap.value = m.bumpMap),
          e(m.bumpMap, g.bumpMapTransform),
          (g.bumpScale.value = m.bumpScale),
          m.side === Sn && (g.bumpScale.value *= -1)),
        m.normalMap &&
          ((g.normalMap.value = m.normalMap),
          e(m.normalMap, g.normalMapTransform),
          g.normalScale.value.copy(m.normalScale),
          m.side === Sn && g.normalScale.value.negate()),
        m.displacementMap &&
          ((g.displacementMap.value = m.displacementMap),
          e(m.displacementMap, g.displacementMapTransform),
          (g.displacementScale.value = m.displacementScale),
          (g.displacementBias.value = m.displacementBias)),
        m.emissiveMap && ((g.emissiveMap.value = m.emissiveMap), e(m.emissiveMap, g.emissiveMapTransform)),
        m.specularMap && ((g.specularMap.value = m.specularMap), e(m.specularMap, g.specularMapTransform)),
        m.alphaTest > 0 && (g.alphaTest.value = m.alphaTest));
      let y = t.get(m),
        E = y.envMap,
        _ = y.envMapRotation;
      (E &&
        ((g.envMap.value = E),
        g.envMapRotation.value.setFromMatrix4(Hy.makeRotationFromEuler(_)).transpose(),
        E.isCubeTexture && E.isRenderTargetTexture === !1 && g.envMapRotation.value.premultiply(sm),
        (g.reflectivity.value = m.reflectivity),
        (g.ior.value = m.ior),
        (g.refractionRatio.value = m.refractionRatio)),
        m.lightMap &&
          ((g.lightMap.value = m.lightMap),
          (g.lightMapIntensity.value = m.lightMapIntensity),
          e(m.lightMap, g.lightMapTransform)),
        m.aoMap &&
          ((g.aoMap.value = m.aoMap), (g.aoMapIntensity.value = m.aoMapIntensity), e(m.aoMap, g.aoMapTransform)));
    }
    function o(g, m) {
      (g.diffuse.value.copy(m.color),
        (g.opacity.value = m.opacity),
        m.map && ((g.map.value = m.map), e(m.map, g.mapTransform)));
    }
    function a(g, m) {
      ((g.dashSize.value = m.dashSize), (g.totalSize.value = m.dashSize + m.gapSize), (g.scale.value = m.scale));
    }
    function c(g, m, y, E) {
      (g.diffuse.value.copy(m.color),
        (g.opacity.value = m.opacity),
        (g.size.value = m.size * y),
        (g.scale.value = E * 0.5),
        m.map && ((g.map.value = m.map), e(m.map, g.uvTransform)),
        m.alphaMap && ((g.alphaMap.value = m.alphaMap), e(m.alphaMap, g.alphaMapTransform)),
        m.alphaTest > 0 && (g.alphaTest.value = m.alphaTest));
    }
    function l(g, m) {
      (g.diffuse.value.copy(m.color),
        (g.opacity.value = m.opacity),
        (g.rotation.value = m.rotation),
        m.map && ((g.map.value = m.map), e(m.map, g.mapTransform)),
        m.alphaMap && ((g.alphaMap.value = m.alphaMap), e(m.alphaMap, g.alphaMapTransform)),
        m.alphaTest > 0 && (g.alphaTest.value = m.alphaTest));
    }
    function h(g, m) {
      (g.specular.value.copy(m.specular), (g.shininess.value = Math.max(m.shininess, 1e-4)));
    }
    function u(g, m) {
      m.gradientMap && (g.gradientMap.value = m.gradientMap);
    }
    function d(g, m) {
      ((g.metalness.value = m.metalness),
        m.metalnessMap && ((g.metalnessMap.value = m.metalnessMap), e(m.metalnessMap, g.metalnessMapTransform)),
        (g.roughness.value = m.roughness),
        m.roughnessMap && ((g.roughnessMap.value = m.roughnessMap), e(m.roughnessMap, g.roughnessMapTransform)),
        m.envMap && (g.envMapIntensity.value = m.envMapIntensity));
    }
    function f(g, m, y) {
      ((g.ior.value = m.ior),
        m.diffuseRoughness > 0 &&
          ((g.diffuseRoughness.value = m.diffuseRoughness),
          m.diffuseRoughnessMap &&
            ((g.diffuseRoughnessMap.value = m.diffuseRoughnessMap),
            e(m.diffuseRoughnessMap, g.diffuseRoughnessMapTransform))),
        m.sheen > 0 &&
          (g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),
          (g.sheenRoughness.value = m.sheenRoughness),
          m.sheenColorMap && ((g.sheenColorMap.value = m.sheenColorMap), e(m.sheenColorMap, g.sheenColorMapTransform)),
          m.sheenRoughnessMap &&
            ((g.sheenRoughnessMap.value = m.sheenRoughnessMap), e(m.sheenRoughnessMap, g.sheenRoughnessMapTransform))),
        m.clearcoat > 0 &&
          ((g.clearcoat.value = m.clearcoat),
          (g.clearcoatRoughness.value = m.clearcoatRoughness),
          m.clearcoatMap && ((g.clearcoatMap.value = m.clearcoatMap), e(m.clearcoatMap, g.clearcoatMapTransform)),
          m.clearcoatRoughnessMap &&
            ((g.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap),
            e(m.clearcoatRoughnessMap, g.clearcoatRoughnessMapTransform)),
          m.clearcoatNormalMap &&
            ((g.clearcoatNormalMap.value = m.clearcoatNormalMap),
            e(m.clearcoatNormalMap, g.clearcoatNormalMapTransform),
            g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),
            m.side === Sn && g.clearcoatNormalScale.value.negate())),
        m.dispersion > 0 && (g.dispersion.value = m.dispersion),
        m.retroreflectivity > 0 && (g.retroreflectivity.value = m.retroreflectivity),
        m.iridescence > 0 &&
          ((g.iridescence.value = m.iridescence),
          (g.iridescenceIOR.value = m.iridescenceIOR),
          (g.iridescenceThicknessMinimum.value = m.iridescenceThicknessMinimum),
          (g.iridescenceThicknessMaximum.value = m.iridescenceThicknessMaximum),
          m.iridescenceMap &&
            ((g.iridescenceMap.value = m.iridescenceMap), e(m.iridescenceMap, g.iridescenceMapTransform)),
          m.iridescenceThicknessMap &&
            ((g.iridescenceThicknessMap.value = m.iridescenceThicknessMap),
            e(m.iridescenceThicknessMap, g.iridescenceThicknessMapTransform))),
        m.transmission > 0 &&
          ((g.transmission.value = m.transmission),
          (g.transmissionSamplerMap.value = y.texture),
          g.transmissionSamplerSize.value.set(y.width, y.height),
          m.transmissionMap &&
            ((g.transmissionMap.value = m.transmissionMap), e(m.transmissionMap, g.transmissionMapTransform)),
          (g.thickness.value = m.thickness),
          m.thicknessMap && ((g.thicknessMap.value = m.thicknessMap), e(m.thicknessMap, g.thicknessMapTransform)),
          (g.attenuationDistance.value = m.attenuationDistance),
          g.attenuationColor.value.copy(m.attenuationColor)),
        m.anisotropy > 0 &&
          (g.anisotropyVector.value.set(
            m.anisotropy * Math.cos(m.anisotropyRotation),
            m.anisotropy * Math.sin(m.anisotropyRotation),
          ),
          m.anisotropyMap && ((g.anisotropyMap.value = m.anisotropyMap), e(m.anisotropyMap, g.anisotropyMapTransform))),
        (g.specularIntensity.value = m.specularIntensity),
        g.specularColor.value.copy(m.specularColor),
        m.specularColorMap &&
          ((g.specularColorMap.value = m.specularColorMap), e(m.specularColorMap, g.specularColorMapTransform)),
        m.specularIntensityMap &&
          ((g.specularIntensityMap.value = m.specularIntensityMap),
          e(m.specularIntensityMap, g.specularIntensityMapTransform)));
    }
    function p(g, m) {
      m.matcap && (g.matcap.value = m.matcap);
    }
    function x(g, m) {
      let y = t.get(m).light;
      (g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),
        (g.nearDistance.value = y.shadow.camera.near),
        (g.farDistance.value = y.shadow.camera.far));
    }
    return { refreshFogUniforms: i, refreshMaterialUniforms: r };
  }
  function Vy(n, t, e, i) {
    let r = {},
      s = {};
    function o(y, E) {
      let _ = E.program;
      i.uniformBlockBinding(y, _, r[y.id]);
    }
    function a(y, E) {
      let _ = r[y.id];
      _ === void 0 && (p(y), (_ = c(y)), (r[y.id] = _), y.addEventListener("dispose", g));
      let T = E.program;
      i.updateUBOMapping(y, T);
      let w = t.render.frame;
      s[y.id] !== w && (l(y), (s[y.id] = w));
    }
    function c(y) {
      let E = n.createBuffer(),
        _ = y.__size,
        T = y.usage;
      return (
        n.bindBuffer(n.UNIFORM_BUFFER, E),
        n.bufferData(n.UNIFORM_BUFFER, _, T),
        n.bindBuffer(n.UNIFORM_BUFFER, null),
        E
      );
    }
    function l(y) {
      let E = r[y.id],
        _ = y.uniforms,
        T = y.__cache;
      n.bindBuffer(n.UNIFORM_BUFFER, E);
      for (let w = 0, v = _.length; w < v; w++) {
        let S = _[w];
        if (Array.isArray(S)) for (let F = 0, I = S.length; F < I; F++) h(S[F], w, F, T);
        else h(S, w, 0, T);
      }
      n.bindBuffer(n.UNIFORM_BUFFER, null);
    }
    function h(y, E, _, T) {
      if (d(y, E, _, T) === !0) {
        let w = y.__offset,
          v = y.value;
        if (Array.isArray(v)) {
          let S = 0;
          for (let F = 0; F < v.length; F++) {
            let I = v[F],
              N = x(I, !0);
            (u(I, y.__data, S), (S += N.storage / Float32Array.BYTES_PER_ELEMENT));
          }
        } else u(v, y.__data, 0);
        n.bufferSubData(n.UNIFORM_BUFFER, w, y.__data);
      }
    }
    function u(y, E, _) {
      typeof y == "number" || typeof y == "boolean"
        ? (E[_] = y)
        : y.isMatrix3
          ? ((E[_] = y.elements[0]),
            (E[_ + 1] = y.elements[1]),
            (E[_ + 2] = y.elements[2]),
            (E[_ + 3] = 0),
            (E[_ + 4] = y.elements[3]),
            (E[_ + 5] = y.elements[4]),
            (E[_ + 6] = y.elements[5]),
            (E[_ + 7] = 0),
            (E[_ + 8] = y.elements[6]),
            (E[_ + 9] = y.elements[7]),
            (E[_ + 10] = y.elements[8]),
            (E[_ + 11] = 0))
          : ArrayBuffer.isView(y)
            ? E.set(y.subarray(0, E.length - _), _)
            : y.toArray(E, _);
    }
    function d(y, E, _, T) {
      let w = y.value,
        v = E + "_" + _;
      if (Array.isArray(w)) {
        T[v] === void 0 && (T[v] = []);
        let S = T[v],
          F = !1;
        for (let I = 0; I < w.length; I++) f(w[I], S, I) === !0 && (F = !0);
        return F;
      }
      return f(w, T, v);
    }
    function f(y, E, _) {
      if (E[_] === void 0)
        return (
          typeof y == "number" || typeof y == "boolean"
            ? (E[_] = y)
            : ArrayBuffer.isView(y)
              ? (E[_] = y.slice())
              : (E[_] = y.clone()),
          !0
        );
      {
        let T = E[_];
        if (typeof y == "number" || typeof y == "boolean") {
          if (T !== y) return ((E[_] = y), !0);
        } else {
          if (ArrayBuffer.isView(y)) return !0;
          if (T.equals(y) === !1) return (T.copy(y), !0);
        }
      }
      return !1;
    }
    function p(y) {
      let E = y.uniforms,
        _ = 0,
        T = 16;
      for (let v = 0, S = E.length; v < S; v++) {
        let F = Array.isArray(E[v]) ? E[v] : [E[v]];
        for (let I = 0, N = F.length; I < N; I++) {
          let B = F[I],
            X = Array.isArray(B.value) ? B.value : [B.value],
            P = Array.isArray(E[v]) || Array.isArray(B.value),
            H = _;
          for (let G = 0, ot = X.length; G < ot; G++) {
            let $ = X[G],
              nt = x($, P),
              rt = _ % T,
              Rt = rt % nt.boundary,
              Ht = rt + Rt;
            ((_ += Rt), Ht !== 0 && T - Ht < nt.storage && (_ += T - Ht), G === 0 && (H = _), (_ += nt.storage));
          }
          let Y = B.type === "int" ? Int32Array : B.type === "uint" ? Uint32Array : Float32Array;
          ((B.__data = new Y((_ - H) / Float32Array.BYTES_PER_ELEMENT)), (B.__offset = H));
        }
      }
      let w = _ % T;
      return (w > 0 && (_ += T - w), (y.__size = _), (y.__cache = {}), this);
    }
    function x(y, E) {
      let _ = { boundary: 0, storage: 0 };
      return (
        typeof y == "number" || typeof y == "boolean"
          ? ((_.boundary = 4), (_.storage = 4))
          : y.isVector2
            ? ((_.boundary = 8), (_.storage = 8))
            : y.isVector3 || y.isColor
              ? ((_.boundary = 16), (_.storage = 12))
              : y.isVector4
                ? ((_.boundary = 16), (_.storage = 16))
                : y.isMatrix3
                  ? ((_.boundary = 16), (_.storage = 48))
                  : y.isMatrix4
                    ? ((_.boundary = 16), (_.storage = 64))
                    : y.isTexture
                      ? Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group.")
                      : ArrayBuffer.isView(y)
                        ? ((_.boundary = 16), (_.storage = y.byteLength))
                        : Vt("WebGLRenderer: Unsupported uniform value type.", y),
        E === !0 && ((_.boundary = 16), (_.storage = Math.ceil(_.storage / 16) * 16)),
        _
      );
    }
    function g(y) {
      let E = y.target;
      (E.removeEventListener("dispose", g), n.deleteBuffer(r[E.id]), delete r[E.id], delete s[E.id]);
    }
    function m() {
      for (let y in r) n.deleteBuffer(r[y]);
      ((r = {}), (s = {}));
    }
    return { bind: o, update: a, dispose: m };
  }
  var Wy = new Uint16Array([
      12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882,
      14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495,
      13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596,
      14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960,
      14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344,
      14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466,
      14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957,
      14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029,
      14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569,
      14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111,
      12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902,
      10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449,
      15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343,
      14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272,
      10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883,
      9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683,
      15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800,
      8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677,
      15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688,
      7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613,
      15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552,
      6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551,
      15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398,
      5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508,
      15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133,
      4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429,
      15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808,
      3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120,
      3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360,
      1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882,
      14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183,
    ]),
    Pi = null;
  function Xy() {
    return (
      Pi === null &&
        ((Pi = new Fo(Wy, 16, 16, Sr, qn)),
        (Pi.name = "DFG_LUT"),
        (Pi.minFilter = Ne),
        (Pi.magFilter = Ne),
        (Pi.wrapS = Ti),
        (Pi.wrapT = Ti),
        (Pi.generateMipmaps = !1),
        (Pi.needsUpdate = !0)),
      Pi
    );
  }
  var kl = class {
    constructor(t = {}) {
      let {
        canvas: e = dp(),
        context: i = null,
        depth: r = !0,
        stencil: s = !1,
        alpha: o = !1,
        antialias: a = !1,
        premultipliedAlpha: c = !0,
        preserveDrawingBuffer: l = !1,
        powerPreference: h = "default",
        failIfMajorPerformanceCaveat: u = !1,
        reversedDepthBuffer: d = !1,
        outputBufferType: f = Ln,
      } = t;
      this.isWebGLRenderer = !0;
      let p;
      if (i !== null) {
        if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext)
          throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        p = i.getContextAttributes().alpha;
      } else p = o;
      let x = f,
        g = new Set([rl, il, nl]),
        m = new Set([Ln, vi, Xs, jr, Qc, tl]),
        y = new Uint32Array(4),
        E = new Int32Array(4),
        _ = { textures: [], min: [], max: [], resolution: [] },
        T = null,
        w = null,
        v = [],
        S = [],
        F = null;
      ((this.domElement = e),
        (this.debug = { checkShaderErrors: !0, diagnostics: { keywords: !1 }, onShaderError: null }),
        (this.autoClear = !0),
        (this.autoClearColor = !0),
        (this.autoClearDepth = !0),
        (this.autoClearStencil = !0),
        (this.sortObjects = !0),
        (this.clippingPlanes = []),
        (this.localClippingEnabled = !1),
        (this.toneMapping = Qn),
        (this.toneMappingExposure = 1),
        (this.transmissionResolutionScale = 1));
      let I = this,
        N = !1,
        B = null,
        X = null,
        P = null,
        H = null;
      this._outputColorSpace = Pe;
      let Y = 0,
        G = 0,
        ot = null,
        $ = -1,
        nt = null,
        rt = new Ee(),
        Rt = new Ee(),
        Ht = null,
        K = new Tt(0),
        bt = 0,
        Ct = e.width,
        Bt = e.height,
        Mt = 1,
        kt = null,
        We = null,
        Gt = new Ee(0, 0, Ct, Bt),
        oe = new Ee(0, 0, Ct, Bt),
        he = !1,
        it = new vr(),
        ft = new Rc(),
        ht = !1,
        At = !1,
        _t = new le(),
        Qt = new R(),
        Ft = new Ee(),
        ue = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 },
        de = !1;
      function be() {
        return ot === null ? Mt : 1;
      }
      let D = i;
      function en(M, L) {
        return e.getContext(M, L);
      }
      let ae, Oe, vt, Je, zt, jt, A, b, k, at, et, ut, xt, J, Z, pt, C, Q, j, mt, lt, dt, Ut;
      try {
        let M = {
          alpha: !0,
          depth: r,
          stencil: s,
          antialias: a,
          premultipliedAlpha: c,
          preserveDrawingBuffer: l,
          powerPreference: h,
          failIfMajorPerformanceCaveat: u,
        };
        if (
          ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${"187"}`),
          e.addEventListener("webglcontextlost", Ot, !1),
          e.addEventListener("webglcontextrestored", te, !1),
          e.addEventListener("webglcontextcreationerror", St, !1),
          D === null)
        ) {
          let L = "webgl2";
          if (((D = en(L, M)), D === null))
            throw en(L)
              ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.")
              : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
        }
        ie();
      } catch (M) {
        throw (
          e.removeEventListener("webglcontextlost", Ot, !1),
          e.removeEventListener("webglcontextrestored", te, !1),
          e.removeEventListener("webglcontextcreationerror", St, !1),
          qt("WebGLRenderer: " + M.message),
          M
        );
      }
      function ie() {
        ((ae = new n2(D)),
          ae.init(),
          (lt = new By(D, ae)),
          (Oe = new Xx(D, ae, t, lt)),
          (vt = new Uy(D, ae)),
          Oe.reversedDepthBuffer && d && vt.buffers.depth.setReversed(!0),
          (X = D.createFramebuffer()),
          (P = D.createFramebuffer()),
          (H = D.createFramebuffer()),
          (Je = new s2(D)),
          (zt = new My()),
          (jt = new Oy(D, ae, vt, zt, Oe, lt, Je)),
          (A = new e2(I)),
          (b = new a1(D)),
          (dt = new Vx(D, b)),
          (k = new i2(D, b, Je, dt)),
          (at = new a2(D, k, b, dt, Je)),
          (Q = new o2(D, Oe, jt)),
          (Z = new qx(zt)),
          (et = new by(I, A, ae, Oe, dt, Z)),
          (ut = new Gy(I, zt)),
          (xt = new Ey()),
          (J = new Iy(ae)),
          (C = new Gx(I, A, vt, at, p, c)),
          (pt = new Fy(I, at, Oe)),
          (Ut = new Vy(D, Je, Oe, vt)),
          (j = new Wx(D, ae, Je)),
          (mt = new r2(D, ae, Je)),
          (Je.programs = et.programs),
          (I.capabilities = Oe),
          (I.extensions = ae),
          (I.properties = zt),
          (I.renderLists = xt),
          (I.shadowMap = pt),
          (I.state = vt),
          (I.info = Je));
      }
      x !== Ln && (F = new l2(x, e.width, e.height, a, r, s));
      let ct = new $u(I, D);
      ((this.xr = ct),
        (this.getContext = function () {
          return D;
        }),
        (this.getContextAttributes = function () {
          return D.getContextAttributes();
        }),
        (this.forceContextLoss = function () {
          let M = ae.get("WEBGL_lose_context");
          M && M.loseContext();
        }),
        (this.forceContextRestore = function () {
          let M = ae.get("WEBGL_lose_context");
          M && M.restoreContext();
        }),
        (this.getPixelRatio = function () {
          return Mt;
        }),
        (this.setPixelRatio = function (M) {
          M !== void 0 && ((Mt = M), this.setSize(Ct, Bt, !1));
        }),
        (this.getSize = function (M) {
          return M.set(Ct, Bt);
        }),
        (this.setSize = function (M, L, V = !0) {
          if (ct.isPresenting) {
            Vt("WebGLRenderer: Can't change size while VR device is presenting.");
            return;
          }
          ((Ct = M),
            (Bt = L),
            (e.width = Math.floor(M * Mt)),
            (e.height = Math.floor(L * Mt)),
            V === !0 && ((e.style.width = M + "px"), (e.style.height = L + "px")),
            F !== null && F.setSize(e.width, e.height),
            this.setViewport(0, 0, M, L));
        }),
        (this.getDrawingBufferSize = function (M) {
          return M.set(Ct * Mt, Bt * Mt).floor();
        }),
        (this.setDrawingBufferSize = function (M, L, V) {
          ((Ct = M),
            (Bt = L),
            (Mt = V),
            (e.width = Math.floor(M * V)),
            (e.height = Math.floor(L * V)),
            this.setViewport(0, 0, M, L));
        }),
        (this.setEffects = function (M) {
          if (x === Ln) {
            qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
            return;
          }
          if (M) {
            for (let L = 0; L < M.length; L++)
              if (M[L].isOutputPass === !0) {
                Vt(
                  "WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.",
                );
                break;
              }
          }
          F.setEffects(M || []);
        }),
        (this.getCurrentViewport = function (M) {
          return M.copy(rt);
        }),
        (this.getViewport = function (M) {
          return M.copy(Gt);
        }),
        (this.setViewport = function (M, L, V, O) {
          (M.isVector4 ? Gt.set(M.x, M.y, M.z, M.w) : Gt.set(M, L, V, O),
            vt.viewport(rt.copy(Gt).multiplyScalar(be()).round()));
        }),
        (this.getScissor = function (M) {
          return M.copy(oe);
        }),
        (this.setScissor = function (M, L, V, O) {
          (M.isVector4 ? oe.set(M.x, M.y, M.z, M.w) : oe.set(M, L, V, O),
            vt.scissor(Rt.copy(oe).multiplyScalar(be()).round()));
        }),
        (this.getScissorTest = function () {
          return he;
        }),
        (this.setScissorTest = function (M) {
          vt.setScissorTest((he = M));
        }),
        (this.setOpaqueSort = function (M) {
          kt = M;
        }),
        (this.setTransparentSort = function (M) {
          We = M;
        }),
        (this.getClearColor = function (M) {
          return M.copy(C.getClearColor());
        }),
        (this.setClearColor = function () {
          C.setClearColor(...arguments);
        }),
        (this.getClearAlpha = function () {
          return C.getClearAlpha();
        }),
        (this.setClearAlpha = function () {
          C.setClearAlpha(...arguments);
        }),
        (this.clear = function (M = !0, L = !0, V = !0) {
          let O = 0;
          if (M) {
            let z = !1;
            if (ot !== null) {
              let yt = ot.texture.format;
              z = g.has(yt);
            }
            if (z) {
              let yt = ot.texture.type,
                Pt = m.has(yt),
                gt = C.getClearColor(),
                wt = C.getClearAlpha(),
                Nt = gt.r,
                Jt = gt.g,
                fe = gt.b;
              Pt
                ? ((y[0] = Nt), (y[1] = Jt), (y[2] = fe), (y[3] = wt), D.clearBufferuiv(D.COLOR, 0, y))
                : ((E[0] = Nt), (E[1] = Jt), (E[2] = fe), (E[3] = wt), D.clearBufferiv(D.COLOR, 0, E));
            } else O |= D.COLOR_BUFFER_BIT;
          }
          (L && ((O |= D.DEPTH_BUFFER_BIT), this.state.buffers.depth.setMask(!0)),
            V && ((O |= D.STENCIL_BUFFER_BIT), this.state.buffers.stencil.setMask(4294967295)),
            O !== 0 && D.clear(O));
        }),
        (this.clearColor = function () {
          this.clear(!0, !1, !1);
        }),
        (this.clearDepth = function () {
          this.clear(!1, !0, !1);
        }),
        (this.clearStencil = function () {
          this.clear(!1, !1, !0);
        }),
        (this.setNodesHandler = function (M) {
          (M.setRenderer(this), (B = M));
        }),
        (this.dispose = function () {
          (e.removeEventListener("webglcontextlost", Ot, !1),
            e.removeEventListener("webglcontextrestored", te, !1),
            e.removeEventListener("webglcontextcreationerror", St, !1),
            C.dispose(),
            xt.dispose(),
            J.dispose(),
            jt.dispose(),
            zt.dispose(),
            A.dispose(),
            at.dispose(),
            k.dispose(),
            dt.dispose(),
            Ut.dispose(),
            et.dispose(),
            ct.dispose(),
            ct.removeEventListener("sessionstart", Bd),
            ct.removeEventListener("sessionend", kd),
            Lr.stop());
        }));
      function Ot(M) {
        (M.preventDefault(), Ro("WebGLRenderer: Context Lost."), (N = !0));
      }
      function te() {
        (Ro("WebGLRenderer: Context Restored."), (N = !1));
        let M = Je.autoReset,
          L = pt.enabled,
          V = pt.autoUpdate,
          O = pt.needsUpdate,
          z = pt.type;
        (ie(), (Je.autoReset = M), (pt.enabled = L), (pt.autoUpdate = V), (pt.needsUpdate = O), (pt.type = z));
      }
      function St(M) {
        qt("WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
      }
      function Ie(M) {
        let L = M.target;
        (L.removeEventListener("dispose", Ie), mn(L));
      }
      function mn(M) {
        (lr(M), zt.remove(M));
      }
      function lr(M) {
        let L = zt.get(M).programs;
        L !== void 0 &&
          (L.forEach(function (V) {
            et.releaseProgram(V);
          }),
          M.isShaderMaterial && et.releaseShaderCache(M));
      }
      this.renderBufferDirect = function (M, L, V, O, z, yt) {
        L === null && (L = ue);
        let Pt = z.isMesh && z.matrixWorld.determinantAffine() < 0,
          gt = O0(M, L, V, O, z);
        vt.setMaterial(O, Pt);
        let wt = V.index,
          Nt = 1;
        if (O.wireframe === !0) {
          if (((wt = k.getWireframeAttribute(V)), wt === void 0)) return;
          Nt = 2;
        }
        let Jt = V.drawRange,
          fe = V.attributes.position,
          Lt = Jt.start * Nt,
          pe = (Jt.start + Jt.count) * Nt;
        (yt !== null && ((Lt = Math.max(Lt, yt.start * Nt)), (pe = Math.min(pe, (yt.start + yt.count) * Nt))),
          wt !== null
            ? ((Lt = Math.max(Lt, 0)), (pe = Math.min(pe, wt.count)))
            : fe != null && ((Lt = Math.max(Lt, 0)), (pe = Math.min(pe, fe.count))));
        let nn = pe - Lt;
        if (nn < 0 || nn === 1 / 0) return;
        dt.setup(z, O, gt, V, wt);
        let ze,
          Be = j;
        if ((wt !== null && ((ze = b.get(wt)), (Be = mt), Be.setIndex(ze)), z.isMesh))
          O.wireframe === !0
            ? (vt.setLineWidth(O.wireframeLinewidth * be()), Be.setMode(D.LINES))
            : Be.setMode(D.TRIANGLES);
        else if (z.isLine) {
          let wn = O.linewidth;
          (wn === void 0 && (wn = 1),
            vt.setLineWidth(wn * be()),
            z.isLineSegments ? Be.setMode(D.LINES) : z.isLineLoop ? Be.setMode(D.LINE_LOOP) : Be.setMode(D.LINE_STRIP));
        } else z.isPoints ? Be.setMode(D.POINTS) : z.isSprite && Be.setMode(D.TRIANGLES);
        if (z.isBatchedMesh)
          if (ae.get("WEBGL_multi_draw")) Be.renderMultiDraw(z._multiDrawStarts, z._multiDrawCounts, z._multiDrawCount);
          else {
            let wn = z._multiDrawStarts,
              Dt = z._multiDrawCounts,
              On = z._multiDrawCount,
              Se = wt ? b.get(wt).bytesPerElement : 1,
              Dr = zt.get(O).currentProgram.getUniforms();
            for (let Tn = 0; Tn < On; Tn++) (Dr.setValue(D, "_gl_DrawID", Tn), Be.render(wn[Tn] / Se, Dt[Tn]));
          }
        else if (z.isInstancedMesh) Be.renderInstances(Lt, nn, z.count);
        else if (V.isInstancedBufferGeometry) {
          let wn = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0,
            Dt = Math.min(V.instanceCount, wn);
          Be.renderInstances(Lt, nn, Dt);
        } else Be.render(Lt, nn);
      };
      function Od(M, L, V, O) {
        (B !== null && M.isNodeMaterial && B.setObject(O, M),
          ht === !0 && Z.setState(M, V, !1),
          M.transparent === !0 && M.side === He && M.forceSinglePass === !1
            ? ((M.side = Sn),
              (M.needsUpdate = !0),
              ho(M, L, O),
              (M.side = Ii),
              (M.needsUpdate = !0),
              ho(M, L, O),
              (M.side = He))
            : ho(M, L, O));
      }
      ((this.compile = function (M, L, V = null) {
        (V === null && (V = M),
          B !== null && B.renderStart(M, L, V),
          (w = J.get(V)),
          w.init(L),
          S.push(w),
          V.traverseVisible(function (z) {
            z.isLight && z.layers.test(L.layers) && (w.pushLight(z), z.castShadow && w.pushShadow(z));
          }),
          M !== V &&
            M.traverseVisible(function (z) {
              z.isLight && z.layers.test(L.layers) && (w.pushLight(z), z.castShadow && w.pushShadow(z));
            }),
          w.setupLights(),
          B !== null && B.updateLights(w.state.lightsArray),
          (At = this.localClippingEnabled),
          (ht = Z.init(this.clippingPlanes, At)),
          ht === !0 && Z.setGlobalState(this.clippingPlanes, L),
          B !== null && pt.render(w.state.shadowsArray, V, L));
        let O = new Set();
        return (
          M.traverse(function (z) {
            if (!(z.isMesh || z.isPoints || z.isLine || z.isSprite)) return;
            let yt = z.material;
            if (yt)
              if (Array.isArray(yt))
                for (let Pt = 0; Pt < yt.length; Pt++) {
                  let gt = yt[Pt];
                  (Od(gt, V, L, z), O.add(gt));
                }
              else (Od(yt, V, L, z), O.add(yt));
          }),
          (w = S.pop()),
          B !== null && B.renderEnd(),
          O
        );
      }),
        (this.compileAsync = function (M, L, V = null) {
          let O = this.compile(M, L, V);
          return new Promise((z) => {
            function yt() {
              if (
                (O.forEach(function (Pt) {
                  let wt = zt.get(Pt).currentProgram;
                  (wt === void 0 || wt.isReady()) && O.delete(Pt);
                }),
                O.size === 0)
              ) {
                z(M);
                return;
              }
              setTimeout(yt, 10);
            }
            ae.get("KHR_parallel_shader_compile") !== null ? yt() : setTimeout(yt, 10);
          });
        }));
      let vh = null;
      function F0(M) {
        vh && vh(M);
      }
      function Bd() {
        Lr.stop();
      }
      function kd() {
        Lr.start();
      }
      let Lr = new jp();
      (Lr.setAnimationLoop(F0),
        typeof self < "u" && Lr.setContext(self),
        (this.setAnimationLoop = function (M) {
          ((vh = M), ct.setAnimationLoop(M), M === null ? Lr.stop() : Lr.start());
        }),
        ct.addEventListener("sessionstart", Bd),
        ct.addEventListener("sessionend", kd),
        (this.render = function (M, L) {
          if (L !== void 0 && L.isCamera !== !0) {
            qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            return;
          }
          if (N === !0) return;
          B !== null && B.renderStart(M, L);
          let V = ct.enabled === !0 && ct.isPresenting === !0,
            O = F !== null && (ot === null || V) && F.begin(I, ot);
          if (
            (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(),
            L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(),
            ct.enabled === !0 &&
              ct.isPresenting === !0 &&
              (F === null || F.isCompositing() === !1) &&
              (ct.cameraAutoUpdate === !0 && ct.updateCamera(L), (L = ct.getCamera())),
            M.isScene === !0 && M.onBeforeRender(I, M, L, ot),
            (w = J.get(M, S.length)),
            w.init(L),
            (w.state.textureUnits = jt.getTextureUnits()),
            S.push(w),
            _t.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse),
            L.isArrayCamera ? ft.setFromArrayCamera(L) : it.setFromProjectionMatrix(_t, Kn, L.reversedDepth),
            (At = this.localClippingEnabled),
            (ht = Z.init(this.clippingPlanes, At)),
            (T = xt.get(M, v.length)),
            T.init(),
            v.push(T),
            this.info.render.frame++,
            ct.enabled === !0 && ct.isPresenting === !0)
          ) {
            let Pt = I.xr.getDepthSensingMesh();
            Pt !== null && xh(Pt, L, -1 / 0, I.sortObjects);
          }
          (xh(M, L, 0, I.sortObjects),
            T.finish(),
            B !== null && B.updateLights(w.state.lightsArray),
            I.sortObjects === !0 && T.sort(kt, We),
            (de = ct.enabled === !1 || ct.isPresenting === !1 || ct.hasDepthSensing() === !1),
            de && C.addToRenderList(T, M),
            this.info.autoReset === !0 && this.info.reset(),
            ht === !0 && Z.beginShadows());
          let z = w.state.shadowsArray;
          if ((pt.render(z, M, L), ht === !0 && Z.endShadows(), (O && F.hasRenderPass()) === !1)) {
            let Pt = T.opaque,
              gt = T.transmissive;
            if ((w.setupLights(), L.isArrayCamera)) {
              let wt = L.cameras;
              if (gt.length > 0)
                for (let Nt = 0, Jt = wt.length; Nt < Jt; Nt++) {
                  let fe = wt[Nt];
                  Hd(Pt, gt, M, fe);
                }
              de && C.render(M);
              for (let Nt = 0, Jt = wt.length; Nt < Jt; Nt++) {
                let fe = wt[Nt];
                zd(T, M, fe, fe.viewport);
              }
            } else (gt.length > 0 && Hd(Pt, gt, M, L), de && C.render(M), zd(T, M, L));
          }
          (ot !== null && G === 0 && (jt.updateMultisampleRenderTarget(ot), jt.updateRenderTargetMipmap(ot)),
            O && F.end(I),
            M.isScene === !0 && M.onAfterRender(I, M, L),
            dt.resetDefaultState(),
            ($ = -1),
            (nt = null),
            S.pop(),
            S.length > 0
              ? ((w = S[S.length - 1]),
                jt.setTextureUnits(w.state.textureUnits),
                ht === !0 && Z.setGlobalState(I.clippingPlanes, w.state.camera))
              : (w = null),
            v.pop(),
            v.length > 0 ? (T = v[v.length - 1]) : (T = null),
            B !== null && B.renderEnd());
        }));
      function xh(M, L, V, O) {
        if (M.visible === !1) return;
        if (M.layers.test(L.layers)) {
          if (M.isGroup) V = M.renderOrder;
          else if (M.isLOD) M.autoUpdate === !0 && M.update(L);
          else if (M.isLight) (w.pushLight(M), M.castShadow && w.pushShadow(M));
          else if (M.isSprite) {
            let Pt = L.isArrayCamera ? ft : it;
            if (!M.frustumCulled || M.intersectsFrustum(Pt)) {
              O && Ft.setFromMatrixPosition(M.matrixWorld).applyMatrix4(_t);
              let gt = at.update(M),
                wt = M.material;
              wt.visible && T.push(M, gt, wt, V, Ft.z, null, L);
            }
          } else if (M.isMesh || M.isLine || M.isPoints) {
            let Pt = L.isArrayCamera ? ft : it;
            if (!M.frustumCulled || M.intersectsFrustum(Pt)) {
              let gt = at.update(M),
                wt = M.material;
              if (
                (O &&
                  (M.boundingSphere !== void 0
                    ? (M.boundingSphere === null && M.computeBoundingSphere(), Ft.copy(M.boundingSphere.center))
                    : (gt.boundingSphere === null && gt.computeBoundingSphere(), Ft.copy(gt.boundingSphere.center)),
                  Ft.applyMatrix4(M.matrixWorld).applyMatrix4(_t)),
                Array.isArray(wt))
              ) {
                let Nt = gt.groups;
                for (let Jt = 0, fe = Nt.length; Jt < fe; Jt++) {
                  let Lt = Nt[Jt],
                    pe = wt[Lt.materialIndex];
                  pe && pe.visible && T.push(M, gt, pe, V, Ft.z, Lt, L);
                }
              } else wt.visible && T.push(M, gt, wt, V, Ft.z, null, L);
            }
          }
        }
        let yt = M.children;
        for (let Pt = 0, gt = yt.length; Pt < gt; Pt++) xh(yt[Pt], L, V, O);
      }
      function zd(M, L, V, O) {
        let { opaque: z, transmissive: yt, transparent: Pt } = M;
        (w.setupLightsView(V),
          ht === !0 && Z.setGlobalState(I.clippingPlanes, V),
          O && vt.viewport(rt.copy(O)),
          z.length > 0 && Oa(z, L, V),
          yt.length > 0 && Oa(yt, L, V),
          Pt.length > 0 && Oa(Pt, L, V),
          vt.buffers.depth.setTest(!0),
          vt.buffers.depth.setMask(!0),
          vt.buffers.color.setMask(!0),
          vt.setPolygonOffset(!1));
      }
      function Hd(M, L, V, O) {
        if ((V.isScene === !0 ? V.overrideMaterial : null) !== null) return;
        if (w.state.transmissionRenderTarget[O.id] === void 0) {
          let Lt = ae.has("EXT_color_buffer_half_float") || ae.has("EXT_color_buffer_float");
          w.state.transmissionRenderTarget[O.id] = new cn(1, 1, {
            generateMipmaps: !0,
            type: Lt ? qn : Ln,
            minFilter: Qi,
            samples: Math.max(4, Oe.samples),
            stencilBuffer: s,
            resolveDepthBuffer: !1,
            resolveStencilBuffer: !1,
            storeMultisampledDepthBuffer: !1,
            storeMultisampledStencilBuffer: !1,
            colorSpace: me.workingColorSpace,
          });
        }
        let yt = w.state.transmissionRenderTarget[O.id],
          Pt = O.viewport || rt;
        yt.setSize(Pt.z * I.transmissionResolutionScale, Pt.w * I.transmissionResolutionScale);
        let gt = I.getRenderTarget(),
          wt = I.getActiveCubeFace(),
          Nt = I.getActiveMipmapLevel();
        (I.setRenderTarget(yt),
          I.getClearColor(K),
          (bt = I.getClearAlpha()),
          bt < 1 && I.setClearColor(16777215, 0.5),
          I.clear(),
          de && C.render(V));
        let Jt = I.toneMapping;
        I.toneMapping = Qn;
        let fe = O.viewport;
        if (
          (O.viewport !== void 0 && (O.viewport = void 0),
          w.setupLightsView(O),
          ht === !0 && Z.setGlobalState(I.clippingPlanes, O),
          Oa(M, V, O),
          jt.updateMultisampleRenderTarget(yt),
          jt.updateRenderTargetMipmap(yt),
          ae.has("WEBGL_multisampled_render_to_texture") === !1)
        ) {
          let Lt = !1;
          for (let pe = 0, nn = L.length; pe < nn; pe++) {
            let ze = L[pe],
              { object: Be, geometry: wn, material: Dt, group: On } = ze;
            if (Dt.side === He && Be.layers.test(O.layers)) {
              let Se = Dt.side;
              ((Dt.side = Sn),
                (Dt.needsUpdate = !0),
                Gd(Be, V, O, wn, Dt, On),
                (Dt.side = Se),
                (Dt.needsUpdate = !0),
                (Lt = !0));
            }
          }
          Lt === !0 && (jt.updateMultisampleRenderTarget(yt), jt.updateRenderTargetMipmap(yt));
        }
        (I.setRenderTarget(gt, wt, Nt),
          I.setClearColor(K, bt),
          fe !== void 0 && (O.viewport = fe),
          (I.toneMapping = Jt));
      }
      function Oa(M, L, V) {
        let O = L.isScene === !0 ? L.overrideMaterial : null;
        for (let z = 0, yt = M.length; z < yt; z++) {
          let Pt = M[z],
            { object: gt, geometry: wt, group: Nt } = Pt,
            Jt = Pt.material;
          (Jt.allowOverride === !0 && O !== null && (Jt = O), gt.layers.test(V.layers) && Gd(gt, L, V, wt, Jt, Nt));
        }
      }
      function Gd(M, L, V, O, z, yt) {
        (B !== null && z.isNodeMaterial && B.setObject(M, z),
          M.onBeforeRender(I, L, V, O, z, yt),
          M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, M.matrixWorld),
          M.normalMatrix.getNormalMatrix(M.modelViewMatrix),
          z.onBeforeRender(I, L, V, O, M, yt),
          z.transparent === !0 && z.side === He && z.forceSinglePass === !1
            ? ((z.side = Sn),
              (z.needsUpdate = !0),
              I.renderBufferDirect(V, L, O, z, M, yt),
              (z.side = Ii),
              (z.needsUpdate = !0),
              I.renderBufferDirect(V, L, O, z, M, yt),
              (z.side = He))
            : I.renderBufferDirect(V, L, O, z, M, yt),
          M.onAfterRender(I, L, V, O, z, yt));
      }
      function Vd(M) {
        let L = 0;
        for (let V of M) V.texture !== null && L++;
        return L;
      }
      function ho(M, L, V) {
        L.isScene !== !0 && (L = ue);
        let O = zt.get(M),
          z = w.state.lights,
          yt = w.state.shadowsArray,
          Pt = z.state.version,
          gt = et.getParameters(M, z.state, yt, L, V, w.state.lightProbeGridArray),
          wt = et.getProgramCacheKey(gt),
          Nt = O.programs;
        ((O.environment =
          M.isMeshStandardMaterial || M.isMeshLambertMaterial || M.isMeshPhongMaterial ? L.environment : null),
          (O.fog = L.fog));
        let Jt =
          M.isMeshStandardMaterial || (M.isMeshLambertMaterial && !M.envMap) || (M.isMeshPhongMaterial && !M.envMap);
        ((O.envMap = A.get(M.envMap || O.environment, Jt)),
          (O.envMapRotation = O.environment !== null && M.envMap === null ? L.environmentRotation : M.envMapRotation),
          Nt === void 0 &&
            (M.addEventListener("dispose", Ie), (Nt = new Map()), (O.programs = Nt), (O.programVariants = new Map())));
        let fe = Nt.get(wt);
        if (fe !== void 0) {
          if (O.currentProgram === fe && O.lightsStateVersion === Pt) return (Xd(M, gt), fe);
        } else
          ((gt.uniforms = et.getUniforms(M)),
            B !== null && M.isNodeMaterial && B.build(M, V, gt),
            M.onBeforeCompile(gt, I),
            (fe = et.acquireProgram(gt, wt)),
            Nt.set(wt, fe),
            (O.uniforms = gt.uniforms));
        let Lt = O.uniforms;
        return (
          ((!M.isShaderMaterial && !M.isRawShaderMaterial) || M.clipping === !0) && (Lt.clippingPlanes = Z.uniform),
          Xd(M, gt),
          (O.needsLights = k0(M)),
          (O.lightsStateVersion = Pt),
          O.needsLights &&
            ((Lt.ambientLightColor.value = z.state.ambient),
            (Lt.lightProbe.value = z.state.probe),
            (Lt.sunLights.value = z.state.sun),
            (Lt.sunLightShadows.value = z.state.sunShadow),
            (Lt.directionalLights.value = z.state.directional),
            (Lt.directionalLightShadows.value = z.state.directionalShadow),
            (Lt.spotLights.value = z.state.spot),
            (Lt.spotLightShadows.value = z.state.spotShadow),
            (Lt.rectAreaLights.value = z.state.rectArea),
            (Lt.ltc_1.value = z.state.rectAreaLTC1),
            (Lt.ltc_2.value = z.state.rectAreaLTC2),
            (Lt.pointLights.value = z.state.point),
            (Lt.pointLightShadows.value = z.state.pointShadow),
            (Lt.hemisphereLights.value = z.state.hemi),
            (Lt.sunShadowMatrix.value = z.state.sunShadowMatrix),
            (Lt.sunShadowCascade.value = z.state.sunShadowCascade),
            (Lt.directionalShadowMatrix.value = z.state.directionalShadowMatrix),
            (Lt.spotLightMatrix.value = z.state.spotLightMatrix),
            (Lt.spotLightMap.value = z.state.spotLightMap),
            (Lt.pointShadowMatrix.value = z.state.pointShadowMatrix)),
          (O.numLightProbeGrids = Vd(w.state.lightProbeGridArray)),
          (O.currentProgram = fe),
          (O.uniformsList = null),
          fe
        );
      }
      function U0(M, L, V, O, z) {
        let yt = zt.get(M),
          Pt = yt.currentProgram.id + "," + O + "," + z,
          gt = yt.programVariants.get(Pt);
        return (
          gt === void 0
            ? ((gt = ho(M, L, V)), yt.programVariants.set(Pt, gt))
            : ((yt.currentProgram = gt), (yt.uniformsList = null), (yt.outputColorSpace = O), (yt.toneMapping = z)),
          gt
        );
      }
      function Wd(M) {
        if (M.uniformsList === null) {
          let L = M.currentProgram.getUniforms();
          M.uniformsList = qs.seqWithValue(L.seq, M.uniforms);
        }
        return M.uniformsList;
      }
      function Xd(M, L) {
        let V = zt.get(M);
        ((V.outputColorSpace = L.outputColorSpace),
          (V.batching = L.batching),
          (V.batchingColor = L.batchingColor),
          (V.instancing = L.instancing),
          (V.instancingColor = L.instancingColor),
          (V.instancingMorph = L.instancingMorph),
          (V.skinning = L.skinning),
          (V.morphTargets = L.morphTargets),
          (V.morphNormals = L.morphNormals),
          (V.morphColors = L.morphColors),
          (V.morphTargetsCount = L.morphTargetsCount),
          (V.numClippingPlanes = L.numClippingPlanes),
          (V.numIntersection = L.numClipIntersection),
          (V.vertexAlphas = L.vertexAlphas),
          (V.vertexTangents = L.vertexTangents),
          (V.toneMapping = L.toneMapping));
      }
      function O0(M, L, V, O, z) {
        (L.isScene !== !0 && (L = ue), jt.resetTextureUnits());
        let yt = L.fog,
          Pt = O.isMeshStandardMaterial || O.isMeshLambertMaterial || O.isMeshPhongMaterial ? L.environment : null,
          gt =
            ot === null
              ? I.outputColorSpace
              : ot.isXRRenderTarget === !0
                ? ot.texture.colorSpace
                : me.workingColorSpace,
          wt =
            O.isMeshStandardMaterial || (O.isMeshLambertMaterial && !O.envMap) || (O.isMeshPhongMaterial && !O.envMap),
          Nt = A.get(O.envMap || Pt, wt),
          Jt = O.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4,
          fe = !!V.attributes.tangent && (!!O.normalMap || O.anisotropy > 0),
          Lt = !!V.morphAttributes.position,
          pe = !!V.morphAttributes.normal,
          nn = !!V.morphAttributes.color,
          ze = Qn;
        O.toneMapped && (ot === null || ot.isXRRenderTarget === !0) && (ze = I.toneMapping);
        let Be = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color,
          wn = Be !== void 0 ? Be.length : 0,
          Dt = zt.get(O),
          On = w.state.lights;
        if (ht === !0 && (At === !0 || M !== nt)) {
          let Ye = M === nt && O.id === $;
          Z.setState(O, M, Ye);
        }
        let Se = !1,
          Dr = !1;
        O.version === Dt.__version
          ? (Dt.needsLights && Dt.lightsStateVersion !== On.state.version) ||
            (z.isBatchedMesh && Dt.batching === !1) ||
            (!z.isBatchedMesh && Dt.batching === !0) ||
            (z.isBatchedMesh && Dt.batchingColor === !0 && z._colorsTexture === null) ||
            (z.isBatchedMesh && Dt.batchingColor === !1 && z._colorsTexture !== null) ||
            (z.isInstancedMesh && Dt.instancing === !1) ||
            (!z.isInstancedMesh && Dt.instancing === !0) ||
            (z.isSkinnedMesh && Dt.skinning === !1) ||
            (!z.isSkinnedMesh && Dt.skinning === !0) ||
            (z.isInstancedMesh && Dt.instancingColor === !0 && z.instanceColor === null) ||
            (z.isInstancedMesh && Dt.instancingColor === !1 && z.instanceColor !== null) ||
            (z.isInstancedMesh && Dt.instancingMorph === !0 && z.morphTexture === null) ||
            (z.isInstancedMesh && Dt.instancingMorph === !1 && z.morphTexture !== null) ||
            Dt.envMap !== Nt ||
            (O.fog === !0 && Dt.fog !== yt) ||
            (Dt.numClippingPlanes !== void 0 &&
              (Dt.numClippingPlanes !== Z.numPlanes || Dt.numIntersection !== Z.numIntersection)) ||
            Dt.vertexAlphas !== Jt ||
            Dt.vertexTangents !== fe ||
            Dt.morphTargets !== Lt ||
            Dt.morphNormals !== pe ||
            Dt.morphColors !== nn ||
            Dt.morphTargetsCount !== wn ||
            Dt.numLightProbeGrids !== Vd(w.state.lightProbeGridArray)
            ? (Se = !0)
            : (Dt.outputColorSpace !== gt || Dt.toneMapping !== ze) && (Dr = !0)
          : ((Se = !0), (Dt.__version = O.version));
        let Tn = Dt.currentProgram;
        (Se === !0 || Dr === !0) &&
          ((Tn = Dr === !0 ? U0(O, L, z, gt, ze) : ho(O, L, z)), B && O.isNodeMaterial && B.onUpdateProgram(O, Tn, Dt));
        let Ba = !1,
          hr = !1,
          Nr = !1,
          xe = Tn.getUniforms(),
          Mn = Dt.uniforms;
        if (
          (vt.useProgram(Tn.program) && ((Ba = !0), (hr = !0), (Nr = !0)),
          O.id !== $ && (($ = O.id), (hr = !0)),
          Ba || nt !== M)
        ) {
          (vt.buffers.depth.getReversed() &&
            M.reversedDepth !== !0 &&
            ((M._reversedDepth = !0), M.updateProjectionMatrix()),
            xe.setValue(D, "projectionMatrix", M.projectionMatrix),
            xe.setValue(D, "viewMatrix", M.matrixWorldInverse));
          let gn = xe.map.cameraPosition;
          (gn !== void 0 && gn.setValue(D, Qt.setFromMatrixPosition(M.matrixWorld)),
            Oe.logarithmicDepthBuffer && xe.setValue(D, "logDepthBufFC", 2 / (Math.log(M.far + 1) / Math.LN2)),
            (O.isMeshPhongMaterial ||
              O.isMeshToonMaterial ||
              O.isMeshLambertMaterial ||
              O.isMeshBasicMaterial ||
              O.isMeshStandardMaterial ||
              O.isShaderMaterial) &&
              xe.setValue(D, "isOrthographic", M.isOrthographicCamera === !0),
            nt !== M && ((nt = M), (hr = !0), (Nr = !0)));
        }
        if (
          (Dt.needsLights &&
            (On.state.sunShadowMap.length > 0 && xe.setValue(D, "sunShadowMap", On.state.sunShadowMap, jt),
            On.state.directionalShadowMap.length > 0 &&
              xe.setValue(D, "directionalShadowMap", On.state.directionalShadowMap, jt),
            On.state.spotShadowMap.length > 0 && xe.setValue(D, "spotShadowMap", On.state.spotShadowMap, jt),
            On.state.pointShadowMap.length > 0 && xe.setValue(D, "pointShadowMap", On.state.pointShadowMap, jt)),
          z.isSkinnedMesh)
        ) {
          (xe.setOptional(D, z, "bindMatrix"), xe.setOptional(D, z, "bindMatrixInverse"));
          let Ye = z.skeleton;
          Ye && (Ye.boneTexture === null && Ye.computeBoneTexture(), xe.setValue(D, "boneTexture", Ye.boneTexture, jt));
        }
        z.isBatchedMesh &&
          (xe.setOptional(D, z, "batchingTexture"),
          xe.setValue(D, "batchingTexture", z._matricesTexture, jt),
          xe.setOptional(D, z, "batchingIdTexture"),
          xe.setValue(D, "batchingIdTexture", z._indirectTexture, jt),
          xe.setOptional(D, z, "batchingColorTexture"),
          z._colorsTexture !== null && xe.setValue(D, "batchingColorTexture", z._colorsTexture, jt));
        let ui = V.morphAttributes;
        if (
          ((ui.position !== void 0 || ui.normal !== void 0 || ui.color !== void 0) && Q.update(z, V, Tn),
          (hr || Dt.receiveShadow !== z.receiveShadow) &&
            ((Dt.receiveShadow = z.receiveShadow), xe.setValue(D, "receiveShadow", z.receiveShadow)),
          (O.isMeshStandardMaterial || O.isMeshLambertMaterial || O.isMeshPhongMaterial) &&
            O.envMap === null &&
            L.environment !== null &&
            (Mn.envMapIntensity.value = L.environmentIntensity),
          Mn.dfgLUT !== void 0 && (Mn.dfgLUT.value = Xy()),
          hr)
        ) {
          if (
            (xe.setValue(D, "toneMappingExposure", I.toneMappingExposure),
            Dt.needsLights && B0(Mn, Nr),
            yt && O.fog === !0 && ut.refreshFogUniforms(Mn, yt),
            ut.refreshMaterialUniforms(Mn, O, Mt, Bt, w.state.transmissionRenderTarget[M.id]),
            Dt.needsLights && Dt.numLightProbeGrids > 0)
          ) {
            let Ye = _,
              gn = 0;
            for (let zi of w.state.lightProbeGridArray)
              zi.texture !== null &&
                ((Ye.textures[gn] = zi.texture),
                (Ye.min[gn] = zi.boundingBox.min),
                (Ye.max[gn] = zi.boundingBox.max),
                (Ye.resolution[gn] = zi.resolution),
                gn++);
            for (let zi in Ye) Ye[zi].length = gn;
            ((Mn.probesSH.value = Ye.textures),
              (Mn.probesMin.value = Ye.min),
              (Mn.probesMax.value = Ye.max),
              (Mn.probesResolution.value = Ye.resolution));
          }
          qs.upload(D, Wd(Dt), Mn, jt);
        }
        if (
          (O.isShaderMaterial &&
            O.uniformsNeedUpdate === !0 &&
            (qs.upload(D, Wd(Dt), Mn, jt), (O.uniformsNeedUpdate = !1)),
          O.isSpriteMaterial && xe.setValue(D, "center", z.center),
          xe.setValue(D, "modelViewMatrix", z.modelViewMatrix),
          xe.setValue(D, "normalMatrix", z.normalMatrix),
          xe.setValue(D, "modelMatrix", z.matrixWorld),
          O.uniformsGroups !== void 0)
        ) {
          let Ye = O.uniformsGroups;
          for (let gn = 0, zi = Ye.length; gn < zi; gn++) {
            let $d = Ye[gn];
            (Ut.update($d, Tn), Ut.bind($d, Tn));
          }
        }
        return Tn;
      }
      function B0(M, L) {
        ((M.ambientLightColor.needsUpdate = L),
          (M.lightProbe.needsUpdate = L),
          (M.sunLights.needsUpdate = L),
          (M.sunLightShadows.needsUpdate = L),
          (M.directionalLights.needsUpdate = L),
          (M.directionalLightShadows.needsUpdate = L),
          (M.pointLights.needsUpdate = L),
          (M.pointLightShadows.needsUpdate = L),
          (M.spotLights.needsUpdate = L),
          (M.spotLightShadows.needsUpdate = L),
          (M.rectAreaLights.needsUpdate = L),
          (M.hemisphereLights.needsUpdate = L));
      }
      function k0(M) {
        return (
          M.isMeshLambertMaterial ||
          M.isMeshToonMaterial ||
          M.isMeshPhongMaterial ||
          M.isMeshStandardMaterial ||
          M.isShadowMaterial ||
          (M.isShaderMaterial && M.lights === !0)
        );
      }
      ((this.getActiveCubeFace = function () {
        return Y;
      }),
        (this.getActiveMipmapLevel = function () {
          return G;
        }),
        (this.getRenderTarget = function () {
          return ot;
        }),
        (this.setRenderTargetTextures = function (M, L, V) {
          let O = zt.get(M);
          ((O.__autoAllocateDepthBuffer = M.resolveDepthBuffer === !1),
            O.__autoAllocateDepthBuffer === !1 && (O.__useRenderToTexture = !1),
            (zt.get(M.texture).__webglTexture = L),
            (zt.get(M.depthTexture).__webglTexture = O.__autoAllocateDepthBuffer ? void 0 : V),
            (O.__hasExternalTextures = !0));
        }),
        (this.setRenderTargetFramebuffer = function (M, L) {
          let V = zt.get(M);
          ((V.__webglFramebuffer = L), (V.__useDefaultFramebuffer = L === void 0));
        }),
        (this.setRenderTarget = function (M, L = 0, V = 0) {
          ((ot = M), (Y = L), (G = V));
          let O = null,
            z = !1,
            yt = !1;
          if (M) {
            let gt = zt.get(M);
            if (gt.__useDefaultFramebuffer !== void 0) {
              (vt.bindFramebuffer(D.FRAMEBUFFER, gt.__webglFramebuffer),
                rt.copy(M.viewport),
                Rt.copy(M.scissor),
                (Ht = M.scissorTest),
                vt.viewport(rt),
                vt.scissor(Rt),
                vt.setScissorTest(Ht),
                ($ = -1));
              return;
            } else if (gt.__webglFramebuffer === void 0) jt.setupRenderTarget(M);
            else if (gt.__hasExternalTextures)
              jt.rebindTextures(M, zt.get(M.texture).__webglTexture, zt.get(M.depthTexture).__webglTexture);
            else if (M.depthBuffer) {
              let Jt = M.depthTexture;
              if (gt.__boundDepthTexture !== Jt) {
                if (Jt !== null && zt.has(Jt) && (M.width !== Jt.image.width || M.height !== Jt.image.height))
                  throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
                jt.setupDepthRenderbuffer(M);
              }
            }
            let wt = M.texture;
            (wt.isData3DTexture || wt.isDataArrayTexture || wt.isCompressedArrayTexture) && (yt = !0);
            let Nt = zt.get(M).__webglFramebuffer;
            (M.isWebGLCubeRenderTarget
              ? (Array.isArray(Nt[L]) ? (O = Nt[L][V]) : (O = Nt[L]), (z = !0))
              : M.samples > 0 && jt.useMultisampledRTT(M) === !1
                ? (O = zt.get(M).__webglMultisampledFramebuffer)
                : Array.isArray(Nt)
                  ? (O = Nt[V])
                  : (O = Nt),
              rt.copy(M.viewport),
              Rt.copy(M.scissor),
              (Ht = M.scissorTest));
          } else (rt.copy(Gt).multiplyScalar(Mt).floor(), Rt.copy(oe).multiplyScalar(Mt).floor(), (Ht = he));
          if (
            (V !== 0 && (O = X),
            vt.bindFramebuffer(D.FRAMEBUFFER, O) && vt.drawBuffers(M, O),
            vt.viewport(rt),
            vt.scissor(Rt),
            vt.setScissorTest(Ht),
            z)
          ) {
            let gt = zt.get(M.texture);
            D.framebufferTexture2D(
              D.FRAMEBUFFER,
              D.COLOR_ATTACHMENT0,
              D.TEXTURE_CUBE_MAP_POSITIVE_X + L,
              gt.__webglTexture,
              V,
            );
          } else if (yt) {
            let gt = L;
            for (let wt = 0; wt < M.textures.length; wt++) {
              let Nt = zt.get(M.textures[wt]);
              D.framebufferTextureLayer(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0 + wt, Nt.__webglTexture, V, gt);
            }
          } else if (M !== null && V !== 0) {
            let gt = zt.get(M.texture);
            D.framebufferTexture2D(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, gt.__webglTexture, V);
          }
          $ = -1;
        }));
      function qd(M) {
        let L = zt.get(M);
        return (
          (L.__readFormat !== M.format || L.__readType !== M.type) &&
            ((L.__readFormat = M.format),
            (L.__readType = M.type),
            (L.__formatReadable = Oe.textureFormatReadable(M.format)),
            (L.__typeReadable = Oe.textureTypeReadable(M.type))),
          L
        );
      }
      ((this.readRenderTargetPixels = function (M, L, V, O, z, yt, Pt, gt = 0) {
        if (!(M && M.isWebGLRenderTarget)) {
          qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          return;
        }
        let wt = zt.get(M).__webglFramebuffer;
        if ((M.isWebGLCubeRenderTarget && Pt !== void 0 && ((wt = wt[Pt]), Array.isArray(wt) && (wt = wt[0])), wt)) {
          vt.bindFramebuffer(D.FRAMEBUFFER, wt);
          try {
            let Nt = M.textures[gt],
              Jt = Nt.format,
              fe = Nt.type;
            M.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + gt);
            let Lt = qd(Nt);
            if (Lt.__formatReadable === !1) {
              qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              return;
            }
            if (Lt.__typeReadable === !1) {
              qt(
                "WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
              return;
            }
            L >= 0 &&
              L <= M.width - O &&
              V >= 0 &&
              V <= M.height - z &&
              D.readPixels(L, V, O, z, lt.convert(Jt), lt.convert(fe), yt);
          } finally {
            let Nt = ot !== null ? zt.get(ot).__webglFramebuffer : null;
            vt.bindFramebuffer(D.FRAMEBUFFER, Nt);
          }
        }
      }),
        (this.readRenderTargetPixelsAsync = async function (M, L, V, O, z, yt, Pt, gt = 0) {
          if (!(M && M.isWebGLRenderTarget))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          let wt = zt.get(M).__webglFramebuffer;
          if ((M.isWebGLCubeRenderTarget && Pt !== void 0 && ((wt = wt[Pt]), Array.isArray(wt) && (wt = wt[0])), wt))
            if (L >= 0 && L <= M.width - O && V >= 0 && V <= M.height - z) {
              vt.bindFramebuffer(D.FRAMEBUFFER, wt);
              let Nt = M.textures[gt],
                Jt = Nt.format,
                fe = Nt.type;
              M.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + gt);
              let Lt = qd(Nt);
              if (Lt.__formatReadable === !1)
                throw new Error(
                  "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.",
                );
              if (Lt.__typeReadable === !1)
                throw new Error(
                  "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.",
                );
              let pe = D.createBuffer();
              (D.bindBuffer(D.PIXEL_PACK_BUFFER, pe),
                D.bufferData(D.PIXEL_PACK_BUFFER, yt.byteLength, D.STREAM_READ),
                D.readPixels(L, V, O, z, lt.convert(Jt), lt.convert(fe), 0),
                D.bindBuffer(D.PIXEL_PACK_BUFFER, null));
              let nn = ot !== null ? zt.get(ot).__webglFramebuffer : null;
              vt.bindFramebuffer(D.FRAMEBUFFER, nn);
              let ze = D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE, 0);
              return (
                D.flush(),
                await pp(D, ze, 4),
                D.bindBuffer(D.PIXEL_PACK_BUFFER, pe),
                D.getBufferSubData(D.PIXEL_PACK_BUFFER, 0, yt),
                D.bindBuffer(D.PIXEL_PACK_BUFFER, null),
                D.deleteBuffer(pe),
                D.deleteSync(ze),
                yt
              );
            } else
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.",
              );
        }),
        (this.copyFramebufferToTexture = function (M, L = null, V = 0) {
          let O = Math.pow(2, -V),
            z = Math.floor(M.image.width * O),
            yt = Math.floor(M.image.height * O),
            Pt = L !== null ? L.x : 0,
            gt = L !== null ? L.y : 0;
          (jt.setTexture2D(M, 0), D.copyTexSubImage2D(D.TEXTURE_2D, V, 0, 0, Pt, gt, z, yt), vt.unbindTexture());
        }),
        (this.copyTextureToTexture = function (M, L, V = null, O = null, z = 0, yt = 0) {
          let Pt,
            gt,
            wt,
            Nt,
            Jt,
            fe,
            Lt,
            pe,
            nn,
            ze = M.isCompressedTexture ? M.mipmaps[yt] : M.image;
          if (V !== null)
            ((Pt = V.max.x - V.min.x),
              (gt = V.max.y - V.min.y),
              (wt = V.isBox3 ? V.max.z - V.min.z : 1),
              (Nt = V.min.x),
              (Jt = V.min.y),
              (fe = V.isBox3 ? V.min.z : 0));
          else {
            let xe = Math.pow(2, -z);
            ((Pt = Math.floor(ze.width * xe)),
              (gt = Math.floor(ze.height * xe)),
              M.isDataArrayTexture ? (wt = ze.depth) : M.isData3DTexture ? (wt = Math.floor(ze.depth * xe)) : (wt = 1),
              (Nt = 0),
              (Jt = 0),
              (fe = 0));
          }
          O !== null ? ((Lt = O.x), (pe = O.y), (nn = O.z)) : ((Lt = 0), (pe = 0), (nn = 0));
          let Be = lt.convert(L.format),
            wn = lt.convert(L.type),
            Dt;
          (L.isData3DTexture
            ? (jt.setTexture3D(L, 0), (Dt = D.TEXTURE_3D))
            : L.isDataArrayTexture || L.isCompressedArrayTexture
              ? (jt.setTexture2DArray(L, 0), (Dt = D.TEXTURE_2D_ARRAY))
              : (jt.setTexture2D(L, 0), (Dt = D.TEXTURE_2D)),
            vt.activeTexture(D.TEXTURE0),
            vt.pixelStorei(D.UNPACK_FLIP_Y_WEBGL, L.flipY),
            vt.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha),
            vt.pixelStorei(D.UNPACK_ALIGNMENT, L.unpackAlignment));
          let On = vt.getParameter(D.UNPACK_ROW_LENGTH),
            Se = vt.getParameter(D.UNPACK_IMAGE_HEIGHT),
            Dr = vt.getParameter(D.UNPACK_SKIP_PIXELS),
            Tn = vt.getParameter(D.UNPACK_SKIP_ROWS),
            Ba = vt.getParameter(D.UNPACK_SKIP_IMAGES);
          (vt.pixelStorei(D.UNPACK_ROW_LENGTH, ze.width),
            vt.pixelStorei(D.UNPACK_IMAGE_HEIGHT, ze.height),
            vt.pixelStorei(D.UNPACK_SKIP_PIXELS, Nt),
            vt.pixelStorei(D.UNPACK_SKIP_ROWS, Jt),
            vt.pixelStorei(D.UNPACK_SKIP_IMAGES, fe));
          let hr = M.isDataArrayTexture || M.isData3DTexture,
            Nr = L.isDataArrayTexture || L.isData3DTexture;
          if (M.isDepthTexture) {
            let xe = zt.get(M),
              Mn = zt.get(L),
              ui = zt.get(xe.__renderTarget),
              Ye = zt.get(Mn.__renderTarget);
            (vt.bindFramebuffer(D.READ_FRAMEBUFFER, ui.__webglFramebuffer),
              vt.bindFramebuffer(D.DRAW_FRAMEBUFFER, Ye.__webglFramebuffer));
            for (let gn = 0; gn < wt; gn++)
              (hr &&
                (D.framebufferTextureLayer(
                  D.READ_FRAMEBUFFER,
                  D.COLOR_ATTACHMENT0,
                  zt.get(M).__webglTexture,
                  z,
                  fe + gn,
                ),
                D.framebufferTextureLayer(
                  D.DRAW_FRAMEBUFFER,
                  D.COLOR_ATTACHMENT0,
                  zt.get(L).__webglTexture,
                  yt,
                  nn + gn,
                )),
                D.blitFramebuffer(Nt, Jt, Nt + Pt, Jt + gt, Lt, pe, Lt + Pt, pe + gt, D.DEPTH_BUFFER_BIT, D.NEAREST));
            (vt.bindFramebuffer(D.READ_FRAMEBUFFER, null), vt.bindFramebuffer(D.DRAW_FRAMEBUFFER, null));
          } else if (z !== 0 || M.isRenderTargetTexture || zt.has(M)) {
            let xe = zt.get(M),
              Mn = zt.get(L);
            (vt.bindFramebuffer(D.READ_FRAMEBUFFER, P), vt.bindFramebuffer(D.DRAW_FRAMEBUFFER, H));
            for (let ui = 0; ui < wt; ui++)
              (hr
                ? D.framebufferTextureLayer(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, xe.__webglTexture, z, fe + ui)
                : D.framebufferTexture2D(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, xe.__webglTexture, z),
                Nr
                  ? D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, Mn.__webglTexture, yt, nn + ui)
                  : D.framebufferTexture2D(
                      D.DRAW_FRAMEBUFFER,
                      D.COLOR_ATTACHMENT0,
                      D.TEXTURE_2D,
                      Mn.__webglTexture,
                      yt,
                    ),
                z !== 0
                  ? D.blitFramebuffer(Nt, Jt, Nt + Pt, Jt + gt, Lt, pe, Lt + Pt, pe + gt, D.COLOR_BUFFER_BIT, D.NEAREST)
                  : Nr
                    ? D.copyTexSubImage3D(Dt, yt, Lt, pe, nn + ui, Nt, Jt, Pt, gt)
                    : D.copyTexSubImage2D(Dt, yt, Lt, pe, Nt, Jt, Pt, gt));
            (vt.bindFramebuffer(D.READ_FRAMEBUFFER, null), vt.bindFramebuffer(D.DRAW_FRAMEBUFFER, null));
          } else
            Nr
              ? M.isDataTexture || M.isData3DTexture
                ? D.texSubImage3D(Dt, yt, Lt, pe, nn, Pt, gt, wt, Be, wn, ze.data)
                : L.isCompressedArrayTexture
                  ? D.compressedTexSubImage3D(Dt, yt, Lt, pe, nn, Pt, gt, wt, Be, ze.data)
                  : D.texSubImage3D(Dt, yt, Lt, pe, nn, Pt, gt, wt, Be, wn, ze)
              : M.isDataTexture
                ? D.texSubImage2D(D.TEXTURE_2D, yt, Lt, pe, Pt, gt, Be, wn, ze.data)
                : M.isCompressedTexture
                  ? D.compressedTexSubImage2D(D.TEXTURE_2D, yt, Lt, pe, ze.width, ze.height, Be, ze.data)
                  : D.texSubImage2D(D.TEXTURE_2D, yt, Lt, pe, Pt, gt, Be, wn, ze);
          (vt.pixelStorei(D.UNPACK_ROW_LENGTH, On),
            vt.pixelStorei(D.UNPACK_IMAGE_HEIGHT, Se),
            vt.pixelStorei(D.UNPACK_SKIP_PIXELS, Dr),
            vt.pixelStorei(D.UNPACK_SKIP_ROWS, Tn),
            vt.pixelStorei(D.UNPACK_SKIP_IMAGES, Ba),
            yt === 0 && L.generateMipmaps === !0 && L.mipmapsAutoUpdate === !0 && D.generateMipmap(Dt),
            vt.unbindTexture());
        }),
        (this.initRenderTarget = function (M) {
          zt.get(M).__webglFramebuffer === void 0 && jt.setupRenderTarget(M);
        }),
        (this.initTexture = function (M) {
          (M.isCubeTexture
            ? jt.setTextureCube(M, 0)
            : M.isData3DTexture
              ? jt.setTexture3D(M, 0)
              : M.isDataArrayTexture || M.isCompressedArrayTexture
                ? jt.setTexture2DArray(M, 0)
                : jt.setTexture2D(M, 0),
            vt.unbindTexture());
        }),
        (this.resetState = function () {
          ((Y = 0), (G = 0), (ot = null), vt.reset(), dt.reset());
        }),
        typeof __THREE_DEVTOOLS__ < "u" &&
          __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
    }
    get coordinateSystem() {
      return Kn;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(t) {
      this._outputColorSpace = t;
      let e = this.getContext();
      ((e.drawingBufferColorSpace = me._getDrawingBufferColorSpace(t)),
        (e.unpackColorSpace = me._getUnpackColorSpace()));
    }
  };
