import { EVENT_TICKETS as tickets } from "./event";
export type PublicPassId =
  "liftoff" | "student" | "professional" | "vip" | "last-orbit" | "observer";
export interface TicketBenefit {
  group: string;
  label: string;
  detail?: string;
}
export interface PublicPass {
  id: PublicPassId;
  name: string;
  audience: string;
  visible: boolean;
  summary: string;
  allocation: number;
  description: string;
  soldOut?: boolean;
  eligibility: string;
  benefits: TicketBenefit[];
  note?: string;
  price?: number;
}
// These are views, not a second editable ticket directory.
export const PUBLIC_PASSES = tickets.passes as PublicPass[];
export const VISIBLE_PASSES = PUBLIC_PASSES.filter((pass) => pass.visible);
export const TICKET_BENEFIT_GROUPS = tickets.benefitGroups;
export const getPublicPass = (id: PublicPassId) => PUBLIC_PASSES.find((pass) => pass.id === id)!;
export const REGISTRATION_CHECKLIST = tickets.registrationChecklist;
export const TICKET_REGISTRATION = tickets.registration;
export const formatPassPrice = (pass: Pick<PublicPass, "price">) =>
  pass.price === undefined
    ? "Price to be announced"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(pass.price);
export const REGISTRATION_DECLARATION = tickets.registrationDeclaration;
export interface TicketPolicy {
  id: string;
  title: string;
  text: string;
  appliesTo?: PublicPassId[];
}
export const TICKET_POLICIES = tickets.policies as TicketPolicy[];
export const getTicketPolicies = (passIds: readonly PublicPassId[]) =>
  TICKET_POLICIES.filter(
    (policy) => !policy.appliesTo || policy.appliesTo.some((id) => passIds.includes(id)),
  );
