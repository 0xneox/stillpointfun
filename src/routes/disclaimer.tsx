import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — The Still Point" },
      { name: "description", content: "Disclaimer for The Still Point." },
      { property: "og:title", content: "Disclaimer — The Still Point" },
      { property: "og:description", content: "Disclaimer for The Still Point." },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Disclaimer</span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Important Notice
        </h1>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-8 text-lg leading-[1.7]">
          <p>
            This site and its teachings are for educational, philosophical, and contemplative purposes only.
          </p>
          
          <div className="bg-surface text-surface-foreground p-8 rounded">
            <h2 className="font-display text-2xl italic mb-4">$STILL Token Disclaimer</h2>
            <p className="text-base leading-relaxed opacity-90">
              $STILL is a community participation token with no guarantee of value. Cryptocurrency investments involve significant risk, including the potential loss of your entire investment. The value of $STILL may fluctuate dramatically and could become worthless.
            </p>
          </div>

          <div className="space-y-4 text-base leading-relaxed opacity-80">
            <p>
              <strong>Not Financial Advice:</strong> Nothing on this site constitutes financial, investment, or trading advice. Any information provided is for educational purposes only and should not be construed as financial advice.
            </p>
            <p>
              <strong>Do Your Own Research:</strong> You should conduct your own due diligence and consult with qualified financial advisors before making any investment decisions.
            </p>
            <p>
              <strong>No Guarantees:</strong> Past performance is not indicative of future results. There are no guarantees of profits or returns from any activities mentioned on this site.
            </p>
            <p>
              <strong>Risk Acknowledgment:</strong> By engaging with any content or participating in any activities on this site, you acknowledge and accept full responsibility for your own decisions and any associated risks.
            </p>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="font-display text-xl italic">
              Crypto involves risk. Realize the Self.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">Teachings Disclaimer</span>
          <div className="space-y-4 text-base leading-relaxed opacity-90">
            <p>
              The spiritual and philosophical teachings shared on this site are offered in the spirit of the tradition. They are not intended to replace professional mental health care, medical treatment, or therapeutic services.
            </p>
            <p>
              If you are experiencing mental health challenges, please consult with qualified healthcare professionals. The teachings here are complementary to, not a substitute for, proper care.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
