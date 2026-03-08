import { motion } from "framer-motion";
import { Globe, Gamepad2, Printer, Video } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";

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

const Services = () => (
  <Layout>
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
  </Layout>
);

export default Services;
