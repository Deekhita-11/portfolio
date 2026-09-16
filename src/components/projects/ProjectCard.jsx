import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaProjectDiagram, FaInfoCircle } from "react-icons/fa";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function ProjectCard({ project, index, onExploreSystem }) {
  const [tab, setTab] = useState("architecture");
  const isRobotics = project.category?.includes("robotics");
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      data-cursor="project"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="technical-card rounded-xl p-6 md:p-8 relative"
      style={{ background: "var(--color-surface)" }}
    >
      {/* ── Top Bar: Title & View Selector ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs font-bold text-[var(--color-accent)] tracking-wider">
              PROJECT // {num}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              {isRobotics ? "ROBOTICS HARDWARE" : "SOFTWARE SYSTEM"}
            </span>
          </div>

          <h3 className="font-heading font-black uppercase text-xl md:text-2xl text-[var(--color-text)] tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* ── Interactive View Switcher: [ OVERVIEW ] [ ARCHITECTURE ] ── */}
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
            <span>CASE STUDY</span>
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
        </div>
      </div>

      {/* ── Tab Content Panel ── */}
      <div className="min-h-[160px]">
        {tab === "overview" ? (
          <div className="space-y-4">
            <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed max-w-3xl">
              {project.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <p className="font-mono text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-wider mb-1">
                  // 01 THE PROBLEM CONSTRAINT
                </p>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <p className="font-mono text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-wider mb-1">
                  // 02 THE ENGINEERED APPROACH
                </p>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        ) : (
          project.architecture && <ArchitectureDiagram stages={project.architecture} />
        )}
      </div>

      {/* ── Bottom Bar: Tech Stack & System Modal CTA ── */}
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
          {/* Wow Factor: Expand Project System View */}
          <button
            onClick={() => onExploreSystem(project)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[var(--color-accent)] text-[#0B0D0C] font-mono text-xs font-bold hover:opacity-90 transition-opacity"
          >
            <span>EXPLORE SYSTEM</span>
            <span>→</span>
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] font-mono text-xs text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <FaGithub size={12} />
              <span>REPO ↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
