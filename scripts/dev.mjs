import { spawn } from "node:child_process";
import { watchFile, unwatchFile } from "node:fs";
import path from "node:path";
import { DATABASE_PATH, ROOT } from "./lib/database.ts";

// SQLite edits refresh the publication snapshot; Next watches those ordinary files.
const child = spawn(
  process.execPath,
  [path.join(ROOT, "node_modules/next/dist/bin/next"), "dev", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
const files = [
  DATABASE_PATH,
  `${DATABASE_PATH}-wal`,
  path.join(ROOT, "src/content/copy.ts"),
  path.join(ROOT, "src/content/site.ts"),
];
let timer;
let generator;
let pending = false;
const generate = () => {
  if (generator) {
    pending = true;
    return;
  }
  generator = spawn(process.execPath, ["scripts/generate-content.mjs"], {
    cwd: ROOT,
    stdio: "inherit",
  });
  generator.on("error", (error) => console.error(error.message));
  generator.on("close", () => {
    generator = undefined;
    if (pending) {
      pending = false;
      generate();
    }
  });
};
const refresh = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // A fresh process also reloads editorial/config modules without module-cache staleness.
    generate();
  }, 250);
};
for (const file of files) watchFile(file, { interval: 500 }, refresh);
const stop = (signal) => child.kill(signal);
process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
child.on("exit", (code) => {
  clearTimeout(timer);
  pending = false;
  generator?.kill();
  for (const file of files) unwatchFile(file);
  process.exitCode = code ?? 0;
});
