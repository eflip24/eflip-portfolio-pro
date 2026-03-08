import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  project_url: string | null;
  image_url: string | null;
  created_at: string;
}

const categories = ["ALL", "WEB", "GAMES", "PRINT", "VIDEO"];

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filtered = filter === "ALL"
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === filter);

  return (
    <Layout>
      <SEOHead title="Portfolio" description="Explore eFlip's portfolio of bold websites, games, print designs, and video productions." />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-widest text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            OUR <span className="text-primary">WORK</span>
          </motion.h1>
          <p className="text-center text-muted-foreground tracking-wider mb-12 text-sm">
            PROJECTS THAT SPEAK FOR THEMSELVES
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-16 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs tracking-widest border transition-all ${
                  filter === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground tracking-wider">LOADING...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground tracking-wider">
              NO PROJECTS YET. CHECK BACK SOON.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <Link to={`/portfolio/${project.id}`}>
                    <motion.div
                      className="group relative overflow-hidden border border-border bg-card"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video bg-secondary overflow-hidden">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.client_name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs tracking-widest">
                            NO IMAGE
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <Badge variant="outline" className="text-primary border-primary mb-3 text-[10px] tracking-widest">
                          {project.category.toUpperCase()}
                        </Badge>
                        <h3 className="text-lg font-bold tracking-wider mb-2">
                          {project.client_name.toUpperCase()}
                        </h3>
                        <p className="text-muted-foreground text-xs tracking-wider line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
