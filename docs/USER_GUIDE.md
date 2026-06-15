# Panduan Pengguna RDP-UI (User Guide)

Dokumen ini menjelaskan cara mengintegrasikan dan menggunakan komponen RDP-UI Design System di proyek Anda.

---

## 1. Integrasi Dasar

Untuk menggunakan RDP-UI, Anda hanya perlu memuat berkas CSS dan JavaScript yang sudah terkompilasi melalui CDN Radian:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Aplikasi Saya</title>
  
  <!-- PicoCSS sebagai baseline -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2.1.1/css/pico.min.css">
  
  <!-- RDP-UI Stylesheet -->
  <link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">
  
  <!-- RDP-UI Script (wajib menggunakan type="module") -->
  <script type="module" src="https://cdn.radian.web.id/assets/rdp.js" defer></script>
</head>
<body>
  <!-- Konten Anda -->
</body>
</html>
```

---

## 2. Penggunaan Komponen Utama

### A. Penggunaan Modal Native
RDP-UI menggunakan elemen `<dialog>` native HTML5. 

1. **Membuat markup modal:**
   ```html
   <dialog class="rdp-modal" id="modal-pengguna">
     <div class="rdp-modal__content">
       <header class="rdp-modal__header">
         <h3 class="rdp-modal__title">Ubah Profil</h3>
         <button class="rdp-modal__close" data-rdp-action="close-modal">&times;</button>
       </header>
       <div class="rdp-modal__body">
         <!-- Isi form / konten modal -->
       </div>
       <footer class="rdp-modal__footer">
         <button class="rdp-btn" data-rdp-action="close-modal">Batal</button>
         <button class="rdp-btn rdp-btn--primary">Simpan</button>
       </footer>
     </div>
   </dialog>
   ```

2. **Memicu pembukaan modal:**
   Gunakan atribut `data-rdp-action="open-modal"` dan sertakan ID modal target pada `data-rdp-target`:
   ```html
   <button class="rdp-btn" data-rdp-action="open-modal" data-rdp-target="#modal-pengguna">Buka Modal</button>
   ```

3. **Interaksi via JavaScript (Programmatic):**
   ```javascript
   // Membuka modal secara programmatik
   RDP.openModal('modal-pengguna');

   // Menutup modal secara programmatik
   RDP.closeModal('modal-pengguna');
   ```

---

### B. Memicu Toast Programmatik
Toast notification dapat dipicu kapan saja dari kode JavaScript Anda:

```javascript
RDP.showToast({
  title: 'Data Disimpan',
  message: 'Perubahan profil Anda berhasil disimpan ke cloud.',
  type: 'success',        // Pilihan: 'success' | 'danger' | 'warning' | 'info'
  duration: 5000,         // Durasi tampil dalam milidetik (0 untuk manual/permanen)
  position: 'top-right'   // Pilihan: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
});
```

---

### C. Validasi Form
Gunakan kelas `.is-valid` atau `.is-invalid` pada elemen `<input>` atau `<select>` untuk memberikan feedback visual langsung kepada pengguna:

```html
<div class="rdp-form-group">
  <label for="email" class="rdp-label">Alamat Email</label>
  <input type="email" id="email" class="is-invalid" placeholder="nama@domain.com">
  <small class="rdp-form-feedback rdp-form-feedback--error">Format email tidak valid.</small>
</div>
```
