/**
 * Single source of truth for the portfolio.
 * Curated from the Obsidian vault (My/Profile, My/Projects, Work.md, …).
 * Public surface only — private fields (DOB, nationality, passport, NDA
 * internals) are intentionally excluded.
 *
 * Projects: the curated defaults live in `BASE_PROJECTS` below. Running
 * `npm run sync:projects` (also run automatically on `dev`/`build`) reads
 * project notes from the Obsidian vault and writes `projects.generated.json`,
 * which is merged on top of the defaults by slug. See PORTFOLIO_SYNC.md.
 */

import projectOverridesData from "./projects.generated.json";
import experienceOverrideData from "./experience.generated.json";
import trainingsOverrideData from "./trainings.generated.json";
import awardsOverrideData from "./awards.generated.json";

/**
 * For the list sections (experience, trainings, awards): if the Obsidian sync
 * produced a non-empty array, use it; otherwise fall back to the curated base.
 */
function pickList<T>(override: unknown, base: T[]): T[] {
  const arr = override as T[];
  return Array.isArray(arr) && arr.length > 0 ? arr : base;
}

/* -------------------------------------------------------------------------- */
/* Profile & contact                                                          */
/* -------------------------------------------------------------------------- */

export const PROFILE = {
  name: "Subham Chhetri",
  shortName: "Subham",
  role: "Software Engineer",
  org: "DHI InnoTech (DRIVE)",
  location: "Thimphu, Bhutan",

  // Hero
  taglineLead: "Software engineer building AI, robotics, and IoT systems",
  taglineItalic: "for Bhutan and beyond.",
  heroLede:
    "I work at the intersection of AI, robotics, blockchain, and IoT — designing scalable systems and shipping them, from national ANPR infrastructure to a prayer-bead app with 10,000+ downloads.",

  shortBio:
    "Software Engineer at DHI InnoTech building AI, IoT, and full-stack systems for national-impact projects, with a B.E. in Computer Science & Engineering (CGPA 9.65/10). I work at the intersection of AI, robotics, blockchain, and IoT to solve real problems in Bhutan and beyond.",

  longBio: [
    "Subham Chhetri is a Software Engineer at DHI InnoTech (DRIVE) in Thimphu, Bhutan, with a Bachelor of Engineering in Computer Science & Engineering (CGPA 9.65/10). His work spans backend systems, distributed communication, and system integration — including a sovereign national ANPR system (system architecture, real-time computer-vision integration, on-device model optimisation) and an MQTT-based IoT water-management system.",
    "He has contributed to robotics and blockchain R&D — ByteCrane (offline IoT-to-blockchain via Sui smart contracts, validated with Mysten Labs) and Voxel (reconfigurable robotic construction with MIT's Center for Bits and Atoms) — and led the cross-platform Guru App (10,000+ downloads).",
    "His interests sit at the intersection of AI, robotics, blockchain, and IoT, and he aims to apply system-architecture skills to scalable, real-world solutions for Bhutan and beyond.",
  ],

  domains: [
    "AI & Computer Vision",
    "Robotics",
    "Blockchain & Web3",
    "IoT & Embedded",
    "System Architecture",
    "Conservation & Civic Tech",
  ],

  interests: [
    "Robotics & intelligent systems — bridging AI, hardware, and control",
    "System design & architecture for scalable, real-world technology",
    "Bhutan's tech ecosystem and national initiatives like Gelephu Mindfulness City",
  ],

  // Human side — kept light and professional
  personal: [
    "Competitive bodybuilder — represented Bhutan at the 16th South Asian Bodybuilding & Physique Championship (2026, Men's Sport Physique). The prep discipline carries into how I work.",
    "Played basketball for the Chitkara University team.",
    "A restless builder who lives by Kaizen — continuous, incremental improvement, and openly inviting feedback.",
  ],

  languages: [
    { name: "English", level: "Fluent" },
    { name: "Nepali", level: "Native" },
    { name: "Dzongkha", level: "Fluent" },
    { name: "Hindi", level: "Advanced" },
  ],
};

export const CONTACT = {
  email: "2107.subham@gmail.com",
  phone: "+975 17456733",
  location: "Thimphu, Bhutan",
};

export interface Social {
  label: string;
  href: string;
  handle: string;
}

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/SubhamChhetri", handle: "SubhamChhetri" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/subhamchhetri/", handle: "in/subhamchhetri" },
];

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

export type ProjectStatus = "live" | "in-development" | "completed" | "research";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  completed: "Completed",
  research: "Research",
};

