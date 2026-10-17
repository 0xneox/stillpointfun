import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTENT } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/discourses")({
  head: () => ({
    meta: [
      { title: "Discourses — The Still Point" },
      { name: "description", content: "Curated public discourses, talks, satsangs, and philosophical discussions." },
      { property: "og:title", content: "Discourses — The Still Point" },
      {
        property: "og:description",
        content: "Curated public discourses, talks, satsangs, and philosophical discussions.",
      },
      { property: "og:url", content: "/discourses" },
    ],
    links: [{ rel: "canonical", href: "/discourses" }],
  }),
  component: Discourses,
});

function Discourses() {
  // Group content by tradition/subject for discourse organization
  // Only include items that are actual talks/lectures/discourses, not music
  const discoursesBySubject = {
    "Consciousness & Reality": CONTENT.filter((c) =>
      ["REALITY", "COSMOS", "PSYCHEDELIC"].includes(c.channel) &&
      c.media_type !== "music" && c.media_type !== "chanting",
    ),
    "Advaita & Non-Duality": CONTENT.filter((c) =>
      ["REALITY"].includes(c.channel) &&
      c.tradition?.toLowerCase().includes("advaita") &&
      c.media_type !== "music" && c.media_type !== "chanting",
    ),
    "Buddhist Teachings": CONTENT.filter((c) =>
      c.channel === "BUDDHA" &&
      c.media_type !== "music" && c.media_type !== "chanting",
    ),
    "Sufi Traditions": CONTENT.filter((c) =>
      c.channel === "SUFI" &&
      c.media_type !== "music" && c.media_type !== "chanting",
    ),
  };

  // Filter out empty categories
  const filteredSubjects = Object.fromEntries(
    Object.entries(discoursesBySubject).filter(([_, items]) => items.length > 0),
  );

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <Breadcrumbs items={[{ label: "Discourses" }]} />
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            Public Discourses
          </span>
          <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
            Discourses
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
            Curated talks, satsangs, lectures, and philosophical discussions from teachers across
            traditions. Publicly accessible discourses for study and contemplation.
          </p>
        </div>
      </header>

      {/* Curated Collections */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-16">
          {Object.entries(filteredSubjects).map(([subject, items]) => (
            <div key={subject}>
              <h2 className="font-display text-2xl md:text-3xl mb-6">{subject}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    to="/listen/$id"
                    params={{ id: item.id }}
                    className="block group py-4 border-b border-border hover:border-accent transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-mono text-sm opacity-60 mt-1">
                          {item.artist_or_speaker}
                          {item.tradition && ` · ${item.tradition}`}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Information */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
            About These Discourses
          </span>
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              These discourses are curated from publicly available sources including YouTube,
              archives, and authorized channels. Each entry identifies the original creator and
              source.
            </p>
            <p>
              The collection focuses on authentic teachings from Advaita Vedanta, Kashmir Śaivism,
              Buddhism, Sufism, and other contemplative traditions, as well as philosophical
              explorations of consciousness and reality.
            </p>
            <p className="italic opacity-80">
              This is not a platform for original video production. It is a curated space for
              discovering meaningful discourses already available in the public domain.
            </p>
          </div>
        </div>
      </section>

      {/* Browse Related */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Explore Further
          </h2>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              Browse All Listening
            </Link>
            <Link
              to="/journal"
              className="px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Read the Journal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
