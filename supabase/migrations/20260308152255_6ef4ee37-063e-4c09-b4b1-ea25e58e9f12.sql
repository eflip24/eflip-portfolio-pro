ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS service_type text,
  ADD COLUMN IF NOT EXISTS budget_range text;