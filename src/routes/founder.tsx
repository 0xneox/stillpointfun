import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "About the Founder — The Still Point" },
      { name: "description", content: "About the founder of The Still Point." },
      { property: "og:title", content: "About the Founder — The Still Point" },
      { property: "og:description", content: "About the founder of The Still Point." },
      { property: "og:url", content: "/founder" },
    ],
    links: [{ rel: "canonical", href: "/founder" }],
  }),
  component: Founder,
});

function Founder() {
  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">About the Founder</span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          The Seeker
        </h1>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-8 text-lg leading-[1.7]">
          <p>
            A long-time practitioner of Advaita and Kashmir Shaivism with deep immersion since the early days of cryptocurrency (2015) and professional experience in AI and software.
          </p>
          <p>
            The Still Point exists to share the direct path without compromise while exploring how these new technologies reflect eternal principles.
          </p>
          <p className="italic opacity-90">
            The teaching is not the teacher. The pointer is not the pointed. What matters is the recognition of what you already are.
          </p>
        </div>
      </section>

      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Background</span>
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              Based between the Himalayas, Dubai, and Bangalore. A digital nomad in both geography and consciousness.
            </p>
            <p>
              Professional experience spans artificial intelligence, software architecture, and decentralized systems — all approached through the lens of non-dual inquiry.
            </p>
            <p>
              The writings here emerge from decades of contemplative practice, textual study, and the integration of wisdom traditions with contemporary life.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center space-y-8">
          <p className="font-display text-2xl md:text-3xl italic">
            "The word you speak is the word you are. In the absence of speech, the truth is louder than a thousand thunderclaps."
          </p>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            — Notebook, autumn
          </div>
        </div>
      </section>
    </div>
  );
}
