import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Robotics", href: "#robotics" },
  { label: "Journey", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/", label: "LeetCode" },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-[var(--color-border)] py-12"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)]">
          {/* Logo & Callout */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-black text-sm tracking-[0.2em] px-2.5 py-1 rounded bg-[var(--color-accent)] text-white">
              DB
            </span>
            <div className="font-mono text-xs">
              <span className="text-[var(--color-text)] font-bold block">DEEKHITA BOHIDAR</span>
              <span className="text-[var(--color-text-muted)] text-[10px]">ENGINEERING FOLIO // 2024</span>
            </div>
          </div>

          {/* Quick links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded border border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-[11px] text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Deekhita Bohidar. Designed with engineering precision.</p>
          <p className="flex items-center gap-2">
            <span>REACT 18</span>
            <span>·</span>
            <span>VITE</span>
            <span>·</span>
            <span>TAILWIND</span>
            <span>·</span>
            <span>ARDUINO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
