import ContentAction from "@/components/shared/ContentAction";
import Link from "next/link";
import { Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";

export default function NotFound() {
  return (
    <div className="audience-site space-subpage">
      <Navbar
        flightStops={[
          { id: "page-overview", label: "Overview" },
          { id: "recovery", label: "Find your way" },
        ]}
      />
      <main id="main-content">
        <PageIntro
          title="A little off orbit."
          lead="That page isn’t here. Let’s get you back to DevFest."
          motif="guide"
          meta="404 · Page not found"
        />
        <section className="audience-section" id="recovery">
          <div className="audience-wrap space-recovery-actions">
            <Link href="/" className="audience-button space-primary-button">
              <Home className="audience-icon" aria-hidden="true" />
              Back to DevFest
            </Link>
            <ContentAction href="/#flow" icon="themes" tone="yellow">
              Explore the themes
            </ContentAction>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
