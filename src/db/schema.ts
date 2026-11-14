import { sql } from "drizzle-orm";
import {
  check,
  foreignKey,
  integer,
  primaryKey,
  sqliteTable,
  text,
  unique,
  type AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

// JSON is reserved for small, owned documents/lists. Entity relationships use FKs.
const object = (name: string) => text(name, { mode: "json" }).$type<Record<string, unknown>>();
const list = (name: string) => text(name, { mode: "json" }).$type<unknown[]>();
const position = () => integer("display_order").notNull().default(0);
const jsonCheck = (column: AnySQLiteColumn) => sql`${column} IS NULL OR json_valid(${column})`;
// Unknown text is NULL, never an empty string, so "missing" has one spelling.
const notBlank = (column: AnySQLiteColumn) => sql`${column} IS NULL OR trim(${column}) <> ''`;
const DATE = "[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]";

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    kind: text("kind", { enum: ["conference", "campus-workshop"] })
      .notNull()
      .default("conference"),
    series: text("series"),
    attendanceMode: text("attendance_mode", { enum: ["in-person", "online"] })
      .notNull()
      .default("in-person"),
    parentEventId: text("parent_event_id").references((): AnySQLiteColumn => events.id),
    startsAt: text("starts_at"),
    startDate: text("start_date"),
    timezone: text("timezone"),
    venue: object("venue").notNull(),
    organizer: text("organizer"),
    tagline: text("tagline"),
    subTagline: text("sub_tagline"),
    contactEmail: text("contact_email"),
    summary: text("summary"),
    theme: text("theme"),
    links: object("links"),
    sourceUrl: text("source_url"),
    recordingUrl: text("recording_url"),
    reportedStats: object("reported_stats"),
    coverMediaId: text("cover_media_id").references((): AnySQLiteColumn => media.id),
    // One authoritative registration document; sections own their policy text.
    registrationPolicies: list("registration_policies"),
    registrationChecklist: list("registration_checklist"),
    registrationDeclaration: text("registration_declaration"),
    bookingUrl: text("booking_url"),
    bookingWidgetUrl: text("booking_widget_url"),
    bookingEnabled: integer("booking_enabled", { mode: "boolean" }).notNull().default(false),
    legacyWorkshopId: text("legacy_workshop_id").unique(),
    displayOrder: position(),
  },
  (t) => [
    check("events_kind", sql`${t.kind} IN ('conference', 'campus-workshop')`),
    check("events_attendance_mode", sql`${t.attendanceMode} IN ('in-person', 'online')`),
    // Exactly one: a timestamp when the time is known, otherwise date-only evidence.
    check("events_one_start", sql`(${t.startsAt} IS NULL) <> (${t.startDate} IS NULL)`),
    check(
      "events_start_date_format",
      sql`${t.startDate} IS NULL OR ${t.startDate} GLOB ${sql.raw(`'${DATE}'`)}`,
    ),
    check(
      "events_starts_at_format",
      sql`${t.startsAt} IS NULL OR ${t.startsAt} GLOB ${sql.raw(`'${DATE}T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]*'`)}`,
    ),
    check(
      "events_not_own_parent",
      sql`${t.parentEventId} IS NULL OR ${t.parentEventId} <> ${t.id}`,
    ),
    ...[t.venue, t.links, t.reportedStats, t.registrationPolicies, t.registrationChecklist].map(
      (c) => check(`${c.name}_json`, jsonCheck(c)),
    ),
  ],
);

export const people = sqliteTable(
  "people",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    jobTitle: text("job_title"),
    company: text("company"),
    bio: text("bio"),
    photoPath: text("photo_path"),
    links: object("links"),
    displayOrder: position(),
  },
  (t) => [check("people_links_json", jsonCheck(t.links))],
);

export const eventPeople = sqliteTable(
  "event_people",
  {
    eventId: text("event_id")
      .notNull()
      .references(() => events.id),
    personId: text("person_id")
      .notNull()
      .references(() => people.id),
    profile: object("profile"),
    sourceUrl: text("source_url"),
    // Position in the event's official published roster; unrelated to a role's listing order.
    officialSpeakerOrder: integer("official_speaker_order"),
    displayOrder: position(),
  },
  (t) => [
    primaryKey({ columns: [t.eventId, t.personId] }),
    check("event_people_profile_json", jsonCheck(t.profile)),
    check(
      "event_people_official_speaker_order",
      sql`${t.officialSpeakerOrder} IS NULL OR ${t.officialSpeakerOrder} >= 0`,
    ),
  ],
);

export const ROLE_KINDS = ["speaker", "core-team", "volunteer", "ambassador"] as const;

