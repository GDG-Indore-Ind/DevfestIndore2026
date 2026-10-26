import { notFound } from "next/navigation";
import Link from "next/link";
import CommunityPage from "@/components/layout/CommunityPage";
import OrganizationLogo from "@/components/shared/OrganizationLogo";
import ExternalLink from "@/components/shared/ExternalLink";
import ReviewNotice from "@/components/directory/ReviewNotice";
import {
  DIRECTORY_COPY as copy,
  getPublicOrganizations,
  APPROVED_ORGANIZATION_IDS,
} from "@/content/directory";
import { canViewOrganization, DIRECTORY_REVIEW } from "@/lib/directoryAccess";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "@/components/directory/Directory.module.css";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return getPublicOrganizations()
    .filter((organization) => APPROVED_ORGANIZATION_IDS.includes(organization.id))
    .map((organization) => ({ id: organization.id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const organization = getPublicOrganizations().find((item) => item.id === id);
  if (!organization || !canViewOrganization(id)) notFound();
  return {
    ...pageMetadata(
      `/organizations/${id}`,
      organization.name,
      organization.description || `Explore ${organization.name}'s documented contributions.`,
    ),
    ...(DIRECTORY_REVIEW ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function OrganizationPage({ params }: Props) {
  const { id } = await params;
  const organization = getPublicOrganizations().find((item) => item.id === id);
  if (!organization || !canViewOrganization(id)) notFound();
  return (
    <>
      <ReviewNotice approved={APPROVED_ORGANIZATION_IDS.includes(id)} />
      <CommunityPage
        compact
        motif="partners"
        title={organization.name}
        lead={organization.description || "Contributions across editions"}
      >
        <div className={styles.profile}>
          <div className={styles.logo}>
            <OrganizationLogo organization={organization} />
          </div>
          <section>
            <h2>{copy.profile.historyTitle}</h2>
            <ul>
              {organization.partnerships.map((entry) => (
                <li key={entry.id}>
                  <strong>
                    {entry.editionId === "historical"
                      ? copy.partners.unknownYearLabel
                      : entry.editionId === "ecosystem"
                        ? copy.partners.ecosystemLabel
                        : entry.editionId}
                  </strong>
                  <br />
                  {entry.contributions.map((item) => item.role).join(" · ")}
                  {entry.source && (
                    <div className={styles.links}>
                      <ExternalLink href={entry.source}>{copy.profile.sourceLabel}</ExternalLink>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
          <div className={styles.links}>
            {(organization.websiteUrl || organization.socialUrl) && (
              <ExternalLink href={organization.websiteUrl || organization.socialUrl}>
                Official profile
              </ExternalLink>
            )}
            <Link href="/partners">{copy.profile.backPartners}</Link>
          </div>
        </div>
      </CommunityPage>
    </>
  );
}
