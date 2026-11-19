import { TEAM, TEAM_PAGE } from "@/content/team";
import CommunityPage from "@/components/layout/CommunityPage";
import PersonRoster from "@/components/shared/PersonRoster";
import SectionHeader from "@/components/shared/SectionHeader";
import styles from "./TeamPage.module.css";

export default function TeamPage() {
  const groups = [
    {
      id: "organizers",
      title: TEAM_PAGE.organizersTitle,
      people: TEAM.filter(({ team }) => team === "Core Team"),
    },
    {
      id: "volunteers",
      title: TEAM_PAGE.volunteersTitle,
      people: TEAM.filter(({ team }) => team === "Volunteers"),
    },
  ];

  return (
    <CommunityPage compact motif="people" title={TEAM_PAGE.title} lead={TEAM_PAGE.lead}>
      {groups
        .filter(({ people }) => people.length > 0)
        .map(({ id, title, people }) => (
          <section key={id} className={styles.group} aria-labelledby={id}>
            <SectionHeader id={id} title={title} />
            <PersonRoster
              people={people.map((member) => ({
                id: member.personId,
                name: member.name,
                photo: member.avatar,
                meta: member.role.split(" · ", 1)[0],
                socials: member.socials,
                badge: member.badge,
                bio: member.bio,
                details: member.details,
              }))}
            />
          </section>
        ))}
    </CommunityPage>
  );
}
