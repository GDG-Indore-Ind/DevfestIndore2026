import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/content/faqs";
import { FAQ_PAGE as page } from "@/content/pages";

type FaqKind = "event" | "tickets";

export default function FaqSection({ kind = "event" }: { kind?: FaqKind }) {
  return (
    <section className="audience-section" id={`questions-${kind}`} aria-labelledby={`faq-title-${kind}`}>
      <div className="audience-wrap audience-faq-layout">
        <div className="audience-section-heading"><h2 id={`faq-title-${kind}`}>{kind === "tickets" ? page.ticketsTitle : page.eventTitle}</h2><p>{kind === "tickets" ? page.ticketsLead : page.eventLead}</p></div>
        <div className="audience-faq-list">
          {FAQS.filter(faq => faq.kind === kind).map(faq => <details key={faq.id}><summary>{faq.question}</summary><div><p>{faq.answer}</p>{faq.link && <Link href={faq.link.href} className="audience-text-link">{faq.link.label}<ArrowRight className="audience-icon" aria-hidden="true" /></Link>}</div></details>)}
        </div>
      </div>
    </section>
  );
}
