import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAmbassador, AMBASSADORS } from "@/lib/referral";
import AmbassadorClientView from "./AmbassadorClientView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(AMBASSADORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ambassador = getAmbassador(slug);

  if (!ambassador) {
    return {
      title: "DevFest Indore 2026 Invitation",
      description: "Join DevFest Indore 2026 on November 28 at Essentia Luxury Hotel Indore.",
    };
  }

  return {
    title: `${ambassador.name} invites you to DevFest Indore 2026`,
    description: `${ambassador.name} from ${ambassador.college} has invited you to DevFest Indore 2026. Explore pass eligibility, release dates and the event on November 28.`,
    openGraph: {
      title: `${ambassador.name} invites you to DevFest Indore 2026`,
      description: `Join the DevFest Indore community on November 28 at Essentia Luxury Hotel. Explore passes and release dates.`,
    },
  };
}

export default async function AmbassadorInvitePage({ params }: PageProps) {
  const { slug } = await params;
  const ambassador = getAmbassador(slug);

  if (!ambassador) {
    notFound();
  }

  return (
    <div className="audience-site space-subpage ambassador-invite-page">
      <Navbar flightStops={[{ id: "invitation", label: "Your invitation" }, { id: "referral", label: "Your referral" }]} />
      <main id="main-content">
        <AmbassadorClientView slug={slug} ambassador={ambassador} />
      </main>
      <Footer />

    </div>
  );
}
