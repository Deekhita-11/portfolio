import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projects";
import { FaGithub, FaExternalLinkAlt, FaCode, FaProjectDiagram, FaInfoCircle, FaCheck, FaCopy } from "react-icons/fa";

const FILTERS = [
  { label: "ALL BUILDS", value: "all" },
  { label: "WEB SYSTEMS", value: "web" },
  { label: "DATABASE / DBMS", value: "database" },
  { label: "ROBOTICS HARDWARE", value: "robotics" },
];

function Counter({ value, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ArchitectureDiagram({ stages, projectId }) {
  return (
    <div className="w-full py-2" data-cursor="architecture">
      <style>{`
        @keyframes dataPulse {
          0% { left: 0; opacity: 0; transform: translateY(-50%) scale(0.5); }
          20% { opacity: 1; transform: translateY(-50%) scale(1); }
          80% { opacity: 1; transform: translateY(-50%) scale(1); }
          100% { left: calc(100% - 6px); opacity: 0; transform: translateY(-50%) scale(0.5); }
        }
        .animate-data-pulse {
          position: absolute;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent);
          animation: dataPulse 1.5s infinite linear;
        }
      `}</style>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-border)]">
        <span className="font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider">
          // SYSTEM DATA & CONTROL FLOW
        </span>
        <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
          {stages.length} PIPELINE STAGES
        </span>
      </div>

      {/* Grid of Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {stages.map((stage, idx) => (
          <div key={idx} className="flex flex-col relative">
            {/* Card Node */}
            <div className="technical-card rounded-lg p-4 flex-1 flex flex-col justify-between border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] tracking-widest">
                    {stage.step}
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                    {stage.tech}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-sm text-[var(--color-text)] mb-1">
                  {stage.component}
                </h4>

                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
                  {stage.desc}
                </p>
              </div>

              {/* Engineering Annotation */}
              <div className="pt-2 border-t border-[var(--color-border)]/60">
                <span className="font-mono text-[10px] text-[var(--color-accent)] block italic">
                  {stage.annotation}
                </span>
              </div>
            </div>

            {/* Desktop Connector with Animated Data Pulse */}
            {idx < stages.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-[1px] bg-[var(--color-border)] z-0" style={{ transform: 'translateY(-50%)' }}>
                <div className="animate-data-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Special Showcase for Blood Management System */}
      {projectId == 1 && (
        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider">
              // SYSTEM TELEMETRY
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              [DEMO LOG]
            </span>
          </div>
          
          {/* Visual Pipeline */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-text-muted)] mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <span className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded">DONOR</span>
            <span className="text-[var(--color-accent)]">→</span> 
            <span className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded">REGISTRATION</span>
            <span className="text-[var(--color-accent)]">→</span> 
            <span className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded">DATABASE</span>
            <span className="text-[var(--color-accent)]">→</span> 
            <span className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded">INVENTORY</span>
            <span className="text-[var(--color-accent)]">→</span> 
            <span className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded">DISPATCH</span>
          </div>

          {/* Metric Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "REGISTERED DONORS", val: 248 },
              { label: "UNITS LOGGED", val: 394 },
              { label: "REQUESTS", val: 61 },
              { label: "MATCH RATE", val: 94, suffix: "%" }
            ].map((metric, i) => (
              <div key={i} className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex flex-col items-center justify-center text-center">
                <div className="font-mono text-2xl md:text-3xl text-[var(--color-text)] mb-1">
                  <Counter value={metric.val} suffix={metric.suffix} />
                </div>
                <div className="font-mono text-[9px] text-[var(--color-text-muted)] tracking-wider uppercase mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CodeWindow({ snippet }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = snippet.code.trim().split("\n");

  return (
    <div className="rounded-lg border border-[var(--color-border)] overflow-hidden bg-[#151716] font-mono text-xs">
      {/* File Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[#1A1C1B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <span className="font-bold text-[var(--color-text)] text-xs">
            {snippet.filename}
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)] ml-2 hidden sm:inline">
            {snippet.annotation}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors border border-[var(--color-border)]"
        >
          {copied ? <FaCheck className="text-[var(--color-accent)]" /> : <FaCopy />}
          <span>{copied ? "COPIED" : "COPY"}</span>
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto max-h-[320px] scrollbar-none">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="pr-4 py-0.5 text-[var(--color-text-muted)]/40 text-right select-none w-8 text-[11px]">
                  {i + 1}
                </td>
                <td className="py-0.5 text-[var(--color-text)] whitespace-pre font-mono">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  // Tabs: "overview" | "architecture" | "code"
  const [tab, setTab] = useState("architecture"); // default to architecture showcase as requested!
  const isRobotics = project.category?.includes("robotics");
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="technical-card rounded-xl p-6 md:p-8 relative transition-all"
      style={{ background: "var(--color-surface)" }}
      data-cursor="project"
    >
      {/* ── Top Bar: Title & View Selector ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm font-bold text-[var(--color-accent)]">
              PROJECT // {num}
            </span>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded font-bold uppercase bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              {isRobotics ? "ROBOTICS HARDWARE" : "SOFTWARE SYSTEM"}
            </span>
          </div>

          <h3 className="font-heading font-black uppercase text-xl md:text-2xl text-[var(--color-text)] tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* ── Interactive View Toggle: [ OVERVIEW ] [ ARCHITECTURE ] [ CODE ] ── */}
        <div className="flex items-center rounded-lg border border-[var(--color-border)] p-1 bg-[var(--color-bg)] font-mono text-xs self-start lg:self-auto">
          <button
            onClick={() => setTab("overview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
              tab === "overview"
                ? "bg-[var(--color-surface)] text-[var(--color-accent)] font-bold border border-[var(--color-border)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <FaInfoCircle size={11} />
            <span>OVERVIEW</span>
          </button>

          <button
            onClick={() => setTab("architecture")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
              tab === "architecture"
                ? "bg-[var(--color-surface)] text-[var(--color-accent)] font-bold border border-[var(--color-border)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <FaProjectDiagram size={11} />
            <span>ARCHITECTURE</span>
          </button>

          {project.codeSnippet && (
            <button
              onClick={() => setTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                tab === "code"
                  ? "bg-[var(--color-surface)] text-[var(--color-accent)] font-bold border border-[var(--color-border)] shadow-sm"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <FaCode size={11} />
              <span>CODE</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Tab Content Panel ── */}
      <div className="min-h-[200px]">
        {tab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed max-w-3xl">
              {project.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <p className="font-mono text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-wider mb-1">
                  // THE PROBLEM
                </p>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <p className="font-mono text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-wider mb-1">
                  // THE SOLUTION
                </p>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "architecture" && project.architecture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ArchitectureDiagram stages={project.architecture} projectId={project.id} />
          </motion.div>
        )}

        {tab === "code" && project.codeSnippet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <CodeWindow snippet={project.codeSnippet} />
          </motion.div>
        )}
      </div>

      {/* ── Bottom Bar: Tech Pills & Actions ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-[var(--color-border)]">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] font-mono text-xs text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <FaGithub size={12} /> REPOSITORY ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[var(--color-accent)] text-[#121313] font-mono text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <FaExternalLinkAlt size={10} /> LIVE RIG ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState("all");
  const ref = useScrollReveal();

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category?.includes(active));

  return (
    <section id="projects" className="py-24 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[var(--color-border)]">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase">
                SYSTEM SCHEMATICS // 03
              </p>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                PROJECT ARCHITECTURE
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm max-w-lg mt-2">
                Each project documents technical data flow, component stages, and verified implementation code.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActive(value)}
                  className={`px-3.5 py-1.5 rounded font-mono text-xs font-semibold tracking-wider transition-all ${
                    active === value
                      ? "bg-[var(--color-accent)] text-[#121313]"
                      : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-8">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
