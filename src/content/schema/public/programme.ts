import { z } from "zod";
import { httpsUrl, id, isDate } from "./common.ts";

const ids = () =>
  z
    .array(id)
    .min(1)
    .refine((items) => new Set(items).size === items.length, "Must contain unique values")
    .meta({ uniqueItems: true });
const profile = z.strictObject({
  avatar: z
    .string()
    .regex(/^(https:\/\/|\/[^/])/)
    .optional(),
  bio: z.string().optional(),
  socials: z
    .strictObject({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      instagram: z.string().optional(),
      email: z.string().optional(),
      website: z.string().optional(),
      blog: z.string().optional(),
    })
    .optional(),
});
const speakerProfiles = z
  .array(
    z.strictObject({
      personId: id,
      role: z.string().optional(),
      company: z.string().optional(),
      profile: profile.optional(),
    }),
  )
  .optional();
const category = z.enum([
  "GenAI",
  "Cloud",
  "Mobile & Flutter",
  "Web",
  "Leadership & Ecosystem",
  "Space Technology",
  "Physical AI & Robotics",
  "Data & Systems",
]);
// Every format retains the same session metadata. Category never chooses a record type.
const session = {
  id,
  eventId: id,
  publication: z.enum(["confirmed", "archived"]),
  title: z.string().min(1),
  description: z.string(),
  category: category.optional(),
  track: z.string().optional(),
  level: z.string().optional(),
  time: z.string().optional(),
  hall: z.string().optional(),
  slot: z.number().int().positive().optional(),
  durationMinutes: z.number().int().positive().optional(),
  tags: z.array(z.string().min(1)).optional(),
  resources: z.array(z.strictObject({ label: z.string().min(1), url: httpsUrl })).optional(),
  sourceUrl: httpsUrl.optional(),
  spotlightBadge: z.string().optional(),
  speakerProfiles,
};

export const ProgrammeFile = z
  .strictObject({
    $schema: z.string().optional(),
    entries: z.array(
      z.union([
        z.strictObject({
          ...session,
          type: z.literal("talk"),
          speakerIds: ids(),
          role: z.string(),
          company: z.string(),
          spotlightBadge: z.string(),
          profile: profile.optional(),
          format: z.enum(["talk", "keynote", "panel", "workshop"]).optional(),
        }),
        z.strictObject({
          ...session,
          type: z.literal("activity"),
          format: z.enum(["talk", "keynote", "workshop", "exhibit", "panel", "address"]),
          organizationIds: ids().optional(),
          speakerIds: ids().optional(),
        }),
        z
          .strictObject({
            type: z.literal("campus-workshop"),
            id,
            campus: z.string().min(1),
            speakerIds: ids(),
            publication: z.enum(["archived", "confirmed"]),
            title: z.string().min(1).optional(),
            date: z.string().refine(isDate, "Invalid date").meta({ format: "date" }).optional(),
            eventUrl: httpsUrl
              .regex(/^https:\/\/gdg\.community\.dev\/events\/details\/[^?#]+\/?$/)
              .optional(),
            legacyId: id.optional(),
            photoIds: z
              .array(id)
              .refine((items) => new Set(items).size === items.length, "Must contain unique values")
              .meta({ uniqueItems: true }),
          })
          .meta({ dependencies: { date: ["eventUrl"] } }),
      ]),
    ),
  })
  .superRefine((file, ctx) => {
    file.entries.forEach((entry, index) => {
      if (
        entry.type === "campus-workshop" &&
        entry.date !== undefined &&
        entry.eventUrl === undefined
      )
        ctx.addIssue({
          code: "custom",
          path: ["entries", index, "eventUrl"],
          message: "eventUrl is required when date is present",
        });
    });
  });

export type ProgrammeFile = z.infer<typeof ProgrammeFile>;
