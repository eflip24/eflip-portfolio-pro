

# Comprehensive Feature Upgrade Plan

This plan implements all the suggested features from the previous conversation. Given the scope, I recommend implementing in 3 batches to keep changes manageable.

---

## Batch 1: Contact Form Backend + Admin Inquiries Tab + Featured Work on Homepage

### Database Migration
- Create `contact_submissions` table: `id`, `name`, `email`, `message`, `status` (enum: new/read/archived), `created_at`
- RLS: anyone can INSERT, admins can SELECT/UPDATE/DELETE
- Add `published` boolean to `projects` table (default `true`)
- Add `sort_order` integer to `projects` table (default `0`)

### Contact Form (`src/pages/Contact.tsx`)
- Update `onSubmit` to insert into `contact_submissions` table instead of just showing a toast

### Admin Dashboard (`src/pages/Admin.tsx`)
- Add tabs using shadcn `Tabs`: "Projects" (existing table) and "Inquiries"
- Inquiries tab: table showing name, email, message preview, date, status badge
- Actions: mark as read, archive, delete with confirmation
- Add inquiry count to the stats bar (with a Mail icon)
- Add a "Published" toggle column to the projects table (switch component that updates the DB)

### Homepage Featured Work (`src/pages/Index.tsx`)
- Add a "Featured Work" section between the marquee and teaser sections
- Fetch the 4 most recent published projects from the database
- Display as a 2x2 grid using the same project card style as Portfolio
- "VIEW ALL WORK" button linking to `/portfolio`

### Portfolio (`src/pages/Portfolio.tsx`)
- Filter out unpublished projects (add `.eq("published", true)` to the query)

---

## Batch 2: Page Transitions + Skeleton Loading + Related Projects

### Page Transitions (`src/App.tsx`)
- Wrap `<Routes>` with Framer Motion `AnimatePresence`
- Create a `PageTransition` wrapper component with fade + slight upward slide
- Apply to all page components via their Layout or directly

### Skeleton Loading States
- Create `src/components/ProjectSkeleton.tsx` — a card-shaped skeleton matching the portfolio grid card dimensions
- Use in `Portfolio.tsx` and `ProjectDetail.tsx` instead of "LOADING..." text

### Related Projects (`src/pages/ProjectDetail.tsx`)
- After the prev/next navigation, add a "Related Projects" section
- Query 3 projects from the same category (excluding current), display as small cards
- Link each to its detail page

---

## Batch 3: Testimonials/Client Logos + Blog/Case Studies + Admin Analytics

### Client Logos & Testimonials (`src/pages/Index.tsx`)
- Add a "Trusted By" section after Featured Work showing client logos (pulled from project images or a new simple array)
- Add a testimonials carousel using `embla-carousel-react` (already installed), pulling testimonials from projects that have them

### Blog/Case Studies
- Create `blog_posts` table: `id`, `title`, `slug`, `content` (rich text), `excerpt`, `cover_image`, `published`, `created_at`, `updated_at`
- RLS: anyone can SELECT published, admins can CRUD
- Create `src/pages/Blog.tsx` — list page with cards
- Create `src/pages/BlogPost.tsx` — detail page with sanitized HTML content
- Create `src/pages/AdminBlogEdit.tsx` — editor similar to project editor
- Add "Blog" to navbar and admin tabs
- Add routes in `App.tsx`

### Admin Analytics
- Create `page_views` table: `id`, `page_path`, `project_id` (nullable), `created_at`
- RLS: anyone can INSERT, admins can SELECT
- Add a lightweight tracker component that inserts a row on page load (for portfolio detail pages)
- Add an "Analytics" tab in Admin showing:
  - Total views, views this week/month
  - Most viewed projects (bar chart using recharts, already installed)
  - Category popularity breakdown (pie chart)

---

## Summary of All New Files
- `src/components/ProjectSkeleton.tsx`
- `src/components/PageTransition.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/AdminBlogEdit.tsx`

## Summary of All Modified Files
- `src/pages/Contact.tsx` — save to DB
- `src/pages/Admin.tsx` — tabs for Projects, Inquiries, Blog, Analytics
- `src/pages/Index.tsx` — featured work, testimonials carousel, client logos
- `src/pages/Portfolio.tsx` — filter published only
- `src/pages/ProjectDetail.tsx` — skeleton loading, related projects, page view tracking
- `src/App.tsx` — page transitions, blog routes
- `src/components/Navbar.tsx` — add Blog link

## Database Migrations
1. `contact_submissions` table + RLS
2. `published` + `sort_order` columns on `projects`
3. `blog_posts` table + RLS
4. `page_views` table + RLS

This is a large scope. I recommend approving Batch 1 first, then proceeding with Batch 2 and 3 in subsequent messages to keep changes reliable and testable.

