import Image from "next/image";
import Link from "next/link";
import ContentAction from "@/components/shared/ContentAction";
import { PRESS_CLIPPINGS } from "@/content/gallery";
import { ARCHIVE_PAGE, HOME_PAGE } from "@/content/pages";
import styles from "./PressStrip.module.css";

const FEATURED_COUNT = 4;

export default function PressStrip() {
  const items = PRESS_CLIPPINGS.slice(0, FEATURED_COUNT);
  if (!items.length) return null;
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <h3 id="home-press-title">{ARCHIVE_PAGE.pressTitle}</h3>
        <ContentAction href="/archive#press" icon="history" tone="blue">
          {HOME_PAGE.pressLabel}
        </ContentAction>
      </div>
      <ul className={styles.list} aria-labelledby="home-press-title">
        {items.map((item) => (
          <li key={item.id}>
            <Link href="/archive#press" className={styles.card}>
              <span className={styles.thumb}>
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 620px) 85vw, (max-width: 980px) 45vw, 280px"
                />
              </span>
              <span className={styles.event}>{item.event}</span>
              <span className={styles.title}>{item.title}</span>
              {item.publication && <span className={styles.source}>{item.publication}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
