// content/organizations.json: what an organization is. Partnerships live in each event folder.
import { z } from "zod";
import { HttpsUrl, Id, ImagePath, SchemaRef, Text, WebUrl } from "./common.ts";

/** schema.org/Organization */
export const Organization = z.strictObject({
  id: Id,
  name: Text,
  alternateName: Text.optional(),
  description: Text.optional(),
  logo: ImagePath.optional(),
  logoShape: z
    .enum(["square", "wide", "wide-large"])
    .optional()
    .describe("How much room the logo needs in partner grids."),
  url: HttpsUrl.optional().describe("Official website."),
  sameAs: z
    .array(WebUrl)
    .optional()
    .describe("Public profile URLs, e.g. LinkedIn or a community page."),
});
export type Organization = z.infer<typeof Organization>;

export const OrganizationsFile = z.strictObject({
  $schema: SchemaRef,
  organizations: z.array(Organization),
});
export type OrganizationsFile = z.infer<typeof OrganizationsFile>;
