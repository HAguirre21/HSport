import { m as h$1 } from "./p-BoK0Zxin-Ci9S2m7d.js";
import { d as n$1 } from "./p-DUE1XLJD-BCcYFSsH.js";
//#region node_modules/@ionic/core/components/p-lbvS3btC.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var r = "ion-content";
var e = ".ion-content-scroll-host";
var n = `${r}, ${e}`;
var t = (o) => "ION-CONTENT" === o.tagName;
var a = async (s) => t(s) ? (await new Promise(((r) => n$1(s, r))), s.getScrollElement()) : s;
var i = (o) => o.querySelector(".ion-content-scroll-host") || o.querySelector(n);
var l = (o) => o.closest(n);
var f = (o) => o.querySelector(e);
var u = (o) => {
	if (t(o)) return o.querySelector("ion-refresher");
	const s = o.closest(r);
	if (null === s) return null;
	const e = f(s);
	return null !== e && e.contains(o) ? s.querySelector("ion-refresher") : null;
};
var c = (o, s) => t(o) ? o.scrollToTop(s) : Promise.resolve(o.scrollTo({
	top: 0,
	left: 0,
	behavior: "smooth"
}));
var h = (o, s, r, e) => t(o) ? o.scrollByPoint(s, r, e) : Promise.resolve(o.scrollBy({
	top: r,
	left: s,
	behavior: e > 0 ? "smooth" : "auto"
}));
var m = (o) => h$1(o, r);
var p = (o) => {
	if (t(o)) {
		const s = o.scrollY;
		return o.scrollY = !1, s;
	}
	return o.style.setProperty("overflow", "hidden"), !0;
};
var v = (o, s) => {
	t(o) ? o.scrollY = s : o.style.removeProperty("overflow");
};
//#endregion
export { h as a, m as c, t as d, u as f, f as i, p as l, c as n, i as o, v as p, e as r, l as s, a as t, r as u };
