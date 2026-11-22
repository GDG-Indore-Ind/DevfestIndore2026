import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ContentAction from "@/components/shared/ContentAction";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import PageIntro from "@/components/shared/PageIntro";
import { PARTNER_PROFILE_LINKS } from "@/content/copy";
import { PARTNERS_PAGE, SPACE_CLUB_PAGE } from "@/content/pages";
import { PARTNER_PROFILES, partnerProfileHref } from "@/content/partners";
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

export default async function PartnerProfile({ params }: Props) {
  const profile = await getProfile(params);
  const path = partnerProfileHref(profile.organizationId);
  const links = PARTNER_PROFILE_LINKS[profile.organizationId] ?? [];
  const isSpaceClub = profile.organizationId === "space-club-of-india";

  return (
    <div className="audience-site space-subpage practical-page">
      <Navbar />
      <main id="main-content">
        <PageIntro
          title={profile.name}
          meta={profile.role}
          lead={profile.description ?? profile.role}
          trail={
            <Breadcrumbs
              items={[
                { label: PARTNERS_PAGE.sectionLabel, href: "/partners" },
                { label: profile.name, href: path },
              ]}
            />
          }
          art={
            <div className={styles.plate}>
              <OrganizationLogo organization={profile} sizes="(max-width: 400px) 80vw, 340px" />
            </div>
          }
        >
          {(profile.websiteUrl || profile.socialUrl || links.length > 0) && (
            <div className={styles.links}>
              {profile.websiteUrl && (
                <ContentAction href={profile.websiteUrl} icon="partners" external>
                  Official website
                </ContentAction>
              )}
              {profile.socialUrl && (
                <ContentAction href={profile.socialUrl} icon="people" external>
                  {profile.organizationId === "thm-indore"
                    ? "LinkedIn · Indore Chapter"
                    : "Official social profile"}
                </ContentAction>
              )}
              {links.map(({ label, href }) => (
                <ContentAction key={href} href={href} icon="people" external>
                  {label}
                </ContentAction>
              ))}
            </div>
          )}
        </PageIntro>
        {isSpaceClub && (
          <section className="audience-section" aria-labelledby="space-club-title">
            <div className="audience-wrap">
              <h2 id="space-club-title">{SPACE_CLUB_PAGE.heading}</h2>
              <p className="audience-body">{SPACE_CLUB_PAGE.body}</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
