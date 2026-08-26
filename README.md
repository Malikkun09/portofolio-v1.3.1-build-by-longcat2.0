# Portfolio V3 — Malik Fajar

Dark/OLED portfolio dengan GSAP cinematic project reel. Dibangun dengan Vite + React,
GSAP (ScrollTrigger) untuk animasi besar, Anime.js untuk micro-interaction.

## Run

```bash
npm install --include=dev   # environment ini set NODE_ENV=production by default
npm run dev                 # dev server
npm run build && npm run preview
```

## Arsitektur

```
src/
  animations/     GSAP utils + Anime.js micro-interactions
  components/     BackgroundFX (grid + light sweep), CustomCursor, Navbar, Loader, SocialIcon
  sections/       Hero, About, ProjectReel, Lab, Skills, Journey, Links, Contact
  data/           portfolio.js — SEMUA konten (jangan hardcode di komponen)
  hooks/          useMedia / useReducedMotion
  styles/         tokens (design system), sections, background
```

## Sumber data (source of truth)

Semua konten berasal dari `/home/malikfajare/PKL-Crud-Laravel`:

- `resources/js/Pages/Portfolio/data/portfolio.jsx` — profil, 5 project web, video demo, kontak
- `resources/js/Pages/Portfolio/sections/Contact.jsx` — 7 social links
- `resources/js/Pages/Portfolio/sections/MainPortfolio.jsx` — 6 domain milik Malik
- `README.md` + git remote — project Sistem Inventaris Laravel (project #01)
- Aset disalin ke `public/assets/` (foto profil, 5 screenshot webp, 2 video demo + poster)

Project #01 (Sistem Inventaris) tidak punya screenshot — dirender sebagai terminal card
berisi fakta asli: repo GitHub, 46 test hijau, security-check exit 0.

## Catatan

- Cinematic reel aktif hanya di layar ≥861px dengan motion OK; mobile/reduced-motion
  mendapat versi stacked statis.
- Light sweep: siklus ~10 detik (travel ~3.4s + rest), dikontrol GSAP timeline.
- Video demo di Lab lazy-load via IntersectionObserver; video project #02 hanya
  play-on-hover setelah `canplay`.
