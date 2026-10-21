import type { Metadata } from "next";
import TicketPassPage from "@/components/TicketPassPage";

export const metadata: Metadata = { title: "Liftoff Pass", description: "Liftoff Pass eligibility, inclusions and release dates for DevFest Indore 2026 on November 28 at Essentia Luxury Hotel." };

export default function PassPage() {
  return <TicketPassPage category="liftoff" />;
}
