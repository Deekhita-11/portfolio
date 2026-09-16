import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-[var(--color-border)] py-12"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)] font-mono text-xs">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-black text-sm tracking-[0.2em] px-2.5 py-1 border border-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-accent)]">
              DB
            </span>
            <div>
              <span className="font-bold text-[var(--color-text)] uppercase block">
                DEEKHITA BOHIDAR
              </span>
              <span className="text-[var(--color-text-muted)] text-[10px] tracking-wider">
                DSA • SOFTWARE • EMBEDDED SYSTEMS
              </span>
            </div>
          </div>

          {/* Social / Profile Links */}
          <div className="flex items-center gap-6 text-[var(--color-text-muted)] font-semibold">
            <a
              href="https://github.com/Deekhita-11/Deekhita-11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href="https://leetcode.com/u/Deekhita/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              LEETCODE ↗
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              LINKEDIN ↗
            </a>
          </div>

          {/* Return To Top */}
          <a
            href="#"
            onClick={scrollToTop}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors uppercase font-bold"
          >
            TOP OF FOLIO ↑
          </a>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Deekhita Bohidar. Engineered with React, Vite &amp; Framer Motion.</p>
          <div className="flex items-center gap-2">
            <span>BHUBANESWAR, INDIA</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[var(--color-accent)]">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] animate-pulse" />
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
