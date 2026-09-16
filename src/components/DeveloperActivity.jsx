import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { fetchGitHubData } from "../utils/githubApi";
import { fetchLeetCodeData } from "../utils/leetcodeApi";

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   Counts from 0 → target when scrolled into view (ease-out cubic)
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, duration = 800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value == null) return;
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{value != null ? display.toLocaleString() : "—"}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   SKELETON LOADER
   Pulsing placeholder for loading states
   ═══════════════════════════════════════════════════════════════ */
function Skeleton({ width = "100%", height = "1rem", className = "" }) {
  return (
    <div
      className={`rounded bg-[var(--color-surface-hover)] animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTRIBUTION GRAPH
   Interactive grid that builds itself on scroll
   ═══════════════════════════════════════════════════════════════ */
function ContributionGraph({ contributions }) {
  const ref = useRef(null);
  const graphRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const levelColors = [
    "var(--color-surface-hover)",
    "rgba(165, 184, 155, 0.2)",
    "rgba(165, 184, 155, 0.45)",
    "rgba(165, 184, 155, 0.7)",
    "var(--color-accent)",
  ];

  // Organize into weeks (columns of 7 days each)
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, Math.min(i + 7, contributions.length)));
  }

  const handleMouseEnter = useCallback((day, e) => {
    const rect = graphRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 44,
      });
    }
    setHovered(day);
  }, []);

  if (!contributions.length) {
    return (
      <div className="py-8 text-center">
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          CONTRIBUTION GRAPH UNAVAILABLE
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Day labels */}
      <div className="flex">
        <div className="flex flex-col justify-between mr-2 py-[2px]" style={{ height: `${7 * 11 + 6 * 3}px` }}>
          {["", "M", "", "W", "", "F", ""].map((d, i) => (
            <span key={i} className="font-mono text-[9px] text-[var(--color-text-muted)] leading-[11px]">
              {d}
            </span>
          ))}
        </div>

        <div ref={graphRef} className="flex gap-[3px] overflow-x-auto scrollbar-none py-[2px] relative">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px] flex-shrink-0">
              {week.map((day, di) => {
                const cellIndex = wi * 7 + di;
                return (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: cellIndex * 0.004,
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-transform duration-150 hover:scale-[1.6] hover:z-10 relative"
                    style={{
                      backgroundColor: levelColors[day.level] || levelColors[0],
                    }}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </div>
          ))}

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute pointer-events-none z-20 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg"
                style={{
                  left: tooltipPos.x,
                  top: tooltipPos.y,
                  transform: "translateX(-50%)",
                }}
              >
                <p className="font-mono text-[10px] text-[var(--color-text)] whitespace-nowrap">
                  <span className="text-[var(--color-accent)] font-bold">
                    {hovered.count}
                  </span>{" "}
                  contribution{hovered.count !== 1 ? "s" : ""} on{" "}
                  <span className="text-[var(--color-text-muted)]">
                    {new Date(hovered.date + "T00:00:00").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STAT ROW (for LeetCode terminal)
   ═══════════════════════════════════════════════════════════════ */
function StatRow({ label, value, highlight = false, color }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color-text-muted)] tracking-wider">{label}</span>
      <span
        className={`font-bold ${highlight ? "text-lg" : "text-sm"}`}
        style={{ color: color || (highlight ? "var(--color-accent)" : "var(--color-text)") }}
      >
        {value != null ? <AnimatedCounter value={value} /> : "—"}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEETCODE TERMINAL CARD
   ═══════════════════════════════════════════════════════════════ */
function LeetCodeCard({ data, loading }) {
  const username = data?.username || "Deekhita";

  return (
    <div
      className="rounded-xl border border-[var(--color-border)] overflow-hidden h-full flex flex-col transition-colors hover:border-[var(--color-accent)]"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="flex items-center gap-2.5">
          <SiLeetcode className="text-[var(--color-accent)]" size={14} />
          <span className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider">
            LEETCODE / 01
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="px-5 py-5 font-mono text-xs flex-1 flex flex-col">
        {/* Command prompt */}
        <p className="text-[var(--color-text-muted)] mb-4">
          <span className="text-[var(--color-accent)]">$</span> fetch_profile(&quot;
          <span className="text-[var(--color-text)]">{username}</span>&quot;)
        </p>

        <div className="w-full h-px bg-[var(--color-border)] mb-4" />

        {loading ? (
          <div className="space-y-3 flex-1">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} height="14px" width={`${55 + Math.random() * 40}%`} />
            ))}
          </div>
        ) : (
          <div className="space-y-2.5 flex-1">
            <StatRow label="RANK" value={data?.ranking} />
            <StatRow label="SOLVED" value={data?.totalSolved} highlight />

            <div className="w-full h-px bg-[var(--color-border)] my-3" />

            <StatRow label="EASY" value={data?.easySolved} color="#4ade80" />
            <StatRow label="MEDIUM" value={data?.mediumSolved} color="#facc15" />
            <StatRow label="HARD" value={data?.hardSolved} color="#f87171" />

            {data?.contestRating != null && (
              <>
                <div className="w-full h-px bg-[var(--color-border)] my-3" />
                <StatRow label="CONTEST RATING" value={data.contestRating} />
              </>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-5">
          <a
            href={`https://leetcode.com/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-mono text-xs font-bold hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors w-full justify-center"
          >
            VIEW LEETCODE →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GITHUB CARD
   ═══════════════════════════════════════════════════════════════ */
function GitHubCard({ data, loading }) {
  const username = data?.username || "deekhitabohidar";

  return (
    <div
      className="rounded-xl border border-[var(--color-border)] overflow-hidden h-full flex flex-col transition-colors hover:border-[var(--color-accent)]"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="flex items-center gap-2.5">
          <FaGithub className="text-[var(--color-accent)]" size={14} />
          <span className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider">
            GITHUB / 02
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
          BUILDING IN PUBLIC
        </span>
      </div>

      <div className="px-5 py-5 flex-1 flex flex-col">
        {loading ? (
          <div className="space-y-4 flex-1">
            <Skeleton height="48px" width="140px" />
            <Skeleton height="100px" />
            <div className="flex gap-4">
              <Skeleton height="40px" className="flex-1" />
              <Skeleton height="40px" className="flex-1" />
            </div>
          </div>
        ) : (
          <>
            {/* Big Contribution Count */}
            <div className="mb-6">
              <div className="text-4xl md:text-5xl font-heading font-black text-[var(--color-text)] leading-none mb-1">
                <AnimatedCounter value={data?.totalContributions} duration={1200} />
              </div>
              <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider uppercase">
                CONTRIBUTIONS THIS YEAR
              </p>
            </div>

            {/* Interactive Contribution Graph */}
            <div className="mb-6 pb-5 border-b border-[var(--color-border)]">
              <ContributionGraph contributions={data?.contributions || []} />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <div className="text-xl font-heading font-bold text-[var(--color-text)]">
                  <AnimatedCounter value={data?.repos} />
                </div>
                <p className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
                  REPOSITORIES
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <div className="text-xl font-heading font-bold text-[var(--color-text)]">
                  <AnimatedCounter value={data?.followers} />
                </div>
                <p className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
                  FOLLOWERS
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-accent)] text-[#121313] font-mono text-xs font-bold hover:opacity-90 transition-opacity w-full justify-center"
              >
                <FaGithub size={14} /> VIEW GITHUB →
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RECENT ACTIVITY FEED
   ═══════════════════════════════════════════════════════════════ */
function RecentActivity({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-border)]">
        <span className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider uppercase">
          RECENT ACTIVITY
        </span>
        <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
          {events.length} EVENTS
        </span>
      </div>

      <div className="space-y-1">
        {events.map((event, i) => {
          const date = new Date(event.date);
          const dateStr = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <motion.div
              key={`${event.date}-${event.repo}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="flex items-start gap-4 py-2.5 group"
            >
              <span className="font-mono text-xs text-[var(--color-text-muted)] min-w-[56px] font-medium uppercase pt-0.5">
                {dateStr}
              </span>

              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)] mt-1.5 flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors" />

              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-[var(--color-text)] truncate">
                  {event.desc} to{" "}
                  <span className="text-[var(--color-accent)] font-bold">
                    {event.repo}
                  </span>
                </p>
                {event.commits > 0 && (
                  <p className="font-mono text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    └─ {event.commits} commit{event.commits !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SYSTEM STATUS INDICATOR
   Pulsing dots showing API connectivity
   ═══════════════════════════════════════════════════════════════ */
function SystemStatus({ github, leetcode, loading }) {
  const ghOnline = github?.loaded;
  const lcOnline = leetcode?.loaded;

  return (
    <div className="flex flex-wrap items-center gap-6 mb-8 py-3 px-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
      <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider mr-2">
        SYSTEM STATUS
      </span>

      <div className="flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            loading
              ? "bg-[var(--color-text-muted)] animate-pulse"
              : ghOnline
                ? "bg-[var(--color-accent)] animate-pulse"
                : "bg-red-400"
          }`}
        />
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
          GITHUB {loading ? "CONNECTING" : ghOnline ? "ONLINE" : "OFFLINE"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            loading
              ? "bg-[var(--color-text-muted)] animate-pulse"
              : lcOnline
                ? "bg-[var(--color-accent)] animate-pulse"
                : "bg-red-400"
          }`}
        />
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
          LEETCODE {loading ? "CONNECTING" : lcOnline ? "ONLINE" : "OFFLINE"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
          PORTFOLIO ONLINE
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION — DEVELOPER ACTIVITY
   ═══════════════════════════════════════════════════════════════ */
export default function DeveloperActivity() {
  const revealRef = useScrollReveal();
  const [github, setGitHub] = useState(null);
  const [leetcode, setLeetCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([fetchGitHubData(), fetchLeetCodeData()])
      .then(([ghResult, lcResult]) => {
        if (!mounted) return;
        if (ghResult.status === "fulfilled") setGitHub(ghResult.value);
        if (lcResult.status === "fulfilled") setLeetCode(lcResult.value);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="activity"
      className="py-24 border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={revealRef} className="reveal">
          {/* ── Section Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[var(--color-border)]">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase">
                DEVELOPER ACTIVITY // 05
              </p>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                CODE / ACTIVITY
              </h2>
              <p className="font-mono text-sm text-[var(--color-text-muted)] tracking-wider mt-2 uppercase">
                BUILDING · SOLVING · CONTRIBUTING
              </p>
            </div>

            <div className="font-mono text-[10px] text-[var(--color-text-muted)]">
              DATA REFRESHES EVERY 30 MIN
            </div>
          </div>

          {/* ── System Status ── */}
          <SystemStatus github={github} leetcode={leetcode} loading={loading} />

          {/* ── Main Grid: LeetCode (5 cols) | GitHub (7 cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <LeetCodeCard data={leetcode} loading={loading} />
            </div>
            <div className="lg:col-span-7">
              <GitHubCard data={github} loading={loading} />
            </div>
          </div>

          {/* ── Recent Activity Feed ── */}
          {!loading && github?.recentEvents?.length > 0 && (
            <RecentActivity events={github.recentEvents} />
          )}
        </div>
      </div>
    </section>
  );
}
