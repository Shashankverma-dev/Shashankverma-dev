"use client";

import React from "react";

export type PinColor = "purple" | "red" | "blue" | "orange" | "pink";

interface PushPinProps {
  color?: PinColor;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const COLOR_MAP: Record<PinColor, { base: string; highlight: string; rim: string }> = {
  purple: { base: "#8b5cf6", highlight: "#c4b5fd", rim: "#5b21b6" },
  red: { base: "#ef4444", highlight: "#fca5a5", rim: "#991b1b" },
  blue: { base: "#3b82f6", highlight: "#93c5fd", rim: "#1d4ed8" },
  orange: { base: "#f97316", highlight: "#fdba74", rim: "#9a3412" },
  pink: { base: "#ec4899", highlight: "#f9a8d4", rim: "#9d174d" },
};

export function PushPin({ color = "red", className = "", size = "md" }: PushPinProps) {
  const { base, highlight, rim } = COLOR_MAP[color] || COLOR_MAP.red;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", // 20px desktop standard
    lg: "w-6 h-6", // 24px
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center pointer-events-none select-none z-30 ${className}`}
      aria-hidden="true"
    >
      {/* Metal Pin Needle / Stem angled down into paper */}
      <div 
        className="absolute top-3 left-1/2 -translate-x-1/2 w-[2.5px] h-3.5 bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-600 rounded-full -rotate-12 pointer-events-none"
        style={{
          boxShadow: "1px 2px 3px rgba(0,0,0,0.6)",
        }}
      />

      {/* Needle / Pin Drop Shadow on Pegboard / Paper */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-5 h-3.5 rounded-full bg-black/60 blur-[3px] pointer-events-none" />

      {/* Pin Head - 3D Sphere with Specular Highlight and Depth */}
      <div
        className={`relative ${sizeClasses} rounded-full transition-transform duration-200`}
        style={{
          background: `radial-gradient(circle at 35% 28%, #ffffff 0%, ${highlight} 26%, ${base} 65%, ${rim} 100%)`,
          boxShadow: `
            0 5px 8px -1px rgba(0, 0, 0, 0.55),
            0 2px 4px -1px rgba(0, 0, 0, 0.4),
            inset 0 -2px 3px rgba(0, 0, 0, 0.55),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.8)
          `,
        }}
      >
        {/* Specular Glint */}
        <div className="absolute top-[2.5px] left-[3.5px] w-1.5 h-1.5 rounded-full bg-white/95 blur-[0.2px]" />
      </div>
    </div>
  );
}
