import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-MzZFq_Kd.mjs";
import { t as Route$18 } from "./channel._id-CfGm621F.mjs";
import { n as POSTS } from "./posts-WTOgWknE.mjs";
import { t as Route$19 } from "./journey._id-C0bydqe6.mjs";
import { n as Route$20, t as LIBRARY_ITEMS } from "./library-B4IWbw1O.mjs";
import { t as Route$21 } from "./listen._id-Cd4O4G0c.mjs";
import { t as useLocalStorage } from "./useLocalStorage-AoNhR2OM.mjs";
import { t as Route$22 } from "./teachings.index-D_YzzO_Y.mjs";
import { t as Route$23 } from "./teachings._slug-Bg91lg0n.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CMEE68w7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-oOWCE-GK.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function SearchBar({ onSelect }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const handleSearch = (e) => {
		const q = e.target.value.toLowerCase();
		setQuery(q);
		if (q.length > 0) {
			const audioResults = CONTENT.filter((item) => item.title.toLowerCase().includes(q) || item.artist_or_speaker.toLowerCase().includes(q) || item.channel.toLowerCase().includes(q) || item.tags.some((tag) => tag.toLowerCase().includes(q))).map((item) => ({
				id: item.id,
				title: item.title,
				subtitle: `${item.artist_or_speaker} · ${item.channel}`,
				type: "audio",
				route: "/listen/$id",
				params: { id: item.id }
			}));
			const articleResults = POSTS.filter((post) => post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.topic.toLowerCase().includes(q) || post.tags?.some((tag) => tag.toLowerCase().includes(q))).map((post) => ({
				id: post.slug,
				title: post.title,
				subtitle: `${post.topic} · ${post.readMinutes} min read`,
				type: "article",
				route: "/teachings/$slug",
				params: { slug: post.slug }
			}));
			const bookResults = LIBRARY_ITEMS.filter((item) => item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q) || item.tradition?.toLowerCase().includes(q) || item.tags.some((tag) => tag.toLowerCase().includes(q))).map((item) => ({
				id: item.id,
				title: item.title,
				subtitle: `${item.author} · ${item.format}`,
				type: "book",
				route: "#",
				params: {}
			}));
			setResults([
				...audioResults,
				...articleResults,
				...bookResults
			].slice(0, 15));
			setIsOpen(true);
		} else {
			setResults([]);
			setIsOpen(false);
		}
	};
	const handleSelect = (result) => {
		if (onSelect) onSelect();
		else if (result.route === "/listen/$id") navigate({
			to: "/listen/$id",
			params: { id: result.params.id }
		});
		else if (result.route === "/teachings/$slug") navigate({
			to: "/teachings/$slug",
			params: { slug: result.params.slug }
		});
		setQuery("");
		setResults([]);
		setIsOpen(false);
	};
	const getTypeColor = (type) => {
		switch (type) {
			case "audio": return "text-accent";
			case "article": return "text-blue-400";
			case "book": return "text-green-400";
			default: return "text-foreground";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative max-w-md mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value: query,
			onChange: handleSearch,
			placeholder: "Search audio, articles, books...",
			className: "w-full px-4 py-3 bg-surface border border-border font-mono text-sm focus:outline-none focus:border-accent transition-colors"
		}), isOpen && results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-full left-0 right-0 mt-2 bg-background border border-border shadow-lg z-50 max-h-96 overflow-y-auto",
			children: results.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => handleSelect(item),
				className: "w-full text-left px-4 py-3 hover:bg-surface transition-colors border-b border-border last:border-b-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs opacity-60 mt-1",
							children: item.subtitle
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-mono text-[9px] tracking-widest uppercase ${getTypeColor(item.type)}`,
						children: item.type
					})]
				})
			}, item.id))
		})]
	});
}
function Logo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.png",
		alt: "Stillpoint",
		className
	});
}
var links = [
	{
		to: "/",
		label: "LISTEN"
	},
	{
		to: "/library",
		label: "LIBRARY"
	},
	{
		to: "/journal",
		label: "JOURNAL"
	},
	{
		to: "/discourses",
		label: "DISCOURSES"
	},
	{
		to: "/journeys",
		label: "JOURNEYS"
	}
];
function StillpointNav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	useNavigate();
	const handleSearchSelect = () => {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-editorial flex items-center justify-between py-6 md:py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:opacity-80 transition-opacity touch-manipulation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-8 w-auto" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase",
						children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							activeProps: { className: "text-accent" },
							activeOptions: { exact: false },
							className: "hover:text-accent transition-colors py-2",
							children: l.label
						}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchOpen(!searchOpen),
							className: "hover:text-accent transition-colors py-2",
							"aria-label": "Search",
							children: "SEARCH"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:hidden flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchOpen(!searchOpen),
							className: "font-mono text-[10px] tracking-widest uppercase touch-manipulation",
							"aria-label": "Search",
							children: "🔍"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "font-mono text-[10px] tracking-widest uppercase px-4 py-2 touch-manipulation",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Toggle menu",
							children: open ? "Close" : "Menu"
						})]
					})
				]
			}),
			searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-background py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, { onSelect: handleSearchSelect })
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden border-t border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-editorial flex flex-col gap-2 py-6 text-[11px] font-mono tracking-widest uppercase",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						onClick: () => setOpen(false),
						className: "hover:text-accent transition-colors py-3 block",
						children: l.label
					}, l.to))
				})
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "px-6 py-24 bg-surface text-surface-foreground mt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row justify-between items-start gap-16 mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-10 w-auto" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-60 mb-6 leading-relaxed",
						children: "An independent, open-source project for listening, inquiry, and the exploration of consciousness."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-16 text-[11px] font-mono tracking-widest uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-30",
								children: "Navigation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-accent transition-colors",
								children: "Listen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/library",
								className: "hover:text-accent transition-colors",
								children: "Library"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "hover:text-accent transition-colors",
								children: "Journal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/discourses",
								className: "hover:text-accent transition-colors",
								children: "Discourses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journeys",
								className: "hover:text-accent transition-colors",
								children: "Journeys"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-30",
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "hover:text-accent transition-colors",
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/founder",
								className: "hover:text-accent transition-colors",
								children: "Founder"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/disclaimer",
								className: "hover:text-accent transition-colors",
								children: "Disclaimer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://github.com/0xneox",
								target: "_blank",
								rel: "noreferrer",
								className: "hover:text-accent transition-colors",
								children: "GitHub"
							})
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-8 border-t border-surface-foreground/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row justify-between items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase",
						children: "The Still Point © 2026"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase",
						children: "Open source · Free for inquiry"
					})]
				})
			})]
		})
	});
}
function BottomPlayer({ currentItem }) {
	const [isExpanded, setIsExpanded] = (0, import_react.useState)(false);
	if (!currentItem) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-editorial",
			children: [!isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-4 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/listen/$id",
					params: { id: currentItem.id },
					className: "flex items-center gap-4 flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 bg-surface rounded-sm flex items-center justify-center flex-shrink-0 touch-manipulation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `https://img.youtube.com/vi/${currentItem.youtube_video_id}/default.jpg`,
							alt: currentItem.title,
							className: "w-full h-full object-cover rounded-sm",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm truncate",
							children: currentItem.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] opacity-60 truncate",
							children: currentItem.artist_or_speaker
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsExpanded(true),
					className: "p-3 opacity-60 hover:opacity-100 transition-opacity touch-manipulation",
					"aria-label": "Expand player",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl",
						children: "▲"
					})
				})]
			}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl truncate",
							children: currentItem.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm opacity-60 mt-1",
							children: [
								currentItem.artist_or_speaker,
								" · ",
								currentItem.channel
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsExpanded(false),
						className: "p-3 opacity-60 hover:opacity-100 transition-opacity ml-4 touch-manipulation",
						"aria-label": "Collapse player",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl",
							children: "▼"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "p-4 opacity-60 hover:opacity-100 transition-opacity touch-manipulation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "◀"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "p-6 bg-foreground text-background hover:bg-accent transition-colors touch-manipulation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: "▶"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "p-4 opacity-60 hover:opacity-100 transition-opacity touch-manipulation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "▶"
							})
						})
					]
				})]
			})]
		})
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md mx-auto space-y-8 fade-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-8xl md:text-9xl opacity-20",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl md:text-4xl italic",
						children: "Not found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-base opacity-70 leading-relaxed",
						children: "This page does not exist. It may have been moved or never existed at all."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-4 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors hover-lift press-scale",
						children: "Return Home"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "px-8 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-colors hover-lift press-scale",
						children: "Browse Listening"
					})]
				})
			]
		})
	});
}
function ErrorState({ title = "Something went wrong", message = "An unexpected error occurred. Please try again.", showHome = true, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md mx-auto space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-16 h-16 mx-auto opacity-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1",
						className: "w-full h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8v4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 16h.01" })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl md:text-4xl italic",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-base opacity-70 leading-relaxed",
						children: message
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-4 justify-center",
					children: [action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: action.to,
						className: "px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors hover-lift press-scale",
						children: action.label
					}), showHome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "px-8 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-colors hover-lift press-scale",
						children: "Return Home"
					})]
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		title: "Something did not resolve",
		message: "An unexpected error occurred. Please try again or return home.",
		action: {
			label: "Try again",
			to: "/"
		}
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Stillpoint — Listen. Read. Question." },
			{
				name: "description",
				content: "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry."
			},
			{
				name: "keywords",
				content: "consciousness, philosophy, non-duality, Advaita, Kashmir Shaivism, Vedanta, meditation, contemplation, wisdom, inquiry"
			},
			{
				name: "author",
				content: "Stillpoint"
			},
			{
				property: "og:site_name",
				content: "Stillpoint"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "Stillpoint — Listen. Read. Question."
			},
			{
				property: "og:description",
				content: "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom."
			},
			{
				property: "og:url",
				content: "https://stillpoint.com"
			},
			{
				property: "og:image",
				content: "https://stillpoint.com/og-image.png"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:alt",
				content: "Stillpoint — Listen. Read. Question."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Stillpoint — Listen. Read. Question."
			},
			{
				name: "twitter:description",
				content: "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom."
			},
			{
				name: "twitter:image",
				content: "https://stillpoint.com/og-image.png"
			},
			{
				name: "twitter:image:alt",
				content: "Stillpoint — Listen. Read. Question."
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				name: "googlebot",
				content: "index, follow"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "canonical",
				href: "https://stillpoint.com"
			},
			{
				rel: "manifest",
				href: "/site.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "icon",
				href: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png"
			},
			{
				rel: "icon",
				href: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png"
			}
		],
		scripts: [{
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "Stillpoint",
				url: "https://stillpoint.com",
				description: "An independent, open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry.",
				potentialAction: {
					"@type": "SearchAction",
					target: "https://stillpoint.com/search?q={search_term_string}",
					"query-input": "required name=search_term_string"
				}
			})
		}, {
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "Stillpoint",
				url: "https://stillpoint.com",
				description: "An independent, open-source project for listening, inquiry, and the exploration of consciousness.",
				sameAs: ["https://github.com/0xneox"],
				foundingDate: "2026"
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
              try {
                var s = localStorage.getItem('sp-theme');
                var d = s ? s === 'dark' : true;
                if (d) document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = d ? 'dark' : 'light';
              } catch (e) {}
            ` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	const [lastPlayedId] = useLocalStorage("stillpoint-last-played", "");
	const currentItem = CONTENT.find((c) => c.id === lastPlayedId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillpointNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-[60vh] pb-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			currentItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomPlayer, { currentItem })
		]
	});
}
var $$splitComponentImporter$14 = () => import("./teachings-ChTv-G9p.mjs");
var Route$16 = createFileRoute("/teachings")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var BASE_URL = "";
var Route$15 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/blog",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/gallery",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/work",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/contact",
				changefreq: "yearly",
				priority: "0.4"
			},
			...POSTS.map((p) => ({
				path: `/blog/${p.slug}`,
				lastmod: p.date,
				changefreq: "yearly",
				priority: "0.8"
			}))
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$13 = () => import("./score-JzaIKxgy.mjs");
var Route$14 = createFileRoute("/score")({
	head: () => ({
		meta: [
			{ title: "Practice Log — The Still Point" },
			{
				name: "description",
				content: "Your personal contemplative practice log. Private and optional."
			},
			{
				property: "og:title",
				content: "Practice Log — The Still Point"
			},
			{
				property: "og:description",
				content: "Your personal contemplative practice log. Private and optional."
			},
			{
				property: "og:url",
				content: "/score"
			}
		],
		links: [{
			rel: "canonical",
			href: "/score"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./prana-C0YcHXxj.mjs");
var Route$13 = createFileRoute("/prana")({
	head: () => ({
		meta: [
			{ title: "Prāṇa Gate — The Still Point" },
			{
				name: "description",
				content: "A 60-90 second guided attention tool to enter the still center."
			},
			{
				property: "og:title",
				content: "Prāṇa Gate — The Still Point"
			},
			{
				property: "og:description",
				content: "A 60-90 second guided attention tool to enter the still center."
			},
			{
				property: "og:url",
				content: "/prana"
			}
		],
		links: [{
			rel: "canonical",
			href: "/prana"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./mandala-B3Eo-IQK.mjs");
var Route$12 = createFileRoute("/mandala")({
	head: () => ({
		meta: [
			{ title: "The Mandala — The Still Point" },
			{
				name: "description",
				content: "Enter the living discussion space of The Still Point community."
			},
			{
				property: "og:title",
				content: "The Mandala — The Still Point"
			},
			{
				property: "og:description",
				content: "Enter the living discussion space of The Still Point community."
			},
			{
				property: "og:url",
				content: "/mandala"
			}
		],
		links: [{
			rel: "canonical",
			href: "/mandala"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var Route$11 = createFileRoute("/live")({ beforeLoad: () => {
	throw redirect({ to: "/discourses" });
} });
var $$splitComponentImporter$10 = () => import("./journeys-CFXlHWtq.mjs");
var Route$10 = createFileRoute("/journeys")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./journal-D5CB4oYQ.mjs");
var Route$9 = createFileRoute("/journal")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./inquiry-CBgVPMah.mjs");
var Route$8 = createFileRoute("/inquiry")({
	head: () => ({
		meta: [
			{ title: "Groundless Inquiry — The Still Point" },
			{
				name: "description",
				content: "A 2-minute phenomenological exercise from UNDIVIDED."
			},
			{
				property: "og:title",
				content: "Groundless Inquiry — The Still Point"
			},
			{
				property: "og:description",
				content: "A 2-minute phenomenological exercise from UNDIVIDED."
			},
			{
				property: "og:url",
				content: "/inquiry"
			}
		],
		links: [{
			rel: "canonical",
			href: "/inquiry"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./gallery-C2IavjLf.mjs");
var Route$7 = createFileRoute("/gallery")({
	head: () => ({
		meta: [
			{ title: "Gallery — The Still Point" },
			{
				name: "description",
				content: "A visual journal from travel, nature, and sacred places. Photographs from the road and from home."
			},
			{
				property: "og:title",
				content: "Gallery — The Still Point"
			},
			{
				property: "og:description",
				content: "A visual journal from travel, nature, and sacred places."
			},
			{
				property: "og:url",
				content: "/gallery"
			}
		],
		links: [{
			rel: "canonical",
			href: "/gallery"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./founder-Dp4Go0Lv.mjs");
var Route$6 = createFileRoute("/founder")({
	head: () => ({
		meta: [
			{ title: "About the Founder — The Still Point" },
			{
				name: "description",
				content: "About the founder of The Still Point."
			},
			{
				property: "og:title",
				content: "About the Founder — The Still Point"
			},
			{
				property: "og:description",
				content: "About the founder of The Still Point."
			},
			{
				property: "og:url",
				content: "/founder"
			}
		],
		links: [{
			rel: "canonical",
			href: "/founder"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./discover-CeyXkx-K.mjs");
var Route$5 = createFileRoute("/discover")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./discourses-DKjVIimJ.mjs");
var Route$4 = createFileRoute("/discourses")({
	head: () => ({
		meta: [
			{ title: "Discourses — The Still Point" },
			{
				name: "description",
				content: "Curated public discourses, talks, satsangs, and philosophical discussions."
			},
			{
				property: "og:title",
				content: "Discourses — The Still Point"
			},
			{
				property: "og:description",
				content: "Curated public discourses, talks, satsangs, and philosophical discussions."
			},
			{
				property: "og:url",
				content: "/discourses"
			}
		],
		links: [{
			rel: "canonical",
			href: "/discourses"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./disclaimer-B5lqCpqG.mjs");
var Route$3 = createFileRoute("/disclaimer")({
	head: () => ({
		meta: [
			{ title: "Disclaimer — The Still Point" },
			{
				name: "description",
				content: "Disclaimer for The Still Point."
			},
			{
				property: "og:title",
				content: "Disclaimer — The Still Point"
			},
			{
				property: "og:description",
				content: "Disclaimer for The Still Point."
			},
			{
				property: "og:url",
				content: "/disclaimer"
			}
		],
		links: [{
			rel: "canonical",
			href: "/disclaimer"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./board-CSqrs9Fj.mjs");
var Route$2 = createFileRoute("/board")({
	head: () => ({
		meta: [
			{ title: "Still Board — The Still Point" },
			{
				name: "description",
				content: "Community board: 'I remain still because...' one-sentence posts."
			},
			{
				property: "og:title",
				content: "Still Board — The Still Point"
			},
			{
				property: "og:description",
				content: "Community board: 'I remain still because...' one-sentence posts."
			},
			{
				property: "og:url",
				content: "/board"
			}
		],
		links: [{
			rel: "canonical",
			href: "/board"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-Cby5_HXF.mjs");
var Route$1 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About — The Still Point" },
			{
				name: "description",
				content: "A digital sanctuary and transmission space at the intersection of non-dual wisdom and emerging technology."
			},
			{
				property: "og:title",
				content: "About — The Still Point"
			},
			{
				property: "og:description",
				content: "A digital sanctuary and transmission space at the intersection of non-dual wisdom and emerging technology."
			},
			{
				property: "og:url",
				content: "/about"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-B8Wno_6j.mjs");
var Route = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	meta: () => [
		{ title: "Stillpoint — Listen. Read. Question." },
		{
			name: "description",
			content: "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry. Discover curated discourses, sacred music, philosophical talks, and contemplative journeys."
		},
		{
			property: "og:title",
			content: "Stillpoint — Listen. Read. Question."
		},
		{
			property: "og:description",
			content: "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom. Curated discourses, sacred music, and philosophical exploration."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:site_name",
			content: "Stillpoint"
		},
		{
			property: "og:url",
			content: "https://stillpoint.com/"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: "Stillpoint — Listen. Read. Question."
		},
		{
			name: "twitter:description",
			content: "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom."
		}
	]
});
var TeachingsRoute = Route$16.update({
	id: "/teachings",
	path: "/teachings",
	getParentRoute: () => Route$17
});
var SitemapDotxmlRoute = Route$15.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$17
});
var ScoreRoute = Route$14.update({
	id: "/score",
	path: "/score",
	getParentRoute: () => Route$17
});
var PranaRoute = Route$13.update({
	id: "/prana",
	path: "/prana",
	getParentRoute: () => Route$17
});
var MandalaRoute = Route$12.update({
	id: "/mandala",
	path: "/mandala",
	getParentRoute: () => Route$17
});
var LiveRoute = Route$11.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => Route$17
});
var LibraryRoute = Route$20.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$17
});
var JourneysRoute = Route$10.update({
	id: "/journeys",
	path: "/journeys",
	getParentRoute: () => Route$17
});
var JournalRoute = Route$9.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$17
});
var InquiryRoute = Route$8.update({
	id: "/inquiry",
	path: "/inquiry",
	getParentRoute: () => Route$17
});
var GalleryRoute = Route$7.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$17
});
var FounderRoute = Route$6.update({
	id: "/founder",
	path: "/founder",
	getParentRoute: () => Route$17
});
var DiscoverRoute = Route$5.update({
	id: "/discover",
	path: "/discover",
	getParentRoute: () => Route$17
});
var DiscoursesRoute = Route$4.update({
	id: "/discourses",
	path: "/discourses",
	getParentRoute: () => Route$17
});
var DisclaimerRoute = Route$3.update({
	id: "/disclaimer",
	path: "/disclaimer",
	getParentRoute: () => Route$17
});
var BoardRoute = Route$2.update({
	id: "/board",
	path: "/board",
	getParentRoute: () => Route$17
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$17
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var TeachingsIndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => TeachingsRoute
});
var TeachingsSlugRoute = Route$23.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => TeachingsRoute
});
var ListenIdRoute = Route$21.update({
	id: "/listen/$id",
	path: "/listen/$id",
	getParentRoute: () => Route$17
});
var JourneyIdRoute = Route$19.update({
	id: "/journey/$id",
	path: "/journey/$id",
	getParentRoute: () => Route$17
});
var ChannelIdRoute = Route$18.update({
	id: "/channel/$id",
	path: "/channel/$id",
	getParentRoute: () => Route$17
});
var TeachingsRouteChildren = {
	TeachingsSlugRoute,
	TeachingsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	BoardRoute,
	DisclaimerRoute,
	DiscoursesRoute,
	DiscoverRoute,
	FounderRoute,
	GalleryRoute,
	InquiryRoute,
	JournalRoute,
	JourneysRoute,
	LibraryRoute,
	LiveRoute,
	MandalaRoute,
	PranaRoute,
	ScoreRoute,
	SitemapDotxmlRoute,
	TeachingsRoute: TeachingsRoute._addFileChildren(TeachingsRouteChildren),
	ChannelIdRoute,
	JourneyIdRoute,
	ListenIdRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
