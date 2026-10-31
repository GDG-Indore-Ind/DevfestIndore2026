import { DEVFEST_EDITIONS } from "@/content/archive";
import ExternalLink from "@/components/shared/ExternalLink";
import styles from "./Archive.module.css";

export default function ArchiveEditions() {
  return (
    <ol className={styles.editions}>
      {DEVFEST_EDITIONS.map((event) => {
        const year = event.date.slice(0, 4);
        return (
          <li key={event.id} id={year}>
            <h3>{event.title}</h3>
            <p className="audience-caption">
              <time dateTime={event.date}>{event.displayDate}</time> · {event.venue}
            </p>
            <p className="audience-body">{event.summary}</p>
            <ExternalLink href={event.source}>Official event record</ExternalLink>
          </li>
        );
      })}
    </ol>
  );
}
