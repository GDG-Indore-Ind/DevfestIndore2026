import type { Socials } from "@/content/model";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./SpeakerList.module.css";

export interface SpeakerListItem {
  id: string;
  name: string;
  talks: { id: string; title: string; year?: string }[];
  socials?: Socials;
}

/** One line per speaker: name, the talks they gave, and LinkedIn and website symbols. */
export default function SpeakerList({ items }: { items: SpeakerListItem[] }) {
  return (
    <ul className={styles.list}>
      {items.map(({ id, name, talks, socials }) => (
        <li key={id} className={styles.row}>
          <h3>{name}</h3>
          <ul className={styles.talks}>
            {talks.map((talk) => (
              <li key={talk.id}>
                {talk.title}
                {talk.year && <span className={styles.year}>{talk.year}</span>}
              </li>
            ))}
          </ul>
          <ProfileLinks
            socials={socials}
            name={name}
            iconOnly
            platforms={["linkedin", "website"]}
            className={styles.links}
          />
        </li>
      ))}
    </ul>
  );
}
