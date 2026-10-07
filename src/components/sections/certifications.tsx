"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATIONS_DATA, CertificationItem } from "@/data/certifications";
import { InteractiveCertificateFrame } from "../ui/interactive-certificate-frame";
import { CertificateModal } from "../ui/certificate-modal";
import { 
  ShieldCheck, 
  Award, 
  Search, 
  LayoutGrid, 
  Columns2, 
  ExternalLink,
  Eye,
  FileCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "spotlight">("grid");
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: CERTIFICATIONS_DATA.length };
    CERTIFICATIONS_DATA.forEach((cert) => {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    });

    const order: string[] = [
      "Web Development",
      "AI / ML",
      "Cloud & DevOps",
      "Programming",
      "UI/UX Design",
      "Database",
    ];

    const allCats = Array.from(new Set(CERTIFICATIONS_DATA.map((c) => c.category)));
    const sortedCats = allCats.sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });

    return [
      { label: "All", value: "All", count: CERTIFICATIONS_DATA.length },
      ...sortedCats.map((cat) => ({
        label: cat,
        value: cat,
        count: counts[cat] || 0,
      })),
    ];
  }, []);

  const filteredCertificates = useMemo(() => {
    return CERTIFICATIONS_DATA.filter((cert) => {
      const matchesCategory =
        activeCategory === "All" ||
        cert.category.toLowerCase() === activeCategory.toLowerCase();
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.category.toLowerCase().includes(q) ||
        cert.skills.some((s) => s.toLowerCase().includes(q)) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const currentSpotlight = filteredCertificates[spotlightIndex] || filteredCertificates[0] || CERTIFICATIONS_DATA[0];

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => (prev > 0 ? prev - 1 : filteredCertificates.length - 1));
  };

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => (prev < filteredCertificates.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="certifications"
      className="w-full relative overflow-hidden text-zinc-950 dark:text-[#f3f4f6] font-sans select-none scroll-mt-20 pt-24 pb-16 lg:pt-28 lg:pb-20 min-h-screen"
    >
      {/* ================= PHOTOREALISTIC GALLERY ROOM BACKGROUND (IMAGE ONLY) ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dark Mode Interior Gallery Wall */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/certifications/gallery-wall-dark.jpg"
          alt="Architectural Gallery Wall Interior"
          className="hidden dark:block w-full h-full object-cover object-top opacity-95 filter contrast-[1.02] brightness-[0.98]"
        />

        {/* Light Mode Interior Gallery Wall */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/certifications/gallery-wall-light.jpg"
          alt="Architectural Gallery Wall Interior"
          className="block dark:hidden w-full h-full object-cover object-top opacity-95 filter contrast-[1.0] brightness-[1.0]"
        />

        {/* Subtle Top & Bottom Seamless Section Blend Gradients */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/95 dark:from-black/95 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/95 dark:from-black/95 to-transparent pointer-events-none" />
      </div>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="space-y-2 max-w-xl">
            {/* Tagline */}
            <p className="font-mono text-xs font-bold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase drop-shadow-xs">
              {"// 05. CREDENTIALS & ACCOMPLISHMENTS"}
            </p>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-zinc-950 dark:text-white tracking-tight leading-none drop-shadow-xs">
              Certifications
            </h2>

            {/* Purple Accent Bar */}
            <div className="w-12 h-1 bg-[#8b5cf6] rounded-full mt-2" />

            {/* Subtitle Description */}
            <p className="text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium leading-relaxed max-w-lg pt-1.5 drop-shadow-xs">
              A curated archive of accredited technical certifications, specializations, and hackathon accomplishments validating industry expertise.
            </p>
          </div>

          {/* Interactive Category Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Category Filter Pills (All categories included with counts) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none p-1.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-md max-w-full">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setActiveCategory(cat.value);
                      setSpotlightIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                        isActive
                          ? "bg-white/20 dark:bg-black/20 text-white dark:text-zinc-950"
                          : "bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSpotlightIndex(0);
                }}
                placeholder="Search credentials, skills..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Results Status Row */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-6 px-1">
          <p>
            Showing <span className="font-bold text-zinc-950 dark:text-zinc-50">{filteredCertificates.length}</span> of{" "}
            <span className="font-bold text-zinc-950 dark:text-zinc-50">{CERTIFICATIONS_DATA.length}</span> credentials
            {activeCategory !== "All" && (
              <span> in <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeCategory}</span></span>
            )}
            {searchQuery.trim() && (
              <span> matching &quot;<span className="text-[#8b5cf6] dark:text-[#a855f7] font-semibold">{searchQuery}</span>&quot;</span>
            )}
          </p>

          {(activeCategory !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* ================= CODE-GENERATED HANGING FRAMES WALL GRID ================= */}
        {filteredCertificates.length === 0 ? (
          /* Empty Search Fallback */
          <div className="p-12 text-center rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 max-w-md mx-auto my-12 space-y-3">
            <FileCheck className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">No credentials match filter</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Try changing the category or clearing the search query.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-mono font-bold shadow-md hover:bg-emerald-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-7 lg:gap-x-8 gap-y-8 sm:gap-y-10 items-start">
            {filteredCertificates.map((cert, idx) => (
              <InteractiveCertificateFrame
                key={cert.id}
                item={cert}
                index={idx}
                onSelect={(item) => setSelectedCertificate(item)}
              />
            ))}
          </div>
        )}

      </div>

      {/* ================= CREDENTIAL AUTHENTICATION MODAL ================= */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
