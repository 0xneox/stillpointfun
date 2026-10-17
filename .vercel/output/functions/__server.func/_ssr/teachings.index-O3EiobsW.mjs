import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as sortedPosts, t as ALL_TOPICS } from "./posts-WTOgWknE.mjs";
import { t as Route } from "./teachings.index-D_YzzO_Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachings.index-O3EiobsW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogIndex() {
	const { topic } = Route.useSearch();
	const posts = (0, import_react.useMemo)(() => {
		const all = sortedPosts();
		return topic ? all.filter((p) => p.topic === topic) : all;
	}, [topic]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "container-editorial pt-24 pb-16 border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
				children: "The Living Teachings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display italic text-5xl md:text-7xl mt-6 text-balance",
				children: "A Continuously Unfolding Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed",
				children: "Writings, recordings, and pointers on non-dual wisdom drawn from Advaita Vedanta, Kashmir Shaivism, and the direct path of Recognition."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
					to: "all",
					active: !topic,
					label: "All"
				}), ALL_TOPICS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
					to: t,
					active: topic === t,
					label: t
				}, t))]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-editorial py-12 divide-y divide-border",
		children: [posts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center opacity-50 font-mono text-xs uppercase tracking-widest",
			children: "No teachings under this topic yet."
		}), posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/teachings/$slug",
			params: { slug: p.slug },
			className: "group grid grid-cols-12 gap-6 py-10 items-baseline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12 md:col-span-2 font-mono text-[10px] tracking-widest uppercase opacity-50",
					children: new Date(p.date).toLocaleDateString("en-US", {
						month: "short",
						day: "2-digit",
						year: "numeric"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 md:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl md:text-4xl group-hover:text-accent transition-colors leading-tight text-balance",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 opacity-70 max-w-2xl leading-relaxed",
						children: p.excerpt
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 md:col-span-2 md:text-right font-mono text-[10px] tracking-widest uppercase opacity-50",
					children: [
						p.topic,
						" · ",
						p.readMinutes,
						" min"
					]
				})
			]
		}, p.slug))]
	})] });
}
function FilterPill({ to, active, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/teachings",
		search: to === "all" ? {} : { topic: to },
		className: `px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${active ? "bg-foreground text-background border-foreground" : "border-border hover:bg-foreground hover:text-background"}`,
		children: label
	});
}
//#endregion
export { BlogIndex as component };
