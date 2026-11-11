import Link from "next/link";
import { AGENDA_PAGE } from "@/content/pages";
import styles from "./AgendaTimetable.module.css";

const copy = AGENDA_PAGE.timetable;

/** One quiet note in place of a list of placeholders until the real timetable is final. */
export default function AgendaTimetable() {
  return (
    <section className={styles.root} aria-labelledby="timetable-title">
      <h2 id="timetable-title">{copy.title}</h2>
      <p>{copy.body}</p>
      <p className={styles.links}>
        <Link href="/agenda/workshops">{copy.workshopsLabel}</Link>
        <Link href="/tickets">{copy.ticketsLabel}</Link>
      </p>
    </section>
  );
}
