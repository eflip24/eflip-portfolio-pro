## Add LegallySpoken to the portfolio

Create a new entry in the `projects` table (via `supabase--insert`) and upload the provided screenshot as the hero image.

### Project metadata

- **Client name:** LegallySpoken
- **Slug:** `legallyspoken`
- **Category:** WEB (with a secondary mention of eflip AI in the description, since the site is built around AI-assisted legal tooling)
- **Project URL:** https://legallyspoken.com/
- **Published:** true
- **Sort order:** 0 (top of grid)
- **Hero image:** the uploaded `LegallySpoken.jpg`, uploaded to Supabase Storage and referenced by `image_url`

### Short description (portfolio card)

> A next-generation legal platform giving people across the US and Europe instant, free access to legal clarity — 100+ tools, calculators, guides, forms, and a growing directory of lawyers in every state and country.

### Long description / "what we did" (DETAILS section on the project page)

Written as short paragraphs so the existing `formatContent` renderer in `ProjectDetail.tsx` picks them up cleanly. Covers:

1. **The brief** — build the most useful, trustworthy legal resource on the internet: free forever, no signup, genuinely helpful for real people (not just lawyers).
2. **What we designed & built**
   - Custom, high-contrast dark UI with a gold accent system tuned for long-form legal reading.
   - 100+ free legal tools (contract analysers, risk checkers, deadline calculators, document generators).
   - 7 in-depth legal guides and a growing library of downloadable forms.
   - Lawyer directory covering all 50 US states and expanding across Europe.
   - 6,000+ indexed pages architected for search — schema.org, clean slugs, sitemap automation, AI-search readiness.
   - Multi-language support (English + expanding) and a light/dark theme.
   - Admin + user dashboards for saved tools, generated documents, and history.
3. **eflip AI layer** — the tools that read contracts, flag risks, calculate deadlines and draft documents are powered by our own AI workflows wired into the site.
4. **Outcome** — a platform positioned to become the go-to free legal resource across the US and Europe, with content, tools, and lawyer coverage expanding every week.

### Files / systems touched

- `supabase--storage_upload` — upload `LegallySpoken.jpg` to the existing project image bucket.
- `supabase--insert` — insert one row into `public.projects` with the fields above.
- Sitemap will pick the new `/portfolio/legallyspoken` URL up automatically on the next generate-sitemap run.
- No React/TS code changes required — the portfolio grid and detail page already render from the database.

### Open question

Category — should this show under **WEB** (default, since it's primarily a web build) or under **EFLIP AI** (because the tools are AI-powered)? I'll default to **WEB** unless you say otherwise.
