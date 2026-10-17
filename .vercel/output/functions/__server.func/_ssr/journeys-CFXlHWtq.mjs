import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as JOURNEYS } from "./content-MzZFq_Kd.mjs";
import { t as Breadcrumbs } from "./Breadcrumbs-DTWu_Qqo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journeys-CFXlHWtq.js
var import_jsx_runtime = require_jsx_runtime();
function Journeys() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-4xl mx-auto px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Journeys" }] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-8 mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: "JOURNEYS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
							children: "Curated listening sequences"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-lg opacity-70 max-w-2xl mx-auto",
							children: "A journey is a deliberately curated sequence across different traditions. The point is not genre consistency — it's emotional and intellectual continuity."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-12",
					children: JOURNEYS.map((journey) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/journey/${journey.id}`,
						className: "block group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border pb-8 group-hover:border-accent transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl md:text-3xl group-hover:text-accent transition-colors",
									children: journey.title
								}),
								journey.introduction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-sans text-sm opacity-60",
									children: journey.introduction
								}),
								journey.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-sans text-sm opacity-60",
									children: journey.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 font-mono text-[10px] tracking-widest uppercase opacity-50",
									children: [journey.items.length, " items"]
								})
							]
						})
					}, journey.id))
				})
			]
		})
	});
}
//#endregion
export { Journeys as component };
