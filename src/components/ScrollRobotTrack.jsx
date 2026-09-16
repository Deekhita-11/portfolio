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
      className="hidden 2xl:flex fixed left-6 top-0 bottom-0 z-40 pointer-events-none flex-col items-start justify-center"
    >
      <div className="relative h-[72vh] flex flex-col justify-between pl-3">
        
        {/* ── Optical Line Follower Track (PCB Trace) ── */}
        <div className="absolute left-[18px] top-0 bottom-0 w-[4px] bg-[var(--color-border)] rounded-full pointer-events-none">
          {/* Active Illuminated Guide Line */}
          <motion.div
            className="w-full bg-[var(--color-accent)] rounded-full shadow-[0_0_10px_var(--color-accent)]"
            style={{ height: trackHeight }}
          />
        </div>

        {/* ── Autonomous Line Follower Bot Traveling On Track ── */}
        <motion.div
          style={{ top: botTop }}
          className="absolute left-[3px] -translate-y-1/2 z-30 pointer-events-none transition-transform duration-75"
        >
          {/* Realistic Line Follower Robot Chassis SVG */}
          <svg width="34" height="42" viewBox="0 0 34 42" className="overflow-visible drop-shadow-[0_0_12px_var(--color-accent)]">
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

            {/* Front IR Optical Sensors (Glowing down on the line) */}
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
              className="relative flex items-center group pointer-events-auto cursor-pointer pl-12 py-1.5"
            >
              {/* Checkpoint Node Marker */}
              <div
                className={`absolute left-[13px] w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isCurrent
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)] scale-110"
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

              {/* Station Label */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs font-bold transition-colors duration-200 ${
                    isCurrent
                      ? "text-[var(--color-accent)]"
                      : isPassed
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-text-light)] group-hover:text-[var(--color-text-muted)]"
                  }`}
                >
                  {st.num} // {st.label}
                </span>

                {isCurrent && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-accent)] text-[var(--color-accent)] font-bold">
                    BOT LOC
                  </span>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </aside>
  );
}