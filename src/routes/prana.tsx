import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/prana")({
  head: () => ({
    meta: [
      { title: "Prāṇa Gate — The Still Point" },
      { name: "description", content: "A 60-90 second guided attention tool to enter the still center." },
      { property: "og:title", content: "Prāṇa Gate — The Still Point" },
      { property: "og:description", content: "A 60-90 second guided attention tool to enter the still center." },
      { property: "og:url", content: "/prana" },
    ],
    links: [{ rel: "canonical", href: "/prana" }],
  }),
  component: PranaGate,
});

function PranaGate() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(90);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const phases = [
    { duration: 15, instruction: "Close your eyes. Feel your breath as it enters and leaves." },
    { duration: 20, instruction: "Notice the space between breaths. The stillness that is always here." },
    { duration: 20, instruction: "You are the awareness watching the breath. Not the breath itself." },
    { duration: 20, instruction: "Rest as that awareness. The witness never moves." },
    { duration: 15, instruction: "When ready, open your eyes. Carry this stillness forward." },
  ];

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime === 0) {
            setIsActive(false);
            // Save practice completion to localStorage
            const savedData = JSON.parse(localStorage.getItem("stillPointData") || '{"totalMinutes":0,"practices":[]}');
            savedData.totalMinutes += 90;
            savedData.practices.push({
              type: "Prāṇa Gate",
              duration: 90,
              timestamp: Date.now(),
            });
            localStorage.setItem("stillPointData", JSON.stringify(savedData));
          }
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      let elapsed = 0;
      phases.forEach((p, i) => {
        elapsed += p.duration;
        if (90 - timeRemaining >= elapsed - p.duration && 90 - timeRemaining < elapsed) {
          setPhase(i);
        }
      });
    }
  }, [isActive, timeRemaining]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Practice Tool</span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Prāṇa Gate
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
          A 90-second guided attention tool to enter the still center of awareness.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        {!isActive ? (
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-balance">
                Enter through the breath. Exit as the witness.
              </p>
              <p className="text-base opacity-70 leading-relaxed max-w-xl mx-auto">
                This practice guides you through five phases of attention, each designed to deepen recognition of the still center that never moves.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <button
                onClick={startPractice}
                className="px-12 py-6 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300"
              >
                Begin Practice
              </button>
              <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">
                90 seconds · No experience needed
              </p>
            </div>

            <div className="pt-12 border-t border-border">
              <div className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">The phases</span>
                {phases.map((p, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-accent text-sm whitespace-nowrap">{p.duration}s</span>
                    <p className="text-base opacity-80">{p.instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-16">
            {/* Timer Display */}
            <div className="relative">
              <div className="font-display text-8xl md:text-9xl tracking-tight">
                {formatTime(timeRemaining)}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-foreground/20" />
            </div>

            {/* Current Phase */}
            <div className="space-y-6">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
                Phase {phase + 1} of {phases.length}
              </span>
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-balance max-w-xl mx-auto">
                {phases[phase]?.instruction}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="h-px bg-foreground/20">
                <div 
                  className="h-full bg-foreground transition-all duration-1000 ease-linear"
                  style={{ width: `${((90 - timeRemaining) / 90) * 100}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="pt-8">
              <button
                onClick={resetPractice}
                className="px-8 py-3 border border-foreground/30 text-foreground/70 font-mono text-[10px] tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-all"
              >
                End Practice
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Context */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">About this practice</span>
          <div className="mt-8 space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              Prāṇa Gate draws from the Vijñāna Bhairava Tantra — an ancient Kashmir Shaivist text that offers 112 practices to recognize the divine in everyday experience.
            </p>
            <p>
              The breath is the bridge. By attending to the space between breaths, we discover the stillness that precedes all movement. The witness of the breath is not the breath. You are that witness.
            </p>
            <p className="italic opacity-80">
              This is not relaxation. This is recognition. The center is already here.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <Link to="/" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
            ← Return Home
          </Link>
          <Link to="/inquiry" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
            Try Groundless Inquiry →
          </Link>
        </div>
      </section>
    </div>
  );
}
