import Link from "next/link";
import { PAGE_COPY } from "@/content/copy";

export default function BadgeTeaser() {
  const copy = PAGE_COPY.badge;
  return (
    <section className="audience-section" aria-labelledby="badge-teaser-title">
      <div className="audience-wrap">
        <h2 id="badge-teaser-title">Attendee badge</h2>
        <p>{copy.teaserLead}</p>
        <Link href="/badge" className="audience-button space-primary-button">
          {copy.teaserAction}
        </Link>
      </div>
    </section>
  );
}
