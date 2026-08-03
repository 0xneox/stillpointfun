import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/live", label: "Live" },
  { to: "/teachings", label: "Teachings" },
  { to: "/mandala", label: "The Mandala" },
  { to: "/token", label: "$STILL" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between py-6">
        <Link to="/" className="font-mono text-[10px] tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity italic">
          The Still Point
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: false }}
              className="hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <button
          className="md:hidden font-mono text-[10px] tracking-widest uppercase"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-editorial flex flex-col gap-5 py-6 text-[11px] font-mono tracking-widest uppercase">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
