

## eFlip Design Agency Portfolio Website

### Design & Branding
- **Colors**: Black background with orange (#FF6600) accents throughout
- **Typography**: PostMono, sans-serif in uppercase for all headings and navigation
- **Vibe**: Bold, modern, high-contrast — fitting for a creative agency

### Pages

1. **Homepage**
   - Animated hero with "eFlip" logo reveal (scale + fade animation)
   - Tagline with typewriter or stagger effect
   - Scrolling marquee of service categories (Web · Games · Print · Video)
   - CTA button to view portfolio
   - Subtle background animations (floating geometric shapes or grid pattern)

2. **Portfolio**
   - Filterable grid by category (Web, Games, Print, Video)
   - Each card shows: project image, client name, category tag
   - **Scroll-triggered animations** — each project card animates in (fade + slide up) as the user scrolls into view
   - Click opens individual project detail page

3. **Project Detail Page**
   - Hero image/gallery for the project
   - Client name, description, category
   - Link to live project
   - Smooth page transition animation

4. **About Us**
   - Agency story, mission, team info
   - Animated sections on scroll

5. **Services**
   - Cards for each service (websites, games, printing, videos)
   - Icon + description for each

6. **Contact**
   - Contact form (name, email, message) with validation
   - Agency contact info

### Navigation
- Sticky top navbar with eFlip logo and page links
- Mobile hamburger menu
- Orange hover/active states

### Admin Panel (protected by login)
- **Full authentication** via Supabase (email/password)
- Admin dashboard to manage portfolio:
  - Add new project (upload images, enter client name, description, category, link)
  - Edit/delete existing projects
  - Projects stored in Supabase database with image storage

### Backend (Supabase/Lovable Cloud)
- **projects** table: id, client_name, description, category, project_url, image_url, created_at
- **Storage bucket** for project images
- **Auth** for admin login
- **user_roles** table for admin role verification
- RLS policies so only admins can create/edit/delete projects, public can read

### Animations
- Homepage: logo reveal, staggered text, floating elements
- Portfolio: scroll-triggered fade-in for each card
- Page transitions: smooth fade between routes
- Hover effects on cards and buttons

