"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AutomationScene } from "./AutomationScene";

const chapters = [
  { id: "scattered", word: "The friction", title: "Your tools are busy. Your team is busier.", text: "An inquiry arrives on WhatsApp. Someone copies it into a sheet. Someone else remembers to follow up. The work gets done—but it keeps getting in the way of better work.", detail: "Sound familiar? It’s the space between your tools that needs attention." },
  { id: "connected", word: "The connection", title: "What if the next step happened on its own?", text: "We join the dots. An inquiry triggers a workflow. AI helps understand the request. Your CRM gets the context, and the right follow-up is prepared—with human review wherever it matters.", detail: "One connected system. Clear rules. Your team stays in control." },
  { id: "possibility", word: "The possibility", title: "Make room for the work only you can do.", text: "Less copying, chasing, and switching tabs. More time for customers, ideas, and the decisions that move your business forward. That’s what useful automation should feel like.", detail: "Start with one repetitive task. Build from there." },
];

export function StoryJourney() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter));
      });
    }, { rootMargin: "-30% 0px -35% 0px", threshold: 0 });
    root.current.querySelectorAll("[data-chapter]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="the-story" ref={root} className="story-journey story-shell relative pb-16 pt-10 lg:pb-20 lg:pt-12" aria-label="The journey from manual tasks to automation">
      <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-5">
        <p className="eyebrow">01 / A better way to work</p><span className="hidden text-xs text-[var(--muted)] sm:block">A small shift. A different kind of day.</span>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-20">
        <div>
          {chapters.map((chapter, index) => (
            <article key={chapter.id} id={chapter.id} data-chapter={index} className="story-chapter scroll-mt-28" data-active={active === index}>
              <div data-reveal><p className="mb-5 flex items-center gap-3 text-xs text-[var(--gold)]"><span className="chapter-number">0{index + 1}</span>{chapter.word}</p>
                <h2 className="story-heading max-w-lg">{chapter.title}</h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--muted)]">{chapter.text}</p>
                <p className="mt-6 max-w-md border-l border-[var(--gold)]/40 pl-4 text-sm text-[var(--text)]">{chapter.detail}</p>
                {index === 2 && <Link href="/roi-calculator" className="explore-link mt-6">Explore what you could save <ArrowUpRight className="h-4 w-4" /></Link>}
              </div>
              <div className="mt-8 lg:hidden"><AutomationScene stage={index} /></div>
            </article>
          ))}
        </div>
        <div className="story-sticky hidden lg:block">
          <AutomationScene stage={active} />
          <nav aria-label="Automation story chapters" className="chapter-navigation">
            {chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === index ? "step" : undefined} className={`choice-control ${active === index ? "is-active" : ""}`}><span aria-hidden="true">0{index + 1}</span> {chapter.word}</a>)}
          </nav>
        </div>
      </div>
    </section>
  );
}
