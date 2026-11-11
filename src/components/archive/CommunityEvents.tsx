import { CalendarDays, MapPin } from "lucide-react";
import { COMMUNITY_EVENTS } from "@/content/archive";
import { WORKSHOPS_PAGE as page } from "@/content/pages";
import ExternalLink from "@/components/shared/ExternalLink";
import styles from "./CommunityEvents.module.css";

/** Other GDG gatherings, each linked to its official event page. */
export default function CommunityEvents() {
  return (
    <div className={styles.root}>
      <div className="community-event-list">
        {COMMUNITY_EVENTS.map((item) => (
          <article key={item.id}>
            <CalendarDays aria-hidden="true" />
            <div>
              <p className="audience-caption">
                <time dateTime={item.date}>{item.displayDate}</time>
              </p>
              <h3>{item.title}</h3>
              <p className="event-location">
                <MapPin className="audience-icon" aria-hidden="true" />
                {item.venue}
              </p>
              <ExternalLink href={item.source}>{page.eventLinkLabel}</ExternalLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
