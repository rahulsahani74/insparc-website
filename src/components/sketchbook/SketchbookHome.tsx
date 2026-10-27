import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { WorkflowSketchbook } from "./WorkflowSketchbook";
import { WorkflowTheaterStrip } from "@/components/sections/WorkflowTheaterStrip";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { HomeClosing } from "@/components/story/HomeClosing";
import { solutions as products } from "@/data/solutions";
import { WorkingProcess } from "@/components/sections/WorkingProcess";

export function SketchbookHome() {
  return <>
    <section className="sketch-hero" aria-labelledby="studio-heading">
      <div className="story-shell"><div className="edition"><span>Insparc Technologies</span><span>Notes on a better working day</span></div>
        <h1 id="studio-heading">Grow your business.<br /><em>Simplify your work.</em></h1>
        <p className="hero-note">We help you manage customer enquiries, organise everyday work and build a stronger digital presence. Clear plans, thoughtful execution and a team that keeps you involved.</p>
        <div className="sketch-hero-actions"><Link href="/audit" className="story-button">Find your first automation <ArrowUpRight className="h-5 w-5" /></Link><a href="#projects" className="explore-link">Look through our work <ArrowDown className="h-5 w-5" /></a></div>
      </div>
      <WorkflowSketchbook />
      <p className="paper-caption story-shell pb-10">A field guide to connected work. Turn a page, zoom in, or explore the workflows below.</p>
    </section>
    <section className="story-shell pb-20" id="studio">
      <div className="sketch-intro"><div><p className="eyebrow">A small introduction</p><h2 className="story-heading mt-5">A better way to manage<br /><em>the way you work.</em></h2></div><p>Your business deserves more time for customers and fewer unfinished handoffs. We look at how work happens today, agree what needs to improve and create a clear process your team can follow. From customer support to digital marketing, you know what we are doing and why.</p></div>
      <div className="sketch-index" id="capabilities">{[
        ["01", "Connect the everyday.", "Enquiries, customer updates and team handoffs, with clear responsibilities.", "/services/workflow-automation"],
        ["02", "Reach your next customer.", "Social content, local advertising and business visibility, planned around your goals.", "/digital-marketing"],
        ["03", "Start with a clear map.", "An automation audit to spot the repetitive tasks worth changing first.", "/audit"],
      ].map(([number,title,text,href]) => <Link href={href!} key={number} data-reveal><span className="eyebrow">{number} / In practice</span><h3>{title}</h3><p>{text}</p><span className="explore-link mt-4">Take a closer look <ArrowUpRight className="h-5 w-5" /></span></Link>)}</div>
    </section>
    <WorkingProcess />
    <WorkflowTheaterStrip />
    <ProjectsGrid />
    <section className="story-shell py-12" aria-labelledby="audit-invitation"><div className="audit-band"><div><p className="eyebrow">A sensible place to begin</p><h2 id="audit-invitation" className="story-heading mt-4">What keeps your team<br /><em>busy, but not moving?</em></h2></div><div><p className="text-base text-[var(--muted)]">Walk through your current process. Get a short, useful brief with the opportunities, the responsibilities involved and a practical first step.</p><Link href="/audit" className="story-button mt-6">Map my workflow <ArrowUpRight className="h-5 w-5" /></Link></div></div></section>
    <section id="marketplace" className="story-shell py-16"><div className="max-w-2xl"><p className="eyebrow">Ways we can help</p><h2 className="story-heading mt-4">A few useful<br /><em>starting points.</em></h2><p className="mt-6 text-base text-[var(--muted)]">Explore common customer journeys and the services we can tailor to your business. Each engagement starts with a clear scope and agreed responsibilities.</p><Link href="/products" className="explore-link mt-4">Explore business solutions <ArrowUpRight className="h-5 w-5" /></Link></div>
      <div className="mt-10 border-t border-[var(--border)]">{products.map((product,index) => <Link key={product.slug} href={`/products/${product.slug}`} className="flex items-start justify-between gap-6 border-b border-[var(--border)] py-6"><span className="text-xs text-[var(--muted)]">0{index+1}</span><span className="mr-auto max-w-3xl font-display text-2xl">{product.title}</span><ArrowUpRight className="mt-2 h-5 w-5 shrink-0" /></Link>)}</div>
    </section>
    <HomeClosing />
  </>;
}
