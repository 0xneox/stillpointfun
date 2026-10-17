export function SacredMandala({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="300" cy="300" r="290" />
        <circle cx="300" cy="300" r="220" />
        <circle cx="300" cy="300" r="150" />
        <circle cx="300" cy="300" r="80" />
        <g transform="translate(300 300)">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="0" y1="0" x2="0" y2="-290" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <polygon points="300,80 480,380 120,380" />
        <polygon points="300,520 480,220 120,220" />
        <circle cx="300" cy="300" r="40" />
      </svg>
    </div>
  );
}
