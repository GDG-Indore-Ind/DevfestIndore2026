import PageSectionNavigation from "@/components/shared/PageSectionNavigation";
import CommunityPage from "@/components/layout/CommunityPage";
import ArchiveEditions from "@/components/archive/ArchiveEditions";
import PhotoGallery from "@/components/archive/PhotoGallery";
import PressClippings from "@/components/archive/PressClippings";
import CampusWorkshops from "@/components/archive/CampusWorkshops";
import CommunityEvents from "@/components/archive/CommunityEvents";
import { ARCHIVE_PAGE as page, WORKSHOPS_PAGE as workshops } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/archive/Archive.module.css";

export const metadata = pageMetadata("/archive", page.title, page.description);

const sections = [
  { id: "editions", title: page.editionsTitle },
  { id: "workshops", title: workshops.workshopTitle },
  { id: "community-events", title: workshops.communityTitle },
  { id: "photos", title: page.photosTitle },
  { id: "press", title: page.pressTitle },
] as const;

export default function ArchivePage() {
  return (
    <CommunityPage
      flightStops={[
        { id: "page-overview", label: "Overview" },
        ...sections.map(({ id, title }) => ({ id, label: title })),
      ]}
      compact
      motif="events"
      title={page.title}
      lead={page.lead}
    >
      <PageSectionNavigation label={page.title}>
        {sections.map(({ id, title }) => (
          <a key={id} href={`#${id}`}>
            {title}
          </a>
        ))}
      </PageSectionNavigation>
      <section className={styles.section} id="editions" aria-labelledby="editions-title">
        <h2 id="editions-title">{page.editionsTitle}</h2>
        <ArchiveEditions />
      </section>
      <section className={styles.section} id="workshops" aria-labelledby="workshops-title">
        <h2 id="workshops-title">{workshops.workshopTitle}</h2>
        <CampusWorkshops />
      </section>
      <section
        className={styles.section}
        id="community-events"
        aria-labelledby="community-events-title"
      >
        <h2 id="community-events-title">{workshops.communityTitle}</h2>
        <CommunityEvents />
      </section>
      <section className={styles.section} id="photos" aria-labelledby="photos-title">
        <h2 id="photos-title">{page.photosTitle}</h2>
        <PhotoGallery limit={4} />
        <details>
          <summary>See all photos</summary>
          <PhotoGallery offset={4} />
        </details>
      </section>
      <section className={styles.section} id="press" aria-labelledby="press-title">
        <h2 id="press-title">{page.pressTitle}</h2>
        <PressClippings limit={3} />
        <details>
          <summary>See all press clippings</summary>
          <PressClippings offset={3} showLead={false} />
        </details>
      </section>
    </CommunityPage>
  );
}
