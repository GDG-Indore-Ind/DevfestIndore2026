"use client";

import confetti from "canvas-confetti";
import { useTheme } from "@/contexts/ThemeContext";

export default function FloatingShapesBackground() {
  const { isDark } = useTheme();

  const triggerShapePop = (x: number, y: number, color: string) => {
    confetti({
      particleCount: 36,
      spread: 60,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: [color, "#4285f4", "#f9ab00", "#34a853", "#ea4335", "#ffffff"],
    });
  };

  // Color tokens depending on light / dark mode
  const strokeMain = isDark ? "#ffffff" : "#0f172a";
  const strokeMuted = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(15, 23, 42, 0.3)";
  const strokeFaint = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.12)";
  const fillSoft = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.03)";

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Space Atmospheric Nebula Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30">
        {/* Google Blue Nebula - Top Left */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#4285f4]/20 via-[#4285f4]/5 to-transparent blur-3xl pointer-events-none" />
        {/* Google Red / Yellow Nebula - Center Right */}
        <div className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#ea4335]/15 via-[#f9ab00]/10 to-transparent blur-3xl pointer-events-none" />
        {/* Google Green Nebula - Bottom Left */}
        <div className="absolute -bottom-[10%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-[#34a853]/15 via-[#4285f4]/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 2. Celestial Blueprint Coordinate Grid & Crosshairs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="space-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke={strokeFaint}
              strokeWidth="0.8"
              strokeDasharray="2 6"
            />
            {/* Fine crosshairs at intersections */}
            <path
              d="M 60 55 L 60 65 M 55 60 L 65 60"
              fill="none"
              stroke={strokeMuted}
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#space-grid)" />
      </svg>

      {/* 3. Major Orbital Trajectory Arcs (NASA Blueprint Aesthetic) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-35 dark:opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper Elliptical Trajectory (Google Blue) */}
        <ellipse
          cx="20%"
          cy="18%"
          rx="460"
          ry="140"
          fill="none"
          stroke="#4285f4"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          transform="rotate(-8 300 200)"
        />
        {/* Central Equatorial Orbit (Google Red) */}
        <ellipse
          cx="82%"
          cy="52%"
          rx="540"
          ry="160"
          fill="none"
          stroke="#ea4335"
          strokeWidth="1.2"
          strokeDasharray="8 8"
          transform="rotate(12 800 500)"
        />
        {/* Lower Lunar Trajectory (Google Green) */}
        <ellipse
          cx="28%"
          cy="82%"
          rx="620"
          ry="180"
          fill="none"
          stroke="#34a853"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          transform="rotate(-5 400 800)"
        />
        {/* Telemetry Target Circle (Google Yellow) */}
        <circle
          cx="88%"
          cy="15%"
          r="140"
          fill="none"
          stroke="#f9ab00"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="88%"
          cy="15%"
          r="150"
          fill="none"
          stroke={strokeFaint}
          strokeWidth="0.8"
        />
      </svg>

      {/* 4. Rich Space Vector Illustrations Embedded in Background */}

      {/* A. VECTOR ASTRONAUT SPACEWALK (Upper-Left Drift) */}
      <div
        className="absolute top-[8%] left-[2%] xl:left-[4%] w-48 h-48 sm:w-56 sm:h-56 opacity-45 dark:opacity-40 animate-float pointer-events-none"
        title="Spacewalk Astronaut • DevFest Indore Explorer"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Umbilical Tether Wavy Cable drifting off into space */}
          <path
            d="M 75 160 C 50 180, 20 170, 0 195"
            stroke="#4285f4"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          {/* Life-Support Backpack */}
          <rect x="62" y="70" width="34" height="60" rx="8" fill={fillSoft} stroke={strokeMain} strokeWidth="2.2" />
          <rect x="67" y="78" width="10" height="24" rx="4" fill="#4285f4" fillOpacity="0.4" stroke={strokeMain} strokeWidth="1.2" />
          <rect x="80" y="78" width="10" height="24" rx="4" fill="#ea4335" fillOpacity="0.4" stroke={strokeMain} strokeWidth="1.2" />
          
          {/* Astronaut Suit Torso */}
          <ellipse cx="106" cy="108" rx="26" ry="32" fill={fillSoft} stroke={strokeMain} strokeWidth="2.5" />
          {/* Chest Control Pack */}
          <rect x="94" y="96" width="24" height="18" rx="4" fill={isDark ? "#111" : "#fff"} stroke={strokeMain} strokeWidth="1.8" />
          <circle cx="100" cy="105" r="2.5" fill="#34a853" />
          <circle cx="106" cy="105" r="2.5" fill="#4285f4" />
          <circle cx="112" cy="105" r="2.5" fill="#ea4335" />

          {/* Helmet & Visor (DevFest Poster Reflection Style) */}
          <circle cx="112" cy="62" r="26" fill={fillSoft} stroke={strokeMain} strokeWidth="2.5" />
          {/* Visor with golden/cosmic reflection */}
          <path
            d="M 102 52 C 102 46, 128 46, 130 54 C 132 62, 126 74, 114 74 C 104 74, 102 60, 102 52 Z"
            fill="url(#astronaut-visor-gradient)"
            stroke={strokeMain}
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="astronaut-visor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285f4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ea4335" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f9ab00" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Visor Glint Sparkle */}
          <path d="M 120 54 L 122 57 L 125 58 L 122 59 L 120 62 L 118 59 L 115 58 L 118 57 Z" fill="#ffffff" />

          {/* Waving Right Arm */}
          <path
            d="M 128 92 C 145 84, 155 70, 158 52"
            stroke={strokeMain}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Glove Waving Hand */}
          <circle cx="159" cy="50" r="7" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />

          {/* Left Arm Floating Down */}
          <path
            d="M 85 96 C 75 110, 70 125, 68 138"
            stroke={strokeMain}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Floating Legs with Boots */}
          <path
            d="M 98 138 C 94 155, 90 170, 84 184"
            stroke={strokeMain}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="80" cy="188" rx="8" ry="5" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
          <path
            d="M 116 138 C 122 154, 130 168, 140 178"
            stroke={strokeMain}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="144" cy="182" rx="8" ry="5" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
        </svg>
      </div>

      {/* B. VECTOR ASCENDING ROCKET EXPLORER (Upper-Right Sky) */}
      <div
        className="absolute top-[16%] right-[2%] xl:right-[5%] w-40 h-40 sm:w-48 sm:h-48 opacity-45 dark:opacity-40 animate-float-alt pointer-events-none"
        title="Ascending Mission Rocket"
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full -rotate-45">
          {/* Exhaust Flame in Google Colors */}
          <path
            d="M 72 120 C 68 140, 78 158, 80 160 C 82 158, 92 140, 88 120 Z"
            fill="url(#rocket-flame-gradient)"
          />
          <path
            d="M 75 120 C 73 134, 79 146, 80 148 C 81 146, 87 134, 85 120 Z"
            fill="#ffd427"
          />
          <defs>
            <linearGradient id="rocket-flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ea4335" />
              <stop offset="50%" stopColor="#f9ab00" />
              <stop offset="100%" stopColor="#4285f4" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Side Boosters */}
          <rect x="60" y="80" width="10" height="38" rx="4" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
          <path d="M 60 80 Q 65 70 70 80 Z" fill="#ea4335" stroke={strokeMain} strokeWidth="1.5" />
          <rect x="90" y="80" width="10" height="38" rx="4" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
          <path d="M 90 80 Q 95 70 100 80 Z" fill="#34a853" stroke={strokeMain} strokeWidth="1.5" />

          {/* Main Fuselage */}
          <path
            d="M 80 20 Q 94 48 94 116 L 66 116 Q 66 48 80 20 Z"
            fill={fillSoft}
            stroke={strokeMain}
            strokeWidth="2.5"
          />
          {/* Nosecone in Google Blue */}
          <path d="M 80 20 Q 88 38 90 48 L 70 48 Q 72 38 80 20 Z" fill="#4285f4" stroke={strokeMain} strokeWidth="2" />
          
          {/* Porthole Window */}
          <circle cx="80" cy="64" r="8" fill={isDark ? "#0d1b2a" : "#e0f2fe"} stroke={strokeMain} strokeWidth="2" />
          <circle cx="80" cy="64" r="5" fill="#4285f4" />
          <circle cx="78" cy="62" r="1.5" fill="#ffffff" />

          {/* Body Stripes */}
          <line x1="68" y1="84" x2="92" y2="84" stroke="#ea4335" strokeWidth="2" />
          <line x1="68" y1="90" x2="92" y2="90" stroke="#f9ab00" strokeWidth="2" />
          <line x1="68" y1="96" x2="92" y2="96" stroke="#34a853" strokeWidth="2" />

          {/* Fins */}
          <path d="M 66 100 L 52 120 L 66 116 Z" fill="#4285f4" stroke={strokeMain} strokeWidth="2" />
          <path d="M 94 100 L 108 120 L 94 116 Z" fill="#ea4335" stroke={strokeMain} strokeWidth="2" />
        </svg>
      </div>

      {/* C. VECTOR RINGED PLANET SATURN (Mid-Left Horizon) */}
      <div
        className="absolute top-[44%] left-[1%] xl:left-[3%] w-44 h-44 sm:w-52 sm:h-52 opacity-45 dark:opacity-40 animate-float pointer-events-none"
        title="Ringed Tech Planet • Orbit Sector"
      >
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Back Arc of Rings */}
          <ellipse
            cx="90"
            cy="90"
            rx="76"
            ry="24"
            fill="none"
            stroke="url(#saturn-ring-gradient)"
            strokeWidth="6"
            strokeDasharray="180 20"
            transform="rotate(-22 90 90)"
          />
          {/* Planet Sphere */}
          <circle cx="90" cy="90" r="38" fill="url(#saturn-body-gradient)" stroke={strokeMain} strokeWidth="2.5" />
          
          {/* Surface Atmospheric Bands */}
          <path d="M 56 82 Q 90 74 124 82" stroke={strokeMuted} strokeWidth="2" fill="none" />
          <path d="M 54 94 Q 90 86 126 94" stroke={strokeMuted} strokeWidth="2" fill="none" />
          <path d="M 58 104 Q 90 96 122 104" stroke={strokeMuted} strokeWidth="1.5" fill="none" />

          {/* Front Arc of Rings */}
          <ellipse
            cx="90"
            cy="90"
            rx="76"
            ry="24"
            fill="none"
            stroke="url(#saturn-ring-gradient)"
            strokeWidth="6"
            transform="rotate(-22 90 90)"
            strokeDasharray="120 180"
          />
          <ellipse
            cx="90"
            cy="90"
            rx="84"
            ry="28"
            fill="none"
            stroke={strokeFaint}
            strokeWidth="1.5"
            transform="rotate(-22 90 90)"
          />
          <defs>
            <linearGradient id="saturn-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285f4" />
              <stop offset="33%" stopColor="#34a853" />
              <stop offset="66%" stopColor="#f9ab00" />
              <stop offset="100%" stopColor="#ea4335" />
            </linearGradient>
            <linearGradient id="saturn-body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#1e293b" : "#f1f5f9"} />
              <stop offset="100%" stopColor={isDark ? "#0f172a" : "#e2e8f0"} />
            </linearGradient>
          </defs>

          {/* Orbiting Moonlet */}
          <circle cx="152" cy="62" r="5" fill="#f9ab00" stroke={strokeMain} strokeWidth="1.5" />
        </svg>
      </div>

      {/* D. VECTOR ORBITAL TELEMETRY COMMS SATELLITE (Mid-Right Sky) */}
      <div
        className="absolute top-[52%] right-[1%] xl:right-[3%] w-44 h-44 sm:w-52 sm:h-52 opacity-45 dark:opacity-40 animate-float-alt pointer-events-none"
        title="Orbital Comms Satellite Node"
      >
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-12">
          {/* Left Solar Panel Array with Cells */}
          <rect x="14" y="66" width="46" height="34" rx="3" fill="#4285f4" fillOpacity="0.25" stroke={strokeMain} strokeWidth="2" />
          <line x1="30" y1="66" x2="30" y2="100" stroke={strokeMain} strokeWidth="1.2" />
          <line x1="45" y1="66" x2="45" y2="100" stroke={strokeMain} strokeWidth="1.2" />
          <line x1="14" y1="83" x2="60" y2="83" stroke={strokeMain} strokeWidth="1.2" />
          {/* Panel Solar Truss Bar */}
          <line x1="60" y1="83" x2="72" y2="83" stroke={strokeMain} strokeWidth="3" />

          {/* Central Satellite Body Bus */}
          <rect x="72" y="62" width="36" height="42" rx="6" fill={fillSoft} stroke={strokeMain} strokeWidth="2.5" />
          <circle cx="90" cy="78" r="4" fill="#34a853" />
          <circle cx="90" cy="90" r="3" fill="#ea4335" />

          {/* Right Solar Panel Array with Cells */}
          <line x1="108" y1="83" x2="120" y2="83" stroke={strokeMain} strokeWidth="3" />
          <rect x="120" y="66" width="46" height="34" rx="3" fill="#4285f4" fillOpacity="0.25" stroke={strokeMain} strokeWidth="2" />
          <line x1="135" y1="66" x2="135" y2="100" stroke={strokeMain} strokeWidth="1.2" />
          <line x1="150" y1="66" x2="150" y2="100" stroke={strokeMain} strokeWidth="1.2" />
          <line x1="120" y1="83" x2="166" y2="83" stroke={strokeMain} strokeWidth="1.2" />

          {/* Parabolic Antenna Dish beaming signals downward */}
          <path d="M 74 104 Q 90 120 106 104 Z" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
          <line x1="90" y1="104" x2="90" y2="126" stroke={strokeMain} strokeWidth="2" />
          <circle cx="90" cy="126" r="3" fill="#ea4335" />

          {/* Concentric Signal Beaming Waves */}
          <path d="M 80 132 Q 90 138 100 132" stroke="#4285f4" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <path d="M 74 138 Q 90 148 106 138" stroke="#34a853" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <path d="M 68 144 Q 90 156 112 144" stroke="#f9ab00" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>

      {/* E. VECTOR SPACE SHUTTLE ORBITER (Lower-Left Sky) */}
      <div
        className="absolute bottom-[16%] left-[2%] xl:left-[4%] w-40 h-40 sm:w-48 sm:h-48 opacity-40 dark:opacity-35 animate-float pointer-events-none"
        title="Orbital Space Shuttle Glide"
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full -rotate-12">
          {/* Delta Wings */}
          <path
            d="M 80 30 L 124 108 L 102 110 L 80 114 L 58 110 L 36 108 Z"
            fill={fillSoft}
            stroke={strokeMain}
            strokeWidth="2.5"
          />
          {/* Cockpit Canopy */}
          <ellipse cx="80" cy="50" rx="8" ry="12" fill={isDark ? "#1e293b" : "#bfdbfe"} stroke={strokeMain} strokeWidth="2" />
          <circle cx="80" cy="48" r="4" fill="#4285f4" />
          {/* Vertical Tail Fin */}
          <path d="M 80 78 L 80 118 L 74 122 L 74 86 Z" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
          {/* Wingtip Google Accents */}
          <line x1="36" y1="108" x2="48" y2="109" stroke="#ea4335" strokeWidth="3" strokeLinecap="round" />
          <line x1="112" y1="109" x2="124" y2="108" stroke="#34a853" strokeWidth="3" strokeLinecap="round" />
          {/* Main Engine Nozzles */}
          <circle cx="72" cy="118" r="3.5" fill="#f9ab00" stroke={strokeMain} strokeWidth="1.5" />
          <circle cx="88" cy="118" r="3.5" fill="#4285f4" stroke={strokeMain} strokeWidth="1.5" />
        </svg>
      </div>

      {/* F. VECTOR OBSERVATORY DOME & RADAR (Lower-Right Sky) */}
      <div
        className="absolute bottom-[12%] right-[2%] xl:right-[4%] w-44 h-44 sm:w-50 sm:h-50 opacity-40 dark:opacity-35 animate-float-alt pointer-events-none"
        title="Launchpad Cosmic Observatory"
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Ground Platform */}
          <line x1="20" y1="130" x2="140" y2="130" stroke={strokeMain} strokeWidth="2.5" />
          {/* Observatory Base Cylinder */}
          <rect x="42" y="86" width="76" height="44" rx="4" fill={fillSoft} stroke={strokeMain} strokeWidth="2" />
          {/* Entry Bay */}
          <rect x="68" y="106" width="24" height="24" rx="3" fill={isDark ? "#0d1117" : "#f1f5f9"} stroke={strokeMain} strokeWidth="1.8" />
          <line x1="80" y1="106" x2="80" y2="130" stroke={strokeMain} strokeWidth="1.5" />

          {/* Dome Hemispherical Roof */}
          <path
            d="M 42 86 C 42 48, 118 48, 118 86 Z"
            fill={fillSoft}
            stroke={strokeMain}
            strokeWidth="2.5"
          />
          {/* Slit Opening for Telescope */}
          <path d="M 70 86 C 70 54, 90 54, 90 86 Z" fill={isDark ? "#0f172a" : "#cbd5e1"} stroke={strokeMain} strokeWidth="1.8" />
          {/* Optical Telescope Barrel pointing up */}
          <line x1="74" y1="68" x2="62" y2="40" stroke="#4285f4" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="38" r="4" fill="#f9ab00" />
          
          {/* Surrounding Starlight Sparkle */}
          <path d="M 54 28 L 56 32 L 60 33 L 56 34 L 54 38 L 52 34 L 48 33 L 52 32 Z" fill="#f9ab00" />
        </svg>
      </div>

      {/* 5. Constellations With Star Lines (Ursa Major, Orion, Cassiopeia) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45 dark:opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Constellation 1: Ursa Major / Big Dipper (Top Center) */}
        <g stroke={strokeMuted} strokeWidth="1" strokeDasharray="4 4" fill="none">
          <line x1="38%" y1="12%" x2="42%" y2="14%" />
          <line x1="42%" y1="14%" x2="45%" y2="18%" />
          <line x1="45%" y1="18%" x2="49%" y2="19%" />
          <line x1="49%" y1="19%" x2="52%" y2="24%" />
          <line x1="52%" y1="24%" x2="48%" y2="26%" />
          <line x1="48%" y1="26%" x2="45%" y2="22%" />
          <line x1="45%" y1="22%" x2="49%" y2="19%" />
        </g>
        <circle cx="38%" cy="12%" r="2.5" fill="#4285f4" />
        <circle cx="42%" cy="14%" r="2" fill="#fff" />
        <circle cx="45%" cy="18%" r="3" fill="#ea4335" />
        <circle cx="49%" cy="19%" r="2.5" fill="#fff" />
        <circle cx="52%" cy="24%" r="3" fill="#f9ab00" />
        <circle cx="48%" cy="26%" r="2.5" fill="#34a853" />
        <circle cx="45%" cy="22%" r="2" fill="#fff" />

        {/* Constellation 2: Cassiopeia (Mid-Left) */}
        <g stroke={strokeMuted} strokeWidth="1" strokeDasharray="3 4" fill="none">
          <line x1="8%" y1="62%" x2="11%" y2="58%" />
          <line x1="11%" y1="58%" x2="14%" y2="61%" />
          <line x1="14%" y1="61%" x2="17%" y2="57%" />
          <line x1="17%" y1="57%" x2="20%" y2="60%" />
        </g>
        <circle cx="8%" cy="62%" r="2.5" fill="#f9ab00" />
        <circle cx="11%" cy="58%" r="3" fill="#4285f4" />
        <circle cx="14%" cy="61%" r="2" fill="#fff" />
        <circle cx="17%" cy="57%" r="3" fill="#34a853" />
        <circle cx="20%" cy="60%" r="2.5" fill="#ea4335" />

        {/* Constellation 3: Orion Belt & Nodes (Lower Center) */}
        <g stroke={strokeMuted} strokeWidth="1" strokeDasharray="4 4" fill="none">
          <line x1="56%" y1="72%" x2="59%" y2="76%" />
          <line x1="59%" y1="76%" x2="62%" y2="80%" />
          <line x1="59%" y1="76%" x2="55%" y2="82%" />
          <line x1="59%" y1="76%" x2="64%" y2="73%" />
        </g>
        <circle cx="56%" cy="72%" r="3" fill="#ea4335" />
        <circle cx="59%" cy="76%" r="3" fill="#4285f4" />
        <circle cx="62%" cy="80%" r="3" fill="#34a853" />
        <circle cx="55%" cy="82%" r="2" fill="#f9ab00" />
        <circle cx="64%" cy="73%" r="2" fill="#fff" />
      </svg>

      {/* 6. Dynamic Shooting Stars / Meteor Trails */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shooting Star 1 (Top Left) */}
        <line x1="6%" y1="4%" x2="16%" y2="12%" stroke="url(#meteor-gradient-1)" strokeWidth="2" strokeLinecap="round" />
        {/* Shooting Star 2 (Center Right) */}
        <line x1="78%" y1="38%" x2="92%" y2="48%" stroke="url(#meteor-gradient-2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Shooting Star 3 (Bottom Left) */}
        <line x1="12%" y1="76%" x2="24%" y2="84%" stroke="url(#meteor-gradient-3)" strokeWidth="2" strokeLinecap="round" />

        <defs>
          <linearGradient id="meteor-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285f4" stopOpacity="0" />
            <stop offset="80%" stopColor="#4285f4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="meteor-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea4335" stopOpacity="0" />
            <stop offset="80%" stopColor="#f9ab00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="meteor-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34a853" stopOpacity="0" />
            <stop offset="80%" stopColor="#34a853" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 7. Twinkling 4-Point Retro Sparkle Stars (Matching DevFest Poster Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* High-visibility stars matching the poster's iconic 4-point star */}
        <span className="absolute top-[5%] left-[14%] text-lg text-[#0f172a] dark:text-[#f9ab00] animate-pulse">✦</span>
        <span className="absolute top-[10%] right-[18%] text-2xl text-[#4285f4] animate-pulse" style={{ animationDelay: "1s" }}>✦</span>
        <span className="absolute top-[18%] left-[28%] text-base text-[#34a853] animate-pulse" style={{ animationDelay: "2s" }}>✦</span>
        <span className="absolute top-[26%] right-[8%] text-xl text-[#ea4335] animate-pulse" style={{ animationDelay: "0.8s" }}>✦</span>
        <span className="absolute top-[34%] left-[10%] text-2xl text-[#0f172a] dark:text-[#f9ab00] animate-pulse" style={{ animationDelay: "1.6s" }}>✦</span>
        <span className="absolute top-[42%] right-[22%] text-lg text-[#4285f4] animate-pulse" style={{ animationDelay: "2.4s" }}>✦</span>
        <span className="absolute top-[50%] left-[24%] text-base text-[#34a853] animate-pulse" style={{ animationDelay: "1.2s" }}>✦</span>
        <span className="absolute top-[58%] right-[14%] text-2xl text-[#ea4335] animate-pulse" style={{ animationDelay: "2.8s" }}>✦</span>
        <span className="absolute top-[66%] left-[8%] text-lg text-[#0f172a] dark:text-[#f9ab00] animate-pulse" style={{ animationDelay: "1.4s" }}>✦</span>
        <span className="absolute top-[74%] right-[26%] text-xl text-[#4285f4] animate-pulse" style={{ animationDelay: "2.1s" }}>✦</span>
        <span className="absolute top-[82%] left-[18%] text-base text-[#34a853] animate-pulse" style={{ animationDelay: "0.5s" }}>✦</span>
        <span className="absolute top-[90%] right-[12%] text-2xl text-[#f9ab00] animate-pulse" style={{ animationDelay: "1.9s" }}>✦</span>

        {/* Smaller stardust nodes */}
        <span className="absolute top-[14%] left-[62%] text-xs text-[#4285f4] animate-ping" style={{ animationDuration: "3s" }}>✧</span>
        <span className="absolute top-[28%] left-[44%] text-xs text-[#ea4335] animate-ping" style={{ animationDuration: "4s" }}>✧</span>
        <span className="absolute top-[48%] right-[44%] text-xs text-[#34a853] animate-ping" style={{ animationDuration: "3.5s" }}>✧</span>
        <span className="absolute top-[68%] left-[36%] text-xs text-[#f9ab00] animate-ping" style={{ animationDuration: "2.5s" }}>✧</span>
        <span className="absolute top-[86%] right-[36%] text-xs text-[#4285f4] animate-ping" style={{ animationDuration: "3.2s" }}>✧</span>
      </div>

      {/* 8. Telemetry Mission Overlay Stamps */}
      <div className="absolute top-20 right-4 hidden 2xl:block font-mono text-[9px] font-black uppercase tracking-widest text-[#0f172a]/30 dark:text-white/20 text-right space-y-0.5">
        <div>SYS: NOMINAL // GDG DEVFEST 2026</div>
        <div>ORBIT: LAT 22.7196° N • LON 75.8577° E</div>
        <div>ALTITUDE: 420 KM • INCLINATION: 51.6°</div>
      </div>

      {/* 9. Interactive Pop Badges along Viewport Margins */}
      <div
        className="pointer-events-auto absolute top-28 left-[2%] hidden md:flex items-center justify-center w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white dark:bg-[#070d1e]/90 border border-black/12 dark:border-[#4285f4]/40 shadow-md dark:shadow-[0_0_20px_rgba(66,133,244,0.3)] animate-float cursor-pointer hover:scale-125 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#4285f4");
        }}
        title="Cosmic Star • Click to ignite!"
      >
        <span className="text-base lg:text-lg select-none">✦</span>
      </div>

      <div
        className="pointer-events-auto absolute top-[36%] right-[2%] hidden md:flex items-center justify-center w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white dark:bg-[#120a22]/90 border border-black/12 dark:border-[#f9ab00]/50 shadow-md dark:shadow-[0_0_20px_rgba(249,171,0,0.3)] animate-float-alt cursor-pointer hover:scale-125 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#f9ab00");
        }}
        title="Orbital Satellite • Click to beam!"
      >
        <span className="text-base lg:text-lg select-none">🛰️</span>
      </div>

      <div
        className="pointer-events-auto absolute bottom-[28%] left-[2%] hidden md:flex items-center justify-center w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white dark:bg-[#1f0d14]/90 border border-black/12 dark:border-[#ea4335]/40 shadow-md dark:shadow-[0_0_20px_rgba(234,67,53,0.3)] animate-float cursor-pointer hover:scale-125 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#ea4335");
        }}
        title="Launch Rocket • Click to blast off!"
      >
        <span className="text-base lg:text-lg select-none">🚀</span>
      </div>

      <div
        className="pointer-events-auto absolute bottom-[18%] right-[2%] hidden md:flex items-center justify-center w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white dark:bg-[#06121f]/90 border border-black/12 dark:border-[#34a853]/40 shadow-md dark:shadow-[0_0_20px_rgba(52,168,83,0.3)] animate-float-alt cursor-pointer hover:scale-125 transition-all backdrop-blur-md"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          triggerShapePop(rect.left + 24, rect.top + 24, "#34a853");
        }}
        title="Spacewalk Astronaut • Click to cheer!"
      >
        <span className="text-base lg:text-lg select-none">👨‍🚀</span>
      </div>
    </div>
  );
}
