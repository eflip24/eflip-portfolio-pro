import { ReactNode } from "react";
import { motion } from "framer-motion";

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
