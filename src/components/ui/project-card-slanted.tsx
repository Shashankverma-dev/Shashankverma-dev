"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface SlantedProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  heroImage: string;
  heroAlt: string;
  accentColor: string;
  accentGlow: string;
  iconType: "delta" | "shop" | "chart" | "cloud" | "doc" | "mobile";
}

interface ProjectCardSlantedProps {
  project: SlantedProjectItem;
  index: number;
}

export function ProjectCardSlanted({ project, index }: ProjectCardSlantedProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderIcon = () => {
    switch (project.iconType) {
      case "delta":
        // Delta Triangle Icon (Aura Social)
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <path
              d="M24 3L45 39H3L24 3Z"
              stroke={project.accentColor}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            <path
              d="M24 15L34 33H14L24 15Z"
              stroke={project.accentColor}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "shop":
        // Shopping Bag Icon (ShopEase)
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <path
              d="M8 15H40L37.5 42H10.5L8 15Z"
              stroke={project.accentColor}
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            <path
              d="M17 19V11C17 7.134 20.134 4 24 4C27.866 4 31 7.134 31 11V19"
              stroke={project.accentColor}
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </svg>
        );
      case "chart":
        // Ascending Growth Trend Chart Icon (TaskFlow)
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <rect x="6" y="26" width="7" height="16" rx="1.5" fill={project.accentColor} />
            <rect x="17" y="18" width="7" height="24" rx="1.5" fill={project.accentColor} />
            <rect x="28" y="22" width="7" height="20" rx="1.5" fill={project.accentColor} />
            <path
              d="M6 20L18 8L29 16L42 4"
              stroke={project.accentColor}
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 4H42V15"
              stroke={project.accentColor}
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "cloud":
        // Cloud with Down Arrow Icon (CloudDrive)
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <path
              d="M12 33C7.58 33 4 29.42 4 25C4 20.9 7.07 17.5 11.1 17.05C11.8 9.9 17.8 4.5 25 4.5C31.9 4.5 37.7 9.5 38.8 16.2C42.8 16.9 45.8 20.4 45.8 24.6C45.8 29.2 42.2 33 37.6 33H12"
              stroke={project.accentColor}
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            <path
              d="M25 21V36M25 36L19 30M25 36L31 30"
              stroke={project.accentColor}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "doc":
        // Academic Document Icon (Assignix)
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <path
              d="M10 6H30L38 14V42H10V6Z"
              stroke={project.accentColor}
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            <path d="M30 6V14H38" stroke={project.accentColor} strokeWidth="3.4" strokeLinejoin="round" />
            <line x1="16" y1="22" x2="32" y2="22" stroke={project.accentColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="30" x2="28" y2="30" stroke={project.accentColor} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case "mobile":
        // Smartphone Icon (Attendance Tracker)
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <rect x="12" y="4" width="24" height="40" rx="6" stroke={project.accentColor} strokeWidth="3.4" />
            <line x1="20" y1="10" x2="28" y2="10" stroke={project.accentColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="38" r="2" fill={project.accentColor} />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14" fill="none">
            <path
              d="M24 3L45 39H3L24 3Z"
              stroke={project.accentColor}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex-1 min-w-[240px] sm:min-w-[250px] lg:min-w-0 h-[510px] sm:h-[530px] lg:h-[555px] xl:h-[580px] group select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================= TALL SLANTED PARALLELOGRAM CARD ================= */}
      <div
        className="relative w-full h-full rounded-[24px] sm:rounded-[26px] lg:rounded-[30px] pt-4 pb-0 px-0 flex flex-col justify-between transition-all duration-400 ease-out -skew-x-[7deg] sm:-skew-x-[8.5deg] lg:-skew-x-[9.5deg] group-hover:-skew-x-[4deg] group-hover:-translate-y-3 bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12)] overflow-hidden"
        style={{
          boxShadow: isHovered
            ? `0 25px 55px -10px ${project.accentGlow}, 0 0 0 1.5px ${project.accentColor}`
            : undefined,
          borderBottom: `4px solid ${project.accentColor}`,
        }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 inset-x-0 h-32 pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: `radial-gradient(ellipse at top, ${project.accentColor}, transparent 70%)`,
          }}
        />

        {/* ================= INNER UPRIGHT CONTENT (COUNTER-SKEWED) ================= */}
        <div className="relative z-10 flex flex-col h-full justify-between skew-x-[7deg] sm:skew-x-[8.5deg] lg:skew-x-[9.5deg] pt-1 px-3 sm:px-4 pb-0">
          
          {/* Top Section: Number, Icon, Title, Subtitle, Tech Badges */}
          <div className="space-y-1.5 sm:space-y-2">
            
            {/* Number Index (Top Left) */}
            <div className="flex items-center justify-start pl-1">
              <span
                className="font-mono text-sm sm:text-base font-black tracking-wider"
                style={{ color: project.accentColor }}
              >
                {project.number}
              </span>
            </div>

            {/* Big Vector Icon (Matching Reference Image) */}
            <div className="py-1.5 sm:py-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {renderIcon()}
            </div>

            {/* Project Title */}
            <h3 className="text-center font-sans font-black text-lg sm:text-xl xl:text-2xl text-zinc-950 tracking-tight leading-tight">
              {project.name}
            </h3>

            {/* 2-line Subtitle Description */}
            <p className="text-center font-sans text-[11px] sm:text-xs text-zinc-600 line-clamp-2 leading-relaxed px-1">
              {project.tagline}
            </p>

            {/* Tech Badges (Rounded Pills) */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-1.5 sm:pt-2">
              {project.tech.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200/80 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ================= BOTTOM 3D ARTWORK (MATCHING REFERENCE IMAGE) ================= */}
          <div className="relative w-[122%] -ml-[11%] aspect-[1/1] overflow-hidden rounded-b-[22px] sm:rounded-b-[24px] lg:rounded-b-[28px] mt-2 sm:mt-3 bg-zinc-100">
            {/* 3D Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroImage}
              alt={project.heroAlt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Interactive Hover Overlay with Live & GitHub buttons */}
            <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 sm:gap-2.5 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold text-white shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: project.accentColor }}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg bg-zinc-900/90 text-zinc-100 border border-zinc-700 hover:bg-zinc-800 transition-transform hover:scale-105"
                  title="View GitHub Source"
                  aria-label="View GitHub Source"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Bottom edge shadow */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </motion.div>
  );
}
