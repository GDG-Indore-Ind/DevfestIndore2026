// content/events/<id>/faq.json and themes.json: per-edition questions and programme themes.
import { z } from "zod";
import { Id, SchemaRef, SitePath, Text } from "./common.ts";

export const FAQ_TOKENS = [
  "date",
  "venue",
  "address",
  "registrationTime",
  "entryPolicy",
  "workshopPolicy",
  "finalSalePolicy",
  "studentPrice",
  "professionalPrice",
  "groupOffer",
] as const;

/** schema.org/Question */
export const Question = z.strictObject({
  id: Id,
  question: Text,
  answer: Text.describe(
    `May use ${FAQ_TOKENS.map((token) => `{{${token}}}`).join(", ")} to stay in sync with event facts.`,
  ),
  topic: z.enum(["event", "tickets"]),
  link: z.strictObject({ href: SitePath, label: Text }).optional(),
});
export type Question = z.infer<typeof Question>;

export const Theme = z.strictObject({
  id: Id,
  label: Text,
  icon: Text.describe("lucide-react icon name, e.g. Satellite."),
  color: z.enum(["blue", "red", "yellow", "green"]),
  signal: Text,
  title: Text,
  description: Text,
  tags: z.array(Text).min(1),
});
export type Theme = z.infer<typeof Theme>;

export const FaqFile = z.strictObject({
  $schema: SchemaRef,
  questions: z.array(Question),
});

export const ThemesFile = z.strictObject({
  $schema: SchemaRef,
  themes: z.array(Theme),
});
