import { Link2 } from "lucide-react";
import { KONFHUB_PROFILE_REMINDER } from "@/content/tickets";

export default function RegistrationReminder({ contained = false }: { contained?: boolean }) {
  const Heading = contained ? "h3" : "h2";
  return (
    <aside
      className={`${contained ? "" : "audience-wrap "}ticket-profile-reminder`}
      aria-label="KonfHub profile reminder"
    >
      <Link2 aria-hidden="true" />
      <div>
        <Heading>{KONFHUB_PROFILE_REMINDER.title}</Heading>
        <p>{KONFHUB_PROFILE_REMINDER.text}</p>
      </div>
    </aside>
  );
}
