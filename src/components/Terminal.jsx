import React, { useEffect, useRef, useState } from "react";

const LINES = [
  { type: "path", text: "~/deekhita/workbench" },
  { type: "spacer" },
  { type: "cmd", text: "whoami" },
  { type: "out", text: "deekhita_bohidar // b.tech cse @ xim" },
  { type: "spacer" },
  { type: "cmd", text: "cat active_modules.txt" },
  { type: "out", text: "[01] autonomous_robotics: line_follower.ino" },
  { type: "out", text: "[02] fullstack_web: react_vite_mysql" },
  { type: "out", text: "[03] systems_programming: c_cpp_embedded" },
  { type: "spacer" },
  { type: "cmd", text: "check_status" },
  { type: "out", text: "STATUS: BENCH_ACTIVE // READY_TO_BUILD", accent: true },
  { type: "spacer" },
  { type: "cursor" },
];

export default function Terminal() {
  const ref = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= LINES.length) return;
    const line = LINES[visibleCount];
    const delay =
      line.type === "spacer" ? 70 :
      line.type === "cursor" ? 0 :
      line.type === "cmd" ? 380 :
      220;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [started, visibleCount]);

  return (
    <section className="py-20" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="max-w-2xl mx-auto">
          {/* Engineering Shell Console */}
          <div
            className="technical-border rounded-xl overflow-hidden shadow-sm"
            style={{ background: "#202020" }}
          >
            {/* Console Title Bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b border-[#383838]"
              style={{ background: "#181818" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#969891]/40" />
                <span className="ml-3 font-mono text-[11px] text-[#A0A098]">
                  tty1 // deekhita-workstation
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#A0A098]">BASH 5.2</span>
            </div>

            {/* Console Content */}
            <div className="p-6 min-h-[300px] font-mono text-xs">
              {LINES.slice(0, visibleCount).map((line, i) => {
                if (line.type === "spacer") return <div key={i} className="h-2.5" />;
                if (line.type === "cursor") {
                  return (
                    <span
                      key={i}
                      className="inline-block w-2 h-4 bg-[var(--color-accent)] animate-pulse"
                    />
                  );
                }
                if (line.type === "path") {
                  return (
                    <p key={i} className="text-[#A0A098] mb-1">
                      <span className="text-[var(--color-accent)] font-bold mr-2">›</span>
                      <span className="text-[#F4F1EA] font-semibold">{line.text}</span>
                    </p>
                  );
                }
                if (line.type === "cmd") {
                  return (
                    <p key={i} className="text-[#F4F1EA]">
                      <span className="text-[var(--color-accent)] mr-2 font-bold">$</span>
                      <span>{line.text}</span>
                    </p>
                  );
                }
                if (line.type === "out") {
                  return (
                    <p
                      key={i}
                      className={`pl-4 ${
                        line.accent
                          ? "text-[var(--color-accent)] font-bold tracking-wider"
                          : "text-[#C9C5BA]"
                      }`}
                    >
                      <span className="text-[#6B6B63] mr-2">→</span>
                      {line.text}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
