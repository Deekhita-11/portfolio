import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "hero", num: "01", label: "INTRO", pos: 0 },
  { id: "systems", num: "02", label: "WHAT I BUILD", pos: 0.15 },
  { id: "projects", num: "03", label: "PROJECTS", pos: 0.32 },
  { id: "stack", num: "04", label: "TECH STACK", pos: 0.50 },
  { id: "code", num: "05", label: "CODE", pos: 0.68 },
  { id: "about", num: "06", label: "ABOUT", pos: 0.83 },
  { id: "contact", num: "07", label: "CONTACT", pos: 0.96 },
];

export default function ScrollTracker() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 28 });
  const [currentSection, setCurrentSection] = useState(SECTIONS[0]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      let active = SECTIONS[0];
      for (let i = 0; i < SECTIONS.length; i++) {
        if (latest >= SECTIONS[i].pos - 0.08) {
          active = SECTIONS[i];
        }
      }
      setCurrentSection(active);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const drawnHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <aside
      aria-label="HUD Section Navigation"
      className="hidden 2xl:flex fixed left-8 top-0 bottom-0 z-40 pointer-events-none flex-col items-start justify-center"
    >
      <div className="relative h-[65vh] flex flex-col justify-between font-mono text-xs">
        {/* Continuous Guide Line */}
        <div className="absolute left-[3.5px] top-0 bottom-0 w-[1px] bg-[var(--color-border)]" />

        {/* Dynamic Self-Drawing Active Line */}
        <motion.div
          style={{ height: drawnHeight }}
          className="absolute left-[3px] top-0 w-[2px] bg-[var(--color-accent)] origin-top shadow-[0_0_8px_var(--color-border-glow)]"
        />

        {/* Traveling Coordinate Marker */}
        <motion.div
          style={{ top: dotTop }}
          className="absolute left-[1px] w-2 h-2 bg-[var(--color-accent)] -translate-y-1/2 shadow-[0_0_6px_var(--color-accent)] pointer-events-none"
        />

        {/* 7 Waypoint Nodes */}
        {SECTIONS.map((sec) => {
          const isActive = currentSection.id === sec.id;
          return (
            <div
              key={sec.id}
              className="relative flex items-center group pointer-events-auto cursor-pointer pl-6 select-none"
              onClick={() => {
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {/* Node Marker */}
              <div
                className={`absolute left-0 w-2 h-2 transition-all duration-200 border ${
                  isActive
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] scale-110"
                    : "bg-[var(--color-bg)] border-[var(--color-border)] group-hover:border-[var(--color-accent)]"
                }`}
              />

              {/* Node Label */}
              <div className="flex items-center gap-2">
                <span
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-accent)] font-bold"
                      : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"
                  }`}
                >
                  {sec.num} ─ {sec.label}
                </span>

                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[9px] px-1 py-0.5 border border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)]"
                  >
                    ● ACTIVE
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
