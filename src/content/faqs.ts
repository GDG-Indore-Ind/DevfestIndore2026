import pages from "./generated/pages.json";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "./event";
import { formatPassPrice, getPublicPass, TICKET_POLICIES } from "./tickets";
import { faqPolicyValues, renderFaqAnswer, type FaqValues } from "./faq-template";
const studentPass = getPublicPass("student");
const professionalPass = getPublicPass("professional");
const faqValues: FaqValues = {
  ...faqPolicyValues(TICKET_POLICIES),
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
  answer: renderFaqAnswer(faq.answer, faqValues),
}));
