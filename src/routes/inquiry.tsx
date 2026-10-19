import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Groundless Inquiry — The Still Point" },
      { name: "description", content: "A 2-minute phenomenological exercise from UNDIVIDED." },
      { property: "og:title", content: "Groundless Inquiry — The Still Point" },
      {
        property: "og:description",
        content: "A 2-minute phenomenological exercise from UNDIVIDED.",
      },
      { property: "og:url", content: siteUrl("/inquiry") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/inquiry") }],
  }),
  component: GroundlessInquiry,
});

function GroundlessInquiry() {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = useMemo(
    () => [
      {
        duration: 20,
        instruction: "Notice you are aware. Right now, you know you are reading these words.",
      },
      {
        duration: 25,
        instruction:
          "Look for the one who is aware. Can you find the boundary between awareness and what it's aware of?",
      },
      {
        duration: 25,
        instruction: "Notice: awareness has no shape, no size, no location. It is not an object.",
      },
      {
        duration: 25,
        instruction:
          "You are not the thought 'I am'. You are the awareness that knows the thought.",
      },
      {
        duration: 25,
        instruction:
          "Rest as this groundless awareness. No ground needed. You are already the space.",
      },
    ],
    [],
  );

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime === 0) {
            setIsActive(false);
            // Save practice completion to localStorage
            const savedData = JSON.parse(
              localStorage.getItem("stillPointData") || '{"totalMinutes":0,"practices":[]}',
            );
            savedData.totalMinutes += 120;
            savedData.practices.push({
              type: "Groundless Inquiry",
              duration: 120,
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
  }, [isActive, timeRemaining]);

  useEffect(() => {
    if (isActive) {
      let elapsed = 0;
      steps.forEach((s, i) => {
        elapsed += s.duration;
        if (120 - timeRemaining >= elapsed - s.duration && 120 - timeRemaining < elapsed) {
          setStep(i);
        }
      });
    }
  }, [isActive, timeRemaining, steps]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          Practice Tool
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Groundless Inquiry
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
          A 2-minute phenomenological exercise to recognize the awareness that has no ground.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        {!isActive ? (
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-balance">
                Look for the looker. Find what cannot be found.
              </p>
              <p className="text-base opacity-70 leading-relaxed max-w-xl mx-auto">
                This inquiry guides you through five steps of direct investigation into the nature
                of awareness itself — not as an idea, but as immediate experience.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <button
                onClick={startInquiry}
                className="px-12 py-6 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300"
              >
                Begin Inquiry
              </button>
              <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">
                2 minutes · Direct investigation
              </p>
            </div>

            <div className="pt-12 border-t border-border">
              <div className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
                  The steps
                </span>
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-accent text-sm whitespace-nowrap">
                      {s.duration}s
                    </span>
                    <p className="text-base opacity-80">{s.instruction}</p>
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

            {/* Current Step */}
            <div className="space-y-6">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
                Step {step + 1} of {steps.length}
              </span>
              <p className="font-display text-2xl md:text-3xl leading-[1.4] text-balance max-w-xl mx-auto">
                {steps[step]?.instruction}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="h-px bg-foreground/20">
                <div
                  className="h-full bg-foreground transition-all duration-1000 ease-linear"
                  style={{ width: `${((120 - timeRemaining) / 120) * 100}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="pt-8">
              <button
                onClick={resetInquiry}
                className="px-8 py-3 border border-foreground/30 text-foreground/70 font-mono text-[10px] tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-all"
              >
                End Inquiry
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Context */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            About this practice
          </span>
          <div className="mt-8 space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              Groundless Inquiry is drawn from the direct path of Advaita Vedanta and Kashmir
              Shaivism — particularly the practice of Ātma-vichāra (self-inquiry).
            </p>
            <p>
              The question is not "Who am I?" as a conceptual puzzle. It is a direct pointing to
              what is already aware. What you are looking for is what is looking. Awareness has no
              ground because it is the ground of all experience.
            </p>
            <p className="italic opacity-80">
              You cannot find it as an object because you are it. This is not philosophy. This is
              recognition. The center is already here.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <Link
            to="/prana"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Try Prāṇa Gate
          </Link>
          <Link
            to="/score"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            View Live Score →
          </Link>
        </div>
      </section>
    </div>
  );
}
