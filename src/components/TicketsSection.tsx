
"use client";

import { useState } from "react";
import {
  Ticket,
  Check,
  Sparkles,
  QrCode,
} from "lucide-react";
import confetti from "canvas-confetti";
import CardTilt from "./CardTilt";

type BadgeColor = "blue" | "green" | "yellow" | "red";

export default function TicketsSection() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Badge Generator State
  const [attendeeName, setAttendeeName] = useState("Aarav Sharma");
  const [attendeeRole, setAttendeeRole] = useState("Full Stack Engineer");
  const [attendeeOrg, setAttendeeOrg] = useState("Indore Tech Community");
  const [badgeColor, setBadgeColor] = useState<BadgeColor>("blue");
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
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

  const getBadgeAccent = () => {
    switch (badgeColor) {
      case "blue":
        return {
          lanyard: "bg-[#4285f4]",
          header: "bg-[#4285f4] text-white shadow-[0_0_15px_rgba(66,133,244,0.4)]",
          border: "border-[#4285f4]",
          subtext: "text-[#4285f4]",
        };
      case "green":
        return {
          lanyard: "bg-[#34a853]",
          header: "bg-[#34a853] text-white shadow-[0_0_15px_rgba(52,168,83,0.4)]",
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
          header: "bg-[#ea4335] text-white shadow-[0_0_15px_rgba(234,67,53,0.4)]",
          border: "border-[#ea4335]",
          subtext: "text-[#ea4335]",
        };
    }
  };

  return (
    <section id="tickets" className="py-20 md:py-28 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <Ticket className="w-4 h-4 text-[#4285f4]" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Conference Passes & Registration
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Reserve Your Spot at{" "}
            <span className="text-[#34a853]">DevFest Indore</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/55 font-medium leading-relaxed">
            All passes grant complete access to keynotes, workshops, official
            attendee kit, and our famous Indori breakfast, hot buffet lunch,
            and high-tea!
          </p>
        </div>

        {/* Single Ticket Booking CTA — dark glass */}
        <div className="max-w-5xl mx-auto mb-20 reveal-on-scroll">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] google-card-shadow p-6 sm:p-8 md:p-10 transition-all duration-300 hover:-translate-y-1">
            {/* Google Color Accent top bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00]" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* CTA Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4">
                  <Ticket className="w-4 h-4 text-[#4285f4]" />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white">
                    Secure Checkout • KonfHub
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  Book Your Pass Now
                </h3>

                <p className="mt-3 text-sm sm:text-base text-white/60 font-medium leading-relaxed max-w-2xl">
                  Be a part of DevFest Indore 2026. Grab your pass and join
                  us for an amazing day of learning, networking, and
                  technology!
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5 text-[10px] sm:text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#34a853]" />
                    Certificate of Participation
                  </span>

                  <span className="hidden sm:block text-white/20">|</span>

                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#34a853]" />
                    Official DevFest Swag Kit
                  </span>
                </div>
              </div>

              {/* Single Booking Button */}
              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleOpenCheckout}
                  className="w-full md:w-auto min-w-[190px] px-6 py-4 rounded-2xl bg-[#f9ab00] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-[#f9ab00]/50 shadow-[0_0_20px_rgba(249,171,0,0.4)] hover:bg-[#e09900] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Grab Your Pass</span>
                </button>

                <p className="text-[10px] text-white/35 text-center mt-3 font-medium">
                  Secure ticket booking with KonfHub
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Badge Customizer — dark glass */}
        <div
          id="badge-generator"
          className="bg-[#0a0a0a] rounded-3xl border border-white/10 google-card-shadow p-6 sm:p-10 mb-16 reveal-on-scroll"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9ab00]/15 border border-[#f9ab00]/40 text-xs font-black text-[#f9ab00] mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Interactive Attendee Zone</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Design Your DevFest Indore 2026 Badge
            </h3>

            <p className="text-xs sm:text-sm text-white/45 font-medium mt-2">
              Preview your official digital pass, customize your Google color
              lanyard, and claim your conference attendee credentials!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls Form — dark glass card */}
            <div className="lg:col-span-6 bg-[#0d0d0d] border border-white/10 p-6 rounded-2xl space-y-4 spotlight-card">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white mb-1.5">
                  Your Full Name:
                </label>

                <input
                  type="text"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#1a1a1a] font-bold text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#4285f4]"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white mb-1.5">
                  Your Role / Passion:
                </label>

                <select
                  value={attendeeRole}
                  onChange={(e) => setAttendeeRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#1a1a1a] font-bold text-sm text-white focus:outline-none focus:border-[#4285f4] cursor-pointer"
                >
                  <option value="Full Stack Engineer">Full Stack Engineer</option>
                  <option value="Generative AI Specialist">
                    Generative AI Specialist
                  </option>
                  <option value="Cloud & DevOps Architect">
                    Cloud & DevOps Architect
                  </option>
                  <option value="Android & Flutter Developer">
                    Android & Flutter Developer
                  </option>
                  <option value="UI/UX Product Designer">
                    UI/UX Product Designer
                  </option>
                  <option value="Student & Campus Builder">
                    Student & Campus Builder
                  </option>
                  <option value="Tech Founder / CTO">
                    Tech Founder / CTO
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white mb-1.5">
                  Organization / University:
                </label>

                <input
                  type="text"
                  value={attendeeOrg}
                  onChange={(e) => setAttendeeOrg(e.target.value)}
                  placeholder="e.g. SGSITS Indore / Startup"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#1a1a1a] font-bold text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#4285f4]"
                  maxLength={40}
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2">
                  Pick Your Google Accent Color:
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBadgeColor("blue")}
                    className={`w-9 h-9 rounded-full bg-[#4285f4] border-2 cursor-pointer ${
                      badgeColor === "blue"
                        ? "border-white ring-2 ring-blue-400 scale-110"
                        : "border-white/20"
                    } transition-all`}
                    title="Google Blue"
                    aria-label="Select Google Blue"
                  />

                  <button
                    type="button"
                    onClick={() => setBadgeColor("green")}
                    className={`w-9 h-9 rounded-full bg-[#34a853] border-2 cursor-pointer ${
                      badgeColor === "green"
                        ? "border-white ring-2 ring-green-400 scale-110"
                        : "border-white/20"
                    } transition-all`}
                    title="Google Green"
                    aria-label="Select Google Green"
                  />

                  <button
                    type="button"
                    onClick={() => setBadgeColor("yellow")}
                    className={`w-9 h-9 rounded-full bg-[#f9ab00] border-2 cursor-pointer ${
                      badgeColor === "yellow"
                        ? "border-white ring-2 ring-yellow-400 scale-110"
                        : "border-white/20"
                    } transition-all`}
                    title="Google Yellow"
                    aria-label="Select Google Yellow"
                  />

                  <button
                    type="button"
                    onClick={() => setBadgeColor("red")}
                    className={`w-9 h-9 rounded-full bg-[#ea4335] border-2 cursor-pointer ${
                      badgeColor === "red"
                        ? "border-white ring-2 ring-red-400 scale-110"
                        : "border-white/20"
                    } transition-all`}
                    title="Google Red"
                    aria-label="Select Google Red"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClaimBadge}
                  className="w-full py-3.5 rounded-xl bg-[#4285f4] text-white font-extrabold text-xs uppercase tracking-wider border border-[#4285f4]/50 shadow-[0_0_20px_rgba(66,133,244,0.4)] hover:bg-[#3367d6] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>Claim & Celebrate My Badge!</span>
                </button>

                {badgeClaimed && (
                  <p className="text-center text-xs font-bold text-[#34a853] mt-2 animate-bounce">
                    🎉 Badge claimed! See you at DevFest Indore!
                  </p>
                )}
              </div>
            </div>

            {/* Live Badge Preview — dark glass badge */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              {/* Lanyard */}
              <div
                className={`w-14 h-10 ${getBadgeAccent().lanyard} rounded-t-xl border-x border-t border-white/20 flex items-center justify-center animate-float-subtle`}
              >
                <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30" />
              </div>

              {/* Physical Clip */}
              <div className="w-20 h-4 bg-white/25 rounded-md border border-white/20 -mt-1 z-10" />

              {/* Badge Card — dark glass */}
              <CardTilt className="w-full max-w-xs bg-[#0d0d0d] rounded-3xl border border-white/15 google-card-shadow overflow-hidden relative -mt-1">
                <div
                  className={`p-4 text-center ${getBadgeAccent().header} border-b border-white/10`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono font-bold text-sm">{"</>"}</span>
                    <span className="font-black text-sm uppercase tracking-wider">
                      GDG Indore
                    </span>
                  </div>

                  <span className="block text-[11px] font-extrabold opacity-95">
                    DevFest Indore 2026
                  </span>
                </div>

                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-[#1a1a1a] to-[#0d0d0d] border border-white/15 flex items-center justify-center mb-3 shadow-inner hover:scale-105 transition-transform">
                    <span className="text-3xl font-black text-white">
                      {attendeeName.charAt(0) || "D"}
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-white leading-snug">
                    {attendeeName || "DevFest Attendee"}
                  </h4>

                  <p className={`text-xs font-extrabold ${getBadgeAccent().subtext} mt-0.5`}>
                    {attendeeRole}
                  </p>

                  <p className="text-[11px] font-bold text-white/45 mt-0.5">
                    {attendeeOrg}
                  </p>

                  <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="text-left">
                      <span className="block text-[9px] font-mono uppercase text-white/35">
                        PASS: IND-2026-CONF
                      </span>

                      <span className="block text-[10px] font-bold text-white/60">
                        Essentia Luxury Hotel Indore
                      </span>
                    </div>

                    <QrCode className="w-8 h-8 text-white/50" />
                  </div>
                </div>

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

      {/* Single Registration Checkout Modal — dark glass */}
      {isCheckoutOpen && (
        <div
          onClick={() => setIsCheckoutOpen(false)}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-3 pt-24 sm:p-5 sm:pt-28 md:pt-32 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="checkout-modal-scrollbar relative my-0 sm:my-auto w-full max-w-3xl max-h-[calc(100dvh-7rem)] sm:max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0d0d0d] p-4 sm:p-6 md:p-8 google-card-shadow"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute right-3 top-3 sm:right-5 sm:top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white hover:bg-white/15 cursor-pointer transition-colors"
              aria-label="Close registration checkout"
            >
              ✕
            </button>

            {/* Checkout Header */}
            <div className="mb-4 pr-9 sm:mb-5">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#34a853]/40 bg-[#34a853]/20 px-3 py-1 text-[10px] sm:text-xs font-black text-[#34a853]">
                <Ticket className="h-3.5 w-3.5" />
                <span>Registration Checkout</span>
              </div>

              <h3
                id="checkout-title"
                className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight"
              >
                Select Your Tickets
              </h3>

              <p className="mt-2 text-xs sm:text-sm md:text-base font-medium leading-relaxed text-white/55">
                Be a part of DevFest Indore 2026. Choose your ticket and
                complete your registration securely with KonfHub.
              </p>
            </div>

            {/* KonfHub Widget */}
            <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#0d0d0d]">
              <iframe
                src="https://konfhub.com/widget/id/9ed5736d-0044-4e00-a5e3-76f0b58e4fe6"
                id="konfhub-widget"
                title="Select tickets for GDG DevFest Indore 2026"
                width="100%"
                height="420"
                allow="payment"
                className="block h-[360px] w-full border-0 sm:h-[400px] md:h-[420px]"
                loading="lazy"
              />
            </div>

            <p className="mt-3 text-center text-[10px] sm:text-xs font-medium text-white/35">
              Ticket selection and payment are handled securely by KonfHub.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
