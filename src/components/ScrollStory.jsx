import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ROWS = [
  { text: "WEB SYSTEMS", dir: 1 },
  { text: "ROBOTICS", dir: -1 },
  { text: "EMBEDDED HARDWARE", dir: 1 },
  { text: "AUTOMATION", dir: -1 },
];

export default function ScrollStory() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xValues = ROWS.map((row, i) => {
    const start = i * 0.22;
    const end = start + 0.22;
    return useTransform(
      scrollYProgress,
      [Math.min(start, 0.95), Math.min(end, 1)],
      [`${row.dir * 110}%`, "0%"]
    );
  });

  const opacities = ROWS.map((_, i) => {
    const start = i * 0.22;
    const end = start + 0.22;
    return useTransform(
      scrollYProgress,
      [Math.min(start, 0.95), Math.min(end, 1)],
      [0, 1]
    );
  });

  return (
    <div ref={containerRef} style={{ height: "450vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden px-6 md:px-16" style={{ background: "var(--color-bg)" }}>
        {/* Section Stamp */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <p className="font-mono text-[var(--color-accent)] text-xs tracking-[0.25em] font-semibold uppercase">
            ENGINEERING CAPABILITIES // SCOPE
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 w-full">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.text}
              style={{ x: xValues[i], opacity: opacities[i] }}
              className={`font-heading font-black uppercase text-[clamp(2.5rem,8vw,6.5rem)] leading-none tracking-[-0.02em] ${
                i % 2 === 0
                  ? "text-[var(--color-text)]"
                  : "text-transparent"
              }`}
              {...(i % 2 !== 0
                ? {
                    style: {
                      x: xValues[i],
                      opacity: opacities[i],
                      WebkitTextStroke: "1.5px var(--color-accent)",
                      color: "transparent",
                    },
                  }
                : {})}
            >
              {row.text}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-mono text-xs text-[var(--color-text-muted)] mt-12 tracking-widest uppercase flex items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        >
          <span>SCROLL TO TRAVERSE SCHEMATICS</span>
          <span>↓</span>
        </motion.p>
      </div>
    </div>
  );
}
