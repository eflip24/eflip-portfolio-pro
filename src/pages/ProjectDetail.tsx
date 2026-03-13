import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Quote, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectDetailSkeleton from "@/components/ProjectDetailSkeleton";
import DOMPurify from "dompurify";

interface Project {
  id: string;
  slug: string;
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
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [prevNext, setPrevNext] = useState<{ prev: string | null; next: string | null }>({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
      setProject(data as any);

      if (data) {
        supabase.from("page_views").insert({ page_path: `/portfolio/${slug}`, project_id: (data as any).id }).then(() => {});
      }

      if (data) {
        const projectData = data as any;
        const [{ data: secs }, { data: allProjects }, { data: related }] = await Promise.all([
          supabase
            .from("project_sections")
            .select("*")
            .eq("project_id", projectData.id)
            .order("sort_order", { ascending: true }),
          supabase
            .from("projects")
            .select("id, slug, created_at")
            .eq("published", true)
            .order("created_at", { ascending: false }),
          supabase
            .from("projects")
            .select("*")
            .eq("category", projectData.category)
            .eq("published", true)
            .neq("id", projectData.id)
            .limit(4),
        ]);

        setSections((secs as any) || []);
        setRelatedProjects((related as any) || []);

        if (allProjects) {
          const idx = allProjects.findIndex((p: any) => p.id === projectData.id);
          setPrevNext({
            prev: idx > 0 ? allProjects[idx - 1].slug : null,
            next: idx < allProjects.length - 1 ? allProjects[idx + 1].slug : null,
          });
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <Layout><ProjectDetailSkeleton /></Layout>;
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <p className="text-muted-foreground tracking-widest">PROJECT NOT FOUND</p>
          <Button asChild variant="outline">
            <Link to="/portfolio"><ArrowLeft className="mr-2" size={16} /> BACK TO PORTFOLIO</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const seoTitle = project.seo_title || project.client_name;
  const seoDesc = project.seo_description || project.description;
  const seoImg = project.seo_image || project.image_url || undefined;

  // Collect all gallery images from sections
  const galleryImages = sections
    .filter((s) => s.layout === "gallery" && s.image_urls?.length)
    .flatMap((s) => s.image_urls || []);

  // Text sections for details
  const textSections = sections.filter((s) => s.layout === "full" || s.layout === "two-column" || s.layout === "code-showcase");

  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        image={seoImg}
        keywords={project.tags?.join(", ") || `${project.category} design, eFlip, ${project.client_name}`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.client_name,
            "description": project.description,
            "image": project.image_url || undefined,
            "url": `https://eflip.ie/portfolio/${project.slug}`,
            "creator": { "@type": "Organization", "name": "eFlip", "url": "https://eflip.ie" },
            "dateCreated": project.created_at,
            "genre": project.category,
            "keywords": project.tags?.join(", ") || project.category,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://eflip.ie/portfolio" },
              { "@type": "ListItem", "position": 3, "name": project.client_name, "item": `https://eflip.ie/portfolio/${project.slug}` }
            ]
          }
        ]}
      />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4 md:p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      )}

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

            {/* Top bar: Back + Nav + Visit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <Link
                to="/portfolio"
                className="inline-flex items-center text-muted-foreground text-xs tracking-widest hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2" size={14} /> BACK
              </Link>

              <div className="flex items-center gap-2">
                {prevNext.prev && (
                  <Button asChild variant="outline" size="sm" className="tracking-widest text-[10px] h-8 px-3">
                    <Link to={`/portfolio/${prevNext.prev}`}>
                      <ArrowLeft size={12} className="mr-1" /> PREV
                    </Link>
                  </Button>
                )}
                {prevNext.next && (
                  <Button asChild variant="outline" size="sm" className="tracking-widest text-[10px] h-8 px-3">
                    <Link to={`/portfolio/${prevNext.next}`}>
                      NEXT <ArrowRight size={12} className="ml-1" />
                    </Link>
                  </Button>
                )}
                {project.project_url && (
                  <Button asChild size="sm" className="glow-orange tracking-widest text-[10px] h-8 px-4">
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      {project.button_label || "VISIT SITE"} <ExternalLink className="ml-1" size={12} />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-widest mb-6 leading-tight">
              {project.client_name.toUpperCase()}
            </h1>

            {/* Metadata row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 border-y border-border py-4 mb-8 md:mb-12">
              <MetaField label="CLIENT" value={project.client_name} />
              <MetaField label="TYPE" value={project.category} />
              {project.tags && project.tags.length > 0 && (
                <MetaField label="PLATFORM" value={project.tags[0]} />
              )}
              {project.tags && project.tags.length > 1 && (
                <MetaField label="DISCIPLINES" value={project.tags.slice(1).join(", ")} />
              )}
              <MetaField label="YEAR" value={new Date(project.created_at).getFullYear().toString()} />
            </div>

            {/* Two-column layout: Content + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-12">

              {/* Left: Main content */}
              <div>
                {/* Hero image */}
                {project.image_url && (
                  <div
                    className="aspect-video overflow-hidden border border-border mb-6 cursor-pointer"
                    onClick={() => setLightbox(project.image_url!)}
                  >
                    <img
                      src={project.image_url}
                      alt={project.client_name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed tracking-wider text-sm md:text-base mb-8">
                  {project.description}
                </p>

                {/* Gallery images */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
                    {galleryImages.map((url, i) => (
                      <div
                        key={i}
                        className="aspect-square overflow-hidden border border-border cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => setLightbox(url)}
                      >
                        <img src={url} alt="" loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Details accordion */}
                {textSections.length > 0 && (
                  <div className="border border-border mb-8">
                    <button
                      onClick={() => setDetailsOpen(!detailsOpen)}
                      className="w-full flex items-center justify-between p-4 text-xs tracking-widest text-foreground hover:text-primary transition-colors"
                    >
                      <span>&gt; DETAILS</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {detailsOpen && (
                      <div className="px-4 pb-6 space-y-8 border-t border-border pt-4">
                        {textSections.map((section) => (
                          <div key={section.id}>
                            {section.title && (
                              <h3 className="text-sm font-bold tracking-widest mb-3 text-foreground">
                                {section.title.toUpperCase()}
                              </h3>
                            )}
                            {section.layout === "two-column" ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            ) : section.layout === "code-showcase" ? (
                              section.content_left && (
                                <div className="bg-secondary border border-border p-4 overflow-hidden">
                                  <iframe
                                    srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;background:#1a1a2e;color:#e0e0e0;font-family:monospace;padding:16px;}</style></head><body>${DOMPurify.sanitize(section.content_left)}</body></html>`}
                                    className="w-full min-h-[200px] border-0"
                                    sandbox="allow-scripts"
                                    title="Code showcase"
                                  />
                                </div>
                              )
                            ) : (
                              section.content_left && (
                                <div
                                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content_left) }}
                                  className="prose prose-invert prose-sm max-w-none text-muted-foreground tracking-wider"
                                />
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <div className="border border-primary/20 p-6 md:p-8 relative mb-8">
                    <Quote className="text-primary/30 absolute top-4 left-4" size={28} />
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
              </div>

              {/* Right: Sidebar — Related Projects */}
              {relatedProjects.length > 0 && (
                <aside className="space-y-4">
                  <h2 className="text-xs tracking-widest text-muted-foreground mb-2">
                    RELATED PROJECTS
                  </h2>
                  {relatedProjects.map((rp) => (
                    <Link key={rp.id} to={`/portfolio/${rp.slug}`} className="block group">
                      <div className="border border-border overflow-hidden hover:border-primary/40 transition-colors">
                        <div className="aspect-video bg-secondary overflow-hidden">
                          {rp.image_url ? (
                            <img
                              src={rp.image_url}
                              alt={rp.client_name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] tracking-widest">
                              NO IMAGE
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <Badge variant="outline" className="text-primary border-primary mb-1 text-[9px] tracking-widest">
                            {rp.category.toUpperCase()}
                          </Badge>
                          <h3 className="text-xs font-bold tracking-wider">
                            {rp.client_name.toUpperCase()}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </aside>
              )}
            </div>

          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

/** Small metadata field component */
const MetaField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-[10px] tracking-widest text-muted-foreground block mb-1">{label}</span>
    <span className="text-xs tracking-wider text-primary font-bold">{value.toUpperCase()}</span>
  </div>
);

export default ProjectDetail;
