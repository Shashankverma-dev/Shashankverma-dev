"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  Wifi, 
  ChevronDown, 
  Globe, 
  Code, 
  FolderGit2,
  X,
  ArrowRight
} from "lucide-react";

export function HeroTabletMockup() {
  const [selectedStars, setSelectedStars] = useState(5);
  const [activeModal, setActiveModal] = useState(false);

  return (
    <>
      <div 
        className="flex items-end justify-center select-none cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        {/* ================= 3D REALISTIC TABLET ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            transform: "perspective(900px) rotateY(-4deg) rotateX(6deg) rotateZ(-0.5deg)",
            transformOrigin: "bottom center",
          }}
          className="relative w-[268px] sm:w-[280px] h-[370px] sm:h-[380px] rounded-[28px] p-[6px] bg-[#181a22] dark:bg-[#0b0c11] border-[1.5px] border-[#3a3d4d] dark:border-[#2d303c]/90 shadow-[0_24px_55px_-10px_rgba(0,0,0,0.5),0_8px_20px_-4px_rgba(0,0,0,0.3)] dark:shadow-[0_28px_65px_-12px_rgba(0,0,0,0.85)] ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Top Hardware Elements */}
          <div className="absolute -top-[1.5px] right-8 w-6 h-[1.5px] bg-[#5c6075] dark:bg-[#4a4d60] rounded-t-xs z-50 pointer-events-none" />
          <div className="absolute top-8 -right-[1.5px] w-[1.5px] h-5 bg-[#5c6075] dark:bg-[#4a4d60] rounded-r-xs z-50 pointer-events-none" />
          <div className="absolute top-15 -right-[1.5px] w-[1.5px] h-5 bg-[#5c6075] dark:bg-[#4a4d60] rounded-r-xs z-50 pointer-events-none" />

          {/* Top Camera Dot */}
          <div className="absolute top-[3px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40 pointer-events-none">
            <div className="w-[5px] h-[5px] rounded-full bg-[#0e1017] dark:bg-[#050608] border border-zinc-400/40 dark:border-zinc-750 flex items-center justify-center shadow-inner">
              <div className="w-[1.8px] h-[1.8px] rounded-full bg-[#0284c7] ring-[0.5px] ring-[#38bdf8]/80 shadow-[0_0_2px_#38bdf8]" />
            </div>
          </div>

          {/* Screen Surface */}
          <div className="relative w-full h-full rounded-[22px] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-zinc-900 dark:from-[#0d0f17] dark:via-[#090b12] dark:to-[#05060a] dark:text-white overflow-hidden flex flex-col justify-between p-3 sm:p-3.5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-inner transition-colors duration-300">
            {/* Screen Glare Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.14] dark:via-white/[0.02] dark:to-white/[0.05] pointer-events-none z-20" />

            {/* 1. iPadOS Top Status Bar */}
            <div className="flex items-center justify-between px-1 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 border-b border-zinc-200/90 dark:border-zinc-800/80 pb-1.5 z-10 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-950 dark:text-white tracking-tight text-[10.5px]">9:41</span>
                <span className="text-[8.5px] text-zinc-600 dark:text-zinc-400 font-sans font-medium">Tue Aug 26</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Cellular Signal Bars */}
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <div className="w-[1.5px] h-1 bg-zinc-800 dark:bg-zinc-300 rounded-2xs" />
                  <div className="w-[1.5px] h-1.5 bg-zinc-800 dark:bg-zinc-300 rounded-2xs" />
                  <div className="w-[1.5px] h-2 bg-zinc-800 dark:bg-zinc-300 rounded-2xs" />
                  <div className="w-[1.5px] h-2.5 bg-zinc-800 dark:bg-zinc-300 rounded-2xs" />
                </div>
                <Wifi className="w-3 h-3 text-zinc-800 dark:text-zinc-200" />
                <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 font-sans tracking-tight">5G</span>
                {/* Battery Pill */}
                <div className="flex items-center gap-[1px]">
                  <div className="w-5 h-2.5 rounded-[3.5px] border border-emerald-600/90 dark:border-emerald-400/90 p-[1px] flex items-center bg-emerald-500/15 dark:bg-emerald-500/20 shadow-2xs">
                    <div className="w-[85%] h-full bg-emerald-600 dark:bg-emerald-400 rounded-[1.5px]" />
                  </div>
                  <div className="w-[1px] h-1 bg-emerald-600/80 dark:bg-emerald-400/80 rounded-r-2xs" />
                </div>
              </div>
            </div>

            {/* 2. Developer Identity Card */}
            <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#131522]/95 border border-zinc-200/90 dark:border-zinc-800/80 flex items-center justify-between shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] z-10 backdrop-blur-md transition-all duration-300">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[12px] shadow-sm shrink-0">
                  SV
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-[12.5px] font-extrabold text-zinc-950 dark:text-white tracking-tight whitespace-nowrap leading-none">
                      Shashank Verma
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[9px] text-violet-600 dark:text-violet-400 font-semibold truncate mt-0.5">
                    Software Developer &amp; BCA
                  </p>
                  <p className="text-[8px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <span>📍 Dehradun, India</span>
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[7.5px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/35 font-semibold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active</span>
              </span>
            </div>

            {/* 3. About Highlights */}
            <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#131522]/95 border border-zinc-200/90 dark:border-zinc-800/80 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] z-10 flex flex-col gap-2 backdrop-blur-md transition-all duration-300">
              {/* Highlight 1 */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 text-[11px]">
                  🎓
                </div>
                <div className="min-w-0">
                  <p className="text-[9.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate leading-none">
                    Swami Rama Himalayan Univ.
                  </p>
                  <p className="text-[8px] text-zinc-500 dark:text-zinc-400 font-medium">BCA (2023 - 2026)</p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-[11px]">
                  ⚡
                </div>
                <div className="min-w-0">
                  <p className="text-[9.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate leading-none">
                    Full-Stack &amp; Web Tech
                  </p>
                  <p className="text-[8px] text-zinc-500 dark:text-zinc-400 font-medium">React, Next.js, Node, SQL</p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-[11px]">
                  🌿
                </div>
                <div className="min-w-0">
                  <p className="text-[9.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate leading-none">
                    Rateme App Creator
                  </p>
                  <p className="text-[8px] text-emerald-600 dark:text-emerald-400 font-medium font-mono">Live on rateme.co.in ↗</p>
                </div>
              </div>
            </div>

            {/* 4. Quick Key Stats */}
            <div className="grid grid-cols-3 gap-1.5 z-10">
              <div className="p-1.5 rounded-xl bg-white/95 dark:bg-[#131522]/95 border border-zinc-200/80 dark:border-zinc-800/80 text-center shadow-xs">
                <p className="text-[11px] font-extrabold text-violet-600 dark:text-violet-400 leading-none">10+</p>
                <p className="text-[7.5px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Projects</p>
              </div>
              <div className="p-1.5 rounded-xl bg-white/95 dark:bg-[#131522]/95 border border-zinc-200/80 dark:border-zinc-800/80 text-center shadow-xs">
                <p className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">3+ Yrs</p>
                <p className="text-[7.5px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Coding</p>
              </div>
              <div className="p-1.5 rounded-xl bg-white/95 dark:bg-[#131522]/95 border border-zinc-200/80 dark:border-zinc-800/80 text-center shadow-xs">
                <p className="text-[11px] font-extrabold text-amber-500 leading-none">5.0★</p>
                <p className="text-[7.5px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Rating</p>
              </div>
            </div>

            {/* 5. iPadOS Floating Frosted Glass Dock */}
            <div className="p-1.5 rounded-2xl bg-white/80 dark:bg-[#161826]/85 backdrop-blur-2xl border border-white/80 dark:border-white/10 flex items-center justify-around gap-2 z-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
              {/* Safari */}
              <div className="w-7 h-7 rounded-[11px] bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-white" />
              </div>
              {/* VS Code */}
              <div className="w-7 h-7 rounded-[11px] bg-gradient-to-tr from-[#4f46e5] via-[#6366f1] to-[#818cf8] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                <Code className="w-3.5 h-3.5 text-white" />
              </div>
              {/* Terminal */}
              <div className="w-7 h-7 rounded-[11px] bg-[#090b10] border border-zinc-700/80 flex items-center justify-center shadow-inner hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                <span className="text-[10px] font-mono font-bold text-emerald-400">&gt;_</span>
              </div>
              {/* GitHub / Projects */}
              <div className="w-7 h-7 rounded-[11px] bg-gradient-to-tr from-[#c026d3] via-[#d946ef] to-[#ec4899] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                <FolderGit2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* 6. Bottom Home Indicator & Prompt */}
            <div className="pt-0.5 flex flex-col items-center shrink-0 group z-10">
              <span className="text-[7.5px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                <span>Explore Full About Section</span>
                <ChevronDown className="w-2.5 h-2.5 text-violet-600 dark:text-violet-400 animate-bounce" />
              </span>
              <div className="w-14 h-1 rounded-full bg-zinc-400/80 dark:bg-zinc-500/70 group-hover:bg-violet-600 transition-colors mt-0.5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 p-5 shadow-2xl text-white relative"
            >
              <button
                type="button"
                onClick={() => setActiveModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  🌿
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">Rateme App</h5>
                  <p className="text-xs text-zinc-400 font-mono">www.rateme.co.in</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-sans">
                A modern review aggregation SaaS utility designed to boost verified social proof with fast, zero-friction QR collection workflows.
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                <a
                  href="https://www.rateme.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-500/25 ml-auto"
                >
                  <span>Open Live Platform</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

