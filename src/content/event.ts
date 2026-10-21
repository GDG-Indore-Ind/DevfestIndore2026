import event from "../../content/event.json";
/** Public event facts. Edit content/event.json, not this view. */
export const EVENT = event;
const startsAt = new Date(EVENT.startsAt);
const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-IN", { timeZone: EVENT.timezone, ...options }).format(startsAt);
export const EVENT_DATE = format({ weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const EVENT_SHORT_DATE = format({ day: "numeric", month: "long" });
export const EVENT_WEEKDAY_DATE = format({ weekday: "long", day: "numeric", month: "long" });
export const REGISTRATION_TIME = `${format({ hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase()} IST`;
