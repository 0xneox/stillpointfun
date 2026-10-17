import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prana-C0YcHXxj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PranaGate() {
	const [isActive, setIsActive] = (0, import_react.useState)(false);
	const [phase, setPhase] = (0, import_react.useState)(0);
	const [timeRemaining, setTimeRemaining] = (0, import_react.useState)(90);
	const timerRef = (0, import_react.useRef)(null);
	const phases = (0, import_react.useMemo)(() => [
		{
			duration: 15,
			instruction: "Close your eyes. Feel your breath as it enters and leaves."
		},
		{
			duration: 20,
			instruction: "Notice the space between breaths. The stillness that is always here."
		},
		{
			duration: 20,
			instruction: "You are the awareness watching the breath. Not the breath itself."
		},
		{
			duration: 20,
			instruction: "Rest as that awareness. The witness never moves."
		},
		{
			duration: 15,
			instruction: "When ready, open your eyes. Carry this stillness forward."
		}
	], []);
	(0, import_react.useEffect)(() => {
		if (isActive && timeRemaining > 0) timerRef.current = setInterval(() => {
			setTimeRemaining((prev) => {
				const newTime = prev - 1;
				if (newTime === 0) {
					setIsActive(false);
					const savedData = JSON.parse(localStorage.getItem("stillPointData") || "{\"totalMinutes\":0,\"practices\":[]}");
					savedData.totalMinutes += 90;
					savedData.practices.push({
						type: "Prāṇa Gate",
						duration: 90,
						timestamp: Date.now()
					});
					localStorage.setItem("stillPointData", JSON.stringify(savedData));
				}
				return newTime;
			});
		}, 1e3);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isActive, timeRemaining]);
	(0, import_react.useEffect)(() => {
		if (isActive) {
			let elapsed = 0;
			phases.forEach((p, i) => {
				elapsed += p.duration;
				if (90 - timeRemaining >= elapsed - p.duration && 90 - timeRemaining < elapsed) setPhase(i);
			});
		}
	}, [
		isActive,
		timeRemaining,
		phases
	]);
	const startPractice = () => {
		setIsActive(true);
		setTimeRemaining(90);
		setPhase(0);
	};
	const resetPractice = () => {
		setIsActive(false);
		setTimeRemaining(90);
		setPhase(0);
		if (timerRef.current) clearInterval(timerRef.current);
	};
	const formatTime = (seconds) => {
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "container-editorial pt-24 pb-16 border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "Practice Tool"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl",
					children: "Prāṇa Gate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed",
					children: "A 90-second guided attention tool to enter the still center of awareness."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-24",
			children: !isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl md:text-3xl leading-[1.4] text-balance",
							children: "Enter through the breath. Exit as the witness."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base opacity-70 leading-relaxed max-w-xl mx-auto",
							children: "This practice guides you through five phases of attention, each designed to deepen recognition of the still center that never moves."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-8 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: startPractice,
							className: "px-12 py-6 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300",
							children: "Begin Practice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
							children: "90 seconds · No experience needed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-12 border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
								children: "The phases"
							}), phases.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-accent text-sm whitespace-nowrap",
									children: [p.duration, "s"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base opacity-80",
									children: p.instruction
								})]
							}, i))]
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-8xl md:text-9xl tracking-tight",
							children: formatTime(timeRemaining)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-foreground/20" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
							children: [
								"Phase ",
								phase + 1,
								" of ",
								phases.length
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl md:text-3xl leading-[1.4] text-balance max-w-xl mx-auto",
							children: phases[phase]?.instruction
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-md mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px bg-foreground/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-foreground transition-all duration-1000 ease-linear",
								style: { width: `${(90 - timeRemaining) / 90 * 100}%` }
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: resetPractice,
							className: "px-8 py-3 border border-foreground/30 text-foreground/70 font-mono text-[10px] tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-all",
							children: "End Practice"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface text-surface-foreground py-24 px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "About this practice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-6 text-lg leading-[1.7] opacity-90",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prāṇa Gate draws from the Vijñāna Bhairava Tantra — an ancient Kashmir Shaivist text that offers 112 practices to recognize the divine in everyday experience." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The breath is the bridge. By attending to the space between breaths, we discover the stillness that precedes all movement. The witness of the breath is not the breath. You are that witness." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "italic opacity-80",
							children: "This is not relaxation. This is recognition. The center is already here."
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-24 border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-center gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "← Return Home"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/inquiry",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "Try Groundless Inquiry →"
				})]
			})
		})
	] });
}
//#endregion
export { PranaGate as component };
