"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, Sparkles, User, Zap, Cpu, Heart, Code2 } from "lucide-react";
import { BentoCard } from "../ui/bento-card";

interface HeroDiaryTransitionProps {
  isLoaded?: boolean;
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function HeroDiaryTransition({ isLoaded = true }: HeroDiaryTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the transition section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out scroll progress with high-precision physics spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // ================= 1. HERO TEXT & BACKGROUND TRANSFORMS =================
  const heroOpacity = useTransform(smoothProgress, [0, 0.06, 0.18, 0.3], [1, 0.95, 0.15, 0]);
  const heroX = useTransform(smoothProgress, [0, 0.25], ["0%", "-10%"]);
  const heroScale = useTransform(smoothProgress, [0, 0.28], [1, 0.94]);

  const bgZoom = useTransform(smoothProgress, [0, 0.35, 0.7], [1, 1.08, 1.3]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.15, 0.42, 0.6], [1, 0.95, 0.2, 0]);

  // ================= 2. 3D BOOK SPINE & CAMERA PUSH-IN =================
  // At 0% scroll: The book sits anchored flat on the desk in front of the laptop.
  // As scroll proceeds: Camera pushes into the book while the spine anchors the physical opening.
  const bookX = useTransform(smoothProgress, [0, 0.15, 0.5], ["15vw", "11vw", "0vw"]);
  const bookY = useTransform(smoothProgress, [0, 0.15, 0.5], ["19vh", "13vh", "0vh"]);
  const bookScale = useTransform(smoothProgress, [0, 0.15, 0.5, 0.7, 0.88], [0.55, 0.72, 1.35, 1.6, 5.2]);
  
  // 3D Perspective Rotations: Begins flat on the desk plane, rotating to face camera as the pages open
  const bookRotateX = useTransform(smoothProgress, [0, 0.45, 0.72], [42, 12, 0]);
  const bookRotateY = useTransform(smoothProgress, [0, 0.45, 0.72], [-14, 0, 0]);
  const bookRotateZ = useTransform(smoothProgress, [0, 0.45, 0.72], [-12, 0, 0]);

  // Realistic contact & dynamic drop shadows
  const shadowY = useTransform(smoothProgress, [0, 0.45], [12, 42]);
  const shadowOpacity = useTransform(smoothProgress, [0, 0.45, 0.75, 0.88], [0.55, 0.7, 0.3, 0]);
  const shadowScale = useTransform(smoothProgress, [0, 0.45], [0.85, 1.3]);

  // ================= 3. PHYSICAL 3D HARDCOVER & MULTI-PAGE OPENING PHYSICS =================
  // Hardcover rotates 180° around the left spine hinge with natural inertia: 0° -> 30° -> 60° -> 90° -> 150° -> 180°
  const coverRotateY = useTransform(smoothProgress, [0.08, 0.54], [0, -180]);
  const coverCastShadow = useTransform(smoothProgress, [0.08, 0.28, 0.54], [0, 0.65, 0]);

  // Page 1 (Top Paper Sheet - bends and follows with slight curl)
  const page1RotateY = useTransform(smoothProgress, [0.14, 0.58], [0, -172]);
  const page1Shadow = useTransform(smoothProgress, [0.14, 0.35, 0.58], [0, 0.4, 0]);

  // Page 2 (Middle Paper Sheet - follows with natural paper drag)
  const page2RotateY = useTransform(smoothProgress, [0.2, 0.62], [0, -164]);
  const page2Shadow = useTransform(smoothProgress, [0.2, 0.4, 0.62], [0, 0.35, 0]);

  // Inner Book Ambient Illumination & Text Visibility
  const bookInnerGlow = useTransform(smoothProgress, [0.38, 0.58, 0.76], [0, 1, 0]);
  const pageContentOpacity = useTransform(smoothProgress, [0.36, 0.52, 0.74], [0, 1, 0.4]);

