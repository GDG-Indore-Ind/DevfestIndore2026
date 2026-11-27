import { AGENDA_ITEMS, type AgendaItem } from "@/content/agenda";
import { AGENDA_PAGE as copy } from "@/content/pages";
import ActivityCards from "./ActivityCards";
import AgendaSession, {
  AgendaMilestoneRow,
  type AgendaMilestone,
  type AgendaRowTone,
} from "./AgendaSession";
import { AgendaTabs, type AgendaTabDefinition, type AgendaTabId } from "./AgendaTabs";
import ExhibitList from "./ExhibitList";
import styles from "./AgendaBoard.module.css";

const HALL_1 = "Orbit Lab (Hall 1)";
const HALL_2 = "Launch Lab (Hall 2)";

const SESSION_HALL_MILESTONES: AgendaMilestone[] = [
  {
    id: "devfest-2026-event-start",
    time: "10:30",
    durationMinutes: 15,
    title: "Event starts · Opening welcome",
    subtitle: "Doors open and morning kick-off at the Main Stage",
  },
  {
    id: "devfest-2026-lunch-break",
    time: "13:20",
    durationMinutes: 55,
    title: "Break & Lunch",
    subtitle: "Lunch served · Explore booths & lounges before 14:15",
    tone: "red",
  },
  {
    id: "devfest-2026-community-networking",
    time: "15:00",
    durationMinutes: 15,
    title: "Community Networking & Fun Activity",
    subtitle: "Interactive break, games & hall transitions",
    tone: "green",
  },
  {
    id: "devfest-2026-community-transition",
    time: "16:05",
    durationMinutes: 10,
    title: "Community Networking & Break",
    subtitle: "Quick break & hall transition before the closing session",
    tone: "green",
  },
  {
    id: "devfest-2026-closing-note",
    time: "16:50",
    title: "Closing note",
    subtitle: "Wrap-up, feedback & group photo",
  },
];

const HALL_1_MILESTONES: AgendaMilestone[] = [
  {
    id: "devfest-2026-hall-1-lunch",
    time: "13:45",
    durationMinutes: 40,
    title: "Break & Lunch",
    subtitle: "Lunch break after Arduino UNO Q workshop",
    tone: "red",
  },
];

const HALL_2_MILESTONES: AgendaMilestone[] = [
  {
    id: "devfest-2026-hall-2-lunch",
    time: "13:05",
    durationMinutes: 80,
    title: "Break & Lunch",
    subtitle: "Lunch break & Exhibit Lounge before afternoon labs",
    tone: "red",
  },
];

type ScheduleRow =
  | { kind: "session"; time: string; item: AgendaItem }
  | { kind: "milestone"; time: string; milestone: AgendaMilestone };

function mergeRows(items: AgendaItem[], milestones: AgendaMilestone[]): ScheduleRow[] {
  return [
    ...items.map((item) => ({ kind: "session" as const, time: item.time ?? "~", item })),
    ...milestones.map((milestone) => ({
      kind: "milestone" as const,
      time: milestone.time,
      milestone,
    })),
  ].sort((a, b) => a.time.localeCompare(b.time));
}

function renderRows(rows: ScheduleRow[], toneFor?: (id: string) => AgendaRowTone | undefined) {
  return (
    <ul className={styles.list}>
      {rows.map((entry) =>
        entry.kind === "milestone" ? (
          <AgendaMilestoneRow key={entry.milestone.id} item={entry.milestone} />
        ) : (
          <AgendaSession
            key={entry.item.id}
            item={entry.item}
            showHall={false}
            tone={toneFor?.(entry.item.id)}
          />
        ),
      )}
    </ul>
  );
}

