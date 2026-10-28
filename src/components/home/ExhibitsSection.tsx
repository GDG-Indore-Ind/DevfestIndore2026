import { Bot, Braces, Monitor, Satellite, Sparkles } from "lucide-react";
import { EVENT } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";
import ContentAction from "@/components/shared/ContentAction";
import ContentIcon from "@/components/shared/ContentIcon";
import styles from "./ExhibitsSection.module.css";

export default function ExhibitsSection() {
  const copy = HOME_PAGE.exhibits;
  return (
    <section
      id="exhibits"
      className={`audience-section ${styles.root}`}
      aria-labelledby="exhibits-title"
    >
      <div className="audience-wrap">
        <div className={styles.panel}>
          <div className={styles.copy}>
            <p className="audience-overline">{copy.eyebrow}</p>
            <h2 id="exhibits-title">
              <ContentIcon name="exhibits" tone="green" heading />
              {copy.title}
            </h2>
            <p className={styles.body}>{copy.body}</p>
            <ContentAction
              href={EVENT.links.exhibitApplication}
              icon="exhibits"
              tone="green"
              external
            >
              {copy.buttonLabel}
            </ContentAction>
            <p className={styles.hint}>{copy.hint}</p>
          </div>
          <div className={styles.illustration}>
            <div className={styles.stage} aria-hidden="true">
              <span className={styles.orbit} />
              <span className={styles.screen}>
                <Monitor />
                <Braces className={styles.code} />
              </span>
              <span className={styles.robot}>
                <Bot />
              </span>
              <span className={styles.satellite}>
                <Satellite />
              </span>
              <Sparkles className={styles.spark} />
              <span className={styles.baseline} />
            </div>
            <p>{copy.mixLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
