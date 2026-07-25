# eFlip Growth Plan v2 — Attract High-Value Clients in Ireland

Focus shifted: instead of casting a wide SMB net, we position eFlip as a **premium creative + AI partner** for the kinds of Irish businesses that pay €10k–€60k+ per project. First impressions do the heavy lifting — the homepage sells the craft in 3 seconds.

---

## Who we're actually going after

High-margin Irish sectors that pay well and need brand-grade websites + AI workflows:

1. **Solicitors & law firms** (William Fry, Matheson-tier down to mid-market Dublin/Cork practices)
2. **Estate agents & property developers** (Sherry FitzGerald tier, boutique agencies, new-build developers)
3. **Accountants, tax & financial advisors** (mid-market practices, wealth managers, fintech)
4. **Private medical / dental / cosmetic clinics** (Beacon, Blackrock, private consultants)
5. **Hospitality — 4/5★ hotels, restaurant groups, distilleries & premium food brands**
6. **Construction, architecture & interior design studios**
7. **Tech startups & SaaS raising Series A/B** in Dublin/Cork
8. **Professional service firms** (consultants, executive coaches, recruiters)

Common thread: they judge you on the site itself before they read a word. Craft = credibility.

---

## Competitor inspiration (what we're learning from)

Researched via web search — Irish agencies playing at the tier we want:

| Agency | What they do well | What we take |
|---|---|---|
| **Kooba** (kooba.ie) | Global brand work, "Agency of the Year 2025" positioning, calm dense typography, big case studies | Confident single-line headline, editorial case study layout, self-assured tone |
| **Wolfgang Digital** | 150+ awards front-and-centre, performance-marketing angle, strong trust signals | Awards / press strip under the fold, data-led credibility badges |
| **Framework Design (FWD)** | "25+ years experience" copy identical to our stat, service-first structure | Confirms 25+ years is a real trust anchor for the Irish market |
| **Seichō** | B2B conversion-focused, plain confident language ("Built to convert qualified buyers, not to win design awards") | Sharp anti-fluff copy voice for service pages |
| **The Digital Department** | Big awards claim, high-conversion positioning | "Award-winning" language woven through the fold |
| **Urban Brand Creative** | "Ireland's National Website of the Year" — one hero credential | One flagship credential > many small ones |

Design pattern we saw repeatedly on the good ones: **massive typography → one bold statement → single strong CTA → immediate proof (logos / awards / testimonial) → featured case studies with striking visuals**. Not marquees, not stat counters up top, not particle explosions.

---

## Phase 1 — Homepage Redesign (First Impressions)

Goal: within 3 seconds a high-value visitor thinks *"this is a serious creative studio, worth the money."*

### 1.1 New hero — simple, cinematic, animated

Current hero has: logo + tagline + one CTA + particle field. Keep the spirit, elevate the craft.

- **Kill the marquee band** ("WEBSITES · GAMES · PRINTING · EFLIP AI") — signals cheap template energy.
- **Kill the stats counter as second-fold** — moves lower.
- **Hero layout**: full-viewport, dark, centred. One line of typography, one line of subhead, one CTA.
  - H1 (large, tight): *"Creative websites & AI for Ireland's most ambitious brands."*
  - Subhead (muted, small caps letterspaced): *"A design & AI studio in Ireland. 25 years. 500+ projects."*
  - Primary CTA: *"Start a project"* → `/contact`
  - Ghost link below: *"See selected work →"*
- **Animated logo (centre of hero)**: use a **Lottie / SVG image-to-animation** — the eFlip pixel-art "e" builds itself in from small orange squares that snap into the logo shape, with a subtle continuous shimmer on the accent square. Motion budget: 1.2s intro, then idle micro-motion.
  - **Mobile**: static logo + a 400ms fade-in only. No continuous idle motion. `useIsMobile()` gates the Lottie load.
  - Fallback: if `prefers-reduced-motion`, skip animation, show final logo.
