

# SEO Audit & Improvements

## Current State
- SEOHead component on all pages with title, description, OG, Twitter cards
- robots.txt exists but missing sitemap reference
- No sitemap.xml
- No canonical URLs
- No structured data (JSON-LD schema markup)
- No `og:url` on most pages (only passed on BlogPost)

## Missing Items & Plan

### 1. Static Sitemap (`public/sitemap.xml`)
Create a static sitemap listing all known routes. Dynamic routes (blog posts, projects) can't be statically generated in a SPA, but we can list the main pages and crawlers will discover linked content.

### 2. Update `robots.txt`
Add `Sitemap: https://eflip.ie/sitemap.xml` directive.

### 3. Canonical URLs
Update `SEOHead` to always render a `<link rel="canonical">` and `og:url` using `window.location.origin + pathname`. Pass `url` from each page automatically using `useLocation()`.

### 4. Structured Data (JSON-LD)
- **Organization schema** on homepage (name, logo, url, social links)
- **Article schema** on blog posts (headline, author, datePublished, image)
- **LocalBusiness or WebSite** schema site-wide

### 5. Additional Meta Tags
- Add `og:site_name` and `og:locale` to SEOHead
- Add `twitter:site` handle if available

## Files to Create/Modify
- `public/sitemap.xml` — new static sitemap
- `public/robots.txt` — add sitemap directive
- `src/components/SEOHead.tsx` — canonical URL, og:url auto-generation, og:site_name, og:locale, optional JSON-LD structured data prop
- `src/pages/Index.tsx` — add Organization JSON-LD
- `src/pages/BlogPost.tsx` — add Article JSON-LD

