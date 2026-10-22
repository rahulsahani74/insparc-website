/**
 * Workflow Theater scenarios — Insparc Technology.
 * Each scenario is labelled "Demo simulation" and represents a common automation.
 * Data is purely static — no network requests, no real client data.
 *
 * ADDING A SCENARIO:
 * 1. Give each node a unique id string.
 * 2. Lay out nodes on a rough grid (x, y in pixels, relative to the Theater SVG canvas).
 * 3. Define edges as [from, to] pairs.
 * 4. Define steps in execution order; each step references a nodeId.
 */

export type NodeKind = "trigger" | "ai" | "tool" | "logic" | "output";

export type WFNode = {
  id: string;
  label: string;
  kind: NodeKind;
  /** lucide-react icon name */
  icon: string;
  x: number;
  y: number;
};

export type WFStep = {
  nodeId: string;
  durationMs: number;
  log: string;
  payload?: string;
};

export type Scenario = {
  id: string;
  title: string;
  subtitle: string;
  nodes: WFNode[];
  edges: [from: string, to: string][];
  steps: WFStep[];
};

// ── Scenario 1: WhatsApp AI Chatbot ──────────────────────────────────────────
const whatsappChatbot: Scenario = {
  id: "whatsapp-ai-chatbot",
  title: "WhatsApp AI Chatbot",
  subtitle: "Demo simulation",
  nodes: [
    { id: "trigger", label: "WhatsApp Trigger", kind: "trigger", icon: "MessageCircle", x: 40, y: 120 },
    { id: "classify", label: "Classify Intent", kind: "ai", icon: "Brain", x: 240, y: 120 },
    { id: "branch", label: "Route Message", kind: "logic", icon: "GitBranch", x: 440, y: 120 },
    { id: "ai-reply", label: "AI Reply", kind: "ai", icon: "Sparkles", x: 620, y: 60 },
    { id: "crm", label: "Save to CRM", kind: "tool", icon: "Database", x: 620, y: 200 },
    { id: "send", label: "Send Message", kind: "output", icon: "Send", x: 820, y: 120 },
  ],
  edges: [
    ["trigger", "classify"],
    ["classify", "branch"],
    ["branch", "ai-reply"],
    ["branch", "crm"],
    ["ai-reply", "send"],
    ["crm", "send"],
  ],
  steps: [
    {
      nodeId: "trigger",
      durationMs: 600,
      log: "WhatsApp Trigger  message received from +91 98xxx xxxxx",
      payload: '{"message": "Hi, I want to book an appointment"}',
    },
    {
      nodeId: "classify",
      durationMs: 900,
      log: "Classify Intent  intent=appointment_booking  confidence=0.94",
    },
    {
      nodeId: "branch",
      durationMs: 300,
      log: "Route Message  branch=appointment  forwarding to AI Reply + CRM",
    },
    {
      nodeId: "ai-reply",
      durationMs: 1200,
      log: "AI Reply  generating personalised response (380 ms)",
    },
    {
      nodeId: "crm",
      durationMs: 500,
      log: "Save to CRM  lead created  id=lead_7f3a",
    },
    {
      nodeId: "send",
      durationMs: 400,
      log: "Send Message  delivered  status=read",
    },
  ],
};

