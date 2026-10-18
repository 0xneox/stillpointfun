import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Breadcrumbs } from "./Breadcrumbs-DTWu_Qqo.mjs";
import { i as LIBRARY_ITEMS, n as FOUNDATIONAL_BOOKS, o as getLibraryPdfUrl, r as LIBRARY_CATEGORIES, s as getTotalLibraryStats, t as ARCHIVAL_PDF_ITEMS } from "./library-CWueu09J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-CONpu2o2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Library() {
	const stats = (0, import_react.useMemo)(() => getTotalLibraryStats(), []);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const [activeFormat, setActiveFormat] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [viewMode, setViewMode] = (0, import_react.useState)("grid");
	const [readingDoc, setReadingDoc] = (0, import_react.useState)(null);
	const [isSettingsOpen, setIsSettingsOpen] = (0, import_react.useState)(false);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const [customBaseUrl, setCustomBaseUrl] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem("stillpoint_library_base_url") || "";
		return "";
	});
	const categoryCounts = (0, import_react.useMemo)(() => {
		const counts = { All: LIBRARY_ITEMS.length };
		LIBRARY_ITEMS.forEach((item) => {
			const cat = item.category || "General";
			counts[cat] = (counts[cat] || 0) + 1;
		});
		return counts;
	}, []);
	const filteredItems = (0, import_react.useMemo)(() => {
		const q = searchQuery.trim().toLowerCase();
		return LIBRARY_ITEMS.filter((item) => {
			if (activeCategory !== "All" && item.category !== activeCategory) return false;
			if (activeFormat !== "all") {
				if (activeFormat === "pdf" && item.format !== "pdf") return false;
				if (activeFormat === "book" && item.format !== "book") return false;
			}
			if (q) {
				const titleMatch = item.title.toLowerCase().includes(q);
				const authorMatch = item.author.toLowerCase().includes(q);
				const traditionMatch = item.tradition?.toLowerCase().includes(q) || false;
				const categoryMatch = item.category?.toLowerCase().includes(q) || false;
				const descriptionMatch = item.description?.toLowerCase().includes(q) || false;
				const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(q));
				const fileMatch = item.fileName?.toLowerCase().includes(q) || false;
				return titleMatch || authorMatch || traditionMatch || categoryMatch || descriptionMatch || tagsMatch || fileMatch;
			}
			return true;
		});
	}, [
		activeCategory,
		activeFormat,
		searchQuery
	]);
	const handleCopyLink = (item) => {
		const url = item.downloadUrl || item.sourceUrl || window.location.href;
		const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
		navigator.clipboard.writeText(fullUrl);
		setCopiedId(item.id);
		setTimeout(() => setCopiedId(null), 2e3);
	};
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setReadingDoc(null);
				setIsSettingsOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	const handleSaveStorage = (url) => {
		const cleaned = url.trim().replace(/\/$/, "");
		setCustomBaseUrl(cleaned);
		if (typeof window !== "undefined") if (cleaned) localStorage.setItem("stillpoint_library_base_url", cleaned);
		else localStorage.removeItem("stillpoint_library_base_url");
		setIsSettingsOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-6xl mx-auto px-6 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Library" }] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-6 mb-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-3 py-1 bg-surface/80 border border-border rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[9px] tracking-[0.25em] uppercase opacity-75",
									children: [
										"Sacred Repository · ",
										stats.totalDocuments,
										" Archival Manuscripts"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
								children: "Archival Library & Treatises"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed",
								children: "A comprehensive, digital collection of primary Sanskrit, Vedantic, Tantric, and contemplative texts preserved for direct inquiry, in-browser study, and archival research."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-3 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border",
										children: [stats.totalDocuments, " Manuscripts"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border",
										children: [stats.totalMegabytes, " MB Total Archive"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border",
										children: "6 Philosophical Traditions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setIsSettingsOpen(true),
										className: "px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-dashed border-border hover:border-foreground/60 transition-colors flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚙ Storage Settings" }), customBaseUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" })]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-12 p-6 bg-surface/40 border border-border rounded-sm flex flex-col md:flex-row items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-medium",
									children: "Audio Sanctuary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl",
									children: "Sacred Audiobooks & Direct Pointings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-sans text-xs opacity-75",
									children: "Listen to 236 spoken chapters across 16 traditions (Ramana Maharshi, Nisargadatta, Longchenpa, Zen, Sufi, Christian Mystics)."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/audiobooks",
							className: "px-5 py-2.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background whitespace-nowrap hover:opacity-90 transition-opacity",
							children: "Enter Audiobooks →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 max-w-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search across all 88 manuscripts, authors, traditions, or tags...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "w-full px-4 py-2.5 pl-10 font-mono text-xs bg-surface/30 border border-border rounded-none focus:outline-none focus:border-foreground transition-colors"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-3 top-2.5 opacity-40 text-xs",
									children: "🔍"
								}),
								searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchQuery(""),
									className: "absolute right-3 top-2.5 font-mono text-xs opacity-50 hover:opacity-100",
									children: "✕"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border flex items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setActiveFormat("all"),
										className: `px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFormat === "all" ? "bg-foreground text-background" : "hover:bg-surface"}`,
										children: "All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setActiveFormat("pdf"),
										className: `px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFormat === "pdf" ? "bg-foreground text-background" : "hover:bg-surface"}`,
										children: [
											"PDFs (",
											ARCHIVAL_PDF_ITEMS.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setActiveFormat("book"),
										className: `px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFormat === "book" ? "bg-foreground text-background" : "hover:bg-surface"}`,
										children: [
											"Books (",
											FOUNDATIONAL_BOOKS.length,
											")"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border hidden sm:flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setViewMode("grid"),
									className: `p-1.5 text-xs transition-colors ${viewMode === "grid" ? "bg-foreground text-background" : "hover:bg-surface"}`,
									title: "Grid view",
									children: "⊞"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setViewMode("list"),
									className: `p-1.5 text-xs transition-colors ${viewMode === "list" ? "bg-foreground text-background" : "hover:bg-surface"}`,
									title: "List view",
									children: "☰"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-10 flex flex-wrap items-center gap-2",
						children: LIBRARY_CATEGORIES.map((cat) => {
							const count = categoryCounts[cat] || 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveCategory(cat),
								className: `px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase border transition-all ${activeCategory === cat ? "bg-foreground text-background border-foreground font-medium shadow-sm" : "border-border bg-background/50 hover:bg-surface text-foreground/80 hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1.5 opacity-50",
									children: [
										"(",
										count,
										")"
									]
								})]
							}, cat);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs uppercase tracking-widest opacity-60",
							children: [
								"Showing ",
								filteredItems.length,
								" of ",
								LIBRARY_ITEMS.length,
								" documents",
								activeCategory !== "All" && ` · ${activeCategory}`,
								searchQuery && ` · Matching "${searchQuery}"`
							]
						}), (activeCategory !== "All" || activeFormat !== "all" || searchQuery) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setActiveCategory("All");
								setActiveFormat("all");
								setSearchQuery("");
							},
							className: "font-mono text-[10px] uppercase tracking-wider text-accent hover:underline",
							children: "Reset Filters"
						})]
					}),
					filteredItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-16 text-center border border-dashed border-border rounded-sm space-y-4 my-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-widest opacity-40",
								children: "No manuscripts found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: "No texts matched your criteria"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-sans text-sm opacity-60 max-w-md mx-auto",
								children: "Try adjusting your search terms, changing the tradition filter, or resetting all filters."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setActiveCategory("All");
									setActiveFormat("all");
									setSearchQuery("");
								},
								className: "px-4 py-2 font-mono text-[10px] uppercase tracking-widest border border-border hover:border-foreground",
								children: "Clear Search & Show All"
							})
						]
					}),
					viewMode === "grid" && filteredItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: filteredItems.map((item) => {
							const isPdf = item.format === "pdf" || Boolean(item.fileName);
							const resolvedUrl = item.fileName ? getLibraryPdfUrl(item.fileName) : item.sourceUrl;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 bg-surface/20 border border-border rounded-sm flex flex-col justify-between hover:border-foreground/40 transition-colors group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2 py-0.5 bg-accent/10 text-accent font-mono text-[9px] tracking-widest uppercase rounded",
													children: item.format
												}),
												item.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2 py-0.5 bg-surface text-foreground/70 font-mono text-[9px] tracking-wider uppercase border border-border",
													children: item.category
												}),
												item.sizeFormatted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[9px] opacity-40 ml-auto",
													children: item.sizeFormatted
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl md:text-2xl group-hover:text-accent transition-colors leading-snug",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-xs opacity-75 font-medium",
													children: item.author
												}),
												item.translator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-mono text-[11px] opacity-50",
													children: ["Translated by ", item.translator]
												}),
												item.tradition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-[10px] opacity-45",
													children: item.tradition
												})
											]
										}),
										item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-sans text-xs opacity-70 line-clamp-3 leading-relaxed",
											children: item.description
										}),
										item.tags && item.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1.5 pt-1",
											children: item.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setSearchQuery(tag),
												className: "font-mono text-[9px] opacity-40 hover:opacity-90 hover:text-accent transition-all",
												children: ["#", tag]
											}, tag))
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: isPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setReadingDoc(item),
											className: "px-3.5 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity",
											children: "Read Online"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: resolvedUrl,
											download: item.fileName || true,
											target: "_blank",
											rel: "noreferrer",
											className: "px-3 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground transition-colors",
											title: "Direct download PDF",
											children: "Download"
										})] }) : item.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: item.sourceUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "px-3.5 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-all",
											children: "Access Work →"
										}) : null
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleCopyLink(item),
										className: "font-mono text-[10px] tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1",
										title: "Copy link",
										children: copiedId === item.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-accent font-semibold",
											children: "✓ Copied"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔗 Share" })
									})]
								})]
							}, item.id);
						})
					}),
					viewMode === "list" && filteredItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: filteredItems.map((item) => {
							const isPdf = item.format === "pdf" || Boolean(item.fileName);
							const resolvedUrl = item.fileName ? getLibraryPdfUrl(item.fileName) : item.sourceUrl;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 bg-surface/20 border border-border rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-foreground/40 transition-colors group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1.5 py-0.5 bg-accent/10 text-accent font-mono text-[9px] tracking-widest uppercase rounded",
													children: item.format
												}),
												item.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] opacity-50",
													children: item.category
												}),
												item.sizeFormatted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-[9px] opacity-40",
													children: ["· ", item.sizeFormatted]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl group-hover:text-accent transition-colors truncate",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs opacity-70",
											children: [
												item.author,
												item.translator && ` · Translated by ${item.translator}`,
												item.tradition && ` · ${item.tradition}`
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 w-full md:w-auto justify-end",
									children: [isPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setReadingDoc(item),
										className: "px-3.5 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity",
										children: "Read Online"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: resolvedUrl,
										download: item.fileName || true,
										target: "_blank",
										rel: "noreferrer",
										className: "px-3 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground transition-colors",
										children: "Download"
									})] }) : item.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.sourceUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "px-3.5 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-all",
										children: "Access →"
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleCopyLink(item),
										className: "px-2 py-1.5 font-mono text-[10px] opacity-50 hover:opacity-100",
										title: "Copy link",
										children: copiedId === item.id ? "✓" : "🔗"
									})]
								})]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-24 pt-12 border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-sm opacity-60 leading-relaxed max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-widest uppercase",
									children: "On Archival Preservation and Rights"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This repository is maintained for direct spiritual inquiry, contemplation, scholarly research, and non-commercial preservation of wisdom traditions. Wherever redistribution is authorized, texts are presented in high-fidelity PDF format with instant in-browser reading capability." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collection grows through careful curation, respecting both the essential need for open wisdom access and the rights of translators, authors, and publishers." })
							]
						})
					})
				]
			}),
			readingDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-3 border-b border-border bg-surface/50 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 py-0.5 bg-accent/20 text-accent font-mono text-[9px] uppercase tracking-widest",
							children: "PDF Reader"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-sm md:text-base truncate",
								children: readingDoc.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] opacity-60 truncate",
								children: [
									readingDoc.author,
									" ",
									readingDoc.sizeFormatted && `· ${readingDoc.sizeFormatted}`
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							readingDoc.fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: getLibraryPdfUrl(readingDoc.fileName),
								target: "_blank",
								rel: "noreferrer",
								className: "hidden sm:inline-flex px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-border hover:border-foreground transition-colors",
								children: "New Window ↗"
							}),
							readingDoc.fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: getLibraryPdfUrl(readingDoc.fileName),
								download: readingDoc.fileName,
								className: "px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:opacity-90 transition-opacity",
								children: "Download"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setReadingDoc(null),
								className: "px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-border hover:bg-surface transition-colors",
								title: "Close viewer (Esc)",
								children: "✕ Close"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 w-full h-full p-2 md:p-4 bg-background flex flex-col",
					children: readingDoc.fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: `${getLibraryPdfUrl(readingDoc.fileName)}#toolbar=1&navpanes=0`,
						title: readingDoc.title,
						className: "w-full flex-1 border border-border/60 rounded-sm bg-neutral-950"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 flex items-center justify-center p-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 max-w-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs uppercase tracking-widest opacity-50",
									children: "External Resource"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: readingDoc.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm opacity-70",
									children: "This item is hosted through an authorized archive. Open the external reading portal to view."
								}),
								readingDoc.sourceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: readingDoc.sourceUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-block px-5 py-2.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background",
									children: "Open in External Archive →"
								})
							]
						})
					})
				})]
			}),
			isSettingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border border-border p-6 md:p-8 max-w-md w-full rounded-sm shadow-xl space-y-5 animate-in fade-in duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg",
								children: "Library Storage Configuration"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsSettingsOpen(false),
								className: "font-mono text-xs opacity-50 hover:opacity-100",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-sans text-xs opacity-75 leading-relaxed",
							children: [
								"By default, PDFs are served locally from the workspace",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "px-1 py-0.5 bg-surface text-accent font-mono text-[10px]",
									children: "/Library"
								}),
								" ",
								"folder. If deploying to Vercel, Cloudflare, or an external CDN, provide your base URL below."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-70 block",
									children: "Custom Storage Base URL"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "https://pub-xxx.r2.dev/Library or https://your-bucket.s3.amazonaws.com",
									defaultValue: customBaseUrl,
									id: "library-base-url-input",
									className: "w-full px-3 py-2 font-mono text-xs bg-surface/50 border border-border rounded-none focus:outline-none focus:border-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[9px] opacity-50",
									children: [
										"Leave blank to use default local path (",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-accent",
											children: "/Library"
										}),
										")."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleSaveStorage(""),
								className: "font-mono text-[10px] uppercase tracking-wider opacity-60 hover:opacity-100",
								children: "Reset Default"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIsSettingsOpen(false),
									className: "px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-border hover:bg-surface",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										const el = document.getElementById("library-base-url-input");
										handleSaveStorage(el ? el.value : "");
									},
									className: "px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:opacity-90",
									children: "Save URL"
								})]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Library as component };