// One row per role a person holds at an event. Presenters need no speaker row: a session
// assignment already makes them a speaker. A speaker row announces someone before their session.
export const eventPersonRoles = sqliteTable(
  "event_person_roles",
  {
    eventId: text("event_id").notNull(),
    personId: text("person_id").notNull(),
    kind: text("kind", { enum: ROLE_KINDS }).notNull(),
    // Optional label override, e.g. "Keynote speaker".
    title: text("title"),
    // Position in that role's public listing, from 1. Unordered roles follow the ordered ones.
    listingOrder: integer("listing_order"),
    // core-team / volunteer: ordered list of { "area", "level"? }.
    responsibilities: list("responsibilities"),
    // ambassador only.
    track: text("track", { enum: ["student", "professional"] }),
    community: text("community"),
  },
  (t) => [
    primaryKey({ columns: [t.eventId, t.personId, t.kind] }),
    foreignKey({
      columns: [t.eventId, t.personId],
      foreignColumns: [eventPeople.eventId, eventPeople.personId],
    }).onDelete("cascade"),
    check(
      "event_person_roles_kind",
      sql`${t.kind} IN ('speaker', 'core-team', 'volunteer', 'ambassador')`,
    ),
    check(
      "event_person_roles_listing_order",
      sql`${t.listingOrder} IS NULL OR ${t.listingOrder} >= 1`,
    ),
    check("event_person_roles_title", notBlank(t.title)),
    check(
      "event_person_roles_responsibilities",
      sql`(${t.kind} IN ('core-team', 'volunteer')) = (${t.responsibilities} IS NOT NULL) AND (${t.responsibilities} IS NULL OR (json_valid(${t.responsibilities}) AND json_type(${t.responsibilities}) = 'array' AND json_array_length(${t.responsibilities}) > 0))`,
    ),
    check(
      "event_person_roles_ambassador",
      sql`(${t.kind} = 'ambassador') = (${t.track} IS NOT NULL) AND (${t.kind} = 'ambassador') = (${t.community} IS NOT NULL) AND (${t.track} IS NULL OR ${t.track} IN ('student', 'professional')) AND (${t.community} IS NULL OR trim(${t.community}) <> '')`,
    ),
  ],
);

export const rooms = sqliteTable(
  "rooms",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id),
    name: text("name").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    numbered: integer("numbered", { mode: "boolean" }).notNull().default(false),
    displayOrder: position(),
  },
  (t) => [unique().on(t.eventId, t.name), unique().on(t.id, t.eventId)],
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id),
    format: text("format", {
      enum: ["talk", "keynote", "panel", "workshop", "exhibit", "address"],
    }).notNull(),
    title: text("title"),
    description: text("description"),
    roomId: text("room_id"),
    startTime: text("start_time"),
    durationMinutes: integer("duration_minutes"),
    runningOrder: integer("running_order"),
    category: text("category"),
    track: text("track"),
    level: text("level"),
    tags: list("tags"),
    resources: list("resources"),
    spotlightBadge: text("spotlight_badge"),
    promotion: object("promotion"),
    sourceUrl: text("source_url"),
    displayOrder: position(),
  },
  (t) => [
    foreignKey({ columns: [t.roomId, t.eventId], foreignColumns: [rooms.id, rooms.eventId] }),
    check(
      "session_format",
      sql`${t.format} IN ('talk', 'keynote', 'panel', 'workshop', 'exhibit', 'address')`,
    ),
    check("session_duration", sql`${t.durationMinutes} IS NULL OR ${t.durationMinutes} > 0`),
    // Event-local 24-hour HH:MM, so times sort and render one way.
    check(
      "session_start_time",
      sql`${t.startTime} IS NULL OR ${t.startTime} GLOB '[01][0-9]:[0-5][0-9]' OR ${t.startTime} GLOB '2[0-3]:[0-5][0-9]'`,
    ),
    ...[t.title, t.description, t.category, t.track, t.level, t.spotlightBadge].map((c) =>
      check(`session_${c.name}_not_blank`, notBlank(c)),
    ),
    check("session_tags_json", jsonCheck(t.tags)),
    check("session_resources_json", jsonCheck(t.resources)),
    check("session_promotion_json", jsonCheck(t.promotion)),
  ],
);

export const sessionPeople = sqliteTable(
  "session_people",
  {
    sessionId: text("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    personId: text("person_id")
      .notNull()
      .references(() => people.id),
    // A historical/session-specific profile is an intentional snapshot, not a second identity.
    profile: object("profile"),
    displayOrder: position(),
  },
  (t) => [
    primaryKey({ columns: [t.sessionId, t.personId] }),
    check("session_people_profile_json", jsonCheck(t.profile)),
  ],
);

export const organizations = sqliteTable(
  "organizations",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    kind: text("kind", { enum: ["organization", "collective"] })
      .notNull()
      .default("organization"),
    description: text("description"),
    logoPath: text("logo_path"),
    logoShape: text("logo_shape"),
    logoCrop: list("logo_crop"),
    websiteUrl: text("website_url"),
    socialUrl: text("social_url"),
    displayOrder: position(),
  },
  (t) => [check("organizations_logo_crop_json", jsonCheck(t.logoCrop))],
);

