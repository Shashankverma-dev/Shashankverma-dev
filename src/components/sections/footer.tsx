"use client";

import React from "react";
import { ThemeToggle } from "../theme-toggle";

export function Footer() {
  return (
    <footer className="py-12 bg-white dark:bg-black border-t border-zinc-150 dark:border-zinc-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left column: Copyright info */}
        <div className="flex flex-col items-center md:items-start space-y-1 text-xs font-mono text-zinc-500">
          <p>© 2026 Shashank Verma. All rights reserved.</p>
          <p className="text-[10px] text-zinc-500">&lt;compiled_successfully /&gt;</p>
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
