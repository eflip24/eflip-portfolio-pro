## Goals

Make every `/portfolio/*` page a well-structured, content-rich, mobile-friendly case study with proper H1/H2/paragraph semantics, dofollow external links, and full inclusion in the sitemap.

## What's wrong today

- The "brief" is a single short paragraph (~150–250 chars) followed by a **collapsed** DETAILS accordion — most page content is hidden from crawlers behind a click, and section titles render as `<h3>` (no `<h2>` on the page).
- Rich section content is stored but not rendered with `prose` heading/list styles — feels flat, like the earlier blog issue.
- DOMPurify sanitization doesn't force `rel`/`target` policy on `<a>`; we can't guarantee external links are dofollow with `noopener`.
- LegallySpoken has all its copy stuffed in `description` (1729 chars) instead of properly structured sections.
- Sitemap generator already includes portfolio slugs, but the checked-in `public/sitemap.xml` may be stale — needs a regen so LegallySpoken and any recent projects are present.

## 1. Rewrite `ProjectDetail.tsx` layout (presentation only)

- Keep the single `<h1>` (client name).
- **Remove the accordion**: render the case-study sections inline, always visible, in this order:
  1. Hero image
  2. **The Brief** — `<h2>` + the existing `project.description`, rendered as prose paragraphs (multi-paragraph aware, same `formatContent` helper as details).
  3. Gallery (unchanged).
  4. Each `project_sections` row rendered inline. Section `title` becomes an `<h2>` (was `<h3>`); body uses `.prose prose-invert` with the same styles we tuned for the blog (orange links, spaced paragraphs, list bullets, heading hierarchy).
  5. Testimonial (unchanged).
- Sidebar stays on `lg:` and stacks below on mobile (already responsive) — verify padding/typography at `sm` breakpoint.

## 2. Enforce dofollow + safe external links

Extend `formatContent` (or add a DOMPurify `afterSanitizeAttributes` hook) so every `<a href>`:

- Adds `target="_blank"` and `rel="noopener"` when the href is external.
- **Strips any `nofollow`/`ugc`/`sponsored`** tokens from `rel` (user asked "follow links").
- Leaves internal (`/portfolio/...`, relative) links untouched.

Applied once in `ProjectDetail.tsx` and reused for the new Brief block.

## 3. Fill out the "brief" for every project

Data-only migration to expand each project so the visible page has real content:

- Rewrite each project's `description` into a 2–3 paragraph brief (~500–700 chars) covering **who the client is, what they needed, what we delivered**. Keep the first ~155 chars strong enough that `seo_description` (unchanged) still reads well.
- Add missing `project_sections` where they're thin (e.g. Emerald Cat Hotel, WorkSafe, Pristine Auto Shine) so every project has at least: "Our Approach" and "The Result" H2 sections with real HTML (`<h2>`, `<p>`, `<ul>` with 3–5 bullets, an outbound dofollow link to the client's site where relevant).
- Split LegallySpoken's oversized `description` into 3 proper sections (Brief / What we built / Impact) and shorten `description` back to ~250 chars.

Executed via a single SQL migration you can review before it runs.

## 4. Sitemap coverage

- Confirm `scripts/generate-sitemap.ts` picks up LegallySpoken (category `Web` vs `web` doesn't matter — filter is `published=eq.true`).
- Run the generator so `public/sitemap.xml` is refreshed with all current portfolio slugs and today's `lastmod`.
- No structural change to the generator.

## 5. Verify

- `curl -s http://localhost:8080/portfolio/legallyspoken | rg '<h[12]|<p|rel='` — spot-check rendered HTML (SPA renders client-side, so mainly check the built module + a Playwright screenshot at 375px and 1280px widths).
- Confirm `public/sitemap.xml` contains every published slug after regen.

## Technical notes

- Files touched: `src/pages/ProjectDetail.tsx` (layout + link sanitizer), one Supabase migration for content, regen of `public/sitemap.xml`.
- No schema changes, no route changes, no changes to `Portfolio.tsx` grid.
- Existing per-page `SEOHead` (unique title/description/OG per project) and JSON-LD `CreativeWork` + `BreadcrumbList` stay as they are.
