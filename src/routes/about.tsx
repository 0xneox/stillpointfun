import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Still Point" },
      { name: "description", content: "A digital sanctuary and transmission space at the intersection of non-dual wisdom and emerging technology." },
      { property: "og:title", content: "About — The Still Point" },
      { property: "og:description", content: "A digital sanctuary and transmission space at the intersection of non-dual wisdom and emerging technology." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">About</span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          The Vision
        </h1>
      </header>

      <section className="container-editorial py-24 grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 md:col-span-5">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">The foundation</span>
        </div>
        <div className="col-span-12 md:col-span-7 space-y-6 text-lg md:text-xl leading-[1.7]">
          <p>
            The Still Point is a digital sanctuary and transmission space founded at the intersection of timeless non-dual realization and the contemporary frontiers of cryptocurrency, artificial intelligence, and collective attention.
          </p>
          <p>
            Rooted in the direct teachings of Kashmir Shaivism (Pratyabhijñā, Spanda, Vijñāna Bhairava) and Advaita Vedanta, we explore the living truth that the witnessing consciousness at the center of all experience remains untouched — even as the world spins in ever-faster cycles of creation and dissolution.
          </p>
          <p className="italic opacity-90">
            Here, blockchain is understood as a new form of collective prana, AI as an extension of mind, and market volatility as Lila made visible. We do not escape the world. We recognize it.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-surface text-surface-foreground py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Our commitment</span>
          <h2 className="font-display italic text-4xl md:text-6xl mt-6 text-balance leading-[1.1]">
            Clarity without dilution. Depth without dogma. Technology in service of Presence.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              We do not compromise the direct path for accessibility. The teachings here are offered in their full potency — not watered down, not simplified, not made palatable for mass consumption.
            </p>
            <p>
              At the same time, we reject dogma and rigid hierarchy. Truth is not the property of any lineage, teacher, or tradition. It is your own direct recognition — available here, now, in this very moment.
            </p>
            <p>
              Technology is not the enemy of awakening. When approached with clarity, these new tools — blockchain, AI, decentralized networks — can serve as powerful mirrors and amplifiers of the awakening process.
            </p>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="container-editorial py-24 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">The path</span>
          <h2 className="font-display italic text-4xl md:text-5xl mb-8">Recognition</h2>
          <div className="space-y-4 text-lg leading-[1.7] opacity-80">
            <p>• Direct pointing to what you already are</p>
            <p>• Self-inquiry and contemplation of the witness</p>
            <p>• Study of Kashmir Shaivism and Advaita Vedanta texts</p>
            <p>• Integration of non-dual recognition into daily life</p>
            <p>• Community support in the field of shared recognition</p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">About the founder</span>
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              A long-time practitioner of Advaita and Kashmir Shaivism with deep immersion since the early days of cryptocurrency (2015) and professional experience in AI and software. The Still Point exists to share the direct path without compromise while exploring how these new technologies reflect eternal principles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
