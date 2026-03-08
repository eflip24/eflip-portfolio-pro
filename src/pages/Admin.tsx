import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Edit, LogOut, Plus } from "lucide-react";

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  project_url: string | null;
  image_url: string | null;
  created_at: string;
}

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }
    // Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      toast.error("ACCESS DENIED — ADMIN ONLY");
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data || []);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("project-images").upload(path, file);
    if (error) {
      toast.error("IMAGE UPLOAD FAILED");
      return null;
    }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = form.image_url;
    if (imageFile) {
      const url = await uploadImage(imageFile);
      if (url) imageUrl = url;
    }

    const payload = {
      client_name: form.client_name,
      description: form.description,
      category: form.category,
      project_url: form.project_url || null,
      image_url: imageUrl || null,
    };

    if (editId) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editId);
      if (error) toast.error(error.message);
      else toast.success("PROJECT UPDATED");
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) toast.error(error.message);
      else toast.success("PROJECT ADDED");
    }

    setForm(emptyForm);
    setEditId(null);
    setImageFile(null);
    setDialogOpen(false);
    setLoading(false);
    fetchProjects();
  };

  const handleEdit = (p: Project) => {
    setForm({
      client_name: p.client_name,
      description: p.description,
      category: p.category,
      project_url: p.project_url || "",
      image_url: p.image_url || "",
    });
    setEditId(p.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("PROJECT DELETED");
      fetchProjects();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-widest">
            <span className="text-primary">eFLIP</span> ADMIN
          </h1>
          <Button variant="outline" onClick={handleLogout} className="tracking-widest text-xs">
            <LogOut size={14} className="mr-2" /> LOGOUT
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="mb-8 tracking-widest glow-orange"
              onClick={() => { setForm(emptyForm); setEditId(null); setImageFile(null); }}
            >
              <Plus size={14} className="mr-2" /> ADD PROJECT
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="tracking-widest">
                {editId ? "EDIT PROJECT" : "ADD PROJECT"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="CLIENT NAME"
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                className="bg-secondary border-border text-xs tracking-wider"
                required
              />
              <Textarea
                placeholder="DESCRIPTION"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-secondary border-border text-xs tracking-wider"
                required
              />
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="bg-secondary border-border text-xs tracking-wider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">WEB</SelectItem>
                  <SelectItem value="games">GAMES</SelectItem>
                  <SelectItem value="print">PRINT</SelectItem>
                  <SelectItem value="video">VIDEO</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="PROJECT URL (OPTIONAL)"
                value={form.project_url}
                onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                className="bg-secondary border-border text-xs tracking-wider"
              />
              <div>
                <label className="text-xs tracking-widest text-muted-foreground block mb-2">
                  PROJECT IMAGE
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="bg-secondary border-border text-xs"
                />
              </div>
              <Button type="submit" className="w-full tracking-widest glow-orange" disabled={loading}>
                {loading ? "SAVING..." : editId ? "UPDATE" : "ADD PROJECT"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Projects list */}
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border border-border p-4">
              {p.image_url && (
                <img src={p.image_url} alt={p.client_name} className="w-16 h-16 object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold tracking-widest text-sm">{p.client_name.toUpperCase()}</h3>
                <p className="text-muted-foreground text-xs tracking-wider truncate">{p.category.toUpperCase()}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
                <Edit size={14} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-muted-foreground text-xs tracking-widest py-12">
              NO PROJECTS YET. ADD YOUR FIRST ONE.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
