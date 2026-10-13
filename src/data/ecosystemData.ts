export interface ContentPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: "blue" | "red" | "yellow" | "green";
  potentialContributors: string;
  focusPoints: string[];
}

export interface VenueZone {
  id: string;
  name: string;
  highlight: string;
  description: string;
  icon: string;
  badge: string;
  color: "blue" | "red" | "yellow" | "green";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Space" | "AI & Robotics" | "Keynotes" | "Showcase" | "Community";
  imageUrl: string;
  caption: string;
}

export const CONTENT_PILLARS: ContentPillar[] = [
  {
    id: "space-tech",
    title: "Space Technology",
    subtitle: "Satellites, Space Data & Madhya Pradesh Orbit",
    description: "Spotlighting the emerging space-tech ecosystem in Central India, satellite applications, space data APIs, exploration, and developer opportunities.",
    icon: "Rocket",
    color: "blue",
    potentialContributors: "Space-sector delegates, Space Club of India representatives, researchers & space founders",
    focusPoints: [
      "Satellite applications & space-data pipelines",
      "Space Club of India emerging partnership & telemetry showcase",
      "Developer & startup opportunities in the private space economy",
      "Interactive Space Engagement Corner",
    ],
  },
  {
    id: "ai-agents",
    title: "AI & Agentic AI",
    subtitle: "Generative Models, Multi-Agent Swarms & Workflows",
    description: "Deep-dives into production-grade Generative AI, autonomous agents, reasoning systems, developer toolchains, and responsible enterprise AI.",
    icon: "BrainCircuit",
    color: "red",
    potentialContributors: "AI practitioners, Google Developer Experts (GDEs), product builders & enterprise AI architects",
    focusPoints: [
      "Multi-agent orchestration & reasoning loops",
      "Enterprise LLM deployment & security guardrails",
      "Code generation workflows & autonomous tool usage",
      "Real-world enterprise case studies",
    ],
  },
  {
    id: "physical-ai",
    title: "Physical AI & Robotics",
    subtitle: "Edge Intelligence, Sensors & Real-World Deployments",
    description: "Where artificial intelligence meets physical hardware: robotics, autonomous edge nodes, sensors, embedded systems, and real-time inference.",
    icon: "Cpu",
    color: "yellow",
    potentialContributors: "Hardware innovators, physical AI researchers, embedded systems engineers & industry practitioners",
    focusPoints: [
      "On-device neural inference and edge accelerators",
      "Robotics control loops and sensor fusion",
      "Spatial computing and IoT integration",
      "Qualcomm Showcase & live hardware exhibitions",
    ],
  },
  {
    id: "data-cloud",
    title: "Data & Cloud Architecture",
    subtitle: "AI-Ready Data Foundations & Scalable Infrastructure",
    description: "Modern data engineering, analytics platforms, distributed cloud architecture, and building the rock-solid foundations required for enterprise AI.",
    icon: "Database",
    color: "green",
    potentialContributors: "Data leaders, cloud architects, database engineers & infrastructure experts",
    focusPoints: [
      "Vector search & scalable retrieval architectures",
      "Zero-downtime distributed cloud systems",
      "Data pipeline automation & observability",
      "Planet-scale multi-cloud patterns",
    ],
  },
  {
    id: "enterprise-innovation",
    title: "Enterprise & Product Innovation",
    subtitle: "Startups, Demos & Technology Adoption",
    description: "Curated product showcases, corporate venture innovation, startup demos, and strategic technology adoption across Central India's burgeoning market.",
    icon: "Briefcase",
    color: "blue",
    potentialContributors: "Enterprises, venture leaders, startup founders, product managers & community partners",
    focusPoints: [
      "Product showcase & enterprise discovery hub",
      "Startup pitch clinics & investor interactions",
      "Accelerating technology adoption in tier-2 ecosystems",
      "Strategic cross-community networking lounges",
    ],
  },
];

