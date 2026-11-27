import Link from "next/link";
import { AGENDA_ITEMS, AGENDA_SECTIONS, type AgendaItem } from "@/content/agenda";
import { EVENT } from "@/content/event";
import { AGENDA_PAGE as copy, HOME_PAGE } from "@/content/pages";
import ContentAction from "@/components/shared/ContentAction";
import ActivityCards from "./ActivityCards";
import AgendaDeepLink from "./AgendaDeepLink";
import AgendaSession from "./AgendaSession";
import ExhibitList from "./ExhibitList";
import styles from "./AgendaBoard.module.css";

function WorkshopStages({ items }: { items: AgendaItem[] }) {
  const matchedIds = new Set<string>();
  const stageGroups = copy.stages
    .filter((stage) => stage.hall !== "Sessions" && stage.hall !== "Exhibit Lounge")
    .map((stage) => {
      const stageItems = items.filter((item) => item.hall === stage.hall);
      stageItems.forEach((item) => matchedIds.add(item.id));
      return { stage, items: stageItems };
    })
    .filter((group) => group.items.length > 0);
  const ungrouped = items.filter((item) => !matchedIds.has(item.id));

  if (!stageGroups.length) {
    return (
      <ul className={styles.list}>
        {items.map((item) => (
          <AgendaSession key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.stages}>
      {stageGroups.map(({ stage, items: stageItems }) => (
        <section key={stage.hall} className={styles.stage} aria-label={stage.title}>
          <header className={styles.stageHeading}>
            <h3>{stage.title}</h3>
            {stage.lead && <p>{stage.lead}</p>}
          </header>
          <ul className={styles.list}>
            {stageItems.map((item) => (
              <AgendaSession key={item.id} item={item} showHall={false} />
            ))}
          </ul>
        </section>
      ))}
      {ungrouped.length > 0 && (
        <section className={styles.stage} aria-label={copy.otherGroupTitle}>
          <header className={styles.stageHeading}>
            <h3>{copy.otherGroupTitle}</h3>
          </header>
          <ul className={styles.list}>
            {ungrouped.map((item) => (
              <AgendaSession key={item.id} item={item} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function AgendaBoard() {
  const itemsBySection = {
    sessions: AGENDA_ITEMS.filter(
      (item) => item.format !== "workshop" && item.format !== "exhibit",
    ),
    workshops: AGENDA_ITEMS.filter((item) => item.format === "workshop"),
    exhibits: AGENDA_ITEMS.filter((item) => item.format === "exhibit"),
  };
  const emptyLabels = {
    sessions: copy.emptyText,
    workshops: copy.workshopsEmpty,
    exhibits: copy.exhibitsEmpty,
  };
  const invite = HOME_PAGE.exhibits;

  return (
    <div className={styles.board}>
      <AgendaDeepLink />
      {AGENDA_SECTIONS.map(({ id, title }) => (
        <section key={id} id={id} className={styles.group} aria-labelledby={`agenda-${id}`}>
          <header className={styles.groupHeading}>
            <h2 id={`agenda-${id}`}>{title}</h2>
            {id === "workshops" && <p>{copy.workshopLead}</p>}
          </header>
          {id === "activities" ? (
            <ActivityCards />
          ) : itemsBySection[id].length ? (
            id === "workshops" ? (
              <WorkshopStages items={itemsBySection.workshops} />
            ) : id === "exhibits" ? (
              <ExhibitList items={itemsBySection.exhibits} />
            ) : (
              <ul className={styles.list}>
                {itemsBySection[id].map((item) => (
                  <AgendaSession key={item.id} item={item} />
                ))}
              </ul>
            )
          ) : (
            <p className="audience-body">{emptyLabels[id]}</p>
          )}
          {id === "workshops" && (
            <Link href="/archive#workshops" className={styles.pastWorkshops}>
              {copy.pastWorkshopsLabel}
            </Link>
          )}
          {id === "exhibits" && (
            <div className={styles.invite}>
              <h3>{invite.title}</h3>
              <p>{invite.body}</p>
              <ContentAction
                href={EVENT.links.exhibitApplication}
                icon="exhibits"
                tone="green"
                external
              >
                {invite.buttonLabel}
              </ContentAction>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
