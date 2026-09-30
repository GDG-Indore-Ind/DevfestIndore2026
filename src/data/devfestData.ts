export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  topic: string;
  track: "GenAI & ML" | "Cloud & DevOps" | "Web & Mobile" | "Product & Design";
  bio: string;
  tag: string;
  color: "blue" | "green" | "yellow" | "red";
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface SessionItem {
  id: string;
  time: string;
  title: string;
  speaker: string;
  speakerRole: string;
  hall: "Hall A: Rajwada Auditorium" | "Hall B: Malwa Tech Stage" | "Hall C: Codelab Arena";
  track: "GenAI & ML" | "Cloud & DevOps" | "Web & Mobile" | "Product & Design" | "Keynote & Community";
  description: string;
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  color: "blue" | "green" | "yellow" | "red";
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tag: string;
  popular?: boolean;
  color: "blue" | "green" | "yellow" | "red";
  description: string;
  perks: string[];
  available: boolean;
}

export const EVENT_DETAILS = {
  name: "DevFest Indore 2026",
  organizer: "Google Developer Group Indore",
  tagline: "Central India's Flagship Developer Extravaganza",
  subTagline: "Where Code Meets Culture, Community & Clean Innovation!",
  date: "Saturday, November 14, 2026",
  isoDate: "2026-11-14T08:30:00+05:30",
  time: "8:30 AM – 6:30 PM IST",
  venue: "Brilliant Convention Centre",
  venueAddress: "Plot No. 5, Scheme No. 78, Part II, Vijay Nagar, Indore, Madhya Pradesh 452010",
  googleMapsUrl: "https://maps.google.com/?q=Brilliant+Convention+Centre+Indore",
  registrationUrl: "#tickets",
  cfpUrl: "https://sessionize.com/devfest-indore-2026",
  volunteerUrl: "https://forms.gle/gdgindore2026volunteer",
  contactEmail: "organizers@gdgindore.in",
};

export const EVENT_STATS = [
  { value: "1,500+", label: "Passionate Attendees", color: "blue", icon: "Users" },
  { value: "28+", label: "Tech Pioneers & GDEs", color: "red", icon: "Sparkles" },
  { value: "20+", label: "Deep-Dive Sessions", color: "yellow", icon: "Code2" },
  { value: "3", label: "Parallel Tracks & Labs", color: "green", icon: "Layers" },
  { value: "₹2.5L+", label: "Bounty & Swag Pool", color: "blue", icon: "Award" },
  { value: "#1", label: "Cleanest City Vibe", color: "green", icon: "Heart" },
];

