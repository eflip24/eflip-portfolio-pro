import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface RecentPost { slug: string; title: string; created_at: string }
interface RecentProject { slug: string; client_name: string; image_url: string | null; category: string | null }

const BlogSidebar = ({ currentSlug }: { currentSlug: string }) => {
  const [posts, setPosts] = useState<RecentPost[]>([]);
  const [projects, setProjects] = useState<RecentProject[]>([]);

  useEffect(() => {
    (async () => {
      const [postsRes, projectsRes] = await Promise.all([
        supabase.from("blog_posts")
          .select("slug, title, created_at")
          .eq("published", true)
          .neq("slug", currentSlug)
          .order("created_at", { ascending: false })
          .limit(4),
        supabase.from("projects")
          .select("slug, client_name, image_url, category")
          .eq("published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .limit(4),
      ]);
      setPosts((postsRes.data as RecentPost[]) || []);
      setProjects((projectsRes.data as RecentProject[]) || []);
    })();
  }, [currentSlug]);

  return (
    <aside className="space-y-10">
      {posts.length > 0 && (
        <div>
          <p className="text-[10px] tracking-widest text-muted-foreground mb-4">RECENT POSTS</p>
          <ul className="space-y-4">
            {posts.map(p => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="group block">
                  <p className="text-xs tracking-wider leading-snug group-hover:text-primary transition-colors">
                    {p.title.toUpperCase()}
                  </p>
                  <p className="text-[10px] tracking-widest text-muted-foreground mt-1">
                    {format(new Date(p.created_at), "MMM d, yyyy").toUpperCase()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <p className="text-[10px] tracking-widest text-muted-foreground mb-4">RECENT PROJECTS</p>
          <ul className="space-y-4">
            {projects.map(p => (
              <li key={p.slug}>
                <Link to={`/portfolio/${p.slug}`} className="group flex gap-3 items-center">
                  {p.image_url && (
                    <div className="w-14 h-14 flex-shrink-0 overflow-hidden border border-border">
                      <img
                        src={p.image_url}
                        alt={p.client_name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs tracking-wider leading-snug group-hover:text-primary transition-colors truncate">
                      {p.client_name.toUpperCase()}
                    </p>
                    {p.category && (
                      <p className="text-[10px] tracking-widest text-muted-foreground mt-1 truncate">
                        {p.category.toUpperCase()}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default BlogSidebar;
