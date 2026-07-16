## Create `/custom-web-design` landing page

Mirror the structure and style of `src/pages/AI.tsx` and `src/pages/PrintDesign.tsx`.

### Files to create
- **`src/pages/CustomWebDesign.tsx`** — new page with sections:
  1. Hero: "Custom Web Design & Development" + subheadline, primary CTA "Start a Project" (→ `/contact`), secondary "See Our Work" (→ `/portfolio`)
  2. The Shift in Web Design (intro copy)
  3. Who This Is For (bulleted list)
  4. What We Actually Deliver (6-item grid: Custom Design Systems, High-Performance Dev, Strategic UX, AI-Ready Architecture, Custom Functionality, Long-term Maintainability)
  5. What Makes a Website Future-Ready (responsive table: Priority / Why It Matters / How We Approach It)
  6. Our Approach (5-step process)
  7. Why This Matters (benefits list)
  8. Final CTA: "Book a Discovery Call" / "Request a Proposal"
  - `SEOHead` with page-specific title, description, canonical, and Service + BreadcrumbList JSON-LD

### Files to modify
- **`src/App.tsx`** — register `/custom-web-design` route with the same lazy import + page-transition wrapper used by `/ai` and `/print-design`.
- **`src/pages/Services.tsx`** — add "LEARN MORE" link on the Web Design service card pointing to `/custom-web-design` (same pattern as eflip AI and Print Design cards).
- **`scripts/generate-sitemap.ts`** — add `/custom-web-design` to the static routes list so it's included in `public/sitemap.xml` on next build.

### Notes
- Reuse existing design tokens (dark theme, orange accent) and shared components — no new colors or fonts.
- No backend changes.
- After build, sitemap will regenerate automatically via the `prebuild` hook.
