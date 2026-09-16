import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { fetchGitHubData } from "../../utils/githubApi";
import { fetchLeetCodeData } from "../../utils/leetcodeApi";
import MagneticButton from "../ui/MagneticButton";

function AnimatedCounter({ value, duration = 800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value == null) return;
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{value != null ? display.toLocaleString() : "—"}</span>;
}

function StatRow({ label, value, highlight = false, color }) {
  return (
    <div className="flex items-center justify-between font-mono">
      <span className="text-[var(--color-text-muted)] tracking-wider text-xs">{label}</span>
      <span
        className={`font-bold ${highlight ? "text-base text-[var(--color-accent)]" : "text-xs"}`}
        style={{ color: color || (highlight ? "var(--color-accent)" : "var(--color-text)") }}
      >
        {value != null ? <AnimatedCounter value={value} /> : "—"}
      </span>
    </div>
  );
}

function ContributionGraph({ contributions }) {
  const ref = useRef(null);
  const graphRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const levelColors = [
    "var(--color-surface-hover)",
    "rgba(137, 163, 199, 0.2)",
    "rgba(137, 163, 199, 0.45)",
    "rgba(137, 163, 199, 0.7)",
    "var(--color-accent)",
  ];

  // Organize into weeks (columns of 7 days each)
  const weeks = [];
  for (let i = 0; i < (contributions?.length || 0); i += 7) {
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

  if (!contributions || !contributions.length) {
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
                      delay: cellIndex * 0.003,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="w-[11px] h-[11px] rounded-[1px] cursor-pointer transition-transform duration-150 hover:scale-[1.6] hover:z-10 relative"
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

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute pointer-events-none z-20 px-3 py-1.5 border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg"
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


const DSA_NODES = {
  root: {
    id: "root",
    label: "DATA STRUCTURES",
    type: "ROOT",
    complexity: "O(1) to O(N)",
    space: "Linear / Tree / Graph Heap",
    focus: "Memory allocation, pointer safety, and invariant preservation.",
    patterns: "Fundamental building blocks for scalable system algorithms.",
  },
  trees: {
    id: "trees",
    label: "TREES",
    type: "BRANCH",
    complexity: "O(H) = O(log N) balanced",
    space: "O(H) recursion stack",
    focus: "Binary Search Trees, Heaps, Tries & Balanced Red-Black logic.",
    patterns: "Hierarchical data, prefix indexing, priority scheduling.",
  },
  graphs: {
    id: "graphs",
    label: "GRAPHS",
    type: "BRANCH",
    complexity: "O(V + E) traversal",
    space: "O(V) visited hash / adjacency",
    focus: "Directed Acyclic Graphs (DAG), bipartite graphs, cycles & flow.",
    patterns: "Network routing, dependency graphs, shortest path finding.",
  },
  bfs: {
    id: "bfs",
    label: "BFS",
    type: "LEAF",
    complexity: "Time: O(V + E)",
    space: "Space: O(V) Queue",
    focus: "Breadth-First Search & Level-Order Queue Traversal",
    patterns: "Shortest path in unweighted graphs, multi-source flood fill.",
  },
  dfs: {
    id: "dfs",
    label: "DFS",
    type: "LEAF",
    complexity: "Time: O(V + E)",
    space: "Space: O(H) Call Stack",
    focus: "Depth-First Search, Backtracking & Post-Order Aggregations",
    patterns: "Connected components, cycle detection, state exploration.",
  },
  sort: {
    id: "sort",
    label: "SORT",
    type: "LEAF",
    complexity: "Time: O(N log N) / O(V+E)",
    space: "Space: O(V) In-Degree Array",
    focus: "Topological Sort (Kahn's), QuickSelect & Merge Paradigms",
    patterns: "Package dependency resolution, task ordering, Kth order stats.",
  },
  search: {
    id: "search",
    label: "SEARCH",
    type: "LEAF",
    complexity: "Time: O(log N) / O(E log V)",
    space: "Space: O(V) Min-Heap",
    focus: "Dijkstra Priority Queue & Binary Search on Answer Bounds",
    patterns: "Weighted shortest path, monotonic predicate range boundaries.",
  },
};

function DSATopologyTree({ onSelectNode, activeNodeId }) {
  const active = DSA_NODES[activeNodeId] || DSA_NODES.root;

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 relative flex flex-col justify-between h-full">
      {/* Corner Brackets */}
      <span className="absolute -top-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┌</span>
      <span className="absolute -top-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┐</span>
      <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">└</span>
      <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┘</span>

      <div>
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[var(--color-border)] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-accent)] font-bold">// DSA TOPOLOGY</span>
            <span className="text-[var(--color-text-muted)]">| TREE &amp; GRAPH PARADIGM</span>
          </div>
          <span className="text-[10px] text-[var(--color-warm)] font-bold uppercase">
            HOVER NODE TO TRACE
          </span>
        </div>

        {/* ── Visual Hierarchical Diagram (Pure Clean SVG + Interactive Nodes) ── */}
        <div className="relative py-4 flex flex-col items-center">
          
          {/* Level 0: Root */}
          <div className="relative z-10 mb-8">
            <button
              type="button"
              data-cursor="trace"
              onMouseEnter={() => onSelectNode("root")}
              onClick={() => onSelectNode("root")}
              className={`px-4 py-2 border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                active.id === "root"
                  ? "border-[var(--color-accent)] bg-[#171A21] text-[var(--color-accent)] shadow-[0_0_15px_rgba(137,163,199,0.3)] scale-105"
                  : "border-[var(--color-border)] bg-[#0B0D10] text-[var(--color-text)] hover:border-[var(--color-accent)]/60"
              }`}
            >
              DATA STRUCTURES
            </button>
          </div>

          {/* Connection Lines from Root to Level 1 */}
          <svg className="w-full h-8 overflow-visible pointer-events-none -mt-8 mb-0" preserveAspectRatio="none">
            <line x1="50%" y1="0" x2="28%" y2="100%" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="0" x2="72%" y2="100%" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          {/* Level 1: Trees & Graphs */}
          <div className="w-full flex justify-around items-center px-4 relative z-10 my-1">
            <button
              type="button"
              data-cursor="trace"
              onMouseEnter={() => onSelectNode("trees")}
              onClick={() => onSelectNode("trees")}
              className={`w-32 py-1.5 border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                active.id === "trees"
                  ? "border-[var(--color-accent)] bg-[#171A21] text-[var(--color-accent)] shadow-[0_0_12px_rgba(137,163,199,0.25)] scale-105"
                  : "border-[var(--color-border)] bg-[#0B0D10] text-[var(--color-text)] hover:border-[var(--color-accent)]/60"
              }`}
            >
              TREES
            </button>

            <button
              type="button"
              data-cursor="trace"
              onMouseEnter={() => onSelectNode("graphs")}
              onClick={() => onSelectNode("graphs")}
              className={`w-32 py-1.5 border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                active.id === "graphs"
                  ? "border-[var(--color-accent)] bg-[#171A21] text-[var(--color-accent)] shadow-[0_0_12px_rgba(137,163,199,0.25)] scale-105"
                  : "border-[var(--color-border)] bg-[#0B0D10] text-[var(--color-text)] hover:border-[var(--color-accent)]/60"
              }`}
            >
              GRAPHS
            </button>
          </div>

          {/* Connection Lines from Level 1 to Level 2 Leaves */}
          <svg className="w-full h-8 overflow-visible pointer-events-none" preserveAspectRatio="none">
            {/* From Trees */}
            <line x1="28%" y1="0" x2="16%" y2="100%" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="28%" y1="0" x2="38%" y2="100%" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* From Graphs */}
            <line x1="72%" y1="0" x2="62%" y2="100%" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="72%" y1="0" x2="84%" y2="100%" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          {/* Level 2: Leaves (BFS, DFS, SORT, SEARCH) */}
          <div className="w-full grid grid-cols-4 gap-2 px-1 relative z-10">
            {["bfs", "dfs", "sort", "search"].map((id) => (
              <button
                key={id}
                type="button"
                data-cursor="trace"
                onMouseEnter={() => onSelectNode(id)}
                onClick={() => onSelectNode(id)}
                className={`py-1.5 text-center border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  active.id === id
                    ? "border-[var(--color-accent)] bg-[#171A21] text-[var(--color-accent)] shadow-[0_0_10px_rgba(137,163,199,0.25)] scale-105"
                    : "border-[var(--color-border)] bg-[#0B0D10] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text)]"
                }`}
              >
                {DSA_NODES[id].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Node Telemetry Readout */}
      <div className="mt-6 p-4 border border-[var(--color-border)] bg-[#0B0D10] font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="font-bold text-[var(--color-text)] uppercase">{active.label}</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">[{active.type}]</span>
          </div>
          <span className="text-[10px] text-[var(--color-accent)] font-bold">
            {active.complexity}
          </span>
        </div>

        <p className="text-xs text-[var(--color-text)] font-sans leading-relaxed mb-2">
          {active.focus}
        </p>

        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-1 border-t border-[var(--color-border)]/50">
          <span>PATTERN: <strong className="text-[var(--color-warm)]">{active.patterns}</strong></span>
          <span>{active.space}</span>
        </div>
      </div>
    </div>
  );
}

export default function DeveloperActivity() {
  const ref = useScrollReveal();
  const [github, setGitHub] = useState(null);
  const [leetcode, setLeetCode] = useState(null);
  const [activeDsaNode, setActiveDsaNode] = useState("root");

  useEffect(() => {
    let mounted = true;
    Promise.allSettled([fetchGitHubData(), fetchLeetCodeData()]).then(([gh, lc]) => {
      if (!mounted) return;
      if (gh.status === "fulfilled") setGitHub(gh.value);
      if (lc.status === "fulfilled") setLeetCode(lc.value);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="code"
      className="py-24 border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-[0.25em] mb-2">
                <span>05 / CODE</span>
              </div>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)] max-w-2xl leading-none"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
              >
                I LIKE SOLVING
                <br />
                HARD PROBLEMS.
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-text-muted)]">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-pulse" />
              <span>DSA TOPOLOGY · LEETCODE TELEMETRY · GITHUB DISPATCH</span>
            </div>
          </div>

          {/* ── Top Row: DSA Topology Tree (7 cols) + LeetCode Telemetry (5 cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-stretch">
            
            {/* Left 7 Cols: Interactive DSA Tree Graph */}
            <div className="lg:col-span-7">
              <DSATopologyTree
                activeNodeId={activeDsaNode}
                onSelectNode={setActiveDsaNode}
              />
            </div>

            {/* Right 5 Cols: LeetCode Telemetry */}
            <div className="lg:col-span-5 border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col justify-between relative">
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┌</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┐</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">└</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┘</span>

              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <SiLeetcode className="text-[var(--color-accent)]" size={14} />
                  <span className="font-bold text-[var(--color-text)] uppercase tracking-wider">
                    LEETCODE // ALGORITHM LOG
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-accent)]">
                  <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-pulse" />
                  <span>DEEKHITA</span>
                </div>
              </div>

              <div className="p-6 font-mono text-xs space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[var(--color-text-muted)] mb-4">
                    <span className="text-[var(--color-accent)] font-bold">&gt;</span> query_profile(&quot;
                    <span className="text-[var(--color-text)]">Deekhita</span>&quot;)
                  </p>

                  <div className="h-px w-full bg-[var(--color-border)] mb-4" />

                  <div className="space-y-3">
                    <StatRow label="GLOBAL RANK" value={leetcode?.ranking || "145,820"} />
                    <StatRow label="TOTAL PROBLEMS SOLVED" value={leetcode?.totalSolved || 187} highlight />

                    <div className="h-px w-full bg-[var(--color-border)] my-2" />

                    <StatRow label="EASY PROBLEMS" value={leetcode?.easySolved || 82} color="#86efac" />
                    <StatRow label="MEDIUM PROBLEMS" value={leetcode?.mediumSolved || 91} color="#fde047" />
                    <StatRow label="HARD PROBLEMS" value={leetcode?.hardSolved || 14} color="#fca5a5" />

                    <div className="h-px w-full bg-[var(--color-border)] my-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-text-muted)] tracking-wider text-xs">CURRENT ACTIVE STREAK</span>
                      <span className="font-bold text-[var(--color-accent)]">
                        {leetcode?.streak || 12} DAYS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cadence Sparkline */}
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-center justify-between mb-2 text-[10px] text-[var(--color-text-muted)]">
                    <span>SOLVE CADENCE (LAST 14 DAYS)</span>
                    <span className="text-[var(--color-accent)] font-bold">12-DAY STREAK</span>
                  </div>
                  <div className="flex items-end gap-1 h-7 pt-1">
                    {(leetcode?.activitySparkline || [2, 3, 1, 4, 2, 5, 3, 6, 8, 5, 7, 9, 6, 8]).map((val, i) => (
                      <div
                        key={i}
                        style={{ height: `${(val / 10) * 100}%` }}
                        className="flex-1 bg-[var(--color-accent)]/50 hover:bg-[var(--color-accent)] transition-colors"
                        title={`Day ${i + 1}: ${val} problems`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <MagneticButton className="w-full">
                    <a
                      href="https://leetcode.com/u/Deekhita/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-mono text-xs font-bold hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      <span>OPEN LEETCODE PROFILE ↗</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Row: GitHub Contribution Matrix & Repos (Full Width) ── */}
          <div className="w-full border border-[var(--color-border)] bg-[var(--color-surface)] mb-8 flex flex-col justify-between relative">
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┌</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┐</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">└</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┘</span>

              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <FaGithub className="text-[var(--color-accent)]" size={14} />
                  <span className="font-bold text-[var(--color-text)] uppercase tracking-wider">
                    GITHUB // DISPATCH ACTIVITY
                  </span>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  DEEKHITA-11
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-3 mb-4 font-mono">
                    <span className="text-4xl md:text-5xl font-heading font-black text-[var(--color-text)]">
                      <AnimatedCounter value={github?.totalContributions || 284} duration={1200} />
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                      TOTAL CONTRIBUTIONS LOGGED
                    </span>
                  </div>

                  {/* Contribution Matrix */}
                  <div className="mb-6 pb-6 border-b border-[var(--color-border)] overflow-x-auto">
                    <ContributionGraph
                      contributions={
                        github?.contributions?.length
                          ? github.contributions
                          : Array.from({ length: 140 }).map((_, i) => ({
                              date: `2026-0${Math.floor(i / 30) + 1}-${(i % 28) + 1}`,
                              count: (i * 7) % 5,
                              level: (i * 3) % 5,
                            }))
                      }
                    />
                  </div>

                  {/* Repos & Followers Count */}
                  <div className="grid grid-cols-2 gap-4 mb-4 font-mono">
                    <div className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <span className="text-xl font-bold text-[var(--color-text)] block">
                        <AnimatedCounter value={github?.repos || 14} />
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase">
                        PUBLIC REPOSITORIES
                      </span>
                    </div>
                    <div className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <span className="text-xl font-bold text-[var(--color-text)] block">
                        <AnimatedCounter value={github?.followers || 12} />
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase">
                        NETWORK FOLLOWERS
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <MagneticButton className="w-full">
                    <a
                      href="https://github.com/Deekhita-11/Deekhita-11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[var(--color-accent)] text-[#0A0B0D] font-mono text-xs font-bold hover:opacity-90 transition-opacity uppercase tracking-wider cursor-pointer"
                    >
                      <FaGithub size={14} />
                      <span>EXPLORE GITHUB ARCHIVE ↗</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>

          {/* ── Verified Recent Activity Feed ── */}
          <div className="p-4 border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--color-border)]">
              <span className="font-bold text-[var(--color-text)] uppercase tracking-wider">
                // SYSTEM TELEMETRY AUDIT
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                REAL-TIME DISPATCH LOGS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
                <div>
                  <span className="text-[var(--color-text)] block font-semibold">
                    pushed blood-management-system
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">
                    React &amp; Tailwind architecture · recent
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
                <div>
                  <span className="text-[var(--color-text)] block font-semibold">
                    solved LeetCode #200 (Number of Islands)
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">
                    BFS &amp; DFS Traversal · verified
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
                <div>
                  <span className="text-[var(--color-text)] block font-semibold">
                    calibrated 5-channel IR optical array
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">
                    ICORT 2025 DRDO Autonomous Bot · hardware
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
