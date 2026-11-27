import type { Metadata } from "next";
import PassDesk from "./PassDesk";

export const metadata: Metadata = {
  title: "Passport desk",
  robots: { index: false, follow: false },
};

export default function PassDeskPage() {
  return <PassDesk />;
}
