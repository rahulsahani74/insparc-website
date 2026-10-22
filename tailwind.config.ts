import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens mapped from CSS variables
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        gold: "var(--gold)",
        "gold-soft": "var(--gold-soft)",
        run: "var(--run)",
        ok: "var(--ok)",
        err: "var(--err)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Design scale: 68/46/34/24/19/16/14
        "display-xl": ["4.25rem", { lineHeight: "1.05", fontWeight: "600" }],
        "display-lg": ["2.875rem", { lineHeight: "1.08", fontWeight: "600" }],
        "display-md": ["2.125rem", { lineHeight: "1.1", fontWeight: "500" }],
        "display-sm": ["1.5rem", { lineHeight: "1.2", fontWeight: "500" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        // Section padding
        "section-desktop": "6rem",
        "section-mobile": "4rem",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "18px",
        input: "12px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(0,0,0,0.3)",
        "gold-glow": "0 0 32px 8px rgba(201,162,75,0.18)",
        "run-glow": "0 0 24px 6px rgba(92,200,255,0.2)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.2", transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "packet-travel": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "20%": { opacity: "1", transform: "scale(1)" },
          "80%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.5)" },
        },
        "type-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "pulse-ring": "pulse-ring 1.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "type-cursor": "type-cursor 1s step-end infinite",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
