import { n as o$1 } from "./p-ZjP4CjeZ-BnW-oeAv.js";
import { x as y } from "./p-DUE1XLJD-BCcYFSsH.js";
//#region node_modules/@ionic/core/components/p-DNT7yQ4z.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var o = (o) => {
	if (void 0 === o$1) return;
	let s, p, u, l = 0;
	const d = o.getBoolean("animated", !0) && o.getBoolean("rippleEffect", !0), v = /* @__PURE__ */ new WeakMap(), m = () => {
		u && clearTimeout(u), u = void 0, s && (D(!1), s = void 0);
	}, w = (t, o) => {
		if (t && t === s) return;
		u && clearTimeout(u), u = void 0;
		const { x: i, y: r } = y(o);
		if (s) {
			if (v.has(s)) throw new Error("internal error");
			s.classList.contains(a) || T(s, i, r), D(!0);
		}
		if (t) {
			const e = v.get(t);
			e && (clearTimeout(e), v.delete(t)), t.classList.remove(a);
			const o = () => {
				T(t, i, r), u = void 0;
			};
			n(t) ? o() : u = setTimeout(o, c);
		}
		s = t;
	}, T = (t, e, o) => {
		if (l = Date.now(), t.classList.add(a), !d) return;
		const i = r(t);
		null !== i && (j(), p = i.addRipple(e, o));
	}, j = () => {
		void 0 !== p && (p.then(((t) => t())), p = void 0);
	}, D = (t) => {
		j();
		const e = s;
		if (!e) return;
		const o = f - Date.now() + l;
		if (t && o > 0 && !n(e)) {
			const t = setTimeout((() => {
				e.classList.remove(a), v.delete(e);
			}), f);
			v.set(e, t);
		} else e.classList.remove(a);
	};
	o$1.addEventListener("ionGestureCaptured", m), o$1.addEventListener("pointerdown", ((t) => {
		s || 2 === t.button || w(i(t), t);
	}), !0), o$1.addEventListener("pointerup", ((t) => {
		w(void 0, t);
	}), !0), o$1.addEventListener("pointercancel", m, !0);
};
var i = (t) => {
	if (void 0 === t.composedPath) return t.target.closest(".ion-activatable");
	{
		const e = t.composedPath();
		for (let t = 0; t < e.length - 2; t++) {
			const o = e[t];
			if (!(o instanceof ShadowRoot) && o.classList.contains("ion-activatable")) return o;
		}
	}
};
var n = (t) => t.classList.contains("ion-activatable-instant");
var r = (t) => {
	if (t.shadowRoot) {
		const e = t.shadowRoot.querySelector("ion-ripple-effect");
		if (e) return e;
	}
	return t.querySelector("ion-ripple-effect");
};
var a = "ion-activated";
var c = 100;
var f = 150;
//#endregion
export { o as startTapClick };
