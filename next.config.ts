import type { NextConfig } from "next";
import { redirects } from "./scripts/redirects.mjs";

const staticExport = process.env.DEVFEST_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  devIndicators: false,
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
