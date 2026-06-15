# Fase 4 — Layout System

**Status:** ✅ Selesai  
**Versi:** 1.0.0

---

## Ringkasan

RDP-UI menyediakan 3 layout utama:

| Layout | Penggunaan | Class |
|--------|------------|-------|
| Blank | Login, Register, Error | `rdp-layout-blank` |
| Homepage | Landing Page, Marketing | `rdp-layout-homepage` |
| Dashboard | SaaS, CRM, Admin | `rdp-layout-dashboard` |

---

## File yang Dibuat

| File | Deskripsi |
|------|-----------|
| `src/core/layouts/blank.css` | Layout halaman otonom |
| `src/core/layouts/homepage.css` | Layout landing page |
| `src/core/layouts/dashboard.css` | Layout dashboard SaaS |

---

## Blank Layout

Untuk halaman yang berdiri sendiri: login, register, error pages.

```html
<body class="rdp-layout-blank">
  <main class="rdp-blank">
    <div class="rdp-blank__card">
      <div class="rdp-blank__logo">
        <img src="logo.svg" alt="RDP">
      </div>
      <h1 class="rdp-blank__title">Masuk</h1>
      <p class="rdp-blank__subtitle">Silakan login untuk melanjutkan</p>
      <form>
        <!-- form fields -->
        <button class="rdp-btn rdp-btn--primary rdp-btn--block">Masuk</button>
      </form>
      <div class="rdp-blank__divider">atau</div>
      <div class="rdp-blank__footer">
        Belum punya akun? <a href="#">Daftar</a>
      </div>
    </div>
  </main>
</body>
```

**Lihat contoh:** `examples/layouts-blank.html`

---

## Homepage Layout

Untuk landing page dan marketing site.

```html
<body class="rdp-layout-homepage">
  <!-- Navbar -->
  <nav class="rdp-topnav">
    <a href="#" class="rdp-topnav__brand">Brand</a>
    <ul class="rdp-topnav__links">
      <li><a href="#">Link</a></li>
    </ul>
    <div class="rdp-topnav__actions">
      <button class="rdp-btn rdp-btn--sm rdp-btn--primary">CTA</button>
      <button class="rdp-topnav__toggle" data-rdp-action="toggle-mobile-nav">☰</button>
    </div>
    <div class="rdp-topnav__mobile">
      <!-- Mobile links -->
    </div>
  </nav>

  <!-- Hero -->
  <section class="rdp-hero">
    <div class="rdp-hero__inner">
      <p class="rdp-hero__overline">Overline</p>
      <h1 class="rdp-hero__title">Headline</h1>
      <p class="rdp-hero__subtitle">Subtitle paragraph</p>
      <div class="rdp-hero__actions">
        <a href="#" class="rdp-btn rdp-btn--primary rdp-btn--lg">CTA</a>
      </div>
    </div>
  </section>

  <!-- Sections -->
  <section class="rdp-section">
    <div class="rdp-section__inner">
      <div class="rdp-section__header">
        <h2 class="rdp-section__title">Section</h2>
      </div>
    </div>
  </section>
  <section class="rdp-section rdp-section--alt">...</section>
  <section class="rdp-section rdp-section--cream">...</section>

  <!-- Footer -->
  <footer class="rdp-footer">...</footer>
</body>
```

**Lihat contoh:** `examples/layouts-homepage.html`

---

## Dashboard Layout

Untuk aplikasi SaaS setelah login.

### Responsive Behavior

| Viewport | Sidebar | Behavior |
|----------|---------|----------|
| Mobile (< 768px) | Hidden → Drawer overlay | Toggle via hamburger |
| Tablet (768-1023px) | Collapsed (64px, icon-only) | Selalu visible |
| Desktop (≥ 1024px) | Expanded (260px) | Selalu visible |

```html
<body class="rdp-layout-dashboard">
  <!-- Mobile backdrop -->
  <div class="rdp-sidebar-backdrop"></div>

  <!-- Sidebar -->
  <aside class="rdp-sidebar">
    <a href="#" class="rdp-sidebar__brand">Brand</a>
    <nav class="rdp-sidebar__nav">
      <div class="rdp-sidebar__section">
        <div class="rdp-sidebar__section-title">Menu</div>
        <a href="#" class="rdp-sidebar__link active">
          <span class="rdp-sidebar__link-icon">📊</span>
          <span class="rdp-sidebar__link-text">Dashboard</span>
        </a>
      </div>
    </nav>
    <div class="rdp-sidebar__footer">...</div>
  </aside>

  <!-- Main Area -->
  <div class="rdp-dashboard-main">
    <header class="rdp-dashboard-topbar">
      <button class="rdp-dashboard-topbar__toggle"
              data-rdp-action="toggle-sidebar">☰</button>
      <h1 class="rdp-dashboard-topbar__title">Page Title</h1>
      <div class="rdp-dashboard-topbar__actions">...</div>
    </header>

    <nav aria-label="Breadcrumb">
      <ul class="rdp-breadcrumb">
        <li><a href="#">Home</a></li>
        <li>Current Page</li>
      </ul>
    </nav>

    <main class="rdp-dashboard-content">
      <div class="rdp-page-header">
        <h2 class="rdp-page-header__title">Page Title</h2>
        <div class="rdp-page-header__actions">
          <button class="rdp-btn rdp-btn--primary">Action</button>
        </div>
      </div>
      <!-- Content -->
    </main>

    <footer class="rdp-dashboard-footer">Footer</footer>
  </div>
</body>
```

**Lihat contoh:** `examples/layouts-dashboard.html`

---

## Referensi

- PRD v3.0 Section: Layout System
- PRD v3.1 Section: Core Principles → Mobile First & Responsive
