import CommunitySupporters from "./CommunitySupporters";
import GalleryStrip from "./GalleryStrip";
import PressStrip from "./PressStrip";
import SectionHeader from "@/components/shared/SectionHeader";
import { HOME_PAGE } from "@/content/pages";

/** Press, past photos and community logos under one heading, each block headed the same way. */
export default function GalleryVideoSection() {
  return (
    <section className="audience-section engineering-history" aria-labelledby="community-title">
      <div className="audience-wrap">
        <SectionHeader
          id="community-title"
          title={HOME_PAGE.historyTitle}
          lead={HOME_PAGE.historyLead}
        />
        <PressStrip />
        <GalleryStrip />
        <CommunitySupporters />
      </div>
    </section>
  );
}
