# Deploy ke GitHub Pages

**Repositori:** `https://github.com/radianapp/rdpui`  
**URL Publik:** `https://cdn.radian.web.id` *(via CNAME)*

---

## Cara Deploy Manual (Satu Kali)

### Langkah 1 — Build produksi

```powershell
# Di folder proyek
npm run build
```

Output akan ada di folder `dist/`.

### Langkah 2 — Push ke branch `gh-pages`

GitHub Pages dapat dikonfigurasi untuk menyajikan konten dari branch khusus `gh-pages`. Gunakan perintah berikut:

```powershell
# Pastikan git sudah terkoneksi ke remote
git remote -v

# Deploy folder dist/ ke branch gh-pages
npx gh-pages -d dist
```

> [!NOTE]
> Jika `gh-pages` belum terinstall, jalankan: `npm install --save-dev gh-pages`

### Langkah 3 — Konfigurasi GitHub Pages

1. Buka **Settings** repositori di GitHub
2. Navigasi ke **Pages** (sidebar kiri)
3. Pada *Source*, pilih: **Deploy from a branch**
4. Branch: `gh-pages` → Folder: `/ (root)`
5. Klik **Save**

Setelah beberapa menit, situs akan aktif di `https://radianapp.github.io/rdpui/`.

### Langkah 4 — CNAME (domain kustom)

Untuk domain `cdn.radian.web.id`:

1. Buat file `public/CNAME` berisi:
   ```
   cdn.radian.web.id
   ```
2. Di DNS provider, tambahkan record CNAME:
   ```
   cdn.radian.web.id  →  radianapp.github.io
   ```
3. Kembali ke **Settings → Pages**, isi *Custom domain*: `cdn.radian.web.id`

---

## Cara Deploy Otomatis (GitHub Actions)

Buat file `.github/workflows/deploy.yml` untuk deploy otomatis setiap push ke `main`:

```yaml
name: Deploy RDP-UI ke GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy ke GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> [!IMPORTANT]
> Pastikan di **Settings → Pages**, pilih *Source*: **GitHub Actions** (bukan branch).

---

## Struktur Dist Setelah Build

```
dist/
├── index.html                    ← Halaman showcase (preview)
└── assets/
    ├── rdp.css                   ← Bundle CSS utama (~83 kB / ~14 kB gzip)
    ├── rdp.js                    ← Bundle JS minimal (~5.5 kB / ~2 kB gzip)
    ├── rdp.js.map                ← Source map JS
    ├── themes/
    │   ├── green.css             ← Override tema hijau (~0.4 kB)
    │   └── amber.css             ← Override tema amber (~0.4 kB)
    └── fonts/
        ├── RDPSans-Regular.woff2
        ├── RDPSans-Bold.woff2
        ├── RDPSans-Medium.woff2
        ├── RDPSans-SemiBold.woff2
        ├── RDPSans-Light.woff2
        ├── RDPSerif-Regular.woff2
        ├── RDPSerif-Bold.woff2
        ├── RDPSerif-Italic.woff2
        ├── RDPSerif-BoldItalic.woff2
        ├── RDPSerif-Medium.woff2
        └── RDPSerif-SemiBold.woff2
```

---

## Menggunakan Aset dari CDN

Setelah deploy berhasil, gunakan URL CDN berikut:

```html
<!-- CSS Utama (wajib) -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/rdp.css">

<!-- JS Interaktivitas (wajib untuk modal, toast, tema) -->
<script src="https://cdn.radian.web.id/assets/rdp.js" defer></script>

<!-- Tema Warna (opsional — pilih salah satu) -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/green.css">
<!-- atau -->
<link rel="stylesheet" href="https://cdn.radian.web.id/assets/themes/amber.css">
```

> [!TIP]
> Nama file tidak mengandung hash (contoh: `rdp.css` bukan `rdp-CvYLCfjL.css`), sehingga URL CDN **stabil** dan tidak perlu diperbarui setiap kali ada build baru.
