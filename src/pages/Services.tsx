import { motion } from "framer-motion";
import { Globe, Gamepad2, Printer, Video, Search, Palette, Code, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "WEB DESIGN",
    desc: "RESPONSIVE, MODERN WEBSITES THAT CONVERT VISITORS INTO CUSTOMERS. FROM LANDING PAGES TO FULL-SCALE WEB APPLICATIONS.",
  },
  {
    icon: Gamepad2,
    title: "GAME DESIGN",
    desc: "IMMERSIVE GAMING EXPERIENCES WITH STUNNING VISUALS AND ENGAGING MECHANICS. MOBILE, WEB, AND CONSOLE.",
  },
  {
    icon: Printer,
    title: "PRINT DESIGN",
    desc: "STRIKING PRINT MATERIALS — BUSINESS CARDS, BROCHURES, POSTERS, PACKAGING — DESIGNED TO STAND OUT.",
  },
  {
    icon: Video,
    title: "VIDEO PRODUCTION",
    desc: "CINEMATIC VIDEOS, MOTION GRAPHICS, AND ANIMATIONS THAT TELL YOUR STORY WITH IMPACT.",
  },
];

const process = [
  {
    icon: Search,
    step: "01",
    title: "DISCOVERY",
    desc: "WE DIG DEEP INTO YOUR BRAND, AUDIENCE, AND GOALS TO BUILD A STRATEGIC FOUNDATION.",
  },
  {
    icon: Palette,
    step: "02",
    title: "DESIGN",
    desc: "CONCEPTS TAKE SHAPE THROUGH WIREFRAMES, MOCKUPS, AND ITERATIVE FEEDBACK LOOPS.",
  },
  {
    icon: Code,
    step: "03",
    title: "BUILD",
    desc: "PIXEL-PERFECT EXECUTION WITH MODERN TOOLS, RESPONSIVE LAYOUTS, AND CLEAN CODE.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "LAUNCH",
    desc: "RIGOROUS QA, DEPLOYMENT, AND ONGOING SUPPORT TO ENSURE YOUR PROJECT THRIVES.",
  },
];

const Services = () => (
  <Layout>
    <SEOHead
      title="Services — Web Design, Games, Print & Video"
      description="Professional web design, game development, print design, and video production services. eFlip delivers creative solutions tailored to your brand in Ireland."
      keywords="web design Ireland, game development, print design, video production, branding, UI UX design, eFlip services"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Design Services",
          "provider": { "@type": "Organization", "name": "eFlip", "url": "https://eflip.ie" },
          "areaServed": { "@type": "Country", "name": "Ireland" },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Design Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design", "description": "Responsive, modern websites that convert visitors into customers." } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Game Design", "description": "Immersive gaming experiences with stunning visuals and engaging mechanics." } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Print Design", "description": "Striking print materials — business cards, brochures, posters, packaging." } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Production", "description": "Cinematic videos, motion graphics, and animations that tell your story." } }
            ]
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://eflip.ie/services" }
          ]
        }
      ]}
    />
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OUR <span className="text-primary">SERVICES</span>
        </motion.h1>
        <p className="text-center text-muted-foreground tracking-wider mb-16 text-sm">
          EVERYTHING YOU NEED, DESIGNED WITH PURPOSE
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.15}>
              <motion.div
                className="border border-border p-8 group hover:border-primary transition-colors"
                whileHover={{ y: -4 }}
              >
                <s.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-bold tracking-widest mb-4">{s.title}</h3>
                <p className="text-muted-foreground text-xs tracking-wider leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* How We Work */}
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-center mb-4">
            HOW WE <span className="text-primary">WORK</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-16 text-sm">
            A PROVEN PROCESS FOR EXCEPTIONAL RESULTS
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {process.map((p, i) => (
            <ScrollReveal key={p.step} delay={i * 0.15}>
              <div className={`flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1 text-center md:text-right">
                  {i % 2 === 0 && (
                    <div className={`md:pr-12 ${i % 2 === 1 ? "md:text-left md:pl-12 md:pr-0" : ""}`}>
                      <span className="text-primary text-3xl font-bold tracking-widest">{p.step}</span>
                      <h3 className="text-xl font-bold tracking-widest mt-2 mb-3">{p.title}</h3>
                      <p className="text-muted-foreground text-xs tracking-wider leading-relaxed">{p.desc}</p>
                    </div>
                  )}
                </div>

                <div className="relative z-10 w-16 h-16 border-2 border-primary bg-background flex items-center justify-center shrink-0">
                  <p.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>

                <div className="flex-1 text-center md:text-left">
                  {i % 2 === 1 && (
                    <div className="md:pl-12">
                      <span className="text-primary text-3xl font-bold tracking-widest">{p.step}</span>
                      <h3 className="text-xl font-bold tracking-widest mt-2 mb-3">{p.title}</h3>
                      <p className="text-muted-foreground text-xs tracking-wider leading-relaxed">{p.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="glow-orange tracking-widest">
            <Link to="/contact">START YOUR PROJECT</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
