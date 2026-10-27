import { ArrowDown, ArrowRight, Bot, CalendarDays, Check, Database, Mail, MessageCircle, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { label: "The everyday bottleneck", status: "Waiting for your team", result: "The follow-up is still on your to-do list." },
  { label: "The connected workflow", status: "Your workflow takes over", result: "Customer context reaches the right place." },
  { label: "The space to grow", status: "Ready for a human conversation", result: "Your team can focus on the relationship." },
];

export function AutomationScene({ stage, hero = false }: { stage: number; hero?: boolean }) {
  const current = stages[stage] ?? stages[0]!;
  return (
    <div className={cn("automation-scene", hero && "automation-scene-hero")} data-stage={stage}>
      <div className="scene-orbit scene-orbit-one" aria-hidden="true" /><div className="scene-orbit scene-orbit-two" aria-hidden="true" />
      <div className="scene-topline"><span className="inline-flex items-center gap-2"><Workflow className="h-3.5 w-3.5 text-[var(--gold)]" /> INSPARC / workflow studio</span><span>Illustrative demo</span></div>
      <div className="scene-workspace">
        <div className="scene-input">
          <div className="scene-icon"><MessageCircle className="h-5 w-5" /></div>
          <div><span className="scene-caption">New customer inquiry</span><p className="mt-1 text-sm font-medium">“Can I book a demo?”</p></div>
          <span className="ml-auto hidden text-xs text-[var(--muted)] sm:block">Just now</span>
        </div>
        <div className={cn("scene-connector", stage > 0 && "is-connected")} aria-hidden="true"><span /><ArrowDown className="h-4 w-4" /></div>
        <div className={cn("scene-engine", stage > 0 && "is-connected")}>
          <div className="scene-engine-icon"><Bot className="h-8 w-8" strokeWidth={1.3} /></div>
          <div className="relative min-w-0"><span className="scene-caption">Your automation engine</span><p className="mt-1 font-display text-2xl">A little intelligence.<br /><span className="text-[var(--gold)]">A lot less friction.</span></p></div>
          <div className="scene-engine-signal" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
        <div className={cn("scene-connector", stage > 0 && "is-connected")} aria-hidden="true"><span /><ArrowDown className="h-4 w-4" /></div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[{ icon: Database, label: "CRM updated" }, { icon: Mail, label: "Reply prepared" }, { icon: CalendarDays, label: "Next step set" }].map(({ icon: Icon, label }) => (
            <div key={label} className={cn("scene-output", stage === 2 && "is-connected")}><Icon className="h-4 w-4" /><span>{label}</span><Check className="scene-output-check h-3 w-3" /></div>
          ))}
        </div>
        <div className="scene-result mt-5 flex items-start gap-3">
          <div className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", stage === 2 ? "bg-[var(--ok)]" : "bg-[var(--gold)]")} />
          <div><p className="text-xs font-medium">{current.status}</p><p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{current.result}</p></div>
          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[var(--gold)]" />
        </div>
      </div>
      <div className="scene-bottomline"><span>{hero ? "A connected customer journey" : current.label}</span><span className="font-mono">0{stage + 1} / 03</span></div>
    </div>
  );
}
