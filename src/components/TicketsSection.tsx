import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TicketsSection() {
  return (
    <section className="space-ticket-cta" aria-label="Tickets">
      <div className="audience-wrap">
        <Link href="/tickets" className="audience-button space-primary-button">
          Get tickets <ArrowRight className="audience-icon" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