// ── Scenario 2: Lead Capture + AI Follow-up ───────────────────────────────────
const leadCapture: Scenario = {
  id: "lead-capture-ai-followup",
  title: "Lead Capture + Follow-up",
  subtitle: "Demo simulation",
  nodes: [
    { id: "form", label: "Form Submitted", kind: "trigger", icon: "FileInput", x: 40, y: 120 },
    { id: "dedup", label: "Deduplicate", kind: "logic", icon: "Filter", x: 240, y: 120 },
    { id: "score", label: "AI Lead Score", kind: "ai", icon: "Star", x: 440, y: 120 },
    { id: "email", label: "Send Email", kind: "output", icon: "Mail", x: 640, y: 60 },
    { id: "whatsapp", label: "WhatsApp Alert", kind: "output", icon: "MessageCircle", x: 640, y: 200 },
    { id: "crm", label: "Sync to CRM", kind: "tool", icon: "Database", x: 840, y: 120 },
  ],
  edges: [
    ["form", "dedup"],
    ["dedup", "score"],
    ["score", "email"],
    ["score", "whatsapp"],
    ["email", "crm"],
    ["whatsapp", "crm"],
  ],
  steps: [
    {
      nodeId: "form",
      durationMs: 500,
      log: "Form Submitted  source=website  name=[Lead Name]  interest=WhatsApp Automation",
    },
    {
      nodeId: "dedup",
      durationMs: 400,
      log: "Deduplicate  no duplicate found  proceeding",
    },
    {
      nodeId: "score",
      durationMs: 1100,
      log: "AI Lead Score  score=87/100  priority=high  reason=strong intent keywords",
    },
    {
      nodeId: "email",
      durationMs: 700,
      log: "Send Email  personalised welcome email queued  provider=Resend",
    },
    {
      nodeId: "whatsapp",
      durationMs: 600,
      log: "WhatsApp Alert  owner notified of high-priority lead",
    },
    {
      nodeId: "crm",
      durationMs: 500,
      log: "Sync to CRM  record created  tags=[high-priority, website]",
    },
  ],
};

// ── Scenario 3: Automated Email Sender ────────────────────────────────────────
const emailSender: Scenario = {
  id: "automated-email-sender",
  title: "Automated Email Sequence",
  subtitle: "Demo simulation",
  nodes: [
    { id: "trigger", label: "New Lead Trigger", kind: "trigger", icon: "Zap", x: 40, y: 120 },
    { id: "enrich", label: "Enrich Data", kind: "tool", icon: "Search", x: 240, y: 120 },
    { id: "generate", label: "AI Copywriter", kind: "ai", icon: "PenLine", x: 440, y: 120 },
    { id: "email1", label: "Email Day 0", kind: "output", icon: "Mail", x: 640, y: 60 },
    { id: "wait", label: "Wait 2 Days", kind: "logic", icon: "Clock", x: 640, y: 200 },
    { id: "email2", label: "Email Day 2", kind: "output", icon: "Mail", x: 840, y: 200 },
  ],
  edges: [
    ["trigger", "enrich"],
    ["enrich", "generate"],
    ["generate", "email1"],
    ["generate", "wait"],
    ["wait", "email2"],
  ],
  steps: [
    {
      nodeId: "trigger",
      durationMs: 400,
      log: "New Lead Trigger  lead_id=lead_9c2b  email=[lead@example.com]",
    },
    {
      nodeId: "enrich",
      durationMs: 900,
      log: "Enrich Data  industry=real_estate  company_size=small  location=Pune",
    },
    {
      nodeId: "generate",
      durationMs: 1400,
      log: "AI Copywriter  generating personalised sequence (520 ms)  tone=professional",
    },
    {
      nodeId: "email1",
      durationMs: 600,
      log: "Email Day 0  subject='Welcome — here is what we can automate for you'  sent",
    },
    {
      nodeId: "wait",
      durationMs: 300,
      log: "Wait 2 Days  scheduled follow-up for T+2",
    },
    {
      nodeId: "email2",
      durationMs: 600,
      log: "Email Day 2  subject='Quick question about your workflow'  queued",
    },
  ],
};

