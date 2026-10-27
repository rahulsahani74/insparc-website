"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Mail, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema } from "@/lib/validators";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { services as businessServices } from "@/data/services";
const services = [{slug:"digital-marketing",title:"Digital Marketing & Social Media Management"},...businessServices];

interface ContactFormProps { initialService?: string; initialProject?: string; className?: string }

export function ContactForm({ initialService, initialProject, className }: ContactFormProps) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", company: "", interest: initialService || initialProject || "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (prepared) heading.current?.focus(); }, [prepared]);
  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => { const key = String(issue.path[0]); if (!next[key]) next[key] = issue.message; });
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPrepared(true);
  };
  const serviceLabel = services.find((service) => service.slug === values.interest)?.title || values.interest || "Help choosing a starting point";
  const message = `Hi Insparc! I’d like to discuss your services.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nPhone: ${values.phone || "Not provided"}\nCompany: ${values.company || "Not provided"}\nInterest: ${serviceLabel}\n\n${values.message.trim()}`;

  if (prepared) return <div className="rounded-2xl border border-[var(--gold)]/40 bg-[var(--surface-2)] p-6 sm:p-8">
    <span className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/40 text-[var(--gold)]"><Check className="h-5 w-5" /></span>
    <h3 ref={heading} tabIndex={-1} className="font-display text-2xl">Your brief is ready to share.</h3>
    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">Choose WhatsApp or email below, then send your message there. Your inquiry has not been sent or saved by this website.</p>
    <dl className="mt-6 space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm"><div><dt className="scene-caption">Your name</dt><dd>{values.name}</dd></div><div><dt className="scene-caption">Interested in</dt><dd>{serviceLabel}</dd></div><div><dt className="scene-caption">Your challenge</dt><dd className="whitespace-pre-wrap text-[var(--muted)]">{values.message}</dd></div></dl>
    <div className="mt-6 flex flex-wrap gap-3"><a className="story-button" href={getWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> Send on WhatsApp</a><a className="story-button story-button-secondary" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Business consultation request")}&body=${encodeURIComponent(message)}`}><Mail className="h-4 w-4" /> Send by email</a></div>
    <button type="button" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)]" onClick={() => setPrepared(false)}><ArrowLeft className="h-4 w-4" /> Edit your brief</button>
  </div>;

  return <form onSubmit={submit} noValidate className={className ?? "space-y-5"}>
    <p className="text-sm leading-relaxed text-[var(--muted)]">A few details help us understand your workflow. Then choose WhatsApp or email to send your brief.</p>
    <div className="grid gap-5 sm:grid-cols-2"><Input name="name" label="Full name" required autoComplete="name" maxLength={100} placeholder="Your name" value={values.name} onChange={update} error={errors.name} /><Input name="email" label="Email address" required autoComplete="email" type="email" maxLength={254} placeholder="you@company.com" value={values.email} onChange={update} error={errors.email} /></div>
    <div className="grid gap-5 sm:grid-cols-2"><Input name="phone" label="Phone / WhatsApp (optional)" autoComplete="tel" type="tel" maxLength={20} value={values.phone} onChange={update} error={errors.phone} /><Input name="company" label="Company (optional)" autoComplete="organization" maxLength={150} value={values.company} onChange={update} /></div>
    <div><label htmlFor="contact-interest" className="mb-2 block text-sm">What would you like to explore?</label><select id="contact-interest" name="interest" value={values.interest} onChange={update} className="min-h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm"><option value="">Help me choose a starting point</option>{values.interest && !services.some((service) => service.slug === values.interest) && <option value={values.interest}>{values.interest}</option>}{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></div>
    <Textarea name="message" label="What repetitive task would you love to hand off?" required minLength={10} maxLength={2000} rows={5} placeholder="Tell us what happens today, the tools involved, and what you’d like to change…" value={values.message} onChange={update} error={errors.message} />
    <p className="text-xs text-[var(--muted)]">Please leave out passwords, private account details, and confidential customer information. <a href="/privacy-policy" className="text-[var(--gold)] underline underline-offset-4">Privacy policy</a></p>
    <button type="submit" className="story-button w-full">Prepare my consultation brief <ArrowUpRight className="h-4 w-4" /></button>
  </form>;
}
