"use client";

import React from "react";
import { motion } from "framer-motion";
import { TerminalConsole } from "../ui/terminal-console";
import { Mail, ArrowUpRight } from "lucide-react";

interface HeroProps {
  isLoaded?: boolean;
}

export function Hero({ isLoaded = true }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Grid Canvas Overlay */}
      <div className="absolute inset-0 -z-10 terminal-grid-light dark:terminal-grid-dark opacity-100" />

      {/* Ambient Side Text Motif on Left with Handwriting SVG loop animation */}
      <div className="hidden lg:block absolute left-4 xl:left-12 top-[38%] -translate-y-1/2 w-[380px] h-[190px] xl:w-[420px] xl:h-[210px] select-none pointer-events-none z-0">
        {/* Handwriting Loop SVG */}
        <div className="absolute inset-0 opacity-25 dark:opacity-35 text-emerald-500 dark:text-cyan-400">
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 600"
            className="w-full h-full"
          >
            <motion.path
              d="M 950 90 
                 C 1250 300, 1050 480, 600 520
                 C 250 520, 150 480, 150 300
                 C 150 120, 350 80, 600 80
                 C 850 80, 950 180, 950 180"
              fill="none"
              strokeWidth="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isLoaded ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
                opacity: { duration: 0.5 }
              }}
            />
          </motion.svg>
        </div>
        {/* Content text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-display text-[1.8rem] xl:text-[2.2rem] font-extrabold leading-[1.1] tracking-tight bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-600 bg-clip-text text-transparent uppercase text-center"
          >
            code.<br />
            practice.<br />
            succeed.
          </motion.div>
        </div>
      </div>

      {/* Floating accent background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-500/5 dark:bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Internships & Collaboration</span>
        </motion.div>

        {/* Catchy Monospace Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-zinc-500 dark:text-zinc-400 text-xs tracking-wider uppercase mb-3"
        >
          &lt;developer_profile&gt;
        </motion.p>

        {/* Title / Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent"
        >
          Shashank Verma
        </motion.h1>

        {/* Subtitle / Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed font-sans"
        >
          Hardworking BCA student at{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">Swami Rama Himalayan University</span>{" "}
          focused on Software Development, Data Science, and Web Technologies. Creator of{" "}
          <span className="font-mono text-emerald-500 dark:text-cyan-400 font-semibold">Assignix</span>
          —an assignment management platform.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-sm font-medium transition-all group shadow-lg"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="mailto:shashankvermahsst@gmail.com"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 text-sm font-medium transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </a>
        </motion.div>

        {/* Interactive Shell / Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full flex justify-center px-4"
        >
          <TerminalConsole />
        </motion.div>
      </div>
    </section>
  );
}
