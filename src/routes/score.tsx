import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { siteUrl } from "@/lib/site-url";

interface Practice {
  type: string;
  duration: number;
  timestamp: number;
}

export const Route = createFileRoute("/score")({
  head: () => ({
    meta: [
      { title: "Practice Log — The Still Point" },
      {
        name: "description",
        content: "Your personal contemplative practice log. Private and optional.",
      },
      { property: "og:title", content: "Practice Log — The Still Point" },
      {
        property: "og:description",
        content: "Your personal contemplative practice log. Private and optional.",
      },
      { property: "og:url", content: siteUrl("/score") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/score") }],
  }),
  component: PracticeLog,
});

function PracticeLog() {
  const [totalMinutes, setTotalMinutes] = useState(() => {
    const savedData = JSON.parse(
      localStorage.getItem("stillPointData") || '{"totalMinutes":0,"practices":[]}',
    );
    return savedData.totalMinutes;
  });
  const [practices, setPractices] = useState(() => {
    const savedData = JSON.parse(
      localStorage.getItem("stillPointData") || '{"totalMinutes":0,"practices":[]}',
    );
    return savedData.practices || [];
  });

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          Personal Practice
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Practice Log
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
          Your private record of contemplative practice. Stored locally on your device.
        </p>
      </header>

      {/* Personal Stats */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
              Total Practice Minutes
            </div>
            <div className="font-display text-6xl md:text-7xl">{totalMinutes.toLocaleString()}</div>
            <div className="flex items-center gap-2">
              <span className="opacity-50 text-sm">Private · Local storage</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
              Sessions Completed
            </div>
            <div className="font-display text-6xl md:text-7xl">{practices.length}</div>
            <div className="flex items-center gap-2">
              <span className="opacity-50 text-sm">Prāṇa Gate · Inquiry</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sessions */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            Your Sessions
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl mt-6 mb-12">Recent Practice</h2>

          {practices.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-lg opacity-70">No practice sessions recorded yet.</p>
              <p className="text-sm opacity-50">
                Complete a Prāṇa Gate or Inquiry session to begin logging.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {practices
                .slice()
                .reverse()
                .map((practice: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-t border-surface-foreground/20"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm opacity-80">{practice.type}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="font-display text-lg">{practice.duration} min</span>
                      <span className="font-mono text-xs opacity-50">
                        {new Date(practice.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Begin Your Practice
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Complete a Prāṇa Gate or Groundless Inquiry session to log your practice.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prana"
              className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              Enter Prāṇa Gate
            </Link>
            <Link
              to="/inquiry"
              className="px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Begin Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <Link
            to="/inquiry"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Groundless Inquiry
          </Link>
          <Link
            to="/board"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            Still Board →
          </Link>
        </div>
      </section>
    </div>
  );
}