export const SPEAKERS: Speaker[] = [
  {
    id: "sp-1",
    name: "Dr. Ananya Sharma",
    role: "Google Developer Expert (Machine Learning)",
    company: "Google Cloud / AI Research",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    topic: "Building Production-Grade Multi-Agent Systems with Gemini 2.5 & Vertex AI",
    track: "GenAI & ML",
    bio: "Ananya is a Google Developer Expert for ML and author of 12+ research papers. She currently leads generative AI agent architecture teams deploying real-time multimodal reasoning systems.",
    tag: "Keynote Speaker",
    color: "blue",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "sp-2",
    name: "Vikramaditya Roy",
    role: "Staff Cloud Architect",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    topic: "Zero-Downtime Global Microservices on Google Kubernetes Engine (GKE)",
    track: "Cloud & DevOps",
    bio: "Vikramaditya designs planet-scale cloud infrastructure at Google. He specializes in distributed systems resiliency, service mesh architectures, and low-latency cloud deployments.",
    tag: "Cloud Guru",
    color: "red",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "sp-3",
    name: "Pooja Verma",
    role: "Lead Frontend Engineer",
    company: "Atlassian",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    topic: "The Next-Gen Web: WebAssembly, React Server Components & Microfrontends",
    track: "Web & Mobile",
    bio: "Pooja is a core contributor to high-performance open web tooling and design systems. She empowers engineering teams to build accessible, lightning-fast web experiences.",
    tag: "Web Pioneer",
    color: "yellow",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "sp-4",
    name: "Harshvardhan Joshi",
    role: "Principal Mobile Architect",
    company: "Swiggy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    topic: "Supercharging Flutter 3.24 & Kotlin Multiplatform for 50M+ MAU",
    track: "Web & Mobile",
    bio: "Harshvardhan is an Indore native who spearheaded architectural overhauls for top hyper-local delivery apps across India. He loves writing clean code and exploring Malwa street cuisine.",
    tag: "Indore Star",
    color: "green",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "sp-5",
    name: "Siddharth Deshmukh",
    role: "Founder & CTO",
    company: "AgentCraft AI (Indore Super Corridor)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    topic: "Bootstrapping an AI Startup from Central India to Global Enterprise",
    track: "Product & Design",
    bio: "Siddharth transitioned from Silicon Valley back to Indore to build a next-gen developer tools startup. He is passionate about nurturing Central India's venture tech ecosystem.",
    tag: "Founder Story",
    color: "blue",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "sp-6",
    name: "Neha Nair",
    role: "Head of Developer Experience",
    company: "Postman",
    avatar: "https://images.unsplash.com/photo-1534751516642-a171edd25218?auto=format&fit=crop&w=400&q=80",
    topic: "API-First AI: Building Seamless Integrations for Autonomous Agents",
    track: "GenAI & ML",
    bio: "Neha is a recognized international speaker on API security, developer tooling, and modern developer ergonomics with over a decade of community building experience.",
    tag: "DevRel Pro",
    color: "yellow",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "sp-7",
    name: "Rohan Agrawal",
    role: "Security Research Lead",
    company: "CyberArmor Labs",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    topic: "Securing LLM Supply Chains: Prompt Injections, Jailbreaks & Guardrails",
    track: "Cloud & DevOps",
    bio: "Rohan breaks down the new frontiers of AI application security, zero-trust cloud perimeters, and automated threat detection.",
    tag: "SecOps",
    color: "red",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "sp-8",
    name: "Meera Kulkarni",
    role: "Design Lead & UX Strategist",
    company: "Razorpay",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    topic: "Designing for Spatial & Generative Interfaces: Beyond the Screen",
    track: "Product & Design",
    bio: "Meera crafts delightful, intuitive fintech experiences. She will demonstrate how spatial computing and adaptive AI interfaces redefine human-computer interactions.",
    tag: "Design Lead",
    color: "green",
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
    },
  },
];

