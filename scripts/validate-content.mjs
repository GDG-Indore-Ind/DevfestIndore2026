import { readContent, validateContent, COLLECTIONS } from "./lib/content.mjs";
try {
  const data = readContent();
  const errors = validateContent(data);
  if (errors.length) {
    console.error(`Content validation failed (${errors.length}):\n${errors.map(error => `  - ${error}`).join("\n")}`);
    process.exitCode = 1;
  } else console.log(`Content valid: ${COLLECTIONS.length} JSON files, ${data.people.people.length} people, ${data.programme.entries.filter(entry => entry.type === "talk").length} talks, ${data.organizations.organizations.length} organizations.`);
} catch (error) { console.error(`Content validation failed: ${error.message}`); process.exitCode = 1; }
