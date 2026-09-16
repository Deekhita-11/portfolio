import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function RetroFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 font-mono text-xs transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[var(--color-text-muted)]">
        
        {/* Left: Brand Monogram & Location */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-[#0B0E14] font-mono text-xs font-black flex items-center justify-center shadow-sm">
            DB
          </span>
          <div>
            <span className="font-gaming font-bold text-sm text-[var(--color-text)] block">
              DEEKHITA BOHIDAR
            </span>
            <span className="text-xs text-[var(--color-text-light)]">
              B.Tech CSE @ XIM University · Bhubaneswar, India
            </span>
          </div>
        </div>

        {/* Center: Clean Copyright */}
        <div className="text-xs text-[var(--color-text-light)] text-center">
          &copy; {currentYear} · Designed with precision engineering.
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-6 text-xs font-semibold">
          <a
            href="https://github.com/Deekhita-11/Deekhita-11"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://leetcode.com/u/Deekhita/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            LeetCode
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            Resume
          </a>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[var(--color-accent)] hover:underline flex items-center gap-1 font-bold"
          >
            <span>↑</span>
            <span>Top</span>
          </a>
        </div>

      </div>
    </footer>
  );
}