export const SESSIONS: SessionItem[] = [
  {
    id: "sess-1",
    time: "08:30 AM - 09:30 AM",
    title: "Check-in, Registration & Indori Breakfast (Poha & Jalebi)",
    speaker: "GDG Indore Team & Volunteers",
    speakerRole: "Community Organizers",
    hall: "Hall A: Rajwada Auditorium",
    track: "Keynote & Community",
    description: "Collect your personalized DevFest badge, exclusive swag bag, sticker packs, and enjoy Indore's iconic morning breakfast while networking with early birds.",
    tags: ["Networking", "Swag", "Breakfast"],
    level: "All Levels",
    color: "yellow",
  },
  {
    id: "sess-2",
    time: "09:30 AM - 10:15 AM",
    title: "Opening Keynote: The Intelligent Era & Central India's Tech Surge",
    speaker: "GDG Leads & Google Community Managers",
    speakerRole: "Google Developer Groups",
    hall: "Hall A: Rajwada Auditorium",
    track: "Keynote & Community",
    description: "Setting the stage for DevFest Indore 2026: welcoming 1,500+ builders, community milestones, key announcements, and celebrating Indore's rise as India's premier tech hub.",
    tags: ["Keynote", "Community", "Future"],
    level: "All Levels",
    color: "blue",
  },
  {
    id: "sess-3",
    time: "10:20 AM - 11:10 AM",
    title: "Building Production-Grade Multi-Agent Systems with Gemini 2.5 & Vertex AI",
    speaker: "Dr. Ananya Sharma",
    speakerRole: "GDE Machine Learning",
    hall: "Hall A: Rajwada Auditorium",
    track: "GenAI & ML",
    description: "Deep dive into orchestrating multi-agent collaboration, memory persistence, tool execution, and guardrailed output parsing using Google's latest multimodal models.",
    tags: ["Gemini", "Multi-Agent", "Vertex AI", "Python"],
    level: "Advanced",
    color: "blue",
  },
  {
    id: "sess-4",
    time: "10:20 AM - 11:10 AM",
    title: "Zero-Downtime Global Microservices on Google Kubernetes Engine (GKE)",
    speaker: "Vikramaditya Roy",
    speakerRole: "Staff Cloud Architect @ Google",
    hall: "Hall B: Malwa Tech Stage",
    track: "Cloud & DevOps",
    description: "Learn how to architect self-healing, multi-region container deployments on GKE with automated failover, Istio service mesh, and GitOps CI/CD pipelines.",
    tags: ["GKE", "Kubernetes", "DevOps", "Cloud Native"],
    level: "Intermediate",
    color: "red",
  },
  {
    id: "sess-5",
    time: "10:20 AM - 12:00 PM",
    title: "Hands-on Codelab: Build & Deploy Your First Multimodal GenAI App",
    speaker: "Google Developer Student Club Leads",
    speakerRole: "Workshop Mentors",
    hall: "Hall C: Codelab Arena",
    track: "GenAI & ML",
    description: "Bring your laptop! Live coding session building a real-time vision-enabled assistant with Next.js, Firebase Genkit, and Gemini API. Free Google Cloud credits provided!",
    tags: ["Hands-on", "Next.js", "Firebase", "Codelab"],
    level: "Beginner",
    color: "green",
  },
  {
    id: "sess-6",
    time: "11:20 AM - 12:10 PM",
    title: "The Next-Gen Web: WebAssembly, React Server Components & Microfrontends",
    speaker: "Pooja Verma",
    speakerRole: "Lead Frontend Engineer @ Atlassian",
    hall: "Hall A: Rajwada Auditorium",
    track: "Web & Mobile",
    description: "Explore the bleeding-edge web platform: combining Wasm for heavy compute, streaming SSR with Server Components, and zero-bundle-size client architectures.",
    tags: ["React", "Wasm", "Performance", "Web Architecture"],
    level: "Intermediate",
    color: "yellow",
  },
  {
    id: "sess-7",
    time: "11:20 AM - 12:10 PM",
    title: "Securing LLM Supply Chains: Prompt Injections, Jailbreaks & Guardrails",
    speaker: "Rohan Agrawal",
    speakerRole: "Security Research Lead",
    hall: "Hall B: Malwa Tech Stage",
    track: "Cloud & DevOps",
    description: "How to fortify enterprise AI pipelines against prompt injections, data poisoning, and unauthorized tool calls. Live demonstrations of exploit vectors and fixes.",
    tags: ["Security", "LLMOps", "Cybersecurity"],
    level: "Advanced",
    color: "red",
  },
  {
    id: "sess-8",
    time: "12:15 PM - 01:15 PM",
    title: "API-First AI: Building Seamless Integrations for Autonomous Agents",
    speaker: "Neha Nair",
    speakerRole: "Head of Developer Experience @ Postman",
    hall: "Hall A: Rajwada Auditorium",
    track: "GenAI & ML",
    description: "Why APIs are the true nervous system of artificial intelligence. How to design machine-readable OpenAPI specifications that AI agents can discover and invoke dynamically.",
    tags: ["APIs", "Postman", "Autonomous Agents"],
    level: "Intermediate",
    color: "blue",
  },
  {
    id: "sess-9",
    time: "01:15 PM - 02:15 PM",
    title: "Grand Networking Lunch & Tech Booths Showcase",
    speaker: "All Attendees & Sponsors",
    speakerRole: "Community & Partners",
    hall: "Hall A: Rajwada Auditorium",
    track: "Keynote & Community",
    description: "Enjoy a sumptuous hot lunch, visit partner experiential booths, collect limited-edition stickers, meet founders at the Startup Alley, and participate in mini-games.",
    tags: ["Lunch", "Networking", "Swag Hunt"],
    level: "All Levels",
    color: "green",
  },
  {
    id: "sess-10",
    time: "02:15 PM - 03:05 PM",
    title: "Supercharging Flutter 3.24 & Kotlin Multiplatform for 50M+ MAU",
    speaker: "Harshvardhan Joshi",
    speakerRole: "Principal Mobile Architect @ Swiggy",
    hall: "Hall A: Rajwada Auditorium",
    track: "Web & Mobile",
    description: "Deep dive into high-frame-rate mobile rendering, state machines, offline persistence, and shared business logic across iOS and Android.",
    tags: ["Flutter", "Kotlin", "Android", "Mobile Architecture"],
    level: "Intermediate",
    color: "green",
  },
  {
    id: "sess-11",
    time: "02:15 PM - 03:05 PM",
    title: "Bootstrapping an AI Startup from Central India to Global Enterprise",
    speaker: "Siddharth Deshmukh",
    speakerRole: "Founder & CTO @ AgentCraft AI",
    hall: "Hall B: Malwa Tech Stage",
    track: "Product & Design",
    description: "Real lessons, pitfalls, and unfair advantages of founding a high-tech company in Indore. Fundraising, hiring top engineering talent, and winning international contracts.",
    tags: ["Startups", "Founder", "Indore Tech", "Venture"],
    level: "All Levels",
    color: "yellow",
  },
  {
    id: "sess-12",
    time: "02:15 PM - 04:00 PM",
    title: "Hands-on Codelab: Cloud Architecture & Terraform on Google Cloud",
    speaker: "GDG Cloud Indore Mentors",
    speakerRole: "Cloud Certified Trainers",
    hall: "Hall C: Codelab Arena",
    track: "Cloud & DevOps",
    description: "Interactive lab provisioning secure Google Cloud VPCs, Cloud Run services, and BigQuery analytics data lakes with Infrastructure as Code.",
    tags: ["Terraform", "Google Cloud", "IaC", "Hands-on"],
    level: "Intermediate",
    color: "red",
  },
  {
    id: "sess-13",
    time: "03:15 PM - 04:05 PM",
    title: "Designing for Spatial & Generative Interfaces: Beyond the Screen",
    speaker: "Meera Kulkarni",
    speakerRole: "Design Lead @ Razorpay",
    hall: "Hall A: Rajwada Auditorium",
    track: "Product & Design",
    description: "How UI/UX is shifting from static grids to conversational, contextual, and spatial canvases. Practical design tokens, micro-interactions, and accessibility rules.",
    tags: ["UI/UX", "Design Systems", "Spatial Design"],
    level: "All Levels",
    color: "yellow",
  },
  {
    id: "sess-14",
    time: "04:15 PM - 05:00 PM",
    title: "High Tea, Evening Snacks & Community Lightning Pitches",
    speaker: "Select Community Builders",
    speakerRole: "5-Minute Tech Pitches",
    hall: "Hall A: Rajwada Auditorium",
    track: "Keynote & Community",
    description: "Grab hot masala chai, Indori snacks, and cheer for 6 hand-picked student & indie developer lightning pitches on the main stage!",
    tags: ["Tea", "Lightning Talks", "Pitches"],
    level: "All Levels",
    color: "yellow",
  },
  {
    id: "sess-15",
    time: "05:05 PM - 06:15 PM",
    title: "Women in Tech Panel, Hackathon Awards & Mega Lucky Draw",
    speaker: "Distinguished Panelists & GDG Team",
    speakerRole: "Conference Finale",
    hall: "Hall A: Rajwada Auditorium",
    track: "Keynote & Community",
    description: "Panel discussion on diversity in tech, felicitation of Hackathon winners, prize distribution (Pixel phones, Smart speakers, Google Swag), and closing group photo!",
    tags: ["Awards", "Women Techmakers", "Giveaways", "Finale"],
    level: "All Levels",
    color: "red",
  },
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "student",
    name: "Student Pass",
    price: 399,
    originalPrice: 799,
    tag: "Campus Special",
    color: "yellow",
    description: "Subsidized pass for active college & university students. Requires valid student ID at registration.",
    perks: [
      "Access to all 3 conference stages & tracks",
      "Hands-on Codelabs & Workshop entry",
      "Official DevFest Indore 2026 Attendee Kit",
      "Indori Poha Breakfast, Hot Lunch & Evening High Tea",
      "Digital Verified Certificate of Participation",
      "Eligibility for Hackathon & Community Bounties",
    ],
    available: true,
  },
  {
    id: "early-bird",
    name: "Early Bird Pro Pass",
    price: 699,
    originalPrice: 1299,
    tag: "Most Popular 🔥",
    popular: true,
    color: "green",
    description: "Best value pass for software engineers, product designers, freelancers, and tech professionals.",
    perks: [
      "All Student Pass benefits included",
      "Priority seating in Hall A (Rajwada Auditorium)",
      "Premium DevFest Indore Swag Box (T-shirt, bottle, badges)",
      "Exclusive Access to Speaker Q&A Lounges",
      "Dedicated Fast-track Registration Queue",
      "Access to official GDG Networking Directory",
    ],
    available: true,
  },
  {
    id: "general",
    name: "General Tech Pass",
    price: 999,
    originalPrice: 1599,
    tag: "Standard Entry",
    color: "blue",
    description: "Standard conference pass for mid-senior engineers, tech leads, and remote developers.",
    perks: [
      "Full Conference & Expo Hall Access",
      "All 20+ Keynotes, Tech Sessions & Codelabs",
      "Full DevFest Swag Kit + Tech Sticker Sheets",
      "Sumptuous Indori Gourmet Lunch & High Tea",
      "Recruiter & Startup Alley Connect Session",
      "Access to Recorded Session Keynotes post-event",
    ],
    available: true,
  },
  {
    id: "vip-founder",
    name: "VIP & Founder Pass",
    price: 1999,
    originalPrice: 2999,
    tag: "VIP Access 🌟",
    color: "red",
    description: "Designed for Founders, CTOs, VP of Engineering, and Community Leaders seeking maximum networking.",
    perks: [
      "All General Pass perks included",
      "Exclusive VIP Green Room & Speaker Lounge Access",
      "Private Lunch & High-Tea with Keynote Speakers & GDEs",
      "Backstage Networking with Angel Investors & Founders",
      "Executive Gift Hamper + Custom DevFest Hoodie",
      "Guaranteed reserved front-row seating across all halls",
    ],
    available: true,
  },
];

