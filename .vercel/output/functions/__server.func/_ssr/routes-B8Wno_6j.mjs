import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CHANNEL_DESCRIPTIONS, r as CONTENT, t as CHANNELS } from "./content-MzZFq_Kd.mjs";
import { t as useLocalStorage } from "./useLocalStorage-AoNhR2OM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B8Wno_6j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useScrollAnimation(threshold = .1) {
	const ref = (0, import_react.useRef)(null);
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(entry.target);
			}
		}, { threshold });
		const currentRef = ref.current;
		if (currentRef) observer.observe(currentRef);
		return () => {
			if (currentRef) observer.unobserve(currentRef);
		};
	}, [threshold]);
	return [ref, isVisible];
}
function Home() {
	const [currentItem, setCurrentItem] = (0, import_react.useState)(CONTENT[0]);
	const [lastPlayedId, setLastPlayedId] = useLocalStorage("stillpoint-last-played", CONTENT[0].id);
	const playRandomRef = (0, import_react.useRef)(null);
	const playRandom = () => {
		const newItem = CONTENT[Math.floor(Math.random() * CONTENT.length)];
		setCurrentItem(newItem);
		setLastPlayedId(newItem.id);
	};
	playRandomRef.current = playRandom;
	CONTENT.find((c) => c.daily_selection) || CONTENT[0];
	const [heroRef, heroVisible] = useScrollAnimation(.1);
	const [featuredRef, featuredVisible] = useScrollAnimation(.1);
	const [channelsRef, channelsVisible] = useScrollAnimation(.1);
	const [discoverRef, discoverVisible] = useScrollAnimation(.1);
	const [journeyRef, journeyVisible] = useScrollAnimation(.1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "min-h-screen flex flex-col items-center justify-center px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto space-y-8 w-full fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 stagger-1",
							children: "AN INDEPENDENT SPACE FOR INQUIRY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight stagger-2",
							children: "Stillpoint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl md:text-3xl lg:text-4xl italic opacity-90 max-w-2xl mx-auto stagger-3",
							children: "Listen. Read. Question the nature of reality."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed stagger-4",
							children: "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 stagger-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "px-10 py-4 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-colors w-full sm:w-auto hover-lift press-scale",
								children: "Begin Exploring"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: playRandom,
								className: "px-10 py-4 border border-foreground text-foreground font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto hover-lift press-scale",
								children: "I Don't Know"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-12 flex flex-wrap justify-center gap-6 font-mono text-[10px] tracking-widest uppercase opacity-60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:opacity-100 hover:text-accent transition-all link-underline",
									children: "Listen"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-30",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/library",
									className: "hover:opacity-100 hover:text-accent transition-all link-underline",
									children: "Library"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-30",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/journal",
									className: "hover:opacity-100 hover:text-accent transition-all link-underline",
									children: "Journal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-30",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/discourses",
									className: "hover:opacity-100 hover:text-accent transition-all link-underline",
									children: "Discourses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-30",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/journeys",
									className: "hover:opacity-100 hover:text-accent transition-all link-underline",
									children: "Journeys"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: featuredRef,
				className: `max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${featuredVisible ? "is-visible" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-8 mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
						children: "FEATURED"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl md:text-4xl",
						children: "Now Playing"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border pb-8 hover-lift",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl md:text-3xl mb-2",
										children: currentItem.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-sm opacity-60 mb-4",
										children: [
											currentItem.artist_or_speaker,
											" · ",
											currentItem.channel
										]
									}),
									currentItem.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-sans text-sm opacity-70 max-w-2xl",
										children: currentItem.description
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/listen/$id",
								params: { id: currentItem.id },
								className: "px-6 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all press-scale",
								children: "Play"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: playRandom,
						className: "w-full py-4 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all hover-lift press-scale",
						children: "Discover Something Random"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: channelsRef,
				className: `max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${channelsVisible ? "is-visible" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center",
						children: "CHANNELS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: CHANNELS.slice(0, 6).map((channel, index) => {
							const channelContent = CONTENT.filter((c) => c.channel === channel);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/channel/${channel.toLowerCase()}`,
								className: "block group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `w-full text-left py-6 border-b border-border hover:border-accent transition-colors hover-lift stagger-${Math.min(index + 1, 5)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-2xl md:text-3xl group-hover:text-accent transition-colors",
											children: channel
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
											children: [channelContent.length, " pieces"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-sans text-sm opacity-60 max-w-xl",
										children: CHANNEL_DESCRIPTIONS[channel]
									})]
								})
							}, channel);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all link-underline",
							children: "View All Channels →"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: discoverRef,
				className: `max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${discoverVisible ? "is-visible" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center",
					children: "DISCOVER"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-center gap-4",
					children: [
						"UNDERSTANDING",
						"WONDER",
						"DEVOTION",
						"SILENCE"
					].map((mood, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: playRandom,
						className: `px-6 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all hover-lift press-scale stagger-${Math.min(index + 1, 5)}`,
						children: mood
					}, mood))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				ref: journeyRef,
				className: `max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${journeyVisible ? "is-visible" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: "CURATED JOURNEY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl md:text-4xl italic",
							children: "Into the Unknown"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-base opacity-70 max-w-xl mx-auto",
							children: "Explore the boundaries of understanding across science, mysticism, and direct experience."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/journey/into-the-unknown",
							className: "inline-block px-10 py-4 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-colors hover-lift press-scale",
							children: "Begin Journey"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
