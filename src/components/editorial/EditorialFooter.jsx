import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function EditorialFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hairline-t bg-[var(--color-bg)] py-12 font-sans transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--color-text-muted)]">
        
        {/* Colophon & Geographic Location */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-swiss font-bold text-[var(--color-text)] uppercase tracking-wider">
            Deekhita Bohidar
          </span>
          <span className="hidden sm:inline text-[var(--color-text-light)]">/</span>
          <span>Bhubaneswar, India</span>
          <span className="hidden sm:inline text-[var(--color-text-light)]">/</span>
          <span>B.Tech CSE @ XIM University</span>
        </div>

        {/* Running Copyright & Vol */}
        <div className="font-mono text-[11px] text-[var(--color-text-light)] text-center">
          &copy; {currentYear} &middot; ALL RIGHTS RESERVED &middot; SWISS TECHNICAL EDITION
        </div>

        {/* Fast Links */}
        <div className="flex items-center gap-6 font-mono text-xs">
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
            Resume.pdf
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            &uarr; Top
          </a>
        </div>

      </div>
    </footer>
  );
}