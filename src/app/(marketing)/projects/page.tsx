import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Badge } from "@/components/ui/Badge";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Real n8n Projects Showcase",
  description:
    "Explore real-world n8n automation projects: WhatsApp chatbots, automated email sequences, CRM data routing, and RAG knowledge assistants.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center max-w-container mx-auto px-5 lg:px-8 animate-fade-up">
        <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
          Production Architecture Showcase
        </Badge>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-6">
          Real Automated Workflows,{" "}
          <span className="text-[var(--gold)]">Zero Fluff.</span>
        </h1>
        <p className="text-[var(--muted)] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Detailed breakdowns of real n8n automations, from trigger webhooks to AI reasoning
          and secure CRM storage. Browse the stack, inspect execution steps, or request a customized deployment.
        </p>
      </section>

      {/* Projects Grid */}
      <ProjectsGrid />
    </div>
  );
}

