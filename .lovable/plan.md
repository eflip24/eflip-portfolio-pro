## 1. Fix blog content typography

- Install `@tailwindcss/typography` and register it in `tailwind.config.ts`.
- In `src/pages/BlogPost.tsx`, replace the current `prose prose-invert prose-sm` wrapper with a properly configured `prose prose-invert` block using the design tokens (orange accent for links, mono headings matching the brand, tighter list/paragraph spacing).
- Style overrides via `prose-headings:`, `prose-h2:`, `prose-h3:`, `prose-p:`, `prose-a:`, `prose-strong:`, `prose-ul:`, `prose-blockquote:` utilities so H2/H3/paragraphs/links visually separate. External links get an underline + hover state; internal links (starting with `/`) get the orange accent.
- Add `id` attributes to each `<h2>` at render time (parse the sanitized HTML, slugify heading text) so the TOC can anchor to them, and add `scroll-mt-24` so anchor jumps clear the sticky navbar.

## 2. New 3-column layout on desktop

Restructure `BlogPost.tsx` from a single centered column to a 12-column grid on `lg:` screens:

```
[  TOC (3)  ] [ Article (6) ] [ Sidebar (3) ]
```

Below `lg`, everything stacks (TOC becomes a collapsible summary at the top, sidebar drops to the bottom) so mobile stays clean.

### Left column — sticky Table of Contents
- New `BlogTOC.tsx` component.
- Extracts H2 headings from `post.content` (after sanitisation) with regex, slugifies them, renders a vertical list.
- `sticky top-24`, thin left border, active-section highlighting via `IntersectionObserver`.
- Hidden on `<lg`; on mobile becomes a `<details>` "On this page" toggle just under the title.

### Right column — sticky related content
- New `BlogSidebar.tsx` component with two blocks, both `sticky top-24`:
  1. **Recent Posts** — pulls 4 latest `blog_posts` (`published=true`, excluding current slug) ordered by `created_at desc`. Small card: title + date, links to `/blog/[slug]`.
  2. **Recent Projects** — pulls 4 latest `projects` (visible) ordered by `created_at desc`. Thumbnail + title, links to `/portfolio/[slug]`.
- Same brand styling as the rest of the site (mono, tracking-widest labels, orange hover).

## 3. Tighten the AI generator so future drafts render cleanly

Small update to `supabase/functions/generate-blog-draft/index.ts` system prompt:
- Require the first paragraph to be a standalone `<p>` intro (not merged with the first H2).
- Require external links to include descriptive anchor text and open in a new tab (already stated; reinforce).
- Explicitly forbid bare URLs and require at least one `<ul>` or `<ol>` list somewhere in the body for scannability.

No schema, cron, or edge-function-behavior changes beyond the prompt tweak. Existing drafts already in the DB will immediately look correct because the fix is presentational.

## Technical details

- Files touched: `tailwind.config.ts`, `package.json` (add `@tailwindcss/typography`), `src/pages/BlogPost.tsx`, `src/components/blog/BlogTOC.tsx` (new), `src/components/blog/BlogSidebar.tsx` (new), `supabase/functions/generate-blog-draft/index.ts` (prompt only).
- TOC extraction runs client-side on the sanitized HTML string before it's injected via `dangerouslySetInnerHTML`, so no double-parse cost.
- Sidebar queries run in parallel with the post fetch (`Promise.all`) to keep TTI unchanged.
- All new styling uses existing semantic tokens (`--primary`, `--muted-foreground`, `--border`) — no hardcoded colors.
