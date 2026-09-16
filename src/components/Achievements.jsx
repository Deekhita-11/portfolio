import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { achievements } from "../data/achievements";
import { FaTrophy, FaMedal, FaStar, FaRobot, FaCog } from "react-icons/fa";

const iconMap = { trophy: FaTrophy, medal: FaMedal, star: FaStar, robot: FaRobot, gear: FaCog };

const STATS = [
  { num: 6, suffix: "+", label: "PROTOTYPES", sub: "Web apps & robotics hardware" },
  { num: 4, suffix: "+", label: "COMPETITIONS", sub: "Hackathons & robotics meets" },
  { num: 3, suffix: "+", label: "CERTIFICATIONS", sub: "Verified technical programs" },
  { num: 2, suffix: "+", label: "YEARS RUNNING", sub: "Dedicated hands-on building" },
];

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Achievements() {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal();

  return (
    <section id="achievements" className="py-24 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[var(--color-border)]">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase">
                METRICS &amp; MILESTONES // SPEC 06
              </p>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                BENCHMARK METRICS
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--color-text-muted)]">
              AUDITED RECORDS // 2024
            </div>
          </div>

          {/* Number Counters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="technical-border rounded-xl p-6 md:p-8 text-center transition-all group"
                style={{ background: "var(--color-surface)" }}
              >
                <p
                  className="font-heading font-black leading-none mb-3 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  <CountUp target={s.num} suffix={s.suffix} />
                </p>
                <p className="font-mono text-xs font-bold tracking-widest text-[var(--color-accent)] mb-1 uppercase">
                  {s.label}
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono leading-tight">
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Expand Toggle */}
          <div className="text-center mb-8">
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs font-bold tracking-wider text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span>{open ? "COLLAPSE HONORS & AWARDS" : "INSPECT RECORDED CITATIONS"}</span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                ↓
              </motion.span>
            </button>
          </div>

          {/* Expandable Citations */}
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
              {achievements.map((item) => {
                const Icon = iconMap[item.icon] || FaStar;
                return (
                  <div
                    key={item.id}
                    className="technical-border rounded-xl p-5 flex items-start gap-4 transition-all"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <span className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="font-bold text-sm text-[var(--color-text)] leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {item.subtitle}
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] font-bold text-[var(--color-accent)]">
                        {item.year}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
