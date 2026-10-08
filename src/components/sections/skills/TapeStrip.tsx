"use client";

import React from "react";

interface TapeStripProps {
  className?: string;
  width?: string;
  rotation?: number;
}

export function TapeStrip({
  className = "",
  width = "w-16 sm:w-20",
  rotation = -4,
}: TapeStripProps) {
  return (
    <div
      className={`absolute h-5 ${width} pointer-events-none select-none z-30 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full rounded-[1px] border-t border-b border-white/40 shadow-xs"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 240, 0.22) 50%, rgba(255, 255, 255, 0.32) 100%)",
          backdropFilter: "blur(2px)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
        }}
      />
    </div>
  );
}
