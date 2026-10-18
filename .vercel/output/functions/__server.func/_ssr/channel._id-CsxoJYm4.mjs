import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CHANNEL_DESCRIPTIONS, r as CONTENT, t as CHANNELS } from "./content-jEEGWz5L.mjs";
import { t as Route } from "./channel._id-BqhQ4v3z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channel._id-CsxoJYm4.js
var import_jsx_runtime = require_jsx_runtime();
function ChannelDetail() {
	const { id } = Route.useParams();
	const channel = id.toUpperCase();
	if (!CHANNELS.includes(channel)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display italic text-4xl",
				children: "Not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60",
				children: "This channel is not here."
			})]
		})
	});
	const channelContent = CONTENT.filter((c) => c.channel === channel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-4xl mx-auto px-6 py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-8 mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
						children: "CHANNEL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl md:text-5xl lg:text-6xl leading-tight",
						children: channel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-lg opacity-70 max-w-2xl mx-auto",
						children: CHANNEL_DESCRIPTIONS[channel]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
						children: [channelContent.length, " pieces"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: channelContent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/listen/$id",
					params: { id: item.id },
					className: "block group py-6 border-b border-border hover:border-accent transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl group-hover:text-accent transition-colors",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-mono text-sm opacity-60",
									children: item.artist_or_speaker
								}),
								item.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs opacity-40",
									children: item.duration
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity",
							children: "→"
						})]
					})
				}, item.id))
			})]
		})
	});
}
//#endregion
export { ChannelDetail as component };
