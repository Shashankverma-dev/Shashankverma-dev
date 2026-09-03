"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  ShoppingCart,
  Star,
  MapPin,
  FileText,
  Smartphone,
} from "lucide-react";
import { ExpandingCards, type CardItem } from "../ui/expanding-cards";

/* ─────────── project data for expanding cards ─────────── */
const ALL_PROJECTS: CardItem[] = [
  {
    id: "aura-social",
    title: "Aura Social",
    description:
      "A high-performance creative agency showcase built with Next.js 15, React 19, GSAP, and Tailwind CSS featuring 3D scroll-driven transitions.",
    imgSrc: "/projects/aura-social.png",
    icon: <Globe size={20} />,
    linkHref: "https://aura-social.rockverma9917.workers.dev/",
  },
  {
    id: "shopease",
    title: "ShopEase (Artndus)",
    description:
      "Official branded storefront for handmade gifts and bouquets with WhatsApp order routing, product catalog variants, and SEO geo-tagging.",
    imgSrc: "/projects/artndus.png",
    icon: <ShoppingCart size={20} />,
    linkHref: "https://artndus.in/",
  },
  {
    id: "rateme",
    title: "RateMe Platform",
    description:
      "A customer feedback SaaS that boosts Google Reviews, builds digital menus, creates dynamic QR codes, and tracks real-time scan analytics.",
    imgSrc: "/projects/rateme.png",
    icon: <Star size={20} />,
    linkHref: "https://www.rateme.co.in/",
  },
  {
    id: "civicresolve",
    title: "CivicResolve",
    description:
      "Full-stack civic feedback platform enabling citizens to report local grievances with geo-tagged coordinates, cloud sync, and live tracking.",
    imgSrc: "/projects/civic-issue.png",
    icon: <MapPin size={20} />,
    linkHref: "https://civicresolve.freedev.app/",
  },
  {
    id: "assignix",
    title: "Assignix",
    description:
      "Web-based assignment coordination platform with dynamic widgets, submission tracking, and student-educator task workflows.",
    imgSrc: "/projects/assignix.png",
    icon: <FileText size={20} />,
    linkHref: "https://assignix-client.vercel.app/login",
  },
  {
    id: "attendance",
    title: "Attendance Tracker",
    description:
      "Android mobile app for students to log subject attendance in real-time, compute cumulative percentages, and receive low-attendance warnings.",
    imgSrc: "/projects/attendance-tracker.png",
    icon: <Smartphone size={20} />,
    linkHref: "https://github.com/Shashankverma-dev/attendance-tracker",
  },
];

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalProjects = ALL_PROJECTS.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden font-sans select-none scroll-mt-20 border-t border-zinc-200 dark:border-zinc-800/60 bg-[#f8f9fb] dark:bg-[#030406] text-zinc-900 dark:text-white transition-colors duration-500"
    >
      {/* ═══════════════════════════════════════════════════
          BACKGROUND LAYER — Dual theme spotlight images
          ═══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* ── LIGHT THEME BG: bg_light.png ── */}
        <div className="absolute inset-0 dark:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/bg_light.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[20%_0%] sm:object-[19%_top] opacity-95"
          />
          {/* Light gradient blending overlays */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, transparent 26%, rgba(248,249,251,0.2) 40%, rgba(248,249,251,0.85) 65%, rgba(248,249,251,0.98) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(248,249,251,0.3) 0%, transparent 15%, transparent 85%, rgba(248,249,251,0.95) 100%)",
            }}
          />
        </div>

        {/* ── DARK THEME BG: bg_dark.png ── */}
        <div className="absolute inset-0 hidden dark:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/bg_dark.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[20%_0%] sm:object-[19%_top] opacity-95"
          />
          {/* Gradient: subtle right fade for clean expanding cards */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, transparent 26%, rgba(3,4,6,0.3) 40%, rgba(3,4,6,0.85) 65%, rgba(3,4,6,0.98) 100%)",
            }}
          />
          {/* Top/bottom subtle edge fades */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(3,4,6,0.3) 0%, transparent 15%, transparent 85%, rgba(3,4,6,0.95) 100%)",
            }}
          />
        </div>

        {/* Subtle grid dots */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        
        {/* ── Grid: Left Text Column + Right Expanding Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">

          {/* ═══ LEFT COLUMN: Title, Tagline, & Project Nav ═══ */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between space-y-6 sm:space-y-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40">
            
            <div className="space-y-3 sm:space-y-4">
              <p className="font-mono text-xs font-bold tracking-widest uppercase">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{"// 04_ "}</span>
                <span className="text-zinc-700 dark:text-zinc-200 font-bold">FEATURED WORK</span>
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black tracking-tight leading-[1.06] text-zinc-950 dark:text-white">
                Project
                <br />
                <span className="text-[#8b5cf6] dark:text-[#a855f7]">Spotlight</span>
                <span className="text-zinc-950 dark:text-white">.</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-200 max-w-sm">
                A curated collection of featured projects where{" "}
                <span className="font-bold text-zinc-950 dark:text-white">
                  code
                </span>{" "}
                meets creativity and{" "}
                <span className="font-bold text-zinc-950 dark:text-white">
                  ideas
                </span>{" "}
                come to life.
              </p>
            </div>

            {/* ── Interactive Controls & Counter ── */}
            <div className="pt-4 sm:pt-6 lg:pt-8 border-t border-zinc-300/80 dark:border-zinc-800/80 space-y-4">
              <p className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-zinc-700 dark:text-zinc-300">
                EXPLORE PROJECTS
              </p>
              
              <div className="flex items-center justify-between sm:justify-start gap-6">
                <p className="font-mono text-lg font-bold tracking-wide">
                  <span className="text-[#8b5cf6] dark:text-[#a855f7] font-black text-xl">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 mx-1.5 font-normal">/</span>
                  <span className="text-zinc-700 dark:text-zinc-200 font-bold text-base">
                    {String(totalProjects).padStart(2, "0")}
                  </span>
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 bg-white dark:bg-zinc-800/95 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm backdrop-blur-sm"
                    aria-label="Previous project"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 bg-white dark:bg-zinc-800/95 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm backdrop-blur-sm"
                    aria-label="Next project"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator line */}
              <div className="w-full max-w-[240px] h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((activeIndex + 1) / totalProjects) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN: Expanding Cards Component ═══ */}
          <div className="lg:col-span-8 xl:col-span-9 flex items-center justify-center w-full">
            <ExpandingCards
              items={ALL_PROJECTS}
              activeIndex={activeIndex}
              onActiveChange={setActiveIndex}
            />
          </div>
        </div>

        {/* ═══ BOTTOM SIGNATURE BAR ═══ */}
        <div className="mt-12 sm:mt-16 pt-6 border-t flex items-center justify-center text-xs font-mono text-center border-zinc-200/70 dark:border-zinc-800/70 text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[#8b5cf6] dark:text-[#a855f7] font-bold">{"</>"}</span>
            <span>
              Building digital experiences with{" "}
              <span className="text-[#8b5cf6] dark:text-[#a855f7] font-semibold">
                clean code
              </span>{" "}
              and{" "}
              <span className="text-[#8b5cf6] dark:text-[#a855f7] font-semibold">
                creative ideas
              </span>
              .
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
