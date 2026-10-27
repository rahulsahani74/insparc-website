import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({ title: "Workflow Studies & Project Notes", description: "Illustrated service studies from Insparc Technologies: customer enquiries, email follow-up, sales coordination and business information.", path: "/projects" });
export default function ProjectsPage() {
  return <div className="pt-14"><header className="story-shell mb-12"><p className="eyebrow">The workflow notebook</p><h1 className="story-heading mt-5">A closer look at<br /><em>connected work.</em></h1><p className="mt-6 max-w-2xl text-base text-[var(--muted)]">Four illustrated service studies, from the first enquiry to the final handoff. These examples explain how the work could happen; they are not verified client results.</p></header><ProjectsGrid showIntro={false} /></div>;
}
