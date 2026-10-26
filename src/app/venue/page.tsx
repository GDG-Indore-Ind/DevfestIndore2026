import ContentAction from "@/components/shared/ContentAction";
import { Clock3, MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import ExternalLink from "@/components/shared/ExternalLink";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "@/content/event";
import { VENUE_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/venue", "Venue & directions", page.description);

export default function VenuePage() {
  const map = `https://maps.google.com/maps?q=${EVENT.venue.latitude},${EVENT.venue.longitude}&z=16&output=embed`;
  return (
    <div className="audience-site space-subpage practical-page venue-page">
      <Navbar
        flightStops={[
          { id: "page-overview", label: "The venue" },
          { id: "venue-map", label: "Map" },
          { id: "arrival", label: "Check-in" },
        ]}
      />
      <main id="main-content">
        <div id="venue">
          <PageIntro
            title={page.title}
            lead={EVENT.venue.fullName}
            meta={<span>{EVENT_DATE}</span>}
            art={
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
            }
          >
            <address className="audience-body venue-address">
              <MapPin className="audience-icon" aria-hidden="true" />
              <span>{EVENT.venue.address}</span>
            </address>
            <div className="venue-actions">
              <ExternalLink
                href={EVENT.venue.mapUrl}
                className="audience-button venue-directions-btn"
              >
                <Navigation className="audience-icon" aria-hidden="true" />
                Get directions
              </ExternalLink>
            </div>
          </PageIntro>
        </div>
        <section
          className="audience-section practical-map-section"
          id="venue-map"
          aria-labelledby="venue-map-title"
        >
          <div className="audience-wrap venue-arrival-grid">
            <div>
              <h2 id="venue-map-title">{page.mapTitle}</h2>
              <iframe
                className="practical-map"
                title={`Map showing ${EVENT.venue.fullName}`}
                src={map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="practical-arrival" id="arrival">
              <h2>{page.arrivalTitle}</h2>
              <div className="practical-checkin">
                <Clock3 className="audience-icon" aria-hidden="true" />
                <div>
                  <p>{page.registrationLabel}</p>
                  <strong>
                    <time dateTime={EVENT.startsAt}>{REGISTRATION_TIME}</time>
                  </strong>
                </div>
              </div>
              <h3>{page.entryTitle}</h3>
              <p className="audience-body">{page.entrySummary}</p>
              <ContentAction href="/guidelines#entry" icon="guidelines" tone="blue">
                Registration guidelines
              </ContentAction>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
