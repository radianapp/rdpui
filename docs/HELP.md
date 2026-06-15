# Panduan Bantuan & Troubleshooting (HELP) — RDP-UI

Dokumen ini menjelaskan beberapa pesan kesalahan umum dan solusi penyelesaian masalah saat mengintegrasikan RDP-UI.

---

## 1. Kesalahan Impor Berkas JS (Bundler / Browser Error)

### Gejala:
Konsol browser menampilkan error:
```
Uncaught SyntaxError: Cannot use import statement outside a module
```

### Penyebab:
Anda mengimpor `rdp.js` menggunakan tag `<script src="...">` standar tanpa atribut `type="module"`. Karena `rdp.js` versi terbaru menggunakan ES Modules untuk memuat modul modal dan toast secara terpisah, browser membutuhkan instruksi eksplisit bahwa file tersebut adalah sebuah modul.

### Solusi:
Ubah pemuatan skrip menjadi:
```html
<script type="module" src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
```

---

## 2. Peringatan Ukuran Bundle Gzip (Build Warning)

### Gejala:
Saat menjalankan `npm run build`, terdapat peringatan bahwa ukuran bundle CSS melebihi limit.

### Penyebab:
Variabel `chunkSizeWarningLimit` di `vite.config.js` diatur ketat (50KB) untuk memastikan aset CDN tetap optimal. Jika Anda mengimpor library luar yang sangat besar di dalam file CSS RDP, ukuran build akan membengkak.

### Solusi:
1. Pastikan Anda hanya mengimpor komponen RDP-UI yang dibutuhkan di `src/rdp.css`.
2. Jangan mengimpor stylesheet pihak ketiga yang besar langsung di dalam bundle inti. Muat file eksternal tersebut melalui tag `<link>` terpisah di HTML.

---

## 3. Masalah Kontras Warna pada Tema Gelap (WCAG AA)

### Gejala:
Elemen teks tertentu sulit dibaca saat mode gelap diaktifkan.

### Solusi:
Seluruh variabel teks RDP-UI menggunakan token semantik. Pastikan Anda menggunakan kelas utilitas warna teks RDP yang tepat:
- Gunakan `var(--rdp-text)` untuk teks utama.
- Gunakan `var(--rdp-text-secondary)` untuk teks pendukung.
- Gunakan `var(--rdp-text-muted)` hanya untuk teks dekoratif atau caption kecil (bukan konten penting).
- Pastikan warna latar belakang kontras menggunakan `var(--rdp-surface)` atau `var(--rdp-bg)`.
