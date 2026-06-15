# RDP-UI — Design System & UI Framework

> Design System, UI Framework, dan Frontend Architecture Standard untuk seluruh produk dalam ekosistem **Radian Data Platform**.

[![Deploy Status](https://github.com/radianapp/rdpui/actions/workflows/deploy.yml/badge.svg)](https://github.com/radianapp/rdpui/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 Quick Start (CDN)

Cukup tambahkan dua baris ke `<head>` halaman Anda — tidak perlu instalasi, tidak perlu build tool:

```html
<!-- CSS Utama (semua komponen) -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">

<!-- JS Interaktivitas (modal, toast, tema switcher) -->
<script src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
```

### Tema Warna Kustom (opsional)

```html
<!-- Tema Hijau -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/green.css">

<!-- Tema Amber -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/amber.css">
```

---

## 📦 Aset CDN

| File | Ukuran | Gzip |
|------|--------|------|
| `assets/rdp.css` | ~83 kB | ~14 kB |
| `assets/rdp.js` | ~5.5 kB | ~2 kB |
| `assets/themes/green.css` | ~0.4 kB | ~0.2 kB |
| `assets/themes/amber.css` | ~0.4 kB | ~0.2 kB |

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Jalankan dev server (http://localhost:3001)
npm run dev

# Build untuk produksi
npm run build

# Preview hasil build
npm run preview
```

---

## 📁 Struktur Proyek

```
cdn.radian.web.id/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deploy ke GitHub Pages
├── src/
│   ├── core/                 # Tokens, typography, utilities, layouts
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── pico-override.css
│   │   ├── typography.css
│   │   ├── utilities.css
│   │   └── layouts/
│   │       ├── blank.css
│   │       ├── homepage.css
│   │       └── dashboard.css
│   ├── components/           # UI Components
│   │   ├── button/
│   │   ├── badge/
│   │   ├── alert/
│   │   ├── avatar/
│   │   ├── card/
│   │   ├── spinner/
│   │   ├── form/
│   │   ├── modal/
│   │   ├── dropdown/
│   │   ├── tabs/
│   │   ├── pagination/
│   │   ├── toast/
│   │   ├── breadcrumb/
│   │   └── table/
│   ├── themes/               # Light, Dark, Auto + Color overrides
│   │   ├── light.css
│   │   ├── dark.css
│   │   ├── auto.css
│   │   └── colors/
│   │       ├── green.css
│   │       └── amber.css
│   ├── fonts/rdp-font/       # RDP Sans & Serif (woff2)
│   ├── rdp.css               # CSS entry point
│   └── rdp.js                # JS entry point
├── examples/                 # Contoh layout
│   ├── layouts-blank.html    # Login page
│   ├── layouts-homepage.html # Landing page
│   └── layouts-dashboard.html
├── public/
│   └── CNAME                 # cdn.radian.web.id
├── docs/                     # Dokumentasi per fase
│   ├── INTEGRASI.md          # Panduan integrasi Django & HTML
│   ├── DEPLOY-GITHUB-PAGES.md
│   └── FASE-*.md
├── dist/                     # Build output (auto-generated)
├── index.html                # Showcase / preview
└── package.json
```

---

## 🎨 Brand Identity

| | Token | Hex | Penggunaan |
|---|---|---|---|
| 🔵 | `--rdp-primary` | `#0C2340` | Navy — Brand utama |
| 🟡 | `--rdp-secondary` | `#B87D2E` | Gold — Premium / CTA |
| 🟢 | `--rdp-accent` | `#0F6E56` | Teal — Sukses / Positif |
| ⬜ | `--rdp-cream` | `#F5F2EE` | Cream — Background khas |

---

## 📖 Dokumentasi

| Dokumen | Keterangan |
|---------|------------|
| [Fase 1 — Foundation](docs/FASE-1-FOUNDATION.md) | Tokens, reset, typography, utilities |
| [Fase 2 — Themes](docs/FASE-2-THEMES.md) | Light, dark, auto, color overrides |
| [Fase 3 — Components](docs/FASE-3-COMPONENTS.md) | Button, badge, alert, avatar, card |
| [Fase 4 — Layouts](docs/FASE-4-LAYOUTS.md) | Blank, homepage, dashboard |
| [Fase 5 — Form & Nav](docs/FASE-5-FORM-NAV.md) | Form, modal, tabs, toast, pagination |
| [Fase 6 — Build](docs/FASE-6-BUILD.md) | Vite build, distribusi CDN |
| [Integrasi](docs/INTEGRASI.md) | Cara pakai di Django & HTML |
| [Deploy GitHub Pages](docs/DEPLOY-GITHUB-PAGES.md) | Panduan publish |

---

## 🏗️ Produk yang Menggunakan

- **Taliti** — Analitik data
- **Akun** — Manajemen akun (Django)
- **TMPT** — Manajemen template
- **Marketplace Data**
- **Internal Tools**

---

## 📄 License

MIT — [Radian Data Platform](https://radian.web.id)
