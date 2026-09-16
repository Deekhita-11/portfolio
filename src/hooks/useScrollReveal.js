import { useEffect, useRef } from "react";

/**
 * Attach a ref to any element — it will get the `.visible` class
 * (triggering the `.reveal` CSS animation) once it enters the viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el); // animate once
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
