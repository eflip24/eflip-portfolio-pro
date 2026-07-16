import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  Wrench,
  Workflow,
  GraduationCap,
  LifeBuoy,
  Clock,
  MessageCircle,
  TrendingUp,
  FileMinus,
  Users,
  Lightbulb,
  Home,
  Scale,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const whatWeDo = [
  { icon: Compass, title: "DISCOVERY & ASSESSMENT", desc: "WE UNDERSTAND YOUR BUSINESS, GOALS, AND CURRENT SYSTEMS." },
  { icon: Sparkles, title: "TOOL SELECTION", desc: "WE RECOMMEND THE RIGHT AI TOOLS FOR YOUR SPECIFIC NEEDS." },
  { icon: Wrench, title: "INTEGRATION", desc: "WE CONNECT AI TOOLS WITH YOUR EXISTING SOFTWARE." },
  { icon: Workflow, title: "WORKFLOW DESIGN", desc: "WE BUILD PRACTICAL PROCESSES THAT FIT HOW YOU WORK." },
  { icon: GraduationCap, title: "SETUP & TRAINING", desc: "WE IMPLEMENT EVERYTHING AND TRAIN YOUR TEAM." },
  { icon: LifeBuoy, title: "ONGOING SUPPORT", desc: "WE MONITOR PERFORMANCE AND IMPROVE OVER TIME." },
];

const benefits = [
  { icon: Clock, title: "SAVE TIME", desc: "CUT SIGNIFICANT TIME FROM REPETITIVE, MANUAL TASKS." },
  { icon: MessageCircle, title: "24/7 RESPONSES", desc: "REPLY TO CUSTOMERS FASTER — EVEN OUTSIDE OFFICE HOURS." },
  { icon: TrendingUp, title: "BETTER CONVERSION", desc: "IMPROVE LEAD CONVERSION AND CUSTOMER EXPERIENCE." },
  { icon: FileMinus, title: "LESS ADMIN", desc: "REDUCE MANUAL PAPERWORK AND BACK-OFFICE OVERHEAD." },
  { icon: Users, title: "SCALE WITHOUT HIRING", desc: "GROW YOUR OPERATIONS WITHOUT IMMEDIATELY ADDING HEADCOUNT." },
  { icon: Lightbulb, title: "CLEAR RECOMMENDATIONS", desc: "GET CUT-THROUGH ADVICE INSTEAD OF MARKETING NOISE." },
];

const steps = [
  { step: "01", title: "DISCOVERY CALL", desc: "WE DISCUSS YOUR BUSINESS AND IDENTIFY THE BIGGEST OPPORTUNITIES." },
  { step: "02", title: "CUSTOM RECOMMENDATION", desc: "WE PRESENT A CLEAR PLAN WITH THE MOST SUITABLE AI TOOLS." },
  { step: "03", title: "IMPLEMENTATION", desc: "WE SET EVERYTHING UP AND INTEGRATE IT WITH YOUR CURRENT SYSTEMS." },
  { step: "04", title: "TRAINING & HANDOVER", desc: "YOUR TEAM LEARNS HOW TO USE THE NEW TOOLS CONFIDENTLY." },
  { step: "05", title: "ONGOING OPTIMISATION", desc: "WE REVIEW RESULTS AND IMPROVE THE SYSTEM OVER TIME." },
];

const industries = [
  {
    icon: Home,
    title: "ESTATE AGENTS",
    points: [
      "AI voice agents that answer calls, qualify leads, and book viewings",
      "Automated lead follow-up via WhatsApp, email, and SMS",
      "SEO-friendly property description writing in seconds",
      "Social, email, and blog content tailored to the local market",
      "Lead scoring so agents focus on the enquiries most likely to close",
    ],
  },
  {
    icon: Scale,
    title: "SOLICITORS & LAW FIRMS",
    points: [
      "Document summarisation for long contracts and case bundles",
      "Faster legal research across case law and precedents",
      "First-draft generation for letters, memos, and standard documents",
      "Streamlined client intake and onboarding",
      "Automatic chronologies from large volumes of correspondence",
    ],
  },
  {
    icon: Building2,
    title: "OTHER LOCAL BUSINESSES",
    points: [
      "Chatbots and voice agents for enquiries and appointment booking",
      "Automated review responses and reputation management",
      "Invoice processing and basic bookkeeping support",
      "Personalised marketing and email campaigns",
      "Internal knowledge assistants for procedures and pricing",
    ],
  },
];

const usageWins = [
  "Automating repetitive admin tasks",
  "Responding to customer enquiries faster — even outside office hours",
  "Generating marketing content quickly",
  "Improving lead qualification and follow-up",
  "Reducing time spent on documentation and research",
];

