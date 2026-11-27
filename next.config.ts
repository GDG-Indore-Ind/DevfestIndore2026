import type { NextConfig } from "next";
import { redirects } from "./scripts/redirects.mjs";

const staticExport = process.env.DEVFEST_STATIC_EXPORT === "1";
// `*.dev.ts` routes exist only on the dev server, so production builds leave them out.
const devOnlyExtensions = process.env.NODE_ENV === "development" ? ["dev.ts"] : [];

const nextConfig: NextConfig = {
  devIndicators: false,
  pageExtensions: ["tsx", "ts", "jsx", "js", ...devOnlyExtensions],
  ...(staticExport
    ? { output: "export" }
    : {
        async redirects() {
          return redirects;
        },
      }),
  images: {
    qualities: [75, 100],
    unoptimized: staticExport,
  },
};

export default nextConfig;
