

# Improved Admin Dashboard

## Overview
Rebuild the admin page from a simple project list into a full-featured dashboard with stats overview, a proper data table for projects, quick actions, view/preview links, a delete confirmation dialog, and a link to view each project's public page.

## Changes

### `src/pages/Admin.tsx` — Full rewrite
- **Stats bar**: Show total projects count, projects per category (web/games/print/video) as stat cards at the top
- **Project table**: Replace the basic list with a proper `<Table>` using the existing shadcn table component, columns:
  - Thumbnail (small image)
  - Client Name
  - Category (as badge)
  - Tags (as badges, if any)
  - Date added (formatted)
  - Actions: View (opens `/portfolio/:id` in new tab), Edit (navigates to `/admin/project/:id`), Delete (with confirmation dialog)
- **Delete confirmation**: Use `AlertDialog` from shadcn to confirm before deleting
- **Search/filter**: Simple text search input to filter projects by name or category
- **Quick stats**: Count of projects per category displayed as small cards with the orange accent
- **Empty state**: Better styled empty state with CTA to add first project

### No database changes needed
All data already exists — this is purely a UI improvement.

### Technical details
- Import existing shadcn components: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `Badge`, `AlertDialog`, `Card`
- Use `date-fns` `format()` for date display
- Add `Eye` icon from lucide for the "view public page" action
- Filter state with `useState` for search text, applied client-side on the projects array

