import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryImage,
} from "@/data/gallery";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Still Point" },
      {
        name: "description",
        content:
          "A visual journal from travel, nature, and sacred places. Photographs from the road and from home.",
      },
      { property: "og:title", content: "Gallery — The Still Point" },
      {
        property: "og:description",
        content: "A visual journal from travel, nature, and sacred places.",
      },
      { property: "og:url", content: siteUrl("/gallery") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/gallery") }],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  return (
    <div>
      <header className="container-editorial pt-24 pb-12 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Gallery</span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance">
          Captured Presence
        </h1>
        <p className="mt-6 max-w-xl opacity-70 text-lg leading-relaxed">
          Moments of stillness in motion. Ongoing, un-curated in strict sequence, filed loosely by
          shape and mood.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          <CatPill active={filter === "All"} label="All" onClick={() => setFilter("All")} />
          {GALLERY_CATEGORIES.map((c) => (
            <CatPill key={c} active={filter === c} label={c} onClick={() => setFilter(c)} />
          ))}
        </div>
      </header>

      <section className="container-editorial py-16">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setOpenIndex(i)}
              className="mb-4 w-full block break-inside-avoid group relative overflow-hidden text-left"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
                className="w-full h-auto object-cover bg-muted transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="font-mono text-[9px] tracking-widest uppercase text-background bg-foreground/80 backdrop-blur px-2 py-1 inline-block">
                  {new Date(img.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNav={(dir) =>
            setOpenIndex((i) => (i === null ? null : (i + dir + images.length) % images.length))
          }
        />
      )}
    </div>
  );
}

function CatPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border hover:bg-foreground hover:text-background"
      }`}
    >
      {label}
    </button>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  const img = images[index];
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 text-white/60 hover:text-white font-mono text-[11px] tracking-widest uppercase"
      >
        Close ✕
      </button>
      <button
        onClick={() => onNav(-1)}
        aria-label="Previous"
        className="absolute left-6 md:left-12 text-white/50 hover:text-white text-3xl"
      >
        ‹
      </button>
      <button
        onClick={() => onNav(1)}
        aria-label="Next"
        className="absolute right-6 md:right-12 text-white/50 hover:text-white text-3xl"
      >
        ›
      </button>

      <figure className="max-w-[92vw] max-h-[85vh] flex flex-col items-center">
        <img src={img.src} alt={img.alt} className="max-w-full max-h-[75vh] object-contain" />
        <figcaption className="mt-6 text-center text-white/70">
          <p className="font-display italic text-xl">"{img.caption}"</p>
          <p className="mt-2 font-mono text-[10px] tracking-widest uppercase opacity-60">
            {new Date(img.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {img.category}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
