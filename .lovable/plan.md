

# Batch 2: Page Transitions, Skeleton Loading, Related Projects

## 1. Page Transition Component
Create `src/components/PageTransition.tsx` — a wrapper using Framer Motion that fades in + slides up on mount, fades out on unmount. Wrap each page's content in Layout with this.

Update `src/App.tsx`:
- Use `useLocation` and `AnimatePresence` from framer-motion around Routes
- Wrap each route's element with `PageTransition`

## 2. Skeleton Loading States
Create `src/components/ProjectSkeleton.tsx` — a card skeleton matching the portfolio grid card (aspect-video placeholder + text lines), using the existing `Skeleton` component.

Create `src/components/ProjectDetailSkeleton.tsx` — a detail page skeleton (back link, badges, title block, hero image, description lines).

Update `src/pages/Portfolio.tsx`:
- Replace "LOADING..." text with a grid of 8 `ProjectSkeleton` cards

Update `src/pages/ProjectDetail.tsx`:
- Replace "LOADING..." text with `ProjectDetailSkeleton`

## 3. Related Projects Section
Update `src/pages/ProjectDetail.tsx`:
- Add state for `relatedProjects`
- In the fetch, query up to 3 published projects with the same category, excluding the current project
- Render a "RELATED PROJECTS" section after prev/next nav, displaying small cards linking to each project

## Files
- **New**: `src/components/PageTransition.tsx`, `src/components/ProjectSkeleton.tsx`, `src/components/ProjectDetailSkeleton.tsx`
- **Modified**: `src/App.tsx`, `src/pages/Portfolio.tsx`, `src/pages/ProjectDetail.tsx`

No database changes needed.

