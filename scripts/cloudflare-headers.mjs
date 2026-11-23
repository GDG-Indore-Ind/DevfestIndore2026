import { copyFileSync } from "node:fs";

copyFileSync(
  new URL("../cloudflare/_headers", import.meta.url),
  new URL("../out/_headers", import.meta.url),
);
