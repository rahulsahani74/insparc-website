import { WorkflowTheater } from "@/components/workflow/WorkflowTheater";
import { Badge } from "@/components/ui/Badge";
import { Activity } from "lucide-react";

export function WorkflowTheaterStrip() {
  return (
    <section
      id="workflow-theater"
      className="py-16 sm:py-24 bg-[var(--bg)] border-t border-[var(--border)] relative"
    >
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 animate-fade-up">
          <Badge variant="gold" className="mb-4 gap-1.5 px-3 py-1 text-xs">
            <Activity className="w-3.5 h-3.5 text-[var(--gold)]" aria-hidden="true" />
            <span>Interactive Workflow Simulation</span>
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-4">
            Watch An Automation Run In Real Time.
          </h2>
          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            See how data flows seamlessly between triggers, AI reasoning models, CRM
            databases, and messaging outputs across our custom n8n architectures.
          </p>
        </div>

        {/* Workflow Theater Interactive Component */}
        <WorkflowTheater />
      </div>
    </section>
  );
}

