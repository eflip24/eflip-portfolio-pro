import { motion } from "framer-motion";
import {
  Printer,
  CreditCard,
  FileText,
  BookOpen,
  Megaphone,
  Package,
  UtensilsCrossed,
  Palette,
  Layers,
  ClipboardList,
  PencilRuler,
  MessageSquare,
  FileCheck,
  Send,
  ShieldCheck,
  Handshake,
  Zap,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const services = [
  { icon: CreditCard, title: "BUSINESS CARDS", desc: "STANDARD, PREMIUM, AND DOUBLE-SIDED DESIGNS." },
  { icon: FileText, title: "FLYERS & LEAFLETS", desc: "SINGLE OR DOUBLE-SIDED, VARIOUS SIZES." },
  { icon: BookOpen, title: "BROCHURES & BOOKLETS", desc: "MULTI-PAGE DOCUMENTS WITH PROFESSIONAL LAYOUT." },
  { icon: Megaphone, title: "POSTERS & BANNERS", desc: "LARGE FORMAT GRAPHICS FOR EVENTS AND RETAIL." },
  { icon: Package, title: "PACKAGING & LABELS", desc: "CUSTOM DESIGNS FOR BOXES, STICKERS, AND LABELS." },
  { icon: UtensilsCrossed, title: "MENUS & SIGNAGE", desc: "FOR RESTAURANTS, CAFES, AND RETAIL SPACES." },
  { icon: Palette, title: "CANVA TO PRINT-READY", desc: "CONVERT CANVA DESIGNS INTO PROFESSIONAL PRINT FILES." },
  { icon: Layers, title: "CUSTOM PRINT PROJECTS", desc: "ANYTHING PRINT-RELATED YOUR LOCAL PRINTER CAN PRODUCE." },
];

const canvaFixes = [
  "Setting correct bleed and margins",
  "Converting colours to CMYK",
  "Ensuring high resolution (300 DPI)",
  "Fixing fonts and spacing issues",
  "Preparing the correct file format (PDF)",
];

const steps = [
  { step: "01", title: "BRIEF & REQUIREMENTS", desc: "WE DISCUSS YOUR PROJECT, AUDIENCE, AND PRINTER SPECIFICATIONS." },
  { step: "02", title: "DESIGN CONCEPTS", desc: "WE CREATE INITIAL DESIGN OPTIONS BASED ON YOUR BRIEF AND BRAND." },
  { step: "03", title: "REVISIONS", desc: "YOU PROVIDE FEEDBACK AND WE REFINE UNTIL YOU'RE HAPPY." },
  { step: "04", title: "PRINT-READY PREPARATION", desc: "WE FINALISE FILES WITH PROPER TECHNICAL SPECIFICATIONS." },
  { step: "05", title: "FILE DELIVERY", desc: "YOU RECEIVE PRINT-READY FILES TO SEND TO ANY LOCAL PRINTER." },
];

const benefits = [
  { icon: ShieldCheck, title: "PROFESSIONAL STANDARDS", desc: "FILES ALWAYS PREPARED TO PROPER PRINT SPECIFICATIONS." },
  { icon: Printer, title: "PRINTER-READY", desc: "WE UNDERSTAND EXACTLY WHAT LOCAL PRINTERS NEED." },
  { icon: Zap, title: "FAST TURNAROUND", desc: "QUICK ON BOTH DESIGN AND FILE PREPARATION." },
  { icon: MessageSquare, title: "CLEAR COMMUNICATION", desc: "STAY INFORMED THROUGHOUT THE PROJECT." },
  { icon: Sparkles, title: "NEW OR CANVA FIXES", desc: "SUPPORT FOR BOTH NEW DESIGNS AND CANVA CONVERSIONS." },
  { icon: Handshake, title: "FLEXIBLE SERVICE", desc: "FROM ONE-OFF PROJECTS TO REGULAR PRINT WORK." },
];

const projectTable = [
  { type: "BUSINESS CARDS", uses: "Networking, staff, promotions", turn: "2–4 DAYS" },
  { type: "FLYERS & LEAFLETS", uses: "Marketing, events, offers", turn: "3–5 DAYS" },
  { type: "BANNERS & POSTERS", uses: "Shop displays, events, exhibitions", turn: "3–5 DAYS" },
  { type: "PRODUCT PACKAGING", uses: "Custom boxes, labels, stickers", turn: "5–7 DAYS" },
  { type: "BROCHURES & BOOKLETS", uses: "Services, menus, company profiles", turn: "5–7 DAYS" },
  { type: "CANVA FILE CONVERSION", uses: "Fixing existing designs for print", turn: "1–3 DAYS" },
];

const PrintDesign = () => (
  <Layout>
    <SEOHead
      title="Print Design Ireland — Print-Ready Graphic Design"
      description="Professional print design in Ireland. We design and prepare print-ready files for flyers, business cards, banners, packaging, brochures, and Canva-to-print conversions."
      keywords="print design Ireland, print-ready files, business card design, flyer design, brochure design, packaging design, Canva to print, CMYK PDF, local printer design"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Print Design",
          "serviceType": "Graphic & Print Design",
          "url": "https://eflip.ie/print-design",
          "provider": { "@type": "Organization", "name": "eFlip", "url": "https://eflip.ie" },
          "areaServed": { "@type": "Country", "name": "Ireland" },
          "description":
            "Professional graphic design and print-ready file preparation for business cards, flyers, brochures, banners, packaging, and Canva-to-print conversions.",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
            { "@type": "ListItem", "position": 2, "name": "Print Design", "item": "https://eflip.ie/print-design" },
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
          <Printer className="w-3 h-3 text-primary" />
          PRINT DESIGN
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-widest mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          PRINT <span className="text-primary">DESIGN</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground tracking-wider mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Professional graphic design, ready for print.
        </motion.p>
        <motion.p
          className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          We design and prepare high-quality print-ready files for flyers, business cards, banners,
          packaging, and more — so you can take them straight to any local printer with confidence.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="glow-orange tracking-widest">
            <Link to="/contact">GET A QUOTE</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="tracking-widest">
            <Link to="/portfolio">VIEW OUR WORK</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* What we offer */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-10">
            WHAT WE <span className="text-primary">OFFER</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              We provide complete graphic design services with a strong focus on print production. Whether
              you need something simple like business cards or more complex items like product packaging
              and large-format banners, we handle both the creative design and the technical preparation.
            </p>
            <p>
              Our files are always delivered print-ready — meeting professional standards (correct bleed,
              CMYK colour mode, high resolution, and proper file formats). This saves you time, money, and
              avoids common printing issues.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Services we provide */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            SERVICES WE <span className="text-primary">PROVIDE</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            EVERYTHING YOUR LOCAL PRINTER CAN PRODUCE
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.06}>
              <div className="border border-border p-7 h-full hover:border-primary transition-colors">
                <s.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-sm font-bold tracking-widest mb-3">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed tracking-wider">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Canva to Print-Ready */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            CANVA TO <span className="text-primary">PRINT-READY</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-10 text-xs">
            WE FIX WHAT PRINTERS OFTEN REJECT
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 text-center">
            Many businesses start their designs in Canva, but Canva files often need technical adjustments
            before printing. We specialise in converting Canva designs into proper print-ready files by:
          </p>
          <ul className="space-y-4">
            {canvaFixes.map((c) => (
              <li
                key={c}
                className="flex items-start gap-4 border border-border p-5 hover:border-primary transition-colors"
              >
                <Palette className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground text-center mt-8 tracking-wider">
            IDEAL IF YOU'VE ALREADY CREATED SOMETHING IN CANVA BUT WANT IT TO PRINT PROFESSIONALLY.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Our design process */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            OUR DESIGN <span className="text-primary">PROCESS</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-14 text-xs">
            FROM BRIEF TO PRINT-READY FILES
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

    {/* Why choose eflip */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-14">
            WHY CHOOSE <span className="text-primary">EFLIP</span>
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

    {/* Who it's for */}
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest mb-4">
            WHO IT'S <span className="text-primary">FOR</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Small businesses and startups, local shops, cafes and restaurants, tradespeople, event
            organisers, and anyone who wants professional-looking print materials without the hassle of
            technical file preparation.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Common projects table */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center mb-4">
            COMMON PRINT <span className="text-primary">PROJECTS</span>
          </h2>
          <p className="text-center text-muted-foreground tracking-wider mb-10 text-xs">
            TYPICAL USES AND TURNAROUND TIMES
          </p>
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-5 py-4 text-[10px] md:text-xs font-bold tracking-widest text-primary">PROJECT TYPE</th>
                  <th className="px-5 py-4 text-[10px] md:text-xs font-bold tracking-widest text-primary">COMMON USES</th>
                  <th className="px-5 py-4 text-[10px] md:text-xs font-bold tracking-widest text-primary">TURNAROUND</th>
                </tr>
              </thead>
              <tbody>
                {projectTable.map((row) => (
                  <tr key={row.type} className="border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 text-xs md:text-sm font-bold tracking-widest">{row.type}</td>
                    <td className="px-5 py-4 text-xs md:text-sm text-muted-foreground leading-relaxed">{row.uses}</td>
                    <td className="px-5 py-4 text-xs md:text-sm tracking-widest text-muted-foreground">{row.turn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest mb-6">
            READY TO GET YOUR PRINT <span className="text-primary">MATERIALS</span> DESIGNED?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you have a clear idea or just need help getting started, we can guide you through the
            process — from concept to print-ready files.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glow-orange tracking-widest">
              <Link to="/contact">REQUEST A QUOTE</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="tracking-widest">
              <Link to="/contact">BOOK A FREE CONSULTATION</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default PrintDesign;
