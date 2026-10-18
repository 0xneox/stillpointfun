import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Breadcrumbs } from "./Breadcrumbs-DTWu_Qqo.mjs";
import { r as CONTENT } from "./content-jEEGWz5L.mjs";
import { i as LIBRARY_ITEMS } from "./library-CWueu09J.mjs";
import { n as POSTS } from "./posts-WTOgWknE.mjs";
import { t as Route } from "./listen._id-T4a1fDl8.mjs";
import { t as EnhancedPlayer } from "./EnhancedPlayer-BNJApVVL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listen._id-Dunni_rP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShareButton({ title, url, description }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleShare = async () => {
		if (navigator.share) try {
			await navigator.share({
				title,
				url,
				text: description
			});
		} catch (err) {}
		else {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: handleShare,
		className: "px-6 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all",
		children: copied ? "COPIED" : "SEND THIS"
	});
}
function Listen() {
	const { id } = Route.useParams();
	const currentItem = CONTENT.find((c) => c.id === id);
	if (!currentItem) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display italic text-4xl",
				children: "Not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60",
				children: "This listening moment is not here."
			})]
		})
	});
	const navigate = useNavigate();
	const currentIndex = CONTENT.findIndex((c) => c.id === currentItem.id);
	const handleNext = () => {
		const nextItem = CONTENT[(currentIndex + 1) % CONTENT.length];
		navigate({
			to: "/listen/$id",
			params: { id: nextItem.id }
		});
	};
	const handlePrev = () => {
		const prevItem = CONTENT[(currentIndex - 1 + CONTENT.length) % CONTENT.length];
		navigate({
			to: "/listen/$id",
			params: { id: prevItem.id }
		});
	};
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	const relatedArticles = currentItem.related_articles?.map((slug) => POSTS.find((p) => p.slug === slug)).filter((p) => Boolean(p));
	const relatedBooks = currentItem.related_books?.map((bookId) => LIBRARY_ITEMS.find((b) => b.id === bookId)).filter((b) => Boolean(b));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex flex-col items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto space-y-8 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
					label: "Listen",
					to: "/"
				}, { label: currentItem.title }] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "NOW PLAYING"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-3xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnhancedPlayer, {
						videoId: currentItem.youtube_video_id,
						title: currentItem.title,
						artist: currentItem.artist_or_speaker,
						channel: currentItem.channel,
						autoplay: true,
						onNext: handleNext,
						onPrev: handlePrev,
						hasPrev: true,
						hasNext: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
							children: currentItem.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm opacity-60",
							children: [
								currentItem.artist_or_speaker,
								" · ",
								currentItem.channel
							]
						}),
						currentItem.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-base opacity-80 max-w-2xl",
							children: currentItem.description
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
						title: currentItem.title,
						url: shareUrl,
						description: `${currentItem.artist_or_speaker} · ${currentItem.channel}`
					})
				}),
				(relatedArticles?.length || relatedBooks?.length) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pt-12 border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8",
						children: "Related"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [relatedArticles?.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/teachings/$slug",
							params: { slug: article.slug },
							className: "block group py-4 border-b border-border hover:border-accent transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded mb-2 inline-block",
											children: "Article"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl group-hover:text-accent transition-colors",
											children: article.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs opacity-60 mt-1",
											children: [
												article.topic,
												" · ",
												article.readMinutes,
												" min read"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity",
									children: "→"
								})]
							})
						}, article.slug)), relatedBooks?.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/library",
							className: "block group py-4 border-b border-border hover:border-accent transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded mb-2 inline-block",
											children: "Book"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl group-hover:text-accent transition-colors",
											children: book.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs opacity-60 mt-1",
											children: [
												book.author,
												" · ",
												book.tradition
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity",
									children: "→"
								})]
							})
						}, book.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "pt-12 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-sm opacity-60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-widest uppercase",
								children: "Source"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [currentItem.source, currentItem.rights_status && ` · ${currentItem.rights_status}`] }),
							currentItem.attribution_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: currentItem.attribution_notes
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { Listen as component };
