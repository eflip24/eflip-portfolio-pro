import { Link } from "react-router-dom";

const socialLinks = [
  { label: "INSTAGRAM", url: "https://instagram.com" },
  { label: "DRIBBBLE", url: "https://dribbble.com" },
  { label: "LINKEDIN", url: "https://linkedin.com" },
  { label: "X", url: "https://x.com" },
];

const Footer = () => (
  <footer className="border-t border-border bg-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <Link to="/">
            <img src="/logo.png" alt="eFLIP" className="h-8 w-auto" />
          </Link>
          <p className="text-muted-foreground text-xs tracking-wider mt-4 leading-relaxed">
            BOLD DESIGN FOR BOLD BRANDS. WE CREATE THE EXTRAORDINARY ACROSS WEB, GAMES, PRINT & VIDEO.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-bold tracking-widest mb-4 text-foreground">NAVIGATION</h3>
          <div className="flex flex-col gap-3 text-xs tracking-widest text-muted-foreground">
            <Link to="/portfolio" className="hover:text-primary transition-colors">PORTFOLIO</Link>
            <Link to="/services" className="hover:text-primary transition-colors">SERVICES</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">BLOG</Link>
            <Link to="/about" className="hover:text-primary transition-colors">ABOUT</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">CONTACT</Link>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xs font-bold tracking-widest mb-4 text-foreground">CONNECT</h3>
          <div className="flex flex-col gap-3 text-xs tracking-widest text-muted-foreground">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 text-center">
        <p className="text-[10px] text-muted-foreground tracking-widest">
          © {new Date().getFullYear()} eFLIP. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
