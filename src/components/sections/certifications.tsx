"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Award,
} from "lucide-react";
import { CERTIFICATIONS_DATA, CertificationItem } from "@/data/certifications";
import { CertificatePreviewCanvas } from "../ui/certificate-preview-canvas";
import { CertificateModal } from "../ui/certificate-modal";

export function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);

  return (
    <section
      id="certifications"
      className="py-28 relative overflow-hidden border-t border-zinc-150 dark:border-zinc-900/60 bg-white dark:bg-[#030304] selection:bg-emerald-500/20 selection:text-emerald-500 font-sans"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Micro Grid Pattern */}
      <div className="absolute inset-0 terminal-grid-light dark:terminal-grid-dark opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
            <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>{"// 05. CREDENTIALS & ACCOMPLISHMENTS"}</span>
            </p>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Certifications
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans flex items-center flex-wrap">
            <span>
              A curated archive of accredited technical certifications, specializations, and hackathon accomplishments validating industry expertise.
            </span>
            <span className="inline-block w-2 h-4 bg-emerald-500 ml-1.5 animate-pulse" />
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <CertificateSpotlightCard
              key={cert.id}
              cert={cert}
              index={index}
              onSelect={() => setSelectedCertificate(cert)}
            />
          ))}
        </div>

        {/* Terminal Quotes Footer Bar */}
        <div className="mt-20 pt-6 border-t border-zinc-150 dark:border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 dark:text-zinc-600 font-mono text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-500 font-bold">&gt;</span>
            <span className="tracking-wide">keep learning, keep growing...</span>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-400 dark:text-zinc-500">
            <span className="text-emerald-500 font-bold">&gt;</span>
            <span>
              <span className="text-cyan-500 dark:text-cyan-400">const</span> success = progress + consistency;
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Detailed Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Interactive Mouse-Tracking Spotlight Card Component
───────────────────────────────────────────────────────────── */
interface CertificateSpotlightCardProps {
  cert: CertificationItem;
  index: number;
  onSelect: () => void;
}

function CertificateSpotlightCard({ cert, index, onSelect }: CertificateSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className="group relative rounded-2xl bg-white dark:bg-[#0c0c0f] border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm hover:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.12), transparent 80%)`,
        }}
      />

      {/* Cyber Reticle Corner Accents */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-zinc-400/40 dark:border-zinc-700 pointer-events-none z-20" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-zinc-400/40 dark:border-zinc-700 pointer-events-none z-20" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-zinc-400/40 dark:border-zinc-700 pointer-events-none z-20" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-zinc-400/40 dark:border-zinc-700 pointer-events-none z-20" />

      {/* Top Document Preview with Scan Effect */}
      <div className="overflow-hidden bg-zinc-950 relative">
        <CertificatePreviewCanvas item={cert} isHovered={isHovered} />
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3 z-10">
        <div>
          {/* Category Chip */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold tracking-wider uppercase">
              {cert.category}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-zinc-400" />
              <span>{cert.issueDate}</span>
            </span>
          </div>

          {/* Certificate Title */}
          <h3
            className="font-sans text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2"
            title={cert.title}
          >
            {cert.title}
          </h3>

          {/* Issuer Subtitle */}
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            {cert.issuer}
          </p>

          {/* Micro Skills Badges */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {cert.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 truncate max-w-[120px]"
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-zinc-100/50 dark:bg-zinc-800/40 text-zinc-400">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Action Strip */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-150 dark:border-zinc-800/70">
          <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>VERIFIED</span>
          </div>

          <div className="flex items-center space-x-1 text-[11px] font-mono font-semibold text-zinc-400 group-hover:text-emerald-500 transition-colors">
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
