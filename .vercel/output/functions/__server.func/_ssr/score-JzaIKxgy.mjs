import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-JzaIKxgy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PracticeLog() {
	const [totalMinutes, setTotalMinutes] = (0, import_react.useState)(() => {
		return JSON.parse(localStorage.getItem("stillPointData") || "{\"totalMinutes\":0,\"practices\":[]}").totalMinutes;
	});
	const [practices, setPractices] = (0, import_react.useState)(() => {
		return JSON.parse(localStorage.getItem("stillPointData") || "{\"totalMinutes\":0,\"practices\":[]}").practices || [];
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "container-editorial pt-24 pb-16 border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "Personal Practice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl",
					children: "Practice Log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed",
					children: "Your private record of contemplative practice. Stored locally on your device."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-5xl mx-auto px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: "Total Practice Minutes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-6xl md:text-7xl",
							children: totalMinutes.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-50 text-sm",
								children: "Private · Local storage"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: "Sessions Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-6xl md:text-7xl",
							children: practices.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-50 text-sm",
								children: "Prāṇa Gate · Inquiry"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface text-surface-foreground py-24 px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
						children: "Your Sessions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display italic text-4xl md:text-5xl mt-6 mb-12",
						children: "Recent Practice"
					}),
					practices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-12 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg opacity-70",
							children: "No practice sessions recorded yet."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-50",
							children: "Complete a Prāṇa Gate or Inquiry session to begin logging."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: practices.slice().reverse().map((practice, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-4 border-t border-surface-foreground/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm opacity-80",
									children: practice.type
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-lg",
									children: [practice.duration, " min"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs opacity-50",
									children: new Date(practice.timestamp).toLocaleDateString()
								})]
							})]
						}, i))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface text-surface-foreground py-24 px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto text-center space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display italic text-4xl md:text-5xl text-balance",
						children: "Begin Your Practice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg opacity-80 leading-relaxed",
						children: "Complete a Prāṇa Gate or Groundless Inquiry session to log your practice."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-6 flex flex-col sm:flex-row gap-4 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/prana",
							className: "px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors",
							children: "Enter Prāṇa Gate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/inquiry",
							className: "px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors",
							children: "Begin Inquiry"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-24 border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-center gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/inquiry",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "← Groundless Inquiry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/board",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "Still Board →"
				})]
			})
		})
	] });
}
//#endregion
export { PracticeLog as component };
