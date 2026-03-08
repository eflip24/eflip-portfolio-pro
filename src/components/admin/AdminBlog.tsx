import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, created_at")
      .order("created_at", { ascending: false });
    setPosts(data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("DELETE THIS POST?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("POST DELETED");
    fetchPosts();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold tracking-widest text-muted-foreground">
          {posts.length} POST{posts.length !== 1 ? "S" : ""}
        </h2>
        <Button asChild className="glow-orange tracking-widest text-xs">
          <Link to="/admin/blog/new"><Plus size={14} className="mr-2" /> NEW POST</Link>
        </Button>
      </div>

      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between border border-border p-4 bg-card">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold tracking-wider truncate">{post.title.toUpperCase()}</h3>
                <Badge variant={post.published ? "default" : "secondary"} className="text-[10px] tracking-widest shrink-0">
                  {post.published ? "PUBLISHED" : "DRAFT"}
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground tracking-widest">
                {format(new Date(post.created_at), "MMM d, yyyy").toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <Button asChild variant="outline" size="icon" className="h-8 w-8">
                <Link to={`/admin/blog/${post.id}`}><Edit size={14} /></Link>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDelete(post.id)}>
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
