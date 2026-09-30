"use client";

import { useState } from "react";
import { TICKET_TIERS, TicketTier } from "@/data/devfestData";
import {
  Ticket,
  Check,
  Sparkles,
  Flame,
  QrCode,
  BadgeCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";

export default function TicketsSection() {
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Badge Generator State
  const [attendeeName, setAttendeeName] = useState("Aarav Sharma");
  const [attendeeRole, setAttendeeRole] = useState("Full Stack Engineer");
  const [attendeeOrg, setAttendeeOrg] = useState("Indore Tech Community");
  const [badgeColor, setBadgeColor] = useState<"blue" | "green" | "yellow" | "red">("blue");
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  const handleSelectTier = (tier: TicketTier) => {
    setSelectedTier(tier);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#4285f4", "#ea4335", "#f9ab00", "#34a853"],
    });
  };

  const handleClaimBadge = () => {
    setBadgeClaimed(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#4285f4", "#ea4335", "#f9ab00", "#34a853"],
    });
    setTimeout(() => setBadgeClaimed(false), 3500);
  };

  const getTierColorStyle = (tier: TicketTier) => {
    if (tier.popular) {
      return {
        card: "bg-white border-3 border-[#34a853] google-card-shadow ring-4 ring-[#ccf6c5]",
        badge: "bg-[#ccf6c5] text-[#1e1e1e] border-[#5cdb6d]",
        btn: "bg-[#34a853] text-white hover:bg-[#2d9247]",
      };
    }
    switch (tier.color) {
      case "yellow":
        return {
          card: "bg-white border-3 border-[#1e1e1e] google-pill-shadow",
          badge: "bg-[#ffe7a5] text-[#1e1e1e] border-[#ffd427]",
          btn: "bg-[#f9ab00] text-[#1e1e1e] hover:bg-[#e09900]",
        };
      case "blue":
        return {
          card: "bg-white border-3 border-[#1e1e1e] google-pill-shadow",
          badge: "bg-[#c3ecf6] text-[#1e1e1e] border-[#57caff]",
          btn: "bg-[#4285f4] text-white hover:bg-[#3367d6]",
        };
      case "red":
        return {
          card: "bg-white border-3 border-[#1e1e1e] google-pill-shadow",
          badge: "bg-[#f8d8d8] text-[#ea4335] border-[#ff7daf]",
          btn: "bg-[#ea4335] text-white hover:bg-[#d93025]",
        };
      default:
        return {
          card: "bg-white border-3 border-[#1e1e1e] google-pill-shadow",
          badge: "bg-gray-100 text-[#1e1e1e] border-gray-300",
          btn: "bg-[#1e1e1e] text-white",
        };
    }
  };

  const getBadgeAccent = () => {
    switch (badgeColor) {
      case "blue":
        return {
          lanyard: "bg-[#4285f4]",
          header: "bg-[#4285f4] text-white",
          border: "border-[#4285f4]",
          subtext: "text-[#4285f4]",
        };
      case "green":
        return {
          lanyard: "bg-[#34a853]",
          header: "bg-[#34a853] text-white",
          border: "border-[#34a853]",
          subtext: "text-[#34a853]",
        };
      case "yellow":
        return {
          lanyard: "bg-[#f9ab00]",
          header: "bg-[#f9ab00] text-[#1e1e1e]",
          border: "border-[#f9ab00]",
          subtext: "text-[#f9ab00]",
        };
      case "red":
        return {
          lanyard: "bg-[#ea4335]",
          header: "bg-[#ea4335] text-white",
          border: "border-[#ea4335]",
          subtext: "text-[#ea4335]",
        };
    }
  };

  return (
    <section id="tickets" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1e1e1e] google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Ticket className="w-4 h-4 text-[#4285f4]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#1e1e1e]">
              Conference Passes &amp; Registration
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Reserve Your Spot at <span className="text-[#34a853]">DevFest Indore</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5f6368] font-medium leading-relaxed">
            All passes grant complete access to keynotes, workshops, official attendee kit,
            and our famous Indori breakfast, hot buffet lunch, and high-tea!
          </p>
        </div>

        {/* Pricing Cards Grid with 3D Tilt & Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {TICKET_TIERS.map((tier, idx) => {
            const styles = getTierColorStyle(tier);

            return (
              <div
                key={tier.id}
                className="reveal-on-scroll"
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <CardTilt
                  className={`rounded-3xl p-6 flex flex-col justify-between relative h-full transition-all ${styles.card}`}
                >
                  {/* Popular Pill */}
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#34a853] text-white border-2 border-[#1e1e1e] text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md z-10 animate-bounce">
                      <Flame className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Best Seller</span>
                    </div>
                  )}

                  <div>
                    {/* Top Badge & Tier Name */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${styles.badge}`}
                      >
                        {tier.tag}
                      </span>
                      <span className="text-xs font-bold text-[#34a853] bg-[#ccf6c5] px-2 py-0.5 rounded-md">
                        Available
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#1e1e1e] mb-1">{tier.name}</h3>
                    <p className="text-xs font-medium text-[#5f6368] min-h-[32px] mb-4">
                      {tier.description}
                    </p>

                    {/* Price with Hover Scale */}
                    <div className="p-4 rounded-2xl bg-[#fafbfc] border border-gray-200 mb-6 flex items-baseline gap-2 hover:bg-gray-50 transition-colors">
                      <span className="text-4xl font-black text-[#1e1e1e]">₹{tier.price}</span>
                      {tier.originalPrice && (
                        <span className="text-sm font-bold text-gray-400 line-through">
                          ₹{tier.originalPrice}
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-[#5f6368] ml-auto">
                        + Meals included
                      </span>
                    </div>

                    {/* Perks Checklist */}
                    <div className="space-y-2.5 mb-8">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#5f6368] block">
                        Included With This Pass:
                      </span>
                      {tier.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-semibold text-[#1e1e1e]">
                          <Check className="w-4 h-4 text-[#34a853] shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select Pass CTA Button with Roll-up Text */}
                  <button
                    onClick={() => handleSelectTier(tier)}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${styles.btn}`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span className="roll-text-container">
                      <span className="roll-text-top">Select {tier.name}</span>
                      <span className="roll-text-bottom">Book Pass →</span>
                    </span>
                  </button>
                </CardTilt>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FEATURE: DevFest Indore Digital Badge Customizer               */}
        {/* ========================================================================= */}
        <div
          id="badge-generator"
          className="bg-[#fafbfc] rounded-3xl border-3 border-[#1e1e1e] google-card-shadow p-6 sm:p-10 mb-16 reveal-on-scroll"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe7a5] border border-[#ffd427] text-xs font-black text-[#1e1e1e] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#f9ab00] animate-spin-slow" />
              <span>Interactive Attendee Zone</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#1e1e1e]">
              Design Your DevFest Indore 2026 Badge
            </h3>
            <p className="text-xs sm:text-sm text-[#5f6368] font-medium mt-2">
              Preview your official digital pass, customize your Google color lanyard, and claim your
              conference attendee credentials!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls Form */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border-2 border-[#1e1e1e] space-y-4 spotlight-card">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1e1e1e] mb-1.5">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-sm text-[#1e1e1e] focus:outline-none focus:border-[#4285f4]"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1e1e1e] mb-1.5">
                  Your Role / Passion:
                </label>
                <select
                  value={attendeeRole}
                  onChange={(e) => setAttendeeRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-sm text-[#1e1e1e] focus:outline-none focus:border-[#4285f4] bg-white cursor-pointer"
                >
                  <option value="Full Stack Engineer">Full Stack Engineer</option>
                  <option value="Generative AI Specialist">Generative AI Specialist</option>
                  <option value="Cloud & DevOps Architect">Cloud &amp; DevOps Architect</option>
                  <option value="Android & Flutter Developer">Android &amp; Flutter Developer</option>
                  <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                  <option value="Student & Campus Builder">Student &amp; Campus Builder</option>
                  <option value="Tech Founder / CTO">Tech Founder / CTO</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1e1e1e] mb-1.5">
                  Organization / University:
                </label>
                <input
                  type="text"
                  value={attendeeOrg}
                  onChange={(e) => setAttendeeOrg(e.target.value)}
                  placeholder="e.g. SGSITS Indore / Startup"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-sm text-[#1e1e1e] focus:outline-none focus:border-[#4285f4]"
                  maxLength={40}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1e1e1e] mb-2">
                  Pick Your Google Accent Color:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBadgeColor("blue")}
                    className={`w-9 h-9 rounded-full bg-[#4285f4] border-2 cursor-pointer ${
                      badgeColor === "blue" ? "border-[#1e1e1e] ring-2 ring-blue-300 scale-110" : "border-white"
                    } transition-all`}
                    title="Google Blue"
                  />
                  <button
                    onClick={() => setBadgeColor("green")}
                    className={`w-9 h-9 rounded-full bg-[#34a853] border-2 cursor-pointer ${
                      badgeColor === "green" ? "border-[#1e1e1e] ring-2 ring-green-300 scale-110" : "border-white"
                    } transition-all`}
                    title="Google Green"
                  />
                  <button
                    onClick={() => setBadgeColor("yellow")}
                    className={`w-9 h-9 rounded-full bg-[#f9ab00] border-2 cursor-pointer ${
                      badgeColor === "yellow" ? "border-[#1e1e1e] ring-2 ring-yellow-300 scale-110" : "border-white"
                    } transition-all`}
                    title="Google Yellow"
                  />
                  <button
                    onClick={() => setBadgeColor("red")}
                    className={`w-9 h-9 rounded-full bg-[#ea4335] border-2 cursor-pointer ${
                      badgeColor === "red" ? "border-[#1e1e1e] ring-2 ring-red-300 scale-110" : "border-white"
                    } transition-all`}
                    title="Google Red"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClaimBadge}
                  className="w-full py-3.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#3367d6] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>Claim &amp; Celebrate My Badge!</span>
                </button>
                {badgeClaimed && (
                  <p className="text-center text-xs font-bold text-[#34a853] mt-2 animate-bounce">
                    🎉 Badge claimed! See you at DevFest Indore!
                  </p>
                )}
              </div>
            </div>

            {/* Live Interactive 3D Tilt Badge Preview */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              {/* Lanyard Top Strap */}
              <div className={`w-14 h-10 ${getBadgeAccent().lanyard} rounded-t-xl border-x-2 border-t-2 border-[#1e1e1e] flex items-center justify-center animate-float-subtle`}>
                <div className="w-4 h-4 rounded-full bg-white border border-[#1e1e1e]" />
              </div>

              {/* Physical Clip */}
              <div className="w-20 h-4 bg-gray-400 rounded-md border-2 border-[#1e1e1e] -mt-1 z-10" />

              {/* The Conference Badge Card with 3D Tilt */}
              <CardTilt
                className={`w-full max-w-xs bg-white rounded-3xl border-3 border-[#1e1e1e] google-card-shadow overflow-hidden relative -mt-1`}
              >
                {/* Badge Header Ribbon */}
                <div className={`p-4 text-center ${getBadgeAccent().header} border-b-2 border-[#1e1e1e]`}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono font-bold text-sm">&lt;/&gt;</span>
                    <span className="font-black text-sm uppercase tracking-wider">GDG Indore</span>
                  </div>
                  <span className="block text-[11px] font-extrabold opacity-95">DevFest Indore 2026</span>
                </div>

                {/* Badge Body */}
                <div className="p-6 text-center">
                  {/* Photo Avatar */}
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 border-2 border-[#1e1e1e] flex items-center justify-center mb-3 shadow-inner hover:scale-105 transition-transform">
                    <span className="text-3xl font-black text-[#1e1e1e]">
                      {attendeeName.charAt(0) || "D"}
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-[#1e1e1e] leading-snug">
                    {attendeeName || "DevFest Attendee"}
                  </h4>
                  <p className={`text-xs font-extrabold ${getBadgeAccent().subtext} mt-0.5`}>
                    {attendeeRole}
                  </p>
                  <p className="text-[11px] font-bold text-[#5f6368] mt-0.5">
                    {attendeeOrg}
                  </p>

                  {/* QR Code Barcode Area */}
                  <div className="mt-5 p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="text-left">
                      <span className="block text-[9px] font-mono uppercase text-[#5f6368]">
                        PASS: IND-2026-CONF
                      </span>
                      <span className="block text-[10px] font-bold text-[#1e1e1e]">
                        Brilliant Convention Centre
                      </span>
                    </div>
                    <QrCode className="w-8 h-8 text-[#1e1e1e]" />
                  </div>
                </div>

                {/* Badge Bottom Color Stripe */}
                <div className="h-2 flex">
                  <div className="flex-1 bg-[#4285f4]" />
                  <div className="flex-1 bg-[#ea4335]" />
                  <div className="flex-1 bg-[#f9ab00]" />
                  <div className="flex-1 bg-[#34a853]" />
                </div>
              </CardTilt>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Simulation */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border-3 border-[#1e1e1e] google-card-shadow relative">
            <button
              onClick={() => setSelectedTier(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f0f0] border border-gray-300 font-bold text-sm hover:bg-[#e5e7eb] flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            {!bookingSuccess ? (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccf6c5] border border-[#5cdb6d] text-xs font-black text-[#1e1e1e] mb-3">
                  <Ticket className="w-3.5 h-3.5 text-[#34a853]" />
                  <span>Registration Checkout</span>
                </div>

                <h3 className="text-2xl font-black text-[#1e1e1e] mb-1">
                  {selectedTier.name}
                </h3>
                <p className="text-xs text-[#5f6368] mb-4">{selectedTier.description}</p>

                <div className="p-4 rounded-2xl bg-[#fafbfc] border border-gray-200 mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#5f6368]">Pass Price:</span>
                    <span className="text-lg font-black text-[#1e1e1e]">₹{selectedTier.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#5f6368]">Breakfast &amp; Lunch:</span>
                    <span className="text-xs font-bold text-[#34a853]">Included (₹0)</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-sm font-extrabold text-[#1e1e1e]">Total Payable:</span>
                    <span className="text-xl font-black text-[#4285f4]">₹{selectedTier.price}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={attendeeName}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#1e1e1e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1e1e1e] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#1e1e1e]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3.5 rounded-xl bg-[#34a853] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1e1e1e] google-pill-shadow hover:bg-[#2d9247] cursor-pointer"
                >
                  Confirm &amp; Proceed to Pay ₹{selectedTier.price}
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#ccf6c5] border-2 border-[#34a853] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <BadgeCheck className="w-9 h-9 text-[#34a853]" />
                </div>
                <h3 className="text-2xl font-black text-[#1e1e1e] mb-2">You&#39;re In! 🎉</h3>
                <p className="text-xs sm:text-sm text-[#5f6368] font-medium mb-6">
                  Your registration for <strong>{selectedTier.name}</strong> at DevFest Indore 2026 has been confirmed.
                  A confirmation email with your QR ticket voucher has been dispatched!
                </p>
                <button
                  onClick={() => setSelectedTier(null)}
                  className="w-full py-3 rounded-xl bg-[#1e1e1e] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
