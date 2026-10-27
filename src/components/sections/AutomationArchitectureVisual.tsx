"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Bot,
  CheckCircle2,
  Sparkles,
  Zap,
  Activity,
  Layers,
  FileCheck2,
} from "lucide-react";

interface WorkflowFlow {
  id: string;
  name: string;
  trigger: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    subtext: string;
    badge: string;
  };
  aiProcessing: {
    name: string;
    task: string;
    confidence: string;
  };
  tools: {
    name: string;
    action: string;
  }[];
  outcome: {
    metric: string;
    summary: string;
    status: string;
  };
}

const FLOWS: WorkflowFlow[] = [
  {
    id: "whatsapp-lead",
    name: "WhatsApp Lead Qualification",
    trigger: {
      icon: MessageSquare,
      label: "Inbound WhatsApp",
      subtext: "New inquiry from client",
      badge: "Webhook Triggered",
    },
    aiProcessing: {
      name: "Insparc Intent Agent",
      task: "Classifying query, extracting budget & intent",
      confidence: "99.4% Match",
    },
    tools: [
      { name: "HubSpot CRM", action: "Contact created & scored" },
      { name: "Google Calendar", action: "Free slot booked automatically" },
      { name: "Slack", action: "Sales team notified with summary" },
    ],
    outcome: {
      metric: "1.8s Response",
      summary: "Customer engaged, appointment booked without human intervention",
      status: "Execution Verified",
    },
  },
  {
    id: "invoice-ai",
    name: "Document & Invoice AI",
    trigger: {
      icon: FileCheck2,
      label: "Incoming PDF Invoice",
      subtext: "Vendor email attachment",
      badge: "Email Listener",
    },
    aiProcessing: {
      name: "Document Extraction Agent",
      task: "Extracting line items, vendor GST, totals & due date",
      confidence: "100% Validated",
    },
    tools: [
      { name: "ERP / Accounting", action: "PO matched & voucher drafted" },
      { name: "Google Drive", action: "Indexed into monthly archive" },
      { name: "Finance Approval", action: "One-click approval link sent" },
    ],
    outcome: {
      metric: "Zero Errors",
      summary: "Manual data entry completely bypassed in 2.4s",
      status: "Pipeline Synchronized",
    },
  },
  {
    id: "lead-nurture",
    name: "Cross-Platform Nurture Engine",
    trigger: {
      icon: Zap,
      label: "Ad Form Submitted",
      subtext: "High-intent Meta/Google Ad lead",
      badge: "Instant Webhook",
    },
    aiProcessing: {
      name: "Enrichment & Copy Agent",
      task: "Researching company domain & drafting hyper-tailored email",
      confidence: "High Personalization",
    },
    tools: [
      { name: "Airtable Lead Base", action: "Status tagged: Priority 1" },
      { name: "WhatsApp Cloud API", action: "Introductory brochure sent" },
      { name: "Resend Email", action: "Custom proposal delivered" },
    ],
    outcome: {
      metric: "100% Reach Rate",
      summary: "Lead followed up across 2 channels within 30 seconds",
      status: "Cycle Complete",
    },
  },
];

export function AutomationArchitectureVisual() {
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const flow: WorkflowFlow = FLOWS[activeFlowIndex] ?? FLOWS[0]!;

  // Rotate steps visually to simulate live data packet flow
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2200);

    return () => clearInterval(stepInterval);
  }, [activeFlowIndex]);

  return (
    <div className="relative w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:p-7 shadow-2xl backdrop-blur-xl">
      {/* Visual Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-wider text-[var(--gold)] uppercase">
            Live Architecture Engine
          </span>
          <span className="text-xs text-[var(--muted)]">| n8n & Autonomous AI</span>
        </div>

        {/* Flow selector tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]/60">
          {FLOWS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveFlowIndex(idx);
                setActiveStep(0);
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-medium ${
                activeFlowIndex === idx
                  ? "bg-[var(--gold)] text-slate-950 shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/40"
              }`}
            >
              {item.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Architecture Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 my-6 relative">
        {/* Step 1: Inbound Trigger */}
        <div
          className={`relative p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 0
              ? "border-[var(--gold)] bg-[var(--surface-2)] shadow-[0_0_20px_rgba(201,162,75,0.15)] ring-1 ring-[var(--gold)]/40"
              : "border-[var(--border)]/70 bg-[var(--surface-2)]/60"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
              01. Event Trigger
            </span>
            <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-[var(--surface-2)] text-[var(--ok)] border border-emerald-800/40">
              {flow.trigger.badge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)]">
              <flow.trigger.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text)]">{flow.trigger.label}</div>
              <div className="text-xs text-[var(--muted)] leading-tight">{flow.trigger.subtext}</div>
            </div>
          </div>
        </div>

        {/* Step 2: AI Processing & Decision Engine */}
        <div
          className={`relative p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 1
              ? "border-[var(--gold)] bg-[var(--surface-2)] shadow-[0_0_20px_rgba(201,162,75,0.15)] ring-1 ring-[var(--gold)]/40"
              : "border-[var(--border)]/70 bg-[var(--surface-2)]/60"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">
              02. Autonomous AI
            </span>
            <span className="px-1.5 py-0.5 rounded text-xs font-mono bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30">
              {flow.aiProcessing.confidence}
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text)] flex items-center gap-1">
                {flow.aiProcessing.name}
              </div>
              <div className="text-xs text-[var(--muted)] leading-snug mt-1">
                {flow.aiProcessing.task}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Connected Business Apps */}
        <div
          className={`relative p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 2
              ? "border-[var(--gold)] bg-[var(--surface-2)] shadow-[0_0_20px_rgba(201,162,75,0.15)] ring-1 ring-[var(--gold)]/40"
              : "border-[var(--border)]/70 bg-[var(--surface-2)]/60"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
              03. Action Sync
            </span>
            <span className="text-xs font-mono text-[var(--muted)]">3 Systems</span>
          </div>

          <div className="space-y-1.5">
            {flow.tools.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-1.5 rounded bg-[var(--surface)] border border-[var(--border)]/60"
              >
                <span className="font-medium text-[var(--text)]">{t.name}</span>
                <span className="text-xs text-[var(--ok)] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Synced
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Business Outcome */}
        <div
          className={`relative p-4 rounded-xl border transition-all duration-300 ${
            activeStep === 3
              ? "border-emerald-500 bg-[var(--surface-2)] shadow-[0_0_20px_rgba(74,222,128,0.15)] ring-1 ring-emerald-500/40"
              : "border-[var(--border)]/70 bg-[var(--surface-2)]/60"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--ok)]">
              04. Final Outcome
            </span>
            <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-[var(--ok)] border border-emerald-500/30">
              {flow.outcome.metric}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-semibold text-[var(--text)] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--ok)] shrink-0" />
              {flow.outcome.status}
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {flow.outcome.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Footer with telemetry bar */}
      <div className="pt-4 border-t border-[var(--border)]/70 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[var(--ok)]" />
            <span>Reliability: <strong className="text-[var(--text)]">99.98%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>Engine: <strong className="text-[var(--text)]">n8n Enterprise + RAG</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--gold)]">
          <Sparkles className="w-3 h-3" />
          <span>Zero Human Data Entry Required</span>
        </div>
      </div>
    </div>
  );
}
