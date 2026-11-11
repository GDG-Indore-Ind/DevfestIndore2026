import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/tickets/:path+", destination: "/tickets", permanent: true },
      { source: "/events", destination: "/archive#workshops", permanent: true },
      { source: "/workshops", destination: "/agenda/workshops", permanent: true },
      { source: "/space-club", destination: "/partners#space-club", permanent: true },
      { source: "/guidelines", destination: "/faq", permanent: true },
      { source: "/invite/:slug", destination: "/ambassadors", permanent: true },
      { source: "/past-events", destination: "/archive#editions", permanent: true },
      ...["2022", "2023", "2024", "2025"].map((year) => ({
        source: `/past-events/${year}`,
        destination: `/archive/devfest-${year}`,
        permanent: true,
      })),
      ...["ccd-2022", "ccd-2023", "ccd-2024", "ccd-2025", "ai-unplugged-2025", "cloud-bytes-2025"].map(
        (id) => ({
          source: `/past-events/${id}`,
          destination: `/archive/${id}`,
          permanent: true,
        }),
      ),
      { source: "/past-events/:year", destination: "/archive#editions", permanent: true },
      { source: "/past-speakers", destination: "/archive#editions", permanent: true },
      { source: "/past-sponsors", destination: "/archive#editions", permanent: true },
      { source: "/gallery", destination: "/archive#photos", permanent: true },
      { source: "/talks", destination: "/archive#editions", permanent: true },
      { source: "/talks/:id", destination: "/archive#editions", permanent: true },
      { source: "/people/:id", destination: "/team", permanent: true },
      { source: "/organizations/:id", destination: "/partners", permanent: true },
    ];
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
