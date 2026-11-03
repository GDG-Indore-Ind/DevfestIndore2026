export interface TeamMember {
  id: string;
  personId: string;
  name: string;
  role: string;
  team: "Core Team" | "Volunteers";
  bio: string;
  avatar: string;
  order?: number;
  socials: Socials;
}
export type SessionCategory =
  | "GenAI"
  | "Cloud"
  | "Mobile & Flutter"
  | "Web"
  | "Leadership & Ecosystem"
  | "Space Technology"
  | "Physical AI & Robotics"
  | "Data & Systems";
/** Figures the organizers reported for an edition; each is left out when it was not recorded. */
export interface EventStats {
  registrations?: number;
  rsvps?: number;
  attendees?: number;
  speakers?: number;
  sessions?: number;
  sponsors?: number;
  professionals?: number;
  students?: number;
  /** True when the figures were rounded, such as "600+". */
  approximate?: boolean;
}
export interface ArchivedEvent {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  venue: string;
  kind: "DevFest" | "Community event" | "Online session";
  series?: "devfest" | "ccd";
  /** Cover photograph for the archive card, resolved from the event's `cover` id. */
  coverImage?: { src: string; alt: string };
  theme?: string;
  stats?: EventStats;
  recordingUrl?: string;
  summary: string;
  source: string;
  partners: string[];
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
}
export interface WorkshopPhoto {
  imageUrl: string;
  caption: string;
  width: number;
  height: number;
  source: string;
}
export interface WorkshopItem {
  id: string;
  legacyId?: string;
  college: string;
  speaker: string;
  topic?: string;
  date?: string;
  displayDate?: string;
  eventUrl?: string;
  publication: "archived" | "confirmed";
  photos: WorkshopPhoto[];
}
export interface GalleryItem {
  id: string;
  title: string;
  category:
    "Space" | "AI & Robotics" | "Keynotes" | "Showcase" | "Community" | "Pre-DevFest Workshops";
  /** The event the photograph was taken at, when known. */
  eventId?: string;
  imageUrl: string;
  caption: string;
  source?: string;
  width?: number;
  height?: number;
}
export interface Socials {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
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
export type TeamRoleKind = "core-team" | "volunteer" | "ambassador" | "speaker";
export type Responsibility = {
  area: string;
  level?: "lead" | "co-lead" | "coordinator" | "team-member" | "volunteer";
};
/** What a person did at one event. Fields beyond `kind` depend on the kind. */
export interface ParticipationRole {
  kind: TeamRoleKind;
  /** Overrides the default label for the kind, e.g. "Keynote speaker". */
  title?: string;
  /** Sorts within this kind at the event; lowest first. */
  order?: number;
  /** core-team and volunteer roles. */
  responsibilities?: Responsibility[];
  /** ambassador roles. */
  track?: "professional" | "student";
  community?: string;
}
export interface Participation {
  id: string;
  personId: string;
  eventId: string;
  roles: ParticipationRole[];
  sourceUrl?: string;
}
export interface SessionRecord {
  id: string;
  editionId: string;
  speakerIds: string[];
  speakerProfiles?: {
    personId: string;
    role?: string;
    company?: string;
    profile?: Partial<Pick<Person, "avatar" | "bio" | "socials">>;
  }[];
  publication: "confirmed" | "archived";
  title: string;
  role: string;
  company: string;
  description: string;
  spotlightBadge: string;
  category: SessionCategory;
  track?: string;
  level?: string;
  profile?: Partial<Pick<Person, "avatar" | "bio" | "socials">>;
  time?: string;
  hall?: string;
  tags?: string[];
  resources?: { label: string; url: string }[];
  format?: "talk" | "keynote" | "panel" | "workshop";
  sourceUrl?: string;
}
export interface Partnership {
  visible?: boolean;
  id: string;
  editionId: string;
  contributions: { kind: "sponsor" | "collaborator" | "community" | "media"; role: string }[];
  publication: "confirmed" | "archived" | "ecosystem";
  order?: number;
  source?: string;
  featured?: EventPartner["featured"];
}
export interface Organization extends Omit<EventPartner, "role" | "featured"> {
  partnerships: Partnership[];
  archiveLogoWindow?: number[];
}
export interface EventRecord extends Omit<
  ArchivedEvent,
  "partners" | "displayDate" | "coverImage"
> {
  publication: "archived";
  officialSpeakerIds: string[];
  /** Id of a gallery photograph taken at this event. */
  coverId?: string;
}
