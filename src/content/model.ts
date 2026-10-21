export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Core Organizer" | "Design & Experience" | "Tech & Operations" | "Space & Ecosystem" | "Community";
  bio: string;
  avatar: string;
  order?: number;
  socials: Socials;
}
export interface PastSpeaker {
  id: string;
  name: string;
  role: string;
  company: string;
  year: string;
  topic: string;
  description?: string;
  bio?: string;
  avatar: string;
  spotlightBadge: string;
  category: "GenAI" | "Cloud" | "Mobile & Flutter" | "Web" | "Leadership & Ecosystem" | "Space Technology" | "Physical AI & Robotics" | "Data & Systems";
  track?: string;
  level?: string;
  socials?: Socials;
}
export interface ArchivedEvent {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  venue: string;
  kind: "DevFest" | "Community event" | "Online session";
  summary: string;
  source: string;
  partners: string[];
  speakerNames?: string[];
}
export interface EventPartner {
  id: string;
  name: string;
  role: string;
  kind?: "sponsor" | "collaborator" | "community" | "media";
  logoUrl: string;
  websiteUrl?: string;
  socialUrl?: string;
  logoShape?: "square" | "wide" | "wide-large";
  featured?: "space" | "technology";
  description?: string;
  topics?: readonly {
    title: string;
    text: string;
  }[];
}
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
export interface GalleryItem {
  id: string;
  title: string;
  category: "Space" | "AI & Robotics" | "Keynotes" | "Showcase" | "Community" | "Pre-DevFest Workshops";
  imageUrl: string;
  caption: string;
}
export interface Socials {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  email?: string;
  website?: string;
  blog?: string;
}
export interface Person {
  id: string;
  name: string;
  kind: "person" | "group";
  avatar?: string;
  bio?: string;
  role?: string;
  company?: string;
  socials?: Socials;
}
export interface SpeakerRecord {
  id: string;
  personId: string;
  editionId: string;
  publication: "confirmed" | "archived";
}
export interface SessionRecord {
  id: string;
  editionId: string;
  speakerId: string;
  publication: "confirmed" | "archived";
  title: string;
  role: string;
  company: string;
  description: string;
  spotlightBadge: string;
  category: PastSpeaker["category"];
  track?: string;
  level?: string;
  profile?: Partial<Pick<Person, "avatar" | "bio" | "socials">>;
  time?: string;
  hall?: string;
  tags?: string[];
}
export interface Partnership {
  id: string;
  editionId: string;
  kind: "sponsor" | "collaborator" | "community" | "media";
  role: string;
  publication: "confirmed" | "archived" | "ecosystem";
  order?: number;
  source?: string;
  featured?: EventPartner["featured"];
}
export interface Organization extends Omit<EventPartner, "role" | "featured"> {
  partnerships: Partnership[];
  archiveLogoWindow?: number[];
}
export interface EventRecord extends Omit<ArchivedEvent, "partners" | "speakerNames" | "displayDate"> {
  publication: "archived";
  officialSpeakerIds: string[];
}
