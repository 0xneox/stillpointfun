import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-jEEGWz5L.mjs";
import { i as LIBRARY_ITEMS } from "./library-CWueu09J.mjs";
import { r as adjacentPosts } from "./posts-WTOgWknE.mjs";
import { t as Route } from "./teachings._slug-Bohr5HEb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachings._slug-CXSdmH_t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostPage() {
	const post = Route.useLoaderData();
	const { prev, next } = (0, import_react.useMemo)(() => adjacentPosts(post.slug), [post.slug]);
	const toc = post.body.filter((b) => b.type === "h2");
	const relatedAudio = (0, import_react.useMemo)(() => {
		if (!post.tags) return [];
		return CONTENT.filter((audio) => post.tags?.some((tag) => audio.tags.includes(tag.toLowerCase()))).slice(0, 3);
	}, [post.tags]);
	const relatedBooks = (0, import_react.useMemo)(() => {
		if (!post.tags) return [];
		return LIBRARY_ITEMS.filter((book) => post.tags?.some((tag) => book.tags.includes(tag.toLowerCase()))).slice(0, 3);
	}, [post.tags]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "container-editorial pt-24 pb-16 max-w-3xl border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/teachings",
					search: { topic: post.topic },
					className: "font-mono text-[10px] tracking-widest uppercase text-accent link-underline",
					children: post.topic
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display italic text-5xl md:text-7xl mt-6 leading-[1.05] text-balance",
					children: post.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-6 font-mono text-[10px] tracking-widest uppercase opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(post.date).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.readMinutes, " min read"] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-editorial py-16 grid grid-cols-12 gap-8",
			children: [toc.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:block col-span-3 sticky top-24 self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
					children: "Contents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3 text-sm",
					children: toc.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#h-${i}`,
						className: "opacity-70 hover:text-accent hover:opacity-100 transition-colors",
						children: b.text
					}) }, i))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `col-span-12 ${toc.length > 1 ? "lg:col-span-8 lg:col-start-4" : "lg:col-span-8 lg:col-start-3"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "prose-editorial",
						children: post.body.map((block, i) => {
							const h2Index = post.body.slice(0, i + 1).filter((b) => b.type === "h2").length - 1;
							switch (block.type) {
								case "h2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: `h-${h2Index}`,
									className: "font-display italic text-3xl md:text-4xl mt-16 mb-6 text-balance",
									children: block.text
								}, i);
								case "p": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg md:text-xl leading-[1.7] mb-6 text-pretty",
									children: block.text
								}, i);
								case "quote": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "my-12 border-l-2 border-accent pl-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display italic text-2xl md:text-3xl leading-[1.35]",
										children: [
											"\"",
											block.text,
											"\""
										]
									}), block.cite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
										className: "mt-4 font-mono text-[10px] tracking-widest uppercase opacity-60",
										children: ["— ", block.cite]
									})]
								}, i);
								case "code": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "my-8 bg-muted p-6 rounded overflow-x-auto text-sm font-mono leading-relaxed",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: block.text })
								}, i);
								default: return null;
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-24 pt-8 border-t border-border flex flex-wrap items-center gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
								children: "Share"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`,
								target: "_blank",
								rel: "noreferrer",
								className: "font-mono text-[10px] tracking-widest uppercase link-underline hover:text-accent",
								children: "Twitter / X"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt)}`,
								className: "font-mono text-[10px] tracking-widest uppercase link-underline hover:text-accent",
								children: "Email"
							})
						]
					}),
					relatedAudio.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 pt-8 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-6",
							children: "Related Audio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: relatedAudio.map((audio) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/listen/$id",
								params: { id: audio.id },
								className: "block group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-border py-4 group-hover:border-accent transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg group-hover:text-accent transition-colors",
										children: audio.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs opacity-60 mt-1",
										children: [
											audio.artist_or_speaker,
											" · ",
											audio.channel
										]
									})]
								})
							}, audio.id))
						})]
					}),
					relatedBooks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 pt-8 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-6",
							children: "Related Books"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: relatedBooks.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg",
										children: book.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs opacity-60 mt-1",
										children: [
											book.author,
											" · ",
											book.tradition
										]
									}),
									book.sourceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: book.sourceUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-block mt-2 font-mono text-[10px] tracking-widest uppercase text-accent link-underline",
										children: "View source"
									})
								]
							}, book.id))
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "container-editorial py-16 border-t border-border grid grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: prev && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/teachings/$slug",
				params: { slug: prev.slug },
				className: "group block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-2",
					children: "← Previous"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-xl md:text-2xl group-hover:text-accent transition-colors",
					children: prev.title
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-right",
				children: next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teachings/$slug",
					params: { slug: next.slug },
					className: "group block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mb-2",
						children: "Next →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl md:text-2xl group-hover:text-accent transition-colors",
						children: next.title
					})]
				})
			})]
		})
	] });
}
//#endregion
export { PostPage as component };
