"use client";

import React, { useState } from "react";
import { ShieldCheck, FileText, CheckCircle2, ScanLine } from "lucide-react";
import { CertificationItem } from "@/data/certifications";

interface CertificatePreviewCanvasProps {
  item: CertificationItem;
  className?: string;
  isHovered?: boolean;
}

export function CertificatePreviewCanvas({
  item,
  className = "",
  isHovered = false,
}: CertificatePreviewCanvasProps) {
  const [imageError, setImageError] = useState(false);
  const { previewImage, title, issuer, issueDate } = item;

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#09090b] select-none flex flex-col justify-center items-center group/preview ${className}`}
    >
      {/* Real Certificate Image with smooth scale & lighting */}
      {previewImage && !imageError ? (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-zinc-950">
          <img
            src={previewImage}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[0.97] transition-all duration-700 ease-out group-hover/preview:scale-[1.04] group-hover/preview:brightness-[1.02]"
            loading="lazy"
          />

          {/* Dark gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none opacity-60 group-hover/preview:opacity-30 transition-opacity duration-500" />

          {/* High-tech Laser Scan Beam on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 overflow-hidden">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-[scan_2s_ease-in-out_infinite]" />
          </div>

          {/* Top floating issuer tag */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md text-zinc-100 border border-white/15 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{issuer}</span>
            </span>
          </div>

          {/* Top right verified seal with ping pulse */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center justify-center">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
              <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 text-black items-center justify-center shadow-lg shadow-emerald-500/40 border border-emerald-300 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </span>
          </div>

          {/* Bottom HUD info bar overlay on image */}
          <div className="absolute bottom-0 inset-x-0 px-3 py-1.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-[9px] font-mono text-zinc-400 opacity-85 group-hover/preview:opacity-100 transition-opacity">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span className="tracking-wider uppercase text-[8.5px] font-semibold text-zinc-300">AUTHENTIC // VERIFIED</span>
            </span>
            <span className="text-zinc-400 uppercase text-[8.5px]">{issueDate}</span>
          </div>

          {/* Cyber reticle corner markers */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />
        </div>
      ) : (
        /* Fallback stylized card if image fails */
        <div className="relative w-full h-full p-4 flex flex-col justify-between bg-zinc-950 text-white">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase">{issuer}</span>
            <FileText className="w-4 h-4 text-zinc-500" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-zinc-100 line-clamp-2">{title}</h4>
            <p className="font-mono text-[9px] text-zinc-400 uppercase mt-1">ISSUED: {issueDate}</p>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED DOCUMENT</span>
          </div>
        </div>
      )}
    </div>
  );
}
