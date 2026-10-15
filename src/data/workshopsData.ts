export interface WorkshopItem {
  id: string;
  college: string;
  speaker: string;
  topic?: string;
  description?: string;
  collegeLogoUrl?: string; // College / Institute crest or logo
  images?: string[]; // Multiple photos uploaded for this workshop
  instagramUrl?: string; // Relevant Instagram post / reel link
  photosDrive?: string; // Drive link if available
  logoDrive?: string;
  collabNotice?: string;
}

export const INITIAL_WORKSHOPS: WorkshopItem[] = [
  {
    id: "ws-1",
    college: "Acropolis Institute of Technology and Research (AITR)",
    speaker: "Soham Sharma",
    topic: "Hands-on GenAI, Gemini Models & Cloud Foundations",
    description: "Deep dive into building multi-modal LLM applications with Gemini and Vertex AI for engineering students.",
    images: [
      "/gallery/opt_DSCF7167.JPG",
      "/gallery/opt_DSCF7164.JPG",
      "/gallery/opt_DSCF7165.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    logoDrive: "https://drive.google.com/file/d/1lre4iIEZp76sq2kiGfDwuJnc7MwxMEqR/view?usp=drive_link",
    collabNotice: "Conducted in collaboration with GDG on Campus AITR",
  },
  {
    id: "ws-2",
    college: "Institute of Engineering & Technology, DAVV (IET DAVV)",
    speaker: "Mradula Mittal",
    topic: "Full-Stack Cloud Architectures & Firebase App Modernization",
    description: "Real-time collaborative backend patterns, offline sync, and serverless edge functions.",
    images: [
      "/gallery/opt_DSCF7166.JPG",
      "/gallery/opt_DSCF7168.JPG",
      "/gallery/opt_DSCF7169.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Conducted in collaboration with GDG on Campus IET DAVV",
  },
  {
    id: "ws-3",
    college: "Prestige Institute of Management & Research (PIMR)",
    speaker: "Soham Sharma",
    topic: "Generative AI Hacklab & Prompt Engineering at Scale",
    description: "Hands-on prototyping with neural networks and local development workflows.",
    images: [
      "/gallery/opt_DSCF7170.JPG",
      "/gallery/opt_DSCF7175.JPG",
    ],
    photosDrive: "https://drive.google.com/drive/folders/1PHF1l0cgSZZYGvKaFh3kux4dlUV7deTt?usp=drive_link",
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Pre-event buzz & GDG Cloud launch completed",
  },
  {
    id: "ws-4",
    college: "SAGE University Indore",
    speaker: "Soham Sharma",
    topic: "Modern Web & Agentic Workflows with Google Ecosystem",
    description: "Interactive session exploring autonomous agents, vector embeddings, and web optimization.",
    images: [
      "/gallery/opt_DSCF7176.JPG",
      "/gallery/opt_DSCF7177.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    logoDrive: "https://drive.google.com/drive/folders/1tTIs1KA_Bnx0hhL0h88b-9PqT-6c-1nb?usp=drive_link",
    collabNotice: "Conducted in collaboration with GDG on Campus SAGE",
  },
  {
    id: "ws-5",
    college: "Sri Aurobindo Institute of Technology (SAIT)",
    speaker: "Soham Sharma",
    topic: "Building Real-time AI Solutions & Vertex AI APIs",
    description: "High density codelab with hands-on exercises creating production-grade API wrappers.",
    images: [
      "/gallery/opt_DSCF7178.JPG",
      "/gallery/opt_DSCF7179.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "High density AI hands-on session completed",
  },
  {
    id: "ws-6",
    college: "IPS Academy, Institute of Engineering and Science",
    speaker: "Priyal Jain",
    topic: "Cloud Computing Essentials & Microservices Architecture",
    description: "Demystifying containerization, CI/CD pipelines, and cloud native architectures.",
    images: [
      "/gallery/opt_DSCF7182.JPG",
      "/gallery/opt_DSCF7183.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Hands-on GenAI lab with GDG Cloud Indore",
  },
  {
    id: "ws-7",
    college: "Shri Govindram Seksaria Institute of Technology and Science (SGSITS)",
    speaker: "Soham Sharma",
    topic: "Advanced Distributed Systems & High Performance AI",
    description: "Deep dive into vector search indexes, semantic retrieval, and low-latency cloud inference.",
    images: [
      "/gallery/opt_DSCF7184.JPG",
      "/gallery/opt_DSCF7164.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Advanced Cloud Architecture & Vertex AI",
  },
  {
    id: "ws-8",
    college: "Chameli Devi Group of Institutions (CDGI)",
    speaker: "Soham Sharma",
    topic: "Modern Frontend Engineering & Next.js 16 Web Apps",
    description: "Full-stack React 19 app building with edge routing and dynamic components.",
    images: [
      "/gallery/opt_DSCF7165.JPG",
      "/gallery/opt_DSCF7166.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Conducted in collaboration with GDG on Campus CDGI",
  },
  {
    id: "ws-9",
    college: "International Institute of Professional Studies (IIPS DAVV)",
    speaker: "Shubham Sharma",
    topic: "Data Engineering, Streaming Pipelines & Cloud Storage",
    description: "Masterclass on handling big data streams, schema migrations, and analytics.",
    images: [
      "/gallery/opt_DSCF7167.JPG",
      "/gallery/opt_DSCF7168.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Multi-agent systems & data pipelines lab",
  },
  {
    id: "ws-10",
    college: "Medi-Caps University",
    speaker: "GDG Technical Team",
    topic: "Mega Campus Tech Conclave & DevFest 2026 Roadshow",
    description: "Auditorium plenary session with keynotes, live tech demos, and DevFest pass giveaways.",
    images: [
      "/gallery/opt_DSCF7169.JPG",
      "/gallery/opt_DSCF7170.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Mega Campus Tech Conclave & DevFest Roadshow",
  },
  {
    id: "ws-11",
    college: "Indore Institute of Science and Technology (IIST)",
    speaker: "Soham Sharma",
    topic: "Applied Machine Learning & Neural Network Fundamentals",
    description: "Hands-on exercises on image classification, computer vision, and model deployment.",
    images: [
      "/gallery/opt_DSCF7175.JPG",
      "/gallery/opt_DSCF7176.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Conducted in collaboration with GDG on Campus IIST",
  },
  {
    id: "ws-12",
    college: "Indian Institute of Technology Indore (IIT Indore)",
    speaker: "GDG Technical Team",
    topic: "Space Data Algorithms, Satellite Telemetry & Edge Computing",
    description: "Bridging aerospace satellite observation streams with physical AI algorithms.",
    images: [
      "/gallery/opt_DSCF7177.JPG",
      "/gallery/opt_DSCF7178.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Deep learning & satellite telemetry algorithms",
  },
  {
    id: "ws-13",
    college: "Symbiosis University of Applied Sciences",
    speaker: "Aarti Jethaniya",
    topic: "Modern UI/UX Design Systems & Cross-Platform Flutter",
    description: "Building accessible, high-contrast, tokenized design systems with Flutter.",
    images: [
      "/gallery/opt_DSCF7179.JPG",
      "/gallery/opt_DSCF7182.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "UI/UX & Flutter frontend engineering",
  },
  {
    id: "ws-14",
    college: "Lakshmi Narain College of Technology (LNCT Indore)",
    speaker: "Mradula Mittal",
    topic: "Full-Stack Serverless Architectures & Open Source APIs",
    description: "Building scalable web hooks and event-driven architectures with Google Cloud.",
    images: [
      "/gallery/opt_DSCF7183.JPG",
      "/gallery/opt_DSCF7184.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Full-stack cloud computing with Firebase",
  },
  {
    id: "ws-15",
    college: "Malwa Institute of Technology",
    speaker: "Vikas Ratnawat",
    topic: "Edge Computing & Physical AI Prototyping",
    description: "Microcontroller coding, edge inferencing, and real-time sensory data capture.",
    images: [
      "/gallery/opt_DSCF7164.JPG",
      "/gallery/opt_DSCF7167.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Edge compute & physical AI hands-on",
  },
  {
    id: "ws-16",
    college: "NMIMS University Indore",
    speaker: "GDG Technical Team",
    topic: "Product Engineering, Startup Scaling & Developer Tooling",
    description: "From idea to production MVP: architecture patterns, cloud deployment, and growth metrics.",
    images: [
      "/gallery/opt_DSCF7168.JPG",
      "/gallery/opt_DSCF7169.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Product engineering & startup tech stacks",
  },
  {
    id: "ws-17",
    college: "Sri Aurobindo Institute of Technology - SKITM Campus",
    speaker: "GDG Technical Team",
    topic: "Defensive Cybersecurity & Open Source Contributions",
    description: "Threat modelling, secure cloud setups, and contributing to open-source developer tooling.",
    images: [
      "/gallery/opt_DSCF7170.JPG",
      "/gallery/opt_DSCF7175.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Cybersecurity & open source contributions",
  },
  {
    id: "ws-18",
    college: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
    speaker: "Soham Sharma",
    topic: "AI Agents & Autonomous Coding Systems Masterclass",
    description: "Architecting multi-agent orchestration flows, tool calling, and context engineering.",
    images: [
      "/gallery/opt_DSCF7176.JPG",
      "/gallery/opt_DSCF7182.JPG",
    ],
    instagramUrl: "https://www.instagram.com/gdgindore/",
    collabNotice: "Conducted in collaboration with GDG on Campus SVVV",
  },
];
