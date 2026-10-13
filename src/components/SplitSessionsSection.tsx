"use client";

import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Code2,
  Cpu,
  BrainCircuit,
  Rocket,
  Database,
  Layers,
  Sparkles,
  ChevronRight,
  Check,
  CheckCircle2,
  Play,
  Activity,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SessionCard {
  id: string;
  step: string;
  title: string;
  category: string;
  speaker: string;
  speakerRole: string;
  description: string;
  color: "blue" | "red" | "yellow" | "green";
  terminalOutput: string[];
  command: string;
  tags: string[];
}

const SESSIONS_DATA: SessionCard[] = [
  {
    id: "sess-01",
    step: "01",
    title: "Keynote & Space Horizon",
    category: "Space Systems & Orbital Data",
    speaker: "Aerospace Systems Lead & GDG Team",
    speakerRole: "Aerospace Research & Telemetry",
    description:
      "Plenary opening spotlighting Madhya Pradesh's emerging space-technology frontier, satellite ground data pipelines, and developer tooling in Central India.",
    color: "blue",
    command: "gdg telemetry --orbit MP-INDORE --sat-feed live",
    terminalOutput: [
      "[telemetry] Ground station link connected at Essentia Convention Arena",
      "[telemetry] Coordinates locked: 22.7101° N, 75.9039° E • Altitude 553m",
      "[telemetry] Space Club of India real-time telemetry stream synchronized",
      "[telemetry] Live sensor arrays streaming orbital pass telemetry",
      "✓ Status: Telemetry Pipeline Operational • Plenary Stage Active",
    ],
    tags: ["Satellite Data", "Space Tech", "Geospatial APIs"],
  },
  {
    id: "sess-02",
    step: "02",
    title: "Agentic AI & Neural Reasoning Loops",
    category: "Vertex AI & Autonomous Swarms",
    speaker: "Google Developer Experts & AI Architects",
    speakerRole: "Production Machine Learning",
    description:
      "Architectural deep-dives into autonomous agent swarms, tool-use execution loops, multi-modal reasoning models, and production guardrails with Gemini 2.0.",
    color: "red",
    command: "agentic-swarm run --model gemini-2.5-pro --agents 4",
    terminalOutput: [
      "[swarm] Initializing agent orchestrator [Planner, Worker, Verifier]",
      "[swarm] Multi-agent execution graph established in 24ms",
      "[swarm] Autonomous tool dispatch: function_calling_loop() active",
      "[swarm] Deterministic safety boundaries calibrated & healthy",
      "✓ Swarm Consensus: 100% verified • Agentic execution loop running",
    ],
    tags: ["Multi-Agent Swarms", "Gemini Models", "Enterprise AI"],
  },
  {
    id: "sess-03",
    step: "03",
    title: "Physical AI & Edge Silicon Accelerators",
    category: "Qualcomm Showcase & Hardware Demos",
    speaker: "Edge Compute & Robotics Engineers",
    speakerRole: "Embedded Hardware & Systems",
    description:
      "Where high-level models touch real silicon: on-device neural processing, robotics control loops, spatial computing, and hardware showcases.",
    color: "yellow",
    command: "silicon-edge benchmark --npu qualcomm-snapdragon-x",
    terminalOutput: [
      "[npu] Qualcomm Hexagon NPU hardware accelerator detected",
      "[npu] 45 TOPS peak performance verified on physical silicon",
      "[npu] INT4/INT8 low-latency model inference compiled in memory",
      "[npu] Robotics sensor fusion loop latency: 1.2ms (Zero Jitter)",
      "✓ Hardware Pipeline: Edge silicon demo online for exhibition",
    ],
    tags: ["Qualcomm Showcase", "Edge Silicon", "Robotics"],
  },
  {
    id: "sess-04",
    step: "04",
    title: "Distributed Data & Resilient Kubernetes",
    category: "Cloud Native & Vector Infrastructure",
    speaker: "Principal Enterprise Cloud Architects",
    speakerRole: "Distributed Systems & Infrastructure",
    description:
      "Deploying zero-downtime microservices, scalable vector search indices, real-time message streams, and robust data foundations across distributed clouds.",
    color: "green",
    command: "kubectl get pods -n devfest-cloud --field-selector=status.phase=Running",
    terminalOutput: [
      "[k8s] devfest-vector-engine-v2-7df84   1/1   Running   0   48h",
      "[k8s] devfest-realtime-telemetry-9a8   1/1   Running   0   48h",
      "[k8s] devfest-edge-gateway-4f7        1/1   Running   0   48h",
      "[k8s] Multi-zone cluster load balancer health: 100% OK",
      "✓ High-Availability: Distributed mesh verified across regions",
    ],
    tags: ["Distributed Cloud", "Zero Downtime", "Data Pipelines"],
  },
  {
    id: "sess-05",
    step: "05",
    title: "Ecosystem Recap & Executive Networking",
    category: "Leaders' Lounge & Industry Dinners",
    speaker: "Community Leaders & Founders",
    speakerRole: "Startup Founders & Ecosystem Leads",
    description:
      "Closing discussions, 1-on-1 enterprise matchmaking, angel investor roundtables, and actionable collaborations forged across Central India.",
    color: "blue",
    command: "community-network query --region central-india --leads 600",
    terminalOutput: [
      "[network] Convening 600+ vetted engineers, founders & organizers",
      "[network] Malwa Tech corridor partnerships synchronized",
      "[network] Banquet Dining Lawns & VIP Lounge open at Essentia Hotel",
      "[network] Follow-up hackathons & mentoring circles registered",
      "✓ Mission Complete: Central India Developer Ecosystem Activated",
    ],
    tags: ["VIP Lounge", "Founder Roundtable", "600+ Leaders"],
  },
];

