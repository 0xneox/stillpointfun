import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CONTENT_NAV_LINKS } from "@/data/content-registry";

export function SiteFooter() {
  return (
    <footer className="px-6 py-24 bg-surface text-surface-foreground mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          <div className="max-w-xs">
            <div className="mb-6">
              <Logo className="h-10 w-auto" />
            </div>
            <p className="text-sm opacity-60 mb-6 leading-relaxed">
              An independent, open-source project for listening, inquiry, and the exploration of
              consciousness.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 text-[11px] font-mono tracking-widest uppercase">
            <div className="flex flex-col gap-4">
              <span className="opacity-30">Navigation</span>
              <Link to="/" className="hover:text-accent transition-colors">
                Listen
              </Link>
              <Link to="/library" className="hover:text-accent transition-colors">
                Library
              </Link>
              <Link to="/writings" className="hover:text-accent transition-colors">
                Writings
              </Link>
              <Link to="/journal" className="hover:text-accent transition-colors">
                Journal & Notes
              </Link>
              <Link to="/discourses" className="hover:text-accent transition-colors">
                Discourses
              </Link>
              <Link to="/audiobooks" className="hover:text-accent transition-colors">
                Audiobooks
              </Link>
              {CONTENT_NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-30">About</span>
              <Link to="/about" className="hover:text-accent transition-colors">
                About
              </Link>
              <Link to="/disclaimer" className="hover:text-accent transition-colors">
                Disclaimer
              </Link>
              <a
                href="https://github.com/0xneox/stillpointfun"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase">
              The Still Point © 2026
            </span>
            <span className="font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase">
              Initiated by <a href="https://21b.fun" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">21b.fun</a> · Made by <a href="https://binarybodhi.xyz" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">binarybodhi.xyz</a>
            </span>
            <span className="font-mono text-[9px] opacity-40 tracking-[0.3em] uppercase">
              Open source · Free for inquiry
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
