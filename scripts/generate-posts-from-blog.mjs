import fs from "node:fs";
import path from "node:path";

const blogDir = path.resolve(process.cwd(), "src/blog");
const postsFile = path.resolve(process.cwd(), "src/data/posts.ts");

// Read existing posts.ts to preserve metadata
function readExistingPosts() {
  try {
    const postsContent = fs.readFileSync(postsFile, "utf8");
    const postsMatch = postsContent.match(/export const POSTS: Post\[\] = \[([\s\S]+?)\];/);
    if (!postsMatch) return {};

    const postsArray = postsMatch[1];
    const metadata = {};

    // Extract slug, date, readMinutes, topic, tags from existing posts
    const slugPattern = /slug:\s*"([^"]+)"/g;
    const datePattern = /date:\s*"([^"]+)"/g;
    const readMinutesPattern = /readMinutes:\s*(\d+)/g;
    const topicPattern = /topic:\s*"([^"]+)"/g;
    const tagsPattern = /tags:\s*(\[([\s\S]*?)\])/g;

    let slugMatch;
    while ((slugMatch = slugPattern.exec(postsArray)) !== null) {
      const slug = slugMatch[1];
      metadata[slug] = {};
    }

    // Reset regex lastIndex
    slugPattern.lastIndex = 0;
    datePattern.lastIndex = 0;
    readMinutesPattern.lastIndex = 0;
    topicPattern.lastIndex = 0;
    tagsPattern.lastIndex = 0;

    let slug;
    while ((slugMatch = slugPattern.exec(postsArray)) !== null) {
      slug = slugMatch[1];
      const startIndex = slugMatch.index;

      // Find date
      datePattern.lastIndex = startIndex;
      const dateMatch = datePattern.exec(postsArray);
      if (dateMatch) metadata[slug].date = dateMatch[1];

      // Find readMinutes
      readMinutesPattern.lastIndex = startIndex;
      const readMinutesMatch = readMinutesPattern.exec(postsArray);
      if (readMinutesMatch) metadata[slug].readMinutes = parseInt(readMinutesMatch[1]);

      // Find topic
      topicPattern.lastIndex = startIndex;
      const topicMatch = topicPattern.exec(postsArray);
      if (topicMatch) metadata[slug].topic = topicMatch[1];

      // Find tags
      tagsPattern.lastIndex = startIndex;
      const tagsMatch = tagsPattern.exec(postsArray);
      if (tagsMatch) {
        try {
          metadata[slug].tags = JSON.parse(tagsMatch[1]);
        } catch (e) {
          metadata[slug].tags = [];
        }
      }
    }

    return metadata;
  } catch (e) {
    console.warn("Could not read existing posts.ts metadata:", e.message);
    return {};
  }
}

// Read all markdown files from src/blog
const blogFiles = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith(".md"))
  .sort();

// Read existing metadata
const existingMetadata = readExistingPosts();

// Function to parse markdown and convert to posts.ts format
function parseMarkdownToPost(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath, ".md");
  const slug = fileName;

  // Extract title from first H1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : fileName.replace(/-/g, " ");

  // Extract first paragraph as excerpt
  const excerptMatch = content.match(/^#\s+.+\n\n(.+?)(?:\n\n|$)/m);
  const excerpt = excerptMatch ? excerptMatch[1].trim() : content.split("\n\n")[1]?.trim() || "";

  // Convert markdown to posts.ts body format
  const body = markdownToBody(content);

  // Use existing metadata if available, otherwise use defaults
  const existing = existingMetadata[slug] || {};

  const date = existing.date || "2025-01-01";
  const readMinutes = existing.readMinutes || Math.ceil(content.split(/\s+/).length / 200);
  const topic = existing.topic || "God & Shiva";
  const tags = existing.tags || [];

  return {
    slug,
    title,
    excerpt,
    date,
    readMinutes,
    topic,
    tags,
    body,
  };
}

