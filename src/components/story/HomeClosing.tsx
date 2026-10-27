import Link from "next/link";
import {faqItems} from "@/data/faq";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { getWhatsAppUrl } from "@/config/site";

const questions = faqItems;

export function HomeClosing() {
  return (
    <>
      <section className="story-section border-t border-[var(--border)]">
        <div className="story-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div><p className="eyebrow">08 / A little clarity</p><h2 className="story-heading mt-5">Good questions.<br /><em>Clear answers.</em></h2><Link href="/faq" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--gold)]">More questions, answered <ArrowUpRight className="h-4 w-4" /></Link></div>
          <div data-reveal><Accordion items={questions} /></div>
        </div>
      </section>
      <section className="story-shell pb-20 sm:pb-28" aria-labelledby="closing-title">
        <div className="closing-panel relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--gold)]/30 px-6 py-14 sm:px-12 sm:py-20" data-reveal>
          <div className="closing-orbit" aria-hidden="true" />
          <div className="relative max-w-2xl"><p className="eyebrow">The next chapter is yours</p><h2 id="closing-title" className="story-heading mt-6">What would you do<br />with a little <em>more time?</em></h2><p className="mt-6 max-w-lg text-base text-[var(--muted)]">Tell us what keeps your team busy. We’ll help you find a more connected way to work—starting with one useful conversation.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="story-button">Let’s talk about your workflow <ArrowUpRight className="h-4 w-4" /></Link><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="story-button story-button-secondary"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a></div>
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-[var(--muted)]"><Check className="h-3.5 w-3.5 text-[var(--gold)]" /> Free initial consultation. A practical place to start.</p>
          </div>
        </div>
      </section>
    </>
  );
}
