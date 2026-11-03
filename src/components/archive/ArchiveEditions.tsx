import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { ARCHIVED_EVENTS } from "@/content/archive";
import type { ArchivedEvent } from "@/content/model";
import styles from "./Archive.module.css";

function Edition({ event }: { event: ArchivedEvent }) {
  const year = event.date.slice(0, 4);
  return (
    <li id={event.id.startsWith("devfest-") ? year : event.id}>
      <Link href={`/archive/${event.id}`} className={styles.card}>
        <span className={styles.cover}>
          {event.coverImage ? (
            <Image
              src={event.coverImage.src}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 999px) 50vw, 380px"
            />
          ) : (
            <span className={styles.coverFallback}>{year}</span>
          )}
        </span>
        <h3>{event.title}</h3>
        <p className={styles.meta}>
          <span>
            <CalendarDays aria-hidden="true" />
            <time dateTime={event.date}>{event.displayDate}</time>
          </span>
          <span>
            <MapPin aria-hidden="true" />
            {event.venue}
          </span>
        </p>
        <p className={styles.summary}>{event.summary}</p>
      </Link>
    </li>
  );
}

/** DevFest and Cloud Community Days editions, newest first, one card each. */
export default function ArchiveEditions() {
  return (
    <ul className={styles.cards}>
      {ARCHIVED_EVENTS.filter((event) => event.series).map((event) => (
        <Edition key={event.id} event={event} />
      ))}
    </ul>
  );
}
