import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <SEOHead title="Blog" description="Insights, case studies, and behind-the-scenes from eFLIP design agency." />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-widest text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            OUR <span className="text-primary">BLOG</span>
          </motion.h1>
          <p className="text-center text-muted-foreground tracking-wider mb-16 text-sm">
            INSIGHTS, CASE STUDIES & BEHIND THE SCENES
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border overflow-hidden">
                  <Skeleton className="aspect-video w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-3 w-24 rounded-sm" />
                    <Skeleton className="h-6 w-3/4 rounded-sm" />
                    <Skeleton className="h-4 w-full rounded-sm" />
                    <Skeleton className="h-4 w-2/3 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground tracking-wider">
              NO POSTS YET. CHECK BACK SOON.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <Link to={`/blog/${post.slug}`}>
                    <motion.div
                      className="group overflow-hidden bg-card project-card"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video bg-secondary overflow-hidden">
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs tracking-widest">
                            NO IMAGE
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-[10px] text-muted-foreground tracking-widest mb-2">
                          {format(new Date(post.created_at), "MMMM d, yyyy").toUpperCase()}
                        </p>
                        <h2 className="text-base font-bold tracking-wider mb-2 group-hover:text-primary transition-colors">
                          {post.title.toUpperCase()}
                        </h2>
                        <p className="text-muted-foreground text-sm tracking-wider line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
