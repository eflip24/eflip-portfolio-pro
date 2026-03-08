import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ABOUT <span className="text-primary">eFLIP</span>
        </motion.h1>

        <ScrollReveal>
          <div className="border border-border p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold tracking-widest mb-6 text-primary">OUR STORY</h2>
            <p className="text-muted-foreground leading-relaxed tracking-wider text-sm">
              eFLIP WAS BORN FROM A SIMPLE BELIEF: DESIGN SHOULD BE BOLD, FEARLESS, AND
              UNFORGETTABLE. WE ARE A COLLECTIVE OF DESIGNERS, DEVELOPERS, AND CREATIVES
              WHO REFUSE TO SETTLE FOR THE ORDINARY. EVERY PROJECT IS A CHANCE TO PUSH
              BOUNDARIES AND REDEFINE WHAT'S POSSIBLE.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="border border-border p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold tracking-widest mb-6 text-primary">OUR MISSION</h2>
            <p className="text-muted-foreground leading-relaxed tracking-wider text-sm">
              TO DELIVER EXCEPTIONAL CREATIVE SOLUTIONS THAT ELEVATE BRANDS AND CAPTIVATE
              AUDIENCES. FROM DIGITAL EXPERIENCES TO TANGIBLE MEDIA, WE CRAFT WORK THAT
              LEAVES A LASTING IMPRESSION.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="border border-border p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-widest mb-6 text-primary">WHAT WE DO</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["WEBSITES", "GAMES", "PRINTING", "VIDEOS"].map((s) => (
                <div
                  key={s}
                  className="border border-border p-4 text-center hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="text-xs tracking-widest">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default About;
