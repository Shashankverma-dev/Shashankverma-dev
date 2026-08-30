"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CertificationItem } from "@/data/certifications";
import { Eye, ExternalLink, ShieldCheck } from "lucide-react";

interface InteractiveCertificateFrameProps {
  item: CertificationItem;
  onSelect: (item: CertificationItem) => void;
  index?: number;
}

export function InteractiveCertificateFrame({
  item,
  onSelect,
  index = 0,
}: InteractiveCertificateFrameProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Mouse tracking for interactive 3D physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.35 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), springConfig);
  const shadowOffsetX = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);
  const shadowOffsetY = useSpring(useTransform(mouseY, [0, 1], [8, 20]), springConfig);
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: "easeOut" }}
      className="relative flex flex-col items-center group select-none perspective-[1200px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ================= 1. WALL MOUNTING PIN & SUSPENSION WIRES ================= */}
      <div className="relative w-full flex flex-col items-center pointer-events-none z-10">
        {/* Wall Nail / Black Metallic Pin */}
        <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-b from-zinc-800 to-black border border-zinc-600/70 shadow-[0_2px_4px_rgba(0,0,0,0.7),0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center -mb-0.5">
          {/* Metallic Pin Head Highlight */}
          <div className="w-1 h-1 rounded-full bg-zinc-300 opacity-80" />
          {/* Wall shadow under pin */}
          <div className="absolute top-2 w-2 h-1 bg-black/40 blur-[0.8px] rounded-full" />
        </div>

        {/* Hanging Suspension Wires (Taut V-Shape) */}
        <svg
          viewBox="0 0 200 28"
          className="w-36 sm:w-44 h-6 overflow-visible opacity-75 dark:opacity-65 transition-opacity duration-300 group-hover:opacity-95"
        >
          <defs>
            <linearGradient id={`wireGrad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18181b" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#52525b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#18181b" stopOpacity="0.85" />
            </linearGradient>
            <filter id={`wireShadow-${item.id}`} x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Left Wire */}
          <line
            x1="100"
            y1="1"
            x2="20"
            y2="28"
            stroke={`url(#wireGrad-${item.id})`}
            strokeWidth="1.2"
            filter={`url(#wireShadow-${item.id})`}
          />

          {/* Right Wire */}
          <line
            x1="100"
            y1="1"
            x2="180"
            y2="28"
            stroke={`url(#wireGrad-${item.id})`}
            strokeWidth="1.2"
            filter={`url(#wireShadow-${item.id})`}
          />

          {/* Eyelet clips */}
          <circle cx="20" cy="27" r="2" fill="#27272a" stroke="#09090b" strokeWidth="0.8" />
          <circle cx="180" cy="27" r="2" fill="#27272a" stroke="#09090b" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ================= 2. REALISTIC PHYSICAL PICTURE FRAME (3D INTERACTIVE) ================= */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(item)}
        tabIndex={0}
        role="button"
        aria-label={`View Certificate: ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect(item);
          }
        }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
        }}
        whileHover={{
          scale: 1.025,
          z: 30,
          transition: { type: "spring", stiffness: 350, damping: 24 },
        }}
        className="relative w-full cursor-pointer rounded-[8px] p-1.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {/* Dynamic Wall Cast Shadow Layer */}
        <motion.div
          className="absolute -inset-1 rounded-xl pointer-events-none -z-10 transition-opacity duration-300"
          style={{
            x: isHovered ? shadowOffsetX : 0,
            y: isHovered ? shadowOffsetY : 10,
            boxShadow: isHovered
              ? "0 24px 45px -8px rgba(0, 0, 0, 0.6), 0 10px 20px -4px rgba(0, 0, 0, 0.35)"
              : "0 14px 28px -6px rgba(0, 0, 0, 0.3), 0 6px 12px -3px rgba(0, 0, 0, 0.18)",
          }}
        />

        {/* Matte Black Wooden Frame Profile */}
        <div className="relative rounded-[7px] bg-[#111215] dark:bg-[#0a0a0d] p-[4px] sm:p-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1.5px_3px_rgba(0,0,0,0.85),0_2px_6px_rgba(0,0,0,0.5)] border border-[#23242a]">
          
          {/* Subtle Top Rim Highlight Catching Overhead Spotlight */}
          <div className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          {/* ================= 3. PASSE-PARTOUT (MUSEUM MAT BOARD) ================= */}
          <div className="relative rounded-[4px] bg-[#fbfbfb] p-1.5 sm:p-2 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.18),inset_0_0_0_1px_rgba(0,0,0,0.06)]">
            
            {/* Inner Artwork Window with Bevel Cut */}
            <div className="relative aspect-[16/11] w-full rounded-[2px] overflow-hidden bg-white shadow-[inset_0_1px_2.5px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center">
              
              {/* Certificate Artwork / High-Definition Document */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.previewImage}
                alt={item.title}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.015] ${
                  imgLoaded ? "opacity-100" : "opacity-90"
                }`}
                style={{
                  imageRendering: "auto",
                }}
              />

              {/* ================= 4. REALISTIC GLASS PANE GLARE & SPECULAR LIGHT ================= */}
              {/* Dynamic Mouse Glare */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 240px at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 75%)`,
                }}
              />

              {/* Diagonal Window Sheen Sweep on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden transition-opacity duration-300">
                <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/18 to-transparent -skew-x-25 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </div>

              {/* Quick Inspect Hover Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-zinc-950 font-sans font-bold text-[11px] shadow-xl transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-200">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inspect Credential</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Frame Inner Shadow */}
          <div className="absolute bottom-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-black/50 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}
