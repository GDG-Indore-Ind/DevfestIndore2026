import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Workshops & events",
  description: "Explore GDG Indore workshops and community events.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
