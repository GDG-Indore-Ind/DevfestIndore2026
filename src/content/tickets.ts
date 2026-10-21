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
export const REGISTRATION_DECLARATION = tickets.registrationDeclaration;
export const TICKET_POLICIES = tickets.policies;
export const TICKET_FAQS = [
  { question: "When do passes go on sale?", answer: PUBLIC_PASSES.map(pass => `${pass.name}: ${pass.window} (IST).`).join(" ") },
  { question: "Which pass should I choose?", answer: PUBLIC_PASSES.map(pass => `${pass.name}: ${pass.description}`).join(" ") },
  { question: "What is included with my ticket?", answer: PUBLIC_PASSES.map(pass => `${pass.name}: ${pass.benefits.join(", ")}.`).join(" ") },
  { question: "Can I cancel, refund or transfer my ticket?", answer: TICKET_POLICIES[0].text },
];
