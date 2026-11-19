import type { Socials } from "@/content/model";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./PersonRoster.module.css";

export type RosterPerson = {
  id: string;
  name: string;
  photo?: string;
  /** One muted line under the name: a role, college or company. */
  meta: string;
  socials?: Socials;
};

/** Ruled list of people in two columns: round photo, name, one muted line and profile icons. */
export default function PersonRoster({ people }: { people: RosterPerson[] }) {
  return (
    <ul className={styles.roster}>
      {people.map((person) => (
        <li key={person.id} className={styles.member}>
          <CommunityPhoto
            src={person.photo}
            alt=""
            initialsFor={person.name}
            portrait
            sizes="44px"
          />
          <div className={styles.identity}>
            <span className={styles.name}>{person.name}</span>
            <span className={styles.role}>{person.meta}</span>
          </div>
          <ProfileLinks
            socials={person.socials}
            name={person.name}
            iconOnly
            className={styles.socials}
          />
        </li>
      ))}
    </ul>
  );
}
