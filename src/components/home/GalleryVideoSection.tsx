import GalleryStrip from "./GalleryStrip";
import PressStrip from "./PressStrip";
import SectionHeader from "@/components/shared/SectionHeader";
import { HOME_PAGE } from "@/content/pages";

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
      </div>
    </section>
  );
}