- **Background**: replace the always-on particle field on the hero with a slower, sparser variant that pauses when off-screen. On mobile, replace with a static subtle gradient — no canvas at all.

### 1.2 Reviews & trust strip — directly under the hero (per your call)

Pushes social proof above the fold on any scroll.

- **Row of client logos** (silhouetted / mono-white so the field looks unified) — LegallySpoken, Arc Raiders Trading, and 4–6 more from the portfolio, marquee scroll on desktop only.
- **One rotating testimonial**, large pull-quote style, with client name + role + company + location ("Dublin", "Cork"). Auto-cycles every 6s; pauses on hover. Data from existing `projects.testimonial` — already loaded.
- **Small credentials strip** below quote: *"25+ years · 500+ projects · 200+ clients · Based in Ireland"* — the stats survive here in a subtle single-line form instead of the giant counter.

### 1.3 Featured work — the real showcase

The section that sells the craft.

- Redesign the featured grid as an **editorial 2-up layout** on desktop: one large hero project + two supporting projects staggered — asymmetric, not a uniform 4-column grid. Kooba/agency-style.
- Hover: image scales slightly, orange rule slides across, project name reveals in mono type.
- Show **3 curated pinned projects** (LegallySpoken as anchor) instead of the last 4 chronologically.
- Full CTA at end: *"View all work →"*.

### 1.4 Removed / demoted from homepage

- Marquee service band → deleted.
- Big animated stats counter → replaced by the small strip in 1.2.
- "WE DESIGN WHAT OTHERS DREAM" teaser → deleted (feels like filler once the hero does its job).

### 1.5 Sticky bottom CTA (desktop only)

Appears after user scrolls past the hero. Small pill: *"Start a project"* → `/contact`. Fades out near the footer. Not shown on mobile (respect the sticky mobile nav real estate).

### 1.6 Performance guardrails

- Preload the hero logo asset (WebP / SVG).
- Lottie loaded lazily and only when `!isMobile && !prefersReducedMotion`.
- Particle field: mobile → skipped entirely on the homepage.
- Target Lighthouse mobile perf ≥ 90, LCP < 1.8s.

---

## Phase 2 — Conversion Rate Optimisation (kept — old Track 2)

Small changes across every page to lift high-value form submissions.

- **Contact form (`/contact`)**
  - Add optional **phone / company** fields — higher-intent leads.
  - Add a "typical response within 4 hours" indicator.
  - Post-submit: show 3 recent portfolio pieces + a *"Book a discovery call"* link (Calendly if you have one).
  - Add a small micro-testimonial next to the form.

- **Every service page** (`/custom-web-design`, `/ai`, `/print-design`, `/game-design`)
  - Mid-page CTA block: *"Not sure where to start? Book a free 15-min discovery call."*
  - Comparison table: **DIY / Template Agency / eFlip** — highlights craft, speed, AI-readiness.
  - FAQ block per page (also feeds `FAQPage` JSON-LD).

- **Portfolio pages**
  - Bottom CTA: *"Want results like this? Start a project."*
  - Related projects (2–3 in same category) linked at the end.

- **Trust signals globally**
  - "Based in Ireland" and years-in-business badge in the footer.
  - Organization JSON-LD updated with `areaServed`, `foundingDate: 2001`, awards.

- **Exit-intent lightbox** (desktop only, once/session) — offering the discovery call, not a lead magnet.

---

## Phase 3 — Semrush-Led Local SEO (kept — old Track 3)

Same as before, but keyword clusters retuned for the higher-value personas.

1. **Audit (week 1)**
   - `domain_analysis` on eflip.ie (`ie` database).
   - `competitive_analysis` vs `kooba.ie`, `wolfgangdigital.com`, `frameworkdesign.ie`, `seicho.ie`, `thedigitaldepartment.ie` — find the keywords they rank for that we don't.
   - `top_pages` on each — see what content earns them the traffic.
   - `serp_analysis` on target commercial terms before committing.

