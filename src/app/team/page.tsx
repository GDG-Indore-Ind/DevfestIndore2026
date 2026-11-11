import TeamPage from "@/components/team/TeamPage";
import { TEAM_PAGE } from "@/content/team";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/team", TEAM_PAGE.title, TEAM_PAGE.lead);
export default function Team() {
  return <TeamPage />;
}
