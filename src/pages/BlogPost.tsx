import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Link2, Twitter } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import BlogTOC, { extractTOC, injectHeadingIds } from "@/components/blog/BlogTOC";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface FaqItem { question: string; answer: string }
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  author: string | null;
  read_time: number | null;
  tags: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  faq: FaqItem[] | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      setPost(data as unknown as Post | null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (slug) {
      supabase.from("page_views").insert({ page_path: `/blog/${slug}` });
    }
  }, [slug]);

  const { safeHtml, toc } = useMemo(() => {
    if (!post) return { safeHtml: "", toc: [] };
    const clean = DOMPurify.sanitize(post.content, { ADD_ATTR: ["target", "rel"] });
    const tocItems = extractTOC(clean);
    const withIds = injectHeadingIds(clean, tocItems);
    return { safeHtml: withIds, toc: tocItems };
  }, [post]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("LINK COPIED!");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || "")}`, "_blank");
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <Skeleton className="h-4 w-32 rounded-sm" />
            <Skeleton className="h-12 w-3/4 rounded-sm" />
            <Skeleton className="aspect-video w-full rounded-sm" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-5/6 rounded-sm" />
              <Skeleton className="h-4 w-2/3 rounded-sm" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <p className="text-muted-foreground tracking-widest">POST NOT FOUND</p>
          <Button asChild variant="outline">
            <Link to="/blog"><ArrowLeft className="mr-2" size={16} /> BACK TO BLOG</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;

  return (
    <Layout>
      <SEOHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
        image={post.seo_image || post.cover_image || undefined}
        type="article"
        keywords={post.tags?.join(", ") || "design, eFlip, blog"}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.cover_image || undefined,
            "datePublished": post.created_at,
            "dateModified": post.updated_at || post.created_at,
            "wordCount": wordCount,
            "articleSection": post.tags?.[0] || "Design",
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://eflip.ie/blog/${post.slug}` },
            "author": { "@type": "Person", "name": post.author || "eFlip" },
            "publisher": {
              "@type": "Organization",
              "name": "eFlip",
              "logo": { "@type": "ImageObject", "url": "https://eflip.ie/logo.png" }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://eflip.ie/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://eflip.ie/blog/${post.slug}` }
            ]
          },
          ...(post.faq && post.faq.length > 0 ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faq.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            }))
          }] : [])
        ]}
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="mr-2" size={14} /> BACK TO BLOG
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          >
            {/* Left: TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <BlogTOC items={toc} />
              </div>
            </aside>

            {/* Center: Article */}
            <article className="lg:col-span-6 min-w-0">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground tracking-widest mb-4">
                  <span>{format(new Date(post.created_at), "MMMM d, yyyy").toUpperCase()}</span>
                  {post.author && (
                    <span className="flex items-center gap-1">
                      <User size={10} /> {post.author.toUpperCase()}
                    </span>
                  )}
                  {post.read_time && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {post.read_time} MIN READ
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold tracking-widest mb-6 leading-tight">
                  {post.title.toUpperCase()}
                </h1>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] tracking-widest">
                        {tag.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                )}

                {post.cover_image && (
                  <div className="aspect-video overflow-hidden border border-border">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </header>

              {/* Mobile TOC */}
              {toc.length > 0 && (
                <details className="lg:hidden mb-8 border border-border p-4 group">
                  <summary className="text-[10px] tracking-widest text-muted-foreground cursor-pointer list-none flex items-center justify-between">
                    <span>ON THIS PAGE</span>
                    <span className="group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="mt-4">
                    <BlogTOC items={toc} />
                  </div>
                </details>
              )}

              <div
                dangerouslySetInnerHTML={{ __html: safeHtml }}
                className="prose prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-widest prose-headings:text-foreground prose-headings:scroll-mt-24
                  prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:uppercase prose-h2:border-t prose-h2:border-border prose-h2:pt-8
                  prose-h3:text-base md:prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:uppercase prose-h3:text-primary
                  prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-4 prose-p:tracking-wide
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:font-medium
                  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:text-muted-foreground prose-ul:text-sm md:prose-ul:text-base
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-muted-foreground prose-ol:text-sm md:prose-ol:text-base
                  prose-li:my-1.5 prose-li:leading-relaxed prose-li:tracking-wide
                  prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:my-6
                  prose-code:text-primary prose-code:text-xs prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-hr:border-border prose-hr:my-10
                  prose-img:border prose-img:border-border prose-img:my-6"
              />

              {post.faq && post.faq.length > 0 && (
                <div className="mt-16 border-t border-border pt-10">
                  <h2 className="text-xl md:text-2xl font-bold tracking-widest mb-8 uppercase">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {post.faq.map((f, i) => (
                      <div key={i} className="border border-border p-5">
                        <h3 className="text-sm font-bold tracking-wider mb-2 text-foreground">{f.question}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 border-t border-border pt-8">
                <p className="text-xs tracking-widest text-muted-foreground mb-4">SHARE THIS POST</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" onClick={copyLink} className="tracking-widest text-[10px]">
                    <Link2 size={14} className="mr-2" /> COPY LINK
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareTwitter} className="tracking-widest text-[10px]">
                    <Twitter size={14} className="mr-2" /> X / TWITTER
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareLinkedIn} className="tracking-widest text-[10px]">
                    LINKEDIN
                  </Button>
                </div>
              </div>
            </article>

            {/* Right: Sidebar */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <BlogSidebar currentSlug={post.slug} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
