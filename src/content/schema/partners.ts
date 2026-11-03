// content/events/<id>/partners.json: what each organization contributed to one edition.
import { z } from "zod";
import { Id, Order, SchemaRef, Text, WebUrl } from "./common.ts";

export const Partner = z.strictObject({
  organization: Id,
  type: z
    .enum(["sponsor", "collaborator", "community", "media"])
    .describe("Use sponsor only for an agreed sponsorship."),
  roleName: Text.describe("Label on the partner card, e.g. Physical AI partner."),
  featured: z
    .enum(["space", "technology"])
    .optional()
    .describe("Featured slot on the home page; one partner per slot."),
  announced: z
    .boolean()
    .optional()
    .describe("false holds back a confirmed partner. Defaults to true."),
  order: Order.optional(),
  isBasedOn: WebUrl.optional().describe("Public page that records this partnership."),
});
export type Partner = z.infer<typeof Partner>;

export const PartnersFile = z.strictObject({
  $schema: SchemaRef,
  partners: z.array(Partner),
});
