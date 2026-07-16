## Create `/game-design` landing page

Mirror the structure and style of `src/pages/AI.tsx`, `PrintDesign.tsx`, and `CustomWebDesign.tsx`.

### Files to create
- **`src/pages/GameDesign.tsx`** — new page with sections:
  1. Hero: "Game Design" + subheadline, primary CTA "Start a Game Project" (→ `/contact`), secondary "View Our Games" (→ `/portfolio`)
  2. What We Do
  3. Types of Games We Create (responsive table: Game Type / Best For / Examples)
  4. Our Approach to Game Design (6-step process with icons)
  5. Who We Work With (5-item list with icons)
  6. Why Game Design Matters (5-point benefits grid)
  7. What Makes Our Games Different (5 differentiators grid)
  8. Final CTA: "Book a Discovery Call" / "Request a Proposal"
  - `SEOHead` with page-specific title, description, keywords, and Service + BreadcrumbList JSON-LD

### Files to modify
- **`src/App.tsx`** — register `/game-design` route with the same lazy import + PageTransition wrapper.
- **`src/pages/Services.tsx`** — add `href: "/game-design"` on the Game Design card so the "LEARN MORE" link appears (same pattern as other service cards).
- **`scripts/generate-sitemap.ts`** — add `/game-design` to the static routes list.

### Notes
- Reuse existing tokens, `Layout`, `ScrollReveal`, `SEOHead`, `Button`, and `lucide-react` icons.
- No backend changes.
- Sitemap regenerates automatically on next build via `prebuild` hook.
