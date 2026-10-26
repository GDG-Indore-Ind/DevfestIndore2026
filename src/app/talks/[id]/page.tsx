import { notFound } from "next/navigation";
import Link from "next/link";
import CommunityPage from "@/components/layout/CommunityPage";
import ExternalLink from "@/components/shared/ExternalLink";
import ReviewNotice from "@/components/directory/ReviewNotice";
import { DIRECTORY_COPY as copy, getTalks } from "@/content/directory";
import {
  DIRECTORY_ACTIVE,
  DIRECTORY_REVIEW,
  canViewPerson,
  canViewTalk,
} from "@/lib/directoryAccess";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/directory/Directory.module.css";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return getTalks("all")
    .filter((talk) => canViewTalk(talk.speakerIds))
    .map((talk) => ({ id: talk.id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const talk = getTalks("all").find((item) => item.id === id);
  if (!talk || !canViewTalk(talk.speakerIds)) notFound();
  return {
    ...pageMetadata(`/talks/${id}`, talk.title, talk.description || talk.event.title),
    ...(DIRECTORY_REVIEW ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function TalkPage({ params }: Props) {
  const { id } = await params;
  const talk = getTalks("all").find((item) => item.id === id);
  if (!talk || !canViewTalk(talk.speakerIds)) notFound();
  return (
    <>
      <ReviewNotice />
      <CommunityPage
        compact
        title={talk.title}
        lead={`${talk.event.title} · ${talk.track || talk.category}`}
      >
        <div className={styles.profile}>
          <p>
            {new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(talk.event.date))}{" "}
            · {talk.event.venue}
          </p>
          {talk.description && (
            <section>
              <p>{talk.description}</p>
            </section>
          )}
          <section>
            <h2>{copy.talks.speakersLabel}</h2>
            <div className={styles.links}>
              {talk.speakers.map((person) =>
                canViewPerson(person.id) ? (
                  <Link href={`/people/${person.id}`} key={person.id}>
                    {person.name}
                  </Link>
                ) : (
                  <span key={person.id}>{person.name}</span>
                ),
              )}
            </div>
            {talk.speakers.length === 1 && (
              <p>
                {[talk.role, talk.company].filter((value) => value && value !== "-").join(" · ")}
              </p>
            )}
          </section>
          {!!talk.resources?.length && (
            <section>
              <h2>{copy.talks.resourcesLabel}</h2>
              <div className={styles.links}>
                {talk.resources.map((resource) => (
                  <ExternalLink key={resource.url} href={resource.url}>
                    {resource.label}
                  </ExternalLink>
                ))}
              </div>
            </section>
          )}
          <div className={styles.links}>
            {DIRECTORY_ACTIVE && (
              <Link href={`/talks?year=${talk.event.year}`}>{copy.profile.backTalks}</Link>
            )}
            {talk.event.kind === "DevFest" ? (
              <Link href={`/past-events/${talk.editionId}`}>{talk.event.title}</Link>
            ) : (
              <ExternalLink href={talk.sourceUrl || talk.event.source}>
                {talk.event.title}
              </ExternalLink>
            )}
          </div>
        </div>
      </CommunityPage>
    </>
  );
}
