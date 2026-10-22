import type { Metadata } from "next";
import PastOrganizations from "@/components/PastOrganizations";
import CommunityPage from "@/components/CommunityPage";
import ArchiveNav from "@/components/ArchiveNav";
export const metadata: Metadata = { title: "Past sponsors", description: "Organizations from the DevFest Indore sponsor archive. Historical support is kept separate from current event partners." };
export default function PastSponsorsPage() {
  return <CommunityPage compact motif="partners" title="Past sponsors" lead="Supporters of earlier DevFest editions." flightStops={[{ id: "page-overview", label: "Overview" }, { id: "page-directory", label: "Sponsors" }, { id: "past-event-partners", label: "Communities" }]}>
    <ArchiveNav current="/past-sponsors" /><PastOrganizations />
  </CommunityPage>;
}
