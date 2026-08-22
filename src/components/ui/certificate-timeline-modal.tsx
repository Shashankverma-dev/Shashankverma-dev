"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CertificationItem, CERTIFICATIONS_DATA } from "@/data/certifications";
import { X, Calendar, Award, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";

interface CertificateTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCertificate: (cert: CertificationItem) => void;
}

export function CertificateTimelineModal({
  isOpen,
  onClose,
  onSelectCertificate,
}: CertificateTimelineModalProps) {
  if (!isOpen) return null;

  // Group certifications by year in descending order
  const years = Array.from(new Set(CERTIFICATIONS_DATA.map((c) => c.year))).sort(
    (a, b) => b - a
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-50">
                Certifications Timeline (2022 – 2026)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close timeline modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Timeline Area */}
          <div className="overflow-y-auto px-6 py-6 space-y-8">
            {years.map((year) => {
              const yearCerts = CERTIFICATIONS_DATA.filter((c) => c.year === year);

              return (
                <div key={year} className="relative">
                  {/* Year Header Marker */}
                  <div className="flex items-center space-x-3 mb-4 sticky top-0 bg-white/95 dark:bg-[#0c0c0e]/95 py-1 z-10">
                    <span className="font-mono text-sm font-black px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      {year}
                    </span>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow" />
                    <span className="font-mono text-xs text-zinc-400">
                      {yearCerts.length} {yearCerts.length === 1 ? "Credential" : "Credentials"}
                    </span>
                  </div>

                  {/* Timeline Cards for this year */}
                  <div className="relative pl-6 border-l-2 border-emerald-500/30 dark:border-emerald-500/20 ml-4 space-y-3">
                    {yearCerts.map((cert) => (
                      <div
                        key={cert.id}
                        onClick={() => {
                          onClose();
                          onSelectCertificate(cert);
                        }}
                        className="group p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] transition-all cursor-pointer relative"
                      >
                        {/* Dot on timeline line */}
                        <div className="absolute -left-[31px] top-5 w-3 h-3 rounded-full bg-white dark:bg-zinc-950 border-2 border-emerald-500 group-hover:scale-125 transition-transform" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                                {cert.category}
                              </span>
                              <span className="font-mono text-xs text-zinc-400">
                                {cert.issueDate}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                              {cert.title}
                            </h4>
                            <p className="font-mono text-xs text-zinc-500 mt-0.5">
                              {cert.issuer}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
                            <span className="flex items-center space-x-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                            <div className="p-1.5 rounded-md text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between font-mono text-xs text-zinc-500 shrink-0">
            <span>&gt; Click any credential to view details &amp; verification document</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-200"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
