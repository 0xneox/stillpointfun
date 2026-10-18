import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EnhancedPlayer-BNJApVVL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EnhancedPlayer({ videoId, title, artist, channel, autoplay = false, onNext, onPrev, hasPrev = false, hasNext = false }) {
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [volume, setVolume] = (0, import_react.useState)(85);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [isSeeking, setIsSeeking] = (0, import_react.useState)(false);
	const [playbackSpeed, setPlaybackSpeed] = (0, import_react.useState)(1);
	const [isReady, setIsReady] = (0, import_react.useState)(false);
	(0, import_react.useRef)(null);
	const playerRef = (0, import_react.useRef)(null);
	const pollIntervalRef = (0, import_react.useRef)(null);
	const playerIdRef = (0, import_react.useRef)(`yt-audio-${Math.random().toString(36).slice(2, 9)}`);
	const formatTime = (seconds) => {
		if (isNaN(seconds) || seconds < 0) return "00:00";
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor(seconds % 3600 / 60);
		const secs = Math.floor(seconds % 60);
		if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};
	(0, import_react.useEffect)(() => {
		let isCancelled = false;
		const initPlayer = () => {
			if (isCancelled || !window.YT || !window.YT.Player) return;
			if (!document.getElementById(playerIdRef.current)) return;
			if (playerRef.current) try {
				playerRef.current.destroy();
			} catch {}
			try {
				playerRef.current = new window.YT.Player(playerIdRef.current, {
					height: "1",
					width: "1",
					videoId,
					playerVars: {
						autoplay: autoplay ? 1 : 0,
						controls: 0,
						playsinline: 1,
						disablekb: 1,
						fs: 0,
						modestbranding: 1,
						rel: 0
					},
					events: {
						onReady: (event) => {
							if (isCancelled) return;
							setIsReady(true);
							event.target.setVolume(volume);
							const dur = event.target.getDuration();
							if (dur) setDuration(dur);
							if (autoplay) {
								event.target.playVideo();
								setIsPlaying(true);
							}
						},
						onStateChange: (event) => {
							if (isCancelled) return;
							if (event.data === 1) {
								setIsPlaying(true);
								const dur = event.target.getDuration();
								if (dur) setDuration(dur);
							} else if (event.data === 2) setIsPlaying(false);
							else if (event.data === 0) {
								setIsPlaying(false);
								if (onNext) onNext();
							}
						}
					}
				});
			} catch (err) {
				console.error("Error creating YouTube audio engine:", err);
			}
		};
		if (window.YT && window.YT.Player) initPlayer();
		else {
			if (!document.getElementById("yt-iframe-api-script")) {
				const tag = document.createElement("script");
				tag.id = "yt-iframe-api-script";
				tag.src = "https://www.youtube.com/iframe_api";
				const firstScriptTag = document.getElementsByTagName("script")[0];
				firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
			}
			const prevCallback = window.onYouTubeIframeAPIReady;
			window.onYouTubeIframeAPIReady = () => {
				if (prevCallback) prevCallback();
				initPlayer();
			};
		}
		return () => {
			isCancelled = true;
			if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
			if (playerRef.current) try {
				playerRef.current.destroy();
			} catch {}
		};
	}, [videoId]);
	(0, import_react.useEffect)(() => {
		if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
		if (isPlaying && !isSeeking) pollIntervalRef.current = setInterval(() => {
			if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") try {
				const time = playerRef.current.getCurrentTime();
				const dur = playerRef.current.getDuration();
				if (typeof time === "number" && !isNaN(time)) setCurrentTime(time);
				if (typeof dur === "number" && !isNaN(dur) && dur > 0) setDuration(dur);
			} catch {}
		}, 500);
		return () => {
			if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
		};
	}, [isPlaying, isSeeking]);
	const togglePlay = () => {
		if (!playerRef.current) return;
		try {
			if (isPlaying) {
				playerRef.current.pauseVideo();
				setIsPlaying(false);
			} else {
				playerRef.current.playVideo();
				setIsPlaying(true);
			}
		} catch (e) {
			console.error("Play toggle error:", e);
		}
	};
	const handleSkip = (seconds) => {
		if (!playerRef.current) return;
		try {
			const target = Math.max(0, Math.min(duration || 0, currentTime + seconds));
			playerRef.current.seekTo(target, true);
			setCurrentTime(target);
		} catch {}
	};
	const handleSeekChange = (e) => {
		setCurrentTime(parseFloat(e.target.value));
	};
	const handleSeekCommit = () => {
		setIsSeeking(false);
		if (playerRef.current && typeof playerRef.current.seekTo === "function") try {
			playerRef.current.seekTo(currentTime, true);
		} catch {}
	};
	const handleVolumeChange = (e) => {
		const vol = parseInt(e.target.value, 10);
		setVolume(vol);
		setIsMuted(vol === 0);
		if (playerRef.current) try {
			playerRef.current.setVolume(vol);
			if (vol > 0 && playerRef.current.isMuted()) playerRef.current.unMute();
		} catch {}
	};
	const toggleMute = () => {
		if (!playerRef.current) return;
		try {
			if (isMuted) {
				setIsMuted(false);
				playerRef.current.unMute();
				playerRef.current.setVolume(volume || 80);
			} else {
				setIsMuted(true);
				playerRef.current.mute();
			}
		} catch {}
	};
	const handleSpeedChange = (speed) => {
		setPlaybackSpeed(speed);
		if (playerRef.current && typeof playerRef.current.setPlaybackRate === "function") try {
			playerRef.current.setPlaybackRate(speed);
		} catch {}
	};
	const progressPercent = duration > 0 ? currentTime / duration * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "absolute",
				width: "1px",
				height: "1px",
				opacity: .001,
				pointerEvents: "none",
				overflow: "hidden",
				clip: "rect(0 0 0 0)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: playerIdRef.current })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 md:p-10 bg-surface/50 backdrop-blur-md border border-border rounded-xl shadow-2xl space-y-8 relative overflow-hidden group",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none transition-opacity duration-1000 ${isPlaying ? "opacity-100" : "opacity-30"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border border-border/80 shadow-2xl relative group-hover:border-accent/60 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
									alt: title,
									className: `w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-105" : "scale-100"}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-accent animate-pulse" : "bg-white/40"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[8px] uppercase tracking-widest text-white/90",
										children: isPlaying ? "Live Audio" : "Paused"
									})]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0 text-center sm:text-left space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center sm:justify-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2.5 py-0.5 bg-accent/15 text-accent font-mono text-[9px] tracking-widest uppercase rounded font-medium border border-accent/20",
									children: "Pure Audio Transmission"
								}), channel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2.5 py-0.5 bg-surface text-foreground/70 font-mono text-[9px] tracking-wider uppercase border border-border rounded",
									children: ["Channel · ", channel]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground font-normal text-balance",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm opacity-70 tracking-wide",
								children: artist
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 flex items-center justify-center sm:justify-start gap-1 h-6",
								children: [
									40,
									75,
									55,
									90,
									60,
									30,
									85,
									45,
									95,
									65,
									35,
									80,
									50,
									70,
									40
								].map((height, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-1 bg-accent/60 rounded-full transition-all duration-300",
									style: {
										height: isPlaying ? `${Math.max(15, height * (i % 2 === 0 ? 1 : .8))}%` : "15%",
										opacity: isPlaying ? .85 : .25,
										animation: isPlaying ? `pulse ${.6 + i % 5 * .15}s ease-in-out infinite alternate` : "none"
									}
								}, i))
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative group/timeline flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "0",
							max: duration || 100,
							value: currentTime,
							onMouseDown: () => setIsSeeking(true),
							onTouchStart: () => setIsSeeking(true),
							onChange: handleSeekChange,
							onMouseUp: handleSeekCommit,
							onTouchEnd: handleSeekCommit,
							className: "w-full h-2 bg-border rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-125 transition-all",
							style: { background: `linear-gradient(to right, var(--color-accent, #c99c4e) ${progressPercent}%, var(--color-border, #e5e5e5) ${progressPercent}%)` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between font-mono text-[11px] opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(currentTime) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: duration > 0 ? formatTime(duration) : "--:--" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 relative z-10 border-t border-border/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 order-2 sm:order-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[9px] uppercase tracking-widest opacity-40 mr-1",
								children: "Speed:"
							}), [
								.75,
								1,
								1.25,
								1.5
							].map((speed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleSpeedChange(speed),
								className: `px-2 py-0.5 rounded font-mono text-[10px] transition-colors ${playbackSpeed === speed ? "bg-accent text-white font-medium shadow-sm" : "opacity-60 hover:opacity-100 hover:bg-surface"}`,
								children: [speed, "x"]
							}, speed))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 md:gap-4 order-1 sm:order-2",
							children: [
								onPrev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onPrev,
									disabled: !hasPrev,
									className: "p-2.5 rounded-full border border-border hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-all hover-lift",
									title: "Previous transmission",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs",
										children: "⏮"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleSkip(-15),
									className: "px-2.5 py-1.5 rounded border border-border/80 hover:border-foreground font-mono text-[10px] tracking-wider opacity-75 hover:opacity-100 transition-colors",
									title: "Rewind 15 seconds",
									children: "-15s"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: togglePlay,
									className: "w-14 h-14 rounded-full bg-foreground text-background hover:bg-accent hover:text-white transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center press-scale",
									"aria-label": isPlaying ? "Pause transmission" : "Play transmission",
									children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "❚❚"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl ml-1",
										children: "▶"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleSkip(15),
									className: "px-2.5 py-1.5 rounded border border-border/80 hover:border-foreground font-mono text-[10px] tracking-wider opacity-75 hover:opacity-100 transition-colors",
									title: "Fast forward 15 seconds",
									children: "+15s"
								}),
								onNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onNext,
									disabled: !hasNext,
									className: "p-2.5 rounded-full border border-border hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-all hover-lift",
									title: "Next transmission",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs",
										children: "⏭"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 order-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: toggleMute,
									className: "p-1.5 opacity-60 hover:opacity-100 transition-opacity font-mono text-xs",
									title: isMuted ? "Unmute" : "Mute",
									children: isMuted ? "🔇" : "🔊"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "0",
									max: "100",
									value: isMuted ? 0 : volume,
									onChange: handleVolumeChange,
									className: "w-20 md:w-24 h-1.5 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] opacity-40 w-6 text-right",
									children: isMuted ? "0%" : `${volume}%`
								})
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { EnhancedPlayer as t };
