

# Replace Text Logo with Uploaded Image

## Plan

The current website uses "eFLIP" text as the logo in the navbar and footer. I'll replace this with your uploaded orange pixel-art "e" logo.

### Changes:

1. **Copy logo to public folder** — `user-uploads://eflip_logo.png` → `public/logo.png`

2. **Navbar.tsx** — Replace text logo with image:
   - Change the `<Link>` from text "eFLIP" to an `<img>` with the logo
   - Add appropriate sizing (height ~32px, auto width)
   - Maintain the Link component for navigation

3. **Footer.tsx** — Replace text logo with image:
   - Same approach as navbar
   - Maintain styling consistency

4. **index.html** — Add favicon reference:
   - Use the same logo as favicon for brand consistency

### Files to Modify:
- `public/logo.png` (new file - copy from upload)
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `index.html`

