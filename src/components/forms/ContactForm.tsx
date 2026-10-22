"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface ContactFormProps {
  initialService?: string;
  initialProject?: string;
  className?: string;
}

export function ContactForm({
  initialService,
  initialProject,
  className,
}: ContactFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    interest: initialService ?? initialProject ?? "General Automation Audit",
    message: "",
  });

  // Honeypot field for anti-spam bots
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: If filled, silently abort (bot detected)
    if (honeypot) {
      setIsSubmitting(true);
      setTimeout(() => setSubmitSuccess(true), 600);
      return;
    }

    // Validate with Zod
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ContactFormData;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Frontend only phase: simulate network call with realistic delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Navigate to thank-you page after brief delay
      router.push("/thank-you");
    }, 900);
  };

  if (submitSuccess) {
    return (
      <div className="p-8 rounded-card border border-[var(--ok)]/40 bg-[var(--surface-2)] text-center animate-fade-up">
        <CheckCircle2 className="w-12 h-12 text-[var(--ok)] mx-auto mb-4" />
        <h3 className="font-display text-2xl text-[var(--text)] mb-2">
          Request Received
        </h3>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for reaching out. An automation architect from Insparc will review your workflow
          and get in touch with you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-5"} noValidate>
      {/* Honeypot field hidden from real humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Leave this empty</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          placeholder="Rahul Sharma"
          required
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          label="Business Email"
          name="email"
          type="email"
          placeholder="rahul@company.in"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone ?? ""}
          onChange={handleChange}
          error={errors.phone}
          hint="Optional, for quick WhatsApp discovery"
        />

        {/* Automation Interest Selector */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="interest-select"
            className="text-sm font-medium text-[var(--text)]"
          >
            Automation Area
          </label>
          <select
            id="interest-select"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-input bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] text-sm transition-colors duration-150 focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/50 min-h-[44px]"
          >
            <option value="General Automation Audit">Free Automation Audit</option>
            <option value="WhatsApp Automation">WhatsApp Automation</option>
            <option value="AI Chatbots">AI Chatbots & Agents</option>
            <option value="Lead Automation">Lead Capture & Follow-up</option>
            <option value="Voice Agents">AI Voice Agents</option>
            <option value="Document AI">Document AI & Extraction</option>
            <option value="n8n Workflows">Custom n8n Workflows</option>
          </select>
        </div>
      </div>

      <Textarea
        label="What manual tasks would you like to automate?"
        name="message"
        placeholder="e.g. We get 30 inquiries daily on WhatsApp and our sales team spends 3 hours copying data into Google Sheets and replying manually..."
        required
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        hint="Share your current apps (CRM, WhatsApp, Gmail, etc.)"
      />

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          <span>Submit Audit Request</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>

        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]/70">
          <Shield className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>Strict privacy • No spam • NDA protected</span>
        </div>
      </div>
    </form>
  );
}

