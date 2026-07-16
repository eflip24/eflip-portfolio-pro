# SEO Improvement Plan — eflip.ie

The foundational SEO (sitemap, robots, per-page meta, JSON-LD, Cloudflare crawler proxy, edge function for OG tags) is already in place. This plan focuses on the next layer: **content depth, on-page optimisation, technical polish, and off-page authority**.

## 1. Content & Keyword Strategy

**Problem:** Current copy is brand-focused ("bold", "extraordinary") but light on the actual terms clients search for. Google needs topical signals.

- **Rewrite Services page** around search-intent keywords: "web design Ireland", "game UI design", "esports website design", "print design Dublin", "video production Ireland". One dedicated H2 section per service with 150-250 words of substantive copy.
- **Add location signals** — mention Ireland/Dublin naturally in H1/H2 on Home, About, Services, Contact. Add a `LocalBusiness` JSON-LD block with address (once you're happy to publish it) on the Contact page.
- **Publish 4–6 pillar blog posts** targeting long-tail terms competitors rank for (e.g. "how to design an esports tournament landing page", "game trading marketplace UX case study"). Each 1000-1500 words, linked from at least 2 portfolio pages.

## 2. Portfolio Page Depth

**Problem:** Portfolio pages are visually strong but thin on indexable text. Google can't rank a page on 3 sentences.

- Ensure every project has: 250+ word description, at least 3 `sections` (challenge / approach / result), and a testimonial.
- Add an FAQ block per project (2-3 Q&As) and emit `FAQPage` JSON-LD.
- Add `ImageObject` structured data on the hero image with proper `caption` and `contentUrl`.
- Add internal "Related projects" links (already in sidebar) — good; ensure anchor text uses the client name, not "view project".

## 3. On-Page Technical

- **Add `alt` text audit** — many portfolio images use the client name only; expand to describe the image ("Arc Raiders trading marketplace landing page mockup on desktop").
- **Heading hierarchy** — confirm one H1 per page and logical H2/H3 order (Portfolio detail currently uses the title as a large div, not always an H1).
- **Core Web Vitals** — largest hero images should be `loading="eager"` + `fetchpriority="high"`; everything else already lazy. Preload the hero webfont if any custom font is used.
- **Image format** — serve portfolio hero images as WebP with width-descriptor `srcset` for mobile.
- **Canonical review** — spot-check that `/portfolio/[slug]` self-references and never falls back to `/`.

## 4. Sitemap Automation

**Problem:** `public/sitemap.xml` is hand-maintained. It'll go stale the moment you add a project.

- Add a build-time script (`scripts/generate-sitemap.ts`) that queries the DB and writes `public/sitemap.xml` before `vite build`. Wire it into the `build` npm script.
- Include blog posts once they exist.
- Update `<lastmod>` per URL from `updated_at`.

## 5. Off-Page / Authority

- **Backlinks** — reach out to 5–10 industry blogs (esports design roundups, Dribbble/Behance features, Ireland design directories) with your best 2 case studies.
- **Business listings** — Google Business Profile, Clutch, DesignRush, LinkedIn Company Page. Consistent NAP (Name/Address/Phone).
- **Social sameAs** — the current Organization JSON-LD lists `instagram.com/eflip`, `linkedin.com/company/eflip`, `x.com/eflip`. Confirm these accounts actually exist at those handles or remove/replace — Google penalises broken sameAs.

## 6. Analytics & Monitoring

- **Google Search Console** — submit `https://eflip.ie/sitemap.xml`, monitor Coverage weekly for 4 weeks, fix any "Discovered - not indexed" pages.
- **Add Bing Webmaster Tools** — free, easy, sends real traffic.
- **Track keyword positions monthly** for your top 20 target terms (I can pull these via the Semrush tool on demand).

## What I'd build first (recommended order)

1. Services page rewrite with keyword-targeted H2 sections *(biggest ranking lift for the effort)*
2. Portfolio description expansion + FAQ blocks *(unlocks long-tail traffic)*
3. Build-time sitemap generation *(fixes the staleness problem permanently)*
4. Image alt-text pass + hero `fetchpriority` *(quick Core Web Vitals win)*
5. First 2 pillar blog posts

Approve and I'll start with step 1, or tell me which item to tackle first.
