
-- Add SEO and extra fields to projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS seo_title text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS seo_description text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS seo_image text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS testimonial text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS testimonial_author text;

-- Create project_sections table
CREATE TABLE public.project_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  layout text NOT NULL DEFAULT 'full',
  title text,
  content_left text,
  content_right text,
  image_urls text[],
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_sections ENABLE ROW LEVEL SECURITY;

-- Public can view sections
CREATE POLICY "Anyone can view project sections"
ON public.project_sections FOR SELECT
USING (true);

-- Admin-only insert/update/delete
CREATE POLICY "Admins can insert project sections"
ON public.project_sections FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update project sections"
ON public.project_sections FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete project sections"
ON public.project_sections FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));
