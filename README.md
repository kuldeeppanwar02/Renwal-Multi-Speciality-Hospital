
<div align="center">

# 🏥 Renwal Multi-Speciality Hospital

### Production Hospital Web Platform with Clinic OS Integration

**Cloudflare Workers · Vanilla JS · Doctor Modal System · Insurance Empanelled**

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Design_System-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed-Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Live](https://img.shields.io/badge/Live-rmhospital.vercel.app-green)](https://rmhospital.vercel.app)

[**🚀 Live → **](https://rmh.kpanwar.workers.dev/)

</div>

---

## 🎯 About

**Renwal Multi-Speciality Hospital (RMH)** is a full-service hospital platform serving patients across multiple specialities. This codebase delivers the complete patient-facing web experience — doctor discovery, department information, insurance empanelment, gallery, and emergency contact — deployed on **Cloudflare Workers** for global edge performance.

The project also documents the **Clinic OS Core Engine integration plan** — the roadmap to bring RMH's fully digital queue management system (appointment booking, QR walk-in tokens, live queue display) to life.

---

## 🏗️ Architecture: Two Systems, One Goal

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 1 — Patient Website (Live Now)                           │
│  HTML + CSS + JS → Deployed on Cloudflare Workers (Edge)       │
│                                                                 │
│  ✅ Doctor profiles + modal system                              │
│  ✅ Department cards with animations                            │
│  ✅ Insurance empanelment display                               │
│  ✅ Stats counter animation                                     │
│  ✅ Scroll-reveal effects                                       │
│  ✅ Responsive + mobile-ready                                   │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼ Integration Roadmap (Core_OS_Integration_Guide.md)
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 2 — Clinic OS Core Engine (Planned Integration)          │
│  Transplanted from clinic-os (Panwar Health Care)               │
│                                                                 │
│  🔲 Appointment booking  (/book?dept=cardiology|ortho|icu)      │
│  🔲 QR walk-in tokens    (/walkin?dept=...)                     │
│  🔲 Live queue display   (/live?dept=...)                       │
│  🔲 Staff dashboard      (/staff?dept=...)                      │
│  🔲 Supabase WebSocket real-time sync                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Frontend Features (Implemented)

### 👨‍⚕️ Doctor Profile System
Each doctor has a rich data model powering both cards and modals:

```javascript
const doctorData = {
  nishkarsh: {
    name:      'Dr. Nishkarsh Mehta',
    qual:      'MCh Urology · 10+ Years Experience',
    title:     'Consultant Urologist & Kidney Transplant Surgeon',
    dept:      'Urology',
    deptColor: '#0ea5e9',
    timing:    'Mon–Sat: 4:00 PM – 8:00 PM',
    emergency: true,
    specs: ['Kidney Transplant', 'Ureteral Disorders', 'Bladder Conditions',
            'Prostate Treatment', 'Minimally Invasive Urology'],
    bio: '...'
  },
  rajesh: { /* Head of General Medicine & ICU */ },
  samota: { /* MS Orthopaedics */ },
  // + more doctors
}
```

**Clicking a doctor card** opens a full-detail modal with specialty chips, timings, emergency availability badge, and biography — zero page reload.

### 🌀 3D Tilt Effect on Doctor Cards
Real-time physics-based hover interaction:

```javascript
card.addEventListener('mousemove', (e) => {
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
});
```

### 📊 Animated Stats Counter
Numbers count up from 0 when they enter the viewport — 60fps, requestAnimationFrame-based:

```javascript
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const step = target / (1600 / 16);  // ~60fps over 1.6s
  // ...smooth easing to target
}
```

Observed via `IntersectionObserver` — fires once, stays visible.

### 🎬 Scroll Reveal System
3 animation variants, threshold-tuned for mobile:
- `.reveal` — fade up
- `.reveal-left` — slide from left
- `.reveal-right` — slide from right

```javascript
new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
```

### 🧭 Active Nav Tracking
Scroll position → active section detection → nav link highlight, updated at 60fps with passive scroll listener.

---

## 🏥 Departments Covered

| Department | Specialist |
|-----------|-----------|
| 🔵 Urology & Kidney Transplant | Dr. Nishkarsh Mehta (MCh) |
| 🟢 General Medicine & ICU | Dr. Rajesh Bochaliya (MD) |
| 🟡 Orthopaedics | Dr. R P Samota (MS) |
| + More specialists | Dr. ML Didel, Dr. Pankaj |

---

## 🏛️ Insurance Empanelment

RMH is empanelled under major government health schemes:

| Scheme | Coverage |
|--------|---------|
| **Ayushman Bharat** | Cashless treatment up to ₹5 Lakh/year |
| **MAA Yojana** | Rajasthan state health scheme |
| **Amul** | Corporate health coverage |
| **Saras** | Government employee coverage |

These logos are prominently displayed on the homepage — building immediate trust with patients from rural and semi-urban areas.

---

## 🌐 Deployment: Cloudflare Workers

This site is configured for **Cloudflare Workers** — a serverless edge platform:

```jsonc
// wrangler.jsonc
{
  "name": "rmh",
  "compatibility_date": "2026-05-24",
  "observability": { "enabled": true },
  "assets": { ... }
}
```

**Why Cloudflare Workers over plain Vercel static?**
- Edge network — pages served from the nearest location to the patient
- Built-in observability — request metrics, error tracking
- Zero cold starts — critical for healthcare where every second counts
- Global CDN with 300+ PoPs

---

## 🧠 Clinic OS Core Engine — Integration Roadmap

The `Core_OS_Integration_Guide.md` documents the exact files to transplant from `clinic-os` (Panwar Health Care) into RMH to add full digital queue management:

### Files to Migrate

| Module | Source File | Purpose |
|--------|------------|---------|
| **Types** | `src/features/clinic/types.ts` | `ClinicId`, `QueueEntry`, `QueueStatus` — adapt dept IDs for RMH |
| **Catalog** | `src/features/clinic/catalog.ts` | Replace Panwar clinics with RMH departments (Cardiology, Ortho, ICU…) |
| **Queue Engine** | `src/features/clinic/services/queue-engine.ts` | **Core algorithm** — token generation, skip/hold/reschedule logic. Copy exactly. |
| **DB Layer** | `src/features/clinic/services/clinic-service.ts` | Supabase CRUD operations |
| **State** | `src/features/clinic/state/clinic-provider.tsx` | React Context: `advanceQueue`, `createWalkIn` actions |
| **Realtime** | `src/features/clinic/hooks/use-realtime-queue.ts` | Supabase WebSocket subscription |
| **Polling** | `src/features/clinic/hooks/use-live-queue-polling.ts` | Fallback for low-connectivity areas |

### Target Routes After Integration

```
/book?dept=cardiology|ortho|urology|icu    ← Department appointment booking
/walkin?dept=...                           ← QR walk-in token
/status?dept=...                           ← Queue status by mobile
/live?dept=...                             ← Waiting room display
/staff?dept=...                            ← Staff dashboard (PIN protected)
```

---

## 📁 Project Structure

```
Renwal-Multi-Speciality-Hospital/
├── index.html              # Main page (91KB — full hospital portal)
├── style.css               # Custom design system (87KB)
├── script.js               # All interactions (23KB — modular, commented)
│
├── doctor/                 # Doctor profile images (WebP optimized)
│   ├── dr_nishkarsh.webp   # Urologist
│   ├── dr_rajesh.webp      # ICU/General Medicine
│   ├── dr_r_p_samota.webp  # Orthopaedics
│   ├── dr_pankaj.webp
│   └── dr_ml_didel.webp
│
├── galary/                 # Hospital gallery images
├── MAA Yojana_files/       # Government scheme documentation
│
├── [Insurance logos]
│   ├── ayushman-logo.webp
│   ├── maa-yojana.webp
│   ├── Amul-logo.webp
│   └── Saras_logo.webp
│
├── hospital-heropage.webp  # Hero image
├── rmh-logo.webp           # Hospital logo
├── wrangler.jsonc          # Cloudflare Workers config
│
└── Core_OS_Integration_Guide.md  # Clinic OS migration blueprint
```

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/kuldeeppanwar02/Renwal-Multi-Speciality-Hospital.git
cd Renwal-Multi-Speciality-Hospital

# Option 1: Simple (no install needed)
# Open index.html directly in browser

# Option 2: Cloudflare Workers local dev
npm install -g wrangler
wrangler dev

# Option 3: Any local server
npx serve .
```

### Deploy to Cloudflare Workers

```bash
wrangler login
wrangler deploy
```

---

## 🔬 Code Quality Highlights

| Aspect | Implementation |
|--------|---------------|
| **Performance** | WebP images throughout, passive scroll listeners, IntersectionObserver (not scroll events) |
| **Accessibility** | Semantic HTML5 sections, ARIA-ready structure |
| **Animation** | Pure CSS transitions + JS-triggered class toggles (no animation library dependency) |
| **Maintainability** | `script.js` clearly sectioned with `===== SECTION NAME =====` comments |
| **Doctor data** | Centralized JS object — one place to update, renders everywhere |
| **Image optimization** | All doctor photos in WebP, logo in WebP |

---

<div align="center">

**Serving patients across Rajasthan — empanelled under Ayushman Bharat & MAA Yojana.**

[**Visit Live →**](https://rmh.kpanwar.workers.dev/) · [Report Bug](https://github.com/kuldeeppanwar02/Renwal-Multi-Speciality-Hospital/issues)

*Designed & Developed by [Kuldeep Panwar](https://github.com/kuldeeppanwar02)*

</div>
