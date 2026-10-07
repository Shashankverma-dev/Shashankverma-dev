export type CertificateCategory =
  | "All"
  | "Web Development"
  | "Programming"
  | "Database"
  | "UI/UX Design"
  | "Cloud & DevOps"
  | "AI / ML"
  | "Other";

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  year: number;
  category: CertificateCategory;
  verified: boolean;
  credentialId?: string;
  credentialUrl?: string;
  filePath?: string;
  previewImage: string;
  skills: string[];
  description: string;
  badgeStyle: {
    type:
      | "coursera-blue"
      | "hackerrank-hex"
      | "fcc-flame"
      | "meta-blue"
      | "aws-hex"
      | "microsoft-excel"
      | "udemy-purple"
      | "gfg-green"
      | "hplife-red"
      | "simplilearn-orange"
      | "skillindia-tricolor"
      | "gold-crest"
      | "nasscom-navy"
      | "unstop-blue";
    badgeText?: string;
    subText?: string;
    primaryColor: string;
    accentColor: string;
  };
}

export const CERTIFICATION_STATS = {
  totalCount: "14",
  issuingOrgs: "9+",
  activePeriod: "2023 – 2026",
  status: "Verified",
};

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  // 1. Introduction to Machine Learning (Elite) - NPTEL & IIT Kharagpur
  {
    id: "nptel-machine-learning-elite",
    title: "Introduction to Machine Learning (Elite)",
    issuer: "NPTEL & IIT Kharagpur",
    issueDate: "Sep 2026",
    year: 2026,
    category: "AI / ML",
    verified: true,
    credentialId: "NPTEL26CS119S254201033",
    credentialUrl: "https://nptel.ac.in/noc",
    filePath: "/certifications/NOC26CS119S254201033.pdf",
    previewImage: "/certifications/previews/nptel_machine_learning.jpg",
    skills: ["Machine Learning", "Supervised Learning", "Classification & Regression", "Neural Networks", "IIT Kharagpur", "SWAYAM"],
    description: "Elite Certification awarded by NPTEL, Ministry of Education (Govt. of India), and Indian Institute of Technology Kharagpur with a consolidated score of 65% in the 8-week Machine Learning program.",
    badgeStyle: {
      type: "gold-crest",
      badgeText: "NPTEL Elite",
      subText: "IIT Kharagpur",
      primaryColor: "#c2410c",
      accentColor: "#d97706",
    },
  },

  // 2. Full Stack Web Dev with AI - Internshala & Skill India (NSDC)
  {
    id: "internshala-fullstack-ai-nsdc",
    title: "Full Stack Web Development with AI (Grade A)",
    issuer: "Skill India & Internshala",
    issueDate: "Aug 2026",
    year: 2026,
    category: "Web Development",
    verified: true,
    credentialId: "CAN_40822431 / 6euneppay40lwr7s",
    credentialUrl: "https://trainings.internshala.com/verify_certificate",
    filePath: "/certifications/CAN_40822431_5655034.pdf",
    previewImage: "/certifications/previews/CAN_40822431_5655034.jpg",
    skills: ["AI-Powered Web Dev", "React with AI", "DBMS", "PHP", "Bootstrap", "Next-Gen AI Tools"],
    description: "Government-accredited 8-week intensive certification with Grade A awarded by Scholiverse Educare, Skill India, and NSDC.",
    badgeStyle: {
      type: "skillindia-tricolor",
      badgeText: "Skill India",
      subText: "Grade A",
      primaryColor: "#ff7700",
      accentColor: "#10b981",
    },
  },

  // 3. Full Stack Web Development with AI Training - SRHU
  {
    id: "internshala-fullstack-ai-srhu",
    title: "Full Stack Web Development with AI Training",
    issuer: "Internshala & SRHU",
    issueDate: "Aug 2026",
    year: 2026,
    category: "Web Development",
    verified: true,
    credentialId: "fngl80gfiem",
    credentialUrl: "https://trainings.internshala.com/verify_certificate",
    filePath: "/certifications/Full Stack Web Development with AI Training - Certificate of Completion (2).pdf",
    previewImage: "/certifications/previews/Full_Stack_Web_Development_with_AI_Training___Certificate_of_Completion_2.jpg",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "PHP", "DOM with AI", "AI Prompting"],
    description: "8-week comprehensive training program completed from Swami Rama Himalayan University covering end-to-end full stack web architecture and AI tool integration.",
    badgeStyle: {
      type: "skillindia-tricolor",
      badgeText: "Internshala",
      subText: "Completion",
      primaryColor: "#00a5ec",
      accentColor: "#0077b6",
    },
  },

  // 4. QuizOff 2026: India's Biggest AI Quiz - Unstop & CampusCrew
  {
    id: "quizoff-ai-unstop",
    title: "QuizOff 2026: India's Biggest AI Quiz",
    issuer: "Unstop & CampusCrew",
    issueDate: "Jul 2026",
    year: 2026,
    category: "AI / ML",
    verified: true,
    credentialId: "UNSTOP-QZ-2026",
    credentialUrl: "https://unstop.com/",
    filePath: "/certifications/quiz.pdf",
    previewImage: "/certifications/previews/quiz.jpg",
    skills: ["Artificial Intelligence", "AI Problem Solving", "Competitive AI", "CampusCrew", "Unstop"],
    description: "Certificate of Participation presented in recognition of competing in QuizOff 2026: India's Biggest AI Quiz, organised by CampusCrew and hosted on Unstop with 5,25,000+ global participants.",
    badgeStyle: {
      type: "unstop-blue",
      badgeText: "Unstop",
      subText: "QuizOff 2026",
      primaryColor: "#1d4ed8",
      accentColor: "#0284c7",
    },
  },

  // 4. SEO with Squarespace - Coursera
  {
    id: "coursera-seo-squarespace",
    title: "Search Engine Optimization (SEO) with Squarespace",
    issuer: "Coursera",
    issueDate: "Jul 2026",
    year: 2026,
    category: "Web Development",
    verified: true,
    credentialId: "6APHA9TCQ0KQ",
    credentialUrl: "https://coursera.org/verify/6APHA9TCQ0KQ",
    filePath: "/certifications/Coursera 6APHA9TCQ0KQ.pdf",
    previewImage: "/certifications/previews/Coursera_6APHA9TCQ0KQ.jpg",
    skills: ["Technical SEO", "Squarespace", "Search Indexing", "Keyword Strategy", "Metadata"],
    description: "Authorized project certificate authorized by Coursera validating technical search engine indexing, on-page optimization, and web visibility best practices.",
    badgeStyle: {
      type: "coursera-blue",
      badgeText: "coursera",
      subText: "Project Verified",
      primaryColor: "#0056D2",
      accentColor: "#1d4ed8",
    },
  },

  // 5. Introduction to Figma - Simplilearn
  {
    id: "simplilearn-figma",
    title: "Introduction to Figma",
    issuer: "Simplilearn",
    issueDate: "Jul 2026",
    year: 2026,
    category: "UI/UX Design",
    verified: true,
    credentialId: "10456886",
    credentialUrl: "https://www.simplilearn.com/skillup-certificate",
    filePath: "/certifications/figma certification.pdf",
    previewImage: "/certifications/previews/figma_certification.jpg",
    skills: ["Figma UI Design", "Wireframing", "Component Variants", "Prototyping", "Design Systems"],
    description: "Official SkillUp credential verifying practical foundations in UI/UX design, auto-layouts, reusable component structures, and interactive prototypes.",
    badgeStyle: {
      type: "simplilearn-orange",
      badgeText: "Simplilearn",
      subText: "SkillUp Verified",
      primaryColor: "#f37021",
      accentColor: "#d85b12",
    },
  },

  // 6. Introduction to Tableau - Simplilearn
  {
    id: "simplilearn-tableau",
    title: "Introduction to Tableau",
    issuer: "Simplilearn",
    issueDate: "Aug 2024",
    year: 2024,
    category: "Database",
    verified: true,
    credentialId: "7327562",
    credentialUrl: "https://www.simplilearn.com/skillup-certificate",
    filePath: "/certifications/7327562_1724857353.pdf",
    previewImage: "/certifications/previews/7327562_1724857353.jpg",
    skills: ["Tableau Desktop", "Data Visualization", "BI Dashboards", "Calculated Fields", "Analytics"],
    description: "Hands-on data analytics certification covering relational data sources, statistical dashboards, time-series visualizations, and interactive Tableau workbooks.",
    badgeStyle: {
      type: "simplilearn-orange",
      badgeText: "Simplilearn",
      subText: "SkillUp Verified",
      primaryColor: "#f37021",
      accentColor: "#d85b12",
    },
  },

  // 7. AWS Cloud Essentials - AWS Training & Certification
  {
    id: "aws-cloud-essentials",
    title: "AWS Foundations: Getting Started with AWS Cloud Essentials",
    issuer: "AWS Training & Certification",
    issueDate: "Jul 2026",
    year: 2026,
    category: "Cloud & DevOps",
    verified: true,
    credentialId: "c5e6c411-49c8-4944-8398-102558dc6fec",
    credentialUrl: "https://aws.amazon.com/training/",
    filePath: "/certifications/c5e6c411-49c8-4944-8398-102558dc6fec.pdf",
    previewImage: "/certifications/previews/c5e6c411_49c8_4944_8398_102558dc6fec.jpg",
    skills: ["AWS EC2", "AWS S3", "IAM Security", "Cloud Architecture", "VPC & Networking"],
    description: "Official completion certificate awarded by AWS Training & Certification validating core understanding of cloud computing, security policies, and AWS infrastructure.",
    badgeStyle: {
      type: "aws-hex",
      badgeText: "aws",
      subText: "Essentials",
      primaryColor: "#ff9900",
      accentColor: "#232f3e",
    },
  },

  // 8. AI for Business Professionals - HP LIFE
  {
    id: "hp-life-ai-business",
    title: "AI for Business Professionals",
    issuer: "HP LIFE Foundation",
    issueDate: "Jul 2026",
    year: 2026,
    category: "AI / ML",
    verified: true,
    credentialId: "adb96fa1-806e-498b-9e50-2de523b926c5",
    credentialUrl: "https://www.life-global.org/certificate/adb96fa1-806e-498b-9e50-2de523b926c5",
    filePath: "/certifications/AI for Business Professionals.pdf",
    previewImage: "/certifications/previews/AI_for_Business_Professionals.jpg",
    skills: ["Prompt Engineering", "AI Integration", "Ethical AI", "Enterprise Automation"],
    description: "HP Foundation certificate examining artificial intelligence in modern workflows, crafting effective prompts, ethical frameworks, and AI-driven growth.",
    badgeStyle: {
      type: "hplife-red",
      badgeText: "HP LIFE",
      subText: "Certified",
      primaryColor: "#0096d6",
      accentColor: "#006ba1",
    },
  },

  // 9. Critical Thinking in the AI Era - HP LIFE
  {
    id: "hp-life-critical-thinking",
    title: "Critical Thinking in the AI Era",
    issuer: "HP LIFE Foundation",
    issueDate: "Jul 2026",
    year: 2026,
    category: "AI / ML",
    verified: true,
    credentialId: "bc823a19-3ef9-4e73-adc1-9edfc5d1de85",
    credentialUrl: "https://www.life-global.org/certificate/bc823a19-3ef9-4e73-adc1-9edfc5d1de85",
    filePath: "/certifications/Critical Thinking in the AI Era.pdf",
    previewImage: "/certifications/previews/Critical_Thinking_in_the_AI_Era.jpg",
    skills: ["AI Evaluation", "Bias Detection", "Fact Checking", "Decision Logic"],
    description: "Specialized certificate on identifying AI hallucination, evaluating synthetic content accuracy, bias mitigation strategies, and critical thinking tools.",
    badgeStyle: {
      type: "hplife-red",
      badgeText: "HP LIFE",
      subText: "Certified",
      primaryColor: "#0096d6",
      accentColor: "#005580",
    },
  },

  // 10. Introduction to Natural Language Processing - Microsoft Learn
  {
    id: "ms-learn-nlp",
    title: "Introduction to Natural Language Processing Concepts",
    issuer: "Microsoft Learn",
    issueDate: "Jul 2026",
    year: 2026,
    category: "AI / ML",
    verified: true,
    credentialId: "fe43a8yx",
    credentialUrl: "https://learn.microsoft.com/en-us/users/shashankverma-4951/achievements",
    filePath: "/certifications/Achievements - shashankverma-4951 _ Microsoft Learn.pdf",
    previewImage: "/certifications/previews/Achievements___shashankverma_4951___Microsoft_Learn.jpg",
    skills: ["NLP Concepts", "Azure AI Speech", "Language Models", "Tokenization", "Text Analytics"],
    description: "Microsoft credential verifying concepts in natural language processing, semantic analysis, tokenizer mechanics, and Azure AI speech services.",
    badgeStyle: {
      type: "microsoft-excel",
      badgeText: "Microsoft",
      subText: "Learn Certified",
      primaryColor: "#0078d4",
      accentColor: "#004578",
    },
  },

  // 11. Drone Software Technician - NASSCOM & Skill India Digital
  {
    id: "nasscom-drone-technician",
    title: "Drone Software Technician",
    issuer: "NASSCOM & Skill India",
    issueDate: "Jul 2026",
    year: 2026,
    category: "Cloud & DevOps",
    verified: true,
    credentialId: "NASSCOM-DST-2026",
    credentialUrl: "https://www.skillindiadigital.gov.in/",
    filePath: "/certifications/certificate_8b389887-8ba4-49a5-b8eb-e6695f3f6570.pdf",
    previewImage: "/certifications/previews/certificate_8b389887_8ba4_49a5_b8eb_e6695f3f6570.jpg",
    skills: ["Drone Software", "Embedded Systems", "Flight Control Telemetry", "IT-ITeS SSC"],
    description: "Specialized skilling course offered by National Association of Software and Service Companies (NASSCOM) through Skill India Digital Hub.",
    badgeStyle: {
      type: "skillindia-tricolor",
      badgeText: "NASSCOM",
      subText: "Skill India",
      primaryColor: "#1e3a8a",
      accentColor: "#10b981",
    },
  },

  // 13. TechForge 2.0 Hackathon (SIH 2025) - SRHU
  {
    id: "srhu-techforge-hackathon",
    title: "TechForge 2.0 Hackathon (Aligned with SIH 2025)",
    issuer: "Swami Rama Himalayan University",
    issueDate: "Sep 2025",
    year: 2025,
    category: "Programming",
    verified: true,
    credentialId: "SRHU-TF2-SIH2025",
    filePath: "/certifications/1200px.pdf",
    previewImage: "/certifications/previews/1200px.jpg",
    skills: ["Smart India Hackathon", "Collaborative Sprint", "Rapid Prototyping", "Full Stack MVP"],
    description: "Certificate of Active Participation in the 48-hour TechForge 2.0 national hackathon aligned with Smart India Hackathon 2025 by School of Science and Technology, SRHU.",
    badgeStyle: {
      type: "gold-crest",
      badgeText: "SRHU",
      subText: "SIH 2025",
      primaryColor: "#d97706",
      accentColor: "#b45309",
    },
  },

  // 14. Computer Wizard Academic Award - Nancy International School
  {
    id: "computer-wizard-award",
    title: "Computer Wizard Academic Honor (Class XII Sci)",
    issuer: "Nancy International School",
    issueDate: "Nov 2023",
    year: 2023,
    category: "Programming",
    verified: true,
    credentialId: "NIS-CW-2023",
    filePath: "/certifications/computer wizard.pdf",
    previewImage: "/certifications/previews/computer_wizard.jpg",
    skills: ["Computer Science", "Academic Excellence", "Practical Lab", "Problem Solving"],
    description: "Awarded 'Computer Wizard' honor at the 17th Annual Day Celebration during the academic session 2023-2024 for outstanding performance in Computer Science.",
    badgeStyle: {
      type: "gold-crest",
      badgeText: "NIS Honor",
      subText: "Computer Wizard",
      primaryColor: "#eab308",
      accentColor: "#ca8a04",
    },
  },
];


