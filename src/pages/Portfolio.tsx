import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import ProjectSkeleton from "@/components/ProjectSkeleton";

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

const categoryDescriptions: Record<string, string> = {
  ALL: "A SHOWCASE OF OUR FINEST WORK ACROSS ALL DISCIPLINES",
  WEB: "BOLD, IMMERSIVE WEBSITES BUILT TO CAPTIVATE AND CONVERT",
  GAMES: "SHORT, SHARP SHOCKS TO PROMOTE GAME LAUNCHES AND GAMING BRANDS",
  PRINT: "TACTILE DESIGN THAT DEMANDS ATTENTION IN THE PHYSICAL WORLD",
  VIDEO: "CINEMATIC PRODUCTIONS THAT TELL STORIES WORTH WATCHING",
};

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
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
            className="text-5xl md:text-7xl font-bold tracking-widest text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            OUR <span className="text-primary">WORK</span>
          </motion.h1>
          <p className="text-center text-muted-foreground tracking-wider mb-12 text-base">
            {categoryDescriptions[filter]}
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn px-6 py-3 text-sm tracking-widest transition-colors ${
                  filter === cat
                    ? "active text-primary-foreground"
                    : "text-muted-foreground hover:text-primary-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground tracking-wider text-base">
              NO PROJECTS YET. CHECK BACK SOON.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.08}>
                  <Link to={`/portfolio/${project.id}`}>
                    <motion.div
                      className="group relative overflow-hidden bg-card project-card"
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
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm tracking-widest">
                            NO IMAGE
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <Badge variant="outline" className="text-primary border-primary mb-3 text-[10px] tracking-widest">
                          {project.category.toUpperCase()}
                        </Badge>
                        <h3 className="text-base font-bold tracking-wider mb-2">
                          {project.client_name.toUpperCase()}
                        </h3>
                        <p className="text-muted-foreground text-sm tracking-wider line-clamp-2">
                          {project.description}
                        </p>
                      </div>
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
