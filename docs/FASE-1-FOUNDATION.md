# Fase 1 — Foundation: Design Tokens, Typography & Utilities

**Status:** ✅ Selesai  
**Versi:** 1.0.0

---

## Ringkasan

Fase 1 membangun fondasi RDP-UI Design System:
- **Design Tokens** — Seluruh variabel CSS (warna, spacing, radius, shadow, z-index)
- **Reset** — Normalisasi browser + accessibility defaults
- **PicoCSS Override** — Mapping token RDP ke variabel PicoCSS 2.1.1
- **Typography** — Sistem tipografi dengan RDP Serif, RDP Sans, dan RDP Mono
- **Utilities** — Kelas bantu untuk layout, spacing, text, dan visibility

---

## File yang Dibuat

| File | Deskripsi |
|------|-----------|
| `src/core/tokens.css` | Design tokens (CSS custom properties) |
| `src/core/reset.css` | Reset + accessibility + reduced-motion |
| `src/core/pico-override.css` | Override PicoCSS 2.1.1 dengan token RDP |
| `src/core/typography.css` | Font family, heading scale, utility typografi |
| `src/core/utilities.css` | Layout, spacing, text, visibility utilities |
| `src/rdp.css` | Entry point (import semua modul) |
| `src/rdp.js` | JavaScript interaktivitas minimal |

---

## Brand Colors — Identitas RDP

| Token | Hex | Deskripsi |
|-------|-----|-----------|
| `--rdp-primary` (Navy) | `#0C2340` | Warna utama brand |
| `--rdp-secondary` (Gold) | `#B87D2E` | Aksen premium / CTA |
| `--rdp-accent` (Teal) | `#0F6E56` | Sukses / positif |
| `--rdp-cream` | `#F5F2EE` | Background khas RDP |

Setiap warna memiliki shade 50–900:
```css
var(--rdp-primary-50)   /* paling terang */
var(--rdp-primary-100)
var(--rdp-primary-200)
...
var(--rdp-primary-900)  /* paling gelap = base */
```

---

## Cara Penggunaan

### 1. Load di HTML (CDN)

```html
<!-- PicoCSS Foundation -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2.1.1/css/pico.min.css">

<!-- RDP-UI -->
<link rel="stylesheet" href="https://cdn.radian.web.id/rdp.css">
<script src="https://cdn.radian.web.id/rdp.js" defer></script>
```

### 2. Gunakan Token di CSS Custom

```css
.my-component {
  color: var(--rdp-primary);
  padding: var(--rdp-space-md);
  border-radius: var(--rdp-radius-md);
  box-shadow: var(--rdp-shadow-sm);
}
```

### 3. Gunakan Typography Classes

```html
<h1 class="rdp-display">Judul Besar</h1>
<p class="rdp-body-lg">Paragraf lead</p>
<span class="rdp-caption">Keterangan kecil</span>
<span class="rdp-label">LABEL</span>
```

### 4. Gunakan Utility Classes

```html
<div class="rdp-container rdp-grid rdp-grid-responsive">
  <div class="rdp-bg-primary rdp-p-md rdp-rounded-md">
    Konten
  </div>
</div>
```

---

## Spacing Scale

| Token | Nilai | Pixel |
|-------|-------|-------|
| `--rdp-space-xs` | 0.25rem | 4px |
| `--rdp-space-sm` | 0.5rem | 8px |
| `--rdp-space-md` | 1rem | 16px |
| `--rdp-space-lg` | 1.5rem | 24px |
| `--rdp-space-xl` | 2rem | 32px |
| `--rdp-space-2xl` | 3rem | 48px |
| `--rdp-space-3xl` | 4rem | 64px |

---

## Breakpoints (Mobile First)

| Nama | Min-Width | Penggunaan |
|------|-----------|------------|
| (base) | - | Mobile (320-767px) |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1920px | Ultra-wide |

---

## Referensi

- [PicoCSS Variables](https://picocss.com/docs/css-variables)
- [RDP Font CSS](../src/fonts/rdp-font/rdp-font.css)
- [PRD v3.1](./PRD/PRD%20RDP-UI-v3.1.md)
