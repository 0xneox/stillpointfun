# Content Publishing Guide

This guide explains how to add content to Stillpoint without requiring a backend or CMS.

## Adding Journal Articles

Edit `src/data/posts.ts`:

```typescript
{
  slug: "your-article-slug",
  title: "Article Title",
  excerpt: "Brief description for the article list view",
  date: "2026-01-17",
  readMinutes: 10,
  topic: "Non-Duality" | "Philosophy" | "Technology" | "AI" | "God & Shiva" | "Life" | "Truth",
  tags: ["tag1", "tag2", "tag3"],
  body: [
    {
      type: "p",
      text: "Your paragraph text here"
    },
    {
      type: "h2",
      text: "Section heading"
    },
    {
      type: "quote",
      text: "Quote text",
      cite: "Source attribution"
    }
  ]
}
```

## Adding Library Books

Edit `src/routes/library.tsx` in the `LIBRARY_ITEMS` array:

```typescript
{
  id: "unique-book-id",
  title: "Book Title in Original Script",
  author: "Author Name",
  translator: "Translator Name (optional)",
  tradition: "Kashmir Śaivism | Advaita Vedanta | etc.",
  language: "Sanskrit / English",
  format: "book" | "pdf" | "audiobook" | "lecture" | "paper",
  description: "Brief description of the text",
  sourceUrl: "https://authorized-source.com/book",
  tags: ["pratyabhijñā", "kashmir-shaivism"],
  relatedAudio: ["audio-item-id"],
  relatedArticles: ["article-slug"]
}
```

**Important:** Only include real, verified source URLs. Never fabricate links or imply availability when the work is not accessible.

## Adding Audio Content

Edit `src/data/content.ts` in the `CONTENT` array:

```typescript
{
  id: "unique-audio-id",
  title: "Talk or Track Title",
  artist_or_speaker: "Speaker or Artist Name",
  source: "YouTube",
  youtube_url: "https://www.youtube.com/watch?v=VIDEO_ID",
  youtube_video_id: "VIDEO_ID",
  channel: "REALITY" | "COSMOS" | "MYSTIC" | "VEDA" | "SUFI" | "BUDDHA" | "PSYCHEDELIC" | "DEEP" | "RAGA" | "SACRED",
  tradition: "Advaita" (optional),
  language: "English" (optional),
  duration: "PT45M30S", // ISO 8601 duration format
  description: "Description of the content",
  tags: ["consciousness", "non-duality"],
  mood: ["UNDERSTANDING", "WONDER"],
  featured: true, // optional
  daily_selection: false, // optional
  published: true,
  rights_status: "verify" | "public-domain" | "authorized" | "link-only" | "restricted",
  attribution_notes: "Additional attribution information",
  related_articles: ["article-slug"],
  related_books: ["book-id"]
}
```

## Cross-Linking Content

### Articles to Audio

Add `relatedAudio` to the post with audio IDs:

```typescript
tags: ["shiva", "parvati"],
```

The system automatically finds related audio based on matching tags.

### Audio to Articles

Add `related_articles` to the audio item:

```typescript
related_articles: ["when-the-gods-leave-the-mountain"];
```

### Books to Audio

Add `relatedAudio` to the library item:

```typescript
relatedAudio: ["alan-watts-1"];
```

### Audio to Books

Add `related_books` to the audio item:

```typescript
related_books: ["vimarsa-pratyabhijna"];
```

## Content Integrity Rules

1. **Never fabricate sources** - Only include real, verifiable URLs and sources
2. **Respect copyright** - Use `rights_status` to indicate authorization status
3. **Distinguish fact from interpretation** - Label primary sources, translations, and commentary appropriately
4. **Don't invent activity** - Never fabricate user counts, event schedules, or participation data
5. **Verify sources** - Check that external links actually lead to the claimed content
6. **Attribute properly** - Include translator, speaker, and source information where applicable

## Testing Content

After adding content:

1. Run `npm run lint` to check for errors
2. Run `npm run dev` to test locally
3. Verify all links work correctly
4. Check that related content displays properly
5. Test search functionality with new content

## File Locations

- **Articles**: `src/data/posts.ts`
- **Audio**: `src/data/content.ts`
- **Books**: `src/routes/library.tsx` (LIBRARY_ITEMS export)
- **Search**: Automatically searches all three data sources
