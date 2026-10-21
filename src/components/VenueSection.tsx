import ExternalLink from "@/components/ExternalLink";
import { EVENT, EVENT_WEEKDAY_DATE, REGISTRATION_TIME } from "@/content/event";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";

export default function VenueSection() {
  return (
    <section className="audience-section audience-venue-band" id="venue" aria-labelledby="venue-title">
      <div className="audience-wrap audience-venue-grid">
        <div className="audience-section-heading">
          <p className="explore-section-eyebrow">Getting here</p>
          <h2 id="venue-title">See you at Essentia.</h2>
          <p className="venue-lead">
            Join us at {EVENT.venue.name} on {EVENT_WEEKDAY_DATE}. Registration opens at {REGISTRATION_TIME}.
          </p>

          <address className="audience-body venue-address">
            <MapPin className="audience-icon" aria-hidden="true" />
            <span>{EVENT.venue.address}</span>
          </address>

          <div className="venue-actions">
            <ExternalLink href={EVENT.venue.mapUrl} className="audience-button venue-directions-btn">
              <Navigation className="audience-icon" aria-hidden="true" />
              Open in Google Maps
            </ExternalLink>
          </div>
        </div>

        <div className="venue-photo-wrapper">
          <Image
            src={EVENT.venue.photo}
            alt={`${EVENT.venue.fullName}, the venue for ${EVENT.name}`}
            width={800}
            height={540}
            sizes="(max-width: 760px) 100vw, 45vw"
            className="audience-venue-photo"
          />
          <span className="venue-photo-tag">{EVENT.venue.tag}</span>
        </div>
      </div>
    </section>
  );
}
