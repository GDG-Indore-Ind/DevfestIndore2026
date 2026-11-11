import ContentAction from "@/components/shared/ContentAction";
import ContentActionGroup from "@/components/shared/ContentActionGroup";
import { Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import { EVENT, EVENT_DATE, REGISTRATION_TIME } from "@/content/event";
import { VENUE_PAGE as page } from "@/content/pages";
import { pageMetadata } from "@/lib/pageMetadata";
import styles from "./page.module.css";

export const metadata = pageMetadata("/venue", "Venue & directions", page.description);

export default function VenuePage() {
  const map = `https://maps.google.com/maps?q=${EVENT.venue.latitude},${EVENT.venue.longitude}&z=16&output=embed`;
  return (
    <div className={`audience-site space-subpage practical-page venue-page ${styles.root}`}>
      <Navbar />
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
              <ContentAction href={EVENT.venue.mapUrl} icon="venue" tone="blue" external>
                Get directions
              </ContentAction>
            </div>
          </PageIntro>
        </div>
        <section
          className="audience-section practical-map-section"
          id="venue-map"
          aria-labelledby="venue-map-title"
        >
          <div className={`audience-wrap venue-arrival-grid ${styles.arrivalGrid}`}>
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
              <p className="audience-body">{page.entrySummary}</p>
              <ContentAction href="/faq#entry" icon="guidelines" tone="blue">
                Pass requirements
              </ContentAction>
            </div>
          </div>
        </section>
        <ContentActionGroup>
          <ContentAction href="/tickets" icon="tickets" tone="blue">
            Get tickets
          </ContentAction>
          <ContentAction href="/agenda" icon="microphone" tone="yellow">
            See the agenda
          </ContentAction>
        </ContentActionGroup>
      </main>
      <Footer />
    </div>
  );
}
