import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorState, setCursorState] = useState('default');
  
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });
  const cursorRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updatePosition = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.2;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target;
      
      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        setCursorState(cursorAttr.getAttribute('data-cursor'));
        return;
      }

      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      if (isInteractive) {
        setCursorState('hover');
        return;
      }
      
      setCursorState('default');
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  let size = 22;
  let label = null;
  let isFilled = false;
  let isExpanded = false;

  if (cursorState === 'hover') {
    size = 14;
    isFilled = true;
  } else if (cursorState === 'project') {
    size = 76;
    label = 'VIEW PROJECT';
    isExpanded = true;
  } else if (cursorState === 'architecture') {
    size = 76;
    label = 'EXPLORE FLOW';
    isExpanded = true;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full will-change-transform"
    >
      <motion.div
        className="flex items-center justify-center rounded-full overflow-hidden"
        animate={{
          width: size,
          height: size,
          backgroundColor: isFilled ? 'var(--color-accent)' : 'transparent',
          borderColor: 'var(--color-accent)',
          borderWidth: isFilled ? 0 : 2,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[9px] font-mono font-bold text-center tracking-wider text-[#121313] leading-tight px-1"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cursor;
