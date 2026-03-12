import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [{ data: projects }, { data: blogPosts }] = await Promise.all([
    supabase
      .from("projects")
      .select("slug, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false }),
  ]);

  const baseUrl = "https://eflip.ie";
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { loc: "/", changefreq: "weekly", priority: "1.0" },
    { loc: "/portfolio", changefreq: "weekly", priority: "0.9" },
    { loc: "/services", changefreq: "monthly", priority: "0.8" },
    { loc: "/about", changefreq: "monthly", priority: "0.7" },
    { loc: "/blog", changefreq: "weekly", priority: "0.8" },
    { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const page of staticPages) {
    xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  if (projects) {
    for (const project of projects) {
      const lastmod = project.created_at.split("T")[0];
      xml += `  <url>
    <loc>${baseUrl}/portfolio/${project.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  }

  if (blogPosts) {
    for (const post of blogPosts) {
      const lastmod = post.updated_at.split("T")[0];
      xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }
  }

  xml += `</urlset>`;

  return new Response(xml, { headers: corsHeaders });
});
