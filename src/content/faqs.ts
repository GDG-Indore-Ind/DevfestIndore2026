import pages from "../../content/pages.json";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "./event";
import { formatPassPrice, getPublicPass } from "./tickets";
const studentPass = getPublicPass("student");
const professionalPass = getPublicPass("professional");
const faqValues: Record<string, string> = {
  date: EVENT_DATE,
  venue: EVENT.venue.name,
  address: EVENT.venue.address,
  registrationTime: REGISTRATION_TIME,
  studentPrice: formatPassPrice(studentPass),
  professionalPrice: formatPassPrice(professionalPass),
  groupOffer: professionalPass.offers?.[1] ?? "",
};
export const FAQS = pages.faq.questions.map((faq) => ({
  ...faq,
  answer: faq.answer.replace(/\{\{(\w+)\}\}/g, (_, key: string) => faqValues[key] ?? ""),
}));
