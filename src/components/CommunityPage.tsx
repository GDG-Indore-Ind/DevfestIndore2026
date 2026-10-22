import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro, { type PageMotif } from "@/components/PageIntro";
import { type FlightStop } from "@/components/OrbitScrollRail";

const directoryStops = [{ id: "page-overview", label: "Overview" }, { id: "page-directory", label: "Explore" }];

export default function CommunityPage({ title, lead, children, art, motif, compact = false, flightStops = directoryStops }: { title: string; lead: string; children: ReactNode; art?: ReactNode; motif?: PageMotif; compact?: boolean; flightStops?: readonly FlightStop[] }) {
  return <div className={`audience-site community-page space-subpage ${compact ? "compact-community" : ""}`}><Navbar flightStops={flightStops} /><main id="main-content"><PageIntro title={title} lead={lead} art={art} motif={motif} /><section className="audience-section space-directory-section" id="page-directory"><div className="audience-wrap">{children}</div></section></main><Footer /></div>;
}
