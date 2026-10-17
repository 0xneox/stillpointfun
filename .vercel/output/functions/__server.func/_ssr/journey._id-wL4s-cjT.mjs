import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as JOURNEYS, r as CONTENT } from "./content-MzZFq_Kd.mjs";
import { t as Route } from "./journey._id-C0bydqe6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journey._id-wL4s-cjT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function YouTubePlayer({ videoId, autoplay = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aspect-video w-full bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src: `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&playsinline=1&rel=0`,
			className: "w-full h-full",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
			allowFullScreen: true,
			title: "YouTube video player"
		})
	});
}
function JourneyDetail() {
	const { id } = Route.useParams();
	const journey = JOURNEYS.find((j) => j.id === id);
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	if (!journey) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display italic text-4xl",
				children: "Not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60",
				children: "This journey is not here."
			})]
		})
	});
	const journeyItem = journey.items[currentIndex];
	const currentItem = journeyItem.type === "audio" ? CONTENT.find((c) => c.id === journeyItem.source_id) : null;
	if (journeyItem.type === "audio" && !currentItem) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display italic text-4xl",
				children: "Not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60",
				children: "This content is not here."
			})]
		})
	});
	const goToNext = () => {
		if (currentIndex < journey.items.length - 1) setCurrentIndex(currentIndex + 1);
	};
	const goToPrevious = () => {
		if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-4xl mx-auto px-6 py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-4 mb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
						children: "JOURNEY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl md:text-5xl leading-tight",
						children: journey.title
					}),
					journey.introduction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-base opacity-70 max-w-2xl mx-auto",
						children: journey.introduction
					}),
					journey.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-sm opacity-60 max-w-2xl mx-auto mt-2",
						children: journey.description
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8",
				children: [
					journeyItem.type === "audio" && currentItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-3xl mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePlayer, {
							videoId: currentItem.youtube_video_id,
							autoplay: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
								children: [
									currentIndex + 1,
									" / ",
									journey.items.length
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl md:text-4xl leading-tight",
								children: journeyItem.title
							}),
							journeyItem.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm opacity-60 max-w-xl mx-auto",
								children: journeyItem.notes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-sm opacity-60",
								children: [
									currentItem.artist_or_speaker,
									" · ",
									currentItem.channel
								]
							})
						]
					})] }),
					journeyItem.type === "article" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
								children: [
									currentIndex + 1,
									" / ",
									journey.items.length
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded",
								children: "Article"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl md:text-4xl leading-tight",
								children: journeyItem.title
							}),
							journeyItem.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm opacity-60 max-w-xl mx-auto",
								children: journeyItem.notes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/teachings/${journeyItem.source_id}`,
								className: "inline-block px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors",
								children: "Read Article"
							})
						]
					}),
					journeyItem.type === "book" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
								children: [
									currentIndex + 1,
									" / ",
									journey.items.length
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded",
								children: "Book"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl md:text-4xl leading-tight",
								children: journeyItem.title
							}),
							journeyItem.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm opacity-60 max-w-xl mx-auto",
								children: journeyItem.notes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/library",
								className: "inline-block px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors",
								children: "View in Library"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: goToPrevious,
							disabled: currentIndex === 0,
							className: "p-4 opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:hover:opacity-30",
							"aria-label": "Previous",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: "◀"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: goToNext,
							disabled: currentIndex === journey.items.length - 1,
							className: "p-6 bg-foreground text-background hover:bg-accent transition-colors disabled:opacity-30 disabled:hover:bg-foreground",
							"aria-label": "Next",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl",
								children: "▶"
							})
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { JourneyDetail as component };
