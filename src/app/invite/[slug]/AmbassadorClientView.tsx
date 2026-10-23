"use client";

import { EVENT, EVENT_DATE, EVENT_SHORT_DATE } from "@/content/event";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Check,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { PageMark } from "@/components/shared/PageIntro";
import { persistReferral, type Ambassador } from "@/lib/referral";

interface AmbassadorClientViewProps {
  slug: string;
  ambassador: Ambassador;
}

export default function AmbassadorClientView({ slug, ambassador }: AmbassadorClientViewProps) {
  const [copied, setCopied] = useState(false);

  // Persist the referral coupon immediately on first load
  useEffect(() => {
    persistReferral(ambassador.coupon, ambassador);
  }, [ambassador]);

  function handleCopyCoupon() {
    navigator.clipboard.writeText(ambassador.coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // Generate WhatsApp share text & link
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/invite/${slug}`
      : `https://devfest.gdgindore.in/invite/${slug}`;

  const shareText = `Hey! ${ambassador.name} invited you to ${EVENT.name} on ${EVENT_SHORT_DATE} at ${EVENT.venue.name}. 🚀 Explore the passes and use referral code *${ambassador.coupon}* at checkout. Eligibility and any discount are confirmed there: ${currentUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="ambassador-experience">
      {/* Personalized Header Banner */}
      <section id="invitation" className="ambassador-hero-banner" aria-labelledby="invite-headline">
        <div className="audience-wrap">
          <div className="space-invite-grid">
            <div>
              <div className="ambassador-badge-strip">
                <span className="ambassador-campus-tag">
                  <GraduationCap className="audience-icon" aria-hidden="true" />
                  {ambassador.college}
                </span>
                <span className="ambassador-verified-tag">
                  <ShieldCheck className="audience-icon" aria-hidden="true" />
                  Campus ambassador
                </span>
              </div>

              <h1 id="invite-headline" className="ambassador-title">
                <span className="ambassador-name-highlight">{ambassador.name}</span> invites you to
                DevFest.
              </h1>

              <p className="ambassador-subtitle">
                Your referral code is ready. Find your pass and join us on {EVENT_SHORT_DATE}.
              </p>

              {/* Event Quick Facts */}
              <div className="ambassador-event-meta">
                <div className="meta-fact">
                  <Calendar className="audience-icon" aria-hidden="true" />
                  <span>{EVENT_DATE}</span>
                </div>
                <div className="meta-fact">
                  <MapPin className="audience-icon" aria-hidden="true" />
                  <span>
                    {EVENT.venue.name}, {EVENT.venue.city}
                  </span>
                </div>
                <div className="meta-fact">
                  <Sparkles className="audience-icon" aria-hidden="true" />
                  <span>AI, cloud & modern systems</span>
                </div>
              </div>
            </div>
            <PageMark motif="tickets" />
          </div>
        </div>
      </section>

      {/* Pass Offer & Checkout Card */}
      <section id="referral" className="ambassador-pass-section">
        <div className="audience-wrap">
          <div className="ambassador-pass-card">
            <div className="pass-card-left">
              <h2>Find your place at DevFest.</h2>
              <p className="pass-desc">
                Compare upcoming passes, eligibility, inclusions and how to join us.
              </p>
            </div>

            <div className="pass-card-right">
              <div className="pricing-box">
                <span className="pricing-eyebrow">Your referral</span>
                <p className="price-caption">
                  Your code goes with you to checkout. Pricing, eligibility and any discount are
                  confirmed there.
                </p>
                <Link
                  href="/tickets"
                  className="audience-button pass-checkout-cta"
                  id="register-cta"
                >
                  Get tickets <ArrowRight className="audience-icon" aria-hidden="true" />
                </Link>
              </div>

              {/* Coupon Box & WhatsApp Sharing */}
              <div className="ambassador-tools">
                <div className="coupon-copy-row">
                  <span className="tool-label">Your code</span>
                  <div className="coupon-code-pill">
                    <code>{ambassador.coupon}</code>
                    <button
                      type="button"
                      onClick={handleCopyCoupon}
                      className="copy-btn"
                      aria-label="Copy coupon code"
                    >
                      {copied ? (
                        <>
                          <Check className="audience-icon" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="audience-icon" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-share-btn"
                >
                  <Share2 className="audience-icon" aria-hidden="true" />
                  <span>Share invitation with college peers</span>
                </a>
              </div>
            </div>
          </div>

          {/* Secondary reassurance strip */}
          <div className="ambassador-footer-note">
            <p>
              Need a few details first? <Link href="/tickets">Explore tickets</Link> or{" "}
              <Link href="/faq">read the registration FAQ</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
