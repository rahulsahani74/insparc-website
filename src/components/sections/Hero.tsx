import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { AutomationScene } from "@/components/story/AutomationScene";

export function Hero() {
  return (
    <section className="story-hero relative isolate overflow-hidden" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="story-shell relative grid items-center gap-8 pb-8 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-12 lg:pt-24">
        <div className="relative z-10">
          <p className="eyebrow hero-enter"><span className="status-dot" /> AI automation. Human ambition.</p>
          <h1 id="hero-title" className="hero-title hero-enter mt-7">Less busywork.<br />More <em>possibility.</em></h1>
          <p className="hero-enter mt-7 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Your best work deserves your full attention. We connect your tools, build AI agents,
            and turn everyday tasks into workflows that take care of themselves.
          </p>
          <div className="hero-enter mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="story-button">Let’s build your workflow <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="#the-story" className="story-button story-button-secondary"><Play className="h-4 w-4" /> See how it works</Link>
          </div>
          <div className="hero-enter mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
            <span>Built around your business</span><span className="text-[var(--gold)]" aria-hidden="true">/</span><span>Connected to your existing tools</span>
          </div>
        </div>
        <div className="hero-enter relative min-w-0 lg:-mr-5"><AutomationScene stage={2} hero /></div>
        <div className="hero-enter flex items-center justify-between border-t border-[var(--border)] pt-6 lg:col-span-2">
          <a href="#the-story" className="inline-flex min-h-11 items-center gap-3 text-xs text-[var(--muted)] hover:text-[var(--gold)]"><ArrowDown className="h-4 w-4" /> Scroll to see the shift</a>
          <span className="hidden font-mono text-xs text-[var(--muted)] sm:block">From scattered tasks to connected systems</span>
        </div>
      </div>
    </section>
  );
}
