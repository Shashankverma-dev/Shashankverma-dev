"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  User,
  Cpu,
  Zap,
  Code2,
  Heart,
  Mail,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Wifi,
  ExternalLink,
  CheckCircle2,
  Code,
  Mouse,
} from "lucide-react";

interface TabletAboutTransitionProps {
  isLoaded?: boolean;
}

export function TabletAboutTransition({ isLoaded = true }: TabletAboutTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Screen size detection for responsive animation calibration
  const [screenSize, setScreenSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isLampOn, setIsLampOn] = useState<boolean>(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    try {
      const saved = localStorage.getItem("desk_lamp");
      if (saved !== null) {
        setIsLampOn(saved === "true");
      }
    } catch (e) {}

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toggleLamp = () => {
    setIsLampOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("desk_lamp", String(next));
      } catch (e) {}
      return next;
    });
  };

  // Runway scroll height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calibrated buttery smooth inertia spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.15,
    restDelta: 0.0005,
  });

  const isMobile = screenSize === "mobile";
  const isTab = screenSize === "tablet";

  // Scroll trigger helper for CTA buttons / navigation
  const scrollToAbout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (containerRef.current) {
      const targetTop = containerRef.current.offsetTop + window.innerHeight * 1.5;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };

  // ================= 1. HERO MONITOR TEXT TRANSFORMS =================
  const heroContentOpacity = useTransform(smoothProgress, [0, 0.06, 0.15], [1, 0.8, 0]);
  const heroContentY = useTransform(smoothProgress, [0, 0.15], ["0px", "-24px"]);
  const heroContentScale = useTransform(smoothProgress, [0, 0.15], [1, 0.94]);
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0]);

  // ================= 2. DESK CAMERA ZOOM & PARALLAX =================
  const deskBgOpacity = useTransform(smoothProgress, [0, 0.14, 0.28], [1, 0.5, 0]);
  const deskBgScale = useTransform(
    smoothProgress,
    [0, 0.18, 0.36],
    isMobile ? [1.5, 2.0, 3.2] : isTab ? [1.2, 1.55, 2.6] : [1.0, 1.35, 2.2]
  );
  const deskBgX = useTransform(
    smoothProgress,
    [0, 0.36],
    isMobile ? ["0vw", "-10vw"] : ["0vw", "-8vw"]
  );
  const deskBgY = useTransform(
    smoothProgress,
    [0, 0.36],
    isMobile ? ["-2vh", "-6vh"] : ["0vh", "-4vh"]
  );
  const deskBgBlur = useTransform(
    smoothProgress,
    [0, 0.12, 0.28],
    ["blur(0px)", "blur(3px)", "blur(14px)"]
  );

  // ================= 3. TABLET 3D FLIGHT, SMOOTH MORPH & FULLSCREEN =================
  // Smooth translation from desk coordinates to exact center
  const tabletX = useTransform(
    smoothProgress,
    [0, 0.14, 0.32],
    isMobile ? ["28.0vw", "5.0vw", "0vw"] : ["30.5vw", "5.0vw", "0vw"]
  );
  const tabletY = useTransform(
    smoothProgress,
    [0, 0.14, 0.32],
    isMobile ? ["15.0vh", "2.0vh", "0vh"] : ["10.0vh", "1.5vh", "0vh"]
  );

  // 3D perspective orientation: perfectly upright (zero tilt) matching the desktop monitor
  const tabletRotateX = useTransform(smoothProgress, [0, 0.12, 0.30], [0, 0, 0]);
  const tabletRotateY = useTransform(smoothProgress, [0, 0.12, 0.30], [0, 0, 0]);
  const tabletRotateZ = useTransform(smoothProgress, [0, 0.12, 0.30], [0, 0, 0]);

  // Smooth continuous dimensions scaling directly into 100vw x 100vh with zero gaps
  const tabletWidth = useTransform(
    smoothProgress,
    [0, 0.14, 0.32],
    isMobile
      ? ["155px", "320px", "100vw"]
      : isTab
      ? ["220px", "520px", "100vw"]
      : ["260px", "680px", "100vw"]
  );
  const tabletHeight = useTransform(
    smoothProgress,
    [0, 0.14, 0.32],
    isMobile
      ? ["215px", "430px", "100vh"]
      : isTab
      ? ["310px", "500px", "100vh"]
      : ["360px", "540px", "100vh"]
  );
  const tabletScale = useTransform(
    smoothProgress,
    [0, 0.12, 0.32],
    [1, 1.02, 1]
  );

  // Smooth dissolution of hardware borders into full viewport edges
  const tabletRadius = useTransform(
    smoothProgress,
    [0, 0.18, 0.32],
    isMobile ? ["18px", "8px", "0px"] : ["24px", "10px", "0px"]
  );
  const bezelPadding = useTransform(
    smoothProgress,
    [0, 0.18, 0.32],
    isMobile ? ["4px", "1.5px", "0px"] : ["5px", "2px", "0px"]
  );
  const innerRadius = useTransform(
    smoothProgress,
    [0, 0.18, 0.32],
    isMobile ? ["14px", "7px", "0px"] : ["20px", "8px", "0px"]
  );
  const hardwareOpacity = useTransform(smoothProgress, [0.06, 0.20], [1, 0]);

  const tabletShadow = useTransform(
    smoothProgress,
    [0, 0.14, 0.32],
    [
      "0 24px 60px -10px rgba(0,0,0,0.75), 0 10px 24px -5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.25)",
      "0 28px 60px -10px rgba(0,0,0,0.4), 0 0 30px rgba(16,185,129,0.1)",
      "none"
    ]
  );

  // ================= 4. SEAMLESS CONTENT CROSSFADE (NO BLACK SCREEN GAP) =================
  // Mini preview smoothly dissolves out while bento card blooms in with graceful overlap
  const miniPreviewOpacity = useTransform(smoothProgress, [0.02, 0.15], [1, 0]);
  const miniPreviewScale = useTransform(smoothProgress, [0.02, 0.15], [1, 0.94]);
  const miniPreviewPointer = useTransform(smoothProgress, (v) => (v < 0.08 ? "auto" : "none"));

  const fullAboutOpacity = useTransform(smoothProgress, [0.08, 0.24], [0, 1]);
  const fullAboutScale = useTransform(smoothProgress, [0.08, 0.32], [0.94, 1.0]);
  const fullAboutPointer = useTransform(smoothProgress, (v) => (v > 0.16 ? "auto" : "none"));

  const headerY = useTransform(smoothProgress, [0.10, 0.24], ["-16px", "0px"]);
  const headerOpacity = useTransform(smoothProgress, [0.10, 0.22], [0, 1]);

  const cardsY = useTransform(smoothProgress, [0.12, 0.26], ["20px", "0px"]);
  const cardsOpacity = useTransform(smoothProgress, [0.10, 0.24], [0, 1]);

  const stats = [
    { label: "BCA Semester", value: "Active", sub: "SRH University" },
    { label: "Core Languages", value: "3+", sub: "C, Python, Java" },
    { label: "Academic Projects", value: "3+", sub: "Developed so far" },
    { label: "Office Tech", value: "Expert", sub: "Word, Excel, PPT" },
  ];

  // Static Reduced Motion Fallback
  if (shouldReduceMotion) {
    return (
      <div className="w-full bg-[#fafafc] dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-50">
        <section className="relative min-h-screen flex items-center justify-center p-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight">
              Shashank Verma
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              BCA Student &amp; Developer passionate about Software Engineering &amp; Data Science.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold"
              >
                Explore About Me
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
              >
                Contact
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-2">About Myself</h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm">
              Swami Rama Himalayan University • Batch of 2026
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xl font-bold mb-3">Biography</h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                I am a hardworking BCA student at Swami Rama Himalayan University with a motivated attitude and a variety of powerful skills. Adept at problem solving, programming basics, data analysis, and office technology programs.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Committed to learning and contributing expertise in a dynamic environment of software development, data science, and web technologies. Creator of{" "}
                <strong className="text-emerald-500 font-semibold">Rateme</strong>—a review collection platform.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xl font-bold mb-3">System Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <p className="text-xl font-bold font-mono">{s.value}</p>
                    <p className="text-xs text-zinc-500 uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-transition-container="true"
      className={`relative w-full ${
        isMobile ? "h-[250vh]" : "h-[280vh]"
      } bg-[#fafafc] dark:bg-[#090a0f] transition-colors duration-500`}
    >
      {/* Sticky Fullscreen Camera Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* ================= 1. DESK HERO BACKGROUND & 3D WORKSPACE LAYER ================= */}
        <motion.div
          style={{
            opacity: deskBgOpacity,
            scale: deskBgScale,
            x: deskBgX,
            y: deskBgY,
            filter: deskBgBlur,
            willChange: "transform, opacity, filter",
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0"
        >
          <div className="relative w-full max-w-[1920px] mx-auto flex items-center justify-center">
            {/* Main Desk Setup Visual */}
            <img
              src="/hero-bg.png"
              alt="Developer Workspace"
              className={`w-full h-auto block select-none transition-all duration-700 ${
                isLampOn
                  ? "dark:brightness-[0.88] dark:contrast-[1.06] dark:saturate-[1.05] dark:sepia-[0.08] dark:opacity-100"
                  : "dark:brightness-[0.03] dark:contrast-[1.8] dark:saturate-[0.1] dark:opacity-20"
              }`}
              draggable={false}
            />

            {/* Directional Lamp Light Beam */}
            {isLampOn && (
              <div className="absolute inset-0 w-full h-full pointer-events-none z-15 hidden dark:block overflow-hidden transition-opacity duration-700">
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700"
                  style={{
                    background:
                      "radial-gradient(ellipse 85% 70% at 20% 36%, rgba(255, 245, 215, 0.35) 0%, rgba(254, 230, 165, 0.20) 30%, rgba(251, 191, 36, 0.06) 60%, transparent 80%), linear-gradient(108deg, rgba(255, 245, 215, 0.20) 0%, rgba(254, 230, 165, 0.12) 35%, rgba(245, 158, 11, 0.02) 65%, transparent 85%)",
                    mixBlendMode: "screen",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "12%",
                    top: "50%",
                    width: "58%",
                    height: "44%",
                    transform: "rotate(-6deg)",
                    background:
                      "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(255, 240, 200, 0.35) 0%, rgba(254, 220, 140, 0.18) 35%, rgba(245, 158, 11, 0.03) 70%, transparent 100%)",
                    mixBlendMode: "screen",
                    filter: "blur(12px)",
                  }}
                />
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.65) 9%, rgba(0, 0, 0, 0.20) 18%, transparent 28%), linear-gradient(to bottom, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.20) 16%, transparent 32%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            )}

            {/* Lamp Toggle Trigger Button */}
            <button
              type="button"
              onClick={toggleLamp}
              title={isLampOn ? "Click lamp to turn light OFF" : "Click lamp to turn light ON"}
              className="absolute left-[5%] top-[8%] w-[22%] h-[52%] z-30 pointer-events-auto cursor-pointer focus:outline-none select-none bg-transparent"
            />

            {!isLampOn && (
              <div
                onClick={toggleLamp}
                className="absolute inset-0 w-full h-full z-25 pointer-events-auto cursor-pointer hidden dark:block select-none"
              />
            )}

            {/* Hero Monitor Screen Content */}
            <motion.div
              style={{
                opacity: heroContentOpacity,
                y: heroContentY,
                scale: heroContentScale,
                willChange: "transform, opacity",
              }}
              className={`absolute left-[33.0%] top-[22.5%] w-[36.5%] h-[34.5%] z-20 flex flex-col items-center justify-center p-1 sm:p-2.5 md:p-3 overflow-hidden rounded-2xl subpixel-antialiased select-text transition-all duration-700 ${
                isLampOn
                  ? "pointer-events-auto bg-transparent opacity-100"
                  : "pointer-events-none bg-transparent opacity-100 dark:opacity-0 dark:hidden"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-0.5 sm:space-y-1.5 md:space-y-3 py-0.5">
                <motion.h1
                  initial={{ opacity: 0, y: 6 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-display text-[12px] sm:text-[20px] md:text-[28px] lg:text-[36px] xl:text-[40px] font-black tracking-tight leading-tight text-zinc-900 transition-colors"
                >
                  Shashank Verma
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[7.5px] sm:text-[11px] md:text-[14px] lg:text-[16px] text-zinc-700 font-medium max-w-[420px] line-clamp-2 leading-relaxed"
                >
                  BCA Student &amp; Developer passionate about Software Engineering &amp; Data Science.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2 pt-0.5"
                >
                  <button
                    onClick={scrollToAbout}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-md sm:rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 text-[8px] sm:text-[11px] md:text-[13px] font-semibold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Explore About Me</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-md sm:rounded-lg bg-zinc-200/80 hover:bg-zinc-300 text-zinc-900 text-[8px] sm:text-[11px] md:text-[13px] font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Mail className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    <span>Contact</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* ================= PHYSICALLY GROUNDED ANODIZED ALUMINUM DESK STAND ================= */}
            {/* Sits flush on the desk surface right beneath the resting tablet at (80.5% x, 68.5% y) */}
            <div 
              className={`absolute left-[78.0%] sm:left-[79.5%] md:left-[80.5%] top-[63.0%] sm:top-[64.5%] md:top-[65.5%] z-18 pointer-events-none select-none flex flex-col items-center -translate-x-1/2 transition-all duration-300 ${
                isLampOn ? "opacity-100" : "dark:opacity-0 dark:invisible"
              }`}
            >
              {/* Natural desk contact drop shadow cast towards back-right from lamp */}
              <div 
                className="w-44 sm:w-52 md:w-56 h-6 sm:h-7 rounded-full blur-[5px] pointer-events-none opacity-40 dark:opacity-75"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 60%, transparent 80%)",
                  transform: "translateY(84px) translateX(6px)",
                }}
              />

              {/* Precision Vector Aluminum Stand */}
              <svg 
                width="170" 
                height="100" 
                viewBox="0 0 170 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm overflow-visible"
              >
                {/* Aluminum Base Plate (Perspective Oval on desk) */}
                <ellipse cx="85" cy="85" rx="66" ry="11" className="fill-slate-300 dark:fill-slate-700 stroke-white/60 dark:stroke-white/20" strokeWidth="1" />
                <ellipse cx="85" cy="83.5" rx="64" ry="9.5" className="fill-slate-200 dark:fill-slate-800" />
                <ellipse cx="85" cy="82.5" rx="58" ry="7.5" className="fill-slate-100 dark:fill-slate-600 opacity-90" />

                {/* Silicone desk pad ring on base */}
                <ellipse cx="85" cy="83.5" rx="26" ry="3.5" className="fill-slate-400/30 dark:fill-slate-900/70" />

                {/* Angled Cantilever Aluminum Support Stem */}
                <path 
                  d="M74 83 L77 34 C77 28 93 28 93 34 L96 83 Z" 
                  className="fill-slate-300 dark:fill-slate-700 stroke-white/40 dark:stroke-white/20"
                  strokeWidth="0.8"
                />
                <path 
                  d="M79 81 L81 35 C81 31 89 31 89 35 L91 81 Z" 
                  className="fill-slate-200 dark:fill-slate-600 opacity-70"
                />

                {/* CNC Cable Routing Pass-Through Hole */}
                <ellipse cx="85" cy="56" rx="4.5" ry="9" className="fill-slate-800 dark:fill-slate-950 stroke-black/30 dark:stroke-white/10" strokeWidth="0.5" />
                <ellipse cx="85" cy="56" rx="3" ry="7" className="fill-black/40 dark:fill-black/80" />

                {/* Swivel Pivot Joint Hub */}
                <circle cx="85" cy="30" r="7.5" className="fill-slate-400 dark:fill-slate-600 stroke-white/30" strokeWidth="0.8" />
                <circle cx="85" cy="30" r="3.5" className="fill-slate-300 dark:fill-slate-500" />

                {/* Cradle Mounting Backplate */}
                <rect x="48" y="26" width="74" height="8" rx="3" className="fill-slate-400 dark:fill-slate-700 stroke-white/30" strokeWidth="0.8" />
                <rect x="52" y="27.5" width="66" height="5" rx="2" className="fill-slate-800/80 dark:fill-slate-900" />

                {/* Left Cradle Hook with Silicone Cushion */}
                <path d="M56 34 L56 24 C56 22 62 22 62 24 L62 34 Z" className="fill-slate-300 dark:fill-slate-600" />
                <rect x="57.5" y="23" width="3" height="3" rx="1" className="fill-emerald-500/80" />

                {/* Right Cradle Hook with Silicone Cushion */}
                <path d="M108 34 L108 24 C108 22 114 22 114 24 L114 34 Z" className="fill-slate-300 dark:fill-slate-600" />
                <rect x="109.5" y="23" width="3" height="3" rx="1" className="fill-emerald-500/80" />
              </svg>
            </div>

          </div>
        </motion.div>

        {/* ================= BACKDROP DIMMING LAYER (SEAMLESS FULL-BLEED THEME TRANSITION) ================= */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.04, 0.18], [0, 1]) }}
          className="absolute inset-0 bg-[#fafafc] dark:bg-[#090a0f] pointer-events-none z-10"
        />

        {/* ================= 2. THE DYNAMIC TABLET (LIFTS OFF STAND, ZOOMS & EXPANDS TO FULLSCREEN) ================= */}
        <motion.div
          style={{
            x: tabletX,
            y: tabletY,
            scale: tabletScale,
            width: tabletWidth,
            height: tabletHeight,
            rotateX: tabletRotateX,
            rotateY: tabletRotateY,
            rotateZ: tabletRotateZ,
            borderRadius: tabletRadius,
            boxShadow: tabletShadow,
            transformOrigin: "center center",
            willChange: "transform, width, height, border-radius, box-shadow",
            background: "linear-gradient(145deg, #1e2029 0%, #13151d 50%, #0a0b10 100%)",
          }}
          className={`relative overflow-hidden flex flex-col z-30 pointer-events-auto transition-all duration-300 ${
            isLampOn ? "opacity-100" : "dark:opacity-0 dark:invisible"
          }`}
        >
          {/* Subtle aluminum chamfer side rail reflection */}
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1]"
            style={{
              boxShadow:
                "inset 0 0.5px 0 rgba(255,255,255,0.22), inset 0 -0.5px 0 rgba(0,0,0,0.5), inset 0.5px 0 0 rgba(255,255,255,0.1), inset -0.5px 0 0 rgba(255,255,255,0.1)",
            }}
          />

          {/* Hardware Chassis Elements (Microphone, front camera hole punch) */}
          <motion.div style={{ opacity: hardwareOpacity }} className="pointer-events-none">
            <div className="absolute -top-[1px] right-8 w-5 h-[1px] bg-gradient-to-r from-[#3a3d4d] via-[#5c6075] to-[#3a3d4d] rounded-t-xs z-50" />
            <div className="absolute top-8 -right-[1px] w-[1px] h-4 bg-gradient-to-b from-[#3a3d4d] via-[#5c6075] to-[#3a3d4d] rounded-r-xs z-50" />
            <div className="absolute top-14 -right-[1px] w-[1px] h-4 bg-gradient-to-b from-[#3a3d4d] via-[#5c6075] to-[#3a3d4d] rounded-r-xs z-50" />
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40">
              <div className="w-[5px] h-[5px] rounded-full bg-[#0a0b0e] ring-[0.5px] ring-zinc-600/50 flex items-center justify-center">
                <div className="w-[2px] h-[2px] rounded-full bg-[#0c4a6e] ring-[0.3px] ring-cyan-400/40" />
              </div>
            </div>
          </motion.div>

          {/* Precision Glass Bezel */}
          <motion.div
            style={{
              padding: bezelPadding,
              willChange: "padding",
            }}
            className="relative w-full h-full flex flex-col overflow-hidden bg-[#050507] transition-colors duration-300"
          >
            {/* Active Display Surface with Subtle Ambient Bloom */}
            <motion.div
              style={{
                borderRadius: innerRadius,
                transformStyle: "flat",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                willChange: "border-radius",
              }}
              className="relative w-full h-full bg-[#fafafc] dark:bg-[#090a0f] overflow-hidden flex flex-col transition-colors duration-300"
            >
              {/* Glass subtle ambient corner backlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* ================= LAYER A: MINI iOS PROFILE (PORTRAIT DESK VIEW) ================= */}
              <motion.div
                style={{
                  opacity: miniPreviewOpacity,
                  scale: miniPreviewScale,
                  pointerEvents: miniPreviewPointer as any,
                  transformStyle: "flat",
                  willChange: "opacity, transform",
                }}
                className="absolute inset-0 p-2 sm:p-2.5 flex flex-col gap-[4px] sm:gap-[5px] bg-[#ffffff] dark:bg-gradient-to-b dark:from-[#f7f2e7] dark:via-[#efe7d6] dark:to-[#e8decb] text-zinc-950 dark:text-[#1c1917] select-none overflow-hidden transition-colors duration-300 antialiased"
              >
                {/* iOS Status Bar */}
                <div className="flex items-center justify-between px-0.5 shrink-0">
                  <span className="font-semibold text-zinc-950 dark:text-[#1c1917] text-[9px] sm:text-[10px] font-sans tracking-tight">
                    9:41
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-end gap-[1.5px] h-[9px]">
                      <div className="w-[2px] h-[3px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      <div className="w-[2px] h-[5px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      <div className="w-[2px] h-[7px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      <div className="w-[2px] h-[9px] bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                    </div>
                    <Wifi className="w-3 h-3 text-zinc-950 dark:text-[#1c1917]" strokeWidth={2.5} />
                    <div className="flex items-center">
                      <div className="w-[16px] h-[8px] rounded-[2.5px] border-[1.2px] border-zinc-700 dark:border-[#44403c] flex items-center p-[1px]">
                        <div className="w-[75%] h-full bg-zinc-950 dark:bg-[#1c1917] rounded-[0.5px]" />
                      </div>
                      <div className="w-[1.2px] h-[3.5px] bg-zinc-700 dark:bg-[#44403c] rounded-r-sm ml-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* Profile Card */}
                <div className="p-1.5 sm:p-2 rounded-[9px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-zinc-900 dark:bg-[#1c1917] text-white dark:text-[#fbf9f4] flex items-center justify-center font-bold text-[10px] sm:text-[12px] shrink-0 shadow-xs">
                    SV
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] sm:text-[11px] font-semibold text-zinc-950 dark:text-[#1c1917] leading-none truncate">
                        Shashank Verma
                      </span>
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 shrink-0" strokeWidth={2.5} />
                    </div>
                    <span className="text-[7px] sm:text-[8px] text-zinc-600 dark:text-[#57534e] block mt-[1px] truncate font-medium">
                      Software Developer • BCA
                    </span>
                  </div>
                </div>

                {/* iOS Grouped List */}
                <div className="rounded-[9px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 divide-y divide-zinc-200/70 dark:divide-[#e8dfc6] shrink-0">
                  <div className="flex items-center gap-[5px] px-1.5 py-[5px]">
                    <GraduationCap className="w-[12px] h-[12px] text-zinc-600 dark:text-[#78716c] shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <span className="text-[8px] sm:text-[9px] font-medium text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                        Swami Rama Himalayan Univ.
                      </span>
                      <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block">BCA • 2023–2026</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px] px-1.5 py-[5px]">
                    <Code className="w-[12px] h-[12px] text-zinc-600 dark:text-[#78716c] shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <span className="text-[8px] sm:text-[9px] font-medium text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                        Full-Stack Development
                      </span>
                      <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block">React · Next.js · Node</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px] px-1.5 py-[5px]">
                    <ExternalLink className="w-[12px] h-[12px] text-zinc-600 dark:text-[#78716c] shrink-0" strokeWidth={2} />
                    <div className="min-w-0">
                      <span className="text-[8px] sm:text-[9px] font-medium text-zinc-950 dark:text-[#1c1917] block leading-tight truncate">
                        Rateme — Review App
                      </span>
                      <span className="text-[6.5px] sm:text-[7px] text-emerald-700 font-semibold block">rateme.live ↗</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-[3px] shrink-0">
                  <div className="py-[4px] sm:py-[6px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 text-center">
                    <span className="text-[9.5px] sm:text-[11px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-none">10+</span>
                    <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block mt-[1px] font-medium">Projects</span>
                  </div>
                  <div className="py-[4px] sm:py-[6px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 text-center">
                    <span className="text-[9.5px] sm:text-[11px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-none">3+ Yrs</span>
                    <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block mt-[1px] font-medium">Coding</span>
                  </div>
                  <div className="py-[4px] sm:py-[6px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#fcf9f2]/95 shadow-xs dark:shadow-[0_1.5px_4px_rgba(140,110,60,0.08)] border border-zinc-200/80 dark:border-[#e6dcbf]/80 text-center">
                    <span className="text-[9.5px] sm:text-[11px] font-bold text-zinc-950 dark:text-[#1c1917] block leading-none">5.0★</span>
                    <span className="text-[6.5px] sm:text-[7px] text-zinc-500 dark:text-[#78716c] block mt-[1px] font-medium">Rating</span>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="flex flex-col items-center mt-auto shrink-0">
                  <div className="w-8 h-[2.5px] rounded-full bg-zinc-300 dark:bg-[#b8ac96]" />
                </div>
              </motion.div>

              {/* ================= LAYER B: FULL "ABOUT MYSELF" BENTO CANVAS ================= */}
              <motion.div
                id="about"
                style={{
                  opacity: fullAboutOpacity,
                  pointerEvents: fullAboutPointer as any,
                  willChange: "opacity",
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 bg-[#fafafc] dark:bg-[#090a0f] select-text transition-colors duration-300"
              >
                {/* Ambient Auras */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                  style={{
                    scale: fullAboutScale,
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                  className="w-full max-w-7xl mx-auto flex flex-col gap-3.5 sm:gap-5 lg:gap-6 relative z-10"
                >
                  {/* Top Section Header */}
                  <motion.div
                    style={{
                      y: headerY,
                      opacity: headerOpacity,
                      willChange: "transform, opacity",
                    }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2 sm:pb-3 border-b border-zinc-200 dark:border-zinc-800/80"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider mb-1 sm:mb-1.5">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>// 01. Profile &amp; Overview</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                        About Myself
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/80 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs self-start md:self-auto backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Swami Rama Himalayan University</span>
                    </div>
                  </motion.div>

                  {/* Bento Grid Layout */}
                  <motion.div
                    style={{
                      y: cardsY,
                      opacity: cardsOpacity,
                      willChange: "transform, opacity",
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6"
                  >
                    {/* Main Biography Card */}
                    <div className="md:col-span-2 flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm group">
                      <div>
                        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2.5 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                            Biography
                          </span>
                        </div>
                        <h3 className="font-display text-base sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-zinc-950 dark:text-white leading-snug">
                          Committed to problem-solving, software engineering, and data science.
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base font-sans">
                          I am a hardworking BCA student at Swami Rama Himalayan University with a motivated attitude and a variety of powerful skills. Adept at problem solving, programming basics, data analysis, and office technology programs.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm lg:text-base font-sans">
                          Committed to learning and contributing expertise in a dynamic environment of software development, data science, and web technologies. Creator of{" "}
                          <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            Rateme
                          </strong>
                          —a review collection platform.
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-6 border-t border-zinc-150 dark:border-zinc-800/80 pt-2 sm:pt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <span>📍 Dehradun, India</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-ping" />
                          available for opportunities
                        </span>
                      </div>
                    </div>

                    {/* System Metrics Grid */}
                    <div className="flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm group">
                      <div>
                        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2.5 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                            System Metrics
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {stats.map((st, idx) => (
                            <div
                              key={idx}
                              className="border border-zinc-150 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/50 p-2 sm:p-3.5 rounded-xl hover:border-cyan-500/20 transition-colors"
                            >
                              <p className="text-base sm:text-xl lg:text-2xl font-bold font-mono tracking-tight text-zinc-950 dark:text-zinc-100">
                                {st.value}
                              </p>
                              <p className="text-[8.5px] sm:text-[10px] uppercase font-mono text-zinc-500 dark:text-zinc-400 font-semibold mt-0.5 sm:mt-1">
                                {st.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 sm:mt-4 leading-relaxed font-mono">
                        *Metrics computed based on active BCA coursework and completed software projects.
                      </p>
                    </div>

                    {/* Architecture / Paradigms */}
                    <div className="flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm group">
                      <div>
                        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2.5 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                            Architecture
                          </span>
                        </div>
                        <h4 className="font-display text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-zinc-950 dark:text-white">
                          Core Paradigms
                        </h4>
                        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                          <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0" />
                            <span>Programming (C, Python, Java)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0" />
                            <span>Database Management &amp; SQL</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0" />
                            <span>Office Technology Software</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0" />
                            <span>Web Development (HTML &amp; CSS)</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-3 sm:mt-5 flex items-center space-x-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <Code2 className="w-4 h-4 text-cyan-500" />
                        <span>BCA curriculum roadmap</span>
                      </div>
                    </div>

                    {/* Code Philosophy */}
                    <div className="md:col-span-2 flex flex-col justify-between p-4 sm:p-6 lg:p-7 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm group">
                      <div>
                        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-2.5 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                            Code Philosophy
                          </span>
                        </div>
                        <h4 className="font-display text-sm sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 text-zinc-950 dark:text-white">
                          &ldquo;Problem solving is the foundation; technology is the tool.&rdquo;
                        </h4>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm font-sans mb-2 sm:mb-4">
                          Writing clean, maintainable logic with structured algorithms. Whether it&apos;s optimizing a database query or implementing full-stack review platforms like Rateme, I focus on real-world utility and reliable execution.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-150 dark:border-zinc-800/80 pt-2 sm:pt-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Continuous Learner
                        </span>
                        <span>SRHU • Batch of 2026</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

            </motion.div>
          </motion.div>
        </motion.div>

        {/* ================= 3. FLOATING SCROLL DOWN CUE (HERO ONLY) ================= */}
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="hidden md:flex absolute right-8 bottom-8 z-30 items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md text-zinc-600 dark:text-zinc-400 select-none pointer-events-none shadow-xs"
        >
          <Mouse className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
          <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">
            Scroll to explore
          </span>
        </motion.div>

      </div>
    </div>
  );
}

