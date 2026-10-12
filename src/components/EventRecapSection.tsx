"use client";

import { Award, Users, BookOpen, Rocket, CheckCircle2, HeartHandshake } from "lucide-react";

export default function EventRecapSection() {
  const recapMetrics = [
    {
      metric: "600+",
      label: "Professional Attendees",
      sub: "Engineers, founders & enterprise leaders",
      color: "text-[#4285f4]",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      metric: "5 Pillars",
      label: "Integrated Curriculum",
      sub: "Space Tech, Agentic AI, Physical AI, Data & Enterprise",
      color: "text-[#ea4335]",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      metric: "2 Parallel",
      label: "Hands-on Workshop Tracks",
      sub: "Autonomous Agents & Satellite / Edge Sensors",
      color: "text-[#f9ab00]",
      bgColor: "bg-amber-50 border-amber-200",
    },
    {
      metric: "1 Historic MOU",
      label: "Space Club of India Planned MOU",
      sub: "Unlocking space-data & aerospace awareness in MP",
      color: "text-[#34a853]",
      bgColor: "bg-green-50 border-green-200",
    },
  ];

  return (
    <section className="py-20 bg-white transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gray-50 via-white to-blue-50/30 border-2 border-[#1e1e1e] google-pill-shadow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm mb-4">
              <Award className="w-3.5 h-3.5 text-[#34a853]" />
              <span>Executive Summary & Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e1e1e] tracking-tight mb-3">
              DevFest Indore 2026 Comprehensive Recap
            </h2>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              Designed not merely as a talk-track conference, but as the cornerstone catalyst for Central India's burgeoning technology, robotics, and aerospace ecosystem.
            </p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {recapMetrics.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${item.bgColor} flex flex-col justify-between`}
              >
                <div>
                  <div className={`text-3xl sm:text-4xl font-black mb-1 ${item.color}`}>
                    {item.metric}
                  </div>
                  <div className="font-bold text-sm text-[#1e1e1e] mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-[#5f6368] leading-relaxed">
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200 text-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4285f4] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1e1e1e] font-bold mb-1">
                  Verified Professional Profile
                </strong>
                <p className="text-[#5f6368] leading-relaxed">
                  Carefully vetted participant profile prioritizing software engineers, enterprise architects, and technology innovators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-[#ea4335] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1e1e1e] font-bold mb-1">
                  Madhya Pradesh Orbit
                </strong>
                <p className="text-[#5f6368] leading-relaxed">
                  Connecting grassroots students and developers with real aerospace entrepreneurs and private space ventures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-[#34a853] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1e1e1e] font-bold mb-1">
                  Tangible Next Steps
                </strong>
                <p className="text-[#5f6368] leading-relaxed">
                  Protected time for product demos, startup angel conversations, and follow-through collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