// ── Scenario 4: RAG Knowledge Agent ──────────────────────────────────────────
const ragAgent: Scenario = {
  id: "rag-knowledge-agent",
  title: "RAG Knowledge Agent",
  subtitle: "Demo simulation",
  nodes: [
    { id: "query", label: "User Question", kind: "trigger", icon: "HelpCircle", x: 40, y: 120 },
    { id: "embed", label: "Embed Query", kind: "ai", icon: "Layers", x: 240, y: 120 },
    { id: "retrieve", label: "Vector Search", kind: "tool", icon: "Search", x: 440, y: 120 },
    { id: "context", label: "Build Context", kind: "logic", icon: "BookOpen", x: 640, y: 120 },
    { id: "generate", label: "Generate Answer", kind: "ai", icon: "Sparkles", x: 840, y: 120 },
    { id: "respond", label: "Deliver Answer", kind: "output", icon: "MessageSquare", x: 1040, y: 120 },
  ],
  edges: [
    ["query", "embed"],
    ["embed", "retrieve"],
    ["retrieve", "context"],
    ["context", "generate"],
    ["generate", "respond"],
  ],
  steps: [
    {
      nodeId: "query",
      durationMs: 400,
      log: "User Question  'What is your refund policy?'  channel=web-chat",
    },
    {
      nodeId: "embed",
      durationMs: 700,
      log: "Embed Query  model=text-embedding-3-small  dimensions=1536",
    },
    {
      nodeId: "retrieve",
      durationMs: 800,
      log: "Vector Search  top_k=5  similarity_threshold=0.78  3 chunks retrieved",
    },
    {
      nodeId: "context",
      durationMs: 300,
      log: "Build Context  tokens=1240  source=knowledge-base-v3",
    },
    {
      nodeId: "generate",
      durationMs: 1300,
      log: "Generate Answer  model=gpt-4o-mini  grounded in 3 source chunks  (490 ms)",
    },
    {
      nodeId: "respond",
      durationMs: 400,
      log: "Deliver Answer  confidence=high  response delivered to user",
    },
  ],
};

// ── Scenario 5: Multi-agent Research Flow ─────────────────────────────────────
const multiAgent: Scenario = {
  id: "multi-agent-research",
  title: "Multi-Agent Research",
  subtitle: "Demo simulation",
  nodes: [
    { id: "input", label: "Research Request", kind: "trigger", icon: "Clipboard", x: 40, y: 160 },
    { id: "planner", label: "Planner Agent", kind: "ai", icon: "Map", x: 240, y: 160 },
    { id: "researcher1", label: "Research Agent 1", kind: "ai", icon: "Globe", x: 440, y: 80 },
    { id: "researcher2", label: "Research Agent 2", kind: "ai", icon: "Globe", x: 440, y: 240 },
    { id: "synthesiser", label: "Synthesiser", kind: "ai", icon: "Merge", x: 660, y: 160 },
    { id: "report", label: "Deliver Report", kind: "output", icon: "FileText", x: 860, y: 160 },
  ],
  edges: [
    ["input", "planner"],
    ["planner", "researcher1"],
    ["planner", "researcher2"],
    ["researcher1", "synthesiser"],
    ["researcher2", "synthesiser"],
    ["synthesiser", "report"],
  ],
  steps: [
    {
      nodeId: "input",
      durationMs: 400,
      log: "Research Request  topic='AI automation market in India 2024'",
    },
    {
      nodeId: "planner",
      durationMs: 1000,
      log: "Planner Agent  decomposed into 2 sub-tasks  assigning to research agents",
    },
    {
      nodeId: "researcher1",
      durationMs: 1800,
      log: "Research Agent 1  market size + trends  sources=5  tokens=3200",
    },
    {
      nodeId: "researcher2",
      durationMs: 1600,
      log: "Research Agent 2  competitor landscape  sources=4  tokens=2800",
    },
    {
      nodeId: "synthesiser",
      durationMs: 1400,
      log: "Synthesiser  merging findings  deduplicating  generating executive summary",
    },
    {
      nodeId: "report",
      durationMs: 500,
      log: "Deliver Report  format=PDF  pages=6  delivered to requester",
    },
  ],
};

export const scenarios: Scenario[] = [
  whatsappChatbot,
  leadCapture,
  emailSender,
  ragAgent,
  multiAgent,
];
