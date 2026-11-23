import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentAction from "@/components/shared/ContentAction";
import ExternalLink from "@/components/shared/ExternalLink";
import { LinkedOrganizationLogo } from "@/components/shared/OrganizationLogo";
import { AGENDA_ITEMS } from "@/content/agenda";
import { PARTNER_PROFILE_LINKS } from "@/content/copy";
import { getCommunityUrl, PARTNER_PROFILES, partnerProfileHref } from "@/content/partners";
import { getOrganizationActivities } from "@/content/speakers";
import { WORKSHOPS } from "@/content/workshops";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PARTNER_PROFILES.map(({ organizationId }) => ({ slug: organizationId }));
}

async function getProfile(params: Props["params"]) {
  const { slug } = await params;
  const profile = PARTNER_PROFILES.find((item) => item.organizationId === slug);
  if (!profile) notFound();
  return profile;
}

export async function generateMetadata({ params }: Props) {
  const profile = await getProfile(params);
  return pageMetadata(
    partnerProfileHref(profile.organizationId),
    profile.name,
    profile.description ?? profile.role,
  );
}

function getInvolvement(organizationId: string) {
  const activities = getOrganizationActivities(organizationId).map(({ id, title }) => ({
    href: `/agenda#${id}`,
    label: title,
  }));

  if (organizationId === "space-club-of-india") {
    const keynote = AGENDA_ITEMS.find(
      ({ format, people }) =>
        format === "keynote" && people.some(({ id }) => id === "lt-gen-pjs-pannu"),
    );
    if (keynote) {
      activities.unshift({
        href: `/agenda#${keynote.id}`,
        label: "Keynote by Space Club founder Lt Gen PJS Pannu",
      });
    }
  }

  if (organizationId === "indore-institute-of-science-and-technology") {
    const campusWorkshop = WORKSHOPS.find(({ id }) => id === "campus-iist-2026");
    if (campusWorkshop) {
      activities.push({
        href: `/archive#${campusWorkshop.id}`,
        label: `Pre-DevFest campus workshop: ${campusWorkshop.topic}`,
      });
    }
  }

  return activities;
}

export default async function PartnerOrganization({ params }: Props) {
  const profile = await getProfile(params);
  const primaryUrl = getCommunityUrl(profile);
  const socialLinks = [
    ...(profile.socialUrl && profile.socialUrl !== primaryUrl
      ? [
          {
            href: profile.socialUrl,
            label:
              profile.organizationId === "thm-indore"
                ? "LinkedIn · Indore Chapter"
                : "Official social profile",
          },
        ]
      : []),
    ...(PARTNER_PROFILE_LINKS[profile.organizationId] ?? []),
  ];
  const involvement = getInvolvement(profile.organizationId);
  const position = PARTNER_PROFILES.indexOf(profile);
  const previous = PARTNER_PROFILES[position - 1];
  const next = PARTNER_PROFILES[position + 1];

  return (
    <div className="audience-site space-subpage practical-page">
      <Navbar />
      <main id="main-content">
        <section className={`audience-wrap ${styles.profile}`} aria-labelledby="partner-name">
          <nav className={styles.navigation} aria-label="Partner organizations">
            <Link href="/partners" aria-label="All partners" title="All partners">
              <List aria-hidden="true" />
            </Link>
            <div className={styles.pager}>
              {previous && (
                <Link
                  href={partnerProfileHref(previous.organizationId)}
                  rel="prev"
                  aria-label={`Previous partner: ${previous.name}`}
                  title={previous.name}
                >
                  <ArrowLeft aria-hidden="true" />
                </Link>
              )}
              {next && (
                <Link
                  href={partnerProfileHref(next.organizationId)}
                  rel="next"
                  aria-label={`Next partner: ${next.name}`}
                  title={next.name}
                >
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </nav>
          <div className={styles.identity}>
            <LinkedOrganizationLogo
              organization={profile}
              href={primaryUrl}
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1224px) 46vw, 520px"
              className={styles.plate}
            />
            <div>
              <h1 id="partner-name">{profile.name}</h1>
              <p className={styles.role}>{profile.role}</p>
              {primaryUrl && (
                <div className={styles.primaryAction}>
                  <ContentAction
                    href={primaryUrl}
                    icon={profile.websiteUrl ? "partners" : "people"}
                    external
                  >
                    {profile.websiteUrl ? "Official website" : "Official social profile"}
                  </ContentAction>
                </div>
              )}
            </div>
          </div>
          <div className={styles.details}>
            <div>
              {profile.description && <p className={styles.description}>{profile.description}</p>}
              {socialLinks.length > 0 && (
                <ul className={styles.links} aria-label="Organization links">
                  {socialLinks.map(({ label, href }) => (
                    <li key={href}>
                      <ExternalLink className="audience-text-link" href={href}>
                        {label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {involvement.length > 0 && (
              <section className={styles.involvement} aria-labelledby="partner-involvement">
                <h2 id="partner-involvement">At DevFest Indore</h2>
                <ul>
                  {involvement.map(({ href, label }) => (
                    <li key={href}>
                      <Link className="audience-text-link" href={href}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
