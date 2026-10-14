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
    instagram?: string;
    email?: string;
    website?: string;
  };
}

export interface PastSpeaker {
  id: string;
  name: string;
  role: string;
  company: string;
  year: "2025" | "2024" | "2023" | "2022";
  topic: string;
  description?: string;
  bio?: string;
  avatar: string;
  spotlightBadge: string;
  category: "GenAI" | "Cloud" | "Mobile & Flutter" | "Web" | "Leadership & Ecosystem";
  track?: string;
  level?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    email?: string;
    website?: string;
    blog?: string;
  };
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
    name: "Tushar Pal",
    role: "Community Lead & GDG Indore Organizer",
    team: "Core Organizer",
    bio: "Pioneering the Central India developer ecosystem, community-driven cloud architectures, and developer chapters across Madhya Pradesh.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/in/tusharpal/",
      twitter: "https://x.com/tusharpal",
      github: "https://github.com/tusharpal",
      instagram: "https://www.instagram.com/gdgindore/",
      email: "mailto:organizers@gdgindore.in",
    },
  },
  {
    id: "tm-2",
    name: "Akash Gangrade",
    role: "Organizer & Tech Architecture Lead",
    team: "Core Organizer",
    bio: "Head of technical operations, infrastructure, speaker curation, and developer experience for DevFest Indore 2026.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/in/akashgangrade/",
      twitter: "https://x.com/akashgangrade",
      github: "https://github.com/akashgangrade",
      instagram: "https://www.instagram.com/gdgindore/",
      email: "mailto:organizers@gdgindore.in",
    },
  },
  {
    id: "tm-3",
    name: "Karan Mittal",
    role: "Organizer & Operations Lead",
    team: "Core Organizer",
    bio: "Orchestrating event partnerships, venue logistics, attendee experience, and corporate sponsorship ecosystems.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/in/karanmittal/",
      twitter: "https://x.com/karanmittal",
      github: "https://github.com/karanmittal",
      instagram: "https://www.instagram.com/gdgindore/",
      email: "mailto:organizers@gdgindore.in",
    },
  },
  {
    id: "tm-4",
    name: "Priyal Gupta",
    role: "Partner Ecosystem & Community Evangelist",
    team: "Core Organizer",
    bio: "Head of ecosystem alliances, managing corporate sponsorships, university chapters, and volunteer mobilization.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/company/gdg-indore",
      twitter: "https://x.com/GDG_Indore",
      instagram: "https://www.instagram.com/gdgindore/",
      email: "mailto:organizers@gdgindore.in",
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
      linkedin: "https://www.linkedin.com/company/gdg-indore",
      twitter: "https://x.com/GDG_Indore",
      instagram: "https://www.instagram.com/gdgindore/",
      email: "mailto:organizers@gdgindore.in",
    },
  },
];

