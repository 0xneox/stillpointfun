import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="px-6 py-24 bg-surface text-surface-foreground mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          <div className="max-w-xs">
            <h5 className="font-display text-3xl italic mb-6">The Still Point</h5>
            <p className="text-sm opacity-60 mb-6 leading-relaxed">
              Not an investment vehicle. A recognition vehicle.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 text-[11px] font-mono tracking-widest uppercase">
            <div className="flex flex-col gap-4">
              <span className="opacity-30">Navigation</span>
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <Link to="/live" className="hover:text-accent transition-colors">Live</Link>
              <Link to="/teachings" className="hover:text-accent transition-colors">Teachings</Link>
              <Link to="/mandala" className="hover:text-accent transition-colors">The Mandala</Link>
              <Link to="/token" className="hover:text-accent transition-colors">$STILL</Link>
              <Link to="/about" className="hover:text-accent transition-colors">About</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-30">Connect</span>
              <a href="https://twitter.com/TheStillPoint" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">X / Twitter</a>
              <a href="#" className="hover:text-accent transition-colors">Discord</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase">
              The Still Point © 2026
            </span>
            <span className="font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase">
              All content offered in the spirit of the tradition — for those who truly seek.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
