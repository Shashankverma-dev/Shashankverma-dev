export interface SkillItem {
  name: string;
  level: "Familiar" | "Intermediate";
}

export interface SkillCategoryData {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: "terminal" | "layout" | "database" | "fileText" | "camera";
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  pinColor: "purple" | "red" | "blue" | "orange" | "pink";
  pinPercent: number;
  rotation: number;
  skills: SkillItem[];
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  cardTheme: "light" | "dark" | "yellow";
  accentColor: string;
  pinColor: "purple" | "red" | "blue" | "orange" | "pink";
  initialRotation: number;
  offsetX: number;
  offsetY: number;
}

export const SKILL_CATEGORIES: SkillCategoryData[] = [
  {
    id: "programming",
    number: "01",
    title: "Programming",
    description: "Languages I use for development and problem solving.",
    iconName: "terminal",
    accentColor: "#10b981",
    badgeBg: "#e6f4ea",
    badgeText: "#0d652d",
    pinColor: "purple",
    pinPercent: 18,
    rotation: -1.0,
    skills: [
      { name: "C Language", level: "Familiar" },
      { name: "Python", level: "Familiar" },
      { name: "Java", level: "Familiar" },
    ],
  },
  {
    id: "web-development",
    number: "02",
    title: "Web Development",
    description: "Technologies for building modern web applications.",
    iconName: "layout",
    accentColor: "#0284c7",
    badgeBg: "#e0f2fe",
    badgeText: "#0369a1",
    pinColor: "red",
    pinPercent: 50,
    rotation: 0.6,
    skills: [
      { name: "HTML5", level: "Familiar" },
      { name: "CSS3", level: "Familiar" },
      { name: "JavaScript", level: "Familiar" },
    ],
  },
  {
    id: "database",
    number: "03",
    title: "Database",
    description: "Managing and working with data.",
    iconName: "database",
    accentColor: "#9333ea",
    badgeBg: "#f3e8ff",
    badgeText: "#7e22ce",
    pinColor: "blue",
    pinPercent: 22,
    rotation: -0.5,
    skills: [
      { name: "SQL Basics", level: "Familiar" },
      { name: "Relational DBs", level: "Familiar" },
    ],
  },
  {
    id: "office-tools",
    number: "04",
    title: "Office Tools",
    description: "Productivity tools for academic and professional work.",
    iconName: "fileText",
    accentColor: "#f59e0b",
    badgeBg: "#fef3c7",
    badgeText: "#b45309",
    pinColor: "orange",
    pinPercent: 50,
    rotation: 0.8,
    skills: [
      { name: "MS Word / PPT", level: "Intermediate" },
      { name: "MS Excel", level: "Intermediate" },
    ],
  },
  {
    id: "digital-media",
    number: "05",
    title: "Digital & Media",
    description: "Tools for content creation and design.",
    iconName: "camera",
    accentColor: "#ec4899",
    badgeBg: "#fce7f3",
    badgeText: "#be185d",
    pinColor: "purple",
    pinPercent: 50,
    rotation: -0.7,
    skills: [
      { name: "Social Media Platforms", level: "Familiar" },
      { name: "Canva (Basic)", level: "Familiar" },
    ],
  },
];

export const TECHNOLOGIES_DATA: TechnologyItem[] = [
  // Row 1: C, Python, Java
  {
    id: "tech-c",
    name: "C",
    category: "Programming",
    description: "Foundational procedural programming, memory addresses, pointers, and data structures.",
    highlights: [
      "Procedural programming logic",
      "Pointers & memory control",
      "Data structures & algorithms",
      "Low-level systems intuition",
    ],
    cardTheme: "light",
    accentColor: "#00599c",
    pinColor: "purple",
    initialRotation: -1.5,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech-python",
    name: "Python",
    category: "Programming",
    description: "High-level scripting for automation, data analytics, ML workflows, and backend logic.",
    highlights: [
      "Automation & scripting",
      "Data analysis & manipulation",
      "Machine learning fundamentals",
      "Algorithm prototyping",
    ],
    cardTheme: "light",
    accentColor: "#ffde57",
    pinColor: "purple",
    initialRotation: 1.0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech-java",
    name: "Java",
    category: "Programming",
    description: "Object-oriented software development, JVM ecosystem, and modular enterprise architecture.",
    highlights: [
      "Object-oriented architecture",
      "Inheritance & interfaces",
      "JVM runtime & garbage collection",
      "Modular class hierarchies",
    ],
    cardTheme: "light",
    accentColor: "#f89820",
    pinColor: "red",
    initialRotation: -1.0,
    offsetX: 0,
    offsetY: 0,
  },
  // Row 2: HTML5, CSS3, JavaScript
  {
    id: "tech-html5",
    name: "HTML5",
    category: "Web Development",
    description: "Semantic page structure, accessibility standards, DOM layout, and web markup.",
    highlights: [
      "Semantic HTML5 elements",
      "Web accessibility (ARIA)",
      "DOM structure & layout",
      "SEO-friendly document trees",
    ],
    cardTheme: "light",
    accentColor: "#e34f26",
    pinColor: "red",
    initialRotation: 1.5,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech-css3",
    name: "CSS3",
    category: "Web Development",
    description: "Modern layouts, Flexbox, Grid, fluid typography, smooth animations, and tailored CSS.",
    highlights: [
      "Flexbox & CSS Grid systems",
      "Fluid typography & breakpoints",
      "Micro-animations & transitions",
      "Tailwind CSS architecture",
    ],
    cardTheme: "light",
    accentColor: "#1572b6",
    pinColor: "blue",
    initialRotation: -1.0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech-js",
    name: "JavaScript",
    category: "Web Development",
    description: "Dynamic client-side interactivity, asynchronous promises, DOM manipulation, and modern ES6+.",
    highlights: [
      "DOM event handling",
      "ES6+ syntax & modular JS",
      "Async/await & fetch APIs",
      "Interactive UI state logic",
    ],
    cardTheme: "light",
    accentColor: "#f7df1e",
    pinColor: "red",
    initialRotation: 1.0,
    offsetX: 0,
    offsetY: 0,
  },
  // Row 3: SQL, Databases, Word
  {
    id: "tech-sql",
    name: "SQL",
    category: "Database",
    description: "Relational data queries, table schema definition, complex joins, and aggregation.",
    highlights: [
      "Complex relational queries",
      "Joins & sub-queries",
      "Aggregation & grouping",
      "Data integrity constraints",
    ],
    cardTheme: "light",
    accentColor: "#0284c7",
    pinColor: "purple",
    initialRotation: -1.0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech-db",
    name: "Databases",
    category: "Database",
    description: "Relational database schema modeling, normalization principles, and entity relationships.",
    highlights: [
      "Entity-relationship modeling",
      "Database normalization (1NF-3NF)",
      "Primary & foreign key indexing",
      "RDBMS management basics",
    ],
    cardTheme: "light",
    accentColor: "#8b5cf6",
    pinColor: "pink",
    initialRotation: 1.0,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech-word",
    name: "Word",
    category: "Office Tools",
    description: "Technical project documentation, academic papers, reports, and formatted deliverables.",
    highlights: [
      "Technical report formatting",
      "Academic papers & research notes",
      "Structured documentation",
      "Presentation deliverables",
    ],
    cardTheme: "light",
    accentColor: "#2b579a",
    pinColor: "purple",
    initialRotation: -1.5,
    offsetX: 0,
    offsetY: 0,
  },
];
