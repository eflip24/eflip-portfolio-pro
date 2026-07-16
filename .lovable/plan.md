## New page: `/print-design`

Mirror the structure, styling, and Framer Motion patterns already used on `src/pages/AI.tsx` and `src/pages/Services.tsx` (dark theme, orange accent, uppercase display type, ScrollReveal, numbered process steps, card grids, final CTA). No new design language.

### 1. Create `src/pages/PrintDesign.tsx`

Sections in order:

1. **Hero**
   - H1: "PRINT DESIGN"
   - Subheadline: "Professional graphic design, ready for print"
   - Paragraph: high-quality print-ready files for flyers, business cards, banners, packaging and more — take them to any local printer with confidence.
   - Primary CTA → `/contact` ("GET A QUOTE")
   - Secondary CTA → `/portfolio` ("VIEW OUR WORK")

2. **What We Offer** — short explainer block (design + technical prep, files delivered print-ready: bleed, CMYK, 300 DPI, correct formats).

3. **Services We Provide** — card grid of 8 items:
   - Business Cards
   - Flyers & Leaflets
   - Brochures & Booklets
   - Posters & Banners
   - Product Packaging & Labels
   - Menus & Signage
   - Canva to Print-Ready Conversion
   - Custom Print Projects

4. **Canva to Print-Ready Files** — highlighted section with 5-bullet list (bleed & margins, CMYK, 300 DPI, fonts/spacing, PDF format).

5. **Our Design Process** — 5 numbered steps styled like the PROCESS section on `/services` and `/ai`:
   1. Brief & Requirements
   2. Design Concepts
   3. Revisions
   4. Print-Ready Preparation
   5. File Delivery

6. **Why Choose eflip for Print Design?** — 6-item benefits grid.

7. **Who This Is For** — short line naming small businesses, local shops/cafes/restaurants, tradespeople, event organisers, anyone needing pro print materials.

8. **Common Print Projects We Handle** — responsive table (Project Type / Common Uses / Turnaround) with the 6 rows provided (Business Cards 2–4d, Flyers 3–5d, Banners & Posters 3–5d, Product Packaging 5–7d, Brochures & Booklets 5–7d, Canva Conversion 1–3d).

9. **Final CTA** — "Ready to get your print materials designed and print-ready?" + primary "REQUEST A QUOTE" → `/contact`, secondary "BOOK A FREE CONSULTATION" → `/contact`.

### 2. SEO
- `SEOHead` with title "Print Design Ireland — Print-Ready Graphic Design", description matching hero, canonical `https://eflip.ie/print-design`.
- `Service` + `BreadcrumbList` JSON-LD blocks (matching pattern used on `AI.tsx` / `Services.tsx`).

### 3. Route registration
- Add `import PrintDesign from "./pages/PrintDesign"` and `<Route path="/print-design" element={<PageTransition><PrintDesign /></PageTransition>} />` in `src/App.tsx`, above the `*` NotFound route.

### 4. Link from Services page
- In `src/pages/Services.tsx`, add `href: "/print-design"` to the PRINT DESIGN service card entry so the existing "LEARN MORE →" link renders (same pattern as eflip AI card). No other Services changes.

### 5. Sitemap
- Add `{ path: "/print-design", changefreq: "monthly", priority: "0.8" }` to `staticEntries` in `scripts/generate-sitemap.ts` so it lands in `public/sitemap.xml` on next dev/build.

### Files touched
- Create: `src/pages/PrintDesign.tsx`
- Edit: `src/App.tsx`, `src/pages/Services.tsx`, `scripts/generate-sitemap.ts`

### Not included (say the word to add)
- FAQ block with `FAQPage` JSON-LD (pricing, timelines, file formats accepted).
- Pricing tiers or starting-from prices on the projects table.
- Sample downloadable "print-ready checklist" lead magnet.
