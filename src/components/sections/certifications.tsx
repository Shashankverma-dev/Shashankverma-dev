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

  const categories: { label: string; value: string; count: number }[] = useMemo(() => {
    const counts: Record<string, number> = { All: CERTIFICATIONS_DATA.length };
    CERTIFICATIONS_DATA.forEach((cert) => {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    });

    const uniqueCategories = Array.from(new Set(CERTIFICATIONS_DATA.map((c) => c.category)));

    return [
      { label: "All", value: "All", count: CERTIFICATIONS_DATA.length },
      ...uniqueCategories.map((cat) => ({
        label: cat,
        value: cat,
        count: counts[cat] || 0,
      })),
    ];
  }, []);

  const filteredCertificates = useMemo(() => {
    const list = CERTIFICATIONS_DATA.filter((cert) => {
      const matchesCategory = activeCategory === "All" || cert.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // If "All" category is active and no search query, display the 8 featured credentials
    if (activeCategory === "All" && searchQuery.trim() === "") {
      return list.slice(0, 8);
    }

    return list;
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
        
        {/* ================= SECTION HEADER (MATCHING REFERENCE IMAGE) ================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 sm:mb-10">
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none p-1 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-md">
              {categories.slice(0, 4).map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setActiveCategory(cat.value);
                      setSpotlightIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSpotlightIndex(0);
                }}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/75 dark:bg-zinc-900/75 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* ================= CODE-GENERATED HANGING FRAMES WALL GRID (4x2 MATCHING REFERENCE) ================= */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-7 lg:gap-x-8 gap-y-6 sm:gap-y-8 items-start">
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
