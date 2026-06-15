# Fase 6 — Build & Distribution

**Status:** ✅ Selesai  
**Versi:** 1.0.0

---

## Ringkasan

Fase 6 mengonfigurasi dan memverifikasi proses build untuk mendistribusikan aset RDP-UI melalui CDN. Menggunakan Vite sebagai bundler, file CSS dan JS dikompilasi serta diminimalkan untuk performa maksimal.

---

## Hasil Build & Ukuran File

Proses kompilasi menghasilkan bundle statis yang dioptimalkan:

| Aset | File Output | Ukuran Mentah | Ukuran Gzip | Target Ukuran | Status |
|------|-------------|---------------|-------------|---------------|--------|
| **Core CSS** | `dist/assets/rdp-*.css` | 76.85 kB | 12.76 kB | < 50 kB gzip | ✅ Lolos |
| **Core JS** | `dist/assets/rdp-*.js` | 5.01 kB | 1.79 kB | - | ✅ Lolos |

> [!NOTE]
> Ukuran bundle CSS yang terkompresi hanya **12.76 kB**, jauh di bawah target maksimum **50 kB gzip** yang dispesifikasikan dalam PRD. Ini menjamin pemuatan halaman yang sangat cepat bagi pengguna akhir.

---

## Cara Menjalankan Build

Jalankan perintah berikut untuk mengompilasi ulang aset produksi:

```bash
# Menjalankan build produksi
npm run build

# Meninjau (preview) hasil build lokal
npm run preview
```

---

## Protokol Rilis CDN

Setelah build berhasil, file di direktori `dist/assets/` didistribusikan ke CDN publik Radian (`cdn.radian.web.id`). Pengguna eksternal dapat menggunakan framework ini dengan mengimpor langsung dari CDN:

```html
<!-- Mengimpor stylesheet RDP-UI -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">

<!-- Mengimpor interaktivitas RDP-UI -->
<script type="module" src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
```
