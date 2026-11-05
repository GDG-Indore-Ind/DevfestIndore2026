import { z } from "zod";
import { httpsUrl, id, text } from "./common.ts";

const photo = z.string().regex(/^(https:\/\/|\/[^/])/);

const links = z.strictObject({
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  blog: z.string().optional(),
});

const responsibility = z.strictObject({
  area: text,
  level: z.enum(["lead", "co-lead", "coordinator", "team-member", "volunteer"]).optional(),
});

const roleBase = {
  title: text.optional().describe("Overrides the default role label, e.g. Keynote speaker."),
  order: z
    .number()
    .refine(Number.isInteger, "Expected an integer")
    .meta({ type: "integer" })
    .min(1)
    .optional(),
};

export const PersonRole = z.discriminatedUnion("kind", [
  z.strictObject({
    ...roleBase,
    kind: z.literal("speaker"),
  }),
  z.strictObject({
    ...roleBase,
    kind: z.literal("core-team"),
    responsibilities: z.array(responsibility).min(1),
  }),
  z.strictObject({
    ...roleBase,
    kind: z.literal("volunteer"),
    responsibilities: z.array(responsibility).min(1),
  }),
  z.strictObject({
    ...roleBase,
    kind: z.literal("ambassador"),
    track: z.enum(["professional", "student"]),
    community: text,
  }),
]);

const personEvent = z.strictObject({
  eventId: text,
  sourceUrl: httpsUrl.optional(),
  roles: z.array(PersonRole).min(1),
});

export const Person = z.strictObject({
  id,
  name: text,
  kind: z.enum(["person", "group"]),
  title: text.optional().describe("Current job title, e.g. Senior Engineer."),
  organization: text.optional().describe("Current employer or community, e.g. Qualcomm."),
  bio: z
    .string()
    .optional()
    .describe("Plain text; use a blank line between paragraphs. Put profile URLs under links."),
  photo: photo.optional(),
  links: links.optional(),
  events: z
    .array(personEvent)
    .optional()
    .describe("One entry per event this person took part in, naming their roles there."),
});

export const PeopleFile = z.strictObject({
  $schema: z.string(),
  people: z.array(Person),
});

export type PersonRole = z.infer<typeof PersonRole>;
export type Person = z.infer<typeof Person>;
