import { Link2 } from "lucide-react";
import { KONFHUB_PROFILE_REMINDER } from "@/content/tickets";

export default function RegistrationReminder() {
  return <aside className="audience-wrap ticket-profile-reminder" aria-label="KonfHub profile reminder"><Link2 aria-hidden="true" /><div><h2>{KONFHUB_PROFILE_REMINDER.title}</h2><p>{KONFHUB_PROFILE_REMINDER.text}</p></div></aside>;
}
