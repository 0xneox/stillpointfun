import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CONTENT } from "@/data/content";
import { POSTS } from "@/data/posts";

export const Route = createFileRoute("/library")({
  component: Library,
});

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  translator?: string;
  tradition?: string;
  language?: string;
  format: "book" | "pdf" | "audiobook" | "lecture" | "paper";
  description?: string;
  sourceUrl?: string;
  tags: string[];
  relatedAudio?: string[];
  relatedArticles?: string[];
}

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: "tantraloka",
    title: "Tantrāloka",
    author: "Abhinavagupta",
    translator: "Various",
    tradition: "Kashmir Śaivism",
    language: "Sanskrit / English",
    format: "book",
    description:
      "Abhinavagupta's magnum opus on Kashmir Śaivism. 12 volumes covering the entire tradition.",
    tags: ["abhinavagupta", "kashmir-shaivism", "tantra", "philosophy"],
    sourceUrl: "https://archive.org/details/Tantraloka",
  },
  {
    id: "upanishads",
    title: "Principal Upaniṣads",
    author: "Traditional",
    translator: "Eknath Easwaran",
    tradition: "Vedanta",
    language: "Sanskrit / English",
    format: "book",
    description: "The principal Upaniṣads with accessible translations.",
    tags: ["upanishads", "vedanta", "advaita", "scripture"],
    sourceUrl: "https://www.amazon.com/Upanishads-Eknath-Easwaran/dp/1586380214",
  },
  {
    id: "ashtavakra-gita",
    title: "Aṣṭāvakra Gītā",
    author: "Traditional",
    translator: "Bart Marshall",
    tradition: "Advaita",
    language: "Sanskrit / English",
    format: "book",
    description: "The dialogue between King Janaka and sage Aṣṭāvakra on the nature of reality.",
    tags: ["advaita", "non-duality", "ashtavakra", "dialogue"],
    sourceUrl: "https://www.amazon.com/Ashtavakra-Gita-Bart-Marshall/dp/0964365001",
  },
  {
    id: "spanda-karikas",
    title: "Spanda-Kārikās",
    author: "Vasugupta",
    translator: "Jaideva Singh",
    tradition: "Kashmir Śaivism",
    language: "Sanskrit / English",
    format: "book",
    description: "The sacred tremor. Understanding Spanda as the pulse of consciousness.",
    tags: ["spanda", "kashmir-shaivism", "vasugupta", "consciousness"],
    sourceUrl: "https://www.amazon.com/Spanda-Karikas-Vasugupta/dp/8120801620",
  },
  {
    id: "vivekachudamani",
    title: "Vivekacūḍāmaṇi",
    author: "Adi Shankaracharya",
    translator: "Swami Madhavananda",
    tradition: "Advaita Vedanta",
    language: "Sanskrit / English",
    format: "book",
    description: "The Crest Jewel of Discrimination. A classic text on self-inquiry.",
    tags: ["advaita", "shankara", "self-inquiry", "discrimination"],
    sourceUrl: "https://archive.org/details/Vivekachudamani",
  },
  {
    id: "tripura-rahasya",
    title: "Tripura Rahasya",
    author: "Traditional",
    translator: "Swami Sri Ramanananda Saraswathi",
    tradition: "Advaita / Shaktism",
    language: "Sanskrit / English",
    format: "book",
    description:
      "The Secret of the Three Cities. A comprehensive text on non-dual philosophy and practice.",
    tags: ["advaita", "tripura", "non-duality", "practice"],
    sourceUrl: "https://archive.org/details/TripuraRahasya",
  },
  {
    id: "yoga-vasistha",
    title: "Yoga Vāsiṣṭha",
    author: "Valmiki",
    translator: "Swami Venkatesananda",
    tradition: "Advaita Vedanta",
    language: "Sanskrit / English",
    format: "book",
    description:
      "A dialogue between Rama and sage Vasistha on the nature of reality and liberation.",
    tags: ["advaita", "vasistha", "non-duality", "dialogue"],
    sourceUrl: "https://archive.org/details/YogaVasisthaComplete",
  },
];

function Library() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <Breadcrumbs items={[{ label: "Library" }]} />
        <div className="text-center space-y-8 mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">LIBRARY</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Books and Documents
          </h1>
          <p className="font-sans text-lg opacity-70 max-w-2xl mx-auto">
            A searchable collection of books, PDFs, lectures, and reference materials. Where
            redistribution is authorized, links lead to authorized sources.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {["All", "Books"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Library Items */}
        <div className="space-y-8">
          {LIBRARY_ITEMS.map((item) => {
            // Find related articles based on tags
            const relatedArticles = POSTS.filter((post) =>
              post.tags?.some((tag) => item.tags.includes(tag.toLowerCase())),
            ).slice(0, 2);

            return (
              <div key={item.id} className="border-b border-border pb-8 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded">
                        {item.format}
                      </span>
                      {item.tradition && (
                        <span className="font-mono text-xs opacity-50">{item.tradition}</span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="font-mono text-sm opacity-70 mb-2">
                      {item.author}
                      {item.translator && ` · Translated by ${item.translator}`}
                    </p>
                    {item.description && (
                      <p className="font-sans text-sm opacity-60 max-w-2xl">{item.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] opacity-40 hover:opacity-70 transition-opacity"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all"
                    >
                      Access
                    </a>
                  ) : (
                    <span className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase opacity-40">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Related Audio */}
                {item.relatedAudio && item.relatedAudio.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4">
                      Related Audio
                    </p>
                    <div className="space-y-2">
                      {item.relatedAudio.map((audioId) => {
                        const audioItem = CONTENT.find((c) => c.id === audioId);
                        if (!audioItem) return null;
                        return (
                          <Link
                            key={audioId}
                            to="/listen/$id"
                            params={{ id: audioId }}
                            className="block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all"
                          >
                            {audioItem.title} · {audioItem.artist_or_speaker}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Related Articles */}
                {(item.relatedArticles || relatedArticles.length > 0) && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4">
                      Related Articles
                    </p>
                    <div className="space-y-2">
                      {item.relatedArticles?.map((slug) => {
                        const article = POSTS.find((p) => p.slug === slug);
                        if (!article) return null;
                        return (
                          <Link
                            key={slug}
                            to="/teachings/$slug"
                            params={{ slug }}
                            className="block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all"
                          >
                            {article.title}
                          </Link>
                        );
                      })}
                      {relatedArticles.map((article) => (
                        <Link
                          key={article.slug}
                          to="/teachings/$slug"
                          params={{ slug: article.slug }}
                          className="block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all"
                        >
                          {article.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note on Rights */}
        <section className="mt-24 pt-12 border-t border-border">
          <div className="space-y-4 text-sm opacity-60 leading-relaxed">
            <p className="font-mono text-[10px] tracking-widest uppercase">On Access and Rights</p>
            <p>
              This library records bibliographic information for texts that may be under copyright.
              Where redistribution is not authorized, links lead to authorized sources rather than
              the work itself. We do not treat possession of a PDF as proof of redistribution
              rights.
            </p>
            <p>
              The collection grows through careful curation, respecting both the need for access and
              the rights of authors and publishers.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
