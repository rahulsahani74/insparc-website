"use client";

import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  Brain,
  GitBranch,
  Sparkles,
  Database,
  Send,
  FileInput,
  Filter,
  Star,
  Mail,
  Zap,
  Search,
  PenLine,
  Clock,
  HelpCircle,
  Layers,
  BookOpen,
  MessageSquare,
  Clipboard,
  Map,
  Globe,
  Merge,
  FileText,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { WFNode, NodeKind } from "@/data/scenarios";
import type { NodeExecutionStatus } from "@/hooks/useWorkflowPlayer";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Brain,
  GitBranch,
  Sparkles,
  Database,
  Send,
  FileInput,
  Filter,
  Star,
  Mail,
  Zap,
  Search,
  PenLine,
  Clock,
  HelpCircle,
  Layers,
  BookOpen,
  MessageSquare,
  Clipboard,
  Map,
  Globe,
  Merge,
  FileText,
};

const kindTopBorder: Record<NodeKind, string> = {
  trigger: "border-t-[var(--gold)]",
  ai: "border-t-[var(--run)]",
  tool: "border-t-[var(--text)]",
  output: "border-t-[var(--ok)]",
  logic: "border-t-[var(--border)]",
};

interface NodeCardProps {
  node: WFNode;
  status: NodeExecutionStatus;
  className?: string;
  style?: React.CSSProperties;
}

export function NodeCard({ node, status, className, style }: NodeCardProps) {
  const IconComponent = iconMap[node.icon] ?? Sparkles;

  const isRunning = status === "running";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div
      style={style}
      className={cn(
        "relative flex flex-col justify-between p-3.5 rounded-xl border border-[var(--border)]",
        "bg-[var(--surface-2)] shadow-md select-none transition-all duration-300",
        "border-t-2",
        kindTopBorder[node.kind],
        // Running glow & highlight
        isRunning &&
          "border-[var(--run)] shadow-[0_0_20px_rgba(92,200,255,0.35)] scale-[1.03]",
        // Success border
        isSuccess && "border-[var(--ok)]/60 bg-[var(--surface)]",
        // Error border
        isError && "border-[var(--err)]",
        className
      )}
    >
      {/* Node header with Icon & Status Dot */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div
          className={cn(
            "p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors",
            isRunning && "text-[var(--run)] border-[var(--run)]/50",
            isSuccess && "text-[var(--ok)] border-[var(--ok)]/50"
          )}
        >
          <IconComponent className="w-4 h-4" aria-hidden="true" />
        </div>

        {/* Execution indicator */}
        <div className="flex items-center">
          {isRunning && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--run)]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>running</span>
            </span>
          )}
          {isSuccess && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--ok)]">
              <Check className="w-3.5 h-3.5" />
              <span>success</span>
            </span>
          )}
          {isError && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--err)]">
              <AlertCircle className="w-3.5 h-3.5" />
            </span>
          )}
          {status === "idle" && (
            <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
          )}
        </div>
      </div>

      {/* Node Label */}
      <div>
        <p className="text-xs font-semibold text-[var(--text)] tracking-tight line-clamp-1">
          {node.label}
        </p>
        <p className="text-[10px] font-mono text-[var(--muted)]/70 uppercase tracking-wider">
          {node.kind}
        </p>
      </div>
    </div>
  );
}

