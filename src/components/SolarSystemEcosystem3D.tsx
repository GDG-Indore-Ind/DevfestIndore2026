"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Compass, Rocket } from "lucide-react";

interface TrackPlanet {
  name: string;
  category: string;
  color: string;
  radius: number;
  speed: number;
  size: number;
  desc: string;
}

const PLANETS: TrackPlanet[] = [
  { name: "Space Tech", category: "Space Club of India Planned MOU", color: "#38bdf8", radius: 5.5, speed: 0.009, size: 0.55, desc: "Satellite applications, space data pipelines, and private space economy in MP." },
  { name: "Agentic AI", category: "Multi-Agent Swarms & Gemini", color: "#ea4335", radius: 7.2, speed: 0.007, size: 0.65, desc: "Autonomous reasoning agents, code generation loops, and enterprise AI." },
  { name: "Physical AI", category: "Qualcomm Edge & Robotics", color: "#f9ab00", radius: 9.0, speed: 0.0055, size: 0.6, desc: "On-device silicon acceleration, sensor fusion, and robotics control." },
  { name: "Data & Cloud", category: "GKE, Vector DB & Resilience", color: "#34a853", radius: 10.8, speed: 0.0045, size: 0.58, desc: "Distributed zero-downtime microservices and AI-ready retrieval data." },
  { name: "Enterprise Hub", category: "Product Innovation & Startups", color: "#a855f7", radius: 12.5, speed: 0.0038, size: 0.5, desc: "Curated showcase demos, startup pitch clinics, and tech adoption." },
  { name: "Mobile & Flutter", category: "Modern Android & Declarative UI", color: "#06b6d4", radius: 14.2, speed: 0.0032, size: 0.48, desc: "Kotlin Multiplatform, Jetpack Compose, and cross-platform apps." },
  { name: "Web & Turbopack", category: "Next.js 16 & Web Standards", color: "#ec4899", radius: 15.8, speed: 0.0028, size: 0.46, desc: "Next-gen web applications, SSR streaming, and high-performance design." },
  { name: "Open Source", category: "Community Tools & DevRel", color: "#10b981", radius: 17.5, speed: 0.0024, size: 0.45, desc: "Grassroots tooling, open libraries, and developer ecosystem collaboration." },
  { name: "Workshops Lab", category: "Parallel Hands-on Tracks", color: "#f59e0b", radius: 19.2, speed: 0.0020, size: 0.52, desc: "Two parallel hands-on codelab arenas with guided mentor outcomes." },
];

export default function SolarSystemEcosystem3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<TrackPlanet>(PLANETS[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 22, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Central Sun (GDG Indore Core Hub)
    const sunGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0x4285f4,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Glowing Aura for Sun
    const sunAuraGeo = new THREE.SphereGeometry(2.6, 32, 32);
    const sunAuraMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const sunAura = new THREE.Mesh(sunAuraGeo, sunAuraMat);
    scene.add(sunAura);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Build 9 Planet Orbits and Meshes
    const planetMeshes: { mesh: THREE.Mesh; orbitRing: THREE.Line; planet: TrackPlanet; angle: number }[] = [];

    PLANETS.forEach((planet, idx) => {
      // Orbit Path Ring
      const curve = new THREE.EllipseCurve(0, 0, planet.radius, planet.radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(64);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.25,
      });
      const orbitRing = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitRing);

      // Planet Sphere
      const pGeo = new THREE.SphereGeometry(planet.size, 24, 24);
      const pMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(planet.color),
        roughness: 0.4,
        metalness: 0.2,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);

      const initialAngle = (idx / PLANETS.length) * Math.PI * 2;
      pMesh.position.x = Math.cos(initialAngle) * planet.radius;
      pMesh.position.z = Math.sin(initialAngle) * planet.radius;

      scene.add(pMesh);

      planetMeshes.push({
        mesh: pMesh,
        orbitRing,
        planet,
        angle: initialAngle,
      });
    });

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate sun
      sun.rotation.y += 0.005;
      sunAura.rotation.y -= 0.004;

      // Rotate planets in orbit
      planetMeshes.forEach((item) => {
        item.angle += item.planet.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.planet.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.planet.radius;
        item.mesh.rotation.y += 0.02;
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
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#4285f4] mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive 3D Three.js Universe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            The Solar System of Tracks & Experiences
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            With <strong>GDG Indore as the Sun</strong> at the epicenter, explore the 9 distinct planetary tracks orbiting around space technology, agentic AI, physical hardware, and enterprise product innovation.
          </p>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative rounded-3xl border-2 border-gray-200 dark:border-white/10 bg-gradient-to-b from-white/90 via-slate-50/60 to-white/90 dark:from-slate-900/80 dark:to-slate-950/90 shadow-xl overflow-hidden mb-8">
          <div ref={mountRef} className="w-full h-[480px] cursor-grab active:cursor-grabbing" />

          {/* Central Legend Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/15 text-xs font-bold shadow-md">
            <div className="flex items-center gap-2 text-[#4285f4] mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4] animate-ping" />
              <span>Epicenter: GDG Indore Sun</span>
            </div>
            <span className="text-[10px] text-gray-500 font-normal">
              9 Planetary Tracks Orbiting Central India
            </span>
          </div>

          {/* Active Planet Inspector Card */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md p-5 rounded-2xl bg-white/95 dark:bg-black/85 backdrop-blur-md border-2 border-[#1e1e1e] dark:border-white/20 shadow-2xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: selectedPlanet.color }}
                />
                <h3 className="font-black text-sm text-[#1e1e1e] dark:text-white">
                  {selectedPlanet.name} Orbit
                </h3>
              </div>
              <span className="text-[10px] font-bold text-gray-500 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10">
                Track #{PLANETS.indexOf(selectedPlanet) + 1}
              </span>
            </div>
            <div className="text-xs font-bold text-[#4285f4] mb-1">
              {selectedPlanet.category}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {selectedPlanet.desc}
            </p>
          </div>
        </div>

        {/* Planet Quick Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PLANETS.map((planet) => (
            <button
              key={planet.name}
              onClick={() => setSelectedPlanet(planet)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                selectedPlanet.name === planet.name
                  ? "bg-[#1e1e1e] text-white border-[#1e1e1e] shadow-md scale-105"
                  : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-400"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span>{planet.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
