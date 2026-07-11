"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw } from "lucide-react";

interface LogEntry {
  type: "input" | "output" | "error";
  text: string;
}

export function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", text: "Shashank OS [Version 1.0.4]" },
    { type: "output", text: "(c) 2026 Shashank Verma. All rights reserved." },
    { type: "output", text: "Type 'help' to see available commands or click quick actions below." },
  ]);
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = ["about", "projects", "skills", "contact"];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newEntries: LogEntry[] = [{ type: "input", text: `shashank-verma:~$ ${cmdText}` }];

    switch (trimmed) {
      case "help":
        newEntries.push({
          type: "output",
          text: "Available commands:\n  about     - Learn who I am\n  projects  - Show my developer work\n  skills    - View technical capabilities\n  contact   - Get in touch details\n  clear     - Clear terminal logs",
        });
        break;
      case "about":
        newEntries.push({
          type: "output",
          text: "Shashank Verma — Hardworking BCA student at Swami Rama Himalayan University, Dehradun. Adept at problem solving, database management, programming basics, data analysis, and web technologies.",
        });
        break;
      case "projects":
        newEntries.push({
          type: "output",
          text: "Project Spotlights:\n1. ASSIGNIX: Assignment Management Platform. Web-based portal designed to organize, track, and manage academic submissions.\n2. CIVIC ISSUE REPORTING SYSTEM: Mobile solution for citizens to report civic issues directly to authorities.\n3. ATTENDANCE TRACKER: Educational utility tracking daily attendance sheets and generating summaries.",
        });
        break;
      case "skills":
        newEntries.push({
          type: "output",
          text: "Tech Stack:\n  Programming   - C, Python, Java (basics)\n  Web Dev       - HTML, CSS, JavaScript (basics)\n  Databases     - Relational Database Management (beginner)\n  Office Tech   - MS Word, MS Excel, MS PowerPoint",
        });
        break;
      case "contact":
        newEntries.push({
          type: "output",
          text: "Let's build something:\n  Email     - shashankvermahsst@gmail.com\n  LinkedIn  - linkedin.com/in/shashank-verma-dev/\n  GitHub    - github.com/Shashankverma-dev",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        newEntries.push({
          type: "error",
          text: `Command not found: '${trimmed}'. Type 'help' for instructions.`,
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div 
      className="w-full max-w-2xl bg-zinc-950/90 dark:bg-black/90 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 font-mono"
      onClick={focusInput}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-600 transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center text-xs text-zinc-500 font-mono">
          <TerminalIcon className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
          shashank_shell.sh
        </div>
        <div className="w-12" /> {/* spacer to balance controls */}
      </div>

      {/* Output Console area */}
      <div 
        ref={containerRef}
        className="h-64 overflow-y-auto px-4 py-3 text-xs leading-relaxed text-zinc-300 relative scanlines"
      >
        <div className="absolute inset-0 bg-accent-cyan/2 pointer-events-none glow-overlay" />
        {history.map((entry, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap mb-1.5 ${
              entry.type === "input" 
                ? "text-zinc-100 font-medium" 
                : entry.type === "error" 
                ? "text-red-400" 
                : "text-emerald-400 dark:text-cyan-400"
            }`}
          >
            {entry.text}
          </div>
        ))}

        {/* Input prompt line */}
        <div className="flex items-center mt-2">
          <span className="text-zinc-400 mr-2">shashank-verma:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 outline-none text-zinc-100 caret-emerald-400 dark:caret-cyan-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!isActive}
            autoFocus
          />
        </div>
      </div>

      {/* Quick Action Drawer */}
      <div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center space-x-2">
          <span>Quick run:</span>
          {quickActions.map((act) => (
            <button
              key={act}
              className="px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-emerald-400 dark:hover:text-cyan-400 hover:border-emerald-500/50 dark:hover:border-cyan-500/50 transition-all font-mono"
              onClick={(e) => {
                e.stopPropagation();
                handleCommand(act);
              }}
            >
              ./{act}
            </button>
          ))}
        </div>
        <button 
          className="text-zinc-500 hover:text-zinc-300"
          onClick={(e) => {
            e.stopPropagation();
            setHistory([]);
          }}
          title="Clear screen"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
