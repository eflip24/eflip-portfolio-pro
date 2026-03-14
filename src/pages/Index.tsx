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

const stats = [
  { label: "PROJECTS DELIVERED", value: 50, suffix: "+" },
  { label: "HAPPY CLIENTS", value: 30, suffix: "+" },
  { label: "SERVICES OFFERED", value: 4, suffix: "" },
  { label: "YEARS EXPERIENCE", value: 8, suffix: "+" },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsCounter = () => (
  <section className="py-20 border-y border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl md:text-5xl font-bold text-primary tracking-widest mb-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-[10px] tracking-widest text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

interface Project {
  id: string;
  slug: string;
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
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: featuredData }, { data: testimonialsData }] = await Promise.all([
        supabase
          .from("projects")
          .select("id, slug, client_name, description, category, image_url")
          .eq("published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("projects")
          .select("client_name, testimonial, testimonial_author")
          .eq("published", true)
          .not("testimonial", "is", null),
      ]);
      setFeatured(featuredData || []);
      setTestimonials((testimonialsData as Testimonial[]) || []);
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
      <SEOHead
        keywords="design agency Ireland, web design, game development, print design, video production, branding, UI UX"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "eFlip",
            "url": "https://eflip.ie",
            "logo": "https://eflip.ie/logo.png",
            "description": "eFlip is an Irish design agency specialising in web design, game development, print media, and video production.",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://eflip.ie/contact",
              "availableLanguage": "English"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Ireland"
            },
            "sameAs": [
              "https://instagram.com/eflip",
              "https://linkedin.com/company/eflip",
              "https://x.com/eflip"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "eFlip",
            "url": "https://eflip.ie",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://eflip.ie/portfolio?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.img
            src="/logo.png"
            alt="eFlip — Creative Design Agency in Ireland"
            className="h-24 md:h-32 lg:h-40 w-auto mx-auto mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
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
                  <Link to={`/portfolio/${project.slug}`}>
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
