import test from "node:test";
import assert from "node:assert/strict";
import { Content } from "../src/content/schema/content.ts";
import { FILE_SCHEMAS, jsonSchema } from "./content-schemas.mjs";

const offer = (id) => ({
  id, name: `${id} pass`, description: "Full-day access.", price: 849, priceCurrency: "INR", availability: "in-stock",
  inventoryLevel: 100, eligibleCustomerType: "Everyone", eligibility: "Anyone may attend.", listed: true,
  benefits: [{ group: "access", label: "Sessions" }],
});
const policy = (id) => ({ id, title: id, text: `${id} applies.` });

const fixture = () => ({
  site: {
    name: "Google Developer Group Indore", url: "https://devfest.indore.community", email: "gdgindore@gmail.com",
    sameAs: ["https://www.linkedin.com/company/gdg-indore/"], codeOfConduct: "https://developers.google.com/community-guidelines",
    currentEvent: "devfest-2026", ecosystem: ["gdg-cloud-indore"], historicalSponsors: [],
    features: { partnersRevealed: true, ambassadorContact: false },
  },
  people: { people: [
    { id: "kartikey-rawat", name: "Kartikey Rawat", jobTitle: "Senior Engineer", worksFor: "Qualcomm", sameAs: ["https://www.linkedin.com/in/example/"] },
    { id: "tushar-pal", name: "Tushar Pal" },
  ] },
  organizations: { organizations: [
    { id: "qualcomm", name: "Qualcomm", logo: "/images/organizations/qualcomm.png", url: "https://www.qualcomm.com/" },
    { id: "gdg-cloud-indore", name: "GDG Cloud Indore", url: "https://gdg.community.dev/gdg-cloud-indore/" },
  ] },
  photos: { photos: [
    { id: "acropolis", name: "Workshop", caption: "Students at work.", contentUrl: "/images/photos/devfest-2026/acropolis.webp", width: 1200, height: 800, about: "campus-acropolis-2026" },
  ] },
  press: { articles: [
    { id: "devfest-2025-naidunia-ai", headline: "AI headline", about: "devfest-2025", image: { contentUrl: "/images/press/devfest-2025-naidunia-ai.jpg", width: 1080, height: 1041 } },
  ] },
  events: {
    "devfest-2026": {
      event: { id: "devfest-2026", name: "DevFest Indore 2026", series: "devfest", startDate: "2026-11-28T08:30:00+05:30", location: { name: "Essentia Luxury Hotel Indore" } },
      sessions: { sessions: [
        { id: "devfest-2026-kartikey-rawat", name: "Building AI at the Edge", format: "talk", keywords: ["genai"], performer: [{ person: "kartikey-rawat", jobTitle: "Senior Engineer, Developer Relations", badge: "Engineering Leader" }] },
        { id: "devfest-2026-keynote", format: "keynote", performer: [{ person: "tushar-pal" }] },
      ] },
      workshops: { workshops: [
        { id: "campus-acropolis-2026", name: "AI & Google Cloud", startDate: "2026-09-21", location: { name: "Acropolis Institute" }, performer: [{ organization: "gdg-cloud-indore" }],
          url: "https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop/" },
      ] },
      team: { team: [{ person: "tushar-pal", group: "core-team", order: 1, responsibilities: [{ area: "Event", level: "lead" }] }] },
      ambassadors: { ambassadors: [{ person: "kartikey-rawat", track: "professional", community: "GDG Indore" }] },
      partners: { partners: [{ organization: "qualcomm", type: "collaborator", roleName: "Physical AI partner", featured: "technology", order: 1 }] },
      tickets: {
        booking: { enabled: true, url: "https://konfhub.com/gdg-devfest-indore-2026", widgetUrl: "https://konfhub.com/widget/id/0278dd0b-f629-408a-9a47-9fb249bde1cc" },
        offers: [offer("student"), offer("professional")],
        benefitGroups: [{ id: "access", label: "Event access" }],
        policies: [policy("final-sale"), policy("entry-identification"), policy("workshop-access"), { ...policy("cadet-id"), appliesTo: ["student"] }],
        guidelines: [
          { id: "before-booking", title: "Before you book", policies: ["final-sale", "cadet-id"] },
          { id: "on-the-day", title: "On the day", policies: ["entry-identification", "workshop-access"] },
        ],
        registrationChecklist: [{ title: "Add your LinkedIn URL", text: "Add it before booking." }],
        registrationDeclaration: "I confirm my details are accurate.",
      },
      faq: { questions: [{ id: "when", question: "When is it?", answer: "On {{date}} at {{venue}}.", topic: "event", link: { href: "/venue", label: "Venue" } }] },
    },
    "devfest-2025": {
      event: { id: "devfest-2025", name: "DevFest Indore 2025", series: "devfest", startDate: "2025-12-20", location: { name: "Indore Marriott Hotel" } },
      partners: { partners: [{ organization: "gdg-cloud-indore", type: "community", roleName: "Community partner" }] },
    },
  },
});

