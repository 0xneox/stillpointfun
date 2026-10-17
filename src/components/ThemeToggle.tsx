import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, THEME_KEY } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore localStorage errors
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all"
    >
      {mounted ? (theme === "dark" ? "☾ Night" : "☀ Day") : "◌"}
    </button>
  );
}
