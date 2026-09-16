import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState("default"); // 'default' | 'link' | 'explore' | 'inspect'
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    document.body.style.cursor = "none";

    const handleMouseMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target instanceof Element ? e.target : e.target?.parentElement;
      if (!target || typeof target.closest !== "function") return;

      const inspectEl = target.closest('[data-cursor="inspect"]');
      const exploreEl = target.closest('[data-cursor="explore"], [data-cursor="project"]');
      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select");

      if (inspectEl) {
        setCursorType("inspect");
      } else if (exploreEl) {
        setCursorType("explore");
      } else if (interactiveEl) {
        setCursorType("link");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[999999] select-none">
      {/* ── Precision Reticle Cursor with Theme Accent ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ x: pos.x, y: pos.y }}
        animate={{
          scale: isClicking ? 0.75 : cursorType === "link" ? 1.25 : 1,
          rotate: cursorType === "explore" ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {/* Outer Corner Brackets */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          {/* Top-Left Bracket */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)]" />
          {/* Top-Right Bracket */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-accent)]" />
          {/* Bottom-Left Bracket */}
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-accent)]" />
          {/* Bottom-Right Bracket */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-accent)]" />

          {/* Center Precision Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isClicking ? "bg-[var(--color-warm)]" : "bg-[var(--color-accent)]"
            } shadow-[0_0_8px_var(--color-accent)]`}
          />
        </div>

        {/* Floating Context Label */}
        <AnimatePresence>
          {(cursorType === "inspect" || cursorType === "explore" || cursorType === "link") && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute left-5 top-5 px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-accent)] text-[9px] font-mono font-bold text-[var(--color-accent)] whitespace-nowrap shadow-md"
            >
              {cursorType === "inspect" ? "INSPECT ↗" : cursorType === "explore" ? "VIEW ↗" : "SELECT"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}