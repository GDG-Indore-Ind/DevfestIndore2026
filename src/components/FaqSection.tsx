"use client";

import { useState } from "react";
import { FAQS } from "@/data/devfestData";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Sparkles } from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";

export default function FaqSection() {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[var(--page-bg,#000000)] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <HelpCircle className="w-4 h-4 text-[#f9ab00]" />
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Mission Debrief • Protocols
            </span>
            <span className="text-xs text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Frequently Asked <span className="text-[#f9ab00]">Questions</span>
          </h2>
          <p className={`mt-4 text-base font-medium leading-relaxed ${
            isDark ? "text-white/60" : "text-gray-600"
          }`}>
            Everything you need to know about passes, registration, codelabs, food, and attending DevFest Indore 2026.
          </p>
        </div>

        {/* FAQ Accordion — space telemetry glass */}
        <div className="space-y-4 mb-14">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl google-pill-shadow overflow-hidden transition-all spotlight-card reveal-on-scroll border ${
                  isDark ? "bg-[#0d0d0d]/90 border-white/10" : "!bg-white !border-gray-200/90 shadow-sm"
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none transition-colors ${
                    isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isDark ? "bg-white/8 border-white/20 text-white" : "bg-gray-100 border-gray-200 text-gray-800"
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-60" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-5 pb-6 sm:px-6 text-sm font-medium leading-relaxed border-t pt-4 animate-in fade-in duration-200 ${
                    isDark ? "border-white/8 text-white/70" : "border-gray-100 text-gray-600"
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Strip */}
        <CardTilt className={`border p-6 sm:p-8 rounded-3xl google-pill-shadow flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left reveal-on-scroll ${
          isDark ? "bg-[#34a853]/8 border-[#34a853]/25" : "bg-emerald-50/70 border-emerald-200/80 shadow-md"
        }`}>
          <div>
            <h4 className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              Still have queries or need flight assistance?
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? "text-white/55" : "text-gray-600"}`}>
              Our organizing crew is happy to help with campus group bookings, speaker inquiries, or accessibility.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:gdgindore@gmail.com"
              className="px-5 py-2.5 rounded-xl bg-[#34a853] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#2d9247] hover:scale-105 transition-all cursor-pointer shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Support</span>
            </a>
          </div>
        </CardTilt>
      </div>
    </section>
  );
}
