"use client";

import React from "react";

export interface ThreadConnection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  sag?: number; // Catinary sag in pixels
}

interface ConnectionThreadsProps {
  connections: ThreadConnection[];
  className?: string;
}

export function ConnectionThreads({ connections, className = "" }: ConnectionThreadsProps) {
  if (!connections || connections.length === 0) return null;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id="thread-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.65" />
        </filter>
      </defs>

      {connections.map((conn, idx) => {
        const { from, to, color = "#ef4444", sag = 28 } = conn;
        // Midpoint with gravity sag
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 + sag;

        const pathData = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

        return (
          <g key={idx} filter="url(#thread-shadow)">
            {/* Thread Outer Glow / Fiber */}
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.25"
            />
            {/* Main Crisp Physical String Thread */}
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="1 0"
            />
            {/* Tiny Pin Knot at Source */}
            <circle cx={from.x} cy={from.y} r="2.5" fill={color} />
            {/* Tiny Pin Knot at Destination */}
            <circle cx={to.x} cy={to.y} r="2.5" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}
