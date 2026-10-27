"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Server-rendered content stays visible without JS; only offscreen content is enhanced. */
export function PageExperience() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const main = document.getElementById("main-content");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = main?.querySelectorAll<HTMLElement>("[data-reveal], h2:not([data-reveal] h2)");
    if (!targets || !("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver | undefined;
    const reset = () => targets.forEach((node) => node.classList.remove("reveal-ready", "is-revealed"));
    const setup = () => {
      observer?.disconnect();
      reset();
      if (motion.matches) return;
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        }
      }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      targets.forEach((node) => {
        if (node.getBoundingClientRect().top > window.innerHeight * 0.9) {
          node.classList.add("reveal-ready");
          observer?.observe(node);
        }
      });
    };
    setup();
    motion.addEventListener("change", setup);
    return () => { observer?.disconnect(); motion.removeEventListener("change", setup); reset(); };
  }, [pathname]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);
  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
