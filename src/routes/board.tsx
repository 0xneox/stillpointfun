import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      { title: "Still Board — The Still Point" },
      {
        name: "description",
        content: "Community board: 'I remain still because...' one-sentence posts.",
      },
      { property: "og:title", content: "Still Board — The Still Point" },
      {
        property: "og:description",
        content: "Community board: 'I remain still because...' one-sentence posts.",
      },
      { property: "og:url", content: "/board" },
    ],
    links: [{ rel: "canonical", href: "/board" }],
  }),
  component: StillBoard,
});

interface PostItem {
  id: number | string;
  text: string;
  author: string;
  time: string;
}

function StillBoard() {
  const [posts, setPosts] = useState<PostItem[]>(() => {
    const saved = localStorage.getItem("stillBoardPosts");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        text: "I remain still because the witness never moves.",
        author: "Anonymous",
        time: "2m ago",
      },
      {
        id: 2,
        text: "I remain still because chaos is just motion recognized.",
        author: "Anonymous",
        time: "5m ago",
      },
      {
        id: 3,
        text: "I remain still because the center is already here.",
        author: "Anonymous",
        time: "8m ago",
      },
      {
        id: 4,
        text: "I remain still because I am not the story.",
        author: "Anonymous",
        time: "12m ago",
      },
      {
        id: 5,
        text: "I remain still because awareness has no ground.",
        author: "Anonymous",
        time: "15m ago",
      },
      {
        id: 6,
        text: "I remain still because the market moves, I don't.",
        author: "Anonymous",
        time: "18m ago",
      },
      {
        id: 7,
        text: "I remain still because recognition is immediate.",
        author: "Anonymous",
        time: "22m ago",
      },
      {
        id: 8,
        text: "I remain still because there is nowhere to go.",
        author: "Anonymous",
        time: "25m ago",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("stillBoardPosts", JSON.stringify(posts));
  }, [posts]);

  const [newPost, setNewPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        const post = {
          id: posts.length + 1,
          text: newPost.trim(),
          author: "Anonymous",
          time: "Just now",
        };
        setPosts([post, ...posts]);
        setNewPost("");
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          Community Board
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          Still Board
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
          One-sentence posts: "I remain still because..."
        </p>
      </header>

      {/* Post Form */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-b border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-3">
              Complete the sentence
            </label>
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl opacity-80 italic">
                I remain still because
              </span>
              <input
                type="text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="..."
                className="flex-1 bg-transparent border-b border-border py-3 font-display text-2xl opacity-80 italic placeholder:opacity-30 focus:outline-none focus:border-foreground transition-colors"
                maxLength={200}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] opacity-50">
              {newPost.length}/200 characters
            </span>
            <button
              type="submit"
              disabled={!newPost.trim() || isSubmitting}
              className="px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Post to Board"}
            </button>
          </div>
        </form>
      </section>

      {/* Posts Feed */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="border-t border-border pt-8">
              <div className="space-y-4">
                <p className="font-display text-xl md:text-2xl leading-relaxed text-balance">
                  <span className="opacity-80 italic">I remain still because</span>{" "}
                  <span className="opacity-90">{post.text}</span>
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm opacity-70">{post.author}</span>
                  <span className="font-mono text-xs opacity-50">{post.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            About Still Board
          </span>
          <div className="mt-8 space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              The Still Board is a living record of collective recognition. Each post is a
              one-sentence pointer to the still center that never moves. The field remembers.
            </p>
            <p className="italic opacity-80">
              The board is not for discussion. It is for declaration. I remain still because... You
              are already It.
            </p>
          </div>
        </div>
      </section>

      {/* Board Guidelines */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Share Your Still Point
          </h2>
          <p className="text-lg opacity-80 leading-relaxed max-w-xl mx-auto">
            One-sentence declarations from the field. The board is for declaration, not discussion.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <Link
            to="/score"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Live Score
          </Link>
          <Link
            to="/live"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            Join Live Session →
          </Link>
        </div>
      </section>
    </div>
  );
}
