import { EVENT, REGISTRATION_TIME } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";
import Image from "next/image";
import ContentAction from "@/components/shared/ContentAction";
import ContentIcon from "@/components/shared/ContentIcon";

export default function VenueSection({ showDetailsLink = true }: { showDetailsLink?: boolean }) {
  return (
    <section
      className="audience-section audience-venue-band"
      id="venue"
      aria-labelledby="venue-title"
    >
      <div className="audience-wrap audience-venue-grid">
        <div className="audience-section-heading">
          <p className="explore-section-eyebrow">Getting here</p>
          <h2 id="venue-title">
            <ContentIcon name="venue" tone="red" heading />
            See you at Essentia.
          </h2>
          <p className="venue-lead">
            {HOME_PAGE.venueLead.replace("{{registrationTime}}", REGISTRATION_TIME)}
          </p>

          <address className="audience-body venue-address">
            <ContentIcon name="venue" tone="red" />
            <span>{EVENT.venue.address}</span>
          </address>

          <div className="venue-actions">
            <ContentAction href={EVENT.venue.mapUrl} icon="directions" tone="green" external>
              Get directions
            </ContentAction>
            {showDetailsLink && (
              <ContentAction href="/venue" icon="venue" tone="red">
                Plan your arrival
              </ContentAction>
            )}
          </div>
        </div>

        <div className="venue-photo-wrapper">
          <Image
            src={EVENT.venue.photo}
            alt={`${EVENT.venue.fullName}, the venue for ${EVENT.name}`}
            width={800}
            height={540}
            sizes="(max-width: 760px) 100vw, 60vw"
            className="audience-venue-photo"
          />
          <span className="venue-photo-tag">{EVENT.venue.tag}</span>
        </div>
      </div>
    </section>
  );
}
