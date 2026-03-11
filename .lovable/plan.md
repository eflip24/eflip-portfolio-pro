

# Replace Logo with Updated Image

## Changes

1. **Copy new logo** — `user-uploads://eflip_logo-2.png` → `public/logo.png` (overwrite existing)

2. **Homepage hero** (`src/pages/Index.tsx`, line 137-144) — Replace the "eFLIP" text `<motion.h1>` with an `<motion.img>` pointing to `/logo.png`, sized large for the hero (e.g. `h-24 md:h-32 lg:h-40 w-auto mx-auto`)

3. **Favicon** — Already references `/logo.png`, so it updates automatically

Navbar and Footer already use `<img src="/logo.png">`, so they update automatically too.

### Files Modified
- `public/logo.png` (overwrite with new upload)
- `src/pages/Index.tsx` (hero text → image)

