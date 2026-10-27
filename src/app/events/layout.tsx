import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "/events",
  "Workshops & events",
  "GDG Indore workshops, community events and campus sessions, with official past-event records.",
);
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
