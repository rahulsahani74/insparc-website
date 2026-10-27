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
            <span>03 / See the connections</span>
          </Badge>
          <h2 className="story-heading mb-5">
            Less mystery. <em>More visibility.</em>
          </h2>
          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Follow an example from the first enquiry to the final handoff. Pick a scenario,
            press play, and see how the pieces work together. This is an interactive simulation.
          </p>
        </div>

        {/* Workflow Theater Interactive Component */}
        <WorkflowTheater />
      </div>
    </section>
  );
}

