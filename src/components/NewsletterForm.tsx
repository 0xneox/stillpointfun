import { useState, type FormEvent } from "react";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  }

  const borderClass = variant === "dark" ? "border-background/20" : "border-border";
  const placeholder = variant === "dark" ? "placeholder:opacity-30" : "placeholder:text-muted-foreground/50";

  return (
    <form onSubmit={onSubmit} className={`flex gap-4 border-b ${borderClass} pb-2 w-full`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className={`bg-transparent w-full text-xs font-mono uppercase tracking-widest outline-none ${placeholder}`}
      />
      <button
        type="submit"
        className="text-xs font-mono uppercase tracking-widest text-accent whitespace-nowrap hover:opacity-70 transition-opacity"
      >
        {done ? "Sent ✓" : "Join"}
      </button>
    </form>
  );
}
