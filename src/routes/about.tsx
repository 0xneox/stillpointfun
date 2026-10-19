import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Still Point" },
      {
        name: "description",
        content:
          "A digital sanctuary and transmission space at the intersection of non-dual wisdom and emerging technology.",
      },
      { property: "og:title", content: "About — The Still Point" },
      {
        property: "og:description",
        content:
          "A digital sanctuary and transmission space at the intersection of non-dual wisdom and emerging technology.",
      },
      { property: "og:url", content: siteUrl("/about") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/about") }],
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
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
            The foundation
          </span>
        </div>
        <div className="col-span-12 md:col-span-7 space-y-6 text-lg md:text-xl leading-[1.7]">
          <p>
            The Still Point is an open space for the investigation of consciousness, reality,
            self-recognition, and contemplative wisdom.
          </p>
          <p>
            Rooted in the direct teachings of Kashmir Śaivism (Pratyabhijñā, Spanda, Vijñāna
            Bhairava) and Advaita Vedānta, we explore the living truth that the witnessing
            consciousness at the center of all experience remains untouched — even as the world
            spins in ever-faster cycles of creation and dissolution.
          </p>
          <p className="italic opacity-90">
            Knowledge is open. Inquiry is free. The work belongs to everyone who contributes to it.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-surface text-surface-foreground py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            Our commitment
          </span>
          <h2 className="font-display italic text-4xl md:text-6xl mt-6 text-balance leading-[1.1]">
            Clarity without dilution. Depth without dogma. Technology in service of Presence.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              We do not compromise the direct path for accessibility. The teachings here are offered
              in their full potency — not watered down, not simplified, not made palatable for mass
              consumption.
            </p>
            <p>
              At the same time, we reject dogma and rigid hierarchy. Truth is not the property of
              any lineage, teacher, or tradition. It is your own direct recognition — available
              here, now, in this very moment.
            </p>
            <p>
              This is an open-source project. The code, the content structure, and the design are
              freely available for study, modification, and contribution.
            </p>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="container-editorial py-24 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
            The path
          </span>
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

      {/* Open Source */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
            Open Source
          </span>
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              This project is open source. The code is freely available, the design system is
              documented, and the content structure is designed for community contribution.
            </p>
            <p>
              We believe that knowledge should be accessible, inquiry should be free, and the tools
              for contemplative practice should be available to all.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
