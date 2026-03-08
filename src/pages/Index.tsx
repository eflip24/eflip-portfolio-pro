import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import GeometricMesh from "@/components/GeometricMesh";

const services = ["WEBSITES", "GAMES", "PRINTING", "VIDEOS", "BRANDING", "UI/UX"];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <GeometricMesh />

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
            <span
              key={i}
              className="mx-8 text-2xl md:text-4xl font-bold tracking-widest text-muted-foreground/30"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

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
