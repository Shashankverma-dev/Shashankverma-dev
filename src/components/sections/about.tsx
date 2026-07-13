"use client";

import React from "react";
import { BentoCard } from "../ui/bento-card";
import { User, Cpu, Zap, Code2, Heart } from "lucide-react";

export function About() {
  const stats = [
    { label: "BCA Semester", value: "Active", sub: "SRH University" },
    { label: "Core Languages", value: "3+", sub: "C, Python, Java" },
    { label: "Academic Projects", value: "3+", sub: "Developed so far" },
    { label: "Office Tech", value: "Expert", sub: "Word, Excel, PPT" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-zinc-100 dark:border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-16">
          <p className="font-mono text-xs text-emerald-500 dark:text-cyan-400 uppercase tracking-widest mb-2">
            {"// 01. Profile Summary"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            About Myself
          </h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Biography Card */}
          <BentoCard className="md:col-span-2 flex flex-col justify-between" hoverGlow="green" enableSmoke>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-5 h-5 text-emerald-500" />
                <span className="font-mono text-sm uppercase tracking-wider text-zinc-400">Biography</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">
                Committed to problem-solving, software development, and data science.
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                I am a hardworking BCA student at Swami Rama Himalayan University with a motivated attitude and a variety of powerful skills. Adept at problem solving, programming basics, data analysis, and office technology programs.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Committed to learning and contributing expertise in a dynamic environment of software development, data science, and web technologies. I enjoy taking on coding challenges, building modular apps, and structuring databases.
              </p>
            </div>
            <div className="mt-8 border-t border-zinc-100 dark:border-zinc-900/50 pt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>based in Dehradun, India</span>
              <span>available for collaboration</span>
            </div>
          </BentoCard>

          {/* Quick Stats Grid Card */}
          <BentoCard className="flex flex-col justify-between" hoverGlow="cyan" enableSmoke>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-5 h-5 text-cyan-500" />
                <span className="font-mono text-sm uppercase tracking-wider text-zinc-400">System Metrics</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((st, idx) => (
                  <div key={idx} className="border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 p-3 rounded-lg">
                    <p className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
                      {st.value}
                    </p>
                    <p className="text-[10px] uppercase font-mono text-zinc-400 mt-1">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
              *Metrics computed based on public profiles, repository commits, and active sandbox challenges.
            </p>
          </BentoCard>

          {/* Technical Focus Card */}
          <BentoCard className="flex flex-col justify-between" hoverGlow="cyan" enableSmoke>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Cpu className="w-5 h-5 text-cyan-500" />
                <span className="font-mono text-sm uppercase tracking-wider text-zinc-400">Architecture</span>
              </div>
              <h4 className="font-display text-lg font-bold mb-3">Core Paradigms</h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>Programming (C, Python, Java)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>Database Management basics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>Office Technology software</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span>Web Development (HTML & CSS)</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-mono text-zinc-500">
              <Code2 className="w-4 h-4" />
              <span>BCA curriculum roadmap</span>
            </div>
          </BentoCard>

          {/* Philosophy / Values Card */}
          <BentoCard className="md:col-span-2 flex flex-col justify-between" hoverGlow="green" enableSmoke>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-5 h-5 text-emerald-500" />
                <span className="font-mono text-sm uppercase tracking-wider text-zinc-400">Code Philosophy</span>
              </div>
              <h4 className="font-display text-xl font-bold mb-3">
                “Problem solving is the foundation; technology is the tool.”
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I believe in writing clean, readable code and building solutions that address actual needs, like reporting civic issues or tracking student attendance. By learning database management and programming basics, I aim to create projects that combine practical utility with solid technical logic.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono">
                Data Science
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono">
                Software Engineering
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono">
                Relational Databases
              </span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
