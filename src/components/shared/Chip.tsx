import type { ReactNode } from "react";
import styles from "./Chip.module.css";

export type ChipTone = "blue" | "green" | "yellow" | "red" | "neutral";

/** A small tonal label. The text always carries the meaning; colour only reinforces it. */
export default function Chip({
  tone = "neutral",
  children,
}: {
  tone?: ChipTone;
  children: ReactNode;
}) {
  return <span className={`${styles.chip} ${styles[tone]}`}>{children}</span>;
}
