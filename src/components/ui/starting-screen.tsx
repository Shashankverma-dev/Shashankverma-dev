"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StartingScreenProps {
  onComplete: () => void;
}

export function StartingScreen({ onComplete }: StartingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Lock scrolling on mount
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling on unmount
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Loading animation simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Custom randomized increments for premium feel
      const increment = Math.floor(Math.random() * 6) + 3;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsComplete(true);

        // Wait for the masking "erasing" animation to complete, then expand
        const expandTimer = setTimeout(() => {
          setIsExpanded(true);
        }, 1100);

        // Wait for expansion animation, then exit
        const finishTimer = setTimeout(() => {
          onComplete();
        }, 2200);

        return () => {
          clearTimeout(expandTimer);
          clearTimeout(finishTimer);
        };
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#eae5ec] overflow-hidden select-none font-mono py-6 px-6">
      
      {/* Top Navigation / Header */}
      <div className="w-full flex items-center justify-between z-10">
        {/* Logo Left */}
        <a className="font-sans font-bold text-lg text-[#a87cff] tracking-tight uppercase">
          ShashankVerma
        </a>

        {/* Visualizer Right */}
        <div className="flex items-center gap-1 h-5 select-none pointer-events-none">
          <div className="w-[3px] h-4 bg-zinc-800 rounded-full animate-loader-bar" style={{ animationDelay: "0.1s", animationDuration: "0.7s" }} />
          <div className="w-[3px] h-4 bg-zinc-800 rounded-full animate-loader-bar" style={{ animationDelay: "0.3s", animationDuration: "0.5s" }} />
          <div className="w-[3px] h-4 bg-zinc-800 rounded-full animate-loader-bar" style={{ animationDelay: "0.2s", animationDuration: "0.8s" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#a87cff] mx-0.5" />
          <div className="w-[3px] h-4 bg-zinc-800 rounded-full animate-loader-bar" style={{ animationDelay: "0.4s", animationDuration: "0.6s" }} />
          <div className="w-[3px] h-4 bg-zinc-800 rounded-full animate-loader-bar" style={{ animationDelay: "0.0s", animationDuration: "0.9s" }} />
        </div>
      </div>

      {/* Large Background Marquee Text */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none z-0">
        <div className="w-max flex items-center font-display text-[85px] md:text-[140px] font-black uppercase text-[#0b080c] select-none tracking-tighter leading-none">
          <motion.div
            animate={{ x: [0, "-33.33%"] }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 pr-12"
          >
            <span>STUDENT</span>
            <span className="text-[#a87cff]">•</span>
            <span>DEVELOPER</span>
            <span className="text-[#a87cff]">•</span>
            <span>PROGRAMMER</span>
            <span className="text-[#a87cff]">•</span>

            <span>STUDENT</span>
            <span className="text-[#a87cff]">•</span>
            <span>DEVELOPER</span>
            <span className="text-[#a87cff]">•</span>
            <span>PROGRAMMER</span>
            <span className="text-[#a87cff]">•</span>

            <span>STUDENT</span>
            <span className="text-[#a87cff]">•</span>
            <span>DEVELOPER</span>
            <span className="text-[#a87cff]">•</span>
            <span>PROGRAMMER</span>
            <span className="text-[#a87cff]">•</span>
          </motion.div>
        </div>
      </div>

      {/* Centered Pill Loader Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          animate={isExpanded ? {
            width: "350vw",
            height: "350vh",
            borderRadius: "0px",
            boxShadow: "0 0 100px rgba(0,0,0,0.5)",
          } : {
            width: "270px",
            height: "56px",
            borderRadius: "9999px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08), 0 0 15px rgba(168, 124, 255, 0.1)",
          }}
          transition={isExpanded ? {
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1]
          } : {
            duration: 0.3
          }}
          className="bg-[#0b080c] flex items-center justify-center relative overflow-hidden z-20 pointer-events-auto border border-zinc-900"
        >
          {/* Inner Masking & Typography */}
          {!isExpanded && (
            <div className="relative w-full h-full flex items-center justify-center font-sans text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-white select-none">
              
              {/* Revealed Text Layer (Welcome) */}
              <div className="absolute text-white tracking-[0.25em]">
                WELCOME
              </div>

              {/* Masking Text Layer (Loading) */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: isComplete ? "0%" : "100%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute left-0 top-0 bottom-0 overflow-hidden bg-[#0b080c] flex items-center"
              >
                {/* Center fixed text relative to the overall pill container */}
                <div className="w-[270px] flex items-center justify-center shrink-0 absolute left-1/2 -translate-x-1/2">
                  <span className="tracking-[0.25em] text-white">
                    LOADING {progress.toString().padStart(3, "0")}%
                  </span>
                </div>

                {/* Simulated blinking cursor at clipping edge */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-white animate-pulse" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer / Meta Data */}
      <div className="w-full flex items-center justify-between z-10 text-[10px] text-zinc-500 uppercase tracking-widest">
        <span>[ STATUS: DEPLOYED ]</span>
        <span>SYS_PORTFOLIO_V2.6</span>
      </div>

    </div>
  );
}
