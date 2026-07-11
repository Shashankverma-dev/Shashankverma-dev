"use client";

import React from "react";
import { BentoCard } from "../ui/bento-card";
import { InteractiveRobotSpline } from "../ui/interactive-3d-robot";
import { Terminal, Database, Layout, Settings } from "lucide-react";

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

export function Skills() {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

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
            // 02. Technical Capabilities
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
            <InteractiveRobotSpline
              scene={ROBOT_SCENE_URL}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-emerald-400 bg-zinc-950/80 border border-zinc-850 px-3 py-1.5 rounded-md flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>3D Interactive sandbox</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