// Convert markdown to structured body format
function markdownToBody(markdown) {
  const lines = markdown.split("\n");
  const body = [];
  let currentParagraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip the title (first H1)
    if (i === 0 && line.startsWith("# ")) continue;

    // Handle headings
    if (line.startsWith("## ")) {
      // Flush any accumulated paragraph
      if (currentParagraph.length > 0) {
        body.push({
          type: "p",
          text: currentParagraph.join(" ").trim(),
        });
        currentParagraph = [];
      }
      body.push({
        type: "h2",
        text: line.replace(/^##\s+/, "").trim(),
      });
    } else if (line.startsWith("### ")) {
      if (currentParagraph.length > 0) {
        body.push({
          type: "p",
          text: currentParagraph.join(" ").trim(),
        });
        currentParagraph = [];
      }
      body.push({
        type: "h3",
        text: line.replace(/^###\s+/, "").trim(),
      });
    } else if (line.trim() === "") {
      // Empty line - flush paragraph
      if (currentParagraph.length > 0) {
        body.push({
          type: "p",
          text: currentParagraph.join(" ").trim(),
        });
        currentParagraph = [];
      }
    } else if (line.startsWith("> ")) {
      // Blockquote - treat as paragraph
      if (currentParagraph.length > 0) {
        body.push({
          type: "p",
          text: currentParagraph.join(" ").trim(),
        });
        currentParagraph = [];
      }
      body.push({
        type: "p",
        text: line.replace(/^>\s+/, "").trim(),
      });
    } else if (line.startsWith("- ")) {
      // List item - treat as paragraph
      if (currentParagraph.length > 0) {
        body.push({
          type: "p",
          text: currentParagraph.join(" ").trim(),
        });
        currentParagraph = [];
      }
      body.push({
        type: "p",
        text: line.replace(/^-\s+/, "").trim(),
      });
    } else if (line.startsWith("*") && line.endsWith("*")) {
      // Bold text within paragraph
      currentParagraph.push(line);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      // Bold text within paragraph
      currentParagraph.push(line);
    } else {
      // Regular paragraph text
      currentParagraph.push(line);
    }
  }

  // Flush final paragraph
  if (currentParagraph.length > 0) {
    body.push({
      type: "p",
      text: currentParagraph.join(" ").trim(),
    });
  }

  return body;
}

// Generate posts.ts file
function generatePostsFile(posts) {
  const ALL_TOPICS = [...new Set(posts.map((post) => post.topic))];

  const fileContent = `export type Topic =
  | "Non-Duality"
  | "Philosophy"
  | "Technology"
  | "AI"
  | "God & Shiva"
  | "Life"
  | "Truth";

export interface PostBodyItem {
  type: string;
  text: string;
  cite?: string;
  lang?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  topic: Topic;
  tags: string[];
  body: PostBodyItem[];
}

export const POSTS: Post[] = [
${posts
  .map(
    (post) => `  {
    slug: "${post.slug}",
    title: "${post.title.replace(/"/g, '\\"')}",
    excerpt: ${JSON.stringify(post.excerpt)},
    date: "${post.date}",
    readMinutes: ${post.readMinutes},
    topic: "${post.topic}",
    tags: ${JSON.stringify(post.tags)},
    body: ${JSON.stringify(post.body, null, 2)},
  },`,
  )
  .join("\n")}
];

export const ALL_TOPICS: Topic[] = ${JSON.stringify(ALL_TOPICS)};

export function sortedPosts(): Post[] {
  return [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function adjacentPosts(slug: string) {
  const index = POSTS.findIndex((post) => post.slug === slug);
  const prev = index > 0 ? POSTS[index - 1] : null;
  const next = index < POSTS.length - 1 ? POSTS[index + 1] : null;
  return { prev, next };
}
`;

  fs.writeFileSync(postsFile, fileContent, "utf8");
  console.log(`Generated posts.ts with ${posts.length} posts`);
}

// Main execution
const posts = blogFiles.map((file) => parseMarkdownToPost(path.join(blogDir, file)));
generatePostsFile(posts);
