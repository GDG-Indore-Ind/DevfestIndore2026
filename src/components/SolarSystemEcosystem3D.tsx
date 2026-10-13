"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Compass, Rocket, Orbit, Cpu, Globe2, Radio, Zap, Layers } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface TrackPlanet {
  id: string;
  name: string;
  codename: string;
  category: string;
  color: string;
  accent: string;
  radius: number;
  speed: number;
  size: number;
  desc: string;
  keyHighlights: string[];
}

const PLANETS: TrackPlanet[] = [
  {
    id: "space-tech",
    name: "Space Technology",
    codename: "ORBIT-01 // MERCURY",
    category: "Space Club of India Planned MOU",
    color: "#38bdf8",
    accent: "#0284c7",
    radius: 4.8,
    speed: 0.009,
    size: 0.45,
    desc: "Satellite telemetry pipelines, private aerospace startups in Central India, and geospatial intelligence on Google Cloud.",
    keyHighlights: ["Planned Space Club MOU Announcement", "Earth Observation & GIS APIs", "Satellite Edge Compute"],
  },
  {
    id: "agentic-ai",
    name: "Agentic AI & LLMs",
    codename: "ORBIT-02 // VENUS",
    category: "Multi-Agent Systems & Gemini 2.5",
    color: "#ea4335",
    accent: "#b91c1c",
    radius: 6.2,
    speed: 0.0075,
    size: 0.55,
    desc: "Autonomous reasoning agent frameworks, multi-tool evaluation loops, and enterprise agentic workflow deployments.",
    keyHighlights: ["Autonomous Coding Swarms", "Gemini Pro Multimodal Agents", "Enterprise Guardrails"],
  },
  {
    id: "physical-ai",
    name: "Physical AI & Robotics",
    codename: "ORBIT-03 // EARTH",
    category: "Qualcomm NPU Acceleration & Edge Silicon",
    color: "#34a853",
    accent: "#15803d",
    radius: 7.8,
    speed: 0.006,
    size: 0.58,
    desc: "Embodied intelligence, real-time sensor fusion, robotics ROS2 integration, and hardware edge inference.",
    keyHighlights: ["Qualcomm Snapdragon NPU Acceleration", "Real-World Robotic Perception", "Embedded IoT Telemetry"],
  },
  {
    id: "data-cloud",
    name: "Data & Cloud Architecture",
    codename: "ORBIT-04 // MARS",
    category: "High-Throughput Vector DBs & GKE",
    color: "#f9ab00",
    accent: "#b45309",
    radius: 9.4,
    speed: 0.005,
    size: 0.5,
    desc: "Distributed microservices, vector search indexing, BigQuery AI integration, and zero-downtime multi-region failover.",
    keyHighlights: ["GKE Autopilot Clusters", "Vector Search Retrieval", "BigQuery ML Pipelines"],
  },
  {
    id: "enterprise-showcase",
    name: "Enterprise Innovation",
    codename: "ORBIT-05 // JUPITER",
    category: "Product Showcases & Ecosystem Growth",
    color: "#a855f7",
    accent: "#7e22ce",
    radius: 11.2,
    speed: 0.004,
    size: 0.72,
    desc: "Curated startup demos, enterprise technical adoption strategies, corporate sponsor showcases, and CXO networking.",
    keyHighlights: ["Qualcomm & Partner Showcases", "Founder Matchmaking Clinics", "Product Discovery Arenas"],
  },
  {
    id: "modern-web",
    name: "High-Scale Modern Web",
    codename: "ORBIT-06 // SATURN",
    category: "Next.js 16, Turbopack & React 19",
    color: "#ec4899",
    accent: "#be185d",
    radius: 13.0,
    speed: 0.0032,
    size: 0.62,
    desc: "Server Actions, Partial Prerendering, edge computing, WebAssembly execution, and sub-second Core Web Vitals.",
    keyHighlights: ["Next.js App Router Architecture", "Realtime WebSockets", "Progressive Web Performance"],
  },
  {
    id: "mobile-flutter",
    name: "Android & Flutter Ecosystem",
    codename: "ORBIT-07 // URANUS",
    category: "Kotlin Multiplatform & Declarative UI",
    color: "#06b6d4",
    accent: "#0e7490",
    radius: 14.8,
    speed: 0.0026,
    size: 0.52,
    desc: "Compose Multiplatform, Android 15 architectural foundations, on-device Gemini Nano, and cross-platform native engines.",
    keyHighlights: ["Gemini Nano On-Device AI", "Jetpack Compose Ecosystem", "KMP Native Mobile Shared Code"],
  },
  {
    id: "open-source",
    name: "Open Source & Community",
    codename: "ORBIT-08 // NEPTUNE",
    category: "Developer Tooling & Contributions",
    color: "#10b981",
    accent: "#047857",
    radius: 16.5,
    speed: 0.0021,
    size: 0.48,
    desc: "Grassroots developer tooling, GitHub ecosystem contribution, open standards, and Central India dev community.",
    keyHighlights: ["Google Open Source Programs", "DevFest Indore Hackathon", "Peer Knowledge Sharing"],
  },
  {
    id: "workshops-lab",
    name: "Hands-on Workshop Labs",
    codename: "ORBIT-09 // PLUTO",
    category: "2 Parallel Hands-on Arenas",
    color: "#6366f1",
    accent: "#4338ca",
    radius: 18.2,
    speed: 0.0017,
    size: 0.42,
    desc: "Deep-dive practical codelabs with verified deliverables, mentor-led code pairing, and live device flashing.",
    keyHighlights: ["Track 1: GenAI & Multi-Agent Swarms", "Track 2: Physical AI & Space Data", "600+ Attendees Hands-on Labs"],
  },
];

