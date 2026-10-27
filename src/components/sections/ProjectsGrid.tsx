import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function ProjectsGrid({ showIntro = true }: { showIntro?: boolean }) {
  return <section id="projects" className={`${showIntro ? "story-section" : "pb-20"} story-shell`}>
    {showIntro && <div className="section-intro"><div><p className="eyebrow">From the workflow notebook</p><h2 className="story-heading mt-5">Different problems.<br /><em>Considered connections.</em></h2></div><p className="section-description">Four ways a working day could be simpler. These illustrated service studies show how work can move forward. They are examples, rather than client screenshots or verified results.</p></div>}
    <div className="project-catalog">{projects.map((project,index) => <article key={project.slug} data-reveal>
      <Link href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}><Image src={project.images[0]!} alt={`Illustrated ${project.title} customer journey: ${project.workflowSteps.join("; ")}`} width={1200} height={760} className="paper-figure" sizes="(max-width: 767px) 100vw, 50vw" /></Link>
      <p className="paper-caption">Study 0{index+1} / {project.category}</p><h3 className="mt-4"><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p className="project-summary">{project.summary}</p><Link href={`/projects/${project.slug}`} className="explore-link">Read the workflow notes <ArrowUpRight className="h-5 w-5" /></Link>
    </article>)}</div>
  </section>;
}
