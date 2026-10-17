import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Breadcrumbs-DTWu_Qqo.js
var import_jsx_runtime = require_jsx_runtime();
function Breadcrumbs({ items }) {
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "mb-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase opacity-60",
			children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2",
				children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "opacity-30",
					children: "/"
				}), item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "hover:opacity-100 hover:text-accent transition-all link-underline",
					children: item.label
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "opacity-100",
					children: item.label
				})]
			}, index))
		})
	});
}
//#endregion
export { Breadcrumbs as t };
