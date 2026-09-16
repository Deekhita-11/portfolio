import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Robotics", href: "#robotics", num: "04" },
  { label: "Journey", href: "#timeline", num: "05" },
  { label: "Contact", href: "#contact", num: "06" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300`}
      style={{
        background: scrolled ? "var(--color-surface)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      }}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo & Stamp */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
        >
          <span className="font-mono font-black text-base tracking-[0.2em] px-2 py-0.5 rounded bg-[var(--color-accent)] text-white">
            DB
          </span>
          <span className="font-mono text-xs tracking-wider text-[var(--color-text)] font-semibold hidden sm:inline">
            // WORKBENCH
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href, num }) => {
            const id = href.slice(1);
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="group flex items-center gap-1.5 text-xs font-mono transition-colors duration-200"
                >
                  {/* Number */}
                  <span
                    className={`transition-colors duration-200 ${
                      isActive ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {num}
                  </span>

                  {/* Label */}
                  <span
                    className={`uppercase tracking-wider transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-text)] font-bold"
                        : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"
                    }`}
                  >
                    {label}
                  </span>

                  {/* Active dash */}
                  <motion.span
                    className="h-[1.5px] bg-[var(--color-accent)] origin-left"
                    animate={{ scaleX: isActive ? 1 : 0, width: "16px" }}
                    style={{ display: "inline-block", transformOrigin: "left" }}
                    transition={{ duration: 0.25 }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to Dark Workshop" : "Switch to Warm Notebook"}
          >
            {theme === "light" ? <HiMoon size={16} /> : <HiSun size={16} />}
          </button>
          <a
            href="/resume.pdf"
            download
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text)] text-xs font-mono font-bold tracking-wider hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200"
          >
            RESUME ↗
          </a>
          <button
            className="md:hidden p-2 text-[var(--color-text)]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--color-border)]"
            style={{ background: "var(--color-surface)" }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map(({ label, href, num }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] font-mono text-xs font-medium uppercase tracking-wider"
                  >
                    <span className="text-[var(--color-accent)] font-bold">{num}</span>
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  download
                  className="font-mono text-xs text-[var(--color-accent)] font-bold tracking-wider"
                >
                  DOWNLOAD RESUME ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
