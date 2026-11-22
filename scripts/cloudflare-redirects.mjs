import { writeFileSync } from "node:fs";
import { redirects } from "./redirects.mjs";

const rules = redirects.map(({ source, destination, permanent }) => {
  const cloudflareSource = source.replace(/:\w+\+/g, "*");
  return `${cloudflareSource} ${destination} ${permanent ? 308 : 307}`;
});

writeFileSync(new URL("../out/_redirects", import.meta.url), `${rules.join("\n")}\n`);
