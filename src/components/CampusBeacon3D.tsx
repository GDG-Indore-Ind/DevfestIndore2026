"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CampusBeacon3DProps {
  color?: string;
  collegeName?: string;
  badge?: string;
  isDark?: boolean;
}

export default function CampusBeacon3D({
  color = "#4285f4",
  collegeName = "AITR Campus",
  badge = "GenAI Workshop",
  isDark = true,
}: CampusBeacon3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<string>(color);
  colorRef.current = color;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 140;
    const height = mount.clientHeight || 140;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.5);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold all 3D beacon elements
    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);

    // Base Rings (Radar circles)
    const baseGeo = new THREE.RingGeometry(0.8, 0.88, 32);
    const baseMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorRef.current),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const baseRing = new THREE.Mesh(baseGeo, baseMat);
    baseRing.rotation.x = -Math.PI / 2;
    beaconGroup.add(baseRing);

    // Outer faint pulsing ring
    const outerRingGeo = new THREE.RingGeometry(1.2, 1.25, 32);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorRef.current),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    beaconGroup.add(outerRing);

    // Vertical Hologram Cone / Beacon Pillar
    const coneGeo = new THREE.ConeGeometry(0.7, 2.2, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorRef.current),
      transparent: true,
      opacity: 0.28,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = 1.1;
    cone.rotation.x = Math.PI; // point down to origin
    beaconGroup.add(cone);

    // Glowing core crystal (Floating Octahedron)
    const crystalGeo = new THREE.OctahedronGeometry(0.35, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorRef.current),
      emissive: new THREE.Color(colorRef.current),
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = 2.0;
    beaconGroup.add(crystal);

    // Orbital mini satellite sphere
    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    beaconGroup.add(satMesh);

    // Lighting
    const pointLight = new THREE.PointLight(new THREE.Color(colorRef.current), 2.5, 10);
    pointLight.position.set(0, 2.2, 1);
    scene.add(pointLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate group & elements
      beaconGroup.rotation.y = elapsedTime * 0.6;
      crystal.rotation.x = elapsedTime * 1.2;
      crystal.rotation.z = elapsedTime * 0.8;
      crystal.position.y = 1.9 + Math.sin(elapsedTime * 2.5) * 0.12;

      // Pulse rings
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.15;
      baseRing.scale.set(pulse, pulse, pulse);
      outerRing.scale.set(1 / pulse, 1 / pulse, 1 / pulse);

      // Satellite orbit around crystal
      const orbitRadius = 0.7;
      satMesh.position.x = Math.cos(elapsedTime * 2) * orbitRadius;
      satMesh.position.z = Math.sin(elapsedTime * 2) * orbitRadius;
      satMesh.position.y = 2.0 + Math.sin(elapsedTime * 3) * 0.2;

      // Color updates dynamically
      const targetColor = new THREE.Color(colorRef.current);
      crystalMat.color.lerp(targetColor, 0.1);
      crystalMat.emissive.lerp(targetColor, 0.1);
      baseMat.color.lerp(targetColor, 0.1);
      outerRingMat.color.lerp(targetColor, 0.1);
      coneMat.color.lerp(targetColor, 0.1);
      pointLight.color.lerp(targetColor, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 140;
      const h = mount.clientHeight || 140;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      baseGeo.dispose();
      baseMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      coneGeo.dispose();
      coneMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
      <div ref={mountRef} className="w-28 h-28 sm:w-32 sm:h-32" />
      <div className="text-center -mt-2">
        <span
          className={`text-[9px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-md ${
            isDark
              ? "bg-black/70 border-white/20 text-white"
              : "bg-white/80 border-gray-300 text-gray-900"
          }`}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}
