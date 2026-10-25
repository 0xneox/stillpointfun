import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";
import { CONTENT_NAV_LINKS } from "@/data/content-registry";

const links = [
  { to: "/", label: "LISTEN" },
  { to: "/audiobooks", label: "AUDIOBOOKS" },
  { to: "/library", label: "LIBRARY" },
  { to: "/writings", label: "WRITINGS" },
  { to: "/journal", label: "JOURNAL" },
  { to: "/discourses", label: "DISCOURSES" },
] as const;

export function StillpointNav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSelect = () => {
    // Handled internally by SearchBar
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-editorial flex items-center justify-between py-6 md:py-6">
        <Link to="/" className="hover:opacity-80 transition-opacity touch-manipulation">
          <Logo className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: false }}
              className="hover:text-accent transition-colors py-2"
            >
              {l.label}
            </Link>
          ))}
          {CONTENT_NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: false }}
              className="hover:text-accent transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-accent transition-colors py-2"
            aria-label="Search"
          >
            SEARCH
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="font-mono text-[10px] tracking-widest uppercase touch-manipulation"
            aria-label="Search"
          >
            🔍
          </button>
          <button
            className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 touch-manipulation"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background py-4">
          <SearchBar onSelect={handleSearchSelect} />
        </div>
      )}

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-editorial flex flex-col gap-2 py-6 text-[11px] font-mono tracking-widest uppercase">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:text-accent transition-colors py-3 block"
              >
                {l.label}
              </Link>
            ))}
            {CONTENT_NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="hover:text-accent transition-colors py-3 block"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
