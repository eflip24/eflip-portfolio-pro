import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
}

const AdminBlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<BlogForm>({
    title: "", slug: "", excerpt: "", content: "", cover_image: "", published: false,
  });

  useEffect(() => {
    checkAuth();
    if (!isNew) fetchPost();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { toast.error("ACCESS DENIED"); navigate("/login"); }
  };

  const fetchPost = async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
    if (!data) { navigate("/admin"); return; }
    setForm({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      cover_image: data.cover_image || "",
      published: data.published,
    });
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const uploadImage = async (file: File): Promise<string | null> => {
    const path = `blog/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage.from("project-images").upload(path, file);
    if (error) { toast.error("UPLOAD FAILED"); return null; }
    return supabase.storage.from("project-images").getPublicUrl(path).data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("TITLE AND SLUG REQUIRED"); return; }
    setSaving(true);
    let coverUrl = form.cover_image;
    if (imageFile) { const u = await uploadImage(imageFile); if (u) coverUrl = u; }

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image: coverUrl || null,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    if (isNew) {
      const { data, error } = await supabase.from("blog_posts").insert(payload).select("id").single();
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("POST CREATED");
      navigate(`/admin/blog/${data.id}`);
    } else {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", id!);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("POST SAVED");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground tracking-widest">
        LOADING...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <Link to="/admin" className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2" size={14} /> BACK TO ADMIN
        </Link>

        <h1 className="text-2xl font-bold tracking-widest mb-8">
          {isNew ? "NEW" : "EDIT"} <span className="text-primary">BLOG POST</span>
        </h1>

        <div className="space-y-6 border border-border p-6">
          <Input
            placeholder="POST TITLE"
            value={form.title}
            onChange={e => {
              const title = e.target.value;
              setForm(f => ({ ...f, title, slug: isNew ? generateSlug(title) : f.slug }));
            }}
            className="bg-secondary border-border text-xs tracking-wider"
          />
          <Input
            placeholder="SLUG"
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="bg-secondary border-border text-xs tracking-wider"
          />
          <Textarea
            placeholder="EXCERPT (SHORT SUMMARY)"
            value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            className="bg-secondary border-border text-xs tracking-wider"
            rows={3}
          />
          <Textarea
            placeholder="HTML CONTENT..."
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="bg-secondary border-border text-xs tracking-wider font-mono"
            rows={16}
          />
          <div>
            <label className="text-xs tracking-widest text-muted-foreground block mb-2">COVER IMAGE</label>
            <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="bg-secondary border-border text-xs" />
            {form.cover_image && <img src={form.cover_image} alt="Cover" className="mt-2 h-20 object-cover border border-border" />}
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={v => setForm({ ...form, published: v })} />
            <span className="text-xs tracking-widest text-muted-foreground">
              {form.published ? "PUBLISHED" : "DRAFT"}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={saving} className="glow-orange tracking-widest">
            <Save size={14} className="mr-2" /> {saving ? "SAVING..." : "SAVE POST"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEdit;
