"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroOrb } from "@/components/3d/HeroOrb";
import { OrbFallback } from "@/components/3d/OrbFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SceneProps {
  className?: string;
}

/**
 * 3D Canvas Scene Wrapper.
 * - Pauses rendering when scrolled offscreen (IntersectionObserver).
 * - Falls back to high-fidelity SVG/CSS orb if reduced-motion is requested or WebGL is unsupported.
 * - Enforces dpr={[1, 1.5]} for performance.
 */
export function Scene({ className }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const prefersReduced = useReducedMotion();

  // 1. Detect WebGL2 / WebGL availability safely
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // 2. Pause Canvas frameloop when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Use fallback if reduced-motion preferred or WebGL unsupported
  if (prefersReduced || hasWebGL === false) {
    return <OrbFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={className ?? "relative w-full max-w-[460px] aspect-square flex items-center justify-center"}
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <HeroOrb />
      </Canvas>
    </div>
  );
}

