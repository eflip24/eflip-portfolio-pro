import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const StickyCTA = () => {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const y = window.scrollY;
      const bottom = document.body.scrollHeight - window.innerHeight - y;
      setShow(y > window.innerHeight * 0.9 && bottom > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold tracking-widest text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-shadow"
          >
            START A PROJECT
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
