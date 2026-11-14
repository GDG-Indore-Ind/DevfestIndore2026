import { z } from "zod";
import { text } from "./common.ts";

// Validate structured publication content, not every fixed English interface label.
// Ordinary copy is TypeScript in copy.ts and is checked through its consuming components.
const section = (shape: z.ZodRawShape) => z.looseObject(shape);
const id = z.string().regex(/^[a-z0-9][a-z0-9-]*$/);
export const PagesFile = section({
  guidelines: section({
    title: text,
    sections: z
      .array(
        z.strictObject({
          id,
          title: text,
          policyIds: z
            .array(text)
            .min(1)
            .refine(
              (items) => new Set(items).size === items.length,
              "Policy references must be unique",
            )
            .meta({ uniqueItems: true }),
        }),
      )
      .min(1),
  }),
  home: section({
    themes: z
      .array(
        z.strictObject({
          id,
          label: text,
          icon: z.enum(["Satellite", "Braces", "Bot", "Radio"]),
          color: z.enum(["blue", "red", "yellow", "green"]),
          signal: text,
          title: text,
          description: text,
          tags: z.array(text),
        }),
      )
      .min(1),
    exhibits: section({
      confirmed: z.array(z.strictObject({ id, title: text, detail: text })),
    }),
  }),
  faq: section({
    questions: z.array(
      z.strictObject({
        id,
        question: text,
        answer: text,
        kind: z.enum(["event", "tickets"]),
        link: z.strictObject({ href: z.string().regex(/^\/[^ ]*$/), label: text }).optional(),
      }),
    ),
  }),
  agenda: section({
    stages: z
      .array(
        z.strictObject({ hall: text, title: text, lead: text.optional(), numbered: z.boolean() }),
      )
      .min(1),
  }),
});
