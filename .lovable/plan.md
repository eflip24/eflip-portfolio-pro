

# SEO + Rich Portfolio Client Pages

## Overview
Three interconnected features: page-level SEO across the site, per-project SEO fields in admin, and a rich content builder for detailed client portfolio pages.

## 1. SEO Component for All Pages

Create a reusable `SEOHead` component using `react-helmet-async` that sets `<title>`, `<meta description>`, Open Graph, and Twitter card tags per page. Apply it to every page (Index, Portfolio, About, Services, Contact, ProjectDetail). Also fix the OG tags in `index.html` to use eFlip branding as defaults.

## 2. Database Changes

Add new columns to the `projects` table:

- `seo_title` (text, nullable) -- custom SEO title
- `seo_description` (text, nullable) -- custom meta description
- `seo_image` (text, nullable) -- custom OG image URL

Create a new `project_sections` table for rich content blocks:

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| project_id | uuid | FK to projects |
| sort_order | integer | ordering |
| layout | text | "full", "two-column", "gallery", "code-showcase" |
| title | text, nullable | section heading |
| content_left | text, nullable | HTML/text for left or full column |
| content_right | text, nullable | HTML/text for right column |
| image_urls | text[], nullable | array of image URLs for gallery |
| created_at | timestamptz | default now() |

RLS: public SELECT, admin-only INSERT/UPDATE/DELETE (same pattern as projects).

## 3. Admin Panel Enhancements

Expand the project form dialog into a full admin page `/admin/project/:id` with tabs:

- **Details tab**: existing fields + SEO fields (seo_title, seo_description, seo_image upload)
- **Content Builder tab**: sortable list of sections. Each section has:
  - Layout picker (Full Width, Two Column, Gallery, Code Showcase)
  - Rich text/HTML input areas per column (using a textarea with HTML preview toggle)
  - Image upload for gallery sections (multiple files)
  - Drag to reorder sections
  - Add/remove sections

The main Admin page keeps the project list but "Edit" now navigates to this detail page.

## 4. ProjectDetail Page Upgrade

Render the `project_sections` in order after the description:

- **Full width**: single column content rendered as sanitized HTML
- **Two column**: side-by-side columns, each rendering HTML content, responsive (stacks on mobile)
- **Gallery**: masonry or grid of uploaded images with lightbox on click
- **Code showcase**: styled container with a dark code-block aesthetic, renders HTML/CSS content in an iframe sandbox for safe preview

Use DOMPurify to sanitize any HTML content before rendering.

## 5. Additional Portfolio Improvements

- **Project tags/technologies**: add a `tags` text array column to projects, display as badges on cards and detail pages
- **Testimonial quote**: add `testimonial` and `testimonial_author` text columns for client quotes displayed on the detail page
- **Next/Previous project navigation** at the bottom of ProjectDetail

## Files Changed

- **New**: `src/components/SEOHead.tsx` -- reusable SEO meta component
- **New**: `src/pages/AdminProjectEdit.tsx` -- full project editor with content builder
- **Edit**: `index.html` -- fix default OG tags
- **Edit**: `src/App.tsx` -- add route for admin project edit, add HelmetProvider
- **Edit**: `src/pages/Index.tsx`, `About.tsx`, `Services.tsx`, `Contact.tsx`, `Portfolio.tsx` -- add SEOHead
- **Edit**: `src/pages/ProjectDetail.tsx` -- render sections, SEO from project data, tags, testimonial, prev/next nav
- **Edit**: `src/pages/Admin.tsx` -- add SEO fields to quick form, link edit to new editor page
- **Migration**: add columns to projects, create project_sections table with RLS
- **Install**: `react-helmet-async`, `dompurify` + `@types/dompurify`

