import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import MagneticButton from "../ui/MagneticButton";

function TerminalPrompt() {
  const [bootStep, setBootStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial boot sequence typing (runs once on load)
  useEffect(() => {
    const timers = [
      setTimeout(() => setBootStep(1), 300),  // Type 'whoami'
      setTimeout(() => setBootStep(2), 700),  // Show 'Deekhita Bohidar'
      setTimeout(() => setBootStep(3), 1100), // Type 'cat profile.status'
      setTimeout(() => setBootStep(4), 1600), // Show education & RobogeniX role
      setTimeout(() => setBootStep(5), 2100), // Show Blood Management System & DSA / Web Dev
      setTimeout(() => setBootStep(6), 2500), // Ready_
      setTimeout(() => {
        setBootStep(7); // Live interactive prompt ready
        if (inputRef.current) inputRef.current.focus();
      }, 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll to bottom on output update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bootStep, history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let response = [];

    switch (trimmed) {
      case "help":
        response = [
          "Available commands:",
          "  whoami    - Display developer identity & role",
          "  projects  - List active featured software systems",
          "  dsa       - LeetCode stats & problem-solving focus",
          "  skills    - Stack & engineering toolkit",
          "  contact   - Get in touch & communications",
          "  about     - Background & methodology doctrine",
          "  clear     - Wipe terminal output screen",
        ];
        break;

      case "whoami":
        response = [
          "Deekhita Bohidar",
          "Role: Software Developer & CSE Undergrad @ XIM University",
          "Leadership: RobogeniX Coordinator (Robotics & IoT Club)",
          "Focus: DSA, Web Systems, Embedded & Hardware Integration",
        ];
        break;

      case "projects":
      case "./projects":
      case "ls":
        response = [
          "[01] PERIOD TRACKER        - Cycle prediction logic & relational MySQL store",
          "[02] BLOOD MANAGEMENT     - React 18, Vite, responsive donor-recipient workflow",
          "[03] GADGET GENIE          - Parametric catalog, relational store & query engine",
          "[04] LINE FOLLOWER BOT     - Autonomous PID differential drive (ICORT 2025 DRDO)",
        ];
        break;

      case "dsa":
      case "leetcode":
        response = [
          "LEETCODE TELEMETRY: 187+ Problems Solved",
          "  Easy: 82   |   Medium: 91   |   Hard: 14",
          "Core competencies: Graphs (BFS/DFS), Trees, Dynamic Programming,",
          "Monotonic Queues, Sliding Window, and Relational Schema 3NF.",
        ];
        break;

      case "skills":
      case "stack":
        response = [
          "LANGUAGES : C++, Python, JavaScript (ES6+), PHP",
          "FRONTEND  : React 18, Vite, Tailwind CSS, HTML5/CSS3",
          "SYSTEMS   : MySQL (InnoDB), Arduino C/C++, Embedded PWM",
          "TOOLS     : Git, GitHub, VS Code, Linux/WSL",
        ];
        break;

      case "contact":
        response = [
          "DISPATCH CHANNEL:",
          "  Email    : deekhitabohidar@gmail.com",
          "  GitHub   : github.com/Deekhita-11",
          "  LeetCode : leetcode.com/u/Deekhita",
          "  Location : Bhubaneswar, India",
        ];
        break;

      case "about":
        response = [
          "Deekhita Bohidar is a 3rd-year B.Tech CSE student passionate",
          "about algorithmic rigor, clean software architectures, and",
          "autonomous robotics hardware.",
        ];
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        response = [
          `'${trimmed}' is not recognized as a command.`,
          "Type 'help' to view available commands.",
        ];
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: response }]);
    setInputVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full border border-[var(--color-border)] bg-[#0B0D10] font-mono text-xs shadow-2xl relative overflow-hidden group cursor-text"
    >
      {/* Corner Brackets */}
      <span className="absolute -top-1 -left-1 text-[10px] text-[var(--color-accent)] leading-none select-none">┌</span>
      <span className="absolute -top-1 -right-1 text-[10px] text-[var(--color-accent)] leading-none select-none">┐</span>
      <span className="absolute -bottom-1 -left-1 text-[10px] text-[var(--color-accent)] leading-none select-none">└</span>
      <span className="absolute -bottom-1 -right-1 text-[10px] text-[var(--color-accent)] leading-none select-none">┘</span>

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[#111318] text-[11px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E06C75] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5C07B] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#98C379] inline-block" />
          <span className="ml-2 text-[10px] text-[var(--color-text-muted)] tracking-wider">
            TERMINAL // C:\Users\Deekhita
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#98C379] animate-pulse" />
          <span className="text-[10px] text-[var(--color-accent)] font-semibold">
            {bootStep >= 7 ? "LIVE // READY" : "INITIALIZING"}
          </span>
        </div>
      </div>

      {/* Terminal Content Area */}
      <div className="p-5 md:p-6 space-y-3 min-h-[340px] max-h-[440px] overflow-y-auto">
        {/* Step 1 & 2: whoami */}
        {bootStep >= 1 && (
          <div>
            <div className="text-[var(--color-text-muted)] flex items-center gap-2">
              <span className="font-semibold">C:\Users\Deekhita&gt;</span>
              <span className="text-[var(--color-text)] font-bold">whoami</span>
            </div>
            {bootStep >= 2 && (
              <p className="text-[var(--color-warm)] font-bold pl-4 mt-0.5 tracking-wide">
                Deekhita Bohidar
              </p>
            )}
          </div>
        )}

        {/* Step 3: cat profile.status */}
        {bootStep >= 3 && (
          <div className="pt-1">
            <div className="text-[var(--color-text-muted)] flex items-center gap-2">
              <span className="font-semibold">C:\Users\Deekhita&gt;</span>
              <span className="text-[var(--color-text)] font-bold">cat profile.status</span>
            </div>

            {/* Step 4: Academic standing & RobogeniX role */}
            {bootStep >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pl-4 pt-1.5 space-y-1"
              >
                <p className="text-[var(--color-text)]">
                  <span className="text-[var(--color-accent)] font-semibold">&gt; STATUS:</span> Currently studying in 3rd Year B.Tech CSE
                </p>
                <p className="text-[var(--color-text)]">
                  <span className="text-[var(--color-accent)] font-semibold">&gt; ROLE:</span> RobogeniX Coordinator (Robotics &amp; IoT Club)
                </p>
              </motion.div>
            )}

            {/* Step 5: Current project & Interests */}
            {bootStep >= 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pl-4 pt-1 space-y-1"
              >
                <p className="text-[var(--color-text)]">
                  <span className="text-[var(--color-warm)] font-semibold">&gt; BUILDING:</span> Blood Management System (solving real-world healthcare dispatch)
                </p>
                <p className="text-[var(--color-text-muted)]">
                  <span className="text-[var(--color-accent-bright)] font-semibold">&gt; INTERESTS:</span> Solving DSA, exploring Web Development &amp; Full Stack
                </p>
              </motion.div>
            )}

            {/* Step 6: Ready_ */}
            {bootStep >= 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pl-4 pt-2 flex items-center gap-1.5"
              >
                <span className="text-[#98C379] font-bold text-sm">Ready_</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Interactive Command History Output */}
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1 pt-1">
            <div className="text-[var(--color-text-muted)] flex items-center gap-2">
              <span className="font-semibold">C:\Users\Deekhita&gt;</span>
              <span className="text-[var(--color-text)] font-bold">{item.command}</span>
            </div>
            <div className="pl-4 space-y-0.5 text-[var(--color-text-muted)] font-mono">
              {item.output.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className={
                    line.startsWith("Available") || line.startsWith("[") || line.includes("187+")
                      ? "text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-text)] opacity-90"
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Step 7: Live Interactive Prompt Input Line */}
        {bootStep >= 7 && (
          <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-2">
            <span className="text-[var(--color-text-muted)] font-semibold shrink-0">
              C:\Users\Deekhita&gt;
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type a command... (try 'help')"
                className="w-full bg-transparent text-[var(--color-text)] font-mono text-xs focus:outline-none placeholder:text-[var(--color-text-muted)]/40"
                autoComplete="off"
                spellCheck="false"
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-[var(--color-accent)] ml-0.5 shrink-0"
              />
            </div>
          </form>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Quick-Action Command Chips */}
      {bootStep >= 7 && (
        <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[#111318]/80 flex items-center justify-between gap-2 overflow-x-auto select-none">
          <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">QUICK:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
            {["help", "whoami", "projects", "dsa", "skills", "clear"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="px-2 py-0.5 border border-[var(--color-border)] bg-[#0B0D10] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - left - width / 2) / (width / 2);
    const ny = (e.clientY - top - height / 2) / (height / 2);
    setOffset({ x: nx * 3, y: ny * 3 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between px-6 md:px-16 pt-24 pb-10 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* ── Top HUD Telemetry Bar ── */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--color-text-muted)] pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--color-text)] tracking-wider">
            DB // 2026.09
          </span>
          <span className="text-[var(--color-border)]">|</span>
          <span className="text-[11px] hidden sm:inline">CSE UNDERGRADUATE · XIM UNIVERSITY</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[var(--color-accent)] font-bold">01 / INTRO</span>
          <span className="text-[var(--color-border)]">·</span>
          <span className="text-[var(--color-accent)] font-bold flex items-center gap-1.5 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* ── Center 2-Column Tactical Layout: Identity (Left) + Terminal Prompt (Right) ── */}
      <div className="my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left 7 cols: Identity & Statement */}
          <div className="lg:col-span-6 space-y-4">
            {/* Subtitle / Role */}
            <motion.div
              animate={{ x: offset.x * 0.6, y: offset.y * 0.6 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="font-mono text-xs md:text-sm tracking-[0.25em] text-[var(--color-accent)] font-bold uppercase"
            >
              SOFTWARE DEVELOPER
            </motion.div>

            {/* Name Display */}
            <motion.h1
              animate={{ x: offset.x * 1.2, y: offset.y * 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="font-heading font-black text-5xl sm:text-6xl lg:text-8xl uppercase tracking-[-0.03em] leading-[0.9] text-[var(--color-text)]"
            >
              DEEKHITA
              <br />
              BOHIDAR
            </motion.h1>

            {/* Main Statement */}
            <motion.div
              animate={{ x: offset.x * 1.8, y: offset.y * 1.8 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="pt-1"
            >
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[var(--color-accent-bright)]">
                I LIKE SOLVING
                <br />
                HARD PROBLEMS.
              </h2>
              <div className="w-20 h-[2px] bg-[var(--color-accent)] mt-3 mb-2" />
            </motion.div>

            {/* Domain Pillars */}
            <motion.p
              animate={{ x: offset.x * 0.9, y: offset.y * 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="font-mono text-sm md:text-base text-[var(--color-text-muted)] tracking-wider uppercase font-semibold"
            >
              DSA • WEB SYSTEMS • HARDWARE
            </motion.p>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => scrollTo(e, "projects")}
                  className="px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-mono font-bold text-xs tracking-wider uppercase hover:bg-[var(--color-accent-bright)] transition-colors block cursor-pointer shadow-md"
                >
                  EXPLORE WORK ↓
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-mono font-bold text-xs tracking-wider uppercase hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors block cursor-pointer shadow-sm"
                >
                  VIEW CV / SPEC SHEET ↗
                </a>
              </MagneticButton>

              {/* Social Links */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href="https://github.com/Deekhita-11/Deekhita-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                >
                  <FaGithub size={14} />
                </a>
                <a
                  href="https://leetcode.com/u/Deekhita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="p-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                >
                  <SiLeetcode size={14} />
                </a>
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                >
                  <FaLinkedin size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right 6 cols: Interactive CLI Terminal Prompt matching Screenshot */}
          <div className="lg:col-span-6">
            <TerminalPrompt />
          </div>

        </div>
      </div>

      {/* ── Bottom Section Pointer ── */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] font-mono text-[11px] text-[var(--color-text-muted)]">
        <span>BHUBANESWAR, INDIA // ICORT 2025 DRDO SCHOLAR</span>
        <a
          href="#systems"
          onClick={(e) => scrollTo(e, "systems")}
          className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE ↓</span>
        </a>
      </div>
    </section>
  );
}
