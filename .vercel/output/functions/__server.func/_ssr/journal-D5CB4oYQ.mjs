import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-MzZFq_Kd.mjs";
import { n as POSTS } from "./posts-WTOgWknE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-D5CB4oYQ.js
var import_jsx_runtime = require_jsx_runtime();
function Journal() {
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
							children: "JOURNAL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
							children: "Original Writing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-lg opacity-70 max-w-2xl mx-auto",
							children: "Essays and reflections on consciousness, philosophy, tradition, and the encounter between the ancient and the contemporary."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-12 flex flex-wrap gap-3 justify-center",
					children: [
						"All",
						"Non-Duality",
						"Philosophy",
						"Technology",
						"AI",
						"God & Shiva",
						"Life",
						"Truth"
					].map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all",
						children: topic
					}, topic))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-16",
					children: POSTS.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teachings/$slug",
						params: { slug: post.slug },
						className: "block group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "border-b border-border pb-12 group-hover:border-accent transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded",
											children: post.topic
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs opacity-50",
											children: post.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs opacity-50",
											children: [post.readMinutes, " min read"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl md:text-3xl group-hover:text-accent transition-colors mb-3",
									children: post.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-base opacity-70 leading-relaxed max-w-2xl",
									children: post.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 font-mono text-[10px] tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity",
									children: "Read →"
								}),
								post.tags && post.tags.some((tag) => CONTENT.some((c) => c.tags.includes(tag.toLowerCase()))) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-6 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4",
										children: "Related Audio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: CONTENT.filter((c) => post.tags?.some((tag) => c.tags.includes(tag.toLowerCase()))).slice(0, 2).map((audio) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/listen/$id",
											params: { id: audio.id },
											className: "block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all",
											children: [
												audio.title,
												" · ",
												audio.artist_or_speaker
											]
										}, audio.id))
									})]
								})
							]
						})
					}, post.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-24 pt-12 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-sm opacity-60 leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-widest uppercase",
								children: "On Sources and Attribution"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Original essays are distinguished from curated materials. Quotations, translations, and historical references are sourced where possible. This is not a project of fabrication — it is a project of honest inquiry and proper attribution." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Philosophical positions are presented as such, not as absolute truth. Different traditions offer different perspectives. The reader is invited to explore, question, and discover for themselves." })
						]
					})
				})
			]
		})
	});
}
//#endregion
export { Journal as component };
