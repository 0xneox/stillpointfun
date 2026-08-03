import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Sessions — The Still Point" },
      { name: "description", content: "Live transmissions and teachings from The Still Point." },
      { property: "og:title", content: "Live Sessions — The Still Point" },
      { property: "og:description", content: "Live transmissions and teachings from The Still Point." },
      { property: "og:url", content: "/live" },
    ],
    links: [{ rel: "canonical", href: "/live" }],
  }),
  component: Live,
});

function Live() {
  const [isLive, setIsLive] = useState(false);
  const [nextSession, setNextSession] = useState({
    title: "The Witness in Volatility",
    date: "Sunday, Aug 10",
    time: "20:00 UTC",
    countdown: "2d 14h 32m",
  });

  const upcomingSessions = [
    { title: "The Witness in Volatility", date: "Sunday, Aug 10", time: "20:00 UTC", type: "Main Session" },
    { title: "Spanda & Market Cycles", date: "Wednesday, Aug 13", time: "18:00 UTC", type: "Lila Report" },
    { title: "Groundless Inquiry Deep Dive", date: "Sunday, Aug 17", time: "20:00 UTC", type: "Main Session" },
    { title: "Recognition in Daily Life", date: "Wednesday, Aug 20", time: "18:00 UTC", type: "Lila Report" },
  ];

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Live Transmission</span>
            <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
              The Field is Active
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? "bg-red-500 animate-pulse" : "bg-foreground/30"}`} />
            <span className="font-mono text-xs uppercase tracking-widest opacity-70">
              {isLive ? "Live Now" : "Offline"}
            </span>
          </div>
        </div>
      </header>

      {/* Next Session */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded-full">
            Next Session
          </div>
          <h2 className="font-display text-3xl md:text-4xl italic text-balance">
            {nextSession.title}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg opacity-80">
            <span>{nextSession.date}</span>
            <span className="hidden sm:inline">·</span>
            <span>{nextSession.time}</span>
          </div>
          <div className="font-mono text-2xl tracking-wider opacity-90">
            {nextSession.countdown}
          </div>
          <div className="pt-6">
            <button className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors">
              Set Reminder
            </button>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Upcoming Transmissions</span>
          <h2 className="font-display italic text-4xl md:text-5xl mt-6 mb-12">
            The Schedule
          </h2>
          
          <div className="space-y-8">
            {upcomingSessions.map((session, i) => (
              <div key={i} className="border-t border-surface-foreground/20 pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-accent/20 text-accent font-mono text-[10px] tracking-widest uppercase rounded">
                        {session.type}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl">{session.title}</h3>
                    <div className="flex items-center gap-4 text-sm opacity-70">
                      <span>{session.date}</span>
                      <span>·</span>
                      <span>{session.time}</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 border border-surface-foreground/30 text-surface-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-surface-foreground hover:text-background transition-colors">
                    Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Access */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Access the Archives
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-xl mx-auto">
            All past sessions are available for $STILL token holders. Full transcripts, searchable content, and downloadable audio.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/token" 
              className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              Get $STILL Token
            </Link>
            <Link 
              to="/teachings" 
              className="px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Browse Teachings
            </Link>
          </div>
        </div>
      </section>

      {/* Practice Before Session */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Enter the Still Point Before the Session
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-xl mx-auto">
            Complete a Prāṇa Gate or Groundless Inquiry to arrive at the transmission already centered.
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
              className="px-8 py-4 border border-surface-foreground text-surface-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-surface-foreground hover:text-background transition-colors"
            >
              Begin Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
