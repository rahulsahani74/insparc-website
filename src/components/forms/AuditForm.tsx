"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";

const paths = {
  leads: { name: "Inquiries and follow-ups", service: "lead-automation", steps: ["Capture the inquiry in one place", "Check for an existing customer record", "Prepare the right next step", "Let your team review important decisions"] },
  support: { name: "Customer questions", service: "ai-chatbots", steps: ["Collect the questions your team hears often", "Agree the information your team can share", "Draft answers with the relevant context", "Hand uncertain questions to a person"] },
  admin: { name: "Documents and back-office work", service: "document-processing", steps: ["Choose one repeatable document type", "Extract the details you actually need", "Review incomplete or unusual records", "Give approved information to the responsible person"] },
};

export function AuditForm() {
  const [kind, setKind] = useState<keyof typeof paths>("leads");
  const [task, setTask] = useState("");
  const [tools, setTools] = useState("");
  const [frequency, setFrequency] = useState("Every day");
  const [ready, setReady] = useState(false);
  const result = useRef<HTMLHeadingElement>(null);
  const selected = paths[kind];
  const brief = `Hi Insparc Technologies! Here is my automation audit brief.\n\nArea: ${selected.name}\nCurrent task: ${task}\nTeam involved: ${tools || "To be discussed"}\nFrequency: ${frequency}\n\nI’d like to discuss the next steps.`;
  const showBrief = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task.trim().length < 12) { event.currentTarget.querySelector<HTMLTextAreaElement>("textarea")?.focus(); return; }
    setReady(true);
    requestAnimationFrame(() => result.current?.focus());
  };
  if (ready) return <div className="audit-brief">
    <p className="eyebrow">Your starting-point brief</p><h2 ref={result} tabIndex={-1} className="story-heading mt-4">Start with one<br /><em>clear handoff.</em></h2>
    <p className="mt-6"><strong>The task:</strong> {task}</p><p className="mt-3"><strong>Your team:</strong> {tools || "To be discussed"} · {frequency}</p>
    <h3 className="mt-8 font-display text-2xl">A possible first workflow</h3><ol className="mt-5 list-decimal space-y-3 pl-6">{selected.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    <p className="mt-7 text-[var(--muted)]">This is a simple planning guide based on your selection. It has not inspected your systems or been reviewed by our team. Share the brief to arrange a conversation.</p>
    <div className="mt-7 flex flex-wrap gap-4"><a className="story-button" href={getWhatsAppUrl(brief)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" /> Share my brief</a><Link className="explore-link" href={`/services/${selected.service}`}>Explore the approach <ArrowUpRight className="h-5 w-5" /></Link></div><button className="explore-link mt-5" onClick={() => setReady(false)}><ArrowLeft className="h-4 w-4" /> Edit my answers</button>
  </div>;
  return <form onSubmit={showBrief} className="audit-form">
    <fieldset><legend>01 / Where does the work pile up?</legend><div className="audit-options">{Object.entries(paths).map(([id,path]) => <label key={id} className="audit-option"><input type="radio" name="audit-area" value={id} checked={kind === id} onChange={() => setKind(id as keyof typeof paths)} /><span>{path.name}</span></label>)}</div></fieldset>
    <div><label className="mb-3 block text-lg" htmlFor="audit-task">02 / Walk us through one repetitive task.</label><textarea id="audit-task" value={task} onChange={(event) => setTask(event.target.value)} required minLength={12} maxLength={2000} rows={5} placeholder="For example: a customer fills in a form, then we copy the details into a sheet and send a WhatsApp message…" className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] p-4 text-base" aria-describedby="audit-task-hint" /><p id="audit-task-hint" className="mt-2 text-xs text-[var(--muted)]">Describe the steps in at least 12 characters. Please leave out passwords and customer information.</p></div>
    <div><label htmlFor="audit-tools" className="mb-3 block text-lg">03 / Who is involved in this work?</label><input id="audit-tools" value={tools} onChange={(event) => setTools(event.target.value)} maxLength={300} placeholder="For example: sales, reception, customer support…" className="min-h-14 w-full rounded-input border border-[var(--border)] bg-[var(--surface)] p-4 text-base" /></div>
    <div><label htmlFor="audit-frequency" className="mb-3 block text-lg">04 / How often does this happen?</label><select id="audit-frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)} className="min-h-14 w-full rounded-input border border-[var(--border)] bg-[var(--surface)] p-4 text-base">{["Every day", "Several times a week", "Every week", "Occasionally"].map((value) => <option key={value}>{value}</option>)}</select></div>
    <p className="text-sm text-[var(--muted)]">Your answers stay in this page until you choose to share them. No account is needed.</p><button type="submit" className="story-button justify-self-start">Prepare my audit brief <ArrowUpRight className="h-5 w-5" /></button>
  </form>;
}
