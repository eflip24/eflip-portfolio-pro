import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
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
        title={post.title}
        description={post.excerpt}
        image={post.cover_image || undefined}
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

            <p className="text-[10px] text-muted-foreground tracking-widest mb-4">
              {format(new Date(post.created_at), "MMMM d, yyyy").toUpperCase()}
            </p>

            <h1 className="text-3xl md:text-5xl font-bold tracking-widest mb-8">
              {post.title.toUpperCase()}
            </h1>

            {post.cover_image && (
              <div className="aspect-video overflow-hidden border border-border mb-10">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="prose prose-invert prose-sm max-w-none text-muted-foreground tracking-wider leading-relaxed"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
