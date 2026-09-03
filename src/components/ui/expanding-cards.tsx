"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onChange"> {
  items: CardItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, activeIndex: controlledActiveIndex, onActiveChange, defaultActiveIndex = 0, ...props }, ref) => {
  const [internalActiveIndex, setInternalActiveIndex] = React.useState<number>(defaultActiveIndex);
  const [isDesktop, setIsDesktop] = React.useState(true);

  const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInteraction = (index: number) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    onActiveChange?.(index);
  };

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null || activeIndex === undefined) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "4.5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "4.5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items, isDesktop]);

  return (
    <ul
      className={cn(
        "w-full max-w-6xl gap-2.5 sm:gap-3",
        "grid",
        "h-[520px] sm:h-[560px] md:h-[520px] lg:h-[580px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300",
              "border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-950 text-white",
              "min-h-0 min-w-0 select-none",
              isActive && "ring-1 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)] border-purple-500/40 dark:border-purple-500/50",
              !isActive && "hover:border-zinc-300 dark:hover:border-zinc-700/80 opacity-90 hover:opacity-100"
            )}
            onMouseEnter={() => handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            tabIndex={0}
            data-active={isActive}
            aria-selected={isActive}
            role="tab"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imgSrc}
              alt={item.title}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out",
                isActive
                  ? "scale-100 grayscale-0 brightness-100"
                  : "scale-110 grayscale brightness-75 group-hover:brightness-90"
              )}
            />
            {/* Gradient Overlays */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                isActive
                  ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                  : "bg-black/50 group-hover:bg-black/35"
              )}
            />

            {/* Inactive Vertical Title (Desktop only) */}
            <div
              className={cn(
                "absolute inset-0 hidden md:flex items-center justify-center pointer-events-none transition-opacity duration-300",
                isActive ? "opacity-0 invisible" : "opacity-100 visible"
              )}
            >
              <span className="origin-center -rotate-90 whitespace-nowrap text-xs lg:text-sm font-mono font-semibold tracking-widest text-zinc-300/90 uppercase drop-shadow-md">
                {item.title}
              </span>
            </div>

            {/* Inactive Horizontal Title (Mobile only) */}
            <div
              className={cn(
                "absolute inset-0 flex md:hidden items-center justify-between px-4 pointer-events-none transition-opacity duration-300",
                isActive ? "opacity-0 invisible" : "opacity-100 visible"
              )}
            >
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-200 uppercase truncate">
                {item.title}
              </span>
              <span className="text-zinc-400 font-mono text-[10px]">
                0{index + 1}
              </span>
            </div>

            {/* Active Content Article */}
            <article
              className={cn(
                "absolute inset-0 flex flex-col justify-end p-4 sm:p-5 lg:p-6 transition-all duration-300",
                isActive
                  ? "opacity-100 pointer-events-auto translate-y-0"
                  : "opacity-0 pointer-events-none translate-y-4"
              )}
            >
              <div className="flex items-center gap-2 mb-1.5 text-purple-400">
                <span className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                  {item.icon}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
                  Featured Project
                </span>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                {item.title}
              </h3>

              <p className="mt-1 max-w-md text-xs sm:text-sm text-zinc-300/95 leading-relaxed line-clamp-3 sm:line-clamp-4">
                {item.description}
              </p>

              {item.linkHref && item.linkHref !== "#" && (
                <div className="mt-3 sm:mt-4 flex items-center gap-3">
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";

