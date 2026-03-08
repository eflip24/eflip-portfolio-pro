import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from "embla-carousel-react";

const services = ["WEBSITES", "GAMES", "PRINTING", "VIDEOS", "BRANDING", "UI/UX"];

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  image_url: string | null;
}

interface Testimonial {
  client_name: string;
  testimonial: string;
  testimonial_author: string | null;
}

const Index = () => {
  const [featured, setFeatured] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: featuredData }, { data: testimonialsData }, { data: clientsData }] = await Promise.all([
        supabase
          .from("projects")
          .select("id, client_name, description, category, image_url")
          .eq("published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("projects")
          .select("client_name, testimonial, testimonial_author")
          .eq("published", true)
          .not("testimonial", "is", null),
        supabase
          .from("projects")
          .select("client_name")
          .eq("published", true),
      ]);
      setFeatured(featuredData || []);
      setTestimonials((testimonialsData as Testimonial[]) || []);
      const uniqueClients = [...new Set((clientsData || []).map((c: any) => c.client_name))];
      setClients(uniqueClients);
    };
    fetchData();
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    if (!emblaApi || testimonials.length <= 1) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi, testimonials.length]);

  return (
    <Layout>
      <SEOHead />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-widest text-gradient mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            eFLIP
          </motion.h1>
          <motion.div
            className="overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-lg md:text-xl text-muted-foreground tracking-[0.3em] mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              DESIGN AGENCY — WE CREATE THE EXTRAORDINARY
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button asChild size="lg" className="glow-orange text-base tracking-widest group">
              <Link to="/portfolio">
                VIEW OUR WORK
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="border-y border-border py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...services, ...services, ...services, ...services].map((s, i) => (
            <span key={i} className="mx-8 text-2xl md:text-4xl font-bold tracking-widest text-muted-foreground/30">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Featured Work */}
      {featured.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-center mb-4">
                FEATURED <span className="text-primary">WORK</span>
              </h2>
              <p className="text-center text-muted-foreground tracking-wider mb-12 text-sm">
                A SELECTION OF OUR LATEST PROJECTS
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <Link to={`/portfolio/${project.id}`}>
                    <motion.div
                      className="group relative overflow-hidden bg-card project-card"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video bg-secondary overflow-hidden">
                        {project.image_url ? (
                          <img src={project.image_url} alt={project.client_name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm tracking-widest">NO IMAGE</div>
                        )}
                      </div>
                      <div className="p-5">
                        <Badge variant="outline" className="text-primary border-primary mb-3 text-[10px] tracking-widest">
                          {project.category.toUpperCase()}
                        </Badge>
                        <h3 className="text-base font-bold tracking-wider mb-2">{project.client_name.toUpperCase()}</h3>
                        <p className="text-muted-foreground text-sm tracking-wider line-clamp-2">{project.description}</p>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="glow-orange tracking-widest group">
                <Link to="/portfolio">
                  VIEW ALL WORK
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Carousel */}
      {testimonials.length > 0 && (
        <section className="py-24 border-t border-border">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-center mb-4">
                WHAT OUR <span className="text-primary">CLIENTS</span> SAY
              </h2>
              <p className="text-center text-muted-foreground tracking-wider mb-12 text-sm">
                REAL FEEDBACK FROM REAL PARTNERSHIPS
              </p>
            </ScrollReveal>
            <div className="max-w-4xl mx-auto overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 px-4">
                    <div className="border border-primary/20 p-8 md:p-12 relative text-center">
                      <Quote className="text-primary/20 mx-auto mb-6" size={40} />
                      <blockquote className="text-muted-foreground italic tracking-wider text-sm md:text-base leading-relaxed mb-6">
                        "{t.testimonial}"
                      </blockquote>
                      <p className="text-primary text-xs tracking-widest font-bold">
                        — {(t.testimonial_author || t.client_name).toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors"
                    onClick={() => emblaApi?.scrollTo(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trusted By */}
      {clients.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs tracking-widest text-muted-foreground mb-8">TRUSTED BY</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {clients.map((name) => (
                <span key={name} className="text-lg md:text-xl font-bold tracking-widest text-muted-foreground/40">
                  {name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Teaser Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest mb-6">
              WE <span className="text-primary">DESIGN</span> WHAT
              <br />
              OTHERS <span className="text-primary">DREAM</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm tracking-wider">
              FROM PIXEL-PERFECT WEBSITES TO IMMERSIVE GAME EXPERIENCES,
              STUNNING PRINT MEDIA TO CINEMATIC VIDEOS — WE BRING YOUR
              VISION TO LIFE WITH BOLD, UNCOMPROMISING DESIGN.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
