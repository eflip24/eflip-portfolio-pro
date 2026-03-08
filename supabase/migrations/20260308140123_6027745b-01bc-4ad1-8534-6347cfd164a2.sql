-- Ensure storage policies exist (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Project images are publicly accessible' AND schemaname = 'storage') THEN
    CREATE POLICY "Project images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can upload project images' AND schemaname = 'storage') THEN
    CREATE POLICY "Admins can upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can update project images' AND schemaname = 'storage') THEN
    CREATE POLICY "Admins can update project images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can delete project images' AND schemaname = 'storage') THEN
    CREATE POLICY "Admins can delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;