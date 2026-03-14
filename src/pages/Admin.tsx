import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, Layers, Mail, FileText, BarChart3 } from "lucide-react";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminInquiries from "@/components/admin/AdminInquiries";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import SEOHead from "@/components/SEOHead";

const CATEGORIES = ["Web", "Games", "Print", "Video"];

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  project_url: string | null;
  image_url: string | null;
  tags: string[] | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchProjects();
    fetchInquiryCount();
    fetchBlogCount();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/login"); return; }
    const { data: roles } = await supabase
      .from("user_roles").select("role")
      .eq("user_id", session.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      toast.error("ACCESS DENIED — ADMIN ONLY");
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects").select("*").order("created_at", { ascending: false });
    setProjects((data as Project[]) || []);
  };

  const fetchInquiryCount = async () => {
    const { count } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");
    setInquiryCount(count || 0);
  };

  const fetchBlogCount = async () => {
    const { count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true });
    setBlogCount(count || 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const countByCategory = (cat: string) =>
    projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <SEOHead title="Admin Dashboard" noindex />
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-widest">
            <span className="text-primary">eFLIP</span> ADMIN
          </h1>
          <Button variant="outline" onClick={handleLogout} className="tracking-widest text-xs">
            <LogOut size={14} className="mr-2" /> LOGOUT
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          <Card className="border-primary/30">
            <CardContent className="p-4 flex items-center gap-3">
              <Layers size={20} className="text-primary" />
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-xs text-muted-foreground tracking-widest">TOTAL</p>
              </div>
            </CardContent>
          </Card>
          {CATEGORIES.map((cat) => (
            <Card key={cat}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{countByCategory(cat)}</p>
                <p className="text-xs text-muted-foreground tracking-widest">{cat.toUpperCase()}</p>
              </CardContent>
            </Card>
          ))}
          <Card className={inquiryCount > 0 ? "border-primary/30" : ""}>
            <CardContent className="p-4 flex items-center gap-3">
              <Mail size={20} className={inquiryCount > 0 ? "text-primary" : "text-muted-foreground"} />
              <div>
                <p className="text-2xl font-bold">{inquiryCount}</p>
                <p className="text-xs text-muted-foreground tracking-widest">NEW</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <FileText size={20} className="text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{blogCount}</p>
                <p className="text-xs text-muted-foreground tracking-widest">POSTS</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects">
          <TabsList className="tracking-widest">
            <TabsTrigger value="projects" className="tracking-widest text-xs">PROJECTS</TabsTrigger>
            <TabsTrigger value="inquiries" className="tracking-widest text-xs relative">
              INQUIRIES
              {inquiryCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                  {inquiryCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="blog" className="tracking-widest text-xs">BLOG</TabsTrigger>
            <TabsTrigger value="analytics" className="tracking-widest text-xs">
              <BarChart3 size={12} className="mr-1" /> ANALYTICS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6">
            <AdminProjects projects={projects} onRefresh={fetchProjects} />
          </TabsContent>
          <TabsContent value="inquiries" className="mt-6">
            <AdminInquiries />
          </TabsContent>
          <TabsContent value="blog" className="mt-6">
            <AdminBlog />
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
