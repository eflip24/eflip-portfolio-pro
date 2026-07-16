
-- 1. blog_topics table
CREATE TABLE public.blog_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  angle TEXT,
  priority INTEGER NOT NULL DEFAULT 100,
  primary_keyword TEXT,
  target_audience TEXT,
  internal_links TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'queued', -- queued | drafting | drafted | published | rejected | failed
  scheduled_for TIMESTAMPTZ,
  last_error TEXT,
  post_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_topics TO authenticated;
GRANT ALL ON public.blog_topics TO service_role;

ALTER TABLE public.blog_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage blog topics" ON public.blog_topics
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Additions to blog_posts
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS keyword_data JSONB,
  ADD COLUMN IF NOT EXISTS sources JSONB,
  ADD COLUMN IF NOT EXISTS faq JSONB,
  ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES public.blog_topics(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_ai_draft BOOLEAN NOT NULL DEFAULT false;

-- 3. Seed 17 topics
INSERT INTO public.blog_topics (title, category, angle, priority, primary_keyword, target_audience, internal_links) VALUES
('How Small Businesses in Ireland Are Using AI in 2026 (With Real Examples)', 'AI', 'Local IE + real examples + practical; anti-hype', 1, 'AI for small businesses Ireland', 'Local IE', ARRAY['/ai','/services','/contact']),
('Custom Web Design vs AI Website Builders in 2026: Which Should You Choose?', 'Web Design', 'Comparison format; high commercial intent', 2, 'custom web design vs AI website builders', 'General', ARRAY['/custom-web-design','/services','/portfolio']),
('Print-Ready Design: Why Your Canva Files Keep Getting Rejected by Printers', 'Print Design', 'Pain-point problem solver; low competition', 3, 'canva print ready file rejected', 'General', ARRAY['/print-design','/services','/contact']),
('What Makes a Website Future-Proof in 2026 and Beyond?', 'Web Design', 'Forward-looking evergreen; authority builder', 4, 'future-proof website 2026', 'General', ARRAY['/custom-web-design','/services']),
('How to Turn Your Canva Design Into a Professional Print-Ready File', 'Print Design', 'How-to high-intent; quick win', 5, 'canva to print ready file', 'General', ARRAY['/print-design','/contact']),
('AI Tools That Actually Help Local Irish Businesses (No Hype)', 'AI', 'Practical, anti-hype, local IE', 6, 'best AI tools Irish businesses', 'Local IE', ARRAY['/ai','/services']),
('Gamification for Small Businesses: How Games Can Improve Customer Engagement', 'Game Design', 'Emerging trend; engagement angle', 7, 'gamification for small business', 'General', ARRAY['/game-design','/services']),
('The Real Cost of Cheap Website Builders in 2026', 'Web Design', 'Comparison + money angle', 8, 'cost of cheap website builders', 'General', ARRAY['/custom-web-design','/services']),
('How AI Is Changing Web Design (And What Still Requires Human Expertise)', 'Web Design', 'Trendy balanced take', 9, 'AI in web design 2026', 'General', ARRAY['/ai','/custom-web-design']),
('Best AI Tools for Estate Agents in Ireland (2026)', 'AI', 'Niche + local + industry', 10, 'AI tools for estate agents Ireland', 'Local IE - Estate Agents', ARRAY['/ai','/services','/contact']),
('How to Prepare Your Business Website for AI Search (Google AI Overviews & ChatGPT)', 'Web Design', 'Forward-looking; AI search readiness', 11, 'prepare website for AI search', 'General', ARRAY['/custom-web-design','/ai']),
('Why Most Small Business Websites Fail to Convert (And How to Fix It)', 'Web Design', 'Problem-solution', 12, 'small business website conversion', 'General', ARRAY['/custom-web-design','/services','/portfolio']),
('AI Voice Agents for Irish Businesses: Do They Actually Work?', 'AI', 'Bonus: voice AI + IE', 13, 'AI voice agents Ireland', 'Local IE', ARRAY['/ai','/contact']),
('The Hidden Costs of Using Free AI Website Builders', 'Web Design', 'Bonus: hidden cost warning', 14, 'hidden cost AI website builder', 'General', ARRAY['/custom-web-design','/services']),
('How Estate Agents Can Use AI Without Losing the Human Touch', 'AI', 'Bonus: estate agents + human touch', 15, 'AI for estate agents human touch', 'Local IE - Estate Agents', ARRAY['/ai']),
('Why Good Print Design Still Matters in a Digital World', 'Print Design', 'Bonus: brand value of print', 16, 'importance of print design', 'General', ARRAY['/print-design','/services']),
('Building Games for Business: When Gamification Makes Sense', 'Game Design', 'Bonus: when to gamify', 17, 'gamification for business when to use', 'General', ARRAY['/game-design','/services']);

-- 4. Update trigger
CREATE OR REPLACE FUNCTION public.update_blog_topics_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER blog_topics_updated_at BEFORE UPDATE ON public.blog_topics
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_topics_updated_at();
