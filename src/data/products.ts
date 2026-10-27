/**
 * Digital Products Marketplace Data — Insparc Technologies.
 * All prices validated server-side.
 */

export type ProductCategory =
  | "n8n Workflow Templates"
  | "AI Agent Templates"
  | "WhatsApp Automation"
  | "Lead Generation Automation"
  | "CRM Automation"
  | "Email Automation"
  | "Business Automation Systems"
  | "Automation Guides and Documentation";

export interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProductCategory;
  priceINR: number;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  summary: string;
  businessProblem: string;
  features: string[];
  useCases: string[];
  toolsRequired: string[];
  n8nVersion: string;
  requiredApiKeys: {
    service: string;
    description: string;
    pricingNote: string;
  }[];
  setupDifficulty: "Beginner" | "Intermediate" | "Advanced";
  setupTimeMinutes: number;
  workflowDiagramDescription: string;
  workflowSteps: {
    node: string;
    type: "trigger" | "ai" | "tool" | "output";
    description: string;
  }[];
  installationSteps: {
    step: number;
    title: string;
    instructions: string;
    warning?: string;
  }[];
  limitations: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  downloadFiles: {
    fileName: string;
    fileSize: string;
    format: string;
    description: string;
  }[];
}

export function getProductBySlugOrId(slugOrId: string): DigitalProduct | undefined {
  return products.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

export const products: DigitalProduct[] = [
  {
    id: "prod_wa_lead_qualifier",
    slug: "whatsapp-ai-lead-qualifier",
    title: "WhatsApp AI Lead Qualifier & Booking Engine",
    tagline: "Autonomous 24/7 lead qualification, intent classification & appointment booking on WhatsApp.",
    category: "WhatsApp Automation",
    priceINR: 2499,
    priceUSD: 29,
    rating: 4.9,
    reviewCount: 38,
    summary:
      "A battle-tested production n8n workflow that connects Meta's WhatsApp Cloud API with OpenAI's Chat Model to automatically converse with new leads, extract their project requirements and budget, and book appointments directly on Google Calendar without human intervention.",
    businessProblem:
      "Businesses lose 60%+ of their inbound WhatsApp leads because human sales reps take hours to respond after business hours, leading prospects to contact competitors.",
    features: [
      "Official Meta WhatsApp Cloud API webhook listener",
      "OpenAI GPT-4o-mini intent classifier with strict JSON extraction",
      "Dynamic lead scoring (Budget, Timeline, Service Type)",
      "Instant Google Calendar slot booking & appointment confirmation",
      "Real-time Google Sheets backup & Slack lead notification alert",
      "Human-handoff escalation trigger if user requests a real person",
    ],
    useCases: [
      "Clinics and dental practices booking patient consultations",
      "Real estate agencies qualifying home buyers by budget and location",
      "Digital agencies and consultants scheduling discovery calls",
      "Coaching institutes answering batch fee questions",
    ],
    toolsRequired: [
      "n8n (Self-hosted v1.40+ or n8n Cloud)",
      "Meta WhatsApp Cloud API (Free tier includes 1,000 free service convos/mo)",
      "Connect your own account and check the provider usage terms.",
      "Google Workspace (Sheets & Calendar)",
    ],
    n8nVersion: "v1.40.0 or higher",
    requiredApiKeys: [
      {
        service: "Meta for Developers (WhatsApp Cloud API)",
        description: "Permanent System User Access Token and Phone Number ID",
        pricingNote: "Free 1,000 service conversations per month by Meta",
      },
      {
        service: "OpenAI API",
        description: "API key with access to gpt-4o-mini",
        pricingNote: "Connect your own account and check the provider usage terms.",
      },
      {
        service: "Google Cloud Console",
        description: "OAuth2 credentials for Google Sheets & Google Calendar",
        pricingNote: "100% Free",
      },
    ],
    setupDifficulty: "Intermediate",
    setupTimeMinutes: 25,
    workflowDiagramDescription:
      "WhatsApp Webhook -> Verification Router -> OpenAI AI Agent (Intent & Extraction) -> Conditional Switch -> Google Calendar Book -> Google Sheets Append -> WhatsApp Confirmation Response",
    workflowSteps: [
      {
        node: "WhatsApp Webhook",
        type: "trigger",
        description: "Receives raw message payload from Meta Webhook and verifies HMAC token.",
      },
      {
        node: "Message Parser & History",
        type: "tool",
        description: "Extracts sender phone number, message text, and fetches recent thread memory.",
      },
      {
        node: "OpenAI Lead Qualifier Agent",
        type: "ai",
        description: "Runs custom system prompt to converse politely and extract {intent, name, budget, preferred_time}.",
      },
      {
        node: "Intent Router (Switch)",
        type: "tool",
        description: "Branches execution based on whether the lead is ready to book, has an FAQ, or requests human help.",
      },
      {
        node: "Google Calendar Booking",
        type: "tool",
        description: "Checks slot availability and reserves the appointment with calendar invites.",
      },
      {
        node: "WhatsApp Reply Dispatcher",
        type: "output",
        description: "Sends customized confirmation with calendar invite and Google Maps location.",
      },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Import the Workflow JSON into n8n",
        instructions:
          "Open your n8n canvas, click the top-right menu (three dots), select 'Import from File', and upload 'whatsapp-ai-lead-qualifier.json'.",
      },
      {
        step: 2,
        title: "Configure Credentials Securely",
        instructions:
          "In n8n Credentials Manager, create: 1) OpenAI API Account, 2) Meta WhatsApp Cloud API Header Auth, and 3) Google OAuth2 Credentials.",
        warning:
          "Never paste your private OpenAI or Meta tokens directly into workflow code nodes. Always use n8n's encrypted Credential Vault.",
      },
      {
        step: 3,
        title: "Replace Placeholder Variables in Config Node",
        instructions:
          "Locate the first 'Set Business Variables' node and replace [YOUR_BUSINESS_NAME], [YOUR_CALENDAR_ID], and [YOUR_SHEET_ID] with your real details.",
      },
      {
        step: 4,
        title: "Configure Meta Webhook URL",
        instructions:
          "Copy the Production Webhook URL from the WhatsApp Webhook node and paste it into your Meta Developer App Dashboard under WhatsApp > Configuration > Callback URL.",
      },
      {
        step: 5,
        title: "Safe Test & Activation",
        instructions:
          "Send a test WhatsApp message from your personal phone to your WhatsApp Business number. Inspect the execution in n8n. If all nodes turn green, click the toggle to 'Active'.",
      },
    ],
    limitations: [
      "Requires an active Meta Developer account and a clean phone number not currently registered on the personal WhatsApp app.",
      "Google Calendar booking requires time zone matching between your n8n instance and your business calendar.",
    ],
    faqs: [
      {
        question: "Can I use my existing WhatsApp personal number?",
        answer:
          "Meta requires a dedicated phone number for the WhatsApp Cloud API. You can use any new SIM or virtual number that does not have an active personal WhatsApp account.",
      },
      {
        question: "Does this require a paid n8n subscription?",
        answer:
          "No! This workflow runs perfectly on both free self-hosted n8n (via Docker, VPS, or Railway) as well as the official n8n Cloud plan.",
      },
      {
        question: "How much will OpenAI cost to run this?",
        answer:
          "Connect your own account and check the provider usage terms.",
      },
    ],
    downloadFiles: [
      {
        fileName: "whatsapp-ai-lead-qualifier.json",
        fileSize: "18.4 KB",
        format: "JSON (n8n Workflow)",
        description: "The complete, fully commented n8n workflow export ready for 1-click import.",
      },
      {
        fileName: "INSTALLATION_AND_USAGE_GUIDE.md",
        fileSize: "14.2 KB",
        format: "Markdown Documentation",
        description: "Step-by-step PDF/Markdown deployment manual, Meta webhook troubleshooting, and prompt customization guide.",
      },
      {
        fileName: "example-meta-webhook-payload.json",
        fileSize: "2.1 KB",
        format: "JSON Mock Payload",
        description: "Test webhook payload to test the workflow locally in n8n without sending live WhatsApp messages.",
      },
    ],
  },
  {
    id: "prod_crm_enrichment",
    slug: "crm-enrichment-followup-system",
    title: "Autonomous Lead Research, CRM Enrichment & Personalized Email System",
    tagline: "Instantly research incoming form leads, enrich company data, score intent & trigger hyper-tailored emails.",
    category: "Lead Generation Automation",
    priceINR: 3499,
    priceUSD: 42,
    rating: 5.0,
    reviewCount: 24,
    summary:
      "When a lead submits your website form, this autonomous n8n agent scrapes their company domain, extracts company headcount and industry, drafts a hyper-personalized email referencing their specific challenges, updates your CRM (HubSpot or Airtable), and alerts your sales rep on Slack.",
    businessProblem:
      "Sales reps spend 20 minutes manually researching each prospect on LinkedIn and Google before sending an email, causing 80% of leads to go cold.",
    features: [
      "Universal Form Webhook listener (compatible with Typeform, Webflow, WordPress, Next.js)",
      "Autonomous AI Research Agent that visits the prospect's website and summarizes their value proposition",
      "Company headcount and industry scoring matrix",
      "Dynamic personalized email generation referencing specific prospect pain points",
      "Direct HubSpot / Airtable record creation with all research notes pre-attached",
      "Slack sales notification with 1-click email approval button",
    ],
    useCases: [
      "B2B service agencies qualifying high-ticket clients",
      "SaaS sales teams prioritizing enterprise inbound signups",
      "Consultants wanting customized research briefings before client calls",
    ],
    toolsRequired: [
      "n8n (v1.40+)",
      "OpenAI API Key (gpt-4o)",
      "HubSpot CRM or Airtable (Free plans supported)",
      "Resend, SendGrid, or Google Workspace for email delivery",
      "Slack (for sales notifications)",
    ],
    n8nVersion: "v1.40.0 or higher",
    requiredApiKeys: [
      {
        service: "OpenAI API",
        description: "API key for web research and personalized drafting",
        pricingNote: "Connect your own account and check the provider usage terms.",
      },
      {
        service: "HubSpot / Airtable API",
        description: "Private App Access Token",
        pricingNote: "100% Free on standard tiers",
      },
      {
        service: "Resend / SMTP",
        description: "API key for transactional email sending",
        pricingNote: "Resend provides 3,000 emails/month free",
      },
    ],
    setupDifficulty: "Beginner",
    setupTimeMinutes: 20,
    workflowDiagramDescription:
      "Inbound Form Webhook -> Domain Extractor -> HTTP Scraper -> OpenAI Research Agent -> Lead Scorer -> HubSpot/Airtable Sync -> Resend Email Dispatch -> Slack Alert",
    workflowSteps: [
      {
        node: "Form Webhook Trigger",
        type: "trigger",
        description: "Listens for lead submission (Name, Work Email, Company, Message).",
      },
      {
        node: "Domain & Web Crawler",
        type: "tool",
        description: "Extracts domain from work email and fetches company homepage metadata.",
      },
      {
        node: "AI Research & Synthesis Agent",
        type: "ai",
        description: "Summarizes what the company does, their likely pain points, and drafts a relevant value pitch.",
      },
      {
        node: "CRM Contact & Deal Creator",
        type: "tool",
        description: "Creates contact in HubSpot or Airtable with research briefing in the notes field.",
      },
      {
        node: "Personalized Email Dispatcher",
        type: "output",
        description: "Sends customized follow-up email from your founder/rep's address via Resend or Gmail.",
      },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Import JSON Workflow",
        instructions: "Import 'crm-enrichment-followup.json' directly into your n8n workspace.",
      },
      {
        step: 2,
        title: "Connect HubSpot / Airtable Credentials",
        instructions: "Select your preferred CRM node (HubSpot or Airtable) and authenticate using your API key.",
      },
      {
        step: 3,
        title: "Configure Email Sender",
        instructions: "Connect your Resend or Gmail credentials so emails send from your verified domain.",
      },
      {
        step: 4,
        title: "Point Website Form to Webhook",
        instructions: "Copy the n8n production webhook URL and configure your form's submit action to POST to this endpoint.",
      },
    ],
    limitations: [
      "Web scraping requires public access to the prospect's company website. Private intranets or domains without websites will fall back to standard company enrichment templates.",
    ],
    faqs: [
      {
        question: "Can I review the email before it gets sent to the prospect?",
        answer:
          "Yes! The workflow includes a 'Manual Approval' toggle mode where the drafted email is posted to a Slack channel with 'Approve' and 'Edit' buttons.",
      },
      {
        question: "Does it work with free HubSpot?",
        answer: "Yes, this workflow uses standard HubSpot CRM Contacts and Deals APIs which are 100% free.",
      },
    ],
    downloadFiles: [
      {
        fileName: "crm-enrichment-followup.json",
        fileSize: "22.1 KB",
        format: "JSON (n8n Workflow)",
        description: "Ready-to-run n8n workflow with both HubSpot and Airtable connector branches.",
      },
      {
        fileName: "CRM_ENRICHMENT_SETUP_GUIDE.md",
        fileSize: "11.8 KB",
        format: "Markdown Documentation",
        description: "Detailed setup instructions, prompt engineering tweaks, and Slack notification integration.",
      },
    ],
  },
  {
    id: "prod_rag_knowledge_agent",
    slug: "rag-support-knowledge-agent",
    title: "Autonomous RAG Knowledge Assistant & Support Ticket Resolver",
    tagline: "AI agent that indexes your documents, resolves customer queries with zero hallucinations, and escalates complex tickets.",
    category: "AI Agent Templates",
    priceINR: 4999,
    priceUSD: 59,
    rating: 4.95,
    reviewCount: 19,
    summary:
      "A complete enterprise-grade Retrieval-Augmented Generation (RAG) agent for n8n. Ingests your company FAQs, SOPs, and product manuals into a vector store (Qdrant or Pinecone), performs semantic hybrid search, answers customer questions with source citations, and routes unsolved issues to human support via Slack or Zendesk.",
    businessProblem:
      "Customer support teams are drowning in repetitive questions, while generic ChatGPT wrappers hallucinate wrong policies and fabricate answers.",
    features: [
      "Automated document indexing pipeline (PDF, Markdown, Google Docs, Notion)",
      "Semantic vector chunking and hybrid retrieval for 99.9% accuracy",
      "Strict citation guardrails: If the answer is not in the docs, it politely admits it and escalates",
      "Multi-channel interface (embeddable web widget, Telegram, and Slack)",
      "Conversation thread memory preserving multi-turn context",
      "Automated human-handoff ticket creation in Zendesk, Freshdesk, or Slack",
    ],
    useCases: [
      "SaaS companies automating technical user documentation queries",
      "E-commerce stores resolving shipping, refund, and product specification tickets",
      "Internal HR and IT helpdesks answering company policy questions",
    ],
    toolsRequired: [
      "n8n (v1.40+)",
      "OpenAI API Key (text-embedding-3-small + gpt-4o-mini)",
      "Qdrant (Free Cloud 1GB cluster) or Pinecone",
      "Slack or Zendesk (for human escalation)",
    ],
    n8nVersion: "v1.40.0 or higher",
    requiredApiKeys: [
      {
        service: "Qdrant Cloud or Pinecone",
        description: "Vector Database API key and cluster URL",
        pricingNote: "100% Free on Qdrant Cloud 1GB tier (stores ~500,000 words)",
      },
      {
        service: "OpenAI API",
        description: "Embeddings and Chat API key",
        pricingNote: "Connect your own account and check the provider usage terms.",
      },
    ],
    setupDifficulty: "Advanced",
    setupTimeMinutes: 40,
    workflowDiagramDescription:
      "Document Ingestion Pipeline -> Text Chunking -> Vector Embeddings -> Qdrant Store <==> Query Webhook -> Vector Similarity Search -> Context Assembly -> Guardrailed OpenAI Agent -> Citation Response / Escalation",
    workflowSteps: [
      {
        node: "Document Upload / Webhook",
        type: "trigger",
        description: "Ingests raw text, PDFs, or Notion exports into the knowledge pipeline.",
      },
      {
        node: "Recursive Text Splitter",
        type: "tool",
        description: "Chunks documents into 500-token semantic sections with 50-token overlap.",
      },
      {
        node: "Vector Store Insert",
        type: "tool",
        description: "Generates text-embedding-3-small vectors and stores them in Qdrant.",
      },
      {
        node: "Query Retrieval Node",
        type: "tool",
        description: "Matches user question against top 4 most relevant documentation chunks.",
      },
      {
        node: "Grounded RAG Agent",
        type: "ai",
        description: "Answers user inquiry strictly using the retrieved context, citing exact document sources.",
      },
      {
        node: "Escalation Branch",
        type: "output",
        description: "If confidence score < 0.75, creates a human support ticket with full transcript.",
      },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Create Free Qdrant Cloud Cluster",
        instructions: "Sign up at cloud.qdrant.io, create a free 1GB cluster, and copy the API key and Cluster Endpoint URL.",
      },
      {
        step: 2,
        title: "Import RAG Workflow Bundle",
        instructions: "Import 'rag-support-knowledge-agent.json' into n8n.",
      },
      {
        step: 3,
        title: "Run Knowledge Base Ingestion",
        instructions: "Execute the Ingestion sub-workflow once with your documents to populate the vector collection.",
      },
      {
        step: 4,
        title: "Deploy Chatbot Trigger",
        instructions: "Activate the Query Webhook and connect it to your website chat widget, Slack, or Telegram bot.",
      },
    ],
    limitations: [
      "Documents must be text-searchable. Scanned image-only PDFs require pre-processing with an OCR node.",
    ],
    faqs: [
      {
        question: "Will the AI make up false policies or give wrong answers?",
        answer:
          "No. The system prompt contains strict zero-hallucination guardrails: if the answer cannot be verified from the retrieved document chunks, it is instructed to state that it does not know and trigger human handoff.",
      },
      {
        question: "Can I update the documents later?",
        answer:
          "Yes! The workflow includes a re-indexing trigger that updates or deletes specific document collections whenever you publish new documentation.",
      },
    ],
    downloadFiles: [
      {
        fileName: "rag-support-knowledge-agent.json",
        fileSize: "28.6 KB",
        format: "JSON (n8n Workflow)",
        description: "Production RAG workflow including both document ingestion and conversational query pipelines.",
      },
      {
        fileName: "RAG_DEPLOYMENT_MANUAL.md",
        fileSize: "16.4 KB",
        format: "Markdown Documentation",
        description: "Complete guide for setting up Qdrant vector database, embedding generation, and prompt optimization.",
      },
      {
        fileName: "sample-knowledge-base.md",
        fileSize: "6.2 KB",
        format: "Sample Document",
        description: "A ready-to-test mock company handbook to test your RAG pipeline immediately.",
      },
    ],
  },
  {
    id: "prod_ecommerce_cart_recovery",
    slug: "ecommerce-abandoned-cart-whatsapp",
    title: "Shopify & WooCommerce WhatsApp Abandoned Cart Recovery Engine",
    tagline: "Recover 20% to 35% of lost checkouts automatically with high-converting, personalized WhatsApp messages.",
    category: "Business Automation Systems",
    priceINR: 2999,
    priceUSD: 35,
    rating: 4.88,
    reviewCount: 31,
    summary:
      "A complete e-commerce revenue recovery system built on n8n. Connects your Shopify or WooCommerce store directly with Meta's WhatsApp Cloud API. Automatically triggers a personalized WhatsApp message 30 minutes after cart abandonment, featuring product images, item names, and a 1-click checkout recovery link.",
    businessProblem:
      "Over 70% of e-commerce shoppers abandon their carts, and recovery emails have abysmal 15% open rates. WhatsApp delivers 98% open rates and 45% click-through rates.",
    features: [
      "Direct webhook listener for Shopify 'checkouts/create' and WooCommerce 'cart-abandoned'",
      "Smart delay timer (30 minutes) with auto-cancellation if customer completes purchase",
      "Dynamic message personalization pulling product titles, images, and price",
      "Discount incentive generator (creates single-use coupon in Shopify automatically)",
      "Cash on Delivery (COD) verification branch to eliminate fake orders",
      "Google Sheets analytics tracking recovered revenue and ROI",
    ],
    useCases: [
      "D2C fashion, jewelry, and beauty brands",
      "Electronics and consumer goods online stores",
      "Specialty gourmet food and subscription box services",
    ],
    toolsRequired: [
      "n8n (v1.40+)",
      "Shopify or WooCommerce store (Admin API access)",
      "Meta WhatsApp Cloud API (Free tier includes 1,000 monthly service messages)",
      "Google Sheets (for revenue tracking)",
    ],
    n8nVersion: "v1.40.0 or higher",
    requiredApiKeys: [
      {
        service: "Shopify / WooCommerce REST Admin API",
        description: "Store Admin Access Token",
        pricingNote: "100% Free included with your store plan",
      },
      {
        service: "Meta WhatsApp Cloud API",
        description: "System User Token and Phone ID",
        pricingNote: "Connect your own account and check the provider usage terms.",
      },
    ],
    setupDifficulty: "Intermediate",
    setupTimeMinutes: 25,
    workflowDiagramDescription:
      "Shopify Cart Abandoned Webhook -> 30-Min Wait Node -> Order Completion Checker -> If Unpaid -> Generate 10% Coupon -> Meta WhatsApp Cloud API Template Dispatch -> Google Sheets Metric Log",
    workflowSteps: [
      {
        node: "Shopify Cart Webhook",
        type: "trigger",
        description: "Listens for customer entering checkout with phone number.",
      },
      {
        node: "30-Minute Delay Timer",
        type: "tool",
        description: "Pauses workflow to give the customer natural time to complete their purchase.",
      },
      {
        node: "Purchase Status Check",
        type: "tool",
        description: "Queries Shopify Orders API. If order was placed, terminates cleanly to avoid spamming.",
      },
      {
        node: "Dynamic Coupon Node",
        type: "tool",
        description: "Generates a unique 10% off single-use coupon code valid for 24 hours.",
      },
      {
        node: "WhatsApp Message Dispatcher",
        type: "output",
        description: "Dispatches pre-approved Meta WhatsApp recovery template with 1-click cart recovery link.",
      },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Import Workflow JSON",
        instructions: "Import 'ecommerce-abandoned-cart-whatsapp.json' into n8n.",
      },
      {
        step: 2,
        title: "Connect Shopify / WooCommerce Admin API",
        instructions: "Create a Custom App in Shopify Admin > Settings > Apps, grant 'read_orders' and 'write_discounts', and paste API credentials in n8n.",
      },
      {
        step: 3,
        title: "Configure WhatsApp Template in Meta Business Manager",
        instructions: "Use our provided template copy to submit a 1-click WhatsApp cart recovery template in Meta Business Manager (typically approved in 5 minutes).",
      },
      {
        step: 4,
        title: "Test Cart Abandonment & Go Live",
        instructions: "Add an item to your store cart, proceed to checkout, enter your phone number, and leave the tab. Verify the recovery message arrives 30 minutes later.",
      },
    ],
    limitations: [
      "Customer must reach the checkout step and enter their phone number for the webhook to capture contact details.",
      "Requires Meta approval for the WhatsApp template before sending (sample template text provided in download).",
    ],
    faqs: [
      {
        question: "Will it annoy customers who already paid?",
        answer:
          "No! The workflow features a strict status-check node that queries Shopify before sending. If the order has been completed, the workflow terminates immediately.",
      },
      {
        question: "Can I change the delay from 30 minutes?",
        answer:
          "Yes, you can easily change the wait node duration to 15 minutes, 1 hour, or 4 hours with a single click in n8n.",
      },
    ],
    downloadFiles: [
      {
        fileName: "ecommerce-abandoned-cart-whatsapp.json",
        fileSize: "21.3 KB",
        format: "JSON (n8n Workflow)",
        description: "Full n8n workflow for Shopify & WooCommerce cart recovery and COD verification.",
      },
      {
        fileName: "SHOPIFY_WHATSAPP_RECOVERY_GUIDE.md",
        fileSize: "13.5 KB",
        format: "Markdown Documentation",
        description: "Meta template submission guidelines, Shopify webhook setup, and high-converting message scripts.",
      },
    ],
  },
];
