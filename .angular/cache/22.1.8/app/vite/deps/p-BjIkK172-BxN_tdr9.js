import { n as J, x as z } from "./p-BoK0Zxin-Ci9S2m7d.js";
import { d as n$1 } from "./p-DUE1XLJD-BCcYFSsH.js";
import { n as c, s as l } from "./p-lbvS3btC-DEHdVjzT.js";
//#region node_modules/@ionic/core/components/p-BjIkK172.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var n = () => {
	const n = window;
	n.addEventListener("statusTap", (() => {
		z((() => {
			const o = document.elementFromPoint(n.innerWidth / 2, n.innerHeight / 2);
			if (!o) return;
			const i = l(o);
			i && new Promise(((o) => n$1(i, o))).then((() => {
				J((async () => {
					i.style.setProperty("--overflow", "hidden"), await c(i, 300), i.style.removeProperty("--overflow");
				}));
			}));
		}));
	}));
};
//#endregion
export { n as startStatusTap };
