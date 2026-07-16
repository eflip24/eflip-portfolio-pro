## Changes

### 1. Update Services page (`src/pages/Services.tsx`)
Replace the eflip AI description on the services card with the shorter version:
> "We help local businesses adopt the right AI tools, connect them to your systems, and build time-saving workflows that support growth."

Also update the matching `OfferCatalog` JSON-LD description to match.

### 2. Create new page `src/pages/AI.tsx` at route `/ai`
Register the route in `src/App.tsx` (above the `*` NotFound catch-all).

Design: matches the site's dark theme, orange accent, uppercase display type, and Framer Motion reveals used elsewhere (mirroring Services.tsx patterns — hero, numbered process steps, card grids, final CTA).

Sections (in order):

1. **Hero**
   - H1: "eflip AI"
   - Subheadline: "Practical AI solutions for local businesses"
   - Paragraph: help local businesses in Ireland find the right AI tools, connect them to existing systems, save time, improve service, and grow — without the overwhelm.
   - Primary CTA → `/contact` ("Book a Free Discovery Call")
   - Secondary CTA → `/services` ("View All Services")

2. **What is eflip AI?** — short explainer paragraph block.

3. **How Local Businesses Are Using AI in 2026** — intro + 5-bullet list of common wins.

4. **Real Examples by Industry** — three grouped cards:
   - Estate Agents (5 bullets)
   - Solicitors & Law Firms (5 bullets)
   - Other Local Businesses (cafes/clinics/trades/accountants/retail — 5 bullets)

5. **What We Do For You** — 6 items (Discovery & Assessment, Tool Selection, Integration, Workflow Design, Setup & Training, Ongoing Support) as a card grid with title + "how it helps you" line.

6. **Key Benefits** — 6-item card/list grid (save time, faster responses 24/7, better lead conversion, less admin, scale without hiring, clear recommendations).

7. **How It Works** — 5 numbered steps (Discovery Call → Custom Recommendation → Implementation → Training & Handover → Ongoing Optimisation), styled like the existing PROCESS section on `/services`.

8. **Who It's For** — short line naming Ireland local businesses (cafes, clinics, trades, retail, service businesses, estate agents, solicitors, accountants).

9. **Final CTA** — "Ready to bring AI into your business?" + primary "Book a Free Discovery Call" → `/contact`.

### 3. SEO
- `SEOHead` with title "eflip AI — Practical AI for Local Businesses in Ireland", description matching the hero paragraph, and canonical `https://eflip.ie/ai`.
- Add a `Service` JSON-LD block for eflip AI.
- Sitemap: `/ai` will be added on the next static-page pass — `scripts/generate-sitemap.ts` currently emits a fixed static list, so I'll add `/ai` to that list too so it appears in `public/sitemap.xml` on next build.

### Suggested improvements (not implementing unless you say yes)
- Add a small "Featured in eflip AI" teaser card to the Services page card so it links through to `/ai` for more detail.
- Add 2–3 short client-style testimonials or a "Recent AI project" block once you have one — social proof lifts conversion on service pages.
- Add an FAQ section (with `FAQPage` JSON-LD) covering pricing, timelines, data privacy, and what tools you commonly recommend — good for SEO and pre-empts sales objections.
- Offer a lightweight "AI readiness" lead magnet (short form / checklist) instead of only a discovery call CTA, to capture visitors not ready to book.

Tell me if you want any of those folded into this build or left for later.
