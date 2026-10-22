import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Zap, Globe, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

export const metadata: Metadata = buildSeo({
  title: "Careers — Build The Future of AI Automation at Insparc",
  description:
    "Join the Insparc Technology engineering team. We are building the next generation of business workflow engines and AI automation systems.",
  path: "/careers",
});

const openRoles = [
  {
    title: "n8n & Backend Workflow Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-Time / Contract",
    description:
      "Design, build, and stress-test complex multi-step n8n workflows, custom webhook endpoints, and database integrations for enterprise clients.",
  },
  {
    title: "AI Solutions Architect (LLMs & RAG)",
    department: "AI & Intelligence",
    location: "Remote (India)",
    type: "Full-Time",
    description:
      "Architect retrieval-augmented generation (RAG) pipelines, system prompt guardrails, and structured function-calling mechanisms for conversational WhatsApp bots.",
  },
  {
    title: "Automation Implementation Specialist",
    department: "Client Solutions",
    location: "Remote (India)",
    type: "Full-Time",
    description:
      "Work directly with founders and operations teams to map their business processes, audit bottlenecks, and supervise deployment and handover.",
  },
];

export default function CareersPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Join Insparc
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Build Systems That <span className="text-[var(--gold)]">Actually Work.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            We are a lean, engineering-driven AI automation company. We prioritize real-world
            deliverables, clean architecture, and rapid deployment over vanity metrics.
          </p>
        </div>

        {/* Culture / Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="p-7 bg-[var(--surface)] border-[var(--border)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="font-display text-lg text-[var(--text)] mb-2">
              100% Remote-First
            </h2>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Work from anywhere across India. We evaluate output and code quality, not hours in a chair.
            </p>
          </Card>

          <Card className="p-7 bg-[var(--surface)] border-[var(--border)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--run)]/10 text-[var(--run)] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="font-display text-lg text-[var(--text)] mb-2">
              High Impact & Autonomy
            </h2>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              You will own end-to-end automation pipelines from architecture design to live production deployment.
            </p>
          </Card>

          <Card className="p-7 bg-[var(--surface)] border-[var(--border)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--ok)]/10 text-[var(--ok)] flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="font-display text-lg text-[var(--text)] mb-2">
              Cutting-Edge Tech Stack
            </h2>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Daily hands-on work with n8n, OpenAI, Anthropic Claude, vector databases, and Next.js.
            </p>
          </Card>
        </div>

        {/* Open Roles Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-2 text-xs">
              Opportunities
            </Badge>
            <h2 className="font-display text-3xl text-[var(--text)]">
              Current Open Roles
            </h2>
          </div>

          <div className="space-y-6">
            {openRoles.map((role) => (
              <Card
                key={role.title}
                className="p-7 bg-[var(--surface)] border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--gold)]/60 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl text-[var(--text)]">
                      {role.title}
                    </h3>
                    <Badge variant="gold" className="text-[10px]">
                      {role.department}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--muted)] max-w-xl leading-relaxed">
                    {role.description}
                  </p>
                  <p className="text-[11px] font-mono text-[var(--muted)]/60">
                    {role.location} • {role.type}
                  </p>
                </div>

                <Button size="sm" variant="secondary" asChild className="shrink-0">
                  <Link href={`/contact?interest=Career+Application:+${encodeURIComponent(role.title)}`}>
                    Apply Now
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* General Application Callout */}
        <div className="max-w-3xl mx-auto p-8 rounded-card bg-[var(--surface-2)] border border-[var(--border)] text-center">
          <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto mb-3" />
          <h3 className="font-display text-xl text-[var(--text)] mb-2">
            Don&apos;t See Your Specific Title?
          </h3>
          <p className="text-xs text-[var(--muted)] mb-5 max-w-md mx-auto leading-relaxed">
            If you are an exceptional n8n workflow builder or AI engineer, we always want to hear from you.
            Email your portfolio or GitHub profile to {siteConfig.email}.
          </p>
          <Button size="sm" variant="primary" asChild>
            <a href={`mailto:${siteConfig.email}?subject=General Application — Automation Engineer`}>
              Send Open Application
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
