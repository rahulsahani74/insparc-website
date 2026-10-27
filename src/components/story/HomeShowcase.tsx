import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Check, FileJson, MessageCircle, ShoppingBag, Workflow } from "lucide-react";
import { products } from "@/data/products";
import { projects } from "@/data/projects";

const productIcons = [MessageCircle, Workflow, Bot, ShoppingBag];

export function IntegrationStrip() {
  return (
    <div data-integration-strip className="border-y border-[var(--border)] bg-[var(--surface)]/40">
      <div className="story-shell flex flex-col items-center justify-between gap-5 py-6 lg:flex-row">
        <p className="max-w-48 text-center text-xs leading-relaxed text-[var(--muted)] lg:text-left">New possibilities.<br /><span className="text-[var(--text)]">With the tools you already use.</span></p>
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:gap-x-10" aria-label="Tools we build integrations with">
          {["n8n", "WhatsApp", "OpenAI", "HubSpot", "Google Sheets", "Shopify"].map((tool) => <li key={tool} className="text-sm font-medium tracking-tight text-[var(--muted)] sm:text-base">{tool}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function HomeMarketplace() {
  return (
    <section id="marketplace" className="story-section border-y border-[var(--border)] bg-[var(--surface)]/50">
      <div className="story-shell">
        <div className="marketplace-intro mb-11 max-w-3xl"><p className="eyebrow">05 / A head start</p><h2 className="story-heading mt-5">Build it your way.<br /><em>Start a step ahead.</em></h2><p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">Prefer a hands-on start? Explore n8n workflow packages with editable JSON files and setup guides. You connect your own accounts and credentials.</p><Link href="/products" className="explore-link mt-4">Explore the template library <ArrowUpRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const Icon = productIcons[index] ?? Workflow;
            return (
              <Link key={product.slug} href={`/products/${product.slug}`} data-reveal className="template-card group">
                <div className="template-art" aria-hidden="true"><div className="template-art-ring" /><Icon className="relative h-9 w-9 text-[var(--gold)]" strokeWidth={1.25} /><span className="template-art-node"><FileJson className="h-4 w-4" /></span></div>
                <div className="p-5"><p className="scene-caption">{product.category}</p><h3 className="mt-3 text-base font-medium leading-snug">{product.title}</h3><div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4"><span className="text-xs text-[var(--muted)]">View package</span><ArrowUpRight className="h-4 w-4 text-[var(--gold)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeProjects() {
  return (
    <section id="projects" className="story-section">
      <div className="story-shell">
        <div className="section-intro"><div><p className="eyebrow">06 / Under the surface</p><h2 className="story-heading mt-5">The thinking behind<br /><em>the workflow.</em></h2></div><p className="section-description">Explore example architectures, the problems they address, and the tools that connect them. These are illustrative project previews; verified client case studies will follow.</p></div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.slice(0, 2).map((project, index) => <Link href={`/projects/${project.slug}`} key={project.slug} data-reveal className="project-story-card group">
            <div className="project-story-art" aria-hidden="true"><span className="project-path">Inquiry <i /> {index === 0 ? "AI assistant" : "Email logic"} <i /> Follow-up</span><div className="project-node"><MessageCircle className="h-6 w-6" /></div><div className="project-wire" /><div className="project-node project-node-center">{index === 0 ? <Bot className="h-9 w-9" strokeWidth={1.3} /> : <Workflow className="h-9 w-9" strokeWidth={1.3} />}</div><div className="project-wire" /><div className="project-node"><Check className="h-6 w-6" /></div></div>
            <div className="p-6 sm:p-8"><p className="scene-caption">Architecture preview / {project.category}</p><h3 className="mt-3 flex items-center justify-between gap-3 font-display text-2xl">{project.title}<ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--gold)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></h3><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.summary}</p></div>
          </Link>)}
        </div>
        <Link href="/projects" className="explore-link mt-6">Explore all project previews <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
