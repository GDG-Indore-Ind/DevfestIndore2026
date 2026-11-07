import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import { SPACE_CLUB_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/space-club", page.title, page.description);

export default function SpaceClubPage() {
  return (
    <div className="audience-site space-subpage">
      <Navbar />
      <main id="main-content">
        <PageIntro title={page.title} lead={page.lead} motif="orbit" />
        <section className="audience-section" aria-labelledby="coming-soon-title">
          <div className="audience-wrap">
            <h2 id="coming-soon-title">{page.heading}</h2>
            <p className="audience-body">{page.body}</p>
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/agenda" icon="calendar" tone="blue">
            See the agenda
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
