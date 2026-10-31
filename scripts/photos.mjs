// Turns raw photos into small square webp files named after a person's id.
//
//   npm run photos                 process everything in photos-inbox/ (files named <person-id>.jpg|png|heic)
//   npm run photos -- --localize   download remote photos and re-encode local ones into public/images/people/
//
// Output is public/images/people/<person-id>.webp and the person's `photo` field in content/people.json.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PROJECT_ROOT } from "./lib/content.mjs";

const SIZE = 480;
const INBOX = path.join(PROJECT_ROOT, "photos-inbox");
const OUT_DIR = path.join(PROJECT_ROOT, "public/images/people");
const PEOPLE_FILE = path.join(PROJECT_ROOT, "content/people.json");
const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif)$/i;
const OUT_PREFIX = "/images/people/";

const peopleFile = JSON.parse(readFileSync(PEOPLE_FILE, "utf8"));
const people = new Map(peopleFile.people.map((person) => [person.id, person]));
const currentEventId = JSON.parse(readFileSync(path.join(PROJECT_ROOT, "content/event.json"), "utf8")).events.find(
  (event) => event.status === "current",
).id;

mkdirSync(OUT_DIR, { recursive: true });

/** Square-crop around the most interesting area (usually the face) and write a small webp. */
async function encode(input, personId) {
  const { width, height } = await sharp(input).metadata();
  const size = Math.min(SIZE, width, height);
  const target = path.join(OUT_DIR, `${personId}.webp`);
  await sharp(input)
    .rotate()
    .resize(size, size, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 82 })
    .toFile(target);
  return `${OUT_PREFIX}${personId}.webp`;
}

/** iPhone HEIC files use HEVC, which sharp cannot decode; macOS sips converts them first. */
function toJpegIfHeic(file) {
  if (!/\.(heic|heif)$/i.test(file)) return { file, cleanup: () => {} };
  const converted = path.join(INBOX, `.${path.basename(file)}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", file, "--out", converted], { stdio: "ignore" });
  return { file: converted, cleanup: () => rmSync(converted, { force: true }) };
}

function setPhoto(personId, url) {
  people.get(personId).photo = url;
}

const summary = [];

async function processInbox() {
  if (!existsSync(INBOX)) {
    mkdirSync(INBOX, { recursive: true });
    console.log("Created photos-inbox/. Drop files named <person-id>.jpg there and run again.");
    return;
  }
  const done = path.join(INBOX, "done");
  const files = readdirSync(INBOX).filter((name) => IMAGE_EXT.test(name) && !name.startsWith("."));
  if (!files.length) console.log("photos-inbox/ has no images.");
  for (const name of files) {
    const personId = path.parse(name).name.toLowerCase();
    if (!people.has(personId)) {
      summary.push(`skipped  ${name}: no person with id "${personId}" in content/people.json`);
      continue;
    }
    const source = path.join(INBOX, name);
    const prepared = toJpegIfHeic(source);
    try {
      setPhoto(personId, await encode(prepared.file, personId));
    } finally {
      prepared.cleanup();
    }
    mkdirSync(done, { recursive: true });
    renameSync(source, path.join(done, name));
    summary.push(`ok       ${name} -> ${OUT_PREFIX}${personId}.webp`);
  }
}

async function localize() {
  for (const person of people.values()) {
    const photo = person.photo;
    if (!photo || photo.startsWith(OUT_PREFIX)) continue;
    try {
      let input;
      if (/^https?:\/\//.test(photo)) {
        const response = await fetch(photo);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        input = Buffer.from(await response.arrayBuffer());
      } else {
        input = readFileSync(path.join(PROJECT_ROOT, "public", photo));
      }
      setPhoto(person.id, await encode(input, person.id));
      summary.push(`ok       ${person.id}: ${photo.slice(0, 60)}`);
    } catch (error) {
      summary.push(`failed   ${person.id}: ${error.message} (${photo.slice(0, 60)})`);
    }
  }
}

if (process.argv.includes("--localize")) await localize();
else await processInbox();

writeFileSync(PEOPLE_FILE, `${JSON.stringify(peopleFile, null, 2)}\n`);
for (const line of summary) console.log(line);

const missing = peopleFile.people.filter(
  (person) => !person.photo && (person.events ?? []).some((entry) => entry.eventId === currentEventId),
);
if (missing.length) {
  console.log(`\nNo photo yet for ${currentEventId}: ${missing.map((person) => person.id).join(", ")}`);
  console.log("Save each as photos-inbox/<person-id>.jpg and run npm run photos.");
}
