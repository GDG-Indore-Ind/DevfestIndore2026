import PageSectionNavigation from "@/components/shared/PageSectionNavigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommunityPage from "@/components/layout/CommunityPage";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import EditionPartners from "@/components/archive/EditionPartners";
import EditionSpeakers from "@/components/archive/EditionSpeakers";
import EditionLinks from "@/components/archive/EditionLinks";
import EditionStats from "@/components/archive/EditionStats";
import PhotoGallery from "@/components/archive/PhotoGallery";
import PressClippings from "@/components/archive/PressClippings";
import { ARCHIVED_EVENTS } from "@/content/archive";
import { getEdition } from "@/content/editions";
import { ARCHIVE_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/archive/Archive.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCHIVED_EVENTS.map((event) => ({ edition: event.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }) {
  const edition = getEdition((await params).edition);
  if (!edition) return {};
  const { event } = edition;
  return pageMetadata(
    `/archive/${event.id}`,
    `${event.title} archive`,
    `${event.displayDate}, ${event.venue}. ${event.summary}`,
  );
}

export default async function EditionPage({ params }: { params: Promise<{ edition: string }> }) {
  const edition = getEdition((await params).edition);
  if (!edition) notFound();
  const { event, speakers, photos, press, partners, others } = edition;
  const sections = [
    { id: "speakers", title: page.speakersTitle, shown: speakers.length > 0 },
    { id: "photos", title: page.photosTitle, shown: photos.length > 0 },
    { id: "press", title: page.pressTitle, shown: press.length > 0 },
    { id: "partners", title: page.partnersTitle, shown: partners.length > 0 },
  ].filter((section) => section.shown);
  return (
    <CommunityPage
      flightStops={[
        { id: "page-overview", label: "Overview" },
        ...sections.map(({ id, title }) => ({ id, label: title })),
      ]}
      compact
      motif="events"
      title={event.title}
      lead={`${event.displayDate} · ${event.venue}`}
      trail={
        <Breadcrumbs
          items={[{ label: page.navigationLabel, href: "/archive" }, { label: event.title }]}
        />
      }
    >
      <PageSectionNavigation label={event.title}>
        <Link href="/archive#editions">{page.editionBackLabel}</Link>
        {sections.map(({ id, title }) => (
          <a key={id} href={`#${id}`}>
            {title}
          </a>
        ))}
      </PageSectionNavigation>
      <section className={styles.section} aria-label={event.title}>
        <div className={styles.overview}>
          {event.theme && (
            <p className="audience-caption">
              {page.themeLabel}: {event.theme}
            </p>
          )}
          <p className="audience-body">{event.summary}</p>
          {event.stats && <EditionStats stats={event.stats} />}
          <EditionLinks event={event} />
        </div>
      </section>
      {speakers.length > 0 && (
        <section className={styles.section} id="speakers" aria-labelledby="speakers-title">
          <h2 id="speakers-title">{page.speakersTitle}</h2>
          <EditionSpeakers eventId={event.id} />
        </section>
      )}
      {photos.length > 0 && (
        <section className={styles.section} id="photos" aria-labelledby="photos-title">
          <h2 id="photos-title">{page.photosTitle}</h2>
          <PhotoGallery eventId={event.id} />
        </section>
      )}
      {press.length > 0 && (
        <section className={styles.section} id="press" aria-labelledby="press-title">
          <h2 id="press-title">{page.pressTitle}</h2>
          <PressClippings eventId={event.id} showLead={false} />
        </section>
      )}
      {partners.length > 0 && (
        <section className={styles.section} id="partners" aria-labelledby="partners-title">
          <h2 id="partners-title">{page.partnersTitle}</h2>
          <EditionPartners eventId={event.id} />
        </section>
      )}
      <section className={styles.section} aria-labelledby="other-editions-title">
        <h2 id="other-editions-title">{page.otherEditionsTitle}</h2>
        <ul className={styles.otherEditions}>
          {others.map((item) => (
            <li key={item.id}>
              <Link href={`/archive/${item.id}`}>{item.title}</Link>
              <span className="audience-caption">{item.displayDate}</span>
            </li>
          ))}
        </ul>
      </section>
    </CommunityPage>
  );
}
