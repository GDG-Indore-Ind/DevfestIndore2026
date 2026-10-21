import type { Metadata } from "next";
import TicketPassPage from "@/components/TicketPassPage";

export const metadata: Metadata = { title: "Last Orbit Pass", description: "Last Orbit Pass eligibility, inclusions and release dates for DevFest Indore 2026 on November 28 at Essentia Luxury Hotel." };

export default function PassPage() {
  return <TicketPassPage category="last-orbit" />;
}
