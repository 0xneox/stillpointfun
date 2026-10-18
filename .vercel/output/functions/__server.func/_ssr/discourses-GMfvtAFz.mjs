import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Breadcrumbs } from "./Breadcrumbs-DTWu_Qqo.mjs";
import { i as CURATED_PLAYLISTS, r as CONTENT } from "./content-jEEGWz5L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discourses-GMfvtAFz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Discourses() {
	const [activePlaylistId, setActivePlaylistId] = (0, import_react.useState)(CURATED_PLAYLISTS[0]?.id || "alan-watts-discourses");
	const activePlaylist = (0, import_react.useMemo)(() => {
		return CURATED_PLAYLISTS.find((p) => p.id === activePlaylistId) || CURATED_PLAYLISTS[0];
	}, [activePlaylistId]);
	const [selectedTrack, setSelectedTrack] = (0, import_react.useState)(CURATED_PLAYLISTS[0]?.tracks[0]);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [volume, setVolume] = (0, import_react.useState)(100);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [trackSearch, setTrackSearch] = (0, import_react.useState)("");
	const iframeRef = (0, import_react.useRef)(null);
	const discoursesBySubject = {
		"Consciousness & Reality": CONTENT.filter((c) => [
			"REALITY",
			"COSMOS",
			"PSYCHEDELIC"
		].includes(c.channel) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Upanishads & Vedic Wisdom": CONTENT.filter((c) => (c.channel === "VEDA" || c.tags.includes("upanishad") || c.tags.includes("veda") || c.tags.includes("dayananda") || c.tags.includes("shankara") || c.tags.includes("bhagavad-gita")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Kashmir Shaivism & Non-Duality": CONTENT.filter((c) => (c.tradition?.toLowerCase().includes("shaivism") || c.tags.includes("kashmir-shaivism") || c.tags.includes("abhinavagupta")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Samadhi & Non-Duality": CONTENT.filter((c) => (c.tags.includes("samadhi") || c.tags.includes("maya") || c.tags.includes("kundalini") || c.tradition?.toLowerCase().includes("samadhi")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Zen & Taoism": CONTENT.filter((c) => (c.tradition?.toLowerCase().includes("zen") || c.tradition?.toLowerCase().includes("taoism") || c.tags.includes("zen") || c.tags.includes("wu-wei")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Advaita & Self-Inquiry": CONTENT.filter((c) => ["REALITY"].includes(c.channel) && (c.tradition?.toLowerCase().includes("advaita") || c.tags.includes("ramana-maharshi") || c.tags.includes("self-inquiry")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Bhakti & Saints": CONTENT.filter((c) => (c.tradition?.toLowerCase().includes("bhakti") || c.tags.includes("neem-karoli-baba") || c.tags.includes("ram-dass") || c.tags.includes("devotion")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Buddhist Teachings": CONTENT.filter((c) => c.channel === "BUDDHA" && c.media_type !== "music" && c.media_type !== "chanting"),
		"Depth Psychology & Mysticism": CONTENT.filter((c) => (c.tradition?.toLowerCase().includes("psychology") || c.tags.includes("carl-jung") || c.tags.includes("archetypes")) && c.media_type !== "music" && c.media_type !== "chanting"),
		"Sufi Traditions": CONTENT.filter((c) => c.channel === "SUFI" && c.media_type !== "music" && c.media_type !== "chanting")
	};
	const filteredSubjects = Object.fromEntries(Object.entries(discoursesBySubject).filter(([_, items]) => items.length > 0));
	const filteredTracks = (0, import_react.useMemo)(() => {
		if (!activePlaylist) return [];
		if (!trackSearch.trim()) return activePlaylist.tracks;
		const query = trackSearch.toLowerCase();
		return activePlaylist.tracks.filter((t) => t.title.toLowerCase().includes(query) || t.duration.toLowerCase().includes(query) || t.speaker.toLowerCase().includes(query) || t.description && t.description.toLowerCase().includes(query));
	}, [activePlaylist, trackSearch]);
	const sendPlayerCommand = (func, args = []) => {
		if (iframeRef.current?.contentWindow) iframeRef.current.contentWindow.postMessage(JSON.stringify({
			event: "command",
			func,
			args
		}), "*");
	};
	const switchPlaylist = (playlistId) => {
		setActivePlaylistId(playlistId);
		setTrackSearch("");
		const target = CURATED_PLAYLISTS.find((p) => p.id === playlistId);
		if (target?.tracks[0]) {
			setSelectedTrack(target.tracks[0]);
			setIsPlaying(false);
		}
	};
	const togglePlay = () => {
		if (isPlaying) {
			sendPlayerCommand("pauseVideo");
			setIsPlaying(false);
		} else {
			sendPlayerCommand("playVideo");
			setIsPlaying(true);
		}
	};
	const playTrack = (track) => {
		setSelectedTrack(track);
		setIsPlaying(true);
	};
	const handleNextTrack = () => {
		if (!activePlaylist) return;
		const nextIndex = (activePlaylist.tracks.findIndex((t) => t.videoId === selectedTrack.videoId) + 1) % activePlaylist.tracks.length;
		playTrack(activePlaylist.tracks[nextIndex]);
	};
	const handlePrevTrack = () => {
		if (!activePlaylist) return;
		const prevIndex = (activePlaylist.tracks.findIndex((t) => t.videoId === selectedTrack.videoId) - 1 + activePlaylist.tracks.length) % activePlaylist.tracks.length;
		playTrack(activePlaylist.tracks[prevIndex]);
	};
	const handleVolumeChange = (newVolume) => {
		setVolume(newVolume);
		setIsMuted(newVolume === 0);
		sendPlayerCommand("setVolume", [newVolume]);
	};
	const toggleMute = () => {
		if (isMuted) {
			setIsMuted(false);
			sendPlayerCommand("unMute");
			sendPlayerCommand("setVolume", [volume || 80]);
		} else {
			setIsMuted(true);
			sendPlayerCommand("mute");
		}
	};
	(0, import_react.useEffect)(() => {
		const handleMessage = (e) => {
			try {
				const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
				if (data && data.event === "onStateChange") {
					if (data.info === 1) setIsPlaying(true);
					else if (data.info === 2) setIsPlaying(false);
					else if (data.info === 0) {
						setIsPlaying(false);
						handleNextTrack();
					}
				}
			} catch {}
		};
		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, [selectedTrack, activePlaylist]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				ref: iframeRef,
				src: `https://www.youtube.com/embed/${selectedTrack.videoId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&playsinline=1&controls=0`,
				className: "absolute -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none",
				allow: "autoplay",
				title: "Spoken Audio Stream"
			}, selectedTrack.videoId),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "container-editorial pt-24 pb-16 border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Discourses" }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50",
						children: "Spoken Discourses & Audio Archives"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl",
						children: "Discourses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-lg opacity-70 leading-relaxed font-sans",
						children: "Curated spoken lectures, satsangs, and contemplative dialogues from teachers across traditions. Pure audio archives designed for focused listening, stillness, and deep study."
					})
				] })]
			}),
			activePlaylist && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border bg-surface/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto px-6 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-widest uppercase opacity-50 mr-2",
								children: "Archives:"
							}), CURATED_PLAYLISTS.map((pl) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => switchPlaylist(pl.id),
									className: `px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm border transition-all ${pl.id === activePlaylistId ? "bg-foreground text-background border-foreground font-medium shadow-sm" : "border-border bg-background/50 hover:bg-surface text-foreground/80 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pl.title.split(":")[0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 opacity-50",
										children: [
											"(",
											pl.tracks.length,
											")"
										]
									})]
								}, pl.id);
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block px-2.5 py-1 text-[9px] font-mono tracking-[0.2em] uppercase bg-foreground text-background",
												children: "Spoken Audio Archive"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase border border-border opacity-70",
												children: [activePlaylist.tracks.length, " Spoken Lectures & Talks"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-accent border border-accent/40",
												children: "Pure Audio"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-3xl md:text-5xl mt-2",
										children: activePlaylist.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs opacity-60",
										children: [
											activePlaylist.speaker,
											" · ",
											activePlaylist.traditions.join(" · ")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-sans text-sm md:text-base opacity-75 max-w-2xl leading-relaxed",
										children: activePlaylist.description
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: activePlaylist.youtubeUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "px-4 py-2 border border-border hover:border-foreground font-mono text-[10px] tracking-[0.2em] uppercase transition-colors inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Original Playlist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-50",
										children: "↗"
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-sm border border-border bg-background shadow-xl overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-8 md:p-12 bg-surface/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col md:flex-row items-center gap-8 md:gap-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative shrink-0 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-36 h-36 md:w-44 md:h-44 rounded-full border border-border/80 flex items-center justify-center transition-transform duration-1000 ${isPlaying ? "animate-[spin_18s_linear_infinite]" : ""}`,
											style: { background: "radial-gradient(circle, var(--color-surface) 0%, var(--color-background) 70%, var(--color-surface) 100%)" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-28 h-28 md:w-36 md:h-36 rounded-full border border-border/40 flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-20 h-20 md:w-28 md:h-28 rounded-full border border-border/30 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-12 h-12 md:w-16 md:h-16 rounded-full border border-accent/50 bg-accent/10 flex items-center justify-center text-accent",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-[9px] tracking-widest uppercase",
															children: isPlaying ? "ON AIR" : "STILL"
														})
													})
												})
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0 text-center md:text-left space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-center md:justify-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-mono tracking-[0.2em] uppercase bg-accent text-accent-foreground rounded-full",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full bg-current ${isPlaying ? "animate-ping" : "opacity-40"}` }), isPlaying ? "Streaming Spoken Audio" : "Audio Deck Standby"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-[10px] tracking-widest uppercase opacity-50",
													children: [
														"Discourse #",
														selectedTrack.index,
														" of ",
														activePlaylist.tracks.length
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display italic text-3xl md:text-5xl leading-tight text-balance",
												children: selectedTrack.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 font-mono text-xs opacity-70",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Speaker: ", selectedTrack.speaker] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Duration: ", selectedTrack.duration] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spoken Word" })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pt-4 flex flex-wrap items-center justify-center md:justify-start gap-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: handlePrevTrack,
														className: "p-3 rounded-full border border-border hover:border-foreground hover:bg-surface transition-colors",
														title: "Previous Discourse",
														"aria-label": "Previous Discourse",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-mono",
															children: "⏮"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: togglePlay,
														className: "px-8 py-3.5 rounded-full bg-foreground text-background hover:bg-accent transition-colors flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase shadow-md",
														"aria-label": isPlaying ? "Pause Audio" : "Play Audio",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base",
															children: isPlaying ? "❚❚" : "▶"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isPlaying ? "Pause Audio" : "Play Audio" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: handleNextTrack,
														className: "p-3 rounded-full border border-border hover:border-foreground hover:bg-surface transition-colors",
														title: "Next Discourse",
														"aria-label": "Next Discourse",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-mono",
															children: "⏭"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-end gap-1 h-8 px-3.5 py-1.5 bg-background border border-border rounded-md shadow-inner",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 bg-accent rounded-full transition-all duration-300 ${isPlaying ? "animate-[pulse_1.1s_ease-in-out_infinite] h-5" : "h-2 opacity-30"}` }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 bg-accent rounded-full transition-all duration-300 ${isPlaying ? "animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-7" : "h-2 opacity-30"}` }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 bg-accent rounded-full transition-all duration-300 ${isPlaying ? "animate-[pulse_1.4s_ease-in-out_infinite_0.3s] h-4" : "h-2 opacity-30"}` }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 bg-accent rounded-full transition-all duration-300 ${isPlaying ? "animate-[pulse_1.0s_ease-in-out_infinite_0.2s] h-6" : "h-2 opacity-30"}` }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 bg-accent rounded-full transition-all duration-300 ${isPlaying ? "animate-[pulse_1.3s_ease-in-out_infinite_0.4s] h-3" : "h-2 opacity-30"}` })
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 pl-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: toggleMute,
															className: "font-mono text-xs opacity-60 hover:opacity-100 transition-opacity",
															title: isMuted ? "Unmute" : "Mute",
															children: isMuted ? "🔇" : "🔊"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "range",
															min: "0",
															max: "100",
															value: isMuted ? 0 : volume,
															onChange: (e) => handleVolumeChange(Number(e.target.value)),
															className: "w-20 h-1 bg-border accent-accent cursor-pointer",
															title: "Volume"
														})]
													})
												]
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs opacity-60",
										children: "Direct spoken audio streaming · Zero video distraction · Contemplative sanctuary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [selectedTrack?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/listen/$id",
											params: { id: selectedTrack.id },
											className: "px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:bg-accent transition-colors",
											children: "Stillpoint Contemplation View →"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `https://www.youtube.com/watch?v=${selectedTrack.videoId}`,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "YouTube Source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })]
										})]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border p-6 bg-surface/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "font-display text-xl",
										children: [activePlaylist.title.split(":")[0], " Audio Index"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs opacity-50 mt-0.5",
										children: "Select any lecture below to listen directly in the audio deck"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full sm:w-64",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: `Search ${activePlaylist.tracks.length} talks...`,
											value: trackSearch,
											onChange: (e) => setTrackSearch(e.target.value),
											className: "w-full px-3 py-1.5 text-xs font-mono bg-background border border-border focus:border-foreground focus:outline-none placeholder:opacity-40"
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-96 overflow-y-auto divide-y divide-border border border-border bg-background rounded-sm",
									children: filteredTracks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 text-center font-mono text-xs opacity-50",
										children: [
											"No talks found matching \"",
											trackSearch,
											"\""
										]
									}) : filteredTracks.map((track) => {
										const isCurrent = selectedTrack.videoId === track.videoId;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-3.5 flex items-center justify-between gap-4 transition-colors ${isCurrent ? "bg-accent/10 border-l-2 border-l-accent" : "hover:bg-surface/50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => playTrack(track),
												className: "flex-1 text-left flex items-start gap-3 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[11px] opacity-40 shrink-0 mt-0.5 w-6 text-right",
													children: String(track.index).padStart(2, "0")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: `text-sm font-sans truncate ${isCurrent ? "font-medium text-accent" : ""}`,
														children: track.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mt-0.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[10px] opacity-60",
																children: track.speaker
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[10px] opacity-30",
																children: "·"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[10px] opacity-50",
																children: track.duration
															})
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														if (isCurrent) togglePlay();
														else playTrack(track);
													},
													className: `px-3 py-1 font-mono text-[9px] tracking-widest uppercase transition-colors flex items-center gap-1.5 ${isCurrent && isPlaying ? "bg-accent text-accent-foreground" : "border border-border hover:border-foreground"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCurrent && isPlaying ? "❚❚ Pause" : "▶ Play" })
												}), track.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/listen/$id",
													params: { id: track.id },
													title: "Open in Stillpoint listening view",
													className: "px-2 py-1 font-mono text-[9px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-opacity",
													children: "Detail →"
												})]
											})]
										}, track.videoId);
									})
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-4xl mx-auto px-6 py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 block",
						children: "Traditions & Paths"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display italic text-3xl md:text-4xl mt-2",
						children: "Cataloged Discourses by Tradition"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-16",
					children: Object.entries(filteredSubjects).map(([subject, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between border-b border-border pb-3 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl md:text-3xl",
							children: subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] opacity-40 uppercase tracking-widest",
							children: [
								items.length,
								" ",
								items.length === 1 ? "entry" : "entries"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listen/$id",
							params: { id: item.id },
							className: "block group py-4 border-b border-border hover:border-accent transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-xl group-hover:text-accent transition-colors",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-sm opacity-60 mt-1",
										children: [
											item.artist_or_speaker,
											item.tradition && ` · ${item.tradition}`,
											item.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "opacity-40",
												children: [
													" ",
													"· ",
													item.duration.replace("PT", "").toLowerCase()
												]
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity",
									children: "Listen →"
								})]
							})
						}, item.id))
					})] }, subject))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-surface text-surface-foreground py-24 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6",
						children: "About These Discourses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 text-lg leading-[1.7] opacity-90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These discourses are curated from publicly available archives including radio broadcasts, authorized foundation channels, and historical recordings. Each entry identifies the original speaker, tradition, and source." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collection focuses on authentic spoken teachings from Zen Buddhism, Taoism, Advaita Vedanta, Kashmir Śaivism, depth psychology, Sufism, and philosophical explorations of consciousness and non-duality." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "italic opacity-80",
								children: "Stillpoint is a quiet sanctuary for discovering meaningful spoken discourses already available in the public domain—curated for pure acoustic focus, stillness, and contemplation."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "max-w-3xl mx-auto px-6 py-24 border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display italic text-4xl md:text-5xl text-balance",
						children: "Explore Further"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-6 flex flex-col sm:flex-row gap-4 justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors",
								children: "Browse All Listening"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/library",
								className: "px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors",
								children: "Archival Library"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/journal",
								className: "px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors",
								children: "Read Writings"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Discourses as component };
