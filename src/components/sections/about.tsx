"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  ArrowUpRight
} from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-16 lg:py-24 bg-[#ffffff] dark:bg-[#07080c] text-zinc-950 dark:text-[#f3f4f6] selection:bg-purple-500/20 selection:text-purple-600 transition-colors duration-500 overflow-hidden font-sans border-t border-zinc-200/90 dark:border-zinc-800/90"
    >
      {/* Maximum Editorial Spread Canvas */}
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* ================= ASYMMETRIC MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative pt-2">
          
          {/* ================= LEFT COLUMN: TYPOGRAPHY & BIOGRAPHY ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col relative z-20">
            
            {/* Left Margin "CREATIVE DEVELOPER" Indicator */}
            <div className="hidden xl:flex items-center gap-3 absolute -left-12 top-28 origin-top-left -rotate-90 text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 select-none">
              <span className="w-6 h-[1px] bg-zinc-400 dark:bg-zinc-600" />
              <span>CREATIVE DEVELOPER</span>
            </div>

            {/* Section Index Marker */}
            <div className="flex items-center gap-2 mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
              <span>01 / ABOUT ME</span>
            </div>

            {/* Top Row: GIANT HEADLINE + ROTATING EMBLEM */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="select-none">
                <h2 className="text-[52px] xs:text-[64px] sm:text-[84px] md:text-[112px] xl:text-[140px] font-black leading-[0.82] tracking-[-0.045em] uppercase text-zinc-950 dark:text-white">
                  ABOUT
                  <br />
                  ME<span className="text-zinc-950 dark:text-white">.</span>
                </h2>
              </div>

              {/* Rotating Circular Emblem */}
              <div className="relative group shrink-0 pt-1 pr-1">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 cursor-pointer"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-zinc-900 dark:text-zinc-200">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold">
                      <textPath href="#circlePath" startOffset="0%">
                        • DESIGN • CODE • INTERACT • DEPLOY
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950 dark:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* PRIMARY BIOGRAPHY SECTION */}
            <div className="mb-6">
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-2.5">
                <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Biography
                </span>
              </div>

              {/* Leading Headline */}
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100 leading-snug mb-2.5">
                Committed to problem-solving, software development, and data science.
              </h3>

              {/* Bio Paragraphs */}
              <div className="space-y-2.5 text-zinc-600 dark:text-zinc-400 text-[13px] sm:text-[13.5px] leading-relaxed">
                <p>
                  I am a hardworking BCA student at Swami Rama Himalayan University with a motivated attitude and a variety of powerful skills. Adept at problem solving, programming basics, data analysis, and office technology programs.
                </p>
                <p>
                  Committed to learning and contributing expertise in a dynamic environment of software development, data science, and web technologies. I enjoy taking on coding challenges, building modular apps, and structuring databases.
                </p>
              </div>

              {/* Meta Location */}
              <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                  BASED IN DEHRADUN, INDIA
                </span>
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: SLICED EDITORIAL PORTRAIT ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center lg:items-end w-full">
            {/* MAIN SEAMLESS PORTRAIT CONTAINER */}
            <div className="relative w-full max-w-[560px] xl:max-w-[640px] flex items-center justify-center">
              {/* High-Resolution Seamless Portrait Artwork */}
              <div className="relative w-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/aboutmg.png"
                  alt="Shashank Verma — Creative Developer"
                  className="w-full h-auto max-h-[720px] object-contain object-center select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
