import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, GripVertical, Eye } from "lucide-react";
import DOMPurify from "dompurify";

interface ProjectForm {
  client_name: string;
  description: string;
  category: string;
  project_url: string;
  button_label: string;
  image_url: string;
  seo_title: string;
  seo_description: string;
  seo_image: string;
  tags: string;
  testimonial: string;
  testimonial_author: string;
}

interface Section {
  id?: string;
  sort_order: number;
  layout: string;
  title: string;
  content_left: string;
  content_right: string;
  image_urls: string[];
  _isNew?: boolean;
}

const emptySection: Section = {
  sort_order: 0,
  layout: "full",
  title: "",
  content_left: "",
  content_right: "",
  image_urls: [],
  _isNew: true,
};

const AdminProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [seoImageFile, setSeoImageFile] = useState<File | null>(null);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>({
    client_name: "", description: "", category: "web", project_url: "",
    image_url: "", seo_title: "", seo_description: "", seo_image: "",
    tags: "", testimonial: "", testimonial_author: "",
  });
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    checkAuth();
    if (!isNew) fetchProject();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      toast.error("ACCESS DENIED");
      navigate("/login");
    }
  };

  const fetchProject = async () => {
    setLoading(true);
    const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();
    if (!project) { navigate("/admin"); return; }
    setForm({
      client_name: project.client_name,
      description: project.description,
      category: project.category,
      project_url: project.project_url || "",
      image_url: project.image_url || "",
      seo_title: (project as any).seo_title || "",
      seo_description: (project as any).seo_description || "",
      seo_image: (project as any).seo_image || "",
      tags: (project as any).tags?.join(", ") || "",
      testimonial: (project as any).testimonial || "",
      testimonial_author: (project as any).testimonial_author || "",
    });
    const { data: secs } = await supabase
      .from("project_sections")
      .select("*")
      .eq("project_id", id!)
      .order("sort_order", { ascending: true });
    setSections((secs || []).map((s: any) => ({ ...s, _isNew: false })));
    setLoading(false);
  };

  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("Canvas not supported")); return; }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) { reject(new Error("Conversion failed")); return; }
              resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: "image/webp" }));
            },
            "image/webp",
            0.85
          );
        };
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const webpFile = await convertToWebP(file);
      const path = `${crypto.randomUUID()}.webp`;
      const { error } = await supabase.storage.from("project-images").upload(path, webpFile);
      if (error) { toast.error("UPLOAD FAILED"); return null; }
      return supabase.storage.from("project-images").getPublicUrl(path).data.publicUrl;
    } catch {
      toast.error("IMAGE CONVERSION FAILED");
      return null;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    let imageUrl = form.image_url;
    let seoImageUrl = form.seo_image;
    if (imageFile) { const u = await uploadImage(imageFile); if (u) imageUrl = u; }
    if (seoImageFile) { const u = await uploadImage(seoImageFile); if (u) seoImageUrl = u; }

    const tagsArr = form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : null;
    const payload: any = {
      client_name: form.client_name,
      description: form.description,
      category: form.category,
      project_url: form.project_url || null,
      image_url: imageUrl || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      seo_image: seoImageUrl || null,
      tags: tagsArr,
      testimonial: form.testimonial || null,
      testimonial_author: form.testimonial_author || null,
    };

    let projectId = id;
    if (isNew) {
      const { data, error } = await supabase.from("projects").insert(payload).select("id").single();
      if (error) { toast.error(error.message); setSaving(false); return; }
      projectId = data.id;
    } else {
      const { error } = await supabase.from("projects").update(payload).eq("id", id!);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }

    // Save sections
    if (!isNew) {
      // Delete removed sections
      const existingIds = sections.filter(s => s.id).map(s => s.id!);
      if (existingIds.length > 0) {
        await supabase.from("project_sections").delete().eq("project_id", projectId!).not("id", "in", `(${existingIds.join(",")})`);
      } else {
        await supabase.from("project_sections").delete().eq("project_id", projectId!);
      }
    }

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const sPayload: any = {
        project_id: projectId,
        sort_order: i,
        layout: s.layout,
        title: s.title || null,
        content_left: s.content_left || null,
        content_right: s.content_right || null,
        image_urls: s.image_urls.length > 0 ? s.image_urls : null,
      };
      if (s.id && !s._isNew) {
        await supabase.from("project_sections").update(sPayload).eq("id", s.id);
      } else {
        await supabase.from("project_sections").insert(sPayload);
      }
    }

    toast.success("PROJECT SAVED");
    setSaving(false);
    if (isNew) navigate(`/admin/project/${projectId}`);
  };

  const addSection = () => {
    setSections([...sections, { ...emptySection, sort_order: sections.length }]);
  };

  const removeSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const updateSection = (idx: number, updates: Partial<Section>) => {
    setSections(sections.map((s, i) => i === idx ? { ...s, ...updates } : s));
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sections.length) return;
    const copy = [...sections];
    [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
    setSections(copy);
  };

  const handleSectionImageUpload = async (idx: number, files: FileList) => {
    const urls: string[] = [...sections[idx].image_urls];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      if (url) urls.push(url);
    }
    updateSection(idx, { image_urls: urls });
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
      <div className="container mx-auto max-w-4xl">
        <Link to="/admin" className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2" size={14} /> BACK TO ADMIN
        </Link>

        <h1 className="text-2xl font-bold tracking-widest mb-8">
          {isNew ? "ADD" : "EDIT"} <span className="text-primary">PROJECT</span>
        </h1>

        <Tabs defaultValue="details">
          <TabsList className="mb-8 bg-secondary">
            <TabsTrigger value="details" className="tracking-widest text-xs">DETAILS & SEO</TabsTrigger>
            <TabsTrigger value="content" className="tracking-widest text-xs">CONTENT BUILDER</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-6 border border-border p-6">
              <h2 className="text-sm font-bold tracking-widest text-primary">PROJECT DETAILS</h2>
              <Input placeholder="CLIENT NAME" value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" required />
              <Textarea placeholder="DESCRIPTION" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" required />
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-secondary border-border text-xs tracking-wider"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">WEB</SelectItem>
                  <SelectItem value="games">GAMES</SelectItem>
                  <SelectItem value="print">PRINT</SelectItem>
                  <SelectItem value="video">VIDEO</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="PROJECT URL (OPTIONAL)" value={form.project_url} onChange={e => setForm({ ...form, project_url: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" />
              <Input placeholder="TAGS (COMMA SEPARATED)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" />
              <div>
                <label className="text-xs tracking-widest text-muted-foreground block mb-2">PROJECT IMAGE</label>
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="bg-secondary border-border text-xs" />
                {form.image_url && <img src={form.image_url} alt="Current" className="mt-2 h-20 object-cover border border-border" />}
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h2 className="text-sm font-bold tracking-widest text-primary mb-4">SEO SETTINGS</h2>
                <div className="space-y-4">
                  <Input placeholder="SEO TITLE (OPTIONAL)" value={form.seo_title} onChange={e => setForm({ ...form, seo_title: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" />
                  <Textarea placeholder="SEO DESCRIPTION (OPTIONAL)" value={form.seo_description} onChange={e => setForm({ ...form, seo_description: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" rows={3} />
                  <div>
                    <label className="text-xs tracking-widest text-muted-foreground block mb-2">OG IMAGE</label>
                    <Input type="file" accept="image/*" onChange={e => setSeoImageFile(e.target.files?.[0] || null)} className="bg-secondary border-border text-xs" />
                    {form.seo_image && <img src={form.seo_image} alt="SEO" className="mt-2 h-20 object-cover border border-border" />}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h2 className="text-sm font-bold tracking-widest text-primary mb-4">TESTIMONIAL</h2>
                <div className="space-y-4">
                  <Textarea placeholder="CLIENT TESTIMONIAL QUOTE" value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" rows={3} />
                  <Input placeholder="TESTIMONIAL AUTHOR" value={form.testimonial_author} onChange={e => setForm({ ...form, testimonial_author: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              {sections.map((section, idx) => (
                <div key={idx} className="border border-border p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GripVertical size={14} className="text-muted-foreground" />
                      <span className="text-xs tracking-widest text-muted-foreground">SECTION {idx + 1}</span>
                      <div className="flex gap-1 ml-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSection(idx, -1)} disabled={idx === 0}>↑</Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSection(idx, 1)} disabled={idx === sections.length - 1}>↓</Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setPreviewIdx(previewIdx === idx ? null : idx)}>
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeSection(idx)}>
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Select value={section.layout} onValueChange={v => updateSection(idx, { layout: v })}>
                      <SelectTrigger className="bg-secondary border-border text-xs tracking-wider"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">FULL WIDTH</SelectItem>
                        <SelectItem value="two-column">TWO COLUMN</SelectItem>
                        <SelectItem value="gallery">GALLERY</SelectItem>
                        <SelectItem value="code-showcase">CODE SHOWCASE</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="SECTION TITLE (OPTIONAL)" value={section.title} onChange={e => updateSection(idx, { title: e.target.value })} className="bg-secondary border-border text-xs tracking-wider" />
                  </div>

                  {(section.layout === "full" || section.layout === "code-showcase") && (
                    <Textarea
                      placeholder={section.layout === "code-showcase" ? "HTML/CSS CODE..." : "HTML CONTENT..."}
                      value={section.content_left}
                      onChange={e => updateSection(idx, { content_left: e.target.value })}
                      className="bg-secondary border-border text-xs tracking-wider font-mono"
                      rows={8}
                    />
                  )}

                  {section.layout === "two-column" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Textarea placeholder="LEFT COLUMN HTML..." value={section.content_left} onChange={e => updateSection(idx, { content_left: e.target.value })} className="bg-secondary border-border text-xs tracking-wider font-mono" rows={8} />
                      <Textarea placeholder="RIGHT COLUMN HTML..." value={section.content_right} onChange={e => updateSection(idx, { content_right: e.target.value })} className="bg-secondary border-border text-xs tracking-wider font-mono" rows={8} />
                    </div>
                  )}

                  {section.layout === "gallery" && (
                    <div>
                      <Input type="file" accept="image/*" multiple onChange={e => e.target.files && handleSectionImageUpload(idx, e.target.files)} className="bg-secondary border-border text-xs mb-4" />
                      {section.image_urls.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {section.image_urls.map((url, imgIdx) => (
                            <div key={imgIdx} className="relative group">
                              <img src={url} alt="" className="w-full h-20 object-cover border border-border" />
                              <button
                                onClick={() => updateSection(idx, { image_urls: section.image_urls.filter((_, i) => i !== imgIdx) })}
                                className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* HTML Preview */}
                  {previewIdx === idx && section.content_left && (
                    <div className="mt-4 border border-primary/30 p-4">
                      <p className="text-[10px] tracking-widest text-primary mb-2">PREVIEW</p>
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content_left) }} className="prose prose-invert prose-sm max-w-none" />
                    </div>
                  )}
                </div>
              ))}

              <Button variant="outline" onClick={addSection} className="w-full tracking-widest text-xs border-dashed">
                <Plus size={14} className="mr-2" /> ADD SECTION
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex gap-4">
          <Button onClick={handleSave} className="glow-orange tracking-widest" disabled={saving}>
            {saving ? "SAVING..." : "SAVE PROJECT"}
          </Button>
          <Button variant="outline" asChild className="tracking-widest text-xs">
            <Link to="/admin">CANCEL</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectEdit;
