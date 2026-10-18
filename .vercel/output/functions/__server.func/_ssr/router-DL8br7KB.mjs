import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CONTENT } from "./content-jEEGWz5L.mjs";
import { t as Route$20 } from "./channel._id-BqhQ4v3z.mjs";
import { a as Route$21, i as LIBRARY_ITEMS } from "./library-CWueu09J.mjs";
import { n as POSTS } from "./posts-WTOgWknE.mjs";
import { t as Route$22 } from "./listen._id-T4a1fDl8.mjs";
import { t as useLocalStorage } from "./useLocalStorage-AoNhR2OM.mjs";
import { t as Route$23 } from "./teachings.index-D_YzzO_Y.mjs";
import { t as Route$24 } from "./teachings._slug-Bohr5HEb.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DL8br7KB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CTUj6spb.css";
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
				route: "/library",
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
		else if (result.route === "/library") navigate({ to: "/library" });
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
		to: "/audiobooks",
		label: "AUDIOBOOKS"
	},
	{
		to: "/library",
		label: "LIBRARY"
	},
	{
		to: "/writings",
		label: "WRITINGS"
	},
	{
		to: "/journal",
		label: "JOURNAL"
	},
	{
		to: "/discourses",
		label: "DISCOURSES"
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
								to: "/writings",
								className: "hover:text-accent transition-colors",
								children: "Writings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "hover:text-accent transition-colors",
								children: "Journal & Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/discourses",
								className: "hover:text-accent transition-colors",
								children: "Discourses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/audiobooks",
								className: "hover:text-accent transition-colors",
								children: "Audiobooks"
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
	const [isDismissed, setIsDismissed] = (0, import_react.useState)(false);
	if (!currentItem || isDismissed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom shadow-2xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-editorial",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-3.5 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/listen/$id",
					params: { id: currentItem.id },
					className: "flex items-center gap-3.5 flex-1 min-w-0 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-11 h-11 rounded-sm bg-surface overflow-hidden border border-border/80 shrink-0 group-hover:border-accent transition-colors flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `https://img.youtube.com/vi/${currentItem.youtube_video_id}/default.jpg`,
							alt: currentItem.title,
							className: "w-full h-full object-cover",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[8px] uppercase tracking-widest text-accent font-medium",
									children: "Now Playing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[8px] uppercase tracking-widest opacity-40",
									children: "· Pure Audio"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm truncate group-hover:text-accent transition-colors",
								children: currentItem.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] opacity-60 truncate",
								children: [
									currentItem.artist_or_speaker,
									" · ",
									currentItem.channel
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/listen/$id",
						params: { id: currentItem.id },
						className: "px-3.5 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors",
						children: "Open Deck ↗"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsDismissed(true),
						className: "p-1.5 font-mono text-xs opacity-40 hover:opacity-100 transition-opacity",
						title: "Dismiss player bar",
						children: "✕"
					})]
				})]
			})
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
var Route$19 = createRootRouteWithContext()({
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
	const { queryClient } = Route$19.useRouteContext();
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
var $$splitComponentImporter$16 = () => import("./writings-_ysDaFIC.mjs");
var Route$18 = createFileRoute("/writings")({
	head: () => ({
		meta: [
			{ title: "Writings & Philosophical Essays — Stillpoint" },
			{
				name: "description",
				content: "Original essays, contemplative reflections, and exploratory writings on consciousness, philosophy, Advaita, Kashmir Shaivism, and the modern mind."
			},
			{
				property: "og:title",
				content: "Writings & Philosophical Essays — Stillpoint"
			},
			{
				property: "og:description",
				content: "Original essays and reflections on consciousness, philosophy, tradition, and the encounter between the ancient and the contemporary."
			},
			{
				property: "og:url",
				content: "/writings"
			}
		],
		links: [{
			rel: "canonical",
			href: "/writings"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./teachings-ChTv-G9p.mjs");
var Route$17 = createFileRoute("/teachings")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var BASE_URL = "";
var Route$16 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
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
var $$splitComponentImporter$14 = () => import("./score-JzaIKxgy.mjs");
var Route$15 = createFileRoute("/score")({
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
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./prana-C0YcHXxj.mjs");
var Route$14 = createFileRoute("/prana")({
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
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./notes-cwPi86dW.mjs");
var Route$13 = createFileRoute("/notes")({
	beforeLoad: () => {
		throw redirect({ to: "/journal" });
	},
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
var $$splitComponentImporter$10 = () => import("./journal-DKJKaJRN.mjs");
var Route$10 = createFileRoute("/journal")({
	head: () => ({
		meta: [
			{ title: "Journal & Field Notes — The Still Point" },
			{
				name: "description",
				content: "Tactile contemplative journal and field notes board. Capture fleeting insights, inquiries, reflections, and quotes in stillness."
			},
			{
				property: "og:title",
				content: "Journal & Field Notes — The Still Point"
			},
			{
				property: "og:description",
				content: "Tactile contemplative journal and field notes board. Capture fleeting insights, inquiries, reflections, and quotes in stillness."
			},
			{
				property: "og:url",
				content: "/journal"
			}
		],
		links: [{
			rel: "canonical",
			href: "/journal"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./inquiry-CBgVPMah.mjs");
var Route$9 = createFileRoute("/inquiry")({
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
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./gallery-C2IavjLf.mjs");
var Route$8 = createFileRoute("/gallery")({
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./founder-Dp4Go0Lv.mjs");
var Route$7 = createFileRoute("/founder")({
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
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./discover-DfZ-dPVT.mjs");
var Route$6 = createFileRoute("/discover")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./discourses-GMfvtAFz.mjs");
var Route$5 = createFileRoute("/discourses")({
	head: () => ({
		meta: [
			{ title: "Discourses & Audio Archives — The Still Point" },
			{
				name: "description",
				content: "Curated public discourses, spoken audio archives, talks, and philosophical lectures including Alan Watts, Ram Dass, Neem Karoli Baba, Ramana Maharshi, Samadhi, Advaita, and Zen."
			},
			{
				property: "og:title",
				content: "Discourses & Audio Archives — The Still Point"
			},
			{
				property: "og:description",
				content: "Curated public discourses, spoken audio archives, talks, and philosophical lectures including Alan Watts, Ram Dass, Neem Karoli Baba, Ramana Maharshi, Samadhi, Advaita, and Zen."
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./disclaimer-B5lqCpqG.mjs");
var Route$4 = createFileRoute("/disclaimer")({
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
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./board-BTP35ivF.mjs");
var Route$3 = createFileRoute("/board")({
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
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./audiobooks-RlasmFtr.mjs");
var Route$2 = createFileRoute("/audiobooks")({
	head: () => ({
		meta: [
			{ title: "Sacred Audiobooks & Direct Pointings — Stillpoint" },
			{
				name: "description",
				content: "High-fidelity spoken audiobooks, contemplative texts, and direct pointings from Ramana Maharshi, Nisargadatta, Longchenpa, Padmasambhava, Zen, Sufi, and Christian Mystics."
			},
			{
				property: "og:title",
				content: "Sacred Audiobooks & Direct Pointings — Stillpoint"
			},
			{
				property: "og:description",
				content: "High-fidelity spoken audiobooks and contemplative treatises across 16 traditions and 236 chapters."
			},
			{
				property: "og:url",
				content: "/audiobooks"
			}
		],
		links: [{
			rel: "canonical",
			href: "/audiobooks"
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
var $$splitComponentImporter = () => import("./routes-CzDBCbZg.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Stillpoint — Listen. Read. Question." },
		{
			name: "description",
			content: "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry. Discover curated discourses, sacred music, philosophical talks, and sacred audiobooks."
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
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var WritingsRoute = Route$18.update({
	id: "/writings",
	path: "/writings",
	getParentRoute: () => Route$19
});
var TeachingsRoute = Route$17.update({
	id: "/teachings",
	path: "/teachings",
	getParentRoute: () => Route$19
});
var SitemapDotxmlRoute = Route$16.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$19
});
var ScoreRoute = Route$15.update({
	id: "/score",
	path: "/score",
	getParentRoute: () => Route$19
});
var PranaRoute = Route$14.update({
	id: "/prana",
	path: "/prana",
	getParentRoute: () => Route$19
});
var NotesRoute = Route$13.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => Route$19
});
var MandalaRoute = Route$12.update({
	id: "/mandala",
	path: "/mandala",
	getParentRoute: () => Route$19
});
var LiveRoute = Route$11.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => Route$19
});
var LibraryRoute = Route$21.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$19
});
var JournalRoute = Route$10.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$19
});
var InquiryRoute = Route$9.update({
	id: "/inquiry",
	path: "/inquiry",
	getParentRoute: () => Route$19
});
var GalleryRoute = Route$8.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$19
});
var FounderRoute = Route$7.update({
	id: "/founder",
	path: "/founder",
	getParentRoute: () => Route$19
});
var DiscoverRoute = Route$6.update({
	id: "/discover",
	path: "/discover",
	getParentRoute: () => Route$19
});
var DiscoursesRoute = Route$5.update({
	id: "/discourses",
	path: "/discourses",
	getParentRoute: () => Route$19
});
var DisclaimerRoute = Route$4.update({
	id: "/disclaimer",
	path: "/disclaimer",
	getParentRoute: () => Route$19
});
var BoardRoute = Route$3.update({
	id: "/board",
	path: "/board",
	getParentRoute: () => Route$19
});
var AudiobooksRoute = Route$2.update({
	id: "/audiobooks",
	path: "/audiobooks",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var TeachingsIndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => TeachingsRoute
});
var TeachingsSlugRoute = Route$24.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => TeachingsRoute
});
var ListenIdRoute = Route$22.update({
	id: "/listen/$id",
	path: "/listen/$id",
	getParentRoute: () => Route$19
});
var ChannelIdRoute = Route$20.update({
	id: "/channel/$id",
	path: "/channel/$id",
	getParentRoute: () => Route$19
});
var TeachingsRouteChildren = {
	TeachingsSlugRoute,
	TeachingsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AudiobooksRoute,
	BoardRoute,
	DisclaimerRoute,
	DiscoursesRoute,
	DiscoverRoute,
	FounderRoute,
	GalleryRoute,
	InquiryRoute,
	JournalRoute,
	LibraryRoute,
	LiveRoute,
	MandalaRoute,
	NotesRoute,
	PranaRoute,
	ScoreRoute,
	SitemapDotxmlRoute,
	TeachingsRoute: TeachingsRoute._addFileChildren(TeachingsRouteChildren),
	WritingsRoute,
	ChannelIdRoute,
	ListenIdRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
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
