import { notFound } from "next/navigation";
import CommunityPage from "@/components/layout/CommunityPage";
import TalkDirectory from "@/components/directory/TalkDirectory";
import ReviewNotice from "@/components/directory/ReviewNotice";
import { DIRECTORY_COPY, getTalks, APPROVED_PERSON_IDS } from "@/content/directory";
import { DIRECTORY_ACTIVE, DIRECTORY_REVIEW } from "@/lib/directoryAccess";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "/talks",
  DIRECTORY_COPY.talks.title,
  DIRECTORY_COPY.talks.lead,
);
export default function TalksPage() {
  if (!DIRECTORY_ACTIVE) notFound();
  return (
    <>
      <ReviewNotice />
      <CommunityPage compact title={DIRECTORY_COPY.talks.title} lead={DIRECTORY_COPY.talks.lead}>
        <TalkDirectory
          talks={getTalks()}
          approvedPeople={APPROVED_PERSON_IDS}
          preview={DIRECTORY_REVIEW}
        />
      </CommunityPage>
    </>
  );
}
