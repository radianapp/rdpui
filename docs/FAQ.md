# Tanya Jawab Umum (FAQ) — RDP-UI

Dokumen ini memuat daftar pertanyaan yang sering diajukan mengenai implementasi dan troubleshooting RDP-UI.

---

### Q1: Mengapa interaksi Modal / Toast tidak berfungsi di halaman saya?
**A:** Pastikan Anda telah mengimpor berkas JavaScript `rdp.js` dengan atribut `type="module"` dan tag `defer` di dalam `<head>` halaman HTML Anda:
```html
<script type="module" src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
```
Tanpa `type="module"`, modul-modul JS komponen internal tidak dapat dimuat oleh browser.

---

### Q2: Bagaimana cara mengubah tema secara manual menggunakan JavaScript?
**A:** RDP-UI mengekspos API tema global melalui namespace `RDP`:
```javascript
// Mengatur tema ke gelap
RDP.setTheme('dark');

// Mengatur tema ke terang
RDP.setTheme('light');

// Mengatur tema otomatis (mengikuti preferensi OS)
RDP.setTheme('auto');
```

---

### Q3: Mengapa tampilan Sidebar Dashboard saya acak-acakan saat berganti tema?
**A:** Di versi sebelumnya, sidebar menggunakan variabel dinamis `--rdp-primary-900` yang berubah menjadi biru muda di dark mode. Di versi terbaru, warna background sidebar telah di-hardcode ke Navy gelap `#0C2340` agar tetap kontras dan konsisten di tema gelap maupun terang. Pastikan Anda menggunakan CSS versi terbaru.

---

### Q4: Apakah RDP-UI mendukung integrasi dengan HTMX?
**A:** Ya, sangat mendukung! Contohnya, indikator loading spinner telah terintegrasi dengan kelas `.rdp-htmx-indicator` yang secara otomatis muncul ketika HTMX melakukan request AJAX (menggunakan `hx-indicator`). Modal native RDP juga dapat di-render langsung dari server dan dimasukkan ke DOM menggunakan HTMX swap.
