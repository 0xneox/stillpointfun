import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiry-CBgVPMah.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GroundlessInquiry() {
	const [isActive, setIsActive] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [timeRemaining, setTimeRemaining] = (0, import_react.useState)(120);
	const timerRef = (0, import_react.useRef)(null);
	const steps = (0, import_react.useMemo)(() => [
		{
			duration: 20,
			instruction: "Notice you are aware. Right now, you know you are reading these words."
		},
		{
			duration: 25,
			instruction: "Look for the one who is aware. Can you find the boundary between awareness and what it's aware of?"
		},
		{
			duration: 25,
			instruction: "Notice: awareness has no shape, no size, no location. It is not an object."
		},
		{
			duration: 25,
			instruction: "You are not the thought 'I am'. You are the awareness that knows the thought."
		},
		{
			duration: 25,
			instruction: "Rest as this groundless awareness. No ground needed. You are already the space."
		}
	], []);
	(0, import_react.useEffect)(() => {
		if (isActive && timeRemaining > 0) timerRef.current = setInterval(() => {
			setTimeRemaining((prev) => {
				const newTime = prev - 1;
				if (newTime === 0) {
					setIsActive(false);
					const savedData = JSON.parse(localStorage.getItem("stillPointData") || "{\"totalMinutes\":0,\"practices\":[]}");
					savedData.totalMinutes += 120;
					savedData.practices.push({
						type: "Groundless Inquiry",
						duration: 120,
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
			steps.forEach((s, i) => {
				elapsed += s.duration;
				if (120 - timeRemaining >= elapsed - s.duration && 120 - timeRemaining < elapsed) setStep(i);
			});
		}
	}, [
		isActive,
		timeRemaining,
		steps
	]);
	const startInquiry = () => {
		setIsActive(true);
		setTimeRemaining(120);
		setStep(0);
	};
	const resetInquiry = () => {
		setIsActive(false);
		setTimeRemaining(120);
		setStep(0);
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
					children: "Groundless Inquiry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed",
					children: "A 2-minute phenomenological exercise to recognize the awareness that has no ground."
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
							children: "Look for the looker. Find what cannot be found."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base opacity-70 leading-relaxed max-w-xl mx-auto",
							children: "This inquiry guides you through five steps of direct investigation into the nature of awareness itself — not as an idea, but as immediate experience."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-8 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: startInquiry,
							className: "px-12 py-6 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300",
							children: "Begin Inquiry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
							children: "2 minutes · Direct investigation"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-12 border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
								children: "The steps"
							}), steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-accent text-sm whitespace-nowrap",
									children: [s.duration, "s"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base opacity-80",
									children: s.instruction
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
								"Step ",
								step + 1,
								" of ",
								steps.length
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl md:text-3xl leading-[1.4] text-balance max-w-xl mx-auto",
							children: steps[step]?.instruction
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-md mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px bg-foreground/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-foreground transition-all duration-1000 ease-linear",
								style: { width: `${(120 - timeRemaining) / 120 * 100}%` }
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: resetInquiry,
							className: "px-8 py-3 border border-foreground/30 text-foreground/70 font-mono text-[10px] tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-all",
							children: "End Inquiry"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Groundless Inquiry is drawn from the direct path of Advaita Vedanta and Kashmir Shaivism — particularly the practice of Ātma-vichāra (self-inquiry)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The question is not \"Who am I?\" as a conceptual puzzle. It is a direct pointing to what is already aware. What you are looking for is what is looking. Awareness has no ground because it is the ground of all experience." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "italic opacity-80",
							children: "You cannot find it as an object because you are it. This is not philosophy. This is recognition. The center is already here."
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
					to: "/prana",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "← Try Prāṇa Gate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/score",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "View Live Score →"
				})]
			})
		})
	] });
}
//#endregion
export { GroundlessInquiry as component };
