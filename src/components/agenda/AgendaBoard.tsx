import type { AgendaStage } from "@/content/agenda";
import AgendaSession from "./AgendaSession";
import styles from "./AgendaBoard.module.css";

const isWorkshopHall = (stage: AgendaStage) =>
  stage.items.length > 0 && stage.items.every((item) => item.format === "workshop");

function Stage({ stage, compact = false }: { stage: AgendaStage; compact?: boolean }) {
  return (
    <section id={stage.id} className={styles.group} aria-labelledby={`stage-${stage.id}`}>
      <header className={styles.groupHeading}>
        <h2 id={`stage-${stage.id}`}>{stage.title}</h2>
        {stage.lead && <p>{stage.lead}</p>}
      </header>
      <ol className={styles.list}>
        {stage.items.map((item, index) => (
          <AgendaSession
            key={item.id}
            item={item}
            position={stage.numbered ? index + 1 : undefined}
            showHall={false}
            compact={compact}
          />
        ))}
      </ol>
    </section>
  );
}

/** The day by hall: the main stage in running order, workshop halls side by side when there are two. */
export default function AgendaBoard({ stages }: { stages: AgendaStage[] }) {
  const halls = stages.filter(isWorkshopHall);
  const paired = halls.length > 1;
  return (
    <div className={styles.board}>
      {stages.map((stage) => {
        if (paired && stage === halls[0])
          return (
            <div key="halls" id="workshops" className={styles.pair}>
              {halls.map((hall) => (
                <Stage key={hall.id} stage={hall} compact />
              ))}
            </div>
          );
        if (paired && halls.includes(stage)) return null;
        return <Stage key={stage.id} stage={stage} />;
      })}
    </div>
  );
}
