import { permanentRedirect } from "next/navigation";
import { DIRECTORY_ACTIVE } from "@/lib/directoryAccess";
import { pageMetadata } from "@/lib/pageMetadata";
import PastOrganizations from "@/components/home/PastOrganizations";
import CommunityPage from "@/components/layout/CommunityPage";
import ArchiveNav from "@/components/layout/ArchiveNav";
export const metadata = pageMetadata(
  "/past-sponsors",
  "Past sponsors",
  "Organizations from the DevFest Indore sponsor archive. Historical support is kept separate from current event partners.",
);
export default function PastSponsorsPage() {
  if (DIRECTORY_ACTIVE) permanentRedirect("/partners?year=all&type=sponsor");
  return (
    <CommunityPage
      compact
      motif="partners"
      title="Past sponsors"
      lead="Supporters of earlier DevFest editions."
      flightStops={[
        { id: "page-overview", label: "Overview" },
        { id: "page-directory", label: "Sponsors" },
        { id: "past-event-partners", label: "Communities" },
      ]}
    >
      <ArchiveNav current="/past-sponsors" />
      <PastOrganizations />
    </CommunityPage>
  );
}
