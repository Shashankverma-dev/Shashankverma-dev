"use client";

import React, { useState } from "react";
import { ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { CertificationItem } from "@/data/certifications";

interface CertificatePreviewCanvasProps {
  item: CertificationItem;
  className?: string;
  isHovered?: boolean;
}

export function CertificatePreviewCanvas({
  item,
  className = "",
}: CertificatePreviewCanvasProps) {
  const [imageError, setImageError] = useState(false);
  const { previewImage, title, issuer, issueDate } = item;

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-zinc-950 select-none flex flex-col justify-center items-center group/preview ${className}`}
    >
      {/* Real Certificate Image with Full Clarity & Natural Bounds */}
      {previewImage && !imageError ? (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-zinc-950 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewImage}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-md filter contrast-[1.02] brightness-[1.0] transition-all duration-300"
            loading="lazy"
          />

          {/* Top-left issuer badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/85 backdrop-blur-md text-zinc-100 border border-white/20 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{issuer}</span>
            </span>
          </div>

          {/* Top-right verified seal */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider text-[10px]">Verified Credential</span>
            </span>
          </div>

          {/* Bottom HUD info bar */}
          <div className="absolute bottom-0 inset-x-0 px-4 py-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span className="tracking-wider uppercase font-semibold text-zinc-200">OFFICIAL LEDGER RECORD</span>
            </span>
            <span className="text-zinc-300 uppercase">{issueDate}</span>
          </div>
        </div>
      ) : (
        /* Fallback card if image fails */
        <div className="relative w-full h-full p-6 flex flex-col justify-between bg-zinc-950 text-white">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase">{issuer}</span>
            <FileText className="w-5 h-5 text-zinc-500" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-zinc-100 line-clamp-2">{title}</h4>
            <p className="font-mono text-xs text-zinc-400 uppercase mt-1">ISSUED: {issueDate}</p>
          </div>
          <div className="flex items-center space-x-1 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED DOCUMENT</span>
          </div>
        </div>
      )}
    </div>
  );
}