  // ================= 4. SECTION 2 (ABOUT ME) SEAMLESS EXPANSION =================
  const section2Opacity = useTransform(smoothProgress, [0.72, 0.85, 0.98], [0, 0.92, 1]);
  const section2Scale = useTransform(smoothProgress, [0.72, 0.88, 1], [0.94, 0.98, 1]);
  const section2PointerEvents = useTransform(smoothProgress, (v) => (v > 0.76 ? "auto" : "none"));

  const stats = [
    { label: "BCA Semester", value: "Active", sub: "SRH University" },
    { label: "Core Languages", value: "3+", sub: "C, Python, Java" },
    { label: "Academic Projects", value: "3+", sub: "Developed so far" },
    { label: "Office Tech", value: "Expert", sub: "Word, Excel, PPT" },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      {/* Sticky Fullscreen Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#fafafc] dark:bg-[#090a0f]">
        
        {/* ================= 3D WORKSPACE BACKGROUND LAYER ================= */}
        <motion.div 
          style={{ scale: bgZoom, opacity: bgOpacity }}
          className="absolute inset-0 z-0 overflow-hidden select-none flex items-center justify-end pointer-events-none"
        >
          <div className="relative w-full h-full lg:w-[68%] xl:w-[64%] 2xl:w-[60%]">
            <img
              src="/hero-bg.png"
              alt="Cinematic 3D Developer Workspace"
              className="w-full h-full object-cover object-right opacity-100 dark:opacity-40 transition-opacity duration-500"
              draggable={false}
            />
            {/* Soft gradient edge fade into the left column */}
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#fafafc] dark:from-[#090a0f] to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafafc] dark:from-[#090a0f] to-transparent" />
          </div>
        </motion.div>

        {/* Ambient studio glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ================= 1. HERO CONTENT (VISIBLE INITIALLY, FADES ON SCROLL) ================= */}
        <motion.div
          style={{ opacity: heroOpacity, x: heroX, scale: heroScale }}
          className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pointer-events-auto"
        >
          <div className="max-w-xl lg:max-w-[520px]">
            {/* Main Headline with Electric Blue / Violet Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold tracking-tight leading-[1.12] mb-6 text-zinc-900 dark:text-white"
            >
              I don&apos;t just
              <br />
              write{" "}
              <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent font-black">
                code.
              </span>
              <br />
              I build{" "}
              <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent font-black">
                solutions.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed font-sans max-w-md"
            >
              Turning ideas into powerful digital experiences.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5 mb-14"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] active:scale-[0.98] text-white text-sm font-semibold transition-all group shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-semibold transition-all shadow-sm group"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Social Follow Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400"
            >
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 font-sans">
                Follow me
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/Shashankverma-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-indigo-500/40 transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shashank-verma-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-indigo-500/40 transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-[#6366f1] dark:hover:text-[#818cf8] hover:border-indigo-500/40 transition-all shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= 2. PHYSICALLY ACCURATE 3D DIARY OPENING ================= */}
        <motion.div
          style={{
            x: bookX,
            y: bookY,
            scale: bookScale,
            rotateX: bookRotateX,
            rotateY: bookRotateY,
            rotateZ: bookRotateZ,
            perspective: 1800,
          }}
          className="absolute z-20 pointer-events-none select-none flex items-center justify-center"
        >
          {/* Dynamic Moving Drop Shadow */}
          <motion.div
            style={{
              y: shadowY,
              opacity: shadowOpacity,
              scale: shadowScale,
            }}
            className="absolute w-[300px] sm:w-[340px] h-[32px] bg-black/60 dark:bg-black/85 rounded-full blur-md pointer-events-none transition-all"
          />

          {/* 3D Physical Book Construction */}
          <div className="relative w-[300px] sm:w-[340px] h-[240px] sm:h-[260px] flex items-center justify-center [transform-style:preserve-3d]">
            
            {/* Back Base / Right Page Stack (Remains stationary on the right desk plane) */}
            <div className="absolute right-0 w-1/2 h-full bg-[#f8f8f6] dark:bg-[#15161c] rounded-r-2xl border-r-2 border-y-2 border-zinc-300 dark:border-zinc-800 shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between [transform-origin:left_center] z-10">
              <motion.div style={{ opacity: pageContentOpacity }}>
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1.5 mb-2">
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-emerald-500 font-bold">
                    Profile Specs
                  </span>
                  <span className="text-[8.5px] font-mono text-zinc-400">pg. 02</span>
                </div>
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-1 text-[9px] text-zinc-800 dark:text-zinc-200 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>BCA &amp; Full-Stack Explorer</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-zinc-700 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>React, Node, Python, SQL</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 font-mono font-medium">
                    EXPERIENCE
                  </span>
                  <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 font-mono font-medium">
                    SKILLS
                  </span>
                </div>
              </motion.div>

              <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
                <p className="text-[7.5px] text-zinc-600 dark:text-zinc-400 leading-tight">
                  Scroll further to reveal full profile &amp; technical matrix &rarr;
                </p>
              </div>
            </div>

            {/* Left Baseboard (Catches the opened cover on the left) */}
            <div className="absolute left-0 w-1/2 h-full bg-[#fcfcfb] dark:bg-[#121318] rounded-l-2xl border-l-2 border-y-2 border-zinc-300 dark:border-zinc-800 shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between [transform-origin:right_center] z-10">
              <motion.div style={{ opacity: pageContentOpacity }}>
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-1.5 mb-2.5">
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#6366f1] font-bold">
                    {"// CHAPTER 01"}
                  </span>
                  <span className="text-[8.5px] font-mono text-zinc-400">pg. 01</span>
                </div>
                <h4 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-tight mb-1.5">
                  The Journey of a Builder
                </h4>
                <p className="text-[9px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-sans mb-2">
                  &ldquo;Turning concepts into resilient digital products.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-[#6366f1] font-mono font-medium">
                    ABOUT ME
                  </span>
                  <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-[#8b5cf6] font-mono font-medium">
                    MY JOURNEY
                  </span>
                </div>
              </motion.div>

              <div className="pt-1.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[7.5px] font-mono text-zinc-400">
                <span>SRH University</span>
                <span>Dehradun, IN</span>
              </div>
            </div>

            {/* Flexible Paper Page Layer 2 (Middle turning sheet) */}
            <motion.div
              style={{
                rotateY: page2RotateY,
                transformOrigin: "left center",
              }}
              className="absolute right-0 w-1/2 h-full bg-[#f9f9f7] dark:bg-[#14151b] rounded-r-2xl border-r border-y border-zinc-300 dark:border-zinc-700 shadow-md p-4 [backface-visibility:hidden] z-20 [transform-style:preserve-3d]"
            >
              <motion.div style={{ opacity: page2Shadow }} className="absolute inset-0 bg-black/15 pointer-events-none" />
              <div className="w-full h-full border border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-lg p-2 flex flex-col justify-center items-center">
                <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-widest">Page Turn</span>
              </div>
            </motion.div>

            {/* Flexible Paper Page Layer 1 (Top turning sheet following cover) */}
            <motion.div
              style={{
                rotateY: page1RotateY,
                transformOrigin: "left center",
              }}
              className="absolute right-0 w-1/2 h-full bg-[#fafaf8] dark:bg-[#16171e] rounded-r-2xl border-r border-y border-zinc-300 dark:border-zinc-700 shadow-lg p-4 [backface-visibility:hidden] z-25 [transform-style:preserve-3d]"
            >
              <motion.div style={{ opacity: page1Shadow }} className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="w-full h-full border border-zinc-200 dark:border-zinc-800/80 rounded-lg p-3 flex flex-col justify-between">
                <span className="text-[7.5px] font-mono text-[#6366f1] font-bold">{"// INDEX"}</span>
                <p className="text-[8px] font-sans text-zinc-600 dark:text-zinc-400">Building scalable software with clean code architecture.</p>
              </div>
            </motion.div>

            {/* FIXED CENTER SPINE (Remains physically anchored to the book base on the desk) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-gradient-to-r from-[#d1d5db] via-[#f3f4f6] to-[#d1d5db] dark:from-[#27272a] dark:via-[#3f3f46] dark:to-[#27272a] rounded-sm z-40 shadow-2xl border-y border-zinc-400/40 flex flex-col items-center justify-between py-2">
              <div className="w-3.5 h-[1.5px] bg-zinc-400/50" />
              <div className="w-3.5 h-[1.5px] bg-zinc-400/50" />
              {/* Purple Silk Bookmark Ribbon */}
              <div className="w-2.5 h-9 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-b-sm shadow-md translate-y-3" />
              <div className="w-3.5 h-[1.5px] bg-zinc-400/50" />
            </div>

            {/* Ambient Inner Book Illumination when opening */}
            <motion.div
              style={{ opacity: bookInnerGlow }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/35 via-amber-400/25 to-indigo-500/35 rounded-3xl blur-2xl z-15 pointer-events-none"
            />

            {/* Layered Paper Edges (Visible thickness on right side & bottom) */}
            <div className="absolute -right-3 inset-y-1 w-3 bg-gradient-to-r from-[#e5e7eb] via-[#f3f4f6] to-[#d1d5db] dark:from-[#18181b] dark:via-[#27272a] dark:to-[#18181b] rounded-r-sm shadow-md border-r border-zinc-300 dark:border-zinc-700 flex flex-col justify-around py-2 z-5">
              <div className="w-full h-[1px] bg-zinc-300/60 dark:bg-zinc-700/60" />
              <div className="w-full h-[1px] bg-zinc-300/60 dark:bg-zinc-700/60" />
              <div className="w-full h-[1px] bg-zinc-300/60 dark:bg-zinc-700/60" />
            </div>
            <div className="absolute -bottom-2 inset-x-2 h-2.5 bg-gradient-to-b from-[#e5e7eb] via-[#f3f4f6] to-[#d1d5db] dark:from-[#18181b] dark:via-[#27272a] dark:to-[#18181b] rounded-b-sm shadow-md border-b border-zinc-300 dark:border-zinc-700 z-5" />

            {/* HARDCOVER FRONT COVER (Opens 0° -> 180° around the fixed left spine hinge) */}
            <motion.div
              style={{
                rotateY: coverRotateY,
                transformOrigin: "left center",
              }}
              className="absolute right-0 w-1/2 h-full rounded-r-2xl bg-gradient-to-br from-[#ffffff] via-[#f7f7fa] to-[#e8e8ee] dark:from-[#1b1c24] dark:via-[#14151b] dark:to-[#0c0d12] border-r-2 border-y-2 border-zinc-300 dark:border-zinc-700 shadow-2xl p-4 sm:p-5 flex flex-col items-center justify-center [backface-visibility:hidden] z-50 [transform-style:preserve-3d]"
            >
              {/* Dynamic Cover Cast Shadow onto pages */}
              <motion.div style={{ opacity: coverCastShadow }} className="absolute inset-0 bg-black/25 pointer-events-none rounded-r-2xl" />

              {/* Embossed Metallic Luxury Cover Details */}
              <div className="w-full h-full rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 p-3 flex flex-col items-center justify-between text-center relative overflow-hidden bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xs">
                <div className="w-full flex justify-between items-center text-[7px] font-mono text-zinc-400 uppercase tracking-widest">
                  <span>Vol. 01</span>
                  <span>2026</span>
                </div>

                <div className="my-auto">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-1.5 shadow-inner">
                    <BookOpen className="w-3.5 h-3.5 text-[#6366f1]" />
                  </div>
                  <h3 className="font-display font-black text-sm sm:text-base tracking-[0.25em] text-zinc-900 dark:text-white uppercase">
                    JOURNEY
                  </h3>
                  <div className="w-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent mx-auto mt-1" />
                </div>

                <span className="text-[6.5px] font-mono tracking-wider text-zinc-500 uppercase">
                  Shashank Verma
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= 3. SECTION 2: ABOUT MYSELF (EXPANDS FULLSCREEN FROM OPEN PAGES) ================= */}
        <motion.div
          id="about"
          style={{
            opacity: section2Opacity,
            scale: section2Scale,
            pointerEvents: section2PointerEvents as any,
          }}
          className="absolute inset-0 z-30 overflow-y-auto pt-24 pb-16 px-6 sm:px-8 lg:px-12 flex items-center justify-center bg-[#fafafc] dark:bg-[#090a0f]"
        >
          <div className="max-w-7xl w-full mx-auto">
            <div className="text-center md:text-left mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[#6366f1] dark:text-[#818cf8] text-xs font-mono font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>// 01. Profile &amp; Journey</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                About Myself
              </h2>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Biography Card */}
              <BentoCard className="md:col-span-2 flex flex-col justify-between" hoverGlow="violet" enableSmoke>
                <div>
                  <div className="flex items-center space-x-3 mb-5">
                    <User className="w-5 h-5 text-[#6366f1]" />
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Biography</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                    Committed to problem-solving, software engineering, and innovative applications.
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3 font-sans">
                    I am a hardworking BCA student at Swami Rama Himalayan University with a motivated attitude and a passion for engineering impactful digital tools. Adept at core programming, database management, and building clean web apps.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    I focus on learning modern frameworks, structuring scalable databases, and crafting fast, accessible digital experiences that solve practical problems.
                  </p>
                </div>
                <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-3 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Dehradun, India</span>
                  <span className="text-emerald-500">● Open for internships</span>
                </div>
              </BentoCard>

              {/* System Metrics Grid */}
              <BentoCard className="flex flex-col justify-between" hoverGlow="cyan" enableSmoke>
                <div>
                  <div className="flex items-center space-x-3 mb-5">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">System Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((st, idx) => (
                      <div key={idx} className="border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 p-3 rounded-xl shadow-sm">
                        <p className="text-xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
                          {st.value}
                        </p>
                        <p className="text-[10px] uppercase font-mono text-zinc-500 mt-0.5">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed font-mono">
                  *Curriculum milestones and real-world project builds.
                </p>
              </BentoCard>

              {/* Core Paradigms */}
              <BentoCard className="flex flex-col justify-between" hoverGlow="cyan" enableSmoke>
                <div>
                  <div className="flex items-center space-x-3 mb-5">
                    <Cpu className="w-5 h-5 text-cyan-500" />
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Architecture</span>
                  </div>
                  <h4 className="font-display text-base font-bold mb-3 text-zinc-900 dark:text-white">Core Paradigms</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span>Languages (C, Python, Java)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span>Database Management &amp; SQL</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span>Modern Web (React, Next.js, Node)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-5 flex items-center space-x-2 text-xs font-mono text-zinc-500">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  <span>BCA Roadmapped</span>
                </div>
              </BentoCard>

              {/* Code Philosophy */}
              <BentoCard className="md:col-span-2 flex flex-col justify-between" hoverGlow="violet" enableSmoke>
                <div>
                  <div className="flex items-center space-x-3 mb-5">
                    <Heart className="w-5 h-5 text-rose-500" />
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Code Philosophy</span>
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-bold mb-2.5 text-zinc-900 dark:text-white">
                    &ldquo;Problem solving is the foundation; technology is the amplifier.&rdquo;
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    I believe in writing clean, modular code that solves real problems—whether it&apos;s automated attendance tracking, civic issue reporting, or community feedback platforms.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono shadow-sm">
                    Full-Stack
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono shadow-sm">
                    Relational DB
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono shadow-sm">
                    Problem Solving
                  </span>
                </div>
              </BentoCard>
            </div>
          </div>
        </motion.div>

        {/* Scroll Down Mouse Cue - Bottom Right */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="hidden md:flex absolute right-8 bottom-6 z-20 items-center gap-2 text-zinc-500 dark:text-zinc-400 select-none pointer-events-none"
        >
          <div className="w-5 h-7 rounded-full border border-zinc-400 dark:border-zinc-600 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-300"
            />
          </div>
          <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
            Scroll Down
          </span>
        </motion.div>

      </div>
    </div>
  );
}