2. **Target keyword clusters** (Ireland-focused, `ie` database)
   - **Premium commercial**: "creative web design agency ireland", "brand website design dublin", "high end web design ireland", "bespoke web design dublin", "award winning web design ireland"
   - **AI for professional services**: "ai for law firms ireland", "ai for estate agents ireland", "ai for accountants ireland", "ai automation dublin"
   - **Industry-specific**: "solicitor website design ireland", "estate agent website ireland", "hotel website design ireland", "clinic website design dublin"
   - **City + high-value combos**: "web design agency dublin 2/4", "web design cork city"

3. **Landing page expansion**
   - **City pages** — start with Dublin, Cork, Galway, Limerick. Same structure as `/custom-web-design`, localised copy, local testimonial, `LocalBusiness` JSON-LD per city.
   - **Industry pages** — start with `/web-design-solicitors`, `/web-design-estate-agents`, `/web-design-clinics`. Same structure, industry testimonials, use-case examples pulling from portfolio.
   - Cross-link every industry page → relevant blog posts → relevant portfolio piece.

4. **Technical SEO tune-up**
   - `hreflang="en-ie"` sitewide.
   - Breadcrumb JSON-LD on all sub-pages.
   - Internal linking pass: every blog post links to 2 service pages + 1 portfolio piece.
   - All new pages auto-flow into `scripts/generate-sitemap.ts`.

---

## Rollout Phases

**Phase 1 — Homepage rebuild** (~1 week build)
- New hero + animated logo + reduced motion budget
- Reviews / logos / testimonial strip under hero
- Editorial featured-work grid
- Sticky CTA, cleanup of marquee/stats/teaser sections
- Perf audit + fixes

**Phase 2 — CRO pass across the site** (~1 week)
- Contact form upgrades
- Service page CTAs + comparison tables + FAQs (+ FAQ JSON-LD)
- Portfolio bottom CTAs + related-project links
- Global trust badges & JSON-LD enrichment
- Exit-intent lightbox

**Phase 3 — Semrush + landing pages** (~1–2 weeks)
- Semrush audit + gap analysis
- 4 city pages (Dublin, Cork, Galway, Limerick)
- 3 industry pages (Solicitors, Estate Agents, Clinics)
- Technical SEO cleanup (hreflang, breadcrumbs, internal links)

**Skipped for now:** the Content & Lead-Magnet Engine (free tools, downloadable guides, cadence upgrade). Revisit after Phase 3 lands.

---

## Technical Notes

- Animated logo: Lottie JSON exported from an image-to-animation pipeline; loaded via `lottie-react` behind a mobile + reduced-motion gate.
- New landing pages follow `/custom-web-design` structure — Helmet SEO, JSON-LD, ScrollReveal, dark theme + orange accent.
- Comparison tables and FAQs are presentational — no schema changes.
- Contact form field additions: `phone` and `company` optional columns on `contact_submissions` (nullable, non-breaking) + updates to admin inbox + email template.
- Featured work: keep the DB fetch but add a `featured_home` boolean OR reuse `sort_order` — decide during implementation.
- Sitemap generator picks up new landing pages automatically.

---

## Questions Before We Build

1. **Animated logo style** — do you want (a) pixel-build (orange squares snapping into the logo), (b) draw-on outline into fill, or (c) glitch / flip morph? Pick and I'll spec the Lottie.
2. **Calendly / booking link** — do you have one to wire into the discovery-call CTAs? If not, use the contact form.
3. **Which 3 industries first** for Phase 3 landing pages — solicitors, estate agents, clinics (my pick), or swap one for hotels / accountants?
4. **Awards / press mentions** — any real credentials we should feature in the hero strip? ("Featured in…", "Winner of…") If none, we lean on the 25+ years / 500+ projects numbers only.
