"use client";

import { useEffect, useRef } from "react";
import { Terminal, CheckCircle2, Clock } from "lucide-react";
import type { LogEntry, PlaybackStatus } from "@/hooks/useWorkflowPlayer";
import { cn } from "@/lib/utils";

interface LogPanelProps {
  logs: LogEntry[];
  status: PlaybackStatus;
  scenarioTitle: string;
  className?: string;
}

export function LogPanel({
  logs,
  status,
  scenarioTitle,
  className,
}: LogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new log line
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const isDone = status === "done";
  const isPlaying = status === "playing";

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-xl border border-[var(--border)] bg-[#080C18] overflow-hidden shadow-inner",
        className
      )}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--surface-2)]/80 border-b border-[var(--border)] select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--gold)]" aria-hidden="true" />
          <span className="text-xs font-mono text-[var(--text)] font-medium">
            Execution Log
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--muted)]/70">
            {scenarioTitle}
          </span>
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              isPlaying && "bg-[var(--run)] animate-pulse",
              isDone && "bg-[var(--ok)]",
              status === "idle" && "bg-[var(--border)]",
              status === "paused" && "bg-[var(--gold)]"
            )}
          />
        </div>
      </div>

      {/* Log Output Body */}
      <div
        ref={scrollRef}
        className="flex-1 p-3.5 overflow-y-auto space-y-1.5 font-mono text-xs text-[var(--muted)] min-h-[160px] max-h-[300px] lg:max-h-none"
      >
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[var(--muted)]/40 italic py-6">
            Waiting for trigger event...
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2.5 leading-relaxed animate-fade-up text-[11px] sm:text-xs"
            >
              <span className="text-[var(--gold)]/70 shrink-0 select-none">
                {log.time}
              </span>
              <span className="text-[var(--text)]/90 break-words">{log.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Status Footer */}
      <div className="px-3.5 py-2 border-t border-[var(--border)]/60 bg-[var(--surface)] flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          {isPlaying && (
            <>
              <Clock className="w-3 h-3 text-[var(--run)] animate-spin" />
              <span className="text-[var(--run)]">Executing workflow...</span>
            </>
          )}
          {isDone && (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)]" />
              <span className="text-[var(--ok)]">Execution completed successfully</span>
            </>
          )}
          {status === "paused" && (
            <span className="text-[var(--gold)]">Execution paused</span>
          )}
          {status === "idle" && (
            <span className="text-[var(--muted)]/60">Idle (ready)</span>
          )}
        </div>
        <span className="text-[var(--muted)]/50 text-[10px]">
          Demo simulation
        </span>
      </div>
    </div>
  );
}

