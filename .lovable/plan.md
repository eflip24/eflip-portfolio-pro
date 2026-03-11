

# Comprehensive SEO Plan for eFlip

## Current State
Every page has basic `SEOHead` with title and description. `SEOHead` already handles canonical URLs, OG tags, Twitter cards, and JSON-LD. However, the content is generic and not optimized for search intent, and structured data is missing on most pages.

## What Changes

### 1. Page-by-Page SEO Content

**Homepage (`/`)**
- Title: `eFlip — Creative Design Agency in Ireland | Web, Games, Print & Video`
- Description: `eFlip is an Irish design agency specialising in web design, game development, print media, and video production. Bold creative solutions that elevate your brand.`
- JSON-LD: Organization schema (already present, will refine with `contactPoint`, `address`, `areaServed`)

**Portfolio (`/portfolio`)**
- Title: `Our Work — Portfolio | eFlip Design Agency`
- Description: `Browse eFlip's portfolio of websites, games, print designs, and video productions. See how we bring bold creative visions to life for our clients.`
- JSON-LD: `CollectionPage` schema

**Portfolio Detail (`/portfolio/:id`)**
- Already dynamic from DB fields. Will add `CreativeWork` JSON-LD schema with `name`, `description`, `image`, `creator`, `dateCreated`, `genre`

**Services (`/services`)**
- Title: `Services — Web Design, Games, Print & Video | eFlip`
- Description: `Professional web design, game development, print design, and video production services. eFlip delivers creative solutions tailored to your brand.`
- JSON-LD: `Service` schema listing each service offering

**About (`/about`)**
- Title: `About Us — Meet the eFlip Creative Team`
- Description: `Learn about eFlip, a bold design collective in Ireland pushing creative boundaries across web, games, print, and video since 2016.`
- JSON-LD: `AboutPage` schema

**Blog (`/blog`)**
- Title: `Blog — Design Insights & Case Studies | eFlip`
- Description: `Read the latest design insights, project case studies, and creative industry trends from the eFlip team.`
- JSON-LD: `Blog` schema

**Blog Post (`/blog/:slug`)**
- Already dynamic. Will enhance `Article` JSON-LD with `mainEntityOfPage`, `wordCount`, `articleSection`

**Contact (`/contact`)**
- Title: `Contact Us — Get a Free Quote | eFlip Design Agency`
- Description: `Ready to start your next project? Contact eFlip for a free consultation. We specialise in web design, games, print, and video production.`
- JSON-LD: `ContactPage` schema

**404 (`NotFound`)**
- Add SEOHead with `noindex` meta tag so Google doesn't index error pages

### 2. Enhanced SEOHead Component
- Add `noindex` prop for admin/404 pages
- Add `twitter:site` handle (@eflip)
- Add `keywords` meta tag per page

### 3. Structured Data Enhancements
- Add `BreadcrumbList` schema to all inner pages for rich breadcrumb display in Google
- Add `WebSite` schema with `SearchAction` on homepage
- Enhance Organization schema with `contactPoint` and `areaServed`

### 4. Dynamic Sitemap Edge Function
- Create a backend function that queries all published projects and blog posts
- Generates a complete XML sitemap with `<lastmod>` dates
- Replace the static sitemap with a call to this function

### Files to Modify
- `src/components/SEOHead.tsx` — add `noindex`, `keywords`, `twitter:site` props
- `src/pages/Index.tsx` — enhanced title, description, Organization + WebSite JSON-LD
- `src/pages/Portfolio.tsx` — optimized SEO + CollectionPage JSON-LD
- `src/pages/ProjectDetail.tsx` — CreativeWork JSON-LD + BreadcrumbList
- `src/pages/Services.tsx` — optimized SEO + Service JSON-LD
- `src/pages/About.tsx` — optimized SEO + AboutPage JSON-LD
- `src/pages/Blog.tsx` — optimized SEO + Blog JSON-LD
- `src/pages/BlogPost.tsx` — enhanced Article JSON-LD + BreadcrumbList
- `src/pages/Contact.tsx` — optimized SEO + ContactPage JSON-LD
- `src/pages/NotFound.tsx` — add SEOHead with noindex
- `supabase/functions/sitemap/index.ts` — new dynamic sitemap edge function