export const SPONSORS = {
  title: [
    {
      name: "Google for Developers",
      tier: "Title Sponsor",
      logo: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg",
      description: "Empowering developers to build incredible applications with Google technologies worldwide.",
      color: "blue",
    },
  ],
  platinum: [
    {
      name: "Google Cloud",
      tier: "Platinum",
      logo: "https://www.gstatic.com/devrel-devsite/prod/vc8937667ff4bc7ffef22c1db457224f8d9518a4a589cf8b965f9733c9cc98aa8/cloud/images/cloud-logo.svg",
      color: "blue",
    },
    {
      name: "Android",
      tier: "Platinum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
      color: "green",
    },
    {
      name: "Firebase",
      tier: "Platinum",
      logo: "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png",
      color: "yellow",
    },
  ],
  gold: [
    { name: "GitHub", tier: "Gold", badge: "The Home for Developers", color: "blue" },
    { name: "MongoDB", tier: "Gold", badge: "Developer Data Platform", color: "green" },
    { name: "Postman", tier: "Gold", badge: "Leading API Platform", color: "red" },
    { name: "JetBrains", tier: "Gold", badge: "Essential Tools for Developers", color: "yellow" },
  ],
  communityPartners: [
    { name: "Women Techmakers Indore", type: "Diversity Partner" },
    { name: "GDG Cloud Indore", type: "Ecosystem Partner" },
    { name: "GDG Bhopal", type: "Regional Chapter" },
    { name: "GDG Pune", type: "Sister Chapter" },
    { name: "GDG Noida", type: "Sister Chapter" },
    { name: "GDSC SGSITS Indore", type: "Campus Partner" },
    { name: "GDSC IET DAVV", type: "Campus Partner" },
    { name: "GDSC Medicaps", type: "Campus Partner" },
    { name: "Indore Tech Tribe", type: "Startup Community" },
  ],
};

