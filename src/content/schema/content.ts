// The whole content folder as one value, with the cross-file rules that a single
// file's schema cannot express. Asset files on disk are checked by the validate script.
import { z } from "zod";
import { Id } from "./common.ts";
import { Event } from "./event.ts";
import { FAQ_TOKENS, FaqFile, ThemesFile } from "./guide.ts";
import { PhotosFile, PressFile } from "./media.ts";
import { OrganizationsFile } from "./organizations.ts";
import { AmbassadorsFile, TeamFile } from "./participants.ts";
import { PartnersFile } from "./partners.ts";
import { PeopleFile } from "./people.ts";
import { SessionsFile, WorkshopsFile } from "./programme.ts";
import { Site } from "./site.ts";
import { TicketsFile } from "./tickets.ts";

/** content/events/<id>/: event.json is required, every other file is optional. */
export const EventFolder = z.strictObject({
  event: Event,
  sessions: SessionsFile.optional(),
  workshops: WorkshopsFile.optional(),
  team: TeamFile.optional(),
  ambassadors: AmbassadorsFile.optional(),
  partners: PartnersFile.optional(),
  tickets: TicketsFile.optional(),
  faq: FaqFile.optional(),
  themes: ThemesFile.optional(),
});
export type EventFolder = z.infer<typeof EventFolder>;

/** Policies the FAQ answers depend on. */
export const REQUIRED_POLICIES = ["final-sale", "entry-identification", "workshop-access"];

