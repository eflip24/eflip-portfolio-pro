import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye, TrendingUp, Calendar } from "lucide-react";
import { subDays, startOfDay } from "date-fns";

const COLORS = ["hsl(24,100%,50%)", "hsl(24,100%,65%)", "hsl(0,0%,40%)", "hsl(0,0%,55%)"];

interface ViewRow {
  page_path: string;
  project_id: string | null;
  created_at: string;
}

const AdminAnalytics = () => {
  const [views, setViews] = useState<ViewRow[]>([]);
  const [projectNames, setProjectNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: viewData }, { data: projects }] = await Promise.all([
        supabase.from("page_views").select("page_path, project_id, created_at").order("created_at", { ascending: false }).limit(1000),
        supabase.from("projects").select("id, client_name, category"),
      ]);
      setViews(viewData || []);
      const names: Record<string, string> = {};
      const cats: Record<string, string> = {};
      (projects || []).forEach((p: any) => { names[p.id] = p.client_name; cats[p.id] = p.category; });
      setProjectNames(names);
      setLoading(false);
    };
    fetchData();
  }, []);

  const now = new Date();
  const weekAgo = startOfDay(subDays(now, 7));
  const monthAgo = startOfDay(subDays(now, 30));

  const totalViews = views.length;
  const weekViews = views.filter(v => new Date(v.created_at) >= weekAgo).length;
  const monthViews = views.filter(v => new Date(v.created_at) >= monthAgo).length;

  // Top projects by views
  const projectViewCounts: Record<string, number> = {};
  views.forEach(v => {
    if (v.project_id) projectViewCounts[v.project_id] = (projectViewCounts[v.project_id] || 0) + 1;
  });
  const topProjects = Object.entries(projectViewCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([id, count]) => ({ name: (projectNames[id] || id).slice(0, 15), views: count }));

  // Category breakdown from page paths
  const catCounts: Record<string, number> = {};
  views.forEach(v => {
    const match = v.page_path.match(/^\/(portfolio|blog|services|about|contact)\/?/);
    const page = match ? match[1].toUpperCase() : "HOME";
    catCounts[page] = (catCounts[page] || 0) + 1;
  });
  const pageBreakdown = Object.entries(catCounts).map(([name, value]) => ({ name, value }));

  if (loading) {
    return <p className="text-muted-foreground tracking-widest text-sm">LOADING ANALYTICS...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/30">
          <CardContent className="p-4 flex items-center gap-3">
            <Eye size={20} className="text-primary" />
            <div>
              <p className="text-2xl font-bold">{totalViews}</p>
              <p className="text-xs text-muted-foreground tracking-widest">TOTAL VIEWS</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp size={20} className="text-primary" />
            <div>
              <p className="text-2xl font-bold">{weekViews}</p>
              <p className="text-xs text-muted-foreground tracking-widest">THIS WEEK</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar size={20} className="text-primary" />
            <div>
              <p className="text-2xl font-bold">{monthViews}</p>
              <p className="text-xs text-muted-foreground tracking-widest">THIS MONTH</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {topProjects.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-6">MOST VIEWED PROJECTS</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProjects} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(0,0%,55%)" }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10, fill: "hsl(0,0%,55%)" }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(0,0%,8%)", border: "1px solid hsl(0,0%,18%)", fontSize: 12 }}
                    labelStyle={{ color: "hsl(0,0%,95%)" }}
                  />
                  <Bar dataKey="views" fill="hsl(24,100%,50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {pageBreakdown.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-6">PAGE POPULARITY</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pageBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {pageBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "hsl(0,0%,8%)", border: "1px solid hsl(0,0%,18%)", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
