import { Link } from "@tanstack/react-router";

interface ErrorStateProps {
  title?: string;
  message?: string;
  showHome?: boolean;
  action?: {
    label: string;
    to: string;
  };
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  showHome = true,
  action,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto space-y-8">
        <div className="w-16 h-16 mx-auto opacity-20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-full h-full"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-3xl md:text-4xl italic">{title}</h1>
          <p className="font-sans text-base opacity-70 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {action && (
            <Link
              to={action.to}
              className="px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors hover-lift press-scale"
            >
              {action.label}
            </Link>
          )}
          {showHome && (
            <Link
              to="/"
              className="px-8 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-colors hover-lift press-scale"
            >
              Return Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
