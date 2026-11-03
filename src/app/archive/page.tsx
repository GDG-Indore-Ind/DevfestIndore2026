import CommunityPage from "@/components/layout/CommunityPage";
import ArchiveEditions from "@/components/archive/ArchiveEditions";
import PhotoGallery from "@/components/archive/PhotoGallery";
import PressClippings from "@/components/archive/PressClippings";
import { ARCHIVE_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/archive/Archive.module.css";

export const metadata = pageMetadata("/archive", page.title, page.description);

const sections = [
  { id: "editions", title: page.editionsTitle },
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
      <nav className="archive-navigation" aria-label={page.title}>
        {sections.map(({ id, title }) => (
          <a key={id} href={`#${id}`}>
            {title}
          </a>
        ))}
      </nav>
      <section className={styles.section} id="editions" aria-labelledby="editions-title">
        <h2 id="editions-title">{page.editionsTitle}</h2>
        <ArchiveEditions />
      </section>
      <section className={styles.section} id="photos" aria-labelledby="photos-title">
        <h2 id="photos-title">{page.photosTitle}</h2>
        <PhotoGallery />
      </section>
      <section className={styles.section} id="press" aria-labelledby="press-title">
        <h2 id="press-title">{page.pressTitle}</h2>
        <PressClippings />
      </section>
    </CommunityPage>
  );
}