const AI = () => (
  <Layout>
    <SEOHead
      title="eflip AI — Practical AI for Local Businesses in Ireland"
      description="eflip AI helps local businesses in Ireland adopt the right AI tools, integrate them with existing systems, and build time-saving workflows that support growth."
      keywords="AI for local business Ireland, AI automation Ireland, AI consultancy, AI integration, workflow automation, AI for estate agents, AI for solicitors, eflip AI"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "eflip AI",
          "serviceType": "AI Consultancy & Implementation",
          "url": "https://eflip.ie/ai",
          "provider": { "@type": "Organization", "name": "eFlip", "url": "https://eflip.ie" },
          "areaServed": { "@type": "Country", "name": "Ireland" },
          "description":
            "We help local businesses adopt the right AI tools, connect them to your systems, and build time-saving workflows that support growth.",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
            { "@type": "ListItem", "position": 2, "name": "eflip AI", "item": "https://eflip.ie/ai" },
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
          <Sparkles className="w-3 h-3 text-primary" />
          EFLIP AI
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          EFLIP <span className="text-primary">AI</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground tracking-wider mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Practical AI solutions that help local businesses save time and grow.
        </motion.p>
        <motion.p
          className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          We help local businesses in Ireland find the right AI tools, connect them to their existing
          systems, and use them to save time, improve customer service, and grow — without the overwhelm.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="glow-orange tracking-widest">
            <Link to="/contact">BOOK A FREE DISCOVERY CALL</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="tracking-widest">
            <Link to="/services">VIEW ALL SERVICES</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* What is eflip AI */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-10">
            WHAT IS <span className="text-primary">EFLIP AI?</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Running a local business is demanding. Between serving customers, managing operations, and
              trying to grow, there's little time left to figure out which AI tools are actually worth using.
            </p>
            <p>
              eflip AI is our dedicated service that helps local businesses adopt AI in a practical,
              low-risk way. We act as your guide and implementation partner — assessing your business,
              recommending the most suitable AI tools, handling the integration with your current systems,
              and setting up workflows that deliver real results.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* How local businesses are using AI */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            HOW LOCAL BUSINESSES ARE <span className="text-primary">USING AI</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-10 text-xs">
            THE BIGGEST WINS IN 2026
          </p>
          <ul className="space-y-4">
            {usageWins.map((w) => (
              <li
                key={w}
                className="flex items-start gap-4 border border-border p-5 hover:border-primary transition-colors"
              >
                <Sparkles className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground text-center mt-8 tracking-wider">
            THE BEST RESULTS COME FROM A FEW WELL-CHOSEN TOOLS, PROPERLY CONNECTED TO HOW YOU ALREADY WORK.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Real examples by industry */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            REAL EXAMPLES BY <span className="text-primary">INDUSTRY</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            WHAT AI LOOKS LIKE IN YOUR SECTOR
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <ScrollReveal key={ind.title} delay={i * 0.12}>
              <div className="border border-border p-8 h-full hover:border-primary transition-colors">
                <ind.icon className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-lg font-bold tracking-widest mb-5">{ind.title}</h3>
                <ul className="space-y-3">
                  {ind.points.map((p) => (
                    <li key={p} className="flex gap-3 text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1">→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* What we do for you */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            WHAT WE <span className="text-primary">DO FOR YOU</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            CONSULTANCY + IMPLEMENTATION — YOU STAY IN CONTROL, WE HANDLE THE COMPLEXITY
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatWeDo.map((w, i) => (
            <ScrollReveal key={w.title} delay={i * 0.08}>
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

    {/* Key benefits */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-14">
            KEY <span className="text-primary">BENEFITS</span>
          </h2>
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

    {/* How it works */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            HOW IT <span className="text-primary">WORKS</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            A SIMPLE, PROVEN PROCESS
          </p>
        </ScrollReveal>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.08}>
              <div className="flex items-start gap-6 border border-border p-6 hover:border-primary transition-colors">
                <span className="text-primary text-2xl md:text-3xl font-bold tracking-widest shrink-0 w-14">
                  {s.step}
                </span>
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

    {/* Who it's for */}
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest mb-4">
            WHO IT'S <span className="text-primary">FOR</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Local businesses across Ireland — cafés, clinics, tradespeople, retail, service businesses,
            estate agents, solicitors, and accountants — who want practical results rather than hype.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest mb-6">
            READY TO BRING <span className="text-primary">AI</span> INTO YOUR BUSINESS?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute discovery call and we'll show you the biggest AI opportunities for your
            business — no jargon, no pressure.
          </p>
          <Button asChild size="lg" className="glow-orange tracking-widest">
            <Link to="/contact">BOOK A FREE DISCOVERY CALL</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default AI;
