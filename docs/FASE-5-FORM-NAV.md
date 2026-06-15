# Fase 5 — Form & Navigation Components

**Status:** ✅ Selesai  
**Versi:** 1.0.0

---

## Ringkasan

Fase 5 menambahkan komponen-komponen interaktif tingkat lanjut yang sering digunakan di aplikasi SaaS/admin dan formulir masukan data. Semua komponen memprioritaskan accessibility (aksesibilitas) dan memiliki markup standar yang responsif dan terintegrasi dengan utilitas RDP.

---

## File yang Dibuat & Dimodifikasi

| File | Tipe | Deskripsi |
|------|------|-----------|
| `src/components/form/form.css` | Stylesheet | Form layout, validation states, sizes, custom control (checkbox/radio group, drag-drop) |
| `src/components/modal/modal.css` | Stylesheet | Modal dialog menggunakan `<dialog>` native |
| `src/components/modal/modal.js` | JavaScript | Script pembuka/penutup modal, auto-backdrop dismiss |
| `src/components/dropdown/dropdown.css` | Stylesheet | Dropdown menu menggunakan `<details>` native |
| `src/components/tabs/tabs.css` | Stylesheet | Tab navigation dengan markup CSS-only |
| `src/components/pagination/pagination.css` | Stylesheet | Navigasi halaman untuk tabel/list |
| `src/components/toast/toast.css` | Stylesheet | Toast notifications dan progress bar |
| `src/components/toast/toast.js` | JavaScript | Programmatic toast manager |
| `src/components/breadcrumb/breadcrumb.css` | Stylesheet | Breadcrumb navigation standalone |
| `src/components/table/table.css` | Stylesheet | Tabel data responsif dengan sticky header, hover, dsb |

---

## Dokumentasi Komponen

### 1. Form
PicoCSS menyediakan styling dasar untuk input. RDP menambahkan support helper group, status validasi, input sizes, serta layout horizontal/row:
- **Form Group:** `.rdp-form-group` untuk mengelompokkan label, input, dan hint.
- **Validation State:** `.is-invalid` (input merah dengan `.rdp-form-feedback--error`), `.is-valid` (input hijau).
- **File Upload Area:** `.rdp-file-upload` untuk area drag-and-drop file.

```html
<div class="rdp-form-group">
  <label for="username" class="rdp-label">Username</label>
  <input type="text" id="username" placeholder="Masukkan username">
  <small class="rdp-form-text">Gunakan username unik Anda.</small>
</div>
```

### 2. Modal
Menggunakan `<dialog>` native HTML5 untuk performa maksimal dan aksesibilitas keyboard (Escape auto-close).
- **JavaScript API:** `RDP.openModal(id)` / `RDP.closeModal(id)`
- **HTML Trigger:** `data-rdp-action="open-modal"` dan `data-rdp-target="#modal-id"`

```html
<dialog class="rdp-modal" id="demo-modal">
  <div class="rdp-modal__content">
    <header class="rdp-modal__header">
      <h3 class="rdp-modal__title">Judul Modal</h3>
      <button class="rdp-modal__close" data-rdp-action="close-modal">&times;</button>
    </header>
    <div class="rdp-modal__body">
      Konten modal diletakkan di sini.
    </div>
    <footer class="rdp-modal__footer">
      <button class="rdp-btn" data-rdp-action="close-modal">Batal</button>
      <button class="rdp-btn rdp-btn--primary">Simpan</button>
    </footer>
  </div>
</dialog>
```

### 3. Dropdown
Dropdown murni menggunakan tag `<details>` HTML sehingga tidak memerlukan JavaScript tambahan untuk interaksi dasar.
- Tambahkan class `.rdp-dropdown` pada tag `<details>`.
- Isinya dibungkus oleh `.rdp-dropdown__menu`.

```html
<details class="rdp-dropdown">
  <summary class="rdp-btn rdp-btn--outline rdp-btn--sm">Menu</summary>
  <ul class="rdp-dropdown__menu">
    <li><a href="#">Edit Profil</a></li>
    <li><a href="#" class="rdp-dropdown__item--danger">Keluar</a></li>
  </ul>
</details>
```

### 4. Tabs
Mendukung tabs navigasi dengan varian underline (default), pill, boxed, dan vertical.

```html
<nav class="rdp-tabs">
  <a href="#" class="rdp-tabs__link active">Tab 1</a>
  <a href="#" class="rdp-tabs__link">Tab 2</a>
</nav>
```

### 5. Toast
Digunakan untuk memberikan feedback instan. Toast dapat dipicu secara programmatik melalui JavaScript.
- **JavaScript API:**
  ```javascript
  RDP.showToast({
    title: 'Sukses',
    message: 'Data berhasil disimpan!',
    type: 'success', // success, danger, warning, info
    duration: 5000,
    position: 'top-right' // top-right, top-left, bottom-right, etc.
  });
  ```

### 6. Breadcrumb Standalone
Breadcrumb memisahkan level navigasi dengan separator yang responsif.
```html
<nav class="rdp-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Beranda</a></li>
    <li><a href="#">Data Master</a></li>
    <li aria-current="page">Pengguna</li>
  </ol>
</nav>
```

### 7. Table
Membungkus tabel dalam container `.rdp-table-responsive` untuk scroll horizontal otomatis di HP. Mendukung `.rdp-table--striped`, `.rdp-table--hover`, dan sticky header.

```html
<div class="rdp-table-responsive">
  <table class="rdp-table rdp-table--striped rdp-table--hover">
    <thead>
      <tr>
        <th>Nama</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Radian Admin</td>
        <td>admin@radian.web.id</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Konfirmasi Aturan & Validasi
- Seluruh style dikompilasi ke dalam berkas `rdp.css` utama.
- Script interaktivitas terdaftar dalam `rdp.js` dan ter-bundle saat build.
