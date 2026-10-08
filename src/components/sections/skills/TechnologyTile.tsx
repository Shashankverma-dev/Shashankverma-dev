"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { TechnologyItem } from "./skill-data";
import { PushPin } from "./PushPin";
interface TechnologyTileProps {
  item: TechnologyItem;
  isSelected?: boolean;
  isDragEnabled?: boolean;
  onSelect?: (item: TechnologyItem | null) => void;
  onPositionChange?: (id: string, x: number, y: number, isFinal?: boolean) => void;
  savedPosition?: { x: number; y: number };
}

// Real, authentic official logos for technology tiles
function TechIcon({ id }: { id: string }) {
  const iconClass =
    "w-7 h-7 min-[390px]:w-8 min-[390px]:h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 xl:w-9.5 xl:h-9.5 object-contain select-none pointer-events-none drop-shadow-sm";

  switch (id) {
    case "tech-c":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/c.svg"
          alt="C Language"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-python":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/python.svg"
          alt="Python"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-java":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/java.svg"
          alt="Java"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-html5":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/html5.svg"
          alt="HTML5"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-css3":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/css3.svg"
          alt="CSS3"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-js":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/javascript.svg"
          alt="JavaScript"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-sql":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/mysql.svg"
          alt="SQL / MySQL"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-db":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/postgresql.svg"
          alt="Databases / PostgreSQL"
          className={iconClass}
          loading="eager"
        />
      );
    case "tech-word":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/skills/logos/word.svg"
          alt="Microsoft Word"
          className={iconClass}
          loading="eager"
        />
      );
    default:
      return (
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white font-mono font-bold">
          {id.slice(5, 7).toUpperCase()}
        </div>
      );
  }
}

export function TechnologyTile({
  item,
  isSelected,
  isDragEnabled = true,
  onSelect,
  onPositionChange,
  savedPosition,
}: TechnologyTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(savedPosition?.x || 0);
  const y = useMotionValue(savedPosition?.y || 0);

  // Synchronize on position reset (only when not actively dragging)
  useEffect(() => {
    if (!isDragging) {
      x.set(savedPosition?.x || 0);
      y.set(savedPosition?.y || 0);
    }
  }, [savedPosition, isDragging, x, y]);

  return (
    <div className="relative inline-block">
      <motion.div
        ref={tileRef}
        data-tech-id={item.id}
        drag={isDragEnabled}
        dragElastic={0}
        dragMomentum={false}
        style={{ x, y }}
        onDragStart={() => {
          setIsDragging(true);
          setHasMovedDuringDrag(false);
        }}
        onDrag={() => {
          setHasMovedDuringDrag(true);
          if (onPositionChange) {
            onPositionChange(item.id, x.get(), y.get(), false);
          }
        }}
        onDragEnd={() => {
          setIsDragging(false);
          if (onPositionChange) {
            onPositionChange(item.id, x.get(), y.get(), true);
          }
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={
          isDragEnabled
            ? {
                scale: 1.05,
                zIndex: 45,
                transition: { duration: 0.15 },
              }
            : {}
        }
        whileDrag={{
          scale: 1.06,
          zIndex: 70,
          cursor: "grabbing",
        }}
        onClick={() => {
          // Only trigger popup if not a drag action
          if (!hasMovedDuringDrag && onSelect) {
            onSelect(isSelected ? null : item);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group select-none cursor-pointer touch-pan-y ${
          isDragEnabled ? "cursor-grab" : ""
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (onSelect) onSelect(isSelected ? null : item);
          }
        }}
        aria-label={`${item.name} technology card. Click to view details.`}
      >
        {/* Attached Push Pin at Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <PushPin color={item.pinColor} size="sm" />
        </div>

        {/* Physical Paper / Dark Tech Tile (Consistent unified proportion) */}
        <div
          className="w-[86px] h-[94px] min-[390px]:w-[92px] min-[390px]:h-[100px] sm:w-[102px] sm:h-[110px] lg:w-[108px] lg:h-[116px] xl:w-[114px] xl:h-[122px] rounded-xl sm:rounded-2xl flex flex-col items-center justify-between p-1.5 sm:p-2 transition-all duration-300 relative border bg-[#faf8f1] dark:bg-[#18181b] border-black/10 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100"
          style={{
            transform:
              isHovered || isDragging || isSelected
                ? "none"
                : `rotate(${item.initialRotation}deg)`,
            boxShadow: isSelected
              ? "0 0 0 2.5px #8b5cf6, 0 16px 28px rgba(139, 92, 246, 0.35)"
              : isDragging
              ? "0 24px 38px -8px rgba(0, 0, 0, 0.52), 0 0 14px rgba(139, 92, 246, 0.25)"
              : isHovered
              ? "0 18px 28px -6px rgba(0, 0, 0, 0.42), 0 0 10px rgba(139, 92, 246, 0.18)"
              : "0 10px 20px -4px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Subtle Paper Inner Highlight Border */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none border border-black/5 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />

          {/* Spacer for Top Pin */}
          <div className="h-0.5 sm:h-1" />

          {/* Icon */}
          <div className="flex-1 flex items-center justify-center transform group-hover:scale-108 transition-transform duration-200">
            <TechIcon id={item.id} />
          </div>

          {/* Label */}
          <div className="mt-0.5 text-center w-full">
            <span className="text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11px] font-black tracking-tight uppercase block truncate text-zinc-900 dark:text-zinc-100">
              {item.name}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