export const Content = z
  .strictObject({
    site: Site,
    people: PeopleFile,
    organizations: OrganizationsFile,
    photos: PhotosFile,
    press: PressFile,
    events: z.record(Id, EventFolder).describe("Keyed by folder name."),
  })
  .superRefine((content, ctx) => {
    const issue = (path: (string | number)[], message: string) =>
      ctx.addIssue({ code: "custom", path, message });

    function unique<T>(
      items: T[],
      path: (string | number)[],
      key: (item: T) => string,
      label: string,
    ) {
      const seen = new Set<string>();
      items.forEach((item, index) => {
        const value = key(item);
        if (seen.has(value)) issue([...path, index], `Duplicate ${label} ${value}`);
        seen.add(value);
      });
    }
    function exists(ids: Set<string>, id: string, path: (string | number)[], label: string) {
      if (!ids.has(id)) issue(path, `Unknown ${label} ${id}`);
    }

    const { site, people, organizations, photos, press, events } = content;
    const personIds = new Set(people.people.map((person) => person.id));
    const organizationsById = new Map(
      organizations.organizations.map((organization) => [organization.id, organization]),
    );
    const organizationIds = new Set(organizationsById.keys());
    const eventIds = new Set(Object.keys(events));

    unique(people.people, ["people", "people"], (person) => person.id, "person");
    unique(
      people.people,
      ["people", "people"],
      (person) => person.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
      "person name",
    );
    unique(
      organizations.organizations,
      ["organizations", "organizations"],
      (organization) => organization.id,
      "organization",
    );
    unique(photos.photos, ["photos", "photos"], (photo) => photo.id, "photo");
    unique(press.articles, ["press", "articles"], (article) => article.id, "article");

    exists(eventIds, site.currentEvent, ["site", "currentEvent"], "event");
    site.ecosystem.forEach((id, index) =>
      exists(organizationIds, id, ["site", "ecosystem", index], "organization"),
    );
    site.historicalSponsors.forEach((id, index) => {
      exists(organizationIds, id, ["site", "historicalSponsors", index], "organization");
      if (organizationsById.get(id) && !organizationsById.get(id)?.logo)
        issue(["site", "historicalSponsors", index], `Historical sponsor ${id} needs a logo`);
    });

    // Sub-event ids share one namespace with event ids so photos can point at either.
    const subEventIds = new Set<string>();
    for (const [folder, { sessions, workshops }] of Object.entries(events)) {
      for (const [file, items] of [
        ["sessions", sessions?.sessions ?? []],
        ["workshops", workshops?.workshops ?? []],
      ] as const) {
        items.forEach((item, index) => {
          if (eventIds.has(item.id) || subEventIds.has(item.id))
            issue(
              ["events", folder, file, file, index, "id"],
              `Duplicate event or session id ${item.id}`,
            );
          subEventIds.add(item.id);
        });
      }
    }

    for (const [folder, current] of Object.entries(events)) {
      const at = (...path: (string | number)[]) => ["events", folder, ...path];
      const isCurrent = folder === site.currentEvent;
      if (current.event.id !== folder)
        issue(at("event", "id"), `Event id ${current.event.id} must match its folder ${folder}`);
      try {
        new Intl.DateTimeFormat("en", { timeZone: current.event.timezone ?? "Asia/Kolkata" });
      } catch {
        issue(at("event", "timezone"), `Unknown time zone ${current.event.timezone}`);
      }

      for (const [file, items] of [
        ["sessions", current.sessions?.sessions ?? []],
        ["workshops", current.workshops?.workshops ?? []],
      ] as const) {
        items.forEach((item, index) =>
          item.performer.forEach((performer, position) => {
            const path = at(file, file, index, "performer", position);
            if ("person" in performer) exists(personIds, performer.person, path, "person");
            else exists(organizationIds, performer.organization, path, "organization");
          }),
        );
      }
      unique(
        current.workshops?.workshops ?? [],
        at("workshops", "workshops"),
        (item) => item.url.replace(/\/$/, ""),
        "workshop page",
      );

      const team = current.team?.team ?? [];
      unique(team, at("team", "team"), (member) => member.person, "team member");
      team.forEach((member, index) => {
        exists(personIds, member.person, at("team", "team", index, "person"), "person");
        unique(
          member.responsibilities,
          at("team", "team", index, "responsibilities"),
          (item) => item.area.trim().toLowerCase(),
          "responsibility",
        );
      });
      const ambassadors = current.ambassadors?.ambassadors ?? [];
      unique(
        ambassadors,
        at("ambassadors", "ambassadors"),
        (ambassador) => ambassador.person,
        "ambassador",
      );
      ambassadors.forEach((ambassador, index) =>
        exists(
          personIds,
          ambassador.person,
          at("ambassadors", "ambassadors", index, "person"),
          "person",
        ),
      );

      const partners = current.partners?.partners ?? [];
      unique(partners, at("partners", "partners"), (partner) => partner.organization, "partner");
      unique(
        partners.filter((partner) => partner.featured),
        at("partners", "partners"),
        (partner) => partner.featured ?? "",
        "featured slot",
      );
      partners.forEach((partner, index) => {
        const path = at("partners", "partners", index);
        const organization = organizationsById.get(partner.organization);
        if (!organization)
          return issue([...path, "organization"], `Unknown organization ${partner.organization}`);
        if (partner.featured && !isCurrent)
          issue([...path, "featured"], "Only current-event partners can be featured");
        if (isCurrent && (!organization.logo || !organization.url))
          issue(path, `Current partner ${organization.id} needs a logo and url`);
        if (partner.type === "community" && !organization.url && !organization.sameAs?.length)
          issue(path, `Community ${organization.id} needs a url or sameAs link`);
      });

      const tickets = current.tickets;
      if (isCurrent && !tickets) issue(at("tickets"), "The current event needs tickets.json");
      if (tickets) {
        const offerIds = new Set(tickets.offers.map((offer) => offer.id));
        const groupIds = new Set(tickets.benefitGroups.map((group) => group.id));
        const policyIds = new Set(tickets.policies.map((policy) => policy.id));
        unique(tickets.offers, at("tickets", "offers"), (offer) => offer.id, "offer");
        unique(
          tickets.benefitGroups,
          at("tickets", "benefitGroups"),
          (group) => group.id,
          "benefit group",
        );
        unique(tickets.policies, at("tickets", "policies"), (policy) => policy.id, "policy");
        unique(
          tickets.guidelines,
          at("tickets", "guidelines"),
          (section) => section.id,
          "guideline section",
        );
        tickets.offers.forEach((offer, index) => {
          if (offer.price !== undefined && !offer.priceCurrency)
            issue(
              at("tickets", "offers", index, "priceCurrency"),
              "A priced offer needs priceCurrency",
            );
          unique(
            offer.benefits,
            at("tickets", "offers", index, "benefits"),
            (benefit) => benefit.label,
            "benefit",
          );
          offer.benefits.forEach((benefit, position) =>
            exists(
              groupIds,
              benefit.group,
              at("tickets", "offers", index, "benefits", position, "group"),
              "benefit group",
            ),
          );
        });
        tickets.policies.forEach((policy, index) =>
          policy.appliesTo?.forEach((id, position) =>
            exists(offerIds, id, at("tickets", "policies", index, "appliesTo", position), "offer"),
          ),
        );
        const placed = tickets.guidelines.flatMap((section) => section.policies);
        unique(placed, at("tickets", "guidelines"), (id) => id, "guideline placement of policy");
        tickets.guidelines.forEach((section, index) =>
          section.policies.forEach((id, position) =>
            exists(
              policyIds,
              id,
              at("tickets", "guidelines", index, "policies", position),
              "policy",
            ),
          ),
        );
        for (const id of policyIds)
          if (!placed.includes(id))
            issue(
              at("tickets", "guidelines"),
              `Policy ${id} is not placed in any guideline section`,
            );
        for (const id of REQUIRED_POLICIES)
          if (!policyIds.has(id))
            issue(at("tickets", "policies"), `Required policy ${id} is missing`);
      }

      const questions = current.faq?.questions ?? [];
      unique(questions, at("faq", "questions"), (question) => question.id, "question");
      questions.forEach((question, index) => {
        for (const [, token] of question.answer.matchAll(/\{\{(\w+)\}\}/g)) {
          if (!(FAQ_TOKENS as readonly string[]).includes(token))
            issue(at("faq", "questions", index, "answer"), `Unknown template token ${token}`);
        }
      });
      unique(current.themes?.themes ?? [], at("themes", "themes"), (theme) => theme.id, "theme");
    }

    photos.photos.forEach((photo, index) => {
      if (photo.about && !eventIds.has(photo.about) && !subEventIds.has(photo.about))
        issue(["photos", "photos", index, "about"], `Unknown event or session ${photo.about}`);
    });
    press.articles.forEach((article, index) =>
      exists(eventIds, article.about, ["press", "articles", index, "about"], "event"),
    );
  });
export type Content = z.infer<typeof Content>;
