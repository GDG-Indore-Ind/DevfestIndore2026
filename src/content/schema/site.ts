// content/site.json: the organizer, site-wide links and feature switches.
import { z } from "zod";
import { HttpsUrl, Id, ImagePath, SchemaRef, Text, WebUrl } from "./common.ts";

/** schema.org/Organization for GDG Indore, plus settings that span every page. */
export const Site = z.strictObject({
  $schema: SchemaRef,
  name: Text,
  url: HttpsUrl,
  email: z.email(),
  logo: ImagePath.optional(),
  sameAs: z
    .array(WebUrl)
    .describe(
      "The organizer's public profiles: chapter page, LinkedIn, Instagram, YouTube, GitHub, X.",
    ),
  codeOfConduct: HttpsUrl,
  currentEvent: Id.describe("Folder name under content/events/ of the edition the site promotes."),
  ecosystem: z
    .array(Id)
    .describe("Organizations shown as the wider developer ecosystem, not tied to one event."),
  historicalSponsors: z.array(Id).describe("Past sponsors whose edition is not recorded."),
  features: z.strictObject({
    partnersRevealed: z.boolean().describe("Shows announced partners for the current event."),
    ambassadorContact: z
      .boolean()
      .describe("Shows ambassador contact actions on the tickets page."),
  }),
});
export type Site = z.infer<typeof Site>;
