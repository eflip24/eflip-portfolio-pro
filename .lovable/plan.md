

# Visual Overhaul: Portfolio, Hero, and Custom Button Labels

## 1. Database: Add `button_label` column to projects

Add a nullable `button_label` text column (default: null). When null, the detail page falls back to "VIEW LIVE PROJECT". Admin can set custom text like "Arc Raiders Trade" per project.

## 2. Admin: Add button label field

**`src/pages/AdminProjectEdit.tsx`**: Add a `button_label` field to the form next to `project_url`, with placeholder "BUTTON LABEL (E.G. ARC RAIDERS TRADE)".

## 3. ProjectDetail: Use custom button label

**`src/pages/ProjectDetail.tsx`**: Display `project.button_label || "VIEW LIVE PROJECT"` on the CTA button. Add `button_label` to the Project interface.

## 4. Portfolio page visual redesign (inspired by screenshot)

**`src/pages/Portfolio.tsx`**:
- Increase heading font size (`text-5xl md:text-7xl`)
- Increase subtitle and description font sizes
- Replace filter buttons with a left-to-right orange fill animation on hover using CSS `background-size` transition — no borders, just a clean wipe effect. Active state fills fully orange.
- Show a category description below the active filter (e.g. "Short, sharp shocks to promote game launches...")
- Change project grid to 4 columns on large screens
- Project cards: add subtle corner accents (CSS pseudo-elements with orange corners like the screenshot)

## 5. Animated particle background (site-wide)

Replace `GeometricMesh` with a more visually impressive **particle field** background:
- More particles (150+), varying sizes, with a gentle drift
- Mouse interaction: particles near cursor get repelled/attracted creating a ripple effect
- Glowing orange particles with varying opacity
- Subtle connecting lines only for very close particles
- A faint radial gradient glow at the top center

Create a new `ParticleField` component and use it in the Layout so it persists across all pages (fixed position, behind content).

## 6. Filter button hover animation (CSS)

In `src/index.css`, add a custom class for the portfolio filter buttons:
```css
.filter-btn {
  position: relative;
  overflow: hidden;
  background: transparent;
  z-index: 1;
}
.filter-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: hsl(var(--primary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: -1;
}
.filter-btn:hover::before,
.filter-btn.active::before {
  transform: scaleX(1);
}
```

## Files Changed

- **Migration**: Add `button_label` text column to projects
- **`src/pages/AdminProjectEdit.tsx`**: Add button_label input field
- **`src/pages/ProjectDetail.tsx`**: Use custom button label
- **`src/pages/Portfolio.tsx`**: Larger fonts, 4-col grid, filter animation, card corner accents
- **`src/components/ParticleField.tsx`** (new): Mouse-interactive particle background
- **`src/components/Layout.tsx`**: Add ParticleField behind all content
- **`src/components/GeometricMesh.tsx`**: Keep but no longer used in Index hero (ParticleField replaces it)
- **`src/pages/Index.tsx`**: Remove GeometricMesh import, rely on Layout's ParticleField
- **`src/index.css`**: Add filter-btn animation class

