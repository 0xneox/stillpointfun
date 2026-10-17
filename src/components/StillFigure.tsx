export function StillFigure({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Human silhouette */}
      <svg viewBox="0 0 100 200" className="w-full h-full opacity-80" fill="currentColor">
        {/* Head */}
        <circle cx="50" cy="25" r="15" />
        {/* Body */}
        <path
          d="M50 40 L50 90 M50 50 L30 70 M50 50 L70 70 M50 90 L35 140 M50 90 L65 140 M35 140 L25 190 M65 140 L75 190"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Bindu at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full animate-pulse" />

      {/* Subtle energy rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-foreground/20 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-foreground/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
    </div>
  );
}
