import faqs from "../../content/faqs.json";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "./event";
import { TICKET_FAQS } from "./tickets";
const faqValues: Record<string, string> = { date: EVENT_DATE, venue: EVENT.venue.name, address: EVENT.venue.address, registrationTime: REGISTRATION_TIME };
export const FAQS = [...faqs.questions.map(faq => ({ question: faq.question, answer: faq.answer.replace(/\{\{(\w+)\}\}/g, (_, key: string) => faqValues[key] ?? "") })), ...TICKET_FAQS];
