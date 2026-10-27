"use client";

import { useState } from "react";
import { Play, Pause, RotateCcw, FastForward, Activity } from "lucide-react";
import type { Scenario } from "@/data/scenarios";
import { scenarios } from "@/data/scenarios";
import { useWorkflowPlayer } from "@/hooks/useWorkflowPlayer";
import { useInView } from "@/hooks/useInView";
import { NodeCard } from "@/components/workflow/NodeCard";
import { WorkflowEdge } from "@/components/workflow/WorkflowEdge";
import { LogPanel } from "@/components/workflow/LogPanel";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface WorkflowTheaterProps {
  initialScenarioId?: string;
  className?: string;
}

export function WorkflowTheater({
  initialScenarioId = "whatsapp-ai-chatbot",
  className,
}: WorkflowTheaterProps) {
  const [containerRef, inView] = useInView<HTMLDivElement>({
    threshold: 0.15,
    once: false,
  });

  const [activeScenario, setActiveScenario] = useState<Scenario>(() => {
    return (
      scenarios.find((s) => s.id === initialScenarioId) ??
      scenarios[0] ?? {
        id: "fallback",
        title: "Automation Flow",
        subtitle: "Demo simulation",
        nodes: [],
        edges: [],
        steps: [],
      }
    );
  });

  const {
    status,
    nodeStatuses,
    activeEdge,
    logs,
    speed,
    setSpeed,
    play,
    pause,
    replay,
  } = useWorkflowPlayer(activeScenario, inView);

  const nodeWidth = 200;
  const nodeHeight = 152;
  const displayNodes = activeScenario.nodes.map((node) => ({ ...node, x: node.x * 1.3, y: node.y * 1.4 }));
  const canvasWidth = Math.max(960, ...displayNodes.map((node) => node.x + nodeWidth + 24));
  const canvasHeight = Math.max(340, ...displayNodes.map((node) => node.y + nodeHeight + 24));

  return (
    <div
      ref={containerRef}
      className={cn(
        "workflow-theater rounded-card border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex flex-col",
        className
      )}
    >
      {/* ── Top Window Bar (macOS style window dots + Scenario tabs) ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)]">
        {/* Left: Window Controls + Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
          </div>
          <div className="h-4 w-[1px] bg-[var(--border)] hidden sm:block" />
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[var(--gold)]" aria-hidden="true" />
            <span className="text-xs font-mono font-medium text-[var(--text)]">
              Workflow Theater
            </span>
          </div>
        </div>

        {/* Center: Scenario Switcher Tabs */}
        <div role="group" aria-label="Choose a simulation scenario" className="flex flex-wrap items-center gap-5 py-1 max-w-full">
          {scenarios.map((sc) => {
            const isSelected = sc.id === activeScenario.id;
            return (
              <button
                key={sc.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveScenario(sc)}
                className={cn(
                  "choice-control",
                  isSelected && "is-active"
                )}
              >
                {sc.title}
              </button>
            );
          })}
        </div>

        {/* Right: Simulation Tag */}
        <Badge variant="gold" className="text-xs hidden sm:inline-flex">
          Demo simulation
        </Badge>
      </div>

      <div className="playback-toolbar" role="group" aria-label="Simulation playback controls">
        <span className="text-sm font-medium">Try the workflow</span>
        <div className="playback-actions">
          <button type="button" onClick={status === "playing" ? pause : play} aria-label={status === "playing" ? "Pause simulation" : "Play simulation"} className="story-button">
            {status === "playing" ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {status === "playing" ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={replay} aria-label="Replay simulation" className="story-button story-button-secondary"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Replay</button>
          <button type="button" onClick={() => setSpeed(speed === 1 ? 2 : 1)} aria-label={`Toggle playback speed (currently ${speed}x)`} className="story-button story-button-secondary"><FastForward className="h-4 w-4" aria-hidden="true" /> Speed: {speed}×</button>
        </div>
      </div>

      {/* ── Main Interactive Stage: Flow Canvas (Left) + Log Panel (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 min-h-[460px]">
        {/* Workflow Diagram Canvas */}
        <div role="region" aria-label="Workflow diagram. Scroll horizontally to explore all steps." tabIndex={0} className="workflow-canvas lg:col-span-7 xl:col-span-8 p-4 sm:p-6 relative flex flex-col justify-between overflow-x-auto [background-size:20px_20px] min-h-[340px]">
          {/* Desktop Visual Stage */}
          <div className="relative my-auto hidden md:block shrink-0" style={{ width: canvasWidth, height: canvasHeight }}>
            {/* SVG Edges and Animated Data Packets */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            >
              {activeScenario.edges.map(([fromId, toId]) => {
                const fromNode = displayNodes.find((n) => n.id === fromId);
                const toNode = displayNodes.find((n) => n.id === toId);
                if (!fromNode || !toNode) return null;

                const fromX = fromNode.x + nodeWidth;
                const fromY = fromNode.y + nodeHeight / 2;
                const toX = toNode.x;
                const toY = toNode.y + nodeHeight / 2;

                const isEdgeActive =
                  activeEdge !== null &&
                  activeEdge[0] === fromId &&
                  activeEdge[1] === toId;

                return (
                  <WorkflowEdge
                    key={`${fromId}-${toId}`}
                    fromX={fromX}
                    fromY={fromY}
                    toX={toX}
                    toY={toY}
                    isActive={isEdgeActive}
                  />
                );
              })}
            </svg>

            {/* Positioned Node Cards */}
            {displayNodes.map((node) => (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${nodeWidth}px`,
                  height: `${nodeHeight}px`,
                }}
              >
                <NodeCard
                  node={node}
                  status={nodeStatuses[node.id] ?? "idle"}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Mobile Linear Vertical Fallback Flow */}
          <div className="md:hidden flex flex-col gap-3 py-2">
            {activeScenario.nodes.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center">
                <NodeCard
                  node={node}
                  status={nodeStatuses[node.id] ?? "idle"}
                  className="w-full max-w-sm"
                />
                {i < activeScenario.nodes.length - 1 && (
                  <div className="w-[1.5px] h-4 bg-[var(--border)] my-1" />
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Execution Log Panel */}
        <div className="workflow-log lg:col-span-5 xl:col-span-4 p-4 sm:p-6 bg-[var(--surface)] border-t lg:border-t-0 lg:border-l border-[var(--border)] flex flex-col">
          <LogPanel
            logs={logs}
            status={status}
            scenarioTitle={activeScenario.title}
          />
        </div>
      </div>
    </div>
  );
}

