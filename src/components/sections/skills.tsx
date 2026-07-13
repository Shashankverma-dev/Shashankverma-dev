"use client";

import React, { useState, useEffect } from "react";
import { BentoCard } from "../ui/bento-card";
import { InteractiveRobotSpline } from "../ui/interactive-3d-robot";
import { Terminal, Database, Layout, Settings, Cpu } from "lucide-react";

interface SkillItem {
  name: string;
  level: "Advanced" | "Intermediate" | "Familiar";
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: "cyan" | "green" | "violet";
  skills: SkillItem[];
}

function TerminalVisualizerFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030303] flex flex-col justify-between p-6 font-mono select-none">
      {/* Background grid */}
      <div className="absolute inset-0 terminal-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest">System Core: Whobee v1.0.4</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-450 uppercase">
          Optimized 2D Mode
        </span>
      </div>

      {/* Graphics */}
      <div className="flex-grow flex flex-col justify-center items-center py-4 z-10">
        <div className="relative w-32 h-32 flex items-center justify-center mb-5">
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/30 animate-spin" style={{ animationDuration: "25s" }} />
          <div className="absolute inset-5 rounded-full border border-emerald-500/20 bg-zinc-950/90 flex items-center justify-center">
            <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="text-center max-w-xs">
          <h4 className="text-xs font-bold text-zinc-200 mb-1.5 uppercase tracking-wide">3D Canvas Suspended</h4>
          <p className="text-[11px] text-zinc-500 leading-relaxed px-2">
            Whobee 3D sandbox is suspended on mobile and touch devices to reduce latency, memory overhead, and optimize battery drain.
          </p>
        </div>
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-3 z-10 text-center">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-zinc-600">Core status</span>
          <span className="text-[11px] font-semibold text-emerald-400">ACTIVE</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-zinc-600">Engine</span>
          <span className="text-[11px] font-semibold text-zinc-400">LIGHT</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-zinc-600">FPS TARGET</span>
          <span className="text-[11px] font-semibold text-zinc-400">60 FPS</span>
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories: SkillCategory[] = [
    {
      title: "Programming",
      icon: <Terminal className="w-5 h-5" />,
      color: "green",
      skills: [
        { name: "C Language", level: "Familiar" },
        { name: "Python", level: "Familiar" },
        { name: "Java", level: "Familiar" },
      ],
    },
    {
      title: "Web Development",
      icon: <Layout className="w-5 h-5" />,
      color: "cyan",
      skills: [
        { name: "HTML5", level: "Familiar" },
        { name: "CSS3", level: "Familiar" },
        { name: "JavaScript", level: "Familiar" },
      ],
    },
    {
      title: "Database Management",
      icon: <Database className="w-5 h-5" />,
      color: "violet",
      skills: [
        { name: "SQL Basics", level: "Familiar" },
        { name: "Relational DBs", level: "Familiar" },
      ],
    },
    {
      title: "Office Tech & Media",
      icon: <Settings className="w-5 h-5" />,
      color: "green",
      skills: [
        { name: "MS Word / PPT", level: "Intermediate" },
        { name: "MS Excel", level: "Intermediate" },
        { name: "Social Media Platforms", level: "Familiar" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative border-t border-zinc-100 dark:border-zinc-900/60 bg-zinc-50/30 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-16">
          <p className="font-mono text-xs text-emerald-500 dark:text-cyan-400 uppercase tracking-widest mb-2">
            {"// 02. Technical Capabilities"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Skills Inventory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const glowColor = cat.color;
            const iconColorClass = 
              glowColor === "cyan" 
                ? "text-cyan-500" 
                : glowColor === "green" 
                ? "text-emerald-500" 
                : "text-violet-500";

            return (
              <BentoCard 
                key={idx} 
                className="flex flex-col justify-between h-full" 
                hoverGlow={glowColor}
                delay={idx * 0.05}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className={iconColorClass}>{cat.icon}</span>
                    <h3 className="font-mono text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="flex flex-col border-b border-zinc-100 dark:border-zinc-900/50 pb-2.5 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            );
          })}

          {/* Interactive 3D Robot Card */}
          <BentoCard 
            className="md:col-span-2 lg:col-span-4 h-[420px] relative overflow-hidden p-0" 
            hoverGlow="green"
            delay={0.2}
          >
            {isMobile ? (
              <TerminalVisualizerFallback />
            ) : (
              <>
                <InteractiveRobotSpline
                  scene={ROBOT_SCENE_URL}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-emerald-400 bg-zinc-950/80 border border-zinc-850 px-3 py-1.5 rounded-md flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>3D Interactive sandbox</span>
                </div>
              </>
            )}
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

