import Link from "next/link";
import { ArrowUpRight, Bot, Database, FileText, MessageCircle, Network, Workflow } from "lucide-react";

const capabilities = [
  { icon: Workflow, title: "Workflows that join the dots.", description: "Connect your apps and move information without the copy-and-paste routine.", href: "n8n-workflow-automation", label: "01 / Connected operations", wide: true },
  { icon: MessageCircle, title: "Every conversation, a next step.", description: "WhatsApp journeys for inquiries, lead qualification, and booking requests.", href: "whatsapp-automation", label: "02 / Customer conversations" },
  { icon: Bot, title: "AI with a job to do.", description: "Purpose-built assistants that work with your business context and clear guardrails.", href: "custom-ai-agents", label: "03 / Useful intelligence" },
  { icon: Database, title: "A clearer picture of every lead.", description: "Keep your pipeline and customer records connected across the tools you use.", href: "crm-pipeline-automation", label: "04 / Sales operations" },
  { icon: FileText, title: "Documents into usable data.", description: "Extract, structure, and route information, with review for the important details.", href: "document-ai", label: "05 / Back-office clarity" },
];

export function HomeCapabilities() {
  return (
    <section id="capabilities" className="story-section border-y border-[var(--border)] bg-[var(--surface)]/50">
      <div className="story-shell">
        <div className="section-intro"><div><p className="eyebrow">02 / What we build</p><h2 className="story-heading mt-5">Good technology.<br /><em>Better working days.</em></h2></div><p className="section-description">Start where the friction is. We build around your process, your people, and the tools you already know.</p></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, description, href, label, wide }, index) => (
            <Link key={href} href={`/services/${href}`} data-reveal style={{ "--reveal-delay": `${(index % 3) * 65}ms` } as React.CSSProperties} className={`capability-card group ${wide ? "md:col-span-2 lg:col-span-2" : ""}`}>
              <div className="flex items-start justify-between"><div className="capability-icon"><Icon className="h-6 w-6" strokeWidth={1.4} /></div><ArrowUpRight className="h-5 w-5 text-[var(--muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--gold)]" /></div>
              {wide && <div className="capability-flow" aria-hidden="true"><span>Inquiry</span><i /><Network className="h-5 w-5 text-[var(--gold)]" /><i /><span>Next step</span></div>}
              <div className={wide ? "relative mt-8" : "mt-12"}><span className="scene-caption">{label}</span><h3 className="mt-3 font-display text-2xl sm:text-3xl">{title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">{description}</p></div>
            </Link>
          ))}
        </div>
        <div className="mt-9 flex flex-col items-center gap-5 text-center text-sm"><Link href="/services" className="explore-link">Explore all services <ArrowUpRight className="h-4 w-4" /></Link><p className="max-w-xl text-[var(--muted)]">Need growth marketing alongside your automation? We can help with that too.</p></div>
      </div>
    </section>
  );
}
