import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-MzZFq_Kd.mjs";
import { t as Breadcrumbs } from "./Breadcrumbs-DTWu_Qqo.mjs";
import { n as POSTS } from "./posts-WTOgWknE.mjs";
import { t as LIBRARY_ITEMS } from "./library-B4IWbw1O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-CR0EThQv.js
var import_jsx_runtime = require_jsx_runtime();
function Library() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-4xl mx-auto px-6 py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Library" }] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-8 mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: "LIBRARY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
							children: "Books and Documents"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-lg opacity-70 max-w-2xl mx-auto",
							children: "A searchable collection of books, PDFs, lectures, and reference materials. Where redistribution is authorized, links lead to authorized sources."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-12 flex flex-wrap gap-3 justify-center",
					children: ["All", "Books"].map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all",
						children: filter
					}, filter))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-8",
					children: LIBRARY_ITEMS.map((item) => {
						const relatedArticles = POSTS.filter((post) => post.tags?.some((tag) => item.tags.includes(tag.toLowerCase()))).slice(0, 2);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border pb-8 group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded",
													children: item.format
												}), item.tradition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-xs opacity-50",
													children: item.tradition
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl md:text-3xl group-hover:text-accent transition-colors mb-2",
												children: item.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-mono text-sm opacity-70 mb-2",
												children: [item.author, item.translator && ` · Translated by ${item.translator}`]
											}),
											item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-sans text-sm opacity-60 max-w-2xl",
												children: item.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-2 mt-4",
												children: item.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-[10px] opacity-40 hover:opacity-70 transition-opacity",
													children: ["#", tag]
												}, tag))
											})
										]
									}), item.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.sourceUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all",
										children: "Access"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-4 py-2 font-mono text-[10px] tracking-widest uppercase opacity-40",
										children: "Coming Soon"
									})]
								}),
								item.relatedAudio && item.relatedAudio.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-6 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4",
										children: "Related Audio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: item.relatedAudio.map((audioId) => {
											const audioItem = CONTENT.find((c) => c.id === audioId);
											if (!audioItem) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/listen/$id",
												params: { id: audioId },
												className: "block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all",
												children: [
													audioItem.title,
													" · ",
													audioItem.artist_or_speaker
												]
											}, audioId);
										})
									})]
								}),
								(item.relatedArticles || relatedArticles.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-6 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4",
										children: "Related Articles"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [item.relatedArticles?.map((slug) => {
											const article = POSTS.find((p) => p.slug === slug);
											if (!article) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/teachings/$slug",
												params: { slug },
												className: "block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all",
												children: article.title
											}, slug);
										}), relatedArticles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/teachings/$slug",
											params: { slug: article.slug },
											className: "block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all",
											children: article.title
										}, article.slug))]
									})]
								})
							]
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-24 pt-12 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-sm opacity-60 leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-widest uppercase",
								children: "On Access and Rights"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This library records bibliographic information for texts that may be under copyright. Where redistribution is not authorized, links lead to authorized sources rather than the work itself. We do not treat possession of a PDF as proof of redistribution rights." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collection grows through careful curation, respecting both the need for access and the rights of authors and publishers." })
						]
					})
				})
			]
		})
	});
}
//#endregion
export { Library as component };
