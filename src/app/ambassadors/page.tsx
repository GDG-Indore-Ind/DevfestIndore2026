import CommunityPage from "@/components/layout/CommunityPage";
import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import NumberedSteps from "@/components/shared/NumberedSteps";
import PersonRoster from "@/components/shared/PersonRoster";
import PageSectionNavigation from "@/components/shared/PageSectionNavigation";
import { TICKET_REGISTRATION_ENABLED } from "@/content/booking";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import AmbassadorSearch from "./AmbassadorSearch";
import styles from "./page.module.css";

export const metadata = pageMetadata("/ambassadors", page.title, page.description);

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
    },
  }));
  const professionals = ambassadors.filter(({ track }) => track === "professional");
  const students = ambassadors.filter(({ track }) => track === "student");

  return (
    <CommunityPage compact motif="people" title={page.title} lead={page.lead}>
      <PageSectionNavigation label="Ambassador directory">
        <a href="#ambassador-steps">{page.stepsTitle}</a>
        <a href="#ambassador-directory-title">{page.directoryTitle}</a>
        {professionals.length > 0 && (
          <a href="#professional-contact-title">{page.professionalNavLabel}</a>
        )}
      </PageSectionNavigation>
      <section
        id="ambassador-steps"
        className={styles.block}
        aria-labelledby="ambassador-steps-title"
      >
        <SectionHeader id="ambassador-steps-title" title={page.stepsTitle} />
        <NumberedSteps
          steps={page.steps}
          lastAction={
            TICKET_REGISTRATION_ENABLED && (
              <ContentAction href="/tickets#registration" icon="tickets">
                {page.ticketsLabel}
              </ContentAction>
            )
          }
        />
      </section>
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
