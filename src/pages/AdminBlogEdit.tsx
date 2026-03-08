import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { ArrowLeft, Save, ChevronDown, X, Search } from "lucide-react";

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
  author: string;
  tags: string[];
  read_time: number;
  seo_title: string;
  seo_description: string;
  seo_image: string;
}

const AdminBlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [seoImageFile, setSeoImageFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [seoOpen, setSeoOpen] = useState(false);
  const [form, setForm] = useState<BlogForm>({
    title: "", slug: "", excerpt: "", content: "", cover_image: "", published: false,
    author: "", tags: [], read_time: 1, seo_title: "", seo_description: "", seo_image: "",
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
      author: data.author || "",
      tags: data.tags || [],
      read_time: data.read_time || estimateReadTime(data.content),
      seo_title: data.seo_title || "",
      seo_description: data.seo_description || "",
      seo_image: data.seo_image || "",
    });
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const estimateReadTime = (text: string) => {
    const words = text.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const path = `blog/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage.from("project-images").upload(path, file);
    if (error) { toast.error("UPLOAD FAILED"); return null; }
    return supabase.storage.from("project-images").getPublicUrl(path).data.publicUrl;
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm(f => ({ ...f, tags: [...f.tags, tag] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  };

  const handleContentChange = (content: string) => {
    setForm(f => ({ ...f, content, read_time: estimateReadTime(content) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("TITLE AND SLUG REQUIRED"); return; }
    setSaving(true);

    let coverUrl = form.cover_image;
    let seoImgUrl = form.seo_image;
    if (imageFile) { const u = await uploadImage(imageFile); if (u) coverUrl = u; }
    if (seoImageFile) { const u = await uploadImage(seoImageFile); if (u) seoImgUrl = u; }

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image: coverUrl || null,
      published: form.published,
      author: form.author || null,
      tags: form.tags.length > 0 ? form.tags : null,
      read_time: form.read_time,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      seo_image: seoImgUrl || null,
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

  const seoTitle = form.seo_title || form.title || "Post Title";
  const seoDesc = form.seo_description || form.excerpt || "Post description will appear here...";
  const seoUrl = `eflip.ie/blog/${form.slug || "post-slug"}`;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <Link to="/admin" className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2" size={14} /> BACK TO ADMIN
        </Link>

        <h1 className="text-2xl font-bold tracking-widest mb-8">
          {isNew ? "NEW" : "EDIT"} <span className="text-primary">BLOG POST</span>
        </h1>

        {/* CONTENT SECTION */}
        <div className="space-y-4 border border-border p-6 mb-4">
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground mb-2">CONTENT</h2>
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
          <Input
            placeholder="AUTHOR NAME"
            value={form.author}
            onChange={e => setForm({ ...form, author: e.target.value })}
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
            onChange={e => handleContentChange(e.target.value)}
            className="bg-secondary border-border text-xs tracking-wider font-mono"
            rows={16}
          />
          <div>
            <label className="text-xs tracking-widest text-muted-foreground block mb-2">COVER IMAGE</label>
            <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="bg-secondary border-border text-xs" />
            {form.cover_image && <img src={form.cover_image} alt="Cover" className="mt-2 h-20 object-cover border border-border" />}
          </div>
        </div>

        {/* TAGS SECTION */}
        <div className="border border-border p-6 mb-4">
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground mb-3">TAGS</h2>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="ADD TAG..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="bg-secondary border-border text-xs tracking-wider flex-1"
            />
            <Button variant="outline" size="sm" onClick={addTag} className="text-xs tracking-widest">ADD</Button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-[10px] tracking-widest gap-1">
                  {tag.toUpperCase()}
                  <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                    <X size={10} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* SEO SECTION */}
        <Collapsible open={seoOpen} onOpenChange={setSeoOpen} className="border border-border mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left">
            <div className="flex items-center gap-2">
              <Search size={14} className="text-primary" />
              <h2 className="text-xs font-bold tracking-widest text-muted-foreground">SEO SETTINGS</h2>
            </div>
            <ChevronDown size={14} className={`text-muted-foreground transition-transform ${seoOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-6 space-y-4">
            <Input
              placeholder="SEO TITLE (DEFAULTS TO POST TITLE)"
              value={form.seo_title}
              onChange={e => setForm({ ...form, seo_title: e.target.value })}
              className="bg-secondary border-border text-xs tracking-wider"
            />
            <Textarea
              placeholder="SEO DESCRIPTION (DEFAULTS TO EXCERPT)"
              value={form.seo_description}
              onChange={e => setForm({ ...form, seo_description: e.target.value })}
              className="bg-secondary border-border text-xs tracking-wider"
              rows={2}
            />
            <div>
              <label className="text-xs tracking-widest text-muted-foreground block mb-2">OG IMAGE (DEFAULTS TO COVER)</label>
              <Input type="file" accept="image/*" onChange={e => setSeoImageFile(e.target.files?.[0] || null)} className="bg-secondary border-border text-xs" />
              {form.seo_image && <img src={form.seo_image} alt="OG" className="mt-2 h-16 object-cover border border-border" />}
            </div>

            {/* Google Preview */}
            <div className="border border-border bg-card p-4 rounded-sm">
              <p className="text-[10px] text-muted-foreground tracking-widest mb-2">SEARCH PREVIEW</p>
              <p className="text-sm text-primary truncate">{seoTitle}</p>
              <p className="text-xs text-primary/70 truncate">{seoUrl}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{seoDesc}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* PUBLISHING SECTION */}
        <div className="border border-border p-6 mb-6">
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground mb-4">PUBLISHING</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={v => setForm({ ...form, published: v })} />
              <span className="text-xs tracking-widest text-muted-foreground">
                {form.published ? "PUBLISHED" : "DRAFT"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground tracking-widest">READ TIME:</span>
              <Input
                type="number"
                min={1}
                value={form.read_time}
                onChange={e => setForm({ ...form, read_time: parseInt(e.target.value) || 1 })}
                className="bg-secondary border-border text-xs tracking-wider w-16 h-8"
              />
              <span className="text-[10px] text-muted-foreground tracking-widest">MIN</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="glow-orange tracking-widest">
            <Save size={14} className="mr-2" /> {saving ? "SAVING..." : "SAVE POST"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEdit;