export default function SplitSessionsSection() {
  const { isDark } = useTheme();
  const [activeSessionId, setActiveSessionId] = useState<string>("sess-01");
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll Trigger Observer: Synchronizes sticky right terminal with scrolling cards on the left
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-session-id");
            if (id) {
              setActiveSessionId(id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -40% 0px", // triggers when card passes through middle reading area
        threshold: 0.1,
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeSession =
    SESSIONS_DATA.find((s) => s.id === activeSessionId) || SESSIONS_DATA[0];

  return (
    <section id="sessions-split" className="py-12 md:py-20 bg-transparent relative overflow-visible transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full telemetry-card google-pill-shadow text-xs font-black mb-3 hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 text-[#4285f4]" />
            <span className={isDark ? "text-white" : "text-gray-900"}>Live Session Architectures • Scroll-Triggered CLI Flow</span>
            <span className="text-[#f9ab00] cosmic-sparkle">✦</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Curated Sessions & Live CLI Feed
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
            Explore the conference tracks with our split layout: scroll through session deep-dives on the left while monitoring live agentic terminal telemetry fixed on the right.
          </p>
        </div>

        {/* Split Container: Left Stacking Session Cards | Right Sticky Static Terminal Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Column (7 cols): Stacking Cards on Scroll */}
          <div className="lg:col-span-7 pb-28 md:pb-36 relative">
            <div className="space-y-12">
              {SESSIONS_DATA.map((session, index) => {
                const isSelected = activeSessionId === session.id;
                // Sticky top calculation: each card sticks in sequence with a clean 20px offset forming a stacked deck
                const stickyTopRem = 6.5 + index * 1.5;

                return (
                  <div
                    key={session.id}
                    data-session-id={session.id}
                    ref={(el) => {
                      cardRefs.current[session.id] = el;
                    }}
                    onClick={() => setActiveSessionId(session.id)}
                    style={{
                      top: `${stickyTopRem}rem`,
                      zIndex: 10 + index,
                    }}
                    className={`sticky p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                      isSelected
                        ? isDark
                          ? "bg-[#0d0d0d]/95 border-[#4285f4] shadow-[0_16px_50px_rgba(66,133,244,0.35)] scale-[1.01]"
                          : "bg-white/95 border-[#4285f4] shadow-[0_20px_45px_rgba(66,133,244,0.22)] scale-[1.01]"
                        : isDark
                          ? "bg-[#0d0d0d]/90 border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                          : "bg-white/90 border-gray-200/90 hover:border-gray-300 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-xl font-mono font-black text-xs flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#4285f4] text-white shadow-sm"
                            : "bg-[#4285f4]/15 text-[#4285f4]"
                        }`}>
                          {session.step}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#4285f4] uppercase tracking-wider">
                          {session.category}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-colors ${
                        isSelected
                          ? "bg-[#4285f4] text-white border-[#4285f4] shadow-sm font-black"
                          : isDark
                            ? "bg-white/5 border-white/10 text-white/70"
                            : "bg-gray-100 border-gray-200 text-gray-700 font-bold"
                      }`}>
                        {isSelected ? "● SYNCED STREAM" : "CLICK / SCROLL"}
                      </span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-black mb-2 transition-colors ${
                      isSelected
                        ? isDark ? "text-white" : "text-[#1a73e8]"
                        : isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {session.title}
                    </h3>

                    <div className="text-xs font-bold text-[#ea4335] mb-3">
                      {session.speaker} • <span className="text-gray-500 font-medium">{session.speakerRole}</span>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                      {session.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 dark:border-white/10">
                      {session.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                            isSelected
                              ? "bg-[#4285f4]/10 border-[#4285f4]/30 text-[#4285f4]"
                              : isDark
                                ? "bg-white/5 border-white/10 text-white/80"
                                : "bg-gray-100 border-gray-200 text-gray-700"
                          }`}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): Static Sticky GDG Terminal Console */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 z-30">
            <div className="rounded-3xl border-2 border-black/20 dark:border-white/20 bg-[#0c1017] text-white shadow-2xl overflow-hidden font-mono">
              {/* Terminal Window Header Bar */}
              <div className="px-4 py-3 bg-[#161b22] border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-gray-300 font-bold ml-2">gdg-telemetry-engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
                  <span className="text-[11px] text-gray-400 font-semibold">
                    track_{activeSession.step}
                  </span>
                </div>
              </div>

              {/* Terminal Interactive Content */}
              <div className="p-5 text-xs sm:text-[13px] space-y-4">
                {/* Simulated Command prompt */}
                <div className="flex items-center gap-2 text-[#38bdf8] bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                  <span className="text-[#34a853] font-bold">gdg@indore:~$</span>
                  <span className="text-white font-bold">{activeSession.command}</span>
                </div>

                {/* Output Lines with typing cursor */}
                <div className="space-y-2 text-gray-300 bg-black/50 p-4 rounded-xl border border-white/10 shadow-inner">
                  {activeSession.terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.startsWith("✓")
                          ? "text-[#34a853] font-bold"
                          : line.startsWith("[swarm]")
                            ? "text-[#93c5fd]"
                            : line.startsWith("[npu]")
                              ? "text-[#fde047]"
                              : line.startsWith("[telemetry]")
                                ? "text-[#38bdf8]"
                                : line.startsWith("[k8s]")
                                  ? "text-[#86efac]"
                                  : "text-gray-300"
                      }
                    >
                      {line}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-gray-400 pt-2 border-t border-white/5">
                    <span className="inline-block w-2 h-4 bg-[#34a853] animate-pulse" />
                    <span className="text-[11px] text-[#34a853] font-bold">Live Telemetry Stream Active (Zero Dropped Packets)</span>
                  </div>
                </div>

                {/* Terminal Quick Specs Footer */}
                <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block mb-0.5">Active Venue Hall:</span>
                    <span className="font-bold text-white">Main Plenary Auditorium</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block mb-0.5">Stream Protocol:</span>
                    <span className="font-bold text-[#34a853]">WSS Telemetry • Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
