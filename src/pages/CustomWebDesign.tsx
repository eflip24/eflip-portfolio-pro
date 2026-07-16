import { motion } from "framer-motion";
import {
  Globe,
  Gauge,
  Sparkles,
  Target,
  Accessibility,
  Layers,
  Lock,
  Search,
  Compass,
  Palette,
  Code,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const audience = [
  "Companies that need a custom design aligned with their brand and goals",
  "Businesses requiring complex functionality or integrations (bookings, CRM, automation, payments, member areas)",
  "Brands that want their website to perform well in AI-powered search and modern discovery",
  "Companies looking for a high-performance, future-proof website rather than a quick launch",
  "Businesses that want ownership and control over their digital presence",
];

const deliverables = [
  { icon: Palette, title: "CUSTOM DESIGN SYSTEMS", desc: "THOUGHTFUL, SCALABLE DESIGN THAT FEELS UNIQUE TO YOUR BRAND — NOT ANOTHER TEMPLATE." },
  { icon: Gauge, title: "HIGH-PERFORMANCE DEV", desc: "FAST, ACCESSIBLE, TECHNICALLY SOUND WEBSITES BUILT WITH MODERN BEST PRACTICES." },
  { icon: Target, title: "STRATEGIC UX", desc: "DESIGN THAT GUIDES VISITORS TOWARD YOUR BUSINESS GOALS — NOT JUST AESTHETICS." },
  { icon: Sparkles, title: "AI-READY ARCHITECTURE", desc: "STRUCTURED TO PERFORM IN BOTH TRADITIONAL SEARCH AND AI-DRIVEN DISCOVERY." },
  { icon: Layers, title: "CUSTOM FUNCTIONALITY", desc: "BOOKING SYSTEMS, AUTOMATION, CRM CONNECTIONS, MEMBER PORTALS, AND MORE." },
  { icon: Wrench, title: "LONG-TERM MAINTAINABILITY", desc: "CLEAN CODE AND STRUCTURE SO YOUR SITE STAYS EASY AND COST-EFFECTIVE TO UPDATE." },
];

const futureTable = [
  { priority: "PERFORMANCE & SPEED", why: "Core to user experience and search rankings", approach: "Optimised code, modern frameworks, fast loading" },
  { priority: "AI SEARCH READINESS", why: "More people use AI tools to find businesses", approach: "Structured data, clear content architecture" },
  { priority: "CONVERSION-FOCUSED DESIGN", why: "Beautiful sites that don't convert are expensive", approach: "Strategy-led design focused on results" },
  { priority: "ACCESSIBILITY", why: "Now a baseline expectation and legal requirement", approach: "WCAG-compliant design and development" },
  { priority: "SCALABILITY", why: "Ability to grow without rebuilding", approach: "Flexible systems and clean architecture" },
  { priority: "OWNERSHIP & CONTROL", why: "Avoiding platform lock-in", approach: "Custom-built solutions where it matters" },
];

const steps = [
  { step: "01", icon: Compass, title: "DISCOVERY", desc: "WE EXPLORE YOUR GOALS, AUDIENCE, COMPETITORS, AND WHAT SUCCESS LOOKS LIKE." },
  { step: "02", icon: Search, title: "STRATEGY", desc: "WE DEFINE THE STRUCTURE, USER JOURNEY, AND TECHNICAL APPROACH." },
  { step: "03", icon: Palette, title: "CUSTOM DESIGN", desc: "WE CREATE A UNIQUE DESIGN DIRECTION TAILORED TO YOUR BRAND." },
  { step: "04", icon: Code, title: "DEVELOPMENT", desc: "WE BUILD WITH PERFORMANCE, ACCESSIBILITY, AND FUTURE NEEDS IN MIND." },
  { step: "05", icon: Rocket, title: "LAUNCH & HANDOVER", desc: "WE DELIVER A POLISHED, WELL-DOCUMENTED WEBSITE WITH TRAINING AND SUPPORT." },
];

const benefits = [
  { icon: TrendingUp, title: "MORE CONVERSIONS", desc: "TURN MORE VISITORS INTO CUSTOMERS WITH STRATEGY-LED DESIGN." },
  { icon: Search, title: "BETTER RANKINGS", desc: "PERFORM WELL IN BOTH TRADITIONAL AND AI-POWERED SEARCH." },
  { icon: Zap, title: "LOWER MAINTENANCE", desc: "CLEAN, MODERN CODE THAT'S EASY AND CHEAP TO UPDATE." },
  { icon: Layers, title: "BUILT TO SCALE", desc: "A FOUNDATION THAT GROWS WITH YOUR BUSINESS." },
  { icon: ShieldCheck, title: "PROFESSIONAL EDGE", desc: "STRONGER, MORE CREDIBLE FIRST IMPRESSIONS." },
  { icon: Lock, title: "OWNERSHIP", desc: "NO PLATFORM LOCK-IN — YOU OWN AND CONTROL YOUR SITE." },
];

const CustomWebDesign = () => (
  <Layout>
    <SEOHead
      title="Custom Web Design & Development Ireland — eFlip"
      description="Strategic, high-performing custom websites built for businesses that need more than a template. Custom design, AI-ready architecture, and long-term performance."
      keywords="custom web design Ireland, custom website development, high performance websites, AI search ready, custom design systems, WCAG accessible, conversion focused web design"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Custom Web Design & Development",
          "serviceType": "Web Design & Development",
          "url": "https://eflip.ie/custom-web-design",
          "provider": { "@type": "Organization", "name": "eFlip", "url": "https://eflip.ie" },
          "areaServed": { "@type": "Country", "name": "Ireland" },
          "description":
            "Strategic custom web design and development for businesses that need more than a template — high-performance, AI-ready, and built to scale.",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
            { "@type": "ListItem", "position": 2, "name": "Custom Web Design", "item": "https://eflip.ie/custom-web-design" },
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
          <Globe className="w-3 h-3 text-primary" />
          CUSTOM WEB DESIGN
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CUSTOM WEB <span className="text-primary">DESIGN</span> & DEVELOPMENT
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground tracking-wider mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          For businesses that need more than a template.
        </motion.p>
        <motion.p
          className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Most websites today can be built in minutes with AI tools. We work with clients who need
          something better — websites that are strategically designed, technically solid, and built to
          perform in a world where AI is reshaping how people discover and interact with businesses.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="glow-orange tracking-widest">
            <Link to="/contact">START A PROJECT</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="tracking-widest">
            <Link to="/portfolio">SEE OUR WORK</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* The Shift */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-10">
            THE SHIFT IN <span className="text-primary">WEB DESIGN</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Basic brochure websites have become a commodity. With AI website builders and no-code tools,
              almost anyone can create a decent-looking site in a few hours.
            </p>
            <p>
              However, the gap between a "good enough" website and one that actually drives business
              results has never been wider.
            </p>
            <p>
              In 2026 and beyond, successful websites are no longer judged only by how they look. They
              are judged by how well they perform — in speed, conversion, search visibility (including
              AI search), and long-term maintainability.
            </p>
            <p className="text-primary tracking-wider text-sm">This is where we focus.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Who this is for */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHO THIS IS <span className="text-primary">FOR</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            BUSINESSES THAT HAVE OUTGROWN TEMPLATES
          </p>
        </ScrollReveal>
        <ul className="space-y-4 max-w-3xl mx-auto">
          {audience.map((a, i) => (
            <ScrollReveal key={a} delay={i * 0.05}>
              <li className="flex items-start gap-4 border border-border p-5 hover:border-primary transition-colors">
                <Target className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground leading-relaxed">{a}</span>
              </li>
            </ScrollReveal>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground text-center mt-8 tracking-wider max-w-2xl mx-auto">
          IF A FREE OR LOW-COST TOOL CAN SOLVE YOUR NEEDS, WE'LL TELL YOU. WE ONLY TAKE ON PROJECTS
          WHERE CUSTOM DESIGN AND DEVELOPMENT WILL DELIVER CLEAR VALUE.
        </p>
      </div>
    </section>

    {/* What we deliver */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHAT WE <span className="text-primary">DELIVER</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            STRATEGIC DESIGN MEETS MODERN DEVELOPMENT
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <ScrollReveal key={d.title} delay={i * 0.06}>
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

    {/* Future-ready table */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHAT MAKES A WEBSITE <span className="text-primary">FUTURE-READY</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-10 text-xs">
            WHAT MATTERS OVER THE NEXT 5–10 YEARS
          </p>
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-4 text-[10px] md:text-xs font-bold tracking-widest text-primary">PRIORITY</th>
                  <th className="px-5 py-4 text-[10px] md:text-xs font-bold tracking-widest text-primary">WHY IT MATTERS</th>
                  <th className="px-5 py-4 text-[10px] md:text-xs font-bold tracking-widest text-primary">HOW WE APPROACH IT</th>
                </tr>
              </thead>
              <tbody>
                {futureTable.map((row) => (
                  <tr key={row.priority} className="border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 text-xs md:text-sm font-bold tracking-widest">{row.priority}</td>
                    <td className="px-5 py-4 text-xs md:text-sm text-muted-foreground leading-relaxed">{row.why}</td>
                    <td className="px-5 py-4 text-xs md:text-sm text-muted-foreground leading-relaxed">{row.approach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Our approach */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            OUR <span className="text-primary">APPROACH</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            WE START WITH YOUR BUSINESS, NOT THE DESIGN
          </p>
        </ScrollReveal>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.08}>
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

    {/* Why this matters */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHY THIS <span className="text-primary">MATTERS</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            A CUSTOM SITE IS A GENUINE COMPETITIVE ADVANTAGE
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.08}>
              <div className="border border-border p-7 h-full hover:border-primary transition-colors">
                <b.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm font-bold tracking-widest mb-3">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed tracking-wider">{b.desc}</p>
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
            READY TO BUILD SOMETHING BETTER THAN A <span className="text-primary">TEMPLATE</span>?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            We work with businesses that want their website to be a real asset — not just another
            online brochure.
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

export default CustomWebDesign;
