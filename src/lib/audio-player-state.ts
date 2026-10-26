import { useState, useEffect } from "react";

export interface ActiveAudioTrack {
  id?: string;
  title: string;
  artist: string;
  channel?: string;
  sourceType: "transmission" | "audiobook" | "discourse";
  route: string;
  streamUrl?: string;
  isPlaying: boolean;
}

const STORAGE_KEY = "stillpoint_active_audio_track";

let currentTrackMemory: ActiveAudioTrack | null = null;

export function getGlobalAudioTrack(): ActiveAudioTrack | null {
  if (currentTrackMemory) return currentTrackMemory;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        currentTrackMemory = JSON.parse(raw);
        return currentTrackMemory;
      }
    } catch {
      // Ignore JSON parse errors
    }
  }
  return null;
}

export function setGlobalAudioTrack(track: ActiveAudioTrack | null) {
  currentTrackMemory = track;
  if (typeof window !== "undefined") {
    try {
      if (track) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(track));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
      window.dispatchEvent(new CustomEvent("stillpoint-audio-state-change", { detail: track }));
    } catch {
      // Ignore local storage errors
    }
  }
}

/**
 * Notifies all other audio elements that a new track has started playing,
 * allowing other players to pause automatically so sounds do not clash.
 */
export function notifyAudioStarted(
  sourceType: "transmission" | "audiobook" | "discourse" | "bottom-player",
  id?: string,
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("stillpoint-audio-started", {
        detail: { sourceType, id },
      }),
    );
  }
}

/**
 * Hook to subscribe to active audio track state across components.
 */
export function useActiveAudioTrack(): ActiveAudioTrack | null {
  const [track, setTrack] = useState<ActiveAudioTrack | null>(() => getGlobalAudioTrack());

  useEffect(() => {
    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<ActiveAudioTrack | null>;
      setTrack(customEvent.detail ?? null);
    };

    window.addEventListener("stillpoint-audio-state-change", handleStateChange);
    return () => {
      window.removeEventListener("stillpoint-audio-state-change", handleStateChange);
    };
  }, []);

  return track;
}