export const INITIAL_PAST_SPEAKERS: PastSpeaker[] = [
  {
    id: "sp-abhishek-doshi",
    name: "Abhishek Doshi",
    role: "Google Developer Expert - Dart, Flutter & Firebase",
    company: "Tech Lead - Qvin",
    year: "2025",
    topic: "Power of BuildContext in Flutter",
    description: "BuildContext is at the heart of Flutter’s widget tree, yet its true potential often goes untapped. In this talk, we’ll find out what BuildContext really represents, how it connects widgets to their position in the tree, and the powerful capabilities it unlocks.",
    bio: "Google Developer Expert - Dart, Flutter & Firebase. Passionate tech lead and community educator.",
    avatar: "https://cdn.sessionize.com/image/c251-400o400o1-B8TgJLdhLWoiMHhaBsSbRU.png",
    spotlightBadge: "Google Developer Expert",
    category: "Mobile & Flutter",
    track: "Mobile",
    level: "Intermediate",
    socials: {
      linkedin: "https://www.linkedin.com/in/abhishekdoshi26/",
      twitter: "https://twitter.com/AbhishekDoshi26",
      blog: "https://abhishekdoshi26.medium.com/",
      website: "https://abhishekdoshi.dev",
      email: "mailto:adoshi26.ad@gmail.com"
    }
  },
  {
    id: "sp-divyanshu-bhargava",
    name: "Divyanshu Bhargava",
    role: "Co-Founder Stac | Google Developer Expert (Flutter & Dart)",
    company: "Stac",
    year: "2025",
    topic: "Scaling Server-Driven UI with Stac",
    description: "Divyanshu explores how Server-Driven UI changes mobile development workflows, allowing real-time layout updates without app-store deployment cycles using Stac.",
    bio: "Divyanshu Bhargava is a Co-Founder of Stac and a Google Developer Expert in Flutter & Dart.",
    avatar: "https://cdn.sessionize.com/image/0956-400o400o1-7zRPyQYiWPBXp2513gkMyo.png",
    spotlightBadge: "Google Developer Expert",
    category: "Mobile & Flutter",
    track: "Mobile",
    level: "Intermediate",
    socials: {
      linkedin: "https://www.linkedin.com/in/divyanshub024/",
      twitter: "https://twitter.com/divyanshub024",
      blog: "https://divyanshu.dev/",
      website: "https://stac.dev/",
      email: "mailto:divyanshub024@gmail.com"
    }
  },
  {
    id: "sp-ankit-sharma",
    name: "Ankit Sharma",
    role: "Staff Frontend Engineer | GDE for Angular | Microsoft MVP",
    company: "Celonis",
    year: "2025",
    topic: "Smart Angular Apps with Gemini: Building an AI-Powered Writing Assistant",
    description: "As a Staff Frontend Engineer at Celonis, Ankit demonstrates how to integrate Google Gemini directly into modern Angular applications to build context-aware AI copilots.",
    bio: "Staff Frontend Engineer at Celonis, Google Developer Expert for Angular, and Microsoft MVP.",
    avatar: "https://cdn.sessionize.com/image/142e-400o400o1-E9cZ5wzVHTHaCvoh7CeVA7.jpg",
    spotlightBadge: "Google Developer Expert",
    category: "Web",
    track: "Web",
    level: "Intermediate",
    socials: {
      linkedin: "https://www.linkedin.com/in/ankitsharma-007/",
      twitter: "https://twitter.com/ankitsharma_007",
      blog: "https://www.syncfusion.com/blogs/author/ankit-sharma",
      website: "https://www.celonis.com/",
      email: "mailto:ankit007.sharma@hotmail.com"
    }
  },
  {
    id: "sp-srashti-jain",
    name: "Srashti Jain",
    role: "CEO TechVraksh | Google Developer Expert (Angular)",
    company: "TechVraksh",
    year: "2025",
    topic: "Why Angular is the Secret Weapon for High-Performance AI Dashboards",
    description: "Deep dive into reactive signal graph architectures, SSR hydration, and why enterprise AI dashboards perform best with modern Angular foundations.",
    bio: "Google Developer Expert for Angular and Founder & CEO of TechVraksh with 10+ years of high-scale enterprise engineering experience.",
    avatar: "https://cdn.sessionize.com/image/7dc5-400o400o1-JhLkPifaqEf8TWcouQ3Gbj.jpg",
    spotlightBadge: "Google Developer Expert",
    category: "Web",
    track: "Web",
    level: "Intermediate",
    socials: {
      linkedin: "https://www.linkedin.com/in/srashtisj/",
      twitter: "https://twitter.com/srashtisj",
      website: "https://techvraksh.com/",
      email: "mailto:srashti0204@gmail.com"
    }
  },
  {
    id: "sp-harsh-tonde",
    name: "Harsh Tonde",
    role: "Enterprise Customer Success Engineer",
    company: "FlutterFlow",
    year: "2025",
    topic: "Build Your Way",
    description: "A fast-paced breakdown of leveraging FlutterFlow and GenAI to turn architectural blueprints into full-stack multi-platform apps in record time.",
    bio: "Enterprise Customer Success Engineer at FlutterFlow helping global companies scale low-code and native Flutter apps.",
    avatar: "https://cdn.sessionize.com/image/33f0-400o400o1-VheX3NBqokT3T66jCQtYuh.jpg",
    spotlightBadge: "Engineering Leader",
    category: "GenAI",
    track: "AI",
    level: "Beginner to Intermediate",
    socials: {
      linkedin: "https://www.linkedin.com/in/harshtonde/",
      twitter: "https://x.com/TondeHarsh",
      website: "https://flutterflow.io/",
      email: "mailto:harshtonde@gmail.com"
    }
  },
  {
    id: "sp-mrinal-jain",
    name: "Mrinal Jain",
    role: "Engineering Manager @STAGE | Flutter Consultant",
    company: "American Express / STAGE",
    year: "2025",
    topic: "Shaping the Impossible: Production-Ready CustomPainter Techniques",
    description: "Discover low-level Canvas APIs, hardware shader acceleration, and real-time custom painting in Flutter applications without dropping a single frame.",
    bio: "Engineering Manager at STAGE OTT (Shark Tank India alumni) and Lead Organizer for Flutter Indore with 7+ years of building hyper-scale apps.",
    avatar: "https://cdn.sessionize.com/image/6925-400o400o1-ZYu4d6wZJsGWUCWQ2CPoi.jpg",
    spotlightBadge: "Engineering Leader",
    category: "Mobile & Flutter",
    track: "Mobile",
    level: "Intermediate",
    socials: {
      linkedin: "https://www.linkedin.com/in/mrinaljain",
      twitter: "https://twitter.com/_mrinaljain",
      blog: "https://mrinaljain.com/",
      website: "https://mrinaljain.com",
      email: "mailto:jain.mrinal140@gmail.com"
    }
  }
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
