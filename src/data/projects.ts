/**
 * Projects showcase data — Insparc Technology.
 * Seed data with placeholder content.
 *
 * HOW TO ADD REAL PROJECTS:
 * 1. Add an entry to the projects array below.
 * 2. Drop screenshots in public/projects/<slug>/ (blur credentials, tokens, phone numbers, client data).
 * 3. Replace all [PLACEHOLDER] values with real content.
 * 4. Set status to "live" when the project is published.
 */

export type ProjectStatus = "placeholder" | "live";

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  workflowSteps: string[];
  tools: string[];
  /** Paths relative to /public. e.g. "/projects/my-project/screenshot-1.png" */
  images: string[];
  videoUrl?: string;
  /** Only include results that are real and verified. No invented numbers. */
  results?: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    slug: "whatsapp-ai-chatbot",
    title: "WhatsApp AI Chatbot",
    category: "WhatsApp Automation",
    summary:
      "An AI-powered WhatsApp chatbot that handles lead qualification, appointment booking, and FAQ resolution automatically.",
    problem:
      "[YOUR_PROBLEM_DESCRIPTION] — The client was missing new WhatsApp inquiries outside business hours, leading to lost leads.",
    solution:
      "[YOUR_SOLUTION_DESCRIPTION] — We built an n8n workflow with an AI node that reads incoming messages, classifies intent, and responds instantly.",
    workflowSteps: [
      "WhatsApp message received via webhook",
      "AI node classifies intent (FAQ / appointment / lead)",
      "Appropriate response branch executes",
      "Lead data saved to CRM",
      "Confirmation sent to client",
    ],
    tools: ["n8n", "OpenAI", "WhatsApp Business API", "Google Sheets"],
    images: ["/projects/whatsapp-ai-chatbot/placeholder.svg"],
    status: "placeholder",
  },
  {
    slug: "automated-email-sender",
    title: "Automated Email Sender",
    category: "Lead Automation",
    summary:
      "A multi-step email nurture sequence triggered by form submissions, personalised using AI-generated content.",
    problem:
      "[YOUR_PROBLEM_DESCRIPTION] — The client's sales team was manually copying leads from forms and sending follow-up emails one by one.",
    solution:
      "[YOUR_SOLUTION_DESCRIPTION] — n8n workflow captures form submissions, enriches lead data, and triggers a personalised email sequence via Resend.",
    workflowSteps: [
      "Form submitted — webhook triggers n8n",
      "Lead data enriched and deduplicated",
      "AI generates personalised email copy",
      "Email sent via Resend",
      "Follow-up scheduled at T+2 and T+7 days",
    ],
    tools: ["n8n", "Resend", "OpenAI", "Airtable"],
    images: ["/projects/automated-email-sender/placeholder.svg"],
    status: "placeholder",
  },
  {
    slug: "lead-capture-ai-followup",
    title: "Lead Capture + AI Follow-up",
    category: "Lead Automation",
    summary:
      "End-to-end lead capture from multiple channels (ads, forms, WhatsApp) with AI-driven follow-up and CRM sync.",
    problem:
      "[YOUR_PROBLEM_DESCRIPTION] — Leads were arriving from 4 different sources and falling through the cracks.",
    solution:
      "[YOUR_SOLUTION_DESCRIPTION] — A unified n8n hub collects leads from all sources, deduplicates them, scores them with AI, and triggers personalised outreach.",
    workflowSteps: [
      "Leads captured from WhatsApp, web form, Facebook Lead Ads",
      "Deduplication check against existing CRM records",
      "AI scores lead by industry, intent, and message quality",
      "High-score leads get instant WhatsApp follow-up",
      "All leads synced to CRM with tags",
    ],
    tools: ["n8n", "OpenAI", "WhatsApp Business API", "HubSpot", "Facebook Lead Ads"],
    images: ["/projects/lead-capture-ai-followup/placeholder.svg"],
    status: "placeholder",
  },
  {
    slug: "rag-knowledge-bot",
    title: "RAG Knowledge Bot",
    category: "AI Chatbots",
    summary:
      "A retrieval-augmented generation chatbot trained on the client's internal documents, deployed on their website and WhatsApp.",
    problem:
      "[YOUR_PROBLEM_DESCRIPTION] — Customer support agents were spending hours answering the same questions about products and policies.",
    solution:
      "[YOUR_SOLUTION_DESCRIPTION] — We built a RAG pipeline that ingests the client's PDFs and knowledge base, and serves accurate answers via a chatbot.",
    workflowSteps: [
      "Documents chunked and embedded into vector store",
      "User question received",
      "Relevant chunks retrieved via semantic search",
      "AI generates answer grounded in retrieved context",
      "Answer delivered via chat widget or WhatsApp",
    ],
    tools: ["n8n", "OpenAI", "Pinecone", "Supabase", "WhatsApp Business API"],
    images: ["/projects/rag-knowledge-bot/placeholder.svg"],
    status: "placeholder",
  },
  {
    slug: "your-project-5",
    title: "[YOUR_PROJECT_TITLE]",
    category: "[YOUR_CATEGORY]",
    summary: "[YOUR_PROJECT_SUMMARY]",
    problem: "[YOUR_PROBLEM_DESCRIPTION]",
    solution: "[YOUR_SOLUTION_DESCRIPTION]",
    workflowSteps: [
      "[STEP_1]",
      "[STEP_2]",
      "[STEP_3]",
    ],
    tools: ["[TOOL_1]", "[TOOL_2]", "[TOOL_3]"],
    images: ["/projects/your-project-5/placeholder.svg"],
    status: "placeholder",
  },
];
