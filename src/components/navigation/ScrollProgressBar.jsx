import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none h-[2px] bg-transparent">
      {/* Background track line */}
      <div className="absolute inset-0 bg-[var(--color-border)]/40" />

      {/* Illuminated Progress Beam */}
      <motion.div
        style={{ scaleX }}
        className="h-full bg-[var(--color-accent)] origin-left shadow-[0_0_12px_var(--color-accent),0_0_4px_var(--color-accent-bright)]"
      />
    </div>
  );
}
