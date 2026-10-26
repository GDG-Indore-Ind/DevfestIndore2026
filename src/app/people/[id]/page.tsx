import { notFound } from "next/navigation";
import Link from "next/link";
import CommunityPage from "@/components/layout/CommunityPage";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import ExternalLink from "@/components/shared/ExternalLink";
import ReviewNotice from "@/components/directory/ReviewNotice";
import { PEOPLE } from "@/content/people";
import { participationRoleLabels } from "@/content/participations";
import {
  DIRECTORY_COPY as copy,
  getPersonHistory,
  getPersonWorkshops,
  getTalks,
  getTeamDirectory,
  APPROVED_PERSON_IDS,
} from "@/content/directory";
import { canViewPerson, DIRECTORY_REVIEW, DIRECTORY_ACTIVE } from "@/lib/directoryAccess";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/directory/Directory.module.css";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return APPROVED_PERSON_IDS.map((id) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const person = PEOPLE.find((item) => item.id === id);
  if (!person || !canViewPerson(id)) notFound();
  return {
    ...pageMetadata(
      `/people/${id}`,
      person.name,
      person.bio || `Meet ${person.name} and explore their event contributions.`,
    ),
    ...(DIRECTORY_REVIEW ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function PersonPage({ params }: Props) {
  const { id } = await params;
  const person = PEOPLE.find((item) => item.id === id);
  if (!person || !canViewPerson(id)) notFound();
  const allHistory = getPersonHistory(id);
  const history = allHistory.filter((entry) => entry.event.kind === "DevFest");
  const communityHistory = allHistory.filter((entry) => entry.event.kind !== "DevFest");
  const legacy = getTeamDirectory().find((entry) => entry.person.id === id)?.legacy ?? [];
  const allTalks = getTalks("all").filter((talk) => talk.speakerIds.includes(id));
  const talks = allTalks.filter((talk) => talk.event.kind === "DevFest");
  const workshops = getPersonWorkshops(id);
  return (
    <>
      <ReviewNotice approved={APPROVED_PERSON_IDS.includes(id)} />
      <CommunityPage
        compact
        motif="people"
        title={person.name}
        lead={
          [person.role, person.company].filter(Boolean).join(" at ") || copy.profile.fallbackLead
        }
      >
        <div className={styles.profile}>
          {person.avatar && (
            <CommunityPhoto src={person.avatar} alt={person.name} portrait sizes="120px" />
          )}
          {person.bio && (
            <section>
              <h2>{copy.profile.aboutTitle}</h2>
              <p>{person.bio}</p>
            </section>
          )}
          {(history.length > 0 || legacy.length > 0) && (
            <section>
              <h2>{copy.profile.historyTitle}</h2>
              <ul>
                {legacy.map((entry) => (
                  <li key={entry.id}>
                    {entry.role}
                    {DIRECTORY_REVIEW && <> · {copy.team.undatedLabel}</>}
                  </li>
                ))}
                {history.map((entry) => (
                  <li key={entry.id}>
                    <strong>{entry.event.title}</strong>
                    <br />
                    {entry.roles.flatMap(participationRoleLabels).join(" · ")}
                    {entry.sourceUrl && (
                      <div className={styles.links}>
                        <ExternalLink href={entry.sourceUrl}>
                          {copy.profile.officialRecordLabel}
                        </ExternalLink>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {communityHistory.length > 0 && (
            <section>
              <h2>{copy.profile.communityTitle}</h2>
              <ul>
                {communityHistory.map((entry) => (
                  <li key={entry.id}>
                    <strong>{entry.event.title}</strong>
                    <br />
                    {entry.event.year} · {entry.roles.flatMap(participationRoleLabels).join(" · ")}
                    {allTalks
                      .filter((talk) => talk.editionId === entry.eventId)
                      .map((talk) => (
                        <div className={styles.links} key={talk.id}>
                          <Link href={`/talks/${talk.id}`}>{talk.title}</Link>
                        </div>
                      ))}
                    {entry.sourceUrl && (
                      <div className={styles.links}>
                        <ExternalLink href={entry.sourceUrl}>
                          {copy.profile.officialRecordLabel}
                        </ExternalLink>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {talks.length > 0 && (
            <section>
              <h2>{copy.profile.talksTitle}</h2>
              <ul>
                {talks.map((talk) => (
                  <li key={talk.id}>
                    <Link href={`/talks/${talk.id}`}>{talk.title}</Link>
                    <br />
                    {talk.event.title}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {workshops.length > 0 && (
            <section>
              <h2>{copy.profile.workshopsTitle}</h2>
              <ul>
                {workshops.map((workshop) => (
                  <li key={workshop.id}>
                    {workshop.eventUrl ? (
                      <ExternalLink href={workshop.eventUrl}>{workshop.college}</ExternalLink>
                    ) : (
                      workshop.college
                    )}
                    {workshop.date && <> · {workshop.date}</>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {person.socials && (
            <section>
              <h2>{copy.profile.linksTitle}</h2>
              <ProfileLinks socials={person.socials} />
            </section>
          )}
          <div className={styles.links}>
            <Link href="/team">{copy.profile.backTeam}</Link>
            {DIRECTORY_ACTIVE && <Link href="/talks">{copy.profile.backTalks}</Link>}
          </div>
        </div>
      </CommunityPage>
    </>
  );
}
