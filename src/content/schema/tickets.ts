// content/events/<id>/tickets.json: passes, booking and registration policies.
// KonfHub owns live inventory, pricing and payment; keep these facts in step with it.
import { z } from "zod";
import { HttpsUrl, Id, SchemaRef, Text } from "./common.ts";

export const Benefit = z.strictObject({
  group: Id.describe("A benefitGroups id."),
  label: Text,
  detail: Text.optional(),
});

/** schema.org/Offer */
export const Offer = z.strictObject({
  id: Id.describe("Stable pass id. Rename name freely, never the id."),
  name: Text,
  description: Text,
  summary: Text.optional().describe("One sentence listing what the pass includes."),
  price: z
    .number()
    .min(0)
    .optional()
    .describe("Approved base price. Omit until confirmed; 0 means free."),
  priceCurrency: z
    .string()
    .regex(/^[A-Z]{3}$/, "Use an ISO 4217 code, e.g. INR")
    .optional(),
  discount: Text.optional().describe(
    "Short offer line under the price, e.g. Buy 6–10 tickets, get 15% off.",
  ),
  availability: z
    .enum(["in-stock", "sold-out", "pre-order"])
    .describe("sold-out moves the card below the booking widget with no Register button."),
  inventoryLevel: z.int().min(0).describe("Tickets allocated to this pass."),
  eligibleCustomerType: Text.describe("Who may buy it, e.g. Students only."),
  eligibility: Text.describe("Full eligibility rules shown on the card."),
  note: Text.optional(),
  bookingRoute: z
    .enum(["konfhub", "ambassador"])
    .optional()
    .describe("ambassador sends the card to /ambassadors. Defaults to konfhub."),
  listed: z.boolean().describe("false hides the pass card."),
  benefits: z.array(Benefit).min(1),
});
export type Offer = z.infer<typeof Offer>;

export const Policy = z.strictObject({
  id: Id,
  title: Text,
  text: Text,
  appliesTo: z
    .array(Id)
    .min(1)
    .optional()
    .describe("Offer ids this policy is limited to. Leave out for every pass."),
});
export type Policy = z.infer<typeof Policy>;

export const GuidelineSection = z.strictObject({
  id: Id,
  title: Text,
  policies: z
    .array(Id)
    .min(1)
    .describe("Policy ids, in display order. Every policy appears in exactly one section."),
});

export const TicketsFile = z.strictObject({
  $schema: SchemaRef,
  booking: z.strictObject({
    enabled: z.boolean().describe("Turns the KonfHub widget and direct link on or off."),
    url: HttpsUrl,
    widgetUrl: z
      .string()
      .regex(
        /^https:\/\/konfhub\.com\/widget\/id\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        "Use the KonfHub widget URL",
      ),
  }),
  offers: z.array(Offer).min(1),
  benefitGroups: z.array(z.strictObject({ id: Id, label: Text })).min(1),
  policies: z.array(Policy).min(1),
  guidelines: z.array(GuidelineSection).min(1),
  registrationChecklist: z.array(z.strictObject({ title: Text, text: Text })),
  registrationDeclaration: Text,
});
export type TicketsFile = z.infer<typeof TicketsFile>;
