

# SEO Audit Findings & Fix Plan

## Issues Found

### Critical
1. **`index.html` has broken OG images** — The `og:image` and `twitter:image` URLs point to expiring Google Storage URLs with signatures. These will break (or already have). All crawlers see these tags since it's an SPA.
2. **`index.html` meta tags are generic** — Title says "eFlip — Bold Design Agency" instead of the keyword-rich version used in SEOHead. Description is weaker than the SEOHead version.
3. **`robots.txt` points to static sitemap** — `Sitemap: https://eflip.ie/sitemap.xml` points to the old static file, not the dynamic edge function.
4. **`og-meta` edge function not registered** — `supabase/config.toml` only has `[functions.sitemap]`. The `og-meta` function was created but never registered with `verify_jwt = false`, so it won't deploy.
5. **Login and Admin pages have no `noindex`** — Google can index `/login` and `/admin`, which shouldn't appear in search results.

### Moderate
6. **Static `public/sitemap.xml` still exists** — Contains only 6 static pages with no portfolio or blog entries. If a crawler hits `/sitemap.xml` it gets the old incomplete version.
7. **Footer social links are placeholder URLs** — `https://instagram.com`, `https://linkedin.com` etc. with no actual eFlip profiles. These affect trust signals.
8. **`index.html` missing `<link rel="icon">`** — No favicon reference in the HTML head.

## Fix Plan

### 1. Fix `index.html`
- Update title to: `eFlip — Creative Design Agency in Ireland | Web, Games, Print & Video`
- Update description to match the SEOHead default
- Replace expired OG image URLs with `https://eflip.ie/og-image.png`
- Add `<link rel="icon" href="/favicon.ico">`
- Add `og:site_name`, `og:locale`

### 2. Register `og-meta` in config
- Add `[functions.og-meta]` with `verify_jwt = false` to `supabase/config.toml`

### 3. Update `robots.txt`
- Change sitemap URL to point to the dynamic edge function: `Sitemap: https://ffyloqahsmfrmhxvxmtu.supabase.co/functions/v1/sitemap`
- Add `Disallow: /login` and `Disallow: /admin` rules

### 4. Replace static `public/sitemap.xml`
- Replace with a simple redirect/meta-refresh to the dynamic sitemap URL, or delete it and let robots.txt handle discovery

### 5. Add `noindex` to Login and Admin pages
- Add `<SEOHead noindex />` to `Login.tsx` and `Admin.tsx`

### 6. Fix `og-meta` function
- Add `og:site_name` and `og:locale` tags
- Ensure the HTML includes a proper `<!DOCTYPE html>` and returns status 200

### Files to modify
- `index.html` — fix meta tags, OG image, favicon
- `supabase/config.toml` — register og-meta function
- `public/robots.txt` — dynamic sitemap URL, disallow admin
- `public/sitemap.xml` — delete or replace with redirect
- `src/pages/Login.tsx` — add SEOHead with noindex
- `src/pages/Admin.tsx` — add SEOHead with noindex
- `supabase/functions/og-meta/index.ts` — add missing OG tags

