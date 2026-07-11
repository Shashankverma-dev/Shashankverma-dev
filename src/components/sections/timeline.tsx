"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline-aceternity";
import { GraduationCap, BookOpen, CheckCircle2, MapPin, Calendar } from "lucide-react";

export function JourneyTimeline() {
  const data = [
    {
      title: "2024 – Now",
      content: (
        <div>
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Bachelor of Computer Applications (BCA)
              </h4>
              <p className="font-mono text-xs text-zinc-500 mt-0.5">
                Swami Rama Himalayan University, India
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-5 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Dehradun, Uttarakhand
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" /> 2024 – Present
            </span>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
            Actively pursuing my Bachelor of Computer Applications degree with a strong academic
            focus on the intersection of software engineering, data science, and modern web
            technologies. Developing hands-on projects alongside core curriculum modules.
          </p>

          {/* Focus Areas */}
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-3">// Core Focus Areas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Data Science & Analytics",
                "Software Development",
                "Database Management Systems",
                "Web Technologies (HTML, CSS, JS)",
                "Programming Fundamentals (C, Python, Java)",
                "Office Technology & Computing",
              ].map((area, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Built */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-3">// Projects Built During BCA</p>
            <div className="space-y-2">
              {[
                { name: "Assignix", desc: "Assignment Management Platform (2026)" },
                { name: "Attendance Tracker", desc: "Academic attendance app (2025)" },
                { name: "Civic Issue Reporting", desc: "Mobile civic issue reporting app (2025)" },
              ].map((proj, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-emerald-500 dark:text-cyan-400 font-bold text-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{proj.name}</span>
                  <span className="text-zinc-500 text-xs hidden sm:inline">— {proj.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shrink-0">
              <BookOpen className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">
                High School — 12th Class
              </h4>
              <p className="font-mono text-xs text-zinc-500 mt-0.5">
                Nancy International School, India
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-5 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" /> Nancy International School
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-500" /> Completed 2024
            </span>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">
            Successfully completed senior secondary education (12th standard). Developed strong
            foundations in science, mathematics, and computer fundamentals. This stage sparked
            the interest in programming and technology that shaped my academic journey.
          </p>

          {/* Achievement Tags */}
          <div className="flex flex-wrap gap-2">
            {["Senior Secondary", "Science Stream", "Mathematics", "Computer Basics", "Critical Thinking"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/8 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
              <BookOpen className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Secondary School Certificate — 10th Class
              </h4>
              <p className="font-mono text-xs text-zinc-500 mt-0.5">
                Nancy International School, India
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-5 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-500" /> Nancy International School
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-violet-500" /> Completed 2022
            </span>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">
            Completed my secondary schooling with focus on foundational academic subjects,
            communication skills, and core scientific principles. This milestone marked the
            beginning of structured academic discipline and goal setting.
          </p>

          {/* Achievement Tags */}
          <div className="flex flex-wrap gap-2">
            {["Secondary School", "Core Science", "Mathematics", "English Communication", "Foundational Computing"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-violet-500/8 border border-violet-500/20 text-violet-600 dark:text-violet-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="journey" className="relative border-t border-zinc-100 dark:border-zinc-900/60">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-4">
        <p className="font-mono text-xs text-emerald-500 dark:text-cyan-400 uppercase tracking-widest mb-2">
          // 03. Academic Milestones
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Education History
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm max-w-xl">
          My academic journey from secondary school through university, building skills in
          software development, data science, and computing.
        </p>
      </div>

      {/* Aceternity Scroll Timeline */}
      <Timeline data={data} />
    </section>
  );
}
