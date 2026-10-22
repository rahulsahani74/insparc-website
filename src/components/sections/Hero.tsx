"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, Sparkles, ArrowRight, Zap, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OrbFallback } from "@/components/3d/OrbFallback";

// Lazy-load R3F 3D Scene with ssr: false and high-fidelity fallback
const Scene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => <OrbFallback />,
  }
);

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-10 pb-12 overflow-hidden">
      {/* Background radial ambient lights */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse,rgba(201,162,75,0.09)_0%,rgba(16,22,43,0)_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-5 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10 animate-fade-up">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="gold" className="px-3.5 py-1 text-xs gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" aria-hidden="true" />
              <span>AI Automation Architecture</span>
            </Badge>
          </div>

          {/* 2-line Serif Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight leading-[1.1] mb-6">
            Automation That Works{" "}
            <span className="text-[var(--gold)] italic">While You Sleep.</span>
          </h1>

          {/* Subcopy */}
          <p className="text-[var(--muted)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-9">
            We build enterprise-grade WhatsApp bots, intelligent voice agents, and custom n8n
            workflows that capture every lead and streamline your operations 24/7.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
            <Button size="lg" variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/contact" className="group">
                Book a Free Demo
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="/demo">Watch Live Demo</Link>
            </Button>
          </div>

          {/* Value Pillars (strictly no fake stats, real technical value points) */}
          <div className="pt-8 border-t border-[var(--border)]/70 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--gold)] font-medium">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Instant</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)]">24/7 Lead Response</p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--gold)] font-medium">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Custom</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)]">Tailored n8n Stacks</p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--gold)] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Private</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)]">Self-Hosted or Cloud</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Hero Orb */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full aspect-square max-w-[440px] sm:max-w-[480px] mx-auto z-10">
          <Scene />
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex flex-col items-center justify-center pt-8 text-[var(--muted)]/60 hover:text-[var(--gold)] transition-colors select-none">
        <a
          href="#workflow-theater"
          className="flex flex-col items-center gap-2 text-xs font-mono tracking-wider uppercase group"
          aria-label="Scroll down to Workflow Theater"
        >
          <span>Watch an automation run</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-[var(--gold)]" />
        </a>
      </div>
    </section>
  );
}

