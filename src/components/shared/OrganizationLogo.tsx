import Image from "next/image";
import { useId } from "react";
import { ARCHIVE_LOGO_SHEET } from "@/content/partners";
import type { Organization } from "@/content/model";
import styles from "./OrganizationLogo.module.css";

type LogoOrganization = Pick<
  Organization,
  "id" | "name" | "logoUrl" | "archiveLogoWindow" | "logoShape"
>;

/** Prefer standalone vector artwork when a historical crop also exists. */
export default function OrganizationLogo({
  organization,
  sizes,
}: {
  organization: LogoOrganization;
  sizes?: string;
}) {
  const clipId = useId();
  if (organization.logoUrl === "/images/partners/space-club-lockup.svg") {
    return (
      <>
        <Image
          src={organization.logoUrl}
          alt=""
          width={1502}
          height={500}
          className={styles.light}
        />
        <Image
          src="/images/partners/space-club-lockup-white.svg"
          alt=""
          width={1530}
          height={528}
          className={styles.dark}
        />
      </>
    );
  }
  const window = organization.archiveLogoWindow;
  if (window && !organization.logoUrl.endsWith(".svg"))
    return (
      <svg
        viewBox={window.join(" ")}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={window[0]} y={window[1]} width={window[2]} height={window[3]} />
          </clipPath>
        </defs>
        <image href={ARCHIVE_LOGO_SHEET} width="1500" height="844" clipPath={`url(#${clipId})`} />
      </svg>
    );
  const isSquare = organization.logoShape === "square";
  return organization.logoUrl ? (
    <Image
      src={organization.logoUrl}
      alt=""
      width={isSquare ? 160 : 240}
      height={isSquare ? 160 : 120}
      sizes={sizes ?? (isSquare ? "104px" : "160px")}
      quality={100}
      data-organization={organization.id}
    />
  ) : (
    <span>{organization.name}</span>
  );
}
