// content/events/<id>/sessions.json and workshops.json: sub-events of one edition.
// Speakers are whoever performs in a session; there is no separate speaker list.
import { z } from "zod";
import { DateOrDateTime, HttpsUrl, Id, IsoDate, LongText, SchemaRef, Text } from "./common.ts";
import { Place } from "./event.ts";

export const Topic = z.enum([
  "genai",
  "cloud",
  "mobile-flutter",
  "web",
  "data-systems",
  "space-technology",
  "physical-ai-robotics",
  "leadership-ecosystem",
]);
export type Topic = z.infer<typeof Topic>;

/** A person or organization on stage. Title fields override the person record for this session only. */
export const Performer = z.union([
  z.strictObject({
    person: Id,
    jobTitle: Text.optional().describe(
      "Title shown for this session when it differs from the person record.",
    ),
    worksFor: Text.optional().describe(
      "Employer shown for this session when it differs from the person record.",
    ),
    badge: Text.optional().describe(
      "Editorial label for this session, e.g. Engineering Leader. Credentials such as Google Developer Expert belong on the person as hasCredential.",
    ),
  }),
  z.strictObject({ organization: Id }),
]);
export type Performer = z.infer<typeof Performer>;

const subEvent = {
  id: Id.describe("Unique across every event, so photos can refer to it."),
  name: Text.optional().describe(
    "Leave out until the title is confirmed; the agenda shows Session to be announced.",
  ),
  description: LongText.optional(),
  performer: z.array(Performer).min(1),
  keywords: z.array(Topic).optional(),
  url: HttpsUrl.optional().describe("Public page that records this session."),
};

/** schema.org/Event as a sub-event of the edition. */
export const Session = z.strictObject({
  ...subEvent,
  format: z.enum(["talk", "keynote", "panel", "workshop"]),
  track: Text.optional(),
  educationalLevel: z
    .array(z.enum(["beginner", "intermediate", "advanced", "expert"]))
    .optional()
    .describe("One level, or two for a range."),
  startDate: DateOrDateTime.optional(),
  endDate: DateOrDateTime.optional(),
  location: Text.optional().describe("Hall or room."),
});
export type Session = z.infer<typeof Session>;

/** A campus workshop held before the main day, with its own date, campus and GDG event page. */
export const CampusWorkshop = z.strictObject({
  ...subEvent,
  name: Text,
  startDate: IsoDate,
  location: Place,
  url: z
    .string()
    .regex(
      /^https:\/\/gdg\.community\.dev\/events\/details\/[^?#]+\/?$/,
      "Use the exact gdg.community.dev event page",
    )
    .describe("The exact GDG event page for this workshop."),
});
export type CampusWorkshop = z.infer<typeof CampusWorkshop>;

export const SessionsFile = z.strictObject({
  $schema: SchemaRef,
  sessions: z.array(Session),
});

export const WorkshopsFile = z.strictObject({
  $schema: SchemaRef,
  workshops: z.array(CampusWorkshop),
});
