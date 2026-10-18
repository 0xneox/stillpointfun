import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-BTP35ivF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StillBoard() {
	const [posts, setPosts] = (0, import_react.useState)(() => {
		const saved = localStorage.getItem("stillBoardPosts");
		if (saved) return JSON.parse(saved);
		return [
			{
				id: 1,
				text: "I remain still because the witness never moves.",
				author: "Anonymous",
				time: "2m ago"
			},
			{
				id: 2,
				text: "I remain still because chaos is just motion recognized.",
				author: "Anonymous",
				time: "5m ago"
			},
			{
				id: 3,
				text: "I remain still because the center is already here.",
				author: "Anonymous",
				time: "8m ago"
			},
			{
				id: 4,
				text: "I remain still because I am not the story.",
				author: "Anonymous",
				time: "12m ago"
			},
			{
				id: 5,
				text: "I remain still because awareness has no ground.",
				author: "Anonymous",
				time: "15m ago"
			},
			{
				id: 6,
				text: "I remain still because the market moves, I don't.",
				author: "Anonymous",
				time: "18m ago"
			},
			{
				id: 7,
				text: "I remain still because recognition is immediate.",
				author: "Anonymous",
				time: "22m ago"
			},
			{
				id: 8,
				text: "I remain still because there is nowhere to go.",
				author: "Anonymous",
				time: "25m ago"
			}
		];
	});
	(0, import_react.useEffect)(() => {
		localStorage.setItem("stillBoardPosts", JSON.stringify(posts));
	}, [posts]);
	const [newPost, setNewPost] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (newPost.trim()) {
			setIsSubmitting(true);
			setTimeout(() => {
				setPosts([{
					id: posts.length + 1,
					text: newPost.trim(),
					author: "Anonymous",
					time: "Just now"
				}, ...posts]);
				setNewPost("");
				setIsSubmitting(false);
			}, 1e3);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "container-editorial pt-24 pb-16 border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "Community Board"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl",
					children: "Still Board"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed",
					children: "One-sentence posts: \"I remain still because...\""
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-12 border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-3",
					children: "Complete the sentence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl opacity-80 italic",
						children: "I remain still because"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: newPost,
						onChange: (e) => setNewPost(e.target.value),
						placeholder: "...",
						className: "flex-1 bg-transparent border-b border-border py-3 font-display text-2xl opacity-80 italic placeholder:opacity-30 focus:outline-none focus:border-foreground transition-colors",
						maxLength: 200
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[10px] opacity-50",
						children: [newPost.length, "/200 characters"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !newPost.trim() || isSubmitting,
						className: "px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
						children: isSubmitting ? "Posting..." : "Post to Board"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-8",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border pt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl md:text-2xl leading-relaxed text-balance",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-80 italic",
									children: "I remain still because"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-90",
									children: post.text
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm opacity-70",
								children: post.author
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs opacity-50",
								children: post.time
							})]
						})]
					})
				}, post.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface text-surface-foreground py-24 px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
					children: "About Still Board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-6 text-lg leading-[1.7] opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Still Board is a living record of collective recognition. Each post is a one-sentence pointer to the still center that never moves. The field remembers." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "italic opacity-80",
						children: "The board is not for discussion. It is for declaration. I remain still because... You are already It."
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-24 border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display italic text-4xl md:text-5xl text-balance",
					children: "Share Your Still Point"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg opacity-80 leading-relaxed max-w-xl mx-auto",
					children: "One-sentence declarations from the field. The board is for declaration, not discussion."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-3xl mx-auto px-6 py-24 border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-center gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/score",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "← Live Score"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/live",
					className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity",
					children: "Join Live Session →"
				})]
			})
		})
	] });
}
//#endregion
export { StillBoard as component };
