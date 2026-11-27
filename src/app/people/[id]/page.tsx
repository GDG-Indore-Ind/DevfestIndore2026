import Link from "next/link";
import { redirect } from "next/navigation";
import CommunityPage from "@/components/layout/CommunityPage";
import CommunityPhoto from "@/components/shared/CommunityPhoto";
import ProfileLinks from "@/components/shared/ProfileLinks";
import { AGENDA_ITEMS } from "@/content/agenda";
import { AMBASSADOR_DIRECTORY } from "@/content/ambassadors";
import { EVENT } from "@/content/event";
import { getEventPerson, personalSocials } from "@/content/people";
import { TEAM } from "@/content/team";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  const ids = new Set([
    ...TEAM.map(({ personId }) => personId),
    ...AMBASSADOR_DIRECTORY.map(({ personId }) => personId),
    ...AGENDA_ITEMS.flatMap(({ people }) => people.map(({ id }) => id)),
  ]);
  return [...ids].map((id) => ({ id }));
}

function getProfile(id: string) {
  const member = TEAM.find(({ personId }) => personId === id);
  const ambassador = AMBASSADOR_DIRECTORY.find(({ personId }) => personId === id);
  const appearances = AGENDA_ITEMS.filter(({ people }) =>
    people.some((person) => person.id === id),
  );
  const speaker = appearances[0]?.people.find((person) => person.id === id);
  if (!member && !ambassador && !speaker) return undefined;
  const person = getEventPerson(id, EVENT.id);
  return {
    member,
    ambassador,
    appearances,
    speaker,
    person: speaker
      ? { ...person, ...speaker, socials: { ...person.socials, ...speaker.socials } }
      : person,
  };
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const profile = getProfile(id);
  if (!profile) return {};
  const { person, member, ambassador, speaker } = profile;
  const role = member?.role || (speaker && "Speaker") || ambassador?.community;
  const metadata = pageMetadata(`/people/${id}`, person.name, `${role} · ${EVENT.name}`);
  if (!person.avatar) return metadata;
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images: [{ url: person.avatar, alt: person.name }] },
    twitter: { ...metadata.twitter, card: "summary" as const, images: [person.avatar] },
  };
}

export default async function PersonProfile({ params }: Props) {
  const profile = getProfile((await params).id);
  if (!profile) redirect("/team");
  const { person, member, ambassador, speaker, appearances } = profile;
  const socials = member || speaker ? personalSocials(person.socials) : ambassador?.socials;
  const details = (member?.details ?? ambassador?.details ?? []).filter(
    ({ label }) =>
      label !== "Functions" &&
      label !== "Track" &&
      (label !== "Also this year" || !member || !ambassador),
  );
  const functions =
    member?.details?.find(({ label }) => label === "Functions")?.items ?? member?.role.split(" · ");

  return (
    <CommunityPage
      compact
      title={person.name}
      lead={EVENT.name}
      trail={
        <nav aria-label="People directories" className={styles.links}>
          {speaker && (
            <Link href="/agenda" className="audience-text-link">
              Back to agenda
            </Link>
          )}
          {member && (
            <Link href="/team" className="audience-text-link">
              Back to team
            </Link>
          )}
          {ambassador && (
            <Link href="/ambassadors" className="audience-text-link">
              Back to ambassadors
            </Link>
          )}
        </nav>
      }
    >
      <article className={styles.profile}>
        <CommunityPhoto
          src={person.avatar}
          alt=""
          initialsFor={person.name}
          portrait
          sizes="(max-width: 600px) 96px, 144px"
        />
        <div className={styles.body}>
          {speaker && (
            <section>
              <h2>Speaker</h2>
              {(speaker.role || speaker.company) && (
                <p>{[speaker.role, speaker.company].filter(Boolean).join(" · ")}</p>
              )}
              {appearances.some(({ title }) => title) && (
                <ul>
                  {appearances.map(
                    ({ id, title }) =>
                      title && (
                        <li key={id}>
                          <Link href={`/agenda#${id}`} className="audience-text-link">
                            {title}
                          </Link>
                        </li>
                      ),
                  )}
                </ul>
              )}
            </section>
          )}
          {member && (
            <section>
              <h2>
                {member.team === "Space Club of India"
                  ? "Space Club of India team"
                  : member.team === "Core Team"
                    ? "Organizer"
                    : "Volunteer"}
              </h2>
              <ul>
                {functions?.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </section>
          )}
          {ambassador && (
            <section>
              <h2>
                {ambassador.track === "student" ? "Student ambassador" : "Professional ambassador"}
              </h2>
              <p>{ambassador.community}</p>
            </section>
          )}
          {details.map(({ label, items }) => (
            <section key={label}>
              <h2>{label}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          {person.bio && <p className={styles.bio}>{person.bio}</p>}
          {socials && <ProfileLinks socials={socials} />}
        </div>
      </article>
    </CommunityPage>
  );
}
