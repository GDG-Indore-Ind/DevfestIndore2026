import type { ReactNode } from "react";
import StrongText from "./StrongText";
import styles from "./NumberedSteps.module.css";

export default function NumberedSteps({
  steps,
  lastAction,
}: {
  steps: readonly { title: string; text: string }[];
  lastAction?: ReactNode;
}) {
  return (
    <ol className={styles.steps} role="list">
      {steps.map(({ title, text }, index) => (
        <li key={title}>
          <span className={styles.number} aria-hidden="true">
            {index + 1}
          </span>
          <div className={styles.copy}>
            <h3>{title}</h3>
            <p>
              <StrongText text={text} />
            </p>
            {index === steps.length - 1 && lastAction}
          </div>
        </li>
      ))}
    </ol>
  );
}
