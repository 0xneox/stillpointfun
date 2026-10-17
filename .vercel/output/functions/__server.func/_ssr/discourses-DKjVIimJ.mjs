import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-MzZFq_Kd.mjs";
import { t as Breadcrumbs } from "./Breadcrumbs-DTWu_Qqo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discourses-DKjVIimJ.js
var import_jsx_runtime = require_jsx_runtime();
function Discourses() {
	const discoursesBySubject = {
		"Consciousness & Reality": CONTENT.filter((c) => [
			"REALITY",
			"COSMOS",
			"PSYCHEDELIC"
		].includes(c.channel) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Advaita & Non-Duality": CONTENT.filter((c) => ["REALITY"].includes(c.channel) && c.tradition?.toLowerCase().includes("advaita") && c.media_type !== "music" && c.media_type !== "chanting"),
		"Buddhist Teachings": CONTENT.filter((c) => c.channel === "BUDDHA" && c.media_type !== "music" && c.media_type !== "chanting"),
		"Sufi Traditions": CONTENT.filter((c) => c.channel === "SUFI" && c.media_type !== "music" && c.media_type !== "chanting")
	};
	const filteredSubjects = Object.fromEntries(Object.entries(discoursesBySubject).filter(([_, items]) => items.length > 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "container-editorial pt-24 pb-16 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Discourses" }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "Public Discourses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl",
					children: "Discourses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed",
					children: "Curated talks, satsangs, lectures, and philosophical discussions from teachers across traditions. Publicly accessible discourses for study and contemplation."
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-4xl mx-auto px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-16",
				children: Object.entries(filteredSubjects).map(([subject, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl md:text-3xl mb-6",
					children: subject
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/listen/$id",
						params: { id: item.id },
						className: "block group py-4 border-b border-border hover:border-accent transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl group-hover:text-accent transition-colors",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-sm opacity-60 mt-1",
									children: [item.artist_or_speaker, item.tradition && ` · ${item.tradition}`]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity",
								children: "→"
							})]
						})
					}, item.id))
				})] }, subject))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface text-surface-foreground py-24 px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6",
					children: "About These Discourses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 text-lg leading-[1.7] opacity-90",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These discourses are curated from publicly available sources including YouTube, archives, and authorized channels. Each entry identifies the original creator and source." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collection focuses on authentic teachings from Advaita Vedanta, Kashmir Śaivism, Buddhism, Sufism, and other contemplative traditions, as well as philosophical explorations of consciousness and reality." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "italic opacity-80",
							children: "This is not a platform for original video production. It is a curated space for discovering meaningful discourses already available in the public domain."
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-24 border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display italic text-4xl md:text-5xl text-balance",
					children: "Explore Further"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-6 flex flex-col sm:flex-row gap-4 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors",
						children: "Browse All Listening"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/journal",
						className: "px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors",
						children: "Read the Journal"
					})]
				})]
			})
		})
	] });
}
//#endregion
export { Discourses as component };
