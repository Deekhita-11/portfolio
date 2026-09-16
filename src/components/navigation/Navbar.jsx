import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const NAV_ITEMS = [
  { id: "hero", label: "01 INTRO" },
  { id: "systems", label: "02 WHAT I BUILD" },
  { id: "projects", label: "03 WORK" },
  { id: "stack", label: "04 STACK" },
  { id: "code", label: "05 CODE" },
  { id: "about", label: "06 ABOUT" },
  { id: "contact", label: "07 CONTACT" },
];

export default function Navbar({ onOpenSystemMode }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setClickCount(0);
      onOpenSystemMode();
    } else {
      setTimeout(() => setClickCount(0), 1200);
    }
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "var(--color-surface)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      }}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-14 font-mono text-xs">
        {/* Monogram Brand / Easter Egg */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group select-none"
          title="Click 3 times for diagnostics HUD"
        >
          <span className="font-mono font-black text-xs px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-accent)] bg-[var(--color-surface)] group-hover:border-[var(--color-accent)] transition-colors">
            DB
          </span>
          <span className="font-bold tracking-wider text-[var(--color-text)] uppercase text-[11px] hidden sm:inline">
            DEEKHITA BOHIDAR
          </span>
        </a>

        {/* Center Telemetry Stamp */}
        <div className="hidden lg:flex items-center gap-6 text-[var(--color-text-muted)] text-[11px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className="hover:text-[var(--color-accent)] transition-colors tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right HUD Controls: 2026.09, Status, CV & Theme */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] border-r border-[var(--color-border)] pr-3">
            <span>2026.09</span>
            <span className="flex items-center gap-1.5 text-[var(--color-accent)] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              SYSTEM ONLINE
            </span>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 border border-[var(--color-border)] text-[var(--color-accent)] hover:border-[var(--color-accent)] bg-[var(--color-surface)] text-[11px] font-bold tracking-wider transition-colors"
          >
            CV ↗
          </a>

          <button
            onClick={toggleTheme}
            className="p-1.5 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            aria-label="Toggle HUD Theme"
          >
            {theme === "light" ? <HiMoon size={13} /> : <HiSun size={13} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
