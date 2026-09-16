import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

// ─── Circuit-board-style rectangular spiral path ────────────────
// ViewBox: 0 0 900 400
const PATH_D =
  "M 40,200 L 160,200 Q 186,200 186,174 L 186,70 Q 186,46 212,46 L 688,46 Q 714,46 714,70 L 714,330 Q 714,354 688,354 L 212,354 Q 186,354 186,330 L 186,232 Q 186,206 212,206 L 860,206";

// ─── Robot top-down SVG ─────────────────────────────────────────
function Robot({ x, y, angle, progress }) {
  const glowing = progress > 0.98;
  return (
    <g transform={`translate(${x},${y}) rotate(${angle - 90})`}>
      {/* Outer glow halo */}
      <circle r={glowing ? 32 : 22} fill="rgba(20,184,166,0.12)" />

      {/* Left wheel */}
      <rect x="-22" y="-9" width="7" height="18" rx="3.5"
        fill="#0a0e1a" stroke="#334155" strokeWidth="1.2" />
      {/* Right wheel */}
      <rect x="15" y="-9" width="7" height="18" rx="3.5"
        fill="#0a0e1a" stroke="#334155" strokeWidth="1.2" />

      {/* Main body */}
      <rect x="-15" y="-13" width="30" height="26" rx="4"
        fill="#0D1220" stroke="#14B8A6" strokeWidth="1.5" />

      {/* PCB traces on body */}
      <line x1="-7" y1="-7" x2="7" y2="-7" stroke="#1E2D40" strokeWidth="1" />
      <line x1="-7" y1="-2" x2="7" y2="-2" stroke="#1E2D40" strokeWidth="1" />
      <line x1="-7" y1="3" x2="7" y2="3" stroke="#1E2D40" strokeWidth="1" />
      <line x1="-7" y1="8" x2="7" y2="8" stroke="#1E2D40" strokeWidth="1" />

      {/* Centre LED — blinks */}
      <circle cx="0" cy="-5" r="3.5" fill={glowing ? "#F59E0B" : "#14B8A6"}>
        <animate attributeName="opacity" values="1;0.35;1" dur="0.9s" repeatCount="indefinite" />
      </circle>

      {/* IR sensor pair at front */}
      <circle cx="-7" cy="15" r="4" fill="#F59E0B" opacity="0.9" />
      <circle cx="7" cy="15" r="4" fill="#F59E0B" opacity="0.9" />

      {/* Sensor beams */}
      <line x1="-7" y1="15" x2="-7" y2="22" stroke="#F59E0B" strokeWidth="1.5" opacity="0.55" />
      <line x1="7" y1="15" x2="7" y2="22" stroke="#F59E0B" strokeWidth="1.5" opacity="0.55" />

      {/* Arduino chip outline */}
      <rect x="-8" y="-11" width="16" height="10" rx="2"
        fill="none" stroke="#334155" strokeWidth="0.8" />
    </g>
  );
}

// ─── Corner tick marks along the path ─────────────────────────
const TICKS = [
  { x: 186, y: 200, angle: 0 },
  { x: 186, y: 46,  angle: 90 },
  { x: 714, y: 46,  angle: 90 },
  { x: 714, y: 354, angle: 0 },
  { x: 186, y: 354, angle: 0 },
  { x: 186, y: 206, angle: 0 },
];

const SPECS = [
  { label: "IR SENSORS", color: "#F59E0B" },
  { label: "ARDUINO UNO", color: "#14B8A6" },
  { label: "C / C++", color: "#818CF8" },
  { label: "MOTOR DRIVERS", color: "#10B981" },
];

