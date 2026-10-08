"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { PushPin } from "./PushPin";
import { TapeStrip } from "./TapeStrip";

export interface StickyNoteProps {
  id: string;
  type: "checklist" | "blue" | "pink";
  initialRotation?: number;
  className?: string;
  isDragEnabled?: boolean;
  onPositionChange?: (id: string, x: number, y: number, isFinal?: boolean) => void;
  savedPosition?: { x: number; y: number };
}

export function StickyNote({
  id,
  type,
  initialRotation = 0,
  className = "",
  isDragEnabled = true,
  onPositionChange,
  savedPosition,
}: StickyNoteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(savedPosition?.x || 0);
  const y = useMotionValue(savedPosition?.y || 0);

  // Synchronize on position reset
  useEffect(() => {
    x.set(savedPosition?.x || 0);
    y.set(savedPosition?.y || 0);
  }, [savedPosition, x, y]);

  return (
    <motion.div
      drag={isDragEnabled}
      dragElastic={0}
      dragMomentum={false}
      style={{ x, y }}
      onDragStart={() => setIsDragging(true)}
      onDrag={() => {
        if (onPositionChange) {
          onPositionChange(id, x.get(), y.get(), false);
        }
      }}
      onDragEnd={() => {
        setIsDragging(false);
        if (onPositionChange) {
          onPositionChange(id, x.get(), y.get(), true);
        }
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={
        isDragEnabled
          ? {
              scale: 1.03,
              zIndex: 50,
              transition: { duration: 0.18 },
            }
          : {}
      }
      whileDrag={{
        scale: 1.04,
        rotate: 0,
        zIndex: 80,
        cursor: "grabbing",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none touch-pan-y ${
        isDragEnabled ? "cursor-grab active:cursor-grabbing" : ""
      } ${className}`}
    >
      {/* 1. Cream Legal Pad Checklist Note */}
      {type === "checklist" && (
        <div className="relative">
          {/* Push Pin at Top Center */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <PushPin color="purple" size="sm" />
          </div>

          <div
            className="w-30 sm:w-34 lg:w-36 p-1.5 sm:p-2 pt-2.5 sm:pt-3 rounded-xs sm:rounded-sm transition-shadow duration-300 relative border border-black/10"
            style={{
              backgroundColor: "#fef9e7",
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 16px, rgba(0,0,0,0.06) 16px, rgba(0,0,0,0.06) 17px)",
              boxShadow: isDragging
                ? "0 20px 32px -8px rgba(0, 0, 0, 0.48)"
                : isHovered
                ? "0 14px 22px -5px rgba(0, 0, 0, 0.38)"
                : "0 10px 18px -4px rgba(0, 0, 0, 0.3)",
              transform:
                isHovered || isDragging ? "none" : `rotate(${initialRotation}deg)`,
              fontFamily: "var(--font-handwriting), Caveat, cursive",
            }}
          >
            {/* Red left margin line of legal pad */}
            <div className="absolute top-0 bottom-0 left-3.5 w-[1.5px] bg-red-400/35 pointer-events-none" />

            <div className="relative z-10 space-y-0.5 pl-1.5 text-zinc-900">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold">
                <span className="text-emerald-700">✓</span>
                <span className="tracking-wide">LEARN</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold">
                <span className="text-emerald-700">✓</span>
                <span className="tracking-wide">BUILD</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold">
                <span className="text-emerald-700">✓</span>
                <span className="tracking-wide">INNOVATE</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold">
                <span className="text-emerald-700">✓</span>
                <span className="tracking-wide">INSPIRE</span>
              </div>
              <div className="pt-0.2 text-right text-[11px] sm:text-xs font-bold text-zinc-700 pr-1">
                <span>:)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Blue Square Sticky Note */}
      {type === "blue" && (
        <div className="relative">
          {/* Push Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <PushPin color="red" size="sm" />
          </div>

          <div
            className="w-18 sm:w-20 lg:w-22 h-18 sm:h-20 lg:h-22 p-1.5 pt-2 rounded-sm flex flex-col justify-center items-center text-center transition-shadow duration-300 relative border border-sky-400/40"
            style={{
              backgroundColor: "#bae6fd",
              boxShadow: isDragging
                ? "0 18px 28px -6px rgba(0, 0, 0, 0.45)"
                : isHovered
                ? "0 12px 20px -4px rgba(0, 0, 0, 0.35)"
                : "0 8px 16px -3px rgba(0, 0, 0, 0.28)",
              transform:
                isHovered || isDragging ? "none" : `rotate(${initialRotation}deg)`,
              fontFamily: "var(--font-handwriting), Caveat, cursive",
            }}
          >
            {/* Handwritten items */}
            <div className="space-y-0.5 text-zinc-900 font-black text-[10px] sm:text-[11px] leading-tight">
              <div>CODE</div>
              <div>PRACTICE</div>
              <div>IMPROVE</div>
              <div>REPEAT</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Pink Square Sticky Note */}
      {type === "pink" && (
        <div className="relative">
          {/* Frosted Tape on Top */}
          <TapeStrip className="-top-2 left-1/2 -translate-x-1/2" rotation={2} />

          {/* Push Pin at Top Center */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-35 pointer-events-none">
            <PushPin color="red" size="sm" />
          </div>

          <div
            className="w-17 sm:w-19 lg:w-20 h-17 sm:h-19 lg:h-20 p-1.5 pt-2 rounded-sm flex flex-col justify-center items-center text-center transition-shadow duration-300 relative border border-pink-400/40"
            style={{
              backgroundColor: "#fbcfe8",
              boxShadow: isDragging
                ? "0 18px 28px -6px rgba(0, 0, 0, 0.45)"
                : isHovered
                ? "0 12px 20px -4px rgba(0, 0, 0, 0.35)"
                : "0 8px 16px -3px rgba(0, 0, 0, 0.28)",
              transform:
                isHovered || isDragging ? "none" : `rotate(${initialRotation}deg)`,
              fontFamily: "var(--font-handwriting), Caveat, cursive",
            }}
          >
            <div className="space-y-0.5 text-zinc-900 font-black text-[9.5px] sm:text-[10px] leading-tight">
              <div>CREATE</div>
              <div>SOLVE</div>
              <div>LEARN</div>
              <div className="flex items-center justify-center gap-1">
                <span>GROW</span>
                <span className="text-[11px] font-bold">↗</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
