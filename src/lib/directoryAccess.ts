import "server-only";
import {
  APPROVED_PERSON_IDS,
  APPROVED_ORGANIZATION_IDS,
  DIRECTORY_ENABLED,
} from "@/content/directory";

// Review rendering is local-development only. It cannot enable production pages.
export const DIRECTORY_REVIEW =
  process.env.NODE_ENV === "development" && process.env.CONTENT_DIRECTORY_PREVIEW === "1";
export const DIRECTORY_ACTIVE = DIRECTORY_ENABLED || DIRECTORY_REVIEW;
export const canViewPerson = (id: string) => DIRECTORY_REVIEW || APPROVED_PERSON_IDS.includes(id);
export const canViewOrganization = (id: string) =>
  DIRECTORY_REVIEW || APPROVED_ORGANIZATION_IDS.includes(id);

export const canViewTalk = (speakerIds: readonly string[]) =>
  DIRECTORY_ACTIVE || speakerIds.every((id) => APPROVED_PERSON_IDS.includes(id));
