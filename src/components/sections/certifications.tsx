"use client";

import React from "react";
import { BentoCard } from "../ui/bento-card";
import { Award, ShieldCheck, Flame, GitBranch, Terminal } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  verificationId?: string;
  url?: string;
}

interface Achievement {
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  color: "cyan" | "green";
}

export function Certifications() {
  const certifications: Certification[] = [
    {
      title: "Advanced React & Next.js Workflows",
      issuer: "Meta Frontend Specialization",
      date: "Dec 2024",
      verificationId: "MFR-NEXT-93820",
    },
    {
      title: "PostgreSQL Database Administration & Security",
      issuer: "Supabase Certified Expert",
      date: "Oct 2024",
      verificationId: "SBA-PG-10298",
    },
    {
      title: "Data Structures & Algorithms in C++",
      issuer: "Coding Ninjas India",
      date: "May 2024",
      verificationId: "CN-DSA-77821",
    },
  ];

  const achievements: Achievement[] = [
    {
      title: "Consistent Coding",
      description: "Maintained a continuous daily contribution calendar on GitHub.",
      metric: "365+ Days",
      icon: <Flame className="w-5 h-5 text-emerald-500" />,
      color: "green",
    },
    {
      title: "Algorithm Problem Solving",
      description: "Solved advanced array, tree, and grid optimization problems.",
      metric: "300+ Solved",
      icon: <Terminal className="w-5 h-5 text-cyan-500" />,
      color: "cyan",
    },
    {
      title: "Open Source Sandbox Contributions",
      description: "Helped optimize execution layers and documentation runtimes.",
      metric: "12+ Pulls",
      icon: <GitBranch className="w-5 h-5 text-emerald-500" />,
      color: "green",
    },
  ];

  return (
    <section id="credentials" className="py-24 relative overflow-hidden border-t border-zinc-100 dark:border-zinc-900/60 bg-zinc-50/20 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-16">
          <p className="font-mono text-xs text-emerald-500 dark:text-cyan-400 uppercase tracking-widest mb-2">
            {"// 05. Credentials & Milestones"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Certifications & Accomplishments
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Certifications Card */}
          <BentoCard className="md:col-span-2 flex flex-col justify-between" hoverGlow="green">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-5 h-5 text-emerald-500" />
                <span className="font-mono text-sm uppercase tracking-wider text-zinc-400">Technical Certifications</span>
              </div>

              <div className="space-y-6">
                {certifications.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-100 dark:border-zinc-900/50 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <h4 className="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
                        {cert.issuer} &bull; {cert.date}
                      </p>
                    </div>

                    {cert.verificationId && (
                      <div className="mt-2 md:mt-0 flex items-center space-x-1.5 text-[10px] font-mono text-zinc-400 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 px-2.5 py-1 rounded">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>VERIFIED: {cert.verificationId}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-8 leading-relaxed font-mono">
              *Digital credentials and verification numbers can be provided upon direct job application or inquiry.
            </p>
          </BentoCard>

          {/* Achievements Metrics column */}
          <div className="space-y-6">
            {achievements.map((ach, idx) => (
              <BentoCard 
                key={idx} 
                className="flex flex-col justify-between h-auto p-5" 
                hoverGlow={ach.color}
                delay={idx * 0.05}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">Achievement</span>
                    <h4 className="font-display text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {ach.title}
                    </h4>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                    {ach.icon}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed my-3">
                  {ach.description}
                </p>

                <div className="mt-2 border-t border-zinc-100 dark:border-zinc-900/50 pt-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">metric</span>
                  <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {ach.metric}
                  </span>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
