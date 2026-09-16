import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Returns tilt-related motion values + event handlers.
 * Apply style={{ rotateX, rotateY, transformPerspective: 900 }} to a motion.div.
 */
export function useTilt(maxDeg = 5) {
  const ref = useRef(null);

  // Raw mouse position (-0.5 to 0.5 range)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed values — spring back to 0 on mouse leave
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.6 });

  const rotateY = useTransform(x, [-0.5, 0.5], [-maxDeg, maxDeg]);
  const rotateX = useTransform(y, [-0.5, 0.5], [maxDeg, -maxDeg]);

  // Glare position (percentage)
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, rotateX, rotateY, glareX, glareY, onMouseMove, onMouseLeave };
}
