"use client";

import { useEffect, useRef, useState, useId } from "react";
import * as THREE from "three";
import { Sparkles, Orbit, RotateCcw, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export interface TrackPlanetConfig {
  id: string;
  name: string;
  codename: string;
  category: string;
  badge: string;
  color: string;
  glowColor: string;
  radius: number;
  speed: number;
  size: number;
  desc: string;
  visualIdentity: string;
  hasRing?: boolean;
  hasMoon?: boolean;
  moonCount?: number;
  routeHref: string;
}

export const NINE_TRACK_PLANETS: TrackPlanetConfig[] = [
  {
    id: "space-tech",
    name: "Space Technology",
    codename: "TRACK 01 // ORBIT 1",
    category: "Space Systems & Satellite Pipelines",
    badge: "Planned MOU Announcement",
    color: "#38bdf8",
    glowColor: "#0284c7",
    radius: 5.2,
    speed: 0.009,
    size: 0.48,
    desc: "Explore satellites, Earth observation, space systems, and the software powering humanity's next frontier.",
    visualIdentity: "Realistic blue world with swirling clouds, atmospheric glow, and subtle satellite orbital traces.",
    hasMoon: true,
    moonCount: 1,
    routeHref: "#space-collaboration",
  },
  {
    id: "agentic-ai",
    name: "Agentic AI & LLMs",
    codename: "TRACK 02 // ORBIT 2",
    category: "Autonomous Multi-Agent Swarms",
    badge: "Gemini 2.5 & Frameworks",
    color: "#818cf8",
    glowColor: "#4f46e5",
    radius: 6.8,
    speed: 0.0076,
    size: 0.58,
    desc: "Build intelligent agents, work with large language models, and create systems that reason, use tools, and complete meaningful tasks.",
    visualIdentity: "Sophisticated violet-blue planet with luminous neural lattice patterns across its surface.",
    routeHref: "#pillars",
  },
  {
    id: "physical-ai",
    name: "Physical AI & Robotics",
    codename: "TRACK 03 // ORBIT 3",
    category: "Embodied Intelligence & Silicon",
    badge: "Qualcomm Edge Showcase",
    color: "#2dd4bf",
    glowColor: "#0f766e",
    radius: 8.5,
    speed: 0.0062,
    size: 0.60,
    desc: "Connect intelligence with the physical world through robotics, automation, embodied AI, and intelligent devices.",
    visualIdentity: "Metallic world with engineered surface geometry and restrained teal highlights.",
    hasMoon: true,
    moonCount: 1,
    routeHref: "#zones",
  },
  {
    id: "data-cloud",
    name: "Data & Cloud Architecture",
    codename: "TRACK 04 // ORBIT 4",
    category: "Distributed Resilient Systems",
    badge: "GKE & Vector Platforms",
    color: "#34d399",
    glowColor: "#059669",
    radius: 10.2,
    speed: 0.0051,
    size: 0.54,
    desc: "Explore modern data platforms, cloud infrastructure, scalable systems, and the foundations of digital products.",
    visualIdentity: "Blue-green world with layered atmospheric bands and subtle network-inspired surface patterns.",
    routeHref: "#pillars",
  },
  {
    id: "enterprise-innovation",
    name: "Enterprise Innovation",
    codename: "TRACK 05 // ORBIT 5",
    category: "Architecture & Transformation",
    badge: "Industry Product Hub",
    color: "#fbbf24",
    glowColor: "#d97706",
    radius: 12.0,
    speed: 0.0042,
    size: 0.76,
    desc: "Discover how engineering, software architecture, and emerging technologies solve real business problems and power enterprise transformation.",
    visualIdentity: "Sophisticated amber world with geometric surface structures and deep solar luminescence.",
    routeHref: "#zones",
  },
  {
    id: "modern-web",
    name: "High-Scale Modern Web",
    codename: "TRACK 06 // ORBIT 6",
    category: "Edge Computing & Web Platforms",
    badge: "Next.js 16 & Turbopack",
    color: "#f43f5e",
    glowColor: "#be123c",
    radius: 14.0,
    speed: 0.0034,
    size: 0.64,
    desc: "Explore modern frontend engineering, web performance, scalable applications, developer experience, and production-ready web platforms.",
    visualIdentity: "Rich magenta world crowned by elegant interconnected planar rings.",
    hasRing: true,
    routeHref: "#pillars",
  },
  {
    id: "mobile-flutter",
    name: "Android & Flutter Ecosystem",
    codename: "TRACK 07 // ORBIT 7",
    category: "Cross-Platform & Native Mobile",
    badge: "Jetpack Compose & KMP",
    color: "#22c55e",
    glowColor: "#15803d",
    radius: 16.0,
    speed: 0.0027,
    size: 0.56,
    desc: "Build modern mobile experiences with Android, Flutter, cross-platform development, and mobile-first engineering.",
    visualIdentity: "Vivid green world with clean concentric atmospheric waves and on-device AI focus.",
    routeHref: "#pillars",
  },
  {
    id: "open-source",
    name: "Open Source & Community",
    codename: "TRACK 08 // ORBIT 8",
    category: "Developer Tooling & Contributions",
    badge: "Google Open Source",
    color: "#2dd4bf",
    glowColor: "#0d9488",
    radius: 18.0,
    speed: 0.0022,
    size: 0.52,
    desc: "Collaborate, contribute, learn in public, and build meaningful technology alongside developers and communities.",
    visualIdentity: "Warm turquoise world with connected archipelago regions and twin satellite moons.",
    hasMoon: true,
    moonCount: 2,
    routeHref: "#satellite-events",
  },
  {
    id: "hands-on-workshops",
    name: "Hands-on Workshop Labs",
    codename: "TRACK 09 // ORBIT 9",
    category: "2 Parallel Hands-on Arenas",
    badge: "Practical Deliverables",
    color: "#6366f1",
    glowColor: "#4338ca",
    radius: 20.0,
    speed: 0.0018,
    size: 0.50,
    desc: "Move beyond presentations through practical coding labs, mentor-guided experiences, and tangible technical deliverables.",
    visualIdentity: "Deep indigo outer world with subtle orbital ring arc and dedicated lab focus.",
    hasRing: true,
    routeHref: "#zones",
  },
];

export default function SolarSystemEcosystem3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<TrackPlanetConfig>(NINE_TRACK_PLANETS[0]);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const { isDark } = useTheme();

  // Create procedurally shaded canvas texture for planets to achieve realistic celestial shading
  const createPlanetTexture = (baseColor: string, secondaryColor: string, type: string) => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Atmospheric gradient base
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, secondaryColor);
    grad.addColorStop(0.5, baseColor);
    grad.addColorStop(1, secondaryColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Subtle planetary surface features (cloud bands, continental textures, neural lattices)
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    if (type === "space-tech") {
      // Swirling clouds
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.ellipse(Math.random() * 512, Math.random() * 256, 40 + Math.random() * 80, 8 + Math.random() * 14, 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === "agentic-ai") {
      // Neural points and connecting filaments
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 24; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineTo(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 40);
        ctx.stroke();
      }
    } else {
      // Fine atmospheric latitudinal bands
      for (let y = 15; y < 256; y += 22) {
        ctx.fillRect(0, y, 512, 4 + Math.random() * 6);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 560;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 26, 32);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 1. Deep Space Starfield Background
    const starCount = 420;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 90;
      starPositions[i + 1] = (Math.random() - 0.5) * 45;
      starPositions[i + 2] = (Math.random() - 0.5) * 90;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0xa7b6c8,
      transparent: true,
      opacity: 0.45,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 2. THE SUN: GDG Indore (Luminous golden-orange core + soft corona + radial lights)
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    // Sun Core
    const sunGeo = new THREE.SphereGeometry(2.0, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xfdba4d, // Warm solar gold
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Inner Glowing Atmosphere (Luminous Core Glow)
    const innerCoronaGeo = new THREE.SphereGeometry(2.3, 36, 36);
    const innerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.35,
    });
    const innerCoronaMesh = new THREE.Mesh(innerCoronaGeo, innerCoronaMat);
    sunGroup.add(innerCoronaMesh);

    // Outer Solar Plasma Corona
    const outerCoronaGeo = new THREE.SphereGeometry(2.8, 36, 36);
    const outerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.16,
      wireframe: true,
    });
    const outerCoronaMesh = new THREE.Mesh(outerCoronaGeo, outerCoronaMat);
    sunGroup.add(outerCoronaMesh);

    // Center Sun Light Emitter
    const sunPointLight = new THREE.PointLight(0xfff7ed, 3.2, 75, 1.2);
    sunPointLight.position.set(0, 0, 0);
    scene.add(sunPointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // 3. NINE PLANETARY SYSTEMS & ORBITS
    const planetMeshes: {
      id: string;
      group: THREE.Group;
      mesh: THREE.Mesh;
      orbitLine: THREE.Line;
      haloMesh: THREE.Mesh;
      config: TrackPlanetConfig;
      angle: number;
    }[] = [];

    NINE_TRACK_PLANETS.forEach((planet, index) => {
      // Subtle Elliptical Orbit Path
      const curve = new THREE.EllipseCurve(0, 0, planet.radius, planet.radius, 0, 2 * Math.PI, false, 0);
      const orbitPoints = curve.getPoints(96);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(planet.color),
        transparent: true,
        opacity: 0.22,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitLine);

      // Planet Root Group
      const planetGroup = new THREE.Group();
      scene.add(planetGroup);

      // Planet Sphere Mesh with Shading
      const pGeo = new THREE.SphereGeometry(planet.size, 36, 36);
      const pTexture = createPlanetTexture(planet.color, planet.glowColor, planet.id);
      const pMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(planet.color),
        map: pTexture,
        roughness: 0.35,
        metalness: 0.25,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      planetGroup.add(pMesh);

      // Atmospheric Rim Glow / Halo for each planet
      const haloGeo = new THREE.SphereGeometry(planet.size * 1.22, 24, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(planet.color),
        transparent: true,
        opacity: 0.18,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      planetGroup.add(haloMesh);

      // Optional Planar Rings (e.g. Modern Web, Workshops)
      if (planet.hasRing) {
        const ringGeo = new THREE.RingGeometry(planet.size * 1.45, planet.size * 2.2, 40);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(planet.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.6;
        planetGroup.add(ringMesh);
      }

      // Optional Tiny Natural Satellite / Moon
      if (planet.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(planet.size * 0.25, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(planet.size * 1.7, 0.2, 0);
        planetGroup.add(moonMesh);
      }

      // Staggered orbital distribution across 360 degrees
      const initialAngle = (index / NINE_TRACK_PLANETS.length) * Math.PI * 2;
      planetGroup.position.x = Math.cos(initialAngle) * planet.radius;
      planetGroup.position.z = Math.sin(initialAngle) * planet.radius;

      planetMeshes.push({
        id: planet.id,
        group: planetGroup,
        mesh: pMesh,
        orbitLine,
        haloMesh,
        config: planet,
        angle: initialAngle,
      });
    });

    // Interactive Drag / Orbiting Controls via Mouse & Touch
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevMouse.x;
      const dy = clientY - prevMouse.y;

      scene.rotation.y += dx * 0.005;
      camera.position.y = Math.max(14, Math.min(38, camera.position.y - dy * 0.04));
      camera.lookAt(0, 0, 0);

      prevMouse = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasElem = renderer.domElement;
    canvasElem.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvasElem.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Animation Loop with respect for reduced motion
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate Sun Core and Solar Corona
      sunMesh.rotation.y += 0.003;
      innerCoronaMesh.rotation.y -= 0.002;
      outerCoronaMesh.rotation.y += 0.001;
      starPoints.rotation.y += 0.0001;

      // Update Planet Positions along their orbits
      planetMeshes.forEach((item) => {
        if (isOrbiting) {
          item.angle += item.config.speed;
        }
        item.group.position.x = Math.cos(item.angle) * item.config.radius;
        item.group.position.z = Math.sin(item.angle) * item.config.radius;
        item.mesh.rotation.y += 0.012;

        // Highlight selected planet orbit
        const isSelected = item.id === selectedPlanet.id;
        (item.orbitLine.material as THREE.LineBasicMaterial).opacity = isSelected ? 0.75 : 0.22;
        (item.haloMesh.material as THREE.MeshBasicMaterial).opacity = isSelected ? 0.38 : 0.16;
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
      cancelAnimationFrame(animId);
      canvasElem.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvasElem.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", handleResize);
      if (container && canvasElem) {
        container.removeChild(canvasElem);
      }
      renderer.dispose();
    };
  }, [isOrbiting, selectedPlanet.id]);

  return (
    <section
      id="solar-ecosystem"
      aria-label="DevFest Indore 2026 Solar System of Technology Tracks"
      className="py-20 md:py-28 relative overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline & Concept Manifesto */}
        <div className="text-center max-w-4xl mx-auto mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/40 text-xs font-mono font-bold text-[#4285f4] mb-3">
            <Orbit className="w-3.5 h-3.5 animate-spin-slow" />
            <span>INTERACTIVE SOLAR ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4">
            ONE SUN. NINE PLANETS. <span className="text-[#4285f4]">INFINITE POSSIBILITIES.</span>
          </h2>

          <p className={`text-base sm:text-lg font-normal max-w-3xl mx-auto leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            With <strong>GDG Indore at the center</strong>, explore nine technology tracks spanning space technology, AI, robotics, cloud, enterprise innovation, modern web, mobile engineering, open source, and hands-on learning.
          </p>
        </div>

        {/* Cinematic Deep Space Solar Visualization Stage */}
        <div
          className="relative rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_24px_60px_rgba(6,17,31,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)] overflow-hidden mb-8"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at center, #0a1b30 0%, #06111f 70%, #030712 100%)"
              : "radial-gradient(ellipse at center, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)",
          }}
        >
          {/* Three.js 3D Viewport */}
          <div
            ref={mountRef}
            className="w-full h-[560px] cursor-grab active:cursor-grabbing select-none"
            title="Click and drag to rotate the orbital angle"
            role="region"
            aria-label="3D Interactive Solar System Viewport"
          />

          {/* Central Sun Brand Callout (Always visible above canvas) */}
          <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/90 dark:bg-[#06111f]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-md pointer-events-none max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fdba4d] animate-ping" />
              <span className="font-extrabold text-xs text-[#ea580c] dark:text-[#fdba4d]">
                GDG INDORE // THE SUN
              </span>
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 leading-tight">
              THE CENTER OF OUR DEVELOPER UNIVERSE • 9 EQUAL TRACKS
            </p>
          </div>

          {/* Top Right Play/Pause Orbit Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              onClick={() => setIsOrbiting(!isOrbiting)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-[#06111f]/90 backdrop-blur-md text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-sm"
              aria-label={isOrbiting ? "Pause planetary orbit motion" : "Resume planetary orbit motion"}
            >
              <span>{isOrbiting ? "⏸ Pause Orbit" : "▶ Resume Orbit"}</span>
            </button>

            <button
              onClick={() => setSelectedPlanet(NINE_TRACK_PLANETS[0])}
              className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-[#06111f]/90 backdrop-blur-md text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all text-slate-800 dark:text-slate-200 shadow-sm"
              title="Reset View to Orbit 1"
              aria-label="Reset view to Track 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Polished Active Planet Track Details Sheet */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-[#0a1b30]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-2xl z-20 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: selectedPlanet.color }}
                />
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white leading-none">
                    {selectedPlanet.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    {selectedPlanet.codename}
                  </span>
                </div>
              </div>

              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border"
                style={{
                  backgroundColor: `${selectedPlanet.color}15`,
                  color: selectedPlanet.color,
                  borderColor: `${selectedPlanet.color}40`,
                }}
              >
                {selectedPlanet.badge}
              </span>
            </div>

            <div className="text-xs font-bold text-[#4285f4] dark:text-[#38bdf8] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#fdba4d]" />
              <span>{selectedPlanet.category}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selectedPlanet.desc}
            </p>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Visual Identity:</span>
              <span>{selectedPlanet.visualIdentity}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-slate-400">
                Orbital Radius: {selectedPlanet.radius} AU
              </span>

              <a
                href={selectedPlanet.routeHref}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#4285f4] dark:text-[#38bdf8] hover:underline"
              >
                <span>Explore Track Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Compact Secondary 9-Track Planetary Selector Tabs */}
        <div
          role="tablist"
          aria-label="Select a planetary track"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {NINE_TRACK_PLANETS.map((planet) => {
            const isSelected = selectedPlanet.id === planet.id;
            return (
              <button
                key={planet.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedPlanet(planet)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md scale-105"
                    : "bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
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
