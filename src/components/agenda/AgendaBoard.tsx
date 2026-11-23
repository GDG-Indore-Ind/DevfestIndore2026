import Link from "next/link";
import { AGENDA_ITEMS, AGENDA_SECTIONS } from "@/content/agenda";
import { EVENT } from "@/content/event";
import { AGENDA_PAGE as copy, HOME_PAGE } from "@/content/pages";
import ContentAction from "@/components/shared/ContentAction";
import ActivityCards from "./ActivityCards";
import AgendaDeepLink from "./AgendaDeepLink";
import AgendaSession from "./AgendaSession";
import styles from "./AgendaBoard.module.css";

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
            <ul className={styles.list}>
              {itemsBySection[id].map((item) => (
                <AgendaSession key={item.id} item={item} />
              ))}
            </ul>
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
