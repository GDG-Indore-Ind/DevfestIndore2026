import type { ReactNode } from "react";
import { CalendarDays, Compass, Handshake, Images, Orbit, Rocket, Users } from "lucide-react";

const marks = { orbit: Orbit, people: Users, photos: Images, events: CalendarDays, partners: Handshake, tickets: Rocket, guide: Compass };
export type PageMotif = keyof typeof marks;

export function PageMark({ motif = "orbit" }: { motif?: PageMotif }) {
  const Icon = marks[motif];
  return <div className={`space-page-mark space-page-mark-${motif}`} aria-hidden="true"><span className="space-mark-orbit" /><span className="space-mark-core"><Icon /></span><svg viewBox="0 0 40 40" className="space-mark-star" focusable="false"><path d="M20 2C20 14 26 20 38 20C26 20 20 26 20 38C20 26 14 20 2 20C14 20 20 14 20 2Z" fill="currentColor" /></svg></div>;
}

export default function PageIntro({ title, lead, art, motif = "orbit", meta, titleId }: { title: ReactNode; lead: string; art?: ReactNode; motif?: PageMotif; meta?: ReactNode; titleId?: string }) {
  return <section className="community-intro space-page-intro" id="page-overview"><div className={`audience-wrap space-page-intro-grid ${art ? "space-intro-with-photo" : ""}`}><div>{meta && <div className="space-page-meta">{meta}</div>}<h1 id={titleId}>{title}</h1><p className="audience-body">{lead}</p></div>{art ?? <PageMark motif={motif} />}</div></section>;
}
