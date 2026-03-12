
-- Add slug column to projects table
ALTER TABLE public.projects ADD COLUMN slug text;

-- Generate slugs from client_name for existing rows
UPDATE public.projects
SET slug = lower(
  regexp_replace(
    regexp_replace(
      regexp_replace(client_name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ),
    '-+', '-', 'g'
  )
);

-- Handle potential duplicates by appending a suffix
DO $$
DECLARE
  r RECORD;
  counter INT;
  new_slug TEXT;
BEGIN
  FOR r IN (
    SELECT id, slug FROM public.projects
    WHERE slug IN (SELECT slug FROM public.projects GROUP BY slug HAVING COUNT(*) > 1)
    ORDER BY created_at
  ) LOOP
    SELECT COUNT(*) INTO counter FROM public.projects WHERE slug = r.slug AND id < r.id;
    IF counter > 0 THEN
      new_slug := r.slug || '-' || counter;
      UPDATE public.projects SET slug = new_slug WHERE id = r.id;
    END IF;
  END LOOP;
END $$;

-- Now make it NOT NULL and UNIQUE
ALTER TABLE public.projects ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.projects ADD CONSTRAINT projects_slug_unique UNIQUE (slug);
