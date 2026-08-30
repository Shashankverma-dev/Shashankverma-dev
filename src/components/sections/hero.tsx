"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  Wifi, 
  CheckCircle2, 
  GraduationCap, 
  Code, 
  ExternalLink,
  ChevronDown
} from "lucide-react";

interface HeroProps {
  isLoaded?: boolean;
}

export function Hero({ isLoaded = true }: HeroProps) {
  const [isLampOn, setIsLampOn] = useState<boolean>(true);
  const [tabletTab, setTabletTab] = useState<"profile" | "projects">("profile");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("desk_lamp");
      if (saved !== null) {
        setIsLampOn(saved === "true");
      }
    } catch (e) {}
  }, []);

  const toggleLamp = () => {
    setIsLampOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("desk_lamp", String(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafc] dark:bg-[#090a0f] pt-0 pb-0 selection:bg-emerald-500/20 selection:text-emerald-500">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-violet-400/5 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-400/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Full-Bleed Desk Scene */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[1920px] mx-auto flex items-center justify-center">
          {/* Main Desk Setup Visual */}
          <img
            src="/hero-bg.png"
            alt="Developer Workspace"
            className={`w-full h-auto block select-none transition-all duration-700 ${
              isLampOn
                ? "dark:brightness-[0.88] dark:contrast-[1.06] dark:saturate-[1.05] dark:sepia-[0.08] dark:opacity-100"
                : "dark:brightness-[0.03] dark:contrast-[1.8] dark:saturate-[0.1] dark:opacity-20"
            }`}
            draggable={false}
          />

          {/* Directional Lamp Light Beam */}
          {isLampOn && (
            <div className="absolute inset-0 w-full h-full pointer-events-none z-15 hidden dark:block overflow-hidden transition-opacity duration-700">
              <div
                className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 70% at 20% 36%, rgba(255, 245, 215, 0.35) 0%, rgba(254, 230, 165, 0.20) 30%, rgba(251, 191, 36, 0.06) 60%, transparent 80%), linear-gradient(108deg, rgba(255, 245, 215, 0.20) 0%, rgba(254, 230, 165, 0.12) 35%, rgba(245, 158, 11, 0.02) 65%, transparent 85%)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "12%",
                  top: "50%",
                  width: "58%",
                  height: "44%",
                  transform: "rotate(-6deg)",
                  background:
                    "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(255, 240, 200, 0.35) 0%, rgba(254, 220, 140, 0.18) 35%, rgba(245, 158, 11, 0.03) 70%, transparent 100%)",
                  mixBlendMode: "screen",
                  filter: "blur(12px)",
                }}
              />
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.65) 9%, rgba(0, 0, 0, 0.20) 18%, transparent 28%), linear-gradient(to bottom, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.20) 16%, transparent 32%)",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          )}

          {/* Lamp Toggle Trigger Button */}
          <button
            type="button"
            onClick={toggleLamp}
            title={isLampOn ? "Click lamp to turn light OFF" : "Click lamp to turn light ON"}
            className="absolute left-[5%] top-[8%] w-[22%] h-[52%] z-30 pointer-events-auto cursor-pointer focus:outline-none select-none bg-transparent"
          />

          {!isLampOn && (
            <div
              onClick={toggleLamp}
              className="absolute inset-0 w-full h-full z-25 pointer-events-auto cursor-pointer hidden dark:block select-none"
            />
          )}

          {/* ================= MONITOR SCREEN CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`absolute left-[33.0%] top-[22.5%] w-[36.5%] h-[34.5%] z-35 flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden rounded-2xl subpixel-antialiased select-text transition-all duration-700 ${
              isLampOn
                ? "pointer-events-auto bg-transparent opacity-100"
                : "pointer-events-none bg-transparent opacity-100 dark:opacity-0 dark:hidden"
            }`}
          >
            <div className="relative z-40 pointer-events-auto flex flex-col items-center text-center space-y-1.5 sm:space-y-2.5 md:space-y-3.5 py-1 max-w-[480px]">
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-[16px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-black tracking-tight leading-tight text-zinc-950"
              >
                Shashank{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Verma
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[8px] sm:text-[11px] md:text-[13.5px] lg:text-[15.5px] text-zinc-650 font-medium leading-relaxed max-w-[440px]"
              >
                BCA Student &amp; Developer passionate about Software Engineering &amp; Data Science.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-50 flex items-center justify-center gap-2 sm:gap-3 pt-1 pointer-events-auto"
              >
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-zinc-950 hover:bg-zinc-800 active:scale-95 text-white text-[8.5px] sm:text-[11px] md:text-[13px] font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer pointer-events-auto"
                >
                  <span>Explore About Me</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-white hover:bg-zinc-50 active:scale-95 text-zinc-900 border border-zinc-300 hover:border-zinc-400 text-[8.5px] sm:text-[11px] md:text-[13px] font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer pointer-events-auto"
                >
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-600" />
                  <span>Contact</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* ================= PHYSICALLY GROUNDED ANODIZED ALUMINUM DESK STAND ================= */}
          <div 
            className={`absolute left-[78.0%] sm:left-[79.5%] md:left-[80.5%] top-[63.0%] sm:top-[64.5%] md:top-[65.5%] z-18 pointer-events-none select-none flex flex-col items-center -translate-x-1/2 transition-all duration-300 ${
              isLampOn ? "opacity-100" : "dark:opacity-0 dark:invisible"
            }`}
          >
            {/* Soft desk contact drop shadow */}
            <div 
              className="w-44 sm:w-52 md:w-56 h-6 sm:h-7 rounded-full blur-[5px] pointer-events-none opacity-40 dark:opacity-75"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 60%, transparent 80%)",
                transform: "translateY(84px) translateX(6px)",
              }}
            />

            {/* Precision Vector Aluminum Stand */}
            <svg 
              width="170" 
              height="100" 
              viewBox="0 0 170 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm overflow-visible"
            >
              {/* Aluminum Base Plate (Perspective Oval on desk) */}
              <ellipse cx="85" cy="85" rx="66" ry="11" className="fill-slate-300 dark:fill-slate-700 stroke-white/60 dark:stroke-white/20" strokeWidth="1" />
              <ellipse cx="85" cy="83.5" rx="64" ry="9.5" className="fill-slate-200 dark:fill-slate-800" />
              <ellipse cx="85" cy="82.5" rx="58" ry="7.5" className="fill-slate-100 dark:fill-slate-600 opacity-90" />

              {/* Silicone desk pad ring on base */}
              <ellipse cx="85" cy="83.5" rx="26" ry="3.5" className="fill-slate-400/30 dark:fill-slate-900/70" />

              {/* Angled Cantilever Aluminum Support Stem */}
              <path 
                d="M74 83 L77 34 C77 28 93 28 93 34 L96 83 Z" 
                className="fill-slate-300 dark:fill-slate-700 stroke-white/40 dark:stroke-white/20"
                strokeWidth="0.8"
              />
              <path 
                d="M79 81 L81 35 C81 31 89 31 89 35 L91 81 Z" 
                className="fill-slate-200 dark:fill-slate-600 opacity-70"
              />

              {/* CNC Cable Routing Pass-Through Hole */}
              <ellipse cx="85" cy="56" rx="4.5" ry="9" className="fill-slate-800 dark:fill-slate-950 stroke-black/30 dark:stroke-white/10" strokeWidth="0.5" />
              <ellipse cx="85" cy="56" rx="3" ry="7" className="fill-black/40 dark:fill-black/80" />

              {/* Swivel Pivot Joint Hub */}
              <circle cx="85" cy="30" r="7.5" className="fill-slate-400 dark:fill-slate-600 stroke-white/30" strokeWidth="0.8" />
              <circle cx="85" cy="30" r="3.5" className="fill-slate-300 dark:fill-slate-500" />

              {/* Cradle Mounting Backplate */}
              <rect x="48" y="26" width="74" height="8" rx="3" className="fill-slate-400 dark:fill-slate-700 stroke-white/30" strokeWidth="0.8" />
              <rect x="52" y="27.5" width="66" height="5" rx="2" className="fill-slate-800/80 dark:fill-slate-900" />

              {/* Left Cradle Hook with Silicone Cushion */}
              <path d="M56 34 L56 24 C56 22 62 22 62 24 L62 34 Z" className="fill-slate-300 dark:fill-slate-600" />
              <rect x="57.5" y="23" width="3" height="3" rx="1" className="fill-emerald-500/80" />

              {/* Right Cradle Hook with Silicone Cushion */}
              <path d="M108 34 L108 24 C108 22 114 22 114 24 L114 34 Z" className="fill-slate-300 dark:fill-slate-600" />
              <rect x="109.5" y="23" width="3" height="3" rx="1" className="fill-emerald-500/80" />
            </svg>
          </div>

          {/* ================= UPRIGHT TABLET ON DESK ================= */}
          <div
            className={`absolute left-[78.0%] sm:left-[79.5%] md:left-[80.5%] top-[55.0%] sm:top-[56.0%] md:top-[57.0%] -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto transition-all duration-300 ${
              isLampOn ? "opacity-100" : "dark:opacity-0 dark:invisible"
            }`}
          >
            <div
              style={{
                width: "260px",
                height: "360px",
                borderRadius: "24px",
                boxShadow: "0 24px 60px -10px rgba(0,0,0,0.75), 0 10px 24px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.25)",
                background: "linear-gradient(145deg, #1e2029 0%, #13151d 50%, #0a0b10 100%)",
              }}
              className="relative overflow-hidden flex flex-col p-[5px] scale-[0.6] sm:scale-[0.8] md:scale-[0.95] lg:scale-100 origin-center pointer-events-auto select-none"
            >
              {/* Subtle aluminum chamfer side rail reflection */}
              <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1]"
                style={{
                  boxShadow:
                    "inset 0 0.5px 0 rgba(255,255,255,0.22), inset 0 -0.5px 0 rgba(0,0,0,0.5), inset 0.5px 0 0 rgba(255,255,255,0.1), inset -0.5px 0 0 rgba(255,255,255,0.1)",
                }}
              />

              {/* Front camera hole punch */}
              <div className="absolute top-[3px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40">
                <div className="w-[5px] h-[5px] rounded-full bg-[#0a0b0e] ring-[0.5px] ring-zinc-600/50 flex items-center justify-center">
                  <div className="w-[2px] h-[2px] rounded-full bg-[#0c4a6e] ring-[0.3px] ring-cyan-400/40" />
                </div>
              </div>

              {/* Active Display Surface */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden flex flex-col bg-[#ffffff] dark:bg-gradient-to-b dark:from-[#f7f2e7] dark:via-[#efe7d6] dark:to-[#e8decb] text-zinc-950 dark:text-[#1c1917] p-2 sm:p-2.5 gap-[4px] sm:gap-[5px] antialiased shadow-inner pointer-events-auto">
                {/* iOS Status Bar */}
                <div className="flex items-center justify-between px-0.5 shrink-0 select-none">
                  <span className="font-semibold text-zinc-950 dark:text-[#1c1917] text-[9px] sm:text-[10px] font-sans tracking-tight">
                    9:41
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-end gap-[1.5px] h-[9px]">
                      <div className="w-[2px] h-[3px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      <div className="w-[2px] h-[5px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      <div className="w-[2px] h-[7px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      <div className="w-[2px] h-[9px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                    </div>
                    <Wifi className="w-3 h-3 text-zinc-950 dark:text-[#1c1917]" strokeWidth={2.5} />
                    <div className="flex items-center">
                      <div className="w-[16px] h-[8px] rounded-[2.5px] border-[1.2px] border-zinc-700 dark:border-[#44403c] flex items-center p-[1px]">
                        <div className="w-[75%] h-full bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      </div>
                      <div className="w-[1.2px] h-[3.5px] bg-zinc-700 dark:bg-[#44403c] rounded-r-sm ml-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* APP VIEW 1: PROFILE & FOCUS */}
                {tabletTab === "profile" && (
                  <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 animate-in fade-in duration-200 pointer-events-auto">
                    {/* Profile Card */}
                    <div className="p-1.5 sm:p-2 rounded-[9px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 dark:bg-[#1c1917] text-white dark:text-[#fbf9f4] flex items-center justify-center font-bold text-[10px] sm:text-[11px] shrink-0 shadow-xs">
                        SV
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[9.5px] sm:text-[11px] font-semibold text-zinc-950 dark:text-[#1c1917] leading-none truncate">
                            Shashank Verma
                          </span>
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
                        </div>
                        <span className="text-[7px] sm:text-[8px] text-zinc-600 dark:text-[#57534e] block mt-[1px] truncate font-medium">
                          Software Developer • BCA
                        </span>
                      </div>
                    </div>

                    {/* iOS Grouped Interactive List */}
                    <div className="rounded-[9px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 divide-y divide-zinc-200/70 dark:divide-[#e8dfc6] shrink-0">
                      <button
                        type="button"
                        onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
                        className="w-full flex items-center gap-[5px] px-1.5 py-[4.5px] hover:bg-black/5 dark:hover:bg-black/5 transition-colors cursor-pointer text-left"
                      >
                        <GraduationCap className="w-[11px] h-[11px] text-zinc-600 dark:text-[#78716c] shrink-0" strokeWidth={2} />
                        <div className="min-w-0 flex-1">
                          <span className="text-[7.5px] sm:text-[8.5px] font-medium text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                            Swami Rama Himalayan Univ.
                          </span>
                          <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block">BCA • 2023–2026</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                        className="w-full flex items-center gap-[5px] px-1.5 py-[4.5px] hover:bg-black/5 dark:hover:bg-black/5 transition-colors cursor-pointer text-left"
                      >
                        <Code className="w-[11px] h-[11px] text-zinc-600 dark:text-[#78716c] shrink-0" strokeWidth={2} />
                        <div className="min-w-0 flex-1">
                          <span className="text-[7.5px] sm:text-[8.5px] font-medium text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                            Full-Stack &amp; Data Science
                          </span>
                          <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block">React · Next.js · Python</span>
                        </div>
                      </button>
                      <a
                        href="https://www.rateme.co.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-[5px] px-1.5 py-[4.5px] hover:bg-black/5 dark:hover:bg-black/5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-[11px] h-[11px] text-emerald-600 shrink-0" strokeWidth={2} />
                        <div className="min-w-0 flex-1">
                          <span className="text-[7.5px] sm:text-[8.5px] font-medium text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                            Rateme — Live Review Platform
                          </span>
                          <span className="text-[6.5px] sm:text-[7px] text-emerald-700 font-semibold block">rateme.co.in ↗</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}

                {/* APP VIEW 2: ALL FEATURED PROJECTS */}
                {tabletTab === "projects" && (
                  <div className="flex flex-col gap-1.5 flex-1 animate-in fade-in duration-200 overflow-y-auto pointer-events-auto pr-0.5 max-h-[220px] scrollbar-thin">
                    <div className="flex items-center justify-between px-0.5 shrink-0">
                      <span className="text-[7.5px] font-bold text-zinc-500 dark:text-[#78716c] uppercase tracking-wider">All Projects (6)</span>
                      <button
                        type="button"
                        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                        className="text-[6.5px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        View Grid ↓
                      </button>
                    </div>

                    {/* 1. Rateme */}
                    <div className="p-1.5 rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center justify-between gap-1 shrink-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[8.5px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                          Rateme SaaS Platform
                        </span>
                        <span className="text-[6px] sm:text-[6.5px] text-zinc-500 dark:text-[#78716c] block truncate">
                          Next.js · TypeScript · REST
                        </span>
                      </div>
                      <a 
                        href="https://www.rateme.co.in/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[6.5px] px-1.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shrink-0 cursor-pointer"
                      >
                        Open ↗
                      </a>
                    </div>

                    {/* 2. Aura Social */}
                    <div className="p-1.5 rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center justify-between gap-1 shrink-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[8.5px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                          Aura Social 3D
                        </span>
                        <span className="text-[6px] sm:text-[6.5px] text-zinc-500 dark:text-[#78716c] block truncate">
                          Next.js 15 · GSAP · React 19
                        </span>
                      </div>
                      <a 
                        href="https://aura-social.rockverma9917.workers.dev/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[6.5px] px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shrink-0 cursor-pointer"
                      >
                        Live ↗
                      </a>
                    </div>

                    {/* 3. Assignix */}
                    <div className="p-1.5 rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center justify-between gap-1 shrink-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[8.5px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                          Assignix Portal
                        </span>
                        <span className="text-[6px] sm:text-[6.5px] text-zinc-500 dark:text-[#78716c] block truncate">
                          HTML5 · CSS3 · JavaScript
                        </span>
                      </div>
                      <a 
                        href="https://assignix-client.vercel.app/login" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[6.5px] px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shrink-0 cursor-pointer"
                      >
                        Open ↗
                      </a>
                    </div>

                    {/* 4. Civic Resolve */}
                    <div className="p-1.5 rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center justify-between gap-1 shrink-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[8.5px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                          Civic Resolve
                        </span>
                        <span className="text-[6px] sm:text-[6.5px] text-zinc-500 dark:text-[#78716c] block truncate">
                          Python · SQL · Maps · Web
                        </span>
                      </div>
                      <a 
                        href="https://civicresolve.freedev.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[6.5px] px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shrink-0 cursor-pointer"
                      >
                        Live ↗
                      </a>
                    </div>

                    {/* 5. Artndus */}
                    <div className="p-1.5 rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center justify-between gap-1 shrink-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[8.5px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                          Artndus Online Store
                        </span>
                        <span className="text-[6px] sm:text-[6.5px] text-zinc-500 dark:text-[#78716c] block truncate">
                          Vite · SEO · Brand Store
                        </span>
                      </div>
                      <a 
                        href="https://artndus.in/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[6.5px] px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shrink-0 cursor-pointer"
                      >
                        Store ↗
                      </a>
                    </div>

                    {/* 6. Attendance Tracker */}
                    <div className="p-1.5 rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center justify-between gap-1 shrink-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[8.5px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                          Attendance Tracker App
                        </span>
                        <span className="text-[6px] sm:text-[6.5px] text-zinc-500 dark:text-[#78716c] block truncate">
                          Java · Android · Reports
                        </span>
                      </div>
                      <a 
                        href="https://github.com/Shashankverma-dev/attendance-tracker" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[6.5px] px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-semibold shrink-0 cursor-pointer"
                      >
                        Code ↗
                      </a>
                    </div>
                  </div>
                )}

                {/* INTERACTIVE IPADOS DOCK */}
                <div className="flex items-center justify-center gap-3 px-4 py-1 rounded-[10px] bg-zinc-900/10 dark:bg-black/10 border border-zinc-200/60 dark:border-black/10 mt-auto shrink-0 z-50 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTabletTab("profile");
                    }}
                    title="Profile & Bio"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer pointer-events-auto ${
                      tabletTab === "profile" 
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-semibold" 
                        : "text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 hover:bg-black/5"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[7.5px] font-medium">Profile</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTabletTab("projects");
                    }}
                    title="Featured Projects"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer pointer-events-auto ${
                      tabletTab === "projects" 
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-semibold" 
                        : "text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 hover:bg-black/5"
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="text-[7.5px] font-medium">Projects</span>
                  </button>
                </div>

                {/* Home Indicator Bar */}
                <div 
                  onClick={() => setTabletTab("profile")}
                  title="Return to Profile Home"
                  className="flex flex-col items-center pt-0.5 shrink-0 cursor-pointer pointer-events-auto py-1"
                >
                  <div className="w-9 h-[3px] rounded-full bg-zinc-300 dark:bg-[#b8ac96] hover:bg-zinc-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-mono transition-all duration-300 hover:scale-105 shadow-xs cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
      </a>
    </section>
  );
}
