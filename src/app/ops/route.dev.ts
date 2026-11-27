import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Serves the internal venue ops page at /ops on the dev server only (see next.config.ts).
 * The page itself stays in the ignored `local/` folder because this repository is public.
 */
export async function GET() {
  try {
    const page = await readFile(path.join(process.cwd(), "local", "venue-ops.html"), "utf8");
    return new Response(page, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return new Response("local/venue-ops.html is not on this machine.", { status: 404 });
  }
}
