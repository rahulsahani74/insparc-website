import { cn } from "@/lib/utils";

interface OrbFallbackProps {
  className?: string;
}

/**
 * Elegant CSS/SVG fallback for the 3D Hero Orb.
 * Used on mobile devices, low-power devices, reduced-motion preferences,
 * and while the Three.js bundle is lazily loading.
 */
export function OrbFallback({ className }: OrbFallbackProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full max-w-[380px] sm:max-w-[460px] aspect-square select-none pointer-events-none",
        className
      )}
      aria-label="3D neural automation sphere visual"
      role="img"
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.18)_0%,rgba(92,200,255,0.06)_40%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Main Glass-and-Gold Orb */}
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F3E3B6_0%,#C9A24B_35%,#151C36_75%,#0B1020_100%)] shadow-[0_0_50px_10px_rgba(201,162,75,0.22),inset_-10px_-10px_30px_rgba(11,16,32,0.8),inset_8px_8px_20px_rgba(243,227,182,0.4)] animate-float border border-[var(--gold)]/30 backdrop-blur-sm">
        {/* Specular highlight */}
        <div className="absolute top-5 left-7 w-14 h-9 rounded-full bg-white/40 blur-[4px] rotate-[-25deg]" />

        {/* Inner neural network pulse */}
        <div className="absolute inset-0 rounded-full border border-[var(--gold)]/20 animate-pulse-ring" />
      </div>

      {/* Primary Orbit Ring (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]"
        viewBox="0 0 460 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse
          cx="230"
          cy="230"
          rx="190"
          ry="65"
          transform="rotate(-28 230 230)"
          stroke="url(#orbitGradient1)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.8"
        />
        {/* Orbital Node 1 */}
        <circle cx="90" cy="160" r="4.5" fill="#C9A24B" />
        <circle cx="90" cy="160" r="8" fill="#C9A24B" opacity="0.3" />
        {/* Orbital Node 2 */}
        <circle cx="370" cy="300" r="4.5" fill="#5CC8FF" />
        <circle cx="370" cy="300" r="8" fill="#5CC8FF" opacity="0.3" />

        <defs>
          <linearGradient
            id="orbitGradient1"
            x1="40"
            y1="165"
            x2="420"
            y2="295"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9A24B" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#5CC8FF" stopOpacity="0.4" />
            <stop offset="1" stopColor="#C9A24B" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Secondary Counter-Orbit Ring */}
      <svg
        className="absolute inset-0 w-full h-full animate-[spin_32s_linear_infinite_reverse]"
        viewBox="0 0 460 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse
          cx="230"
          cy="230"
          rx="160"
          ry="55"
          transform="rotate(40 230 230)"
          stroke="url(#orbitGradient2)"
          strokeWidth="1.2"
          opacity="0.6"
        />
        {/* Orbital Node 3 */}
        <circle cx="330" cy="150" r="3.5" fill="#F3E3B6" />
        <circle cx="330" cy="150" r="7" fill="#F3E3B6" opacity="0.25" />

        <defs>
          <linearGradient
            id="orbitGradient2"
            x1="70"
            y1="175"
            x2="390"
            y2="285"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F3E3B6" stopOpacity="0.6" />
            <stop offset="1" stopColor="#2A3150" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