export default function LineFollowerSection() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  const [robotPos, setRobotPos] = useState({ x: 40, y: 200, angle: 0 });
  const [pathProgress, setPathProgress] = useState(0);
  const [totalLength, setTotalLength] = useState(1);
  const [done, setDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cache total path length after mount
  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!pathRef.current || totalLength <= 1) return;
    const dist = Math.min(progress, 1) * totalLength;
    const pt = pathRef.current.getPointAtLength(dist);
    const eps = 1.5;
    const pt2 = pathRef.current.getPointAtLength(Math.min(dist + eps, totalLength));
    const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
    setRobotPos({ x: pt.x, y: pt.y, angle });
    setPathProgress(progress);
    setDone(progress > 0.98);
  });

  const traversedLength = Math.min(pathProgress, 1) * totalLength;
  const pct = Math.round(pathProgress * 100);

  return (
    <div ref={containerRef} style={{ height: "600vh" }}>
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "#070B14" }}
      >
        {/* Subtle grid bg */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.08 }}
          aria-hidden
        >
          <defs>
            <pattern id="lfgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14B8A6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lfgrid)" />
        </svg>

        {/* Header labels */}
        <div className="relative z-10 w-full max-w-5xl px-6 flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-border)] mb-1">
              SYSTEM ACTIVE
            </p>
            <h2
              className="font-heading font-black uppercase leading-none"
              style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "var(--color-text)" }}
            >
              LINE FOLLOWER&nbsp;
              <span style={{ color: "var(--color-accent)" }}>BOT</span>
            </h2>
          </div>

          {/* Progress counter */}
          <div className="text-right">
            <p className="font-mono text-xs text-[var(--color-text-muted)] mb-0.5">PATH PROGRESS</p>
            <p
              className="font-mono font-bold text-2xl"
              style={{ color: done ? "#F59E0B" : "var(--color-accent)" }}
            >
              {pct}%
            </p>
            {done && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[10px] tracking-widest text-[#F59E0B]"
              >
                ✓ SCAN COMPLETE
              </motion.p>
            )}
          </div>
        </div>

        {/* Main SVG canvas */}
        <div className="relative z-10 w-full max-w-5xl px-4">
          <svg
            viewBox="0 0 900 400"
            className="w-full"
            style={{ maxHeight: "55vh", overflow: "visible" }}
          >
            <defs>
              {/* Teal glow filter */}
              <filter id="tealglow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Robot shadow */}
              <filter id="rshadow">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#14B8A6" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* ── START marker ── */}
            <circle cx="40" cy="200" r="6" fill="none" stroke="#334155" strokeWidth="1.5" />
            <circle cx="40" cy="200" r="2" fill="#14B8A6" />
            <text x="40" y="222" fill="#475569" fontSize="9" fontFamily="monospace" textAnchor="middle">START</text>

            {/* ── END marker ── */}
            <line x1="860" y1="196" x2="860" y2="216" stroke="#334155" strokeWidth="2" />
            <line x1="854" y1="196" x2="866" y2="196" stroke="#334155" strokeWidth="1" />
            <text x="870" y="211" fill="#475569" fontSize="9" fontFamily="monospace">END</text>

            {/* ── Corner tick marks ── */}
            {TICKS.map((t, i) => (
              <circle
                key={i}
                cx={t.x} cy={t.y} r="4"
                fill="none" stroke="#1E2D40" strokeWidth="1.5"
              />
            ))}

            {/* ── Base path (faint track / tape) ── */}
            <path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Track edge lines */}
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />

            {/* ── Traversed path glow (wide blur layer) ── */}
            <path
              d={PATH_D}
              fill="none"
              stroke="#14B8A6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${traversedLength} ${totalLength}`}
              opacity="0.15"
              filter="url(#tealglow)"
            />

            {/* ── Traversed path sharp line ── */}
            <path
              d={PATH_D}
              fill="none"
              stroke="#14B8A6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${traversedLength} ${totalLength}`}
              filter="url(#tealglow)"
            />

            {/* ── Robot ── */}
            <g filter="url(#rshadow)">
              <Robot
                x={robotPos.x}
                y={robotPos.y}
                angle={robotPos.angle}
                progress={pathProgress}
              />
            </g>
          </svg>
        </div>

        {/* Spec badges */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-6">
          {SPECS.map((s) => (
            <span
              key={s.label}
              className="font-mono text-xs px-4 py-1.5 rounded-full"
              style={{
                border: `1px solid ${s.color}30`,
                color: s.color,
                background: `${s.color}10`,
              }}
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        {pathProgress < 0.05 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 font-mono text-[10px] tracking-[0.25em] text-[var(--color-border)]"
          >
            SCROLL TO DRIVE ↓
          </motion.p>
        )}
      </div>
    </div>
  );
}
