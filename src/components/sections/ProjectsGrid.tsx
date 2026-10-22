import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, MessageSquare } from "lucide-react";
import { projects } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/config/site";

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 sm:py-28 bg-[var(--bg)] relative border-t border-[var(--border)]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3 py-1 text-xs">
            Client & In-House Solutions
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-5">
            Real n8n Projects Showcase.
          </h2>
          <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Every project below represents an active or ready-to-deploy workflow architecture.
            Inspect the mechanics or request a customized implementation for your business.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10">
          {projects.slice(0, 4).map((project) => (
            <Card
              key={project.slug}
              className="flex flex-col overflow-hidden group hover:border-[var(--gold)]/80 transition-all duration-300"
            >
              {/* Minimal Browser Frame Header */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)] select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                <span className="text-[11px] font-mono text-[var(--muted)]/50 ml-3 truncate">
                  insparc.in/projects/{project.slug}
                </span>
              </div>

              {/* Project Screenshot / Visual Preview */}
              <div className="relative w-full aspect-[16/10] bg-[var(--surface-2)]/50 overflow-hidden border-b border-[var(--border)]/70">
                <Image
                  src={project.images[0] ?? `/projects/${project.slug}/placeholder.svg`}
                  alt={`${project.title} workflow preview`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="gold" className="text-[11px] backdrop-blur-md bg-[var(--surface)]/90">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-2xl text-[var(--text)] mb-3 group-hover:text-[var(--gold)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Tools Chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <span className="text-xs font-mono text-[var(--muted)]/60 flex items-center gap-1 mr-1">
                      <Layers className="w-3 h-3" /> Stack:
                    </span>
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-5 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold)] hover:text-[var(--gold-soft)] transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button size="sm" variant="secondary" asChild>
                    <a
                      href={getWhatsAppUrl(
                        `Hi Insparc team, I saw your "${project.title}" project and would like to request this automation for my company.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request This Automation</span>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-14 flex justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/projects" className="gap-2">
              <span>Explore All Automated Workflows</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

