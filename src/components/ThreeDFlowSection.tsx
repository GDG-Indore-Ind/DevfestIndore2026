"use client";

import { useState } from "react";
import {
  Rocket,
  BrainCircuit,
  Cpu,
  Database,
  Briefcase,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface FlowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: "blue" | "red" | "yellow" | "green";
  icon: any;
}

const FLOW_STEPS: FlowStep[] = [
  {
    step: "01",
    title: "Keynote & Space Horizon",
    subtitle: "Main Auditorium Launch",
    description:
      "Plenary opening spotlighting Madhya Pradesh's emerging space-technology frontier, satellite data platforms, and planetary developer opportunities.",
    tags: ["Space Frontier", "Space Club of India", "Satellite Data"],
    color: "blue",
    icon: Rocket,
  },
  {
    step: "02",
    title: "Agentic AI & Neural Loops",
    subtitle: "Workshop Track 1",
    description:
      "Hands-on architectural deep-dives into autonomous agent swarms, multi-modal reasoning loops, code agents, and enterprise guardrails with Google Developer Experts.",
    tags: ["Multi-Agent Swarms", "Vertex AI", "Code Workflows"],
    color: "red",
    icon: BrainCircuit,
  },
  {
    step: "03",
    title: "Physical AI & Edge Robotics",
    subtitle: "Workshop Track 2 & Qualcomm Showcase",
    description:
      "Where software meets silicon: sensor integration, autonomous robotics control loops, spatial compute, and demonstration-led hardware displays.",
    tags: ["Qualcomm Showcase", "Edge Silicon", "Robotics Control"],
    color: "yellow",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Data Foundations & Enterprise Scale",
    subtitle: "Architecture Sessions",
    description:
      "Vector search indexing, resilient distributed cloud deployments on Kubernetes, real-time data streaming, and building AI-ready data infrastructure.",
    tags: ["Data Pipelines", "Zero Downtime", "Distributed Cloud"],
    color: "green",
    icon: Database,
  },
  {
    step: "05",
    title: "Ecosystem Recap & Lounges",
    subtitle: "Experts' Lounge & Community Huddles",
    description:
      "Closing discussions, 1-on-1 enterprise interactions, community dinners, and actionable collaborative partnerships forged across Central India.",
    tags: ["VIP Experts' Lounge", "Community Lounge", "600+ Leaders"],
    color: "blue",
    icon: Users,
  },
];

const colorBorderMap = {
  blue: "hover:border-[#4285f4] border-gray-200",
  red: "hover:border-[#ea4335] border-gray-200",
  yellow: "hover:border-[#f9ab00] border-gray-200",
  green: "hover:border-[#34a853] border-gray-200",
};

const colorBgMap = {
  blue: "bg-[#4285f4]",
  red: "bg-[#ea4335]",
  yellow: "bg-[#f9ab00]",
  green: "bg-[#34a853]",
};

export default function ThreeDFlowSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = FLOW_STEPS[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section className="py-12 md:py-16 bg-[#fafbfc] transition-colors relative overflow-hidden">
      {/* 3D Flow Grid Pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm mb-4">
            <Layers className="w-3.5 h-3.5 text-[#4285f4]" />
            <span>3D Journey & Ecosystem Progression</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1e1e1e] tracking-tight mb-4">
            The DevFest Collective Flow
          </h2>
          <p className="text-base sm:text-lg text-[#5f6368] leading-relaxed">
            A cohesive 5-stage experiential path designed to guide 600+ attendees through discovery, hands-on labs, product showcases, and high-impact ecosystem networking.
          </p>
        </div>

        {/* 3D Interactive Horizontal Track & Focus Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Step Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {FLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-white border-[#1e1e1e] shadow-lg scale-[1.02]"
                      : "bg-white/60 border-gray-200 hover:border-gray-400 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        isActive
                          ? `${colorBgMap[step.color]} text-white`
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1e1e1e] group-hover:text-[#4285f4] transition-colors">
                        {step.title}
                      </div>
                      <div className="text-[11px] text-[#5f6368]">{step.subtitle}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-[#4285f4] translate-x-1" : "text-gray-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 3D Focused Preview Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 border-2 border-[#1e1e1e] google-pill-shadow relative overflow-hidden transition-all duration-500">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl ${colorBgMap[activeStep.color]} text-white flex items-center justify-center shadow-lg`}
                  >
                    <ActiveIcon className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">
                      Stage {activeStep.step} of 05
                    </span>
                    <h3 className="text-2xl font-black text-[#1e1e1e]">
                      {activeStep.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-[#1e1e1e] border border-gray-300">
                  {activeStep.subtitle}
                </span>
              </div>

              <p className="text-base text-[#1e1e1e]/85 leading-relaxed mb-8">
                {activeStep.description}
              </p>

              <div className="mb-8">
                <div className="text-xs font-bold text-[#5f6368] uppercase tracking-wider mb-3">
                  Core Deliverables & Highlights:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeStep.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1e1e1e] shadow-sm flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#f9ab00]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-[#1e1e1e] flex items-center justify-between">
                <span>
                  Experience scheduled across <strong>Essentia Luxury Hotel Indore</strong>
                </span>
                <span className="font-extrabold text-[#4285f4]">28 Nov 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