function issues(content) {
  const result = Content.safeParse(content);
  return result.success ? [] : result.error.issues.map((issue) => `${issue.path.join("/")}: ${issue.message}`);
}
const hasIssue = (content, text) => assert(issues(content).some((issue) => issue.includes(text)), `expected an issue containing "${text}", got ${JSON.stringify(issues(content))}`);

test("a complete content folder is valid", () => assert.deepEqual(issues(fixture()), []));

test("records reject fields the schema does not define", () => {
  const data = fixture();
  data.people.people[0].title = "Senior Engineer";
  hasIssue(data, "people/people/0");
});

test("an event folder must match its event id and the current event must exist", () => {
  const data = fixture();
  data.events["devfest-2025"].event.id = "devfest-2024";
  hasIssue(data, "must match its folder devfest-2025");
  data.site.currentEvent = "devfest-2027";
  hasIssue(data, "Unknown event devfest-2027");
});

test("performers, team members and partners must refer to known records", () => {
  const data = fixture();
  data.events["devfest-2026"].sessions.sessions[0].performer[0].person = "nobody";
  data.events["devfest-2026"].team.team[0].person = "nobody-else";
  data.events["devfest-2026"].partners.partners[0].organization = "unknown-org";
  hasIssue(data, "Unknown person nobody");
  hasIssue(data, "Unknown person nobody-else");
  hasIssue(data, "Unknown organization unknown-org");
});

test("session and workshop ids are unique across every event", () => {
  const data = fixture();
  data.events["devfest-2025"].sessions = { sessions: [{ id: "campus-acropolis-2026", format: "talk", performer: [{ person: "tushar-pal" }] }] };
  hasIssue(data, "Duplicate event or session id campus-acropolis-2026");
});

test("photos and press refer to an event or session that exists", () => {
  const data = fixture();
  data.photos.photos[0].about = "campus-unknown-2026";
  data.press.articles[0].about = "ccd-2024";
  hasIssue(data, "Unknown event or session campus-unknown-2026");
  hasIssue(data, "Unknown event ccd-2024");
});

test("only current-event partners can be featured, once per slot", () => {
  const data = fixture();
  data.events["devfest-2025"].partners.partners[0].featured = "space";
  hasIssue(data, "Only current-event partners can be featured");
});

test("every policy is placed in exactly one guideline section", () => {
  const data = fixture();
  const tickets = data.events["devfest-2026"].tickets;
  tickets.guidelines[1].policies.push("final-sale");
  hasIssue(data, "Duplicate guideline placement of policy final-sale");
  tickets.guidelines[1].policies = ["entry-identification"];
  tickets.guidelines[0].policies = ["final-sale", "cadet-id"];
  hasIssue(data, "Policy workshop-access is not placed");
});

test("ticket references and FAQ tokens are checked", () => {
  const data = fixture();
  const tickets = data.events["devfest-2026"].tickets;
  tickets.policies[3].appliesTo = ["vip"];
  tickets.offers[0].benefits[0].group = "lounges";
  data.events["devfest-2026"].faq.questions[0].answer = "Costs {{vipPrice}}.";
  hasIssue(data, "Unknown offer vip");
  hasIssue(data, "Unknown benefit group lounges");
  hasIssue(data, "Unknown template token vipPrice");
});

test("each content file has a closed JSON Schema for editors", () => {
  for (const [name, [schema, title, file]] of Object.entries(FILE_SCHEMAS)) {
    const generated = jsonSchema(schema, title, file);
    assert.equal(generated.type, "object", name);
    assert.equal(generated.additionalProperties, false, name);
  }
});
