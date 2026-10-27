import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const steps = [
  { title: "Listen first.", description: "We learn how your team works, where time goes, and what a useful outcome looks like.", result: "A clear starting point" },
  { title: "Map the possibilities.", description: "Together, we sketch the workflow, choose the tools, and agree on human checkpoints.", result: "A blueprint you understand" },
  { title: "Build. Test. Refine.", description: "We connect the pieces and test real scenarios, exceptions, and handoffs before going live.", result: "A workflow ready for your team" },
  { title: "Make it yours.", description: "You get a walkthrough, documentation, and a clear plan for maintaining the system as you grow.", result: "A confident handover" },
];

export function HowWeWork() {
  return (
    <section id="process" className="story-section border-y border-[var(--border)] bg-[var(--surface)]/50">
      <div className="story-shell">
        <div className="section-intro"><div><p className="eyebrow">07 / From idea to everyday</p><h2 className="story-heading mt-5">A thoughtful process.<br /><em>A useful outcome.</em></h2></div><p className="section-description">You don’t need a finished technical brief. Bring the problem. We’ll work through the possibilities together.</p></div>
        <ol className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => <li key={step.title} data-reveal className="process-step"><span className="process-index">0{index + 1}</span><h3 className="mt-7 font-display text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p><p className="mt-6 border-t border-[var(--border)] pt-4 text-xs text-[var(--gold)]">{step.result}</p></li>)}
        </ol>
        <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--gold)]">Start with a conversation <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
