import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "";
  
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const baseUrl = "https://eflip.ie";
  const defaultTitle = "eFlip — Creative Design Agency in Ireland | Web, Games, Print & Video";
  const defaultDesc = "eFlip is an Irish design agency specialising in web design, game development, print media, and video production.";
  const defaultImage = `${baseUrl}/og-image.png`;

  let title = defaultTitle;
  let description = defaultDesc;
  let image = defaultImage;
  let canonicalUrl = `${baseUrl}${path}`;
  let jsonLd = "";

  // Portfolio detail page
  const portfolioMatch = path.match(/^\/portfolio\/([^/]+)$/);
  if (portfolioMatch) {
    const slug = portfolioMatch[1];
    const { data: project } = await supabase
      .from("projects")
      .select("client_name, description, category, image_url, seo_title, seo_description, seo_image, tags, created_at, slug")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (project) {
      title = `${project.seo_title || project.client_name} | eFlip`;
      description = project.seo_description || project.description;
      image = project.seo_image || project.image_url || defaultImage;
      canonicalUrl = `${baseUrl}/portfolio/${project.slug}`;
      jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.client_name,
        "description": project.description,
        "image": project.image_url || undefined,
        "url": canonicalUrl,
        "creator": { "@type": "Organization", "name": "eFlip", "url": baseUrl },
        "dateCreated": project.created_at,
        "genre": project.category,
        "keywords": project.tags?.join(", ") || project.category,
      });
    }
  }

  // Blog post page
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const { data: post } = await supabase
      .from("blog_posts")
      .select("title, excerpt, cover_image, seo_title, seo_description, seo_image, author, tags, created_at, updated_at, slug")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (post) {
      title = `${post.seo_title || post.title} | eFlip`;
      description = post.seo_description || post.excerpt;
      image = post.seo_image || post.cover_image || defaultImage;
      canonicalUrl = `${baseUrl}/blog/${post.slug}`;
      jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.cover_image || undefined,
        "url": canonicalUrl,
        "author": { "@type": "Person", "name": post.author || "eFlip" },
        "publisher": { "@type": "Organization", "name": "eFlip", "url": baseUrl },
        "datePublished": post.created_at,
        "dateModified": post.updated_at,
      });
    }
  }

  // Static pages
  const staticMeta: Record<string, { title: string; desc: string }> = {
    "/": { title: defaultTitle, desc: defaultDesc },
    "/portfolio": { title: "Our Work — Portfolio | eFlip Design Agency", desc: "Browse eFlip's portfolio of websites, games, print designs, and video productions." },
    "/services": { title: "Services — Web Design, Games, Print & Video | eFlip", desc: "Professional web design, game development, print design, and video production services." },
    "/about": { title: "About Us — Meet the eFlip Creative Team", desc: "Learn about eFlip, a bold design collective in Ireland pushing creative boundaries." },
    "/blog": { title: "Blog — Design Insights & Case Studies | eFlip", desc: "Read the latest design insights and creative industry trends from eFlip." },
    "/contact": { title: "Contact Us — Get a Free Quote | eFlip Design Agency", desc: "Ready to start your next project? Contact eFlip for a free consultation." },
  };

  if (staticMeta[path] && !portfolioMatch && !blogMatch) {
    title = staticMeta[path].title;
    description = staticMeta[path].desc;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="eFlip">
  <meta property="og:locale" content="en_IE">
  <meta name="robots" content="noindex">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@eflip">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  
  ${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
  
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
</head>
<body>
  <p>Redirecting to <a href="${canonicalUrl}">${escapeHtml(title)}</a></p>
</body>
</html>`;

  return new Response(html, {
    headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
  });
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
