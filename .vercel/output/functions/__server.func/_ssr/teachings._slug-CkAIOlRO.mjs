import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachings._slug-CkAIOlRO.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error, reset }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-editorial py-32 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display italic text-4xl",
			children: "Could not open this teaching"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 opacity-70 text-sm",
			children: error.message
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: reset,
			className: "mt-6 font-mono text-[11px] tracking-widest uppercase text-accent",
			children: "Try again"
		})
	]
});
//#endregion
export { SplitErrorComponent as errorComponent };
