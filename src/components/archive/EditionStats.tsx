import {
  Briefcase,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Handshake,
  Mic,
  Presentation,
  Users,
} from "lucide-react";
import type { EventStats } from "@/content/model";
import { ARCHIVE_PAGE as page } from "@/content/pages";
import styles from "./Archive.module.css";

type StatKey = keyof typeof page.statLabels;

const icons: Record<StatKey, typeof Users> = {
  registrations: ClipboardList,
  rsvps: CalendarCheck,
  attendees: Users,
  speakers: Mic,
  sessions: Presentation,
  sponsors: Handshake,
  professionals: Briefcase,
  students: GraduationCap,
};
const allKeys = Object.keys(icons) as StatKey[];
const number = new Intl.NumberFormat("en-IN");

/** The figures the organizers reported for an edition, shown on its own page. */
export default function EditionStats({ stats }: { stats: EventStats }) {
  const shown = allKeys.filter((key) => stats[key] !== undefined);
  if (!shown.length) return null;
  return (
    <>
      <dl className={styles.stats}>
        {shown.map((key) => {
          const Icon = icons[key];
          return (
            <div key={key}>
              <Icon aria-hidden="true" />
              <dt>{page.statLabels[key]}</dt>
              <dd>
                {number.format(stats[key] as number)}
                {stats.approximate && key === "attendees" ? "+" : ""}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="audience-caption">{page.statsLabel}</p>
    </>
  );
}
