# Panduan Integrasi RDP-UI

**Versi:** 1.0.0  
**CDN:** `https://cdn.radian.web.id/assets/`

---

## Daftar Isi

1. [Ringkasan Aset CDN](#1-ringkasan-aset-cdn)
2. [Integrasi ke Proyek HTML Biasa (RDP TMPT)](#2-integrasi-ke-proyek-html-biasa-rdp-tmpt)
3. [Integrasi ke Proyek Django (RDP Akun)](#3-integrasi-ke-proyek-django-rdp-akun)
4. [Memilih Tema Warna](#4-memilih-tema-warna)
5. [Penggunaan Komponen](#5-penggunaan-komponen)

---

## 1. Ringkasan Aset CDN

Setelah dipublikasikan ke GitHub Pages, aset RDP-UI dapat diakses melalui CDN berikut:

| File | URL | Keterangan |
|------|-----|------------|
| `rdp.css` | `https://cdn.radian.web.id/assets/rdp.css` | Bundle CSS utama (semua komponen) |
| `rdp.js` | `https://cdn.radian.web.id/assets/rdp.js` | Bundle JS minimal (interaktivitas) |
| `themes/green.css` | `https://cdn.radian.web.id/assets/themes/green.css` | Override warna hijau |
| `themes/amber.css` | `https://cdn.radian.web.id/assets/themes/amber.css` | Override warna amber |

> [!NOTE]
> Ukuran bundle CSS terkompresi hanya **~14 kB gzip**, sehingga tidak memperlambat halaman secara signifikan.

---

## 2. Integrasi ke Proyek HTML Biasa (RDP TMPT)

### Langkah 1 — Tambahkan tag ke `<head>`

Buka setiap file HTML di proyek RDP TMPT dan tambahkan baris berikut di dalam `<head>`:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Halaman</title>

  <!-- ① RDP-UI Core CSS -->
  <link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">

  <!-- ② (Opsional) Tema warna kustom — pilih salah satu -->
  <!-- <link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/green.css"> -->
  <!-- <link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/amber.css"> -->

  <!-- ③ CSS lokal Anda (jika ada override tambahan) -->
  <!-- <link rel="stylesheet" href="css/custom.css"> -->
</head>
<body>

  <!-- Konten halaman Anda di sini -->

  <!-- ④ RDP-UI JS (sebelum </body>) -->
  <script src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
</body>
</html>
```

### Langkah 2 — Gunakan kelas RDP di elemen HTML

Setelah CSS dimuat, semua komponen RDP-UI langsung tersedia. Contoh:

```html
<!-- Tombol -->
<button class="rdp-btn rdp-btn--primary">Masuk</button>
<button class="rdp-btn rdp-btn--outline">Batal</button>

<!-- Badge -->
<span class="rdp-badge rdp-badge--success">Aktif</span>

<!-- Alert -->
<div class="rdp-alert rdp-alert--info" role="alert">
  Data berhasil disimpan.
</div>

<!-- Card -->
<div class="rdp-card">
  <div class="rdp-card__header">Judul Kartu</div>
  <div class="rdp-card__body">Konten kartu di sini.</div>
</div>
```

### Langkah 3 — Gunakan tema gelap (opsional)

Tambahkan atribut `data-theme` ke tag `<html>`:

```html
<!-- Tema terang (default) -->
<html lang="id" data-theme="light">

<!-- Tema gelap -->
<html lang="id" data-theme="dark">

<!-- Ikuti preferensi OS (auto) — hilangkan atribut data-theme -->
<html lang="id">
```

---

## 3. Integrasi ke Proyek Django (RDP Akun)

### Langkah 1 — Buat base template

Di proyek Django Anda, buat atau perbarui file `templates/base.html`:

```html
<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% block title %}RDP Akun{% endblock %}</title>

  <!-- ① RDP-UI Core CSS dari CDN -->
  <link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">

  <!-- ② (Opsional) Tema warna kustom -->
  {% block extra_css %}{% endblock %}
</head>
<body>

  {% block content %}
  {% endblock %}

  <!-- ③ RDP-UI JS -->
  <script src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
  {% block extra_js %}{% endblock %}
</body>
</html>
```

### Langkah 2 — Extends dari base template

Setiap template halaman cukup meng-*extend* `base.html`:

```html
{% extends "base.html" %}

{% block title %}Login — RDP Akun{% endblock %}

{% block content %}
<main class="rdp-layout-blank">
  <div class="rdp-card" style="max-width: 400px; margin: auto;">
    <div class="rdp-card__header">
      <h1>Masuk</h1>
    </div>
    <div class="rdp-card__body">
      <form method="POST" action="{% url 'login' %}">
        {% csrf_token %}

        <label for="username">Username</label>
        <input class="rdp-input" type="text" id="username" name="username" required>

        <label for="password">Password</label>
        <input class="rdp-input" type="password" id="password" name="password" required>

        <button class="rdp-btn rdp-btn--primary" type="submit" style="width: 100%;">
          Masuk
        </button>
      </form>
    </div>
  </div>
</main>
{% endblock %}
```

### Langkah 3 — Integrasi dengan Django-Cotton (jika digunakan)

Jika proyek Django menggunakan **Django-Cotton**, buat wrapper komponen di `templates/cotton/`:

**`templates/cotton/btn.html`**
```html
<button class="rdp-btn rdp-btn--{{ variant|default:'primary' }} {{ class }}" {{ attrs }}>
  {{ slot }}
</button>
```

**`templates/cotton/card.html`**
```html
<div class="rdp-card {{ class }}">
  {% if title %}
  <div class="rdp-card__header">{{ title }}</div>
  {% endif %}
  <div class="rdp-card__body">
    {{ slot }}
  </div>
</div>
```

**Penggunaan di template:**
```html
<c-card title="Informasi Akun">
  <p>Selamat datang, {{ user.username }}!</p>
  <c-btn variant="outline">Edit Profil</c-btn>
</c-card>
```

### Langkah 4 — HTMX + RDP-UI Toast

Jika menggunakan HTMX, tambahkan event listener untuk menampilkan toast dari respons server:

```javascript
// Di static/js/htmx-rdp.js
document.addEventListener('htmx:afterRequest', function(evt) {
  const toast = evt.detail.xhr.getResponseHeader('X-RDP-Toast');
  if (toast && window.RDP) {
    const data = JSON.parse(toast);
    RDP.showToast(data.message, data.type || 'info');
  }
});
```

Di Django view, kirim header toast:

```python
# views.py
from django.http import HttpResponse
import json

def simpan_data(request):
    # ... logika simpan ...
    response = HttpResponse('<p>Data berhasil disimpan.</p>')
    response['X-RDP-Toast'] = json.dumps({
        'message': 'Data berhasil disimpan!',
        'type': 'success'
    })
    return response
```

### Langkah 5 — Theme switcher di Django

Simpan preferensi tema di session Django:

```python
# views.py
def set_theme(request):
    theme = request.POST.get('theme', 'auto')
    request.session['rdp_theme'] = theme
    return JsonResponse({'theme': theme})
```

Di `base.html`, muat tema dari session:

```html
<html lang="id" data-theme="{{ request.session.rdp_theme|default:'light' }}">
```

---

## 4. Memilih Tema Warna

RDP-UI mendukung dua override tema warna tambahan selain biru-navy default:

### Default (Navy/Biru)
Tidak perlu CSS tambahan — sudah termasuk dalam `rdp.css`.

```html
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">
```

### Hijau
```html
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/green.css">
```

### Amber/Kuning
```html
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/amber.css">
```

> [!TIP]
> File tema warna hanya berisi **override CSS variables** (~0.4 kB), sehingga tidak ada duplikasi komponen.

---

## 5. Penggunaan Komponen

Referensi cepat kelas utama yang tersedia:

| Komponen | Kelas Dasar | Modifier Contoh |
|----------|------------|-----------------|
| Button | `rdp-btn` | `rdp-btn--primary`, `rdp-btn--outline`, `rdp-btn--sm` |
| Badge | `rdp-badge` | `rdp-badge--success`, `rdp-badge--warning` |
| Alert | `rdp-alert` | `rdp-alert--info`, `rdp-alert--danger` |
| Card | `rdp-card` | `rdp-card__header`, `rdp-card__body` |
| Avatar | `rdp-avatar` | `rdp-avatar--lg`, `rdp-avatar--sm` |
| Spinner | `rdp-spinner` | `rdp-spinner--sm` |
| Input | `rdp-input` | (ikut PicoCSS `<input>` native) |
| Modal | `rdp-modal` | `data-rdp-action="open-modal"` |
| Toast | via JS | `RDP.showToast('pesan', 'success')` |
| Tabs | `rdp-tabs` | `rdp-tabs__list`, `rdp-tabs__content` |
| Pagination | `rdp-pagination` | `rdp-pagination__item--active` |
| Breadcrumb | `rdp-breadcrumb` | `rdp-breadcrumb__item` |

Untuk dokumentasi lengkap setiap komponen, lihat file `docs/FASE-*.md` yang sesuai atau kunjungi halaman showcase di `index.html`.
