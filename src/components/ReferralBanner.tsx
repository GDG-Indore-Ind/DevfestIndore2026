"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X, ArrowRight, Tag } from "lucide-react";
import { getStoredReferral, type Ambassador } from "@/lib/referral";

export default function ReferralBanner() {
  const [data, setData] = useState<{ coupon: string | null; ambassador: Ambassador | null }>({
    coupon: null,
    ambassador: null,
  });
  const [dismissed, setDismissed] = useState(false);

  function syncReferral() {
    const stored = getStoredReferral();
    setData(stored);
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(syncReferral);
    const handleUpdate = () => syncReferral();
    window.addEventListener("devfest-referral-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("devfest-referral-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  if (!data.coupon || dismissed) return null;


  return (
    <div className="referral-global-banner" role="status" aria-live="polite">
      <div className="audience-wrap referral-banner-inner">
        <div className="referral-banner-text">
          <span className="referral-banner-tag">
            <Tag className="audience-icon" aria-hidden="true" />
            Referral saved
          </span>
          <p>
            Code <code>{data.coupon}</code> is saved. Eligibility and any discount are confirmed at checkout.
          </p>
        </div>

        <div className="referral-banner-actions">
          <Link
            href="/tickets"
            className="referral-banner-cta"
          >
            <span>Ticket details</span>
            <ArrowRight className="audience-icon" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="referral-banner-close"
            aria-label="Dismiss referral notification"
          >
            <X className="audience-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
