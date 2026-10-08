"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechnologyItem } from "./skill-data";
import { PushPin } from "./PushPin";
import { X, CheckCircle2 } from "lucide-react";

interface TechnologyModalProps {
  item: TechnologyItem | null;
  onClose: () => void;
}

function ModalTechIcon({ id }: { id: string }) {
  const iconClass = "w-11 h-11 object-contain select-none drop-shadow-sm";

  switch (id) {
    case "tech-c":
      return <img src="/skills/logos/c.svg" alt="C Language" className={iconClass} />;
    case "tech-python":
      return <img src="/skills/logos/python.svg" alt="Python" className={iconClass} />;
    case "tech-java":
      return <img src="/skills/logos/java.svg" alt="Java" className={iconClass} />;
    case "tech-html5":
      return <img src="/skills/logos/html5.svg" alt="HTML5" className={iconClass} />;
    case "tech-css3":
      return <img src="/skills/logos/css3.svg" alt="CSS3" className={iconClass} />;
    case "tech-js":
      return <img src="/skills/logos/javascript.svg" alt="JavaScript" className={iconClass} />;
    case "tech-sql":
      return <img src="/skills/logos/mysql.svg" alt="SQL" className={iconClass} />;
    case "tech-db":
      return <img src="/skills/logos/postgresql.svg" alt="Databases" className={iconClass} />;
    case "tech-word":
      return <img src="/skills/logos/word.svg" alt="Word" className={iconClass} />;
    default:
      return (
        <div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center text-white font-mono font-bold text-lg">
          {id.slice(5, 7).toUpperCase()}
        </div>
      );
  }
}

export function TechnologyModal({ item, onClose }: TechnologyModalProps) {
  // Listen for Escape key to close popup
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none pointer-events-auto">
          {/* Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 dark:bg-black/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Centered Modal Card (Never cut off by viewport) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tech-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] rounded-2xl bg-white/98 dark:bg-[#18181b]/98 text-zinc-900 dark:text-zinc-100 border border-purple-300/80 dark:border-purple-500/40 shadow-2xl p-5 sm:p-6 backdrop-blur-md overflow-hidden"
          >
            {/* Attached Decorative Push Pin on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-20">
              <PushPin color={item.pinColor} size="sm" />
            </div>

            {/* Subtle brand glow background */}
            <div
              className="absolute -top-20 -right-20 w-44 h-44 rounded-full pointer-events-none opacity-20 blur-2xl"
              style={{ backgroundColor: item.accentColor }}
            />

            {/* Header: Icon + Title + Category + Close Button */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1.5 flex items-center justify-center border border-black/5 dark:border-white/10 shrink-0 shadow-2xs">
                  <ModalTechIcon id={item.id} />
                </div>
                <div>
                  <h3
                    id="tech-modal-title"
                    className="text-lg sm:text-xl font-black tracking-tight text-zinc-950 dark:text-white leading-none"
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800/50">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans mb-3.5">
              {item.description}
            </p>

            {/* "USED FOR:" Key Highlights List */}
            <div className="space-y-2 pt-1 mb-4">
              <p className="text-[11px] font-mono font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <span>// USED FOR:</span>
              </p>
              <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-zinc-700 dark:text-zinc-300">
                {item.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="pt-2.5 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pinned on Board</span>
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                ESC to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
