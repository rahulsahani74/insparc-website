"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Scenario, WFStep } from "@/data/scenarios";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type PlaybackStatus = "idle" | "playing" | "paused" | "done";
export type NodeExecutionStatus = "idle" | "running" | "success" | "error";

export interface LogEntry {
  id: string;
  time: string;
  text: string;
  isHeader?: boolean;
}

export function useWorkflowPlayer(scenario: Scenario, inView = true) {
  const prefersReduced = useReducedMotion();
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeEdge, setActiveEdge] = useState<[string, string] | null>(null);

  const [nodeStatuses, setNodeStatuses] = useState<
    Record<string, NodeExecutionStatus>
  >(() => {
    const initial: Record<string, NodeExecutionStatus> = {};
    scenario.nodes.forEach((n) => {
      initial[n.id] = "idle";
    });
    return initial;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to format simulated timestamp (e.g., 14:02:15)
  const getSimulatedTime = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0] ?? "12:00:00";
  };

  // Reset player state to initial
  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setCurrentStepIndex(-1);
    setActiveEdge(null);
    setLogs([]);
    const resetNodes: Record<string, NodeExecutionStatus> = {};
    scenario.nodes.forEach((n) => {
      resetNodes[n.id] = "idle";
    });
    setNodeStatuses(resetNodes);
    setStatus("idle");
  }, [scenario]);

  // When reduced-motion is requested, jump directly to completed state
  useEffect(() => {
    if (prefersReduced) {
      const doneNodes: Record<string, NodeExecutionStatus> = {};
      scenario.nodes.forEach((n) => {
        doneNodes[n.id] = "success";
      });
      setNodeStatuses(doneNodes);
      setLogs(
        scenario.steps.map((s, idx) => ({
          id: `step-${idx}`,
          time: getSimulatedTime(),
          text: s.log,
        }))
      );
      setStatus("done");
    }
  }, [prefersReduced, scenario]);

  // Reset when scenario changes
  useEffect(() => {
    reset();
  }, [scenario.id, reset]);

  // Execute a single step
  const executeStep = useCallback(
    (stepIdx: number) => {
      if (stepIdx >= scenario.steps.length) {
        setStatus("done");
        setActiveEdge(null);

        // Auto-loop after 2.5s if in view
        if (inView) {
          loopTimerRef.current = setTimeout(() => {
            reset();
            setStatus("playing");
          }, 2500);
        }
        return;
      }

      const step: WFStep = scenario.steps[stepIdx]!;
      setCurrentStepIndex(stepIdx);

      // Determine active edge from previous step to this step
      if (stepIdx > 0) {
        const prevStep = scenario.steps[stepIdx - 1];
        if (prevStep) {
          setActiveEdge([prevStep.nodeId, step.nodeId]);
        }
      } else {
        setActiveEdge(null);
      }

      // Mark current node as running
      setNodeStatuses((prev) => ({
        ...prev,
        [step.nodeId]: "running",
      }));

      // Add log
      setLogs((prev) => [
        ...prev,
        {
          id: `log-${stepIdx}-${Date.now()}`,
          time: getSimulatedTime(),
          text: step.log,
        },
      ]);

      const effectiveDuration = step.durationMs / speed;

      timerRef.current = setTimeout(() => {
        // Step finished: mark current node as success
        setNodeStatuses((prev) => ({
          ...prev,
          [step.nodeId]: "success",
        }));
        // Move to next step
        executeStep(stepIdx + 1);
      }, effectiveDuration);
    },
    [scenario, speed, inView, reset]
  );

  // Playback control functions
  const play = useCallback(() => {
    if (status === "playing") return;
    setStatus("playing");
    const nextIdx = currentStepIndex < 0 ? 0 : currentStepIndex;
    executeStep(nextIdx);
  }, [status, currentStepIndex, executeStep]);

  const pause = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setStatus("paused");
  }, []);

  const replay = useCallback(() => {
    reset();
    setStatus("playing");
    setTimeout(() => {
      executeStep(0);
    }, 50);
  }, [reset, executeStep]);

  // Auto-play when scrolled in view
  useEffect(() => {
    if (inView && status === "idle" && !prefersReduced) {
      const delayTimer = setTimeout(() => {
        play();
      }, 400);
      return () => clearTimeout(delayTimer);
    }
    if (!inView && status === "playing") {
      pause();
    }
  }, [inView, status, play, pause, prefersReduced]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, []);

  return {
    status,
    currentStepIndex,
    nodeStatuses,
    activeEdge,
    logs,
    speed,
    setSpeed,
    play,
    pause,
    replay,
  };
}

