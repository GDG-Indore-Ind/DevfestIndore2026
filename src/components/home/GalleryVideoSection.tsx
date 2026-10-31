import ContentIcon from "@/components/shared/ContentIcon";
import PhotoMarquee from "./PhotoMarquee";
import PressStrip from "./PressStrip";
import { HOME_PAGE } from "@/content/pages";

export default function GalleryVideoSection() {
  return (
    <section className="audience-section engineering-history" aria-labelledby="community-title">
      <div className="audience-wrap">
        <div className="edition-section-heading history-heading">
          <h2 id="community-title">
            <ContentIcon name="people" tone="green" heading />
            {HOME_PAGE.historyTitle}
          </h2>
          <p className="audience-body">{HOME_PAGE.historyLead}</p>
        </div>
        <PhotoMarquee />
        <PressStrip />
      </div>
    </section>
  );
}
