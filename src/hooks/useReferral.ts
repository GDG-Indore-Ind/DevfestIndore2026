"use client";

import { useSyncExternalStore } from "react";
import { getKonfHubUrl, getStoredReferral } from "@/lib/referral";

function subscribe(onChange: () => void) {
  window.addEventListener("devfest-referral-update", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("devfest-referral-update", onChange);
    window.removeEventListener("storage", onChange);
  };
}

// A primitive snapshot stays stable between storage updates. Server rendering
// starts without a coupon so saved browser data never creates a hydration mismatch.
const getCoupon = () => getStoredReferral().coupon ?? "";
const getServerCoupon = () => "";

export function useReferral() {
  const coupon = useSyncExternalStore(subscribe, getCoupon, getServerCoupon);
  return { coupon, url: getKonfHubUrl(coupon) };
}
