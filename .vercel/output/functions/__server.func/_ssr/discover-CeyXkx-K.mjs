import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT, t as CHANNELS } from "./content-MzZFq_Kd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-CeyXkx-K.js
var import_jsx_runtime = require_jsx_runtime();
function Discover() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-4xl mx-auto px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-8 mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: "DISCOVER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
							children: "Explore the Collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-lg opacity-70 max-w-2xl mx-auto",
							children: "A curated space for listening, reading, and inquiry. Discover audio, books, articles, and journeys across traditions."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-6 mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "group block p-8 border border-border hover:border-accent transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3",
									children: "Listen"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl group-hover:text-accent transition-colors mb-2",
									children: "Audio Collection"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-sm opacity-60",
									children: "Talks, lectures, music, chanting, and ambient listening."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/library",
							className: "group block p-8 border border-border hover:border-accent transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3",
									children: "Library"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl group-hover:text-accent transition-colors mb-2",
									children: "Books & Documents"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-sm opacity-60",
									children: "Texts, PDFs, lectures, and reference materials."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/journal",
							className: "group block p-8 border border-border hover:border-accent transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3",
									children: "Journal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl group-hover:text-accent transition-colors mb-2",
									children: "Original Essays"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-sm opacity-60",
									children: "Philosophical reflections and exploratory writing."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/journeys",
							className: "group block p-8 border border-border hover:border-accent transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3",
									children: "Journeys"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl group-hover:text-accent transition-colors mb-2",
									children: "Curated Sequences"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-sm opacity-60",
									children: "Intentional paths through the collection."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8",
							children: "AUDIO CHANNELS"
						})
					}), CHANNELS.map((channel) => {
						const channelContent = CONTENT.filter((c) => c.channel === channel);
						if (channelContent.length === 0) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/channel/${channel}`,
							className: "block group mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl md:text-4xl group-hover:text-accent transition-colors",
								children: channel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-[10px] tracking-widest uppercase opacity-50",
								children: [channelContent.length, " pieces"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: channelContent.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/listen/${item.id}`,
								className: "block group py-4 border-b border-border hover:border-accent transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl group-hover:text-accent transition-colors",
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-xs opacity-60",
											children: item.artist_or_speaker
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity",
										children: "→"
									})]
								})
							}, item.id))
						})] }, channel);
					})]
				})
			]
		})
	});
}
//#endregion
export { Discover as component };
