// content/events/<id>/team.json and ambassadors.json: who organized an edition.
import { z } from "zod";
import { Id, Order, SchemaRef, Text } from "./common.ts";

export const Responsibility = z.strictObject({
  area: Text.describe("e.g. Design & Creative."),
  level: z.enum(["lead", "co-lead", "coordinator", "team-member", "volunteer"]).optional(),
});

export const TeamMember = z.strictObject({
  person: Id,
  group: z.enum(["core-team", "volunteers"]),
  roleName: Text.optional().describe("Overrides the label built from responsibilities."),
  order: Order.optional(),
  responsibilities: z.array(Responsibility).min(1),
});
export type TeamMember = z.infer<typeof TeamMember>;

export const Ambassador = z.strictObject({
  person: Id,
  track: z.enum(["professional", "student"]),
  community: Text.describe("College or community the ambassador represents."),
  order: Order.optional(),
});
export type Ambassador = z.infer<typeof Ambassador>;

export const TeamFile = z.strictObject({
  $schema: SchemaRef,
  team: z.array(TeamMember),
});

export const AmbassadorsFile = z.strictObject({
  $schema: SchemaRef,
  ambassadors: z.array(Ambassador),
});
