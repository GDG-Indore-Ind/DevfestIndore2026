# DevFest Indore 2026 — Master Engineering & Design System Playbook

Welcome to the autonomous engineering specifications for **GDG DevFest Indore 2026** (Central India's Flagship Developer & Space Technology Conference).

---

## 1. Core Architecture & Deployment
- **Production Host**: [https://devfest2026-iota.vercel.app/](https://devfest2026-iota.vercel.app/)
- **Repository**: `https://github.com/soham2710/devfest2026.git` (Branch: `main`)
- **Framework**: Next.js 16 (App Router + React 19 + Turbopack)
- **Styling**: Tailwind CSS + Tokenized CSS Variables (`globals.css`)
- **Backend / Storage**:
  - Direct Cloudinary integration for live assets & speaker uploads (Cloud: `agcnziwc`).
  - Offline-first resilient state with local persistence & structured telemetry.
  - Zero serverless lock-in: Firebase backend folders (`.firebase`, `.firebaserc`, `firebase.json`) removed to guarantee pure, friction-free Vercel and edge deployments.

---

## 2. Design System & Theme Foundations
- **Dark Mode (Default & Deep Space Aesthetic)**:
  - Background: Pitch-black void (`#000000`) with high-resolution Mars planetary artwork (`/images/mars-bg.jpg`).
  - Cards: Pure dark glass (`rgba(13, 13, 13, 0.90)`), subtle 1px white border (`rgba(255, 255, 255, 0.12)`), and Google 4-color soft glows.
  - Typography: Crisp white (`#ffffff`) headers and high-contrast light slate (`rgba(255, 255, 255, 0.85)`) body copy.
- **Light Mode (Blueprint Technical Aesthetic)**:
  - Background: Pristine clean surface (`#ffffff`) with subtle dot-grid blueprint coordinates.
  - Cards: High-contrast white surfaces with distinct graphite borders (`#e5e7eb` / `#1f2937`) and Google pill drop-shadows.
  - Typography: Jet black (`#111827`) headings and rich charcoal (`#374151`) body copy.
  - Contrast Rules: Toggle pills and category filters **must** have WCAG 2.2 AA compliant contrast (e.g. active buttons use `#111827` bg with `#ffffff` text, unselected use white bg with `#111827` text).

---

## 3. Key Playbooks & Workflows

### Playbook A: Venue & Location Presentation
- **Left Column (Primary / Larger - 7 Columns)**:
  - Official Essentia Luxury Convention Arena card with real venue photo (`/images/essentia-hotel-actual.jpg`).
  - Key technical specifications: 600+ Auditorium Capacity, High-Density Enterprise Wi-Fi, Parallel Halls, and Cosmic Buffet Dining.
- **Right Column (Navigation / Compact - 5 Columns)**:
  - Embedded Google Map iframe pinpointing Essentia Luxury Hotel Indore (Lat 22.7101° N, Lon 75.9039° E).
  - Direct action button to launch external turn-by-turn navigation in Google Maps.

### Playbook B: Content Curriculum & Space Partnerships
- **5 Strategic Pillars**:
  - Scroll-triggered reveal cards powered by `IntersectionObserver`.
  - Color-accented Google icons: Space Tech (Blue), Agentic AI (Red), Physical AI (Yellow), Scalable Data (Green), and Enterprise Adoption (Blue).
  - Grounded partnership copy: Frame aerospace initiatives as an emerging alliance and telemetry pipeline, avoiding premature "completed MOU" commitments.
- **9 Planetary Tracks**:
  - Cinematic 3D interactive solar system with GDG Indore Sun at the focal center.

### Playbook C: Call for Speakers (CFP) & Sessionize
- Live CFP Sessionize link: `https://sessionize.com/devfest-indore-2026/`
- Direct in-page proposal submission form with instant admin notification and review board.

### Playbook D: Featured Steering Committee & Past Speakers
- Mumbai Tech Week-inspired tokenized card layout.
- **3 Anchor Leads**:
  1. **Tushar Pal** — Community Lead & GDG Indore Organizer.
  2. **Akash Gangrade** — Organizer & Tech Architecture Lead.
  3. **Karan Mittal** — Organizer & Operations Lead.
- Direct navigation link to the full `/team` page.
- Hall of Past Keynote Speakers alumni strip showcasing previous Google Developer Experts and engineering leaders.

---

## 4. Telemetry, Analytics & SEO Skills
- **Google Tag Manager**: `GTM-53S9M7C9` container in `<head>` and `<noscript>` body fallback.
- **Google Analytics 4**: Stream `G-PRRCSRF36D` with active pageview and custom conversion tracking.
- **Structured Data (JSON-LD)**: Schema.org `Event`, `Place`, `Organization`, and `PostalAddress` injected into `<head>`.
- **Admin Panel Dashboard**: Real-time event telemetry breakdown, geographic source distribution, and live CFP review board accessible at `/admin`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/`.
<!-- END:nextjs-agent-rules -->
