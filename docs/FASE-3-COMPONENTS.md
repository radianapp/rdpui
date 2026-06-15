# Fase 3 — Core Components

**Status:** ✅ Selesai  
**Versi:** 1.0.0

---

## Ringkasan

Komponen inti RDP-UI yang paling sering digunakan di seluruh produk Radian.

---

## Daftar Komponen

| Komponen | File | Deskripsi |
|----------|------|-----------|
| Button | `src/components/button/button.css` | Tombol dengan variants & sizes |
| Badge | `src/components/badge/badge.css` | Label/tag kecil |
| Alert | `src/components/alert/alert.css` | Pesan notifikasi |
| Avatar | `src/components/avatar/avatar.css` | Foto profil / inisial user |
| Card | `src/components/card/card.css` | Container konten |

---

## Button

### Variants

```html
<button class="rdp-btn">Default</button>
<button class="rdp-btn rdp-btn--primary">Primary</button>
<button class="rdp-btn rdp-btn--secondary">Secondary</button>
<button class="rdp-btn rdp-btn--accent">Accent</button>
<button class="rdp-btn rdp-btn--danger">Danger</button>
<button class="rdp-btn rdp-btn--outline">Outline</button>
<button class="rdp-btn rdp-btn--ghost">Ghost</button>
```

### Sizes

```html
<button class="rdp-btn rdp-btn--xs">Extra Small</button>
<button class="rdp-btn rdp-btn--sm">Small</button>
<button class="rdp-btn">Medium (default)</button>
<button class="rdp-btn rdp-btn--lg">Large</button>
<button class="rdp-btn rdp-btn--xl">Extra Large</button>
```

### Special

```html
<!-- Full width -->
<button class="rdp-btn rdp-btn--block rdp-btn--primary">Full Width</button>

<!-- Pill shape -->
<button class="rdp-btn rdp-btn--pill rdp-btn--primary">Pill</button>

<!-- Loading state (HTMX compatible) -->
<button class="rdp-btn rdp-btn--primary rdp-btn--loading">Saving...</button>

<!-- Disabled -->
<button class="rdp-btn rdp-btn--primary" disabled>Disabled</button>

<!-- Button group -->
<div class="rdp-btn-group">
  <button class="rdp-btn">Kiri</button>
  <button class="rdp-btn">Tengah</button>
  <button class="rdp-btn">Kanan</button>
</div>
```

### HTMX Integration

```html
<!-- Loading otomatis saat HTMX request -->
<button class="rdp-btn rdp-btn--primary"
        hx-post="/api/save/"
        hx-target="#result"
        aria-busy="false">
  Simpan
</button>
```

---

## Badge

### Variants

```html
<span class="rdp-badge rdp-badge--primary">Primary</span>
<span class="rdp-badge rdp-badge--success">Success</span>
<span class="rdp-badge rdp-badge--warning">Warning</span>
<span class="rdp-badge rdp-badge--danger">Danger</span>
<span class="rdp-badge rdp-badge--info">Info</span>

<!-- Solid -->
<span class="rdp-badge rdp-badge--solid-primary">Solid</span>

<!-- Outline -->
<span class="rdp-badge rdp-badge--outline-primary">Outline</span>
```

### Dot Indicator

```html
<span class="rdp-badge rdp-badge--dot rdp-badge--success"></span> Online
<span class="rdp-badge rdp-badge--dot rdp-badge--danger"></span> Offline
```

---

## Alert

```html
<div class="rdp-alert rdp-alert--info" role="alert">
  <div class="rdp-alert__content">
    <div class="rdp-alert__title">Informasi</div>
    Pesan informasi di sini.
  </div>
</div>

<!-- Dismissible -->
<div class="rdp-alert rdp-alert--danger rdp-alert--dismissible" role="alert">
  <div class="rdp-alert__content">Error message</div>
  <button class="rdp-alert__close" data-rdp-action="dismiss-alert">&times;</button>
</div>
```

---

## Avatar

```html
<!-- Dengan inisial -->
<div class="rdp-avatar rdp-avatar--lg">
  <span class="rdp-avatar__initials">RD</span>
  <span class="rdp-avatar__status rdp-avatar__status--online"></span>
</div>

<!-- Dengan gambar -->
<div class="rdp-avatar">
  <img src="user.jpg" alt="Rahadi">
</div>

<!-- Group -->
<div class="rdp-avatar-group">
  <div class="rdp-avatar-group__count">+3</div>
  <div class="rdp-avatar"><span class="rdp-avatar__initials">A</span></div>
  <div class="rdp-avatar"><span class="rdp-avatar__initials">B</span></div>
</div>
```

---

## Card

```html
<article class="rdp-card">
  <header class="rdp-card__header">
    <h3 class="rdp-card__title">Judul Card</h3>
    <p class="rdp-card__subtitle">Subtitle</p>
  </header>
  <div class="rdp-card__body">Konten card.</div>
  <footer class="rdp-card__footer">
    <button class="rdp-btn rdp-btn--sm rdp-btn--primary">Aksi</button>
  </footer>
</article>

<!-- Variants -->
<article class="rdp-card rdp-card--elevated">...</article>
<article class="rdp-card rdp-card--flat">...</article>
<article class="rdp-card rdp-card--clickable">...</article>
<article class="rdp-card rdp-card--primary">...</article>

<!-- Stats Card -->
<article class="rdp-card rdp-card--stats">
  <div class="rdp-card__value">12,847</div>
  <div class="rdp-card__label">Total Users</div>
  <div class="rdp-card__change rdp-card__change--up">↑ 12.5%</div>
</article>
```

---

## Referensi

- Lihat `index.html` untuk preview visual semua komponen
- Lihat `examples/` untuk contoh penggunaan di konteks nyata
