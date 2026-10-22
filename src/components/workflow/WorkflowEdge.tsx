"use client";

import { useId } from "react";

interface WorkflowEdgeProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isActive: boolean;
}

export function WorkflowEdge({
  fromX,
  fromY,
  toX,
  toY,
  isActive,
}: WorkflowEdgeProps) {
  const pathId = useId();

  // Calculate smooth cubic bezier curve
  const dx = toX - fromX;
  const controlPointOffset = Math.max(Math.abs(dx) * 0.45, 40);
  const pathData = `M ${fromX} ${fromY} C ${fromX + controlPointOffset} ${fromY}, ${
    toX - controlPointOffset
  } ${toY}, ${toX} ${toY}`;

  return (
    <g className="select-none pointer-events-none">
      {/* Background static line */}
      <path
        d={pathData}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray={isActive ? "none" : "3 3"}
        className="transition-colors duration-300"
      />

      {/* Active Glowing Flow Line */}
      {isActive && (
        <path
          d={pathData}
          fill="none"
          stroke="var(--run)"
          strokeWidth="2"
          opacity="0.8"
          className="transition-opacity duration-300"
        />
      )}

      {/* Animated Glowing Packet traversing the path */}
      {isActive && (
        <>
          <path id={pathId} d={pathData} fill="none" stroke="transparent" />
          <circle r="4" fill="var(--run)">
            <animateMotion
              dur="0.65s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
          {/* Packet ambient glow */}
          <circle r="8" fill="var(--run)" opacity="0.4">
            <animateMotion
              dur="0.65s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </>
      )}
    </g>
  );
}
