"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TimeCalculator() {
  const [people,setPeople] = useState(3);
  const [minutes,setMinutes] = useState(30);
  const [share,setShare] = useState(50);
  const hours = Math.round(people * minutes * 22 * share / 100 / 60);
  return <section className="story-shell py-16 sm:py-24"><p className="eyebrow">A little perspective</p><h1 className="story-heading mt-5">What could you do<br /><em>with that time back?</em></h1><p className="mt-6 max-w-2xl text-base text-[var(--muted)]">Explore a simple time-saving scenario. The result uses your assumptions; it is not a measured business outcome or a guarantee.</p><div className="mt-12 grid gap-10 lg:grid-cols-2"><div className="space-y-9 border-t border-[var(--border)] pt-6">{[{id:"people",label:"People doing this task",value:people,set:setPeople,min:1,max:20,unit:"people"},{id:"minutes",label:"Time each person spends daily",value:minutes,set:setMinutes,min:5,max:180,unit:"minutes"},{id:"share",label:"Share you think could be automated",value:share,set:setShare,min:10,max:90,unit:"percent"}].map((field) => <div key={field.id}><label htmlFor={field.id} className="mb-4 flex justify-between gap-5 text-base"><span>{field.label}</span><span className="shrink-0">{field.value} {field.unit}</span></label><input id={field.id} type="range" min={field.min} max={field.max} value={field.value} onChange={(event) => field.set(Number(event.target.value))} className="w-full accent-[var(--gold)]" /></div>)}</div><div className="audit-brief"><p className="eyebrow">Illustrative monthly estimate</p><p className="mt-5 font-display text-6xl">{hours} hours</p><p className="mt-6 text-base text-[var(--muted)]">Based on 22 working days and the assumptions you selected. Check a real sample of your team's work before planning an implementation.</p><Link href="/audit" className="story-button mt-7">Look at the actual workflow <ArrowUpRight className="h-5 w-5" /></Link></div></div></section>;
}
