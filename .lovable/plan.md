

# Batch 3: Testimonials, Blog System, Admin Analytics

## 1. Database Migrations

### `blog_posts` table
- `id` uuid PK, `title` text, `slug` text unique, `content` text, `excerpt` text, `cover_image` text nullable, `published` boolean default false, `created_at` timestamptz, `updated_at` timestamptz
- RLS: anyone can SELECT where published=true, admins can full CRUD

### `page_views` table
- `id` uuid PK, `page_path` text, `project_id` uuid nullable, `created_at` timestamptz default now()
- RLS: anyone can INSERT, admins can SELECT
- Enable realtime not needed here

## 2. Homepage: Testimonials Carousel + Client Logos (`src/pages/Index.tsx`)

- Fetch projects that have a non-null `testimonial` field
- Add a "WHAT OUR CLIENTS SAY" section after Featured Work with an auto-scrolling Embla carousel showing testimonial quotes with author names
- Add a "TRUSTED BY" section showing unique client names/logos from published projects in a horizontal scrolling row

## 3. Blog System

### `src/pages/Blog.tsx`
- List page fetching published blog posts, displayed as cards with cover image, title, excerpt, date
- Links to `/blog/:slug`

### `src/pages/BlogPost.tsx`
- Detail page fetching by slug, rendering sanitized HTML content with DOMPurify
- Back link to blog list, cover image hero

### `src/pages/AdminBlogEdit.tsx`
- Editor similar to AdminProjectEdit: title, slug (auto-generated from title), excerpt, content (textarea for HTML), cover image upload, published toggle
- Save/update to `blog_posts` table

### `src/components/Navbar.tsx`
- Add "Blog" link between "Services" and "About"

### `src/App.tsx`
- Add routes: `/blog`, `/blog/:slug`, `/admin/blog/:id`

### `src/pages/Admin.tsx`
- Add "BLOG" tab showing blog posts list with edit/delete/new actions
- Add "ANALYTICS" tab

## 4. Admin Analytics (`src/components/admin/AdminAnalytics.tsx`)

- Query `page_views` table for totals, this week, this month
- Most viewed projects: join with projects table, bar chart using recharts
- Category popularity: pie chart
- Display stats cards + charts

## 5. View Tracking (`src/pages/ProjectDetail.tsx`)

- On mount, insert a row into `page_views` with `page_path` and `project_id`
- Fire-and-forget, no error handling needed

## Files

- **Migration**: `blog_posts` table + `page_views` table + RLS policies
- **New**: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/pages/AdminBlogEdit.tsx`, `src/components/admin/AdminAnalytics.tsx`
- **Modified**: `src/pages/Index.tsx` (testimonials + client logos), `src/pages/Admin.tsx` (blog + analytics tabs), `src/components/Navbar.tsx` (blog link), `src/App.tsx` (routes), `src/pages/ProjectDetail.tsx` (view tracking)

