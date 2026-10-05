"use client";

import { useState } from "react";
import { FAQS } from "@/data/devfestData";
import { HelpCircle, ChevronDown, ChevronUp, Mail } from "lucide-react";
import CardTilt from "./CardTilt";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#000000] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 google-pill-shadow mb-4 hover:scale-105 transition-transform">
            <HelpCircle className="w-4 h-4 text-[#f9ab00]" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked <span className="text-[#f9ab00]">Questions</span>
          </h2>
          <p className="mt-4 text-base text-white/55 font-medium leading-relaxed">
            Everything you need to know about passes, registration, codelabs, food, and attending DevFest Indore 2026.
          </p>
        </div>

        {/* FAQ Accordion — dark glass */}
        <div className="space-y-4 mb-14">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#0d0d0d] rounded-2xl border border-white/10 google-pill-shadow overflow-hidden transition-all spotlight-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-black text-white">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/8 border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/40" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-white/70 font-medium leading-relaxed border-t border-white/8 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Strip — dark green tint */}
        <CardTilt className="bg-[#34a853]/8 border border-[#34a853]/25 p-6 sm:p-8 rounded-3xl google-pill-shadow flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left reveal-on-scroll">
          <div>
            <h4 className="text-lg font-black text-white">Still have queries or need assistance?</h4>
            <p className="text-xs sm:text-sm text-white/55 mt-0.5">
              Our organizing team is happy to help with campus group bookings, speaker inquiries, or accessibility.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:gdgindore@gmail.com"
              className="px-5 py-2.5 rounded-xl bg-[#34a853] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#2d9247] hover:scale-105 transition-all cursor-pointer shadow-[0_0_15px_rgba(52,168,83,0.4)]"
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
