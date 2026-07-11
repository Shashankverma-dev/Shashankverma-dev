"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface SpotlightProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  season?: string;
  rating?: number;
  seats?: string;
  priceFrom?: string;
  priceUnit?: string;
  tech: string[];
  github?: string;
  live?: string;
  highlights?: string[];
  /** Hero image URL. If omitted a gradient placeholder is shown. */
  heroImage?: string;
  heroAlt?: string;
  /** CSS object-position value for the hero image crop anchor, e.g. "top", "center", "50% 20%" */
  heroPosition?: string;
  /** Two-line coordinate string, e.g. ["28.61° N", "77.20° E"] */
  coords?: [string, string];
  availabilityLabel?: string;
}

interface ProjectSpotlightCardProps {
  project: SpotlightProject;
  /** 1-indexed position and total count, e.g. [1, 3] */
  position?: [number, number];
  sectionLabel?: string;
  className?: string;
}

/* ─────────────────────────────────────────────
   Toast (self-contained, no portal needed)
───────────────────────────────────────────── */
interface ToastItem {
  id: number;
  title: string;
  body: string;
}

function Toast({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), 4000);
    return () => clearTimeout(t);
  }, [item.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      role="status"
      aria-live="polite"
      className="relative w-[320px] max-w-[90vw] overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-950/95 backdrop-blur-md shadow-2xl"
    >
      <div className="flex gap-3 p-4">
        {/* Icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-100">{item.title}</p>
          <p className="mt-0.5 text-xs text-zinc-400">{item.body}</p>
        </div>

        <button
          onClick={() => onDismiss(item.id)}
          aria-label="Dismiss notification"
          className="self-start text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-emerald-400/20">
        <motion.div
          className="h-full bg-emerald-400"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Floating coordinate badge
───────────────────────────────────────────── */
function CoordBadge({ lines }: { lines: [string, string] }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="text-right text-[10px] uppercase tracking-[0.25em] text-white/70 leading-relaxed select-none font-mono"
    >
      <div>{lines[0]}</div>
      <div>{lines[1]}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function ProjectSpotlightCard({
  project,
  position = [1, 1],
  sectionLabel = "Featured Project",
  className,
}: ProjectSpotlightCardProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastCounter = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const isLive = Boolean(project.live);
  const ctaUrl = project.live ?? project.github;

  const fireToast = useCallback(() => {
    toastCounter.current += 1;
    setToasts((prev) => [
      ...prev,
      {
        id: toastCounter.current,
        title: isLive ? "Opening live app\u2026" : "Opening on GitHub\u2026",
        body: isLive
          ? `Launching ${project.name} on Vercel.`
          : `Redirecting to ${project.name} repository.`,
      },
    ]);
  }, [project.name, isLive]);

  const handlePrimaryAction = useCallback(() => {
    fireToast();
    if (ctaUrl) {
      setTimeout(() => window.open(ctaUrl, "_blank", "noopener,noreferrer"), 600);
    }
  }, [fireToast, ctaUrl]);

  const [posNum, posTotal] = position;
  const posLabel = `0${posNum} of 0${posTotal}`;

  return (
    <>
      {/* ── Eyebrow ── */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-2">
            {sectionLabel} · {posLabel}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
            Where{" "}
            <em className="not-italic italic text-zinc-500 dark:text-zinc-400">code</em>{" "}
            meets creativity.
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-400 text-xs font-mono">
          <span className="h-px w-10 bg-zinc-300 dark:bg-zinc-700" />
          <span>Hover to reveal</span>
        </div>
      </div>

      {/* ── Card shell ── */}
      <motion.article
        tabIndex={0}
        aria-label={`Project spotlight card for ${project.name}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl outline-none",
          "border border-white/10 dark:border-white/[0.07]",
          "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_40px_80px_-30px_rgba(0,0,0,0.5),0_12px_30px_-12px_rgba(0,0,0,0.35)]",
          "focus-visible:ring-2 focus-visible:ring-cyan-400/60",
          className
        )}
      >
        {/* ── Hero image layer ── */}
        <div className="relative h-[420px] sm:h-[520px] w-full overflow-hidden bg-zinc-950">
          {project.heroImage ? (
            <motion.img
              src={project.heroImage}
              alt={project.heroAlt ?? project.name}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: project.heroPosition ?? "center" }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.06, filter: "saturate(1.05) brightness(1.02)" }}
              transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            />
          ) : (
            /* Gradient placeholder when no heroImage provided */
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px 500px at 70% -10%, rgba(6,182,212,0.18) 0%, transparent 60%), radial-gradient(700px 400px at -10% 110%, rgba(139,92,246,0.12) 0%, transparent 55%), #09090b",
              }}
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

          {/* ── Top bar: logo + coords ── */}
          <div className="absolute top-0 inset-x-0 p-5 sm:p-7 flex items-start justify-between">
            {/* Logo badge */}
            <div
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/25 backdrop-blur-md"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 20h18L12 4 3 20z" strokeLinejoin="round" />
                <path d="M9 20l3-5 3 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {project.coords && <CoordBadge lines={project.coords} />}
          </div>

          {/* ── Bottom-right: availability chip + title ── */}
          <div className="absolute bottom-0 right-0 p-5 sm:p-8 text-right max-w-[70%]">
            {project.availabilityLabel && (
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="inline-block rounded-full border border-white/[0.18] bg-white/[0.04] backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 font-mono">
                  {project.availabilityLabel}
                </span>
              </div>
            )}
            <h3 className="font-display text-3xl sm:text-5xl font-semibold text-white drop-shadow-lg leading-none">
              {/* Split words onto separate lines */}
              {project.name.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {word}
                </React.Fragment>
              ))}
            </h3>
          </div>
        </div>

        {/* ── Reveal panel (slides in from left on hover) ── */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-full sm:w-[58%] md:w-[52%] flex items-center",
            // Mobile: always visible
            // sm+: hidden until hover/focus-within on card
            "sm:[transform:translateX(-8%)] sm:opacity-0 sm:pointer-events-none",
            "sm:group-hover:[transform:translateX(0)] sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto",
            "sm:group-focus-within:[transform:translateX(0)] sm:group-focus-within:opacity-100 sm:group-focus-within:pointer-events-auto",
            "transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          )}
        >
          {/* Edge gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(9,9,11,0.92) 70%, rgba(9,9,11,0) 100%)",
            }}
          />

          {/* Scrollable content */}
          <div className="relative p-6 sm:p-9 md:p-11 pr-8 w-full">
            {/* Label row */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-zinc-500" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                {project.category}
              </span>
            </div>

            {/* Sub-headline */}
            <p className="font-display text-2xl sm:text-3xl font-semibold text-zinc-50 mb-2 leading-tight">
              {project.tagline}
            </p>

            <p className="text-sm text-zinc-300/80 leading-relaxed mb-6 max-w-md">
              {project.description}
            </p>

            {/* Meta grid — only rendered when at least one meta value exists */}
            {(project.season || project.rating !== undefined || project.seats) && (
              <div className="grid grid-cols-3 gap-4 mb-7 max-w-md">
                {project.season && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                      Season
                    </p>
                    <p className="text-sm text-zinc-200">{project.season}</p>
                  </div>
                )}
                {project.rating !== undefined && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                      Rating
                    </p>
                    <div className="flex items-center gap-1 text-sm text-zinc-200">
                      {project.rating}
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                )}
                {project.seats && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                      Stack size
                    </p>
                    <p className="text-sm text-zinc-200">{project.seats}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tech tags */}
            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-7">
                {project.tech.map((tc) => (
                  <span
                    key={tc}
                    className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm text-zinc-400"
                  >
                    {tc}
                  </span>
                ))}
              </div>
            )}

            {/* Price / status + CTA */}
            <div className="flex items-end justify-between gap-4 flex-wrap">
              {project.priceFrom ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-1">
                    From
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold text-white">
                      {project.priceFrom}
                    </span>
                    {project.priceUnit && (
                      <span className="text-xs text-zinc-400">{project.priceUnit}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-1">
                    License
                  </p>
                  <p className="font-display text-xl font-semibold text-white">
                    Open Source
                  </p>
                </div>
              )}

              <button
                id={`spotlight-cta-${project.id}`}
                onClick={handlePrimaryAction}
                aria-label={`View ${project.name} on GitHub`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
                  "bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.97]",
                  "transition-all duration-250 hover:tracking-wide",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                )}
              >
                {isLive ? (
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <GithubIcon className="h-4 w-4" />
                )}
                {isLive ? "View Live" : "View Source"}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Decorative vertical divider (appears on hover) ── */}
        <div
          aria-hidden="true"
          className={cn(
            "hidden sm:block absolute inset-y-0 left-[52%] md:left-[48%] w-px pointer-events-none",
            "bg-[linear-gradient(to_bottom,transparent,rgba(232,226,213,0.20),transparent)]",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"
          )}
        />
      </motion.article>

      {/* ── Footer meta ── */}
      <div className="mt-5 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" aria-hidden="true" />
          {project.availabilityLabel ?? "Active"} · Open to contributions
        </span>
        <span>Shashank Verma / Projects</span>
      </div>

      {/* ── Toast stack (fixed bottom-right) ── */}
      <div
        role="region"
        aria-label="Notifications"
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <Toast item={t} onDismiss={dismissToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
