import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Game Map Checkpoint Stations along the route
const STATIONS = [
  { id: "hero", num: "01", label: "START" },
  { id: "skills", num: "02", label: "STACK" },
  { id: "projects", num: "03", label: "BUILDS" },
  { id: "activity", num: "04", label: "STATS" },
  { id: "about", num: "05", label: "ABOUT" },
  { id: "contact", num: "06", label: "CONTACT" },
];

export default function ScrollRobotTrack() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 28 });
  const [activeStation, setActiveStation] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        Math.floor(latest * STATIONS.length),
        STATIONS.length - 1
      );
      setActiveStation(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Position along the vertical line follower track (0% to 100%)
  const botTop = useTransform(smoothProgress, [0, 1], ["2%", "94%"]);
  // Track fill percentage
  const trackHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <aside
      aria-label="Autonomous Line Follower Route"
      className="hidden xl:flex fixed left-1.5 2xl:left-3 top-0 bottom-0 z-40 pointer-events-none flex-col items-start justify-center select-none"
    >
      <div className="relative h-[65vh] flex flex-col justify-between pl-1">
        
        {/* ── Optical Line Follower Track (PCB Trace) ── */}
        <div className="absolute left-[11px] top-0 bottom-0 w-[2.5px] bg-[var(--color-border)] rounded-full pointer-events-none">
          {/* Active Illuminated Guide Line */}
          <motion.div
            className="w-full bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_var(--color-accent)]"
            style={{ height: trackHeight }}
          />
        </div>

        {/* ── Autonomous Line Follower Bot Traveling On Track ── */}
        <motion.div
          style={{ top: botTop }}
          className="absolute left-[0px] -translate-y-1/2 z-30 pointer-events-none transition-transform duration-75"
        >
          {/* Compact Precision Line Follower Robot Chassis SVG */}
          <svg width="24" height="30" viewBox="0 0 34 42" className="overflow-visible drop-shadow-[0_0_10px_var(--color-accent)]">
            {/* Robot Chassis */}
            <rect x="5" y="6" width="24" height="28" rx="4" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
            
            {/* Left Wheel */}
            <rect x="0" y="11" width="4" height="18" rx="2" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
            {/* Right Wheel */}
            <rect x="30" y="11" width="4" height="18" rx="2" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1" />
            
            {/* ATmega328P Microcontroller Chip */}
            <rect x="9" y="12" width="16" height="14" rx="2" fill="var(--color-surface-hover)" stroke="var(--color-accent)" strokeWidth="0.8" />
            <line x1="12" y1="15" x2="22" y2="15" stroke="var(--color-accent)" strokeWidth="1" />
            <line x1="12" y1="19" x2="22" y2="19" stroke="var(--color-accent)" strokeWidth="1" />
            <line x1="12" y1="23" x2="22" y2="23" stroke="var(--color-accent)" strokeWidth="1" />

            {/* Front IR Optical Sensors */}
            <circle cx="11" cy="37" r="2.5" fill="#F59E0B" className="animate-ping" />
            <circle cx="11" cy="37" r="2" fill="#F59E0B" />
            <circle cx="23" cy="37" r="2.5" fill="#F59E0B" className="animate-ping" />
            <circle cx="23" cy="37" r="2" fill="#F59E0B" />

            {/* IR Optical Sensor Beams Tracking the Line */}
            <line x1="11" y1="34" x2="11" y2="40" stroke="#F59E0B" strokeWidth="1.5" opacity="0.8" />
            <line x1="23" y1="34" x2="23" y2="40" stroke="#F59E0B" strokeWidth="1.5" opacity="0.8" />

            {/* Center Blinking Status LED */}
            <circle cx="17" cy="8" r="2" fill="var(--color-accent)" className="animate-pulse" />
          </svg>
        </motion.div>

        {/* ── Checkpoints / Nodes on the Line ── */}
        {STATIONS.map((st, i) => {
          const isPassed = activeStation >= i;
          const isCurrent = activeStation === i;

          return (
            <div
              key={st.id}
              onClick={() => {
                document.getElementById(st.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative flex items-center group pointer-events-auto cursor-pointer py-1"
            >
              {/* Checkpoint Node Marker aligned on optical track */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-20 ${
                  isCurrent
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] scale-125"
                    : isPassed
                    ? "bg-[var(--color-surface)] border-[var(--color-accent)]"
                    : "bg-[var(--color-bg)] border-[var(--color-border)] group-hover:border-[var(--color-accent)]"
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    isCurrent ? "bg-[var(--color-bg)]" : isPassed ? "bg-[var(--color-accent)]" : "bg-transparent"
                  }`}
                />
              </div>

              {/* Station Label: Compact floating pill tooltip (never covers page text) */}
              <div
                className={`absolute left-5 px-2 py-0.5 rounded border font-mono text-[10px] whitespace-nowrap transition-all duration-200 pointer-events-none shadow-md z-30 ${
                  isCurrent
                    ? "opacity-100 bg-[var(--color-surface)] border-[var(--color-accent)] text-[var(--color-accent)] font-bold translate-x-0"
                    : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 bg-[var(--color-surface)]/95 border-[var(--color-border)] text-[var(--color-text)] font-medium"
                }`}
              >
                <span>{st.num} // {st.label}</span>
              </div>
            </div>
          );
        })}

      </div>
    </aside>
  );
}