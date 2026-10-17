import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachings._slug-56wH87JM.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-editorial py-32 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display italic text-5xl",
		children: "Teaching not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/teachings",
		className: "mt-6 inline-block font-mono text-[11px] tracking-widest uppercase text-accent link-underline",
		children: "Return to the archive"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
