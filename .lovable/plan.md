# Automated Blog Pipeline — eflip.ie

Chief-editor system that researches, drafts, and schedules SEO-optimized blog posts twice a week. You review in `/admin`; anything not approved within 7 days auto-publishes.

## Configuration (confirmed)

- **Cadence**: 2 drafts/week — Tuesday & Thursday, 06:00 Europe/Dublin
- **Author byline**: Stephen Bray
- **Tone**: Professional, human, friendly, smart-but-casual
- **Auto-publish**: If not reviewed within 7 days of draft creation, publish automatically
- **Editor**: You approve/edit each post before it goes live (or let the 7-day timer publish it)

## What gets built

### 1. Topic queue (database)

New table `blog_topics` holding the 17 recommended topics (12 primary + 5 bonus) with:
- title, category (AI / Web Design / Print / Game / Gamification)
- angle notes, priority rank, target audience (local IE vs general)
- suggested internal links (`/ai`, `/custom-web-design`, `/print-design`, `/game-design`, `/services`, portfolio pieces)
- status: `queued` → `researching` → `drafted` → `approved` / `auto_published` / `rejected`
- `scheduled_for` timestamp

Pre-seeded with all 17 topics from your brief, ranked by your recommended priority.

### 2. Research + drafting edge function (`generate-blog-draft`)

Runs on cron Tue/Thu 06:00 Dublin. For the next queued topic:

**Step A — Keyword research (Semrush)**
- Call `semrush--keyword_research` for the seed phrase (IE database) to pull volume, difficulty, related terms, and question variations
- Call `semrush--serp_analysis` on the primary keyword to see who ranks and target angle gaps
- Store chosen primary keyword + 4–6 secondary/question keywords on the draft row

**Step B — Web research**
- `websearch--web_search` for 3–5 recent authoritative sources (2025/2026 dated) to cite as external links
- Capture URLs + one-line summaries

**Step C — AI drafting** (Lovable AI, `openai/gpt-5.5`)
- 1,400–1,800 words, tone spec above, byline "Stephen Bray"
- Structure: H1 with primary keyword → intro hook → 4–6 H2 sections → FAQ (3–5 Qs from Semrush "questions") → CTA to relevant service page
- Internal links: 2–4 to service/portfolio pages (from topic row)
- External links: 2–4 to researched sources (dofollow, opens in new tab)
- SEO fields: `meta_title` (≤60 chars, keyword-front-loaded), `meta_description` (≤155 chars), slug (kebab-case, keyword-based), excerpt
- Generates FAQPage + Article JSON-LD
- Generates 1200×630 cover image via `imagegen`
- Inserts row into `blog_posts` with `status='draft'`, `author='Stephen Bray'`, `scheduled_publish_at = now() + 7 days`

### 3. Admin review UI

Extend `/admin` with a "Blog Queue" tab:
- List of drafts sorted by `scheduled_publish_at` (soonest first, with countdown "auto-publishes in 4d 3h")
- Preview pane: rendered post, meta tags, JSON-LD, keyword targets, source links
- Actions: **Approve & publish now** / **Edit** (inline rich editor) / **Reject** / **Reschedule**
- Bar showing this week's queue + next topic

### 4. Auto-publish worker

Second cron job (daily 07:00 Dublin): flip any `status='draft'` post older than 7 days to `status='published'`, set `published_at=now()`, log to `email_send_log`-style audit trail.

### 5. SEO wiring

- `scripts/generate-sitemap.ts` already queries `blog_posts` — new published posts appear automatically on next build
- Existing Cloudflare Worker + `og-meta` edge function already serve per-post OG tags to crawlers
- `<Helmet>` on blog detail page already sets per-post `<title>`, description, canonical, og:*, Article JSON-LD
- Add FAQPage JSON-LD block when the post has an FAQ section

### 6. Notifications

Email to `info@eflip.ie` (uses existing `send-transactional-email` stack) when:
- A new draft is ready for review (Tue/Thu mornings)
- A post auto-publishes because 7-day window elapsed

## Delivery order

1. Migration: `blog_topics` table + seed the 17 topics + add `scheduled_publish_at`, `keyword_data`, `sources` to `blog_posts`
2. Edge function `generate-blog-draft` (Semrush + web search + AI draft + image)
3. Edge function `auto-publish-drafts` (7-day timer)
4. Cron schedules (Tue/Thu 06:00 draft, daily 07:00 auto-publish, both Europe/Dublin)
5. Admin "Blog Queue" tab with preview + approve/edit/reject
6. Email notifications on new draft + auto-publish
7. FAQPage JSON-LD on blog detail page

## Notes

- **Semrush**: uses the built-in `semrush--*` tools from the edge function via the LOVABLE gateway — no user connector required for research
- **First run**: after approval, I'll trigger one draft manually so you can review the output before the Tuesday cron takes over
- **Rollback**: if a topic performs poorly, mark rejected and it re-enters the queue for a rewrite
