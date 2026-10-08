"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {
  SKILL_CATEGORIES,
  TECHNOLOGIES_DATA,
  TechnologyItem,
} from "./skill-data";
import { SkillCard } from "./SkillCard";
import { TechnologyTile } from "./TechnologyTile";
import { StickyNote } from "./StickyNote";
import { ConnectionThreads, ThreadConnection } from "./ConnectionThreads";
import { TechnologyModal } from "./TechnologyModal";
import { RotateCcw, Sparkles, Lock, Unlock } from "lucide-react";

export function SkillsInventory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Selected technology for details modal/popup
  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null);

  // Interactive toggle for draggable canvas
  const [isDragEnabled, setIsDragEnabled] = useState(true);

  // Easter egg: IDEAS -> SKILLS -> PROJECTS illuminated steps
  const [easterEggStep, setEasterEggStep] = useState<number>(0);

  // Stored dragged positions: { [id: string]: { x: number, y: number } }
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});


  // Load saved positions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("skills-board-layout");
      if (saved) {
        const parsed = JSON.parse(saved);
        requestAnimationFrame(() => {
          setPositions(parsed);
        });
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
  }, []);



  // Handle position changes: real-time updates for threads during drag, and localStorage on drag end
  const handlePositionChange = useCallback((id: string, x: number, y: number, isFinal = true) => {
    setPositions((prev) => {
      const updated = { ...prev, [id]: { x, y } };
      if (isFinal) {
        try {
          localStorage.setItem("skills-board-layout", JSON.stringify(updated));
        } catch {
          // Ignored
        }
      }
      return updated;
    });
  }, []);

  // Reset positions to default without page reload
  const handleResetBoard = () => {
    setPositions({});
    try {
      localStorage.removeItem("skills-board-layout");
    } catch {
      // Ignored
    }
  };

  // Toggle draggable canvas mode
  const handleToggleDrag = () => {
    setIsDragEnabled((prev) => !prev);
  };

  // Trigger Easter Egg sequence
  const handleEasterEggClick = () => {
    if (easterEggStep > 0) return;
    setEasterEggStep(1); // IDEAS
    setTimeout(() => setEasterEggStep(2), 350); // SKILLS
    setTimeout(() => setEasterEggStep(3), 700); // PROJECTS
    setTimeout(() => setEasterEggStep(0), 1900); // Return
  };

  // Connecting threads dynamically follow the cards while moving in real time
  const threadConnections: ThreadConnection[] = useMemo(() => {
    // tile center-x per column (tile=114px, gap=10px => stride=124px)
    // pin is at top-center => x = col*124 + 57, y = row*132 + 14
    const S = 124; // horizontal stride
    const R = 132; // vertical stride
    const PX = 57; // pin x center-offset
    const PY = 14; // pin y top-offset

    const pC = positions["tech-c"] || { x: 0, y: 0 };
    const pPython = positions["tech-python"] || { x: 0, y: 0 };
    const pJava = positions["tech-java"] || { x: 0, y: 0 };
    const pHTML = positions["tech-html5"] || { x: 0, y: 0 };
    const pCSS = positions["tech-css3"] || { x: 0, y: 0 };
    const pJS = positions["tech-js"] || { x: 0, y: 0 };
    const pSQL = positions["tech-sql"] || { x: 0, y: 0 };
    const pDB = positions["tech-db"] || { x: 0, y: 0 };
    const pWord = positions["tech-word"] || { x: 0, y: 0 };

    return [
      // Row 0: C → Python (purple thread)
      {
        from: { x: PX + pC.x,           y: PY + pC.y },
        to:   { x: PX + S + pPython.x,   y: PY + pPython.y },
        color: "#a855f7",
        sag: 18,
      },
      // Row 0: Python → Java (purple thread)
      {
        from: { x: PX + S + pPython.x,   y: PY + pPython.y },
        to:   { x: PX + S*2 + pJava.x,   y: PY + pJava.y },
        color: "#a855f7",
        sag: 16,
      },
      // Row 1: HTML5 → CSS3 (red thread)
      {
        from: { x: PX + pHTML.x,          y: PY + R + pHTML.y },
        to:   { x: PX + S + pCSS.x,       y: PY + R + pCSS.y },
        color: "#ef4444",
        sag: 20,
      },
      // Row 1: CSS3 → JS (red thread)
      {
        from: { x: PX + S + pCSS.x,       y: PY + R + pCSS.y },
        to:   { x: PX + S*2 + pJS.x,      y: PY + R + pJS.y },
        color: "#ef4444",
        sag: 20,
      },
      // Col 0: HTML5 → SQL (red thread connecting Web to DB)
      {
        from: { x: PX + pHTML.x,          y: PY + R + pHTML.y },
        to:   { x: PX + pSQL.x,           y: PY + R*2 + pSQL.y },
        color: "#ef4444",
        sag: -14,
      },
      // Row 2: SQL → Databases (purple thread connecting SQL to DB architecture)
      {
        from: { x: PX + pSQL.x,           y: PY + R*2 + pSQL.y },
        to:   { x: PX + S + pDB.x,        y: PY + R*2 + pDB.y },
        color: "#8b5cf6",
        sag: 18,
      },
      // Row 2: Databases → Word (cyan thread connecting DB to Productivity)
      {
        from: { x: PX + S + pDB.x,        y: PY + R*2 + pDB.y },
        to:   { x: PX + S*2 + pWord.x,    y: PY + R*2 + pWord.y },
        color: "#0284c7",
        sag: 16,
      },
    ];
  }, [positions]);

  return (
    <section
      id="skills"
      ref={containerRef}
      aria-label="Technical Capabilities and Skills Inventory"
      className="w-full relative overflow-hidden select-none scroll-mt-16 sm:scroll-mt-20 text-zinc-900 dark:text-zinc-100 font-sans bg-white dark:bg-[#111113] transition-colors duration-300"
      style={{ minHeight: "min(100vh, 760px)" }}
    >
      {/* ===================== BACKGROUND: Pegboard Environment (Light / Dark) ===================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* ── LIGHT THEME PEGBOARD (White / Light Workspace) ── */}
        <div className="absolute inset-0 dark:hidden">
          {/* Base Light Pegboard Background with Crisp Hole Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#f7f5ef",
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.11) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
              backgroundPosition: "14px 14px",
            }}
          />

          {/* Real Light Workspace Environment (Monstera Plant, Lamp, Desk, Cup) */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: "url('/skills/pegboard-workspace-bg-light.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "50% 45%",
            }}
          />

          {/* Soft Sunlight / Warm Lamp Glow Upper Right */}
          <div
            className="absolute -top-24 -right-24 w-[740px] h-[740px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at 72% 22%, rgba(254,240,138,0.35) 0%, rgba(245,158,11,0.08) 38%, transparent 70%)",
              filter: "blur(55px)",
            }}
          />

          {/* Soft Light Vignettes for Enhanced Card Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />

          {/* Light Oak Desk Surface at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#ecdcc4]/75 via-[#f5efe2]/30 to-transparent border-t border-black/[0.04]" />

          {/* Seamless Edge Blends into White Page Sections */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* ── DARK THEME PEGBOARD (Dark Charcoal Workspace) ── */}
        <div className="absolute inset-0 hidden dark:block">
          {/* Pegboard dot grid — clearly visible white dots on dark charcoal */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#111113",
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1.4px, transparent 1.4px)",
              backgroundSize: "28px 28px",
              backgroundPosition: "14px 14px",
            }}
          />

          {/* Physical workspace image blend */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: "url('/skills/pegboard-workspace-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "50% 45%",
            }}
          />

          {/* Warm studio lamp — upper right */}
          <div
            className="absolute -top-24 -right-24 w-[740px] h-[740px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at 72% 22%, rgba(255,220,140,0.20) 0%, rgba(245,158,11,0.08) 38%, rgba(139,92,246,0.04) 60%, transparent 72%)",
              filter: "blur(62px)",
            }}
          />

          {/* Purple ambient center-top */}
          <div
            className="absolute -top-28 left-1/3 w-[580px] h-[380px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(139,92,246,0.13) 0%, transparent 70%)",
              filter: "blur(72px)",
            }}
          />

          {/* Edge vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-transparent to-black/48" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/32" />

          {/* Desk surface bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0c0a08] via-[#14100c]/80 to-transparent border-t border-white/[0.03]" />

          {/* Top blend into page */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#07080c]/80 to-transparent" />
          {/* Bottom blend from page */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-4 pb-6 sm:pt-5 sm:pb-7 lg:pt-5 lg:pb-8">

        {/* ===== TOP BAR: Header + Controls ===== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 mb-2.5 sm:mb-3 lg:mb-3.5">
          <div className="space-y-0.5 max-w-xl">
            {/* Monospace Eyebrow */}
            <p className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase drop-shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>{"// 02. TECHNICAL CAPABILITIES"}</span>
            </p>

            {/* Main Editorial Heading */}
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.04em] leading-[0.95] drop-shadow-md">
                <span className="text-zinc-900 dark:text-white">Skills</span>{" "}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-purple-500">
                  Inventory
                  {/* Hand-drawn accent sparkle lines */}
                  <svg
                    viewBox="0 0 32 32"
                    className="absolute -top-3 -right-6 w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 dark:text-white/90 pointer-events-none hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="8" y1="16" x2="2" y2="16" />
                    <line x1="12" y1="10" x2="6" y2="4" />
                    <line x1="16" y1="8" x2="16" y2="2" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Subtitle Description */}
            <p className="text-zinc-600 dark:text-zinc-300 text-[11px] sm:text-xs font-medium leading-normal max-w-[520px]">
              A curated set of tools, technologies, and skills I use to build, solve, and create.
            </p>
          </div>

          {/* Board Interactive Controls (Reset & Drag Toggle) */}
          <div className="flex items-center gap-2 pb-0.5 shrink-0">
            <button
              onClick={handleResetBoard}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-300/80 dark:border-zinc-700/80 text-[11px] sm:text-xs font-mono font-medium transition-all flex items-center gap-1.5 shadow-xs cursor-pointer backdrop-blur-xs"
              title="Reset all pinned cards to default board positions"
              aria-label="Reset board cards to original positions"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Reset Board</span>
            </button>

            <button
              onClick={handleToggleDrag}
              className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer backdrop-blur-xs ${
                isDragEnabled
                  ? "bg-purple-100/90 dark:bg-purple-950/50 border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200/90 dark:hover:bg-purple-900/60"
                  : "bg-white/90 dark:bg-zinc-900/80 border-zinc-300/80 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title={isDragEnabled ? "Click to lock board elements in place" : "Click to enable dragging elements"}
              aria-label={isDragEnabled ? "Lock draggable elements" : "Unlock draggable elements"}
            >
              {isDragEnabled ? (
                <>
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Drag: Active</span>
                  <Unlock className="w-3 h-3 text-purple-600/80 dark:text-purple-400/80 ml-0.5" />
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>Drag: Locked</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ================= MAIN BALANCED COMPOSITION ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.08fr_1fr] 2xl:grid-cols-[1.25fr_1fr] gap-4 lg:gap-6 xl:gap-7 items-start">

          {/* ================= LEFT COLUMN: 5 COMPACT PAPER CARDS ================= */}
          <div className="space-y-1.5 sm:space-y-2 lg:space-y-2 relative w-full">
            {SKILL_CATEGORIES.map((category, index) => (
              <SkillCard
                key={category.id}
                data={category}
                index={index}
                isDragEnabled={isDragEnabled}
                savedPosition={positions[category.id]}
                onPositionChange={handlePositionChange}
              />
            ))}

          </div>

          {/* ===== RIGHT: Tech Cluster (matches reference composition) ===== */}
          <div className="relative flex flex-col items-center w-full">

            {/* TOP ROW: Stacked annotation (left) + Checklist note (right) */}
            <div className="w-full flex items-start justify-between gap-2 mb-3 px-1">

              {/* "TOOLS TECHNOLOGIES SKILLS IDEAS" — stacked, top-left (matches reference) */}
              <div
                className="text-zinc-800 dark:text-zinc-200 font-black select-none pointer-events-none leading-none mt-1"
                style={{ fontFamily: "var(--font-handwriting), Caveat, cursive" }}
                aria-hidden="true"
              >
                <div className="text-xs sm:text-sm tracking-widest uppercase flex flex-col gap-px">
                  <span>TOOLS</span>
                  <span>TECHNOLOGIES</span>
                  <span>SKILLS</span>
                  <span>IDEAS</span>
                </div>
                {/* Curved arrow toward grid */}
                <svg
                  viewBox="0 0 48 36"
                  className="w-7 h-5 text-zinc-600 dark:text-zinc-400 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6 C18 6, 38 14, 40 30 M32 22 L40 30 L46 22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Cream Checklist note — top-right corner */}
              <div className="relative z-20 shrink-0">
                <StickyNote
                  id="note-checklist"
                  type="checklist"
                  initialRotation={2}
                  isDragEnabled={isDragEnabled}
                  savedPosition={positions["note-checklist"]}
                  onPositionChange={handlePositionChange}
                />
              </div>
            </div>

            {/* MIDDLE ROW: [Blue note] [3x3 Grid] [Pink note + annotation] */}
            <div className="relative grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-3.5 w-full -mt-6 sm:-mt-10 lg:-mt-14">

              {/* Blue note — LEFT of tech grid on desktop; below on mobile */}
              <div className="justify-self-center sm:self-center order-2 sm:order-1 relative z-25 shrink-0">
                <StickyNote
                  id="note-blue"
                  type="blue"
                  initialRotation={-4}
                  isDragEnabled={isDragEnabled}
                  savedPosition={positions["note-blue"]}
                  onPositionChange={handlePositionChange}
                />
              </div>

              {/* 3×3 Tech Grid — Spans both columns on mobile, centered */}
              <div className="col-span-2 justify-self-center order-1 sm:order-2 relative shrink-0 max-w-full">
                <div className="hidden sm:block absolute inset-0 z-10 pointer-events-none">
                  <ConnectionThreads connections={threadConnections} />
                </div>
                <div ref={gridRef} className="grid grid-cols-3 gap-2 sm:gap-2.5 xl:gap-2.5 relative z-20 justify-items-center">
                  {TECHNOLOGIES_DATA.map((tech) => (
                    <TechnologyTile
                      key={tech.id}
                      item={tech}
                      isSelected={selectedTech?.id === tech.id}
                      isDragEnabled={isDragEnabled}
                      onSelect={(item) => setSelectedTech(item)}
                      savedPosition={positions[tech.id]}
                      onPositionChange={handlePositionChange}
                    />
                  ))}
                </div>
              </div>

              {/* Pink note + "SAME TOOLS" annotation — RIGHT of grid on desktop; below on mobile */}
              <div className="col-span-1 justify-self-center order-3 sm:order-3 flex flex-col items-center justify-center gap-1 shrink-0">
                <div
                  className="text-center text-zinc-800 dark:text-zinc-300 font-black select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-handwriting), Caveat, cursive" }}
                  aria-hidden="true"
                >
                  <div className="text-[9px] sm:text-[10px] tracking-wider uppercase leading-tight">
                    <div>SAME</div>
                    <div>TOOLS</div>
                    <div>DIFFERENT</div>
                    <div>POSSIBILITIES</div>
                  </div>
                  <svg
                    viewBox="0 0 24 32"
                    className="w-2.5 h-3.5 mx-auto text-purple-600 dark:text-purple-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2 C18 10, 18 20, 10 26 M6 22 L10 26 L14 22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="relative z-25">
                  <StickyNote
                    id="note-pink"
                    type="pink"
                    initialRotation={5}
                    isDragEnabled={isDragEnabled}
                    savedPosition={positions["note-pink"]}
                    onPositionChange={handlePositionChange}
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM: IDEAS → SKILLS → PROJECTS oval pill */}
            <div className="w-full flex justify-center pt-2 sm:pt-2.5">
              <button
                onClick={handleEasterEggClick}
                className="group px-4 py-1 rounded-full border-2 border-purple-400/80 dark:border-purple-500/60 bg-purple-50/90 dark:bg-purple-950/20 hover:bg-purple-100/90 dark:hover:bg-purple-900/40 text-xs sm:text-sm font-bold tracking-wider text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 transition-all duration-300 shadow-xs cursor-pointer flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-handwriting), Caveat, cursive" }}
                title="Click to activate ideas to projects flow"
                aria-label="Interactive Ideas to Skills to Projects sequence"
              >
                <span className={`transition-all duration-300 ${
                  easterEggStep === 1 ? "text-emerald-600 dark:text-emerald-400 scale-125 drop-shadow-[0_0_10px_#10b981]" : ""
                }`}>IDEAS</span>
                <span className="text-zinc-400 dark:text-zinc-500">→</span>
                <span className={`transition-all duration-300 ${
                  easterEggStep === 2 ? "text-purple-600 dark:text-purple-400 scale-125 drop-shadow-[0_0_10px_#8b5cf6]" : ""
                }`}>SKILLS</span>
                <span className="text-zinc-400 dark:text-zinc-500">→</span>
                <span className={`transition-all duration-300 ${
                  easterEggStep === 3 ? "text-cyan-600 dark:text-cyan-400 scale-125 drop-shadow-[0_0_10px_#06b6d4]" : ""
                }`}>PROJECTS</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Detail Popup Modal (Never cut off by viewport) */}
      <TechnologyModal
        item={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </section>
  );
}
