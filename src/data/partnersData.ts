export interface PartnerItem {
  id: string;
  name: string;
  category?: string;
  tier?: string;
  type: "sponsor" | "media" | "community";
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  scope?: string;
}

export const INITIAL_PARTNERS: PartnerItem[] = [
  // Sponsors
  { id: "sp-1", name: "Google for Developers", category: "Global Tech", tier: "Title Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://developers.google.com" },
  { id: "sp-2", name: "FlutterFlow", category: "Low-Code AI", tier: "Gold Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://flutterflow.io" },
  { id: "sp-3", name: "JetBrains", category: "Dev Tools", tier: "Developer Ecosystem", type: "sponsor", logoUrl: "", websiteUrl: "https://jetbrains.com" },
  { id: "sp-4", name: "GitHub", category: "DevOps & Open Source", tier: "Global Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://github.com" },
  { id: "sp-5", name: "Firebase", category: "App Development", tier: "Cloud Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://firebase.google.com" },
  { id: "sp-6", name: "Android", category: "Mobile OS", tier: "Platform Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://android.com" },
  { id: "sp-7", name: "TensorFlow", category: "Machine Learning", tier: "AI Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://tensorflow.org" },
  { id: "sp-8", name: "Diaspark", category: "Enterprise IT", tier: "Corporate Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://diaspark.com" },
  { id: "sp-9", name: "QuillBot", category: "AI & Productivity", tier: "AI Innovation", type: "sponsor", logoUrl: "", websiteUrl: "https://quillbot.com" },
  { id: "sp-10", name: "MSI", category: "Hardware & Compute", tier: "Hardware Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://msi.com" },
  { id: "sp-11", name: "GenieTalk.ai", category: "Conversational AI", tier: "AI Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://genietalk.ai" },
  { id: "sp-12", name: "Softude (Systematix)", category: "Cloud & Digital", tier: "Enterprise Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://softude.com" },
  { id: "sp-13", name: "ProtonsHub", category: "Tech Labs", tier: "Ecosystem Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://protonshub.com" },
  { id: "sp-14", name: "GraffersID", category: "Product Dev", tier: "Startup Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://graffersid.com" },
  { id: "sp-15", name: "Coding Blocks", category: "EdTech", tier: "Learning Partner", type: "sponsor", logoUrl: "", websiteUrl: "https://codingblocks.com" },

  // Media Partners
  { id: "mp-1", name: "Dainik Bhaskar", category: "Print & Digital Daily", tier: "Media Partner", type: "media", scope: "Statewide Coverage" },
  { id: "mp-2", name: "Naidunia", category: "Leading Hindi Daily", tier: "Media Partner", type: "media", scope: "Central India" },
  { id: "mp-3", name: "Dainik Jagran", category: "National Daily", tier: "Media Partner", type: "media", scope: "Regional Bureau" },
  { id: "mp-4", name: "Indore HD", category: "Digital Media Hub", tier: "Media Partner", type: "media", scope: "Social Multiplier" },
  { id: "mp-5", name: "Indore Talk", category: "Community Network", tier: "Media Partner", type: "media", scope: "600k+ Reach" },
  { id: "mp-6", name: "StartupNews.fyi", category: "Tech Journalism", tier: "Media Partner", type: "media", scope: "Pan-India Startup Press" },
  { id: "mp-7", name: "Apna Indore", category: "Regional Broadcast", tier: "Media Partner", type: "media", scope: "City Broadcast" },
  { id: "mp-8", name: "MIST Media", category: "Media Marketing", tier: "Media Partner", type: "media", scope: "Creator Reach" },

  // Community Partners
  { id: "cp-1", name: "KonfHub", category: "Ticketing & Event Tech", tier: "Platform Partner", type: "community", description: "Official Ticketing & Event Tech Platform" },
  { id: "cp-2", name: "The Hackers Meetup", category: "Cybersecurity & InfoSec", tier: "Community Partner", type: "community", description: "Cybersecurity & InfoSec Community" },
  { id: "cp-3", name: "Indore Entrepreneurs Network (IEN)", category: "Founder & Investor", tier: "Ecosystem Partner", type: "community", description: "Founder & Investor Ecosystem" },
  { id: "cp-4", name: "Indore Software Association", category: "Industry & Enterprise IT", tier: "Council Partner", type: "community", description: "Industry & Enterprise IT Council" },
  { id: "cp-5", name: "Headstart Indore", category: "Startup Accelerator", tier: "Startup Partner", type: "community", description: "Startup Accelerator & Founder Network" },
  { id: "cp-6", name: "Code Vipassana", category: "Engineering Practice", tier: "Developer Community", type: "community", description: "Deep Engineering Practice & Coding" },
  { id: "cp-7", name: "BSides Indore", category: "Security & Cyber Ops", tier: "Community Partner", type: "community", description: "Security & Defensive Cyber Operations" },
  { id: "cp-8", name: "Open Network", category: "Decentralized Tech", tier: "Innovation Partner", type: "community", description: "Decentralized Tech Innovation" },
  { id: "cp-9", name: "Apache Local Community Indore", category: "Open Source", tier: "Community Partner", type: "community", description: "Open Source Infrastructure" },
  { id: "cp-10", name: "GDG on Campus (10+ Institutes)", category: "Campus Chapters", tier: "Academic Alliances", type: "community", description: "University Student Developer Chapters" },
];