export type ProjectCategory =
  | "AI & Computer Vision"
  | "Robotics"
  | "IoT & Embedded"
  | "Blockchain & Web3"
  | "Conservation & Climate Tech"
  | "Government & Civic"
  | "Mobile & Web Apps";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  category: ProjectCategory;
  role: string;
  org: string;
  partners: string[];
  period: string;
  /** One-line summary used on cards. */
  oneLiner: string;
  /** Longer description for the detail page (array of paragraphs). */
  summary: string[];
  /** My specific contributions / key points. */
  highlights?: string[];
  stack: string[];
  metrics?: string[];
  links?: ProjectLink[];
  image?: { src: string; alt: string };
  featured: boolean;
  /** NDA / confidential — shown without internals or links. */
  confidential?: boolean;
}

const BASE_PROJECTS: Project[] = [
  {
    slug: "drive-anpr",
    title: "DRIVE ANPR System",
    status: "live",
    category: "AI & Computer Vision",
    role: "Led the technical side",
    org: "DHI InnoTech",
    partners: ["Royal Bhutan Police"],
    period: "2024 – present",
    oneLiner:
      "Bhutan's sovereign AI number-plate recognition system for national traffic monitoring and public safety.",
    summary: [
      "An AI-powered Automatic Number Plate Recognition system built in-house for the Royal Bhutan Police — a sovereign national alternative to expensive foreign solutions. Phase I is deployed across Gelephu, Sarpang, and Thimphu with 10 AI-enabled cameras and 3 GPU servers.",
      "The pipeline uses YOLOv8 for vehicle and plate detection and a custom OCR pipeline built on Microsoft Florence-2, fine-tuned for Bhutanese number plates, with real-time vehicle search, blacklisting, and multi-site monitoring.",
    ],
    highlights: [
      "Worked on real-time communication and overall system architecture",
      "Built camera streaming and real-time API integration; optimised the communication layer",
      "Participated in the on-site optimisation and redeployment tour in Gelephu",
      "Coordinated SLA/legal review and feature-refinement with RBP",
    ],
    stack: ["YOLOv8", "Florence-2 OCR", "Computer Vision", "NVIDIA RTX 3080", "Real-time streaming", "API integration"],
    metrics: ["10 ANPR cameras + 3 GPU servers live", "3 deployment regions (Phase I)"],
    links: [
      { label: "RBP × DHI on AI-driven ANPR", href: "https://rbp.gov.bt/smart-policing-in-bhutan-rbp-and-dhi-collaborate-on-ai-driven-anpr-system/" },
      { label: "DHI Newsroom", href: "https://www.dhi.bt/newsroom/news/69467a35151590a78f28b4ed" },
    ],
    featured: true,
  },
  {
    slug: "guru-app",
    title: "Guru App (Benzra)",
    status: "live",
    category: "Mobile & Web Apps",
    role: "Lead developer (team of 3)",
    org: "GEIPL",
    partners: ["Global Peace Prayer Festival 2025"],
    period: "2025 – 2026",
    oneLiner:
      "A cross-platform digital prayer-bead app uniting a global community toward 7 billion mantra recitations. 10,000+ downloads.",
    summary: [
      "Guru App is a digital prayer wheel for the collective recitation of the Vajra Guru mantra, launched for Bhutan's Global Peace Prayer Festival 2025. It blends Vajrayana Buddhist tradition with NFC hardware, on-device voice recognition, and gamified spiritual learning.",
      "As lead technical implementer I delivered full-cycle development across the mobile app, backend, sync layer, streaming content, admin dashboard, and edge integration for NFC prayer beads — built around a 30% technology / 70% human-and-cultural-connection philosophy.",
    ],
    highlights: [
      "Swipe-to-count digital mala with a real-time global collective tally",
      "NFC-enabled physical prayer beads that wirelessly sync counts",
      "Hands-free, AI-assisted voice recognition for mantra counting",
      "English + Dzongkha support; led a team of three on an Agile, sprint-based delivery",
    ],
    stack: ["React Native", "NFC", "On-device voice ML", "Node.js", "Real-time sync"],
    metrics: ["10,000+ downloads across iOS + Android"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.bazaguru.guruapp&hl=en" },
      { label: "App Store", href: "https://apps.apple.com/in/app/guru-app/id6752633444" },
    ],
    featured: true,
  },
  {
    slug: "bytecrane",
    title: "ByteCrane",
    status: "completed",
    category: "Blockchain & Web3",
    role: "Lead engineer (DHI build)",
    org: "DHI InnoTech",
    partners: ["Sui Foundation", "Mysten Labs"],
    period: "Nov 2025",
    oneLiner:
      "Offline-first IoT-to-blockchain communication — sign offline, relay physically, verify on-chain. Validated with the Sui team.",
    summary: [
      "ByteCrane lets IoT devices interact with blockchain networks without direct internet connectivity, using low-power radio and physical relay infrastructure. A Proof of Concept with the Sui blockchain team validated the offline-first model: sign offline → transport physically → verify on-chain.",
      "Sensor nodes (ESP32-S3) generate Ed25519-signed payloads offline; a drone acts as an airborne LoRa relay across non-line-of-sight gaps; an internet-connected gateway submits the signed payloads as Sui transactions via object-centric smart contracts.",
    ],
    highlights: [
      "Designed the offline cryptographic signing and delay-tolerant submission model",
      "Built multi-hop LoRa communication with drone-based relay (DJI Air 2S)",
      "Authored Sui smart contracts for immutable sensor logs and drone task tracking",
      "Demonstrated a full offline-to-on-chain transaction flow end to end",
    ],
    stack: ["Sui / Move", "ESP32-S3", "LoRa (SX127x)", "Ed25519", "MQTT", "Drones"],
    links: [
      { label: "Sui blog: Bhutan's offline blockchain", href: "https://blog.sui.io/bhutan-offline-blockchain-dhi-innotech-mysten-labs/" },
      { label: "DHI Newsroom", href: "https://dhi.bt/newsroom/news/6960d860c58c2ea6c7983140" },
    ],
    featured: true,
  },
  {
    slug: "voxel-milabot",
    title: "Voxel Project (MILAbot)",
    status: "in-development",
    category: "Robotics",
    role: "3D simulation, path-planning & robotic-arm interface",
    org: "DHI InnoTech",
    partners: ["MIT Center for Bits and Atoms", "Chiba Institute of Technology", "Green Digital Limited"],
    period: "2025 – 2027",
    oneLiner:
      "Reconfigurable robotic construction using sustainable biovoxel modules, with Gelephu Mindfulness City as the testbed.",
    summary: [
      "A collaborative R&D initiative for a scalable, sustainable, reconfigurable construction platform — combining biovoxel modules made from local materials, a swarm robotic assembly platform (MILAbot), and voxelized modular architecture.",
      "Sparked my interest in robotics. I worked on the Voxel project in collaboration with MIT CBA, including an on-site research visit to MIT.",
    ],
    highlights: [
      "Built a 3D simulation environment for path planning, motion validation, and behavioural testing before deploying to hardware",
      "Developed a custom interface for Universal Robots arms with a Robotiq two-finger gripper for automated assembly/testing",
      "Contributed to physical assembly and integration of the Voxel robotic system",
    ],
    stack: ["Robotics", "3D simulation", "Path planning", "Universal Robots", "Inverse kinematics"],
    featured: true,
  },
  {
    slug: "rikhanet",
    title: "RiKhaNET",
    status: "in-development",
    category: "Conservation & Climate Tech",
    role: "AI/IoT design, dashboard & sensor nodes",
    org: "DHI InnoTech",
    partners: ["JNW Super Fab Lab", "DoFPS", "WWF Bhutan", "Global Tiger Innovation Fund"],
    period: "2025 – 2027",
    oneLiner:
      "Real-time human–tiger conflict early-warning: AI + autonomous IoT sensor nodes shifting from crisis response to prevention.",
    summary: [
      "RiKhaNET (Real-time Integrated Knowledge on Habitat and Animals Network) is a technology-enabled, community-centred initiative to reduce human–tiger conflict in Bhutan, funded by the Global Tiger Innovation Fund.",
      "It pairs an AI model and web dashboard with weather-proof, autonomous IoT sensor nodes capturing imagery, motion, and acoustic signals — consolidating fragmented ecological and conflict data into a single governed platform, while building local AI/IoT capacity.",
    ],
    highlights: [
      "AI model development and a web-based monitoring dashboard",
      "Design and fabrication of autonomous, weather-proof IoT sensor nodes",
      "Early-warning alert workflow (SMS / beacon / dashboard) with SMART database integration",
    ],
    stack: ["AI/ML", "IoT sensor nodes", "Edge AI", "Dashboard", "SMART integration"],
    metrics: ["USD 208,095 total project value"],
    featured: true,
  },
  {
    slug: "bhutan-heritage-nft",
    title: "Bhutan Cultural Heritage NFT Initiative",
    status: "completed",
    category: "Blockchain & Web3",
    role: "Blockchain & Technical Implementation Lead",
    org: "DHI InnoTech",
    partners: ["DCDD", "GovTech Agency"],
    period: "2025",
    oneLiner:
      "Bhutan's first government-linked NFT initiative — digitising cultural heritage into blockchain assets. 8 NFTs, USD 8,631.",
    summary: [
      "A national-level blockchain initiative with the Royal Government of Bhutan to digitise authenticated cultural artifacts into NFTs — enabling global accessibility, transparent provenance, and sustainable revenue.",
      "As Blockchain & Technical Implementation Lead I designed and executed the end-to-end NFT lifecycle: minting pipeline, metadata standards, wallet and financial infrastructure, ETH transaction handling, and transparent multi-stakeholder revenue settlement.",
    ],
    highlights: [
      "Designed the end-to-end minting pipeline (mint → sale → settlement)",
      "Structured metadata and provenance linkage between physical artifacts and NFTs",
      "Coordinated cultural validation (DCDD) and regulatory compliance (GovTech)",
    ],
    stack: ["Ethereum", "NFT / smart contracts", "Wallet infrastructure", "Figma"],
    metrics: ["8 NFTs sold", "USD 8,631 gross revenue"],
    links: [
      { label: "Daily Bhutan: Bhutan's NFT debut", href: "https://www.dailybhutan.com/article/bhutan-s-nft-debut-raises-nu-860-000-in-cultural-showcase" },
    ],
    featured: true,
  },
  {
    slug: "bhusis",
    title: "BhuSIS — Bhutan Soil Information System",
    status: "live",
    category: "Government & Civic",
    role: "Full-stack developer",
    org: "GovTech / DHI InnoTech",
    partners: ["National Soil Services Centre", "Ministry of Agriculture"],
    period: "2025 – 2026",
    oneLiner:
      "A national soil platform replacing fragmented MS Access/Excel systems — web, mobile, NDI auth, and offline field sync.",
    summary: [
      "BhuSIS is a centralized digital platform for the National Soil Services Centre, replacing disconnected MS Access/Excel systems (SPAL, SFP, Soil Survey) with a unified web app, geoportal, and mobile field-data-collection app. Live at bhusis.systems.gov.bt.",
      "I contributed to the initial microservices architecture and continue on the enhancement phase — across master-data management, registration and sample-submission workflows, lab-results and recommendation engines, and the React Native survey app.",
    ],
    highlights: [
      "Led National Digital Identity (NDI) integration for registration and authentication",
      "Built master-data management with RBAC, and the multi-step sample-submission wizard",
      "Implemented offline-first mobile data collection with automatic sync, GPS geotagging, and push notifications",
    ],
    stack: ["FastAPI (Python)", "PostgreSQL", "React Native", "Bhutan NDI", "RBAC"],
    links: [{ label: "bhusis.systems.gov.bt", href: "https://bhusis.systems.gov.bt" }],
    featured: true,
  },
  {
    slug: "iot-water-management",
    title: "IoT Water Management System",
    status: "live",
    category: "IoT & Embedded",
    role: "MQTT layer, Node backend & RN app",
    org: "DHI InnoTech (DRIVE)",
    partners: ["Gyalpozhing", "Semjong"],
    period: "2024 – present",
    oneLiner:
      "Smart municipal water monitoring over MQTT — telemetry, leak alerts, and a single operations dashboard.",
    summary: [
      "An IoT layer over municipal water networks in Gyalpozhing and Semjong: sensors at junctions stream telemetry to a single dashboard with automated leak alerts, built in-house and supported by the JNW Super Fab Lab.",
    ],
    highlights: [
      "Built the MQTT communication layer and Node.js backend",
      "Developed the React Native monitoring app",
    ],
    stack: ["MQTT", "Node.js", "React Native", "IoT sensors"],
    featured: false,
  },
  {
    slug: "national-carbon-registry",
    title: "National Carbon Registry",
    status: "completed",
    category: "Blockchain & Web3",
    role: "Blockchain integration & cloud",
    org: "DHI InnoTech",
    partners: ["World Bank", "DECC", "Chia Network"],
    period: "2023 – 2025",
    oneLiner:
      "Blockchain carbon-market infrastructure for Paris Agreement Article 6, built on Chia and CAD Trust.",
    summary: [
      "National blockchain infrastructure for carbon markets aligned with Paris Agreement Article 6, integrating the Chia blockchain and CAD Trust for transparent carbon-credit registry and tracking.",
    ],
    highlights: ["Chia / CAD-Trust integration", "AWS cloud infrastructure", "Figma design contribution"],
    stack: ["Chia", "CAD Trust", "AWS", "Blockchain"],
    featured: false,
  },
  {
    slug: "hidden-bhutan",
    title: "Hidden Bhutan",
    status: "in-development",
    category: "Mobile & Web Apps",
    role: "Founder / lead developer",
    org: "Personal startup",
    partners: [],
    period: "2025 – present",
    oneLiner:
      "A Bhutan trekking app blending cultural discovery, safety, and gamification on a rich Bhutan-specific dataset.",
    summary: [
      "A cultural-discovery and safety trekking app built on a rich, Bhutan-specific dataset — the defensible moat. Discover culture and nature along each trek, access safety and emergency info, download offline maps, and earn points on a trek leaderboard with a \"My Trek Passport\".",
      "Solo developer; a partner handles business, social, and marketing. In active development.",
    ],
    highlights: [
      "Culture/nature layer: monasteries, dzongs, festivals, flora & fauna per trek",
      "Safety: nearest helipad, health centre, weather, landslide info, signal coverage",
      "Gamification: trek leaderboard with points and a \"My Trek Passport\"",
    ],
    stack: ["React Native", "PostgreSQL", "Next.js", "Offline maps"],
    featured: false,
  },
  {
    slug: "bhutanverse",
    title: "Bhutanverse",
    status: "completed",
    category: "Blockchain & Web3",
    role: "Asset/quest dev, NFT & wallet workflows",
    org: "DHI InnoTech",
    partners: ["Smobler", "The Sandbox"],
    period: "2022 – 2024",
    oneLiner: "Bhutan's metaverse presence on The Sandbox — assets, quests, and NFT/wallet workflows.",
    summary: [
      "Bhutan's metaverse on The Sandbox, developed with Smobler — including asset and quest development plus NFT and wallet workflows.",
    ],
    stack: ["The Sandbox", "NFT", "Wallets", "3D assets"],
    featured: false,
  },
  {
    slug: "tiger-in-the-snow",
    title: "The Tiger in the Snow",
    status: "completed",
    category: "Blockchain & Web3",
    role: "Digitization, minting & wallets",
    org: "DHI InnoTech",
    partners: ["VAST Bhutan"],
    period: "Apr 2024",
    oneLiner: "A phygital conservation NFT bridging Bhutanese art and blockchain ownership, listed on OpenSea.",
    summary: [
      "A phygital conservation NFT initiative with VAST Bhutan — digitization, minting, and wallet setup for Bhutanese art tied to physical works, listed on OpenSea.",
    ],
    stack: ["Ethereum", "NFT", "OpenSea", "Wallets"],
    featured: false,
  },
  {
    slug: "speed-detection",
    title: "Portable Speed Detection (PASDS)",
    status: "in-development",
    category: "AI & Computer Vision",
    role: "System architecture & communications",
    org: "DHI InnoTech",
    partners: ["Royal Bhutan Police"],
    period: "In development",
    oneLiner: "Radar-camera fusion for portable speed enforcement, building on the ANPR platform.",
    summary: [
      "A portable speed-enforcement system fusing radar and camera detection, designed to complement the DRIVE ANPR platform. I work on system architecture and the communication layer.",
    ],
    stack: ["Computer Vision", "Radar fusion", "System architecture"],
    featured: false,
  },
  {
    slug: "cso-grant-portal",
    title: "CSO Grant Portal",
    status: "completed",
    category: "Government & Civic",
    role: "Full-stack developer",
    org: "DHI InnoTech (DRIVE)",
    partners: ["HELVETAS"],
    period: "2024",
    oneLiner: "An AI (GPT-4o) grant-discovery platform for civil-society organisations, handed over to HELVETAS.",
    summary: [
      "A full-stack grant-discovery platform using GPT-4o to match civil-society organisations with relevant funding opportunities. Built with DHI DRIVE for HELVETAS and handed over to them.",
    ],
    stack: ["GPT-4o / LLM", "Next.js", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    slug: "jnwsfl-website",
    title: "JNW Super Fab Lab Platform",
    status: "completed",
    category: "Government & Civic",
    role: "Full-stack; led REST API / backend",
    org: "JNW Super Fab Lab",
    partners: [],
    period: "2022 – 2023",
    oneLiner:
      "The Super Fab Lab's platform — booking, inductions, maintenance, and reporting. My internship capstone.",
    summary: [
      "A full platform for the Jigme Namgyel Wangchuck Super Fab Lab covering machine booking, inductions, maintenance, and reporting. I led the REST API and backend, starting from my 2022 DHI internship.",
    ],
    stack: ["Next.js", "Node.js / Express", "MongoDB", "JWT"],
    featured: false,
  },
  {
    slug: "furniture-land",
    title: "Furniture Land",
    status: "completed",
    category: "Mobile & Web Apps",
    role: "Full-stack developer",
    org: "University major project",
    partners: [],
    period: "2022",
    oneLiner: "A full-stack furniture e-commerce platform — my university capstone (pre-LLM era).",
    summary: [
      "A full-stack furniture e-commerce application built as my university major project, covering catalogue, cart, and order workflows.",
    ],
    stack: ["React", "Node.js", "Express"],
    featured: false,
  },
  {
    slug: "icimod-mhra",
    title: "ICIMOD MHRA — Forest-Fire → Landslide Model",
    status: "completed",
    category: "Conservation & Climate Tech",
    role: "ML & geospatial contributor",
    org: "ICIMOD (Nepal)",
    partners: ["ICIMOD"],
    period: "2024 – 2025",
    oneLiner:
      "An ML model for cascading multi-hazards (forest-fire → landslide) built at the ICIMOD hackathon.",
    summary: [
      "A machine-learning model for cascading hazards — forest fire triggering landslide risk — built at ICIMOD's Multi-Hazard Risk Assessment hackathon in Nepal using Random Forest and Google Earth Engine.",
    ],
    stack: ["Python", "Random Forest", "Google Earth Engine", "Remote sensing"],
    featured: false,
  },
];

/**
 * An override emitted by the Obsidian sync (`projects.generated.json`).
 * `slug` is required; any other field overlays the matching base project.
 * `hidden: true` removes a project from the site.
 */
type ProjectOverride = Partial<Project> & { slug: string; hidden?: boolean };

const PROJECT_DEFAULTS = {
  partners: [] as string[],
  stack: [] as string[],
  summary: [] as string[],
  featured: false,
} satisfies Partial<Project>;

/**
 * Merge the Obsidian-synced overrides on top of the curated base projects,
 * by slug. New slugs are appended; `hidden` entries are removed. The base
 * list guarantees the site always has content even with no vault present.
 */
function mergeProjects(): Project[] {
  const overrides = projectOverridesData as unknown as ProjectOverride[];
  const map = new Map(BASE_PROJECTS.map((p) => [p.slug, p]));

  for (const o of overrides) {
    if (!o || !o.slug) continue;
    if (o.hidden) {
      map.delete(o.slug);
      continue;
    }
    const existing = map.get(o.slug);
    map.set(o.slug, {
      ...PROJECT_DEFAULTS,
      ...(existing ?? {}),
      ...o,
    } as Project);
  }

  return Array.from(map.values());
}

export const PROJECTS: Project[] = mergeProjects();

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "AI & Computer Vision",
  "Robotics",
  "Blockchain & Web3",
  "IoT & Embedded",
  "Conservation & Climate Tech",
  "Government & Civic",
  "Mobile & Web Apps",
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export interface Job {
  role: string;
  company: string;
  type: "Full-time" | "Contract" | "Internship" | "Volunteer";
  period: string;
  current?: boolean;
  summary: string;
}

const BASE_EXPERIENCE: Job[] = [
  {
    role: "Software Engineer",
    company: "DHI InnoTech (DRIVE)",
    type: "Full-time",
    period: "Jun 2023 – present",
    current: true,
    summary:
      "Backend, system architecture, and integration across national-impact projects — ANPR, ByteCrane, the Carbon Registry, NFT initiatives, IoT water management, BhuSIS, and the Voxel robotics R&D with MIT CBA.",
  },
  {
    role: "Project & Technical Lead — Guru App",
    company: "GEIPL",
    type: "Contract",
    period: "May 2025 – Apr 2026",
    summary:
      "Led a team of three to deliver the cross-platform Guru App (10,000+ downloads) — mobile app, backend, sync, NFC hardware integration, and admin dashboard.",
  },
  {
    role: "Software Engineer (remote)",
    company: "Energy Integrated",
    type: "Contract",
    period: "May – Nov 2024",
    summary:
      "Frontend (Next.js) plus Kafka/REST/OAuth integration for energy-retail products in the Netherlands. (Work under NDA.)",
  },
  {
    role: "Frontend Developer",
    company: "Chiliquest Technology",
    type: "Full-time",
    period: "Dec 2022 – Jun 2023",
    summary: "Frontend development across client web applications using React and modern JavaScript tooling.",
  },
  {
    role: "Program Coordinator — Fab23 Bhutan",
    company: "JNW Super Fab Lab",
    type: "Volunteer",
    period: "Jun – Jul 2023",
    summary:
      "Coordinated the global Fab Lab summit (Fab23) hosted in Bhutan — stakeholder management and on-the-ground logistics.",
  },
  {
    role: "Developer Intern",
    company: "TIJ-Tech",
    type: "Internship",
    period: "Jun – Sep 2022",
    summary: "Software development internship with a focus on Python and AI/ML work.",
  },
  {
    role: "Backend Developer Intern",
    company: "DHI InnoTech",
    type: "Internship",
    period: "Apr – Sep 2022",
    summary:
      "Backend internship that grew into leading the REST API/backend for the JNW Super Fab Lab platform.",
  },
];

export const EXPERIENCE: Job[] = pickList(experienceOverrideData, BASE_EXPERIENCE);

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const TOP_SKILLS: string[] = [
  "System architecture & design",
  "Backend & distributed systems",
  "Full-stack & mobile",
  "IoT & embedded systems",
  "AI/ML integration",
  "Blockchain",
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript / JavaScript", "Python", "C (embedded)", "Move (Sui)", "SQL"] },
  { label: "Frontend & mobile", items: ["React", "Next.js", "React Native", "Vue.js"] },
  { label: "Backend", items: ["Node.js", "Express", "NestJS", "FastAPI", "REST"] },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Mongoose"] },
  { label: "AI / ML", items: ["TensorFlow Lite", "CoreML", "Computer vision", "GPT-4o / LLM integration", "YOLOv8"] },
  { label: "Blockchain", items: ["Sui smart contracts", "Ethereum / NFT", "Chia"] },
  { label: "IoT & systems", items: ["MQTT", "NFC", "LoRa", "ESP32", "Sensor integration", "Microservices"] },
  { label: "Tools & practices", items: ["Git / GitHub", "Docker", "CI/CD (GitHub Actions, Fastlane)", "Agile", "Figma"] },
];

/* -------------------------------------------------------------------------- */
/* Education, trainings, credentials                                          */
/* -------------------------------------------------------------------------- */

export interface Education {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export const EDUCATION: Education[] = [
  {
    degree: "B.E., Computer Science & Engineering",
    school: "Chitkara University, India",
    period: "Graduated Jun 2023",
    detail:
      "CGPA 9.65/10. Coursework in algorithms, operating systems, databases, networking, software engineering, system architecture, and electronics & IoT.",
  },
];

export interface Training {
  title: string;
  org: string;
  note: string;
}

const BASE_TRAININGS: Training[] = [
  { title: "Generative AI & AI Applications", org: "Training", note: "GenAI / AI application development — fed the CSO Grant Portal (GPT-4o)." },
  { title: "Sui Bootcamp", org: "Sui Foundation", note: "Sui / Move blockchain development — fed the ByteCrane PoC." },
  { title: "ISRO — Remote Sensing", org: "ISRO", note: "Remote sensing for conservation and climate applications." },
  { title: "NASA ARSET — Earth Observation & Remote Sensing", org: "NASA", note: "Earth observation and remote-sensing techniques." },
  { title: "DevSecOps", org: "Training", note: "Secure DevOps practices across the delivery pipeline." },
  { title: "Multi-Hazard Risk Assessment Hackathon", org: "ICIMOD", note: "ML model for cascading hazards (forest-fire → landslide)." },
];

export const TRAININGS: Training[] = pickList(trainingsOverrideData, BASE_TRAININGS);

export interface Award {
  title: string;
  year: string;
  note: string;
}

const BASE_AWARDS: Award[] = [
  {
    title: "ICDL National Champion",
    year: "2018",
    note: "First in Bhutan; represented Bhutan at the international finals in Bangkok, Thailand.",
  },
  {
    title: "Bhutan Code Challenge Winner",
    year: "2018",
    note: "Won BITC's first hackathon with an online quiz platform.",
  },
  {
    title: "South Asian Bodybuilding & Physique Championship",
    year: "2026",
    note: "Represented Bhutan at the 16th edition, Men's Sport Physique category.",
  },
];

export const AWARDS: Award[] = pickList(awardsOverrideData, BASE_AWARDS);

/* -------------------------------------------------------------------------- */
/* Freelance availability & services (SEO / discoverability)                  */
/* -------------------------------------------------------------------------- */

export const AVAILABILITY = "Available for freelance & select projects";

export interface Service {
  name: string;
  description: string;
}

/** Services clients can hire for — lead with full-stack web & mobile. */
export const SERVICES: Service[] = [
  {
    name: "Full-stack web development",
    description:
      "Production web apps, dashboards, and platforms with React, Next.js, Node.js, and FastAPI — from MVP to scaled product.",
  },
  {
    name: "Mobile app development",
    description:
      "Cross-platform iOS & Android apps with React Native, including NFC, offline-first sync, and on-device ML.",
  },
  {
    name: "AI & LLM integration",
    description:
      "GPT-4o/LLM features, computer vision, and on-device ML wired into real products and workflows.",
  },
  {
    name: "IoT & blockchain systems",
    description:
      "IoT/embedded systems (MQTT, ESP32, LoRa) and blockchain/Web3 integration (Sui, Ethereum, NFTs).",
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Who is Subham Chhetri?",
    a: "Subham Chhetri is a Software Engineer at DHI InnoTech (DRIVE) in Thimphu, Bhutan. He builds AI, robotics, blockchain, and IoT systems for national-impact projects and holds a B.E. in Computer Science & Engineering (CGPA 9.65/10).",
  },
  {
    q: "What does Subham Chhetri do?",
    a: "He works at the intersection of AI, robotics, blockchain, and IoT, with a focus on system architecture and shipping real-world systems. His work includes Bhutan's sovereign ANPR system, an MQTT-based IoT water-management platform, offline blockchain R&D (ByteCrane, validated with Mysten Labs), reconfigurable robotics with MIT's Center for Bits and Atoms, and the cross-platform Guru App (10,000+ downloads).",
  },
  {
    q: "Where is Subham Chhetri based?",
    a: "He is based in Thimphu, Bhutan, and works at DHI InnoTech, the innovation arm of Druk Holding & Investments. He is open to remote and international roles and collaborations.",
  },
  {
    q: "What technologies and skills does Subham work with?",
    a: "Core languages are TypeScript/JavaScript and Python. He works with React, Next.js, and React Native on the frontend/mobile; Node.js, Express, NestJS, and FastAPI on the backend; PostgreSQL and MongoDB for data; TensorFlow Lite, CoreML, computer vision, and GPT-4o/LLM integration for AI; Sui, Ethereum, and Chia for blockchain; and MQTT, NFC, LoRa, and ESP32 for IoT and embedded systems.",
  },
  {
    q: "What are Subham Chhetri's notable projects?",
    a: "The DRIVE ANPR System (Bhutan's sovereign AI number-plate recognition for the Royal Bhutan Police), the Guru App (a digital prayer-bead app with 10,000+ downloads), ByteCrane (offline IoT-to-blockchain validated with the Sui team), the Voxel Project (reconfigurable robotic construction with MIT CBA), RiKhaNET (AI/IoT human–tiger conflict early-warning), the Bhutan Cultural Heritage NFT Initiative, and BhuSIS (the national Bhutan Soil Information System).",
  },
  {
    q: "What is Subham Chhetri's educational background?",
    a: "He holds a Bachelor of Engineering in Computer Science & Engineering from Chitkara University, India (graduated June 2023) with a CGPA of 9.65/10. He has also completed trainings including the Sui Bootcamp, NASA ARSET and ISRO remote-sensing courses, and a Generative AI applications program.",
  },
  {
    q: "How can I contact Subham Chhetri?",
    a: `The fastest way to reach him is by email at ${CONTACT.email}. He is also reachable by phone/WhatsApp at ${CONTACT.phone} and on GitHub (SubhamChhetri) and LinkedIn.`,
  },
  {
    q: "Is Subham Chhetri available for freelance work?",
    a: `Yes. ${PROFILE.name} is available for freelance and contract projects, both remote and on-site. He has delivered freelance/contract work for clients including GEIPL (the Guru App, 10,000+ downloads) and Energy Integrated in the Netherlands. The fastest way to start is to email ${CONTACT.email}.`,
  },
  {
    q: "Can I hire Subham Chhetri as a freelance developer?",
    a: "Yes. You can hire him for full-stack web development (React, Next.js, Node.js, FastAPI), mobile apps (React Native, iOS & Android), AI/LLM integration, and IoT or blockchain systems. He takes on a limited number of select projects at a time, from MVPs to production systems.",
  },
  {
    q: "Does Subham work remotely with international clients?",
    a: "Yes. Based in Thimphu, Bhutan, he works with clients worldwide and has remote contract experience with European clients. Time-zone overlap, async updates, and clear scoping are part of how he runs projects.",
  },
  {
    q: "What kind of freelance projects does Subham take on?",
    a: "Web apps and platforms, cross-platform mobile apps, AI/LLM-powered features, dashboards, and IoT or blockchain integrations. He's a strong fit for projects that need solid system architecture, full-stack delivery, and someone who can ship end to end.",
  },
  {
    q: "How much does Subham Chhetri charge?",
    a: `Pricing is project-based and quoted per scope — there are no fixed public rates. Share your project goals, timeline, and budget by email at ${CONTACT.email} and he'll respond with an approach and estimate.`,
  },
  {
    q: "How quickly does Subham respond to project enquiries?",
    a: `Email is the best first contact (${CONTACT.email}); he typically replies within a couple of days. Including your goals, rough timeline, and budget up front gets you a faster, more useful response.`,
  },
];

/* -------------------------------------------------------------------------- */
/* Site config & navigation                                                   */
/* -------------------------------------------------------------------------- */

export const SITE = {
  name: PROFILE.name,
  role: PROFILE.role,
  tagline: PROFILE.shortBio,
  // Change to your custom domain (e.g. https://subhamchhetri.dev) when you have
  // one, then deploy with CUSTOM_DOMAIN set and no NEXT_PUBLIC_BASE_PATH.
  url: "https://subhamchhetri.github.io/portfolio",
  email: CONTACT.email,
  location: CONTACT.location,
};

export interface NavItem {
  label: string;
  href: string;
}

export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
];

export const NAV_CTA: NavItem = { label: "Contact", href: "/contact" };
