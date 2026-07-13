"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverGlow?: "cyan" | "green" | "violet" | "none";
  enableSmoke?: boolean;
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  initialSize: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 8; // Large billowy smoke puffs
    this.speedX = Math.random() * 2 - 1; // Wider expansion
    this.speedY = -Math.random() * 1.5 - 0.4; // Slightly slower drift
    this.life = 120; // Longer lifespan
    this.initialSize = this.size;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 1.5; // Smooth decay
    this.size = Math.max(0, this.initialSize * (this.life / 120));
  }
}

export function BentoCard({ 
  children, 
  className, 
  delay = 0, 
  hoverGlow = "none",
  enableSmoke = false
}: BentoCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isLoopRunningRef = useRef(false);
  const animateRef = useRef<() => void>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch || isSmallScreen);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!enableSmoke || isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine color based on hoverGlow
    let particleColor = "128, 128, 128"; // Gray default
    if (hoverGlow === "cyan") particleColor = "6, 182, 212";
    else if (hoverGlow === "green") particleColor = "16, 185, 129";
    else if (hoverGlow === "violet") particleColor = "139, 92, 246";

    const animate = () => {
      if (!canvas || !ctx) {
        isLoopRunningRef.current = false;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particlesRef.current = particlesRef.current
        .filter(particle => particle.life > 0 && particle.size > 0);

      particlesRef.current.forEach(particle => {
        particle.update();
        
        // Draw particle
        if (particle.size > 0) {
          const opacity = (particle.life / 120) * 0.12; // Softer opacity for larger clouds
          ctx.fillStyle = `rgba(${particleColor}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Add new particles near mouse position
      if (mousePosRef.current.x !== 0 && mousePosRef.current.y !== 0) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push(
            new Particle(
              mousePosRef.current.x + (Math.random() * 10 - 5),
              mousePosRef.current.y + (Math.random() * 10 - 5)
            )
          );
        }
      }

      if (particlesRef.current.length > 0 || (mousePosRef.current.x !== 0 && mousePosRef.current.y !== 0)) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isLoopRunningRef.current = false;
      }
    };

    animateRef.current = animate;

    // Set initial canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    
    resizeObserver.observe(canvas.parentElement || canvas);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isLoopRunningRef.current = false;
      animateRef.current = undefined;
    };
  }, [enableSmoke, hoverGlow, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableSmoke || isMobile) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    if (!isLoopRunningRef.current && animateRef.current) {
      isLoopRunningRef.current = true;
      animateRef.current();
    }
  };

  const handleMouseLeave = () => {
    if (!enableSmoke || isMobile) return;
    mousePosRef.current = { x: 0, y: 0 };
  };
  
  const glowClass = 
    hoverGlow === "cyan" 
      ? "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
      : hoverGlow === "green"
      ? "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
      : hoverGlow === "violet"
      ? "hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
      : "hover:border-zinc-400 dark:hover:border-zinc-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 dark:border-zinc-900/60 dark:bg-zinc-950/40 backdrop-blur-sm",
        glowClass,
        className
      )}
    >
      {enableSmoke && !isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
