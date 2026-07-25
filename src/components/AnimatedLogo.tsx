import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Pixel-build logo. On desktop, orange pixel squares fly in and snap
 * into the eFlip logo; a subtle idle shimmer plays on the accent square.
 * On mobile or with reduced motion, we render a plain fade-in of the
 * static logo image — no per-frame work.
 */
const AnimatedLogo = ({ className = "" }: { className?: string }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animate = !isMobile && !prefersReducedMotion;

  if (!animate) {
    return (
      <motion.img
        src="/logo.png"
        alt="eFlip — Creative Design Agency in Ireland"
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    );
  }

  // 6x6 grid of pixel squares that snap in from random offsets, then reveal the real logo.
  const gridSize = 6;
  const pixels = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className={`relative ${className}`}>
      {/* Pixel build layer — fades out once logo is revealed */}
      {mounted && (
        <motion.div
          className="absolute inset-0 grid pointer-events-none"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.1, duration: 0.35 }}
        >
          {pixels.map((i) => {
            const dx = (Math.random() - 0.5) * 400;
            const dy = (Math.random() - 0.5) * 400;
            const delay = (i / pixels.length) * 0.5;
            return (
              <motion.div
                key={i}
                className="bg-primary/80"
                style={{ margin: 2 }}
                initial={{ x: dx, y: dy, opacity: 0, scale: 0.4 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </motion.div>
      )}

      {/* Real logo — fades in as pixels dissolve */}
      <motion.img
        src="/logo.png"
        alt="eFlip — Creative Design Agency in Ireland"
        className="relative w-full h-full object-contain"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, duration: 0.55, ease: "easeOut" }}
      />

      {/* Idle shimmer sweep over the logo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.35) 50%, transparent 60%)",
          mixBlendMode: "screen",
        }}
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: "120%", opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 1.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedLogo;
