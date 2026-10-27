import Link from "next/link";
export function WorkingProcess(){return <section className="story-shell py-20" aria-labelledby="working-process"><p className="eyebrow">How we work</p><h2 id="working-process" className="story-heading mt-4">Clear steps.<br/><em>Shared decisions.</em></h2><div className="process-journal mt-10">{[
['Understand your business','We listen to your goals, look at the current customer journey and identify what needs attention first.'],
['Agree on a clear plan','You receive a defined scope, deliverables, responsibilities and review points before work begins.'],
['Create, review, refine','We prepare the work, walk you through an example and make agreed changes with your feedback.'],
['Launch and keep improving','We hand over the day-to-day process, review what is working and agree the next improvements together.']
].map(([title,text],i)=><article key={title} data-reveal><span className="eyebrow">0{i+1}</span><h3 className="font-display text-2xl mt-4">{title}</h3><p className="mt-4 text-[var(--muted)]">{text}</p></article>)}</div><Link href="/contact" className="explore-link mt-8">Tell us about your business ↗</Link></section>}
