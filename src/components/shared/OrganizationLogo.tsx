import Image from "next/image";
import { useId } from "react";
import { ARCHIVE_LOGO_SHEET } from "@/content/partners";
import type { Organization } from "@/content/model";

type LogoOrganization = Pick<
  Organization,
  "id" | "name" | "logoUrl" | "archiveLogoWindow" | "logoShape"
>;

/** Reuse the supplied historical artwork; never infer a current partnership. */
export default function OrganizationLogo({ organization }: { organization: LogoOrganization }) {
  const clipId = useId();
  const window = organization.archiveLogoWindow;
  if (window)
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
      sizes={isSquare ? "(max-width: 760px) 72px, 96px" : "(max-width: 760px) 130px, 180px"}
      data-organization={organization.id}
    />
  ) : (
    <span>{organization.name}</span>
  );
}
