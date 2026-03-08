

# Enhanced Blog Post Editor with SEO & Features

## Database Migration
Add columns to `blog_posts`:
- `seo_title` text nullable — custom meta title (falls back to post title)
- `seo_description` text nullable — custom meta description (falls back to excerpt)
- `seo_image` text nullable — custom OG image (falls back to cover image)
- `tags` text[] nullable — categorization tags
- `author` text nullable — author name
- `read_time` integer nullable — estimated reading time in minutes

## AdminBlogEdit.tsx Overhaul
Reorganize into clear sections with collapsible areas:

**Content Section** — title (auto-generates slug), slug, author, excerpt, content textarea, cover image upload with preview

**Tags Section** — comma-separated tag input, displayed as removable badges

**SEO Section** (collapsible) — seo_title, seo_description, seo_image upload, live preview card showing how the post will appear in search results (Google snippet style)

**Publishing Section** — published toggle, read time (auto-calculated from content word count, editable), created/updated timestamps display

## BlogPost.tsx Updates
- Use `seo_title`/`seo_description`/`seo_image` in `SEOHead` when available
- Display author name and read time below date
- Display tags as badges
- Track page view on mount

## Blog.tsx Updates
- Show tags on blog cards
- Show author + read time on cards

## Files
- **Migration**: Add 5 columns to `blog_posts`
- **Modified**: `src/pages/AdminBlogEdit.tsx` (full rewrite), `src/pages/BlogPost.tsx`, `src/pages/Blog.tsx`

