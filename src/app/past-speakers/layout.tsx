import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Past speakers",
  description: "Explore speakers and topics from previous DevFest Indore editions.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
