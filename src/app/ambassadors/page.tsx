import CommunityPage from "@/components/layout/CommunityPage";
import SectionHeader from "@/components/shared/SectionHeader";
import PersonRoster, { type RosterPerson } from "@/components/shared/PersonRoster";
import PageSectionNavigation from "@/components/shared/PageSectionNavigation";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import AmbassadorSearch from "./AmbassadorSearch";
import styles from "./page.module.css";

export const metadata = pageMetadata("/ambassadors", page.title, page.description);

const WINNER_IDS = ["chaitanya-swaroop-vishwakarma", "madhav-ratnawat", "ishaan-agrawal"] as const;

export default function AmbassadorsPage() {
  const ambassadors = AMBASSADOR_DIRECTORY.map(({ person, community, socials, track }) => ({
    track,
    profile: {
      id: person.id,
      name: person.name,
      photo: person.avatar,
      meta: community,
      socials,
      href: `/people/${person.id}`,
    } satisfies RosterPerson,
  }));

  const winners: RosterPerson[] = WINNER_IDS.flatMap((id) => {
    const match = ambassadors.find(({ profile }) => profile.id === id);
    return match ? [{ ...match.profile, badge: "Winner", highlight: "gold" }] : [];
  });
  const professionals = ambassadors.filter(({ track }) => track === "professional");
  const students = ambassadors.filter(({ track }) => track === "student");

  return (
    <CommunityPage compact motif="people" title={page.title} lead={page.lead}>
      <PageSectionNavigation label="Ambassador directory">
        {winners.length > 0 && <a href="#ambassador-winners">{page.winnersTitle}</a>}
        <a href="#ambassador-directory-title">{page.directoryTitle}</a>
        {professionals.length > 0 && (
          <a href="#professional-contact-title">{page.professionalNavLabel}</a>
        )}
      </PageSectionNavigation>
      {winners.length > 0 && (
        <section
          id="ambassador-winners"
          className={styles.block}
          aria-labelledby="ambassador-winners-title"
        >
          <SectionHeader
            id="ambassador-winners-title"
            title={page.winnersTitle}
            lead={page.winnersLead}
          />
          <PersonRoster people={winners} />
        </section>
      )}
      <section className={styles.block} aria-labelledby="ambassador-directory-title">
        <SectionHeader
          id="ambassador-directory-title"
          title={page.directoryTitle}
          lead={page.directoryLead}
        />
        <AmbassadorSearch people={students.map(({ profile }) => profile)} />
      </section>
      {professionals.length > 0 && (
        <section className={styles.block} aria-labelledby="professional-contact-title">
          <SectionHeader id="professional-contact-title" title={page.professionalTitle} />
          <PersonRoster people={professionals.map(({ profile }) => profile)} />
        </section>
      )}
    </CommunityPage>
  );
}
