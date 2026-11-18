import { TEAM, TEAM_PAGE } from "@/content/team";
import CommunityPage from "@/components/layout/CommunityPage";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import styles from "./TeamPage.module.css";

export default function TeamPage() {
  return (
    <CommunityPage compact title={TEAM_PAGE.title} lead={TEAM_PAGE.lead}>
      <ul className={styles.roster}>
        {TEAM.map((member) => (
          <li key={member.personId} className={styles.member}>
            <CommunityPhoto
              src={member.avatar}
              alt=""
              initialsFor={member.name}
              portrait
              sizes="44px"
            />
            <div className={styles.identity}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.role}>{member.role}</span>
            </div>
            <ProfileLinks
              socials={member.socials}
              name={member.name}
              iconOnly
              className={styles.socials}
            />
          </li>
        ))}
      </ul>
    </CommunityPage>
  );
}
