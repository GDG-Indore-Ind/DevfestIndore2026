import pages from "../../../content/pages.json";
const directory = pages.directory;
import Link from "next/link";
import { History, Users, Handshake, Images } from "lucide-react";
export default function ArchiveNav({ current }: { current: string }) {
  return (
    <nav className="archive-navigation" aria-label="Community archive">
      {[
        { href: "/past-events", label: "Past events", Icon: History },
        {
          href: directory.enabled ? "/talks" : "/past-speakers",
          label: directory.enabled ? directory.talks.title : "Past speakers",
          Icon: Users,
        },
        {
          href: directory.enabled ? "/partners?year=all&type=sponsor" : "/past-sponsors",
          label: directory.enabled ? directory.partners.title : "Past sponsors",
          Icon: Handshake,
        },
        { href: "/gallery", label: "Photo gallery", Icon: Images },
      ].map(({ href, label, Icon }) => (
        <Link key={href} href={href} aria-current={href === current ? "page" : undefined}>
          <Icon className="audience-icon" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
