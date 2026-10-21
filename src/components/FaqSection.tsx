"use client";

import { TICKET_POLICIES } from "@/content/tickets";
import { useTicketRelease } from "@/contexts/TicketReleaseContext";
import { FAQS } from "@/content/faqs";

type FaqKind = "event" | "tickets";
const isTicketQuestion = (question: string) => /ticket|pass|cadet|commander|liftoff|flight deck|observer|last orbit|refund|transfer|payment|booking|registration|cancellation/i.test(question);

export default function FaqSection({ kind = "event" }: { kind?: FaqKind }) {
  const passes = useTicketRelease();
  const releaseFaqs = [
    { question: "Which pass is featured right now?", answer: passes.length ? passes.map((pass) => `${pass.name}: ${pass.window} 2026 (IST). ${pass.description}`).join(" ") : "This year’s pass release windows have ended. Contact gdgindore@gmail.com with booking questions." },
    ...passes.map((pass) => ({ question: `What does ${pass.name} include?`, answer: `${pass.benefits.join(". ")}. Tickets are non-transferable.` })),
    { question: "What do I need to book?", answer: passes.map((pass) => pass.eligibility).join(" ") + " Use unique names, email addresses and LinkedIn profiles for each attendee. KonfHub confirms pricing and availability." },
    { question: "Can I cancel, refund or transfer my ticket?", answer: TICKET_POLICIES[0].text },
  ];
  const faqs = FAQS.map((faq, index) => ({ id: `faq-${index + 1}`, ...faq }));

  return (
    <section className="audience-section" id={`questions-${kind}`} aria-labelledby={`faq-title-${kind}`}>
      <div className="audience-wrap audience-faq-layout">
        <div className="audience-section-heading"><h2 id={`faq-title-${kind}`}>{kind === "tickets" ? "Ticket questions" : "Before you come"}</h2><p>{kind === "tickets" ? "Release dates, eligibility and what your pass includes." : "A few practical things to know."}</p></div>
        <div className="audience-faq-list">
          {(kind === "tickets" ? releaseFaqs.map((faq, index) => ({ ...faq, id: `ticket-faq-${index}` })) : faqs.filter((faq) => !isTicketQuestion(faq.question))).map((faq) => <details key={faq.id}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
