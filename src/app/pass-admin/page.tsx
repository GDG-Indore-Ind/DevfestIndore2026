import type { Metadata } from "next";
import PassportDashboard from "./PassportDashboard";

export const metadata: Metadata = {
  title: "Passport dashboard",
  robots: { index: false, follow: false },
};

export default function PassportAdminPage() {
  return <PassportDashboard />;
}
