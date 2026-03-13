

# Mobile Performance + Portfolio Page Redesign

## 1. Mobile Performance Optimization

The main performance bottleneck is `ParticleField.tsx` — 160 particles with O(n^2) connection drawing running every animation frame. On mobile this is extremely expensive.

**Changes to `ParticleField.tsx`:**
- Reduce particle count on mobile (60 instead of 160)
- Reduce connection distance on mobile (80 instead of 120)
- Skip mouse interaction on touch devices (no mousemove needed)
- Use `requestAnimationFrame` throttling — skip every other frame on mobile
- Detect mobile via `window.innerWidth < 768`

**Changes to `Layout.tsx`:**
- Lazy-load ParticleField so it doesn't block initial render

**Changes to `ProjectDetail.tsx`:**
- Replace `motion.div` wrapper with a simpler fade (remove `y: 30` translate on mobile to reduce paint)
- Use `loading="lazy"` on gallery images (already on hero image)

## 2. Portfolio Detail Page Redesign

Based on the reference screenshots, the new layout should feature:

**Header area:**
- Prev/Next buttons positioned top-right (like the reference)
- Large project title (keeping our orange/white color scheme)
- "VISIT SITE" button top-right alongside prev/next

**Metadata row** below the title:
- Horizontal row showing: `TITLE: ...  CLIENT: ...  S-TYPE: category  PLATFORM: tags  DISCIPLINES: tags`
- Labels in muted gray, values in primary orange (matching reference's cyan → our orange)

**Content layout — two-column on desktop:**
- Left column (wider, ~70%): Hero image, then gallery images stacked
- Right column (~30%): Sidebar with related project thumbnails (bordered, stacked vertically like reference)

**Details section:**
- Collapsible "DETAILS" accordion section (matching the `> DETAILS` in the reference)
- Monospace body text, larger and more readable (the reference uses ~16-18px monospace)
- Text color: muted foreground (light gray on dark), matching current scheme

**Testimonial** stays at the bottom, keeping current styling.

### Files to Modify
- `src/components/ParticleField.tsx` — mobile perf optimizations
- `src/pages/ProjectDetail.tsx` — full redesign of layout
- `src/index.css` — add any new utility classes needed

### No database changes required — all existing fields (client_name, category, tags, image_url, project_url, sections, testimonial) map to the new layout.