export const sessionOrganizations = sqliteTable(
  "session_organizations",
  {
    sessionId: text("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id),
    displayOrder: position(),
  },
  (t) => [primaryKey({ columns: [t.sessionId, t.organizationId] })],
);

export const partnerships = sqliteTable(
  "partnerships",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id),
    eventId: text("event_id").references(() => events.id),
    scope: text("scope", { enum: ["event", "historical", "ecosystem"] }).notNull(),
    contributionType: text("contribution_type", {
      enum: ["sponsor", "collaborator", "community", "media"],
    }).notNull(),
    title: text("title").notNull(),
    isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
    featured: text("featured"),
    sourceUrl: text("source_url"),
    displayOrder: integer("display_order"),
    recordOrder: integer("record_order").notNull().default(0),
  },
  (t) => [
    check(
      "partnership_scope",
      sql`(${t.scope} = 'event' AND ${t.eventId} IS NOT NULL) OR (${t.scope} IN ('historical', 'ecosystem') AND ${t.eventId} IS NULL)`,
    ),
    check(
      "partnership_featured",
      sql`${t.featured} IS NULL OR ${t.featured} IN ('campus', 'space', 'technology')`,
    ),
    check(
      "partnership_type",
      sql`${t.contributionType} IN ('sponsor', 'collaborator', 'community', 'media')`,
    ),
  ],
);

export const passInclusionSets = sqliteTable(
  "pass_inclusion_sets",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id),
    name: text("name").notNull(),
    benefits: list("benefits").notNull(),
  },
  (t) => [
    unique().on(t.id, t.eventId),
    check(
      "pass_benefits_json",
      sql`json_valid(${t.benefits}) AND json_type(${t.benefits}) = 'array'`,
    ),
  ],
);

export const passes = sqliteTable(
  "passes",
  {
    eventId: text("event_id")
      .notNull()
      .references(() => events.id),
    code: text("code").notNull(),
    name: text("name").notNull(),
    audience: text("audience").notNull(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    priceMinor: integer("price_minor"),
    currencyCode: text("currency_code").notNull().default("INR"),
    allocation: integer("allocation").notNull(),
    eligibility: list("eligibility").notNull(),
    inclusionSetId: text("inclusion_set_id").notNull(),
    offers: list("offers"),
    bookingRoute: text("booking_route", { enum: ["konfhub", "ambassador"] }),
    note: text("note"),
    isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
    isSoldOut: integer("is_sold_out", { mode: "boolean" }).notNull().default(false),
    displayOrder: position(),
  },
  (t) => [
    primaryKey({ columns: [t.eventId, t.code] }),
    foreignKey({
      columns: [t.inclusionSetId, t.eventId],
      foreignColumns: [passInclusionSets.id, passInclusionSets.eventId],
    }),
    check(
      "pass_price",
      sql`${t.priceMinor} IS NULL OR (${t.priceMinor} >= 0 AND typeof(${t.priceMinor}) = 'integer')`,
    ),
    check("pass_allocation", sql`${t.allocation} >= 0`),
    check("pass_currency", sql`${t.currencyCode} = 'INR'`),
    check(
      "pass_booking_route",
      sql`${t.bookingRoute} IS NULL OR ${t.bookingRoute} IN ('konfhub', 'ambassador')`,
    ),
    check(
      "pass_eligibility_json",
      sql`json_valid(${t.eligibility}) AND json_type(${t.eligibility}) = 'array'`,
    ),
    check("pass_offers_json", jsonCheck(t.offers)),
  ],
);

export const media = sqliteTable(
  "media",
  {
    id: text("id").primaryKey(),
    kind: text("kind", { enum: ["photo", "press"] }).notNull(),
    eventId: text("event_id").references(() => events.id),
    sessionId: text("session_id").references(() => sessions.id),
    title: text("title").notNull(),
    path: text("path").notNull(),
    caption: text("caption"),
    category: text("category"),
    width: integer("width"),
    height: integer("height"),
    publication: text("publication"),
    publishedDate: text("published_date"),
    sourceUrl: text("source_url"),
    showInGallery: integer("show_in_gallery", { mode: "boolean" }).notNull().default(false),
    displayOrder: position(),
  },
  (t) => [
    check("media_kind", sql`${t.kind} IN ('photo', 'press')`),
    check("media_width", sql`${t.width} IS NULL OR ${t.width} > 0`),
    check("media_height", sql`${t.height} IS NULL OR ${t.height} > 0`),
  ],
);
