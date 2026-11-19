import CommunityPage from "@/components/layout/CommunityPage";
import ContentAction from "@/components/shared/ContentAction";
import SectionHeader from "@/components/shared/SectionHeader";
import StrongText from "@/components/shared/StrongText";
import AmbassadorDirectory from "./AmbassadorDirectory";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

export const metadata = pageMetadata("/ambassadors", page.title, page.description);

export default function AmbassadorsPage() {
  return (
    <CommunityPage compact motif="people" title={page.title} lead={page.lead}>
      <section className={styles.block} aria-labelledby="ambassador-steps-title">
        <SectionHeader
          id="ambassador-steps-title"
          title={page.stepsTitle}
          action={
            <ContentAction href="/tickets" icon="tickets" tone="blue">
              {page.ticketsLabel}
            </ContentAction>
          }
        />
        <ol className={styles.steps}>
          {page.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>
                <StrongText text={step.text} />
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.block} aria-labelledby="ambassador-directory-title">
        <AmbassadorDirectory
          title={page.directoryTitle}
          lead={page.directoryLead}
          ambassadors={AMBASSADOR_DIRECTORY.map(({ person, community, socials }) => ({
            id: person.id,
            name: person.name,
            photo: person.avatar,
            meta: community,
            socials,
          }))}
          copy={{
            searchLabel: page.searchLabel,
            searchPlaceholder: page.searchPlaceholder,
            emptyTitle: page.emptyTitle,
            emptyText: page.emptyText,
            ambassadorSingular: page.ambassadorSingular,
            ambassadorPlural: page.ambassadorPlural,
          }}
        />
      </section>
    </CommunityPage>
  );
}