export const INDORE_HIGHLIGHTS = [
  {
    title: "India's Cleanest City #1",
    subtitle: "7 Consecutive Years Unbroken Record",
    description: "Known for world-class civic cleanliness, green parks, and warm hospitality that sets the benchmark for India.",
    color: "green",
    emoji: "🏆",
  },
  {
    title: "Culinary Capital of Central India",
    subtitle: "Poha, Jalebi, Chappan & Sarafa Night Market",
    description: "After diving into code, experience 56 Dukaan and the legendary Sarafa midnight food street where jewelry shops turn into gastronomical wonders.",
    color: "yellow",
    emoji: "🍲",
  },
  {
    title: "Rising Tech Corridor & Silicon City",
    subtitle: "Super Corridor, IT Parks & Innovation SEZs",
    description: "With TCS, Infosys, high-growth AI startups, and premier incubators, Indore is rapidly becoming the next tech powerhouse of India.",
    color: "blue",
    emoji: "🚀",
  },
  {
    title: "Twin National Institutes: IIT + IIM",
    subtitle: "The Only City in India with Both",
    description: "Indore is a magnet for top intellectual minds, tech researchers, and visionary founders driving modern technological breakthroughs.",
    color: "red",
    emoji: "🎓",
  },
];

export const FAQS = [
  {
    question: "What is GDG DevFest Indore 2026?",
    answer: "DevFest Indore is Central India's biggest community-driven tech festival hosted by Google Developer Group Indore. It features keynotes by Google Developer Experts, deep-dive tech sessions on GenAI, Cloud, Web, Android, hands-on codelabs, networking, and celebration.",
  },
  {
    question: "Who can attend DevFest?",
    answer: "Everyone! Whether you are a student, frontend engineer, AI researcher, cloud architect, designer, startup founder, or simply curious about technology, DevFest has tailored tracks and workshops designed for you.",
  },
  {
    question: "What is included with my ticket?",
    answer: "All tickets include full access to session halls, workshops, an official DevFest Indore swag kit, morning breakfast (Indori Poha & Jalebi!), hot buffet lunch, evening high-tea snacks, and a digitally verifiable Certificate of Participation.",
  },
  {
    question: "Do I need to bring my laptop?",
    answer: "If you plan to attend Hall C (Codelab Arena) or participate in the live hackathon/codelabs, please bring your laptop and charger. Fast Wi-Fi and power strips will be available at all workshop tables.",
  },
  {
    question: "Where is the venue and how do I reach it?",
    answer: "DevFest Indore 2026 will take place at the prestigious Brilliant Convention Centre, Scheme 78, Vijay Nagar, Indore. It is easily accessible via cab, auto, metro, and city buses, located just 15 minutes from Devi Ahilyabai Holkar Airport.",
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer: "Yes, ticket transfers are allowed up to 72 hours before the event date by contacting our support team at organizers@gdgindore.in with your booking reference.",
  },
];
