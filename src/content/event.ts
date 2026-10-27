import eventFile from "../../content/event.json";
const current = eventFile.events.find((event) => event.status === "current");
if (!current || !current.tickets)
  throw new Error("A current event is required. Run npm run content:validate.");
const { tickets, ...details } = current;
export const EVENT = {
  ...details,
  startsAt: current.date,
  year: current.date.slice(0, 4),
  links: { ...current.links, booking: tickets.booking.url },
  booking: { enabled: tickets.booking.enabled, widgetUrl: tickets.booking.widgetUrl },
};
export const EVENT_TICKETS = tickets;
export const PAST_EVENTS = eventFile.events
  .filter((event) => event.status === "past")
  .map((event) => ({
    id: event.id,
    title: event.name,
    date: event.date,
    venue: event.venue.name,
    kind: ({ devfest: "DevFest", community: "Community event", online: "Online session" } as const)[
      event.type as "devfest" | "community" | "online"
    ],
    summary: event.summary!,
    source: event.source!,
    publication: "archived" as const,
    officialSpeakerIds: event.officialSpeakerIds!,
  }));
const startsAt = new Date(EVENT.startsAt);
const format = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: EVENT.timezone, ...options }).format(startsAt);
export const EVENT_DATE = format({
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
export const EVENT_SHORT_DATE = format({ day: "numeric", month: "long" });
export const EVENT_WEEKDAY_DATE = format({ weekday: "long", day: "numeric", month: "long" });
export const REGISTRATION_TIME = `${format({ hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase()} IST`;
