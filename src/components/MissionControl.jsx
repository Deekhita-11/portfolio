import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SYSTEMS = [
  { label: "WEB SYSTEMS", status: "ONLINE",     color: "#A5B89B" },
  { label: "ROBOTICS LAB", status: "CALIBRATED", color: "#A5B89B" },
  { label: "EMBEDDED MCU", status: "ACTIVE",    color: "#969891" },
];

const LOG_ENTRIES = [
  "ATmega328P optical polling loop verified: 50Hz",
  "Differential drive PWM calibration: 85/85 balance",
  "React virtual DOM hydration completed without error",
  "MySQL query latency nominal: 1.4ms",
  "All test bench subsystems reporting operational",
];

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs font-semibold text-[var(--color-text-muted)]">{time} IST</span>;
}

function TypeWriter({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return <>{displayed}<span className="animate-pulse text-[var(--color-accent)]">_</span></>;
}

function LogFeed() {
  const [entries, setEntries] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => {
        const next = (i + 1) % LOG_ENTRIES.length;
        setEntries((prev) => {
          const updated = [...prev, `[BENCH-01] ${LOG_ENTRIES[i]}`];
          return updated.length > 4 ? updated.slice(-4) : updated;
        });
        return next;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-1 min-h-[72px]">
      {entries.map((e, i) => (
        <motion.p
          key={`${i}-${e}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[11px] text-[var(--color-text-muted)]"
        >
          {e}
        </motion.p>
      ))}
    </div>
  );
}

export default function MissionControl() {
  const ref = useScrollReveal();

  return (
    <section className="py-24 border-t border-[var(--color-border)]" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-8 uppercase">
          TEST BENCH TELEMETRY // SPEC 08
        </p>

        <div ref={ref} className="reveal max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="technical-border rounded-xl overflow-hidden shadow-sm"
            style={{ background: "var(--color-bg)" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-widest text-[var(--color-text)] uppercase">
                  WORKSTATION STATUS LEDGER
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock />
                <span className="w-px h-3.5 bg-[var(--color-border)]" />
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)] tracking-widest">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* System status indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SYSTEMS.map((sys, i) => (
                  <motion.div
                    key={sys.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-lg p-4 border border-[var(--color-border)] bg-[var(--color-surface)]"
                  >
                    <p className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider mb-2">
                      {sys.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: sys.color }}
                      />
                      <span
                        className="font-mono text-[11px] font-bold tracking-wider"
                        style={{ color: sys.color }}
                      >
                        {sys.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-[var(--color-border)]" />

              {/* Current Objective */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] mb-2 uppercase">
                    CURRENT EXPERIMENT
                  </p>
                  <p className="font-heading font-black text-lg text-[var(--color-text)] uppercase">
                    Blood Bank Logistics &amp; Dispatch Platform
                  </p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
                    <TypeWriter text="React · Vite · Tailwind · MySQL Backend" delay={400} />
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] mb-2 uppercase">
                    DEPLOYMENT PIPELINE
                  </p>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    {["SCHEMATIC", "PROTOTYPE", "BENCH TEST", "RELEASE"].map((step, i) => (
                      <React.Fragment key={step}>
                        <span
                          className={`font-bold ${
                            i <= 2 ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                          }`}
                        >
                          {step}
                        </span>
                        {i < 3 && <span className="text-[var(--color-border)]">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--color-border)]" />

              {/* Real-time Event Feed */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] mb-2 uppercase">
                  WORKSTATION TELEMETRY STREAM
                </p>
                <LogFeed />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
