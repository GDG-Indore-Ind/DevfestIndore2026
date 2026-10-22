import tickets from "../../content/tickets.json";
import { EVENT } from "@/content/event";
export type PublicPassId = "liftoff" | "student" | "professional" | "vip" | "last-orbit" | "observer";
export interface PublicPass {
  id: PublicPassId;
  name: string;
  audience: string;
  summary: string;
  allocation: number;
  description: string;
  opensAt: string;
  closesAt: string;
  window: string;
  opening: string;
  closing: string;
  eligibility: string;
  benefits: string[];
  note: string;
  price?: number;
}
// These are views, not a second editable ticket directory.
const dateLabel = (date: string, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { ...options, timeZone: EVENT.timezone }).format(new Date(date));
export const PUBLIC_PASSES: PublicPass[] = tickets.passes.map(pass => {
  const sameMonth = dateLabel(pass.opensAt, { month: "short" }) === dateLabel(pass.closesAt, { month: "short" });
  const start = dateLabel(pass.opensAt, sameMonth ? { day: "numeric" } : { day: "numeric", month: "short" });
  const end = dateLabel(pass.closesAt, { day: "numeric", month: "short" });
  const closingTime = dateLabel(pass.closesAt, { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
  return { ...pass, id: pass.id as PublicPassId, window: `${start}–${end}`, opening: dateLabel(pass.opensAt, { day: "numeric", month: "long" }), closing: `${dateLabel(pass.closesAt, { day: "numeric", month: "long" })} at ${closingTime}` };
});
export const getPublicPass = (id: PublicPassId) => PUBLIC_PASSES.find(pass => pass.id === id)!;
export const REGISTRATION_CHECKLIST = tickets.registrationChecklist;
// The first checklist entry is the prominent KonfHub profile-preparation reminder.
export const KONFHUB_PROFILE_REMINDER = REGISTRATION_CHECKLIST[0];
export const BOOKING_STEPS = tickets.bookingSteps;
export const formatPassPrice = (pass: Pick<PublicPass, "price">) => pass.price === undefined ? "Price to be announced" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(pass.price);
export const REGISTRATION_DECLARATION = tickets.registrationDeclaration;
export interface TicketPolicy { id: string; title: string; text: string; appliesTo?: PublicPassId[] }
export const TICKET_POLICIES = tickets.policies as TicketPolicy[];
export const getTicketPolicies = (passIds: readonly PublicPassId[]) => TICKET_POLICIES.filter(policy => !policy.appliesTo || policy.appliesTo.some(id => passIds.includes(id)));
export const TICKET_FAQS = [
  { question: "How can I make registration smoother?", answer: KONFHUB_PROFILE_REMINDER.text },
  { question: "What should I bring for check-in?", answer: `${TICKET_POLICIES.find(policy => policy.id === "entry-identification")!.text} Cadet holders must also bring their original, active physical institutional photo ID.` },
  { question: "Does a conference ticket reserve a workshop seat?", answer: TICKET_POLICIES.find(policy => policy.id === "workshop-access")!.text },
  { question: "When do passes go on sale?", answer: PUBLIC_PASSES.map(pass => `${pass.name}: ${pass.window} (IST).`).join(" ") },
  { question: "Which pass should I choose?", answer: PUBLIC_PASSES.map(pass => `${pass.name}: ${pass.description}`).join(" ") },
  { question: "What is included with my ticket?", answer: PUBLIC_PASSES.map(pass => `${pass.name}: ${pass.benefits.join(", ")}.`).join(" ") },
  { question: "Can I cancel, refund or transfer my ticket?", answer: TICKET_POLICIES.find(policy => policy.id === "final-sale")!.text },
];
