"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CertificationItem } from "@/data/certifications";
import { CertificatePreviewCanvas } from "./certificate-preview-canvas";
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  Calendar, 
  Building2, 
  Sparkles,
  Eye
} from "lucide-react";

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    if (certificate.credentialId) {
      navigator.clipboard.writeText(certificate.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                Credential Authentication
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto flex-grow p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Certificate Graphic / Document Preview */}
            <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <CertificatePreviewCanvas item={certificate} className="aspect-[16/9]" />
            </div>

            {/* Title & Issuer Row */}
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                  {certificate.category}
                </span>
                <span className="flex items-center space-x-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Officially Verified</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                {certificate.title}
              </h3>
            </div>

            {/* Metadata Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center space-x-1.5 text-zinc-400 font-mono text-[10px] uppercase tracking-wider mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Issuer</span>
                </div>
                <p className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                  {certificate.issuer}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center space-x-1.5 text-zinc-400 font-mono text-[10px] uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Issue Date</span>
                </div>
                <p className="font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                  {certificate.issueDate}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center space-x-1.5 text-zinc-400 font-mono text-[10px] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Status</span>
                </div>
                <p className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Valid & Active</span>
                </p>
              </div>
            </div>

            {/* Description */}
            {certificate.description && (
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {certificate.description}
              </p>
            )}

            {/* Skills Tags */}
            {certificate.skills && certificate.skills.length > 0 && (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-2">
                  Skills Validated
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Credential ID Copy Field */}
            {certificate.credentialId && (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
                <div className="flex items-center space-x-2 truncate mr-2">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider">ID:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold truncate">
                    {certificate.credentialId}
                  </span>
                </div>
                <button
                  onClick={handleCopyId}
                  className="flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Pinned Footer Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 border-t border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
            {certificate.filePath && (
              <a
                href={certificate.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Document</span>
              </a>
            )}

            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
