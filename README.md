# 💻 Shashank Verma - Terminal-Inspired Next.js Portfolio

A modern, high-performance, and Awwwards-inspired developer portfolio designed for **Shashank Verma**. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**, it implements a minimal monospace terminal design with responsive Bento Grid layouts.

---

## ✨ Features

*   **💻 Interactive Terminal shell**: A custom CLI mock terminal widget that lets visitors type commands (`about`, `projects`, `skills`, `contact`, `clear`) or tap quick actions to load profile text.
*   **🍱 Responsive Bento Grid**: Clean structural layouts for biography details, live statistics, core paradigms, and technical qualifications.
*   **🛠️ Tech capabilities meters**: Custom visual level meters indicating skill proficiencies across languages, front-end, backend databases, and tooling.
*   **📈 Journey timeline**: A learning timeline replacement for work experience, mapping milestones from C++ data structures to Supabase fullstack integrations.
*   **🎨 Dynamic theme toggle**: Seamlessly switches between an elegant absolute black dark mode (glowing green/cyan accents) and paper-white light mode.
*   **📨 Secure message dispatcher**: A client contact form with feedback states and hover-linked social nodes.
*   **⚡ Compile optimized**: Validated production build with zero TypeScript compilation or formatting errors.

---

## 🛠️ Stack

*   **Core**: Next.js (App Router), React (v19)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4, Vanilla CSS variables
*   **Animations**: Framer Motion
*   **Icons**: Lucide React + custom inline SVGs (for brand nodes)

---

## 🚀 Getting Started

### Installation

1.  Clone the directory or navigate to the workspace:
    ```bash
    cd "d:\antigravity portfolio"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Execution

*   **Development server**:
    ```bash
    npm run dev
    ```
*   **Build check**:
    ```bash
    npm run build
    ```
*   **Start production server**:
    ```bash
    npm start
    ```

---

## 📂 Directory Layout

```text
├── app/
│   ├── layout.tsx         # Font configs, SEO metadata, Theme provider wrapper
│   ├── page.tsx           # Home entry page mapping all section elements
│   └── globals.css        # Tailwind v4 import, scrollbars, terminal grids
├── components/
│   ├── ui/
│   │   ├── bento-card.tsx # Resilient containers supporting glowing states
│   │   ├── navigation.tsx # Sticky navigation drawer
│   │   └── terminal-console.tsx # Custom command-line parser
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── timeline.tsx   # Journey timelines
│   │   ├── projects.tsx   # Spotlight flagship & secondary cards
│   │   ├── certifications.tsx
│   │   └── contact.tsx
│   └── theme-toggle.tsx   # Switcher triggers
├── hooks/
├── lib/
│   └── utils.ts           # Class merging cn helper
└── public/                # Favicons, logos, assets
```

---

## 🌐 Deployment

The codebase is optimized for **Vercel** or any static hosting services. Since it is fully static, you can deploy it instantly:

1.  Connect your GitHub repository to [Vercel](https://vercel.com).
2.  Import this project.
3.  Vercel will auto-detect Next.js and build it.