export default function SolarSystemEcosystem3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<TrackPlanet>(PLANETS[0]);
  const [isRotating, setIsRotating] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 520;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 24, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Dynamic Starfield Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.5,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // GDG Central Sun Core
    const sunGeo = new THREE.SphereGeometry(1.8, 36, 36);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0x4285f4,
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Glowing Sun Atmosphere Corona
    const coronaGeo = new THREE.SphereGeometry(2.3, 36, 36);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
    });
    const sunCorona = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(sunCorona);

    // Ambient & Point Lighting
    const sunLight = new THREE.PointLight(0xffffff, 2.5, 60);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Planetary Systems
    const planetEntries: {
      mesh: THREE.Mesh;
      ringMesh?: THREE.Mesh;
      orbit: THREE.Line;
      planet: TrackPlanet;
      angle: number;
    }[] = [];

    PLANETS.forEach((planet, idx) => {
      // Orbital Ring Path
      const curve = new THREE.EllipseCurve(0, 0, planet.radius, planet.radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(96);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x64748b,
        transparent: true,
        opacity: 0.2,
      });
      const orbit = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbit);

      // Planet Sphere Mesh
      const pGeo = new THREE.SphereGeometry(planet.size, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(planet.color),
        roughness: 0.3,
        metalness: 0.3,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);

      // Add Saturn-style rings for Modern Web track
      let ringMesh: THREE.Mesh | undefined;
      if (planet.id === "modern-web") {
        const ringGeo = new THREE.RingGeometry(planet.size * 1.4, planet.size * 2.1, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xf472b6,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.8;
        pMesh.add(ringMesh);
      }

      const initialAngle = (idx / PLANETS.length) * Math.PI * 2;
      pMesh.position.x = Math.cos(initialAngle) * planet.radius;
      pMesh.position.z = Math.sin(initialAngle) * planet.radius;
      scene.add(pMesh);

      planetEntries.push({
        mesh: pMesh,
        ringMesh,
        orbit,
        planet,
        angle: initialAngle,
      });
    });

    // Mouse Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      scene.rotation.y += deltaX * 0.005;
      camera.position.y = Math.max(12, Math.min(36, camera.position.y - deltaY * 0.05));
      camera.lookAt(0, 0, 0);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate Sun Core
      sun.rotation.y += 0.004;
      sunCorona.rotation.y -= 0.002;
      starField.rotation.y += 0.0002;

      // Rotate Planets
      planetEntries.forEach((entry) => {
        if (isRotating) {
          entry.angle += entry.planet.speed;
        }
        entry.mesh.position.x = Math.cos(entry.angle) * entry.planet.radius;
        entry.mesh.position.z = Math.sin(entry.angle) * entry.planet.radius;
        entry.mesh.rotation.y += 0.015;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      if (container && domElement) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/40 text-xs font-mono font-bold text-[#4285f4] mb-3">
            <Orbit className="w-3.5 h-3.5 animate-spin-slow" />
            <span>INTERACTIVE THREE.JS ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            The Solar System Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            With <strong>GDG Indore as the Sun</strong> at the epicenter, navigate the 9 planetary tracks connecting space technology, agentic AI, physical hardware, enterprise innovation, and hands-on workshops.
          </p>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="relative rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-b from-white/95 via-gray-50/70 to-white/95 dark:from-[#0d0d0d] dark:via-[#080808] dark:to-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mb-8">
          <div
            ref={mountRef}
            className="w-full h-[520px] cursor-grab active:cursor-grabbing select-none"
            title="Click and drag to rotate the orbital plane"
          />

          {/* Top Left System Telemetry Overlay */}
          <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-gray-200 dark:border-white/15 text-xs shadow-md pointer-events-none">
            <div className="flex items-center gap-2 text-[#4285f4] font-bold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4] animate-ping" />
              <span>CENTRAL SOLAR HUB: GDG INDORE</span>
            </div>
            <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 block">
              9 Planetary Tracks • 600+ Professional Leaders
            </span>
          </div>

          {/* Top Right Play/Pause Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 dark:border-white/20 bg-white/90 dark:bg-black/85 backdrop-blur-md text-[11px] font-mono font-bold hover:scale-105 active:scale-95 transition-transform"
            >
              {isRotating ? "⏸ Pause Orbit" : "▶ Resume Orbit"}
            </button>
          </div>

          {/* Bottom Active Track Planet Details Sheet */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md p-5 rounded-3xl bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: selectedPlanet.color }}
                />
                <div>
                  <h3 className="font-black text-sm text-gray-900 dark:text-white">
                    {selectedPlanet.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400">
                    {selectedPlanet.codename}
                  </span>
                </div>
              </div>
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${selectedPlanet.color}20`, color: selectedPlanet.color }}
              >
                Track #{PLANETS.indexOf(selectedPlanet) + 1}
              </span>
            </div>

            <div className="text-xs font-bold text-[#4285f4] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#f9ab00]" />
              <span>{selectedPlanet.category}</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {selectedPlanet.desc}
            </p>

            {/* Key Deliverables Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-white/10">
              {selectedPlanet.keyHighlights.map((hl) => (
                <span
                  key={hl}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  {hl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 9 Track Planetary Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PLANETS.map((planet) => {
            const isSelected = selectedPlanet.id === planet.id;
            return (
              <button
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md scale-105"
                    : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-400"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: planet.color }}
                />
                <span>{planet.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
