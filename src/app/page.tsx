"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StartingScreen } from "@/components/ui/starting-screen";
import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { JourneyTimeline } from "@/components/sections/timeline";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Shashank Verma",
      "alternateName": "Shashankverma-dev",
      "url": "https://shashankverma.dev",
      "email": "shashankvermahsst@gmail.com",
      "jobTitle": "BCA Student & Software Developer",
      "sameAs": [
        "https://github.com/Shashankverma-dev",
        "https://www.linkedin.com/in/shashank-verma-dev/"
      ],
      "knowsAbout": [
        "C",
        "Python",
        "Java",
        "HTML",
        "CSS",
        "Database Management",
        "Office Technology",
        "Data Science",
        "Software Development"
      ]
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-emerald-500/20 selection:text-emerald-500">
      {/* Cyberpunk Starting Screen Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="starting-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: "-100%",
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <StartingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dynamic scanlines layer for retro-modern terminal grid */}
      <div className="absolute inset-0 bg-transparent pointer-events-none z-40 opacity-5" />

      {/* Global Navigation */}
      <Navigation />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero isLoaded={!loading} />
        <About />
        <Skills />
        <JourneyTimeline />
        <Projects />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}


