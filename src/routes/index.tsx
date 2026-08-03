import { createFileRoute, Link } from "@tanstack/react-router";
import { SacredMandala } from "@/components/SacredMandala";
import { WalletButton } from "@/components/WalletButton";
import { StillFigure } from "@/components/StillFigure";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [holders, setHolders] = useState(847);
  const [stillMinutes, setStillMinutes] = useState(12450);

  useEffect(() => {
    const interval = setInterval(() => {
      setStillMinutes(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero - Full Screen */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Logo in top left */}
        <div className="absolute top-8 left-8 z-10">
          <Link to="/" className="block">
            <Logo className="w-12 h-12 opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.08]">
          <SacredMandala className="w-[min(90vh,1000px)] aspect-square [animation:spin-slow_240s_linear_infinite]" />
        </div>
        
        {/* Still Figure at center */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.15]">
          <StillFigure className="w-[min(40vh,400px)] h-[min(80vh,800px)]" />
        </div>
        
        {/* Breathing animation overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-transparent animate-breathe-slow" />
        
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-up">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-balance tracking-tight">
            The market is moving.<br />
            <span className="italic opacity-90">I am still.</span>
          </h1>
        </div>

        {/* Manifesto */}
        <div className="mt-16 max-w-3xl mx-auto animate-fade-up [animation-delay:120ms]">
          <div className="font-display text-lg md:text-xl leading-[1.6] opacity-80 space-y-4 text-balance">
            <p>
              In the heart of motion — markets, minds, machines — there is a center that never moves.
            </p>
            <p>
              The Still Point is a living transmission. A field of recognition. We are not here to escape — we are here to recognize.
            </p>
            <p>
              Here the ancient and the emerging meet without contradiction: blockchain as collective prāṇa, AI as extension of mind, volatility as Līlā made visible.
            </p>
            <p className="italic">
              We do not escape the world. We recognize it. The center is already here. You are already It.
            </p>
          </div>
        </div>

        {/* Three Big Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row gap-6 items-center justify-center animate-fade-up [animation-delay:240ms]">
          <Link 
            to="/prana" 
            className="group relative px-10 py-5 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300 min-w-[200px]"
          >
            Enter Prāṇa Gate
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/inquiry" 
            className="group relative px-10 py-5 border border-foreground text-foreground font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300 min-w-[200px]"
          >
            Begin Groundless Inquiry
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link 
            to="/live" 
            className="group relative px-10 py-5 border border-foreground/30 text-foreground/70 font-mono text-[11px] tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-all duration-300 min-w-[200px]"
          >
            Join Live Still Point
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* Live Still Score Counter */}
        <div className="mt-20 animate-fade-up [animation-delay:360ms]">
          <div className="flex flex-col sm:flex-row gap-12 items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2">Holders</div>
              <div className="font-display text-4xl md:text-5xl">{holders.toLocaleString()}</div>
            </div>
            <div className="w-px h-16 bg-foreground/20" />
            <div className="text-center">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2">Still Minutes Generated</div>
              <div className="font-display text-4xl md:text-5xl">{stillMinutes.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-foreground/30" />
      </header>

      {/* What is this? - 4 sentences max */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center space-y-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">What is this?</span>
          <p className="text-lg md:text-xl leading-relaxed opacity-90 text-balance">
            The Still Point is a living field of recognition. We practice direct stillness in the midst of motion. The $STILL token is your entry to the mandala. The center is already here.
          </p>
        </div>
      </section>

      {/* $STILL Token Bar */}
      <section className="bg-surface text-surface-foreground py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">$STILL Token</span>
              <h2 className="font-display italic text-3xl md:text-4xl mt-2">Hold the Center</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <WalletButton />
              <Link 
                to="/token" 
                className="px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
              >
                View Token
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-6 py-16 border-t border-border">
        <nav className="flex flex-wrap justify-center gap-8">
          <Link to="/prana" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Prāṇa Gate</Link>
          <Link to="/inquiry" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Groundless Inquiry</Link>
          <Link to="/score" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Live Score</Link>
          <Link to="/board" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Still Board</Link>
          <Link to="/live" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Live</Link>
          <Link to="/token" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">$STILL</Link>
          <Link to="/teachings" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Teachings</Link>
          <Link to="/mandala" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Mandala</Link>
          <Link to="/about" className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">About</Link>
        </nav>
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
            The center is already here. You are already It.
          </p>
        </div>
      </footer>
    </div>
  );
}
