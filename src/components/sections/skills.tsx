"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Layout, 
  Database, 
  FileText, 
  Camera, 
  Terminal,
  ArrowUpRight
} from "lucide-react";

export function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      id: "programming",
      index: "01",
      title: "PROGRAMMING",
      icon: <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      accentColor: "#10b981",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-500/30",
      skills: [
        { name: "C Language", level: "Familiar" },
        { name: "Python", level: "Familiar" },
        { name: "Java", level: "Familiar" },
      ],
    },
    {
      id: "web",
      index: "02",
      title: "WEB DEVELOPMENT",
      icon: <Layout className="w-4 h-4 text-sky-600 dark:text-cyan-400" />,
      accentColor: "#0ea5e9",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-cyan-950/60 dark:text-cyan-400 dark:border-cyan-500/30",
      skills: [
        { name: "HTML5", level: "Familiar" },
        { name: "CSS3", level: "Familiar" },
        { name: "JavaScript", level: "Familiar" },
      ],
    },
    {
      id: "database",
      index: "03",
      title: "DATABASE",
      icon: <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      accentColor: "#a855f7",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-500/30",
      skills: [
        { name: "SQL Basics", level: "Familiar" },
        { name: "Relational DBs", level: "Familiar" },
      ],
    },
    {
      id: "office",
      index: "04",
      title: "OFFICE TOOLS",
      icon: <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      accentColor: "#f59e0b",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-500/30",
      skills: [
        { name: "MS Word / PPT", level: "Intermediate" },
        { name: "MS Excel", level: "Intermediate" },
      ],
    },
    {
      id: "digital",
      index: "05",
      title: "DIGITAL & MEDIA",
      icon: <Camera className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
      accentColor: "#ec4899",
      badgeColor: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/60 dark:text-pink-400 dark:border-pink-500/30",
      skills: [
        { name: "Social Media Platforms", level: "Familiar" },
        { name: "Canva (Basic)", level: "Familiar" },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      className="w-full min-h-screen relative bg-[#ffffff] dark:bg-[#090b10] text-zinc-950 dark:text-[#f3f4f6] transition-colors duration-500 font-sans border-t border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden flex flex-col justify-center"
    >
      {/* Top Right Terminal Prompt Badge */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/80 text-emerald-600 dark:text-emerald-400 text-xs font-mono select-none shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
        <span>&gt;_</span>
      </div>

      {/* Edge-to-Edge Full Screen Split Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-screen">
        
        {/* ================= LEFT HALF: EDITORIAL TECHNICAL MATRIX ================= */}
        <div className="lg:col-span-7 xl:col-span-7 px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-16 flex flex-col justify-between relative z-20">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                {"// 02. TECHNICAL CAPABILITIES"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-zinc-950 dark:text-white tracking-tight leading-tight mb-2">
              Skills Inventory
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              A curated set of tools, technologies, and skills I use to build, solve, and create.
            </p>
          </div>

          {/* ================= EDITORIAL DIVIDER ROWS (NO BOX CARDS) ================= */}
          <div className="divide-y divide-zinc-200/90 dark:divide-zinc-800/90 border-y border-zinc-200/90 dark:border-zinc-800/90 my-auto">
            {skillCategories.map((cat) => {
              const isHovered = hoveredCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="py-4.5 sm:py-5 group relative transition-colors duration-300 px-2 sm:px-3 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 rounded-lg"
                >
                  {/* Left Active Accent Indicator Bar */}
                  <div 
                    className={`absolute left-0 top-2 bottom-2 w-1 rounded-full transition-all duration-300 ${
                      isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                    }`}
                    style={{ backgroundColor: cat.accentColor }}
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
                    
                    {/* Category Title & Index */}
                    <div className="flex items-center gap-3 min-w-[200px] shrink-0">
                      <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 font-semibold">
                        {cat.index}
                      </span>
                      <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800/70 shrink-0">
                        {cat.icon}
                      </div>
                      <span className="font-mono text-xs font-extrabold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {cat.title}
                      </span>
                    </div>

                    {/* Skill Tags & Levels (Clean Horizontal Flow) */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 justify-start md:justify-end">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-2xs"
                        >
                          <span className="text-[12px] sm:text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-200">
                            {skill.name}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-medium border ${cat.badgeColor}`}>
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimal Editorial Footer Note */}
          <div className="mt-8 pt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Continuously learning & adopting new modern stacks.
            </span>
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">
              Shashank Verma // Portfolio 2026
            </span>
          </div>

        </div>


        {/* ================= RIGHT HALF: FULL-BLEED 3D TECH RUBIK'S CUBE ================= */}
        <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center overflow-hidden min-h-[460px] lg:min-h-full">
          
          <div className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/skills/tech-cube-single-face.png"
              alt="3D Illuminated Tech Rubik's Cube"
              className="w-full h-full object-cover object-center select-none"
            />
            
            {/* Seamless Horizontal Vignette into Left Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#090b10] via-white/30 dark:via-[#090b10]/40 to-transparent pointer-events-none lg:w-1/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#090b10] via-transparent to-transparent pointer-events-none h-1/4 bottom-0 top-auto lg:hidden" />
          </div>

        </div>

      </div>
    </section>
  );
}
