

# Fix Portfolio SEO: Slug URLs + Server-Side Meta Tags

## Two Problems Identified

**Problem 1: Ugly UUID URLs** — Portfolio pages use `/portfolio/2b9351c8-b1d3-4dc0-951a-834de6a03be5` instead of readable slugs like `/portfolio/acme-website-redesign`.

**Problem 2: Missing meta tags in source HTML** — This is the core issue. Since this is a single-page app (SPA), the HTML served to Google/Facebook/Twitter is always the same `index.html` with default meta tags. React Helmet only updates the DOM *after* JavaScript runs, but social media crawlers and some search engines don't execute JavaScript. They see the raw HTML — which has no project-specific title, description, or image.

## Solution

### 1. Add `slug` column to projects table
- Add a `slug` text column (unique, not null) to the `projects` table
- Auto-generate slugs from `client_name` for existing rows via a migration
- Update the admin project editor to manage slugs

### 2. Change routing from `:id` to `:slug`
- Update `App.tsx` route from `/portfolio/:id` to `/portfolio/:slug`
- Update `ProjectDetail.tsx` to query by `slug` instead of `id`
- Update all `<Link to={/portfolio/${...}}>` references across Portfolio, Index, and related project links to use slugs

### 3. Create a prerender edge function for crawlers
This is the critical fix. Create a backend function that:
- Receives a URL path (e.g. `/portfolio/acme-redesign`)
- Queries the database for the project's SEO data
- Returns a full HTML page with correct `<title>`, `<meta>`, OG tags, and JSON-LD in the `<head>`
- This function is called by a proxy/rewrite rule so that when a crawler requests a portfolio page, it gets the pre-rendered HTML with all the correct meta tags

Since we're on Lovable Cloud, the approach will be:
- Create an edge function `og-meta` that checks the User-Agent for known crawlers (Googlebot, Twitterbot, facebookexternalhit, etc.)
- For crawlers: return a minimal HTML page with all the correct meta tags and a redirect/canonical to the real page
- For regular users: the SPA handles everything as before

### 4. Update sitemap edge function
- Use slugs instead of UUIDs in the sitemap URLs

## Files to Create/Modify
- **Database migration**: Add `slug` column to `projects`, generate slugs for existing rows
- `supabase/functions/og-meta/index.ts` — new edge function for crawler-friendly HTML
- `src/pages/ProjectDetail.tsx` — query by slug
- `src/pages/Portfolio.tsx` — link using slugs
- `src/pages/Index.tsx` — link using slugs (if portfolio links exist)
- `src/pages/AdminProjectEdit.tsx` — slug field in editor
- `src/components/admin/AdminProjects.tsx` — show slugs
- `src/App.tsx` — update route parameter
- `supabase/functions/sitemap/index.ts` — use slugs in URLs

### Note on crawler proxying
For the prerender function to work in production, you'll need to configure your hosting/CDN to route crawler requests through the edge function. This typically involves a URL rewrite or middleware at the DNS/proxy level (e.g. Cloudflare Worker, or a custom domain redirect rule). I'll set up the edge function and provide guidance on connecting it.

