import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readContent, validateContent, PROJECT_ROOT } from "./lib/content.mjs";

export function generateContent() {
  const content = readContent();
  const errors = validateContent(content);
  if (errors.length) throw new Error(`Public content validation failed:\n${errors.join("\n")}`);
  const directory = path.join(PROJECT_ROOT, "src/content/generated");
  mkdirSync(directory, { recursive: true });
  let changed = 0;
  for (const [name, value] of Object.entries(content)) {
    const filename = path.join(directory, `${name}.json`);
    const json = `${JSON.stringify(value, null, 2)}\n`;
    if (!existsSync(filename) || readFileSync(filename, "utf8") !== json) {
      writeFileSync(filename, json);
      changed++;
    }
  }
  return changed;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  console.log(`Generated public content (${generateContent()} files updated).`);
}
