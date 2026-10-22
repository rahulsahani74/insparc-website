/**
 * Services data — Insparc Technology.
 * Each service maps to a route at /services/[slug].
 * Fill in real descriptions, features, and examples before launch.
 */

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // lucide-react icon name
  features: string[];
  useCases: string[];
};

export const services: Service[] = [
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    tagline: "Never miss a lead. Reply instantly, 24/7.",
    description:
      "[YOUR_WHATSAPP_AUTOMATION_DESCRIPTION] — Automated WhatsApp workflows that greet new leads, answer FAQs, qualify prospects, and route conversations — all without lifting a finger.",
    icon: "MessageCircle",
    features: [
      "Instant auto-reply to new messages",
      "AI-powered conversation flows",
      "Lead qualification and routing",
      "CRM integration",
      "Broadcast campaigns",
    ],
    useCases: ["Clinics", "Real estate agencies", "Coaching businesses", "E-commerce stores"],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    tagline: "Your smartest team member, available around the clock.",
    description:
      "[YOUR_AI_CHATBOTS_DESCRIPTION] — Custom AI chatbots trained on your business knowledge that answer customer questions, book appointments, and collect leads.",
    icon: "Bot",
    features: [
      "Trained on your documents and FAQs",
      "Multi-channel deployment (web, WhatsApp)",
      "Handoff to human agents",
      "Continuous learning",
    ],
    useCases: ["Customer support", "Lead capture", "Appointment booking", "Internal helpdesks"],
  },
  {
    slug: "lead-automation",
    title: "Lead Automation",
    tagline: "Every lead followed up. Zero slippage.",
    description:
      "[YOUR_LEAD_AUTOMATION_DESCRIPTION] — AI-driven lead capture, scoring, nurturing, and follow-up sequences that turn cold inquiries into paying customers.",
    icon: "TrendingUp",
    features: [
      "Multi-source lead capture (forms, WhatsApp, ads)",
      "Automatic lead scoring",
      "Personalised follow-up sequences",
      "CRM sync",
    ],
    useCases: ["Sales teams", "Real estate", "Education", "Financial services"],
  },
  {
    slug: "voice-agents",
    title: "Voice Agents",
    tagline: "An AI voice that calls, qualifies, and books.",
    description:
      "[YOUR_VOICE_AGENTS_DESCRIPTION] — Conversational AI voice agents that handle inbound and outbound calls, qualify leads, and schedule appointments automatically.",
    icon: "Phone",
    features: [
      "Natural-sounding AI voice",
      "Inbound call handling",
      "Outbound lead qualification",
      "Calendar booking integration",
    ],
    useCases: ["Clinics", "Service businesses", "Real estate", "Recruitment"],
  },
  {
    slug: "document-ai",
    title: "Document AI",
    tagline: "Extract, summarise, and act on any document.",
    description:
      "[YOUR_DOCUMENT_AI_DESCRIPTION] — Intelligent document processing that reads invoices, contracts, and forms, extracts key data, and routes it to the right place automatically.",
    icon: "FileText",
    features: [
      "PDF and image extraction",
      "Structured data output",
      "Validation rules",
      "ERP and CRM integration",
    ],
    useCases: ["Finance", "Legal", "Healthcare", "Logistics"],
  },
  {
    slug: "n8n-workflows",
    title: "n8n Workflows",
    tagline: "Connect everything. Automate anything.",
    description:
      "[YOUR_N8N_WORKFLOWS_DESCRIPTION] — Custom automation workflows built on n8n that connect your apps, eliminate manual data entry, and keep every tool in sync.",
    icon: "Workflow",
    features: [
      "Unlimited app integrations",
      "Custom trigger logic",
      "Error handling and retries",
      "Self-hosted or cloud",
    ],
    useCases: ["Operations teams", "Agencies", "SaaS companies", "E-commerce"],
  },
];
