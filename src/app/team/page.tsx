import LegacyTeam from "@/components/directory/LegacyTeam";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "/team",
  "DevFest Team",
  "Meet the people bringing DevFest Indore together.",
);
export default function TeamPage() {
  return <LegacyTeam />;
}
