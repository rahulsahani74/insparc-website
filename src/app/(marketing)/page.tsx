import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { WorkflowTheaterStrip } from "@/components/sections/WorkflowTheaterStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: `${siteConfig.name} — AI Automation That Works While You Sleep`,
  description: siteConfig.description,
};

/**
 * Insparc Technology Home Page.
 * - Hero: 3D HeroOrb + Value proposition + CTAs
 * - WorkflowTheaterStrip: Animated interactive n8n simulation
 * - ServicesGrid: 6 core service architectures (bento grid with tilt)
 * - ProjectsGrid: Real n8n projects showcase with browser frames
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkflowTheaterStrip />
      <ServicesGrid />
      <ProjectsGrid />
    </>
  );
}
