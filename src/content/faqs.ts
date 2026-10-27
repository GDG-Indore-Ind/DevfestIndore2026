import pages from "../../content/pages.json";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "./event";
import { TICKET_POLICIES } from "./tickets";
const policy = (id: string) => TICKET_POLICIES.find((item) => item.id === id)!.text;
const faqValues: Record<string, string> = {
  date: EVENT_DATE,
  venue: EVENT.venue.name,
  address: EVENT.venue.address,
  registrationTime: REGISTRATION_TIME,
  entryPolicy: policy("entry-identification"),
  workshopPolicy: policy("workshop-access"),
  finalSalePolicy: policy("final-sale"),
};
export const FAQS = pages.faq.questions.map((faq) => ({
  ...faq,
  answer: faq.answer.replace(/\{\{(\w+)\}\}/g, (_, key: string) => faqValues[key] ?? ""),
}));
