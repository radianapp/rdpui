# Panduan Publikasi ke NPM Registry — `@radiandp/rdp-ui`

Dokumen ini menjelaskan langkah-langkah untuk memublikasikan pustaka desain sistem RDP-UI ke NPM Registry agar dapat diinstal oleh proyek lain menggunakan perintah:

```bash
npm install @radiandp/rdp-ui
```

---

## Prasyarat
1. Memiliki akun di [npmjs.com](https://www.npmjs.com/).
2. Memiliki akses ke organisasi `@radiandp` di NPM (karena menggunakan nama paket berlingkup / scoped package `@radiandp/rdp-ui`).
3. NodeJS dan NPM sudah terinstal secara lokal di komputer Anda.

---

## Langkah demi Langkah Publikasi

### Langkah 1: Login ke Akun NPM Anda
Buka terminal Anda, lalu jalankan perintah berikut untuk masuk ke akun NPM Anda dari CLI:
```bash
npm login
```
*Ikuti petunjuk di layar untuk memasukkan username, password, email, dan kode OTP verifikasi.*

### Langkah 2: Build Aset Terkini
Pastikan semua file build di dalam folder `/dist/` sudah merupakan versi terbaru dengan menjalankan perintah:
```bash
npm run build
```

### Langkah 3: Konfigurasi Berkas `package.json`
Pastikan berkas `package.json` Anda memiliki pengaturan distribusi yang benar:
- **`name`**: Harus sesuai, yaitu `"@radiandp/rdp-ui"`.
- **`version`**: Tingkatkan versinya (misalnya dari `1.0.1` ke `1.0.2`) setiap kali Anda merilis pembaruan baru.
- **`files`**: Pastikan folder `dist` dimasukkan agar hanya berkas distribusi yang diunggah ke NPM.
- **`publishConfig`**: Karena `@radiandp` adalah scoped package, NPM secara default akan menganggapnya sebagai paket privat. Tambahkan konfigurasi ini di `package.json` Anda agar paket dapat diakses secara publik:
  ```json
  "publishConfig": {
    "access": "public"
  }
  ```

### Langkah 4: Publikasikan ke NPM
Jalankan perintah berikut untuk memublikasikan paket Anda ke registry publik NPM:
```bash
npm publish --access public
```

---

## Tips & Troubleshooting

### Mengubah Versi secara Otomatis
Anda dapat menggunakan perintah bawaan NPM untuk menaikkan versi sesuai aturan Semantic Versioning (SemVer):
- Naikkan Patch (misal `1.0.0` -> `1.0.1`): `npm version patch`
- Naikkan Minor (misal `1.0.0` -> `1.1.0`): `npm version minor`
- Naikkan Major (misal `1.0.0` -> `2.0.0`): `npm version major`

*Catatan: Jika git working directory tidak bersih, Anda bisa menambahkan bendera `--force` atau melakukan git commit terlebih dahulu sebelum menjalankan perintah version.*

### Error 403 Forbidden (Two-Factor Authentication / 2FA)
Jika Anda mendapatkan error berikut saat menjalankan `npm publish`:
> `npm error code E403`
> `npm error 403 Forbidden - Two-factor authentication... is required to publish packages.`

Ini terjadi karena akun Anda atau organisasi `@radian` mewajibkan otentikasi dua faktor (2FA) untuk setiap publikasi.

**Solusinya:**
Jalankan perintah publish dengan menyertakan kode OTP dari aplikasi authenticator ponsel Anda menggunakan bendera `--otp`:
```bash
npm publish --access public --otp=KODE_OTP_ANDA
```
*Ganti `KODE_OTP_ANDA` dengan 6 digit kode yang tampil di Google Authenticator / 2FA app Anda.*

### Error 404 Not Found (Scoped Package / Organization Not Created)
Jika Anda mendapatkan error berikut saat publish:
> `npm error code E404`
> `npm error 404 Not Found - PUT https://registry.npmjs.org/@radiandp%2frdp-ui - Not found`

Ini menunjukkan bahwa **Scope/Organisasi `@radiandp` belum dibuat** di NPM Registry, atau akun Anda yang sedang login tidak memiliki hak akses/keanggotaan di organisasi `@radiandp` tersebut.

**Solusinya:**
1. Masuk ke dashboard [npmjs.com](https://www.npmjs.com/).
2. Buat Organisasi baru dengan nama **`radiandp`** (jika belum ada).
3. Pastikan akun NPM yang Anda gunakan untuk login di terminal merupakan anggota/pemilik dari organisasi tersebut dengan akses publish yang sesuai.

### Menguji Paket Secara Lokal Sebelum Publikasi
Jika ingin menguji paket di proyek lain sebelum diunggah ke NPM:
1. Di folder RDP-UI: Jalankan `npm link`
2. Di folder proyek tujuan Anda: Jalankan `npm link @radiandp/rdp-ui`
