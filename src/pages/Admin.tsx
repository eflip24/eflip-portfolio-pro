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

        <Button
          className="mb-8 tracking-widest glow-orange"
          onClick={() => navigate("/admin/project/new")}
        >
          <Plus size={14} className="mr-2" /> ADD PROJECT
        </Button>

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
