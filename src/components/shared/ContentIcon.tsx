import {
  CalendarDays,
  CircleHelp,
  Handshake,
  History,
  Images,
  Mail,
  MapPin,
  Mic,
  Monitor,
  Navigation,
  Rocket,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import styles from "./ContentAction.module.css";

const icons = {
  calendar: CalendarDays,
  partners: Handshake,
  history: History,
  gallery: Images,
  help: CircleHelp,
  mail: Mail,
  venue: MapPin,
  microphone: Mic,
  directions: Navigation,
  rocket: Rocket,
  guidelines: ShieldCheck,
  themes: Sparkles,
  tickets: Ticket,
  people: Users,
  exhibits: Monitor,
};
export type ContentIconName = keyof typeof icons;
export type IconTone = "blue" | "green" | "red" | "yellow";
export default function ContentIcon({
  name,
  tone = "blue",
  heading = false,
}: {
  name: ContentIconName;
  tone?: IconTone;
  heading?: boolean;
}) {
  const Icon = icons[name];
  return (
    <Icon
      aria-hidden="true"
      className={`${styles.icon} ${styles[tone]} ${heading ? styles.headingIcon : ""}`}
      strokeWidth={1.75}
    />
  );
}
