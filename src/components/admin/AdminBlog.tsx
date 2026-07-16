import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Sparkles, Check, X, Clock, Loader2 } from "lucide-react";
import { format, formatDistanceToNowStrict } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  is_ai_draft: boolean;
  scheduled_publish_at: string | null;
}

interface Topic {
  id: string;
  title: string;
  category: string;
  priority: number;
  status: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const [{ data: p }, { data: t }] = await Promise.all([
      supabase.from("blog_posts")
        .select("id, title, slug, published, created_at, is_ai_draft, scheduled_publish_at")
        .order("created_at", { ascending: false }),
      supabase.from("blog_topics")
        .select("id, title, category, priority, status")
        .order("priority", { ascending: true }),
    ]);
    setPosts((p as BlogPost[]) || []);
    setTopics((t as Topic[]) || []);
  };

  const drafts = posts.filter(p => p.is_ai_draft && !p.published);
  const publishedPosts = posts.filter(p => p.published);
  const otherDrafts = posts.filter(p => !p.is_ai_draft && !p.published);
  const nextQueued = topics.find(t => t.status === "queued");

  const handleDelete = async (id: string) => {
    if (!confirm("DELETE THIS POST?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("POST DELETED");
    fetchAll();
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase.from("blog_posts").update({ published: true }).eq("id", id);
    if (error) { toast.error("PUBLISH FAILED"); return; }
    toast.success("POST PUBLISHED");
    fetchAll();
  };

  const handleReject = async (post: BlogPost) => {
    if (!confirm(`REJECT AND DELETE "${post.title}"?`)) return;
    await supabase.from("blog_posts").delete().eq("id", post.id);
    toast.success("DRAFT REJECTED");
    fetchAll();
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-draft", { body: {} });
      if (error) throw error;
      if ((data as any)?.message === "No queued topics") {
        toast.info("NO QUEUED TOPICS — QUEUE IS EMPTY");
      } else {
        toast.success("NEW DRAFT GENERATED");
      }
      fetchAll();
    } catch (e: any) {
      toast.error(`GENERATION FAILED: ${e?.message || "unknown"}`);
    } finally {
      setGenerating(false);
    }
  };

  const countdown = (iso: string | null) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (d.getTime() < Date.now()) return "AUTO-PUBLISHING SOON";
    return `AUTO-PUBLISHES IN ${formatDistanceToNowStrict(d).toUpperCase()}`;
  };

  return (
    <div className="space-y-8">
      {/* AI Queue Header */}
      <div className="border border-primary/40 bg-primary/5 p-4 space-y-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-primary" />
              <h2 className="text-sm font-bold tracking-widest">AI BLOG PIPELINE</h2>
            </div>
            <p className="text-[10px] text-muted-foreground tracking-widest">
              2 DRAFTS/WEEK · AUTHOR: STEPHEN BRAY · AUTO-PUBLISH AFTER 7 DAYS
            </p>
            {nextQueued && (
              <p className="text-[10px] text-muted-foreground tracking-widest mt-1">
                NEXT UP: {nextQueued.title.toUpperCase()}
              </p>
            )}
          </div>
          <Button onClick={handleGenerate} disabled={generating} className="glow-orange tracking-widest text-xs">
            {generating ? (<><Loader2 size={14} className="mr-2 animate-spin" /> GENERATING...</>) :
              (<><Sparkles size={14} className="mr-2" /> GENERATE NEXT DRAFT</>)}
          </Button>
        </div>
        <div className="flex gap-4 text-[10px] tracking-widest text-muted-foreground">
          <span>QUEUED: {topics.filter(t => t.status === "queued").length}</span>
          <span>DRAFTED: {drafts.length}</span>
          <span>PUBLISHED: {topics.filter(t => t.status === "published").length}</span>
        </div>
      </div>

      {/* AI Drafts awaiting review */}
      {drafts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest text-muted-foreground">
            AI DRAFTS AWAITING REVIEW ({drafts.length})
          </h3>
          {drafts.map(post => (
            <div key={post.id} className="border border-primary/30 bg-card p-4 space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge className="text-[10px] tracking-widest bg-primary/20 text-primary border-primary/30">
                      <Sparkles size={10} className="mr-1" /> AI DRAFT
                    </Badge>
                    <h3 className="text-sm font-bold tracking-wider">{post.title.toUpperCase()}</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground tracking-widest flex items-center gap-2">
                    <Clock size={10} /> {countdown(post.scheduled_publish_at)}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" onClick={() => handleApprove(post.id)} className="tracking-widest text-[10px] h-8">
                    <Check size={12} className="mr-1" /> APPROVE
                  </Button>
                  <Button asChild variant="outline" size="sm" className="tracking-widest text-[10px] h-8">
                    <Link to={`/admin/blog/${post.id}`}><Edit size={12} className="mr-1" /> EDIT</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleReject(post)} className="tracking-widest text-[10px] h-8">
                    <X size={12} className="mr-1" /> REJECT
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual drafts */}
      {otherDrafts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold tracking-widest text-muted-foreground">
            MANUAL DRAFTS ({otherDrafts.length})
          </h3>
          {otherDrafts.map(post => (
            <PostRow key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Published */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold tracking-widest text-muted-foreground">
            PUBLISHED ({publishedPosts.length})
          </h3>
          <Button asChild variant="outline" className="tracking-widest text-xs h-8">
            <Link to="/admin/blog/new"><Plus size={12} className="mr-2" /> NEW POST</Link>
          </Button>
        </div>
        {publishedPosts.map(post => (
          <PostRow key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

const PostRow = ({ post, onDelete }: { post: BlogPost; onDelete: (id: string) => void }) => (
  <div className="flex items-center justify-between border border-border p-4 bg-card">
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
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onDelete(post.id)}>
        <Trash2 size={14} className="text-destructive" />
      </Button>
    </div>
  </div>
);

export default AdminBlog;
