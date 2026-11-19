import { TEAM, TEAM_PAGE } from "@/content/team";
import CommunityPage from "@/components/layout/CommunityPage";
import PersonRoster from "@/components/shared/PersonRoster";

export default function TeamPage() {
  return (
    <CommunityPage compact title={TEAM_PAGE.title} lead={TEAM_PAGE.lead}>
      <PersonRoster
        people={TEAM.map((member) => ({
          id: member.personId,
          name: member.name,
          photo: member.avatar,
          meta: member.role,
          socials: member.socials,
        }))}
      />
    </CommunityPage>
  );
}
