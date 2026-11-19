import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import MissionCta from "@/components/badge/MissionCta";
import BadgeMaker from "@/components/badge/BadgeMaker";
import { PAGE_COPY } from "@/content/copy";
import { pageMetadata } from "@/lib/pageMetadata";

const copy = PAGE_COPY.badge;
export const metadata = pageMetadata("/badge", "Make your badge", copy.description);

export default function BadgePage() {
  return (
    <div className="audience-site space-subpage practical-page">
      <Navbar />
      <main id="main-content">
        <PageIntro title={copy.title} lead={copy.lead} />
        <BadgeMaker />
        <MissionCta />
      </main>
      <Footer />
    </div>
  );
}