export const VENUE_ZONES: VenueZone[] = [
  {
    id: "main-hall",
    name: "Main Session Hall",
    highlight: "Keynotes & Space-Tech Segment",
    description: "Flagship auditorium for keynotes, space technology spotlight, agentic AI, physical AI, and data presentations.",
    icon: "Sparkles",
    badge: "Plenary Stage",
    color: "blue",
  },
  {
    id: "workshop-1",
    name: "Workshop Track 1",
    highlight: "Hands-on AI & Agentic Tooling",
    description: "Deep, code-along workshop lab focusing on GenAI architectures, multi-agent frameworks, and developer workflows.",
    icon: "Terminal",
    badge: "Hands-on Lab",
    color: "red",
  },
  {
    id: "workshop-2",
    name: "Workshop Track 2",
    highlight: "Physical AI, Robotics & Space-Data",
    description: "Hardware interfacing, sensor integration, edge models, and processing real satellite telemetry data.",
    icon: "Layers",
    badge: "Hands-on Lab",
    color: "yellow",
  },
  {
    id: "qualcomm-showcase",
    name: "Qualcomm Showcase Area",
    highlight: "Dedicated Exhibition Zone",
    description: "Demonstration-led tech display area for approved devices, platforms, and edge compute use cases (subject to confirmation).",
    icon: "Cpu",
    badge: "Partner Showcase",
    color: "green",
  },
  {
    id: "product-showcase",
    name: "Product & Enterprise Showcase",
    highlight: "Startups & Emerging Tech Demos",
    description: "Curated booths where attendees meet innovative enterprise teams, startup founders, and explore collaboration.",
    icon: "Box",
    badge: "Exhibition Zone",
    color: "blue",
  },
  {
    id: "space-corner",
    name: "Space Engagement Corner",
    highlight: "Interactive Space Hub",
    description: "Dedicated hub to meet space-sector delegates, learn about Space Club of India initiatives, and explore aerospace opportunities.",
    icon: "Rocket",
    badge: "Special Feature",
    color: "red",
  },
  {
    id: "experts-lounge",
    name: "Experts’ Lounge",
    highlight: "Curated Networking Experience",
    description: "Networking lunch and strategic exchange area for speakers, GDEs, space delegates, and ecosystem leaders.",
    icon: "Users",
    badge: "VIP & Speakers",
    color: "yellow",
  },
  {
    id: "community-lounge",
    name: "Community & Peer Lounge",
    highlight: "Open Collaboration Space",
    description: "Community-oriented gathering space supporting peer networking, unconference huddles, and cross-community connections.",
    icon: "Heart",
    badge: "Community Hub",
    color: "green",
  },
  {
    id: "registration-welcome",
    name: "Registration & Welcome Arena",
    highlight: "Digital Check-in & Wayfinding",
    description: "Seamless QR badge check-in, orientation desk, event maps, and attendee support across all venue zones.",
    icon: "Compass",
    badge: "Entry Zone",
    color: "blue",
  },
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "cld-1",
    title: "Flagship Keynote & Central Stage",
    category: "Keynotes",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833310/devfest_indore_photos/taak2nfhb2885qkf5uty.jpg",
    caption: "Auditorium keynote spotlighting emerging technology ecosystems and developer opportunities.",
  },
  {
    id: "cld-2",
    title: "Grand Tech Stage Atmosphere",
    category: "Keynotes",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833313/devfest_indore_photos/zicaez3j5rmsftpmumry.jpg",
    caption: "Stage lighting and immersive audio-visual production at DevFest Indore.",
  },
  {
    id: "cld-3",
    title: "Speaker Insights & Technical Deep-Dive",
    category: "Keynotes",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833315/devfest_indore_photos/zj1dbyovpwjn29bv5xi1.jpg",
    caption: "Distinguished Google Developer Experts presenting production architectural patterns.",
  },
  {
    id: "cld-4",
    title: "Interactive Q&A and Engineering Exchange",
    category: "Keynotes",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833318/devfest_indore_photos/sx75veuf01gnhvrzpr5s.jpg",
    caption: "Attendees asking deep technical questions with keynote leaders.",
  },
  {
    id: "cld-5",
    title: "Robotics & Hardware Silicon Demos",
    category: "AI & Robotics",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833320/devfest_indore_photos/scno9pae8pfkhcrvhzj6.jpg",
    caption: "Hands-on robotics and edge accelerator hardware demonstrations.",
  },
  {
    id: "cld-6",
    title: "Physical AI Sensors & Edge Testing",
    category: "AI & Robotics",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833323/devfest_indore_photos/lcw28ybgiyrwi5mh9hw6.jpg",
    caption: "Real-world telemetry tracking and physical AI sensor nodes.",
  },
  {
    id: "cld-7",
    title: "Hands-on Codelab & Workshop Track",
    category: "AI & Robotics",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833326/devfest_indore_photos/wxwnxsoam5juxdlq2kop.jpg",
    caption: "Engineers live-coding autonomous reasoning agents on laptops.",
  },
  {
    id: "cld-8",
    title: "Space & Aerospace Telemetry Zone",
    category: "Space",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833329/devfest_indore_photos/b4mgrfjgvcvsmb25dsgu.jpg",
    caption: "Satellite data feeds and aerospace club engagement displays.",
  },
  {
    id: "cld-9",
    title: "Product & Enterprise Showcase",
    category: "Showcase",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833332/devfest_indore_photos/bldvbtgtvdz9iyvtnlaj.jpg",
    caption: "Startup booths demonstrating innovative solutions to prospective enterprise partners.",
  },
  {
    id: "cld-10",
    title: "Sponsor Hub & Career Networking",
    category: "Showcase",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833334/devfest_indore_photos/xwpwopse70n4mhbekpzk.jpg",
    caption: "Sponsors engaging directly with talent across Madhya Pradesh.",
  },
  {
    id: "cld-11",
    title: "Community Huddle & Peer Discussions",
    category: "Community",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833337/devfest_indore_photos/yhzn2wkrwme8kriaccjc.jpg",
    caption: "Open spaces and informal unconference coffee chats between sessions.",
  },
  {
    id: "cld-12",
    title: "Central India Developer Solidarity",
    category: "Community",
    imageUrl: "https://res.cloudinary.com/agcnziwc/image/upload/v1791833339/devfest_indore_photos/sgrfudtv2f8ebkemlosq.jpg",
    caption: "600+ builders celebrating tech innovation in India's cleanest city.",
  },
];
