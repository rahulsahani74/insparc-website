"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user has requested reduced motion via OS/browser settings.
 * Defaults to false on the server (SSR-safe).
 * Use this to disable animations for accessibility.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}
