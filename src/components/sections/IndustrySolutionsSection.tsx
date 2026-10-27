"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Workflow } from "lucide-react";
import { industries } from "@/data/industries";

export function IndustrySolutionsSection() {
  const [active, setActive] = useState(industries[0]!.slug);
  const industry = industries.find((item) => item.slug === active) ?? industries[0]!;
  return (
    <section id="industries" className="story-section border-t border-[var(--border)]">
      <div className="story-shell">
        <div className="section-intro"><div><p className="eyebrow">04 / Your world, connected</p><h2 className="story-heading mt-5">Different businesses.<br /><em>The same room to grow.</em></h2></div><p className="section-description">See where automation could fit into your working day. Choose an industry to explore an example journey.</p></div>
        <div className="industry-options" role="group" aria-label="Choose an industry">
          {industries.map((item) => <button key={item.slug} type="button" aria-controls="industry-example" aria-pressed={active === item.slug} onClick={() => setActive(item.slug)} className={`choice-control industry-chip ${active === item.slug ? "is-active" : ""}`}>{item.name}</button>)}
        </div>
        <div id="industry-example" className="mt-7 grid overflow-hidden rounded-[var(--story-radius)] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 sm:p-10"><p className="scene-caption">Example application / {industry.name}</p><h3 className="mt-5 font-display text-2xl leading-snug sm:text-3xl">{industry.tagline}</h3><ul className="mt-6 space-y-4">{industry.solutions.slice(0, 3).map((solution) => <li key={solution} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--muted)]"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--gold)]" />{solution}</li>)}</ul>{industry.complianceNote && <p className="mt-5 border-l border-[var(--gold)]/40 pl-4 text-xs leading-relaxed text-[var(--muted)]">{industry.complianceNote}</p>}<Link href={`/industries/${industry.slug}`} className="explore-link mt-7">Explore this industry <ArrowUpRight className="h-4 w-4" /></Link></div>
          <div className="border-t border-[var(--border)] bg-[var(--bg)] p-6 sm:p-10 lg:border-l lg:border-t-0"><div className="mb-5 flex items-center gap-2 text-xs text-[var(--gold)]"><Workflow className="h-4 w-4" /> A possible workflow</div><ol className="space-y-2">{industry.sampleFlow.map((step, index) => <li key={step}><div className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"><span className="font-mono text-xs text-[var(--gold)]">0{index + 1}</span><span className="text-xs leading-relaxed text-[var(--muted)]">{step}</span></div>{index < industry.sampleFlow.length - 1 && <ArrowDown className="mx-auto mt-2 h-4 w-4 text-[var(--gold)]" aria-hidden="true" />}</li>)}</ol></div>
        </div>
      </div>
    </section>
  );
}
