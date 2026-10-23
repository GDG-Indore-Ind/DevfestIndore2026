import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Team & Organizers",
  description: "Meet the GDG Indore organizers and steering committee behind DevFest Indore 2026.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
