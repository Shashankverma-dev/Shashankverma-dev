"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, CheckCircle2, Sparkles, X, MessageSquare, ThumbsUp } from "lucide-react";

interface Review {
  id: number;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Sarah Jenkins",
    role: "Artisan Cafe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "1h ago",
    comment: "The QR review funnel doubled our verified Google reviews. Super fast & sleek!",
  },
  {
    id: 2,
    author: "David Chen",
    role: "TechForge",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "3h ago",
    comment: "Bone-white design, zero subscription fees. Best feedback SaaS utility.",
  },
  {
    id: 3,
    author: "Aanya Sharma",
    role: "Studio9",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "1d ago",
    comment: "AI-assisted review drafting helps users write comprehensive feedback easily.",
  },
  {
    id: 4,
    author: "Marcus Brody",
    role: "Bakery Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    rating: 5,
    date: "2d ago",
    comment: "Replaced 3 separate paid tools with Ratetree. Simple and lightning fast.",
  },
];

export function InteractiveTabletScreen() {
  const [selectedRating, setSelectedRating] = useState(5);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModal, setActiveModal] = useState<Review | null>(null);
  const [hoveredAvatar, setHoveredAvatar] = useState<string | null>(null);

  return (
    <>
      {/* Interactive Tablet Screen Overlay */}
      <div 
        className="relative w-full h-full rounded-[16px] overflow-hidden flex flex-col text-white cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: "perspective(800px) rotateY(-8deg) rotateX(8deg)",
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle glass reflection & interactive glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

        {/* Live Scroll Reviews Container */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-2 pb-2.5">
          {/* Interactive Star click zone */}
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRating(star);
                  }}
                  className="transition-transform hover:scale-125 focus:outline-none"
                  title={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-3 h-3 ${
                      star <= selectedRating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-zinc-700 text-zinc-700"
                    }`}
                  />
                </button>
              ))}
              <span className="text-[9px] font-bold text-white ml-1">{selectedRating}.0</span>
            </div>

            {/* Clickable explore pill */}
            <a
                href="https://www.rateme.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40 text-[8px] font-bold flex items-center gap-0.5 transition-all shadow-sm"
            >
              <span>Explore</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Smooth Auto-scrolling Review Stream */}
          <div className="relative h-[115px] overflow-hidden rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
            {/* Top/bottom fade masks */}
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={{
                y: isHovered ? undefined : ["0%", "-50%"],
              }}
              transition={{
                y: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="flex flex-col gap-1.5 p-2"
            >
              {[...REVIEWS, ...REVIEWS].map((rev, idx) => (
                <div
                  key={`${rev.id}-${idx}`}
                  onClick={() => setActiveModal(rev)}
                  className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/60 hover:bg-zinc-850 transition-all text-left shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-emerald-500/40"
                      />
                      <span className="text-[8.5px] font-semibold text-white leading-none">
                        {rev.author}
                      </span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-1.5 h-1.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[7.5px] text-zinc-300 leading-tight line-clamp-2 font-sans">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Review Quick Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 p-5 shadow-2xl text-white relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={activeModal.avatar}
                  alt={activeModal.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-sm text-white">{activeModal.author}</h5>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-xs text-zinc-400">{activeModal.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(activeModal.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-xs font-mono text-zinc-400 ml-1.5">{activeModal.date}</span>
              </div>

              <p className="text-sm text-zinc-200 leading-relaxed mb-4">
                &ldquo;{activeModal.comment}&rdquo;
              </p>

              <a
                  href="https://www.rateme.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/25"
              >
                <span>Visit Ratetree Live Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
