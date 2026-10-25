import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — The Still Point" },
      { name: "description", content: "Disclaimer for The Still Point." },
      { property: "og:title", content: "Disclaimer — The Still Point" },
      { property: "og:description", content: "Disclaimer for The Still Point." },
      { property: "og:url", content: siteUrl("/disclaimer") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/disclaimer") }],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          Disclaimer
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Important Notice
        </h1>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-8 text-lg leading-[1.7]">
          <p>
            This site and its teachings are for educational, philosophical, and contemplative
            purposes only.
          </p>
        </div>
      </section>

      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
            Teachings Disclaimer
          </span>
          <div className="space-y-4 text-base leading-relaxed opacity-90">
            <p>
              The spiritual and philosophical teachings shared on this site are offered in the
              spirit of the tradition. They are not intended to replace professional mental health
              care, medical treatment, or therapeutic services.
            </p>
            <p>
              If you are experiencing mental health challenges, please consult with qualified
              healthcare professionals. The teachings here are complementary to, not a substitute
              for, proper care.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
          Content Ownership
        </span>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            The contents of this site — including audiobooks, library materials, and discourses —
            are not owned by me or by Still Point. These are open-source contributions, sourced
            from the Internet Archive and other public sources by community members.
          </p>
          <p>
            The only content that is original or owned by Still Point is the writings and journals.
            All other materials are shared as contributed resources for educational and contemplative
            purposes.
          </p>
        </div>
      </section>
    </div>
  );
}
