import { z } from "zod";
import { httpsUrl, id, text } from "./common.ts";

const imageOrHttps = z.string().regex(/^(https:\/\/|\/[^/])/);

const contributionFields = {
  id,
  order: z
    .number()
    .refine(Number.isInteger, "Expected an integer")
    .meta({ type: "integer" })
    .min(0)
    .optional(),
  source: imageOrHttps.optional(),
  featured: z.enum(["space", "technology"]).optional(),
  visible: z
    .boolean()
    .optional()
    .describe("Whether this confirmed partnership is publicly revealed. Defaults to true."),
  status: z.enum(["confirmed", "archived", "ecosystem"]),
  type: z.enum(["sponsor", "collaborator", "community", "media"]),
  title: text,
};

const contribution = z.union([
  z.strictObject({ ...contributionFields, eventId: id }),
  z.strictObject({ ...contributionFields, scope: z.enum(["historical", "ecosystem"]) }),
]);

const archiveLogoWindow = z.tuple([
  z.number().refine(Number.isInteger, "Expected an integer").meta({ type: "integer" }).min(0),
  z.number().refine(Number.isInteger, "Expected an integer").meta({ type: "integer" }).min(0),
  z.number().refine(Number.isInteger, "Expected an integer").meta({ type: "integer" }).min(0),
  z.number().refine(Number.isInteger, "Expected an integer").meta({ type: "integer" }).min(0),
]);

export const Organization = z.strictObject({
  id,
  name: text,
  logoShape: z.enum(["square", "wide", "wide-large"]).optional(),
  description: text.optional(),
  archiveLogoWindow: archiveLogoWindow.optional(),
  logo: imageOrHttps.optional(),
  website: httpsUrl.optional(),
  social: httpsUrl.optional(),
  contributions: z.array(contribution),
});

export const OrganizationsFile = z.strictObject({
  $schema: z.string(),
  archiveLogoSheet: imageOrHttps,
  organizations: z.array(Organization),
});

export type Organization = z.infer<typeof Organization>;