export default function AgendaBoard() {
  const sessions = AGENDA_ITEMS.filter(
    (item) => item.format !== "workshop" && item.format !== "exhibit",
  );
  const hall1 = AGENDA_ITEMS.filter((item) => item.format === "workshop" && item.hall === HALL_1);
  const hall2 = AGENDA_ITEMS.filter((item) => item.format === "workshop" && item.hall === HALL_2);
  const otherWorkshops = AGENDA_ITEMS.filter(
    (item) => item.format === "workshop" && item.hall !== HALL_1 && item.hall !== HALL_2,
  );
  const hall1Items = [...hall1, ...otherWorkshops];
  const exhibits = AGENDA_ITEMS.filter((item) => item.format === "exhibit");

  const sessionHallRows = mergeRows(sessions, SESSION_HALL_MILESTONES);
  const hall1Rows = mergeRows(hall1Items, HALL_1_MILESTONES);
  const hall2Rows = mergeRows(hall2, HALL_2_MILESTONES);

  const itemTabMap: Record<string, AgendaTabId> = {};
  for (const item of sessions) itemTabMap[item.id] = "sessions";
  for (const milestone of SESSION_HALL_MILESTONES) itemTabMap[milestone.id] = "sessions";
  for (const item of hall1Items) itemTabMap[item.id] = "hall-1";
  for (const milestone of HALL_1_MILESTONES) itemTabMap[milestone.id] = "hall-1";
  for (const item of hall2) itemTabMap[item.id] = "hall-2";
  for (const milestone of HALL_2_MILESTONES) itemTabMap[milestone.id] = "hall-2";
  for (const item of exhibits) itemTabMap[item.id] = "exhibits";

  const tabs: AgendaTabDefinition[] = [
    { id: "sessions", label: "Session Hall", count: sessions.length },
    { id: "hall-1", label: "Workshops · Hall 1", count: hall1Items.length },
    { id: "hall-2", label: "Workshops · Hall 2", count: hall2.length },
    { id: "exhibits", label: "Exhibitors", count: exhibits.length },
    { id: "activities", label: copy.sections.activities },
  ];

  const salmanSetup = AGENDA_ITEMS.find(
    ({ id }) => id === "devfest-2026-qualcomm-physical-ai-workshop",
  )?.resources;

  const panels = {
    sessions: (
      <section id="sessions" className={styles.group} aria-labelledby="agenda-sessions">
        <header className={styles.groupHeading}>
          <h2 id="agenda-sessions">Session Hall</h2>
          <p>Main Stage · Event starts 10:30 AM</p>
        </header>
        {sessionHallRows.length ? (
          renderRows(sessionHallRows, (id) =>
            id === "devfest-2026-javed-surprise" ? "green" : undefined,
          )
        ) : (
          <p className="audience-body">{copy.emptyText}</p>
        )}
      </section>
    ),
    "hall-1": (
      <section id="workshops" className={styles.group} aria-labelledby="agenda-hall-1">
        <header className={styles.groupHeading}>
          <h2 id="agenda-hall-1">Orbit Lab (Hall 1)</h2>
          <p>{copy.workshopLead}</p>
        </header>
        {hall1Rows.length ? (
          renderRows(hall1Rows)
        ) : (
          <p className="audience-body">{copy.workshopsEmpty}</p>
        )}
      </section>
    ),
    "hall-2": (
      <section id="hall-2" className={styles.group} aria-labelledby="agenda-hall-2">
        <header className={styles.groupHeading}>
          <h2 id="agenda-hall-2">Launch Lab (Hall 2)</h2>
          <p>{copy.workshopLead}</p>
        </header>
        {hall2Rows.length ? (
          renderRows(hall2Rows)
        ) : (
          <p className="audience-body">{copy.workshopsEmpty}</p>
        )}
      </section>
    ),
    exhibits: (
      <section id="exhibits" className={styles.group} aria-labelledby="agenda-exhibits">
        <header className={styles.groupHeading}>
          <h2 id="agenda-exhibits">Exhibitors</h2>
          <p>Exhibit Lounge · Open through the day</p>
        </header>
        {exhibits.length ? (
          <ExhibitList items={exhibits} />
        ) : (
          <p className="audience-body">{copy.exhibitsEmpty}</p>
        )}
      </section>
    ),
    activities: (
      <section id="activities" className={styles.group} aria-labelledby="agenda-activities">
        <header className={styles.groupHeading}>
          <h2 id="agenda-activities">{copy.sections.activities}</h2>
          <p>Lounges, lunch and event-day experiences</p>
        </header>
        <ActivityCards />
      </section>
    ),
  };

  return (
    <AgendaTabs tabs={tabs} itemTabMap={itemTabMap} salmanSetup={salmanSetup} panels={panels} />
  );
}
