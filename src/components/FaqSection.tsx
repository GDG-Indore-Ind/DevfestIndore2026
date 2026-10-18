"use client";

import { useState, useEffect } from "react";
import { FAQS } from "@/data/devfestData";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Sparkles } from "lucide-react";
import CardTilt from "./CardTilt";
import { useTheme } from "@/contexts/ThemeContext";
import { getFaqItems, FaqItem } from "@/lib/firestoreService";

export default function FaqSection() {
  const { isDark } = useTheme();
  const [faqs, setFaqs] = useState<FaqItem[]>(() =>
    FAQS.map((f, idx) => ({ id: `faq-${idx + 1}`, ...f }))
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    getFaqItems().then((items) => {
      if (items && items.length > 0) {
        setFaqs(items);
      }
    });
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-transparent relative transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <p className={`mt-4 text-base sm:text-lg font-medium leading-relaxed ${
            isDark ? "text-white/85" : "text-gray-700"
          }`}>
            Everything you need to know about passes, registration, codelabs, food, and attending DevFest Indore 2026.
          </p>
        </div>

        {/* FAQ Accordion — space telemetry glass */}
        <div className="space-y-4 mb-14">
          {faqs.map((faq, idx) => {
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
                  <div className={`px-5 pb-6 sm:px-6 text-sm sm:text-[15px] font-normal leading-relaxed border-t pt-4 animate-in fade-in duration-200 ${
                    isDark ? "border-white/8 text-white/85" : "border-gray-100 text-gray-700"
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
