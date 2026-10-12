export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Core Organizer" | "Design & Experience" | "Tech & Operations" | "Space & Ecosystem" | "Community";
  bio: string;
  avatar: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface PastSpeaker {
  id: string;
  name: string;
  role: string;
  company: string;
  year: "2024" | "2023" | "2022";
  topic: string;
  avatar: string;
  spotlightBadge: string;
  category: "GenAI" | "Cloud" | "Mobile & Flutter" | "Web";
}

export interface SupportQuery {
  id: string;
  name: string;
  email: string;
  category: "Tickets & Registration" | "Sponsorship" | "Speaking & CFP" | "General";
  message: string;
  date: string;
  status: "new" | "resolved";
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speakerName: string;
  speakerRole: string;
  speakerAvatar?: string;
  track: "Space Technology" | "AI & Agentic AI" | "Physical AI & Robotics" | "Data & Cloud" | "Enterprise Innovation";
  hall: "Main Session Hall" | "Workshop Track 1" | "Workshop Track 2" | "Space Engagement Corner";
  description: string;
  tags: string[];
}

export const INITIAL_AGENDA: AgendaItem[] = [
  {
    id: "ag-1",
    time: "09:00 AM – 09:45 AM",
    title: "Opening Vision & Space Club of India Planned MOU Announcement",
    speakerName: "GDG Indore & Space Club of India Delegates",
    speakerRole: "Ecosystem Leadership",
    speakerAvatar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    track: "Space Technology",
    hall: "Main Session Hall",
    description: "Welcome address, ecosystem milestone unveiling, and keynote on satellite data developer opportunities in Madhya Pradesh.",
    tags: ["Keynote", "Planned MOU", "Space Orbit"],
  },
  {
    id: "ag-2",
    time: "10:00 AM – 11:00 AM",
    title: "Autonomous Agentic Swarms & Multi-Modal Gemini Architecture",
    speakerName: "Google Developer Experts (GDE)",
    speakerRole: "Staff AI Architect",
    speakerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    track: "AI & Agentic AI",
    hall: "Main Session Hall",
    description: "Deep-dive into multi-agent reasoning loops, tool-calling execution, and enterprise guardrails.",
    tags: ["Agentic AI", "Gemini 2.5", "Vertex AI"],
  },
  {
    id: "ag-3",
    time: "11:15 AM – 12:30 PM",
    title: "Hands-on Workshop: Building On-Device Vision & Robotics Loops",
    speakerName: "Hardware & Edge Innovators",
    speakerRole: "Physical AI Lead",
    speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    track: "Physical AI & Robotics",
    hall: "Workshop Track 1",
    description: "Live-coding real-time sensor processing and deploying inference models to embedded silicon.",
    tags: ["Qualcomm Edge", "Sensors", "Robotics"],
  },
  {
    id: "ag-4",
    time: "02:00 PM – 03:00 PM",
    title: "Processing Earth Observation Satellite Telemetry with Python & Cloud",
    speakerName: "Space Systems Engineer",
    speakerRole: "Aerospace Labs",
    speakerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    track: "Space Technology",
    hall: "Workshop Track 2",
    description: "Hands-on lab parsing raw geospatial orbital feeds and building environmental monitoring pipelines.",
    tags: ["Satellite Data", "Space Tech", "Geospatial"],
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Soham Sharma",
    role: "Lead Organizer & GDG Indore Founder",
    team: "Core Organizer",
    bio: "Driving Central India's developer ecosystem, cloud architectures, and flagship technical festivals for over 6 years.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    id: "tm-2",
    name: "Priyal Gupta",
    role: "Community Lead & Partner Ecosystem",
    team: "Core Organizer",
    bio: "Head of ecosystem alliances, managing corporate sponsorships, university chapters, and volunteer mobilization.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    id: "tm-3",
    name: "Prathak Verma",
    role: "Head of Tech & Physical AI Track",
    team: "Tech & Operations",
    bio: "Specializing in embedded systems, edge compute, and hardware demonstration tracks for DevFest Indore 2026.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "tm-4",
    name: "Shubham Joshi",
    role: "Space Technology Lead & Aerospace Liaison",
    team: "Space & Ecosystem",
    bio: "Coordinating the Space Club of India planned MOU, satellite telemetry workshops, and space enthusiast activations.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "tm-5",
    name: "Aakriti Sen",
    role: "Experience & Creative Director",
    team: "Design & Experience",
    bio: "Crafting Awwwards-caliber brand aesthetics, spatial layouts, badges, and the Indore cultural narrative.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
];

export const INITIAL_PAST_SPEAKERS: PastSpeaker[] = [
  {
    id: "ps-1",
    name: "Kartik Arora",
    role: "Staff AI Engineer",
    company: "Google Cloud",
    year: "2024",
    topic: "Building Resilient Vector Pipelines with Gemini Models",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    spotlightBadge: "DevFest 2024 Keynote",
    category: "GenAI",
  },
  {
    id: "ps-2",
    name: "Megha Singhal",
    role: "GDE Android & Flutter",
    company: "Zomato",
    year: "2024",
    topic: "Declarative UI Performance & Micro-Animations at Scale",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    spotlightBadge: "Top Rated Session",
    category: "Mobile & Flutter",
  },
  {
    id: "ps-3",
    name: "Rohan Kulkarni",
    role: "Principal Architect",
    company: "Red Hat",
    year: "2023",
    topic: "Zero-Trust Cloud Native Networking on Kubernetes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    spotlightBadge: "DevFest 2023 Spotlight",
    category: "Cloud",
  },
  {
    id: "ps-4",
    name: "Dr. Arvind Pathak",
    role: "Space Systems Lead",
    company: "Aerospace Labs",
    year: "2024",
    topic: "Earth Observation Data APIs for Civil Engineers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    spotlightBadge: "Space Pioneer",
    category: "Cloud",
  },
];

export const INITIAL_SUPPORT_QUERIES: SupportQuery[] = [
  {
    id: "sq-1",
    name: "Aman Deshmukh",
    email: "aman.deshmukh@enterprise.com",
    category: "Tickets & Registration",
    message: "Can we purchase a corporate bundle for our engineering team of 15 developers with GST invoicing?",
    date: "12 Oct 2026",
    status: "new",
  },
  {
    id: "sq-2",
    name: "Dr. Ritu Verma",
    email: "r.verma@space-research.org",
    category: "Speaking & CFP",
    message: "We would like to contribute an interactive satellite telemetry demo to the Space Engagement Corner.",
    date: "11 Oct 2026",
    status: "new",
  },
  {
    id: "sq-3",
    name: "Tanmay Bansal",
    email: "tanmay@techstartup.in",
    category: "Sponsorship",
    message: "Inquiring about booth footprint specifications for the Product & Enterprise Showcase zone.",
    date: "10 Oct 2026",
    status: "resolved",
  },
];
