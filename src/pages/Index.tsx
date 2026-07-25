import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedLogo from "@/components/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from "embla-carousel-react";

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

const CREDENTIALS = [
  "25+ YEARS",
  "500+ PROJECTS",
  "200+ CLIENTS",
  "BASED IN IRELAND",
];

const Index = () => {
  const [featured, setFeatured] = useState<Project[]>([]);
  const [logos, setLogos] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: featuredData }, { data: logoData }, { data: testimonialsData }] =
        await Promise.all([
          supabase
            .from("projects")
            .select("id, slug, client_name, description, category, image_url")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("projects")
            .select("id, slug, client_name, description, category, image_url")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .limit(8),
          supabase
            .from("projects")
            .select("client_name, testimonial, testimonial_author")
            .eq("published", true)
            .not("testimonial", "is", null),
        ]);
      setFeatured(featuredData || []);
      setLogos(logoData || []);
      setTestimonials((testimonialsData as Testimonial[]) || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!emblaApi || testimonials.length <= 1) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [emblaApi, testimonials.length]);

  const hero = featured[0];
  const support = featured.slice(1, 3);

  return (
    <Layout>
      <SEOHead
        keywords="creative web design agency Ireland, high end web design Dublin, brand websites, ai for business Ireland, design agency Dublin, eflip"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "eFlip",
            "url": "https://eflip.ie",
            "logo": "https://eflip.ie/logo.png",
            "description":
              "eFlip is an Irish creative design and AI studio building brand-grade websites for ambitious businesses across Ireland.",
            "foundingDate": "2001",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://eflip.ie/contact",
              "availableLanguage": "English",
            },
            "areaServed": { "@type": "Country", "name": "Ireland" },
            "sameAs": [
              "https://instagram.com/eflip",
              "https://linkedin.com/company/eflip",
              "https://x.com/eflip",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "eFlip",
            "url": "https://eflip.ie",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://eflip.ie/portfolio?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />

      {/* ═════════ HERO ═════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Subtle radial glow behind logo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <AnimatedLogo className="h-28 md:h-36 lg:h-44 w-28 md:w-36 lg:w-44 mb-10" />

          <motion.h1
            className="max-w-4xl text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            Creative websites & AI for
            <br />
            Ireland's most <span className="text-primary">ambitious</span> brands.
          </motion.h1>

          <motion.p
            className="text-xs md:text-sm text-muted-foreground tracking-[0.35em] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            A design & AI studio in Ireland · 25 years · 500+ projects
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            <Button asChild size="lg" className="glow-orange text-sm tracking-widest group">
              <Link to="/contact">
                START A PROJECT
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </Button>
            <Link
              to="/portfolio"
              className="text-xs tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors uppercase story-link"
            >
              See selected work →
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ═════════ TRUST STRIP — logos + testimonial + credentials ═════════ */}
      <section className="border-y border-border bg-background/40 backdrop-blur-sm">
        {/* Client logos marquee (desktop only) */}
        {logos.length > 0 && (
          <div className="border-b border-border/50 py-8 overflow-hidden hidden md:block">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...logos, ...logos].map((p, i) => (
                <span
                  key={`${p.id}-${i}`}
                  className="mx-10 text-xl font-bold tracking-[0.3em] text-muted-foreground/40 hover:text-primary transition-colors"
                >
                  {p.client_name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {testimonials.length > 0 && (
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-4 max-w-3xl overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 px-2">
                    <div className="text-center">
                      <Quote className="text-primary/30 mx-auto mb-6" size={32} />
                      <blockquote className="text-lg md:text-2xl leading-relaxed tracking-wide text-foreground/90 mb-6 italic font-light">
                        "{t.testimonial}"
                      </blockquote>
                      <p className="text-primary text-[10px] tracking-[0.35em] font-bold uppercase">
                        — {(t.testimonial_author || t.client_name)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Show testimonial ${i + 1}`}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors"
                      onClick={() => emblaApi?.scrollTo(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Credentials strip */}
        <div className="border-t border-border/50 py-6">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CREDENTIALS.map((c) => (
              <span
                key={c}
                className="text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ FEATURED WORK — editorial 2-up ═════════ */}
      {hero && (
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <p className="text-[10px] tracking-[0.35em] text-primary mb-3 uppercase">
                    Selected work
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                    The work speaks
                    <br />
                    for itself.
                  </h2>
                </div>
                <Link
                  to="/portfolio"
                  className="text-xs tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors uppercase story-link hidden md:inline-block"
                >
                  View all work →
                </Link>
              </div>
            </ScrollReveal>

            {/* Big hero project */}
            <ScrollReveal>
              <Link to={`/portfolio/${hero.slug}`} className="block group mb-12">
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-secondary border border-border">
                  {hero.image_url ? (
                    <img
                      src={hero.image_url}
                      alt={hero.client_name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm tracking-widest">
                      NO IMAGE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <Badge
                      variant="outline"
                      className="text-primary border-primary mb-3 text-[10px] tracking-[0.3em]"
                    >
                      {hero.category.toUpperCase()} · FEATURED
                    </Badge>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {hero.client_name}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base max-w-2xl line-clamp-2">
                      {hero.description}
                    </p>
                  </div>
                  {/* Orange rule slide-in on hover */}
                  <div className="absolute top-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Support pair */}
            {support.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {support.map((project, i) => (
                  <ScrollReveal key={project.id} delay={i * 0.1}>
                    <Link to={`/portfolio/${project.slug}`} className="block group">
                      <div className="relative aspect-[4/3] overflow-hidden bg-secondary border border-border mb-4">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.client_name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm tracking-widest">
                            NO IMAGE
                          </div>
                        )}
                        <div className="absolute top-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary mb-2 text-[9px] tracking-[0.3em]"
                      >
                        {project.category.toUpperCase()}
                      </Badge>
                      <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                        {project.client_name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}

            <div className="text-center mt-16">
              <Button asChild size="lg" variant="outline" className="tracking-widest group">
                <Link to="/portfolio">
                  VIEW ALL WORK
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ═════════ CLOSING CTA ═════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.35em] text-primary mb-4 uppercase">
              Start a project
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
              Ready to build something
              <br />
              <span className="text-primary">worth remembering?</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base tracking-wide mb-10 max-w-xl mx-auto">
              Tell us about your business and what you're trying to achieve.
              We typically reply within 4 hours.
            </p>
            <Button asChild size="lg" className="glow-orange tracking-widest group">
              <Link to="/contact">
                GET IN TOUCH
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
