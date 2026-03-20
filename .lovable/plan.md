

# Fix Sitemap for Google Search Console

## Problem
Google Search Console requires the sitemap URL to be on the same domain (`eflip.ie`). The current sitemap lives at a Supabase function URL on a different domain, so Google rejects it.

## Solution

Create a static `public/sitemap.xml` on your domain with all 18 URLs (6 static pages + 12 portfolio projects). Update `robots.txt` to point to `https://eflip.ie/sitemap.xml`.

**Trade-off:** A static file won't auto-update when you add new projects. You'll need to ask me to regenerate it when you add/remove portfolio items. The dynamic edge function remains available as a backup.

### Changes

1. **Create `public/sitemap.xml`** — Static XML with all 18 URLs:
   - 6 static pages (`/`, `/portfolio`, `/services`, `/about`, `/blog`, `/contact`)
   - 12 portfolio pages (using slugs from database)
   - Proper `<lastmod>`, `<changefreq>`, and `<priority>` values

2. **Update `public/robots.txt`** — Change sitemap URL from the Supabase function to `https://eflip.ie/sitemap.xml`

### After implementation
Submit `https://eflip.ie/sitemap.xml` in Google Search Console — this will now be accepted since it's on the same domain.

### Files
- `public/sitemap.xml` (create)
- `public/robots.txt` (update line 22)

