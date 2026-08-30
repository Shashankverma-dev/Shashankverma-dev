"use client";

import React from "react";
import {
  ProjectSpotlightCard,
  type SpotlightProject,
} from "../ui/project-spotlight-card";

const spotlightProjects: SpotlightProject[] = [
  {
    id: "aura-social",
    name: "Aura Social",
    category: "Interactive 3D Web & Creative Agency",
    tagline: "3D Scroll-Driven Storytelling Platform",
    description:
      "A modern, high-performance agency showcase website built with Next.js 15, React 19, GSAP, and Tailwind CSS. Features custom interactive 3D smartphone scroll-driven story transitions, smooth dynamic canvas frame sequences, and glassmorphism agency UI.",
    tech: [
      "Next.js 15",
      "React 19",
      "GSAP",
      "Lenis Scroll",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
    ],
    github: "https://github.com/Shashankverma-dev/Aura-social",
    live: "https://aura-social.rockverma9917.workers.dev/",
    heroImage: "/projects/aura-social.png",
    heroAlt: "Aura Social — interactive 3D scroll animation website",
    heroPosition: "center",
    highlights: [
      "Engineered interactive 3D smartphone scroll stories transforming phone mockups into live feature interfaces.",
      "Integrated Lenis inertial smooth scrolling with GSAP ScrollTrigger timeline sequences.",
      "Designed modern floating glassmorphism navigation, vibrant neon gradients, and micro-interactions.",
      "Optimized with Next.js 15 App Router & React 19 for 60fps fluid performance across all devices.",
    ],
    availabilityLabel: "Live",
    season: "2025 – Now",
    rating: 5.0,
    seats: "Agency Grade",
    coords: ["28.61° N", "77.20° E"],
  },
  {
    id: "assignix",
    name: "Assignix",
    category: "Academic & Web Utility",
    tagline: "Assignment Management Platform",
    description:
      "Developed a web-based platform for managing assignments, submissions, and academic tasks efficiently. Designed a user-friendly interface to help students and educators organize, track, and manage academic submissions.",
    tech: ["HTML5", "CSS3", "JavaScript", "Web Technologies"],
    github: "https://github.com/Shashankverma-dev/assignix",
    live: "https://assignix-client.vercel.app/login",
    heroImage: "/projects/assignix.png",
    heroAlt: "Assignix — assignment management platform UI",
    highlights: [
      "Designed a structured dashboard for tracking assignment progress and upcoming tasks.",
      "Built dynamic widgets for task status tracking and submission forms.",
      "Engineered student-educator task coordination views with clean web standards.",
      "Implemented light/dark modes and optimized layout responsiveness across devices.",
    ],
    availabilityLabel: "Active",
    season: "Year-Round",
    rating: 4.9,
    seats: "4 modules",
    coords: ["30.37° N", "78.07° E"],
  },
  {
    id: "civic-issue",
    name: "Civic Resolve",
    category: "Web Application",
    tagline: "Full-Stack Civic Feedback Platform",
    description:
      "Built a full-stack web application that lets citizens report local civic issues directly to authorities. Features role-based dashboards, structured complaint forms, live status tracking, and a geo-tagged map view — all backed by a relational database schema.",
    tech: ["HTML5", "CSS3", "JavaScript", "Python", "SQL", "REST API", "Map Integration"],
    github: "https://github.com/Shashankverma-dev/CivicResolve",
    live: "https://civicresolve.freedev.app/",
    heroImage: "/projects/civic-issue.png",
    heroAlt: "Civic Issue Reporting System — web dashboard and map view",
    highlights: [
      "Built role-based login portals for citizens, admins, and local authority staff.",
      "Engineered structured complaint forms with category tagging and photo upload.",
      "Integrated map-based geo-pinning so issues are tied to exact locations.",
      "Designed a live status tracker — citizens follow issues from Open to Resolved.",
    ],
    availabilityLabel: "Live",
    season: "2024 – Now",
    rating: 4.7,
    seats: "3 portals",
    coords: ["28.61° N", "77.20° E"],
  },

  {
    id: "attendance-tracker",
    name: "Attendance Tracker",
    category: "Student Mobile App",
    tagline: "Personal Attendance Manager for Students",
    description:
      "A mobile app built for students to track their own subject-wise attendance in real time. Students can log daily presence, view their attendance percentage per subject, receive low-attendance alerts, and generate personal summary reports — all from their phone.",
    tech: ["Java", "Android", "Local Storage", "Report Tools", "UI Design"],
    github: "https://github.com/Shashankverma-dev/attendance-tracker",
    heroImage: "/projects/attendance-tracker.png",
    heroAlt: "Attendance Tracker — student self-tracking mobile app",
    highlights: [
      "Students mark their own attendance per subject after each class.",
      "Live percentage tracker shows standing across all subjects at a glance.",
      "Push alerts warn when attendance drops below the 75% threshold.",
      "Generates a clean personal report card for semester review.",
    ],
    availabilityLabel: "Stable",
    season: "Semester-Ready",
    rating: 4.8,
    seats: "Solo student",
    coords: ["30.32° N", "78.03° E"],
  },
  {
    id: "rateme",
    name: "Rateme",
    category: "SaaS Web Platform",
    tagline: "Review Collection Made Clear",
    description:
      "A premium, open-source customer feedback SaaS that helps businesses boost Google Reviews, build mobile-first digital menus, generate dynamic QR codes, and track analytics — all from a single bone-white workspace. No subscriptions, no seat limits.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "REST API"],
    live: "https://www.rateme.co.in/",
    heroImage: "/projects/rateme.png",
    heroAlt: "Rateme — review collection SaaS dashboard",
    heroPosition: "top",
    highlights: [
      "Dynamic QR engine routes customers to menus or review screens — print once, update forever.",
      "AI-assisted review drafting helps customers write verified, compliant feedback instantly.",
      "Mobile-first digital menu builder with allergen filters and WhatsApp order routing.",
      "Privacy-first analytics: branch ratings, scan ratios and conversion trends, no tracking cookies.",
    ],
    availabilityLabel: "Live",
    season: "Year-Round",
    rating: 4.9,
    seats: "Unlimited",
    coords: ["12.97° N", "77.59° E"],
  },
  {
    id: "artndus",
    name: "Artndus",
    category: "E-Commerce & Brand Website",
    tagline: "Handmade Gifts Online Store — Dehradun",
    description:
      "Designed and developed the official website for Artndus (@art.nd.us), a Dehradun-based brand specializing in handmade pipe cleaner bouquets, plush flower pots, keychains, and custom gift hampers. Built a fully branded, SEO-optimized storefront with pan-India shipping support.",
    tech: ["HTML5", "CSS3", "JavaScript", "SEO", "Responsive Design", "Vite"],
    live: "https://artndus.in/",
    heroImage: "/projects/artndus.png",
    heroAlt: "Artndus — handmade pipe cleaner flowers & bouquets store",
    highlights: [
      "Built a fully branded storefront for an Instagram-native handmade gifts business.",
      "Implemented advanced SEO meta tags, Open Graph, geo-targeting, and sitemap for discoverability.",
      "Designed a mobile-first, visually rich layout to showcase handcrafted products.",
      "Enabled pan-India shipping integration and WhatsApp-based order routing.",
    ],
    availabilityLabel: "Live",
    season: "Year-Round",
    rating: 4.8,
    seats: "Pan-India",
    coords: ["30.32° N", "78.03° E"],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden border-t border-zinc-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-zinc-950/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center md:text-left mb-16">
          <p className="font-mono text-xs text-emerald-500 dark:text-cyan-400 uppercase tracking-widest mb-2">
            {"// 04. Pinned Repositories"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Project Spotlights
          </h2>
        </div>

        {/* All three projects rendered as travel-card spotlights */}
        <div className="space-y-20">
          {spotlightProjects.map((proj, idx) => (
            <ProjectSpotlightCard
              key={proj.id}
              project={proj}
              position={[idx + 1, spotlightProjects.length]}
              sectionLabel={idx === 0 ? "Featured Project" : "Project"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
