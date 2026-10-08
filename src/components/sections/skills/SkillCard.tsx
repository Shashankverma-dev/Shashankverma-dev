"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useDragControls } from "framer-motion";
import { SkillCategoryData } from "./skill-data";
import { PushPin } from "./PushPin";
import { TapeStrip } from "./TapeStrip";
import {
  Code2,
  Layout,
  Database,
  FileText,
  Camera,
  ArrowRight,
  GripHorizontal,
} from "lucide-react";

interface SkillCardProps {
  data: SkillCategoryData;
  index: number;
  isDragEnabled?: boolean;
  onPositionChange?: (id: string, x: number, y: number, isFinal?: boolean) => void;
  savedPosition?: { x: number; y: number };
}

function subscribeToTouch(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getTouchSnapshot() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function getTouchServerSnapshot() {
  return false;
}

export function SkillCard({
  data,
  index,
  isDragEnabled = true,
  onPositionChange,
  savedPosition,
}: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isTouchDevice = useSyncExternalStore(
    subscribeToTouch,
    getTouchSnapshot,
    getTouchServerSnapshot
  );

  const x = useMotionValue(savedPosition?.x || 0);
  const y = useMotionValue(savedPosition?.y || 0);
  const dragControls = useDragControls();

  // Sync motion values whenever savedPosition changes (e.g. on Reset Board)
  useEffect(() => {
    x.set(savedPosition?.x || 0);
    y.set(savedPosition?.y || 0);
  }, [savedPosition, x, y]);

  // Icon mapping
  const renderIcon = () => {
    const iconClass = "w-4 h-4 sm:w-4.5 sm:h-4.5";
    switch (data.iconName) {
      case "terminal":
        return <Code2 className={iconClass} style={{ color: data.accentColor }} />;
      case "layout":
        return <Layout className={iconClass} style={{ color: data.accentColor }} />;
      case "database":
        return <Database className={iconClass} style={{ color: data.accentColor }} />;
      case "fileText":
        return <FileText className={iconClass} style={{ color: data.accentColor }} />;
      case "camera":
        return <Camera className={iconClass} style={{ color: data.accentColor }} />;
      default:
        return <Code2 className={iconClass} style={{ color: data.accentColor }} />;
    }
  };

  // Push pins matching reference specification
  const renderPushPin = () => {
    if (index === 0) {
      return (
        <div className="absolute -top-3 left-8 z-30 pointer-events-none">
          <PushPin color="purple" size="sm" />
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <PushPin color="red" size="sm" />
        </div>
      );
    }
    if (index === 2) {
      return (
        <div className="absolute -top-3 left-9 z-30 pointer-events-none">
          <PushPin color="blue" size="sm" />
        </div>
      );
    }
    if (index === 3) {
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <PushPin color="orange" size="sm" />
        </div>
      );
    }
    return (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <PushPin color="purple" size="sm" />
      </div>
    );
  };

  return (
    <motion.div
      drag={isDragEnabled}
      dragListener={isDragEnabled && !isTouchDevice}
      dragControls={dragControls}
      dragElastic={0}
      dragMomentum={false}
      style={{ x, y }}
      onDragStart={() => setIsDragging(true)}
      onDrag={() => {
        if (onPositionChange) {
          onPositionChange(data.id, x.get(), y.get(), false);
        }
      }}
      onDragEnd={() => {
        setIsDragging(false);
        if (onPositionChange) {
          onPositionChange(data.id, x.get(), y.get(), true);
        }
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={
        isDragEnabled
          ? {
              scale: 1.012,
              zIndex: 40,
              transition: { duration: 0.18 },
            }
          : {}
      }
      whileDrag={{
        scale: 1.03,
        zIndex: 60,
        cursor: "grabbing",
      }}
      className={`relative w-full group select-none ${
        isDragEnabled && !isTouchDevice ? "cursor-grab" : ""
      }`}
    >
      {/* Attached Physical Push Pin */}
      {renderPushPin()}

      {/* Decorative Tape Strip on Card 01 */}
      {index === 0 && (
        <TapeStrip
          className="-top-2.5 right-6"
          width="w-14 sm:w-16"
          rotation={5}
        />
      )}

      {/* Decorative Tape Strip on Card 02 */}
      {index === 1 && (
        <TapeStrip
          className="-top-2 left-6 opacity-60"
          width="w-9 sm:w-10"
          rotation={-7}
        />
      )}

      {/* Physical Off-White Paper Card (Sleek reference proportions) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full min-h-[58px] sm:min-h-[62px] lg:min-h-[64px] rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 lg:px-4 lg:py-2 transition-shadow duration-300 border border-zinc-300/80 dark:border-black/10 relative flex flex-col justify-center"
        style={{
          backgroundColor: "#faf8f1",
          backgroundImage: `
            linear-gradient(135deg, #faf8f1 0%, #f3efe6 100%)
          `,
          boxShadow: isDragging
            ? "0 20px 36px -8px rgba(0, 0, 0, 0.45), 0 0 16px rgba(139, 92, 246, 0.25)"
            : isHovered
            ? "0 16px 28px -6px rgba(0, 0, 0, 0.35), 0 0 10px rgba(139, 92, 246, 0.15)"
            : "0 10px 20px rgba(0,0,0,0.28), 0 2px 5px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)",
          transform:
            isHovered || isDragging ? "none" : `rotate(${data.rotation}deg)`,
        }}
      >
        {/* Subtle Paper Inner Highlight Border */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none border border-black/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 sm:gap-2">
          {/* Left Block: NUMBER + ICON + TITLE + DESCRIPTION */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Number Box */}
            <div className="flex items-center justify-center w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-md border border-zinc-300/80 bg-white/90 text-zinc-700 font-mono text-[10px] sm:text-[10.5px] font-bold shrink-0 shadow-2xs">
              {data.number}
            </div>

            {/* Category Icon */}
            <div
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105"
              style={{
                backgroundColor: `${data.accentColor}18`,
                border: `1.5px solid ${data.accentColor}35`,
              }}
            >
              {renderIcon()}
            </div>

            {/* Category Title & Description */}
            <div className="min-w-0 pr-1 max-w-[190px] sm:max-w-[210px] xl:max-w-[230px]">
              <h3 className="text-zinc-950 font-black text-xs sm:text-[13px] lg:text-sm tracking-tight leading-tight">
                {data.title}
              </h3>
              <p className="text-zinc-600 text-[9.5px] sm:text-[10px] lg:text-[10.5px] font-medium leading-snug line-clamp-1 mt-0.2">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right Block: SKILL CHIPS + ARROW BUTTON */}
          <div className="flex items-center justify-start lg:justify-end gap-1.5 sm:gap-2 flex-wrap lg:flex-nowrap shrink-0">
            {data.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-white/95 border border-zinc-300/80 shadow-2xs text-zinc-900 shrink-0 whitespace-nowrap hover:border-zinc-400 transition-all"
              >
                <span className="text-[9.5px] sm:text-[10px] lg:text-[10.5px] font-bold tracking-tight">
                  {skill.name}
                </span>
                <span
                  className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full"
                  style={{
                    backgroundColor: data.badgeBg,
                    color: data.badgeText,
                  }}
                >
                  {skill.level}
                </span>
              </div>
            ))}

            {/* Tactile Arrow Button at Right End */}
            <div
              className="hidden lg:flex w-5.5 h-5.5 rounded-full bg-zinc-900/5 group-hover:bg-purple-900/10 border border-zinc-900/10 group-hover:border-purple-500/30 items-center justify-center text-zinc-600 group-hover:text-purple-600 transition-all duration-200 shrink-0 ml-0.5 shadow-2xs"
              aria-hidden="true"
            >
              <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>

            {/* Mobile Drag Handle */}
            {isTouchDevice && isDragEnabled && (
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="lg:hidden text-zinc-400 hover:text-zinc-700 p-1 cursor-grab active:cursor-grabbing ml-auto touch-none rounded-md bg-zinc-200/50"
                aria-label="Drag card handle"
              >
                <GripHorizontal className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
