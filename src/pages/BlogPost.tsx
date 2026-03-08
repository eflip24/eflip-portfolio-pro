import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Link2, Twitter } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
  author: string | null;
  read_time: number | null;
  tags: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
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
      setPost(data as Post | null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (slug) {
      supabase.from("page_views").insert({ page_path: `/blog/${slug}` });
    }
  }, [slug]);

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
            <Skeleton className="h-3 w-40 rounded-sm" />
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

  return (
    <Layout>
      <SEOHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
        image={post.seo_image || post.cover_image || undefined}
      />
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2" size={14} /> BACK TO BLOG
            </Link>

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

            <h1 className="text-3xl md:text-5xl font-bold tracking-widest mb-4">
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
              <div className="aspect-video overflow-hidden border border-border mb-10">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="prose prose-invert prose-sm max-w-none text-muted-foreground tracking-wider leading-relaxed"
            />

            {/* Share buttons */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-xs tracking-widest text-muted-foreground mb-4">SHARE THIS POST</p>
              <div className="flex gap-3">
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
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
