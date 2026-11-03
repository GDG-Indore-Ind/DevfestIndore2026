// content/people.json: who someone is. Roles live in each event folder.
import { z } from "zod";
import { Id, ImagePath, LongText, SchemaRef, Text, WebUrl } from "./common.ts";

/** schema.org/Person */
export const Person = z.strictObject({
  id: Id,
  name: Text,
  jobTitle: Text.optional().describe("Current job title, e.g. Senior Engineer."),
  worksFor: Text.optional().describe("Current employer or community, e.g. Qualcomm."),
  description: LongText.optional(),
  image: ImagePath.optional().describe(
    "Added by npm run photos; people without one show initials.",
  ),
  hasCredential: z
    .array(Text)
    .optional()
    .describe("Recognitions shown as a badge, e.g. Google Developer Expert."),
  sameAs: z
    .array(WebUrl)
    .optional()
    .describe(
      "Public profile URLs. The site recognises LinkedIn, X, GitHub, Instagram and others by domain.",
    ),
});
export type Person = z.infer<typeof Person>;

export const PeopleFile = z.strictObject({
  $schema: SchemaRef,
  people: z.array(Person),
});
export type PeopleFile = z.infer<typeof PeopleFile>;
