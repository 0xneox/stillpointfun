import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto space-y-8 fade-in">
        <div className="font-display text-8xl md:text-9xl opacity-20">404</div>

        <div className="space-y-4">
          <h1 className="font-display text-3xl md:text-4xl italic">Not found</h1>
          <p className="font-sans text-base opacity-70 leading-relaxed">
            This page does not exist. It may have been moved or never existed at all.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors hover-lift press-scale"
          >
            Return Home
          </Link>
          <Link
            to="/"
            className="px-8 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-colors hover-lift press-scale"
          >
            Browse Listening
          </Link>
        </div>
      </div>
    </div>
  );
}
