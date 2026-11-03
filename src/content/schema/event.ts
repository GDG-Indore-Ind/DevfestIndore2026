// content/events/<id>/event.json: one edition's facts. The folder name is the event id.
import { z } from "zod";
import { DateOrDateTime, HttpsUrl, Id, ImagePath, LongText, SchemaRef, Text } from "./common.ts";

/** schema.org/PostalAddress */
export const PostalAddress = z.strictObject({
  streetAddress: Text.optional(),
  addressLocality: Text.optional().describe("City, e.g. Indore."),
  addressRegion: Text.optional().describe("State, e.g. Madhya Pradesh."),
  postalCode: Text.optional(),
  addressCountry: z
    .string()
    .regex(/^[A-Z]{2}$/, "Use a two-letter country code, e.g. IN")
    .optional(),
});

/** schema.org/Place */
export const Place = z.strictObject({
  name: Text,
  alternateName: Text.optional().describe("Short label, e.g. Essentia Arena · Pipliyahana."),
  address: PostalAddress.optional(),
  geo: z
    .strictObject({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(),
  hasMap: HttpsUrl.optional(),
  image: ImagePath.optional(),
});
export type Place = z.infer<typeof Place>;

/** schema.org/Event */
export const Event = z.strictObject({
  $schema: SchemaRef,
  id: Id.describe("Must match the folder name."),
  name: Text,
  series: z
    .enum(["devfest", "community"])
    .describe("devfest for the annual conference; community for meetups and Cloud Community Days."),
  startDate: DateOrDateTime,
  endDate: DateOrDateTime.optional(),
  timezone: z.string().optional().describe("IANA time zone. Defaults to Asia/Kolkata."),
  eventStatus: z
    .enum(["scheduled", "cancelled", "postponed", "rescheduled"])
    .optional()
    .describe("Defaults to scheduled."),
  eventAttendanceMode: z
    .enum(["offline", "online", "mixed"])
    .optional()
    .describe("Defaults to offline."),
  tagline: Text.optional(),
  description: LongText.optional(),
  location: Place.optional(),
  image: ImagePath.optional(),
  url: HttpsUrl.optional().describe("Official event page, e.g. on gdg.community.dev."),
  links: z
    .strictObject({
      callForProposals: HttpsUrl.optional(),
      partnerApplication: HttpsUrl.optional(),
      exhibitApplication: HttpsUrl.optional(),
    })
    .optional(),
});
export type Event = z.infer<typeof Event>;
