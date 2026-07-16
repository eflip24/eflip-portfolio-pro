import { motion } from "framer-motion";
import {
  Gamepad2,
  Globe,
  GraduationCap,
  Smartphone,
  Trophy,
  Sparkles,
  FlaskConical,
  Compass,
  Puzzle,
  Palette,
  Code,
  TestTube,
  Rocket,
  Megaphone,
  Users,
  Zap,
  Building2,
  CalendarDays,
  Target,
  BookOpen,
  Eye,
  Layers,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const gameTypes = [
  { icon: Globe, type: "WEB-BASED GAMES", bestFor: "Marketing, lead generation, brand engagement", examples: "Browser games, HTML5 games, viral campaigns" },
  { icon: GraduationCap, type: "EDUCATIONAL & SERIOUS GAMES", bestFor: "Training, learning, awareness campaigns", examples: "School projects, corporate training, health" },
  { icon: Smartphone, type: "MOBILE GAMES", bestFor: "Entertainment and long-term engagement", examples: "Casual games for iOS and Android" },
  { icon: Trophy, type: "GAMIFICATION PROJECTS", bestFor: "Improving user behaviour and retention", examples: "Loyalty systems, apps, internal tools" },
  { icon: Sparkles, type: "INTERACTIVE EXPERIENCES", bestFor: "Brand activations and events", examples: "Exhibition games, product demos, installations" },
  { icon: FlaskConical, type: "PROTOTYPES & CONCEPTS", bestFor: "Testing game ideas before full development", examples: "Early-stage concepts and playtesting" },
];

const steps = [
  { step: "01", icon: Compass, title: "CONCEPT & DISCOVERY", desc: "WE EXPLORE YOUR GOALS, TARGET AUDIENCE, AND WHAT SUCCESS LOOKS LIKE." },
  { step: "02", icon: Puzzle, title: "GAME DESIGN & MECHANICS", desc: "WE DEFINE CORE GAMEPLAY LOOPS, RULES, PROGRESSION, AND PLAYER MOTIVATIONS." },
  { step: "03", icon: Palette, title: "VISUAL DESIGN & ART", desc: "WE CREATE THE VISUAL STYLE, CHARACTERS, ENVIRONMENTS, AND USER INTERFACE." },
  { step: "04", icon: Code, title: "DEVELOPMENT", desc: "WE BUILD THE GAME USING THE MOST SUITABLE TECH FOR YOUR PLATFORM AND GOALS." },
  { step: "05", icon: TestTube, title: "TESTING & ITERATION", desc: "WE PLAYTEST AND REFINE THE GAME BASED ON REAL USER FEEDBACK." },
  { step: "06", icon: Rocket, title: "LAUNCH & SUPPORT", desc: "WE DEPLOY THE GAME AND PROVIDE ONGOING UPDATES WHEN NEEDED." },
];

const clients = [
  { icon: Megaphone, title: "BRANDS & MARKETING TEAMS", desc: "CREATE MEMORABLE, SHAREABLE EXPERIENCES." },
  { icon: GraduationCap, title: "EDUCATIONAL INSTITUTIONS", desc: "DEVELOP LEARNING GAMES AND TRAINING TOOLS." },
  { icon: Zap, title: "STARTUPS & PRODUCT TEAMS", desc: "USE GAMIFICATION TO IMPROVE USER ENGAGEMENT." },
  { icon: CalendarDays, title: "EVENT & EXHIBITION ORGANISERS", desc: "CREATE INTERACTIVE INSTALLATIONS." },
  { icon: Building2, title: "COMPANIES", desc: "BUILD INTERNAL GAMES FOR TRAINING, ONBOARDING, OR TEAM BUILDING." },
];

const whyMatters = [
  { icon: Users, title: "INCREASE ENGAGEMENT", desc: "MORE TIME SPENT WITH YOUR BRAND OR PRODUCT." },
  { icon: BookOpen, title: "BETTER LEARNING", desc: "IMPROVE INFORMATION RETENTION THROUGH PLAY." },
  { icon: Sparkles, title: "MEMORABLE MARKETING", desc: "CREATE EXPERIENCES PEOPLE ACTUALLY REMEMBER." },
  { icon: Target, title: "DRIVE BEHAVIOUR", desc: "ENCOURAGE ACTION THROUGH POSITIVE REINFORCEMENT." },
  { icon: Eye, title: "STAND OUT", desc: "CUT THROUGH A CROWDED DIGITAL SPACE." },
];

const differentiators = [
  { icon: Target, title: "PURPOSE-DRIVEN", desc: "EVERY GAME HAS A CLEAR OBJECTIVE." },
  { icon: Handshake, title: "FUN + FUNCTIONAL", desc: "ENJOYABLE AND EFFECTIVE — WE BALANCE BOTH." },
  { icon: Layers, title: "REAL-WORLD FIT", desc: "DESIGNED AROUND YOUR BUDGET, TIMELINE, AND PLATFORM." },
  { icon: Gamepad2, title: "PLAYABILITY FIRST", desc: "USER EXPERIENCE MATTERS MORE THAN FLASHY VISUALS." },
  { icon: Globe, title: "STANDALONE OR EMBEDDED", desc: "DELIVER ON THEIR OWN OR INTEGRATE INTO YOUR SITE." },
];

const GameDesign = () => (
  <Layout>
    <SEOHead
      title="Game Design Ireland — Custom Games & Interactive Experiences"
      description="Custom game design and development in Ireland. Web, mobile, educational, and gamified experiences built with purpose — from marketing games to interactive installations."
      keywords="game design Ireland, custom game development, web games, HTML5 games, mobile games, educational games, gamification, serious games, interactive experiences"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Game Design & Development",
          "serviceType": "Game Design",
          "url": "https://eflip.ie/game-design",
          "provider": { "@type": "Organization", "name": "eFlip", "url": "https://eflip.ie" },
          "areaServed": { "@type": "Country", "name": "Ireland" },
          "description":
            "Custom game design and development — web, mobile, educational, and gamified experiences built with a clear purpose.",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
            { "@type": "ListItem", "position": 2, "name": "Game Design", "item": "https://eflip.ie/game-design" },
          ],
        },
      ]}
    />

    {/* Hero */}
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 mb-8 text-xs tracking-widest text-muted-foreground"
        >
          <Gamepad2 className="w-3 h-3 text-primary" />
          GAME DESIGN
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GAME <span className="text-primary">DESIGN</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground tracking-wider mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Custom games and interactive experiences.
        </motion.p>
        <motion.p
          className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          We design and develop engaging games and gamified experiences — from web and mobile games
          to educational tools and brand-driven interactive projects.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="glow-orange tracking-widest">
            <Link to="/contact">START A GAME PROJECT</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="tracking-widest">
            <Link to="/portfolio">VIEW OUR GAMES</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* What we do */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-10">
            WHAT WE <span className="text-primary">DO</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              We create custom games and interactive experiences that combine strong design with
              meaningful gameplay. Whether you're looking to entertain, educate, promote a brand, or
              solve a specific problem through play, we help bring the idea to life.
            </p>
            <p>
              Our focus is on games that are not only fun to play but also serve a clear purpose —
              whether that's engagement, learning, marketing, or user retention.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Types of games */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            TYPES OF GAMES WE <span className="text-primary">CREATE</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            FORMATS THAT MATCH YOUR GOALS AND AUDIENCE
          </p>
        </ScrollReveal>

        {/* Card grid on mobile, table on md+ */}
        <div className="grid grid-cols-1 md:hidden gap-6">
          {gameTypes.map((g, i) => (
            <ScrollReveal key={g.type} delay={i * 0.05}>
              <div className="border border-border p-6 hover:border-primary transition-colors">
                <g.icon className="w-7 h-7 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-sm font-bold tracking-widest mb-3">{g.type}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  <span className="text-primary tracking-widest">BEST FOR: </span>
                  {g.bestFor}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary tracking-widest">EXAMPLES: </span>
                  {g.examples}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="hidden md:block border border-border overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-5 py-4 text-xs font-bold tracking-widest text-primary">GAME TYPE</th>
                <th className="px-5 py-4 text-xs font-bold tracking-widest text-primary">BEST FOR</th>
                <th className="px-5 py-4 text-xs font-bold tracking-widest text-primary">EXAMPLES</th>
              </tr>
            </thead>
            <tbody>
              {gameTypes.map((row) => (
                <tr key={row.type} className="border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4 text-sm font-bold tracking-widest">
                    <span className="inline-flex items-center gap-3">
                      <row.icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                      {row.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">{row.bestFor}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">{row.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Our approach */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            OUR APPROACH TO <span className="text-primary">GAME DESIGN</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            EXPERIENCE, ENGAGEMENT, AND PURPOSE
          </p>
        </ScrollReveal>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.07}>
              <div className="flex items-start gap-6 border border-border p-6 hover:border-primary transition-colors">
                <span className="text-primary text-2xl md:text-3xl font-bold tracking-widest shrink-0 w-14">
                  {s.step}
                </span>
                <s.icon className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-bold tracking-widest mb-2">{s.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed tracking-wider">
                    {s.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Who we work with */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHO WE <span className="text-primary">WORK WITH</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            CLIENTS USING GAMES STRATEGICALLY
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.07}>
              <div className="border border-border p-7 h-full hover:border-primary transition-colors">
                <c.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm font-bold tracking-widest mb-3">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed tracking-wider">{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Why game design matters */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHY GAME DESIGN <span className="text-primary">MATTERS</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            GAMES CAPTURE ATTENTION AND DRIVE BEHAVIOUR
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyMatters.map((w, i) => (
            <ScrollReveal key={w.title} delay={i * 0.07}>
              <div className="border border-border p-7 h-full hover:border-primary transition-colors">
                <w.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm font-bold tracking-widest mb-3">{w.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed tracking-wider">{w.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* What makes us different */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-14">
            WHAT MAKES OUR GAMES <span className="text-primary">DIFFERENT</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((d, i) => (
            <ScrollReveal key={d.title} delay={i * 0.07}>
              <div className="border border-border p-7 h-full hover:border-primary transition-colors">
                <d.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm font-bold tracking-widest mb-3">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed tracking-wider">{d.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest mb-6">
            READY TO EXPLORE GAME DESIGN FOR YOUR <span className="text-primary">PROJECT</span>?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you have a clear game idea or just want to understand how games could benefit your
            business or organisation, we're happy to discuss the possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glow-orange tracking-widest">
              <Link to="/contact">BOOK A DISCOVERY CALL</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="tracking-widest">
              <Link to="/contact">REQUEST A PROPOSAL</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default GameDesign;
