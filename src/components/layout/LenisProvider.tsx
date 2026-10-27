"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Initialises Lenis smooth scroll globally.
 * Automatically disabled when the user prefers reduced motion.
 * Must be rendered inside the root layout as a client component.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip smooth scroll for users who prefer reduced motion
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      anchors: { offset: -100 },
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const lockScroll = (event: Event) => {
      if ((event as CustomEvent<boolean>).detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("insparc:scroll-lock", lockScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("insparc:scroll-lock", lockScroll);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
