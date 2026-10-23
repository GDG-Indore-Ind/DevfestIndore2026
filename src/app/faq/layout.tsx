import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Everything you need to know about DevFest Indore 2026: event schedule, venue directions, workshops, passes, and attendance guidelines.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
