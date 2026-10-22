import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { projects } from "@/data/projects";
import { scenarios } from "@/data/scenarios";
import { WorkflowTheater } from "@/components/workflow/WorkflowTheater";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { generateMetadata as buildSeo } from "@/lib/seo";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return buildSeo({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Check if there is a matching Workflow Theater scenario
  const matchingScenario = scenarios.find((s) => s.id === project.slug);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-14 animate-fade-up">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="gold" className="text-xs">
              {project.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {project.status === "live" ? "Production" : "Architecture Verified"}
            </Badge>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted)] max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Browser Frame Preview Screenshot */}
        <div className="rounded-card border border-[var(--border)] bg-[var(--surface-2)] overflow-hidden shadow-2xl mb-16">
          <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)] select-none">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="text-xs font-mono text-[var(--muted)]/60 ml-2">
              workflow-preview://{project.slug}
            </span>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[560px] bg-[#0A0E1A]">
            <Image
              src={project.images[0] ?? `/projects/${project.slug}/placeholder.svg`}
              alt={`${project.title} interface screenshot`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left: Problem & Solution & Workflow Steps */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            <section className="p-8 rounded-card border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-2.5 text-[var(--gold)] mb-4">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="font-display text-2xl text-[var(--text)]">
                  The Operational Problem
                </h2>
              </div>
              <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">
                {project.problem.replace(/^\[.*?\]\s*—\s*/, "")}
              </p>
            </section>

            {/* The Engineered Solution */}
            <section className="p-8 rounded-card border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-2.5 text-[var(--ok)] mb-4">
                <Lightbulb className="w-5 h-5" />
                <h2 className="font-display text-2xl text-[var(--text)]">
                  The Automation Solution
                </h2>
              </div>
              <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">
                {project.solution.replace(/^\[.*?\]\s*—\s*/, "")}
              </p>
            </section>

            {/* Step-by-Step Execution Sequence */}
            <section>
              <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-6">
                Execution Pipeline
              </h2>
              <div className="space-y-4">
                {project.workflowSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <span className="w-7 h-7 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Live Interactive Workflow Theater (Embedded Replay) */}
            {matchingScenario && (
              <section className="pt-6">
                <div className="mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-2">
                    Interactive Workflow Replay
                  </h2>
                  <p className="text-sm text-[var(--muted)]">
                    Test the execution simulator below to inspect real-time data packets and terminal logs.
                  </p>
                </div>
                <WorkflowTheater initialScenarioId={matchingScenario.id} />
              </section>
            )}
          </div>

          {/* Right: Sticky Action & Tool Stack Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-8">
            {/* Direct CTA Request Card */}
            <Card className="p-6 sm:p-7 bg-[var(--surface-2)] border-[var(--gold)]/50 shadow-2xl">
              <h3 className="font-display text-xl text-[var(--text)] mb-2">
                Deploy This Automation
              </h3>
              <p className="text-xs text-[var(--muted)] mb-6 leading-relaxed">
                We can adapt this exact pipeline to your internal systems in as little as 3–7 business days.
              </p>

              <div className="space-y-3 mb-6">
                <Button fullWidth size="md" variant="primary" asChild>
                  <a
                    href={getWhatsAppUrl(
                      `Hi Insparc team, I'm looking at your "${project.title}" workflow and would like to build something similar.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request Via WhatsApp</span>
                  </a>
                </Button>

                <Button fullWidth size="md" variant="secondary" asChild>
                  <Link href={`/contact?project=${project.slug}`}>
                    Book Architecture Call
                  </Link>
                </Button>

                <Button fullWidth size="sm" variant="ghost" asChild>
                  <a href={`tel:${siteConfig.phone}`} className="gap-2 text-xs">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Us: {siteConfig.phone}</span>
                  </a>
                </Button>
              </div>

              <div className="pt-4 border-t border-[var(--border)] text-[11px] text-[var(--muted)]/70 space-y-1.5 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)]" />
                  <span>No subscription lock-in</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)]" />
                  <span>Self-hosted or managed</span>
                </div>
              </div>
            </Card>

            {/* Tools & Integrations */}
            <div className="p-6 rounded-card border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--gold)] uppercase tracking-wider mb-4">
                <Layers className="w-4 h-4" />
                <span>Integrated Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
