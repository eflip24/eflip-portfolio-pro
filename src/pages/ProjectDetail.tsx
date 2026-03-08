import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  project_url: string | null;
  image_url: string | null;
  created_at: string;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      setProject(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground tracking-widest">
          LOADING...
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <p className="text-muted-foreground tracking-widest">PROJECT NOT FOUND</p>
          <Button asChild variant="outline">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2" size={16} /> BACK TO PORTFOLIO
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/portfolio"
              className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2" size={14} /> BACK TO PORTFOLIO
            </Link>

            <Badge variant="outline" className="text-primary border-primary mb-4 text-[10px] tracking-widest">
              {project.category.toUpperCase()}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-widest mb-6">
              {project.client_name.toUpperCase()}
            </h1>

            {project.image_url && (
              <div className="aspect-video overflow-hidden border border-border mb-8">
                <img
                  src={project.image_url}
                  alt={project.client_name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-muted-foreground leading-relaxed tracking-wider mb-8 text-sm">
              {project.description}
            </p>

            {project.project_url && (
              <Button asChild className="glow-orange tracking-widest">
                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                  VIEW LIVE PROJECT <ExternalLink className="ml-2" size={14} />
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
