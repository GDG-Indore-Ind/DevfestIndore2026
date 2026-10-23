import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Workshops & events",
  description:
    "GDG Indore workshops, community events and campus sessions, with official past-event records.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
