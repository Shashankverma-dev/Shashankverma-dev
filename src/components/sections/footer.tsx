"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().slice(11, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 bg-white dark:bg-black border-t border-zinc-150 dark:border-zinc-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left column: Copyright info */}
        <div className="flex flex-col items-center md:items-start space-y-1 text-xs font-mono text-zinc-500">
          <p>© 2026 Shashank Verma. All rights reserved.</p>
          <p className="text-[10px] text-zinc-500">&lt;compiled_successfully /&gt;</p>
        </div>

        {/* Center column: Live System Time mockup */}
        <div className="flex items-center space-x-4 font-mono text-[10px] text-zinc-400">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>SYS_TIME: {time || "00:00:00 UTC"}</span>
          </div>
          <span className="text-zinc-700">|</span>
          <span>STACK: Next.js v16 + Tailwind v4</span>
        </div>

        {/* Right column: Theme Toggle and quick diagnostics */}
        <div className="flex items-center space-x-4">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden md:inline">
            select_theme:
          </span>
          <ThemeToggle />
        </div>

      </div>
    </footer>
  );
}
