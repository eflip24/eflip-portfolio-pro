import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-background py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="text-xl font-bold tracking-widest text-primary">
          eFLIP
        </Link>
        <div className="flex gap-6 text-xs tracking-widest text-muted-foreground">
          <Link to="/portfolio" className="hover:text-primary transition-colors">PORTFOLIO</Link>
          <Link to="/services" className="hover:text-primary transition-colors">SERVICES</Link>
          <Link to="/about" className="hover:text-primary transition-colors">ABOUT</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">CONTACT</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} eFLIP. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
