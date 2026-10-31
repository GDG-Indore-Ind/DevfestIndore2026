import TeamPage from "@/components/team/TeamPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "/team",
  "DevFest Team",
  "Meet the people bringing DevFest Indore together.",
);
export default function Team() {
  return <TeamPage />;
}
