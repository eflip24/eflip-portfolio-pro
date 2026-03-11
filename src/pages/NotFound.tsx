import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Browse eFlip's portfolio or get in touch."
        noindex
      />
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            className="text-8xl md:text-[12rem] font-bold tracking-widest text-gradient mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-muted-foreground tracking-widest text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            THIS PAGE DOESN'T EXIST — YET.
          </motion.p>
          <motion.p
            className="text-muted-foreground/60 tracking-wider text-xs mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            MAYBE WE SHOULD DESIGN IT FOR YOU?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center"
          >
            <Button asChild variant="outline" className="tracking-widest text-xs">
              <Link to="/">
                <ArrowLeft className="mr-2" size={14} /> BACK HOME
              </Link>
            </Button>
            <Button asChild className="glow-orange tracking-widest text-xs">
              <Link to="/contact">GET IN TOUCH</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
