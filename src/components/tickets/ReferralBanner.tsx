"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getStoredReferral } from "@/lib/referral";

const DISMISSED_REFERRAL_KEY = "devfest-dismissed-referral";

import styles from "./ReferralBanner.module.css";

export default function ReferralBanner() {
  const [coupon, setCoupon] = useState<string | null>(null);
  const [dismissedCoupon, setDismissedCoupon] = useState<string | null>(null);

  function syncReferral() {
    setCoupon(getStoredReferral().coupon);
    try {
      setDismissedCoupon(sessionStorage.getItem(DISMISSED_REFERRAL_KEY));
    } catch {
      /* Dismissal still works for this page. */
    }
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

  if (!coupon || coupon === dismissedCoupon) return null;

  function dismiss() {
    setDismissedCoupon(coupon);
    if (coupon)
      try {
        sessionStorage.setItem(DISMISSED_REFERRAL_KEY, coupon);
      } catch {
        /* Storage may be unavailable. */
      }
  }

  return (
    <div className={styles.root} role="status" aria-live="polite">
      <div className={"audience-wrap" + " " + styles.inner}>
        <p className={styles.message}>
          Referral code <strong>{coupon}</strong> is saved. Eligibility and any discount are
          confirmed at checkout.
        </p>
        <button
          type="button"
          className={styles.close}
          onClick={dismiss}
          aria-label="Dismiss referral notification"
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
