

# Fix: Portfolio Pages Need Server-Rendered Meta Tags

## The Problem

You're right — the HTML source for `/portfolio/arc-raiders-trading-marketplace` shows **generic** meta tags (the homepage defaults), not the project-specific title and description. Here's why:

This is a **Single Page Application (SPA)**. Every URL serves the exact same `index.html` file. React Helmet updates the `<title>` and meta tags *after* JavaScript runs in the browser — that's why you see the correct title in your browser tab. But the raw HTML source never changes.

**Google:** Actually handles this fine. Googlebot runs JavaScript (headless Chrome) and will see the Helmet-injected meta tags. You can verify this in Google Search Console → URL Inspection → "View Tested Page" for any portfolio URL.

**Social media crawlers (Facebook, Twitter, LinkedIn):** These do NOT run JavaScript. They only read the raw HTML, so they'll always show the generic eFlip title/description when someone shares a portfolio link.

## Solution: Cloudflare Worker as Crawler Proxy

Since eflip.ie uses a custom domain (likely through Cloudflare or similar DNS provider), we can route crawler requests through the existing `og-meta` edge function. This requires a small Cloudflare Worker that:

1. Checks if the request comes from a known crawler (Googlebot, facebookexternalhit, Twitterbot, LinkedInBot)
2. If crawler → fetches the pre-rendered HTML from the `og-meta` edge function (which already returns correct per-page meta tags)
3. If regular user → serves the normal SPA as usual

### What I'll Build

**1. Cloudflare Worker script** — I'll generate the Worker code you can deploy at `eflip.ie`. It intercepts requests, checks User-Agent, and proxies crawlers to the og-meta function.

**2. Deployment instructions** — Step-by-step guide for adding the Worker in your Cloudflare dashboard (or whichever DNS/CDN you use).

No code changes are needed in the Lovable project itself — the `og-meta` edge function already returns correct meta tags for every portfolio and blog page. The missing piece is the routing layer.

### Files to Create
- `cloudflare-worker.js` — Worker script (added to project root for reference; deployed separately in Cloudflare)

### Technical Detail
The Worker will look like:
```text
Request → Cloudflare Worker
  ├─ Crawler? → fetch og-meta edge function → return pre-rendered HTML
  └─ User?   → pass through to normal SPA
```

