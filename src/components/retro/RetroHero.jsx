import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiArrowDown, FiFileText, FiTerminal } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const DISCIPLINES = ["FULL-STACK WEB SYSTEMS", "ALGORITHMS & DSA", "RELATIONAL DATABASES"];

// Interactive Type-able Terminal Subcomponent
function InteractiveTerminal() {
  const { theme, toggleTheme } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "Deekhita Workstation Terminal [v5.2-interactive]\nType 'help' to inspect commands, or tap any quick chip below.",
    },
    {
      type: "cmd",
      cmd: "whoami",
      text: "deekhita_bohidar // 3rd_year_b.tech_cse @ xim_university",
    },
    {
      type: "cmd",
      cmd: "cat current_focus.log",
      text: "building blood management system & real-world relational apps",
    },
    {
      type: "cmd",
      cmd: "echo $INTERESTS",
      text: "solving dsa (187+ leetcode), full-stack web architectures, scalable backend systems",
    },
    {
      type: "cmd",
      cmd: "status",
      text: "READY_TO_BUILD // OPEN FOR INTERNSHIPS & COLLABORATION",
      accent: true,
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState([
    "whoami",
    "cat current_focus.log",
    "echo $INTERESTS",
    "status",
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Auto-scroll to bottom of output whenever history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Append to bash history for arrow navigation
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim().toLowerCase();

    let outputText = "";
    let isAccent = false;

    switch (command) {
      case "help":
        outputText =
`AVAILABLE COMMANDS:
  whoami      - Developer profile & current status
  about       - Builder philosophy & problem-solving approach
  skills      - Tech stack (Frontend, Backend, Tools & Algorithms)
  projects    - Production web applications & software builds
  dsa         - LeetCode stats & algorithmic problem solving
  education   - Academic record & CGPA
  leadership  - RobogeniX coordinator & club roles
  contact     - Direct contact channels & links
  goto <sec>  - Navigate page (projects, skills, about, contact)
  theme       - Toggle dark / light theme
  date        - Current system timestamp
  cat <file>  - Read log (e.g., cat resume, cat focus, cat skills)
  clear       - Clear terminal history`;
        break;

      case "whoami":
      case "bio":
        outputText = "Deekhita Bohidar — 3rd Year B.Tech CSE @ XIM University, Bhubaneswar (CGPA: 8.68). Coordinator @ RobogeniX.";
        break;

      case "about":
        outputText = "I'm a developer who genuinely enjoys solving problems. A B.Tech CSE student specializing in DSA and turning practical ideas into interactive web experiences with React, JavaScript, and relational databases.";
        break;

      case "skills":
      case "stack":
        outputText =
`TECHNICAL MATRIX:
  • Languages:      C/C++, Java, JavaScript (ES6+), Python, PHP, SQL
  • Frontend:       React 18, Vite, Tailwind CSS, HTML5, CSS3
  • Backend & DB:   REST APIs, MySQL (ACID & 3NF), PHP Backend
  • Tools & Env:    Git, GitHub, Linux / Bash, VS Code
  • Core CS:        Data Structures & Algorithms (187+ Solved), DBMS, OOP`;
        break;

      case "projects":
        outputText =
`FEATURED BUILDS:
  01 Period Tracker            [Health Utility & PHP / MySQL]
  02 Blood Management System   [React / Vite / Tailwind / MySQL]
  03 Gadget Genie             [Specs Engine & Relational Search]
  (Tip: type 'goto projects' to jump to project showcase)`;
        break;

      case "dsa":
      case "leetcode":
        outputText = "LeetCode Stats: 187+ problems solved! Strong foundation in Arrays, Two Pointers, Trees, Binary Search, and Dynamic Programming.";
        isAccent = true;
        break;

      case "education":
      case "academics":
        outputText =
`ACADEMIC LEDGER:
  • B.Tech CSE — XIM University, Bhubaneswar (CGPA: 8.68, 2023–2027)
  • Senior Secondary (Class XII) — DPS Damanjodi (88.2%)
  • Secondary (Class X) — DPS Damanjodi (94.0%)`;
        break;

      case "leadership":
        outputText =
`ROLES & ACHIEVEMENTS:
  • Coordinator @ RobogeniX (XIM University Robotics & Tech Club)
  • Treasurer @ IEEE Student Branch
  • Consistent Academic Distinction (CGPA 8.68)`;
        break;

      case "contact":
        outputText =
`GET IN TOUCH:
  • Email:    deekhitabohidar@gmail.com
  • GitHub:   github.com/Deekhita-11
  • LeetCode: leetcode.com/u/Deekhita/
  • LinkedIn: linkedin.com/in/`;
        break;

      case "goto":
      case "cd":
        if (["projects", "skills", "about", "contact", "activity"].includes(arg)) {
          const el = document.getElementById(arg);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            outputText = `Scrolled to #${arg}.`;
          } else {
            outputText = `Section #${arg} not found on page.`;
          }
        } else {
          outputText = "Usage: goto [projects | skills | about | contact | activity]";
        }
        break;

      case "theme":
        toggleTheme();
        const nextTheme = theme === "dark" ? "light" : "dark";
        outputText = `Theme toggled to ${nextTheme}!`;
        isAccent = true;
        break;

      case "date":
        outputText = new Date().toLocaleString();
        break;

      case "echo":
        outputText = arg || "";
        break;

      case "status":
        outputText = "READY_TO_BUILD // OPEN FOR INTERNSHIPS & COLLABORATION";
        isAccent = true;
        break;

      case "cat":
        if (arg.includes("resume")) {
          window.open("/resume.pdf", "_blank");
          outputText = "Opening /resume.pdf in a new tab...";
        } else if (arg.includes("focus")) {
          outputText = "Current focus: Building scalable full-stack web applications and sharpening DSA.";
        } else if (arg.includes("skills")) {
          outputText = "Skills: React 18, Vite, Tailwind CSS, C++, Java, Python, MySQL, REST APIs, Linux, Git, VS Code.";
        } else if (arg.includes("leadership")) {
          outputText = "Coordinator @ RobogeniX Club · Treasurer @ IEEE Student Branch.";
        } else {
          outputText = `cat: ${arg || "file"}: No such file or directory. Try 'cat resume', 'cat focus', or 'cat skills'.`;
        }
        break;

      case "sudo":
        outputText = "sudo: guest user is not in the sudoers file. Incident reported to Deekhita.";
        break;

      case "clear":
      case "cls":
        setHistory([]);
        return;

      case "exit":
        outputText = "Session cannot be terminated — feel free to explore the interactive portfolio!";
        break;

      default:
        outputText = `bash: command not found: ${trimmed}. Type 'help' to view available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: "cmd", cmd: trimmed, text: outputText, accent: isAccent },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const list = [
        "help",
        "whoami",
        "about",
        "skills",
        "projects",
        "dsa",
        "education",
        "leadership",
        "contact",
        "clear",
        "theme",
        "date",
        "status",
      ];
      const match = list.find((c) => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) setInputVal(match);
    }
  };

  // User specification: White terminal for black theme, Black terminal for white background
  const isWhiteTerminal = theme === "dark";

  const t = isWhiteTerminal
    ? {
        container: "bg-white border-slate-300 text-slate-900 shadow-2xl shadow-black/50 hover:border-blue-400",
        header: "bg-slate-100 border-slate-200 text-slate-600",
        title: "text-slate-800",
        badge: "text-slate-500",
        body: "bg-white",
        sysText: "text-slate-500 border-slate-200",
        promptUser: "text-slate-500",
        promptDollar: "text-blue-600 font-bold",
        cmdText: "text-slate-900",
        outputText: "text-slate-700",
        outputAccent: "text-blue-600 font-bold",
        input: "text-slate-900 placeholder:text-slate-400",
        bar: "bg-slate-50 border-slate-200 text-slate-600",
        chip: "bg-white border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/60",
        footer: "bg-slate-100 border-slate-200 text-slate-500",
        indicator: "text-blue-600 font-semibold",
        indicatorDot: "bg-blue-600",
      }
    : {
        container: "bg-[#0B0E14] border-[#1E293B] text-[#F1F5F9] shadow-2xl shadow-slate-400/25 hover:border-[#38BDF8]/60",
        header: "bg-[#161D2C] border-[#1E293B] text-[#94A3B8]",
        title: "text-white",
        badge: "text-[#94A3B8]",
        body: "bg-[#0B0E14]",
        sysText: "text-[#64748B] border-[#1E293B]/60",
        promptUser: "text-[#94A3B8]",
        promptDollar: "text-[#38BDF8] font-bold",
        cmdText: "text-[#F1F5F9]",
        outputText: "text-[#94A3B8]",
        outputAccent: "text-[#38BDF8] font-bold",
        input: "text-[#F1F5F9] placeholder:text-[#64748B]",
        bar: "bg-[#161D2C] border-[#1E293B] text-[#94A3B8]",
        chip: "bg-[#121722] border-[#1E293B] text-[#94A3B8] hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#132338]",
        footer: "bg-[#0B0E14] border-[#1E293B] text-[#64748B]",
        indicator: "text-[#38BDF8] font-semibold",
        indicatorDot: "bg-[#38BDF8]",
      };

  return (
    <div
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className={`w-full h-[500px] sm:h-[520px] ${t.container} border rounded-2xl overflow-hidden text-left cursor-text flex flex-col transition-all duration-200 shadow-2xl`}
    >
      {/* Terminal Window Header Bar */}
      <div className={`flex items-center justify-between px-5 py-3 ${t.header} border-b font-mono text-xs select-none transition-colors shrink-0`}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/90" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
          <span className={`ml-2 font-semibold text-xs ${t.title}`}>
            deekhita@workstation: ~/bio
          </span>
        </div>
        <div className={`flex items-center gap-2 text-xs ${t.badge}`}>
          <FiTerminal size={13} />
          <span className="hidden sm:inline">BASH 5.2</span>
          <span className={`w-1.5 h-1.5 rounded-full ${t.indicatorDot} animate-pulse`} />
        </div>
      </div>

      {/* Terminal Body with Scrollable Output and Active Input */}
      <div
        className={`p-5 font-mono text-xs sm:text-sm space-y-3 flex-1 overflow-y-auto ${t.body} transition-colors`}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.type === "system" ? (
              <div className={`${t.sysText} italic border-b pb-2 mb-2 whitespace-pre-wrap`}>
                {item.text}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 font-semibold">
                  <span className={`${t.promptUser} text-[11px] select-none`}>guest@deekhita:</span>
                  <span className={t.promptDollar}>$</span>
                  <span className={`${t.cmdText} font-bold`}>{item.cmd}</span>
                </div>
                {item.text && (
                  <div
                    className={`pl-4 leading-relaxed whitespace-pre-wrap ${
                      item.accent ? t.outputAccent : t.outputText
                    }`}
                  >
                    → {item.text}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* Active Command Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="font-semibold select-none flex items-center gap-1 shrink-0">
            <span className={`${t.promptUser} text-[11px] hidden sm:inline`}>guest@deekhita:</span>
            <span className={t.promptDollar}>$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type command (try 'help', 'skills', 'dsa')..."
            className={`flex-1 bg-transparent font-mono text-xs sm:text-sm focus:outline-none ${t.input}`}
            spellCheck={false}
            autoComplete="off"
          />
        </form>

        {/* Ref anchor for automatic smooth auto-scrolling */}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Clickable Suggestions / Action Chips */}
      <div className={`flex flex-wrap items-center gap-1.5 px-5 py-2.5 ${t.bar} border-t text-xs font-mono select-none transition-colors shrink-0`}>
        <span className="text-[10px] mr-1 hidden sm:inline opacity-70">QUICK RUN:</span>
        {["help", "skills", "projects", "dsa", "contact", "clear", "theme"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className={`px-2 py-0.5 rounded border ${t.chip} text-[11px] transition-all cursor-pointer`}
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Terminal Bottom Status Bar */}
      <div className={`px-5 py-2 border-t ${t.footer} flex items-center justify-between text-[11px] font-mono select-none transition-colors shrink-0`}>
        <span>UTF-8 // UNIX</span>
        <span className={`flex items-center gap-1.5 ${t.indicator}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${t.indicatorDot} animate-ping`} />
          <span>INTERACTIVE_SHELL_READY</span>
        </span>
      </div>
    </div>
  );
}

export default function RetroHero() {
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex((prev) => (prev + 1) % DISCIPLINES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[92vh] flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-16 px-6 lg:px-12"
    >
      <div className="w-full max-w-[1400px] mx-auto z-10">
        <div className="w-full">
          {/* Top Folio Status Bar */}
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-muted)] mb-8 shadow-sm w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            <span className="text-[var(--color-accent)] font-bold">ACTIVE</span>
            <span className="text-[var(--color-border)]">/</span>
            <span>3RD YEAR B.TECH CSE @ XIM UNIVERSITY</span>
            <span className="text-[var(--color-border)] hidden sm:inline">/</span>
            <span className="text-[var(--color-warm)] font-semibold hidden sm:inline">8.68 CGPA</span>
          </div>

          {/* ── 2-Column Side-By-Side Layout (Left: Name & Bio, Right: Interactive Terminal) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 text-left">
            
            {/* Left Column: Stacked Name, Headline, and Bio (6 cols on lg) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Stacked Name Headline */}
              <h1 className="font-gaming font-black text-5xl sm:text-6xl md:text-7xl xl:text-8xl uppercase tracking-tighter text-[var(--color-text)] leading-[0.9] drop-shadow-sm">
                <span className="block">DEEKHITA</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] via-[#38BDF8] to-[var(--color-warm)]">
                  BOHIDAR
                </span>
              </h1>

              {/* Dynamic Discipline Transition */}
              <div className="font-mono text-lg sm:text-xl text-[var(--color-text-muted)] flex items-center gap-2">
                <span className="text-[var(--color-accent)] font-semibold">I BUILD:</span>
                <div className="relative flex min-w-[220px] font-bold text-[var(--color-text)]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={disciplineIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-[var(--color-accent)] uppercase tracking-wider"
                    >
                      [{DISCIPLINES[disciplineIndex]}]
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Enlarged Bio Paragraph */}
              <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-sans leading-relaxed">
                Third-year Computer Science undergraduate at XIM University, Bhubaneswar. Coordinator at RobogeniX Club, working on full-stack systems to solve real-world problems with high-performance algorithms.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#skills"
                  data-cursor="explore"
                  className="px-6 py-3.5 rounded-xl bg-[var(--color-accent)] text-[#0B0E14] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md flex items-center gap-2"
                >
                  <span>Explore Tech Stack</span>
                  <FiArrowDown />
                </a>

                <a
                  href="#projects"
                  data-cursor="explore"
                  className="px-6 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <span className="text-[var(--color-accent)]">→</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <span>Resume.pdf</span>
                  <FiFileText size={15} />
                </a>
              </div>

              {/* Social Badges */}
              <div className="flex items-center gap-3 pt-2 text-[var(--color-text-muted)]">
                <a
                  href="https://github.com/Deekhita-11/Deekhita-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://leetcode.com/u/Deekhita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] transition-all shadow-sm"
                >
                  <SiLeetcode size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Terminal (6 cols on lg) - SIDE BY SIDE */}
            <div className="lg:col-span-6 w-full">
              <InteractiveTerminal />
            </div>

          </div>

          {/* Key Metric Chips Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">ACADEMICS</span>
              <span className="font-bold text-base text-[var(--color-text)]">8.68 CGPA</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">ROBOGENIX</span>
              <span className="font-bold text-base text-[var(--color-accent)]">COORDINATOR</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">TECH STACK</span>
              <span className="font-bold text-base text-[var(--color-warm)]">REACT &amp; MYSQL</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">LEETCODE</span>
              <span className="font-bold text-base text-[var(--color-accent)]">187+ SOLVED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}