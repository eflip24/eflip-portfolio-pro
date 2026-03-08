import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectDetailSkeleton from "@/components/ProjectDetailSkeleton";
import DOMPurify from "dompurify";

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  project_url: string | null;
  image_url: string | null;
  created_at: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  tags: string[] | null;
  testimonial: string | null;
  testimonial_author: string | null;
  button_label: string | null;
}

interface Section {
  id: string;
  sort_order: number;
  layout: string;
  title: string | null;
  content_left: string | null;
  content_right: string | null;
  image_urls: string[] | null;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [prevNext, setPrevNext] = useState<{ prev: string | null; next: string | null }>({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();
      setProject(data as any);

      // Track page view (fire-and-forget)
      supabase.from("page_views").insert({ page_path: `/portfolio/${id}`, project_id: id }).then(() => {});

      if (data) {
        const [{ data: secs }, { data: allProjects }, { data: related }] = await Promise.all([
          supabase
            .from("project_sections")
            .select("*")
            .eq("project_id", id!)
            .order("sort_order", { ascending: true }),
          supabase
            .from("projects")
            .select("id, created_at")
            .eq("published", true)
            .order("created_at", { ascending: false }),
          supabase
            .from("projects")
            .select("*")
            .eq("category", (data as any).category)
            .eq("published", true)
            .neq("id", id!)
            .limit(3),
        ]);

        setSections((secs as any) || []);
        setRelatedProjects((related as any) || []);

        if (allProjects) {
          const idx = allProjects.findIndex((p: any) => p.id === id);
          setPrevNext({
            prev: idx > 0 ? allProjects[idx - 1].id : null,
            next: idx < allProjects.length - 1 ? allProjects[idx + 1].id : null,
          });
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <ProjectDetailSkeleton />
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

  const renderSection = (section: Section) => {
    switch (section.layout) {
      case "full":
        return (
          <div key={section.id} className="mb-12">
            {section.title && <h2 className="text-2xl font-bold tracking-widest mb-6">{section.title.toUpperCase()}</h2>}
            {section.content_left && (
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content_left) }}
                className="prose prose-invert prose-sm max-w-none text-muted-foreground tracking-wider"
              />
            )}
          </div>
        );
      case "two-column":
        return (
          <div key={section.id} className="mb-12">
            {section.title && <h2 className="text-2xl font-bold tracking-widest mb-6">{section.title.toUpperCase()}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.content_left && (
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content_left) }}
                  className="prose prose-invert prose-sm max-w-none text-muted-foreground tracking-wider"
                />
              )}
              {section.content_right && (
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content_right) }}
                  className="prose prose-invert prose-sm max-w-none text-muted-foreground tracking-wider"
                />
              )}
            </div>
          </div>
        );
      case "gallery":
        return (
          <div key={section.id} className="mb-12">
            {section.title && <h2 className="text-2xl font-bold tracking-widest mb-6">{section.title.toUpperCase()}</h2>}
            {section.image_urls && section.image_urls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.image_urls.map((url, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square overflow-hidden border border-border cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightbox(url)}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        );
      case "code-showcase":
        return (
          <div key={section.id} className="mb-12">
            {section.title && <h2 className="text-2xl font-bold tracking-widest mb-6">{section.title.toUpperCase()}</h2>}
            {section.content_left && (
              <div className="bg-secondary border border-border p-6 overflow-hidden">
                <iframe
                  srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;background:#1a1a2e;color:#e0e0e0;font-family:monospace;padding:16px;}</style></head><body>${DOMPurify.sanitize(section.content_left)}</body></html>`}
                  className="w-full min-h-[300px] border-0"
                  sandbox="allow-scripts"
                  title="Code showcase"
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <SEOHead
        title={project.seo_title || project.client_name}
        description={project.seo_description || project.description}
        image={project.seo_image || project.image_url || undefined}
      />

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      )}

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/portfolio"
              className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2" size={14} /> BACK TO PORTFOLIO
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-primary border-primary text-[10px] tracking-widest">
                {project.category.toUpperCase()}
              </Badge>
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] tracking-widest">
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-widest mb-6">
              {project.client_name.toUpperCase()}
            </h1>

            {project.image_url && (
              <div className="aspect-video overflow-hidden border border-border mb-8">
                <img src={project.image_url} alt={project.client_name} loading="lazy" className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-muted-foreground leading-relaxed tracking-wider mb-8 text-sm">
              {project.description}
            </p>

            {project.project_url && (
              <Button asChild className="glow-orange tracking-widest mb-12">
                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                  {project.button_label || "VIEW LIVE PROJECT"} <ExternalLink className="ml-2" size={14} />
                </a>
              </Button>
            )}

            {sections.length > 0 && (
              <div className="mt-12 border-t border-border pt-12">
                {sections.map(renderSection)}
              </div>
            )}

            {project.testimonial && (
              <div className="mt-12 border border-primary/20 p-8 relative">
                <Quote className="text-primary/30 absolute top-4 left-4" size={32} />
                <blockquote className="text-muted-foreground italic tracking-wider text-sm pl-10">
                  "{project.testimonial}"
                </blockquote>
                {project.testimonial_author && (
                  <p className="text-primary text-xs tracking-widest mt-4 pl-10">
                    — {project.testimonial_author.toUpperCase()}
                  </p>
                )}
              </div>
            )}

            {/* Prev/Next Navigation */}
            <div className="mt-16 flex justify-between border-t border-border pt-8">
              {prevNext.prev ? (
                <Button asChild variant="outline" className="tracking-widest text-xs">
                  <Link to={`/portfolio/${prevNext.prev}`}>
                    <ArrowLeft className="mr-2" size={14} /> PREVIOUS PROJECT
                  </Link>
                </Button>
              ) : <div />}
              {prevNext.next ? (
                <Button asChild variant="outline" className="tracking-widest text-xs">
                  <Link to={`/portfolio/${prevNext.next}`}>
                    NEXT PROJECT <ArrowRight className="ml-2" size={14} />
                  </Link>
                </Button>
              ) : <div />}
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="mt-16 border-t border-border pt-12">
                <h2 className="text-2xl font-bold tracking-widest mb-8">
                  RELATED <span className="text-primary">PROJECTS</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProjects.map((rp) => (
                    <Link key={rp.id} to={`/portfolio/${rp.id}`}>
                      <motion.div
                        className="group overflow-hidden bg-card border border-border"
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="aspect-video bg-secondary overflow-hidden">
                          {rp.image_url ? (
                            <img
                              src={rp.image_url}
                              alt={rp.client_name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs tracking-widest">
                              NO IMAGE
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <Badge variant="outline" className="text-primary border-primary mb-2 text-[10px] tracking-widest">
                            {rp.category.toUpperCase()}
                          </Badge>
                          <h3 className="text-sm font-bold tracking-wider">
                            {rp.client_name.toUpperCase()}
                          </h3>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
