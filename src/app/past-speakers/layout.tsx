import { pageMetadata } from "@/lib/pageMetadata";
import type { ReactNode } from "react";

export const metadata = pageMetadata(
  "/past-speakers",
  "Past speakers",
  "Explore speakers and topics from previous DevFest Indore editions.",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
