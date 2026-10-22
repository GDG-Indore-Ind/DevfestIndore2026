import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: "/tickets/:path+", destination: "/tickets", permanent: true }];
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
