import { createFileRoute, Link } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/mandala")({
  head: () => ({
    meta: [
      { title: "The Mandala — The Still Point" },
      {
        name: "description",
        content: "Enter the living discussion space of The Still Point community.",
      },
      { property: "og:title", content: "The Mandala — The Still Point" },
      {
        property: "og:description",
        content: "Enter the living discussion space of The Still Point community.",
      },
      { property: "og:url", content: siteUrl("/mandala") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/mandala") }],
  }),
  component: Mandala,
});

function Mandala() {
  const activeDiscussions = [
    { title: "The Witness in Kashmir Śaivism: Trika & Pratyabhijñā", category: "Philosophy", status: "Open Study" },
    { title: "Spanda: Experiencing the Pulse of Pure Awareness", category: "Practice", status: "Ongoing" },
    { title: "The Mirror and the Reflection: Non-Dual Recognition", category: "Direct Inquiry", status: "Inquiry" },
    { title: "Phenomenological Perspectives on Pure Consciousness", category: "Dialogue", status: "Reading Group" },
    { title: "Reflections on Stillness in Daily Life", category: "Contemplation", status: "Open" },
  ];

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          The Mandala
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          The Field is Alive
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
          Long-form study circles, textual exegesis, contemplative inquiry, and
          sangha support — all held within the field of shared Recognition.
        </p>
      </header>

      {/* Active Discussions */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
              Community Study
            </span>
            <h2 className="font-display italic text-4xl md:text-5xl mt-4">Study Circles</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">
              Open Participation
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {activeDiscussions.map((discussion, i) => (
            <div
              key={i}
              className="w-full text-left group border-t border-border pt-8 hover:bg-foreground/5 transition-colors p-4 rounded"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-display text-2xl group-hover:text-accent transition-colors leading-tight mb-3">
                    {discussion.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm opacity-60">
                    <span className="font-mono text-xs uppercase tracking-wider">{discussion.category}</span>
                    <span>·</span>
                    <span className="font-mono text-xs text-accent">{discussion.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 items-center">
          <a
            href="https://github.com/0xneox/beyond-the-veil-dev/discussions"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors inline-block"
          >
            Join Discussions on GitHub →
          </a>
          <Link
            to="/board"
            className="px-8 py-4 border border-border font-mono text-[10px] tracking-[0.2em] uppercase hover:border-foreground transition-colors inline-block"
          >
            Visit Still Board
          </Link>
        </div>
      </section>

      {/* Community Practices */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            Within the mandala
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl mt-6 text-balance">
            Community Practices
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-[1.7] opacity-90">
            <div className="flex gap-4">
              <span className="font-mono text-accent">•</span>
              <p>Long-form study circles on Kashmir Shaivism and Advaita Vedanta texts</p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-accent">•</span>
              <p>Dream sharing and symbolic interpretation</p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-accent">•</span>
              <p>Textual exegesis and deep inquiry into traditional scriptures</p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-accent">•</span>
              <p>Archetype exploration and Jungian integration</p>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-accent">•</span>
              <p>Sangha support in the field of shared Recognition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="space-y-8">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
            Participation
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl mb-8">How to Engage</h2>
          <div className="space-y-4 text-lg leading-[1.7] opacity-80">
            <p>• Study circles on Kashmir Shaivism and Advaita Vedanta texts</p>
            <p>• Dream sharing and symbolic interpretation</p>
            <p>• Textual exegesis and deep inquiry into traditional scriptures</p>
            <p>• Archetype exploration and Jungian integration</p>
            <p>• Community support in the field of shared inquiry</p>
          </div>
        </div>
      </section>

      {/* Still Board Integration */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Share Your Still Point
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-xl mx-auto">
            Post to the Still Board: "I remain still because..." — one-sentence declarations from
            the field.
          </p>
          <div className="pt-6">
            <Link
              to="/board"
              className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              Enter Still Board
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
