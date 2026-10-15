import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Import Initial Data
import { INITIAL_WORKSHOPS } from "../src/data/workshopsData";
import { INITIAL_PARTNERS } from "../src/data/partnersData";
import { INITIAL_TEAM, INITIAL_AGENDA } from "../src/data/teamData";
import { DEV_FEST_PAST_SPEAKERS_FULL } from "../src/data/pastSpeakersFull";
import { INITIAL_GALLERY_ITEMS } from "../src/data/ecosystemData";
import { FAQS } from "../src/data/devfestData";
import { INITIAL_NAV_ITEMS, INITIAL_SECTIONS_CONFIG } from "../src/lib/firestoreService";

const serviceAccountPath = path.resolve(
  __dirname,
  "../devfestindore2026-firebase-adminsdk-fbsvc-61daa73d49.json"
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

async function seedCollection(colName: string, items: any[], idKey = "id") {
  console.log(`\n⏳ Seeding collection: '${colName}' (${items.length} records)...`);
  const batchSize = 400;
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    const batch = db.batch();
    for (const item of chunk) {
      const docId = String(item[idKey] || `${colName}-${Date.now()}-${Math.random()}`);
      // Clean undefined fields for Firestore
      const cleanItem = JSON.parse(JSON.stringify(item));
      const ref = db.collection(colName).doc(docId);
      batch.set(ref, cleanItem, { merge: true });
    }
    await batch.commit();
  }
  console.log(`✅ Collection '${colName}' seeded successfully.`);
}

async function main() {
  console.log("🚀 Starting Full Firestore Database Seeding & Schema Setup for DevFest Indore 2026...");

  // 1. College Workshops
  await seedCollection("college_workshops", INITIAL_WORKSHOPS);

  // 2. Partners & Sponsors
  await seedCollection("partners", INITIAL_PARTNERS);

  // 3. Team Members
  await seedCollection("team_members", INITIAL_TEAM);

  // 4. Past Speakers Full
  await seedCollection("past_speakers", DEV_FEST_PAST_SPEAKERS_FULL);

  // 5. Gallery Photos
  await seedCollection("gallery_photos", INITIAL_GALLERY_ITEMS);

  // 6. Agenda Sessions
  await seedCollection("agenda_sessions", INITIAL_AGENDA);

  // 7. FAQs
  await seedCollection("faq_items", FAQS);

  // 8. Navigation Links
  await seedCollection("navigation_links", INITIAL_NAV_ITEMS);

  // 9. Sections Config & Order
  await seedCollection("sections_config", INITIAL_SECTIONS_CONFIG);

  // 10. Global Telemetry & Event Config
  console.log("\n⏳ Setting up 'live_analytics' and 'event_config'...");
  await db.collection("live_analytics").doc("global_telemetry").set({
    totalPageViews: 18490,
    activeVisitors: 58,
    ticketConversions: 486,
    venueCapacity: 600,
    events: {
      cfp_proposal_submitted: 124,
      venue_map_interaction: 890,
      solar_orbit_exploration: 3410,
      satellite_rsvp_click: 512,
      ticket_checkout_click: 486,
      get_tickets_click: 742,
      konfhub_registered: 486,
      agenda_bookmark_click: 630,
      theme_toggle_click: 940,
    },
    geoDistribution: {
      indoreMalwa: 48,
      mpCentral: 24,
      westernIndia: 16,
      nationalGlobal: 12,
    },
    lastUpdated: new Date(),
  }, { merge: true });

  await db.collection("event_config").doc("social_media_links").set({
    twitter: "https://x.com/GDG_Indore",
    linkedin: "https://linkedin.com/company/gdg-indore",
    instagram: "https://instagram.com/gdgindore",
    github: "https://github.com/GDG-Indore",
    youtube: "https://youtube.com/@GDGIndore",
    sessionize: "https://sessionize.com/devfest-indore-2026/",
    lastUpdated: new Date(),
  }, { merge: true });

  console.log("✅ 'live_analytics' and 'event_config' seeded successfully!");
  console.log("\n🎉 ALL COLLECTIONS & MASTER DATA SUCCESSFULLY CREATED IN CLOUD FIRESTORE!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
