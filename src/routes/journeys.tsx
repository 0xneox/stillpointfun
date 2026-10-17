import { createFileRoute, Link } from "@tanstack/react-router";
import { JOURNEYS, CONTENT } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/journeys")({
  component: Journeys,
});

function Journeys() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <Breadcrumbs items={[{ label: "Journeys" }]} />
        <div className="text-center space-y-8 mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">JOURNEYS</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Curated listening sequences
          </h1>
          <p className="font-sans text-lg opacity-70 max-w-2xl mx-auto">
            A journey is a deliberately curated sequence across different traditions. The point is
            not genre consistency — it's emotional and intellectual continuity.
          </p>
        </div>

        <div className="space-y-12">
          {JOURNEYS.map((journey) => (
            <Link key={journey.id} to={`/journey/${journey.id}`} className="block group">
              <div className="border-b border-border pb-8 group-hover:border-accent transition-colors">
                <h2 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">
                  {journey.title}
                </h2>
                {journey.introduction && (
                  <p className="mt-2 font-sans text-sm opacity-60">{journey.introduction}</p>
                )}
                {journey.description && (
                  <p className="mt-2 font-sans text-sm opacity-60">{journey.description}</p>
                )}
                <p className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-50">
                  {journey.items.length} items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
