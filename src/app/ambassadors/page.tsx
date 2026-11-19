import CommunityPage from "@/components/layout/CommunityPage";
import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import NumberedSteps from "@/components/shared/NumberedSteps";
import PersonRoster, { type RosterPerson } from "@/components/shared/PersonRoster";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

const ambassadorTints: Partial<Record<string, RosterPerson["highlight"]>> = {
  "chaitanya-swaroop-vishwakarma": "gold",
  "ishaan-agrawal": "silver",
  "madhav-ratnawat": "silver",
};

export const metadata = pageMetadata("/ambassadors", page.title, page.description);

export default function AmbassadorsPage() {
  const ambassadors = AMBASSADOR_DIRECTORY.map(
    ({ person, community, socials, details, track }) => ({
      track,
      profile: {
        id: person.id,
        name: person.name,
        photo: person.avatar,
        meta: community,
        socials,
        bio: person.bio,
        details,
        highlight: ambassadorTints[person.id],
      },
    }),
  );
  const professionals = ambassadors.filter(({ track }) => track === "professional");

  return (
    <CommunityPage compact motif="people" title={page.title} lead={page.lead}>
      {professionals.length > 0 && (
        <section className={styles.block} aria-labelledby="professional-contact-title">
          <SectionHeader id="professional-contact-title" title={page.professionalTitle} />
          <PersonRoster people={professionals.map(({ profile }) => profile)} />
        </section>
      )}
      <section className={styles.block} aria-labelledby="ambassador-directory-title">
        <SectionHeader
          id="ambassador-directory-title"
          title={page.directoryTitle}
          lead={page.directoryLead}
          action={
            <a className="audience-text-link" href="#ambassador-steps">
              {page.stepsTitle}
            </a>
          }
        />
        <PersonRoster
          people={ambassadors
            .filter(({ track }) => track === "student")
            .map(({ profile }) => profile)}
        />
      </section>
      <section
        id="ambassador-steps"
        className={styles.block}
        aria-labelledby="ambassador-steps-title"
      >
        <SectionHeader id="ambassador-steps-title" title={page.stepsTitle} />
        <NumberedSteps
          steps={page.steps}
          lastAction={
            <ContentAction href="/tickets" icon="tickets" tone="blue">
              {page.ticketsLabel}
            </ContentAction>
          }
        />
      </section>
    </CommunityPage>
  );
}
