import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiChip } from "react-icons/hi";

// Gradient backgrounds for each project card (by index)
const gradients = [
  "from-teal-500/10 to-cyan-500/5",
  "from-purple-500/10 to-pink-500/5",
  "from-amber-500/10 to-orange-500/5",
  "from-emerald-500/10 to-teal-500/5",
];

export default function ProjectCard({ project, index }) {
  const { title, description, tags, github, live, category } = project;
  const isRobotics = category?.includes("robotics");

  return (
    <article
      className={`relative flex flex-col p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:-translate-y-2 group`}
      style={{
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Top gradient accent */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          background: isRobotics
            ? "linear-gradient(to right, #10B981, #14B8A6)"
            : "linear-gradient(to right, #14B8A6, #F59E0B)",
        }}
      />

      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-md"
          style={{
            background: isRobotics
              ? "rgba(16,185,129,0.12)"
              : "rgba(20,184,166,0.12)",
            color: isRobotics ? "#10B981" : "var(--color-accent)",
          }}
        >
          {isRobotics ? "🤖 Robotics" : "🌐 Web"}
        </span>
        {isRobotics && (
          <HiChip className="text-emerald-400" size={18} />
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-lg text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,184,166,0.08)",
              color: "var(--color-accent)",
              border: "1px solid rgba(20,184,166,0.2)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            <FaGithub size={15} />
            <span>Source</span>
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            <FaExternalLinkAlt size={13} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </article>
  );
}
